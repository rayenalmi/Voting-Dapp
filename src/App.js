import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { Vote } from './components/Vote/Vote';
import { ConsultVoting } from './components/ConsultVoting/ConsultVoting';




function App() {
  return (
    <div className="App">
      <Router>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Routes>
                <Route exact path="/" element={<SignUp />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/Vote" element={<Vote />} />
                <Route path="/ConsultVoting" element={<ConsultVoting />} />



              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
