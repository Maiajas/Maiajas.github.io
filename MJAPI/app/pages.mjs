"use strict";
import * as _global from './definitions.mjs';
const MW = _global._mainWindow;
export function home(){
    MW.empty();
    const sub = MW.addElement('div','app_window','app-window');
    const _self = this;
    //main content
    MW.addElement('h2','home_title','ui-text','HOME PAGE',sub);
    MW.addButton('start',function(){
        _self.load('test');
    },'mainmenu',sub);
    MW.addBreak(3,sub);
    MW.addButton('next',function(){
        _self.load('about');
    },'mainmenu',sub);
    MW.addBreak(3,sub);
    MW.addButton('stop',function(){
        MW.empty();
    },'mainmenu',sub);
}
export function about(){
    MW.empty();
    const sub = MW.addElement('div','app_window','app-window');
    const _self = this;
    //main content
    MW.addElement('h1','about-title','ui-text','ABOUT PAGE',sub);
}
export function error(){
    MW.empty();
    const sub = MW.addElement('div','app_window','app-window');
    const _self = this;
    //main content
    MW.addElement('h1','about-title','ui-text','ERROR PAGE',sub);
}