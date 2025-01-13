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
import Event from './pages/event';
import Quizjoin from './pages/game/quiz';
import QuizPlay from './pages/game/quiz/detail';
import { SocketContextProvider } from './contexts/socket';
import { PlayerContextProvider } from './contexts/player';
import "./styles/globals.css"
import FlappyBird from './pages/game/flappybird';
function App() {

  return (
    <SocketContextProvider>
        <PlayerContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path={RouterUrl.LOGIN} element={<PublicRoute><Login /></PublicRoute>} />
              <Route path={RouterUrl.REGISTER} element={<PublicRoute><Register /></PublicRoute>} />
              <Route path={RouterUrl.HOME} element={<PrivateRoute><PrivateContainer title="Home"><Home /></PrivateContainer></PrivateRoute>} />
              <Route path={RouterUrl.MY_VOUCHERS} element={<PrivateRoute><PrivateContainer title="My Vouchers"><CustomerVoucher /></PrivateContainer></PrivateRoute>} />
              <Route path={RouterUrl.RECEIVE_GIVE_AWAY} element={<PrivateRoute><PrivateContainer title="Receive Give Away"><ReceiveGiveAway /></PrivateContainer></PrivateRoute>} />
              <Route path={RouterUrl.EVENT_DETAIL} element={<PrivateRoute><PrivateContainer title="Event Detail"><Event /></PrivateContainer></PrivateRoute>} />
              <Route path={RouterUrl.GAME_QUIZ_JOIN} element={<PrivateRoute><PrivateContainer title="Quiz game join"><Quizjoin /></PrivateContainer></PrivateRoute>} />
              <Route path={RouterUrl.GAME_QUIZ_PLAY} element={<PrivateRoute><PrivateContainer title="Quiz game play"><QuizPlay /></PrivateContainer></PrivateRoute>} />
              <Route path={RouterUrl.GAME_FLAPPYBIRD} element={<PrivateRoute><PrivateContainer title="Flappy Bird"><FlappyBird /></PrivateContainer></PrivateRoute>} />
            </Routes>
          </BrowserRouter>
      </PlayerContextProvider>
    </SocketContextProvider>
  )
}

export default App
