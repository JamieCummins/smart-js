/**
 * Dutch strings. Placeholders in {braces} are filled at runtime:
 *   {dragon} current dragon, {next} next dragon, {fact} dragon fact,
 *   {stage}, {phase}, {n}, {total}, {part}, {criterion}, {testTrials}, {minutes}
 * Values may contain simple HTML.
 */
const relationClasses = {
  'is hetzelfde als': 'rel-same', 'hetzelfde als': 'rel-same',
  'is het tegenovergestelde van': 'rel-opp', 'het tegenovergestelde van': 'rel-opp',
  'is meer dan': 'rel-more', 'meer dan': 'rel-more',
  'is minder dan': 'rel-less', 'minder dan': 'rel-less',
  'komt voor': 'rel-before', voor: 'rel-before',
  'komt na': 'rel-after', na: 'rel-after',
  'zit in': 'rel-in', in: 'rel-in',
  bevat: 'rel-contains',
};

export default {
  code: 'nl',
  name: 'Nederlands',
  defaultQuestionWord: 'Is',
  relationClass: (rel) => relationClasses[String(rel || '').trim().toLowerCase()] || 'rel-other',
  yes: 'JA',
  no: 'NEE',

  ui: {
    continue: 'Doorgaan',
    beginTraining: 'Begin Training',
    fullscreen: 'Klik hier om over te gaan op fullscreen',
    loading: 'Even geduld, de training wordt geladen…',
    hintButton: 'Tip?',
    minutesLeft: '{n} minuten',
    finished: 'Klaar',
    unloadWarning: 'Je data zal verloren gaan als je de pagina verlaat, ben je zeker dat je de pagina wil sluiten?',
    offline: 'Geen verbinding. Je antwoorden worden bewaard en later verstuurd.',
    error: 'Er ging iets mis. Vraag de onderzoeker om hulp.',
    downloadData: 'Download mijn gegevens (csv)',
  },

  login: {
    title: 'Welkom bij de SMART training!',
    intro: 'Log in met je gebruikersnaam en pincode, of maak een nieuw account als dit je eerste keer is.',
    tabLogin: 'Ik heb al een account',
    tabRegister: 'Dit is mijn eerste keer',
    username: 'Gebruikersnaam',
    usernameHelp: 'Bijvoorbeeld je voornaam en een cijfer, zoals emma3. Geen spaties.',
    pin: 'Pincode',
    pinHelp: 'Een code van 4 tot 8 cijfers. Onthoud deze goed!',
    pinRepeat: 'Herhaal je pincode',
    studyCode: 'Studiecode',
    studyCodeHelp: 'Je krijgt deze code van de onderzoeker of leerkracht.',
    loginButton: 'Inloggen',
    registerButton: 'Account aanmaken',
    errors: {
      username: 'Kies een gebruikersnaam van 2 tot 32 tekens: letters, cijfers, - of _ (geen spaties).',
      pin: 'De pincode moet 4 tot 8 cijfers zijn.',
      pinMismatch: 'De twee pincodes zijn niet hetzelfde.',
      invalid: 'Die gebruikersnaam en pincode kloppen niet. Probeer het opnieuw.',
      taken: 'Die gebruikersnaam bestaat al. Kies een andere, of log in.',
      studyCode: 'De studiecode klopt niet.',
      network: 'Kon geen verbinding maken met de server. Controleer het internet en probeer opnieuw.',
    },
  },

  intro: [
    'Hallo daar! Ik ben Professor SMART en welkom bij SMART Breintraining!<br><br>Het doel van mijn training is om je brein zo slim mogelijk te maken -<br>specifiek door moeilijke problemen snel en correct te kunnen oplossen!<br><br>Maar maak je geen zorgen - ik heb wat assistenten die je zullen helpen.<br>Zie je, ik ben niet alleen een breintrainingsprofessor - ik ben ook een Draken-professor!<br>Samen gaan we op reis door Smartlandia - een magisch land vol met draken - en gaan we heel veel draken ontdekken!<br><br>Een draak kan je vangen met een speciale drakensteen. Hier, je mag die van mij gebruiken!',
    'Maak kennis met jouw allereerste draak - mijn kleine groene vriend, {dragon}!<br><br>{fact}',
    'Dus, hoe werkt mijn training? Er zijn verschillende levels in de training en jouw doel is om er zoveel mogelijk te doorlopen!<br><br>Elk level bestaat uit een aantal oefeningen. Zo ziet een oefening eruit:<br><br><br>CUG is hetzelfde als JOM<br>JOM is hetzelfde als VEK<br><br>Vraag: Is CUG hetzelfde als VEK?<br><br><br>Jouw doel is om deze vraag zo snel en nauwkeurig mogelijk te beantwoorden door op "JA" of "NEE" te klikken.<br><br>Elk level bestaat uit een <kbd><b>trainings</b></kbd>-deel en een <kbd><b>test</b></kbd>-deel.',
    '<b>Training</b><br><br>Tijdens het trainingsdeel oefen je zoveel je kan.<br>Na sommige vragen krijg je feedback zodat je kan bijleren.<br><br>Gebruik je de <kbd>Tip</kbd>-knop? Dan krijg je hulp,<br>maar <b>geen drakensteen</b> voor die vraag.<br><br>Zonder tip en juist antwoord = wél een drakensteen ⭐<br><br>Probeer {criterion} drakenstenen te verzamelen om door te gaan naar het volgende deel!<br>Maar pas op, als je een fout maakt, verlies je al je drakenstenen!',
    '<b>Test – Drakengevecht</b><br><br>Tijdens het spannende test-deel gaat jouw draak vechten met een andere draak!<br><br>Je krijgt precies <b>{testTrials} vragen</b>.<br>Los ze allemaal juist op om je draak te helpen winnen!<br>Vanaf je één fout antwoord geeft, verliest je draak. Dan ga je terug naar het trainings-deel van hetzelfde niveau.<br><br>Tijdens het gevecht krijg je:<br>geen tips<br>geen feedback<br><br>Nu moet je laten zien wat je geleerd hebt!',
    'Mijn training is soms moeilijk, maar onthoud alsjeblieft ook dat dit een hersen <u><b>trainings</b></u> programma is, en <b>GEEN</b> toets. Fouten maken is dus <i>zeker normaal en hoort bij het leerproces.</i><br><br>Je leert niet fietsen zonder er een paar keer af te vallen - en je leert geen draken vangen zonder er eerst een paar te missen! :-)<br><br>Dus voel je niet slecht als je fouten maakt, of als je het moeilijk vindt. Na een tijdje zal het makkelijker worden - veel oefenen en niet opgeven is het belangrijkste!',
  ],

  welcomeBack: "Welkom terug bij Professor SMART's Brain Training!<br>Ik ben blij je weer te zien!<br><br>In je laatste sessie slaagde je erin om <b>{dragon}</b> te vangen!<br>{dragon} heeft op je gewacht, en is klaar om met jou verder te gaan op je reis door Smartlandia!",

  beginTraining: 'Zodra je op "begin training" klikt, start je mijn brein- en drakentraining voor {minutes} minuten.<br>Zorg ervoor dat je zo goed mogelijk oplet gedurende deze tijd.<br>Als je problemen hebt, vraag dan aan je ouders om de onderzoeker te contacteren. Dit mag voor elke soort vraag!<br><br>Oh, nog iets belangrijks! Probeer alsjeblieft niet op de "vernieuwen" knop te klikken tijdens de training.<br>Als je dit doet, word je helemaal teruggebracht naar het begin van dit level,<br>en loop je het risico om de voortgang die je in deze sessie maakt te verliezen!<br><br>Veel succes, en doe je best!',

  collection: {
    title: 'Jouw Drakenverzameling Deel {part}',
    body: 'Hier zie je welke draken je al hebt gevangen, en welke nog op je wachten.<br>Hoeveel kun jij er verzamelen?',
  },

  header: {
    level: 'Level {stage}: {phase}',
    training: 'Training',
    testing: 'Test',
    testTrial: 'Oefening {n} van de {total}',
    startMotivation: 'Laten we beginnen - Je kunt dit!',
  },

  feedback: {
    correct: 'Juist!',
    correctHint: 'Goed gedaan! Je gebruikte een tip, dus je krijgt geen drakensteen. Probeer het eens zonder tip!',
    incorrect: 'Oeps! Dit is niet juist!',
    correctAnswerIs: 'Het juiste antwoord is: {answer}',
  },

  battleIntro: "<b>Kijk, er is een {next} verschenen!</b><br>Gelukkig heb je {dragon} ondertussen genoeg getraind! Tijd voor een battle!<br>Als je alle {testTrials} testvragen goed hebt, wint {dragon} van {next} en ga je naar het volgende level. Maar let op: als je er ook maar één fout hebt, verliest {dragon} en moet je het trainingsgedeelte helemaal opnieuw beginnen!<br><br>Als je klaar bent, klik je op 'doorgaan' om het battle-gedeelte van dit level te beginnen. Veel succes!",
  battleTitle: 'Battle tijd!',
  battleLost: '<b>Helaas! {next} heeft {dragon} verslagen!</b><br>Je hebt niet alle vragen goed beantwoord deze ronde. Je gaat terug naar het trainingsgedeelte van dit niveau om {dragon} nog sterker te maken. Maak je geen zorgen - oefening baart kunst! Blijf proberen en je komt er wel. Als je klaar bent, klik je op "doorgaan" om door te gaan. Veel succes!',
  battleWon: '<b>{dragon} heeft {next} verslagen!</b><br>Nu kan je {next} vangen!',
  catchButton: '{next} vangen!',
  caught: 'Wow, je hebt zojuist {next} gevangen - geweldig gedaan! {fact}<br><br>Nu heb je {next} aan je zijde voor het volgende niveau. Spannend!<br><br>Neem gerust een paar seconden pauze, en wanneer je er klaar voor bent,<br>klik je op "Doorgaan" om naar het volgende niveau te gaan. Veel succes aan jullie allebei!',

  ending: 'Gefeliciteerd - je hebt zojuist de training van vandaag afgerond! Dat was veel werk -<br>Ik ben er zeker van dat jij en {dragon} wel wat rust verdienen!<br>Laten we vandaag even uitrusten en fris terugkomen voor de volgende sessie.<br>Goed gedaan!<br><br>Je voortgang is opgeslagen. De volgende keer log je gewoon weer in met dezelfde gebruikersnaam en pincode,<br>en gaan we verder waar je gebleven bent.<br><br>Veel succes met de rest van je schoolwerk vandaag!<br>Je kunt deze webpagina nu sluiten - en dan zie ik je de volgende keer!<br><br>Ik weet zeker dat {dragon} er naar uitkijkt!',
  completed: 'Wow, wat een ongelooflijke prestatie - je hebt mijn volledige trainingsprogramma voltooid!<br>Niet iedereen komt zo ver - gefeliciteerd!<br>Kijk naar alle draken die je onderweg hebt verzameld -<br>samen en zo trots op je!<br><br>Laat je ouders weten dat je de training hebt voltooid, en zij zullen de onderzoeker contacteren.<br>Het was een genoegen om jou mijn trainingsprogramma te laten voltooien,<br>en ik hoop dat je er net zoveel van genoten hebt als ik!',

  motivations: [
    'Hoe meer we oefenen, hoe beter we worden!',
    'Hoe groter de uitdaging, hoe groter de overwinning!',
    'De beste manier om te leren is om fouten te maken!',
    'Ik weet dat je dit kunt!',
    'Dit kan soms moeilijk zijn – maar je kunt het!',
    'Hard werken loont altijd!',
    'Blijf gefocust – je kan dit!',
    'Gewoon 30 minuten oefenen – easy peasy!',
    'Je doet het geweldig – Ik ben trots op jou!',
    'Zelfs als je vastloopt, blijf proberen – het lukt je wel!',
    'Mijn favoriete gevoel is vooruitgang boeken na een tijdje vastzitten!',
    'Oefening baart kunst!',
    'Elke vraag die je beantwoordt helpt, zelfs als je het fout hebt!',
    'Oefenen kan soms saai zijn – maar het loont altijd!',
    'Meer dan 1000 mensen hebben deze training al gebruikt… dat is veel!',
    'Het 30 seconden aftellen houdt je scherp!',
    'De training kan frustrerend zijn, maar ook leuk!',
    'Probeer de training te behandelen als een puzzel die je kunt oplossen!',
    'Concentreer je op het verkrijgen van juiste antwoorden – maak je geen zorgen als je langzaam bent!',
    'Je wordt steeds sneller met meer oefening!',
    'Als je het makkelijk vindt, probeer dan sneller te gaan!',
    'De training is bedoeld om je slimmer te maken – dus maak je geen zorgen als je je in het begin niet slim voelt.',
    'Onthoud dat je leert door antwoorden fout te hebben!',
    'Probeer de vragen in je hoofd te beantwoorden – schrijf niets op!',
    'Veel trainen in een paar weken maakt de training nog krachtiger!',
    'Het is beter om juist te zijn dan om snel te zijn – snelheid komt met oefening!',
    'Probeer jezelf bij elke nieuwe sessie een beetje meer te verbeteren!',
    'Proberen te antwoorden zonder goed na te denken, zal je niet slimmer maken – de problemen oplossen met hard werken wel.',
    'Makkelijk, gemiddeld, moeilijk, het maakt niet uit – elke vraag die je beantwoordt helpt!',
    'Beter worden kan tijd kosten – wees geduldig en geef nooit op!',
    'Hoe vang je een eekhoorn?<br>Klim in een boom en gedraag je als een noot!',
    'Ik geloof in jou!',
    'Je kunt het – blijf doorzetten!',
    'Wees trots op jezelf voor het harde werken!',
    'Soms zul je veel niveaus halen, andere keren niet – maar het is allemaal oefening!',
    'Oefenen is altijd waardevol!',
  ],
};
