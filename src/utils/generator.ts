import crypto from 'node:crypto';

export const otpGenerator = (length = 6): string => {
    const max = Math.pow(10, length);
    const random = crypto.randomInt(0, max);
    return random.toString().padStart(length, '0');
};

export const pinGenerator = () => crypto.randomInt(1000, 10_000).toString();

