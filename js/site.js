(() => {
    const links = [
        { href: "index.html", label: "Home" },
        { href: "packing.html", label: "Packing List" },
        { href: "day-0.html", label: "Day 0 (Travel Day)" },
        { href: "day-1.html", label: "Day 1" },
        { href: "day-2.html", label: "Day 2" },
        { href: "day-3.html", label: "Day 3" },
        { href: "day-4.html", label: "Day 4" },
        { href: "day-5.html", label: "Day 5" },
        { href: "day-6.html", label: "Day 6" },
        { href: "day-7.html", label: "Day 7" },
        { href: "ship-video.html", label: "Ship Video" },
        { href: "deck-plans.html", label: "Deck Plans" }
    ];

    // ---------- Shared Header / Hamburger ----------
    const headerHost = document.getElementById("site-header");
    if (headerHost) {
        headerHost.innerHTML = `
      <header class="topbar">
        <button class="hamburger" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="menuPanel">
          <span></span><span></span><span></span>
        </button>

        <div class="brand">Sweet 16 Cruise</div>

        <div class="menu" id="menuPanel" hidden>
          <div class="menu__inner">
            <div class="menu__title">Navigate</div>
            <nav class="menu__links">
              ${links.map(l => `<a href="${l.href}">${l.label}</a>`).join("")}
            </nav>
          </div>
        </div>

        <div class="menuBackdrop" id="menuBackdrop" hidden></div>
      </header>
    `;

        const btn = document.getElementById("menuBtn");
        const panel = document.getElementById("menuPanel");
        const backdrop = document.getElementById("menuBackdrop");

        const closeMenu = () => {
            panel.hidden = true;
            backdrop.hidden = true;
            btn.setAttribute("aria-expanded", "false");
        };

        const openMenu = () => {
            panel.hidden = false;
            backdrop.hidden = false;
            btn.setAttribute("aria-expanded", "true");
        };

        btn.addEventListener("click", () => {
            const isOpen = btn.getAttribute("aria-expanded") === "true";
            isOpen ? closeMenu() : openMenu();
        });

        backdrop.addEventListener("click", closeMenu);
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeMenu();
        });

        // Close menu after clicking a link (nice on mobile)
        panel.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
    }

    // ---------- Countdown (only runs if elements exist) ----------
    const elDays = document.getElementById("cd-days");
    const elHours = document.getElementById("cd-hours");
    const elMins = document.getElementById("cd-mins");
    const elSecs = document.getElementById("cd-secs");

    if (elDays && elHours && elMins && elSecs) {
        // Feb 28, 2026 @ 4:00 PM Central (CST is -06:00)
        // If your event is in 2025 instead, change 2026 -> 2025.
        const target = new Date("2026-02-28T16:00:00-06:00").getTime();

        const pad2 = (n) => String(n).padStart(2, "0");

        const tick = () => {
            const now = Date.now();
            let diff = Math.max(0, target - now);

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            diff -= days * (1000 * 60 * 60 * 24);
            const hours = Math.floor(diff / (1000 * 60 * 60));
            diff -= hours * (1000 * 60 * 60);
            const mins = Math.floor(diff / (1000 * 60));
            diff -= mins * (1000 * 60);
            const secs = Math.floor(diff / 1000);

            elDays.textContent = String(days);
            elHours.textContent = pad2(hours);
            elMins.textContent = pad2(mins);
            elSecs.textContent = pad2(secs);
        };

        tick();
        setInterval(tick, 1000);
    }
})();
