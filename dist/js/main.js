
const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	burger = document.querySelector('.header__burger'),
	header = document.querySelector('.header');

function slideUp (target, duration=300) {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.boxSizing = 'border-box';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout( () => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
	}, duration);
}

function slideDown (target, duration=300) {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;

	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.scrollHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.boxSizing = 'border-box';
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout( () => {
		//target.style.removeProperty('height');
		target.style.height = 'auto';
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
	}, duration);
}

// =-=-=-=-=-=-=-=-=-=- <image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-

const imageAspectRatio = document.querySelectorAll('.image-aspect-ratio, figure');
imageAspectRatio.forEach(imageAspectRatio => {
	const img = imageAspectRatio.querySelector('img'), style = getComputedStyle(imageAspectRatio);
	if(img) {
		if(img.getAttribute('width') && img.getAttribute('height') && style.position == "relative")
		imageAspectRatio.style.setProperty('--padding-aspect-ratio', Number(img.getAttribute('height')) / Number(img.getAttribute('width')) * 100 + '%');
	}
	
})

// =-=-=-=-=-=-=-=-=-=- </image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=- <click events> -=-=-=-=-=-=-=-=-=-=-

body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}

	// =-=-=-=-=-=-=-=-=-=- <open menu in header> -=-=-=-=-=-=-=-=-=-=-

	if ($('.header__burger')) {
		menu.forEach(element => {
			element.classList.toggle('_mob-menu-active')
		})
	}

	// =-=-=-=-=-=-=-=-=-=- </open menu in header> -=-=-=-=-=-=-=-=-=-=-

	
	
	// =-=-=-=-=-=-=-=-=-=-=-=- <header-drop-down> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const headerNavItemLink = $(".header__nav--list > li.has-sub > a")
	if(headerNavItemLink && getDeviceType() != "desktop") {
	
		const li = headerNavItemLink.parentElement,
		list = li.querySelector('ul'),
		liActive = document.querySelector('.header__nav--list > li._active');
		
		if(!li.classList.contains('_active')) {

			event.preventDefault()

			if(liActive) {

				const listActive = liActive.querySelector('ul');
				liActive.classList.remove('_active')

				slideUp(listActive);

			}

			li.classList.add('_active')

			slideDown(list)

			/* li.classList.remove('_active')

			slideDown(list) */
		}
	
	} else if(!$('.header__nav--list > li')) {
		
		const liActive = document.querySelector('.header__nav--list > li._active');

		if(liActive) {

			const listActive = liActive.querySelector('ul');
			liActive.classList.remove('_active')

			slideUp(listActive);

		}
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </header-drop-down> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <scroll on click to section> -=-=-=-=-=-=-=-=-=-=-=-=
	let scrollTo = $('.scroll-to');
	if(scrollTo) {
		event.preventDefault();
		let section;
	
		section = scrollTo.getAttribute('href') ? document.querySelector(scrollTo.getAttribute('href')) : false;
	
		menu.forEach(elem => {
			elem.classList.remove('_mob-menu-active')
		})
	
		if(section) {
			section.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
		} else {
			body.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
		}
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </scroll on click to section> -=-=-=-=-=-=-=-=-=-=-=-=


	// =-=-=-=-=-=-=-=-=-=-=-=- <footer-drop-down> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const footerNavLink = $(".footer__nav > ul > li.has-sub > a")
	if(footerNavLink) {

		const activeItem = document.querySelector('.footer__nav > ul > li.has-sub._active'),
		list = footerNavLink.parentElement.querySelector('ul');

		if(!footerNavLink.parentElement.classList.contains('_active')) {
			event.preventDefault();

			if(activeItem) {
				const activeList = activeItem.querySelector('ul');
				activeItem.classList.remove('_active')
				slideUp(activeList)
			}

			footerNavLink.parentElement.classList.add('_active');
			slideDown(list)
			
		}/*  else {
			footerNavLink.parentElement.classList.remove('_active');
			slideUp(list)
		} */
	
	} else if(!$('.footer__nav > ul > li.has-sub')) {
		const activeItem = document.querySelector('.footer__nav > ul > li.has-sub._active');

		if(activeItem) {
			const activeList = activeItem.querySelector('ul');
			activeItem.classList.remove('_active')
			slideUp(activeList)
		}
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </footer-drop-down> -=-=-=-=-=-=-=-=-=-=-=-=

})

// =-=-=-=-=-=-=-=-=-=- </click events> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=- <Get-device-type> -=-=-=-=-=-=-=-=-=-=-

const getDeviceType = () => {

	const ua = navigator.userAgent;
	if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
		return "tablet";
	}

	if (
		/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
		ua
		)
	) {
		return "mobile";
	}
	return "desktop";

};

// =-=-=-=-=-=-=-=-=-=- </Get-device-type> -=-=-=-=-=-=-=-=-=-=-


const headerNavItems = document.querySelectorAll('.header__nav--list > li');
headerNavItems.forEach(headerNavItem => {
	if(headerNavItem.querySelector('ul')) {
		headerNavItem.classList.add('has-sub')

		headerNavItem.addEventListener('pointerenter', function () {
			if(getDeviceType() == "desktop") {
				headerNavItem.classList.add('_hover');
			}	
		})

		headerNavItem.addEventListener('pointerleave', function () {
			if(getDeviceType() == "desktop") {
				headerNavItem.classList.remove('_hover');
			}	
		})
	}
})

const footerNavItems = document.querySelectorAll('.footer__nav > ul > li');
footerNavItems.forEach(footerNavItem => {
	if(footerNavItem.querySelector('ul')) footerNavItem.classList.add('has-sub')
})

const aboutServicesTarget = document.querySelectorAll('.about-services__target'),
aboutServiceSlistDescr = document.querySelector('.about-services__list-descr');

//let aboutServicesCheck = false;

aboutServicesTarget.forEach((aboutServicesTarget, index) => {
	aboutServicesTarget.addEventListener('pointerenter', function () {
		if(windowSize >= 992 && !aboutServicesTarget.classList.contains('_active')) {

			document.querySelector('.about-services__target._active').classList.remove('_active');
			aboutServicesTarget.classList.add('_active');

			if(aboutServiceSlistDescr.querySelectorAll('.about-services__list-descr--item')[index]) {
				const item = aboutServiceSlistDescr.querySelectorAll('.about-services__list-descr--item')[index];
				if(aboutServiceSlistDescr.querySelector('.about-services__list-descr--item._active')) {
					aboutServiceSlistDescr.style.minHeight = aboutServiceSlistDescr.querySelector('.about-services__list-descr--item._active').offsetHeight + 'px';
					aboutServiceSlistDescr.querySelector('.about-services__list-descr--item._active').classList.remove('_active');
				}

				aboutServiceSlistDescr.style.minHeight = item.offsetHeight + 'px';
				item.classList.add('_active')
			}
		}
	})

	aboutServicesTarget.addEventListener('click', function () {
		if(windowSize < 992) {
			
			if(aboutServiceSlistDescr.querySelectorAll('.about-services__list-descr--item')[index]) {
				const item = aboutServiceSlistDescr.querySelectorAll('.about-services__list-descr--item')[index];
				if(aboutServiceSlistDescr.querySelector('.about-services__list-descr--item._active')) {
					aboutServiceSlistDescr.querySelector('.about-services__list-descr--item._active').classList.remove('_active');
				}
				item.classList.add('_active')
			}

			document.querySelector('.about-services__target._active').classList.remove('_active');
			aboutServicesTarget.classList.toggle('_active');

			
		}
	})
})

// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let resizeCheck = {}, windowSize = 0;

function resizeCheckFunc(size, minWidth, maxWidth) {
	if (windowSize <= size && (resizeCheck[String(size)] == true || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != false) {
		resizeCheck[String(size)] = false;
		maxWidth(); // < size
	}

	if (windowSize >= size && (resizeCheck[String(size)] == false || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != true) {
		resizeCheck[String(size)] = true;
		minWidth(); // > size
	}
}

const reviewsFooterNav = document.querySelector('.reviews__slider--footer .reviews__nav'),
reviewsNav = document.querySelector('.reviews__header .reviews__nav');

function resize() {

	html.style.setProperty("--height-header", header.offsetHeight + "px");
	html.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
	if(windowSize != window.innerWidth) {
		html.style.setProperty("--svh", window.innerHeight * 0.01 + "px");
	}
	
	windowSize = window.innerWidth

	resizeCheckFunc(992,
	function () {  // screen > 992px

		if(reviewsFooterNav && reviewsNav) {
			if(reviewsFooterNav.querySelector('.splide__arrows')) {
				reviewsNav.append(reviewsFooterNav.querySelector('.splide__arrows'))
			}
		}

	},
	function () {  // screen < 992px

		if(reviewsFooterNav && reviewsNav) {
			if(reviewsNav.querySelector('.splide__arrows')) {
				reviewsFooterNav.append(reviewsNav.querySelector('.splide__arrows'))
			}
		}

	});
	
}

resize();

window.addEventListener('resize', resize)


// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

if(document.querySelector('.about-us__slider')) {

	const aboutUsSlider = new Splide('.about-us__slider', {

		perPage: 4,
		arrows: false,
		pagination: false,
		gap: 20,

		breakpoints: {
			1281: {
				perPage: 3,
			},

			992: {
				perPage: 2,
				gap: 16,
			},

			768: {
				perPage: 1,
			}
		}

	});

	aboutUsSlider.on('mounted', function () {
		aboutUsSlider.options.drag = aboutUsSlider.root.classList.contains('is-overflow') ? true : false
	})

	aboutUsSlider.mount();

}

if(document.querySelector('.reviews__slider')) {

	const reviewsSlider = new Splide('.reviews__slider', {

		perPage: 3,
		pagination: false,
		updateOnMove: true,
		easing: "ease",
		gap: 20,

		breakpoints: {
			1100: {
				perPage: 2,
			},

			768: {
				perPage: 1,
			}
		}

	});

	reviewsSlider.mount();

}

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=


/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <lazyload> -=-=-=-=-=-=-=-=-=-=-=-=

new LazyLoad();

// =-=-=-=-=-=-=-=-=-=-=-=- </lazyload> -=-=-=-=-=-=-=-=-=-=-=-=
 */

/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <animation> -=-=-=-=-=-=-=-=-=-=-=-=

AOS.init({
	disable: "mobile",
});

// =-=-=-=-=-=-=-=-=-=-=-=- </animation> -=-=-=-=-=-=-=-=-=-=-=-=

*/
