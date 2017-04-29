import axios from 'axios';

function loginsuccess(data){
    return {
        type: 'LOGIN_SUCCESS',
        payload: data
    }
}

function loginerror(error){
    return {
        type: 'LOGIN_ERROR',
        payload: error
    }
}

export const login = (user) => {
    debugger
    
    console.log("user clicked on login: ", user);
    
    return dispatch => {
     return axios.post('/login', user)
        .then(response => {
            debugger
            if(response.data.status=="success"){
                dispatch(loginsuccess(response.data));
            }else{
                dispatch(loginerror(response.data));
            }
        })
        .catch(error => {
            debugger
            console.log(error);
            dispatch(loginerror(error));
        });  
    }
};


