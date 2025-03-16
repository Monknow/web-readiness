const API_ENDPOINT = "https://api.webstatus.dev/v1/features/";

class BaselineRay extends HTMLElement {
	constructor() {
		super();
	}

	static get observedAttributes() {
		return ["data-feature"];
	}

	attributeChangedCallback(property, oldValue, newValue) {
		if (oldValue !== newValue) {
			this[property] = newValue;
		}
	}

	async #fetchFeature(endpoint, featureID) {
		try {
			const response = await fetch(endpoint + featureID);
			const data = await response.json();

			return data;
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}

	async connectedCallback() {
		const {browser_implementations, name, spec} = await this.#fetchFeature(API_ENDPOINT, this["data-feature"]);

		const chromeStatus = browser_implementations?.chrome?.status ?? "unavailable";
		const edgeStatus = browser_implementations?.edge?.status ?? "unavailable";
		const firefoxStatus = browser_implementations?.firefox?.status ?? "unavailable";
		const safariStatus = browser_implementations?.safari?.status ?? "unavailable";

		this.innerHTML = `
		<a href="${spec.links[0].link}" target="_blank">
			<ul>
				<li class="safari" data-status="${safariStatus}"></li>
				<li class="firefox" data-status="${firefoxStatus}"></li>
				<li class="edge" data-status="${edgeStatus}"></li>
				<li class="chrome" data-status="${chromeStatus}"></li>
				</ul>
			<strong>${name}</strong>
		</a>	
		`;
	}
}

customElements.define("baseline-ray", BaselineRay);
