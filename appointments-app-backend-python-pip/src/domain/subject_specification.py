class SubjectSpecification:
    def has_subject(self, appointment_subject_id: str, patient_id: str) -> bool:
        return appointment_subject_id == patient_id
