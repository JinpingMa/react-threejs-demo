import React from 'react';
import logo from './logo.svg';
import { Link, HashRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './App.module.scss';
import OrbitControlsPage from './pages/2.1/orbit-controls'
import Face3Demo from './pages/2.6';
import ModelClone from "./pages/4.1";
import LightObject from "./pages/5.1";
import ShadowObject from "./pages/5.2";
import LevelModel from "./pages/6.1";
import LionModel from "./pages/lion";
import BodyModel from "./pages/6.2";
import ArcCurve from "./pages/7.2";

function App() {
    const navData = [
        {
            path: '/2.1',
            name: '2.1',
            component: <OrbitControlsPage />
        },
        {
            path: '/2.2',
            name: '2.2',
            component: <Face3Demo />
        },
        {
            path: '/4.1',
            name: '4.1',
            component: <ModelClone />
        },
        {
            path: '/5.1',
            name: '5.1',
            component: <LightObject />
        },
        {
            path: '/5.2',
            name: '5.2',
            component: <ShadowObject />
        },
        {
            path: '/6.1',
            name: '6.1',
            component: <LevelModel />
        },
        {
            path: '/lion',
            name: 'lion',
            component: <LionModel />
        },
        {
            path: '/6.2',
            name: '6.2',
            component: <BodyModel />
        },
        {
            path: '/7.2',
            name: '7.2',
            component: <ArcCurve />
        },
    ]
  return (
    <div className="App">
        <section>
            <Router>
                <ul className={styles.navContainer}>
                    {navData.map(item => (
                        <li key={item.path}>
                            <Link to={item.path}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
                <section className={styles.mainContainer}>
                    <Switch>
                        {navData.map((item, index) => {
                            if (index === 0) {
                                return <Route key={index} exact path="/">
                                    <OrbitControlsPage />
                                </Route>
                            } else {
                                return <Route key={item.path} path={item.path} >
                                    {item.component}
                                </Route>
                            }
                        })}
                    </Switch>
                </section>
            </Router>
        </section>
    </div>
  );
}

export default App;
