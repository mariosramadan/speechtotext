chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.transcript) {
    let transcript = request.transcript;

    // Transcribe the words into the specific textarea on the webpage
    let textarea = document.querySelector('#transcript');
    if (textarea) {
      textarea.value += transcript;
      textarea.dispatchEvent(new Event('input'));
    }

    sendResponse({ status: 'success' });
  }
});
