import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './component/Footer';
import Home from './pages/Home';
import AllProjects from './pages/AllProjects';
import DashBoard from './pages/DashBoard';
import Auth from './pages/Auth';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/projects' element={<AllProjects></AllProjects>}></Route>
        <Route path='/dashboard' element={<DashBoard></DashBoard>}></Route>
        <Route path='/login' element={<Auth></Auth>}  ></Route>
{/* register={true} */}
        <Route path='/register' element={<Auth  register></Auth>}  ></Route>

      </Routes>

     <Footer></Footer>
    </div>
  );
}

export default App;
