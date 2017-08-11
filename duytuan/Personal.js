import React from 'react';
import Validation from './CheckValidation';
import Table from './Showtable'

class Personal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            Gender: 'Male',
            isGender: true,
            Age: '',
            DOB: '',
            workPlace: '',
            phoneNumber: '',
            email: '',
            isShowTable: false
        };

        this.checkValidateState = true;
        this.personalList = new Map();
        this.arrPersonal = [];
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleShowTable = this.handleShowTable.bind(this);
    }

    handleUpdate(event) {
        const target = event.target;
        const value = target.type === 'radio' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    handleRadio(event) {
        this.setState((prevState) => ({isGender: !prevState.isGender}))
    }

    handleSubmit(event) {
        event.preventDefault();

        this.checkValidateState = true;
        this.setState({isCheckValidate: true});

        if (!(this.state.fullName.trim === '' || this.state.Gender === '' ||
                this.state.isGender === '' || this.state.DOB === '' ||
                this.state.phoneNumber === '' || this.state.workPlace === '' ||
                this.state.email === '')) {

            this.personalList.set(this.state.phoneNumber, this.state);
        }
    }

    handleShowTable(event) {
        event.preventDefault();
        this.arrPersonal = [];
        this.setState(prevState => ({
            isShowTable: !prevState.isShowTable
        }));

        this.personalList.forEach((val, key) => {
            this.arrPersonal.push(val)
        });

        this.arrPersonal.sort((a, b) => a.Age - b.Age);
    }

    render() {

        let validate = null;
        if (this.state.isCheckValidate && this.checkValidateState) {
            validate = <Validation arrObj={this.state} />;
            this.checkValidateState = false;
        }

        return (
            <section>
                {validate}
                <header><h4>I.PERSIONAL INFORMATION</h4></header>
                <article>
                    <form onSubmit={this.handleSubmit}>
                        <table>
                            <tbody>
                            <tr>
                                <td>Full name :</td>
                                <td>
                                    <input type="text" name="fullName" ref="fullName" value={this.state.fullName}
                                           onChange={this.handleUpdate}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Gender:</td>
                                <td>
                                    <input type="radio" name="Gender"
                                           value="nam"/> Male
                                    <input type="radio" name="Gender"
                                           value="nu"/> Female
                                </td>
                            </tr>

                            <tr>
                                <td>Age :</td>
                                <td>
                                    <input type="text" name="Age" value={this.state.Age}
                                           onChange={this.handleUpdate}/>
                                </td>
                            </tr>

                            <tr>

                                <td>Date of birth :</td>
                                <td>
                                    <input type="text" name="DOB" placeholder="mm/dd/yyyy"
                                           value={this.state.DOB} onChange={this.handleUpdate}/>
                                </td>

                            </tr>

                            <tr>

                                <td>Work place :</td>
                                <td>
                                    <input type="text" name="workPlace" value={this.state.workPlace}
                                           onChange={this.handleUpdate}/>
                                </td>

                            </tr>

                            <tr>

                                <td>Phone number:</td>
                                <td>
                                    <input type="text" name="phoneNumber" value={this.state.phoneNumber}
                                           onChange={this.handleUpdate}/>
                                </td>

                            </tr>

                            <tr>

                                <td>Email :</td>
                                <td>
                                    <input type="email" name="email" placeholder="example@gmail.com"
                                           value={this.state.email} onChange={this.handleUpdate}/>
                                </td>


                            </tr>
                            <tr>
                                <td><input type="submit" value="Submit"/>
                                    <input type="button" value="Show" onClick={this.handleShowTable}/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                </article>
                <br/>
                <br/>
                <Table personal={this.arrPersonal} showInfo={this.state.isShowTable}/>
            </section>
        )
    }
}

export default Personal;