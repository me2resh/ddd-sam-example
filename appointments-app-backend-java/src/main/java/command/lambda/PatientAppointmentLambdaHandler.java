package command.lambda;

import application.AppointmentService;
import domain.Appointment;
import infrastructure.MockAppointmentRepository;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PatientAppointmentLambdaHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    @Override
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent event, Context context) {
        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        try {
            String patientId = event.getPathParameters().get("patientId");

            if (patientId == null) {
                return response
                    .withStatusCode(400)
                    .withBody("Patient ID is missing");
            }

            AppointmentService appointmentService = new AppointmentService(new MockAppointmentRepository());
            List<Appointment> appointments = appointmentService.getAppointmentsByPatientId(patientId);

            response
                .withStatusCode(200)
                .withBody(appointments.toString()); // Convert appointments to JSON

        } catch (Exception e) {
            response
                .withStatusCode(500)
                .withBody("Internal Server Error: " + e.getMessage());
        }

        return response.withHeaders(getDefaultHeaders());
    }

    private Map<String, String> getDefaultHeaders() {
        Map<String, String> headers = new HashMap<>();
        headers.put("Access-Control-Allow-Origin", "*");
        headers.put("Access-Control-Allow-Headers", "*");
        headers.put("Access-Control-Allow-Methods", "*");
        return headers;
    }
}
