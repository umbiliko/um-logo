import * as React from 'react';
import longArc from 'src/components/painting/longArc';
import smallArc from 'src/components/painting/smallArc';
import { IMatrix, IVector } from 'src/types';
import angle from 'src/utils/angle';
import circlePlot from 'src/utils/circlePlot';
import plot from 'src/utils/plot';
import rotate from 'src/utils/rotate';
import rotateX from 'src/utils/rotateX';
import rotateY from 'src/utils/rotateY';
import rotateZ from 'src/utils/rotateZ';
import splot from 'src/utils/splot';
import translate from 'src/utils/translate';
import Color from './Color';

interface ILogoProps {
    center?: IVector;
    colors?: string[];
    matrix?: IMatrix;
    opacity?: number;
    radio?: number;
    split?: number;
}

interface ILogoState {
    center: IVector;
    colors: string[];
    matrix: IMatrix;
    opacity: number;
    radio: number;
    split: number;
}

class Logo extends React.Component<ILogoProps, ILogoState> {

    private canvas: React.ReactNode;
    private ctx: CanvasRenderingContext2D | null;

    constructor(props: ILogoProps) {
        super(props);

        this.state = {
            center: { x: 100, y: 100, z: 0 },
            colors: ['#693', '#369', '#369', '#693', '#369', '#693', '#693', '#369', '#FFF'],
            matrix: {
                x: { x: 1, y: 0, z: 0 },
                y: { x: 0, y: 1, z: 0 },
                z: { x: 0, y: 0, z: 1 }
            },
            opacity: 1,
            radio: 100,
            split: 10,
            ...props
        };

        this.ctx = null;
        this.canvas = (<canvas ref={node => { this.ctx = node ? node.getContext('2d') : null } }/>);
    }

    public componentDidMount() {
        this.rotate(0.4, 0.5, 0.2);
        
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.paint(this.ctx);
        }
    }

    public componentDidUpdate() {
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.paint(this.ctx);
        }
    }

    public get center(): IVector {
        const { center: { x, y, z } } = this.state;

        return { x, y, z };
    }
    
    public set center(value: IVector) {
        this.setState({ center: value });
    }

    public get colors(): string[] {
        return this.state.colors;
    }

    public set colors(value: string[]) {
        this.setState({ colors: value });
    };

    public get opacity() {
        return this.state.opacity;
    }

    public set opacity(value: number) {
        this.setState({ opacity: value });
    }

    public get radio() {
        return this.state.radio;
    }

    public set radio(value: number) {
        this.setState({ radio: value });
    }

    public get split() {
        return this.state.split;
    }

    public set split(value: number) {
        this.setState({ split: value });
    }
    
    public paint(ctx: CanvasRenderingContext2D) {
        const { center, colors, opacity, radio: r, split: d, matrix } = this.state;
        // const { x: qx, y: qy, z: qz } = matrix;

        const h = Math.sqrt(r * r - d * d);
        const mhu = Math.asin(d / r);
        let color: Color | null = null;

        // tslint:disable:no-console
        console.log('painting');

        if (colors.length > 8) {
            color = new Color(colors[8]);
            color.opacity = opacity;
            
            let gradient: CanvasGradient | string | null = null;
            
            try {
                const p0 = center;
                const p1 = translate(center, circlePlot(Math.PI / 4, r));
                gradient = ctx.createRadialGradient(p0.x, p0.y, r, p1.x, p1.y, r);
                gradient.addColorStop(0, color.lighter(0.2));
                gradient.addColorStop(0.5, color.value);
                gradient.addColorStop(1, color.darker(0.2));
            }
            catch (err) {
                gradient = color.value;
            }

            color.opacity = opacity * .2;

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(center.x, center.y, r, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = color.value;
            ctx.stroke();
        }

        // ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = 0; i < 8; i++) {
            
            const q = 7 - i;
            // tslint:disable:no-bitwise
            const v: IVector = {
                x: ((q << 1) & 2) - 1,
                y: (q & 2) - 1,
                z: ((q >> 1) & 2) - 1
            };

            const n: IMatrix = {
                x: plot(matrix.x, v.x),
                y: plot(matrix.y, v.y),
                z: plot(matrix.z, v.z)
            };

            const cos = Math.sqrt(2) / 2;
            const sin = cos * v.x * v.y * v.z;
            
            const m = { 
                x: translate(plot(rotate(n.x, n.y, sin, cos), d / cos), plot(n.x, h)),
                y: translate(plot(rotate(n.y, n.z, sin, cos), d / cos), plot(n.y, h)),
                z: translate(plot(rotate(n.z, n.x, sin, cos), d / cos), plot(n.z, h))
            };

            if (m.x.z < 0 && m.y.z < 0 && m.z.z < 0) {
                continue;
            }

            color = new Color(colors[i]);
            
            if (opacity >= 0 && opacity < 1) {
                color.opacity = opacity;
            }

            let gradient: CanvasGradient | string | null = null;
            
            try {
                const p0 = center;
                const p1 = translate(center, circlePlot(Math.PI / 4, r));
                gradient = ctx.createRadialGradient(p0.x, p0.y, r, p1.x, p1.y, r);
                gradient.addColorStop(0, color.lighter(0.2));
                gradient.addColorStop(0.5, color.value);
                gradient.addColorStop(1, color.darker(0.2));
            }
            catch (err) {
                gradient = color.value;
            }

            ctx.fillStyle = gradient;

            const c: IMatrix = {
                x: translate(center, plot(n.x, d)),
                y: translate(center, plot(n.y, d)),
                z: translate(center, plot(n.z, d))
            };

            const phi = { x: mhu, y: mhu, z: mhu };
            const rho = {
                x: Math.PI / 2 - mhu,
                y: Math.PI / 2 - mhu,
                z: Math.PI / 2 - mhu
            };

            const p = {
                x: translate(center, m.x),
                y: translate(center, m.y),
                z: translate(center, m.z)
            };

            if (m.x.z > 0 && m.y.z > 0 && m.z.z > 0) {
                ctx.beginPath();
                ctx.moveTo(p.y.x, p.y.y);
                longArc(ctx, c.x, p.y, h, phi.x, rho.x, n.y, n.z);
                longArc(ctx, c.y, p.z, h, phi.y, rho.y, n.z, n.x);
                longArc(ctx, c.z, p.x, h, phi.z, rho.z, n.x, n.y);
                ctx.closePath();
                ctx.fill();
            }
            else {
                let axy = 0;
                let axz = 0;
                let ayx = 0;
                let ayz = 0;
                let azx = 0;
                let azy = 0;
                let pxy = p.x;
                let pxz = p.x;
                let pyx = p.y;
                let pyz = p.y;
                let pzx = p.z;
                let pzy = p.z;

                if (m.x.z < 0) {
                    rho.y = Math.atan(-m.z.z / m.x.z);
                    phi.z = Math.atan(-m.x.z / m.y.z);

                    pxy = translate(c.y, splot(rho.y, h, n.z, n.x));
                    pxz = translate(c.z, splot(phi.z, h, n.x, n.y));

                    axz = angle(center, pxz);
                    axy = angle(center, pxy);
                }

                if (m.y.z < 0) {
                    phi.x = Math.atan(-m.y.z / m.z.z);
                    rho.z = Math.atan(-m.x.z / m.y.z);

                    pyx = translate(c.x, splot(phi.x, h, n.y, n.z));
                    pyz = translate(c.z, splot(rho.z, h, n.x, n.y));

                    ayx = angle(center, pyx);
                    ayz = angle(center, pyz);
                }

                if (m.z.z < 0) {
                    rho.x = Math.atan(-m.y.z / m.z.z);
                    phi.y = Math.atan(-m.z.z / m.x.z);

                    pzx = translate(c.x, splot(rho.x, h, n.y, n.z));
                    pzy = translate(c.y, splot(phi.y, h, n.z, n.x));

                    azx = angle(center, pzx);
                    azy = angle(center, pzy);
                }

                if (m.x.z > 0 && m.y.z > 0) {
                    ctx.moveTo(pzx.x, pzx.y);
                    ctx.beginPath();
                    longArc(ctx, c.y, pzy, h, phi.y, rho.y, n.z, n.x);
                    longArc(ctx, c.z, pxz, h, phi.z, rho.z, n.x, n.y);
                    longArc(ctx, c.x, pyx, h, phi.x, rho.x, n.y, n.z);
                    smallArc(ctx, center, pzx, r, azx, azy);
                    ctx.closePath();
                    ctx.fill();
                } else if (m.y.z > 0 && m.z.z > 0) {
                    ctx.moveTo(pxz.x, pxz.y);
                    ctx.beginPath();
                    longArc(ctx, c.z, pxz, h, phi.z, rho.z, n.x, n.y);
                    longArc(ctx, c.x, pyx, h, phi.x, rho.x, n.y, n.z);
                    longArc(ctx, c.y, pzx, h, phi.y, rho.y, n.z, n.x);
                    smallArc(ctx, center, pxy, r, axy, axz);
                    ctx.closePath();
                    ctx.fill();
                } else if (m.z.z > 0 && m.x.z > 0) {
                    ctx.moveTo(pyx.x, pyx.y);
                    ctx.beginPath();
                    longArc(ctx, c.x, pyx, h, phi.x, rho.x, n.y, n.z);
                    longArc(ctx, c.y, pzx, h, phi.y, rho.y, n.z, n.x);
                    longArc(ctx, c.z, pxz, h, phi.z, rho.z, n.x, n.y);
                    smallArc(ctx, center, pyz, r, ayz, ayx);
                    ctx.closePath();
                    ctx.fill();
                } else if (m.x.z > 0) {
                    ctx.moveTo(pzy.x, pzy.y);
                    ctx.beginPath();
                    longArc(ctx, c.y, pzy, h, phi.y, rho.y, n.z, n.x);
                    longArc(ctx, c.z, pxz, h, phi.z, rho.z, n.x, n.y);
                    smallArc(ctx, center, pyz, r, ayz, azy);
                    ctx.closePath();
                    ctx.fill();
                } else if (m.y.z > 0) {
                    ctx.moveTo(pxz.x, pxz.y);
                    ctx.beginPath();
                    longArc(ctx, c.z, pxz, h, phi.z, rho.z, n.x, n.y);
                    longArc(ctx, c.x, pyx, h, phi.x, rho.x, n.y, n.z);
                    smallArc(ctx, center, pzx, r, azx, axz);
                    ctx.closePath();
                    ctx.fill();
                } else if (m.z.z > 0) {
                    ctx.moveTo(pyx.x, pyx.y);
                    ctx.beginPath();
                    longArc(ctx, c.x, pyx, h, phi.x, rho.x, n.y, n.z);
                    longArc(ctx, c.y, pzy, h, phi.y, rho.y, n.z, n.x);
                    smallArc(ctx, center, pxy, r, axy, ayx);
                    ctx.closePath();
                    ctx.fill();
                }
            }
        }
    }

    public rotate(x: number, y: number, z: number) {

        let { matrix: { x: qx, y: qy, z: qz } } = this.state;
        
        if (x !== 0) {
            const cosX = Math.cos(x);
            const sinX = Math.sin(x);
            qx = rotateX(qx, cosX, sinX);
            qy = rotateX(qy, cosX, sinX);
            qz = rotateX(qz, cosX, sinX);
        }

        if (y !== 0) {
            const cosY = Math.cos(y);
            const sinY = Math.sin(y);
            qx = rotateY(qx, cosY, sinY);
            qy = rotateY(qy, cosY, sinY);
            qz = rotateY(qz, cosY, sinY);
        }

        if (z !== 0) {
            const cosZ = Math.cos(z);
            const sinZ = Math.sin(z);
            qx = rotateZ(qx, cosZ, sinZ);
            qy = rotateZ(qy, cosZ, sinZ);
            qz = rotateZ(qz, cosZ, sinZ);
        }

        this.setState({ matrix: { x: qx, y: qy, z: qz } });
    }

    public render() {
        return this.canvas;
    }
}

export default Logo;
