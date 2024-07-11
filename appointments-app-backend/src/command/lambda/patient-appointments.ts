import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { MockAppointmentRepository } from '@/infrastructure/mock-appointment-repository';
import { AppointmentService } from '@/application/appointment-service';
import { logger } from '@/utils/logger';

const appointmentRepository = new MockAppointmentRepository();
const appointmentService = new AppointmentService(appointmentRepository);

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*',
};

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('Received event', { event });

    try {
        const patientId = event.pathParameters?.patientId;

        if (!patientId) {
            logger.error('Patient ID is missing');
            return {
                statusCode: 400,
                headers: headers,
                body: JSON.stringify({
                    message: 'Patient ID is missing',
                }),
            };
        }

        const appointments = await appointmentService.getAppointmentsByPatientId(patientId);
        logger.info('Appointments retrieved', { patientId, count: appointments.length });

        return {
            statusCode: 200,
            headers: headers,
            body: JSON.stringify(appointments),
        };
    } catch (err) {
        logger.error('Error retrieving appointments', { error: err });

        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        return {
            statusCode: 500,
            headers: headers,
            body: JSON.stringify({
                message: errorMessage,
            }),
        };
    }
};
