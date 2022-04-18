import express, { Request, Response } from "express";
import { InputCreateProductDto } from "../../../usecase/product/create/create.product.dto";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import { InputFindProductDto } from "../../../usecase/product/find/find.product.dto";
import FindProductUseCase from "../../../usecase/product/find/find.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());
  try {
    const productDto: InputCreateProductDto = {
      name: req.body.name,
      price: req.body.price,
    };
    const output = await usecase.execute(productDto);

    res.status(201).json(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());
  try {
    const output = await usecase.execute({});
    res.json(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRoute.get("/:productId", async (req: Request, res: Response) => {
  const usecase = new FindProductUseCase(new ProductRepository());
  try {
    const productDto: InputFindProductDto = {
      id: req.params.productId,
    };
    const output = await usecase.execute(productDto);
    res.json(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
