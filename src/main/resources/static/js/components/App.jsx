import React from 'react';
import {Redirect, Route, Router} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import 'bulma-extensions/bulma-pageloader/dist/css/bulma-pageloader.min.css'

import Header from "./Header.jsx";
import MyHelmet from "./MyHelmet.jsx";

import {inject, observer} from "mobx-react";
import TabTable from "./TabTable.jsx";
import Tab from "./Tab.jsx";

@inject('store')
@observer
export default class App extends React.Component {

    constructor(props) {
        super(props);
        let self = this;

        const basename = '/';
        const history = createBrowserHistory({ basename });
        self.state = {history: history};
    }

    render() {
        const store = this.props.store;
        if (!store.uiState.theme)
            return (<div> </div>);

        if (!store.dataLoaded)
        {
            return (
                <div>
                    <MyHelmet/>
                    <div className={"pageloader is-active" + (store.uiState.isDarkTheme ? ' is-dark ' : '')}><span className="title">Loading...</span></div>
                </div>
            );
        }

        return (
            <Router history={this.state.history}>
                 <div>
                    <MyHelmet />
                    <Header />

                    <div className={'columns is-gapless'}>
                        <div className="column">
                            {/*<Route exact path='/'                               render={() => <Redirect to='/search' /> } />*/}
                            <Route exact path='/'                               render={(props) => <TabTable {...props} /> } />
                            <Route exact path='/all'                            render={(props) => <TabTable {...props} /> } />
                            <Route exact path='/search/:query'                  render={(props) => <TabTable {...props} /> } />
                            <Route exact path='/artist/:name'                   render={(props) => <TabTable {...props} /> } />
                            <Route exact path='/tab/:hash'                      render={(props) => <Tab {...props} /> } />
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}