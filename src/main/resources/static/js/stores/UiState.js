import {observable, computed, action} from 'mobx';

export class UiState {
    @observable language = "en_US";
    @observable theme = 'cyborg';
    @observable pendingRequestCount = 0;

    constructor(rootStore) {
        this.rootStore = rootStore;

        const self = this;
    }

    @action
    toggleDarkTheme() {
        if (this.theme === 'default')
            this.theme = 'cyborg';
        else
            this.theme = 'default';
    }

    @action
    importClassTabs() {
        const self = this;
        return fetch('/import', {method: 'GET'});
    }

    @computed get themeUrl() {
        let theme = this.theme;
        if (!theme)
            theme = 'default';

        return 'https://unpkg.com/bulmaswatch/' + theme + '/bulmaswatch.min.css';
    }

    @computed get isDarkTheme() {
        return ['cyborg', 'darkly', 'nuclear', 'slate', 'solar', 'superhero',].includes(this.theme);
    }

    @computed get appIsInSync() {
        return this.pendingRequestCount === 0
    }
}