import { Action } from 'redux';
import { INTERVAL } from 'src/actions/reactive/types';
import IntervalCallback from './IntervalCallback';

interface IInterval<T = any> {
    callback: IntervalCallback;
    duration?: number;
    finally?: Action<any>;
    times?: number;
    type: typeof INTERVAL;
}

export default IInterval;