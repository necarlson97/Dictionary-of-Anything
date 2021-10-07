var wordLable;
var defLable;

var searchInput;
var editButton;
var editing = false;

var resetButton;

var mwKey = "1a43f169-e34c-4eee-9297-edc5b007aa8d";

window.onload = function() {
    
    wordLable = document.getElementById("wordLable");
    defLable = document.getElementById("defLable");

    searchInput = document.getElementById("search");
    editButton = document.getElementById("editButton");
    resetButton = document.getElementById("resetButton");
}

function search() {
    if(event.key === 'Enter') {
        wordLable.innerHTML = "Loading...";
        defLable.innerHTML = "";
        
        getDefinition(searchInput.value);
        searchInput.value = "";
    }
}

function getDefinition(word) {
    responsiveVoice.speak(word);
    tryLocal(word);
}

function tryLocal(word) {
    var def = localStorage.getItem(word);
    
    if(def == undefined) tryMW(word);
    else {
        resetButton.style.display = "inline";
        display(word, def);
    }
}

function tryMW(word) {
    var searchUrl = "https://www.dictionaryapi.com/api/"+
        "v1/references/collegiate/xml/"+
        word+"?key="+mwKey;
    
    $.ajax({ 
        url: searchUrl, 
        success: function(data) {

            // Check to see if we got MW results
            var wordData = data.getElementById(word+"[1]");
            if(wordData == null) wordData = data.getElementById(word);
            if(wordData == null) {
                tryUrban(word);
                return;
            }
            
            defs = wordData.getElementsByTagName("dt");

            // Iterate through XML, pull out definitions
            var def = "";
            var numb = 1;
            for(var i=0; i<defs.length; i++) {
                var str = defs[i].innerHTML.substr(1);
                if(str.startsWith("<")) continue;
                if(str.startsWith(":")) str = str.substr(1);
                def += numb+". "+str+"\n";
                numb++;

            }

            display(word, def);
        }
    });
}

function tryUrban(word) {
    var searchUrl = "http://api.urbandictionary.com/v0/define?term="+word;

    $.ajax({ 
        url: searchUrl, 
        success: function(data) {
            if(data.list.length > 0) {
                var def = data.list[0].definition;
                if(!def.startsWith("1.")) def = "1. "+def;
                return display(word, def);
            }
            else newWord(word);
        }
    });
}

function newWord(word) {
    var def = generate(word);
    
    
    display(word, def);
}

function display(word, definition) {
    wordLable.innerHTML = word;
    defLable.innerHTML = definition;
}

function edit() {
    editing = !editing;
    if(!editing) {
        var def = defLable.getElementsByTagName("textarea")[0].value;
        writeLocal(wordLable.innerHTML, def);
        getDefinition(wordLable.innerHTML);
        editButton.value = "✎";
    }
    else {
        defLable.innerHTML = '<textarea>'+defLable.innerHTML+'</textarea>';
        editButton.value = "✔";
    }
}

function writeLocal(word, def) {
    localStorage.setItem(word, def);
}

function resetWord() {
    localStorage.removeItem(wordLable.innerHTML);
    getDefinition(wordLable.innerHTML);
    resetButton.style.display = "none"; 
}