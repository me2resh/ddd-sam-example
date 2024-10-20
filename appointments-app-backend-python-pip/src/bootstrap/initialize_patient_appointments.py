from src.application.appointment_service import AppointmentService
from src.infrastructure.mock_appointment_repository import MockAppointmentRepository

def initialize_patient_appointments():
    appointment_repository = MockAppointmentRepository()
    appointment_service = AppointmentService(appointment_repository)
    return appointment_service
