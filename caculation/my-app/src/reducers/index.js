export default function showResult(state = [], action) {
    // console.log(state);
    return[
        ...state,
        {
            text: action.text,
            id: action.id
        }
    ]
}

