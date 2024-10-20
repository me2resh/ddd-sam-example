from typing import List
from src.domain.appointment import Appointment
from src.domain.patient import Patient
from src.infrastructure.appointment_repository import AppointmentRepository
from src.domain.subject_specification import SubjectSpecification

class MockAppointmentRepository(AppointmentRepository):
    def __init__(self):
        self.subject_specification = SubjectSpecification()

    def get_appointments_by_patient_id(self, patient_id: str) -> List[Appointment]:
        appointments =  self.get_appointments()
        return [
            appointment for appointment in appointments
            if self.subject_specification.has_subject(appointment.subject.id, patient_id)
        ]

    def get_appointments(self) -> List[Appointment]:
        patient1 = Patient('user1', 'John Doe')
        patient2 = Patient('user2', 'Jane Doe')

        appointments = [
            Appointment('1', 'booked', patient1, '2023-04-05T10:30:00Z', '2023-04-05T11:00:00Z'),
            Appointment('2', 'Cancelled', patient2, '2023-04-07T13:00:00Z', '2023-04-07T13:30:00Z'),
            Appointment('17', 'Cancelled', patient1, '2023-07-11T15:30:00Z', '2023-07-11T16:00:00Z'),
        ]
        return appointments
