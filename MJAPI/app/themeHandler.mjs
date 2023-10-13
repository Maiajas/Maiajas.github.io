"use strict";
import * as _global from './definitions.mjs';
import * as _data from './Data.mjs';
class theme{
    constructor(name,mtx,ttx,mbg,awbg,uiwbg,btntx,btnbg){
        this.name = name;
        this.window = _global._mainWindow;
        this.element_list = _data.loadData('element_list','session');
        this.color_list = [
            "UIBgClNo",
            "UIBgClA0",
            "UIBgClW",
            "UIBgClB",
            "UIBgClc4ffcc59",
            "UIBgCl201b038b",
            "UIBgCl6d6b62c1",
            "UIBgCl464646c1",
            "UIBgCle6ad9dd2",
            "UIBgCl6b4940b0",
            "UIBgCl2014038b",
            "UIBgClFFCDD28b",
            "UItxClB",
            "UItxClR",
            "UItxClGr",
            "UIBgClaw"
        ];
        this.theme = {};
        this.theme.mainTxt=mtx;
        this.theme.titleTxt=ttx;
        this.theme.mainBg=mbg;
        this.theme.appBg=awbg;
        this.theme.uiWindow=uiwbg;
        this.theme.btnTxt=btntx;
        this.theme.btnBg=btnbg;
    }
    apply(){
        //console.log(1);
        //console.log(this.element_list);
        const rel_elem = {};
        rel_elem.btns=[];
        rel_elem.wins={};
        rel_elem.wins.app=[];
        rel_elem.wins.ui=[];
        rel_elem.text={};
        rel_elem.text.main=[];
        rel_elem.text.title=[];
        for(let i=0;i<this.element_list.length;i++){
            //console.log(2);
            for(let x=0;x<this.color_list.length;x++){
                //console.log(3);
                if(document.getElementById(this.element_list[i]).classList){ 
                    //console.log(4);
                    const list = document.getElementById(this.element_list[i]).classList;
                    if(list.toString().includes(this.color_list[x])){
                        const tar = document.getElementById(this.element_list[i]);
                        const update_list=(tar)=>{
                            const class_keys = Object.keys(_global.class_list);
                            for(let a=0;a<class_keys.length;a++){
                                if(_global.class_list[class_keys[a]].includes(this.color_list[x])){
                                    const val = Object.values(_global.class_list[class_keys[a]]);
                                    const loc = val.indexOf(this.color_list[x]);
                                    _global.class_list[class_keys[a]].splice(loc,1,tar);
                                }
                            }
                        }
                        if(tar.id.includes('button')){
                            console.log(tar);
                            rel_elem.btns.push(tar);
                        }
                        if(tar.id.includes('window')){
                            console.log(tar);
                            if(tar.id.includes('app')){
                                tar.classList.replace(this.color_list[x],this.theme.appBg);
                                update_list(this.theme.appBg);
                                rel_elem.wins.app.push(tar);
                            }else if(tar.id.includes('UI')){
                                rel_elem.wins.ui.push(tar);
                            }
                        }
                        if(tar.id.includes('text')){
                            console.log(tar);
                            if(tar.id.includes('main')){
                                tar.classList.replace(this.color_list[x],this.theme.mainTxt);
                                update_list(this.theme.mainTxt);
                                rel_elem.text.main.push(tar);
                            }else if(tar.id.includes('title')){
                                tar.classList.replace(this.color_list[x],this.theme.titleTxt);
                                update_list(this.theme.titleTxt);
                                rel_elem.text.title.push(tar);
                            }
                        }
                    }
                }
            }
        }
        console.log(rel_elem);
    }
}
export class themeDB{
    constructor(){
        this.DB = [];
        this.currentTheme = new theme();
    }
    setCurrent(theme){
        if(this.DB.includes(theme)){
            this.currentTheme = theme;
            this.currentTheme.apply();
        }else{
            
        }
    }
    addTheme(theme){
        if(!this.DB.includes(theme)){
            this.DB.push(theme);
        }else{

        }
    }
    removeTheme(theme){
        if(this.DB.includes(theme)){
            const loc = this.DB.indexOf(theme);
            this.DB.splice(loc,0);
        }else{
            
        }
    }
    createTheme(name,mtx,ttx,mbg,awbg,uiwbg,btntx,btnbg){
        const _new = new theme(name,mtx,ttx,mbg,awbg,uiwbg,btntx,btnbg);
        if(!this.DB.includes(_new)){
            this.DB.push(_new);
        }else{

        }
    }
    applyTheme(name){
        for(let i=0;i<this.DB.length;i++){
            if(this.DB[i].name==name){
                this.setCurrent(this.DB[i]);
            }
        }
    }
}