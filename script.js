const PREFERED_LANGUAGES = [
    'ru-RU',
    'de-De',
    'it-IT',
    'es-ES',
    'en-GB',
    'en-US',
    'pl-PL'
];

const {speechSynthesis} = window;
const voiceSelect = document.getElementById('voices');
const rate = document.getElementById('rate');
const pitch = document.getElementById('pitch');
const text = document.getElementById('text');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
let pitchValue = document.querySelector('.pitch-value');
let rateValue = document.querySelector('.rate-value');


let voices = [];

// Voice generator
const generateVoices = () => {
    voices = speechSynthesis.getVoices();

    const voiceList = voices.map((voice, index) => PREFERED_LANGUAGES.includes(voice.lang) && 
    `<option value="${index}">${voice.name} ${voice.lang}</option>`)
    .join('');

    voiceSelect.innerHTML = voiceList;
};

// Play
const speak = () => {
    if (speechSynthesis.speaking) return;

    if (text.value) {
        const ssUtterance = new SpeechSynthesisUtterance(text.value);

        ssUtterance.voice = voices[voiceSelect.value];
        ssUtterance.pitch = pitch.value;
        ssUtterance.rate = rate.value;

        speechSynthesis.speak(ssUtterance);
    }
};

generateVoices();

//Upate value
const updateValues = () => {
    rateValue.textContent = rate.value;
    pitchValue.textContent = pitch.value;
};

playBtn.addEventListener('click', speak);
stopBtn.addEventListener('click', () => speechSynthesis.cancel());

speechSynthesis.addEventListener('voiceschanged', generateVoices);
speechSynthesis.addEventListener('error', (e) => {
    alert('Oooops.. Something went wrong. Please refresh page');
});

//Update value on change
pitch.addEventListener('change', updateValues);
rate.addEventListener('change', updateValues);