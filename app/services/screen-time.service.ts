import { Observable } from '@nativescript/core';

export class ScreenTimeService extends Observable {
    private static instance: ScreenTimeService;
    private startTime: Date;
    private isTracking: boolean = false;

    private constructor() {
        super();
        this.startTime = new Date();
    }

    public static getInstance(): ScreenTimeService {
        if (!ScreenTimeService.instance) {
            ScreenTimeService.instance = new ScreenTimeService();
        }
        return ScreenTimeService.instance;
    }

    startTracking() {
        this.isTracking = true;
        this.startTime = new Date();
    }

    stopTracking() {
        this.isTracking = false;
    }

    getScreenTime(): number {
        if (!this.isTracking) return 0;
        const now = new Date();
        return Math.floor((now.getTime() - this.startTime.getTime()) / 60000);
    }
}