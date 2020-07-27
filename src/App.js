import React from 'react';
import logo from './logo.svg';
import { Link, HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import OrbitControlsPage from './pages/orbit-controls'
function App() {
    const navData = [{
        path: '/2.1',
        name: '2.1'
    }]
  return (
    <div className="App">
        <section>
            <Router>
                <ul className="">
                    {navData.map(item => (
                        <li>
                            <Link to={item.path}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
                <Switch>
                    <Route exact path="/2.1">
                        <OrbitControlsPage />
                    </Route>
                </Switch>
            </Router>
        </section>
    </div>
  );
}

export default App;
