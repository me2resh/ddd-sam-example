// src/activities/notification/sendSMSNotification.ts

export async function sendSMSNotification(phoneNumber: string, message: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 5000));
    // Simulate sending an SMS
    return true;
}
