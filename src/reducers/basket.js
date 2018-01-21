const initState = {
  goods: [],
  amount: 0
};

export default function basket(state = initState, action) {
  if (action.type === 'ADD_PROD') {
    return {
      ...state,
      goods: [...state.goods, action.payload],
      amount: state.amount + action.payload.count
    };
  }
  return state;
}