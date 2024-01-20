package domain;

public class Patient {
    private String id;
    private String name;

    public Patient(String id, String name){
        this.id = id;
        this.name = name;
    }

    public String getId(){
        return this.id;
    }

    public String getName(){
        return this.name;
    }
}
