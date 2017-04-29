export default function (state = null, action) {
    debugger
    switch (action.type) {
        case 'REGISTER_SUCCESS':
            return action.payload;
            break;
        case 'REGISTER_ERROR':
            return action.payload;
            break;
    }
    return state;
}