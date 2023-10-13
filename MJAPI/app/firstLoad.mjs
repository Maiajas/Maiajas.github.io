"use strict";
import * as _global from './definitions.mjs';
import * as _data from './Data.mjs';
import {changeLang} from './textLabels.mjs';
import {event} from './eventLog.mjs';
export async function firstLoad(){
    //console.log('firstload()',1);
    //remove js warnings from page
    let jsWarning = document.querySelectorAll('.js-disabled');
    for(let i=0;i<jsWarning.length;i++){
        jsWarning[i].remove();
    }
    //console.log("firstload",2,_global.session_data);
    // changelanguage
    await changeLang(true);
    //log event
    const _newevent = new event('firstLoad','firstLoad','app_init');
    _newevent.log();
}