"use strict";

// header

// hero

// clients

// about me

// numbers
function renderBlocks( target, list ) {
    let HTML = '';
    let good = 0;

    if ( target.length === 0 ||
         typeof(target) !== 'string' ) {
        return console.error('ERROR: reikia nurodyti vieta kur sugeneruoti HTML');
    }

    if ( !Array.isArray(list) ) {
        return console.error('ERROR: reikia saraso..');
    }

    for ( let i=0; i<list.length; i++) {
        const item = list[i];
        if ( !item.icon ||
             !item.title ) {
            continue;
        }
        if ( target === 'services' &&
             item.description ) {
            HTML += `<div class="block">
                        <i class="fa fa-${item.icon}"></i>
                        <h4>${item.title}</h4>
                        <div class="description">${item.description}</div>
                    </div>`;
            good++;
        }
        if ( target === 'achievements' &&
             item.number ) {
            HTML += `<div class="block">
                        <i class="fa fa-${item.icon}"></i>
                        <div class="number">${item.number}</div>
                        <h4>${item.title}</h4>
                    </div>`;
            good++;
        }
        if ( good === 4 ) {
            break;
        }
    }

    if ( good === 0 ) {
        return console.error('ERROR: duotas sarasas, bet arba tuscias, arba nei vieno gero duomens');
    }
    
    return document.getElementById(target).innerHTML = HTML;
}

// skills

// latest work

// job history

// services

// testimonials

// contact me

// footer

