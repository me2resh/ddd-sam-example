from typing import List
from src.domain.appointment import Appointment
from src.infrastructure.appointment_repository import AppointmentRepository

class AppointmentService:
    def __init__(self, appointment_repository: AppointmentRepository):
        self.appointment_repository = appointment_repository

    def get_appointments_by_patient_id(self, patient_id: str) -> List[Appointment]:
        return self.appointment_repository.get_appointments_by_patient_id(patient_id)
