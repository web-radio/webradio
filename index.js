// req.open('GET', 'https://raw.githubusercontent.com/web-radio/webradio/master/radios.json', false); 
//req.send(null);
// const radios = JSON.parse(req.response)

let radios
const searchButton = document.getElementById("searchbutton");
const content = document.querySelector('#content');

searchButton.addEventListener("click", () => {
	content.innerHTML = ''
	var req = new XMLHttpRequest();
	const searcher = document.getElementById("search").value
  req.open('GET', `https://de1.api.radio-browser.info/json/stations/byname/${searcher}`, false); 
  req.send(null);
  let radios = JSON.parse(req.response)
	
	console.log(radios)

	radios.forEach((elem) => {
		content.innerHTML += `<p>${elem.name}</p><audio src="${elem.url_resolved}" type="${elem.codec}" preload="none" class="radioElementLast" controls></audio>`
});
});

