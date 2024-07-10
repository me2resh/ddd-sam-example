package command.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;

import domain.Appointment;
import infrastructure.DynamoDBRepository;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.logging.Logger;


public class PatientAppointmentDynamoDBHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    private static final Logger LOGGER = Logger.getLogger(PatientAppointmentDynamoDBHandler.class.getName());

    private final DynamoDBRepository repository = new DynamoDBRepository();

    @Override
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent event, Context context) {
        LOGGER.info("A");

        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        LOGGER.info("B");

        Map<String, String> headers = getDefaultHeaders();
        LOGGER.info("C");

        try {
            String patientId = event.getPathParameters().get("patientId");
            LOGGER.info("D");

            if (patientId == null || patientId.trim().isEmpty()) {
                LOGGER.info("E");

                return response
                        .withStatusCode(400)
                        .withHeaders(headers)
                        .withBody("Patient ID is missing");
            }
            LOGGER.info("F");
            LOGGER.info(patientId);


            List<Appointment> appointments = repository.getAppointmentsByPatientId(patientId);
            String responseBody = appointments.toString(); // Convert appointments to JSON

            return response
                    .withStatusCode(200)
                    .withHeaders(headers)
                    .withBody(responseBody);

        } catch (Exception e) {
            return response
                    .withStatusCode(500)
                    .withHeaders(headers)
                    .withBody("Internal Server Error: " + e.getMessage());
        }
    }

    private Map<String, String> getDefaultHeaders() {
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("Access-Control-Allow-Origin", "*");
        headers.put("Access-Control-Allow-Methods", "GET");
        return headers;
    }
}
