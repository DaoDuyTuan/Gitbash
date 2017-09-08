import {createStore} from 'redux';
import {combineReducers} from 'redux';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import {PropTypes} from 'react';
import {connect} from 'react-redux';

let increPerson = 0;
export default class CurriculumVitae extends React.Component {
    render() {
        const { dispatch } = this.props;
        return (
            <div>
                <form>
                    <table>
                        <tbody>
                        <tr>
                            <td>Full name :</td>
                            <td>
                                <input type="text" name="fullName" ref={(input) => this.fullName = input} required/>
                                <div id="fullNameError"/>
                            </td>
                        </tr>
                        <tr>
                            <td>Gender:</td>
                            <td>
                                <input type="radio" name="Gender" ref={(input) => this.gender = input} id="nam" required/> Male
                                <input type="radio" name="Gender" ref={(input) => this.gender = input} id="nu" required/> Female
                                <div id="GenderError"/>
                            </td>
                        </tr>

                        <tr>
                            <td>Age :</td>
                            <td>
                                <input type="text" name="Age" ref={(input) => this.Age = input} required/>
                                <div id="AgeError"/>
                            </td>
                        </tr>

                        <tr>

                            <td>Date of birth :</td>
                            <td>
                                <input type="text" name="DOB" ref={(input) => this.DOB = input} placeholder="mm/dd/yyyy" required/>
                                <div id="DOBError"/>
                            </td>

                        </tr>

                        <tr>

                            <td>Work place :</td>
                            <td>
                                <input type="text" name="workPlace" ref={(input) => this.workPlace = input} required/>
                                <div id="workPlaceError"/>
                            </td>

                        </tr>

                        <tr>

                            <td>Phone number:</td>
                            <td>
                                <input type="text" name="phoneNumber" ref={(input) => this.phoneNumber = input}
                                       pattern=".{10,11}" required/>
                                <div id="phoneNumberError"/>
                            </td>

                        </tr>

                        <tr>

                            <td>Email :</td>
                            <td>
                                <input type="email" name="email" ref={(input) => this.email = input} placeholder="example@gmail.com" required/>
                                <div id="emailError"/>
                            </td>

                        </tr>
                        <tr>
                            <td>
                                <button onClick={() => {
                                    dispatch({
                                       type: 'ADD_PERSON',
                                       fullName: this.fullName.value,
                                       Age: this.Age.value,
                                       DOB: this.DOB.value,
                                       phoneNumber: this.phoneNumber.value,
                                       workPlace: this.workPlace.value,
                                       email: this.email.value,
                                       id: increPerson++
                                    });
                                }}> submit </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        )
    }
}

export const CurriculumVitaeApp = connect()(CurriculumVitae);