"use strict";

// header
function headerScroll() {
    // kokiame aukstyje esu
    const headerHeight = document.querySelector('#main_header').offsetHeight;
    const height = window.scrollY + headerHeight;
    
    // kokiuose auksciuose yra sekcijos (kurios yra paminetos header nav)
    const DOMlinks = document.querySelectorAll('#main_header nav > a');
    
    let links = [];
    for ( let i=0; i<DOMlinks.length; i++ ) {
        const element = DOMlinks[i];
        const href = element.href;
        const split = href.split('#');
        
        if ( split.length > 1 ) {
            links.push('#'+split[1]);
        }
    }

    // susirandame sekciju poziciju aukscius
    let sectionHeights = [];
    for ( let i=0; i<links.length; i++ ) {
        const link = links[i];
        if ( link === '#' ) {
            sectionHeights.push(0);
            continue;
        }
        const section = document.querySelector(link);       // '#section'
        sectionHeights.push(section.offsetTop);
    }

    // kuri sekcija man artimiausia
    let currentSectionImIn = 0;
    for ( let i=0; i<sectionHeights.length; i++ ) {
        if ( sectionHeights[i] > height ) {
            break;
        }
        currentSectionImIn = i;
    }
    
    // atimame "active" klase is tos kuri siuo metu ja turi
    document.querySelector('#main_header nav > a.active')
        .classList.remove('active');

    // jai duodame klase "active"
    document.querySelector(`#main_header nav > a[href="${links[currentSectionImIn]}"]`)
        .classList.add('active');
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

function skillsScroll() {
    const myPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const scrollHeight = myPosition + windowHeight;
    
    const DOMskills = document.querySelector('#skills');
    const skillsPosition = DOMskills.offsetTop;
    const skillsTopPadding = parseFloat( getComputedStyle( DOMskills ).paddingTop );
    
    const barHeight = DOMskills.querySelector('.progress-bar').offsetHeight;
    const barPosition = skillsPosition + skillsTopPadding + barHeight;
    
    if ( barPosition < scrollHeight ) {
        const progressBars = DOMskills.querySelectorAll('.progress-bar');
        
        for ( let i=0; i<progressBars.length; i++ ) {
            const bar = progressBars[i];
            if ( !bar.classList.contains('animate') ) {
                bar.classList.add('animate');
            }
        }
    }
    
    return;
}

// latest work
function renderGallery( list ) {
    const DOM = document.querySelector('#gallery');
    let HTML = '';
    let filterHTML = 'Gallery filter';
    let listHTML = '';

    // render filter


    // render works list
    for ( let i=0; i<list.length; i++ ) {
        const work = list[i];

        listHTML += `<div class="work">
                        <img src="./img/work/${work.photo}">
                        <div class="hover">
                            <h5>${work.name}</h5>
                            <div class="tags">${work.tags.join(', ')}</div>
                        </div>
                    </div>`;
    }

    HTML = `<div class="gallery">
                <div class="filter">
                    ${filterHTML}
                </div>
                <div class="list">
                    ${listHTML}
                </div>
            </div>`;

    return DOM.innerHTML = HTML;
}

// job history

// services

// testimonials

// contact me

// footer

