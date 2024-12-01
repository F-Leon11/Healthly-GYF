import { Observable, Frame } from '@nativescript/core';
import { alert } from '@nativescript/core/ui/dialogs';
import { ScreenTimeService } from './services/screen-time.service';
import { ScreenFilterService } from './services/screen-filter.service';

export class MainViewModel extends Observable {
    private screenTimeService: ScreenTimeService;
    private screenFilterService: ScreenFilterService;
    private updateInterval: number;

    constructor() {
        super();
        this.screenTimeService = ScreenTimeService.getInstance();
        this.screenFilterService = ScreenFilterService.getInstance();

        // Inicializar estados
        this.set('isTracking', false);
        this.set('screenTimeFormatted', '0 minutos');
        this.set('isFilterEnabled', false);

        // Iniciar actualización del tiempo en pantalla
        this.updateInterval = setInterval(() => {
            this.updateScreenTime();
        }, 1000);
    }

    toggleTracking() {
        const isTracking = !this.get('isTracking');
        this.set('isTracking', isTracking);
        
        if (isTracking) {
            this.screenTimeService.startTracking();
        } else {
            this.screenTimeService.stopTracking();
        }
    }

    toggleFilter() {
        const isEnabled = this.screenFilterService.toggleFilter();
        this.set('isFilterEnabled', isEnabled);
    }

    showRandomExercise() {
        const exercises = [
            {
                title: "Ejercicios para ojos",
                description: "1. Parpadea rápidamente durante 10 segundos\n2. Mira un objeto lejano durante 20 segundos\n3. Realiza movimientos circulares con los ojos"
            },
            {
                title: "Estiramiento de cuello",
                description: "1. Gira suavemente tu cabeza de lado a lado\n2. Mantén cada posición por 5 segundos\n3. Repite 5 veces"
            },
            {
                title: "Estiramiento de hombros",
                description: "1. Realiza círculos con tus hombros hacia adelante 10 veces\n2. Realiza círculos hacia atrás 10 veces\n3. Encoge los hombros y mantén 5 segundos"
            }
        ];

        const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
        alert({
            title: randomExercise.title,
            message: randomExercise.description,
            okButtonText: "¡Entendido!"
        });
    }

    private updateScreenTime() {
        if (this.get('isTracking')) {
            const minutes = this.screenTimeService.getScreenTime();
            this.set('screenTimeFormatted', `${minutes} minutos`);
        }
    }

    // Navegación
    navigateToHome() {
        Frame.topmost().navigate({
            moduleName: "main-page",
            clearHistory: true
        });
    }

    navigateToEducation() {
        Frame.topmost().navigate({
            moduleName: "components/education-page"
        });
    }

    navigateToSettings() {
        Frame.topmost().navigate({
            moduleName: "components/settings-page"
        });
    }
}