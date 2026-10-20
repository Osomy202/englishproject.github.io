
// Find the main elements
const pages = [...document.querySelectorAll(".page")];
const dots = [...document.querySelectorAll(".page-dot")];

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageCount = document.getElementById("pageCount");

const notifications = document.getElementById("notifications");
const settingStatus = document.getElementById("settingStatus");

let currentPage = 0;
const totalPages = pages.length;

// Display a selected page
function showPage(index) {
    // Keep the page index within valid bounds
    if (index < 0 || index >= totalPages) {
        return;
    }

    currentPage = index;

    // Show only the selected page
    pages.forEach((page, i) => {
        const isActive = i === currentPage;

        page.hidden = !isActive;
        page.classList.toggle("active", isActive);
    });

    // Update the navigation indicators
    dots.forEach((dot, i) => {
        const isActive = i === currentPage;

        dot.classList.toggle("active", isActive);

        if (isActive) {
            dot.setAttribute("aria-current", "page");
        } else {
            dot.removeAttribute("aria-current");
        }
    });

    // Update navigation buttons
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages - 1;

    // Update page counter
    pageCount.textContent =
        `Page ${currentPage + 1} of ${totalPages}`;
}

// Previous page
prevBtn.addEventListener("click", () => {
    showPage(currentPage - 1);
});

// Next page
nextBtn.addEventListener("click", () => {
    showPage(currentPage + 1);
});

// Click an indicator to jump directly to a page
dots.forEach((dot) => {
    dot.addEventListener("click", () => {
        showPage(Number(dot.dataset.goTo));
    });
});

// Allow buttons inside pages to navigate
document.querySelectorAll("[data-go-to]").forEach((button) => {
    button.addEventListener("click", () => {
        showPage(Number(button.dataset.goTo));
    });
});

// Example interactive setting
notifications.addEventListener("change", () => {
    settingStatus.textContent = notifications.checked
        ? "Notifications are on."
        : "Notifications are off.";
});

// Initialize the UI
showPage(0);

