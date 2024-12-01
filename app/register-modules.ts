import { registerElement } from '@nativescript/core';

export function registerModules() {
    // Registrar páginas principales
    require('./main-page');
    require('./components/education-page');
    require('./components/settings-page');
}