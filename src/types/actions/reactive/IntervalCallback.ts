import { Action } from 'redux';

interface IIntervalCallback<T = any> extends Action<T> {
    index: number;
}

export default IIntervalCallback;