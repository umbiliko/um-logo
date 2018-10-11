export default (num: string, totalChars: number): string => {
    const pad = '0';
    num = num + '';
    while (num.length < totalChars) {
        num = pad + num;
    }
    return num;
};