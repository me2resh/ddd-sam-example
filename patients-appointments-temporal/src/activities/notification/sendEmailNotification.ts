// src/activities/notification/sendEmailNotification.ts

export async function sendEmailNotification(email: string, subject: string, body: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 20000));
    // Simulate sending an email
    return true;
}
