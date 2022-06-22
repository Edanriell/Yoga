import { postData } from "../services/requests.js";
import Notifications from "./notifications.js";
import errorIcon from "../../img/notifications/error.svg";
import warningIcon from "../../img/notifications/warning.svg";
import successIcon from "../../img/notifications/success.svg";

export default class Forms {
	static notification = false;

	constructor({
		triggerForm,
		databaseName,
		spinnerSrc,
		sendDataButton,
		topCoordinates,
		leftCoordinates
	}) {
		this.forms = document.querySelectorAll(triggerForm);
		this.database = databaseName;
		this.spinner = spinnerSrc;
		this.triggerButton = sendDataButton;
		this.top = topCoordinates ?? 50;
		this.left = leftCoordinates ?? 50;
	}

	init() {
		console.log(this.spinner);
		this.forms.forEach(form => {
			this.#bindPostData(form, this.database);
		});
	}

	#bindPostData(form, database) {
		form.addEventListener("submit", e => {
			e.preventDefault();
			this.#displayLoader(form, e.target);
			this.#switchButtonText(this.triggerButton);

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData(`http://localhost:3000/${database}`, json)
				.then(data => {
					console.log(data);
					document.querySelector(".loader").remove();
					Forms.displaySuccess("Данные успешно отправлены.", "success");
				})
				.catch(error => {
					if (error.name === "NetworkError") {
						Forms.displayError(
							`Возможно вы отключены от сети.
               Проверьте свое подключение к сети и повторите попытку отправить данные.`
						);
						document.querySelector(".loader").remove();
					} else if (error instanceof TypeError) {
						Forms.displayError(
							// eslint-disable-next-line max-len
							"Произошла ошибка при отправке данных на сервер. Повторите попытку позже."
						);
						document.querySelector(".loader").remove();
					} else {
						Forms.displayError(error);
						document.querySelector(".loader").remove();
					}
				})
				.finally(() => {
					this.#switchButtonText(this.triggerButton);
					form.reset();
					Forms.notification = false;
				});
		});
	}

	#displayLoader(form, targetButton) {
		const loaderImg = document.createElement("img");
		loaderImg.classList.add("loader");
		loaderImg.src = this.spinner;
		loaderImg.style.cssText = `
        position: absolute;
        height: 52px;
        top: ${this.top}%;
        left: ${this.left}%;
        transform: translate(-50%,-50%);
        z-index: 9999;
      `;
		targetButton.querySelector("button").parentElement.append(loaderImg);
	}

	static displayError(notificationText, notificationType) {
		if (!Forms.notification) {
			Forms.notification = true;
			const notifications = new Notifications({
				notificationText,
				showNotificationAnimationClass: "ErrorFadeIn",
				removeNotificationAnimationClass: "ErrorFadeOut",
				errorIconSrc: errorIcon,
				warningIconSrc: warningIcon,
				successIconSrc: successIcon,
				removeNotificationByTimeout: true,
				timeoutTime: 5000,
				notificationType
			});
			notifications.init();
		}
	}

	static displaySuccess(notificationText, notificationType) {
		const notifications = new Notifications({
			notificationText,
			showNotificationAnimationClass: "ErrorFadeIn",
			removeNotificationAnimationClass: "ErrorFadeOut",
			errorIconSrc: errorIcon,
			warningIconSrc: warningIcon,
			successIconSrc: successIcon,
			removeNotificationByTimeout: true,
			timeoutTime: 5000,
			notificationType
		});
		notifications.init();
	}

	#switchButtonText(selector) {
		console.log(selector);
		const button = document.querySelector(selector);
		// eslint-disable-next-line no-unused-expressions
		button.style.color === "transparent"
			? (button.style.color = "white")
			: (button.style.color = "transparent");
	}
}
