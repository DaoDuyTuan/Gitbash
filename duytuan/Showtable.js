import React from 'react';

class Table extends React.Component {
    render() {
        let table = null;
        const lists = this.props.personal;
        const personalList = lists.map((item) =>
            <tr key={item.id}>
                <td>{item.fullName}</td>
                <td>{item.Age}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.workPlace}</td>
            </tr>
        );

        if (this.props.showInfo) {
            table =
                <table className="tableInfo">
                    <thead>
                        <tr>
                            <th>fullName</th>
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

