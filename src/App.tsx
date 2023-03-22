/* eslint-disable import/no-extraneous-dependencies */
import { ToastContainer } from 'react-toastify';
import { CardProvider } from './providers/CardContext';
import { UserProvider } from './providers/UserContext';
import Router from './routes';
import { GlobalStyles } from './styles/global';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <UserProvider>
    <CardProvider>
      <GlobalStyles />
      <Router />
    </CardProvider>
    <ToastContainer
      position='top-center'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
    />
  </UserProvider>
);

export default App;
