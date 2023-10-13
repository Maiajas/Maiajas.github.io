"use strict";
import * as _global from './definitions.mjs';
import {getRect} from './getRect.mjs';

export function searchApp(query,parent){
    //console.log(_global.pageDB);
    //console.log(query);
    query = query.toLowerCase();
    const test = _global.pageDB.page_list;
    //const test_a = Object.keys(test);
    const test_b = Object.values(test);
    const result_list = [];
    //search webpages
    for(let i=0;i<test_b.length;i++){
        //console.log(test_b[i]);
        const tags = test_b[i].searchTags;
        //console.log(1,'tags',tags);
        //console.log(1,'result_list',result_list);
        for(let d=0;d<tags.length;d++){
            if(query!=''&&(tags[d].toLowerCase()).includes(query)){
                if(result_list!=undefined&&result_list.includes(test_b[i])==false){
                    result_list.push(test_b[i]);
                }
            }
        }
    }
    //display results
    if(result_list!=undefined&&result_list.length!=0){
        parent.window.toggleWindow('search_card_container',false);
        const MW = parent.window;
        const rect = getRect(parent.searchbar);
        const SC = MW.addElement('div','search_card_container',['search-card-container']);
        MW.addElement('h3','search_result_title_text',['ui-text','ro-text'],undefined,SC);
        MW.addElement('h3','search_result_amount_text',['ui-text','ro-text'],'('+result_list.length+')',SC);
        SC.style.top = (rect.top+rect.height)+'px';
        SC.style.left = (rect.left+20)+'px';
        SC.style.width = (rect.width-30)+'px';
        for(let i=0;i<result_list.length;i++){
            //console.log(result_list);
            //console.log(result_list[i]);
            const Card = MW.addElement('div','search_result_card_text_'+(i+1),['search-result-card'],undefined,SC);
            const MT = MW.addElement('h3','search_result_title_text_'+(i+1),['ui-text','ro-text'],undefined,Card);
            const PDesc = MW.addElement('p','search_result_desc_text_'+(i+1),['ui-text','ro-text'],undefined,Card);
            MW.addBreak(1,Card);
            const PTags = MW.addElement('p','search_result_tags_text_'+(i+1),['ui-text','ro-text'],undefined,Card);
            MT.innerText = result_list[i].title;
            PDesc.innerText = result_list[i].content.description;
            PTags.innerText = 'tags: ['+result_list[i].searchTags+']';
            Card.onclick=()=>{
                _global.pageDB.load(result_list[i].tag);
                SC.remove();
                document.getElementById('navbar_searchBar').remove();
            };
        }
    }else{
        //console.log(query+' not found.');
        parent.window.toggleWindow('search_card_container',false);
        const MW = parent.window;
        const rect = getRect(parent.searchbar);
        const SC = MW.addElement('div','search_card_container',['search-card-container']);
        MW.addElement('h3','search_result_title_text',['ui-text','ro-text'],undefined,SC);
        MW.addBreak(1,SC);
        SC.style.top = (rect.top+rect.height)+'px';
        SC.style.left = (rect.left+20)+'px';
        SC.style.width = (rect.width-30)+'px';
        MW.addElement('p','search_result_error',['ui-text','ro-text'],undefined,SC);
        MW.addBreak(3,SC);
        SC.onclick=()=>{
            SC.remove();
        }
    }
}