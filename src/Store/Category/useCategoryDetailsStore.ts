import { create } from "zustand";

const initialState = {

}

const useCategoryDetailsStore : any = create((set: any, get: any) => ({
    ...initialState,
    setState: (nextState: any) => set(() => ({ ...nextState })),
    getState: () => get(),

}));

export default useCategoryDetailsStore;


