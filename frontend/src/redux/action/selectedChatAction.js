function getSelectedChat(chat) {
    return {
        type: 'SELECTED_CHAT',
        payload: chat
    }
}

export default getSelectedChat