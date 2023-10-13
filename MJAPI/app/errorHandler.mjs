"use strict";
import {event} from './eventLog.mjs';
import * as _data from './Data.mjs';
import * as _global from './definitions.mjs';
// ERROR HANDLING
class error{
    constructor(code,type,msg){
        this.eventType = 'error';
        this.errorType = type;
        this.uid = _global.session_data.id;
        this.errorCode = code;
        this.errorMsg = msg;
    }
}
export function logError(code,type,msg){
    const _new = new error(code,type,msg);
    const _event = new event(_new.errorCode,_new.errorType,_new);
    _global.session_data.event_log.add(_event);
    _data.saveSession('session');
}