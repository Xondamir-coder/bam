import './css/style.css';

const preloaderBanner = document.querySelector('.preloader__banner');
const imgContainer = document.querySelector('.main__center');

const handlePreloaderBanner = function () {
	/**
	 * Elements
	 */
	const preloader = document.querySelector('.preloader');

	/**
	 * Every time banner changes
	 */
	const generateRandNum = n => Math.floor(Math.random() * n);
	const numberOfBanners = 8;
	const prevRandNum = localStorage.getItem('prevRandNum');
	let randNum = generateRandNum(numberOfBanners);

	while (randNum == prevRandNum) {
		randNum = generateRandNum(numberOfBanners);
	}

	localStorage.setItem('prevRandNum', randNum);

	const originalPath = `preloader/banner-${randNum}.jpg`;
	const blurredPath = `blurred/banner-${randNum}.jpg`;
	preloaderBanner.style.backgroundImage = `url(${blurredPath})`;

	const img = new Image();
	img.addEventListener('load', () => {
		preloaderBanner.style.backgroundImage = `url(${img.src})`;
		preloaderBanner.style.transition = 'filter 1s, background-image 1s';
		preloaderBanner.classList.remove('lazy-img');
	});
	img.src = originalPath;

	// preloaderBanner.style.backgroundImage = `url(${randImgPath})`;

	const handleMouseClickAndScroll = () => {
		preloader.classList.add('transparent');
		preloader.classList.add('big');
		setTimeout(() => {
			document.body.classList.remove('no-overflow');
			preloader.classList.add('hidden');
			preloader.removeEventListener('click', handleMouseClickAndScroll);
			window.removeEventListener('scroll', handleMouseClickAndScroll);
		}, 500);
	};

	preloader.addEventListener('click', handleMouseClickAndScroll);
	window.addEventListener('scroll', handleMouseClickAndScroll);
};
const handleParallax = () => {
	const bigText = document.querySelector('.main__link');

	const cursor = { x: 0, y: 0 };

	const handleMouseMove = e => {
		cursor.x = (e.clientX / window.innerWidth) * -20;
		cursor.y = (e.clientY / window.innerHeight) * -20;
		preloaderBanner.style.left = `${(cursor.x / 20) * 65}px`;
		preloaderBanner.style.top = `${(cursor.y / 20) * 65}px`;
		imgContainer.style.transform = `translate(${cursor.x}px, ${cursor.y}px)`;
		bigText.style.translate = `${cursor.x * -1}px ${cursor.y * -1}px`;

		/**
		 * Change big text
		 */
		const text = e.target?.parentElement?.dataset.text;
		text ? (bigText.textContent = text) : (bigText.textContent = '');
	};

	window.addEventListener('mousemove', handleMouseMove);
};
const handleImgLoading = () => {
	const handleObserver = (entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const image = entry.target;
				image.src = image.dataset.src;
				image.addEventListener('load', () => {
					image.classList.remove('lazy-img');
				});
				observer.unobserve(image);
			}
		});
	};
	const imagesToLoad = imgContainer.querySelectorAll('img');
	const observer = new IntersectionObserver(handleObserver);
	imagesToLoad.forEach((img, i) => {
		img.classList.add('lazy-img');
		observer.observe(img);
	});
};
handlePreloaderBanner();
handleParallax();
handleImgLoading();
