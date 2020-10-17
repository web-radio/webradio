let radios
const searchButton = document.getElementById("searchbutton");
const loadRadios = document.getElementById("loadRadios")
const content = document.querySelector('#content');
const searcher = document.getElementById("search").value
var req = new XMLHttpRequest();

loadRadios.addEventListener("click", () => {
    req.open('GET', 'https://raw.githubusercontent.com/web-radio/webradio/master/radios.json', false);
    req.send(null);
    const list = JSON.parse(req.response)
    list.forEach((elem) => {
        content.innerHTML += `<p>${elem.name}</p><audio src="${elem.url_resolved}" type="${elem.codec}" preload="none" class="radioElementLast" controls></audio>`
    });
});

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
        console.log(searcher)
        req.open('GET', `https://de1.api.radio-browser.info/json/stations/byname/${searcher}`, false);
        req.send(null);
        let radios = JSON.parse(req.response)

        console.log(radios)

        radios.forEach((elem) => {
            content.innerHTML += `<p>${elem.name}</p><audio src="${elem.url_resolved}" type="${elem.codec}" preload="none" class="radioElementLast" controls></audio>`
        });
    }
});