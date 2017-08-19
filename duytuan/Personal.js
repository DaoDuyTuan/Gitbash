import React from 'react';
import Error from './Error';
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
            arrPersonal:[]
        };
    };

    handleUpdate(event) {
        const target = event.target;
        this.setState({showError: null});

        this.setState({
            [target.name]: target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({});
        let showError = '';

        for (let ind in this.state) {
            if ((typeof this.state[ind] === 'string' && this.state[ind].trim() === '') ||
                (ind === 'Age' && isNaN(this.state[ind]))) {

                showError = <Error errorName={`${ind} is empty`}/>

                if (ind === "Age" && isNaN(this.state[ind])) {
                    showError = <Error errorName={`${ind} is not number!!`}/>
                }

                if (ind !== "Gender") {
                    this.refs[ind].focus();
                }
                this.setState({showError: showError});
                return false;
            }
        }

        if (showError === '') {
            if (this.state.isEdit) {
                this.personalList.set(this.state.phoneNumber, this.state);
                showError= <Error errorName={"Update successful !"}/>;
                this.addPerson();

                this.setState({showError: showError});
            } else {
                if (this.personalList.has(this.state.phoneNumber)) {
                    showError= <Error errorName={"this person is existed.Please enter again !!!"}/>;

                    this.setState({showError: showError});
                } else {
                    this.personalList.set(this.state.phoneNumber, this.state);
                    showError= <Error errorName={"Add Successful!!!"}/>;
                    this.addPerson();
                    this.setState({showError: showError});
                }
            }
        }
    }

    addPerson() {
        // event.preventDefault();
        this.setState({});
        let arrPersonal = [];
        this.isShowTable = true;

        this.personalList.forEach((val, key) => {
            arrPersonal.push(val)
        });

        arrPersonal.sort((a, b) => a.Age - b.Age);
        this.setState({arrPersonal: arrPersonal});
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
            isEdit: true
        });
    }

    render() {
        return (
            <section>
                <header><h4>I.PERSIONAL INFORMATION</h4></header>
                {this.state.showError}
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
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                </article>

                <br/><br/>

                {console.log(1234)}
                <Table personal={this.state.arrPersonal} showInfo={this.isShowTable}
                       delPerson={this.delPerson.bind(this)} editPerson={this.editPerson.bind(this)}/>
            </section>
        )
    }
}

export default Personal;