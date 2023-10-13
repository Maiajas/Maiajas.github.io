"use strict";
export function randomString(length,special){
  if(special==undefined){
    special=false;
  }
  let result = '';
  let characters = '';
  if(special){
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=:";{}|[]\~`~<>?,./';
  }else{
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  }
  //console.log(characters.length,length,result);
  const charactersLength = characters.length;
  for(let i=0;i<length;i++){
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  //console.log(result);
  return result;
 }