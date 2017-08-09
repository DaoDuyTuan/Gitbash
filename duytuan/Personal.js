import React from 'react';
import CheckValidation from './CheckValidation';

class Personal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            Gender: 'Male',
            Age: '',
            DOB: '',
            workPlace: '',
            phoneNumber: '',
            email: '',
            isCheckValidate: false,
            isShowTable: false
        };

        this.checkValidateState = true;
        this.personalList = new Map();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate(event) {
        const target = event.target;
        const value = target.type === 'radio' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.checkValidateState = true;
        this.setState({isCheckValidate: true});

        this.personalList.set(this.state.phoneNumber, this.state);
    }

    handleShowTable(event) {
        event.preventDefault();
        this.setState(prevState => ({
            isShowTable: !prevState.isShowTable
        }));
    }

    render() {
        let validate = null;
        if (this.state.isCheckValidate && this.checkValidateState) {
            validate = <CheckValidation fullName={this.state.fullName}
                                        Gender={this.state.Gender}
                                        Age={this.state.Age}
                                        DOB={this.state.DOB}
                                        workPlace={this.state.workPlace}
                                        phoneNumber={this.state.phoneNumber}
                                        email={this.state.email}/>;
            this.checkValidateState = false;
        }

        return (
            <section>
                {validate}
                <header><h4>I.PERSIONAL INFORMATION</h4></header>
                <article>
                    <form onSubmit={this.handleSubmit}>
                        <p>
                            <label>
                                Full name :
                                <input type="text" name="fullName" value={this.state.fullName}
                                       onChange={this.handleUpdate}/>
                            </label>
                            <label>
                                Gender :
                                <input type="radio" id="male" name="Gender" value="nam"/> Male
                                <input type="radio" id="female" name="Gender" value="nu"/> Female
                            </label>
                        </p>

                        <p>
                            <label>
                                Age : <input type="text" name="Age" value={this.state.Age}
                                             onChange={this.handleUpdate}/>
                            </label>
                        </p>

                        <p>
                            <label>
                                Date of birth : <input type="text" name="DOB" placeholder="mm/dd/yyyy"
                                                       value={this.state.DOB} onChange={this.handleUpdate}/>
                            </label>
                        </p>

                        <p>
                            <label>
                                Work place : <input type="text" name="workPlace" value={this.state.workPlace}
                                                    onChange={this.handleUpdate}/>
                            </label>
                        </p>

                        <p>
                            <label>
                                Phone number : <input type="text" name="phoneNumber" value={this.state.phoneNumber}
                                                      onChange={this.handleUpdate}/>
                            </label>
                        </p>

                        <p>
                            <label>
                                Email : <input type="email" name="email" placeholder="example@gmail.com"
                                               value={this.state.email} onChange={this.handleUpdate}/>
                            </label>
                        </p>
                        <input type="submit" value="Submit"/>
                    </form>
                </article>
            </section>
        )
    }
}

export default Personal;