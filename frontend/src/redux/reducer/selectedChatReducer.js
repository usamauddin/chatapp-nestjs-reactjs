
function selectedChatReducer (state = {}, action){
    switch (action.type) {
        case 'SELECTED_CHAT':
            return {
                chat: action.payload
            }
        default: return state
        
    }
}

export default selectedChatReducer