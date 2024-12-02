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
                description: "1. Parpadea rápidamente durante 10 segundos\n2. Mira un objeto lejano durante 20 segundos\n3. Realiza movimientos circulares con los ojos",

            },
            {
                title: "Estiramiento de cuello",
                description: "1. Gira suavemente tu cabeza de lado a lado\n2. Mantén cada posición por 5 segundos\n3. Repite 5 veces",

            },
            {
                title: "Estiramiento de hombros",
                description: "1. Realiza círculos con tus hombros hacia adelante 10 veces\n2. Realiza círculos hacia atrás 10 veces\n3. Encoge los hombros y mantén 5 segundos",

            },
            {
                title: "Estiramiento de espalda",
                description: "1. Siéntate derecho en tu silla\n2. Junta las manos y estíralas hacia adelante, arqueando la espalda\n3. Mantén la posición por 10 segundos y relaja\n4. Repite 5 veces",

            },
            {
                title: "Rotaciones de muñeca",
                description: "1. Estira tus brazos frente a ti\n2. Gira tus muñecas en círculos hacia la derecha durante 10 segundos\n3. Cambia de dirección y haz círculos hacia la izquierda durante otros 10 segundos\n4. Repite 3 veces",

            },
            {
                title: "Elevaciones de piernas",
                description: "1. Sentado en tu silla, eleva una pierna paralela al suelo y mantenla 5 segundos\n2. Baja lentamente y repite con la otra pierna\n3. Realiza 10 repeticiones por cada pierna",

            },
            {
                title: "Flexión de tobillos",
                description: "1. Estando sentado, levanta ligeramente los pies del suelo\n2. Flexiona los tobillos hacia arriba y luego hacia abajo\n3. Realiza 15 repeticiones",

            },
            {
                title: "Estiramiento lateral de torso",
                description: "1. Siéntate derecho y coloca una mano detrás de tu cabeza\n2. Inclina tu torso hacia el lado opuesto, estirando el costado\n3. Mantén la posición durante 10 segundos y cambia de lado\n4. Repite 3 veces por lado",

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