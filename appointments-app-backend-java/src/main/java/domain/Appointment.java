package domain;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Appointment {
    private String id;
    private String status;
    private String subject;
    private String start;
    private String end;

    public Appointment(String id, String status, String subject, String start, String end){
        this.id = id;
        this.status = status;
        this.subject = subject;
        this.start = start;
        this.end = end;
    }

    public String getId() {
        return this.id;
    }

    public String getStatus() {
        return this.status;
    }

    public String getSubject() {
        return this.subject;
    }

    public String getStart() {
        return this.start;
    }

    public String getEnd() {
        return this.end;
    }

    @Override
    public String toString() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(this);
        } catch (Exception e) {
            throw new RuntimeException("Error converting Appointment to JSON", e);
        }
    }
}
