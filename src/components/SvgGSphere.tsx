import * as React from 'react';
import { ISphereProps, ISphereState, quadrant } from 'src/types';
import { range } from 'src/selectors';
import SvgGQuadrant from './SvgGQuadrant';

class SvgGSphere extends React.Component<ISphereProps, ISphereState> {
    public render() {
        return (
            <g>
                {range(8).map((i: quadrant) => (<SvgGQuadrant key={i} ordinal={i} />))}
            </g>
        );
    }
}

export default SvgGSphere;