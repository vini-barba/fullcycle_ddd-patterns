import express, { Request, Response } from "express";
import { InputCreateCustomerDto } from "../../../usecase/customer/create/create.customer.dto";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import { InputFindCustomerDto } from "../../../usecase/customer/find/find.customer.dto";
import FindCustomerUseCase from "../../../usecase/customer/find/find.customer.usecase";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());
  try {
    const customerDto: InputCreateCustomerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zip: req.body.address.zip,
      },
    };
    const output = await usecase.execute(customerDto);
    res.status(201).json(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

customerRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository());
  try {
    const output = await usecase.execute({});
    res.json(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

customerRoute.get("/:customerId", async (req: Request, res: Response) => {
  const usecase = new FindCustomerUseCase(new CustomerRepository());
  try {
    const customerDto: InputFindCustomerDto = {
      id: req.params.customerId,
    };

    const output = await usecase.execute(customerDto);
    res.json(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
