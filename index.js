const searchButton = document.getElementById("searchbutton");
const content = document.querySelector('#content');
const note = document.getElementById("note")
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
                note.innerHTML = ""
            })
    } else if(searcher.value == "") {
        content.style.display = "block";
        content.innerHTML += `<p style="margin-left:auto;margin-right:auto;">Myśl trochę. Nic nie wpisałeś.</p>`
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
                        content.innerHTML += `<div data-uuid="${elem.stationuuid}"><p>${elem.name}</p><audio src="${elem.url_resolved}" type="${elem.codec}" preload="none" controls></audio><input type="checkbox"></div>`
                    });
                    note.innerHTML = "<p>Note: if several stations with the same name appear, they usually have a different <a style=\"display:inline\" href=\"https://en.wikipedia.org/wiki/Bit_rate\">bitrate</a>.</p>"
                }
            })
    }
});

