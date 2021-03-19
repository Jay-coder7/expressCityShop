export const logIn=(user)=>{
    const {password,...rest}=user
    return{
        type:'login',
        payload:rest
    }
}

export const  logOut=()=>{
    return{
        type:'logout'
    }
}

export const saveAddressAndCard=(state)=>{
    return{
        type:'checkout',
        payload:{
            ...state
        }
    }
}