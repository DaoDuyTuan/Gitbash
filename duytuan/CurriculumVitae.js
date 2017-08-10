import React from 'react';
import Personal from './Personal'

class CurriculumVitae extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Personal/>
                </div>
            </div>
        )
    }
}

export default CurriculumVitae;