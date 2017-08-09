import React from 'react';

function CheckValidation(props){
    if(props.fullName.trim() === ''){
        alert("fullName is empty!");
        return false;
    }

    if(props.Age.trim() === '' && !isNaN(props.Age)){
        alert("Age is empty or Age is not number");
        return false;
    }

    if(props.Gender.trim() === ''){
        alert("Gender is empty!");
        return false;
    }

    if(props.DOB.trim() === ''){
        alert("DOB is empty!");
        return false;
    }

    if(props.workPlace.trim() === ''){
        alert("workPlace is empty!");
        return false;
    }

    if(props.phoneNumber.trim() === ''){
        alert("phoneNumber is empty!");
        return false;
    }

    if(props.email.trim() === ''){
        alert("email is empty!");
        return false;
    }

    return (
        <span>{alert('Success!!')}</span>
    )
}

export default CheckValidation;