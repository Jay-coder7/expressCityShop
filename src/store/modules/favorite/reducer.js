import produce from 'immer';

export const favorite=(state = [], action)=> {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      return produce(state, draft => {
        const { product } = action;

        const productIndex = draft.findIndex(p => p.id === product.id);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        } else {
          draft.push({ ...product, favorite: true });
        }
      });
    default:
      return state;
  }
}
