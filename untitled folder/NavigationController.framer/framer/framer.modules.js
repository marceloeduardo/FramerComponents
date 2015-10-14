require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var calc = require('../inc/calc'),
    utils = require('../inc/utils'),
    each = utils.each,
    Controls = require('../controls/Controls');

var DEFAULT_PROP = 'current';
var PRIVATE = ['onStart', 'onFrame', 'onUpdate', 'onComplete'];

var Action = (function () {
    function Action(props) {
        _classCallCheck(this, Action);

        var action = this;

        utils.each(this.getDefaultProps(), function (key, value) {
            action[key] = value;
        });

        this.values = {};
        this.set(props, this.getDefaultValueProp());
    }

    _createClass(Action, [{
        key: 'set',
        value: function set() {
            var _this = this;

            var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            var defaultProp = arguments.length <= 1 || arguments[1] === undefined ? DEFAULT_PROP : arguments[1];

            each(props, function (key, prop) {
                if (key !== 'values') {
                    _this[key] = prop;
                }
            });

            // Merge values
            if (props.values) {
                (function () {
                    var currentValues = _this.values,
                        values = props.values;

                    each(values, function (key, value) {
                        var existingValue = currentValues[key],
                            newValue = {};

                        if (utils.isObj(value)) {
                            newValue = value;
                        } else {
                            newValue[defaultProp] = value;
                        }

                        currentValues[key] = existingValue ? utils.merge(existingValue, newValue) : newValue;
                    });
                })();
            }

            return this;
        }
    }, {
        key: 'process',
        value: function process(actor, value) {
            return value.current;
        }

        /*
             Has Action ended?
             
             Returns true to end immedietly
             
             @return [boolean]: true
         */
    }, {
        key: 'hasEnded',
        value: function hasEnded() {
            return true;
        }
    }, {
        key: 'limit',
        value: function limit(output, value) {
            var restricted = calc.restricted(output, value.min, value.max),
                escapeAmp = value.escapeAmp !== undefined ? value.escapeAmp : 0;
            return restricted + (output - restricted) * escapeAmp;
        }
    }, {
        key: 'getControls',
        value: function getControls() {
            return Controls;
        }
    }, {
        key: 'getDefaultProps',
        value: function getDefaultProps() {
            return {};
        }
    }, {
        key: 'getDefaultValue',
        value: function getDefaultValue() {
            return {};
        }
    }, {
        key: 'getDefaultValueProp',
        value: function getDefaultValueProp() {
            return DEFAULT_PROP;
        }
    }, {
        key: 'getSet',
        value: function getSet() {
            var _this2 = this;

            var set = { values: this.values };

            each(this, function (key, prop) {
                if (_this2.hasOwnProperty(key) && PRIVATE.indexOf(key) === -1) {
                    set[key] = prop;
                }
            });

            return set;
        }
    }, {
        key: 'extend',
        value: function extend(props) {
            return new this.constructor(utils.merge(this, props), this.getDefaultValueProp());
        }
    }, {
        key: 'getPlayable',
        value: function getPlayable() {
            return this.extend();
        }
    }, {
        key: 'activate',
        value: function activate() {
            this.isActive = true;
            return this;
        }
    }, {
        key: 'deactivate',
        value: function deactivate() {
            this.isActive = false;
            return this;
        }
    }]);

    return Action;
})();

module.exports = Action;
},{"../controls/Controls":14,"../inc/calc":17,"../inc/utils":20}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Action = require('./Action'),
    calc = require('../inc/calc'),
    utils = require('../inc/utils'),
    simulations = require('./simulate/simulations');

var DEFAULT_PROP = 'velocity';

var Simulate = (function (_Action) {
    _inherits(Simulate, _Action);

    function Simulate() {
        _classCallCheck(this, Simulate);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _get(Object.getPrototypeOf(Simulate.prototype), 'constructor', this).apply(this, args);
        this.calculatesVelocity = true;
        this.inactiveFrames = 0;
    }

    _createClass(Simulate, [{
        key: 'getDefaultProps',
        value: function getDefaultProps() {
            return {
                maxInactiveFrames: 3
            };
        }
    }, {
        key: 'getDefaultValue',
        value: function getDefaultValue() {
            return {
                // [string]: Simulation to .run
                simulate: DEFAULT_PROP,

                // [number]: Deceleration to apply to value, in units per second
                deceleration: 0,

                // [number]: Acceleration to apply to value, in units per second
                acceleration: 0,

                // [number]: Factor to multiply velocity by on bounce
                bounce: 0,

                // [number]: Spring strength during 'string'
                spring: 80,

                // [number]: Timeconstant of glide
                timeConstant: 395,

                // [number]: Stop simulation under this speed
                stopSpeed: 5,

                // [boolean]: Capture with spring physics on limit breach
                capture: false,

                // [number]: Friction to apply per frame
                friction: 0,

                to: 0,
                round: false
            };
        }
    }, {
        key: 'getDefaultValueProp',
        value: function getDefaultValueProp() {
            return DEFAULT_PROP;
        }
    }, {
        key: 'onStart',
        value: function onStart() {
            this.started = utils.currentTime();
        }

        /*
            Simulate the Value's per-frame movement
            
            @param [Actor]
            @param [Value]: Current value
            @param [string]: Key of current value
            @param [number]: Duration of frame in ms
            @return [number]: Calculated value
        */
    }, {
        key: 'process',
        value: function process(actor, value, key, timeSinceLastFrame) {
            var simulate = value.simulate,
                simulation = utils.isString(simulate) ? simulations[simulate] : simulate,
                newVelocity = simulation ? simulation(value, timeSinceLastFrame, this.started) : 0;

            value.velocity = Math.abs(newVelocity) >= value.stopSpeed ? newVelocity : 0;
            return value.current + calc.speedPerFrame(value.velocity, timeSinceLastFrame);
        }

        /*
            Has this action ended?
            
            Use a framecounter to see if Action has changed in the last x frames
            and declare ended if not
            
            @param [Actor]
            @param [boolean]: Has Action changed?
            @return [boolean]: Has Action ended?
        */
    }, {
        key: 'hasEnded',
        value: function hasEnded(actor, hasChanged) {
            this.inactiveFrames = hasChanged ? 0 : this.inactiveFrames + 1;
            return this.inactiveFrames > actor.maxInactiveFrames;
        }

        /*
            Limit output to value range, if any
            
            If velocity is at or more than range, and value has a bounce property,
            run the bounce simulation
            
            @param [number]: Calculated output
            @param [Value]: Current Value
            @return [number]: Limit-adjusted output
        */
    }, {
        key: 'limit',
        value: function limit(output, value) {
            var isOutsideMax = output >= value.max,
                isOutsideMin = output <= value.min,
                isOutsideRange = isOutsideMax || isOutsideMin;

            if (isOutsideRange) {
                output = calc.restricted(output, value.min, value.max);

                if (value.bounce) {
                    value.velocity = simulations.bounce(value);
                } else if (value.capture) {
                    simulations.capture(value, isOutsideMax ? value.max : value.min);
                }
            }

            return output;
        }
    }]);

    return Simulate;
})(Action);

module.exports = Simulate;
},{"../inc/calc":17,"../inc/utils":20,"./Action":1,"./simulate/simulations":6}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Action = require('./Action'),
    Pointer = require('../input/Pointer'),
    calc = require('../inc/calc');

var Track = (function (_Action) {
    _inherits(Track, _Action);

    function Track() {
        _classCallCheck(this, Track);

        _get(Object.getPrototypeOf(Track.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Track, [{
        key: 'onFrameStart',

        /*
            Update input offset
        */
        value: function onFrameStart(actor, frameDuration, framestamp) {
            actor.state.input = this.input.onFrame(framestamp);
            this.inputOffset = calc.offset(this.inputOrigin, this.input.current);
        }

        /*
            Move Value relative to Input movement
            
            @param [Value]: Current value
            @param [string]: Key of current value
            @return [number]: Calculated value
        */
    }, {
        key: 'process',
        value: function process(actor, value, key) {
            return this.inputOffset.hasOwnProperty(key) ? value.origin + this.inputOffset[key] : value.current;
        }

        /*
            Has this Action ended? 
            
            @return [boolean]: False to make user manually finish .track()
        */
    }, {
        key: 'hasEnded',
        value: function hasEnded() {
            return false;
        }
    }, {
        key: 'bindInput',
        value: function bindInput(input) {
            this.input = !input.current ? new Pointer(input) : input;
            this.inputOrigin = this.input.get();
        }
    }, {
        key: 'getDefaultValue',
        value: function getDefaultValue() {
            return {
                amp: 1
            };
        }
    }]);

    return Track;
})(Action);

module.exports = Track;
},{"../inc/calc":17,"../input/Pointer":22,"./Action":1}],4:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Action = require('./Action'),
    calc = require('../inc/calc'),
    utils = require('../inc/utils'),
    each = utils.each,
    presetEasing = require('./tween/preset-easing'),
    valueOps = require('../actor/value-operations'),
    TweenControls = require('./tween/TweenControls'),
    nextSteps = {
    loop: 'restart',
    yoyo: 'reverse',
    flip: 'flipValues'
},

/*
    Ease value within ranged parameters
    
    @param [number]: Progress between 0 and 1
    @param [number]: Value of 0 progress
    @param [number]: Value of 1 progress
    @param [string || function]: Name of preset easing
        to use or generated easing function
    @return [number]: Value of eased progress in range
*/
ease = function ease(progress, from, to, _ease) {
    var progressLimited = calc.restricted(progress, 0, 1),
        easingFunction = utils.isString(_ease) ? presetEasing[_ease] : _ease;

    return calc.valueEased(progressLimited, from, to, easingFunction);
};

var COUNT = 'count';

var Tween = (function (_Action) {
    _inherits(Tween, _Action);

    function Tween() {
        _classCallCheck(this, Tween);

        _get(Object.getPrototypeOf(Tween.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Tween, [{
        key: 'getControls',
        value: function getControls() {
            return TweenControls;
        }
    }, {
        key: 'getDefaultProps',
        value: function getDefaultProps() {
            return {
                delay: 0,
                dilate: 1,
                duration: 300,
                loop: false,
                yoyo: false,
                flip: false,
                playDirection: 1,
                ended: true,
                elapsed: 0
            };
        }
    }, {
        key: 'getDefaultValue',
        value: function getDefaultValue() {
            return {
                delay: 0,
                duration: 300,
                ease: 'easeOut',
                stagger: 0,
                steps: 0,
                to: 0,
                round: false
            };
        }
    }, {
        key: 'getDefaultValueProp',
        value: function getDefaultValueProp() {
            return 'to';
        }

        /*
            Update Action elapsed time
            
            @param [object]: Action properties
            @param [number]: Timestamp of current frame
        */
    }, {
        key: 'onFrameStart',
        value: function onFrameStart(actor, frameDuration) {
            this.elapsed = this.elapsed || 0;

            if (frameDuration) {
                this.elapsed += frameDuration * actor.dilate * this.playDirection;
                this.ended = true;
            }
        }

        /*
            Calculate progress of value based on time elapsed,
            value delay/duration/stagger properties
             @param [Actor]
            @param [object]: Value state and properties
            @return [number]: Calculated value
        */
    }, {
        key: 'process',
        value: function process(actor, value) {
            var target = value.to,
                progressTarget = this.playDirection === 1 ? 1 : 0,
                newValue = value.current,
                progress;

            // If this value has a to property, otherwise we just return current value
            if (target !== undefined) {
                progress = calc.restricted(calc.progress(this.elapsed - value.delay, value.duration) - value.stagger, 0, 1);

                // Mark Action as NOT ended if still in progress
                if (progress !== progressTarget) {
                    this.ended = false;
                }

                // Step progress if we're stepping
                if (value.steps) {
                    progress = utils.stepProgress(progress, value.steps);
                }

                // Ease value
                newValue = ease(progress, value.origin, target, value.ease);
            }

            return newValue;
        }

        /*
            If this tween has ended, check if we loop/yoyo/flip
            
            @return [boolean]: Has this tween really really ended?
        */
    }, {
        key: 'hasEnded',
        value: function hasEnded(actor) {
            var _this = this;

            if (this.ended) {
                each(nextSteps, function (name, methodName) {
                    if (_this.checkNextStep(actor, name, _this[methodName])) {
                        _this.ended = false;
                        actor.hasChanged = true;
                        return false;
                    }
                });
            }

            return this.ended;
        }
    }, {
        key: 'checkNextStep',
        value: function checkNextStep(actor, name, method) {
            var stepTaken = false,
                step = this[name],
                count = this[name + COUNT] || 0,
                forever = step === true;

            if (forever || utils.isNum(step)) {
                ++count;
                this[name + COUNT] = count;

                if (forever || count <= step) {
                    method.call(this, actor);
                    stepTaken = true;
                }
            }

            return stepTaken;
        }
    }, {
        key: 'flipValues',
        value: function flipValues(actor) {
            var actorValues = actor.values;
            this.elapsed = this.duration - this.elapsed;

            each(this.values, function (key) {
                var value = actorValues[key];

                if (value.children) {
                    each(value.children, function (childKey) {
                        valueOps.flip(actorValues[key + childKey]);
                    });
                }

                valueOps.flip(value);
            });
        }
    }, {
        key: 'reverse',
        value: function reverse() {
            this.playDirection *= -1;
        }
    }, {
        key: 'restart',
        value: function restart() {
            this.elapsed = this.playDirection === 1 ? 0 : this.duration;
            this.started = utils.currentTime();
        }
    }]);

    return Tween;
})(Action);

module.exports = Tween;
},{"../actor/value-operations":13,"../inc/calc":17,"../inc/utils":20,"./Action":1,"./tween/TweenControls":9,"./tween/preset-easing":10}],5:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Action = require('./Action'),
    calc = require('../inc/calc'),
    STRING = 'string',

/*
    Translate our mapLink value into mapTo
    
    @param [number]: Calculated value from linked value
    @param [Value || object]: Linked value or empty object if we're linking to input
    @param [array]: List of numbers relating to linked value
    @param [array]: List of numbers relating to this value
*/
findMappedValue = function findMappedValue(newValue, linkedValue, toValue, mapLink, mapTo) {
    var mapLength = mapLink.length,
        i = 1,
        lastLinkValue,
        thisLinkValue,
        lastToValue,
        thisToValue;

    for (; i < mapLength; i++) {
        // Assign values from array, or if they're strings, look for them in linkedValue
        lastLinkValue = typeof mapLink[i - 1] === STRING ? linkedValue[mapLink[i - 1]] : mapLink[i - 1];
        thisLinkValue = typeof mapLink[i] === STRING ? linkedValue[mapLink[i]] : mapLink[i];
        lastToValue = typeof mapTo[i - 1] === STRING ? toValue[mapTo[i - 1]] : mapTo[i - 1];
        thisToValue = typeof mapTo[i] === STRING ? toValue[mapTo[i]] : mapTo[i];

        // Check if we've gone past our calculated value, or if we're at the end of the array
        if (newValue < thisLinkValue || i === mapLength - 1) {
            newValue = calc.value(calc.restricted(calc.progress(newValue, lastLinkValue, thisLinkValue), 0, 1), lastToValue, thisToValue);
            break;
        }
    }

    return newValue;
};

var Watch = (function (_Action) {
    _inherits(Watch, _Action);

    function Watch() {
        _classCallCheck(this, Watch);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _get(Object.getPrototypeOf(Watch.prototype), 'constructor', this).apply(this, args);
        this.isActive = true;
    }

    /*
        Process this value
        
        First check if this value exists as a Value, if not
        check within Input (if we have one)
            
        @param [Actor]
        @param [Value]: Current value
        @param [string]: Key of current value
        @return [number]: Calculated value
    */

    _createClass(Watch, [{
        key: 'process',
        value: function process(actor, value, key) {
            var values = actor.values,
                newValue = value.current,
                watchedKey = value.watch,
                watchedValue = values[watchedKey] ? values[watchedKey] : {},
                inputOffset = value.action ? value.action.inputOffset : false;

            // First look at Action and check value isn't linking itself
            if (watchedValue.current !== undefined && key !== watchedKey) {
                newValue = watchedValue.current;

                // Then check values in Input
            } else if (inputOffset && inputOffset.hasOwnProperty(watchedKey)) {
                    newValue = value.origin + inputOffset[watchedKey] * value.amp;
                }

            // If we have mapFrom and mapTo properties, translate the new value
            if (value.mapFrom && value.mapTo) {
                newValue = findMappedValue(newValue, watchedValue, value, value.mapFrom, value.mapTo);
            }

            return newValue;
        }
    }]);

    return Watch;
})(Action);

module.exports = Watch;
},{"../inc/calc":17,"./Action":1}],6:[function(require,module,exports){
"use strict";

var calc = require('../../inc/calc'),
    utils = require('../../inc/utils'),
    speedPerFrame = calc.speedPerFrame;

/*
    Add core physics simulations
*/
var simulations = {
    /*
        Velocity
        
        The default .run() simulation.
        
        Applies any set deceleration and acceleration to existing velocity
    */
    velocity: function velocity(value, duration) {
        value.velocity = value.velocity - speedPerFrame(value.deceleration, duration) + speedPerFrame(value.acceleration, duration);

        return simulations.friction(value, duration);
    },

    /*
        Glide
        
        Emulates touch device scrolling effects with exponential decay
        http://ariya.ofilabs.com/2013/11/javascript-kinetic-scrolling-part-2.html
    */
    glide: function glide(value, duration, started) {
        var timeUntilFinished = -utils.currentTime() - started,
            delta = -value.to * Math.exp(timeUntilFinished / value.timeConstant);

        return value.to + delta - value.current;
    },

    /*
        Friction
         Apply friction to the current value
        TODO: Make this framerate-independent
    */
    friction: function friction(value, duration) {
        var newVelocity = speedPerFrame(value.velocity, duration) * (1 - value.friction);

        return calc.speedPerSecond(newVelocity, duration);
    },

    spring: function spring(value, duration) {
        var distance = value.to - value.current;

        value.velocity += distance * speedPerFrame(value.spring, duration);

        return simulations.friction(value, duration);
    },

    bounce: function bounce(value) {
        var distance = 0,
            to = value.to,
            current = value.current,
            bounce = value.bounce;

        // If we're using glide simulation we have to flip our target too
        if (value.simulate === 'glide') {
            distance = to - current;
            value.to = current - distance * bounce;
        }

        return value.velocity *= -bounce;
    },

    capture: function capture(value, target) {
        value.to = target;
        value.simulate = 'spring';
        value.capture = value.min = value.max = undefined;
    }
};

module.exports = simulations;
},{"../../inc/calc":17,"../../inc/utils":20}],7:[function(require,module,exports){
/*
    Bezier function generator
        
    Gaëtan Renaudeau's BezierEasing
    https://github.com/gre/bezier-easing/blob/master/index.js  
    https://github.com/gre/bezier-easing/blob/master/LICENSE
    You're a hero
    
    Use
    
        var easeOut = new Bezier(.17,.67,.83,.67),
            x = easeOut(0.5); // returns 0.627...
*/
"use strict";

var NEWTON_ITERATIONS = 8,
    NEWTON_MIN_SLOPE = 0.001,
    SUBDIVISION_PRECISION = 0.0000001,
    SUBDIVISION_MAX_ITERATIONS = 10,
    K_SPLINE_TABLE_SIZE = 11,
    K_SAMPLE_STEP_SIZE = 1.0 / (K_SPLINE_TABLE_SIZE - 1.0),
    FLOAT_32_SUPPORTED = typeof Float32Array !== 'undefined',
    a = function a(a1, a2) {
    return 1.0 - 3.0 * a2 + 3.0 * a1;
},
    b = function b(a1, a2) {
    return 3.0 * a2 - 6.0 * a1;
},
    c = function c(a1) {
    return 3.0 * a1;
},
    getSlope = function getSlope(t, a1, a2) {
    return 3.0 * a(a1, a2) * t * t + 2.0 * b(a1, a2) * t + c(a1);
},
    calcBezier = function calcBezier(t, a1, a2) {
    return ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
},

/*
    Bezier constructor
*/
Bezier = function Bezier(mX1, mY1, mX2, mY2) {
    var sampleValues = FLOAT_32_SUPPORTED ? new Float32Array(K_SPLINE_TABLE_SIZE) : new Array(K_SPLINE_TABLE_SIZE),
        _precomputed = false,
        binarySubdivide = function binarySubdivide(aX, aA, aB) {
        var currentX,
            currentT,
            i = 0;

        do {
            currentT = aA + (aB - aA) / 2.0;
            currentX = calcBezier(currentT, mX1, mX2) - aX;
            if (currentX > 0.0) {
                aB = currentT;
            } else {
                aA = currentT;
            }
        } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);

        return currentT;
    },
        newtonRaphsonIterate = function newtonRaphsonIterate(aX, aGuessT) {
        var i = 0,
            currentSlope = 0.0,
            currentX;

        for (; i < NEWTON_ITERATIONS; ++i) {
            currentSlope = getSlope(aGuessT, mX1, mX2);

            if (currentSlope === 0.0) {
                return aGuessT;
            }

            currentX = calcBezier(aGuessT, mX1, mX2) - aX;
            aGuessT -= currentX / currentSlope;
        }

        return aGuessT;
    },
        calcSampleValues = function calcSampleValues() {
        for (var i = 0; i < K_SPLINE_TABLE_SIZE; ++i) {
            sampleValues[i] = calcBezier(i * K_SAMPLE_STEP_SIZE, mX1, mX2);
        }
    },
        getTForX = function getTForX(aX) {
        var intervalStart = 0.0,
            currentSample = 1,
            lastSample = K_SPLINE_TABLE_SIZE - 1,
            dist = 0.0,
            guessForT = 0.0,
            initialSlope = 0.0;

        for (; currentSample != lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
            intervalStart += K_SAMPLE_STEP_SIZE;
        }

        --currentSample;

        dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
        guessForT = intervalStart + dist * K_SAMPLE_STEP_SIZE;

        initialSlope = getSlope(guessForT, mX1, mX2);

        // If slope is greater than min
        if (initialSlope >= NEWTON_MIN_SLOPE) {
            return newtonRaphsonIterate(aX, guessForT);
            // Slope is equal to min
        } else if (initialSlope === 0.0) {
                return guessForT;
                // Slope is less than min
            } else {
                    return binarySubdivide(aX, intervalStart, intervalStart + K_SAMPLE_STEP_SIZE);
                }
    },
        precompute = function precompute() {
        _precomputed = true;
        if (mX1 != mY1 || mX2 != mY2) {
            calcSampleValues();
        }
    },

    /*
        Generated function
        
        Returns value 0-1 based on X
    */
    f = function f(aX) {
        var returnValue;

        if (!_precomputed) {
            precompute();
        }

        // If linear gradient, return X as T
        if (mX1 === mY1 && mX2 === mY2) {
            returnValue = aX;

            // If at start, return 0
        } else if (aX === 0) {
                returnValue = 0;

                // If at end, return 1
            } else if (aX === 1) {
                    returnValue = 1;
                } else {
                    returnValue = calcBezier(getTForX(aX), mY1, mY2);
                }

        return returnValue;
    };

    return f;
};

module.exports = Bezier;
},{}],8:[function(require,module,exports){
'use strict';

var Bezier = require('./Bezier'),

/*
    Mirror easing
    
    Mirrors the provided easing function, used here for mirroring an
    easeIn into an easeInOut
    
    @param [number]: Progress, from 0 - 1, of current shift
    @param [function]: The easing function to mirror
    @returns [number]: The easing-adjusted delta
*/
mirrorEasing = function mirrorEasing(progress, method) {
    return progress <= 0.5 ? method(2 * progress) / 2 : (2 - method(2 * (1 - progress))) / 2;
},

/*
    Reverse easing
    
    Reverses the output of the provided easing function, used for flipping easeIn
    curve to an easeOut.
    
    @param [number]: Progress, from 0 - 1, of current shift
    @param [function]: The easing function to reverse
    @returns [number]: The easing-adjusted delta
*/
reverseEasing = function reverseEasing(progress, method) {
    return 1 - method(1 - progress);
};

/*
    Easing class

    If provided easing function, returns easing function with 
    in/out/inOut variations

    If provided four arguments, returns new Bezier class instead.
*/
var Easing = function Easing(x1, y1, x2, y2) {
    var method = x1,
        easingFunction;

    // If this is a bezier curve, return a bezier function
    if (arguments.length > 1) {
        easingFunction = new Bezier(x1, y1, x2, y2);
    } else {
        easingFunction = function (progress) {
            return method(progress);
        };

        easingFunction['in'] = function (progress) {
            return method(progress);
        };

        easingFunction.out = function (progress) {
            return reverseEasing(progress, method);
        };

        easingFunction.inOut = function (progress) {
            return mirrorEasing(progress, method);
        };
    }

    return easingFunction;
};

module.exports = Easing;
},{"./Bezier":7}],9:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controls = require('../../controls/Controls');

var TweenControls = (function (_Controls) {
    _inherits(TweenControls, _Controls);

    function TweenControls() {
        _classCallCheck(this, TweenControls);

        _get(Object.getPrototypeOf(TweenControls.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(TweenControls, [{
        key: 'restart',
        value: function restart() {
            this.action.restart();
            return this;
        }
    }, {
        key: 'reverse',
        value: function reverse() {
            this.action.reverse();
            return this;
        }
    }, {
        key: 'seek',
        value: function seek(progress) {
            if (!this.actor.hasAction(this.id)) {
                this.start().pause();
            }

            this.action.elapsed = this.action.duration * progress;

            if (!this.action.isActive) {
                this.action.activate();
                this.actor.process.fire();
                this.action.deactivate();
            }

            return this;
        }
    }]);

    return TweenControls;
})(Controls);

module.exports = TweenControls;
},{"../../controls/Controls":14}],10:[function(require,module,exports){
/*
    Easing functions
    ----------------------------------------
    
    Generates and provides easing functions based on baseFunction definitions
    
    A call to easingFunction.get('functionName') returns a function that can be passed:
        @param [number]: Progress 0-1
        @param [number] (optional): Amp modifier, only accepted in some easing functions
                                    and is used to adjust overall strength
        @return [number]: Eased progress
        
    We can generate new functions by sending an easing function through easingFunction.extend(name, method).
    Which will make nameIn, nameOut and nameInOut functions available to use.
        
    Easing functions from Robert Penner
    http://www.robertpenner.com/easing/
        
    Bezier curve interpretor created from Gaëtan Renaudeau's original BezierEasing  
    https://github.com/gre/bezier-easing/blob/master/index.js  
    https://github.com/gre/bezier-easing/blob/master/LICENSE
*/
"use strict";

var Easing = require('./Easing'),
    easingFunction,

// Generate easing function with provided power
generatePowerEasing = function generatePowerEasing(power) {
    return function (progress) {
        return Math.pow(progress, power);
    };
},

/*
    Each of these base functions is an easeIn
    
    On init, we use EasingFunction.mirror and .reverse to generate easeInOut and
    easeOut functions respectively.
*/
baseEasing = {
    circ: function circ(progress) {
        return 1 - Math.sin(Math.acos(progress));
    },
    back: function back(progress) {
        var strength = 1.5;

        return progress * progress * ((strength + 1) * progress - strength);
    }
};

// Generate power easing easing
['ease', 'cubic', 'quart', 'quint'].forEach(function (easingName, i) {
    baseEasing[easingName] = generatePowerEasing(i + 2);
});

// Generate in/out/inOut variations
for (var key in baseEasing) {
    if (baseEasing.hasOwnProperty(key)) {
        easingFunction = new Easing(baseEasing[key]);
        baseEasing[key + 'In'] = easingFunction['in'];
        baseEasing[key + 'Out'] = easingFunction.out;
        baseEasing[key + 'InOut'] = easingFunction.inOut;
    }
}

/*
    Linear easing adjustment
    
    The default easing method, not added with .extend as it has no Out or InOut
    variation.
    
    @param [number]: Progress, from 0-1
    @return [number]: Unadjusted progress
*/
baseEasing.linear = function (progress) {
    return progress;
};

module.exports = baseEasing;
},{"./Easing":8}],11:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Process = require('../process/Process'),
    Queue = require('../inc/Queue'),
    utils = require('../inc/utils'),
    select = require('../inc/select-dom'),
    update = require('./update'),
    valueOps = require('./value-operations'),

/*
    Role imports
*/
defaultRole = require('../roles/defaultRole'),
    cssRole = require('../roles/css/cssRole'),
    svgRole = require('../roles/svg/svgRole'),
    drawPathRole = require('../roles/path/drawPathRole'),
    Action = require('../actions/Action'),
    each = utils.each;

var Actor = (function () {

    /*
        @param [object]
    */

    function Actor() {
        var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Actor);

        var props = utils.isString(opts) ? { element: opts } : opts;

        this.values = {};
        this.state = { values: {} };
        this.queue = new Queue();
        this.process = new Process(this, update);
        this.activeActions = {};
        this.numActive = 0;
        this.actionCounter = 0;
        this.activeValues = [];
        this.activeParents = [];

        // Get actual elements if this is a selector
        if (utils.isString(props.element)) {
            props.element = select(props.element)[0];
        }

        this.assignRoles(props.element, props.as, true);
        this.set(props);
        this.initRoles();
    }

    /*
        Set Actor properties and values
         @param [object]
        @returns [Actor]
    */

    _createClass(Actor, [{
        key: 'set',
        value: function set(opts) {
            var _this = this;

            each(opts, function (key, value) {
                if (key !== 'values' && key !== 'action') {
                    _this[key] = value;
                }
            });

            if (opts && opts.values) {
                this.values = valueOps.process(this.values, opts.values, opts, 'current', this);
            }

            // Check all active actions for any that can be removed
            each(this.activeActions, function (id, action) {
                var actionIsActive = false;

                each(_this.values, function (key, value) {
                    actionIsActive = value.action === action ? true : actionIsActive;
                });

                if (!actionIsActive) {
                    _this.unbindAction(id);
                }
            });

            return this;
        }

        /*
            Bind Action-specific controls to Actor
             @returns [Controls]
        */
    }, {
        key: 'controls',
        value: function controls(action) {
            var Controls = action.getControls();
            return new Controls(this, action.getPlayable());
        }

        /*
            Start a new Action
             @param [Action || number]
            @param [Input || event] (optional)
            @param [boolean] (optional): defined `true` if we surpress making new queue
            @returns [Controls]
        */
    }, {
        key: 'start',
        value: function start(toSet, input) {
            var actionExists = utils.isNum(toSet),
                action = actionExists ? this.getAction(toSet) : toSet.getPlayable(),
                opts = action.getSet(),
                surpressQueueClear = arguments[arguments.length - 1] === false;

            opts.action = action;

            this.set(opts);

            if (input) {
                action.bindInput(input);
            }

            if (!surpressQueueClear) {
                this.queue.clear();
            }

            // Fire all Role onStarts if not already active
            if (!this.isActive) {
                var numRoles = this.roles.length;
                for (var i = 0; i < numRoles; i++) {
                    var role = this.roles[i];
                    if (role.start) {
                        role.start.call(this);
                    }
                }
            }

            // Fire new action onStart
            if (!action.isActive && action.onStart) {
                action.onStart();
            }

            this.activate();

            if (!actionExists) {
                var Controls = action.getControls();
                return new Controls(this, action, true);
            }
        }

        /*
            Pause all active Actions
             @param [int] (optional)
            @returns [Actor]
        */
    }, {
        key: 'pause',
        value: function pause() {
            this.isActive = false;
            each(this.activeActions, function (id, action) {
                return action.deactivate();
            });
            this.process.stop();
            return this;
        }

        /*
            Resume all active Actions
             @param [int] (optional)
            @returns [Actor];
        */
    }, {
        key: 'resume',
        value: function resume() {
            this.isActive = true;
            each(this.activeActions, function (id, action) {
                return action.activate();
            });
            this.process.start();
            return this;
        }

        /*
            Stop all active Actions
             @param [int] (optional)
            @returns [Actor]
        */
    }, {
        key: 'stop',
        value: function stop() {
            this.activeActions = {};
            this.pause();
            return this;
        }

        /*
            Toggle all active Actions
             @param [int] (optional)
            @returns [Actor]
        */
    }, {
        key: 'toggle',
        value: function toggle() {
            return this.isActive ? this.pause() : this.resume();
        }

        /*
            Syncs `element` with current properties
             @returns [Actor]
        */
    }, {
        key: 'sync',
        value: function sync() {
            return this.start(new Action({ values: this.values }));
        }

        /*
            Add a new Action to the queue
        */
    }, {
        key: 'then',
        value: function then() {
            this.queue.add.apply(this.queue, arguments);
            return this;
        }

        /*
            Execute next in queue
        */
    }, {
        key: 'next',
        value: function next() {
            var next = this.queue.next();

            if (next) {
                if (utils.isFunc(next[0])) {
                    next[0]();
                    this.next();
                    // Or this is an action
                } else {
                        next.push(false);
                        this.start.apply(this, next);
                    }
            } else {
                this.stop();
            }

            return this;
        }

        /*
            Assign Roles based on element and manually provided props
             @param [object]: Element
            @param [Role || array]
            @param [boolean] (optional)
        */
    }, {
        key: 'assignRoles',
        value: function assignRoles(element, manualRoles, surpressInit) {
            // All Actors get a default Role that handles user callbacks
            this.roles = [defaultRole];

            // Auto-assign if no manually-set Roles
            if (!manualRoles && element) {
                this.autoAssignRoles(element);

                // Or manually set if provided
            } else if (manualRoles) {
                    if (utils.isArray(manualRoles)) {
                        this.roles.push.apply(this.roles, manualRoles);
                    } else {
                        this.roles.push(manualRoles);
                    }
                }

            if (!surpressInit) {
                this.initRoles();
            }
        }

        /*
            Automatically assign Roles based on element, designed
            to be extended
             @param [object]: Element
        */
    }, {
        key: 'autoAssignRoles',
        value: function autoAssignRoles(element) {
            // Add CSS role if HTMLElement
            if (element instanceof HTMLElement) {
                this.roles.push(cssRole);

                // Add SVG role if SVG element
            } else if (element instanceof SVGElement) {
                    this.roles.push(svgRole);

                    // Add Draw Path role if path element
                    if (element.tagName === 'path') {
                        this.roles.push(drawPathRole);
                    }
                }
        }

        /*
            Fire init callbacks
        */
    }, {
        key: 'initRoles',
        value: function initRoles() {
            var _this2 = this;

            // Fire init callback
            this.roles.forEach(function (role) {
                if (role.init) {
                    role.init.call(_this2);
                }
            });
        }
    }, {
        key: 'activate',
        value: function activate() {
            if (!this.isActive) {
                this.isActive = true;
                this.firstFrame = true;
                this.process.start();
            }
        }

        /*
            Bind Action and return its table id
             @param [Action]
            @returns [int]
        */
    }, {
        key: 'bindAction',
        value: function bindAction(action, id) {
            if (id === undefined) {
                id = this.actionCounter++;
            }

            if (!this.hasAction(id)) {
                this.activeActions[id] = action;
                this.numActive++;
            }

            return id;
        }
    }, {
        key: 'unbindAction',
        value: function unbindAction(id) {
            if (this.activeActions.hasOwnProperty(id)) {
                this.numActive--;
                delete this.activeActions[id];
            }

            if (!this.numActive) {
                this.stop();
            }
        }
    }, {
        key: 'getAction',
        value: function getAction(id) {
            return this.activeActions[id];
        }
    }, {
        key: 'hasAction',
        value: function hasAction(id) {
            return this.getAction(id) !== undefined;
        }

        /*
            Update processing order
            
            @param [string]
            @param [boolean]
            @param [boolean]
        */
    }, {
        key: 'updateOrder',
        value: function updateOrder(key, moveToBack, hasChildren) {
            var order = !hasChildren ? this.activeValues : this.activeParents,
                position = order.indexOf(key);

            // If key isn't list or moveToBack is set to true, add key
            if (position === -1 || moveToBack) {
                order.push(key);

                // If key already exists, remove
                if (position > -1) {
                    order.splice(position, 1);
                }
            }
        }

        // [boolean]: Is this Actor active?
    }, {
        key: 'isActive',
        get: function get() {
            return this._isActive;
        },

        // Set hasChanged to true is this is now active
        set: function set(status) {
            if (status === true) {
                this.hasChanged = status;
            }

            this._isActive = status;
        }
    }]);

    return Actor;
})();

module.exports = Actor;
},{"../actions/Action":1,"../inc/Queue":16,"../inc/select-dom":19,"../inc/utils":20,"../process/Process":26,"../roles/css/cssRole":34,"../roles/defaultRole":38,"../roles/path/drawPathRole":39,"../roles/svg/svgRole":42,"./update":12,"./value-operations":13}],12:[function(require,module,exports){
"use strict";

var valueTypeManager = require('../value-types/manager'),
    calc = require('../inc/calc'),
    utils = require('../inc/utils'),
    each = utils.each,
    Action = require('../actions/Action'),
    defaultAction = new Action(),
    Watch = require('../actions/Watch'),
    watcher = new Watch(),
    createMapper = function createMapper(role, mappedValues) {
    return function (name, val) {
        mappedValues[role.map(name)] = val;
    };
},

/*
    Check all Actions for `onEnd`, return true if all are true
     @param [Actor]
    @param [boolean]
    @returns [boolean]
*/
checkAllActionsHaveEnded = function checkAllActionsHaveEnded(actor, hasChanged) {
    var hasEnded = true,
        values = actor.state.values;

    each(actor.activeActions, function (key, action) {
        // Return if action has been deleted elsewhere
        if (!action) {
            return;
        }

        if (action.onFrame) {
            action.onFrame.call(actor, values);
        }

        if (action.onUpdate && hasChanged) {
            action.onUpdate.call(actor, values);
        }

        if (action.hasEnded && action.hasEnded(actor, hasChanged) === false) {
            hasEnded = false;
        } else {
            if (action.onComplete) {
                action.onComplete.call(actor);
            }
            actor.unbindAction(key);
        }
    });

    return hasEnded;
},

/*
    Update the Actor and its values
     @param [int]: Timestamp of rAF call
    @param [int]: Time since last frame
*/
update = function update(framestamp, frameDuration) {
    var numActiveValues = this.activeValues.length,
        numActiveParents = this.activeParents.length,
        numRoles = this.roles.length,
        state = this.state,
        hasChanged = false;

    // Update values
    for (var i = 0; i < numActiveValues; i++) {
        // Get value and key
        var key = this.activeValues[i];
        var value = this.values[key];
        var action = !value.action || value.action && !value.action.isActive ? defaultAction : value.action;

        // Fire action onFrameStart if not already fired
        if (action.onFrameStart && action.lastUpdate !== framestamp) {
            action.onFrameStart(this, frameDuration, framestamp);
            action.lastUpdate = framestamp;
        }

        // Calculate new value
        var updatedValue = utils.isString(value.watch) ? watcher.process(this, value) : action.process(this, value, key, frameDuration);

        // Limit if this action does that kind of thing
        if (action.limit && value.hasRange) {
            updatedValue = action.limit(updatedValue, value);
        }

        // Round value if round is true
        if (value.round) {
            updatedValue = Math.round(updatedValue);
        }

        // Update frameChange
        value.frameChange = updatedValue - value.current;

        // Calculate velocity if Action hasn't
        if (!action.calculatesVelocity) {
            value.velocity = calc.speedPerSecond(value.frameChange, frameDuration);
        }

        // Update current speed
        value.speed = Math.abs(value.velocity);

        // Check if value's changed
        if (value.current !== updatedValue || this.firstFrame) {
            hasChanged = true;
        }

        // Set new current
        value.current = updatedValue;
        var valueState = value.unit ? updatedValue + value.unit : updatedValue;

        // Put value in state if no parent
        if (!value.parent) {
            state.values[key] = valueState;

            // Or, add to parent state to be combined later
        } else {
                state[value.parent] = state[value.parent] || {};
                state[value.parent][value.propName] = valueState;
            }
    }

    // Update parent values from calculated children
    for (var i = 0; i < numActiveParents; i++) {
        var key = this.activeParents[i];
        var value = this.values[key];

        // Update parent value current property
        value.current = valueTypeManager[value.type].combine(state[key], value.template);

        // Update state
        state.values[key] = value.current;
    }

    // Fire `frame` and `update` callbacks on all Roles
    for (var i = 0; i < numRoles; i++) {
        var role = this.roles[i];
        var mappedValues = {};

        each(state.values, createMapper(role, mappedValues));

        if (role.frame) {
            role.frame.call(this, mappedValues);
        }

        if (role.update && hasChanged) {
            role.update.call(this, mappedValues);
        }
    }

    // Reset hasChanged before further Actions might affect this
    this.hasChanged = false;

    if (this.isActive) {
        this.isActive = false;

        if (checkAllActionsHaveEnded(this, hasChanged)) {
            // Fire `complete` callbacks
            for (var i = 0; i < numRoles; i++) {
                var role = this.roles[i];
                if (role.complete) {
                    role.complete.call(this);
                }
            }

            if (!this.isActive) {
                this.next();
            }
        } else {
            this.isActive = true;
            this.firstFrame = false;
        }
    }

    this.framestamp = framestamp;
};

module.exports = update;
},{"../actions/Action":1,"../actions/Watch":5,"../inc/calc":17,"../inc/utils":20,"../value-types/manager":51}],13:[function(require,module,exports){
'use strict';

var valueTypesManager = require('../value-types/manager'),
    calc = require('../inc/calc'),
    utils = require('../inc/utils'),
    isNum = utils.isNum,
    each = utils.each;

var numericalValues = ['current', 'to', 'min', 'max', 'velocity', 'friction', 'spring'],
    numNumericalValues = numericalValues.length,
    defaultValue = {
    current: 0,
    velocity: 0,
    speed: 0,
    frameChange: 0
};

function checkNumericalValue(name) {
    return numericalValues.indexOf(name) > -1;
}

/*
    Check Role typeMaps to see if this value name has been mapped
    to a specific value type

    @param [string]
    @param [array]
    @returns [string]: Value type
*/
function checkRoles(name, roles) {
    var valueType;

    each(roles, function (key, role) {
        if (role._typeMap) {
            valueType = role._typeMap[role.map(name)] || valueType;
        }
    });

    return valueType;
}

/*
    Check value for special type

    @param [object]
    @param [object]
    @param [object]
    @param [string]
    @returns [string || false]
*/
function checkValueType(existingValue, newValue, scope, valueName) {
    var valueType;

    // Check existing value for type already set
    if (existingValue && existingValue.type) {
        valueType = existingValue.type;
    } else {
        // Or check Role _typeMap properties
        if (scope.roles) {
            valueType = checkRoles(valueName, scope.roles);
        }

        // Finally run tests
        if (!valueType && utils.isString(newValue.current)) {
            valueType = valueTypesManager.test(newValue.current);
        }
    }

    return valueType;
}

/*
    Resolve a property

    @param [string]
    @param [string || function || number]
    @param [object]
    @param [object]
    @returns [number]
*/
function resolve(name, prop, value, scope) {
    var isNumericalValue = checkNumericalValue(name);

    // If function, resolve
    if (utils.isFunc(prop) && isNumericalValue) {
        prop = prop.call(scope, scope);
    }

    // If string, check for relative numbers and units
    if (utils.isString(prop)) {
        // If relative value
        if (prop.indexOf('=') > 0) {
            prop = calc.relativeValue(value.current, prop);
        }

        // If unit
        if (isNumericalValue) {
            splitUnit(prop, value);
        }
    }

    if (isNumericalValue) {
        prop = parseFloat(prop);
    }

    return prop;
}

/*
    Split a value into sub-values

    @param [string]
    @param [object]
    @param [object]
    @param [valueTypeHandler]
    @returns [object]
*/
function split(name, value, scope, valueTypeHandler) {
    var splitValues = {},
        i = 0;

    var _loop = function () {
        var propName = numericalValues[i];
        var splitProp = {};

        if (value.hasOwnProperty(propName)) {
            var valueProp = value[propName];

            // If we need to first resolve this, resolve
            if (utils.isFunc(valueProp)) {
                valueProp = valueProp.call(scope, scope);
            }

            if (!utils.isString(valueProp)) {
                return 'continue';
            }

            splitProp = valueTypeHandler.split(valueProp);

            // Assign split properties to each child value
            each(splitProp, function (key, prop) {
                // Create new value if none exists
                splitValues[key] = splitValues[key] || utils.copy(valueTypesManager.defaultProps(value.type, key));
                splitValues[key][propName] = prop;

                if (utils.isString(splitProp[key])) {
                    splitUnit(splitValues[key][propName], splitValues[key]);
                }
            });
        }
    };

    for (; i < numNumericalValues; i++) {
        var _ret = _loop();

        if (_ret === 'continue') continue;
    }

    return splitValues;
}

/*
    Split value into number and unit, and set unit to value

    @param [string]
    @param [object]
*/
function splitUnit(property, hostValue) {
    if (utils.isNum(property)) {
        return property;
    }
    var returnVal = property;

    var _utils$splitValUnit = utils.splitValUnit(property);

    var value = _utils$splitValUnit.value;
    var unit = _utils$splitValUnit.unit;

    if (!isNaN(value)) {
        returnVal = value;
        if (unit) {
            hostValue.unit = unit;
        }
    }

    return returnVal;
}

/*
    Preprocess incoming values, splitting non-numerical values
    into sub-values ie hex

    @param [object]
    @param [object]
    @param [object]
    @param [string]
*/
function preprocess(existing, incoming, scope, defaultProp) {
    var values = {};

    each(incoming, function (key, value) {
        var existingValue = existing[key],
            newValue = {};

        if (utils.isObj(value)) {
            newValue = value;
        } else {
            newValue[defaultProp] = value;
        }

        // If value doesn't have a special type, check for one
        newValue.type = checkValueType(existingValue, newValue, scope, key);
        newValue.watch = utils.isString(newValue.watch) ? newValue.watch : undefined;

        values[key] = newValue;

        // If we have a type property, split/assign default props
        if (newValue.type) {
            var typeHandler = valueTypesManager[newValue.type];

            // If valueType handler has a split function, split this value
            if (typeHandler.split) {
                var splitValues = split(key, newValue, scope, typeHandler);
                newValue.children = {};

                each(splitValues, function (childName, childValue) {
                    childValue = utils.merge(newValue, childValue);
                    childValue.parent = childValue.name = key;
                    childValue.propName = childName;

                    delete childValue.type;
                    delete childValue.children;

                    newValue.children[childName] = values[key + childName] = childValue;
                });

                if (typeHandler.template) {
                    newValue.template = existingValue ? existingValue.template : typeHandler.template(newValue.current);
                }

                // Or just assign default properties for this value
            } else {
                    values[key] = utils.merge(valueTypesManager.defaultProps(newValue.type, key), newValue);
                }
        }
    });

    return values;
}

module.exports = {

    /*
        Flip value target/origin
    */
    flip: function flip(value) {
        var target = value.target !== undefined ? value.target : value.current;
        value.target = value.to = value.origin;
        value.origin = target;
    },

    /*
        Merge existing and incoming values, resolving properties
        set as functions and splitting non-numerical values ie hex
         @param [object]
        @param [object]
        @param [object]
        @param [string] (optional)
        @param [object]
        @returns [object]: New values object
    */
    process: function process(existing, incoming, inherit, defaultProp, scope) {
        existing = existing || {};
        defaultProp = defaultProp || 'current';
        var preprocessed = preprocess(existing, incoming, scope, defaultProp);

        each(preprocessed, function (key, value) {
            var newValue = existing[key] || utils.copy(defaultValue),
                hasChildren = value.children !== undefined,
                defaultActionValue = inherit.action ? inherit.action.getDefaultValue() : {};

            value.action = inherit.action;

            each(defaultActionValue, function (propName, defaultActionProp) {
                newValue[propName] = inherit.hasOwnProperty(propName) && !value.hasOwnProperty(propName) ? inherit[propName] : defaultActionProp;
            });

            each(value, function (valueName, valueProp) {
                // If property is not undefined or a number, resolve
                if (valueProp !== undefined && !isNum(valueProp) && !hasChildren) {
                    valueProp = resolve(valueName, valueProp, newValue, scope);
                }

                newValue[valueName] = valueProp;

                // Set internal target if this property is 'to'
                if (valueName === 'to') {
                    newValue.target = newValue.to;
                }
            });

            newValue.origin = newValue.current;
            newValue.hasRange = isNum(newValue.min) || isNum(newValue.max) ? true : false;

            existing[key] = newValue;
            scope.updateOrder(key, utils.isString(newValue.watch), hasChildren);
        });

        return existing;
    }
};
},{"../inc/calc":17,"../inc/utils":20,"../value-types/manager":51}],14:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controls = (function () {
    function Controls(actor, action, hasStarted) {
        _classCallCheck(this, Controls);

        this.actor = actor;
        this.action = action;

        if (hasStarted) {
            this.id = this.bindAction();
            this.action.activate();
        }
    }

    _createClass(Controls, [{
        key: "start",
        value: function start(input) {
            this.id = this.bindAction();
            this.actor.start(this.id, input);
            this.action.activate();
            return this;
        }
    }, {
        key: "stop",
        value: function stop() {
            this.actor.unbindAction(this.id);
            this.action.deactivate();
            return this;
        }
    }, {
        key: "pause",
        value: function pause() {
            this.action.deactivate();
            return this;
        }
    }, {
        key: "resume",
        value: function resume() {
            this.action.activate();
            return this;
        }
    }, {
        key: "toggle",
        value: function toggle() {
            var resume = this.actor.hasAction(this.id) ? this.resume : this.start;
            return this.action.isActive ? this.pause() : resume.call(this);
        }
    }, {
        key: "then",
        value: function then() {
            var _actor;

            (_actor = this.actor).then.apply(_actor, arguments);
            return this;
        }
    }, {
        key: "bindAction",
        value: function bindAction() {
            return this.actor.bindAction(this.action, this.id);
        }
    }]);

    return Controls;
})();

module.exports = Controls;
},{}],15:[function(require,module,exports){
"use strict";

var // [number]: Default max size of history
maxHistorySize = 3,

/*
    History constructor
    
    @param [var]: Variable to store in first history slot
    @param [int] (optional): Maximum size of history
*/
History = function History(obj, max) {
    this.max = max || maxHistorySize;
    this.entries = [];
    this.add(obj);
};

History.prototype = {

    /*
        Push new var to history
        
        Shift out oldest entry if we've reached maximum capacity
        
        @param [var]: Variable to push into history.entries
    */
    add: function add(obj) {
        var currentSize = this.getSize();

        this.entries.push(obj);

        if (currentSize >= this.max) {
            this.entries.shift();
        }
    },

    /*
        Get variable at specified index
         @param [int]: Index
        @return [var]: Var found at specified index
    */
    get: function get(i) {
        i = typeof i === 'number' ? i : this.getSize() - 1;

        return this.entries[i];
    },

    /*
        Get the second newest history entry
        
        @return [var]: Entry found at index size - 2
    */
    getPrevious: function getPrevious() {
        return this.get(this.getSize() - 2);
    },

    /*
        Get current history size
        
        @return [int]: Current length of entries.length
    */
    getSize: function getSize() {
        return this.entries.length;
    }

};

module.exports = History;
},{}],16:[function(require,module,exports){
"use strict";

var Queue = function Queue() {
    this.clear();
};

Queue.prototype = {

    /*
        Add a set of arguments to queue
    */
    add: function add() {
        this.queue.push([].slice.call(arguments));
    },

    /*
        Get next set of arguments from queue
    */
    next: function next(direction) {
        var queue = this.queue,
            returnVal = false,
            index = this.index;

        direction = arguments.length ? direction : 1;

        // If our index is between 0 and the queue length, return that item
        if (index >= 0 && index < queue.length) {
            returnVal = queue[index];
            this.index = index + direction;

            // Or clear
        } else {
                this.clear();
            }

        return returnVal;
    },

    /*
        Replace queue with empty array
    */
    clear: function clear() {
        this.queue = [];
        this.index = 0;
    }
};

module.exports = Queue;
},{}],17:[function(require,module,exports){
/*
    Calculators
    ----------------------------------------
    
    Simple I/O snippets
*/
"use strict";

var utils = require('./utils.js'),
    calc = {

    /*
        Angle between points
        
        Translates the hypothetical line so that the 'from' coordinates
        are at 0,0, then return the angle using .angleFromCenter()
        
        @param [object]: X and Y coordinates of from point
        @param [object]: X and Y cordinates of to point
        @return [radian]: Angle between the two points in radians
    */
    angle: function angle(pointA, pointB) {
        var from = pointB ? pointA : { x: 0, y: 0 },
            to = pointB || pointA,
            point = {
            x: to.x - from.x,
            y: to.y - from.y
        };

        return this.angleFromCenter(point.x, point.y);
    },

    /*
        Angle from center
        
        Returns the current angle, in radians, of a defined point
        from a center (assumed 0,0)
        
        @param [number]: X coordinate of second point
        @param [number]: Y coordinate of second point
        @return [radian]: Angle between 0, 0 and point in radians
    */
    angleFromCenter: function angleFromCenter(x, y) {
        return this.radiansToDegrees(Math.atan2(y, x));
    },

    /*
        Convert degrees to radians
        
        @param [number]: Value in degrees
        @return [number]: Value in radians
    */
    degreesToRadians: function degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    },

    /*
        Dilate
        
        Change the progression between a and b according to dilation.
        
        So dilation = 0.5 would change
        
        a --------- b
        
        to
        
        a ---- b
        
        @param [number]: Previous value
        @param [number]: Current value
        @param [number]: Dilate progress by x
        @return [number]: Previous value plus the dilated difference
    */
    dilate: function dilate(a, b, dilation) {
        return a + (b - a) * dilation;
    },

    /*
        Distance
        
        Returns the distance between (0,0) and pointA, unless pointB
        is provided, then we return the difference between the two.
        
        @param [object/number]: x and y or just x of point A
        @param [object/number]: (optional): x and y or just x of point B
        @return [number]: The distance between the two points
    */
    distance: function distance(pointA, pointB) {
        return typeof pointA === "number" ? this.distance1D(pointA, pointB) : this.distance2D(pointA, pointB);
    },

    /*
        Distance 1D
        
        Returns the distance between point A and point B
        
        @param [number]: Point A
        @param [number]: (optional): Point B
        @return [number]: The distance between the two points
    */
    distance1D: function distance1D(pointA, pointB) {
        var bIsNum = typeof pointB === 'number',
            from = bIsNum ? pointA : 0,
            to = bIsNum ? pointB : pointA;

        return absolute(to - from);
    },

    /*
        Distance 2D
        
        Returns the distance between (0,0) and point A, unless point B
        is provided, then we return the difference between the two.
        
        @param [object]: x and y of point A
        @param [object]: (optional): x and y of point B
        @return [number]: The distance between the two points
    */
    distance2D: function distance2D(pointA, pointB) {
        var bIsObj = typeof pointB === "object",
            from = bIsObj ? pointA : { x: 0, y: 0 },
            to = bIsObj ? pointB : pointA,
            point = {
            x: absolute(to.x - from.x),
            y: absolute(to.y - from.y)
        };

        return this.hypotenuse(point.x, point.y);
    },

    /*
        Hypotenuse
        
        Returns the hypotenuse, side C, given the lengths of sides A and B.
        
        @param [number]: Length of A
        @param [number]: Length of B
        @return [number]: Length of C
    */
    hypotenuse: function hypotenuse(a, b) {
        var a2 = a * a,
            b2 = b * b,
            c2 = a2 + b2;

        return Math.sqrt(c2);
    },

    /*
        Offset between two inputs
        
        Calculate the difference between two different inputs
        
        @param [Point]: First input
        @param [Point]: Second input
        @return [Offset]: Distance metrics between two points
    */
    offset: function offset(a, b) {
        var offset = {};

        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                if (a.hasOwnProperty(key)) {
                    offset[key] = b[key] - a[key];
                } else {
                    offset[key] = 0;
                }
            }
        }

        if (isNum(offset.x) && isNum(offset.y)) {
            offset.angle = this.angle(a, b);
            offset.distance = this.distance2D(a, b);
        }

        return offset;
    },

    /*
        Point from angle and distance
        
        @param [object]: 2D point of origin
        @param [number]: Angle from origin
        @param [number]: Distance from origin
        @return [object]: Calculated 2D point
    */
    pointFromAngleAndDistance: function pointFromAngleAndDistance(origin, angle, distance) {
        var point = {};

        point.x = distance * Math.cos(angle) + origin.x;
        point.y = distance * Math.sin(angle) + origin.y;

        return point;
    },

    /*
        Progress within given range
        
        Given a lower limit and an upper limit, we return the progress
        (expressed as a number 0-1) represented by the given value, and
        limit that progress to within 0-1.
        
        @param [number]: Value to find progress within given range
        @param [number]: Lower limit if full range given, upper if not
        @param [number] (optional): Upper limit of range
        @return [number]: Progress of value within range as expressed 0-1
    */
    progress: function progress(value, limitA, limitB) {
        var bIsNum = typeof limitB === 'number',
            from = bIsNum ? limitA : 0,
            to = bIsNum ? limitB : limitA,
            range = to - from,
            progress = (value - from) / range;

        return progress;
    },

    /*
        Convert radians to degrees
        
        @param [number]: Value in radians
        @return [number]: Value in degrees
    */
    radiansToDegrees: function radiansToDegrees(radians) {
        return radians * 180 / Math.PI;
    },

    /*
        Return random number between range
        
        @param [number] (optional): Output minimum
        @param [number] (optional): Output maximum
        @return [number]: Random number within range, or 0 and 1 if none provided
    */
    random: function random(min, max) {
        min = isNum(min) ? min : 0;
        max = isNum(max) ? max : 1;
        return Math.random() * (max - min) + min;
    },

    /*
        Calculate relative value
        
        Takes the operator and value from a string, ie "+=5", and applies
        to the current value to resolve a new target.
        
        @param [number]: Current value
        @param [string]: Relative value
        @return [number]: New value
    */
    relativeValue: function relativeValue(current, rel) {
        var newValue = current,
            equation = rel.split('='),
            operator = equation[0],
            splitVal = utils.splitValUnit(equation[1]);

        switch (operator) {
            case '+':
                newValue += splitVal.value;
                break;
            case '-':
                newValue -= splitVal.value;
                break;
            case '*':
                newValue *= splitVal.value;
                break;
            case '/':
                newValue /= splitVal.value;
                break;
        }

        if (splitVal.unit) {
            newValue += splitVal.unit;
        }

        return newValue;
    },

    /*
        Restrict value to range
        
        Return value within the range of lowerLimit and upperLimit
        
        @param [number]: Value to keep within range
        @param [number]: Lower limit of range
        @param [number]: Upper limit of range
        @return [number]: Value as limited within given range
    */
    restricted: function restricted(value, min, max) {
        var restricted = min !== undefined ? Math.max(value, min) : value;
        restricted = max !== undefined ? Math.min(restricted, max) : restricted;

        return restricted;
    },

    /*
        Convert x per second to per frame velocity based on fps
        
        @param [number]: Unit per second
        @param [number]: Frame duration in ms
    */
    speedPerFrame: function speedPerFrame(xps, frameDuration) {
        return isNum(xps) ? xps / (1000 / frameDuration) : 0;
    },

    /*
        Convert velocity into velicity per second
        
        @param [number]: Unit per frame
        @param [number]: Frame duration in ms
    */
    speedPerSecond: function speedPerSecond(velocity, frameDuration) {
        return velocity * (1000 / frameDuration);
    },

    /*
        Value in range from progress
        
        Given a lower limit and an upper limit, we return the value within
        that range as expressed by progress (a number from 0-1)
        
        @param [number]: The progress between lower and upper limits expressed 0-1
        @param [number]: Lower limit of range, or upper if limit2 not provided
        @param [number] (optional): Upper limit of range
        @return [number]: Value as calculated from progress within range (not limited within range)
    */
    value: function value(progress, limitA, limitB) {
        var bIsNum = typeof limitB === 'number',
            from = bIsNum ? limitA : 0,
            to = bIsNum ? limitB : limitA;

        return -progress * from + progress * to + from;
    },

    /*
        Eased value in range from progress
        
        Given a lower limit and an upper limit, we return the value within
        that range as expressed by progress (a number from 0-1)
        
        @param [number]: The progress between lower and upper limits expressed 0-1
        @param [number]: Lower limit of range, or upper if limit2 not provided
        @param [number]: Upper limit of range
        @param [function]: Easing to apply to value
        @return [number]: Value as calculated from progress within range (not limited within range)
    */
    valueEased: function valueEased(progress, from, to, easing) {
        var easedProgress = easing(progress);

        return this.value(easedProgress, from, to);
    }
},

/*
    Caching functions used multiple times to reduce filesize and increase performance
*/
isNum = utils.isNum,
    absolute = Math.abs;

module.exports = calc;
},{"./utils.js":20}],18:[function(require,module,exports){
'use strict';

var Actor = require('../actor/Actor'),
    Iterator = require('../iterator/Iterator'),
    selectDom = require('./select-dom');

var SAVE_PROP = '__pm_actor_';

module.exports = function (selector) {
    var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var dom = selectDom(selector),
        actors = [];

    dom.forEach(function (element) {
        var actor = element[SAVE_PROP];

        if (!actor) {
            opts.element = element;
            actor = element[SAVE_PROP] = new Actor(opts);
        }

        actors.push(actor);
    });

    return actors.length > 1 ? new Iterator(actors) : actors[0];
};
},{"../actor/Actor":11,"../iterator/Iterator":23,"./select-dom":19}],19:[function(require,module,exports){
/*
    @param [string || NodeList || jQuery object]:
        If string, treated as selector.
        If not, treated as preexisting NodeList || jQuery object.
*/
'use strict';

module.exports = function (selector) {
    var nodes = typeof selector === 'string' ? document.querySelectorAll(selector) : selector,
        elements = [];

    // If jQuery selection, get array of Elements
    if (nodes.get) {
        elements = nodes.get();

        // Or convert NodeList to array
    } else if (nodes.length) {
            elements = [].slice.call(nodes);

            // Or if it's just an Element, put into array
        } else {
                elements.push(nodes);
            }

    return elements;
};
},{}],20:[function(require,module,exports){
/*
    Utility functions
*/
"use strict";

var protectedProperties = ['scope', 'dom'],
    isProtected = function isProtected(key) {
    return protectedProperties.indexOf(key) !== -1;
},

/*
    Get var type as string
    
    @param: Variable to test
    @return [string]: Returns, for instance 'Object' if [object Object]
*/
varType = function varType(variable) {
    return Object.prototype.toString.call(variable).slice(8, -1);
};

module.exports = {

    /*
        Iterate over an object and fire a callback for every item in it
         @param [object]: Properties
        @param [function]: Callback to fire
    */
    each: function each(props, callback) {
        var keys = Object.keys(props),
            numKeys = keys.length;

        for (var i = 0; i < numKeys; i++) {
            var key = keys[i],
                prop = props[key];

            if (callback(key, prop) === false) {
                break;
            }
        }
    },

    /*
        Has one object changed from the other
        
        Compares the two provided inputs and returns true if they are different
        
        @param [object]: Input A
        @param [object]: Input B
        @return [boolean]: True if different
    */
    hasChanged: function hasChanged(a, b) {
        var hasChanged = false,
            key = '';

        for (key in b) {
            if (a.hasOwnProperty(key) && b.hasOwnProperty(key)) {
                if (a[key] !== b[key]) {
                    hasChanged = true;
                }
            } else {
                hasChanged = true;
            }
        }

        return hasChanged;
    },

    /*
        Is this var a number?
        
        @param: Variable to test
        @return [boolean]: Returns true if typeof === 'number'
    */
    isNum: function isNum(num) {
        return typeof num === 'number';
    },

    /*
        Is this var an object?
        
        @param: Variable to test
        @return [boolean]: Returns true if typeof === 'object'
    */
    isObj: function isObj(obj) {
        return typeof obj === 'object';
    },

    /*
        Is this var a function ? 
        
        @param: Variable to test
        @return [boolean]: Returns true if this.varType === 'Function'
    */
    isFunc: function isFunc(obj) {
        return varType(obj) === 'Function';
    },

    /*
        Is this var a string ? 
        
        @param: Variable to test
        @return [boolean]: Returns true if typeof str === 'string'
    */
    isString: function isString(str) {
        return typeof str === 'string';
    },

    /*
        Is this a relative value assignment?
        
        @param [string]: Variable to test
        @return [boolean]: If this looks like a relative value assignment
    */
    isRelativeValue: function isRelativeValue(value) {
        return value && value.indexOf && value.indexOf('=') > 0;
    },

    /*
        Is this var an array ? 
        
        @param: Variable to test
        @return [boolean]: Returns true if this.varType === 'Array'
    */
    isArray: function isArray(arr) {
        return varType(arr) === 'Array';
    },

    /*
        Copy object or array
        
        Checks whether base is an array or object and makes
        appropriate copy
        
        @param [array || object]: Array or object to copy
        @param [array || object]: New copy of array or object
    */
    copy: function copy(base) {
        return this.isArray(base) ? this.copyArray(base) : this.copyObject(base);
    },

    /*
        Deep copy an object
        
        Iterates over an object and creates a new copy of every item,
        deep copying if it finds any objects/arrays
        
        @param [object]: Object to copy
        @param [object]: New copy of object
    */
    copyObject: function copyObject(base) {
        var newObject = {};

        for (var key in base) {
            if (base.hasOwnProperty(key)) {
                newObject[key] = this.isObj(base[key]) && !isProtected(key) ? this.copy(base[key]) : base[key];
            }
        }

        return newObject;
    },

    /*
        Deep copy an array
        
        Loops through an array and creates a new copy of every item,
        deep copying if it finds any objects/arrays
        
        @param [array]: Array to copy
        @return [array]: New copy of array
    */
    copyArray: function copyArray(base) {
        var newArray = [],
            length = base.length,
            i = 0;

        for (; i < length; i++) {
            newArray[i] = base[i];
        }

        return newArray;
    },

    /*
        Non-destructive merge of object or array
        
        @param [array || object]: Array or object to use as base
        @param [array || object]: Array or object to overwrite base with
        @return [array || object]: New array or object
    */
    merge: function merge(base, overwrite) {
        return this.isArray(base) ? this.copyArray(overwrite) : this.mergeObject(base, overwrite);
    },

    /*
        Non-destructive merge of object
        
        @param [object]: Object to use as base
        @param [object]: Object to overwrite base with
        @return [object]: New object
    */
    mergeObject: function mergeObject(base, overwrite) {
        var hasBase = this.isObj(base),
            newObject = hasBase ? this.copy(base) : this.copy(overwrite),
            key = '';

        if (hasBase) {
            for (key in overwrite) {
                if (overwrite.hasOwnProperty(key)) {
                    newObject[key] = this.isObj(overwrite[key]) && !isProtected(key) ? this.merge(base[key], overwrite[key]) : overwrite[key];
                }
            }
        }
        return newObject;
    },

    /*
        Split a value into a value/unit object
        
            "200px" -> { value: 200, unit: "px" }
            
        @param [string]: Value to split
        @return [object]: Object with value and unit props
    */
    splitValUnit: function splitValUnit(value) {
        var splitVal = value.match(/(-?\d*\.?\d*)(.*)/);

        return {
            value: splitVal[1],
            unit: splitVal[2]
        };
    },

    /*
        Create stepped version of 0-1 progress
        
        @param [number]: Current value
        @param [int]: Number of steps
        @return [number]: Stepped value
    */
    stepProgress: function stepProgress(progress, steps) {
        var segment = 1 / (steps - 1),
            target = 1 - 1 / steps,
            progressOfTarget = Math.min(progress / target, 1);

        return Math.floor(progressOfTarget / segment) * segment;
    },

    /*
        Generate current timestamp
        
        @return [timestamp]: Current UNIX timestamp
    */
    currentTime: function currentTime() {
        return typeof performance !== "undefined" ? performance.now() : new Date().getTime();
    }

};
},{}],21:[function(require,module,exports){
/*
    Input controller
*/
"use strict";

var calc = require('../inc/calc.js'),
    utils = require('../inc/utils.js'),
    History = require('../inc/History.js'),

/*
    Input constructor
    
        Syntax
            newInput(name, value[, poll])
                @param [string]: Name of to track
                @param [number]: Initial value
                @param [function] (optional): Function to poll Input data
                
            newInput(props[, poll])
                @param [object]: Object of values
                @param [function] (optional): Function to poll Input data
     @return [Input]
*/
Input = function Input() {
    var pollPos = arguments.length - 1;

    this.current = {};
    this.offset = {};
    this.velocity = {};
    this.history = new History();
    this.update(arguments[0], arguments[1]);

    if (utils.isFunc(arguments[pollPos])) {
        this.poll = arguments[pollPos];
    }
};

Input.prototype = {

    // [number]: Number of frames of inactivity before velocity is turned to 0
    maxInactiveFrames: 2,

    // [number]: Number of frames input hasn't been updated
    inactiveFrames: 0,

    /*
        Get latest input values
        
        @param [string] (optional): Name of specific property to return
        @return [object || number]: Latest input values or, if specified, single value
    */
    get: function get(prop) {
        var latest = this.history.get(),
            val = prop !== undefined ? latest[prop] : latest;

        return val;
    },

    /*
        Update the input values
        
        Syntax
            input.update(name, value)
                @param [string]: Name of to track
                @param [number]: Initial value
                
            input.update(props)
                @param [object]: Object of values
                
        @return [Input]
    */
    update: function update(arg0, arg1) {
        var values = {};

        if (utils.isNum(arg1)) {
            values[arg0] = arg1;
        } else {
            values = arg0;
        }

        this.history.add(utils.merge(this.current, values));

        return this;
    },

    /*
        Check for input movement and update pointer object's properties
        
        @param [number]: Timestamp of frame
        @return [Input]
    */
    onFrame: function onFrame(timestamp) {
        var latest, hasChanged;

        // Check provided timestamp against lastFrame timestamp and return input has already been updated
        if (timestamp === this.lastFrame) {
            return;
        }

        latest = this.poll ? this.poll() : this.history.get();
        hasChanged = utils.hasChanged(this.current, latest);

        // If input has changed between frames 
        if (hasChanged) {
            this.velocity = calc.offset(this.current, latest);
            this.current = latest;
            this.inactiveFrames = 0;

            // Or it hasn't moved and our frame limit has been reached
        } else if (this.inactiveFrames >= this.maxInactiveFrames) {
                this.velocity = calc.offset(this.current, this.current);

                // Or input hasn't changed
            } else {
                    this.inactiveFrames++;
                }

        this.lastFrame = timestamp;

        return this;
    }
};

module.exports = Input;
},{"../inc/History.js":15,"../inc/calc.js":17,"../inc/utils.js":20}],22:[function(require,module,exports){
"use strict";

var Input = require('./Input.js'),
    currentPointer,
    // Sort this out for multitouch

TOUCHMOVE = 'touchmove',
    MOUSEMOVE = 'mousemove',

/*
    Convert event into point
    
    Scrape the x/y coordinates from the provided event
    
    @param [event]: Original pointer event
    @param [boolean]: True if touch event
    @return [object]: x/y coordinates of event
*/
eventToPoint = function eventToPoint(event, isTouchEvent) {
    var touchChanged = isTouchEvent ? event.changedTouches[0] : false;

    return {
        x: touchChanged ? touchChanged.clientX : event.pageX,
        y: touchChanged ? touchChanged.clientY : event.pageY
    };
},

/*
    Get actual event
    
    Checks for jQuery's .originalEvent if present
    
    @param [event | jQuery event]
    @return [event]: The actual JS event  
*/
getActualEvent = function getActualEvent(event) {
    return event.originalEvent || event;
},

/*
    Pointer constructor
*/
Pointer = function Pointer(e) {
    var event = getActualEvent(e),
        // In case of jQuery event
    isTouch = event.touches ? true : false,
        startPoint = eventToPoint(event, isTouch);

    this.update(startPoint);
    this.isTouch = isTouch;
    this.bindEvents();
},
    proto = Pointer.prototype = new Input();

/*
    Bind move event
*/
proto.bindEvents = function () {
    this.moveEvent = this.isTouch ? TOUCHMOVE : MOUSEMOVE;

    currentPointer = this;

    document.documentElement.addEventListener(this.moveEvent, this.onMove);
};

/*
    Unbind move event
*/
proto.unbindEvents = function () {
    document.documentElement.removeEventListener(this.moveEvent, this.onMove);
};

/*
    Pointer onMove event handler
    
    @param [event]: Pointer move event
*/
proto.onMove = function (e) {
    var newPoint = eventToPoint(e, currentPointer.isTouch);
    e = getActualEvent(e);
    e.preventDefault();
    currentPointer.update(newPoint);
};

proto.stop = function () {
    this.unbindEvents();
};

module.exports = Pointer;
},{"./Input.js":21}],23:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Actor = require('../actor/Actor'),
    Tween = require('../actions/Tween'),
    utils = require('../inc/utils');

var DEFAULT_STAGGER_EASE = 'linear';

function generateCallback(method) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    return utils.isString(method) ? function (member) {
        return member[method].apply(member, args);
    } : method;
}

var Iterator = (function () {
    function Iterator(members) {
        _classCallCheck(this, Iterator);

        this.clear();

        if (members) {
            this.add(members);
        }

        this._stagger = new Actor();
    }

    _createClass(Iterator, [{
        key: 'add',
        value: function add(members) {
            this.members = this.members.concat(members);
            return this;
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.members = [];
            return this;
        }
    }, {
        key: 'each',
        value: function each(method) {
            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
            }

            var callback = generateCallback.apply(undefined, [method].concat(args));
            this.members.forEach(callback);
            return this;
        }
    }, {
        key: 'eachIntoNew',
        value: function eachIntoNew(method) {
            for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                args[_key3 - 1] = arguments[_key3];
            }

            var callback = generateCallback.apply(undefined, [method].concat(args)),
                newIterator = new Iterator();

            this.members.forEach(function (member) {
                return newIterator.add(callback(member));
            });

            return newIterator;
        }
    }, {
        key: 'stagger',
        value: function stagger(method, props) {
            for (var _len4 = arguments.length, args = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
                args[_key4 - 2] = arguments[_key4];
            }

            var tempMembers = utils.copyArray(this.members),
                numMembers = tempMembers.length,
                propsIsInterval = utils.isNum(props),
                interval = propsIsInterval ? props : props.interval,
                staggerProps = {},
                i = -1,
                callback = generateCallback.apply(undefined, [method].concat(args));

            staggerProps.values = {
                i: {
                    current: -0.6,
                    duration: interval * numMembers,
                    ease: propsIsInterval ? DEFAULT_STAGGER_EASE : props.ease || DEFAULT_STAGGER_EASE,
                    round: true,
                    to: numMembers - 0.6
                }
            };

            staggerProps.onUpdate = function (output) {
                var newIndex = output.i,
                    gapIndex = i + 1;

                // If our new index is only one more than the previous index, fire immedietly
                if (newIndex === i + 1) {
                    callback(tempMembers[gapIndex], gapIndex);

                    // Or loop through the distance to fire all indecies. Increase delay.
                } else {
                        for (; gapIndex <= newIndex; gapIndex++) {
                            callback(tempMembers[gapIndex], gapIndex);
                        }
                    }

                i = newIndex;
            };

            this._stagger.start(new Tween(staggerProps));

            return this;
        }

        /*
            Array manipulation
        */
    }, {
        key: 'reverse',
        value: function reverse() {
            this.members.reverse();
            return this;
        }
    }]);

    return Iterator;
})();

module.exports = Iterator;
},{"../actions/Tween":4,"../actor/Actor":11,"../inc/utils":20}],24:[function(require,module,exports){
"use strict";

var popmotion = require('../popmotion');

/*
    Add optional custom value type support
*/
popmotion.addValueType({
    alpha: require('../value-types/alpha'),
    angle: require('../value-types/angle'),
    px: require('../value-types/px'),
    hsl: require('../value-types/hsl'),
    rgb: require('../value-types/rgb'),
    hex: require('../value-types/hex'),
    color: require('../value-types/color'),
    positions: require('../value-types/positions'),
    dimensions: require('../value-types/dimensions'),
    scale: require('../value-types/scale'),
    shadow: require('../value-types/shadow'),
    complex: require('../value-types/complex')
});

/*
    Predefined roles
*/

popmotion.attr = require('../roles/attr/attrRole');
popmotion.css = require('../roles/css/cssRole');
popmotion.svg = require('../roles/svg/svgRole');
popmotion.drawPath = require('../roles/path/drawPathRole');

module.exports = popmotion;
},{"../popmotion":25,"../roles/attr/attrRole":32,"../roles/css/cssRole":34,"../roles/path/drawPathRole":39,"../roles/svg/svgRole":42,"../value-types/alpha":44,"../value-types/angle":45,"../value-types/color":46,"../value-types/complex":47,"../value-types/dimensions":48,"../value-types/hex":49,"../value-types/hsl":50,"../value-types/positions":58,"../value-types/px":59,"../value-types/rgb":60,"../value-types/scale":61,"../value-types/shadow":64}],25:[function(require,module,exports){
"use strict";

var valueTypeManager = require('./value-types/manager'),
    Popmotion = {

    Actor: require('./actor/Actor'),

    Input: require('./input/Input'),

    Iterator: require('./iterator/Iterator'),

    Process: require('./process/Process'),

    Easing: require('./actions/tween/Easing'),

    Role: require('./roles/Role'),

    Action: require('./actions/Action'),
    Tween: require('./actions/Tween'),
    Simulate: require('./actions/Simulate'),
    Track: require('./actions/Track'),

    /*
        Create an Iterator of Actors with selected dom elements
    */
    select: require('./inc/select-actor'),

    addValueType: function addValueType() {
        valueTypeManager.extend.apply(valueTypeManager, arguments);
        return this;
    },

    calc: require('./inc/calc')
};

module.exports = Popmotion;
},{"./actions/Action":1,"./actions/Simulate":2,"./actions/Track":3,"./actions/Tween":4,"./actions/tween/Easing":8,"./actor/Actor":11,"./inc/calc":17,"./inc/select-actor":18,"./input/Input":21,"./iterator/Iterator":23,"./process/Process":26,"./roles/Role":31,"./value-types/manager":51}],26:[function(require,module,exports){
"use strict";

var manager = require('./manager'),

/*
    Process constructor
    
    Syntax
        var process = new Process(scope, callback);
        var process = new Process(callback);
*/
Process = function Process(scope, callback) {
    var hasScope = callback !== undefined;

    this.callback = hasScope ? callback : scope;
    this.scope = hasScope ? scope : this;
    this.id = manager.register();

    // [boolean]: Is this process currently active?
    this.isActive = false;
};

Process.prototype = {
    /*
        Fire callback
        
        @param [timestamp]: Timestamp of currently-executed frame
        @param [number]: Time since last frame
    */
    fire: function fire(timestamp, elapsed) {
        this.callback.call(this.scope, timestamp, elapsed);

        // If we're running at an interval, deactivate again
        if (this.isInterval) {
            this.deactivate();
        }

        return this;
    },

    /*
        Start process
        
        @param [int]: Duration of process in ms, 0 if indefinite
        @return [this]
    */
    start: function start(duration) {
        var self = this;

        this.reset();
        this.activate();

        if (duration) {
            this.stopTimer = setTimeout(function () {
                self.stop();
            }, duration);

            this.isStopTimerActive = true;
        }

        return this;
    },

    /*
        Stop process
        
        @return [this]
    */
    stop: function stop() {
        this.reset();
        this.deactivate();

        return this;
    },

    /*
        Activate process
        
        @return [this]
    */
    activate: function activate() {
        this.isActive = true;
        manager.activate(this, this.id);

        return this;
    },

    /*
        Deactivate process
        
        @return [this]
    */
    deactivate: function deactivate() {
        this.isActive = false;
        manager.deactivate(this.id);

        return this;
    },

    /*
        Fire process every x ms
        
        @param [int]: Number of ms to wait between refiring process.
        @return [this]
    */
    every: function every(interval) {
        var self = this;

        this.reset();

        this.isInterval = true;

        this.intervalTimer = setInterval(function () {
            self.activate();
        }, interval);

        this.isIntervalTimeActive = true;

        return this;
    },

    /*
        Clear all timers
        
        @param 
    */
    reset: function reset() {
        this.isInterval = false;

        if (this.isStopTimerActive) {
            clearTimeout(this.stopTimer);
        }

        if (this.isIntervalTimeActive) {
            clearInterval(this.intervalTimer);
        }

        return this;
    }
};

module.exports = Process;
},{"./manager":28}],27:[function(require,module,exports){
/*
    The loop
*/
"use strict";

var Timer = require('./timer.js'),
    tick = require('./tick.js'),
    Loop = function Loop() {
    this.timer = new Timer();
};

Loop.prototype = {

    /*
        [boolean]: Current status of animation loop
    */
    isRunning: false,

    /*
        Fire all active processes once per frame
    */
    frame: function frame() {
        var self = this;

        tick(function () {
            var framestamp = self.timer.update(),
                // Currently just measuring in ms - will look into hi-res timestamps
            isActive = self.callback.call(self.scope, framestamp, self.timer.getElapsed());

            if (isActive) {
                self.frame();
            } else {
                self.stop();
            }
        });
    },

    /*
        Start loop
    */
    start: function start() {
        // Make sure we're not already running a loop
        if (!this.isRunning) {
            this.timer.clock();
            this.isRunning = true;
            this.frame();
        }
    },

    /*
        Stop the loop
    */
    stop: function stop() {
        this.isRunning = false;
    },

    /*
        Set the callback to run every frame
        
        @param [Object]: Execution context
        @param [function]: Callback to fire
    */
    setCallback: function setCallback(scope, callback) {
        this.scope = scope;
        this.callback = callback;
    }

};

module.exports = new Loop();
},{"./tick.js":29,"./timer.js":30}],28:[function(require,module,exports){
"use strict";

var theLoop = require('./loop.js'),
    ProcessManager = function ProcessManager() {
    this.activeIds = [];
    this.activeProcesses = {};
    this.deactivateQueue = [];
    theLoop.setCallback(this, this.fireActive);
};

ProcessManager.prototype = {

    /*
        [int]: Used for process ID
    */
    processCounter: 0,

    /*
        [int]: Number of active processes
    */
    activeCount: 0,

    /*
        Get the process with a given index
        
        @param [int]: Index of process
        @return [Process]
    */
    getProcess: function getProcess(i) {
        return this.activeProcesses[i];
    },

    /*
        Get number of active processes
        
        @return [int]: Number of active processes
    */
    getActiveCount: function getActiveCount() {
        return this.activeCount;
    },

    /*
        Get active tokens
         @return [array]: Active tokens
    */
    getActive: function getActive() {
        return this.activeIds;
    },

    /*
        Get the length of the deactivate queue
        
        @return [int]: Length of queue
    */
    getQueueLength: function getQueueLength() {
        return this.deactivateQueue.length;
    },

    /*
        Fire all active processes
        
        @param [int]: Timestamp of executing frames
        @param [int]: Time since previous frame
        @return [boolean]: True if active processes found
    */
    fireActive: function fireActive(framestamp, elapsed) {
        var process,
            activeCount = 0,
            activeIds = [],
            i = 0;

        // Purge and check active count before execution
        this.purge();
        activeCount = this.getActiveCount();
        activeIds = this.getActive();

        // Loop through active processes and fire callback
        for (; i < activeCount; i++) {
            process = this.getProcess(activeIds[i]);

            if (process) {
                process.fire(framestamp, elapsed);
            }
        }

        // Repurge and recheck active count after execution
        this.purge();
        activeCount = this.getActiveCount();

        // Return true if we still have active processes, or false if none
        return activeCount ? true : false;
    },

    /*
        Register a new process
        
        @param [Process]
        @return [int]: Index of process to be used as ID
    */
    register: function register() {
        return this.processCounter++;
    },

    /*
        Activate a process
        
        @param [int]: Index of active process
    */
    activate: function activate(process, i) {
        var queueIndex = this.deactivateQueue.indexOf(i),
            isQueued = queueIndex > -1,
            isActive = this.activeIds.indexOf(i) > -1;

        // Remove from deactivateQueue if in there
        if (isQueued) {
            this.deactivateQueue.splice(queueIndex, 1);
        }

        // Add to active processes array if not already in there
        if (!isActive) {
            this.activeIds.push(i);
            this.activeProcesses[i] = process;
            this.activeCount++;
            theLoop.start();
        }
    },

    /*
        Deactivate a process
        
        @param [int]: Index of process to add to deactivate queue
    */
    deactivate: function deactivate(i) {
        this.deactivateQueue.push(i);
    },

    /*
        Purge the deactivate queue
    */
    purge: function purge() {
        var queueLength = this.getQueueLength(),
            activeIdIndex = 0,
            idToDelete = 0;

        while (queueLength--) {
            idToDelete = this.deactivateQueue[queueLength];
            activeIdIndex = this.activeIds.indexOf(idToDelete);

            // If process in active list deactivate
            if (activeIdIndex > -1) {
                this.activeIds.splice(activeIdIndex, 1);
                this.activeCount--;
                delete this.activeProcesses[idToDelete];
            }
        }

        this.deactivateQueue = [];
    }

};

module.exports = new ProcessManager();
},{"./loop.js":27}],29:[function(require,module,exports){
"use strict";
/*
    requestAnimationFrame polyfill
    
    For IE8/9 Flinstones

    Taken from Paul Irish. We've stripped out cancelAnimationFrame checks because we don't fox with that
    
    http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
     
    requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
     
    MIT license
*/
var tick,
    lastTime = 0,
    hasWindow = typeof window !== 'undefined';

if (!hasWindow) {
    // Load rAF shim
    tick = function (callback) {
        var currTime = new Date().getTime(),
            timeToCall = Math.max(0, 16 - (currTime - lastTime)),
            id = setTimeout(function () {
            callback(currTime + timeToCall);
        }, timeToCall);

        lastTime = currTime + timeToCall;

        return id;
    };
} else {
    tick = window.requestAnimationFrame;
}

module.exports = tick;
},{}],30:[function(require,module,exports){
"use strict";

var utils = require('../inc/utils.js'),
    maxElapsed = 33,
    Timer = function Timer() {
    this.elapsed = 16.7;
    this.current = utils.currentTime();
    this.update();
};

Timer.prototype = {
    update: function update() {
        this.prev = this.current;
        this.current = utils.currentTime();
        this.elapsed = Math.min(this.current - this.prev, maxElapsed);

        return this.current;
    },

    getElapsed: function getElapsed() {
        return this.elapsed;
    },

    clock: function clock() {
        this.current = utils.currentTime();
    }
};

module.exports = Timer;
},{"../inc/utils.js":20}],31:[function(require,module,exports){
'use strict';

var utils = require('../inc/utils');
var each = utils.each;

/*
    Role class constructor

    @param [object]: Optional methods and props to add:
        name [string]:      Name of generated getter/setter method on Actor
        _map [object]:      Map Actor values to these values for this Role
        _typeMap [object]:  Map values to value types
        init [function]:    Callback to run when this Role is added to an Actor
        start [function]:   Callback to run when host Actor starts an action
        complete [function]: Callback to run when action completes
        frame [function]:   Callback to fire once per frame
        update [function]:  Callback to fire when values change
        get [function]:     Read value from actual element
        set [function]:     Set value on actual element
*/
var Role = function Role(methods) {
    var role = this;

    role._map = {};

    each(methods, function (name, method) {
        role[name] = !utils.isObj(method) ? method : utils.copy(method);
    });
};

/*
    Create a new role

    @param [object]: Optional methods and props to add
    @param [valuesToMap]: Override existing map with these values
    @return [Role]: New Role
*/
var createRole = function createRole(methods, values) {
    var newRole = new Role(methods);

    each(values, function (key, value) {
        newRole._map[key] = value;
    });

    return newRole;
};

Role.prototype = {

    /*
        Map value keys or generate new Role with updated map
         Getter:
            @param [string]: Key to map
            @return [string]: Mapped key, or key if no mapped key found
         Setter: 
            @param [object]: Map of Actor keys -> Role keys
            @return [Role]: New Role with unique map
    */
    map: function map(values) {
        // If this is a string, get mapped value
        // Otherwise this is a map, duplicated role with updated map
        return utils.isString(values) ? this._map[values] || values : createRole(this, values);
    }
};

module.exports = Role;
},{"../inc/utils":20}],32:[function(require,module,exports){
"use strict";

var Role = require('../Role');
var each = require('../../inc/utils').each;

var attrRole = new Role({
    update: function update(state) {
        var actor = this;

        each(state, function (key, value) {
            attrRole.set(actor.element, key, value);
        });
    },

    get: function get(element, key) {
        return element.getAttribute(key);
    },

    set: function set(element, key, value) {
        element.setAttribute(key, value);
    }
});

module.exports = attrRole;
},{"../../inc/utils":20,"../Role":31}],33:[function(require,module,exports){
"use strict";

var each = require('../../inc/utils').each,
    transformDictionary = require('./transform-dictionary'),
    transformProps = transformDictionary.props,
    TRANSLATE_Z = 'translateZ';

module.exports = function (output, cache) {
    var css = {},
        transform = '',
        transformHasZ = false;

    // Loop through output, check for transform properties
    each(output, function (key, rule) {
        // If this is a transform property, add to transform string
        if (transformProps[key]) {
            transform += key + '(' + rule + ')';
            transformHasZ = key === TRANSLATE_Z ? true : transformHasZ;

            // Or just assign directly
        } else {
                if (rule !== cache[key]) {
                    cache[key] = css[key] = rule;
                }
            }
    });

    // If we have transform properties, add translateZ
    if (transform !== '') {
        if (!transformHasZ) {
            transform += ' ' + TRANSLATE_Z + '(0px)';
        }

        if (transform !== cache.transform) {
            css.transform = transform;
        }

        cache.transform = transform;
    }

    return css;
};
},{"../../inc/utils":20,"./transform-dictionary":36}],34:[function(require,module,exports){
"use strict";

var Role = require('../Role');
var build = require('./build');
var each = require('../../inc/utils').each;

var prefixes = ['Webkit', 'Moz', 'O', 'ms', ''];
var numPrefixes = prefixes.length;
var propertyNameCache = {};
var testElement = document.createElement('div');

/*
    Test style property for prefixed version
    
    @param [string]: Style property
    @return [string]: Cached property name
*/
var testPrefix = function testPrefix(key) {
    if (propertyNameCache[key] === false) {
        return false;
    } else {
        propertyNameCache[key] = false;
    }

    for (var i = 0; i < numPrefixes; i++) {
        var prefix = prefixes[i],
            prefixed = prefix === '' ? key : prefix + key.charAt(0).toUpperCase() + key.slice(1);

        if (prefixed in testElement.style) {
            propertyNameCache[key] = prefixed;
        }
    }

    return propertyNameCache[key];
};

var cssRole = new Role({
    _map: require('./map'),
    _typeMap: require('./type-map'),

    init: function init() {
        this._cssCache = {};
    },

    update: function update(state) {
        var actor = this;

        each(build(state, actor._cssCache), function (key, value) {
            cssRole.set(actor.element, key, value);
        });
    },

    get: function get(element, key) {
        key = propertyNameCache[key] || testPrefix(key);

        if (key) {
            return window.getComputedStyle(element, null)[key];
        }
    },

    set: function set(element, key, value) {
        key = propertyNameCache[key] || testPrefix(key);

        if (key) {
            element.style[key] = value;
        }
    }

});

module.exports = cssRole;
},{"../../inc/utils":20,"../Role":31,"./build":33,"./map":35,"./type-map":37}],35:[function(require,module,exports){
'use strict';

var TRANSLATE = 'translate';

module.exports = {
    x: TRANSLATE + 'X',
    y: TRANSLATE + 'Y',
    z: TRANSLATE + 'Z'
};
},{}],36:[function(require,module,exports){
"use strict";

var positionTerms = require('../../value-types/settings/dictionary').positions,
    numPositionTerms = positionTerms.length,
    TRANSFORM_PERSPECTIVE = 'transformPerspective',
    SCALE = 'scale',
    ROTATE = 'rotate',
    terms = {
    funcs: ['translate', SCALE, ROTATE, 'skew', TRANSFORM_PERSPECTIVE],
    props: {} // objects are faster at direct lookups
};

// Create transform terms
(function () {
    var funcs = terms.funcs,
        props = terms.props,
        numFuncs = funcs.length,
        i = 0,
        createProps = function createProps(funcName) {
        var j = 0;

        for (; j < numPositionTerms; j++) {
            props[funcName + positionTerms[j]] = true;
        }
    };

    // Manually add skew and transform perspective 
    props[ROTATE] = props[SCALE] = props[TRANSFORM_PERSPECTIVE] = true;

    // Loop over each function name and create function/property terms
    for (; i < numFuncs; i++) {
        createProps(funcs[i]);
    }
})();

module.exports = terms;
},{"../../value-types/settings/dictionary":63}],37:[function(require,module,exports){
'use strict';

var COLOR = 'color',
    POSITIONS = 'positions',
    DIMENSIONS = 'dimensions',
    SHADOW = 'shadow',
    ANGLE = 'angle',
    ALPHA = 'alpha',
    PX = 'px';

module.exports = {
    // Color properties
    color: COLOR,
    backgroundColor: COLOR,
    outlineColor: COLOR,
    fill: COLOR,
    stroke: COLOR,
    // Border
    borderColor: COLOR,
    borderTopColor: COLOR,
    borderRightColor: COLOR,
    borderBottomColor: COLOR,
    borderLeftColor: COLOR,
    borderRadius: PX,
    // Dimensions
    margin: DIMENSIONS,
    padding: DIMENSIONS,
    width: PX,
    height: PX,
    // Positions
    backgroundPosition: POSITIONS,
    perspectiveOrigin: POSITIONS,
    transformOrigin: POSITIONS,
    // Shadows
    textShadow: SHADOW,
    boxShadow: SHADOW,
    // Transform properties
    rotate: ANGLE,
    rotateX: ANGLE,
    rotateY: ANGLE,
    rotateZ: ANGLE,
    skewX: ANGLE,
    skewY: ANGLE,
    translateX: PX,
    translateY: PX,
    translateZ: PX,
    perspective: PX,
    opacity: ALPHA
};
},{}],38:[function(require,module,exports){
'use strict';

var Role = require('./Role');

module.exports = new Role({
    init: function init() {
        if (this.init) {
            this.init();
        }
    },

    start: function start() {
        if (this.onStart) {
            this.onStart();
        }
    },

    frame: function frame(state) {
        if (this.onFrame) {
            this.onFrame(state);
        }
    },

    update: function update(state) {
        if (this.onUpdate) {
            this.onUpdate(state);
        }
    },

    complete: function complete() {
        if (this.onComplete) {
            this.onComplete();
        }
    }
});
},{"./Role":31}],39:[function(require,module,exports){
"use strict";

var Role = require('../Role');
var attrRole = require('../attr/attrRole');
var each = require('../../inc/utils').each;

/*
    Convert percentage to pixels
    
    @param [number]: Percentage of total length
    @param [number]: Total length
*/
var percentToPixels = function percentToPixels(percentage, length) {
    return parseFloat(percentage) / 100 * length + 'px';
};

/*
    Create styles
    
    @param [object]: SVG Path properties
    @param [object]: Length of path
    @returns [object]: Key/value pairs of valid CSS properties
*/
var createStyles = function createStyles(props, length) {
    var hasDashArray = false,
        dashArrayStyles = {
        length: 0,
        spacing: length + 'px'
    },
        styles = {};

    each(props, function (key, value) {
        key = SVGDrawPath._map[key] || key;

        switch (key) {
            case 'length':
            case 'spacing':
                hasDashArray = true;
                dashArrayStyles[key] = percentToPixels(value, length);
                break;
            case 'offset':
                styles['stroke-dashoffset'] = percentToPixels(-value, length);
                break;
            default:
                styles[key] = value;
        }
    });

    if (hasDashArray) {
        styles['stroke-dasharray'] = dashArrayStyles.length + ' ' + dashArrayStyles.spacing;
    }

    return styles;
};

/*
    Draw Path role
*/
var SVGDrawPath = new Role({
    _map: require('./map'),

    _typeMap: {
        stroke: 'color',
        d: 'complex'
    },

    init: function init() {
        this.pathLength = this.element.getTotalLength();
    },

    /*
        Update `path` styles and if `element` is present, set
        x, y and rotation
    */
    update: function update(state) {
        attrRole.update.call(this, createStyles(state, this.pathLength));
    }
});

module.exports = SVGDrawPath;
},{"../../inc/utils":20,"../Role":31,"../attr/attrRole":32,"./map":40}],40:[function(require,module,exports){
'use strict';

var STROKE = 'stroke';

module.exports = {
    opacity: STROKE + '-opacity',
    width: STROKE + '-width',
    miterlimit: STROKE + '-miterlimit'
};
},{}],41:[function(require,module,exports){
'use strict';

var each = require('../../inc/utils').each,
    transformDictionary = require('../css/transform-dictionary'),
    transformProps = transformDictionary.props,
    zeroNotZero = 0.0001;

module.exports = function (output, origin) {
    var props = {},
        hasTransform = false,
        scale = output.scale !== undefined ? output.scale || zeroNotZero : output.scaleX || 1,
        scaleY = output.scaleY !== undefined ? output.scaleY || zeroNotZero : scale || 1,
        transformOriginX = origin.x,
        transformOriginY = origin.y,
        scaleTransformX = -transformOriginX * (scale * 1),
        scaleTransformY = -transformOriginY * (scaleY * 1),
        scaleReplaceX = transformOriginX / scale,
        scaleReplaceY = transformOriginY / scaleY,
        transform = {
        translate: 'translate(' + output.translateX + ', ' + output.translateY + ') ',
        scale: 'translate(' + scaleTransformX + ', ' + scaleTransformY + ') scale(' + scale + ', ' + scaleY + ') translate(' + scaleReplaceX + ', ' + scaleReplaceY + ') ',
        rotate: 'rotate(' + output.rotate + ', ' + transformOriginX + ', ' + transformOriginY + ') ',
        skewX: 'skewX(' + output.skewX + ') ',
        skewY: 'skewY(' + output.skewY + ') '
    };

    each(output, function (key, value) {
        if (transformProps[key]) {
            hasTransform = true;
        } else {
            props[key] = value;
        }
    });

    if (hasTransform) {
        props.transform = '';

        each(transform, function (key, value) {
            var defaultValue = key === 'scale' ? '1' : '0';
            props.transform += value.replace(/undefined/g, defaultValue);
        });
    }

    return props;
};
},{"../../inc/utils":20,"../css/transform-dictionary":36}],42:[function(require,module,exports){
"use strict";

var Role = require('../Role'),
    attrRole = require('../attr/attrRole'),
    build = require('./build'),
    each = require('../../inc/utils').each;

module.exports = new Role({
    name: 'svg',

    _map: require('../css/map'),
    _typeMap: require('./type-map'),

    start: function start() {
        var boundingBox = this.element.getBBox(),
            values = this.values,

        // TODO: Support px
        transformOriginX = values.transformOriginX ? values.transformOriginX.current : 50,
            transformOriginY = values.transformOriginY ? values.transformOriginY.current : 50,
            origin = {
            x: boundingBox.width * (transformOriginX / 100) + boundingBox.x,
            y: boundingBox.height * (transformOriginY / 100) + boundingBox.y
        };

        this.svgOrigin = origin;
    },

    update: function update(state) {
        var actor = this;
        each(build(state, this.svgOrigin), function (key, value) {
            attrRole.set(actor.element, key, value);
        });
    }

});
},{"../../inc/utils":20,"../Role":31,"../attr/attrRole":32,"../css/map":35,"./build":41,"./type-map":43}],43:[function(require,module,exports){
'use strict';

var COLOR = 'color',
    SCALE = 'scale';

module.exports = {
    fill: COLOR,
    stroke: COLOR,
    scale: SCALE,
    scaleX: SCALE,
    scaleY: SCALE,
    transformOrigin: 'positions',
    d: 'complex'
};
},{}],44:[function(require,module,exports){
"use strict";

module.exports = {
    defaultProps: {
        min: 0,
        max: 1
    }
};
},{}],45:[function(require,module,exports){
'use strict';

module.exports = {
    defaultProps: {
        unit: 'deg'
    }
};
},{}],46:[function(require,module,exports){
"use strict";

var utils = require('../inc/utils'),
    rgb = require('./rgb'),
    hsl = require('./hsl'),
    hex = require('./hex'),
    supported = [rgb, hsl, hex],
    numSupported = 3,
    runSupported = function runSupported(method, value) {
    for (var i = 0; i < numSupported; i++) {
        if (supported[i].test(value)) {
            return supported[i][method](value);
        }
    }
};

module.exports = {

    defaultProps: utils.merge(rgb.defaultProps, hsl.defaultProps),

    test: function test(value) {
        return rgb.test(value) || hex.test(value) || hsl.test(value);
    },

    split: function split(value) {
        return runSupported('split', value);
    },

    combine: function combine(values) {
        return values.Red !== undefined ? rgb.combine(values) : hsl.combine(values);
    }
};
},{"../inc/utils":20,"./hex":49,"./hsl":50,"./rgb":60}],47:[function(require,module,exports){
'use strict';

var utils = require('../inc/utils'),
    each = utils.each,
    floatRegex = /(-)?(\d[\d\.]*)/g,
    generateToken = function generateToken(key) {
    return '${' + key + '}';
};

module.exports = {
    test: function test(value) {
        var matches = value.match(floatRegex);
        return utils.isArray(matches) && matches.length > 1;
    },

    template: function template(value) {
        var counter = 0;
        return value.replace(floatRegex, function () {
            return generateToken(counter++);
        });
    },

    split: function split(value) {
        var splitValue = {},
            matches = value.match(floatRegex),
            numMatches = matches.length;

        for (var i = 0; i < numMatches; i++) {
            splitValue[i] = matches[i];
        }

        return splitValue;
    },

    combine: function combine(values, template) {
        var combinedValue = template;

        each(values, function (key, value) {
            combinedValue = combinedValue.replace(generateToken(key), value);
        });

        return combinedValue;
    }
};
},{"../inc/utils":20}],48:[function(require,module,exports){
"use strict";

var terms = require('./settings/dictionary').dimensions,
    pxDefaults = require('./px').defaultProps,
    createDelimited = require('./manipulators/create-delimited'),
    splitSpaceDelimited = require('./manipulators/split-space-delimited');

module.exports = {

    defaultProps: pxDefaults,

    /*
        Split dimensions in format "Top Right Bottom Left"
        
        @param [string]: Dimension values
            "20px 0 30px 40px" -> {20px, 0, 30px, 40px}
            "20px 0 30px" -> {20px, 0, 30px, 0}
            "20px 0" -> {20px, 0, 20px, 0}
            "20px" -> {20px, 20px, 20px, 20px}
        
        @return [object]: Object with T/R/B/L metrics
    */
    split: function split(value) {
        var dimensions = splitSpaceDelimited(value),
            numDimensions = dimensions.length,
            jumpBack = numDimensions !== 1 ? 2 : 1,
            i = 0,
            j = 0,
            splitValue = {};

        for (; i < 4; i++) {
            splitValue[terms[i]] = dimensions[j];

            // Jump back (to start) counter if we've reached the end of our values
            j++;
            j = j === numDimensions ? j - jumpBack : j;
        }

        return splitValue;
    },

    combine: function combine(values) {
        return createDelimited(values, terms, ' ');
    }
};
},{"./manipulators/create-delimited":52,"./manipulators/split-space-delimited":57,"./px":59,"./settings/dictionary":63}],49:[function(require,module,exports){
"use strict";

var rgb = require('./rgb');

module.exports = {

    defaultProps: rgb.defaultProps,

    test: function test(value) {
        return value && value.indexOf('#') > -1;
    },

    split: function split(value) {
        var r, g, b;

        // If we have 6 characters, ie #FF0000
        if (value.length > 4) {
            r = value.substr(1, 2);
            g = value.substr(3, 2);
            b = value.substr(5, 2);

            // Or we have 3 characters, ie #F00
        } else {
                r = value.substr(1, 1);
                g = value.substr(2, 1);
                b = value.substr(3, 1);
                r += r;
                g += g;
                b += b;
            }

        return {
            Red: parseInt(r, 16),
            Green: parseInt(g, 16),
            Blue: parseInt(b, 16),
            Alpha: 1
        };
    },

    combine: function combine(values) {
        return rgb.combine(values);
    }
};
},{"./rgb":60}],50:[function(require,module,exports){
"use strict";

var createDelimited = require('./manipulators/create-delimited'),
    getColorValues = require('./manipulators/get-color-values'),
    functionCreate = require('./manipulators/function-create'),
    defaultProps = require('./settings/default-props'),
    terms = require('./settings/dictionary').hsl;

module.exports = {

    defaultProps: {
        Hue: {
            min: 0,
            max: 360
        },
        Saturation: defaultProps.percent,
        Lightness: defaultProps.percent,
        Alpha: defaultProps.opacity
    },

    test: function test(value) {
        return value && value.indexOf('hsl') > -1;
    },

    split: function split(value) {
        return getColorValues(value, terms);
    },

    combine: function combine(values) {
        return functionCreate(createDelimited(values, terms, ', ', 2), 'hsla');
    }
};
},{"./manipulators/create-delimited":52,"./manipulators/function-create":54,"./manipulators/get-color-values":55,"./settings/default-props":62,"./settings/dictionary":63}],51:[function(require,module,exports){
'use strict';

var each = require('../inc/utils').each,
    ValueTypeManager = function ValueTypeManager() {};

ValueTypeManager.prototype = {
    extend: function extend(name, mod) {
        var _this = this;

        var multiMods = typeof name == 'object',
            mods = multiMods ? name : {};

        // If we just have one module, coerce
        if (!multiMods) {
            mods[name] = mod;
        }

        each(mods, function (key, thisMod) {
            _this[key] = thisMod;
        });
    },

    defaultProps: function defaultProps(type, key) {
        var valueType = this[type],
            defaultProps = valueType.defaultProps ? valueType.defaultProps[key] || valueType.defaultProps : {};

        return defaultProps;
    },

    test: function test(value) {
        var type = false;

        each(this, function (key, mod) {
            if (mod.test && mod.test(value)) {
                type = key;
            }
        });

        return type;
    }
};

module.exports = new ValueTypeManager();
},{"../inc/utils":20}],52:[function(require,module,exports){
"use strict";

module.exports = function (values, terms, delimiter, chop) {
    var combined = '',
        key = '',
        i = 0,
        numTerms = terms.length;

    for (; i < numTerms; i++) {
        key = terms[i];

        if (values.hasOwnProperty(key)) {
            combined += values[key] + delimiter;
        }
    }

    if (chop) {
        combined = combined.slice(0, -chop);
    }

    return combined;
};
},{}],53:[function(require,module,exports){
'use strict';

module.exports = function (value) {
    return value.substring(value.indexOf('(') + 1, value.lastIndexOf(')'));
};
},{}],54:[function(require,module,exports){
'use strict';

module.exports = function (value, prefix) {
    return prefix + '(' + value + ')';
};
},{}],55:[function(require,module,exports){
'use strict';

var splitCommaDelimited = require('./split-comma-delimited'),
    functionBreak = require('./function-break');

module.exports = function (value, terms) {
    var splitValue = {},
        numTerms = terms.length,
        colors = splitCommaDelimited(functionBreak(value)),
        i = 0;

    for (; i < numTerms; i++) {
        splitValue[terms[i]] = colors[i] !== undefined ? colors[i] : 1;
    }

    return splitValue;
};
},{"./function-break":53,"./split-comma-delimited":56}],56:[function(require,module,exports){
'use strict';

module.exports = function (value) {
    return typeof value === 'string' ? value.split(/,\s*/) : [value];
};
},{}],57:[function(require,module,exports){
'use strict';

module.exports = function (value) {
    return typeof value === 'string' ? value.split(' ') : [value];
};
},{}],58:[function(require,module,exports){
"use strict";

var createDelimited = require('./manipulators/create-delimited'),
    pxDefaults = require('./px').defaultProps,
    splitSpaceDelimited = require('./manipulators/split-space-delimited'),
    terms = require('./settings/dictionary').positions;

module.exports = {

    defaultProps: pxDefaults,

    /*
        Split positions in format "X Y Z"
        
        @param [string]: Position values
            "20% 30% 0" -> {20%, 30%, 0}
            "20% 30%" -> {20%, 30%}
            "20%" -> {20%, 20%}
    */
    split: function split(value) {
        var positions = splitSpaceDelimited(value),
            numPositions = positions.length,
            splitValue = {
            X: positions[0],
            Y: numPositions > 1 ? positions[1] : positions[0]
        };

        if (numPositions > 2) {
            splitValue.Z = positions[2];
        }

        return splitValue;
    },

    combine: function combine(values) {
        return createDelimited(values, terms, ' ');
    }
};
},{"./manipulators/create-delimited":52,"./manipulators/split-space-delimited":57,"./px":59,"./settings/dictionary":63}],59:[function(require,module,exports){
'use strict';

module.exports = {
    defaultProps: {
        unit: 'px'
    }
};
},{}],60:[function(require,module,exports){
"use strict";

var createDelimited = require('./manipulators/create-delimited'),
    getColorValues = require('./manipulators/get-color-values'),
    functionCreate = require('./manipulators/function-create'),
    defaultProps = require('./settings/default-props'),
    colorDefaults = defaultProps.color,
    terms = require('./settings/dictionary').colors;

module.exports = {

    defaultProps: {
        Red: colorDefaults,
        Green: colorDefaults,
        Blue: colorDefaults,
        Alpha: defaultProps.opacity
    },

    test: function test(value) {
        return value && value.indexOf('rgb') > -1;
    },

    split: function split(value) {
        return getColorValues(value, terms);
    },

    combine: function combine(values) {
        return functionCreate(createDelimited(values, terms, ', ', 2), 'rgba');
    }
};
},{"./manipulators/create-delimited":52,"./manipulators/function-create":54,"./manipulators/get-color-values":55,"./settings/default-props":62,"./settings/dictionary":63}],61:[function(require,module,exports){
"use strict";

module.exports = {
    defaultProps: {
        init: 1
    }
};
},{}],62:[function(require,module,exports){
"use strict";

module.exports = {
    color: {
        min: 0,
        max: 255,
        round: true
    },
    opacity: {
        min: 0,
        max: 1
    },
    percent: {
        min: 0,
        max: 100,
        unit: '%'
    }
};
},{}],63:[function(require,module,exports){
"use strict";

var X = 'X',
    Y = 'Y',
    ALPHA = 'Alpha',
    terms = {
    colors: ['Red', 'Green', 'Blue', ALPHA],
    positions: [X, Y, 'Z'],
    dimensions: ['Top', 'Right', 'Bottom', 'Left'],
    shadow: [X, Y, 'Radius', 'Spread', 'Color'],
    hsl: ['Hue', 'Saturation', 'Lightness', ALPHA]
};

module.exports = terms;
},{}],64:[function(require,module,exports){
"use strict";

var color = require('./color'),
    utils = require('../inc/utils'),
    pxDefaults = require('./px').defaultProps,
    terms = require('./settings/dictionary').shadow,
    splitSpaceDelimited = require('./manipulators/split-space-delimited'),
    createDelimited = require('./manipulators/create-delimited'),
    shadowTerms = terms.slice(0, 4);

module.exports = {

    defaultProps: utils.merge(color.defaultProps, {
        X: pxDefaults,
        Y: pxDefaults,
        Radius: pxDefaults,
        Spread: pxDefaults
    }),

    /*
        Split shadow properties "X Y Radius Spread Color"
        
        @param [string]: Shadow property
        @return [object]
    */
    split: function split(value) {
        var bits = splitSpaceDelimited(value),
            numBits = bits.length,
            hasReachedColor = false,
            colorProp = '',
            thisBit,
            i = 0,
            splitValue = {};

        for (; i < numBits; i++) {
            thisBit = bits[i];

            // If we've reached the color property, append to color string
            if (hasReachedColor || color.test(thisBit)) {
                hasReachedColor = true;
                colorProp += thisBit;
            } else {
                splitValue[terms[i]] = thisBit;
            }
        }

        return utils.merge(splitValue, color.split(colorProp));
    },

    combine: function combine(values) {
        return createDelimited(values, shadowTerms, ' ') + color.combine(values);
    }
};
},{"../inc/utils":20,"./color":46,"./manipulators/create-delimited":52,"./manipulators/split-space-delimited":57,"./px":59,"./settings/dictionary":63}],"Button":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Button = (function(superClass) {
  extend(Button, superClass);

  function Button(options) {
    if (options == null) {
      options = {};
    }
    this.type = options.type || "single";
    this.baseColor = "#666";
    this.hoverColor = "#333";
    this.clickColor = "#666";
    this.clickColor = "#222";
    this.default_height = 40;
    this.default_width = 60;
    this.textSize = "16px";
    this.action = options.action || function() {
      return print("This was Clicked");
    };
    this.label = options.label || "button";
    options.x = options.x || x / 2;
    options.y = options.y || y / 2;
    options.width = options.width || this.default_width;
    options.height = options.height || this.default_height;
    options.backgroundColor = options.backgroundColor || this.baseColor;
    options.superLayer = options.superLayer || "";
    Button.__super__.constructor.call(this, options);
    window.Utils.labelLayer(this, this.label);
    if (this.type === "left") {
      this.style = {
        "border": "2px solid white",
        "border-top-left-radius": "20px",
        "border-bottom-left-radius": "20px",
        "fontSize": this.textSize
      };
    } else if (this.type === "right") {
      this.style = {
        "border": "2px solid white",
        "border-top-right-radius": "20px",
        "border-bottom-right-radius": "20px",
        "fontSize": this.textSize
      };
    } else if (this.type === "middle") {
      this.style = {
        "border": "2px solid white",
        "fontSize": this.textSize
      };
    } else if (this.type === "single") {
      this.style = {
        "border": "2px solid white",
        "border-top-left-radius": "20px",
        "border-bottom-left-radius": "20px",
        "border-top-right-radius": "20px",
        "border-bottom-right-radius": "20px",
        "fontSize": this.textSize
      };
    }
    this.on(Events.MouseOver, function() {
      return this.style = {
        backgroundColor: this.hoverColor,
        "border-color": "1px solid #ccc"
      };
    });
    this.on(Events.Click, function() {
      return this.action();
    });
    this.on(Events.MouseOut, function() {
      return this.style = {
        backgroundColor: this.baseColor
      };
    });
    this.on(Events.TouchStart, function() {
      this.scale = 0.95;
      return this.style = {
        backgroundColor: this.clickColor
      };
    });
    this.on(Events.TouchEnd, function() {
      this.scale = 1;
      return this.style = {
        backgroundColor: this.baseColor
      };
    });
    this.states.add({
      hover: {},
      normal: {},
      pressed: {}
    });
  }

  return Button;

})(Layer);


},{}],"Controller":[function(require,module,exports){
exports.popmotion = require("npm").popmotion;

exports.Controller = {
  stack: [],
  screens: [],
  active: -1,
  current: "none",
  debug: true,
  add: function(screen) {
    print(screen.name);
    return this.screens[screen.name] = screen;
  },
  remove: function(screenName) {
    if (!this.screens.hasOwnProperty(screenName)) {
      print("this screen " + screenName + " doesn't exist");
      return;
    }
    delete this.screens[screenName];
    return this.stack = _.without(this.stacks, screenName);
  },
  show: function(screenName) {
    print("lets show " + screenName + " - stack size is " + this.stack.length + " and we will exit animate ");
    if (this.stack.length === 0) {
      this.stack.push(this.screens[screenName]);
      this.screens[screenName].enterAnimation();
    } else {
      print("there's something there. Exit it first");
      this.stack[this.stack.length - 1].exitAnimation();
      this.stack.push(this.screens[screenName]);
      this.screens[screenName].enterAnimation();
    }
    print("and we're gold " + this.stack.length);
    if (this.active === -1) {
      this.active = 0;
    }
    if (this.debug) {
      return print("added " + screenName + ", stack is now: " + this.stack.length + " big");
    }
  },
  hide: function() {
    if (this.stack.length > 0) {
      this.stack[this.stack.length - 1].exitAnimation();
    } else {
      if (this.debug) {
        print("end of stack");
      }
    }
    if (this.debug) {
      print("removing SC, current size: " + this.stack.length + "  ");
    }
    this.stack.pop();
    if (this.debug) {
      return print("Done. New current size: " + this.stack.length + "  ");
    }
  },
  back: function(exit) {
    if (exit == null) {
      exit = false;
    }
    print(("printing " + this.stack.length + " exit--->") + exit);
    if (this.stack.length > 1) {
      this.stack[this.stack.length - 1].exitAnimation();
      this.stack.pop();
      if (this.stack.length > 0) {
        return this.stack[this.stack.length - 1].enterAnimation();
      }
    } else {
      if (exit === false) {
        return print("last screen or exit was true? : " + exit);
      } else {
        return print("close the app");
      }
    }
  },
  printStack: function() {
    var i, len, ref, results, screen;
    print("STACK size: " + this.stack.length + "  | Active is " + this.active + " | checking name based " + this.screens["home"]);
    ref = this.stack;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      screen = ref[i];
      results.push(print(screen.name));
    }
    return results;
  }
};


},{"npm":"npm"}],"Screen":[function(require,module,exports){

/*
A Screen is a top level layer that can be linked to others screens easily with
a Controller. The combo Screen + Controller is the simplest way to bootstrap your
prototype. A simple collection of Screens will be a nice clickable prototype like invisio. 
Then you can slowly develop each screen, independently and increase the detail of your prototype.

First,  "default" class variables. you should access this with ScreenComponent.VAR 
I added instance variables for each of those class variables, so you can override on instance level
Or class level. If you don't pass any arguments to the creation (new ScreenComponent ) it will
always use the default.

@debug 			= add a label with a name to the screen to make it easier to .. duh debug.
@curve 			= default curve for all animations related to the ScreenComponent
@screenW 		= default size for new Screen Components, based now on the Screen size (device you picked / created)
@screenH 		= Same, but for heigh.


The Screen object creates a first layer ( @ ) that behaves just like a normal layer.
These are the custom fields to make our life easier for now:
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.ScreenComponent = (function(superClass) {
  extend(ScreenComponent, superClass);

  ScreenComponent.debug = true;

  ScreenComponent.curve = "spring(800,90,10)";

  ScreenComponent.screenW = Screen.width;

  ScreenComponent.screenH = Screen.height;

  function ScreenComponent(options) {
    var canvas;
    if (options == null) {
      options = {};
    }
    this.container = "empty";
    this.active = false;
    options.width = options.width || ScreenComponent.screenW;
    options.height = options.height || ScreenComponent.screenH;
    options.backgroundColor = options.backgroundColor || Utils.randomColor();
    options.x = options.x || 0;
    options.name = options.name || "noName";
    options.curve = options.curve || ScreenComponent.curve || "spring(900,90,10)";
    ScreenComponent.__super__.constructor.call(this, options);
    if (ScreenComponent.debug) {
      Utils.labelLayer(this, " " + this.name + " - " + this.id);
    }
    canvas = new Layer({
      width: ScreenComponent.screenW,
      height: ScreenComponent.screenH,
      superLayer: this,
      backgroundColor: "transparent",
      name: this.name + "- Canvas"
    });
    if (options.scrollable === true) {
      this.container = new ScrollComponent({
        width: ScreenComponent.screenW,
        height: ScreenComponent.screenH,
        superLayer: this,
        backgroundColor: "transparent",
        scrollHorizontal: false
      });
    } else {
      this.container = new Layer({
        width: ScreenComponent.screenW,
        height: ScreenComponent.screenH,
        superLayer: this,
        backgroundColor: "transparent"
      });
    }
  }

  ScreenComponent.prototype.enterAnimation = function() {
    this.active = true;
    this.visible = true;
    this.animate({
      properties: {
        x: 0,
        opacity: 1,
        scale: 1
      },
      curve: ScreenComponent.curve
    });
    return print("enter");
  };

  ScreenComponent.prototype.exitAnimation = function() {
    this.active = false;
    this.animate({
      properties: {
        scale: 0.8,
        x: this.x - 400,
        opacity: 0
      },
      curve: ScreenComponent.curve
    });
    Utils.delay(0.5, function() {
      return this.visible = false;
    });
    return print("exit");
  };

  ScreenComponent.prototype.backAnimation = function() {
    this.active = false;
    this.animate({
      properties: {
        x: ScreenComponent.screenW,
        opacity: 1
      },
      curve: ScreenComponent.curve
    });
    Utils.delay(0.5, function() {
      return this.visible = false;
    });
    return print("exit");
  };

  ScreenComponent.prototype.start = function() {
    print("starting " + this.name);
    return this.active = true;
  };

  ScreenComponent.prototype.pause = function() {
    print("pausing " + this.name);
    return this.active = false;
  };

  ScreenComponent.prototype.reset = function() {
    return print("reset " + this.name);
  };

  return ScreenComponent;

})(Layer);


},{}],"myModule":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Screen = (function(superClass) {
  var active, container;

  extend(Screen, superClass);

  Screen.curve = "spring(800,90,10)";

  container = "empty";

  active = false;

  function Screen(options) {
    var canvas;
    if (options == null) {
      options = {};
    }
    options.width = options.width || screenW;
    options.height = options.height || screenH;
    options.backgroundColor = options.backgroundColor || Utils.randomColor();
    options.x = options.x || newScreenPosition + CS.screens.length * 20;
    Screen.__super__.constructor.call(this, options);
    CS.addScreen(this);
    canvas = new Layer({
      width: screenW,
      height: screenH,
      superLayer: this,
      backgroundColor: "transparent"
    });
    if (options.scrollable === true) {
      this.container = new ScrollComponent({
        width: screenW,
        height: screenH,
        superLayer: this,
        backgroundColor: "transparent",
        scrollHorizontal: false
      });
    } else {
      this.container = new Layer({
        width: screenW,
        height: screenH,
        superLayer: this,
        backgroundColor: "transparent"
      });
    }
  }

  Screen.prototype.enterAnimation = function() {
    this.active = true;
    this.visible = true;
    this.animate({
      properties: {
        x: 0,
        opacity: 1,
        scale: 1
      },
      curve: Screen.curve
    });
    return print("enter");
  };

  Screen.prototype.exitAnimation = function() {
    this.active = false;
    this.animate({
      properties: {
        scale: 0.8,
        x: this.x - 400,
        opacity: 0
      },
      curve: Screen.curve
    });
    Utils.delay(0.5, function() {
      return this.visible = false;
    });
    return print("exit");
  };

  Screen.prototype.backAnimation = function() {
    this.active = false;
    this.animate({
      properties: {
        x: screenW,
        opacity: 1
      },
      curve: Screen.curve
    });
    Utils.delay(0.5, function() {
      return this.visible = false;
    });
    return print("exit");
  };

  Screen.prototype.start = function() {
    print("starting " + this.name);
    return this.active = true;
  };

  Screen.prototype.pause = function() {
    print("pausing " + this.name);
    return this.active = false;
  };

  Screen.prototype.reset = function() {
    return print("reset " + this.name);
  };

  return Screen;

})(Layer);


},{}],"npm":[function(require,module,exports){
exports.popmotion = require("popmotion");


},{"popmotion":24}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYXJjZWxvL0Ryb3Bib3ggKFdvcmsgJiBDbykvU2NyZWVuLmZyYW1lci9ub2RlX21vZHVsZXMvcG9wbW90aW9uL2xpYi9hY3Rpb25zL0FjdGlvbi5qcyIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hcmNlbG8vRHJvcGJveCAoV29yayAmIENvKS9TY3JlZW4uZnJhbWVyL25vZGVfbW9kdWxlcy9wb3Btb3Rpb24vbGliL2FjdGlvbnMvU2ltdWxhdGUuanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYXJjZWxvL0Ryb3Bib3ggKFdvcmsgJiBDbykvU2NyZWVuLmZyYW1lci9ub2RlX21vZHVsZXMvcG9wbW90aW9uL2xpYi9hY3Rpb25zL1RyYWNrLmpzIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFyY2Vsby9Ecm9wYm94IChXb3JrICYgQ28pL1NjcmVlbi5mcmFtZXIvbm9kZV9tb2R1bGVzL3BvcG1vdGlvbi9saWIvYWN0aW9ucy9Ud2Vlbi5qcyIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hcmNlbG8vRHJvcGJveCAoV29yayAmIENvKS9TY3JlZW4uZnJhbWVyL25vZGVfbW9kdWxlcy9wb3Btb3Rpb24vbGliL2FjdGlvbnMvV2F0Y2guanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYXJjZWxvL0Ryb3Bib3ggKFdvcmsgJiBDbykvU2NyZWVuLmZyYW1lci9ub2RlX21vZHVsZXMvcG9wbW90aW9uL2xpYi9hY3Rpb25zL3NpbXVsYXRlL3NpbXVsYXRpb25zLmpzIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFyY2Vsby9Ecm9wYm94IChXb3JrICYgQ28pL1NjcmVlbi5mcmFtZXIvbm9kZV9tb2R1bGVzL3BvcG1vdGlvbi9saWIvYWN0aW9ucy90d2Vlbi9CZXppZXIuanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYXJjZWxvL0Ryb3Bib3ggKFdvcmsgJiBDbykvU2NyZWVuLmZyYW1lci9ub2RlX21vZHVsZXMvcG9wbW90aW9uL2xpYi9hY3Rpb25zL3R3ZWVuL0Vhc2luZy5qcyIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hcmNlbG8vRHJvcGJveCAoV29yayAmIENvKS9TY3JlZW4uZnJhbWVyL25vZGVfbW9kdWxlcy9wb3Btb3Rpb24vbGliL2FjdGlvbnMvdHdlZW4vVHdlZW5Db250cm9scy5qcyIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hcmNlbG8vRHJvcGJveCAoV29yayAmIENvKS9TY3JlZW4uZnJhbWVyL25vZGVfbW9kdWxlcy9wb3Btb3Rpb24vbGliL2FjdGlvbnMvdHdlZW4vcHJlc2V0LWVhc2luZy5qcyIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hcmNlbG8vRHJvcGJveCAoV29yayAmIENvKS9TY3JlZW4uZnJhbWVyL25vZGVfbW9kdWxlcy9wb3Btb3Rpb24vbGliL2FjdG9yL0FjdG9yLmpzIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFyY2Vsby9Ecm9wYm94IChXb3JrICYgQ28pL1NjcmVlbi5mcmFtZXIvbm9kZV9tb2R1bGVzL3BvcG1vdGlvbi9saWIvYWN0b3IvdXBkYXRlLmpzIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFyY2Vsby9Ecm9wYm94IChXb3JrICYgQ28pL1NjcmVlbi5mcmFtZXIvbm9kZV9tb2R1bGVzL3BvcG1vdGlvbi9saWIvYWN0b3IvdmFsdWUtb3BlcmF0aW9ucy5qcyIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hcmNlbG8vRHJvcGJveCAoV29yayAmIENvKS9TY3JlZW4uZnJhbWVyL25vZGVfbW9kdWxlcy9wb3Btb3Rpb24vbGliL2NvbnRyb2xzL0NvbnRyb2xzLmpzIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFyY2Vsby9Ecm9wYm94IChXb3JrICYgQ28pL1NjcmVlbi5mcmFtZXIvbm9kZV9tb2R1bGVzL3BvcG1vdGlvbi9saWIvaW5jL0hpc3RvcnkuanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYXJjZWxvL0Ryb3Bib3ggKFdvcmsgJiBDbykvU2NyZWVuLmZyYW1lci9ub2RlX21vZHVsZXMvcG9wbW90aW9uL2xpYi9pbmMvUXVldWUuanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYXJjZWxvL0Ryb3Bib3ggKFdvcmsgJiBDbykvU2NyZWVuLmZyYW1lci9ub2RlX21vZHVsZXMvcG9wbW90aW9uL2xpYi9pbmMvY2FsYy5qcyIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hcmNlbG8vRHJvcGJveCAoV29yayAmIENvKS9TY3JlZW4uZnJhbWVyL25vZGVfbW9kdWxlcy9wb3Btb3Rpb24vbGliL2luYy9zZWxlY3QtYWN0b3IuanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYXJjZWxvL0Ryb3Bib3ggKFdvcmsgJiBDbykvU2NyZWVuLmZyYW1lci9ub2RlX21vZHVsZXMvcG9wbW90aW9uL2xpYi9pbmMvc2VsZWN0LWRvbS5qcyIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hcmNlbG8vRHJvcGJveCAoV29yayAmIENvKS9TY3JlZW4uZnJhbWVyL25vZGVfbW9kdWxlcy9wb3Btb3Rpb24vbGliL2luYy91dGlscy5qcyIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hcmNlbG8vRHJvcGJveCAoV29yayAmIENvKS9TY3JlZW4uZnJhbWVyL25vZGVfbW9kdWxlcy9wb3Btb3Rpb24vbGliL2lucHV0L0lucHV0LmpzIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFyY2Vsby9Ecm9wYm94IChXb3JrICYgQ28pL1NjcmVlbi5mcmFtZXIvbm9kZV9tb2R1bGVzL3BvcG1vdGlvbi9saWIvaW5wdXQvUG9pbnRlci5qcyIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hcmNlbG8vRHJvcGJveCAoV29yayAmIENvKS9TY3JlZW4uZnJhbWVyL25vZGVfbW9kdWxlcy9wb3Btb3Rpb24vbGliL2l0ZXJhdG9yL0l0ZXJhdG9yLmpzIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFyY2Vsby9Ecm9wYm94IChXb3JrICYgQ28pL1NjcmVlbi5mcmFtZXIvbm9kZV9tb2R1bGVzL3BvcG1vdGlvbi9saWIvbG9hZC9tb2R1bGUuanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYXJjZWxvL0Ryb3Bib3ggKFdvcmsgJiBDbykvU2NyZWVuLmZyYW1lci9ub2RlX21vZHVsZXMvcG9wbW90aW9uL2xpYi9wb3Btb3Rpb24uanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYXJjZWxvL0Ryb3Bib3ggKFdvcmsgJiBDbykvU2NyZWVuLmZyYW1lci9ub2RlX21vZHVsZXMvcG9wbW90aW9uL2xpYi9wcm9jZXNzL1Byb2Nlc3MuanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYXJjZWxvL0Ryb3Bib3ggKFdvcmsgJiBDbykvU2NyZWVuLmZyYW1lci9ub2RlX21vZHVsZXMvcG9wbW90aW9uL2xpYi9wcm9jZXNzL2xvb3AuanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYXJjZWxvL0Ryb3Bib3ggKFdvcmsgJiBDbykvU2NyZWVuLmZyYW1lci9ub2RlX21vZHVsZXMvcG9wbW90aW9uL2xpYi9wcm9jZXNzL21hbmFnZXIuanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYXJjZWxvL0Ryb3Bib3ggKFdvcmsgJiBDbykvU2NyZWVuLmZyYW1lci9ub2RlX21vZHVsZXMvcG9wbW90aW9uL2xpYi9wcm9jZXNzL3RpY2suanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYXJjZWxvL0Ryb3Bib3ggKFdvcmsgJiBDbykvU2NyZWVuLmZyYW1lci9ub2RlX21vZHVsZXMvcG9wbW90aW9uL2xpYi9wcm9jZXNzL3RpbWVyLmpzIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFyY2Vsby9Ecm9wYm94IChXb3JrICYgQ28pL1NjcmVlbi5mcmFtZXIvbm9kZV9tb2R1bGVzL3BvcG1vdGlvbi9saWIvcm9sZXMvUm9sZS5qcyIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hcmNlbG8vRHJvcGJveCAoV29yayAmIENvKS9TY3JlZW4uZnJhbWVyL25vZGVfbW9kdWxlcy9wb3Btb3Rpb24vbGliL3JvbGVzL2F0dHIvYXR0clJvbGUuanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYXJjZWxvL0Ryb3Bib3ggKFdvcmsgJiBDbykvU2NyZWVuLmZyYW1lci9ub2RlX21vZHVsZXMvcG9wbW90aW9uL2xpYi9yb2xlcy9jc3MvYnVpbGQuanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYXJjZWxvL0Ryb3Bib3ggKFdvcmsgJiBDbykvU2NyZWVuLmZyYW1lci9ub2RlX21vZHVsZXMvcG9wbW90aW9uL2xpYi9yb2xlcy9jc3MvY3NzUm9sZS5qcyIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hcmNlbG8vRHJvcGJveCAoV29yayAmIENvKS9TY3JlZW4uZnJhbWVyL25vZGVfbW9kdWxlcy9wb3Btb3Rpb24vbGliL3JvbGVzL2Nzcy9tYXAuanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYXJjZWxvL0Ryb3Bib3ggKFdvcmsgJiBDbykvU2NyZWVuLmZyYW1lci9ub2RlX21vZHVsZXMvcG9wbW90aW9uL2xpYi9yb2xlcy9jc3MvdHJhbnNmb3JtLWRpY3Rpb25hcnkuanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYXJjZWxvL0Ryb3Bib3ggKFdvcmsgJiBDbykvU2NyZWVuLmZyYW1lci9ub2RlX21vZHVsZXMvcG9wbW90aW9uL2xpYi9yb2xlcy9jc3MvdHlwZS1tYXAuanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYXJjZWxvL0Ryb3Bib3ggKFdvcmsgJiBDbykvU2NyZWVuLmZyYW1lci9ub2RlX21vZHVsZXMvcG9wbW90aW9uL2xpYi9yb2xlcy9kZWZhdWx0Um9sZS5qcyIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hcmNlbG8vRHJvcGJveCAoV29yayAmIENvKS9TY3JlZW4uZnJhbWVyL25vZGVfbW9kdWxlcy9wb3Btb3Rpb24vbGliL3JvbGVzL3BhdGgvZHJhd1BhdGhSb2xlLmpzIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFyY2Vsby9Ecm9wYm94IChXb3JrICYgQ28pL1NjcmVlbi5mcmFtZXIvbm9kZV9tb2R1bGVzL3BvcG1vdGlvbi9saWIvcm9sZXMvcGF0aC9tYXAuanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYXJjZWxvL0Ryb3Bib3ggKFdvcmsgJiBDbykvU2NyZWVuLmZyYW1lci9ub2RlX21vZHVsZXMvcG9wbW90aW9uL2xpYi9yb2xlcy9zdmcvYnVpbGQuanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYXJjZWxvL0Ryb3Bib3ggKFdvcmsgJiBDbykvU2NyZWVuLmZyYW1lci9ub2RlX21vZHVsZXMvcG9wbW90aW9uL2xpYi9yb2xlcy9zdmcvc3ZnUm9sZS5qcyIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hcmNlbG8vRHJvcGJveCAoV29yayAmIENvKS9TY3JlZW4uZnJhbWVyL25vZGVfbW9kdWxlcy9wb3Btb3Rpb24vbGliL3JvbGVzL3N2Zy90eXBlLW1hcC5qcyIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hcmNlbG8vRHJvcGJveCAoV29yayAmIENvKS9TY3JlZW4uZnJhbWVyL25vZGVfbW9kdWxlcy9wb3Btb3Rpb24vbGliL3ZhbHVlLXR5cGVzL2FscGhhLmpzIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFyY2Vsby9Ecm9wYm94IChXb3JrICYgQ28pL1NjcmVlbi5mcmFtZXIvbm9kZV9tb2R1bGVzL3BvcG1vdGlvbi9saWIvdmFsdWUtdHlwZXMvYW5nbGUuanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYXJjZWxvL0Ryb3Bib3ggKFdvcmsgJiBDbykvU2NyZWVuLmZyYW1lci9ub2RlX21vZHVsZXMvcG9wbW90aW9uL2xpYi92YWx1ZS10eXBlcy9jb2xvci5qcyIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hcmNlbG8vRHJvcGJveCAoV29yayAmIENvKS9TY3JlZW4uZnJhbWVyL25vZGVfbW9kdWxlcy9wb3Btb3Rpb24vbGliL3ZhbHVlLXR5cGVzL2NvbXBsZXguanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYXJjZWxvL0Ryb3Bib3ggKFdvcmsgJiBDbykvU2NyZWVuLmZyYW1lci9ub2RlX21vZHVsZXMvcG9wbW90aW9uL2xpYi92YWx1ZS10eXBlcy9kaW1lbnNpb25zLmpzIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFyY2Vsby9Ecm9wYm94IChXb3JrICYgQ28pL1NjcmVlbi5mcmFtZXIvbm9kZV9tb2R1bGVzL3BvcG1vdGlvbi9saWIvdmFsdWUtdHlwZXMvaGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFyY2Vsby9Ecm9wYm94IChXb3JrICYgQ28pL1NjcmVlbi5mcmFtZXIvbm9kZV9tb2R1bGVzL3BvcG1vdGlvbi9saWIvdmFsdWUtdHlwZXMvaHNsLmpzIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFyY2Vsby9Ecm9wYm94IChXb3JrICYgQ28pL1NjcmVlbi5mcmFtZXIvbm9kZV9tb2R1bGVzL3BvcG1vdGlvbi9saWIvdmFsdWUtdHlwZXMvbWFuYWdlci5qcyIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hcmNlbG8vRHJvcGJveCAoV29yayAmIENvKS9TY3JlZW4uZnJhbWVyL25vZGVfbW9kdWxlcy9wb3Btb3Rpb24vbGliL3ZhbHVlLXR5cGVzL21hbmlwdWxhdG9ycy9jcmVhdGUtZGVsaW1pdGVkLmpzIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFyY2Vsby9Ecm9wYm94IChXb3JrICYgQ28pL1NjcmVlbi5mcmFtZXIvbm9kZV9tb2R1bGVzL3BvcG1vdGlvbi9saWIvdmFsdWUtdHlwZXMvbWFuaXB1bGF0b3JzL2Z1bmN0aW9uLWJyZWFrLmpzIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFyY2Vsby9Ecm9wYm94IChXb3JrICYgQ28pL1NjcmVlbi5mcmFtZXIvbm9kZV9tb2R1bGVzL3BvcG1vdGlvbi9saWIvdmFsdWUtdHlwZXMvbWFuaXB1bGF0b3JzL2Z1bmN0aW9uLWNyZWF0ZS5qcyIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hcmNlbG8vRHJvcGJveCAoV29yayAmIENvKS9TY3JlZW4uZnJhbWVyL25vZGVfbW9kdWxlcy9wb3Btb3Rpb24vbGliL3ZhbHVlLXR5cGVzL21hbmlwdWxhdG9ycy9nZXQtY29sb3ItdmFsdWVzLmpzIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFyY2Vsby9Ecm9wYm94IChXb3JrICYgQ28pL1NjcmVlbi5mcmFtZXIvbm9kZV9tb2R1bGVzL3BvcG1vdGlvbi9saWIvdmFsdWUtdHlwZXMvbWFuaXB1bGF0b3JzL3NwbGl0LWNvbW1hLWRlbGltaXRlZC5qcyIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hcmNlbG8vRHJvcGJveCAoV29yayAmIENvKS9TY3JlZW4uZnJhbWVyL25vZGVfbW9kdWxlcy9wb3Btb3Rpb24vbGliL3ZhbHVlLXR5cGVzL21hbmlwdWxhdG9ycy9zcGxpdC1zcGFjZS1kZWxpbWl0ZWQuanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYXJjZWxvL0Ryb3Bib3ggKFdvcmsgJiBDbykvU2NyZWVuLmZyYW1lci9ub2RlX21vZHVsZXMvcG9wbW90aW9uL2xpYi92YWx1ZS10eXBlcy9wb3NpdGlvbnMuanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYXJjZWxvL0Ryb3Bib3ggKFdvcmsgJiBDbykvU2NyZWVuLmZyYW1lci9ub2RlX21vZHVsZXMvcG9wbW90aW9uL2xpYi92YWx1ZS10eXBlcy9weC5qcyIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hcmNlbG8vRHJvcGJveCAoV29yayAmIENvKS9TY3JlZW4uZnJhbWVyL25vZGVfbW9kdWxlcy9wb3Btb3Rpb24vbGliL3ZhbHVlLXR5cGVzL3JnYi5qcyIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hcmNlbG8vRHJvcGJveCAoV29yayAmIENvKS9TY3JlZW4uZnJhbWVyL25vZGVfbW9kdWxlcy9wb3Btb3Rpb24vbGliL3ZhbHVlLXR5cGVzL3NjYWxlLmpzIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbWFyY2Vsby9Ecm9wYm94IChXb3JrICYgQ28pL1NjcmVlbi5mcmFtZXIvbm9kZV9tb2R1bGVzL3BvcG1vdGlvbi9saWIvdmFsdWUtdHlwZXMvc2V0dGluZ3MvZGVmYXVsdC1wcm9wcy5qcyIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL21hcmNlbG8vRHJvcGJveCAoV29yayAmIENvKS9TY3JlZW4uZnJhbWVyL25vZGVfbW9kdWxlcy9wb3Btb3Rpb24vbGliL3ZhbHVlLXR5cGVzL3NldHRpbmdzL2RpY3Rpb25hcnkuanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9tYXJjZWxvL0Ryb3Bib3ggKFdvcmsgJiBDbykvU2NyZWVuLmZyYW1lci9ub2RlX21vZHVsZXMvcG9wbW90aW9uL2xpYi92YWx1ZS10eXBlcy9zaGFkb3cuanMiLCIvVXNlcnMvbWFyY2Vsby9Ecm9wYm94IChXb3JrICYgQ28pL1NjcmVlbi5mcmFtZXIvbW9kdWxlcy9CdXR0b24uY29mZmVlIiwiL1VzZXJzL21hcmNlbG8vRHJvcGJveCAoV29yayAmIENvKS9TY3JlZW4uZnJhbWVyL21vZHVsZXMvQ29udHJvbGxlci5jb2ZmZWUiLCIvVXNlcnMvbWFyY2Vsby9Ecm9wYm94IChXb3JrICYgQ28pL1NjcmVlbi5mcmFtZXIvbW9kdWxlcy9TY3JlZW4uY29mZmVlIiwiL1VzZXJzL21hcmNlbG8vRHJvcGJveCAoV29yayAmIENvKS9TY3JlZW4uZnJhbWVyL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiL1VzZXJzL21hcmNlbG8vRHJvcGJveCAoV29yayAmIENvKS9TY3JlZW4uZnJhbWVyL21vZHVsZXMvbnBtLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuYUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdFRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaFFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQSxJQUFBOzs7QUFBTSxPQUFPLENBQUM7OztFQUNBLGdCQUFDLE9BQUQ7O01BQUMsVUFBUTs7SUFFckIsSUFBQyxDQUFBLElBQUQsR0FBUSxPQUFPLENBQUMsSUFBUixJQUFnQjtJQUN4QixJQUFDLENBQUEsU0FBRCxHQUFhO0lBQ2IsSUFBQyxDQUFBLFVBQUQsR0FBYztJQUNkLElBQUMsQ0FBQSxVQUFELEdBQWM7SUFDZCxJQUFDLENBQUEsVUFBRCxHQUFjO0lBQ2QsSUFBQyxDQUFBLGNBQUQsR0FBa0I7SUFDbEIsSUFBQyxDQUFBLGFBQUQsR0FBaUI7SUFDakIsSUFBQyxDQUFBLFFBQUQsR0FBWTtJQUlaLElBQUMsQ0FBQSxNQUFELEdBQVUsT0FBTyxDQUFDLE1BQVIsSUFBa0IsU0FBQTthQUFHLEtBQUEsQ0FBTSxrQkFBTjtJQUFIO0lBQzVCLElBQUMsQ0FBQSxLQUFELEdBQVMsT0FBTyxDQUFDLEtBQVIsSUFBaUI7SUFFMUIsT0FBTyxDQUFDLENBQVIsR0FBWSxPQUFPLENBQUMsQ0FBUixJQUFhLENBQUEsR0FBSTtJQUM3QixPQUFPLENBQUMsQ0FBUixHQUFZLE9BQU8sQ0FBQyxDQUFSLElBQWEsQ0FBQSxHQUFJO0lBQzdCLE9BQU8sQ0FBQyxLQUFSLEdBQWdCLE9BQU8sQ0FBQyxLQUFSLElBQWlCLElBQUMsQ0FBQTtJQUNsQyxPQUFPLENBQUMsTUFBUixHQUFpQixPQUFPLENBQUMsTUFBUixJQUFrQixJQUFDLENBQUE7SUFDcEMsT0FBTyxDQUFDLGVBQVIsR0FBMEIsT0FBTyxDQUFDLGVBQVIsSUFBMkIsSUFBQyxDQUFBO0lBQ3RELE9BQU8sQ0FBQyxVQUFSLEdBQXFCLE9BQU8sQ0FBQyxVQUFSLElBQXNCO0lBRTNDLHdDQUFNLE9BQU47SUFFQSxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQWIsQ0FBd0IsSUFBeEIsRUFBMkIsSUFBQyxDQUFBLEtBQTVCO0lBRUEsSUFBRyxJQUFDLENBQUEsSUFBRCxLQUFTLE1BQVo7TUFDQyxJQUFDLENBQUEsS0FBRCxHQUNDO1FBQUEsUUFBQSxFQUFTLGlCQUFUO1FBQ0Esd0JBQUEsRUFBeUIsTUFEekI7UUFFQSwyQkFBQSxFQUE0QixNQUY1QjtRQUdBLFVBQUEsRUFBVyxJQUFDLENBQUEsUUFIWjtRQUZGO0tBQUEsTUFPSyxJQUFHLElBQUMsQ0FBQSxJQUFELEtBQVMsT0FBWjtNQUNKLElBQUMsQ0FBQSxLQUFELEdBQ0M7UUFBQSxRQUFBLEVBQVMsaUJBQVQ7UUFDQSx5QkFBQSxFQUEwQixNQUQxQjtRQUVBLDRCQUFBLEVBQTZCLE1BRjdCO1FBR0EsVUFBQSxFQUFXLElBQUMsQ0FBQSxRQUhaO1FBRkc7S0FBQSxNQU9BLElBQUcsSUFBQyxDQUFBLElBQUQsS0FBUyxRQUFaO01BQ0osSUFBQyxDQUFBLEtBQUQsR0FDQztRQUFBLFFBQUEsRUFBUyxpQkFBVDtRQUNBLFVBQUEsRUFBVyxJQUFDLENBQUEsUUFEWjtRQUZHO0tBQUEsTUFLQSxJQUFHLElBQUMsQ0FBQSxJQUFELEtBQVMsUUFBWjtNQUNKLElBQUMsQ0FBQSxLQUFELEdBQ0M7UUFBQSxRQUFBLEVBQVMsaUJBQVQ7UUFDQSx3QkFBQSxFQUF5QixNQUR6QjtRQUVBLDJCQUFBLEVBQTRCLE1BRjVCO1FBR0EseUJBQUEsRUFBMEIsTUFIMUI7UUFJQSw0QkFBQSxFQUE2QixNQUo3QjtRQUtBLFVBQUEsRUFBVyxJQUFDLENBQUEsUUFMWjtRQUZHOztJQWFMLElBQUMsQ0FBQSxFQUFELENBQUksTUFBTSxDQUFDLFNBQVgsRUFBc0IsU0FBQTthQUNyQixJQUFDLENBQUEsS0FBRCxHQUNDO1FBQUEsZUFBQSxFQUFnQixJQUFDLENBQUEsVUFBakI7UUFDQSxjQUFBLEVBQWUsZ0JBRGY7O0lBRm9CLENBQXRCO0lBTUEsSUFBQyxDQUFDLEVBQUYsQ0FBSyxNQUFNLENBQUMsS0FBWixFQUFtQixTQUFBO2FBSWxCLElBQUMsQ0FBQSxNQUFELENBQUE7SUFKa0IsQ0FBbkI7SUFPQSxJQUFDLENBQUMsRUFBRixDQUFLLE1BQU0sQ0FBQyxRQUFaLEVBQXNCLFNBQUE7YUFDckIsSUFBQyxDQUFBLEtBQUQsR0FDQztRQUFBLGVBQUEsRUFBZ0IsSUFBQyxDQUFBLFNBQWpCOztJQUZvQixDQUF0QjtJQUtBLElBQUMsQ0FBQyxFQUFGLENBQUssTUFBTSxDQUFDLFVBQVosRUFBd0IsU0FBQTtNQUN2QixJQUFDLENBQUEsS0FBRCxHQUFTO2FBQ1QsSUFBQyxDQUFBLEtBQUQsR0FDQztRQUFBLGVBQUEsRUFBZ0IsSUFBQyxDQUFBLFVBQWpCOztJQUhzQixDQUF4QjtJQUtBLElBQUMsQ0FBQyxFQUFGLENBQUssTUFBTSxDQUFDLFFBQVosRUFBc0IsU0FBQTtNQUNyQixJQUFDLENBQUEsS0FBRCxHQUFTO2FBQ1QsSUFBQyxDQUFBLEtBQUQsR0FDQztRQUFBLGVBQUEsRUFBZ0IsSUFBQyxDQUFBLFNBQWpCOztJQUhvQixDQUF0QjtJQU1BLElBQUMsQ0FBQSxNQUFNLENBQUMsR0FBUixDQUNDO01BQUEsS0FBQSxFQUFNLEVBQU47TUFDQSxNQUFBLEVBQU8sRUFEUDtNQUVBLE9BQUEsRUFBUSxFQUZSO0tBREQ7RUF4Rlk7Ozs7R0FEZTs7OztBQ0E3QixPQUFPLENBQUMsU0FBUixHQUFvQixPQUFBLENBQVEsS0FBUixDQUFjLENBQUM7O0FBQ25DLE9BQU8sQ0FBQyxVQUFSLEdBQXFCO0VBRXBCLEtBQUEsRUFBUSxFQUZZO0VBR3BCLE9BQUEsRUFBVSxFQUhVO0VBSXBCLE1BQUEsRUFBUyxDQUFDLENBSlU7RUFNcEIsT0FBQSxFQUFVLE1BTlU7RUFPcEIsS0FBQSxFQUFRLElBUFk7RUFRcEIsR0FBQSxFQUFLLFNBQUMsTUFBRDtJQUNKLEtBQUEsQ0FBTSxNQUFNLENBQUMsSUFBYjtXQUVBLElBQUMsQ0FBQSxPQUFRLENBQUEsTUFBTSxDQUFDLElBQVAsQ0FBVCxHQUF3QjtFQUhwQixDQVJlO0VBWXBCLE1BQUEsRUFBUSxTQUFDLFVBQUQ7SUFFUCxJQUFHLENBQUksSUFBQyxDQUFBLE9BQU8sQ0FBQyxjQUFULENBQXdCLFVBQXhCLENBQVA7TUFDQyxLQUFBLENBQU0sY0FBQSxHQUFlLFVBQWYsR0FBMEIsZ0JBQWhDO0FBQ0EsYUFGRDs7SUFHQSxPQUFPLElBQUMsQ0FBQSxPQUFRLENBQUEsVUFBQTtXQUVoQixJQUFDLENBQUEsS0FBRCxHQUFTLENBQUMsQ0FBQyxPQUFGLENBQVUsSUFBQyxDQUFBLE1BQVgsRUFBbUIsVUFBbkI7RUFQRixDQVpZO0VBcUJwQixJQUFBLEVBQU8sU0FBQyxVQUFEO0lBSU4sS0FBQSxDQUFNLFlBQUEsR0FBYSxVQUFiLEdBQXdCLG1CQUF4QixHQUEyQyxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQWxELEdBQXlELDRCQUEvRDtJQUVBLElBQUcsSUFBQyxDQUFBLEtBQUssQ0FBQyxNQUFQLEtBQWlCLENBQXBCO01BQ0MsSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFQLENBQVksSUFBQyxDQUFBLE9BQVEsQ0FBQSxVQUFBLENBQXJCO01BQ0EsSUFBQyxDQUFBLE9BQVEsQ0FBQSxVQUFBLENBQVcsQ0FBQyxjQUFyQixDQUFBLEVBRkQ7S0FBQSxNQUFBO01BSUMsS0FBQSxDQUFNLHdDQUFOO01BRUEsSUFBQyxDQUFBLEtBQU0sQ0FBQSxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQVAsR0FBYyxDQUFkLENBQWdCLENBQUMsYUFBeEIsQ0FBQTtNQUVBLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxDQUFZLElBQUMsQ0FBQSxPQUFRLENBQUEsVUFBQSxDQUFyQjtNQUVBLElBQUMsQ0FBQSxPQUFRLENBQUEsVUFBQSxDQUFXLENBQUMsY0FBckIsQ0FBQSxFQVZEOztJQWFBLEtBQUEsQ0FBTSxpQkFBQSxHQUFrQixJQUFDLENBQUEsS0FBSyxDQUFDLE1BQS9CO0lBQ0EsSUFBRyxJQUFDLENBQUEsTUFBRCxLQUFXLENBQUMsQ0FBZjtNQUNDLElBQUMsQ0FBQSxNQUFELEdBQVUsRUFEWDs7SUFFQSxJQUFHLElBQUMsQ0FBQyxLQUFMO2FBQWdCLEtBQUEsQ0FBTSxRQUFBLEdBQVMsVUFBVCxHQUFvQixrQkFBcEIsR0FBc0MsSUFBQyxDQUFBLEtBQUssQ0FBQyxNQUE3QyxHQUFvRCxNQUExRCxFQUFoQjs7RUF0Qk0sQ0FyQmE7RUE2Q3BCLElBQUEsRUFBTyxTQUFBO0lBQ04sSUFBRyxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQVAsR0FBZ0IsQ0FBbkI7TUFDQyxJQUFDLENBQUEsS0FBTSxDQUFBLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBUCxHQUFjLENBQWQsQ0FBZ0IsQ0FBQyxhQUF4QixDQUFBLEVBREQ7S0FBQSxNQUFBO01BR0MsSUFBRyxJQUFDLENBQUEsS0FBSjtRQUFlLEtBQUEsQ0FBTSxjQUFOLEVBQWY7T0FIRDs7SUFLQSxJQUFHLElBQUMsQ0FBQSxLQUFKO01BQWUsS0FBQSxDQUFNLDZCQUFBLEdBQThCLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBckMsR0FBNEMsSUFBbEQsRUFBZjs7SUFFQSxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBQTtJQUVBLElBQUcsSUFBQyxDQUFBLEtBQUo7YUFBZSxLQUFBLENBQU0sMEJBQUEsR0FBMkIsSUFBQyxDQUFBLEtBQUssQ0FBQyxNQUFsQyxHQUF5QyxJQUEvQyxFQUFmOztFQVZNLENBN0NhO0VBeURwQixJQUFBLEVBQU8sU0FBQyxJQUFEOztNQUFDLE9BQUs7O0lBRVosS0FBQSxDQUFNLENBQUEsV0FBQSxHQUFZLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBbkIsR0FBMEIsV0FBMUIsQ0FBQSxHQUFxQyxJQUEzQztJQUNBLElBQUcsSUFBQyxDQUFBLEtBQUssQ0FBQyxNQUFQLEdBQWdCLENBQW5CO01BRUMsSUFBQyxDQUFBLEtBQU0sQ0FBQSxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQVAsR0FBYyxDQUFkLENBQWdCLENBQUMsYUFBeEIsQ0FBQTtNQUVBLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFBO01BQ0EsSUFBRyxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQVAsR0FBZ0IsQ0FBbkI7ZUFDQyxJQUFDLENBQUEsS0FBTSxDQUFBLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBUCxHQUFjLENBQWQsQ0FBZ0IsQ0FBQyxjQUF4QixDQUFBLEVBREQ7T0FMRDtLQUFBLE1BQUE7TUFTQyxJQUFHLElBQUEsS0FBUSxLQUFYO2VBQ0MsS0FBQSxDQUFNLGtDQUFBLEdBQW1DLElBQXpDLEVBREQ7T0FBQSxNQUFBO2VBR0MsS0FBQSxDQUFNLGVBQU4sRUFIRDtPQVREOztFQUhNLENBekRhO0VBMEVwQixVQUFBLEVBQWEsU0FBQTtBQUNaLFFBQUE7SUFBQSxLQUFBLENBQU0sY0FBQSxHQUFlLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBdEIsR0FBNkIsZ0JBQTdCLEdBQTZDLElBQUMsQ0FBQSxNQUE5QyxHQUFxRCx5QkFBckQsR0FBOEUsSUFBQyxDQUFBLE9BQVEsQ0FBQSxNQUFBLENBQTdGO0FBQ0E7QUFBQTtTQUFBLHFDQUFBOzttQkFDQyxLQUFBLENBQU0sTUFBTSxDQUFDLElBQWI7QUFERDs7RUFGWSxDQTFFTzs7Ozs7O0FDQXJCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUE7OztBQXdCTSxPQUFPLENBQUM7OztFQUdiLGVBQUMsQ0FBQSxLQUFELEdBQVM7O0VBRVQsZUFBQyxDQUFBLEtBQUQsR0FBUzs7RUFDVCxlQUFDLENBQUEsT0FBRCxHQUFXLE1BQU0sQ0FBQzs7RUFDbEIsZUFBQyxDQUFBLE9BQUQsR0FBVyxNQUFNLENBQUM7O0VBR04seUJBQUMsT0FBRDtBQUVYLFFBQUE7O01BRlksVUFBUTs7SUFFcEIsSUFBQyxDQUFBLFNBQUQsR0FBYTtJQUNiLElBQUMsQ0FBQSxNQUFELEdBQVU7SUFFVixPQUFPLENBQUMsS0FBUixHQUFnQixPQUFPLENBQUMsS0FBUixJQUFpQixlQUFlLENBQUM7SUFDakQsT0FBTyxDQUFDLE1BQVIsR0FBaUIsT0FBTyxDQUFDLE1BQVIsSUFBa0IsZUFBZSxDQUFDO0lBQ25ELE9BQU8sQ0FBQyxlQUFSLEdBQTBCLE9BQU8sQ0FBQyxlQUFSLElBQTJCLEtBQUssQ0FBQyxXQUFOLENBQUE7SUFDckQsT0FBTyxDQUFDLENBQVIsR0FBWSxPQUFPLENBQUMsQ0FBUixJQUFhO0lBQ3pCLE9BQU8sQ0FBQyxJQUFSLEdBQWUsT0FBTyxDQUFDLElBQVIsSUFBZ0I7SUFDL0IsT0FBTyxDQUFDLEtBQVIsR0FBZ0IsT0FBTyxDQUFDLEtBQVIsSUFBaUIsZUFBZSxDQUFDLEtBQWpDLElBQTBDO0lBQzFELGlEQUFNLE9BQU47SUFDQSxJQUFHLGVBQWUsQ0FBQyxLQUFuQjtNQUE4QixLQUFLLENBQUMsVUFBTixDQUFpQixJQUFqQixFQUFvQixHQUFBLEdBQUksSUFBQyxDQUFBLElBQUwsR0FBVSxLQUFWLEdBQWUsSUFBQyxDQUFDLEVBQXJDLEVBQTlCOztJQUNBLE1BQUEsR0FBYSxJQUFBLEtBQUEsQ0FBTTtNQUFBLEtBQUEsRUFBTSxlQUFlLENBQUMsT0FBdEI7TUFBK0IsTUFBQSxFQUFPLGVBQWUsQ0FBQyxPQUF0RDtNQUErRCxVQUFBLEVBQVcsSUFBMUU7TUFBNEUsZUFBQSxFQUFnQixhQUE1RjtNQUEwRyxJQUFBLEVBQUssSUFBQyxDQUFDLElBQUYsR0FBTyxVQUF0SDtLQUFOO0lBQ2IsSUFBRyxPQUFPLENBQUMsVUFBUixLQUFzQixJQUF6QjtNQUVDLElBQUMsQ0FBQSxTQUFELEdBQWlCLElBQUEsZUFBQSxDQUFnQjtRQUFBLEtBQUEsRUFBTSxlQUFlLENBQUMsT0FBdEI7UUFBK0IsTUFBQSxFQUFPLGVBQWUsQ0FBQyxPQUF0RDtRQUErRCxVQUFBLEVBQVcsSUFBMUU7UUFBNkUsZUFBQSxFQUFnQixhQUE3RjtRQUEyRyxnQkFBQSxFQUFrQixLQUE3SDtPQUFoQixFQUZsQjtLQUFBLE1BQUE7TUFLQyxJQUFDLENBQUEsU0FBRCxHQUFpQixJQUFBLEtBQUEsQ0FBTTtRQUFBLEtBQUEsRUFBTSxlQUFlLENBQUMsT0FBdEI7UUFBK0IsTUFBQSxFQUFPLGVBQWUsQ0FBQyxPQUF0RDtRQUErRCxVQUFBLEVBQVcsSUFBMUU7UUFBNEUsZUFBQSxFQUFnQixhQUE1RjtPQUFOLEVBTGxCOztFQWRXOzs0QkFxQlosY0FBQSxHQUFnQixTQUFBO0lBQ2YsSUFBQyxDQUFBLE1BQUQsR0FBVTtJQUNWLElBQUMsQ0FBQSxPQUFELEdBQVc7SUFDWCxJQUFDLENBQUEsT0FBRCxDQUNDO01BQUEsVUFBQSxFQUNDO1FBQUEsQ0FBQSxFQUFFLENBQUY7UUFDQSxPQUFBLEVBQVEsQ0FEUjtRQUVBLEtBQUEsRUFBTSxDQUZOO09BREQ7TUFJQSxLQUFBLEVBQU0sZUFBZSxDQUFDLEtBSnRCO0tBREQ7V0FNQSxLQUFBLENBQU0sT0FBTjtFQVRlOzs0QkFXaEIsYUFBQSxHQUFlLFNBQUE7SUFDZCxJQUFDLENBQUEsTUFBRCxHQUFVO0lBQ1YsSUFBQyxDQUFBLE9BQUQsQ0FDQztNQUFBLFVBQUEsRUFDQztRQUFBLEtBQUEsRUFBTSxHQUFOO1FBQ0EsQ0FBQSxFQUFFLElBQUMsQ0FBQSxDQUFELEdBQUcsR0FETDtRQUVBLE9BQUEsRUFBUSxDQUZSO09BREQ7TUFJQSxLQUFBLEVBQU0sZUFBZSxDQUFDLEtBSnRCO0tBREQ7SUFNQSxLQUFLLENBQUMsS0FBTixDQUFZLEdBQVosRUFBaUIsU0FBQTthQUNoQixJQUFDLENBQUEsT0FBRCxHQUFXO0lBREssQ0FBakI7V0FFQSxLQUFBLENBQU0sTUFBTjtFQVZjOzs0QkFZZixhQUFBLEdBQWUsU0FBQTtJQUNkLElBQUMsQ0FBQSxNQUFELEdBQVU7SUFDVixJQUFDLENBQUEsT0FBRCxDQUNDO01BQUEsVUFBQSxFQUNDO1FBQUEsQ0FBQSxFQUFFLGVBQWUsQ0FBQyxPQUFsQjtRQUNBLE9BQUEsRUFBUSxDQURSO09BREQ7TUFHQSxLQUFBLEVBQU0sZUFBZSxDQUFDLEtBSHRCO0tBREQ7SUFLQSxLQUFLLENBQUMsS0FBTixDQUFZLEdBQVosRUFBaUIsU0FBQTthQUNoQixJQUFDLENBQUEsT0FBRCxHQUFXO0lBREssQ0FBakI7V0FFQSxLQUFBLENBQU0sTUFBTjtFQVRjOzs0QkFXZixLQUFBLEdBQU8sU0FBQTtJQUNOLEtBQUEsQ0FBTSxXQUFBLEdBQVksSUFBQyxDQUFBLElBQW5CO1dBQ0EsSUFBQyxDQUFBLE1BQUQsR0FBVTtFQUZKOzs0QkFHUCxLQUFBLEdBQU8sU0FBQTtJQUNOLEtBQUEsQ0FBTSxVQUFBLEdBQVcsSUFBQyxDQUFBLElBQWxCO1dBQ0EsSUFBQyxDQUFBLE1BQUQsR0FBVTtFQUZKOzs0QkFHUCxLQUFBLEdBQU8sU0FBQTtXQUNOLEtBQUEsQ0FBTSxRQUFBLEdBQVMsSUFBQyxDQUFBLElBQWhCO0VBRE07Ozs7R0F2RThCOzs7O0FDeEJ0QyxJQUFBOzs7QUFBTSxPQUFPLENBQUM7QUFFYixNQUFBOzs7O0VBQUEsTUFBQyxDQUFBLEtBQUQsR0FBUzs7RUFDVCxTQUFBLEdBQVk7O0VBQ1osTUFBQSxHQUFTOztFQUVHLGdCQUFDLE9BQUQ7QUFDWCxRQUFBOztNQURZLFVBQVE7O0lBQ3BCLE9BQU8sQ0FBQyxLQUFSLEdBQWdCLE9BQU8sQ0FBQyxLQUFSLElBQWlCO0lBQ2pDLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLE9BQU8sQ0FBQyxNQUFSLElBQWtCO0lBQ25DLE9BQU8sQ0FBQyxlQUFSLEdBQTBCLE9BQU8sQ0FBQyxlQUFSLElBQTJCLEtBQUssQ0FBQyxXQUFOLENBQUE7SUFDckQsT0FBTyxDQUFDLENBQVIsR0FBWSxPQUFPLENBQUMsQ0FBUixJQUFhLGlCQUFBLEdBQXFCLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBWCxHQUFvQjtJQUNsRSx3Q0FBTSxPQUFOO0lBQ0EsRUFBRSxDQUFDLFNBQUgsQ0FBYSxJQUFiO0lBR0EsTUFBQSxHQUFhLElBQUEsS0FBQSxDQUFNO01BQUEsS0FBQSxFQUFNLE9BQU47TUFBZSxNQUFBLEVBQU8sT0FBdEI7TUFBK0IsVUFBQSxFQUFXLElBQTFDO01BQTRDLGVBQUEsRUFBZ0IsYUFBNUQ7S0FBTjtJQUNiLElBQUcsT0FBTyxDQUFDLFVBQVIsS0FBc0IsSUFBekI7TUFFQyxJQUFDLENBQUEsU0FBRCxHQUFpQixJQUFBLGVBQUEsQ0FBZ0I7UUFBQSxLQUFBLEVBQU0sT0FBTjtRQUFlLE1BQUEsRUFBTyxPQUF0QjtRQUErQixVQUFBLEVBQVcsSUFBMUM7UUFBNkMsZUFBQSxFQUFnQixhQUE3RDtRQUEyRSxnQkFBQSxFQUFrQixLQUE3RjtPQUFoQixFQUZsQjtLQUFBLE1BQUE7TUFLQyxJQUFDLENBQUEsU0FBRCxHQUFpQixJQUFBLEtBQUEsQ0FBTTtRQUFBLEtBQUEsRUFBTSxPQUFOO1FBQWUsTUFBQSxFQUFPLE9BQXRCO1FBQStCLFVBQUEsRUFBVyxJQUExQztRQUE0QyxlQUFBLEVBQWdCLGFBQTVEO09BQU4sRUFMbEI7O0VBVlc7O21CQWlCWixjQUFBLEdBQWdCLFNBQUE7SUFDZixJQUFDLENBQUEsTUFBRCxHQUFVO0lBQ1YsSUFBQyxDQUFBLE9BQUQsR0FBVztJQUNYLElBQUMsQ0FBQSxPQUFELENBQ0M7TUFBQSxVQUFBLEVBQ0M7UUFBQSxDQUFBLEVBQUUsQ0FBRjtRQUNBLE9BQUEsRUFBUSxDQURSO1FBRUEsS0FBQSxFQUFNLENBRk47T0FERDtNQUlBLEtBQUEsRUFBTSxNQUFNLENBQUMsS0FKYjtLQUREO1dBTUEsS0FBQSxDQUFNLE9BQU47RUFUZTs7bUJBV2hCLGFBQUEsR0FBZSxTQUFBO0lBQ2QsSUFBQyxDQUFBLE1BQUQsR0FBVTtJQUNWLElBQUMsQ0FBQSxPQUFELENBQ0M7TUFBQSxVQUFBLEVBQ0M7UUFBQSxLQUFBLEVBQU0sR0FBTjtRQUNBLENBQUEsRUFBRSxJQUFDLENBQUEsQ0FBRCxHQUFHLEdBREw7UUFFQSxPQUFBLEVBQVEsQ0FGUjtPQUREO01BSUEsS0FBQSxFQUFNLE1BQU0sQ0FBQyxLQUpiO0tBREQ7SUFNQSxLQUFLLENBQUMsS0FBTixDQUFZLEdBQVosRUFBaUIsU0FBQTthQUNoQixJQUFDLENBQUEsT0FBRCxHQUFXO0lBREssQ0FBakI7V0FFQSxLQUFBLENBQU0sTUFBTjtFQVZjOzttQkFZZixhQUFBLEdBQWUsU0FBQTtJQUNkLElBQUMsQ0FBQSxNQUFELEdBQVU7SUFDVixJQUFDLENBQUEsT0FBRCxDQUNDO01BQUEsVUFBQSxFQUNDO1FBQUEsQ0FBQSxFQUFFLE9BQUY7UUFDQSxPQUFBLEVBQVEsQ0FEUjtPQUREO01BR0EsS0FBQSxFQUFNLE1BQU0sQ0FBQyxLQUhiO0tBREQ7SUFLQSxLQUFLLENBQUMsS0FBTixDQUFZLEdBQVosRUFBaUIsU0FBQTthQUNoQixJQUFDLENBQUEsT0FBRCxHQUFXO0lBREssQ0FBakI7V0FFQSxLQUFBLENBQU0sTUFBTjtFQVRjOzttQkFXZixLQUFBLEdBQU8sU0FBQTtJQUNOLEtBQUEsQ0FBTSxXQUFBLEdBQVksSUFBQyxDQUFBLElBQW5CO1dBQ0EsSUFBQyxDQUFBLE1BQUQsR0FBVTtFQUZKOzttQkFHUCxLQUFBLEdBQU8sU0FBQTtJQUNOLEtBQUEsQ0FBTSxVQUFBLEdBQVcsSUFBQyxDQUFBLElBQWxCO1dBQ0EsSUFBQyxDQUFBLE1BQUQsR0FBVTtFQUZKOzttQkFHUCxLQUFBLEdBQU8sU0FBQTtXQUNOLEtBQUEsQ0FBTSxRQUFBLEdBQVMsSUFBQyxDQUFBLElBQWhCO0VBRE07Ozs7R0EvRHFCOzs7O0FDRDdCLE9BQU8sQ0FBQyxTQUFSLEdBQW9CLE9BQUEsQ0FBUSxXQUFSIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbnZhciBjYWxjID0gcmVxdWlyZSgnLi4vaW5jL2NhbGMnKSxcbiAgICB1dGlscyA9IHJlcXVpcmUoJy4uL2luYy91dGlscycpLFxuICAgIGVhY2ggPSB1dGlscy5lYWNoLFxuICAgIENvbnRyb2xzID0gcmVxdWlyZSgnLi4vY29udHJvbHMvQ29udHJvbHMnKTtcblxudmFyIERFRkFVTFRfUFJPUCA9ICdjdXJyZW50JztcbnZhciBQUklWQVRFID0gWydvblN0YXJ0JywgJ29uRnJhbWUnLCAnb25VcGRhdGUnLCAnb25Db21wbGV0ZSddO1xuXG52YXIgQWN0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBY3Rpb24ocHJvcHMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEFjdGlvbik7XG5cbiAgICAgICAgdmFyIGFjdGlvbiA9IHRoaXM7XG5cbiAgICAgICAgdXRpbHMuZWFjaCh0aGlzLmdldERlZmF1bHRQcm9wcygpLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgYWN0aW9uW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy52YWx1ZXMgPSB7fTtcbiAgICAgICAgdGhpcy5zZXQocHJvcHMsIHRoaXMuZ2V0RGVmYXVsdFZhbHVlUHJvcCgpKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoQWN0aW9uLCBbe1xuICAgICAgICBrZXk6ICdzZXQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2V0KCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIHByb3BzID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICB2YXIgZGVmYXVsdFByb3AgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBERUZBVUxUX1BST1AgOiBhcmd1bWVudHNbMV07XG5cbiAgICAgICAgICAgIGVhY2gocHJvcHMsIGZ1bmN0aW9uIChrZXksIHByb3ApIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ICE9PSAndmFsdWVzJykge1xuICAgICAgICAgICAgICAgICAgICBfdGhpc1trZXldID0gcHJvcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gTWVyZ2UgdmFsdWVzXG4gICAgICAgICAgICBpZiAocHJvcHMudmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRWYWx1ZXMgPSBfdGhpcy52YWx1ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgPSBwcm9wcy52YWx1ZXM7XG5cbiAgICAgICAgICAgICAgICAgICAgZWFjaCh2YWx1ZXMsIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXhpc3RpbmdWYWx1ZSA9IGN1cnJlbnRWYWx1ZXNba2V5XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IHt9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodXRpbHMuaXNPYmoodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWVbZGVmYXVsdFByb3BdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZXNba2V5XSA9IGV4aXN0aW5nVmFsdWUgPyB1dGlscy5tZXJnZShleGlzdGluZ1ZhbHVlLCBuZXdWYWx1ZSkgOiBuZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3Byb2Nlc3MnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcHJvY2VzcyhhY3RvciwgdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5jdXJyZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgLypcbiAgICAgICAgICAgICBIYXMgQWN0aW9uIGVuZGVkP1xuICAgICAgICAgICAgIFxuICAgICAgICAgICAgIFJldHVybnMgdHJ1ZSB0byBlbmQgaW1tZWRpZXRseVxuICAgICAgICAgICAgIFxuICAgICAgICAgICAgIEByZXR1cm4gW2Jvb2xlYW5dOiB0cnVlXG4gICAgICAgICAqL1xuICAgIH0sIHtcbiAgICAgICAga2V5OiAnaGFzRW5kZWQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaGFzRW5kZWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnbGltaXQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbGltaXQob3V0cHV0LCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIHJlc3RyaWN0ZWQgPSBjYWxjLnJlc3RyaWN0ZWQob3V0cHV0LCB2YWx1ZS5taW4sIHZhbHVlLm1heCksXG4gICAgICAgICAgICAgICAgZXNjYXBlQW1wID0gdmFsdWUuZXNjYXBlQW1wICE9PSB1bmRlZmluZWQgPyB2YWx1ZS5lc2NhcGVBbXAgOiAwO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3RyaWN0ZWQgKyAob3V0cHV0IC0gcmVzdHJpY3RlZCkgKiBlc2NhcGVBbXA7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldENvbnRyb2xzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldENvbnRyb2xzKCkge1xuICAgICAgICAgICAgcmV0dXJuIENvbnRyb2xzO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXREZWZhdWx0UHJvcHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXREZWZhdWx0VmFsdWUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbHVlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXREZWZhdWx0VmFsdWVQcm9wJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZVByb3AoKSB7XG4gICAgICAgICAgICByZXR1cm4gREVGQVVMVF9QUk9QO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRTZXQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0U2V0KCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciBzZXQgPSB7IHZhbHVlczogdGhpcy52YWx1ZXMgfTtcblxuICAgICAgICAgICAgZWFjaCh0aGlzLCBmdW5jdGlvbiAoa2V5LCBwcm9wKSB7XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzMi5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIFBSSVZBVEUuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBzZXRba2V5XSA9IHByb3A7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBzZXQ7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2V4dGVuZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBleHRlbmQocHJvcHMpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih1dGlscy5tZXJnZSh0aGlzLCBwcm9wcyksIHRoaXMuZ2V0RGVmYXVsdFZhbHVlUHJvcCgpKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0UGxheWFibGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0UGxheWFibGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leHRlbmQoKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnYWN0aXZhdGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG4gICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdkZWFjdGl2YXRlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRlYWN0aXZhdGUoKSB7XG4gICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBBY3Rpb247XG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFjdGlvbjsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBBY3Rpb24gPSByZXF1aXJlKCcuL0FjdGlvbicpLFxuICAgIGNhbGMgPSByZXF1aXJlKCcuLi9pbmMvY2FsYycpLFxuICAgIHV0aWxzID0gcmVxdWlyZSgnLi4vaW5jL3V0aWxzJyksXG4gICAgc2ltdWxhdGlvbnMgPSByZXF1aXJlKCcuL3NpbXVsYXRlL3NpbXVsYXRpb25zJyk7XG5cbnZhciBERUZBVUxUX1BST1AgPSAndmVsb2NpdHknO1xuXG52YXIgU2ltdWxhdGUgPSAoZnVuY3Rpb24gKF9BY3Rpb24pIHtcbiAgICBfaW5oZXJpdHMoU2ltdWxhdGUsIF9BY3Rpb24pO1xuXG4gICAgZnVuY3Rpb24gU2ltdWxhdGUoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTaW11bGF0ZSk7XG5cbiAgICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICAgIH1cblxuICAgICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihTaW11bGF0ZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVzVmVsb2NpdHkgPSB0cnVlO1xuICAgICAgICB0aGlzLmluYWN0aXZlRnJhbWVzID0gMDtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoU2ltdWxhdGUsIFt7XG4gICAgICAgIGtleTogJ2dldERlZmF1bHRQcm9wcycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXREZWZhdWx0UHJvcHMoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG1heEluYWN0aXZlRnJhbWVzOiAzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXREZWZhdWx0VmFsdWUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbHVlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAvLyBbc3RyaW5nXTogU2ltdWxhdGlvbiB0byAucnVuXG4gICAgICAgICAgICAgICAgc2ltdWxhdGU6IERFRkFVTFRfUFJPUCxcblxuICAgICAgICAgICAgICAgIC8vIFtudW1iZXJdOiBEZWNlbGVyYXRpb24gdG8gYXBwbHkgdG8gdmFsdWUsIGluIHVuaXRzIHBlciBzZWNvbmRcbiAgICAgICAgICAgICAgICBkZWNlbGVyYXRpb246IDAsXG5cbiAgICAgICAgICAgICAgICAvLyBbbnVtYmVyXTogQWNjZWxlcmF0aW9uIHRvIGFwcGx5IHRvIHZhbHVlLCBpbiB1bml0cyBwZXIgc2Vjb25kXG4gICAgICAgICAgICAgICAgYWNjZWxlcmF0aW9uOiAwLFxuXG4gICAgICAgICAgICAgICAgLy8gW251bWJlcl06IEZhY3RvciB0byBtdWx0aXBseSB2ZWxvY2l0eSBieSBvbiBib3VuY2VcbiAgICAgICAgICAgICAgICBib3VuY2U6IDAsXG5cbiAgICAgICAgICAgICAgICAvLyBbbnVtYmVyXTogU3ByaW5nIHN0cmVuZ3RoIGR1cmluZyAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgIHNwcmluZzogODAsXG5cbiAgICAgICAgICAgICAgICAvLyBbbnVtYmVyXTogVGltZWNvbnN0YW50IG9mIGdsaWRlXG4gICAgICAgICAgICAgICAgdGltZUNvbnN0YW50OiAzOTUsXG5cbiAgICAgICAgICAgICAgICAvLyBbbnVtYmVyXTogU3RvcCBzaW11bGF0aW9uIHVuZGVyIHRoaXMgc3BlZWRcbiAgICAgICAgICAgICAgICBzdG9wU3BlZWQ6IDUsXG5cbiAgICAgICAgICAgICAgICAvLyBbYm9vbGVhbl06IENhcHR1cmUgd2l0aCBzcHJpbmcgcGh5c2ljcyBvbiBsaW1pdCBicmVhY2hcbiAgICAgICAgICAgICAgICBjYXB0dXJlOiBmYWxzZSxcblxuICAgICAgICAgICAgICAgIC8vIFtudW1iZXJdOiBGcmljdGlvbiB0byBhcHBseSBwZXIgZnJhbWVcbiAgICAgICAgICAgICAgICBmcmljdGlvbjogMCxcblxuICAgICAgICAgICAgICAgIHRvOiAwLFxuICAgICAgICAgICAgICAgIHJvdW5kOiBmYWxzZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0RGVmYXVsdFZhbHVlUHJvcCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXREZWZhdWx0VmFsdWVQcm9wKCkge1xuICAgICAgICAgICAgcmV0dXJuIERFRkFVTFRfUFJPUDtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnb25TdGFydCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBvblN0YXJ0KCkge1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gdXRpbHMuY3VycmVudFRpbWUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qXG4gICAgICAgICAgICBTaW11bGF0ZSB0aGUgVmFsdWUncyBwZXItZnJhbWUgbW92ZW1lbnRcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgQHBhcmFtIFtBY3Rvcl1cbiAgICAgICAgICAgIEBwYXJhbSBbVmFsdWVdOiBDdXJyZW50IHZhbHVlXG4gICAgICAgICAgICBAcGFyYW0gW3N0cmluZ106IEtleSBvZiBjdXJyZW50IHZhbHVlXG4gICAgICAgICAgICBAcGFyYW0gW251bWJlcl06IER1cmF0aW9uIG9mIGZyYW1lIGluIG1zXG4gICAgICAgICAgICBAcmV0dXJuIFtudW1iZXJdOiBDYWxjdWxhdGVkIHZhbHVlXG4gICAgICAgICovXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdwcm9jZXNzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHByb2Nlc3MoYWN0b3IsIHZhbHVlLCBrZXksIHRpbWVTaW5jZUxhc3RGcmFtZSkge1xuICAgICAgICAgICAgdmFyIHNpbXVsYXRlID0gdmFsdWUuc2ltdWxhdGUsXG4gICAgICAgICAgICAgICAgc2ltdWxhdGlvbiA9IHV0aWxzLmlzU3RyaW5nKHNpbXVsYXRlKSA/IHNpbXVsYXRpb25zW3NpbXVsYXRlXSA6IHNpbXVsYXRlLFxuICAgICAgICAgICAgICAgIG5ld1ZlbG9jaXR5ID0gc2ltdWxhdGlvbiA/IHNpbXVsYXRpb24odmFsdWUsIHRpbWVTaW5jZUxhc3RGcmFtZSwgdGhpcy5zdGFydGVkKSA6IDA7XG5cbiAgICAgICAgICAgIHZhbHVlLnZlbG9jaXR5ID0gTWF0aC5hYnMobmV3VmVsb2NpdHkpID49IHZhbHVlLnN0b3BTcGVlZCA/IG5ld1ZlbG9jaXR5IDogMDtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5jdXJyZW50ICsgY2FsYy5zcGVlZFBlckZyYW1lKHZhbHVlLnZlbG9jaXR5LCB0aW1lU2luY2VMYXN0RnJhbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLypcbiAgICAgICAgICAgIEhhcyB0aGlzIGFjdGlvbiBlbmRlZD9cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgVXNlIGEgZnJhbWVjb3VudGVyIHRvIHNlZSBpZiBBY3Rpb24gaGFzIGNoYW5nZWQgaW4gdGhlIGxhc3QgeCBmcmFtZXNcbiAgICAgICAgICAgIGFuZCBkZWNsYXJlIGVuZGVkIGlmIG5vdFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBAcGFyYW0gW0FjdG9yXVxuICAgICAgICAgICAgQHBhcmFtIFtib29sZWFuXTogSGFzIEFjdGlvbiBjaGFuZ2VkP1xuICAgICAgICAgICAgQHJldHVybiBbYm9vbGVhbl06IEhhcyBBY3Rpb24gZW5kZWQ/XG4gICAgICAgICovXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdoYXNFbmRlZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYXNFbmRlZChhY3RvciwgaGFzQ2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy5pbmFjdGl2ZUZyYW1lcyA9IGhhc0NoYW5nZWQgPyAwIDogdGhpcy5pbmFjdGl2ZUZyYW1lcyArIDE7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbmFjdGl2ZUZyYW1lcyA+IGFjdG9yLm1heEluYWN0aXZlRnJhbWVzO1xuICAgICAgICB9XG5cbiAgICAgICAgLypcbiAgICAgICAgICAgIExpbWl0IG91dHB1dCB0byB2YWx1ZSByYW5nZSwgaWYgYW55XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIElmIHZlbG9jaXR5IGlzIGF0IG9yIG1vcmUgdGhhbiByYW5nZSwgYW5kIHZhbHVlIGhhcyBhIGJvdW5jZSBwcm9wZXJ0eSxcbiAgICAgICAgICAgIHJ1biB0aGUgYm91bmNlIHNpbXVsYXRpb25cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBDYWxjdWxhdGVkIG91dHB1dFxuICAgICAgICAgICAgQHBhcmFtIFtWYWx1ZV06IEN1cnJlbnQgVmFsdWVcbiAgICAgICAgICAgIEByZXR1cm4gW251bWJlcl06IExpbWl0LWFkanVzdGVkIG91dHB1dFxuICAgICAgICAqL1xuICAgIH0sIHtcbiAgICAgICAga2V5OiAnbGltaXQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbGltaXQob3V0cHV0LCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIGlzT3V0c2lkZU1heCA9IG91dHB1dCA+PSB2YWx1ZS5tYXgsXG4gICAgICAgICAgICAgICAgaXNPdXRzaWRlTWluID0gb3V0cHV0IDw9IHZhbHVlLm1pbixcbiAgICAgICAgICAgICAgICBpc091dHNpZGVSYW5nZSA9IGlzT3V0c2lkZU1heCB8fCBpc091dHNpZGVNaW47XG5cbiAgICAgICAgICAgIGlmIChpc091dHNpZGVSYW5nZSkge1xuICAgICAgICAgICAgICAgIG91dHB1dCA9IGNhbGMucmVzdHJpY3RlZChvdXRwdXQsIHZhbHVlLm1pbiwgdmFsdWUubWF4KTtcblxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5ib3VuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUudmVsb2NpdHkgPSBzaW11bGF0aW9ucy5ib3VuY2UodmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUuY2FwdHVyZSkge1xuICAgICAgICAgICAgICAgICAgICBzaW11bGF0aW9ucy5jYXB0dXJlKHZhbHVlLCBpc091dHNpZGVNYXggPyB2YWx1ZS5tYXggOiB2YWx1ZS5taW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBTaW11bGF0ZTtcbn0pKEFjdGlvbik7XG5cbm1vZHVsZS5leHBvcnRzID0gU2ltdWxhdGU7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgQWN0aW9uID0gcmVxdWlyZSgnLi9BY3Rpb24nKSxcbiAgICBQb2ludGVyID0gcmVxdWlyZSgnLi4vaW5wdXQvUG9pbnRlcicpLFxuICAgIGNhbGMgPSByZXF1aXJlKCcuLi9pbmMvY2FsYycpO1xuXG52YXIgVHJhY2sgPSAoZnVuY3Rpb24gKF9BY3Rpb24pIHtcbiAgICBfaW5oZXJpdHMoVHJhY2ssIF9BY3Rpb24pO1xuXG4gICAgZnVuY3Rpb24gVHJhY2soKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBUcmFjayk7XG5cbiAgICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoVHJhY2sucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoVHJhY2ssIFt7XG4gICAgICAgIGtleTogJ29uRnJhbWVTdGFydCcsXG5cbiAgICAgICAgLypcbiAgICAgICAgICAgIFVwZGF0ZSBpbnB1dCBvZmZzZXRcbiAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uRnJhbWVTdGFydChhY3RvciwgZnJhbWVEdXJhdGlvbiwgZnJhbWVzdGFtcCkge1xuICAgICAgICAgICAgYWN0b3Iuc3RhdGUuaW5wdXQgPSB0aGlzLmlucHV0Lm9uRnJhbWUoZnJhbWVzdGFtcCk7XG4gICAgICAgICAgICB0aGlzLmlucHV0T2Zmc2V0ID0gY2FsYy5vZmZzZXQodGhpcy5pbnB1dE9yaWdpbiwgdGhpcy5pbnB1dC5jdXJyZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qXG4gICAgICAgICAgICBNb3ZlIFZhbHVlIHJlbGF0aXZlIHRvIElucHV0IG1vdmVtZW50XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIEBwYXJhbSBbVmFsdWVdOiBDdXJyZW50IHZhbHVlXG4gICAgICAgICAgICBAcGFyYW0gW3N0cmluZ106IEtleSBvZiBjdXJyZW50IHZhbHVlXG4gICAgICAgICAgICBAcmV0dXJuIFtudW1iZXJdOiBDYWxjdWxhdGVkIHZhbHVlXG4gICAgICAgICovXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdwcm9jZXNzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHByb2Nlc3MoYWN0b3IsIHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlucHV0T2Zmc2V0Lmhhc093blByb3BlcnR5KGtleSkgPyB2YWx1ZS5vcmlnaW4gKyB0aGlzLmlucHV0T2Zmc2V0W2tleV0gOiB2YWx1ZS5jdXJyZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgLypcbiAgICAgICAgICAgIEhhcyB0aGlzIEFjdGlvbiBlbmRlZD8gXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIEByZXR1cm4gW2Jvb2xlYW5dOiBGYWxzZSB0byBtYWtlIHVzZXIgbWFudWFsbHkgZmluaXNoIC50cmFjaygpXG4gICAgICAgICovXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdoYXNFbmRlZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYXNFbmRlZCgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnYmluZElucHV0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGJpbmRJbnB1dChpbnB1dCkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dCA9ICFpbnB1dC5jdXJyZW50ID8gbmV3IFBvaW50ZXIoaW5wdXQpIDogaW5wdXQ7XG4gICAgICAgICAgICB0aGlzLmlucHV0T3JpZ2luID0gdGhpcy5pbnB1dC5nZXQoKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0RGVmYXVsdFZhbHVlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYW1wOiAxXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIFRyYWNrO1xufSkoQWN0aW9uKTtcblxubW9kdWxlLmV4cG9ydHMgPSBUcmFjazsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBBY3Rpb24gPSByZXF1aXJlKCcuL0FjdGlvbicpLFxuICAgIGNhbGMgPSByZXF1aXJlKCcuLi9pbmMvY2FsYycpLFxuICAgIHV0aWxzID0gcmVxdWlyZSgnLi4vaW5jL3V0aWxzJyksXG4gICAgZWFjaCA9IHV0aWxzLmVhY2gsXG4gICAgcHJlc2V0RWFzaW5nID0gcmVxdWlyZSgnLi90d2Vlbi9wcmVzZXQtZWFzaW5nJyksXG4gICAgdmFsdWVPcHMgPSByZXF1aXJlKCcuLi9hY3Rvci92YWx1ZS1vcGVyYXRpb25zJyksXG4gICAgVHdlZW5Db250cm9scyA9IHJlcXVpcmUoJy4vdHdlZW4vVHdlZW5Db250cm9scycpLFxuICAgIG5leHRTdGVwcyA9IHtcbiAgICBsb29wOiAncmVzdGFydCcsXG4gICAgeW95bzogJ3JldmVyc2UnLFxuICAgIGZsaXA6ICdmbGlwVmFsdWVzJ1xufSxcblxuLypcbiAgICBFYXNlIHZhbHVlIHdpdGhpbiByYW5nZWQgcGFyYW1ldGVyc1xuICAgIFxuICAgIEBwYXJhbSBbbnVtYmVyXTogUHJvZ3Jlc3MgYmV0d2VlbiAwIGFuZCAxXG4gICAgQHBhcmFtIFtudW1iZXJdOiBWYWx1ZSBvZiAwIHByb2dyZXNzXG4gICAgQHBhcmFtIFtudW1iZXJdOiBWYWx1ZSBvZiAxIHByb2dyZXNzXG4gICAgQHBhcmFtIFtzdHJpbmcgfHwgZnVuY3Rpb25dOiBOYW1lIG9mIHByZXNldCBlYXNpbmdcbiAgICAgICAgdG8gdXNlIG9yIGdlbmVyYXRlZCBlYXNpbmcgZnVuY3Rpb25cbiAgICBAcmV0dXJuIFtudW1iZXJdOiBWYWx1ZSBvZiBlYXNlZCBwcm9ncmVzcyBpbiByYW5nZVxuKi9cbmVhc2UgPSBmdW5jdGlvbiBlYXNlKHByb2dyZXNzLCBmcm9tLCB0bywgX2Vhc2UpIHtcbiAgICB2YXIgcHJvZ3Jlc3NMaW1pdGVkID0gY2FsYy5yZXN0cmljdGVkKHByb2dyZXNzLCAwLCAxKSxcbiAgICAgICAgZWFzaW5nRnVuY3Rpb24gPSB1dGlscy5pc1N0cmluZyhfZWFzZSkgPyBwcmVzZXRFYXNpbmdbX2Vhc2VdIDogX2Vhc2U7XG5cbiAgICByZXR1cm4gY2FsYy52YWx1ZUVhc2VkKHByb2dyZXNzTGltaXRlZCwgZnJvbSwgdG8sIGVhc2luZ0Z1bmN0aW9uKTtcbn07XG5cbnZhciBDT1VOVCA9ICdjb3VudCc7XG5cbnZhciBUd2VlbiA9IChmdW5jdGlvbiAoX0FjdGlvbikge1xuICAgIF9pbmhlcml0cyhUd2VlbiwgX0FjdGlvbik7XG5cbiAgICBmdW5jdGlvbiBUd2VlbigpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFR3ZWVuKTtcblxuICAgICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihUd2Vlbi5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhUd2VlbiwgW3tcbiAgICAgICAga2V5OiAnZ2V0Q29udHJvbHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q29udHJvbHMoKSB7XG4gICAgICAgICAgICByZXR1cm4gVHdlZW5Db250cm9scztcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0RGVmYXVsdFByb3BzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZGVsYXk6IDAsXG4gICAgICAgICAgICAgICAgZGlsYXRlOiAxLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICAgICAgICAgICAgbG9vcDogZmFsc2UsXG4gICAgICAgICAgICAgICAgeW95bzogZmFsc2UsXG4gICAgICAgICAgICAgICAgZmxpcDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcGxheURpcmVjdGlvbjogMSxcbiAgICAgICAgICAgICAgICBlbmRlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbGFwc2VkOiAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXREZWZhdWx0VmFsdWUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbHVlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBkZWxheTogMCxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgICAgICAgICAgIGVhc2U6ICdlYXNlT3V0JyxcbiAgICAgICAgICAgICAgICBzdGFnZ2VyOiAwLFxuICAgICAgICAgICAgICAgIHN0ZXBzOiAwLFxuICAgICAgICAgICAgICAgIHRvOiAwLFxuICAgICAgICAgICAgICAgIHJvdW5kOiBmYWxzZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0RGVmYXVsdFZhbHVlUHJvcCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXREZWZhdWx0VmFsdWVQcm9wKCkge1xuICAgICAgICAgICAgcmV0dXJuICd0byc7XG4gICAgICAgIH1cblxuICAgICAgICAvKlxuICAgICAgICAgICAgVXBkYXRlIEFjdGlvbiBlbGFwc2VkIHRpbWVcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgQHBhcmFtIFtvYmplY3RdOiBBY3Rpb24gcHJvcGVydGllc1xuICAgICAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBUaW1lc3RhbXAgb2YgY3VycmVudCBmcmFtZVxuICAgICAgICAqL1xuICAgIH0sIHtcbiAgICAgICAga2V5OiAnb25GcmFtZVN0YXJ0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uRnJhbWVTdGFydChhY3RvciwgZnJhbWVEdXJhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5lbGFwc2VkID0gdGhpcy5lbGFwc2VkIHx8IDA7XG5cbiAgICAgICAgICAgIGlmIChmcmFtZUR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGFwc2VkICs9IGZyYW1lRHVyYXRpb24gKiBhY3Rvci5kaWxhdGUgKiB0aGlzLnBsYXlEaXJlY3Rpb247XG4gICAgICAgICAgICAgICAgdGhpcy5lbmRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKlxuICAgICAgICAgICAgQ2FsY3VsYXRlIHByb2dyZXNzIG9mIHZhbHVlIGJhc2VkIG9uIHRpbWUgZWxhcHNlZCxcbiAgICAgICAgICAgIHZhbHVlIGRlbGF5L2R1cmF0aW9uL3N0YWdnZXIgcHJvcGVydGllc1xuICAgICAgICAgICAgIEBwYXJhbSBbQWN0b3JdXG4gICAgICAgICAgICBAcGFyYW0gW29iamVjdF06IFZhbHVlIHN0YXRlIGFuZCBwcm9wZXJ0aWVzXG4gICAgICAgICAgICBAcmV0dXJuIFtudW1iZXJdOiBDYWxjdWxhdGVkIHZhbHVlXG4gICAgICAgICovXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdwcm9jZXNzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHByb2Nlc3MoYWN0b3IsIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gdmFsdWUudG8sXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NUYXJnZXQgPSB0aGlzLnBsYXlEaXJlY3Rpb24gPT09IDEgPyAxIDogMCxcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IHZhbHVlLmN1cnJlbnQsXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3M7XG5cbiAgICAgICAgICAgIC8vIElmIHRoaXMgdmFsdWUgaGFzIGEgdG8gcHJvcGVydHksIG90aGVyd2lzZSB3ZSBqdXN0IHJldHVybiBjdXJyZW50IHZhbHVlXG4gICAgICAgICAgICBpZiAodGFyZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzcyA9IGNhbGMucmVzdHJpY3RlZChjYWxjLnByb2dyZXNzKHRoaXMuZWxhcHNlZCAtIHZhbHVlLmRlbGF5LCB2YWx1ZS5kdXJhdGlvbikgLSB2YWx1ZS5zdGFnZ2VyLCAwLCAxKTtcblxuICAgICAgICAgICAgICAgIC8vIE1hcmsgQWN0aW9uIGFzIE5PVCBlbmRlZCBpZiBzdGlsbCBpbiBwcm9ncmVzc1xuICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzcyAhPT0gcHJvZ3Jlc3NUYXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFN0ZXAgcHJvZ3Jlc3MgaWYgd2UncmUgc3RlcHBpbmdcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUuc3RlcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3MgPSB1dGlscy5zdGVwUHJvZ3Jlc3MocHJvZ3Jlc3MsIHZhbHVlLnN0ZXBzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBFYXNlIHZhbHVlXG4gICAgICAgICAgICAgICAgbmV3VmFsdWUgPSBlYXNlKHByb2dyZXNzLCB2YWx1ZS5vcmlnaW4sIHRhcmdldCwgdmFsdWUuZWFzZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBuZXdWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qXG4gICAgICAgICAgICBJZiB0aGlzIHR3ZWVuIGhhcyBlbmRlZCwgY2hlY2sgaWYgd2UgbG9vcC95b3lvL2ZsaXBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgQHJldHVybiBbYm9vbGVhbl06IEhhcyB0aGlzIHR3ZWVuIHJlYWxseSByZWFsbHkgZW5kZWQ/XG4gICAgICAgICovXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdoYXNFbmRlZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYXNFbmRlZChhY3Rvcikge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKHRoaXMuZW5kZWQpIHtcbiAgICAgICAgICAgICAgICBlYWNoKG5leHRTdGVwcywgZnVuY3Rpb24gKG5hbWUsIG1ldGhvZE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmNoZWNrTmV4dFN0ZXAoYWN0b3IsIG5hbWUsIF90aGlzW21ldGhvZE5hbWVdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZW5kZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdG9yLmhhc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVuZGVkO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjaGVja05leHRTdGVwJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNoZWNrTmV4dFN0ZXAoYWN0b3IsIG5hbWUsIG1ldGhvZCkge1xuICAgICAgICAgICAgdmFyIHN0ZXBUYWtlbiA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN0ZXAgPSB0aGlzW25hbWVdLFxuICAgICAgICAgICAgICAgIGNvdW50ID0gdGhpc1tuYW1lICsgQ09VTlRdIHx8IDAsXG4gICAgICAgICAgICAgICAgZm9yZXZlciA9IHN0ZXAgPT09IHRydWU7XG5cbiAgICAgICAgICAgIGlmIChmb3JldmVyIHx8IHV0aWxzLmlzTnVtKHN0ZXApKSB7XG4gICAgICAgICAgICAgICAgKytjb3VudDtcbiAgICAgICAgICAgICAgICB0aGlzW25hbWUgKyBDT1VOVF0gPSBjb3VudDtcblxuICAgICAgICAgICAgICAgIGlmIChmb3JldmVyIHx8IGNvdW50IDw9IHN0ZXApIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLmNhbGwodGhpcywgYWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICBzdGVwVGFrZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHN0ZXBUYWtlbjtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZmxpcFZhbHVlcycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBmbGlwVmFsdWVzKGFjdG9yKSB7XG4gICAgICAgICAgICB2YXIgYWN0b3JWYWx1ZXMgPSBhY3Rvci52YWx1ZXM7XG4gICAgICAgICAgICB0aGlzLmVsYXBzZWQgPSB0aGlzLmR1cmF0aW9uIC0gdGhpcy5lbGFwc2VkO1xuXG4gICAgICAgICAgICBlYWNoKHRoaXMudmFsdWVzLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gYWN0b3JWYWx1ZXNba2V5XTtcblxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBlYWNoKHZhbHVlLmNoaWxkcmVuLCBmdW5jdGlvbiAoY2hpbGRLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlT3BzLmZsaXAoYWN0b3JWYWx1ZXNba2V5ICsgY2hpbGRLZXldKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFsdWVPcHMuZmxpcCh2YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmV2ZXJzZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZXZlcnNlKCkge1xuICAgICAgICAgICAgdGhpcy5wbGF5RGlyZWN0aW9uICo9IC0xO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZXN0YXJ0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlc3RhcnQoKSB7XG4gICAgICAgICAgICB0aGlzLmVsYXBzZWQgPSB0aGlzLnBsYXlEaXJlY3Rpb24gPT09IDEgPyAwIDogdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IHV0aWxzLmN1cnJlbnRUaW1lKCk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gVHdlZW47XG59KShBY3Rpb24pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFR3ZWVuOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIEFjdGlvbiA9IHJlcXVpcmUoJy4vQWN0aW9uJyksXG4gICAgY2FsYyA9IHJlcXVpcmUoJy4uL2luYy9jYWxjJyksXG4gICAgU1RSSU5HID0gJ3N0cmluZycsXG5cbi8qXG4gICAgVHJhbnNsYXRlIG91ciBtYXBMaW5rIHZhbHVlIGludG8gbWFwVG9cbiAgICBcbiAgICBAcGFyYW0gW251bWJlcl06IENhbGN1bGF0ZWQgdmFsdWUgZnJvbSBsaW5rZWQgdmFsdWVcbiAgICBAcGFyYW0gW1ZhbHVlIHx8IG9iamVjdF06IExpbmtlZCB2YWx1ZSBvciBlbXB0eSBvYmplY3QgaWYgd2UncmUgbGlua2luZyB0byBpbnB1dFxuICAgIEBwYXJhbSBbYXJyYXldOiBMaXN0IG9mIG51bWJlcnMgcmVsYXRpbmcgdG8gbGlua2VkIHZhbHVlXG4gICAgQHBhcmFtIFthcnJheV06IExpc3Qgb2YgbnVtYmVycyByZWxhdGluZyB0byB0aGlzIHZhbHVlXG4qL1xuZmluZE1hcHBlZFZhbHVlID0gZnVuY3Rpb24gZmluZE1hcHBlZFZhbHVlKG5ld1ZhbHVlLCBsaW5rZWRWYWx1ZSwgdG9WYWx1ZSwgbWFwTGluaywgbWFwVG8pIHtcbiAgICB2YXIgbWFwTGVuZ3RoID0gbWFwTGluay5sZW5ndGgsXG4gICAgICAgIGkgPSAxLFxuICAgICAgICBsYXN0TGlua1ZhbHVlLFxuICAgICAgICB0aGlzTGlua1ZhbHVlLFxuICAgICAgICBsYXN0VG9WYWx1ZSxcbiAgICAgICAgdGhpc1RvVmFsdWU7XG5cbiAgICBmb3IgKDsgaSA8IG1hcExlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIEFzc2lnbiB2YWx1ZXMgZnJvbSBhcnJheSwgb3IgaWYgdGhleSdyZSBzdHJpbmdzLCBsb29rIGZvciB0aGVtIGluIGxpbmtlZFZhbHVlXG4gICAgICAgIGxhc3RMaW5rVmFsdWUgPSB0eXBlb2YgbWFwTGlua1tpIC0gMV0gPT09IFNUUklORyA/IGxpbmtlZFZhbHVlW21hcExpbmtbaSAtIDFdXSA6IG1hcExpbmtbaSAtIDFdO1xuICAgICAgICB0aGlzTGlua1ZhbHVlID0gdHlwZW9mIG1hcExpbmtbaV0gPT09IFNUUklORyA/IGxpbmtlZFZhbHVlW21hcExpbmtbaV1dIDogbWFwTGlua1tpXTtcbiAgICAgICAgbGFzdFRvVmFsdWUgPSB0eXBlb2YgbWFwVG9baSAtIDFdID09PSBTVFJJTkcgPyB0b1ZhbHVlW21hcFRvW2kgLSAxXV0gOiBtYXBUb1tpIC0gMV07XG4gICAgICAgIHRoaXNUb1ZhbHVlID0gdHlwZW9mIG1hcFRvW2ldID09PSBTVFJJTkcgPyB0b1ZhbHVlW21hcFRvW2ldXSA6IG1hcFRvW2ldO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHdlJ3ZlIGdvbmUgcGFzdCBvdXIgY2FsY3VsYXRlZCB2YWx1ZSwgb3IgaWYgd2UncmUgYXQgdGhlIGVuZCBvZiB0aGUgYXJyYXlcbiAgICAgICAgaWYgKG5ld1ZhbHVlIDwgdGhpc0xpbmtWYWx1ZSB8fCBpID09PSBtYXBMZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IGNhbGMudmFsdWUoY2FsYy5yZXN0cmljdGVkKGNhbGMucHJvZ3Jlc3MobmV3VmFsdWUsIGxhc3RMaW5rVmFsdWUsIHRoaXNMaW5rVmFsdWUpLCAwLCAxKSwgbGFzdFRvVmFsdWUsIHRoaXNUb1ZhbHVlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1ZhbHVlO1xufTtcblxudmFyIFdhdGNoID0gKGZ1bmN0aW9uIChfQWN0aW9uKSB7XG4gICAgX2luaGVyaXRzKFdhdGNoLCBfQWN0aW9uKTtcblxuICAgIGZ1bmN0aW9uIFdhdGNoKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgV2F0Y2gpO1xuXG4gICAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoV2F0Y2gucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qXG4gICAgICAgIFByb2Nlc3MgdGhpcyB2YWx1ZVxuICAgICAgICBcbiAgICAgICAgRmlyc3QgY2hlY2sgaWYgdGhpcyB2YWx1ZSBleGlzdHMgYXMgYSBWYWx1ZSwgaWYgbm90XG4gICAgICAgIGNoZWNrIHdpdGhpbiBJbnB1dCAoaWYgd2UgaGF2ZSBvbmUpXG4gICAgICAgICAgICBcbiAgICAgICAgQHBhcmFtIFtBY3Rvcl1cbiAgICAgICAgQHBhcmFtIFtWYWx1ZV06IEN1cnJlbnQgdmFsdWVcbiAgICAgICAgQHBhcmFtIFtzdHJpbmddOiBLZXkgb2YgY3VycmVudCB2YWx1ZVxuICAgICAgICBAcmV0dXJuIFtudW1iZXJdOiBDYWxjdWxhdGVkIHZhbHVlXG4gICAgKi9cblxuICAgIF9jcmVhdGVDbGFzcyhXYXRjaCwgW3tcbiAgICAgICAga2V5OiAncHJvY2VzcycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBwcm9jZXNzKGFjdG9yLCB2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICB2YXIgdmFsdWVzID0gYWN0b3IudmFsdWVzLFxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gdmFsdWUuY3VycmVudCxcbiAgICAgICAgICAgICAgICB3YXRjaGVkS2V5ID0gdmFsdWUud2F0Y2gsXG4gICAgICAgICAgICAgICAgd2F0Y2hlZFZhbHVlID0gdmFsdWVzW3dhdGNoZWRLZXldID8gdmFsdWVzW3dhdGNoZWRLZXldIDoge30sXG4gICAgICAgICAgICAgICAgaW5wdXRPZmZzZXQgPSB2YWx1ZS5hY3Rpb24gPyB2YWx1ZS5hY3Rpb24uaW5wdXRPZmZzZXQgOiBmYWxzZTtcblxuICAgICAgICAgICAgLy8gRmlyc3QgbG9vayBhdCBBY3Rpb24gYW5kIGNoZWNrIHZhbHVlIGlzbid0IGxpbmtpbmcgaXRzZWxmXG4gICAgICAgICAgICBpZiAod2F0Y2hlZFZhbHVlLmN1cnJlbnQgIT09IHVuZGVmaW5lZCAmJiBrZXkgIT09IHdhdGNoZWRLZXkpIHtcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IHdhdGNoZWRWYWx1ZS5jdXJyZW50O1xuXG4gICAgICAgICAgICAgICAgLy8gVGhlbiBjaGVjayB2YWx1ZXMgaW4gSW5wdXRcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5wdXRPZmZzZXQgJiYgaW5wdXRPZmZzZXQuaGFzT3duUHJvcGVydHkod2F0Y2hlZEtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWUgPSB2YWx1ZS5vcmlnaW4gKyBpbnB1dE9mZnNldFt3YXRjaGVkS2V5XSAqIHZhbHVlLmFtcDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIElmIHdlIGhhdmUgbWFwRnJvbSBhbmQgbWFwVG8gcHJvcGVydGllcywgdHJhbnNsYXRlIHRoZSBuZXcgdmFsdWVcbiAgICAgICAgICAgIGlmICh2YWx1ZS5tYXBGcm9tICYmIHZhbHVlLm1hcFRvKSB7XG4gICAgICAgICAgICAgICAgbmV3VmFsdWUgPSBmaW5kTWFwcGVkVmFsdWUobmV3VmFsdWUsIHdhdGNoZWRWYWx1ZSwgdmFsdWUsIHZhbHVlLm1hcEZyb20sIHZhbHVlLm1hcFRvKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIFdhdGNoO1xufSkoQWN0aW9uKTtcblxubW9kdWxlLmV4cG9ydHMgPSBXYXRjaDsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGNhbGMgPSByZXF1aXJlKCcuLi8uLi9pbmMvY2FsYycpLFxuICAgIHV0aWxzID0gcmVxdWlyZSgnLi4vLi4vaW5jL3V0aWxzJyksXG4gICAgc3BlZWRQZXJGcmFtZSA9IGNhbGMuc3BlZWRQZXJGcmFtZTtcblxuLypcbiAgICBBZGQgY29yZSBwaHlzaWNzIHNpbXVsYXRpb25zXG4qL1xudmFyIHNpbXVsYXRpb25zID0ge1xuICAgIC8qXG4gICAgICAgIFZlbG9jaXR5XG4gICAgICAgIFxuICAgICAgICBUaGUgZGVmYXVsdCAucnVuKCkgc2ltdWxhdGlvbi5cbiAgICAgICAgXG4gICAgICAgIEFwcGxpZXMgYW55IHNldCBkZWNlbGVyYXRpb24gYW5kIGFjY2VsZXJhdGlvbiB0byBleGlzdGluZyB2ZWxvY2l0eVxuICAgICovXG4gICAgdmVsb2NpdHk6IGZ1bmN0aW9uIHZlbG9jaXR5KHZhbHVlLCBkdXJhdGlvbikge1xuICAgICAgICB2YWx1ZS52ZWxvY2l0eSA9IHZhbHVlLnZlbG9jaXR5IC0gc3BlZWRQZXJGcmFtZSh2YWx1ZS5kZWNlbGVyYXRpb24sIGR1cmF0aW9uKSArIHNwZWVkUGVyRnJhbWUodmFsdWUuYWNjZWxlcmF0aW9uLCBkdXJhdGlvbik7XG5cbiAgICAgICAgcmV0dXJuIHNpbXVsYXRpb25zLmZyaWN0aW9uKHZhbHVlLCBkdXJhdGlvbik7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIEdsaWRlXG4gICAgICAgIFxuICAgICAgICBFbXVsYXRlcyB0b3VjaCBkZXZpY2Ugc2Nyb2xsaW5nIGVmZmVjdHMgd2l0aCBleHBvbmVudGlhbCBkZWNheVxuICAgICAgICBodHRwOi8vYXJpeWEub2ZpbGFicy5jb20vMjAxMy8xMS9qYXZhc2NyaXB0LWtpbmV0aWMtc2Nyb2xsaW5nLXBhcnQtMi5odG1sXG4gICAgKi9cbiAgICBnbGlkZTogZnVuY3Rpb24gZ2xpZGUodmFsdWUsIGR1cmF0aW9uLCBzdGFydGVkKSB7XG4gICAgICAgIHZhciB0aW1lVW50aWxGaW5pc2hlZCA9IC11dGlscy5jdXJyZW50VGltZSgpIC0gc3RhcnRlZCxcbiAgICAgICAgICAgIGRlbHRhID0gLXZhbHVlLnRvICogTWF0aC5leHAodGltZVVudGlsRmluaXNoZWQgLyB2YWx1ZS50aW1lQ29uc3RhbnQpO1xuXG4gICAgICAgIHJldHVybiB2YWx1ZS50byArIGRlbHRhIC0gdmFsdWUuY3VycmVudDtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgRnJpY3Rpb25cbiAgICAgICAgIEFwcGx5IGZyaWN0aW9uIHRvIHRoZSBjdXJyZW50IHZhbHVlXG4gICAgICAgIFRPRE86IE1ha2UgdGhpcyBmcmFtZXJhdGUtaW5kZXBlbmRlbnRcbiAgICAqL1xuICAgIGZyaWN0aW9uOiBmdW5jdGlvbiBmcmljdGlvbih2YWx1ZSwgZHVyYXRpb24pIHtcbiAgICAgICAgdmFyIG5ld1ZlbG9jaXR5ID0gc3BlZWRQZXJGcmFtZSh2YWx1ZS52ZWxvY2l0eSwgZHVyYXRpb24pICogKDEgLSB2YWx1ZS5mcmljdGlvbik7XG5cbiAgICAgICAgcmV0dXJuIGNhbGMuc3BlZWRQZXJTZWNvbmQobmV3VmVsb2NpdHksIGR1cmF0aW9uKTtcbiAgICB9LFxuXG4gICAgc3ByaW5nOiBmdW5jdGlvbiBzcHJpbmcodmFsdWUsIGR1cmF0aW9uKSB7XG4gICAgICAgIHZhciBkaXN0YW5jZSA9IHZhbHVlLnRvIC0gdmFsdWUuY3VycmVudDtcblxuICAgICAgICB2YWx1ZS52ZWxvY2l0eSArPSBkaXN0YW5jZSAqIHNwZWVkUGVyRnJhbWUodmFsdWUuc3ByaW5nLCBkdXJhdGlvbik7XG5cbiAgICAgICAgcmV0dXJuIHNpbXVsYXRpb25zLmZyaWN0aW9uKHZhbHVlLCBkdXJhdGlvbik7XG4gICAgfSxcblxuICAgIGJvdW5jZTogZnVuY3Rpb24gYm91bmNlKHZhbHVlKSB7XG4gICAgICAgIHZhciBkaXN0YW5jZSA9IDAsXG4gICAgICAgICAgICB0byA9IHZhbHVlLnRvLFxuICAgICAgICAgICAgY3VycmVudCA9IHZhbHVlLmN1cnJlbnQsXG4gICAgICAgICAgICBib3VuY2UgPSB2YWx1ZS5ib3VuY2U7XG5cbiAgICAgICAgLy8gSWYgd2UncmUgdXNpbmcgZ2xpZGUgc2ltdWxhdGlvbiB3ZSBoYXZlIHRvIGZsaXAgb3VyIHRhcmdldCB0b29cbiAgICAgICAgaWYgKHZhbHVlLnNpbXVsYXRlID09PSAnZ2xpZGUnKSB7XG4gICAgICAgICAgICBkaXN0YW5jZSA9IHRvIC0gY3VycmVudDtcbiAgICAgICAgICAgIHZhbHVlLnRvID0gY3VycmVudCAtIGRpc3RhbmNlICogYm91bmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlLnZlbG9jaXR5ICo9IC1ib3VuY2U7XG4gICAgfSxcblxuICAgIGNhcHR1cmU6IGZ1bmN0aW9uIGNhcHR1cmUodmFsdWUsIHRhcmdldCkge1xuICAgICAgICB2YWx1ZS50byA9IHRhcmdldDtcbiAgICAgICAgdmFsdWUuc2ltdWxhdGUgPSAnc3ByaW5nJztcbiAgICAgICAgdmFsdWUuY2FwdHVyZSA9IHZhbHVlLm1pbiA9IHZhbHVlLm1heCA9IHVuZGVmaW5lZDtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNpbXVsYXRpb25zOyIsIi8qXG4gICAgQmV6aWVyIGZ1bmN0aW9uIGdlbmVyYXRvclxuICAgICAgICBcbiAgICBHYcOrdGFuIFJlbmF1ZGVhdSdzIEJlemllckVhc2luZ1xuICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9ncmUvYmV6aWVyLWVhc2luZy9ibG9iL21hc3Rlci9pbmRleC5qcyAgXG4gICAgaHR0cHM6Ly9naXRodWIuY29tL2dyZS9iZXppZXItZWFzaW5nL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAgICBZb3UncmUgYSBoZXJvXG4gICAgXG4gICAgVXNlXG4gICAgXG4gICAgICAgIHZhciBlYXNlT3V0ID0gbmV3IEJlemllciguMTcsLjY3LC44MywuNjcpLFxuICAgICAgICAgICAgeCA9IGVhc2VPdXQoMC41KTsgLy8gcmV0dXJucyAwLjYyNy4uLlxuKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIgTkVXVE9OX0lURVJBVElPTlMgPSA4LFxuICAgIE5FV1RPTl9NSU5fU0xPUEUgPSAwLjAwMSxcbiAgICBTVUJESVZJU0lPTl9QUkVDSVNJT04gPSAwLjAwMDAwMDEsXG4gICAgU1VCRElWSVNJT05fTUFYX0lURVJBVElPTlMgPSAxMCxcbiAgICBLX1NQTElORV9UQUJMRV9TSVpFID0gMTEsXG4gICAgS19TQU1QTEVfU1RFUF9TSVpFID0gMS4wIC8gKEtfU1BMSU5FX1RBQkxFX1NJWkUgLSAxLjApLFxuICAgIEZMT0FUXzMyX1NVUFBPUlRFRCA9IHR5cGVvZiBGbG9hdDMyQXJyYXkgIT09ICd1bmRlZmluZWQnLFxuICAgIGEgPSBmdW5jdGlvbiBhKGExLCBhMikge1xuICAgIHJldHVybiAxLjAgLSAzLjAgKiBhMiArIDMuMCAqIGExO1xufSxcbiAgICBiID0gZnVuY3Rpb24gYihhMSwgYTIpIHtcbiAgICByZXR1cm4gMy4wICogYTIgLSA2LjAgKiBhMTtcbn0sXG4gICAgYyA9IGZ1bmN0aW9uIGMoYTEpIHtcbiAgICByZXR1cm4gMy4wICogYTE7XG59LFxuICAgIGdldFNsb3BlID0gZnVuY3Rpb24gZ2V0U2xvcGUodCwgYTEsIGEyKSB7XG4gICAgcmV0dXJuIDMuMCAqIGEoYTEsIGEyKSAqIHQgKiB0ICsgMi4wICogYihhMSwgYTIpICogdCArIGMoYTEpO1xufSxcbiAgICBjYWxjQmV6aWVyID0gZnVuY3Rpb24gY2FsY0Jlemllcih0LCBhMSwgYTIpIHtcbiAgICByZXR1cm4gKChhKGExLCBhMikgKiB0ICsgYihhMSwgYTIpKSAqIHQgKyBjKGExKSkgKiB0O1xufSxcblxuLypcbiAgICBCZXppZXIgY29uc3RydWN0b3JcbiovXG5CZXppZXIgPSBmdW5jdGlvbiBCZXppZXIobVgxLCBtWTEsIG1YMiwgbVkyKSB7XG4gICAgdmFyIHNhbXBsZVZhbHVlcyA9IEZMT0FUXzMyX1NVUFBPUlRFRCA/IG5ldyBGbG9hdDMyQXJyYXkoS19TUExJTkVfVEFCTEVfU0laRSkgOiBuZXcgQXJyYXkoS19TUExJTkVfVEFCTEVfU0laRSksXG4gICAgICAgIF9wcmVjb21wdXRlZCA9IGZhbHNlLFxuICAgICAgICBiaW5hcnlTdWJkaXZpZGUgPSBmdW5jdGlvbiBiaW5hcnlTdWJkaXZpZGUoYVgsIGFBLCBhQikge1xuICAgICAgICB2YXIgY3VycmVudFgsXG4gICAgICAgICAgICBjdXJyZW50VCxcbiAgICAgICAgICAgIGkgPSAwO1xuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGN1cnJlbnRUID0gYUEgKyAoYUIgLSBhQSkgLyAyLjA7XG4gICAgICAgICAgICBjdXJyZW50WCA9IGNhbGNCZXppZXIoY3VycmVudFQsIG1YMSwgbVgyKSAtIGFYO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRYID4gMC4wKSB7XG4gICAgICAgICAgICAgICAgYUIgPSBjdXJyZW50VDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYUEgPSBjdXJyZW50VDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoTWF0aC5hYnMoY3VycmVudFgpID4gU1VCRElWSVNJT05fUFJFQ0lTSU9OICYmICsraSA8IFNVQkRJVklTSU9OX01BWF9JVEVSQVRJT05TKTtcblxuICAgICAgICByZXR1cm4gY3VycmVudFQ7XG4gICAgfSxcbiAgICAgICAgbmV3dG9uUmFwaHNvbkl0ZXJhdGUgPSBmdW5jdGlvbiBuZXd0b25SYXBoc29uSXRlcmF0ZShhWCwgYUd1ZXNzVCkge1xuICAgICAgICB2YXIgaSA9IDAsXG4gICAgICAgICAgICBjdXJyZW50U2xvcGUgPSAwLjAsXG4gICAgICAgICAgICBjdXJyZW50WDtcblxuICAgICAgICBmb3IgKDsgaSA8IE5FV1RPTl9JVEVSQVRJT05TOyArK2kpIHtcbiAgICAgICAgICAgIGN1cnJlbnRTbG9wZSA9IGdldFNsb3BlKGFHdWVzc1QsIG1YMSwgbVgyKTtcblxuICAgICAgICAgICAgaWYgKGN1cnJlbnRTbG9wZSA9PT0gMC4wKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFHdWVzc1Q7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnJlbnRYID0gY2FsY0JlemllcihhR3Vlc3NULCBtWDEsIG1YMikgLSBhWDtcbiAgICAgICAgICAgIGFHdWVzc1QgLT0gY3VycmVudFggLyBjdXJyZW50U2xvcGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYUd1ZXNzVDtcbiAgICB9LFxuICAgICAgICBjYWxjU2FtcGxlVmFsdWVzID0gZnVuY3Rpb24gY2FsY1NhbXBsZVZhbHVlcygpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBLX1NQTElORV9UQUJMRV9TSVpFOyArK2kpIHtcbiAgICAgICAgICAgIHNhbXBsZVZhbHVlc1tpXSA9IGNhbGNCZXppZXIoaSAqIEtfU0FNUExFX1NURVBfU0laRSwgbVgxLCBtWDIpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAgICAgZ2V0VEZvclggPSBmdW5jdGlvbiBnZXRURm9yWChhWCkge1xuICAgICAgICB2YXIgaW50ZXJ2YWxTdGFydCA9IDAuMCxcbiAgICAgICAgICAgIGN1cnJlbnRTYW1wbGUgPSAxLFxuICAgICAgICAgICAgbGFzdFNhbXBsZSA9IEtfU1BMSU5FX1RBQkxFX1NJWkUgLSAxLFxuICAgICAgICAgICAgZGlzdCA9IDAuMCxcbiAgICAgICAgICAgIGd1ZXNzRm9yVCA9IDAuMCxcbiAgICAgICAgICAgIGluaXRpYWxTbG9wZSA9IDAuMDtcblxuICAgICAgICBmb3IgKDsgY3VycmVudFNhbXBsZSAhPSBsYXN0U2FtcGxlICYmIHNhbXBsZVZhbHVlc1tjdXJyZW50U2FtcGxlXSA8PSBhWDsgKytjdXJyZW50U2FtcGxlKSB7XG4gICAgICAgICAgICBpbnRlcnZhbFN0YXJ0ICs9IEtfU0FNUExFX1NURVBfU0laRTtcbiAgICAgICAgfVxuXG4gICAgICAgIC0tY3VycmVudFNhbXBsZTtcblxuICAgICAgICBkaXN0ID0gKGFYIC0gc2FtcGxlVmFsdWVzW2N1cnJlbnRTYW1wbGVdKSAvIChzYW1wbGVWYWx1ZXNbY3VycmVudFNhbXBsZSArIDFdIC0gc2FtcGxlVmFsdWVzW2N1cnJlbnRTYW1wbGVdKTtcbiAgICAgICAgZ3Vlc3NGb3JUID0gaW50ZXJ2YWxTdGFydCArIGRpc3QgKiBLX1NBTVBMRV9TVEVQX1NJWkU7XG5cbiAgICAgICAgaW5pdGlhbFNsb3BlID0gZ2V0U2xvcGUoZ3Vlc3NGb3JULCBtWDEsIG1YMik7XG5cbiAgICAgICAgLy8gSWYgc2xvcGUgaXMgZ3JlYXRlciB0aGFuIG1pblxuICAgICAgICBpZiAoaW5pdGlhbFNsb3BlID49IE5FV1RPTl9NSU5fU0xPUEUpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXd0b25SYXBoc29uSXRlcmF0ZShhWCwgZ3Vlc3NGb3JUKTtcbiAgICAgICAgICAgIC8vIFNsb3BlIGlzIGVxdWFsIHRvIG1pblxuICAgICAgICB9IGVsc2UgaWYgKGluaXRpYWxTbG9wZSA9PT0gMC4wKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGd1ZXNzRm9yVDtcbiAgICAgICAgICAgICAgICAvLyBTbG9wZSBpcyBsZXNzIHRoYW4gbWluXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmluYXJ5U3ViZGl2aWRlKGFYLCBpbnRlcnZhbFN0YXJ0LCBpbnRlcnZhbFN0YXJ0ICsgS19TQU1QTEVfU1RFUF9TSVpFKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgfSxcbiAgICAgICAgcHJlY29tcHV0ZSA9IGZ1bmN0aW9uIHByZWNvbXB1dGUoKSB7XG4gICAgICAgIF9wcmVjb21wdXRlZCA9IHRydWU7XG4gICAgICAgIGlmIChtWDEgIT0gbVkxIHx8IG1YMiAhPSBtWTIpIHtcbiAgICAgICAgICAgIGNhbGNTYW1wbGVWYWx1ZXMoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKlxuICAgICAgICBHZW5lcmF0ZWQgZnVuY3Rpb25cbiAgICAgICAgXG4gICAgICAgIFJldHVybnMgdmFsdWUgMC0xIGJhc2VkIG9uIFhcbiAgICAqL1xuICAgIGYgPSBmdW5jdGlvbiBmKGFYKSB7XG4gICAgICAgIHZhciByZXR1cm5WYWx1ZTtcblxuICAgICAgICBpZiAoIV9wcmVjb21wdXRlZCkge1xuICAgICAgICAgICAgcHJlY29tcHV0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgbGluZWFyIGdyYWRpZW50LCByZXR1cm4gWCBhcyBUXG4gICAgICAgIGlmIChtWDEgPT09IG1ZMSAmJiBtWDIgPT09IG1ZMikge1xuICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBhWDtcblxuICAgICAgICAgICAgLy8gSWYgYXQgc3RhcnQsIHJldHVybiAwXG4gICAgICAgIH0gZWxzZSBpZiAoYVggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IDA7XG5cbiAgICAgICAgICAgICAgICAvLyBJZiBhdCBlbmQsIHJldHVybiAxXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFYID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IGNhbGNCZXppZXIoZ2V0VEZvclgoYVgpLCBtWTEsIG1ZMik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGY7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJlemllcjsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBCZXppZXIgPSByZXF1aXJlKCcuL0JlemllcicpLFxuXG4vKlxuICAgIE1pcnJvciBlYXNpbmdcbiAgICBcbiAgICBNaXJyb3JzIHRoZSBwcm92aWRlZCBlYXNpbmcgZnVuY3Rpb24sIHVzZWQgaGVyZSBmb3IgbWlycm9yaW5nIGFuXG4gICAgZWFzZUluIGludG8gYW4gZWFzZUluT3V0XG4gICAgXG4gICAgQHBhcmFtIFtudW1iZXJdOiBQcm9ncmVzcywgZnJvbSAwIC0gMSwgb2YgY3VycmVudCBzaGlmdFxuICAgIEBwYXJhbSBbZnVuY3Rpb25dOiBUaGUgZWFzaW5nIGZ1bmN0aW9uIHRvIG1pcnJvclxuICAgIEByZXR1cm5zIFtudW1iZXJdOiBUaGUgZWFzaW5nLWFkanVzdGVkIGRlbHRhXG4qL1xubWlycm9yRWFzaW5nID0gZnVuY3Rpb24gbWlycm9yRWFzaW5nKHByb2dyZXNzLCBtZXRob2QpIHtcbiAgICByZXR1cm4gcHJvZ3Jlc3MgPD0gMC41ID8gbWV0aG9kKDIgKiBwcm9ncmVzcykgLyAyIDogKDIgLSBtZXRob2QoMiAqICgxIC0gcHJvZ3Jlc3MpKSkgLyAyO1xufSxcblxuLypcbiAgICBSZXZlcnNlIGVhc2luZ1xuICAgIFxuICAgIFJldmVyc2VzIHRoZSBvdXRwdXQgb2YgdGhlIHByb3ZpZGVkIGVhc2luZyBmdW5jdGlvbiwgdXNlZCBmb3IgZmxpcHBpbmcgZWFzZUluXG4gICAgY3VydmUgdG8gYW4gZWFzZU91dC5cbiAgICBcbiAgICBAcGFyYW0gW251bWJlcl06IFByb2dyZXNzLCBmcm9tIDAgLSAxLCBvZiBjdXJyZW50IHNoaWZ0XG4gICAgQHBhcmFtIFtmdW5jdGlvbl06IFRoZSBlYXNpbmcgZnVuY3Rpb24gdG8gcmV2ZXJzZVxuICAgIEByZXR1cm5zIFtudW1iZXJdOiBUaGUgZWFzaW5nLWFkanVzdGVkIGRlbHRhXG4qL1xucmV2ZXJzZUVhc2luZyA9IGZ1bmN0aW9uIHJldmVyc2VFYXNpbmcocHJvZ3Jlc3MsIG1ldGhvZCkge1xuICAgIHJldHVybiAxIC0gbWV0aG9kKDEgLSBwcm9ncmVzcyk7XG59O1xuXG4vKlxuICAgIEVhc2luZyBjbGFzc1xuXG4gICAgSWYgcHJvdmlkZWQgZWFzaW5nIGZ1bmN0aW9uLCByZXR1cm5zIGVhc2luZyBmdW5jdGlvbiB3aXRoIFxuICAgIGluL291dC9pbk91dCB2YXJpYXRpb25zXG5cbiAgICBJZiBwcm92aWRlZCBmb3VyIGFyZ3VtZW50cywgcmV0dXJucyBuZXcgQmV6aWVyIGNsYXNzIGluc3RlYWQuXG4qL1xudmFyIEVhc2luZyA9IGZ1bmN0aW9uIEVhc2luZyh4MSwgeTEsIHgyLCB5Mikge1xuICAgIHZhciBtZXRob2QgPSB4MSxcbiAgICAgICAgZWFzaW5nRnVuY3Rpb247XG5cbiAgICAvLyBJZiB0aGlzIGlzIGEgYmV6aWVyIGN1cnZlLCByZXR1cm4gYSBiZXppZXIgZnVuY3Rpb25cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZWFzaW5nRnVuY3Rpb24gPSBuZXcgQmV6aWVyKHgxLCB5MSwgeDIsIHkyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBlYXNpbmdGdW5jdGlvbiA9IGZ1bmN0aW9uIChwcm9ncmVzcykge1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZChwcm9ncmVzcyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZWFzaW5nRnVuY3Rpb25bJ2luJ10gPSBmdW5jdGlvbiAocHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBtZXRob2QocHJvZ3Jlc3MpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGVhc2luZ0Z1bmN0aW9uLm91dCA9IGZ1bmN0aW9uIChwcm9ncmVzcykge1xuICAgICAgICAgICAgcmV0dXJuIHJldmVyc2VFYXNpbmcocHJvZ3Jlc3MsIG1ldGhvZCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZWFzaW5nRnVuY3Rpb24uaW5PdXQgPSBmdW5jdGlvbiAocHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBtaXJyb3JFYXNpbmcocHJvZ3Jlc3MsIG1ldGhvZCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGVhc2luZ0Z1bmN0aW9uO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFYXNpbmc7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgQ29udHJvbHMgPSByZXF1aXJlKCcuLi8uLi9jb250cm9scy9Db250cm9scycpO1xuXG52YXIgVHdlZW5Db250cm9scyA9IChmdW5jdGlvbiAoX0NvbnRyb2xzKSB7XG4gICAgX2luaGVyaXRzKFR3ZWVuQ29udHJvbHMsIF9Db250cm9scyk7XG5cbiAgICBmdW5jdGlvbiBUd2VlbkNvbnRyb2xzKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVHdlZW5Db250cm9scyk7XG5cbiAgICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoVHdlZW5Db250cm9scy5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhUd2VlbkNvbnRyb2xzLCBbe1xuICAgICAgICBrZXk6ICdyZXN0YXJ0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlc3RhcnQoKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbi5yZXN0YXJ0KCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmV2ZXJzZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZXZlcnNlKCkge1xuICAgICAgICAgICAgdGhpcy5hY3Rpb24ucmV2ZXJzZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3NlZWsnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2Vlayhwcm9ncmVzcykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmFjdG9yLmhhc0FjdGlvbih0aGlzLmlkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnQoKS5wYXVzZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmFjdGlvbi5lbGFwc2VkID0gdGhpcy5hY3Rpb24uZHVyYXRpb24gKiBwcm9ncmVzcztcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmFjdGlvbi5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uLmFjdGl2YXRlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rvci5wcm9jZXNzLmZpcmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbi5kZWFjdGl2YXRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIFR3ZWVuQ29udHJvbHM7XG59KShDb250cm9scyk7XG5cbm1vZHVsZS5leHBvcnRzID0gVHdlZW5Db250cm9sczsiLCIvKlxuICAgIEVhc2luZyBmdW5jdGlvbnNcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgXG4gICAgR2VuZXJhdGVzIGFuZCBwcm92aWRlcyBlYXNpbmcgZnVuY3Rpb25zIGJhc2VkIG9uIGJhc2VGdW5jdGlvbiBkZWZpbml0aW9uc1xuICAgIFxuICAgIEEgY2FsbCB0byBlYXNpbmdGdW5jdGlvbi5nZXQoJ2Z1bmN0aW9uTmFtZScpIHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNhbiBiZSBwYXNzZWQ6XG4gICAgICAgIEBwYXJhbSBbbnVtYmVyXTogUHJvZ3Jlc3MgMC0xXG4gICAgICAgIEBwYXJhbSBbbnVtYmVyXSAob3B0aW9uYWwpOiBBbXAgbW9kaWZpZXIsIG9ubHkgYWNjZXB0ZWQgaW4gc29tZSBlYXNpbmcgZnVuY3Rpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmQgaXMgdXNlZCB0byBhZGp1c3Qgb3ZlcmFsbCBzdHJlbmd0aFxuICAgICAgICBAcmV0dXJuIFtudW1iZXJdOiBFYXNlZCBwcm9ncmVzc1xuICAgICAgICBcbiAgICBXZSBjYW4gZ2VuZXJhdGUgbmV3IGZ1bmN0aW9ucyBieSBzZW5kaW5nIGFuIGVhc2luZyBmdW5jdGlvbiB0aHJvdWdoIGVhc2luZ0Z1bmN0aW9uLmV4dGVuZChuYW1lLCBtZXRob2QpLlxuICAgIFdoaWNoIHdpbGwgbWFrZSBuYW1lSW4sIG5hbWVPdXQgYW5kIG5hbWVJbk91dCBmdW5jdGlvbnMgYXZhaWxhYmxlIHRvIHVzZS5cbiAgICAgICAgXG4gICAgRWFzaW5nIGZ1bmN0aW9ucyBmcm9tIFJvYmVydCBQZW5uZXJcbiAgICBodHRwOi8vd3d3LnJvYmVydHBlbm5lci5jb20vZWFzaW5nL1xuICAgICAgICBcbiAgICBCZXppZXIgY3VydmUgaW50ZXJwcmV0b3IgY3JlYXRlZCBmcm9tIEdhw6t0YW4gUmVuYXVkZWF1J3Mgb3JpZ2luYWwgQmV6aWVyRWFzaW5nICBcbiAgICBodHRwczovL2dpdGh1Yi5jb20vZ3JlL2Jlemllci1lYXNpbmcvYmxvYi9tYXN0ZXIvaW5kZXguanMgIFxuICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9ncmUvYmV6aWVyLWVhc2luZy9ibG9iL21hc3Rlci9MSUNFTlNFXG4qL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBFYXNpbmcgPSByZXF1aXJlKCcuL0Vhc2luZycpLFxuICAgIGVhc2luZ0Z1bmN0aW9uLFxuXG4vLyBHZW5lcmF0ZSBlYXNpbmcgZnVuY3Rpb24gd2l0aCBwcm92aWRlZCBwb3dlclxuZ2VuZXJhdGVQb3dlckVhc2luZyA9IGZ1bmN0aW9uIGdlbmVyYXRlUG93ZXJFYXNpbmcocG93ZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHByb2dyZXNzKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnBvdyhwcm9ncmVzcywgcG93ZXIpO1xuICAgIH07XG59LFxuXG4vKlxuICAgIEVhY2ggb2YgdGhlc2UgYmFzZSBmdW5jdGlvbnMgaXMgYW4gZWFzZUluXG4gICAgXG4gICAgT24gaW5pdCwgd2UgdXNlIEVhc2luZ0Z1bmN0aW9uLm1pcnJvciBhbmQgLnJldmVyc2UgdG8gZ2VuZXJhdGUgZWFzZUluT3V0IGFuZFxuICAgIGVhc2VPdXQgZnVuY3Rpb25zIHJlc3BlY3RpdmVseS5cbiovXG5iYXNlRWFzaW5nID0ge1xuICAgIGNpcmM6IGZ1bmN0aW9uIGNpcmMocHJvZ3Jlc3MpIHtcbiAgICAgICAgcmV0dXJuIDEgLSBNYXRoLnNpbihNYXRoLmFjb3MocHJvZ3Jlc3MpKTtcbiAgICB9LFxuICAgIGJhY2s6IGZ1bmN0aW9uIGJhY2socHJvZ3Jlc3MpIHtcbiAgICAgICAgdmFyIHN0cmVuZ3RoID0gMS41O1xuXG4gICAgICAgIHJldHVybiBwcm9ncmVzcyAqIHByb2dyZXNzICogKChzdHJlbmd0aCArIDEpICogcHJvZ3Jlc3MgLSBzdHJlbmd0aCk7XG4gICAgfVxufTtcblxuLy8gR2VuZXJhdGUgcG93ZXIgZWFzaW5nIGVhc2luZ1xuWydlYXNlJywgJ2N1YmljJywgJ3F1YXJ0JywgJ3F1aW50J10uZm9yRWFjaChmdW5jdGlvbiAoZWFzaW5nTmFtZSwgaSkge1xuICAgIGJhc2VFYXNpbmdbZWFzaW5nTmFtZV0gPSBnZW5lcmF0ZVBvd2VyRWFzaW5nKGkgKyAyKTtcbn0pO1xuXG4vLyBHZW5lcmF0ZSBpbi9vdXQvaW5PdXQgdmFyaWF0aW9uc1xuZm9yICh2YXIga2V5IGluIGJhc2VFYXNpbmcpIHtcbiAgICBpZiAoYmFzZUVhc2luZy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIGVhc2luZ0Z1bmN0aW9uID0gbmV3IEVhc2luZyhiYXNlRWFzaW5nW2tleV0pO1xuICAgICAgICBiYXNlRWFzaW5nW2tleSArICdJbiddID0gZWFzaW5nRnVuY3Rpb25bJ2luJ107XG4gICAgICAgIGJhc2VFYXNpbmdba2V5ICsgJ091dCddID0gZWFzaW5nRnVuY3Rpb24ub3V0O1xuICAgICAgICBiYXNlRWFzaW5nW2tleSArICdJbk91dCddID0gZWFzaW5nRnVuY3Rpb24uaW5PdXQ7XG4gICAgfVxufVxuXG4vKlxuICAgIExpbmVhciBlYXNpbmcgYWRqdXN0bWVudFxuICAgIFxuICAgIFRoZSBkZWZhdWx0IGVhc2luZyBtZXRob2QsIG5vdCBhZGRlZCB3aXRoIC5leHRlbmQgYXMgaXQgaGFzIG5vIE91dCBvciBJbk91dFxuICAgIHZhcmlhdGlvbi5cbiAgICBcbiAgICBAcGFyYW0gW251bWJlcl06IFByb2dyZXNzLCBmcm9tIDAtMVxuICAgIEByZXR1cm4gW251bWJlcl06IFVuYWRqdXN0ZWQgcHJvZ3Jlc3NcbiovXG5iYXNlRWFzaW5nLmxpbmVhciA9IGZ1bmN0aW9uIChwcm9ncmVzcykge1xuICAgIHJldHVybiBwcm9ncmVzcztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUVhc2luZzsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG52YXIgUHJvY2VzcyA9IHJlcXVpcmUoJy4uL3Byb2Nlc3MvUHJvY2VzcycpLFxuICAgIFF1ZXVlID0gcmVxdWlyZSgnLi4vaW5jL1F1ZXVlJyksXG4gICAgdXRpbHMgPSByZXF1aXJlKCcuLi9pbmMvdXRpbHMnKSxcbiAgICBzZWxlY3QgPSByZXF1aXJlKCcuLi9pbmMvc2VsZWN0LWRvbScpLFxuICAgIHVwZGF0ZSA9IHJlcXVpcmUoJy4vdXBkYXRlJyksXG4gICAgdmFsdWVPcHMgPSByZXF1aXJlKCcuL3ZhbHVlLW9wZXJhdGlvbnMnKSxcblxuLypcbiAgICBSb2xlIGltcG9ydHNcbiovXG5kZWZhdWx0Um9sZSA9IHJlcXVpcmUoJy4uL3JvbGVzL2RlZmF1bHRSb2xlJyksXG4gICAgY3NzUm9sZSA9IHJlcXVpcmUoJy4uL3JvbGVzL2Nzcy9jc3NSb2xlJyksXG4gICAgc3ZnUm9sZSA9IHJlcXVpcmUoJy4uL3JvbGVzL3N2Zy9zdmdSb2xlJyksXG4gICAgZHJhd1BhdGhSb2xlID0gcmVxdWlyZSgnLi4vcm9sZXMvcGF0aC9kcmF3UGF0aFJvbGUnKSxcbiAgICBBY3Rpb24gPSByZXF1aXJlKCcuLi9hY3Rpb25zL0FjdGlvbicpLFxuICAgIGVhY2ggPSB1dGlscy5lYWNoO1xuXG52YXIgQWN0b3IgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgLypcbiAgICAgICAgQHBhcmFtIFtvYmplY3RdXG4gICAgKi9cblxuICAgIGZ1bmN0aW9uIEFjdG9yKCkge1xuICAgICAgICB2YXIgb3B0cyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuXG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBY3Rvcik7XG5cbiAgICAgICAgdmFyIHByb3BzID0gdXRpbHMuaXNTdHJpbmcob3B0cykgPyB7IGVsZW1lbnQ6IG9wdHMgfSA6IG9wdHM7XG5cbiAgICAgICAgdGhpcy52YWx1ZXMgPSB7fTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHsgdmFsdWVzOiB7fSB9O1xuICAgICAgICB0aGlzLnF1ZXVlID0gbmV3IFF1ZXVlKCk7XG4gICAgICAgIHRoaXMucHJvY2VzcyA9IG5ldyBQcm9jZXNzKHRoaXMsIHVwZGF0ZSk7XG4gICAgICAgIHRoaXMuYWN0aXZlQWN0aW9ucyA9IHt9O1xuICAgICAgICB0aGlzLm51bUFjdGl2ZSA9IDA7XG4gICAgICAgIHRoaXMuYWN0aW9uQ291bnRlciA9IDA7XG4gICAgICAgIHRoaXMuYWN0aXZlVmFsdWVzID0gW107XG4gICAgICAgIHRoaXMuYWN0aXZlUGFyZW50cyA9IFtdO1xuXG4gICAgICAgIC8vIEdldCBhY3R1YWwgZWxlbWVudHMgaWYgdGhpcyBpcyBhIHNlbGVjdG9yXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwcm9wcy5lbGVtZW50KSkge1xuICAgICAgICAgICAgcHJvcHMuZWxlbWVudCA9IHNlbGVjdChwcm9wcy5lbGVtZW50KVswXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYXNzaWduUm9sZXMocHJvcHMuZWxlbWVudCwgcHJvcHMuYXMsIHRydWUpO1xuICAgICAgICB0aGlzLnNldChwcm9wcyk7XG4gICAgICAgIHRoaXMuaW5pdFJvbGVzKCk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgICAgU2V0IEFjdG9yIHByb3BlcnRpZXMgYW5kIHZhbHVlc1xuICAgICAgICAgQHBhcmFtIFtvYmplY3RdXG4gICAgICAgIEByZXR1cm5zIFtBY3Rvcl1cbiAgICAqL1xuXG4gICAgX2NyZWF0ZUNsYXNzKEFjdG9yLCBbe1xuICAgICAgICBrZXk6ICdzZXQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2V0KG9wdHMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgIGVhY2gob3B0cywgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ICE9PSAndmFsdWVzJyAmJiBrZXkgIT09ICdhY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKG9wdHMgJiYgb3B0cy52YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlcyA9IHZhbHVlT3BzLnByb2Nlc3ModGhpcy52YWx1ZXMsIG9wdHMudmFsdWVzLCBvcHRzLCAnY3VycmVudCcsIHRoaXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBDaGVjayBhbGwgYWN0aXZlIGFjdGlvbnMgZm9yIGFueSB0aGF0IGNhbiBiZSByZW1vdmVkXG4gICAgICAgICAgICBlYWNoKHRoaXMuYWN0aXZlQWN0aW9ucywgZnVuY3Rpb24gKGlkLCBhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uSXNBY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGVhY2goX3RoaXMudmFsdWVzLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb25Jc0FjdGl2ZSA9IHZhbHVlLmFjdGlvbiA9PT0gYWN0aW9uID8gdHJ1ZSA6IGFjdGlvbklzQWN0aXZlO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFhY3Rpb25Jc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy51bmJpbmRBY3Rpb24oaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qXG4gICAgICAgICAgICBCaW5kIEFjdGlvbi1zcGVjaWZpYyBjb250cm9scyB0byBBY3RvclxuICAgICAgICAgICAgIEByZXR1cm5zIFtDb250cm9sc11cbiAgICAgICAgKi9cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NvbnRyb2xzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbnRyb2xzKGFjdGlvbikge1xuICAgICAgICAgICAgdmFyIENvbnRyb2xzID0gYWN0aW9uLmdldENvbnRyb2xzKCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IENvbnRyb2xzKHRoaXMsIGFjdGlvbi5nZXRQbGF5YWJsZSgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qXG4gICAgICAgICAgICBTdGFydCBhIG5ldyBBY3Rpb25cbiAgICAgICAgICAgICBAcGFyYW0gW0FjdGlvbiB8fCBudW1iZXJdXG4gICAgICAgICAgICBAcGFyYW0gW0lucHV0IHx8IGV2ZW50XSAob3B0aW9uYWwpXG4gICAgICAgICAgICBAcGFyYW0gW2Jvb2xlYW5dIChvcHRpb25hbCk6IGRlZmluZWQgYHRydWVgIGlmIHdlIHN1cnByZXNzIG1ha2luZyBuZXcgcXVldWVcbiAgICAgICAgICAgIEByZXR1cm5zIFtDb250cm9sc11cbiAgICAgICAgKi9cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3N0YXJ0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHN0YXJ0KHRvU2V0LCBpbnB1dCkge1xuICAgICAgICAgICAgdmFyIGFjdGlvbkV4aXN0cyA9IHV0aWxzLmlzTnVtKHRvU2V0KSxcbiAgICAgICAgICAgICAgICBhY3Rpb24gPSBhY3Rpb25FeGlzdHMgPyB0aGlzLmdldEFjdGlvbih0b1NldCkgOiB0b1NldC5nZXRQbGF5YWJsZSgpLFxuICAgICAgICAgICAgICAgIG9wdHMgPSBhY3Rpb24uZ2V0U2V0KCksXG4gICAgICAgICAgICAgICAgc3VycHJlc3NRdWV1ZUNsZWFyID0gYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXSA9PT0gZmFsc2U7XG5cbiAgICAgICAgICAgIG9wdHMuYWN0aW9uID0gYWN0aW9uO1xuXG4gICAgICAgICAgICB0aGlzLnNldChvcHRzKTtcblxuICAgICAgICAgICAgaWYgKGlucHV0KSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLmJpbmRJbnB1dChpbnB1dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghc3VycHJlc3NRdWV1ZUNsZWFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5xdWV1ZS5jbGVhcigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBGaXJlIGFsbCBSb2xlIG9uU3RhcnRzIGlmIG5vdCBhbHJlYWR5IGFjdGl2ZVxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG51bVJvbGVzID0gdGhpcy5yb2xlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1Sb2xlczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByb2xlID0gdGhpcy5yb2xlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvbGUuc3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGUuc3RhcnQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRmlyZSBuZXcgYWN0aW9uIG9uU3RhcnRcbiAgICAgICAgICAgIGlmICghYWN0aW9uLmlzQWN0aXZlICYmIGFjdGlvbi5vblN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm9uU3RhcnQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xuXG4gICAgICAgICAgICBpZiAoIWFjdGlvbkV4aXN0cykge1xuICAgICAgICAgICAgICAgIHZhciBDb250cm9scyA9IGFjdGlvbi5nZXRDb250cm9scygpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ29udHJvbHModGhpcywgYWN0aW9uLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qXG4gICAgICAgICAgICBQYXVzZSBhbGwgYWN0aXZlIEFjdGlvbnNcbiAgICAgICAgICAgICBAcGFyYW0gW2ludF0gKG9wdGlvbmFsKVxuICAgICAgICAgICAgQHJldHVybnMgW0FjdG9yXVxuICAgICAgICAqL1xuICAgIH0sIHtcbiAgICAgICAga2V5OiAncGF1c2UnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcGF1c2UoKSB7XG4gICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBlYWNoKHRoaXMuYWN0aXZlQWN0aW9ucywgZnVuY3Rpb24gKGlkLCBhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzLnN0b3AoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLypcbiAgICAgICAgICAgIFJlc3VtZSBhbGwgYWN0aXZlIEFjdGlvbnNcbiAgICAgICAgICAgICBAcGFyYW0gW2ludF0gKG9wdGlvbmFsKVxuICAgICAgICAgICAgQHJldHVybnMgW0FjdG9yXTtcbiAgICAgICAgKi9cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3Jlc3VtZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZXN1bWUoKSB7XG4gICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGVhY2godGhpcy5hY3RpdmVBY3Rpb25zLCBmdW5jdGlvbiAoaWQsIGFjdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb24uYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzLnN0YXJ0KCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qXG4gICAgICAgICAgICBTdG9wIGFsbCBhY3RpdmUgQWN0aW9uc1xuICAgICAgICAgICAgIEBwYXJhbSBbaW50XSAob3B0aW9uYWwpXG4gICAgICAgICAgICBAcmV0dXJucyBbQWN0b3JdXG4gICAgICAgICovXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzdG9wJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUFjdGlvbnMgPSB7fTtcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLypcbiAgICAgICAgICAgIFRvZ2dsZSBhbGwgYWN0aXZlIEFjdGlvbnNcbiAgICAgICAgICAgICBAcGFyYW0gW2ludF0gKG9wdGlvbmFsKVxuICAgICAgICAgICAgQHJldHVybnMgW0FjdG9yXVxuICAgICAgICAqL1xuICAgIH0sIHtcbiAgICAgICAga2V5OiAndG9nZ2xlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHRvZ2dsZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzQWN0aXZlID8gdGhpcy5wYXVzZSgpIDogdGhpcy5yZXN1bWUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qXG4gICAgICAgICAgICBTeW5jcyBgZWxlbWVudGAgd2l0aCBjdXJyZW50IHByb3BlcnRpZXNcbiAgICAgICAgICAgICBAcmV0dXJucyBbQWN0b3JdXG4gICAgICAgICovXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzeW5jJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHN5bmMoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGFydChuZXcgQWN0aW9uKHsgdmFsdWVzOiB0aGlzLnZhbHVlcyB9KSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKlxuICAgICAgICAgICAgQWRkIGEgbmV3IEFjdGlvbiB0byB0aGUgcXVldWVcbiAgICAgICAgKi9cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3RoZW4nLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdGhlbigpIHtcbiAgICAgICAgICAgIHRoaXMucXVldWUuYWRkLmFwcGx5KHRoaXMucXVldWUsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qXG4gICAgICAgICAgICBFeGVjdXRlIG5leHQgaW4gcXVldWVcbiAgICAgICAgKi9cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ25leHQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgIHZhciBuZXh0ID0gdGhpcy5xdWV1ZS5uZXh0KCk7XG5cbiAgICAgICAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLmlzRnVuYyhuZXh0WzBdKSkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0WzBdKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAvLyBPciB0aGlzIGlzIGFuIGFjdGlvblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0LnB1c2goZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydC5hcHBseSh0aGlzLCBuZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKlxuICAgICAgICAgICAgQXNzaWduIFJvbGVzIGJhc2VkIG9uIGVsZW1lbnQgYW5kIG1hbnVhbGx5IHByb3ZpZGVkIHByb3BzXG4gICAgICAgICAgICAgQHBhcmFtIFtvYmplY3RdOiBFbGVtZW50XG4gICAgICAgICAgICBAcGFyYW0gW1JvbGUgfHwgYXJyYXldXG4gICAgICAgICAgICBAcGFyYW0gW2Jvb2xlYW5dIChvcHRpb25hbClcbiAgICAgICAgKi9cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2Fzc2lnblJvbGVzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGFzc2lnblJvbGVzKGVsZW1lbnQsIG1hbnVhbFJvbGVzLCBzdXJwcmVzc0luaXQpIHtcbiAgICAgICAgICAgIC8vIEFsbCBBY3RvcnMgZ2V0IGEgZGVmYXVsdCBSb2xlIHRoYXQgaGFuZGxlcyB1c2VyIGNhbGxiYWNrc1xuICAgICAgICAgICAgdGhpcy5yb2xlcyA9IFtkZWZhdWx0Um9sZV07XG5cbiAgICAgICAgICAgIC8vIEF1dG8tYXNzaWduIGlmIG5vIG1hbnVhbGx5LXNldCBSb2xlc1xuICAgICAgICAgICAgaWYgKCFtYW51YWxSb2xlcyAmJiBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdXRvQXNzaWduUm9sZXMoZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICAvLyBPciBtYW51YWxseSBzZXQgaWYgcHJvdmlkZWRcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWFudWFsUm9sZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxzLmlzQXJyYXkobWFudWFsUm9sZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGVzLnB1c2guYXBwbHkodGhpcy5yb2xlcywgbWFudWFsUm9sZXMpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlcy5wdXNoKG1hbnVhbFJvbGVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFzdXJwcmVzc0luaXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRSb2xlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLypcbiAgICAgICAgICAgIEF1dG9tYXRpY2FsbHkgYXNzaWduIFJvbGVzIGJhc2VkIG9uIGVsZW1lbnQsIGRlc2lnbmVkXG4gICAgICAgICAgICB0byBiZSBleHRlbmRlZFxuICAgICAgICAgICAgIEBwYXJhbSBbb2JqZWN0XTogRWxlbWVudFxuICAgICAgICAqL1xuICAgIH0sIHtcbiAgICAgICAga2V5OiAnYXV0b0Fzc2lnblJvbGVzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGF1dG9Bc3NpZ25Sb2xlcyhlbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBBZGQgQ1NTIHJvbGUgaWYgSFRNTEVsZW1lbnRcbiAgICAgICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGVzLnB1c2goY3NzUm9sZSk7XG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgU1ZHIHJvbGUgaWYgU1ZHIGVsZW1lbnRcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlcy5wdXNoKHN2Z1JvbGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCBEcmF3IFBhdGggcm9sZSBpZiBwYXRoIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQudGFnTmFtZSA9PT0gJ3BhdGgnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvbGVzLnB1c2goZHJhd1BhdGhSb2xlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qXG4gICAgICAgICAgICBGaXJlIGluaXQgY2FsbGJhY2tzXG4gICAgICAgICovXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdpbml0Um9sZXMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdFJvbGVzKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIC8vIEZpcmUgaW5pdCBjYWxsYmFja1xuICAgICAgICAgICAgdGhpcy5yb2xlcy5mb3JFYWNoKGZ1bmN0aW9uIChyb2xlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJvbGUuaW5pdCkge1xuICAgICAgICAgICAgICAgICAgICByb2xlLmluaXQuY2FsbChfdGhpczIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdhY3RpdmF0ZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RGcmFtZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzLnN0YXJ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKlxuICAgICAgICAgICAgQmluZCBBY3Rpb24gYW5kIHJldHVybiBpdHMgdGFibGUgaWRcbiAgICAgICAgICAgICBAcGFyYW0gW0FjdGlvbl1cbiAgICAgICAgICAgIEByZXR1cm5zIFtpbnRdXG4gICAgICAgICovXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdiaW5kQWN0aW9uJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGJpbmRBY3Rpb24oYWN0aW9uLCBpZCkge1xuICAgICAgICAgICAgaWYgKGlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpZCA9IHRoaXMuYWN0aW9uQ291bnRlcisrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaGFzQWN0aW9uKGlkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlQWN0aW9uc1tpZF0gPSBhY3Rpb247XG4gICAgICAgICAgICAgICAgdGhpcy5udW1BY3RpdmUrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICd1bmJpbmRBY3Rpb24nLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdW5iaW5kQWN0aW9uKGlkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVBY3Rpb25zLmhhc093blByb3BlcnR5KGlkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubnVtQWN0aXZlLS07XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuYWN0aXZlQWN0aW9uc1tpZF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5udW1BY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0QWN0aW9uJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldEFjdGlvbihpZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlQWN0aW9uc1tpZF07XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2hhc0FjdGlvbicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYXNBY3Rpb24oaWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFjdGlvbihpZCkgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qXG4gICAgICAgICAgICBVcGRhdGUgcHJvY2Vzc2luZyBvcmRlclxuICAgICAgICAgICAgXG4gICAgICAgICAgICBAcGFyYW0gW3N0cmluZ11cbiAgICAgICAgICAgIEBwYXJhbSBbYm9vbGVhbl1cbiAgICAgICAgICAgIEBwYXJhbSBbYm9vbGVhbl1cbiAgICAgICAgKi9cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3VwZGF0ZU9yZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZU9yZGVyKGtleSwgbW92ZVRvQmFjaywgaGFzQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHZhciBvcmRlciA9ICFoYXNDaGlsZHJlbiA/IHRoaXMuYWN0aXZlVmFsdWVzIDogdGhpcy5hY3RpdmVQYXJlbnRzLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gb3JkZXIuaW5kZXhPZihrZXkpO1xuXG4gICAgICAgICAgICAvLyBJZiBrZXkgaXNuJ3QgbGlzdCBvciBtb3ZlVG9CYWNrIGlzIHNldCB0byB0cnVlLCBhZGQga2V5XG4gICAgICAgICAgICBpZiAocG9zaXRpb24gPT09IC0xIHx8IG1vdmVUb0JhY2spIHtcbiAgICAgICAgICAgICAgICBvcmRlci5wdXNoKGtleSk7XG5cbiAgICAgICAgICAgICAgICAvLyBJZiBrZXkgYWxyZWFkeSBleGlzdHMsIHJlbW92ZVxuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbiA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIG9yZGVyLnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gW2Jvb2xlYW5dOiBJcyB0aGlzIEFjdG9yIGFjdGl2ZT9cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2lzQWN0aXZlJyxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXNBY3RpdmU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gU2V0IGhhc0NoYW5nZWQgdG8gdHJ1ZSBpcyB0aGlzIGlzIG5vdyBhY3RpdmVcbiAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQoc3RhdHVzKSB7XG4gICAgICAgICAgICBpZiAoc3RhdHVzID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYXNDaGFuZ2VkID0gc3RhdHVzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9pc0FjdGl2ZSA9IHN0YXR1cztcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBBY3Rvcjtcbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gQWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciB2YWx1ZVR5cGVNYW5hZ2VyID0gcmVxdWlyZSgnLi4vdmFsdWUtdHlwZXMvbWFuYWdlcicpLFxuICAgIGNhbGMgPSByZXF1aXJlKCcuLi9pbmMvY2FsYycpLFxuICAgIHV0aWxzID0gcmVxdWlyZSgnLi4vaW5jL3V0aWxzJyksXG4gICAgZWFjaCA9IHV0aWxzLmVhY2gsXG4gICAgQWN0aW9uID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9BY3Rpb24nKSxcbiAgICBkZWZhdWx0QWN0aW9uID0gbmV3IEFjdGlvbigpLFxuICAgIFdhdGNoID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9XYXRjaCcpLFxuICAgIHdhdGNoZXIgPSBuZXcgV2F0Y2goKSxcbiAgICBjcmVhdGVNYXBwZXIgPSBmdW5jdGlvbiBjcmVhdGVNYXBwZXIocm9sZSwgbWFwcGVkVmFsdWVzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChuYW1lLCB2YWwpIHtcbiAgICAgICAgbWFwcGVkVmFsdWVzW3JvbGUubWFwKG5hbWUpXSA9IHZhbDtcbiAgICB9O1xufSxcblxuLypcbiAgICBDaGVjayBhbGwgQWN0aW9ucyBmb3IgYG9uRW5kYCwgcmV0dXJuIHRydWUgaWYgYWxsIGFyZSB0cnVlXG4gICAgIEBwYXJhbSBbQWN0b3JdXG4gICAgQHBhcmFtIFtib29sZWFuXVxuICAgIEByZXR1cm5zIFtib29sZWFuXVxuKi9cbmNoZWNrQWxsQWN0aW9uc0hhdmVFbmRlZCA9IGZ1bmN0aW9uIGNoZWNrQWxsQWN0aW9uc0hhdmVFbmRlZChhY3RvciwgaGFzQ2hhbmdlZCkge1xuICAgIHZhciBoYXNFbmRlZCA9IHRydWUsXG4gICAgICAgIHZhbHVlcyA9IGFjdG9yLnN0YXRlLnZhbHVlcztcblxuICAgIGVhY2goYWN0b3IuYWN0aXZlQWN0aW9ucywgZnVuY3Rpb24gKGtleSwgYWN0aW9uKSB7XG4gICAgICAgIC8vIFJldHVybiBpZiBhY3Rpb24gaGFzIGJlZW4gZGVsZXRlZCBlbHNld2hlcmVcbiAgICAgICAgaWYgKCFhY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhY3Rpb24ub25GcmFtZSkge1xuICAgICAgICAgICAgYWN0aW9uLm9uRnJhbWUuY2FsbChhY3RvciwgdmFsdWVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhY3Rpb24ub25VcGRhdGUgJiYgaGFzQ2hhbmdlZCkge1xuICAgICAgICAgICAgYWN0aW9uLm9uVXBkYXRlLmNhbGwoYWN0b3IsIHZhbHVlcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYWN0aW9uLmhhc0VuZGVkICYmIGFjdGlvbi5oYXNFbmRlZChhY3RvciwgaGFzQ2hhbmdlZCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBoYXNFbmRlZCA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGFjdGlvbi5vbkNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm9uQ29tcGxldGUuY2FsbChhY3Rvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhY3Rvci51bmJpbmRBY3Rpb24oa2V5KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGhhc0VuZGVkO1xufSxcblxuLypcbiAgICBVcGRhdGUgdGhlIEFjdG9yIGFuZCBpdHMgdmFsdWVzXG4gICAgIEBwYXJhbSBbaW50XTogVGltZXN0YW1wIG9mIHJBRiBjYWxsXG4gICAgQHBhcmFtIFtpbnRdOiBUaW1lIHNpbmNlIGxhc3QgZnJhbWVcbiovXG51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUoZnJhbWVzdGFtcCwgZnJhbWVEdXJhdGlvbikge1xuICAgIHZhciBudW1BY3RpdmVWYWx1ZXMgPSB0aGlzLmFjdGl2ZVZhbHVlcy5sZW5ndGgsXG4gICAgICAgIG51bUFjdGl2ZVBhcmVudHMgPSB0aGlzLmFjdGl2ZVBhcmVudHMubGVuZ3RoLFxuICAgICAgICBudW1Sb2xlcyA9IHRoaXMucm9sZXMubGVuZ3RoLFxuICAgICAgICBzdGF0ZSA9IHRoaXMuc3RhdGUsXG4gICAgICAgIGhhc0NoYW5nZWQgPSBmYWxzZTtcblxuICAgIC8vIFVwZGF0ZSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bUFjdGl2ZVZhbHVlczsgaSsrKSB7XG4gICAgICAgIC8vIEdldCB2YWx1ZSBhbmQga2V5XG4gICAgICAgIHZhciBrZXkgPSB0aGlzLmFjdGl2ZVZhbHVlc1tpXTtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy52YWx1ZXNba2V5XTtcbiAgICAgICAgdmFyIGFjdGlvbiA9ICF2YWx1ZS5hY3Rpb24gfHwgdmFsdWUuYWN0aW9uICYmICF2YWx1ZS5hY3Rpb24uaXNBY3RpdmUgPyBkZWZhdWx0QWN0aW9uIDogdmFsdWUuYWN0aW9uO1xuXG4gICAgICAgIC8vIEZpcmUgYWN0aW9uIG9uRnJhbWVTdGFydCBpZiBub3QgYWxyZWFkeSBmaXJlZFxuICAgICAgICBpZiAoYWN0aW9uLm9uRnJhbWVTdGFydCAmJiBhY3Rpb24ubGFzdFVwZGF0ZSAhPT0gZnJhbWVzdGFtcCkge1xuICAgICAgICAgICAgYWN0aW9uLm9uRnJhbWVTdGFydCh0aGlzLCBmcmFtZUR1cmF0aW9uLCBmcmFtZXN0YW1wKTtcbiAgICAgICAgICAgIGFjdGlvbi5sYXN0VXBkYXRlID0gZnJhbWVzdGFtcDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENhbGN1bGF0ZSBuZXcgdmFsdWVcbiAgICAgICAgdmFyIHVwZGF0ZWRWYWx1ZSA9IHV0aWxzLmlzU3RyaW5nKHZhbHVlLndhdGNoKSA/IHdhdGNoZXIucHJvY2Vzcyh0aGlzLCB2YWx1ZSkgOiBhY3Rpb24ucHJvY2Vzcyh0aGlzLCB2YWx1ZSwga2V5LCBmcmFtZUR1cmF0aW9uKTtcblxuICAgICAgICAvLyBMaW1pdCBpZiB0aGlzIGFjdGlvbiBkb2VzIHRoYXQga2luZCBvZiB0aGluZ1xuICAgICAgICBpZiAoYWN0aW9uLmxpbWl0ICYmIHZhbHVlLmhhc1JhbmdlKSB7XG4gICAgICAgICAgICB1cGRhdGVkVmFsdWUgPSBhY3Rpb24ubGltaXQodXBkYXRlZFZhbHVlLCB2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSb3VuZCB2YWx1ZSBpZiByb3VuZCBpcyB0cnVlXG4gICAgICAgIGlmICh2YWx1ZS5yb3VuZCkge1xuICAgICAgICAgICAgdXBkYXRlZFZhbHVlID0gTWF0aC5yb3VuZCh1cGRhdGVkVmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVXBkYXRlIGZyYW1lQ2hhbmdlXG4gICAgICAgIHZhbHVlLmZyYW1lQ2hhbmdlID0gdXBkYXRlZFZhbHVlIC0gdmFsdWUuY3VycmVudDtcblxuICAgICAgICAvLyBDYWxjdWxhdGUgdmVsb2NpdHkgaWYgQWN0aW9uIGhhc24ndFxuICAgICAgICBpZiAoIWFjdGlvbi5jYWxjdWxhdGVzVmVsb2NpdHkpIHtcbiAgICAgICAgICAgIHZhbHVlLnZlbG9jaXR5ID0gY2FsYy5zcGVlZFBlclNlY29uZCh2YWx1ZS5mcmFtZUNoYW5nZSwgZnJhbWVEdXJhdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVcGRhdGUgY3VycmVudCBzcGVlZFxuICAgICAgICB2YWx1ZS5zcGVlZCA9IE1hdGguYWJzKHZhbHVlLnZlbG9jaXR5KTtcblxuICAgICAgICAvLyBDaGVjayBpZiB2YWx1ZSdzIGNoYW5nZWRcbiAgICAgICAgaWYgKHZhbHVlLmN1cnJlbnQgIT09IHVwZGF0ZWRWYWx1ZSB8fCB0aGlzLmZpcnN0RnJhbWUpIHtcbiAgICAgICAgICAgIGhhc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2V0IG5ldyBjdXJyZW50XG4gICAgICAgIHZhbHVlLmN1cnJlbnQgPSB1cGRhdGVkVmFsdWU7XG4gICAgICAgIHZhciB2YWx1ZVN0YXRlID0gdmFsdWUudW5pdCA/IHVwZGF0ZWRWYWx1ZSArIHZhbHVlLnVuaXQgOiB1cGRhdGVkVmFsdWU7XG5cbiAgICAgICAgLy8gUHV0IHZhbHVlIGluIHN0YXRlIGlmIG5vIHBhcmVudFxuICAgICAgICBpZiAoIXZhbHVlLnBhcmVudCkge1xuICAgICAgICAgICAgc3RhdGUudmFsdWVzW2tleV0gPSB2YWx1ZVN0YXRlO1xuXG4gICAgICAgICAgICAvLyBPciwgYWRkIHRvIHBhcmVudCBzdGF0ZSB0byBiZSBjb21iaW5lZCBsYXRlclxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YXRlW3ZhbHVlLnBhcmVudF0gPSBzdGF0ZVt2YWx1ZS5wYXJlbnRdIHx8IHt9O1xuICAgICAgICAgICAgICAgIHN0YXRlW3ZhbHVlLnBhcmVudF1bdmFsdWUucHJvcE5hbWVdID0gdmFsdWVTdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgcGFyZW50IHZhbHVlcyBmcm9tIGNhbGN1bGF0ZWQgY2hpbGRyZW5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bUFjdGl2ZVBhcmVudHM7IGkrKykge1xuICAgICAgICB2YXIga2V5ID0gdGhpcy5hY3RpdmVQYXJlbnRzW2ldO1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnZhbHVlc1trZXldO1xuXG4gICAgICAgIC8vIFVwZGF0ZSBwYXJlbnQgdmFsdWUgY3VycmVudCBwcm9wZXJ0eVxuICAgICAgICB2YWx1ZS5jdXJyZW50ID0gdmFsdWVUeXBlTWFuYWdlclt2YWx1ZS50eXBlXS5jb21iaW5lKHN0YXRlW2tleV0sIHZhbHVlLnRlbXBsYXRlKTtcblxuICAgICAgICAvLyBVcGRhdGUgc3RhdGVcbiAgICAgICAgc3RhdGUudmFsdWVzW2tleV0gPSB2YWx1ZS5jdXJyZW50O1xuICAgIH1cblxuICAgIC8vIEZpcmUgYGZyYW1lYCBhbmQgYHVwZGF0ZWAgY2FsbGJhY2tzIG9uIGFsbCBSb2xlc1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtUm9sZXM7IGkrKykge1xuICAgICAgICB2YXIgcm9sZSA9IHRoaXMucm9sZXNbaV07XG4gICAgICAgIHZhciBtYXBwZWRWYWx1ZXMgPSB7fTtcblxuICAgICAgICBlYWNoKHN0YXRlLnZhbHVlcywgY3JlYXRlTWFwcGVyKHJvbGUsIG1hcHBlZFZhbHVlcykpO1xuXG4gICAgICAgIGlmIChyb2xlLmZyYW1lKSB7XG4gICAgICAgICAgICByb2xlLmZyYW1lLmNhbGwodGhpcywgbWFwcGVkVmFsdWVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyb2xlLnVwZGF0ZSAmJiBoYXNDaGFuZ2VkKSB7XG4gICAgICAgICAgICByb2xlLnVwZGF0ZS5jYWxsKHRoaXMsIG1hcHBlZFZhbHVlcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXNldCBoYXNDaGFuZ2VkIGJlZm9yZSBmdXJ0aGVyIEFjdGlvbnMgbWlnaHQgYWZmZWN0IHRoaXNcbiAgICB0aGlzLmhhc0NoYW5nZWQgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICBpZiAoY2hlY2tBbGxBY3Rpb25zSGF2ZUVuZGVkKHRoaXMsIGhhc0NoYW5nZWQpKSB7XG4gICAgICAgICAgICAvLyBGaXJlIGBjb21wbGV0ZWAgY2FsbGJhY2tzXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bVJvbGVzOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcm9sZSA9IHRoaXMucm9sZXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKHJvbGUuY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcm9sZS5jb21wbGV0ZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZmlyc3RGcmFtZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5mcmFtZXN0YW1wID0gZnJhbWVzdGFtcDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gdXBkYXRlOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHZhbHVlVHlwZXNNYW5hZ2VyID0gcmVxdWlyZSgnLi4vdmFsdWUtdHlwZXMvbWFuYWdlcicpLFxuICAgIGNhbGMgPSByZXF1aXJlKCcuLi9pbmMvY2FsYycpLFxuICAgIHV0aWxzID0gcmVxdWlyZSgnLi4vaW5jL3V0aWxzJyksXG4gICAgaXNOdW0gPSB1dGlscy5pc051bSxcbiAgICBlYWNoID0gdXRpbHMuZWFjaDtcblxudmFyIG51bWVyaWNhbFZhbHVlcyA9IFsnY3VycmVudCcsICd0bycsICdtaW4nLCAnbWF4JywgJ3ZlbG9jaXR5JywgJ2ZyaWN0aW9uJywgJ3NwcmluZyddLFxuICAgIG51bU51bWVyaWNhbFZhbHVlcyA9IG51bWVyaWNhbFZhbHVlcy5sZW5ndGgsXG4gICAgZGVmYXVsdFZhbHVlID0ge1xuICAgIGN1cnJlbnQ6IDAsXG4gICAgdmVsb2NpdHk6IDAsXG4gICAgc3BlZWQ6IDAsXG4gICAgZnJhbWVDaGFuZ2U6IDBcbn07XG5cbmZ1bmN0aW9uIGNoZWNrTnVtZXJpY2FsVmFsdWUobmFtZSkge1xuICAgIHJldHVybiBudW1lcmljYWxWYWx1ZXMuaW5kZXhPZihuYW1lKSA+IC0xO1xufVxuXG4vKlxuICAgIENoZWNrIFJvbGUgdHlwZU1hcHMgdG8gc2VlIGlmIHRoaXMgdmFsdWUgbmFtZSBoYXMgYmVlbiBtYXBwZWRcbiAgICB0byBhIHNwZWNpZmljIHZhbHVlIHR5cGVcblxuICAgIEBwYXJhbSBbc3RyaW5nXVxuICAgIEBwYXJhbSBbYXJyYXldXG4gICAgQHJldHVybnMgW3N0cmluZ106IFZhbHVlIHR5cGVcbiovXG5mdW5jdGlvbiBjaGVja1JvbGVzKG5hbWUsIHJvbGVzKSB7XG4gICAgdmFyIHZhbHVlVHlwZTtcblxuICAgIGVhY2gocm9sZXMsIGZ1bmN0aW9uIChrZXksIHJvbGUpIHtcbiAgICAgICAgaWYgKHJvbGUuX3R5cGVNYXApIHtcbiAgICAgICAgICAgIHZhbHVlVHlwZSA9IHJvbGUuX3R5cGVNYXBbcm9sZS5tYXAobmFtZSldIHx8IHZhbHVlVHlwZTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHZhbHVlVHlwZTtcbn1cblxuLypcbiAgICBDaGVjayB2YWx1ZSBmb3Igc3BlY2lhbCB0eXBlXG5cbiAgICBAcGFyYW0gW29iamVjdF1cbiAgICBAcGFyYW0gW29iamVjdF1cbiAgICBAcGFyYW0gW29iamVjdF1cbiAgICBAcGFyYW0gW3N0cmluZ11cbiAgICBAcmV0dXJucyBbc3RyaW5nIHx8IGZhbHNlXVxuKi9cbmZ1bmN0aW9uIGNoZWNrVmFsdWVUeXBlKGV4aXN0aW5nVmFsdWUsIG5ld1ZhbHVlLCBzY29wZSwgdmFsdWVOYW1lKSB7XG4gICAgdmFyIHZhbHVlVHlwZTtcblxuICAgIC8vIENoZWNrIGV4aXN0aW5nIHZhbHVlIGZvciB0eXBlIGFscmVhZHkgc2V0XG4gICAgaWYgKGV4aXN0aW5nVmFsdWUgJiYgZXhpc3RpbmdWYWx1ZS50eXBlKSB7XG4gICAgICAgIHZhbHVlVHlwZSA9IGV4aXN0aW5nVmFsdWUudHlwZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBPciBjaGVjayBSb2xlIF90eXBlTWFwIHByb3BlcnRpZXNcbiAgICAgICAgaWYgKHNjb3BlLnJvbGVzKSB7XG4gICAgICAgICAgICB2YWx1ZVR5cGUgPSBjaGVja1JvbGVzKHZhbHVlTmFtZSwgc2NvcGUucm9sZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmluYWxseSBydW4gdGVzdHNcbiAgICAgICAgaWYgKCF2YWx1ZVR5cGUgJiYgdXRpbHMuaXNTdHJpbmcobmV3VmFsdWUuY3VycmVudCkpIHtcbiAgICAgICAgICAgIHZhbHVlVHlwZSA9IHZhbHVlVHlwZXNNYW5hZ2VyLnRlc3QobmV3VmFsdWUuY3VycmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVUeXBlO1xufVxuXG4vKlxuICAgIFJlc29sdmUgYSBwcm9wZXJ0eVxuXG4gICAgQHBhcmFtIFtzdHJpbmddXG4gICAgQHBhcmFtIFtzdHJpbmcgfHwgZnVuY3Rpb24gfHwgbnVtYmVyXVxuICAgIEBwYXJhbSBbb2JqZWN0XVxuICAgIEBwYXJhbSBbb2JqZWN0XVxuICAgIEByZXR1cm5zIFtudW1iZXJdXG4qL1xuZnVuY3Rpb24gcmVzb2x2ZShuYW1lLCBwcm9wLCB2YWx1ZSwgc2NvcGUpIHtcbiAgICB2YXIgaXNOdW1lcmljYWxWYWx1ZSA9IGNoZWNrTnVtZXJpY2FsVmFsdWUobmFtZSk7XG5cbiAgICAvLyBJZiBmdW5jdGlvbiwgcmVzb2x2ZVxuICAgIGlmICh1dGlscy5pc0Z1bmMocHJvcCkgJiYgaXNOdW1lcmljYWxWYWx1ZSkge1xuICAgICAgICBwcm9wID0gcHJvcC5jYWxsKHNjb3BlLCBzY29wZSk7XG4gICAgfVxuXG4gICAgLy8gSWYgc3RyaW5nLCBjaGVjayBmb3IgcmVsYXRpdmUgbnVtYmVycyBhbmQgdW5pdHNcbiAgICBpZiAodXRpbHMuaXNTdHJpbmcocHJvcCkpIHtcbiAgICAgICAgLy8gSWYgcmVsYXRpdmUgdmFsdWVcbiAgICAgICAgaWYgKHByb3AuaW5kZXhPZignPScpID4gMCkge1xuICAgICAgICAgICAgcHJvcCA9IGNhbGMucmVsYXRpdmVWYWx1ZSh2YWx1ZS5jdXJyZW50LCBwcm9wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHVuaXRcbiAgICAgICAgaWYgKGlzTnVtZXJpY2FsVmFsdWUpIHtcbiAgICAgICAgICAgIHNwbGl0VW5pdChwcm9wLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNOdW1lcmljYWxWYWx1ZSkge1xuICAgICAgICBwcm9wID0gcGFyc2VGbG9hdChwcm9wKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvcDtcbn1cblxuLypcbiAgICBTcGxpdCBhIHZhbHVlIGludG8gc3ViLXZhbHVlc1xuXG4gICAgQHBhcmFtIFtzdHJpbmddXG4gICAgQHBhcmFtIFtvYmplY3RdXG4gICAgQHBhcmFtIFtvYmplY3RdXG4gICAgQHBhcmFtIFt2YWx1ZVR5cGVIYW5kbGVyXVxuICAgIEByZXR1cm5zIFtvYmplY3RdXG4qL1xuZnVuY3Rpb24gc3BsaXQobmFtZSwgdmFsdWUsIHNjb3BlLCB2YWx1ZVR5cGVIYW5kbGVyKSB7XG4gICAgdmFyIHNwbGl0VmFsdWVzID0ge30sXG4gICAgICAgIGkgPSAwO1xuXG4gICAgdmFyIF9sb29wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcHJvcE5hbWUgPSBudW1lcmljYWxWYWx1ZXNbaV07XG4gICAgICAgIHZhciBzcGxpdFByb3AgPSB7fTtcblxuICAgICAgICBpZiAodmFsdWUuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWVQcm9wID0gdmFsdWVbcHJvcE5hbWVdO1xuXG4gICAgICAgICAgICAvLyBJZiB3ZSBuZWVkIHRvIGZpcnN0IHJlc29sdmUgdGhpcywgcmVzb2x2ZVxuICAgICAgICAgICAgaWYgKHV0aWxzLmlzRnVuYyh2YWx1ZVByb3ApKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVQcm9wID0gdmFsdWVQcm9wLmNhbGwoc2NvcGUsIHNjb3BlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF1dGlscy5pc1N0cmluZyh2YWx1ZVByb3ApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdjb250aW51ZSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNwbGl0UHJvcCA9IHZhbHVlVHlwZUhhbmRsZXIuc3BsaXQodmFsdWVQcm9wKTtcblxuICAgICAgICAgICAgLy8gQXNzaWduIHNwbGl0IHByb3BlcnRpZXMgdG8gZWFjaCBjaGlsZCB2YWx1ZVxuICAgICAgICAgICAgZWFjaChzcGxpdFByb3AsIGZ1bmN0aW9uIChrZXksIHByb3ApIHtcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgbmV3IHZhbHVlIGlmIG5vbmUgZXhpc3RzXG4gICAgICAgICAgICAgICAgc3BsaXRWYWx1ZXNba2V5XSA9IHNwbGl0VmFsdWVzW2tleV0gfHwgdXRpbHMuY29weSh2YWx1ZVR5cGVzTWFuYWdlci5kZWZhdWx0UHJvcHModmFsdWUudHlwZSwga2V5KSk7XG4gICAgICAgICAgICAgICAgc3BsaXRWYWx1ZXNba2V5XVtwcm9wTmFtZV0gPSBwcm9wO1xuXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHNwbGl0UHJvcFtrZXldKSkge1xuICAgICAgICAgICAgICAgICAgICBzcGxpdFVuaXQoc3BsaXRWYWx1ZXNba2V5XVtwcm9wTmFtZV0sIHNwbGl0VmFsdWVzW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZvciAoOyBpIDwgbnVtTnVtZXJpY2FsVmFsdWVzOyBpKyspIHtcbiAgICAgICAgdmFyIF9yZXQgPSBfbG9vcCgpO1xuXG4gICAgICAgIGlmIChfcmV0ID09PSAnY29udGludWUnKSBjb250aW51ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3BsaXRWYWx1ZXM7XG59XG5cbi8qXG4gICAgU3BsaXQgdmFsdWUgaW50byBudW1iZXIgYW5kIHVuaXQsIGFuZCBzZXQgdW5pdCB0byB2YWx1ZVxuXG4gICAgQHBhcmFtIFtzdHJpbmddXG4gICAgQHBhcmFtIFtvYmplY3RdXG4qL1xuZnVuY3Rpb24gc3BsaXRVbml0KHByb3BlcnR5LCBob3N0VmFsdWUpIHtcbiAgICBpZiAodXRpbHMuaXNOdW0ocHJvcGVydHkpKSB7XG4gICAgICAgIHJldHVybiBwcm9wZXJ0eTtcbiAgICB9XG4gICAgdmFyIHJldHVyblZhbCA9IHByb3BlcnR5O1xuXG4gICAgdmFyIF91dGlscyRzcGxpdFZhbFVuaXQgPSB1dGlscy5zcGxpdFZhbFVuaXQocHJvcGVydHkpO1xuXG4gICAgdmFyIHZhbHVlID0gX3V0aWxzJHNwbGl0VmFsVW5pdC52YWx1ZTtcbiAgICB2YXIgdW5pdCA9IF91dGlscyRzcGxpdFZhbFVuaXQudW5pdDtcblxuICAgIGlmICghaXNOYU4odmFsdWUpKSB7XG4gICAgICAgIHJldHVyblZhbCA9IHZhbHVlO1xuICAgICAgICBpZiAodW5pdCkge1xuICAgICAgICAgICAgaG9zdFZhbHVlLnVuaXQgPSB1bml0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldHVyblZhbDtcbn1cblxuLypcbiAgICBQcmVwcm9jZXNzIGluY29taW5nIHZhbHVlcywgc3BsaXR0aW5nIG5vbi1udW1lcmljYWwgdmFsdWVzXG4gICAgaW50byBzdWItdmFsdWVzIGllIGhleFxuXG4gICAgQHBhcmFtIFtvYmplY3RdXG4gICAgQHBhcmFtIFtvYmplY3RdXG4gICAgQHBhcmFtIFtvYmplY3RdXG4gICAgQHBhcmFtIFtzdHJpbmddXG4qL1xuZnVuY3Rpb24gcHJlcHJvY2VzcyhleGlzdGluZywgaW5jb21pbmcsIHNjb3BlLCBkZWZhdWx0UHJvcCkge1xuICAgIHZhciB2YWx1ZXMgPSB7fTtcblxuICAgIGVhY2goaW5jb21pbmcsIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgIHZhciBleGlzdGluZ1ZhbHVlID0gZXhpc3Rpbmdba2V5XSxcbiAgICAgICAgICAgIG5ld1ZhbHVlID0ge307XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzT2JqKHZhbHVlKSkge1xuICAgICAgICAgICAgbmV3VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlW2RlZmF1bHRQcm9wXSA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdmFsdWUgZG9lc24ndCBoYXZlIGEgc3BlY2lhbCB0eXBlLCBjaGVjayBmb3Igb25lXG4gICAgICAgIG5ld1ZhbHVlLnR5cGUgPSBjaGVja1ZhbHVlVHlwZShleGlzdGluZ1ZhbHVlLCBuZXdWYWx1ZSwgc2NvcGUsIGtleSk7XG4gICAgICAgIG5ld1ZhbHVlLndhdGNoID0gdXRpbHMuaXNTdHJpbmcobmV3VmFsdWUud2F0Y2gpID8gbmV3VmFsdWUud2F0Y2ggOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgdmFsdWVzW2tleV0gPSBuZXdWYWx1ZTtcblxuICAgICAgICAvLyBJZiB3ZSBoYXZlIGEgdHlwZSBwcm9wZXJ0eSwgc3BsaXQvYXNzaWduIGRlZmF1bHQgcHJvcHNcbiAgICAgICAgaWYgKG5ld1ZhbHVlLnR5cGUpIHtcbiAgICAgICAgICAgIHZhciB0eXBlSGFuZGxlciA9IHZhbHVlVHlwZXNNYW5hZ2VyW25ld1ZhbHVlLnR5cGVdO1xuXG4gICAgICAgICAgICAvLyBJZiB2YWx1ZVR5cGUgaGFuZGxlciBoYXMgYSBzcGxpdCBmdW5jdGlvbiwgc3BsaXQgdGhpcyB2YWx1ZVxuICAgICAgICAgICAgaWYgKHR5cGVIYW5kbGVyLnNwbGl0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHNwbGl0VmFsdWVzID0gc3BsaXQoa2V5LCBuZXdWYWx1ZSwgc2NvcGUsIHR5cGVIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZS5jaGlsZHJlbiA9IHt9O1xuXG4gICAgICAgICAgICAgICAgZWFjaChzcGxpdFZhbHVlcywgZnVuY3Rpb24gKGNoaWxkTmFtZSwgY2hpbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZFZhbHVlID0gdXRpbHMubWVyZ2UobmV3VmFsdWUsIGNoaWxkVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZFZhbHVlLnBhcmVudCA9IGNoaWxkVmFsdWUubmFtZSA9IGtleTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRWYWx1ZS5wcm9wTmFtZSA9IGNoaWxkTmFtZTtcblxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgY2hpbGRWYWx1ZS50eXBlO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgY2hpbGRWYWx1ZS5jaGlsZHJlbjtcblxuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZS5jaGlsZHJlbltjaGlsZE5hbWVdID0gdmFsdWVzW2tleSArIGNoaWxkTmFtZV0gPSBjaGlsZFZhbHVlO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVIYW5kbGVyLnRlbXBsYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlLnRlbXBsYXRlID0gZXhpc3RpbmdWYWx1ZSA/IGV4aXN0aW5nVmFsdWUudGVtcGxhdGUgOiB0eXBlSGFuZGxlci50ZW1wbGF0ZShuZXdWYWx1ZS5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBPciBqdXN0IGFzc2lnbiBkZWZhdWx0IHByb3BlcnRpZXMgZm9yIHRoaXMgdmFsdWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc1trZXldID0gdXRpbHMubWVyZ2UodmFsdWVUeXBlc01hbmFnZXIuZGVmYXVsdFByb3BzKG5ld1ZhbHVlLnR5cGUsIGtleSksIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB2YWx1ZXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgLypcbiAgICAgICAgRmxpcCB2YWx1ZSB0YXJnZXQvb3JpZ2luXG4gICAgKi9cbiAgICBmbGlwOiBmdW5jdGlvbiBmbGlwKHZhbHVlKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSB2YWx1ZS50YXJnZXQgIT09IHVuZGVmaW5lZCA/IHZhbHVlLnRhcmdldCA6IHZhbHVlLmN1cnJlbnQ7XG4gICAgICAgIHZhbHVlLnRhcmdldCA9IHZhbHVlLnRvID0gdmFsdWUub3JpZ2luO1xuICAgICAgICB2YWx1ZS5vcmlnaW4gPSB0YXJnZXQ7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIE1lcmdlIGV4aXN0aW5nIGFuZCBpbmNvbWluZyB2YWx1ZXMsIHJlc29sdmluZyBwcm9wZXJ0aWVzXG4gICAgICAgIHNldCBhcyBmdW5jdGlvbnMgYW5kIHNwbGl0dGluZyBub24tbnVtZXJpY2FsIHZhbHVlcyBpZSBoZXhcbiAgICAgICAgIEBwYXJhbSBbb2JqZWN0XVxuICAgICAgICBAcGFyYW0gW29iamVjdF1cbiAgICAgICAgQHBhcmFtIFtvYmplY3RdXG4gICAgICAgIEBwYXJhbSBbc3RyaW5nXSAob3B0aW9uYWwpXG4gICAgICAgIEBwYXJhbSBbb2JqZWN0XVxuICAgICAgICBAcmV0dXJucyBbb2JqZWN0XTogTmV3IHZhbHVlcyBvYmplY3RcbiAgICAqL1xuICAgIHByb2Nlc3M6IGZ1bmN0aW9uIHByb2Nlc3MoZXhpc3RpbmcsIGluY29taW5nLCBpbmhlcml0LCBkZWZhdWx0UHJvcCwgc2NvcGUpIHtcbiAgICAgICAgZXhpc3RpbmcgPSBleGlzdGluZyB8fCB7fTtcbiAgICAgICAgZGVmYXVsdFByb3AgPSBkZWZhdWx0UHJvcCB8fCAnY3VycmVudCc7XG4gICAgICAgIHZhciBwcmVwcm9jZXNzZWQgPSBwcmVwcm9jZXNzKGV4aXN0aW5nLCBpbmNvbWluZywgc2NvcGUsIGRlZmF1bHRQcm9wKTtcblxuICAgICAgICBlYWNoKHByZXByb2Nlc3NlZCwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBuZXdWYWx1ZSA9IGV4aXN0aW5nW2tleV0gfHwgdXRpbHMuY29weShkZWZhdWx0VmFsdWUpLFxuICAgICAgICAgICAgICAgIGhhc0NoaWxkcmVuID0gdmFsdWUuY2hpbGRyZW4gIT09IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uVmFsdWUgPSBpbmhlcml0LmFjdGlvbiA/IGluaGVyaXQuYWN0aW9uLmdldERlZmF1bHRWYWx1ZSgpIDoge307XG5cbiAgICAgICAgICAgIHZhbHVlLmFjdGlvbiA9IGluaGVyaXQuYWN0aW9uO1xuXG4gICAgICAgICAgICBlYWNoKGRlZmF1bHRBY3Rpb25WYWx1ZSwgZnVuY3Rpb24gKHByb3BOYW1lLCBkZWZhdWx0QWN0aW9uUHJvcCkge1xuICAgICAgICAgICAgICAgIG5ld1ZhbHVlW3Byb3BOYW1lXSA9IGluaGVyaXQuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpICYmICF2YWx1ZS5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkgPyBpbmhlcml0W3Byb3BOYW1lXSA6IGRlZmF1bHRBY3Rpb25Qcm9wO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGVhY2godmFsdWUsIGZ1bmN0aW9uICh2YWx1ZU5hbWUsIHZhbHVlUHJvcCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHByb3BlcnR5IGlzIG5vdCB1bmRlZmluZWQgb3IgYSBudW1iZXIsIHJlc29sdmVcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVQcm9wICE9PSB1bmRlZmluZWQgJiYgIWlzTnVtKHZhbHVlUHJvcCkgJiYgIWhhc0NoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlUHJvcCA9IHJlc29sdmUodmFsdWVOYW1lLCB2YWx1ZVByb3AsIG5ld1ZhbHVlLCBzY29wZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbmV3VmFsdWVbdmFsdWVOYW1lXSA9IHZhbHVlUHJvcDtcblxuICAgICAgICAgICAgICAgIC8vIFNldCBpbnRlcm5hbCB0YXJnZXQgaWYgdGhpcyBwcm9wZXJ0eSBpcyAndG8nXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlTmFtZSA9PT0gJ3RvJykge1xuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZS50YXJnZXQgPSBuZXdWYWx1ZS50bztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbmV3VmFsdWUub3JpZ2luID0gbmV3VmFsdWUuY3VycmVudDtcbiAgICAgICAgICAgIG5ld1ZhbHVlLmhhc1JhbmdlID0gaXNOdW0obmV3VmFsdWUubWluKSB8fCBpc051bShuZXdWYWx1ZS5tYXgpID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgICAgICAgICBleGlzdGluZ1trZXldID0gbmV3VmFsdWU7XG4gICAgICAgICAgICBzY29wZS51cGRhdGVPcmRlcihrZXksIHV0aWxzLmlzU3RyaW5nKG5ld1ZhbHVlLndhdGNoKSwgaGFzQ2hpbGRyZW4pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZXhpc3Rpbmc7XG4gICAgfVxufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgQ29udHJvbHMgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbnRyb2xzKGFjdG9yLCBhY3Rpb24sIGhhc1N0YXJ0ZWQpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbnRyb2xzKTtcblxuICAgICAgICB0aGlzLmFjdG9yID0gYWN0b3I7XG4gICAgICAgIHRoaXMuYWN0aW9uID0gYWN0aW9uO1xuXG4gICAgICAgIGlmIChoYXNTdGFydGVkKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gdGhpcy5iaW5kQWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbi5hY3RpdmF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKENvbnRyb2xzLCBbe1xuICAgICAgICBrZXk6IFwic3RhcnRcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHN0YXJ0KGlucHV0KSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gdGhpcy5iaW5kQWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmFjdG9yLnN0YXJ0KHRoaXMuaWQsIGlucHV0KTtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uLmFjdGl2YXRlKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcInN0b3BcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgICAgICB0aGlzLmFjdG9yLnVuYmluZEFjdGlvbih0aGlzLmlkKTtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6IFwicGF1c2VcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHBhdXNlKCkge1xuICAgICAgICAgICAgdGhpcy5hY3Rpb24uZGVhY3RpdmF0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogXCJyZXN1bWVcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlc3VtZSgpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uLmFjdGl2YXRlKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiBcInRvZ2dsZVwiLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdG9nZ2xlKCkge1xuICAgICAgICAgICAgdmFyIHJlc3VtZSA9IHRoaXMuYWN0b3IuaGFzQWN0aW9uKHRoaXMuaWQpID8gdGhpcy5yZXN1bWUgOiB0aGlzLnN0YXJ0O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWN0aW9uLmlzQWN0aXZlID8gdGhpcy5wYXVzZSgpIDogcmVzdW1lLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogXCJ0aGVuXCIsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiB0aGVuKCkge1xuICAgICAgICAgICAgdmFyIF9hY3RvcjtcblxuICAgICAgICAgICAgKF9hY3RvciA9IHRoaXMuYWN0b3IpLnRoZW4uYXBwbHkoX2FjdG9yLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogXCJiaW5kQWN0aW9uXCIsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBiaW5kQWN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWN0b3IuYmluZEFjdGlvbih0aGlzLmFjdGlvbiwgdGhpcy5pZCk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gQ29udHJvbHM7XG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRyb2xzOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgLy8gW251bWJlcl06IERlZmF1bHQgbWF4IHNpemUgb2YgaGlzdG9yeVxubWF4SGlzdG9yeVNpemUgPSAzLFxuXG4vKlxuICAgIEhpc3RvcnkgY29uc3RydWN0b3JcbiAgICBcbiAgICBAcGFyYW0gW3Zhcl06IFZhcmlhYmxlIHRvIHN0b3JlIGluIGZpcnN0IGhpc3Rvcnkgc2xvdFxuICAgIEBwYXJhbSBbaW50XSAob3B0aW9uYWwpOiBNYXhpbXVtIHNpemUgb2YgaGlzdG9yeVxuKi9cbkhpc3RvcnkgPSBmdW5jdGlvbiBIaXN0b3J5KG9iaiwgbWF4KSB7XG4gICAgdGhpcy5tYXggPSBtYXggfHwgbWF4SGlzdG9yeVNpemU7XG4gICAgdGhpcy5lbnRyaWVzID0gW107XG4gICAgdGhpcy5hZGQob2JqKTtcbn07XG5cbkhpc3RvcnkucHJvdG90eXBlID0ge1xuXG4gICAgLypcbiAgICAgICAgUHVzaCBuZXcgdmFyIHRvIGhpc3RvcnlcbiAgICAgICAgXG4gICAgICAgIFNoaWZ0IG91dCBvbGRlc3QgZW50cnkgaWYgd2UndmUgcmVhY2hlZCBtYXhpbXVtIGNhcGFjaXR5XG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW3Zhcl06IFZhcmlhYmxlIHRvIHB1c2ggaW50byBoaXN0b3J5LmVudHJpZXNcbiAgICAqL1xuICAgIGFkZDogZnVuY3Rpb24gYWRkKG9iaikge1xuICAgICAgICB2YXIgY3VycmVudFNpemUgPSB0aGlzLmdldFNpemUoKTtcblxuICAgICAgICB0aGlzLmVudHJpZXMucHVzaChvYmopO1xuXG4gICAgICAgIGlmIChjdXJyZW50U2l6ZSA+PSB0aGlzLm1heCkge1xuICAgICAgICAgICAgdGhpcy5lbnRyaWVzLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgR2V0IHZhcmlhYmxlIGF0IHNwZWNpZmllZCBpbmRleFxuICAgICAgICAgQHBhcmFtIFtpbnRdOiBJbmRleFxuICAgICAgICBAcmV0dXJuIFt2YXJdOiBWYXIgZm91bmQgYXQgc3BlY2lmaWVkIGluZGV4XG4gICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldChpKSB7XG4gICAgICAgIGkgPSB0eXBlb2YgaSA9PT0gJ251bWJlcicgPyBpIDogdGhpcy5nZXRTaXplKCkgLSAxO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmVudHJpZXNbaV07XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIEdldCB0aGUgc2Vjb25kIG5ld2VzdCBoaXN0b3J5IGVudHJ5XG4gICAgICAgIFxuICAgICAgICBAcmV0dXJuIFt2YXJdOiBFbnRyeSBmb3VuZCBhdCBpbmRleCBzaXplIC0gMlxuICAgICovXG4gICAgZ2V0UHJldmlvdXM6IGZ1bmN0aW9uIGdldFByZXZpb3VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQodGhpcy5nZXRTaXplKCkgLSAyKTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgR2V0IGN1cnJlbnQgaGlzdG9yeSBzaXplXG4gICAgICAgIFxuICAgICAgICBAcmV0dXJuIFtpbnRdOiBDdXJyZW50IGxlbmd0aCBvZiBlbnRyaWVzLmxlbmd0aFxuICAgICovXG4gICAgZ2V0U2l6ZTogZnVuY3Rpb24gZ2V0U2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW50cmllcy5sZW5ndGg7XG4gICAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhpc3Rvcnk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBRdWV1ZSA9IGZ1bmN0aW9uIFF1ZXVlKCkge1xuICAgIHRoaXMuY2xlYXIoKTtcbn07XG5cblF1ZXVlLnByb3RvdHlwZSA9IHtcblxuICAgIC8qXG4gICAgICAgIEFkZCBhIHNldCBvZiBhcmd1bWVudHMgdG8gcXVldWVcbiAgICAqL1xuICAgIGFkZDogZnVuY3Rpb24gYWRkKCkge1xuICAgICAgICB0aGlzLnF1ZXVlLnB1c2goW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgR2V0IG5leHQgc2V0IG9mIGFyZ3VtZW50cyBmcm9tIHF1ZXVlXG4gICAgKi9cbiAgICBuZXh0OiBmdW5jdGlvbiBuZXh0KGRpcmVjdGlvbikge1xuICAgICAgICB2YXIgcXVldWUgPSB0aGlzLnF1ZXVlLFxuICAgICAgICAgICAgcmV0dXJuVmFsID0gZmFsc2UsXG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuaW5kZXg7XG5cbiAgICAgICAgZGlyZWN0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA/IGRpcmVjdGlvbiA6IDE7XG5cbiAgICAgICAgLy8gSWYgb3VyIGluZGV4IGlzIGJldHdlZW4gMCBhbmQgdGhlIHF1ZXVlIGxlbmd0aCwgcmV0dXJuIHRoYXQgaXRlbVxuICAgICAgICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8IHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuVmFsID0gcXVldWVbaW5kZXhdO1xuICAgICAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4ICsgZGlyZWN0aW9uO1xuXG4gICAgICAgICAgICAvLyBPciBjbGVhclxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0dXJuVmFsO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAgICBSZXBsYWNlIHF1ZXVlIHdpdGggZW1wdHkgYXJyYXlcbiAgICAqL1xuICAgIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5xdWV1ZSA9IFtdO1xuICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFF1ZXVlOyIsIi8qXG4gICAgQ2FsY3VsYXRvcnNcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgXG4gICAgU2ltcGxlIEkvTyBzbmlwcGV0c1xuKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzLmpzJyksXG4gICAgY2FsYyA9IHtcblxuICAgIC8qXG4gICAgICAgIEFuZ2xlIGJldHdlZW4gcG9pbnRzXG4gICAgICAgIFxuICAgICAgICBUcmFuc2xhdGVzIHRoZSBoeXBvdGhldGljYWwgbGluZSBzbyB0aGF0IHRoZSAnZnJvbScgY29vcmRpbmF0ZXNcbiAgICAgICAgYXJlIGF0IDAsMCwgdGhlbiByZXR1cm4gdGhlIGFuZ2xlIHVzaW5nIC5hbmdsZUZyb21DZW50ZXIoKVxuICAgICAgICBcbiAgICAgICAgQHBhcmFtIFtvYmplY3RdOiBYIGFuZCBZIGNvb3JkaW5hdGVzIG9mIGZyb20gcG9pbnRcbiAgICAgICAgQHBhcmFtIFtvYmplY3RdOiBYIGFuZCBZIGNvcmRpbmF0ZXMgb2YgdG8gcG9pbnRcbiAgICAgICAgQHJldHVybiBbcmFkaWFuXTogQW5nbGUgYmV0d2VlbiB0aGUgdHdvIHBvaW50cyBpbiByYWRpYW5zXG4gICAgKi9cbiAgICBhbmdsZTogZnVuY3Rpb24gYW5nbGUocG9pbnRBLCBwb2ludEIpIHtcbiAgICAgICAgdmFyIGZyb20gPSBwb2ludEIgPyBwb2ludEEgOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgICAgIHRvID0gcG9pbnRCIHx8IHBvaW50QSxcbiAgICAgICAgICAgIHBvaW50ID0ge1xuICAgICAgICAgICAgeDogdG8ueCAtIGZyb20ueCxcbiAgICAgICAgICAgIHk6IHRvLnkgLSBmcm9tLnlcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcy5hbmdsZUZyb21DZW50ZXIocG9pbnQueCwgcG9pbnQueSk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIEFuZ2xlIGZyb20gY2VudGVyXG4gICAgICAgIFxuICAgICAgICBSZXR1cm5zIHRoZSBjdXJyZW50IGFuZ2xlLCBpbiByYWRpYW5zLCBvZiBhIGRlZmluZWQgcG9pbnRcbiAgICAgICAgZnJvbSBhIGNlbnRlciAoYXNzdW1lZCAwLDApXG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW251bWJlcl06IFggY29vcmRpbmF0ZSBvZiBzZWNvbmQgcG9pbnRcbiAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBZIGNvb3JkaW5hdGUgb2Ygc2Vjb25kIHBvaW50XG4gICAgICAgIEByZXR1cm4gW3JhZGlhbl06IEFuZ2xlIGJldHdlZW4gMCwgMCBhbmQgcG9pbnQgaW4gcmFkaWFuc1xuICAgICovXG4gICAgYW5nbGVGcm9tQ2VudGVyOiBmdW5jdGlvbiBhbmdsZUZyb21DZW50ZXIoeCwgeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yYWRpYW5zVG9EZWdyZWVzKE1hdGguYXRhbjIoeSwgeCkpO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAgICBDb252ZXJ0IGRlZ3JlZXMgdG8gcmFkaWFuc1xuICAgICAgICBcbiAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBWYWx1ZSBpbiBkZWdyZWVzXG4gICAgICAgIEByZXR1cm4gW251bWJlcl06IFZhbHVlIGluIHJhZGlhbnNcbiAgICAqL1xuICAgIGRlZ3JlZXNUb1JhZGlhbnM6IGZ1bmN0aW9uIGRlZ3JlZXNUb1JhZGlhbnMoZGVncmVlcykge1xuICAgICAgICByZXR1cm4gZGVncmVlcyAqIE1hdGguUEkgLyAxODA7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIERpbGF0ZVxuICAgICAgICBcbiAgICAgICAgQ2hhbmdlIHRoZSBwcm9ncmVzc2lvbiBiZXR3ZWVuIGEgYW5kIGIgYWNjb3JkaW5nIHRvIGRpbGF0aW9uLlxuICAgICAgICBcbiAgICAgICAgU28gZGlsYXRpb24gPSAwLjUgd291bGQgY2hhbmdlXG4gICAgICAgIFxuICAgICAgICBhIC0tLS0tLS0tLSBiXG4gICAgICAgIFxuICAgICAgICB0b1xuICAgICAgICBcbiAgICAgICAgYSAtLS0tIGJcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbbnVtYmVyXTogUHJldmlvdXMgdmFsdWVcbiAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBDdXJyZW50IHZhbHVlXG4gICAgICAgIEBwYXJhbSBbbnVtYmVyXTogRGlsYXRlIHByb2dyZXNzIGJ5IHhcbiAgICAgICAgQHJldHVybiBbbnVtYmVyXTogUHJldmlvdXMgdmFsdWUgcGx1cyB0aGUgZGlsYXRlZCBkaWZmZXJlbmNlXG4gICAgKi9cbiAgICBkaWxhdGU6IGZ1bmN0aW9uIGRpbGF0ZShhLCBiLCBkaWxhdGlvbikge1xuICAgICAgICByZXR1cm4gYSArIChiIC0gYSkgKiBkaWxhdGlvbjtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgRGlzdGFuY2VcbiAgICAgICAgXG4gICAgICAgIFJldHVybnMgdGhlIGRpc3RhbmNlIGJldHdlZW4gKDAsMCkgYW5kIHBvaW50QSwgdW5sZXNzIHBvaW50QlxuICAgICAgICBpcyBwcm92aWRlZCwgdGhlbiB3ZSByZXR1cm4gdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgdHdvLlxuICAgICAgICBcbiAgICAgICAgQHBhcmFtIFtvYmplY3QvbnVtYmVyXTogeCBhbmQgeSBvciBqdXN0IHggb2YgcG9pbnQgQVxuICAgICAgICBAcGFyYW0gW29iamVjdC9udW1iZXJdOiAob3B0aW9uYWwpOiB4IGFuZCB5IG9yIGp1c3QgeCBvZiBwb2ludCBCXG4gICAgICAgIEByZXR1cm4gW251bWJlcl06IFRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSB0d28gcG9pbnRzXG4gICAgKi9cbiAgICBkaXN0YW5jZTogZnVuY3Rpb24gZGlzdGFuY2UocG9pbnRBLCBwb2ludEIpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBwb2ludEEgPT09IFwibnVtYmVyXCIgPyB0aGlzLmRpc3RhbmNlMUQocG9pbnRBLCBwb2ludEIpIDogdGhpcy5kaXN0YW5jZTJEKHBvaW50QSwgcG9pbnRCKTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgRGlzdGFuY2UgMURcbiAgICAgICAgXG4gICAgICAgIFJldHVybnMgdGhlIGRpc3RhbmNlIGJldHdlZW4gcG9pbnQgQSBhbmQgcG9pbnQgQlxuICAgICAgICBcbiAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBQb2ludCBBXG4gICAgICAgIEBwYXJhbSBbbnVtYmVyXTogKG9wdGlvbmFsKTogUG9pbnQgQlxuICAgICAgICBAcmV0dXJuIFtudW1iZXJdOiBUaGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgdHdvIHBvaW50c1xuICAgICovXG4gICAgZGlzdGFuY2UxRDogZnVuY3Rpb24gZGlzdGFuY2UxRChwb2ludEEsIHBvaW50Qikge1xuICAgICAgICB2YXIgYklzTnVtID0gdHlwZW9mIHBvaW50QiA9PT0gJ251bWJlcicsXG4gICAgICAgICAgICBmcm9tID0gYklzTnVtID8gcG9pbnRBIDogMCxcbiAgICAgICAgICAgIHRvID0gYklzTnVtID8gcG9pbnRCIDogcG9pbnRBO1xuXG4gICAgICAgIHJldHVybiBhYnNvbHV0ZSh0byAtIGZyb20pO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAgICBEaXN0YW5jZSAyRFxuICAgICAgICBcbiAgICAgICAgUmV0dXJucyB0aGUgZGlzdGFuY2UgYmV0d2VlbiAoMCwwKSBhbmQgcG9pbnQgQSwgdW5sZXNzIHBvaW50IEJcbiAgICAgICAgaXMgcHJvdmlkZWQsIHRoZW4gd2UgcmV0dXJuIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIHR3by5cbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbb2JqZWN0XTogeCBhbmQgeSBvZiBwb2ludCBBXG4gICAgICAgIEBwYXJhbSBbb2JqZWN0XTogKG9wdGlvbmFsKTogeCBhbmQgeSBvZiBwb2ludCBCXG4gICAgICAgIEByZXR1cm4gW251bWJlcl06IFRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSB0d28gcG9pbnRzXG4gICAgKi9cbiAgICBkaXN0YW5jZTJEOiBmdW5jdGlvbiBkaXN0YW5jZTJEKHBvaW50QSwgcG9pbnRCKSB7XG4gICAgICAgIHZhciBiSXNPYmogPSB0eXBlb2YgcG9pbnRCID09PSBcIm9iamVjdFwiLFxuICAgICAgICAgICAgZnJvbSA9IGJJc09iaiA/IHBvaW50QSA6IHsgeDogMCwgeTogMCB9LFxuICAgICAgICAgICAgdG8gPSBiSXNPYmogPyBwb2ludEIgOiBwb2ludEEsXG4gICAgICAgICAgICBwb2ludCA9IHtcbiAgICAgICAgICAgIHg6IGFic29sdXRlKHRvLnggLSBmcm9tLngpLFxuICAgICAgICAgICAgeTogYWJzb2x1dGUodG8ueSAtIGZyb20ueSlcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcy5oeXBvdGVudXNlKHBvaW50LngsIHBvaW50LnkpO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAgICBIeXBvdGVudXNlXG4gICAgICAgIFxuICAgICAgICBSZXR1cm5zIHRoZSBoeXBvdGVudXNlLCBzaWRlIEMsIGdpdmVuIHRoZSBsZW5ndGhzIG9mIHNpZGVzIEEgYW5kIEIuXG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW251bWJlcl06IExlbmd0aCBvZiBBXG4gICAgICAgIEBwYXJhbSBbbnVtYmVyXTogTGVuZ3RoIG9mIEJcbiAgICAgICAgQHJldHVybiBbbnVtYmVyXTogTGVuZ3RoIG9mIENcbiAgICAqL1xuICAgIGh5cG90ZW51c2U6IGZ1bmN0aW9uIGh5cG90ZW51c2UoYSwgYikge1xuICAgICAgICB2YXIgYTIgPSBhICogYSxcbiAgICAgICAgICAgIGIyID0gYiAqIGIsXG4gICAgICAgICAgICBjMiA9IGEyICsgYjI7XG5cbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChjMik7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIE9mZnNldCBiZXR3ZWVuIHR3byBpbnB1dHNcbiAgICAgICAgXG4gICAgICAgIENhbGN1bGF0ZSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHR3byBkaWZmZXJlbnQgaW5wdXRzXG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW1BvaW50XTogRmlyc3QgaW5wdXRcbiAgICAgICAgQHBhcmFtIFtQb2ludF06IFNlY29uZCBpbnB1dFxuICAgICAgICBAcmV0dXJuIFtPZmZzZXRdOiBEaXN0YW5jZSBtZXRyaWNzIGJldHdlZW4gdHdvIHBvaW50c1xuICAgICovXG4gICAgb2Zmc2V0OiBmdW5jdGlvbiBvZmZzZXQoYSwgYikge1xuICAgICAgICB2YXIgb2Zmc2V0ID0ge307XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICAgICAgICAgIGlmIChiLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoYS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFtrZXldID0gYltrZXldIC0gYVtrZXldO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFtrZXldID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNOdW0ob2Zmc2V0LngpICYmIGlzTnVtKG9mZnNldC55KSkge1xuICAgICAgICAgICAgb2Zmc2V0LmFuZ2xlID0gdGhpcy5hbmdsZShhLCBiKTtcbiAgICAgICAgICAgIG9mZnNldC5kaXN0YW5jZSA9IHRoaXMuZGlzdGFuY2UyRChhLCBiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvZmZzZXQ7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIFBvaW50IGZyb20gYW5nbGUgYW5kIGRpc3RhbmNlXG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW29iamVjdF06IDJEIHBvaW50IG9mIG9yaWdpblxuICAgICAgICBAcGFyYW0gW251bWJlcl06IEFuZ2xlIGZyb20gb3JpZ2luXG4gICAgICAgIEBwYXJhbSBbbnVtYmVyXTogRGlzdGFuY2UgZnJvbSBvcmlnaW5cbiAgICAgICAgQHJldHVybiBbb2JqZWN0XTogQ2FsY3VsYXRlZCAyRCBwb2ludFxuICAgICovXG4gICAgcG9pbnRGcm9tQW5nbGVBbmREaXN0YW5jZTogZnVuY3Rpb24gcG9pbnRGcm9tQW5nbGVBbmREaXN0YW5jZShvcmlnaW4sIGFuZ2xlLCBkaXN0YW5jZSkge1xuICAgICAgICB2YXIgcG9pbnQgPSB7fTtcblxuICAgICAgICBwb2ludC54ID0gZGlzdGFuY2UgKiBNYXRoLmNvcyhhbmdsZSkgKyBvcmlnaW4ueDtcbiAgICAgICAgcG9pbnQueSA9IGRpc3RhbmNlICogTWF0aC5zaW4oYW5nbGUpICsgb3JpZ2luLnk7XG5cbiAgICAgICAgcmV0dXJuIHBvaW50O1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAgICBQcm9ncmVzcyB3aXRoaW4gZ2l2ZW4gcmFuZ2VcbiAgICAgICAgXG4gICAgICAgIEdpdmVuIGEgbG93ZXIgbGltaXQgYW5kIGFuIHVwcGVyIGxpbWl0LCB3ZSByZXR1cm4gdGhlIHByb2dyZXNzXG4gICAgICAgIChleHByZXNzZWQgYXMgYSBudW1iZXIgMC0xKSByZXByZXNlbnRlZCBieSB0aGUgZ2l2ZW4gdmFsdWUsIGFuZFxuICAgICAgICBsaW1pdCB0aGF0IHByb2dyZXNzIHRvIHdpdGhpbiAwLTEuXG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW251bWJlcl06IFZhbHVlIHRvIGZpbmQgcHJvZ3Jlc3Mgd2l0aGluIGdpdmVuIHJhbmdlXG4gICAgICAgIEBwYXJhbSBbbnVtYmVyXTogTG93ZXIgbGltaXQgaWYgZnVsbCByYW5nZSBnaXZlbiwgdXBwZXIgaWYgbm90XG4gICAgICAgIEBwYXJhbSBbbnVtYmVyXSAob3B0aW9uYWwpOiBVcHBlciBsaW1pdCBvZiByYW5nZVxuICAgICAgICBAcmV0dXJuIFtudW1iZXJdOiBQcm9ncmVzcyBvZiB2YWx1ZSB3aXRoaW4gcmFuZ2UgYXMgZXhwcmVzc2VkIDAtMVxuICAgICovXG4gICAgcHJvZ3Jlc3M6IGZ1bmN0aW9uIHByb2dyZXNzKHZhbHVlLCBsaW1pdEEsIGxpbWl0Qikge1xuICAgICAgICB2YXIgYklzTnVtID0gdHlwZW9mIGxpbWl0QiA9PT0gJ251bWJlcicsXG4gICAgICAgICAgICBmcm9tID0gYklzTnVtID8gbGltaXRBIDogMCxcbiAgICAgICAgICAgIHRvID0gYklzTnVtID8gbGltaXRCIDogbGltaXRBLFxuICAgICAgICAgICAgcmFuZ2UgPSB0byAtIGZyb20sXG4gICAgICAgICAgICBwcm9ncmVzcyA9ICh2YWx1ZSAtIGZyb20pIC8gcmFuZ2U7XG5cbiAgICAgICAgcmV0dXJuIHByb2dyZXNzO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAgICBDb252ZXJ0IHJhZGlhbnMgdG8gZGVncmVlc1xuICAgICAgICBcbiAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBWYWx1ZSBpbiByYWRpYW5zXG4gICAgICAgIEByZXR1cm4gW251bWJlcl06IFZhbHVlIGluIGRlZ3JlZXNcbiAgICAqL1xuICAgIHJhZGlhbnNUb0RlZ3JlZXM6IGZ1bmN0aW9uIHJhZGlhbnNUb0RlZ3JlZXMocmFkaWFucykge1xuICAgICAgICByZXR1cm4gcmFkaWFucyAqIDE4MCAvIE1hdGguUEk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIFJldHVybiByYW5kb20gbnVtYmVyIGJldHdlZW4gcmFuZ2VcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbbnVtYmVyXSAob3B0aW9uYWwpOiBPdXRwdXQgbWluaW11bVxuICAgICAgICBAcGFyYW0gW251bWJlcl0gKG9wdGlvbmFsKTogT3V0cHV0IG1heGltdW1cbiAgICAgICAgQHJldHVybiBbbnVtYmVyXTogUmFuZG9tIG51bWJlciB3aXRoaW4gcmFuZ2UsIG9yIDAgYW5kIDEgaWYgbm9uZSBwcm92aWRlZFxuICAgICovXG4gICAgcmFuZG9tOiBmdW5jdGlvbiByYW5kb20obWluLCBtYXgpIHtcbiAgICAgICAgbWluID0gaXNOdW0obWluKSA/IG1pbiA6IDA7XG4gICAgICAgIG1heCA9IGlzTnVtKG1heCkgPyBtYXggOiAxO1xuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAgICBDYWxjdWxhdGUgcmVsYXRpdmUgdmFsdWVcbiAgICAgICAgXG4gICAgICAgIFRha2VzIHRoZSBvcGVyYXRvciBhbmQgdmFsdWUgZnJvbSBhIHN0cmluZywgaWUgXCIrPTVcIiwgYW5kIGFwcGxpZXNcbiAgICAgICAgdG8gdGhlIGN1cnJlbnQgdmFsdWUgdG8gcmVzb2x2ZSBhIG5ldyB0YXJnZXQuXG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW251bWJlcl06IEN1cnJlbnQgdmFsdWVcbiAgICAgICAgQHBhcmFtIFtzdHJpbmddOiBSZWxhdGl2ZSB2YWx1ZVxuICAgICAgICBAcmV0dXJuIFtudW1iZXJdOiBOZXcgdmFsdWVcbiAgICAqL1xuICAgIHJlbGF0aXZlVmFsdWU6IGZ1bmN0aW9uIHJlbGF0aXZlVmFsdWUoY3VycmVudCwgcmVsKSB7XG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IGN1cnJlbnQsXG4gICAgICAgICAgICBlcXVhdGlvbiA9IHJlbC5zcGxpdCgnPScpLFxuICAgICAgICAgICAgb3BlcmF0b3IgPSBlcXVhdGlvblswXSxcbiAgICAgICAgICAgIHNwbGl0VmFsID0gdXRpbHMuc3BsaXRWYWxVbml0KGVxdWF0aW9uWzFdKTtcblxuICAgICAgICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgICAgICAgICBjYXNlICcrJzpcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZSArPSBzcGxpdFZhbC52YWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJy0nOlxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlIC09IHNwbGl0VmFsLnZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnKic6XG4gICAgICAgICAgICAgICAgbmV3VmFsdWUgKj0gc3BsaXRWYWwudmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcvJzpcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZSAvPSBzcGxpdFZhbC52YWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzcGxpdFZhbC51bml0KSB7XG4gICAgICAgICAgICBuZXdWYWx1ZSArPSBzcGxpdFZhbC51bml0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAgICBSZXN0cmljdCB2YWx1ZSB0byByYW5nZVxuICAgICAgICBcbiAgICAgICAgUmV0dXJuIHZhbHVlIHdpdGhpbiB0aGUgcmFuZ2Ugb2YgbG93ZXJMaW1pdCBhbmQgdXBwZXJMaW1pdFxuICAgICAgICBcbiAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBWYWx1ZSB0byBrZWVwIHdpdGhpbiByYW5nZVxuICAgICAgICBAcGFyYW0gW251bWJlcl06IExvd2VyIGxpbWl0IG9mIHJhbmdlXG4gICAgICAgIEBwYXJhbSBbbnVtYmVyXTogVXBwZXIgbGltaXQgb2YgcmFuZ2VcbiAgICAgICAgQHJldHVybiBbbnVtYmVyXTogVmFsdWUgYXMgbGltaXRlZCB3aXRoaW4gZ2l2ZW4gcmFuZ2VcbiAgICAqL1xuICAgIHJlc3RyaWN0ZWQ6IGZ1bmN0aW9uIHJlc3RyaWN0ZWQodmFsdWUsIG1pbiwgbWF4KSB7XG4gICAgICAgIHZhciByZXN0cmljdGVkID0gbWluICE9PSB1bmRlZmluZWQgPyBNYXRoLm1heCh2YWx1ZSwgbWluKSA6IHZhbHVlO1xuICAgICAgICByZXN0cmljdGVkID0gbWF4ICE9PSB1bmRlZmluZWQgPyBNYXRoLm1pbihyZXN0cmljdGVkLCBtYXgpIDogcmVzdHJpY3RlZDtcblxuICAgICAgICByZXR1cm4gcmVzdHJpY3RlZDtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgQ29udmVydCB4IHBlciBzZWNvbmQgdG8gcGVyIGZyYW1lIHZlbG9jaXR5IGJhc2VkIG9uIGZwc1xuICAgICAgICBcbiAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBVbml0IHBlciBzZWNvbmRcbiAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBGcmFtZSBkdXJhdGlvbiBpbiBtc1xuICAgICovXG4gICAgc3BlZWRQZXJGcmFtZTogZnVuY3Rpb24gc3BlZWRQZXJGcmFtZSh4cHMsIGZyYW1lRHVyYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIGlzTnVtKHhwcykgPyB4cHMgLyAoMTAwMCAvIGZyYW1lRHVyYXRpb24pIDogMDtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgQ29udmVydCB2ZWxvY2l0eSBpbnRvIHZlbGljaXR5IHBlciBzZWNvbmRcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbbnVtYmVyXTogVW5pdCBwZXIgZnJhbWVcbiAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBGcmFtZSBkdXJhdGlvbiBpbiBtc1xuICAgICovXG4gICAgc3BlZWRQZXJTZWNvbmQ6IGZ1bmN0aW9uIHNwZWVkUGVyU2Vjb25kKHZlbG9jaXR5LCBmcmFtZUR1cmF0aW9uKSB7XG4gICAgICAgIHJldHVybiB2ZWxvY2l0eSAqICgxMDAwIC8gZnJhbWVEdXJhdGlvbik7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIFZhbHVlIGluIHJhbmdlIGZyb20gcHJvZ3Jlc3NcbiAgICAgICAgXG4gICAgICAgIEdpdmVuIGEgbG93ZXIgbGltaXQgYW5kIGFuIHVwcGVyIGxpbWl0LCB3ZSByZXR1cm4gdGhlIHZhbHVlIHdpdGhpblxuICAgICAgICB0aGF0IHJhbmdlIGFzIGV4cHJlc3NlZCBieSBwcm9ncmVzcyAoYSBudW1iZXIgZnJvbSAwLTEpXG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW251bWJlcl06IFRoZSBwcm9ncmVzcyBiZXR3ZWVuIGxvd2VyIGFuZCB1cHBlciBsaW1pdHMgZXhwcmVzc2VkIDAtMVxuICAgICAgICBAcGFyYW0gW251bWJlcl06IExvd2VyIGxpbWl0IG9mIHJhbmdlLCBvciB1cHBlciBpZiBsaW1pdDIgbm90IHByb3ZpZGVkXG4gICAgICAgIEBwYXJhbSBbbnVtYmVyXSAob3B0aW9uYWwpOiBVcHBlciBsaW1pdCBvZiByYW5nZVxuICAgICAgICBAcmV0dXJuIFtudW1iZXJdOiBWYWx1ZSBhcyBjYWxjdWxhdGVkIGZyb20gcHJvZ3Jlc3Mgd2l0aGluIHJhbmdlIChub3QgbGltaXRlZCB3aXRoaW4gcmFuZ2UpXG4gICAgKi9cbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUocHJvZ3Jlc3MsIGxpbWl0QSwgbGltaXRCKSB7XG4gICAgICAgIHZhciBiSXNOdW0gPSB0eXBlb2YgbGltaXRCID09PSAnbnVtYmVyJyxcbiAgICAgICAgICAgIGZyb20gPSBiSXNOdW0gPyBsaW1pdEEgOiAwLFxuICAgICAgICAgICAgdG8gPSBiSXNOdW0gPyBsaW1pdEIgOiBsaW1pdEE7XG5cbiAgICAgICAgcmV0dXJuIC1wcm9ncmVzcyAqIGZyb20gKyBwcm9ncmVzcyAqIHRvICsgZnJvbTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgRWFzZWQgdmFsdWUgaW4gcmFuZ2UgZnJvbSBwcm9ncmVzc1xuICAgICAgICBcbiAgICAgICAgR2l2ZW4gYSBsb3dlciBsaW1pdCBhbmQgYW4gdXBwZXIgbGltaXQsIHdlIHJldHVybiB0aGUgdmFsdWUgd2l0aGluXG4gICAgICAgIHRoYXQgcmFuZ2UgYXMgZXhwcmVzc2VkIGJ5IHByb2dyZXNzIChhIG51bWJlciBmcm9tIDAtMSlcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbbnVtYmVyXTogVGhlIHByb2dyZXNzIGJldHdlZW4gbG93ZXIgYW5kIHVwcGVyIGxpbWl0cyBleHByZXNzZWQgMC0xXG4gICAgICAgIEBwYXJhbSBbbnVtYmVyXTogTG93ZXIgbGltaXQgb2YgcmFuZ2UsIG9yIHVwcGVyIGlmIGxpbWl0MiBub3QgcHJvdmlkZWRcbiAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBVcHBlciBsaW1pdCBvZiByYW5nZVxuICAgICAgICBAcGFyYW0gW2Z1bmN0aW9uXTogRWFzaW5nIHRvIGFwcGx5IHRvIHZhbHVlXG4gICAgICAgIEByZXR1cm4gW251bWJlcl06IFZhbHVlIGFzIGNhbGN1bGF0ZWQgZnJvbSBwcm9ncmVzcyB3aXRoaW4gcmFuZ2UgKG5vdCBsaW1pdGVkIHdpdGhpbiByYW5nZSlcbiAgICAqL1xuICAgIHZhbHVlRWFzZWQ6IGZ1bmN0aW9uIHZhbHVlRWFzZWQocHJvZ3Jlc3MsIGZyb20sIHRvLCBlYXNpbmcpIHtcbiAgICAgICAgdmFyIGVhc2VkUHJvZ3Jlc3MgPSBlYXNpbmcocHJvZ3Jlc3MpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlKGVhc2VkUHJvZ3Jlc3MsIGZyb20sIHRvKTtcbiAgICB9XG59LFxuXG4vKlxuICAgIENhY2hpbmcgZnVuY3Rpb25zIHVzZWQgbXVsdGlwbGUgdGltZXMgdG8gcmVkdWNlIGZpbGVzaXplIGFuZCBpbmNyZWFzZSBwZXJmb3JtYW5jZVxuKi9cbmlzTnVtID0gdXRpbHMuaXNOdW0sXG4gICAgYWJzb2x1dGUgPSBNYXRoLmFicztcblxubW9kdWxlLmV4cG9ydHMgPSBjYWxjOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIEFjdG9yID0gcmVxdWlyZSgnLi4vYWN0b3IvQWN0b3InKSxcbiAgICBJdGVyYXRvciA9IHJlcXVpcmUoJy4uL2l0ZXJhdG9yL0l0ZXJhdG9yJyksXG4gICAgc2VsZWN0RG9tID0gcmVxdWlyZSgnLi9zZWxlY3QtZG9tJyk7XG5cbnZhciBTQVZFX1BST1AgPSAnX19wbV9hY3Rvcl8nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgIHZhciBvcHRzID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG5cbiAgICB2YXIgZG9tID0gc2VsZWN0RG9tKHNlbGVjdG9yKSxcbiAgICAgICAgYWN0b3JzID0gW107XG5cbiAgICBkb20uZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICB2YXIgYWN0b3IgPSBlbGVtZW50W1NBVkVfUFJPUF07XG5cbiAgICAgICAgaWYgKCFhY3Rvcikge1xuICAgICAgICAgICAgb3B0cy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgICAgIGFjdG9yID0gZWxlbWVudFtTQVZFX1BST1BdID0gbmV3IEFjdG9yKG9wdHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWN0b3JzLnB1c2goYWN0b3IpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGFjdG9ycy5sZW5ndGggPiAxID8gbmV3IEl0ZXJhdG9yKGFjdG9ycykgOiBhY3RvcnNbMF07XG59OyIsIi8qXG4gICAgQHBhcmFtIFtzdHJpbmcgfHwgTm9kZUxpc3QgfHwgalF1ZXJ5IG9iamVjdF06XG4gICAgICAgIElmIHN0cmluZywgdHJlYXRlZCBhcyBzZWxlY3Rvci5cbiAgICAgICAgSWYgbm90LCB0cmVhdGVkIGFzIHByZWV4aXN0aW5nIE5vZGVMaXN0IHx8IGpRdWVyeSBvYmplY3QuXG4qL1xuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgIHZhciBub2RlcyA9IHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSA6IHNlbGVjdG9yLFxuICAgICAgICBlbGVtZW50cyA9IFtdO1xuXG4gICAgLy8gSWYgalF1ZXJ5IHNlbGVjdGlvbiwgZ2V0IGFycmF5IG9mIEVsZW1lbnRzXG4gICAgaWYgKG5vZGVzLmdldCkge1xuICAgICAgICBlbGVtZW50cyA9IG5vZGVzLmdldCgpO1xuXG4gICAgICAgIC8vIE9yIGNvbnZlcnQgTm9kZUxpc3QgdG8gYXJyYXlcbiAgICB9IGVsc2UgaWYgKG5vZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgZWxlbWVudHMgPSBbXS5zbGljZS5jYWxsKG5vZGVzKTtcblxuICAgICAgICAgICAgLy8gT3IgaWYgaXQncyBqdXN0IGFuIEVsZW1lbnQsIHB1dCBpbnRvIGFycmF5XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHMucHVzaChub2Rlcyk7XG4gICAgICAgICAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudHM7XG59OyIsIi8qXG4gICAgVXRpbGl0eSBmdW5jdGlvbnNcbiovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIHByb3RlY3RlZFByb3BlcnRpZXMgPSBbJ3Njb3BlJywgJ2RvbSddLFxuICAgIGlzUHJvdGVjdGVkID0gZnVuY3Rpb24gaXNQcm90ZWN0ZWQoa2V5KSB7XG4gICAgcmV0dXJuIHByb3RlY3RlZFByb3BlcnRpZXMuaW5kZXhPZihrZXkpICE9PSAtMTtcbn0sXG5cbi8qXG4gICAgR2V0IHZhciB0eXBlIGFzIHN0cmluZ1xuICAgIFxuICAgIEBwYXJhbTogVmFyaWFibGUgdG8gdGVzdFxuICAgIEByZXR1cm4gW3N0cmluZ106IFJldHVybnMsIGZvciBpbnN0YW5jZSAnT2JqZWN0JyBpZiBbb2JqZWN0IE9iamVjdF1cbiovXG52YXJUeXBlID0gZnVuY3Rpb24gdmFyVHlwZSh2YXJpYWJsZSkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFyaWFibGUpLnNsaWNlKDgsIC0xKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgLypcbiAgICAgICAgSXRlcmF0ZSBvdmVyIGFuIG9iamVjdCBhbmQgZmlyZSBhIGNhbGxiYWNrIGZvciBldmVyeSBpdGVtIGluIGl0XG4gICAgICAgICBAcGFyYW0gW29iamVjdF06IFByb3BlcnRpZXNcbiAgICAgICAgQHBhcmFtIFtmdW5jdGlvbl06IENhbGxiYWNrIHRvIGZpcmVcbiAgICAqL1xuICAgIGVhY2g6IGZ1bmN0aW9uIGVhY2gocHJvcHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMocHJvcHMpLFxuICAgICAgICAgICAgbnVtS2V5cyA9IGtleXMubGVuZ3RoO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtS2V5czsgaSsrKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXSxcbiAgICAgICAgICAgICAgICBwcm9wID0gcHJvcHNba2V5XTtcblxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKGtleSwgcHJvcCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgSGFzIG9uZSBvYmplY3QgY2hhbmdlZCBmcm9tIHRoZSBvdGhlclxuICAgICAgICBcbiAgICAgICAgQ29tcGFyZXMgdGhlIHR3byBwcm92aWRlZCBpbnB1dHMgYW5kIHJldHVybnMgdHJ1ZSBpZiB0aGV5IGFyZSBkaWZmZXJlbnRcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbb2JqZWN0XTogSW5wdXQgQVxuICAgICAgICBAcGFyYW0gW29iamVjdF06IElucHV0IEJcbiAgICAgICAgQHJldHVybiBbYm9vbGVhbl06IFRydWUgaWYgZGlmZmVyZW50XG4gICAgKi9cbiAgICBoYXNDaGFuZ2VkOiBmdW5jdGlvbiBoYXNDaGFuZ2VkKGEsIGIpIHtcbiAgICAgICAgdmFyIGhhc0NoYW5nZWQgPSBmYWxzZSxcbiAgICAgICAgICAgIGtleSA9ICcnO1xuXG4gICAgICAgIGZvciAoa2V5IGluIGIpIHtcbiAgICAgICAgICAgIGlmIChhLmhhc093blByb3BlcnR5KGtleSkgJiYgYi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFba2V5XSAhPT0gYltrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGFzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaGFzQ2hhbmdlZDtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgSXMgdGhpcyB2YXIgYSBudW1iZXI/XG4gICAgICAgIFxuICAgICAgICBAcGFyYW06IFZhcmlhYmxlIHRvIHRlc3RcbiAgICAgICAgQHJldHVybiBbYm9vbGVhbl06IFJldHVybnMgdHJ1ZSBpZiB0eXBlb2YgPT09ICdudW1iZXInXG4gICAgKi9cbiAgICBpc051bTogZnVuY3Rpb24gaXNOdW0obnVtKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgbnVtID09PSAnbnVtYmVyJztcbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgSXMgdGhpcyB2YXIgYW4gb2JqZWN0P1xuICAgICAgICBcbiAgICAgICAgQHBhcmFtOiBWYXJpYWJsZSB0byB0ZXN0XG4gICAgICAgIEByZXR1cm4gW2Jvb2xlYW5dOiBSZXR1cm5zIHRydWUgaWYgdHlwZW9mID09PSAnb2JqZWN0J1xuICAgICovXG4gICAgaXNPYmo6IGZ1bmN0aW9uIGlzT2JqKG9iaikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCc7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIElzIHRoaXMgdmFyIGEgZnVuY3Rpb24gPyBcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbTogVmFyaWFibGUgdG8gdGVzdFxuICAgICAgICBAcmV0dXJuIFtib29sZWFuXTogUmV0dXJucyB0cnVlIGlmIHRoaXMudmFyVHlwZSA9PT0gJ0Z1bmN0aW9uJ1xuICAgICovXG4gICAgaXNGdW5jOiBmdW5jdGlvbiBpc0Z1bmMob2JqKSB7XG4gICAgICAgIHJldHVybiB2YXJUeXBlKG9iaikgPT09ICdGdW5jdGlvbic7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIElzIHRoaXMgdmFyIGEgc3RyaW5nID8gXG4gICAgICAgIFxuICAgICAgICBAcGFyYW06IFZhcmlhYmxlIHRvIHRlc3RcbiAgICAgICAgQHJldHVybiBbYm9vbGVhbl06IFJldHVybnMgdHJ1ZSBpZiB0eXBlb2Ygc3RyID09PSAnc3RyaW5nJ1xuICAgICovXG4gICAgaXNTdHJpbmc6IGZ1bmN0aW9uIGlzU3RyaW5nKHN0cikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHN0ciA9PT0gJ3N0cmluZyc7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIElzIHRoaXMgYSByZWxhdGl2ZSB2YWx1ZSBhc3NpZ25tZW50P1xuICAgICAgICBcbiAgICAgICAgQHBhcmFtIFtzdHJpbmddOiBWYXJpYWJsZSB0byB0ZXN0XG4gICAgICAgIEByZXR1cm4gW2Jvb2xlYW5dOiBJZiB0aGlzIGxvb2tzIGxpa2UgYSByZWxhdGl2ZSB2YWx1ZSBhc3NpZ25tZW50XG4gICAgKi9cbiAgICBpc1JlbGF0aXZlVmFsdWU6IGZ1bmN0aW9uIGlzUmVsYXRpdmVWYWx1ZSh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgJiYgdmFsdWUuaW5kZXhPZiAmJiB2YWx1ZS5pbmRleE9mKCc9JykgPiAwO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAgICBJcyB0aGlzIHZhciBhbiBhcnJheSA/IFxuICAgICAgICBcbiAgICAgICAgQHBhcmFtOiBWYXJpYWJsZSB0byB0ZXN0XG4gICAgICAgIEByZXR1cm4gW2Jvb2xlYW5dOiBSZXR1cm5zIHRydWUgaWYgdGhpcy52YXJUeXBlID09PSAnQXJyYXknXG4gICAgKi9cbiAgICBpc0FycmF5OiBmdW5jdGlvbiBpc0FycmF5KGFycikge1xuICAgICAgICByZXR1cm4gdmFyVHlwZShhcnIpID09PSAnQXJyYXknO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAgICBDb3B5IG9iamVjdCBvciBhcnJheVxuICAgICAgICBcbiAgICAgICAgQ2hlY2tzIHdoZXRoZXIgYmFzZSBpcyBhbiBhcnJheSBvciBvYmplY3QgYW5kIG1ha2VzXG4gICAgICAgIGFwcHJvcHJpYXRlIGNvcHlcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbYXJyYXkgfHwgb2JqZWN0XTogQXJyYXkgb3Igb2JqZWN0IHRvIGNvcHlcbiAgICAgICAgQHBhcmFtIFthcnJheSB8fCBvYmplY3RdOiBOZXcgY29weSBvZiBhcnJheSBvciBvYmplY3RcbiAgICAqL1xuICAgIGNvcHk6IGZ1bmN0aW9uIGNvcHkoYmFzZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0FycmF5KGJhc2UpID8gdGhpcy5jb3B5QXJyYXkoYmFzZSkgOiB0aGlzLmNvcHlPYmplY3QoYmFzZSk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIERlZXAgY29weSBhbiBvYmplY3RcbiAgICAgICAgXG4gICAgICAgIEl0ZXJhdGVzIG92ZXIgYW4gb2JqZWN0IGFuZCBjcmVhdGVzIGEgbmV3IGNvcHkgb2YgZXZlcnkgaXRlbSxcbiAgICAgICAgZGVlcCBjb3B5aW5nIGlmIGl0IGZpbmRzIGFueSBvYmplY3RzL2FycmF5c1xuICAgICAgICBcbiAgICAgICAgQHBhcmFtIFtvYmplY3RdOiBPYmplY3QgdG8gY29weVxuICAgICAgICBAcGFyYW0gW29iamVjdF06IE5ldyBjb3B5IG9mIG9iamVjdFxuICAgICovXG4gICAgY29weU9iamVjdDogZnVuY3Rpb24gY29weU9iamVjdChiYXNlKSB7XG4gICAgICAgIHZhciBuZXdPYmplY3QgPSB7fTtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYmFzZSkge1xuICAgICAgICAgICAgaWYgKGJhc2UuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIG5ld09iamVjdFtrZXldID0gdGhpcy5pc09iaihiYXNlW2tleV0pICYmICFpc1Byb3RlY3RlZChrZXkpID8gdGhpcy5jb3B5KGJhc2Vba2V5XSkgOiBiYXNlW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3T2JqZWN0O1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAgICBEZWVwIGNvcHkgYW4gYXJyYXlcbiAgICAgICAgXG4gICAgICAgIExvb3BzIHRocm91Z2ggYW4gYXJyYXkgYW5kIGNyZWF0ZXMgYSBuZXcgY29weSBvZiBldmVyeSBpdGVtLFxuICAgICAgICBkZWVwIGNvcHlpbmcgaWYgaXQgZmluZHMgYW55IG9iamVjdHMvYXJyYXlzXG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW2FycmF5XTogQXJyYXkgdG8gY29weVxuICAgICAgICBAcmV0dXJuIFthcnJheV06IE5ldyBjb3B5IG9mIGFycmF5XG4gICAgKi9cbiAgICBjb3B5QXJyYXk6IGZ1bmN0aW9uIGNvcHlBcnJheShiYXNlKSB7XG4gICAgICAgIHZhciBuZXdBcnJheSA9IFtdLFxuICAgICAgICAgICAgbGVuZ3RoID0gYmFzZS5sZW5ndGgsXG4gICAgICAgICAgICBpID0gMDtcblxuICAgICAgICBmb3IgKDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBuZXdBcnJheVtpXSA9IGJhc2VbaV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3QXJyYXk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIE5vbi1kZXN0cnVjdGl2ZSBtZXJnZSBvZiBvYmplY3Qgb3IgYXJyYXlcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbYXJyYXkgfHwgb2JqZWN0XTogQXJyYXkgb3Igb2JqZWN0IHRvIHVzZSBhcyBiYXNlXG4gICAgICAgIEBwYXJhbSBbYXJyYXkgfHwgb2JqZWN0XTogQXJyYXkgb3Igb2JqZWN0IHRvIG92ZXJ3cml0ZSBiYXNlIHdpdGhcbiAgICAgICAgQHJldHVybiBbYXJyYXkgfHwgb2JqZWN0XTogTmV3IGFycmF5IG9yIG9iamVjdFxuICAgICovXG4gICAgbWVyZ2U6IGZ1bmN0aW9uIG1lcmdlKGJhc2UsIG92ZXJ3cml0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0FycmF5KGJhc2UpID8gdGhpcy5jb3B5QXJyYXkob3ZlcndyaXRlKSA6IHRoaXMubWVyZ2VPYmplY3QoYmFzZSwgb3ZlcndyaXRlKTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgTm9uLWRlc3RydWN0aXZlIG1lcmdlIG9mIG9iamVjdFxuICAgICAgICBcbiAgICAgICAgQHBhcmFtIFtvYmplY3RdOiBPYmplY3QgdG8gdXNlIGFzIGJhc2VcbiAgICAgICAgQHBhcmFtIFtvYmplY3RdOiBPYmplY3QgdG8gb3ZlcndyaXRlIGJhc2Ugd2l0aFxuICAgICAgICBAcmV0dXJuIFtvYmplY3RdOiBOZXcgb2JqZWN0XG4gICAgKi9cbiAgICBtZXJnZU9iamVjdDogZnVuY3Rpb24gbWVyZ2VPYmplY3QoYmFzZSwgb3ZlcndyaXRlKSB7XG4gICAgICAgIHZhciBoYXNCYXNlID0gdGhpcy5pc09iaihiYXNlKSxcbiAgICAgICAgICAgIG5ld09iamVjdCA9IGhhc0Jhc2UgPyB0aGlzLmNvcHkoYmFzZSkgOiB0aGlzLmNvcHkob3ZlcndyaXRlKSxcbiAgICAgICAgICAgIGtleSA9ICcnO1xuXG4gICAgICAgIGlmIChoYXNCYXNlKSB7XG4gICAgICAgICAgICBmb3IgKGtleSBpbiBvdmVyd3JpdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAob3ZlcndyaXRlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3T2JqZWN0W2tleV0gPSB0aGlzLmlzT2JqKG92ZXJ3cml0ZVtrZXldKSAmJiAhaXNQcm90ZWN0ZWQoa2V5KSA/IHRoaXMubWVyZ2UoYmFzZVtrZXldLCBvdmVyd3JpdGVba2V5XSkgOiBvdmVyd3JpdGVba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld09iamVjdDtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgU3BsaXQgYSB2YWx1ZSBpbnRvIGEgdmFsdWUvdW5pdCBvYmplY3RcbiAgICAgICAgXG4gICAgICAgICAgICBcIjIwMHB4XCIgLT4geyB2YWx1ZTogMjAwLCB1bml0OiBcInB4XCIgfVxuICAgICAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbc3RyaW5nXTogVmFsdWUgdG8gc3BsaXRcbiAgICAgICAgQHJldHVybiBbb2JqZWN0XTogT2JqZWN0IHdpdGggdmFsdWUgYW5kIHVuaXQgcHJvcHNcbiAgICAqL1xuICAgIHNwbGl0VmFsVW5pdDogZnVuY3Rpb24gc3BsaXRWYWxVbml0KHZhbHVlKSB7XG4gICAgICAgIHZhciBzcGxpdFZhbCA9IHZhbHVlLm1hdGNoKC8oLT9cXGQqXFwuP1xcZCopKC4qKS8pO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogc3BsaXRWYWxbMV0sXG4gICAgICAgICAgICB1bml0OiBzcGxpdFZhbFsyXVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAgICBDcmVhdGUgc3RlcHBlZCB2ZXJzaW9uIG9mIDAtMSBwcm9ncmVzc1xuICAgICAgICBcbiAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBDdXJyZW50IHZhbHVlXG4gICAgICAgIEBwYXJhbSBbaW50XTogTnVtYmVyIG9mIHN0ZXBzXG4gICAgICAgIEByZXR1cm4gW251bWJlcl06IFN0ZXBwZWQgdmFsdWVcbiAgICAqL1xuICAgIHN0ZXBQcm9ncmVzczogZnVuY3Rpb24gc3RlcFByb2dyZXNzKHByb2dyZXNzLCBzdGVwcykge1xuICAgICAgICB2YXIgc2VnbWVudCA9IDEgLyAoc3RlcHMgLSAxKSxcbiAgICAgICAgICAgIHRhcmdldCA9IDEgLSAxIC8gc3RlcHMsXG4gICAgICAgICAgICBwcm9ncmVzc09mVGFyZ2V0ID0gTWF0aC5taW4ocHJvZ3Jlc3MgLyB0YXJnZXQsIDEpO1xuXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHByb2dyZXNzT2ZUYXJnZXQgLyBzZWdtZW50KSAqIHNlZ21lbnQ7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIEdlbmVyYXRlIGN1cnJlbnQgdGltZXN0YW1wXG4gICAgICAgIFxuICAgICAgICBAcmV0dXJuIFt0aW1lc3RhbXBdOiBDdXJyZW50IFVOSVggdGltZXN0YW1wXG4gICAgKi9cbiAgICBjdXJyZW50VGltZTogZnVuY3Rpb24gY3VycmVudFRpbWUoKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgcGVyZm9ybWFuY2UgIT09IFwidW5kZWZpbmVkXCIgPyBwZXJmb3JtYW5jZS5ub3coKSA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIH1cblxufTsiLCIvKlxuICAgIElucHV0IGNvbnRyb2xsZXJcbiovXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGNhbGMgPSByZXF1aXJlKCcuLi9pbmMvY2FsYy5qcycpLFxuICAgIHV0aWxzID0gcmVxdWlyZSgnLi4vaW5jL3V0aWxzLmpzJyksXG4gICAgSGlzdG9yeSA9IHJlcXVpcmUoJy4uL2luYy9IaXN0b3J5LmpzJyksXG5cbi8qXG4gICAgSW5wdXQgY29uc3RydWN0b3JcbiAgICBcbiAgICAgICAgU3ludGF4XG4gICAgICAgICAgICBuZXdJbnB1dChuYW1lLCB2YWx1ZVssIHBvbGxdKVxuICAgICAgICAgICAgICAgIEBwYXJhbSBbc3RyaW5nXTogTmFtZSBvZiB0byB0cmFja1xuICAgICAgICAgICAgICAgIEBwYXJhbSBbbnVtYmVyXTogSW5pdGlhbCB2YWx1ZVxuICAgICAgICAgICAgICAgIEBwYXJhbSBbZnVuY3Rpb25dIChvcHRpb25hbCk6IEZ1bmN0aW9uIHRvIHBvbGwgSW5wdXQgZGF0YVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgbmV3SW5wdXQocHJvcHNbLCBwb2xsXSlcbiAgICAgICAgICAgICAgICBAcGFyYW0gW29iamVjdF06IE9iamVjdCBvZiB2YWx1ZXNcbiAgICAgICAgICAgICAgICBAcGFyYW0gW2Z1bmN0aW9uXSAob3B0aW9uYWwpOiBGdW5jdGlvbiB0byBwb2xsIElucHV0IGRhdGFcbiAgICAgQHJldHVybiBbSW5wdXRdXG4qL1xuSW5wdXQgPSBmdW5jdGlvbiBJbnB1dCgpIHtcbiAgICB2YXIgcG9sbFBvcyA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuXG4gICAgdGhpcy5jdXJyZW50ID0ge307XG4gICAgdGhpcy5vZmZzZXQgPSB7fTtcbiAgICB0aGlzLnZlbG9jaXR5ID0ge307XG4gICAgdGhpcy5oaXN0b3J5ID0gbmV3IEhpc3RvcnkoKTtcbiAgICB0aGlzLnVwZGF0ZShhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSk7XG5cbiAgICBpZiAodXRpbHMuaXNGdW5jKGFyZ3VtZW50c1twb2xsUG9zXSkpIHtcbiAgICAgICAgdGhpcy5wb2xsID0gYXJndW1lbnRzW3BvbGxQb3NdO1xuICAgIH1cbn07XG5cbklucHV0LnByb3RvdHlwZSA9IHtcblxuICAgIC8vIFtudW1iZXJdOiBOdW1iZXIgb2YgZnJhbWVzIG9mIGluYWN0aXZpdHkgYmVmb3JlIHZlbG9jaXR5IGlzIHR1cm5lZCB0byAwXG4gICAgbWF4SW5hY3RpdmVGcmFtZXM6IDIsXG5cbiAgICAvLyBbbnVtYmVyXTogTnVtYmVyIG9mIGZyYW1lcyBpbnB1dCBoYXNuJ3QgYmVlbiB1cGRhdGVkXG4gICAgaW5hY3RpdmVGcmFtZXM6IDAsXG5cbiAgICAvKlxuICAgICAgICBHZXQgbGF0ZXN0IGlucHV0IHZhbHVlc1xuICAgICAgICBcbiAgICAgICAgQHBhcmFtIFtzdHJpbmddIChvcHRpb25hbCk6IE5hbWUgb2Ygc3BlY2lmaWMgcHJvcGVydHkgdG8gcmV0dXJuXG4gICAgICAgIEByZXR1cm4gW29iamVjdCB8fCBudW1iZXJdOiBMYXRlc3QgaW5wdXQgdmFsdWVzIG9yLCBpZiBzcGVjaWZpZWQsIHNpbmdsZSB2YWx1ZVxuICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQocHJvcCkge1xuICAgICAgICB2YXIgbGF0ZXN0ID0gdGhpcy5oaXN0b3J5LmdldCgpLFxuICAgICAgICAgICAgdmFsID0gcHJvcCAhPT0gdW5kZWZpbmVkID8gbGF0ZXN0W3Byb3BdIDogbGF0ZXN0O1xuXG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIFVwZGF0ZSB0aGUgaW5wdXQgdmFsdWVzXG4gICAgICAgIFxuICAgICAgICBTeW50YXhcbiAgICAgICAgICAgIGlucHV0LnVwZGF0ZShuYW1lLCB2YWx1ZSlcbiAgICAgICAgICAgICAgICBAcGFyYW0gW3N0cmluZ106IE5hbWUgb2YgdG8gdHJhY2tcbiAgICAgICAgICAgICAgICBAcGFyYW0gW251bWJlcl06IEluaXRpYWwgdmFsdWVcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGlucHV0LnVwZGF0ZShwcm9wcylcbiAgICAgICAgICAgICAgICBAcGFyYW0gW29iamVjdF06IE9iamVjdCBvZiB2YWx1ZXNcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgQHJldHVybiBbSW5wdXRdXG4gICAgKi9cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShhcmcwLCBhcmcxKSB7XG4gICAgICAgIHZhciB2YWx1ZXMgPSB7fTtcblxuICAgICAgICBpZiAodXRpbHMuaXNOdW0oYXJnMSkpIHtcbiAgICAgICAgICAgIHZhbHVlc1thcmcwXSA9IGFyZzE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZXMgPSBhcmcwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oaXN0b3J5LmFkZCh1dGlscy5tZXJnZSh0aGlzLmN1cnJlbnQsIHZhbHVlcykpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAgICBDaGVjayBmb3IgaW5wdXQgbW92ZW1lbnQgYW5kIHVwZGF0ZSBwb2ludGVyIG9iamVjdCdzIHByb3BlcnRpZXNcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbbnVtYmVyXTogVGltZXN0YW1wIG9mIGZyYW1lXG4gICAgICAgIEByZXR1cm4gW0lucHV0XVxuICAgICovXG4gICAgb25GcmFtZTogZnVuY3Rpb24gb25GcmFtZSh0aW1lc3RhbXApIHtcbiAgICAgICAgdmFyIGxhdGVzdCwgaGFzQ2hhbmdlZDtcblxuICAgICAgICAvLyBDaGVjayBwcm92aWRlZCB0aW1lc3RhbXAgYWdhaW5zdCBsYXN0RnJhbWUgdGltZXN0YW1wIGFuZCByZXR1cm4gaW5wdXQgaGFzIGFscmVhZHkgYmVlbiB1cGRhdGVkXG4gICAgICAgIGlmICh0aW1lc3RhbXAgPT09IHRoaXMubGFzdEZyYW1lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsYXRlc3QgPSB0aGlzLnBvbGwgPyB0aGlzLnBvbGwoKSA6IHRoaXMuaGlzdG9yeS5nZXQoKTtcbiAgICAgICAgaGFzQ2hhbmdlZCA9IHV0aWxzLmhhc0NoYW5nZWQodGhpcy5jdXJyZW50LCBsYXRlc3QpO1xuXG4gICAgICAgIC8vIElmIGlucHV0IGhhcyBjaGFuZ2VkIGJldHdlZW4gZnJhbWVzIFxuICAgICAgICBpZiAoaGFzQ2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eSA9IGNhbGMub2Zmc2V0KHRoaXMuY3VycmVudCwgbGF0ZXN0KTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudCA9IGxhdGVzdDtcbiAgICAgICAgICAgIHRoaXMuaW5hY3RpdmVGcmFtZXMgPSAwO1xuXG4gICAgICAgICAgICAvLyBPciBpdCBoYXNuJ3QgbW92ZWQgYW5kIG91ciBmcmFtZSBsaW1pdCBoYXMgYmVlbiByZWFjaGVkXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pbmFjdGl2ZUZyYW1lcyA+PSB0aGlzLm1heEluYWN0aXZlRnJhbWVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxvY2l0eSA9IGNhbGMub2Zmc2V0KHRoaXMuY3VycmVudCwgdGhpcy5jdXJyZW50KTtcblxuICAgICAgICAgICAgICAgIC8vIE9yIGlucHV0IGhhc24ndCBjaGFuZ2VkXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluYWN0aXZlRnJhbWVzKys7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGFzdEZyYW1lID0gdGltZXN0YW1wO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW5wdXQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBJbnB1dCA9IHJlcXVpcmUoJy4vSW5wdXQuanMnKSxcbiAgICBjdXJyZW50UG9pbnRlcixcbiAgICAvLyBTb3J0IHRoaXMgb3V0IGZvciBtdWx0aXRvdWNoXG5cblRPVUNITU9WRSA9ICd0b3VjaG1vdmUnLFxuICAgIE1PVVNFTU9WRSA9ICdtb3VzZW1vdmUnLFxuXG4vKlxuICAgIENvbnZlcnQgZXZlbnQgaW50byBwb2ludFxuICAgIFxuICAgIFNjcmFwZSB0aGUgeC95IGNvb3JkaW5hdGVzIGZyb20gdGhlIHByb3ZpZGVkIGV2ZW50XG4gICAgXG4gICAgQHBhcmFtIFtldmVudF06IE9yaWdpbmFsIHBvaW50ZXIgZXZlbnRcbiAgICBAcGFyYW0gW2Jvb2xlYW5dOiBUcnVlIGlmIHRvdWNoIGV2ZW50XG4gICAgQHJldHVybiBbb2JqZWN0XTogeC95IGNvb3JkaW5hdGVzIG9mIGV2ZW50XG4qL1xuZXZlbnRUb1BvaW50ID0gZnVuY3Rpb24gZXZlbnRUb1BvaW50KGV2ZW50LCBpc1RvdWNoRXZlbnQpIHtcbiAgICB2YXIgdG91Y2hDaGFuZ2VkID0gaXNUb3VjaEV2ZW50ID8gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0gOiBmYWxzZTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHg6IHRvdWNoQ2hhbmdlZCA/IHRvdWNoQ2hhbmdlZC5jbGllbnRYIDogZXZlbnQucGFnZVgsXG4gICAgICAgIHk6IHRvdWNoQ2hhbmdlZCA/IHRvdWNoQ2hhbmdlZC5jbGllbnRZIDogZXZlbnQucGFnZVlcbiAgICB9O1xufSxcblxuLypcbiAgICBHZXQgYWN0dWFsIGV2ZW50XG4gICAgXG4gICAgQ2hlY2tzIGZvciBqUXVlcnkncyAub3JpZ2luYWxFdmVudCBpZiBwcmVzZW50XG4gICAgXG4gICAgQHBhcmFtIFtldmVudCB8IGpRdWVyeSBldmVudF1cbiAgICBAcmV0dXJuIFtldmVudF06IFRoZSBhY3R1YWwgSlMgZXZlbnQgIFxuKi9cbmdldEFjdHVhbEV2ZW50ID0gZnVuY3Rpb24gZ2V0QWN0dWFsRXZlbnQoZXZlbnQpIHtcbiAgICByZXR1cm4gZXZlbnQub3JpZ2luYWxFdmVudCB8fCBldmVudDtcbn0sXG5cbi8qXG4gICAgUG9pbnRlciBjb25zdHJ1Y3RvclxuKi9cblBvaW50ZXIgPSBmdW5jdGlvbiBQb2ludGVyKGUpIHtcbiAgICB2YXIgZXZlbnQgPSBnZXRBY3R1YWxFdmVudChlKSxcbiAgICAgICAgLy8gSW4gY2FzZSBvZiBqUXVlcnkgZXZlbnRcbiAgICBpc1RvdWNoID0gZXZlbnQudG91Y2hlcyA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgc3RhcnRQb2ludCA9IGV2ZW50VG9Qb2ludChldmVudCwgaXNUb3VjaCk7XG5cbiAgICB0aGlzLnVwZGF0ZShzdGFydFBvaW50KTtcbiAgICB0aGlzLmlzVG91Y2ggPSBpc1RvdWNoO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xufSxcbiAgICBwcm90byA9IFBvaW50ZXIucHJvdG90eXBlID0gbmV3IElucHV0KCk7XG5cbi8qXG4gICAgQmluZCBtb3ZlIGV2ZW50XG4qL1xucHJvdG8uYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm1vdmVFdmVudCA9IHRoaXMuaXNUb3VjaCA/IFRPVUNITU9WRSA6IE1PVVNFTU9WRTtcblxuICAgIGN1cnJlbnRQb2ludGVyID0gdGhpcztcblxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHRoaXMubW92ZUV2ZW50LCB0aGlzLm9uTW92ZSk7XG59O1xuXG4vKlxuICAgIFVuYmluZCBtb3ZlIGV2ZW50XG4qL1xucHJvdG8udW5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMubW92ZUV2ZW50LCB0aGlzLm9uTW92ZSk7XG59O1xuXG4vKlxuICAgIFBvaW50ZXIgb25Nb3ZlIGV2ZW50IGhhbmRsZXJcbiAgICBcbiAgICBAcGFyYW0gW2V2ZW50XTogUG9pbnRlciBtb3ZlIGV2ZW50XG4qL1xucHJvdG8ub25Nb3ZlID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgbmV3UG9pbnQgPSBldmVudFRvUG9pbnQoZSwgY3VycmVudFBvaW50ZXIuaXNUb3VjaCk7XG4gICAgZSA9IGdldEFjdHVhbEV2ZW50KGUpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjdXJyZW50UG9pbnRlci51cGRhdGUobmV3UG9pbnQpO1xufTtcblxucHJvdG8uc3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnVuYmluZEV2ZW50cygpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQb2ludGVyOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbnZhciBBY3RvciA9IHJlcXVpcmUoJy4uL2FjdG9yL0FjdG9yJyksXG4gICAgVHdlZW4gPSByZXF1aXJlKCcuLi9hY3Rpb25zL1R3ZWVuJyksXG4gICAgdXRpbHMgPSByZXF1aXJlKCcuLi9pbmMvdXRpbHMnKTtcblxudmFyIERFRkFVTFRfU1RBR0dFUl9FQVNFID0gJ2xpbmVhcic7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlQ2FsbGJhY2sobWV0aG9kKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHJldHVybiB1dGlscy5pc1N0cmluZyhtZXRob2QpID8gZnVuY3Rpb24gKG1lbWJlcikge1xuICAgICAgICByZXR1cm4gbWVtYmVyW21ldGhvZF0uYXBwbHkobWVtYmVyLCBhcmdzKTtcbiAgICB9IDogbWV0aG9kO1xufVxuXG52YXIgSXRlcmF0b3IgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEl0ZXJhdG9yKG1lbWJlcnMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEl0ZXJhdG9yKTtcblxuICAgICAgICB0aGlzLmNsZWFyKCk7XG5cbiAgICAgICAgaWYgKG1lbWJlcnMpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkKG1lbWJlcnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc3RhZ2dlciA9IG5ldyBBY3RvcigpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhJdGVyYXRvciwgW3tcbiAgICAgICAga2V5OiAnYWRkJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGFkZChtZW1iZXJzKSB7XG4gICAgICAgICAgICB0aGlzLm1lbWJlcnMgPSB0aGlzLm1lbWJlcnMuY29uY2F0KG1lbWJlcnMpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NsZWFyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgICAgICAgdGhpcy5tZW1iZXJzID0gW107XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZWFjaCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBlYWNoKG1ldGhvZCkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIgPiAxID8gX2xlbjIgLSAxIDogMCksIF9rZXkyID0gMTsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICAgICAgICAgIGFyZ3NbX2tleTIgLSAxXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGdlbmVyYXRlQ2FsbGJhY2suYXBwbHkodW5kZWZpbmVkLCBbbWV0aG9kXS5jb25jYXQoYXJncykpO1xuICAgICAgICAgICAgdGhpcy5tZW1iZXJzLmZvckVhY2goY2FsbGJhY2spO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2VhY2hJbnRvTmV3JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGVhY2hJbnRvTmV3KG1ldGhvZCkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjMgPiAxID8gX2xlbjMgLSAxIDogMCksIF9rZXkzID0gMTsgX2tleTMgPCBfbGVuMzsgX2tleTMrKykge1xuICAgICAgICAgICAgICAgIGFyZ3NbX2tleTMgLSAxXSA9IGFyZ3VtZW50c1tfa2V5M107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGdlbmVyYXRlQ2FsbGJhY2suYXBwbHkodW5kZWZpbmVkLCBbbWV0aG9kXS5jb25jYXQoYXJncykpLFxuICAgICAgICAgICAgICAgIG5ld0l0ZXJhdG9yID0gbmV3IEl0ZXJhdG9yKCk7XG5cbiAgICAgICAgICAgIHRoaXMubWVtYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChtZW1iZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3SXRlcmF0b3IuYWRkKGNhbGxiYWNrKG1lbWJlcikpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXdJdGVyYXRvcjtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc3RhZ2dlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzdGFnZ2VyKG1ldGhvZCwgcHJvcHMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIF9sZW40ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW40ID4gMiA/IF9sZW40IC0gMiA6IDApLCBfa2V5NCA9IDI7IF9rZXk0IDwgX2xlbjQ7IF9rZXk0KyspIHtcbiAgICAgICAgICAgICAgICBhcmdzW19rZXk0IC0gMl0gPSBhcmd1bWVudHNbX2tleTRdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdGVtcE1lbWJlcnMgPSB1dGlscy5jb3B5QXJyYXkodGhpcy5tZW1iZXJzKSxcbiAgICAgICAgICAgICAgICBudW1NZW1iZXJzID0gdGVtcE1lbWJlcnMubGVuZ3RoLFxuICAgICAgICAgICAgICAgIHByb3BzSXNJbnRlcnZhbCA9IHV0aWxzLmlzTnVtKHByb3BzKSxcbiAgICAgICAgICAgICAgICBpbnRlcnZhbCA9IHByb3BzSXNJbnRlcnZhbCA/IHByb3BzIDogcHJvcHMuaW50ZXJ2YWwsXG4gICAgICAgICAgICAgICAgc3RhZ2dlclByb3BzID0ge30sXG4gICAgICAgICAgICAgICAgaSA9IC0xLFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gZ2VuZXJhdGVDYWxsYmFjay5hcHBseSh1bmRlZmluZWQsIFttZXRob2RdLmNvbmNhdChhcmdzKSk7XG5cbiAgICAgICAgICAgIHN0YWdnZXJQcm9wcy52YWx1ZXMgPSB7XG4gICAgICAgICAgICAgICAgaToge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50OiAtMC42LFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogaW50ZXJ2YWwgKiBudW1NZW1iZXJzLFxuICAgICAgICAgICAgICAgICAgICBlYXNlOiBwcm9wc0lzSW50ZXJ2YWwgPyBERUZBVUxUX1NUQUdHRVJfRUFTRSA6IHByb3BzLmVhc2UgfHwgREVGQVVMVF9TVEFHR0VSX0VBU0UsXG4gICAgICAgICAgICAgICAgICAgIHJvdW5kOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB0bzogbnVtTWVtYmVycyAtIDAuNlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHN0YWdnZXJQcm9wcy5vblVwZGF0ZSA9IGZ1bmN0aW9uIChvdXRwdXQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3SW5kZXggPSBvdXRwdXQuaSxcbiAgICAgICAgICAgICAgICAgICAgZ2FwSW5kZXggPSBpICsgMTtcblxuICAgICAgICAgICAgICAgIC8vIElmIG91ciBuZXcgaW5kZXggaXMgb25seSBvbmUgbW9yZSB0aGFuIHRoZSBwcmV2aW91cyBpbmRleCwgZmlyZSBpbW1lZGlldGx5XG4gICAgICAgICAgICAgICAgaWYgKG5ld0luZGV4ID09PSBpICsgMSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh0ZW1wTWVtYmVyc1tnYXBJbmRleF0sIGdhcEluZGV4KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBPciBsb29wIHRocm91Z2ggdGhlIGRpc3RhbmNlIHRvIGZpcmUgYWxsIGluZGVjaWVzLiBJbmNyZWFzZSBkZWxheS5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICg7IGdhcEluZGV4IDw9IG5ld0luZGV4OyBnYXBJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sodGVtcE1lbWJlcnNbZ2FwSW5kZXhdLCBnYXBJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGkgPSBuZXdJbmRleDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuX3N0YWdnZXIuc3RhcnQobmV3IFR3ZWVuKHN0YWdnZXJQcm9wcykpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qXG4gICAgICAgICAgICBBcnJheSBtYW5pcHVsYXRpb25cbiAgICAgICAgKi9cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JldmVyc2UnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmV2ZXJzZSgpIHtcbiAgICAgICAgICAgIHRoaXMubWVtYmVycy5yZXZlcnNlKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBJdGVyYXRvcjtcbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gSXRlcmF0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBwb3Btb3Rpb24gPSByZXF1aXJlKCcuLi9wb3Btb3Rpb24nKTtcblxuLypcbiAgICBBZGQgb3B0aW9uYWwgY3VzdG9tIHZhbHVlIHR5cGUgc3VwcG9ydFxuKi9cbnBvcG1vdGlvbi5hZGRWYWx1ZVR5cGUoe1xuICAgIGFscGhhOiByZXF1aXJlKCcuLi92YWx1ZS10eXBlcy9hbHBoYScpLFxuICAgIGFuZ2xlOiByZXF1aXJlKCcuLi92YWx1ZS10eXBlcy9hbmdsZScpLFxuICAgIHB4OiByZXF1aXJlKCcuLi92YWx1ZS10eXBlcy9weCcpLFxuICAgIGhzbDogcmVxdWlyZSgnLi4vdmFsdWUtdHlwZXMvaHNsJyksXG4gICAgcmdiOiByZXF1aXJlKCcuLi92YWx1ZS10eXBlcy9yZ2InKSxcbiAgICBoZXg6IHJlcXVpcmUoJy4uL3ZhbHVlLXR5cGVzL2hleCcpLFxuICAgIGNvbG9yOiByZXF1aXJlKCcuLi92YWx1ZS10eXBlcy9jb2xvcicpLFxuICAgIHBvc2l0aW9uczogcmVxdWlyZSgnLi4vdmFsdWUtdHlwZXMvcG9zaXRpb25zJyksXG4gICAgZGltZW5zaW9uczogcmVxdWlyZSgnLi4vdmFsdWUtdHlwZXMvZGltZW5zaW9ucycpLFxuICAgIHNjYWxlOiByZXF1aXJlKCcuLi92YWx1ZS10eXBlcy9zY2FsZScpLFxuICAgIHNoYWRvdzogcmVxdWlyZSgnLi4vdmFsdWUtdHlwZXMvc2hhZG93JyksXG4gICAgY29tcGxleDogcmVxdWlyZSgnLi4vdmFsdWUtdHlwZXMvY29tcGxleCcpXG59KTtcblxuLypcbiAgICBQcmVkZWZpbmVkIHJvbGVzXG4qL1xuXG5wb3Btb3Rpb24uYXR0ciA9IHJlcXVpcmUoJy4uL3JvbGVzL2F0dHIvYXR0clJvbGUnKTtcbnBvcG1vdGlvbi5jc3MgPSByZXF1aXJlKCcuLi9yb2xlcy9jc3MvY3NzUm9sZScpO1xucG9wbW90aW9uLnN2ZyA9IHJlcXVpcmUoJy4uL3JvbGVzL3N2Zy9zdmdSb2xlJyk7XG5wb3Btb3Rpb24uZHJhd1BhdGggPSByZXF1aXJlKCcuLi9yb2xlcy9wYXRoL2RyYXdQYXRoUm9sZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBvcG1vdGlvbjsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHZhbHVlVHlwZU1hbmFnZXIgPSByZXF1aXJlKCcuL3ZhbHVlLXR5cGVzL21hbmFnZXInKSxcbiAgICBQb3Btb3Rpb24gPSB7XG5cbiAgICBBY3RvcjogcmVxdWlyZSgnLi9hY3Rvci9BY3RvcicpLFxuXG4gICAgSW5wdXQ6IHJlcXVpcmUoJy4vaW5wdXQvSW5wdXQnKSxcblxuICAgIEl0ZXJhdG9yOiByZXF1aXJlKCcuL2l0ZXJhdG9yL0l0ZXJhdG9yJyksXG5cbiAgICBQcm9jZXNzOiByZXF1aXJlKCcuL3Byb2Nlc3MvUHJvY2VzcycpLFxuXG4gICAgRWFzaW5nOiByZXF1aXJlKCcuL2FjdGlvbnMvdHdlZW4vRWFzaW5nJyksXG5cbiAgICBSb2xlOiByZXF1aXJlKCcuL3JvbGVzL1JvbGUnKSxcblxuICAgIEFjdGlvbjogcmVxdWlyZSgnLi9hY3Rpb25zL0FjdGlvbicpLFxuICAgIFR3ZWVuOiByZXF1aXJlKCcuL2FjdGlvbnMvVHdlZW4nKSxcbiAgICBTaW11bGF0ZTogcmVxdWlyZSgnLi9hY3Rpb25zL1NpbXVsYXRlJyksXG4gICAgVHJhY2s6IHJlcXVpcmUoJy4vYWN0aW9ucy9UcmFjaycpLFxuXG4gICAgLypcbiAgICAgICAgQ3JlYXRlIGFuIEl0ZXJhdG9yIG9mIEFjdG9ycyB3aXRoIHNlbGVjdGVkIGRvbSBlbGVtZW50c1xuICAgICovXG4gICAgc2VsZWN0OiByZXF1aXJlKCcuL2luYy9zZWxlY3QtYWN0b3InKSxcblxuICAgIGFkZFZhbHVlVHlwZTogZnVuY3Rpb24gYWRkVmFsdWVUeXBlKCkge1xuICAgICAgICB2YWx1ZVR5cGVNYW5hZ2VyLmV4dGVuZC5hcHBseSh2YWx1ZVR5cGVNYW5hZ2VyLCBhcmd1bWVudHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgY2FsYzogcmVxdWlyZSgnLi9pbmMvY2FsYycpXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBvcG1vdGlvbjsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1hbmFnZXIgPSByZXF1aXJlKCcuL21hbmFnZXInKSxcblxuLypcbiAgICBQcm9jZXNzIGNvbnN0cnVjdG9yXG4gICAgXG4gICAgU3ludGF4XG4gICAgICAgIHZhciBwcm9jZXNzID0gbmV3IFByb2Nlc3Moc2NvcGUsIGNhbGxiYWNrKTtcbiAgICAgICAgdmFyIHByb2Nlc3MgPSBuZXcgUHJvY2VzcyhjYWxsYmFjayk7XG4qL1xuUHJvY2VzcyA9IGZ1bmN0aW9uIFByb2Nlc3Moc2NvcGUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGhhc1Njb3BlID0gY2FsbGJhY2sgIT09IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuY2FsbGJhY2sgPSBoYXNTY29wZSA/IGNhbGxiYWNrIDogc2NvcGU7XG4gICAgdGhpcy5zY29wZSA9IGhhc1Njb3BlID8gc2NvcGUgOiB0aGlzO1xuICAgIHRoaXMuaWQgPSBtYW5hZ2VyLnJlZ2lzdGVyKCk7XG5cbiAgICAvLyBbYm9vbGVhbl06IElzIHRoaXMgcHJvY2VzcyBjdXJyZW50bHkgYWN0aXZlP1xuICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbn07XG5cblByb2Nlc3MucHJvdG90eXBlID0ge1xuICAgIC8qXG4gICAgICAgIEZpcmUgY2FsbGJhY2tcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbdGltZXN0YW1wXTogVGltZXN0YW1wIG9mIGN1cnJlbnRseS1leGVjdXRlZCBmcmFtZVxuICAgICAgICBAcGFyYW0gW251bWJlcl06IFRpbWUgc2luY2UgbGFzdCBmcmFtZVxuICAgICovXG4gICAgZmlyZTogZnVuY3Rpb24gZmlyZSh0aW1lc3RhbXAsIGVsYXBzZWQpIHtcbiAgICAgICAgdGhpcy5jYWxsYmFjay5jYWxsKHRoaXMuc2NvcGUsIHRpbWVzdGFtcCwgZWxhcHNlZCk7XG5cbiAgICAgICAgLy8gSWYgd2UncmUgcnVubmluZyBhdCBhbiBpbnRlcnZhbCwgZGVhY3RpdmF0ZSBhZ2FpblxuICAgICAgICBpZiAodGhpcy5pc0ludGVydmFsKSB7XG4gICAgICAgICAgICB0aGlzLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAgICBTdGFydCBwcm9jZXNzXG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW2ludF06IER1cmF0aW9uIG9mIHByb2Nlc3MgaW4gbXMsIDAgaWYgaW5kZWZpbml0ZVxuICAgICAgICBAcmV0dXJuIFt0aGlzXVxuICAgICovXG4gICAgc3RhcnQ6IGZ1bmN0aW9uIHN0YXJ0KGR1cmF0aW9uKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuYWN0aXZhdGUoKTtcblxuICAgICAgICBpZiAoZHVyYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zdG9wKCk7XG4gICAgICAgICAgICB9LCBkdXJhdGlvbik7XG5cbiAgICAgICAgICAgIHRoaXMuaXNTdG9wVGltZXJBY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIFN0b3AgcHJvY2Vzc1xuICAgICAgICBcbiAgICAgICAgQHJldHVybiBbdGhpc11cbiAgICAqL1xuICAgIHN0b3A6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIEFjdGl2YXRlIHByb2Nlc3NcbiAgICAgICAgXG4gICAgICAgIEByZXR1cm4gW3RoaXNdXG4gICAgKi9cbiAgICBhY3RpdmF0ZTogZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICBtYW5hZ2VyLmFjdGl2YXRlKHRoaXMsIHRoaXMuaWQpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAgICBEZWFjdGl2YXRlIHByb2Nlc3NcbiAgICAgICAgXG4gICAgICAgIEByZXR1cm4gW3RoaXNdXG4gICAgKi9cbiAgICBkZWFjdGl2YXRlOiBmdW5jdGlvbiBkZWFjdGl2YXRlKCkge1xuICAgICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIG1hbmFnZXIuZGVhY3RpdmF0ZSh0aGlzLmlkKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgRmlyZSBwcm9jZXNzIGV2ZXJ5IHggbXNcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbaW50XTogTnVtYmVyIG9mIG1zIHRvIHdhaXQgYmV0d2VlbiByZWZpcmluZyBwcm9jZXNzLlxuICAgICAgICBAcmV0dXJuIFt0aGlzXVxuICAgICovXG4gICAgZXZlcnk6IGZ1bmN0aW9uIGV2ZXJ5KGludGVydmFsKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLnJlc2V0KCk7XG5cbiAgICAgICAgdGhpcy5pc0ludGVydmFsID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmludGVydmFsVGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLmFjdGl2YXRlKCk7XG4gICAgICAgIH0sIGludGVydmFsKTtcblxuICAgICAgICB0aGlzLmlzSW50ZXJ2YWxUaW1lQWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgQ2xlYXIgYWxsIHRpbWVyc1xuICAgICAgICBcbiAgICAgICAgQHBhcmFtIFxuICAgICovXG4gICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICB0aGlzLmlzSW50ZXJ2YWwgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5pc1N0b3BUaW1lckFjdGl2ZSkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc3RvcFRpbWVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzSW50ZXJ2YWxUaW1lQWN0aXZlKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxUaW1lcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2Nlc3M7IiwiLypcbiAgICBUaGUgbG9vcFxuKi9cblwidXNlIHN0cmljdFwiO1xuXG52YXIgVGltZXIgPSByZXF1aXJlKCcuL3RpbWVyLmpzJyksXG4gICAgdGljayA9IHJlcXVpcmUoJy4vdGljay5qcycpLFxuICAgIExvb3AgPSBmdW5jdGlvbiBMb29wKCkge1xuICAgIHRoaXMudGltZXIgPSBuZXcgVGltZXIoKTtcbn07XG5cbkxvb3AucHJvdG90eXBlID0ge1xuXG4gICAgLypcbiAgICAgICAgW2Jvb2xlYW5dOiBDdXJyZW50IHN0YXR1cyBvZiBhbmltYXRpb24gbG9vcFxuICAgICovXG4gICAgaXNSdW5uaW5nOiBmYWxzZSxcblxuICAgIC8qXG4gICAgICAgIEZpcmUgYWxsIGFjdGl2ZSBwcm9jZXNzZXMgb25jZSBwZXIgZnJhbWVcbiAgICAqL1xuICAgIGZyYW1lOiBmdW5jdGlvbiBmcmFtZSgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGZyYW1lc3RhbXAgPSBzZWxmLnRpbWVyLnVwZGF0ZSgpLFxuICAgICAgICAgICAgICAgIC8vIEN1cnJlbnRseSBqdXN0IG1lYXN1cmluZyBpbiBtcyAtIHdpbGwgbG9vayBpbnRvIGhpLXJlcyB0aW1lc3RhbXBzXG4gICAgICAgICAgICBpc0FjdGl2ZSA9IHNlbGYuY2FsbGJhY2suY2FsbChzZWxmLnNjb3BlLCBmcmFtZXN0YW1wLCBzZWxmLnRpbWVyLmdldEVsYXBzZWQoKSk7XG5cbiAgICAgICAgICAgIGlmIChpc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuZnJhbWUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAgICBTdGFydCBsb29wXG4gICAgKi9cbiAgICBzdGFydDogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSdyZSBub3QgYWxyZWFkeSBydW5uaW5nIGEgbG9vcFxuICAgICAgICBpZiAoIXRoaXMuaXNSdW5uaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWVyLmNsb2NrKCk7XG4gICAgICAgICAgICB0aGlzLmlzUnVubmluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmZyYW1lKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgU3RvcCB0aGUgbG9vcFxuICAgICovXG4gICAgc3RvcDogZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgU2V0IHRoZSBjYWxsYmFjayB0byBydW4gZXZlcnkgZnJhbWVcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbT2JqZWN0XTogRXhlY3V0aW9uIGNvbnRleHRcbiAgICAgICAgQHBhcmFtIFtmdW5jdGlvbl06IENhbGxiYWNrIHRvIGZpcmVcbiAgICAqL1xuICAgIHNldENhbGxiYWNrOiBmdW5jdGlvbiBzZXRDYWxsYmFjayhzY29wZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5zY29wZSA9IHNjb3BlO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBMb29wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciB0aGVMb29wID0gcmVxdWlyZSgnLi9sb29wLmpzJyksXG4gICAgUHJvY2Vzc01hbmFnZXIgPSBmdW5jdGlvbiBQcm9jZXNzTWFuYWdlcigpIHtcbiAgICB0aGlzLmFjdGl2ZUlkcyA9IFtdO1xuICAgIHRoaXMuYWN0aXZlUHJvY2Vzc2VzID0ge307XG4gICAgdGhpcy5kZWFjdGl2YXRlUXVldWUgPSBbXTtcbiAgICB0aGVMb29wLnNldENhbGxiYWNrKHRoaXMsIHRoaXMuZmlyZUFjdGl2ZSk7XG59O1xuXG5Qcm9jZXNzTWFuYWdlci5wcm90b3R5cGUgPSB7XG5cbiAgICAvKlxuICAgICAgICBbaW50XTogVXNlZCBmb3IgcHJvY2VzcyBJRFxuICAgICovXG4gICAgcHJvY2Vzc0NvdW50ZXI6IDAsXG5cbiAgICAvKlxuICAgICAgICBbaW50XTogTnVtYmVyIG9mIGFjdGl2ZSBwcm9jZXNzZXNcbiAgICAqL1xuICAgIGFjdGl2ZUNvdW50OiAwLFxuXG4gICAgLypcbiAgICAgICAgR2V0IHRoZSBwcm9jZXNzIHdpdGggYSBnaXZlbiBpbmRleFxuICAgICAgICBcbiAgICAgICAgQHBhcmFtIFtpbnRdOiBJbmRleCBvZiBwcm9jZXNzXG4gICAgICAgIEByZXR1cm4gW1Byb2Nlc3NdXG4gICAgKi9cbiAgICBnZXRQcm9jZXNzOiBmdW5jdGlvbiBnZXRQcm9jZXNzKGkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlUHJvY2Vzc2VzW2ldO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAgICBHZXQgbnVtYmVyIG9mIGFjdGl2ZSBwcm9jZXNzZXNcbiAgICAgICAgXG4gICAgICAgIEByZXR1cm4gW2ludF06IE51bWJlciBvZiBhY3RpdmUgcHJvY2Vzc2VzXG4gICAgKi9cbiAgICBnZXRBY3RpdmVDb3VudDogZnVuY3Rpb24gZ2V0QWN0aXZlQ291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZUNvdW50O1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAgICBHZXQgYWN0aXZlIHRva2Vuc1xuICAgICAgICAgQHJldHVybiBbYXJyYXldOiBBY3RpdmUgdG9rZW5zXG4gICAgKi9cbiAgICBnZXRBY3RpdmU6IGZ1bmN0aW9uIGdldEFjdGl2ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlSWRzO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAgICBHZXQgdGhlIGxlbmd0aCBvZiB0aGUgZGVhY3RpdmF0ZSBxdWV1ZVxuICAgICAgICBcbiAgICAgICAgQHJldHVybiBbaW50XTogTGVuZ3RoIG9mIHF1ZXVlXG4gICAgKi9cbiAgICBnZXRRdWV1ZUxlbmd0aDogZnVuY3Rpb24gZ2V0UXVldWVMZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlYWN0aXZhdGVRdWV1ZS5sZW5ndGg7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIEZpcmUgYWxsIGFjdGl2ZSBwcm9jZXNzZXNcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbaW50XTogVGltZXN0YW1wIG9mIGV4ZWN1dGluZyBmcmFtZXNcbiAgICAgICAgQHBhcmFtIFtpbnRdOiBUaW1lIHNpbmNlIHByZXZpb3VzIGZyYW1lXG4gICAgICAgIEByZXR1cm4gW2Jvb2xlYW5dOiBUcnVlIGlmIGFjdGl2ZSBwcm9jZXNzZXMgZm91bmRcbiAgICAqL1xuICAgIGZpcmVBY3RpdmU6IGZ1bmN0aW9uIGZpcmVBY3RpdmUoZnJhbWVzdGFtcCwgZWxhcHNlZCkge1xuICAgICAgICB2YXIgcHJvY2VzcyxcbiAgICAgICAgICAgIGFjdGl2ZUNvdW50ID0gMCxcbiAgICAgICAgICAgIGFjdGl2ZUlkcyA9IFtdLFxuICAgICAgICAgICAgaSA9IDA7XG5cbiAgICAgICAgLy8gUHVyZ2UgYW5kIGNoZWNrIGFjdGl2ZSBjb3VudCBiZWZvcmUgZXhlY3V0aW9uXG4gICAgICAgIHRoaXMucHVyZ2UoKTtcbiAgICAgICAgYWN0aXZlQ291bnQgPSB0aGlzLmdldEFjdGl2ZUNvdW50KCk7XG4gICAgICAgIGFjdGl2ZUlkcyA9IHRoaXMuZ2V0QWN0aXZlKCk7XG5cbiAgICAgICAgLy8gTG9vcCB0aHJvdWdoIGFjdGl2ZSBwcm9jZXNzZXMgYW5kIGZpcmUgY2FsbGJhY2tcbiAgICAgICAgZm9yICg7IGkgPCBhY3RpdmVDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBwcm9jZXNzID0gdGhpcy5nZXRQcm9jZXNzKGFjdGl2ZUlkc1tpXSk7XG5cbiAgICAgICAgICAgIGlmIChwcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5maXJlKGZyYW1lc3RhbXAsIGVsYXBzZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVwdXJnZSBhbmQgcmVjaGVjayBhY3RpdmUgY291bnQgYWZ0ZXIgZXhlY3V0aW9uXG4gICAgICAgIHRoaXMucHVyZ2UoKTtcbiAgICAgICAgYWN0aXZlQ291bnQgPSB0aGlzLmdldEFjdGl2ZUNvdW50KCk7XG5cbiAgICAgICAgLy8gUmV0dXJuIHRydWUgaWYgd2Ugc3RpbGwgaGF2ZSBhY3RpdmUgcHJvY2Vzc2VzLCBvciBmYWxzZSBpZiBub25lXG4gICAgICAgIHJldHVybiBhY3RpdmVDb3VudCA/IHRydWUgOiBmYWxzZTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgUmVnaXN0ZXIgYSBuZXcgcHJvY2Vzc1xuICAgICAgICBcbiAgICAgICAgQHBhcmFtIFtQcm9jZXNzXVxuICAgICAgICBAcmV0dXJuIFtpbnRdOiBJbmRleCBvZiBwcm9jZXNzIHRvIGJlIHVzZWQgYXMgSURcbiAgICAqL1xuICAgIHJlZ2lzdGVyOiBmdW5jdGlvbiByZWdpc3RlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc0NvdW50ZXIrKztcbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgQWN0aXZhdGUgYSBwcm9jZXNzXG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW2ludF06IEluZGV4IG9mIGFjdGl2ZSBwcm9jZXNzXG4gICAgKi9cbiAgICBhY3RpdmF0ZTogZnVuY3Rpb24gYWN0aXZhdGUocHJvY2VzcywgaSkge1xuICAgICAgICB2YXIgcXVldWVJbmRleCA9IHRoaXMuZGVhY3RpdmF0ZVF1ZXVlLmluZGV4T2YoaSksXG4gICAgICAgICAgICBpc1F1ZXVlZCA9IHF1ZXVlSW5kZXggPiAtMSxcbiAgICAgICAgICAgIGlzQWN0aXZlID0gdGhpcy5hY3RpdmVJZHMuaW5kZXhPZihpKSA+IC0xO1xuXG4gICAgICAgIC8vIFJlbW92ZSBmcm9tIGRlYWN0aXZhdGVRdWV1ZSBpZiBpbiB0aGVyZVxuICAgICAgICBpZiAoaXNRdWV1ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGVhY3RpdmF0ZVF1ZXVlLnNwbGljZShxdWV1ZUluZGV4LCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCB0byBhY3RpdmUgcHJvY2Vzc2VzIGFycmF5IGlmIG5vdCBhbHJlYWR5IGluIHRoZXJlXG4gICAgICAgIGlmICghaXNBY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSWRzLnB1c2goaSk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVByb2Nlc3Nlc1tpXSA9IHByb2Nlc3M7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUNvdW50Kys7XG4gICAgICAgICAgICB0aGVMb29wLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLypcbiAgICAgICAgRGVhY3RpdmF0ZSBhIHByb2Nlc3NcbiAgICAgICAgXG4gICAgICAgIEBwYXJhbSBbaW50XTogSW5kZXggb2YgcHJvY2VzcyB0byBhZGQgdG8gZGVhY3RpdmF0ZSBxdWV1ZVxuICAgICovXG4gICAgZGVhY3RpdmF0ZTogZnVuY3Rpb24gZGVhY3RpdmF0ZShpKSB7XG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZVF1ZXVlLnB1c2goaSk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIFB1cmdlIHRoZSBkZWFjdGl2YXRlIHF1ZXVlXG4gICAgKi9cbiAgICBwdXJnZTogZnVuY3Rpb24gcHVyZ2UoKSB7XG4gICAgICAgIHZhciBxdWV1ZUxlbmd0aCA9IHRoaXMuZ2V0UXVldWVMZW5ndGgoKSxcbiAgICAgICAgICAgIGFjdGl2ZUlkSW5kZXggPSAwLFxuICAgICAgICAgICAgaWRUb0RlbGV0ZSA9IDA7XG5cbiAgICAgICAgd2hpbGUgKHF1ZXVlTGVuZ3RoLS0pIHtcbiAgICAgICAgICAgIGlkVG9EZWxldGUgPSB0aGlzLmRlYWN0aXZhdGVRdWV1ZVtxdWV1ZUxlbmd0aF07XG4gICAgICAgICAgICBhY3RpdmVJZEluZGV4ID0gdGhpcy5hY3RpdmVJZHMuaW5kZXhPZihpZFRvRGVsZXRlKTtcblxuICAgICAgICAgICAgLy8gSWYgcHJvY2VzcyBpbiBhY3RpdmUgbGlzdCBkZWFjdGl2YXRlXG4gICAgICAgICAgICBpZiAoYWN0aXZlSWRJbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVJZHMuc3BsaWNlKGFjdGl2ZUlkSW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlQ291bnQtLTtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5hY3RpdmVQcm9jZXNzZXNbaWRUb0RlbGV0ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRlYWN0aXZhdGVRdWV1ZSA9IFtdO1xuICAgIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUHJvY2Vzc01hbmFnZXIoKTsiLCJcInVzZSBzdHJpY3RcIjtcbi8qXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHBvbHlmaWxsXG4gICAgXG4gICAgRm9yIElFOC85IEZsaW5zdG9uZXNcblxuICAgIFRha2VuIGZyb20gUGF1bCBJcmlzaC4gV2UndmUgc3RyaXBwZWQgb3V0IGNhbmNlbEFuaW1hdGlvbkZyYW1lIGNoZWNrcyBiZWNhdXNlIHdlIGRvbid0IGZveCB3aXRoIHRoYXRcbiAgICBcbiAgICBodHRwOi8vcGF1bGlyaXNoLmNvbS8yMDExL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtYW5pbWF0aW5nL1xuICAgIGh0dHA6Ly9teS5vcGVyYS5jb20vZW1vbGxlci9ibG9nLzIwMTEvMTIvMjAvcmVxdWVzdGFuaW1hdGlvbmZyYW1lLWZvci1zbWFydC1lci1hbmltYXRpbmdcbiAgICAgXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHBvbHlmaWxsIGJ5IEVyaWsgTcO2bGxlci4gZml4ZXMgZnJvbSBQYXVsIElyaXNoIGFuZCBUaW5vIFppamRlbFxuICAgICBcbiAgICBNSVQgbGljZW5zZVxuKi9cbnZhciB0aWNrLFxuICAgIGxhc3RUaW1lID0gMCxcbiAgICBoYXNXaW5kb3cgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJztcblxuaWYgKCFoYXNXaW5kb3cpIHtcbiAgICAvLyBMb2FkIHJBRiBzaGltXG4gICAgdGljayA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICB2YXIgY3VyclRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgICAgIHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAxNiAtIChjdXJyVGltZSAtIGxhc3RUaW1lKSksXG4gICAgICAgICAgICBpZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2FsbGJhY2soY3VyclRpbWUgKyB0aW1lVG9DYWxsKTtcbiAgICAgICAgfSwgdGltZVRvQ2FsbCk7XG5cbiAgICAgICAgbGFzdFRpbWUgPSBjdXJyVGltZSArIHRpbWVUb0NhbGw7XG5cbiAgICAgICAgcmV0dXJuIGlkO1xuICAgIH07XG59IGVsc2Uge1xuICAgIHRpY2sgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRpY2s7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL2luYy91dGlscy5qcycpLFxuICAgIG1heEVsYXBzZWQgPSAzMyxcbiAgICBUaW1lciA9IGZ1bmN0aW9uIFRpbWVyKCkge1xuICAgIHRoaXMuZWxhcHNlZCA9IDE2Ljc7XG4gICAgdGhpcy5jdXJyZW50ID0gdXRpbHMuY3VycmVudFRpbWUoKTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xufTtcblxuVGltZXIucHJvdG90eXBlID0ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgICB0aGlzLnByZXYgPSB0aGlzLmN1cnJlbnQ7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IHV0aWxzLmN1cnJlbnRUaW1lKCk7XG4gICAgICAgIHRoaXMuZWxhcHNlZCA9IE1hdGgubWluKHRoaXMuY3VycmVudCAtIHRoaXMucHJldiwgbWF4RWxhcHNlZCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudDtcbiAgICB9LFxuXG4gICAgZ2V0RWxhcHNlZDogZnVuY3Rpb24gZ2V0RWxhcHNlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxhcHNlZDtcbiAgICB9LFxuXG4gICAgY2xvY2s6IGZ1bmN0aW9uIGNsb2NrKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSB1dGlscy5jdXJyZW50VGltZSgpO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVGltZXI7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi9pbmMvdXRpbHMnKTtcbnZhciBlYWNoID0gdXRpbHMuZWFjaDtcblxuLypcbiAgICBSb2xlIGNsYXNzIGNvbnN0cnVjdG9yXG5cbiAgICBAcGFyYW0gW29iamVjdF06IE9wdGlvbmFsIG1ldGhvZHMgYW5kIHByb3BzIHRvIGFkZDpcbiAgICAgICAgbmFtZSBbc3RyaW5nXTogICAgICBOYW1lIG9mIGdlbmVyYXRlZCBnZXR0ZXIvc2V0dGVyIG1ldGhvZCBvbiBBY3RvclxuICAgICAgICBfbWFwIFtvYmplY3RdOiAgICAgIE1hcCBBY3RvciB2YWx1ZXMgdG8gdGhlc2UgdmFsdWVzIGZvciB0aGlzIFJvbGVcbiAgICAgICAgX3R5cGVNYXAgW29iamVjdF06ICBNYXAgdmFsdWVzIHRvIHZhbHVlIHR5cGVzXG4gICAgICAgIGluaXQgW2Z1bmN0aW9uXTogICAgQ2FsbGJhY2sgdG8gcnVuIHdoZW4gdGhpcyBSb2xlIGlzIGFkZGVkIHRvIGFuIEFjdG9yXG4gICAgICAgIHN0YXJ0IFtmdW5jdGlvbl06ICAgQ2FsbGJhY2sgdG8gcnVuIHdoZW4gaG9zdCBBY3RvciBzdGFydHMgYW4gYWN0aW9uXG4gICAgICAgIGNvbXBsZXRlIFtmdW5jdGlvbl06IENhbGxiYWNrIHRvIHJ1biB3aGVuIGFjdGlvbiBjb21wbGV0ZXNcbiAgICAgICAgZnJhbWUgW2Z1bmN0aW9uXTogICBDYWxsYmFjayB0byBmaXJlIG9uY2UgcGVyIGZyYW1lXG4gICAgICAgIHVwZGF0ZSBbZnVuY3Rpb25dOiAgQ2FsbGJhY2sgdG8gZmlyZSB3aGVuIHZhbHVlcyBjaGFuZ2VcbiAgICAgICAgZ2V0IFtmdW5jdGlvbl06ICAgICBSZWFkIHZhbHVlIGZyb20gYWN0dWFsIGVsZW1lbnRcbiAgICAgICAgc2V0IFtmdW5jdGlvbl06ICAgICBTZXQgdmFsdWUgb24gYWN0dWFsIGVsZW1lbnRcbiovXG52YXIgUm9sZSA9IGZ1bmN0aW9uIFJvbGUobWV0aG9kcykge1xuICAgIHZhciByb2xlID0gdGhpcztcblxuICAgIHJvbGUuX21hcCA9IHt9O1xuXG4gICAgZWFjaChtZXRob2RzLCBmdW5jdGlvbiAobmFtZSwgbWV0aG9kKSB7XG4gICAgICAgIHJvbGVbbmFtZV0gPSAhdXRpbHMuaXNPYmoobWV0aG9kKSA/IG1ldGhvZCA6IHV0aWxzLmNvcHkobWV0aG9kKTtcbiAgICB9KTtcbn07XG5cbi8qXG4gICAgQ3JlYXRlIGEgbmV3IHJvbGVcblxuICAgIEBwYXJhbSBbb2JqZWN0XTogT3B0aW9uYWwgbWV0aG9kcyBhbmQgcHJvcHMgdG8gYWRkXG4gICAgQHBhcmFtIFt2YWx1ZXNUb01hcF06IE92ZXJyaWRlIGV4aXN0aW5nIG1hcCB3aXRoIHRoZXNlIHZhbHVlc1xuICAgIEByZXR1cm4gW1JvbGVdOiBOZXcgUm9sZVxuKi9cbnZhciBjcmVhdGVSb2xlID0gZnVuY3Rpb24gY3JlYXRlUm9sZShtZXRob2RzLCB2YWx1ZXMpIHtcbiAgICB2YXIgbmV3Um9sZSA9IG5ldyBSb2xlKG1ldGhvZHMpO1xuXG4gICAgZWFjaCh2YWx1ZXMsIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgIG5ld1JvbGUuX21hcFtrZXldID0gdmFsdWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3Um9sZTtcbn07XG5cblJvbGUucHJvdG90eXBlID0ge1xuXG4gICAgLypcbiAgICAgICAgTWFwIHZhbHVlIGtleXMgb3IgZ2VuZXJhdGUgbmV3IFJvbGUgd2l0aCB1cGRhdGVkIG1hcFxuICAgICAgICAgR2V0dGVyOlxuICAgICAgICAgICAgQHBhcmFtIFtzdHJpbmddOiBLZXkgdG8gbWFwXG4gICAgICAgICAgICBAcmV0dXJuIFtzdHJpbmddOiBNYXBwZWQga2V5LCBvciBrZXkgaWYgbm8gbWFwcGVkIGtleSBmb3VuZFxuICAgICAgICAgU2V0dGVyOiBcbiAgICAgICAgICAgIEBwYXJhbSBbb2JqZWN0XTogTWFwIG9mIEFjdG9yIGtleXMgLT4gUm9sZSBrZXlzXG4gICAgICAgICAgICBAcmV0dXJuIFtSb2xlXTogTmV3IFJvbGUgd2l0aCB1bmlxdWUgbWFwXG4gICAgKi9cbiAgICBtYXA6IGZ1bmN0aW9uIG1hcCh2YWx1ZXMpIHtcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBhIHN0cmluZywgZ2V0IG1hcHBlZCB2YWx1ZVxuICAgICAgICAvLyBPdGhlcndpc2UgdGhpcyBpcyBhIG1hcCwgZHVwbGljYXRlZCByb2xlIHdpdGggdXBkYXRlZCBtYXBcbiAgICAgICAgcmV0dXJuIHV0aWxzLmlzU3RyaW5nKHZhbHVlcykgPyB0aGlzLl9tYXBbdmFsdWVzXSB8fCB2YWx1ZXMgOiBjcmVhdGVSb2xlKHRoaXMsIHZhbHVlcyk7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSb2xlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUm9sZSA9IHJlcXVpcmUoJy4uL1JvbGUnKTtcbnZhciBlYWNoID0gcmVxdWlyZSgnLi4vLi4vaW5jL3V0aWxzJykuZWFjaDtcblxudmFyIGF0dHJSb2xlID0gbmV3IFJvbGUoe1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKHN0YXRlKSB7XG4gICAgICAgIHZhciBhY3RvciA9IHRoaXM7XG5cbiAgICAgICAgZWFjaChzdGF0ZSwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIGF0dHJSb2xlLnNldChhY3Rvci5lbGVtZW50LCBrZXksIHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGdldDogZnVuY3Rpb24gZ2V0KGVsZW1lbnQsIGtleSkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoa2V5KTtcbiAgICB9LFxuXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQoZWxlbWVudCwga2V5LCB2YWx1ZSkge1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBhdHRyUm9sZTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGVhY2ggPSByZXF1aXJlKCcuLi8uLi9pbmMvdXRpbHMnKS5lYWNoLFxuICAgIHRyYW5zZm9ybURpY3Rpb25hcnkgPSByZXF1aXJlKCcuL3RyYW5zZm9ybS1kaWN0aW9uYXJ5JyksXG4gICAgdHJhbnNmb3JtUHJvcHMgPSB0cmFuc2Zvcm1EaWN0aW9uYXJ5LnByb3BzLFxuICAgIFRSQU5TTEFURV9aID0gJ3RyYW5zbGF0ZVonO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvdXRwdXQsIGNhY2hlKSB7XG4gICAgdmFyIGNzcyA9IHt9LFxuICAgICAgICB0cmFuc2Zvcm0gPSAnJyxcbiAgICAgICAgdHJhbnNmb3JtSGFzWiA9IGZhbHNlO1xuXG4gICAgLy8gTG9vcCB0aHJvdWdoIG91dHB1dCwgY2hlY2sgZm9yIHRyYW5zZm9ybSBwcm9wZXJ0aWVzXG4gICAgZWFjaChvdXRwdXQsIGZ1bmN0aW9uIChrZXksIHJ1bGUpIHtcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBhIHRyYW5zZm9ybSBwcm9wZXJ0eSwgYWRkIHRvIHRyYW5zZm9ybSBzdHJpbmdcbiAgICAgICAgaWYgKHRyYW5zZm9ybVByb3BzW2tleV0pIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybSArPSBrZXkgKyAnKCcgKyBydWxlICsgJyknO1xuICAgICAgICAgICAgdHJhbnNmb3JtSGFzWiA9IGtleSA9PT0gVFJBTlNMQVRFX1ogPyB0cnVlIDogdHJhbnNmb3JtSGFzWjtcblxuICAgICAgICAgICAgLy8gT3IganVzdCBhc3NpZ24gZGlyZWN0bHlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAocnVsZSAhPT0gY2FjaGVba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBjYWNoZVtrZXldID0gY3NzW2tleV0gPSBydWxlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIElmIHdlIGhhdmUgdHJhbnNmb3JtIHByb3BlcnRpZXMsIGFkZCB0cmFuc2xhdGVaXG4gICAgaWYgKHRyYW5zZm9ybSAhPT0gJycpIHtcbiAgICAgICAgaWYgKCF0cmFuc2Zvcm1IYXNaKSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm0gKz0gJyAnICsgVFJBTlNMQVRFX1ogKyAnKDBweCknO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRyYW5zZm9ybSAhPT0gY2FjaGUudHJhbnNmb3JtKSB7XG4gICAgICAgICAgICBjc3MudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FjaGUudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuICAgIH1cblxuICAgIHJldHVybiBjc3M7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUm9sZSA9IHJlcXVpcmUoJy4uL1JvbGUnKTtcbnZhciBidWlsZCA9IHJlcXVpcmUoJy4vYnVpbGQnKTtcbnZhciBlYWNoID0gcmVxdWlyZSgnLi4vLi4vaW5jL3V0aWxzJykuZWFjaDtcblxudmFyIHByZWZpeGVzID0gWydXZWJraXQnLCAnTW96JywgJ08nLCAnbXMnLCAnJ107XG52YXIgbnVtUHJlZml4ZXMgPSBwcmVmaXhlcy5sZW5ndGg7XG52YXIgcHJvcGVydHlOYW1lQ2FjaGUgPSB7fTtcbnZhciB0ZXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4vKlxuICAgIFRlc3Qgc3R5bGUgcHJvcGVydHkgZm9yIHByZWZpeGVkIHZlcnNpb25cbiAgICBcbiAgICBAcGFyYW0gW3N0cmluZ106IFN0eWxlIHByb3BlcnR5XG4gICAgQHJldHVybiBbc3RyaW5nXTogQ2FjaGVkIHByb3BlcnR5IG5hbWVcbiovXG52YXIgdGVzdFByZWZpeCA9IGZ1bmN0aW9uIHRlc3RQcmVmaXgoa2V5KSB7XG4gICAgaWYgKHByb3BlcnR5TmFtZUNhY2hlW2tleV0gPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBwcm9wZXJ0eU5hbWVDYWNoZVtrZXldID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1QcmVmaXhlczsgaSsrKSB7XG4gICAgICAgIHZhciBwcmVmaXggPSBwcmVmaXhlc1tpXSxcbiAgICAgICAgICAgIHByZWZpeGVkID0gcHJlZml4ID09PSAnJyA/IGtleSA6IHByZWZpeCArIGtleS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGtleS5zbGljZSgxKTtcblxuICAgICAgICBpZiAocHJlZml4ZWQgaW4gdGVzdEVsZW1lbnQuc3R5bGUpIHtcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZUNhY2hlW2tleV0gPSBwcmVmaXhlZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwcm9wZXJ0eU5hbWVDYWNoZVtrZXldO1xufTtcblxudmFyIGNzc1JvbGUgPSBuZXcgUm9sZSh7XG4gICAgX21hcDogcmVxdWlyZSgnLi9tYXAnKSxcbiAgICBfdHlwZU1hcDogcmVxdWlyZSgnLi90eXBlLW1hcCcpLFxuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgdGhpcy5fY3NzQ2FjaGUgPSB7fTtcbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoc3RhdGUpIHtcbiAgICAgICAgdmFyIGFjdG9yID0gdGhpcztcblxuICAgICAgICBlYWNoKGJ1aWxkKHN0YXRlLCBhY3Rvci5fY3NzQ2FjaGUpLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgY3NzUm9sZS5zZXQoYWN0b3IuZWxlbWVudCwga2V5LCB2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldChlbGVtZW50LCBrZXkpIHtcbiAgICAgICAga2V5ID0gcHJvcGVydHlOYW1lQ2FjaGVba2V5XSB8fCB0ZXN0UHJlZml4KGtleSk7XG5cbiAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsIG51bGwpW2tleV07XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQoZWxlbWVudCwga2V5LCB2YWx1ZSkge1xuICAgICAgICBrZXkgPSBwcm9wZXJ0eU5hbWVDYWNoZVtrZXldIHx8IHRlc3RQcmVmaXgoa2V5KTtcblxuICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gY3NzUm9sZTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBUUkFOU0xBVEUgPSAndHJhbnNsYXRlJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgeDogVFJBTlNMQVRFICsgJ1gnLFxuICAgIHk6IFRSQU5TTEFURSArICdZJyxcbiAgICB6OiBUUkFOU0xBVEUgKyAnWidcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBwb3NpdGlvblRlcm1zID0gcmVxdWlyZSgnLi4vLi4vdmFsdWUtdHlwZXMvc2V0dGluZ3MvZGljdGlvbmFyeScpLnBvc2l0aW9ucyxcbiAgICBudW1Qb3NpdGlvblRlcm1zID0gcG9zaXRpb25UZXJtcy5sZW5ndGgsXG4gICAgVFJBTlNGT1JNX1BFUlNQRUNUSVZFID0gJ3RyYW5zZm9ybVBlcnNwZWN0aXZlJyxcbiAgICBTQ0FMRSA9ICdzY2FsZScsXG4gICAgUk9UQVRFID0gJ3JvdGF0ZScsXG4gICAgdGVybXMgPSB7XG4gICAgZnVuY3M6IFsndHJhbnNsYXRlJywgU0NBTEUsIFJPVEFURSwgJ3NrZXcnLCBUUkFOU0ZPUk1fUEVSU1BFQ1RJVkVdLFxuICAgIHByb3BzOiB7fSAvLyBvYmplY3RzIGFyZSBmYXN0ZXIgYXQgZGlyZWN0IGxvb2t1cHNcbn07XG5cbi8vIENyZWF0ZSB0cmFuc2Zvcm0gdGVybXNcbihmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZ1bmNzID0gdGVybXMuZnVuY3MsXG4gICAgICAgIHByb3BzID0gdGVybXMucHJvcHMsXG4gICAgICAgIG51bUZ1bmNzID0gZnVuY3MubGVuZ3RoLFxuICAgICAgICBpID0gMCxcbiAgICAgICAgY3JlYXRlUHJvcHMgPSBmdW5jdGlvbiBjcmVhdGVQcm9wcyhmdW5jTmFtZSkge1xuICAgICAgICB2YXIgaiA9IDA7XG5cbiAgICAgICAgZm9yICg7IGogPCBudW1Qb3NpdGlvblRlcm1zOyBqKyspIHtcbiAgICAgICAgICAgIHByb3BzW2Z1bmNOYW1lICsgcG9zaXRpb25UZXJtc1tqXV0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIE1hbnVhbGx5IGFkZCBza2V3IGFuZCB0cmFuc2Zvcm0gcGVyc3BlY3RpdmUgXG4gICAgcHJvcHNbUk9UQVRFXSA9IHByb3BzW1NDQUxFXSA9IHByb3BzW1RSQU5TRk9STV9QRVJTUEVDVElWRV0gPSB0cnVlO1xuXG4gICAgLy8gTG9vcCBvdmVyIGVhY2ggZnVuY3Rpb24gbmFtZSBhbmQgY3JlYXRlIGZ1bmN0aW9uL3Byb3BlcnR5IHRlcm1zXG4gICAgZm9yICg7IGkgPCBudW1GdW5jczsgaSsrKSB7XG4gICAgICAgIGNyZWF0ZVByb3BzKGZ1bmNzW2ldKTtcbiAgICB9XG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRlcm1zOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIENPTE9SID0gJ2NvbG9yJyxcbiAgICBQT1NJVElPTlMgPSAncG9zaXRpb25zJyxcbiAgICBESU1FTlNJT05TID0gJ2RpbWVuc2lvbnMnLFxuICAgIFNIQURPVyA9ICdzaGFkb3cnLFxuICAgIEFOR0xFID0gJ2FuZ2xlJyxcbiAgICBBTFBIQSA9ICdhbHBoYScsXG4gICAgUFggPSAncHgnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAvLyBDb2xvciBwcm9wZXJ0aWVzXG4gICAgY29sb3I6IENPTE9SLFxuICAgIGJhY2tncm91bmRDb2xvcjogQ09MT1IsXG4gICAgb3V0bGluZUNvbG9yOiBDT0xPUixcbiAgICBmaWxsOiBDT0xPUixcbiAgICBzdHJva2U6IENPTE9SLFxuICAgIC8vIEJvcmRlclxuICAgIGJvcmRlckNvbG9yOiBDT0xPUixcbiAgICBib3JkZXJUb3BDb2xvcjogQ09MT1IsXG4gICAgYm9yZGVyUmlnaHRDb2xvcjogQ09MT1IsXG4gICAgYm9yZGVyQm90dG9tQ29sb3I6IENPTE9SLFxuICAgIGJvcmRlckxlZnRDb2xvcjogQ09MT1IsXG4gICAgYm9yZGVyUmFkaXVzOiBQWCxcbiAgICAvLyBEaW1lbnNpb25zXG4gICAgbWFyZ2luOiBESU1FTlNJT05TLFxuICAgIHBhZGRpbmc6IERJTUVOU0lPTlMsXG4gICAgd2lkdGg6IFBYLFxuICAgIGhlaWdodDogUFgsXG4gICAgLy8gUG9zaXRpb25zXG4gICAgYmFja2dyb3VuZFBvc2l0aW9uOiBQT1NJVElPTlMsXG4gICAgcGVyc3BlY3RpdmVPcmlnaW46IFBPU0lUSU9OUyxcbiAgICB0cmFuc2Zvcm1PcmlnaW46IFBPU0lUSU9OUyxcbiAgICAvLyBTaGFkb3dzXG4gICAgdGV4dFNoYWRvdzogU0hBRE9XLFxuICAgIGJveFNoYWRvdzogU0hBRE9XLFxuICAgIC8vIFRyYW5zZm9ybSBwcm9wZXJ0aWVzXG4gICAgcm90YXRlOiBBTkdMRSxcbiAgICByb3RhdGVYOiBBTkdMRSxcbiAgICByb3RhdGVZOiBBTkdMRSxcbiAgICByb3RhdGVaOiBBTkdMRSxcbiAgICBza2V3WDogQU5HTEUsXG4gICAgc2tld1k6IEFOR0xFLFxuICAgIHRyYW5zbGF0ZVg6IFBYLFxuICAgIHRyYW5zbGF0ZVk6IFBYLFxuICAgIHRyYW5zbGF0ZVo6IFBYLFxuICAgIHBlcnNwZWN0aXZlOiBQWCxcbiAgICBvcGFjaXR5OiBBTFBIQVxufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBSb2xlID0gcmVxdWlyZSgnLi9Sb2xlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFJvbGUoe1xuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmluaXQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0YXJ0OiBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgICAgaWYgKHRoaXMub25TdGFydCkge1xuICAgICAgICAgICAgdGhpcy5vblN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZnJhbWU6IGZ1bmN0aW9uIGZyYW1lKHN0YXRlKSB7XG4gICAgICAgIGlmICh0aGlzLm9uRnJhbWUpIHtcbiAgICAgICAgICAgIHRoaXMub25GcmFtZShzdGF0ZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoc3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMub25VcGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMub25VcGRhdGUoc3RhdGUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbiBjb21wbGV0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMub25Db21wbGV0ZSkge1xuICAgICAgICAgICAgdGhpcy5vbkNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG59KTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIFJvbGUgPSByZXF1aXJlKCcuLi9Sb2xlJyk7XG52YXIgYXR0clJvbGUgPSByZXF1aXJlKCcuLi9hdHRyL2F0dHJSb2xlJyk7XG52YXIgZWFjaCA9IHJlcXVpcmUoJy4uLy4uL2luYy91dGlscycpLmVhY2g7XG5cbi8qXG4gICAgQ29udmVydCBwZXJjZW50YWdlIHRvIHBpeGVsc1xuICAgIFxuICAgIEBwYXJhbSBbbnVtYmVyXTogUGVyY2VudGFnZSBvZiB0b3RhbCBsZW5ndGhcbiAgICBAcGFyYW0gW251bWJlcl06IFRvdGFsIGxlbmd0aFxuKi9cbnZhciBwZXJjZW50VG9QaXhlbHMgPSBmdW5jdGlvbiBwZXJjZW50VG9QaXhlbHMocGVyY2VudGFnZSwgbGVuZ3RoKSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQocGVyY2VudGFnZSkgLyAxMDAgKiBsZW5ndGggKyAncHgnO1xufTtcblxuLypcbiAgICBDcmVhdGUgc3R5bGVzXG4gICAgXG4gICAgQHBhcmFtIFtvYmplY3RdOiBTVkcgUGF0aCBwcm9wZXJ0aWVzXG4gICAgQHBhcmFtIFtvYmplY3RdOiBMZW5ndGggb2YgcGF0aFxuICAgIEByZXR1cm5zIFtvYmplY3RdOiBLZXkvdmFsdWUgcGFpcnMgb2YgdmFsaWQgQ1NTIHByb3BlcnRpZXNcbiovXG52YXIgY3JlYXRlU3R5bGVzID0gZnVuY3Rpb24gY3JlYXRlU3R5bGVzKHByb3BzLCBsZW5ndGgpIHtcbiAgICB2YXIgaGFzRGFzaEFycmF5ID0gZmFsc2UsXG4gICAgICAgIGRhc2hBcnJheVN0eWxlcyA9IHtcbiAgICAgICAgbGVuZ3RoOiAwLFxuICAgICAgICBzcGFjaW5nOiBsZW5ndGggKyAncHgnXG4gICAgfSxcbiAgICAgICAgc3R5bGVzID0ge307XG5cbiAgICBlYWNoKHByb3BzLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICBrZXkgPSBTVkdEcmF3UGF0aC5fbWFwW2tleV0gfHwga2V5O1xuXG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgICBjYXNlICdsZW5ndGgnOlxuICAgICAgICAgICAgY2FzZSAnc3BhY2luZyc6XG4gICAgICAgICAgICAgICAgaGFzRGFzaEFycmF5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBkYXNoQXJyYXlTdHlsZXNba2V5XSA9IHBlcmNlbnRUb1BpeGVscyh2YWx1ZSwgbGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ29mZnNldCc6XG4gICAgICAgICAgICAgICAgc3R5bGVzWydzdHJva2UtZGFzaG9mZnNldCddID0gcGVyY2VudFRvUGl4ZWxzKC12YWx1ZSwgbGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgc3R5bGVzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGhhc0Rhc2hBcnJheSkge1xuICAgICAgICBzdHlsZXNbJ3N0cm9rZS1kYXNoYXJyYXknXSA9IGRhc2hBcnJheVN0eWxlcy5sZW5ndGggKyAnICcgKyBkYXNoQXJyYXlTdHlsZXMuc3BhY2luZztcbiAgICB9XG5cbiAgICByZXR1cm4gc3R5bGVzO1xufTtcblxuLypcbiAgICBEcmF3IFBhdGggcm9sZVxuKi9cbnZhciBTVkdEcmF3UGF0aCA9IG5ldyBSb2xlKHtcbiAgICBfbWFwOiByZXF1aXJlKCcuL21hcCcpLFxuXG4gICAgX3R5cGVNYXA6IHtcbiAgICAgICAgc3Ryb2tlOiAnY29sb3InLFxuICAgICAgICBkOiAnY29tcGxleCdcbiAgICB9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgdGhpcy5wYXRoTGVuZ3RoID0gdGhpcy5lbGVtZW50LmdldFRvdGFsTGVuZ3RoKCk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICAgIFVwZGF0ZSBgcGF0aGAgc3R5bGVzIGFuZCBpZiBgZWxlbWVudGAgaXMgcHJlc2VudCwgc2V0XG4gICAgICAgIHgsIHkgYW5kIHJvdGF0aW9uXG4gICAgKi9cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShzdGF0ZSkge1xuICAgICAgICBhdHRyUm9sZS51cGRhdGUuY2FsbCh0aGlzLCBjcmVhdGVTdHlsZXMoc3RhdGUsIHRoaXMucGF0aExlbmd0aCkpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNWR0RyYXdQYXRoOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIFNUUk9LRSA9ICdzdHJva2UnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBvcGFjaXR5OiBTVFJPS0UgKyAnLW9wYWNpdHknLFxuICAgIHdpZHRoOiBTVFJPS0UgKyAnLXdpZHRoJyxcbiAgICBtaXRlcmxpbWl0OiBTVFJPS0UgKyAnLW1pdGVybGltaXQnXG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVhY2ggPSByZXF1aXJlKCcuLi8uLi9pbmMvdXRpbHMnKS5lYWNoLFxuICAgIHRyYW5zZm9ybURpY3Rpb25hcnkgPSByZXF1aXJlKCcuLi9jc3MvdHJhbnNmb3JtLWRpY3Rpb25hcnknKSxcbiAgICB0cmFuc2Zvcm1Qcm9wcyA9IHRyYW5zZm9ybURpY3Rpb25hcnkucHJvcHMsXG4gICAgemVyb05vdFplcm8gPSAwLjAwMDE7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG91dHB1dCwgb3JpZ2luKSB7XG4gICAgdmFyIHByb3BzID0ge30sXG4gICAgICAgIGhhc1RyYW5zZm9ybSA9IGZhbHNlLFxuICAgICAgICBzY2FsZSA9IG91dHB1dC5zY2FsZSAhPT0gdW5kZWZpbmVkID8gb3V0cHV0LnNjYWxlIHx8IHplcm9Ob3RaZXJvIDogb3V0cHV0LnNjYWxlWCB8fCAxLFxuICAgICAgICBzY2FsZVkgPSBvdXRwdXQuc2NhbGVZICE9PSB1bmRlZmluZWQgPyBvdXRwdXQuc2NhbGVZIHx8IHplcm9Ob3RaZXJvIDogc2NhbGUgfHwgMSxcbiAgICAgICAgdHJhbnNmb3JtT3JpZ2luWCA9IG9yaWdpbi54LFxuICAgICAgICB0cmFuc2Zvcm1PcmlnaW5ZID0gb3JpZ2luLnksXG4gICAgICAgIHNjYWxlVHJhbnNmb3JtWCA9IC10cmFuc2Zvcm1PcmlnaW5YICogKHNjYWxlICogMSksXG4gICAgICAgIHNjYWxlVHJhbnNmb3JtWSA9IC10cmFuc2Zvcm1PcmlnaW5ZICogKHNjYWxlWSAqIDEpLFxuICAgICAgICBzY2FsZVJlcGxhY2VYID0gdHJhbnNmb3JtT3JpZ2luWCAvIHNjYWxlLFxuICAgICAgICBzY2FsZVJlcGxhY2VZID0gdHJhbnNmb3JtT3JpZ2luWSAvIHNjYWxlWSxcbiAgICAgICAgdHJhbnNmb3JtID0ge1xuICAgICAgICB0cmFuc2xhdGU6ICd0cmFuc2xhdGUoJyArIG91dHB1dC50cmFuc2xhdGVYICsgJywgJyArIG91dHB1dC50cmFuc2xhdGVZICsgJykgJyxcbiAgICAgICAgc2NhbGU6ICd0cmFuc2xhdGUoJyArIHNjYWxlVHJhbnNmb3JtWCArICcsICcgKyBzY2FsZVRyYW5zZm9ybVkgKyAnKSBzY2FsZSgnICsgc2NhbGUgKyAnLCAnICsgc2NhbGVZICsgJykgdHJhbnNsYXRlKCcgKyBzY2FsZVJlcGxhY2VYICsgJywgJyArIHNjYWxlUmVwbGFjZVkgKyAnKSAnLFxuICAgICAgICByb3RhdGU6ICdyb3RhdGUoJyArIG91dHB1dC5yb3RhdGUgKyAnLCAnICsgdHJhbnNmb3JtT3JpZ2luWCArICcsICcgKyB0cmFuc2Zvcm1PcmlnaW5ZICsgJykgJyxcbiAgICAgICAgc2tld1g6ICdza2V3WCgnICsgb3V0cHV0LnNrZXdYICsgJykgJyxcbiAgICAgICAgc2tld1k6ICdza2V3WSgnICsgb3V0cHV0LnNrZXdZICsgJykgJ1xuICAgIH07XG5cbiAgICBlYWNoKG91dHB1dCwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHRyYW5zZm9ybVByb3BzW2tleV0pIHtcbiAgICAgICAgICAgIGhhc1RyYW5zZm9ybSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9wc1trZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChoYXNUcmFuc2Zvcm0pIHtcbiAgICAgICAgcHJvcHMudHJhbnNmb3JtID0gJyc7XG5cbiAgICAgICAgZWFjaCh0cmFuc2Zvcm0sIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgZGVmYXVsdFZhbHVlID0ga2V5ID09PSAnc2NhbGUnID8gJzEnIDogJzAnO1xuICAgICAgICAgICAgcHJvcHMudHJhbnNmb3JtICs9IHZhbHVlLnJlcGxhY2UoL3VuZGVmaW5lZC9nLCBkZWZhdWx0VmFsdWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvcHM7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUm9sZSA9IHJlcXVpcmUoJy4uL1JvbGUnKSxcbiAgICBhdHRyUm9sZSA9IHJlcXVpcmUoJy4uL2F0dHIvYXR0clJvbGUnKSxcbiAgICBidWlsZCA9IHJlcXVpcmUoJy4vYnVpbGQnKSxcbiAgICBlYWNoID0gcmVxdWlyZSgnLi4vLi4vaW5jL3V0aWxzJykuZWFjaDtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUm9sZSh7XG4gICAgbmFtZTogJ3N2ZycsXG5cbiAgICBfbWFwOiByZXF1aXJlKCcuLi9jc3MvbWFwJyksXG4gICAgX3R5cGVNYXA6IHJlcXVpcmUoJy4vdHlwZS1tYXAnKSxcblxuICAgIHN0YXJ0OiBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgICAgdmFyIGJvdW5kaW5nQm94ID0gdGhpcy5lbGVtZW50LmdldEJCb3goKSxcbiAgICAgICAgICAgIHZhbHVlcyA9IHRoaXMudmFsdWVzLFxuXG4gICAgICAgIC8vIFRPRE86IFN1cHBvcnQgcHhcbiAgICAgICAgdHJhbnNmb3JtT3JpZ2luWCA9IHZhbHVlcy50cmFuc2Zvcm1PcmlnaW5YID8gdmFsdWVzLnRyYW5zZm9ybU9yaWdpblguY3VycmVudCA6IDUwLFxuICAgICAgICAgICAgdHJhbnNmb3JtT3JpZ2luWSA9IHZhbHVlcy50cmFuc2Zvcm1PcmlnaW5ZID8gdmFsdWVzLnRyYW5zZm9ybU9yaWdpblkuY3VycmVudCA6IDUwLFxuICAgICAgICAgICAgb3JpZ2luID0ge1xuICAgICAgICAgICAgeDogYm91bmRpbmdCb3gud2lkdGggKiAodHJhbnNmb3JtT3JpZ2luWCAvIDEwMCkgKyBib3VuZGluZ0JveC54LFxuICAgICAgICAgICAgeTogYm91bmRpbmdCb3guaGVpZ2h0ICogKHRyYW5zZm9ybU9yaWdpblkgLyAxMDApICsgYm91bmRpbmdCb3gueVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuc3ZnT3JpZ2luID0gb3JpZ2luO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShzdGF0ZSkge1xuICAgICAgICB2YXIgYWN0b3IgPSB0aGlzO1xuICAgICAgICBlYWNoKGJ1aWxkKHN0YXRlLCB0aGlzLnN2Z09yaWdpbiksIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICBhdHRyUm9sZS5zZXQoYWN0b3IuZWxlbWVudCwga2V5LCB2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ09MT1IgPSAnY29sb3InLFxuICAgIFNDQUxFID0gJ3NjYWxlJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZmlsbDogQ09MT1IsXG4gICAgc3Ryb2tlOiBDT0xPUixcbiAgICBzY2FsZTogU0NBTEUsXG4gICAgc2NhbGVYOiBTQ0FMRSxcbiAgICBzY2FsZVk6IFNDQUxFLFxuICAgIHRyYW5zZm9ybU9yaWdpbjogJ3Bvc2l0aW9ucycsXG4gICAgZDogJ2NvbXBsZXgnXG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZWZhdWx0UHJvcHM6IHtcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBtYXg6IDFcbiAgICB9XG59OyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVmYXVsdFByb3BzOiB7XG4gICAgICAgIHVuaXQ6ICdkZWcnXG4gICAgfVxufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vaW5jL3V0aWxzJyksXG4gICAgcmdiID0gcmVxdWlyZSgnLi9yZ2InKSxcbiAgICBoc2wgPSByZXF1aXJlKCcuL2hzbCcpLFxuICAgIGhleCA9IHJlcXVpcmUoJy4vaGV4JyksXG4gICAgc3VwcG9ydGVkID0gW3JnYiwgaHNsLCBoZXhdLFxuICAgIG51bVN1cHBvcnRlZCA9IDMsXG4gICAgcnVuU3VwcG9ydGVkID0gZnVuY3Rpb24gcnVuU3VwcG9ydGVkKG1ldGhvZCwgdmFsdWUpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bVN1cHBvcnRlZDsgaSsrKSB7XG4gICAgICAgIGlmIChzdXBwb3J0ZWRbaV0udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdXBwb3J0ZWRbaV1bbWV0aG9kXSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIGRlZmF1bHRQcm9wczogdXRpbHMubWVyZ2UocmdiLmRlZmF1bHRQcm9wcywgaHNsLmRlZmF1bHRQcm9wcyksXG5cbiAgICB0ZXN0OiBmdW5jdGlvbiB0ZXN0KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiByZ2IudGVzdCh2YWx1ZSkgfHwgaGV4LnRlc3QodmFsdWUpIHx8IGhzbC50ZXN0KHZhbHVlKTtcbiAgICB9LFxuXG4gICAgc3BsaXQ6IGZ1bmN0aW9uIHNwbGl0KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBydW5TdXBwb3J0ZWQoJ3NwbGl0JywgdmFsdWUpO1xuICAgIH0sXG5cbiAgICBjb21iaW5lOiBmdW5jdGlvbiBjb21iaW5lKHZhbHVlcykge1xuICAgICAgICByZXR1cm4gdmFsdWVzLlJlZCAhPT0gdW5kZWZpbmVkID8gcmdiLmNvbWJpbmUodmFsdWVzKSA6IGhzbC5jb21iaW5lKHZhbHVlcyk7XG4gICAgfVxufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL2luYy91dGlscycpLFxuICAgIGVhY2ggPSB1dGlscy5lYWNoLFxuICAgIGZsb2F0UmVnZXggPSAvKC0pPyhcXGRbXFxkXFwuXSopL2csXG4gICAgZ2VuZXJhdGVUb2tlbiA9IGZ1bmN0aW9uIGdlbmVyYXRlVG9rZW4oa2V5KSB7XG4gICAgcmV0dXJuICckeycgKyBrZXkgKyAnfSc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB0ZXN0OiBmdW5jdGlvbiB0ZXN0KHZhbHVlKSB7XG4gICAgICAgIHZhciBtYXRjaGVzID0gdmFsdWUubWF0Y2goZmxvYXRSZWdleCk7XG4gICAgICAgIHJldHVybiB1dGlscy5pc0FycmF5KG1hdGNoZXMpICYmIG1hdGNoZXMubGVuZ3RoID4gMTtcbiAgICB9LFxuXG4gICAgdGVtcGxhdGU6IGZ1bmN0aW9uIHRlbXBsYXRlKHZhbHVlKSB7XG4gICAgICAgIHZhciBjb3VudGVyID0gMDtcbiAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoZmxvYXRSZWdleCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlVG9rZW4oY291bnRlcisrKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHNwbGl0OiBmdW5jdGlvbiBzcGxpdCh2YWx1ZSkge1xuICAgICAgICB2YXIgc3BsaXRWYWx1ZSA9IHt9LFxuICAgICAgICAgICAgbWF0Y2hlcyA9IHZhbHVlLm1hdGNoKGZsb2F0UmVnZXgpLFxuICAgICAgICAgICAgbnVtTWF0Y2hlcyA9IG1hdGNoZXMubGVuZ3RoO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtTWF0Y2hlczsgaSsrKSB7XG4gICAgICAgICAgICBzcGxpdFZhbHVlW2ldID0gbWF0Y2hlc1tpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzcGxpdFZhbHVlO1xuICAgIH0sXG5cbiAgICBjb21iaW5lOiBmdW5jdGlvbiBjb21iaW5lKHZhbHVlcywgdGVtcGxhdGUpIHtcbiAgICAgICAgdmFyIGNvbWJpbmVkVmFsdWUgPSB0ZW1wbGF0ZTtcblxuICAgICAgICBlYWNoKHZhbHVlcywgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIGNvbWJpbmVkVmFsdWUgPSBjb21iaW5lZFZhbHVlLnJlcGxhY2UoZ2VuZXJhdGVUb2tlbihrZXkpLCB2YWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBjb21iaW5lZFZhbHVlO1xuICAgIH1cbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciB0ZXJtcyA9IHJlcXVpcmUoJy4vc2V0dGluZ3MvZGljdGlvbmFyeScpLmRpbWVuc2lvbnMsXG4gICAgcHhEZWZhdWx0cyA9IHJlcXVpcmUoJy4vcHgnKS5kZWZhdWx0UHJvcHMsXG4gICAgY3JlYXRlRGVsaW1pdGVkID0gcmVxdWlyZSgnLi9tYW5pcHVsYXRvcnMvY3JlYXRlLWRlbGltaXRlZCcpLFxuICAgIHNwbGl0U3BhY2VEZWxpbWl0ZWQgPSByZXF1aXJlKCcuL21hbmlwdWxhdG9ycy9zcGxpdC1zcGFjZS1kZWxpbWl0ZWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICBkZWZhdWx0UHJvcHM6IHB4RGVmYXVsdHMsXG5cbiAgICAvKlxuICAgICAgICBTcGxpdCBkaW1lbnNpb25zIGluIGZvcm1hdCBcIlRvcCBSaWdodCBCb3R0b20gTGVmdFwiXG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW3N0cmluZ106IERpbWVuc2lvbiB2YWx1ZXNcbiAgICAgICAgICAgIFwiMjBweCAwIDMwcHggNDBweFwiIC0+IHsyMHB4LCAwLCAzMHB4LCA0MHB4fVxuICAgICAgICAgICAgXCIyMHB4IDAgMzBweFwiIC0+IHsyMHB4LCAwLCAzMHB4LCAwfVxuICAgICAgICAgICAgXCIyMHB4IDBcIiAtPiB7MjBweCwgMCwgMjBweCwgMH1cbiAgICAgICAgICAgIFwiMjBweFwiIC0+IHsyMHB4LCAyMHB4LCAyMHB4LCAyMHB4fVxuICAgICAgICBcbiAgICAgICAgQHJldHVybiBbb2JqZWN0XTogT2JqZWN0IHdpdGggVC9SL0IvTCBtZXRyaWNzXG4gICAgKi9cbiAgICBzcGxpdDogZnVuY3Rpb24gc3BsaXQodmFsdWUpIHtcbiAgICAgICAgdmFyIGRpbWVuc2lvbnMgPSBzcGxpdFNwYWNlRGVsaW1pdGVkKHZhbHVlKSxcbiAgICAgICAgICAgIG51bURpbWVuc2lvbnMgPSBkaW1lbnNpb25zLmxlbmd0aCxcbiAgICAgICAgICAgIGp1bXBCYWNrID0gbnVtRGltZW5zaW9ucyAhPT0gMSA/IDIgOiAxLFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBqID0gMCxcbiAgICAgICAgICAgIHNwbGl0VmFsdWUgPSB7fTtcblxuICAgICAgICBmb3IgKDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgc3BsaXRWYWx1ZVt0ZXJtc1tpXV0gPSBkaW1lbnNpb25zW2pdO1xuXG4gICAgICAgICAgICAvLyBKdW1wIGJhY2sgKHRvIHN0YXJ0KSBjb3VudGVyIGlmIHdlJ3ZlIHJlYWNoZWQgdGhlIGVuZCBvZiBvdXIgdmFsdWVzXG4gICAgICAgICAgICBqKys7XG4gICAgICAgICAgICBqID0gaiA9PT0gbnVtRGltZW5zaW9ucyA/IGogLSBqdW1wQmFjayA6IGo7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3BsaXRWYWx1ZTtcbiAgICB9LFxuXG4gICAgY29tYmluZTogZnVuY3Rpb24gY29tYmluZSh2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZURlbGltaXRlZCh2YWx1ZXMsIHRlcm1zLCAnICcpO1xuICAgIH1cbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciByZ2IgPSByZXF1aXJlKCcuL3JnYicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIGRlZmF1bHRQcm9wczogcmdiLmRlZmF1bHRQcm9wcyxcblxuICAgIHRlc3Q6IGZ1bmN0aW9uIHRlc3QodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlICYmIHZhbHVlLmluZGV4T2YoJyMnKSA+IC0xO1xuICAgIH0sXG5cbiAgICBzcGxpdDogZnVuY3Rpb24gc3BsaXQodmFsdWUpIHtcbiAgICAgICAgdmFyIHIsIGcsIGI7XG5cbiAgICAgICAgLy8gSWYgd2UgaGF2ZSA2IGNoYXJhY3RlcnMsIGllICNGRjAwMDBcbiAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA+IDQpIHtcbiAgICAgICAgICAgIHIgPSB2YWx1ZS5zdWJzdHIoMSwgMik7XG4gICAgICAgICAgICBnID0gdmFsdWUuc3Vic3RyKDMsIDIpO1xuICAgICAgICAgICAgYiA9IHZhbHVlLnN1YnN0cig1LCAyKTtcblxuICAgICAgICAgICAgLy8gT3Igd2UgaGF2ZSAzIGNoYXJhY3RlcnMsIGllICNGMDBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByID0gdmFsdWUuc3Vic3RyKDEsIDEpO1xuICAgICAgICAgICAgICAgIGcgPSB2YWx1ZS5zdWJzdHIoMiwgMSk7XG4gICAgICAgICAgICAgICAgYiA9IHZhbHVlLnN1YnN0cigzLCAxKTtcbiAgICAgICAgICAgICAgICByICs9IHI7XG4gICAgICAgICAgICAgICAgZyArPSBnO1xuICAgICAgICAgICAgICAgIGIgKz0gYjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgUmVkOiBwYXJzZUludChyLCAxNiksXG4gICAgICAgICAgICBHcmVlbjogcGFyc2VJbnQoZywgMTYpLFxuICAgICAgICAgICAgQmx1ZTogcGFyc2VJbnQoYiwgMTYpLFxuICAgICAgICAgICAgQWxwaGE6IDFcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgY29tYmluZTogZnVuY3Rpb24gY29tYmluZSh2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIHJnYi5jb21iaW5lKHZhbHVlcyk7XG4gICAgfVxufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGNyZWF0ZURlbGltaXRlZCA9IHJlcXVpcmUoJy4vbWFuaXB1bGF0b3JzL2NyZWF0ZS1kZWxpbWl0ZWQnKSxcbiAgICBnZXRDb2xvclZhbHVlcyA9IHJlcXVpcmUoJy4vbWFuaXB1bGF0b3JzL2dldC1jb2xvci12YWx1ZXMnKSxcbiAgICBmdW5jdGlvbkNyZWF0ZSA9IHJlcXVpcmUoJy4vbWFuaXB1bGF0b3JzL2Z1bmN0aW9uLWNyZWF0ZScpLFxuICAgIGRlZmF1bHRQcm9wcyA9IHJlcXVpcmUoJy4vc2V0dGluZ3MvZGVmYXVsdC1wcm9wcycpLFxuICAgIHRlcm1zID0gcmVxdWlyZSgnLi9zZXR0aW5ncy9kaWN0aW9uYXJ5JykuaHNsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIGRlZmF1bHRQcm9wczoge1xuICAgICAgICBIdWU6IHtcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIG1heDogMzYwXG4gICAgICAgIH0sXG4gICAgICAgIFNhdHVyYXRpb246IGRlZmF1bHRQcm9wcy5wZXJjZW50LFxuICAgICAgICBMaWdodG5lc3M6IGRlZmF1bHRQcm9wcy5wZXJjZW50LFxuICAgICAgICBBbHBoYTogZGVmYXVsdFByb3BzLm9wYWNpdHlcbiAgICB9LFxuXG4gICAgdGVzdDogZnVuY3Rpb24gdGVzdCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgJiYgdmFsdWUuaW5kZXhPZignaHNsJykgPiAtMTtcbiAgICB9LFxuXG4gICAgc3BsaXQ6IGZ1bmN0aW9uIHNwbGl0KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBnZXRDb2xvclZhbHVlcyh2YWx1ZSwgdGVybXMpO1xuICAgIH0sXG5cbiAgICBjb21iaW5lOiBmdW5jdGlvbiBjb21iaW5lKHZhbHVlcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb25DcmVhdGUoY3JlYXRlRGVsaW1pdGVkKHZhbHVlcywgdGVybXMsICcsICcsIDIpLCAnaHNsYScpO1xuICAgIH1cbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFjaCA9IHJlcXVpcmUoJy4uL2luYy91dGlscycpLmVhY2gsXG4gICAgVmFsdWVUeXBlTWFuYWdlciA9IGZ1bmN0aW9uIFZhbHVlVHlwZU1hbmFnZXIoKSB7fTtcblxuVmFsdWVUeXBlTWFuYWdlci5wcm90b3R5cGUgPSB7XG4gICAgZXh0ZW5kOiBmdW5jdGlvbiBleHRlbmQobmFtZSwgbW9kKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgdmFyIG11bHRpTW9kcyA9IHR5cGVvZiBuYW1lID09ICdvYmplY3QnLFxuICAgICAgICAgICAgbW9kcyA9IG11bHRpTW9kcyA/IG5hbWUgOiB7fTtcblxuICAgICAgICAvLyBJZiB3ZSBqdXN0IGhhdmUgb25lIG1vZHVsZSwgY29lcmNlXG4gICAgICAgIGlmICghbXVsdGlNb2RzKSB7XG4gICAgICAgICAgICBtb2RzW25hbWVdID0gbW9kO1xuICAgICAgICB9XG5cbiAgICAgICAgZWFjaChtb2RzLCBmdW5jdGlvbiAoa2V5LCB0aGlzTW9kKSB7XG4gICAgICAgICAgICBfdGhpc1trZXldID0gdGhpc01vZDtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGRlZmF1bHRQcm9wczogZnVuY3Rpb24gZGVmYXVsdFByb3BzKHR5cGUsIGtleSkge1xuICAgICAgICB2YXIgdmFsdWVUeXBlID0gdGhpc1t0eXBlXSxcbiAgICAgICAgICAgIGRlZmF1bHRQcm9wcyA9IHZhbHVlVHlwZS5kZWZhdWx0UHJvcHMgPyB2YWx1ZVR5cGUuZGVmYXVsdFByb3BzW2tleV0gfHwgdmFsdWVUeXBlLmRlZmF1bHRQcm9wcyA6IHt9O1xuXG4gICAgICAgIHJldHVybiBkZWZhdWx0UHJvcHM7XG4gICAgfSxcblxuICAgIHRlc3Q6IGZ1bmN0aW9uIHRlc3QodmFsdWUpIHtcbiAgICAgICAgdmFyIHR5cGUgPSBmYWxzZTtcblxuICAgICAgICBlYWNoKHRoaXMsIGZ1bmN0aW9uIChrZXksIG1vZCkge1xuICAgICAgICAgICAgaWYgKG1vZC50ZXN0ICYmIG1vZC50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHR5cGUgPSBrZXk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFZhbHVlVHlwZU1hbmFnZXIoKTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWVzLCB0ZXJtcywgZGVsaW1pdGVyLCBjaG9wKSB7XG4gICAgdmFyIGNvbWJpbmVkID0gJycsXG4gICAgICAgIGtleSA9ICcnLFxuICAgICAgICBpID0gMCxcbiAgICAgICAgbnVtVGVybXMgPSB0ZXJtcy5sZW5ndGg7XG5cbiAgICBmb3IgKDsgaSA8IG51bVRlcm1zOyBpKyspIHtcbiAgICAgICAga2V5ID0gdGVybXNbaV07XG5cbiAgICAgICAgaWYgKHZhbHVlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICBjb21iaW5lZCArPSB2YWx1ZXNba2V5XSArIGRlbGltaXRlcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaG9wKSB7XG4gICAgICAgIGNvbWJpbmVkID0gY29tYmluZWQuc2xpY2UoMCwgLWNob3ApO1xuICAgIH1cblxuICAgIHJldHVybiBjb21iaW5lZDtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5zdWJzdHJpbmcodmFsdWUuaW5kZXhPZignKCcpICsgMSwgdmFsdWUubGFzdEluZGV4T2YoJyknKSk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUsIHByZWZpeCkge1xuICAgIHJldHVybiBwcmVmaXggKyAnKCcgKyB2YWx1ZSArICcpJztcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3BsaXRDb21tYURlbGltaXRlZCA9IHJlcXVpcmUoJy4vc3BsaXQtY29tbWEtZGVsaW1pdGVkJyksXG4gICAgZnVuY3Rpb25CcmVhayA9IHJlcXVpcmUoJy4vZnVuY3Rpb24tYnJlYWsnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUsIHRlcm1zKSB7XG4gICAgdmFyIHNwbGl0VmFsdWUgPSB7fSxcbiAgICAgICAgbnVtVGVybXMgPSB0ZXJtcy5sZW5ndGgsXG4gICAgICAgIGNvbG9ycyA9IHNwbGl0Q29tbWFEZWxpbWl0ZWQoZnVuY3Rpb25CcmVhayh2YWx1ZSkpLFxuICAgICAgICBpID0gMDtcblxuICAgIGZvciAoOyBpIDwgbnVtVGVybXM7IGkrKykge1xuICAgICAgICBzcGxpdFZhbHVlW3Rlcm1zW2ldXSA9IGNvbG9yc1tpXSAhPT0gdW5kZWZpbmVkID8gY29sb3JzW2ldIDogMTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3BsaXRWYWx1ZTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gdmFsdWUuc3BsaXQoLyxcXHMqLykgOiBbdmFsdWVdO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyB2YWx1ZS5zcGxpdCgnICcpIDogW3ZhbHVlXTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBjcmVhdGVEZWxpbWl0ZWQgPSByZXF1aXJlKCcuL21hbmlwdWxhdG9ycy9jcmVhdGUtZGVsaW1pdGVkJyksXG4gICAgcHhEZWZhdWx0cyA9IHJlcXVpcmUoJy4vcHgnKS5kZWZhdWx0UHJvcHMsXG4gICAgc3BsaXRTcGFjZURlbGltaXRlZCA9IHJlcXVpcmUoJy4vbWFuaXB1bGF0b3JzL3NwbGl0LXNwYWNlLWRlbGltaXRlZCcpLFxuICAgIHRlcm1zID0gcmVxdWlyZSgnLi9zZXR0aW5ncy9kaWN0aW9uYXJ5JykucG9zaXRpb25zO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIGRlZmF1bHRQcm9wczogcHhEZWZhdWx0cyxcblxuICAgIC8qXG4gICAgICAgIFNwbGl0IHBvc2l0aW9ucyBpbiBmb3JtYXQgXCJYIFkgWlwiXG4gICAgICAgIFxuICAgICAgICBAcGFyYW0gW3N0cmluZ106IFBvc2l0aW9uIHZhbHVlc1xuICAgICAgICAgICAgXCIyMCUgMzAlIDBcIiAtPiB7MjAlLCAzMCUsIDB9XG4gICAgICAgICAgICBcIjIwJSAzMCVcIiAtPiB7MjAlLCAzMCV9XG4gICAgICAgICAgICBcIjIwJVwiIC0+IHsyMCUsIDIwJX1cbiAgICAqL1xuICAgIHNwbGl0OiBmdW5jdGlvbiBzcGxpdCh2YWx1ZSkge1xuICAgICAgICB2YXIgcG9zaXRpb25zID0gc3BsaXRTcGFjZURlbGltaXRlZCh2YWx1ZSksXG4gICAgICAgICAgICBudW1Qb3NpdGlvbnMgPSBwb3NpdGlvbnMubGVuZ3RoLFxuICAgICAgICAgICAgc3BsaXRWYWx1ZSA9IHtcbiAgICAgICAgICAgIFg6IHBvc2l0aW9uc1swXSxcbiAgICAgICAgICAgIFk6IG51bVBvc2l0aW9ucyA+IDEgPyBwb3NpdGlvbnNbMV0gOiBwb3NpdGlvbnNbMF1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAobnVtUG9zaXRpb25zID4gMikge1xuICAgICAgICAgICAgc3BsaXRWYWx1ZS5aID0gcG9zaXRpb25zWzJdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNwbGl0VmFsdWU7XG4gICAgfSxcblxuICAgIGNvbWJpbmU6IGZ1bmN0aW9uIGNvbWJpbmUodmFsdWVzKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVEZWxpbWl0ZWQodmFsdWVzLCB0ZXJtcywgJyAnKTtcbiAgICB9XG59OyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVmYXVsdFByb3BzOiB7XG4gICAgICAgIHVuaXQ6ICdweCdcbiAgICB9XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgY3JlYXRlRGVsaW1pdGVkID0gcmVxdWlyZSgnLi9tYW5pcHVsYXRvcnMvY3JlYXRlLWRlbGltaXRlZCcpLFxuICAgIGdldENvbG9yVmFsdWVzID0gcmVxdWlyZSgnLi9tYW5pcHVsYXRvcnMvZ2V0LWNvbG9yLXZhbHVlcycpLFxuICAgIGZ1bmN0aW9uQ3JlYXRlID0gcmVxdWlyZSgnLi9tYW5pcHVsYXRvcnMvZnVuY3Rpb24tY3JlYXRlJyksXG4gICAgZGVmYXVsdFByb3BzID0gcmVxdWlyZSgnLi9zZXR0aW5ncy9kZWZhdWx0LXByb3BzJyksXG4gICAgY29sb3JEZWZhdWx0cyA9IGRlZmF1bHRQcm9wcy5jb2xvcixcbiAgICB0ZXJtcyA9IHJlcXVpcmUoJy4vc2V0dGluZ3MvZGljdGlvbmFyeScpLmNvbG9ycztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICBkZWZhdWx0UHJvcHM6IHtcbiAgICAgICAgUmVkOiBjb2xvckRlZmF1bHRzLFxuICAgICAgICBHcmVlbjogY29sb3JEZWZhdWx0cyxcbiAgICAgICAgQmx1ZTogY29sb3JEZWZhdWx0cyxcbiAgICAgICAgQWxwaGE6IGRlZmF1bHRQcm9wcy5vcGFjaXR5XG4gICAgfSxcblxuICAgIHRlc3Q6IGZ1bmN0aW9uIHRlc3QodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlICYmIHZhbHVlLmluZGV4T2YoJ3JnYicpID4gLTE7XG4gICAgfSxcblxuICAgIHNwbGl0OiBmdW5jdGlvbiBzcGxpdCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZ2V0Q29sb3JWYWx1ZXModmFsdWUsIHRlcm1zKTtcbiAgICB9LFxuXG4gICAgY29tYmluZTogZnVuY3Rpb24gY29tYmluZSh2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uQ3JlYXRlKGNyZWF0ZURlbGltaXRlZCh2YWx1ZXMsIHRlcm1zLCAnLCAnLCAyKSwgJ3JnYmEnKTtcbiAgICB9XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZWZhdWx0UHJvcHM6IHtcbiAgICAgICAgaW5pdDogMVxuICAgIH1cbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbG9yOiB7XG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWF4OiAyNTUsXG4gICAgICAgIHJvdW5kOiB0cnVlXG4gICAgfSxcbiAgICBvcGFjaXR5OiB7XG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWF4OiAxXG4gICAgfSxcbiAgICBwZXJjZW50OiB7XG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWF4OiAxMDAsXG4gICAgICAgIHVuaXQ6ICclJ1xuICAgIH1cbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBYID0gJ1gnLFxuICAgIFkgPSAnWScsXG4gICAgQUxQSEEgPSAnQWxwaGEnLFxuICAgIHRlcm1zID0ge1xuICAgIGNvbG9yczogWydSZWQnLCAnR3JlZW4nLCAnQmx1ZScsIEFMUEhBXSxcbiAgICBwb3NpdGlvbnM6IFtYLCBZLCAnWiddLFxuICAgIGRpbWVuc2lvbnM6IFsnVG9wJywgJ1JpZ2h0JywgJ0JvdHRvbScsICdMZWZ0J10sXG4gICAgc2hhZG93OiBbWCwgWSwgJ1JhZGl1cycsICdTcHJlYWQnLCAnQ29sb3InXSxcbiAgICBoc2w6IFsnSHVlJywgJ1NhdHVyYXRpb24nLCAnTGlnaHRuZXNzJywgQUxQSEFdXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRlcm1zOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgY29sb3IgPSByZXF1aXJlKCcuL2NvbG9yJyksXG4gICAgdXRpbHMgPSByZXF1aXJlKCcuLi9pbmMvdXRpbHMnKSxcbiAgICBweERlZmF1bHRzID0gcmVxdWlyZSgnLi9weCcpLmRlZmF1bHRQcm9wcyxcbiAgICB0ZXJtcyA9IHJlcXVpcmUoJy4vc2V0dGluZ3MvZGljdGlvbmFyeScpLnNoYWRvdyxcbiAgICBzcGxpdFNwYWNlRGVsaW1pdGVkID0gcmVxdWlyZSgnLi9tYW5pcHVsYXRvcnMvc3BsaXQtc3BhY2UtZGVsaW1pdGVkJyksXG4gICAgY3JlYXRlRGVsaW1pdGVkID0gcmVxdWlyZSgnLi9tYW5pcHVsYXRvcnMvY3JlYXRlLWRlbGltaXRlZCcpLFxuICAgIHNoYWRvd1Rlcm1zID0gdGVybXMuc2xpY2UoMCwgNCk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgZGVmYXVsdFByb3BzOiB1dGlscy5tZXJnZShjb2xvci5kZWZhdWx0UHJvcHMsIHtcbiAgICAgICAgWDogcHhEZWZhdWx0cyxcbiAgICAgICAgWTogcHhEZWZhdWx0cyxcbiAgICAgICAgUmFkaXVzOiBweERlZmF1bHRzLFxuICAgICAgICBTcHJlYWQ6IHB4RGVmYXVsdHNcbiAgICB9KSxcblxuICAgIC8qXG4gICAgICAgIFNwbGl0IHNoYWRvdyBwcm9wZXJ0aWVzIFwiWCBZIFJhZGl1cyBTcHJlYWQgQ29sb3JcIlxuICAgICAgICBcbiAgICAgICAgQHBhcmFtIFtzdHJpbmddOiBTaGFkb3cgcHJvcGVydHlcbiAgICAgICAgQHJldHVybiBbb2JqZWN0XVxuICAgICovXG4gICAgc3BsaXQ6IGZ1bmN0aW9uIHNwbGl0KHZhbHVlKSB7XG4gICAgICAgIHZhciBiaXRzID0gc3BsaXRTcGFjZURlbGltaXRlZCh2YWx1ZSksXG4gICAgICAgICAgICBudW1CaXRzID0gYml0cy5sZW5ndGgsXG4gICAgICAgICAgICBoYXNSZWFjaGVkQ29sb3IgPSBmYWxzZSxcbiAgICAgICAgICAgIGNvbG9yUHJvcCA9ICcnLFxuICAgICAgICAgICAgdGhpc0JpdCxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgc3BsaXRWYWx1ZSA9IHt9O1xuXG4gICAgICAgIGZvciAoOyBpIDwgbnVtQml0czsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzQml0ID0gYml0c1tpXTtcblxuICAgICAgICAgICAgLy8gSWYgd2UndmUgcmVhY2hlZCB0aGUgY29sb3IgcHJvcGVydHksIGFwcGVuZCB0byBjb2xvciBzdHJpbmdcbiAgICAgICAgICAgIGlmIChoYXNSZWFjaGVkQ29sb3IgfHwgY29sb3IudGVzdCh0aGlzQml0KSkge1xuICAgICAgICAgICAgICAgIGhhc1JlYWNoZWRDb2xvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29sb3JQcm9wICs9IHRoaXNCaXQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNwbGl0VmFsdWVbdGVybXNbaV1dID0gdGhpc0JpdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB1dGlscy5tZXJnZShzcGxpdFZhbHVlLCBjb2xvci5zcGxpdChjb2xvclByb3ApKTtcbiAgICB9LFxuXG4gICAgY29tYmluZTogZnVuY3Rpb24gY29tYmluZSh2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZURlbGltaXRlZCh2YWx1ZXMsIHNoYWRvd1Rlcm1zLCAnICcpICsgY29sb3IuY29tYmluZSh2YWx1ZXMpO1xuICAgIH1cbn07IiwiY2xhc3MgZXhwb3J0cy5CdXR0b24gZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnM9e30pIC0+XG5cblx0XHRAdHlwZSA9IG9wdGlvbnMudHlwZSB8fCBcInNpbmdsZVwiXG5cdFx0QGJhc2VDb2xvciA9IFwiIzY2NlwiXG5cdFx0QGhvdmVyQ29sb3IgPSBcIiMzMzNcIlxuXHRcdEBjbGlja0NvbG9yID0gXCIjNjY2XCJcblx0XHRAY2xpY2tDb2xvciA9IFwiIzIyMlwiXG5cdFx0QGRlZmF1bHRfaGVpZ2h0ID0gNDBcblx0XHRAZGVmYXVsdF93aWR0aCA9IDYwXG5cdFx0QHRleHRTaXplID0gXCIxNnB4XCJcblxuXHRcdCMgbWF5YmUgaXQgY291bGQgYmUgYSBkZWZhdWx0IGZ1bmN0aW9uIC0+IHByaW50IFwiQWN0aW9uIG5vdCBkZWZpbmVkXCJcblxuXHRcdEBhY3Rpb24gPSBvcHRpb25zLmFjdGlvbiB8fCAtPiBwcmludCBcIlRoaXMgd2FzIENsaWNrZWRcIlxuXHRcdEBsYWJlbCA9IG9wdGlvbnMubGFiZWwgfHwgXCJidXR0b25cIlxuXHRcdCNkZWZhdWx0c1xuXHRcdG9wdGlvbnMueCA9IG9wdGlvbnMueCB8fCB4IC8gMlxuXHRcdG9wdGlvbnMueSA9IG9wdGlvbnMueSB8fCB5IC8gMlxuXHRcdG9wdGlvbnMud2lkdGggPSBvcHRpb25zLndpZHRoIHx8IEBkZWZhdWx0X3dpZHRoXG5cdFx0b3B0aW9ucy5oZWlnaHQgPSBvcHRpb25zLmhlaWdodCB8fCBAZGVmYXVsdF9oZWlnaHQgXG5cdFx0b3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPSBvcHRpb25zLmJhY2tncm91bmRDb2xvciB8fCBAYmFzZUNvbG9yXG5cdFx0b3B0aW9ucy5zdXBlckxheWVyID0gb3B0aW9ucy5zdXBlckxheWVyIHx8IFwiXCJcblxuXHRcdHN1cGVyIG9wdGlvbnNcblx0XHQjc2hvdWxkIHVzZSBhIHN3aXRjaFxuXHRcdHdpbmRvdy5VdGlscy5sYWJlbExheWVyKEAsIEBsYWJlbClcblxuXHRcdGlmIEB0eXBlIGlzIFwibGVmdFwiXG5cdFx0XHRAc3R5bGUgPVxuXHRcdFx0XHRcImJvcmRlclwiOlwiMnB4IHNvbGlkIHdoaXRlXCJcblx0XHRcdFx0XCJib3JkZXItdG9wLWxlZnQtcmFkaXVzXCI6XCIyMHB4XCJcblx0XHRcdFx0XCJib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzXCI6XCIyMHB4XCJcblx0XHRcdFx0XCJmb250U2l6ZVwiOkB0ZXh0U2l6ZVxuXG5cdFx0ZWxzZSBpZiBAdHlwZSBpcyBcInJpZ2h0XCJcblx0XHRcdEBzdHlsZSA9IFxuXHRcdFx0XHRcImJvcmRlclwiOlwiMnB4IHNvbGlkIHdoaXRlXCJcblx0XHRcdFx0XCJib3JkZXItdG9wLXJpZ2h0LXJhZGl1c1wiOlwiMjBweFwiXG5cdFx0XHRcdFwiYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXNcIjpcIjIwcHhcIlxuXHRcdFx0XHRcImZvbnRTaXplXCI6QHRleHRTaXplXG5cdFx0XHRcdFxuXHRcdGVsc2UgaWYgQHR5cGUgaXMgXCJtaWRkbGVcIlxuXHRcdFx0QHN0eWxlID0gXG5cdFx0XHRcdFwiYm9yZGVyXCI6XCIycHggc29saWQgd2hpdGVcIlxuXHRcdFx0XHRcImZvbnRTaXplXCI6QHRleHRTaXplXG5cdFx0XHRcdFxuXHRcdGVsc2UgaWYgQHR5cGUgaXMgXCJzaW5nbGVcIlxuXHRcdFx0QHN0eWxlID0gXG5cdFx0XHRcdFwiYm9yZGVyXCI6XCIycHggc29saWQgd2hpdGVcIlxuXHRcdFx0XHRcImJvcmRlci10b3AtbGVmdC1yYWRpdXNcIjpcIjIwcHhcIlxuXHRcdFx0XHRcImJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXNcIjpcIjIwcHhcIlxuXHRcdFx0XHRcImJvcmRlci10b3AtcmlnaHQtcmFkaXVzXCI6XCIyMHB4XCJcblx0XHRcdFx0XCJib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1c1wiOlwiMjBweFwiXG5cdFx0XHRcdFwiZm9udFNpemVcIjpAdGV4dFNpemVcblx0XHRcblx0XHRcblxuXHRcdCNldmVudHNcblxuXHRcdEBvbiBFdmVudHMuTW91c2VPdmVyLCAtPlxuXHRcdFx0QHN0eWxlID1cblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOkBob3ZlckNvbG9yXG5cdFx0XHRcdFwiYm9yZGVyLWNvbG9yXCI6XCIxcHggc29saWQgI2NjY1wiXG5cblxuXHRcdEAub24gRXZlbnRzLkNsaWNrLCAtPlxuXHRcdFx0I3NpbXBsZSBib3VuY2VcdFx0XHRcblx0XHRcdCNjYWxsIGFjdGlvbiBmb3IgY2xpY2tcblxuXHRcdFx0QGFjdGlvbigpXG5cblxuXHRcdEAub24gRXZlbnRzLk1vdXNlT3V0LCAtPlxuXHRcdFx0QHN0eWxlID1cblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOkBiYXNlQ29sb3JcblxuXHRcdCNzaW1wbGUgXCJyZWR1Y2UgaXRcIiBlZmZlY3Rcblx0XHRALm9uIEV2ZW50cy5Ub3VjaFN0YXJ0LCAtPlxuXHRcdFx0QHNjYWxlID0gMC45NVxuXHRcdFx0QHN0eWxlID1cblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOkBjbGlja0NvbG9yXG5cblx0XHRALm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT5cblx0XHRcdEBzY2FsZSA9IDFcblx0XHRcdEBzdHlsZSA9XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjpAYmFzZUNvbG9yXG5cdFx0I2lmIHN0YXRlcyBhcmUgdXNlZDpcblxuXHRcdEBzdGF0ZXMuYWRkXG5cdFx0XHRob3Zlcjp7fVxuXHRcdFx0bm9ybWFsOnt9XG5cdFx0XHRwcmVzc2VkOnt9IiwiZXhwb3J0cy5wb3Btb3Rpb24gPSByZXF1aXJlKFwibnBtXCIpLnBvcG1vdGlvblxuZXhwb3J0cy5Db250cm9sbGVyID0ge1xuXHQjc3RhY2sgc3RvcmVzIHRoZSBzY3JlZW5zIHRoYXQgYXJlIHByZXNlbnQgaW4gdGhlIG5hdmlnYXRpb24gdHJlZS5cblx0c3RhY2sgOiBbXVxuXHRzY3JlZW5zIDogW11cblx0YWN0aXZlIDogLTEgXG5cdCNkaXNhYmxlIGl0IGZvciBwcm9kdWN0aW9uXG5cdGN1cnJlbnQgOiBcIm5vbmVcIlxuXHRkZWJ1ZyA6IHRydWVcblx0YWRkOiAoc2NyZWVuKSAtPlxuXHRcdHByaW50IHNjcmVlbi5uYW1lXG5cdFx0I2FkZCB0aGUgc2NyZWVuIHRvIHRoZSBzY3JlZW4gY29sbGVjdGlvblxuXHRcdEBzY3JlZW5zW3NjcmVlbi5uYW1lXSA9IHNjcmVlblxuXHRyZW1vdmU6IChzY3JlZW5OYW1lKSAtPlxuXHRcdCN2ZXJpZnkgaWYgc2NyZWVuIGV4aXN0c1xuXHRcdGlmIG5vdCBAc2NyZWVucy5oYXNPd25Qcm9wZXJ0eSBzY3JlZW5OYW1lXG5cdFx0XHRwcmludCBcInRoaXMgc2NyZWVuICN7c2NyZWVuTmFtZX0gZG9lc24ndCBleGlzdFwiXG5cdFx0XHRyZXR1cm5cblx0XHRkZWxldGUgQHNjcmVlbnNbc2NyZWVuTmFtZV1cblx0XHQjcmVtb3ZlIGZyb20gc3RhY2sgYXMgd2VsbCBpZiBwcmVzZW50XG5cdFx0QHN0YWNrID0gXy53aXRob3V0IEBzdGFja3MsIHNjcmVlbk5hbWVcblxuXHRzaG93IDogKHNjcmVlbk5hbWUpIC0+XG5cdFx0I2FkZCB0aGUgc2NyZWVuIHRvIHRoZSBzdGFjbFxuXHRcdCNzaG93IGl0XG5cdFx0I2lmIEBzdGFjay5sZW5ndGggaXMgMFxuXHRcdHByaW50IFwibGV0cyBzaG93ICN7c2NyZWVuTmFtZX0gLSBzdGFjayBzaXplIGlzICN7QHN0YWNrLmxlbmd0aH0gYW5kIHdlIHdpbGwgZXhpdCBhbmltYXRlIFwiXG5cdFx0I2xldCdzIGNoZWNrIGlmIGl0IGlzIHRoZSBmaXJzdCBzY3JlZW5cblx0XHRpZiBAc3RhY2subGVuZ3RoIGlzIDBcblx0XHRcdEBzdGFjay5wdXNoKEBzY3JlZW5zW3NjcmVlbk5hbWVdKVxuXHRcdFx0QHNjcmVlbnNbc2NyZWVuTmFtZV0uZW50ZXJBbmltYXRpb24oKVxuXHRcdGVsc2Vcblx0XHRcdHByaW50IFwidGhlcmUncyBzb21ldGhpbmcgdGhlcmUuIEV4aXQgaXQgZmlyc3RcIlxuXHRcdFx0I2lmIG5vdCB0aGUgZmlyc3QsIGV4aXQgcHJldmlvdXMsIHRoZW4gYW5pbWF0ZSBjdXJyZW50XG5cdFx0XHRAc3RhY2tbQHN0YWNrLmxlbmd0aC0xXS5leGl0QW5pbWF0aW9uKClcblx0XHRcdCNhZGQgbmV3IHNjcmVlbiB0byBzdGFja1xuXHRcdFx0QHN0YWNrLnB1c2goQHNjcmVlbnNbc2NyZWVuTmFtZV0pXG5cdFx0XHQjYW5pbWF0ZSBpdDFcblx0XHRcdEBzY3JlZW5zW3NjcmVlbk5hbWVdLmVudGVyQW5pbWF0aW9uKClcblxuXG5cdFx0cHJpbnQgXCJhbmQgd2UncmUgZ29sZCAje0BzdGFjay5sZW5ndGh9XCJcblx0XHRpZiBAYWN0aXZlIGlzIC0xIFxuXHRcdFx0QGFjdGl2ZSA9IDBcblx0XHRpZiBALmRlYnVnIHRoZW4gcHJpbnQgXCJhZGRlZCAje3NjcmVlbk5hbWV9LCBzdGFjayBpcyBub3c6ICN7QHN0YWNrLmxlbmd0aH0gYmlnXCJcblx0XG5cdGhpZGUgOiAoKSAtPlxuXHRcdGlmIEBzdGFjay5sZW5ndGggPiAwXG5cdFx0XHRAc3RhY2tbQHN0YWNrLmxlbmd0aC0xXS5leGl0QW5pbWF0aW9uKClcblx0XHRlbHNlXG5cdFx0XHRpZiBAZGVidWcgdGhlbiBwcmludCBcImVuZCBvZiBzdGFja1wiXG5cdFx0XHRcblx0XHRpZiBAZGVidWcgdGhlbiBwcmludCBcInJlbW92aW5nIFNDLCBjdXJyZW50IHNpemU6ICN7QHN0YWNrLmxlbmd0aH0gIFwiXG5cdFx0XHRcblx0XHRAc3RhY2sucG9wKClcblx0XHRcblx0XHRpZiBAZGVidWcgdGhlbiBwcmludCBcIkRvbmUuIE5ldyBjdXJyZW50IHNpemU6ICN7QHN0YWNrLmxlbmd0aH0gIFwiXG5cdFxuXHRiYWNrIDogKGV4aXQ9ZmFsc2UpIC0+XG5cdFx0I2NoZWNrIGlmIHdlJ3JlIG5vdCBpbiB0aGUgbGltaXQgYWxyZWFkeVxuXHRcdHByaW50IFwicHJpbnRpbmcgI3tAc3RhY2subGVuZ3RofSBleGl0LS0tPlwiK2V4aXRcblx0XHRpZiBAc3RhY2subGVuZ3RoID4gMSBcblx0XHRcdCNoaWRlIGN1cnJlbnQgc2NyZWVuXG5cdFx0XHRAc3RhY2tbQHN0YWNrLmxlbmd0aC0xXS5leGl0QW5pbWF0aW9uKClcblx0XHRcdCNyZW1vdmUgZnJvbSBzdGFja1xuXHRcdFx0QHN0YWNrLnBvcCgpXG5cdFx0XHRpZiBAc3RhY2subGVuZ3RoID4gMFxuXHRcdFx0XHRAc3RhY2tbQHN0YWNrLmxlbmd0aC0xXS5lbnRlckFuaW1hdGlvbigpXG5cdFx0I2xhc3Qgc2NyZWVuIHJlYWNoZWRcdFxuXHRcdGVsc2Vcblx0XHRcdGlmIGV4aXQgaXMgZmFsc2Vcblx0XHRcdFx0cHJpbnQgXCJsYXN0IHNjcmVlbiBvciBleGl0IHdhcyB0cnVlPyA6ICN7ZXhpdH1cIlxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRwcmludCBcImNsb3NlIHRoZSBhcHBcIlxuXG5cdHByaW50U3RhY2sgOiAtPlxuXHRcdHByaW50IFwiU1RBQ0sgc2l6ZTogI3tAc3RhY2subGVuZ3RofSAgfCBBY3RpdmUgaXMgI3tAYWN0aXZlfSB8IGNoZWNraW5nIG5hbWUgYmFzZWQgI3tAc2NyZWVuc1tcImhvbWVcIl19XCJcblx0XHRmb3Igc2NyZWVuIGluIEBzdGFja1xuXHRcdFx0cHJpbnQgc2NyZWVuLm5hbWVcbn0iLCJcbiMjI1xuQSBTY3JlZW4gaXMgYSB0b3AgbGV2ZWwgbGF5ZXIgdGhhdCBjYW4gYmUgbGlua2VkIHRvIG90aGVycyBzY3JlZW5zIGVhc2lseSB3aXRoXG5hIENvbnRyb2xsZXIuIFRoZSBjb21ibyBTY3JlZW4gKyBDb250cm9sbGVyIGlzIHRoZSBzaW1wbGVzdCB3YXkgdG8gYm9vdHN0cmFwIHlvdXJcbnByb3RvdHlwZS4gQSBzaW1wbGUgY29sbGVjdGlvbiBvZiBTY3JlZW5zIHdpbGwgYmUgYSBuaWNlIGNsaWNrYWJsZSBwcm90b3R5cGUgbGlrZSBpbnZpc2lvLiBcblRoZW4geW91IGNhbiBzbG93bHkgZGV2ZWxvcCBlYWNoIHNjcmVlbiwgaW5kZXBlbmRlbnRseSBhbmQgaW5jcmVhc2UgdGhlIGRldGFpbCBvZiB5b3VyIHByb3RvdHlwZS5cblxuRmlyc3QsICBcImRlZmF1bHRcIiBjbGFzcyB2YXJpYWJsZXMuIHlvdSBzaG91bGQgYWNjZXNzIHRoaXMgd2l0aCBTY3JlZW5Db21wb25lbnQuVkFSIFxuSSBhZGRlZCBpbnN0YW5jZSB2YXJpYWJsZXMgZm9yIGVhY2ggb2YgdGhvc2UgY2xhc3MgdmFyaWFibGVzLCBzbyB5b3UgY2FuIG92ZXJyaWRlIG9uIGluc3RhbmNlIGxldmVsXG5PciBjbGFzcyBsZXZlbC4gSWYgeW91IGRvbid0IHBhc3MgYW55IGFyZ3VtZW50cyB0byB0aGUgY3JlYXRpb24gKG5ldyBTY3JlZW5Db21wb25lbnQgKSBpdCB3aWxsXG5hbHdheXMgdXNlIHRoZSBkZWZhdWx0LlxuXG5AZGVidWcgXHRcdFx0PSBhZGQgYSBsYWJlbCB3aXRoIGEgbmFtZSB0byB0aGUgc2NyZWVuIHRvIG1ha2UgaXQgZWFzaWVyIHRvIC4uIGR1aCBkZWJ1Zy5cbkBjdXJ2ZSBcdFx0XHQ9IGRlZmF1bHQgY3VydmUgZm9yIGFsbCBhbmltYXRpb25zIHJlbGF0ZWQgdG8gdGhlIFNjcmVlbkNvbXBvbmVudFxuQHNjcmVlblcgXHRcdD0gZGVmYXVsdCBzaXplIGZvciBuZXcgU2NyZWVuIENvbXBvbmVudHMsIGJhc2VkIG5vdyBvbiB0aGUgU2NyZWVuIHNpemUgKGRldmljZSB5b3UgcGlja2VkIC8gY3JlYXRlZClcbkBzY3JlZW5IIFx0XHQ9IFNhbWUsIGJ1dCBmb3IgaGVpZ2guXG5cblxuVGhlIFNjcmVlbiBvYmplY3QgY3JlYXRlcyBhIGZpcnN0IGxheWVyICggQCApIHRoYXQgYmVoYXZlcyBqdXN0IGxpa2UgYSBub3JtYWwgbGF5ZXIuXG5UaGVzZSBhcmUgdGhlIGN1c3RvbSBmaWVsZHMgdG8gbWFrZSBvdXIgbGlmZSBlYXNpZXIgZm9yIG5vdzpcblxuXG5cbiMjI1xuXG5jbGFzcyBleHBvcnRzLlNjcmVlbkNvbXBvbmVudCBleHRlbmRzIExheWVyXG5cblx0I2Rpc2FibGUgZm9yIHByb2R1Y3Rpb25cblx0QGRlYnVnID0gdHJ1ZVxuXHQjZGVmYXVsdCBjdXJ2ZSBmb3Igc2NyZWVuIGVudGVyaW5nXG5cdEBjdXJ2ZSA9IFwic3ByaW5nKDgwMCw5MCwxMClcIlxuXHRAc2NyZWVuVyA9IFNjcmVlbi53aWR0aFxuXHRAc2NyZWVuSCA9IFNjcmVlbi5oZWlnaHRcblx0XG5cblx0Y29uc3RydWN0b3I6KG9wdGlvbnM9e30pIC0+XG5cdFx0I2luc3RhbmNlIHZhcmlhYmxlc1xuXHRcdEBjb250YWluZXIgPSBcImVtcHR5XCJcblx0XHRAYWN0aXZlID0gZmFsc2VcblxuXHRcdG9wdGlvbnMud2lkdGggPSBvcHRpb25zLndpZHRoIHx8IFNjcmVlbkNvbXBvbmVudC5zY3JlZW5XXG5cdFx0b3B0aW9ucy5oZWlnaHQgPSBvcHRpb25zLmhlaWdodCB8fCBTY3JlZW5Db21wb25lbnQuc2NyZWVuSFxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID0gb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgfHwgVXRpbHMucmFuZG9tQ29sb3IoKVxuXHRcdG9wdGlvbnMueCA9IG9wdGlvbnMueCB8fCAwIFxuXHRcdG9wdGlvbnMubmFtZSA9IG9wdGlvbnMubmFtZSB8fCBcIm5vTmFtZVwiXG5cdFx0b3B0aW9ucy5jdXJ2ZSA9IG9wdGlvbnMuY3VydmUgfHwgU2NyZWVuQ29tcG9uZW50LmN1cnZlIHx8IFwic3ByaW5nKDkwMCw5MCwxMClcIlxuXHRcdHN1cGVyIG9wdGlvbnNcblx0XHRpZiBTY3JlZW5Db21wb25lbnQuZGVidWcgdGhlbiBVdGlscy5sYWJlbExheWVyKEAsIFwiICN7QG5hbWV9IC0gI3tALmlkfVwiKVxuXHRcdGNhbnZhcyA9IG5ldyBMYXllciB3aWR0aDpTY3JlZW5Db21wb25lbnQuc2NyZWVuVywgaGVpZ2h0OlNjcmVlbkNvbXBvbmVudC5zY3JlZW5ILCBzdXBlckxheWVyOkAsYmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIixuYW1lOkAubmFtZStcIi0gQ2FudmFzXCJcblx0XHRpZiBvcHRpb25zLnNjcm9sbGFibGUgaXMgdHJ1ZVxuXHRcdFx0I3ByaW50IFwiY3JlYXRpbmcgc2Nyb2xsYWJsZVwiXG5cdFx0XHRAY29udGFpbmVyID0gbmV3IFNjcm9sbENvbXBvbmVudCB3aWR0aDpTY3JlZW5Db21wb25lbnQuc2NyZWVuVywgaGVpZ2h0OlNjcmVlbkNvbXBvbmVudC5zY3JlZW5ILCBzdXBlckxheWVyOkAgLGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCIsc2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRlbHNlXG5cdFx0XHQjcHJpbnQgXCJubyBzY3JvbGxcIlxuXHRcdFx0QGNvbnRhaW5lciA9IG5ldyBMYXllciB3aWR0aDpTY3JlZW5Db21wb25lbnQuc2NyZWVuVywgaGVpZ2h0OlNjcmVlbkNvbXBvbmVudC5zY3JlZW5ILCBzdXBlckxheWVyOkAsYmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuXHRcblx0ZW50ZXJBbmltYXRpb246IC0+XG5cdFx0QGFjdGl2ZSA9IHRydWVcblx0XHRAdmlzaWJsZSA9IHRydWVcblx0XHRAYW5pbWF0ZVxuXHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0eDowXG5cdFx0XHRcdG9wYWNpdHk6MVxuXHRcdFx0XHRzY2FsZToxXG5cdFx0XHRjdXJ2ZTpTY3JlZW5Db21wb25lbnQuY3VydmVcblx0XHRwcmludCBcImVudGVyXCJcblx0XHRcblx0ZXhpdEFuaW1hdGlvbjogLT5cblx0XHRAYWN0aXZlID0gZmFsc2Vcblx0XHRAYW5pbWF0ZVxuXHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0c2NhbGU6MC44XG5cdFx0XHRcdHg6QHgtNDAwXG5cdFx0XHRcdG9wYWNpdHk6MFxuXHRcdFx0Y3VydmU6U2NyZWVuQ29tcG9uZW50LmN1cnZlXG5cdFx0VXRpbHMuZGVsYXkgMC41LCAtPlxuXHRcdFx0QHZpc2libGUgPSBmYWxzZVxuXHRcdHByaW50IFwiZXhpdFwiXG5cdFx0XG5cdGJhY2tBbmltYXRpb246IC0+XG5cdFx0QGFjdGl2ZSA9IGZhbHNlXG5cdFx0QGFuaW1hdGVcblx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdHg6U2NyZWVuQ29tcG9uZW50LnNjcmVlbldcblx0XHRcdFx0b3BhY2l0eToxXG5cdFx0XHRjdXJ2ZTpTY3JlZW5Db21wb25lbnQuY3VydmVcblx0XHRVdGlscy5kZWxheSAwLjUsIC0+XG5cdFx0XHRAdmlzaWJsZSA9IGZhbHNlXG5cdFx0cHJpbnQgXCJleGl0XCJcblx0XHRcblx0c3RhcnQ6IC0+XG5cdFx0cHJpbnQgXCJzdGFydGluZyAje0BuYW1lfVwiXG5cdFx0QGFjdGl2ZSA9IHRydWVcblx0cGF1c2U6IC0+XG5cdFx0cHJpbnQgXCJwYXVzaW5nICN7QG5hbWV9XCJcdFx0XG5cdFx0QGFjdGl2ZSA9IGZhbHNlXG5cdHJlc2V0OiAtPlxuXHRcdHByaW50IFwicmVzZXQgI3tAbmFtZX1cIlxuXHQiLCIjY29yZSBjbGFzcyBzY3JlZW5cdFxuY2xhc3MgZXhwb3J0cy5TY3JlZW4gZXh0ZW5kcyBMYXllclxuXHQjZGVmYXVsdCBjdXJ2ZSBmb3Igc2NyZWVuIGVudGVyaW5nXG5cdEBjdXJ2ZSA9IFwic3ByaW5nKDgwMCw5MCwxMClcIlxuXHRjb250YWluZXIgPSBcImVtcHR5XCJcblx0YWN0aXZlID0gZmFsc2Vcblx0XG5cdGNvbnN0cnVjdG9yOihvcHRpb25zPXt9KSAtPlxuXHRcdG9wdGlvbnMud2lkdGggPSBvcHRpb25zLndpZHRoIHx8IHNjcmVlbldcblx0XHRvcHRpb25zLmhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0IHx8IHNjcmVlbkhcblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA9IG9wdGlvbnMuYmFja2dyb3VuZENvbG9yIHx8IFV0aWxzLnJhbmRvbUNvbG9yKClcblx0XHRvcHRpb25zLnggPSBvcHRpb25zLnggfHwgbmV3U2NyZWVuUG9zaXRpb24gKyAgQ1Muc2NyZWVucy5sZW5ndGggKiAyMFxuXHRcdHN1cGVyIG9wdGlvbnNcblx0XHRDUy5hZGRTY3JlZW4oQClcblx0XHRcblx0XHRcblx0XHRjYW52YXMgPSBuZXcgTGF5ZXIgd2lkdGg6c2NyZWVuVywgaGVpZ2h0OnNjcmVlbkgsIHN1cGVyTGF5ZXI6QCxiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG5cdFx0aWYgb3B0aW9ucy5zY3JvbGxhYmxlIGlzIHRydWVcblx0XHRcdCNwcmludCBcImNyZWF0aW5nIHNjcm9sbGFibGVcIlxuXHRcdFx0QGNvbnRhaW5lciA9IG5ldyBTY3JvbGxDb21wb25lbnQgd2lkdGg6c2NyZWVuVywgaGVpZ2h0OnNjcmVlbkgsIHN1cGVyTGF5ZXI6QCAsYmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIixzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdGVsc2Vcblx0XHRcdCNwcmludCBcIm5vIHNjcm9sbFwiXG5cdFx0XHRAY29udGFpbmVyID0gbmV3IExheWVyIHdpZHRoOnNjcmVlblcsIGhlaWdodDpzY3JlZW5ILCBzdXBlckxheWVyOkAsYmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuXHRcblx0ZW50ZXJBbmltYXRpb246IC0+XG5cdFx0QGFjdGl2ZSA9IHRydWVcblx0XHRAdmlzaWJsZSA9IHRydWVcblx0XHRAYW5pbWF0ZVxuXHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0eDowXG5cdFx0XHRcdG9wYWNpdHk6MVxuXHRcdFx0XHRzY2FsZToxXG5cdFx0XHRjdXJ2ZTpTY3JlZW4uY3VydmVcblx0XHRwcmludCBcImVudGVyXCJcblx0XHRcblx0ZXhpdEFuaW1hdGlvbjogLT5cblx0XHRAYWN0aXZlID0gZmFsc2Vcblx0XHRAYW5pbWF0ZVxuXHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0c2NhbGU6MC44XG5cdFx0XHRcdHg6QHgtNDAwXG5cdFx0XHRcdG9wYWNpdHk6MFxuXHRcdFx0Y3VydmU6U2NyZWVuLmN1cnZlXG5cdFx0VXRpbHMuZGVsYXkgMC41LCAtPlxuXHRcdFx0QHZpc2libGUgPSBmYWxzZVxuXHRcdHByaW50IFwiZXhpdFwiXG5cdFx0XG5cdGJhY2tBbmltYXRpb246IC0+XG5cdFx0QGFjdGl2ZSA9IGZhbHNlXG5cdFx0QGFuaW1hdGVcblx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdHg6c2NyZWVuV1xuXHRcdFx0XHRvcGFjaXR5OjFcblx0XHRcdGN1cnZlOlNjcmVlbi5jdXJ2ZVxuXHRcdFV0aWxzLmRlbGF5IDAuNSwgLT5cblx0XHRcdEB2aXNpYmxlID0gZmFsc2Vcblx0XHRwcmludCBcImV4aXRcIlxuXHRcdFxuXHRzdGFydDogLT5cblx0XHRwcmludCBcInN0YXJ0aW5nICN7QG5hbWV9XCJcblx0XHRAYWN0aXZlID0gdHJ1ZVxuXHRwYXVzZTogLT5cblx0XHRwcmludCBcInBhdXNpbmcgI3tAbmFtZX1cIlx0XHRcblx0XHRAYWN0aXZlID0gZmFsc2Vcblx0cmVzZXQ6IC0+XG5cdFx0cHJpbnQgXCJyZXNldCAje0BuYW1lfVwiXG5cdFx0XG5cdCIsImV4cG9ydHMucG9wbW90aW9uID0gcmVxdWlyZSBcInBvcG1vdGlvblwiXG4iXX0=
