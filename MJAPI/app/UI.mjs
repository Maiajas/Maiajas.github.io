"use strict";
import * as _data from './Data.mjs';
import {updateText} from './textLabels.mjs';
import {logError} from './errorHandler.mjs';
import {event} from './eventLog.mjs';
import { addClass } from './addClass.mjs';
function createElement(type,newid,newclass,target,body){
    const newElement = document.createElement(type);
    if(newid!='html_break'){
        newElement.id = newid;
    }
    //console.log(newclass);
    addClass(newclass,newElement);
    //newElement.classList.add(newclass);
    let element_id = [];
    let element_list = _data.loadData("element_list","session");
    if(element_list!=undefined){
        //console.log(element_list);
        for(let i=0;i<element_list.length;i++){
            let checker = element_list.includes(newid);
            if(!checker){
                //console.log(newid," not present, pushing.")
                element_list.push(newid);
                _data.saveData("element_list",element_list,'session','element_list:new id');
            }else{
                //console.log(newid," already in list.")
            }
        }
    }else{
        //console.log("no localstorage present");
        element_id.push(newid);
        _data.saveData("element_list",element_id,'session','element_list:no localstorage');
    }
    //console.log(newElement);
    //const currentElement = document.getElementsByClassName(target);
    if(body){
        const targetEl = document.body.insertBefore(newElement,document.body.firstChild);
    }else{
        const targetEl = target.appendChild(newElement);
    }
    return newElement;
} 
class mainWindow{
    constructor(id,eclass){
        let dclass;
        if(eclass==undefined){
            dclass='main-window';
        }else{
            dclass=eclass;
        }
        this.mainwindow = createElement('div',id,[dclass],'',true);
        this.subelements = [];
    }
    addFromTemplate(eurl,ename){
        const template = fetchJSON(eurl,ename);
        //console.log(template);
        const tm = loadData(ename,"local");
        //console.log(tm.elements[0]);
        const subwindow = createElement(tm.elements[0],tm.id[0],[tm.class[0]],'',true);
        subwindow.style.position = "absolute";
        subwindow.style.left = '20%';
        subwindow.style.top = '10%';
        subwindow.style.zIndex = '2';
        subwindow.style.margin = '0';
        //subwindow.popup('20%','10%');
        for(let i=1;i<tm.elements.length;i++){
            //console.log('use template');
            const screen = createElement(tm.elements[i],tm.id[i],[tm.class[i]],subwindow,false);
        }
        this.subwindow = subwindow;
    }
    popup(top,left){
        this.mainwindow.style.position = 'absolute';
        this.mainwindow.style.left = left;
        this.mainwindow.style.top = top;
        this.mainwindow.style.zIndex = '100';
        this.mainwindow.style.margin = '0';
        this.mainwindow.classList.add('popup-window');
    }
    addCSS(style,etarget){
        let target;
        if(etarget!=undefined){
            target = etarget;
        }else{
            if(this.subwindow){
                target = this.subwindow;
            }else{
                target = this.mainwindow;
            }
        }
        const css = target.style;
        const css_styles = Object.keys(css);
        const style_key = Object.keys(style);
        const style_val = Object.values(style);
        for(let i=0;i<css_styles.length;i++){
            for(let d=0;d<style_key.length;d++){
                if(css_styles[i]==style_key[d]){
                    css[css_styles[i]]=style_val[d];
                }
            }
        }
    }
    addWindow(id,type){
        if(type==undefined){type='div';};
        const subwindow = createElement(type,id,['sub-window'],this.mainwindow,false);
        this.subwindow = subwindow;        
        this.pageLabel = id;
        return subwindow;
    }
    addElement(etype,eid,eclass,econtent,etarget){
        if(typeof eclass=="string"){
            eclass=[eclass];
        }
        let target;
        if(etarget!=undefined){
            target = etarget;
        }else{
            if(this.subwindow){
                target = this.subwindow;
            }else{
                target = this.mainwindow;
            }
        }
        //console.log(eclass);
        const subelement = createElement(etype,eid,eclass,target,false);
        if(econtent!=undefined){
            subelement.innerHTML = econtent;
        }
        this.subelements.push(subelement);
        updateText();
        return subelement;
    }
    addButton(id,click,type,etarget,label,LR){   
        const _self = this;
        id = id+"_button"; 
        const newclass = [type+'Button'];
        if(type==undefined){
            type = "nav";
        }
        let target;
        if(etarget!=undefined){
            target = etarget;
        }else{
            target = this.subwindow;
        }
        if(LR!=undefined){
            if(LR=='L'){
                newclass.push('navbarButtonLeft');
            }else if(LR=='R'){
                newclass.push('navbarButtonRight')
            }
        }
        const subelement = createElement('button',id,newclass,target,false);
        subelement.onclick = function(){
            try {
                click();
                const _click = new event(id+':'+_self.mainwindow.id,'buttonPress','buttonPress');
                _click.log();
            }
            catch(err){
                logError(err,'buttonPress',err.message);
            }
        }
        if(label!=undefined){
            subelement.innerHTML = label;
        }
        this.subelements.push(subelement);
        updateText();
        return subelement;
    }
    addCreationButton(id,click){
        const subelement = createElement('button','create_'+id+'_button',['creation-button'],this.subwindow,false);
        subelement.onclick = click;
        this.subelements.push(subelement);
    }
    addInput(id,type,req,label,target,name,style,minlength){
        if(target==undefined){
            target = this.subwindow;
        }
        const labelID = id+"_label";
        const fieldID = id+"_field";
        const subLabel = createElement('label',labelID,'input-label',target,false);
        const subInput = createElement('input',fieldID,'input-field',target,false);        
        subLabel.for = fieldID;
        if(label==undefined){
            label = '';
        }
        subLabel.innerText = label;
        subInput.type = type;
        if(type=='number'){
            subInput.min = 1;
            subInput.max = 4;
        }
        if(name==undefined){
            name=id;
        }
        subInput.name=name;
        if(type=='radio'){
            subInput.value=label;
        }
        if(req==undefined){
            req=true;
        }        
        subInput.required = req;
        subInput.style.padding = '0.5%';
        subInput.style.margin = '1%';
        if(style==undefined){
            subInput.style.width = '100px';
            subInput.style.height = 'inherit';
        }else{
            subInput.style.width = style.width.toString();
            subInput.style.height = style.height.toString();
            if(style.type=='searchbox'){
                subInput.style.background = 'linear-gradient(#000, #000) center bottom 1px /calc(100% - 5px) 1px no-repeat';
                subInput.style.border = 'none';   
                subInput.style.marginLeft = '6%';   
                subInput.style.marginRight = '6%';            
            }
        }
        if(minlength==undefined){
            minlength=1;
        }
        subInput.minlength = minlength;
        this.subelements.push(subLabel);
        this.subelements.push(subInput);
        const elements = {};
        elements.label = subLabel;
        elements.input = subInput;
        updateText();
        return elements;
    }
    addBreak(nr,target){
        if(target==undefined){
            target=this.subwindow;
        }
        for(let i=0;i<nr;i++){
            const _break = createElement('br','html_break',[''],target,false);
            this.subelements.push(_break);
        }
    }
    empty(){
        this.mainwindow.replaceChildren();
    }
    delete(){
        this.mainwindow.remove();
    }
    toggleWindow(target,toggle){
        if(toggle==undefined){toggle=true}
        if(toggle){
            if(document.getElementById(target)){
                document.getElementById(target).remove();
                document.getElementById(target).remove();
            }
        }else{
            if(document.getElementById(target)){
                document.getElementById(target).remove();
            }
        }
    }
}
function spawnUIWindow(id,content){
    const MW = _global._mainWindow;
    const SW = MW.addElement('div',id,['mainUI-window']);
    MW.addElement('h2',id+'_title_text',['ui-title','ro-text'],undefined,SW);
    content();
    MW.addButton('close',()=>{
        SW.remove();
    },'mainmenu',SW);
}
function errorPopup(title_text,main_text,error_code,action){
    if(document.getElementById('popup_wrapper')){
        document.getElementById('popup_wrapper').remove();
    }
    const pWindow = new mainWindow('popup_wrapper','popup-window');
    const popup = pWindow.addWindow('popup_window','div');
    pWindow.popup('15%','30%');
    pWindow.addElement('h1','popup_title','popup-text',title_text);
    pWindow.addElement('h3','popup_errorcode','popup-text',error_code);
    pWindow.addBreak(1);
    pWindow.addElement('p','popup_message','popup-text',main_text);
    pWindow.addBreak(3);
    if(action==undefined){
        action = function(){
            //console.log('no error action defined.');
        };
    }else{        
        pWindow.addButton('error_action_button',function(){
            action();
            pWindow.delete();
        },'errorAction',popup,'Yes, let me leave!');
    }
    pWindow.addButton('close_button',function(){
        pWindow.delete();
    },'close');
    updateText();
    return pWindow;
}
function createUIWindow(name,content){
    // create ui window from template object/array
    //  content[id,class,elements] 
    const uiWindow = new mainWindow(content.dat[0]+'_wrapper',content.dat[1]);
    uiWindow.addWindow(content.dat[0]+'_window');
    for(let i=0;i<(content.el.length);i++){
        if(content.el[i]==='br'){
            uiWindow.addBreak(1);
        }else if(content.el[i]==='btn'){
            uiWindow.addButton(content.btn.a[i]+'_button',content.btn.b[i],'mainmenu');
        }else if(content.el[i]==='ip'){
            uiWindow.addInput(content.dat[0]+'_'+content.el[i]+'_'+i,content.ip[i],content.ip[i+1],content.ip[i+2]);
        }else{
            uiWindow.addElement(content.el[i],content.dat[0]+'_'+content.el[i]+'_'+i,content.dat[0]+'-'+content.el[i]);
        }
    }
    updateText();
    return uiWindow;
}
class UICard{
    constructor(mainwindow,id){
        this.window = mainwindow;
        createElement('div',id,'ui-card',this.window,false);
        this.content = [];
    }
    addText(n_id,n_class){
        const _new = createElement('p',n_id,n_class,this.window,false);
        this.content.push(_new);
    }
    addTitle(n_id,n_class){
        const _new = createElement('h1',n_id,n_class,this.window,false);
        this.content.push(_new);
    }
    addButton(){
        
    }
}
export { createElement,mainWindow,errorPopup,createUIWindow,spawnUIWindow };