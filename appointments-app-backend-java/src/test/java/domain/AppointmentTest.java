package domain;

import org.junit.Test;

import static org.junit.Assert.*;

public class AppointmentTest {

    @Test
    public void toString_ReturnsCorrectFormat() {
        Patient patient = new Patient("patientId", "Patient Name");
        Appointment appointment = new Appointment("appointmentId", "confirmed", patient, "2024-01-20T10:00:00Z", "2024-01-20T10:30:00Z");
        
        String expected = "{\"id\":\"appointmentId\",\"status\":\"confirmed\",\"subject\":{\"id\":\"patientId\",\"name\":\"Patient Name\"},\"start\":\"2024-01-20T10:00:00Z\",\"end\":\"2024-01-20T10:30:00Z\"}";
        String actual = appointment.toString();
        
        assertEquals(expected, actual);
    }
    
    
}