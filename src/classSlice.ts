import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ClassData } from "./lib/ClassData";
import { deleteData, getData, postData, putData } from "./services/api";

export interface ClassState {
    isLoading: boolean;
    datas: ClassData[];
}

const initialState: ClassState = {
    isLoading: false,
    datas: [],
};

export const classSlice = createSlice({
    name: "class",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                getData.fulfilled,
                (state, action: PayloadAction<ClassData[]>) => {
                    state.isLoading = false;
                    state.datas = action.payload;
                }
            )
            .addCase(getData.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(postData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                postData.fulfilled,
                (state, action: PayloadAction<ClassData>) => {
                    state.isLoading = false;
                    state.datas.push(action.payload);
                }
            )
            .addCase(postData.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(putData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                putData.fulfilled,
                (state, action: PayloadAction<ClassData>) => {
                    state.isLoading = false;
                    const index = state.datas.findIndex(
                        (item) => item.id === action.payload.id
                    );
                    state.datas[index] = action.payload;
                }
            )
            .addCase(putData.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                deleteData.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.isLoading = false;
                    state.datas = state.datas.filter(
                        (item) => item.id !== action.payload
                    );
                }
            )
            .addCase(deleteData.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default classSlice.reducer;
