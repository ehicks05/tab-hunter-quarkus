import React from 'react';
import Helmet from 'react-helmet';
import {inject, observer} from "mobx-react";

@inject('store')
@observer
export default class MyHelmet extends React.Component {
    constructor(props) {
        super(props);
    }

    render()
    {
        const uiState = this.props.store.uiState;
        const title = 'TabHunter';

        return (
            <Helmet defer={false}>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{title}</title>
                <link rel="stylesheet" href={uiState.themeUrl} />
                <link rel="shortcut icon" href={"/img/guitar.png"} />

                <style>
                    {
                        `
                        html {overflow-y: auto !important;}

                        #level {
                            position: fixed;
                            bottom: 0;
                            width: 100%;
                        }
                        
                        section {padding: 10px !important;}
                        
                        /* SCROLLBAR */
                        ::-webkit-scrollbar {width: 8px;}
                        
                        /* Track */
                        ::-webkit-scrollbar-track-piece:start {background: transparent url('../images/scrollbar.png') repeat-y !important;}
                        ::-webkit-scrollbar-track-piece:end {background: transparent url('../images/scrollbar.png') repeat-y !important;}
                        
                        /* Handle */
                        ::-webkit-scrollbar-thumb {background: #777;}
                        ::-webkit-scrollbar-thumb:hover {background: #888;}
                        `
                    }
                </style>
            </Helmet>);
    }
}