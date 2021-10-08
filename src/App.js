
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Result from "./Result"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import Registrartion from "./Registration";
import Dashboard from "./Dashboard";
import Quiz from "./Quiz"

function App() {
  return (
    <div className="App">
      
      <Router>
        <div>
          <Switch>
            
          <Route  path="/res" children={
              
              <Result />

          } />
            <Route path="/dash/quiz/:sic/:subjectCode" >
            <Quiz />
            </Route>
          <Route path="/dash">
              <Dashboard />
            </Route>
            <Route path="/reg">
              <Registrartion />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
