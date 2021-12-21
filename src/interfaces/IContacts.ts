import IContact from './IContact';

export default interface IState {
  contacts: IContact[];
  token?: string;
}
