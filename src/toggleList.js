const toggleListInput = document.querySelector(`input[name="toggle-list"`);
const readinessSection = document.querySelector(".readiness");
const raysContainer = document.querySelector(".rays");

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function isElementVisibleInContainer(element, container) {
	const rect = element.getBoundingClientRect();
	const containerRect = container.getBoundingClientRect();

	const topIsVisible = rect.top >= containerRect.top && rect.top < containerRect.bottom;
	const bottomIsVisible = rect.bottom > containerRect.top && rect.bottom <= containerRect.bottom;
	const leftIsVisible = rect.left >= containerRect.left && rect.left < containerRect.right;
	const rightIsVisible = rect.right > containerRect.left && rect.right <= containerRect.right;

	return (topIsVisible || bottomIsVisible) && (leftIsVisible || rightIsVisible);
}

function removeAnimations(element) {
	const animations = element.getAnimations();
	animations.forEach((animation) => animation.cancel());
}

async function animateRainbowToList() {
	toggleListInput.disabled = true;

	const rays = document.querySelectorAll(`baseline-ray ul`);
	const rayTitles = document.querySelectorAll(`baseline-ray strong`);

	await Promise.all(
		Array.from(rays).map(async (ray, index) => {
			const removeRayFromRainbowAnimation = ray.animate(
				{
					clipPath: [
						`polygon(-100% -100%, 100% -100%, 120% 120%, 0% 120%)`,
						`polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)`,
					],
				},
				{
					duration: 500,
					delay: 50 * index,
					easing: "ease-in",
					fill: "forwards",
				}
			);

			removeRayFromRainbowAnimation.commitStyles();

			return removeRayFromRainbowAnimation.finished;
		})
	);

	rayTitles.forEach(async (raysTitle, index) => {
		raysTitle.style["clip-path"] = `polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)`;
	});

	await delay(300);

	readinessSection.classList.toggle("rainbow");
	readinessSection.classList.toggle("list");
	raysContainer.scrollTo(0, 0);

	rays.forEach(async (ray, index) => {
		const rayToListAnimation = ray.animate(
			{
				clipPath: [`polygon(0 0, 0 0, 0 100%, 0% 100%)`, `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`],
			},
			{
				duration: 500,
				delay: 200 + 50 * index,
				easing: "ease-in",
				fill: "forwards",
			}
		);

		rayToListAnimation.commitStyles();
	});

	await Promise.all(
		Array.from(rayTitles).map(async (rayTitle, index) => {
			const rayTitleToListAnimation = rayTitle.animate(
				{
					clipPath: [`polygon(0 0, 0 0, 0 100%, 0% 100%)`, `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`],
				},
				{
					duration: 500,
					delay: 50 * index,
					easing: "ease-in",
					fill: "forwards",
				}
			);

			rayTitleToListAnimation.commitStyles();

			return rayTitleToListAnimation.finished;
		})
	);

	toggleListInput.disabled = false;
}

async function animateListToRainbow() {
	toggleListInput.disabled = true;
	raysContainer.classList.toggle("stop-scrolling");

	const rays = document.querySelectorAll(`baseline-ray ul`);
	const rayTitles = document.querySelectorAll(`baseline-ray strong`);

	await Promise.all(
		Array.from(rays).map(async (ray, index) => {
			let duration = isElementVisibleInContainer(ray, raysContainer) ? 500 : 0;
			let delay = isElementVisibleInContainer(ray, raysContainer) ? 50 * index : 0;

			const removeRayFromListAnimation = ray.animate(
				{
					clipPath: [`polygon(0 0, 0 0, 0 100%, 0 100%)`],
				},
				{
					duration,
					delay,
					easing: "ease-in",
					fill: "forwards",
				}
			);

			removeRayFromListAnimation.commitStyles();

			return removeRayFromListAnimation.finished;
		}),

		Array.from(rayTitles).map(async (rayTitle, index) => {
			let duration = isElementVisibleInContainer(rayTitle, raysContainer) ? 500 : 0;
			let delay = isElementVisibleInContainer(rayTitle, raysContainer) ? 50 * index : 0;

			const removeRayTitleFromListAnimation = rayTitle.animate(
				{
					clipPath: [`polygon(0 0, 0 0, 0 100%, 0 100%)`],
				},
				{
					duration,
					delay,
					easing: "ease-in",
					fill: "forwards",
				}
			);

			return removeRayTitleFromListAnimation.finished;
		})
	);

	readinessSection.classList.toggle("rainbow");
	readinessSection.classList.toggle("list");

	await Promise.all(
		Array.from(rays).map(async (ray, index) => {
			const rayToRainbowAnimation = ray.animate(
				{
					clipPath: [
						`polygon(0 100%, 100% 100%, 100% 100%, 0 100%)`,
						`polygon(-100% -100%, 100% -100%, 120% 120%, 0% 120%)`,
					],
				},
				{
					duration: 400,
					delay: 30 * index,
					easing: "ease-in",
					fill: "forwards",
				}
			);

			rayToRainbowAnimation.commitStyles();

			return rayToRainbowAnimation.finished;
		})
	);

	rayTitles.forEach(async (rayTitle, index) => {
		removeAnimations(rayTitle);
	});

	toggleListInput.disabled = false;
	raysContainer.classList.toggle("stop-scrolling");
}

toggleListInput.addEventListener("change", async (event) => {
	if (event.target.checked) {
		await animateRainbowToList();
	} else {
		await animateListToRainbow();
	}
});
