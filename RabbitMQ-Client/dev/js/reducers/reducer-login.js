export default function (state = null, action) {
    debugger
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return action.payload.user;
            break;
        case 'SIGNOUT_SUCCESS':
            return action.payload;
            break;
    }
    return state;
}