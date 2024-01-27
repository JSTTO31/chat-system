

export default function generateRandomAlphaNumeric(maxLength: number) {
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < maxLength; i++) {
        result += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
    }

    return result;
}