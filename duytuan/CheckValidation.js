import React from 'react';
import PropTypes from 'prop-types';

class Validation extends React.Component{
    render() {
        for (let ind in this.props.arrObj) {
            if (this.props.arrObj[ind] === '') {
                alert(ind + " is empty");
                return false;
            }
        }
    }
}

function showError(props) {

}
Validation.propTypes = {
    arrObj : PropTypes.object
};

export default Validation;