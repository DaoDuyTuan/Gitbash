export const handleForm = (state = [], action) => {
    switch (action.type) {
        case 'ADD_PERSON':
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
        default:
            return state;
    }
};
