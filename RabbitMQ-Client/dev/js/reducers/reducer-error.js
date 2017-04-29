export default function (state = null, action) {
    debugger
    switch (action.type) {
        case 'LOGIN_ERROR':
            return action.payload;
            break;
        case 'SIGNOUT_ERROR':
            return action.payload;
            break;
    
    }
    return state;
}