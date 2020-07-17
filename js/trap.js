"use strict";

(function() {
  const projects = document.querySelector(".projects");
  const trap = document.querySelector(".trap");
  projects.addEventListener("click", () => {
    trap.classList.add("visible");
    projects.classList.add("no-events");

    setTimeout(() => {
      trap.classList.add("disapp");
    }, 2000);
  });
})();
