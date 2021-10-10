
import { BrowserRouter as Router, Route } from "react-router-dom";
import Consult from "./components/consult";
import Login from "./components/login";
import PatinetHistory from "./components/patientHistory";
import PatientList from "./components/patientsList";
import Reports from "./components/reports";


function App() {
  return (
    <Router>
    <div>
      <Route exact path="/">
        <Login />
      </Route>
      <Route path="/report">
        <Reports/>
      </Route>
      <Route path="/patient">
        <PatientList/>
      </Route>
      <Route path="/patientHistory">
        <PatinetHistory/>
      </Route>
      <Route path="/consult">
        <Consult/>
      </Route>
    </div>
  </Router>
  );
}

export default App;
