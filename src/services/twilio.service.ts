import twilio from 'twilio';
import envConfig from '../config/envConfig';

const accountSid = envConfig.TWILIO_ACCOUNT_SID;
const authToken = envConfig.TWILIO_AUTH_TOKEN;

export const client = twilio(accountSid, authToken);
