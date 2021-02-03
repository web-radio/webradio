let lang
const searchButton = document.getElementById("searchbutton");
const content = document.querySelector('#content');
const note = document.getElementById("note")
const searcher = document.getElementById("search");

const langCheckbox = document.querySelector("#langCheckbox")

const subheader = document.querySelector("#subheader")
const searchLabel = document.querySelector("#searchLabel")
const langLabel = document.querySelector("#langLabel")
const legacyInfo = document.querySelector("#legacyInfo")

langCheckbox.addEventListener("click", () => {
    if (langCheckbox.checked) {
        fetch("https://raw.githubusercontent.com/web-radio/webradio/master/languages/polish.json")
            .then(response => response.json())
            .then(data => {
                lang = data
                subheader.textContent = data.header
                searchLabel.textContent = data.searchText
                langLabel.textContent = data.langInfo
                legacyInfo.textContent = data.legacyInfo
            })
    } else {
        fetch("https://raw.githubusercontent.com/web-radio/webradio/master/languages/english.json")
            .then(response => response.json())
            .then(data => {
                lang = data
                subheader.textContent = data.header
                searchLabel.textContent = data.searchText
                langLabel.textContent = data.langInfo
                legacyInfo.textContent = data.legacyInfo
            })
    }
})

document.addEventListener("DOMContentLoaded", () => {
    fetch("https://raw.githubusercontent.com/web-radio/webradio/master/languages/polish.json")
        .then(response => response.json())
        .then(data => {
            lang = data
            subheader.textContent = data.header
            searchLabel.textContent = data.searchText
            langLabel.textContent = data.langInfo
            legacyInfo.textContent = data.legacyInfo
        })
})

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
        content.innerHTML += `<p style="margin-left:auto;margin-right:auto;">${lang.nothingHere}</p>`
    } else {
        fetch(`https://de1.api.radio-browser.info/json/stations/byname/${searcher.value}`)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    content.style.display = "block";
                    content.innerHTML += `<p style="margin-left:auto;margin-right:auto;">${lang.noStations}</p>`
                    note.innerHTML = ""
                } else {
                    data.forEach((elem) => {
                        content.style.display = "grid";
                        content.innerHTML += `<div data-uuid="${elem.stationuuid}"><p>${elem.name}</p><p>Bitrate: ${elem.bitrate}kbps</p><audio src="${elem.url_resolved}" type="${elem.codec}" preload="none" controls></audio>`
                    });
                    note.innerHTML = `<p>${lang.bitrateInfo} <a style=\"display:inline\" href=\"https://en.wikipedia.org/wiki/Bit_rate\">bitrate</a>.</p>`
                }
            })
    }
});

