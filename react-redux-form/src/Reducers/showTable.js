import {connect} from 'react-redux';
import React from 'react';
import {handleForm} from '../Reducers/handleForm';

const Table = ({persons}) => (
    <table>
        {
            persons.map(item =>
                <tr key={item.id}>
                    <td>{item.fullName}</td>
                    {/*<td>{item.Gender}</td>*/}
                    <td>{item.Age}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.workPlace}</td>
                    <td>
                        <button>Delete</button>
                    </td>
                    <td>
                        <button>Edit</button>
                    </td>
                </tr>
            )
        }
    </table>
);

const mapStateToProps = (state) => {
    return {
        persons: state.handleForm
    }
};

export const showTable = connect(
    mapStateToProps
)(Table);

// fullName, age, DOB, phoneNumber, email, workPlace