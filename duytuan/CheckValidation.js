function Validation (props){
    debugger;
    // for (let index in props.arrObj) {
    //     if (props.arrObj[index] === '') {
    //         alert(`${props.arrObj[index]} is empty`);
    //         return false;
    //     }
    // }
    Object.keys(props.arrsObj).forEach((key, index) => {
        if (props.arrObj[key] === '') {
            alert(key + 'is empty');
            throw {};
        }
    });
}

export default Validation;