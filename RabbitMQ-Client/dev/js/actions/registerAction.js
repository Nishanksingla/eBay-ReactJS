import axios from 'axios';

function registersuccess(data){
    return {
        type: 'REGISTER_SUCCESS',
        payload: data
    }
}

function registererror(error){
    return {
        type: 'REGISTER_ERROR',
        payload: error
    }
}

export const register = (registerInfo) => {
    debugger
    
    console.log("user clicked on register: ", registerInfo);
    
    return dispatch => {
     return axios.post('/register', registerInfo)
        .then(response => {
            debugger
            if(response.data.status=="success"){
                dispatch(registersuccess({ type: 'success', msg: "Successfully Registered" }));
            }else{
                dispatch(registererror({ type: 'danger', msg: response.data.error }));
            }
        })
        .catch(error => {
            debugger
            console.log(error);
            dispatch(registererror({ type: 'danger', msg:error}));
        });  
    }
};


