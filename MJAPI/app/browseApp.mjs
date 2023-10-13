"use strict";
import * as _global from './definitions.mjs';
import {navBar} from './navBar.mjs';
import {_dbMenu} from './debugMenu.mjs';
export class pageBrowser{
    constructor(){
        this.window = _global._mainWindow;
        const _self = this;
        //navbar 
        this.navbar = new navBar();
        this.navbar.addButton('navbar_home',()=>{
            _self.load('home');
        },'L');
        this.navbar.addButton('navbar_about',()=>{
            _self.load('about');            
        },'L');
        this.navbar.addButton('navbar_applist',()=>{
            _self.load('applist');            
        },'L');
        this.navbar.addButton('navbar_menu',()=>{
            //add popupmenu
            _self.navbar.popupMenu('navbar_menu',()=>{
                //popupmenu content
                _self.navbar.window.addButton('popup_language',()=>{
                    _self.navbar.popup.remove();
                },'mainmenu',_self.navbar.popup);
                _self.navbar.window.addButton('popup_debug_menu',()=>{
                    _self.navbar.popup.remove();
                    _dbMenu.open();
                },'mainmenu',_self.navbar.popup);
            });
        },'R');
        this.navbar.addButton('refresh',()=>{
            location.reload();         
        },'R');
        this.navbar.addButton('navbar_search',()=>{
            _self.navbar.searchBar();
        },'R');
        //
        this.pageTitle = document.querySelector('title');
    }
    load(target,code){
        if(code!=undefined){
            code();
        }
        switch (target){
            case 'home':
                _global.pageDB.load('homePage');   
                break;
            case 'about':
                _global.pageDB.load('aboutPage');   
                break;
            case 'applist':
                _global.pageDB.load('appListPage');   
                break;
            default:
                _global.pageDB.load('errorPage'); 
                break;
        }
    }
}