document.addEventListener("DOMContentLoaded", function () {
    const BASE_URL = "/APP";

    const baseImages = {
        // Icons
        "bite": `${BASE_URL}/images/icons/bite.png`,
        "boot": `${BASE_URL}/images/icons/boot.png`,
      

        // Equipment
        "alchemist satchel": `${BASE_URL}/images/equipment/alchemist satchel.png`
       
    };

    function replaceKeywordsWithImages(text) {
        const pattern = new RegExp(`(${Object.keys(baseImages).join("|")});(\\d+)?(?:;([\\w\\-/]+))?`, "gi");

        return text.replace(pattern, function (match, key, size, linkBase) {
            const cleanKey = key.toLowerCase();
            const src = baseImages[cleanKey];
            if (!src) return match;

            const imgTag = size
                ? `<img src="${src}" alt="${key}" style="max-width:${size}px; vertical-align:middle;">`
                : `<img src="${src}" alt="${key}" style="height:1em; vertical-align:middle;">`;

            if (linkBase) {
                return `<a href="${linkBase}.html">${imgTag}</a>`;
            } else if (src.includes("/icons/")) {
                return `<a href="${BASE_URL}/Icons.html#${cleanKey.replace(/\s+/g, "-")}">${imgTag}</a>`;
            } else {
                return imgTag;
            }
        });
    }

    function processContent() {
        document.querySelectorAll(".md-content").forEach(el => {
            el.innerHTML = replaceKeywordsWithImages(el.innerHTML);
        });
    }

    processContent();
    const observer = new MutationObserver(() => processContent());
    observer.observe(document.querySelector(".md-content"), {
        childList: true,
        subtree: true
    });
});
