"use strict";
import { mainWindow } from "./class.mjs";
import { landingPage,autoLoad } from "./app.mjs";

function createElement(type,newid,newclass,target,body){
    const newElement = document.createElement(type);
    newElement.id = newid;
    newElement.classList.add(newclass);
    let element_id = [];
    let element_list = loadData("element_list","local");
    if(element_list!=undefined){
        //console.log("localstorage exists");
        //console.log(element_list);
        for(let i=0;i<element_list.length;i++){
            let checker = element_list.includes(newid);
            if(!checker){
                //console.log(newid," not present, pushing.")
                element_list.push(newid);
                saveData("element_list",element_list);
            }else{
                //console.log(newid," already in list.")
            }
        }
    }else{
        //console.log("no localstorage present");
        element_id.push(newid);
        saveData("element_list",element_id);
    }
    ////console.log(newElement);
    //const currentElement = document.getElementsByClassName(target);
    if(body){
        const targetEl = document.body.appendChild(newElement);
    }else{
        const targetEl = target.appendChild(newElement);
    }
    return newElement;
} 
async function getBasicInfo(){
    const basicinfo = window.navigator;
    return basicinfo;
}
async function getID(element){
    const id = element.id;
    //console.log(0,target,"getID");
    //console.log(1,element,"getID");
    return id;
}
async function changeLang(targetlang){
    const settings = await loadData("settings","session");
    //console.log(0,settings,"changelang");
    //console.log(1,targetlang,"changelang");
    settings.LANG = targetlang;
    //sessionStorage.setItem("settings",JSON.stringify(settings));
    saveData("settings",settings);
    updateText();    
    return;
}
async function updateText(){
    //console.log("Update text.");
    const settings = await loadData("settings","session");
    //console.log(0,settings,"updatetext");
    const textLabels = await loadData("textLabels","session");
    //console.log(1,textLabels,"updatetext");
    const element_id = await loadData("element_list","local");
    //console.log(2,element_id,"updatetext");
    let labels;
    if(settings.LANG=="EN"){
        labels = textLabels.EN;
    }else if(settings.LANG=="NL"){
        labels = textLabels.NL;
    }
    for(let i=0;i<element_id.length;i++){
        if(document.body.contains(document.getElementById(element_id[i]))){
            if(element_id[i]=='loading_window'){
                document.getElementById(element_id[i]).innerHTML = labels.WINDOW_LOADING;
            }
            if(element_id[i]=='title_landing'){
                document.getElementById('title_landing').innerHTML = labels.TITLE_LANDING;
            }
            if(element_id[i]=='title_loading'){
                document.getElementById('title_loading').innerHTML = labels.TITLE_LOADING;
            }
            if(element_id[i]=='title_setup'){
                document.getElementById('title_setup').innerHTML = labels.TITLE_SETUP;
            }
            if(element_id[i]=='title_mainapp'){
                document.getElementById('title_mainapp').innerHTML = labels.TITLE_MAINAPP;
            }
            if(element_id[i]=='error_text'){
                document.getElementById(element_id[i]).innerHTML = labels.WINDOW_ERROR;
            }
            if(element_id[i]=='continue_button'){
                document.getElementById(element_id[i]).innerHTML = labels.CONTINUE_BUTTON;
            }
            if(element_id[i]=='setup1_H1'){
                document.getElementById(element_id[i]).innerHTML = labels.H1_SETUP1;
            }
            if(element_id[i]=='setup1_P'){
                document.getElementById(element_id[i]).innerHTML = labels.P_SETUP1;
            }
            if(element_id[i]=='setup2_H2'){
                document.getElementById(element_id[i]).innerHTML = labels.H2_SETUP2;
            }
            if(element_id[i]=='setup2_H3'){
                document.getElementById(element_id[i]).innerHTML = labels.H3_SETUP2;
            }
            if(element_id[i]=='setup2_name_label'){
                document.getElementById(element_id[i]).innerHTML = labels.NAME_SETUP2;
            }
            if(element_id[i]=='setup2_activity_label'){
                document.getElementById(element_id[i]).innerHTML = labels.ACTIVITY_SETUP2;
            }
            if(element_id[i]=='setup2_description_label'){
                document.getElementById(element_id[i]).innerHTML = labels.DESCRIPTION_SETUP2;
            }
            if(element_id[i]=='setup3_H2'){
                document.getElementById(element_id[i]).innerHTML = labels.H2_SETUP3;
            }
            if(element_id[i]=='setup3_H3'){
                document.getElementById(element_id[i]).innerHTML = labels.H3_SETUP3;
            }
            if(element_id[i]=='setup3_P'){
                document.getElementById(element_id[i]).innerHTML = labels.P_SETUP3;
            }
            if(element_id[i]=='setup3_totalTime_label'){
                document.getElementById(element_id[i]).innerHTML = labels.TOTALTIME_SETUP3;
            }
            if(element_id[i]=='setup4_H2'){
                document.getElementById(element_id[i]).innerHTML = labels.H2_SETUP4;
            }
            if(element_id[i]=='setup4_H3'){
                document.getElementById(element_id[i]).innerHTML = labels.H3_SETUP4;
            }
            if(element_id[i]=='setup4_P'){
                document.getElementById(element_id[i]).innerHTML = labels.P_SETUP4;
            }
            if(element_id[i]=='newactivity_H2'){
                document.getElementById(element_id[i]).innerHTML = labels.ACTIVITY_H2_SETUP4;
            }
            if(element_id[i]=='s4_activity_name_label'){
                document.getElementById(element_id[i]).innerHTML = labels.ACTIVITY_NAME_SETUP4;
            }
            if(element_id[i]=='s4_activity_time_label'){
                document.getElementById(element_id[i]).innerHTML = labels.ACTIVITY_TIME_SETUP4;
            }
            if(element_id[i]=='s4_activity_type_label'){
                document.getElementById(element_id[i]).innerHTML = labels.ACTIVITY_TYPE_SETUP4;
            }
            if(element_id[i]=='s4_activity_description_label'){
                document.getElementById(element_id[i]).innerHTML = labels.ACTIVITY_DESCRIPTION_SETUP4;
            }
            if(element_id[i]=='setup_button'){
                document.getElementById(element_id[i]).innerHTML = labels.SETUP_BUTTON;
            }
            if(element_id[i]=='back_button'){
                document.getElementById(element_id[i]).innerHTML = labels.BACK_BUTTON;
            }
            if(element_id[i]=='next_button'){
                document.getElementById(element_id[i]).innerHTML = labels.NEXT_BUTTON;
            }
            if(element_id[i]=='cancel_button'){
                document.getElementById(element_id[i]).innerHTML = labels.CANCEL_BUTTON;
            }
            if(element_id[i]=='confirm_button'){
                document.getElementById(element_id[i]).innerHTML = labels.CONFIRM_BUTTON;
            }
            if(element_id[i]=='close_button'){
                document.getElementById(element_id[i]).innerHTML = labels.CLOSE_BUTTON;
            }
            if(element_id[i]=='load_backup_button'){
                document.getElementById(element_id[i]).innerHTML = labels.LOAD_BACKUP_BUTTON;
            }
            if(element_id[i]=='activity_setup_error_title'){
                document.getElementById(element_id[i]).innerHTML = labels.ERROR_ACTIVITY_POPUP_TITLE;
            }
            if(element_id[i]=='activity_setup_error_text'){
                document.getElementById(element_id[i]).innerHTML = labels.ERROR_ACTIVITY_POPUP_TEXT;
            }
            if(element_id[i]=='loader_error_title'){
                document.getElementById(element_id[i]).innerHTML = labels.ERROR_LOADER_POPUP_TITLE;
            }
            if(element_id[i]=='loader_error_text'){
                document.getElementById(element_id[i]).innerHTML = labels.ERROR_LOADER_POPUP_TEXT;
            }
            if(element_id[i]=='footer'){
                document.getElementById(element_id[i]).innerHTML = labels.FOOTER_TEXT+'v'+settings.VERSION;
            }
            if(element_id[i]=='setup_page1_title'){
                document.getElementById(element_id[i]).innerHTML = labels.H1_SETUP1;
            }
            if(element_id[i]=='setup_page1_Text'){
                document.getElementById(element_id[i]).innerHTML = labels.P_SETUP1;
            }
        }
    }
}
async function fetchJSON(targetFile,label,target){
    const response = await fetch(targetFile);
    const data = await response.json();
    //console.log(data,"fetchjson","data");
    //console.log(0,target,"fetchjson");
    if(target==undefined){
        //console.log(1,"fetchjson");
        //console.log(data);
        sessionStorage.setItem(label,JSON.stringify(data));
        localStorage.setItem(label,JSON.stringify(data));
        return data;
    }else if(target=="session"){
        //console.log(2,"fetchjson","sessionstorage");
        //console.log(data);
        sessionStorage.setItem(label,JSON.stringify(data));
        return data;
    }else if(target=="local"){
        //console.log(3,"fetchjson","localstorage");
        //console.log(data);
        localStorage.setItem(label,JSON.stringify(data));
        return data;
    }
}
async function firstLoad(){
    let jsWarning = document.querySelectorAll('.js-disabled');
    for(let i=0;i<jsWarning.length;i++){
        jsWarning[i].remove();
    }
    //fetchJSON("/src/assets/json/window_templates.json","main-window");
    const settings = await fetchJSON("/assets/labels/settings.json","settings","session");
    const textlabels = await fetchJSON("/assets/labels/lang.json","textLabels");
    //console.log(0,settings,"firstload");
    //console.log(1,textlabels,"firstload");
    //console.log(2,settings.LANG,"firstload");
    //await saveData("settings", settings);
    //await saveData("textLabels",textlabels);
    await changeLang(settings.LANG);
    await landingPage();
    if(settings.AUTOLOAD){
        await autoLoad();
    }
    //console.log(document.getElementById("lang-en"));
    document.getElementById("lang-en").onclick = function(){changeLang("EN");};
    document.getElementById("lang-nl").onclick = function(){changeLang("NL");};
    //testing
    /*const firstloaded = new Activity('firstload',5,'loading','loading the app');
    const secondloaded = new Activity('secondload',10,'loading','loading the app');
    let havefun = new Schedule('page loading','my name',60);
    havefun.add(firstloaded);
    havefun.add(secondloaded);
    havefun.add(secondloaded);
    havefun.add(secondloaded);
    havefun.add(secondloaded);
    havefun.add(secondloaded);
    havefun.add(secondloaded);
    havefun.add(secondloaded);
    havefun.add(secondloaded);
    havefun.add(secondloaded);
    console.log(havefun);*/
}
function saveData(label,data){
    if(data==null){
        data = JSON.parse(sessionStorage.getItem(label));
        localStorage.setItem(label,JSON.stringify(data));
    }else{
        localStorage.setItem(label,JSON.stringify(data));
        sessionStorage.setItem(label,JSON.stringify(data));
    }
}
function loadData(label,type){
    if(type=="session"){
        const data = JSON.parse(sessionStorage.getItem(label));
        return data;
    }else if(type=="local"){
        const data = JSON.parse(localStorage.getItem(label));
        return data;
    }
}
async function backupHandler(btarget,text){
    const backupWindow = new mainWindow('upload_window','app-window');
    backupWindow.popup('10%','30%');
    backupWindow.addWindow('upload_form','form');
    backupWindow.addButton('close_button',function(){
        backupWindow.delete();
    });
    backupWindow.addBreak(4);
    updateText();
    const form = document.querySelector('#upload_form');  
    //DL backup
    let date = new Date();
    const dlFile = loadData(btarget,"local");
    const dlButton = createElement('a','download_button','navButton',form,false);
    dlButton.type = 'button';
    dlButton.setAttribute('href', 'data:text/json;charset=utf-8,' + JSON.stringify(dlFile));
    dlButton.setAttribute('download', 'Backup-'+date+'.json');
    dlButton.innerHTML = "Download Backup";
    backupWindow.addBreak(2);

    //Upload backup
    let file;
    const uploadButton = createElement('button','upload_button','navButton',form,false);
    uploadButton.innerHTML = 'Upload Backup File';
    backupWindow.addBreak(2);
    const restoreButton = createElement('button','restore_button','navButton',form,false);
    restoreButton.innerHTML = 'Restore Backup';
    uploadButton.type = 'button';
    uploadButton.onclick=function(){
        const fileField = createElement('input','file_field','navButton',form,false);
        file = fileField;
        fileField.type = 'file';
        fileField.accept = '.json';
        fileField.click();
        fileField.remove();
    };
    form.addEventListener('submit', handleSubmit);
    function handleSubmit (event) {
        // Stop the form from reloading the page
        event.preventDefault();

        // If there's no file, do nothing
        if (!file.value.length){
            return;
        }else{
            backupWindow.delete();
        }

        // Create a new FileReader() object
        let reader = new FileReader();

        // Setup the callback event to run when the file is read
        reader.onload = logFile;

        // Read the file
        reader.readAsText(file.files[0]);

    }
    function logFile (event) {
        console.log('file read.');
        let str = event.target.result;
        let json = JSON.parse(str);
        console.log('string', str);
        console.log('json', json);
        saveData(btarget, json);
    }
}

export { createElement,getBasicInfo,getID,changeLang,updateText,fetchJSON,firstLoad,saveData,loadData,backupHandler };