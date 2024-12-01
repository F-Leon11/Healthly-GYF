import { Observable } from '@nativescript/core';
import { NotificationService } from './notification.service';
import { PreferencesService } from './preferences.service';

export class ReminderService extends Observable {
    private static instance: ReminderService;
    private notificationService: NotificationService;
    private preferencesService: PreferencesService;
    private reminderInterval: number;
    private isActive: boolean = false;

    private constructor() {
        super();
        this.notificationService = NotificationService.getInstance();
        this.preferencesService = PreferencesService.getInstance();
        this.reminderInterval = 30; // minutos por defecto
    }

    public static getInstance(): ReminderService {
        if (!ReminderService.instance) {
            ReminderService.instance = new ReminderService();
        }
        return ReminderService.instance;
    }

    startReminders() {
        this.isActive = true;
        this.scheduleNextReminder();
    }

    stopReminders() {
        this.isActive = false;
    }

    setReminderInterval(minutes: number) {
        this.reminderInterval = minutes;
        if (this.isActive) {
            this.scheduleNextReminder();
        }
    }

    private scheduleNextReminder() {
        if (!this.isActive) return;

        setTimeout(() => {
            const prefs = this.preferencesService.preferences;
            this.notificationService.showNotification(
                "¡Es hora de moverse!",
                "Toma un descanso y realiza algunos ejercicios",
                prefs.backgroundColor,
                prefs.textColor,
                prefs.soundType,
                prefs.soundEnabled
            );
            this.scheduleNextReminder();
        }, this.reminderInterval * 60 * 1000);
    }
}