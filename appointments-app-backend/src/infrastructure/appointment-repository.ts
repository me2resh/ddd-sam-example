import { Appointment } from '@/domain/appointment';

export interface AppointmentRepository {
    getAppointmentsByPatientId(patientId: string): Promise<Appointment[]>;
}
