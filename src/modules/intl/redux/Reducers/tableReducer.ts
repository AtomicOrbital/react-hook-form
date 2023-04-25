import { DELETE_TABLE_DATA, FETCH_TABLE_DATA, UPDATE_TABLE_DATA } from "../Types/tableType";

const initialState = {
    data: [],
}

const tableReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case FETCH_TABLE_DATA:
            console.log("action", action.payload);
            state.data = action.payload;
            return { ...state };
        case UPDATE_TABLE_DATA:
            return {
                ...state,
                data: state.data.map((item: any) =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };
        case DELETE_TABLE_DATA:
            state.data = state.data.filter((item: any) => item.id !== action.payload)
            return { ...state };
        default:
            return state
    }
}

export default tableReducer;
