// src/activities/appointment-management/cancelAppointment.ts

export async function cancelAppointment(appointmentId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 20000));
    // Simulate cancelling an appointment
    return true;
}
