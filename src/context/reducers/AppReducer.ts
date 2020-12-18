import { IClient } from '../../interfaces/IClient';

export enum Types {
  LOAD_CLIENT = 'LOAD_CLIENT',
  ADD_CLIENT = 'ADD_CLIENT',
  UPDATE_CLIENT = 'UPDATE_CLIENT',
  REMOVE_CLIENT = 'REMOVE_CLIENT',
}

export type Actions =
  | { type: Types.LOAD_CLIENT; payload: IClient[] }
  | {
      type: Types.ADD_CLIENT | Types.UPDATE_CLIENT;
      payload: IClient;
    }
  | {
      type: Types.REMOVE_CLIENT;
      payload: { id: number };
    };

export const reducer = (state: IClient[], action: Actions) => {
  switch (action.type) {
    case Types.LOAD_CLIENT:
      return [...state, ...action.payload];

    case Types.ADD_CLIENT:
      state.unshift({
        id: state.length + 1,
        active: true,
        ...action.payload,
      });

      return [...state];

    case Types.UPDATE_CLIENT: {
      const client = action.payload;
      const clientIndex = state.findIndex((c) => c.id === client.id);

      const newState = state;
      if (clientIndex >= 0) newState[clientIndex] = client;

      return [...newState];
    }

    case Types.REMOVE_CLIENT: {
      const { id } = action.payload;
      const index = state.findIndex((c) => c.id === id);

      index >= 0 && state.splice(index, 1);

      return [...state];
    }
    default:
      return [...state];
  }
};
