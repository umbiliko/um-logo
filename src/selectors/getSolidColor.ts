import { Color } from 'src/typings';

// color: #RGB, #RRGGBB, rgb(R, G, B), rgba(R, G, B, A)
// opcity: -1 ... 1. negative: lighter, positive: darker
// alpha: 0...1;
export default (baseColor: Color, opacity: number = 0, alpha: number = 1): Color => {
    const [r, g, b, a] = baseColor;
    const diff = opacity * 255;

    return [...redistributeRGB([r + diff, g + diff, b + diff]), typeof alpha === 'number' ? (a || 255) * alpha : (a || 255)];
}

const roundRGB = ([r, g, b]: Color): Color => [Math.round(r), Math.round(g), Math.round(b)];

const upperRGB = ([r, g, b]: Color): Color => [Math.min(255, r), Math.min(255, g), Math.min(255, b)];

const lowerEGB = ([r, g, b]: Color): Color => [Math.max(0, r), Math.max(0, g), Math.max(0, b)];

const clampRGB = (color: Color): Color => roundRGB(upperRGB(lowerEGB(color)));

const redistributeRGB = ([r, g, b]: Color): Color => {
    const threshold = 255.999;
    const m = Math.max(r, g, b);
    
    if (m <= threshold) {
        return clampRGB([r, g, b]);
    }
    
    const total = r + g + b;
    
    if (total >= 3 * threshold) {
        return clampRGB([threshold, threshold, threshold]);
    }

    const x = (3 * threshold - total) / (3 * m - total);
    const gray = threshold - x * m;
    
    return clampRGB([gray + x * r, gray + x * g, gray + x * b]);
};