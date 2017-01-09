/*\
|*|  ---------------------------
|*|  --- [  Keygen JS Lib  ] ---
|*|  --- [   BETA: 0.1.0   ] ---
|*|  ---------------------------
|*|  
|*|  Keygen Lib is the official password genrator library for KeyGen and Oli
|*|  Keygen JS Lib is the JS version of KeyGen Lib.
|*|  Copyright (C) 2015 Mathieu "Matiboux" Guérin
|*|  
|*|  KeyGen is an open source password generator service.
|*|  Oli is an open source PHP Framework (created by Matiboux - https://oliframework.github.io/Oli/).
|*|  
|*|    [LICENSE]
|*|  
|*|  Please see the README.md file for more infos!
|*|  
|*|  --- --- ---
|*|  
|*|  Developer: Matiboux
|*|  
|*|  --- --- ---
|*|  
|*|  Releases date:
|*|    ORIGIN: KeyGen Service creation???
|*|    BETA: January 1st, 2017
|*|    * [version 0.1]:
|*|              (0.1.0): Currently in development
\*/

var version = "0.1.0",

/*KeygenLib = function (numeric, lowercase, uppercase, special, length, redundancy) {
    KeygenLib.setParameters(numeric, lowercase, uppercase, special, length, redundancy);
    return KeygenLib.generateKeygen();
}*/

KeygenLib = {

    // The current KeyGen Lib version
    version: version,

    // Allowed Characters Sets
    allowedCharacters: {
        numeric: '1234567890',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        special: '!#$%&\()+-;?@[]^_{|}'
    },

    // Keygen generation parameters
    parameters: {
        numeric: true,
        lowercase: true,
        uppercase: true,
        special: false,
        length: 12,
        redundancy: false
    },
    lastParameters: [],

    // Set Keygen generation parameters
    setParameters: function (numeric, lowercase, uppercase, special, length, redundancy) {
        if (typeof numeric === 'object') {
            var parameters = numeric;
            numeric = parameters.numeric;
            lowercase = parameters.lowercase;
            uppercase = parameters.uppercase;
            special = parameters.special;
            length = parameters.length;
            redundancy = parameters.redundancy;
        }

        KeygenLib.parameters.numeric = numeric ? true : false;
        KeygenLib.parameters.lowercase = lowercase ? true : false;
        KeygenLib.parameters.uppercase = uppercase ? true : false;
        KeygenLib.parameters.special = special ? true : false;
        KeygenLib.parameters.length = length;
        KeygenLib.parameters.redundancy = redundancy ? true : false;
    },

    // Generate a Keygen
    generateKeygen: function () {
        var charactersAllowed = '';
        if (KeygenLib.parameters.numeric) charactersAllowed += KeygenLib.allowedCharacters.numeric;
        if (KeygenLib.parameters.lowercase) charactersAllowed += KeygenLib.allowedCharacters.lowercase;
        if (KeygenLib.parameters.uppercase) charactersAllowed += KeygenLib.allowedCharacters.uppercase;
        if (KeygenLib.parameters.special) charactersAllowed += KeygenLib.allowedCharacters.special;
        if (KeygenLib.parameters.redundancy) redundancy = KeygenLib.parameters.redundancy;

        if (charactersAllowed == '') {
            KeygenLib.errorInfo = {
                code: '01',
                message: 'charactersAllowed string empty'
            };
            return false;
        }
        else if (KeygenLib.parameters.length == '' || KeygenLib.parameters.length <= 0) {
            KeygenLib.errorInfo = {
                code: '02',
                message: 'length empty or negative'
            };
            return false;
        }
        else {

            if (!KeygenLib.parameters.redundancy && KeygenLib.parameters.length > charactersAllowed.length) KeygenLib.parameters.redundancy = true;

            var keygen = '';
            while (keygen.length < KeygenLib.parameters.length) {
                //var randomCharacter = substr(charactersAllowed, mt_rand(0, charactersAllowed.length - 1), 1);
                var randomCharacter = charactersAllowed[KeygenLib.randomNumber(0, charactersAllowed.length - 1)];
                if (KeygenLib.parameters.redundancy || keygen.indexOf(randomCharacter) < 0) keygen += randomCharacter;
            }

            if (keygen == '') {
                KeygenLib.errorInfo = {
                    code: '03',
                    message: 'generated keygen empty'
                };
            }
            else {
                KeygenLib.errorInfo = {
                    code: '00',
                    message: 'status ok'
                };
                KeygenLib.lastParameters.push(KeygenLib.parameters);
                return keygen;
            }

        }

    },

    // Generate a random int number
    randomNumber: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

};