"use strict";
import * as _global from './definitions.mjs';
import {event} from './eventLog.mjs';
import {pageBrowser} from './browseApp.mjs';

class debugMenu{
    constructor(){
        this.window=_global._mainWindow;
    }
    open(){
        const _self = this;
        this.subwindow = this.window.addElement('div','debug_menu',['mainUI-window']);
        this.window.addElement('h3','debug_menu_title_text',['ui-title','ro-text'],undefined,this.subwindow);
        this.window.addButton('navbar_test1',()=>{
            pageBrowser.load('xfytjh');            
        },'mainUI',this.subwindow);
        this.window.addButton('navbar_test2',()=>{
            const target = document.getElementById('app_window');
            const css = {
                "height":"80vh",
                "background":"none"
            };
            _self.window.addCSS(css,target);
        },'mainUI',this.subwindow);
        this.window.addButton('navbar_test3',()=>{
            _global._themeDB.applyTheme('default');
        },'mainUI',this.subwindow);
        this.window.addButton('debug_navigator',()=>{
            const _nav = window.navigator;
            const getnav = new event('debug-01','debug',_nav).log();
            console.log(_nav);
        },'mainUI',this.subwindow);
        this.window.addButton('debug_location',()=>{
            const loc_get=(e)=>{
                console.log(e);
            }
            const loc_fail=(e)=>{
                console.log(e);
            }
            navigator.geolocation.getCurrentPosition(loc_get,loc_fail);
        },'mainUI',this.subwindow);
        this.window.addButton('close',()=>{
            _self.subwindow.remove();
        },'mainmenu',this.subwindow);
    }
}
export const _dbMenu = new debugMenu();