const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav-toggle");

if (nav && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.dataset.open === "true";
    nav.dataset.open = String(!isOpen);
    navToggle.setAttribute("aria-expanded", String(!isOpen));
  });
}

document.querySelectorAll("[data-project-browser]").forEach((browser) => {
  const section = browser.closest("section");
  const cards = Array.from(section.querySelectorAll(".project-card[data-tags]"));
  const search = section.querySelector("[data-project-search]");
  const buttons = Array.from(section.querySelectorAll("[data-filter]"));
  const empty = section.querySelector("[data-empty-state]");
  let activeFilter = "all";

  function applyFilters() {
    const query = (search?.value || "").trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const tags = card.dataset.tags || "";
      const haystack = `${card.dataset.title || ""} ${card.dataset.description || ""}`.toLowerCase();
      const matchesFilter = activeFilter === "all" || tags.split(" ").includes(activeFilter);
      const matchesSearch = !query || haystack.includes(query);
      const isVisible = matchesFilter && matchesSearch;

      card.hidden = !isVisible;
      visibleCount += isVisible ? 1 : 0;
    });

    if (empty) {
      empty.hidden = visibleCount > 0;
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter || "all";
      buttons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      applyFilters();
    });
  });

  search?.addEventListener("input", applyFilters);
});
