document.addEventListener("DOMContentLoaded", function () {
    // ================= Section Scroll & See All =================
    document.querySelectorAll(".section").forEach(section => {
        const container = section.querySelector(".scroll-container");
        const leftBtn = section.querySelector(".leftBtn");
        const rightBtn = section.querySelector(".rightBtn");
        const seeAllBtn = section.querySelector(".seeAllBtn");
        const sectionTitle = section.querySelector(".sectionTitle");
        const heading = section.querySelector("h1"); // section heading

        const otherSections = document.querySelectorAll(".section:not([data-id='" + section.dataset.id + "'])");
        const banner = document.querySelector(".container");
        const categories = document.querySelector(".container1");

        let lastScrollPos = 0;

        // === Update arrow visibility ===
        function updateArrows() {
            if (container.classList.contains("grid-view")) {
                leftBtn.style.display = rightBtn.style.display = "none";
                return;
            }
            leftBtn.style.display = container.scrollLeft <= 0 ? "none" : "flex";
            rightBtn.style.display =
                container.scrollLeft + container.clientWidth >= container.scrollWidth - 1
                    ? "none"
                    : "flex";
        }

        updateArrows();

        // Scroll buttons
        leftBtn.onclick = () => container.scrollBy({ left: -220, behavior: "smooth" });
        rightBtn.onclick = () => container.scrollBy({ left: 220, behavior: "smooth" });

        container.addEventListener("scroll", updateArrows);

        // === See All button ===
        seeAllBtn.onclick = () => {
            if (!container.classList.contains("grid-view")) {
                lastScrollPos = container.scrollLeft;
                container.classList.add("grid-view");
                leftBtn.style.display = rightBtn.style.display = "none";
                sectionTitle.style.display = "block";
                seeAllBtn.style.display = "none";

                if (heading) heading.style.display = "none";
                if (banner) banner.style.display = "none";
                if (categories) categories.style.display = "none";
                otherSections.forEach(sec => sec.style.display = "none");

                history.pushState({ view: "all", section: section.dataset.id }, "", "#all");
            }
        };

        // Browser back/forward
        window.addEventListener("popstate", (event) => {
            if (event.state && event.state.view === "all" && event.state.section === section.dataset.id) {
                container.classList.add("grid-view");
                sectionTitle.style.display = "block";
                seeAllBtn.style.display = "none";
                if (heading) heading.style.display = "none";
                if (banner) banner.style.display = "none";
                if (categories) categories.style.display = "none";
                otherSections.forEach(sec => sec.style.display = "none");
            } else {
                container.classList.remove("grid-view");
                container.scrollLeft = lastScrollPos;
                sectionTitle.style.display = "none";
                seeAllBtn.style.display = "inline-block";
                if (heading) heading.style.display = "block";
                if (banner) banner.style.display = "block";
                if (categories) categories.style.display = "block";
                otherSections.forEach(sec => sec.style.display = "block");
                updateArrows();
            }
        });
    });

    // ================= Search Bar Placeholder =================
    const input = document.querySelector(".SearchBar__Input");
    const placeholderContainer = document.querySelector(".SearchBar__PlaceholderContainer");
    if (input && placeholderContainer) {
        input.addEventListener("input", () => {
            placeholderContainer.style.display = input.value ? "none" : "block";
        });
    }

    // ================= Login Popup =================
    const loginBtn = document.querySelector('.login');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('closeBtn');
    const phoneInput = document.getElementById('phoneInput');
    const continueBtn = document.getElementById('continueBtn');

    if (loginBtn && overlay && closeBtn && phoneInput && continueBtn) {
        // Show popup
        loginBtn.addEventListener('click', () => {
            overlay.style.display = 'flex';
            phoneInput.value = "";
            continueBtn.classList.remove("active");
            continueBtn.disabled = true;
        });

        // Hide popup
        closeBtn.addEventListener('click', () => {
            overlay.style.display = 'none';
        });

        // Hide when clicking outside popup
        window.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.style.display = 'none';
        });

        // Enable continue button on valid phone
        phoneInput.addEventListener('input', () => {
            const phoneNumber = phoneInput.value.trim();
            const phoneRegex = /^[0-9]{10}$/;
            if (phoneRegex.test(phoneNumber)) {
                continueBtn.classList.add("active");
                continueBtn.disabled = false;
            } else {
                continueBtn.classList.remove("active");
                continueBtn.disabled = true;
            }
        });
    }
});