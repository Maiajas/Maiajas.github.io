"use strict";
import {loadData,loadSettings,saveData} from './saveload.mjs';
import {updateText} from './textLabels';
import {createUIWindow} from './UI';
import * as _data from './Data';
export class Inventory{
    constructor(){
        this.content = [];
        this.slots = 24;
        if(this.content.length>=this.slots){
            this.isFull = true;
        }else{
            this.isFull = false;
        }
        this.itemDB = _data.loadData('itemDB','session');
        if(this.itemDB==null){
            this.itemDB = [];
        }else{
            for(let i=0;i<this.itemDB.length;i++){
                const ine = this.itemDB[i].tag.indexOf('ES0');
                this.emptyItem = this.itemDB[ine];
                break;
            }
        }
        this.fill();
    }
    fill(){ 
        while(this.content.length<this.slots){
            this.content.push(this.emptyItem);
            //console.log('inventory filled.');
        }
    }
    learnTech(tech){
        if(tech.amount>0){
            console.log(tech);
            const settings = loadSettings('session');
            let amount;
            if(tech.energyType=='inner'){
                if(!settings.player.techniques.learned.inner.includes(tech)){
                    settings.player.techniques.learned.inner.push(tech);
                }else{
                    console.log('already learned.');
                }
            }
            if(tech.energyType=='outer'){
                if(!settings.player.techniques.learned.outer.includes(tech)){
                    settings.player.techniques.learned.outer.push(tech);
                }else{
                    console.log('already learned.');
                }            
            }
            for(let i=0;i<this.content.length;i++){
                if(this.content[i].tag==tech.tag&&settings.player.inventory.content[i].tag==tech.tag){
                    this.content[i].amount--;
                    settings.player.inventory.content[i].amount--;
                    amount = this.content[i].amount;
                }
            }
            saveData('gameSettings',settings,'session','inventory:learntech');
            if(amount<=0){
                this.removeItem(tech);
            }
        }
    }
    equipTech(tech){
        const settings = loadSettings('session');
        if(tech.energyType=='inner'){
            console.log('equip',tech,'inner');
            console.log('equip',1.1);
            settings.player.techniques.current.inner = tech;
            console.log('equip',2.1);
        }
        if(tech.energyType=='outer'){
            console.log('equip',tech,'outer');
            console.log('equip',1.2);
            settings.player.techniques.current.outer = tech;
            console.log('equip',2.2);
        }
        saveData('gameSettings',settings,'session','inventory:equiptech');
    }
    addItem(item){
        let inv = this;
        let emptyItem;
        let dbitem;
        for(let i=0;i<this.content.length;i++){
            if(this.content[i].tag.includes('ES0')){
                emptyItem = this.content[i];
                break;
            }
        }
        for(let i=0;i<inv.content.length;i++){
            console.log(inv.content[i].tag);
            if(inv.content[i].tag.includes(item.tag)){
                console.log('item owned');
                const loc = this.itemDB.indexOf(item);
                item=inv.content[i];
                dbitem = this.itemDB[loc];
            }else{
                console.log('item not owned');
            }
        }
        if(inv.content.length+1>inv.slots){
            inv.isFull = true;
            console.log('inventory full.');
            if(inv.content.includes(item)){             
                if(!item.isUnique){
                    const loc = inv.content.indexOf(item);
                    inv.content[loc].amount+=dbitem.amount;
                    console.log(item,'amount ++');
                }else{
                    console.log('item is already owned');
                }
            }else if(inv.content.includes(emptyItem)){
                console.log('replacing empty slot.');
                const loc = inv.content.indexOf(emptyItem);
                inv.content.splice(loc,1,item);
            }
        }
    }
    addByTag(tagArray){ 
        const _items = [];
        const _self = this;
        for(let t=0;t<tagArray.length;t++){
            for(let i=0;i<this.itemDB.length;i++){
                if(this.itemDB[i].tag.includes(tagArray[t])){
                    _items.push(this.itemDB[i]);
                }
            }
        }
        for(let i=0;i<_items.length;i++){
            this.addItem(_items[i]);
        }
    }
    useItem(item){
        const settings = loadSettings('session');  
        let amount;
        if(item.amount>0){  
            console.log('using item: ',item); 
            const itemStats = Object.values(item.stats);
            const itemStatList = Object.keys(item.stats);
            const playerStatList = Object.keys(settings.player.stats);
            for(let i=0;i<itemStatList.length;i++){
                if(itemStatList[i]==playerStatList[i]){
                    const key = itemStatList[i];
                    if(itemStats[i]>0){
                        if(itemStatList[i]=='stamina'){
                            if((settings.player.stats[key]+item.stats[key])<settings.player.stats['maxStamina']){
                                settings.player.stats[key] += item.stats[key];
                                console.log('maxStamina too low, only partially effective')
                            }
                        }else{
                            settings.player.stats[key] += item.stats[key];
                        }
                    }
                }
            }
            for(let i=0;i<settings.player.inventory.content.length;i++){
                if(settings.player.inventory.content[i].tag==item.tag){
                    settings.player.inventory.content[i].amount--;
                    this.content[i].amount--;
                    amount = this.content[i].amount;
                    break;
                }
            }
        }
        saveData('gameSettings',settings,'session','inventory:useitem');
        if(amount<=0){
            this.removeItem(item);
        }
    }
    equipGear(){

    }
    removeItem(item){
        const settings = loadSettings('session');
        let itemi;
        let itemt;
        for(let i=0;i<this.content.length;i++){
            if(this.content[i].tag.includes(item.tag)){
                console.log('item owned [itemt]');
                itemt=this.content[i];
            }else{
                console.log('item not owned [itemt]');
            }
            if(settings.player.inventory.content[i].tag.includes(item.tag)){
                console.log('item owned [itemi]');
                itemi=settings.player.inventory.content[i];
            }else{
                console.log('item not owned [ítemi]');
            }
        }
        const loct = this.content.indexOf(itemt);
        this.content.splice(loct,1);
        this.fill();
        console.log('removed:[',itemt,'] from:[',this,'] at:[',loct,']');
        const loci = settings.player.inventory.content.indexOf(itemi);
        settings.player.inventory.content.splice(loci,1);
        settings.player.inventory.fill();
        console.log('removed:[',itemi,'] from:[',settings.player.inventory,'] at:[',loci,']');
        saveData('gameSettings',settings,'session','inventory:removeitem');
    }
    window(){
        if(document.getElementById('inventory_wrapper')){
            document.getElementById('inventory_wrapper').remove();
        }
        const _self = this;
        const _content = {};
        _content.dat = ['inventory','mainUI-window'];
        _content.el = ['h1'];
        const LW = createUIWindow('inventory',_content);
        document.getElementById('inventory_wrapper').style.maxWidth='30%';
        document.getElementById('inventory_wrapper').style.left='33%';
        let slot = {};
        slot.Clicked = false;
        slot.id=0;
        function makeDesBox(i,rect){
            if(document.getElementById('inventory_description_wrapper')){
                document.getElementById('inventory_description_wrapper').remove();
            }
            const idesc = LW.addWindow('inventory_description_wrapper');
            const idescb = LW.addElement('div','inventory_description_box','inventory-box',undefined,idesc);
            const idescbt = LW.addElement('p','inventory_description_text','ui-text',undefined,idescb);
            if(_self.content[i].tag=='ES0'){
                idescbt.innerHTML = "Empty Slot";
            }else{
                idescbt.innerHTML = "Item Name:<br>"+_self.content[i].name+"<br>Amount: "+_self.content[i].amount;
            }           
            idesc.classList.add('inventory-window');
            idesc.style.position='fixed';
            idesc.style.display='block';
            idesc.style.zIndex='5';
            //console.log(rect);
            const box = idescb.getBoundingClientRect();
            idesc.style.left = (rect.x-(box.width*2))+'px';
            idesc.style.top = (rect.y)+'px';
            if(_self.content[i].itemCategory=='cultivationtechnique'){
                LW.addButton('learn_button',function(){
                    _self.learnTech(_self.content[i]);
                    idesc.remove();
                    slot.Clicked = false;
                    slot.id=0;
                },'mainUI',idescb);
                LW.addButton('close_button',function(){
                    idesc.remove();
                },'mainUI',idescb);
            }
            if(_self.content[i].itemCategory=='consumable'){
                LW.addButton('use_button',function(){
                    _self.useItem(_self.content[i]);
                    idesc.remove();
                    slot.Clicked = false;
                    slot.id=0;
                },'mainUI',idescb);
                LW.addButton('close_button',function(){
                    idesc.remove();
                },'mainUI',idescb);
            }
            if(_self.content[i].itemCategory=='gear'){
                LW.addButton('equip_button',function(){
                    _self.equipGear(_self.content[i]);                    
                    idesc.remove();
                    slot.Clicked = false;
                    slot.id=0;
                },'mainUI',idescb);
                LW.addButton('close_button',function(){
                    idesc.remove();
                },'mainUI',idescb);
            }
            updateText();
        }
        for(let i=0;i<this.slots;i++){
            if(this.content[i].amount==0){
                this.removeItem(this.content[i]);
            }
            const isb = LW.addButton('inventory_slot_'+(i+1),function(){     
                if(slot.id==(i+1)){
                    if(document.getElementById('inventory_description_wrapper')){
                        document.getElementById('inventory_description_wrapper').remove();
                    }
                    slot.Clicked = false;
                    slot.id=0;
                }else{                    
                    if(_self.content[i].tag!='ES0'){
                        if(document.getElementById('inventory_description_wrapper')){
                            document.getElementById('inventory_description_wrapper').remove();
                        }
                        slot.Clicked = true;
                        slot.id=(i+1);
                        const rect = isb.getBoundingClientRect();
                        makeDesBox(i,rect);
                    }
                }
            },'inventory');
            isb.onload = function(){isb.style.width = isb.style.height;};
            const isbi = LW.addElement('img','islot_icon_'+(i+1),'islot-icon',undefined,isb);
            isbi.src = this.content[i].icon.src;
            isb.onmouseenter = function(){
                if(!slot.Clicked){
                    const rect = isb.getBoundingClientRect();
                    makeDesBox(i,rect);
                }
            };
            isb.onmouseleave = function(){
                if(!slot.Clicked){
                    while(document.getElementById('inventory_description_wrapper')){
                        document.getElementById('inventory_description_wrapper').remove();
                    }
                }
            };
            document.getElementById('inventory_wrapper').onmouseleave = function(){
                if(document.getElementById('inventory_description_wrapper')){
                    document.getElementById('inventory_description_wrapper').remove();
                    slot.Clicked = false;
                    slot.id=0;
                }
            };
        }
        LW.addButton('close_button',function(){
            document.getElementById('inventory_wrapper').remove();
        },'mainmenu');
        updateText();
    }
}