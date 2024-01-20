package infrastructure;

import domain.Appointment;
import domain.Patient;
import domain.SubjectSpecification;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class MockAppointmentRepository implements AppointmentRepository {
    private SubjectSpecification subjectSpecification = new SubjectSpecification(); 

    @Override
    public List<Appointment> getAppointmentsByPatientId(String userId) throws Exception {
        return getAppointments().stream()
                .filter(appointment -> subjectSpecification.hasSubject(appointment.getSubject().getId(), userId))
                .collect(Collectors.toList());
    }

    private List<Appointment> getAppointments() {
        Patient patient1 = new Patient("user1", "John Doe");
        Patient patient2 = new Patient("user2", "Jane Doe");

        return Arrays.asList(
            new Appointment("1", "booked", patient1, "2023-04-05T10:30:00Z", "2023-04-05T11:00:00Z"),
            new Appointment("2", "Cancelled", patient2, "2023-04-07T13:00:00Z", "2023-04-07T13:30:00Z"),
            new Appointment("17", "Cancelled", patient1, "2023-07-11T15:30:00Z", "2023-07-11T16:00:00Z")
        );
    }

    
}
