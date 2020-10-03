var req = new XMLHttpRequest();
req.open('GET', 'https://raw.githubusercontent.com/web-radio/webradio/master/radios.json', false); 
req.send(null);
if(req.status == 200) {
	console.log(JSON.stringify(req.response))
}

const content = document.querySelector('#content');

radios.forEach((elem) => {
		if(elem.last) {
			content.innerHTML += `<p>${elem.name}</p><audio src="${elem.src}" type="${elem.type}" preload="none" class="radioElementLast" controls></audio>`;
		} else {
			content.innerHTML += `<p>${elem.name}</p><audio src="${elem.src}" type="${elem.type}" preload="none" class="radioElement" controls></audio>`;
		}
});