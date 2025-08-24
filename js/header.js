document.addEventListener("DOMContentLoaded", function () {
    fetch("/header.html")
        .then((res) => res.text())
        .then((data) => {
            const header = document.getElementById("header");
            header.innerHTML = data;

            const nav = header.querySelector("nav");
            if (nav) nav.classList.add("slide-down");

            const sidebar = document.getElementById("mobileSidebar");
            const toggler = document.getElementById("mobileToggleBtn");

            if (toggler && sidebar) {
                toggler.addEventListener("click", (e) => {
                    e.stopPropagation();
                    sidebar.classList.toggle("open");
                });

                const dropdown = sidebar.querySelector(".dropdown > .mobile-nav-link");
                if (dropdown) {
                    dropdown.addEventListener("click", (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        dropdown.parentElement.classList.toggle("open");
                    });
                }

                document.addEventListener("click", (e) => {
                    if (!sidebar.contains(e.target) && !toggler.contains(e.target)) {
                        sidebar.classList.remove("open");
                        const dropdownParent = sidebar.querySelector(".dropdown");
                        if (dropdownParent) dropdownParent.classList.remove("open");
                    }
                });
            } else {
                console.warn("햄버거 버튼 또는 사이드바를 찾지 못했습니다.");
            }
        })
        .catch((err) => {
            console.error("헤더 불러오기 실패:", err);
        });
});