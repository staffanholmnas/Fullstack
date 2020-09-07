Browser->Server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
Server-->Browser: URL-Redirect

note over Browser:
The server asks the browser to do
a new HTTP GET request
end note

Browser->Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/note
Server-->Browser: HTML-code
Browser->Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
Server-->Browser: main.css
Browser->Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
Server-->Browser: main.js

note over Browser:
Javascript executed
end note

Browser->Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
Server-->Browser: The message:"Send test number 8" and the date "2020-09-07"

note over Browser:
The event handler is run and
the message is shown
end note