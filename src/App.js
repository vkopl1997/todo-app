import './App.css';
import { FirstPage } from './pages/firstPage/FirstPage';
import { LoginPage } from './pages/loginPage/LoginPage';
import { Route, Routes } from 'react-router-dom';
import { TodoPage } from '../src/pages/todoPage/TodoPage';

function App() {
  return (
    <>
     <Routes>
      <Route path='/' element={<FirstPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/todo' element={<TodoPage/>}/>
     </Routes>
    </>
  );
}

export default App;
