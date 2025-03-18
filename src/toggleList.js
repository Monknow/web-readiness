const toggleListInput = document.querySelector(`input[name="toggle-list"`);
const readinessSection = document.querySelector(".readiness");

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
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

			await removeRayFromRainbowAnimation.finished;
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

		await rayToListAnimation.finished;
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

			await rayTitleToListAnimation.finished;
			rayTitleToListAnimation.commitStyles();

			return rayTitleToListAnimation.finished;
		})
	);

	toggleListInput.disabled = false;
}

async function animateListToRainbow() {
	toggleListInput.disabled = true;

	const rays = document.querySelectorAll(`baseline-ray ul`);
	const rayTitles = document.querySelectorAll(`baseline-ray strong`);

	await Promise.all(
		Array.from(rays).map(async (ray, index) => {
			const removeRayFromListAnimation = ray.animate(
				{
					clipPath: [`polygon(0 0, 0 0, 0 100%, 0 100%)`],
				},
				{
					duration: 500,
					delay: 50 * index,
					easing: "ease-in",
					fill: "forwards",
				}
			);

			await removeRayFromListAnimation.finished;
			removeRayFromListAnimation.commitStyles();

			return removeRayFromListAnimation.finished;
		}),

		Array.from(rayTitles).map(async (ray, index) => {
			const removeRayTitleFromListAnimation = ray.animate(
				{
					clipPath: [`polygon(0 0, 0 0, 0 100%, 0 100%)`],
				},
				{
					duration: 500,
					delay: 50 * index,
					easing: "ease-in",
					fill: "forwards",
				}
			);

			await removeRayTitleFromListAnimation.finished;
			// removeRayTitleFromListAnimation.commitStyles();

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

			await rayToRainbowAnimation.finished;
			rayToRainbowAnimation.commitStyles();

			return rayToRainbowAnimation.finished;
		})
	);

	rayTitles.forEach(async (rayTitle, index) => {
		removeAnimations(rayTitle);
	});

	toggleListInput.disabled = false;
}

toggleListInput.addEventListener("change", async (event) => {
	if (event.target.checked) {
		await animateRainbowToList();
	} else {
		await animateListToRainbow();
	}
});
