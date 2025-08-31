const regions = document.querySelectorAll('div[role="region"]');
const buttons = document.querySelectorAll("button");

function toggleAccordian() {
  const isOpen = this.getAttribute("aria-expanded") === "true";
  const controls = this.getAttribute("aria-controls");
  const answer = document.getElementById(controls);

  if (!isOpen) {
    // start opening
    answer.hidden = false;
    answer.style.maxHeight = "0";

    requestAnimationFrame(() => {
      void answer.offsetHeight; // force reflow
      answer.style.maxHeight = answer.scrollHeight + "px";
    });

    this.setAttribute("aria-expanded", "true");

    answer.addEventListener(
      "transitionend",
      () => {
        answer.style.maxHeight = null; // let natural height take over
      },
      { once: true }
    );
  } else {
    // start closing
    answer.style.maxHeight = answer.scrollHeight + "px";
    requestAnimationFrame(() => {
      answer.style.maxHeight = "0";
    });

    this.setAttribute("aria-expanded", "false");

    answer.addEventListener(
      "transitionend",
      () => {
        answer.hidden = true;
        answer.style.maxHeight = null;
      },
      { once: true }
    );
  }
}

regions.forEach((region) => {
  region.setAttribute("hidden", "true");
});

buttons.forEach((button) => {
  button.setAttribute("aria-expanded", "false");
  button.addEventListener("click", toggleAccordian);
});
