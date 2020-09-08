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
The Javascript code  
requests data.json
end note  
  
Browser->Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json  
Server-->Browser: "note1", "2020-09-07"; "note2", "2020-09-07", "note3" etc...  
  
note over Browser:  
The event handler is run and  
the notes are displayed 
end note  
  
![Sequence diagram](/assets/Exercise_0.4.png)