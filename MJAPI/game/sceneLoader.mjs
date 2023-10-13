"use strict";
import { mainWindow } from '../app/UI.mjs';
import * as _data from '../app/Data.mjs';
import * as _global from '../app/definitions.mjs';
import { updateText,changeLang } from '../app/textLabels.mjs';
export class sceneLoader{
    constructor(){
        this.window = _global._mainWindow;
    }
    loading(tag,target,exec){
        if(exec==undefined){exec=function(){console.log('no loader exec.');}}
        this.tag = tag;
        this.currentScene = 'loading';
        const LW = this.window;
        LW.empty();
        const sw = LW.addWindow('screen_wrapper');
        sw.style.height='inherit';
        const sub = LW.addElement('div','loading_screen','UIScene');
        sub.style.backgroundColor='black';
        sub.style.color='beige';
        sub.style.width=window.screen.width;
        sub.style.height='100vh';
        LW.addBreak(10,sub);
        LW.addElement('h1','loading_text','ui-text','Loading',sub);
        console.log('test');
        switch(target){
            case 'title':
                console.log('case: title');
                execute();
                this.title();
                break;
            case 'startmenu':
                console.log('case: startmenu');
                execute();
                this.startmenu('startmenu');
                updateText();
                break;
            case 'setup':
                console.log('case: setup');
                execute();
                this.setup();
                break;
            case 'mainapp':
                console.log('case: mainapp');
                execute();
                this.mainapp();
                break;
            default:
                console.log('invalid target');
                break;
        }
        function execute(){
            exec();
        }
    }
    title(tag){
        this.tag = tag;
        this.currentScene = 'intro';
        const LW = this.window;
        const _self = this;
        LW.empty();
        const sw = LW.addWindow('screen_wrapper');
        sw.style.height='inherit';
        const sub = LW.addElement('div','title_screen','UIScene');
        //main content
        sub.style.backgroundColor='#e88f6cce';
        sub.style.color='black';
        sub.style.width=window.screen.width;
        sub.style.height='100vh';
        LW.addBreak(3,sub);
        LW.addElement('h1','main_title','ui-text','TITLE TEST',sub);
        LW.addBreak(15,sub);
        LW.addElement('p','title_text','ui-text','placeholder',sub);
        function next(){
            _self.loading('intro','startmenu');
        }
        sub.onclick = function(){next();};
        sub.onkeydown = function(){next();};
        sub.ontouchstart = function(){next();};
        document.oncontextmenu = function(){return false;};
        //debug text (onscreen)
        if(document.getElementById('debuginfo')){
            document.getElementById('debuginfo').remove();
        }
        const b_txt = LW.addElement('p','debuginfo','ui-text','DEBUGINFO',document.body);
        b_txt.style.left='1%';
        b_txt.style.textAlign='right';
        b_txt.style.color='white';
        b_txt.style.position='absolute';
        //
        updateText();        
    }
    startmenu(tag){
        const settings = _data.loadSettings('session');
        console.log(settings.globalSettings.AUTOLOAD,'autoload');
        this.tag = tag;
        this.currentScene = 'startmenu';
        const LW = this.window;
        LW.empty();
        const sw = LW.addWindow('screen_wrapper');
        sw.style.height='inherit';
        const sub = LW.addElement('div','startmenu_screen','UIScene');
        //main content
        sub.style.backgroundColor='rgb(219, 198, 163)';
        sub.style.color='black';
        sub.style.width=window.screen.width;
        sub.style.height='100vh';
        let _self = this;
        console.log(this);
        LW.addBreak(3,sub);
        LW.addElement('h1','main_title','ui-text','TITLE TEST',sub);
        LW.addElement('h3','main_subtitle','ui-text','SUBTITLE TEST',sub);
        LW.addBreak(5,sub);
        //newgame button
        const ngb = LW.addButton('newgame_button',function(){
            _self.loading('newgame','setup');
        },'mainmenu',sub);
        LW.addBreak(1,sub);
        //loadgame button
        const lgb = LW.addButton('loadgame_button',function(){
            if(document.getElementById('loadgame_screen')){
                document.getElementById('loadgame_screen').remove();
            }
            const sub = LW.addElement('div','loadgame_screen','mainUI-window');
            LW.addElement('h1','loadgame_ui_title','ui-text','Load Game:',sub);
            LW.addBreak(1,sub);
            for(let i=0;i<settings.player;i++){
                const lgcard = LW.addElement('div','loadgame_card','app-window',undefined,sub);

            };
            LW.addButton('close_button',function(){
                document.getElementById('loadgame_screen').remove();

            },'mainmenu',sub);
            updateText();
        },'mainmenu',sub);
        LW.addBreak(1,sub);
        //settings button
        const stb = LW.addButton('settings_button',function(){
            if(document.getElementById('settings_screen')){
                document.getElementById('settings_screen').remove();
            }
            //const settings = loadSettings('session');
            const sub = LW.addElement('div','settings_screen','mainUI-window');
            LW.addElement('h1','settings_ui_title','ui-text','Settings',sub);
            const dsub_1 = LW.addElement('form','autoload_window','app-window',undefined,sub);
            LW.addInput('autoload_box','checkbox',false,'Autoload: ',dsub_1);
            if(settings.globalSettings.AUTOLOAD){
                document.getElementById('autoload_box_field').checked = true;
            }else{
                document.getElementById('autoload_box_field').checked = false;
            }
            const dsub_2 = LW.addElement('form','audio_window','app-window',undefined,sub);
            const au = LW.addInput('audiomute_box','checkbox',false,'Mute audio: ',dsub_2);
            const dsub_3 = LW.addElement('form','lang_window','app-window',undefined,sub);
            LW.addElement('p','langselect_label','ui-text','Select language:',dsub_3);
            const enus = LW.addInput('lang_enus','radio',false,'en-US',dsub_3,'lang_check');
            const nl = LW.addInput('lang_nl','radio',false,'NL',dsub_3,'lang_check');
            LW.addBreak(2,sub);
            if(settings.globalSettings.user_lang.toLowerCase()==document.getElementById('lang_enus_label').innerText.toLowerCase()){
                document.getElementById('lang_enus_field').checked = true;      
            }else if(settings.globalSettings.user_lang.toLowerCase()==document.getElementById('lang_nls_label').innerText.toLowerCase()){
                document.getElementById('lang_nls_field').checked = true;
            }
            const cbtn = LW.addButton('cancel_button',function(){
                document.getElementById('settings_screen').remove();
            },'mainmenu',sub);
            const ssbtn = LW.addButton('save_settings_button',function(){     
                if(document.getElementById('autoload_box_field').checked){  
                    //settings.globalSettings.AUTOLOAD = true;
                    autoLoad(true);
                }else{
                    //settings.globalSettings.AUTOLOAD = false;
                    autoLoad(false); 
                }
                const lang_check = document.getElementsByName('lang_check');
                for(let radio of lang_check){
                    if(radio.checked){
                        changeLang(false,radio.value);
                    }
                }    
                //saveData('gameSettings',settings,'session','mainmenu');       
                _self.loading('reload-settings','startmenu');
                document.getElementById('settings_screen').remove();
                updateText();
            },'mainmenu',sub);
            cbtn.style.width = '40%';
            ssbtn.style.width = '40%';
            updateText();
        },'mainmenu',sub);
        LW.addBreak(1,sub);
        //quit game
        const qgb = LW.addButton('quit_button',function(){
            errorPopup('Goodbye','This will close the game,<br> are you sure?','',function(){
                window.close();
            });
        },'mainmenu',sub);
        ngb.style.width='30%';
        ngb.style.backgroundColor='rgba(0, 0, 0, 0.115)';
        lgb.style.width='30%';
        lgb.style.backgroundColor='rgba(0, 0, 0, 0.115)';
        stb.style.width='30%';
        stb.style.backgroundColor='rgba(0, 0, 0, 0.115)';
        qgb.style.width='30%';
        qgb.style.backgroundColor='rgba(0, 0, 0, 0.115)';
        
    }
    setup(tag){
        const settings = _data.loadSettings('session');
        console.log(settings.globalSettings.AUTOLOAD,'autoload');
        console.log('setup');
        this.tag = tag;
        this.currentScene = 'setup';
        const LW = this.window;
        const _self = this;
        LW.empty();
        const sw = LW.addWindow('screen_wrapper');
        sw.style.height='inherit';
        const sub = LW.addElement('div','setup_screen','UIScene');
        //main content
        
        updateText();
    }
    mainapp(tag){
        const set = _data.loadSettings('session');
        console.log(set.globalSettings.AUTOLOAD);
        const settings = autoLoad(set.globalSettings.AUTOLOAD);
        console.log('mainapp');
        this.tag = tag;
        this.currentScene = 'mainapp';
        const LW = this.window;
        const _self = this;
        LW.empty();
        const sw = LW.addWindow('screen_wrapper');
        sw.style.height='inherit';
        const sub = LW.addElement('div','mainapp_screen','UIScene');
        //main content

        updateText();
    }
}