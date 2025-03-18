import "./baseline-ray";
import "./index-polyfill";
import "./style.css";
import "./intro.css";
import "./readiness.css";
import "./baseline-ray.css";
import "./animation.css";

// Scroll Back to Top
if ("scrollRestoration" in window.history) {
	window.history.scrollRestoration = "manual";
}

window.scrollTo(0, 0);

// Toggle List Layout

const toggleListInput = document.querySelector(`input[name="toggle-list"`);
const readinessSection = document.querySelector(".readiness");

toggleListInput.addEventListener("change", () => {
	if (!document.startViewTransition) {
		readinessSection.classList.toggle("rainbow");
		readinessSection.classList.toggle("list");
		return;
	}

	document.startViewTransition(() => {
		readinessSection.classList.toggle("rainbow");
		readinessSection.classList.toggle("list");
	});
});
