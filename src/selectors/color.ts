import pad from 'src/utils/pad';
import getRgba from './getRgba';
import hexColorToRgba from './hexColorToRgba';

// color: #RGB, #RRGGBB, rgb(R, G, B), rgba(R, G, B, A)
// opcity: -1 ... 1. negative: lighter, positive: darker
// alpha: 0...1;
export default (baseColor: string, opacity: number = 0, alpha: number = 1): string => {
    if (typeof baseColor !== 'string') {
        baseColor = '#CCC';
    }
    
    // Trim trailing/leading whitespace
    baseColor = baseColor.replace(/^\s*|\s*$/, '');

    // Expand three-digit hex
    baseColor = baseColor.replace(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i, '#$1$1$2$2$3$3');

    // Calculate ratio
    const difference = Math.round(opacity * 256);

    // Determine if input is RGB(A)
    const rgb = getRgba(baseColor) || hexColorToRgba(baseColor) || [];
    
    if (typeof alpha !== 'number') {
        alpha = (rgb && rgb.length > 0 && rgb[0]) || 1;
    }
    // Convert hex to decimal
    const decimal = [rgb[1], rgb[2], rgb[3]];

    if (opacity === 0 && alpha === 1) {
        return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha || rgb[3]})`;
    }

    const darker = opacity < 0;

    const round: (n: number) => number = darker ? (n: number) => Math.max(n, 0) : (n: number) => Math.min(n, 255);

    const components = decimal.map(d => round(d + difference));

    // Return RGB(A)
    return !!rgb ?
    'rgb' + (alpha !== null ? 'a' : '') + `(${components[0]}, ${components[1]}, ${components[2]}` + (alpha !== null ? ', ' + alpha : '') + ')' :
    // Return hex
    `#${pad(components[0].toString(16), 2)}${pad(components[1].toString(16), 2)}${pad(components[2].toString(16), 2)}`;
}