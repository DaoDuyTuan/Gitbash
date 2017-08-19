import React from 'react';

function Error(props) {
    return (
        <span className="error" id="hideMe">{props.errorName}</span>
    )
}

export default Error;