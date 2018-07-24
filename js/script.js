"use strict";

(function() {
	var offers = [].slice.call(document.querySelectorAll('.offers__item:not(.offers__item--disabled)'));

	offers.forEach(function(item, i) {
		item.addEventListener("click", onSelect)

		function onSelect(evt) {
			if (evt.target.classList.contains("offers__nolink")) {
				return false;
			}

			item.classList.add("offers__item--selected");
			item.addEventListener("click", onDeselect);
			item.removeEventListener("click", onSelect);
			item.addEventListener("mouseenter", onMouseEnter);
			item.addEventListener("mouseleave", onMouseLeave);	
			console.log(evt.target);		
		}

		function onDeselect(evt) {
			if (evt.target.classList.contains("offers__nolink")) {
				return false;
			}

			item.classList.remove("offers__item--selected");
			item.classList.remove("offers__item--selected--hovered");			
			item.addEventListener("click", onSelect);
			item.removeEventListener("click", onDeselect);
			item.removeEventListener("mouseenter", onMouseEnter);
			item.removeEventListener("mouseleave", onMouseLeave);			
		}	

		function onMouseEnter() {
			item.classList.add("offers__item--selected--hovered");
		}

		function onMouseLeave() {
			item.classList.remove("offers__item--selected--hovered");
		}			

	});
})();
