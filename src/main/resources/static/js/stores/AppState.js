import {observable, computed, autorun, action} from 'mobx';

export class AppState {
    @observable tabs;

    constructor(rootStore) {
        autorun(() => console.log(this.report));
        this.rootStore = rootStore;

        // this.loadTabs();
    }

    @action
    getTopTabs()
    {
        const tabs = fetch('/top', {method: 'GET'})
            .then(response => response.json());

        return tabs;
    }
}