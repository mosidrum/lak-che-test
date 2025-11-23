import crypto from 'node:crypto';

export const otpGenerator = (length = 6): string => {
    const max = Math.pow(10, length);
    const random = crypto.randomInt(0, max);
    return random.toString().padStart(length, '0');
};

export const pinGenerator = (length: number = 6): string => {
    const max = Math.pow(10, length);
    const random = crypto.randomInt(0, max);
    return random.toString().padStart(length, '0');
};
