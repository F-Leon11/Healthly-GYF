import { Application } from '@nativescript/core';
import { registerModules } from './register-modules';

registerModules();
Application.run({ moduleName: 'app-root' });