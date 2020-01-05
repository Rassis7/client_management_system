import { Reducer } from "redux";
import { IClient } from "./../../interfaces/IClient";
import { createActions, createReducer } from "reduxsauce";

/**
 * Action types & creators
 */
export const { Types, Creators } = createActions({
  loadClient: ["clients"],
  addClient: ["client"],
  updateClient: ["client"],
  removeClient: ["id"]
});

/**
 * Handlers
 */
const INITIAL_STATE: IClient[] = [];

const load = (state = INITIAL_STATE, action: any): IClient[] => [
  ...state,
  ...action.clients
];

const add = (state = INITIAL_STATE, action: any): IClient[] => [
  ...state,
  {
    id: state.length + 1,
    name: action.client.name,
    cpf: action.client.cpf,
    phone: action.client.phone,
    email: action.client.email,
    active: true
  }
];

const update = (state = INITIAL_STATE, action: any): IClient[] => {
  const { client } = action;
  const clientIndex = state.findIndex(c => c.id === client.id);
  if (clientIndex >= 0) state[clientIndex] = client;

  return state;
};

const remove = (state = INITIAL_STATE, action: any): IClient[] => {
  const { id } = action;
  const clientIndex = state.findIndex(c => c.id === id);

  if (clientIndex >= 0) {
    state.splice(clientIndex, 1);
  }

  return state;
};

/**
 * Reducer
 */
const reducer: Reducer<IClient[]> = createReducer(INITIAL_STATE, {
  [Types.LOAD_CLIENT]: load,
  [Types.ADD_CLIENT]: add,
  [Types.UPDATE_CLIENT]: update,
  [Types.REMOVE_CLIENT]: remove
});

export default reducer;
