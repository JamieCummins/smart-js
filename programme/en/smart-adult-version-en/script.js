// Define study
const study = lab.util.fromObject({
  "title": "root",
  "type": "lab.flow.Sequence",
  "parameters": {},
  "plugins": [
    {
      "type": "lab.plugins.Metadata",
      "path": undefined
    },
    {
      "type": "lab.plugins.Transmit",
      "url": "backend.php",
      "path": undefined
    }
  ],
  "metadata": {
    "title": "",
    "description": "",
    "repository": "",
    "contributors": ""
  },
  "files": {},
  "responses": {},
  "content": [
    {
      "type": "lab.flow.Sequence",
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {
        "run": function anonymous(
) {
this.state.first_trial = 1;
this.state.skip_chunk = 0;
}
      },
      "title": "intro_components",
      "content": [
        {
          "type": "lab.html.Page",
          "items": [
            {
              "required": true,
              "type": "radio",
              "label": "Is this your first time doing the training?",
              "options": [
                {
                  "label": "Yes",
                  "coding": "yes"
                },
                {
                  "label": "No",
                  "coding": "no"
                }
              ],
              "name": "first_time",
              "shuffle": true
            }
          ],
          "submitButtonText": "Continue →",
          "submitButtonPosition": "right",
          "files": {},
          "responses": {
            "": ""
          },
          "parameters": {},
          "messageHandlers": {},
          "title": "Welcome"
        },
        {
          "type": "lab.html.Page",
          "items": [
            {
              "required": true,
              "type": "input",
              "label": "Please enter your email:",
              "help": "Please use the same email address for every session!",
              "name": "participant_id",
              "attributes": {
                "type": "email"
              }
            }
          ],
          "scrollTop": true,
          "submitButtonText": "Continue →",
          "submitButtonPosition": "right",
          "files": {},
          "responses": {
            "": ""
          },
          "parameters": {},
          "messageHandlers": {
            "run": function anonymous(
) {
this.state.password = ""
}
          },
          "title": "id"
        },
        {
          "type": "lab.flow.Loop",
          "templateParameters": [
            {
              "loop": "1"
            },
            {
              "loop": "2"
            }
          ],
          "sample": {
            "mode": "draw-shuffle",
            "n": "10"
          },
          "files": {},
          "responses": {
            "": ""
          },
          "parameters": {},
          "messageHandlers": {
            "after:end": function anonymous(
) {
this.state.password = this.state.password.toUpperCase();
this.state.password = this.state.password.replace(/\s+/g, '');



},
            "before:prepare": function anonymous(
) {
this.state.valid_passwords = [
  3368, 6272, 2251, 9825, 1355, 8699, 4953, 6402, 1931, 6636,
  5001, 1258, 6433, 1480, 8325, 9490, 3453, 8788, 6467, 7340,
  3273, 3551, 1726, 1944, 1625, 5357, 7533, 2395, 6122, 3817,
  1516, 9224, 9976, 1102, 6347, 8145, 2692, 5171, 6896, 6610,
  4618, 1015, 6444, 1987, 8809, 9273, 3343, 1148, 8139, 6688,
  1099, 3345, 3449, 1090, 7924, 8348, 6173, 7994, 5815, 6877,
  7781, 9618, 7585, 6231, 5679, 8452, 1950, 9101, 6260, 2924,
  5406, 3858, 5855, 2888, 9963, 2906, 9894, 4309, 7669, 3309,
  5394, 8613, 5894, 7049, 3909, 2247, 8381, 5389, 1606, 3830,
  9737, 3473, 3235, 9445, 9459, 5735, 4481, 3088, 8360, 9855,
  2121, 7680, 1161, 1635, 3753, 6663, 4994, 6816, 5891, 7773,
  4108, 3820, 5173, 5621, 4739, 4168, 7626, 4545];

  this.state.password_validity = 0
}
          },
          "title": "password_loop",
          "tardy": true,
          "skip": "${this.state.first_time == \"yes\" || this.state.password_validity == 1}",
          "shuffleGroups": [],
          "template": {
            "type": "lab.flow.Sequence",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "password_sequence",
            "tardy": true,
            "skip": "${this.state.password_validity == 1}",
            "content": [
              {
                "type": "lab.html.Page",
                "items": [
                  {
                    "required": false,
                    "type": "input",
                    "label": "Please enter the password you most recently received here:",
                    "name": "password",
                    "help": "To remind you: the password is a 4-digit number that you receive at the end of the training session.",
                    "attributes": {
                      "type": "number",
                      "min": "1000",
                      "max": "9999"
                    }
                  }
                ],
                "scrollTop": true,
                "submitButtonText": "Continue →",
                "submitButtonPosition": "right",
                "files": {},
                "responses": {
                  "": ""
                },
                "parameters": {},
                "messageHandlers": {
                  "after:end": function anonymous(
) {
this.state.password = this.state.password.toUpperCase();
this.state.password = this.state.password.replace(/\s+/g, '');
this.state.password_numeric = Number(this.state.password)

if (this.state.valid_passwords.includes(this.state.password_numeric)) {
  this.state.password_validity = 1;
} else {
  this.state.password_validity = 0;
}

}
                },
                "title": "password",
                "tardy": true,
                "skip": "${this.state.first_time == \"yes\" || this.state.password_validity === 1}"
              },
              {
                "type": "lab.html.Page",
                "items": [
                  {
                    "type": "text",
                    "title": "Invalid password!",
                    "content": "The password you entered was not correct. You might have entered it incorrectly! Click \u003Ckbd\u003Etry again\u003C\u002Fkbd\u003E to try again. "
                  }
                ],
                "scrollTop": true,
                "submitButtonText": "Try again",
                "submitButtonPosition": "right",
                "files": {},
                "responses": {
                  "": ""
                },
                "parameters": {},
                "messageHandlers": {},
                "title": "try_again",
                "tardy": true,
                "skip": "${this.state.password_validity === 1}"
              }
            ]
          }
        },
        {
          "type": "lab.html.Screen",
          "files": {},
          "responses": {
            "mousedown button#continue": "continue"
          },
          "parameters": {},
          "messageHandlers": {},
          "title": "professor_introduction_1",
          "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv class=\"inner-main-divs\"\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv class=\"inner-main-divs\"\u003E\n      \u003Cp class=\"inner-main-divs\"\u003E Hello there! I'm Professor SMART, and welcome to SMART Brain Training!\u003Cbr\u003E\u003Cbr\u003EThe goal of my training is to help make your brain as smart as possible -\u003Cbr\u003Especifically by being able to answer hard problems quickly and correctly!\u003Cbr\u003E\u003Cbr\u003EOver the next few weeks, you're going to go through over 100 levels of my special training!\u003Cbr\u003EWe've got a lot of work to do.\u003Cbr\u003E\u003Cbr\u003E\n\n      \u003Cbutton id=\"continue\"\u003EContinue\u003C\u002Fbutton\u003E\n      \u003C\u002Fdiv\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fmain\u003E",
          "tardy": true,
          "correctResponse": "continue",
          "skip": "${this.state.first_time == \"no\"}"
        },
        {
          "type": "lab.html.Screen",
          "files": {},
          "responses": {
            "mousedown button#continue": "continue"
          },
          "parameters": {},
          "messageHandlers": {
            "run": function anonymous(
) {
this.state.current_pokemon_image = 'static/Bulbasaur 5.png' 

this.state.current_pokemon_name = this.state.current_pokemon_image.split(' ').shift().split('/').pop();
}
          },
          "title": "professor_introduction_2",
          "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n\n      \u003Cdiv\u003E\n      \u003Cp\u003E To start you off, let me explain what the training is all about.\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\n\n      \u003Cdiv\u003E\n      \u003C\u002Fdiv\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\n      \u003Cbutton id=\"continue\"\u003EContinue\u003C\u002Fbutton\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
          "tardy": true,
          "skip": "${this.state.first_time == \"no\"}"
        },
        {
          "type": "lab.html.Screen",
          "files": {},
          "responses": {
            "mousedown button#continue": "continue"
          },
          "parameters": {},
          "messageHandlers": {},
          "title": "professor_introduction_3",
          "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n      \u003Cp\u003ESo, like I mentioned already, there are lots\u003Cbr\u003Eof different levels in the training. Your goal is to get\u003Cbr\u003Ethrough as many levels as possible!\u003Cbr\u003E\u003Cbr\u003EEach level consists of two parts: a \u003Ckbd\u003Etraining\u003C\u002Fkbd\u003E part and a \u003Ckbd\u003Etest\u003C\u002Fkbd\u003E part.\u003Cbr\u003E In both parts you will read about how different made-up words are related\u003Cbr\u003E(for example: CUG is the same as JOM, JOM is the same as VEK).\u003Cbr\u003EThen you will be asked a question about these made-up words\u003Cbr\u003E(for example: Is CUG the same as VEK?).\u003Cbr\u003E\u003Cbr\u003EYour goal is to answer this question as quickly and accurately\u003Cbr\u003E as possible by clicking either \"YES\" or \"NO\" with the mouse.\u003Cbr\u003E\u003Cbr\u003EIn the \u003Ckbd\u003Etraining\u003C\u002Fkbd\u003E part I will tell you whether your answer was right or wrong.\u003Cbr\u003EBut in the \u003Ckbd\u003Etesting\u003C\u002Fkbd\u003E part I \u003Cb\u003Ewon't\u003C\u002Fb\u003E tell you this!\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbutton id=\"continue\"\u003EContinue\u003C\u002Fbutton\u003E\n      \u003C\u002Fdiv\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fmain\u003E",
          "tardy": true,
          "skip": "${this.state.first_time == \"no\"}"
        },
        {
          "type": "lab.html.Screen",
          "files": {},
          "responses": {
            "mousedown button#continue": "continue"
          },
          "parameters": {},
          "messageHandlers": {
            "run": function anonymous(
) {
this.state.password = 3368
}
          },
          "title": "professor_introduction_4",
          "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv class=\"inner-main-divs\"\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n      \u003Cp\u003E Each level in SMART gets harder and harder.\u003Cbr\u003EIn the \u003Ckbd\u003Etraining\u003C\u002Fkbd\u003E part of each level, you will keep answering\u003Cbr\u003Equestions until you get 16 correct answers in a row.\u003Cbr\u003EOnce you do this, you move on to a \u003Ckbd\u003Etesting\u003C\u002Fkbd\u003E part.\u003Cbr\u003EThe \u003Ckbd\u003Etesting\u003C\u002Fkbd\u003E part is only 16 trials long in total!\u003Cbr\u003E\u003Cbr\u003EIf you get all 16 questions correct, you\u003Cbr\u003E move on to the next level! But, if you get even one question wrong,\u003Cbr\u003Eyou have to go back to the \u003Ckbd\u003Etraining\u003C\u002Fkbd\u003E part of the same level.\u003Cbr\u003EThis sometimes makes my training very hard to do,\u003Cbr\u003Ebut challenging your brain in this way is the best\u003Cbr\u003Eway to make it smarter - and that is scientifically proven!\u003Cbr\u003E\u003Cbr\u003EPlease remember too that this is a brain \u003Cu\u003E\u003Cb\u003Etraining\u003C\u002Fu\u003E\u003C\u002Fb\u003E programme,\u003Cbr\u003E and \u003Cb\u003ENOT\u003C\u002Fb\u003E a test. This means that \u003Ci\u003Emaking mistakes is normal\u003C\u002Fi\u003E\u003Cbr\u003Eand this is part of the learning process.\u003Cbr\u003E\u003Cbr\u003EYou don't learn how to ride a bicycle without falling off it a few times first -\u003Cbr\u003Eand the same is true for learning any new skil! :-)\u003Cbr\u003ESo don't feel bad if you are making mistakes, or if you are finding it difficult.\u003Cbr\u003EAfter a while you will get easier - it's all about practicing hard and not giving up!\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbutton id=\"continue\"\u003EContinue\u003C\u002Fbutton\u003E\n      \u003C\u002Fdiv\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fmain\u003E",
          "tardy": true,
          "skip": "${this.state.first_time == \"no\"}"
        },
        {
          "type": "lab.html.Screen",
          "files": {},
          "responses": {
            "mousedown button#continue": "continue"
          },
          "parameters": {},
          "messageHandlers": {},
          "title": "professor_welcomeback",
          "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n\n      \u003Cdiv\u003E\n      \u003Cp\u003EWelcome back to Professor SMART's SMART Brain Training!\u003Cbr\u003EI'm happy to see you again!\u003Cbr\u003E\u003Cbr\u003ELet's get you straight back in to keep going on your journey through my training!\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\n\n      \u003Cdiv\u003E\n      \u003C\u002Fdiv\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\n      \u003Cbutton id=\"continue\"\u003EContinue\u003C\u002Fbutton\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
          "tardy": true,
          "skip": "${this.state.first_time == \"yes\"}"
        },
        {
          "type": "lab.html.Screen",
          "files": {},
          "responses": {
            "mousedown button#continue": "continue"
          },
          "parameters": {},
          "messageHandlers": {
            "before:prepare": function anonymous(
) {
this.state.current_tally = 0

if (this.state.password == '3368') { 
 this.state.stage = '5'
}
else if (this.state.password == '6272') { 
 this.state.stage = '6'
}
else if (this.state.password == '2251') { 
 this.state.stage = '7'
}
else if (this.state.password == '9825') { 
 this.state.stage = '8'
}
else if (this.state.password == '1355') { 
 this.state.stage = '9'
}
else if (this.state.password == '8699') { 
 this.state.stage = '10'
}
else if (this.state.password == '4953') { 
 this.state.stage = '11'
}
else if (this.state.password == '6402') { 
 this.state.stage = '12'
}
else if (this.state.password == '1931') { 
 this.state.stage = '13'
}
else if (this.state.password == '6636') { 
 this.state.stage = '14'
}
else if (this.state.password == '5001') { 
 this.state.stage = '15'
}
else if (this.state.password == '1258') { 
 this.state.stage = '16'
}
else if (this.state.password == '6433') { 
 this.state.stage = '17'
}
else if (this.state.password == '1480') { 
 this.state.stage = '18'
}
else if (this.state.password == '8325') { 
 this.state.stage = '19'
}
else if (this.state.password == '9490') { 
 this.state.stage = '20'
}
else if (this.state.password == '3453') { 
 this.state.stage = '21'
}
else if (this.state.password == '8788') { 
 this.state.stage = '22'
}
else if (this.state.password == '6467') { 
 this.state.stage = '23'
}
else if (this.state.password == '7340') { 
 this.state.stage = '24'
}
else if (this.state.password == '3273') { 
 this.state.stage = '25'
}
else if (this.state.password == '3551') { 
 this.state.stage = '26'
}
else if (this.state.password == '1726') { 
 this.state.stage = '27'
}
else if (this.state.password == '1944') { 
 this.state.stage = '28'
}
else if (this.state.password == '1625') { 
 this.state.stage = '29'
}
else if (this.state.password == '5357') { 
 this.state.stage = '30'
}
else if (this.state.password == '7533') { 
 this.state.stage = '31'
}
else if (this.state.password == '2395') { 
 this.state.stage = '32'
}
else if (this.state.password == '6122') { 
 this.state.stage = '33'
}
else if (this.state.password == '3817') { 
 this.state.stage = '34'
}
else if (this.state.password == '1516') { 
 this.state.stage = '35'
}
else if (this.state.password == '9224') { 
 this.state.stage = '36'
}
else if (this.state.password == '9976') { 
 this.state.stage = '37'
}
else if (this.state.password == '1102') { 
 this.state.stage = '38'
}
else if (this.state.password == '6347') { 
 this.state.stage = '39'
}
else if (this.state.password == '8145') { 
 this.state.stage = '40'
}
else if (this.state.password == '2692') { 
 this.state.stage = '41'
}
else if (this.state.password == '5171') { 
 this.state.stage = '42'
}
else if (this.state.password == '6896') { 
 this.state.stage = '43'
}
else if (this.state.password == '6610') { 
 this.state.stage = '44'
}
else if (this.state.password == '4618') { 
 this.state.stage = '45'
}
else if (this.state.password == '1015') { 
 this.state.stage = '46'
}
else if (this.state.password == '6444') { 
 this.state.stage = '47'
}
else if (this.state.password == '1987') { 
 this.state.stage = '48'
}
else if (this.state.password == '8809') { 
 this.state.stage = '49'
}
else if (this.state.password == '9273') { 
 this.state.stage = '50'
}
else if (this.state.password == '3343') { 
 this.state.stage = '51'
}
else if (this.state.password == '1148') { 
 this.state.stage = '52'
}
else if (this.state.password == '8139') { 
 this.state.stage = '53'
}
else if (this.state.password == '6688') { 
 this.state.stage = '54'
}
else if (this.state.password == '1099') { 
 this.state.stage = '55'
}
else if (this.state.password == '3345') { 
 this.state.stage = '56'
}
else if (this.state.password == '3449') { 
 this.state.stage = '57'
}
else if (this.state.password == '1090') { 
 this.state.stage = '58'
}
else if (this.state.password == '7924') { 
 this.state.stage = '59'
}
else if (this.state.password == '8348') { 
 this.state.stage = '60'
}
else if (this.state.password == '6173') { 
 this.state.stage = '61'
}
else if (this.state.password == '7994') { 
 this.state.stage = '62'
}
else if (this.state.password == '5815') { 
 this.state.stage = '63'
}
else if (this.state.password == '6877') { 
 this.state.stage = '64'
}
else if (this.state.password == '7781') { 
 this.state.stage = '65'
}
else if (this.state.password == '9618') { 
 this.state.stage = '66'
}
else if (this.state.password == '7585') { 
 this.state.stage = '67'
}
else if (this.state.password == '6231') { 
 this.state.stage = '68'
}
else if (this.state.password == '5679') { 
 this.state.stage = '69'
}
else if (this.state.password == '8452') { 
 this.state.stage = '70'
}
else if (this.state.password == '1950') { 
 this.state.stage = '71'
}
else if (this.state.password == '9101') { 
 this.state.stage = '72'
}
else if (this.state.password == '6260') { 
 this.state.stage = '73'
}
else if (this.state.password == '2924') { 
 this.state.stage = '74'
}
else if (this.state.password == '5406') { 
 this.state.stage = '75'
}
else if (this.state.password == '3858') { 
 this.state.stage = '76'
}
else if (this.state.password == '5855') { 
 this.state.stage = '77'
}
else if (this.state.password == '2888') { 
 this.state.stage = '78'
}
else if (this.state.password == '9963') { 
 this.state.stage = '79'
}
else if (this.state.password == '2906') { 
 this.state.stage = '80'
}
else if (this.state.password == '9894') { 
 this.state.stage = '81'
}
else if (this.state.password == '4309') { 
 this.state.stage = '82'
}
else if (this.state.password == '7669') { 
 this.state.stage = '83'
}
else if (this.state.password == '3309') { 
 this.state.stage = '84'
}
else if (this.state.password == '5394') { 
 this.state.stage = '85'
}
else if (this.state.password == '8613') { 
 this.state.stage = '86'
}
else if (this.state.password == '5894') { 
 this.state.stage = '87'
}
else if (this.state.password == '7049') { 
 this.state.stage = '88'
}
else if (this.state.password == '3909') { 
 this.state.stage = '89'
}
else if (this.state.password == '2247') { 
 this.state.stage = '90'
}
else if (this.state.password == '8381') { 
 this.state.stage = '91'
}
else if (this.state.password == '5389') { 
 this.state.stage = '92'
}
else if (this.state.password == '1606') { 
 this.state.stage = '93'
}
else if (this.state.password == '3830') { 
 this.state.stage = '94'
}
else if (this.state.password == '9737') { 
 this.state.stage = '95'
}
else if (this.state.password == '3473') { 
 this.state.stage = '96'
}
else if (this.state.password == '3235') { 
 this.state.stage = '97'
}
else if (this.state.password == '9445') { 
 this.state.stage = '98'
}
else if (this.state.password == '9459') { 
 this.state.stage = '99'
}
else if (this.state.password == '5735') { 
 this.state.stage = '100'
}
else if (this.state.password == '4481') { 
 this.state.stage = '101'
}
else if (this.state.password == '3088') { 
 this.state.stage = '102'
}
else if (this.state.password == '8360') { 
 this.state.stage = '103'
}
else if (this.state.password == '9855') { 
 this.state.stage = '104'
}
else if (this.state.password == '2121') { 
 this.state.stage = '105'
}
else if (this.state.password == '7680') { 
 this.state.stage = '106'
}
else if (this.state.password == '1161') { 
 this.state.stage = '107'
}
else if (this.state.password == '1635') { 
 this.state.stage = '108'
}
else if (this.state.password == '3753') { 
 this.state.stage = '109'
}
else if (this.state.password == '6663') { 
 this.state.stage = '110'
}
else if (this.state.password == '4994') { 
 this.state.stage = '111'
}
else if (this.state.password == '6816') { 
 this.state.stage = '112'
}
else if (this.state.password == '5891') { 
 this.state.stage = '113'
}
else if (this.state.password == '7773') { 
 this.state.stage = '114'
}
else if (this.state.password == '4108') { 
 this.state.stage = '115'
}
else if (this.state.password == '3820') { 
 this.state.stage = '116'
}
else if (this.state.password == '5173') { 
 this.state.stage = '117'
}
else if (this.state.password == '5621') { 
 this.state.stage = '118'
}
else if (this.state.password == '4739') { 
 this.state.stage = '119'
}
else if (this.state.password == '4168') { 
 this.state.stage = '120'
}
else if (this.state.password == '7626') { 
 this.state.stage = '121'
}
else if (this.state.password == '4545') { 
 this.state.stage = '122'
};

this.state.phase = "Training"
}
          },
          "title": "professor_begin_training",
          "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv class=\"inner-main-divs\"\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n      \u003Cp\u003E Once you click \"begin training\", you will start my brain training for 30 minutes.\u003Cbr\u003EIn this time, please make sure to pay attention as best as you can.\u003Cbr\u003EIf you are having problems, just contact the researcher for help.\u003Cbr\u003E\u003Cbr\u003EOh, one other important thing! Please try not to click the \"refresh\" button during the training.\u003Cbr\u003EIf you do this, then you will be brought all the way back to the start,\u003Cbr\u003Eand you might lose the progress you make in this session!\u003Cbr\u003E\u003Cbr\u003EGood luck, and do your best!\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbutton id=\"continue\"\u003EBegin Training\u003C\u002Fbutton\u003E\n      \u003C\u002Fdiv\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fmain\u003E",
          "tardy": true
        }
      ]
    },
    {
      "type": "lab.html.Frame",
      "context": "\u003Cheader class=\"header-plain\"\u003E\n      \u003Cdiv class=\"left-top\"\u003E\n          \u003Cimg class=\"header-image\" src=\"static\u002Fprofessor.jpeg\"\u003E   \n        \u003Cdiv class=\"text-container\"\u003E \n          \u003Cimg src=\"static\u002Fspeech_bubble.png\" class=\"speech-bubble\"\u003E\n          \u003Cdiv id=\"pokemon-motivation\" class=\"pokemon-speech\"\u003E\u003Cp\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\n          \u003C\u002Fdiv\u003E\n          \u003C\u002Fdiv\u003E\n\n  \u003Cdiv class=\"middle-top\"\u003E\n    \u003Cdiv class=\"level-text\" id=\"level-display\"\u003ELevel ${this.state.stage}: ${this.state.phase}\u003C\u002Fdiv\u003E\n    \u003Cdiv class=\"trial-text\" id=\"trial-display\"\u003E\u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\n  \u003Cdiv class=\"right-top\" id=\"countdown\"\u003E\n  \u003Ccanvas id=\"timer-circle\"\u003E\u003C\u002Fcanvas\u003E\n  \u003C\u002Fdiv\u003E\n    \n\n\u003C\u002Fheader\u003E\n\n\u003Cmain data-labjs-section=\"frame\"\u003E\n  \u003C!-- Content gets inserted here --\u003E\n\u003C\u002Fmain\u003E\n\n\u003Cfooter class=\"footer-full\"\u003E\n\u003Cdiv id=\"session-countdown\"\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E\n\n",
      "contextSelector": "[data-labjs-section=\"frame\"]",
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {
        "run": function anonymous(
) {
window.onbeforeunload = function() {
  return "Data will be lost if you leave the page, are you sure?";
};

// motivational text chooser function
chooseSpeechText = setInterval(function() {
  document.getElementById("pokemon-motivation").innerHTML = motivations[Math.floor(Math.random() * motivations.length)];
}, 60000) 


// timer parameters
session_time_left = 1859;
session_minutes_left = (time_left / 60)

// timer function
sessiontimer = setInterval(function(){
  if(session_time_left <= 0){
    clearInterval(sessiontimer);
    document.getElementById("session-countdown").innerHTML = "Finished";
  } else {
    document.getElementById("session-countdown").innerHTML = Math.trunc(session_minutes_left) + " minutes remaining";
  }
  session_time_left -= 1;
  session_minutes_left = (session_time_left / 60);
}, 1000);
},
        "before:prepare": function anonymous(
) {
const unloadHandler = (e) => {
  const warning = 'Closing this window will abort the study. Are you sure?';
  e.returnValue = warning;
  return warning;
}

class NavigationGuard {
  handle(_, event) {
    if (event === 'prepare') {
      window.addEventListener('beforeunload', unloadHandler);
    } else if (event === 'end') {
      window.removeEventListener('beforeunload', unloadHandler);
    }
  }
}

this.internals.root.plugins.add(new NavigationGuard())

// define each of the four potential stimuli per trial //
stimulus_1_bucket = ['LAH', 'JOJ', 'BOR', 'KAJ', 'XUW', 'CUZ', 'GAC', 'QEH', 'SAR', 'XAK', 'YOK', 'VOM', 'FUH', 'FOL', 'WAQ', 'RAC', 'QEZ', 'NUM', 'WIV', 'YED', 'CUQ', 'JIK', 'QAQ', 'PEQ', 'VUY', 'YIY', 'SUY', 'QOG', 'NOJ', 'JIV', 'RUH', 'GUC', 'BAX', 'PIF', 'VAX', 'KOJ', 'YOY', 'NAC', 'KIX', 'BEZ', 'NAL', 'NUC', 'PEJ', 'QAJ', 'NAS', 'BUJ', 'TIX', 'QOT', 'YEQ', 'XOR', 'DOJ', 'NEJ', 'POV', 'RAV', 'XUV', 'KUP', 'JER', 'PUZ', 'VIB', 'NEX', 'CIX', 'CUW', 'VEJ', 'JUZ', 'KER', 'XIG', 'LOD', 'XUC', 'XEH', 'HIR', 'RAZ', 'HON', 'QIX', 'FIW', 'KUF', 'XUP', 'SIV', 'DEC', 'XUD', 'QEM', 'SIL', 'GOW', 'GUG', 'QAB', 'CEX', 'YEX', 'FAV', 'CUX', 'QOB', 'JUL', 'FIF', 'KEL', 'TUJ', 'XOY', 'XUR', 'FUV', 'MEX', 'BUH', 'JIR', 'LUB', 'QEB', 'VOV', 'XOT', 'RAQ', 'JAD', 'NID', 'LUF', 'QAF', 'VIJ', 'GON', 'GIW', 'NAJ', 'SEB', 'VIZ', 'TOX', 'YIS', 'CED', 'WEK', 'XOG', 'HEZ', 'VEF', 'RIY', 'KAZ', 'DEJ', 'JAL', 'KIG', 'REZ', 'JOM', 'LUK', 'CEP', 'QUL', 'QOW', 'GOQ', 'MUW', 'QEQ', 'YUB', 'XIQ', 'CUH', 'JIH', 'CAZ', 'CUG', 'TOC', 'TEK', 'QUS', 'DIH', 'MAQ', 'YUD', 'TUH', 'MEY', 'NUZ', 'JOC', 'REJ', 'YOC', 'CIC', 'YUN', 'XUM', 'GIY', 'PUY', 'YAS', 'LOZ', 'XUQ', 'TUQ', 'WEY', 'YAZ', 'DIZ', 'NIH', 'DAJ', 'COM', 'FAC', 'GIR', 'WEV', 'NOX', 'ROM', 'PAQ', 'CIB', 'CIL', 'QEF', 'JOR', 'YIW', 'FEX', 'VOC', 'KOY', 'GUB', 'REQ', 'DUZ', 'KUM', 'TUS', 'VOQ', 'CUY', 'XOC', 'RIZ', 'JEV', 'GUQ', 'SOZ', 'SEV', 'YOT', 'PIW', 'CEK', 'LEC', 'GEC', 'YAQ', 'CUS', 'QAS', 'GOL', 'HIH', 'NOY', 'RUJ', 'WIM', 'JEQ', 'YEF', 'TEV', 'QIY', 'WEJ', 'CUF', 'XOJ', 'VEH', 'BIR', 'XUN', 'XIY', 'YOH', 'QUP', 'QID', 'TUR', 'FOW', 'VIL', 'TAH', 'MIY', 'GOP', 'TEY', 'WEZ', 'PIH', 'VOR', 'YIT', 'WOF', 'COQ', 'JEZ', 'KIW', 'WOQ', 'SUZ', 'MIP', 'PAB', 'JIX', 'XEF', 'LOV', 'DEZ', 'VOP', 'LAL', 'WOM', 'WAH', 'FUW', 'SOV', 'LAQ', 'XUZ', 'HIY', 'JEH', 'FAJ', 'KIB', 'KEJ', 'QAM', 'ROV', 'ROJ', 'WEQ', 'KUB', 'HOS', 'VAB', 'WIQ', 'YUQ', 'VIF', 'QAN', 'GIK', 'POY', 'PEH', 'DAQ', 'XEL', 'YIB', 'RIV', 'FAM', 'JIC', 'NEM', 'VAF', 'QEN', 'KAD', 'JAV', 'DOX', 'RUP', 'KUY', 'HIG', 'SAF', 'YOR', 'PEB', 'QAD', 'SIW', 'XOK', 'JOQ', 'LAZ', 'HIW', 'KUV', 'ROR', 'YAX', 'BAAF', 'BAAG', 'BAAJ', 'BAEG', 'BAEJ', 'BAEK', 'BAIC', 'BAIF', 'BAOB', 'BAOL', 'BAUC', 'BAUG', 'BAUJ', 'BAUK', 'BEAH', 'BEEH', 'BEIC', 'BEID', 'BEOB', 'BEOC', 'BEOH', 'BIAB', 'BIAF', 'BIAK', 'BIAL', 'BIIB', 'BIIF', 'BIIL', 'BIIM', 'BIOC', 'BIOG', 'BIOJ', 'BIOM', 'BOAG', 'BOAH', 'BOAL', 'BOIB', 'BOOC', 'BOOF', 'BOOJ', 'BOUF', 'BOUG', 'BOUL', 'BUAF', 'BUAH', 'BUEC', 'BUEF', 'BUEH', 'BUEJ', 'BUEL', 'BUIC', 'BUIF', 'BUIH', 'BUOB', 'BUOM', 'BUUH', 'BUUK', 'BUUL', 'BUUM', 'CAAB', 'CAAF', 'CAAH', 'CAAM', 'CAEC', 'CAEH', 'CAEJ', 'CAIB', 'CAIH', 'CAIM', 'CAOD', 'CAOJ', 'CAUD', 'CAUJ', 'CAUK', 'CEAB', 'CEAC', 'CEAD', 'CEEC', 'CEEF', 'CEEH', 'CEEM', 'CEIB', 'CEIC', 'CEID', 'CEIF', 'CEIG', 'CEIJ', 'CEOJ', 'CEUD', 'CEUG', 'CIAF', 'CIAG', 'CIAM', 'CIEK', 'CIEM', 'CIID', 'CIIF', 'CIIM', 'CIOG', 'CIOH', 'CIOK', 'CIOM', 'CIUB', 'CIUG', 'CIUH', 'CIUM', 'COEL', 'COEM', 'COIG', 'COIM', 'COOC', 'COOG', 'COOJ', 'CUAK', 'CUAM', 'CUEC', 'CUEH', 'CUEK', 'CUEM', 'CUIC', 'CUIK', 'CUOC', 'CUOD', 'CUUG', 'DAAB', 'DAAG', 'DAAK', 'DAEM', 'DAIF', 'DAIG', 'DAIJ', 'DAOF', 'DAOJ', 'DAUG', 'DAUK', 'DAUM', 'DEAG', 'DEAH', 'DEEK', 'DEIC', 'DEIG', 'DEIM', 'DEOB', 'DEOG', 'DEOJ', 'DEUD', 'DEUJ', 'DEUL', 'DIAD', 'DIAK', 'DIEH', 'DIEJ', 'DIIB', 'DIID', 'DIIK', 'DIOC', 'DIOF', 'DIOH', 'DIOK', 'DIOM', 'DIUB', 'DIUD', 'DIUG', 'DIUK', 'DOAD', 'DOED', 'DOIB', 'DOIL', 'DOUC', 'DOUH', 'DUAB', 'DUAC', 'DUEC', 'DUEH', 'DUOC', 'DUOF', 'DUOJ', 'DUOM', 'DUUC', 'DUUG', 'DUUK', 'FAAD', 'FAAH', 'FAED', 'FAIB', 'FAIF', 'FAIK', 'FAOD', 'FAOG', 'FAOK', 'FEAD', 'FEAH', 'FEAK', 'FEEB', 'FEEJ', 'FEIM', 'FEOF', 'FEOJ', 'FEOM', 'FEUG', 'FEUH', 'FEUJ', 'FIAG', 'FIEB', 'FIEJ', 'FIEM', 'FIIF', 'FIIG', 'FIIJ', 'FIIK', 'FIOF', 'FIOM', 'FIUG', 'FIUJ', 'FIUM', 'FOAC', 'FOEB', 'FOEC', 'FOED', 'FOEG', 'FOOF', 'FOOK', 'FOOM', 'FUAM', 'FUEG', 'FUEK', 'FUIH', 'FUOH', 'FUOM', 'FUUC', 'FUUH', 'GAAB', 'GAAD', 'GAAG', 'GAAJ', 'GAAK', 'GAEK', 'GAEM', 'GAIC', 'GAIF', 'GAOF', 'GAOH', 'GAOM', 'GAUC', 'GEAD', 'GEIC', 'GEIF', 'GEIM', 'GEOB', 'GEOG', 'GEOJ', 'GEOM', 'GEUC', 'GIAG', 'GIEH', 'GIEM', 'GIIF', 'GIOB', 'GIUB', 'GIUH', 'GIUJ', 'GIUL', 'GOAK', 'GOEH', 'GOIB', 'GOIF', 'GOIL', 'GOUH', 'GOUJ', 'GOUM', 'GUAH', 'GUEM', 'GUIB', 'GUIG', 'GUIL', 'GUOB', 'GUOD', 'GUOK', 'GUUC', 'GUUF', 'GUUM', 'HAEF', 'HAEG', 'HAIG', 'HAOF', 'HAOH', 'HAOK', 'HAUD', 'HAUG', 'HAUH', 'HEAJ', 'HEEC', 'HEIB', 'HEIK', 'HEOD', 'HEOK', 'HEOL', 'HEOM', 'HIAF', 'HIAK', 'HIID', 'HIOD', 'HIUB', 'HIUC', 'HIUF', 'HIUJ', 'HIUK', 'HOAF', 'HOAJ', 'HOIB', 'HOID', 'HOIH', 'HOIJ', 'HOIL', 'HOUC', 'HOUF', 'HUAC', 'HUAG', 'HUEK', 'HUOJ', 'HUUG', 'HUUJ', 'HUUL', 'HUUM', 'JAAD', 'JAAH', 'JAAK', 'JAAL', 'JAEH', 'JAEL', 'JAID', 'JAIF', 'JAIG', 'JAOB', 'JAOG', 'JAOL', 'JAUD', 'JAUL', 'JEAB', 'JEAG', 'JEAL', 'JEEJ', 'JEIB', 'JEIG', 'JEOC', 'JEOH', 'JEOJ', 'JEOM', 'JEUC', 'JIAC', 'JIAJ', 'JIAK', 'JIEC', 'JIED', 'JIEK', 'JIIB', 'JIIH', 'JIIJ', 'JIIK', 'JIIL', 'JIOF', 'JIOH', 'JIUB', 'JOAG', 'JOAH', 'JOAJ', 'JOAL', 'JOEC', 'JOED', 'JOIC', 'JOIG', 'JOIL', 'JOOG', 'JOOM', 'JOUC', 'JOUG', 'JOUH', 'JUAB', 'JUAG', 'JUAH', 'JUID', 'JUIF', 'JUIH', 'JUOC', 'JUOL', 'JUOM', 'JUUH', 'JUUJ', 'KAAF', 'KAEB', 'KAEH', 'KAOF', 'KAOG', 'KAOH', 'KAOJ', 'KAOK', 'KAUC', 'KAUD', 'KAUG', 'KAUJ', 'KEAL', 'KEAM', 'KEED', 'KEEJ', 'KEOH', 'KEOJ', 'KEOK', 'KEUB', 'KEUC', 'KEUD', 'KEUL', 'KIAF', 'KIAM', 'KIEB', 'KIIB', 'KIOD', 'KIOG', 'KIOK', 'KIOM', 'KIUM', 'KOAB', 'KOAC', 'KOAD', 'KOAG', 'KOEB', 'KOEJ', 'KOIJ', 'KOOD', 'KOUB', 'KOUG', 'KOUK', 'KUAC', 'KUAG', 'KUAJ', 'KUAK', 'KUED', 'KUEG', 'KUEL', 'KUIG', 'KUOB', 'KUOJ', 'KUUH', 'KUUJ', 'KUUL', 'LAAD', 'LAEK', 'LAIM', 'LAOD', 'LAOG', 'LAOK', 'LAOM', 'LAUH', 'LAUL', 'LEAJ', 'LEEB', 'LEEC', 'LEEH', 'LEOH', 'LEOJ', 'LEOL', 'LEOM', 'LEUC', 'LEUL', 'LIAH', 'LIAJ', 'LIAK', 'LIEK', 'LIEL', 'LIEM', 'LIIC', 'LIID', 'LIIF', 'LIIG', 'LIIJ', 'LIOD', 'LIOJ', 'LIUG', 'LOAB', 'LOAH', 'LOAJ', 'LOEB', 'LOED', 'LOEH', 'LOEJ', 'LOIM', 'LOOL', 'LOUC', 'LOUG', 'LOUH', 'LOUJ', 'LUEC', 'LUEJ', 'LUIB', 'LUIH', 'LUIJ', 'LUIL', 'LUOC', 'LUOL', 'LUUB', 'LUUD', 'LUUH', 'LUUJ', 'MAAB', 'MAEH', 'MAEK', 'MAEM', 'MAIC', 'MAIF', 'MAIG', 'MAOG', 'MAOH', 'MAOM', 'MAUB', 'MAUH', 'MEIF', 'MEIK', 'MEIM', 'MEOB', 'MEOJ', 'MEUH', 'MIAC', 'MIAD', 'MIAG', 'MIAK', 'MIAL', 'MIEB', 'MIEC', 'MIIB', 'MIIC', 'MIID', 'MIIF', 'MIIG', 'MIOL', 'MIOM', 'MIUF', 'MIUJ', 'MOAB', 'MOAC', 'MOEG', 'MOEM', 'MOIF', 'MOIG', 'MOOC', 'MOOF', 'MOUC', 'MOUH', 'MOUJ', 'MUAC', 'MUAD', 'MUAM', 'MUEJ', 'MUUB', 'MUUC', 'MUUF', 'MUUH', 'MUUL', 'NAAH', 'NAEC', 'NAEM', 'NAIB', 'NAOG', 'NAOK', 'NAUB', 'NAUG', 'NAUH', 'NAUJ', 'NEAG', 'NEAK', 'NEAM', 'NEEK', 'NEIC', 'NEID', 'NEOF', 'NEOJ', 'NEUB', 'NEUD', 'NEUH', 'NIAH', 'NIIC', 'NIID', 'NIIH', 'NIOC', 'NIOD', 'NIOG', 'NIOH', 'NIOM', 'NIUB', 'NOAF', 'NOAJ', 'NOAK', 'NOEK', 'NOEM', 'NOIH', 'NOIK', 'NOIM', 'NOOB', 'NOOL', 'NOUB', 'NOUM', 'NUAD', 'NUAF', 'NUEB', 'NUEC', 'NUEF', 'NUEH', 'NUEM', 'NUIC', 'NUOB', 'NUOC', 'NUUB', 'NUUC', 'NUUF', 'NUUJ', 'NUUL', 'PAAB', 'PAAD', 'PAEF', 'PAIF', 'PAOF', 'PAOG', 'PAOH', 'PAOL', 'PAUH', 'PEAC', 'PEAD', 'PEAM', 'PEEF', 'PEIF', 'PEIJ', 'PEIK', 'PEOC', 'PEOL', 'PEUF', 'PIAD', 'PIAF', 'PIEB', 'PIEC', 'PIEH', 'PIEJ', 'PIIF', 'PIIH', 'PIIL', 'PIIM', 'PIOH', 'PIOK', 'PIOL', 'PIUD', 'PIUM', 'POAG', 'POAH', 'POED', 'POIC', 'POIJ', 'POIM', 'POOG', 'POOJ', 'POUC', 'POUD', 'PUIC', 'PUID', 'PUIG', 'PUIL', 'PUOC', 'PUOF', 'PUOJ', 'PUOK', 'PUOM', 'PUUB', 'PUUD', 'PUUL', 'QAAG', 'QAAM', 'QAEF', 'QAEK', 'QAEM', 'QAIC', 'QAIJ', 'QAOF', 'QAOH', 'QAOM', 'QAUG', 'QAUH', 'QEAB', 'QEAC', 'QEAK', 'QEEF', 'QEEL', 'QEIC', 'QEID', 'QEIH', 'QEIL', 'QEOD', 'QEOH', 'QEOM', 'QEUH', 'QEUM', 'QIAG', 'QIAJ', 'QIEF', 'QIEM', 'QIIG', 'QIIH', 'QIIL', 'QIIM', 'QIOC', 'QIOG', 'QIOK', 'QIOL', 'QIUK', 'QIUL', 'QIUM', 'QOAB', 'QOAM', 'QOEG', 'QOEJ', 'QOEM', 'QOIF', 'QOIJ', 'QOIL', 'QOOB', 'QOOF', 'QOOJ', 'QOOM', 'QOUC', 'QOUD', 'QOUH', 'QUAH', 'QUAM', 'QUEB', 'QUED', 'QUEG', 'QUIK', 'QUIL', 'QUIM', 'QUOH', 'QUOK', 'RAAC', 'RAEB', 'RAEH', 'RAEK', 'RAEL', 'RAIF', 'RAIG', 'RAOB', 'RAOF', 'RAUB', 'RAUF', 'REAF', 'REAJ', 'REIB', 'REIJ', 'REIL', 'REOJ', 'REOM', 'REUH', 'RIAB', 'RIAF', 'RIEG', 'RIIH', 'RIIK', 'RIIM', 'RIOD', 'ROAG', 'ROAH', 'ROAJ', 'ROAL', 'ROEJ', 'ROID', 'ROIH', 'ROOB', 'ROOG', 'ROOL', 'ROUC', 'ROUJ', 'ROUM', 'RUAK', 'RUEF', 'RUEL', 'RUOB', 'RUOG', 'RUOH', 'RUOM', 'RUUB', 'RUUL', 'SAAD', 'SAAK', 'SAAL', 'SAIG', 'SAIH', 'SAIK', 'SAUB', 'SAUD', 'SAUF', 'SAUH', 'SAUJ', 'SEAG', 'SEAH', 'SEEC', 'SEEH', 'SEIC', 'SEIJ', 'SEIK', 'SEIL', 'SEOC', 'SEOD', 'SEOJ', 'SEUC', 'SEUH', 'SIAJ', 'SIAK', 'SIIJ', 'SIIK', 'SIIL', 'SIIM', 'SIOJ', 'SIOL', 'SIOM', 'SIUH', 'SOAD', 'SOAJ', 'SOEB', 'SOEJ', 'SOIF', 'SOIH', 'SOIK', 'SOIM', 'SOOG', 'SOOJ', 'SOOM', 'SOUH', 'SOUJ', 'SUEK', 'SUIM', 'SUOK', 'SUUB', 'SUUM', 'TAAG', 'TAEF', 'TAEM', 'TAIB', 'TAIC', 'TAID', 'TAIF', 'TAIG', 'TAIJ', 'TAIK', 'TAOC', 'TAOF', 'TAOK', 'TAOM', 'TAUL', 'TAUM', 'TEAD', 'TEAJ', 'TEEB', 'TEEC', 'TEIB', 'TEIF', 'TEIK', 'TEOC', 'TEOG', 'TEOJ', 'TEOL', 'TEUB', 'TEUC', 'TEUD', 'TEUF', 'TEUJ', 'TIAB', 'TIAG', 'TIAK', 'TIEL', 'TIIB', 'TIIC', 'TIIJ', 'TIOF', 'TIOH', 'TIUF', 'TIUH', 'TIUL', 'TIUM', 'TOAG', 'TOEC', 'TOEH', 'TOEM', 'TOIH', 'TOIJ', 'TOOD', 'TOOH', 'TOUF', 'TOUL', 'TOUM', 'TUAB', 'TUED', 'TUIF', 'TUIH', 'TUIJ', 'TUIK', 'TUIM', 'TUOG', 'TUUC', 'TUUL', 'VAAJ', 'VAIB', 'VAID', 'VAIF', 'VAIG', 'VAIH', 'VAIJ', 'VAOD', 'VAOJ', 'VAOL', 'VAOM', 'VAUH', 'VAUJ', 'VAUM', 'VEAC', 'VEAD', 'VEAM', 'VEEB', 'VEIG', 'VEOC', 'VEOF', 'VEOJ', 'VEUB', 'VEUF', 'VEUG', 'VEUH', 'VEUL', 'VIAB', 'VIAD', 'VIAH', 'VIAK', 'VIEJ', 'VIID', 'VIIG', 'VIIH', 'VIIL', 'VIOG', 'VIOJ', 'VIUF', 'VIUH', 'VIUJ', 'VIUL', 'VIUM', 'VOAD', 'VOAJ', 'VOAL', 'VOAM', 'VOEJ', 'VOEK', 'VOEL', 'VOEM', 'VOUD', 'VOUF', 'VOUH', 'VUAF', 'VUEB', 'VUEC', 'VUEK', 'VUIB', 'VUIC', 'VUIH', 'VUIM', 'VUOC', 'VUOD', 'VUUH', 'VUUL', 'WAAB', 'WAAD', 'WAEC', 'WAEM', 'WAIG', 'WAIM', 'WAOC', 'WAOL', 'WAUD', 'WAUF', 'WEAC', 'WEAH', 'WEAM', 'WEEF', 'WEID', 'WEIF', 'WEIG', 'WEIH', 'WEOC', 'WEOF', 'WEOH', 'WEUG', 'WEUH', 'WEUL', 'WEUM', 'WIAG', 'WIAL', 'WIAM', 'WIEF', 'WIIC', 'WIID', 'WIIG', 'WOAG', 'WOAH', 'WOEG', 'WOIB', 'WOID', 'WOIG', 'WOIH', 'WOIJ', 'WOOB', 'WOOH', 'WOUC', 'WOUL', 'WUAB', 'WUAD', 'WUAF', 'WUAH', 'WUEC', 'WUED', 'WUEG', 'WUEH', 'WUEK', 'WUIB', 'WUIC', 'WUIF', 'WUIM', 'WUUD', 'WUUH', 'WUUJ', 'XAAD', 'XAAF', 'XAAH', 'XAAJ', 'XAAM', 'XAEB', 'XAED', 'XAEL', 'XAIF', 'XAIK', 'XAIL', 'XAIM', 'XAOF', 'XAOM', 'XAUH', 'XAUL', 'XEAC', 'XEAG', 'XEEB', 'XEEF', 'XEEJ', 'XEEK', 'XEIF', 'XEIL', 'XEIM', 'XEUF', 'XEUH', 'XEUJ', 'XEUK', 'XEUM', 'XIAD', 'XIAF', 'XIAJ', 'XIAM', 'XIED', 'XIEF', 'XIEG', 'XIEJ', 'XIIC', 'XIIH', 'XIIL', 'XIOC', 'XIOD', 'XIOF', 'XIOJ', 'XIOL', 'XIOM', 'XIUF', 'XIUH', 'XOAF', 'XOAH', 'XOEB', 'XOEJ', 'XOIC', 'XOIG', 'XOOC', 'XOOG', 'XOUH', 'XUAF', 'XUIK', 'XUIL', 'XUOB', 'XUOG', 'XUOK', 'XUUF', 'YAAH', 'YAAK', 'YAEB', 'YAED', 'YAEH', 'YAEM', 'YAIB', 'YAIF', 'YAIJ', 'YAIK', 'YAOG', 'YAUG', 'YAUM', 'YEAG', 'YEAM', 'YEEB', 'YEEF', 'YEEG', 'YEEK', 'YEIB', 'YEIC', 'YEIJ', 'YEIM', 'YEOB', 'YEOC', 'YEOD', 'YEUB', 'YEUD', 'YIAH', 'YIAK', 'YIEM', 'YIIF', 'YIIH', 'YIIM', 'YIOD', 'YIOF', 'YIOJ', 'YIOM', 'YOAD', 'YOAM', 'YOEB', 'YOEF', 'YOEG', 'YOEH', 'YOIB', 'YOIC', 'YOID', 'YOIK', 'YOOC', 'YOUD', 'YOUF', 'YUAJ', 'YUEB', 'YUED', 'YUEF', 'YUIB', 'YUIC', 'YUIF', 'YUIL', 'YUOH', 'YUOK', 'YUUJ', 'YUUL', 'YUUM', 'ZAAB', 'ZAAC', 'ZAAH', 'ZAED', 'ZAEH', 'ZAID', 'ZAOF', 'ZAOH', 'ZAOK', 'ZAOM', 'ZAUH', 'ZEAB', 'ZEAD', 'ZEAK', 'ZEIC', 'ZEIM', 'ZEOB', 'ZEOC', 'ZEOH', 'ZEOK', 'ZEOM', 'ZEUD', 'ZEUH', 'ZEUK', 'ZIAK', 'ZIAL', 'ZIEC', 'ZIID', 'ZIIH', 'ZIIL', 'ZIIM', 'ZIOD', 'ZIOK', 'ZIUL', 'ZIUM', 'ZOAH', 'ZOAJ', 'ZOEJ', 'ZOID', 'ZOIG', 'ZOIJ', 'ZOIL', 'ZOOB', 'ZOOC', 'ZOOF', 'ZOOJ', 'ZOUB', 'ZUAB', 'ZUAJ', 'ZUEH', 'ZUEM', 'ZUIM', 'ZUOB', 'ZUOC', 'ZUOH', 'ZUUC', 'ZUUG', 'ZUUJ', 'ZUUK', 'ZAAR', 'ZAEN', 'ZAEX', 'ZAIR', 'ZAIT', 'ZAIV', 'ZAIY', 'ZAON', 'ZAOP', 'ZAOQ', 'ZAOV', 'ZAOW', 'ZAUS', 'ZAUW', 'ZEAN', 'ZEAP', 'ZEAQ', 'ZEAR', 'ZEAV', 'ZEAW', 'ZEAX', 'ZEEQ', 'ZEIP', 'ZEIR', 'ZEIT', 'ZEON', 'ZEOP', 'ZEOT', 'ZIAN', 'ZIAQ', 'ZIEQ', 'ZIEX', 'ZIIR', 'ZIIX', 'ZIOV', 'ZOAP', 'ZOAQ', 'ZOAT', 'ZOAW', 'ZOEP', 'ZOIN', 'ZOIR', 'ZOIT', 'ZOIW', 'ZOOV', 'ZOUP', 'ZOUS', 'ZOUV', 'ZOUY', 'ZUAQ', 'ZUAX', 'ZUEQ', 'ZUET', 'ZUEY', 'ZUIR', 'ZUIT', 'ZUOQ', 'ZUOS', 'ZUOT', 'ZUUP', 'ZUUQ', 'ZUUS', 'ZAUZ', 'ZEIZ', 'ZIEZ', 'ZUUZ', 'NAAZ', 'NAIZ', 'NEEZ', 'NEIZ', 'NEUZ', 'NIIZ', 'NOAZ', 'NOIZ', 'PIIZ', 'QAUZ', 'QIIZ', 'QIUZ', 'QOEZ', 'QOOZ', 'RIAZ', 'RIOZ', 'ROIZ', 'SAEZ', 'SAIZ', 'SAOZ', 'SEOZ', 'SIAZ', 'SIEZ', 'SOIZ', 'SOOZ', 'SUAZ', 'SUOZ', 'TAOZ', 'TAUZ', 'TEAZ', 'TEIZ', 'TIIZ', 'TIUZ', 'TUEZ', 'TUUZ', 'VAIZ', 'VEIZ', 'VEOZ', 'VIEZ', 'VIOZ', 'VOEZ', 'WAEZ', 'WAIZ', 'WIEZ', 'WIOZ', 'WOAZ', 'WUAZ', 'XAOZ', 'XIAZ', 'XOAZ', 'YAEZ', 'YAIZ', 'YAUZ', 'YEAZ', 'YEIZ', 'YIOZ', 'YOAZ', 'YOIZ', 'YOOZ', 'YUAZ', 'NAAT', 'NAAW', 'NAEN', 'NAEY', 'NAIQ', 'NAIW', 'NAIX', 'NAOY', 'NAUP', 'NEAN', 'NEAV', 'NEES', 'NEIR', 'NEOP', 'NEOR', 'NEOS', 'NEOT', 'NEOV', 'NEUQ', 'NEUV', 'NIAN', 'NIAX', 'NIEV', 'NIEX', 'NIEY', 'NIIP', 'NIIS', 'NIIV', 'NIOR', 'NIOT', 'NIOV', 'NIOW', 'NIUQ', 'NIUT', 'NIUY', 'NOAW', 'NOAX', 'NOEP', 'NOEQ', 'NOEV', 'NOEY', 'NOIP', 'NOIW', 'NOIY', 'NOOW', 'NOUQ', 'NOUR', 'NOUX', 'NUAS', 'NUEN', 'NUEP', 'NUEW', 'NUIT', 'NUOS', 'NUOT', 'NUOV', 'NUOY', 'NUUQ', 'NUUW', 'PAAV', 'PAEP', 'PAIP', 'PAIW', 'PAIY', 'PAOP', 'PAOS', 'PAOV', 'PAOW', 'PAOY', 'PAUP', 'PAUQ', 'PAUV', 'PEAP', 'PEEY', 'PEIW', 'PEOR', 'PEOS', 'PIAX', 'PIIR', 'PIIS', 'PIIW', 'PIOP', 'PIOR', 'PIOV', 'PIOX', 'PIOY', 'PIUP', 'PIUQ', 'POIP', 'POUP', 'POUX', 'POUY', 'PUAN', 'PUAV', 'PUAW', 'PUEV', 'PUIP', 'PUIW', 'PUOR', 'PUOS', 'PUUW', 'PUUX', 'QAAP', 'QAAQ', 'QAER', 'QAEW', 'QAIP', 'QAIQ', 'QAIS', 'QAIX', 'QAOQ', 'QAUP', 'QAUX', 'QEAN', 'QEAQ', 'QEAS', 'QEEQ', 'QEET', 'QEEY', 'QEIQ', 'QEIR', 'QEIT', 'QEIX', 'QEIY', 'QEOQ', 'QEOX', 'QEUQ', 'QEUS', 'QIAQ', 'QIAW', 'QIEP', 'QIEQ', 'QIET', 'QIEW', 'QIEY', 'QIIQ', 'QIIY', 'QIOQ', 'QIOT', 'QIOW', 'QIUQ', 'QIUV', 'QIUX', 'QOAQ', 'QOEQ', 'QOEW', 'QOIR', 'QOIS', 'QOIX', 'QOIY', 'QOOV', 'QOUQ', 'QOUS', 'QOUT', 'QUEQ', 'QUER', 'QUES', 'QUEW', 'QUEX', 'QUIQ', 'QUOP', 'QUOR', 'QUOY', 'QUUN', 'QUUP', 'RAAN', 'RAEP', 'RAER', 'RAET', 'RAIP', 'RAIT', 'RAOS', 'RAUN', 'RAUP', 'RAUX', 'RAUY', 'REAY', 'REIP', 'REIV', 'REIX', 'REON', 'REOR', 'RIAN', 'RIAX', 'RIAY', 'RIEV', 'RIEX', 'RIEY', 'RIIN', 'RIIP', 'RIIW', 'RIIY', 'RIOQ', 'RIOS', 'RIOV', 'RIOY', 'RIUP', 'RIUR', 'RIUW', 'RIUX', 'ROAT', 'ROAV', 'ROAW', 'ROAX', 'ROIT', 'ROIV', 'ROIW', 'ROOQ', 'ROUV', 'RUAT', 'RUAY', 'RUEP', 'RUEX', 'RUIW', 'RUUN', 'RUUP', 'RUUW', 'RUUX', 'SAAV', 'SAAX', 'SAEP', 'SAEQ', 'SAEY', 'SAIP', 'SAIR', 'SAON', 'SAOQ', 'SAOT', 'SAOV', 'SAOX', 'SAUV', 'SAUX', 'SAUY', 'SEAQ', 'SEAY', 'SEET', 'SEIW', 'SEIY', 'SEOS', 'SEUR', 'SIAP', 'SIAV', 'SIAW', 'SIAY', 'SIEQ', 'SIIN', 'SIIS', 'SIOW', 'SIOX', 'SIUQ', 'SIUR', 'SOAN', 'SOEN', 'SOER', 'SOIR', 'SOIX', 'SOUQ', 'SOUV', 'SUAV', 'SUEX', 'SUIN', 'SUIW', 'SUOR', 'SUOV', 'SUUS', 'SUUX', 'SUUY', 'TAAX', 'TAET', 'TAEY', 'TAUP', 'TAUQ', 'TAUR', 'TEAP', 'TEAW', 'TEAY', 'TEET', 'TEIQ', 'TEIS', 'TEIT', 'TEIX', 'TEOP', 'TEOT', 'TEUP', 'TEUV', 'TEUW', 'TEUX', 'TIAP', 'TIAV', 'TIAY', 'TIEV', 'TIEX', 'TIIN', 'TIIP', 'TIIV', 'TIOP', 'TIOR', 'TIOS', 'TIOW', 'TIUP', 'TIUQ', 'TIUT', 'TIUV', 'TIUX', 'TOAQ', 'TOAW', 'TOAX', 'TOEX', 'TOIR', 'TOIW', 'TOOR', 'TOOS', 'TOOW', 'TOUP', 'TOUS', 'TUAP', 'TUAQ', 'TUAS', 'TUAX', 'TUEP', 'TUIQ', 'TUIW', 'TUIX', 'TUOP', 'TUOR', 'TUUQ', 'VAAV', 'VAEP', 'VAER', 'VAEX', 'VAOW', 'VAOY', 'VAUP', 'VAUR', 'VAUW', 'VEAV', 'VEAY', 'VEIV', 'VEIX', 'VEON', 'VEOT', 'VEOX', 'VEOY', 'VEUQ', 'VEUT', 'VIAP', 'VIAR', 'VIAT', 'VIEN', 'VIEQ', 'VIEV', 'VIIP', 'VIIQ', 'VIIS', 'VION', 'VIOQ', 'VIOW', 'VIUR', 'VIUV', 'VIUX', 'VOAP', 'VOAS', 'VOAV', 'VOEX', 'VOIP', 'VOIQ', 'VOIS', 'VOON', 'VOOQ', 'VOOV', 'VOOX', 'VOUP', 'VOUR', 'VUAV', 'VUET', 'VUEY', 'VUIQ', 'VUIV', 'VUIY', 'VUON', 'VUOQ', 'VUUV', 'VUUW', 'VUUX', 'WAAP', 'WAAY', 'WAEN', 'WAEP', 'WAEV', 'WAIS', 'WAIW', 'WAOP', 'WAOW', 'WAOX', 'WAUN', 'WAUQ', 'WEAX', 'WEEY', 'WEIT', 'WEIX', 'WEON', 'WEOQ', 'WEOY', 'WEUP', 'WEUW', 'WIAT', 'WIEQ', 'WIIN', 'WIIS', 'WIIT', 'WIOP', 'WIOQ', 'WIOR', 'WIOS', 'WIOY', 'WIUT', 'WIUV', 'WIUW', 'WIUX', 'WOAX', 'WOAY', 'WOER', 'WOET', 'WOEX', 'WOEY', 'WOIQ', 'WOOQ', 'WOOR', 'WOOT', 'WOOV', 'WOUQ', 'WOUV', 'WOUY', 'WUAY', 'WUEN', 'WUER', 'WUEV', 'WUEW', 'WUIP', 'WUON', 'WUUN', 'WUUP', 'WUUR', 'WUUW', 'WUUX', 'XAAW', 'XAEQ', 'XAEV', 'XAEW', 'XAEY', 'XAIQ', 'XAIR', 'XAOP', 'XAOR', 'XAOS', 'XAUR', 'XAUS', 'XEAR', 'XEAW', 'XEEP', 'XEER', 'XEET', 'XEIN', 'XEIQ', 'XEIS', 'XEIT', 'XEIW', 'XEOP', 'XEOQ', 'XEOR', 'XEOV', 'XEOY', 'XEUR', 'XEUV', 'XEUY', 'XIAP', 'XIAT', 'XIET', 'XIEV', 'XIEX', 'XIIT', 'XIOS', 'XIUT', 'XIUW', 'XIUX', 'XIUY', 'XOEN', 'XOEQ', 'XOOP', 'XOOV', 'XOUN', 'XOUP', 'XOUS', 'XOUY', 'XUAY', 'XUEN', 'XUEY', 'XUIP', 'XUOS', 'XUOT', 'XUOY', 'XUUP', 'XUUR', 'YAAQ', 'YAAW', 'YAEN', 'YAEX', 'YAIN', 'YAIQ', 'YAIT', 'YAON', 'YAOR', 'YAOS', 'YAOT', 'YAOX', 'YAUN', 'YAUT', 'YAUX', 'YEAQ', 'YEAX', 'YEET', 'YEEV', 'YEIP', 'YEIS', 'YEIT', 'YEIV', 'YEOV', 'YEUN', 'YEUT', 'YIAV', 'YIER', 'YIET', 'YIIN', 'YIIX', 'YION', 'YIOP', 'YIOT', 'YIUN', 'YIUP', 'YIUR', 'YOAS', 'YOAT', 'YOAW', 'YOAY', 'YOEN', 'YOES', 'YOEX', 'YOIT', 'YOIX', 'YOOP', 'YOOW', 'YOUS', 'YOUT', 'YUAQ', 'YUAR', 'YUAS', 'YUAW', 'YUEN', 'YUES', 'YUIQ', 'YUIR', 'YUIS', 'YUIT', 'YUOQ', 'YUOW', 'YUUQ', 'YUUV', 'YUUW', 'YUUY', 'BAAW', 'BAIP', 'BAIQ', 'BAIS', 'BAIY', 'BAUN', 'BAUQ', 'BAUR', 'BAUT', 'BAUX', 'BAUY', 'BEAP', 'BEEV', 'BEEX', 'BEEY', 'BEIR', 'BEIW', 'BEON', 'BEOP', 'BEOQ', 'BEOV', 'BEOY', 'BEUP', 'BEUQ', 'BEUR', 'BEUX', 'BEUY', 'BIAN', 'BIAT', 'BIEP', 'BIIN', 'BIIP', 'BIIT', 'BIIW', 'BIOR', 'BIOT', 'BIOX', 'BIUR', 'BIUV', 'BOAX', 'BOEP', 'BOEQ', 'BOIN', 'BOIX', 'BOOX', 'BOUV', 'BOUY', 'BUAP', 'BUAQ', 'BUAT', 'BUEQ', 'BUES', 'BUIN', 'BUIR', 'BUIY', 'BUUN', 'BUUV', 'BUUY', 'CAAR', 'CAAY', 'CAEN', 'CAER', 'CAES', 'CAET', 'CAEX', 'CAIY', 'CAON', 'CAOP', 'CAOT', 'CAOW', 'CAUQ', 'CAUV', 'CAUW', 'CAUX', 'CEAN', 'CEAP', 'CEET', 'CEEX', 'CEIS', 'CEON', 'CEOP', 'CEOQ', 'CEOS', 'CEOW', 'CEUT', 'CIAN', 'CIEN', 'CIER', 'CIIP', 'CIIQ', 'CIIT', 'CIIV', 'CIIX', 'CIOS', 'CIUP', 'CIUV', 'CIUW', 'CIUX', 'COAN', 'COAP', 'COEP', 'COIQ', 'COIS', 'COIT', 'COIW', 'COIY', 'COOR', 'COUS', 'COUT', 'CUAN', 'CUAP', 'CUAS', 'CUEN', 'CUEV', 'CUEW', 'CUEX', 'CUEY', 'CUIP', 'CUIW', 'CUIY', 'CUOP', 'CUOR', 'CUOV', 'CUOY', 'CUUW', 'CUUY', 'DAAP', 'DAAQ', 'DAET', 'DAEV', 'DAEY', 'DAIN', 'DAIP', 'DAOS', 'DAUP', 'DEAQ', 'DEAS', 'DEAV', 'DEEV', 'DEIV', 'DEOR', 'DEOS', 'DEUQ', 'DEUX', 'DIAP', 'DIAY', 'DIEN', 'DIEW', 'DIEY', 'DIIN', 'DIIP', 'DIIR', 'DIIX', 'DIOY', 'DIUN', 'DIUW', 'DOAQ', 'DOAR', 'DOAS', 'DOAW', 'DOEP', 'DOEQ', 'DOEX', 'DOIN', 'DOUQ', 'DOUT', 'DOUV', 'DOUX', 'DUAT', 'DUAY', 'DUEN', 'DUIV', 'DUIY', 'DUOT', 'DUOV', 'DUOX', 'DUUS', 'DUUV', 'FAAN', 'FAAQ', 'FAAR', 'FAAV', 'FAAX', 'FAET', 'FAEX', 'FAIP', 'FAIQ', 'FAIT', 'FAOY', 'FAUR', 'FAUW', 'FEAQ', 'FEAV', 'FEEN', 'FEIV', 'FEOT', 'FEOW', 'FEUP', 'FEUR', 'FEUV', 'FEUX', 'FIAX', 'FIEN', 'FIIP', 'FIIW', 'FIOR', 'FIOV', 'FIUN', 'FIUP', 'FIUR', 'FIUX', 'FOAT', 'FOER', 'FOET', 'FOIS', 'FOIY', 'FOOP', 'FOOX', 'FOOY', 'FOUN', 'FOUQ', 'FOUW', 'FUAN', 'FUAP', 'FUAW', 'FUEP', 'FUET', 'FUIS', 'FUIT', 'FUIW', 'FUOR', 'FUUR', 'FUUY', 'GAAV', 'GAAW', 'GAAY', 'GAEQ', 'GAER', 'GAEV', 'GAEW', 'GAIR', 'GAIW', 'GAOV', 'GAUQ', 'GEAY', 'GEEV', 'GEEY', 'GEIS', 'GEIV', 'GEOQ', 'GEOT', 'GEOX', 'GEUP', 'GEUW', 'GIAT', 'GIAV', 'GIAW', 'GIAX', 'GIAY', 'GIEW', 'GIIV', 'GIOW', 'GIUS', 'GOAP', 'GOAQ', 'GOAR', 'GOAX', 'GOEV', 'GOIV', 'GOIX', 'GOIY', 'GOOQ', 'GOUQ', 'GOUV', 'GOUX', 'GUAY', 'GUEN', 'GUEQ', 'GUES', 'GUEW', 'GUEX', 'GUIN', 'GUIP', 'GUIW', 'GUOP', 'GUUX', 'HAAX', 'HAEP', 'HAEQ', 'HAEW', 'HAIW', 'HAON', 'HAOR', 'HAOT', 'HAOW', 'HAOY', 'HAUR', 'HAUT', 'HEAQ', 'HEAX', 'HEEY', 'HEON', 'HEOR', 'HEOV', 'HEOY', 'HIET', 'HIEY', 'HIIS', 'HIIT', 'HIIW', 'HIOQ', 'HIOT', 'HIUN', 'HIUP', 'HOAN', 'HOAV', 'HOAY', 'HOEV', 'HOIP', 'HOIQ', 'HOIS', 'HOUN', 'HOUP', 'HUIP', 'HUOQ', 'HUOT', 'HUOV', 'HUOY', 'HUUT', 'JAAN', 'JAAT', 'JAAV', 'JAAY', 'JAEQ', 'JAES', 'JAEW', 'JAEX', 'JAIP', 'JAIQ', 'JAIR', 'JAOT', 'JAOY', 'JAUR', 'JAUV', 'JEAS', 'JEAW', 'JEAX', 'JEEQ', 'JEIQ', 'JEIT', 'JEOS', 'JEOT', 'JEOX', 'JEUP', 'JEUQ', 'JIAN', 'JIEN', 'JIES', 'JIEX', 'JIOV', 'JIOY', 'JIUQ', 'JIUR', 'JIUS', 'JIUW', 'JIUX', 'JOAP', 'JOEQ', 'JOIT', 'JOUN', 'JOUR', 'JOUS', 'JUAQ', 'JUAX', 'JUIS', 'JUOR', 'JUOT', 'JUOV', 'JUUR', 'JUUS', 'KAAT', 'KAAY', 'KAEN', 'KAEP', 'KAEV', 'KAIP', 'KAIQ', 'KAIR', 'KAIS', 'KAIY', 'KAOP', 'KAOR', 'KAOT', 'KAOY', 'KAUT', 'KEAV', 'KEAX', 'KEEQ', 'KEEV', 'KEEX', 'KEIY', 'KEOX', 'KEUN', 'KEUP', 'KEUQ', 'KIAP', 'KIAX', 'KIEV', 'KIEW', 'KIIP', 'KIIV', 'KIIW', 'KIOR', 'KIOX', 'KIUP', 'KOAW', 'KOAX', 'KOEV', 'KOIQ', 'KOIY', 'KOUR', 'KOUV', 'KUAN', 'KUAP', 'KUAX', 'KUAY', 'KUEQ', 'KUER', 'KUEX', 'KUIN', 'KUON', 'KUOQ', 'KUOV', 'KUUN', 'KUUQ', 'KUUW', 'KUUX', 'LAAV', 'LAER', 'LAEV', 'LAIQ', 'LAON', 'LAUT', 'LEAQ', 'LEAX', 'LEEW', 'LEEX', 'LEIR', 'LEOR', 'LEUP', 'LEUQ', 'LIAV', 'LIEV', 'LIIQ', 'LIIS', 'LIIT', 'LIIX', 'LIIY', 'LIOP', 'LIOQ', 'LIOV', 'LIUQ', 'LOAR', 'LOAX', 'LOAY', 'LOEN', 'LOIR', 'LOIW', 'LOOR', 'LOOV', 'LOUX', 'LUAP', 'LUAQ', 'LUAT', 'LUEX', 'LUIY', 'LUON', 'LUOP', 'LUUV', 'MAAQ', 'MAEP', 'MAEQ', 'MAET', 'MAEV', 'MAIT', 'MAOQ', 'MAOW', 'MAUR', 'MAUS', 'MEAP', 'MEEY', 'MEIP', 'MEIS', 'MEON', 'MEOQ', 'MEOX', 'MEUT', 'MIAS', 'MIAT', 'MIAY', 'MIEV', 'MIEW', 'MIIY', 'MIOX', 'MIUQ', 'MIUW', 'MIUX', 'MOAY', 'MOEW', 'MOEX', 'MOIN', 'MOIP', 'MOIQ', 'MOIS', 'MOIY', 'MOOW', 'MOUR', 'MOUS', 'MUAR', 'MUEN', 'MUER', 'MUEX', 'MUIP', 'MUOQ', 'MUOR', 'MUOS', 'MUOY', 'MUUQ', 'MUUT', 'MUUW', 'BAAZ', 'BAOZ', 'BAUZ', 'BEEZ', 'BIEZ', 'BOIZ', 'BUEZ', 'BUIZ', 'BUOZ', 'CAIZ', 'CAOZ', 'CEUZ', 'CIAZ', 'CIEZ', 'COAZ', 'COUZ', 'DAAZ', 'DAUZ', 'DIIZ', 'DIOZ', 'DIUZ', 'DUAZ', 'DUOZ', 'FAUZ', 'FEEZ', 'FEIZ', 'FIEZ', 'FIIZ', 'FIUZ', 'FOUZ', 'GAIZ', 'GIIZ', 'GIOZ', 'GOAZ', 'GUIZ', 'HAUZ', 'HEEZ', 'HEOZ', 'HIAZ', 'HIOZ', 'HIUZ', 'HOEZ', 'JAEZ', 'JAOZ', 'JAUZ', 'JEOZ', 'JEUZ', 'JIOZ', 'JOIZ', 'JOUZ', 'JUOZ', 'KIIZ', 'KOUZ', 'KUEZ', 'KUUZ', 'LAAZ', 'LAIZ', 'LIEZ', 'LUOZ', 'MAAZ', 'MAOZ', 'MEAZ', 'MEUZ', 'MIAZ', 'MIOZ', 'MUOZ'];
stimulus_2_bucket = ['JAX', 'CEB', 'VUS', 'BAZ', 'LOY', 'QUM', 'LIY', 'YUG', 'JUM', 'TUM', 'PAZ', 'JOX', 'MUJ', 'RIQ', 'KAG', 'XOD', 'YUY', 'GOV', 'MAZ', 'DUY', 'CAS', 'WOD', 'FUP', 'SUK', 'PID', 'XIT', 'PUJ', 'DUK', 'FEG', 'BAW', 'TEB', 'XOP', 'HEH', 'XEJ', 'QAV', 'YOL', 'GEG', 'SES', 'YEG', 'CIF', 'QOP', 'SEH', 'BIF', 'YOV', 'POB', 'VEK', 'QIM', 'XIK', 'XEY', 'BOQ', 'SAQ', 'QAR', 'YIK', 'YAT', 'YUL', 'GOF', 'BUW', 'GEF', 'YAN', 'TIF', 'SIZ', 'SEG', 'FAL', 'DED', 'SAZ', 'RUZ', 'TUY', 'GEZ', 'BAJ', 'YAB', 'BUX', 'HAB', 'KOH', 'JEP', 'QOK', 'QOD', 'DUL', 'PIY', 'WUV', 'FIP', 'XAL', 'HIB', 'FEK', 'BOV', 'WER', 'TUC', 'HOX', 'TIR', 'QIW', 'MIF', 'YUW', 'XUX', 'KUC', 'QOS', 'NUX', 'XOW', 'WAV', 'BOH', 'FUC', 'WAC', 'XUH', 'CAQ', 'BAC', 'CAC', 'HIF', 'NIJ', 'QIL', 'JUJ', 'JIT', 'DAF', 'NIZ', 'DIW', 'XAY', 'YUF', 'RIX', 'SIF', 'HUV', 'GEB', 'FUQ', 'TAC', 'XEX', 'DET', 'YIR', 'TOV', 'NEC', 'SUW', 'SUG', 'PEZ', 'VEB', 'VEM', 'SUC', 'RUV', 'GEJ', 'MIQ', 'MUV', 'BOZ', 'YEL', 'XIH', 'QUF', 'QIN', 'HIL', 'QIS', 'QUJ', 'XAW', 'QOQ', 'HEC', 'QIJ', 'BOC', 'VEQ', 'XOL', 'SIJ', 'NOQ', 'LEP', 'NAH', 'KAW', 'LUQ', 'MER', 'VOG', 'JUC', 'DUH', 'TEJ', 'KIS', 'YIJ', 'JOZ', 'TES', 'HOH', 'TEC', 'SAV', 'XIL', 'XOV', 'QIB', 'KET', 'KUX', 'WEC', 'SOJ', 'WOJ', 'NAF', 'FAW', 'VUM', 'QAW', 'WIF', 'HUX', 'GAX', 'JEL', 'KEB', 'WOX', 'FOJ', 'JUR', 'VIQ', 'XOZ', 'HIX', 'SUT', 'GUR', 'XEK', 'HAC', 'QEK', 'RUF', 'FOZ', 'CEF', 'YOX', 'CEZ', 'QOJ', 'FIC', 'NER', 'KEC', 'LOH', 'SEQ', 'FUF', 'NUY', 'ROP', 'LIR', 'MOY', 'HAX', 'XOF', 'NIV', 'FAQ', 'PEF', 'PEV', 'QUH', 'FOD', 'MUC', 'CAJ', 'YIX', 'FEJ', 'MEQ', 'QEJ', 'BAQ', 'TIB', 'YAJ', 'DOQ', 'TOH', 'DUQ', 'QET', 'SEY', 'MOC', 'POQ', 'COJ', 'FAZ', 'NEQ', 'DIF', 'SAJ', 'SUV', 'WUQ', 'BAP', 'XIJ', 'WUT', 'PIM', 'WOZ', 'WUZ', 'PEM', 'WUH', 'NEH', 'DUX', 'QUD', 'JAZ', 'FOC', 'HUY', 'NIC', 'FOV', 'HOV', 'FUZ', 'VOK', 'KOW', 'JOP', 'QAX', 'VUH', 'PIZ', 'RUC', 'XAH', 'MOV', 'WOB', 'RIR', 'TIQ', 'CEN', 'BEM', 'GEP', 'WOC', 'YUH', 'GEQ', 'QOL', 'TIV', 'BAAH', 'BAED', 'BAEM', 'BAIB', 'BAID', 'BAIH', 'BAIJ', 'BAIK', 'BAOC', 'BAOG', 'BAUB', 'BEAB', 'BEAC', 'BEAJ', 'BEEB', 'BEED', 'BEEM', 'BEIB', 'BEIF', 'BEIH', 'BEIK', 'BEOD', 'BEOG', 'BEOM', 'BEUB', 'BIAC', 'BIAD', 'BIAJ', 'BIAM', 'BIEC', 'BIEM', 'BIIG', 'BIOL', 'BIUD', 'BIUF', 'BIUL', 'BOAC', 'BOAK', 'BOIC', 'BOIF', 'BOOL', 'BOUH', 'BUAC', 'BUEG', 'BUIB', 'BUID', 'BUIG', 'BUIM', 'BUOF', 'BUOG', 'BUOJ', 'BUUJ', 'CAAC', 'CAAD', 'CAEB', 'CAEF', 'CAEG', 'CAEK', 'CAEL', 'CAEM', 'CAIC', 'CAIF', 'CAIK', 'CAIL', 'CAOB', 'CAOC', 'CAOG', 'CAOL', 'CAUB', 'CEAG', 'CEAH', 'CEAK', 'CEAM', 'CEEB', 'CEIM', 'CEOG', 'CEUH', 'CEUJ', 'CEUL', 'CEUM', 'CIAB', 'CIAL', 'CIIG', 'CIIH', 'CIIJ', 'CIOL', 'CIUF', 'CIUK', 'COAD', 'COAG', 'COAH', 'COEB', 'COEF', 'COEG', 'COEJ', 'COEK', 'COID', 'COOM', 'COUB', 'COUF', 'COUG', 'COUL', 'CUAH', 'CUEG', 'CUIB', 'CUID', 'CUIG', 'CUOG', 'CUOH', 'CUOK', 'CUUB', 'CUUC', 'CUUD', 'CUUF', 'CUUH', 'CUUM', 'DAAC', 'DAAF', 'DAEB', 'DAEF', 'DAEG', 'DAEH', 'DAEJ', 'DAID', 'DAOH', 'DAOK', 'DAOM', 'DAUC', 'DAUD', 'DAUF', 'DAUH', 'DAUJ', 'DEAJ', 'DEEC', 'DEEH', 'DEEJ', 'DEOC', 'DEOF', 'DEOL', 'DEOM', 'DIAF', 'DIAG', 'DIEG', 'DIEM', 'DIIC', 'DIUC', 'DOAF', 'DOAG', 'DOAM', 'DOID', 'DOIF', 'DOIH', 'DOOB', 'DOOJ', 'DUAG', 'DUAH', 'DUEB', 'DUED', 'DUEF', 'DUEJ', 'DUEK', 'DUIJ', 'DUUJ', 'FAAB', 'FAEC', 'FAEF', 'FAEH', 'FAOC', 'FAOM', 'FAUC', 'FAUF', 'FAUK', 'FEEM', 'FEIC', 'FEID', 'FEIG', 'FEIH', 'FEOB', 'FIAF', 'FIAK', 'FIAL', 'FIEK', 'FIID', 'FIIL', 'FIOB', 'FIOH', 'FIOK', 'FIOL', 'FIUD', 'FIUK', 'FOEH', 'FOIB', 'FOID', 'FOOB', 'FOOG', 'FOOJ', 'FOUF', 'FOUK', 'FUAF', 'FUEF', 'FUEJ', 'FUEM', 'FUIC', 'FUIJ', 'FUIL', 'FUIM', 'FUOB', 'FUOD', 'FUOF', 'FUUF', 'FUUL', 'FUUM', 'GAAH', 'GAID', 'GAOB', 'GAOC', 'GAOD', 'GAOJ', 'GAOK', 'GAUB', 'GAUF', 'GEAG', 'GEEC', 'GEEJ', 'GEIJ', 'GEOC', 'GEUB', 'GEUF', 'GIAB', 'GIAH', 'GIAJ', 'GIEB', 'GIEC', 'GIEF', 'GIEG', 'GIEJ', 'GIEL', 'GIID', 'GIIJ', 'GIIK', 'GIOC', 'GIOD', 'GIOH', 'GIOK', 'GIUD', 'GOAC', 'GOAJ', 'GOEC', 'GOEF', 'GOEG', 'GOEJ', 'GOEK', 'GOID', 'GOIG', 'GOOB', 'GOOL', 'GOUK', 'GOUL', 'GUAC', 'GUAF', 'GUAK', 'GUEG', 'GUEH', 'GUIJ', 'GUIM', 'GUOC', 'GUOF', 'GUOG', 'GUOL', 'GUUJ', 'GUUL', 'HAAB', 'HAEC', 'HAEH', 'HAIC', 'HAID', 'HAIF', 'HAIJ', 'HAIM', 'HAOB', 'HAOC', 'HAOD', 'HAOG', 'HAOL', 'HEAB', 'HEAC', 'HEAH', 'HEEH', 'HEEJ', 'HEID', 'HEIH', 'HEUC', 'HEUD', 'HEUG', 'HEUK', 'HIAH', 'HIEC', 'HIEG', 'HIEH', 'HIEM', 'HIIG', 'HIIK', 'HIIL', 'HIOF', 'HIOG', 'HIOH', 'HIOL', 'HIOM', 'HIUL', 'HIUM', 'HOAB', 'HOAD', 'HOAG', 'HOAH', 'HOAL', 'HOAM', 'HOEJ', 'HOEM', 'HOIK', 'HOOH', 'HOOJ', 'HOUB', 'HOUL', 'HUAB', 'HUAD', 'HUEC', 'HUIH', 'HUIM', 'HUOD', 'HUOF', 'HUOG', 'HUOL', 'HUUD', 'HUUK', 'JAAB', 'JAAF', 'JAAM', 'JAED', 'JAEJ', 'JAEM', 'JAIH', 'JAIJ', 'JAOD', 'JAOH', 'JAOK', 'JAUC', 'JAUM', 'JEAD', 'JEAF', 'JEAH', 'JEEG', 'JEIC', 'JEID', 'JEIF', 'JEIH', 'JEIJ', 'JEIK', 'JEIL', 'JEOF', 'JEUB', 'JEUD', 'JIAD', 'JIAL', 'JIEF', 'JIEL', 'JIUF', 'JIUG', 'JIUJ', 'JIUM', 'JOAF', 'JOEB', 'JOIB', 'JOIF', 'JOIM', 'JOOF', 'JOUB', 'JUAC', 'JUAF', 'JUAJ', 'JUEF', 'JUEH', 'JUIJ', 'JUOF', 'JUOH', 'JUUB', 'JUUF', 'JUUG', 'JUUK', 'JUUL', 'KAAD', 'KAED', 'KAEJ', 'KAEK', 'KAEL', 'KAEM', 'KAIG', 'KAIH', 'KAIJ', 'KAIK', 'KAOC', 'KAUH', 'KEAJ', 'KEAK', 'KEEG', 'KEIF', 'KEIG', 'KEOB', 'KIAC', 'KIAG', 'KIAK', 'KIEG', 'KIEH', 'KIIJ', 'KIOF', 'KIOJ', 'KIOL', 'KIUG', 'KOAH', 'KOAJ', 'KOAK', 'KOEF', 'KOEH', 'KOEM', 'KOIB', 'KOID', 'KOIF', 'KOOM', 'KOUF', 'KOUL', 'KOUM', 'KUAB', 'KUAF', 'KUAL', 'KUEC', 'KUEH', 'KUIM', 'KUOD', 'KUOF', 'KUOK', 'KUOL', 'KUUC', 'KUUD', 'LAAB', 'LAAC', 'LAAL', 'LAEF', 'LAEH', 'LAEL', 'LAEM', 'LAIF', 'LAIK', 'LAUC', 'LAUG', 'LAUJ', 'LAUK', 'LEAB', 'LEAC', 'LEEF', 'LEEJ', 'LEIC', 'LEIJ', 'LEIM', 'LEOB', 'LEOD', 'LEUF', 'LEUJ', 'LIAD', 'LIEB', 'LIEC', 'LIIL', 'LIOC', 'LIOK', 'LIOL', 'LIUB', 'LIUC', 'LOAK', 'LOID', 'LOIF', 'LOIG', 'LOIJ', 'LOIK', 'LOIL', 'LOOB', 'LOOC', 'LOUF', 'LOUL', 'LUAJ', 'LUEB', 'LUEG', 'LUEK', 'LUIG', 'LUOM', 'LUUF', 'LUUK', 'LUUL', 'MAAC', 'MAAD', 'MAAJ', 'MAED', 'MAEF', 'MAEJ', 'MAIB', 'MAIJ', 'MAIK', 'MAOC', 'MAOJ', 'MAOK', 'MAOL', 'MAUC', 'MAUF', 'MAUJ', 'MAUM', 'MEAH', 'MEAK', 'MEEC', 'MEIC', 'MEOF', 'MEOM', 'MIAB', 'MIAH', 'MIEH', 'MIIH', 'MIIK', 'MIOB', 'MIOG', 'MIOH', 'MIUD', 'MIUH', 'MIUL', 'MOAJ', 'MOAL', 'MOAM', 'MOEB', 'MOEK', 'MOIC', 'MOOJ', 'MOUF', 'MUAF', 'MUAG', 'MUAH', 'MUEB', 'MUEC', 'MUED', 'MUEG', 'MUIH', 'MUOC', 'MUOG', 'MUOK', 'MUOM', 'MUUG', 'MUUK', 'MUUM', 'NAAB', 'NAAC', 'NAAJ', 'NAEG', 'NAEH', 'NAEJ', 'NAID', 'NAIG', 'NAOD', 'NAOM', 'NAUC', 'NAUD', 'NAUF', 'NAUM', 'NEAD', 'NEAF', 'NEEH', 'NEIB', 'NEIH', 'NEIM', 'NEOC', 'NEUC', 'NEUG', 'NEUL', 'NIAC', 'NIAM', 'NIEG', 'NIEH', 'NIEJ', 'NIIJ', 'NIIL', 'NIIM', 'NIOF', 'NIOK', 'NIUC', 'NIUK', 'NIUM', 'NOAC', 'NOAG', 'NOEB', 'NOEH', 'NOIF', 'NOOC', 'NOOF', 'NOOG', 'NOUD', 'NOUG', 'NOUJ', 'NUAB', 'NUAG', 'NUAM', 'NUEJ', 'NUIB', 'NUIF', 'NUUG', 'NUUK', 'PAAC', 'PAAF', 'PAAK', 'PAAM', 'PAEB', 'PAEC', 'PAEK', 'PAIH', 'PAOB', 'PAOC', 'PAOD', 'PAOJ', 'PAUC', 'PAUJ', 'PEEB', 'PEEC', 'PEEM', 'PEID', 'PEIH', 'PEOB', 'PEOH', 'PEUB', 'PEUH', 'PIAJ', 'PIIG', 'PIIJ', 'PIOC', 'PIUH', 'PIUL', 'POAJ', 'POAK', 'POEB', 'POEG', 'POIG', 'POOB', 'POOC', 'POUG', 'POUJ', 'POUK', 'PUAL', 'PUEH', 'PUEL', 'PUIF', 'PUIJ', 'PUOH', 'PUOL', 'PUUG', 'PUUH', 'QAAC', 'QAAK', 'QAAL', 'QAEC', 'QAEH', 'QAEJ', 'QAIG', 'QAIM', 'QAOB', 'QAOC', 'QAUD', 'QEAJ', 'QEEK', 'QEOG', 'QEOL', 'QEUB', 'QEUK', 'QEUL', 'QIAB', 'QIAC', 'QIAH', 'QIEB', 'QIED', 'QIEG', 'QIEJ', 'QIIF', 'QIOB', 'QIOD', 'QIOH', 'QIOJ', 'QIOM', 'QIUD', 'QIUG', 'QOAC', 'QOAF', 'QOAG', 'QOEK', 'QOIH', 'QOUG', 'QOUK', 'QOUL', 'QOUM', 'QUAC', 'QUAJ', 'QUEC', 'QUEF', 'QUEH', 'QUEJ', 'QUEK', 'QUEL', 'QUIF', 'QUOM', 'QUUB', 'QUUH', 'RAAB', 'RAAG', 'RAED', 'RAEF', 'RAIH', 'RAIK', 'RAOJ', 'REAG', 'REAK', 'REEB', 'REEC', 'REEM', 'REIH', 'REOH', 'REUB', 'REUL', 'RIAG', 'RIAH', 'RIAK', 'RIEB', 'RIIF', 'RIIJ', 'RIUB', 'RIUF', 'RIUJ', 'RIUM', 'ROAC', 'ROED', 'ROEG', 'ROEL', 'ROIC', 'ROIG', 'ROUF', 'ROUG', 'ROUL', 'RUAB', 'RUAH', 'RUAM', 'RUEC', 'RUEM', 'RUIK', 'RUOD', 'RUOK', 'SAAH', 'SAED', 'SAEG', 'SAIB', 'SAIF', 'SAIJ', 'SAIM', 'SAOD', 'SAOF', 'SAOG', 'SAOK', 'SAOM', 'SAUC', 'SEAF', 'SEAK', 'SEEF', 'SEEG', 'SEIG', 'SEOB', 'SEOG', 'SEOH', 'SEOK', 'SEOL', 'SEUJ', 'SEUK', 'SEUM', 'SIAD', 'SIEM', 'SIID', 'SIIF', 'SIOB', 'SIUC', 'SIUJ', 'SIUK', 'SOAF', 'SOAH', 'SOEM', 'SOIB', 'SOIG', 'SOOF', 'SOOH', 'SOOK', 'SOOL', 'SOUB', 'SOUG', 'SOUK', 'SUAB', 'SUAJ', 'SUAK', 'SUEG', 'SUEM', 'SUIK', 'SUOC', 'SUOD', 'SUOF', 'SUOG', 'SUOH', 'SUOJ', 'SUOL', 'SUUF', 'SUUG', 'SUUJ', 'TAAD', 'TAAF', 'TAEB', 'TAEG', 'TAEJ', 'TAEK', 'TAIM', 'TAOD', 'TAOL', 'TAUF', 'TAUG', 'TAUJ', 'TEAF', 'TEID', 'TEOF', 'TEOH', 'TEUK', 'TEUL', 'TIAC', 'TIAJ', 'TIEM', 'TIID', 'TIIG', 'TIIH', 'TIUB', 'TIUJ', 'TIUK', 'TOAC', 'TOAK', 'TOIC', 'TOID', 'TOIF', 'TOUC', 'TOUD', 'TOUK', 'TUAC', 'TUAD', 'TUAG', 'TUAJ', 'TUAK', 'TUAM', 'TUEB', 'TUEF', 'TUEG', 'TUEH', 'TUOB', 'TUOD', 'TUOF', 'TUOH', 'TUUK', 'VAAB', 'VAAD', 'VAAF', 'VAEC', 'VAED', 'VAEG', 'VAEK', 'VAEM', 'VAIC', 'VAIK', 'VAIM', 'VAOH', 'VAUD', 'VAUF', 'VAUG', 'VAUL', 'VEEC', 'VEIB', 'VEIH', 'VEOB', 'VEOG', 'VEOH', 'VEOL', 'VEOM', 'VEUC', 'VEUD', 'VEUM', 'VIAF', 'VIEC', 'VIEG', 'VIEK', 'VIIB', 'VIIC', 'VIIM', 'VIOC', 'VIOF', 'VOEC', 'VOED', 'VOEH', 'VOIB', 'VOIF', 'VOIK', 'VOIL', 'VOOB', 'VOOG', 'VOOJ', 'VOOL', 'VOOM', 'VOUG', 'VUAC', 'VUAJ', 'VUAM', 'VUEF', 'VUEG', 'VUEJ', 'VUEL', 'VUID', 'VUOF', 'VUOJ', 'VUOL', 'WAAF', 'WAAM', 'WAEG', 'WAIC', 'WAIJ', 'WAOB', 'WAOJ', 'WAOK', 'WAUC', 'WAUJ', 'WAUM', 'WEAD', 'WEAF', 'WEEB', 'WEIC', 'WEOB', 'WEOJ', 'WEOK', 'WEUJ', 'WIAB', 'WIAF', 'WIEJ', 'WIEM', 'WIIF', 'WIOB', 'WIOF', 'WIOG', 'WIOH', 'WIUG', 'WOAF', 'WOAJ', 'WOAL', 'WOEJ', 'WOEK', 'WOEL', 'WOEM', 'WOIL', 'WOOJ', 'WOUF', 'WOUG', 'WOUH', 'WOUK', 'WOUM', 'WUAC', 'WUAJ', 'WUAK', 'WUAL', 'WUAM', 'WUEF', 'WUEJ', 'WUIG', 'WUIJ', 'WUOC', 'WUOD', 'WUOF', 'WUOH', 'WUOK', 'WUOL', 'WUOM', 'WUUM', 'XAAB', 'XAAC', 'XAAK', 'XAEF', 'XAEK', 'XAIB', 'XAIH', 'XAOG', 'XAOH', 'XAOK', 'XAUF', 'XAUJ', 'XAUK', 'XEAB', 'XEAD', 'XEAF', 'XEEG', 'XEEM', 'XEID', 'XEIG', 'XEOB', 'XEUC', 'XIAB', 'XIAG', 'XIAK', 'XIEB', 'XIEC', 'XIEK', 'XIEM', 'XIIB', 'XIID', 'XIIK', 'XIOH', 'XIUB', 'XIUC', 'XIUK', 'XOAB', 'XOAM', 'XOEC', 'XOED', 'XOEF', 'XOEL', 'XOID', 'XOIF', 'XOIH', 'XOIL', 'XOIM', 'XOOB', 'XOOJ', 'XOOK', 'XOUC', 'XOUF', 'XOUG', 'XOUJ', 'XUAD', 'XUAM', 'XUEF', 'XUEG', 'XUEH', 'XUEL', 'XUEM', 'XUIB', 'XUID', 'XUIF', 'XUIJ', 'XUOH', 'XUOJ', 'XUUB', 'XUUH', 'XUUJ', 'XUUL', 'YAAC', 'YAAF', 'YAAG', 'YAEC', 'YAEL', 'YAIG', 'YAIM', 'YAOL', 'YAOM', 'YAUB', 'YAUF', 'YAUL', 'YEAC', 'YEED', 'YEEM', 'YEIF', 'YEIH', 'YEIK', 'YEOF', 'YEOJ', 'YEOK', 'YEOL', 'YEUL', 'YIAB', 'YIAC', 'YIAF', 'YIAJ', 'YIAM', 'YIEB', 'YIED', 'YIEF', 'YIEJ', 'YIEL', 'YIIB', 'YIIL', 'YIOG', 'YIUB', 'YIUF', 'YIUH', 'YIUJ', 'YIUK', 'YOAF', 'YOAH', 'YOAL', 'YOED', 'YOEJ', 'YOEK', 'YOEL', 'YOIF', 'YOIJ', 'YOIL', 'YOOH', 'YOOM', 'YOUB', 'YOUJ', 'YOUL', 'YOUM', 'YUAH', 'YUAL', 'YUAM', 'YUEK', 'YUEL', 'YUEM', 'YUIJ', 'YUOG', 'YUOJ', 'YUOL', 'YUUD', 'YUUH', 'ZAAJ', 'ZAAM', 'ZAEG', 'ZAEJ', 'ZAEL', 'ZAIB', 'ZAIH', 'ZAIJ', 'ZAIL', 'ZAIM', 'ZAOB', 'ZAOG', 'ZAUB', 'ZAUC', 'ZAUL', 'ZEEC', 'ZEED', 'ZEEH', 'ZEEJ', 'ZEIJ', 'ZEOJ', 'ZEOL', 'ZEUB', 'ZEUF', 'ZIAG', 'ZIAJ', 'ZIAM', 'ZIEB', 'ZIEG', 'ZIIJ', 'ZIOL', 'ZOAD', 'ZOAF', 'ZOEC', 'ZOED', 'ZOEG', 'ZOEH', 'ZOIK', 'ZOOH', 'ZOUK', 'ZOUL', 'ZUAG', 'ZUED', 'ZUEL', 'ZUIB', 'ZUIH', 'ZUIJ', 'ZUIK', 'ZUOF', 'ZUOM', 'ZUUF', 'ZUUM', 'ZAEP', 'ZAEV', 'ZAEW', 'ZAIN', 'ZAIS', 'ZAIW', 'ZAOS', 'ZAUN', 'ZAUQ', 'ZAUR', 'ZAUX', 'ZEIQ', 'ZEIX', 'ZEIY', 'ZEOQ', 'ZEOX', 'ZEUP', 'ZEUV', 'ZEUY', 'ZIAS', 'ZIAT', 'ZIAV', 'ZIEP', 'ZIEW', 'ZIIQ', 'ZIIV', 'ZIOS', 'ZIOX', 'ZIOY', 'ZIUW', 'ZIUX', 'ZIUY', 'ZOAR', 'ZOAX', 'ZOEW', 'ZOEY', 'ZOIQ', 'ZOIS', 'ZOIV', 'ZOIX', 'ZOIY', 'ZOUQ', 'ZUAT', 'ZUAY', 'ZUEN', 'ZUER', 'ZUEV', 'ZUEX', 'ZUIN', 'ZUUN', 'ZUUY', 'ZAEZ', 'ZAIZ', 'ZAOZ', 'ZIUZ', 'ZOEZ', 'ZUOZ', 'NEAZ', 'NEOZ', 'NIOZ', 'NIUZ', 'NOEZ', 'NUAZ', 'PAEZ', 'PEEZ', 'PIEZ', 'POAZ', 'PUEZ', 'PUIZ', 'QAEZ', 'QEEZ', 'QUEZ', 'RAAZ', 'RAUZ', 'REAZ', 'REOZ', 'RUEZ', 'RUIZ', 'RUUZ', 'SAUZ', 'SEEZ', 'SEIZ', 'SOEZ', 'TAEZ', 'TAIZ', 'TEOZ', 'TEUZ', 'TIOZ', 'TOIZ', 'TOOZ', 'TUAZ', 'TUOZ', 'VAAZ', 'VAEZ', 'VAOZ', 'VEAZ', 'VEUZ', 'VIUZ', 'VUAZ', 'VUIZ', 'VUUZ', 'WAAZ', 'WIAZ', 'WIUZ', 'WOEZ', 'WOOZ', 'WOUZ', 'WUOZ', 'XAIZ', 'XAUZ', 'XEIZ', 'XEOZ', 'XIEZ', 'XIOZ', 'XOIZ', 'XUAZ', 'XUUZ', 'YAAZ', 'YOUZ', 'YUIZ', 'NAAV', 'NAAY', 'NAEP', 'NAET', 'NAIP', 'NAON', 'NAOP', 'NAOR', 'NAOV', 'NAOW', 'NAOX', 'NAUV', 'NAUX', 'NEAQ', 'NEAX', 'NEEV', 'NEEY', 'NEIX', 'NEOW', 'NEOX', 'NEUW', 'NIAQ', 'NIAR', 'NIAW', 'NIIT', 'NIIW', 'NION', 'NIOP', 'NIOS', 'NIUV', 'NOAS', 'NOET', 'NOEX', 'NOIV', 'NOOP', 'NOOQ', 'NOUP', 'NOUV', 'NOUW', 'NUAN', 'NUEQ', 'NUIP', 'NUIQ', 'NUIS', 'NUIV', 'NUOQ', 'NUUN', 'NUUT', 'NUUY', 'PAAQ', 'PAAT', 'PAEN', 'PAET', 'PAIT', 'PAIV', 'PAOQ', 'PAOR', 'PAUN', 'PEAQ', 'PEOX', 'PEUN', 'PEUP', 'PEUQ', 'PEUV', 'PIAP', 'PIEV', 'PIEW', 'PIIN', 'PIIX', 'PIUN', 'PIUV', 'POAR', 'POAV', 'POAY', 'POEV', 'POIN', 'POIW', 'POIX', 'POIY', 'POOQ', 'POOX', 'POUV', 'PUAX', 'PUAY', 'PUEQ', 'PUER', 'PUET', 'PUEW', 'PUEY', 'PUIS', 'PUOT', 'PUOW', 'PUUN', 'PUUP', 'PUUS', 'QAAV', 'QAAW', 'QAAX', 'QAAY', 'QAES', 'QAEX', 'QAON', 'QAOR', 'QAOW', 'QAOY', 'QAUQ', 'QAUR', 'QAUS', 'QAUT', 'QEER', 'QEIN', 'QEIP', 'QEOS', 'QEOV', 'QEOY', 'QEUV', 'QEUX', 'QIAP', 'QIAT', 'QIES', 'QIEV', 'QIIN', 'QIIP', 'QIIS', 'QIOR', 'QIUR', 'QOAW', 'QOEX', 'QOIT', 'QOIV', 'QOUN', 'QOUX', 'QUAQ', 'QUAT', 'QUAV', 'QUEN', 'QUEP', 'QUEV', 'QUIN', 'QUIR', 'QUIW', 'QUIX', 'QUOS', 'QUOW', 'QUOX', 'QUUW', 'QUUY', 'RAEV', 'RAIR', 'RAIX', 'RAIY', 'RAOT', 'RAOV', 'RAOW', 'REAT', 'REAV', 'REAW', 'REAX', 'REEW', 'REEX', 'REEY', 'REIQ', 'REIY', 'REOQ', 'REOS', 'REOV', 'REUN', 'REUP', 'REUV', 'REUX', 'RIAP', 'RIAQ', 'RIEW', 'RIIR', 'RIIS', 'RIIX', 'RIOP', 'RIOR', 'RIOX', 'RIUN', 'ROEN', 'ROEQ', 'ROEX', 'ROIN', 'ROIY', 'ROOW', 'ROUR', 'ROUY', 'RUAR', 'RUAV', 'RUEN', 'RUET', 'RUEV', 'RUIP', 'RUIQ', 'RUIR', 'RUIX', 'RUOR', 'RUOS', 'RUOT', 'RUOW', 'RUUQ', 'RUUT', 'SAAN', 'SAAP', 'SAAR', 'SAAS', 'SAEN', 'SAER', 'SAIV', 'SAIW', 'SAIX', 'SAOR', 'SAOS', 'SAUN', 'SAUQ', 'SEAP', 'SEAW', 'SEEX', 'SEON', 'SEOP', 'SEOT', 'SEOV', 'SEOX', 'SIAT', 'SIEP', 'SIEV', 'SIIQ', 'SIIT', 'SIIY', 'SIOP', 'SIOS', 'SIOV', 'SIOY', 'SIUP', 'SIUS', 'SIUT', 'SIUV', 'SOAT', 'SOAY', 'SOEV', 'SOIV', 'SOIW', 'SOOP', 'SOOV', 'SOUN', 'SOUT', 'SOUX', 'SUAQ', 'SUAT', 'SUAW', 'SUIR', 'SUIV', 'SUOP', 'SUOQ', 'SUOS', 'SUOY', 'SUUN', 'SUUP', 'TAAP', 'TAAQ', 'TAAR', 'TAAW', 'TAEN', 'TAER', 'TAIQ', 'TAIW', 'TAON', 'TAOQ', 'TAUV', 'TAUX', 'TEAN', 'TEAV', 'TEAX', 'TEEW', 'TEIV', 'TEOX', 'TEUS', 'TIAR', 'TIAX', 'TIEQ', 'TIIR', 'TION', 'TIOV', 'TIUN', 'TIUR', 'TIUW', 'TOAP', 'TOAT', 'TOEV', 'TOEY', 'TOIN', 'TOIV', 'TOUN', 'TOUQ', 'TOUX', 'TOUY', 'TUEQ', 'TUET', 'TUIR', 'TUON', 'TUOV', 'TUOW', 'TUOY', 'TUUS', 'VAAQ', 'VAEV', 'VAEW', 'VAIP', 'VAIQ', 'VAIV', 'VAOX', 'VAUQ', 'VAUT', 'VAUV', 'VAUX', 'VEAQ', 'VEAS', 'VEAT', 'VEAX', 'VEEV', 'VEEY', 'VEIS', 'VEIY', 'VEOQ', 'VEOS', 'VEOV', 'VEUN', 'VEUS', 'VEUY', 'VIAN', 'VIAV', 'VIAW', 'VIEY', 'VIIR', 'VIIW', 'VIIY', 'VIOP', 'VIUS', 'VIUT', 'VIUY', 'VOAW', 'VOAX', 'VOEN', 'VOEW', 'VOIT', 'VOIV', 'VOOT', 'VOOY', 'VOUX', 'VUAN', 'VUAW', 'VUEP', 'VUEQ', 'VUEW', 'VUEX', 'VUIN', 'VUOT', 'VUOV', 'VUOX', 'VUUQ', 'WAAT', 'WAER', 'WAEY', 'WAIQ', 'WAON', 'WAOT', 'WAUY', 'WEAV', 'WEAW', 'WEEV', 'WEEX', 'WEIS', 'WEIY', 'WEOP', 'WEOR', 'WEOS', 'WEUS', 'WIAP', 'WIAW', 'WIAX', 'WIIP', 'WIIY', 'WIOW', 'WIOX', 'WIUR', 'WOAS', 'WOAW', 'WOEQ', 'WOEV', 'WOIT', 'WOOW', 'WUAQ', 'WUAS', 'WUAW', 'WUEQ', 'WUET', 'WUEX', 'WUIR', 'WUOY', 'WUUQ', 'WUUS', 'XAAN', 'XAAQ', 'XAAY', 'XAER', 'XAIN', 'XAIS', 'XAIV', 'XAIX', 'XAOV', 'XAOY', 'XAUP', 'XAUT', 'XAUW', 'XAUY', 'XEAQ', 'XEEN', 'XEES', 'XEEV', 'XEUP', 'XEUQ', 'XIAR', 'XIAX', 'XIEW', 'XIIN', 'XIIR', 'XIIS', 'XIIV', 'XIIW', 'XIOT', 'XIOX', 'XIOY', 'XIUS', 'XOAY', 'XOEP', 'XOET', 'XOEW', 'XOIR', 'XOIS', 'XOIT', 'XOON', 'XOOQ', 'XOOR', 'XOOW', 'XOUQ', 'XOUT', 'XOUV', 'XUAT', 'XUAX', 'XUEP', 'XUEQ', 'XUET', 'XUIX', 'XUOQ', 'XUUQ', 'XUUS', 'XUUV', 'XUUW', 'XUUX', 'YAAN', 'YAAP', 'YAAX', 'YAET', 'YAEV', 'YAEW', 'YAIP', 'YAIR', 'YAIV', 'YAIW', 'YAIX', 'YAIY', 'YAOW', 'YAUV', 'YEAT', 'YEAW', 'YEAY', 'YEEP', 'YEEQ', 'YEEX', 'YEIN', 'YEIQ', 'YEIW', 'YEIY', 'YEOQ', 'YEOR', 'YEUP', 'YEUQ', 'YIAQ', 'YIEP', 'YIES', 'YIEW', 'YIEX', 'YIIP', 'YIIQ', 'YIOQ', 'YIOS', 'YIOV', 'YIUX', 'YIUY', 'YOAQ', 'YOER', 'YOEW', 'YOEY', 'YOIN', 'YOIP', 'YOIQ', 'YOIR', 'YOIW', 'YOIY', 'YOOV', 'YOUN', 'YOUW', 'YUAP', 'YUAY', 'YUEP', 'YUEQ', 'YUET', 'YUIP', 'YUIW', 'YUIX', 'YUIY', 'YUOS', 'YUOT', 'YUUT', 'BAAQ', 'BAEP', 'BAES', 'BAEV', 'BAEW', 'BAEY', 'BAIR', 'BAIW', 'BAIX', 'BAON', 'BAOP', 'BAOQ', 'BAOS', 'BAOV', 'BAOX', 'BAUP', 'BEAQ', 'BEAS', 'BEAV', 'BEEQ', 'BEEW', 'BEIQ', 'BEIS', 'BEIV', 'BEOT', 'BEUS', 'BEUT', 'BEUW', 'BIAW', 'BIAX', 'BIEN', 'BIEQ', 'BIOW', 'BIOY', 'BIUP', 'BIUT', 'BIUY', 'BOAV', 'BOAY', 'BOEV', 'BOEX', 'BOIR', 'BOIV', 'BOIY', 'BOOQ', 'BOOV', 'BUAV', 'BUAX', 'BUER', 'BUET', 'BUEV', 'BUEX', 'BUIQ', 'BUIV', 'BUIW', 'BUOS', 'BUUQ', 'BUUS', 'BUUW', 'CAAQ', 'CAAV', 'CAEP', 'CAEV', 'CAIP', 'CAIQ', 'CAIT', 'CAOQ', 'CAOS', 'CAOV', 'CAOY', 'CAUN', 'CAUR', 'CAUY', 'CEAS', 'CEAW', 'CEAX', 'CEIN', 'CEIQ', 'CEIT', 'CEIW', 'CEOT', 'CEUP', 'CEUQ', 'CEUR', 'CEUV', 'CEUW', 'CIAS', 'CIIR', 'CIIS', 'CIOX', 'CIOY', 'COAS', 'COAW', 'COAY', 'COEN', 'COER', 'COEW', 'COEY', 'COIV', 'COIX', 'COOQ', 'COOY', 'COUQ', 'COUV', 'COUX', 'CUAW', 'CUAX', 'CUIN', 'CUIT', 'CUIV', 'CUOS', 'CUOW', 'CUOX', 'CUUQ', 'CUUR', 'DAAW', 'DAIX', 'DAOQ', 'DAOX', 'DAUV', 'DAUY', 'DEAW', 'DEAY', 'DEET', 'DEEW', 'DEEX', 'DEIT', 'DEIY', 'DEOW', 'DEOX', 'DEUV', 'DEUW', 'DEUY', 'DIAR', 'DIAT', 'DIAV', 'DIAX', 'DIEQ', 'DIIQ', 'DIIY', 'DIOP', 'DIOQ', 'DIOR', 'DIOV', 'DIUR', 'DIUS', 'DOAY', 'DOEY', 'DOIR', 'DOIV', 'DOIX', 'DOOQ', 'DOUN', 'DUAQ', 'DUAR', 'DUAV', 'DUAW', 'DUEP', 'DUEQ', 'DUER', 'DUEW', 'DUEX', 'DUEY', 'DUON', 'DUOY', 'DUUY', 'FAAP', 'FAAW', 'FAAY', 'FAEP', 'FAEQ', 'FAEW', 'FAOP', 'FAOR', 'FAUQ', 'FEAX', 'FEER', 'FEIN', 'FEIQ', 'FEIS', 'FEIX', 'FEON', 'FEOP', 'FEOS', 'FEOV', 'FEOX', 'FEUN', 'FEUW', 'FIAW', 'FIEP', 'FIEW', 'FIEY', 'FIIQ', 'FIIS', 'FIIX', 'FIOY', 'FIUQ', 'FOAQ', 'FOAR', 'FOAY', 'FOEN', 'FOEV', 'FOIX', 'FOUV', 'FOUY', 'FUAS', 'FUAT', 'FUAV', 'FUAX', 'FUES', 'FUEY', 'FUOV', 'FUOX', 'FUOY', 'FUUP', 'FUUQ', 'FUUX', 'GAIP', 'GAIQ', 'GAOQ', 'GAOS', 'GAOT', 'GAOW', 'GAOX', 'GAUS', 'GAUT', 'GAUV', 'GAUY', 'GEAP', 'GEAQ', 'GEAW', 'GEAX', 'GEEQ', 'GEIQ', 'GEIX', 'GEOP', 'GEOV', 'GEUV', 'GEUY', 'GIAR', 'GIEP', 'GIEQ', 'GIEY', 'GIIP', 'GIIS', 'GIIW', 'GIIY', 'GION', 'GIOS', 'GIOY', 'GIUR', 'GIUV', 'GIUW', 'GIUX', 'GOAY', 'GOEW', 'GOEY', 'GOIN', 'GOIP', 'GOIR', 'GOIS', 'GOIW', 'GOOX', 'GOUN', 'GUAP', 'GUAS', 'GUAV', 'GUEP', 'GUER', 'GUEV', 'GUEY', 'GUIQ', 'GUIS', 'GUIV', 'GUIX', 'GUIY', 'GUOS', 'GUOV', 'GUOX', 'GUUQ', 'HAAP', 'HAAQ', 'HAAW', 'HAER', 'HAIS', 'HAIX', 'HAOP', 'HAOV', 'HAUN', 'HAUQ', 'HAUV', 'HEAV', 'HEEW', 'HEIN', 'HEIP', 'HEIQ', 'HEIT', 'HEOP', 'HEOS', 'HEUN', 'HEUQ', 'HEUW', 'HEUY', 'HIAN', 'HIAR', 'HIAV', 'HIAW', 'HIEV', 'HIEW', 'HIIN', 'HIIR', 'HION', 'HIOS', 'HIOW', 'HIUQ', 'HIUR', 'HIUT', 'HIUX', 'HOAP', 'HOAS', 'HOAT', 'HOET', 'HOEX', 'HOIT', 'HOIV', 'HOIY', 'HOUQ', 'HOUV', 'HUAP', 'HUAW', 'HUAX', 'HUEV', 'HUEX', 'HUIQ', 'HUIT', 'HUIV', 'HUIW', 'HUIX', 'HUOS', 'HUUS', 'HUUV', 'HUUY', 'JAAX', 'JAEP', 'JAER', 'JAIS', 'JAIW', 'JAON', 'JAOV', 'JAUX', 'JEAR', 'JEEV', 'JEEW', 'JEEX', 'JEEY', 'JEIP', 'JEIS', 'JEIV', 'JEIY', 'JEOY', 'JEUN', 'JEUT', 'JEUW', 'JEUY', 'JIAY', 'JIEP', 'JIEQ', 'JIEV', 'JIIP', 'JIIT', 'JIIV', 'JIIX', 'JIOP', 'JIOX', 'JIUN', 'JOAT', 'JOAW', 'JOAX', 'JOIW', 'JOIY', 'JOOQ', 'JOOS', 'JOOV', 'JOUQ', 'JUEP', 'JUES', 'JUET', 'JUEW', 'JUON', 'JUOQ', 'JUOS', 'JUUP', 'JUUY', 'KAAV', 'KAAX', 'KAER', 'KAOQ', 'KAOW', 'KAUN', 'KAUS', 'KAUV', 'KAUY', 'KEIQ', 'KEIV', 'KEIW', 'KEOP', 'KEOQ', 'KEOT', 'KIAT', 'KIAY', 'KIEX', 'KIIQ', 'KIIS', 'KIIT', 'KIIX', 'KION', 'KIOP', 'KIOS', 'KIUQ', 'KIUT', 'KIUV', 'KIUX', 'KOAP', 'KOAV', 'KOIN', 'KOIR', 'KOUP', 'KOUQ', 'KOUW', 'KUEN', 'KUET', 'KUEV', 'KUIQ', 'KUIX', 'KUOP', 'KUOR', 'KUOW', 'KUUY', 'LAAX', 'LAEP', 'LAET', 'LAIS', 'LAIV', 'LAIW', 'LAOQ', 'LAOR', 'LAUN', 'LAUR', 'LAUY', 'LEAY', 'LEEY', 'LEOV', 'LEUV', 'LEUX', 'LIAT', 'LIEQ', 'LIEW', 'LIIW', 'LIOT', 'LIOW', 'LIOX', 'LIOY', 'LIUR', 'LIUS', 'LIUT', 'LIUW', 'LOAP', 'LOAT', 'LOAV', 'LOAW', 'LOES', 'LOEW', 'LOEY', 'LOIP', 'LOIQ', 'LOIV', 'LOOQ', 'LOOY', 'LUAN', 'LUAV', 'LUAY', 'LUEN', 'LUEQ', 'LUEV', 'LUEW', 'LUIN', 'LUIP', 'LUIQ', 'LUIV', 'LUOR', 'LUOW', 'LUUN', 'LUUP', 'LUUQ', 'LUUS', 'LUUX', 'LUUY', 'MAAP', 'MAAX', 'MAEX', 'MAIQ', 'MAIW', 'MAON', 'MAOT', 'MAUQ', 'MAUV', 'MAUW', 'MEAR', 'MEAS', 'MEAV', 'MEAX', 'MEEN', 'MEEX', 'MEOP', 'MEOT', 'MEUP', 'MEUX', 'MEUY', 'MIEQ', 'MIEX', 'MION', 'MIOP', 'MIOS', 'MIOT', 'MIOV', 'MIOY', 'MIUN', 'MIUP', 'MIUR', 'MIUS', 'MIUV', 'MIUY', 'MOAQ', 'MOAR', 'MOAV', 'MOAW', 'MOOP', 'MOOV', 'MOOX', 'MOOY', 'MOUQ', 'MOUY', 'MUAN', 'MUAQ', 'MUAS', 'MUAT', 'MUAV', 'MUAW', 'MUAY', 'MUEQ', 'MUEY', 'MUIR', 'MUIV', 'MUIX', 'MUOT', 'MUOW', 'MUUV', 'BEAZ', 'BEOZ', 'BEUZ', 'BIIZ', 'BOAZ', 'CEIZ', 'CEOZ', 'CIIZ', 'CIUZ', 'COEZ', 'COIZ', 'COOZ', 'CUOZ', 'DAIZ', 'DEEZ', 'DEIZ', 'DEUZ', 'DOAZ', 'DOEZ', 'DOIZ', 'DOOZ', 'DUEZ', 'FAAZ', 'FAIZ', 'FEAZ', 'FIAZ', 'FUEZ', 'GEUZ', 'GOOZ', 'GOUZ', 'HAIZ', 'HEUZ', 'HIEZ', 'HIIZ', 'HUAZ', 'HUIZ', 'HUUZ', 'JAAZ', 'JEAZ', 'JEIZ', 'JIEZ', 'JIIZ', 'JIUZ', 'JOEZ', 'JOOZ', 'JUEZ', 'JUIZ', 'KAAZ', 'KAIZ', 'KEEZ', 'KEUZ', 'KIAZ', 'KIUZ', 'KUAZ', 'KUOZ', 'LAOZ', 'LEOZ', 'LEUZ', 'LOAZ', 'LOOZ', 'MAUZ', 'MEOZ', 'MOEZ', 'MOUZ'];
stimulus_3_bucket = ['CET', 'QUG', 'YEY', 'LAV', 'KEH', 'QIF', 'WUC', 'FEV', 'QOZ', 'VIG', 'NEZ', 'LAJ', 'GEW', 'CIK', 'XIP', 'MIW', 'GIM', 'DOZ', 'JAF', 'TOZ', 'KEZ', 'DIL', 'TOB', 'XEM', 'MIV', 'BIQ', 'XAB', 'SEK', 'VAH', 'QIQ', 'CAV', 'HIZ', 'QAC', 'VUJ', 'GUV', 'RUQ', 'WUK', 'DEQ', 'YEV', 'DAV', 'MUZ', 'COH', 'QUB', 'JAQ', 'POZ', 'MUQ', 'DUJ', 'JAC', 'SOH', 'JEG', 'SEP', 'CER', 'CUL', 'ROX', 'GEX', 'QOY', 'LUV', 'CEM', 'KIQ', 'YIF', 'GUH', 'XER', 'FAH', 'JEC', 'MAH', 'YEJ', 'GUW', 'TAZ', 'YUS', 'YUC', 'HUD', 'KUW', 'DOH', 'KOD', 'CIP', 'TIZ', 'PUQ', 'QOV', 'LOQ', 'JUV', 'QOM', 'XIM', 'LUY', 'YOZ', 'GAK', 'HED', 'CAX', 'CAH', 'NOC', 'XEC', 'YIL', 'RER', 'BEP', 'BIY', 'YUX', 'YIQ', 'KUJ', 'NEN', 'KIV', 'DEF', 'FUM', 'SOG', 'KIJ', 'XIX', 'HAZ', 'PIQ', 'VOT', 'XUT', 'BUZ', 'QUR', 'KES', 'MIH', 'KUQ', 'VIY', 'KUG', 'YAL', 'NAK', 'BIM', 'CUV', 'JAH', 'BIX', 'YAF', 'WUL', 'XIC', 'COV', 'JOD', 'QIV', 'KAH', 'GAZ', 'LUJ', 'QAY', 'TUW', 'QUC', 'MUR', 'YEC', 'VUF', 'CIZ', 'XUF', 'HUK', 'NIQ', 'TUZ', 'VEY', 'GEH', 'SUD', 'XAT', 'WEW', 'TOJ', 'VAJ', 'VUR', 'RAR', 'MUP', 'JOS', 'QAH', 'TEF', 'ROQ', 'KOC', 'KED', 'LIQ', 'FOS', 'NAX', 'XAS', 'KAV', 'LUN', 'SED', 'KAL', 'PUC', 'QEY', 'VAD', 'JIF', 'MOJ', 'WUR', 'VED', 'RUR', 'KAQ', 'PUW', 'QAK', 'CEQ', 'VIH', 'PAV', 'TIH', 'POC', 'NUV', 'XUS', 'PUH', 'NIW', 'TEH', 'TEP', 'LIF', 'WOR', 'FIH', 'QOH', 'MEV', 'XIB', 'QUX', 'YOJ', 'QAL', 'HUF', 'NEF', 'GER', 'GIC', 'YAG', 'MUX', 'SUQ', 'JEK', 'TIW', 'QIP', 'DIC', 'VES', 'XAJ', 'NOF', 'COR', 'XIR', 'CEV', 'NEY', 'GOS', 'JUX', 'CAF', 'BEC', 'GAJ', 'COF', 'FEF', 'LOJ', 'MAV', 'VIW', 'BER', 'BUV', 'FUJ', 'HEQ', 'SUH', 'BIZ', 'LIW', 'YOF', 'TUD', 'SEJ', 'HUJ', 'VIR', 'JOV', 'XUY', 'XAZ', 'HUS', 'MEF', 'JOF', 'NUJ', 'WID', 'FIV', 'TIY', 'XAR', 'BUP', 'QEC', 'QOC', 'YOS', 'RUD', 'XAM', 'YEM', 'TEZ', 'KIH', 'JIY', 'TAY', 'CIQ', 'GUF', 'SUS', 'HEV', 'SIQ', 'KEM', 'GOC', 'HOZ', 'DOB', 'YUT', 'CUC', 'MEK', 'GIH', 'BAV', 'GUX', 'XAN', 'KOZ', 'DEP', 'FUS', 'QUK', 'XEZ', 'MUK', 'DIQ', 'MUY', 'VUX', 'VEZ', 'MIZ', 'BEJ', 'VUT', 'KOB', 'WIX', 'XET', 'SEM', 'CIG', 'WIC', 'CUN', 'FOQ', 'QUW', 'BEH', 'TUV', 'HUQ', 'YEK', 'MUH', 'QON', 'DEG', 'VUN', 'HAV', 'YAD', 'RUY', 'MOQ', 'WIY', 'LUC', 'WUF', 'KIC', 'LEJ', 'JUQ', 'CIR', 'VAQ', 'WUY', 'PIV', 'LEZ', 'QIG', 'QOR', 'VAM', 'KIZ', 'NAV', 'XIZ', 'CEG', 'XIF', 'QIH', 'LAN', 'JEY', 'LUZ', 'BAAC', 'BAEC', 'BAEF', 'BAEL', 'BAIM', 'BAOD', 'BAOF', 'BAOM', 'BAUH', 'BEAF', 'BEAG', 'BEEC', 'BEEJ', 'BEEL', 'BEIG', 'BEOF', 'BEOJ', 'BEOK', 'BEOL', 'BEUC', 'BEUD', 'BEUF', 'BEUM', 'BIEJ', 'BIEK', 'BIIC', 'BIID', 'BIIH', 'BIIK', 'BIOH', 'BIOK', 'BIUB', 'BIUC', 'BIUG', 'BIUK', 'BIUM', 'BOAB', 'BOAD', 'BOAF', 'BOAJ', 'BOED', 'BOEJ', 'BOIG', 'BOIM', 'BOOH', 'BOUJ', 'BUAM', 'BUIJ', 'BUOC', 'BUUB', 'BUUD', 'BUUG', 'CAAG', 'CAAJ', 'CAAK', 'CAIG', 'CAOK', 'CAUC', 'CAUF', 'CAUG', 'CAUH', 'CAUM', 'CEAF', 'CEEG', 'CEEJ', 'CEEK', 'CEIK', 'CEOC', 'CEOD', 'CEOH', 'CEOM', 'CEUB', 'CEUF', 'CIAH', 'CIEC', 'CIEF', 'CIEG', 'CIEH', 'CIIK', 'CIIL', 'CIOB', 'CIUD', 'CIUJ', 'CIUL', 'COAC', 'COAF', 'COAJ', 'COAM', 'COEH', 'COIC', 'COIH', 'COIJ', 'COOD', 'COUC', 'COUD', 'COUJ', 'COUK', 'CUAB', 'CUAC', 'CUAD', 'CUAG', 'CUAL', 'CUEB', 'CUEJ', 'CUEL', 'CUIJ', 'CUIL', 'CUOJ', 'CUOL', 'CUOM', 'CUUK', 'DAAH', 'DAAJ', 'DAAL', 'DAEC', 'DAED', 'DAEK', 'DAIB', 'DAIC', 'DAIH', 'DAIK', 'DAIL', 'DAOC', 'DAOD', 'DEAM', 'DEEF', 'DEIB', 'DEIH', 'DEIJ', 'DEIK', 'DEOH', 'DEOK', 'DEUB', 'DEUH', 'DIAB', 'DIAM', 'DIIF', 'DIIG', 'DIIL', 'DIIM', 'DIOD', 'DIOJ', 'DOAC', 'DOAJ', 'DOAL', 'DOEB', 'DOEF', 'DOEH', 'DOIC', 'DOIG', 'DOIJ', 'DOIK', 'DOIM', 'DOOG', 'DOUD', 'DOUL', 'DUAF', 'DUAM', 'DUEG', 'DUEM', 'DUIB', 'DUIC', 'DUID', 'DUOB', 'DUOD', 'DUOH', 'DUOK', 'DUOL', 'DUUD', 'DUUH', 'DUUL', 'DUUM', 'FAAF', 'FAAJ', 'FAAK', 'FAEB', 'FAEG', 'FAEJ', 'FAIG', 'FAIH', 'FAIM', 'FAOB', 'FAOH', 'FAUM', 'FEAB', 'FEAF', 'FEAG', 'FEAJ', 'FEAM', 'FEEH', 'FEEK', 'FEIJ', 'FEIK', 'FEOC', 'FEOG', 'FEOK', 'FEOL', 'FEUB', 'FEUC', 'FEUF', 'FEUK', 'FEUM', 'FIAC', 'FIAH', 'FIEC', 'FIED', 'FIEG', 'FIEH', 'FIIH', 'FIIM', 'FIOC', 'FIOD', 'FIUC', 'FIUL', 'FOAD', 'FOAF', 'FOAJ', 'FOAK', 'FOEJ', 'FOEL', 'FOIC', 'FOIG', 'FOIJ', 'FOIK', 'FOIM', 'FOOC', 'FOOH', 'FOUG', 'FUAB', 'FUAD', 'FUAH', 'FUAJ', 'FUEB', 'FUEC', 'FUED', 'FUEH', 'FUIB', 'FUOC', 'FUOJ', 'FUOK', 'FUOL', 'FUUD', 'FUUG', 'GAAC', 'GAAM', 'GAEB', 'GAEF', 'GAEG', 'GAEH', 'GAIB', 'GAIH', 'GAIJ', 'GAUK', 'GEAJ', 'GEAK', 'GEAL', 'GEEB', 'GEEG', 'GEEH', 'GEIB', 'GEID', 'GEOK', 'GEUJ', 'GEUK', 'GIAD', 'GIAF', 'GIAL', 'GIAM', 'GIIH', 'GIOG', 'GIOM', 'GIUC', 'GIUF', 'GIUK', 'GOAF', 'GOAM', 'GOEL', 'GOIC', 'GOOC', 'GOOH', 'GOOJ', 'GOUB', 'GOUG', 'GUAJ', 'GUEB', 'GUEF', 'GUIC', 'GUIK', 'GUOJ', 'GUUD', 'HAAH', 'HAEB', 'HAEJ', 'HAIB', 'HAIH', 'HAOJ', 'HAOM', 'HAUB', 'HEAF', 'HEAK', 'HEEB', 'HEEF', 'HEIF', 'HEOB', 'HEOC', 'HEOF', 'HEOH', 'HEOJ', 'HEUH', 'HEUM', 'HIAB', 'HIAC', 'HIAL', 'HIEJ', 'HIIB', 'HIIC', 'HIIM', 'HIOC', 'HIUD', 'HIUH', 'HOAK', 'HOEC', 'HOEH', 'HOIF', 'HOIG', 'HOIM', 'HOOM', 'HOUG', 'HOUH', 'HUAF', 'HUAJ', 'HUAK', 'HUAL', 'HUEF', 'HUEG', 'HUEH', 'HUEJ', 'HUEL', 'HUEM', 'HUIL', 'HUOC', 'HUOK', 'HUUB', 'HUUC', 'JAAG', 'JAAJ', 'JAEB', 'JAEC', 'JAEF', 'JAEG', 'JAEK', 'JAIB', 'JAOF', 'JAOM', 'JAUF', 'JAUH', 'JAUJ', 'JEAK', 'JEEH', 'JEEL', 'JEEM', 'JEOL', 'JEUH', 'JEUL', 'JEUM', 'JIAB', 'JIAG', 'JIAH', 'JIAM', 'JIEH', 'JIID', 'JIIM', 'JIOC', 'JIOD', 'JIOG', 'JIOM', 'JIUD', 'JIUK', 'JOAK', 'JOEH', 'JOEK', 'JOEM', 'JOIH', 'JOOB', 'JOOC', 'JOOH', 'JOUL', 'JOUM', 'JUAD', 'JUAL', 'JUAM', 'JUEB', 'JUED', 'JUEK', 'JUIG', 'JUIK', 'JUIM', 'JUOD', 'JUOG', 'JUOJ', 'JUOK', 'JUUD', 'KAAB', 'KAAC', 'KAAH', 'KAAJ', 'KAEC', 'KAEF', 'KAEG', 'KAIC', 'KAOB', 'KAOD', 'KAOM', 'KAUB', 'KAUF', 'KAUK', 'KEAC', 'KEAF', 'KEAG', 'KEEC', 'KEEM', 'KEIK', 'KEOC', 'KEOG', 'KEUH', 'KEUJ', 'KIEC', 'KIEJ', 'KIIL', 'KIOH', 'KIUB', 'KIUC', 'KIUD', 'KIUF', 'KIUK', 'KIUL', 'KOAL', 'KOED', 'KOEG', 'KOIG', 'KOIK', 'KOIL', 'KOIM', 'KOOC', 'KOOJ', 'KOUC', 'KOUH', 'KOUJ', 'KUAH', 'KUEJ', 'KUEK', 'KUID', 'KUIH', 'KUIK', 'KUOM', 'KUUF', 'KUUG', 'KUUK', 'LAAH', 'LAAJ', 'LAAM', 'LAEC', 'LAEJ', 'LAIB', 'LAIG', 'LAIH', 'LAIJ', 'LAOC', 'LAOF', 'LAOL', 'LAUF', 'LAUM', 'LEAG', 'LEEL', 'LEIB', 'LEIG', 'LEIL', 'LEOC', 'LEOG', 'LEOK', 'LEUG', 'LIAC', 'LIAF', 'LIEG', 'LIEJ', 'LIIB', 'LIIH', 'LIIM', 'LIOB', 'LIOF', 'LIOH', 'LIOM', 'LIUD', 'LIUF', 'LOAC', 'LOAG', 'LOAL', 'LOEC', 'LOEL', 'LOEM', 'LOOH', 'LOOJ', 'LOUB', 'LUAC', 'LUAD', 'LUAF', 'LUAH', 'LUAK', 'LUAL', 'LUEH', 'LUEL', 'LUIC', 'LUIF', 'LUOG', 'LUOH', 'LUOJ', 'LUUC', 'MAAF', 'MAAH', 'MAEB', 'MAEC', 'MAIH', 'MAOB', 'MAOD', 'MAOF', 'MAUK', 'MEAB', 'MEAC', 'MEAF', 'MEAJ', 'MEAM', 'MEEF', 'MEIL', 'MEOC', 'MEOD', 'MEOH', 'MEOK', 'MEUB', 'MEUL', 'MEUM', 'MIAF', 'MIAJ', 'MIED', 'MIEG', 'MIEJ', 'MIEK', 'MIEL', 'MIEM', 'MIIJ', 'MIIM', 'MIOC', 'MIOD', 'MIOF', 'MIOK', 'MIUC', 'MIUG', 'MOAF', 'MOAG', 'MOAH', 'MOAK', 'MOEF', 'MOID', 'MOIK', 'MOOG', 'MOOH', 'MOOK', 'MOOM', 'MOUG', 'MOUM', 'MUAJ', 'MUAL', 'MUEF', 'MUEK', 'MUEM', 'MUIB', 'MUIC', 'MUIM', 'MUOB', 'MUOJ', 'MUOL', 'MUUD', 'NAAK', 'NAEB', 'NAED', 'NAEK', 'NAEL', 'NAIJ', 'NAIK', 'NAIM', 'NAOF', 'NAOH', 'NAUL', 'NEAB', 'NEAC', 'NEAH', 'NEEC', 'NEEJ', 'NEIG', 'NEOB', 'NEOD', 'NEOH', 'NEOL', 'NEOM', 'NIAB', 'NIAG', 'NIAJ', 'NIAK', 'NIEC', 'NIED', 'NIEK', 'NIIG', 'NIUG', 'NIUH', 'NIUL', 'NOAB', 'NOAL', 'NOEG', 'NOEJ', 'NOIC', 'NOID', 'NOIJ', 'NOOH', 'NOOM', 'NOUK', 'NOUL', 'NUAH', 'NUAK', 'NUAL', 'NUEG', 'NUEL', 'NUID', 'NUIJ', 'NUIL', 'NUOD', 'NUOG', 'NUOH', 'NUOJ', 'NUUD', 'NUUH', 'NUUM', 'PAAH', 'PAAJ', 'PAEG', 'PAEH', 'PAEL', 'PAEM', 'PAIC', 'PAIM', 'PAOK', 'PAUB', 'PAUD', 'PAUF', 'PAUM', 'PEAJ', 'PEEH', 'PEIG', 'PEOD', 'PEOG', 'PEOJ', 'PEOM', 'PEUC', 'PEUD', 'PEUG', 'PEUJ', 'PIAH', 'PIAK', 'PIAM', 'PIEM', 'PIIB', 'PIOF', 'PIOJ', 'PIOM', 'PIUC', 'PIUG', 'POAD', 'POAF', 'POEC', 'POEJ', 'POID', 'POIK', 'POOM', 'POUB', 'POUH', 'PUAC', 'PUAD', 'PUAJ', 'PUAK', 'PUEF', 'PUEJ', 'PUOB', 'PUOD', 'PUUJ', 'PUUK', 'QAAB', 'QAAF', 'QAAJ', 'QAEL', 'QAIK', 'QAIL', 'QAOG', 'QAUC', 'QAUF', 'QAUJ', 'QAUK', 'QAUM', 'QEAD', 'QEAG', 'QEEB', 'QEEG', 'QEEJ', 'QEIB', 'QEIJ', 'QEIK', 'QEOF', 'QEOJ', 'QEOK', 'QEUC', 'QEUF', 'QIAF', 'QIAL', 'QIEH', 'QIID', 'QIIJ', 'QIIK', 'QIOF', 'QIUC', 'QIUF', 'QIUH', 'QIUJ', 'QOAD', 'QOAH', 'QOAJ', 'QOAK', 'QOEC', 'QOED', 'QOIB', 'QOIG', 'QOOG', 'QOUB', 'QOUF', 'QOUJ', 'QUAB', 'QUAF', 'QUEM', 'QUIC', 'QUIH', 'QUOB', 'QUOG', 'QUOJ', 'QUOL', 'QUUD', 'QUUG', 'QUUK', 'QUUM', 'RAAH', 'RAAL', 'RAEC', 'RAEJ', 'RAIB', 'RAIC', 'RAOD', 'RAOG', 'RAOH', 'RAOL', 'RAOM', 'RAUC', 'RAUD', 'RAUG', 'RAUK', 'RAUM', 'REAB', 'REIG', 'REOD', 'REOG', 'REOL', 'REUC', 'REUD', 'REUF', 'RIAC', 'RIAM', 'RIEC', 'RIEJ', 'RIIB', 'RIIC', 'RIID', 'RIIL', 'RIOG', 'RIOH', 'RIOJ', 'RIOK', 'RIOL', 'RIOM', 'RIUC', 'RIUD', 'RIUH', 'RIUL', 'ROAK', 'ROEB', 'ROEC', 'ROEH', 'ROIB', 'ROIJ', 'ROIK', 'ROOJ', 'RUAF', 'RUAG', 'RUAL', 'RUOF', 'RUOL', 'RUUC', 'RUUF', 'RUUG', 'RUUH', 'RUUJ', 'RUUK', 'SAAC', 'SAAF', 'SAAJ', 'SAEB', 'SAEC', 'SAEH', 'SAEJ', 'SAEK', 'SAEL', 'SAIC', 'SAOB', 'SAOH', 'SAOJ', 'SAOL', 'SEAC', 'SEAD', 'SEEB', 'SEIF', 'SEIH', 'SEIM', 'SEOM', 'SEUF', 'SEUG', 'SEUL', 'SIAC', 'SIAF', 'SIAM', 'SIEC', 'SIED', 'SIEH', 'SIEJ', 'SIEK', 'SIIG', 'SIOD', 'SIOF', 'SIUF', 'SIUG', 'SIUL', 'SIUM', 'SOAC', 'SOAG', 'SOAL', 'SOAM', 'SOEC', 'SOEF', 'SOEH', 'SOEL', 'SOIC', 'SOOB', 'SOUF', 'SOUM', 'SUAC', 'SUAF', 'SUAG', 'SUEC', 'SUEF', 'SUEH', 'SUEJ', 'SUIB', 'SUIC', 'SUIH', 'SUIJ', 'SUIL', 'SUOM', 'SUUK', 'TAAC', 'TAAJ', 'TAAM', 'TAED', 'TAIH', 'TAOB', 'TAOG', 'TAOH', 'TAOJ', 'TAUK', 'TEAG', 'TEEH', 'TEEJ', 'TEIC', 'TEIJ', 'TEIM', 'TEOK', 'TEUH', 'TEUM', 'TIAD', 'TIAF', 'TIAH', 'TIAL', 'TIEB', 'TIEC', 'TIEG', 'TIEH', 'TIEJ', 'TIIF', 'TIIK', 'TIOB', 'TIOG', 'TIOJ', 'TIOK', 'TIOL', 'TIUD', 'TIUG', 'TOAJ', 'TOAM', 'TOEB', 'TOEG', 'TOEJ', 'TOEL', 'TOIB', 'TOIM', 'TOOB', 'TOOJ', 'TOUH', 'TOUJ', 'TUAF', 'TUAH', 'TUEC', 'TUEJ', 'TUEL', 'TUIB', 'TUIC', 'TUID', 'TUOC', 'TUOM', 'TUUB', 'TUUD', 'TUUF', 'TUUH', 'VAAH', 'VAOG', 'VAUC', 'VEAB', 'VEAF', 'VEAG', 'VEAK', 'VEED', 'VEEH', 'VEEK', 'VEIC', 'VEID', 'VEIJ', 'VEOK', 'VIAG', 'VIAJ', 'VIEM', 'VIIK', 'VIOB', 'VIOH', 'VIOM', 'VIUD', 'VIUK', 'VOAF', 'VOAK', 'VOIG', 'VOIH', 'VOOC', 'VOOK', 'VOUM', 'VUAK', 'VUAL', 'VUIF', 'VUOB', 'VUOH', 'VUOK', 'VUUC', 'VUUF', 'VUUG', 'VUUJ', 'VUUK', 'WAAC', 'WAEJ', 'WAEL', 'WAIB', 'WAIH', 'WAOF', 'WAOG', 'WAOH', 'WAOM', 'WAUH', 'WEAB', 'WEAG', 'WEEC', 'WEEG', 'WEEH', 'WEEM', 'WEIB', 'WEIJ', 'WEOL', 'WEOM', 'WEUF', 'WIAC', 'WIAK', 'WIEC', 'WIEH', 'WIIJ', 'WIIK', 'WIOD', 'WIOJ', 'WIOL', 'WIUJ', 'WIUM', 'WOAC', 'WOEB', 'WOEC', 'WOIC', 'WOIK', 'WOOK', 'WOUB', 'WUAG', 'WUEM', 'WUIH', 'WUIK', 'WUUB', 'WUUC', 'WUUF', 'WUUG', 'WUUK', 'WUUL', 'XAAG', 'XAAL', 'XAEC', 'XAEG', 'XAEJ', 'XAIG', 'XAOC', 'XAOL', 'XAUB', 'XAUC', 'XAUD', 'XAUG', 'XEAK', 'XEAM', 'XEEC', 'XEEH', 'XEEL', 'XEIJ', 'XEIK', 'XEOC', 'XEOD', 'XEOH', 'XEOJ', 'XEUL', 'XIAC', 'XIAH', 'XIAL', 'XIEL', 'XIIF', 'XIIG', 'XIOB', 'XIOG', 'XIOK', 'XIUG', 'XIUJ', 'XOAC', 'XOAG', 'XOAJ', 'XOAK', 'XOAL', 'XOEG', 'XOEK', 'XOEM', 'XOIB', 'XOIK', 'XOOD', 'XOOH', 'XOOL', 'XOOM', 'XOUB', 'XOUD', 'XOUK', 'XOUL', 'XOUM', 'XUAC', 'XUAG', 'XUAH', 'XUAJ', 'XUAL', 'XUIC', 'XUOC', 'XUOD', 'XUUC', 'XUUG', 'XUUK', 'YAAB', 'YAEF', 'YAEG', 'YAEK', 'YAIL', 'YAOB', 'YAOD', 'YAOH', 'YAOJ', 'YAOK', 'YAUH', 'YAUJ', 'YEAB', 'YEAD', 'YEAF', 'YEAJ', 'YEEC', 'YEEJ', 'YEEL', 'YEOM', 'YEUC', 'YEUF', 'YEUG', 'YEUJ', 'YEUM', 'YIAL', 'YIEC', 'YIEK', 'YIIC', 'YIID', 'YIIJ', 'YIIK', 'YIOC', 'YIOK', 'YIOL', 'YIUC', 'YIUD', 'YIUM', 'YOAK', 'YOIH', 'YOOK', 'YOOL', 'YOUC', 'YOUG', 'YUAC', 'YUAG', 'YUEC', 'YUEG', 'YUEJ', 'YUID', 'YUIG', 'YUIM', 'YUOB', 'YUOC', 'YUOD', 'YUOF', 'YUOM', 'YUUC', 'YUUK', 'ZAAF', 'ZAEB', 'ZAEF', 'ZAUD', 'ZAUK', 'ZEAC', 'ZEAF', 'ZEAG', 'ZEEB', 'ZEIB', 'ZEIF', 'ZEIH', 'ZEOG', 'ZEUC', 'ZIAB', 'ZIAC', 'ZIAH', 'ZIEF', 'ZIEH', 'ZIEJ', 'ZIIB', 'ZIIC', 'ZIIK', 'ZIOC', 'ZIOF', 'ZIOM', 'ZIUD', 'ZIUF', 'ZIUH', 'ZIUK', 'ZOEB', 'ZOEM', 'ZOIB', 'ZOIH', 'ZOIM', 'ZOOK', 'ZOUC', 'ZOUD', 'ZOUJ', 'ZUAC', 'ZUAD', 'ZUAF', 'ZUEB', 'ZUEC', 'ZUEF', 'ZUEJ', 'ZUEK', 'ZUIG', 'ZUUD', 'ZUUL', 'ZAAP', 'ZAAQ', 'ZAAS', 'ZAAV', 'ZAAW', 'ZAEQ', 'ZAER', 'ZAES', 'ZAET', 'ZAEY', 'ZAIQ', 'ZAOR', 'ZAOX', 'ZAOY', 'ZAUV', 'ZAUY', 'ZEAT', 'ZEEW', 'ZEEX', 'ZEIW', 'ZEOR', 'ZEOV', 'ZEOW', 'ZEUN', 'ZEUQ', 'ZEUW', 'ZIAP', 'ZIAR', 'ZIAW', 'ZIEV', 'ZIIP', 'ZIIT', 'ZIIW', 'ZIIY', 'ZIOR', 'ZIOW', 'ZIUN', 'ZIUQ', 'ZIUR', 'ZIUS', 'ZIUV', 'ZOAN', 'ZOAV', 'ZOAY', 'ZOIP', 'ZOOT', 'ZOOW', 'ZOUR', 'ZUAN', 'ZUAP', 'ZUAR', 'ZUAV', 'ZUES', 'ZUIQ', 'ZUIW', 'ZUIX', 'ZUIY', 'ZUOR', 'ZUOV', 'ZUUT', 'ZUUV', 'ZUUX', 'ZAAZ', 'ZIAZ', 'ZIIZ', 'ZUEZ', 'NAEZ', 'NAOZ', 'NAUZ', 'NIAZ', 'NOOZ', 'PAAZ', 'PAIZ', 'PEIZ', 'PEUZ', 'POIZ', 'PUAZ', 'PUOZ', 'PUUZ', 'QAIZ', 'QEIZ', 'QOAZ', 'QOIZ', 'QUOZ', 'REEZ', 'RIIZ', 'ROAZ', 'ROOZ', 'RUOZ', 'SAAZ', 'SIOZ', 'SOAZ', 'SOUZ', 'SUUZ', 'TIAZ', 'TOAZ', 'TOEZ', 'TOUZ', 'TUIZ', 'VAUZ', 'VEEZ', 'VIIZ', 'VOAZ', 'VUEZ', 'WEAZ', 'WEEZ', 'WEIZ', 'WEOZ', 'WOIZ', 'WUEZ', 'WUUZ', 'XAEZ', 'XIIZ', 'XOEZ', 'XOOZ', 'XOUZ', 'XUEZ', 'YAOZ', 'YEOZ', 'YIAZ', 'YIUZ', 'NAAQ', 'NAEQ', 'NAES', 'NAEV', 'NAIN', 'NAIR', 'NAIS', 'NAIT', 'NAIV', 'NAOQ', 'NAUN', 'NAUR', 'NEAW', 'NEEQ', 'NEIW', 'NEOQ', 'NEOY', 'NEUN', 'NEUP', 'NEUR', 'NEUY', 'NIAT', 'NIAV', 'NIEN', 'NIEP', 'NIEQ', 'NIES', 'NIIN', 'NIIQ', 'NIIR', 'NIOX', 'NIOY', 'NIUN', 'NIUX', 'NOAN', 'NOAP', 'NOAR', 'NOAT', 'NOER', 'NOEW', 'NOIT', 'NOOR', 'NOOV', 'NOOX', 'NOUT', 'NOUY', 'NUAQ', 'NUAT', 'NUAW', 'NUAX', 'NUAY', 'NUER', 'NUET', 'NUEV', 'NUEX', 'NUEY', 'NUIR', 'NUIY', 'NUON', 'NUOP', 'NUOR', 'NUOW', 'NUOX', 'NUUP', 'NUUR', 'PAAW', 'PAAX', 'PAAY', 'PAES', 'PAEY', 'PAIQ', 'PAON', 'PAUY', 'PEAW', 'PEEQ', 'PEEV', 'PEEW', 'PEEX', 'PEIV', 'PEIY', 'PEOP', 'PEUW', 'PIAT', 'PIAV', 'PIAW', 'PIAY', 'PIEN', 'PIEQ', 'PIEY', 'PIIT', 'PIIY', 'PIUR', 'PIUS', 'PIUW', 'PIUY', 'POAN', 'POAP', 'POAT', 'POAW', 'POAX', 'POEQ', 'POEX', 'POEY', 'POIQ', 'POOW', 'POOY', 'POUN', 'POUS', 'PUAP', 'PUAQ', 'PUAR', 'PUAS', 'PUAT', 'PUIQ', 'PUON', 'PUOP', 'PUOX', 'PUOY', 'PUUQ', 'PUUT', 'PUUY', 'QAAR', 'QAAS', 'QAEN', 'QAEQ', 'QAET', 'QAEY', 'QAIR', 'QAIW', 'QAOS', 'QAOT', 'QAOV', 'QAOX', 'QAUV', 'QAUW', 'QAUY', 'QEAT', 'QEAV', 'QEAW', 'QEAX', 'QEAY', 'QEEN', 'QEIS', 'QEOP', 'QEOR', 'QEUN', 'QEUP', 'QEUW', 'QIAN', 'QIAR', 'QIEN', 'QIIT', 'QIIW', 'QIOY', 'QIUP', 'QOAP', 'QOAR', 'QOAX', 'QOAY', 'QOEN', 'QOEP', 'QOET', 'QOEV', 'QOEY', 'QOIN', 'QOIQ', 'QOOP', 'QOOS', 'QOOX', 'QOOY', 'QUAN', 'QUAR', 'QUAW', 'QUET', 'QUIS', 'QUIY', 'QUOQ', 'QUOT', 'QUOV', 'QUUQ', 'RAAQ', 'RAAV', 'RAAW', 'RAAX', 'RAAY', 'RAEQ', 'RAEW', 'RAEX', 'RAEY', 'RAIQ', 'RAON', 'RAOP', 'RAOQ', 'RAOR', 'RAOX', 'RAOY', 'RAUR', 'RAUV', 'REAQ', 'REEQ', 'REIR', 'REIW', 'REOP', 'REOX', 'REUQ', 'RIAR', 'RIAS', 'RIAT', 'RIAW', 'RIEN', 'RIER', 'RIIV', 'RIUQ', 'RIUT', 'ROAS', 'ROAY', 'ROIP', 'ROIR', 'ROIX', 'ROON', 'ROOV', 'ROOX', 'ROUN', 'ROUQ', 'RUAN', 'RUAS', 'RUAX', 'RUEQ', 'RUIV', 'RUOP', 'RUOQ', 'RUOY', 'RUUR', 'RUUS', 'RUUV', 'SAEV', 'SAEX', 'SAIS', 'SAOP', 'SAOY', 'SAUT', 'SEAV', 'SEEQ', 'SEEY', 'SEIV', 'SEIX', 'SEOQ', 'SEOR', 'SEUQ', 'SEUT', 'SEUV', 'SEUX', 'SIAN', 'SIAS', 'SIAX', 'SIEN', 'SIES', 'SIET', 'SIEW', 'SIEY', 'SIIP', 'SIIW', 'SION', 'SIOT', 'SIUW', 'SIUY', 'SOAQ', 'SOAS', 'SOAW', 'SOEW', 'SOIN', 'SOIP', 'SOIS', 'SOOR', 'SOUW', 'SUAP', 'SUAR', 'SUEP', 'SUEQ', 'SUEV', 'SUEW', 'SUEY', 'SUIQ', 'SUIY', 'SUON', 'SUOW', 'SUUQ', 'SUUT', 'TAAS', 'TAAT', 'TAEW', 'TAEX', 'TAIV', 'TAOP', 'TAOR', 'TAUN', 'TAUW', 'TEAQ', 'TEEP', 'TEEV', 'TEEY', 'TEIY', 'TEON', 'TEOQ', 'TEOR', 'TEOS', 'TEUR', 'TIAS', 'TIAT', 'TIAW', 'TIEP', 'TIIQ', 'TIIS', 'TIIT', 'TIIW', 'TIIX', 'TIOQ', 'TIOT', 'TIOY', 'TOAN', 'TOAS', 'TOAV', 'TOEP', 'TOIS', 'TOIY', 'TOUV', 'TUAN', 'TUAT', 'TUAY', 'TUES', 'TUEX', 'TUEY', 'TUIP', 'TUIY', 'TUOX', 'TUUN', 'TUUP', 'TUUW', 'VAAP', 'VAAX', 'VAAY', 'VAEN', 'VAEQ', 'VAET', 'VAEY', 'VAIX', 'VAOP', 'VAOR', 'VAOV', 'VAUN', 'VEAN', 'VEAP', 'VEAR', 'VEEQ', 'VEET', 'VEEW', 'VEIP', 'VEIR', 'VEIT', 'VEIW', 'VEOP', 'VEOR', 'VEUP', 'VEUV', 'VEUX', 'VIAQ', 'VIAX', 'VIAY', 'VIEP', 'VIEX', 'VIIN', 'VIIT', 'VIOR', 'VIOS', 'VIOT', 'VIOX', 'VIUN', 'VIUP', 'VIUQ', 'VOAN', 'VOAQ', 'VOAR', 'VOEP', 'VOEV', 'VOUN', 'VOUT', 'VUAP', 'VUAR', 'VUAT', 'VUAX', 'VUAY', 'VUER', 'VUIP', 'VUIT', 'VUIX', 'VUOS', 'VUOW', 'VUOY', 'VUUP', 'WAAQ', 'WAAX', 'WAEQ', 'WAET', 'WAEW', 'WAEX', 'WAIX', 'WAOV', 'WAOY', 'WAUT', 'WEAS', 'WEAT', 'WEEQ', 'WEIP', 'WEIQ', 'WEOW', 'WEUQ', 'WEUR', 'WEUV', 'WEUY', 'WIAQ', 'WIAR', 'WIEX', 'WIIQ', 'WIIX', 'WION', 'WIOT', 'WIOV', 'WIUP', 'WIUS', 'WOAP', 'WOEN', 'WOEW', 'WOIP', 'WOIV', 'WOIW', 'WOIY', 'WOOY', 'WOUP', 'WOUS', 'WOUX', 'WUAN', 'WUAR', 'WUAT', 'WUEP', 'WUES', 'WUEY', 'WUIQ', 'WUIV', 'WUIW', 'WUIX', 'WUIY', 'WUOP', 'WUOR', 'WUOS', 'WUOT', 'WUOX', 'XAAR', 'XAAS', 'XAAV', 'XAEN', 'XAEP', 'XAES', 'XAET', 'XAEX', 'XAIP', 'XAIW', 'XAON', 'XAOT', 'XAUQ', 'XEAT', 'XEAV', 'XEAY', 'XEEQ', 'XEEW', 'XEEX', 'XEEY', 'XEIR', 'XEIV', 'XEOT', 'XEUS', 'XEUT', 'XEUW', 'XEUX', 'XIAN', 'XIAS', 'XIAV', 'XIEN', 'XIEP', 'XIER', 'XIIP', 'XIIQ', 'XIIX', 'XIIY', 'XION', 'XIOR', 'XIOW', 'XIUN', 'XOAN', 'XOAP', 'XOAR', 'XOAS', 'XOAV', 'XOAX', 'XOES', 'XOEV', 'XOIP', 'XOIV', 'XOIW', 'XOIX', 'XOIY', 'XOOS', 'XOOX', 'XUAV', 'XUER', 'XUES', 'XUEW', 'XUEX', 'XUIN', 'XUIQ', 'XUIS', 'XUIV', 'XUIW', 'XUOR', 'XUOW', 'XUOX', 'YAAS', 'YAAT', 'YAAY', 'YAEP', 'YAIS', 'YAOP', 'YAOV', 'YAUQ', 'YAUR', 'YAUS', 'YEAV', 'YEEN', 'YEER', 'YEEW', 'YEEY', 'YEON', 'YEOP', 'YEOT', 'YEOW', 'YEUR', 'YEUS', 'YEUV', 'YEUY', 'YIAP', 'YIAS', 'YIAT', 'YIAW', 'YIIR', 'YIIT', 'YIIW', 'YIIY', 'YIOW', 'YIOX', 'YIUT', 'YIUV', 'YOEP', 'YOEQ', 'YOON', 'YOOQ', 'YOOR', 'YOOX', 'YOOY', 'YOUP', 'YOUV', 'YOUY', 'YUAV', 'YUAX', 'YUEV', 'YUEW', 'YUEX', 'YUEY', 'YUIN', 'YUIV', 'YUOP', 'YUOV', 'YUOX', 'YUOY', 'YUUN', 'YUUP', 'BAAV', 'BAAY', 'BAEN', 'BAEQ', 'BAOT', 'BAOW', 'BAOY', 'BAUS', 'BAUV', 'BAUW', 'BEAX', 'BEIN', 'BEIP', 'BEOX', 'BIAQ', 'BIAV', 'BIAY', 'BIEV', 'BIIX', 'BION', 'BIOP', 'BIOV', 'BIUN', 'BIUQ', 'BIUX', 'BOAN', 'BOAQ', 'BOET', 'BOEY', 'BOIQ', 'BOIT', 'BOOP', 'BOOW', 'BOOY', 'BOUP', 'BOUQ', 'BOUR', 'BOUX', 'BUAR', 'BUEY', 'BUIX', 'BUON', 'BUOR', 'BUOT', 'BUOV', 'BUOX', 'BUUP', 'BUUX', 'CAAP', 'CAAS', 'CAAW', 'CAEQ', 'CAIV', 'CAIW', 'CAOX', 'CAUS', 'CEAQ', 'CEAT', 'CEAV', 'CEEN', 'CEEP', 'CEEY', 'CEIP', 'CEIV', 'CEIX', 'CEIY', 'CEOR', 'CEOV', 'CEOX', 'CEOY', 'CEUN', 'CEUS', 'CEUY', 'CIAP', 'CIAQ', 'CIAR', 'CIAT', 'CIAX', 'CIEQ', 'CIES', 'CIEY', 'CIIN', 'CIIY', 'CIOT', 'CIOW', 'CIUQ', 'CIUS', 'CIUT', 'CIUY', 'COAQ', 'COAR', 'COAV', 'COEX', 'COIP', 'COOV', 'COOX', 'CUAQ', 'CUAR', 'CUEP', 'CUIQ', 'CUIS', 'CUON', 'CUOQ', 'CUUN', 'CUUP', 'CUUS', 'CUUT', 'CUUV', 'DAAV', 'DAAX', 'DAAY', 'DAEP', 'DAEQ', 'DAER', 'DAEW', 'DAIT', 'DAOP', 'DAOR', 'DAOV', 'DAUN', 'DAUQ', 'DAUR', 'DAUS', 'DAUX', 'DEAT', 'DEAX', 'DEEN', 'DEEY', 'DEIP', 'DEIQ', 'DEIW', 'DEIX', 'DEON', 'DEOP', 'DEOV', 'DEUP', 'DEUS', 'DIAW', 'DIEV', 'DIEX', 'DIIS', 'DIIW', 'DIOS', 'DIOW', 'DIOX', 'DIUQ', 'DIUT', 'DIUV', 'DIUX', 'DOAN', 'DOAV', 'DOAX', 'DOEV', 'DOIP', 'DOIW', 'DOIY', 'DOOY', 'DOUS', 'DOUY', 'DUAS', 'DUEV', 'DUIR', 'DUUT', 'DUUW', 'DUUX', 'FAEV', 'FAEY', 'FAIW', 'FAIX', 'FAON', 'FAOT', 'FAOW', 'FAOX', 'FAUP', 'FAUV', 'FAUX', 'FAUY', 'FEAN', 'FEEW', 'FEEX', 'FEIP', 'FEIR', 'FEIW', 'FEOQ', 'FIAQ', 'FIAS', 'FIAV', 'FIEV', 'FIIN', 'FIIY', 'FIOP', 'FIOT', 'FIUS', 'FIUV', 'FIUW', 'FOAP', 'FOAS', 'FOAV', 'FOAX', 'FOEP', 'FOEX', 'FOEY', 'FOIR', 'FOOS', 'FOOW', 'FOUS', 'FOUX', 'FUAQ', 'FUEN', 'FUEQ', 'FUEX', 'FUIN', 'FUIP', 'FUIQ', 'FUIV', 'FUIX', 'FUOS', 'FUOW', 'FUUS', 'FUUV', 'FUUW', 'GAAQ', 'GAAX', 'GAET', 'GAIX', 'GAIY', 'GAOR', 'GAUP', 'GEAN', 'GEAT', 'GEAV', 'GEET', 'GEEW', 'GEEX', 'GEIR', 'GEIY', 'GEON', 'GEOR', 'GEOS', 'GEOY', 'GEUQ', 'GIAS', 'GIEV', 'GIIN', 'GIIQ', 'GIIR', 'GIIX', 'GIOP', 'GIOR', 'GIOV', 'GIOX', 'GIUP', 'GIUQ', 'GIUT', 'GOAV', 'GOAW', 'GOEX', 'GOIQ', 'GOOV', 'GOOW', 'GOOY', 'GOUP', 'GOUS', 'GUAW', 'GUIR', 'GUON', 'GUOR', 'GUOY', 'GUUP', 'GUUT', 'GUUV', 'GUUW', 'GUUY', 'HAAV', 'HAAY', 'HAIP', 'HAIT', 'HAIY', 'HAOQ', 'HAOS', 'HEAN', 'HEAY', 'HEEV', 'HEIS', 'HEIV', 'HEIW', 'HEIX', 'HEOQ', 'HEOT', 'HEOW', 'HEOX', 'HEUX', 'HIAQ', 'HIAY', 'HIEQ', 'HIEX', 'HIIP', 'HIIQ', 'HIIX', 'HIOR', 'HIOY', 'HIUV', 'HIUW', 'HOAQ', 'HOEQ', 'HOEY', 'HOIN', 'HOIR', 'HOIW', 'HOOV', 'HOOW', 'HOUS', 'HUAN', 'HUAR', 'HUAS', 'HUAV', 'HUAY', 'HUEP', 'HUEQ', 'HUIN', 'HUIR', 'HUIY', 'HUON', 'HUOW', 'HUOX', 'HUUN', 'HUUQ', 'HUUW', 'JAAQ', 'JAAW', 'JAEY', 'JAIN', 'JAIV', 'JAIX', 'JAOR', 'JAOS', 'JAUN', 'JAUQ', 'JAUS', 'JAUT', 'JAUW', 'JAUY', 'JEEN', 'JEET', 'JEIR', 'JEIX', 'JEON', 'JEOP', 'JEOW', 'JEUR', 'JEUS', 'JEUV', 'JIAS', 'JIER', 'JIIN', 'JIIQ', 'JIIW', 'JIIY', 'JION', 'JIOQ', 'JIOS', 'JIUP', 'JIUT', 'JOAQ', 'JOAR', 'JOAV', 'JOAY', 'JOET', 'JOIR', 'JOIV', 'JOIX', 'JOOR', 'JOOT', 'JOOW', 'JOOY', 'JOUP', 'JOUX', 'JOUY', 'JUAP', 'JUAR', 'JUAT', 'JUAV', 'JUAW', 'JUAY', 'JUER', 'JUEV', 'JUEX', 'JUIQ', 'JUIT', 'JUIV', 'JUIX', 'JUOW', 'JUUN', 'KAAW', 'KAEQ', 'KAEX', 'KAOS', 'KAOX', 'KAUQ', 'KAUX', 'KEAP', 'KEAT', 'KEAW', 'KEEW', 'KEIS', 'KEIT', 'KEIX', 'KEON', 'KEOW', 'KEOY', 'KEUV', 'KEUW', 'KEUY', 'KIAR', 'KIAS', 'KIIN', 'KIOQ', 'KIOT', 'KIOW', 'KIUY', 'KOAY', 'KOEW', 'KOEX', 'KOIP', 'KOIS', 'KOIT', 'KOIV', 'KOIX', 'KOOQ', 'KOOV', 'KOOW', 'KOOX', 'KOUX', 'KOUY', 'KUAQ', 'KUAR', 'KUAV', 'KUAW', 'KUEP', 'KUEY', 'KUIR', 'KUIW', 'KUIY', 'KUOS', 'KUOT', 'KUUP', 'KUUS', 'KUUT', 'LAAP', 'LAAQ', 'LAAY', 'LAEN', 'LAEQ', 'LAES', 'LAEY', 'LAIX', 'LAOP', 'LAOW', 'LAOX', 'LAOY', 'LAUQ', 'LAUV', 'LAUX', 'LEAV', 'LEEQ', 'LEIP', 'LEIV', 'LEIW', 'LEIY', 'LEOP', 'LEOT', 'LEOW', 'LEUN', 'LEUW', 'LEUY', 'LIAP', 'LIAQ', 'LIAX', 'LIEX', 'LIEY', 'LIIN', 'LIIP', 'LIIR', 'LIOR', 'LIUN', 'LIUX', 'LOAS', 'LOEQ', 'LOEV', 'LOEX', 'LOIX', 'LOOX', 'LOUS', 'LOUV', 'LUAS', 'LUEP', 'LUER', 'LUEY', 'LUIR', 'LUIW', 'LUOQ', 'LUOS', 'LUOV', 'LUOY', 'LUUT', 'MAAV', 'MAAW', 'MAAY', 'MAEN', 'MAEY', 'MAIX', 'MAIY', 'MAOR', 'MAOS', 'MAOY', 'MAUP', 'MAUX', 'MAUY', 'MEAQ', 'MEAW', 'MEAY', 'MEEP', 'MEEQ', 'MEIT', 'MEIV', 'MEOR', 'MEUQ', 'MEUS', 'MEUV', 'MEUW', 'MIAN', 'MIAX', 'MIEY', 'MIIT', 'MIIV', 'MIIW', 'MIOR', 'MIUT', 'MOEQ', 'MOOQ', 'MOUN', 'MOUV', 'MUET', 'MUIQ', 'MUOP', 'MUOX', 'MUUP', 'MUUS', 'BAEZ', 'BAIZ', 'BEIZ', 'BIUZ', 'BOOZ', 'BUAZ', 'BUUZ', 'CAAZ', 'CAEZ', 'CAUZ', 'CEEZ', 'CIOZ', 'CUEZ', 'CUUZ', 'DEAZ', 'DEOZ', 'DUIZ', 'FAOZ', 'FEOZ', 'FOOZ', 'FUOZ', 'GAAZ', 'GIUZ', 'GOIZ', 'GUEZ', 'GUOZ', 'HAEZ', 'HEAZ', 'HEIZ', 'HOAZ', 'HOOZ', 'JAIZ', 'JIAZ', 'JUUZ', 'KAEZ', 'KEAZ', 'KIEZ', 'KIOZ', 'KOAZ', 'KOIZ', 'KOOZ', 'LAUZ', 'LEIZ', 'LIAZ', 'LOEZ', 'LOIZ', 'LOUZ', 'LUUZ', 'MAEZ', 'MIEZ', 'MIUZ', 'MUAZ', 'MUIZ', 'MUUZ'];
stimulus_4_bucket = ['SUR', 'FIQ', 'WEH', 'BEW', 'YOP', 'DOY', 'COC', 'JEM', 'GAH', 'QIZ', 'XEW', 'NIY', 'XOM', 'FEC', 'TID', 'XOB', 'XUL', 'CIT', 'CEJ', 'QIK', 'VAY', 'SOR', 'CEH', 'LUR', 'XEG', 'WAJ', 'GUD', 'GEV', 'GAW', 'CEY', 'YIH', 'XUG', 'XID', 'LIG', 'MOX', 'YOQ', 'NUH', 'LUD', 'JIZ', 'LIX', 'VUL', 'NOZ', 'TAQ', 'VEC', 'DAZ', 'JIS', 'ROF', 'GUJ', 'YIC', 'QUV', 'CIW', 'FIM', 'FEQ', 'YUZ', 'VUD', 'NIR', 'CIV', 'KUK', 'KUN', 'KAX', 'KEQ', 'MED', 'XUK', 'BIH', 'DUV', 'XAP', 'CIN', 'NAM', 'NIN', 'CIH', 'WUW', 'SEZ', 'XEP', 'HUR', 'WEP', 'QAG', 'CIM', 'REW', 'FAP', 'GIV', 'PUM', 'NOV', 'LIH', 'FUX', 'DIY', 'WOV', 'DOD', 'WUX', 'GAQ', 'VUP', 'MAJ', 'YIZ', 'NUW', 'WUP', 'VUQ', 'FEB', 'SAH', 'QOF', 'MOH', 'WOH', 'HAQ', 'LIM', 'KUD', 'BUF', 'GIQ', 'JUW', 'JEX', 'HIQ', 'BEB', 'VAP', 'FAF', 'QED', 'SOC', 'FUL', 'QEV', 'GIZ', 'VOH', 'SUJ', 'VAZ', 'QEP', 'PUX', 'WEF', 'VUK', 'WIW', 'VIK', 'MEJ', 'DUM', 'KUR', 'QES', 'WUG', 'TOQ', 'HOJ', 'TEX', 'MEB', 'PEY', 'RUX', 'NIK', 'VOB', 'NAQ', 'XEN', 'LIV', 'BUK', 'TEQ', 'JUP', 'HUW', 'BEQ', 'BEX', 'JEJ', 'MEZ', 'PIB', 'XAG', 'KOV', 'VUV', 'FOF', 'WUB', 'CIY', 'XIV', 'WIB', 'XAQ', 'BIW', 'BUC', 'FEM', 'XOH', 'NUQ', 'GOZ', 'CIJ', 'PEC', 'QEL', 'CAG', 'VOY', 'SOQ', 'TOS', 'XEV', 'FOT', 'QUQ', 'YIG', 'CUK', 'XAV', 'JUY', 'YAC', 'LUH', 'JIW', 'NIF', 'HEJ', 'KAC', 'KUZ', 'TEM', 'QEW', 'YIM', 'WUN', 'XEQ', 'BIV', 'QUZ', 'LEQ', 'MEC', 'GUZ', 'WEX', 'XUJ', 'CID', 'WOY', 'MOZ', 'HUC', 'YEB', 'NIG', 'XIN', 'VIX', 'POG', 'XUB', 'QEX', 'SIY', 'NUG', 'VUC', 'XED', 'QIR', 'NUD', 'YUJ', 'PEX', 'BOJ', 'BUQ', 'YUV', 'XAD', 'YER', 'XON', 'XES', 'QIC', 'YUR', 'JIQ', 'XEB', 'VOZ', 'YIV', 'FUK', 'JAJ', 'XAF', 'VID', 'RIW', 'QER', 'GUK', 'XAX', 'YAV', 'VEP', 'CEW', 'QAP', 'CUJ', 'NAZ', 'DAC', 'XOS', 'SIH', 'WIH', 'XIW', 'JUH', 'FAK', 'LIC', 'PAJ', 'XAC', 'QOX', 'POJ', 'HOQ', 'QUN', 'QUY', 'PUV', 'QEG', 'DEH', 'GOG', 'JES', 'WUM', 'KIY', 'XOX', 'YOG', 'FIJ', 'FEH', 'LUT', 'CEC', 'MUB', 'FOM', 'VUB', 'RIH', 'PIR', 'QAZ', 'NUP', 'WUJ', 'JIP', 'LUP', 'QUT', 'MEH', 'PAG', 'YEZ', 'KOX', 'WAZ', 'KOQ', 'XOQ', 'HUZ', 'KEW', 'VEV', 'GIX', 'VUZ', 'LEH', 'VUW', 'VEW', 'SEF', 'FUY', 'BAAB', 'BAAD', 'BAAM', 'BAEB', 'BAEH', 'BAIG', 'BAOH', 'BAOJ', 'BAOK', 'BAUF', 'BAUL', 'BEAL', 'BEEG', 'BEIJ', 'BEIL', 'BEUH', 'BEUJ', 'BIAG', 'BIAH', 'BIED', 'BIEG', 'BIEH', 'BIIJ', 'BIOB', 'BIOD', 'BIOF', 'BIUH', 'BIUJ', 'BOAM', 'BOEB', 'BOEC', 'BOEH', 'BOID', 'BOIH', 'BOIJ', 'BOIK', 'BOUB', 'BOUC', 'BOUK', 'BOUM', 'BUAB', 'BUAD', 'BUAG', 'BUAJ', 'BUAK', 'BUAL', 'BUEB', 'BUED', 'BUEK', 'BUEM', 'BUOD', 'BUOH', 'BUOK', 'BUOL', 'BUUC', 'CAAL', 'CAED', 'CAIJ', 'CAOF', 'CAOH', 'CAOM', 'CEAJ', 'CEAL', 'CEED', 'CEIH', 'CEOB', 'CEOF', 'CEOK', 'CEUC', 'CEUK', 'CIAC', 'CIAD', 'CIAJ', 'CIAK', 'CIEB', 'CIED', 'CIEJ', 'CIIB', 'CIIC', 'CIOC', 'CIOD', 'CIOF', 'CIOJ', 'CIUC', 'COAB', 'COAK', 'COEC', 'COIB', 'COIK', 'COOB', 'COOH', 'COUH', 'COUM', 'CUAF', 'CUAJ', 'CUEF', 'CUIH', 'CUIM', 'CUOB', 'CUOF', 'CUUJ', 'CUUL', 'DAAM', 'DAOB', 'DAOG', 'DAOL', 'DAUL', 'DEAB', 'DEAK', 'DEEB', 'DEID', 'DEIF', 'DEOD', 'DEUC', 'DEUF', 'DEUG', 'DIAC', 'DIAH', 'DIAJ', 'DIEK', 'DIIH', 'DIIJ', 'DIOB', 'DIOG', 'DIUF', 'DIUH', 'DIUJ', 'DIUL', 'DIUM', 'DOAB', 'DOAH', 'DOAK', 'DOEC', 'DOEJ', 'DOOC', 'DOOH', 'DOUB', 'DOUF', 'DOUJ', 'DOUK', 'DOUM', 'DUAJ', 'DUAK', 'DUIH', 'DUIL', 'DUOG', 'DUUB', 'DUUF', 'FAAC', 'FAAG', 'FAEK', 'FAEL', 'FAEM', 'FAIC', 'FAID', 'FAIJ', 'FAOF', 'FAOJ', 'FAOL', 'FAUB', 'FAUD', 'FAUG', 'FAUH', 'FAUJ', 'FEAC', 'FEEC', 'FEEF', 'FEEG', 'FEIB', 'FEIF', 'FEOH', 'FEUL', 'FIAB', 'FIAD', 'FIAJ', 'FIAM', 'FIIB', 'FIIC', 'FIOG', 'FIOJ', 'FIUB', 'FIUF', 'FIUH', 'FOAB', 'FOAG', 'FOAH', 'FOEK', 'FOEM', 'FOIF', 'FOIH', 'FOUB', 'FOUC', 'FOUD', 'FOUH', 'FOUJ', 'FOUM', 'FUAC', 'FUAG', 'FUAK', 'FUAL', 'FUID', 'FUIG', 'FUOG', 'FUUB', 'FUUJ', 'FUUK', 'GAEC', 'GAEJ', 'GAIG', 'GAIK', 'GAIM', 'GAOG', 'GAUG', 'GAUH', 'GAUJ', 'GEAB', 'GEAC', 'GEAF', 'GEAH', 'GEAM', 'GEEM', 'GEIG', 'GEIH', 'GEIK', 'GEOD', 'GEOH', 'GEOL', 'GEUD', 'GEUG', 'GEUH', 'GIAC', 'GIAK', 'GIIB', 'GIIC', 'GIIG', 'GIIL', 'GIIM', 'GIOF', 'GIOJ', 'GIOL', 'GIUG', 'GIUM', 'GOAB', 'GOAG', 'GOAH', 'GOEB', 'GOEM', 'GOIH', 'GOIJ', 'GOIK', 'GOIM', 'GOOM', 'GOUC', 'GOUF', 'GUAB', 'GUAD', 'GUAG', 'GUAL', 'GUAM', 'GUEC', 'GUED', 'GUEJ', 'GUEK', 'GUEL', 'GUIF', 'GUIH', 'GUOH', 'GUOM', 'GUUB', 'GUUG', 'GUUH', 'GUUK', 'HAAC', 'HAAD', 'HAAJ', 'HAEK', 'HAEL', 'HAUC', 'HAUF', 'HAUJ', 'HAUK', 'HAUM', 'HEAG', 'HEAM', 'HEEG', 'HEIC', 'HEIG', 'HEIJ', 'HEOG', 'HEUB', 'HEUF', 'HEUJ', 'HEUL', 'HIAD', 'HIAG', 'HIAJ', 'HIAM', 'HIEK', 'HIIF', 'HIIH', 'HIIJ', 'HIOB', 'HIOJ', 'HIOK', 'HIUG', 'HOAC', 'HOEB', 'HOEG', 'HOEL', 'HOIC', 'HOOB', 'HOOC', 'HOOL', 'HOUJ', 'HOUK', 'HOUM', 'HUAH', 'HUAM', 'HUEB', 'HUIB', 'HUIJ', 'HUOB', 'HUOH', 'HUOM', 'HUUF', 'HUUH', 'JAAC', 'JAIC', 'JAIK', 'JAIM', 'JAOC', 'JAOJ', 'JAUB', 'JAUG', 'JEAC', 'JEAJ', 'JEAM', 'JEEB', 'JEEC', 'JEEF', 'JEEK', 'JEIM', 'JEOB', 'JEOD', 'JEOG', 'JEOK', 'JEUF', 'JEUG', 'JEUJ', 'JIAF', 'JIEB', 'JIEG', 'JIEJ', 'JIEM', 'JIIC', 'JIIF', 'JIIG', 'JIOB', 'JIOJ', 'JIOK', 'JIOL', 'JIUC', 'JIUH', 'JIUL', 'JOAC', 'JOAD', 'JOAM', 'JOEF', 'JOEJ', 'JOID', 'JOIJ', 'JOIK', 'JOOJ', 'JOOK', 'JOUD', 'JOUF', 'JOUJ', 'JUAK', 'JUEC', 'JUEG', 'JUEJ', 'JUEL', 'JUEM', 'JUIB', 'JUIC', 'JUIL', 'JUOB', 'JUUC', 'JUUM', 'KAIB', 'KAID', 'KAIM', 'KAOL', 'KAUL', 'KEAB', 'KEAD', 'KEAH', 'KEEB', 'KEEH', 'KEIB', 'KEIC', 'KEID', 'KEIH', 'KEIJ', 'KEOD', 'KEOF', 'KEOL', 'KEOM', 'KEUF', 'KEUG', 'KEUK', 'KEUM', 'KIAB', 'KIAD', 'KIAJ', 'KIED', 'KIIC', 'KIID', 'KIIF', 'KIIG', 'KIIH', 'KIIK', 'KIIM', 'KIOB', 'KIOC', 'KIUH', 'KIUJ', 'KOAF', 'KOAM', 'KOEC', 'KOIC', 'KOIH', 'KOOB', 'KOOH', 'KUAD', 'KUAM', 'KUEB', 'KUEF', 'KUEM', 'KUIB', 'KUIC', 'KUIJ', 'KUOC', 'KUOG', 'KUOH', 'KUUM', 'LAAK', 'LAEB', 'LAED', 'LAEG', 'LAIL', 'LAOB', 'LAOH', 'LAOJ', 'LEIH', 'LEIK', 'LEOF', 'LEUB', 'LEUH', 'LEUM', 'LIAB', 'LIAG', 'LIAL', 'LIIK', 'LIOG', 'LIUH', 'LIUJ', 'LIUK', 'LIUL', 'LIUM', 'LOEG', 'LOEK', 'LOIB', 'LOIC', 'LOIH', 'LOUK', 'LOUM', 'LUAB', 'LUAG', 'LUAM', 'LUED', 'LUEF', 'LUEM', 'LUOB', 'LUOD', 'LUOF', 'LUOK', 'LUUG', 'LUUM', 'MAAM', 'MAEG', 'MAEL', 'MAUG', 'MEAG', 'MEEB', 'MEEG', 'MEEH', 'MEEJ', 'MEEM', 'MEIB', 'MEIG', 'MEIH', 'MEIJ', 'MEOG', 'MEOL', 'MEUC', 'MEUD', 'MEUF', 'MEUJ', 'MIAM', 'MIIL', 'MIOJ', 'MIUB', 'MIUK', 'MIUM', 'MOAD', 'MOEC', 'MOEH', 'MOEJ', 'MOIB', 'MOIH', 'MOIJ', 'MOIM', 'MOOB', 'MOUB', 'MOUD', 'MOUK', 'MOUL', 'MUAB', 'MUAK', 'MUEH', 'MUEL', 'MUID', 'MUIF', 'MUIG', 'MUIJ', 'MUOD', 'MUOF', 'MUOH', 'MUUJ', 'NAAG', 'NAAL', 'NAEF', 'NAIC', 'NAIH', 'NAOB', 'NAOC', 'NAOJ', 'NAOL', 'NAUK', 'NEAJ', 'NEEB', 'NEIJ', 'NEIK', 'NEOG', 'NEOK', 'NEUF', 'NEUJ', 'NEUK', 'NIAD', 'NIAF', 'NIAL', 'NIEB', 'NIEF', 'NIEL', 'NIEM', 'NIIB', 'NIIF', 'NIIK', 'NIOB', 'NIOJ', 'NIOL', 'NIUD', 'NIUF', 'NIUJ', 'NOAD', 'NOEC', 'NOED', 'NOEF', 'NOIB', 'NOIG', 'NOOJ', 'NOUC', 'NOUF', 'NOUH', 'NUAC', 'NUAJ', 'NUED', 'NUEK', 'NUIH', 'NUIK', 'NUIM', 'NUOF', 'NUOK', 'NUOL', 'NUOM', 'PAAG', 'PAEJ', 'PAIB', 'PAIG', 'PAIJ', 'PAOM', 'PAUG', 'PEAB', 'PEAF', 'PEAH', 'PEEG', 'PEEJ', 'PEIB', 'PEIC', 'PEIM', 'PEOF', 'PEOK', 'PEUM', 'PIAB', 'PIAC', 'PIAG', 'PIEG', 'PIIC', 'PIID', 'PIIK', 'PIOB', 'PIOD', 'PIOG', 'PIUB', 'PIUF', 'PIUJ', 'PIUK', 'POAB', 'POAC', 'POAL', 'POAM', 'POEK', 'POIB', 'POIF', 'POIH', 'POIL', 'POUM', 'PUAB', 'PUAF', 'PUAG', 'PUAH', 'PUAM', 'PUEB', 'PUEC', 'PUED', 'PUEG', 'PUEK', 'PUEM', 'PUIB', 'PUIH', 'PUOG', 'PUUC', 'PUUF', 'PUUM', 'QAAD', 'QAAH', 'QAEB', 'QAED', 'QAEG', 'QAIB', 'QAIF', 'QAIH', 'QAOD', 'QAOJ', 'QAOK', 'QAUB', 'QAUL', 'QEAF', 'QEAH', 'QEAL', 'QEAM', 'QEEC', 'QEED', 'QEEH', 'QEEM', 'QEIF', 'QEIG', 'QEIM', 'QEOB', 'QEOC', 'QEUD', 'QEUG', 'QEUJ', 'QIAD', 'QIAK', 'QIAM', 'QIEC', 'QIEK', 'QIEL', 'QIIB', 'QIIC', 'QIUB', 'QOAL', 'QOEB', 'QOEF', 'QOEH', 'QOEL', 'QOIC', 'QOID', 'QOIK', 'QOIM', 'QOOC', 'QOOD', 'QOOH', 'QOOK', 'QOOL', 'QUIB', 'QUIG', 'QUIJ', 'QUOC', 'QUOF', 'QUUC', 'QUUF', 'QUUJ', 'QUUL', 'RAAJ', 'RAEG', 'RAEM', 'RAIJ', 'RAIM', 'RAOC', 'RAOK', 'RAUJ', 'REAC', 'REAH', 'REEH', 'REEJ', 'REIC', 'REIK', 'REOB', 'REOC', 'REOF', 'REOK', 'REUG', 'REUJ', 'REUM', 'RIAD', 'RIAJ', 'RIEH', 'RIIG', 'RIOB', 'RIOC', 'RIOF', 'RIUG', 'RIUK', 'ROAB', 'ROAF', 'ROIF', 'ROIM', 'ROOC', 'ROOH', 'ROUB', 'ROUD', 'ROUH', 'ROUK', 'RUAC', 'RUAD', 'RUAJ', 'RUEB', 'RUEG', 'RUEH', 'RUEJ', 'RUEK', 'RUIB', 'RUIC', 'RUID', 'RUIH', 'RUIJ', 'RUOC', 'RUOJ', 'RUUD', 'RUUM', 'SAAB', 'SAAG', 'SAEF', 'SAEM', 'SAOC', 'SAUG', 'SAUK', 'SEAB', 'SEAJ', 'SEEJ', 'SEIB', 'SEOF', 'SEUB', 'SEUD', 'SIAB', 'SIAG', 'SIAH', 'SIEB', 'SIEL', 'SIIB', 'SIIC', 'SIIH', 'SIOC', 'SIOG', 'SIOH', 'SIOK', 'SIUB', 'SIUD', 'SOAB', 'SOED', 'SOEG', 'SOID', 'SOIJ', 'SOOC', 'SOOD', 'SOUC', 'SOUD', 'SUAD', 'SUAH', 'SUAL', 'SUAM', 'SUEB', 'SUEL', 'SUID', 'SUIF', 'SUIG', 'SUOB', 'SUUC', 'SUUD', 'SUUH', 'SUUL', 'TAAB', 'TAAH', 'TAEC', 'TAEH', 'TAUC', 'TAUD', 'TAUH', 'TEAB', 'TEAC', 'TEAH', 'TEEG', 'TEEL', 'TEIG', 'TEIH', 'TEOB', 'TEOD', 'TEOM', 'TIAM', 'TIEK', 'TIIL', 'TIIM', 'TIOC', 'TIOD', 'TIOM', 'TIUC', 'TOAB', 'TOAF', 'TOAH', 'TOAL', 'TOEK', 'TOIG', 'TOIK', 'TOOC', 'TOOF', 'TOUB', 'TOUG', 'TUAL', 'TUEK', 'TUEM', 'TUOJ', 'TUOK', 'TUOL', 'TUUG', 'TUUJ', 'TUUM', 'VAAC', 'VAEB', 'VAEF', 'VAEH', 'VAEJ', 'VAEL', 'VAOB', 'VAOC', 'VAOF', 'VAOK', 'VAUB', 'VAUK', 'VEAH', 'VEAJ', 'VEEF', 'VEEJ', 'VEIF', 'VEIK', 'VEIM', 'VEOD', 'VEUJ', 'VEUK', 'VIAC', 'VIAM', 'VIEB', 'VIIF', 'VIIJ', 'VIOD', 'VIOK', 'VIUB', 'VIUC', 'VIUG', 'VOAB', 'VOAC', 'VOAG', 'VOAH', 'VOEB', 'VOEF', 'VOIJ', 'VOIM', 'VOOD', 'VOOF', 'VOOH', 'VOUB', 'VOUC', 'VOUJ', 'VOUK', 'VOUL', 'VUAB', 'VUAD', 'VUAG', 'VUAH', 'VUED', 'VUEH', 'VUEM', 'VUIJ', 'VUIK', 'VUOG', 'VUOM', 'VUUB', 'VUUD', 'VUUM', 'WAAH', 'WAAJ', 'WAEB', 'WAED', 'WAEF', 'WAEH', 'WAEK', 'WAID', 'WAIK', 'WAOD', 'WAUB', 'WAUG', 'WEAJ', 'WEEJ', 'WEIK', 'WEIM', 'WEOD', 'WEOG', 'WEUB', 'WEUC', 'WEUD', 'WEUK', 'WIAD', 'WIAH', 'WIAJ', 'WIEB', 'WIIB', 'WIIH', 'WIIL', 'WIIM', 'WIOC', 'WIOK', 'WIOM', 'WIUB', 'WIUC', 'WIUD', 'WIUF', 'WIUH', 'WIUK', 'WIUL', 'WOAB', 'WOAK', 'WOAM', 'WOED', 'WOEH', 'WOIF', 'WOIM', 'WOOM', 'WOUJ', 'WUEB', 'WUEL', 'WUID', 'WUIL', 'WUOB', 'WUOG', 'WUOJ', 'XAEH', 'XAEM', 'XAIC', 'XAID', 'XAIJ', 'XAOB', 'XAOD', 'XAOJ', 'XAUM', 'XEAH', 'XEAJ', 'XEAL', 'XEED', 'XEIB', 'XEIC', 'XEIH', 'XEOF', 'XEOG', 'XEOK', 'XEOL', 'XEOM', 'XEUB', 'XEUD', 'XEUG', 'XIEH', 'XIIJ', 'XIIM', 'XIUD', 'XIUL', 'XIUM', 'XOAD', 'XOEH', 'XOIJ', 'XOOF', 'XUAB', 'XUAK', 'XUEB', 'XUEC', 'XUED', 'XUEJ', 'XUEK', 'XUIG', 'XUIH', 'XUIM', 'XUOF', 'XUOL', 'XUOM', 'XUUD', 'XUUM', 'YAAD', 'YAAJ', 'YAAL', 'YAAM', 'YAEJ', 'YAIC', 'YAID', 'YAIH', 'YAOC', 'YAOF', 'YAUC', 'YAUK', 'YEAK', 'YEAL', 'YEEH', 'YEID', 'YEIG', 'YEIL', 'YEOG', 'YEOH', 'YEUH', 'YIAD', 'YIAG', 'YIEG', 'YIEH', 'YIIG', 'YIOB', 'YIOH', 'YIUG', 'YIUL', 'YOAB', 'YOAC', 'YOAG', 'YOAJ', 'YOEC', 'YOEM', 'YOIG', 'YOIM', 'YOOB', 'YOOD', 'YOOF', 'YOOG', 'YOOJ', 'YOUH', 'YOUK', 'YUAB', 'YUAD', 'YUAF', 'YUAK', 'YUEH', 'YUIH', 'YUIK', 'YUUB', 'YUUF', 'YUUG', 'ZAEC', 'ZAEK', 'ZAEM', 'ZAIC', 'ZAIF', 'ZAIG', 'ZAIK', 'ZAOC', 'ZAOD', 'ZAOJ', 'ZAOL', 'ZAUF', 'ZAUG', 'ZAUJ', 'ZEAH', 'ZEAJ', 'ZEAM', 'ZEID', 'ZEIG', 'ZEOD', 'ZEOF', 'ZEUJ', 'ZEUL', 'ZEUM', 'ZIAD', 'ZIAF', 'ZIED', 'ZIEM', 'ZIIF', 'ZIIG', 'ZIOB', 'ZIOG', 'ZIOH', 'ZIOJ', 'ZIUB', 'ZIUC', 'ZIUG', 'ZIUJ', 'ZOAC', 'ZOAG', 'ZOAK', 'ZOAM', 'ZOIF', 'ZOOD', 'ZOUF', 'ZOUG', 'ZOUH', 'ZOUM', 'ZUAH', 'ZUAK', 'ZUAL', 'ZUAM', 'ZUEG', 'ZUIC', 'ZUIF', 'ZUOD', 'ZUOG', 'ZUOJ', 'ZUOK', 'ZUOL', 'ZUUB', 'ZUUH', 'ZAAT', 'ZAAX', 'ZAAY', 'ZAIP', 'ZAIX', 'ZAOT', 'ZAUP', 'ZAUT', 'ZEAS', 'ZEAY', 'ZEEV', 'ZEEY', 'ZEIV', 'ZEOS', 'ZEOY', 'ZEUT', 'ZEUX', 'ZIAX', 'ZIAY', 'ZIES', 'ZIEY', 'ZIIN', 'ZIIS', 'ZIOP', 'ZIOQ', 'ZIOT', 'ZIUP', 'ZIUT', 'ZOAS', 'ZOEQ', 'ZOER', 'ZOES', 'ZOEV', 'ZOEX', 'ZOOQ', 'ZOOX', 'ZOOY', 'ZOUN', 'ZOUW', 'ZOUX', 'ZUAS', 'ZUAW', 'ZUEP', 'ZUEW', 'ZUIS', 'ZUIV', 'ZUON', 'ZUOP', 'ZUOW', 'ZUOX', 'ZUOY', 'ZUUW', 'ZEAZ', 'ZEEZ', 'ZEOZ', 'ZEUZ', 'ZIOZ', 'ZOAZ', 'ZOIZ', 'ZOOZ', 'ZOUZ', 'ZUAZ', 'ZUIZ', 'NIEZ', 'NOUZ', 'NUEZ', 'NUIZ', 'NUOZ', 'NUUZ', 'PAOZ', 'PAUZ', 'PEAZ', 'PEOZ', 'PIAZ', 'PIOZ', 'PIUZ', 'POEZ', 'POOZ', 'POUZ', 'QAAZ', 'QAOZ', 'QEAZ', 'QEOZ', 'QEUZ', 'QIAZ', 'QIEZ', 'QIOZ', 'QOUZ', 'QUAZ', 'QUUZ', 'RAEZ', 'RAIZ', 'RAOZ', 'REUZ', 'RIEZ', 'RIUZ', 'ROEZ', 'ROUZ', 'RUAZ', 'SEAZ', 'SEUZ', 'SIIZ', 'SIUZ', 'SUEZ', 'SUIZ', 'TAAZ', 'TEEZ', 'TIEZ', 'VIAZ', 'VOIZ', 'VOOZ', 'VOUZ', 'VUOZ', 'WAOZ', 'WAUZ', 'WEUZ', 'WIIZ', 'WUIZ', 'XAAZ', 'XEAZ', 'XEEZ', 'XEUZ', 'XIUZ', 'XUIZ', 'XUOZ', 'YEEZ', 'YEUZ', 'YIEZ', 'YIIZ', 'YOEZ', 'YUEZ', 'YUOZ', 'YUUZ', 'NAAP', 'NAAS', 'NAAX', 'NAER', 'NAEW', 'NAEX', 'NAIY', 'NAOT', 'NAUQ', 'NAUS', 'NAUT', 'NAUY', 'NEAY', 'NEEW', 'NEEX', 'NEIP', 'NEIQ', 'NEIS', 'NEIT', 'NEIV', 'NEIY', 'NEUX', 'NIAP', 'NIAS', 'NIAY', 'NIEW', 'NIIX', 'NIIY', 'NIOQ', 'NIUP', 'NIUR', 'NIUS', 'NIUW', 'NOAQ', 'NOAV', 'NOAY', 'NOIN', 'NOIQ', 'NOIS', 'NOIX', 'NOOS', 'NOOY', 'NUAP', 'NUAR', 'NUAV', 'NUES', 'NUIN', 'NUIW', 'NUIX', 'NUUS', 'NUUV', 'NUUX', 'PAEQ', 'PAER', 'PAEV', 'PAEW', 'PAEX', 'PAIX', 'PAOT', 'PAOX', 'PAUR', 'PAUT', 'PAUX', 'PEAV', 'PEAX', 'PEAY', 'PEIP', 'PEIQ', 'PEIR', 'PEIT', 'PEIX', 'PEOQ', 'PEOT', 'PEOV', 'PEOW', 'PEOY', 'PEUS', 'PEUX', 'PEUY', 'PIAQ', 'PIAR', 'PIEX', 'PIIP', 'PIIQ', 'PIIV', 'PIOQ', 'PIOS', 'PIOW', 'PIUT', 'PIUX', 'POAQ', 'POAS', 'POEW', 'POIR', 'POIT', 'POIV', 'POOV', 'POUQ', 'POUW', 'PUEN', 'PUEP', 'PUES', 'PUEX', 'PUIR', 'PUIV', 'PUIX', 'PUIY', 'PUOQ', 'PUOV', 'PUUV', 'QAAN', 'QAAT', 'QAEP', 'QAEV', 'QAIV', 'QAIY', 'QAOP', 'QAUN', 'QEAP', 'QEAR', 'QEEP', 'QEES', 'QEEV', 'QEEW', 'QEEX', 'QEIV', 'QEIW', 'QEON', 'QEOT', 'QEOW', 'QEUR', 'QEUT', 'QEUY', 'QIAS', 'QIAV', 'QIAX', 'QIAY', 'QIER', 'QIEX', 'QIIR', 'QIIV', 'QIIX', 'QION', 'QIOP', 'QIOS', 'QIOV', 'QIOX', 'QIUN', 'QIUS', 'QIUT', 'QIUW', 'QIUY', 'QOAN', 'QOAS', 'QOAV', 'QOIP', 'QOIW', 'QOON', 'QOOQ', 'QOOR', 'QOOT', 'QOOW', 'QOUP', 'QOUR', 'QOUV', 'QOUW', 'QOUY', 'QUAP', 'QUAS', 'QUAX', 'QUIV', 'QUON', 'QUUR', 'QUUS', 'QUUT', 'QUUV', 'QUUX', 'RAAS', 'RAEN', 'RAES', 'RAIS', 'RAIV', 'RAIW', 'RAUQ', 'RAUT', 'REAN', 'REAS', 'REER', 'REEV', 'REIT', 'REOT', 'REOW', 'REOY', 'REUR', 'REUW', 'REUY', 'RIAV', 'RIEP', 'RIEQ', 'RIES', 'RIIQ', 'RIIT', 'RION', 'RIOW', 'RIUS', 'RIUV', 'RIUY', 'ROAP', 'ROAQ', 'ROEV', 'ROEW', 'ROEY', 'ROIQ', 'ROIS', 'ROOP', 'ROOR', 'ROOY', 'ROUS', 'RUAP', 'RUAQ', 'RUAW', 'RUEW', 'RUEY', 'RUIY', 'RUON', 'RUOV', 'RUOX', 'RUUY', 'SAAQ', 'SAAW', 'SAAY', 'SAES', 'SAET', 'SAEW', 'SAIQ', 'SAIT', 'SAIY', 'SAOW', 'SAUP', 'SAUR', 'SAUW', 'SEAX', 'SEEV', 'SEEW', 'SEIP', 'SEIQ', 'SEIR', 'SEOW', 'SEOY', 'SEUN', 'SEUP', 'SEUS', 'SEUW', 'SEUY', 'SIAQ', 'SIAR', 'SIEX', 'SIIR', 'SIIV', 'SIIX', 'SIOQ', 'SIOR', 'SIUN', 'SIUX', 'SOAV', 'SOAX', 'SOEQ', 'SOET', 'SOEX', 'SOEY', 'SOIQ', 'SOIY', 'SOOQ', 'SOOW', 'SOOX', 'SOOY', 'SOUY', 'SUAN', 'SUAS', 'SUAX', 'SUAY', 'SUEN', 'SUIP', 'SUIS', 'SUIX', 'SUOT', 'SUOX', 'SUUR', 'SUUV', 'SUUW', 'TAAV', 'TAAY', 'TAEP', 'TAEQ', 'TAES', 'TAEV', 'TAIP', 'TAIR', 'TAIS', 'TAIX', 'TAIY', 'TAOT', 'TAOV', 'TAOW', 'TAOX', 'TAOY', 'TAUY', 'TEEQ', 'TEEX', 'TEIN', 'TEIP', 'TEIR', 'TEIW', 'TEOV', 'TEOW', 'TEOY', 'TEUN', 'TEUQ', 'TEUY', 'TIAN', 'TIAQ', 'TIEW', 'TIEY', 'TIIY', 'TIOX', 'TIUS', 'TIUY', 'TOAR', 'TOAY', 'TOEQ', 'TOEW', 'TOIP', 'TOIQ', 'TOIX', 'TOOP', 'TOOQ', 'TOOV', 'TOOX', 'TOOY', 'TUAR', 'TUAV', 'TUAW', 'TUEN', 'TUER', 'TUEV', 'TUEW', 'TUIV', 'TUOQ', 'TUOS', 'TUOT', 'TUUR', 'TUUV', 'TUUX', 'TUUY', 'VAAW', 'VAES', 'VAIS', 'VAIT', 'VAIW', 'VAIY', 'VAON', 'VAOQ', 'VAOS', 'VAOT', 'VAUY', 'VEAW', 'VEEX', 'VEIQ', 'VEOW', 'VEUR', 'VEUW', 'VIAS', 'VIET', 'VIIV', 'VIIX', 'VIOV', 'VIOY', 'VIUW', 'VOAT', 'VOAY', 'VOEQ', 'VOEY', 'VOIN', 'VOIR', 'VOIW', 'VOIX', 'VOIY', 'VOOP', 'VOOW', 'VOUQ', 'VOUS', 'VOUV', 'VOUY', 'VUAQ', 'VUAS', 'VUEN', 'VUES', 'VUEV', 'VUIR', 'VUIS', 'VUIW', 'VUOP', 'VUOR', 'VUUN', 'VUUS', 'VUUT', 'VUUY', 'WAAV', 'WAAW', 'WAIP', 'WAIV', 'WAIY', 'WAOQ', 'WAOR', 'WAOS', 'WAUP', 'WAUS', 'WAUV', 'WAUX', 'WEAY', 'WEEW', 'WEIN', 'WEIV', 'WEIW', 'WEOT', 'WEOV', 'WEOX', 'WEUN', 'WEUT', 'WEUX', 'WIAN', 'WIAS', 'WIAV', 'WIAY', 'WIEN', 'WIEV', 'WIEW', 'WIEY', 'WIIR', 'WIIV', 'WIIW', 'WIUN', 'WIUQ', 'WIUY', 'WOAN', 'WOAQ', 'WOAR', 'WOAT', 'WOAV', 'WOEP', 'WOIN', 'WOIR', 'WOIS', 'WOIX', 'WOOP', 'WOOX', 'WOUN', 'WOUR', 'WUAP', 'WUAV', 'WUAX', 'WUIN', 'WUIS', 'WUOQ', 'WUOV', 'WUOW', 'WUUT', 'WUUV', 'WUUY', 'XAAP', 'XAAT', 'XAAX', 'XAIT', 'XAIY', 'XAOQ', 'XAOW', 'XAOX', 'XAUN', 'XAUV', 'XAUX', 'XEAN', 'XEAP', 'XEAS', 'XEAX', 'XEIP', 'XEIX', 'XEIY', 'XEON', 'XEOS', 'XEOW', 'XEOX', 'XEUN', 'XIAQ', 'XIAW', 'XIAY', 'XIEQ', 'XIES', 'XIEY', 'XIOP', 'XIOQ', 'XIOV', 'XIUP', 'XIUQ', 'XIUR', 'XIUV', 'XOAQ', 'XOAT', 'XOAW', 'XOER', 'XOEX', 'XOEY', 'XOIN', 'XOIQ', 'XOOT', 'XOOY', 'XOUR', 'XOUW', 'XOUX', 'XUAN', 'XUAP', 'XUAQ', 'XUAR', 'XUAS', 'XUAW', 'XUEV', 'XUIR', 'XUIT', 'XUIY', 'XUON', 'XUOP', 'XUOV', 'XUUN', 'XUUT', 'XUUY', 'YAAR', 'YAAV', 'YAEQ', 'YAER', 'YAES', 'YAEY', 'YAOQ', 'YAOY', 'YAUW', 'YAUY', 'YEAP', 'YEES', 'YEIR', 'YEIX', 'YEOS', 'YEOX', 'YEOY', 'YEUW', 'YEUX', 'YIAN', 'YIAR', 'YIAX', 'YIAY', 'YIEN', 'YIEQ', 'YIEV', 'YIEY', 'YIIS', 'YIIV', 'YIOR', 'YIOY', 'YIUQ', 'YIUS', 'YIUW', 'YOAN', 'YOAP', 'YOAR', 'YOAV', 'YOAX', 'YOET', 'YOEV', 'YOIS', 'YOIV', 'YOOS', 'YOOT', 'YOUQ', 'YOUX', 'YUAT', 'YUER', 'YUON', 'YUOR', 'YUUR', 'YUUS', 'YUUX', 'BAAP', 'BAAX', 'BAET', 'BAEX', 'BAIV', 'BAOR', 'BEAW', 'BEAY', 'BEIT', 'BEIX', 'BEIY', 'BEOR', 'BEOS', 'BEOW', 'BEUV', 'BIAP', 'BIAR', 'BIEW', 'BIEX', 'BIEY', 'BIIQ', 'BIIR', 'BIIS', 'BIIV', 'BIIY', 'BIOQ', 'BIUS', 'BIUW', 'BOAP', 'BOAW', 'BOEN', 'BOEW', 'BOIP', 'BOIS', 'BOIW', 'BOUN', 'BOUS', 'BUAN', 'BUAS', 'BUAW', 'BUAY', 'BUEN', 'BUEP', 'BUEW', 'BUIP', 'BUOP', 'BUOQ', 'BUOW', 'CAAN', 'CAAT', 'CAAX', 'CAEW', 'CAEY', 'CAIR', 'CAIS', 'CAIX', 'CAOR', 'CAUP', 'CAUT', 'CEAR', 'CEAY', 'CEEQ', 'CEER', 'CEEV', 'CEEW', 'CEIR', 'CEUX', 'CIAV', 'CIAW', 'CIAY', 'CIEP', 'CIET', 'CIEV', 'CIEW', 'CIEX', 'CIIW', 'CIOP', 'CIOQ', 'CIOR', 'CIOV', 'CIUN', 'CIUR', 'COEQ', 'COES', 'COET', 'COEV', 'COOW', 'COUN', 'COUW', 'COUY', 'CUAT', 'CUAV', 'CUAY', 'CUEQ', 'CUER', 'CUET', 'CUIR', 'CUIX', 'CUOT', 'CUUX', 'DAAN', 'DAAT', 'DAEN', 'DAES', 'DAEX', 'DAIQ', 'DAIR', 'DAIV', 'DAIW', 'DAIY', 'DAON', 'DAOT', 'DAOW', 'DAOY', 'DEAP', 'DEEQ', 'DEIN', 'DEIR', 'DEIS', 'DEOQ', 'DEOT', 'DEOY', 'DEUT', 'DIAQ', 'DIIT', 'DIIV', 'DIOT', 'DIUP', 'DIUY', 'DOAP', 'DOEW', 'DOIQ', 'DOIS', 'DOON', 'DOOT', 'DOOV', 'DOOW', 'DOOX', 'DOUP', 'DUAN', 'DUAP', 'DUAX', 'DUIP', 'DUIQ', 'DUIS', 'DUIW', 'DUIX', 'DUOP', 'DUOQ', 'DUOR', 'DUOW', 'DUUN', 'DUUP', 'DUUQ', 'FAAT', 'FAEN', 'FAER', 'FAES', 'FAIS', 'FAIV', 'FAIY', 'FAOQ', 'FAOS', 'FAOV', 'FAUS', 'FAUT', 'FEAP', 'FEAW', 'FEAY', 'FEEP', 'FEEQ', 'FEEV', 'FEEY', 'FEIY', 'FEOR', 'FEOY', 'FEUQ', 'FEUY', 'FIAN', 'FIAP', 'FIAY', 'FIEQ', 'FIES', 'FIET', 'FIEX', 'FIIR', 'FIIT', 'FIIV', 'FION', 'FIOQ', 'FIOS', 'FIOW', 'FIOX', 'FIUT', 'FIUY', 'FOAN', 'FOAW', 'FOEQ', 'FOEW', 'FOIP', 'FOIQ', 'FOIT', 'FOIV', 'FOIW', 'FOON', 'FOOQ', 'FOOV', 'FOUP', 'FUAR', 'FUAY', 'FUER', 'FUEV', 'FUEW', 'FUIR', 'FUIY', 'FUON', 'FUOP', 'FUOQ', 'FUOT', 'FUUN', 'GAEP', 'GAEX', 'GAEY', 'GAIS', 'GAIV', 'GAON', 'GAOP', 'GAOY', 'GAUX', 'GEAS', 'GEIP', 'GEIW', 'GEOW', 'GEUN', 'GEUX', 'GIAP', 'GIAQ', 'GIET', 'GIEX', 'GIIT', 'GIOQ', 'GIOT', 'GIUN', 'GIUY', 'GOAN', 'GOEN', 'GOEP', 'GOEQ', 'GOET', 'GOIT', 'GOUR', 'GOUY', 'GUAQ', 'GUAT', 'GUAX', 'GUET', 'GUOQ', 'GUOT', 'GUOW', 'GUUN', 'GUUS', 'HAEV', 'HAEX', 'HAEY', 'HAIN', 'HAIQ', 'HAIV', 'HAOX', 'HAUP', 'HAUX', 'HAUY', 'HEAS', 'HEAW', 'HEEQ', 'HEEX', 'HEIY', 'HEUR', 'HEUT', 'HEUV', 'HIAP', 'HIAS', 'HIAT', 'HIAX', 'HIEN', 'HIIV', 'HIIY', 'HIOP', 'HIOV', 'HIOX', 'HIUS', 'HIUY', 'HOAW', 'HOEW', 'HOIX', 'HOOQ', 'HOOX', 'HOOY', 'HOUX', 'HOUY', 'HUAQ', 'HUAT', 'HUEN', 'HUER', 'HUET', 'HUEW', 'HUOP', 'HUOR', 'HUUP', 'HUUX', 'JAAS', 'JAEN', 'JAET', 'JAEV', 'JAIT', 'JAIY', 'JAOP', 'JAOQ', 'JAOW', 'JAOX', 'JEAQ', 'JEAT', 'JEAV', 'JEAY', 'JEIW', 'JEOQ', 'JEOR', 'JEOV', 'JIAP', 'JIAQ', 'JIAR', 'JIAT', 'JIAV', 'JIAW', 'JIAX', 'JIET', 'JIEW', 'JIEY', 'JIIR', 'JIIS', 'JIOR', 'JIOT', 'JIOW', 'JIUV', 'JIUY', 'JOAS', 'JOEN', 'JOER', 'JOEV', 'JOEW', 'JOEX', 'JOIP', 'JOIQ', 'JOIS', 'JOOX', 'JOUT', 'JOUV', 'JUAS', 'JUEN', 'JUEQ', 'JUEY', 'JUIN', 'JUIP', 'JUIR', 'JUIW', 'JUIY', 'JUOP', 'JUOX', 'JUOY', 'JUUQ', 'JUUV', 'JUUW', 'JUUX', 'KAAQ', 'KAET', 'KAEW', 'KAEY', 'KAIT', 'KAIV', 'KAIW', 'KAIX', 'KAOV', 'KAUP', 'KAUR', 'KEAN', 'KEAQ', 'KEAR', 'KEAY', 'KEEY', 'KEIP', 'KEOR', 'KEOS', 'KEOV', 'KEUX', 'KIAN', 'KIAQ', 'KIAV', 'KIAW', 'KIEQ', 'KIET', 'KIEY', 'KIIR', 'KIIY', 'KIOV', 'KIOY', 'KIUN', 'KIUR', 'KIUS', 'KIUW', 'KOAQ', 'KOAR', 'KOAT', 'KOEQ', 'KOEY', 'KOIW', 'KOOY', 'KOUN', 'KUAS', 'KUAT', 'KUEW', 'KUIV', 'KUOX', 'KUOY', 'KUUV', 'LAAW', 'LAEW', 'LAEX', 'LAIP', 'LAIT', 'LAIY', 'LAOT', 'LAOV', 'LAUP', 'LEAT', 'LEAW', 'LEEV', 'LEIN', 'LEIQ', 'LEIT', 'LEIX', 'LEOQ', 'LEOS', 'LEOX', 'LEOY', 'LIAW', 'LIAY', 'LIIV', 'LIOS', 'LIUP', 'LIUV', 'LIUY', 'LOAQ', 'LOIT', 'LOIY', 'LOOW', 'LOUN', 'LOUQ', 'LOUY', 'LUAR', 'LUAW', 'LUAX', 'LUET', 'LUIX', 'LUOT', 'LUOX', 'LUUW', 'MAER', 'MAEW', 'MAIP', 'MAIV', 'MAOP', 'MAOV', 'MAOX', 'MEEV', 'MEEW', 'MEIQ', 'MEIW', 'MEIX', 'MEIY', 'MEOS', 'MEOV', 'MEOY', 'MEUR', 'MIAP', 'MIAQ', 'MIAR', 'MIAV', 'MIAW', 'MIET', 'MIIN', 'MIIP', 'MIIQ', 'MIIR', 'MIIS', 'MIIX', 'MIOQ', 'MIOW', 'MOAP', 'MOAX', 'MOEN', 'MOEP', 'MOEV', 'MOEY', 'MOIR', 'MOIT', 'MOIV', 'MOIW', 'MOIX', 'MOUP', 'MOUX', 'MUAP', 'MUAX', 'MUEP', 'MUES', 'MUEV', 'MUEW', 'MUIN', 'MUIW', 'MUIY', 'MUOV', 'MUUN', 'MUUX', 'MUUY', 'BIAZ', 'BIOZ', 'BOEZ', 'BOUZ', 'CEAZ', 'CUAZ', 'CUIZ', 'DAEZ', 'DAOZ', 'DIAZ', 'DIEZ', 'DOUZ', 'DUUZ', 'FAEZ', 'FEUZ', 'FIOZ', 'FOAZ', 'FOEZ', 'FOIZ', 'FUAZ', 'FUIZ', 'FUUZ', 'GAEZ', 'GAOZ', 'GAUZ', 'GEAZ', 'GEEZ', 'GEOZ', 'GIAZ', 'GIEZ', 'GOEZ', 'GUAZ', 'GUUZ', 'HAAZ', 'HAOZ', 'HOIZ', 'HOUZ', 'HUEZ', 'HUOZ', 'JOAZ', 'JUAZ', 'KAOZ', 'KEIZ', 'KEOZ', 'KOEZ', 'KUIZ', 'LAEZ', 'LEAZ', 'LEEZ', 'LIIZ', 'LIOZ', 'LIUZ', 'LUAZ', 'LUEZ', 'LUIZ', 'MAIZ', 'MEEZ', 'MEIZ', 'MIIZ', 'MOAZ', 'MOIZ', 'MOOZ', 'MUEZ'];
}
      },
      "title": "session-timer-frame",
      "timeout": "1859000",
      "tardy": true,
      "content": {
        "type": "lab.flow.Sequence",
        "files": {},
        "responses": {
          "": ""
        },
        "parameters": {},
        "messageHandlers": {},
        "title": "session_timer_seq",
        "content": [
          {
            "type": "lab.flow.Loop",
            "templateParameters": [],
            "sample": {
              "mode": "draw-shuffle",
              "n": "200"
            },
            "files": {
              "stage_5.csv": "embedded\u002Fbf5cd0b1a80923bdb06069b9f2500967ae66845e2586046e12de7681017f8e82.csv",
              "stage_118.csv": "embedded\u002Fb63062f65b4cd3ae94899aa25daf1ae670f0b4af11ddc7e455828b8cd151e5c7.csv",
              "stage_10.csv": "embedded\u002F687d3f4e9a518dff10b23ec3a9a3246e56ef9293e267668a20916a3b0c41f7ba.csv",
              "stage_11.csv": "embedded\u002F5711cf764bd9767fb4af2018d440a7c1c908002d8eba71a4da850298fa10011a.csv"
            },
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "before:prepare": async function anonymous(
) {
this.state.url_text = "https://www.drjamiecummins.com/school-rct/st-pauls/trials/stage_";
this.state.file_type = ".csv";


this.state.url = this.state.url_text.concat(this.state.stage, this.state.file_type)

var csv2json = await new Promise((resolve, reject) => {
  Papa.parse(this.state.url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(result) {
      resolve(result.data);
    }
  })
})
console.log(csv2json)
this.options.templateParameters = csv2json




this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2

this.state.current_tally = 0
this.state.testing_trial_number = 1
this.state.phase = "Training"


}
            },
            "title": "trial_chunk",
            "tardy": true,
            "skip": "${this.state.skip_chunk == 1}",
            "shuffleGroups": [],
            "template": {
              "type": "lab.flow.Sequence",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "trials-and-breaks",
              "tardy": true,
              "skip": "${this.state.skip_chunk == 1}",
              "content": [
                {
                  "type": "lab.html.Frame",
                  "contextSelector": "[data-labjs-section=\"frame\"]",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
if (this.state.first_trial == 1) {
document.getElementById("pokemon-motivation").innerHTML = "Let's get started - you've got this!";
};


if (this.state.phase == "Training") {
  document.getElementById("trial-display").innerHTML = this.state.current_tally + " of 16 correct";
} else if (this.state.phase == "Testing") {
  document.getElementById("trial-display").innerHTML = "Trial " + this.state.testing_trial_number + " of 16";
}

var pieChart = document.getElementById('timer-circle');
pieChart.width = pieChart.height = 100;

var counter = document.createElement("p");


var ctx = pieChart.getContext('2d');
var secondsPassed = 0;

interval = setInterval(function() {
  ctx.clearRect(0, 0, pieChart.width, pieChart.height);
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, 0, Math.PI*2);
  ctx.fillStyle = '#03879E';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, -Math.PI/2, (-Math.PI/2) + Math.PI*2*secondsPassed/30);
  ctx.fillStyle = '#00ADEF';
  ctx.fill();
  ctx.font = "30px Verdana";
  ctx.fillStyle = "white";
  secondsPassed++;
}, 1000);


time_left = 30;
trialTimer = setInterval(function(){
  if(time_left <= 9){
    ctx.fillText(Math.trunc(time_left), 40, 60);
  } else {
    ctx.fillText(Math.trunc(time_left), 31, 60);
  }
  time_left -= 1;
}, 1000);

// motivational speech items
motivations = ['The more we practice, the better we get!',
              'The bigger the challenge, the bigger the victory!',
              'The best way to learn is to make mistakes!',
              'I know that you can do this!',
              'This can sometimes be tough - but you can do it!',
              'Hard work will always pay off!',
              'Stay focused - you can do this!',
              'Just 30 minutes of practice - easy peasy!',
              'You’re doing great - I’m proud of you!',
              'Even if you get stuck, just keep trying - you’ll get it!',
              'My favourite feeling is making progress after getting stuck for a while!',
              'Practice makes perfect!',
              'Every question you answer helps, even if you get it wrong!',
              'Practice can sometimes be boring - but it always pays off!',
              'Over 1000 people have already used this training...that is a lot!',
              'The 30 second countdown keeps you on your toes!',
              'The training can be frustrating, but it can be fun too!',
              'Try to treat the training like a puzzle that you can solve!',
              'Focus on getting the answers right - do not worry if you are slow!',
              'You will get faster and faster with more practice!',
              'If you are finding it easy, try to go faster!',
              'The training is designed to make you smarter - so do not worry if you do not feel smart at the start!',
              'Remember, getting answers wrong is how you learn!',
              'Try answer the questions in your head - do not write anything down!',
              'Training many times over a few weeks makes the training even more powerful!',
              'It is better to be right than to be fast - speed comes with practice!',
              'Try to push yourself a little bit more in every new session!',
              'Shortcuts will not make you smarter - solving the problems with hard work will!',
              'Easy, medium, hard, it does not matter - every question you answer helps you!',
              'Getting better can take time - be patient and never give up!',
              'How do you catch a squirrel?<br>Climb up a tree and act like a nut!',
              'I believe in you!',
              'You can do it - keep pushing!',
              'Be proud of yourself for working hard!',
              'Sometimes you will pass many levels, other times you will not - but it is all practice!',
              'Practice is always valuable!']
},
                    "after:end": function anonymous(
) {
clearInterval(interval)
clearInterval(trialTimer)

this.state.first_trial = 0;
}
                  },
                  "title": "whole-trial-frame",
                  "tardy": true,
                  "skip": "${this.state.skip_chunk == 1}",
                  "content": {
                    "type": "lab.flow.Sequence",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "trial_sequence",
                    "tardy": true,
                    "skip": "${this.state.skip_chunk == 1}",
                    "content": [
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage <= 103) {


if (this.parameters.stage <= 55) {
  this.parameters.q_word = "Is";
} else if (this.parameters.stage <= 81 && this.parameters.stage >= 56) {
  this.parameters.q_word = "Does";
};
  
this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2


if (this.parameters.stim_3_id == 1) { 
  this.parameters.stim_3 = this.state.stimulus_1;
} else if (this.parameters.stim_3_id == 2) { 
  this.parameters.stim_3 = this.state.stimulus_2;
} else if (this.parameters.stim_3_id == 3) {
  this.parameters.stim_3 = this.state.stimulus_3;
} else if (this.parameters.stim_3_id == 4) {
  this.parameters.stim_3 = this.state.stimulus_4;
};

if (this.parameters.stim_4_id == 1) { 
  this.parameters.stim_4 = this.state.stimulus_1;
} else if (this.parameters.stim_4_id == 2) {
  this.parameters.stim_4 = this.state.stimulus_2;
} else if (this.parameters.stim_4_id == 3) {
  this.parameters.stim_4 = this.state.stimulus_3;
} else if (this.parameters.stim_4_id == 4) {
  this.parameters.stim_4 = this.state.stimulus_4;
};;

if (this.parameters.stim_5_id == 1) { 
  this.parameters.stim_5 = this.state.stimulus_1;
} else if (this.parameters.stim_5_id == 2) {
  this.parameters.stim_5 = this.state.stimulus_2;
} else if (this.parameters.stim_5_id == 3) { 
  this.parameters.stim_5 = this.state.stimulus_3;
} else if (this.parameters.stim_5_id == 4) {
  this.parameters.stim_5 = this.state.stimulus_4;
};

if (this.parameters.stim_6_id == 1) { 
  this.parameters.stim_6 = this.state.stimulus_1;
} else if (this.parameters.stim_6_id == 2) {
  this.parameters.stim_6 = this.state.stimulus_2;
} else if (this.parameters.stim_6_id == 3) { 
  this.parameters.stim_6 = this.state.stimulus_3;
} else if (this.parameters.stim_6_id == 4) {
  this.parameters.stim_6 = this.state.stimulus_4;
}

if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
} 
if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
} 

};
},
                          "after:end": function anonymous(
) {
if (this.state.stage <= 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)


// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};
if (this.state.phase == "Testing" & this.state.correct == true) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" & this.state.correct == false) {
  this.state.current_tally = 0;
};

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}

};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;


}
                        },
                        "title": "standard_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4} \u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_5} ${this.parameters.relation_3} ${this.parameters.stim_6} \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"separator\"\u003E\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003E 103}"
                      },
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage > 103) {

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.stim_3 = this.state.stimulus_3
this.parameters.stim_4 = this.state.stimulus_4
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2
this.parameters.q_stim_3 = this.state.stimulus_3
this.parameters.q_stim_4 = this.state.stimulus_4

if (this.parameters.meta_stim_1_id == 1) { 
  this.parameters.meta_stim_1 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_1_id == 2) {
  this.parameters.meta_stim_1 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_1_id == 3) {
  this.parameters.meta_stim_1 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_1_id == 4) {
  this.parameters.meta_stim_1 = this.state.stimulus_4;
};

if (this.parameters.meta_stim_2_id == 1) { 
  this.parameters.meta_stim_2 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_2_id == 2) {
  this.parameters.meta_stim_2 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_2_id == 3) {
  this.parameters.meta_stim_2 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_2_id == 4) {
  this.parameters.meta_stim_2 = this.state.stimulus_4;
};


if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
};

if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
};


};
},
                          "after:end": function anonymous(
) {
if (this.state.stage > 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)

// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};

if (this.state.phase == "Testing" && this.state.correct == 1) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" && this.state.correct == 0) {
  this.state.current_tally = 0
}

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}
};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;

}
                        },
                        "title": "mathematical_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_relation_1}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_stim_1} ${this.parameters.meta_relation_2} ${this.parameters.meta_stim_2}\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003C 103}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 167.11,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#a8ca09",
                            "text": "CORRECT!",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally += 1
}
                        },
                        "title": "correct",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${this.state.correct == 0 || this.state.trial_time \u003E= 30000 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 126.2,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#d6341a",
                            "text": "WRONG",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally = 0
}
                        },
                        "title": "wrong",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${(this.state.correct != 0 & this.state.trial_time \u003C 30000) || this.state.correct == 1 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      }
                    ]
                  }
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "Training part completed!",
                      "content": "You got 16 correct answers in a row in the training part of this level!\u003Cbr\u003E\u003Cbr\u003EYou will now move on to the testing part. Get all 16 testing questions correct, and you move on to the next level.\u003Cbr\u003EBut be careful: if you get even one wrong, you have to start the training part all over again!\u003Cbr\u003E\u003Cbr\u003EWhen you're ready, click 'continue' to start the testing part of this level. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.phase = "Testing";
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "Trial 1 of 16";
this.state.current_tally = 0;
}
                  },
                  "title": "phase_transition",
                  "tardy": true,
                  "skip": "${this.state.current_tally != 16 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "",
                      "content": "You didn’t manage to get all of the questions right in that round. You’ll go back to the training part of this level. Don’t worry - practice makes perfect! Keep trying and you will get there. When you’re ready, click on “continue” to keep going. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.testing_trial_number = 1;
this.state.phase = "Training";
this.state.current_tally = 0;
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "";

}
                  },
                  "title": "return_to_training",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.testing_trial_number \u003C 17 || (this.state.testing_trial_number == 17 & this.state.current_tally \u003E 15) || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.flow.Sequence",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
document.getElementById("level-display").innerHTML = "";
document.getElementById("trial-display").innerHTML = "";

this.state.stage = ~~this.state.stage + 1;
}
                  },
                  "title": "level_transition",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.current_tally \u003C 16 || this.state.skip_chunk == 1}",
                  "content": [
                    {
                      "type": "lab.html.Screen",
                      "files": {},
                      "responses": {
                        "mousedown button#continue": "continue"
                      },
                      "parameters": {},
                      "messageHandlers": {
                        "run": function anonymous(
) {
this.state.skip_chunk = 1
}
                      },
                      "title": "next_stage",
                      "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n\n      \u003Cdiv\u003E\n      \u003Cp\u003E You just unlocked a new stage - great job!\u003Cbr\u003E\u003Cbr\u003EFeel free to take a few seconds as a break, and when you're ready,\u003Cbr\u003Eclick \"Continue\" to move on to the next level. Good luck to you both!\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\n      \u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\n      \u003Cbutton id=\"continue\"\u003EContinue\u003C\u002Fbutton\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
                      "tardy": true,
                      "skip": "${this.state.skip_chunk == 1}"
                    }
                  ]
                }
              ]
            }
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
this.state.skip_chunk = 0
this.state.phase = "Training"
this.state.testing_trial_number = 1
this.state.current_tally = 0
this.state.stage = (Number(this.state.stage) + 1).toString()
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
}
            },
            "title": "skip_chunk_reset",
            "skip": "${this.state.skip_chunk == 0}",
            "tardy": true,
            "timeout": "1000"
          },
          {
            "type": "lab.flow.Loop",
            "templateParameters": [],
            "sample": {
              "mode": "draw-shuffle",
              "n": "200"
            },
            "files": {
              "stage_5.csv": "embedded\u002Fbf5cd0b1a80923bdb06069b9f2500967ae66845e2586046e12de7681017f8e82.csv",
              "stage_118.csv": "embedded\u002Fb63062f65b4cd3ae94899aa25daf1ae670f0b4af11ddc7e455828b8cd151e5c7.csv",
              "stage_10.csv": "embedded\u002F687d3f4e9a518dff10b23ec3a9a3246e56ef9293e267668a20916a3b0c41f7ba.csv",
              "stage_11.csv": "embedded\u002F5711cf764bd9767fb4af2018d440a7c1c908002d8eba71a4da850298fa10011a.csv"
            },
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "before:prepare": async function anonymous(
) {
this.state.url_text = "https://www.drjamiecummins.com/school-rct/st-pauls/trials/stage_";
this.state.file_type = ".csv";


this.state.url = this.state.url_text.concat(this.state.stage, this.state.file_type)

var csv2json = await new Promise((resolve, reject) => {
  Papa.parse(this.state.url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(result) {
      resolve(result.data);
    }
  })
})
console.log(csv2json)
this.options.templateParameters = csv2json




this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2

this.state.current_tally = 0
this.state.testing_trial_number = 1
this.state.phase = "Training"


}
            },
            "title": "trial_chunk",
            "tardy": true,
            "skip": "${this.state.skip_chunk == 1}",
            "shuffleGroups": [],
            "template": {
              "type": "lab.flow.Sequence",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "trials-and-breaks",
              "tardy": true,
              "skip": "${this.state.skip_chunk == 1}",
              "content": [
                {
                  "type": "lab.html.Frame",
                  "contextSelector": "[data-labjs-section=\"frame\"]",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
if (this.state.first_trial == 1) {
document.getElementById("pokemon-motivation").innerHTML = "Let's get started - you've got this!";
};


if (this.state.phase == "Training") {
  document.getElementById("trial-display").innerHTML = this.state.current_tally + " of 16 correct";
} else if (this.state.phase == "Testing") {
  document.getElementById("trial-display").innerHTML = "Trial " + this.state.testing_trial_number + " of 16";
}

var pieChart = document.getElementById('timer-circle');
pieChart.width = pieChart.height = 100;

var counter = document.createElement("p");


var ctx = pieChart.getContext('2d');
var secondsPassed = 0;

interval = setInterval(function() {
  ctx.clearRect(0, 0, pieChart.width, pieChart.height);
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, 0, Math.PI*2);
  ctx.fillStyle = '#03879E';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, -Math.PI/2, (-Math.PI/2) + Math.PI*2*secondsPassed/30);
  ctx.fillStyle = '#00ADEF';
  ctx.fill();
  ctx.font = "30px Verdana";
  ctx.fillStyle = "white";
  secondsPassed++;
}, 1000);


time_left = 30;
trialTimer = setInterval(function(){
  if(time_left <= 9){
    ctx.fillText(Math.trunc(time_left), 40, 60);
  } else {
    ctx.fillText(Math.trunc(time_left), 31, 60);
  }
  time_left -= 1;
}, 1000);

// motivational speech items
motivations = ['The more we practice, the better we get!',
              'The bigger the challenge, the bigger the victory!',
              'The best way to learn is to make mistakes!',
              'I know that you can do this!',
              'This can sometimes be tough - but you can do it!',
              'Hard work will always pay off!',
              'Stay focused - you can do this!',
              'Just 30 minutes of practice - easy peasy!',
              'You’re doing great - I’m proud of you!',
              'Even if you get stuck, just keep trying - you’ll get it!',
              'My favourite feeling is making progress after getting stuck for a while!',
              'Practice makes perfect!',
              'Every question you answer helps, even if you get it wrong!',
              'Practice can sometimes be boring - but it always pays off!',
              'Over 1000 people have already used this training...that is a lot!',
              'The 30 second countdown keeps you on your toes!',
              'The training can be frustrating, but it can be fun too!',
              'Try to treat the training like a puzzle that you can solve!',
              'Focus on getting the answers right - do not worry if you are slow!',
              'You will get faster and faster with more practice!',
              'If you are finding it easy, try to go faster!',
              'The training is designed to make you smarter - so do not worry if you do not feel smart at the start!',
              'Remember, getting answers wrong is how you learn!',
              'Try answer the questions in your head - do not write anything down!',
              'Training many times over a few weeks makes the training even more powerful!',
              'It is better to be right than to be fast - speed comes with practice!',
              'Try to push yourself a little bit more in every new session!',
              'Shortcuts will not make you smarter - solving the problems with hard work will!',
              'Easy, medium, hard, it does not matter - every question you answer helps you!',
              'Getting better can take time - be patient and never give up!',
              'How do you catch a squirrel?<br>Climb up a tree and act like a nut!',
              'I believe in you!',
              'You can do it - keep pushing!',
              'Be proud of yourself for working hard!',
              'Sometimes you will pass many levels, other times you will not - but it is all practice!',
              'Practice is always valuable!']
},
                    "after:end": function anonymous(
) {
clearInterval(interval)
clearInterval(trialTimer)

this.state.first_trial = 0;
}
                  },
                  "title": "whole-trial-frame",
                  "tardy": true,
                  "skip": "${this.state.skip_chunk == 1}",
                  "content": {
                    "type": "lab.flow.Sequence",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "trial_sequence",
                    "tardy": true,
                    "skip": "${this.state.skip_chunk == 1}",
                    "content": [
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage <= 103) {


if (this.parameters.stage <= 55) {
  this.parameters.q_word = "Is";
} else if (this.parameters.stage <= 81 && this.parameters.stage >= 56) {
  this.parameters.q_word = "Does";
};
  
this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2


if (this.parameters.stim_3_id == 1) { 
  this.parameters.stim_3 = this.state.stimulus_1;
} else if (this.parameters.stim_3_id == 2) { 
  this.parameters.stim_3 = this.state.stimulus_2;
} else if (this.parameters.stim_3_id == 3) {
  this.parameters.stim_3 = this.state.stimulus_3;
} else if (this.parameters.stim_3_id == 4) {
  this.parameters.stim_3 = this.state.stimulus_4;
};

if (this.parameters.stim_4_id == 1) { 
  this.parameters.stim_4 = this.state.stimulus_1;
} else if (this.parameters.stim_4_id == 2) {
  this.parameters.stim_4 = this.state.stimulus_2;
} else if (this.parameters.stim_4_id == 3) {
  this.parameters.stim_4 = this.state.stimulus_3;
} else if (this.parameters.stim_4_id == 4) {
  this.parameters.stim_4 = this.state.stimulus_4;
};;

if (this.parameters.stim_5_id == 1) { 
  this.parameters.stim_5 = this.state.stimulus_1;
} else if (this.parameters.stim_5_id == 2) {
  this.parameters.stim_5 = this.state.stimulus_2;
} else if (this.parameters.stim_5_id == 3) { 
  this.parameters.stim_5 = this.state.stimulus_3;
} else if (this.parameters.stim_5_id == 4) {
  this.parameters.stim_5 = this.state.stimulus_4;
};

if (this.parameters.stim_6_id == 1) { 
  this.parameters.stim_6 = this.state.stimulus_1;
} else if (this.parameters.stim_6_id == 2) {
  this.parameters.stim_6 = this.state.stimulus_2;
} else if (this.parameters.stim_6_id == 3) { 
  this.parameters.stim_6 = this.state.stimulus_3;
} else if (this.parameters.stim_6_id == 4) {
  this.parameters.stim_6 = this.state.stimulus_4;
}

if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
} 
if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
} 

};
},
                          "after:end": function anonymous(
) {
if (this.state.stage <= 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)


// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};
if (this.state.phase == "Testing" & this.state.correct == true) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" & this.state.correct == false) {
  this.state.current_tally = 0;
};

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}

};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;


}
                        },
                        "title": "standard_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4} \u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_5} ${this.parameters.relation_3} ${this.parameters.stim_6} \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"separator\"\u003E\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003E 103}"
                      },
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage > 103) {

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.stim_3 = this.state.stimulus_3
this.parameters.stim_4 = this.state.stimulus_4
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2
this.parameters.q_stim_3 = this.state.stimulus_3
this.parameters.q_stim_4 = this.state.stimulus_4

if (this.parameters.meta_stim_1_id == 1) { 
  this.parameters.meta_stim_1 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_1_id == 2) {
  this.parameters.meta_stim_1 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_1_id == 3) {
  this.parameters.meta_stim_1 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_1_id == 4) {
  this.parameters.meta_stim_1 = this.state.stimulus_4;
};

if (this.parameters.meta_stim_2_id == 1) { 
  this.parameters.meta_stim_2 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_2_id == 2) {
  this.parameters.meta_stim_2 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_2_id == 3) {
  this.parameters.meta_stim_2 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_2_id == 4) {
  this.parameters.meta_stim_2 = this.state.stimulus_4;
};


if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
};

if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
};


};
},
                          "after:end": function anonymous(
) {
if (this.state.stage > 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)

// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};

if (this.state.phase == "Testing" && this.state.correct == 1) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" && this.state.correct == 0) {
  this.state.current_tally = 0
}

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}
};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;

}
                        },
                        "title": "mathematical_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_relation_1}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_stim_1} ${this.parameters.meta_relation_2} ${this.parameters.meta_stim_2}\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003C 103}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 167.11,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#a8ca09",
                            "text": "CORRECT!",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally += 1
}
                        },
                        "title": "correct",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${this.state.correct == 0 || this.state.trial_time \u003E= 30000 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 126.2,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#d6341a",
                            "text": "WRONG",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally = 0
}
                        },
                        "title": "wrong",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${(this.state.correct != 0 & this.state.trial_time \u003C 30000) || this.state.correct == 1 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      }
                    ]
                  }
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "Training part completed!",
                      "content": "You got 16 correct answers in a row in the training part of this level!\u003Cbr\u003E\u003Cbr\u003EYou will now move on to the testing part. Get all 16 testing questions correct, and you move on to the next level.\u003Cbr\u003EBut be careful: if you get even one wrong, you have to start the training part all over again!\u003Cbr\u003E\u003Cbr\u003EWhen you're ready, click 'continue' to start the testing part of this level. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.phase = "Testing";
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "Trial 1 of 16";
this.state.current_tally = 0;
}
                  },
                  "title": "phase_transition",
                  "tardy": true,
                  "skip": "${this.state.current_tally != 16 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "",
                      "content": "You didn’t manage to get all of the questions right in that round. You’ll go back to the training part of this level. Don’t worry - practice makes perfect! Keep trying and you will get there. When you’re ready, click on “continue” to keep going. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.testing_trial_number = 1;
this.state.phase = "Training";
this.state.current_tally = 0;
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "";

}
                  },
                  "title": "return_to_training",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.testing_trial_number \u003C 17 || (this.state.testing_trial_number == 17 & this.state.current_tally \u003E 15) || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.flow.Sequence",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
document.getElementById("level-display").innerHTML = "";
document.getElementById("trial-display").innerHTML = "";

this.state.stage = ~~this.state.stage + 1;
}
                  },
                  "title": "level_transition",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.current_tally \u003C 16 || this.state.skip_chunk == 1}",
                  "content": [
                    {
                      "type": "lab.html.Screen",
                      "files": {},
                      "responses": {
                        "mousedown button#continue": "continue"
                      },
                      "parameters": {},
                      "messageHandlers": {
                        "run": function anonymous(
) {
this.state.skip_chunk = 1
}
                      },
                      "title": "next_stage",
                      "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n\n      \u003Cdiv\u003E\n      \u003Cp\u003E You just unlocked a new stage - great job!\u003Cbr\u003E\u003Cbr\u003EFeel free to take a few seconds as a break, and when you're ready,\u003Cbr\u003Eclick \"Continue\" to move on to the next level. Good luck to you both!\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\n      \u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\n      \u003Cbutton id=\"continue\"\u003EContinue\u003C\u002Fbutton\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
                      "tardy": true,
                      "skip": "${this.state.skip_chunk == 1}"
                    }
                  ]
                }
              ]
            }
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
this.state.skip_chunk = 0
this.state.phase = "Training"
this.state.testing_trial_number = 1
this.state.current_tally = 0
this.state.stage = (Number(this.state.stage) + 1).toString()
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
}
            },
            "title": "skip_chunk_reset",
            "skip": "${this.state.skip_chunk == 0}",
            "tardy": true,
            "timeout": "1000"
          },
          {
            "type": "lab.flow.Loop",
            "templateParameters": [],
            "sample": {
              "mode": "draw-shuffle",
              "n": "200"
            },
            "files": {
              "stage_5.csv": "embedded\u002Fbf5cd0b1a80923bdb06069b9f2500967ae66845e2586046e12de7681017f8e82.csv",
              "stage_118.csv": "embedded\u002Fb63062f65b4cd3ae94899aa25daf1ae670f0b4af11ddc7e455828b8cd151e5c7.csv",
              "stage_10.csv": "embedded\u002F687d3f4e9a518dff10b23ec3a9a3246e56ef9293e267668a20916a3b0c41f7ba.csv",
              "stage_11.csv": "embedded\u002F5711cf764bd9767fb4af2018d440a7c1c908002d8eba71a4da850298fa10011a.csv"
            },
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "before:prepare": async function anonymous(
) {
this.state.url_text = "https://www.drjamiecummins.com/school-rct/st-pauls/trials/stage_";
this.state.file_type = ".csv";


this.state.url = this.state.url_text.concat(this.state.stage, this.state.file_type)

var csv2json = await new Promise((resolve, reject) => {
  Papa.parse(this.state.url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(result) {
      resolve(result.data);
    }
  })
})
console.log(csv2json)
this.options.templateParameters = csv2json




this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2

this.state.current_tally = 0
this.state.testing_trial_number = 1
this.state.phase = "Training"


}
            },
            "title": "trial_chunk",
            "tardy": true,
            "skip": "${this.state.skip_chunk == 1}",
            "shuffleGroups": [],
            "template": {
              "type": "lab.flow.Sequence",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "trials-and-breaks",
              "tardy": true,
              "skip": "${this.state.skip_chunk == 1}",
              "content": [
                {
                  "type": "lab.html.Frame",
                  "contextSelector": "[data-labjs-section=\"frame\"]",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
if (this.state.first_trial == 1) {
document.getElementById("pokemon-motivation").innerHTML = "Let's get started - you've got this!";
};


if (this.state.phase == "Training") {
  document.getElementById("trial-display").innerHTML = this.state.current_tally + " of 16 correct";
} else if (this.state.phase == "Testing") {
  document.getElementById("trial-display").innerHTML = "Trial " + this.state.testing_trial_number + " of 16";
}

var pieChart = document.getElementById('timer-circle');
pieChart.width = pieChart.height = 100;

var counter = document.createElement("p");


var ctx = pieChart.getContext('2d');
var secondsPassed = 0;

interval = setInterval(function() {
  ctx.clearRect(0, 0, pieChart.width, pieChart.height);
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, 0, Math.PI*2);
  ctx.fillStyle = '#03879E';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, -Math.PI/2, (-Math.PI/2) + Math.PI*2*secondsPassed/30);
  ctx.fillStyle = '#00ADEF';
  ctx.fill();
  ctx.font = "30px Verdana";
  ctx.fillStyle = "white";
  secondsPassed++;
}, 1000);


time_left = 30;
trialTimer = setInterval(function(){
  if(time_left <= 9){
    ctx.fillText(Math.trunc(time_left), 40, 60);
  } else {
    ctx.fillText(Math.trunc(time_left), 31, 60);
  }
  time_left -= 1;
}, 1000);

// motivational speech items
motivations = ['The more we practice, the better we get!',
              'The bigger the challenge, the bigger the victory!',
              'The best way to learn is to make mistakes!',
              'I know that you can do this!',
              'This can sometimes be tough - but you can do it!',
              'Hard work will always pay off!',
              'Stay focused - you can do this!',
              'Just 30 minutes of practice - easy peasy!',
              'You’re doing great - I’m proud of you!',
              'Even if you get stuck, just keep trying - you’ll get it!',
              'My favourite feeling is making progress after getting stuck for a while!',
              'Practice makes perfect!',
              'Every question you answer helps, even if you get it wrong!',
              'Practice can sometimes be boring - but it always pays off!',
              'Over 1000 people have already used this training...that is a lot!',
              'The 30 second countdown keeps you on your toes!',
              'The training can be frustrating, but it can be fun too!',
              'Try to treat the training like a puzzle that you can solve!',
              'Focus on getting the answers right - do not worry if you are slow!',
              'You will get faster and faster with more practice!',
              'If you are finding it easy, try to go faster!',
              'The training is designed to make you smarter - so do not worry if you do not feel smart at the start!',
              'Remember, getting answers wrong is how you learn!',
              'Try answer the questions in your head - do not write anything down!',
              'Training many times over a few weeks makes the training even more powerful!',
              'It is better to be right than to be fast - speed comes with practice!',
              'Try to push yourself a little bit more in every new session!',
              'Shortcuts will not make you smarter - solving the problems with hard work will!',
              'Easy, medium, hard, it does not matter - every question you answer helps you!',
              'Getting better can take time - be patient and never give up!',
              'How do you catch a squirrel?<br>Climb up a tree and act like a nut!',
              'I believe in you!',
              'You can do it - keep pushing!',
              'Be proud of yourself for working hard!',
              'Sometimes you will pass many levels, other times you will not - but it is all practice!',
              'Practice is always valuable!']
},
                    "after:end": function anonymous(
) {
clearInterval(interval)
clearInterval(trialTimer)

this.state.first_trial = 0;
}
                  },
                  "title": "whole-trial-frame",
                  "tardy": true,
                  "skip": "${this.state.skip_chunk == 1}",
                  "content": {
                    "type": "lab.flow.Sequence",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "trial_sequence",
                    "tardy": true,
                    "skip": "${this.state.skip_chunk == 1}",
                    "content": [
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage <= 103) {


if (this.parameters.stage <= 55) {
  this.parameters.q_word = "Is";
} else if (this.parameters.stage <= 81 && this.parameters.stage >= 56) {
  this.parameters.q_word = "Does";
};
  
this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2


if (this.parameters.stim_3_id == 1) { 
  this.parameters.stim_3 = this.state.stimulus_1;
} else if (this.parameters.stim_3_id == 2) { 
  this.parameters.stim_3 = this.state.stimulus_2;
} else if (this.parameters.stim_3_id == 3) {
  this.parameters.stim_3 = this.state.stimulus_3;
} else if (this.parameters.stim_3_id == 4) {
  this.parameters.stim_3 = this.state.stimulus_4;
};

if (this.parameters.stim_4_id == 1) { 
  this.parameters.stim_4 = this.state.stimulus_1;
} else if (this.parameters.stim_4_id == 2) {
  this.parameters.stim_4 = this.state.stimulus_2;
} else if (this.parameters.stim_4_id == 3) {
  this.parameters.stim_4 = this.state.stimulus_3;
} else if (this.parameters.stim_4_id == 4) {
  this.parameters.stim_4 = this.state.stimulus_4;
};;

if (this.parameters.stim_5_id == 1) { 
  this.parameters.stim_5 = this.state.stimulus_1;
} else if (this.parameters.stim_5_id == 2) {
  this.parameters.stim_5 = this.state.stimulus_2;
} else if (this.parameters.stim_5_id == 3) { 
  this.parameters.stim_5 = this.state.stimulus_3;
} else if (this.parameters.stim_5_id == 4) {
  this.parameters.stim_5 = this.state.stimulus_4;
};

if (this.parameters.stim_6_id == 1) { 
  this.parameters.stim_6 = this.state.stimulus_1;
} else if (this.parameters.stim_6_id == 2) {
  this.parameters.stim_6 = this.state.stimulus_2;
} else if (this.parameters.stim_6_id == 3) { 
  this.parameters.stim_6 = this.state.stimulus_3;
} else if (this.parameters.stim_6_id == 4) {
  this.parameters.stim_6 = this.state.stimulus_4;
}

if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
} 
if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
} 

};
},
                          "after:end": function anonymous(
) {
if (this.state.stage <= 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)


// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};
if (this.state.phase == "Testing" & this.state.correct == true) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" & this.state.correct == false) {
  this.state.current_tally = 0;
};

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}

};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;


}
                        },
                        "title": "standard_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4} \u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_5} ${this.parameters.relation_3} ${this.parameters.stim_6} \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"separator\"\u003E\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003E 103}"
                      },
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage > 103) {

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.stim_3 = this.state.stimulus_3
this.parameters.stim_4 = this.state.stimulus_4
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2
this.parameters.q_stim_3 = this.state.stimulus_3
this.parameters.q_stim_4 = this.state.stimulus_4

if (this.parameters.meta_stim_1_id == 1) { 
  this.parameters.meta_stim_1 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_1_id == 2) {
  this.parameters.meta_stim_1 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_1_id == 3) {
  this.parameters.meta_stim_1 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_1_id == 4) {
  this.parameters.meta_stim_1 = this.state.stimulus_4;
};

if (this.parameters.meta_stim_2_id == 1) { 
  this.parameters.meta_stim_2 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_2_id == 2) {
  this.parameters.meta_stim_2 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_2_id == 3) {
  this.parameters.meta_stim_2 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_2_id == 4) {
  this.parameters.meta_stim_2 = this.state.stimulus_4;
};


if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
};

if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
};


};
},
                          "after:end": function anonymous(
) {
if (this.state.stage > 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)

// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};

if (this.state.phase == "Testing" && this.state.correct == 1) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" && this.state.correct == 0) {
  this.state.current_tally = 0
}

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}
};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;

}
                        },
                        "title": "mathematical_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_relation_1}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_stim_1} ${this.parameters.meta_relation_2} ${this.parameters.meta_stim_2}\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003C 103}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 167.11,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#a8ca09",
                            "text": "CORRECT!",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally += 1
}
                        },
                        "title": "correct",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${this.state.correct == 0 || this.state.trial_time \u003E= 30000 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 126.2,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#d6341a",
                            "text": "WRONG",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally = 0
}
                        },
                        "title": "wrong",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${(this.state.correct != 0 & this.state.trial_time \u003C 30000) || this.state.correct == 1 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      }
                    ]
                  }
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "Training part completed!",
                      "content": "You got 16 correct answers in a row in the training part of this level!\u003Cbr\u003E\u003Cbr\u003EYou will now move on to the testing part. Get all 16 testing questions correct, and you move on to the next level.\u003Cbr\u003EBut be careful: if you get even one wrong, you have to start the training part all over again!\u003Cbr\u003E\u003Cbr\u003EWhen you're ready, click 'continue' to start the testing part of this level. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.phase = "Testing";
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "Trial 1 of 16";
this.state.current_tally = 0;
}
                  },
                  "title": "phase_transition",
                  "tardy": true,
                  "skip": "${this.state.current_tally != 16 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "",
                      "content": "You didn’t manage to get all of the questions right in that round. You’ll go back to the training part of this level. Don’t worry - practice makes perfect! Keep trying and you will get there. When you’re ready, click on “continue” to keep going. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.testing_trial_number = 1;
this.state.phase = "Training";
this.state.current_tally = 0;
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "";

}
                  },
                  "title": "return_to_training",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.testing_trial_number \u003C 17 || (this.state.testing_trial_number == 17 & this.state.current_tally \u003E 15) || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.flow.Sequence",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
document.getElementById("level-display").innerHTML = "";
document.getElementById("trial-display").innerHTML = "";

this.state.stage = ~~this.state.stage + 1;
}
                  },
                  "title": "level_transition",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.current_tally \u003C 16 || this.state.skip_chunk == 1}",
                  "content": [
                    {
                      "type": "lab.html.Screen",
                      "files": {},
                      "responses": {
                        "mousedown button#continue": "continue"
                      },
                      "parameters": {},
                      "messageHandlers": {
                        "run": function anonymous(
) {
this.state.skip_chunk = 1
}
                      },
                      "title": "next_stage",
                      "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n\n      \u003Cdiv\u003E\n      \u003Cp\u003E You just unlocked a new stage - great job!\u003Cbr\u003E\u003Cbr\u003EFeel free to take a few seconds as a break, and when you're ready,\u003Cbr\u003Eclick \"Continue\" to move on to the next level. Good luck to you both!\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\n      \u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\n      \u003Cbutton id=\"continue\"\u003EContinue\u003C\u002Fbutton\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
                      "tardy": true,
                      "skip": "${this.state.skip_chunk == 1}"
                    }
                  ]
                }
              ]
            }
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
this.state.skip_chunk = 0
this.state.phase = "Training"
this.state.testing_trial_number = 1
this.state.current_tally = 0
this.state.stage = (Number(this.state.stage) + 1).toString()
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
}
            },
            "title": "skip_chunk_reset",
            "skip": "${this.state.skip_chunk == 0}",
            "tardy": true,
            "timeout": "1000"
          },
          {
            "type": "lab.flow.Loop",
            "templateParameters": [],
            "sample": {
              "mode": "draw-shuffle",
              "n": "200"
            },
            "files": {
              "stage_5.csv": "embedded\u002Fbf5cd0b1a80923bdb06069b9f2500967ae66845e2586046e12de7681017f8e82.csv",
              "stage_118.csv": "embedded\u002Fb63062f65b4cd3ae94899aa25daf1ae670f0b4af11ddc7e455828b8cd151e5c7.csv",
              "stage_10.csv": "embedded\u002F687d3f4e9a518dff10b23ec3a9a3246e56ef9293e267668a20916a3b0c41f7ba.csv",
              "stage_11.csv": "embedded\u002F5711cf764bd9767fb4af2018d440a7c1c908002d8eba71a4da850298fa10011a.csv"
            },
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "before:prepare": async function anonymous(
) {
this.state.url_text = "https://www.drjamiecummins.com/school-rct/st-pauls/trials/stage_";
this.state.file_type = ".csv";


this.state.url = this.state.url_text.concat(this.state.stage, this.state.file_type)

var csv2json = await new Promise((resolve, reject) => {
  Papa.parse(this.state.url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(result) {
      resolve(result.data);
    }
  })
})
console.log(csv2json)
this.options.templateParameters = csv2json




this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2

this.state.current_tally = 0
this.state.testing_trial_number = 1
this.state.phase = "Training"


}
            },
            "title": "trial_chunk",
            "tardy": true,
            "skip": "${this.state.skip_chunk == 1}",
            "shuffleGroups": [],
            "template": {
              "type": "lab.flow.Sequence",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "trials-and-breaks",
              "tardy": true,
              "skip": "${this.state.skip_chunk == 1}",
              "content": [
                {
                  "type": "lab.html.Frame",
                  "contextSelector": "[data-labjs-section=\"frame\"]",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
if (this.state.first_trial == 1) {
document.getElementById("pokemon-motivation").innerHTML = "Let's get started - you've got this!";
};


if (this.state.phase == "Training") {
  document.getElementById("trial-display").innerHTML = this.state.current_tally + " of 16 correct";
} else if (this.state.phase == "Testing") {
  document.getElementById("trial-display").innerHTML = "Trial " + this.state.testing_trial_number + " of 16";
}

var pieChart = document.getElementById('timer-circle');
pieChart.width = pieChart.height = 100;

var counter = document.createElement("p");


var ctx = pieChart.getContext('2d');
var secondsPassed = 0;

interval = setInterval(function() {
  ctx.clearRect(0, 0, pieChart.width, pieChart.height);
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, 0, Math.PI*2);
  ctx.fillStyle = '#03879E';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, -Math.PI/2, (-Math.PI/2) + Math.PI*2*secondsPassed/30);
  ctx.fillStyle = '#00ADEF';
  ctx.fill();
  ctx.font = "30px Verdana";
  ctx.fillStyle = "white";
  secondsPassed++;
}, 1000);


time_left = 30;
trialTimer = setInterval(function(){
  if(time_left <= 9){
    ctx.fillText(Math.trunc(time_left), 40, 60);
  } else {
    ctx.fillText(Math.trunc(time_left), 31, 60);
  }
  time_left -= 1;
}, 1000);

// motivational speech items
motivations = ['The more we practice, the better we get!',
              'The bigger the challenge, the bigger the victory!',
              'The best way to learn is to make mistakes!',
              'I know that you can do this!',
              'This can sometimes be tough - but you can do it!',
              'Hard work will always pay off!',
              'Stay focused - you can do this!',
              'Just 30 minutes of practice - easy peasy!',
              'You’re doing great - I’m proud of you!',
              'Even if you get stuck, just keep trying - you’ll get it!',
              'My favourite feeling is making progress after getting stuck for a while!',
              'Practice makes perfect!',
              'Every question you answer helps, even if you get it wrong!',
              'Practice can sometimes be boring - but it always pays off!',
              'Over 1000 people have already used this training...that is a lot!',
              'The 30 second countdown keeps you on your toes!',
              'The training can be frustrating, but it can be fun too!',
              'Try to treat the training like a puzzle that you can solve!',
              'Focus on getting the answers right - do not worry if you are slow!',
              'You will get faster and faster with more practice!',
              'If you are finding it easy, try to go faster!',
              'The training is designed to make you smarter - so do not worry if you do not feel smart at the start!',
              'Remember, getting answers wrong is how you learn!',
              'Try answer the questions in your head - do not write anything down!',
              'Training many times over a few weeks makes the training even more powerful!',
              'It is better to be right than to be fast - speed comes with practice!',
              'Try to push yourself a little bit more in every new session!',
              'Shortcuts will not make you smarter - solving the problems with hard work will!',
              'Easy, medium, hard, it does not matter - every question you answer helps you!',
              'Getting better can take time - be patient and never give up!',
              'How do you catch a squirrel?<br>Climb up a tree and act like a nut!',
              'I believe in you!',
              'You can do it - keep pushing!',
              'Be proud of yourself for working hard!',
              'Sometimes you will pass many levels, other times you will not - but it is all practice!',
              'Practice is always valuable!']
},
                    "after:end": function anonymous(
) {
clearInterval(interval)
clearInterval(trialTimer)

this.state.first_trial = 0;
}
                  },
                  "title": "whole-trial-frame",
                  "tardy": true,
                  "skip": "${this.state.skip_chunk == 1}",
                  "content": {
                    "type": "lab.flow.Sequence",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "trial_sequence",
                    "tardy": true,
                    "skip": "${this.state.skip_chunk == 1}",
                    "content": [
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage <= 103) {


if (this.parameters.stage <= 55) {
  this.parameters.q_word = "Is";
} else if (this.parameters.stage <= 81 && this.parameters.stage >= 56) {
  this.parameters.q_word = "Does";
};
  
this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2


if (this.parameters.stim_3_id == 1) { 
  this.parameters.stim_3 = this.state.stimulus_1;
} else if (this.parameters.stim_3_id == 2) { 
  this.parameters.stim_3 = this.state.stimulus_2;
} else if (this.parameters.stim_3_id == 3) {
  this.parameters.stim_3 = this.state.stimulus_3;
} else if (this.parameters.stim_3_id == 4) {
  this.parameters.stim_3 = this.state.stimulus_4;
};

if (this.parameters.stim_4_id == 1) { 
  this.parameters.stim_4 = this.state.stimulus_1;
} else if (this.parameters.stim_4_id == 2) {
  this.parameters.stim_4 = this.state.stimulus_2;
} else if (this.parameters.stim_4_id == 3) {
  this.parameters.stim_4 = this.state.stimulus_3;
} else if (this.parameters.stim_4_id == 4) {
  this.parameters.stim_4 = this.state.stimulus_4;
};;

if (this.parameters.stim_5_id == 1) { 
  this.parameters.stim_5 = this.state.stimulus_1;
} else if (this.parameters.stim_5_id == 2) {
  this.parameters.stim_5 = this.state.stimulus_2;
} else if (this.parameters.stim_5_id == 3) { 
  this.parameters.stim_5 = this.state.stimulus_3;
} else if (this.parameters.stim_5_id == 4) {
  this.parameters.stim_5 = this.state.stimulus_4;
};

if (this.parameters.stim_6_id == 1) { 
  this.parameters.stim_6 = this.state.stimulus_1;
} else if (this.parameters.stim_6_id == 2) {
  this.parameters.stim_6 = this.state.stimulus_2;
} else if (this.parameters.stim_6_id == 3) { 
  this.parameters.stim_6 = this.state.stimulus_3;
} else if (this.parameters.stim_6_id == 4) {
  this.parameters.stim_6 = this.state.stimulus_4;
}

if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
} 
if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
} 

};
},
                          "after:end": function anonymous(
) {
if (this.state.stage <= 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)


// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};
if (this.state.phase == "Testing" & this.state.correct == true) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" & this.state.correct == false) {
  this.state.current_tally = 0;
};

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}

};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;


}
                        },
                        "title": "standard_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4} \u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_5} ${this.parameters.relation_3} ${this.parameters.stim_6} \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"separator\"\u003E\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003E 103}"
                      },
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage > 103) {

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.stim_3 = this.state.stimulus_3
this.parameters.stim_4 = this.state.stimulus_4
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2
this.parameters.q_stim_3 = this.state.stimulus_3
this.parameters.q_stim_4 = this.state.stimulus_4

if (this.parameters.meta_stim_1_id == 1) { 
  this.parameters.meta_stim_1 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_1_id == 2) {
  this.parameters.meta_stim_1 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_1_id == 3) {
  this.parameters.meta_stim_1 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_1_id == 4) {
  this.parameters.meta_stim_1 = this.state.stimulus_4;
};

if (this.parameters.meta_stim_2_id == 1) { 
  this.parameters.meta_stim_2 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_2_id == 2) {
  this.parameters.meta_stim_2 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_2_id == 3) {
  this.parameters.meta_stim_2 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_2_id == 4) {
  this.parameters.meta_stim_2 = this.state.stimulus_4;
};


if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
};

if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
};


};
},
                          "after:end": function anonymous(
) {
if (this.state.stage > 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)

// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};

if (this.state.phase == "Testing" && this.state.correct == 1) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" && this.state.correct == 0) {
  this.state.current_tally = 0
}

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}
};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;

}
                        },
                        "title": "mathematical_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_relation_1}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_stim_1} ${this.parameters.meta_relation_2} ${this.parameters.meta_stim_2}\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003C 103}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 167.11,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#a8ca09",
                            "text": "CORRECT!",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally += 1
}
                        },
                        "title": "correct",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${this.state.correct == 0 || this.state.trial_time \u003E= 30000 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 126.2,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#d6341a",
                            "text": "WRONG",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally = 0
}
                        },
                        "title": "wrong",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${(this.state.correct != 0 & this.state.trial_time \u003C 30000) || this.state.correct == 1 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      }
                    ]
                  }
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "Training part completed!",
                      "content": "You got 16 correct answers in a row in the training part of this level!\u003Cbr\u003E\u003Cbr\u003EYou will now move on to the testing part. Get all 16 testing questions correct, and you move on to the next level.\u003Cbr\u003EBut be careful: if you get even one wrong, you have to start the training part all over again!\u003Cbr\u003E\u003Cbr\u003EWhen you're ready, click 'continue' to start the testing part of this level. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.phase = "Testing";
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "Trial 1 of 16";
this.state.current_tally = 0;
}
                  },
                  "title": "phase_transition",
                  "tardy": true,
                  "skip": "${this.state.current_tally != 16 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "",
                      "content": "You didn’t manage to get all of the questions right in that round. You’ll go back to the training part of this level. Don’t worry - practice makes perfect! Keep trying and you will get there. When you’re ready, click on “continue” to keep going. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.testing_trial_number = 1;
this.state.phase = "Training";
this.state.current_tally = 0;
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "";

}
                  },
                  "title": "return_to_training",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.testing_trial_number \u003C 17 || (this.state.testing_trial_number == 17 & this.state.current_tally \u003E 15) || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.flow.Sequence",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
document.getElementById("level-display").innerHTML = "";
document.getElementById("trial-display").innerHTML = "";

this.state.stage = ~~this.state.stage + 1;
}
                  },
                  "title": "level_transition",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.current_tally \u003C 16 || this.state.skip_chunk == 1}",
                  "content": [
                    {
                      "type": "lab.html.Screen",
                      "files": {},
                      "responses": {
                        "mousedown button#continue": "continue"
                      },
                      "parameters": {},
                      "messageHandlers": {
                        "run": function anonymous(
) {
this.state.skip_chunk = 1
}
                      },
                      "title": "next_stage",
                      "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n\n      \u003Cdiv\u003E\n      \u003Cp\u003E You just unlocked a new stage - great job!\u003Cbr\u003E\u003Cbr\u003EFeel free to take a few seconds as a break, and when you're ready,\u003Cbr\u003Eclick \"Continue\" to move on to the next level. Good luck to you both!\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\n      \u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\n      \u003Cbutton id=\"continue\"\u003EContinue\u003C\u002Fbutton\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
                      "tardy": true,
                      "skip": "${this.state.skip_chunk == 1}"
                    }
                  ]
                }
              ]
            }
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
this.state.skip_chunk = 0
this.state.phase = "Training"
this.state.testing_trial_number = 1
this.state.current_tally = 0
this.state.stage = (Number(this.state.stage) + 1).toString()
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
}
            },
            "title": "skip_chunk_reset",
            "skip": "${this.state.skip_chunk == 0}",
            "tardy": true,
            "timeout": "1000"
          },
          {
            "type": "lab.flow.Loop",
            "templateParameters": [],
            "sample": {
              "mode": "draw-shuffle",
              "n": "200"
            },
            "files": {
              "stage_5.csv": "embedded\u002Fbf5cd0b1a80923bdb06069b9f2500967ae66845e2586046e12de7681017f8e82.csv",
              "stage_118.csv": "embedded\u002Fb63062f65b4cd3ae94899aa25daf1ae670f0b4af11ddc7e455828b8cd151e5c7.csv",
              "stage_10.csv": "embedded\u002F687d3f4e9a518dff10b23ec3a9a3246e56ef9293e267668a20916a3b0c41f7ba.csv",
              "stage_11.csv": "embedded\u002F5711cf764bd9767fb4af2018d440a7c1c908002d8eba71a4da850298fa10011a.csv"
            },
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "before:prepare": async function anonymous(
) {
this.state.url_text = "https://www.drjamiecummins.com/school-rct/st-pauls/trials/stage_";
this.state.file_type = ".csv";


this.state.url = this.state.url_text.concat(this.state.stage, this.state.file_type)

var csv2json = await new Promise((resolve, reject) => {
  Papa.parse(this.state.url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(result) {
      resolve(result.data);
    }
  })
})
console.log(csv2json)
this.options.templateParameters = csv2json




this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2

this.state.current_tally = 0
this.state.testing_trial_number = 1
this.state.phase = "Training"


}
            },
            "title": "trial_chunk",
            "tardy": true,
            "skip": "${this.state.skip_chunk == 1}",
            "shuffleGroups": [],
            "template": {
              "type": "lab.flow.Sequence",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "trials-and-breaks",
              "tardy": true,
              "skip": "${this.state.skip_chunk == 1}",
              "content": [
                {
                  "type": "lab.html.Frame",
                  "contextSelector": "[data-labjs-section=\"frame\"]",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
if (this.state.first_trial == 1) {
document.getElementById("pokemon-motivation").innerHTML = "Let's get started - you've got this!";
};


if (this.state.phase == "Training") {
  document.getElementById("trial-display").innerHTML = this.state.current_tally + " of 16 correct";
} else if (this.state.phase == "Testing") {
  document.getElementById("trial-display").innerHTML = "Trial " + this.state.testing_trial_number + " of 16";
}

var pieChart = document.getElementById('timer-circle');
pieChart.width = pieChart.height = 100;

var counter = document.createElement("p");


var ctx = pieChart.getContext('2d');
var secondsPassed = 0;

interval = setInterval(function() {
  ctx.clearRect(0, 0, pieChart.width, pieChart.height);
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, 0, Math.PI*2);
  ctx.fillStyle = '#03879E';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, -Math.PI/2, (-Math.PI/2) + Math.PI*2*secondsPassed/30);
  ctx.fillStyle = '#00ADEF';
  ctx.fill();
  ctx.font = "30px Verdana";
  ctx.fillStyle = "white";
  secondsPassed++;
}, 1000);


time_left = 30;
trialTimer = setInterval(function(){
  if(time_left <= 9){
    ctx.fillText(Math.trunc(time_left), 40, 60);
  } else {
    ctx.fillText(Math.trunc(time_left), 31, 60);
  }
  time_left -= 1;
}, 1000);

// motivational speech items
motivations = ['The more we practice, the better we get!',
              'The bigger the challenge, the bigger the victory!',
              'The best way to learn is to make mistakes!',
              'I know that you can do this!',
              'This can sometimes be tough - but you can do it!',
              'Hard work will always pay off!',
              'Stay focused - you can do this!',
              'Just 30 minutes of practice - easy peasy!',
              'You’re doing great - I’m proud of you!',
              'Even if you get stuck, just keep trying - you’ll get it!',
              'My favourite feeling is making progress after getting stuck for a while!',
              'Practice makes perfect!',
              'Every question you answer helps, even if you get it wrong!',
              'Practice can sometimes be boring - but it always pays off!',
              'Over 1000 people have already used this training...that is a lot!',
              'The 30 second countdown keeps you on your toes!',
              'The training can be frustrating, but it can be fun too!',
              'Try to treat the training like a puzzle that you can solve!',
              'Focus on getting the answers right - do not worry if you are slow!',
              'You will get faster and faster with more practice!',
              'If you are finding it easy, try to go faster!',
              'The training is designed to make you smarter - so do not worry if you do not feel smart at the start!',
              'Remember, getting answers wrong is how you learn!',
              'Try answer the questions in your head - do not write anything down!',
              'Training many times over a few weeks makes the training even more powerful!',
              'It is better to be right than to be fast - speed comes with practice!',
              'Try to push yourself a little bit more in every new session!',
              'Shortcuts will not make you smarter - solving the problems with hard work will!',
              'Easy, medium, hard, it does not matter - every question you answer helps you!',
              'Getting better can take time - be patient and never give up!',
              'How do you catch a squirrel?<br>Climb up a tree and act like a nut!',
              'I believe in you!',
              'You can do it - keep pushing!',
              'Be proud of yourself for working hard!',
              'Sometimes you will pass many levels, other times you will not - but it is all practice!',
              'Practice is always valuable!']
},
                    "after:end": function anonymous(
) {
clearInterval(interval)
clearInterval(trialTimer)

this.state.first_trial = 0;
}
                  },
                  "title": "whole-trial-frame",
                  "tardy": true,
                  "skip": "${this.state.skip_chunk == 1}",
                  "content": {
                    "type": "lab.flow.Sequence",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "trial_sequence",
                    "tardy": true,
                    "skip": "${this.state.skip_chunk == 1}",
                    "content": [
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage <= 103) {


if (this.parameters.stage <= 55) {
  this.parameters.q_word = "Is";
} else if (this.parameters.stage <= 81 && this.parameters.stage >= 56) {
  this.parameters.q_word = "Does";
};
  
this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2


if (this.parameters.stim_3_id == 1) { 
  this.parameters.stim_3 = this.state.stimulus_1;
} else if (this.parameters.stim_3_id == 2) { 
  this.parameters.stim_3 = this.state.stimulus_2;
} else if (this.parameters.stim_3_id == 3) {
  this.parameters.stim_3 = this.state.stimulus_3;
} else if (this.parameters.stim_3_id == 4) {
  this.parameters.stim_3 = this.state.stimulus_4;
};

if (this.parameters.stim_4_id == 1) { 
  this.parameters.stim_4 = this.state.stimulus_1;
} else if (this.parameters.stim_4_id == 2) {
  this.parameters.stim_4 = this.state.stimulus_2;
} else if (this.parameters.stim_4_id == 3) {
  this.parameters.stim_4 = this.state.stimulus_3;
} else if (this.parameters.stim_4_id == 4) {
  this.parameters.stim_4 = this.state.stimulus_4;
};;

if (this.parameters.stim_5_id == 1) { 
  this.parameters.stim_5 = this.state.stimulus_1;
} else if (this.parameters.stim_5_id == 2) {
  this.parameters.stim_5 = this.state.stimulus_2;
} else if (this.parameters.stim_5_id == 3) { 
  this.parameters.stim_5 = this.state.stimulus_3;
} else if (this.parameters.stim_5_id == 4) {
  this.parameters.stim_5 = this.state.stimulus_4;
};

if (this.parameters.stim_6_id == 1) { 
  this.parameters.stim_6 = this.state.stimulus_1;
} else if (this.parameters.stim_6_id == 2) {
  this.parameters.stim_6 = this.state.stimulus_2;
} else if (this.parameters.stim_6_id == 3) { 
  this.parameters.stim_6 = this.state.stimulus_3;
} else if (this.parameters.stim_6_id == 4) {
  this.parameters.stim_6 = this.state.stimulus_4;
}

if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
} 
if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
} 

};
},
                          "after:end": function anonymous(
) {
if (this.state.stage <= 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)


// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};
if (this.state.phase == "Testing" & this.state.correct == true) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" & this.state.correct == false) {
  this.state.current_tally = 0;
};

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}

};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;


}
                        },
                        "title": "standard_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4} \u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_5} ${this.parameters.relation_3} ${this.parameters.stim_6} \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"separator\"\u003E\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003E 103}"
                      },
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage > 103) {

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.stim_3 = this.state.stimulus_3
this.parameters.stim_4 = this.state.stimulus_4
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2
this.parameters.q_stim_3 = this.state.stimulus_3
this.parameters.q_stim_4 = this.state.stimulus_4

if (this.parameters.meta_stim_1_id == 1) { 
  this.parameters.meta_stim_1 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_1_id == 2) {
  this.parameters.meta_stim_1 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_1_id == 3) {
  this.parameters.meta_stim_1 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_1_id == 4) {
  this.parameters.meta_stim_1 = this.state.stimulus_4;
};

if (this.parameters.meta_stim_2_id == 1) { 
  this.parameters.meta_stim_2 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_2_id == 2) {
  this.parameters.meta_stim_2 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_2_id == 3) {
  this.parameters.meta_stim_2 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_2_id == 4) {
  this.parameters.meta_stim_2 = this.state.stimulus_4;
};


if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
};

if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
};


};
},
                          "after:end": function anonymous(
) {
if (this.state.stage > 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)

// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};

if (this.state.phase == "Testing" && this.state.correct == 1) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" && this.state.correct == 0) {
  this.state.current_tally = 0
}

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}
};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;

}
                        },
                        "title": "mathematical_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_relation_1}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_stim_1} ${this.parameters.meta_relation_2} ${this.parameters.meta_stim_2}\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003C 103}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 167.11,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#a8ca09",
                            "text": "CORRECT!",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally += 1
}
                        },
                        "title": "correct",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${this.state.correct == 0 || this.state.trial_time \u003E= 30000 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 126.2,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#d6341a",
                            "text": "WRONG",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally = 0
}
                        },
                        "title": "wrong",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${(this.state.correct != 0 & this.state.trial_time \u003C 30000) || this.state.correct == 1 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      }
                    ]
                  }
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "Training part completed!",
                      "content": "You got 16 correct answers in a row in the training part of this level!\u003Cbr\u003E\u003Cbr\u003EYou will now move on to the testing part. Get all 16 testing questions correct, and you move on to the next level.\u003Cbr\u003EBut be careful: if you get even one wrong, you have to start the training part all over again!\u003Cbr\u003E\u003Cbr\u003EWhen you're ready, click 'continue' to start the testing part of this level. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.phase = "Testing";
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "Trial 1 of 16";
this.state.current_tally = 0;
}
                  },
                  "title": "phase_transition",
                  "tardy": true,
                  "skip": "${this.state.current_tally != 16 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "",
                      "content": "You didn’t manage to get all of the questions right in that round. You’ll go back to the training part of this level. Don’t worry - practice makes perfect! Keep trying and you will get there. When you’re ready, click on “continue” to keep going. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.testing_trial_number = 1;
this.state.phase = "Training";
this.state.current_tally = 0;
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "";

}
                  },
                  "title": "return_to_training",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.testing_trial_number \u003C 17 || (this.state.testing_trial_number == 17 & this.state.current_tally \u003E 15) || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.flow.Sequence",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
document.getElementById("level-display").innerHTML = "";
document.getElementById("trial-display").innerHTML = "";

this.state.stage = ~~this.state.stage + 1;
}
                  },
                  "title": "level_transition",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.current_tally \u003C 16 || this.state.skip_chunk == 1}",
                  "content": [
                    {
                      "type": "lab.html.Screen",
                      "files": {},
                      "responses": {
                        "mousedown button#continue": "continue"
                      },
                      "parameters": {},
                      "messageHandlers": {
                        "run": function anonymous(
) {
this.state.skip_chunk = 1
}
                      },
                      "title": "next_stage",
                      "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n\n      \u003Cdiv\u003E\n      \u003Cp\u003E You just unlocked a new stage - great job!\u003Cbr\u003E\u003Cbr\u003EFeel free to take a few seconds as a break, and when you're ready,\u003Cbr\u003Eclick \"Continue\" to move on to the next level. Good luck to you both!\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\n      \u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\n      \u003Cbutton id=\"continue\"\u003EContinue\u003C\u002Fbutton\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
                      "tardy": true,
                      "skip": "${this.state.skip_chunk == 1}"
                    }
                  ]
                }
              ]
            }
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
this.state.skip_chunk = 0
this.state.phase = "Training"
this.state.testing_trial_number = 1
this.state.current_tally = 0
this.state.stage = (Number(this.state.stage) + 1).toString()
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
}
            },
            "title": "skip_chunk_reset",
            "skip": "${this.state.skip_chunk == 0}",
            "tardy": true,
            "timeout": "1000"
          },
          {
            "type": "lab.flow.Loop",
            "templateParameters": [],
            "sample": {
              "mode": "draw-shuffle",
              "n": "200"
            },
            "files": {
              "stage_5.csv": "embedded\u002Fbf5cd0b1a80923bdb06069b9f2500967ae66845e2586046e12de7681017f8e82.csv",
              "stage_118.csv": "embedded\u002Fb63062f65b4cd3ae94899aa25daf1ae670f0b4af11ddc7e455828b8cd151e5c7.csv",
              "stage_10.csv": "embedded\u002F687d3f4e9a518dff10b23ec3a9a3246e56ef9293e267668a20916a3b0c41f7ba.csv",
              "stage_11.csv": "embedded\u002F5711cf764bd9767fb4af2018d440a7c1c908002d8eba71a4da850298fa10011a.csv"
            },
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "before:prepare": async function anonymous(
) {
this.state.url_text = "https://www.drjamiecummins.com/school-rct/st-pauls/trials/stage_";
this.state.file_type = ".csv";


this.state.url = this.state.url_text.concat(this.state.stage, this.state.file_type)

var csv2json = await new Promise((resolve, reject) => {
  Papa.parse(this.state.url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(result) {
      resolve(result.data);
    }
  })
})
console.log(csv2json)
this.options.templateParameters = csv2json




this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2

this.state.current_tally = 0
this.state.testing_trial_number = 1
this.state.phase = "Training"


}
            },
            "title": "trial_chunk",
            "tardy": true,
            "skip": "${this.state.skip_chunk == 1}",
            "shuffleGroups": [],
            "template": {
              "type": "lab.flow.Sequence",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "trials-and-breaks",
              "tardy": true,
              "skip": "${this.state.skip_chunk == 1}",
              "content": [
                {
                  "type": "lab.html.Frame",
                  "contextSelector": "[data-labjs-section=\"frame\"]",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
if (this.state.first_trial == 1) {
document.getElementById("pokemon-motivation").innerHTML = "Let's get started - you've got this!";
};


if (this.state.phase == "Training") {
  document.getElementById("trial-display").innerHTML = this.state.current_tally + " of 16 correct";
} else if (this.state.phase == "Testing") {
  document.getElementById("trial-display").innerHTML = "Trial " + this.state.testing_trial_number + " of 16";
}

var pieChart = document.getElementById('timer-circle');
pieChart.width = pieChart.height = 100;

var counter = document.createElement("p");


var ctx = pieChart.getContext('2d');
var secondsPassed = 0;

interval = setInterval(function() {
  ctx.clearRect(0, 0, pieChart.width, pieChart.height);
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, 0, Math.PI*2);
  ctx.fillStyle = '#03879E';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, -Math.PI/2, (-Math.PI/2) + Math.PI*2*secondsPassed/30);
  ctx.fillStyle = '#00ADEF';
  ctx.fill();
  ctx.font = "30px Verdana";
  ctx.fillStyle = "white";
  secondsPassed++;
}, 1000);


time_left = 30;
trialTimer = setInterval(function(){
  if(time_left <= 9){
    ctx.fillText(Math.trunc(time_left), 40, 60);
  } else {
    ctx.fillText(Math.trunc(time_left), 31, 60);
  }
  time_left -= 1;
}, 1000);

// motivational speech items
motivations = ['The more we practice, the better we get!',
              'The bigger the challenge, the bigger the victory!',
              'The best way to learn is to make mistakes!',
              'I know that you can do this!',
              'This can sometimes be tough - but you can do it!',
              'Hard work will always pay off!',
              'Stay focused - you can do this!',
              'Just 30 minutes of practice - easy peasy!',
              'You’re doing great - I’m proud of you!',
              'Even if you get stuck, just keep trying - you’ll get it!',
              'My favourite feeling is making progress after getting stuck for a while!',
              'Practice makes perfect!',
              'Every question you answer helps, even if you get it wrong!',
              'Practice can sometimes be boring - but it always pays off!',
              'Over 1000 people have already used this training...that is a lot!',
              'The 30 second countdown keeps you on your toes!',
              'The training can be frustrating, but it can be fun too!',
              'Try to treat the training like a puzzle that you can solve!',
              'Focus on getting the answers right - do not worry if you are slow!',
              'You will get faster and faster with more practice!',
              'If you are finding it easy, try to go faster!',
              'The training is designed to make you smarter - so do not worry if you do not feel smart at the start!',
              'Remember, getting answers wrong is how you learn!',
              'Try answer the questions in your head - do not write anything down!',
              'Training many times over a few weeks makes the training even more powerful!',
              'It is better to be right than to be fast - speed comes with practice!',
              'Try to push yourself a little bit more in every new session!',
              'Shortcuts will not make you smarter - solving the problems with hard work will!',
              'Easy, medium, hard, it does not matter - every question you answer helps you!',
              'Getting better can take time - be patient and never give up!',
              'How do you catch a squirrel?<br>Climb up a tree and act like a nut!',
              'I believe in you!',
              'You can do it - keep pushing!',
              'Be proud of yourself for working hard!',
              'Sometimes you will pass many levels, other times you will not - but it is all practice!',
              'Practice is always valuable!']
},
                    "after:end": function anonymous(
) {
clearInterval(interval)
clearInterval(trialTimer)

this.state.first_trial = 0;
}
                  },
                  "title": "whole-trial-frame",
                  "tardy": true,
                  "skip": "${this.state.skip_chunk == 1}",
                  "content": {
                    "type": "lab.flow.Sequence",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "trial_sequence",
                    "tardy": true,
                    "skip": "${this.state.skip_chunk == 1}",
                    "content": [
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage <= 103) {


if (this.parameters.stage <= 55) {
  this.parameters.q_word = "Is";
} else if (this.parameters.stage <= 81 && this.parameters.stage >= 56) {
  this.parameters.q_word = "Does";
};
  
this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2


if (this.parameters.stim_3_id == 1) { 
  this.parameters.stim_3 = this.state.stimulus_1;
} else if (this.parameters.stim_3_id == 2) { 
  this.parameters.stim_3 = this.state.stimulus_2;
} else if (this.parameters.stim_3_id == 3) {
  this.parameters.stim_3 = this.state.stimulus_3;
} else if (this.parameters.stim_3_id == 4) {
  this.parameters.stim_3 = this.state.stimulus_4;
};

if (this.parameters.stim_4_id == 1) { 
  this.parameters.stim_4 = this.state.stimulus_1;
} else if (this.parameters.stim_4_id == 2) {
  this.parameters.stim_4 = this.state.stimulus_2;
} else if (this.parameters.stim_4_id == 3) {
  this.parameters.stim_4 = this.state.stimulus_3;
} else if (this.parameters.stim_4_id == 4) {
  this.parameters.stim_4 = this.state.stimulus_4;
};;

if (this.parameters.stim_5_id == 1) { 
  this.parameters.stim_5 = this.state.stimulus_1;
} else if (this.parameters.stim_5_id == 2) {
  this.parameters.stim_5 = this.state.stimulus_2;
} else if (this.parameters.stim_5_id == 3) { 
  this.parameters.stim_5 = this.state.stimulus_3;
} else if (this.parameters.stim_5_id == 4) {
  this.parameters.stim_5 = this.state.stimulus_4;
};

if (this.parameters.stim_6_id == 1) { 
  this.parameters.stim_6 = this.state.stimulus_1;
} else if (this.parameters.stim_6_id == 2) {
  this.parameters.stim_6 = this.state.stimulus_2;
} else if (this.parameters.stim_6_id == 3) { 
  this.parameters.stim_6 = this.state.stimulus_3;
} else if (this.parameters.stim_6_id == 4) {
  this.parameters.stim_6 = this.state.stimulus_4;
}

if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
} 
if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
} 

};
},
                          "after:end": function anonymous(
) {
if (this.state.stage <= 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)


// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};
if (this.state.phase == "Testing" & this.state.correct == true) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" & this.state.correct == false) {
  this.state.current_tally = 0;
};

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}

};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;


}
                        },
                        "title": "standard_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4} \u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_5} ${this.parameters.relation_3} ${this.parameters.stim_6} \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"separator\"\u003E\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003E 103}"
                      },
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage > 103) {

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.stim_3 = this.state.stimulus_3
this.parameters.stim_4 = this.state.stimulus_4
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2
this.parameters.q_stim_3 = this.state.stimulus_3
this.parameters.q_stim_4 = this.state.stimulus_4

if (this.parameters.meta_stim_1_id == 1) { 
  this.parameters.meta_stim_1 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_1_id == 2) {
  this.parameters.meta_stim_1 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_1_id == 3) {
  this.parameters.meta_stim_1 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_1_id == 4) {
  this.parameters.meta_stim_1 = this.state.stimulus_4;
};

if (this.parameters.meta_stim_2_id == 1) { 
  this.parameters.meta_stim_2 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_2_id == 2) {
  this.parameters.meta_stim_2 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_2_id == 3) {
  this.parameters.meta_stim_2 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_2_id == 4) {
  this.parameters.meta_stim_2 = this.state.stimulus_4;
};


if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
};

if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
};


};
},
                          "after:end": function anonymous(
) {
if (this.state.stage > 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)

// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};

if (this.state.phase == "Testing" && this.state.correct == 1) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" && this.state.correct == 0) {
  this.state.current_tally = 0
}

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}
};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;

}
                        },
                        "title": "mathematical_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_relation_1}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_stim_1} ${this.parameters.meta_relation_2} ${this.parameters.meta_stim_2}\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003C 103}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 167.11,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#a8ca09",
                            "text": "CORRECT!",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally += 1
}
                        },
                        "title": "correct",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${this.state.correct == 0 || this.state.trial_time \u003E= 30000 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 126.2,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#d6341a",
                            "text": "WRONG",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally = 0
}
                        },
                        "title": "wrong",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${(this.state.correct != 0 & this.state.trial_time \u003C 30000) || this.state.correct == 1 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      }
                    ]
                  }
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "Training part completed!",
                      "content": "You got 16 correct answers in a row in the training part of this level!\u003Cbr\u003E\u003Cbr\u003EYou will now move on to the testing part. Get all 16 testing questions correct, and you move on to the next level.\u003Cbr\u003EBut be careful: if you get even one wrong, you have to start the training part all over again!\u003Cbr\u003E\u003Cbr\u003EWhen you're ready, click 'continue' to start the testing part of this level. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.phase = "Testing";
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "Trial 1 of 16";
this.state.current_tally = 0;
}
                  },
                  "title": "phase_transition",
                  "tardy": true,
                  "skip": "${this.state.current_tally != 16 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "",
                      "content": "You didn’t manage to get all of the questions right in that round. You’ll go back to the training part of this level. Don’t worry - practice makes perfect! Keep trying and you will get there. When you’re ready, click on “continue” to keep going. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.testing_trial_number = 1;
this.state.phase = "Training";
this.state.current_tally = 0;
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "";

}
                  },
                  "title": "return_to_training",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.testing_trial_number \u003C 17 || (this.state.testing_trial_number == 17 & this.state.current_tally \u003E 15) || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.flow.Sequence",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
document.getElementById("level-display").innerHTML = "";
document.getElementById("trial-display").innerHTML = "";

this.state.stage = ~~this.state.stage + 1;
}
                  },
                  "title": "level_transition",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.current_tally \u003C 16 || this.state.skip_chunk == 1}",
                  "content": [
                    {
                      "type": "lab.html.Screen",
                      "files": {},
                      "responses": {
                        "mousedown button#continue": "continue"
                      },
                      "parameters": {},
                      "messageHandlers": {
                        "run": function anonymous(
) {
this.state.skip_chunk = 1
}
                      },
                      "title": "next_stage",
                      "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n\n      \u003Cdiv\u003E\n      \u003Cp\u003E You just unlocked a new stage - great job!\u003Cbr\u003E\u003Cbr\u003EFeel free to take a few seconds as a break, and when you're ready,\u003Cbr\u003Eclick \"Continue\" to move on to the next level. Good luck to you both!\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\n      \u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\n      \u003Cbutton id=\"continue\"\u003EContinue\u003C\u002Fbutton\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
                      "tardy": true,
                      "skip": "${this.state.skip_chunk == 1}"
                    }
                  ]
                }
              ]
            }
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
this.state.skip_chunk = 0
this.state.phase = "Training"
this.state.testing_trial_number = 1
this.state.current_tally = 0
this.state.stage = (Number(this.state.stage) + 1).toString()
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
}
            },
            "title": "skip_chunk_reset",
            "skip": "${this.state.skip_chunk == 0}",
            "tardy": true,
            "timeout": "1000"
          },
          {
            "type": "lab.flow.Loop",
            "templateParameters": [],
            "sample": {
              "mode": "draw-shuffle",
              "n": "200"
            },
            "files": {
              "stage_5.csv": "embedded\u002Fbf5cd0b1a80923bdb06069b9f2500967ae66845e2586046e12de7681017f8e82.csv",
              "stage_118.csv": "embedded\u002Fb63062f65b4cd3ae94899aa25daf1ae670f0b4af11ddc7e455828b8cd151e5c7.csv",
              "stage_10.csv": "embedded\u002F687d3f4e9a518dff10b23ec3a9a3246e56ef9293e267668a20916a3b0c41f7ba.csv",
              "stage_11.csv": "embedded\u002F5711cf764bd9767fb4af2018d440a7c1c908002d8eba71a4da850298fa10011a.csv"
            },
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "before:prepare": async function anonymous(
) {
this.state.url_text = "https://www.drjamiecummins.com/school-rct/st-pauls/trials/stage_";
this.state.file_type = ".csv";


this.state.url = this.state.url_text.concat(this.state.stage, this.state.file_type)

var csv2json = await new Promise((resolve, reject) => {
  Papa.parse(this.state.url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(result) {
      resolve(result.data);
    }
  })
})
console.log(csv2json)
this.options.templateParameters = csv2json




this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2

this.state.current_tally = 0
this.state.testing_trial_number = 1
this.state.phase = "Training"


}
            },
            "title": "trial_chunk",
            "tardy": true,
            "skip": "${this.state.skip_chunk == 1}",
            "shuffleGroups": [],
            "template": {
              "type": "lab.flow.Sequence",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "trials-and-breaks",
              "tardy": true,
              "skip": "${this.state.skip_chunk == 1}",
              "content": [
                {
                  "type": "lab.html.Frame",
                  "contextSelector": "[data-labjs-section=\"frame\"]",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
if (this.state.first_trial == 1) {
document.getElementById("pokemon-motivation").innerHTML = "Let's get started - you've got this!";
};


if (this.state.phase == "Training") {
  document.getElementById("trial-display").innerHTML = this.state.current_tally + " of 16 correct";
} else if (this.state.phase == "Testing") {
  document.getElementById("trial-display").innerHTML = "Trial " + this.state.testing_trial_number + " of 16";
}

var pieChart = document.getElementById('timer-circle');
pieChart.width = pieChart.height = 100;

var counter = document.createElement("p");


var ctx = pieChart.getContext('2d');
var secondsPassed = 0;

interval = setInterval(function() {
  ctx.clearRect(0, 0, pieChart.width, pieChart.height);
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, 0, Math.PI*2);
  ctx.fillStyle = '#03879E';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, -Math.PI/2, (-Math.PI/2) + Math.PI*2*secondsPassed/30);
  ctx.fillStyle = '#00ADEF';
  ctx.fill();
  ctx.font = "30px Verdana";
  ctx.fillStyle = "white";
  secondsPassed++;
}, 1000);


time_left = 30;
trialTimer = setInterval(function(){
  if(time_left <= 9){
    ctx.fillText(Math.trunc(time_left), 40, 60);
  } else {
    ctx.fillText(Math.trunc(time_left), 31, 60);
  }
  time_left -= 1;
}, 1000);

// motivational speech items
motivations = ['The more we practice, the better we get!',
              'The bigger the challenge, the bigger the victory!',
              'The best way to learn is to make mistakes!',
              'I know that you can do this!',
              'This can sometimes be tough - but you can do it!',
              'Hard work will always pay off!',
              'Stay focused - you can do this!',
              'Just 30 minutes of practice - easy peasy!',
              'You’re doing great - I’m proud of you!',
              'Even if you get stuck, just keep trying - you’ll get it!',
              'My favourite feeling is making progress after getting stuck for a while!',
              'Practice makes perfect!',
              'Every question you answer helps, even if you get it wrong!',
              'Practice can sometimes be boring - but it always pays off!',
              'Over 1000 people have already used this training...that is a lot!',
              'The 30 second countdown keeps you on your toes!',
              'The training can be frustrating, but it can be fun too!',
              'Try to treat the training like a puzzle that you can solve!',
              'Focus on getting the answers right - do not worry if you are slow!',
              'You will get faster and faster with more practice!',
              'If you are finding it easy, try to go faster!',
              'The training is designed to make you smarter - so do not worry if you do not feel smart at the start!',
              'Remember, getting answers wrong is how you learn!',
              'Try answer the questions in your head - do not write anything down!',
              'Training many times over a few weeks makes the training even more powerful!',
              'It is better to be right than to be fast - speed comes with practice!',
              'Try to push yourself a little bit more in every new session!',
              'Shortcuts will not make you smarter - solving the problems with hard work will!',
              'Easy, medium, hard, it does not matter - every question you answer helps you!',
              'Getting better can take time - be patient and never give up!',
              'How do you catch a squirrel?<br>Climb up a tree and act like a nut!',
              'I believe in you!',
              'You can do it - keep pushing!',
              'Be proud of yourself for working hard!',
              'Sometimes you will pass many levels, other times you will not - but it is all practice!',
              'Practice is always valuable!']
},
                    "after:end": function anonymous(
) {
clearInterval(interval)
clearInterval(trialTimer)

this.state.first_trial = 0;
}
                  },
                  "title": "whole-trial-frame",
                  "tardy": true,
                  "skip": "${this.state.skip_chunk == 1}",
                  "content": {
                    "type": "lab.flow.Sequence",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "trial_sequence",
                    "tardy": true,
                    "skip": "${this.state.skip_chunk == 1}",
                    "content": [
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage <= 103) {


if (this.parameters.stage <= 55) {
  this.parameters.q_word = "Is";
} else if (this.parameters.stage <= 81 && this.parameters.stage >= 56) {
  this.parameters.q_word = "Does";
};
  
this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2


if (this.parameters.stim_3_id == 1) { 
  this.parameters.stim_3 = this.state.stimulus_1;
} else if (this.parameters.stim_3_id == 2) { 
  this.parameters.stim_3 = this.state.stimulus_2;
} else if (this.parameters.stim_3_id == 3) {
  this.parameters.stim_3 = this.state.stimulus_3;
} else if (this.parameters.stim_3_id == 4) {
  this.parameters.stim_3 = this.state.stimulus_4;
};

if (this.parameters.stim_4_id == 1) { 
  this.parameters.stim_4 = this.state.stimulus_1;
} else if (this.parameters.stim_4_id == 2) {
  this.parameters.stim_4 = this.state.stimulus_2;
} else if (this.parameters.stim_4_id == 3) {
  this.parameters.stim_4 = this.state.stimulus_3;
} else if (this.parameters.stim_4_id == 4) {
  this.parameters.stim_4 = this.state.stimulus_4;
};;

if (this.parameters.stim_5_id == 1) { 
  this.parameters.stim_5 = this.state.stimulus_1;
} else if (this.parameters.stim_5_id == 2) {
  this.parameters.stim_5 = this.state.stimulus_2;
} else if (this.parameters.stim_5_id == 3) { 
  this.parameters.stim_5 = this.state.stimulus_3;
} else if (this.parameters.stim_5_id == 4) {
  this.parameters.stim_5 = this.state.stimulus_4;
};

if (this.parameters.stim_6_id == 1) { 
  this.parameters.stim_6 = this.state.stimulus_1;
} else if (this.parameters.stim_6_id == 2) {
  this.parameters.stim_6 = this.state.stimulus_2;
} else if (this.parameters.stim_6_id == 3) { 
  this.parameters.stim_6 = this.state.stimulus_3;
} else if (this.parameters.stim_6_id == 4) {
  this.parameters.stim_6 = this.state.stimulus_4;
}

if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
} 
if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
} 

};
},
                          "after:end": function anonymous(
) {
if (this.state.stage <= 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)


// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};
if (this.state.phase == "Testing" & this.state.correct == true) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" & this.state.correct == false) {
  this.state.current_tally = 0;
};

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}

};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;


}
                        },
                        "title": "standard_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4} \u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_5} ${this.parameters.relation_3} ${this.parameters.stim_6} \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"separator\"\u003E\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003E 103}"
                      },
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage > 103) {

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.stim_3 = this.state.stimulus_3
this.parameters.stim_4 = this.state.stimulus_4
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2
this.parameters.q_stim_3 = this.state.stimulus_3
this.parameters.q_stim_4 = this.state.stimulus_4

if (this.parameters.meta_stim_1_id == 1) { 
  this.parameters.meta_stim_1 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_1_id == 2) {
  this.parameters.meta_stim_1 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_1_id == 3) {
  this.parameters.meta_stim_1 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_1_id == 4) {
  this.parameters.meta_stim_1 = this.state.stimulus_4;
};

if (this.parameters.meta_stim_2_id == 1) { 
  this.parameters.meta_stim_2 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_2_id == 2) {
  this.parameters.meta_stim_2 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_2_id == 3) {
  this.parameters.meta_stim_2 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_2_id == 4) {
  this.parameters.meta_stim_2 = this.state.stimulus_4;
};


if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
};

if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
};


};
},
                          "after:end": function anonymous(
) {
if (this.state.stage > 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)

// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};

if (this.state.phase == "Testing" && this.state.correct == 1) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" && this.state.correct == 0) {
  this.state.current_tally = 0
}

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}
};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;

}
                        },
                        "title": "mathematical_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_relation_1}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_stim_1} ${this.parameters.meta_relation_2} ${this.parameters.meta_stim_2}\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003C 103}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 167.11,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#a8ca09",
                            "text": "CORRECT!",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally += 1
}
                        },
                        "title": "correct",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${this.state.correct == 0 || this.state.trial_time \u003E= 30000 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 126.2,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#d6341a",
                            "text": "WRONG",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally = 0
}
                        },
                        "title": "wrong",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${(this.state.correct != 0 & this.state.trial_time \u003C 30000) || this.state.correct == 1 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      }
                    ]
                  }
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "Training part completed!",
                      "content": "You got 16 correct answers in a row in the training part of this level!\u003Cbr\u003E\u003Cbr\u003EYou will now move on to the testing part. Get all 16 testing questions correct, and you move on to the next level.\u003Cbr\u003EBut be careful: if you get even one wrong, you have to start the training part all over again!\u003Cbr\u003E\u003Cbr\u003EWhen you're ready, click 'continue' to start the testing part of this level. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.phase = "Testing";
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "Trial 1 of 16";
this.state.current_tally = 0;
}
                  },
                  "title": "phase_transition",
                  "tardy": true,
                  "skip": "${this.state.current_tally != 16 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "",
                      "content": "You didn’t manage to get all of the questions right in that round. You’ll go back to the training part of this level. Don’t worry - practice makes perfect! Keep trying and you will get there. When you’re ready, click on “continue” to keep going. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.testing_trial_number = 1;
this.state.phase = "Training";
this.state.current_tally = 0;
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "";

}
                  },
                  "title": "return_to_training",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.testing_trial_number \u003C 17 || (this.state.testing_trial_number == 17 & this.state.current_tally \u003E 15) || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.flow.Sequence",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
document.getElementById("level-display").innerHTML = "";
document.getElementById("trial-display").innerHTML = "";

this.state.stage = ~~this.state.stage + 1;
}
                  },
                  "title": "level_transition",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.current_tally \u003C 16 || this.state.skip_chunk == 1}",
                  "content": [
                    {
                      "type": "lab.html.Screen",
                      "files": {},
                      "responses": {
                        "mousedown button#continue": "continue"
                      },
                      "parameters": {},
                      "messageHandlers": {
                        "run": function anonymous(
) {
this.state.skip_chunk = 1
}
                      },
                      "title": "next_stage",
                      "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n\n      \u003Cdiv\u003E\n      \u003Cp\u003E You just unlocked a new stage - great job!\u003Cbr\u003E\u003Cbr\u003EFeel free to take a few seconds as a break, and when you're ready,\u003Cbr\u003Eclick \"Continue\" to move on to the next level. Good luck to you both!\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\n      \u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\n      \u003Cbutton id=\"continue\"\u003EContinue\u003C\u002Fbutton\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
                      "tardy": true,
                      "skip": "${this.state.skip_chunk == 1}"
                    }
                  ]
                }
              ]
            }
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
this.state.skip_chunk = 0
this.state.phase = "Training"
this.state.testing_trial_number = 1
this.state.current_tally = 0
this.state.stage = (Number(this.state.stage) + 1).toString()
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
}
            },
            "title": "skip_chunk_reset",
            "skip": "${this.state.skip_chunk == 0}",
            "tardy": true,
            "timeout": "1000"
          },
          {
            "type": "lab.flow.Loop",
            "templateParameters": [],
            "sample": {
              "mode": "draw-shuffle",
              "n": "200"
            },
            "files": {
              "stage_5.csv": "embedded\u002Fbf5cd0b1a80923bdb06069b9f2500967ae66845e2586046e12de7681017f8e82.csv",
              "stage_118.csv": "embedded\u002Fb63062f65b4cd3ae94899aa25daf1ae670f0b4af11ddc7e455828b8cd151e5c7.csv",
              "stage_10.csv": "embedded\u002F687d3f4e9a518dff10b23ec3a9a3246e56ef9293e267668a20916a3b0c41f7ba.csv",
              "stage_11.csv": "embedded\u002F5711cf764bd9767fb4af2018d440a7c1c908002d8eba71a4da850298fa10011a.csv"
            },
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "before:prepare": async function anonymous(
) {
this.state.url_text = "https://www.drjamiecummins.com/school-rct/st-pauls/trials/stage_";
this.state.file_type = ".csv";


this.state.url = this.state.url_text.concat(this.state.stage, this.state.file_type)

var csv2json = await new Promise((resolve, reject) => {
  Papa.parse(this.state.url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(result) {
      resolve(result.data);
    }
  })
})
console.log(csv2json)
this.options.templateParameters = csv2json




this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2

this.state.current_tally = 0
this.state.testing_trial_number = 1
this.state.phase = "Training"


}
            },
            "title": "trial_chunk",
            "tardy": true,
            "skip": "${this.state.skip_chunk == 1}",
            "shuffleGroups": [],
            "template": {
              "type": "lab.flow.Sequence",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "trials-and-breaks",
              "tardy": true,
              "skip": "${this.state.skip_chunk == 1}",
              "content": [
                {
                  "type": "lab.html.Frame",
                  "contextSelector": "[data-labjs-section=\"frame\"]",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
if (this.state.first_trial == 1) {
document.getElementById("pokemon-motivation").innerHTML = "Let's get started - you've got this!";
};


if (this.state.phase == "Training") {
  document.getElementById("trial-display").innerHTML = this.state.current_tally + " of 16 correct";
} else if (this.state.phase == "Testing") {
  document.getElementById("trial-display").innerHTML = "Trial " + this.state.testing_trial_number + " of 16";
}

var pieChart = document.getElementById('timer-circle');
pieChart.width = pieChart.height = 100;

var counter = document.createElement("p");


var ctx = pieChart.getContext('2d');
var secondsPassed = 0;

interval = setInterval(function() {
  ctx.clearRect(0, 0, pieChart.width, pieChart.height);
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, 0, Math.PI*2);
  ctx.fillStyle = '#03879E';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, -Math.PI/2, (-Math.PI/2) + Math.PI*2*secondsPassed/30);
  ctx.fillStyle = '#00ADEF';
  ctx.fill();
  ctx.font = "30px Verdana";
  ctx.fillStyle = "white";
  secondsPassed++;
}, 1000);


time_left = 30;
trialTimer = setInterval(function(){
  if(time_left <= 9){
    ctx.fillText(Math.trunc(time_left), 40, 60);
  } else {
    ctx.fillText(Math.trunc(time_left), 31, 60);
  }
  time_left -= 1;
}, 1000);

// motivational speech items
motivations = ['The more we practice, the better we get!',
              'The bigger the challenge, the bigger the victory!',
              'The best way to learn is to make mistakes!',
              'I know that you can do this!',
              'This can sometimes be tough - but you can do it!',
              'Hard work will always pay off!',
              'Stay focused - you can do this!',
              'Just 30 minutes of practice - easy peasy!',
              'You’re doing great - I’m proud of you!',
              'Even if you get stuck, just keep trying - you’ll get it!',
              'My favourite feeling is making progress after getting stuck for a while!',
              'Practice makes perfect!',
              'Every question you answer helps, even if you get it wrong!',
              'Practice can sometimes be boring - but it always pays off!',
              'Over 1000 people have already used this training...that is a lot!',
              'The 30 second countdown keeps you on your toes!',
              'The training can be frustrating, but it can be fun too!',
              'Try to treat the training like a puzzle that you can solve!',
              'Focus on getting the answers right - do not worry if you are slow!',
              'You will get faster and faster with more practice!',
              'If you are finding it easy, try to go faster!',
              'The training is designed to make you smarter - so do not worry if you do not feel smart at the start!',
              'Remember, getting answers wrong is how you learn!',
              'Try answer the questions in your head - do not write anything down!',
              'Training many times over a few weeks makes the training even more powerful!',
              'It is better to be right than to be fast - speed comes with practice!',
              'Try to push yourself a little bit more in every new session!',
              'Shortcuts will not make you smarter - solving the problems with hard work will!',
              'Easy, medium, hard, it does not matter - every question you answer helps you!',
              'Getting better can take time - be patient and never give up!',
              'How do you catch a squirrel?<br>Climb up a tree and act like a nut!',
              'I believe in you!',
              'You can do it - keep pushing!',
              'Be proud of yourself for working hard!',
              'Sometimes you will pass many levels, other times you will not - but it is all practice!',
              'Practice is always valuable!']
},
                    "after:end": function anonymous(
) {
clearInterval(interval)
clearInterval(trialTimer)

this.state.first_trial = 0;
}
                  },
                  "title": "whole-trial-frame",
                  "tardy": true,
                  "skip": "${this.state.skip_chunk == 1}",
                  "content": {
                    "type": "lab.flow.Sequence",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "trial_sequence",
                    "tardy": true,
                    "skip": "${this.state.skip_chunk == 1}",
                    "content": [
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage <= 103) {


if (this.parameters.stage <= 55) {
  this.parameters.q_word = "Is";
} else if (this.parameters.stage <= 81 && this.parameters.stage >= 56) {
  this.parameters.q_word = "Does";
};
  
this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2


if (this.parameters.stim_3_id == 1) { 
  this.parameters.stim_3 = this.state.stimulus_1;
} else if (this.parameters.stim_3_id == 2) { 
  this.parameters.stim_3 = this.state.stimulus_2;
} else if (this.parameters.stim_3_id == 3) {
  this.parameters.stim_3 = this.state.stimulus_3;
} else if (this.parameters.stim_3_id == 4) {
  this.parameters.stim_3 = this.state.stimulus_4;
};

if (this.parameters.stim_4_id == 1) { 
  this.parameters.stim_4 = this.state.stimulus_1;
} else if (this.parameters.stim_4_id == 2) {
  this.parameters.stim_4 = this.state.stimulus_2;
} else if (this.parameters.stim_4_id == 3) {
  this.parameters.stim_4 = this.state.stimulus_3;
} else if (this.parameters.stim_4_id == 4) {
  this.parameters.stim_4 = this.state.stimulus_4;
};;

if (this.parameters.stim_5_id == 1) { 
  this.parameters.stim_5 = this.state.stimulus_1;
} else if (this.parameters.stim_5_id == 2) {
  this.parameters.stim_5 = this.state.stimulus_2;
} else if (this.parameters.stim_5_id == 3) { 
  this.parameters.stim_5 = this.state.stimulus_3;
} else if (this.parameters.stim_5_id == 4) {
  this.parameters.stim_5 = this.state.stimulus_4;
};

if (this.parameters.stim_6_id == 1) { 
  this.parameters.stim_6 = this.state.stimulus_1;
} else if (this.parameters.stim_6_id == 2) {
  this.parameters.stim_6 = this.state.stimulus_2;
} else if (this.parameters.stim_6_id == 3) { 
  this.parameters.stim_6 = this.state.stimulus_3;
} else if (this.parameters.stim_6_id == 4) {
  this.parameters.stim_6 = this.state.stimulus_4;
}

if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
} 
if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
} 

};
},
                          "after:end": function anonymous(
) {
if (this.state.stage <= 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)


// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};
if (this.state.phase == "Testing" & this.state.correct == true) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" & this.state.correct == false) {
  this.state.current_tally = 0;
};

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}

};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;


}
                        },
                        "title": "standard_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4} \u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_5} ${this.parameters.relation_3} ${this.parameters.stim_6} \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"separator\"\u003E\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003E 103}"
                      },
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage > 103) {

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.stim_3 = this.state.stimulus_3
this.parameters.stim_4 = this.state.stimulus_4
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2
this.parameters.q_stim_3 = this.state.stimulus_3
this.parameters.q_stim_4 = this.state.stimulus_4

if (this.parameters.meta_stim_1_id == 1) { 
  this.parameters.meta_stim_1 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_1_id == 2) {
  this.parameters.meta_stim_1 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_1_id == 3) {
  this.parameters.meta_stim_1 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_1_id == 4) {
  this.parameters.meta_stim_1 = this.state.stimulus_4;
};

if (this.parameters.meta_stim_2_id == 1) { 
  this.parameters.meta_stim_2 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_2_id == 2) {
  this.parameters.meta_stim_2 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_2_id == 3) {
  this.parameters.meta_stim_2 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_2_id == 4) {
  this.parameters.meta_stim_2 = this.state.stimulus_4;
};


if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
};

if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
};


};
},
                          "after:end": function anonymous(
) {
if (this.state.stage > 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)

// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};

if (this.state.phase == "Testing" && this.state.correct == 1) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" && this.state.correct == 0) {
  this.state.current_tally = 0
}

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}
};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;

}
                        },
                        "title": "mathematical_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_relation_1}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_stim_1} ${this.parameters.meta_relation_2} ${this.parameters.meta_stim_2}\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003C 103}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 167.11,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#a8ca09",
                            "text": "CORRECT!",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally += 1
}
                        },
                        "title": "correct",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${this.state.correct == 0 || this.state.trial_time \u003E= 30000 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 126.2,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#d6341a",
                            "text": "WRONG",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally = 0
}
                        },
                        "title": "wrong",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${(this.state.correct != 0 & this.state.trial_time \u003C 30000) || this.state.correct == 1 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      }
                    ]
                  }
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "Training part completed!",
                      "content": "You got 16 correct answers in a row in the training part of this level!\u003Cbr\u003E\u003Cbr\u003EYou will now move on to the testing part. Get all 16 testing questions correct, and you move on to the next level.\u003Cbr\u003EBut be careful: if you get even one wrong, you have to start the training part all over again!\u003Cbr\u003E\u003Cbr\u003EWhen you're ready, click 'continue' to start the testing part of this level. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.phase = "Testing";
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "Trial 1 of 16";
this.state.current_tally = 0;
}
                  },
                  "title": "phase_transition",
                  "tardy": true,
                  "skip": "${this.state.current_tally != 16 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "",
                      "content": "You didn’t manage to get all of the questions right in that round. You’ll go back to the training part of this level. Don’t worry - practice makes perfect! Keep trying and you will get there. When you’re ready, click on “continue” to keep going. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.testing_trial_number = 1;
this.state.phase = "Training";
this.state.current_tally = 0;
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "";

}
                  },
                  "title": "return_to_training",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.testing_trial_number \u003C 17 || (this.state.testing_trial_number == 17 & this.state.current_tally \u003E 15) || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.flow.Sequence",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
document.getElementById("level-display").innerHTML = "";
document.getElementById("trial-display").innerHTML = "";

this.state.stage = ~~this.state.stage + 1;
}
                  },
                  "title": "level_transition",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.current_tally \u003C 16 || this.state.skip_chunk == 1}",
                  "content": [
                    {
                      "type": "lab.html.Screen",
                      "files": {},
                      "responses": {
                        "mousedown button#continue": "continue"
                      },
                      "parameters": {},
                      "messageHandlers": {
                        "run": function anonymous(
) {
this.state.skip_chunk = 1
}
                      },
                      "title": "next_stage",
                      "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n\n      \u003Cdiv\u003E\n      \u003Cp\u003E You just unlocked a new stage - great job!\u003Cbr\u003E\u003Cbr\u003EFeel free to take a few seconds as a break, and when you're ready,\u003Cbr\u003Eclick \"Continue\" to move on to the next level. Good luck to you both!\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\n      \u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\n      \u003Cbutton id=\"continue\"\u003EContinue\u003C\u002Fbutton\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
                      "tardy": true,
                      "skip": "${this.state.skip_chunk == 1}"
                    }
                  ]
                }
              ]
            }
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
this.state.skip_chunk = 0
this.state.phase = "Training"
this.state.testing_trial_number = 1
this.state.current_tally = 0
this.state.stage = (Number(this.state.stage) + 1).toString()
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
}
            },
            "title": "skip_chunk_reset",
            "skip": "${this.state.skip_chunk == 0}",
            "tardy": true,
            "timeout": "1000"
          },
          {
            "type": "lab.flow.Loop",
            "templateParameters": [],
            "sample": {
              "mode": "draw-shuffle",
              "n": "200"
            },
            "files": {
              "stage_5.csv": "embedded\u002Fbf5cd0b1a80923bdb06069b9f2500967ae66845e2586046e12de7681017f8e82.csv",
              "stage_118.csv": "embedded\u002Fb63062f65b4cd3ae94899aa25daf1ae670f0b4af11ddc7e455828b8cd151e5c7.csv",
              "stage_10.csv": "embedded\u002F687d3f4e9a518dff10b23ec3a9a3246e56ef9293e267668a20916a3b0c41f7ba.csv",
              "stage_11.csv": "embedded\u002F5711cf764bd9767fb4af2018d440a7c1c908002d8eba71a4da850298fa10011a.csv"
            },
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "before:prepare": async function anonymous(
) {
this.state.url_text = "https://www.drjamiecummins.com/school-rct/st-pauls/trials/stage_";
this.state.file_type = ".csv";


this.state.url = this.state.url_text.concat(this.state.stage, this.state.file_type)

var csv2json = await new Promise((resolve, reject) => {
  Papa.parse(this.state.url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(result) {
      resolve(result.data);
    }
  })
})
console.log(csv2json)
this.options.templateParameters = csv2json




this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2

this.state.current_tally = 0
this.state.testing_trial_number = 1
this.state.phase = "Training"


}
            },
            "title": "trial_chunk",
            "tardy": true,
            "skip": "${this.state.skip_chunk == 1}",
            "shuffleGroups": [],
            "template": {
              "type": "lab.flow.Sequence",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "trials-and-breaks",
              "tardy": true,
              "skip": "${this.state.skip_chunk == 1}",
              "content": [
                {
                  "type": "lab.html.Frame",
                  "contextSelector": "[data-labjs-section=\"frame\"]",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
if (this.state.first_trial == 1) {
document.getElementById("pokemon-motivation").innerHTML = "Let's get started - you've got this!";
};


if (this.state.phase == "Training") {
  document.getElementById("trial-display").innerHTML = this.state.current_tally + " of 16 correct";
} else if (this.state.phase == "Testing") {
  document.getElementById("trial-display").innerHTML = "Trial " + this.state.testing_trial_number + " of 16";
}

var pieChart = document.getElementById('timer-circle');
pieChart.width = pieChart.height = 100;

var counter = document.createElement("p");


var ctx = pieChart.getContext('2d');
var secondsPassed = 0;

interval = setInterval(function() {
  ctx.clearRect(0, 0, pieChart.width, pieChart.height);
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, 0, Math.PI*2);
  ctx.fillStyle = '#03879E';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, -Math.PI/2, (-Math.PI/2) + Math.PI*2*secondsPassed/30);
  ctx.fillStyle = '#00ADEF';
  ctx.fill();
  ctx.font = "30px Verdana";
  ctx.fillStyle = "white";
  secondsPassed++;
}, 1000);


time_left = 30;
trialTimer = setInterval(function(){
  if(time_left <= 9){
    ctx.fillText(Math.trunc(time_left), 40, 60);
  } else {
    ctx.fillText(Math.trunc(time_left), 31, 60);
  }
  time_left -= 1;
}, 1000);

// motivational speech items
motivations = ['The more we practice, the better we get!',
              'The bigger the challenge, the bigger the victory!',
              'The best way to learn is to make mistakes!',
              'I know that you can do this!',
              'This can sometimes be tough - but you can do it!',
              'Hard work will always pay off!',
              'Stay focused - you can do this!',
              'Just 30 minutes of practice - easy peasy!',
              'You’re doing great - I’m proud of you!',
              'Even if you get stuck, just keep trying - you’ll get it!',
              'My favourite feeling is making progress after getting stuck for a while!',
              'Practice makes perfect!',
              'Every question you answer helps, even if you get it wrong!',
              'Practice can sometimes be boring - but it always pays off!',
              'Over 1000 people have already used this training...that is a lot!',
              'The 30 second countdown keeps you on your toes!',
              'The training can be frustrating, but it can be fun too!',
              'Try to treat the training like a puzzle that you can solve!',
              'Focus on getting the answers right - do not worry if you are slow!',
              'You will get faster and faster with more practice!',
              'If you are finding it easy, try to go faster!',
              'The training is designed to make you smarter - so do not worry if you do not feel smart at the start!',
              'Remember, getting answers wrong is how you learn!',
              'Try answer the questions in your head - do not write anything down!',
              'Training many times over a few weeks makes the training even more powerful!',
              'It is better to be right than to be fast - speed comes with practice!',
              'Try to push yourself a little bit more in every new session!',
              'Shortcuts will not make you smarter - solving the problems with hard work will!',
              'Easy, medium, hard, it does not matter - every question you answer helps you!',
              'Getting better can take time - be patient and never give up!',
              'How do you catch a squirrel?<br>Climb up a tree and act like a nut!',
              'I believe in you!',
              'You can do it - keep pushing!',
              'Be proud of yourself for working hard!',
              'Sometimes you will pass many levels, other times you will not - but it is all practice!',
              'Practice is always valuable!']
},
                    "after:end": function anonymous(
) {
clearInterval(interval)
clearInterval(trialTimer)

this.state.first_trial = 0;
}
                  },
                  "title": "whole-trial-frame",
                  "tardy": true,
                  "skip": "${this.state.skip_chunk == 1}",
                  "content": {
                    "type": "lab.flow.Sequence",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "trial_sequence",
                    "tardy": true,
                    "skip": "${this.state.skip_chunk == 1}",
                    "content": [
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage <= 103) {


if (this.parameters.stage <= 55) {
  this.parameters.q_word = "Is";
} else if (this.parameters.stage <= 81 && this.parameters.stage >= 56) {
  this.parameters.q_word = "Does";
};
  
this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2


if (this.parameters.stim_3_id == 1) { 
  this.parameters.stim_3 = this.state.stimulus_1;
} else if (this.parameters.stim_3_id == 2) { 
  this.parameters.stim_3 = this.state.stimulus_2;
} else if (this.parameters.stim_3_id == 3) {
  this.parameters.stim_3 = this.state.stimulus_3;
} else if (this.parameters.stim_3_id == 4) {
  this.parameters.stim_3 = this.state.stimulus_4;
};

if (this.parameters.stim_4_id == 1) { 
  this.parameters.stim_4 = this.state.stimulus_1;
} else if (this.parameters.stim_4_id == 2) {
  this.parameters.stim_4 = this.state.stimulus_2;
} else if (this.parameters.stim_4_id == 3) {
  this.parameters.stim_4 = this.state.stimulus_3;
} else if (this.parameters.stim_4_id == 4) {
  this.parameters.stim_4 = this.state.stimulus_4;
};;

if (this.parameters.stim_5_id == 1) { 
  this.parameters.stim_5 = this.state.stimulus_1;
} else if (this.parameters.stim_5_id == 2) {
  this.parameters.stim_5 = this.state.stimulus_2;
} else if (this.parameters.stim_5_id == 3) { 
  this.parameters.stim_5 = this.state.stimulus_3;
} else if (this.parameters.stim_5_id == 4) {
  this.parameters.stim_5 = this.state.stimulus_4;
};

if (this.parameters.stim_6_id == 1) { 
  this.parameters.stim_6 = this.state.stimulus_1;
} else if (this.parameters.stim_6_id == 2) {
  this.parameters.stim_6 = this.state.stimulus_2;
} else if (this.parameters.stim_6_id == 3) { 
  this.parameters.stim_6 = this.state.stimulus_3;
} else if (this.parameters.stim_6_id == 4) {
  this.parameters.stim_6 = this.state.stimulus_4;
}

if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
} 
if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
} 

};
},
                          "after:end": function anonymous(
) {
if (this.state.stage <= 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)


// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};
if (this.state.phase == "Testing" & this.state.correct == true) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" & this.state.correct == false) {
  this.state.current_tally = 0;
};

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}

};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;


}
                        },
                        "title": "standard_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4} \u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_5} ${this.parameters.relation_3} ${this.parameters.stim_6} \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"separator\"\u003E\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003E 103}"
                      },
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage > 103) {

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.stim_3 = this.state.stimulus_3
this.parameters.stim_4 = this.state.stimulus_4
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2
this.parameters.q_stim_3 = this.state.stimulus_3
this.parameters.q_stim_4 = this.state.stimulus_4

if (this.parameters.meta_stim_1_id == 1) { 
  this.parameters.meta_stim_1 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_1_id == 2) {
  this.parameters.meta_stim_1 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_1_id == 3) {
  this.parameters.meta_stim_1 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_1_id == 4) {
  this.parameters.meta_stim_1 = this.state.stimulus_4;
};

if (this.parameters.meta_stim_2_id == 1) { 
  this.parameters.meta_stim_2 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_2_id == 2) {
  this.parameters.meta_stim_2 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_2_id == 3) {
  this.parameters.meta_stim_2 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_2_id == 4) {
  this.parameters.meta_stim_2 = this.state.stimulus_4;
};


if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
};

if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
};


};
},
                          "after:end": function anonymous(
) {
if (this.state.stage > 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)

// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};

if (this.state.phase == "Testing" && this.state.correct == 1) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" && this.state.correct == 0) {
  this.state.current_tally = 0
}

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}
};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;

}
                        },
                        "title": "mathematical_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_relation_1}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_stim_1} ${this.parameters.meta_relation_2} ${this.parameters.meta_stim_2}\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003C 103}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 167.11,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#a8ca09",
                            "text": "CORRECT!",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally += 1
}
                        },
                        "title": "correct",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${this.state.correct == 0 || this.state.trial_time \u003E= 30000 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 126.2,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#d6341a",
                            "text": "WRONG",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally = 0
}
                        },
                        "title": "wrong",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${(this.state.correct != 0 & this.state.trial_time \u003C 30000) || this.state.correct == 1 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      }
                    ]
                  }
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "Training part completed!",
                      "content": "You got 16 correct answers in a row in the training part of this level!\u003Cbr\u003E\u003Cbr\u003EYou will now move on to the testing part. Get all 16 testing questions correct, and you move on to the next level.\u003Cbr\u003EBut be careful: if you get even one wrong, you have to start the training part all over again!\u003Cbr\u003E\u003Cbr\u003EWhen you're ready, click 'continue' to start the testing part of this level. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.phase = "Testing";
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "Trial 1 of 16";
this.state.current_tally = 0;
}
                  },
                  "title": "phase_transition",
                  "tardy": true,
                  "skip": "${this.state.current_tally != 16 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "",
                      "content": "You didn’t manage to get all of the questions right in that round. You’ll go back to the training part of this level. Don’t worry - practice makes perfect! Keep trying and you will get there. When you’re ready, click on “continue” to keep going. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.testing_trial_number = 1;
this.state.phase = "Training";
this.state.current_tally = 0;
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "";

}
                  },
                  "title": "return_to_training",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.testing_trial_number \u003C 17 || (this.state.testing_trial_number == 17 & this.state.current_tally \u003E 15) || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.flow.Sequence",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
document.getElementById("level-display").innerHTML = "";
document.getElementById("trial-display").innerHTML = "";

this.state.stage = ~~this.state.stage + 1;
}
                  },
                  "title": "level_transition",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.current_tally \u003C 16 || this.state.skip_chunk == 1}",
                  "content": [
                    {
                      "type": "lab.html.Screen",
                      "files": {},
                      "responses": {
                        "mousedown button#continue": "continue"
                      },
                      "parameters": {},
                      "messageHandlers": {
                        "run": function anonymous(
) {
this.state.skip_chunk = 1
}
                      },
                      "title": "next_stage",
                      "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n\n      \u003Cdiv\u003E\n      \u003Cp\u003E You just unlocked a new stage - great job!\u003Cbr\u003E\u003Cbr\u003EFeel free to take a few seconds as a break, and when you're ready,\u003Cbr\u003Eclick \"Continue\" to move on to the next level. Good luck to you both!\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\n      \u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\n      \u003Cbutton id=\"continue\"\u003EContinue\u003C\u002Fbutton\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
                      "tardy": true,
                      "skip": "${this.state.skip_chunk == 1}"
                    }
                  ]
                }
              ]
            }
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
this.state.skip_chunk = 0
this.state.phase = "Training"
this.state.testing_trial_number = 1
this.state.current_tally = 0
this.state.stage = (Number(this.state.stage) + 1).toString()
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
}
            },
            "title": "skip_chunk_reset",
            "skip": "${this.state.skip_chunk == 0}",
            "tardy": true,
            "timeout": "1000"
          },
          {
            "type": "lab.flow.Loop",
            "templateParameters": [],
            "sample": {
              "mode": "draw-shuffle",
              "n": "200"
            },
            "files": {
              "stage_5.csv": "embedded\u002Fbf5cd0b1a80923bdb06069b9f2500967ae66845e2586046e12de7681017f8e82.csv",
              "stage_118.csv": "embedded\u002Fb63062f65b4cd3ae94899aa25daf1ae670f0b4af11ddc7e455828b8cd151e5c7.csv",
              "stage_10.csv": "embedded\u002F687d3f4e9a518dff10b23ec3a9a3246e56ef9293e267668a20916a3b0c41f7ba.csv",
              "stage_11.csv": "embedded\u002F5711cf764bd9767fb4af2018d440a7c1c908002d8eba71a4da850298fa10011a.csv"
            },
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "before:prepare": async function anonymous(
) {
this.state.url_text = "https://www.drjamiecummins.com/school-rct/st-pauls/trials/stage_";
this.state.file_type = ".csv";


this.state.url = this.state.url_text.concat(this.state.stage, this.state.file_type)

var csv2json = await new Promise((resolve, reject) => {
  Papa.parse(this.state.url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(result) {
      resolve(result.data);
    }
  })
})
console.log(csv2json)
this.options.templateParameters = csv2json




this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2

this.state.current_tally = 0
this.state.testing_trial_number = 1
this.state.phase = "Training"


}
            },
            "title": "trial_chunk",
            "tardy": true,
            "skip": "${this.state.skip_chunk == 1}",
            "shuffleGroups": [],
            "template": {
              "type": "lab.flow.Sequence",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "trials-and-breaks",
              "tardy": true,
              "skip": "${this.state.skip_chunk == 1}",
              "content": [
                {
                  "type": "lab.html.Frame",
                  "contextSelector": "[data-labjs-section=\"frame\"]",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
if (this.state.first_trial == 1) {
document.getElementById("pokemon-motivation").innerHTML = "Let's get started - you've got this!";
};


if (this.state.phase == "Training") {
  document.getElementById("trial-display").innerHTML = this.state.current_tally + " of 16 correct";
} else if (this.state.phase == "Testing") {
  document.getElementById("trial-display").innerHTML = "Trial " + this.state.testing_trial_number + " of 16";
}

var pieChart = document.getElementById('timer-circle');
pieChart.width = pieChart.height = 100;

var counter = document.createElement("p");


var ctx = pieChart.getContext('2d');
var secondsPassed = 0;

interval = setInterval(function() {
  ctx.clearRect(0, 0, pieChart.width, pieChart.height);
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, 0, Math.PI*2);
  ctx.fillStyle = '#03879E';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, -Math.PI/2, (-Math.PI/2) + Math.PI*2*secondsPassed/30);
  ctx.fillStyle = '#00ADEF';
  ctx.fill();
  ctx.font = "30px Verdana";
  ctx.fillStyle = "white";
  secondsPassed++;
}, 1000);


time_left = 30;
trialTimer = setInterval(function(){
  if(time_left <= 9){
    ctx.fillText(Math.trunc(time_left), 40, 60);
  } else {
    ctx.fillText(Math.trunc(time_left), 31, 60);
  }
  time_left -= 1;
}, 1000);

// motivational speech items
motivations = ['The more we practice, the better we get!',
              'The bigger the challenge, the bigger the victory!',
              'The best way to learn is to make mistakes!',
              'I know that you can do this!',
              'This can sometimes be tough - but you can do it!',
              'Hard work will always pay off!',
              'Stay focused - you can do this!',
              'Just 30 minutes of practice - easy peasy!',
              'You’re doing great - I’m proud of you!',
              'Even if you get stuck, just keep trying - you’ll get it!',
              'My favourite feeling is making progress after getting stuck for a while!',
              'Practice makes perfect!',
              'Every question you answer helps, even if you get it wrong!',
              'Practice can sometimes be boring - but it always pays off!',
              'Over 1000 people have already used this training...that is a lot!',
              'The 30 second countdown keeps you on your toes!',
              'The training can be frustrating, but it can be fun too!',
              'Try to treat the training like a puzzle that you can solve!',
              'Focus on getting the answers right - do not worry if you are slow!',
              'You will get faster and faster with more practice!',
              'If you are finding it easy, try to go faster!',
              'The training is designed to make you smarter - so do not worry if you do not feel smart at the start!',
              'Remember, getting answers wrong is how you learn!',
              'Try answer the questions in your head - do not write anything down!',
              'Training many times over a few weeks makes the training even more powerful!',
              'It is better to be right than to be fast - speed comes with practice!',
              'Try to push yourself a little bit more in every new session!',
              'Shortcuts will not make you smarter - solving the problems with hard work will!',
              'Easy, medium, hard, it does not matter - every question you answer helps you!',
              'Getting better can take time - be patient and never give up!',
              'How do you catch a squirrel?<br>Climb up a tree and act like a nut!',
              'I believe in you!',
              'You can do it - keep pushing!',
              'Be proud of yourself for working hard!',
              'Sometimes you will pass many levels, other times you will not - but it is all practice!',
              'Practice is always valuable!']
},
                    "after:end": function anonymous(
) {
clearInterval(interval)
clearInterval(trialTimer)

this.state.first_trial = 0;
}
                  },
                  "title": "whole-trial-frame",
                  "tardy": true,
                  "skip": "${this.state.skip_chunk == 1}",
                  "content": {
                    "type": "lab.flow.Sequence",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "trial_sequence",
                    "tardy": true,
                    "skip": "${this.state.skip_chunk == 1}",
                    "content": [
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage <= 103) {


if (this.parameters.stage <= 55) {
  this.parameters.q_word = "Is";
} else if (this.parameters.stage <= 81 && this.parameters.stage >= 56) {
  this.parameters.q_word = "Does";
};
  
this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2


if (this.parameters.stim_3_id == 1) { 
  this.parameters.stim_3 = this.state.stimulus_1;
} else if (this.parameters.stim_3_id == 2) { 
  this.parameters.stim_3 = this.state.stimulus_2;
} else if (this.parameters.stim_3_id == 3) {
  this.parameters.stim_3 = this.state.stimulus_3;
} else if (this.parameters.stim_3_id == 4) {
  this.parameters.stim_3 = this.state.stimulus_4;
};

if (this.parameters.stim_4_id == 1) { 
  this.parameters.stim_4 = this.state.stimulus_1;
} else if (this.parameters.stim_4_id == 2) {
  this.parameters.stim_4 = this.state.stimulus_2;
} else if (this.parameters.stim_4_id == 3) {
  this.parameters.stim_4 = this.state.stimulus_3;
} else if (this.parameters.stim_4_id == 4) {
  this.parameters.stim_4 = this.state.stimulus_4;
};;

if (this.parameters.stim_5_id == 1) { 
  this.parameters.stim_5 = this.state.stimulus_1;
} else if (this.parameters.stim_5_id == 2) {
  this.parameters.stim_5 = this.state.stimulus_2;
} else if (this.parameters.stim_5_id == 3) { 
  this.parameters.stim_5 = this.state.stimulus_3;
} else if (this.parameters.stim_5_id == 4) {
  this.parameters.stim_5 = this.state.stimulus_4;
};

if (this.parameters.stim_6_id == 1) { 
  this.parameters.stim_6 = this.state.stimulus_1;
} else if (this.parameters.stim_6_id == 2) {
  this.parameters.stim_6 = this.state.stimulus_2;
} else if (this.parameters.stim_6_id == 3) { 
  this.parameters.stim_6 = this.state.stimulus_3;
} else if (this.parameters.stim_6_id == 4) {
  this.parameters.stim_6 = this.state.stimulus_4;
}

if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
} 
if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
} 

};
},
                          "after:end": function anonymous(
) {
if (this.state.stage <= 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)


// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};
if (this.state.phase == "Testing" & this.state.correct == true) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" & this.state.correct == false) {
  this.state.current_tally = 0;
};

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}

};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;


}
                        },
                        "title": "standard_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4} \u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_5} ${this.parameters.relation_3} ${this.parameters.stim_6} \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"separator\"\u003E\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003E 103}"
                      },
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage > 103) {

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.stim_3 = this.state.stimulus_3
this.parameters.stim_4 = this.state.stimulus_4
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2
this.parameters.q_stim_3 = this.state.stimulus_3
this.parameters.q_stim_4 = this.state.stimulus_4

if (this.parameters.meta_stim_1_id == 1) { 
  this.parameters.meta_stim_1 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_1_id == 2) {
  this.parameters.meta_stim_1 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_1_id == 3) {
  this.parameters.meta_stim_1 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_1_id == 4) {
  this.parameters.meta_stim_1 = this.state.stimulus_4;
};

if (this.parameters.meta_stim_2_id == 1) { 
  this.parameters.meta_stim_2 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_2_id == 2) {
  this.parameters.meta_stim_2 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_2_id == 3) {
  this.parameters.meta_stim_2 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_2_id == 4) {
  this.parameters.meta_stim_2 = this.state.stimulus_4;
};


if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
};

if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
};


};
},
                          "after:end": function anonymous(
) {
if (this.state.stage > 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)

// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};

if (this.state.phase == "Testing" && this.state.correct == 1) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" && this.state.correct == 0) {
  this.state.current_tally = 0
}

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}
};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;

}
                        },
                        "title": "mathematical_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_relation_1}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_stim_1} ${this.parameters.meta_relation_2} ${this.parameters.meta_stim_2}\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003C 103}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 167.11,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#a8ca09",
                            "text": "CORRECT!",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally += 1
}
                        },
                        "title": "correct",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${this.state.correct == 0 || this.state.trial_time \u003E= 30000 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 126.2,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#d6341a",
                            "text": "WRONG",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally = 0
}
                        },
                        "title": "wrong",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${(this.state.correct != 0 & this.state.trial_time \u003C 30000) || this.state.correct == 1 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      }
                    ]
                  }
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "Training part completed!",
                      "content": "You got 16 correct answers in a row in the training part of this level!\u003Cbr\u003E\u003Cbr\u003EYou will now move on to the testing part. Get all 16 testing questions correct, and you move on to the next level.\u003Cbr\u003EBut be careful: if you get even one wrong, you have to start the training part all over again!\u003Cbr\u003E\u003Cbr\u003EWhen you're ready, click 'continue' to start the testing part of this level. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.phase = "Testing";
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "Trial 1 of 16";
this.state.current_tally = 0;
}
                  },
                  "title": "phase_transition",
                  "tardy": true,
                  "skip": "${this.state.current_tally != 16 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "",
                      "content": "You didn’t manage to get all of the questions right in that round. You’ll go back to the training part of this level. Don’t worry - practice makes perfect! Keep trying and you will get there. When you’re ready, click on “continue” to keep going. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.testing_trial_number = 1;
this.state.phase = "Training";
this.state.current_tally = 0;
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "";

}
                  },
                  "title": "return_to_training",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.testing_trial_number \u003C 17 || (this.state.testing_trial_number == 17 & this.state.current_tally \u003E 15) || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.flow.Sequence",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
document.getElementById("level-display").innerHTML = "";
document.getElementById("trial-display").innerHTML = "";

this.state.stage = ~~this.state.stage + 1;
}
                  },
                  "title": "level_transition",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.current_tally \u003C 16 || this.state.skip_chunk == 1}",
                  "content": [
                    {
                      "type": "lab.html.Screen",
                      "files": {},
                      "responses": {
                        "mousedown button#continue": "continue"
                      },
                      "parameters": {},
                      "messageHandlers": {
                        "run": function anonymous(
) {
this.state.skip_chunk = 1
}
                      },
                      "title": "next_stage",
                      "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n\n      \u003Cdiv\u003E\n      \u003Cp\u003E You just unlocked a new stage - great job!\u003Cbr\u003E\u003Cbr\u003EFeel free to take a few seconds as a break, and when you're ready,\u003Cbr\u003Eclick \"Continue\" to move on to the next level. Good luck to you both!\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\n      \u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\n      \u003Cbutton id=\"continue\"\u003EContinue\u003C\u002Fbutton\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
                      "tardy": true,
                      "skip": "${this.state.skip_chunk == 1}"
                    }
                  ]
                }
              ]
            }
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
this.state.skip_chunk = 0
this.state.phase = "Training"
this.state.testing_trial_number = 1
this.state.current_tally = 0
this.state.stage = (Number(this.state.stage) + 1).toString()
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
}
            },
            "title": "skip_chunk_reset",
            "skip": "${this.state.skip_chunk == 0}",
            "tardy": true,
            "timeout": "1000"
          },
          {
            "type": "lab.flow.Loop",
            "templateParameters": [],
            "sample": {
              "mode": "draw-shuffle",
              "n": "200"
            },
            "files": {
              "stage_5.csv": "embedded\u002Fbf5cd0b1a80923bdb06069b9f2500967ae66845e2586046e12de7681017f8e82.csv",
              "stage_118.csv": "embedded\u002Fb63062f65b4cd3ae94899aa25daf1ae670f0b4af11ddc7e455828b8cd151e5c7.csv",
              "stage_10.csv": "embedded\u002F687d3f4e9a518dff10b23ec3a9a3246e56ef9293e267668a20916a3b0c41f7ba.csv",
              "stage_11.csv": "embedded\u002F5711cf764bd9767fb4af2018d440a7c1c908002d8eba71a4da850298fa10011a.csv"
            },
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "before:prepare": async function anonymous(
) {
this.state.url_text = "https://www.drjamiecummins.com/school-rct/st-pauls/trials/stage_";
this.state.file_type = ".csv";


this.state.url = this.state.url_text.concat(this.state.stage, this.state.file_type)

var csv2json = await new Promise((resolve, reject) => {
  Papa.parse(this.state.url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(result) {
      resolve(result.data);
    }
  })
})
console.log(csv2json)
this.options.templateParameters = csv2json




this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2

this.state.current_tally = 0
this.state.testing_trial_number = 1
this.state.phase = "Training"


}
            },
            "title": "trial_chunk",
            "tardy": true,
            "skip": "${this.state.skip_chunk == 1}",
            "shuffleGroups": [],
            "template": {
              "type": "lab.flow.Sequence",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "trials-and-breaks",
              "tardy": true,
              "skip": "${this.state.skip_chunk == 1}",
              "content": [
                {
                  "type": "lab.html.Frame",
                  "contextSelector": "[data-labjs-section=\"frame\"]",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
if (this.state.first_trial == 1) {
document.getElementById("pokemon-motivation").innerHTML = "Let's get started - you've got this!";
};


if (this.state.phase == "Training") {
  document.getElementById("trial-display").innerHTML = this.state.current_tally + " of 16 correct";
} else if (this.state.phase == "Testing") {
  document.getElementById("trial-display").innerHTML = "Trial " + this.state.testing_trial_number + " of 16";
}

var pieChart = document.getElementById('timer-circle');
pieChart.width = pieChart.height = 100;

var counter = document.createElement("p");


var ctx = pieChart.getContext('2d');
var secondsPassed = 0;

interval = setInterval(function() {
  ctx.clearRect(0, 0, pieChart.width, pieChart.height);
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, 0, Math.PI*2);
  ctx.fillStyle = '#03879E';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, -Math.PI/2, (-Math.PI/2) + Math.PI*2*secondsPassed/30);
  ctx.fillStyle = '#00ADEF';
  ctx.fill();
  ctx.font = "30px Verdana";
  ctx.fillStyle = "white";
  secondsPassed++;
}, 1000);


time_left = 30;
trialTimer = setInterval(function(){
  if(time_left <= 9){
    ctx.fillText(Math.trunc(time_left), 40, 60);
  } else {
    ctx.fillText(Math.trunc(time_left), 31, 60);
  }
  time_left -= 1;
}, 1000);

// motivational speech items
motivations = ['The more we practice, the better we get!',
              'The bigger the challenge, the bigger the victory!',
              'The best way to learn is to make mistakes!',
              'I know that you can do this!',
              'This can sometimes be tough - but you can do it!',
              'Hard work will always pay off!',
              'Stay focused - you can do this!',
              'Just 30 minutes of practice - easy peasy!',
              'You’re doing great - I’m proud of you!',
              'Even if you get stuck, just keep trying - you’ll get it!',
              'My favourite feeling is making progress after getting stuck for a while!',
              'Practice makes perfect!',
              'Every question you answer helps, even if you get it wrong!',
              'Practice can sometimes be boring - but it always pays off!',
              'Over 1000 people have already used this training...that is a lot!',
              'The 30 second countdown keeps you on your toes!',
              'The training can be frustrating, but it can be fun too!',
              'Try to treat the training like a puzzle that you can solve!',
              'Focus on getting the answers right - do not worry if you are slow!',
              'You will get faster and faster with more practice!',
              'If you are finding it easy, try to go faster!',
              'The training is designed to make you smarter - so do not worry if you do not feel smart at the start!',
              'Remember, getting answers wrong is how you learn!',
              'Try answer the questions in your head - do not write anything down!',
              'Training many times over a few weeks makes the training even more powerful!',
              'It is better to be right than to be fast - speed comes with practice!',
              'Try to push yourself a little bit more in every new session!',
              'Shortcuts will not make you smarter - solving the problems with hard work will!',
              'Easy, medium, hard, it does not matter - every question you answer helps you!',
              'Getting better can take time - be patient and never give up!',
              'How do you catch a squirrel?<br>Climb up a tree and act like a nut!',
              'I believe in you!',
              'You can do it - keep pushing!',
              'Be proud of yourself for working hard!',
              'Sometimes you will pass many levels, other times you will not - but it is all practice!',
              'Practice is always valuable!']
},
                    "after:end": function anonymous(
) {
clearInterval(interval)
clearInterval(trialTimer)

this.state.first_trial = 0;
}
                  },
                  "title": "whole-trial-frame",
                  "tardy": true,
                  "skip": "${this.state.skip_chunk == 1}",
                  "content": {
                    "type": "lab.flow.Sequence",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "trial_sequence",
                    "tardy": true,
                    "skip": "${this.state.skip_chunk == 1}",
                    "content": [
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage <= 103) {


if (this.parameters.stage <= 55) {
  this.parameters.q_word = "Is";
} else if (this.parameters.stage <= 81 && this.parameters.stage >= 56) {
  this.parameters.q_word = "Does";
};
  
this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2


if (this.parameters.stim_3_id == 1) { 
  this.parameters.stim_3 = this.state.stimulus_1;
} else if (this.parameters.stim_3_id == 2) { 
  this.parameters.stim_3 = this.state.stimulus_2;
} else if (this.parameters.stim_3_id == 3) {
  this.parameters.stim_3 = this.state.stimulus_3;
} else if (this.parameters.stim_3_id == 4) {
  this.parameters.stim_3 = this.state.stimulus_4;
};

if (this.parameters.stim_4_id == 1) { 
  this.parameters.stim_4 = this.state.stimulus_1;
} else if (this.parameters.stim_4_id == 2) {
  this.parameters.stim_4 = this.state.stimulus_2;
} else if (this.parameters.stim_4_id == 3) {
  this.parameters.stim_4 = this.state.stimulus_3;
} else if (this.parameters.stim_4_id == 4) {
  this.parameters.stim_4 = this.state.stimulus_4;
};;

if (this.parameters.stim_5_id == 1) { 
  this.parameters.stim_5 = this.state.stimulus_1;
} else if (this.parameters.stim_5_id == 2) {
  this.parameters.stim_5 = this.state.stimulus_2;
} else if (this.parameters.stim_5_id == 3) { 
  this.parameters.stim_5 = this.state.stimulus_3;
} else if (this.parameters.stim_5_id == 4) {
  this.parameters.stim_5 = this.state.stimulus_4;
};

if (this.parameters.stim_6_id == 1) { 
  this.parameters.stim_6 = this.state.stimulus_1;
} else if (this.parameters.stim_6_id == 2) {
  this.parameters.stim_6 = this.state.stimulus_2;
} else if (this.parameters.stim_6_id == 3) { 
  this.parameters.stim_6 = this.state.stimulus_3;
} else if (this.parameters.stim_6_id == 4) {
  this.parameters.stim_6 = this.state.stimulus_4;
}

if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
} 
if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
} 

};
},
                          "after:end": function anonymous(
) {
if (this.state.stage <= 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)


// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};
if (this.state.phase == "Testing" & this.state.correct == true) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" & this.state.correct == false) {
  this.state.current_tally = 0;
};

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}

};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;


}
                        },
                        "title": "standard_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4} \u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_5} ${this.parameters.relation_3} ${this.parameters.stim_6} \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"separator\"\u003E\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003E 103}"
                      },
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage > 103) {

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.stim_3 = this.state.stimulus_3
this.parameters.stim_4 = this.state.stimulus_4
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2
this.parameters.q_stim_3 = this.state.stimulus_3
this.parameters.q_stim_4 = this.state.stimulus_4

if (this.parameters.meta_stim_1_id == 1) { 
  this.parameters.meta_stim_1 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_1_id == 2) {
  this.parameters.meta_stim_1 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_1_id == 3) {
  this.parameters.meta_stim_1 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_1_id == 4) {
  this.parameters.meta_stim_1 = this.state.stimulus_4;
};

if (this.parameters.meta_stim_2_id == 1) { 
  this.parameters.meta_stim_2 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_2_id == 2) {
  this.parameters.meta_stim_2 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_2_id == 3) {
  this.parameters.meta_stim_2 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_2_id == 4) {
  this.parameters.meta_stim_2 = this.state.stimulus_4;
};


if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
};

if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
};


};
},
                          "after:end": function anonymous(
) {
if (this.state.stage > 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)

// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};

if (this.state.phase == "Testing" && this.state.correct == 1) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" && this.state.correct == 0) {
  this.state.current_tally = 0
}

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}
};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;

}
                        },
                        "title": "mathematical_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_relation_1}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_stim_1} ${this.parameters.meta_relation_2} ${this.parameters.meta_stim_2}\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003C 103}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 167.11,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#a8ca09",
                            "text": "CORRECT!",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally += 1
}
                        },
                        "title": "correct",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${this.state.correct == 0 || this.state.trial_time \u003E= 30000 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 126.2,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#d6341a",
                            "text": "WRONG",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally = 0
}
                        },
                        "title": "wrong",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${(this.state.correct != 0 & this.state.trial_time \u003C 30000) || this.state.correct == 1 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      }
                    ]
                  }
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "Training part completed!",
                      "content": "You got 16 correct answers in a row in the training part of this level!\u003Cbr\u003E\u003Cbr\u003EYou will now move on to the testing part. Get all 16 testing questions correct, and you move on to the next level.\u003Cbr\u003EBut be careful: if you get even one wrong, you have to start the training part all over again!\u003Cbr\u003E\u003Cbr\u003EWhen you're ready, click 'continue' to start the testing part of this level. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.phase = "Testing";
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "Trial 1 of 16";
this.state.current_tally = 0;
}
                  },
                  "title": "phase_transition",
                  "tardy": true,
                  "skip": "${this.state.current_tally != 16 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "",
                      "content": "You didn’t manage to get all of the questions right in that round. You’ll go back to the training part of this level. Don’t worry - practice makes perfect! Keep trying and you will get there. When you’re ready, click on “continue” to keep going. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.testing_trial_number = 1;
this.state.phase = "Training";
this.state.current_tally = 0;
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "";

}
                  },
                  "title": "return_to_training",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.testing_trial_number \u003C 17 || (this.state.testing_trial_number == 17 & this.state.current_tally \u003E 15) || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.flow.Sequence",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
document.getElementById("level-display").innerHTML = "";
document.getElementById("trial-display").innerHTML = "";

this.state.stage = ~~this.state.stage + 1;
}
                  },
                  "title": "level_transition",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.current_tally \u003C 16 || this.state.skip_chunk == 1}",
                  "content": [
                    {
                      "type": "lab.html.Screen",
                      "files": {},
                      "responses": {
                        "mousedown button#continue": "continue"
                      },
                      "parameters": {},
                      "messageHandlers": {
                        "run": function anonymous(
) {
this.state.skip_chunk = 1
}
                      },
                      "title": "next_stage",
                      "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n\n      \u003Cdiv\u003E\n      \u003Cp\u003E You just unlocked a new stage - great job!\u003Cbr\u003E\u003Cbr\u003EFeel free to take a few seconds as a break, and when you're ready,\u003Cbr\u003Eclick \"Continue\" to move on to the next level. Good luck to you both!\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\n      \u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\n      \u003Cbutton id=\"continue\"\u003EContinue\u003C\u002Fbutton\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
                      "tardy": true,
                      "skip": "${this.state.skip_chunk == 1}"
                    }
                  ]
                }
              ]
            }
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
this.state.skip_chunk = 0
this.state.phase = "Training"
this.state.testing_trial_number = 1
this.state.current_tally = 0
this.state.stage = (Number(this.state.stage) + 1).toString()
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
}
            },
            "title": "skip_chunk_reset",
            "skip": "${this.state.skip_chunk == 0}",
            "tardy": true,
            "timeout": "1000"
          },
          {
            "type": "lab.flow.Loop",
            "templateParameters": [],
            "sample": {
              "mode": "draw-shuffle",
              "n": "200"
            },
            "files": {
              "stage_5.csv": "embedded\u002Fbf5cd0b1a80923bdb06069b9f2500967ae66845e2586046e12de7681017f8e82.csv",
              "stage_118.csv": "embedded\u002Fb63062f65b4cd3ae94899aa25daf1ae670f0b4af11ddc7e455828b8cd151e5c7.csv",
              "stage_10.csv": "embedded\u002F687d3f4e9a518dff10b23ec3a9a3246e56ef9293e267668a20916a3b0c41f7ba.csv",
              "stage_11.csv": "embedded\u002F5711cf764bd9767fb4af2018d440a7c1c908002d8eba71a4da850298fa10011a.csv"
            },
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "before:prepare": async function anonymous(
) {
this.state.url_text = "https://www.drjamiecummins.com/school-rct/st-pauls/trials/stage_";
this.state.file_type = ".csv";


this.state.url = this.state.url_text.concat(this.state.stage, this.state.file_type)

var csv2json = await new Promise((resolve, reject) => {
  Papa.parse(this.state.url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(result) {
      resolve(result.data);
    }
  })
})
console.log(csv2json)
this.options.templateParameters = csv2json




this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2

this.state.current_tally = 0
this.state.testing_trial_number = 1
this.state.phase = "Training"


}
            },
            "title": "trial_chunk",
            "tardy": true,
            "skip": "${this.state.skip_chunk == 1}",
            "shuffleGroups": [],
            "template": {
              "type": "lab.flow.Sequence",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "trials-and-breaks",
              "tardy": true,
              "skip": "${this.state.skip_chunk == 1}",
              "content": [
                {
                  "type": "lab.html.Frame",
                  "contextSelector": "[data-labjs-section=\"frame\"]",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
if (this.state.first_trial == 1) {
document.getElementById("pokemon-motivation").innerHTML = "Let's get started - you've got this!";
};


if (this.state.phase == "Training") {
  document.getElementById("trial-display").innerHTML = this.state.current_tally + " of 16 correct";
} else if (this.state.phase == "Testing") {
  document.getElementById("trial-display").innerHTML = "Trial " + this.state.testing_trial_number + " of 16";
}

var pieChart = document.getElementById('timer-circle');
pieChart.width = pieChart.height = 100;

var counter = document.createElement("p");


var ctx = pieChart.getContext('2d');
var secondsPassed = 0;

interval = setInterval(function() {
  ctx.clearRect(0, 0, pieChart.width, pieChart.height);
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, 0, Math.PI*2);
  ctx.fillStyle = '#03879E';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, -Math.PI/2, (-Math.PI/2) + Math.PI*2*secondsPassed/30);
  ctx.fillStyle = '#00ADEF';
  ctx.fill();
  ctx.font = "30px Verdana";
  ctx.fillStyle = "white";
  secondsPassed++;
}, 1000);


time_left = 30;
trialTimer = setInterval(function(){
  if(time_left <= 9){
    ctx.fillText(Math.trunc(time_left), 40, 60);
  } else {
    ctx.fillText(Math.trunc(time_left), 31, 60);
  }
  time_left -= 1;
}, 1000);

// motivational speech items
motivations = ['The more we practice, the better we get!',
              'The bigger the challenge, the bigger the victory!',
              'The best way to learn is to make mistakes!',
              'I know that you can do this!',
              'This can sometimes be tough - but you can do it!',
              'Hard work will always pay off!',
              'Stay focused - you can do this!',
              'Just 30 minutes of practice - easy peasy!',
              'You’re doing great - I’m proud of you!',
              'Even if you get stuck, just keep trying - you’ll get it!',
              'My favourite feeling is making progress after getting stuck for a while!',
              'Practice makes perfect!',
              'Every question you answer helps, even if you get it wrong!',
              'Practice can sometimes be boring - but it always pays off!',
              'Over 1000 people have already used this training...that is a lot!',
              'The 30 second countdown keeps you on your toes!',
              'The training can be frustrating, but it can be fun too!',
              'Try to treat the training like a puzzle that you can solve!',
              'Focus on getting the answers right - do not worry if you are slow!',
              'You will get faster and faster with more practice!',
              'If you are finding it easy, try to go faster!',
              'The training is designed to make you smarter - so do not worry if you do not feel smart at the start!',
              'Remember, getting answers wrong is how you learn!',
              'Try answer the questions in your head - do not write anything down!',
              'Training many times over a few weeks makes the training even more powerful!',
              'It is better to be right than to be fast - speed comes with practice!',
              'Try to push yourself a little bit more in every new session!',
              'Shortcuts will not make you smarter - solving the problems with hard work will!',
              'Easy, medium, hard, it does not matter - every question you answer helps you!',
              'Getting better can take time - be patient and never give up!',
              'How do you catch a squirrel?<br>Climb up a tree and act like a nut!',
              'I believe in you!',
              'You can do it - keep pushing!',
              'Be proud of yourself for working hard!',
              'Sometimes you will pass many levels, other times you will not - but it is all practice!',
              'Practice is always valuable!']
},
                    "after:end": function anonymous(
) {
clearInterval(interval)
clearInterval(trialTimer)

this.state.first_trial = 0;
}
                  },
                  "title": "whole-trial-frame",
                  "tardy": true,
                  "skip": "${this.state.skip_chunk == 1}",
                  "content": {
                    "type": "lab.flow.Sequence",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "trial_sequence",
                    "tardy": true,
                    "skip": "${this.state.skip_chunk == 1}",
                    "content": [
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage <= 103) {


if (this.parameters.stage <= 55) {
  this.parameters.q_word = "Is";
} else if (this.parameters.stage <= 81 && this.parameters.stage >= 56) {
  this.parameters.q_word = "Does";
};
  
this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2


if (this.parameters.stim_3_id == 1) { 
  this.parameters.stim_3 = this.state.stimulus_1;
} else if (this.parameters.stim_3_id == 2) { 
  this.parameters.stim_3 = this.state.stimulus_2;
} else if (this.parameters.stim_3_id == 3) {
  this.parameters.stim_3 = this.state.stimulus_3;
} else if (this.parameters.stim_3_id == 4) {
  this.parameters.stim_3 = this.state.stimulus_4;
};

if (this.parameters.stim_4_id == 1) { 
  this.parameters.stim_4 = this.state.stimulus_1;
} else if (this.parameters.stim_4_id == 2) {
  this.parameters.stim_4 = this.state.stimulus_2;
} else if (this.parameters.stim_4_id == 3) {
  this.parameters.stim_4 = this.state.stimulus_3;
} else if (this.parameters.stim_4_id == 4) {
  this.parameters.stim_4 = this.state.stimulus_4;
};;

if (this.parameters.stim_5_id == 1) { 
  this.parameters.stim_5 = this.state.stimulus_1;
} else if (this.parameters.stim_5_id == 2) {
  this.parameters.stim_5 = this.state.stimulus_2;
} else if (this.parameters.stim_5_id == 3) { 
  this.parameters.stim_5 = this.state.stimulus_3;
} else if (this.parameters.stim_5_id == 4) {
  this.parameters.stim_5 = this.state.stimulus_4;
};

if (this.parameters.stim_6_id == 1) { 
  this.parameters.stim_6 = this.state.stimulus_1;
} else if (this.parameters.stim_6_id == 2) {
  this.parameters.stim_6 = this.state.stimulus_2;
} else if (this.parameters.stim_6_id == 3) { 
  this.parameters.stim_6 = this.state.stimulus_3;
} else if (this.parameters.stim_6_id == 4) {
  this.parameters.stim_6 = this.state.stimulus_4;
}

if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
} 
if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
} 

};
},
                          "after:end": function anonymous(
) {
if (this.state.stage <= 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)


// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};
if (this.state.phase == "Testing" & this.state.correct == true) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" & this.state.correct == false) {
  this.state.current_tally = 0;
};

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}

};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;


}
                        },
                        "title": "standard_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4} \u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_5} ${this.parameters.relation_3} ${this.parameters.stim_6} \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"separator\"\u003E\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003E 103}"
                      },
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage > 103) {

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.stim_3 = this.state.stimulus_3
this.parameters.stim_4 = this.state.stimulus_4
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2
this.parameters.q_stim_3 = this.state.stimulus_3
this.parameters.q_stim_4 = this.state.stimulus_4

if (this.parameters.meta_stim_1_id == 1) { 
  this.parameters.meta_stim_1 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_1_id == 2) {
  this.parameters.meta_stim_1 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_1_id == 3) {
  this.parameters.meta_stim_1 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_1_id == 4) {
  this.parameters.meta_stim_1 = this.state.stimulus_4;
};

if (this.parameters.meta_stim_2_id == 1) { 
  this.parameters.meta_stim_2 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_2_id == 2) {
  this.parameters.meta_stim_2 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_2_id == 3) {
  this.parameters.meta_stim_2 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_2_id == 4) {
  this.parameters.meta_stim_2 = this.state.stimulus_4;
};


if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
};

if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
};


};
},
                          "after:end": function anonymous(
) {
if (this.state.stage > 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)

// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};

if (this.state.phase == "Testing" && this.state.correct == 1) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" && this.state.correct == 0) {
  this.state.current_tally = 0
}

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}
};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;

}
                        },
                        "title": "mathematical_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_relation_1}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_stim_1} ${this.parameters.meta_relation_2} ${this.parameters.meta_stim_2}\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003C 103}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 167.11,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#a8ca09",
                            "text": "CORRECT!",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally += 1
}
                        },
                        "title": "correct",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${this.state.correct == 0 || this.state.trial_time \u003E= 30000 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 126.2,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#d6341a",
                            "text": "WRONG",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally = 0
}
                        },
                        "title": "wrong",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${(this.state.correct != 0 & this.state.trial_time \u003C 30000) || this.state.correct == 1 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      }
                    ]
                  }
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "Training part completed!",
                      "content": "You got 16 correct answers in a row in the training part of this level!\u003Cbr\u003E\u003Cbr\u003EYou will now move on to the testing part. Get all 16 testing questions correct, and you move on to the next level.\u003Cbr\u003EBut be careful: if you get even one wrong, you have to start the training part all over again!\u003Cbr\u003E\u003Cbr\u003EWhen you're ready, click 'continue' to start the testing part of this level. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.phase = "Testing";
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "Trial 1 of 16";
this.state.current_tally = 0;
}
                  },
                  "title": "phase_transition",
                  "tardy": true,
                  "skip": "${this.state.current_tally != 16 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "",
                      "content": "You didn’t manage to get all of the questions right in that round. You’ll go back to the training part of this level. Don’t worry - practice makes perfect! Keep trying and you will get there. When you’re ready, click on “continue” to keep going. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.testing_trial_number = 1;
this.state.phase = "Training";
this.state.current_tally = 0;
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "";

}
                  },
                  "title": "return_to_training",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.testing_trial_number \u003C 17 || (this.state.testing_trial_number == 17 & this.state.current_tally \u003E 15) || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.flow.Sequence",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
document.getElementById("level-display").innerHTML = "";
document.getElementById("trial-display").innerHTML = "";

this.state.stage = ~~this.state.stage + 1;
}
                  },
                  "title": "level_transition",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.current_tally \u003C 16 || this.state.skip_chunk == 1}",
                  "content": [
                    {
                      "type": "lab.html.Screen",
                      "files": {},
                      "responses": {
                        "mousedown button#continue": "continue"
                      },
                      "parameters": {},
                      "messageHandlers": {
                        "run": function anonymous(
) {
this.state.skip_chunk = 1
}
                      },
                      "title": "next_stage",
                      "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n\n      \u003Cdiv\u003E\n      \u003Cp\u003E You just unlocked a new stage - great job!\u003Cbr\u003E\u003Cbr\u003EFeel free to take a few seconds as a break, and when you're ready,\u003Cbr\u003Eclick \"Continue\" to move on to the next level. Good luck to you both!\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\n      \u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\n      \u003Cbutton id=\"continue\"\u003EContinue\u003C\u002Fbutton\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
                      "tardy": true,
                      "skip": "${this.state.skip_chunk == 1}"
                    }
                  ]
                }
              ]
            }
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
this.state.skip_chunk = 0
this.state.phase = "Training"
this.state.testing_trial_number = 1
this.state.current_tally = 0
this.state.stage = (Number(this.state.stage) + 1).toString()
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
}
            },
            "title": "skip_chunk_reset",
            "skip": "${this.state.skip_chunk == 0}",
            "tardy": true,
            "timeout": "1000"
          },
          {
            "type": "lab.flow.Loop",
            "templateParameters": [],
            "sample": {
              "mode": "draw-shuffle",
              "n": "200"
            },
            "files": {
              "stage_5.csv": "embedded\u002Fbf5cd0b1a80923bdb06069b9f2500967ae66845e2586046e12de7681017f8e82.csv",
              "stage_118.csv": "embedded\u002Fb63062f65b4cd3ae94899aa25daf1ae670f0b4af11ddc7e455828b8cd151e5c7.csv",
              "stage_10.csv": "embedded\u002F687d3f4e9a518dff10b23ec3a9a3246e56ef9293e267668a20916a3b0c41f7ba.csv",
              "stage_11.csv": "embedded\u002F5711cf764bd9767fb4af2018d440a7c1c908002d8eba71a4da850298fa10011a.csv"
            },
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "before:prepare": async function anonymous(
) {
this.state.url_text = "https://www.drjamiecummins.com/school-rct/st-pauls/trials/stage_";
this.state.file_type = ".csv";


this.state.url = this.state.url_text.concat(this.state.stage, this.state.file_type)

var csv2json = await new Promise((resolve, reject) => {
  Papa.parse(this.state.url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(result) {
      resolve(result.data);
    }
  })
})
console.log(csv2json)
this.options.templateParameters = csv2json




this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2

this.state.current_tally = 0
this.state.testing_trial_number = 1
this.state.phase = "Training"


}
            },
            "title": "trial_chunk",
            "tardy": true,
            "skip": "${this.state.skip_chunk == 1}",
            "shuffleGroups": [],
            "template": {
              "type": "lab.flow.Sequence",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "trials-and-breaks",
              "tardy": true,
              "skip": "${this.state.skip_chunk == 1}",
              "content": [
                {
                  "type": "lab.html.Frame",
                  "contextSelector": "[data-labjs-section=\"frame\"]",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
if (this.state.first_trial == 1) {
document.getElementById("pokemon-motivation").innerHTML = "Let's get started - you've got this!";
};


if (this.state.phase == "Training") {
  document.getElementById("trial-display").innerHTML = this.state.current_tally + " of 16 correct";
} else if (this.state.phase == "Testing") {
  document.getElementById("trial-display").innerHTML = "Trial " + this.state.testing_trial_number + " of 16";
}

var pieChart = document.getElementById('timer-circle');
pieChart.width = pieChart.height = 100;

var counter = document.createElement("p");


var ctx = pieChart.getContext('2d');
var secondsPassed = 0;

interval = setInterval(function() {
  ctx.clearRect(0, 0, pieChart.width, pieChart.height);
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, 0, Math.PI*2);
  ctx.fillStyle = '#03879E';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, -Math.PI/2, (-Math.PI/2) + Math.PI*2*secondsPassed/30);
  ctx.fillStyle = '#00ADEF';
  ctx.fill();
  ctx.font = "30px Verdana";
  ctx.fillStyle = "white";
  secondsPassed++;
}, 1000);


time_left = 30;
trialTimer = setInterval(function(){
  if(time_left <= 9){
    ctx.fillText(Math.trunc(time_left), 40, 60);
  } else {
    ctx.fillText(Math.trunc(time_left), 31, 60);
  }
  time_left -= 1;
}, 1000);

// motivational speech items
motivations = ['The more we practice, the better we get!',
              'The bigger the challenge, the bigger the victory!',
              'The best way to learn is to make mistakes!',
              'I know that you can do this!',
              'This can sometimes be tough - but you can do it!',
              'Hard work will always pay off!',
              'Stay focused - you can do this!',
              'Just 30 minutes of practice - easy peasy!',
              'You’re doing great - I’m proud of you!',
              'Even if you get stuck, just keep trying - you’ll get it!',
              'My favourite feeling is making progress after getting stuck for a while!',
              'Practice makes perfect!',
              'Every question you answer helps, even if you get it wrong!',
              'Practice can sometimes be boring - but it always pays off!',
              'Over 1000 people have already used this training...that is a lot!',
              'The 30 second countdown keeps you on your toes!',
              'The training can be frustrating, but it can be fun too!',
              'Try to treat the training like a puzzle that you can solve!',
              'Focus on getting the answers right - do not worry if you are slow!',
              'You will get faster and faster with more practice!',
              'If you are finding it easy, try to go faster!',
              'The training is designed to make you smarter - so do not worry if you do not feel smart at the start!',
              'Remember, getting answers wrong is how you learn!',
              'Try answer the questions in your head - do not write anything down!',
              'Training many times over a few weeks makes the training even more powerful!',
              'It is better to be right than to be fast - speed comes with practice!',
              'Try to push yourself a little bit more in every new session!',
              'Shortcuts will not make you smarter - solving the problems with hard work will!',
              'Easy, medium, hard, it does not matter - every question you answer helps you!',
              'Getting better can take time - be patient and never give up!',
              'How do you catch a squirrel?<br>Climb up a tree and act like a nut!',
              'I believe in you!',
              'You can do it - keep pushing!',
              'Be proud of yourself for working hard!',
              'Sometimes you will pass many levels, other times you will not - but it is all practice!',
              'Practice is always valuable!']
},
                    "after:end": function anonymous(
) {
clearInterval(interval)
clearInterval(trialTimer)

this.state.first_trial = 0;
}
                  },
                  "title": "whole-trial-frame",
                  "tardy": true,
                  "skip": "${this.state.skip_chunk == 1}",
                  "content": {
                    "type": "lab.flow.Sequence",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "trial_sequence",
                    "tardy": true,
                    "skip": "${this.state.skip_chunk == 1}",
                    "content": [
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage <= 103) {


if (this.parameters.stage <= 55) {
  this.parameters.q_word = "Is";
} else if (this.parameters.stage <= 81 && this.parameters.stage >= 56) {
  this.parameters.q_word = "Does";
};
  
this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2


if (this.parameters.stim_3_id == 1) { 
  this.parameters.stim_3 = this.state.stimulus_1;
} else if (this.parameters.stim_3_id == 2) { 
  this.parameters.stim_3 = this.state.stimulus_2;
} else if (this.parameters.stim_3_id == 3) {
  this.parameters.stim_3 = this.state.stimulus_3;
} else if (this.parameters.stim_3_id == 4) {
  this.parameters.stim_3 = this.state.stimulus_4;
};

if (this.parameters.stim_4_id == 1) { 
  this.parameters.stim_4 = this.state.stimulus_1;
} else if (this.parameters.stim_4_id == 2) {
  this.parameters.stim_4 = this.state.stimulus_2;
} else if (this.parameters.stim_4_id == 3) {
  this.parameters.stim_4 = this.state.stimulus_3;
} else if (this.parameters.stim_4_id == 4) {
  this.parameters.stim_4 = this.state.stimulus_4;
};;

if (this.parameters.stim_5_id == 1) { 
  this.parameters.stim_5 = this.state.stimulus_1;
} else if (this.parameters.stim_5_id == 2) {
  this.parameters.stim_5 = this.state.stimulus_2;
} else if (this.parameters.stim_5_id == 3) { 
  this.parameters.stim_5 = this.state.stimulus_3;
} else if (this.parameters.stim_5_id == 4) {
  this.parameters.stim_5 = this.state.stimulus_4;
};

if (this.parameters.stim_6_id == 1) { 
  this.parameters.stim_6 = this.state.stimulus_1;
} else if (this.parameters.stim_6_id == 2) {
  this.parameters.stim_6 = this.state.stimulus_2;
} else if (this.parameters.stim_6_id == 3) { 
  this.parameters.stim_6 = this.state.stimulus_3;
} else if (this.parameters.stim_6_id == 4) {
  this.parameters.stim_6 = this.state.stimulus_4;
}

if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
} 
if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
} 

};
},
                          "after:end": function anonymous(
) {
if (this.state.stage <= 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)


// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};
if (this.state.phase == "Testing" & this.state.correct == true) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" & this.state.correct == false) {
  this.state.current_tally = 0;
};

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}

};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;


}
                        },
                        "title": "standard_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4} \u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_5} ${this.parameters.relation_3} ${this.parameters.stim_6} \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"separator\"\u003E\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003E 103}"
                      },
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage > 103) {

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.stim_3 = this.state.stimulus_3
this.parameters.stim_4 = this.state.stimulus_4
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2
this.parameters.q_stim_3 = this.state.stimulus_3
this.parameters.q_stim_4 = this.state.stimulus_4

if (this.parameters.meta_stim_1_id == 1) { 
  this.parameters.meta_stim_1 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_1_id == 2) {
  this.parameters.meta_stim_1 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_1_id == 3) {
  this.parameters.meta_stim_1 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_1_id == 4) {
  this.parameters.meta_stim_1 = this.state.stimulus_4;
};

if (this.parameters.meta_stim_2_id == 1) { 
  this.parameters.meta_stim_2 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_2_id == 2) {
  this.parameters.meta_stim_2 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_2_id == 3) {
  this.parameters.meta_stim_2 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_2_id == 4) {
  this.parameters.meta_stim_2 = this.state.stimulus_4;
};


if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
};

if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
};


};
},
                          "after:end": function anonymous(
) {
if (this.state.stage > 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)

// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};

if (this.state.phase == "Testing" && this.state.correct == 1) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" && this.state.correct == 0) {
  this.state.current_tally = 0
}

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}
};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;

}
                        },
                        "title": "mathematical_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_relation_1}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_stim_1} ${this.parameters.meta_relation_2} ${this.parameters.meta_stim_2}\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003C 103}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 167.11,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#a8ca09",
                            "text": "CORRECT!",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally += 1
}
                        },
                        "title": "correct",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${this.state.correct == 0 || this.state.trial_time \u003E= 30000 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 126.2,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#d6341a",
                            "text": "WRONG",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally = 0
}
                        },
                        "title": "wrong",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${(this.state.correct != 0 & this.state.trial_time \u003C 30000) || this.state.correct == 1 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      }
                    ]
                  }
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "Training part completed!",
                      "content": "You got 16 correct answers in a row in the training part of this level!\u003Cbr\u003E\u003Cbr\u003EYou will now move on to the testing part. Get all 16 testing questions correct, and you move on to the next level.\u003Cbr\u003EBut be careful: if you get even one wrong, you have to start the training part all over again!\u003Cbr\u003E\u003Cbr\u003EWhen you're ready, click 'continue' to start the testing part of this level. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.phase = "Testing";
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "Trial 1 of 16";
this.state.current_tally = 0;
}
                  },
                  "title": "phase_transition",
                  "tardy": true,
                  "skip": "${this.state.current_tally != 16 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "",
                      "content": "You didn’t manage to get all of the questions right in that round. You’ll go back to the training part of this level. Don’t worry - practice makes perfect! Keep trying and you will get there. When you’re ready, click on “continue” to keep going. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.testing_trial_number = 1;
this.state.phase = "Training";
this.state.current_tally = 0;
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "";

}
                  },
                  "title": "return_to_training",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.testing_trial_number \u003C 17 || (this.state.testing_trial_number == 17 & this.state.current_tally \u003E 15) || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.flow.Sequence",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
document.getElementById("level-display").innerHTML = "";
document.getElementById("trial-display").innerHTML = "";

this.state.stage = ~~this.state.stage + 1;
}
                  },
                  "title": "level_transition",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.current_tally \u003C 16 || this.state.skip_chunk == 1}",
                  "content": [
                    {
                      "type": "lab.html.Screen",
                      "files": {},
                      "responses": {
                        "mousedown button#continue": "continue"
                      },
                      "parameters": {},
                      "messageHandlers": {
                        "run": function anonymous(
) {
this.state.skip_chunk = 1
}
                      },
                      "title": "next_stage",
                      "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n\n      \u003Cdiv\u003E\n      \u003Cp\u003E You just unlocked a new stage - great job!\u003Cbr\u003E\u003Cbr\u003EFeel free to take a few seconds as a break, and when you're ready,\u003Cbr\u003Eclick \"Continue\" to move on to the next level. Good luck to you both!\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\n      \u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\n      \u003Cbutton id=\"continue\"\u003EContinue\u003C\u002Fbutton\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
                      "tardy": true,
                      "skip": "${this.state.skip_chunk == 1}"
                    }
                  ]
                }
              ]
            }
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
this.state.skip_chunk = 0
this.state.phase = "Training"
this.state.testing_trial_number = 1
this.state.current_tally = 0
this.state.stage = (Number(this.state.stage) + 1).toString()
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
}
            },
            "title": "skip_chunk_reset",
            "skip": "${this.state.skip_chunk == 0}",
            "tardy": true,
            "timeout": "1000"
          },
          {
            "type": "lab.flow.Loop",
            "templateParameters": [],
            "sample": {
              "mode": "draw-shuffle",
              "n": "200"
            },
            "files": {
              "stage_5.csv": "embedded\u002Fbf5cd0b1a80923bdb06069b9f2500967ae66845e2586046e12de7681017f8e82.csv",
              "stage_118.csv": "embedded\u002Fb63062f65b4cd3ae94899aa25daf1ae670f0b4af11ddc7e455828b8cd151e5c7.csv",
              "stage_10.csv": "embedded\u002F687d3f4e9a518dff10b23ec3a9a3246e56ef9293e267668a20916a3b0c41f7ba.csv",
              "stage_11.csv": "embedded\u002F5711cf764bd9767fb4af2018d440a7c1c908002d8eba71a4da850298fa10011a.csv"
            },
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "before:prepare": async function anonymous(
) {
this.state.url_text = "https://www.drjamiecummins.com/school-rct/st-pauls/trials/stage_";
this.state.file_type = ".csv";


this.state.url = this.state.url_text.concat(this.state.stage, this.state.file_type)

var csv2json = await new Promise((resolve, reject) => {
  Papa.parse(this.state.url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(result) {
      resolve(result.data);
    }
  })
})
console.log(csv2json)
this.options.templateParameters = csv2json




this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2

this.state.current_tally = 0
this.state.testing_trial_number = 1
this.state.phase = "Training"


}
            },
            "title": "trial_chunk",
            "tardy": true,
            "skip": "${this.state.skip_chunk == 1}",
            "shuffleGroups": [],
            "template": {
              "type": "lab.flow.Sequence",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "trials-and-breaks",
              "tardy": true,
              "skip": "${this.state.skip_chunk == 1}",
              "content": [
                {
                  "type": "lab.html.Frame",
                  "contextSelector": "[data-labjs-section=\"frame\"]",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
if (this.state.first_trial == 1) {
document.getElementById("pokemon-motivation").innerHTML = "Let's get started - you've got this!";
};


if (this.state.phase == "Training") {
  document.getElementById("trial-display").innerHTML = this.state.current_tally + " of 16 correct";
} else if (this.state.phase == "Testing") {
  document.getElementById("trial-display").innerHTML = "Trial " + this.state.testing_trial_number + " of 16";
}

var pieChart = document.getElementById('timer-circle');
pieChart.width = pieChart.height = 100;

var counter = document.createElement("p");


var ctx = pieChart.getContext('2d');
var secondsPassed = 0;

interval = setInterval(function() {
  ctx.clearRect(0, 0, pieChart.width, pieChart.height);
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, 0, Math.PI*2);
  ctx.fillStyle = '#03879E';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, -Math.PI/2, (-Math.PI/2) + Math.PI*2*secondsPassed/30);
  ctx.fillStyle = '#00ADEF';
  ctx.fill();
  ctx.font = "30px Verdana";
  ctx.fillStyle = "white";
  secondsPassed++;
}, 1000);


time_left = 30;
trialTimer = setInterval(function(){
  if(time_left <= 9){
    ctx.fillText(Math.trunc(time_left), 40, 60);
  } else {
    ctx.fillText(Math.trunc(time_left), 31, 60);
  }
  time_left -= 1;
}, 1000);

// motivational speech items
motivations = ['The more we practice, the better we get!',
              'The bigger the challenge, the bigger the victory!',
              'The best way to learn is to make mistakes!',
              'I know that you can do this!',
              'This can sometimes be tough - but you can do it!',
              'Hard work will always pay off!',
              'Stay focused - you can do this!',
              'Just 30 minutes of practice - easy peasy!',
              'You’re doing great - I’m proud of you!',
              'Even if you get stuck, just keep trying - you’ll get it!',
              'My favourite feeling is making progress after getting stuck for a while!',
              'Practice makes perfect!',
              'Every question you answer helps, even if you get it wrong!',
              'Practice can sometimes be boring - but it always pays off!',
              'Over 1000 people have already used this training...that is a lot!',
              'The 30 second countdown keeps you on your toes!',
              'The training can be frustrating, but it can be fun too!',
              'Try to treat the training like a puzzle that you can solve!',
              'Focus on getting the answers right - do not worry if you are slow!',
              'You will get faster and faster with more practice!',
              'If you are finding it easy, try to go faster!',
              'The training is designed to make you smarter - so do not worry if you do not feel smart at the start!',
              'Remember, getting answers wrong is how you learn!',
              'Try answer the questions in your head - do not write anything down!',
              'Training many times over a few weeks makes the training even more powerful!',
              'It is better to be right than to be fast - speed comes with practice!',
              'Try to push yourself a little bit more in every new session!',
              'Shortcuts will not make you smarter - solving the problems with hard work will!',
              'Easy, medium, hard, it does not matter - every question you answer helps you!',
              'Getting better can take time - be patient and never give up!',
              'How do you catch a squirrel?<br>Climb up a tree and act like a nut!',
              'I believe in you!',
              'You can do it - keep pushing!',
              'Be proud of yourself for working hard!',
              'Sometimes you will pass many levels, other times you will not - but it is all practice!',
              'Practice is always valuable!']
},
                    "after:end": function anonymous(
) {
clearInterval(interval)
clearInterval(trialTimer)

this.state.first_trial = 0;
}
                  },
                  "title": "whole-trial-frame",
                  "tardy": true,
                  "skip": "${this.state.skip_chunk == 1}",
                  "content": {
                    "type": "lab.flow.Sequence",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "trial_sequence",
                    "tardy": true,
                    "skip": "${this.state.skip_chunk == 1}",
                    "content": [
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage <= 103) {


if (this.parameters.stage <= 55) {
  this.parameters.q_word = "Is";
} else if (this.parameters.stage <= 81 && this.parameters.stage >= 56) {
  this.parameters.q_word = "Does";
};
  
this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2


if (this.parameters.stim_3_id == 1) { 
  this.parameters.stim_3 = this.state.stimulus_1;
} else if (this.parameters.stim_3_id == 2) { 
  this.parameters.stim_3 = this.state.stimulus_2;
} else if (this.parameters.stim_3_id == 3) {
  this.parameters.stim_3 = this.state.stimulus_3;
} else if (this.parameters.stim_3_id == 4) {
  this.parameters.stim_3 = this.state.stimulus_4;
};

if (this.parameters.stim_4_id == 1) { 
  this.parameters.stim_4 = this.state.stimulus_1;
} else if (this.parameters.stim_4_id == 2) {
  this.parameters.stim_4 = this.state.stimulus_2;
} else if (this.parameters.stim_4_id == 3) {
  this.parameters.stim_4 = this.state.stimulus_3;
} else if (this.parameters.stim_4_id == 4) {
  this.parameters.stim_4 = this.state.stimulus_4;
};;

if (this.parameters.stim_5_id == 1) { 
  this.parameters.stim_5 = this.state.stimulus_1;
} else if (this.parameters.stim_5_id == 2) {
  this.parameters.stim_5 = this.state.stimulus_2;
} else if (this.parameters.stim_5_id == 3) { 
  this.parameters.stim_5 = this.state.stimulus_3;
} else if (this.parameters.stim_5_id == 4) {
  this.parameters.stim_5 = this.state.stimulus_4;
};

if (this.parameters.stim_6_id == 1) { 
  this.parameters.stim_6 = this.state.stimulus_1;
} else if (this.parameters.stim_6_id == 2) {
  this.parameters.stim_6 = this.state.stimulus_2;
} else if (this.parameters.stim_6_id == 3) { 
  this.parameters.stim_6 = this.state.stimulus_3;
} else if (this.parameters.stim_6_id == 4) {
  this.parameters.stim_6 = this.state.stimulus_4;
}

if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
} 
if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
} 

};
},
                          "after:end": function anonymous(
) {
if (this.state.stage <= 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)


// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};
if (this.state.phase == "Testing" & this.state.correct == true) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" & this.state.correct == false) {
  this.state.current_tally = 0;
};

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}

};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;


}
                        },
                        "title": "standard_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4} \u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_5} ${this.parameters.relation_3} ${this.parameters.stim_6} \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"separator\"\u003E\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003E 103}"
                      },
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage > 103) {

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.stim_3 = this.state.stimulus_3
this.parameters.stim_4 = this.state.stimulus_4
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2
this.parameters.q_stim_3 = this.state.stimulus_3
this.parameters.q_stim_4 = this.state.stimulus_4

if (this.parameters.meta_stim_1_id == 1) { 
  this.parameters.meta_stim_1 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_1_id == 2) {
  this.parameters.meta_stim_1 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_1_id == 3) {
  this.parameters.meta_stim_1 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_1_id == 4) {
  this.parameters.meta_stim_1 = this.state.stimulus_4;
};

if (this.parameters.meta_stim_2_id == 1) { 
  this.parameters.meta_stim_2 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_2_id == 2) {
  this.parameters.meta_stim_2 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_2_id == 3) {
  this.parameters.meta_stim_2 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_2_id == 4) {
  this.parameters.meta_stim_2 = this.state.stimulus_4;
};


if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
};

if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
};


};
},
                          "after:end": function anonymous(
) {
if (this.state.stage > 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)

// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};

if (this.state.phase == "Testing" && this.state.correct == 1) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" && this.state.correct == 0) {
  this.state.current_tally = 0
}

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}
};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;

}
                        },
                        "title": "mathematical_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_relation_1}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_stim_1} ${this.parameters.meta_relation_2} ${this.parameters.meta_stim_2}\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003C 103}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 167.11,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#a8ca09",
                            "text": "CORRECT!",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally += 1
}
                        },
                        "title": "correct",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${this.state.correct == 0 || this.state.trial_time \u003E= 30000 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 126.2,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#d6341a",
                            "text": "WRONG",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally = 0
}
                        },
                        "title": "wrong",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${(this.state.correct != 0 & this.state.trial_time \u003C 30000) || this.state.correct == 1 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      }
                    ]
                  }
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "Training part completed!",
                      "content": "You got 16 correct answers in a row in the training part of this level!\u003Cbr\u003E\u003Cbr\u003EYou will now move on to the testing part. Get all 16 testing questions correct, and you move on to the next level.\u003Cbr\u003EBut be careful: if you get even one wrong, you have to start the training part all over again!\u003Cbr\u003E\u003Cbr\u003EWhen you're ready, click 'continue' to start the testing part of this level. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.phase = "Testing";
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "Trial 1 of 16";
this.state.current_tally = 0;
}
                  },
                  "title": "phase_transition",
                  "tardy": true,
                  "skip": "${this.state.current_tally != 16 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "",
                      "content": "You didn’t manage to get all of the questions right in that round. You’ll go back to the training part of this level. Don’t worry - practice makes perfect! Keep trying and you will get there. When you’re ready, click on “continue” to keep going. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.testing_trial_number = 1;
this.state.phase = "Training";
this.state.current_tally = 0;
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "";

}
                  },
                  "title": "return_to_training",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.testing_trial_number \u003C 17 || (this.state.testing_trial_number == 17 & this.state.current_tally \u003E 15) || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.flow.Sequence",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
document.getElementById("level-display").innerHTML = "";
document.getElementById("trial-display").innerHTML = "";

this.state.stage = ~~this.state.stage + 1;
}
                  },
                  "title": "level_transition",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.current_tally \u003C 16 || this.state.skip_chunk == 1}",
                  "content": [
                    {
                      "type": "lab.html.Screen",
                      "files": {},
                      "responses": {
                        "mousedown button#continue": "continue"
                      },
                      "parameters": {},
                      "messageHandlers": {
                        "run": function anonymous(
) {
this.state.skip_chunk = 1
}
                      },
                      "title": "next_stage",
                      "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n\n      \u003Cdiv\u003E\n      \u003Cp\u003E You just unlocked a new stage - great job!\u003Cbr\u003E\u003Cbr\u003EFeel free to take a few seconds as a break, and when you're ready,\u003Cbr\u003Eclick \"Continue\" to move on to the next level. Good luck to you both!\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\n      \u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\n      \u003Cbutton id=\"continue\"\u003EContinue\u003C\u002Fbutton\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
                      "tardy": true,
                      "skip": "${this.state.skip_chunk == 1}"
                    }
                  ]
                }
              ]
            }
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
this.state.skip_chunk = 0
this.state.phase = "Training"
this.state.testing_trial_number = 1
this.state.current_tally = 0
this.state.stage = (Number(this.state.stage) + 1).toString()
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
}
            },
            "title": "skip_chunk_reset",
            "skip": "${this.state.skip_chunk == 0}",
            "tardy": true,
            "timeout": "1000"
          },
          {
            "type": "lab.flow.Loop",
            "templateParameters": [],
            "sample": {
              "mode": "draw-shuffle",
              "n": "200"
            },
            "files": {
              "stage_5.csv": "embedded\u002Fbf5cd0b1a80923bdb06069b9f2500967ae66845e2586046e12de7681017f8e82.csv",
              "stage_118.csv": "embedded\u002Fb63062f65b4cd3ae94899aa25daf1ae670f0b4af11ddc7e455828b8cd151e5c7.csv",
              "stage_10.csv": "embedded\u002F687d3f4e9a518dff10b23ec3a9a3246e56ef9293e267668a20916a3b0c41f7ba.csv",
              "stage_11.csv": "embedded\u002F5711cf764bd9767fb4af2018d440a7c1c908002d8eba71a4da850298fa10011a.csv"
            },
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "before:prepare": async function anonymous(
) {
this.state.url_text = "https://www.drjamiecummins.com/school-rct/st-pauls/trials/stage_";
this.state.file_type = ".csv";


this.state.url = this.state.url_text.concat(this.state.stage, this.state.file_type)

var csv2json = await new Promise((resolve, reject) => {
  Papa.parse(this.state.url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(result) {
      resolve(result.data);
    }
  })
})
console.log(csv2json)
this.options.templateParameters = csv2json




this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2

this.state.current_tally = 0
this.state.testing_trial_number = 1
this.state.phase = "Training"


}
            },
            "title": "trial_chunk",
            "tardy": true,
            "skip": "${this.state.skip_chunk == 1}",
            "shuffleGroups": [],
            "template": {
              "type": "lab.flow.Sequence",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "trials-and-breaks",
              "tardy": true,
              "skip": "${this.state.skip_chunk == 1}",
              "content": [
                {
                  "type": "lab.html.Frame",
                  "contextSelector": "[data-labjs-section=\"frame\"]",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
if (this.state.first_trial == 1) {
document.getElementById("pokemon-motivation").innerHTML = "Let's get started - you've got this!";
};


if (this.state.phase == "Training") {
  document.getElementById("trial-display").innerHTML = this.state.current_tally + " of 16 correct";
} else if (this.state.phase == "Testing") {
  document.getElementById("trial-display").innerHTML = "Trial " + this.state.testing_trial_number + " of 16";
}

var pieChart = document.getElementById('timer-circle');
pieChart.width = pieChart.height = 100;

var counter = document.createElement("p");


var ctx = pieChart.getContext('2d');
var secondsPassed = 0;

interval = setInterval(function() {
  ctx.clearRect(0, 0, pieChart.width, pieChart.height);
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, 0, Math.PI*2);
  ctx.fillStyle = '#03879E';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, -Math.PI/2, (-Math.PI/2) + Math.PI*2*secondsPassed/30);
  ctx.fillStyle = '#00ADEF';
  ctx.fill();
  ctx.font = "30px Verdana";
  ctx.fillStyle = "white";
  secondsPassed++;
}, 1000);


time_left = 30;
trialTimer = setInterval(function(){
  if(time_left <= 9){
    ctx.fillText(Math.trunc(time_left), 40, 60);
  } else {
    ctx.fillText(Math.trunc(time_left), 31, 60);
  }
  time_left -= 1;
}, 1000);

// motivational speech items
motivations = ['The more we practice, the better we get!',
              'The bigger the challenge, the bigger the victory!',
              'The best way to learn is to make mistakes!',
              'I know that you can do this!',
              'This can sometimes be tough - but you can do it!',
              'Hard work will always pay off!',
              'Stay focused - you can do this!',
              'Just 30 minutes of practice - easy peasy!',
              'You’re doing great - I’m proud of you!',
              'Even if you get stuck, just keep trying - you’ll get it!',
              'My favourite feeling is making progress after getting stuck for a while!',
              'Practice makes perfect!',
              'Every question you answer helps, even if you get it wrong!',
              'Practice can sometimes be boring - but it always pays off!',
              'Over 1000 people have already used this training...that is a lot!',
              'The 30 second countdown keeps you on your toes!',
              'The training can be frustrating, but it can be fun too!',
              'Try to treat the training like a puzzle that you can solve!',
              'Focus on getting the answers right - do not worry if you are slow!',
              'You will get faster and faster with more practice!',
              'If you are finding it easy, try to go faster!',
              'The training is designed to make you smarter - so do not worry if you do not feel smart at the start!',
              'Remember, getting answers wrong is how you learn!',
              'Try answer the questions in your head - do not write anything down!',
              'Training many times over a few weeks makes the training even more powerful!',
              'It is better to be right than to be fast - speed comes with practice!',
              'Try to push yourself a little bit more in every new session!',
              'Shortcuts will not make you smarter - solving the problems with hard work will!',
              'Easy, medium, hard, it does not matter - every question you answer helps you!',
              'Getting better can take time - be patient and never give up!',
              'How do you catch a squirrel?<br>Climb up a tree and act like a nut!',
              'I believe in you!',
              'You can do it - keep pushing!',
              'Be proud of yourself for working hard!',
              'Sometimes you will pass many levels, other times you will not - but it is all practice!',
              'Practice is always valuable!']
},
                    "after:end": function anonymous(
) {
clearInterval(interval)
clearInterval(trialTimer)

this.state.first_trial = 0;
}
                  },
                  "title": "whole-trial-frame",
                  "tardy": true,
                  "skip": "${this.state.skip_chunk == 1}",
                  "content": {
                    "type": "lab.flow.Sequence",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "trial_sequence",
                    "tardy": true,
                    "skip": "${this.state.skip_chunk == 1}",
                    "content": [
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage <= 103) {


if (this.parameters.stage <= 55) {
  this.parameters.q_word = "Is";
} else if (this.parameters.stage <= 81 && this.parameters.stage >= 56) {
  this.parameters.q_word = "Does";
};
  
this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2


if (this.parameters.stim_3_id == 1) { 
  this.parameters.stim_3 = this.state.stimulus_1;
} else if (this.parameters.stim_3_id == 2) { 
  this.parameters.stim_3 = this.state.stimulus_2;
} else if (this.parameters.stim_3_id == 3) {
  this.parameters.stim_3 = this.state.stimulus_3;
} else if (this.parameters.stim_3_id == 4) {
  this.parameters.stim_3 = this.state.stimulus_4;
};

if (this.parameters.stim_4_id == 1) { 
  this.parameters.stim_4 = this.state.stimulus_1;
} else if (this.parameters.stim_4_id == 2) {
  this.parameters.stim_4 = this.state.stimulus_2;
} else if (this.parameters.stim_4_id == 3) {
  this.parameters.stim_4 = this.state.stimulus_3;
} else if (this.parameters.stim_4_id == 4) {
  this.parameters.stim_4 = this.state.stimulus_4;
};;

if (this.parameters.stim_5_id == 1) { 
  this.parameters.stim_5 = this.state.stimulus_1;
} else if (this.parameters.stim_5_id == 2) {
  this.parameters.stim_5 = this.state.stimulus_2;
} else if (this.parameters.stim_5_id == 3) { 
  this.parameters.stim_5 = this.state.stimulus_3;
} else if (this.parameters.stim_5_id == 4) {
  this.parameters.stim_5 = this.state.stimulus_4;
};

if (this.parameters.stim_6_id == 1) { 
  this.parameters.stim_6 = this.state.stimulus_1;
} else if (this.parameters.stim_6_id == 2) {
  this.parameters.stim_6 = this.state.stimulus_2;
} else if (this.parameters.stim_6_id == 3) { 
  this.parameters.stim_6 = this.state.stimulus_3;
} else if (this.parameters.stim_6_id == 4) {
  this.parameters.stim_6 = this.state.stimulus_4;
}

if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
} 
if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
} 

};
},
                          "after:end": function anonymous(
) {
if (this.state.stage <= 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)


// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};
if (this.state.phase == "Testing" & this.state.correct == true) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" & this.state.correct == false) {
  this.state.current_tally = 0;
};

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}

};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;


}
                        },
                        "title": "standard_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4} \u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_5} ${this.parameters.relation_3} ${this.parameters.stim_6} \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"separator\"\u003E\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003E 103}"
                      },
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage > 103) {

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.stim_3 = this.state.stimulus_3
this.parameters.stim_4 = this.state.stimulus_4
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2
this.parameters.q_stim_3 = this.state.stimulus_3
this.parameters.q_stim_4 = this.state.stimulus_4

if (this.parameters.meta_stim_1_id == 1) { 
  this.parameters.meta_stim_1 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_1_id == 2) {
  this.parameters.meta_stim_1 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_1_id == 3) {
  this.parameters.meta_stim_1 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_1_id == 4) {
  this.parameters.meta_stim_1 = this.state.stimulus_4;
};

if (this.parameters.meta_stim_2_id == 1) { 
  this.parameters.meta_stim_2 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_2_id == 2) {
  this.parameters.meta_stim_2 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_2_id == 3) {
  this.parameters.meta_stim_2 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_2_id == 4) {
  this.parameters.meta_stim_2 = this.state.stimulus_4;
};


if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
};

if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
};


};
},
                          "after:end": function anonymous(
) {
if (this.state.stage > 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)

// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};

if (this.state.phase == "Testing" && this.state.correct == 1) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" && this.state.correct == 0) {
  this.state.current_tally = 0
}

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}
};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;

}
                        },
                        "title": "mathematical_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_relation_1}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_stim_1} ${this.parameters.meta_relation_2} ${this.parameters.meta_stim_2}\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003C 103}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 167.11,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#a8ca09",
                            "text": "CORRECT!",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally += 1
}
                        },
                        "title": "correct",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${this.state.correct == 0 || this.state.trial_time \u003E= 30000 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 126.2,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#d6341a",
                            "text": "WRONG",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally = 0
}
                        },
                        "title": "wrong",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${(this.state.correct != 0 & this.state.trial_time \u003C 30000) || this.state.correct == 1 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      }
                    ]
                  }
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "Training part completed!",
                      "content": "You got 16 correct answers in a row in the training part of this level!\u003Cbr\u003E\u003Cbr\u003EYou will now move on to the testing part. Get all 16 testing questions correct, and you move on to the next level.\u003Cbr\u003EBut be careful: if you get even one wrong, you have to start the training part all over again!\u003Cbr\u003E\u003Cbr\u003EWhen you're ready, click 'continue' to start the testing part of this level. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.phase = "Testing";
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "Trial 1 of 16";
this.state.current_tally = 0;
}
                  },
                  "title": "phase_transition",
                  "tardy": true,
                  "skip": "${this.state.current_tally != 16 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "",
                      "content": "You didn’t manage to get all of the questions right in that round. You’ll go back to the training part of this level. Don’t worry - practice makes perfect! Keep trying and you will get there. When you’re ready, click on “continue” to keep going. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.testing_trial_number = 1;
this.state.phase = "Training";
this.state.current_tally = 0;
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "";

}
                  },
                  "title": "return_to_training",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.testing_trial_number \u003C 17 || (this.state.testing_trial_number == 17 & this.state.current_tally \u003E 15) || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.flow.Sequence",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
document.getElementById("level-display").innerHTML = "";
document.getElementById("trial-display").innerHTML = "";

this.state.stage = ~~this.state.stage + 1;
}
                  },
                  "title": "level_transition",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.current_tally \u003C 16 || this.state.skip_chunk == 1}",
                  "content": [
                    {
                      "type": "lab.html.Screen",
                      "files": {},
                      "responses": {
                        "mousedown button#continue": "continue"
                      },
                      "parameters": {},
                      "messageHandlers": {
                        "run": function anonymous(
) {
this.state.skip_chunk = 1
}
                      },
                      "title": "next_stage",
                      "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n\n      \u003Cdiv\u003E\n      \u003Cp\u003E You just unlocked a new stage - great job!\u003Cbr\u003E\u003Cbr\u003EFeel free to take a few seconds as a break, and when you're ready,\u003Cbr\u003Eclick \"Continue\" to move on to the next level. Good luck to you both!\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\n      \u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\n      \u003Cbutton id=\"continue\"\u003EContinue\u003C\u002Fbutton\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
                      "tardy": true,
                      "skip": "${this.state.skip_chunk == 1}"
                    }
                  ]
                }
              ]
            }
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
this.state.skip_chunk = 0
this.state.phase = "Training"
this.state.testing_trial_number = 1
this.state.current_tally = 0
this.state.stage = (Number(this.state.stage) + 1).toString()
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
}
            },
            "title": "skip_chunk_reset",
            "skip": "${this.state.skip_chunk == 0}",
            "tardy": true,
            "timeout": "1000"
          },
          {
            "type": "lab.flow.Loop",
            "templateParameters": [],
            "sample": {
              "mode": "draw-shuffle",
              "n": "200"
            },
            "files": {
              "stage_5.csv": "embedded\u002Fbf5cd0b1a80923bdb06069b9f2500967ae66845e2586046e12de7681017f8e82.csv",
              "stage_118.csv": "embedded\u002Fb63062f65b4cd3ae94899aa25daf1ae670f0b4af11ddc7e455828b8cd151e5c7.csv",
              "stage_10.csv": "embedded\u002F687d3f4e9a518dff10b23ec3a9a3246e56ef9293e267668a20916a3b0c41f7ba.csv",
              "stage_11.csv": "embedded\u002F5711cf764bd9767fb4af2018d440a7c1c908002d8eba71a4da850298fa10011a.csv"
            },
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "before:prepare": async function anonymous(
) {
this.state.url_text = "https://www.drjamiecummins.com/school-rct/st-pauls/trials/stage_";
this.state.file_type = ".csv";


this.state.url = this.state.url_text.concat(this.state.stage, this.state.file_type)

var csv2json = await new Promise((resolve, reject) => {
  Papa.parse(this.state.url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(result) {
      resolve(result.data);
    }
  })
})
console.log(csv2json)
this.options.templateParameters = csv2json




this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2

this.state.current_tally = 0
this.state.testing_trial_number = 1
this.state.phase = "Training"


}
            },
            "title": "trial_chunk",
            "tardy": true,
            "skip": "${this.state.skip_chunk == 1}",
            "shuffleGroups": [],
            "template": {
              "type": "lab.flow.Sequence",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "trials-and-breaks",
              "tardy": true,
              "skip": "${this.state.skip_chunk == 1}",
              "content": [
                {
                  "type": "lab.html.Frame",
                  "contextSelector": "[data-labjs-section=\"frame\"]",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
if (this.state.first_trial == 1) {
document.getElementById("pokemon-motivation").innerHTML = "Let's get started - you've got this!";
};


if (this.state.phase == "Training") {
  document.getElementById("trial-display").innerHTML = this.state.current_tally + " of 16 correct";
} else if (this.state.phase == "Testing") {
  document.getElementById("trial-display").innerHTML = "Trial " + this.state.testing_trial_number + " of 16";
}

var pieChart = document.getElementById('timer-circle');
pieChart.width = pieChart.height = 100;

var counter = document.createElement("p");


var ctx = pieChart.getContext('2d');
var secondsPassed = 0;

interval = setInterval(function() {
  ctx.clearRect(0, 0, pieChart.width, pieChart.height);
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, 0, Math.PI*2);
  ctx.fillStyle = '#03879E';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, -Math.PI/2, (-Math.PI/2) + Math.PI*2*secondsPassed/30);
  ctx.fillStyle = '#00ADEF';
  ctx.fill();
  ctx.font = "30px Verdana";
  ctx.fillStyle = "white";
  secondsPassed++;
}, 1000);


time_left = 30;
trialTimer = setInterval(function(){
  if(time_left <= 9){
    ctx.fillText(Math.trunc(time_left), 40, 60);
  } else {
    ctx.fillText(Math.trunc(time_left), 31, 60);
  }
  time_left -= 1;
}, 1000);

// motivational speech items
motivations = ['The more we practice, the better we get!',
              'The bigger the challenge, the bigger the victory!',
              'The best way to learn is to make mistakes!',
              'I know that you can do this!',
              'This can sometimes be tough - but you can do it!',
              'Hard work will always pay off!',
              'Stay focused - you can do this!',
              'Just 30 minutes of practice - easy peasy!',
              'You’re doing great - I’m proud of you!',
              'Even if you get stuck, just keep trying - you’ll get it!',
              'My favourite feeling is making progress after getting stuck for a while!',
              'Practice makes perfect!',
              'Every question you answer helps, even if you get it wrong!',
              'Practice can sometimes be boring - but it always pays off!',
              'Over 1000 people have already used this training...that is a lot!',
              'The 30 second countdown keeps you on your toes!',
              'The training can be frustrating, but it can be fun too!',
              'Try to treat the training like a puzzle that you can solve!',
              'Focus on getting the answers right - do not worry if you are slow!',
              'You will get faster and faster with more practice!',
              'If you are finding it easy, try to go faster!',
              'The training is designed to make you smarter - so do not worry if you do not feel smart at the start!',
              'Remember, getting answers wrong is how you learn!',
              'Try answer the questions in your head - do not write anything down!',
              'Training many times over a few weeks makes the training even more powerful!',
              'It is better to be right than to be fast - speed comes with practice!',
              'Try to push yourself a little bit more in every new session!',
              'Shortcuts will not make you smarter - solving the problems with hard work will!',
              'Easy, medium, hard, it does not matter - every question you answer helps you!',
              'Getting better can take time - be patient and never give up!',
              'How do you catch a squirrel?<br>Climb up a tree and act like a nut!',
              'I believe in you!',
              'You can do it - keep pushing!',
              'Be proud of yourself for working hard!',
              'Sometimes you will pass many levels, other times you will not - but it is all practice!',
              'Practice is always valuable!']
},
                    "after:end": function anonymous(
) {
clearInterval(interval)
clearInterval(trialTimer)

this.state.first_trial = 0;
}
                  },
                  "title": "whole-trial-frame",
                  "tardy": true,
                  "skip": "${this.state.skip_chunk == 1}",
                  "content": {
                    "type": "lab.flow.Sequence",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "trial_sequence",
                    "tardy": true,
                    "skip": "${this.state.skip_chunk == 1}",
                    "content": [
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage <= 103) {


if (this.parameters.stage <= 55) {
  this.parameters.q_word = "Is";
} else if (this.parameters.stage <= 81 && this.parameters.stage >= 56) {
  this.parameters.q_word = "Does";
};
  
this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2


if (this.parameters.stim_3_id == 1) { 
  this.parameters.stim_3 = this.state.stimulus_1;
} else if (this.parameters.stim_3_id == 2) { 
  this.parameters.stim_3 = this.state.stimulus_2;
} else if (this.parameters.stim_3_id == 3) {
  this.parameters.stim_3 = this.state.stimulus_3;
} else if (this.parameters.stim_3_id == 4) {
  this.parameters.stim_3 = this.state.stimulus_4;
};

if (this.parameters.stim_4_id == 1) { 
  this.parameters.stim_4 = this.state.stimulus_1;
} else if (this.parameters.stim_4_id == 2) {
  this.parameters.stim_4 = this.state.stimulus_2;
} else if (this.parameters.stim_4_id == 3) {
  this.parameters.stim_4 = this.state.stimulus_3;
} else if (this.parameters.stim_4_id == 4) {
  this.parameters.stim_4 = this.state.stimulus_4;
};;

if (this.parameters.stim_5_id == 1) { 
  this.parameters.stim_5 = this.state.stimulus_1;
} else if (this.parameters.stim_5_id == 2) {
  this.parameters.stim_5 = this.state.stimulus_2;
} else if (this.parameters.stim_5_id == 3) { 
  this.parameters.stim_5 = this.state.stimulus_3;
} else if (this.parameters.stim_5_id == 4) {
  this.parameters.stim_5 = this.state.stimulus_4;
};

if (this.parameters.stim_6_id == 1) { 
  this.parameters.stim_6 = this.state.stimulus_1;
} else if (this.parameters.stim_6_id == 2) {
  this.parameters.stim_6 = this.state.stimulus_2;
} else if (this.parameters.stim_6_id == 3) { 
  this.parameters.stim_6 = this.state.stimulus_3;
} else if (this.parameters.stim_6_id == 4) {
  this.parameters.stim_6 = this.state.stimulus_4;
}

if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
} 
if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
} 

};
},
                          "after:end": function anonymous(
) {
if (this.state.stage <= 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)


// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};
if (this.state.phase == "Testing" & this.state.correct == true) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" & this.state.correct == false) {
  this.state.current_tally = 0;
};

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}

};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;


}
                        },
                        "title": "standard_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4} \u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_5} ${this.parameters.relation_3} ${this.parameters.stim_6} \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"separator\"\u003E\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003E 103}"
                      },
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage > 103) {

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.stim_3 = this.state.stimulus_3
this.parameters.stim_4 = this.state.stimulus_4
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2
this.parameters.q_stim_3 = this.state.stimulus_3
this.parameters.q_stim_4 = this.state.stimulus_4

if (this.parameters.meta_stim_1_id == 1) { 
  this.parameters.meta_stim_1 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_1_id == 2) {
  this.parameters.meta_stim_1 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_1_id == 3) {
  this.parameters.meta_stim_1 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_1_id == 4) {
  this.parameters.meta_stim_1 = this.state.stimulus_4;
};

if (this.parameters.meta_stim_2_id == 1) { 
  this.parameters.meta_stim_2 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_2_id == 2) {
  this.parameters.meta_stim_2 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_2_id == 3) {
  this.parameters.meta_stim_2 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_2_id == 4) {
  this.parameters.meta_stim_2 = this.state.stimulus_4;
};


if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
};

if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
};


};
},
                          "after:end": function anonymous(
) {
if (this.state.stage > 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)

// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};

if (this.state.phase == "Testing" && this.state.correct == 1) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" && this.state.correct == 0) {
  this.state.current_tally = 0
}

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}
};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;

}
                        },
                        "title": "mathematical_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_relation_1}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_stim_1} ${this.parameters.meta_relation_2} ${this.parameters.meta_stim_2}\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003C 103}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 167.11,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#a8ca09",
                            "text": "CORRECT!",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally += 1
}
                        },
                        "title": "correct",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${this.state.correct == 0 || this.state.trial_time \u003E= 30000 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 126.2,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#d6341a",
                            "text": "WRONG",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally = 0
}
                        },
                        "title": "wrong",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${(this.state.correct != 0 & this.state.trial_time \u003C 30000) || this.state.correct == 1 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      }
                    ]
                  }
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "Training part completed!",
                      "content": "You got 16 correct answers in a row in the training part of this level!\u003Cbr\u003E\u003Cbr\u003EYou will now move on to the testing part. Get all 16 testing questions correct, and you move on to the next level.\u003Cbr\u003EBut be careful: if you get even one wrong, you have to start the training part all over again!\u003Cbr\u003E\u003Cbr\u003EWhen you're ready, click 'continue' to start the testing part of this level. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.phase = "Testing";
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "Trial 1 of 16";
this.state.current_tally = 0;
}
                  },
                  "title": "phase_transition",
                  "tardy": true,
                  "skip": "${this.state.current_tally != 16 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "",
                      "content": "You didn’t manage to get all of the questions right in that round. You’ll go back to the training part of this level. Don’t worry - practice makes perfect! Keep trying and you will get there. When you’re ready, click on “continue” to keep going. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.testing_trial_number = 1;
this.state.phase = "Training";
this.state.current_tally = 0;
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "";

}
                  },
                  "title": "return_to_training",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.testing_trial_number \u003C 17 || (this.state.testing_trial_number == 17 & this.state.current_tally \u003E 15) || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.flow.Sequence",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
document.getElementById("level-display").innerHTML = "";
document.getElementById("trial-display").innerHTML = "";

this.state.stage = ~~this.state.stage + 1;
}
                  },
                  "title": "level_transition",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.current_tally \u003C 16 || this.state.skip_chunk == 1}",
                  "content": [
                    {
                      "type": "lab.html.Screen",
                      "files": {},
                      "responses": {
                        "mousedown button#continue": "continue"
                      },
                      "parameters": {},
                      "messageHandlers": {
                        "run": function anonymous(
) {
this.state.skip_chunk = 1
}
                      },
                      "title": "next_stage",
                      "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n\n      \u003Cdiv\u003E\n      \u003Cp\u003E You just unlocked a new stage - great job!\u003Cbr\u003E\u003Cbr\u003EFeel free to take a few seconds as a break, and when you're ready,\u003Cbr\u003Eclick \"Continue\" to move on to the next level. Good luck to you both!\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\n      \u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\n      \u003Cbutton id=\"continue\"\u003EContinue\u003C\u002Fbutton\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
                      "tardy": true,
                      "skip": "${this.state.skip_chunk == 1}"
                    }
                  ]
                }
              ]
            }
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
this.state.skip_chunk = 0
this.state.phase = "Training"
this.state.testing_trial_number = 1
this.state.current_tally = 0
this.state.stage = (Number(this.state.stage) + 1).toString()
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
}
            },
            "title": "skip_chunk_reset",
            "skip": "${this.state.skip_chunk == 0}",
            "tardy": true,
            "timeout": "1000"
          },
          {
            "type": "lab.flow.Loop",
            "templateParameters": [],
            "sample": {
              "mode": "draw-shuffle",
              "n": "200"
            },
            "files": {
              "stage_5.csv": "embedded\u002Fbf5cd0b1a80923bdb06069b9f2500967ae66845e2586046e12de7681017f8e82.csv",
              "stage_118.csv": "embedded\u002Fb63062f65b4cd3ae94899aa25daf1ae670f0b4af11ddc7e455828b8cd151e5c7.csv",
              "stage_10.csv": "embedded\u002F687d3f4e9a518dff10b23ec3a9a3246e56ef9293e267668a20916a3b0c41f7ba.csv",
              "stage_11.csv": "embedded\u002F5711cf764bd9767fb4af2018d440a7c1c908002d8eba71a4da850298fa10011a.csv"
            },
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "before:prepare": async function anonymous(
) {
this.state.url_text = "https://www.drjamiecummins.com/school-rct/st-pauls/trials/stage_";
this.state.file_type = ".csv";


this.state.url = this.state.url_text.concat(this.state.stage, this.state.file_type)

var csv2json = await new Promise((resolve, reject) => {
  Papa.parse(this.state.url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(result) {
      resolve(result.data);
    }
  })
})
console.log(csv2json)
this.options.templateParameters = csv2json




this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2

this.state.current_tally = 0
this.state.testing_trial_number = 1
this.state.phase = "Training"


}
            },
            "title": "trial_chunk",
            "tardy": true,
            "skip": "${this.state.skip_chunk == 1}",
            "shuffleGroups": [],
            "template": {
              "type": "lab.flow.Sequence",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "trials-and-breaks",
              "tardy": true,
              "skip": "${this.state.skip_chunk == 1}",
              "content": [
                {
                  "type": "lab.html.Frame",
                  "contextSelector": "[data-labjs-section=\"frame\"]",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
if (this.state.first_trial == 1) {
document.getElementById("pokemon-motivation").innerHTML = "Let's get started - you've got this!";
};


if (this.state.phase == "Training") {
  document.getElementById("trial-display").innerHTML = this.state.current_tally + " of 16 correct";
} else if (this.state.phase == "Testing") {
  document.getElementById("trial-display").innerHTML = "Trial " + this.state.testing_trial_number + " of 16";
}

var pieChart = document.getElementById('timer-circle');
pieChart.width = pieChart.height = 100;

var counter = document.createElement("p");


var ctx = pieChart.getContext('2d');
var secondsPassed = 0;

interval = setInterval(function() {
  ctx.clearRect(0, 0, pieChart.width, pieChart.height);
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, 0, Math.PI*2);
  ctx.fillStyle = '#03879E';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, -Math.PI/2, (-Math.PI/2) + Math.PI*2*secondsPassed/30);
  ctx.fillStyle = '#00ADEF';
  ctx.fill();
  ctx.font = "30px Verdana";
  ctx.fillStyle = "white";
  secondsPassed++;
}, 1000);


time_left = 30;
trialTimer = setInterval(function(){
  if(time_left <= 9){
    ctx.fillText(Math.trunc(time_left), 40, 60);
  } else {
    ctx.fillText(Math.trunc(time_left), 31, 60);
  }
  time_left -= 1;
}, 1000);

// motivational speech items
motivations = ['The more we practice, the better we get!',
              'The bigger the challenge, the bigger the victory!',
              'The best way to learn is to make mistakes!',
              'I know that you can do this!',
              'This can sometimes be tough - but you can do it!',
              'Hard work will always pay off!',
              'Stay focused - you can do this!',
              'Just 30 minutes of practice - easy peasy!',
              'You’re doing great - I’m proud of you!',
              'Even if you get stuck, just keep trying - you’ll get it!',
              'My favourite feeling is making progress after getting stuck for a while!',
              'Practice makes perfect!',
              'Every question you answer helps, even if you get it wrong!',
              'Practice can sometimes be boring - but it always pays off!',
              'Over 1000 people have already used this training...that is a lot!',
              'The 30 second countdown keeps you on your toes!',
              'The training can be frustrating, but it can be fun too!',
              'Try to treat the training like a puzzle that you can solve!',
              'Focus on getting the answers right - do not worry if you are slow!',
              'You will get faster and faster with more practice!',
              'If you are finding it easy, try to go faster!',
              'The training is designed to make you smarter - so do not worry if you do not feel smart at the start!',
              'Remember, getting answers wrong is how you learn!',
              'Try answer the questions in your head - do not write anything down!',
              'Training many times over a few weeks makes the training even more powerful!',
              'It is better to be right than to be fast - speed comes with practice!',
              'Try to push yourself a little bit more in every new session!',
              'Shortcuts will not make you smarter - solving the problems with hard work will!',
              'Easy, medium, hard, it does not matter - every question you answer helps you!',
              'Getting better can take time - be patient and never give up!',
              'How do you catch a squirrel?<br>Climb up a tree and act like a nut!',
              'I believe in you!',
              'You can do it - keep pushing!',
              'Be proud of yourself for working hard!',
              'Sometimes you will pass many levels, other times you will not - but it is all practice!',
              'Practice is always valuable!']
},
                    "after:end": function anonymous(
) {
clearInterval(interval)
clearInterval(trialTimer)

this.state.first_trial = 0;
}
                  },
                  "title": "whole-trial-frame",
                  "tardy": true,
                  "skip": "${this.state.skip_chunk == 1}",
                  "content": {
                    "type": "lab.flow.Sequence",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "trial_sequence",
                    "tardy": true,
                    "skip": "${this.state.skip_chunk == 1}",
                    "content": [
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage <= 103) {


if (this.parameters.stage <= 55) {
  this.parameters.q_word = "Is";
} else if (this.parameters.stage <= 81 && this.parameters.stage >= 56) {
  this.parameters.q_word = "Does";
};
  
this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2


if (this.parameters.stim_3_id == 1) { 
  this.parameters.stim_3 = this.state.stimulus_1;
} else if (this.parameters.stim_3_id == 2) { 
  this.parameters.stim_3 = this.state.stimulus_2;
} else if (this.parameters.stim_3_id == 3) {
  this.parameters.stim_3 = this.state.stimulus_3;
} else if (this.parameters.stim_3_id == 4) {
  this.parameters.stim_3 = this.state.stimulus_4;
};

if (this.parameters.stim_4_id == 1) { 
  this.parameters.stim_4 = this.state.stimulus_1;
} else if (this.parameters.stim_4_id == 2) {
  this.parameters.stim_4 = this.state.stimulus_2;
} else if (this.parameters.stim_4_id == 3) {
  this.parameters.stim_4 = this.state.stimulus_3;
} else if (this.parameters.stim_4_id == 4) {
  this.parameters.stim_4 = this.state.stimulus_4;
};;

if (this.parameters.stim_5_id == 1) { 
  this.parameters.stim_5 = this.state.stimulus_1;
} else if (this.parameters.stim_5_id == 2) {
  this.parameters.stim_5 = this.state.stimulus_2;
} else if (this.parameters.stim_5_id == 3) { 
  this.parameters.stim_5 = this.state.stimulus_3;
} else if (this.parameters.stim_5_id == 4) {
  this.parameters.stim_5 = this.state.stimulus_4;
};

if (this.parameters.stim_6_id == 1) { 
  this.parameters.stim_6 = this.state.stimulus_1;
} else if (this.parameters.stim_6_id == 2) {
  this.parameters.stim_6 = this.state.stimulus_2;
} else if (this.parameters.stim_6_id == 3) { 
  this.parameters.stim_6 = this.state.stimulus_3;
} else if (this.parameters.stim_6_id == 4) {
  this.parameters.stim_6 = this.state.stimulus_4;
}

if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
} 
if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
} 

};
},
                          "after:end": function anonymous(
) {
if (this.state.stage <= 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)


// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};
if (this.state.phase == "Testing" & this.state.correct == true) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" & this.state.correct == false) {
  this.state.current_tally = 0;
};

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}

};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;


}
                        },
                        "title": "standard_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4} \u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_5} ${this.parameters.relation_3} ${this.parameters.stim_6} \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"separator\"\u003E\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003E 103}"
                      },
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage > 103) {

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.stim_3 = this.state.stimulus_3
this.parameters.stim_4 = this.state.stimulus_4
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2
this.parameters.q_stim_3 = this.state.stimulus_3
this.parameters.q_stim_4 = this.state.stimulus_4

if (this.parameters.meta_stim_1_id == 1) { 
  this.parameters.meta_stim_1 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_1_id == 2) {
  this.parameters.meta_stim_1 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_1_id == 3) {
  this.parameters.meta_stim_1 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_1_id == 4) {
  this.parameters.meta_stim_1 = this.state.stimulus_4;
};

if (this.parameters.meta_stim_2_id == 1) { 
  this.parameters.meta_stim_2 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_2_id == 2) {
  this.parameters.meta_stim_2 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_2_id == 3) {
  this.parameters.meta_stim_2 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_2_id == 4) {
  this.parameters.meta_stim_2 = this.state.stimulus_4;
};


if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
};

if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
};


};
},
                          "after:end": function anonymous(
) {
if (this.state.stage > 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)

// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};

if (this.state.phase == "Testing" && this.state.correct == 1) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" && this.state.correct == 0) {
  this.state.current_tally = 0
}

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}
};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;

}
                        },
                        "title": "mathematical_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_relation_1}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_stim_1} ${this.parameters.meta_relation_2} ${this.parameters.meta_stim_2}\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003C 103}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 167.11,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#a8ca09",
                            "text": "CORRECT!",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally += 1
}
                        },
                        "title": "correct",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${this.state.correct == 0 || this.state.trial_time \u003E= 30000 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 126.2,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#d6341a",
                            "text": "WRONG",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally = 0
}
                        },
                        "title": "wrong",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${(this.state.correct != 0 & this.state.trial_time \u003C 30000) || this.state.correct == 1 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      }
                    ]
                  }
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "Training part completed!",
                      "content": "You got 16 correct answers in a row in the training part of this level!\u003Cbr\u003E\u003Cbr\u003EYou will now move on to the testing part. Get all 16 testing questions correct, and you move on to the next level.\u003Cbr\u003EBut be careful: if you get even one wrong, you have to start the training part all over again!\u003Cbr\u003E\u003Cbr\u003EWhen you're ready, click 'continue' to start the testing part of this level. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.phase = "Testing";
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "Trial 1 of 16";
this.state.current_tally = 0;
}
                  },
                  "title": "phase_transition",
                  "tardy": true,
                  "skip": "${this.state.current_tally != 16 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "",
                      "content": "You didn’t manage to get all of the questions right in that round. You’ll go back to the training part of this level. Don’t worry - practice makes perfect! Keep trying and you will get there. When you’re ready, click on “continue” to keep going. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.testing_trial_number = 1;
this.state.phase = "Training";
this.state.current_tally = 0;
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "";

}
                  },
                  "title": "return_to_training",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.testing_trial_number \u003C 17 || (this.state.testing_trial_number == 17 & this.state.current_tally \u003E 15) || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.flow.Sequence",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
document.getElementById("level-display").innerHTML = "";
document.getElementById("trial-display").innerHTML = "";

this.state.stage = ~~this.state.stage + 1;
}
                  },
                  "title": "level_transition",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.current_tally \u003C 16 || this.state.skip_chunk == 1}",
                  "content": [
                    {
                      "type": "lab.html.Screen",
                      "files": {},
                      "responses": {
                        "mousedown button#continue": "continue"
                      },
                      "parameters": {},
                      "messageHandlers": {
                        "run": function anonymous(
) {
this.state.skip_chunk = 1
}
                      },
                      "title": "next_stage",
                      "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n\n      \u003Cdiv\u003E\n      \u003Cp\u003E You just unlocked a new stage - great job!\u003Cbr\u003E\u003Cbr\u003EFeel free to take a few seconds as a break, and when you're ready,\u003Cbr\u003Eclick \"Continue\" to move on to the next level. Good luck to you both!\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\n      \u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\n      \u003Cbutton id=\"continue\"\u003EContinue\u003C\u002Fbutton\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
                      "tardy": true,
                      "skip": "${this.state.skip_chunk == 1}"
                    }
                  ]
                }
              ]
            }
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
this.state.skip_chunk = 0
this.state.phase = "Training"
this.state.testing_trial_number = 1
this.state.current_tally = 0
this.state.stage = (Number(this.state.stage) + 1).toString()
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
}
            },
            "title": "skip_chunk_reset",
            "skip": "${this.state.skip_chunk == 0}",
            "tardy": true,
            "timeout": "1000"
          },
          {
            "type": "lab.flow.Loop",
            "templateParameters": [],
            "sample": {
              "mode": "draw-shuffle",
              "n": "200"
            },
            "files": {
              "stage_5.csv": "embedded\u002Fbf5cd0b1a80923bdb06069b9f2500967ae66845e2586046e12de7681017f8e82.csv",
              "stage_118.csv": "embedded\u002Fb63062f65b4cd3ae94899aa25daf1ae670f0b4af11ddc7e455828b8cd151e5c7.csv",
              "stage_10.csv": "embedded\u002F687d3f4e9a518dff10b23ec3a9a3246e56ef9293e267668a20916a3b0c41f7ba.csv",
              "stage_11.csv": "embedded\u002F5711cf764bd9767fb4af2018d440a7c1c908002d8eba71a4da850298fa10011a.csv"
            },
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "before:prepare": async function anonymous(
) {
this.state.url_text = "https://www.drjamiecummins.com/school-rct/st-pauls/trials/stage_";
this.state.file_type = ".csv";


this.state.url = this.state.url_text.concat(this.state.stage, this.state.file_type)

var csv2json = await new Promise((resolve, reject) => {
  Papa.parse(this.state.url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(result) {
      resolve(result.data);
    }
  })
})
console.log(csv2json)
this.options.templateParameters = csv2json




this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2

this.state.current_tally = 0
this.state.testing_trial_number = 1
this.state.phase = "Training"


}
            },
            "title": "trial_chunk",
            "tardy": true,
            "skip": "${this.state.skip_chunk == 1}",
            "shuffleGroups": [],
            "template": {
              "type": "lab.flow.Sequence",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "trials-and-breaks",
              "tardy": true,
              "skip": "${this.state.skip_chunk == 1}",
              "content": [
                {
                  "type": "lab.html.Frame",
                  "contextSelector": "[data-labjs-section=\"frame\"]",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
if (this.state.first_trial == 1) {
document.getElementById("pokemon-motivation").innerHTML = "Let's get started - you've got this!";
};


if (this.state.phase == "Training") {
  document.getElementById("trial-display").innerHTML = this.state.current_tally + " of 16 correct";
} else if (this.state.phase == "Testing") {
  document.getElementById("trial-display").innerHTML = "Trial " + this.state.testing_trial_number + " of 16";
}

var pieChart = document.getElementById('timer-circle');
pieChart.width = pieChart.height = 100;

var counter = document.createElement("p");


var ctx = pieChart.getContext('2d');
var secondsPassed = 0;

interval = setInterval(function() {
  ctx.clearRect(0, 0, pieChart.width, pieChart.height);
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, 0, Math.PI*2);
  ctx.fillStyle = '#03879E';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, -Math.PI/2, (-Math.PI/2) + Math.PI*2*secondsPassed/30);
  ctx.fillStyle = '#00ADEF';
  ctx.fill();
  ctx.font = "30px Verdana";
  ctx.fillStyle = "white";
  secondsPassed++;
}, 1000);


time_left = 30;
trialTimer = setInterval(function(){
  if(time_left <= 9){
    ctx.fillText(Math.trunc(time_left), 40, 60);
  } else {
    ctx.fillText(Math.trunc(time_left), 31, 60);
  }
  time_left -= 1;
}, 1000);

// motivational speech items
motivations = ['The more we practice, the better we get!',
              'The bigger the challenge, the bigger the victory!',
              'The best way to learn is to make mistakes!',
              'I know that you can do this!',
              'This can sometimes be tough - but you can do it!',
              'Hard work will always pay off!',
              'Stay focused - you can do this!',
              'Just 30 minutes of practice - easy peasy!',
              'You’re doing great - I’m proud of you!',
              'Even if you get stuck, just keep trying - you’ll get it!',
              'My favourite feeling is making progress after getting stuck for a while!',
              'Practice makes perfect!',
              'Every question you answer helps, even if you get it wrong!',
              'Practice can sometimes be boring - but it always pays off!',
              'Over 1000 people have already used this training...that is a lot!',
              'The 30 second countdown keeps you on your toes!',
              'The training can be frustrating, but it can be fun too!',
              'Try to treat the training like a puzzle that you can solve!',
              'Focus on getting the answers right - do not worry if you are slow!',
              'You will get faster and faster with more practice!',
              'If you are finding it easy, try to go faster!',
              'The training is designed to make you smarter - so do not worry if you do not feel smart at the start!',
              'Remember, getting answers wrong is how you learn!',
              'Try answer the questions in your head - do not write anything down!',
              'Training many times over a few weeks makes the training even more powerful!',
              'It is better to be right than to be fast - speed comes with practice!',
              'Try to push yourself a little bit more in every new session!',
              'Shortcuts will not make you smarter - solving the problems with hard work will!',
              'Easy, medium, hard, it does not matter - every question you answer helps you!',
              'Getting better can take time - be patient and never give up!',
              'How do you catch a squirrel?<br>Climb up a tree and act like a nut!',
              'I believe in you!',
              'You can do it - keep pushing!',
              'Be proud of yourself for working hard!',
              'Sometimes you will pass many levels, other times you will not - but it is all practice!',
              'Practice is always valuable!']
},
                    "after:end": function anonymous(
) {
clearInterval(interval)
clearInterval(trialTimer)

this.state.first_trial = 0;
}
                  },
                  "title": "whole-trial-frame",
                  "tardy": true,
                  "skip": "${this.state.skip_chunk == 1}",
                  "content": {
                    "type": "lab.flow.Sequence",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "trial_sequence",
                    "tardy": true,
                    "skip": "${this.state.skip_chunk == 1}",
                    "content": [
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage <= 103) {


if (this.parameters.stage <= 55) {
  this.parameters.q_word = "Is";
} else if (this.parameters.stage <= 81 && this.parameters.stage >= 56) {
  this.parameters.q_word = "Does";
};
  
this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2


if (this.parameters.stim_3_id == 1) { 
  this.parameters.stim_3 = this.state.stimulus_1;
} else if (this.parameters.stim_3_id == 2) { 
  this.parameters.stim_3 = this.state.stimulus_2;
} else if (this.parameters.stim_3_id == 3) {
  this.parameters.stim_3 = this.state.stimulus_3;
} else if (this.parameters.stim_3_id == 4) {
  this.parameters.stim_3 = this.state.stimulus_4;
};

if (this.parameters.stim_4_id == 1) { 
  this.parameters.stim_4 = this.state.stimulus_1;
} else if (this.parameters.stim_4_id == 2) {
  this.parameters.stim_4 = this.state.stimulus_2;
} else if (this.parameters.stim_4_id == 3) {
  this.parameters.stim_4 = this.state.stimulus_3;
} else if (this.parameters.stim_4_id == 4) {
  this.parameters.stim_4 = this.state.stimulus_4;
};;

if (this.parameters.stim_5_id == 1) { 
  this.parameters.stim_5 = this.state.stimulus_1;
} else if (this.parameters.stim_5_id == 2) {
  this.parameters.stim_5 = this.state.stimulus_2;
} else if (this.parameters.stim_5_id == 3) { 
  this.parameters.stim_5 = this.state.stimulus_3;
} else if (this.parameters.stim_5_id == 4) {
  this.parameters.stim_5 = this.state.stimulus_4;
};

if (this.parameters.stim_6_id == 1) { 
  this.parameters.stim_6 = this.state.stimulus_1;
} else if (this.parameters.stim_6_id == 2) {
  this.parameters.stim_6 = this.state.stimulus_2;
} else if (this.parameters.stim_6_id == 3) { 
  this.parameters.stim_6 = this.state.stimulus_3;
} else if (this.parameters.stim_6_id == 4) {
  this.parameters.stim_6 = this.state.stimulus_4;
}

if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
} 
if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
} 

};
},
                          "after:end": function anonymous(
) {
if (this.state.stage <= 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)


// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};
if (this.state.phase == "Testing" & this.state.correct == true) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" & this.state.correct == false) {
  this.state.current_tally = 0;
};

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}

};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;


}
                        },
                        "title": "standard_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4} \u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_5} ${this.parameters.relation_3} ${this.parameters.stim_6} \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"separator\"\u003E\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003E 103}"
                      },
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage > 103) {

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.stim_3 = this.state.stimulus_3
this.parameters.stim_4 = this.state.stimulus_4
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2
this.parameters.q_stim_3 = this.state.stimulus_3
this.parameters.q_stim_4 = this.state.stimulus_4

if (this.parameters.meta_stim_1_id == 1) { 
  this.parameters.meta_stim_1 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_1_id == 2) {
  this.parameters.meta_stim_1 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_1_id == 3) {
  this.parameters.meta_stim_1 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_1_id == 4) {
  this.parameters.meta_stim_1 = this.state.stimulus_4;
};

if (this.parameters.meta_stim_2_id == 1) { 
  this.parameters.meta_stim_2 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_2_id == 2) {
  this.parameters.meta_stim_2 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_2_id == 3) {
  this.parameters.meta_stim_2 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_2_id == 4) {
  this.parameters.meta_stim_2 = this.state.stimulus_4;
};


if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
};

if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
};


};
},
                          "after:end": function anonymous(
) {
if (this.state.stage > 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)

// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};

if (this.state.phase == "Testing" && this.state.correct == 1) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" && this.state.correct == 0) {
  this.state.current_tally = 0
}

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}
};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;

}
                        },
                        "title": "mathematical_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_relation_1}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_stim_1} ${this.parameters.meta_relation_2} ${this.parameters.meta_stim_2}\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003C 103}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 167.11,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#a8ca09",
                            "text": "CORRECT!",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally += 1
}
                        },
                        "title": "correct",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${this.state.correct == 0 || this.state.trial_time \u003E= 30000 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 126.2,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#d6341a",
                            "text": "WRONG",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally = 0
}
                        },
                        "title": "wrong",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${(this.state.correct != 0 & this.state.trial_time \u003C 30000) || this.state.correct == 1 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      }
                    ]
                  }
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "Training part completed!",
                      "content": "You got 16 correct answers in a row in the training part of this level!\u003Cbr\u003E\u003Cbr\u003EYou will now move on to the testing part. Get all 16 testing questions correct, and you move on to the next level.\u003Cbr\u003EBut be careful: if you get even one wrong, you have to start the training part all over again!\u003Cbr\u003E\u003Cbr\u003EWhen you're ready, click 'continue' to start the testing part of this level. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.phase = "Testing";
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "Trial 1 of 16";
this.state.current_tally = 0;
}
                  },
                  "title": "phase_transition",
                  "tardy": true,
                  "skip": "${this.state.current_tally != 16 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "",
                      "content": "You didn’t manage to get all of the questions right in that round. You’ll go back to the training part of this level. Don’t worry - practice makes perfect! Keep trying and you will get there. When you’re ready, click on “continue” to keep going. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.testing_trial_number = 1;
this.state.phase = "Training";
this.state.current_tally = 0;
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "";

}
                  },
                  "title": "return_to_training",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.testing_trial_number \u003C 17 || (this.state.testing_trial_number == 17 & this.state.current_tally \u003E 15) || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.flow.Sequence",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
document.getElementById("level-display").innerHTML = "";
document.getElementById("trial-display").innerHTML = "";

this.state.stage = ~~this.state.stage + 1;
}
                  },
                  "title": "level_transition",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.current_tally \u003C 16 || this.state.skip_chunk == 1}",
                  "content": [
                    {
                      "type": "lab.html.Screen",
                      "files": {},
                      "responses": {
                        "mousedown button#continue": "continue"
                      },
                      "parameters": {},
                      "messageHandlers": {
                        "run": function anonymous(
) {
this.state.skip_chunk = 1
}
                      },
                      "title": "next_stage",
                      "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n\n      \u003Cdiv\u003E\n      \u003Cp\u003E You just unlocked a new stage - great job!\u003Cbr\u003E\u003Cbr\u003EFeel free to take a few seconds as a break, and when you're ready,\u003Cbr\u003Eclick \"Continue\" to move on to the next level. Good luck to you both!\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\n      \u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\n      \u003Cbutton id=\"continue\"\u003EContinue\u003C\u002Fbutton\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
                      "tardy": true,
                      "skip": "${this.state.skip_chunk == 1}"
                    }
                  ]
                }
              ]
            }
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
this.state.skip_chunk = 0
this.state.phase = "Training"
this.state.testing_trial_number = 1
this.state.current_tally = 0
this.state.stage = (Number(this.state.stage) + 1).toString()
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
}
            },
            "title": "skip_chunk_reset",
            "skip": "${this.state.skip_chunk == 0}",
            "tardy": true,
            "timeout": "1000"
          },
          {
            "type": "lab.flow.Loop",
            "templateParameters": [],
            "sample": {
              "mode": "draw-shuffle",
              "n": "200"
            },
            "files": {
              "stage_5.csv": "embedded\u002Fbf5cd0b1a80923bdb06069b9f2500967ae66845e2586046e12de7681017f8e82.csv",
              "stage_118.csv": "embedded\u002Fb63062f65b4cd3ae94899aa25daf1ae670f0b4af11ddc7e455828b8cd151e5c7.csv",
              "stage_10.csv": "embedded\u002F687d3f4e9a518dff10b23ec3a9a3246e56ef9293e267668a20916a3b0c41f7ba.csv",
              "stage_11.csv": "embedded\u002F5711cf764bd9767fb4af2018d440a7c1c908002d8eba71a4da850298fa10011a.csv"
            },
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "before:prepare": async function anonymous(
) {
this.state.url_text = "https://www.drjamiecummins.com/school-rct/st-pauls/trials/stage_";
this.state.file_type = ".csv";


this.state.url = this.state.url_text.concat(this.state.stage, this.state.file_type)

var csv2json = await new Promise((resolve, reject) => {
  Papa.parse(this.state.url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(result) {
      resolve(result.data);
    }
  })
})
console.log(csv2json)
this.options.templateParameters = csv2json




this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2

this.state.current_tally = 0
this.state.testing_trial_number = 1
this.state.phase = "Training"


}
            },
            "title": "trial_chunk",
            "tardy": true,
            "skip": "${this.state.skip_chunk == 1}",
            "shuffleGroups": [],
            "template": {
              "type": "lab.flow.Sequence",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "trials-and-breaks",
              "tardy": true,
              "skip": "${this.state.skip_chunk == 1}",
              "content": [
                {
                  "type": "lab.html.Frame",
                  "contextSelector": "[data-labjs-section=\"frame\"]",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
if (this.state.first_trial == 1) {
document.getElementById("pokemon-motivation").innerHTML = "Let's get started - you've got this!";
};


if (this.state.phase == "Training") {
  document.getElementById("trial-display").innerHTML = this.state.current_tally + " of 16 correct";
} else if (this.state.phase == "Testing") {
  document.getElementById("trial-display").innerHTML = "Trial " + this.state.testing_trial_number + " of 16";
}

var pieChart = document.getElementById('timer-circle');
pieChart.width = pieChart.height = 100;

var counter = document.createElement("p");


var ctx = pieChart.getContext('2d');
var secondsPassed = 0;

interval = setInterval(function() {
  ctx.clearRect(0, 0, pieChart.width, pieChart.height);
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, 0, Math.PI*2);
  ctx.fillStyle = '#03879E';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, -Math.PI/2, (-Math.PI/2) + Math.PI*2*secondsPassed/30);
  ctx.fillStyle = '#00ADEF';
  ctx.fill();
  ctx.font = "30px Verdana";
  ctx.fillStyle = "white";
  secondsPassed++;
}, 1000);


time_left = 30;
trialTimer = setInterval(function(){
  if(time_left <= 9){
    ctx.fillText(Math.trunc(time_left), 40, 60);
  } else {
    ctx.fillText(Math.trunc(time_left), 31, 60);
  }
  time_left -= 1;
}, 1000);

// motivational speech items
motivations = ['The more we practice, the better we get!',
              'The bigger the challenge, the bigger the victory!',
              'The best way to learn is to make mistakes!',
              'I know that you can do this!',
              'This can sometimes be tough - but you can do it!',
              'Hard work will always pay off!',
              'Stay focused - you can do this!',
              'Just 30 minutes of practice - easy peasy!',
              'You’re doing great - I’m proud of you!',
              'Even if you get stuck, just keep trying - you’ll get it!',
              'My favourite feeling is making progress after getting stuck for a while!',
              'Practice makes perfect!',
              'Every question you answer helps, even if you get it wrong!',
              'Practice can sometimes be boring - but it always pays off!',
              'Over 1000 people have already used this training...that is a lot!',
              'The 30 second countdown keeps you on your toes!',
              'The training can be frustrating, but it can be fun too!',
              'Try to treat the training like a puzzle that you can solve!',
              'Focus on getting the answers right - do not worry if you are slow!',
              'You will get faster and faster with more practice!',
              'If you are finding it easy, try to go faster!',
              'The training is designed to make you smarter - so do not worry if you do not feel smart at the start!',
              'Remember, getting answers wrong is how you learn!',
              'Try answer the questions in your head - do not write anything down!',
              'Training many times over a few weeks makes the training even more powerful!',
              'It is better to be right than to be fast - speed comes with practice!',
              'Try to push yourself a little bit more in every new session!',
              'Shortcuts will not make you smarter - solving the problems with hard work will!',
              'Easy, medium, hard, it does not matter - every question you answer helps you!',
              'Getting better can take time - be patient and never give up!',
              'How do you catch a squirrel?<br>Climb up a tree and act like a nut!',
              'I believe in you!',
              'You can do it - keep pushing!',
              'Be proud of yourself for working hard!',
              'Sometimes you will pass many levels, other times you will not - but it is all practice!',
              'Practice is always valuable!']
},
                    "after:end": function anonymous(
) {
clearInterval(interval)
clearInterval(trialTimer)

this.state.first_trial = 0;
}
                  },
                  "title": "whole-trial-frame",
                  "tardy": true,
                  "skip": "${this.state.skip_chunk == 1}",
                  "content": {
                    "type": "lab.flow.Sequence",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "trial_sequence",
                    "tardy": true,
                    "skip": "${this.state.skip_chunk == 1}",
                    "content": [
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage <= 103) {


if (this.parameters.stage <= 55) {
  this.parameters.q_word = "Is";
} else if (this.parameters.stage <= 81 && this.parameters.stage >= 56) {
  this.parameters.q_word = "Does";
};
  
this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2


if (this.parameters.stim_3_id == 1) { 
  this.parameters.stim_3 = this.state.stimulus_1;
} else if (this.parameters.stim_3_id == 2) { 
  this.parameters.stim_3 = this.state.stimulus_2;
} else if (this.parameters.stim_3_id == 3) {
  this.parameters.stim_3 = this.state.stimulus_3;
} else if (this.parameters.stim_3_id == 4) {
  this.parameters.stim_3 = this.state.stimulus_4;
};

if (this.parameters.stim_4_id == 1) { 
  this.parameters.stim_4 = this.state.stimulus_1;
} else if (this.parameters.stim_4_id == 2) {
  this.parameters.stim_4 = this.state.stimulus_2;
} else if (this.parameters.stim_4_id == 3) {
  this.parameters.stim_4 = this.state.stimulus_3;
} else if (this.parameters.stim_4_id == 4) {
  this.parameters.stim_4 = this.state.stimulus_4;
};;

if (this.parameters.stim_5_id == 1) { 
  this.parameters.stim_5 = this.state.stimulus_1;
} else if (this.parameters.stim_5_id == 2) {
  this.parameters.stim_5 = this.state.stimulus_2;
} else if (this.parameters.stim_5_id == 3) { 
  this.parameters.stim_5 = this.state.stimulus_3;
} else if (this.parameters.stim_5_id == 4) {
  this.parameters.stim_5 = this.state.stimulus_4;
};

if (this.parameters.stim_6_id == 1) { 
  this.parameters.stim_6 = this.state.stimulus_1;
} else if (this.parameters.stim_6_id == 2) {
  this.parameters.stim_6 = this.state.stimulus_2;
} else if (this.parameters.stim_6_id == 3) { 
  this.parameters.stim_6 = this.state.stimulus_3;
} else if (this.parameters.stim_6_id == 4) {
  this.parameters.stim_6 = this.state.stimulus_4;
}

if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
} 
if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
} 

};
},
                          "after:end": function anonymous(
) {
if (this.state.stage <= 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)


// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};
if (this.state.phase == "Testing" & this.state.correct == true) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" & this.state.correct == false) {
  this.state.current_tally = 0;
};

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}

};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;


}
                        },
                        "title": "standard_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4} \u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_5} ${this.parameters.relation_3} ${this.parameters.stim_6} \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"separator\"\u003E\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003E 103}"
                      },
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage > 103) {

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.stim_3 = this.state.stimulus_3
this.parameters.stim_4 = this.state.stimulus_4
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2
this.parameters.q_stim_3 = this.state.stimulus_3
this.parameters.q_stim_4 = this.state.stimulus_4

if (this.parameters.meta_stim_1_id == 1) { 
  this.parameters.meta_stim_1 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_1_id == 2) {
  this.parameters.meta_stim_1 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_1_id == 3) {
  this.parameters.meta_stim_1 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_1_id == 4) {
  this.parameters.meta_stim_1 = this.state.stimulus_4;
};

if (this.parameters.meta_stim_2_id == 1) { 
  this.parameters.meta_stim_2 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_2_id == 2) {
  this.parameters.meta_stim_2 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_2_id == 3) {
  this.parameters.meta_stim_2 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_2_id == 4) {
  this.parameters.meta_stim_2 = this.state.stimulus_4;
};


if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
};

if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
};


};
},
                          "after:end": function anonymous(
) {
if (this.state.stage > 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)

// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};

if (this.state.phase == "Testing" && this.state.correct == 1) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" && this.state.correct == 0) {
  this.state.current_tally = 0
}

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}
};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;

}
                        },
                        "title": "mathematical_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_relation_1}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_stim_1} ${this.parameters.meta_relation_2} ${this.parameters.meta_stim_2}\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003C 103}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 167.11,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#a8ca09",
                            "text": "CORRECT!",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally += 1
}
                        },
                        "title": "correct",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${this.state.correct == 0 || this.state.trial_time \u003E= 30000 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 126.2,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#d6341a",
                            "text": "WRONG",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally = 0
}
                        },
                        "title": "wrong",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${(this.state.correct != 0 & this.state.trial_time \u003C 30000) || this.state.correct == 1 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      }
                    ]
                  }
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "Training part completed!",
                      "content": "You got 16 correct answers in a row in the training part of this level!\u003Cbr\u003E\u003Cbr\u003EYou will now move on to the testing part. Get all 16 testing questions correct, and you move on to the next level.\u003Cbr\u003EBut be careful: if you get even one wrong, you have to start the training part all over again!\u003Cbr\u003E\u003Cbr\u003EWhen you're ready, click 'continue' to start the testing part of this level. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.phase = "Testing";
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "Trial 1 of 16";
this.state.current_tally = 0;
}
                  },
                  "title": "phase_transition",
                  "tardy": true,
                  "skip": "${this.state.current_tally != 16 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "",
                      "content": "You didn’t manage to get all of the questions right in that round. You’ll go back to the training part of this level. Don’t worry - practice makes perfect! Keep trying and you will get there. When you’re ready, click on “continue” to keep going. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.testing_trial_number = 1;
this.state.phase = "Training";
this.state.current_tally = 0;
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "";

}
                  },
                  "title": "return_to_training",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.testing_trial_number \u003C 17 || (this.state.testing_trial_number == 17 & this.state.current_tally \u003E 15) || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.flow.Sequence",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
document.getElementById("level-display").innerHTML = "";
document.getElementById("trial-display").innerHTML = "";

this.state.stage = ~~this.state.stage + 1;
}
                  },
                  "title": "level_transition",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.current_tally \u003C 16 || this.state.skip_chunk == 1}",
                  "content": [
                    {
                      "type": "lab.html.Screen",
                      "files": {},
                      "responses": {
                        "mousedown button#continue": "continue"
                      },
                      "parameters": {},
                      "messageHandlers": {
                        "run": function anonymous(
) {
this.state.skip_chunk = 1
}
                      },
                      "title": "next_stage",
                      "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n\n      \u003Cdiv\u003E\n      \u003Cp\u003E You just unlocked a new stage - great job!\u003Cbr\u003E\u003Cbr\u003EFeel free to take a few seconds as a break, and when you're ready,\u003Cbr\u003Eclick \"Continue\" to move on to the next level. Good luck to you both!\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\n      \u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\n      \u003Cbutton id=\"continue\"\u003EContinue\u003C\u002Fbutton\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
                      "tardy": true,
                      "skip": "${this.state.skip_chunk == 1}"
                    }
                  ]
                }
              ]
            }
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
this.state.skip_chunk = 0
this.state.phase = "Training"
this.state.testing_trial_number = 1
this.state.current_tally = 0
this.state.stage = (Number(this.state.stage) + 1).toString()
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
}
            },
            "title": "skip_chunk_reset",
            "skip": "${this.state.skip_chunk == 0}",
            "tardy": true,
            "timeout": "1000"
          },
          {
            "type": "lab.flow.Loop",
            "templateParameters": [],
            "sample": {
              "mode": "draw-shuffle",
              "n": "200"
            },
            "files": {
              "stage_5.csv": "embedded\u002Fbf5cd0b1a80923bdb06069b9f2500967ae66845e2586046e12de7681017f8e82.csv",
              "stage_118.csv": "embedded\u002Fb63062f65b4cd3ae94899aa25daf1ae670f0b4af11ddc7e455828b8cd151e5c7.csv",
              "stage_10.csv": "embedded\u002F687d3f4e9a518dff10b23ec3a9a3246e56ef9293e267668a20916a3b0c41f7ba.csv",
              "stage_11.csv": "embedded\u002F5711cf764bd9767fb4af2018d440a7c1c908002d8eba71a4da850298fa10011a.csv"
            },
            "responses": {},
            "parameters": {},
            "messageHandlers": {
              "before:prepare": async function anonymous(
) {
this.state.url_text = "https://www.drjamiecummins.com/school-rct/st-pauls/trials/stage_";
this.state.file_type = ".csv";


this.state.url = this.state.url_text.concat(this.state.stage, this.state.file_type)

var csv2json = await new Promise((resolve, reject) => {
  Papa.parse(this.state.url, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(result) {
      resolve(result.data);
    }
  })
})
console.log(csv2json)
this.options.templateParameters = csv2json




this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2

this.state.current_tally = 0
this.state.testing_trial_number = 1
this.state.phase = "Training"


}
            },
            "title": "trial_chunk",
            "tardy": true,
            "skip": "${this.state.skip_chunk == 1}",
            "shuffleGroups": [],
            "template": {
              "type": "lab.flow.Sequence",
              "files": {},
              "responses": {
                "": ""
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "trials-and-breaks",
              "tardy": true,
              "skip": "${this.state.skip_chunk == 1}",
              "content": [
                {
                  "type": "lab.html.Frame",
                  "contextSelector": "[data-labjs-section=\"frame\"]",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
if (this.state.first_trial == 1) {
document.getElementById("pokemon-motivation").innerHTML = "Let's get started - you've got this!";
};


if (this.state.phase == "Training") {
  document.getElementById("trial-display").innerHTML = this.state.current_tally + " of 16 correct";
} else if (this.state.phase == "Testing") {
  document.getElementById("trial-display").innerHTML = "Trial " + this.state.testing_trial_number + " of 16";
}

var pieChart = document.getElementById('timer-circle');
pieChart.width = pieChart.height = 100;

var counter = document.createElement("p");


var ctx = pieChart.getContext('2d');
var secondsPassed = 0;

interval = setInterval(function() {
  ctx.clearRect(0, 0, pieChart.width, pieChart.height);
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, 0, Math.PI*2);
  ctx.fillStyle = '#03879E';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pieChart.width/2, pieChart.height/2);
  ctx.arc(pieChart.width/2, pieChart.height/2, pieChart.width/2, -Math.PI/2, (-Math.PI/2) + Math.PI*2*secondsPassed/30);
  ctx.fillStyle = '#00ADEF';
  ctx.fill();
  ctx.font = "30px Verdana";
  ctx.fillStyle = "white";
  secondsPassed++;
}, 1000);


time_left = 30;
trialTimer = setInterval(function(){
  if(time_left <= 9){
    ctx.fillText(Math.trunc(time_left), 40, 60);
  } else {
    ctx.fillText(Math.trunc(time_left), 31, 60);
  }
  time_left -= 1;
}, 1000);

// motivational speech items
motivations = ['The more we practice, the better we get!',
              'The bigger the challenge, the bigger the victory!',
              'The best way to learn is to make mistakes!',
              'I know that you can do this!',
              'This can sometimes be tough - but you can do it!',
              'Hard work will always pay off!',
              'Stay focused - you can do this!',
              'Just 30 minutes of practice - easy peasy!',
              'You’re doing great - I’m proud of you!',
              'Even if you get stuck, just keep trying - you’ll get it!',
              'My favourite feeling is making progress after getting stuck for a while!',
              'Practice makes perfect!',
              'Every question you answer helps, even if you get it wrong!',
              'Practice can sometimes be boring - but it always pays off!',
              'Over 1000 people have already used this training...that is a lot!',
              'The 30 second countdown keeps you on your toes!',
              'The training can be frustrating, but it can be fun too!',
              'Try to treat the training like a puzzle that you can solve!',
              'Focus on getting the answers right - do not worry if you are slow!',
              'You will get faster and faster with more practice!',
              'If you are finding it easy, try to go faster!',
              'The training is designed to make you smarter - so do not worry if you do not feel smart at the start!',
              'Remember, getting answers wrong is how you learn!',
              'Try answer the questions in your head - do not write anything down!',
              'Training many times over a few weeks makes the training even more powerful!',
              'It is better to be right than to be fast - speed comes with practice!',
              'Try to push yourself a little bit more in every new session!',
              'Shortcuts will not make you smarter - solving the problems with hard work will!',
              'Easy, medium, hard, it does not matter - every question you answer helps you!',
              'Getting better can take time - be patient and never give up!',
              'How do you catch a squirrel?<br>Climb up a tree and act like a nut!',
              'I believe in you!',
              'You can do it - keep pushing!',
              'Be proud of yourself for working hard!',
              'Sometimes you will pass many levels, other times you will not - but it is all practice!',
              'Practice is always valuable!']
},
                    "after:end": function anonymous(
) {
clearInterval(interval)
clearInterval(trialTimer)

this.state.first_trial = 0;
}
                  },
                  "title": "whole-trial-frame",
                  "tardy": true,
                  "skip": "${this.state.skip_chunk == 1}",
                  "content": {
                    "type": "lab.flow.Sequence",
                    "files": {},
                    "responses": {
                      "": ""
                    },
                    "parameters": {},
                    "messageHandlers": {},
                    "title": "trial_sequence",
                    "tardy": true,
                    "skip": "${this.state.skip_chunk == 1}",
                    "content": [
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage <= 103) {


if (this.parameters.stage <= 55) {
  this.parameters.q_word = "Is";
} else if (this.parameters.stage <= 81 && this.parameters.stage >= 56) {
  this.parameters.q_word = "Does";
};
  
this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2


if (this.parameters.stim_3_id == 1) { 
  this.parameters.stim_3 = this.state.stimulus_1;
} else if (this.parameters.stim_3_id == 2) { 
  this.parameters.stim_3 = this.state.stimulus_2;
} else if (this.parameters.stim_3_id == 3) {
  this.parameters.stim_3 = this.state.stimulus_3;
} else if (this.parameters.stim_3_id == 4) {
  this.parameters.stim_3 = this.state.stimulus_4;
};

if (this.parameters.stim_4_id == 1) { 
  this.parameters.stim_4 = this.state.stimulus_1;
} else if (this.parameters.stim_4_id == 2) {
  this.parameters.stim_4 = this.state.stimulus_2;
} else if (this.parameters.stim_4_id == 3) {
  this.parameters.stim_4 = this.state.stimulus_3;
} else if (this.parameters.stim_4_id == 4) {
  this.parameters.stim_4 = this.state.stimulus_4;
};;

if (this.parameters.stim_5_id == 1) { 
  this.parameters.stim_5 = this.state.stimulus_1;
} else if (this.parameters.stim_5_id == 2) {
  this.parameters.stim_5 = this.state.stimulus_2;
} else if (this.parameters.stim_5_id == 3) { 
  this.parameters.stim_5 = this.state.stimulus_3;
} else if (this.parameters.stim_5_id == 4) {
  this.parameters.stim_5 = this.state.stimulus_4;
};

if (this.parameters.stim_6_id == 1) { 
  this.parameters.stim_6 = this.state.stimulus_1;
} else if (this.parameters.stim_6_id == 2) {
  this.parameters.stim_6 = this.state.stimulus_2;
} else if (this.parameters.stim_6_id == 3) { 
  this.parameters.stim_6 = this.state.stimulus_3;
} else if (this.parameters.stim_6_id == 4) {
  this.parameters.stim_6 = this.state.stimulus_4;
}

if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
} 
if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
} 

};
},
                          "after:end": function anonymous(
) {
if (this.state.stage <= 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)


// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};
if (this.state.phase == "Testing" & this.state.correct == true) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" & this.state.correct == false) {
  this.state.current_tally = 0;
};

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}

};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;


}
                        },
                        "title": "standard_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4} \u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_5} ${this.parameters.relation_3} ${this.parameters.stim_6} \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"separator\"\u003E\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003E 103}"
                      },
                      {
                        "type": "lab.html.Screen",
                        "files": {},
                        "responses": {
                          "mousedown div#yes": "yes",
                          "mousedown div#no": "no"
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "before:prepare": function anonymous(
) {
if (this.state.stage > 103) {

this.parameters.stim_1 = this.state.stimulus_1
this.parameters.stim_2 = this.state.stimulus_2
this.parameters.stim_3 = this.state.stimulus_3
this.parameters.stim_4 = this.state.stimulus_4
this.parameters.q_stim_1 = this.state.stimulus_1
this.parameters.q_stim_2 = this.state.stimulus_2
this.parameters.q_stim_3 = this.state.stimulus_3
this.parameters.q_stim_4 = this.state.stimulus_4

if (this.parameters.meta_stim_1_id == 1) { 
  this.parameters.meta_stim_1 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_1_id == 2) {
  this.parameters.meta_stim_1 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_1_id == 3) {
  this.parameters.meta_stim_1 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_1_id == 4) {
  this.parameters.meta_stim_1 = this.state.stimulus_4;
};

if (this.parameters.meta_stim_2_id == 1) { 
  this.parameters.meta_stim_2 = this.state.stimulus_1;
} else if (this.parameters.meta_stim_2_id == 2) {
  this.parameters.meta_stim_2 = this.state.stimulus_2;
} else if (this.parameters.meta_stim_2_id == 3) {
  this.parameters.meta_stim_2 = this.state.stimulus_3;
}  else if (this.parameters.meta_stim_2_id == 4) {
  this.parameters.meta_stim_2 = this.state.stimulus_4;
};


if (this.parameters.q_stim_1_id == 1) { 
  this.parameters.q_stim_1 = this.state.stimulus_1;
} else if (this.parameters.q_stim_1_id == 2) {
  this.parameters.q_stim_1 = this.state.stimulus_2;
} else if (this.parameters.q_stim_1_id == 3) {
  this.parameters.q_stim_1 = this.state.stimulus_3;
} else if (this.parameters.q_stim_1_id == 4) {
  this.parameters.q_stim_1 = this.state.stimulus_4;
};

if (this.parameters.q_stim_2_id == 1) { 
  this.parameters.q_stim_2 = this.state.stimulus_1;
} else if (this.parameters.q_stim_2_id == 2) {
  this.parameters.q_stim_2 = this.state.stimulus_2;
} else if (this.parameters.q_stim_2_id == 3) {
  this.parameters.q_stim_2 = this.state.stimulus_3;
} else if (this.parameters.q_stim_2_id == 4) {
  this.parameters.q_stim_2 = this.state.stimulus_4;
};


};
},
                          "after:end": function anonymous(
) {
if (this.state.stage > 103) {

// remove currently used stimuli from buckets
stimulus_1_bucket = stimulus_1_bucket.filter(item => item !== this.state.stimulus_1)
stimulus_2_bucket = stimulus_2_bucket.filter(item => item !== this.state.stimulus_2)
stimulus_3_bucket = stimulus_3_bucket.filter(item => item !== this.state.stimulus_3)
stimulus_4_bucket = stimulus_4_bucket.filter(item => item !== this.state.stimulus_4)

// select the new stimuli for the next trial //
this.state.stimulus_1 = stimulus_1_bucket[Math.random() * stimulus_1_bucket.length | 0];
this.state.stimulus_2 = stimulus_2_bucket[Math.random() * stimulus_2_bucket.length | 0];
this.state.stimulus_3 = stimulus_3_bucket[Math.random() * stimulus_3_bucket.length | 0];
this.state.stimulus_4 = stimulus_4_bucket[Math.random() * stimulus_4_bucket.length | 0];

if (this.state.phase == "Testing") {
  this.state.testing_trial_number += 1;
};

if (this.state.phase == "Testing" && this.state.correct == 1) {
  this.state.current_tally += 1;
} else if (this.state.phase == "Testing" && this.state.correct == 0) {
  this.state.current_tally = 0
}

this.state.trial_time = this.state.duration;

if (this.state.trial_time >= 30000) {
  this.state.correct = 0;
}
};
},
                          "run": function anonymous(
) {
this.state.positions = ['left', 'right']
randomNumber = Math.floor(Math.random()*this.state.positions.length);
this.state.position1 = this.state.positions[randomNumber];
this.state.position2 = this.state.positions[(1 - randomNumber)];

// randomise response options positions
document.getElementById("yes").style.cssFloat = this.state.position2;
document.getElementById("no").style.cssFloat = this.state.position1;

}
                        },
                        "title": "mathematical_trials",
                        "content": "\u003Cdiv class=\"trial-propositions\"\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_1} ${this.parameters.relation_1} ${this.parameters.stim_2}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_relation_1}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.stim_3} ${this.parameters.relation_2} ${this.parameters.stim_4}\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"trial-proposition\"\u003E${this.parameters.meta_stim_1} ${this.parameters.meta_relation_2} ${this.parameters.meta_stim_2}\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\n\u003Cdiv class=\"trial-question\"\u003E\n  ${this.parameters.q_word} ${this.parameters.q_stim_1} ${this.parameters.q_rel} ${this.parameters.q_stim_2}?\u003C\u002Fdiv\u003E\n\n\n\u003Cfooter class=\"footer-trials\"\u003E\n\u003Cdiv class=\"response-options\"\u003E\n  \u003Cdiv class=\"response-option\" id=\"yes\"\u003E\u003Cb\u003EYES\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"response-option\" id=\"no\"\u003E\u003Cb\u003ENO\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Ffooter\u003E",
                        "timeout": "31000",
                        "correctResponse": "${parameters.correct_response}",
                        "tardy": true,
                        "skip": "${(this.state.skip_chunk == 1) || Number(this.state.stage) \u003C 103}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 167.11,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#a8ca09",
                            "text": "CORRECT!",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally += 1
}
                        },
                        "title": "correct",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${this.state.correct == 0 || this.state.trial_time \u003E= 30000 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      },
                      {
                        "type": "lab.canvas.Screen",
                        "content": [
                          {
                            "type": "i-text",
                            "left": 0,
                            "top": 0,
                            "angle": 0,
                            "width": 126.2,
                            "height": 36.16,
                            "stroke": null,
                            "strokeWidth": 1,
                            "fill": "#d6341a",
                            "text": "WRONG",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "fontSize": 32,
                            "fontFamily": "sans-serif",
                            "lineHeight": 1.16,
                            "textAlign": "center"
                          }
                        ],
                        "viewport": [
                          800,
                          600
                        ],
                        "files": {},
                        "responses": {
                          "": ""
                        },
                        "parameters": {},
                        "messageHandlers": {
                          "run": function anonymous(
) {
this.state.current_tally = 0
}
                        },
                        "title": "wrong",
                        "timeout": "500",
                        "tardy": true,
                        "skip": "${(this.state.correct != 0 & this.state.trial_time \u003C 30000) || this.state.correct == 1 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                      }
                    ]
                  }
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "Training part completed!",
                      "content": "You got 16 correct answers in a row in the training part of this level!\u003Cbr\u003E\u003Cbr\u003EYou will now move on to the testing part. Get all 16 testing questions correct, and you move on to the next level.\u003Cbr\u003EBut be careful: if you get even one wrong, you have to start the training part all over again!\u003Cbr\u003E\u003Cbr\u003EWhen you're ready, click 'continue' to start the testing part of this level. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.phase = "Testing";
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "Trial 1 of 16";
this.state.current_tally = 0;
}
                  },
                  "title": "phase_transition",
                  "tardy": true,
                  "skip": "${this.state.current_tally != 16 || this.state.phase == \"Testing\" || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.html.Page",
                  "items": [
                    {
                      "type": "text",
                      "title": "",
                      "content": "You didn’t manage to get all of the questions right in that round. You’ll go back to the training part of this level. Don’t worry - practice makes perfect! Keep trying and you will get there. When you’re ready, click on “continue” to keep going. Good luck!"
                    }
                  ],
                  "scrollTop": true,
                  "submitButtonText": "Continue →",
                  "submitButtonPosition": "right",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
this.state.testing_trial_number = 1;
this.state.phase = "Training";
this.state.current_tally = 0;
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
document.getElementById("trial-display").innerHTML = "";

}
                  },
                  "title": "return_to_training",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.testing_trial_number \u003C 17 || (this.state.testing_trial_number == 17 & this.state.current_tally \u003E 15) || this.state.skip_chunk == 1}"
                },
                {
                  "type": "lab.flow.Sequence",
                  "files": {},
                  "responses": {
                    "": ""
                  },
                  "parameters": {},
                  "messageHandlers": {
                    "run": function anonymous(
) {
document.getElementById("level-display").innerHTML = "";
document.getElementById("trial-display").innerHTML = "";

this.state.stage = ~~this.state.stage + 1;
}
                  },
                  "title": "level_transition",
                  "tardy": true,
                  "skip": "${this.state.phase == \"Training\" || this.state.current_tally \u003C 16 || this.state.skip_chunk == 1}",
                  "content": [
                    {
                      "type": "lab.html.Screen",
                      "files": {},
                      "responses": {
                        "mousedown button#continue": "continue"
                      },
                      "parameters": {},
                      "messageHandlers": {
                        "run": function anonymous(
) {
this.state.skip_chunk = 1
}
                      },
                      "title": "next_stage",
                      "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n\n      \u003Cdiv\u003E\n      \u003Cp\u003E You just unlocked a new stage - great job!\u003Cbr\u003E\u003Cbr\u003EFeel free to take a few seconds as a break, and when you're ready,\u003Cbr\u003Eclick \"Continue\" to move on to the next level. Good luck to you both!\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\n      \u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\n      \u003Cbutton id=\"continue\"\u003EContinue\u003C\u002Fbutton\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
                      "tardy": true,
                      "skip": "${this.state.skip_chunk == 1}"
                    }
                  ]
                }
              ]
            }
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {
              "run": function anonymous(
) {
this.state.skip_chunk = 0
this.state.phase = "Training"
this.state.testing_trial_number = 1
this.state.current_tally = 0
this.state.stage = (Number(this.state.stage) + 1).toString()
document.getElementById("level-display").innerHTML = "Level " + this.state.stage + ": " + this.state.phase;
}
            },
            "title": "skip_chunk_reset",
            "skip": "${this.state.skip_chunk == 0}",
            "tardy": true,
            "timeout": "1000"
          }
        ]
      }
    },
    {
      "type": "lab.html.Screen",
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {},
      "title": "completed_training",
      "content": "\u003Cmain height=\"100%\" width=\"100%\"\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n\n      \u003Cdiv\u003E\n      \u003Cp\u003EWow - what an incredible achievement - you have completed\u003Cbr\u003E\n      my entire training programme! Not everybody gets this far - congratulations!\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003ELet the researcher know that you have completed the training, and they will tell you what to do next.\u003Cbr\u003EIt was a pleasure to have you complete my training programme,\u003Cbr\u003Eand I hope you enjoyed it as much I did! \n\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
      "tardy": true,
      "skip": "${this.state.stage \u003C 123}"
    },
    {
      "type": "lab.html.Screen",
      "files": {},
      "responses": {},
      "parameters": {},
      "messageHandlers": {
        "before:prepare": function anonymous(
) {
if (this.state.stage == 5) { 
 this.state.password = '3368'
}
else if (this.state.stage == 6) { 
 this.state.password = '6272'
}
else if (this.state.stage == 7) { 
 this.state.password = '2251'
}
else if (this.state.stage == 8) { 
 this.state.password = '9825'
}
else if (this.state.stage == 9) { 
 this.state.password = '1355'
}
else if (this.state.stage == 10) { 
 this.state.password = '8699'
}
else if (this.state.stage == 11) { 
 this.state.password = '4953'
}
else if (this.state.stage == 12) { 
 this.state.password = '6402'
}
else if (this.state.stage == 13) { 
 this.state.password = '1931'
}
else if (this.state.stage == 14) { 
 this.state.password = '6636'
}
else if (this.state.stage == 15) { 
 this.state.password = '5001'
}
else if (this.state.stage == 16) { 
 this.state.password = '1258'
}
else if (this.state.stage == 17) { 
 this.state.password = '6433'
}
else if (this.state.stage == 18) { 
 this.state.password = '1480'
}
else if (this.state.stage == 19) { 
 this.state.password = '8325'
}
else if (this.state.stage == 20) { 
 this.state.password = '9490'
}
else if (this.state.stage == 21) { 
 this.state.password = '3453'
}
else if (this.state.stage == 22) { 
 this.state.password = '8788'
}
else if (this.state.stage == 23) { 
 this.state.password = '6467'
}
else if (this.state.stage == 24) { 
 this.state.password = '7340'
}
else if (this.state.stage == 25) { 
 this.state.password = '3273'
}
else if (this.state.stage == 26) { 
 this.state.password = '3551'
}
else if (this.state.stage == 27) { 
 this.state.password = '1726'
}
else if (this.state.stage == 28) { 
 this.state.password = '1944'
}
else if (this.state.stage == 29) { 
 this.state.password = '1625'
}
else if (this.state.stage == 30) { 
 this.state.password = '5357'
}
else if (this.state.stage == 31) { 
 this.state.password = '7533'
}
else if (this.state.stage == 32) { 
 this.state.password = '2395'
}
else if (this.state.stage == 33) { 
 this.state.password = '6122'
}
else if (this.state.stage == 34) { 
 this.state.password = '3817'
}
else if (this.state.stage == 35) { 
 this.state.password = '1516'
}
else if (this.state.stage == 36) { 
 this.state.password = '9224'
}
else if (this.state.stage == 37) { 
 this.state.password = '9976'
}
else if (this.state.stage == 38) { 
 this.state.password = '1102'
}
else if (this.state.stage == 39) { 
 this.state.password = '6347'
}
else if (this.state.stage == 40) { 
 this.state.password = '8145'
}
else if (this.state.stage == 41) { 
 this.state.password = '2692'
}
else if (this.state.stage == 42) { 
 this.state.password = '5171'
}
else if (this.state.stage == 43) { 
 this.state.password = '6896'
}
else if (this.state.stage == 44) { 
 this.state.password = '6610'
}
else if (this.state.stage == 45) { 
 this.state.password = '4618'
}
else if (this.state.stage == 46) { 
 this.state.password = '1015'
}
else if (this.state.stage == 47) { 
 this.state.password = '6444'
}
else if (this.state.stage == 48) { 
 this.state.password = '1987'
}
else if (this.state.stage == 49) { 
 this.state.password = '8809'
}
else if (this.state.stage == 50) { 
 this.state.password = '9273'
}
else if (this.state.stage == 51) { 
 this.state.password = '3343'
}
else if (this.state.stage == 52) { 
 this.state.password = '1148'
}
else if (this.state.stage == 53) { 
 this.state.password = '8139'
}
else if (this.state.stage == 54) { 
 this.state.password = '6688'
}
else if (this.state.stage == 55) { 
 this.state.password = '1099'
}
else if (this.state.stage == 56) { 
 this.state.password = '3345'
}
else if (this.state.stage == 57) { 
 this.state.password = '3449'
}
else if (this.state.stage == 58) { 
 this.state.password = '1090'
}
else if (this.state.stage == 59) { 
 this.state.password = '7924'
}
else if (this.state.stage == 60) { 
 this.state.password = '8348'
}
else if (this.state.stage == 61) { 
 this.state.password = '6173'
}
else if (this.state.stage == 62) { 
 this.state.password = '7994'
}
else if (this.state.stage == 63) { 
 this.state.password = '5815'
}
else if (this.state.stage == 64) { 
 this.state.password = '6877'
}
else if (this.state.stage == 65) { 
 this.state.password = '7781'
}
else if (this.state.stage == 66) { 
 this.state.password = '9618'
}
else if (this.state.stage == 67) { 
 this.state.password = '7585'
}
else if (this.state.stage == 68) { 
 this.state.password = '6231'
}
else if (this.state.stage == 69) { 
 this.state.password = '5679'
}
else if (this.state.stage == 70) { 
 this.state.password = '8452'
}
else if (this.state.stage == 71) { 
 this.state.password = '1950'
}
else if (this.state.stage == 72) { 
 this.state.password = '9101'
}
else if (this.state.stage == 73) { 
 this.state.password = '6260'
}
else if (this.state.stage == 74) { 
 this.state.password = '2924'
}
else if (this.state.stage == 75) { 
 this.state.password = '5406'
}
else if (this.state.stage == 76) { 
 this.state.password = '3858'
}
else if (this.state.stage == 77) { 
 this.state.password = '5855'
}
else if (this.state.stage == 78) { 
 this.state.password = '2888'
}
else if (this.state.stage == 79) { 
 this.state.password = '9963'
}
else if (this.state.stage == 80) { 
 this.state.password = '2906'
}
else if (this.state.stage == 81) { 
 this.state.password = '9894'
}
else if (this.state.stage == 82) { 
 this.state.password = '4309'
}
else if (this.state.stage == 83) { 
 this.state.password = '7669'
}
else if (this.state.stage == 84) { 
 this.state.password = '3309'
}
else if (this.state.stage == 85) { 
 this.state.password = '5394'
}
else if (this.state.stage == 86) { 
 this.state.password = '8613'
}
else if (this.state.stage == 87) { 
 this.state.password = '5894'
}
else if (this.state.stage == 88) { 
 this.state.password = '7049'
}
else if (this.state.stage == 89) { 
 this.state.password = '3909'
}
else if (this.state.stage == 90) { 
 this.state.password = '2247'
}
else if (this.state.stage == 91) { 
 this.state.password = '8381'
}
else if (this.state.stage == 92) { 
 this.state.password = '5389'
}
else if (this.state.stage == 93) { 
 this.state.password = '1606'
}
else if (this.state.stage == 94) { 
 this.state.password = '3830'
}
else if (this.state.stage == 95) { 
 this.state.password = '9737'
}
else if (this.state.stage == 96) { 
 this.state.password = '3473'
}
else if (this.state.stage == 97) { 
 this.state.password = '3235'
}
else if (this.state.stage == 98) { 
 this.state.password = '9445'
}
else if (this.state.stage == 99) { 
 this.state.password = '9459'
}
else if (this.state.stage == 100) { 
 this.state.password = '5735'
}
else if (this.state.stage == 101) { 
 this.state.password = '4481'
}
else if (this.state.stage == 102) { 
 this.state.password = '3088'
}
else if (this.state.stage == 103) { 
 this.state.password = '8360'
}
else if (this.state.stage == 104) { 
 this.state.password = '9855'
}
else if (this.state.stage == 105) { 
 this.state.password = '2121'
}
else if (this.state.stage == 106) { 
 this.state.password = '7680'
}
else if (this.state.stage == 107) { 
 this.state.password = '1161'
}
else if (this.state.stage == 108) { 
 this.state.password = '1635'
}
else if (this.state.stage == 109) { 
 this.state.password = '3753'
}
else if (this.state.stage == 110) { 
 this.state.password = '6663'
}
else if (this.state.stage == 111) { 
 this.state.password = '4994'
}
else if (this.state.stage == 112) { 
 this.state.password = '6816'
}
else if (this.state.stage == 113) { 
 this.state.password = '5891'
}
else if (this.state.stage == 114) { 
 this.state.password = '7773'
}
else if (this.state.stage == 115) { 
 this.state.password = '4108'
}
else if (this.state.stage == 116) { 
 this.state.password = '3820'
}
else if (this.state.stage == 117) { 
 this.state.password = '5173'
}
else if (this.state.stage == 118) { 
 this.state.password = '5621'
}
else if (this.state.stage == 119) { 
 this.state.password = '4739'
}
else if (this.state.stage == 120) { 
 this.state.password = '4168'
}
else if (this.state.stage == 121) { 
 this.state.password = '7626'
}
else if (this.state.stage == 122) { 
 this.state.password = '4545'
};
}
      },
      "title": "professor_ending",
      "content": "\u003Cmain\u003E \n  \u003Cdiv class=\"introduction-central-container\"\u003E\n\n    \u003Cdiv\u003E\n    \u003Cimg src=\"static\u002Fprofessor.jpeg\"\u003E\n    \u003C\u002Fdiv\u003E\n\n    \u003Cdiv\u003E\n\n      \u003Cdiv\u003E\n      \u003Cp\u003ECongratulations - you just finished today's training! That was a lot of work -\u003Cbr\u003EI am sure you must be feeling tired!\u003Cbr\u003ELet's take a rest for today and come back again fresh for the next session.\u003Cbr\u003EGreat work!\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003EYour password for the next training session is: \u003Cb\u003E${this.state.password}\u003C\u002Fb\u003E.\u003Cbr\u003E\u003Cb\u003EWrite this down somewhere so that you don’t forget!\u003C\u002Fb\u003E\u003Cbr\u003E\u003Cbr\u003EGood luck with the rest of your day today!\u003Cbr\u003EYou can close this web page whenever you want,\u003Cbr\u003Eonce you've \u003Cb\u003Ewritten down your password\u003C\u002Fb\u003E\u003Cbr\u003E - and I'll see you next time!\u003Cbr\u003E\u003Cbr\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\n\n    \u003C\u002Fdiv\u003E\n\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E",
      "tardy": true
    }
  ]
})

// Let's go!
study.run()