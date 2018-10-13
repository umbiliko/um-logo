const rgbaExp = new RegExp(
    `^rgba?\\(\\s*
    (\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])
    \\s*,\\s*
    (\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])
    \\s*,\\s*
    (\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])
    (?:\\s*,\\s*
    (0|1|0?\\.\\d+))?
    \\s*\\)$`,
    'i'
);
export default (color: string): number[] | null => {
    const rgba = color.match(rgbaExp);
    return rgba && rgba.map(d => parseInt(d, 10));

}