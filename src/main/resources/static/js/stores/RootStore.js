import {AppState} from "./AppState";
import {UiState} from "./UiState";
import {computed} from "mobx";
import fetchDefaults from 'fetch-defaults'

export class RootStore {
    constructor() {
        this.appState = new AppState(this);
        this.uiState = new UiState(this);

        // const header = document.head.querySelector("[name~=_csrf_header][content]").content;
        // const token = document.head.querySelector("[name~=_csrf][content]").content;

        const header = 'test';
        const token =  'test';

        this.myFetch = fetchDefaults(window.fetch, "", {
            headers: {[header]: token}
        });
    }

    @computed get dataLoaded() {
        return this.uiState.theme
    }

}