import React from 'react';
import logo from '../images/AlinaLapina.jpg';
import '../css/App.css';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import WelcomePage from "./WelcomePage";
import {ListDemo} from "./ListDemo";

export default function App() {
    return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <div className="App-name">
                            <Link to="/">
                                <img src={logo} className="App-logo" alt="Alina Lapina's avatar"/>
                                Recursive expandable checkable sortable list view
                            </Link>
                        </div>
                    </header>
                    <Switch>
                        <Route path="/" exact component={WelcomePage}/>
                        <Route path="/expandable" exact component={ListDemo}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </div>
            </Router>
    )
}

export function NoMatch({location}) {
    return (
        <div className="page">
            <h3>No match for <code>{location.pathname}</code>.</h3>
            <p>Back to <Link to="/">home page</Link></p>
        </div>
    );
}
