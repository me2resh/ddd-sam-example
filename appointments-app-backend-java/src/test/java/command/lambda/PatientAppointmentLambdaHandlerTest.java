package command.lambda;

import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import domain.Appointment;
import infrastructure.DynamoDBRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import java.util.Collections;
import java.util.HashMap;
import java.util.Arrays;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.when;

public class PatientAppointmentLambdaHandlerTest {

    private PatientAppointmentDynamoDBHandler handler;
    private DynamoDBRepository mockRepository;

    @Before
    public void setUp() {
        // Create a mock repository instead of a real one
        mockRepository = Mockito.mock(DynamoDBRepository.class);
        
        // Create the handler with the mocked repository
        handler = new PatientAppointmentDynamoDBHandler(mockRepository);
    }

    @Test
    public void handleRequest_WithValidPatientId_Returns200() {
        String patientId = "validPatientId";
        APIGatewayProxyRequestEvent requestEvent = new APIGatewayProxyRequestEvent();
        requestEvent.setPathParameters(Collections.singletonMap("patientId", patientId));

        // Mock the repository response
        when(mockRepository.getAppointmentsByPatientId(patientId))
            .thenReturn(Arrays.asList(
                new Appointment("app1", "confirmed", patientId, "2024-01-20T10:00:00Z", "2024-01-20T10:30:00Z")
            ));

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
