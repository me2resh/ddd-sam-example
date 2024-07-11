import { APIGatewayProxyEvent } from 'aws-lambda';
import { lambdaHandler } from '@/command/lambda/patient-appointments';
import { MockAppointmentRepository } from '@/infrastructure/mock-appointment-repository';
import { AppointmentService } from '@/application/appointment-service';
import { logger } from '@/utils/logger';

jest.mock('@/infrastructure/mock-appointment-repository');
jest.mock('@/application/appointment-service');
jest.mock('@/utils/logger');

describe('lambdaHandler', () => {
    let event: APIGatewayProxyEvent;

    beforeEach(() => {
        event = {
            httpMethod: 'GET',
            pathParameters: { patientId: 'user1' },
            // Add other necessary fields for your test
        } as unknown as APIGatewayProxyEvent;

        (MockAppointmentRepository.prototype.getAppointmentsByPatientId as jest.Mock).mockResolvedValue([]);
        (AppointmentService.prototype.getAppointmentsByPatientId as jest.Mock).mockResolvedValue([]);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        (logger.info as jest.Mock).mockImplementation(() => {});
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        (logger.error as jest.Mock).mockImplementation(() => {});
    });

    it('should return 200 and appointments for valid patient ID', async () => {
        const result = await lambdaHandler(event);
        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body)).toEqual([]);
        expect(logger.info).toHaveBeenCalled();
    });

    it('should return 400 if patient ID is missing', async () => {
        event.pathParameters = null;
        const result = await lambdaHandler(event);
        expect(result.statusCode).toBe(400);
        expect(JSON.parse(result.body).message).toBe('Patient ID is missing');
        expect(logger.error).toHaveBeenCalled();
    });

    it('should return 500 if there is an error', async () => {
        (AppointmentService.prototype.getAppointmentsByPatientId as jest.Mock).mockRejectedValue(new Error('Test error'));
        const result = await lambdaHandler(event);
        expect(result.statusCode).toBe(500);
        expect(JSON.parse(result.body).message).toBe('Test error');
        expect(logger.error).toHaveBeenCalled();
    });
});
