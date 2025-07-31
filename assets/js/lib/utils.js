'use strict';
/**
 * @author Elodie Bayet
 */

import { environment } from "../environment.js";

export class EventsManager {
    constructor() {
        this._events = {};
    }
    on(evt, listener) {
        (this._events[evt] || (this._events[evt] = [])).push(listener);
        return this;
    }
    emit(evt, args) {
        (this._events[evt] || []).slice().forEach(listener => listener(...args));
    }
}

export class HTTPService {

    static isLocal(){
        return location.hostname === '127.0.0.1' || location.hostname === 'localhost';
    }

    static isProduction() {
        return environment.production;
    }

    static getCreditsUrl() {
        return environment.production ? environment.prod.credits : environment.local.credits;
    }
}
