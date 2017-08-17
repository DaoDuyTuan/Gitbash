import React from 'react';
import Table from './Showtable'

class Personal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            Gender: '',
            Age: '',
            DOB: '',
            workPlace: '',
            phoneNumber: '',
            email: '',
            isShowTable: false
        };

        this.personalList = new Map();
        this.arrPersonal = [];
        this.showError = null;
    }

    handleUpdate(event) {
        const target = event.target;

        this.setState({
            [target.name]: target.value,
        });

    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({});
        this.showError = '';

        for (let ind in this.state) {
            if ((typeof this.state[ind] !== 'boolean' && this.state[ind].trim() === '') ||
                (ind === 'Age' && isNaN(this.state[ind]))) {

                this.showError = (<span className="error">{ind} is empty!!</span>);

                if (ind === "Age" && isNaN(this.state[ind])) {
                    this.showError = (<span className="error">{ind} is not number!!</span>)
                }

                if (ind !== "Gender") {
                    this.refs[ind].focus();
                }

                this.setState({});
                return false;
            }
        }

        if (this.showError === '' && !this.personalList.has(this.state.phoneNumber)) {
            this.personalList.set(this.state.phoneNumber, this.state);
            this.showError = (<span className="error">Add successful !!!</span>);
        } else {
            this.showError = (<span className="error">phoneNumber is not exist!!!</span>);
        }

    }

    handleAddPerson(event) {
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

    delPerson(phoneNumber) {
        this.arrPersonal = this.arrPersonal.filter(person => {
            return person.phoneNumber !== phoneNumber;
        });

        if (this.personalList.has(phoneNumber)) {
            this.personalList.delete(phoneNumber);
        }

        this.setState({});
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
            email: personal.email
        });
    }

    handleEditTable() {

    }

    render() {
        return (
            <section>
                <header><h4>I.PERSIONAL INFORMATION</h4></header>
                {this.showError}
                <article>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <table>
                            <tbody>
                            <tr>
                                <td>Full name :</td>
                                <td>
                                    <input type="text" name="fullName" ref="fullName" value={this.state.fullName}
                                           onChange={this.handleUpdate.bind(this)}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Gender:</td>
                                <td>
                                    <input type="radio" name="Gender" id="nam" checked={this.state.Gender === 'nam'}
                                           value="nam" onChange={this.handleUpdate.bind(this)}/> Male
                                    <input type="radio" name="Gender" id="nu" checked={this.state.Gender === 'nu'}
                                           value="nu" onChange={this.handleUpdate.bind(this)}/> Female
                                </td>
                            </tr>

                            <tr>
                                <td>Age :</td>
                                <td>
                                    <input type="text" name="Age" ref="Age" value={this.state.Age}
                                           onChange={this.handleUpdate.bind(this)}/>
                                </td>
                            </tr>

                            <tr>

                                <td>Date of birth :</td>
                                <td>
                                    <input type="text" name="DOB" ref="DOB" placeholder="mm/dd/yyyy"
                                           value={this.state.DOB} onChange={this.handleUpdate.bind(this)}/>
                                </td>

                            </tr>

                            <tr>

                                <td>Work place :</td>
                                <td>
                                    <input type="text" name="workPlace" ref="workPlace" value={this.state.workPlace}
                                           onChange={this.handleUpdate.bind(this)}/>
                                </td>

                            </tr>

                            <tr>

                                <td>Phone number:</td>
                                <td>
                                    <input type="text" name="phoneNumber" ref="phoneNumber"
                                           value={this.state.phoneNumber}
                                           onChange={this.handleUpdate.bind(this)}/>
                                </td>

                            </tr>

                            <tr>

                                <td>Email :</td>
                                <td>
                                    <input type="email" name="email" ref="email" placeholder="example@gmail.com"
                                           value={this.state.email} onChange={this.handleUpdate.bind(this).bind(this)}/>
                                </td>


                            </tr>
                            <tr>
                                <td>
                                    <input type="submit" value="Submit"/>
                                    <input type="button" value="Show" onClick={this.handleAddPerson.bind(this)}/>
                                    <input type="button" value="Update" onClick={this.handleEditTable.bind(this)}/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                </article>
                <br/>
                <br/>
                <Table personal={this.arrPersonal} showInfo={this.state.isShowTable}
                       delPerson={this.delPerson.bind(this)} editPerson={this.editPerson.bind(this)}/>
            </section>
        )
    }
}

export default Personal;