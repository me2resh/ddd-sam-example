import { proxyActivities } from '@temporalio/workflow';
// Import activities from index files
import type * as activities from '@activities/appointment-management';
import type * as notificationActivities from '@activities/notification';

const { cancelAppointment } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

const { sendSMSNotification } = proxyActivities<typeof notificationActivities>({
  startToCloseTimeout: '1 minute',
});

/** A workflow that cancels an appointment and sends an SMS notification */
export async function cancelAppointmentWorkflow(appointmentId: string, phoneNumber: string): Promise<boolean> {
  const appointmentCanceled = await cancelAppointment(appointmentId);
  
  if (appointmentCanceled) {
    await sendSMSNotification(phoneNumber, 'Your appointment has been canceled.');
  }

  return appointmentCanceled;
}
