import { combineReducers } from "redux";
import samplesReducer from "./samples/reducer";

const rootReducer = combineReducers({
  samples: samplesReducer,
  // ... other reducers would go here when added
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
