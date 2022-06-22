import "../sass/main.sass";
import "swiper/css";
import Swiper, { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from "swiper";
import {
	disableButtonOnReachBeginning,
	disableButtonOnReachEnd,
	fractionPagination
} from "./modules/helpers/teamSliderHelpers";
import Tabs from "./modules/tabs";
import Gallery from "./modules/gallery.js";
import Modal from "./modules/modal";
import Forms from "./modules/forms";
import Scroll from "./modules/scroll";
import { updateModalPrice, updateModalHeader } from "./modules/helpers/modalHelpers";
import TeamMember1 from "../img/team/1.jpg";
import TeamMember2 from "../img/team/2.jpg";
import TeamMember3 from "../img/team/3.jpg";
import spinner from "../img/spinner.svg";

Swiper.use([Navigation, Pagination, Mousewheel, Keyboard, Autoplay]);

window.addEventListener("load", () => {
	const teamSlider = new Swiper(".TeamSlider", {
		slidesPerView: 1,
		spaceBetween: 50,
		mousewheel: true,
		keyboard: {
			enabled: true,
			onlyInViewport: false
		},
		navigation: {
			nextEl: ".TeamMembersSliderControls-NextTeamMember",
			prevEl: ".TeamMembersSliderControls-PrevTeamMember"
		},
		pagination: {
			el: ".SliderTeamMemberImageBtns",
			clickable: true,
			renderBullet(index, className) {
				return `
        <li class="FullTeamMemberList-Item ${className}">
          <img 
            src="${[TeamMember1, TeamMember2, TeamMember3][index]}" 
            width="125" 
            height="125" 
            class="FullTeamMemberList-Image" 
            alt="Фотография члена команды">
        </li>`;
			}
		},
		modules: [disableButtonOnReachBeginning, disableButtonOnReachEnd, fractionPagination]
	});

	const reviewsSlider = new Swiper(".ReviewsSlider", {
		slidesPerView: 2,
		spaceBetween: 30,
		loop: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: true
		},
		mousewheel: true,
		keyboard: {
			enabled: true,
			onlyInViewport: false
		},
		navigation: {
			nextEl: ".ReviewsSliderControls-NextReview",
			prevEl: ".ReviewsSliderControls-PrevReview"
		}
	});

	const subscriptionTabs = new Tabs({
		triggerBtns: ".SubscriptionTypesList-Button",
		itemList: ".AvailableSubscriptionList",
		elementHideClass: "AvailableSubscriptionList-ItemHidden",
		showElementAnimation: "FadeInSubscription",
		dataAttribute: "dataTab",
		animationType: "allAtOnce"
	});

	const gallery = new Gallery({
		trigger: ".GalleryImageList li img",
		gallerySelector: ".ImageGallery",
		imageSelector: ".ImageGallery-Image",
		imageMaxHeight: 800,
		imageMaxWidth: 1920,
		closeGalleryByEscBtn: true,
		nextImageTrigger: ".ImageGallery-ThirdColumn",
		prevImageTrigger: ".ImageGallery-FirstColumn",
		closeGalleryTrigger: ".ImageGallery-CloseBtn",
		counterTotalImages: ".ImageGallery-TotalImages",
		counterCurrentImage: ".ImageGallery-CurrentImage"
	});

	const subscriptionsModal = new Modal({
		triggerBtns: "[data-modal]",
		modalSelector: "#SubscriptionsModal",
		modalWrapperSelector: "#SubscriptionsModal-Wrapper",
		showAnimationClass: "ModalFadeIn",
		hideAnimationClass: "ModalFadeOut",
		closeModalTriggerBtn: "#CloseSubscriptionsModal",
		closeModalWindowByEsc: true,
		closeModalWindowByClickAndBtn: true,
		helperFunctions: [updateModalPrice, updateModalHeader]
	});

	const lessonModal = new Modal({
		triggerBtns: "[data-modal-lesson]",
		modalSelector: "#FreeLessonModal",
		modalWrapperSelector: "#FreeLessonModal-Wrapper",
		showAnimationClass: "ModalFadeIn",
		hideAnimationClass: "ModalFadeOut",
		closeModalTriggerBtn: "#CloseLessonModal",
		closeModalWindowByEsc: true,
		closeModalWindowByClickAndBtn: true
	});

	const footerForm = new Forms({
		triggerForm: "#FooterForm",
		databaseName: "freeLesson",
		spinnerSrc: spinner,
		sendDataButton: "#FooterForm-SendData",
		topCoordinates: 57,
		leftCoordinates: 48
	});

	const freeLessonModalForm = new Forms({
		triggerForm: "#FreeLessonModalForm",
		databaseName: "freeLesson",
		spinnerSrc: spinner,
		sendDataButton: "#FreeLessonModalForm-SendData"
	});

	const subscriptionsModalForm = new Forms({
		triggerForm: "#SubscriptionsModalForm",
		databaseName: "orderedSubscriptions",
		spinnerSrc: spinner,
		sendDataButton: "#SubscriptionsModalForm-SendData"
	});

	const scroll = new Scroll({
		pageUpButton: ".Pageup",
		entryAnimationClass: "PageupButtonFadeIn",
		outroAnimationClass: "PageupButtonFadeOut"
	});

	teamSlider.init();
	reviewsSlider.init();
	subscriptionTabs.init();
	gallery.init();
	subscriptionsModal.init();
	lessonModal.init();
	footerForm.init();
	freeLessonModalForm.init();
	subscriptionsModalForm.init();
	scroll.init();
});
