export interface Alert {
  sender_name: string;
  event: string;
  start: Date;
  end: Date;
  description: string;
  type: string[];
}