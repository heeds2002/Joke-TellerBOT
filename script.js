const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// Dissable/Enable button
function toggleButton() {
    button.disabled = !button.disabled;
}



// Passing Joke To Voice RSS API
function tellMe(joke) {
    const jokeString = joke.trim().replace(/ /g, '%20');
    VoiceRSS.speech({
        key:'dd2fdf5236fe45d7ae716e29a568b6da',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


// Get jokes Fom Jokes Api
async function getJokes() {
        let joke = '';

    const apiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,political';
    try{
         const response = await fetch (apiUrl);
         const data = await response.json();
         if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
         } else {
            joke = data.joke;
         }

        //  To-to-Speech
       tellMe(joke); 
    //    Disable Button
    toggleButton();

    } catch (error) {
        // Catch Error Here
        console.log('whoops',error );
    }
 }
// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended',toggleButton);