/*!
 * 
 *   typed.js - A JavaScript Typing Animation Library
 *   Author: Matt Boldt <me@mattboldt.com>
 *   Version: v2.0.11
 *   Url: https://github.com/mattboldt/typed.js
 *   License(s): MIT
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Typed"] = factory();
	else
		root["Typed"] = factory();
***REMOVED***)(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {***REMOVED***;
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {***REMOVED***,
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		***REMOVED***;
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	***REMOVED***
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ ***REMOVED***)
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	***REMOVED***);
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); ***REMOVED*** ***REMOVED*** return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; ***REMOVED***; ***REMOVED***)();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); ***REMOVED*** ***REMOVED***
	
	var _initializerJs = __webpack_require__(1);
	
	var _htmlParserJs = __webpack_require__(3);
	
	/**
	 * Welcome to Typed.js!
	 * @param {string***REMOVED*** elementId HTML element ID _OR_ HTML element
	 * @param {object***REMOVED*** options options object
	 * @returns {object***REMOVED*** a new Typed object
	 */
	
	var Typed = (function () {
	  function Typed(elementId, options) {
	    _classCallCheck(this, Typed);
	
	    // Initialize it up
	    _initializerJs.initializer.load(this, options, elementId);
	    // All systems go!
	    this.begin();
	  ***REMOVED***
	
	  /**
	   * Toggle start() and stop() of the Typed instance
	   * @public
	   */
	
	  _createClass(Typed, [{
	    key: 'toggle',
	    value: function toggle() {
	      this.pause.status ? this.start() : this.stop();
	    ***REMOVED***
	
	    /**
	     * Stop typing / backspacing and enable cursor blinking
	     * @public
	     */
	  ***REMOVED***, {
	    key: 'stop',
	    value: function stop() {
	      if (this.typingComplete) return;
	      if (this.pause.status) return;
	      this.toggleBlinking(true);
	      this.pause.status = true;
	      this.options.onStop(this.arrayPos, this);
	    ***REMOVED***
	
	    /**
	     * Start typing / backspacing after being stopped
	     * @public
	     */
	  ***REMOVED***, {
	    key: 'start',
	    value: function start() {
	      if (this.typingComplete) return;
	      if (!this.pause.status) return;
	      this.pause.status = false;
	      if (this.pause.typewrite) {
	        this.typewrite(this.pause.curString, this.pause.curStrPos);
	      ***REMOVED*** else {
	        this.backspace(this.pause.curString, this.pause.curStrPos);
	      ***REMOVED***
	      this.options.onStart(this.arrayPos, this);
	    ***REMOVED***
	
	    /**
	     * Destroy this instance of Typed
	     * @public
	     */
	  ***REMOVED***, {
	    key: 'destroy',
	    value: function destroy() {
	      this.reset(false);
	      this.options.onDestroy(this);
	    ***REMOVED***
	
	    /**
	     * Reset Typed and optionally restarts
	     * @param {boolean***REMOVED*** restart
	     * @public
	     */
	  ***REMOVED***, {
	    key: 'reset',
	    value: function reset() {
	      var restart = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
	      clearInterval(this.timeout);
	      this.replaceText('');
	      if (this.cursor && this.cursor.parentNode) {
	        this.cursor.parentNode.removeChild(this.cursor);
	        this.cursor = null;
	      ***REMOVED***
	      this.strPos = 0;
	      this.arrayPos = 0;
	      this.curLoop = 0;
	      if (restart) {
	        this.insertCursor();
	        this.options.onReset(this);
	        this.begin();
	      ***REMOVED***
	    ***REMOVED***
	
	    /**
	     * Begins the typing animation
	     * @private
	     */
	  ***REMOVED***, {
	    key: 'begin',
	    value: function begin() {
	      var _this = this;
	
	      this.options.onBegin(this);
	      this.typingComplete = false;
	      this.shuffleStringsIfNeeded(this);
	      this.insertCursor();
	      if (this.bindInputFocusEvents) this.bindFocusEvents();
	      this.timeout = setTimeout(function () {
	        // Check if there is some text in the element, if yes start by backspacing the default message
	        if (!_this.currentElContent || _this.currentElContent.length === 0) {
	          _this.typewrite(_this.strings[_this.sequence[_this.arrayPos]], _this.strPos);
	        ***REMOVED*** else {
	          // Start typing
	          _this.backspace(_this.currentElContent, _this.currentElContent.length);
	        ***REMOVED***
	      ***REMOVED***, this.startDelay);
	    ***REMOVED***
	
	    /**
	     * Called for each character typed
	     * @param {string***REMOVED*** curString the current string in the strings array
	     * @param {number***REMOVED*** curStrPos the current position in the curString
	     * @private
	     */
	  ***REMOVED***, {
	    key: 'typewrite',
	    value: function typewrite(curString, curStrPos) {
	      var _this2 = this;
	
	      if (this.fadeOut && this.el.classList.contains(this.fadeOutClass)) {
	        this.el.classList.remove(this.fadeOutClass);
	        if (this.cursor) this.cursor.classList.remove(this.fadeOutClass);
	      ***REMOVED***
	
	      var humanize = this.humanizer(this.typeSpeed);
	      var numChars = 1;
	
	      if (this.pause.status === true) {
	        this.setPauseStatus(curString, curStrPos, true);
	***REMOVED***;
	      ***REMOVED***
	
	      // contain typing function in a timeout humanize'd delay
	      this.timeout = setTimeout(function () {
	        // skip over any HTML chars
	        curStrPos = _htmlParserJs.htmlParser.typeHtmlChars(curString, curStrPos, _this2);
	
	        var pauseTime = 0;
	        var substr = curString.substr(curStrPos);
	        // check for an escape character before a pause value
	        // format: \^\d+ .. eg: ^1000 .. should be able to print the ^ too using ^^
	        // single ^ are removed from string
	        if (substr.charAt(0) === '^') {
	          if (/^\^\d+/.test(substr)) {
	            var skip = 1; // skip at least 1
	            substr = /\d+/.exec(substr)[0];
	            skip += substr.length;
	            pauseTime = parseInt(substr);
	            _this2.temporaryPause = true;
	            _this2.options.onTypingPaused(_this2.arrayPos, _this2);
	            // strip out the escape character and pause value so they're not printed
	            curString = curString.substring(0, curStrPos) + curString.substring(curStrPos + skip);
	            _this2.toggleBlinking(true);
	          ***REMOVED***
	        ***REMOVED***
	
	        // check for skip characters formatted as
	        // "this is a `string to print NOW` ..."
	        if (substr.charAt(0) === '`') {
	          while (curString.substr(curStrPos + numChars).charAt(0) !== '`') {
	            numChars++;
	            if (curStrPos + numChars > curString.length) break;
	          ***REMOVED***
	          // strip out the escape characters and append all the string in between
	          var stringBeforeSkip = curString.substring(0, curStrPos);
	          var stringSkipped = curString.substring(stringBeforeSkip.length + 1, curStrPos + numChars);
	          var stringAfterSkip = curString.substring(curStrPos + numChars + 1);
	          curString = stringBeforeSkip + stringSkipped + stringAfterSkip;
	          numChars--;
	        ***REMOVED***
	
	        // timeout for any pause after a character
	        _this2.timeout = setTimeout(function () {
	          // Accounts for blinking while paused
	          _this2.toggleBlinking(false);
	
	          // We're done with this sentence!
	          if (curStrPos >= curString.length) {
	            _this2.doneTyping(curString, curStrPos);
	          ***REMOVED*** else {
	            _this2.keepTyping(curString, curStrPos, numChars);
	          ***REMOVED***
	          // end of character pause
	          if (_this2.temporaryPause) {
	            _this2.temporaryPause = false;
	            _this2.options.onTypingResumed(_this2.arrayPos, _this2);
	          ***REMOVED***
	        ***REMOVED***, pauseTime);
	
	        // humanized value for typing
	      ***REMOVED***, humanize);
	    ***REMOVED***
	
	    /**
	     * Continue to the next string & begin typing
	     * @param {string***REMOVED*** curString the current string in the strings array
	     * @param {number***REMOVED*** curStrPos the current position in the curString
	     * @private
	     */
	  ***REMOVED***, {
	    key: 'keepTyping',
	    value: function keepTyping(curString, curStrPos, numChars) {
	      // call before functions if applicable
	      if (curStrPos === 0) {
	        this.toggleBlinking(false);
	        this.options.preStringTyped(this.arrayPos, this);
	      ***REMOVED***
	      // start typing each new char into existing string
	      // curString: arg, this.el.html: original text inside element
	      curStrPos += numChars;
	      var nextString = curString.substr(0, curStrPos);
	      this.replaceText(nextString);
	      // loop the function
	      this.typewrite(curString, curStrPos);
	    ***REMOVED***
	
	    /**
	     * We're done typing the current string
	     * @param {string***REMOVED*** curString the current string in the strings array
	     * @param {number***REMOVED*** curStrPos the current position in the curString
	     * @private
	     */
	  ***REMOVED***, {
	    key: 'doneTyping',
	    value: function doneTyping(curString, curStrPos) {
	      var _this3 = this;
	
	      // fires callback function
	      this.options.onStringTyped(this.arrayPos, this);
	      this.toggleBlinking(true);
	      // is this the final string
	      if (this.arrayPos === this.strings.length - 1) {
	        // callback that occurs on the last typed string
	        this.complete();
	        // quit if we wont loop back
	        if (this.loop === false || this.curLoop === this.loopCount) {
	  ***REMOVED***;
	        ***REMOVED***
	      ***REMOVED***
	      this.timeout = setTimeout(function () {
	        _this3.backspace(curString, curStrPos);
	      ***REMOVED***, this.backDelay);
	    ***REMOVED***
	
	    /**
	     * Backspaces 1 character at a time
	     * @param {string***REMOVED*** curString the current string in the strings array
	     * @param {number***REMOVED*** curStrPos the current position in the curString
	     * @private
	     */
	  ***REMOVED***, {
	    key: 'backspace',
	    value: function backspace(curString, curStrPos) {
	      var _this4 = this;
	
	      if (this.pause.status === true) {
	        this.setPauseStatus(curString, curStrPos, true);
	***REMOVED***;
	      ***REMOVED***
	      if (this.fadeOut) return this.initFadeOut();
	
	      this.toggleBlinking(false);
	      var humanize = this.humanizer(this.backSpeed);
	
	      this.timeout = setTimeout(function () {
	        curStrPos = _htmlParserJs.htmlParser.backSpaceHtmlChars(curString, curStrPos, _this4);
	        // replace text with base text + typed characters
	        var curStringAtPosition = curString.substr(0, curStrPos);
	        _this4.replaceText(curStringAtPosition);
	
	        // if smartBack is enabled
	        if (_this4.smartBackspace) {
	          // the remaining part of the current string is equal of the same part of the new string
	          var nextString = _this4.strings[_this4.arrayPos + 1];
	          if (nextString && curStringAtPosition === nextString.substr(0, curStrPos)) {
	            _this4.stopNum = curStrPos;
	          ***REMOVED*** else {
	            _this4.stopNum = 0;
	          ***REMOVED***
	        ***REMOVED***
	
	        // if the number (id of character in current string) is
	        // less than the stop number, keep going
	        if (curStrPos > _this4.stopNum) {
	          // subtract characters one by one
	          curStrPos--;
	          // loop the function
	          _this4.backspace(curString, curStrPos);
	        ***REMOVED*** else if (curStrPos <= _this4.stopNum) {
	          // if the stop number has been reached, increase
	          // array position to next string
	          _this4.arrayPos++;
	          // When looping, begin at the beginning after backspace complete
	          if (_this4.arrayPos === _this4.strings.length) {
	            _this4.arrayPos = 0;
	            _this4.options.onLastStringBackspaced();
	            _this4.shuffleStringsIfNeeded();
	            _this4.begin();
	          ***REMOVED*** else {
	            _this4.typewrite(_this4.strings[_this4.sequence[_this4.arrayPos]], curStrPos);
	          ***REMOVED***
	        ***REMOVED***
	        // humanized value for typing
	      ***REMOVED***, humanize);
	    ***REMOVED***
	
	    /**
	     * Full animation is complete
	     * @private
	     */
	  ***REMOVED***, {
	    key: 'complete',
	    value: function complete() {
	      this.options.onComplete(this);
	      if (this.loop) {
	        this.curLoop++;
	      ***REMOVED*** else {
	        this.typingComplete = true;
	      ***REMOVED***
	    ***REMOVED***
	
	    /**
	     * Has the typing been stopped
	     * @param {string***REMOVED*** curString the current string in the strings array
	     * @param {number***REMOVED*** curStrPos the current position in the curString
	     * @param {boolean***REMOVED*** isTyping
	     * @private
	     */
	  ***REMOVED***, {
	    key: 'setPauseStatus',
	    value: function setPauseStatus(curString, curStrPos, isTyping) {
	      this.pause.typewrite = isTyping;
	      this.pause.curString = curString;
	      this.pause.curStrPos = curStrPos;
	    ***REMOVED***
	
	    /**
	     * Toggle the blinking cursor
	     * @param {boolean***REMOVED*** isBlinking
	     * @private
	     */
	  ***REMOVED***, {
	    key: 'toggleBlinking',
	    value: function toggleBlinking(isBlinking) {
	      if (!this.cursor) return;
	      // if in paused state, don't toggle blinking a 2nd time
	      if (this.pause.status) return;
	      if (this.cursorBlinking === isBlinking) return;
	      this.cursorBlinking = isBlinking;
	      if (isBlinking) {
	        this.cursor.classList.add('typed-cursor--blink');
	      ***REMOVED*** else {
	        this.cursor.classList.remove('typed-cursor--blink');
	      ***REMOVED***
	    ***REMOVED***
	
	    /**
	     * Speed in MS to type
	     * @param {number***REMOVED*** speed
	     * @private
	     */
	  ***REMOVED***, {
	    key: 'humanizer',
	    value: function humanizer(speed) {
	      return Math.round(Math.random() * speed / 2) + speed;
	    ***REMOVED***
	
	    /**
	     * Shuffle the sequence of the strings array
	     * @private
	     */
	  ***REMOVED***, {
	    key: 'shuffleStringsIfNeeded',
	    value: function shuffleStringsIfNeeded() {
	      if (!this.shuffle) return;
	      this.sequence = this.sequence.sort(function () {
	***REMOVED*** Math.random() - 0.5;
	      ***REMOVED***);
	    ***REMOVED***
	
	    /**
	     * Adds a CSS class to fade out current string
	     * @private
	     */
	  ***REMOVED***, {
	    key: 'initFadeOut',
	    value: function initFadeOut() {
	      var _this5 = this;
	
	      this.el.className += ' ' + this.fadeOutClass;
	      if (this.cursor) this.cursor.className += ' ' + this.fadeOutClass;
	      return setTimeout(function () {
	        _this5.arrayPos++;
	        _this5.replaceText('');
	
	        // Resets current string if end of loop reached
	        if (_this5.strings.length > _this5.arrayPos) {
	          _this5.typewrite(_this5.strings[_this5.sequence[_this5.arrayPos]], 0);
	        ***REMOVED*** else {
	          _this5.typewrite(_this5.strings[0], 0);
	          _this5.arrayPos = 0;
	        ***REMOVED***
	      ***REMOVED***, this.fadeOutDelay);
	    ***REMOVED***
	
	    /**
	     * Replaces current text in the HTML element
	     * depending on element type
	     * @param {string***REMOVED*** str
	     * @private
	     */
	  ***REMOVED***, {
	    key: 'replaceText',
	    value: function replaceText(str) {
	      if (this.attr) {
	        this.el.setAttribute(this.attr, str);
	      ***REMOVED*** else {
	        if (this.isInput) {
	          this.el.value = str;
	        ***REMOVED*** else if (this.contentType === 'html') {
	          this.el.innerHTML = str;
	        ***REMOVED*** else {
	          this.el.textContent = str;
	        ***REMOVED***
	      ***REMOVED***
	    ***REMOVED***
	
	    /**
	     * If using input elements, bind focus in order to
	     * start and stop the animation
	     * @private
	     */
	  ***REMOVED***, {
	    key: 'bindFocusEvents',
	    value: function bindFocusEvents() {
	      var _this6 = this;
	
	      if (!this.isInput) return;
	      this.el.addEventListener('focus', function (e) {
	        _this6.stop();
	      ***REMOVED***);
	      this.el.addEventListener('blur', function (e) {
	        if (_this6.el.value && _this6.el.value.length !== 0) {
	  ***REMOVED***;
	        ***REMOVED***
	        _this6.start();
	      ***REMOVED***);
	    ***REMOVED***
	
	    /**
	     * On init, insert the cursor element
	     * @private
	     */
	  ***REMOVED***, {
	    key: 'insertCursor',
	    value: function insertCursor() {
	      if (!this.showCursor) return;
	      if (this.cursor) return;
	      this.cursor = document.createElement('span');
	      this.cursor.className = 'typed-cursor';
	      this.cursor.innerHTML = this.cursorChar;
	      this.el.parentNode && this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling);
	    ***REMOVED***
	  ***REMOVED***]);
	
	  return Typed;
	***REMOVED***)();
	
	exports['default'] = Typed;
	module.exports = exports['default'];

/***/ ***REMOVED***),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	***REMOVED***);
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; ***REMOVED*** ***REMOVED*** ***REMOVED*** return target; ***REMOVED***;
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); ***REMOVED*** ***REMOVED*** return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; ***REMOVED***; ***REMOVED***)();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj ***REMOVED***; ***REMOVED***
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); ***REMOVED*** ***REMOVED***
	
	var _defaultsJs = __webpack_require__(2);
	
	var _defaultsJs2 = _interopRequireDefault(_defaultsJs);
	
	/**
	 * Initialize the Typed object
	 */
	
	var Initializer = (function () {
	  function Initializer() {
	    _classCallCheck(this, Initializer);
	  ***REMOVED***
	
	  _createClass(Initializer, [{
	    key: 'load',
	
	    /**
	     * Load up defaults & options on the Typed instance
	     * @param {Typed***REMOVED*** self instance of Typed
	     * @param {object***REMOVED*** options options object
	     * @param {string***REMOVED*** elementId HTML element ID _OR_ instance of HTML element
	     * @private
	     */
	
	    value: function load(self, options, elementId) {
	      // chosen element to manipulate text
	      if (typeof elementId === 'string') {
	        self.el = document.querySelector(elementId);
	      ***REMOVED*** else {
	        self.el = elementId;
	      ***REMOVED***
	
	      self.options = _extends({***REMOVED***, _defaultsJs2['default'], options);
	
	      // attribute to type into
	      self.isInput = self.el.tagName.toLowerCase() === 'input';
	      self.attr = self.options.attr;
	      self.bindInputFocusEvents = self.options.bindInputFocusEvents;
	
	      // show cursor
	      self.showCursor = self.isInput ? false : self.options.showCursor;
	
	      // custom cursor
	      self.cursorChar = self.options.cursorChar;
	
	      // Is the cursor blinking
	      self.cursorBlinking = true;
	
	      // text content of element
	      self.elContent = self.attr ? self.el.getAttribute(self.attr) : self.el.textContent;
	
	      // html or plain text
	      self.contentType = self.options.contentType;
	
	      // typing speed
	      self.typeSpeed = self.options.typeSpeed;
	
	      // add a delay before typing starts
	      self.startDelay = self.options.startDelay;
	
	      // backspacing speed
	      self.backSpeed = self.options.backSpeed;
	
	      // only backspace what doesn't match the previous string
	      self.smartBackspace = self.options.smartBackspace;
	
	      // amount of time to wait before backspacing
	      self.backDelay = self.options.backDelay;
	
	      // Fade out instead of backspace
	      self.fadeOut = self.options.fadeOut;
	      self.fadeOutClass = self.options.fadeOutClass;
	      self.fadeOutDelay = self.options.fadeOutDelay;
	
	      // variable to check whether typing is currently paused
	      self.isPaused = false;
	
	      // input strings of text
	      self.strings = self.options.strings.map(function (s) {
	***REMOVED*** s.trim();
	      ***REMOVED***);
	
	      // div containing strings
	      if (typeof self.options.stringsElement === 'string') {
	        self.stringsElement = document.querySelector(self.options.stringsElement);
	      ***REMOVED*** else {
	        self.stringsElement = self.options.stringsElement;
	      ***REMOVED***
	
	      if (self.stringsElement) {
	        self.strings = [];
	        self.stringsElement.style.display = 'none';
	        var strings = Array.prototype.slice.apply(self.stringsElement.children);
	        var stringsLength = strings.length;
	
	        if (stringsLength) {
	          for (var i = 0; i < stringsLength; i += 1) {
	            var stringEl = strings[i];
	            self.strings.push(stringEl.innerHTML.trim());
	          ***REMOVED***
	        ***REMOVED***
	      ***REMOVED***
	
	      // character number position of current string
	      self.strPos = 0;
	
	      // current array position
	      self.arrayPos = 0;
	
	      // index of string to stop backspacing on
	      self.stopNum = 0;
	
	      // Looping logic
	      self.loop = self.options.loop;
	      self.loopCount = self.options.loopCount;
	      self.curLoop = 0;
	
	      // shuffle the strings
	      self.shuffle = self.options.shuffle;
	      // the order of strings
	      self.sequence = [];
	
	      self.pause = {
	        status: false,
	        typewrite: true,
	        curString: '',
	        curStrPos: 0
	      ***REMOVED***;
	
	      // When the typing is complete (when not looped)
	      self.typingComplete = false;
	
	      // Set the order in which the strings are typed
	      for (var i in self.strings) {
	        self.sequence[i] = i;
	      ***REMOVED***
	
	      // If there is some text in the element
	      self.currentElContent = this.getCurrentElContent(self);
	
	      self.autoInsertCss = self.options.autoInsertCss;
	
	      this.appendAnimationCss(self);
	    ***REMOVED***
	  ***REMOVED***, {
	    key: 'getCurrentElContent',
	    value: function getCurrentElContent(self) {
	      var elContent = '';
	      if (self.attr) {
	        elContent = self.el.getAttribute(self.attr);
	      ***REMOVED*** else if (self.isInput) {
	        elContent = self.el.value;
	      ***REMOVED*** else if (self.contentType === 'html') {
	        elContent = self.el.innerHTML;
	      ***REMOVED*** else {
	        elContent = self.el.textContent;
	      ***REMOVED***
	      return elContent;
	    ***REMOVED***
	  ***REMOVED***, {
	    key: 'appendAnimationCss',
	    value: function appendAnimationCss(self) {
	      var cssDataName = 'data-typed-js-css';
	      if (!self.autoInsertCss) {
	***REMOVED***;
	      ***REMOVED***
	      if (!self.showCursor && !self.fadeOut) {
	***REMOVED***;
	      ***REMOVED***
	      if (document.querySelector('[' + cssDataName + ']')) {
	***REMOVED***;
	      ***REMOVED***
	
	      var css = document.createElement('style');
	      css.type = 'text/css';
	      css.setAttribute(cssDataName, true);
	
	      var innerCss = '';
	      if (self.showCursor) {
	        innerCss += '\n        .typed-cursor{\n          opacity: 1;\n        ***REMOVED***\n        .typed-cursor.typed-cursor--blink{\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        ***REMOVED***\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; ***REMOVED***\n        ***REMOVED***\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; ***REMOVED***\n          50% { opacity: 0.0; ***REMOVED***\n          100% { opacity: 1; ***REMOVED***\n        ***REMOVED***\n      ';
	      ***REMOVED***
	      if (self.fadeOut) {
	        innerCss += '\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n        ***REMOVED***\n        .typed-cursor.typed-cursor--blink.typed-fade-out{\n          -webkit-animation: 0;\n          animation: 0;\n        ***REMOVED***\n      ';
	      ***REMOVED***
	      if (css.length === 0) {
	***REMOVED***;
	      ***REMOVED***
	      css.innerHTML = innerCss;
	      document.body.appendChild(css);
	    ***REMOVED***
	  ***REMOVED***]);
	
	  return Initializer;
	***REMOVED***)();
	
	exports['default'] = Initializer;
	var initializer = new Initializer();
	exports.initializer = initializer;

/***/ ***REMOVED***),
/* 2 */
/***/ (function(module, exports) {

	/**
	 * Defaults & options
	 * @returns {object***REMOVED*** Typed defaults & options
	 * @public
	 */
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	***REMOVED***);
	var defaults = {
	  /**
	   * @property {array***REMOVED*** strings strings to be typed
	   * @property {string***REMOVED*** stringsElement ID of element containing string children
	   */
	  strings: ['These are the default values...', 'You know what you should do?', 'Use your own!', 'Have a great day!'],
	  stringsElement: null,
	
	  /**
	   * @property {number***REMOVED*** typeSpeed type speed in milliseconds
	   */
	  typeSpeed: 0,
	
	  /**
	   * @property {number***REMOVED*** startDelay time before typing starts in milliseconds
	   */
	  startDelay: 0,
	
	  /**
	   * @property {number***REMOVED*** backSpeed backspacing speed in milliseconds
	   */
	  backSpeed: 0,
	
	  /**
	   * @property {boolean***REMOVED*** smartBackspace only backspace what doesn't match the previous string
	   */
	  smartBackspace: true,
	
	  /**
	   * @property {boolean***REMOVED*** shuffle shuffle the strings
	   */
	  shuffle: false,
	
	  /**
	   * @property {number***REMOVED*** backDelay time before backspacing in milliseconds
	   */
	  backDelay: 700,
	
	  /**
	   * @property {boolean***REMOVED*** fadeOut Fade out instead of backspace
	   * @property {string***REMOVED*** fadeOutClass css class for fade animation
	   * @property {boolean***REMOVED*** fadeOutDelay Fade out delay in milliseconds
	   */
	  fadeOut: false,
	  fadeOutClass: 'typed-fade-out',
	  fadeOutDelay: 500,
	
	  /**
	   * @property {boolean***REMOVED*** loop loop strings
	   * @property {number***REMOVED*** loopCount amount of loops
	   */
	  loop: false,
	  loopCount: Infinity,
	
	  /**
	   * @property {boolean***REMOVED*** showCursor show cursor
	   * @property {string***REMOVED*** cursorChar character for cursor
	   * @property {boolean***REMOVED*** autoInsertCss insert CSS for cursor and fadeOut into HTML <head>
	   */
	  showCursor: true,
	  cursorChar: '|',
	  autoInsertCss: true,
	
	  /**
	   * @property {string***REMOVED*** attr attribute for typing
	   * Ex: input placeholder, value, or just HTML text
	   */
	  attr: null,
	
	  /**
	   * @property {boolean***REMOVED*** bindInputFocusEvents bind to focus and blur if el is text input
	   */
	  bindInputFocusEvents: false,
	
	  /**
	   * @property {string***REMOVED*** contentType 'html' or 'null' for plaintext
	   */
	  contentType: 'html',
	
	  /**
	   * Before it begins typing
	   * @param {Typed***REMOVED*** self
	   */
	  onBegin: function onBegin(self) {***REMOVED***,
	
	  /**
	   * All typing is complete
	   * @param {Typed***REMOVED*** self
	   */
	  onComplete: function onComplete(self) {***REMOVED***,
	
	  /**
	   * Before each string is typed
	   * @param {number***REMOVED*** arrayPos
	   * @param {Typed***REMOVED*** self
	   */
	  preStringTyped: function preStringTyped(arrayPos, self) {***REMOVED***,
	
	  /**
	   * After each string is typed
	   * @param {number***REMOVED*** arrayPos
	   * @param {Typed***REMOVED*** self
	   */
	  onStringTyped: function onStringTyped(arrayPos, self) {***REMOVED***,
	
	  /**
	   * During looping, after last string is typed
	   * @param {Typed***REMOVED*** self
	   */
	  onLastStringBackspaced: function onLastStringBackspaced(self) {***REMOVED***,
	
	  /**
	   * Typing has been stopped
	   * @param {number***REMOVED*** arrayPos
	   * @param {Typed***REMOVED*** self
	   */
	  onTypingPaused: function onTypingPaused(arrayPos, self) {***REMOVED***,
	
	  /**
	   * Typing has been started after being stopped
	   * @param {number***REMOVED*** arrayPos
	   * @param {Typed***REMOVED*** self
	   */
	  onTypingResumed: function onTypingResumed(arrayPos, self) {***REMOVED***,
	
	  /**
	   * After reset
	   * @param {Typed***REMOVED*** self
	   */
	  onReset: function onReset(self) {***REMOVED***,
	
	  /**
	   * After stop
	   * @param {number***REMOVED*** arrayPos
	   * @param {Typed***REMOVED*** self
	   */
	  onStop: function onStop(arrayPos, self) {***REMOVED***,
	
	  /**
	   * After start
	   * @param {number***REMOVED*** arrayPos
	   * @param {Typed***REMOVED*** self
	   */
	  onStart: function onStart(arrayPos, self) {***REMOVED***,
	
	  /**
	   * After destroy
	   * @param {Typed***REMOVED*** self
	   */
	  onDestroy: function onDestroy(self) {***REMOVED***
	***REMOVED***;
	
	exports['default'] = defaults;
	module.exports = exports['default'];

/***/ ***REMOVED***),
/* 3 */
/***/ (function(module, exports) {

	/**
	 * TODO: These methods can probably be combined somehow
	 * Parse HTML tags & HTML Characters
	 */
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	***REMOVED***);
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); ***REMOVED*** ***REMOVED*** return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; ***REMOVED***; ***REMOVED***)();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); ***REMOVED*** ***REMOVED***
	
	var HTMLParser = (function () {
	  function HTMLParser() {
	    _classCallCheck(this, HTMLParser);
	  ***REMOVED***
	
	  _createClass(HTMLParser, [{
	    key: 'typeHtmlChars',
	
	    /**
	     * Type HTML tags & HTML Characters
	     * @param {string***REMOVED*** curString Current string
	     * @param {number***REMOVED*** curStrPos Position in current string
	     * @param {Typed***REMOVED*** self instance of Typed
	     * @returns {number***REMOVED*** a new string position
	     * @private
	     */
	
	    value: function typeHtmlChars(curString, curStrPos, self) {
	      if (self.contentType !== 'html') return curStrPos;
	      var curChar = curString.substr(curStrPos).charAt(0);
	      if (curChar === '<' || curChar === '&') {
	        var endTag = '';
	        if (curChar === '<') {
	          endTag = '>';
	        ***REMOVED*** else {
	          endTag = ';';
	        ***REMOVED***
	        while (curString.substr(curStrPos + 1).charAt(0) !== endTag) {
	          curStrPos++;
	          if (curStrPos + 1 > curString.length) {
	            break;
	          ***REMOVED***
	        ***REMOVED***
	        curStrPos++;
	      ***REMOVED***
	      return curStrPos;
	    ***REMOVED***
	
	    /**
	     * Backspace HTML tags and HTML Characters
	     * @param {string***REMOVED*** curString Current string
	     * @param {number***REMOVED*** curStrPos Position in current string
	     * @param {Typed***REMOVED*** self instance of Typed
	     * @returns {number***REMOVED*** a new string position
	     * @private
	     */
	  ***REMOVED***, {
	    key: 'backSpaceHtmlChars',
	    value: function backSpaceHtmlChars(curString, curStrPos, self) {
	      if (self.contentType !== 'html') return curStrPos;
	      var curChar = curString.substr(curStrPos).charAt(0);
	      if (curChar === '>' || curChar === ';') {
	        var endTag = '';
	        if (curChar === '>') {
	          endTag = '<';
	        ***REMOVED*** else {
	          endTag = '&';
	        ***REMOVED***
	        while (curString.substr(curStrPos - 1).charAt(0) !== endTag) {
	          curStrPos--;
	          if (curStrPos < 0) {
	            break;
	          ***REMOVED***
	        ***REMOVED***
	        curStrPos--;
	      ***REMOVED***
	      return curStrPos;
	    ***REMOVED***
	  ***REMOVED***]);
	
	  return HTMLParser;
	***REMOVED***)();
	
	exports['default'] = HTMLParser;
	var htmlParser = new HTMLParser();
	exports.htmlParser = htmlParser;

/***/ ***REMOVED***)
/******/ ])
***REMOVED***);
;