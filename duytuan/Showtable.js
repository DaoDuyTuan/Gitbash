import React from 'react';

class Table extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        const lists = this.props.personal;
        const personalList = lists.map((item) =>
            <tr key={item.id}>
                <td>{item.fullName}</td>
                <td>{item.Age}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.workPlace}</td>
            </tr>
        );
        return (
            <table>
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
        );
    }
}

export default function Showtable() {
    const personList = [{fullName: 'Tuan', Age: 21, phoneNumber: '01666714339', workPlace: 'hn'},
        {fullName: 'Tuan', Age: 22, phoneNumber: '01666714339', workPlace: 'hn'},
        {fullName: 'Tuan', Age: 23, phoneNumber: '01666714339', workPlace: 'hn'}];

    return (
        <Table personal={personList}/>
    )
}

