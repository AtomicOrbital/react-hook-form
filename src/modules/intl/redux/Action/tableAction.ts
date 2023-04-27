import axios from "axios"
import { DELETE_TABLE_DATA,FETCH_TABLE_DATA, FILTER_TABLE_DATA, UPDATE_TABLE_DATA } from "../Types/tableType";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "../../../../utils/constants";
import { fetchThunk } from "../../../common/redux/thunk";
import { API_PATHS } from "../../../../configs/api";

// const API_URL = "http://localhost:8000/data";
// const API_URL_PRODUCT = "http://api.training.div3.pgtest.co/api/v1/product";

interface Prop {
    searchTerm: string;
    status: string;
    startDate: Date | null;
    endDate: Date | null;
}

// const apiInstance = axios.create({
//   baseURL: API_URL_PRODUCT,
//   headers: {
//     Authorization: `Bearer ${TOKEN}`,
//   },
// });

export const fetchTable = () => {
    return async (dispatch: any) => {
        try {
            const response = await dispatch(fetchThunk(API_PATHS.data,"get"));

            console.log("accessData", response.data);
            dispatch({
                type: FETCH_TABLE_DATA,
                payload: response.data
            })
        } catch (error) {
            console.log("error fetch data: ", error);
        }
    };
};

export const updateData = (updatedData: any) => {
    return async (dispatch: any) => {
        try {
            console.log("updatedData123", updatedData);
            await dispatch(fetchThunk(`${API_PATHS.data}`, "put", updatedData));
            // console.log("reponseUpdate", response.data);
            
            dispatch({
                type: UPDATE_TABLE_DATA,
                payload: updatedData
            })
            console.log("123", updatedData);
        } catch (error) {
            console.log("error", error);
        }
    }
}



export const deleteData = (id: number) => {
    return async (dispatch: any) => {
        try {
            await dispatch(fetchThunk(`${API_PATHS.data}/${id}`, "delete"));
            dispatch({
                type: DELETE_TABLE_DATA,
                payload: id
            })
        } catch (error) {
            console.log("error", error);
        }
    }
}

export const filterTable = (params: Prop) => {
    return async (dispatch: any) => {
        try {
            const { searchTerm, status, startDate, endDate } = params;
            const response = await dispatch(fetchThunk(API_PATHS.data, "get", {
                params: {
                    searchTerm,
                    status,
                    startDate: startDate?.toISOString(),
                    endDate: endDate?.toISOString()
                }
            }));
            dispatch({
                type: FILTER_TABLE_DATA,
                payload: response.data
            })
        } catch (error) {
            console.log("error", error);
        }
    }
}