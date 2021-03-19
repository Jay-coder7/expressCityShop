export const total=(state={total:''},action)=>{
    switch (action.type) {
        case 'SET_TOTAL':{
            return {
                ...state,
                total:action.total
            };
        }    
        default:{
            return state;
        }
    }
}