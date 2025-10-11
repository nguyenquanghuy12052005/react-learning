
import './App.scss';
import Header from './components/Header/Header';

import { Link  } from 'react-router-dom';
import { Outlet } from "react-router";
import Footer from './components/Footer/Footer';
const App = () => {

  return (
    
    <div className="App-container">
      <div className='header-container'><Header/>
      </div>

      <div className='main-container'>
         <div className='sidenav-container'></div>
         <div className='app-content'>
           <div className='footer-container'><Footer/>
      </div>
          <Outlet></Outlet>
         </div>
        
      </div>
    
    
    </div>
  
  );
}

export default App;
