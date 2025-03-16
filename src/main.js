import "./baseline-ray";
import "./index-polyfill";
import "./style.css";
import "./intro.css";
import "./readiness.css";
import "./baseline-ray.css";
import "./animation.css";

if ("scrollRestoration" in window.history) {
	window.history.scrollRestoration = "manual";
}

window.scrollTo(0, 0);
