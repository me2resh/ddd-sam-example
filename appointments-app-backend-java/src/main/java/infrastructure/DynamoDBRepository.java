package infrastructure;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import java.util.Collections;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import domain.Appointment;
import application.dto.AppointmentDTO;
import application.mapper.AppointmentMapper;

public class DynamoDBRepository {
    private static final Logger LOGGER = Logger.getLogger(DynamoDBRepository.class.getName());

    private final DynamoDBMapper mapper;

    public DynamoDBRepository() {
        LOGGER.info("Initializing DynamoDB client");
        AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard().build();
        this.mapper = new DynamoDBMapper(client);
    }

    public List<Appointment> getAppointmentsByPatientId(String patientId) {
        LOGGER.info("Querying appointments for patientId: " + patientId);

        // Assuming you have a Global Secondary Index on patientId for the Appointments table
        DynamoDBQueryExpression<AppointmentDTO> queryExpression = new DynamoDBQueryExpression<AppointmentDTO>()
                .withIndexName("patientId-index")
                .withConsistentRead(false)
                .withKeyConditionExpression("patientId = :v1")
                .withExpressionAttributeValues(Collections.singletonMap(":v1", new AttributeValue().withS(patientId)));

        List<AppointmentDTO> appointmentDTOs = mapper.query(AppointmentDTO.class, queryExpression);
        return appointmentDTOs.stream()
                             .map(AppointmentMapper::fromDTO)
                             .collect(Collectors.toList());
    }
}
