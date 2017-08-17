import React from 'react';

class Table extends React.Component {

    delTable(phoneNumber) {
        this.props.delPerson(phoneNumber);
    }

    editTable(phoneNumber) {
        this.props.editPerson(phoneNumber);
    }

    render() {
        let table = null;
        const personalList = this.props.personal.map(item =>
            <tr key={item.phoneNumber}>
                <td>{item.fullName}</td>
                <td>{item.Gender}</td>
                <td>{item.Age}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.workPlace}</td>
                <td>
                    <button onClick={this.delTable.bind(this, item.phoneNumber)}>Delete</button>
                </td>
                <td>
                    <button onClick={this.editTable.bind(this, item.phoneNumber)}>Edit</button>
                </td>
            </tr>
        );

        if (this.props.showInfo) {
            table =
                <table className="tableInfo">
                    <thead>
                    <tr>
                        <th>fullName</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>phoneNumber</th>
                        <th>workPlace</th>
                    </tr>
                    </thead>
                    <tbody>
                    {personalList}
                    </tbody>
                </table>

        }
        return (
            <span>{table}</span>
        );
    }
}

export default Table;

