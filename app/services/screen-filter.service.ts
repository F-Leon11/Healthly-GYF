import { Observable, Application, Color } from '@nativescript/core';

export class ScreenFilterService extends Observable {
    private static instance: ScreenFilterService;
    private _isFilterEnabled: boolean = false;

    private constructor() {
        super();
    }

    public static getInstance(): ScreenFilterService {
        if (!ScreenFilterService.instance) {
            ScreenFilterService.instance = new ScreenFilterService();
        }
        return ScreenFilterService.instance;
    }

    toggleFilter() {
        this._isFilterEnabled = !this._isFilterEnabled;
        const page = Application.getRootView();
        if (this._isFilterEnabled) {
            page.backgroundColor = new Color('#FFFFF0');
            page.opacity = 0.9;
        } else {
            page.backgroundColor = new Color('#FFFFFF');
            page.opacity = 1;
        }
        return this._isFilterEnabled;
    }

    get isFilterEnabled(): boolean {
        return this._isFilterEnabled;
    }
}