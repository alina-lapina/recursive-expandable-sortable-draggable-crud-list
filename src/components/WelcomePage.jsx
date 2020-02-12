import React from "react";
import "../css/pages.css";
import { Link } from "react-router-dom";

export default function WelcomePage() {
    return (
        <div className="page">
            <h1>Welcome to List library project</h1>
            <p>The application is under development.</p>
            <h2>Source code</h2>
            <p>You can find the source code on <a
                    className="App-link"
                    href="https://github.com/alina-lapina/recursive-expandable-sortable-draggable-crud-list"
                    target="_blank"
                    rel="noopener noreferrer"
                >GitHub repository</a>
            </p>

            <button><Link to="/demo">Show a list</Link></button>
        </div>
    );
}