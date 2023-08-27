"use strict";
import { Activity,Schedule,mainWindow,navBar } from "./class.mjs";
import { loadData,saveData,updateText,createElement,backupHandler } from "./func.mjs";
//main window init.
console.log('loadwindow, init');
const navbar = new navBar();
//navbar.addMenu();
//navbar.addMenuButton('navbar_menu_home_button');
navbar.addLangButton('en');
navbar.addDivider();
navbar.addLangButton('nl');
//navbar.style.backgroundColor = '#64DD17';
const mainwindow = new mainWindow("main_window");
mainwindow.addWindow("loading_window");
const Footer = createElement("footer","footer","ro-text","",true);
//mainwindow.addFromTemplate('/assets/templates/setup-window.json','setupWindow');
export function landingPage(){
    document.querySelector('title').id = 'title_landing';
    mainwindow.empty();
    mainwindow.addWindow("landing_page");
    mainwindow.addElement('h1','setup1_H1','main-text');
    mainwindow.addElement('p','setup1_P','main-text');
    mainwindow.addBreak(3);
    mainwindow.addButton('continue_button',function(){
        loaderWindow();
    });
    mainwindow.addButton('setup_button',function(){
        mainSetup('setup1');
    });
    updateText();
}
function mainSetup(target){
    document.querySelector('title').id = 'title_setup';
    let setupContent = {};
    if(target=="setup1"){
        console.log("loading setup page 1");
        //cleanup UI
        //mainwindow.empty();
        if(document.getElementById('setup_container')){
            document.getElementById('setup_container').remove();
        }
        if(document.getElementById('error_popup')){
            document.getElementById('error_popup').remove();
        }
        if(document.getElementById('loader_window')){
            document.getElementById('loader_window').remove();
        }
        //Setup 1
        const setupwindow = new mainWindow('setup_container','setup-window');
        setupwindow.popup('8%','25%');
        setupwindow.addWindow('setup1_window','form'); 
        setupwindow.addElement('h2','setup2_H2','setup-text');
        setupwindow.addElement('h3','setup2_H3','setup-text');
        setupwindow.addBreak(2);
        setupwindow.addInput('setup2_name','text');
        setupwindow.addBreak(2);
        setupwindow.addInput('setup2_activity','text');
        setupwindow.addBreak(2);
        setupwindow.addInput('setup2_description','text');
        setupwindow.addBreak(3);
        setupwindow.addButton('cancel_button',function(){setupwindow.delete();});
        setupwindow.addButton('next_button',function(){
            const nameField = document.getElementById('setup2_name_field');
            const activityField = document.getElementById('setup2_activity_field');
            const descriptionField = document.getElementById('setup2_description_field');
            if(nameField.value!=""&&activityField.value!=""&&descriptionField.value!=""){
                setupContent.name = nameField.value;
                setupContent.scheduleName = activityField.value;
                setupContent.scheduleDescription = descriptionField.value;
                saveData("setupcontent",setupContent);
                mainSetup("setup2");
                setupwindow.delete();
                console.log(setupContent);
            }
        });
        updateText();
    }else if(target=="setup2"){
        console.log("loading setup page 2");
        const setupwindow = new mainWindow('setup_container','setup-window');
        //Setup 2
        const setupContent = loadData("setupcontent","session");
        setupwindow.popup('8%','25%');
        setupwindow.addWindow('setup2_window','form'); 
        setupwindow.addElement('h2','setup3_H2','setup-text');
        setupwindow.addElement('h3','setup3_H3','setup-text');
        setupwindow.addBreak(1);
        setupwindow.addElement('p','setup3_P','setup-text');
        setupwindow.addBreak(2);
        setupwindow.addInput('setup3_totalTime','number');
        setupwindow.addBreak(3);
        setupwindow.addButton('back_button',function(){
            setupwindow.delete();
            mainSetup("setup1");
        });
        setupwindow.addButton('next_button',function(){
            const totalTimeField = document.getElementById('setup3_totalTime_field');
            if(totalTimeField.value!=""){
                setupContent.totalSessionTime = totalTimeField.value;
                saveData("setupcontent",setupContent);
                setupwindow.delete();
                mainSetup("setup3");
            }
        });
        updateText();
    }else if(target=="setup3"){
        console.log("loading setup page 3");
        const setupwindow = new mainWindow('setup_container','setup-window');
        //Setup 3
        const setupContent = loadData("setupcontent","session");
        setupwindow.popup('8%','25%');
        setupwindow.addWindow('setup3_window');
        setupwindow.addElement('h2','setup4_H2','setup-text');
        setupwindow.addElement('h3','setup4_H3','setup-text');
        setupwindow.addElement('p','setup4_P','setup-text'); 
        let activityDB = {};
        const _actDB = loadData("activityDB","local");
        if(_actDB!=undefined){
            activityDB = _actDB;
        }else{
            activityDB.schedules = [];
        }
        const newSchedule = new Schedule(setupContent.scheduleName,setupContent.name,parseInt(setupContent.totalSessionTime),setupContent.scheduleDescription);
        setupwindow.addCreationButton('activity',function(){
            if(document.getElementById('createActivity_window')){
                document.getElementById('createActivity_window').remove();
            }
            const activityWindow = new mainWindow('createActivity_window','app-window');
            activityWindow.popup('15%','30%');
            activityWindow.addWindow('activity_window','form');
            activityWindow.addElement('h2','newactivity_H2','setup-text');
            activityWindow.addBreak(1);
            activityWindow.addInput('s4_activity_name','text');
            activityWindow.addBreak(1);
            activityWindow.addInput('s4_activity_time','number');
            activityWindow.addBreak(1);
            activityWindow.addInput('s4_activity_type','text');
            activityWindow.addBreak(1);
            activityWindow.addInput('s4_activity_description','text');
            activityWindow.addBreak(2);
            activityWindow.addCreationButton('cancel_button',function(){
                activityWindow.delete();
            });
            activityWindow.addCreationButton('confirm_button',function(){    
                const activity_name = document.getElementById('s4_activity_name_field'); 
                console.log(activity_name.value);    
                const activity_time = document.getElementById('s4_activity_time_field'); 
                console.log(activity_time.value);   
                const activity_type = document.getElementById('s4_activity_type_field');
                console.log(activity_type.value);   
                const activity_description = document.getElementById('s4_activity_description_field');
                if(activity_name.value!=""&&activity_time.value!=""&&activity_type.value!=""&&activity_description.value!=""){
                    const newActivity = new Activity(activity_name.value,parseInt(activity_time.value),activity_type.value,activity_description.value);
                    const _result = newSchedule.add(newActivity);
                    console.log(_result);
                    if(_result===true){
                        console.log('activity created');
                        activityWindow.delete();
                    }else if(_result===false){
                        console.log('activity create fail');
                        saveData('error',console.log);
                    }
                }                
            });
            updateText(); 
        });
        setupwindow.addBreak(2);
        setupwindow.addButton('back_button',function(){
            setupwindow.delete();
            mainSetup("setup2");
        });
        setupwindow.addButton('next_button',function(){
            console.log(activityDB);
            console.log(activityDB.schedules);
            activityDB.schedules.push(newSchedule);
            activityDB.currentSchedule = newSchedule;
            console.log(activityDB.currentSchedule);
            if(activityDB.currentSchedule.activities.length>0){
                if(document.getElementById('createActivity_window')){
                    document.getElementById('createActivity_window').remove();
                }
                saveData("activityDB", activityDB);
                setupwindow.delete();
                mainSetup("setup4");
            }else{
                if(document.getElementById('error_popup')){
                    document.getElementById('error_popup').remove();
                }
                const error_popup = new mainWindow('error_popup','app-window');
                error_popup.popup('20%','40%');
                error_popup.addWindow('popup_window');
                error_popup.addElement('h1','activity_setup_error_title','popup-title');
                error_popup.addBreak(1);
                error_popup.addElement('p','activity_setup_error_text','popup-text');
                error_popup.addBreak(4);
                error_popup.addButton('close_button',function(){
                    error_popup.delete();
                });
                updateText();
            }
        });
        updateText();
    }else if(target=="setup4"){
        console.log("loading setup page 4");
        const setupwindow = new mainWindow('setup_container','setup-window');
        const activityDB = loadData('activityDB','local');
        //Setup 4
        const setupContent = loadData("setupcontent","session");
        setupwindow.popup('8%','25%');
        setupwindow.addWindow('setup4_window');
        setupwindow.addElement('h2','setup5_H2','setup-text','Setup, page 4.');
        setupwindow.addButton('close_button',function(){
            setupwindow.delete();
        });
        updateText(); 
    }
}
function loaderWindow(){
    document.querySelector('title').id = 'title_loader';
    console.log("loading loader window");
    //Loader
    let activityDB = loadData('activityDB','local');
    if(document.getElementById('setup_container')){
        document.getElementById('setup_container').remove();
    }
    if(document.getElementById('loader_window')){
        document.getElementById('loader_window').remove();
    }
    if(activityDB!=null){
        console.log('not null');
        //mainwindow.addWindow('app_window');
        const loaderwindow = new mainWindow('loader_window','app-window');
        loaderwindow.popup('5%','8%');
        loaderwindow.addWindow('app_window');
        loaderwindow.addElement('h2','loader_text','app-text','Saved schedules:');
        console.log(activityDB.schedules);
        loaderwindow.addButton('cancel_button',function(){
            loaderwindow.delete();
        });
        loaderwindow.addButton('load_backup_button',function(){
            if(document.getElementById('upload_window')){
                document.getElementById('upload_window').remove();
            };
            loaderwindow.delete();
            backupHandler('activityDB','Backup');
        });
        for(let i=0;i<activityDB.schedules.length;i++){
            console.log(activityDB.schedules);
            activityDB.schedules = activityDB.schedules.filter(function( element ) {
               return element !== null;
            });
            if(activityDB.schedules==""){
                sessionStorage.removeItem('activityDB');
                localStorage.removeItem('activityDB');
                loaderwindow.delete();
            }
            console.log(activityDB.schedules);
            let windowID = 'activity_picker_schedule_'+i;
            let text_N_ID = 'activity_text_name_'+i;
            let text_A_ID = 'activity_text_activities_'+i;
            let text_U_ID = 'activity_text_username_'+i;
            let text_D_ID = 'activity_text_description_'+i;
            let text_DT_ID = 'activity_text_dailytime_'+i;
            let text_LABEL_N_ID = 'activity_text_label_n_'+i;
            let text_LABEL_A_ID = 'activity_text_label_a_'+i;
            let text_LABEL_U_ID = 'activity_text_label_u_'+i;
            let text_LABEL_D_ID = 'activity_text_label_d_'+i;
            let text_LABEL_DT_ID = 'activity_text_label_dt_'+i;
            let btnID = 'activity_loadButton_'+i;
            console.log(activityDB.schedules[i]);
            loaderwindow.addElement('div',windowID+'_container','main-window');
            const mainContainer = document.getElementById(windowID+'_container');
            loaderwindow.addElement('h2',text_LABEL_N_ID,'activity_text_label','Schedule: ',mainContainer);
            loaderwindow.addElement('div',windowID,'app-window','',mainContainer);
            loaderwindow.addElement('button',btnID+'_load','loader_button','load.',mainContainer);
            loaderwindow.addElement('button',btnID+'_delete','loader_button','delete.',mainContainer);
            const deleteBtn = document.getElementById(btnID+'_delete');
            const loadBtn = document.getElementById(btnID+'_load');
            const tarwin = document.getElementById(windowID);
            tarwin.classList.add('loader_schedule_card');
            loadBtn.onclick = function(){
                activityDB.currentSchedule = activityDB.schedules[i];
                saveData('activityDB',activityDB);
                //saveData("currentSchedule", activityDB.schedules[i]);
                loaderwindow.delete();
                appMainStage();
            };
            deleteBtn.onclick = function(){
                //const empty = {};
                delete activityDB.schedules[i];
                if(activityDB.schedules==""){
                    sessionStorage.removeItem('activityDB');
                    localStorage.removeItem('activityDB');
                }
                loaderwindow.delete();
                saveData("activityDB", activityDB);
                loaderWindow();
            };
            loaderwindow.addElement('p',text_LABEL_N_ID,'activity_text_label','Schedule name: ',tarwin);
            loaderwindow.addElement('p',text_N_ID,'activity_text_content',JSON.stringify(activityDB.schedules[i].name).replace(/["]/g,''),tarwin);
            loaderwindow.addElement('p',text_LABEL_U_ID,'activity_text_label','Username: ',tarwin);
            loaderwindow.addElement('p',text_U_ID,'activity_text_content',JSON.stringify(activityDB.schedules[i].username).replace(/["]/g,''),tarwin);
            loaderwindow.addElement('p',text_LABEL_DT_ID,'activity_text_label','Total time (daily): ',tarwin);
            loaderwindow.addElement('p',text_DT_ID,'activity_text_content',JSON.stringify(activityDB.schedules[i].dailytime).replace(/["]/g,''),tarwin); 
            loaderwindow.addElement('p',text_LABEL_D_ID,'activity_text_label','Schedule description: ',tarwin);
            loaderwindow.addElement('p',text_D_ID,'activity_text_content',JSON.stringify(activityDB.schedules[i].description).replace(/["]/g,''),tarwin); 
            loaderwindow.addElement('h2',text_LABEL_A_ID,'activity_text_label','Activities: ',mainContainer);
            for(let a = 0;a<activityDB.schedules[i].activities.length;a++){
                //loaderwindow.addBreak(1);
                const awinID = windowID+'_activity_'+a;
                loaderwindow.addElement('div',awinID,'app-window','',mainContainer);
                const arwin = document.getElementById(awinID);
                arwin.classList.add('loader-activity-card');
                //loaderwindow.addElement('h3',text_LABEL_A_ID,'activity_text_label','NR: '+(a+1),arwin);
                loaderwindow.addElement('p',text_LABEL_A_ID,'activity_text_label','name: ',arwin);
                loaderwindow.addElement('p',text_A_ID,'activity_text_content',JSON.stringify(activityDB.schedules[i].activities[a].name).replace(/["]/g,''),arwin);
                loaderwindow.addElement('p',text_LABEL_A_ID,'activity_text_label','Description: ',arwin);
                loaderwindow.addElement('p',text_A_ID,'activity_text_content',JSON.stringify(activityDB.schedules[i].activities[a].description).replace(/["]/g,''),arwin);
                loaderwindow.addElement('p',text_LABEL_A_ID,'activity_text_label','Duration: ',arwin);
                loaderwindow.addElement('p',text_A_ID,'activity_text_content',JSON.stringify(activityDB.schedules[i].activities[a].duration).replace(/["]/g,''),arwin);
                loaderwindow.addElement('p',text_LABEL_A_ID,'activity_text_label','Type of activity: ',arwin);
                loaderwindow.addElement('p',text_A_ID,'activity_text_content',JSON.stringify(activityDB.schedules[i].activities[a].type).replace(/["]/g,''),arwin);
                //loaderwindow.addElement('p',text_LABEL_A_ID,'activity_text_label','Completed: ',arwin);
                //loaderwindow.addElement('p',text_A_ID,'activity_text_content',JSON.stringify(activityDB.schedules[i].activities[a].completed).replace(/["]/g,''),arwin);
                //loaderwindow.addBreak(2);
            }
        }
        updateText();
    }else{
        if(document.getElementById('error_popup')){
            document.getElementById('error_popup').remove();
        }
        const loader_popup = new mainWindow('error_popup','app-window');
        loader_popup.popup('10%','28%');
        loader_popup.addWindow('popup_window');
        loader_popup.addElement('h1','loader_error_title','popup-text');
        loader_popup.addBreak(1);
        loader_popup.addElement('p','loader_error_text','popup-content');
        loader_popup.addBreak(4);
        loader_popup.addButton('close_button',function(){
            loader_popup.delete();
        })
        loader_popup.addBreak(2);
        loader_popup.addButton('backups_button',function(){
            loader_popup.delete();
            backupHandler('activityDB','Backup');
        });
        updateText();
    }    
}
function appMainStage(){
    document.querySelector('title').id = 'title_mainapp';
    mainwindow.empty();
    mainwindow.addWindow('mainapp_container');
    mainwindow.addElement('div','mainapp_info_card','app-window');
    const infoCard = document.getElementById('mainapp_info_card');
    mainwindow.addElement('h1','mainapp_landing_title','main-text','Main APP Test.',infoCard);
    mainwindow.addElement('p','mainapp_landing_text','main-text','testererer.',infoCard);
    const activityDB = loadData('activityDB','local');
    mainwindow.addElement('p','mainapp_landing_text','main-text','Current schedule: '+activityDB.currentSchedule.name,infoCard);
    console.log(activityDB.currentSchedule.activities.length);
    mainwindow.addWindow('app_schedule_container');
    const tarwin = document.getElementById('app_schedule_container');
    mainwindow.addElement('p','activity_text_label','activity_text_label','Schedule name: ',infoCard);
    mainwindow.addElement('p','activity_text_content','activity_text_content',JSON.stringify(activityDB.currentSchedule.name).replace(/["]/g,''),infoCard);
    mainwindow.addElement('p','activity_text_label','activity_text_label','Schedule description: ',infoCard);
    mainwindow.addElement('p','activity_text_content','activity_text_content',JSON.stringify(activityDB.currentSchedule.description).replace(/["]/g,''),infoCard); 
    mainwindow.addElement('h2','activity_text_label','activity_text_label','Activities: ');
    for(let a = 0;a<activityDB.currentSchedule.activities.length;a++){
        let text_A_ID = 'activity_text_activities_'+a;
        let text_LABEL_A_ID = 'activity_text_label_a_'+a;
        const awinID = 'app_activity_container_'+a;
        mainwindow.addElement('button',awinID,'app-window');
        const arwin = document.getElementById(awinID);
        arwin.classList.add('app-activity-button');
        //mainwindow.addElement('h3',text_LABEL_A_ID,'activity_text_label','NR: '+(a+1),arwin);
        mainwindow.addElement('p',text_LABEL_A_ID,'activity_text_label','name: ',arwin);
        mainwindow.addElement('p',text_A_ID,'activity_text_content',JSON.stringify(activityDB.currentSchedule.activities[a].name).replace(/["]/g,''),arwin);
        mainwindow.addElement('p',text_LABEL_A_ID,'activity_text_label','Description: ',arwin);
        mainwindow.addElement('p',text_A_ID,'activity_text_content',JSON.stringify(activityDB.currentSchedule.activities[a].description).replace(/["]/g,''),arwin);
        mainwindow.addElement('p',text_LABEL_A_ID,'activity_text_label','Duration: ',arwin);
        mainwindow.addElement('p',text_A_ID,'activity_text_content',JSON.stringify(activityDB.currentSchedule.activities[a].duration).replace(/["]/g,''),arwin);
        mainwindow.addElement('p',text_LABEL_A_ID,'activity_text_label','Type of activity: ',arwin);
        mainwindow.addElement('p',text_A_ID,'activity_text_content',JSON.stringify(activityDB.currentSchedule.activities[a].type).replace(/["]/g,''),arwin);
        mainwindow.addElement('p',text_LABEL_A_ID,'activity_text_label','Completed: ',arwin);
        mainwindow.addElement('p',text_A_ID,'activity_text_content',JSON.stringify(activityDB.currentSchedule.activities[a].completed).replace(/["]/g,''),arwin);
    }
    updateText();
}
export function errorPage(){
    console.log("loading errorpage");
    //cleanup UI
    mainwindow.empty();
    //errormsg
    mainwindow.addWindow('error_window');
    mainwindow.addElement('div','error_text','main-window');
    mainwindow.addBreak(1);
    mainwindow.addButton('back_button',function(){
        landingPage();
    });
    const basicInfo = window.navigator;
    let basicInfoOutput;
    for(let x in basicInfo){
        basicInfoOutput += x + ": " + basicInfo[x] +"<br>";
    };
    mainwindow.addElement('p','info_text','main-window',basicInfoOutput);
    updateText();
}