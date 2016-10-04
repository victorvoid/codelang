"use strict";

var base_url = 'http://localhost:8888';

//LocalStorage

var get = function get(key) {
	return window.localStorage ? window.localStorage[key] : null;
};

var put = function put(key, value) {
	if (window.localStorage) {
		window.localStorage[key] = value;
	}
};

var ls2 = {
	save: function save(key, jsonData, expirationMS) {
		if (typeof Storage === "undefined") {
			return false;
		}

		//let expirationMS = expirationMin * 60 * 1000;
		var record = {
			value: JSON.stringify(jsonData),
			timestamp: new Date().getTime() + expirationMS
		};

		localStorage.setItem(key, JSON.stringify(record));

		return jsonData;
	},

	load: function load(key) {
		if (typeof Storage === "undefined") {
			return false;
		}

		var record = JSON.parse(localStorage.getItem(key));

		if (!record) {
			return false;
		}

		return new Date().getTime() < record.timestamp && JSON.parse(record.value);
	}
};

function addMinutes(date, minutes) {
	return new Date(date.getTime() + minutes * 60000);
}

var codelang = function () {
	var options = {
		colorSuccess: '',
		colorWarning: '',
		colorError: '',
		colorInfo: '',
		colorNeutral: '',
		colorText: '',
		animationDelay: 300,
		backgroundClickDismiss: true
	};

	function setOptions(customOptions) {
		for (var key in customOptions) {
			options[key] = customOptions[key];
		}
	}

	/** Alert **/
	var wasClickedCounter = 0,
	    alertOuter = document.createElement('div'); // create alert container

	alertOuter.id = 'notie-alert-outer';

	// Hide alert on click
	alertOuter.onclick = function () {
		clearTimeout(alertTimeout1);
		clearTimeout(alertTimeout2);
		alertHide();
	};

	// add alert to body
	document.body.appendChild(alertOuter);

	// create alert inner container
	var alertInner = document.createElement('div');
	alertInner.id = 'notie-alert-inner';
	alertOuter.appendChild(alertInner);

	// create alert content container
	var alertContent = document.createElement('div');
	alertContent.id = 'notie-alert-content';
	alertInner.appendChild(alertContent);

	// Initialize alert text
	var alertText = document.createElement('span');
	alertText.id = 'notie-alert-text';
	alertContent.appendChild(alertText);

	// alert helper variables
	var alertIsShowing = false;
	var alertTimeout1 = void 0;
	var alertTimeout2 = void 0;

	function alert(type, message, seconds) {
		if (options.colorText.length > 0) {
			alertText.style.color = options.colorText;
		}

		blur();

		wasClickedCounter++;
		setTimeout(function () {
			wasClickedCounter--;
		}, options.animationDelay + 10);

		if (wasClickedCounter === 1) {

			if (alertIsShowing) {
				clearTimeout(alertTimeout1);
				clearTimeout(alertTimeout2);
				alertHide(function () {
					alertShow(type, message, seconds);
				});
			} else {
				alertShow(type, message, seconds);
			}
		}
	}
	function alertShow(type, message, seconds) {
		alertIsShowing = true;
		var duration = 0;
		if (typeof seconds === 'undefined' || seconds === 0) {
			var _duration = 86400000;
		} else if (seconds > 0 && seconds < 1) {
			duration = 1000;
		} else {
			duration = seconds * 1000;
		}

		// Remove all color classes first
		removeClass(alertOuter, 'notie-background-success');
		removeClass(alertOuter, 'notie-background-warning');
		removeClass(alertOuter, 'notie-background-error');
		removeClass(alertOuter, 'notie-background-info');

		// Set notie type (background color)
		switch (type) {
			case 1:
				if (options.colorSuccess.length > 0) {
					alertOuter.style.backgroundColor = options.colorSuccess;
				} else {
					addClass(alertOuter, 'notie-background-success');
				}
				break;
			case 2:
				if (options.colorWarning.length > 0) {
					alertOuter.style.backgroundColor = options.colorWarning;
				} else {
					addClass(alertOuter, 'notie-background-warning');
				}
				break;
			case 3:
				if (options.colorError.length > 0) {
					alertOuter.style.backgroundColor = options.colorError;
				} else {
					addClass(alertOuter, 'notie-background-error');
				}
				break;
			case 4:
				if (options.colorInfo.length > 0) {
					alertOuter.style.backgroundColor = options.colorInfo;
				} else {
					addClass(alertOuter, 'notie-background-info');
				}
				break;
		}
		// Set notie text
		alertText.innerHTML = message;
		alertOuter.style.top = '-10000px';
		alertOuter.style.display = 'table';
		alertOuter.style.top = '-' + alertOuter.offsetHeight - 5 + 'px';

		alertTimeout1 = setTimeout(function () {
			addClass(alertOuter, 'notie-transition');
			alertOuter.style.top = 0;
			alertTimeout2 = setTimeout(function () {
				alertHide(function () {
					//(╯°□°）╯
				});
			}, duration);
		}, 20);
	}

	function alertHide(callback) {
		alertOuter.style.top = '-' + alertOuter.offsetHeight - 5 + 'px';
		setTimeout(function () {

			removeClass(alertOuter, 'notie-transition');
			alertOuter.style.top = '-10000px';
			alertIsShowing = false;

			if (callback) {
				callback();
			}
		}, options.animationDelay + 10);
	}

	var inputOuter = document.createElement('div');
	inputOuter.id = 'notie-input-outer';

	var inputBackground = document.createElement('div');
	inputBackground.id = 'notie-input-background';
	addClass(inputBackground, 'notie-transition');

	var inputInner = document.createElement('div');
	inputInner.id = 'notie-input-inner';
	inputOuter.appendChild(inputInner);

	var inputField = document.createElement('input');
	inputField.id = 'notie-input-field';
	inputField.setAttribute('autocomplete', 'off');
	inputField.setAttribute('autocorrect', 'off');
	inputField.setAttribute('autocapitalize', 'off');
	inputField.setAttribute('spellcheck', 'false');
	inputOuter.appendChild(inputField);

	var inputYes = document.createElement('div');
	inputYes.id = 'notie-input-yes';
	inputOuter.appendChild(inputYes);

	var inputNo = document.createElement('div');
	inputNo.id = 'notie-input-no';
	inputOuter.appendChild(inputNo);

	var inputText = document.createElement('span');
	inputText.id = 'notie-input-text';
	inputInner.appendChild(inputText);

	var inputTextYes = document.createElement('span');
	inputTextYes.id = 'notie-input-text-yes';
	inputYes.appendChild(inputTextYes);

	var inputTextNo = document.createElement('span');
	inputTextNo.id = 'notie-input-text-no';
	inputNo.appendChild(inputTextNo);

	// Attach input elements to the body element
	document.body.appendChild(inputOuter);
	document.body.appendChild(inputBackground);

	// Hide input on no click and background click
	inputBackground.onclick = function () {
		if (options.backgroundClickDismiss) {
			inputHide();
		}
	};

	// input helper variables
	var inputIsShowing = false;

	function input(settings, title, submitText, cancelText, submitCallback, cancelCallback) {
		if (options.colorInfo.length > 0) inputInner.style.backgroundColor = options.colorInfo;
		if (options.colorSuccess.length > 0) inputYes.style.backgroundColor = options.colorSuccess;
		if (options.colorError.length > 0) inputNo.style.backgroundColor = options.colorError;
		if (options.colorText.length > 0) {
			inputText.style.color = options.colorText;
			inputTextYes.style.color = options.colorText;
			inputTextNo.style.color = options.colorText;
		}
		blur();
		if (typeof settings.type !== 'undefined' && settings.type) {
			inputField.setAttribute('type', settings.type);
		} else {
			inputField.setAttribute('type', 'text');
		}
		if (typeof settings.placeholder !== 'undefined' && settings.placeholder) {
			inputField.setAttribute('placeholder', settings.placeholder);
		} else {
			// Do not set placeholder
		}
		if (typeof settings.prefilledValue !== 'undefined' && settings.prefilledValue) {
			inputField.value = settings.prefilledValue;
		} else {
			inputField.value = '';
		}

		if (alertIsShowing) {
			// Hide alert
			clearTimeout(alertTimeout1);
			clearTimeout(alertTimeout2);
			alertHide(function () {
				inputShow(title, submitText, cancelText, submitCallback, cancelCallback);
			});
		} else {
			inputShow(title, submitText, cancelText, submitCallback, cancelCallback);
		}
	}

	function inputShow(title, submitText, cancelText, submitCallback, cancelCallback) {
		scrollDisable();
		// Yes callback function
		inputYes.onclick = function () {
			inputHide();
			if (submitCallback) {
				setTimeout(function () {
					submitCallback(inputField.value);
				}, options.animationDelay + 10);
			}
		};
		// No callback function
		inputNo.onclick = function () {
			inputHide();
			if (cancelCallback) {
				setTimeout(function () {
					cancelCallback(inputField.value);
				}, options.animationDelay + 10);
			}
		};

		function inputShowInner() {
			// Set input text
			inputText.innerHTML = title;
			inputTextYes.innerHTML = submitText;
			inputTextNo.innerHTML = cancelText;

			// Get input's height
			inputOuter.style.top = '-10000px';
			inputOuter.style.display = 'table';
			inputOuter.style.top = '-' + inputOuter.offsetHeight - 5 + 'px';
			inputBackground.style.display = 'block';

			setTimeout(function () {
				addClass(inputOuter, 'notie-transition');
				inputOuter.style.top = 0;
				inputBackground.style.opacity = '0.75';

				setTimeout(function () {
					inputIsShowing = true;
					inputField.focus();
				}, options.animationDelay + 10);
			}, 20);
		}

		if (inputIsShowing) {
			inputHide();
			setTimeout(function () {
				inputShowInner();
			}, options.animationDelay + 10);
		} else {
			inputShowInner();
		}
	}

	function inputHide() {

		inputOuter.style.top = '-' + inputOuter.offsetHeight - 5 + 'px';
		inputBackground.style.opacity = '0';
		setTimeout(function () {
			removeClass(inputOuter, 'notie-transition');
			inputBackground.style.display = 'none';
			inputOuter.style.top = '-10000px';
			scrollEnable();
			inputIsShowing = false;
		}, options.animationDelay + 10);
	}
	// Select
	var confirmOuter = document.createElement('div');
	confirmOuter.id = 'notie-confirm-outer';

	var confirmInner = document.createElement('div');
	confirmInner.id = 'notie-confirm-inner';
	confirmOuter.appendChild(confirmInner);

	var confirmText = document.createElement('span');
	confirmText.id = 'notie-confirm-text';
	confirmInner.appendChild(confirmText);

	var confirmYes = document.createElement('div');
	confirmYes.id = 'notie-confirm-yes';
	confirmOuter.appendChild(confirmYes);

	var confirmNo = document.createElement('div');
	confirmNo.id = 'notie-confirm-no';
	confirmOuter.appendChild(confirmNo);

	var confirmTextYes = document.createElement('span');
	confirmTextYes.id = 'notie-confirm-text-yes';
	confirmYes.appendChild(confirmTextYes);

	var confirmTextNo = document.createElement('span');
	confirmTextNo.id = 'notie-confirm-text-no';
	confirmNo.appendChild(confirmTextNo);

	var confirmBackground = document.createElement('div');
	confirmBackground.id = 'notie-confirm-background';
	addClass(confirmBackground, 'notie-transition');

	// Hide notie.confirm on no click and background click
	confirmBackground.onclick = function () {
		if (options.backgroundClickDismiss) {
			confirmHide();
		}
	};

	// Attach confirm elements to the body element
	document.body.appendChild(confirmOuter);
	document.body.appendChild(confirmBackground);

	// confirm helper variables
	var confirmIsShowing = false;

	function confirm(title, yesText, noText, yesCallback, noCallback) {
		if (options.colorInfo.length > 0) {
			confirmInner.style.backgroundColor = options.colorInf;
		}

		if (options.colorSuccess.length > 0) {
			confirmYes.style.backgroundColor = options.colorSuccess;
		}

		if (options.colorError.length > 0) {
			confirmNo.style.backgroundColor = options.colorError;
		}

		if (options.colorText.length > 0) {
			confirmText.style.color = options.colorText;
			confirmTextYes.style.color = options.colorText;
			confirmTextNo.style.color = options.colorText;
		}

		blur();

		if (alertIsShowing) {
			// Hide notie.alert
			alertHide(function () {
				confirmShow(title, yesText, noText, yesCallback, noCallback);
			});
		} else {
			confirmShow(title, yesText, noText, yesCallback, noCallback);
		}
	}

	function confirmShow(title, yesText, noText, yesCallback, noCallback) {
		scrollDisable();

		// Yes callback function
		confirmYes.onclick = function () {
			confirmHide();
			if (yesCallback) {
				setTimeout(function () {
					yesCallback();
				}, options.animationDelay + 10);
			}
		};

		// No callback function
		confirmNo.onclick = function () {
			confirmHide();
			if (noCallback) {
				setTimeout(function () {
					noCallback();
				}, options.animationDelay + 10);
			}
		};

		function confirmShowInner() {
			// Set confirm text
			confirmText.innerHTML = title;
			confirmTextYes.innerHTML = yesText;
			confirmTextNo.innerHTML = noText;

			// Get confirm's height
			confirmOuter.style.top = '-10000px';
			confirmOuter.style.display = 'table';
			confirmOuter.style.top = '-' + confirmOuter.offsetHeight - 5 + 'px';
			confirmBackground.style.display = 'block';

			setTimeout(function () {
				addClass(confirmOuter, 'notie-transition');

				confirmOuter.style.top = 0;
				confirmBackground.style.opacity = '0.75';

				setTimeout(function () {
					confirmIsShowing = true;
				}, options.animationDelay + 10);
			}, 20);
		}

		if (confirmIsShowing) {
			confirmHide();
			setTimeout(function () {
				confirmShowInner();
			}, options.animationDelay + 10);
		} else {
			confirmShowInner();
		}
	}

	function confirmHide() {
		confirmOuter.style.top = '-' + confirmOuter.offsetHeight - 5 + 'px';
		confirmBackground.style.opacity = '0';

		setTimeout(function () {
			removeClass(confirmOuter, 'notie-transition');
			confirmOuter.style.top = '-10000px';
			confirmBackground.style.display = 'none';

			scrollEnable();

			confirmIsShowing = false;
		}, options.animationDelay + 10);
	}
	// Internal helper functions
	function addClass(element, className) {
		if (element.classList) {
			element.classList.add(className);
		} else {
			element.className += ' ' + className;
		}
	}

	function removeClass(element, className) {
		if (element.classList) {
			element.classList.remove(className);
		} else {
			element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}

	function blur() {
		document.activeElement.blur();
	}

	var originalBodyHeight = void 0,
	    originalBodyOverflow = void 0;

	function scrollDisable() {
		originalBodyHeight = document.body.style.height;
		originalBodyOverflow = document.body.style.overflow;
		document.body.style.height = '100%';
		document.body.style.overflow = 'hidden';
	}

	function scrollEnable() {
		document.body.style.height = originalBodyHeight;
		document.body.style.overflow = originalBodyOverflow;
	}

	window.addEventListener('keydown', function (event) {
		var enterClicked = event.which === 13 || event.keyCode === 13;
		var escapeClicked = event.which === 27 || event.keyCode === 27;
		if (alertIsShowing) {
			if (enterClicked || escapeClicked) {
				alertHide();
			}
		} else if (inputIsShowing) {
			if (enterClicked) {
				inputYes.click();
			} else if (escapeClicked) {
				inputHide();
			}
		}
	});

	//Start application with args (category, interval)
	var codelangStart = function codelangStart() {
		var category = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
		var minutesInterval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

		var request = new XMLHttpRequest();
		var phrases = {};
		var _args = {};
		request.open('GET', base_url + '/api/eng/readphrases/', true); ///get options in gulp
		request.onload = function () {
			if (request.status >= 200 && request.status < 400) {
				_args = JSON.parse(request.responseText);
				phrases = _args.phrases;
				category = _args.category;
				minutesInterval = _args.minutesInterval;
				// console.log(phrases);
			} else {
				// We reached our target server, but it returned an error
				console.log("error in server");
			}
		};
		request.onerror = function () {
			// There was a connection error of some sort
		};
		request.send();

		//User doing
		var user = {
			nivel: "1",
			timestamp: new Date().getTime(),
			par: true
		};

		//Start time
		var nowMinute = new Date().getMinutes();
		var now = new Date().getTime();
		//Welcome user
		if (get("codelang") == null) {
			alert(4, 'Welcome to the codelang! :D', 3);
			put("codelang", JSON.stringify(user));
			put("even", true);
		}

		function getRandomQuestion() {
			var randOddNumber = 1,
			    randQuestion = void 0,
			    responseQuestion = void 0;

			var rand = Math.floor(Math.random() * phrases.length);
			if (rand != 0) randOddNumber = rand % 2 == 0 ? rand - 1 : rand; //need to be odd 

			randQuestion = phrases[randOddNumber].toLowerCase();
			randQuestion = removeDot(randQuestion);

			responseQuestion = phrases[randOddNumber - 1].toLowerCase();
			responseQuestion = removeDot(responseQuestion);

			// console.log(randQuestion, responseQuestion);
			//get multiple response
			responseQuestion = responseQuestion.split('/').map(function (n) {
				return n.trim();
			});
			// console.log('-->',responseQuestion);
			seeQuestion(randQuestion, responseQuestion);
		}

		//remove dot in final str
		function removeDot(line) {
			return line[line.length - 1] === '.' ? line.slice(0, line.indexOf(line[line.length - 1])) //final text
			: /* ;^;  */line;
		}

		//check response with value entered, with multiple response
		function checkResponse(response, valueEntered) {
			return response.some(function (n) {
				return n.toLowerCase() === valueEntered.toLowerCase();
			});
		}

		//if checked is true, codelang alert!
		function seeQuestion(phrase, response) {
			input({
				type: 'text',
				placeholder: 'Translate to portuguese here',
				prefilledValue: ''
			}, phrase, 'Submit', 'I don\'t know =(', function (valueEntered) {
				if (checkResponse(response, valueEntered)) {
					alert(1, 'Right! 👊 (• ͜ʖ•)', 2);
				} else {
					alert(3, '<b>' + response + '</b> =(', 2);
				}
			}, function (valueEntered) {
				alert(3, '<b>' + response + '</b>', 2);
			});
			ls2.save('codelangInterval', '{mykey:"codelangEven"}', minutesInterval * 60 * 1000);
			// let checkVal = setInterval(myTimer, 200);
		}

		ls2.load('codelangInterval');

		// Check Data
		var isStarted = ls2.load('codelangInterval');
		var checkVal = setInterval(myTimer, 200);
		var i = 200;
		function myTimer() {
			i += 200;
			var result = ls2.load('codelangInterval');
			// console.log(i + ': ' + result);
			if (result === false) {
				clearInterval(checkVal);
				getRandomQuestion();
			}
		}
	};

	var args = function args() {
		var request = new XMLHttpRequest();
		var content = '';
		request.open('GET', base_url + '/api/categories', true);
		request.onload = function () {
			if (request.status >= 200 && request.status < 400) {
				content = JSON.parse(request.responseText).categories;
				content = content.map(function (n) {
					return n.slice(0, n.indexOf('.txt')).slice(0, n.indexOf('-pt')).slice(0, n.indexOf('-eng')).replace(/-/g, ' ');
				});
				//print
				console.log("1\xBA arg: CATEGORIES: ");
				content.map(function (n, i) {
					return console.log(n + ": ", i);
				});
				console.log("2\xBA arg: Time interval");
			}
		};
		request.send();
	};
	codelangStart(); //in gulp, starting without codelang.start
	return {
		start: codelangStart,
		args: args
	};
}();

/*
*
* 	His was tested in IE (7-9), Firefox, Opera and Chrome:
* 	Dynamic style
*
*/
var css = ".notie-transition {\n\t-moz-transition: all 0.3s ease;\n\t-webkit-transition: all 0.3s ease;\n\ttransition: all 0.3s ease; }\n\n\t.notie-background-success {\n\t  background-color: #57BF57; }\n\n\t.notie-background-warning {\n\t  background-color: #D6A14D; }\n\n\t.notie-background-error {\n\t  background-color: #E1715B; }\n\n\t.notie-background-info {\n\t  background-color: #4D82D6; }\n\n\t#notie-alert-outer, #notie-confirm-outer, #notie-input-outer, #notie-select-outer {\n\t  position: fixed;\n\t  top: 0;\n\t  left: 0;\n\t  z-index: 999999999;\n\t  height: auto;\n\t  width: 100%;\n\t  display: none;\n\t  text-align: center;\n\t  cursor: pointer;\n\t  font-size: 24px;\n\t  -o-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);\n\t  -ms-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);\n\t  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);\n\t  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);\n\t  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5); }\n\t  @media (max-width: 600px) {\n\t    #notie-alert-outer, #notie-confirm-outer, #notie-input-outer, #notie-select-outer {\n\t      font-size: 18px; } }\n\n\t#notie-alert-inner {\n\t  padding: 20px;\n\t  display: table-cell; }\n\n\t#notie-alert-content {\n\t  max-width: 900px;\n\t  margin: 0 auto; }\n\n\t#notie-alert-text {\n\t  color: #FFFFFF; }\n\n\t#notie-confirm-outer {\n\t  cursor: default; }\n\n\t#notie-confirm-inner, #notie-input-inner, #notie-select-inner {\n\t  box-sizing: border-box;\n\t  width: 100%;\n\t  padding: 20px;\n\t  display: block;\n\t  cursor: default;\n\t  background-color: #4D82D6; }\n\n\t#notie-confirm-text {\n\t  color: #FFFFFF; }\n\n\t#notie-confirm-text-yes {\n\t  color: #FFFFFF; }\n\n\t#notie-confirm-text-no {\n\t  color: #FFFFFF; }\n\n\t#notie-confirm-yes, #notie-confirm-no, #notie-input-no, #notie-input-yes {\n\t  float: left;\n\t  height: 50px;\n\t  line-height: 50px;\n\t  width: 50%;\n\t  cursor: pointer;\n\t  background-color: #57BF57; }\n\n\t#notie-confirm-no, #notie-input-no {\n\t  float: right;\n\t  background-color: #E1715B; }\n\n\t#notie-confirm-background, #notie-input-background, #notie-select-background {\n\t  position: fixed;\n\t  top: 0;\n\t  left: 0;\n\t  z-index: 999999980;\n\t  height: 100%;\n\t  width: 100%;\n\t  display: none;\n\t  background-color: #FFFFFF;\n\t  opacity: 0; }\n\n\t/* INPUT */\n\t#notie-input-outer {\n\t  cursor: default; }\n\n\t#notie-input-field {\n\t  display: block;\n\t  box-sizing: border-box;\n\t  height: 55px;\n\t  width: 100%;\n\t  text-align: center;\n\t  outline: 0;\n\t  border: 0;\n\t  background-color: #FFFFFF;\n\t  font-family: inherit;\n\t  font-size: 24px; }\n\t  @media (max-width: 600px) {\n\t    #notie-input-field {\n\t      font-size: 18px; } }\n\n\t#notie-input-text {\n\t  color: #FFFFFF; }\n\n\t#notie-input-text-yes {\n\t  color: #FFFFFF; }\n\n\t#notie-input-text-no {\n\t  color: #FFFFFF; }\n\n\t#notie-select-outer {\n\t  top: auto;\n\t  bottom: 0;\n\t  cursor: default; }\n\n\t#notie-select-text {\n\t  color: #FFFFFF; }\n\n\t#notie-select-choices, .notie-select-choice {\n\t  background-color: #57BF57; }\n\n\t.notie-select-choice {\n\t  height: 50px;\n\t  line-height: 50px;\n\t  color: #FFFFFF;\n\t  cursor: pointer; }\n\n\t#notie-select-cancel {\n\t  height: 60px;\n\t  line-height: 60px;\n\t  color: #FFFFFF;\n\t  cursor: pointer;\n\t  background-color: #A0A0A0; }}",
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet) {
	style.styleSheet.cssText = css;
} else {
	style.appendChild(document.createTextNode(css));
}

head.appendChild(style);