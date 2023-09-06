import {
  takeLatest,
  put,
  call,
  CallEffect,
  PutEffect,
} from "redux-saga/effects";
import {
  fetchSamplesRequest,
  fetchSamplesSuccess,
  fetchSamplesFailure,
} from "./actions";

type SagaReturnType = void; // The saga doesn't return any value.
type SagaYieldEffects = CallEffect<any> | PutEffect<any>;

// Worker saga: makes the API call when watcher saga sees the action
function* fetchSamplesSaga(): Generator<SagaYieldEffects, SagaReturnType, any> {
  try {
    const response: Response = yield call(fetch, "/api/samples"); // Makes the API call
    const data: any = yield call([response, "json"]); // Parses the response

    // Dispatches the success action with the user data
    yield put(fetchSamplesSuccess(data));
  } catch (error) {
    const errorMessage =
      (error as Error).message || "An unknown error occurred";
    // Dispatches the failure action with the error
    yield put(fetchSamplesFailure(errorMessage));
  }
}

// Watcher saga: watches for actions dispatched to the store and starts worker saga
export function* watchSampleSagas(): Generator {
  yield takeLatest(fetchSamplesRequest.type, fetchSamplesSaga);
}
