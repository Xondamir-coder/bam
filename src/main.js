import './css/style.css';

const preloaderBanner = document.querySelector('.preloader__banner');

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

	const randImgPath = `./assets/preloader/banner-${randNum}.jpg`;
	const img = document.createElement('img');
	img.src = randImgPath;

	img.addEventListener('load', () => {
		preloaderBanner.style.backgroundImage = `url(${randImgPath})`;
	});

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
	const imgContainer = document.querySelector('.main__center');
	const bigText = document.querySelector('.main__link');

	const cursor = { x: 0, y: 0 };

	const handleMouseMove = e => {
		cursor.x = (e.clientX / window.innerWidth) * -20;
		cursor.y = (e.clientY / window.innerHeight) * -20;
		preloaderBanner.style.left = `${cursor.x}px`;
		preloaderBanner.style.top = `${cursor.y}px`;
		imgContainer.style.transform = `translate(${cursor.x}px, ${cursor.y}px)`;
		bigText.style.translate = `${cursor.x * -1}px ${cursor.y * -1}px`;

		/**
		 * Change big text
		 */
		const text = e.target?.parentElement?.dataset.text;
		if (text) {
			bigText.textContent = text;
		}
	};

	window.addEventListener('mousemove', handleMouseMove);
};
handlePreloaderBanner();
handleParallax();
