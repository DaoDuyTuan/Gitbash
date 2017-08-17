function Validation (props){
    
    for (let i in props.arrObj) {
        if (props.arrObj[i] === '') {
            alert(`${i} is empty`);
            return false;
        }
    }
    
    // Object.keys(props.arrObj).forEach((key, i) => {
    //     if (props.arrObj[key] === '') {
    //
    //         throw alert(key + 'is empty');
    //     }
    // });
}

export default Validation;