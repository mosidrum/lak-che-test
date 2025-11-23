import { client } from './twilio.service';
import envConfig from "../config/envConfig";

export const sendWhatsAppMessage = async (to: string, message: string) => {
    await client.messages.create({
        from: envConfig.TWILIO_PHONE_NUMBER,
        to: `whatsapp:${to}`,
        body: message
    });
};
