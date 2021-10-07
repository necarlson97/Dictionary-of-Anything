function getHash(word) {
    var hash = 7;
    for (var i = 0; i < word.length; i++) {
        hash = hash*31 + word.charCodeAt(i);
    }
    return hash;
} 

function generate(word) {
    var def;

    var hash = getHash(word);
    var r = (hash % 10) / 10;
    if(word.endsWith("ed") || word.endsWith("ing")) def = verb(word, r);
    else if(word.endsWith("ly")) def = adverb(word, r);
    else if(r > .6) def = adj(word, r);
    else if(r > .2) def = noun(word, r);
    else def = verb(word, r);

    return def;
}

function verb(word, r) {
    var def = " is verb for when something is "+getVerb(word, 0)+"s ADVERBly";

    if(r > .6) def = " is a verb for when a NOUN "+getVerb(word, 0)+"s a NOUN";
    else if(r > .3) def = " is a verb for for when someone is "+getVerb(word, 3)+" while they "+getVerb(word, 0);

    return word+def;
}

function adj(word, r) {
    var def = " is an adjective used to describe a NOUN that is both ADJ and ADJ";

    if(r > .6) def = " is an adjective for when you are "+getVerb(word, 1)+" by NOUNS";
    else if(r > .3) def = " is an adjective someone who "+getVerb(word, 0)+"s and "+getVerb(word, 0)+"s frequently";

    return def;
}

function noun(word, r) {
    var def = " is a noun meaning any object that is both ADJ and ADJ";

    if(r > .6) def = " is a noun for the result of combining a NOUN and a NOUN";
    else if(r > .3) def = " is a noun similar to a NOUN, but more ADJ";

    return def;
}

function adverb(word, r) {
    var def = " is an adverb which is similar to ADJ, but for "+getVerb(word, 3);

    return def;
}

var verbs = [
    [ ["be"], ["were"], ["been"] ],
    [ ["have"], ["had"], ["had"] ],
    [  ["do"], ["did"], ["done"] ],
    [  ["say"], ["said"], ["said"] ],
    [  ["go"], ["went"], ["gone"] ],
    [  ["get"], ["got"], ["got"] ],
    [  ["make"], ["made"], ["made"] ],
    [  ["know"], ["knew"], ["known"] ],
    [  ["think"], ["thought"], ["thought"] ],
    [  ["take"], ["took"], ["taken"] ],
    [  ["see"], ["saw"], ["seen"] ],
    [  ["come"], ["came"], ["come"] ],
    [  ["want"], ["wanted"], ["wanted"] ],
    [  ["use"], ["used"], ["used"] ],
    [  ["find"], ["found"], ["found"] ],
    [  ["give"], ["gave"], ["given"] ],
    [  ["tell"], ["told"], ["told"] ],
    [  ["work"], ["worked"], ["worked"] ],
    [  ["call"], ["called"], ["called"] ],
    [  ["try"], ["tried"], ["tried"] ],
    [  ["ask"], ["asked"], ["asked"] ],
    [  ["need"], ["needed"], ["needed"] ],
    [  ["feel"], ["felt"], ["felt"] ],
    [  ["become"], ["became"], ["become"] ],
    [  ["leave"], ["left"], ["left"] ], 
    [  ["put"], ["put"], ["put"] ],
    [  ["mean"], ["meant"], ["meant"] ],
    [  ["keep"], ["kept"], ["kept"] ],
    [  ["let"], ["let"], ["let"] ],
    [  ["begin"], ["began"], ["begun"] ],
    [  ["seem"], ["seemed"], ["seemed"] ],
    [  ["help"], ["helped"], ["helped"] ],
    [  ["show"], ["showed"], ["shown"] ],
    [  ["hear"], ["heard"], ["heard"] ],
    [  ["play"], ["played"], ["played"] ],
    [  ["run"], ["ran"], ["run"] ],
    [  ["move"], ["moved"], ["moved"] ],
    [  ["live"], ["lived"], ["lived"] ],
    [  ["believe"], ["believed"], ["believed"] ],
    [  ["bring"], ["brought"], ["brought"] ],
    [  ["happen"], ["happened"], ["happened"] ],
    [  ["write"], ["wrote"], ["written"] ],
    [  ["sit"], ["sat"], ["sat"] ],
    [  ["stand"], ["stood"], ["stood"] ],
    [  ["lose"], ["lost"], ["lost"] ],
    [  ["pay"], ["paid"], ["paid"] ],
    [  ["meet"], ["met"], ["met"] ],
    [  ["include"], ["included"], ["included"] ],
    [  ["continue"], ["continued"], ["continued"] ],
    [  ["set"], ["set"], ["set"] ], 
    [  ["learn"], ["learned"], ["learned"] ],
    [  ["change"], ["changed"], ["changed"] ],
    [  ["lead"], ["led"], ["led"] ],
    [  ["understand"], ["understood"], ["understood"] ],
    [  ["watch"], ["watched"], ["watched"] ],
    [  ["follow"], ["followed"], ["followed"] ],
    [  ["stop"], ["stopped"], ["stopped"] ],
    [  ["create"], ["created"], ["created"] ],
    [  ["speak"], ["spoke"], ["spoken"] ],
    [  ["read"], ["read"], ["read"] ],
    [  ["spend"], ["spent"], ["spent"] ],
    [  ["grow"], ["grew"], ["grown"] ],
    [  ["open"], ["opened"], ["opened"] ],
    [  ["walk"], ["walked"], ["walked"] ],
    [  ["win"], ["won"], ["won"] ],
    [  ["teach"], ["taught"], ["taught"] ],
    [  ["offer"], ["offered"], ["offered"] ],
    [  ["remember"], ["remembered"], ["remembered"] ],
    [  ["consider"], ["considered"], ["considered"] ],
    [  ["appear"], ["appeared"], ["appeared"] ],
    [  ["buy"], ["bought"], ["bought"] ],
    [  ["serve"], ["served"], ["served"] ],
    [  ["die"], ["died"], ["died"] ],
    [  ["send"], ["sent"], ["sent"] ],
    [  ["build"], ["built"], ["built"] ], 
    [  ["stay"], ["stayed"], ["stayed"] ],
    [  ["fall"], ["fell"], ["fallen"] ],
    [  ["cut"], ["cut"], ["cut"] ],
    [  ["reach"], ["reached"], ["reached"] ],
    [  ["kill"], ["killed"], ["killed"] ],
    [  ["raise"], ["raised"], ["raised"] ],
    [  ["pass"], ["passed"], ["passed"] ],
    [  ["sell"], ["sold"], ["sold"] ],
    [  ["decide"], ["decided"], ["decided"] ],
    [  ["return"], ["returned"], ["returned"] ],
    [  ["explain"], ["explained"], ["explained"] ],
    [  ["hope"], ["hoped"], ["hoped"] ],
    [  ["develop"], ["developed"], ["developed"] ],
    [  ["carry"], ["carried"], ["carried"] ],
    [  ["break"], ["broke"], ["broken"] ],
    [  ["receive"], ["received"], ["received"] ],
    [  ["agree"], ["agreed"], ["agreed"] ],
    [  ["support"], ["supported"], ["supported"] ],
    [  ["hit"], ["hit"], ["hit"] ],
    [  ["produce"], ["produced"], ["produced"] ],
    [  ["eat"], ["ate"], ["eaten"] ],
    [  ["cover"], ["covered"], ["covered"] ],
    [  ["catch"], ["caught"], ["caught"] ],
    [  ["draw"], ["drew"], ["drawn"] ],
    [  ["choose"], ["chose"], ["chosen"] ]
];

function getVerb(word, tense) {
    var h = getHash(word);
    var i = (h) % 100;
    
    i = (i + (i*tense)) % 100;
    
    var v = verbs[i][tense%3]+"";
    if(tense == 3) {
        if(v.endsWith("e")) v = v.substr(0, v.length-1);
        v += "ing";
    }
    return v;
}