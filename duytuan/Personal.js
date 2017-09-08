import React from 'react';
import Table from './Showtable'

class Personal extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.personalList = new Map();
        this.isShowTable = false;
    }

    getInitialState = () => {
        return {
            fullName: '',
            Gender: '',
            Age: '',
            DOB: '',
            workPlace: '',
            phoneNumber: '',
            email: '',
            isEdit: false,
            showError: null,
            arrPersonal: []
        };
    };

    handleUpdate(event) {
        const target = event.target;
        this.setState({
            [target.name]: target.value,
        });

        this.showInputError(target.name);
    }

    handleSubmit(event) {
        event.preventDefault();

        if (!this.showFormErrors()) {

            this.setState({showError: "Add fail!"});
        } else {

            this.personalList.set(this.state.phoneNumber, this.state);
            this.addPerson();
        }
    }

    showFormErrors() {
        const inputs = document.querySelectorAll('input');
        let isFormValid = true;

        inputs.forEach(input => {
            const isInputValid = this.showInputError(input.name);
            const error = document.getElementById(`${input.name}Error`);
            error.className = "error";

            if (!isInputValid) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    showInputError(refName) {
        const validity = this.refs[refName].validity;
        const error = document.getElementById(`${refName}Error`);
        error.className = "error";

        if (!validity.valid) {
            if (validity.valueMissing) {
                error.textContent = `${refName} is a required field`;
            } else if (validity.typeMismatch) {
                error.textContent = `${refName} should be a valid email address`;
            } else if (validity.patternMismatch) {
                error.textContent = `${refName} should be equal 10 or 11`;
            }

            return false;
        }

        error.textContent = '';
        return true;

    }


    addPerson() {
        let arrPersonal = [];
        this.isShowTable = true;

        this.personalList.forEach((val, key) => {
            arrPersonal.push(val)
        });

        arrPersonal.sort((a, b) => a.Age - b.Age);
        this.setState({
            arrPersonal: arrPersonal,
            showError: "Add successful!"
        });
    }

    delPerson(phoneNumber) {
        let arrPersonal = this.state.arrPersonal.filter(person => {
            return person.phoneNumber !== phoneNumber;
        });

        if (this.personalList.has(phoneNumber)) {
            this.personalList.delete(phoneNumber);
        }

        this.setState({arrPersonal: arrPersonal});
    }

    editPerson(phoneNumber) {
        const personal = this.personalList.get(phoneNumber);
        this.setState({
            fullName: personal.fullName,
            Gender: personal.Gender,
            Age: personal.Age,
            DOB: personal.DOB,
            workPlace: personal.workPlace,
            phoneNumber: personal.phoneNumber,
            email: personal.email,
            showError: "Updatting...",
            isEdit: true
        });
    }

    render() {
        return (
            <div>
                <div><h4>I.PERSIONAL INFORMATION</h4></div>
                <div>
                    {this.state.showError}
                    <form>
                        <table>
                            <tbody>
                            <tr>
                                <td>Full name :</td>
                                <td>
                                    <input type="text" name="fullName" ref="fullName" value={this.state.fullName}
                                           onChange={this.handleUpdate.bind(this)} required/>
                                    <div id="fullNameError"/>
                                </td>
                            </tr>
                            <tr>
                                <td>Gender:</td>
                                <td>
                                    <input type="radio" name="Gender" ref="Gender" id="nam"
                                           checked={this.state.Gender === 'nam'}
                                           value="nam" onChange={this.handleUpdate.bind(this)} required/> Male
                                    <input type="radio" name="Gender" ref="Gender" id="nu"
                                           checked={this.state.Gender === 'nu'}
                                           value="nu" onChange={this.handleUpdate.bind(this)} required/> Female
                                    <div id="GenderError"/>
                                </td>
                            </tr>

                            <tr>
                                <td>Age :</td>
                                <td>
                                    <input type="text" name="Age" ref="Age" value={this.state.Age}
                                           onChange={this.handleUpdate.bind(this)} required/>
                                    <div id="AgeError"/>
                                </td>
                            </tr>

                            <tr>

                                <td>Date of birth :</td>
                                <td>
                                    <input type="text" name="DOB" ref="DOB" placeholder="mm/dd/yyyy"
                                           value={this.state.DOB} onChange={this.handleUpdate.bind(this)} required/>
                                    <div id="DOBError"/>
                                </td>

                            </tr>

                            <tr>

                                <td>Work place :</td>
                                <td>
                                    <input type="text" name="workPlace" ref="workPlace" value={this.state.workPlace}
                                           onChange={this.handleUpdate.bind(this)} required/>
                                    <div id="workPlaceError"/>
                                </td>

                            </tr>

                            <tr>

                                <td>Phone number:</td>
                                <td>
                                    <input type="text" name="phoneNumber" ref="phoneNumber"
                                           value={this.state.phoneNumber}
                                           onChange={this.handleUpdate.bind(this)}
                                           pattern=".{10,11}" required/>
                                    <div id="phoneNumberError"/>
                                </td>

                            </tr>

                            <tr>

                                <td>Email :</td>
                                <td>
                                    <input type="email" name="email" ref="email" placeholder="example@gmail.com"
                                           value={this.state.email} onChange={this.handleUpdate.bind(this).bind(this)}
                                           required/>
                                    <div id="emailError"/>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <button onClick={this.handleSubmit.bind(this)}>submit</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                </div>

                <br/><br/>

                <Table personal={this.state.arrPersonal} showInfo={this.isShowTable}
                       delPerson={this.delPerson.bind(this)} editPerson={this.editPerson.bind(this)}/>
            </div>
        )
    }
}

export default Personal;