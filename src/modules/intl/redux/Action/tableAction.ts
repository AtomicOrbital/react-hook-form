import axios from "axios"
import { DELETE_TABLE_DATA, FETCH_DATA, FETCH_TABLE_DATA, FILTER_TABLE_DATA, FILTER_TABLE_DATE, UPDATE_TABLE_DATA } from "../Types/tableType";

const API_URL = "http://localhost:8000/data";

interface Prop {
    searchTerm: string;
    status: string;
    startDate: Date | null;
    endDate: Date | null;
}

export const fetchTable = () => {
    return async (dispatch: any) => {
        try {
            const response = await axios.get(API_URL);
            // const accessData = response.data;
            console.log("accessData", response.data);
            dispatch({
                type: FETCH_TABLE_DATA,
                payload: response.data
            })
        } catch (error) {
            console.log("error", error);
        }
    };
};

export const updateData = (updatedData: any) => {
    return async (dispatch: any) => {
        try {
            const response = await axios.put(`${API_URL}/${updatedData.id}`, updatedData);
            dispatch({
                type: UPDATE_TABLE_DATA,
                payload: response.data
            })
        } catch (error) {
            console.log("error", error);
        }
    }
}

export const deleteData = (id: number) => {
    return async (dispatch: any) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
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
            const response = await axios.get(API_URL, {
                params: {
                    searchTerm,
                    status,
                    startDate: startDate?.toISOString(),
                    endDate: endDate?.toISOString()
                }
            });
            dispatch({
                type: FILTER_TABLE_DATA,
                payload: response.data
            })
        } catch (error) {
            console.log("error", error);
        }
    }
}