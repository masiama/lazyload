window.addEventListener('load', _ => {
	let timer;
	const load = (cls, ch) => requestAnimationFrame(_ => {
		for (let i of Array.from(document.getElementsByClassName(`progressive load-${cls}`))) {
			const wT = window.pageYOffset;
			const wB = wT + window.innerHeight;
			
			const rect = i.getBoundingClientRect();
			const pT = wT + rect.top;
			const pB = pT + rect.height;
			
			if (wT >= pB || wB <= pT) continue;
			const img = new Image();
			img.src = i.dataset.href;
			if (img.complete) ch(i);
			else img.onload = _ => ch(i);
		}
	});
	const loadBgs = _ => load('bg', i => {
		i.style.backgroundImage = `url(${i.dataset.href})`;
		i.classList.add('replaced');
	});
	const loadImgs = _ => load('img', i => {
		i.src = i.dataset.href;
		i.classList.remove('replace');
		i.classList.add('replaced');
	});
	const scroller = _ => timer = timer || setTimeout(_ => {
		timer = null;
		loadBgs();
		loadImgs();
	}, 0);
	window.addEventListener('scroll', scroller);
	window.addEventListener('resize', scroller);
	loadBgs();
	loadImgs();
});