function updateModalHeader(paragraphMonthText, paragraphLimitsText, targetHeader) {
	const month = paragraphMonthText;
	const limits = paragraphLimitsText;
	const target = document.querySelector(targetHeader);

	target.innerText = `На ${month} (${limits})`;
}

function updateModalPrice(priceText, targetInput) {
	const price = priceText;
	const target = document.querySelector(targetInput);

	target.value = price;
}

export { updateModalPrice, updateModalHeader };
