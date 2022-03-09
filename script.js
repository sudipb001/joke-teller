const button = document.getElementById('button')
const audioElement = document.getElementById('audio')

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: 'f5e5cf653031476c82e933b9d127a06a',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  })
}

// Get Jokes from Joke API
async function getJokes() {
  let joke = ''
  const apiUrl =
    'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`
    } else {
      joke = data.joke
    }
    // Disable button
    toggleButton()
    // Text-To-Speech
    tellMe(joke)
  } catch (error) {
    // Catch Errors Here
    console.log('Woops', error)
  }
}

// Event Listners
button.addEventListener('click', getJokes)
audioElement.addEventListener('ended', toggleButton)
