import './App.css';
import ItemData from './Components/ItemData';
import Login from './Components/Login';
import Modals from './Components/Modal';
import Signup from './Components/Signup';
import Home from './Components/Home';
// import { createBrowserHistory } from 'history';
import {
  BrowserRouter ,
  Switch,
  Router,
  Link,
  Route,
  Redirect
} from "react-router-dom";
import Dash from './Components/Dash';
import { useEffect } from 'react';


function App() {

  let userid = JSON.parse(localStorage.getItem('userid'));

  useEffect(()=>{
    console.log(userid,'===================================')
  },[])
  // const history = createBrowserHistory();
  return (
    <div className="App">
      <BrowserRouter>
       
        <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/Login" component={Login} />
                <Route exact path="/Signup" component={Signup} />
                { userid ? (
                  <>
                  <Route exact path="/ItemData" component={ItemData} />
                  <Route exact path="/Modals" component={Modals} />
                  </>
                ) : 
                (
                  <Redirect to="/" />
                )
                }
                <Route exact path="/Dash" component={Dash} />
            </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;


