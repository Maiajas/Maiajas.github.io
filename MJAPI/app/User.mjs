"use strict";
// IMPORTS
import {randomString} from './randomString.mjs';
export class User{
    constructor(name){
        this.name = name;
        this.settings = {};
        this.settings.isLoggedIn = false;
        this.settings.id = randomString(5,false);
        this.settings.lastPage = '';
    }
}