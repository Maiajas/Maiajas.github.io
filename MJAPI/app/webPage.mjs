"use strict";
import * as _global from './definitions.mjs';
import {logError} from './errorHandler.mjs';
import {event} from './eventLog.mjs';

class webPage{
    constructor(tag,title,type,description,content,searchTags){
        this.window = _global._mainWindow;
        this.tag = tag;
        this.title = title;
        this.type = type;
        this.content = content;
        this.content.description = description;
        this.searchTags = searchTags;
    }
}
export class webPages{
    constructor(){
        this.page_list = {};
        this.currentPage;
    }
    create(type,customContent){
        try{
            //type templates
            const content = {};
            let title;
            let tag;
            let description;
            let searchTags;
            //homepage
            if(type=='home'){
                const elem = [
                    {
                        "type":"h2",
                        "id":"home_title_text",
                        "class":['ui-title','ro-text']
                    },
                    {
                        "type":"p",
                        "id":"home_main_text",
                        "class":['ui-text']
                    },
                    {
                        "type":"br",
                        "amount":2
                    },
                    {
                        "type":"button",
                        "id":"log",
                        "click":function(){
                            const LW = _global._mainWindow.addElement('div','log_window',['mainUI-window']);
                            _global._mainWindow.addButton('log_window_close_top',function(){
                                LW.remove();
                            },'topClose',LW,undefined,'L');
                            _global._mainWindow.addElement('h3','log_window_title_text',['ro-text','ui-text'],undefined,LW);
                            _global._mainWindow.addButton('log_window_clear',function(){
                                _global.session_data.event_log.clear();
                                console.log(_global.session_data.event_log);
                                LW.remove();
                            },'mainmenu',LW);
                            for(let i=0;i<_global.session_data.event_log.log.length;i++){
                                const AC = _global._mainWindow.addElement('div','log_info_card_'+(i+1),['event-card'],undefined,LW);
                                AC.onclick=function(){
                                    _global.session_data.event_log.remove(_global.session_data.event_log.log[i]);
                                    console.log(_global.session_data.event_log);
                                    AC.remove();
                                };
                                _global._mainWindow.addBreak(1,AC);
                                AC.innerHTML+=i+':'+_global.session_data.event_log.log[i].tag;
                                _global._mainWindow.addBreak(1,AC);
                                AC.innerHTML+=_global.session_data.event_log.log[i].date;
                                _global._mainWindow.addBreak(1,AC);
                                AC.innerHTML+=_global.session_data.event_log.log[i].id;
                                _global._mainWindow.addBreak(1,AC);
                                AC.innerHTML+=_global.session_data.event_log.log[i].event;
                                _global._mainWindow.addBreak(2,AC);
                            }
                            _global._mainWindow.addButton('log_window_close_bottom',function(){
                                LW.remove();
                            },'mainmenu',LW);
                            //updateText();
                        }
                    }
                ];
                content.elem = elem;
                tag = 'homePage';
                searchTags = ['homePage','home','index'];
                title = 'Home';
                description = 'the homepage';
            }
            if(type=='applist'){
                const elem = [
                    {
                        "type":"h2",
                        "id":"applist_title_text",
                        "class":['ui-title','ro-text']
                    },
                    {
                        "type":"p",
                        "id":"applist_main_text",
                        "class":['ui-text']
                    }
                ];
                content.elem = elem;
                tag = 'appListPage';
                searchTags = ['appListPage','applist','apps','list','app'];
                title = 'App List';
                description = 'a page with a portfolio of all apps.';
            }
            if(type=='about'){
                const elem = [
                    {
                        "type":"h2",
                        "id":"about_title_text",
                        "class":['ui-title','ro-text']
                    },
                    {
                        "type":"p",
                        "id":"about_main_text",
                        "class":['ui-text']
                    },
                    {
                        "type":"br",
                        "amount":10
                    }
                ];
                content.elem = elem;
                tag = 'aboutPage';
                searchTags = ['aboutPage','about','author'];
                title = 'About';
                description = 'author information page.';
            }
            if(type=='error-generic'){
                const elem = [
                    {
                        "type":"h2",
                        "id":"error_generic_title_text",
                        "class":['ui-title','ro-text']
                    },
                    {
                        "type":"p",
                        "id":"error_generic_main_text",
                        "class":['ui-text']
                    }
                ];
                content.elem = elem;
                tag = 'errorPage';
                searchTags = [];
                title = 'Error [Generic]';
                description = 'generic error page.';
            }
            //create page
            const _new = new webPage(tag,title,type,description,content,searchTags);
            this.page_list[tag] = _new;
            //log event
            const _event = new event('webpage.create','page_creation','webpage created:'+title);
            _event.log();
        }catch(e){
            logError('WPCF','page_creation',e.message);
        }
    }
    remove(tag){
        const _tar = this.page_list[tag];
        delete this.page_list[_tar];
    }
    load(tag){
        this.currentPage = this.page_list[tag];
        const _window = this.currentPage.window;
        _window.empty();
        const _target = _window.addElement('div','app_window',['app-window']);
        //load
        const elem = this.currentPage.content.elem;
        for(let i=0;i<elem.length;i++){
            //console.log('adding element:',elem[i].type);
            if(elem[i].type!='button'&&elem[i].type!='br'&&elem[i].type!='input'){
                _window.addElement(elem[i].type,elem[i].id,elem[i].class,undefined,_target);
            }
            if(elem[i].type=='button'){
                _window.addButton(elem[i].id,elem[i].click,'mainUI',_target);
            }
            if(elem[i].type=='br'){
                _window.addBreak(elem[i].amount,_target);
            }
            if(elem[i].type=='input'){
                _window.addInput(elem[i].id,elem[i].type,elem[i].req,elem[i].label,_target,elem[i].name,elem[i].style);
            }
        }        
        document.querySelector('title').innerText = this.currentPage.title+' - '+_global.APP_NAME;
    }
}