import React from 'react';
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

@inject('store')
@observer
export default class TabTable extends React.Component {
    constructor(props) {
        super(props);
        this.parsePath = this.parsePath.bind(this);

        this.state = {tabs: null};
    }

    componentDidMount()
    {
        this.parsePath(this);
    }

    parsePath()
    {
        let self = this;
        if (this.props.match.path === '/')
        {
            fetch('/api/top', {method: 'GET'})
                .then(response => response.json())
                .then(data => self.setState({tabs: data, title: 'Top 50'}));
        }
        if (this.props.match.path === '/all')
        {
            fetch('/api/all', {method: 'GET'})
                .then(response => response.json())
                .then(data => self.setState({tabs: data, title: 'All'}));
        }
        if (this.props.match.path === '/search/:query')
        {
            const query = this.props.match.params.query;
            fetch('/api/search', {method: 'POST', body: {query: query}})
                .then(response => response.json())
                .then(data => self.setState({tabs: data, title: 'Search Results: ' + query}));
        }
        if (this.props.match.path === '/artist/:name')
        {
            const artist = this.props.match.params.name;
            fetch('/api/artist/' + artist, {method: 'GET'})
                .then(response => response.json())
                .then(data => self.setState({tabs: data, title: 'Artist: ' + artist}));
        }
    }

    render()
    {
        if (!this.state.tabs)
            return (<div>Loading...</div>);

        const rows = this.state.tabs.map((tab, index) => {
            return (
                <tr>
                    <td className="has-text-right">{index + 1}.</td>
                    <td>
                        <Link to={"/artist/" + tab.artist} dangerouslySetInnerHTML={{ __html: tab.artist }}/>
                        <br />
                        <b><Link to={"/tab/" + tab.hash} dangerouslySetInnerHTML={{ __html: tab.name }}/></b>
                    </td>
                    <td className="has-text-right no-wrap">
                        <span title={tab.numberRates + ' votes'}>{tab.rating}</span>
                    </td>
                    <td>{tab.type}</td>
                </tr>
            );
        });

        return (
            <section className="section">
                <div className="container">
                    <div className="columns is-multiline is-centered">
                        <div className="column">
                            <h1 className="title">{this.state.title}</h1>
                            <table className="table is-narrow">
                                <thead>
                                <tr>
                                    <th> </th>
                                    <th> </th>
                                    <th className="has-text-right">rating</th>
                                    <th>type</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
