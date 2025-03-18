import "./baseline-ray";
import "./index-polyfill";
import "./toggleList";
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
