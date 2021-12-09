import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Todos from "./components/Todos";
import UserContextProvider from "./context/UserContext";
import history from "./history";

function App() {
  return (
    <UserContextProvider>
      <Router>
      <Switch>
        <Route exact path="/login" component={Login}  />
        <Route path="/register"  component={Register} />
        <Route path="/" component={Todos}  />
     
      </Switch>
    </Router>
    </UserContextProvider>
  );
}

export default App;
