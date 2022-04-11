
import EventDispatcher from "../../@shared/event/event-dispatcher";
import AddressChangedEvent from "./address-changed.event";
import SendConsoleLogHandler from "./handler/sendConsoleLogHandler.handler";

describe("Address changed event tests", () => {
  it("Should trigger handler eventDispatch.notify is called", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLogHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("AddressChangedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["AddressChangedEvent"][0]
    ).toMatchObject(eventHandler);

    const addressChangedEvent = new AddressChangedEvent({
      id: "C1",
      nome: "john",
      endereco: "Rua um, 1, 99999999, São Paulo",
    });

    eventDispatcher.notify(addressChangedEvent);
    expect(spyEventHandler).toBeCalledTimes(1);
  });
});
