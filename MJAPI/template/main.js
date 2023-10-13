"use strict";
import * as _global from './MJAPI/app/definitions.mjs';
import { firstLoad } from './MJAPI/app/firstLoad.mjs';
import { pageBrowser } from './MJAPI/app/browseApp.mjs';
//import { sceneLoader } from './MJAPI/game/sceneLoader.mjs';
//const SL = new sceneLoader();
const PB = new pageBrowser();
//console.log('main.js');
//if this is a game
//SL.loading('blank','title',firstLoad);
//if this is an app
PB.load('home',firstLoad);
window.addEventListener('load',(event)=>{
    //console.log('main.js eventlistener:load');
    registerSW();
});
async function registerSW() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('./service_worker.js');
        }
        catch (e) {
            //console.log('SW registration failed: ',e.message);
        }
    }
}