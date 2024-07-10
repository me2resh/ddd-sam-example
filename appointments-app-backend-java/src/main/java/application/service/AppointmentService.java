package application.service;

import domain.Appointment;
import infrastructure.AppointmentRepository;

import java.util.List;

public class AppointmentService {
    private AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public List<Appointment> getAppointmentsByPatientId(String patientId) throws Exception {
        return appointmentRepository.getAppointmentsByPatientId(patientId);
    }
}
