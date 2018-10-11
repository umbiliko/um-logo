import pad from './utils/pad';

class Color {

    private myValue: string;
    private myOpacity: number = 1;

    constructor(value: string) {
        this.myValue = value;
        this.myOpacity = 1;
    }

    // Ratio is between 0 and 1
    public change(ratio: number, darker: boolean) {

        if (arguments.length === 0 && this.myOpacity === 1) {
            return this.myValue;
        }

        let color = this.myValue;

        // Trim trailing/leading whitespace
        color = color.replace(/^\s*|\s*$/, '');

        // Expand three-digit hex
        color = color.replace(
            /^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i,
            '#$1$1$2$2$3$3'
        );

        // Calculate ratio
        const difference = Math.round(ratio * 256) * (darker ? -1 : 1);

            // Determine if input is RGB(A)
        const rgb = color.match(new RegExp('^rgba?\\(\\s*' +
                '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
                '\\s*,\\s*' +
                '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
                '\\s*,\\s*' +
                '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
                '(?:\\s*,\\s*' +
                '(0|1|0?\\.\\d+))?' +
                '\\s*\\)$'
            , 'i'));
            
        const alpha = this.myOpacity/*!!rgb && rgb[4] != null ? rgb[4] : null*/;

            // Convert hex to decimal
        const decimal = !!rgb ? [rgb[1], rgb[2], rgb[3]] : color.replace(
            /^#?([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])/i,
            (a, r, g, b) => parseInt(r, 16) + ',' + parseInt(g, 16) + ',' + parseInt(b, 16)
        ).split(/,/);

        if (arguments.length === 0) {
            return 'rgba(' + parseInt(decimal[0], 10) + ', ' + parseInt(decimal[1], 10) + ', ' + parseInt(decimal[2], 10) + ', ' + alpha + ')';
        }

        // Return RGB(A)
        return !!rgb ?
        'rgb' + (alpha !== null ? 'a' : '') + '(' +
            Math[darker ? 'max' : 'min'](
                parseInt(decimal[0], 10) + difference, darker ? 0 : 255
            ) + ', ' +
            Math[darker ? 'max' : 'min'](
                parseInt(decimal[1], 10) + difference, darker ? 0 : 255
            ) + ', ' +
            Math[darker ? 'max' : 'min'](
                parseInt(decimal[2], 10) + difference, darker ? 0 : 255
            ) +
            (alpha !== null ? ', ' + alpha : '') +
            ')' :
        // Return hex
        [
            '#',
            pad(Math[darker ? 'max' : 'min'](
                parseInt(decimal[0], 10) + difference, darker ? 0 : 255
            ).toString(16), 2),
            pad(Math[darker ? 'max' : 'min'](
                parseInt(decimal[1], 10) + difference, darker ? 0 : 255
            ).toString(16), 2),
            pad(Math[darker ? 'max' : 'min'](
                parseInt(decimal[2], 10) + difference, darker ? 0 : 255
            ).toString(16), 2)
        ].join('');
    }

    public lighter(ratio: number) {
        return this.change(ratio, false);
    }

    public darker(ratio: number) {
        return this.change(ratio, true);
    }

    public get opacity() {
        return this.myOpacity;
    }

    public set opacity(value: number) {
        this.myOpacity = Math.max(0, Math.min(1, value));
    }

    public get value(): string {
        return this.myValue;
    }
}

export default Color;