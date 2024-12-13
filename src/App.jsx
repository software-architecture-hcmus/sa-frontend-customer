import { BrowserRouter , Route, Routes } from 'react-router-dom';
import RouterUrl from './const/RouterUrl';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouterUrl.LOGIN} element={<Login />} />
        <Route path={RouterUrl.REGISTER} element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
