import { Observable, ApplicationSettings } from '@nativescript/core';

export interface NotificationPreferences {
    backgroundColor: string;
    textColor: string;
    soundEnabled: boolean;
    soundType: 'default' | 'suave' | 'energético';
}

export class PreferencesService extends Observable {
    private static instance: PreferencesService;
    private readonly PREFS_KEY = 'notification_preferences';
    private _preferences: NotificationPreferences;

    private constructor() {
        super();
        this._preferences = this.loadPreferences();
    }

    public static getInstance(): PreferencesService {
        if (!PreferencesService.instance) {
            PreferencesService.instance = new PreferencesService();
        }
        return PreferencesService.instance;
    }

    private loadPreferences(): NotificationPreferences {
        const savedPrefs = ApplicationSettings.getString(this.PREFS_KEY);
        if (savedPrefs) {
            return JSON.parse(savedPrefs);
        }
        return {
            backgroundColor: '#7c3aed',
            textColor: '#ffffff',
            soundEnabled: true,
            soundType: 'default'
        };
    }

    savePreferences(preferences: Partial<NotificationPreferences>) {
        this._preferences = { ...this._preferences, ...preferences };
        ApplicationSettings.setString(this.PREFS_KEY, JSON.stringify(this._preferences));
        this.notifyPropertyChange('preferences', this._preferences);
    }

    get preferences(): NotificationPreferences {
        return this._preferences;
    }
}