"use strict";
import {logError} from './errorHandler.mjs';
import {event} from './eventLog.mjs';
export function buttonClick(code,tag){
    try {
        code();
        const _click = new event(tag,'buttonPress','buttonPress');
        _click.log();
    }
    catch(err){
        logError(tag,'buttonPress',err.message);
    }
}