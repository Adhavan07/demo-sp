(function() {
    function d(a) {
        "resize" === a.type && (document.body.classList.remove("navbar-dropdown-open"), document.querySelector(".navbar-dropdown").querySelector(".navbar-collapse").classList.remove("show"), document.querySelector(".navbar-dropdown").classList.remove("opened"), Array.from(document.querySelector(".navbar-dropdown").querySelectorAll('.navbar-toggler[aria-expanded="true"]')).forEach(function(a) {
            var b = a.querySelector(a.getAttribute("data-target"));
            b && (b.classList.remove("in"), b.setAttribute("aria-expanded",
                "false"), a.setAttribute("aria-expanded", "false"))
        }));
        var b = document.documentElement.scrollTop;
        Array.from(document.querySelectorAll(".navbar-dropdown")).forEach(function(a) {
            a.matches(".navbar-fixed-top") && (a.matches(".transparent") && !a.classList.contains("opened") && (0 < b ? a.classList.remove("bg-color") : a.classList.add("bg-color")), 0 < b ? a.classList.add("navbar-short") : a.classList.remove("navbar-short"))
        })
    }
    var c;
    ["scroll", "resize"].forEach(function(a) {
        document.addEventListener(a, function(a) {
            clearTimeout(c);
            c = setTimeout(function() {
                d(a)
            }, 10)
        })
    });
    ["show.bs.collapse", "hide.bs.collapse"].forEach(function(a) {
        document.addEventListener(a, function(b) {
            if (b = b.target.closest(".navbar-dropdown")) "show.bs.collapse" === a ? (document.body.classList.add("navbar-dropdown-open"), b.classList.add("opened")) : (document.body.classList.remove("navbar-dropdown-open"), b.classList.remove("opened"), window.dispatchEvent(new Event("scroll.bs.navbar-dropdown.data-api")), b.dispatchEvent(new Event("collapse.bs.navbar-dropdown")))
        })
    });
    document.querySelector("html").classList.contains("is-builder") || document.addEventListener("click", function(a) {
        a = a.target;
        if (!a.classList.contains("nav-link") && !a.parentNode.classList.contains("nav-link")) {
            var b = document.querySelector("#navbarSupportedContent"),
                e = document.querySelector(".navbar-dropdown"),
                c = b.classList.contains("show"),
                d = a.closest(".nav-item a:not(.dropdown-toggle)"),
                e = e.classList.contains("collapsed");
            (window.matchMedia("(max-width: 991px)").matches || e) && (c && !a.closest(".navbar-collapse") ||
                d) && new bootstrap.Collapse(b)
        }
    });
    document.addEventListener("collapse.bs.nav-dropdown", function(a) {
        (a = a.relatedTarget.closest(".navbar-dropdown")) && (a = a.querySelector('.navbar-toggler[aria-expanded="true"]')) && a.dispatchEvent(new Event("click"))
    });
    document.querySelectorAll(".nav-link.dropdown-toggle").forEach(function(a) {
        a.addEventListener("click", function(a) {
            a.preventDefault();
            a.target.parentNode.classList.toggle("open")
        })
    })
})();