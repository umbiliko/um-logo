import { Color } from 'src/types';

// color: #RGB, #RRGGBB, rgb(R, G, B), rgba(R, G, B, A)
// opcity: -1 ... 1. negative: lighter, positive: darker
// alpha: 0...1;
export default (baseColor: Color, opacity: number = 0, alpha: number = 1): Color => {
    const [r, g, b, a] = baseColor;
    const diff = opacity * 255;

    return [...redistribute_rgb([r + diff, g + diff, b + diff]), typeof alpha === 'number' ? (a || 255) * alpha : (a || 255)];
}

const round_rgb = ([r, g, b]: Color): Color => [Math.round(r), Math.round(g), Math.round(b)];

const upper_rgb = ([r, g, b]: Color): Color => [Math.min(255, r), Math.min(255, g), Math.min(255, b)];

const lower_rgb = ([r, g, b]: Color): Color => [Math.max(0, r), Math.max(0, g), Math.max(0, b)];

const clamp_rgb = (color: Color): Color => round_rgb(upper_rgb(lower_rgb(color)));

const redistribute_rgb = ([r, g, b]: Color): Color => {
    const threshold = 255.999;
    const m = Math.max(r, g, b);
    
    if (m <= threshold) {
        return clamp_rgb([r, g, b]);
    }
    
    const total = r + g + b;
    
    if (total >= 3 * threshold) {
        return clamp_rgb([threshold, threshold, threshold]);
    }

    const x = (3 * threshold - total) / (3 * m - total);
    const gray = threshold - x * m;
    
    return clamp_rgb([gray + x * r, gray + x * g, gray + x * b]);
};