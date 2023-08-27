"use strict";
import { createElement,fetchJSON,loadData } from "./func.mjs";
export class Activity{
    constructor(name,duration,type,description){
        this.name = name;
        this.duration = duration;
        this.type = type;
        this.description = description;
        this.completed = false;
    }
}
export class Schedule{
    constructor(name,username,dailytime,description){
        this.activities = [];
        this.name = name;
        this.username = username;
        this.dailytime = dailytime;
        this.description = description;
        this.usedtime = 0;
        this.counter = 0;
    }
    add(activity){
        this.counter=(this.counter+activity.duration);
        if(this.counter<this.dailytime){
            console.log('counter',this.counter);
            console.log('usedtime',this.usedtime);
            console.log('activity.duration',activity.duration);
            console.log('dailytime',this.dailytime);
            this.usedtime=(this.usedtime+activity.duration);
            this.activities.push(activity);
            console.log("pushing activity:",activity);
        }else{
            console.log("schedule is full.");
        }
    }
}
export class mainWindow{
    constructor(id,eclass){
        let dclass;
        if(eclass==undefined){
            dclass='main-window';
        }else{
            dclass=eclass;
        }
        const mainwindow = createElement('div',id,dclass,'',true);
        this.mainwindow = mainwindow;
        this.subelements = [];
    }
    addFromTemplate(eurl,ename){
        const template = fetchJSON(eurl,ename);
        console.log(template);
        const tm = loadData(ename,"local");
        console.log(tm.elements[0]);
        const subwindow = createElement(tm.elements[0],tm.id[0],tm.class[0],'',true);
        subwindow.style.position = "absolute";
        subwindow.style.left = '20%';
        subwindow.style.top = '10%';
        subwindow.style.zIndex = '2';
        subwindow.style.margin = '0';
        //subwindow.popup('20%','10%');
        for(let i=1;i<tm.elements.length;i++){
            console.log('use template');
            const screen = createElement(tm.elements[i],tm.id[i],tm.class[i],subwindow,false);
        }
        this.subwindow = subwindow;
    }
    popup(top,left){
        this.mainwindow.style.position = 'absolute';
        this.mainwindow.style.left = left;
        this.mainwindow.style.top = top;
        this.mainwindow.style.zIndex = '2';
        this.mainwindow.style.margin = '0';
    }
    addWindow(id,type){
        if(type==undefined){type='div';};
        const subwindow = createElement(type,id,'sub-window',this.mainwindow,false);
        this.subwindow = subwindow;
    }
    addElement(etype,eid,eclass,econtent,etarget){
        let target;
        if(etarget!=undefined){
            target = etarget;
        }else{
            target = this.subwindow;
        }
        const subelement = createElement(etype,eid,eclass,target,false);
        if(econtent!=undefined){
            subelement.innerHTML = econtent;
        }
        this.subelements.push(subelement);
    }
    addButton(id,click,type){    
        if(type==undefined){
            type = "nav";
        }
        const subelement = createElement('button',id,type+'Button',this.subwindow,false);
        subelement.onclick = click;
        this.subelements.push(subelement);
    }
    addCreationButton(id,click){
        const subelement = createElement('button','create_'+id+'_button','creation-button',this.subwindow,false);
        subelement.onclick = click;
        this.subelements.push(subelement);
    }
    addInput(id,type){
        const labelID = id+"_label";
        const fieldID = id+"_field";
        const subLabel = createElement('label',labelID,'input-label',this.subwindow,false);
        const subInput = createElement('input',fieldID,'input-field',this.subwindow,false);        
        subLabel.for = fieldID;
        subInput.type = type;
        subInput.required = true;
        this.subelements.push(subLabel);
        this.subelements.push(subInput);
    }
    addBreak(nr){
        for(let i=0;i<nr;i++){
            const _break = createElement('br','html_break','html-break',this.subwindow,false);
            this.subelements.push(_break);
        }
    }
    empty(){
        this.mainwindow.replaceChildren();
    }
    delete(){
        this.mainwindow.remove();
    }
}
export class navBar{
    constructor(){
        this.navBar = createElement("div","home-main-topbar","navbar","",true);
        this.subelements = [];
    }
    addLangButton(lang){
        const subElement = createElement("button",'lang-'+lang,"langselect",this.navBar,false);
        subElement.innerHTML = lang.toUpperCase();        
        this.subelements.push(subElement);
    }
    addNavButton(id){
        const subElement = createElement("button",id,"navBarButton",this.navBar,false);
        this.subelements.push(subElement);
    }
    addDivider(){
        const subElement = createElement("p","nav-divider","ro-text",this.navBar,false);
        subElement.innerHTML = "/";
        this.subelements.push(subElement);
    }
    addMenu(){
        const subElement = document.createElement('div');
        subElement.id = "nav-menu";
        subElement.style.display = 'inline';
        subElement.left = '0';
        subElement.position = 'absolute';
        subElement.classList.add("navbar-menu");
        this.navBar.insertBefore(subElement,this.navBar.firstChild);
        this.navBar.Menu = subElement;
    }
    addMenuButton(id){
        const subElement = createElement("button",id,"navBarButton",this.navBar.Menu,false);

    }
}
export class practiceSession{
    constructor(dailytime){
        this.dailytime;
        this.activities = [];
    }
}