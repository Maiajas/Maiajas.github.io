"use strict";
import { firstLoad } from "./modules/func.mjs";
window.addEventListener('load', () => {
    registerSW();
    firstLoad();
});
async function registerSW() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('./serviceworker.js');
        }
        catch (e) {
            console.log('SW registration failed');
        }
    }
}