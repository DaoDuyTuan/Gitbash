const handleForm = (state, action) => {
    switch (action.type) {
        case 'ADD_PERSON':
            if (state.id === action.id) {
                state = action;
            } else {
                return {
                    fullName: action.fullName,
                    Age: action.Age,
                    DOB: action.DOB,
                    phoneNumber: action.phoneNumber,
                    workPlace: action.workPlace,
                    email: action.email,
                    id: action.id
                };

            }
            return state;
        case 'EDIT_PERSON':

        default:
            return state;
    }
};
export const handleForms = (state = [], action) => {
    switch (action.type) {
        case 'ADD_PERSON':
            if (state.map(t => t.id === action.id)) {
                state = action;
                return [...state];
            }
            return [
                ...state,
                {
                    fullName: action.fullName,
                    Age: action.Age,
                    DOB: action.DOB,
                    phoneNumber: action.phoneNumber,
                    workPlace: action.workPlace,
                    email: action.email,
                    id: action.id
                }
            ];
        case 'EDIT_PERSON':

        default:
            return state;
    }
};
