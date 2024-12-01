import { Observable } from '@nativescript/core';
import { educationalResources } from '../data/educational-resources';

export class EducationViewModel extends Observable {
    constructor() {
        super();
        this.set('educationalResources', educationalResources);
    }
}