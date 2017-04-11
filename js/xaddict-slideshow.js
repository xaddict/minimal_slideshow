/** A function to make modulo in JS behave!
* @param {Number} x the first integer
* @param {Number} y the second integer
* @return {Number} the modulo on x % y
*/
function mod(x, y) {
	return ((x % y) + y) % y;
}

/**
* nextSlide() progresses the slideshow one slide
* is called with nextSlide.bind(slideshow)()
* or in a loop with nextSlide.bind(slideshow)
*/
function nextSlide() {
	var slides = this.slides;
	console.log(slides);
	var index = this.currentIndex;
	for (let i = 0; i < slides.length; i++) {
		slides[i].classList.remove('active', 'prev', 'next');
	}
	for (let i = 0; i < slides.length; i++) {
		if (i === index) {
			var prev = mod(index - 1, slides.length);
			var next = mod(index + 1, slides.length);
			slides[prev].classList.add('prev');
			slides[index].classList.add('active');
			slides[next].classList.add('next');
			if (this.individualHeights) {
				this.style.height = slides[index].offsetHeight + 'px';
			}
		}
	}
	this.currentIndex = (index + 1) % this.slides.length;
}

/** set the initial variables for a slideshow
* @param {HTMLElement} slideshow the slideshow element to initialize on
*/
function initializeSlideshow(slideshow) {
	slideshow.slideshowInitialized = true;
	slideshow.slides = slideshow.children;
	slideshow.currentIndex = 0;
	slideshow.individualHeights = slideshow.getAttribute('data-height') === 'individual';
	if (slideshow.individualHeights) {
		slideshow.style.height = slideshow.slides[slideshow.currentIndex].offsetHeight + 'px';
	} else {
		var slideHeights = [];
		for (var i = 0; i < slideshow.slides.length; i++) {
			var slideHeight = slideshow.slides[i].offsetHeight;
			slideHeights.push(slideHeight);
		}
		var slideshowHeight = Math.max.apply(Math, slideHeights);
		slideshow.style.height = slideshowHeight + 'px';
	}

	nextSlide.bind(slideshow)();
	var delay = parseInt(slideshow.getAttribute('data-delay'), 10) || 0;
	var timeout = parseInt(slideshow.getAttribute('data-timeout'), 10) || 5000;
	setTimeout(function() {
		slideshow.timer = setInterval(nextSlide.bind(slideshow), timeout);
	}, delay);
}

/** initializeSlideshows
* initialize all the slideshows on the page
*/
function initializeSlideshows() {
	// run through all slideshows on the page
	var slideshows = document.querySelectorAll('.slideshow');
	for (var i = 0; i < slideshows.length; i++) {
		var slideshow = slideshows[i];
		initializeSlideshow(slideshow);
	}
}

window.addEventListener('load', initializeSlideshows);
