"use strict";
import * as _data from './Data.mjs';
import * as _global from './definitions.mjs';
async function changeLang(use_bl,ul){
    //console.log("changelang",1,_global.session_data);
    _data.loadSession("session",'changelang');
    //console.log("changelang",2,_global.session_data);
    if(use_bl){
        _global.session_data.global_settings.lang = _global.session_data.global_settings.browser_lang;
    }else{
        if(ul!=undefined){
            _global.session_data.global_settings.user_lang = ul;
        }
        _global.session_data.global_settings.lang = _global.session_data.global_settings.user_lang;
    }
    _data.saveSession('session');
    await updateText();    
    return;
}
async function updateText(){
    //console.log("Update text.");
    //console.log(_global.session_data,1);
    _data.loadSession("session",'textlabels');
    //console.log(_global.session_data,2);
    //const textLabels = await _data.loadData('textLabels','session');
    const textLabels = await _global.TEXT_LABELS;
    //console.log(_global.session_data.global_settings.lang);
    //console.log(textLabels);
    const element_list = await _data.loadData("element_list","session");
    //console.log(element_list);
    const lang = await _global.session_data.global_settings.lang.toLowerCase();
    let labels;
    let label_get;
    let label_list;
    if(textLabels.hasOwnProperty(lang)){
        label_get = textLabels[lang];
    }else{
        label_get = textLabels['en-us'];
        _global.session_data.global_settings.user_lang = 'en-US';
    }
    label_list = Object.keys(label_get);
    labels = Object.values(label_get);
    for(let i=0;i<element_list.length;i++){
        if(document.body.contains(document.getElementById(element_list[i]))){
            for(let d=0;d<label_list.length;d++){
                if(element_list[i]==label_list[d]){
                    document.getElementById(element_list[i]).innerText = labels[d];
                }
            }
        }
    }
    _data.saveSession('session','textLabels');
}
export {changeLang,updateText};