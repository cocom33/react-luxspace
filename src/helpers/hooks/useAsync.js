import { useCallback, useReducer, useRef } from "react";
import useSafeDispatch from "./useSafeDispatch";

const defaultState = {
  data: null,
  status: "idle",
  error: null,
};

export default function useAsync(initaialState) {
  const initaialStateRef = useRef({ ...defaultState, ...initaialState });

  const [{ data, status, error }, setState] = useReducer((state, action) => {
    return { ...state, ...action };
  }, initaialStateRef.current);

  const safeSetState = useSafeDispatch(setState);

  const run = useCallback(
    (promise) => {
      if (!promise || !promise.then)
        throw new Error(
          `the argument passed to useAsync().run must be a promise`
        );
      safeSetState({ status: "pending" });
      return promise.then(
        (data) => {
          safeSetState({
            data,
            status: "resolved",
          });
          return data;
        },
        (error) => {
          safeSetState({
            status: "rejected",
            error: JSON.parse(error.message),
          });
        }
      );
    },
    [safeSetState]
  );
  const setData = useCallback(
    (data) => {
      safeSetState({ data });
    },
    [safeSetState]
  );

  const setError = useCallback(
    (error) => {
      safeSetState({ error });
    },
    [safeSetState]
  );

  const reset = useCallback(() => {
    safeSetState(initaialStateRef.current);
  }, [safeSetState]);

  return {
    data,
    status,
    error,
    run,
    setData,
    setError,
    reset,
    isIdle: status === "idle",
    isLoading: status === "idle" || status === "pending",
    isError: status === "rejected",
    isSuccess: status === "resolved",
  };
}
