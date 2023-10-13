"use strict";
import * as _global from './definitions.mjs';
import {event,event_log} from './eventLog.mjs';
import {logError} from './errorHandler.mjs';
async function fetchJSON(targetFile,label,target){
    const response = await fetch(targetFile);
    const data = await response.json();
    //console.log(data,"fetchjson","data");
    //console.log(0,target,"fetchjson");
    if(target==undefined){
        //console.log(1,"fetchjson");
        //console.log(data);
        //saveData(label,data,undefined,'fetchJSON:'+target);
        sessionStorage.setItem(label,JSON.stringify(data));
        localStorage.setItem(label,JSON.stringify(data));
        return data;
    }else if(target=="session"){
        //console.log(2,"fetchjson","sessionstorage");
        //console.log(data);
        //saveData(label,data,'session','fetchJSON:'+target);
        sessionStorage.setItem(label,JSON.stringify(data));
        return data;
    }else if(target=="local"){
        //console.log(3,"fetchjson","localstorage");
        //console.log(data);
        //saveData(label,data,'local','fetchJSON:'+target);
        localStorage.setItem(label,JSON.stringify(data));
        return data;
    }else if(target=="none"){
        return data;
    }
}
function saveData(label,data,target,debugTag,pure){
    label = (label+':'+_global.APP_NAME);
    if(pure==undefined){
        pure = false;
    }
    if(debugTag==undefined){
        debugTag="undefined";
    }
    if(pure){
        if(data==null){
            data = sessionStorage.getItem(label);
            localStorage.setItem(label,data);
        }else{
            if(target==undefined){
                localStorage.setItem(label,data);
                sessionStorage.setItem(label,data);
            }else if(target=='session'){
                sessionStorage.setItem(label,data);
            }else if(target=='local'){
                localStorage.setItem(label,data);
            }
        }
    }else{
        if(data==null){
            data = JSON.parse(sessionStorage.getItem(label));
            localStorage.setItem(label,JSON.stringify(data));
        }else{
            if(target==undefined){
                localStorage.setItem(label,JSON.stringify(data));
                sessionStorage.setItem(label,JSON.stringify(data));
            }else if(target=='session'){
                sessionStorage.setItem(label,JSON.stringify(data));
            }else if(target=='local'){
                localStorage.setItem(label,JSON.stringify(data));
            }
        }
    }
    //console.log('saveData :[',debugTag,']');
}
function loadData(label,type,pure){
    label = (label+':'+_global.APP_NAME);
    if(pure==undefined){
        pure = false;
    }
    if(type==undefined){
        type='session';
    }
    if(pure){
        if(type=="session"){
            try{
                if(sessionStorage.label){
                    const data = sessionStorage.getItem(label);
                    return data;
                }
            }
            catch(e){
                logError('loadData_pure:session','loadData',e.message);

            }
        }else if(type=="local"){
            const data = localStorage.getItem(label);
            return data;
        }
    }else{
        if(type=="session"){
            const data = JSON.parse(sessionStorage.getItem(label));
            return data;
        }else if(type=="local"){
            const data = JSON.parse(localStorage.getItem(label));
            if(data!=undefined){
                return data;
            }else{
                logError('loadData:local','loadData',label+" doesn't exist");
                return undefined;
            }
        }
    }
}
function autoLoad(isTrue){
    if(isTrue==undefined){isTrue=false;}
    _global.session_data.global_settings.AUTOLOAD = isTrue;
    //autoload
}
function loadSettings(loc){
    //console.log('loadSettings:debug - ',_global.APP_NAME);
    const load_data = loadData('app_settings',loc);
    _global.session_data.global_settings = load_data;
    const _new = new event('loadSettings','global_settings','loading global_settigns');
    _new.log();
}
function saveSettings(loc,tag){
    if(tag==undefined){tag='saveSettings'}
    saveData('app_settings',_global.session_data.global_settings,loc,'saveSettings:'+tag);
    const _new = new event(tag,'global_settings','saving global_settigns');
    _new.log();
}
function loadSession(loc,tag){
    if(tag==undefined){tag='loadSession'}
    const el = new event_log();
    const ev = new event();
    //console.log('loadSession: ',_global.session_data,1);
    const data = loadData('session_data',loc);
    //console.log(data,2);
    data.event_log = Object.setPrototypeOf(data.event_log,el);
    //console.log(data,3);
    //if(data.event_log.length>0){
        for(let i=0;i<data.event_log.length;i++){
            data.event_log[i] = Object.setPrototypeOf(data.event_log[i],ev);
        }
    //}
    //data.id+="test";   
    //console.log(data,4);
    const data_keys = Object.keys(data);
    const data_values = Object.values(data);
    for(let i=0;i<data_keys.length;i++){
        if(_global.session_data.hasOwnProperty(data_keys[i])){
            _global.session_data[data_keys[i]] = data_values[i];
        }
    }
    //console.log('loadSession: ',_global.session_data,2);
    const _new = new event(tag,'session_data','loading session_data');
    _new.log(); 
}
function saveSession(loc,tag){
    if(tag==undefined){tag='saveSession'};
    //if(loc==undefined){loc="session"};
    const data = _global.session_data;
    //console.log('savesession: ',_global.session_data);
    saveData('session_data',data,loc,'saveSession:'+tag);
    const _new = new event(tag,'session_data','saving session_data');
    _new.log();
}
function saveToLocal(){}

export {fetchJSON,saveData,loadData,autoLoad,loadSettings,saveSettings,loadSession,saveSession};