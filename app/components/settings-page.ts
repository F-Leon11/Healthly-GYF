import { Page } from '@nativescript/core';
import * as dialogs from '@nativescript/core/ui/dialogs';
import { ApplicationSettings } from '@nativescript/core';

export function onSelectColor(args) {
    const page = <Page>args.object.page;

    // Mostrar un diálogo para elegir un color
    dialogs.action({
        message: "Elige un color",
        cancelButtonText: "Cancelar",
        actions: ["Rojo", "Verde", "Azul", "Amarillo","Blanco"]
    }).then((result) => {
        let color;

        // Asignar el color seleccionado
        if (result === "Rojo") {
            color = "#FF5733";
        } else if (result === "Verde") {
            color = "#28A745";
        } else if (result === "Azul") {
            color = "#007BFF";
        } else if (result === "Amarillo") {
            color = "#FFC107";
        }else if (result === "Blanco"){
            color = "#FFFFFF"
        }

        // Aplicar el color a la página (o algún otro componente de UI)
        page.backgroundColor = color;  // Aplica el color de fondo de la página

        // Guardar el color seleccionado en la configuración
        ApplicationSettings.setString("notificationColor", color);


    });
}

export function onSelectSound(args) {
    const page = <Page>args.object.page;

    // Mostrar un diálogo con opciones de sonidos
    dialogs.action({
        message: "Elige un sonido",
        cancelButtonText: "Cancelar",
        actions: ["Sonido 1", "Sonido 2", "Sonido 3"]
    }).then((result) => {
        let soundFile: string;

        // Asignar el archivo de sonido según la opción seleccionada
        if (result === "Sonido 1") {
            soundFile = "sound1.mp3";
        } else if (result === "Sonido 2") {
            soundFile = "sound2.mp3";
        } else if (result === "Sonido 3") {
            soundFile = "sound3.mp3";
        }

        // Reproducir el sonido seleccionado
        const soundPath = "res://raw/" + soundFile;  // Para Android
        // Para iOS, usa la ruta adecuada: "res://Sounds/"

        sound.play({
            src: soundPath,
            loop: false  // No se repetirá el sonido
        });

        // Guardar la elección de sonido en la configuración
        ApplicationSettings.setString("notificationSound", soundFile);

        alert(`Sonido seleccionado: ${result}`);
    });
}

// Manejar la selección del tiempo entre notificaciones
export function onSelectTime(args) {
    const page = <Page>args.object.page;
    const slider = <Slider>args.object;
    const timeLabel = <Label>page.getViewById("timeLabel");

    // Obtener el valor seleccionado del slider
    const time = Math.round(slider.value);

    // Mostrar el valor elegido en la etiqueta
    timeLabel.text = `Tiempo: ${time} minutos`;

    // Guardar el tiempo seleccionado en la configuración
    ApplicationSettings.setNumber("notificationTime", time);

    alert(`Tiempo entre notificaciones: ${time} segundos`);
}
export function onSliderValueChange(args: EventData) {
    const slider = <Slider>args.object; // Obtén el slider
    const timeLabel = <Label>slider.page.getViewById("timeLabel"); // Obtén la etiqueta "Tiempo"

    // Actualiza el texto de la etiqueta con el valor actual del slider
    timeLabel.text = `Tiempo: ${Math.round(slider.value)} segundos`;
}