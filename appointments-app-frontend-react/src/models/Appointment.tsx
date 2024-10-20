export interface Appointment {
  id: string;
  status: string;
  subject: {
    name: string;
  };
  start: string;
  end: string;
}
