import { ClassData } from "@/lib/ClassData";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = `https://${
    import.meta.env.VITE_MOCKAPI_SECRET
}.mockapi.io/classes`;

export const getData = createAsyncThunk<ClassData[]>(
    "class/getData",
    async () => {
        const res = await axios.get<ClassData[]>(apiEndpoint);
        return res.data;
    }
);

export const postData = createAsyncThunk<ClassData, ClassData>(
    "class/postData",
    async (data) => {
        const res = await axios.post<ClassData>(apiEndpoint, data);
        return res.data;
    }
);

export const putData = createAsyncThunk<
    ClassData,
    { id: string; data: ClassData }
>("class/putData", async ({ id, data }) => {
    const res = await axios.put<ClassData>(`${apiEndpoint}/${id}`, data);
    return res.data;
});

export const deleteData = createAsyncThunk<string, string>(
    "class/deleteData",
    async (id) => {
        const res = await axios.delete<ClassData>(`${apiEndpoint}/${id}`);
        if (res.status >= 300 || res.status < 200) {
            throw new Error("Failed to delete data");
        }
        return id;
    }
);
