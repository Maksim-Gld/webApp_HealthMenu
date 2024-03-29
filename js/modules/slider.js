function slider({ container, slide, nextArrow, preArrow, totalCounter, currentCounter, wrapper, field }) {
    //Slider

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(preArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWraper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWraper).width;

    let slideIndex = 1,
        offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    }
    else {
        total.textContent = slides.length;
        current.textContent = `slideIndex`;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWraper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    })

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = '1';
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDogots(width) * (slides.length - 1)) {
            offset = 0;
        }
        else {
            offset += deleteNotDogots(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        // if (slides.length < 10) {
        //     current.textContent = `0${slideIndex}`;
        // } else {
        //     current.textContent = slideIndex;
        // }

        // dots.forEach(dot => dot.style.opacity = '.5');
        // dots[slideIndex - 1].style.opacity = 1;

        upadateSliderContent();
    })

    prev.addEventListener('click', () => {
        if (offset === 0) {
            offset = deleteNotDogots(width) * (slides.length - 1)
        }
        else {
            offset -= deleteNotDogots(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        // if (slides.length < 10) {
        //     current.textContent = `0${slideIndex}`;
        // } else {
        //     current.textContent = slideIndex;
        // }

        // dots.forEach(dot => dot.style.opacity = '.5');
        // dots[slideIndex - 1].style.opacity = 1;

        upadateSliderContent();
    })

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDogots(width) * (slideTo - 1);

            // if (slides.length < 10) {
            //     current.textContent = `0${slideIndex}`;
            // } else {
            //     current.textContent = slideIndex;
            // }

            // dots.forEach(dot => dot.style.opacity = '.5');
            // dots[slideIndex - 1].style.opacity = 1;

            upadateSliderContent();

            slidesField.style.transform = `translateX(-${offset}px)`;
        })
    })

    function deleteNotDogots(str) {
        return +str.replace(/\D/g, '');
    }

    function upadateSliderContent() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }
}

export default slider;