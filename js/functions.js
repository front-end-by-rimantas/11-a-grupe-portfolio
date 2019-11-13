"use strict";

// header

// hero

// clients

// about me

// numbers
function renderBlocks( list ) {
    let HTML = '';
    let good = 0;

    if ( !Array.isArray(list) ) {
        return console.error('ERROR: reikia saraso..');
    }

    for ( let i=0; i<list.length; i++) {
        const item = list[i];
        if ( !item.icon ||
             !item.number ||
             !item.title ) {
            continue;
        }
        if ( good === 4 ) {
            break;
        }
        // HTML += '<div class="block">\
        //             <i class="fa fa-'+ item.icon +'"></i>\
        //             <div class="number">\''+ item.number +'\'</div>\
        //             <h4>'+ item.title +'</h4>\
        //         </div>';

        HTML += `<div class="block">
                    <i class="fa fa-${item.icon}"></i>
                    <div class="number">${item.number}</div>
                    <h4>${item.title}</h4>
                </div>`;

        good++;
    }

    if ( good === 0 ) {
        return console.error('ERROR: duotas sarasas, bet arba tuscias, arba nei vieno gero duomens');
    }
    
    return document.getElementById('achievements').innerHTML = HTML;
}

// skills

// latest work

// job history

// services

// testimonials

// contact me

// footer

