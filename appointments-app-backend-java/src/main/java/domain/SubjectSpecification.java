package domain;
public class SubjectSpecification {
    public boolean hasSubject(String appointmentSubjectId, String id){
        return appointmentSubjectId.equals(id);
    }
}
