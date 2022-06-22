export default class Gallery {
	constructor({
		trigger,
		gallerySelector,
		imageMaxWidth,
		imageMaxHeight,
		closeGalleryByEscBtn,
		imageSelector,
		nextImageTrigger,
		prevImageTrigger,
		closeGalleryTrigger,
		counterTotalImages,
		counterCurrentImage
	}) {
		this.imageList = document.querySelectorAll(trigger);
		this.gallery = document.querySelector(gallerySelector);
		this.image = document.querySelector(imageSelector);
		this.totalImages = this.imageList.length;
		this.maxWidth = imageMaxWidth;
		this.maxHeight = imageMaxHeight;
		this.imageIndex = null;
		this.closeGalleryByEsc = closeGalleryByEscBtn;
		this.nextImgBtn = document.querySelector(nextImageTrigger);
		this.prevImgBtn = document.querySelector(prevImageTrigger);
		this.closeBtn = document.querySelector(closeGalleryTrigger);
		this.totalImagesCounter = document.querySelector(counterTotalImages);
		this.currentImage = document.querySelector(counterCurrentImage);
	}

	init() {
		this.imageList.forEach(image => {
			image.addEventListener("click", evt => {
				this.setDataAttributeId();
				this.#showGallery(evt);
			});
		});
		this.nextImgBtn.addEventListener("click", () => {
			this.#switchImage("forward", this.image);
		});
		this.prevImgBtn.addEventListener("click", () => {
			this.#switchImage("backward", this.image);
		});
	}

	setImageDimensions() {
		this.image.style.cssText = `
        max-width: ${this.maxWidth}px;
        max-height: ${this.maxHeight}px;
        `;
	}

	setDataAttributeId() {
		this.imageList.forEach((image, index) => {
			image.setAttribute("dataImageGalleryId", `${index}`);
		});
	}

	#showGallery(evt) {
		const currentClientWidth = document.body.clientWidth;
		const allImages = [...this.imageList];

		this.imageIndex = allImages.indexOf(evt.target);
		this.image.setAttribute("src", this.imageList[this.imageIndex].src);

		this.#initAnimation();
		this.gallery.style.cssText = `
      display: block;
    `;

		this.#scrollBarFix(currentClientWidth);
		this.#closeGallery(this.closeGalleryByEsc);
		this.setImageDimensions();
		this.#imageCounter();
	}

	#switchImage(switchDirection, image) {
		switch (true) {
			case switchDirection === "forward":
				image.removeAttribute("src");
				this.imageIndex++;
				if (this.imageIndex === this.totalImages) {
					this.imageIndex = 0;
				}
				image.setAttribute("src", this.imageList[this.imageIndex].src);
				this.#animateImage(image, "forward");
				this.#imageCounter();
				break;
			case switchDirection === "backward":
				image.removeAttribute("src");
				if (this.imageIndex === 0) {
					this.imageIndex = this.totalImages;
				}
				this.imageIndex--;
				image.setAttribute("src", this.imageList[this.imageIndex].src);
				this.#animateImage(image, "backward");
				this.#imageCounter();
				break;
			default:
				// Create error here "Choosen wrong direction"
				break;
		}
	}

	#closeGallery(escBtn = false) {
		this.closeBtn.addEventListener("click", () => {
			this.#hideGallery();
		});
		if (escBtn) {
			document.addEventListener("keydown", e => {
				if (e.key === "Escape") this.#hideGallery();
			});
		}
	}

	#hideGallery() {
		setTimeout(() => {
			this.#closeAnimation();
			setTimeout(() => {
				this.gallery.style.cssText = `
          display: none;
        `;
				document.body.style.overflow = null;
				document.body.style.paddingRight = 0;
			}, 350);
		}, 300);
	}

	#imageCounter() {
		this.totalImagesCounter.innerText = this.totalImages;
		this.currentImage.innerText = this.imageIndex + 1;
	}

	#scrollBarFix(currentClientWidth) {
		document.body.style.overflow = "hidden";
		const cWidth = document.body.clientWidth;
		document.body.style.paddingRight = `${cWidth - currentClientWidth}px`;
	}

	#animateImage(image, animationDirection) {
		switch (true) {
			case animationDirection === "forward":
				image.classList.add("FadeImageLeft");
				this.#triggerButtonLock();
				if (image.classList.contains("FadeImageLeft")) {
					setTimeout(() => {
						image.classList.remove("FadeImageLeft");
					}, 250);
				}
				break;
			case animationDirection === "backward":
				image.classList.add("FadeImageRight");
				this.#triggerButtonLock();
				if (image.classList.contains("FadeImageRight")) {
					setTimeout(() => {
						image.classList.remove("FadeImageRight");
					}, 250);
				}
				break;
			default:
				// error wrong animationDirection
				break;
		}
	}

	#initAnimation() {
		this.#removeCssClasses();
		this.gallery.classList.add("GalleryFadeIn");
	}

	#closeAnimation() {
		this.#removeCssClasses();
		this.gallery.classList.add("GalleryFadeOut");
	}

	#triggerButtonLock() {
		this.nextImgBtn.style.cssText = `
      pointer-events: none;
    `;
		this.prevImgBtn.style.cssText = `
      pointer-events: none;
    `;
		setTimeout(() => {
			this.nextImgBtn.style.cssText = `
        mouse-events: auto;
      `;
			this.prevImgBtn.style.cssText = `
        mouse-events: auto;
      `;
		}, 250);
	}

	#removeCssClasses() {
		if (this.gallery.classList.contains("GalleryFadeIn")) {
			this.gallery.classList.remove("GalleryFadeIn");
		}
		if (this.gallery.classList.contains("GalleryFadeOut")) {
			this.gallery.classList.remove("GalleryFadeOut");
		}
	}
}
