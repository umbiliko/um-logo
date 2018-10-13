import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IQuadrantProps, IQuadrantState } from 'src/types';
import { color, ordinalToVector } from 'src/selectors';

class SvgGQuadrant extends React.Component<IQuadrantProps, IQuadrantState> {

    public static get defaultProps(): Partial<IQuadrantProps> {
        return {
            alpha: 1,
            color: 'rgb(128, 129, 128)',
            opacity: 0
        }
    }

    public static get propTypes() {
        return {
            alpha: PropTypes.number,
            color: PropTypes.string,
            opacity: PropTypes.number
        };
    }

    constructor(props: IQuadrantProps) {
        super(props);
    }
    
    private calc(next: Partial<IQuadrantState>)  {
    }

    private get colorChanged(): boolean {
        return !!this.props.color && this.props.color !== this.state.baseColor;
    }

    private get opacityChanged(): boolean {
        return !!this.props.opacity && this.props.opacity !== this.state.opacity;
    }

    private get alphaChanged(): boolean {
        return !!this.props.alpha && this.props.alpha !== this.state.alpha;
    }

    private get ordinalChanged(): boolean {
        return this.props.ordinal !== this.state.ordinal;
    }

    private get matrixChanged(): boolean {
        return false;
    }
    
    private update() {
        const next: Partial<IQuadrantState> = {};

        if (this.alphaChanged || this.colorChanged || this.opacityChanged) {
            next.alpha = this.props.alpha;
            next.baseColor = this.props.color;
            next.fillColor = color(this.props.color, this.props.opacity, this.props.alpha);
            next.opacity = this.props.opacity;
        }
        
        if (this.ordinalChanged) {
            next.ordinal = this.props.ordinal;
            next.quadrant = ordinalToVector(this.props.ordinal);
        }

        if (this.matrixChanged) {
            
        }

        this.calc(next);
        
        this.setState({ ...this.state, ...next });
    }

    public render() {
        const { ordinal } = this.state;

        return (
            <g></g>
        );
    }
}

export default SvgGQuadrant;