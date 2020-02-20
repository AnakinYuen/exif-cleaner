/**
 * inspired by [react-hook-thunk-reducer](https://github.com/nathanbuchar/react-hook-thunk-reducer)
 */

import { useCallback, useRef, useState, Reducer } from 'preact/hooks';

export type Dispatch<A, S> = (action: A | Thunk<A, S>) => void;
export type Thunk<A, S> = (dispatch: Dispatch<A, S>, getState: () => S) => void;

export function useThunkReducer<S, A, I extends S>(
  reducer: Reducer<S, A>,
  initialArg: I,
  init: (arg: I) => S = a => a,
): [S, Dispatch<A, S>] {
  const [hookState, setHookState] = useState(init(initialArg));

  // State management.
  const state = useRef(hookState);
  const getState = useCallback(() => state.current, [state]);
  const setState = useCallback(
    (newState: S) => {
      state.current = newState;
      setHookState(newState);
    },
    [state, setHookState],
  );

  // Reducer.
  const reduce = useCallback((action: A) => reducer(getState(), action), [reducer, getState]);

  // Augmented dispatcher.
  const dispatch = useCallback(
    (action: A | Thunk<A, S>) =>
      typeof action === 'function'
        ? (action as Thunk<A, S>)(dispatch, getState)
        : setState(reduce(action)),
    [getState, setState, reduce],
  );

  return [hookState, dispatch];
}

export default useThunkReducer;
