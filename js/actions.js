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

// on scroll event
window.addEventListener('scroll', headerScroll);
headerScroll();

// hero

// clients

// about me

// numbers
renderBlocks( 'achievements_list', numbers );
renderBlocks( 'achievements_list_2', numbers_2 );

window.addEventListener('scroll', ()=>{
    sectionNumberCounter('#achievements_list');
    sectionNumberCounter('#achievements_list_2');
    // sectionNumberCounter('#success.example-1');
    // sectionNumberCounter('#failure.example-2');
});

// skills
renderSkills( skills );

window.addEventListener('scroll', skillsScroll);
skillsScroll();

// latest work
renderGallery( works );

// job history

// services
renderBlocks( 'services_list', services );

// testimonials
renderTestimonials( testimonials );

// testimonials carousel
renderTestimonialsCarousel( testimonials );

// contact me

// footer
