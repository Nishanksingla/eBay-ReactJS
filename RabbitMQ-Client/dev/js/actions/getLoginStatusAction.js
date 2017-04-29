import axios from 'axios';

function loginsuccess(data){
    return {
        type: 'LOGIN_SUCCESS',
        payload: data
    }
}

export const getLoginStatus = () => {
    debugger
    
    console.log("getting login status...");
    
    return dispatch => {
     return axios.get('/login/status')
        .then(response => {
            debugger
            if (response.data.user) {
                dispatch(loginsuccess(response.data));
            }
        })
        .catch(error => {
            debugger
            console.log(error);
            dispatch(signouterror(error));
        });  
    }
};


