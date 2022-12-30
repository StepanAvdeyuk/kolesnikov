'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    for (let smoothLink of smoothLinks) {
        smoothLink.addEventListener('click', function (e) {
            e.preventDefault();
            const id = smoothLink.getAttribute('href');
            console.log(`scroll to ${id}`);
            document.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    };


    const language = document.querySelector('.header__language').querySelectorAll('span');

    language.forEach((item) => {
        item.addEventListener('click', (e) => {
            language.forEach(item => {
                item.classList.remove('active');
            });
            e.target.classList.add('active');
        })
    })

    const slideChoise = document.querySelectorAll('.tech__slider-slide');
    const slideItems = document.querySelectorAll('.tech__slider-item');

    slideChoise.forEach((item) => {
        item.addEventListener('click', (e) => {
            slideChoise.forEach(item => {
                item.classList.remove('active');
            });
            e.target.classList.add('active');
            const activeSlide = e.target.getAttribute('data-slide');
            slideItems.forEach(item => {
                item.classList.remove('active');
            });
            slideItems[activeSlide].classList.add('active');

        })
    })

    const faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach(item => {
        item.addEventListener('click', function () {
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                if (this.getAttribute('data-eng') == "1") {
                    this.querySelector('.faq__link').innerHTML = 'Read the answer';
                } else {
                    this.querySelector('.faq__link').innerHTML = 'Читать ответ';
                }
            } else {
                this.classList.add('active');
                if (this.getAttribute('data-eng') == "1") {
                    this.querySelector('.faq__link').innerHTML = 'Hide the answer';
                } else {
                    this.querySelector('.faq__link').innerHTML = 'Скрыть ответ';
                }
            }
        })
    })

    const burger = document.querySelector('.header__burger');
    const sideNav = document.querySelector('.header__sidenav');
    const sideNavClose = document.querySelector('.header__sidenav-close');
    const sideNavA = document.querySelectorAll('a');

    burger.addEventListener('click', () => {
        sideNav.classList.add('active');
        document.body.style.overflow = "hidden";
    })
    sideNavClose.addEventListener('click', () => {
        sideNav.classList.remove('active');
        document.body.style.overflow = "";
    })
    sideNavA.forEach(item => {
        item.addEventListener('click', () => {
            sideNav.classList.remove('active');
            document.body.style.overflow = "";
        })
    })

    // Footer & Form

    const choise = document.querySelector('.footer__choise');
    const choiseP = choise.querySelector('p');
    const choiseUl = choise.querySelector('ul');
    const choiseLi = choiseUl.querySelectorAll('li');

    let ProjectType;

    choise.addEventListener('click', (e) => {
        const path = e.path || (e.composedPath && e.composedPath());
        if (!path.includes(choiseUl)) {
            choiseUl.classList.toggle('active');
        }
    });

    choiseLi.forEach((item) => {
        item.addEventListener('click', (e) => {
            choiseLi.forEach(item => {
                item.classList.remove('active');
            });
            choiseP.innerHTML = `${e.target.textContent}`;
            ProjectType = `${e.target.textContent}`;
            e.target.classList.add('active');
            choiseUl.classList.remove('active');
        });
    })

    const postData = async (url) => {
        const res = await fetch(url, {
            method: "GET"
        });
    };

    const form = document.querySelector('footer').querySelector('form');
    const modal = document.querySelector('.modal__wrapper');
    const modalClose = document.querySelector('.modal__close');

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });


    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        const data = Object.fromEntries(formData.entries());

        data.category = ProjectType;

        postData(`https://kolesnikov.dev/mail.php?name=${data.name}&phone=${data.phone}&category=${data.category}`);

        modal.classList.add('active');

        setTimeout(() => {
            modal.classList.remove('active');
        }, 2000);


    })

    if (document.body.getAttribute('data-nav')) {
        const headerNav = document.querySelector('.header__nav');
        const navA = headerNav.querySelectorAll('a');

        // navA.forEach((item) => {
        //     item.addEventListener('click', (e) => {
        //         navA.forEach(item => {
        //             item.classList.remove('active');
        //         });
        //         e.target.classList.add('active');
        //     })
        // })


        // Создаем новый observer (наблюдатель)
        let observer = new IntersectionObserver(function async(entries) {
            entries.forEach(function (entry) {
                // // Выводим в консоль сам элемент
                //         console.log(entry.target);
                // // Выводим в консоль true (если элемент виден) или false (если нет)
                //         console.log(entry.isIntersecting);
     
                if (entry.isIntersecting) {
                    const index = entry.target.getAttribute('data-active');
                    navA.forEach(item => {
                        item.classList.remove('active');
                    });
                    console.log(index);
                    navA[index].classList.add('active');

                }
            });
        });

        // Задаем элемент для наблюдения

        const helper = document.getElementById('helper');
        const tech = document.getElementById('tech');
        const works = document.getElementById('works');
        const about = document.getElementById('about');
        const papers = document.getElementById('papers');

        // const el = [helper, tech, works, about];
        // console.log(el);

        // Прикрепляем его к «наблюдателю»
        observer.observe(helper);
        observer.observe(tech);
        observer.observe(works);
        observer.observe(papers);
        observer.observe(about);

    }


});