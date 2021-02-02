const searchButton = document.getElementById("searchbutton");
const content = document.querySelector('#content');
const searcher = document.getElementById("search");

searchButton.addEventListener("click", () => {
    content.innerHTML = ''
    if (searcher.value === "radios.json" || searcher.value === "all" || searcher.value === "wszystkie") {
        fetch("https://raw.githubusercontent.com/web-radio/webradio/master/radios.json")
            .then(response => response.json())
            .then(data => {
                data.forEach((elem) => {
                    content.innerHTML += `<div><p>${elem.name}</p><audio src="${elem.src}" type="${elem.codec}" preload="none" class="radioElementLast" controls></audio></div>`
                })
            })
    } else {
        fetch(`https://de1.api.radio-browser.info/json/stations/byname/${searcher.value}`)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    content.style.display = "block";
                    content.innerHTML += `<p style="margin-left:auto;margin-right:auto;">No stations found!</p>`
                } else {
                    data.forEach((elem) => {
                        content.style.display = "grid";
                        content.innerHTML += `<div><p>${elem.name}</p><audio src="${elem.url_resolved}" type="${elem.codec}" preload="none" controls></audio></div>`
                    });
                }
            })
    }
});

