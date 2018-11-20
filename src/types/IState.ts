import { RootState } from 'src/typings';

interface IState extends RootState {
    [key: string]: any;
}

export default IState;