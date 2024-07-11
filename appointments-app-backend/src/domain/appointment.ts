import { Patient } from './patient';

export class Appointment {
    constructor(
        public id: string,
        public status: string,
        public subject: Patient,
        public start: string,
        public end: string,
    ) {}

    hasSubject(id: string): boolean {
        return this.subject.id === id;
    }
}
