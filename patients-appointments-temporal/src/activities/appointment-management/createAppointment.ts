// src/activities/appointment-management/createAppointment.ts

export async function createAppointment(patientId: string, appointmentDetails: any): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 20000));
    // Simulate creating an appointment
    return true;
}
