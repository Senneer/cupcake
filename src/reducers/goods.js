const initState = [];

export default function goodsTotal(state = initState, action) {
  if (action.type === 'LOAD_DATA') {
    return action.payload;
  }
  return state;
}