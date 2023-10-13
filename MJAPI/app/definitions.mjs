"use strict";
// IMPORTS
import * as _data from './Data.mjs';
import {randomString} from './randomString.mjs';
import {event_log} from './eventLog.mjs';
import {User} from './User.mjs';
import {mainWindow} from './UI.mjs';
import {webPages} from './webPage.mjs';
import {themeDB} from './themeHandler.mjs';
//import {updateText} from './textLabels.mjs';

// CONSTANTS
const _preset = await _data.fetchJSON('/MJAPI/src/preset/settings.json','settings_preset','none'); 
//console.log(_preset);
export const APP_NAME = _preset.app_name;
export const APP_VERSION = _preset.version;
export const APP_PRESET_LANG = _preset.lang;
//console.log(APP_NAME,APP_VERSION,APP_PRESET_LANG);
export const TEXT_LABELS = await _data.fetchJSON('/MJAPI/json/textlabels.json','textLabels','none');
//console.log(TEXT_LABELS);
export const class_list = await _data.fetchJSON('/MJAPI/json/class_list_defaults.json','class_list','none');
export const _mainWindow = new mainWindow('main_wrapper',['main-wrapper']);
export const bg_task_list = [];
export const _themeDB = new themeDB();
//const UT01 = setInterval(updateText,10000);

// SESSION_DATA
/// GLOBAL_SETTINGS
export let session_data = {
    "session_id":randomString(10),
    "event_log":new event_log(),
    "global_settings":{
        "user_lang":APP_PRESET_LANG,
        "browser_lang":navigator.language,
        "app_version":APP_VERSION
    }
}
//console.log(session_data.global_settings);
/// USER
session_data.user = new User('session_user');
session_data.user.settings = session_data.global_settings;


// put session_data in sessionStorage
_data.saveSession('session','set_definitions','session');



//create webpages
export const pageDB = new webPages();
pageDB.create('home');
pageDB.create('about');
pageDB.create('applist');
pageDB.create('error-generic');

//create themes
const _theme_default = _themeDB.createTheme('default','UItxClR','UItxClGr','UIBgCl2014038b','UIBgClc4ffcc59','UIBgClW','UItxClGr','UIBgCl6b4940b0');