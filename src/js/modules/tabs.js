export default class Tabs {
	constructor({
		triggerBtns,
		itemList,
		elementHideClass,
		showElementAnimation,
		dataAttribute,
		animationType
	}) {
		this.triggers = document.querySelectorAll(triggerBtns);
		this.items = document.querySelector(itemList);
		this.itemsLiveCollection = this.items.children;
		this.container = document.querySelector(".AvailableSubscriptionList");
		this.hideClass = elementHideClass;
		this.showAnimation = showElementAnimation;
		this.attribute = dataAttribute;
		this.animation = animationType;
	}

	init() {
		this.triggers.forEach(item => {
			item.addEventListener("click", event => {
				this.findSubscriptions(
					event.target.getAttribute(this.attribute),
					this.itemsLiveCollection
				);
			});
		});
	}

	findSubscriptions(target, items) {
		const elements = [...items];
		const filteredElements = elements.filter(element => {
			return element.getAttribute(this.attribute) === target;
		});
		this.hideElements(this.itemsLiveCollection);
		this.renderSubscriptions(filteredElements);
	}

	renderSubscriptions(filteredElements) {
		switch (this.animation) {
			case "allAtOnce":
				this.showAllElementsAtOnce(filteredElements);
				break;
			default:
				this.showAllElementsAtOnce(filteredElements);
				break;
		}
	}

	hideElements(items) {
		const elements = [...items];
		elements.forEach(element => {
			if (!element.classList.contains(this.hideClass)) element.classList.add(this.hideClass);
		});
	}

	showAllElementsAtOnce(elements) {
		elements.forEach(element => {
			element.classList.remove(this.hideClass);
			element.classList.add(this.showAnimation);
		});
	}
}
