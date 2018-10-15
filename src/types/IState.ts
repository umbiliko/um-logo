import { IRootState } from 'src/types';

interface IState extends IRootState {
    [key: string]: any;
}

export default IState;