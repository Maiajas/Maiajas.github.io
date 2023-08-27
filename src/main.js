"use strict";
import { firstLoad } from "./modules/func.mjs";
firstLoad();
window.addEventListener('load', () => {registerSW();});
async function registerSW() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('/src/serviceworker.js');
        }
        catch (e) {
            console.log('SW registration failed');
        }
    }
}