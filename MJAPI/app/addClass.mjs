"use strict";
import {class_list} from './definitions.mjs';
//console.log(1,'addClass:',class_list);
//_data.loadData('class_list','session');
export async function addClass(listByArray,targetElement){
    //console.log(2,'addClass:',listByArray);
    //console.log(3,'addClass:',targetElement);
    for(let i=0;i<listByArray.length;i++){
        if(Object.keys(class_list).includes(listByArray[i])){
            const ref_list = class_list[listByArray[i]];
            //console.log(4.1,'ref_list',ref_list);
            for(let d=0;d<ref_list.length;d++){
                await targetElement.classList.add(ref_list[d]);
                //console.log(4.2,'addClass:',ref_list[d],targetElement);
            }
        }
    }
    for(let i=0;i<listByArray[0].length;i++){
        if(Object.keys(class_list).includes(listByArray[0][i])){
            const ref_list = class_list[listByArray[0][i]];
            //console.log(5.1,'ref_list',ref_list);
            for(let d=0;d<ref_list.length;d++){
                await targetElement.classList.add(ref_list[d]);
                //console.log(5.2,'addClass:',ref_list[d],targetElement);
            }
        }
    }
}