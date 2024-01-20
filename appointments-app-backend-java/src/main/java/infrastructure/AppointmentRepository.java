package infrastructure;

import domain.Appointment;

import java.util.List;

public interface AppointmentRepository {
    List<Appointment> getAppointmentsByPatientId(String patientId) throws Exception;
}
