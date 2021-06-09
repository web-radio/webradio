const featuredStationsContainer = document.getElementsByClassName('featured-stations-container')[0]

// FEATURED STATIONS
fetch('http://localhost:5500/featured-radios.json')
  .then(response => response.json())
  .then(data => {
    const featuredRadios = data

    featuredRadios.forEach(radio => {
        console.log(radio.name)
        
        // UI PART
        const stationDiv = document.createElement('div') // create div element
        stationDiv.classList = 'bd-example h-100 m-1 col-xs-6' // add classes and css styles (inline css currently only for testing)
        stationDiv.style = 'width: 175px;'
        if (radio.id == 3) {
            stationDiv.innerHTML = `
            <img src="${radio.icon}" alt="${radio.name} logo" width="75" height="75" class="rounded mx-auto d-block">
            <span class="mx-auto d-inline-block" style="font-size: 0.78rem;">${radio.name}</span><br>
            <button class="play-btn play-btn-${radio.id} d-block mx-auto"><i class="bi-play" style="font-size: 1.5rem;"></i></button>` // INNER HTML TEMPLATE, SAME AS index.html L73
        } else {
            stationDiv.innerHTML = `
        <img src="${radio.icon}" alt="${radio.name} logo" width="75" height="75" class="rounded mx-auto d-block">
        <span class="mx-auto d-inline-block" style="font-size: 0.9rem;">${radio.name}</span><br>
        <button class="play-btn play-btn-${radio.id} d-block mx-auto"><i class="bi-play" style="font-size: 1.5rem;"></i></button>` // INNER HTML TEMPLATE, SAME AS index.html L73
        }

        featuredStationsContainer.appendChild(stationDiv)

        // TECHNIC PART
        const playbtn = document.querySelector(`.play-btn-${radio.id}`)
        let playing = false
        let station = new Audio(radio.link)

        playbtn.addEventListener('click', () => {
            let icon = playbtn.childNodes[0]

            if(playing == false) {
                playing = true
                station.play()
                icon.classList = 'bi-pause'
            } else {
                playing = false
                station.pause()
                icon.classList = 'bi-play'
            }
        })
    });
  });

// SEARCHING
const submitBtn = document.getElementsByClassName('btn-submit')[0]
const searchField = document.getElementsByClassName('search-field')[0]
const searchResultContainer = document.getElementsByClassName('search-result-container')[0]
const featuredStationsSection = document.getElementsByClassName('featured-stations')[0]
const searchResultSection = document.getElementsByClassName('search-result')[0]
const searchResultHeader = document.getElementsByClassName('search-result-header')[0]

submitBtn.addEventListener('click', () => {
    const searchedRadio = searchField.value

    // MAKE FEATURED STATIONS INVISIBLE    
    featuredStationsSection.style = 'display: none;'
    searchResultSection.style = 'display: block;'
    // FETCH STATIONS FROM API
    fetch(`https://de1.api.radio-browser.info/json/stations/byname/${searchedRadio}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        searchResultContainer.innerHTML = "" // REMOVE SEARCH RESULT CONTAINER HTML
        data.forEach(radio => {
            // UI PART
            searchResultHeader.innerText = `Wyniki wyszukiwania dla "${searchedRadio}"`
            const stationDiv = document.createElement('div') // create div element
            stationDiv.classList = 'bd-example h-100 m-1 col-xs-6' // add classes and css styles (inline css currently only for testing)
            stationDiv.style = 'width: 175px; max-height: 190px;'
            if (!radio.favicon) {
                stationDiv.innerHTML = `
                <img src="https://kwiaciarniaegzotyka.pl/wp-content/uploads/2018/10/kisspng-video-on-demand-retail-website-simple-no-png-5ab1349e1338a3.1123358815215627820787.png" alt="No icon for ${radio.name} logo" width="75" height="75" class="rounded mx-auto d-block">
                    <span class="mx-auto d-inline-block" style="font-size: 0.9rem;">${radio.name}</span><br>
                    <button class="play-btn play-btn-${radio.stationuuid} d-block mx-auto"><i class="bi-play" style="font-size: 1.5rem;"></i></button>` // INNER HTML TEMPLATE, SAME AS index.html L73
            } else {
                stationDiv.innerHTML = `
                    <img src="${radio.favicon}" alt="${radio.name} logo" width="75" height="75" class="rounded mx-auto d-block">
                    <span class="mx-auto d-inline-block" style="font-size: 0.9rem;">${radio.name}</span><br>
                    <button class="play-btn play-btn-${radio.stationuuid} d-block mx-auto"><i class="bi-play" style="font-size: 1.5rem;"></i></button>` // INNER HTML TEMPLATE, SAME AS index.html L73
            }

            searchResultContainer.append(stationDiv)

            // TECHNIC PART
            const playbtn = document.querySelector(`.play-btn-${radio.stationuuid}`)
            let playing = false
            let station = new Audio(radio.url_resolved)

            playbtn.addEventListener('click', () => {
                let icon = playbtn.childNodes[0]

                if(playing == false) {
                    playing = true
                    station.play()
                    icon.classList = 'bi-pause'
                } else {
                    playing = false
                    station.pause()
                    icon.classList = 'bi-play'
                }
            })
        })
    })
})

// additional back feature
document.getElementsByClassName('navbar-brand')[0].addEventListener('click', () => {
    featuredStationsSection.style = 'display: block;'
    searchResultSection.style = 'display: none;'
})