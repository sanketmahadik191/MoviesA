import { configureStore } from "@reduxjs/toolkit";

import homeSlice from "./slices.js";

export const store = configureStore({
    reducer: {
        home: homeSlice,
    },
});
