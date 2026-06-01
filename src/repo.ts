export interface KtaneModule {
    readonly Name: string;
    readonly FileName: string;
}

interface KtaneResponse {
    readonly KtaneModules: KtaneModule[];
}

class Repo {
    private _modules?: KtaneModule[];
    private fetchPromise?: Promise<void>;

    private async _fetch() {
        const res = await fetch("https://ktane.timwi.de/json/raw"),
            data: KtaneResponse = await res.json();

        this._modules = data.KtaneModules;
    }

    public fetch() {
        return this.fetchPromise ??= this._fetch();
    }

    // readonly
    public get modules() {
        return this._modules;
    }
}

export const repo = new Repo();