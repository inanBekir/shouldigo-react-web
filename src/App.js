import './App.css';
import AuthLoading from './screens/Auth/AuthLoading';
import {Provider} from 'react-redux';
import store from './screens/redux/store';

function App() {
  return (
    <Provider store={store}>
      <AuthLoading/>
    </Provider>
  );
}

export default App;
