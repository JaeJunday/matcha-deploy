'use client';

import { Provider } from 'react-redux';
import Footer from './components/Footer';
import Chat from './(chat)/Chat';
import { SocketProvider } from '../utils/socketContext';
import store from '../redux/store';
import HomeNavBar from './components/HomeNavBar';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Provider store={store}>
        <SocketProvider>
          <HomeNavBar />
          <Chat />
          <main>{children}</main>
          <Footer />
        </SocketProvider>
      </Provider>
    </div>
  );
};

export default HomeLayout;
