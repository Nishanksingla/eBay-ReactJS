import axios from 'axios';

function signoutsuccess(data){
    return {
        type: 'SIGNOUT_SUCCESS',
        payload: data
    }
}

function signouterror(error){
    return {
        type: 'SIGNOUT_ERROR',
        payload: error
    }
}

export const signout = () => {
    debugger
    
    console.log("SIGNING OUT...");
    
    return dispatch => {
     return axios.get('/login/logout')
        .then(response => {
            debugger
            if(response.data.status=="success"){
                dispatch(signoutsuccess(null));
            }else{
                dispatch(signouterror({"error":"Unable to signout. Please try again."}));
            }
        })
        .catch(error => {
            debugger
            console.log(error);
            dispatch(signouterror(error));
        });  
    }
};


