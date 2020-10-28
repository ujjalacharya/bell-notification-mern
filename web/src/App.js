import { Switch, Route } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Home from "./pages/Home";
import Test from "./pages/Test";

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/test" exact component={Test} />
        <Route path="/" exact component={Home} />
      </Switch>
    </div>
  );
}

export default App;
