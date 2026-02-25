/**
 * Twilio SMS Service (Client-side trigger or Server-side Function)
 * Note: In a production app, these should be triggered via Firebase Cloud Functions
 * to keep Twilio API keys secure.
 */

export const sendSmsAlert = async (to: string, message: string) => {
  console.log(`[Twilio SMS] Sending alert to ${to}: ${message}`);
  
  // Real implementation would call a Firebase Cloud Function endpoint:
  /*
  const response = await fetch('/api/notifications/sms', {
    method: 'POST',
    body: JSON.stringify({ to, message }),
  });
  return response.ok;
  */
  
  return true;
};

export const formatEmergencySms = (bloodType: string, hospitalName: string, location: string) => {
  return `URGENT: ${bloodType} blood requested at ${hospitalName} (${location}). Your help is needed! Log in to Campus Lifeline to respond.`;
};
