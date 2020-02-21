import { h, render, JSX } from 'preact';
import App from './components/App';
import { ContextStore, initState, reducer } from './globalState';
import useThunkReducer from './utils/useThunkReducer';
const SW_PATH = '/service-worker.js';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(SW_PATH);
  });
}

const Provider = (): JSX.Element => {
  const [state, dispatch] = useThunkReducer(reducer, initState);

  return (
    <ContextStore.Provider value={{ ...state, dispatch }}>
      <App />
    </ContextStore.Provider>
  );
};

render(<Provider />, document.getElementById('root'));
