import {CurriculumVitaeApp} from './CurriculumVitae';
import { showTable } from "../Reducers/showTable";
import React from 'react';

export default class App extends React.Component{
    render() {
        return (
            <div>
                <CurriculumVitaeApp />
                <showTable />
            </div>
        )
    }
}