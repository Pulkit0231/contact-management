const initialData = {
    contacts: []
}

export const contactsReducer = (state = initialData, action) => {

    switch (action.type) {


        case 'GET_ALL_CONTACTS': {
            return {
                ...state,
                contacts: action.payload
            }
        }

        default: return state
    }

}
