import { all, fork } from "redux-saga/effects";
import { watchSampleSagas } from "./samples/sagas";

export function* rootSaga() {
  yield all([
    fork(watchSampleSagas),
    // ... other watcher sagas would be forked here
  ]);
}
