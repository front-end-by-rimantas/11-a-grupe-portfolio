"use strict";

// header
/**
 * Detektina kokiame aukstyje esame priscroline ir pagal situacija keicia header elemento stiliu
 */
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
/**
 * Skirta generuoti blokinioms sekcijoms (numbers ir services)
 * @param {string} target Vieta kur sugeneruoti norima turini
 * @param {Array.<Object>} list Sarasas duomenu is kuriu generuoti turini
 * @returns {string} I nurodyta vieta iterpia sugeneruota HTML turini
 */
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
/**
 * 
 * @param {Array.<Object>} list 
 */
function renderGallery( list ) {
    const DOM = document.querySelector('#gallery');
    let HTML = '';
    let filterHTML = '';
    let listHTML = '';

    // render filter
    let uniqueTags = [];
    // einame per visus darbus
    for ( let i=0; i<list.length; i++ ) {
        const tags = list[i].tags;
        // einame per visus to darbo tag'us
        for ( let t=0; t<tags.length; t++ ) {
            const tag = tags[t].toLowerCase();
            // tikriname ar tag'as egzistuojame kaupiamame sarase
            if ( uniqueTags.indexOf(tag) === -1 ) {
                uniqueTags.push(tag);
            }
        }
    }
    
    filterHTML += '<div class="item active" data-tag="all">All categories</div>';
    for ( let i=0; i<uniqueTags.length; i++ ) {
        filterHTML += `<div class="item" data-tag="${uniqueTags[i]}">${uniqueTags[i]}</div>`;
    }


    // render works list
    for ( let i=0; i<list.length; i++ ) {
        const work = list[i];

        listHTML += `<div class="work show">
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
    
    // inserting into DOM
    DOM.innerHTML = HTML;
    
    // creating event listeners
    const filterItems = DOM.querySelectorAll('.filter > .item');
    for ( let i=0; i<filterItems.length; i++ ) {
        filterItems[i].addEventListener('click', updateGallery);
    }
    return;
}

function updateGallery( event ) {       //event, ev, e
    const clickedElement = event.target;
    const clickedTag = clickedElement.dataset.tag;
    document.querySelector('.gallery > .filter > .item.active').classList.remove('active');
    clickedElement.classList.add('active');
    const DOMworks = document.querySelectorAll('.gallery > .list > .work');

    if ( clickedTag === 'all' ) {
        for ( let i=0; i<DOMworks.length; i++ ) {
            DOMworks[i].classList.add('show');
        }
        return;
    }
    
    // einame per darbus
    for ( let i=0; i<works.length; i++ ) {
        const work = works[i];
        let show = false;
        
        // einu per darbo tag'us
        for ( let t=0; t<work.tags.length; t++ ) {
            const tag = work.tags[t].toLowerCase();
            if ( clickedTag === tag ) {
                show = true;
            }
        }
        if ( show ) {
            DOMworks[i].classList.add('show');
        } else {
            DOMworks[i].classList.remove('show');
        }
    }

    return;
}

// job history

// services

// testimonials
function renderTestimonials( list ) {
    let HTML = '';
    let listHTML = '';

    // renderinam testimonialsus
    const defaultSelected = Math.floor( list.length / 2 );
    
    for ( let i=0; i<list.length; i++ ) {
        const testimonial = list[i];
        let starHTML = '';
        
        let star = Math.round(testimonial.stars);
        if ( star < 0 ) star = 0;
        if ( star > 5 ) star = 5;

        for ( let sf=0; sf<star; sf++ ) {
            starHTML += `<i class="fa fa-star"></i>`;
        }
        for ( let sf=star; sf<5; sf++ ) {
            starHTML += `<i class="fa fa-star-o"></i>`;
        }

        listHTML += `<div class="testimonial ${i === defaultSelected ? 'show' : ''}"
                            data-index="${i}"
                            style="width: ${100 / list.length}%;">
                        <div class="quote">99</div>
                        <div class="name">${testimonial.name}</div>
                        <div class="stars">
                            ${starHTML}
                        </div>
                        <div class="text">${testimonial.text}</div>
                    </div>`;
    }

    // viska apjungiame
    HTML += `<div class="testimonials">
                <div class="list"
                    style="width: ${list.length}00%;
                            margin-left: -${defaultSelected}00%;"
                    data-visible="${defaultSelected}">
                    ${listHTML}
                </div>
                <div class="controls">
                    <i class="fa fa-angle-left"></i>
                    <div class="grey-bar">
                        <div class="bar" style="width: ${100 / list.length}%;
                                                margin-left: ${100 / list.length * defaultSelected}%;"></div>
                    </div>
                    <i class="fa fa-angle-right"></i>
                </div>
            </div>`;

    // ikeliame i DOM'ą
    const DOMtestimonials = document.querySelector('#testimonials');
    DOMtestimonials.innerHTML = HTML;

    const DOMlist = DOMtestimonials.querySelector('.list');
    const DOMbar = DOMtestimonials.querySelector('.controls .bar');

    // prikabiname reikiamus click eventus
    DOMtestimonials.querySelector('.controls .fa-angle-left')
        .addEventListener('click', () => {
        // rodyti pries tai buvusi
        let index = parseInt(DOMlist.dataset.visible);
        if ( index - 1 === -1 ) index = list.length;

        DOMlist.style.marginLeft = `-${index-1}00%`;
        DOMlist.dataset.visible = index - 1;
        DOMbar.style.marginLeft = 100 / list.length * (index - 1) + '%';
    })

    DOMtestimonials.querySelector('.controls .fa-angle-right')
        .addEventListener('click', () => {
        // rodyti sekanti
        let index = parseInt(DOMlist.dataset.visible);
        if ( index + 1 === list.length ) index = -1;

        DOMlist.style.marginLeft = `-${index+1}00%`;
        DOMlist.dataset.visible = index + 1;
        DOMbar.style.marginLeft = 100 / list.length * (index + 1) + '%';
    })

    return;
}

// testimonials
function renderTestimonialsCarousel( list ) {
    let HTML = '';
    let listHTML = '';

    // originalas: [1, 2, 3]
    // pridedame galini ir priekini klona -> [3, 1, 2, 3, 1]
    list = [list[list.length-1], ...list, list[0]];
    

    // renderinam testimonialsus
    const defaultSelected = Math.floor( list.length / 2 );
    
    for ( let i=0; i<list.length; i++ ) {
        const testimonial = list[i];
        let starHTML = '';
        
        let star = Math.round(testimonial.stars);
        if ( star < 0 ) star = 0;
        if ( star > 5 ) star = 5;

        for ( let sf=0; sf<star; sf++ ) {
            starHTML += `<i class="fa fa-star"></i>`;
        }
        for ( let sf=star; sf<5; sf++ ) {
            starHTML += `<i class="fa fa-star-o"></i>`;
        }

        listHTML += `<div class="testimonial ${i === defaultSelected ? 'show' : ''}"
                            data-index="${i}"
                            style="width: ${100 / list.length}%;">
                        <div class="quote">99</div>
                        <div class="name">${testimonial.name}</div>
                        <div class="stars">
                            ${starHTML}
                        </div>
                        <div class="text">${testimonial.text}</div>
                    </div>`;
    }

    // viska apjungiame
    HTML += `<div class="testimonials">
                <div class="list"
                    style="width: ${list.length}00%;
                            margin-left: -${defaultSelected}00%;"
                    data-visible="${defaultSelected}">
                    ${listHTML}
                </div>
                <div class="controls">
                    <i class="fa fa-angle-left"></i>
                    <div class="grey-bar">
                        <div class="bar" style="width: ${100 / (list.length - 2)}%;
                                                margin-left: ${100 / list.length * defaultSelected}%;"></div>
                    </div>
                    <i class="fa fa-angle-right"></i>
                </div>
            </div>`;

    // ikeliame i DOM'ą
    const DOMtestimonials = document.querySelector('#testimonials_carousel');
    DOMtestimonials.innerHTML = HTML;

    const DOMlist = DOMtestimonials.querySelector('.list');
    const DOMbar = DOMtestimonials.querySelector('.controls .bar');

    let animationLock = false;

    // prikabiname reikiamus click eventus
    DOMtestimonials.querySelector('.controls .fa-angle-left')
        .addEventListener('click', () => {
        // neleidziame paleisti animacijos, jei ji jau prasidejusi
        if ( animationLock ) {
            return;
        }

        // rodyti sekanti
        animationLock = true;

        // rodyti pries tai buvusi
        let index = parseInt(DOMlist.dataset.visible);
        if ( index - 1 === -1 ) index = list.length;

        DOMlist.style.marginLeft = `-${index-1}00%`;
        DOMlist.dataset.visible = index - 1;
        if ( index === 1 ) index = list.length - 1;
        DOMbar.style.marginLeft = 100 / (list.length - 2) * (index - 2) + '%';
        // pasiekeme prieki - teleportuojames i gala
        if ( index === list.length - 1 ) {
            setTimeout(() => {
                DOMlist.classList.add('no-animation');
                DOMlist.dataset.visible = list.length - 2;
                DOMlist.style.marginLeft = `-${list.length - 2}00%`;
            }, 1000)
            setTimeout(() => {
                DOMlist.classList.remove('no-animation');
            }, 1200)
        }
        
        // atlokiname
        setTimeout(() => {
            animationLock = false;
        }, 1200)
    })

    DOMtestimonials.querySelector('.controls .fa-angle-right')
        .addEventListener('click', () => {
        // neleidziame paleisti animacijos, jei ji jau prasidejusi
        if ( animationLock ) {
            return;
        }

        // rodyti sekanti
        animationLock = true;

        let index = parseInt(DOMlist.dataset.visible);
        if ( index === list.length ) index = -1;

        DOMlist.style.marginLeft = `-${index+1}00%`;
        DOMlist.dataset.visible = index + 1;
        if ( index === list.length - 2 ) index = 0;
        DOMbar.style.marginLeft = 100 / (list.length - 2) * index + '%';
        // pasiekeme gala - teleportuojames i prieki
        if ( index === 0 ) {
            setTimeout(() => {
                DOMlist.classList.add('no-animation');
                DOMlist.dataset.visible = 1;
                DOMlist.style.marginLeft = '-100%';
            }, 1000)
            setTimeout(() => {
                DOMlist.classList.remove('no-animation');
            }, 1200)
        }
        
        // atlokiname
        setTimeout(() => {
            animationLock = false;
        }, 1200)

    })

    return;
}

// contact me

// footer

