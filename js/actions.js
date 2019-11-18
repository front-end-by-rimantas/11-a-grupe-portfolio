"use strict";

// header
const hamburger = document.querySelector('#main_header .fa-bars');
const close = document.querySelector('#main_header .fa-times');
const header = document.querySelector('#main_header');

// arrow function
hamburger.addEventListener('click', ()=>{
    header.classList.add('mobile-show');
});

// bevarde funkcija
close.addEventListener('click', function(){
    header.classList.remove('mobile-show');
});

// hero

// clients

// about me

// numbers
renderBlocks( 'achievements', numbers );

// skills
renderSkills( skills );

// latest work

// job history

// services
renderBlocks( 'services', services );

// testimonials

// contact me

// footer

