import React from 'react';
import {NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSun, faMoon, faFileImport} from '@fortawesome/free-solid-svg-icons'
import {inject, observer} from "mobx-react";

@inject('store')
@observer
export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.importClassTabs = this.importClassTabs.bind(this);
        this.toggleDarkTheme = this.toggleDarkTheme.bind(this);
        this.search = this.search.bind(this);
        this.goToTab = this.goToTab.bind(this);
    }

    componentDidMount() {
        // Get all "navbar-burger" elements
        var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {

            // Add a click event on each of them
            $navbarBurgers.forEach(function ($el) {
                $el.addEventListener('click', function () {

                    // Get the target from the "data-target" attribute
                    var target = $el.dataset.target;
                    var $target = document.getElementById(target);

                    // Toggle the class on both the "navbar-burger" and the "navbar-menu"
                    $el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');

                });
            });

            let navbarLinks = Array.prototype.slice.call(document.querySelectorAll('#navMenu a'), 0);
            navbarLinks.forEach(function ($el) {
                $el.addEventListener('click', function () {
                    document.querySelector('.navbar-burger').click();
                });
            });
        }
    }

    toggleDarkTheme() {
        this.props.store.uiState.toggleDarkTheme();
    }

    importClassTabs() {
        this.props.store.uiState.importClassTabs();
    }

    search(query, callback) {
        fetch("/api/search/ajaxSearch?query=" + query)
            .then(response => response.json())
            .then(myJson => callback(myJson));
    }

    goToTab()
    {
        const term = document.getElementById('searchInput').value;
        const query = encodeURIComponent(term);
            // +
            // "&artist=" + encodeURIComponent(artist) +
            // "&name=" + encodeURIComponent(name);
        const url = "/api/search?query=" + query;
        console.log(url);
        location.href = url;
    }

    render()
    {
        return (
            <nav className={"navbar " + (this.props.store.uiState.isDarkTheme ? ' is-dark ': ' is-success ')} role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <div className="navbar-item">
                        <a href={'/'}><img id='headerLogo' src={"/img/guitar.png"} style={{height: '28px'}} alt="Loon" /></a>
                    </div>

                    <a role="button" className="navbar-burger burger" data-target="navMenu">
                        <span />
                        <span />
                        <span />
                    </a>
                </div>

                <div className="navbar-menu" id="navMenu">
                    <div className="navbar-start">
                        <NavLink to='/all' activeClassName='is-active' className="navbar-item">All</NavLink>
                        <div className="navbar-item is-expanded">
                            <div className="field has-addons" style={{flexGrow: 1, flexShrink: 1}}>
                                <p className="control" style={{flexGrow: 1, flexShrink: 1}}>
                                    <input id="searchInput" className="input is-expanded is-fullwidth" type="text" placeholder="Find a tab" />
                                </p>
                                <p className="control">
                                    <button id="searchButton" className="button is-primary" onClick={this.goToTab}>
                                        Search
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="navbar-end">
                        <a onClick={this.importClassTabs} href={null} className={"navbar-item"}>
                            <span className="icon is-medium">
                                <FontAwesomeIcon icon={faFileImport}/>
                            </span>
                        </a>
                        <a onClick={this.toggleDarkTheme} href={null} className={"navbar-item"}>
                            <span className="icon is-medium">
                                <FontAwesomeIcon icon={this.props.store.uiState.theme === 'cyborg' ? faSun : faMoon}/>
                            </span>
                        </a>
                    </div>
                </div>
            </nav>
        );
    }
}