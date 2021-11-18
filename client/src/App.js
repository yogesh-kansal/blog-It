import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from './contexts/authContext';

import Header from './components/Header/header';
import Footer from './components/Footer/footer';

import Login from './pages/Auth/login';
import Signup from './pages/Auth/signup';

import Home from './pages/Home/home';
import SingleBlog from './pages/SingleBlog/single';
import NewBlog from './pages/NewBlog/newBlog';


const App = () => {
  const {loginStatus} = useContext(authContext);
  
  return (
    <div className="App">
          <div className="wrap">
            <BrowserRouter>
                <Header/>

                {!loginStatus
                ?
                  <Switch>
                    <Route path="/login" component={(props) => <Login {...props}/>}/>
                    <Route path="/signup" component={Signup}/>
                    <Redirect to={"/signup"}/>
                  </Switch>
                :
                  <Switch>
                    <Route exact path="/blogs" component={Home} />
                    <Route exact path ="/blog/new" component={(props)=><NewBlog {...props}/>}/>
                    <Route path="/blog/:blogId" component={SingleBlog} />
                    <Redirect to="/blogs" />
                  </Switch>
                }      
            </BrowserRouter>
            </div>
            <Footer/>
        </div>
  );
}

export default App;
