import { Appointment } from '@/domain/appointment';
import { AppointmentRepository } from '@/infrastructure/appointment-repository';

export class AppointmentService {
    constructor(private appointmentRepository: AppointmentRepository) {}

    async getAppointmentsByPatientId(patientId: string): Promise<Appointment[]> {
        if (!patientId) {
            const error = new Error('Invalid patient ID');
            throw error;
        }

        try {
            const appointments = await this.appointmentRepository.getAppointmentsByPatientId(patientId);
            return appointments;
        } catch (err) {
            throw err; // Re-throw the error to be handled by the caller
        }
    }
}
