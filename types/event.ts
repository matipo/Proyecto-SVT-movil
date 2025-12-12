import { Ticket } from './ticket';

export interface EventData {
  _id: string;
  name: string;
  image: string;
  date: string;
  location: string;
  tickets: Ticket[];
}
