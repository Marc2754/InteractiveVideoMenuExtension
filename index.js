// Example extension file: videoLoopExtension.js

// Ensure this file is loaded by SillyTavern's extensions system
// (For example, by placing it in your extensions folder and referencing it in your configuration.)

// Define settings for the video segment
const videoSettings = {
  videoUrl: "https://packaged-media.redd.it/zapzqp0vv7ie1/pb/m2-res_480p.mp4?m=DASHPlaylist.mpd&v=1&e=1739224800&s=3e8e92896d05c8dad8ab3aff69d792ba11d8dbe0",
  startTime: 0,
  endTime: 5
};

// This function returns an HTML string that includes the video element with an inline script.
// (Note: In some SillyTavern setups, inline scripts may be filtered or require specific handling.)
function getVideoSegmentHTML() {
  return `
    <div class="video-segment">
      <video id="loopVideo" width="640" height="360" autoplay muted controls src="${videoSettings.videoUrl}">
        Your browser does not support the video tag.
      </video>
      <script>
        (function(){
          var video = document.getElementById('loopVideo');
          var start = ${videoSettings.startTime};
          var end = ${videoSettings.endTime};
          video.addEventListener('loadedmetadata', function() {
            video.currentTime = start;
          });
          video.addEventListener('timeupdate', function() {
            if(video.currentTime >= end) {
              video.currentTime = start;
              video.play();
            }
          });
        })();
      <\/script>
    </div>
  `;
}

// This function takes the AI answer and wraps it with the video element.
function modifyAnswer(answer) {
  // Prepend the video segment to the AI's answer
  return getVideoSegmentHTML() + "<div class='ai-answer'>" + answer + "</div>";
}

// Register an onAnswer hook with SillyTavern.
// (The exact API may vary; for example, some versions expect you to call a global function.)
if (typeof registerOnAnswerHook === "function") {
  registerOnAnswerHook(function(answer, context) {
    // Optionally, you can check context (e.g. the active character) to decide whether to include the video.
    return modifyAnswer(answer);
  });
} else {
  console.warn("videoLoopExtension: registerOnAnswerHook not found. Please check your SillyTavern extension API.");
}