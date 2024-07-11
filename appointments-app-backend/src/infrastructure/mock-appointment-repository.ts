import { Appointment } from '@/domain/appointment';
import { Patient } from '@/domain/patient';
import { AppointmentRepository } from './appointment-repository';

export class MockAppointmentRepository implements AppointmentRepository {
    async getAppointmentsByPatientId(userId: string): Promise<Appointment[]> {
        try {
            const appointments = await this.getAppointments();
            const userAppointments = appointments.filter((appointment) => appointment.hasSubject(userId));
            return userAppointments;
        } catch (err) {
            throw err; // Re-throw the error to be handled by the caller
        }
    }

    async getAppointments(): Promise<Appointment[]> {
        // Mock data here...
        const patient1 = new Patient('user1', 'John Doe');
        const patient2 = new Patient('user2', 'Jane Doe');

        const appointments: Appointment[] = [
            new Appointment('1', 'booked', patient1, '2023-04-05T10:30:00Z', '2023-04-05T11:00:00Z'),
            new Appointment('2', 'Cancelled', patient2, '2023-04-07T13:00:00Z', '2023-04-07T13:30:00Z'),
            new Appointment('3', 'booked', patient1, '2023-04-12T15:30:00Z', '2023-04-12T16:00:00Z'),
            new Appointment('4', 'booked', patient2, '2023-04-19T09:00:00Z', '2023-04-19T09:30:00Z'),
            new Appointment('5', 'booked', patient1, '2023-04-25T14:00:00Z', '2023-04-25T14:30:00Z'),
            new Appointment('6', 'Cancelled', patient2, '2023-05-02T11:30:00Z', '2023-05-02T12:00:00Z'),
            new Appointment('7', 'booked', patient1, '2023-05-10T16:00:00Z', '2023-05-10T16:30:00Z'),
            new Appointment('8', 'Cancelled', patient2, '2023-05-15T10:00:00Z', '2023-05-15T10:30:00Z'),
            new Appointment('9', 'booked', patient1, '2023-05-22T13:30:00Z', '2023-05-22T14:00:00Z'),
            new Appointment('10', 'booked', patient2, '2023-05-29T15:00:00Z', '2023-05-29T15:30:00Z'),
            new Appointment('11', 'Cancelled', patient1, '2023-06-01T09:30:00Z', '2023-06-01T10:00:00Z'),
            new Appointment('12', 'booked', patient2, '2023-06-06T14:30:00Z', '2023-06-06T15:00:00Z'),
            new Appointment('13', 'booked', patient1, '2023-06-13T11:00:00Z', '2023-06-13T11:30:00Z'),
            new Appointment('14', 'Cancelled', patient2, '2023-06-20T16:30:00Z', '2023-06-20T17:00:00Z'),
            new Appointment('15', 'booked', patient1, '2023-06-27T09:00:00Z', '2023-06-27T09:30:00Z'),
            new Appointment('16', 'booked', patient2, '2023-07-04T13:00:00Z', '2023-07-04T13:30:00Z'),
            new Appointment('17', 'Cancelled', patient1, '2023-07-11T15:30:00Z', '2023-07-11T16:00:00Z'),
        ];

        return appointments;
    }
}
