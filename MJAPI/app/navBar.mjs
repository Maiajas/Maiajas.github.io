"use strict";
import {mainWindow} from './UI.mjs';
import {getRect} from './getRect.mjs';
import {searchApp} from './search.mjs';
export class navBar{
    constructor(){
        this.window = new mainWindow('navbar_wrapper',['navbar-wrapper']);
        this.navbar = this.window.addElement('div','navbar',['navbar']); 
        this.button_list = {};
    }
    addButton(id,click,LR){
        const _new = this.window.addButton(id,click,'navbar',this.navbar,undefined,LR)
        const newBtn = {};
        newBtn.tag = id;
        newBtn.elem = _new;
        this.button_list[newBtn.tag] = newBtn;
    }
    searchBar(){
        const _self = this;
        const rect = getRect(this.navbar);
        this.window.toggleWindow('navbar_searchBar',true);
        const SB = this.window.addElement('div','navbar_searchBar',['navbar-searchBar']);
        this.searchbar = SB;
        SB.style.top = (rect.top+rect.height)+'px';
        SB.style.left = (rect.left+20)+'px';
        SB.style.width = (rect.width-30)+'px';
        this.window.addButton('navbar_searchBar_close',function(){
            SB.remove();
            _self.window.toggleWindow('search_card_container',false);
        },'navbar',SB,'X','L');
        const QF = this.window.addInput('navbar_search','text',false,'',SB,'navbar_search',{"width":'70%',"height":'inherit',"type":"searchbox"},3);
        QF.input.onkeydown=(e)=>{
            if(e.key=="Enter"){
                searchApp(QF.input.value,_self);
            }
            if(e.key=="Escape"){
                SB.remove();
                _self.window.toggleWindow('search_card_container',false);
            }
        };
        this.window.addButton('navbar_searchBar_search',function(){
            searchApp(QF.input.value,_self);
        },'navbar',SB,undefined,'R');
    }
    popupMenu(tag,content){
        const active_button = this.button_list[tag].elem;
        const rect = getRect(active_button);
        this.window.toggleWindow('navbar_popup');
        this.popup = this.window.addElement('div','navbar_popup',['menu-popup'],undefined);
        this.popup.style.top = (rect.y+(rect.height*1.1))+'px';
        this.popup.style.left = (rect.x-(rect.width*0.4))+'px';
        content();
    }
}