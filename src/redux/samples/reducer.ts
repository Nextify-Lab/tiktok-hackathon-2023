import { createReducer } from "@reduxjs/toolkit";
import {
  fetchSamplesRequest,
  fetchSamplesSuccess,
  fetchSamplesFailure,
} from "./actions";

interface SampleState {
  data: any;
  loading: boolean;
  error: null | string | undefined;
}

const initialState: SampleState = {
  data: [],
  loading: false,
  error: null,
};

const samplesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchSamplesRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchSamplesSuccess, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    })
    .addCase(fetchSamplesFailure, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
});

export default samplesReducer;
