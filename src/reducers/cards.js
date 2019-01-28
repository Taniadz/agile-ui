import { actions } from '../actions/cards';

export const Cards = (
  state = {
    loader: false,
    cards: null,
  },
  action,
) => {
  switch (action.type) {
    case actions.LOAD_CARD_START:
      return {
        ...state,
        loader: true,
      };
    case actions.LOAD_CARD_SUCCESS:
      return {
        ...state,
        loader: false,
        cards: action.data
      };
    case actions.LOAD_CARD_FAILURE:
      return {
        ...state,
        loader: false,
        cards: {},
      };
    default:
      return state;
  }
};
