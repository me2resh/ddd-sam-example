import { AppointmentService } from '@/application/appointment-service';
import { Patient } from '@/domain/patient';
import { MockAppointmentRepository } from '@/infrastructure/mock-appointment-repository';
import { Appointment } from '@/domain/appointment';

describe('AppointmentService', () => {
    const appointmentRepository = new MockAppointmentRepository();
    const appointmentService = new AppointmentService(appointmentRepository);

    const patient1 = new Patient('user1', 'John Doe');
    const patient2 = new Patient('user2', 'Jane Doe');

    const appointments: Appointment[] = [
        new Appointment('1', 'booked', patient1, '2023-04-05T10:30:00Z', '2023-04-05T11:00:00Z'),
        new Appointment('2', 'booked', patient2, '2023-04-07T13:00:00Z', '2023-04-07T13:30:00Z'),
    ];

    const getAppointmentsSpy = jest.spyOn(appointmentRepository, 'getAppointments');

    beforeEach(() => {
        getAppointmentsSpy.mockImplementation(async () => appointments);
    });

    it('Should return appointments if they exist for a patient ID: user1', async () => {
        const userId = 'user1';
        const result = await appointmentService.getAppointmentsByPatientId(userId);
        expect(result.length).toBe(1);
        expect(result[0].hasSubject(userId)).toBe(true);
    });

    it('Should return appointments if they exist for a patient ID: user2', async () => {
        const userId = 'user2';
        const result = await appointmentService.getAppointmentsByPatientId(userId);
        expect(result.length).toBe(1);
        expect(result[0].hasSubject(userId)).toBe(true);
    });

    it('Should return no appointments if none exist for a given patient ID', async () => {
        const userId = 'user3';
        const result = await appointmentService.getAppointmentsByPatientId(userId);
        expect(result.length).toBe(0);
    });

    afterAll(() => getAppointmentsSpy.mockRestore());
});
