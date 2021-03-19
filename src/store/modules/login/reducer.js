const INITIAL_STATE={
    email:'',
    name:'',
    type:'',
    id:null,
    address:'',
    card:'',
    lastOrderId:''
};

export const loggedInProfile=(state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case 'login':
            return{
                ...state,
                ...action.payload
            }
        case 'checkout':
            return{
                ...state,
                ...action.payload
            }
        case "logout":
            return{
                ...state,
               ...INITIAL_STATE
            }
        default:
            return state;
    }
};