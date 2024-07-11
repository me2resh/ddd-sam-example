import { NativeConnection, Worker } from '@temporalio/worker';
import * as appointmentManagementActivities from './activities/appointment-management';
import * as notificationActivities from './activities/notification';

async function run() {
  // Step 1: Establish a connection with Temporal server.
  const connection = await NativeConnection.connect({
    address: 'localhost:7233',
  });

  // Combine activities from different categories
  const activities = {
    ...appointmentManagementActivities,
    ...notificationActivities,
  };

  // Step 2: Register Workflows and Activities with the Worker.
  const worker = await Worker.create({
    connection,
    namespace: 'default',
    taskQueue: 'appointments-task-queue',
    workflowsPath: require.resolve('./workflows/appointments'),
    activities,
  });

  // Step 3: Start accepting tasks on the `appointments-task-queue`
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
