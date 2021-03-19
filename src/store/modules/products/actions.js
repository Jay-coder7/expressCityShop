export const loadSellerProduct=(sellerId)=>{
    return {
        type:'LOAD_SELLER_PRODUCTS',
        payload:sellerId,
    }

}

export const addProduct=(product)=>{
    return {
        type:'ADD_PRODUCT',
        payload:product
    }
}
export const updateProduct=(product)=>{
    return{
        type:'EDIT_PRODUCT',
        payload:product
    }
}
