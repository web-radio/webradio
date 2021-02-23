// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAs4WSvyBoODJIi2VgBwZDZTwhRiBm3-e4",
    authDomain: "webradio-3904f.firebaseapp.com",
    databaseURL: "https://webradio-3904f.firebaseio.com",
    projectId: "webradio-3904f",
    storageBucket: "webradio-3904f.appspot.com",
    messagingSenderId: "96382163337",
    appId: "1:96382163337:web:15c8acd210a462da4b6958",
    measurementId: "G-6B26PSM2BT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
analytics = firebase.analytics()

Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
} // Stackoverflow goes brrrr

const searcher = document.querySelector('.searchInput')
const searchSubmit = document.querySelector('.searchSubmit')

const content = document.querySelector('.content')
const description = document.querySelector('.pageDescription')
const settings = document.querySelector('.pageSettings')
const contributors = document.querySelector('.pageContributors')

const settingsBtn = document.querySelector('.settings-button')
const darkModeSwitcher = document.querySelector('#dark-mode-switch')
const switchTop = document.querySelector('.switch-top')
const closeBtn = document.querySelector('.close-button')
const backBtn = document.querySelector('.back-button')

const contributorsBtn = document.querySelector('.contributorsButton')

searchSubmit.addEventListener('click', () => {
    description.style.display = 'none'
    let searchQuery = searcher.value
    analytics.logEvent('search_radios', { query: searchQuery })
    content.innerHTML = ""

    if(searchQuery === "" || searchQuery === "radio") {
        content.innerHTML = '<h1>Ta fraza wyszukiwania spowoduje, że twój komputer się zatnie. Nie rób tak więcej, proszę.</h1>'
    } else {
        if(searchQuery === "/benchmark") searchQuery = ""
        fetch(`https://de1.api.radio-browser.info/json/stations/byname/${searchQuery}`)
            .then(response => response.json())
            .then(data => {
                data.forEach((elem) => {
                    const stationUUID = elem.stationuuid
                    const stationName = elem.name
                    const stationCodec = elem.codec
                    window.stationURL = elem.url_resolved
                    const stationFavicon = elem.favicon
                    const testAudioStream = new Audio(stationURL)

                    const cardTemplate = document.createElement('div')
                    cardTemplate.classList = 'mdc-card mdc-card-outlined'
                    cardTemplate.innerHTML = `<div class="my-card__media mdc-card__media mdc-card__media--16-9"><img src="${stationFavicon}" class="mdc-card__media-content" alt="Station Favicon" width="64" height="64"></div><span class="stationName">${stationName}</span><button data-playing="false" data-radioname="${stationName}" class="controls-play" role="switch" aria-checked="false"><span class="mdi mdi-play play"></span><audio src="${stationURL}"></audio></button>`

                    content.append(cardTemplate)
                })

                const playButton = document.querySelectorAll('.controls-play');
                const icon = document.querySelectorAll('.play')
                const audio = document.querySelectorAll('audio')

                playButton.forEach((button, i) => {
                    button.addEventListener('click', () => {
                        if (button.dataset.playing === 'false') {
                            analytics.logEvent('start_playing_radio', { stationName: button.dataset.radioname })
                            audio[i].play();
                            button.dataset.playing = 'true'
                            icon[i].classList = 'mdi mdi-pause pause'
                            // if track is playing pause it
                        } else if (button.dataset.playing === 'true') {
                            analytics.logEvent('stop_playing_radio', { stationName: button.dataset.radioname })
                            audio[i].pause();
                            button.dataset.playing = 'false'
                            icon[i].classList = 'mdi mdi-play play'
                        }

                        let state = button.getAttribute('aria-checked') === "true" ? true : false
                        button.setAttribute( 'aria-checked', state ? "false" : "true" );
                    })
                })

            })
        }
    })

settingsBtn.addEventListener('click', () => {
    content.innerHTML = ''
    if(settingsBtn.dataset.checked === 'true') {
        content.style.display = 'none'
        description.style.display = 'block'
        settings.style.display = 'none'
        settingsBtn.dataset.checked = 'false'
    } else if(settingsBtn.dataset.checked === 'false'){
        content.style.display = 'none'
        description.style.display = 'none'
        settings.style.display = 'block'
        settingsBtn.dataset.checked = 'true'
    }
})

darkModeSwitcher.addEventListener('click', () => {
    if(darkModeSwitcher.dataset.checked === 'false'){
        darkModeSwitcher.checked = true
        switchTop.classList = 'mdc-switch mdc-switch--checked switch-top'
        darkModeSwitcher.dataset.checked = 'true'
        document.body.style.background = '#121212'
        document.body.style.color = '#fff'
        document.documentElement.style.setProperty('--mdc-theme-surface', '#121212')
        document.documentElement.style.setProperty('--mdc-theme-text-primary-on-background', '#fff')
        document.documentElement.style.setProperty('--mdc-theme-text-icon-on-background', '#fff')

        localStorage.setItem('settings', JSON.stringify({
            'iconColor': "#fff",
            'primaryTextColor': "#fff",
            'cssTextColor': "#fff",
            'cssBackgroundColor': "#121212",
            'surfaceColor': "#121212"
        }))

    } else if(darkModeSwitcher.dataset.checked === 'true') {
        darkModeSwitcher.checked = true
        switchTop.classList = 'mdc-switch switch-top'
        darkModeSwitcher.dataset.checked = 'false'
        document.body.style.background = '#fff'
        document.body.style.color = '#121212'
        document.documentElement.style.setProperty('--mdc-theme-surface', '#fff')
        document.documentElement.style.setProperty('--mdc-theme-text-primary-on-background', '#121212')
        document.documentElement.style.setProperty('--mdc-theme-text-icon-on-background', '#9f9f9f')

        localStorage.setItem('settings', JSON.stringify({
            "iconColor": "#9f9f9f",
            "primaryTextColor": "#121212",
            "cssTextColor": "#121212",
            "cssBackgroundColor": "#fff",
            "surfaceColor": "#fff"
        }))
    }
})

closeBtn.addEventListener('click', () => {
    description.style.display = 'block'
    settings.style.display = 'none'
})

window.addEventListener('load', () =>  {
    window.settingsValues = JSON.parse(localStorage.getItem('settings'))

    if(settingsValues.cssBackgroundColor && settingsValues.cssTextColor && settingsValues.surfaceColor && settingsValues.primaryTextColor && settingsValues.iconColor) {
        document.body.style.background = settingsValues.cssBackgroundColor
        document.body.style.color = settingsValues.cssTextColor
        document.documentElement.style.setProperty('--mdc-theme-surface', settingsValues.surfaceColor)
        document.documentElement.style.setProperty('--mdc-theme-text-primary-on-background', settingsValues.primaryTextColor)
        document.documentElement.style.setProperty('--mdc-theme-text-icon-on-background', settingsValues.iconColor)
        if(settingsValues.cssBackgroundColor !== '#fff') {
            switchTop.classList = 'mdc-switch mdc-switch--checked switch-top'
            darkModeSwitcher.dataset.checked = 'true'

        }
    } else {
        localStorage.setItem('settings', {
            iconColor: '#9f9f9f',
            primaryTextColor: '#121212',
            cssTextColor: '#121212',
            cssBackgroundColor: '#fff',
            surfaceColor: '#fff'
        })
    }
})

contributorsBtn.addEventListener('click', () => {
    content.style.display = 'none'
    description.style.display = 'none'
    settings.style.display = 'none'
    contributors.style.display = 'block'
})

backBtn.addEventListener('click', () => {
    settings.style.display = 'block'
    contributors.style.display = 'none'
})
/*
let lang
const searchButton = document.getElementById("searchbutton");
const content = document.querySelector('#content');
const note = document.getElementById("note")
const searcher = document.getElementById("search");
const settingsIcon = document.getElementsByClassName('settingsIcon')

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
*/
