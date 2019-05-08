import React from 'react';
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

@inject('store')
@observer
export default class TabTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {tab: null};
    }

    componentDidMount()
    {
        const self = this;
        fetch('/api/tab/' + this.props.match.params.hash, {method: 'GET'})
            .then(response => response.json())
            .then(data => self.setState({tab: data}));
    }

    render()
    {
        const tab = this.state.tab;

        if (!tab)
            return (<div>Loading...</div>);

        return (
            <div>
                <section className="section">
                    <div className="container">
                        <div className="columns">
                            <h1 className="title"  dangerouslySetInnerHTML={{ __html: tab.artist + ' - ' + tab.name }} />
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <div className="columns is-multiline is-centered">
                            <div className="column">
                                <pre>{tab.content}</pre>
                            </div>
                            <div className="column is-one-quarter">
                                <table className="table">
                                    <tbody>
                                    <tr>
                                        <td>Created On</td>
                                        <td>{tab.createdOn}</td>
                                    </tr>
                                    <tr>
                                        <td>Rating</td>
                                        <td>{tab.rating} ({tab.numberRates})</td>
                                    </tr>
                                    <tr>
                                        <td>URL</td>
                                        <td><a target="_blank" href={tab.url}>Link</a></td>
                                    </tr>
                                    <tr>
                                        <td>Type</td>
                                        <td>{tab.type}</td>
                                    </tr>
                                    <tr>
                                        <td>Tonality</td>
                                        <td>{tab.tonality}</td>
                                    </tr>

                                    <tr>
                                        <td>Tuning</td>
                                        <td>{tab.tuning}</td>
                                    </tr>
                                    <tr>
                                        <td>Capo</td>
                                        <td>{tab.capo}</td>
                                    </tr>
                                    <tr>
                                        <td>Difficulty</td>
                                        <td>{tab.difficulty}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
