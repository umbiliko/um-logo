import { RootState } from 'src/types';

interface IState extends RootState {
    [key: string]: any;
}

export default IState;