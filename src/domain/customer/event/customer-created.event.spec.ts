
import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleLog1Handler from "./handler/sendConsoleLog1Handler.handler";
import SendConsoleLog2Handler from "./handler/sendConsoleLog2Handler.handler";

describe("Customer created event tests", () => {
  it("Should trigger SendConsoleLog1Handler handler eventDispatch.notify is called", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog1Handler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "c1",
      name: "john",
    });

    eventDispatcher.notify(customerCreatedEvent);
    expect(spyEventHandler).toBeCalledTimes(1);
  });

  it("Should trigger SendConsoleLog2Handler handler eventDispatch.notify is called", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog2Handler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "c2",
      name: "john",
    });

    eventDispatcher.notify(customerCreatedEvent);
    expect(spyEventHandler).toBeCalledTimes(1);
  });

  it("Should trigger  both handlers eventDispatch.notify is called", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toMatchObject([eventHandler1, eventHandler2]);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "c2",
      name: "john",
    });

    eventDispatcher.notify(customerCreatedEvent);
    expect(spyEventHandler1).toBeCalledTimes(1);
    expect(spyEventHandler2).toBeCalledTimes(1);
  });
});
