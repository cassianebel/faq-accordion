const regions = document.querySelectorAll('div[role="region"]');
const buttons = document.querySelectorAll("button");

function toggleAccordian(e) {
  const isOpen = e.currentTarget.getAttribute("aria-expanded") === "true";
  const controls = e.currentTarget.getAttribute("aria-controls");
  const answer = document.getElementById(controls);

  if (answer) {
    if (!isOpen) {
      // start opening
      answer.hidden = false;
      answer.style.maxHeight = "0";

      requestAnimationFrame(() => {
        void answer.offsetHeight; // force reflow
        answer.style.maxHeight = answer.scrollHeight + "px";
      });

      e.currentTarget.setAttribute("aria-expanded", "true");

      answer.addEventListener(
        "transitionend",
        () => {
          answer.style.maxHeight = ""; // let natural height take over
        },
        { once: true }
      );
    } else {
      // start closing
      answer.style.maxHeight = answer.scrollHeight + "px";
      requestAnimationFrame(() => {
        answer.style.maxHeight = "0";
      });

      e.currentTarget.setAttribute("aria-expanded", "false");

      answer.addEventListener(
        "transitionend",
        () => {
          answer.hidden = true;
          answer.style.maxHeight = "";
        },
        { once: true }
      );
    }
  }
}

regions.forEach((region) => {
  region.hidden = true;
});

buttons.forEach((button) => {
  button.setAttribute("aria-expanded", "false");
  button.addEventListener("click", toggleAccordian);
});
