import React from 'react';

class Validation extends React.Component {

    render() {
            if (this.props.fullName.trim() === '') {
                alert("fullName is empty!");
                return false;
            }

            if (this.props.Age.trim() === '' && !isNaN(this.props.Age)) {
                alert("Age is empty or Age is not number");
                return false;
            }

            if (this.props.Gender.trim() === '') {
                alert("Gender is empty!");
                return false;
            }

            if (this.props.DOB.trim() === '') {
                alert("DOB is empty!");
                return false;
            }

            if (this.props.workPlace.trim() === '') {
                alert("workPlace is empty!");
                return false;
            }

            if (this.props.phoneNumber.trim() === '') {
                alert("phoneNumber is empty!");
                return false;
            }

            if (this.props.email.trim() === '') {
                alert("email is empty!");
                return false;
            }

            return <span>{alert('Success!!')}</span>

    }
}

export default Validation;