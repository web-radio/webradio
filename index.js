let radios
const searchButton = document.getElementById("searchbutton");
const content = document.querySelector('#content');
const searcher = document.getElementById("search");
const req = new XMLHttpRequest();

searchButton.addEventListener("click", () => {
    content.innerHTML = ''
    if (searcher == "radios.json") {
        req.open('GET', 'https://raw.githubusercontent.com/web-radio/webradio/master/radios.json', false);
        req.send(null);
        const list = JSON.parse(req.response)
        list.forEach((elem) => {
            content.innerHTML += `<p>${elem.name}</p><audio src="${elem.url_resolved}" type="${elem.codec}" preload="none" class="radioElementLast" controls></audio>`
        });
    } else {
        console.log(searcher.value)
        req.open('GET', `https://de1.api.radio-browser.info/json/stations/byname/${searcher.value}`, false);
        req.send(null);
        let radios = JSON.parse(req.response)

        console.log(radios)

        if (radios.length == 0) {
            content.style.display = "block";
            content.innerHTML += `<p style="margin-left:auto;margin-right:auto;">Nie znaleziono żadnych stacji!</p>`
        }

        radios.forEach((elem) => {
            content.style.display = "grid";
            content.innerHTML += `<p>${elem.name}</p><audio src="${elem.url_resolved}" type="${elem.codec}" preload="none" class="radioElementLast" controls></audio>`
        });
    }
});

