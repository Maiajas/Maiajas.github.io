"use strict";

export function getRect(target){
    const rect = target.getBoundingClientRect();
    let result = {};
    for (const key in rect) {
      if (typeof rect[key] !== "function") {
        result[key] = rect[key];
      }
    }
    //console.log(result);
    //console.log(rect);
    return result;
}