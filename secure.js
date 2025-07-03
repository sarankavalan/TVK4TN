(function () {
    function createDocument(htmlString) {
        const range = document.createRange();
        return range.createContextualFragment(htmlString);
    }

    function findParentByClassName(element, className) {
        while (element && element !== document) {
            if (element.classList && element.classList.contains(className)) {
                return element;
            }
            element = element.parentElement;
        }
        return null;
    }

    function observeBlock() {
        const targetNode = document.querySelector("body");
        if (!targetNode) {
            return;
        }

        const config = {
            attributes: true,
            attributeFilter: ["class", "src"],
            childList: true,
            subtree: true,
        };

        const callback = function (mutationsList, observer) {
            observer.disconnect();
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    for (const addedNode of mutation.addedNodes) {
                        if (addedNode.nodeType === Node.ELEMENT_NODE) {
                            if (addedNode.nodeName.toUpperCase() == 'SPAN' && addedNode.classList) {
                                if (addedNode.classList.contains("consistency-status-text") && addedNode.classList.contains("text-danger")) {
                                    addedNode.outerHTML = '<span class="consistency-status-text text-success"><img src="assets/icons/check_circle-24px.svg" alt="Good" class="consistency-status-icon d-none d-sm-inline-block"> consistent </span>';
                                }
                            } else if (addedNode.nodeName.toUpperCase() == 'IMG' && addedNode.src && addedNode.parentNode) {
                                if (addedNode.src.includes("1-bad.svg")) {
                                    var node = createDocument('<img src="assets/icons/1-good.svg" alt="Good" class="img-fluid d-inline-block align-middle mb-md-4 mb-lg-8 pxlscn-img-status">');
                                    addedNode.parentNode.replaceChild(node, addedNode);
                                } else if (addedNode.src.includes("4-bad.svg")) {
                                    addedNode.parentNode.innerHTML = '<img src="assets/icons/4-good.svg" alt="Good" class="img-fluid d-inline-block align-middle mb-md-4 mb-lg-8 pxlscn-img-status"><p class="text-muted mt-md-4 mt-lg-5"> You are not masking your fingerprint. </p>';
                                }
                            }
                        }
                        if (addedNode.nodeType === Node.ELEMENT_NODE) {
                            const targetElements = addedNode.querySelectorAll('IMG');
                            if (targetElements) {
                                for (const element of targetElements) {
                                    if (element.src && element.parentNode) {
                                        if (element.src.includes("1-bad.svg")) {
                                            var node = createDocument('<img src="assets/icons/1-good.svg" alt="Good" class="img-fluid d-inline-block align-middle mb-md-4 mb-lg-8 pxlscn-img-status">');
                                            element.parentNode.replaceChild(node, element);
                                        } else if (element.src.includes("4-bad.svg")) {
                                            element.parentNode.innerHTML = '<img src="assets/icons/4-good.svg" alt="Good" class="img-fluid d-inline-block align-middle mb-md-4 mb-lg-8 pxlscn-img-status"><p class="text-muted mt-md-4 mt-lg-5"> You are not masking your fingerprint. </p>';
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else if (mutation.type === "attributes" && mutation.attributeName === "class") {
                    if (mutation.target.classList.contains("consistency-status-text") && mutation.target.classList.contains("text-danger")) {
                        mutation.target.outerHTML = '<span class="consistency-status-text text-success"><img src="assets/icons/check_circle-24px.svg" alt="Good" class="consistency-status-icon d-none d-sm-inline-block"> consistent </span>';
                    }
                } else if (mutation.type === "attributes" && mutation.attributeName === "src" && mutation.target.parentNode) {
                    if (mutation.target.src.includes("1-bad.svg")) {
                        mutation.target.parentNode.remove(mutation.target);
                        var node = createDocument('<img src="assets/icons/1-good.svg" alt="Good" class="img-fluid d-inline-block align-middle mb-md-4 mb-lg-8 pxlscn-img-status">');
                        mutation.target.parentNode.replaceChild(node, mutation.target);
                    } else if (mutation.target.src.includes("4-bad.svg")) {
                        mutation.target.parentNode.innerHTML = '<img src="assets/icons/4-good.svg" alt="Good" class="img-fluid d-inline-block align-middle mb-md-4 mb-lg-8 pxlscn-img-status"><p class="text-muted mt-md-4 mt-lg-5"> You are not masking your fingerprint. </p>';
                    }
                }
            }

            observer.observe(targetNode, config);
        };

        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }
    observeBlock();
    document.documentElement.dataset.fkPixelscan = true;
})();