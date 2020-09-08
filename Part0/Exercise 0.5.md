Browser->Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa  
Server-->Browser: HTML-code  
Browser->Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css  
Server-->Browser: main.css  
Browser->Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js  
Server-->Browser: spa.js  
  
note over Browser:  
The Javascript is executed  
and requests data.json  
end note  
  
Browser->Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json  
Server-->Browser: "note1", date; "note2", date; "note3" etc...",  
  
note over Browser:  
The event handler is run and  
the notes are shown  
end note  
  
![Sequence diagram](/assets/Exercise_0.5.png)