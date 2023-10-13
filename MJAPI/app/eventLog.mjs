"use strict";
import * as _global from './definitions.mjs';
import * as _data from './Data.mjs';
export class event{
    constructor(tag,type,event){
        //console.log(_global.session_data.id);
        //this.type = event.eventType;
        this.tag = tag;
        this.type = type;
        this.id = _global.session_data.id+'.'+tag;
        this.event = event;
        this.date = new Date();
    }
    log(){
        _global.session_data.event_log.add(this);
        //event_log debug
        //console.log('logged event: ',this);
    }
}
export class event_log{
    constructor(){
        this.log = [];
    }
    add(event){
        this.log.push(event);
    }
    clear(){
        const element_list = _data.loadData("element_list","session");
        //console.log(element_list);
        for(let i=0;i<this.log.length;i++){
            const _card = 'log_info_card_'+(i+1);
            const _button = 'log_window_delete_event_'+(i+1)+'_button';
            if(element_list.includes(_button)){
                const loc = element_list.indexOf(_button);
                element_list.splice(loc,1);
            }
            if(element_list.includes(_card)){
                const loc = element_list.indexOf(_card);
                element_list.splice(loc,1);
            }
        }
        this.log = [];
        //console.log(element_list);
        _data.saveData("element_list",element_list,'session','eventlog:clear');
        _data.saveSession();
    }
    remove(event){
        const loc = this.log.indexOf(event);
        this.log.splice(loc,1);
    }
}
class past_event{
    constructor(){
        this.date = new Date();
        this.session_data = _global.session_data;
    }
}
window.addEventListener("beforeunload", function(e){
    const _pe = new past_event();
    let activity_data = [];
    const data = _data.loadData('activity_data','local');
    if(data!=undefined){
        activity_data = data;
    }
    activity_data.push(_pe);
    _data.saveData('activity_data',activity_data,'local');
 }, false);