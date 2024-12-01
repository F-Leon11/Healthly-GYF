import { Observable, Color } from '@nativescript/core';
import { LocalNotifications } from '@nativescript/local-notifications';
import { TNSPlayer } from 'nativescript-audio';

export class NotificationService extends Observable {
    private static instance: NotificationService;
    private player: TNSPlayer;
    private soundFiles = {
        default: '~/sounds/default.mp3',
        suave: '~/sounds/suave.mp3',
        energético: '~/sounds/energetico.mp3'
    };

    private constructor() {
        super();
        this.player = new TNSPlayer();
    }

    public static getInstance(): NotificationService {
        if (!NotificationService.instance) {
            NotificationService.instance = new NotificationService();
        }
        return NotificationService.instance;
    }

    async showNotification(title: string, message: string, backgroundColor: string, textColor: string, soundType: string, soundEnabled: boolean) {
        // Configurar y mostrar la notificación
        await LocalNotifications.schedule([{
            id: Date.now(),
            title,
            body: message,
            color: new Color(backgroundColor),
            textColor: new Color(textColor),
            sound: soundEnabled ? this.getSoundFile(soundType) : false,
            channel: 'healthy-gyf-channel'
        }]);

        // Reproducir sonido si está habilitado
        if (soundEnabled) {
            await this.playSound(soundType);
        }
    }

    private getSoundFile(soundType: string): string {
        return this.soundFiles[soundType.toLowerCase()] || this.soundFiles.default;
    }

    private async playSound(soundType: string) {
        try {
            const audioFile = this.getSoundFile(soundType);
            await this.player.playFromFile({
                audioFile,
                loop: false
            });
        } catch (error) {
            console.error('Error reproduciendo sonido:', error);
        }
    }
}