import twilio from 'twilio';
import {BadRequestError} from "../lib";
import {logger} from "./logger";
import envConfig from "../config/envConfig";



const accountSid = envConfig.TWILIO_SID;
const authToken = envConfig.TWILIO_AUTH_TOKEN!;
const whatsappFrom = envConfig.TWILIO_PHONE_NUMBER!;

const client = twilio(accountSid, authToken);

export const sendWhatsAppMessage = async (to: string, message: string) => {
    try {
        await client.messages.create({
            from: whatsappFrom,
            to: `whatsapp:${to}`,
            body: message,
        });
    } catch (error) {
        logger.error('Twilio WhatsApp error:', error);
        throw new BadRequestError('Failed to send WhatsApp message');
    }
};
