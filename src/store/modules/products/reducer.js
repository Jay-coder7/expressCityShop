import db from "../../../../db"

const INITIALS=[...db.products]
export const sellerProducts=(state=INITIALS,action)=>{
    switch (action.type) {
        case 'LOAD_SELLER_PRODUCTS':
            return state.filter(x=>x.sellerId===action.payload);
        case 'ADD_PRODUCT':
            return state.push({...action.payload});
        case 'EDIT_PRODUCT':
            return state.map(x=>{
                if(action.payload.id===x.id){
                    return {...action.payload}
                }else{
                    return x
                }
            })
        case 'DELETE_PRODUCT':
            return state.filter(x=>x.id!==action.payload)
        default:
            return state;
    }

}