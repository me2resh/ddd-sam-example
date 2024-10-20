from abc import ABC, abstractmethod
from typing import List
from src.domain.appointment import Appointment

class AppointmentRepository(ABC):
    @abstractmethod
    async def get_appointments_by_patient_id(self, patient_id: str) -> List[Appointment]:
        pass
