
import './App.scss';
import Header from './components/Header/Header';
import { Link  } from 'react-router-dom';

const App = () => {

  return (
    
    <div className="App-container">
      <Header></Header>
     
      <div>test link</div>
      
      <button>
        <Link to="/users">go user</Link></button>
      <button>
        <Link to="/admin">go admin</Link>
       </button>
    </div>
  
  );
}

export default App;
