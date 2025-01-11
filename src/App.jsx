import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RouterUrl from './const/RouterUrl';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import PrivateContainer from './components/PrivateContainer';

import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import CustomerVoucher from './pages/customer-voucher/CustomerVoucher';
import ReceiveGiveAway from './pages/receive-give-away/ReceiveGiveAway';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouterUrl.LOGIN} element={<PublicRoute><Login /></PublicRoute>} />
        <Route path={RouterUrl.REGISTER} element={<PublicRoute><Register /></PublicRoute>} />
        <Route path={RouterUrl.HOME} element={<PrivateRoute><PrivateContainer title="Home"><Home /></PrivateContainer></PrivateRoute>} />
        <Route path={RouterUrl.MY_VOUCHERS} element={<PrivateRoute><PrivateContainer title="My Vouchers"><CustomerVoucher /></PrivateContainer></PrivateRoute>} />
        <Route path={RouterUrl.RECEIVE_GIVE_AWAY} element={<PrivateRoute><PrivateContainer title="Receive Give Away"><ReceiveGiveAway /></PrivateContainer></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
