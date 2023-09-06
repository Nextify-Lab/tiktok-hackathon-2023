// users/actions.ts

import { createAction } from "@reduxjs/toolkit";

// change with appropriate dtypes later please
export const fetchSamplesRequest = createAction<any>("samples/fetchRequest");
export const fetchSamplesSuccess = createAction<any>("samples/fetchSuccess");
export const fetchSamplesFailure = createAction<any>("samples/fetchFailure");
