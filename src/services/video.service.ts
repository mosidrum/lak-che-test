import { client } from './twilio.service';

export const createVideoRoom = async (roomName: string) => {
    return await client.video.v1.rooms.create({
        uniqueName: roomName,
        type: 'group',
    });
};
