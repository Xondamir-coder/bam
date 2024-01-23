import './css/style.css';

const preloader = document.querySelector('.preloader');
const preloaderBanner = document.querySelector('.preloader__banner');

const handlePreloaderBanner = function () {
	/**
	 * Every time banner changes
	 */
	const prevRandNum = localStorage.getItem('prevRandNum');
	let randNum = Math.floor(Math.random() * 8);

	while (randNum == prevRandNum) {
		randNum = Math.floor(Math.random() * 8);
	}

	localStorage.setItem('prevRandNum', randNum);

	const randImgPath = `./assets/preloader/banner-${randNum}.jpg`;
	const img = document.createElement('img');
	img.src = randImgPath;

	img.addEventListener('load', () => {
		preloaderBanner.style.backgroundImage = `url(${randImgPath})`;
	});

	/**
	 * Banner Parallax
	 */
	const cursor = { x: 0, y: 0 };

	const handleMouseMove = e => {
		cursor.x = (e.clientX / window.innerWidth) * -20;
		cursor.y = (e.clientY / window.innerHeight) * -20;
		preloaderBanner.style.left = `${cursor.x}px`;
		preloaderBanner.style.top = `${cursor.y}px`;
	};
	const handleMouseClickAndScroll = () => {
		preloader.classList.add('transparent');
		preloader.classList.add('big');
		setTimeout(() => {
			document.body.classList.remove('no-overflow');
			preloader.classList.add('hidden');
			preloader.removeEventListener('mousemove', handleMouseMove);
			preloader.removeEventListener('click', handleMouseClickAndScroll);
			window.removeEventListener('scroll', handleMouseClickAndScroll);
		}, 500);
	};

	preloader.addEventListener('mousemove', handleMouseMove);
	preloader.addEventListener('click', handleMouseClickAndScroll);
	window.addEventListener('scroll', handleMouseClickAndScroll);
};
handlePreloaderBanner();
