require("./src/css/style.css");



exports.onInitialClientRender = () => {
    document.addEventListener('scroll', function () {
        var scrollpos = window.scrollY;
        var header = document.getElementById("header");
        var navcontent = document.getElementById("nav-content");
        var toToggle = document.querySelectorAll(".toggleColour");

        /*Apply classes for slide in bar*/
        scrollpos = window.scrollY;

        if (scrollpos > 10) {
            header.classList.add("bg-white");
            //Use to switch toggleColour colours
            for (var i = 0; i < toToggle.length; i++) {
                toToggle[i].classList.add("text-gray-800");
                toToggle[i].classList.remove("text-white");
            }
            header.classList.add("shadow");
            navcontent.classList.remove("bg-gray-100");
            navcontent.classList.add("bg-white");
        }
        else {
            header.classList.remove("bg-white");
            //Use to switch toggleColour colours
            for (var j = 0; j < toToggle.length; j++) {
                toToggle[j].classList.add("text-white");
                toToggle[j].classList.remove("text-gray-800");
            }

            header.classList.remove("shadow");
            navcontent.classList.remove("bg-white");
            navcontent.classList.add("bg-gray-100");
        };
    });


}