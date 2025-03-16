const elements = document.querySelector(".rays");

const updateCustomProperties = () => {
	let index = 0;

	for (let element of elements.children) {
		element.style.setProperty("--sibling-index", index);
		index++;
	}

	elements.style.setProperty("--sibling-count", elements.children.length - 1);
};

updateCustomProperties();

const observer = new MutationObserver(updateCustomProperties);
const config = {attributes: false, childList: true, subtree: false};
observer.observe(elements, config);
