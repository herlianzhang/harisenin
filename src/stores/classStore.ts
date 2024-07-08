import { ClassData } from "@/lib/ClassData";
import { create } from "zustand";
import axios from "axios";

type State = {
    isLoading: boolean;
    datas: ClassData[];
};

type Actions = {
    fetchDatas: () => void;
    postClass: (data: ClassData) => void;
    putClass: (id: string, data: ClassData) => void;
    delClass: (id: string) => void;
};

const apiEndpoint = `https://${
    import.meta.env.VITE_MOCKAPI_SECRET
}.mockapi.io/classes`;

export const useClassStore = create<State & Actions>((set) => ({
    datas: [],
    isLoading: false,
    fetchDatas: async () => {
        set({ isLoading: true });
        try {
            const res = await axios.get<ClassData[]>(apiEndpoint);
            set({ datas: res.data });
            console.log(res);
        } catch (err) {
            console.log(err);
        } finally {
            set({ isLoading: false });
        }
    },
    postClass: async (data: ClassData) => {
        set({ isLoading: true });
        try {
            const res = await axios.post<ClassData>(apiEndpoint, data);
            set((state) => ({ datas: [...state.datas, res.data] }));
        } catch (err) {
            console.log(err);
        } finally {
            set({ isLoading: false });
        }
    },
    putClass: async (id: string, data: ClassData) => {
        set({ isLoading: true });
        try {
            const res = await axios.put<ClassData>(
                `${apiEndpoint}/${id}`,
                data
            );
            set((state) => ({
                datas: state.datas.map((item) =>
                    item.id === id ? res.data : item
                ),
            }));
        } catch (err) {
            console.log(err);
        } finally {
            set({ isLoading: false });
        }
    },
    delClass: async (id: string) => {
        set({ isLoading: true });
        try {
            await axios.delete<ClassData>(`${apiEndpoint}/${id}`);
            set((state) => ({
                datas: state.datas.filter((item) => item.id !== id),
            }));
        } catch (err) {
            console.log(err);
        } finally {
            set({ isLoading: false });
        }
    },
}));
