package application.mapper;

import application.dto.AppointmentDTO;
import domain.Appointment;

// Mapper class
public class AppointmentMapper {

    public static AppointmentDTO toDTO(Appointment appointment) {
        AppointmentDTO dto = new AppointmentDTO();
        dto.setId(appointment.getId());
        dto.setStatus(appointment.getStatus());

        // Assuming you have a similar method to get the patient ID from the subject
        // You might need to adjust this depending on how your Patient class is structured
        if (appointment.getSubject() != null) {
            dto.setPatientId(appointment.getSubject());
        }

        dto.setStart(appointment.getStart());
        dto.setEnd(appointment.getEnd());
        // Add other fields as necessary

        return dto;    }

      public static Appointment fromDTO(AppointmentDTO dto) {
        if (dto == null) {
            return null;
        }

        // Assuming Patient information is represented by a patientId in AppointmentDTO
        // and you have a method to retrieve a Patient object by id (getPatientById)
        // For example, this method could be in a service or repository class

        // Create a new Appointment object using the data from the DTO
        return new Appointment(
            dto.getId(),
            dto.getStatus(),
            dto.getPatientId(),   // This assumes you've retrieved the Patient object from the patientId
            dto.getStart(),
            dto.getEnd()
        );
    }
}