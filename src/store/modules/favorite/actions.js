export const toggleFavorite=(product)=> {
    return {
      type: 'TOGGLE_FAVORITE',
      product,
    };
  }
  