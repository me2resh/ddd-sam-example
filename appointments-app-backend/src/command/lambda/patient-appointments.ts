import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { MockAppointmentRepository } from '@/infrastructure/mock-appointment-repository';
import { AppointmentService } from '@/application/appointment-service';

const appointmentRepository = new MockAppointmentRepository();
const appointmentService = new AppointmentService(appointmentRepository);

const headers =  {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*',
  }

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {

        const patientId = event.pathParameters?.patientId;

        if (!patientId) {
            return {
                statusCode: 400,
                headers: headers,
                body: JSON.stringify({
                    message: "Patient ID is missing",
                }),
            };
        }

        const appointments = await appointmentService.getAppointmentsByPatientId(patientId);

        return {
            statusCode: 200,
            headers: headers,
            body: JSON.stringify(appointments),
        };

    } catch (err) {
        
        return {
            statusCode: 500,
            headers: headers,
            body: JSON.stringify({
                message: err,
            }),
        };
        
    }
};
