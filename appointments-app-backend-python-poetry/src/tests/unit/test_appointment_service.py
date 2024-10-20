import asyncio
import unittest
from unittest.mock import AsyncMock
from src.application.appointment_service import AppointmentService
from src.domain.appointment import Appointment
from src.domain.patient import Patient
from src.infrastructure.mock_appointment_repository import MockAppointmentRepository
from src.domain.subject_specification import SubjectSpecification

class TestAppointmentService(unittest.IsolatedAsyncioTestCase):
     def asyncSetUp(self):
        self.appointment_repository = MockAppointmentRepository()
        self.appointment_service = AppointmentService(self.appointment_repository)
        self.subject_specification = SubjectSpecification()

        self.patient1 = Patient('user1', 'John Doe')
        self.patient2 = Patient('user2', 'Jane Doe')

        self.appointments = [
            Appointment('1', 'booked', self.patient1, '2023-04-05T10:30:00Z', '2023-04-05T11:00:00Z'),
            Appointment('2', 'booked', self.patient2, '2023-04-07T13:00:00Z', '2023-04-07T13:30:00Z'),
        ]

        self.appointment_repository.get_appointments = AsyncMock(return_value=self.appointments)

     def test_get_appointments_by_patient_id(self):
        user_id = 'user1'
        result =  self.appointment_service.get_appointments_by_patient_id(user_id)
        self.assertEqual(len(result), 1)
        self.assertTrue(self.subject_specification.has_subject(result[0].subject.id, user_id))

if __name__ == '__main__':
    unittest.main()
