package application;

import domain.Appointment;
import domain.Patient;
import infrastructure.AppointmentRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import application.service.AppointmentService;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class AppointmentServiceTest {

    private AppointmentRepository appointmentRepository;
    private AppointmentService appointmentService;

    @Before
    public void setUp() {
        // Create a mock AppointmentRepository
        appointmentRepository = Mockito.mock(AppointmentRepository.class);
        // Initialize AppointmentService with the mocked repository
        appointmentService = new AppointmentService(appointmentRepository);
    }

    @Test
    public void getAppointmentsByPatientId_ReturnsCorrectAppointments() throws Exception {
        // Arrange
        String patientId = "patient1";
        List<Appointment> expectedAppointments = Arrays.asList(
            new Appointment("appointment1", "confirmed", "patient1", "2024-01-20T10:00:00Z", "2024-01-20T10:30:00Z"),
            new Appointment("appointment2", "confirmed", "patient2", "2024-01-21T11:00:00Z", "2024-01-21T11:30:00Z")
        );

        // Stubbing the behavior of mock method getAppointmentsByPatientId
        Mockito.when(appointmentRepository.getAppointmentsByPatientId(patientId)).thenReturn(expectedAppointments);

        // Act
        List<Appointment> actualAppointments = appointmentService.getAppointmentsByPatientId(patientId);

        // Assert
        assertEquals("Number of appointments should match", expectedAppointments.size(), actualAppointments.size());
        for (int i = 0; i < expectedAppointments.size(); i++) {
            Appointment expected = expectedAppointments.get(i);
            Appointment actual = actualAppointments.get(i);

            assertEquals("Appointment IDs should match", expected.getId(), actual.getId());
            assertEquals("Appointment statuses should match", expected.getStatus(), actual.getStatus());
            assertEquals("Patient IDs should match", expected.getSubject(), actual.getSubject());
            assertEquals("Start times should match", expected.getStart(), actual.getStart());
            assertEquals("End times should match", expected.getEnd(), actual.getEnd());
        }
    }
}
