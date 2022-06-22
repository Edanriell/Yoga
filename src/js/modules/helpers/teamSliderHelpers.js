function disableButtonOnReachBeginning({ swiper, extendParams, on }) {
	const button = document.querySelector(".TeamMembersSliderControls-PrevTeamMember");

	extendParams({
		debugger: true
	});

	on("init", () => {
		if (!swiper.params.debugger) return;
		if (
			swiper.activeIndex === 0 &&
			!button.classList.contains("Button_backgroundColor_transparent")
		) {
			button.classList.remove("Button_backgroundColor_purple");
			button.classList.add("Button_backgroundColor_transparent");
			button.style.cssText = `
        pointer-events: none;
      `;
		}
	});

	on("slideChange", () => {
		if (!swiper.params.debugger) return;
		if (
			swiper.activeIndex === 0 &&
			!button.classList.contains("Button_backgroundColor_transparent")
		) {
			button.classList.remove("Button_backgroundColor_purple");
			button.classList.add("Button_backgroundColor_transparent");
			button.style.cssText = `
        pointer-events: none;
      `;
		} else if (button.classList.contains("Button_backgroundColor_transparent")) {
			button.classList.remove("Button_backgroundColor_transparent");
			button.classList.add("Button_backgroundColor_purple");
			button.style.cssText = `
      pointer-events: auto;
    `;
		}
	});
}

function disableButtonOnReachEnd({ swiper, extendParams, on }) {
	const button = document.querySelector(".TeamMembersSliderControls-NextTeamMember");

	extendParams({
		debugger: true
	});

	on("slideChange", () => {
		if (!swiper.params.debugger) return;
		if (
			swiper.activeIndex === swiper.slides.length - 1 &&
			!button.classList.contains("Button_backgroundColor_transparent")
		) {
			button.classList.remove("Button_backgroundColor_purple");
			button.classList.add("Button_backgroundColor_transparent");
			button.style.cssText = `
        pointer-events: none;
      `;
		} else if (button.classList.contains("Button_backgroundColor_transparent")) {
			button.classList.remove("Button_backgroundColor_transparent");
			button.classList.add("Button_backgroundColor_purple");
			button.style.cssText = `
      pointer-events: auto;
    `;
		}
	});
}

function fractionPagination({ swiper, extendParams, on }) {
	const totalSlides = document.querySelector(".TeamMembersSliderControls-TotalSlides");
	const currentSlide = document.querySelector(".TeamMembersSliderControls-CurrentSlide");

	extendParams({
		debugger: true
	});

	on("init", () => {
		if (!swiper.params.debugger) return;
		totalSlides.innerText = swiper.slides.length;
		currentSlide.innerText = swiper.activeIndex + 1;
	});

	on("slideChange", () => {
		if (!swiper.params.debugger) return;
		currentSlide.innerText = swiper.activeIndex + 1;
	});
}

export { disableButtonOnReachBeginning, disableButtonOnReachEnd, fractionPagination };
