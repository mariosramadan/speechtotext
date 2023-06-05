document.addEventListener('DOMContentLoaded', (event) => {
  let toggleButton = document.getElementById('start-btn');
  let transcriptArea = document.getElementById('transcript');

  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.log("Speech Recognition API is not supported in this browser.");
  } else {
    let recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    let silenceStart = null;

    recognition.onresult = function(event) {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          transcriptArea.value += event.results[i][0].transcript;
          silenceStart = null;
        } else {
          if (!silenceStart) silenceStart = new Date().getTime();
        }
      }
    };

    recognition.onerror = function(event) {
      console.error('Speech recognition error', event);
    };

    recognition.onspeechend = function() {
      recognition.stop();
      toggleButton.textContent = 'Start Transcription';
    };

    recognition.onsoundstart = function() {
      silenceStart = null;
    };

    toggleButton.onclick = function() {
      if (toggleButton.textContent === 'Start Transcription') {
        recognition.start();
        toggleButton.textContent = 'Listening...';
      } else {
        recognition.stop();
        toggleButton.textContent = 'Start Transcription';
      }
    };

    setInterval(function() {
      if (silenceStart && new Date().getTime() - silenceStart > 3000) {
        recognition.stop();
        toggleButton.textContent = 'Start Transcription';
      }
    }, 1000);
  }
});
