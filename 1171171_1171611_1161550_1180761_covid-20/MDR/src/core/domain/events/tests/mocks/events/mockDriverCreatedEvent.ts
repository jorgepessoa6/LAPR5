
import { IDomainEvent } from "../../../IDomainEvent";
import { UniqueEntityID } from "../../../../UniqueEntityID";

export class MockDriverCreatedEvent implements IDomainEvent {
  dateTimeOccurred: Date;
  id: UniqueEntityID;
  name: string;
  description: string;

  constructor (id: UniqueEntityID) {
    this.id = id;
    this.dateTimeOccurred = new Date();
    
  }

  getAggregateId (): UniqueEntityID {
    return this.id;
  }
}