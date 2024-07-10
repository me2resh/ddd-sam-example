import { Appointment } from '@/domain/appointment';
import { AppointmentRepository } from '@/infrastructure/appointment-repository';

export class AppointmentService {
    constructor(private appointmentRepository: AppointmentRepository) {}

    async getAppointmentsByPatientId(patientId: string): Promise<Appointment[]> {
        return this.appointmentRepository.getAppointmentsByPatientId(patientId);
    }
}
