import React from 'react';

class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const lists = this.props.personal
        const personalList = lists.map((item) =>
            <tr>
                <td>item.fullName</td>
                <td>item.Age</td>
                <td>item.phoneNumber</td>
                <td>item.workPlace</td>
            </tr>
        )
        return (
            <table>
                <tr>
                    <th>fullName</th>
                    <th>Age</th>
                    <th>phoneNumber</th>
                    <th>workPlace</th>
                </tr>
                {personalList}
            </table>
        )
    }
}