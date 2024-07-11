// src/tests/unit/workflows/scheduleAppointmentWorkflow/scheduleAppointmentWorkflow.test.ts

import { TestWorkflowEnvironment } from '@temporalio/testing';
import { Worker } from '@temporalio/worker';
import { v4 as uuid4 } from 'uuid';
import { scheduleAppointmentWorkflow } from '@workflows/appointments/scheduleAppointmentWorkflow';


jest.setTimeout(30000); // Increase the timeout to 30 seconds

let testEnv: TestWorkflowEnvironment | undefined;

beforeAll(async () => {
  testEnv = await TestWorkflowEnvironment.createTimeSkipping();
});

afterAll(async () => {
  if (testEnv) {
    await testEnv.teardown();
  }
});

test('should create appointment and send notifications', async () => {
  if (!testEnv) throw new Error('TestWorkflowEnvironment not initialized');

  const mockActivities = {
    createAppointment: jest.fn().mockResolvedValue(true),
    sendEmailNotification: jest.fn().mockResolvedValue(true),
    // sendSMSNotification: jest.fn().mockResolvedValue(true),
  };

  const worker = await Worker.create({
    connection: testEnv.nativeConnection,
    taskQueue: 'test',
    workflowsPath: require.resolve('@workflows/appointments/scheduleAppointmentWorkflow'),
    activities: mockActivities,
  });

  // Start the worker and run the test workflow
  const result = await worker.runUntil(
    testEnv.client.workflow.execute(scheduleAppointmentWorkflow, {
      workflowId: uuid4(),
      taskQueue: 'test',
      args: ['patient-id', { date: '2024-07-11', time: '10:00 AM' }, 'patient@example.com'],
    })
  );

  expect(result).toBe(true);
  expect(mockActivities.createAppointment).toHaveBeenCalledWith('patient-id', { date: '2024-07-11', time: '10:00 AM' });
  expect(mockActivities.sendEmailNotification).toHaveBeenCalledWith('patient@example.com', 'Appointment Scheduled', 'Your appointment has been successfully scheduled.');
//   expect(mockActivities.sendSMSNotification).toHaveBeenCalledWith('patient-id', 'Your appointment has been successfully scheduled.');
});
