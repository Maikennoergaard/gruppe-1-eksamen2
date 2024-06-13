'use strict';

document.addEventListener("DOMContentLoaded", function() {
    // Function to scroll to the target element with the specified class
    function scrollToElement(className) {
        const targetElement = document.querySelector(`.${className}`);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Add click event listeners to all elements with class 'fold_reply'
    var foldReplyElements = document.querySelectorAll(".fold_reply");
    foldReplyElements.forEach(function(foldReply) {
        foldReply.addEventListener("click", function() {
            // Get the value of "data-target" attribute for the clicked element
            var targetClass = foldReply.getAttribute("data-target");

            // Find the element with the class specified in "data-target"
            var targetElement = document.querySelector(targetClass);

            // Toggle visibility of the target element
            document.querySelectorAll(".reply").forEach(function(reply) {
                if (reply !== targetElement) {
                    reply.classList.remove("visible");
                }
            });
            targetElement.classList.toggle("visible");

            // Scroll to the target element with class 'tekst_foldud_bagom'
            if (targetElement.classList.contains("visible")) {
                scrollToElement('tekst_foldud_bagom');}
            if (targetElement.classList.contains("visible")) {
                scrollToElement('dingsedrik_titel');}
            if (targetElement.classList.contains("visible")) {
                scrollToElement('raevare-video');
            }
        });
    });
});


// læs mere knap
document.getElementById("laesMereKnap").addEventListener("click", function() {
    document.getElementById("indhold").style.display = "block";
    this.style.display = "none";
    document.getElementById("lukKnap").style.display = "flex";
});

document.getElementById("lukKnap").addEventListener("click", function() {
    document.getElementById("indhold").style.display = "none";
    document.getElementById("laesMereKnap").style.display = "flex";
    this.style.display = "none";
});



// Ekstra CSS til styling
const style = document.createElement('style');
style.innerHTML = `
    .reply {
        display: none;
    }
    .reply.visible {
        display: block;
    }
`;
document.head.appendChild(style);
