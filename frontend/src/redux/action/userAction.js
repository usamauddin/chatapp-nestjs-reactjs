function getUser(user) {
    return {
        type: 'USER',
        payload: user
    }
}

export default getUser