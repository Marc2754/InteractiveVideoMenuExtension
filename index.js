{
  "name": "InteractiveVideoMenuExtension",
  "version": "1.0.0",
  "description": "An extension that lets you add video entries via a small menu and link them to characters. The AI then analyzes context and commentary to decide which video to use when responding.",
  "ui": {
    "menu": {
      "title": "Video Entry Menu",
      "fields": [
        {
          "id": "videoUrl",
          "label": "Video URL",
          "type": "text",
          "placeholder": "https://example.com/myvideo.mp4"
        },
        {
          "id": "videoTitle",
          "label": "Video Title",
          "type": "text",
          "placeholder": "My Cool Video"
        },
        {
          "id": "videoCommentary",
          "label": "Commentary",
          "type": "textarea",
          "placeholder": "This video illustrates the topic because..."
        },
        {
          "id": "characterLink",
          "label": "Link to Character",
          "type": "dropdown",
          "options": [
            "Alice",
            "Bob",
            "Charlie"
          ]
        }
      ],
      "submitButton": "Save Video Entry"
    }
  },
  "settings": {
    "videos": []
  },
  "logic": {
    "saveVideoEntry": "function(entry) { /* entry is an object with keys: videoUrl, videoTitle, videoCommentary, characterLink */ this.settings.videos.push(entry); /* Optionally persist these settings */ return 'Video entry saved.'; }",
    "selectVideoBasedOnContext": "function(context) { \n  /* 'context' may contain current chat text, current character, sentiment, etc. */\n  var videos = this.settings.videos;\n  if (videos.length === 0) return null;\n  \n  /* Placeholder logic: for now simply choose the first video linked to the active character.\n     In your real implementation, analyze context (e.g. keywords, sentiment, etc.)\n     and choose the best match. */\n  var activeChar = context.activeCharacter || '';\n  for (var i = 0; i < videos.length; i++) {\n    if (videos[i].characterLink === activeChar) {\n      return videos[i];\n    }\n  }\n  return videos[0];\n}",
    "onAnswer": "function(answer, context) { \n  /* 'answer' is the AI response and 'context' is an object with details of the current chat, sentiment, active character, etc. */\n  var video = this.logic.selectVideoBasedOnContext(context);\n  if (video) {\n    var prepended = video.videoTitle + '\\n' + video.videoUrl + '\\n' + video.videoCommentary + '\\n\\n';\n    return prepended + answer;\n  } else {\n    return answer;\n  }\n}"
  }
}