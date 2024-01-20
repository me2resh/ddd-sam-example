package command.lambda;

import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import org.junit.Before;
import org.junit.Test;

import java.util.Collections;
import java.util.HashMap;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class PatientAppointmentLambdaHandlerTest {

    private PatientAppointmentLambdaHandler handler;

    @Before
    public void setUp() {
        handler = new PatientAppointmentLambdaHandler();
    }

    @Test
    public void handleRequest_WithValidPatientId_Returns200() {
        String patientId = "validPatientId";
        APIGatewayProxyRequestEvent requestEvent = new APIGatewayProxyRequestEvent();
        requestEvent.setPathParameters(Collections.singletonMap("patientId", patientId));

        // Assuming the repository is initialized with appointments for the given patientId
        APIGatewayProxyResponseEvent response = handler.handleRequest(requestEvent, null);

        assertEquals(200, response.getStatusCode().intValue());
        assertNotNull(response.getBody());
    }

    @Test
    public void handleRequest_WithMissingPatientId_Returns400() {
        APIGatewayProxyRequestEvent requestEvent = new APIGatewayProxyRequestEvent();
        requestEvent.setPathParameters(new HashMap<>()); // Empty path parameters

        APIGatewayProxyResponseEvent response = handler.handleRequest(requestEvent, null);

        assertEquals(400, response.getStatusCode().intValue());
        assertEquals("Patient ID is missing", response.getBody());
    }
}
