import {CurriculumVitaeApp} from './CurriculumVitae';
import { Table } from "../Reducers/showTable";
import React from 'react';

export default class App extends React.Component{
    render() {
        return (
            <div>
                <CurriculumVitaeApp />
                <Table />
            </div>
        )
    }
}