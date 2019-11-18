"use strict";

// header
function headerScroll() {
    // kokiame aukstyje esu
    const height = window.scrollY;
    
    // kokiuose auksciuose yra sekcijos (kurios yra paminetos header nav)
    const DOMlinks = document.querySelectorAll('#main_header nav > a');
    console.log(DOMlinks);
    
    let links = [];
    for ( let i=0; i<DOMlinks.length; i++ ) {
        const element = DOMlinks[i];
        const href = element.href;
        const split = href.split('#');
        
        if ( split.length > 1 ) {
            console.log(href);
            links.push('#'+split[1]);
        }

    }

    console.log(links);
    

    // kuri sekcija man artimiausia
        // jeigu artimiausia sekcija yra pamineta header nav'e
            // atimame "active" klase is tos kuri siuo metu ja turi
            // jai duodame klase "active"
}

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
        
        if ( target === 'services_list' &&
             item.description ) {
            HTML += `<div class="block">
                        <i class="fa fa-${item.icon}"></i>
                        <h4>${item.title}</h4>
                        <div class="description">${item.description}</div>
                    </div>`;
            good++;
        }
        if ( target === 'achievements_list' &&
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
function renderSkills( list ) {
    let HTML = '';

    if ( !Array.isArray(list) ) {
        return console.error('ERROR: reikia saraso..');
    }

    for ( let i=0; i<list.length; i++ ) {
        const item = list[i];

        if ( typeof(item.title) !== 'string' ||
             item.title.length === 0 ||
             item.title.length > 50 ||
             !isFinite(item.value) ||
             item.value < 0 ||
             item.value > 100 ) {
            continue;
        }

        // 2 === 4 ? true : false

        let num = item.value;
        if ( item.value % 1 !== 0 ) {
            num = item.value.toFixed(1);
        }
        
        HTML += `<div class="progress-bar">
                    <div class="texts">
                        <div class="label">${item.title}</div>
                        <div class="value">${num}%</div>
                    </div>
                    <div class="full">
                        <div class="bar" style="width: ${item.value}%;">
                            <div class="loading"></div>
                        </div>
                    </div>
                </div>`;
    }

    return document.querySelector('#skills_list').innerHTML = HTML;
}

// latest work

// job history

// services

// testimonials

// contact me

// footer

