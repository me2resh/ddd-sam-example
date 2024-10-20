from src.domain.patient import Patient

class Appointment:
    def __init__(self, id: str, status: str, subject: Patient, start: str, end: str):
        self.id = id
        self.status = status
        self.subject = subject
        self.start = start
        self.end = end

    def to_dict(self):
        return {
            "id": self.id,
            "status": self.status,
            "subject": self.subject.to_dict(),
            "start": self.start,
            "end": self.end,
        }
