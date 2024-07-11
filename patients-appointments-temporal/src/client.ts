import { Connection, Client } from '@temporalio/client';
import { scheduleAppointmentWorkflow } from './workflows/appointments';
import { nanoid } from 'nanoid';

async function run() {
  // Connect to the default Server location
  const connection = await Connection.connect({ address: 'localhost:7233' });
  // In production, pass options to configure TLS and other settings:
  // {
  //   address: 'foo.bar.tmprl.cloud',
  //   tls: {}
  // }

  const client = new Client({
    connection,
    // namespace: 'foo.bar', // connects to 'default' namespace if not specified
  });

  const patientId = 'patient-123';
  const appointmentDetails = { date: '2024-08-01', time: '10:00 AM' };
  const email = 'patient@example.com';

  const handle = await client.workflow.start(scheduleAppointmentWorkflow, {
    taskQueue: 'appointments-task-queue',
    // Pass the correct arguments to the workflow
    args: [patientId, appointmentDetails, email],
    // in practice, use a meaningful business ID, like customerId or transactionId
    workflowId: 'workflow-' + nanoid(),
  });
  console.log(`Started workflow ${handle.workflowId}`);

  // optional: wait for client result
  console.log(await handle.result());
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
