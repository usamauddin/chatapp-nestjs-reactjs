
function userReducer (state = {}, action){
    switch (action.type) {
        case 'USER':
            return {
                user: action.payload
            }
        default: return state
        
    }
}

export default userReducer