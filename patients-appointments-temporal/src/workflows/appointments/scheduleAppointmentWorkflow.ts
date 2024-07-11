import { proxyActivities } from '@temporalio/workflow';
// Import activities from index files
import type * as activities from '@activities/appointment-management';
import type * as notificationActivities from '@activities/notification';

const { createAppointment } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

const { sendEmailNotification } = proxyActivities<typeof notificationActivities>({
  startToCloseTimeout: '1 minute',
});

/** A workflow that schedules an appointment and sends an email notification */
export async function scheduleAppointmentWorkflow(patientId: string, appointmentDetails: any, email: string): Promise<boolean> {
  const appointmentCreated = await createAppointment(patientId, appointmentDetails);
  
  if (appointmentCreated) {
    await sendEmailNotification(email, 'Appointment Scheduled', 'Your appointment has been successfully scheduled.');
  }

  return appointmentCreated;
}
