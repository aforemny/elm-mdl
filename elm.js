var Elm = Elm || { Native: {} };
Elm.Native.Basics = {};
Elm.Native.Basics.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Basics = localRuntime.Native.Basics || {};
	if (localRuntime.Native.Basics.values)
	{
		return localRuntime.Native.Basics.values;
	}

	var Utils = Elm.Native.Utils.make(localRuntime);

	function div(a, b)
	{
		return (a / b) | 0;
	}
	function rem(a, b)
	{
		return a % b;
	}
	function mod(a, b)
	{
		if (b === 0)
		{
			throw new Error('Cannot perform mod 0. Division by zero error.');
		}
		var r = a % b;
		var m = a === 0 ? 0 : (b > 0 ? (a >= 0 ? r : r + b) : -mod(-a, -b));

		return m === b ? 0 : m;
	}
	function logBase(base, n)
	{
		return Math.log(n) / Math.log(base);
	}
	function negate(n)
	{
		return -n;
	}
	function abs(n)
	{
		return n < 0 ? -n : n;
	}

	function min(a, b)
	{
		return Utils.cmp(a, b) < 0 ? a : b;
	}
	function max(a, b)
	{
		return Utils.cmp(a, b) > 0 ? a : b;
	}
	function clamp(lo, hi, n)
	{
		return Utils.cmp(n, lo) < 0 ? lo : Utils.cmp(n, hi) > 0 ? hi : n;
	}

	function xor(a, b)
	{
		return a !== b;
	}
	function not(b)
	{
		return !b;
	}
	function isInfinite(n)
	{
		return n === Infinity || n === -Infinity;
	}

	function truncate(n)
	{
		return n | 0;
	}

	function degrees(d)
	{
		return d * Math.PI / 180;
	}
	function turns(t)
	{
		return 2 * Math.PI * t;
	}
	function fromPolar(point)
	{
		var r = point._0;
		var t = point._1;
		return Utils.Tuple2(r * Math.cos(t), r * Math.sin(t));
	}
	function toPolar(point)
	{
		var x = point._0;
		var y = point._1;
		return Utils.Tuple2(Math.sqrt(x * x + y * y), Math.atan2(y, x));
	}

	return localRuntime.Native.Basics.values = {
		div: F2(div),
		rem: F2(rem),
		mod: F2(mod),

		pi: Math.PI,
		e: Math.E,
		cos: Math.cos,
		sin: Math.sin,
		tan: Math.tan,
		acos: Math.acos,
		asin: Math.asin,
		atan: Math.atan,
		atan2: F2(Math.atan2),

		degrees: degrees,
		turns: turns,
		fromPolar: fromPolar,
		toPolar: toPolar,

		sqrt: Math.sqrt,
		logBase: F2(logBase),
		negate: negate,
		abs: abs,
		min: F2(min),
		max: F2(max),
		clamp: F3(clamp),
		compare: Utils.compare,

		xor: F2(xor),
		not: not,

		truncate: truncate,
		ceiling: Math.ceil,
		floor: Math.floor,
		round: Math.round,
		toFloat: function(x) { return x; },
		isNaN: isNaN,
		isInfinite: isInfinite
	};
};

Elm.Native.Port = {};

Elm.Native.Port.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Port = localRuntime.Native.Port || {};
	if (localRuntime.Native.Port.values)
	{
		return localRuntime.Native.Port.values;
	}

	var NS;

	// INBOUND

	function inbound(name, type, converter)
	{
		if (!localRuntime.argsTracker[name])
		{
			throw new Error(
				'Port Error:\n' +
				'No argument was given for the port named \'' + name + '\' with type:\n\n' +
				'    ' + type.split('\n').join('\n        ') + '\n\n' +
				'You need to provide an initial value!\n\n' +
				'Find out more about ports here <http://elm-lang.org/learn/Ports.elm>'
			);
		}
		var arg = localRuntime.argsTracker[name];
		arg.used = true;

		return jsToElm(name, type, converter, arg.value);
	}


	function inboundSignal(name, type, converter)
	{
		var initialValue = inbound(name, type, converter);

		if (!NS)
		{
			NS = Elm.Native.Signal.make(localRuntime);
		}
		var signal = NS.input('inbound-port-' + name, initialValue);

		function send(jsValue)
		{
			var elmValue = jsToElm(name, type, converter, jsValue);
			setTimeout(function() {
				localRuntime.notify(signal.id, elmValue);
			}, 0);
		}

		localRuntime.ports[name] = { send: send };

		return signal;
	}


	function jsToElm(name, type, converter, value)
	{
		try
		{
			return converter(value);
		}
		catch(e)
		{
			throw new Error(
				'Port Error:\n' +
				'Regarding the port named \'' + name + '\' with type:\n\n' +
				'    ' + type.split('\n').join('\n        ') + '\n\n' +
				'You just sent the value:\n\n' +
				'    ' + JSON.stringify(value) + '\n\n' +
				'but it cannot be converted to the necessary type.\n' +
				e.message
			);
		}
	}


	// OUTBOUND

	function outbound(name, converter, elmValue)
	{
		localRuntime.ports[name] = converter(elmValue);
	}


	function outboundSignal(name, converter, signal)
	{
		var subscribers = [];

		function subscribe(handler)
		{
			subscribers.push(handler);
		}
		function unsubscribe(handler)
		{
			subscribers.pop(subscribers.indexOf(handler));
		}

		function notify(elmValue)
		{
			var jsValue = converter(elmValue);
			var len = subscribers.length;
			for (var i = 0; i < len; ++i)
			{
				subscribers[i](jsValue);
			}
		}

		if (!NS)
		{
			NS = Elm.Native.Signal.make(localRuntime);
		}
		NS.output('outbound-port-' + name, notify, signal);

		localRuntime.ports[name] = {
			subscribe: subscribe,
			unsubscribe: unsubscribe
		};

		return signal;
	}


	return localRuntime.Native.Port.values = {
		inbound: inbound,
		outbound: outbound,
		inboundSignal: inboundSignal,
		outboundSignal: outboundSignal
	};
};

if (!Elm.fullscreen) {
	(function() {
		'use strict';

		var Display = {
			FULLSCREEN: 0,
			COMPONENT: 1,
			NONE: 2
		};

		Elm.fullscreen = function(module, args)
		{
			var container = document.createElement('div');
			document.body.appendChild(container);
			return init(Display.FULLSCREEN, container, module, args || {});
		};

		Elm.embed = function(module, container, args)
		{
			var tag = container.tagName;
			if (tag !== 'DIV')
			{
				throw new Error('Elm.node must be given a DIV, not a ' + tag + '.');
			}
			return init(Display.COMPONENT, container, module, args || {});
		};

		Elm.worker = function(module, args)
		{
			return init(Display.NONE, {}, module, args || {});
		};

		function init(display, container, module, args, moduleToReplace)
		{
			// defining state needed for an instance of the Elm RTS
			var inputs = [];

			/* OFFSET
			 * Elm's time traveling debugger lets you pause time. This means
			 * "now" may be shifted a bit into the past. By wrapping Date.now()
			 * we can manage this.
			 */
			var timer = {
				programStart: Date.now(),
				now: function()
				{
					return Date.now();
				}
			};

			var updateInProgress = false;
			function notify(id, v)
			{
				if (updateInProgress)
				{
					throw new Error(
						'The notify function has been called synchronously!\n' +
						'This can lead to frames being dropped.\n' +
						'Definitely report this to <https://github.com/elm-lang/Elm/issues>\n');
				}
				updateInProgress = true;
				var timestep = timer.now();
				for (var i = inputs.length; i--; )
				{
					inputs[i].notify(timestep, id, v);
				}
				updateInProgress = false;
			}
			function setTimeout(func, delay)
			{
				return window.setTimeout(func, delay);
			}

			var listeners = [];
			function addListener(relevantInputs, domNode, eventName, func)
			{
				domNode.addEventListener(eventName, func);
				var listener = {
					relevantInputs: relevantInputs,
					domNode: domNode,
					eventName: eventName,
					func: func
				};
				listeners.push(listener);
			}

			var argsTracker = {};
			for (var name in args)
			{
				argsTracker[name] = {
					value: args[name],
					used: false
				};
			}

			// create the actual RTS. Any impure modules will attach themselves to this
			// object. This permits many Elm programs to be embedded per document.
			var elm = {
				notify: notify,
				setTimeout: setTimeout,
				node: container,
				addListener: addListener,
				inputs: inputs,
				timer: timer,
				argsTracker: argsTracker,
				ports: {},

				isFullscreen: function() { return display === Display.FULLSCREEN; },
				isEmbed: function() { return display === Display.COMPONENT; },
				isWorker: function() { return display === Display.NONE; }
			};

			function swap(newModule)
			{
				removeListeners(listeners);
				var div = document.createElement('div');
				var newElm = init(display, div, newModule, args, elm);
				inputs = [];

				return newElm;
			}

			function dispose()
			{
				removeListeners(listeners);
				inputs = [];
			}

			var Module = {};
			try
			{
				Module = module.make(elm);
				checkInputs(elm);
			}
			catch (error)
			{
				if (typeof container.appendChild === "function")
				{
					container.appendChild(errorNode(error.message));
				}
				else
				{
					console.error(error.message);
				}
				throw error;
			}

			if (display !== Display.NONE)
			{
				var graphicsNode = initGraphics(elm, Module);
			}

			var rootNode = { kids: inputs };
			trimDeadNodes(rootNode);
			inputs = rootNode.kids;
			filterListeners(inputs, listeners);

			addReceivers(elm.ports);

			if (typeof moduleToReplace !== 'undefined')
			{
				hotSwap(moduleToReplace, elm);

				// rerender scene if graphics are enabled.
				if (typeof graphicsNode !== 'undefined')
				{
					graphicsNode.notify(0, true, 0);
				}
			}

			return {
				swap: swap,
				ports: elm.ports,
				dispose: dispose
			};
		}

		function checkInputs(elm)
		{
			var argsTracker = elm.argsTracker;
			for (var name in argsTracker)
			{
				if (!argsTracker[name].used)
				{
					throw new Error(
						"Port Error:\nYou provided an argument named '" + name +
						"' but there is no corresponding port!\n\n" +
						"Maybe add a port '" + name + "' to your Elm module?\n" +
						"Maybe remove the '" + name + "' argument from your initialization code in JS?"
					);
				}
			}
		}

		function errorNode(message)
		{
			var code = document.createElement('code');

			var lines = message.split('\n');
			code.appendChild(document.createTextNode(lines[0]));
			code.appendChild(document.createElement('br'));
			code.appendChild(document.createElement('br'));
			for (var i = 1; i < lines.length; ++i)
			{
				code.appendChild(document.createTextNode('\u00A0 \u00A0 ' + lines[i].replace(/  /g, '\u00A0 ')));
				code.appendChild(document.createElement('br'));
			}
			code.appendChild(document.createElement('br'));
			code.appendChild(document.createTextNode('Open the developer console for more details.'));
			return code;
		}


		//// FILTER SIGNALS ////

		// TODO: move this code into the signal module and create a function
		// Signal.initializeGraph that actually instantiates everything.

		function filterListeners(inputs, listeners)
		{
			loop:
			for (var i = listeners.length; i--; )
			{
				var listener = listeners[i];
				for (var j = inputs.length; j--; )
				{
					if (listener.relevantInputs.indexOf(inputs[j].id) >= 0)
					{
						continue loop;
					}
				}
				listener.domNode.removeEventListener(listener.eventName, listener.func);
			}
		}

		function removeListeners(listeners)
		{
			for (var i = listeners.length; i--; )
			{
				var listener = listeners[i];
				listener.domNode.removeEventListener(listener.eventName, listener.func);
			}
		}

		// add receivers for built-in ports if they are defined
		function addReceivers(ports)
		{
			if ('title' in ports)
			{
				if (typeof ports.title === 'string')
				{
					document.title = ports.title;
				}
				else
				{
					ports.title.subscribe(function(v) { document.title = v; });
				}
			}
			if ('redirect' in ports)
			{
				ports.redirect.subscribe(function(v) {
					if (v.length > 0)
					{
						window.location = v;
					}
				});
			}
		}


		// returns a boolean representing whether the node is alive or not.
		function trimDeadNodes(node)
		{
			if (node.isOutput)
			{
				return true;
			}

			var liveKids = [];
			for (var i = node.kids.length; i--; )
			{
				var kid = node.kids[i];
				if (trimDeadNodes(kid))
				{
					liveKids.push(kid);
				}
			}
			node.kids = liveKids;

			return liveKids.length > 0;
		}


		////  RENDERING  ////

		function initGraphics(elm, Module)
		{
			if (!('main' in Module))
			{
				throw new Error("'main' is missing! What do I display?!");
			}

			var signalGraph = Module.main;

			// make sure the signal graph is actually a signal & extract the visual model
			if (!('notify' in signalGraph))
			{
				signalGraph = Elm.Signal.make(elm).constant(signalGraph);
			}
			var initialScene = signalGraph.value;

			// Figure out what the render functions should be
			var render;
			var update;
			if (initialScene.ctor === 'Element_elm_builtin')
			{
				var Element = Elm.Native.Graphics.Element.make(elm);
				render = Element.render;
				update = Element.updateAndReplace;
			}
			else
			{
				var VirtualDom = Elm.Native.VirtualDom.make(elm);
				render = VirtualDom.render;
				update = VirtualDom.updateAndReplace;
			}

			// Add the initialScene to the DOM
			var container = elm.node;
			var node = render(initialScene);
			while (container.firstChild)
			{
				container.removeChild(container.firstChild);
			}
			container.appendChild(node);

			var _requestAnimationFrame =
				typeof requestAnimationFrame !== 'undefined'
					? requestAnimationFrame
					: function(cb) { setTimeout(cb, 1000 / 60); }
					;

			// domUpdate is called whenever the main Signal changes.
			//
			// domUpdate and drawCallback implement a small state machine in order
			// to schedule only 1 draw per animation frame. This enforces that
			// once draw has been called, it will not be called again until the
			// next frame.
			//
			// drawCallback is scheduled whenever
			// 1. The state transitions from PENDING_REQUEST to EXTRA_REQUEST, or
			// 2. The state transitions from NO_REQUEST to PENDING_REQUEST
			//
			// Invariants:
			// 1. In the NO_REQUEST state, there is never a scheduled drawCallback.
			// 2. In the PENDING_REQUEST and EXTRA_REQUEST states, there is always exactly 1
			//    scheduled drawCallback.
			var NO_REQUEST = 0;
			var PENDING_REQUEST = 1;
			var EXTRA_REQUEST = 2;
			var state = NO_REQUEST;
			var savedScene = initialScene;
			var scheduledScene = initialScene;

			function domUpdate(newScene)
			{
				scheduledScene = newScene;

				switch (state)
				{
					case NO_REQUEST:
						_requestAnimationFrame(drawCallback);
						state = PENDING_REQUEST;
						return;
					case PENDING_REQUEST:
						state = PENDING_REQUEST;
						return;
					case EXTRA_REQUEST:
						state = PENDING_REQUEST;
						return;
				}
			}

			function drawCallback()
			{
				switch (state)
				{
					case NO_REQUEST:
						// This state should not be possible. How can there be no
						// request, yet somehow we are actively fulfilling a
						// request?
						throw new Error(
							'Unexpected draw callback.\n' +
							'Please report this to <https://github.com/elm-lang/core/issues>.'
						);

					case PENDING_REQUEST:
						// At this point, we do not *know* that another frame is
						// needed, but we make an extra request to rAF just in
						// case. It's possible to drop a frame if rAF is called
						// too late, so we just do it preemptively.
						_requestAnimationFrame(drawCallback);
						state = EXTRA_REQUEST;

						// There's also stuff we definitely need to draw.
						draw();
						return;

					case EXTRA_REQUEST:
						// Turns out the extra request was not needed, so we will
						// stop calling rAF. No reason to call it all the time if
						// no one needs it.
						state = NO_REQUEST;
						return;
				}
			}

			function draw()
			{
				update(elm.node.firstChild, savedScene, scheduledScene);
				if (elm.Native.Window)
				{
					elm.Native.Window.values.resizeIfNeeded();
				}
				savedScene = scheduledScene;
			}

			var renderer = Elm.Native.Signal.make(elm).output('main', domUpdate, signalGraph);

			// must check for resize after 'renderer' is created so
			// that changes show up.
			if (elm.Native.Window)
			{
				elm.Native.Window.values.resizeIfNeeded();
			}

			return renderer;
		}

		//// HOT SWAPPING ////

		// Returns boolean indicating if the swap was successful.
		// Requires that the two signal graphs have exactly the same
		// structure.
		function hotSwap(from, to)
		{
			function similar(nodeOld, nodeNew)
			{
				if (nodeOld.id !== nodeNew.id)
				{
					return false;
				}
				if (nodeOld.isOutput)
				{
					return nodeNew.isOutput;
				}
				return nodeOld.kids.length === nodeNew.kids.length;
			}
			function swap(nodeOld, nodeNew)
			{
				nodeNew.value = nodeOld.value;
				return true;
			}
			var canSwap = depthFirstTraversals(similar, from.inputs, to.inputs);
			if (canSwap)
			{
				depthFirstTraversals(swap, from.inputs, to.inputs);
			}
			from.node.parentNode.replaceChild(to.node, from.node);

			return canSwap;
		}

		// Returns false if the node operation f ever fails.
		function depthFirstTraversals(f, queueOld, queueNew)
		{
			if (queueOld.length !== queueNew.length)
			{
				return false;
			}
			queueOld = queueOld.slice(0);
			queueNew = queueNew.slice(0);

			var seen = [];
			while (queueOld.length > 0 && queueNew.length > 0)
			{
				var nodeOld = queueOld.pop();
				var nodeNew = queueNew.pop();
				if (seen.indexOf(nodeOld.id) < 0)
				{
					if (!f(nodeOld, nodeNew))
					{
						return false;
					}
					queueOld = queueOld.concat(nodeOld.kids || []);
					queueNew = queueNew.concat(nodeNew.kids || []);
					seen.push(nodeOld.id);
				}
			}
			return true;
		}
	}());

	function F2(fun)
	{
		function wrapper(a) { return function(b) { return fun(a,b); }; }
		wrapper.arity = 2;
		wrapper.func = fun;
		return wrapper;
	}

	function F3(fun)
	{
		function wrapper(a) {
			return function(b) { return function(c) { return fun(a, b, c); }; };
		}
		wrapper.arity = 3;
		wrapper.func = fun;
		return wrapper;
	}

	function F4(fun)
	{
		function wrapper(a) { return function(b) { return function(c) {
			return function(d) { return fun(a, b, c, d); }; }; };
		}
		wrapper.arity = 4;
		wrapper.func = fun;
		return wrapper;
	}

	function F5(fun)
	{
		function wrapper(a) { return function(b) { return function(c) {
			return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
		}
		wrapper.arity = 5;
		wrapper.func = fun;
		return wrapper;
	}

	function F6(fun)
	{
		function wrapper(a) { return function(b) { return function(c) {
			return function(d) { return function(e) { return function(f) {
			return fun(a, b, c, d, e, f); }; }; }; }; };
		}
		wrapper.arity = 6;
		wrapper.func = fun;
		return wrapper;
	}

	function F7(fun)
	{
		function wrapper(a) { return function(b) { return function(c) {
			return function(d) { return function(e) { return function(f) {
			return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
		}
		wrapper.arity = 7;
		wrapper.func = fun;
		return wrapper;
	}

	function F8(fun)
	{
		function wrapper(a) { return function(b) { return function(c) {
			return function(d) { return function(e) { return function(f) {
			return function(g) { return function(h) {
			return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
		}
		wrapper.arity = 8;
		wrapper.func = fun;
		return wrapper;
	}

	function F9(fun)
	{
		function wrapper(a) { return function(b) { return function(c) {
			return function(d) { return function(e) { return function(f) {
			return function(g) { return function(h) { return function(i) {
			return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
		}
		wrapper.arity = 9;
		wrapper.func = fun;
		return wrapper;
	}

	function A2(fun, a, b)
	{
		return fun.arity === 2
			? fun.func(a, b)
			: fun(a)(b);
	}
	function A3(fun, a, b, c)
	{
		return fun.arity === 3
			? fun.func(a, b, c)
			: fun(a)(b)(c);
	}
	function A4(fun, a, b, c, d)
	{
		return fun.arity === 4
			? fun.func(a, b, c, d)
			: fun(a)(b)(c)(d);
	}
	function A5(fun, a, b, c, d, e)
	{
		return fun.arity === 5
			? fun.func(a, b, c, d, e)
			: fun(a)(b)(c)(d)(e);
	}
	function A6(fun, a, b, c, d, e, f)
	{
		return fun.arity === 6
			? fun.func(a, b, c, d, e, f)
			: fun(a)(b)(c)(d)(e)(f);
	}
	function A7(fun, a, b, c, d, e, f, g)
	{
		return fun.arity === 7
			? fun.func(a, b, c, d, e, f, g)
			: fun(a)(b)(c)(d)(e)(f)(g);
	}
	function A8(fun, a, b, c, d, e, f, g, h)
	{
		return fun.arity === 8
			? fun.func(a, b, c, d, e, f, g, h)
			: fun(a)(b)(c)(d)(e)(f)(g)(h);
	}
	function A9(fun, a, b, c, d, e, f, g, h, i)
	{
		return fun.arity === 9
			? fun.func(a, b, c, d, e, f, g, h, i)
			: fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
	}
}

Elm.Native = Elm.Native || {};
Elm.Native.Utils = {};
Elm.Native.Utils.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Utils = localRuntime.Native.Utils || {};
	if (localRuntime.Native.Utils.values)
	{
		return localRuntime.Native.Utils.values;
	}


	// COMPARISONS

	function eq(l, r)
	{
		var stack = [{'x': l, 'y': r}];
		while (stack.length > 0)
		{
			var front = stack.pop();
			var x = front.x;
			var y = front.y;
			if (x === y)
			{
				continue;
			}
			if (typeof x === 'object')
			{
				var c = 0;
				for (var i in x)
				{
					++c;
					if (i in y)
					{
						if (i !== 'ctor')
						{
							stack.push({ 'x': x[i], 'y': y[i] });
						}
					}
					else
					{
						return false;
					}
				}
				if ('ctor' in x)
				{
					stack.push({'x': x.ctor, 'y': y.ctor});
				}
				if (c !== Object.keys(y).length)
				{
					return false;
				}
			}
			else if (typeof x === 'function')
			{
				throw new Error('Equality error: general function equality is ' +
								'undecidable, and therefore, unsupported');
			}
			else
			{
				return false;
			}
		}
		return true;
	}

	// code in Generate/JavaScript.hs depends on the particular
	// integer values assigned to LT, EQ, and GT
	var LT = -1, EQ = 0, GT = 1, ord = ['LT', 'EQ', 'GT'];

	function compare(x, y)
	{
		return {
			ctor: ord[cmp(x, y) + 1]
		};
	}

	function cmp(x, y) {
		var ord;
		if (typeof x !== 'object')
		{
			return x === y ? EQ : x < y ? LT : GT;
		}
		else if (x.isChar)
		{
			var a = x.toString();
			var b = y.toString();
			return a === b
				? EQ
				: a < b
					? LT
					: GT;
		}
		else if (x.ctor === '::' || x.ctor === '[]')
		{
			while (true)
			{
				if (x.ctor === '[]' && y.ctor === '[]')
				{
					return EQ;
				}
				if (x.ctor !== y.ctor)
				{
					return x.ctor === '[]' ? LT : GT;
				}
				ord = cmp(x._0, y._0);
				if (ord !== EQ)
				{
					return ord;
				}
				x = x._1;
				y = y._1;
			}
		}
		else if (x.ctor.slice(0, 6) === '_Tuple')
		{
			var n = x.ctor.slice(6) - 0;
			var err = 'cannot compare tuples with more than 6 elements.';
			if (n === 0) return EQ;
			if (n >= 1) { ord = cmp(x._0, y._0); if (ord !== EQ) return ord;
			if (n >= 2) { ord = cmp(x._1, y._1); if (ord !== EQ) return ord;
			if (n >= 3) { ord = cmp(x._2, y._2); if (ord !== EQ) return ord;
			if (n >= 4) { ord = cmp(x._3, y._3); if (ord !== EQ) return ord;
			if (n >= 5) { ord = cmp(x._4, y._4); if (ord !== EQ) return ord;
			if (n >= 6) { ord = cmp(x._5, y._5); if (ord !== EQ) return ord;
			if (n >= 7) throw new Error('Comparison error: ' + err); } } } } } }
			return EQ;
		}
		else
		{
			throw new Error('Comparison error: comparison is only defined on ints, ' +
							'floats, times, chars, strings, lists of comparable values, ' +
							'and tuples of comparable values.');
		}
	}


	// TUPLES

	var Tuple0 = {
		ctor: '_Tuple0'
	};

	function Tuple2(x, y)
	{
		return {
			ctor: '_Tuple2',
			_0: x,
			_1: y
		};
	}


	// LITERALS

	function chr(c)
	{
		var x = new String(c);
		x.isChar = true;
		return x;
	}

	function txt(str)
	{
		var t = new String(str);
		t.text = true;
		return t;
	}


	// GUID

	var count = 0;
	function guid(_)
	{
		return count++;
	}


	// RECORDS

	function update(oldRecord, updatedFields)
	{
		var newRecord = {};
		for (var key in oldRecord)
		{
			var value = (key in updatedFields) ? updatedFields[key] : oldRecord[key];
			newRecord[key] = value;
		}
		return newRecord;
	}


	// MOUSE COORDINATES

	function getXY(e)
	{
		var posx = 0;
		var posy = 0;
		if (e.pageX || e.pageY)
		{
			posx = e.pageX;
			posy = e.pageY;
		}
		else if (e.clientX || e.clientY)
		{
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}

		if (localRuntime.isEmbed())
		{
			var rect = localRuntime.node.getBoundingClientRect();
			var relx = rect.left + document.body.scrollLeft + document.documentElement.scrollLeft;
			var rely = rect.top + document.body.scrollTop + document.documentElement.scrollTop;
			// TODO: figure out if there is a way to avoid rounding here
			posx = posx - Math.round(relx) - localRuntime.node.clientLeft;
			posy = posy - Math.round(rely) - localRuntime.node.clientTop;
		}
		return Tuple2(posx, posy);
	}


	//// LIST STUFF ////

	var Nil = { ctor: '[]' };

	function Cons(hd, tl)
	{
		return {
			ctor: '::',
			_0: hd,
			_1: tl
		};
	}

	function list(arr)
	{
		var out = Nil;
		for (var i = arr.length; i--; )
		{
			out = Cons(arr[i], out);
		}
		return out;
	}

	function range(lo, hi)
	{
		var list = Nil;
		if (lo <= hi)
		{
			do
			{
				list = Cons(hi, list);
			}
			while (hi-- > lo);
		}
		return list;
	}

	function append(xs, ys)
	{
		// append Strings
		if (typeof xs === 'string')
		{
			return xs + ys;
		}

		// append Text
		if (xs.ctor.slice(0, 5) === 'Text:')
		{
			return {
				ctor: 'Text:Append',
				_0: xs,
				_1: ys
			};
		}


		// append Lists
		if (xs.ctor === '[]')
		{
			return ys;
		}
		var root = Cons(xs._0, Nil);
		var curr = root;
		xs = xs._1;
		while (xs.ctor !== '[]')
		{
			curr._1 = Cons(xs._0, Nil);
			xs = xs._1;
			curr = curr._1;
		}
		curr._1 = ys;
		return root;
	}


	// CRASHES

	function crash(moduleName, region)
	{
		return function(message) {
			throw new Error(
				'Ran into a `Debug.crash` in module `' + moduleName + '` ' + regionToString(region) + '\n'
				+ 'The message provided by the code author is:\n\n    '
				+ message
			);
		};
	}

	function crashCase(moduleName, region, value)
	{
		return function(message) {
			throw new Error(
				'Ran into a `Debug.crash` in module `' + moduleName + '`\n\n'
				+ 'This was caused by the `case` expression ' + regionToString(region) + '.\n'
				+ 'One of the branches ended with a crash and the following value got through:\n\n    ' + toString(value) + '\n\n'
				+ 'The message provided by the code author is:\n\n    '
				+ message
			);
		};
	}

	function regionToString(region)
	{
		if (region.start.line == region.end.line)
		{
			return 'on line ' + region.start.line;
		}
		return 'between lines ' + region.start.line + ' and ' + region.end.line;
	}


	// BAD PORTS

	function badPort(expected, received)
	{
		throw new Error(
			'Runtime error when sending values through a port.\n\n'
			+ 'Expecting ' + expected + ' but was given ' + formatValue(received)
		);
	}

	function formatValue(value)
	{
		// Explicity format undefined values as "undefined"
		// because JSON.stringify(undefined) unhelpfully returns ""
		return (value === undefined) ? "undefined" : JSON.stringify(value);
	}


	// TO STRING

	var _Array;
	var Dict;
	var List;

	var toString = function(v)
	{
		var type = typeof v;
		if (type === 'function')
		{
			var name = v.func ? v.func.name : v.name;
			return '<function' + (name === '' ? '' : ': ') + name + '>';
		}
		else if (type === 'boolean')
		{
			return v ? 'True' : 'False';
		}
		else if (type === 'number')
		{
			return v + '';
		}
		else if ((v instanceof String) && v.isChar)
		{
			return '\'' + addSlashes(v, true) + '\'';
		}
		else if (type === 'string')
		{
			return '"' + addSlashes(v, false) + '"';
		}
		else if (type === 'object' && 'ctor' in v)
		{
			if (v.ctor.substring(0, 6) === '_Tuple')
			{
				var output = [];
				for (var k in v)
				{
					if (k === 'ctor') continue;
					output.push(toString(v[k]));
				}
				return '(' + output.join(',') + ')';
			}
			else if (v.ctor === '_Array')
			{
				if (!_Array)
				{
					_Array = Elm.Array.make(localRuntime);
				}
				var list = _Array.toList(v);
				return 'Array.fromList ' + toString(list);
			}
			else if (v.ctor === '::')
			{
				var output = '[' + toString(v._0);
				v = v._1;
				while (v.ctor === '::')
				{
					output += ',' + toString(v._0);
					v = v._1;
				}
				return output + ']';
			}
			else if (v.ctor === '[]')
			{
				return '[]';
			}
			else if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin' || v.ctor === 'Set_elm_builtin')
			{
				if (!Dict)
				{
					Dict = Elm.Dict.make(localRuntime);
				}
				var list;
				var name;
				if (v.ctor === 'Set_elm_builtin')
				{
					if (!List)
					{
						List = Elm.List.make(localRuntime);
					}
					name = 'Set';
					list = A2(List.map, function(x) {return x._0; }, Dict.toList(v._0));
				}
				else
				{
					name = 'Dict';
					list = Dict.toList(v);
				}
				return name + '.fromList ' + toString(list);
			}
			else if (v.ctor.slice(0, 5) === 'Text:')
			{
				return '<text>';
			}
			else if (v.ctor === 'Element_elm_builtin')
			{
				return '<element>'
			}
			else if (v.ctor === 'Form_elm_builtin')
			{
				return '<form>'
			}
			else
			{
				var output = '';
				for (var i in v)
				{
					if (i === 'ctor') continue;
					var str = toString(v[i]);
					var parenless = str[0] === '{' || str[0] === '<' || str.indexOf(' ') < 0;
					output += ' ' + (parenless ? str : '(' + str + ')');
				}
				return v.ctor + output;
			}
		}
		else if (type === 'object' && 'notify' in v && 'id' in v)
		{
			return '<signal>';
		}
		else if (type === 'object')
		{
			var output = [];
			for (var k in v)
			{
				output.push(k + ' = ' + toString(v[k]));
			}
			if (output.length === 0)
			{
				return '{}';
			}
			return '{ ' + output.join(', ') + ' }';
		}
		return '<internal structure>';
	};

	function addSlashes(str, isChar)
	{
		var s = str.replace(/\\/g, '\\\\')
				  .replace(/\n/g, '\\n')
				  .replace(/\t/g, '\\t')
				  .replace(/\r/g, '\\r')
				  .replace(/\v/g, '\\v')
				  .replace(/\0/g, '\\0');
		if (isChar)
		{
			return s.replace(/\'/g, '\\\'');
		}
		else
		{
			return s.replace(/\"/g, '\\"');
		}
	}


	return localRuntime.Native.Utils.values = {
		eq: eq,
		cmp: cmp,
		compare: F2(compare),
		Tuple0: Tuple0,
		Tuple2: Tuple2,
		chr: chr,
		txt: txt,
		update: update,
		guid: guid,
		getXY: getXY,

		Nil: Nil,
		Cons: Cons,
		list: list,
		range: range,
		append: F2(append),

		crash: crash,
		crashCase: crashCase,
		badPort: badPort,

		toString: toString
	};
};

Elm.Basics = Elm.Basics || {};
Elm.Basics.make = function (_elm) {
   "use strict";
   _elm.Basics = _elm.Basics || {};
   if (_elm.Basics.values) return _elm.Basics.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Native$Basics = Elm.Native.Basics.make(_elm),
   $Native$Utils = Elm.Native.Utils.make(_elm);
   var _op = {};
   var uncurry = F2(function (f,_p0) {
      var _p1 = _p0;
      return A2(f,_p1._0,_p1._1);
   });
   var curry = F3(function (f,a,b) {
      return f({ctor: "_Tuple2",_0: a,_1: b});
   });
   var flip = F3(function (f,b,a) {    return A2(f,a,b);});
   var snd = function (_p2) {    var _p3 = _p2;return _p3._1;};
   var fst = function (_p4) {    var _p5 = _p4;return _p5._0;};
   var always = F2(function (a,_p6) {    return a;});
   var identity = function (x) {    return x;};
   _op["<|"] = F2(function (f,x) {    return f(x);});
   _op["|>"] = F2(function (x,f) {    return f(x);});
   _op[">>"] = F3(function (f,g,x) {    return g(f(x));});
   _op["<<"] = F3(function (g,f,x) {    return g(f(x));});
   _op["++"] = $Native$Utils.append;
   var toString = $Native$Utils.toString;
   var isInfinite = $Native$Basics.isInfinite;
   var isNaN = $Native$Basics.isNaN;
   var toFloat = $Native$Basics.toFloat;
   var ceiling = $Native$Basics.ceiling;
   var floor = $Native$Basics.floor;
   var truncate = $Native$Basics.truncate;
   var round = $Native$Basics.round;
   var not = $Native$Basics.not;
   var xor = $Native$Basics.xor;
   _op["||"] = $Native$Basics.or;
   _op["&&"] = $Native$Basics.and;
   var max = $Native$Basics.max;
   var min = $Native$Basics.min;
   var GT = {ctor: "GT"};
   var EQ = {ctor: "EQ"};
   var LT = {ctor: "LT"};
   var compare = $Native$Basics.compare;
   _op[">="] = $Native$Basics.ge;
   _op["<="] = $Native$Basics.le;
   _op[">"] = $Native$Basics.gt;
   _op["<"] = $Native$Basics.lt;
   _op["/="] = $Native$Basics.neq;
   _op["=="] = $Native$Basics.eq;
   var e = $Native$Basics.e;
   var pi = $Native$Basics.pi;
   var clamp = $Native$Basics.clamp;
   var logBase = $Native$Basics.logBase;
   var abs = $Native$Basics.abs;
   var negate = $Native$Basics.negate;
   var sqrt = $Native$Basics.sqrt;
   var atan2 = $Native$Basics.atan2;
   var atan = $Native$Basics.atan;
   var asin = $Native$Basics.asin;
   var acos = $Native$Basics.acos;
   var tan = $Native$Basics.tan;
   var sin = $Native$Basics.sin;
   var cos = $Native$Basics.cos;
   _op["^"] = $Native$Basics.exp;
   _op["%"] = $Native$Basics.mod;
   var rem = $Native$Basics.rem;
   _op["//"] = $Native$Basics.div;
   _op["/"] = $Native$Basics.floatDiv;
   _op["*"] = $Native$Basics.mul;
   _op["-"] = $Native$Basics.sub;
   _op["+"] = $Native$Basics.add;
   var toPolar = $Native$Basics.toPolar;
   var fromPolar = $Native$Basics.fromPolar;
   var turns = $Native$Basics.turns;
   var degrees = $Native$Basics.degrees;
   var radians = function (t) {    return t;};
   return _elm.Basics.values = {_op: _op
                               ,max: max
                               ,min: min
                               ,compare: compare
                               ,not: not
                               ,xor: xor
                               ,rem: rem
                               ,negate: negate
                               ,abs: abs
                               ,sqrt: sqrt
                               ,clamp: clamp
                               ,logBase: logBase
                               ,e: e
                               ,pi: pi
                               ,cos: cos
                               ,sin: sin
                               ,tan: tan
                               ,acos: acos
                               ,asin: asin
                               ,atan: atan
                               ,atan2: atan2
                               ,round: round
                               ,floor: floor
                               ,ceiling: ceiling
                               ,truncate: truncate
                               ,toFloat: toFloat
                               ,degrees: degrees
                               ,radians: radians
                               ,turns: turns
                               ,toPolar: toPolar
                               ,fromPolar: fromPolar
                               ,isNaN: isNaN
                               ,isInfinite: isInfinite
                               ,toString: toString
                               ,fst: fst
                               ,snd: snd
                               ,identity: identity
                               ,always: always
                               ,flip: flip
                               ,curry: curry
                               ,uncurry: uncurry
                               ,LT: LT
                               ,EQ: EQ
                               ,GT: GT};
};
Elm.Maybe = Elm.Maybe || {};
Elm.Maybe.make = function (_elm) {
   "use strict";
   _elm.Maybe = _elm.Maybe || {};
   if (_elm.Maybe.values) return _elm.Maybe.values;
   var _U = Elm.Native.Utils.make(_elm);
   var _op = {};
   var withDefault = F2(function ($default,maybe) {
      var _p0 = maybe;
      if (_p0.ctor === "Just") {
            return _p0._0;
         } else {
            return $default;
         }
   });
   var Nothing = {ctor: "Nothing"};
   var oneOf = function (maybes) {
      oneOf: while (true) {
         var _p1 = maybes;
         if (_p1.ctor === "[]") {
               return Nothing;
            } else {
               var _p3 = _p1._0;
               var _p2 = _p3;
               if (_p2.ctor === "Nothing") {
                     var _v3 = _p1._1;
                     maybes = _v3;
                     continue oneOf;
                  } else {
                     return _p3;
                  }
            }
      }
   };
   var andThen = F2(function (maybeValue,callback) {
      var _p4 = maybeValue;
      if (_p4.ctor === "Just") {
            return callback(_p4._0);
         } else {
            return Nothing;
         }
   });
   var Just = function (a) {    return {ctor: "Just",_0: a};};
   var map = F2(function (f,maybe) {
      var _p5 = maybe;
      if (_p5.ctor === "Just") {
            return Just(f(_p5._0));
         } else {
            return Nothing;
         }
   });
   var map2 = F3(function (func,ma,mb) {
      var _p6 = {ctor: "_Tuple2",_0: ma,_1: mb};
      if (_p6.ctor === "_Tuple2" && _p6._0.ctor === "Just" && _p6._1.ctor === "Just")
      {
            return Just(A2(func,_p6._0._0,_p6._1._0));
         } else {
            return Nothing;
         }
   });
   var map3 = F4(function (func,ma,mb,mc) {
      var _p7 = {ctor: "_Tuple3",_0: ma,_1: mb,_2: mc};
      if (_p7.ctor === "_Tuple3" && _p7._0.ctor === "Just" && _p7._1.ctor === "Just" && _p7._2.ctor === "Just")
      {
            return Just(A3(func,_p7._0._0,_p7._1._0,_p7._2._0));
         } else {
            return Nothing;
         }
   });
   var map4 = F5(function (func,ma,mb,mc,md) {
      var _p8 = {ctor: "_Tuple4",_0: ma,_1: mb,_2: mc,_3: md};
      if (_p8.ctor === "_Tuple4" && _p8._0.ctor === "Just" && _p8._1.ctor === "Just" && _p8._2.ctor === "Just" && _p8._3.ctor === "Just")
      {
            return Just(A4(func,
            _p8._0._0,
            _p8._1._0,
            _p8._2._0,
            _p8._3._0));
         } else {
            return Nothing;
         }
   });
   var map5 = F6(function (func,ma,mb,mc,md,me) {
      var _p9 = {ctor: "_Tuple5"
                ,_0: ma
                ,_1: mb
                ,_2: mc
                ,_3: md
                ,_4: me};
      if (_p9.ctor === "_Tuple5" && _p9._0.ctor === "Just" && _p9._1.ctor === "Just" && _p9._2.ctor === "Just" && _p9._3.ctor === "Just" && _p9._4.ctor === "Just")
      {
            return Just(A5(func,
            _p9._0._0,
            _p9._1._0,
            _p9._2._0,
            _p9._3._0,
            _p9._4._0));
         } else {
            return Nothing;
         }
   });
   return _elm.Maybe.values = {_op: _op
                              ,andThen: andThen
                              ,map: map
                              ,map2: map2
                              ,map3: map3
                              ,map4: map4
                              ,map5: map5
                              ,withDefault: withDefault
                              ,oneOf: oneOf
                              ,Just: Just
                              ,Nothing: Nothing};
};
Elm.Native.List = {};
Elm.Native.List.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.List = localRuntime.Native.List || {};
	if (localRuntime.Native.List.values)
	{
		return localRuntime.Native.List.values;
	}
	if ('values' in Elm.Native.List)
	{
		return localRuntime.Native.List.values = Elm.Native.List.values;
	}

	var Utils = Elm.Native.Utils.make(localRuntime);

	var Nil = Utils.Nil;
	var Cons = Utils.Cons;

	var fromArray = Utils.list;

	function toArray(xs)
	{
		var out = [];
		while (xs.ctor !== '[]')
		{
			out.push(xs._0);
			xs = xs._1;
		}
		return out;
	}

	// f defined similarly for both foldl and foldr (NB: different from Haskell)
	// ie, foldl : (a -> b -> b) -> b -> [a] -> b
	function foldl(f, b, xs)
	{
		var acc = b;
		while (xs.ctor !== '[]')
		{
			acc = A2(f, xs._0, acc);
			xs = xs._1;
		}
		return acc;
	}

	function foldr(f, b, xs)
	{
		var arr = toArray(xs);
		var acc = b;
		for (var i = arr.length; i--; )
		{
			acc = A2(f, arr[i], acc);
		}
		return acc;
	}

	function map2(f, xs, ys)
	{
		var arr = [];
		while (xs.ctor !== '[]' && ys.ctor !== '[]')
		{
			arr.push(A2(f, xs._0, ys._0));
			xs = xs._1;
			ys = ys._1;
		}
		return fromArray(arr);
	}

	function map3(f, xs, ys, zs)
	{
		var arr = [];
		while (xs.ctor !== '[]' && ys.ctor !== '[]' && zs.ctor !== '[]')
		{
			arr.push(A3(f, xs._0, ys._0, zs._0));
			xs = xs._1;
			ys = ys._1;
			zs = zs._1;
		}
		return fromArray(arr);
	}

	function map4(f, ws, xs, ys, zs)
	{
		var arr = [];
		while (   ws.ctor !== '[]'
			   && xs.ctor !== '[]'
			   && ys.ctor !== '[]'
			   && zs.ctor !== '[]')
		{
			arr.push(A4(f, ws._0, xs._0, ys._0, zs._0));
			ws = ws._1;
			xs = xs._1;
			ys = ys._1;
			zs = zs._1;
		}
		return fromArray(arr);
	}

	function map5(f, vs, ws, xs, ys, zs)
	{
		var arr = [];
		while (   vs.ctor !== '[]'
			   && ws.ctor !== '[]'
			   && xs.ctor !== '[]'
			   && ys.ctor !== '[]'
			   && zs.ctor !== '[]')
		{
			arr.push(A5(f, vs._0, ws._0, xs._0, ys._0, zs._0));
			vs = vs._1;
			ws = ws._1;
			xs = xs._1;
			ys = ys._1;
			zs = zs._1;
		}
		return fromArray(arr);
	}

	function sortBy(f, xs)
	{
		return fromArray(toArray(xs).sort(function(a, b) {
			return Utils.cmp(f(a), f(b));
		}));
	}

	function sortWith(f, xs)
	{
		return fromArray(toArray(xs).sort(function(a, b) {
			var ord = f(a)(b).ctor;
			return ord === 'EQ' ? 0 : ord === 'LT' ? -1 : 1;
		}));
	}

	function take(n, xs)
	{
		var arr = [];
		while (xs.ctor !== '[]' && n > 0)
		{
			arr.push(xs._0);
			xs = xs._1;
			--n;
		}
		return fromArray(arr);
	}


	Elm.Native.List.values = {
		Nil: Nil,
		Cons: Cons,
		cons: F2(Cons),
		toArray: toArray,
		fromArray: fromArray,

		foldl: F3(foldl),
		foldr: F3(foldr),

		map2: F3(map2),
		map3: F4(map3),
		map4: F5(map4),
		map5: F6(map5),
		sortBy: F2(sortBy),
		sortWith: F2(sortWith),
		take: F2(take)
	};
	return localRuntime.Native.List.values = Elm.Native.List.values;
};

Elm.List = Elm.List || {};
Elm.List.make = function (_elm) {
   "use strict";
   _elm.List = _elm.List || {};
   if (_elm.List.values) return _elm.List.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$List = Elm.Native.List.make(_elm);
   var _op = {};
   var sortWith = $Native$List.sortWith;
   var sortBy = $Native$List.sortBy;
   var sort = function (xs) {
      return A2(sortBy,$Basics.identity,xs);
   };
   var drop = F2(function (n,list) {
      drop: while (true) if (_U.cmp(n,0) < 1) return list; else {
            var _p0 = list;
            if (_p0.ctor === "[]") {
                  return list;
               } else {
                  var _v1 = n - 1,_v2 = _p0._1;
                  n = _v1;
                  list = _v2;
                  continue drop;
               }
         }
   });
   var take = $Native$List.take;
   var map5 = $Native$List.map5;
   var map4 = $Native$List.map4;
   var map3 = $Native$List.map3;
   var map2 = $Native$List.map2;
   var any = F2(function (isOkay,list) {
      any: while (true) {
         var _p1 = list;
         if (_p1.ctor === "[]") {
               return false;
            } else {
               if (isOkay(_p1._0)) return true; else {
                     var _v4 = isOkay,_v5 = _p1._1;
                     isOkay = _v4;
                     list = _v5;
                     continue any;
                  }
            }
      }
   });
   var all = F2(function (isOkay,list) {
      return $Basics.not(A2(any,
      function (_p2) {
         return $Basics.not(isOkay(_p2));
      },
      list));
   });
   var foldr = $Native$List.foldr;
   var foldl = $Native$List.foldl;
   var length = function (xs) {
      return A3(foldl,
      F2(function (_p3,i) {    return i + 1;}),
      0,
      xs);
   };
   var sum = function (numbers) {
      return A3(foldl,
      F2(function (x,y) {    return x + y;}),
      0,
      numbers);
   };
   var product = function (numbers) {
      return A3(foldl,
      F2(function (x,y) {    return x * y;}),
      1,
      numbers);
   };
   var maximum = function (list) {
      var _p4 = list;
      if (_p4.ctor === "::") {
            return $Maybe.Just(A3(foldl,$Basics.max,_p4._0,_p4._1));
         } else {
            return $Maybe.Nothing;
         }
   };
   var minimum = function (list) {
      var _p5 = list;
      if (_p5.ctor === "::") {
            return $Maybe.Just(A3(foldl,$Basics.min,_p5._0,_p5._1));
         } else {
            return $Maybe.Nothing;
         }
   };
   var indexedMap = F2(function (f,xs) {
      return A3(map2,f,_U.range(0,length(xs) - 1),xs);
   });
   var member = F2(function (x,xs) {
      return A2(any,function (a) {    return _U.eq(a,x);},xs);
   });
   var isEmpty = function (xs) {
      var _p6 = xs;
      if (_p6.ctor === "[]") {
            return true;
         } else {
            return false;
         }
   };
   var tail = function (list) {
      var _p7 = list;
      if (_p7.ctor === "::") {
            return $Maybe.Just(_p7._1);
         } else {
            return $Maybe.Nothing;
         }
   };
   var head = function (list) {
      var _p8 = list;
      if (_p8.ctor === "::") {
            return $Maybe.Just(_p8._0);
         } else {
            return $Maybe.Nothing;
         }
   };
   _op["::"] = $Native$List.cons;
   var map = F2(function (f,xs) {
      return A3(foldr,
      F2(function (x,acc) {    return A2(_op["::"],f(x),acc);}),
      _U.list([]),
      xs);
   });
   var filter = F2(function (pred,xs) {
      var conditionalCons = F2(function (x,xs$) {
         return pred(x) ? A2(_op["::"],x,xs$) : xs$;
      });
      return A3(foldr,conditionalCons,_U.list([]),xs);
   });
   var maybeCons = F3(function (f,mx,xs) {
      var _p9 = f(mx);
      if (_p9.ctor === "Just") {
            return A2(_op["::"],_p9._0,xs);
         } else {
            return xs;
         }
   });
   var filterMap = F2(function (f,xs) {
      return A3(foldr,maybeCons(f),_U.list([]),xs);
   });
   var reverse = function (list) {
      return A3(foldl,
      F2(function (x,y) {    return A2(_op["::"],x,y);}),
      _U.list([]),
      list);
   };
   var scanl = F3(function (f,b,xs) {
      var scan1 = F2(function (x,accAcc) {
         var _p10 = accAcc;
         if (_p10.ctor === "::") {
               return A2(_op["::"],A2(f,x,_p10._0),accAcc);
            } else {
               return _U.list([]);
            }
      });
      return reverse(A3(foldl,scan1,_U.list([b]),xs));
   });
   var append = F2(function (xs,ys) {
      var _p11 = ys;
      if (_p11.ctor === "[]") {
            return xs;
         } else {
            return A3(foldr,
            F2(function (x,y) {    return A2(_op["::"],x,y);}),
            ys,
            xs);
         }
   });
   var concat = function (lists) {
      return A3(foldr,append,_U.list([]),lists);
   };
   var concatMap = F2(function (f,list) {
      return concat(A2(map,f,list));
   });
   var partition = F2(function (pred,list) {
      var step = F2(function (x,_p12) {
         var _p13 = _p12;
         var _p15 = _p13._0;
         var _p14 = _p13._1;
         return pred(x) ? {ctor: "_Tuple2"
                          ,_0: A2(_op["::"],x,_p15)
                          ,_1: _p14} : {ctor: "_Tuple2"
                                       ,_0: _p15
                                       ,_1: A2(_op["::"],x,_p14)};
      });
      return A3(foldr,
      step,
      {ctor: "_Tuple2",_0: _U.list([]),_1: _U.list([])},
      list);
   });
   var unzip = function (pairs) {
      var step = F2(function (_p17,_p16) {
         var _p18 = _p17;
         var _p19 = _p16;
         return {ctor: "_Tuple2"
                ,_0: A2(_op["::"],_p18._0,_p19._0)
                ,_1: A2(_op["::"],_p18._1,_p19._1)};
      });
      return A3(foldr,
      step,
      {ctor: "_Tuple2",_0: _U.list([]),_1: _U.list([])},
      pairs);
   };
   var intersperse = F2(function (sep,xs) {
      var _p20 = xs;
      if (_p20.ctor === "[]") {
            return _U.list([]);
         } else {
            var step = F2(function (x,rest) {
               return A2(_op["::"],sep,A2(_op["::"],x,rest));
            });
            var spersed = A3(foldr,step,_U.list([]),_p20._1);
            return A2(_op["::"],_p20._0,spersed);
         }
   });
   var repeatHelp = F3(function (result,n,value) {
      repeatHelp: while (true) if (_U.cmp(n,0) < 1) return result;
      else {
            var _v18 = A2(_op["::"],value,result),
            _v19 = n - 1,
            _v20 = value;
            result = _v18;
            n = _v19;
            value = _v20;
            continue repeatHelp;
         }
   });
   var repeat = F2(function (n,value) {
      return A3(repeatHelp,_U.list([]),n,value);
   });
   return _elm.List.values = {_op: _op
                             ,isEmpty: isEmpty
                             ,length: length
                             ,reverse: reverse
                             ,member: member
                             ,head: head
                             ,tail: tail
                             ,filter: filter
                             ,take: take
                             ,drop: drop
                             ,repeat: repeat
                             ,append: append
                             ,concat: concat
                             ,intersperse: intersperse
                             ,partition: partition
                             ,unzip: unzip
                             ,map: map
                             ,map2: map2
                             ,map3: map3
                             ,map4: map4
                             ,map5: map5
                             ,filterMap: filterMap
                             ,concatMap: concatMap
                             ,indexedMap: indexedMap
                             ,foldr: foldr
                             ,foldl: foldl
                             ,sum: sum
                             ,product: product
                             ,maximum: maximum
                             ,minimum: minimum
                             ,all: all
                             ,any: any
                             ,scanl: scanl
                             ,sort: sort
                             ,sortBy: sortBy
                             ,sortWith: sortWith};
};
Elm.Native.Transform2D = {};
Elm.Native.Transform2D.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Transform2D = localRuntime.Native.Transform2D || {};
	if (localRuntime.Native.Transform2D.values)
	{
		return localRuntime.Native.Transform2D.values;
	}

	var A;
	if (typeof Float32Array === 'undefined')
	{
		A = function(arr)
		{
			this.length = arr.length;
			this[0] = arr[0];
			this[1] = arr[1];
			this[2] = arr[2];
			this[3] = arr[3];
			this[4] = arr[4];
			this[5] = arr[5];
		};
	}
	else
	{
		A = Float32Array;
	}

	// layout of matrix in an array is
	//
	//   | m11 m12 dx |
	//   | m21 m22 dy |
	//   |  0   0   1 |
	//
	//  new A([ m11, m12, dx, m21, m22, dy ])

	var identity = new A([1, 0, 0, 0, 1, 0]);
	function matrix(m11, m12, m21, m22, dx, dy)
	{
		return new A([m11, m12, dx, m21, m22, dy]);
	}

	function rotation(t)
	{
		var c = Math.cos(t);
		var s = Math.sin(t);
		return new A([c, -s, 0, s, c, 0]);
	}

	function rotate(t, m)
	{
		var c = Math.cos(t);
		var s = Math.sin(t);
		var m11 = m[0], m12 = m[1], m21 = m[3], m22 = m[4];
		return new A([m11 * c + m12 * s, -m11 * s + m12 * c, m[2],
					  m21 * c + m22 * s, -m21 * s + m22 * c, m[5]]);
	}
	/*
	function move(xy,m) {
		var x = xy._0;
		var y = xy._1;
		var m11 = m[0], m12 = m[1], m21 = m[3], m22 = m[4];
		return new A([m11, m12, m11*x + m12*y + m[2],
					  m21, m22, m21*x + m22*y + m[5]]);
	}
	function scale(s,m) { return new A([m[0]*s, m[1]*s, m[2], m[3]*s, m[4]*s, m[5]]); }
	function scaleX(x,m) { return new A([m[0]*x, m[1], m[2], m[3]*x, m[4], m[5]]); }
	function scaleY(y,m) { return new A([m[0], m[1]*y, m[2], m[3], m[4]*y, m[5]]); }
	function reflectX(m) { return new A([-m[0], m[1], m[2], -m[3], m[4], m[5]]); }
	function reflectY(m) { return new A([m[0], -m[1], m[2], m[3], -m[4], m[5]]); }

	function transform(m11, m21, m12, m22, mdx, mdy, n) {
		var n11 = n[0], n12 = n[1], n21 = n[3], n22 = n[4], ndx = n[2], ndy = n[5];
		return new A([m11*n11 + m12*n21,
					  m11*n12 + m12*n22,
					  m11*ndx + m12*ndy + mdx,
					  m21*n11 + m22*n21,
					  m21*n12 + m22*n22,
					  m21*ndx + m22*ndy + mdy]);
	}
	*/
	function multiply(m, n)
	{
		var m11 = m[0], m12 = m[1], m21 = m[3], m22 = m[4], mdx = m[2], mdy = m[5];
		var n11 = n[0], n12 = n[1], n21 = n[3], n22 = n[4], ndx = n[2], ndy = n[5];
		return new A([m11 * n11 + m12 * n21,
					  m11 * n12 + m12 * n22,
					  m11 * ndx + m12 * ndy + mdx,
					  m21 * n11 + m22 * n21,
					  m21 * n12 + m22 * n22,
					  m21 * ndx + m22 * ndy + mdy]);
	}

	return localRuntime.Native.Transform2D.values = {
		identity: identity,
		matrix: F6(matrix),
		rotation: rotation,
		multiply: F2(multiply)
		/*
		transform: F7(transform),
		rotate: F2(rotate),
		move: F2(move),
		scale: F2(scale),
		scaleX: F2(scaleX),
		scaleY: F2(scaleY),
		reflectX: reflectX,
		reflectY: reflectY
		*/
	};
};

Elm.Transform2D = Elm.Transform2D || {};
Elm.Transform2D.make = function (_elm) {
   "use strict";
   _elm.Transform2D = _elm.Transform2D || {};
   if (_elm.Transform2D.values) return _elm.Transform2D.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Native$Transform2D = Elm.Native.Transform2D.make(_elm);
   var _op = {};
   var multiply = $Native$Transform2D.multiply;
   var rotation = $Native$Transform2D.rotation;
   var matrix = $Native$Transform2D.matrix;
   var translation = F2(function (x,y) {
      return A6(matrix,1,0,0,1,x,y);
   });
   var scale = function (s) {    return A6(matrix,s,0,0,s,0,0);};
   var scaleX = function (x) {    return A6(matrix,x,0,0,1,0,0);};
   var scaleY = function (y) {    return A6(matrix,1,0,0,y,0,0);};
   var identity = $Native$Transform2D.identity;
   var Transform2D = {ctor: "Transform2D"};
   return _elm.Transform2D.values = {_op: _op
                                    ,identity: identity
                                    ,matrix: matrix
                                    ,multiply: multiply
                                    ,rotation: rotation
                                    ,translation: translation
                                    ,scale: scale
                                    ,scaleX: scaleX
                                    ,scaleY: scaleY};
};

// setup
Elm.Native = Elm.Native || {};
Elm.Native.Graphics = Elm.Native.Graphics || {};
Elm.Native.Graphics.Collage = Elm.Native.Graphics.Collage || {};

// definition
Elm.Native.Graphics.Collage.make = function(localRuntime) {
	'use strict';

	// attempt to short-circuit
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Graphics = localRuntime.Native.Graphics || {};
	localRuntime.Native.Graphics.Collage = localRuntime.Native.Graphics.Collage || {};
	if ('values' in localRuntime.Native.Graphics.Collage)
	{
		return localRuntime.Native.Graphics.Collage.values;
	}

	// okay, we cannot short-ciruit, so now we define everything
	var Color = Elm.Native.Color.make(localRuntime);
	var List = Elm.Native.List.make(localRuntime);
	var NativeElement = Elm.Native.Graphics.Element.make(localRuntime);
	var Transform = Elm.Transform2D.make(localRuntime);
	var Utils = Elm.Native.Utils.make(localRuntime);

	function setStrokeStyle(ctx, style)
	{
		ctx.lineWidth = style.width;

		var cap = style.cap.ctor;
		ctx.lineCap = cap === 'Flat'
			? 'butt'
			: cap === 'Round'
				? 'round'
				: 'square';

		var join = style.join.ctor;
		ctx.lineJoin = join === 'Smooth'
			? 'round'
			: join === 'Sharp'
				? 'miter'
				: 'bevel';

		ctx.miterLimit = style.join._0 || 10;
		ctx.strokeStyle = Color.toCss(style.color);
	}

	function setFillStyle(redo, ctx, style)
	{
		var sty = style.ctor;
		ctx.fillStyle = sty === 'Solid'
			? Color.toCss(style._0)
			: sty === 'Texture'
				? texture(redo, ctx, style._0)
				: gradient(ctx, style._0);
	}

	function trace(ctx, path)
	{
		var points = List.toArray(path);
		var i = points.length - 1;
		if (i <= 0)
		{
			return;
		}
		ctx.moveTo(points[i]._0, points[i]._1);
		while (i--)
		{
			ctx.lineTo(points[i]._0, points[i]._1);
		}
		if (path.closed)
		{
			i = points.length - 1;
			ctx.lineTo(points[i]._0, points[i]._1);
		}
	}

	function line(ctx, style, path)
	{
		if (style.dashing.ctor === '[]')
		{
			trace(ctx, path);
		}
		else
		{
			customLineHelp(ctx, style, path);
		}
		ctx.scale(1, -1);
		ctx.stroke();
	}

	function customLineHelp(ctx, style, path)
	{
		var points = List.toArray(path);
		if (path.closed)
		{
			points.push(points[0]);
		}
		var pattern = List.toArray(style.dashing);
		var i = points.length - 1;
		if (i <= 0)
		{
			return;
		}
		var x0 = points[i]._0, y0 = points[i]._1;
		var x1 = 0, y1 = 0, dx = 0, dy = 0, remaining = 0;
		var pindex = 0, plen = pattern.length;
		var draw = true, segmentLength = pattern[0];
		ctx.moveTo(x0, y0);
		while (i--)
		{
			x1 = points[i]._0;
			y1 = points[i]._1;
			dx = x1 - x0;
			dy = y1 - y0;
			remaining = Math.sqrt(dx * dx + dy * dy);
			while (segmentLength <= remaining)
			{
				x0 += dx * segmentLength / remaining;
				y0 += dy * segmentLength / remaining;
				ctx[draw ? 'lineTo' : 'moveTo'](x0, y0);
				// update starting position
				dx = x1 - x0;
				dy = y1 - y0;
				remaining = Math.sqrt(dx * dx + dy * dy);
				// update pattern
				draw = !draw;
				pindex = (pindex + 1) % plen;
				segmentLength = pattern[pindex];
			}
			if (remaining > 0)
			{
				ctx[draw ? 'lineTo' : 'moveTo'](x1, y1);
				segmentLength -= remaining;
			}
			x0 = x1;
			y0 = y1;
		}
	}

	function drawLine(ctx, style, path)
	{
		setStrokeStyle(ctx, style);
		return line(ctx, style, path);
	}

	function texture(redo, ctx, src)
	{
		var img = new Image();
		img.src = src;
		img.onload = redo;
		return ctx.createPattern(img, 'repeat');
	}

	function gradient(ctx, grad)
	{
		var g;
		var stops = [];
		if (grad.ctor === 'Linear')
		{
			var p0 = grad._0, p1 = grad._1;
			g = ctx.createLinearGradient(p0._0, -p0._1, p1._0, -p1._1);
			stops = List.toArray(grad._2);
		}
		else
		{
			var p0 = grad._0, p2 = grad._2;
			g = ctx.createRadialGradient(p0._0, -p0._1, grad._1, p2._0, -p2._1, grad._3);
			stops = List.toArray(grad._4);
		}
		var len = stops.length;
		for (var i = 0; i < len; ++i)
		{
			var stop = stops[i];
			g.addColorStop(stop._0, Color.toCss(stop._1));
		}
		return g;
	}

	function drawShape(redo, ctx, style, path)
	{
		trace(ctx, path);
		setFillStyle(redo, ctx, style);
		ctx.scale(1, -1);
		ctx.fill();
	}


	// TEXT RENDERING

	function fillText(redo, ctx, text)
	{
		drawText(ctx, text, ctx.fillText);
	}

	function strokeText(redo, ctx, style, text)
	{
		setStrokeStyle(ctx, style);
		// Use native canvas API for dashes only for text for now
		// Degrades to non-dashed on IE 9 + 10
		if (style.dashing.ctor !== '[]' && ctx.setLineDash)
		{
			var pattern = List.toArray(style.dashing);
			ctx.setLineDash(pattern);
		}
		drawText(ctx, text, ctx.strokeText);
	}

	function drawText(ctx, text, canvasDrawFn)
	{
		var textChunks = chunkText(defaultContext, text);

		var totalWidth = 0;
		var maxHeight = 0;
		var numChunks = textChunks.length;

		ctx.scale(1,-1);

		for (var i = numChunks; i--; )
		{
			var chunk = textChunks[i];
			ctx.font = chunk.font;
			var metrics = ctx.measureText(chunk.text);
			chunk.width = metrics.width;
			totalWidth += chunk.width;
			if (chunk.height > maxHeight)
			{
				maxHeight = chunk.height;
			}
		}

		var x = -totalWidth / 2.0;
		for (var i = 0; i < numChunks; ++i)
		{
			var chunk = textChunks[i];
			ctx.font = chunk.font;
			ctx.fillStyle = chunk.color;
			canvasDrawFn.call(ctx, chunk.text, x, maxHeight / 2);
			x += chunk.width;
		}
	}

	function toFont(props)
	{
		return [
			props['font-style'],
			props['font-variant'],
			props['font-weight'],
			props['font-size'],
			props['font-family']
		].join(' ');
	}


	// Convert the object returned by the text module
	// into something we can use for styling canvas text
	function chunkText(context, text)
	{
		var tag = text.ctor;
		if (tag === 'Text:Append')
		{
			var leftChunks = chunkText(context, text._0);
			var rightChunks = chunkText(context, text._1);
			return leftChunks.concat(rightChunks);
		}
		if (tag === 'Text:Text')
		{
			return [{
				text: text._0,
				color: context.color,
				height: context['font-size'].slice(0, -2) | 0,
				font: toFont(context)
			}];
		}
		if (tag === 'Text:Meta')
		{
			var newContext = freshContext(text._0, context);
			return chunkText(newContext, text._1);
		}
	}

	function freshContext(props, ctx)
	{
		return {
			'font-style': props['font-style'] || ctx['font-style'],
			'font-variant': props['font-variant'] || ctx['font-variant'],
			'font-weight': props['font-weight'] || ctx['font-weight'],
			'font-size': props['font-size'] || ctx['font-size'],
			'font-family': props['font-family'] || ctx['font-family'],
			'color': props['color'] || ctx['color']
		};
	}

	var defaultContext = {
		'font-style': 'normal',
		'font-variant': 'normal',
		'font-weight': 'normal',
		'font-size': '12px',
		'font-family': 'sans-serif',
		'color': 'black'
	};


	// IMAGES

	function drawImage(redo, ctx, form)
	{
		var img = new Image();
		img.onload = redo;
		img.src = form._3;
		var w = form._0,
			h = form._1,
			pos = form._2,
			srcX = pos._0,
			srcY = pos._1,
			srcW = w,
			srcH = h,
			destX = -w / 2,
			destY = -h / 2,
			destW = w,
			destH = h;

		ctx.scale(1, -1);
		ctx.drawImage(img, srcX, srcY, srcW, srcH, destX, destY, destW, destH);
	}

	function renderForm(redo, ctx, form)
	{
		ctx.save();

		var x = form.x,
			y = form.y,
			theta = form.theta,
			scale = form.scale;

		if (x !== 0 || y !== 0)
		{
			ctx.translate(x, y);
		}
		if (theta !== 0)
		{
			ctx.rotate(theta % (Math.PI * 2));
		}
		if (scale !== 1)
		{
			ctx.scale(scale, scale);
		}
		if (form.alpha !== 1)
		{
			ctx.globalAlpha = ctx.globalAlpha * form.alpha;
		}

		ctx.beginPath();
		var f = form.form;
		switch (f.ctor)
		{
			case 'FPath':
				drawLine(ctx, f._0, f._1);
				break;

			case 'FImage':
				drawImage(redo, ctx, f);
				break;

			case 'FShape':
				if (f._0.ctor === 'Line')
				{
					f._1.closed = true;
					drawLine(ctx, f._0._0, f._1);
				}
				else
				{
					drawShape(redo, ctx, f._0._0, f._1);
				}
				break;

			case 'FText':
				fillText(redo, ctx, f._0);
				break;

			case 'FOutlinedText':
				strokeText(redo, ctx, f._0, f._1);
				break;
		}
		ctx.restore();
	}

	function formToMatrix(form)
	{
	   var scale = form.scale;
	   var matrix = A6( Transform.matrix, scale, 0, 0, scale, form.x, form.y );

	   var theta = form.theta;
	   if (theta !== 0)
	   {
		   matrix = A2( Transform.multiply, matrix, Transform.rotation(theta) );
	   }

	   return matrix;
	}

	function str(n)
	{
		if (n < 0.00001 && n > -0.00001)
		{
			return 0;
		}
		return n;
	}

	function makeTransform(w, h, form, matrices)
	{
		var props = form.form._0._0.props;
		var m = A6( Transform.matrix, 1, 0, 0, -1,
					(w - props.width ) / 2,
					(h - props.height) / 2 );
		var len = matrices.length;
		for (var i = 0; i < len; ++i)
		{
			m = A2( Transform.multiply, m, matrices[i] );
		}
		m = A2( Transform.multiply, m, formToMatrix(form) );

		return 'matrix(' +
			str( m[0]) + ', ' + str( m[3]) + ', ' +
			str(-m[1]) + ', ' + str(-m[4]) + ', ' +
			str( m[2]) + ', ' + str( m[5]) + ')';
	}

	function stepperHelp(list)
	{
		var arr = List.toArray(list);
		var i = 0;
		function peekNext()
		{
			return i < arr.length ? arr[i]._0.form.ctor : '';
		}
		// assumes that there is a next element
		function next()
		{
			var out = arr[i]._0;
			++i;
			return out;
		}
		return {
			peekNext: peekNext,
			next: next
		};
	}

	function formStepper(forms)
	{
		var ps = [stepperHelp(forms)];
		var matrices = [];
		var alphas = [];
		function peekNext()
		{
			var len = ps.length;
			var formType = '';
			for (var i = 0; i < len; ++i )
			{
				if (formType = ps[i].peekNext()) return formType;
			}
			return '';
		}
		// assumes that there is a next element
		function next(ctx)
		{
			while (!ps[0].peekNext())
			{
				ps.shift();
				matrices.pop();
				alphas.shift();
				if (ctx)
				{
					ctx.restore();
				}
			}
			var out = ps[0].next();
			var f = out.form;
			if (f.ctor === 'FGroup')
			{
				ps.unshift(stepperHelp(f._1));
				var m = A2(Transform.multiply, f._0, formToMatrix(out));
				ctx.save();
				ctx.transform(m[0], m[3], m[1], m[4], m[2], m[5]);
				matrices.push(m);

				var alpha = (alphas[0] || 1) * out.alpha;
				alphas.unshift(alpha);
				ctx.globalAlpha = alpha;
			}
			return out;
		}
		function transforms()
		{
			return matrices;
		}
		function alpha()
		{
			return alphas[0] || 1;
		}
		return {
			peekNext: peekNext,
			next: next,
			transforms: transforms,
			alpha: alpha
		};
	}

	function makeCanvas(w, h)
	{
		var canvas = NativeElement.createNode('canvas');
		canvas.style.width  = w + 'px';
		canvas.style.height = h + 'px';
		canvas.style.display = 'block';
		canvas.style.position = 'absolute';
		var ratio = window.devicePixelRatio || 1;
		canvas.width  = w * ratio;
		canvas.height = h * ratio;
		return canvas;
	}

	function render(model)
	{
		var div = NativeElement.createNode('div');
		div.style.overflow = 'hidden';
		div.style.position = 'relative';
		update(div, model, model);
		return div;
	}

	function nodeStepper(w, h, div)
	{
		var kids = div.childNodes;
		var i = 0;
		var ratio = window.devicePixelRatio || 1;

		function transform(transforms, ctx)
		{
			ctx.translate( w / 2 * ratio, h / 2 * ratio );
			ctx.scale( ratio, -ratio );
			var len = transforms.length;
			for (var i = 0; i < len; ++i)
			{
				var m = transforms[i];
				ctx.save();
				ctx.transform(m[0], m[3], m[1], m[4], m[2], m[5]);
			}
			return ctx;
		}
		function nextContext(transforms)
		{
			while (i < kids.length)
			{
				var node = kids[i];
				if (node.getContext)
				{
					node.width = w * ratio;
					node.height = h * ratio;
					node.style.width = w + 'px';
					node.style.height = h + 'px';
					++i;
					return transform(transforms, node.getContext('2d'));
				}
				div.removeChild(node);
			}
			var canvas = makeCanvas(w, h);
			div.appendChild(canvas);
			// we have added a new node, so we must step our position
			++i;
			return transform(transforms, canvas.getContext('2d'));
		}
		function addElement(matrices, alpha, form)
		{
			var kid = kids[i];
			var elem = form.form._0;

			var node = (!kid || kid.getContext)
				? NativeElement.render(elem)
				: NativeElement.update(kid, kid.oldElement, elem);

			node.style.position = 'absolute';
			node.style.opacity = alpha * form.alpha * elem._0.props.opacity;
			NativeElement.addTransform(node.style, makeTransform(w, h, form, matrices));
			node.oldElement = elem;
			++i;
			if (!kid)
			{
				div.appendChild(node);
			}
			else
			{
				div.insertBefore(node, kid);
			}
		}
		function clearRest()
		{
			while (i < kids.length)
			{
				div.removeChild(kids[i]);
			}
		}
		return {
			nextContext: nextContext,
			addElement: addElement,
			clearRest: clearRest
		};
	}


	function update(div, _, model)
	{
		var w = model.w;
		var h = model.h;

		var forms = formStepper(model.forms);
		var nodes = nodeStepper(w, h, div);
		var ctx = null;
		var formType = '';

		while (formType = forms.peekNext())
		{
			// make sure we have context if we need it
			if (ctx === null && formType !== 'FElement')
			{
				ctx = nodes.nextContext(forms.transforms());
				ctx.globalAlpha = forms.alpha();
			}

			var form = forms.next(ctx);
			// if it is FGroup, all updates are made within formStepper when next is called.
			if (formType === 'FElement')
			{
				// update or insert an element, get a new context
				nodes.addElement(forms.transforms(), forms.alpha(), form);
				ctx = null;
			}
			else if (formType !== 'FGroup')
			{
				renderForm(function() { update(div, model, model); }, ctx, form);
			}
		}
		nodes.clearRest();
		return div;
	}


	function collage(w, h, forms)
	{
		return A3(NativeElement.newElement, w, h, {
			ctor: 'Custom',
			type: 'Collage',
			render: render,
			update: update,
			model: {w: w, h: h, forms: forms}
		});
	}

	return localRuntime.Native.Graphics.Collage.values = {
		collage: F3(collage)
	};
};

Elm.Native.Color = {};
Elm.Native.Color.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Color = localRuntime.Native.Color || {};
	if (localRuntime.Native.Color.values)
	{
		return localRuntime.Native.Color.values;
	}

	function toCss(c)
	{
		var format = '';
		var colors = '';
		if (c.ctor === 'RGBA')
		{
			format = 'rgb';
			colors = c._0 + ', ' + c._1 + ', ' + c._2;
		}
		else
		{
			format = 'hsl';
			colors = (c._0 * 180 / Math.PI) + ', ' +
					 (c._1 * 100) + '%, ' +
					 (c._2 * 100) + '%';
		}
		if (c._3 === 1)
		{
			return format + '(' + colors + ')';
		}
		else
		{
			return format + 'a(' + colors + ', ' + c._3 + ')';
		}
	}

	return localRuntime.Native.Color.values = {
		toCss: toCss
	};
};

Elm.Color = Elm.Color || {};
Elm.Color.make = function (_elm) {
   "use strict";
   _elm.Color = _elm.Color || {};
   if (_elm.Color.values) return _elm.Color.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm);
   var _op = {};
   var Radial = F5(function (a,b,c,d,e) {
      return {ctor: "Radial",_0: a,_1: b,_2: c,_3: d,_4: e};
   });
   var radial = Radial;
   var Linear = F3(function (a,b,c) {
      return {ctor: "Linear",_0: a,_1: b,_2: c};
   });
   var linear = Linear;
   var fmod = F2(function (f,n) {
      var integer = $Basics.floor(f);
      return $Basics.toFloat(A2($Basics._op["%"],
      integer,
      n)) + f - $Basics.toFloat(integer);
   });
   var rgbToHsl = F3(function (red,green,blue) {
      var b = $Basics.toFloat(blue) / 255;
      var g = $Basics.toFloat(green) / 255;
      var r = $Basics.toFloat(red) / 255;
      var cMax = A2($Basics.max,A2($Basics.max,r,g),b);
      var cMin = A2($Basics.min,A2($Basics.min,r,g),b);
      var c = cMax - cMin;
      var lightness = (cMax + cMin) / 2;
      var saturation = _U.eq(lightness,
      0) ? 0 : c / (1 - $Basics.abs(2 * lightness - 1));
      var hue = $Basics.degrees(60) * (_U.eq(cMax,r) ? A2(fmod,
      (g - b) / c,
      6) : _U.eq(cMax,g) ? (b - r) / c + 2 : (r - g) / c + 4);
      return {ctor: "_Tuple3",_0: hue,_1: saturation,_2: lightness};
   });
   var hslToRgb = F3(function (hue,saturation,lightness) {
      var hue$ = hue / $Basics.degrees(60);
      var chroma = (1 - $Basics.abs(2 * lightness - 1)) * saturation;
      var x = chroma * (1 - $Basics.abs(A2(fmod,hue$,2) - 1));
      var _p0 = _U.cmp(hue$,0) < 0 ? {ctor: "_Tuple3"
                                     ,_0: 0
                                     ,_1: 0
                                     ,_2: 0} : _U.cmp(hue$,1) < 0 ? {ctor: "_Tuple3"
                                                                    ,_0: chroma
                                                                    ,_1: x
                                                                    ,_2: 0} : _U.cmp(hue$,2) < 0 ? {ctor: "_Tuple3"
                                                                                                   ,_0: x
                                                                                                   ,_1: chroma
                                                                                                   ,_2: 0} : _U.cmp(hue$,3) < 0 ? {ctor: "_Tuple3"
                                                                                                                                  ,_0: 0
                                                                                                                                  ,_1: chroma
                                                                                                                                  ,_2: x} : _U.cmp(hue$,
      4) < 0 ? {ctor: "_Tuple3",_0: 0,_1: x,_2: chroma} : _U.cmp(hue$,
      5) < 0 ? {ctor: "_Tuple3",_0: x,_1: 0,_2: chroma} : _U.cmp(hue$,
      6) < 0 ? {ctor: "_Tuple3"
               ,_0: chroma
               ,_1: 0
               ,_2: x} : {ctor: "_Tuple3",_0: 0,_1: 0,_2: 0};
      var r = _p0._0;
      var g = _p0._1;
      var b = _p0._2;
      var m = lightness - chroma / 2;
      return {ctor: "_Tuple3",_0: r + m,_1: g + m,_2: b + m};
   });
   var toRgb = function (color) {
      var _p1 = color;
      if (_p1.ctor === "RGBA") {
            return {red: _p1._0
                   ,green: _p1._1
                   ,blue: _p1._2
                   ,alpha: _p1._3};
         } else {
            var _p2 = A3(hslToRgb,_p1._0,_p1._1,_p1._2);
            var r = _p2._0;
            var g = _p2._1;
            var b = _p2._2;
            return {red: $Basics.round(255 * r)
                   ,green: $Basics.round(255 * g)
                   ,blue: $Basics.round(255 * b)
                   ,alpha: _p1._3};
         }
   };
   var toHsl = function (color) {
      var _p3 = color;
      if (_p3.ctor === "HSLA") {
            return {hue: _p3._0
                   ,saturation: _p3._1
                   ,lightness: _p3._2
                   ,alpha: _p3._3};
         } else {
            var _p4 = A3(rgbToHsl,_p3._0,_p3._1,_p3._2);
            var h = _p4._0;
            var s = _p4._1;
            var l = _p4._2;
            return {hue: h,saturation: s,lightness: l,alpha: _p3._3};
         }
   };
   var HSLA = F4(function (a,b,c,d) {
      return {ctor: "HSLA",_0: a,_1: b,_2: c,_3: d};
   });
   var hsla = F4(function (hue,saturation,lightness,alpha) {
      return A4(HSLA,
      hue - $Basics.turns($Basics.toFloat($Basics.floor(hue / (2 * $Basics.pi)))),
      saturation,
      lightness,
      alpha);
   });
   var hsl = F3(function (hue,saturation,lightness) {
      return A4(hsla,hue,saturation,lightness,1);
   });
   var complement = function (color) {
      var _p5 = color;
      if (_p5.ctor === "HSLA") {
            return A4(hsla,
            _p5._0 + $Basics.degrees(180),
            _p5._1,
            _p5._2,
            _p5._3);
         } else {
            var _p6 = A3(rgbToHsl,_p5._0,_p5._1,_p5._2);
            var h = _p6._0;
            var s = _p6._1;
            var l = _p6._2;
            return A4(hsla,h + $Basics.degrees(180),s,l,_p5._3);
         }
   };
   var grayscale = function (p) {    return A4(HSLA,0,0,1 - p,1);};
   var greyscale = function (p) {    return A4(HSLA,0,0,1 - p,1);};
   var RGBA = F4(function (a,b,c,d) {
      return {ctor: "RGBA",_0: a,_1: b,_2: c,_3: d};
   });
   var rgba = RGBA;
   var rgb = F3(function (r,g,b) {    return A4(RGBA,r,g,b,1);});
   var lightRed = A4(RGBA,239,41,41,1);
   var red = A4(RGBA,204,0,0,1);
   var darkRed = A4(RGBA,164,0,0,1);
   var lightOrange = A4(RGBA,252,175,62,1);
   var orange = A4(RGBA,245,121,0,1);
   var darkOrange = A4(RGBA,206,92,0,1);
   var lightYellow = A4(RGBA,255,233,79,1);
   var yellow = A4(RGBA,237,212,0,1);
   var darkYellow = A4(RGBA,196,160,0,1);
   var lightGreen = A4(RGBA,138,226,52,1);
   var green = A4(RGBA,115,210,22,1);
   var darkGreen = A4(RGBA,78,154,6,1);
   var lightBlue = A4(RGBA,114,159,207,1);
   var blue = A4(RGBA,52,101,164,1);
   var darkBlue = A4(RGBA,32,74,135,1);
   var lightPurple = A4(RGBA,173,127,168,1);
   var purple = A4(RGBA,117,80,123,1);
   var darkPurple = A4(RGBA,92,53,102,1);
   var lightBrown = A4(RGBA,233,185,110,1);
   var brown = A4(RGBA,193,125,17,1);
   var darkBrown = A4(RGBA,143,89,2,1);
   var black = A4(RGBA,0,0,0,1);
   var white = A4(RGBA,255,255,255,1);
   var lightGrey = A4(RGBA,238,238,236,1);
   var grey = A4(RGBA,211,215,207,1);
   var darkGrey = A4(RGBA,186,189,182,1);
   var lightGray = A4(RGBA,238,238,236,1);
   var gray = A4(RGBA,211,215,207,1);
   var darkGray = A4(RGBA,186,189,182,1);
   var lightCharcoal = A4(RGBA,136,138,133,1);
   var charcoal = A4(RGBA,85,87,83,1);
   var darkCharcoal = A4(RGBA,46,52,54,1);
   return _elm.Color.values = {_op: _op
                              ,rgb: rgb
                              ,rgba: rgba
                              ,hsl: hsl
                              ,hsla: hsla
                              ,greyscale: greyscale
                              ,grayscale: grayscale
                              ,complement: complement
                              ,linear: linear
                              ,radial: radial
                              ,toRgb: toRgb
                              ,toHsl: toHsl
                              ,red: red
                              ,orange: orange
                              ,yellow: yellow
                              ,green: green
                              ,blue: blue
                              ,purple: purple
                              ,brown: brown
                              ,lightRed: lightRed
                              ,lightOrange: lightOrange
                              ,lightYellow: lightYellow
                              ,lightGreen: lightGreen
                              ,lightBlue: lightBlue
                              ,lightPurple: lightPurple
                              ,lightBrown: lightBrown
                              ,darkRed: darkRed
                              ,darkOrange: darkOrange
                              ,darkYellow: darkYellow
                              ,darkGreen: darkGreen
                              ,darkBlue: darkBlue
                              ,darkPurple: darkPurple
                              ,darkBrown: darkBrown
                              ,white: white
                              ,lightGrey: lightGrey
                              ,grey: grey
                              ,darkGrey: darkGrey
                              ,lightCharcoal: lightCharcoal
                              ,charcoal: charcoal
                              ,darkCharcoal: darkCharcoal
                              ,black: black
                              ,lightGray: lightGray
                              ,gray: gray
                              ,darkGray: darkGray};
};

// setup
Elm.Native = Elm.Native || {};
Elm.Native.Graphics = Elm.Native.Graphics || {};
Elm.Native.Graphics.Element = Elm.Native.Graphics.Element || {};

// definition
Elm.Native.Graphics.Element.make = function(localRuntime) {
	'use strict';

	// attempt to short-circuit
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Graphics = localRuntime.Native.Graphics || {};
	localRuntime.Native.Graphics.Element = localRuntime.Native.Graphics.Element || {};
	if ('values' in localRuntime.Native.Graphics.Element)
	{
		return localRuntime.Native.Graphics.Element.values;
	}

	var Color = Elm.Native.Color.make(localRuntime);
	var List = Elm.Native.List.make(localRuntime);
	var Maybe = Elm.Maybe.make(localRuntime);
	var Text = Elm.Native.Text.make(localRuntime);
	var Utils = Elm.Native.Utils.make(localRuntime);


	// CREATION

	var createNode =
		typeof document === 'undefined'
			?
				function(_)
				{
					return {
						style: {},
						appendChild: function() {}
					};
				}
			:
				function(elementType)
				{
					var node = document.createElement(elementType);
					node.style.padding = '0';
					node.style.margin = '0';
					return node;
				}
			;


	function newElement(width, height, elementPrim)
	{
		return {
			ctor: 'Element_elm_builtin',
			_0: {
				element: elementPrim,
				props: {
					id: Utils.guid(),
					width: width,
					height: height,
					opacity: 1,
					color: Maybe.Nothing,
					href: '',
					tag: '',
					hover: Utils.Tuple0,
					click: Utils.Tuple0
				}
			}
		};
	}


	// PROPERTIES

	function setProps(elem, node)
	{
		var props = elem.props;

		var element = elem.element;
		var width = props.width - (element.adjustWidth || 0);
		var height = props.height - (element.adjustHeight || 0);
		node.style.width  = (width | 0) + 'px';
		node.style.height = (height | 0) + 'px';

		if (props.opacity !== 1)
		{
			node.style.opacity = props.opacity;
		}

		if (props.color.ctor === 'Just')
		{
			node.style.backgroundColor = Color.toCss(props.color._0);
		}

		if (props.tag !== '')
		{
			node.id = props.tag;
		}

		if (props.hover.ctor !== '_Tuple0')
		{
			addHover(node, props.hover);
		}

		if (props.click.ctor !== '_Tuple0')
		{
			addClick(node, props.click);
		}

		if (props.href !== '')
		{
			var anchor = createNode('a');
			anchor.href = props.href;
			anchor.style.display = 'block';
			anchor.style.pointerEvents = 'auto';
			anchor.appendChild(node);
			node = anchor;
		}

		return node;
	}

	function addClick(e, handler)
	{
		e.style.pointerEvents = 'auto';
		e.elm_click_handler = handler;
		function trigger(ev)
		{
			e.elm_click_handler(Utils.Tuple0);
			ev.stopPropagation();
		}
		e.elm_click_trigger = trigger;
		e.addEventListener('click', trigger);
	}

	function removeClick(e, handler)
	{
		if (e.elm_click_trigger)
		{
			e.removeEventListener('click', e.elm_click_trigger);
			e.elm_click_trigger = null;
			e.elm_click_handler = null;
		}
	}

	function addHover(e, handler)
	{
		e.style.pointerEvents = 'auto';
		e.elm_hover_handler = handler;
		e.elm_hover_count = 0;

		function over(evt)
		{
			if (e.elm_hover_count++ > 0) return;
			e.elm_hover_handler(true);
			evt.stopPropagation();
		}
		function out(evt)
		{
			if (e.contains(evt.toElement || evt.relatedTarget)) return;
			e.elm_hover_count = 0;
			e.elm_hover_handler(false);
			evt.stopPropagation();
		}
		e.elm_hover_over = over;
		e.elm_hover_out = out;
		e.addEventListener('mouseover', over);
		e.addEventListener('mouseout', out);
	}

	function removeHover(e)
	{
		e.elm_hover_handler = null;
		if (e.elm_hover_over)
		{
			e.removeEventListener('mouseover', e.elm_hover_over);
			e.elm_hover_over = null;
		}
		if (e.elm_hover_out)
		{
			e.removeEventListener('mouseout', e.elm_hover_out);
			e.elm_hover_out = null;
		}
	}


	// IMAGES

	function image(props, img)
	{
		switch (img._0.ctor)
		{
			case 'Plain':
				return plainImage(img._3);

			case 'Fitted':
				return fittedImage(props.width, props.height, img._3);

			case 'Cropped':
				return croppedImage(img, props.width, props.height, img._3);

			case 'Tiled':
				return tiledImage(img._3);
		}
	}

	function plainImage(src)
	{
		var img = createNode('img');
		img.src = src;
		img.name = src;
		img.style.display = 'block';
		return img;
	}

	function tiledImage(src)
	{
		var div = createNode('div');
		div.style.backgroundImage = 'url(' + src + ')';
		return div;
	}

	function fittedImage(w, h, src)
	{
		var div = createNode('div');
		div.style.background = 'url(' + src + ') no-repeat center';
		div.style.webkitBackgroundSize = 'cover';
		div.style.MozBackgroundSize = 'cover';
		div.style.OBackgroundSize = 'cover';
		div.style.backgroundSize = 'cover';
		return div;
	}

	function croppedImage(elem, w, h, src)
	{
		var pos = elem._0._0;
		var e = createNode('div');
		e.style.overflow = 'hidden';

		var img = createNode('img');
		img.onload = function() {
			var sw = w / elem._1, sh = h / elem._2;
			img.style.width = ((this.width * sw) | 0) + 'px';
			img.style.height = ((this.height * sh) | 0) + 'px';
			img.style.marginLeft = ((- pos._0 * sw) | 0) + 'px';
			img.style.marginTop = ((- pos._1 * sh) | 0) + 'px';
		};
		img.src = src;
		img.name = src;
		e.appendChild(img);
		return e;
	}


	// FLOW

	function goOut(node)
	{
		node.style.position = 'absolute';
		return node;
	}
	function goDown(node)
	{
		return node;
	}
	function goRight(node)
	{
		node.style.styleFloat = 'left';
		node.style.cssFloat = 'left';
		return node;
	}

	var directionTable = {
		DUp: goDown,
		DDown: goDown,
		DLeft: goRight,
		DRight: goRight,
		DIn: goOut,
		DOut: goOut
	};
	function needsReversal(dir)
	{
		return dir === 'DUp' || dir === 'DLeft' || dir === 'DIn';
	}

	function flow(dir, elist)
	{
		var array = List.toArray(elist);
		var container = createNode('div');
		var goDir = directionTable[dir];
		if (goDir === goOut)
		{
			container.style.pointerEvents = 'none';
		}
		if (needsReversal(dir))
		{
			array.reverse();
		}
		var len = array.length;
		for (var i = 0; i < len; ++i)
		{
			container.appendChild(goDir(render(array[i])));
		}
		return container;
	}


	// CONTAINER

	function toPos(pos)
	{
		return pos.ctor === 'Absolute'
			? pos._0 + 'px'
			: (pos._0 * 100) + '%';
	}

	// must clear right, left, top, bottom, and transform
	// before calling this function
	function setPos(pos, wrappedElement, e)
	{
		var elem = wrappedElement._0;
		var element = elem.element;
		var props = elem.props;
		var w = props.width + (element.adjustWidth ? element.adjustWidth : 0);
		var h = props.height + (element.adjustHeight ? element.adjustHeight : 0);

		e.style.position = 'absolute';
		e.style.margin = 'auto';
		var transform = '';

		switch (pos.horizontal.ctor)
		{
			case 'P':
				e.style.right = toPos(pos.x);
				e.style.removeProperty('left');
				break;

			case 'Z':
				transform = 'translateX(' + ((-w / 2) | 0) + 'px) ';

			case 'N':
				e.style.left = toPos(pos.x);
				e.style.removeProperty('right');
				break;
		}
		switch (pos.vertical.ctor)
		{
			case 'N':
				e.style.bottom = toPos(pos.y);
				e.style.removeProperty('top');
				break;

			case 'Z':
				transform += 'translateY(' + ((-h / 2) | 0) + 'px)';

			case 'P':
				e.style.top = toPos(pos.y);
				e.style.removeProperty('bottom');
				break;
		}
		if (transform !== '')
		{
			addTransform(e.style, transform);
		}
		return e;
	}

	function addTransform(style, transform)
	{
		style.transform       = transform;
		style.msTransform     = transform;
		style.MozTransform    = transform;
		style.webkitTransform = transform;
		style.OTransform      = transform;
	}

	function container(pos, elem)
	{
		var e = render(elem);
		setPos(pos, elem, e);
		var div = createNode('div');
		div.style.position = 'relative';
		div.style.overflow = 'hidden';
		div.appendChild(e);
		return div;
	}


	function rawHtml(elem)
	{
		var html = elem.html;
		var align = elem.align;

		var div = createNode('div');
		div.innerHTML = html;
		div.style.visibility = 'hidden';
		if (align)
		{
			div.style.textAlign = align;
		}
		div.style.visibility = 'visible';
		div.style.pointerEvents = 'auto';
		return div;
	}


	// RENDER

	function render(wrappedElement)
	{
		var elem = wrappedElement._0;
		return setProps(elem, makeElement(elem));
	}

	function makeElement(e)
	{
		var elem = e.element;
		switch (elem.ctor)
		{
			case 'Image':
				return image(e.props, elem);

			case 'Flow':
				return flow(elem._0.ctor, elem._1);

			case 'Container':
				return container(elem._0, elem._1);

			case 'Spacer':
				return createNode('div');

			case 'RawHtml':
				return rawHtml(elem);

			case 'Custom':
				return elem.render(elem.model);
		}
	}

	function updateAndReplace(node, curr, next)
	{
		var newNode = update(node, curr, next);
		if (newNode !== node)
		{
			node.parentNode.replaceChild(newNode, node);
		}
		return newNode;
	}


	// UPDATE

	function update(node, wrappedCurrent, wrappedNext)
	{
		var curr = wrappedCurrent._0;
		var next = wrappedNext._0;
		var rootNode = node;
		if (node.tagName === 'A')
		{
			node = node.firstChild;
		}
		if (curr.props.id === next.props.id)
		{
			updateProps(node, curr, next);
			return rootNode;
		}
		if (curr.element.ctor !== next.element.ctor)
		{
			return render(wrappedNext);
		}
		var nextE = next.element;
		var currE = curr.element;
		switch (nextE.ctor)
		{
			case 'Spacer':
				updateProps(node, curr, next);
				return rootNode;

			case 'RawHtml':
				if(currE.html.valueOf() !== nextE.html.valueOf())
				{
					node.innerHTML = nextE.html;
				}
				updateProps(node, curr, next);
				return rootNode;

			case 'Image':
				if (nextE._0.ctor === 'Plain')
				{
					if (nextE._3 !== currE._3)
					{
						node.src = nextE._3;
					}
				}
				else if (!Utils.eq(nextE, currE)
					|| next.props.width !== curr.props.width
					|| next.props.height !== curr.props.height)
				{
					return render(wrappedNext);
				}
				updateProps(node, curr, next);
				return rootNode;

			case 'Flow':
				var arr = List.toArray(nextE._1);
				for (var i = arr.length; i--; )
				{
					arr[i] = arr[i]._0.element.ctor;
				}
				if (nextE._0.ctor !== currE._0.ctor)
				{
					return render(wrappedNext);
				}
				var nexts = List.toArray(nextE._1);
				var kids = node.childNodes;
				if (nexts.length !== kids.length)
				{
					return render(wrappedNext);
				}
				var currs = List.toArray(currE._1);
				var dir = nextE._0.ctor;
				var goDir = directionTable[dir];
				var toReverse = needsReversal(dir);
				var len = kids.length;
				for (var i = len; i--; )
				{
					var subNode = kids[toReverse ? len - i - 1 : i];
					goDir(updateAndReplace(subNode, currs[i], nexts[i]));
				}
				updateProps(node, curr, next);
				return rootNode;

			case 'Container':
				var subNode = node.firstChild;
				var newSubNode = updateAndReplace(subNode, currE._1, nextE._1);
				setPos(nextE._0, nextE._1, newSubNode);
				updateProps(node, curr, next);
				return rootNode;

			case 'Custom':
				if (currE.type === nextE.type)
				{
					var updatedNode = nextE.update(node, currE.model, nextE.model);
					updateProps(updatedNode, curr, next);
					return updatedNode;
				}
				return render(wrappedNext);
		}
	}

	function updateProps(node, curr, next)
	{
		var nextProps = next.props;
		var currProps = curr.props;

		var element = next.element;
		var width = nextProps.width - (element.adjustWidth || 0);
		var height = nextProps.height - (element.adjustHeight || 0);
		if (width !== currProps.width)
		{
			node.style.width = (width | 0) + 'px';
		}
		if (height !== currProps.height)
		{
			node.style.height = (height | 0) + 'px';
		}

		if (nextProps.opacity !== currProps.opacity)
		{
			node.style.opacity = nextProps.opacity;
		}

		var nextColor = nextProps.color.ctor === 'Just'
			? Color.toCss(nextProps.color._0)
			: '';
		if (node.style.backgroundColor !== nextColor)
		{
			node.style.backgroundColor = nextColor;
		}

		if (nextProps.tag !== currProps.tag)
		{
			node.id = nextProps.tag;
		}

		if (nextProps.href !== currProps.href)
		{
			if (currProps.href === '')
			{
				// add a surrounding href
				var anchor = createNode('a');
				anchor.href = nextProps.href;
				anchor.style.display = 'block';
				anchor.style.pointerEvents = 'auto';

				node.parentNode.replaceChild(anchor, node);
				anchor.appendChild(node);
			}
			else if (nextProps.href === '')
			{
				// remove the surrounding href
				var anchor = node.parentNode;
				anchor.parentNode.replaceChild(node, anchor);
			}
			else
			{
				// just update the link
				node.parentNode.href = nextProps.href;
			}
		}

		// update click and hover handlers
		var removed = false;

		// update hover handlers
		if (currProps.hover.ctor === '_Tuple0')
		{
			if (nextProps.hover.ctor !== '_Tuple0')
			{
				addHover(node, nextProps.hover);
			}
		}
		else
		{
			if (nextProps.hover.ctor === '_Tuple0')
			{
				removed = true;
				removeHover(node);
			}
			else
			{
				node.elm_hover_handler = nextProps.hover;
			}
		}

		// update click handlers
		if (currProps.click.ctor === '_Tuple0')
		{
			if (nextProps.click.ctor !== '_Tuple0')
			{
				addClick(node, nextProps.click);
			}
		}
		else
		{
			if (nextProps.click.ctor === '_Tuple0')
			{
				removed = true;
				removeClick(node);
			}
			else
			{
				node.elm_click_handler = nextProps.click;
			}
		}

		// stop capturing clicks if
		if (removed
			&& nextProps.hover.ctor === '_Tuple0'
			&& nextProps.click.ctor === '_Tuple0')
		{
			node.style.pointerEvents = 'none';
		}
	}


	// TEXT

	function block(align)
	{
		return function(text)
		{
			var raw = {
				ctor: 'RawHtml',
				html: Text.renderHtml(text),
				align: align
			};
			var pos = htmlHeight(0, raw);
			return newElement(pos._0, pos._1, raw);
		};
	}

	function markdown(text)
	{
		var raw = {
			ctor: 'RawHtml',
			html: text,
			align: null
		};
		var pos = htmlHeight(0, raw);
		return newElement(pos._0, pos._1, raw);
	}

	var htmlHeight =
		typeof document !== 'undefined'
			? realHtmlHeight
			: function(a, b) { return Utils.Tuple2(0, 0); };

	function realHtmlHeight(width, rawHtml)
	{
		// create dummy node
		var temp = document.createElement('div');
		temp.innerHTML = rawHtml.html;
		if (width > 0)
		{
			temp.style.width = width + 'px';
		}
		temp.style.visibility = 'hidden';
		temp.style.styleFloat = 'left';
		temp.style.cssFloat = 'left';

		document.body.appendChild(temp);

		// get dimensions
		var style = window.getComputedStyle(temp, null);
		var w = Math.ceil(style.getPropertyValue('width').slice(0, -2) - 0);
		var h = Math.ceil(style.getPropertyValue('height').slice(0, -2) - 0);
		document.body.removeChild(temp);
		return Utils.Tuple2(w, h);
	}


	return localRuntime.Native.Graphics.Element.values = {
		render: render,
		update: update,
		updateAndReplace: updateAndReplace,

		createNode: createNode,
		newElement: F3(newElement),
		addTransform: addTransform,
		htmlHeight: F2(htmlHeight),
		guid: Utils.guid,

		block: block,
		markdown: markdown
	};
};

Elm.Native.Text = {};
Elm.Native.Text.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Text = localRuntime.Native.Text || {};
	if (localRuntime.Native.Text.values)
	{
		return localRuntime.Native.Text.values;
	}

	var toCss = Elm.Native.Color.make(localRuntime).toCss;
	var List = Elm.Native.List.make(localRuntime);


	// CONSTRUCTORS

	function fromString(str)
	{
		return {
			ctor: 'Text:Text',
			_0: str
		};
	}

	function append(a, b)
	{
		return {
			ctor: 'Text:Append',
			_0: a,
			_1: b
		};
	}

	function addMeta(field, value, text)
	{
		var newProps = {};
		var newText = {
			ctor: 'Text:Meta',
			_0: newProps,
			_1: text
		};

		if (text.ctor === 'Text:Meta')
		{
			newText._1 = text._1;
			var props = text._0;
			for (var i = metaKeys.length; i--; )
			{
				var key = metaKeys[i];
				var val = props[key];
				if (val)
				{
					newProps[key] = val;
				}
			}
		}
		newProps[field] = value;
		return newText;
	}

	var metaKeys = [
		'font-size',
		'font-family',
		'font-style',
		'font-weight',
		'href',
		'text-decoration',
		'color'
	];


	// conversions from Elm values to CSS

	function toTypefaces(list)
	{
		var typefaces = List.toArray(list);
		for (var i = typefaces.length; i--; )
		{
			var typeface = typefaces[i];
			if (typeface.indexOf(' ') > -1)
			{
				typefaces[i] = "'" + typeface + "'";
			}
		}
		return typefaces.join(',');
	}

	function toLine(line)
	{
		var ctor = line.ctor;
		return ctor === 'Under'
			? 'underline'
			: ctor === 'Over'
				? 'overline'
				: 'line-through';
	}

	// setting styles of Text

	function style(style, text)
	{
		var newText = addMeta('color', toCss(style.color), text);
		var props = newText._0;

		if (style.typeface.ctor !== '[]')
		{
			props['font-family'] = toTypefaces(style.typeface);
		}
		if (style.height.ctor !== 'Nothing')
		{
			props['font-size'] = style.height._0 + 'px';
		}
		if (style.bold)
		{
			props['font-weight'] = 'bold';
		}
		if (style.italic)
		{
			props['font-style'] = 'italic';
		}
		if (style.line.ctor !== 'Nothing')
		{
			props['text-decoration'] = toLine(style.line._0);
		}
		return newText;
	}

	function height(px, text)
	{
		return addMeta('font-size', px + 'px', text);
	}

	function typeface(names, text)
	{
		return addMeta('font-family', toTypefaces(names), text);
	}

	function monospace(text)
	{
		return addMeta('font-family', 'monospace', text);
	}

	function italic(text)
	{
		return addMeta('font-style', 'italic', text);
	}

	function bold(text)
	{
		return addMeta('font-weight', 'bold', text);
	}

	function link(href, text)
	{
		return addMeta('href', href, text);
	}

	function line(line, text)
	{
		return addMeta('text-decoration', toLine(line), text);
	}

	function color(color, text)
	{
		return addMeta('color', toCss(color), text);
	}


	// RENDER

	function renderHtml(text)
	{
		var tag = text.ctor;
		if (tag === 'Text:Append')
		{
			return renderHtml(text._0) + renderHtml(text._1);
		}
		if (tag === 'Text:Text')
		{
			return properEscape(text._0);
		}
		if (tag === 'Text:Meta')
		{
			return renderMeta(text._0, renderHtml(text._1));
		}
	}

	function renderMeta(metas, string)
	{
		var href = metas.href;
		if (href)
		{
			string = '<a href="' + href + '">' + string + '</a>';
		}
		var styles = '';
		for (var key in metas)
		{
			if (key === 'href')
			{
				continue;
			}
			styles += key + ':' + metas[key] + ';';
		}
		if (styles)
		{
			string = '<span style="' + styles + '">' + string + '</span>';
		}
		return string;
	}

	function properEscape(str)
	{
		if (str.length === 0)
		{
			return str;
		}
		str = str //.replace(/&/g,  '&#38;')
			.replace(/"/g,  '&#34;')
			.replace(/'/g,  '&#39;')
			.replace(/</g,  '&#60;')
			.replace(/>/g,  '&#62;');
		var arr = str.split('\n');
		for (var i = arr.length; i--; )
		{
			arr[i] = makeSpaces(arr[i]);
		}
		return arr.join('<br/>');
	}

	function makeSpaces(s)
	{
		if (s.length === 0)
		{
			return s;
		}
		var arr = s.split('');
		if (arr[0] === ' ')
		{
			arr[0] = '&nbsp;';
		}
		for (var i = arr.length; --i; )
		{
			if (arr[i][0] === ' ' && arr[i - 1] === ' ')
			{
				arr[i - 1] = arr[i - 1] + arr[i];
				arr[i] = '';
			}
		}
		for (var i = arr.length; i--; )
		{
			if (arr[i].length > 1 && arr[i][0] === ' ')
			{
				var spaces = arr[i].split('');
				for (var j = spaces.length - 2; j >= 0; j -= 2)
				{
					spaces[j] = '&nbsp;';
				}
				arr[i] = spaces.join('');
			}
		}
		arr = arr.join('');
		if (arr[arr.length - 1] === ' ')
		{
			return arr.slice(0, -1) + '&nbsp;';
		}
		return arr;
	}


	return localRuntime.Native.Text.values = {
		fromString: fromString,
		append: F2(append),

		height: F2(height),
		italic: italic,
		bold: bold,
		line: F2(line),
		monospace: monospace,
		typeface: F2(typeface),
		color: F2(color),
		link: F2(link),
		style: F2(style),

		toTypefaces: toTypefaces,
		toLine: toLine,
		renderHtml: renderHtml
	};
};

Elm.Text = Elm.Text || {};
Elm.Text.make = function (_elm) {
   "use strict";
   _elm.Text = _elm.Text || {};
   if (_elm.Text.values) return _elm.Text.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Color = Elm.Color.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Text = Elm.Native.Text.make(_elm);
   var _op = {};
   var line = $Native$Text.line;
   var italic = $Native$Text.italic;
   var bold = $Native$Text.bold;
   var color = $Native$Text.color;
   var height = $Native$Text.height;
   var link = $Native$Text.link;
   var monospace = $Native$Text.monospace;
   var typeface = $Native$Text.typeface;
   var style = $Native$Text.style;
   var append = $Native$Text.append;
   var fromString = $Native$Text.fromString;
   var empty = fromString("");
   var concat = function (texts) {
      return A3($List.foldr,append,empty,texts);
   };
   var join = F2(function (seperator,texts) {
      return concat(A2($List.intersperse,seperator,texts));
   });
   var defaultStyle = {typeface: _U.list([])
                      ,height: $Maybe.Nothing
                      ,color: $Color.black
                      ,bold: false
                      ,italic: false
                      ,line: $Maybe.Nothing};
   var Style = F6(function (a,b,c,d,e,f) {
      return {typeface: a
             ,height: b
             ,color: c
             ,bold: d
             ,italic: e
             ,line: f};
   });
   var Through = {ctor: "Through"};
   var Over = {ctor: "Over"};
   var Under = {ctor: "Under"};
   var Text = {ctor: "Text"};
   return _elm.Text.values = {_op: _op
                             ,fromString: fromString
                             ,empty: empty
                             ,append: append
                             ,concat: concat
                             ,join: join
                             ,link: link
                             ,style: style
                             ,defaultStyle: defaultStyle
                             ,typeface: typeface
                             ,monospace: monospace
                             ,height: height
                             ,color: color
                             ,bold: bold
                             ,italic: italic
                             ,line: line
                             ,Style: Style
                             ,Under: Under
                             ,Over: Over
                             ,Through: Through};
};
Elm.Graphics = Elm.Graphics || {};
Elm.Graphics.Element = Elm.Graphics.Element || {};
Elm.Graphics.Element.make = function (_elm) {
   "use strict";
   _elm.Graphics = _elm.Graphics || {};
   _elm.Graphics.Element = _elm.Graphics.Element || {};
   if (_elm.Graphics.Element.values)
   return _elm.Graphics.Element.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Color = Elm.Color.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Graphics$Element = Elm.Native.Graphics.Element.make(_elm),
   $Text = Elm.Text.make(_elm);
   var _op = {};
   var DOut = {ctor: "DOut"};
   var outward = DOut;
   var DIn = {ctor: "DIn"};
   var inward = DIn;
   var DRight = {ctor: "DRight"};
   var right = DRight;
   var DLeft = {ctor: "DLeft"};
   var left = DLeft;
   var DDown = {ctor: "DDown"};
   var down = DDown;
   var DUp = {ctor: "DUp"};
   var up = DUp;
   var RawPosition = F4(function (a,b,c,d) {
      return {horizontal: a,vertical: b,x: c,y: d};
   });
   var Position = function (a) {
      return {ctor: "Position",_0: a};
   };
   var Relative = function (a) {
      return {ctor: "Relative",_0: a};
   };
   var relative = Relative;
   var Absolute = function (a) {
      return {ctor: "Absolute",_0: a};
   };
   var absolute = Absolute;
   var N = {ctor: "N"};
   var bottomLeft = Position({horizontal: N
                             ,vertical: N
                             ,x: Absolute(0)
                             ,y: Absolute(0)});
   var bottomLeftAt = F2(function (x,y) {
      return Position({horizontal: N,vertical: N,x: x,y: y});
   });
   var Z = {ctor: "Z"};
   var middle = Position({horizontal: Z
                         ,vertical: Z
                         ,x: Relative(0.5)
                         ,y: Relative(0.5)});
   var midLeft = Position({horizontal: N
                          ,vertical: Z
                          ,x: Absolute(0)
                          ,y: Relative(0.5)});
   var midBottom = Position({horizontal: Z
                            ,vertical: N
                            ,x: Relative(0.5)
                            ,y: Absolute(0)});
   var middleAt = F2(function (x,y) {
      return Position({horizontal: Z,vertical: Z,x: x,y: y});
   });
   var midLeftAt = F2(function (x,y) {
      return Position({horizontal: N,vertical: Z,x: x,y: y});
   });
   var midBottomAt = F2(function (x,y) {
      return Position({horizontal: Z,vertical: N,x: x,y: y});
   });
   var P = {ctor: "P"};
   var topLeft = Position({horizontal: N
                          ,vertical: P
                          ,x: Absolute(0)
                          ,y: Absolute(0)});
   var topRight = Position({horizontal: P
                           ,vertical: P
                           ,x: Absolute(0)
                           ,y: Absolute(0)});
   var bottomRight = Position({horizontal: P
                              ,vertical: N
                              ,x: Absolute(0)
                              ,y: Absolute(0)});
   var midRight = Position({horizontal: P
                           ,vertical: Z
                           ,x: Absolute(0)
                           ,y: Relative(0.5)});
   var midTop = Position({horizontal: Z
                         ,vertical: P
                         ,x: Relative(0.5)
                         ,y: Absolute(0)});
   var topLeftAt = F2(function (x,y) {
      return Position({horizontal: N,vertical: P,x: x,y: y});
   });
   var topRightAt = F2(function (x,y) {
      return Position({horizontal: P,vertical: P,x: x,y: y});
   });
   var bottomRightAt = F2(function (x,y) {
      return Position({horizontal: P,vertical: N,x: x,y: y});
   });
   var midRightAt = F2(function (x,y) {
      return Position({horizontal: P,vertical: Z,x: x,y: y});
   });
   var midTopAt = F2(function (x,y) {
      return Position({horizontal: Z,vertical: P,x: x,y: y});
   });
   var justified = $Native$Graphics$Element.block("justify");
   var centered = $Native$Graphics$Element.block("center");
   var rightAligned = $Native$Graphics$Element.block("right");
   var leftAligned = $Native$Graphics$Element.block("left");
   var show = function (value) {
      return leftAligned($Text.monospace($Text.fromString($Basics.toString(value))));
   };
   var Tiled = {ctor: "Tiled"};
   var Cropped = function (a) {
      return {ctor: "Cropped",_0: a};
   };
   var Fitted = {ctor: "Fitted"};
   var Plain = {ctor: "Plain"};
   var Custom = {ctor: "Custom"};
   var RawHtml = {ctor: "RawHtml"};
   var Spacer = {ctor: "Spacer"};
   var Flow = F2(function (a,b) {
      return {ctor: "Flow",_0: a,_1: b};
   });
   var Container = F2(function (a,b) {
      return {ctor: "Container",_0: a,_1: b};
   });
   var Image = F4(function (a,b,c,d) {
      return {ctor: "Image",_0: a,_1: b,_2: c,_3: d};
   });
   var newElement = $Native$Graphics$Element.newElement;
   var image = F3(function (w,h,src) {
      return A3(newElement,w,h,A4(Image,Plain,w,h,src));
   });
   var fittedImage = F3(function (w,h,src) {
      return A3(newElement,w,h,A4(Image,Fitted,w,h,src));
   });
   var croppedImage = F4(function (pos,w,h,src) {
      return A3(newElement,w,h,A4(Image,Cropped(pos),w,h,src));
   });
   var tiledImage = F3(function (w,h,src) {
      return A3(newElement,w,h,A4(Image,Tiled,w,h,src));
   });
   var container = F4(function (w,h,_p0,e) {
      var _p1 = _p0;
      return A3(newElement,w,h,A2(Container,_p1._0,e));
   });
   var spacer = F2(function (w,h) {
      return A3(newElement,w,h,Spacer);
   });
   var sizeOf = function (_p2) {
      var _p3 = _p2;
      var _p4 = _p3._0;
      return {ctor: "_Tuple2"
             ,_0: _p4.props.width
             ,_1: _p4.props.height};
   };
   var heightOf = function (_p5) {
      var _p6 = _p5;
      return _p6._0.props.height;
   };
   var widthOf = function (_p7) {
      var _p8 = _p7;
      return _p8._0.props.width;
   };
   var above = F2(function (hi,lo) {
      return A3(newElement,
      A2($Basics.max,widthOf(hi),widthOf(lo)),
      heightOf(hi) + heightOf(lo),
      A2(Flow,DDown,_U.list([hi,lo])));
   });
   var below = F2(function (lo,hi) {
      return A3(newElement,
      A2($Basics.max,widthOf(hi),widthOf(lo)),
      heightOf(hi) + heightOf(lo),
      A2(Flow,DDown,_U.list([hi,lo])));
   });
   var beside = F2(function (lft,rht) {
      return A3(newElement,
      widthOf(lft) + widthOf(rht),
      A2($Basics.max,heightOf(lft),heightOf(rht)),
      A2(Flow,right,_U.list([lft,rht])));
   });
   var layers = function (es) {
      var hs = A2($List.map,heightOf,es);
      var ws = A2($List.map,widthOf,es);
      return A3(newElement,
      A2($Maybe.withDefault,0,$List.maximum(ws)),
      A2($Maybe.withDefault,0,$List.maximum(hs)),
      A2(Flow,DOut,es));
   };
   var empty = A2(spacer,0,0);
   var flow = F2(function (dir,es) {
      var newFlow = F2(function (w,h) {
         return A3(newElement,w,h,A2(Flow,dir,es));
      });
      var maxOrZero = function (list) {
         return A2($Maybe.withDefault,0,$List.maximum(list));
      };
      var hs = A2($List.map,heightOf,es);
      var ws = A2($List.map,widthOf,es);
      if (_U.eq(es,_U.list([]))) return empty; else {
            var _p9 = dir;
            switch (_p9.ctor)
            {case "DUp": return A2(newFlow,maxOrZero(ws),$List.sum(hs));
               case "DDown": return A2(newFlow,maxOrZero(ws),$List.sum(hs));
               case "DLeft": return A2(newFlow,$List.sum(ws),maxOrZero(hs));
               case "DRight": return A2(newFlow,$List.sum(ws),maxOrZero(hs));
               case "DIn": return A2(newFlow,maxOrZero(ws),maxOrZero(hs));
               default: return A2(newFlow,maxOrZero(ws),maxOrZero(hs));}
         }
   });
   var Properties = F9(function (a,b,c,d,e,f,g,h,i) {
      return {id: a
             ,width: b
             ,height: c
             ,opacity: d
             ,color: e
             ,href: f
             ,tag: g
             ,hover: h
             ,click: i};
   });
   var Element_elm_builtin = function (a) {
      return {ctor: "Element_elm_builtin",_0: a};
   };
   var width = F2(function (newWidth,_p10) {
      var _p11 = _p10;
      var _p14 = _p11._0.props;
      var _p13 = _p11._0.element;
      var newHeight = function () {
         var _p12 = _p13;
         switch (_p12.ctor)
         {case "Image":
            return $Basics.round($Basics.toFloat(_p12._2) / $Basics.toFloat(_p12._1) * $Basics.toFloat(newWidth));
            case "RawHtml":
            return $Basics.snd(A2($Native$Graphics$Element.htmlHeight,
              newWidth,
              _p13));
            default: return _p14.height;}
      }();
      return Element_elm_builtin({element: _p13
                                 ,props: _U.update(_p14,{width: newWidth,height: newHeight})});
   });
   var height = F2(function (newHeight,_p15) {
      var _p16 = _p15;
      return Element_elm_builtin({element: _p16._0.element
                                 ,props: _U.update(_p16._0.props,{height: newHeight})});
   });
   var size = F3(function (w,h,e) {
      return A2(height,h,A2(width,w,e));
   });
   var opacity = F2(function (givenOpacity,_p17) {
      var _p18 = _p17;
      return Element_elm_builtin({element: _p18._0.element
                                 ,props: _U.update(_p18._0.props,{opacity: givenOpacity})});
   });
   var color = F2(function (clr,_p19) {
      var _p20 = _p19;
      return Element_elm_builtin({element: _p20._0.element
                                 ,props: _U.update(_p20._0.props,{color: $Maybe.Just(clr)})});
   });
   var tag = F2(function (name,_p21) {
      var _p22 = _p21;
      return Element_elm_builtin({element: _p22._0.element
                                 ,props: _U.update(_p22._0.props,{tag: name})});
   });
   var link = F2(function (href,_p23) {
      var _p24 = _p23;
      return Element_elm_builtin({element: _p24._0.element
                                 ,props: _U.update(_p24._0.props,{href: href})});
   });
   return _elm.Graphics.Element.values = {_op: _op
                                         ,image: image
                                         ,fittedImage: fittedImage
                                         ,croppedImage: croppedImage
                                         ,tiledImage: tiledImage
                                         ,leftAligned: leftAligned
                                         ,rightAligned: rightAligned
                                         ,centered: centered
                                         ,justified: justified
                                         ,show: show
                                         ,width: width
                                         ,height: height
                                         ,size: size
                                         ,color: color
                                         ,opacity: opacity
                                         ,link: link
                                         ,tag: tag
                                         ,widthOf: widthOf
                                         ,heightOf: heightOf
                                         ,sizeOf: sizeOf
                                         ,flow: flow
                                         ,up: up
                                         ,down: down
                                         ,left: left
                                         ,right: right
                                         ,inward: inward
                                         ,outward: outward
                                         ,layers: layers
                                         ,above: above
                                         ,below: below
                                         ,beside: beside
                                         ,empty: empty
                                         ,spacer: spacer
                                         ,container: container
                                         ,middle: middle
                                         ,midTop: midTop
                                         ,midBottom: midBottom
                                         ,midLeft: midLeft
                                         ,midRight: midRight
                                         ,topLeft: topLeft
                                         ,topRight: topRight
                                         ,bottomLeft: bottomLeft
                                         ,bottomRight: bottomRight
                                         ,absolute: absolute
                                         ,relative: relative
                                         ,middleAt: middleAt
                                         ,midTopAt: midTopAt
                                         ,midBottomAt: midBottomAt
                                         ,midLeftAt: midLeftAt
                                         ,midRightAt: midRightAt
                                         ,topLeftAt: topLeftAt
                                         ,topRightAt: topRightAt
                                         ,bottomLeftAt: bottomLeftAt
                                         ,bottomRightAt: bottomRightAt};
};
Elm.Graphics = Elm.Graphics || {};
Elm.Graphics.Collage = Elm.Graphics.Collage || {};
Elm.Graphics.Collage.make = function (_elm) {
   "use strict";
   _elm.Graphics = _elm.Graphics || {};
   _elm.Graphics.Collage = _elm.Graphics.Collage || {};
   if (_elm.Graphics.Collage.values)
   return _elm.Graphics.Collage.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Color = Elm.Color.make(_elm),
   $Graphics$Element = Elm.Graphics.Element.make(_elm),
   $List = Elm.List.make(_elm),
   $Native$Graphics$Collage = Elm.Native.Graphics.Collage.make(_elm),
   $Text = Elm.Text.make(_elm),
   $Transform2D = Elm.Transform2D.make(_elm);
   var _op = {};
   var Shape = function (a) {    return {ctor: "Shape",_0: a};};
   var polygon = function (points) {    return Shape(points);};
   var rect = F2(function (w,h) {
      var hh = h / 2;
      var hw = w / 2;
      return Shape(_U.list([{ctor: "_Tuple2",_0: 0 - hw,_1: 0 - hh}
                           ,{ctor: "_Tuple2",_0: 0 - hw,_1: hh}
                           ,{ctor: "_Tuple2",_0: hw,_1: hh}
                           ,{ctor: "_Tuple2",_0: hw,_1: 0 - hh}]));
   });
   var square = function (n) {    return A2(rect,n,n);};
   var oval = F2(function (w,h) {
      var hh = h / 2;
      var hw = w / 2;
      var n = 50;
      var t = 2 * $Basics.pi / n;
      var f = function (i) {
         return {ctor: "_Tuple2"
                ,_0: hw * $Basics.cos(t * i)
                ,_1: hh * $Basics.sin(t * i)};
      };
      return Shape(A2($List.map,f,_U.range(0,n - 1)));
   });
   var circle = function (r) {    return A2(oval,2 * r,2 * r);};
   var ngon = F2(function (n,r) {
      var m = $Basics.toFloat(n);
      var t = 2 * $Basics.pi / m;
      var f = function (i) {
         return {ctor: "_Tuple2"
                ,_0: r * $Basics.cos(t * i)
                ,_1: r * $Basics.sin(t * i)};
      };
      return Shape(A2($List.map,f,_U.range(0,m - 1)));
   });
   var Path = function (a) {    return {ctor: "Path",_0: a};};
   var path = function (ps) {    return Path(ps);};
   var segment = F2(function (p1,p2) {
      return Path(_U.list([p1,p2]));
   });
   var collage = $Native$Graphics$Collage.collage;
   var Fill = function (a) {    return {ctor: "Fill",_0: a};};
   var Line = function (a) {    return {ctor: "Line",_0: a};};
   var FGroup = F2(function (a,b) {
      return {ctor: "FGroup",_0: a,_1: b};
   });
   var FElement = function (a) {
      return {ctor: "FElement",_0: a};
   };
   var FImage = F4(function (a,b,c,d) {
      return {ctor: "FImage",_0: a,_1: b,_2: c,_3: d};
   });
   var FText = function (a) {    return {ctor: "FText",_0: a};};
   var FOutlinedText = F2(function (a,b) {
      return {ctor: "FOutlinedText",_0: a,_1: b};
   });
   var FShape = F2(function (a,b) {
      return {ctor: "FShape",_0: a,_1: b};
   });
   var FPath = F2(function (a,b) {
      return {ctor: "FPath",_0: a,_1: b};
   });
   var LineStyle = F6(function (a,b,c,d,e,f) {
      return {color: a
             ,width: b
             ,cap: c
             ,join: d
             ,dashing: e
             ,dashOffset: f};
   });
   var Clipped = {ctor: "Clipped"};
   var Sharp = function (a) {    return {ctor: "Sharp",_0: a};};
   var Smooth = {ctor: "Smooth"};
   var Padded = {ctor: "Padded"};
   var Round = {ctor: "Round"};
   var Flat = {ctor: "Flat"};
   var defaultLine = {color: $Color.black
                     ,width: 1
                     ,cap: Flat
                     ,join: Sharp(10)
                     ,dashing: _U.list([])
                     ,dashOffset: 0};
   var solid = function (clr) {
      return _U.update(defaultLine,{color: clr});
   };
   var dashed = function (clr) {
      return _U.update(defaultLine,
      {color: clr,dashing: _U.list([8,4])});
   };
   var dotted = function (clr) {
      return _U.update(defaultLine,
      {color: clr,dashing: _U.list([3,3])});
   };
   var Grad = function (a) {    return {ctor: "Grad",_0: a};};
   var Texture = function (a) {
      return {ctor: "Texture",_0: a};
   };
   var Solid = function (a) {    return {ctor: "Solid",_0: a};};
   var Form_elm_builtin = function (a) {
      return {ctor: "Form_elm_builtin",_0: a};
   };
   var form = function (f) {
      return Form_elm_builtin({theta: 0
                              ,scale: 1
                              ,x: 0
                              ,y: 0
                              ,alpha: 1
                              ,form: f});
   };
   var fill = F2(function (style,_p0) {
      var _p1 = _p0;
      return form(A2(FShape,Fill(style),_p1._0));
   });
   var filled = F2(function (color,shape) {
      return A2(fill,Solid(color),shape);
   });
   var textured = F2(function (src,shape) {
      return A2(fill,Texture(src),shape);
   });
   var gradient = F2(function (grad,shape) {
      return A2(fill,Grad(grad),shape);
   });
   var outlined = F2(function (style,_p2) {
      var _p3 = _p2;
      return form(A2(FShape,Line(style),_p3._0));
   });
   var traced = F2(function (style,_p4) {
      var _p5 = _p4;
      return form(A2(FPath,style,_p5._0));
   });
   var sprite = F4(function (w,h,pos,src) {
      return form(A4(FImage,w,h,pos,src));
   });
   var toForm = function (e) {    return form(FElement(e));};
   var group = function (fs) {
      return form(A2(FGroup,$Transform2D.identity,fs));
   };
   var groupTransform = F2(function (matrix,fs) {
      return form(A2(FGroup,matrix,fs));
   });
   var text = function (t) {    return form(FText(t));};
   var outlinedText = F2(function (ls,t) {
      return form(A2(FOutlinedText,ls,t));
   });
   var move = F2(function (_p7,_p6) {
      var _p8 = _p7;
      var _p9 = _p6;
      var _p10 = _p9._0;
      return Form_elm_builtin(_U.update(_p10,
      {x: _p10.x + _p8._0,y: _p10.y + _p8._1}));
   });
   var moveX = F2(function (x,_p11) {
      var _p12 = _p11;
      var _p13 = _p12._0;
      return Form_elm_builtin(_U.update(_p13,{x: _p13.x + x}));
   });
   var moveY = F2(function (y,_p14) {
      var _p15 = _p14;
      var _p16 = _p15._0;
      return Form_elm_builtin(_U.update(_p16,{y: _p16.y + y}));
   });
   var scale = F2(function (s,_p17) {
      var _p18 = _p17;
      var _p19 = _p18._0;
      return Form_elm_builtin(_U.update(_p19,
      {scale: _p19.scale * s}));
   });
   var rotate = F2(function (t,_p20) {
      var _p21 = _p20;
      var _p22 = _p21._0;
      return Form_elm_builtin(_U.update(_p22,
      {theta: _p22.theta + t}));
   });
   var alpha = F2(function (a,_p23) {
      var _p24 = _p23;
      return Form_elm_builtin(_U.update(_p24._0,{alpha: a}));
   });
   return _elm.Graphics.Collage.values = {_op: _op
                                         ,collage: collage
                                         ,toForm: toForm
                                         ,filled: filled
                                         ,textured: textured
                                         ,gradient: gradient
                                         ,outlined: outlined
                                         ,traced: traced
                                         ,text: text
                                         ,outlinedText: outlinedText
                                         ,move: move
                                         ,moveX: moveX
                                         ,moveY: moveY
                                         ,scale: scale
                                         ,rotate: rotate
                                         ,alpha: alpha
                                         ,group: group
                                         ,groupTransform: groupTransform
                                         ,rect: rect
                                         ,oval: oval
                                         ,square: square
                                         ,circle: circle
                                         ,ngon: ngon
                                         ,polygon: polygon
                                         ,segment: segment
                                         ,path: path
                                         ,solid: solid
                                         ,dashed: dashed
                                         ,dotted: dotted
                                         ,defaultLine: defaultLine
                                         ,LineStyle: LineStyle
                                         ,Flat: Flat
                                         ,Round: Round
                                         ,Padded: Padded
                                         ,Smooth: Smooth
                                         ,Sharp: Sharp
                                         ,Clipped: Clipped};
};
Elm.Native.Debug = {};
Elm.Native.Debug.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Debug = localRuntime.Native.Debug || {};
	if (localRuntime.Native.Debug.values)
	{
		return localRuntime.Native.Debug.values;
	}

	var toString = Elm.Native.Utils.make(localRuntime).toString;

	function log(tag, value)
	{
		var msg = tag + ': ' + toString(value);
		var process = process || {};
		if (process.stdout)
		{
			process.stdout.write(msg);
		}
		else
		{
			console.log(msg);
		}
		return value;
	}

	function crash(message)
	{
		throw new Error(message);
	}

	function tracePath(tag, form)
	{
		if (localRuntime.debug)
		{
			return localRuntime.debug.trace(tag, form);
		}
		return form;
	}

	function watch(tag, value)
	{
		if (localRuntime.debug)
		{
			localRuntime.debug.watch(tag, value);
		}
		return value;
	}

	function watchSummary(tag, summarize, value)
	{
		if (localRuntime.debug)
		{
			localRuntime.debug.watch(tag, summarize(value));
		}
		return value;
	}

	return localRuntime.Native.Debug.values = {
		crash: crash,
		tracePath: F2(tracePath),
		log: F2(log),
		watch: F2(watch),
		watchSummary: F3(watchSummary)
	};
};

Elm.Debug = Elm.Debug || {};
Elm.Debug.make = function (_elm) {
   "use strict";
   _elm.Debug = _elm.Debug || {};
   if (_elm.Debug.values) return _elm.Debug.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Graphics$Collage = Elm.Graphics.Collage.make(_elm),
   $Native$Debug = Elm.Native.Debug.make(_elm);
   var _op = {};
   var trace = $Native$Debug.tracePath;
   var watchSummary = $Native$Debug.watchSummary;
   var watch = $Native$Debug.watch;
   var crash = $Native$Debug.crash;
   var log = $Native$Debug.log;
   return _elm.Debug.values = {_op: _op
                              ,log: log
                              ,crash: crash
                              ,watch: watch
                              ,watchSummary: watchSummary
                              ,trace: trace};
};
Elm.Result = Elm.Result || {};
Elm.Result.make = function (_elm) {
   "use strict";
   _elm.Result = _elm.Result || {};
   if (_elm.Result.values) return _elm.Result.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Maybe = Elm.Maybe.make(_elm);
   var _op = {};
   var toMaybe = function (result) {
      var _p0 = result;
      if (_p0.ctor === "Ok") {
            return $Maybe.Just(_p0._0);
         } else {
            return $Maybe.Nothing;
         }
   };
   var withDefault = F2(function (def,result) {
      var _p1 = result;
      if (_p1.ctor === "Ok") {
            return _p1._0;
         } else {
            return def;
         }
   });
   var Err = function (a) {    return {ctor: "Err",_0: a};};
   var andThen = F2(function (result,callback) {
      var _p2 = result;
      if (_p2.ctor === "Ok") {
            return callback(_p2._0);
         } else {
            return Err(_p2._0);
         }
   });
   var Ok = function (a) {    return {ctor: "Ok",_0: a};};
   var map = F2(function (func,ra) {
      var _p3 = ra;
      if (_p3.ctor === "Ok") {
            return Ok(func(_p3._0));
         } else {
            return Err(_p3._0);
         }
   });
   var map2 = F3(function (func,ra,rb) {
      var _p4 = {ctor: "_Tuple2",_0: ra,_1: rb};
      if (_p4._0.ctor === "Ok") {
            if (_p4._1.ctor === "Ok") {
                  return Ok(A2(func,_p4._0._0,_p4._1._0));
               } else {
                  return Err(_p4._1._0);
               }
         } else {
            return Err(_p4._0._0);
         }
   });
   var map3 = F4(function (func,ra,rb,rc) {
      var _p5 = {ctor: "_Tuple3",_0: ra,_1: rb,_2: rc};
      if (_p5._0.ctor === "Ok") {
            if (_p5._1.ctor === "Ok") {
                  if (_p5._2.ctor === "Ok") {
                        return Ok(A3(func,_p5._0._0,_p5._1._0,_p5._2._0));
                     } else {
                        return Err(_p5._2._0);
                     }
               } else {
                  return Err(_p5._1._0);
               }
         } else {
            return Err(_p5._0._0);
         }
   });
   var map4 = F5(function (func,ra,rb,rc,rd) {
      var _p6 = {ctor: "_Tuple4",_0: ra,_1: rb,_2: rc,_3: rd};
      if (_p6._0.ctor === "Ok") {
            if (_p6._1.ctor === "Ok") {
                  if (_p6._2.ctor === "Ok") {
                        if (_p6._3.ctor === "Ok") {
                              return Ok(A4(func,_p6._0._0,_p6._1._0,_p6._2._0,_p6._3._0));
                           } else {
                              return Err(_p6._3._0);
                           }
                     } else {
                        return Err(_p6._2._0);
                     }
               } else {
                  return Err(_p6._1._0);
               }
         } else {
            return Err(_p6._0._0);
         }
   });
   var map5 = F6(function (func,ra,rb,rc,rd,re) {
      var _p7 = {ctor: "_Tuple5"
                ,_0: ra
                ,_1: rb
                ,_2: rc
                ,_3: rd
                ,_4: re};
      if (_p7._0.ctor === "Ok") {
            if (_p7._1.ctor === "Ok") {
                  if (_p7._2.ctor === "Ok") {
                        if (_p7._3.ctor === "Ok") {
                              if (_p7._4.ctor === "Ok") {
                                    return Ok(A5(func,
                                    _p7._0._0,
                                    _p7._1._0,
                                    _p7._2._0,
                                    _p7._3._0,
                                    _p7._4._0));
                                 } else {
                                    return Err(_p7._4._0);
                                 }
                           } else {
                              return Err(_p7._3._0);
                           }
                     } else {
                        return Err(_p7._2._0);
                     }
               } else {
                  return Err(_p7._1._0);
               }
         } else {
            return Err(_p7._0._0);
         }
   });
   var formatError = F2(function (f,result) {
      var _p8 = result;
      if (_p8.ctor === "Ok") {
            return Ok(_p8._0);
         } else {
            return Err(f(_p8._0));
         }
   });
   var fromMaybe = F2(function (err,maybe) {
      var _p9 = maybe;
      if (_p9.ctor === "Just") {
            return Ok(_p9._0);
         } else {
            return Err(err);
         }
   });
   return _elm.Result.values = {_op: _op
                               ,withDefault: withDefault
                               ,map: map
                               ,map2: map2
                               ,map3: map3
                               ,map4: map4
                               ,map5: map5
                               ,andThen: andThen
                               ,toMaybe: toMaybe
                               ,fromMaybe: fromMaybe
                               ,formatError: formatError
                               ,Ok: Ok
                               ,Err: Err};
};
Elm.Native.Signal = {};

Elm.Native.Signal.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Signal = localRuntime.Native.Signal || {};
	if (localRuntime.Native.Signal.values)
	{
		return localRuntime.Native.Signal.values;
	}


	var Task = Elm.Native.Task.make(localRuntime);
	var Utils = Elm.Native.Utils.make(localRuntime);


	function broadcastToKids(node, timestamp, update)
	{
		var kids = node.kids;
		for (var i = kids.length; i--; )
		{
			kids[i].notify(timestamp, update, node.id);
		}
	}


	// INPUT

	function input(name, base)
	{
		var node = {
			id: Utils.guid(),
			name: 'input-' + name,
			value: base,
			parents: [],
			kids: []
		};

		node.notify = function(timestamp, targetId, value) {
			var update = targetId === node.id;
			if (update)
			{
				node.value = value;
			}
			broadcastToKids(node, timestamp, update);
			return update;
		};

		localRuntime.inputs.push(node);

		return node;
	}

	function constant(value)
	{
		return input('constant', value);
	}


	// MAILBOX

	function mailbox(base)
	{
		var signal = input('mailbox', base);

		function send(value) {
			return Task.asyncFunction(function(callback) {
				localRuntime.setTimeout(function() {
					localRuntime.notify(signal.id, value);
				}, 0);
				callback(Task.succeed(Utils.Tuple0));
			});
		}

		return {
			signal: signal,
			address: {
				ctor: 'Address',
				_0: send
			}
		};
	}

	function sendMessage(message)
	{
		Task.perform(message._0);
	}


	// OUTPUT

	function output(name, handler, parent)
	{
		var node = {
			id: Utils.guid(),
			name: 'output-' + name,
			parents: [parent],
			isOutput: true
		};

		node.notify = function(timestamp, parentUpdate, parentID)
		{
			if (parentUpdate)
			{
				handler(parent.value);
			}
		};

		parent.kids.push(node);

		return node;
	}


	// MAP

	function mapMany(refreshValue, args)
	{
		var node = {
			id: Utils.guid(),
			name: 'map' + args.length,
			value: refreshValue(),
			parents: args,
			kids: []
		};

		var numberOfParents = args.length;
		var count = 0;
		var update = false;

		node.notify = function(timestamp, parentUpdate, parentID)
		{
			++count;

			update = update || parentUpdate;

			if (count === numberOfParents)
			{
				if (update)
				{
					node.value = refreshValue();
				}
				broadcastToKids(node, timestamp, update);
				update = false;
				count = 0;
			}
		};

		for (var i = numberOfParents; i--; )
		{
			args[i].kids.push(node);
		}

		return node;
	}


	function map(func, a)
	{
		function refreshValue()
		{
			return func(a.value);
		}
		return mapMany(refreshValue, [a]);
	}


	function map2(func, a, b)
	{
		function refreshValue()
		{
			return A2( func, a.value, b.value );
		}
		return mapMany(refreshValue, [a, b]);
	}


	function map3(func, a, b, c)
	{
		function refreshValue()
		{
			return A3( func, a.value, b.value, c.value );
		}
		return mapMany(refreshValue, [a, b, c]);
	}


	function map4(func, a, b, c, d)
	{
		function refreshValue()
		{
			return A4( func, a.value, b.value, c.value, d.value );
		}
		return mapMany(refreshValue, [a, b, c, d]);
	}


	function map5(func, a, b, c, d, e)
	{
		function refreshValue()
		{
			return A5( func, a.value, b.value, c.value, d.value, e.value );
		}
		return mapMany(refreshValue, [a, b, c, d, e]);
	}


	// FOLD

	function foldp(update, state, signal)
	{
		var node = {
			id: Utils.guid(),
			name: 'foldp',
			parents: [signal],
			kids: [],
			value: state
		};

		node.notify = function(timestamp, parentUpdate, parentID)
		{
			if (parentUpdate)
			{
				node.value = A2( update, signal.value, node.value );
			}
			broadcastToKids(node, timestamp, parentUpdate);
		};

		signal.kids.push(node);

		return node;
	}


	// TIME

	function timestamp(signal)
	{
		var node = {
			id: Utils.guid(),
			name: 'timestamp',
			value: Utils.Tuple2(localRuntime.timer.programStart, signal.value),
			parents: [signal],
			kids: []
		};

		node.notify = function(timestamp, parentUpdate, parentID)
		{
			if (parentUpdate)
			{
				node.value = Utils.Tuple2(timestamp, signal.value);
			}
			broadcastToKids(node, timestamp, parentUpdate);
		};

		signal.kids.push(node);

		return node;
	}


	function delay(time, signal)
	{
		var delayed = input('delay-input-' + time, signal.value);

		function handler(value)
		{
			setTimeout(function() {
				localRuntime.notify(delayed.id, value);
			}, time);
		}

		output('delay-output-' + time, handler, signal);

		return delayed;
	}


	// MERGING

	function genericMerge(tieBreaker, leftStream, rightStream)
	{
		var node = {
			id: Utils.guid(),
			name: 'merge',
			value: A2(tieBreaker, leftStream.value, rightStream.value),
			parents: [leftStream, rightStream],
			kids: []
		};

		var left = { touched: false, update: false, value: null };
		var right = { touched: false, update: false, value: null };

		node.notify = function(timestamp, parentUpdate, parentID)
		{
			if (parentID === leftStream.id)
			{
				left.touched = true;
				left.update = parentUpdate;
				left.value = leftStream.value;
			}
			if (parentID === rightStream.id)
			{
				right.touched = true;
				right.update = parentUpdate;
				right.value = rightStream.value;
			}

			if (left.touched && right.touched)
			{
				var update = false;
				if (left.update && right.update)
				{
					node.value = A2(tieBreaker, left.value, right.value);
					update = true;
				}
				else if (left.update)
				{
					node.value = left.value;
					update = true;
				}
				else if (right.update)
				{
					node.value = right.value;
					update = true;
				}
				left.touched = false;
				right.touched = false;

				broadcastToKids(node, timestamp, update);
			}
		};

		leftStream.kids.push(node);
		rightStream.kids.push(node);

		return node;
	}


	// FILTERING

	function filterMap(toMaybe, base, signal)
	{
		var maybe = toMaybe(signal.value);
		var node = {
			id: Utils.guid(),
			name: 'filterMap',
			value: maybe.ctor === 'Nothing' ? base : maybe._0,
			parents: [signal],
			kids: []
		};

		node.notify = function(timestamp, parentUpdate, parentID)
		{
			var update = false;
			if (parentUpdate)
			{
				var maybe = toMaybe(signal.value);
				if (maybe.ctor === 'Just')
				{
					update = true;
					node.value = maybe._0;
				}
			}
			broadcastToKids(node, timestamp, update);
		};

		signal.kids.push(node);

		return node;
	}


	// SAMPLING

	function sampleOn(ticker, signal)
	{
		var node = {
			id: Utils.guid(),
			name: 'sampleOn',
			value: signal.value,
			parents: [ticker, signal],
			kids: []
		};

		var signalTouch = false;
		var tickerTouch = false;
		var tickerUpdate = false;

		node.notify = function(timestamp, parentUpdate, parentID)
		{
			if (parentID === ticker.id)
			{
				tickerTouch = true;
				tickerUpdate = parentUpdate;
			}
			if (parentID === signal.id)
			{
				signalTouch = true;
			}

			if (tickerTouch && signalTouch)
			{
				if (tickerUpdate)
				{
					node.value = signal.value;
				}
				tickerTouch = false;
				signalTouch = false;

				broadcastToKids(node, timestamp, tickerUpdate);
			}
		};

		ticker.kids.push(node);
		signal.kids.push(node);

		return node;
	}


	// DROP REPEATS

	function dropRepeats(signal)
	{
		var node = {
			id: Utils.guid(),
			name: 'dropRepeats',
			value: signal.value,
			parents: [signal],
			kids: []
		};

		node.notify = function(timestamp, parentUpdate, parentID)
		{
			var update = false;
			if (parentUpdate && !Utils.eq(node.value, signal.value))
			{
				node.value = signal.value;
				update = true;
			}
			broadcastToKids(node, timestamp, update);
		};

		signal.kids.push(node);

		return node;
	}


	return localRuntime.Native.Signal.values = {
		input: input,
		constant: constant,
		mailbox: mailbox,
		sendMessage: sendMessage,
		output: output,
		map: F2(map),
		map2: F3(map2),
		map3: F4(map3),
		map4: F5(map4),
		map5: F6(map5),
		foldp: F3(foldp),
		genericMerge: F3(genericMerge),
		filterMap: F3(filterMap),
		sampleOn: F2(sampleOn),
		dropRepeats: dropRepeats,
		timestamp: timestamp,
		delay: F2(delay)
	};
};

Elm.Native.Task = {};

Elm.Native.Task.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Task = localRuntime.Native.Task || {};
	if (localRuntime.Native.Task.values)
	{
		return localRuntime.Native.Task.values;
	}

	var Result = Elm.Result.make(localRuntime);
	var Signal;
	var Utils = Elm.Native.Utils.make(localRuntime);


	// CONSTRUCTORS

	function succeed(value)
	{
		return {
			tag: 'Succeed',
			value: value
		};
	}

	function fail(error)
	{
		return {
			tag: 'Fail',
			value: error
		};
	}

	function asyncFunction(func)
	{
		return {
			tag: 'Async',
			asyncFunction: func
		};
	}

	function andThen(task, callback)
	{
		return {
			tag: 'AndThen',
			task: task,
			callback: callback
		};
	}

	function catch_(task, callback)
	{
		return {
			tag: 'Catch',
			task: task,
			callback: callback
		};
	}


	// RUNNER

	function perform(task) {
		runTask({ task: task }, function() {});
	}

	function performSignal(name, signal)
	{
		var workQueue = [];

		function onComplete()
		{
			workQueue.shift();

			if (workQueue.length > 0)
			{
				var task = workQueue[0];

				setTimeout(function() {
					runTask(task, onComplete);
				}, 0);
			}
		}

		function register(task)
		{
			var root = { task: task };
			workQueue.push(root);
			if (workQueue.length === 1)
			{
				runTask(root, onComplete);
			}
		}

		if (!Signal)
		{
			Signal = Elm.Native.Signal.make(localRuntime);
		}
		Signal.output('perform-tasks-' + name, register, signal);

		register(signal.value);

		return signal;
	}

	function mark(status, task)
	{
		return { status: status, task: task };
	}

	function runTask(root, onComplete)
	{
		var result = mark('runnable', root.task);
		while (result.status === 'runnable')
		{
			result = stepTask(onComplete, root, result.task);
		}

		if (result.status === 'done')
		{
			root.task = result.task;
			onComplete();
		}

		if (result.status === 'blocked')
		{
			root.task = result.task;
		}
	}

	function stepTask(onComplete, root, task)
	{
		var tag = task.tag;

		if (tag === 'Succeed' || tag === 'Fail')
		{
			return mark('done', task);
		}

		if (tag === 'Async')
		{
			var placeHolder = {};
			var couldBeSync = true;
			var wasSync = false;

			task.asyncFunction(function(result) {
				placeHolder.tag = result.tag;
				placeHolder.value = result.value;
				if (couldBeSync)
				{
					wasSync = true;
				}
				else
				{
					runTask(root, onComplete);
				}
			});
			couldBeSync = false;
			return mark(wasSync ? 'done' : 'blocked', placeHolder);
		}

		if (tag === 'AndThen' || tag === 'Catch')
		{
			var result = mark('runnable', task.task);
			while (result.status === 'runnable')
			{
				result = stepTask(onComplete, root, result.task);
			}

			if (result.status === 'done')
			{
				var activeTask = result.task;
				var activeTag = activeTask.tag;

				var succeedChain = activeTag === 'Succeed' && tag === 'AndThen';
				var failChain = activeTag === 'Fail' && tag === 'Catch';

				return (succeedChain || failChain)
					? mark('runnable', task.callback(activeTask.value))
					: mark('runnable', activeTask);
			}
			if (result.status === 'blocked')
			{
				return mark('blocked', {
					tag: tag,
					task: result.task,
					callback: task.callback
				});
			}
		}
	}


	// THREADS

	function sleep(time) {
		return asyncFunction(function(callback) {
			setTimeout(function() {
				callback(succeed(Utils.Tuple0));
			}, time);
		});
	}

	function spawn(task) {
		return asyncFunction(function(callback) {
			var id = setTimeout(function() {
				perform(task);
			}, 0);
			callback(succeed(id));
		});
	}


	return localRuntime.Native.Task.values = {
		succeed: succeed,
		fail: fail,
		asyncFunction: asyncFunction,
		andThen: F2(andThen),
		catch_: F2(catch_),
		perform: perform,
		performSignal: performSignal,
		spawn: spawn,
		sleep: sleep
	};
};

Elm.Task = Elm.Task || {};
Elm.Task.make = function (_elm) {
   "use strict";
   _elm.Task = _elm.Task || {};
   if (_elm.Task.values) return _elm.Task.values;
   var _U = Elm.Native.Utils.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Task = Elm.Native.Task.make(_elm),
   $Result = Elm.Result.make(_elm);
   var _op = {};
   var sleep = $Native$Task.sleep;
   var spawn = $Native$Task.spawn;
   var ThreadID = function (a) {
      return {ctor: "ThreadID",_0: a};
   };
   var onError = $Native$Task.catch_;
   var andThen = $Native$Task.andThen;
   var fail = $Native$Task.fail;
   var mapError = F2(function (f,task) {
      return A2(onError,
      task,
      function (err) {
         return fail(f(err));
      });
   });
   var succeed = $Native$Task.succeed;
   var map = F2(function (func,taskA) {
      return A2(andThen,
      taskA,
      function (a) {
         return succeed(func(a));
      });
   });
   var map2 = F3(function (func,taskA,taskB) {
      return A2(andThen,
      taskA,
      function (a) {
         return A2(andThen,
         taskB,
         function (b) {
            return succeed(A2(func,a,b));
         });
      });
   });
   var map3 = F4(function (func,taskA,taskB,taskC) {
      return A2(andThen,
      taskA,
      function (a) {
         return A2(andThen,
         taskB,
         function (b) {
            return A2(andThen,
            taskC,
            function (c) {
               return succeed(A3(func,a,b,c));
            });
         });
      });
   });
   var map4 = F5(function (func,taskA,taskB,taskC,taskD) {
      return A2(andThen,
      taskA,
      function (a) {
         return A2(andThen,
         taskB,
         function (b) {
            return A2(andThen,
            taskC,
            function (c) {
               return A2(andThen,
               taskD,
               function (d) {
                  return succeed(A4(func,a,b,c,d));
               });
            });
         });
      });
   });
   var map5 = F6(function (func,taskA,taskB,taskC,taskD,taskE) {
      return A2(andThen,
      taskA,
      function (a) {
         return A2(andThen,
         taskB,
         function (b) {
            return A2(andThen,
            taskC,
            function (c) {
               return A2(andThen,
               taskD,
               function (d) {
                  return A2(andThen,
                  taskE,
                  function (e) {
                     return succeed(A5(func,a,b,c,d,e));
                  });
               });
            });
         });
      });
   });
   var andMap = F2(function (taskFunc,taskValue) {
      return A2(andThen,
      taskFunc,
      function (func) {
         return A2(andThen,
         taskValue,
         function (value) {
            return succeed(func(value));
         });
      });
   });
   var sequence = function (tasks) {
      var _p0 = tasks;
      if (_p0.ctor === "[]") {
            return succeed(_U.list([]));
         } else {
            return A3(map2,
            F2(function (x,y) {    return A2($List._op["::"],x,y);}),
            _p0._0,
            sequence(_p0._1));
         }
   };
   var toMaybe = function (task) {
      return A2(onError,
      A2(map,$Maybe.Just,task),
      function (_p1) {
         return succeed($Maybe.Nothing);
      });
   };
   var fromMaybe = F2(function ($default,maybe) {
      var _p2 = maybe;
      if (_p2.ctor === "Just") {
            return succeed(_p2._0);
         } else {
            return fail($default);
         }
   });
   var toResult = function (task) {
      return A2(onError,
      A2(map,$Result.Ok,task),
      function (msg) {
         return succeed($Result.Err(msg));
      });
   };
   var fromResult = function (result) {
      var _p3 = result;
      if (_p3.ctor === "Ok") {
            return succeed(_p3._0);
         } else {
            return fail(_p3._0);
         }
   };
   var Task = {ctor: "Task"};
   return _elm.Task.values = {_op: _op
                             ,succeed: succeed
                             ,fail: fail
                             ,map: map
                             ,map2: map2
                             ,map3: map3
                             ,map4: map4
                             ,map5: map5
                             ,andMap: andMap
                             ,sequence: sequence
                             ,andThen: andThen
                             ,onError: onError
                             ,mapError: mapError
                             ,toMaybe: toMaybe
                             ,fromMaybe: fromMaybe
                             ,toResult: toResult
                             ,fromResult: fromResult
                             ,spawn: spawn
                             ,sleep: sleep};
};
Elm.Signal = Elm.Signal || {};
Elm.Signal.make = function (_elm) {
   "use strict";
   _elm.Signal = _elm.Signal || {};
   if (_elm.Signal.values) return _elm.Signal.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Signal = Elm.Native.Signal.make(_elm),
   $Task = Elm.Task.make(_elm);
   var _op = {};
   var send = F2(function (_p0,value) {
      var _p1 = _p0;
      return A2($Task.onError,
      _p1._0(value),
      function (_p2) {
         return $Task.succeed({ctor: "_Tuple0"});
      });
   });
   var Message = function (a) {
      return {ctor: "Message",_0: a};
   };
   var message = F2(function (_p3,value) {
      var _p4 = _p3;
      return Message(_p4._0(value));
   });
   var mailbox = $Native$Signal.mailbox;
   var Address = function (a) {
      return {ctor: "Address",_0: a};
   };
   var forwardTo = F2(function (_p5,f) {
      var _p6 = _p5;
      return Address(function (x) {    return _p6._0(f(x));});
   });
   var Mailbox = F2(function (a,b) {
      return {address: a,signal: b};
   });
   var sampleOn = $Native$Signal.sampleOn;
   var dropRepeats = $Native$Signal.dropRepeats;
   var filterMap = $Native$Signal.filterMap;
   var filter = F3(function (isOk,base,signal) {
      return A3(filterMap,
      function (value) {
         return isOk(value) ? $Maybe.Just(value) : $Maybe.Nothing;
      },
      base,
      signal);
   });
   var merge = F2(function (left,right) {
      return A3($Native$Signal.genericMerge,
      $Basics.always,
      left,
      right);
   });
   var mergeMany = function (signalList) {
      var _p7 = $List.reverse(signalList);
      if (_p7.ctor === "[]") {
            return _U.crashCase("Signal",
            {start: {line: 184,column: 3},end: {line: 189,column: 40}},
            _p7)("mergeMany was given an empty list!");
         } else {
            return A3($List.foldl,merge,_p7._0,_p7._1);
         }
   };
   var foldp = $Native$Signal.foldp;
   var map5 = $Native$Signal.map5;
   var map4 = $Native$Signal.map4;
   var map3 = $Native$Signal.map3;
   var map2 = $Native$Signal.map2;
   var map = $Native$Signal.map;
   var constant = $Native$Signal.constant;
   var Signal = {ctor: "Signal"};
   return _elm.Signal.values = {_op: _op
                               ,merge: merge
                               ,mergeMany: mergeMany
                               ,map: map
                               ,map2: map2
                               ,map3: map3
                               ,map4: map4
                               ,map5: map5
                               ,constant: constant
                               ,dropRepeats: dropRepeats
                               ,filter: filter
                               ,filterMap: filterMap
                               ,sampleOn: sampleOn
                               ,foldp: foldp
                               ,mailbox: mailbox
                               ,send: send
                               ,message: message
                               ,forwardTo: forwardTo
                               ,Mailbox: Mailbox};
};
Elm.Native.Lazy = {};
Elm.Native.Lazy.make = function(localRuntime) {

    localRuntime.Native = localRuntime.Native || {};
    localRuntime.Native.Lazy = localRuntime.Native.Lazy || {};
    if (localRuntime.Native.Lazy.values) {
        return localRuntime.Native.Lazy.values;
    }

    function memoize(thunk) {
        var value;
        var isForced = false;
        return function(tuple0) {
            if (!isForced) {
                value = thunk(tuple0);
                isForced = true;
            }
            return value;
        };
    }

    return localRuntime.Native.Lazy.values = {
        memoize: memoize
    };
};

Elm.Lazy = Elm.Lazy || {};
Elm.Lazy.make = function (_elm) {
   "use strict";
   _elm.Lazy = _elm.Lazy || {};
   if (_elm.Lazy.values) return _elm.Lazy.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Lazy = Elm.Native.Lazy.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   var force = function (_p0) {
      var _p1 = _p0;
      return _p1._0({ctor: "_Tuple0"});
   };
   var Lazy = function (a) {    return {ctor: "Lazy",_0: a};};
   var lazy = function (thunk) {
      return Lazy($Native$Lazy.memoize(thunk));
   };
   var map = F2(function (f,a) {
      return lazy(function (_p2) {
         var _p3 = _p2;
         return f(force(a));
      });
   });
   var map2 = F3(function (f,a,b) {
      return lazy(function (_p4) {
         var _p5 = _p4;
         return A2(f,force(a),force(b));
      });
   });
   var map3 = F4(function (f,a,b,c) {
      return lazy(function (_p6) {
         var _p7 = _p6;
         return A3(f,force(a),force(b),force(c));
      });
   });
   var map4 = F5(function (f,a,b,c,d) {
      return lazy(function (_p8) {
         var _p9 = _p8;
         return A4(f,force(a),force(b),force(c),force(d));
      });
   });
   var map5 = F6(function (f,a,b,c,d,e) {
      return lazy(function (_p10) {
         var _p11 = _p10;
         return A5(f,force(a),force(b),force(c),force(d),force(e));
      });
   });
   var apply = F2(function (f,x) {
      return lazy(function (_p12) {
         var _p13 = _p12;
         return A2(force,f,force(x));
      });
   });
   var andThen = F2(function (a,callback) {
      return lazy(function (_p14) {
         var _p15 = _p14;
         return force(callback(force(a)));
      });
   });
   return _elm.Lazy.values = {_op: _op
                             ,force: force
                             ,lazy: lazy
                             ,map: map
                             ,map2: map2
                             ,map3: map3
                             ,map4: map4
                             ,map5: map5
                             ,apply: apply
                             ,andThen: andThen};
};
Elm.Native.String = {};

Elm.Native.String.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.String = localRuntime.Native.String || {};
	if (localRuntime.Native.String.values)
	{
		return localRuntime.Native.String.values;
	}
	if ('values' in Elm.Native.String)
	{
		return localRuntime.Native.String.values = Elm.Native.String.values;
	}


	var Char = Elm.Char.make(localRuntime);
	var List = Elm.Native.List.make(localRuntime);
	var Maybe = Elm.Maybe.make(localRuntime);
	var Result = Elm.Result.make(localRuntime);
	var Utils = Elm.Native.Utils.make(localRuntime);

	function isEmpty(str)
	{
		return str.length === 0;
	}
	function cons(chr, str)
	{
		return chr + str;
	}
	function uncons(str)
	{
		var hd = str[0];
		if (hd)
		{
			return Maybe.Just(Utils.Tuple2(Utils.chr(hd), str.slice(1)));
		}
		return Maybe.Nothing;
	}
	function append(a, b)
	{
		return a + b;
	}
	function concat(strs)
	{
		return List.toArray(strs).join('');
	}
	function length(str)
	{
		return str.length;
	}
	function map(f, str)
	{
		var out = str.split('');
		for (var i = out.length; i--; )
		{
			out[i] = f(Utils.chr(out[i]));
		}
		return out.join('');
	}
	function filter(pred, str)
	{
		return str.split('').map(Utils.chr).filter(pred).join('');
	}
	function reverse(str)
	{
		return str.split('').reverse().join('');
	}
	function foldl(f, b, str)
	{
		var len = str.length;
		for (var i = 0; i < len; ++i)
		{
			b = A2(f, Utils.chr(str[i]), b);
		}
		return b;
	}
	function foldr(f, b, str)
	{
		for (var i = str.length; i--; )
		{
			b = A2(f, Utils.chr(str[i]), b);
		}
		return b;
	}
	function split(sep, str)
	{
		return List.fromArray(str.split(sep));
	}
	function join(sep, strs)
	{
		return List.toArray(strs).join(sep);
	}
	function repeat(n, str)
	{
		var result = '';
		while (n > 0)
		{
			if (n & 1)
			{
				result += str;
			}
			n >>= 1, str += str;
		}
		return result;
	}
	function slice(start, end, str)
	{
		return str.slice(start, end);
	}
	function left(n, str)
	{
		return n < 1 ? '' : str.slice(0, n);
	}
	function right(n, str)
	{
		return n < 1 ? '' : str.slice(-n);
	}
	function dropLeft(n, str)
	{
		return n < 1 ? str : str.slice(n);
	}
	function dropRight(n, str)
	{
		return n < 1 ? str : str.slice(0, -n);
	}
	function pad(n, chr, str)
	{
		var half = (n - str.length) / 2;
		return repeat(Math.ceil(half), chr) + str + repeat(half | 0, chr);
	}
	function padRight(n, chr, str)
	{
		return str + repeat(n - str.length, chr);
	}
	function padLeft(n, chr, str)
	{
		return repeat(n - str.length, chr) + str;
	}

	function trim(str)
	{
		return str.trim();
	}
	function trimLeft(str)
	{
		return str.replace(/^\s+/, '');
	}
	function trimRight(str)
	{
		return str.replace(/\s+$/, '');
	}

	function words(str)
	{
		return List.fromArray(str.trim().split(/\s+/g));
	}
	function lines(str)
	{
		return List.fromArray(str.split(/\r\n|\r|\n/g));
	}

	function toUpper(str)
	{
		return str.toUpperCase();
	}
	function toLower(str)
	{
		return str.toLowerCase();
	}

	function any(pred, str)
	{
		for (var i = str.length; i--; )
		{
			if (pred(Utils.chr(str[i])))
			{
				return true;
			}
		}
		return false;
	}
	function all(pred, str)
	{
		for (var i = str.length; i--; )
		{
			if (!pred(Utils.chr(str[i])))
			{
				return false;
			}
		}
		return true;
	}

	function contains(sub, str)
	{
		return str.indexOf(sub) > -1;
	}
	function startsWith(sub, str)
	{
		return str.indexOf(sub) === 0;
	}
	function endsWith(sub, str)
	{
		return str.length >= sub.length &&
			str.lastIndexOf(sub) === str.length - sub.length;
	}
	function indexes(sub, str)
	{
		var subLen = sub.length;
		var i = 0;
		var is = [];
		while ((i = str.indexOf(sub, i)) > -1)
		{
			is.push(i);
			i = i + subLen;
		}
		return List.fromArray(is);
	}

	function toInt(s)
	{
		var len = s.length;
		if (len === 0)
		{
			return Result.Err("could not convert string '" + s + "' to an Int" );
		}
		var start = 0;
		if (s[0] === '-')
		{
			if (len === 1)
			{
				return Result.Err("could not convert string '" + s + "' to an Int" );
			}
			start = 1;
		}
		for (var i = start; i < len; ++i)
		{
			if (!Char.isDigit(s[i]))
			{
				return Result.Err("could not convert string '" + s + "' to an Int" );
			}
		}
		return Result.Ok(parseInt(s, 10));
	}

	function toFloat(s)
	{
		var len = s.length;
		if (len === 0)
		{
			return Result.Err("could not convert string '" + s + "' to a Float" );
		}
		var start = 0;
		if (s[0] === '-')
		{
			if (len === 1)
			{
				return Result.Err("could not convert string '" + s + "' to a Float" );
			}
			start = 1;
		}
		var dotCount = 0;
		for (var i = start; i < len; ++i)
		{
			if (Char.isDigit(s[i]))
			{
				continue;
			}
			if (s[i] === '.')
			{
				dotCount += 1;
				if (dotCount <= 1)
				{
					continue;
				}
			}
			return Result.Err("could not convert string '" + s + "' to a Float" );
		}
		return Result.Ok(parseFloat(s));
	}

	function toList(str)
	{
		return List.fromArray(str.split('').map(Utils.chr));
	}
	function fromList(chars)
	{
		return List.toArray(chars).join('');
	}

	return Elm.Native.String.values = {
		isEmpty: isEmpty,
		cons: F2(cons),
		uncons: uncons,
		append: F2(append),
		concat: concat,
		length: length,
		map: F2(map),
		filter: F2(filter),
		reverse: reverse,
		foldl: F3(foldl),
		foldr: F3(foldr),

		split: F2(split),
		join: F2(join),
		repeat: F2(repeat),

		slice: F3(slice),
		left: F2(left),
		right: F2(right),
		dropLeft: F2(dropLeft),
		dropRight: F2(dropRight),

		pad: F3(pad),
		padLeft: F3(padLeft),
		padRight: F3(padRight),

		trim: trim,
		trimLeft: trimLeft,
		trimRight: trimRight,

		words: words,
		lines: lines,

		toUpper: toUpper,
		toLower: toLower,

		any: F2(any),
		all: F2(all),

		contains: F2(contains),
		startsWith: F2(startsWith),
		endsWith: F2(endsWith),
		indexes: F2(indexes),

		toInt: toInt,
		toFloat: toFloat,
		toList: toList,
		fromList: fromList
	};
};

Elm.Native.Char = {};
Elm.Native.Char.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Char = localRuntime.Native.Char || {};
	if (localRuntime.Native.Char.values)
	{
		return localRuntime.Native.Char.values;
	}

	var Utils = Elm.Native.Utils.make(localRuntime);

	return localRuntime.Native.Char.values = {
		fromCode: function(c) { return Utils.chr(String.fromCharCode(c)); },
		toCode: function(c) { return c.charCodeAt(0); },
		toUpper: function(c) { return Utils.chr(c.toUpperCase()); },
		toLower: function(c) { return Utils.chr(c.toLowerCase()); },
		toLocaleUpper: function(c) { return Utils.chr(c.toLocaleUpperCase()); },
		toLocaleLower: function(c) { return Utils.chr(c.toLocaleLowerCase()); }
	};
};

Elm.Char = Elm.Char || {};
Elm.Char.make = function (_elm) {
   "use strict";
   _elm.Char = _elm.Char || {};
   if (_elm.Char.values) return _elm.Char.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Native$Char = Elm.Native.Char.make(_elm);
   var _op = {};
   var fromCode = $Native$Char.fromCode;
   var toCode = $Native$Char.toCode;
   var toLocaleLower = $Native$Char.toLocaleLower;
   var toLocaleUpper = $Native$Char.toLocaleUpper;
   var toLower = $Native$Char.toLower;
   var toUpper = $Native$Char.toUpper;
   var isBetween = F3(function (low,high,$char) {
      var code = toCode($char);
      return _U.cmp(code,toCode(low)) > -1 && _U.cmp(code,
      toCode(high)) < 1;
   });
   var isUpper = A2(isBetween,_U.chr("A"),_U.chr("Z"));
   var isLower = A2(isBetween,_U.chr("a"),_U.chr("z"));
   var isDigit = A2(isBetween,_U.chr("0"),_U.chr("9"));
   var isOctDigit = A2(isBetween,_U.chr("0"),_U.chr("7"));
   var isHexDigit = function ($char) {
      return isDigit($char) || (A3(isBetween,
      _U.chr("a"),
      _U.chr("f"),
      $char) || A3(isBetween,_U.chr("A"),_U.chr("F"),$char));
   };
   return _elm.Char.values = {_op: _op
                             ,isUpper: isUpper
                             ,isLower: isLower
                             ,isDigit: isDigit
                             ,isOctDigit: isOctDigit
                             ,isHexDigit: isHexDigit
                             ,toUpper: toUpper
                             ,toLower: toLower
                             ,toLocaleUpper: toLocaleUpper
                             ,toLocaleLower: toLocaleLower
                             ,toCode: toCode
                             ,fromCode: fromCode};
};
Elm.String = Elm.String || {};
Elm.String.make = function (_elm) {
   "use strict";
   _elm.String = _elm.String || {};
   if (_elm.String.values) return _elm.String.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$String = Elm.Native.String.make(_elm),
   $Result = Elm.Result.make(_elm);
   var _op = {};
   var fromList = $Native$String.fromList;
   var toList = $Native$String.toList;
   var toFloat = $Native$String.toFloat;
   var toInt = $Native$String.toInt;
   var indices = $Native$String.indexes;
   var indexes = $Native$String.indexes;
   var endsWith = $Native$String.endsWith;
   var startsWith = $Native$String.startsWith;
   var contains = $Native$String.contains;
   var all = $Native$String.all;
   var any = $Native$String.any;
   var toLower = $Native$String.toLower;
   var toUpper = $Native$String.toUpper;
   var lines = $Native$String.lines;
   var words = $Native$String.words;
   var trimRight = $Native$String.trimRight;
   var trimLeft = $Native$String.trimLeft;
   var trim = $Native$String.trim;
   var padRight = $Native$String.padRight;
   var padLeft = $Native$String.padLeft;
   var pad = $Native$String.pad;
   var dropRight = $Native$String.dropRight;
   var dropLeft = $Native$String.dropLeft;
   var right = $Native$String.right;
   var left = $Native$String.left;
   var slice = $Native$String.slice;
   var repeat = $Native$String.repeat;
   var join = $Native$String.join;
   var split = $Native$String.split;
   var foldr = $Native$String.foldr;
   var foldl = $Native$String.foldl;
   var reverse = $Native$String.reverse;
   var filter = $Native$String.filter;
   var map = $Native$String.map;
   var length = $Native$String.length;
   var concat = $Native$String.concat;
   var append = $Native$String.append;
   var uncons = $Native$String.uncons;
   var cons = $Native$String.cons;
   var fromChar = function ($char) {    return A2(cons,$char,"");};
   var isEmpty = $Native$String.isEmpty;
   return _elm.String.values = {_op: _op
                               ,isEmpty: isEmpty
                               ,length: length
                               ,reverse: reverse
                               ,repeat: repeat
                               ,cons: cons
                               ,uncons: uncons
                               ,fromChar: fromChar
                               ,append: append
                               ,concat: concat
                               ,split: split
                               ,join: join
                               ,words: words
                               ,lines: lines
                               ,slice: slice
                               ,left: left
                               ,right: right
                               ,dropLeft: dropLeft
                               ,dropRight: dropRight
                               ,contains: contains
                               ,startsWith: startsWith
                               ,endsWith: endsWith
                               ,indexes: indexes
                               ,indices: indices
                               ,toInt: toInt
                               ,toFloat: toFloat
                               ,toList: toList
                               ,fromList: fromList
                               ,toUpper: toUpper
                               ,toLower: toLower
                               ,pad: pad
                               ,padLeft: padLeft
                               ,padRight: padRight
                               ,trim: trim
                               ,trimLeft: trimLeft
                               ,trimRight: trimRight
                               ,map: map
                               ,filter: filter
                               ,foldl: foldl
                               ,foldr: foldr
                               ,any: any
                               ,all: all};
};
Elm.Native.Regex = {};
Elm.Native.Regex.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Regex = localRuntime.Native.Regex || {};
	if (localRuntime.Native.Regex.values)
	{
		return localRuntime.Native.Regex.values;
	}
	if ('values' in Elm.Native.Regex)
	{
		return localRuntime.Native.Regex.values = Elm.Native.Regex.values;
	}

	var List = Elm.Native.List.make(localRuntime);
	var Maybe = Elm.Maybe.make(localRuntime);

	function escape(str)
	{
		return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	}
	function caseInsensitive(re)
	{
		return new RegExp(re.source, 'gi');
	}
	function regex(raw)
	{
		return new RegExp(raw, 'g');
	}

	function contains(re, string)
	{
		return string.match(re) !== null;
	}

	function find(n, re, str)
	{
		n = n.ctor === 'All' ? Infinity : n._0;
		var out = [];
		var number = 0;
		var string = str;
		var lastIndex = re.lastIndex;
		var prevLastIndex = -1;
		var result;
		while (number++ < n && (result = re.exec(string)))
		{
			if (prevLastIndex === re.lastIndex) break;
			var i = result.length - 1;
			var subs = new Array(i);
			while (i > 0)
			{
				var submatch = result[i];
				subs[--i] = submatch === undefined
					? Maybe.Nothing
					: Maybe.Just(submatch);
			}
			out.push({
				match: result[0],
				submatches: List.fromArray(subs),
				index: result.index,
				number: number
			});
			prevLastIndex = re.lastIndex;
		}
		re.lastIndex = lastIndex;
		return List.fromArray(out);
	}

	function replace(n, re, replacer, string)
	{
		n = n.ctor === 'All' ? Infinity : n._0;
		var count = 0;
		function jsReplacer(match)
		{
			if (count++ >= n)
			{
				return match;
			}
			var i = arguments.length - 3;
			var submatches = new Array(i);
			while (i > 0)
			{
				var submatch = arguments[i];
				submatches[--i] = submatch === undefined
					? Maybe.Nothing
					: Maybe.Just(submatch);
			}
			return replacer({
				match: match,
				submatches: List.fromArray(submatches),
				index: arguments[i - 1],
				number: count
			});
		}
		return string.replace(re, jsReplacer);
	}

	function split(n, re, str)
	{
		n = n.ctor === 'All' ? Infinity : n._0;
		if (n === Infinity)
		{
			return List.fromArray(str.split(re));
		}
		var string = str;
		var result;
		var out = [];
		var start = re.lastIndex;
		while (n--)
		{
			if (!(result = re.exec(string))) break;
			out.push(string.slice(start, result.index));
			start = re.lastIndex;
		}
		out.push(string.slice(start));
		return List.fromArray(out);
	}

	return Elm.Native.Regex.values = {
		regex: regex,
		caseInsensitive: caseInsensitive,
		escape: escape,

		contains: F2(contains),
		find: F3(find),
		replace: F4(replace),
		split: F3(split)
	};
};

Elm.Regex = Elm.Regex || {};
Elm.Regex.make = function (_elm) {
   "use strict";
   _elm.Regex = _elm.Regex || {};
   if (_elm.Regex.values) return _elm.Regex.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Regex = Elm.Native.Regex.make(_elm);
   var _op = {};
   var split = $Native$Regex.split;
   var replace = $Native$Regex.replace;
   var find = $Native$Regex.find;
   var AtMost = function (a) {    return {ctor: "AtMost",_0: a};};
   var All = {ctor: "All"};
   var Match = F4(function (a,b,c,d) {
      return {match: a,submatches: b,index: c,number: d};
   });
   var contains = $Native$Regex.contains;
   var caseInsensitive = $Native$Regex.caseInsensitive;
   var regex = $Native$Regex.regex;
   var escape = $Native$Regex.escape;
   var Regex = {ctor: "Regex"};
   return _elm.Regex.values = {_op: _op
                              ,regex: regex
                              ,escape: escape
                              ,caseInsensitive: caseInsensitive
                              ,contains: contains
                              ,find: find
                              ,replace: replace
                              ,split: split
                              ,Match: Match
                              ,All: All
                              ,AtMost: AtMost};
};
Elm.Combine = Elm.Combine || {};
Elm.Combine.make = function (_elm) {
   "use strict";
   _elm.Combine = _elm.Combine || {};
   if (_elm.Combine.values) return _elm.Combine.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Lazy = Elm.Lazy.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Regex = Elm.Regex.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $String = Elm.String.make(_elm);
   var _op = {};
   var app = function (p) {
      var _p0 = p;
      if (_p0.ctor === "Parser") {
            return _p0._0;
         } else {
            return $Lazy.force(_p0._0);
         }
   };
   var parse = F2(function (p,input) {
      return A2(app,p,{input: input,position: 0});
   });
   var RecursiveParser = function (a) {
      return {ctor: "RecursiveParser",_0: a};
   };
   var rec = function (t) {
      return RecursiveParser($Lazy.lazy(function (_p1) {
         var _p2 = _p1;
         return app(t({ctor: "_Tuple0"}));
      }));
   };
   var Parser = function (a) {    return {ctor: "Parser",_0: a};};
   var primitive = Parser;
   var bimap = F3(function (fok,ferr,p) {
      return Parser(function (cx) {
         var _p3 = A2(app,p,cx);
         if (_p3._0.ctor === "Ok") {
               return {ctor: "_Tuple2"
                      ,_0: $Result.Ok(fok(_p3._0._0))
                      ,_1: _p3._1};
            } else {
               return {ctor: "_Tuple2"
                      ,_0: $Result.Err(ferr(_p3._0._0))
                      ,_1: _p3._1};
            }
      });
   });
   var map = F2(function (f,p) {
      return A3(bimap,f,$Basics.identity,p);
   });
   var mapError = bimap($Basics.identity);
   var andThen = F2(function (p,f) {
      return Parser(function (cx) {
         var _p4 = A2(app,p,cx);
         if (_p4._0.ctor === "Ok") {
               return A2(app,f(_p4._0._0),_p4._1);
            } else {
               return {ctor: "_Tuple2"
                      ,_0: $Result.Err(_p4._0._0)
                      ,_1: _p4._1};
            }
      });
   });
   var sequence = function (ps) {
      var accumulate = F3(function (acc,ps,cx) {
         accumulate: while (true) {
            var _p5 = ps;
            if (_p5.ctor === "[]") {
                  return {ctor: "_Tuple2"
                         ,_0: $Result.Ok($List.reverse(acc))
                         ,_1: cx};
               } else {
                  var _p6 = A2(app,_p5._0,cx);
                  if (_p6._0.ctor === "Ok") {
                        var _v6 = A2($List._op["::"],_p6._0._0,acc),
                        _v7 = _p5._1,
                        _v8 = _p6._1;
                        acc = _v6;
                        ps = _v7;
                        cx = _v8;
                        continue accumulate;
                     } else {
                        return {ctor: "_Tuple2"
                               ,_0: $Result.Err(_p6._0._0)
                               ,_1: _p6._1};
                     }
               }
         }
      });
      return Parser(function (cx) {
         return A3(accumulate,_U.list([]),ps,cx);
      });
   };
   var fail = function (ms) {
      return Parser(function (cx) {
         return {ctor: "_Tuple2",_0: $Result.Err(ms),_1: cx};
      });
   };
   var succeed = function (r) {
      return Parser(function (cx) {
         return {ctor: "_Tuple2",_0: $Result.Ok(r),_1: cx};
      });
   };
   var andMap = F2(function (lp,rp) {
      return A2(andThen,
      lp,
      function (f) {
         return A2(andThen,
         rp,
         function (x) {
            return succeed(f(x));
         });
      });
   });
   var between = F3(function (lp,rp,p) {
      return A2(andMap,
      A2(andMap,
      A2(map,
      $Basics.flip(function (_p7) {
         return $Basics.always($Basics.always(_p7));
      }),
      lp),
      p),
      rp);
   });
   var skip = function (p) {
      return A2(andThen,
      p,
      $Basics.always(succeed({ctor: "_Tuple0"})));
   };
   var count = F2(function (n,p) {
      var accumulate = F2(function (x,acc) {
         return _U.cmp(x,
         0) < 1 ? succeed($List.reverse(acc)) : A2(andThen,
         p,
         function (res) {
            return A2(accumulate,x - 1,A2($List._op["::"],res,acc));
         });
      });
      return A2(accumulate,n,_U.list([]));
   });
   var string = function (s) {
      return Parser(function (cx) {
         if (A2($String.startsWith,s,cx.input)) {
               var len = $String.length(s);
               var rem = A2($String.dropLeft,len,cx.input);
               var pos = cx.position + len;
               return {ctor: "_Tuple2"
                      ,_0: $Result.Ok(s)
                      ,_1: _U.update(cx,{input: rem,position: pos})};
            } else return {ctor: "_Tuple2"
                          ,_0: $Result.Err(_U.list([A2($Basics._op["++"],
                          "expected ",
                          $Basics.toString(s))]))
                          ,_1: cx};
      });
   };
   var parens = A2(between,string("("),string(")"));
   var braces = A2(between,string("{"),string("}"));
   var brackets = A2(between,string("["),string("]"));
   var regex = function (pattern) {
      var pattern$ = A2($String.startsWith,
      "^",
      pattern) ? pattern : A2($Basics._op["++"],"^",pattern);
      return Parser(function (cx) {
         var _p8 = A3($Regex.find,
         $Regex.AtMost(1),
         $Regex.regex(pattern$),
         cx.input);
         if (_p8.ctor === "::" && _p8._1.ctor === "[]") {
               var _p9 = _p8._0;
               var len = $String.length(_p9.match);
               var rem = A2($String.dropLeft,len,cx.input);
               var pos = cx.position + len;
               return {ctor: "_Tuple2"
                      ,_0: $Result.Ok(_p9.match)
                      ,_1: _U.update(cx,{input: rem,position: pos})};
            } else {
               return {ctor: "_Tuple2"
                      ,_0: $Result.Err(_U.list([A2($Basics._op["++"],
                      "expected input matching Regexp /",
                      A2($Basics._op["++"],pattern$,"/"))]))
                      ,_1: cx};
            }
      });
   };
   var $while = function (pred) {
      var accumulate = F2(function (acc,cx) {
         accumulate: while (true) {
            var _p10 = $String.uncons(cx.input);
            if (_p10.ctor === "Just") {
                  var _p11 = _p10._0._0;
                  if (pred(_p11)) {
                        var pos = cx.position + 1;
                        var c = A2($String.cons,_p11,"");
                        var _v11 = A2($Basics._op["++"],acc,c),
                        _v12 = _U.update(cx,{input: _p10._0._1,position: pos});
                        acc = _v11;
                        cx = _v12;
                        continue accumulate;
                     } else return {ctor: "_Tuple2",_0: acc,_1: cx};
               } else {
                  return {ctor: "_Tuple2",_0: acc,_1: cx};
               }
         }
      });
      return Parser(function (cx) {
         var _p12 = A2(accumulate,"",cx);
         var res = _p12._0;
         var cx$ = _p12._1;
         return {ctor: "_Tuple2",_0: $Result.Ok(res),_1: cx$};
      });
   };
   var end = Parser(function (cx) {
      return _U.eq(cx.input,"") ? {ctor: "_Tuple2"
                                  ,_0: $Result.Ok({ctor: "_Tuple0"})
                                  ,_1: cx} : {ctor: "_Tuple2"
                                             ,_0: $Result.Err(_U.list(["expected end of input"]))
                                             ,_1: cx};
   });
   var or = F2(function (lp,rp) {
      return Parser(function (cx) {
         var res = A2(app,lp,cx);
         var _p13 = res;
         if (_p13._0.ctor === "Ok") {
               return res;
            } else {
               var res$ = A2(app,rp,cx);
               var _p14 = res$;
               if (_p14._0.ctor === "Ok") {
                     return res$;
                  } else {
                     return {ctor: "_Tuple2"
                            ,_0: $Result.Err(A2($Basics._op["++"],_p13._0._0,_p14._0._0))
                            ,_1: cx};
                  }
            }
      });
   });
   var choice = function (xs) {
      return A3($List.foldr,or,fail(_U.list([])),xs);
   };
   var optional = F2(function (res,p) {
      return A2(or,p,succeed(res));
   });
   var chainl = F2(function (p,op) {
      var accumulate = function (x) {
         return A2(or,
         A2(andThen,
         op,
         function (f) {
            return A2(andThen,
            p,
            function (y) {
               return accumulate(A2(f,x,y));
            });
         }),
         succeed(x));
      };
      return A2(andThen,p,accumulate);
   });
   var chainr = F2(function (p,op) {
      var accumulate = function (x) {
         return A2(or,
         A2(andThen,
         op,
         function (f) {
            return A2(andThen,
            A2(andThen,p,accumulate),
            function (y) {
               return succeed(A2(f,x,y));
            });
         }),
         succeed(x));
      };
      return A2(andThen,p,accumulate);
   });
   var maybe = function (p) {
      return Parser(function (cx) {
         var _p15 = A2(app,p,cx);
         if (_p15.ctor === "_Tuple2" && _p15._0.ctor === "Ok") {
               return {ctor: "_Tuple2"
                      ,_0: $Result.Ok($Maybe.Just(_p15._0._0))
                      ,_1: _p15._1};
            } else {
               return {ctor: "_Tuple2"
                      ,_0: $Result.Ok($Maybe.Nothing)
                      ,_1: cx};
            }
      });
   };
   var many = function (p) {
      var accumulate = F2(function (acc,cx) {
         accumulate: while (true) {
            var _p16 = A2(app,p,cx);
            if (_p16.ctor === "_Tuple2" && _p16._0.ctor === "Ok") {
                  var _p17 = _p16._1;
                  if (_U.eq(cx,_p17)) return {ctor: "_Tuple2"
                                             ,_0: $List.reverse(acc)
                                             ,_1: cx}; else {
                        var _v17 = A2($List._op["::"],_p16._0._0,acc),_v18 = _p17;
                        acc = _v17;
                        cx = _v18;
                        continue accumulate;
                     }
               } else {
                  return {ctor: "_Tuple2",_0: $List.reverse(acc),_1: cx};
               }
         }
      });
      return Parser(function (cx) {
         var _p18 = A2(accumulate,_U.list([]),cx);
         var res = _p18._0;
         var cx$ = _p18._1;
         return {ctor: "_Tuple2",_0: $Result.Ok(res),_1: cx$};
      });
   };
   var many1 = function (p) {
      return A2(andMap,
      A2(map,
      F2(function (x,y) {    return A2($List._op["::"],x,y);}),
      p),
      many(p));
   };
   var skipMany1 = function (p) {
      return A2(andThen,
      many1(skip(p)),
      $Basics.always(succeed({ctor: "_Tuple0"})));
   };
   var sepBy1 = F2(function (sep,p) {
      return A2(andMap,
      A2(map,
      F2(function (x,y) {    return A2($List._op["::"],x,y);}),
      p),
      many(A2(andMap,A2(map,$Basics.flip($Basics.always),sep),p)));
   });
   var sepBy = F2(function (sep,p) {
      return A2(or,A2(sepBy1,sep,p),succeed(_U.list([])));
   });
   var sepEndBy1 = F2(function (sep,p) {
      return A2(andMap,
      A2(map,$Basics.always,A2(sepBy1,sep,p)),
      maybe(sep));
   });
   var sepEndBy = F2(function (sep,p) {
      return A2(or,A2(sepEndBy1,sep,p),succeed(_U.list([])));
   });
   var skipMany = function (p) {
      return A2(andThen,
      many(skip(p)),
      $Basics.always(succeed({ctor: "_Tuple0"})));
   };
   var manyTill = F2(function (p,end) {
      var accumulate = F2(function (acc,cx) {
         accumulate: while (true) {
            var _p19 = A2(app,end,cx);
            if (_p19._0.ctor === "Ok") {
                  return {ctor: "_Tuple2"
                         ,_0: $Result.Ok($List.reverse(acc))
                         ,_1: _p19._1};
               } else {
                  var _p20 = A2(app,p,cx);
                  if (_p20.ctor === "_Tuple2" && _p20._0.ctor === "Ok") {
                        var _v21 = A2($List._op["::"],_p20._0._0,acc),_v22 = _p20._1;
                        acc = _v21;
                        cx = _v22;
                        continue accumulate;
                     } else {
                        return {ctor: "_Tuple2"
                               ,_0: $Result.Err(_p19._0._0)
                               ,_1: _p19._1};
                     }
               }
         }
      });
      return Parser(accumulate(_U.list([])));
   });
   var Context = F2(function (a,b) {
      return {input: a,position: b};
   });
   return _elm.Combine.values = {_op: _op
                                ,primitive: primitive
                                ,parse: parse
                                ,app: app
                                ,rec: rec
                                ,bimap: bimap
                                ,map: map
                                ,mapError: mapError
                                ,andThen: andThen
                                ,andMap: andMap
                                ,sequence: sequence
                                ,fail: fail
                                ,succeed: succeed
                                ,string: string
                                ,regex: regex
                                ,$while: $while
                                ,end: end
                                ,or: or
                                ,choice: choice
                                ,optional: optional
                                ,maybe: maybe
                                ,many: many
                                ,many1: many1
                                ,manyTill: manyTill
                                ,sepBy: sepBy
                                ,sepBy1: sepBy1
                                ,sepEndBy: sepEndBy
                                ,sepEndBy1: sepEndBy1
                                ,skip: skip
                                ,skipMany: skipMany
                                ,skipMany1: skipMany1
                                ,chainl: chainl
                                ,chainr: chainr
                                ,count: count
                                ,between: between
                                ,parens: parens
                                ,braces: braces
                                ,brackets: brackets
                                ,Context: Context};
};
Elm.Combine = Elm.Combine || {};
Elm.Combine.Infix = Elm.Combine.Infix || {};
Elm.Combine.Infix.make = function (_elm) {
   "use strict";
   _elm.Combine = _elm.Combine || {};
   _elm.Combine.Infix = _elm.Combine.Infix || {};
   if (_elm.Combine.Infix.values) return _elm.Combine.Infix.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Combine = Elm.Combine.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   _op["<|>"] = $Combine.or;
   _op["*>"] = F2(function (lp,rp) {
      return A2($Combine.andMap,
      A2($Combine.map,$Basics.flip($Basics.always),lp),
      rp);
   });
   _op["<*"] = F2(function (lp,rp) {
      return A2($Combine.andMap,
      A2($Combine.map,$Basics.always,lp),
      rp);
   });
   _op["<?>"] = F2(function (p,m) {
      return A2($Combine.mapError,
      function (_p0) {
         return _U.list([m]);
      },
      p);
   });
   _op["<$"] = function (res) {
      return $Combine.map(function (_p1) {    return res;});
   };
   _op["<*>"] = $Combine.andMap;
   _op["<$>"] = $Combine.map;
   return _elm.Combine.Infix.values = {_op: _op};
};
Elm.Combine = Elm.Combine || {};
Elm.Combine.Char = Elm.Combine.Char || {};
Elm.Combine.Char.make = function (_elm) {
   "use strict";
   _elm.Combine = _elm.Combine || {};
   _elm.Combine.Char = _elm.Combine.Char || {};
   if (_elm.Combine.Char.values) return _elm.Combine.Char.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Char = Elm.Char.make(_elm),
   $Combine = Elm.Combine.make(_elm),
   $Combine$Infix = Elm.Combine.Infix.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $String = Elm.String.make(_elm);
   var _op = {};
   var crlf = A2($Combine$Infix._op["<?>"],
   A2($Combine$Infix._op["<$"],
   _U.chr("\n"),
   $Combine.regex("\r\n")),
   "expected crlf");
   var satisfy = function (pred) {
      return $Combine.primitive(function (cx) {
         var message = "could not satisfy predicate";
         var _p0 = $String.uncons(cx.input);
         if (_p0.ctor === "Just") {
               var _p1 = _p0._0._0;
               return pred(_p1) ? {ctor: "_Tuple2"
                                  ,_0: $Result.Ok(_p1)
                                  ,_1: _U.update(cx,
                                  {input: _p0._0._1
                                  ,position: cx.position + 1})} : {ctor: "_Tuple2"
                                                                  ,_0: $Result.Err(_U.list([message]))
                                                                  ,_1: cx};
            } else {
               return {ctor: "_Tuple2"
                      ,_0: $Result.Err(_U.list([message]))
                      ,_1: cx};
            }
      });
   };
   var $char = function (c) {
      return A2($Combine$Infix._op["<?>"],
      satisfy(F2(function (x,y) {    return _U.eq(x,y);})(c)),
      A2($Basics._op["++"],"expected ",$Basics.toString(c)));
   };
   var anyChar = A2($Combine$Infix._op["<?>"],
   satisfy($Basics.always(true)),
   "expected any character");
   var oneOf = function (cs) {
      return A2($Combine$Infix._op["<?>"],
      satisfy(A2($Basics.flip,$List.member,cs)),
      A2($Basics._op["++"],"expected one of ",$Basics.toString(cs)));
   };
   var noneOf = function (cs) {
      return A2($Combine$Infix._op["<?>"],
      satisfy(function (_p2) {
         return $Basics.not(A3($Basics.flip,$List.member,cs,_p2));
      }),
      A2($Basics._op["++"],"expected none of ",$Basics.toString(cs)));
   };
   var space = A2($Combine$Infix._op["<?>"],
   satisfy(F2(function (x,y) {
      return _U.eq(x,y);
   })(_U.chr(" "))),
   "expected space");
   var tab = A2($Combine$Infix._op["<?>"],
   satisfy(F2(function (x,y) {
      return _U.eq(x,y);
   })(_U.chr("\t"))),
   "expected tab");
   var newline = A2($Combine$Infix._op["<?>"],
   satisfy(F2(function (x,y) {
      return _U.eq(x,y);
   })(_U.chr("\n"))),
   "expected newline");
   var eol = A2($Combine$Infix._op["<|>"],newline,crlf);
   var lower = A2($Combine$Infix._op["<?>"],
   satisfy($Char.isLower),
   "expected a lowercase character");
   var upper = A2($Combine$Infix._op["<?>"],
   satisfy($Char.isUpper),
   "expected an uppercase character");
   var digit = A2($Combine$Infix._op["<?>"],
   satisfy($Char.isDigit),
   "expected a digit");
   var octDigit = A2($Combine$Infix._op["<?>"],
   satisfy($Char.isOctDigit),
   "expected an octal digit");
   var hexDigit = A2($Combine$Infix._op["<?>"],
   satisfy($Char.isHexDigit),
   "expected a hexadecimal digit");
   return _elm.Combine.Char.values = {_op: _op
                                     ,satisfy: satisfy
                                     ,$char: $char
                                     ,anyChar: anyChar
                                     ,oneOf: oneOf
                                     ,noneOf: noneOf
                                     ,space: space
                                     ,tab: tab
                                     ,newline: newline
                                     ,crlf: crlf
                                     ,eol: eol
                                     ,lower: lower
                                     ,upper: upper
                                     ,digit: digit
                                     ,octDigit: octDigit
                                     ,hexDigit: hexDigit};
};
Elm.Combine = Elm.Combine || {};
Elm.Combine.Num = Elm.Combine.Num || {};
Elm.Combine.Num.make = function (_elm) {
   "use strict";
   _elm.Combine = _elm.Combine || {};
   _elm.Combine.Num = _elm.Combine.Num || {};
   if (_elm.Combine.Num.values) return _elm.Combine.Num.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Char = Elm.Char.make(_elm),
   $Combine = Elm.Combine.make(_elm),
   $Combine$Char = Elm.Combine.Char.make(_elm),
   $Combine$Infix = Elm.Combine.Infix.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $String = Elm.String.make(_elm);
   var _op = {};
   var digit = function () {
      var toDigit = function (c) {
         return $Char.toCode(c) - $Char.toCode(_U.chr("0"));
      };
      return A2($Combine$Infix._op["<?>"],
      A2($Combine$Infix._op["<$>"],toDigit,$Combine$Char.digit),
      "expected a digit");
   }();
   var sign = A2($Combine.optional,
   1,
   $Combine.choice(_U.list([A2($Combine$Infix._op["<$"],
                           1,
                           $Combine.string("+"))
                           ,A2($Combine$Infix._op["<$"],-1,$Combine.string("-"))])));
   var unwrap = F2(function (f,s) {
      var _p0 = f(s);
      if (_p0.ctor === "Ok") {
            return _p0._0;
         } else {
            return _U.crashCase("Combine.Num",
            {start: {line: 19,column: 3},end: {line: 24,column: 73}},
            _p0)(A2($Basics._op["++"],
            "impossible state in Combine.Num.unwrap: ",
            $Basics.toString(_p0._0)));
         }
   });
   var toInt = unwrap($String.toInt);
   var $int = A2($Combine$Infix._op["<?>"],
   A2($Combine.andMap,
   A2($Combine.map,F2(function (x,y) {    return x * y;}),sign),
   A2($Combine$Infix._op["<$>"],
   toInt,
   $Combine.regex("(0|[1-9][0-9]*)"))),
   "expected an integer");
   var toFloat = unwrap($String.toFloat);
   var $float = A2($Combine$Infix._op["<?>"],
   A2($Combine.andMap,
   A2($Combine.map,
   function (_p2) {
      return F2(function (x,y) {
         return x * y;
      })($Basics.toFloat(_p2));
   },
   sign),
   A2($Combine$Infix._op["<$>"],
   toFloat,
   $Combine.regex("(0|[1-9][0-9]*)(\\.[0-9]+)"))),
   "expected a float");
   return _elm.Combine.Num.values = {_op: _op
                                    ,sign: sign
                                    ,digit: digit
                                    ,$int: $int
                                    ,$float: $float};
};
Elm.Native.Json = {};

Elm.Native.Json.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Json = localRuntime.Native.Json || {};
	if (localRuntime.Native.Json.values) {
		return localRuntime.Native.Json.values;
	}

	var ElmArray = Elm.Native.Array.make(localRuntime);
	var List = Elm.Native.List.make(localRuntime);
	var Maybe = Elm.Maybe.make(localRuntime);
	var Result = Elm.Result.make(localRuntime);
	var Utils = Elm.Native.Utils.make(localRuntime);


	function crash(expected, actual) {
		throw new Error(
			'expecting ' + expected + ' but got ' + JSON.stringify(actual)
		);
	}


	// PRIMITIVE VALUES

	function decodeNull(successValue) {
		return function(value) {
			if (value === null) {
				return successValue;
			}
			crash('null', value);
		};
	}


	function decodeString(value) {
		if (typeof value === 'string' || value instanceof String) {
			return value;
		}
		crash('a String', value);
	}


	function decodeFloat(value) {
		if (typeof value === 'number') {
			return value;
		}
		crash('a Float', value);
	}


	function decodeInt(value) {
		if (typeof value !== 'number') {
			crash('an Int', value);
		}

		if (value < 2147483647 && value > -2147483647 && (value | 0) === value) {
			return value;
		}

		if (isFinite(value) && !(value % 1)) {
			return value;
		}

		crash('an Int', value);
	}


	function decodeBool(value) {
		if (typeof value === 'boolean') {
			return value;
		}
		crash('a Bool', value);
	}


	// ARRAY

	function decodeArray(decoder) {
		return function(value) {
			if (value instanceof Array) {
				var len = value.length;
				var array = new Array(len);
				for (var i = len; i--; ) {
					array[i] = decoder(value[i]);
				}
				return ElmArray.fromJSArray(array);
			}
			crash('an Array', value);
		};
	}


	// LIST

	function decodeList(decoder) {
		return function(value) {
			if (value instanceof Array) {
				var len = value.length;
				var list = List.Nil;
				for (var i = len; i--; ) {
					list = List.Cons( decoder(value[i]), list );
				}
				return list;
			}
			crash('a List', value);
		};
	}


	// MAYBE

	function decodeMaybe(decoder) {
		return function(value) {
			try {
				return Maybe.Just(decoder(value));
			} catch(e) {
				return Maybe.Nothing;
			}
		};
	}


	// FIELDS

	function decodeField(field, decoder) {
		return function(value) {
			var subValue = value[field];
			if (subValue !== undefined) {
				return decoder(subValue);
			}
			crash("an object with field '" + field + "'", value);
		};
	}


	// OBJECTS

	function decodeKeyValuePairs(decoder) {
		return function(value) {
			var isObject =
				typeof value === 'object'
					&& value !== null
					&& !(value instanceof Array);

			if (isObject) {
				var keyValuePairs = List.Nil;
				for (var key in value)
				{
					var elmValue = decoder(value[key]);
					var pair = Utils.Tuple2(key, elmValue);
					keyValuePairs = List.Cons(pair, keyValuePairs);
				}
				return keyValuePairs;
			}

			crash('an object', value);
		};
	}

	function decodeObject1(f, d1) {
		return function(value) {
			return f(d1(value));
		};
	}

	function decodeObject2(f, d1, d2) {
		return function(value) {
			return A2( f, d1(value), d2(value) );
		};
	}

	function decodeObject3(f, d1, d2, d3) {
		return function(value) {
			return A3( f, d1(value), d2(value), d3(value) );
		};
	}

	function decodeObject4(f, d1, d2, d3, d4) {
		return function(value) {
			return A4( f, d1(value), d2(value), d3(value), d4(value) );
		};
	}

	function decodeObject5(f, d1, d2, d3, d4, d5) {
		return function(value) {
			return A5( f, d1(value), d2(value), d3(value), d4(value), d5(value) );
		};
	}

	function decodeObject6(f, d1, d2, d3, d4, d5, d6) {
		return function(value) {
			return A6( f,
				d1(value),
				d2(value),
				d3(value),
				d4(value),
				d5(value),
				d6(value)
			);
		};
	}

	function decodeObject7(f, d1, d2, d3, d4, d5, d6, d7) {
		return function(value) {
			return A7( f,
				d1(value),
				d2(value),
				d3(value),
				d4(value),
				d5(value),
				d6(value),
				d7(value)
			);
		};
	}

	function decodeObject8(f, d1, d2, d3, d4, d5, d6, d7, d8) {
		return function(value) {
			return A8( f,
				d1(value),
				d2(value),
				d3(value),
				d4(value),
				d5(value),
				d6(value),
				d7(value),
				d8(value)
			);
		};
	}


	// TUPLES

	function decodeTuple1(f, d1) {
		return function(value) {
			if ( !(value instanceof Array) || value.length !== 1 ) {
				crash('a Tuple of length 1', value);
			}
			return f( d1(value[0]) );
		};
	}

	function decodeTuple2(f, d1, d2) {
		return function(value) {
			if ( !(value instanceof Array) || value.length !== 2 ) {
				crash('a Tuple of length 2', value);
			}
			return A2( f, d1(value[0]), d2(value[1]) );
		};
	}

	function decodeTuple3(f, d1, d2, d3) {
		return function(value) {
			if ( !(value instanceof Array) || value.length !== 3 ) {
				crash('a Tuple of length 3', value);
			}
			return A3( f, d1(value[0]), d2(value[1]), d3(value[2]) );
		};
	}


	function decodeTuple4(f, d1, d2, d3, d4) {
		return function(value) {
			if ( !(value instanceof Array) || value.length !== 4 ) {
				crash('a Tuple of length 4', value);
			}
			return A4( f, d1(value[0]), d2(value[1]), d3(value[2]), d4(value[3]) );
		};
	}


	function decodeTuple5(f, d1, d2, d3, d4, d5) {
		return function(value) {
			if ( !(value instanceof Array) || value.length !== 5 ) {
				crash('a Tuple of length 5', value);
			}
			return A5( f,
				d1(value[0]),
				d2(value[1]),
				d3(value[2]),
				d4(value[3]),
				d5(value[4])
			);
		};
	}


	function decodeTuple6(f, d1, d2, d3, d4, d5, d6) {
		return function(value) {
			if ( !(value instanceof Array) || value.length !== 6 ) {
				crash('a Tuple of length 6', value);
			}
			return A6( f,
				d1(value[0]),
				d2(value[1]),
				d3(value[2]),
				d4(value[3]),
				d5(value[4]),
				d6(value[5])
			);
		};
	}

	function decodeTuple7(f, d1, d2, d3, d4, d5, d6, d7) {
		return function(value) {
			if ( !(value instanceof Array) || value.length !== 7 ) {
				crash('a Tuple of length 7', value);
			}
			return A7( f,
				d1(value[0]),
				d2(value[1]),
				d3(value[2]),
				d4(value[3]),
				d5(value[4]),
				d6(value[5]),
				d7(value[6])
			);
		};
	}


	function decodeTuple8(f, d1, d2, d3, d4, d5, d6, d7, d8) {
		return function(value) {
			if ( !(value instanceof Array) || value.length !== 8 ) {
				crash('a Tuple of length 8', value);
			}
			return A8( f,
				d1(value[0]),
				d2(value[1]),
				d3(value[2]),
				d4(value[3]),
				d5(value[4]),
				d6(value[5]),
				d7(value[6]),
				d8(value[7])
			);
		};
	}


	// CUSTOM DECODERS

	function decodeValue(value) {
		return value;
	}

	function runDecoderValue(decoder, value) {
		try {
			return Result.Ok(decoder(value));
		} catch(e) {
			return Result.Err(e.message);
		}
	}

	function customDecoder(decoder, callback) {
		return function(value) {
			var result = callback(decoder(value));
			if (result.ctor === 'Err') {
				throw new Error('custom decoder failed: ' + result._0);
			}
			return result._0;
		};
	}

	function andThen(decode, callback) {
		return function(value) {
			var result = decode(value);
			return callback(result)(value);
		};
	}

	function fail(msg) {
		return function(value) {
			throw new Error(msg);
		};
	}

	function succeed(successValue) {
		return function(value) {
			return successValue;
		};
	}


	// ONE OF MANY

	function oneOf(decoders) {
		return function(value) {
			var errors = [];
			var temp = decoders;
			while (temp.ctor !== '[]') {
				try {
					return temp._0(value);
				} catch(e) {
					errors.push(e.message);
				}
				temp = temp._1;
			}
			throw new Error('expecting one of the following:\n    ' + errors.join('\n    '));
		};
	}

	function get(decoder, value) {
		try {
			return Result.Ok(decoder(value));
		} catch(e) {
			return Result.Err(e.message);
		}
	}


	// ENCODE / DECODE

	function runDecoderString(decoder, string) {
		try {
			return Result.Ok(decoder(JSON.parse(string)));
		} catch(e) {
			return Result.Err(e.message);
		}
	}

	function encode(indentLevel, value) {
		return JSON.stringify(value, null, indentLevel);
	}

	function identity(value) {
		return value;
	}

	function encodeObject(keyValuePairs) {
		var obj = {};
		while (keyValuePairs.ctor !== '[]') {
			var pair = keyValuePairs._0;
			obj[pair._0] = pair._1;
			keyValuePairs = keyValuePairs._1;
		}
		return obj;
	}

	return localRuntime.Native.Json.values = {
		encode: F2(encode),
		runDecoderString: F2(runDecoderString),
		runDecoderValue: F2(runDecoderValue),

		get: F2(get),
		oneOf: oneOf,

		decodeNull: decodeNull,
		decodeInt: decodeInt,
		decodeFloat: decodeFloat,
		decodeString: decodeString,
		decodeBool: decodeBool,

		decodeMaybe: decodeMaybe,

		decodeList: decodeList,
		decodeArray: decodeArray,

		decodeField: F2(decodeField),

		decodeObject1: F2(decodeObject1),
		decodeObject2: F3(decodeObject2),
		decodeObject3: F4(decodeObject3),
		decodeObject4: F5(decodeObject4),
		decodeObject5: F6(decodeObject5),
		decodeObject6: F7(decodeObject6),
		decodeObject7: F8(decodeObject7),
		decodeObject8: F9(decodeObject8),
		decodeKeyValuePairs: decodeKeyValuePairs,

		decodeTuple1: F2(decodeTuple1),
		decodeTuple2: F3(decodeTuple2),
		decodeTuple3: F4(decodeTuple3),
		decodeTuple4: F5(decodeTuple4),
		decodeTuple5: F6(decodeTuple5),
		decodeTuple6: F7(decodeTuple6),
		decodeTuple7: F8(decodeTuple7),
		decodeTuple8: F9(decodeTuple8),

		andThen: F2(andThen),
		decodeValue: decodeValue,
		customDecoder: F2(customDecoder),
		fail: fail,
		succeed: succeed,

		identity: identity,
		encodeNull: null,
		encodeArray: ElmArray.toJSArray,
		encodeList: List.toArray,
		encodeObject: encodeObject

	};
};

Elm.Native.Array = {};
Elm.Native.Array.make = function(localRuntime) {

	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Array = localRuntime.Native.Array || {};
	if (localRuntime.Native.Array.values)
	{
		return localRuntime.Native.Array.values;
	}
	if ('values' in Elm.Native.Array)
	{
		return localRuntime.Native.Array.values = Elm.Native.Array.values;
	}

	var List = Elm.Native.List.make(localRuntime);

	// A RRB-Tree has two distinct data types.
	// Leaf -> "height"  is always 0
	//         "table"   is an array of elements
	// Node -> "height"  is always greater than 0
	//         "table"   is an array of child nodes
	//         "lengths" is an array of accumulated lengths of the child nodes

	// M is the maximal table size. 32 seems fast. E is the allowed increase
	// of search steps when concatting to find an index. Lower values will
	// decrease balancing, but will increase search steps.
	var M = 32;
	var E = 2;

	// An empty array.
	var empty = {
		ctor: '_Array',
		height: 0,
		table: []
	};


	function get(i, array)
	{
		if (i < 0 || i >= length(array))
		{
			throw new Error(
				'Index ' + i + ' is out of range. Check the length of ' +
				'your array first or use getMaybe or getWithDefault.');
		}
		return unsafeGet(i, array);
	}


	function unsafeGet(i, array)
	{
		for (var x = array.height; x > 0; x--)
		{
			var slot = i >> (x * 5);
			while (array.lengths[slot] <= i)
			{
				slot++;
			}
			if (slot > 0)
			{
				i -= array.lengths[slot - 1];
			}
			array = array.table[slot];
		}
		return array.table[i];
	}


	// Sets the value at the index i. Only the nodes leading to i will get
	// copied and updated.
	function set(i, item, array)
	{
		if (i < 0 || length(array) <= i)
		{
			return array;
		}
		return unsafeSet(i, item, array);
	}


	function unsafeSet(i, item, array)
	{
		array = nodeCopy(array);

		if (array.height === 0)
		{
			array.table[i] = item;
		}
		else
		{
			var slot = getSlot(i, array);
			if (slot > 0)
			{
				i -= array.lengths[slot - 1];
			}
			array.table[slot] = unsafeSet(i, item, array.table[slot]);
		}
		return array;
	}


	function initialize(len, f)
	{
		if (len <= 0)
		{
			return empty;
		}
		var h = Math.floor( Math.log(len) / Math.log(M) );
		return initialize_(f, h, 0, len);
	}

	function initialize_(f, h, from, to)
	{
		if (h === 0)
		{
			var table = new Array((to - from) % (M + 1));
			for (var i = 0; i < table.length; i++)
			{
			  table[i] = f(from + i);
			}
			return {
				ctor: '_Array',
				height: 0,
				table: table
			};
		}

		var step = Math.pow(M, h);
		var table = new Array(Math.ceil((to - from) / step));
		var lengths = new Array(table.length);
		for (var i = 0; i < table.length; i++)
		{
			table[i] = initialize_(f, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
			lengths[i] = length(table[i]) + (i > 0 ? lengths[i-1] : 0);
		}
		return {
			ctor: '_Array',
			height: h,
			table: table,
			lengths: lengths
		};
	}

	function fromList(list)
	{
		if (list === List.Nil)
		{
			return empty;
		}

		// Allocate M sized blocks (table) and write list elements to it.
		var table = new Array(M);
		var nodes = [];
		var i = 0;

		while (list.ctor !== '[]')
		{
			table[i] = list._0;
			list = list._1;
			i++;

			// table is full, so we can push a leaf containing it into the
			// next node.
			if (i === M)
			{
				var leaf = {
					ctor: '_Array',
					height: 0,
					table: table
				};
				fromListPush(leaf, nodes);
				table = new Array(M);
				i = 0;
			}
		}

		// Maybe there is something left on the table.
		if (i > 0)
		{
			var leaf = {
				ctor: '_Array',
				height: 0,
				table: table.splice(0, i)
			};
			fromListPush(leaf, nodes);
		}

		// Go through all of the nodes and eventually push them into higher nodes.
		for (var h = 0; h < nodes.length - 1; h++)
		{
			if (nodes[h].table.length > 0)
			{
				fromListPush(nodes[h], nodes);
			}
		}

		var head = nodes[nodes.length - 1];
		if (head.height > 0 && head.table.length === 1)
		{
			return head.table[0];
		}
		else
		{
			return head;
		}
	}

	// Push a node into a higher node as a child.
	function fromListPush(toPush, nodes)
	{
		var h = toPush.height;

		// Maybe the node on this height does not exist.
		if (nodes.length === h)
		{
			var node = {
				ctor: '_Array',
				height: h + 1,
				table: [],
				lengths: []
			};
			nodes.push(node);
		}

		nodes[h].table.push(toPush);
		var len = length(toPush);
		if (nodes[h].lengths.length > 0)
		{
			len += nodes[h].lengths[nodes[h].lengths.length - 1];
		}
		nodes[h].lengths.push(len);

		if (nodes[h].table.length === M)
		{
			fromListPush(nodes[h], nodes);
			nodes[h] = {
				ctor: '_Array',
				height: h + 1,
				table: [],
				lengths: []
			};
		}
	}

	// Pushes an item via push_ to the bottom right of a tree.
	function push(item, a)
	{
		var pushed = push_(item, a);
		if (pushed !== null)
		{
			return pushed;
		}

		var newTree = create(item, a.height);
		return siblise(a, newTree);
	}

	// Recursively tries to push an item to the bottom-right most
	// tree possible. If there is no space left for the item,
	// null will be returned.
	function push_(item, a)
	{
		// Handle resursion stop at leaf level.
		if (a.height === 0)
		{
			if (a.table.length < M)
			{
				var newA = {
					ctor: '_Array',
					height: 0,
					table: a.table.slice()
				};
				newA.table.push(item);
				return newA;
			}
			else
			{
			  return null;
			}
		}

		// Recursively push
		var pushed = push_(item, botRight(a));

		// There was space in the bottom right tree, so the slot will
		// be updated.
		if (pushed !== null)
		{
			var newA = nodeCopy(a);
			newA.table[newA.table.length - 1] = pushed;
			newA.lengths[newA.lengths.length - 1]++;
			return newA;
		}

		// When there was no space left, check if there is space left
		// for a new slot with a tree which contains only the item
		// at the bottom.
		if (a.table.length < M)
		{
			var newSlot = create(item, a.height - 1);
			var newA = nodeCopy(a);
			newA.table.push(newSlot);
			newA.lengths.push(newA.lengths[newA.lengths.length - 1] + length(newSlot));
			return newA;
		}
		else
		{
			return null;
		}
	}

	// Converts an array into a list of elements.
	function toList(a)
	{
		return toList_(List.Nil, a);
	}

	function toList_(list, a)
	{
		for (var i = a.table.length - 1; i >= 0; i--)
		{
			list =
				a.height === 0
					? List.Cons(a.table[i], list)
					: toList_(list, a.table[i]);
		}
		return list;
	}

	// Maps a function over the elements of an array.
	function map(f, a)
	{
		var newA = {
			ctor: '_Array',
			height: a.height,
			table: new Array(a.table.length)
		};
		if (a.height > 0)
		{
			newA.lengths = a.lengths;
		}
		for (var i = 0; i < a.table.length; i++)
		{
			newA.table[i] =
				a.height === 0
					? f(a.table[i])
					: map(f, a.table[i]);
		}
		return newA;
	}

	// Maps a function over the elements with their index as first argument.
	function indexedMap(f, a)
	{
		return indexedMap_(f, a, 0);
	}

	function indexedMap_(f, a, from)
	{
		var newA = {
			ctor: '_Array',
			height: a.height,
			table: new Array(a.table.length)
		};
		if (a.height > 0)
		{
			newA.lengths = a.lengths;
		}
		for (var i = 0; i < a.table.length; i++)
		{
			newA.table[i] =
				a.height === 0
					? A2(f, from + i, a.table[i])
					: indexedMap_(f, a.table[i], i == 0 ? from : from + a.lengths[i - 1]);
		}
		return newA;
	}

	function foldl(f, b, a)
	{
		if (a.height === 0)
		{
			for (var i = 0; i < a.table.length; i++)
			{
				b = A2(f, a.table[i], b);
			}
		}
		else
		{
			for (var i = 0; i < a.table.length; i++)
			{
				b = foldl(f, b, a.table[i]);
			}
		}
		return b;
	}

	function foldr(f, b, a)
	{
		if (a.height === 0)
		{
			for (var i = a.table.length; i--; )
			{
				b = A2(f, a.table[i], b);
			}
		}
		else
		{
			for (var i = a.table.length; i--; )
			{
				b = foldr(f, b, a.table[i]);
			}
		}
		return b;
	}

	// TODO: currently, it slices the right, then the left. This can be
	// optimized.
	function slice(from, to, a)
	{
		if (from < 0)
		{
			from += length(a);
		}
		if (to < 0)
		{
			to += length(a);
		}
		return sliceLeft(from, sliceRight(to, a));
	}

	function sliceRight(to, a)
	{
		if (to === length(a))
		{
			return a;
		}

		// Handle leaf level.
		if (a.height === 0)
		{
			var newA = { ctor:'_Array', height:0 };
			newA.table = a.table.slice(0, to);
			return newA;
		}

		// Slice the right recursively.
		var right = getSlot(to, a);
		var sliced = sliceRight(to - (right > 0 ? a.lengths[right - 1] : 0), a.table[right]);

		// Maybe the a node is not even needed, as sliced contains the whole slice.
		if (right === 0)
		{
			return sliced;
		}

		// Create new node.
		var newA = {
			ctor: '_Array',
			height: a.height,
			table: a.table.slice(0, right),
			lengths: a.lengths.slice(0, right)
		};
		if (sliced.table.length > 0)
		{
			newA.table[right] = sliced;
			newA.lengths[right] = length(sliced) + (right > 0 ? newA.lengths[right - 1] : 0);
		}
		return newA;
	}

	function sliceLeft(from, a)
	{
		if (from === 0)
		{
			return a;
		}

		// Handle leaf level.
		if (a.height === 0)
		{
			var newA = { ctor:'_Array', height:0 };
			newA.table = a.table.slice(from, a.table.length + 1);
			return newA;
		}

		// Slice the left recursively.
		var left = getSlot(from, a);
		var sliced = sliceLeft(from - (left > 0 ? a.lengths[left - 1] : 0), a.table[left]);

		// Maybe the a node is not even needed, as sliced contains the whole slice.
		if (left === a.table.length - 1)
		{
			return sliced;
		}

		// Create new node.
		var newA = {
			ctor: '_Array',
			height: a.height,
			table: a.table.slice(left, a.table.length + 1),
			lengths: new Array(a.table.length - left)
		};
		newA.table[0] = sliced;
		var len = 0;
		for (var i = 0; i < newA.table.length; i++)
		{
			len += length(newA.table[i]);
			newA.lengths[i] = len;
		}

		return newA;
	}

	// Appends two trees.
	function append(a,b)
	{
		if (a.table.length === 0)
		{
			return b;
		}
		if (b.table.length === 0)
		{
			return a;
		}

		var c = append_(a, b);

		// Check if both nodes can be crunshed together.
		if (c[0].table.length + c[1].table.length <= M)
		{
			if (c[0].table.length === 0)
			{
				return c[1];
			}
			if (c[1].table.length === 0)
			{
				return c[0];
			}

			// Adjust .table and .lengths
			c[0].table = c[0].table.concat(c[1].table);
			if (c[0].height > 0)
			{
				var len = length(c[0]);
				for (var i = 0; i < c[1].lengths.length; i++)
				{
					c[1].lengths[i] += len;
				}
				c[0].lengths = c[0].lengths.concat(c[1].lengths);
			}

			return c[0];
		}

		if (c[0].height > 0)
		{
			var toRemove = calcToRemove(a, b);
			if (toRemove > E)
			{
				c = shuffle(c[0], c[1], toRemove);
			}
		}

		return siblise(c[0], c[1]);
	}

	// Returns an array of two nodes; right and left. One node _may_ be empty.
	function append_(a, b)
	{
		if (a.height === 0 && b.height === 0)
		{
			return [a, b];
		}

		if (a.height !== 1 || b.height !== 1)
		{
			if (a.height === b.height)
			{
				a = nodeCopy(a);
				b = nodeCopy(b);
				var appended = append_(botRight(a), botLeft(b));

				insertRight(a, appended[1]);
				insertLeft(b, appended[0]);
			}
			else if (a.height > b.height)
			{
				a = nodeCopy(a);
				var appended = append_(botRight(a), b);

				insertRight(a, appended[0]);
				b = parentise(appended[1], appended[1].height + 1);
			}
			else
			{
				b = nodeCopy(b);
				var appended = append_(a, botLeft(b));

				var left = appended[0].table.length === 0 ? 0 : 1;
				var right = left === 0 ? 1 : 0;
				insertLeft(b, appended[left]);
				a = parentise(appended[right], appended[right].height + 1);
			}
		}

		// Check if balancing is needed and return based on that.
		if (a.table.length === 0 || b.table.length === 0)
		{
			return [a, b];
		}

		var toRemove = calcToRemove(a, b);
		if (toRemove <= E)
		{
			return [a, b];
		}
		return shuffle(a, b, toRemove);
	}

	// Helperfunctions for append_. Replaces a child node at the side of the parent.
	function insertRight(parent, node)
	{
		var index = parent.table.length - 1;
		parent.table[index] = node;
		parent.lengths[index] = length(node);
		parent.lengths[index] += index > 0 ? parent.lengths[index - 1] : 0;
	}

	function insertLeft(parent, node)
	{
		if (node.table.length > 0)
		{
			parent.table[0] = node;
			parent.lengths[0] = length(node);

			var len = length(parent.table[0]);
			for (var i = 1; i < parent.lengths.length; i++)
			{
				len += length(parent.table[i]);
				parent.lengths[i] = len;
			}
		}
		else
		{
			parent.table.shift();
			for (var i = 1; i < parent.lengths.length; i++)
			{
				parent.lengths[i] = parent.lengths[i] - parent.lengths[0];
			}
			parent.lengths.shift();
		}
	}

	// Returns the extra search steps for E. Refer to the paper.
	function calcToRemove(a, b)
	{
		var subLengths = 0;
		for (var i = 0; i < a.table.length; i++)
		{
			subLengths += a.table[i].table.length;
		}
		for (var i = 0; i < b.table.length; i++)
		{
			subLengths += b.table[i].table.length;
		}

		var toRemove = a.table.length + b.table.length;
		return toRemove - (Math.floor((subLengths - 1) / M) + 1);
	}

	// get2, set2 and saveSlot are helpers for accessing elements over two arrays.
	function get2(a, b, index)
	{
		return index < a.length
			? a[index]
			: b[index - a.length];
	}

	function set2(a, b, index, value)
	{
		if (index < a.length)
		{
			a[index] = value;
		}
		else
		{
			b[index - a.length] = value;
		}
	}

	function saveSlot(a, b, index, slot)
	{
		set2(a.table, b.table, index, slot);

		var l = (index === 0 || index === a.lengths.length)
			? 0
			: get2(a.lengths, a.lengths, index - 1);

		set2(a.lengths, b.lengths, index, l + length(slot));
	}

	// Creates a node or leaf with a given length at their arrays for perfomance.
	// Is only used by shuffle.
	function createNode(h, length)
	{
		if (length < 0)
		{
			length = 0;
		}
		var a = {
			ctor: '_Array',
			height: h,
			table: new Array(length)
		};
		if (h > 0)
		{
			a.lengths = new Array(length);
		}
		return a;
	}

	// Returns an array of two balanced nodes.
	function shuffle(a, b, toRemove)
	{
		var newA = createNode(a.height, Math.min(M, a.table.length + b.table.length - toRemove));
		var newB = createNode(a.height, newA.table.length - (a.table.length + b.table.length - toRemove));

		// Skip the slots with size M. More precise: copy the slot references
		// to the new node
		var read = 0;
		while (get2(a.table, b.table, read).table.length % M === 0)
		{
			set2(newA.table, newB.table, read, get2(a.table, b.table, read));
			set2(newA.lengths, newB.lengths, read, get2(a.lengths, b.lengths, read));
			read++;
		}

		// Pulling items from left to right, caching in a slot before writing
		// it into the new nodes.
		var write = read;
		var slot = new createNode(a.height - 1, 0);
		var from = 0;

		// If the current slot is still containing data, then there will be at
		// least one more write, so we do not break this loop yet.
		while (read - write - (slot.table.length > 0 ? 1 : 0) < toRemove)
		{
			// Find out the max possible items for copying.
			var source = get2(a.table, b.table, read);
			var to = Math.min(M - slot.table.length, source.table.length);

			// Copy and adjust size table.
			slot.table = slot.table.concat(source.table.slice(from, to));
			if (slot.height > 0)
			{
				var len = slot.lengths.length;
				for (var i = len; i < len + to - from; i++)
				{
					slot.lengths[i] = length(slot.table[i]);
					slot.lengths[i] += (i > 0 ? slot.lengths[i - 1] : 0);
				}
			}

			from += to;

			// Only proceed to next slots[i] if the current one was
			// fully copied.
			if (source.table.length <= to)
			{
				read++; from = 0;
			}

			// Only create a new slot if the current one is filled up.
			if (slot.table.length === M)
			{
				saveSlot(newA, newB, write, slot);
				slot = createNode(a.height - 1, 0);
				write++;
			}
		}

		// Cleanup after the loop. Copy the last slot into the new nodes.
		if (slot.table.length > 0)
		{
			saveSlot(newA, newB, write, slot);
			write++;
		}

		// Shift the untouched slots to the left
		while (read < a.table.length + b.table.length )
		{
			saveSlot(newA, newB, write, get2(a.table, b.table, read));
			read++;
			write++;
		}

		return [newA, newB];
	}

	// Navigation functions
	function botRight(a)
	{
		return a.table[a.table.length - 1];
	}
	function botLeft(a)
	{
		return a.table[0];
	}

	// Copies a node for updating. Note that you should not use this if
	// only updating only one of "table" or "lengths" for performance reasons.
	function nodeCopy(a)
	{
		var newA = {
			ctor: '_Array',
			height: a.height,
			table: a.table.slice()
		};
		if (a.height > 0)
		{
			newA.lengths = a.lengths.slice();
		}
		return newA;
	}

	// Returns how many items are in the tree.
	function length(array)
	{
		if (array.height === 0)
		{
			return array.table.length;
		}
		else
		{
			return array.lengths[array.lengths.length - 1];
		}
	}

	// Calculates in which slot of "table" the item probably is, then
	// find the exact slot via forward searching in  "lengths". Returns the index.
	function getSlot(i, a)
	{
		var slot = i >> (5 * a.height);
		while (a.lengths[slot] <= i)
		{
			slot++;
		}
		return slot;
	}

	// Recursively creates a tree with a given height containing
	// only the given item.
	function create(item, h)
	{
		if (h === 0)
		{
			return {
				ctor: '_Array',
				height: 0,
				table: [item]
			};
		}
		return {
			ctor: '_Array',
			height: h,
			table: [create(item, h - 1)],
			lengths: [1]
		};
	}

	// Recursively creates a tree that contains the given tree.
	function parentise(tree, h)
	{
		if (h === tree.height)
		{
			return tree;
		}

		return {
			ctor: '_Array',
			height: h,
			table: [parentise(tree, h - 1)],
			lengths: [length(tree)]
		};
	}

	// Emphasizes blood brotherhood beneath two trees.
	function siblise(a, b)
	{
		return {
			ctor: '_Array',
			height: a.height + 1,
			table: [a, b],
			lengths: [length(a), length(a) + length(b)]
		};
	}

	function toJSArray(a)
	{
		var jsArray = new Array(length(a));
		toJSArray_(jsArray, 0, a);
		return jsArray;
	}

	function toJSArray_(jsArray, i, a)
	{
		for (var t = 0; t < a.table.length; t++)
		{
			if (a.height === 0)
			{
				jsArray[i + t] = a.table[t];
			}
			else
			{
				var inc = t === 0 ? 0 : a.lengths[t - 1];
				toJSArray_(jsArray, i + inc, a.table[t]);
			}
		}
	}

	function fromJSArray(jsArray)
	{
		if (jsArray.length === 0)
		{
			return empty;
		}
		var h = Math.floor(Math.log(jsArray.length) / Math.log(M));
		return fromJSArray_(jsArray, h, 0, jsArray.length);
	}

	function fromJSArray_(jsArray, h, from, to)
	{
		if (h === 0)
		{
			return {
				ctor: '_Array',
				height: 0,
				table: jsArray.slice(from, to)
			};
		}

		var step = Math.pow(M, h);
		var table = new Array(Math.ceil((to - from) / step));
		var lengths = new Array(table.length);
		for (var i = 0; i < table.length; i++)
		{
			table[i] = fromJSArray_(jsArray, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
			lengths[i] = length(table[i]) + (i > 0 ? lengths[i - 1] : 0);
		}
		return {
			ctor: '_Array',
			height: h,
			table: table,
			lengths: lengths
		};
	}

	Elm.Native.Array.values = {
		empty: empty,
		fromList: fromList,
		toList: toList,
		initialize: F2(initialize),
		append: F2(append),
		push: F2(push),
		slice: F3(slice),
		get: F2(get),
		set: F3(set),
		map: F2(map),
		indexedMap: F2(indexedMap),
		foldl: F3(foldl),
		foldr: F3(foldr),
		length: length,

		toJSArray: toJSArray,
		fromJSArray: fromJSArray
	};

	return localRuntime.Native.Array.values = Elm.Native.Array.values;
};

Elm.Array = Elm.Array || {};
Elm.Array.make = function (_elm) {
   "use strict";
   _elm.Array = _elm.Array || {};
   if (_elm.Array.values) return _elm.Array.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Array = Elm.Native.Array.make(_elm);
   var _op = {};
   var append = $Native$Array.append;
   var length = $Native$Array.length;
   var isEmpty = function (array) {
      return _U.eq(length(array),0);
   };
   var slice = $Native$Array.slice;
   var set = $Native$Array.set;
   var get = F2(function (i,array) {
      return _U.cmp(0,i) < 1 && _U.cmp(i,
      $Native$Array.length(array)) < 0 ? $Maybe.Just(A2($Native$Array.get,
      i,
      array)) : $Maybe.Nothing;
   });
   var push = $Native$Array.push;
   var empty = $Native$Array.empty;
   var filter = F2(function (isOkay,arr) {
      var update = F2(function (x,xs) {
         return isOkay(x) ? A2($Native$Array.push,x,xs) : xs;
      });
      return A3($Native$Array.foldl,update,$Native$Array.empty,arr);
   });
   var foldr = $Native$Array.foldr;
   var foldl = $Native$Array.foldl;
   var indexedMap = $Native$Array.indexedMap;
   var map = $Native$Array.map;
   var toIndexedList = function (array) {
      return A3($List.map2,
      F2(function (v0,v1) {
         return {ctor: "_Tuple2",_0: v0,_1: v1};
      }),
      _U.range(0,$Native$Array.length(array) - 1),
      $Native$Array.toList(array));
   };
   var toList = $Native$Array.toList;
   var fromList = $Native$Array.fromList;
   var initialize = $Native$Array.initialize;
   var repeat = F2(function (n,e) {
      return A2(initialize,n,$Basics.always(e));
   });
   var Array = {ctor: "Array"};
   return _elm.Array.values = {_op: _op
                              ,empty: empty
                              ,repeat: repeat
                              ,initialize: initialize
                              ,fromList: fromList
                              ,isEmpty: isEmpty
                              ,length: length
                              ,push: push
                              ,append: append
                              ,get: get
                              ,set: set
                              ,slice: slice
                              ,toList: toList
                              ,toIndexedList: toIndexedList
                              ,map: map
                              ,indexedMap: indexedMap
                              ,filter: filter
                              ,foldl: foldl
                              ,foldr: foldr};
};
Elm.Dict = Elm.Dict || {};
Elm.Dict.make = function (_elm) {
   "use strict";
   _elm.Dict = _elm.Dict || {};
   if (_elm.Dict.values) return _elm.Dict.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Debug = Elm.Native.Debug.make(_elm),
   $String = Elm.String.make(_elm);
   var _op = {};
   var foldr = F3(function (f,acc,t) {
      foldr: while (true) {
         var _p0 = t;
         if (_p0.ctor === "RBEmpty_elm_builtin") {
               return acc;
            } else {
               var _v1 = f,
               _v2 = A3(f,_p0._1,_p0._2,A3(foldr,f,acc,_p0._4)),
               _v3 = _p0._3;
               f = _v1;
               acc = _v2;
               t = _v3;
               continue foldr;
            }
      }
   });
   var keys = function (dict) {
      return A3(foldr,
      F3(function (key,value,keyList) {
         return A2($List._op["::"],key,keyList);
      }),
      _U.list([]),
      dict);
   };
   var values = function (dict) {
      return A3(foldr,
      F3(function (key,value,valueList) {
         return A2($List._op["::"],value,valueList);
      }),
      _U.list([]),
      dict);
   };
   var toList = function (dict) {
      return A3(foldr,
      F3(function (key,value,list) {
         return A2($List._op["::"],
         {ctor: "_Tuple2",_0: key,_1: value},
         list);
      }),
      _U.list([]),
      dict);
   };
   var foldl = F3(function (f,acc,dict) {
      foldl: while (true) {
         var _p1 = dict;
         if (_p1.ctor === "RBEmpty_elm_builtin") {
               return acc;
            } else {
               var _v5 = f,
               _v6 = A3(f,_p1._1,_p1._2,A3(foldl,f,acc,_p1._3)),
               _v7 = _p1._4;
               f = _v5;
               acc = _v6;
               dict = _v7;
               continue foldl;
            }
      }
   });
   var reportRemBug = F4(function (msg,c,lgot,rgot) {
      return $Native$Debug.crash($String.concat(_U.list(["Internal red-black tree invariant violated, expected "
                                                        ,msg
                                                        ," and got "
                                                        ,$Basics.toString(c)
                                                        ,"/"
                                                        ,lgot
                                                        ,"/"
                                                        ,rgot
                                                        ,"\nPlease report this bug to <https://github.com/elm-lang/core/issues>"])));
   });
   var isBBlack = function (dict) {
      var _p2 = dict;
      _v8_2: do {
         if (_p2.ctor === "RBNode_elm_builtin") {
               if (_p2._0.ctor === "BBlack") {
                     return true;
                  } else {
                     break _v8_2;
                  }
            } else {
               if (_p2._0.ctor === "LBBlack") {
                     return true;
                  } else {
                     break _v8_2;
                  }
            }
      } while (false);
      return false;
   };
   var Same = {ctor: "Same"};
   var Remove = {ctor: "Remove"};
   var Insert = {ctor: "Insert"};
   var sizeHelp = F2(function (n,dict) {
      sizeHelp: while (true) {
         var _p3 = dict;
         if (_p3.ctor === "RBEmpty_elm_builtin") {
               return n;
            } else {
               var _v10 = A2(sizeHelp,n + 1,_p3._4),_v11 = _p3._3;
               n = _v10;
               dict = _v11;
               continue sizeHelp;
            }
      }
   });
   var size = function (dict) {    return A2(sizeHelp,0,dict);};
   var get = F2(function (targetKey,dict) {
      get: while (true) {
         var _p4 = dict;
         if (_p4.ctor === "RBEmpty_elm_builtin") {
               return $Maybe.Nothing;
            } else {
               var _p5 = A2($Basics.compare,targetKey,_p4._1);
               switch (_p5.ctor)
               {case "LT": var _v14 = targetKey,_v15 = _p4._3;
                    targetKey = _v14;
                    dict = _v15;
                    continue get;
                  case "EQ": return $Maybe.Just(_p4._2);
                  default: var _v16 = targetKey,_v17 = _p4._4;
                    targetKey = _v16;
                    dict = _v17;
                    continue get;}
            }
      }
   });
   var member = F2(function (key,dict) {
      var _p6 = A2(get,key,dict);
      if (_p6.ctor === "Just") {
            return true;
         } else {
            return false;
         }
   });
   var maxWithDefault = F3(function (k,v,r) {
      maxWithDefault: while (true) {
         var _p7 = r;
         if (_p7.ctor === "RBEmpty_elm_builtin") {
               return {ctor: "_Tuple2",_0: k,_1: v};
            } else {
               var _v20 = _p7._1,_v21 = _p7._2,_v22 = _p7._4;
               k = _v20;
               v = _v21;
               r = _v22;
               continue maxWithDefault;
            }
      }
   });
   var RBEmpty_elm_builtin = function (a) {
      return {ctor: "RBEmpty_elm_builtin",_0: a};
   };
   var RBNode_elm_builtin = F5(function (a,b,c,d,e) {
      return {ctor: "RBNode_elm_builtin"
             ,_0: a
             ,_1: b
             ,_2: c
             ,_3: d
             ,_4: e};
   });
   var LBBlack = {ctor: "LBBlack"};
   var LBlack = {ctor: "LBlack"};
   var empty = RBEmpty_elm_builtin(LBlack);
   var isEmpty = function (dict) {    return _U.eq(dict,empty);};
   var map = F2(function (f,dict) {
      var _p8 = dict;
      if (_p8.ctor === "RBEmpty_elm_builtin") {
            return RBEmpty_elm_builtin(LBlack);
         } else {
            var _p9 = _p8._1;
            return A5(RBNode_elm_builtin,
            _p8._0,
            _p9,
            A2(f,_p9,_p8._2),
            A2(map,f,_p8._3),
            A2(map,f,_p8._4));
         }
   });
   var NBlack = {ctor: "NBlack"};
   var BBlack = {ctor: "BBlack"};
   var Black = {ctor: "Black"};
   var ensureBlackRoot = function (dict) {
      var _p10 = dict;
      if (_p10.ctor === "RBNode_elm_builtin" && _p10._0.ctor === "Red")
      {
            return A5(RBNode_elm_builtin,
            Black,
            _p10._1,
            _p10._2,
            _p10._3,
            _p10._4);
         } else {
            return dict;
         }
   };
   var blackish = function (t) {
      var _p11 = t;
      if (_p11.ctor === "RBNode_elm_builtin") {
            var _p12 = _p11._0;
            return _U.eq(_p12,Black) || _U.eq(_p12,BBlack);
         } else {
            return true;
         }
   };
   var blacken = function (t) {
      var _p13 = t;
      if (_p13.ctor === "RBEmpty_elm_builtin") {
            return RBEmpty_elm_builtin(LBlack);
         } else {
            return A5(RBNode_elm_builtin,
            Black,
            _p13._1,
            _p13._2,
            _p13._3,
            _p13._4);
         }
   };
   var Red = {ctor: "Red"};
   var moreBlack = function (color) {
      var _p14 = color;
      switch (_p14.ctor)
      {case "Black": return BBlack;
         case "Red": return Black;
         case "NBlack": return Red;
         default:
         return $Native$Debug.crash("Can\'t make a double black node more black!");}
   };
   var lessBlack = function (color) {
      var _p15 = color;
      switch (_p15.ctor)
      {case "BBlack": return Black;
         case "Black": return Red;
         case "Red": return NBlack;
         default:
         return $Native$Debug.crash("Can\'t make a negative black node less black!");}
   };
   var lessBlackTree = function (dict) {
      var _p16 = dict;
      if (_p16.ctor === "RBNode_elm_builtin") {
            return A5(RBNode_elm_builtin,
            lessBlack(_p16._0),
            _p16._1,
            _p16._2,
            _p16._3,
            _p16._4);
         } else {
            return RBEmpty_elm_builtin(LBlack);
         }
   };
   var balancedTree = function (col) {
      return function (xk) {
         return function (xv) {
            return function (yk) {
               return function (yv) {
                  return function (zk) {
                     return function (zv) {
                        return function (a) {
                           return function (b) {
                              return function (c) {
                                 return function (d) {
                                    return A5(RBNode_elm_builtin,
                                    lessBlack(col),
                                    yk,
                                    yv,
                                    A5(RBNode_elm_builtin,Black,xk,xv,a,b),
                                    A5(RBNode_elm_builtin,Black,zk,zv,c,d));
                                 };
                              };
                           };
                        };
                     };
                  };
               };
            };
         };
      };
   };
   var redden = function (t) {
      var _p17 = t;
      if (_p17.ctor === "RBEmpty_elm_builtin") {
            return $Native$Debug.crash("can\'t make a Leaf red");
         } else {
            return A5(RBNode_elm_builtin,
            Red,
            _p17._1,
            _p17._2,
            _p17._3,
            _p17._4);
         }
   };
   var balanceHelp = function (tree) {
      var _p18 = tree;
      _v31_6: do {
         _v31_5: do {
            _v31_4: do {
               _v31_3: do {
                  _v31_2: do {
                     _v31_1: do {
                        _v31_0: do {
                           if (_p18.ctor === "RBNode_elm_builtin") {
                                 if (_p18._3.ctor === "RBNode_elm_builtin") {
                                       if (_p18._4.ctor === "RBNode_elm_builtin") {
                                             switch (_p18._3._0.ctor)
                                             {case "Red": switch (_p18._4._0.ctor)
                                                  {case "Red":
                                                     if (_p18._3._3.ctor === "RBNode_elm_builtin" && _p18._3._3._0.ctor === "Red")
                                                       {
                                                             break _v31_0;
                                                          } else {
                                                             if (_p18._3._4.ctor === "RBNode_elm_builtin" && _p18._3._4._0.ctor === "Red")
                                                             {
                                                                   break _v31_1;
                                                                } else {
                                                                   if (_p18._4._3.ctor === "RBNode_elm_builtin" && _p18._4._3._0.ctor === "Red")
                                                                   {
                                                                         break _v31_2;
                                                                      } else {
                                                                         if (_p18._4._4.ctor === "RBNode_elm_builtin" && _p18._4._4._0.ctor === "Red")
                                                                         {
                                                                               break _v31_3;
                                                                            } else {
                                                                               break _v31_6;
                                                                            }
                                                                      }
                                                                }
                                                          }
                                                     case "NBlack":
                                                     if (_p18._3._3.ctor === "RBNode_elm_builtin" && _p18._3._3._0.ctor === "Red")
                                                       {
                                                             break _v31_0;
                                                          } else {
                                                             if (_p18._3._4.ctor === "RBNode_elm_builtin" && _p18._3._4._0.ctor === "Red")
                                                             {
                                                                   break _v31_1;
                                                                } else {
                                                                   if (_p18._0.ctor === "BBlack" && _p18._4._3.ctor === "RBNode_elm_builtin" && _p18._4._3._0.ctor === "Black" && _p18._4._4.ctor === "RBNode_elm_builtin" && _p18._4._4._0.ctor === "Black")
                                                                   {
                                                                         break _v31_4;
                                                                      } else {
                                                                         break _v31_6;
                                                                      }
                                                                }
                                                          }
                                                     default:
                                                     if (_p18._3._3.ctor === "RBNode_elm_builtin" && _p18._3._3._0.ctor === "Red")
                                                       {
                                                             break _v31_0;
                                                          } else {
                                                             if (_p18._3._4.ctor === "RBNode_elm_builtin" && _p18._3._4._0.ctor === "Red")
                                                             {
                                                                   break _v31_1;
                                                                } else {
                                                                   break _v31_6;
                                                                }
                                                          }}
                                                case "NBlack": switch (_p18._4._0.ctor)
                                                  {case "Red":
                                                     if (_p18._4._3.ctor === "RBNode_elm_builtin" && _p18._4._3._0.ctor === "Red")
                                                       {
                                                             break _v31_2;
                                                          } else {
                                                             if (_p18._4._4.ctor === "RBNode_elm_builtin" && _p18._4._4._0.ctor === "Red")
                                                             {
                                                                   break _v31_3;
                                                                } else {
                                                                   if (_p18._0.ctor === "BBlack" && _p18._3._3.ctor === "RBNode_elm_builtin" && _p18._3._3._0.ctor === "Black" && _p18._3._4.ctor === "RBNode_elm_builtin" && _p18._3._4._0.ctor === "Black")
                                                                   {
                                                                         break _v31_5;
                                                                      } else {
                                                                         break _v31_6;
                                                                      }
                                                                }
                                                          }
                                                     case "NBlack": if (_p18._0.ctor === "BBlack") {
                                                             if (_p18._4._3.ctor === "RBNode_elm_builtin" && _p18._4._3._0.ctor === "Black" && _p18._4._4.ctor === "RBNode_elm_builtin" && _p18._4._4._0.ctor === "Black")
                                                             {
                                                                   break _v31_4;
                                                                } else {
                                                                   if (_p18._3._3.ctor === "RBNode_elm_builtin" && _p18._3._3._0.ctor === "Black" && _p18._3._4.ctor === "RBNode_elm_builtin" && _p18._3._4._0.ctor === "Black")
                                                                   {
                                                                         break _v31_5;
                                                                      } else {
                                                                         break _v31_6;
                                                                      }
                                                                }
                                                          } else {
                                                             break _v31_6;
                                                          }
                                                     default:
                                                     if (_p18._0.ctor === "BBlack" && _p18._3._3.ctor === "RBNode_elm_builtin" && _p18._3._3._0.ctor === "Black" && _p18._3._4.ctor === "RBNode_elm_builtin" && _p18._3._4._0.ctor === "Black")
                                                       {
                                                             break _v31_5;
                                                          } else {
                                                             break _v31_6;
                                                          }}
                                                default: switch (_p18._4._0.ctor)
                                                  {case "Red":
                                                     if (_p18._4._3.ctor === "RBNode_elm_builtin" && _p18._4._3._0.ctor === "Red")
                                                       {
                                                             break _v31_2;
                                                          } else {
                                                             if (_p18._4._4.ctor === "RBNode_elm_builtin" && _p18._4._4._0.ctor === "Red")
                                                             {
                                                                   break _v31_3;
                                                                } else {
                                                                   break _v31_6;
                                                                }
                                                          }
                                                     case "NBlack":
                                                     if (_p18._0.ctor === "BBlack" && _p18._4._3.ctor === "RBNode_elm_builtin" && _p18._4._3._0.ctor === "Black" && _p18._4._4.ctor === "RBNode_elm_builtin" && _p18._4._4._0.ctor === "Black")
                                                       {
                                                             break _v31_4;
                                                          } else {
                                                             break _v31_6;
                                                          }
                                                     default: break _v31_6;}}
                                          } else {
                                             switch (_p18._3._0.ctor)
                                             {case "Red":
                                                if (_p18._3._3.ctor === "RBNode_elm_builtin" && _p18._3._3._0.ctor === "Red")
                                                  {
                                                        break _v31_0;
                                                     } else {
                                                        if (_p18._3._4.ctor === "RBNode_elm_builtin" && _p18._3._4._0.ctor === "Red")
                                                        {
                                                              break _v31_1;
                                                           } else {
                                                              break _v31_6;
                                                           }
                                                     }
                                                case "NBlack":
                                                if (_p18._0.ctor === "BBlack" && _p18._3._3.ctor === "RBNode_elm_builtin" && _p18._3._3._0.ctor === "Black" && _p18._3._4.ctor === "RBNode_elm_builtin" && _p18._3._4._0.ctor === "Black")
                                                  {
                                                        break _v31_5;
                                                     } else {
                                                        break _v31_6;
                                                     }
                                                default: break _v31_6;}
                                          }
                                    } else {
                                       if (_p18._4.ctor === "RBNode_elm_builtin") {
                                             switch (_p18._4._0.ctor)
                                             {case "Red":
                                                if (_p18._4._3.ctor === "RBNode_elm_builtin" && _p18._4._3._0.ctor === "Red")
                                                  {
                                                        break _v31_2;
                                                     } else {
                                                        if (_p18._4._4.ctor === "RBNode_elm_builtin" && _p18._4._4._0.ctor === "Red")
                                                        {
                                                              break _v31_3;
                                                           } else {
                                                              break _v31_6;
                                                           }
                                                     }
                                                case "NBlack":
                                                if (_p18._0.ctor === "BBlack" && _p18._4._3.ctor === "RBNode_elm_builtin" && _p18._4._3._0.ctor === "Black" && _p18._4._4.ctor === "RBNode_elm_builtin" && _p18._4._4._0.ctor === "Black")
                                                  {
                                                        break _v31_4;
                                                     } else {
                                                        break _v31_6;
                                                     }
                                                default: break _v31_6;}
                                          } else {
                                             break _v31_6;
                                          }
                                    }
                              } else {
                                 break _v31_6;
                              }
                        } while (false);
                        return balancedTree(_p18._0)(_p18._3._3._1)(_p18._3._3._2)(_p18._3._1)(_p18._3._2)(_p18._1)(_p18._2)(_p18._3._3._3)(_p18._3._3._4)(_p18._3._4)(_p18._4);
                     } while (false);
                     return balancedTree(_p18._0)(_p18._3._1)(_p18._3._2)(_p18._3._4._1)(_p18._3._4._2)(_p18._1)(_p18._2)(_p18._3._3)(_p18._3._4._3)(_p18._3._4._4)(_p18._4);
                  } while (false);
                  return balancedTree(_p18._0)(_p18._1)(_p18._2)(_p18._4._3._1)(_p18._4._3._2)(_p18._4._1)(_p18._4._2)(_p18._3)(_p18._4._3._3)(_p18._4._3._4)(_p18._4._4);
               } while (false);
               return balancedTree(_p18._0)(_p18._1)(_p18._2)(_p18._4._1)(_p18._4._2)(_p18._4._4._1)(_p18._4._4._2)(_p18._3)(_p18._4._3)(_p18._4._4._3)(_p18._4._4._4);
            } while (false);
            return A5(RBNode_elm_builtin,
            Black,
            _p18._4._3._1,
            _p18._4._3._2,
            A5(RBNode_elm_builtin,
            Black,
            _p18._1,
            _p18._2,
            _p18._3,
            _p18._4._3._3),
            A5(balance,
            Black,
            _p18._4._1,
            _p18._4._2,
            _p18._4._3._4,
            redden(_p18._4._4)));
         } while (false);
         return A5(RBNode_elm_builtin,
         Black,
         _p18._3._4._1,
         _p18._3._4._2,
         A5(balance,
         Black,
         _p18._3._1,
         _p18._3._2,
         redden(_p18._3._3),
         _p18._3._4._3),
         A5(RBNode_elm_builtin,
         Black,
         _p18._1,
         _p18._2,
         _p18._3._4._4,
         _p18._4));
      } while (false);
      return tree;
   };
   var balance = F5(function (c,k,v,l,r) {
      var tree = A5(RBNode_elm_builtin,c,k,v,l,r);
      return blackish(tree) ? balanceHelp(tree) : tree;
   });
   var bubble = F5(function (c,k,v,l,r) {
      return isBBlack(l) || isBBlack(r) ? A5(balance,
      moreBlack(c),
      k,
      v,
      lessBlackTree(l),
      lessBlackTree(r)) : A5(RBNode_elm_builtin,c,k,v,l,r);
   });
   var removeMax = F5(function (c,k,v,l,r) {
      var _p19 = r;
      if (_p19.ctor === "RBEmpty_elm_builtin") {
            return A3(rem,c,l,r);
         } else {
            return A5(bubble,
            c,
            k,
            v,
            l,
            A5(removeMax,_p19._0,_p19._1,_p19._2,_p19._3,_p19._4));
         }
   });
   var rem = F3(function (c,l,r) {
      var _p20 = {ctor: "_Tuple2",_0: l,_1: r};
      if (_p20._0.ctor === "RBEmpty_elm_builtin") {
            if (_p20._1.ctor === "RBEmpty_elm_builtin") {
                  var _p21 = c;
                  switch (_p21.ctor)
                  {case "Red": return RBEmpty_elm_builtin(LBlack);
                     case "Black": return RBEmpty_elm_builtin(LBBlack);
                     default:
                     return $Native$Debug.crash("cannot have bblack or nblack nodes at this point");}
               } else {
                  var _p24 = _p20._1._0;
                  var _p23 = _p20._0._0;
                  var _p22 = {ctor: "_Tuple3",_0: c,_1: _p23,_2: _p24};
                  if (_p22.ctor === "_Tuple3" && _p22._0.ctor === "Black" && _p22._1.ctor === "LBlack" && _p22._2.ctor === "Red")
                  {
                        return A5(RBNode_elm_builtin,
                        Black,
                        _p20._1._1,
                        _p20._1._2,
                        _p20._1._3,
                        _p20._1._4);
                     } else {
                        return A4(reportRemBug,
                        "Black/LBlack/Red",
                        c,
                        $Basics.toString(_p23),
                        $Basics.toString(_p24));
                     }
               }
         } else {
            if (_p20._1.ctor === "RBEmpty_elm_builtin") {
                  var _p27 = _p20._1._0;
                  var _p26 = _p20._0._0;
                  var _p25 = {ctor: "_Tuple3",_0: c,_1: _p26,_2: _p27};
                  if (_p25.ctor === "_Tuple3" && _p25._0.ctor === "Black" && _p25._1.ctor === "Red" && _p25._2.ctor === "LBlack")
                  {
                        return A5(RBNode_elm_builtin,
                        Black,
                        _p20._0._1,
                        _p20._0._2,
                        _p20._0._3,
                        _p20._0._4);
                     } else {
                        return A4(reportRemBug,
                        "Black/Red/LBlack",
                        c,
                        $Basics.toString(_p26),
                        $Basics.toString(_p27));
                     }
               } else {
                  var _p31 = _p20._0._2;
                  var _p30 = _p20._0._4;
                  var _p29 = _p20._0._1;
                  var l$ = A5(removeMax,_p20._0._0,_p29,_p31,_p20._0._3,_p30);
                  var _p28 = A3(maxWithDefault,_p29,_p31,_p30);
                  var k = _p28._0;
                  var v = _p28._1;
                  return A5(bubble,c,k,v,l$,r);
               }
         }
   });
   var update = F3(function (k,alter,dict) {
      var up = function (dict) {
         var _p32 = dict;
         if (_p32.ctor === "RBEmpty_elm_builtin") {
               var _p33 = alter($Maybe.Nothing);
               if (_p33.ctor === "Nothing") {
                     return {ctor: "_Tuple2",_0: Same,_1: empty};
                  } else {
                     return {ctor: "_Tuple2"
                            ,_0: Insert
                            ,_1: A5(RBNode_elm_builtin,Red,k,_p33._0,empty,empty)};
                  }
            } else {
               var _p44 = _p32._2;
               var _p43 = _p32._4;
               var _p42 = _p32._3;
               var _p41 = _p32._1;
               var _p40 = _p32._0;
               var _p34 = A2($Basics.compare,k,_p41);
               switch (_p34.ctor)
               {case "EQ": var _p35 = alter($Maybe.Just(_p44));
                    if (_p35.ctor === "Nothing") {
                          return {ctor: "_Tuple2"
                                 ,_0: Remove
                                 ,_1: A3(rem,_p40,_p42,_p43)};
                       } else {
                          return {ctor: "_Tuple2"
                                 ,_0: Same
                                 ,_1: A5(RBNode_elm_builtin,_p40,_p41,_p35._0,_p42,_p43)};
                       }
                  case "LT": var _p36 = up(_p42);
                    var flag = _p36._0;
                    var newLeft = _p36._1;
                    var _p37 = flag;
                    switch (_p37.ctor)
                    {case "Same": return {ctor: "_Tuple2"
                                         ,_0: Same
                                         ,_1: A5(RBNode_elm_builtin,_p40,_p41,_p44,newLeft,_p43)};
                       case "Insert": return {ctor: "_Tuple2"
                                             ,_0: Insert
                                             ,_1: A5(balance,_p40,_p41,_p44,newLeft,_p43)};
                       default: return {ctor: "_Tuple2"
                                       ,_0: Remove
                                       ,_1: A5(bubble,_p40,_p41,_p44,newLeft,_p43)};}
                  default: var _p38 = up(_p43);
                    var flag = _p38._0;
                    var newRight = _p38._1;
                    var _p39 = flag;
                    switch (_p39.ctor)
                    {case "Same": return {ctor: "_Tuple2"
                                         ,_0: Same
                                         ,_1: A5(RBNode_elm_builtin,_p40,_p41,_p44,_p42,newRight)};
                       case "Insert": return {ctor: "_Tuple2"
                                             ,_0: Insert
                                             ,_1: A5(balance,_p40,_p41,_p44,_p42,newRight)};
                       default: return {ctor: "_Tuple2"
                                       ,_0: Remove
                                       ,_1: A5(bubble,_p40,_p41,_p44,_p42,newRight)};}}
            }
      };
      var _p45 = up(dict);
      var flag = _p45._0;
      var updatedDict = _p45._1;
      var _p46 = flag;
      switch (_p46.ctor)
      {case "Same": return updatedDict;
         case "Insert": return ensureBlackRoot(updatedDict);
         default: return blacken(updatedDict);}
   });
   var insert = F3(function (key,value,dict) {
      return A3(update,
      key,
      $Basics.always($Maybe.Just(value)),
      dict);
   });
   var singleton = F2(function (key,value) {
      return A3(insert,key,value,empty);
   });
   var union = F2(function (t1,t2) {
      return A3(foldl,insert,t2,t1);
   });
   var fromList = function (assocs) {
      return A3($List.foldl,
      F2(function (_p47,dict) {
         var _p48 = _p47;
         return A3(insert,_p48._0,_p48._1,dict);
      }),
      empty,
      assocs);
   };
   var filter = F2(function (predicate,dictionary) {
      var add = F3(function (key,value,dict) {
         return A2(predicate,key,value) ? A3(insert,
         key,
         value,
         dict) : dict;
      });
      return A3(foldl,add,empty,dictionary);
   });
   var intersect = F2(function (t1,t2) {
      return A2(filter,
      F2(function (k,_p49) {    return A2(member,k,t2);}),
      t1);
   });
   var partition = F2(function (predicate,dict) {
      var add = F3(function (key,value,_p50) {
         var _p51 = _p50;
         var _p53 = _p51._1;
         var _p52 = _p51._0;
         return A2(predicate,key,value) ? {ctor: "_Tuple2"
                                          ,_0: A3(insert,key,value,_p52)
                                          ,_1: _p53} : {ctor: "_Tuple2"
                                                       ,_0: _p52
                                                       ,_1: A3(insert,key,value,_p53)};
      });
      return A3(foldl,add,{ctor: "_Tuple2",_0: empty,_1: empty},dict);
   });
   var remove = F2(function (key,dict) {
      return A3(update,key,$Basics.always($Maybe.Nothing),dict);
   });
   var diff = F2(function (t1,t2) {
      return A3(foldl,
      F3(function (k,v,t) {    return A2(remove,k,t);}),
      t1,
      t2);
   });
   return _elm.Dict.values = {_op: _op
                             ,empty: empty
                             ,singleton: singleton
                             ,insert: insert
                             ,update: update
                             ,isEmpty: isEmpty
                             ,get: get
                             ,remove: remove
                             ,member: member
                             ,size: size
                             ,filter: filter
                             ,partition: partition
                             ,foldl: foldl
                             ,foldr: foldr
                             ,map: map
                             ,union: union
                             ,intersect: intersect
                             ,diff: diff
                             ,keys: keys
                             ,values: values
                             ,toList: toList
                             ,fromList: fromList};
};
Elm.Json = Elm.Json || {};
Elm.Json.Encode = Elm.Json.Encode || {};
Elm.Json.Encode.make = function (_elm) {
   "use strict";
   _elm.Json = _elm.Json || {};
   _elm.Json.Encode = _elm.Json.Encode || {};
   if (_elm.Json.Encode.values) return _elm.Json.Encode.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Array = Elm.Array.make(_elm),
   $Native$Json = Elm.Native.Json.make(_elm);
   var _op = {};
   var list = $Native$Json.encodeList;
   var array = $Native$Json.encodeArray;
   var object = $Native$Json.encodeObject;
   var $null = $Native$Json.encodeNull;
   var bool = $Native$Json.identity;
   var $float = $Native$Json.identity;
   var $int = $Native$Json.identity;
   var string = $Native$Json.identity;
   var encode = $Native$Json.encode;
   var Value = {ctor: "Value"};
   return _elm.Json.Encode.values = {_op: _op
                                    ,encode: encode
                                    ,string: string
                                    ,$int: $int
                                    ,$float: $float
                                    ,bool: bool
                                    ,$null: $null
                                    ,list: list
                                    ,array: array
                                    ,object: object};
};
Elm.Json = Elm.Json || {};
Elm.Json.Decode = Elm.Json.Decode || {};
Elm.Json.Decode.make = function (_elm) {
   "use strict";
   _elm.Json = _elm.Json || {};
   _elm.Json.Decode = _elm.Json.Decode || {};
   if (_elm.Json.Decode.values) return _elm.Json.Decode.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Array = Elm.Array.make(_elm),
   $Dict = Elm.Dict.make(_elm),
   $Json$Encode = Elm.Json.Encode.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Json = Elm.Native.Json.make(_elm),
   $Result = Elm.Result.make(_elm);
   var _op = {};
   var tuple8 = $Native$Json.decodeTuple8;
   var tuple7 = $Native$Json.decodeTuple7;
   var tuple6 = $Native$Json.decodeTuple6;
   var tuple5 = $Native$Json.decodeTuple5;
   var tuple4 = $Native$Json.decodeTuple4;
   var tuple3 = $Native$Json.decodeTuple3;
   var tuple2 = $Native$Json.decodeTuple2;
   var tuple1 = $Native$Json.decodeTuple1;
   var succeed = $Native$Json.succeed;
   var fail = $Native$Json.fail;
   var andThen = $Native$Json.andThen;
   var customDecoder = $Native$Json.customDecoder;
   var decodeValue = $Native$Json.runDecoderValue;
   var value = $Native$Json.decodeValue;
   var maybe = $Native$Json.decodeMaybe;
   var $null = $Native$Json.decodeNull;
   var array = $Native$Json.decodeArray;
   var list = $Native$Json.decodeList;
   var bool = $Native$Json.decodeBool;
   var $int = $Native$Json.decodeInt;
   var $float = $Native$Json.decodeFloat;
   var string = $Native$Json.decodeString;
   var oneOf = $Native$Json.oneOf;
   var keyValuePairs = $Native$Json.decodeKeyValuePairs;
   var object8 = $Native$Json.decodeObject8;
   var object7 = $Native$Json.decodeObject7;
   var object6 = $Native$Json.decodeObject6;
   var object5 = $Native$Json.decodeObject5;
   var object4 = $Native$Json.decodeObject4;
   var object3 = $Native$Json.decodeObject3;
   var object2 = $Native$Json.decodeObject2;
   var object1 = $Native$Json.decodeObject1;
   _op[":="] = $Native$Json.decodeField;
   var at = F2(function (fields,decoder) {
      return A3($List.foldr,
      F2(function (x,y) {    return A2(_op[":="],x,y);}),
      decoder,
      fields);
   });
   var decodeString = $Native$Json.runDecoderString;
   var map = $Native$Json.decodeObject1;
   var dict = function (decoder) {
      return A2(map,$Dict.fromList,keyValuePairs(decoder));
   };
   var Decoder = {ctor: "Decoder"};
   return _elm.Json.Decode.values = {_op: _op
                                    ,decodeString: decodeString
                                    ,decodeValue: decodeValue
                                    ,string: string
                                    ,$int: $int
                                    ,$float: $float
                                    ,bool: bool
                                    ,$null: $null
                                    ,list: list
                                    ,array: array
                                    ,tuple1: tuple1
                                    ,tuple2: tuple2
                                    ,tuple3: tuple3
                                    ,tuple4: tuple4
                                    ,tuple5: tuple5
                                    ,tuple6: tuple6
                                    ,tuple7: tuple7
                                    ,tuple8: tuple8
                                    ,at: at
                                    ,object1: object1
                                    ,object2: object2
                                    ,object3: object3
                                    ,object4: object4
                                    ,object5: object5
                                    ,object6: object6
                                    ,object7: object7
                                    ,object8: object8
                                    ,keyValuePairs: keyValuePairs
                                    ,dict: dict
                                    ,maybe: maybe
                                    ,oneOf: oneOf
                                    ,map: map
                                    ,fail: fail
                                    ,succeed: succeed
                                    ,andThen: andThen
                                    ,value: value
                                    ,customDecoder: customDecoder};
};
Elm.DOM = Elm.DOM || {};
Elm.DOM.make = function (_elm) {
   "use strict";
   _elm.DOM = _elm.DOM || {};
   if (_elm.DOM.values) return _elm.DOM.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Json$Decode = Elm.Json.Decode.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   var className = A2($Json$Decode.at,
   _U.list(["className"]),
   $Json$Decode.string);
   var Rectangle = F4(function (a,b,c,d) {
      return {top: a,left: b,width: c,height: d};
   });
   var scrollTop = A2($Json$Decode._op[":="],
   "scrollTop",
   $Json$Decode.$float);
   var scrollLeft = A2($Json$Decode._op[":="],
   "scrollLeft",
   $Json$Decode.$float);
   var offsetTop = A2($Json$Decode._op[":="],
   "offsetTop",
   $Json$Decode.$float);
   var offsetLeft = A2($Json$Decode._op[":="],
   "offsetLeft",
   $Json$Decode.$float);
   var offsetHeight = A2($Json$Decode._op[":="],
   "offsetHeight",
   $Json$Decode.$float);
   var offsetWidth = A2($Json$Decode._op[":="],
   "offsetWidth",
   $Json$Decode.$float);
   var childNodes = function (decoder) {
      var loop = F2(function (idx,xs) {
         return A2($Json$Decode.andThen,
         $Json$Decode.maybe(A2($Json$Decode._op[":="],
         $Basics.toString(idx),
         decoder)),
         function (_p0) {
            return A2($Maybe.withDefault,
            $Json$Decode.succeed(xs),
            A2($Maybe.map,
            function (x) {
               return A2(loop,idx + 1,A2($List._op["::"],x,xs));
            },
            _p0));
         });
      });
      return A2($Json$Decode.map,
      $List.reverse,
      A2($Json$Decode._op[":="],"childNodes",A2(loop,0,_U.list([]))));
   };
   var childNode = function (idx) {
      return $Json$Decode.at(_U.list(["childNodes"
                                     ,$Basics.toString(idx)]));
   };
   var parentElement = function (decoder) {
      return A2($Json$Decode._op[":="],"parentElement",decoder);
   };
   var previousSibling = function (decoder) {
      return A2($Json$Decode._op[":="],"previousSibling",decoder);
   };
   var nextSibling = function (decoder) {
      return A2($Json$Decode._op[":="],"nextSibling",decoder);
   };
   var offsetParent = F2(function (x,decoder) {
      return $Json$Decode.oneOf(_U.list([A2($Json$Decode._op[":="],
                                        "offsetParent",
                                        $Json$Decode.$null(x))
                                        ,A2($Json$Decode._op[":="],"offsetParent",decoder)]));
   });
   var position = F2(function (x,y) {
      return A2($Json$Decode.andThen,
      A5($Json$Decode.object4,
      F4(function (scrollLeft,scrollTop,offsetLeft,offsetTop) {
         return {ctor: "_Tuple2"
                ,_0: x + offsetLeft - scrollLeft
                ,_1: y + offsetTop - scrollTop};
      }),
      scrollLeft,
      scrollTop,
      offsetLeft,
      offsetTop),
      function (_p1) {
         var _p2 = _p1;
         var _p4 = _p2._1;
         var _p3 = _p2._0;
         return A2(offsetParent,
         {ctor: "_Tuple2",_0: _p3,_1: _p4},
         A2(position,_p3,_p4));
      });
   });
   var boundingClientRect = A4($Json$Decode.object3,
   F3(function (_p5,width,height) {
      var _p6 = _p5;
      return {top: _p6._1,left: _p6._0,width: width,height: height};
   }),
   A2(position,0,0),
   offsetWidth,
   offsetHeight);
   var target = function (decoder) {
      return A2($Json$Decode._op[":="],"target",decoder);
   };
   return _elm.DOM.values = {_op: _op
                            ,target: target
                            ,offsetParent: offsetParent
                            ,parentElement: parentElement
                            ,nextSibling: nextSibling
                            ,previousSibling: previousSibling
                            ,childNode: childNode
                            ,childNodes: childNodes
                            ,offsetWidth: offsetWidth
                            ,offsetHeight: offsetHeight
                            ,offsetLeft: offsetLeft
                            ,offsetTop: offsetTop
                            ,scrollLeft: scrollLeft
                            ,scrollTop: scrollTop
                            ,boundingClientRect: boundingClientRect
                            ,className: className
                            ,Rectangle: Rectangle};
};
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":1}],3:[function(require,module,exports){
"use strict";

module.exports = function isObject(x) {
	return typeof x === "object" && x !== null;
};

},{}],4:[function(require,module,exports){
var nativeIsArray = Array.isArray
var toString = Object.prototype.toString

module.exports = nativeIsArray || isArray

function isArray(obj) {
    return toString.call(obj) === "[object Array]"
}

},{}],5:[function(require,module,exports){
var isObject = require("is-object")
var isHook = require("../vnode/is-vhook.js")

module.exports = applyProperties

function applyProperties(node, props, previous) {
    for (var propName in props) {
        var propValue = props[propName]

        if (propValue === undefined) {
            removeProperty(node, propName, propValue, previous);
        } else if (isHook(propValue)) {
            removeProperty(node, propName, propValue, previous)
            if (propValue.hook) {
                propValue.hook(node,
                    propName,
                    previous ? previous[propName] : undefined)
            }
        } else {
            if (isObject(propValue)) {
                patchObject(node, props, previous, propName, propValue);
            } else {
                node[propName] = propValue
            }
        }
    }
}

function removeProperty(node, propName, propValue, previous) {
    if (previous) {
        var previousValue = previous[propName]

        if (!isHook(previousValue)) {
            if (propName === "attributes") {
                for (var attrName in previousValue) {
                    node.removeAttribute(attrName)
                }
            } else if (propName === "style") {
                for (var i in previousValue) {
                    node.style[i] = ""
                }
            } else if (typeof previousValue === "string") {
                node[propName] = ""
            } else {
                node[propName] = null
            }
        } else if (previousValue.unhook) {
            previousValue.unhook(node, propName, propValue)
        }
    }
}

function patchObject(node, props, previous, propName, propValue) {
    var previousValue = previous ? previous[propName] : undefined

    // Set attributes
    if (propName === "attributes") {
        for (var attrName in propValue) {
            var attrValue = propValue[attrName]

            if (attrValue === undefined) {
                node.removeAttribute(attrName)
            } else {
                node.setAttribute(attrName, attrValue)
            }
        }

        return
    }

    if(previousValue && isObject(previousValue) &&
        getPrototype(previousValue) !== getPrototype(propValue)) {
        node[propName] = propValue
        return
    }

    if (!isObject(node[propName])) {
        node[propName] = {}
    }

    var replacer = propName === "style" ? "" : undefined

    for (var k in propValue) {
        var value = propValue[k]
        node[propName][k] = (value === undefined) ? replacer : value
    }
}

function getPrototype(value) {
    if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(value)
    } else if (value.__proto__) {
        return value.__proto__
    } else if (value.constructor) {
        return value.constructor.prototype
    }
}

},{"../vnode/is-vhook.js":13,"is-object":3}],6:[function(require,module,exports){
var document = require("global/document")

var applyProperties = require("./apply-properties")

var isVNode = require("../vnode/is-vnode.js")
var isVText = require("../vnode/is-vtext.js")
var isWidget = require("../vnode/is-widget.js")
var handleThunk = require("../vnode/handle-thunk.js")

module.exports = createElement

function createElement(vnode, opts) {
    var doc = opts ? opts.document || document : document
    var warn = opts ? opts.warn : null

    vnode = handleThunk(vnode).a

    if (isWidget(vnode)) {
        return vnode.init()
    } else if (isVText(vnode)) {
        return doc.createTextNode(vnode.text)
    } else if (!isVNode(vnode)) {
        if (warn) {
            warn("Item is not a valid virtual dom node", vnode)
        }
        return null
    }

    var node = (vnode.namespace === null) ?
        doc.createElement(vnode.tagName) :
        doc.createElementNS(vnode.namespace, vnode.tagName)

    var props = vnode.properties
    applyProperties(node, props)

    var children = vnode.children

    for (var i = 0; i < children.length; i++) {
        var childNode = createElement(children[i], opts)
        if (childNode) {
            node.appendChild(childNode)
        }
    }

    return node
}

},{"../vnode/handle-thunk.js":11,"../vnode/is-vnode.js":14,"../vnode/is-vtext.js":15,"../vnode/is-widget.js":16,"./apply-properties":5,"global/document":2}],7:[function(require,module,exports){
// Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
// We don't want to read all of the DOM nodes in the tree so we use
// the in-order tree indexing to eliminate recursion down certain branches.
// We only recurse into a DOM node if we know that it contains a child of
// interest.

var noChild = {}

module.exports = domIndex

function domIndex(rootNode, tree, indices, nodes) {
    if (!indices || indices.length === 0) {
        return {}
    } else {
        indices.sort(ascending)
        return recurse(rootNode, tree, indices, nodes, 0)
    }
}

function recurse(rootNode, tree, indices, nodes, rootIndex) {
    nodes = nodes || {}


    if (rootNode) {
        if (indexInRange(indices, rootIndex, rootIndex)) {
            nodes[rootIndex] = rootNode
        }

        var vChildren = tree.children

        if (vChildren) {

            var childNodes = rootNode.childNodes

            for (var i = 0; i < tree.children.length; i++) {
                rootIndex += 1

                var vChild = vChildren[i] || noChild
                var nextIndex = rootIndex + (vChild.count || 0)

                // skip recursion down the tree if there are no nodes down here
                if (indexInRange(indices, rootIndex, nextIndex)) {
                    recurse(childNodes[i], vChild, indices, nodes, rootIndex)
                }

                rootIndex = nextIndex
            }
        }
    }

    return nodes
}

// Binary search for an index in the interval [left, right]
function indexInRange(indices, left, right) {
    if (indices.length === 0) {
        return false
    }

    var minIndex = 0
    var maxIndex = indices.length - 1
    var currentIndex
    var currentItem

    while (minIndex <= maxIndex) {
        currentIndex = ((maxIndex + minIndex) / 2) >> 0
        currentItem = indices[currentIndex]

        if (minIndex === maxIndex) {
            return currentItem >= left && currentItem <= right
        } else if (currentItem < left) {
            minIndex = currentIndex + 1
        } else  if (currentItem > right) {
            maxIndex = currentIndex - 1
        } else {
            return true
        }
    }

    return false;
}

function ascending(a, b) {
    return a > b ? 1 : -1
}

},{}],8:[function(require,module,exports){
var applyProperties = require("./apply-properties")

var isWidget = require("../vnode/is-widget.js")
var VPatch = require("../vnode/vpatch.js")

var render = require("./create-element")
var updateWidget = require("./update-widget")

module.exports = applyPatch

function applyPatch(vpatch, domNode, renderOptions) {
    var type = vpatch.type
    var vNode = vpatch.vNode
    var patch = vpatch.patch

    switch (type) {
        case VPatch.REMOVE:
            return removeNode(domNode, vNode)
        case VPatch.INSERT:
            return insertNode(domNode, patch, renderOptions)
        case VPatch.VTEXT:
            return stringPatch(domNode, vNode, patch, renderOptions)
        case VPatch.WIDGET:
            return widgetPatch(domNode, vNode, patch, renderOptions)
        case VPatch.VNODE:
            return vNodePatch(domNode, vNode, patch, renderOptions)
        case VPatch.ORDER:
            reorderChildren(domNode, patch)
            return domNode
        case VPatch.PROPS:
            applyProperties(domNode, patch, vNode.properties)
            return domNode
        case VPatch.THUNK:
            return replaceRoot(domNode,
                renderOptions.patch(domNode, patch, renderOptions))
        default:
            return domNode
    }
}

function removeNode(domNode, vNode) {
    var parentNode = domNode.parentNode

    if (parentNode) {
        parentNode.removeChild(domNode)
    }

    destroyWidget(domNode, vNode);

    return null
}

function insertNode(parentNode, vNode, renderOptions) {
    var newNode = render(vNode, renderOptions)

    if (parentNode) {
        parentNode.appendChild(newNode)
    }

    return parentNode
}

function stringPatch(domNode, leftVNode, vText, renderOptions) {
    var newNode

    if (domNode.nodeType === 3) {
        domNode.replaceData(0, domNode.length, vText.text)
        newNode = domNode
    } else {
        var parentNode = domNode.parentNode
        newNode = render(vText, renderOptions)

        if (parentNode && newNode !== domNode) {
            parentNode.replaceChild(newNode, domNode)
        }
    }

    return newNode
}

function widgetPatch(domNode, leftVNode, widget, renderOptions) {
    var updating = updateWidget(leftVNode, widget)
    var newNode

    if (updating) {
        newNode = widget.update(leftVNode, domNode) || domNode
    } else {
        newNode = render(widget, renderOptions)
    }

    var parentNode = domNode.parentNode

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    if (!updating) {
        destroyWidget(domNode, leftVNode)
    }

    return newNode
}

function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
    var parentNode = domNode.parentNode
    var newNode = render(vNode, renderOptions)

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    return newNode
}

function destroyWidget(domNode, w) {
    if (typeof w.destroy === "function" && isWidget(w)) {
        w.destroy(domNode)
    }
}

function reorderChildren(domNode, moves) {
    var childNodes = domNode.childNodes
    var keyMap = {}
    var node
    var remove
    var insert

    for (var i = 0; i < moves.removes.length; i++) {
        remove = moves.removes[i]
        node = childNodes[remove.from]
        if (remove.key) {
            keyMap[remove.key] = node
        }
        domNode.removeChild(node)
    }

    var length = childNodes.length
    for (var j = 0; j < moves.inserts.length; j++) {
        insert = moves.inserts[j]
        node = keyMap[insert.key]
        // this is the weirdest bug i've ever seen in webkit
        domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to])
    }
}

function replaceRoot(oldRoot, newRoot) {
    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
        oldRoot.parentNode.replaceChild(newRoot, oldRoot)
    }

    return newRoot;
}

},{"../vnode/is-widget.js":16,"../vnode/vpatch.js":19,"./apply-properties":5,"./create-element":6,"./update-widget":10}],9:[function(require,module,exports){
var document = require("global/document")
var isArray = require("x-is-array")

var domIndex = require("./dom-index")
var patchOp = require("./patch-op")
module.exports = patch

function patch(rootNode, patches) {
    return patchRecursive(rootNode, patches)
}

function patchRecursive(rootNode, patches, renderOptions) {
    var indices = patchIndices(patches)

    if (indices.length === 0) {
        return rootNode
    }

    var index = domIndex(rootNode, patches.a, indices)
    var ownerDocument = rootNode.ownerDocument

    if (!renderOptions) {
        renderOptions = { patch: patchRecursive }
        if (ownerDocument !== document) {
            renderOptions.document = ownerDocument
        }
    }

    for (var i = 0; i < indices.length; i++) {
        var nodeIndex = indices[i]
        rootNode = applyPatch(rootNode,
            index[nodeIndex],
            patches[nodeIndex],
            renderOptions)
    }

    return rootNode
}

function applyPatch(rootNode, domNode, patchList, renderOptions) {
    if (!domNode) {
        return rootNode
    }

    var newNode

    if (isArray(patchList)) {
        for (var i = 0; i < patchList.length; i++) {
            newNode = patchOp(patchList[i], domNode, renderOptions)

            if (domNode === rootNode) {
                rootNode = newNode
            }
        }
    } else {
        newNode = patchOp(patchList, domNode, renderOptions)

        if (domNode === rootNode) {
            rootNode = newNode
        }
    }

    return rootNode
}

function patchIndices(patches) {
    var indices = []

    for (var key in patches) {
        if (key !== "a") {
            indices.push(Number(key))
        }
    }

    return indices
}

},{"./dom-index":7,"./patch-op":8,"global/document":2,"x-is-array":4}],10:[function(require,module,exports){
var isWidget = require("../vnode/is-widget.js")

module.exports = updateWidget

function updateWidget(a, b) {
    if (isWidget(a) && isWidget(b)) {
        if ("name" in a && "name" in b) {
            return a.id === b.id
        } else {
            return a.init === b.init
        }
    }

    return false
}

},{"../vnode/is-widget.js":16}],11:[function(require,module,exports){
var isVNode = require("./is-vnode")
var isVText = require("./is-vtext")
var isWidget = require("./is-widget")
var isThunk = require("./is-thunk")

module.exports = handleThunk

function handleThunk(a, b) {
    var renderedA = a
    var renderedB = b

    if (isThunk(b)) {
        renderedB = renderThunk(b, a)
    }

    if (isThunk(a)) {
        renderedA = renderThunk(a, null)
    }

    return {
        a: renderedA,
        b: renderedB
    }
}

function renderThunk(thunk, previous) {
    var renderedThunk = thunk.vnode

    if (!renderedThunk) {
        renderedThunk = thunk.vnode = thunk.render(previous)
    }

    if (!(isVNode(renderedThunk) ||
            isVText(renderedThunk) ||
            isWidget(renderedThunk))) {
        throw new Error("thunk did not return a valid node");
    }

    return renderedThunk
}

},{"./is-thunk":12,"./is-vnode":14,"./is-vtext":15,"./is-widget":16}],12:[function(require,module,exports){
module.exports = isThunk

function isThunk(t) {
    return t && t.type === "Thunk"
}

},{}],13:[function(require,module,exports){
module.exports = isHook

function isHook(hook) {
    return hook &&
      (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") ||
       typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"))
}

},{}],14:[function(require,module,exports){
var version = require("./version")

module.exports = isVirtualNode

function isVirtualNode(x) {
    return x && x.type === "VirtualNode" && x.version === version
}

},{"./version":17}],15:[function(require,module,exports){
var version = require("./version")

module.exports = isVirtualText

function isVirtualText(x) {
    return x && x.type === "VirtualText" && x.version === version
}

},{"./version":17}],16:[function(require,module,exports){
module.exports = isWidget

function isWidget(w) {
    return w && w.type === "Widget"
}

},{}],17:[function(require,module,exports){
module.exports = "2"

},{}],18:[function(require,module,exports){
var version = require("./version")
var isVNode = require("./is-vnode")
var isWidget = require("./is-widget")
var isThunk = require("./is-thunk")
var isVHook = require("./is-vhook")

module.exports = VirtualNode

var noProperties = {}
var noChildren = []

function VirtualNode(tagName, properties, children, key, namespace) {
    this.tagName = tagName
    this.properties = properties || noProperties
    this.children = children || noChildren
    this.key = key != null ? String(key) : undefined
    this.namespace = (typeof namespace === "string") ? namespace : null

    var count = (children && children.length) || 0
    var descendants = 0
    var hasWidgets = false
    var hasThunks = false
    var descendantHooks = false
    var hooks

    for (var propName in properties) {
        if (properties.hasOwnProperty(propName)) {
            var property = properties[propName]
            if (isVHook(property) && property.unhook) {
                if (!hooks) {
                    hooks = {}
                }

                hooks[propName] = property
            }
        }
    }

    for (var i = 0; i < count; i++) {
        var child = children[i]
        if (isVNode(child)) {
            descendants += child.count || 0

            if (!hasWidgets && child.hasWidgets) {
                hasWidgets = true
            }

            if (!hasThunks && child.hasThunks) {
                hasThunks = true
            }

            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
                descendantHooks = true
            }
        } else if (!hasWidgets && isWidget(child)) {
            if (typeof child.destroy === "function") {
                hasWidgets = true
            }
        } else if (!hasThunks && isThunk(child)) {
            hasThunks = true;
        }
    }

    this.count = count + descendants
    this.hasWidgets = hasWidgets
    this.hasThunks = hasThunks
    this.hooks = hooks
    this.descendantHooks = descendantHooks
}

VirtualNode.prototype.version = version
VirtualNode.prototype.type = "VirtualNode"

},{"./is-thunk":12,"./is-vhook":13,"./is-vnode":14,"./is-widget":16,"./version":17}],19:[function(require,module,exports){
var version = require("./version")

VirtualPatch.NONE = 0
VirtualPatch.VTEXT = 1
VirtualPatch.VNODE = 2
VirtualPatch.WIDGET = 3
VirtualPatch.PROPS = 4
VirtualPatch.ORDER = 5
VirtualPatch.INSERT = 6
VirtualPatch.REMOVE = 7
VirtualPatch.THUNK = 8

module.exports = VirtualPatch

function VirtualPatch(type, vNode, patch) {
    this.type = Number(type)
    this.vNode = vNode
    this.patch = patch
}

VirtualPatch.prototype.version = version
VirtualPatch.prototype.type = "VirtualPatch"

},{"./version":17}],20:[function(require,module,exports){
var version = require("./version")

module.exports = VirtualText

function VirtualText(text) {
    this.text = String(text)
}

VirtualText.prototype.version = version
VirtualText.prototype.type = "VirtualText"

},{"./version":17}],21:[function(require,module,exports){
var isObject = require("is-object")
var isHook = require("../vnode/is-vhook")

module.exports = diffProps

function diffProps(a, b) {
    var diff

    for (var aKey in a) {
        if (!(aKey in b)) {
            diff = diff || {}
            diff[aKey] = undefined
        }

        var aValue = a[aKey]
        var bValue = b[aKey]

        if (aValue === bValue) {
            continue
        } else if (isObject(aValue) && isObject(bValue)) {
            if (getPrototype(bValue) !== getPrototype(aValue)) {
                diff = diff || {}
                diff[aKey] = bValue
            } else if (isHook(bValue)) {
                 diff = diff || {}
                 diff[aKey] = bValue
            } else {
                var objectDiff = diffProps(aValue, bValue)
                if (objectDiff) {
                    diff = diff || {}
                    diff[aKey] = objectDiff
                }
            }
        } else {
            diff = diff || {}
            diff[aKey] = bValue
        }
    }

    for (var bKey in b) {
        if (!(bKey in a)) {
            diff = diff || {}
            diff[bKey] = b[bKey]
        }
    }

    return diff
}

function getPrototype(value) {
  if (Object.getPrototypeOf) {
    return Object.getPrototypeOf(value)
  } else if (value.__proto__) {
    return value.__proto__
  } else if (value.constructor) {
    return value.constructor.prototype
  }
}

},{"../vnode/is-vhook":13,"is-object":3}],22:[function(require,module,exports){
var isArray = require("x-is-array")

var VPatch = require("../vnode/vpatch")
var isVNode = require("../vnode/is-vnode")
var isVText = require("../vnode/is-vtext")
var isWidget = require("../vnode/is-widget")
var isThunk = require("../vnode/is-thunk")
var handleThunk = require("../vnode/handle-thunk")

var diffProps = require("./diff-props")

module.exports = diff

function diff(a, b) {
    var patch = { a: a }
    walk(a, b, patch, 0)
    return patch
}

function walk(a, b, patch, index) {
    if (a === b) {
        return
    }

    var apply = patch[index]
    var applyClear = false

    if (isThunk(a) || isThunk(b)) {
        thunks(a, b, patch, index)
    } else if (b == null) {

        // If a is a widget we will add a remove patch for it
        // Otherwise any child widgets/hooks must be destroyed.
        // This prevents adding two remove patches for a widget.
        if (!isWidget(a)) {
            clearState(a, patch, index)
            apply = patch[index]
        }

        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b))
    } else if (isVNode(b)) {
        if (isVNode(a)) {
            if (a.tagName === b.tagName &&
                a.namespace === b.namespace &&
                a.key === b.key) {
                var propsPatch = diffProps(a.properties, b.properties)
                if (propsPatch) {
                    apply = appendPatch(apply,
                        new VPatch(VPatch.PROPS, a, propsPatch))
                }
                apply = diffChildren(a, b, patch, apply, index)
            } else {
                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
                applyClear = true
            }
        } else {
            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
            applyClear = true
        }
    } else if (isVText(b)) {
        if (!isVText(a)) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
            applyClear = true
        } else if (a.text !== b.text) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
        }
    } else if (isWidget(b)) {
        if (!isWidget(a)) {
            applyClear = true
        }

        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b))
    }

    if (apply) {
        patch[index] = apply
    }

    if (applyClear) {
        clearState(a, patch, index)
    }
}

function diffChildren(a, b, patch, apply, index) {
    var aChildren = a.children
    var orderedSet = reorder(aChildren, b.children)
    var bChildren = orderedSet.children

    var aLen = aChildren.length
    var bLen = bChildren.length
    var len = aLen > bLen ? aLen : bLen

    for (var i = 0; i < len; i++) {
        var leftNode = aChildren[i]
        var rightNode = bChildren[i]
        index += 1

        if (!leftNode) {
            if (rightNode) {
                // Excess nodes in b need to be added
                apply = appendPatch(apply,
                    new VPatch(VPatch.INSERT, null, rightNode))
            }
        } else {
            walk(leftNode, rightNode, patch, index)
        }

        if (isVNode(leftNode) && leftNode.count) {
            index += leftNode.count
        }
    }

    if (orderedSet.moves) {
        // Reorder nodes last
        apply = appendPatch(apply, new VPatch(
            VPatch.ORDER,
            a,
            orderedSet.moves
        ))
    }

    return apply
}

function clearState(vNode, patch, index) {
    // TODO: Make this a single walk, not two
    unhook(vNode, patch, index)
    destroyWidgets(vNode, patch, index)
}

// Patch records for all destroyed widgets must be added because we need
// a DOM node reference for the destroy function
function destroyWidgets(vNode, patch, index) {
    if (isWidget(vNode)) {
        if (typeof vNode.destroy === "function") {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(VPatch.REMOVE, vNode, null)
            )
        }
    } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
        var children = vNode.children
        var len = children.length
        for (var i = 0; i < len; i++) {
            var child = children[i]
            index += 1

            destroyWidgets(child, patch, index)

            if (isVNode(child) && child.count) {
                index += child.count
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index)
    }
}

// Create a sub-patch for thunks
function thunks(a, b, patch, index) {
    var nodes = handleThunk(a, b)
    var thunkPatch = diff(nodes.a, nodes.b)
    if (hasPatches(thunkPatch)) {
        patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch)
    }
}

function hasPatches(patch) {
    for (var index in patch) {
        if (index !== "a") {
            return true
        }
    }

    return false
}

// Execute hooks when two nodes are identical
function unhook(vNode, patch, index) {
    if (isVNode(vNode)) {
        if (vNode.hooks) {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(
                    VPatch.PROPS,
                    vNode,
                    undefinedKeys(vNode.hooks)
                )
            )
        }

        if (vNode.descendantHooks || vNode.hasThunks) {
            var children = vNode.children
            var len = children.length
            for (var i = 0; i < len; i++) {
                var child = children[i]
                index += 1

                unhook(child, patch, index)

                if (isVNode(child) && child.count) {
                    index += child.count
                }
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index)
    }
}

function undefinedKeys(obj) {
    var result = {}

    for (var key in obj) {
        result[key] = undefined
    }

    return result
}

// List diff, naive left to right reordering
function reorder(aChildren, bChildren) {
    // O(M) time, O(M) memory
    var bChildIndex = keyIndex(bChildren)
    var bKeys = bChildIndex.keys
    var bFree = bChildIndex.free

    if (bFree.length === bChildren.length) {
        return {
            children: bChildren,
            moves: null
        }
    }

    // O(N) time, O(N) memory
    var aChildIndex = keyIndex(aChildren)
    var aKeys = aChildIndex.keys
    var aFree = aChildIndex.free

    if (aFree.length === aChildren.length) {
        return {
            children: bChildren,
            moves: null
        }
    }

    // O(MAX(N, M)) memory
    var newChildren = []

    var freeIndex = 0
    var freeCount = bFree.length
    var deletedItems = 0

    // Iterate through a and match a node in b
    // O(N) time,
    for (var i = 0 ; i < aChildren.length; i++) {
        var aItem = aChildren[i]
        var itemIndex

        if (aItem.key) {
            if (bKeys.hasOwnProperty(aItem.key)) {
                // Match up the old keys
                itemIndex = bKeys[aItem.key]
                newChildren.push(bChildren[itemIndex])

            } else {
                // Remove old keyed items
                itemIndex = i - deletedItems++
                newChildren.push(null)
            }
        } else {
            // Match the item in a with the next free item in b
            if (freeIndex < freeCount) {
                itemIndex = bFree[freeIndex++]
                newChildren.push(bChildren[itemIndex])
            } else {
                // There are no free items in b to match with
                // the free items in a, so the extra free nodes
                // are deleted.
                itemIndex = i - deletedItems++
                newChildren.push(null)
            }
        }
    }

    var lastFreeIndex = freeIndex >= bFree.length ?
        bChildren.length :
        bFree[freeIndex]

    // Iterate through b and append any new keys
    // O(M) time
    for (var j = 0; j < bChildren.length; j++) {
        var newItem = bChildren[j]

        if (newItem.key) {
            if (!aKeys.hasOwnProperty(newItem.key)) {
                // Add any new keyed items
                // We are adding new items to the end and then sorting them
                // in place. In future we should insert new items in place.
                newChildren.push(newItem)
            }
        } else if (j >= lastFreeIndex) {
            // Add any leftover non-keyed items
            newChildren.push(newItem)
        }
    }

    var simulate = newChildren.slice()
    var simulateIndex = 0
    var removes = []
    var inserts = []
    var simulateItem

    for (var k = 0; k < bChildren.length;) {
        var wantedItem = bChildren[k]
        simulateItem = simulate[simulateIndex]

        // remove items
        while (simulateItem === null && simulate.length) {
            removes.push(remove(simulate, simulateIndex, null))
            simulateItem = simulate[simulateIndex]
        }

        if (!simulateItem || simulateItem.key !== wantedItem.key) {
            // if we need a key in this position...
            if (wantedItem.key) {
                if (simulateItem && simulateItem.key) {
                    // if an insert doesn't put this key in place, it needs to move
                    if (bKeys[simulateItem.key] !== k + 1) {
                        removes.push(remove(simulate, simulateIndex, simulateItem.key))
                        simulateItem = simulate[simulateIndex]
                        // if the remove didn't put the wanted item in place, we need to insert it
                        if (!simulateItem || simulateItem.key !== wantedItem.key) {
                            inserts.push({key: wantedItem.key, to: k})
                        }
                        // items are matching, so skip ahead
                        else {
                            simulateIndex++
                        }
                    }
                    else {
                        inserts.push({key: wantedItem.key, to: k})
                    }
                }
                else {
                    inserts.push({key: wantedItem.key, to: k})
                }
                k++
            }
            // a key in simulate has no matching wanted key, remove it
            else if (simulateItem && simulateItem.key) {
                removes.push(remove(simulate, simulateIndex, simulateItem.key))
            }
        }
        else {
            simulateIndex++
            k++
        }
    }

    // remove all the remaining nodes from simulate
    while(simulateIndex < simulate.length) {
        simulateItem = simulate[simulateIndex]
        removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key))
    }

    // If the only moves we have are deletes then we can just
    // let the delete patch remove these items.
    if (removes.length === deletedItems && !inserts.length) {
        return {
            children: newChildren,
            moves: null
        }
    }

    return {
        children: newChildren,
        moves: {
            removes: removes,
            inserts: inserts
        }
    }
}

function remove(arr, index, key) {
    arr.splice(index, 1)

    return {
        from: index,
        key: key
    }
}

function keyIndex(children) {
    var keys = {}
    var free = []
    var length = children.length

    for (var i = 0; i < length; i++) {
        var child = children[i]

        if (child.key) {
            keys[child.key] = i
        } else {
            free.push(i)
        }
    }

    return {
        keys: keys,     // A hash of key name to index
        free: free,     // An array of unkeyed item indices
    }
}

function appendPatch(apply, patch) {
    if (apply) {
        if (isArray(apply)) {
            apply.push(patch)
        } else {
            apply = [apply, patch]
        }

        return apply
    } else {
        return patch
    }
}

},{"../vnode/handle-thunk":11,"../vnode/is-thunk":12,"../vnode/is-vnode":14,"../vnode/is-vtext":15,"../vnode/is-widget":16,"../vnode/vpatch":19,"./diff-props":21,"x-is-array":4}],23:[function(require,module,exports){
var VNode = require('virtual-dom/vnode/vnode');
var VText = require('virtual-dom/vnode/vtext');
var diff = require('virtual-dom/vtree/diff');
var patch = require('virtual-dom/vdom/patch');
var createElement = require('virtual-dom/vdom/create-element');
var isHook = require("virtual-dom/vnode/is-vhook");


Elm.Native.VirtualDom = {};
Elm.Native.VirtualDom.make = function(elm)
{
	elm.Native = elm.Native || {};
	elm.Native.VirtualDom = elm.Native.VirtualDom || {};
	if (elm.Native.VirtualDom.values)
	{
		return elm.Native.VirtualDom.values;
	}

	var Element = Elm.Native.Graphics.Element.make(elm);
	var Json = Elm.Native.Json.make(elm);
	var List = Elm.Native.List.make(elm);
	var Signal = Elm.Native.Signal.make(elm);
	var Utils = Elm.Native.Utils.make(elm);

	var ATTRIBUTE_KEY = 'UniqueNameThatOthersAreVeryUnlikelyToUse';



	// VIRTUAL DOM NODES


	function text(string)
	{
		return new VText(string);
	}

	function node(name)
	{
		return F2(function(propertyList, contents) {
			return makeNode(name, propertyList, contents);
		});
	}


	// BUILD VIRTUAL DOME NODES


	function makeNode(name, propertyList, contents)
	{
		var props = listToProperties(propertyList);

		var key, namespace;
		// support keys
		if (props.key !== undefined)
		{
			key = props.key;
			props.key = undefined;
		}

		// support namespace
		if (props.namespace !== undefined)
		{
			namespace = props.namespace;
			props.namespace = undefined;
		}

		// ensure that setting text of an input does not move the cursor
		var useSoftSet =
			(name === 'input' || name === 'textarea')
			&& props.value !== undefined
			&& !isHook(props.value);

		if (useSoftSet)
		{
			props.value = SoftSetHook(props.value);
		}

		return new VNode(name, props, List.toArray(contents), key, namespace);
	}

	function listToProperties(list)
	{
		var object = {};
		while (list.ctor !== '[]')
		{
			var entry = list._0;
			if (entry.key === ATTRIBUTE_KEY)
			{
				object.attributes = object.attributes || {};
				object.attributes[entry.value.attrKey] = entry.value.attrValue;
			}
			else
			{
				object[entry.key] = entry.value;
			}
			list = list._1;
		}
		return object;
	}



	// PROPERTIES AND ATTRIBUTES


	function property(key, value)
	{
		return {
			key: key,
			value: value
		};
	}

	function attribute(key, value)
	{
		return {
			key: ATTRIBUTE_KEY,
			value: {
				attrKey: key,
				attrValue: value
			}
		};
	}



	// NAMESPACED ATTRIBUTES


	function attributeNS(namespace, key, value)
	{
		return {
			key: key,
			value: new AttributeHook(namespace, key, value)
		};
	}

	function AttributeHook(namespace, key, value)
	{
		if (!(this instanceof AttributeHook))
		{
			return new AttributeHook(namespace, key, value);
		}

		this.namespace = namespace;
		this.key = key;
		this.value = value;
	}

	AttributeHook.prototype.hook = function (node, prop, prev)
	{
		if (prev
			&& prev.type === 'AttributeHook'
			&& prev.value === this.value
			&& prev.namespace === this.namespace)
		{
			return;
		}

		node.setAttributeNS(this.namespace, prop, this.value);
	};

	AttributeHook.prototype.unhook = function (node, prop, next)
	{
		if (next
			&& next.type === 'AttributeHook'
			&& next.namespace === this.namespace)
		{
			return;
		}

		node.removeAttributeNS(this.namespace, this.key);
	};

	AttributeHook.prototype.type = 'AttributeHook';



	// EVENTS


	function on(name, options, decoder, createMessage)
	{
		function eventHandler(event)
		{
			var value = A2(Json.runDecoderValue, decoder, event);
			if (value.ctor === 'Ok')
			{
				if (options.stopPropagation)
				{
					event.stopPropagation();
				}
				if (options.preventDefault)
				{
					event.preventDefault();
				}
				Signal.sendMessage(createMessage(value._0));
			}
		}
		return property('on' + name, eventHandler);
	}

	function SoftSetHook(value)
	{
		if (!(this instanceof SoftSetHook))
		{
			return new SoftSetHook(value);
		}

		this.value = value;
	}

	SoftSetHook.prototype.hook = function (node, propertyName)
	{
		if (node[propertyName] !== this.value)
		{
			node[propertyName] = this.value;
		}
	};



	// INTEGRATION WITH ELEMENTS


	function ElementWidget(element)
	{
		this.element = element;
	}

	ElementWidget.prototype.type = "Widget";

	ElementWidget.prototype.init = function init()
	{
		return Element.render(this.element);
	};

	ElementWidget.prototype.update = function update(previous, node)
	{
		return Element.update(node, previous.element, this.element);
	};

	function fromElement(element)
	{
		return new ElementWidget(element);
	}

	function toElement(width, height, html)
	{
		return A3(Element.newElement, width, height, {
			ctor: 'Custom',
			type: 'evancz/elm-html',
			render: render,
			update: update,
			model: html
		});
	}



	// RENDER AND UPDATE


	function render(model)
	{
		var element = Element.createNode('div');
		element.appendChild(createElement(model));
		return element;
	}

	function update(node, oldModel, newModel)
	{
		updateAndReplace(node.firstChild, oldModel, newModel);
		return node;
	}

	function updateAndReplace(node, oldModel, newModel)
	{
		var patches = diff(oldModel, newModel);
		var newNode = patch(node, patches);
		return newNode;
	}



	// LAZINESS


	function lazyRef(fn, a)
	{
		function thunk()
		{
			return fn(a);
		}
		return new Thunk(fn, [a], thunk);
	}

	function lazyRef2(fn, a, b)
	{
		function thunk()
		{
			return A2(fn, a, b);
		}
		return new Thunk(fn, [a,b], thunk);
	}

	function lazyRef3(fn, a, b, c)
	{
		function thunk()
		{
			return A3(fn, a, b, c);
		}
		return new Thunk(fn, [a,b,c], thunk);
	}

	function Thunk(fn, args, thunk)
	{
		/* public (used by VirtualDom.js) */
		this.vnode = null;
		this.key = undefined;

		/* private */
		this.fn = fn;
		this.args = args;
		this.thunk = thunk;
	}

	Thunk.prototype.type = "Thunk";
	Thunk.prototype.render = renderThunk;

	function shouldUpdate(current, previous)
	{
		if (current.fn !== previous.fn)
		{
			return true;
		}

		// if it's the same function, we know the number of args must match
		var cargs = current.args;
		var pargs = previous.args;

		for (var i = cargs.length; i--; )
		{
			if (cargs[i] !== pargs[i])
			{
				return true;
			}
		}

		return false;
	}

	function renderThunk(previous)
	{
		if (previous == null || shouldUpdate(this, previous))
		{
			return this.thunk();
		}
		else
		{
			return previous.vnode;
		}
	}


	return elm.Native.VirtualDom.values = Elm.Native.VirtualDom.values = {
		node: node,
		text: text,
		on: F4(on),

		property: F2(property),
		attribute: F2(attribute),
		attributeNS: F3(attributeNS),

		lazy: F2(lazyRef),
		lazy2: F3(lazyRef2),
		lazy3: F4(lazyRef3),

		toElement: F3(toElement),
		fromElement: fromElement,

		render: createElement,
		updateAndReplace: updateAndReplace
	};
};

},{"virtual-dom/vdom/create-element":6,"virtual-dom/vdom/patch":9,"virtual-dom/vnode/is-vhook":13,"virtual-dom/vnode/vnode":18,"virtual-dom/vnode/vtext":20,"virtual-dom/vtree/diff":22}]},{},[23]);

Elm.VirtualDom = Elm.VirtualDom || {};
Elm.VirtualDom.make = function (_elm) {
   "use strict";
   _elm.VirtualDom = _elm.VirtualDom || {};
   if (_elm.VirtualDom.values) return _elm.VirtualDom.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Graphics$Element = Elm.Graphics.Element.make(_elm),
   $Json$Decode = Elm.Json.Decode.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$VirtualDom = Elm.Native.VirtualDom.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   var lazy3 = $Native$VirtualDom.lazy3;
   var lazy2 = $Native$VirtualDom.lazy2;
   var lazy = $Native$VirtualDom.lazy;
   var defaultOptions = {stopPropagation: false
                        ,preventDefault: false};
   var Options = F2(function (a,b) {
      return {stopPropagation: a,preventDefault: b};
   });
   var onWithOptions = $Native$VirtualDom.on;
   var on = F3(function (eventName,decoder,toMessage) {
      return A4($Native$VirtualDom.on,
      eventName,
      defaultOptions,
      decoder,
      toMessage);
   });
   var attributeNS = $Native$VirtualDom.attributeNS;
   var attribute = $Native$VirtualDom.attribute;
   var property = $Native$VirtualDom.property;
   var Property = {ctor: "Property"};
   var fromElement = $Native$VirtualDom.fromElement;
   var toElement = $Native$VirtualDom.toElement;
   var text = $Native$VirtualDom.text;
   var node = $Native$VirtualDom.node;
   var Node = {ctor: "Node"};
   return _elm.VirtualDom.values = {_op: _op
                                   ,text: text
                                   ,node: node
                                   ,toElement: toElement
                                   ,fromElement: fromElement
                                   ,property: property
                                   ,attribute: attribute
                                   ,attributeNS: attributeNS
                                   ,on: on
                                   ,onWithOptions: onWithOptions
                                   ,defaultOptions: defaultOptions
                                   ,lazy: lazy
                                   ,lazy2: lazy2
                                   ,lazy3: lazy3
                                   ,Options: Options};
};
Elm.Html = Elm.Html || {};
Elm.Html.make = function (_elm) {
   "use strict";
   _elm.Html = _elm.Html || {};
   if (_elm.Html.values) return _elm.Html.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Graphics$Element = Elm.Graphics.Element.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $VirtualDom = Elm.VirtualDom.make(_elm);
   var _op = {};
   var fromElement = $VirtualDom.fromElement;
   var toElement = $VirtualDom.toElement;
   var text = $VirtualDom.text;
   var node = $VirtualDom.node;
   var body = node("body");
   var section = node("section");
   var nav = node("nav");
   var article = node("article");
   var aside = node("aside");
   var h1 = node("h1");
   var h2 = node("h2");
   var h3 = node("h3");
   var h4 = node("h4");
   var h5 = node("h5");
   var h6 = node("h6");
   var header = node("header");
   var footer = node("footer");
   var address = node("address");
   var main$ = node("main");
   var p = node("p");
   var hr = node("hr");
   var pre = node("pre");
   var blockquote = node("blockquote");
   var ol = node("ol");
   var ul = node("ul");
   var li = node("li");
   var dl = node("dl");
   var dt = node("dt");
   var dd = node("dd");
   var figure = node("figure");
   var figcaption = node("figcaption");
   var div = node("div");
   var a = node("a");
   var em = node("em");
   var strong = node("strong");
   var small = node("small");
   var s = node("s");
   var cite = node("cite");
   var q = node("q");
   var dfn = node("dfn");
   var abbr = node("abbr");
   var time = node("time");
   var code = node("code");
   var $var = node("var");
   var samp = node("samp");
   var kbd = node("kbd");
   var sub = node("sub");
   var sup = node("sup");
   var i = node("i");
   var b = node("b");
   var u = node("u");
   var mark = node("mark");
   var ruby = node("ruby");
   var rt = node("rt");
   var rp = node("rp");
   var bdi = node("bdi");
   var bdo = node("bdo");
   var span = node("span");
   var br = node("br");
   var wbr = node("wbr");
   var ins = node("ins");
   var del = node("del");
   var img = node("img");
   var iframe = node("iframe");
   var embed = node("embed");
   var object = node("object");
   var param = node("param");
   var video = node("video");
   var audio = node("audio");
   var source = node("source");
   var track = node("track");
   var canvas = node("canvas");
   var svg = node("svg");
   var math = node("math");
   var table = node("table");
   var caption = node("caption");
   var colgroup = node("colgroup");
   var col = node("col");
   var tbody = node("tbody");
   var thead = node("thead");
   var tfoot = node("tfoot");
   var tr = node("tr");
   var td = node("td");
   var th = node("th");
   var form = node("form");
   var fieldset = node("fieldset");
   var legend = node("legend");
   var label = node("label");
   var input = node("input");
   var button = node("button");
   var select = node("select");
   var datalist = node("datalist");
   var optgroup = node("optgroup");
   var option = node("option");
   var textarea = node("textarea");
   var keygen = node("keygen");
   var output = node("output");
   var progress = node("progress");
   var meter = node("meter");
   var details = node("details");
   var summary = node("summary");
   var menuitem = node("menuitem");
   var menu = node("menu");
   return _elm.Html.values = {_op: _op
                             ,node: node
                             ,text: text
                             ,toElement: toElement
                             ,fromElement: fromElement
                             ,body: body
                             ,section: section
                             ,nav: nav
                             ,article: article
                             ,aside: aside
                             ,h1: h1
                             ,h2: h2
                             ,h3: h3
                             ,h4: h4
                             ,h5: h5
                             ,h6: h6
                             ,header: header
                             ,footer: footer
                             ,address: address
                             ,main$: main$
                             ,p: p
                             ,hr: hr
                             ,pre: pre
                             ,blockquote: blockquote
                             ,ol: ol
                             ,ul: ul
                             ,li: li
                             ,dl: dl
                             ,dt: dt
                             ,dd: dd
                             ,figure: figure
                             ,figcaption: figcaption
                             ,div: div
                             ,a: a
                             ,em: em
                             ,strong: strong
                             ,small: small
                             ,s: s
                             ,cite: cite
                             ,q: q
                             ,dfn: dfn
                             ,abbr: abbr
                             ,time: time
                             ,code: code
                             ,$var: $var
                             ,samp: samp
                             ,kbd: kbd
                             ,sub: sub
                             ,sup: sup
                             ,i: i
                             ,b: b
                             ,u: u
                             ,mark: mark
                             ,ruby: ruby
                             ,rt: rt
                             ,rp: rp
                             ,bdi: bdi
                             ,bdo: bdo
                             ,span: span
                             ,br: br
                             ,wbr: wbr
                             ,ins: ins
                             ,del: del
                             ,img: img
                             ,iframe: iframe
                             ,embed: embed
                             ,object: object
                             ,param: param
                             ,video: video
                             ,audio: audio
                             ,source: source
                             ,track: track
                             ,canvas: canvas
                             ,svg: svg
                             ,math: math
                             ,table: table
                             ,caption: caption
                             ,colgroup: colgroup
                             ,col: col
                             ,tbody: tbody
                             ,thead: thead
                             ,tfoot: tfoot
                             ,tr: tr
                             ,td: td
                             ,th: th
                             ,form: form
                             ,fieldset: fieldset
                             ,legend: legend
                             ,label: label
                             ,input: input
                             ,button: button
                             ,select: select
                             ,datalist: datalist
                             ,optgroup: optgroup
                             ,option: option
                             ,textarea: textarea
                             ,keygen: keygen
                             ,output: output
                             ,progress: progress
                             ,meter: meter
                             ,details: details
                             ,summary: summary
                             ,menuitem: menuitem
                             ,menu: menu};
};
Elm.Html = Elm.Html || {};
Elm.Html.Attributes = Elm.Html.Attributes || {};
Elm.Html.Attributes.make = function (_elm) {
   "use strict";
   _elm.Html = _elm.Html || {};
   _elm.Html.Attributes = _elm.Html.Attributes || {};
   if (_elm.Html.Attributes.values)
   return _elm.Html.Attributes.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Html = Elm.Html.make(_elm),
   $Json$Encode = Elm.Json.Encode.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $String = Elm.String.make(_elm),
   $VirtualDom = Elm.VirtualDom.make(_elm);
   var _op = {};
   var attribute = $VirtualDom.attribute;
   var contextmenu = function (value) {
      return A2(attribute,"contextmenu",value);
   };
   var property = $VirtualDom.property;
   var stringProperty = F2(function (name,string) {
      return A2(property,name,$Json$Encode.string(string));
   });
   var $class = function (name) {
      return A2(stringProperty,"className",name);
   };
   var id = function (name) {
      return A2(stringProperty,"id",name);
   };
   var title = function (name) {
      return A2(stringProperty,"title",name);
   };
   var accesskey = function ($char) {
      return A2(stringProperty,
      "accessKey",
      $String.fromChar($char));
   };
   var dir = function (value) {
      return A2(stringProperty,"dir",value);
   };
   var draggable = function (value) {
      return A2(stringProperty,"draggable",value);
   };
   var dropzone = function (value) {
      return A2(stringProperty,"dropzone",value);
   };
   var itemprop = function (value) {
      return A2(stringProperty,"itemprop",value);
   };
   var lang = function (value) {
      return A2(stringProperty,"lang",value);
   };
   var tabindex = function (n) {
      return A2(stringProperty,"tabIndex",$Basics.toString(n));
   };
   var charset = function (value) {
      return A2(stringProperty,"charset",value);
   };
   var content = function (value) {
      return A2(stringProperty,"content",value);
   };
   var httpEquiv = function (value) {
      return A2(stringProperty,"httpEquiv",value);
   };
   var language = function (value) {
      return A2(stringProperty,"language",value);
   };
   var src = function (value) {
      return A2(stringProperty,"src",value);
   };
   var height = function (value) {
      return A2(stringProperty,"height",$Basics.toString(value));
   };
   var width = function (value) {
      return A2(stringProperty,"width",$Basics.toString(value));
   };
   var alt = function (value) {
      return A2(stringProperty,"alt",value);
   };
   var preload = function (value) {
      return A2(stringProperty,"preload",value);
   };
   var poster = function (value) {
      return A2(stringProperty,"poster",value);
   };
   var kind = function (value) {
      return A2(stringProperty,"kind",value);
   };
   var srclang = function (value) {
      return A2(stringProperty,"srclang",value);
   };
   var sandbox = function (value) {
      return A2(stringProperty,"sandbox",value);
   };
   var srcdoc = function (value) {
      return A2(stringProperty,"srcdoc",value);
   };
   var type$ = function (value) {
      return A2(stringProperty,"type",value);
   };
   var value = function (value) {
      return A2(stringProperty,"value",value);
   };
   var placeholder = function (value) {
      return A2(stringProperty,"placeholder",value);
   };
   var accept = function (value) {
      return A2(stringProperty,"accept",value);
   };
   var acceptCharset = function (value) {
      return A2(stringProperty,"acceptCharset",value);
   };
   var action = function (value) {
      return A2(stringProperty,"action",value);
   };
   var autocomplete = function (bool) {
      return A2(stringProperty,"autocomplete",bool ? "on" : "off");
   };
   var autosave = function (value) {
      return A2(stringProperty,"autosave",value);
   };
   var enctype = function (value) {
      return A2(stringProperty,"enctype",value);
   };
   var formaction = function (value) {
      return A2(stringProperty,"formAction",value);
   };
   var list = function (value) {
      return A2(stringProperty,"list",value);
   };
   var minlength = function (n) {
      return A2(stringProperty,"minLength",$Basics.toString(n));
   };
   var maxlength = function (n) {
      return A2(stringProperty,"maxLength",$Basics.toString(n));
   };
   var method = function (value) {
      return A2(stringProperty,"method",value);
   };
   var name = function (value) {
      return A2(stringProperty,"name",value);
   };
   var pattern = function (value) {
      return A2(stringProperty,"pattern",value);
   };
   var size = function (n) {
      return A2(stringProperty,"size",$Basics.toString(n));
   };
   var $for = function (value) {
      return A2(stringProperty,"htmlFor",value);
   };
   var form = function (value) {
      return A2(stringProperty,"form",value);
   };
   var max = function (value) {
      return A2(stringProperty,"max",value);
   };
   var min = function (value) {
      return A2(stringProperty,"min",value);
   };
   var step = function (n) {
      return A2(stringProperty,"step",n);
   };
   var cols = function (n) {
      return A2(stringProperty,"cols",$Basics.toString(n));
   };
   var rows = function (n) {
      return A2(stringProperty,"rows",$Basics.toString(n));
   };
   var wrap = function (value) {
      return A2(stringProperty,"wrap",value);
   };
   var usemap = function (value) {
      return A2(stringProperty,"useMap",value);
   };
   var shape = function (value) {
      return A2(stringProperty,"shape",value);
   };
   var coords = function (value) {
      return A2(stringProperty,"coords",value);
   };
   var challenge = function (value) {
      return A2(stringProperty,"challenge",value);
   };
   var keytype = function (value) {
      return A2(stringProperty,"keytype",value);
   };
   var align = function (value) {
      return A2(stringProperty,"align",value);
   };
   var cite = function (value) {
      return A2(stringProperty,"cite",value);
   };
   var href = function (value) {
      return A2(stringProperty,"href",value);
   };
   var target = function (value) {
      return A2(stringProperty,"target",value);
   };
   var downloadAs = function (value) {
      return A2(stringProperty,"download",value);
   };
   var hreflang = function (value) {
      return A2(stringProperty,"hreflang",value);
   };
   var media = function (value) {
      return A2(stringProperty,"media",value);
   };
   var ping = function (value) {
      return A2(stringProperty,"ping",value);
   };
   var rel = function (value) {
      return A2(stringProperty,"rel",value);
   };
   var datetime = function (value) {
      return A2(stringProperty,"datetime",value);
   };
   var pubdate = function (value) {
      return A2(stringProperty,"pubdate",value);
   };
   var start = function (n) {
      return A2(stringProperty,"start",$Basics.toString(n));
   };
   var colspan = function (n) {
      return A2(stringProperty,"colSpan",$Basics.toString(n));
   };
   var headers = function (value) {
      return A2(stringProperty,"headers",value);
   };
   var rowspan = function (n) {
      return A2(stringProperty,"rowSpan",$Basics.toString(n));
   };
   var scope = function (value) {
      return A2(stringProperty,"scope",value);
   };
   var manifest = function (value) {
      return A2(stringProperty,"manifest",value);
   };
   var boolProperty = F2(function (name,bool) {
      return A2(property,name,$Json$Encode.bool(bool));
   });
   var hidden = function (bool) {
      return A2(boolProperty,"hidden",bool);
   };
   var contenteditable = function (bool) {
      return A2(boolProperty,"contentEditable",bool);
   };
   var spellcheck = function (bool) {
      return A2(boolProperty,"spellcheck",bool);
   };
   var async = function (bool) {
      return A2(boolProperty,"async",bool);
   };
   var defer = function (bool) {
      return A2(boolProperty,"defer",bool);
   };
   var scoped = function (bool) {
      return A2(boolProperty,"scoped",bool);
   };
   var autoplay = function (bool) {
      return A2(boolProperty,"autoplay",bool);
   };
   var controls = function (bool) {
      return A2(boolProperty,"controls",bool);
   };
   var loop = function (bool) {
      return A2(boolProperty,"loop",bool);
   };
   var $default = function (bool) {
      return A2(boolProperty,"default",bool);
   };
   var seamless = function (bool) {
      return A2(boolProperty,"seamless",bool);
   };
   var checked = function (bool) {
      return A2(boolProperty,"checked",bool);
   };
   var selected = function (bool) {
      return A2(boolProperty,"selected",bool);
   };
   var autofocus = function (bool) {
      return A2(boolProperty,"autofocus",bool);
   };
   var disabled = function (bool) {
      return A2(boolProperty,"disabled",bool);
   };
   var multiple = function (bool) {
      return A2(boolProperty,"multiple",bool);
   };
   var novalidate = function (bool) {
      return A2(boolProperty,"noValidate",bool);
   };
   var readonly = function (bool) {
      return A2(boolProperty,"readOnly",bool);
   };
   var required = function (bool) {
      return A2(boolProperty,"required",bool);
   };
   var ismap = function (value) {
      return A2(boolProperty,"isMap",value);
   };
   var download = function (bool) {
      return A2(boolProperty,"download",bool);
   };
   var reversed = function (bool) {
      return A2(boolProperty,"reversed",bool);
   };
   var classList = function (list) {
      return $class(A2($String.join,
      " ",
      A2($List.map,$Basics.fst,A2($List.filter,$Basics.snd,list))));
   };
   var style = function (props) {
      return A2(property,
      "style",
      $Json$Encode.object(A2($List.map,
      function (_p0) {
         var _p1 = _p0;
         return {ctor: "_Tuple2"
                ,_0: _p1._0
                ,_1: $Json$Encode.string(_p1._1)};
      },
      props)));
   };
   var key = function (k) {    return A2(stringProperty,"key",k);};
   return _elm.Html.Attributes.values = {_op: _op
                                        ,key: key
                                        ,style: style
                                        ,$class: $class
                                        ,classList: classList
                                        ,id: id
                                        ,title: title
                                        ,hidden: hidden
                                        ,type$: type$
                                        ,value: value
                                        ,checked: checked
                                        ,placeholder: placeholder
                                        ,selected: selected
                                        ,accept: accept
                                        ,acceptCharset: acceptCharset
                                        ,action: action
                                        ,autocomplete: autocomplete
                                        ,autofocus: autofocus
                                        ,autosave: autosave
                                        ,disabled: disabled
                                        ,enctype: enctype
                                        ,formaction: formaction
                                        ,list: list
                                        ,maxlength: maxlength
                                        ,minlength: minlength
                                        ,method: method
                                        ,multiple: multiple
                                        ,name: name
                                        ,novalidate: novalidate
                                        ,pattern: pattern
                                        ,readonly: readonly
                                        ,required: required
                                        ,size: size
                                        ,$for: $for
                                        ,form: form
                                        ,max: max
                                        ,min: min
                                        ,step: step
                                        ,cols: cols
                                        ,rows: rows
                                        ,wrap: wrap
                                        ,href: href
                                        ,target: target
                                        ,download: download
                                        ,downloadAs: downloadAs
                                        ,hreflang: hreflang
                                        ,media: media
                                        ,ping: ping
                                        ,rel: rel
                                        ,ismap: ismap
                                        ,usemap: usemap
                                        ,shape: shape
                                        ,coords: coords
                                        ,src: src
                                        ,height: height
                                        ,width: width
                                        ,alt: alt
                                        ,autoplay: autoplay
                                        ,controls: controls
                                        ,loop: loop
                                        ,preload: preload
                                        ,poster: poster
                                        ,$default: $default
                                        ,kind: kind
                                        ,srclang: srclang
                                        ,sandbox: sandbox
                                        ,seamless: seamless
                                        ,srcdoc: srcdoc
                                        ,reversed: reversed
                                        ,start: start
                                        ,align: align
                                        ,colspan: colspan
                                        ,rowspan: rowspan
                                        ,headers: headers
                                        ,scope: scope
                                        ,async: async
                                        ,charset: charset
                                        ,content: content
                                        ,defer: defer
                                        ,httpEquiv: httpEquiv
                                        ,language: language
                                        ,scoped: scoped
                                        ,accesskey: accesskey
                                        ,contenteditable: contenteditable
                                        ,contextmenu: contextmenu
                                        ,dir: dir
                                        ,draggable: draggable
                                        ,dropzone: dropzone
                                        ,itemprop: itemprop
                                        ,lang: lang
                                        ,spellcheck: spellcheck
                                        ,tabindex: tabindex
                                        ,challenge: challenge
                                        ,keytype: keytype
                                        ,cite: cite
                                        ,datetime: datetime
                                        ,pubdate: pubdate
                                        ,manifest: manifest
                                        ,property: property
                                        ,attribute: attribute};
};
Elm.Material = Elm.Material || {};
Elm.Material.Style = Elm.Material.Style || {};
Elm.Material.Style.make = function (_elm) {
   "use strict";
   _elm.Material = _elm.Material || {};
   _elm.Material.Style = _elm.Material.Style || {};
   if (_elm.Material.Style.values)
   return _elm.Material.Style.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Html = Elm.Html.make(_elm),
   $Html$Attributes = Elm.Html.Attributes.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $String = Elm.String.make(_elm);
   var _op = {};
   var stylesheet = function (css) {
      return A3($Html.node,
      "style",
      _U.list([]),
      _U.list([$Html.text(css)]));
   };
   var collect1 = F2(function (style,_p0) {
      var _p1 = _p0;
      var _p3 = _p1;
      var _p2 = style;
      switch (_p2.ctor)
      {case "Class": return _U.update(_p3,
           {classes: A2($List._op["::"],_p2._0,_p1.classes)});
         case "CSS": return _U.update(_p3,
           {css: A2($List._op["::"],_p2._0,_p1.css)});
         case "Attr": return _U.update(_p3,
           {attrs: A2($List._op["::"],_p2._0,_p1.attrs)});
         case "Multiple": return A3($List.foldl,collect1,_p3,_p2._0);
         default: return _p3;}
   });
   var collect = A2($List.foldl,
   collect1,
   {classes: _U.list([]),css: _U.list([]),attrs: _U.list([])});
   var styled = F2(function (ctor,styles) {
      var _p4 = collect(styles);
      var classes = _p4.classes;
      var css = _p4.css;
      var attrs = _p4.attrs;
      return ctor(A2($List._op["::"],
      $Html$Attributes.style(css),
      A2($List._op["::"],
      $Html$Attributes.$class(A2($String.join," ",classes)),
      attrs)));
   });
   var div = F2(function (styles,elems) {
      return A3(styled,$Html.div,styles,elems);
   });
   var span = F2(function (styles,elems) {
      return A3(styled,$Html.span,styles,elems);
   });
   var Summary = F3(function (a,b,c) {
      return {attrs: a,classes: b,css: c};
   });
   var NOP = {ctor: "NOP"};
   var nop = NOP;
   var Multiple = function (a) {
      return {ctor: "Multiple",_0: a};
   };
   var multiple = function (styles) {    return Multiple(styles);};
   var Attr = function (a) {    return {ctor: "Attr",_0: a};};
   var attribute = function (attr) {    return Attr(attr);};
   var CSS = function (a) {    return {ctor: "CSS",_0: a};};
   var css = F2(function (key,value) {
      return CSS({ctor: "_Tuple2",_0: key,_1: value});
   });
   var css$ = F3(function (key,value,b) {
      return b ? CSS({ctor: "_Tuple2",_0: key,_1: value}) : NOP;
   });
   var Class = function (a) {    return {ctor: "Class",_0: a};};
   var cs = function (c) {    return Class(c);};
   var cs$ = F2(function (c,b) {    return b ? Class(c) : NOP;});
   return _elm.Material.Style.values = {_op: _op
                                       ,cs: cs
                                       ,cs$: cs$
                                       ,css: css
                                       ,css$: css$
                                       ,attribute: attribute
                                       ,multiple: multiple
                                       ,styled: styled
                                       ,div: div
                                       ,span: span
                                       ,stylesheet: stylesheet};
};
Elm.Material = Elm.Material || {};
Elm.Material.Badge = Elm.Material.Badge || {};
Elm.Material.Badge.make = function (_elm) {
   "use strict";
   _elm.Material = _elm.Material || {};
   _elm.Material.Badge = _elm.Material.Badge || {};
   if (_elm.Material.Badge.values)
   return _elm.Material.Badge.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Html$Attributes = Elm.Html.Attributes.make(_elm),
   $List = Elm.List.make(_elm),
   $Material$Style = Elm.Material.Style.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   var withBadge = function (databadge) {
      return $Material$Style.multiple(_U.list([$Material$Style.cs("mdl-badge")
                                              ,$Material$Style.attribute(A2($Html$Attributes.attribute,
                                              "data-badge",
                                              databadge))]));
   };
   var overlap = $Material$Style.cs("mdl-badge--overlap");
   var noBackground = $Material$Style.cs("mdl-badge--no-background");
   return _elm.Material.Badge.values = {_op: _op
                                       ,noBackground: noBackground
                                       ,overlap: overlap
                                       ,withBadge: withBadge};
};
Elm.Material = Elm.Material || {};
Elm.Material.Icon = Elm.Material.Icon || {};
Elm.Material.Icon.make = function (_elm) {
   "use strict";
   _elm.Material = _elm.Material || {};
   _elm.Material.Icon = _elm.Material.Icon || {};
   if (_elm.Material.Icon.values) return _elm.Material.Icon.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Html = Elm.Html.make(_elm),
   $List = Elm.List.make(_elm),
   $Material$Style = Elm.Material.Style.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   var view = F2(function (name,styling) {
      return A3($Material$Style.styled,
      $Html.i,
      A2($List._op["::"],
      $Material$Style.cs("material-icons"),
      styling),
      _U.list([$Html.text(name)]));
   });
   var i = function (name) {    return A2(view,name,_U.list([]));};
   var size48 = A2($Material$Style.css,"font-size","48px");
   var size36 = A2($Material$Style.css,"font-size","36px");
   var size24 = A2($Material$Style.css,"font-size","24px");
   var size18 = A2($Material$Style.css,"font-size","18px");
   return _elm.Material.Icon.values = {_op: _op
                                      ,size18: size18
                                      ,size24: size24
                                      ,size36: size36
                                      ,size48: size48
                                      ,view: view
                                      ,i: i};
};
Elm.Native.Effects = {};
Elm.Native.Effects.make = function(localRuntime) {

	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Effects = localRuntime.Native.Effects || {};
	if (localRuntime.Native.Effects.values)
	{
		return localRuntime.Native.Effects.values;
	}

	var Task = Elm.Native.Task.make(localRuntime);
	var Utils = Elm.Native.Utils.make(localRuntime);
	var Signal = Elm.Signal.make(localRuntime);
	var List = Elm.Native.List.make(localRuntime);


	// polyfill so things will work even if rAF is not available for some reason
	var _requestAnimationFrame =
		typeof requestAnimationFrame !== 'undefined'
			? requestAnimationFrame
			: function(cb) { setTimeout(cb, 1000 / 60); }
			;


	// batchedSending and sendCallback implement a small state machine in order
	// to schedule only one send(time) call per animation frame.
	//
	// Invariants:
	// 1. In the NO_REQUEST state, there is never a scheduled sendCallback.
	// 2. In the PENDING_REQUEST and EXTRA_REQUEST states, there is always exactly
	//    one scheduled sendCallback.
	var NO_REQUEST = 0;
	var PENDING_REQUEST = 1;
	var EXTRA_REQUEST = 2;
	var state = NO_REQUEST;
	var messageArray = [];


	function batchedSending(address, tickMessages)
	{
		// insert ticks into the messageArray
		var foundAddress = false;

		for (var i = messageArray.length; i--; )
		{
			if (messageArray[i].address === address)
			{
				foundAddress = true;
				messageArray[i].tickMessages = A3(List.foldl, List.cons, messageArray[i].tickMessages, tickMessages);
				break;
			}
		}

		if (!foundAddress)
		{
			messageArray.push({ address: address, tickMessages: tickMessages });
		}

		// do the appropriate state transition
		switch (state)
		{
			case NO_REQUEST:
				_requestAnimationFrame(sendCallback);
				state = PENDING_REQUEST;
				break;
			case PENDING_REQUEST:
				state = PENDING_REQUEST;
				break;
			case EXTRA_REQUEST:
				state = PENDING_REQUEST;
				break;
		}
	}


	function sendCallback(time)
	{
		switch (state)
		{
			case NO_REQUEST:
				// This state should not be possible. How can there be no
				// request, yet somehow we are actively fulfilling a
				// request?
				throw new Error(
					'Unexpected send callback.\n' +
					'Please report this to <https://github.com/evancz/elm-effects/issues>.'
				);

			case PENDING_REQUEST:
				// At this point, we do not *know* that another frame is
				// needed, but we make an extra request to rAF just in
				// case. It's possible to drop a frame if rAF is called
				// too late, so we just do it preemptively.
				_requestAnimationFrame(sendCallback);
				state = EXTRA_REQUEST;

				// There's also stuff we definitely need to send.
				send(time);
				return;

			case EXTRA_REQUEST:
				// Turns out the extra request was not needed, so we will
				// stop calling rAF. No reason to call it all the time if
				// no one needs it.
				state = NO_REQUEST;
				return;
		}
	}


	function send(time)
	{
		for (var i = messageArray.length; i--; )
		{
			var messages = A3(
				List.foldl,
				F2( function(toAction, list) { return List.Cons(toAction(time), list); } ),
				List.Nil,
				messageArray[i].tickMessages
			);
			Task.perform( A2(Signal.send, messageArray[i].address, messages) );
		}
		messageArray = [];
	}


	function requestTickSending(address, tickMessages)
	{
		return Task.asyncFunction(function(callback) {
			batchedSending(address, tickMessages);
			callback(Task.succeed(Utils.Tuple0));
		});
	}


	return localRuntime.Native.Effects.values = {
		requestTickSending: F2(requestTickSending)
	};

};

Elm.Native.Time = {};

Elm.Native.Time.make = function(localRuntime)
{
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Time = localRuntime.Native.Time || {};
	if (localRuntime.Native.Time.values)
	{
		return localRuntime.Native.Time.values;
	}

	var NS = Elm.Native.Signal.make(localRuntime);
	var Maybe = Elm.Maybe.make(localRuntime);


	// FRAMES PER SECOND

	function fpsWhen(desiredFPS, isOn)
	{
		var msPerFrame = 1000 / desiredFPS;
		var ticker = NS.input('fps-' + desiredFPS, null);

		function notifyTicker()
		{
			localRuntime.notify(ticker.id, null);
		}

		function firstArg(x, y)
		{
			return x;
		}

		// input fires either when isOn changes, or when ticker fires.
		// Its value is a tuple with the current timestamp, and the state of isOn
		var input = NS.timestamp(A3(NS.map2, F2(firstArg), NS.dropRepeats(isOn), ticker));

		var initialState = {
			isOn: false,
			time: localRuntime.timer.programStart,
			delta: 0
		};

		var timeoutId;

		function update(input, state)
		{
			var currentTime = input._0;
			var isOn = input._1;
			var wasOn = state.isOn;
			var previousTime = state.time;

			if (isOn)
			{
				timeoutId = localRuntime.setTimeout(notifyTicker, msPerFrame);
			}
			else if (wasOn)
			{
				clearTimeout(timeoutId);
			}

			return {
				isOn: isOn,
				time: currentTime,
				delta: (isOn && !wasOn) ? 0 : currentTime - previousTime
			};
		}

		return A2(
			NS.map,
			function(state) { return state.delta; },
			A3(NS.foldp, F2(update), update(input.value, initialState), input)
		);
	}


	// EVERY

	function every(t)
	{
		var ticker = NS.input('every-' + t, null);
		function tellTime()
		{
			localRuntime.notify(ticker.id, null);
		}
		var clock = A2(NS.map, fst, NS.timestamp(ticker));
		setInterval(tellTime, t);
		return clock;
	}


	function fst(pair)
	{
		return pair._0;
	}


	function read(s)
	{
		var t = Date.parse(s);
		return isNaN(t) ? Maybe.Nothing : Maybe.Just(t);
	}

	return localRuntime.Native.Time.values = {
		fpsWhen: F2(fpsWhen),
		every: every,
		toDate: function(t) { return new Date(t); },
		read: read
	};
};

Elm.Time = Elm.Time || {};
Elm.Time.make = function (_elm) {
   "use strict";
   _elm.Time = _elm.Time || {};
   if (_elm.Time.values) return _elm.Time.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Native$Signal = Elm.Native.Signal.make(_elm),
   $Native$Time = Elm.Native.Time.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   var delay = $Native$Signal.delay;
   var since = F2(function (time,signal) {
      var stop = A2($Signal.map,
      $Basics.always(-1),
      A2(delay,time,signal));
      var start = A2($Signal.map,$Basics.always(1),signal);
      var delaydiff = A3($Signal.foldp,
      F2(function (x,y) {    return x + y;}),
      0,
      A2($Signal.merge,start,stop));
      return A2($Signal.map,
      F2(function (x,y) {    return !_U.eq(x,y);})(0),
      delaydiff);
   });
   var timestamp = $Native$Signal.timestamp;
   var every = $Native$Time.every;
   var fpsWhen = $Native$Time.fpsWhen;
   var fps = function (targetFrames) {
      return A2(fpsWhen,targetFrames,$Signal.constant(true));
   };
   var inMilliseconds = function (t) {    return t;};
   var millisecond = 1;
   var second = 1000 * millisecond;
   var minute = 60 * second;
   var hour = 60 * minute;
   var inHours = function (t) {    return t / hour;};
   var inMinutes = function (t) {    return t / minute;};
   var inSeconds = function (t) {    return t / second;};
   return _elm.Time.values = {_op: _op
                             ,millisecond: millisecond
                             ,second: second
                             ,minute: minute
                             ,hour: hour
                             ,inMilliseconds: inMilliseconds
                             ,inSeconds: inSeconds
                             ,inMinutes: inMinutes
                             ,inHours: inHours
                             ,fps: fps
                             ,fpsWhen: fpsWhen
                             ,every: every
                             ,timestamp: timestamp
                             ,delay: delay
                             ,since: since};
};
Elm.Effects = Elm.Effects || {};
Elm.Effects.make = function (_elm) {
   "use strict";
   _elm.Effects = _elm.Effects || {};
   if (_elm.Effects.values) return _elm.Effects.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Effects = Elm.Native.Effects.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $Task = Elm.Task.make(_elm),
   $Time = Elm.Time.make(_elm);
   var _op = {};
   var ignore = function (task) {
      return A2($Task.map,$Basics.always({ctor: "_Tuple0"}),task);
   };
   var requestTickSending = $Native$Effects.requestTickSending;
   var toTaskHelp = F3(function (address,effect,_p0) {
      var _p1 = _p0;
      var _p5 = _p1._1;
      var _p4 = _p1;
      var _p3 = _p1._0;
      var _p2 = effect;
      switch (_p2.ctor)
      {case "Task": var reporter = A2($Task.andThen,
           _p2._0,
           function (answer) {
              return A2($Signal.send,address,_U.list([answer]));
           });
           return {ctor: "_Tuple2"
                  ,_0: A2($Task.andThen,
                  _p3,
                  $Basics.always(ignore($Task.spawn(reporter))))
                  ,_1: _p5};
         case "Tick": return {ctor: "_Tuple2"
                             ,_0: _p3
                             ,_1: A2($List._op["::"],_p2._0,_p5)};
         case "None": return _p4;
         default: return A3($List.foldl,toTaskHelp(address),_p4,_p2._0);}
   });
   var toTask = F2(function (address,effect) {
      var _p6 = A3(toTaskHelp,
      address,
      effect,
      {ctor: "_Tuple2"
      ,_0: $Task.succeed({ctor: "_Tuple0"})
      ,_1: _U.list([])});
      var combinedTask = _p6._0;
      var tickMessages = _p6._1;
      return $List.isEmpty(tickMessages) ? combinedTask : A2($Task.andThen,
      combinedTask,
      $Basics.always(A2(requestTickSending,address,tickMessages)));
   });
   var Never = function (a) {    return {ctor: "Never",_0: a};};
   var Batch = function (a) {    return {ctor: "Batch",_0: a};};
   var batch = Batch;
   var None = {ctor: "None"};
   var none = None;
   var Tick = function (a) {    return {ctor: "Tick",_0: a};};
   var tick = Tick;
   var Task = function (a) {    return {ctor: "Task",_0: a};};
   var task = Task;
   var map = F2(function (func,effect) {
      var _p7 = effect;
      switch (_p7.ctor)
      {case "Task": return Task(A2($Task.map,func,_p7._0));
         case "Tick": return Tick(function (_p8) {
              return func(_p7._0(_p8));
           });
         case "None": return None;
         default: return Batch(A2($List.map,map(func),_p7._0));}
   });
   return _elm.Effects.values = {_op: _op
                                ,none: none
                                ,task: task
                                ,tick: tick
                                ,map: map
                                ,batch: batch
                                ,toTask: toTask};
};
Elm.Material = Elm.Material || {};
Elm.Material.Helpers = Elm.Material.Helpers || {};
Elm.Material.Helpers.make = function (_elm) {
   "use strict";
   _elm.Material = _elm.Material || {};
   _elm.Material.Helpers = _elm.Material.Helpers || {};
   if (_elm.Material.Helpers.values)
   return _elm.Material.Helpers.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Effects = Elm.Effects.make(_elm),
   $Html = Elm.Html.make(_elm),
   $Html$Attributes = Elm.Html.Attributes.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $Task = Elm.Task.make(_elm),
   $Time = Elm.Time.make(_elm);
   var _op = {};
   var delay = F2(function (t,x) {
      return $Effects.task(A3($Basics.flip,
      $Task.andThen,
      $Basics.always($Task.succeed(x)),
      $Task.sleep(t)));
   });
   var fx = function (_p0) {
      return $Effects.task($Task.succeed(_p0));
   };
   var lift = F6(function (get,set,fwd,update,action,model) {
      var _p1 = A2(update,action,get(model));
      var submodel$ = _p1._0;
      var e = _p1._1;
      return {ctor: "_Tuple2"
             ,_0: A2(set,model,submodel$)
             ,_1: A2($Effects.map,fwd,e)};
   });
   var lift$ = F5(function (get,set,update,action,model) {
      return {ctor: "_Tuple2"
             ,_0: A2(set,model,A2(update,action,get(model)))
             ,_1: $Effects.none};
   });
   var map2nd = F2(function (f,_p2) {
      var _p3 = _p2;
      return {ctor: "_Tuple2",_0: _p3._0,_1: f(_p3._1)};
   });
   var map1st = F2(function (f,_p4) {
      var _p5 = _p4;
      return {ctor: "_Tuple2",_0: f(_p5._0),_1: _p5._1};
   });
   var map2 = F2(function (f,_p6) {
      var _p7 = _p6;
      return {ctor: "_Tuple3",_0: _p7._0,_1: f(_p7._1),_2: _p7._2};
   });
   var map1 = F2(function (f,_p8) {
      var _p9 = _p8;
      return {ctor: "_Tuple3",_0: f(_p9._0),_1: _p9._1,_2: _p9._2};
   });
   var blurOn = function (evt) {
      return A2($Html$Attributes.attribute,
      A2($Basics._op["++"],"on",evt),
      "this.blur()");
   };
   var clip = F3(function (lower,upper,k) {
      return A2($Basics.max,lower,A2($Basics.min,k,upper));
   });
   var mapFx = F2(function (f,_p10) {
      var _p11 = _p10;
      return {ctor: "_Tuple2"
             ,_0: _p11._0
             ,_1: A2($Effects.map,f,_p11._1)};
   });
   var addFx = F2(function (effect1,_p12) {
      var _p13 = _p12;
      return {ctor: "_Tuple2"
             ,_0: _p13._0
             ,_1: $Effects.batch(_U.list([effect1,_p13._1]))};
   });
   var effect = F2(function (e,x) {
      return {ctor: "_Tuple2",_0: x,_1: e};
   });
   var pure = effect($Effects.none);
   var filter = F3(function (elem,attr,html) {
      return A2(elem,
      attr,
      A2($List.filterMap,function (x) {    return x;},html));
   });
   return _elm.Material.Helpers.values = {_op: _op
                                         ,filter: filter
                                         ,effect: effect
                                         ,pure: pure
                                         ,addFx: addFx
                                         ,mapFx: mapFx
                                         ,clip: clip
                                         ,blurOn: blurOn
                                         ,map1: map1
                                         ,map2: map2
                                         ,map1st: map1st
                                         ,map2nd: map2nd
                                         ,lift$: lift$
                                         ,lift: lift
                                         ,fx: fx
                                         ,delay: delay};
};
Elm.Material = Elm.Material || {};
Elm.Material.Grid = Elm.Material.Grid || {};
Elm.Material.Grid.make = function (_elm) {
   "use strict";
   _elm.Material = _elm.Material || {};
   _elm.Material.Grid = _elm.Material.Grid || {};
   if (_elm.Material.Grid.values) return _elm.Material.Grid.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Html = Elm.Html.make(_elm),
   $List = Elm.List.make(_elm),
   $Material$Helpers = Elm.Material.Helpers.make(_elm),
   $Material$Style = Elm.Material.Style.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   var align = function (a) {
      var _p0 = a;
      switch (_p0.ctor)
      {case "Top": return $Material$Style.cs("mdl-cell--top");
         case "Middle": return $Material$Style.cs("mdl-cell--middle");
         default: return $Material$Style.cs("mdl-cell--bottom");}
   };
   var Bottom = {ctor: "Bottom"};
   var Middle = {ctor: "Middle"};
   var Top = {ctor: "Top"};
   var suffix = function (device) {
      var _p1 = device;
      switch (_p1.ctor)
      {case "All": return "";
         case "Desktop": return "-desktop";
         case "Tablet": return "-tablet";
         default: return "-phone";}
   };
   var size = F2(function (device,k) {
      var c = function () {
         var _p2 = device;
         switch (_p2.ctor)
         {case "All": return A3($Material$Helpers.clip,1,12,k);
            case "Desktop": return A3($Material$Helpers.clip,1,12,k);
            case "Tablet": return A3($Material$Helpers.clip,1,8,k);
            default: return A3($Material$Helpers.clip,1,4,k);}
      }();
      return $Material$Style.cs(A2($Basics._op["++"],
      "mdl-cell--",
      A2($Basics._op["++"],
      $Basics.toString(c),
      A2($Basics._op["++"],"-col",suffix(device)))));
   });
   var offset = F2(function (device,k) {
      var c = function () {
         var _p3 = device;
         switch (_p3.ctor)
         {case "All": return A3($Material$Helpers.clip,1,11,k);
            case "Desktop": return A3($Material$Helpers.clip,1,11,k);
            case "Tablet": return A3($Material$Helpers.clip,1,7,k);
            default: return A3($Material$Helpers.clip,1,3,k);}
      }();
      return $Material$Style.cs(A2($Basics._op["++"],
      "mdl-cell--",
      A2($Basics._op["++"],
      $Basics.toString(c),
      A2($Basics._op["++"],"-offset",suffix(device)))));
   });
   var hide = function (device) {
      return $Material$Style.cs(function () {
         var _p4 = device;
         if (_p4.ctor === "All") {
               return "";
            } else {
               return A2($Basics._op["++"],
               "mdl-cell--hide-",
               suffix(device));
            }
      }());
   };
   var order = F2(function (device,n) {
      return $Material$Style.cs(A2($Basics._op["++"],
      "mdl-cell--order-",
      A2($Basics._op["++"],
      $Basics.toString(A3($Material$Helpers.clip,1,12,n)),
      suffix(device))));
   });
   var Cell = function (a) {    return {ctor: "Cell",_0: a};};
   var cell = F2(function (styling,elms) {
      return Cell(A2($Material$Style.div,
      A2($List._op["::"],$Material$Style.cs("mdl-cell"),styling),
      elms));
   });
   var Phone = {ctor: "Phone"};
   var Tablet = {ctor: "Tablet"};
   var Desktop = {ctor: "Desktop"};
   var All = {ctor: "All"};
   var grid = F2(function (styling,cells) {
      return A2($Material$Style.div,
      A2($List._op["::"],$Material$Style.cs("mdl-grid"),styling),
      A2($List.map,
      function (_p5) {
         var _p6 = _p5;
         return _p6._0;
      },
      cells));
   });
   var maxWidth = function (w) {
      return A2($Material$Style.css,"max-width",w);
   };
   var noSpacing = $Material$Style.cs("mdl-grid--no-spacing");
   return _elm.Material.Grid.values = {_op: _op
                                      ,grid: grid
                                      ,noSpacing: noSpacing
                                      ,maxWidth: maxWidth
                                      ,cell: cell
                                      ,size: size
                                      ,offset: offset
                                      ,align: align
                                      ,hide: hide
                                      ,order: order
                                      ,All: All
                                      ,Desktop: Desktop
                                      ,Tablet: Tablet
                                      ,Phone: Phone
                                      ,Top: Top
                                      ,Middle: Middle
                                      ,Bottom: Bottom};
};

// setup
Elm.Native = Elm.Native || {};
Elm.Native.Markdown = Elm.Native.Markdown || {};

// definition
Elm.Native.Markdown.make = function(localRuntime) {
	'use strict';

	// attempt to short-circuit
	if ('values' in Elm.Native.Markdown)
	{
		return Elm.Native.Markdown.values;
	}

	var Element = Elm.Native.Graphics.Element.make(localRuntime);

	var marked = (function() {
		// catch the `marked` object regardless of the outer environment.
		// (ex. a CommonJS module compatible environment.)
		// note that this depends on marked's implementation of environment detection.
		var module = {};
		var exports = module.exports = {};

		/**
		 * marked - a markdown parser
		 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
		 * https://github.com/chjj/marked
		 */
		(function(){var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment|closed|closing) *(?:\n{2,}|\s*$)/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};block.bullet=/(?:[*+-]|\d+\.)/;block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;block.item=replace(block.item,"gm")(/bull/g,block.bullet)();block.list=replace(block.list)(/bull/g,block.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+block.def.source+")")();block.blockquote=replace(block.blockquote)("def",block.def)();block._tag="(?!(?:"+"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code"+"|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo"+"|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";block.html=replace(block.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)();block.paragraph=replace(block.paragraph)("hr",block.hr)("heading",block.heading)("lheading",block.lheading)("blockquote",block.blockquote)("tag","<"+block._tag)("def",block.def)();block.normal=merge({},block);block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,paragraph:/^/});block.gfm.paragraph=replace(block.paragraph)("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|"+block.list.source.replace("\\1","\\3")+"|")();block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/});function Lexer(options){this.tokens=[];this.tokens.links={};this.options=options||marked.defaults;this.rules=block.normal;if(this.options.gfm){if(this.options.tables){this.rules=block.tables}else{this.rules=block.gfm}}}Lexer.rules=block;Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)};Lexer.prototype.lex=function(src){src=src.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n");return this.token(src,true)};Lexer.prototype.token=function(src,top,bq){var src=src.replace(/^ +$/gm,""),next,loose,cap,bull,b,item,space,i,l;while(src){if(cap=this.rules.newline.exec(src)){src=src.substring(cap[0].length);if(cap[0].length>1){this.tokens.push({type:"space"})}}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);cap=cap[0].replace(/^ {4}/gm,"");this.tokens.push({type:"code",text:!this.options.pedantic?cap.replace(/\n+$/,""):cap});continue}if(cap=this.rules.fences.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"code",lang:cap[2],text:cap[3]});continue}if(cap=this.rules.heading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[1].length,text:cap[2]});continue}if(top&&(cap=this.rules.nptable.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].split(/ *\| */)}this.tokens.push(item);continue}if(cap=this.rules.lheading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[2]==="="?1:2,text:cap[1]});continue}if(cap=this.rules.hr.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"hr"});continue}if(cap=this.rules.blockquote.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"blockquote_start"});cap=cap[0].replace(/^ *> ?/gm,"");this.token(cap,top,true);this.tokens.push({type:"blockquote_end"});continue}if(cap=this.rules.list.exec(src)){src=src.substring(cap[0].length);bull=cap[2];this.tokens.push({type:"list_start",ordered:bull.length>1});cap=cap[0].match(this.rules.item);next=false;l=cap.length;i=0;for(;i<l;i++){item=cap[i];space=item.length;item=item.replace(/^ *([*+-]|\d+\.) +/,"");if(~item.indexOf("\n ")){space-=item.length;item=!this.options.pedantic?item.replace(new RegExp("^ {1,"+space+"}","gm"),""):item.replace(/^ {1,4}/gm,"")}if(this.options.smartLists&&i!==l-1){b=block.bullet.exec(cap[i+1])[0];if(bull!==b&&!(bull.length>1&&b.length>1)){src=cap.slice(i+1).join("\n")+src;i=l-1}}loose=next||/\n\n(?!\s*$)/.test(item);if(i!==l-1){next=item.charAt(item.length-1)==="\n";if(!loose)loose=next}this.tokens.push({type:loose?"loose_item_start":"list_item_start"});this.token(item,false,bq);this.tokens.push({type:"list_item_end"})}this.tokens.push({type:"list_end"});continue}if(cap=this.rules.html.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:cap[1]==="pre"||cap[1]==="script"||cap[1]==="style",text:cap[0]});continue}if(!bq&&top&&(cap=this.rules.def.exec(src))){src=src.substring(cap[0].length);this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};continue}if(top&&(cap=this.rules.table.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */)}this.tokens.push(item);continue}if(top&&(cap=this.rules.paragraph.exec(src))){src=src.substring(cap[0].length);this.tokens.push({type:"paragraph",text:cap[1].charAt(cap[1].length-1)==="\n"?cap[1].slice(0,-1):cap[1]});continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"text",text:cap[0]});continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return this.tokens};var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};inline._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;inline.link=replace(inline.link)("inside",inline._inside)("href",inline._href)();inline.reflink=replace(inline.reflink)("inside",inline._inside)();inline.normal=merge({},inline);inline.pedantic=merge({},inline.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/});inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)("]|","~]|")("|","|https?://|")()});inline.breaks=merge({},inline.gfm,{br:replace(inline.br)("{2,}","*")(),text:replace(inline.gfm.text)("{2,}","*")()});function InlineLexer(links,options){this.options=options||marked.defaults;this.links=links;this.rules=inline.normal;this.renderer=this.options.renderer||new Renderer;this.renderer.options=this.options;if(!this.links){throw new Error("Tokens array requires a `links` property.")}if(this.options.gfm){if(this.options.breaks){this.rules=inline.breaks}else{this.rules=inline.gfm}}else if(this.options.pedantic){this.rules=inline.pedantic}}InlineLexer.rules=inline;InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)};InlineLexer.prototype.output=function(src){var out="",link,text,href,cap;while(src){if(cap=this.rules.escape.exec(src)){src=src.substring(cap[0].length);out+=cap[1];continue}if(cap=this.rules.autolink.exec(src)){src=src.substring(cap[0].length);if(cap[2]==="@"){text=cap[1].charAt(6)===":"?this.mangle(cap[1].substring(7)):this.mangle(cap[1]);href=this.mangle("mailto:")+text}else{text=escape(cap[1]);href=text}out+=this.renderer.link(href,null,text);continue}if(!this.inLink&&(cap=this.rules.url.exec(src))){src=src.substring(cap[0].length);text=escape(cap[1]);href=text;out+=this.renderer.link(href,null,text);continue}if(cap=this.rules.tag.exec(src)){if(!this.inLink&&/^<a /i.test(cap[0])){this.inLink=true}else if(this.inLink&&/^<\/a>/i.test(cap[0])){this.inLink=false}src=src.substring(cap[0].length);out+=this.options.sanitize?escape(cap[0]):cap[0];continue}if(cap=this.rules.link.exec(src)){src=src.substring(cap[0].length);this.inLink=true;out+=this.outputLink(cap,{href:cap[2],title:cap[3]});this.inLink=false;continue}if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){src=src.substring(cap[0].length);link=(cap[2]||cap[1]).replace(/\s+/g," ");link=this.links[link.toLowerCase()];if(!link||!link.href){out+=cap[0].charAt(0);src=cap[0].substring(1)+src;continue}this.inLink=true;out+=this.outputLink(cap,link);this.inLink=false;continue}if(cap=this.rules.strong.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.strong(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.em.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.em(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.codespan(escape(cap[2],true));continue}if(cap=this.rules.br.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.br();continue}if(cap=this.rules.del.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.del(this.output(cap[1]));continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);out+=escape(this.smartypants(cap[0]));continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return out};InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return cap[0].charAt(0)!=="!"?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]))};InlineLexer.prototype.smartypants=function(text){if(!this.options.smartypants)return text;return text.replace(/--/g,"—").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")};InlineLexer.prototype.mangle=function(text){var out="",l=text.length,i=0,ch;for(;i<l;i++){ch=text.charCodeAt(i);if(Math.random()>.5){ch="x"+ch.toString(16)}out+="&#"+ch+";"}return out};function Renderer(options){this.options=options||{}}Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);if(out!=null&&out!==code){escaped=true;code=out}}if(!lang){return"<pre><code>"+(escaped?code:escape(code,true))+"\n</code></pre>"}return'<pre><code class="'+this.options.langPrefix+escape(lang,true)+'">'+(escaped?code:escape(code,true))+"\n</code></pre>\n"};Renderer.prototype.blockquote=function(quote){return"<blockquote>\n"+quote+"</blockquote>\n"};Renderer.prototype.html=function(html){return html};Renderer.prototype.heading=function(text,level,raw){return"<h"+level+' id="'+this.options.headerPrefix+raw.toLowerCase().replace(/[^\w]+/g,"-")+'">'+text+"</h"+level+">\n"};Renderer.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"};Renderer.prototype.list=function(body,ordered){var type=ordered?"ol":"ul";return"<"+type+">\n"+body+"</"+type+">\n"};Renderer.prototype.listitem=function(text){return"<li>"+text+"</li>\n"};Renderer.prototype.paragraph=function(text){return"<p>"+text+"</p>\n"};Renderer.prototype.table=function(header,body){return"<table>\n"+"<thead>\n"+header+"</thead>\n"+"<tbody>\n"+body+"</tbody>\n"+"</table>\n"};Renderer.prototype.tablerow=function(content){return"<tr>\n"+content+"</tr>\n"};Renderer.prototype.tablecell=function(content,flags){var type=flags.header?"th":"td";var tag=flags.align?"<"+type+' style="text-align:'+flags.align+'">':"<"+type+">";return tag+content+"</"+type+">\n"};Renderer.prototype.strong=function(text){return"<strong>"+text+"</strong>"};Renderer.prototype.em=function(text){return"<em>"+text+"</em>"};Renderer.prototype.codespan=function(text){return"<code>"+text+"</code>"};Renderer.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"};Renderer.prototype.del=function(text){return"<del>"+text+"</del>"};Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(prot.indexOf("javascript:")===0){return""}}var out='<a href="'+href+'"';if(title){out+=' title="'+title+'"'}out+=">"+text+"</a>";return out};Renderer.prototype.image=function(href,title,text){var out='<img src="'+href+'" alt="'+text+'"';if(title){out+=' title="'+title+'"'}out+=this.options.xhtml?"/>":">";return out};function Parser(options){this.tokens=[];this.token=null;this.options=options||marked.defaults;this.options.renderer=this.options.renderer||new Renderer;this.renderer=this.options.renderer;this.renderer.options=this.options}Parser.parse=function(src,options,renderer){var parser=new Parser(options,renderer);return parser.parse(src)};Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options,this.renderer);this.tokens=src.reverse();var out="";while(this.next()){out+=this.tok()}return out};Parser.prototype.next=function(){return this.token=this.tokens.pop()};Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};Parser.prototype.parseText=function(){var body=this.token.text;while(this.peek().type==="text"){body+="\n"+this.next().text}return this.inline.output(body)};Parser.prototype.tok=function(){switch(this.token.type){case"space":{return""}case"hr":{return this.renderer.hr()}case"heading":{return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text)}case"code":{return this.renderer.code(this.token.text,this.token.lang,this.token.escaped)}case"table":{var header="",body="",i,row,cell,flags,j;cell="";for(i=0;i<this.token.header.length;i++){flags={header:true,align:this.token.align[i]};cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:true,align:this.token.align[i]})}header+=this.renderer.tablerow(cell);for(i=0;i<this.token.cells.length;i++){row=this.token.cells[i];cell="";for(j=0;j<row.length;j++){cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:false,align:this.token.align[j]})}body+=this.renderer.tablerow(cell)}return this.renderer.table(header,body)}case"blockquote_start":{var body="";while(this.next().type!=="blockquote_end"){body+=this.tok()}return this.renderer.blockquote(body)}case"list_start":{var body="",ordered=this.token.ordered;while(this.next().type!=="list_end"){body+=this.tok()}return this.renderer.list(body,ordered)}case"list_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.token.type==="text"?this.parseText():this.tok()}return this.renderer.listitem(body)}case"loose_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.tok()}return this.renderer.listitem(body)}case"html":{var html=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(html)}case"paragraph":{return this.renderer.paragraph(this.inline.output(this.token.text))}case"text":{return this.renderer.paragraph(this.parseText())}}};function escape(html,encode){return html.replace(!encode?/&(?!#?\w+;)/g:/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function unescape(html){return html.replace(/&([#\w]+);/g,function(_,n){n=n.toLowerCase();if(n==="colon")return":";if(n.charAt(0)==="#"){return n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1))}return""})}function replace(regex,opt){regex=regex.source;opt=opt||"";return function self(name,val){if(!name)return new RegExp(regex,opt);val=val.source||val;val=val.replace(/(^|[^\[])\^/g,"$1");regex=regex.replace(name,val);return self}}function noop(){}noop.exec=noop;function merge(obj){var i=1,target,key;for(;i<arguments.length;i++){target=arguments[i];for(key in target){if(Object.prototype.hasOwnProperty.call(target,key)){obj[key]=target[key]}}}return obj}function marked(src,opt,callback){if(callback||typeof opt==="function"){if(!callback){callback=opt;opt=null}opt=merge({},marked.defaults,opt||{});var highlight=opt.highlight,tokens,pending,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(err){if(err){opt.highlight=highlight;return callback(err)}var out;try{out=Parser.parse(tokens,opt)}catch(e){err=e}opt.highlight=highlight;return err?callback(err):callback(null,out)};if(!highlight||highlight.length<3){return done()}delete opt.highlight;if(!pending)return done();for(;i<tokens.length;i++){(function(token){if(token.type!=="code"){return--pending||done()}return highlight(token.text,token.lang,function(err,code){if(err)return done(err);if(code==null||code===token.text){return--pending||done()}token.text=code;token.escaped=true;--pending||done()})})(tokens[i])}return}try{if(opt)opt=merge({},marked.defaults,opt);return Parser.parse(Lexer.lex(src,opt),opt)}catch(e){e.message+="\nPlease report this to https://github.com/chjj/marked.";if((opt||marked.defaults).silent){return"<p>An error occured:</p><pre>"+escape(e.message+"",true)+"</pre>"}throw e}}marked.options=marked.setOptions=function(opt){merge(marked.defaults,opt);return marked};marked.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,smartLists:false,silent:false,highlight:null,langPrefix:"lang-",smartypants:false,headerPrefix:"",renderer:new Renderer,xhtml:false};marked.Parser=Parser;marked.parser=Parser.parse;marked.Renderer=Renderer;marked.Lexer=Lexer;marked.lexer=Lexer.lex;marked.InlineLexer=InlineLexer;marked.inlineLexer=InlineLexer.output;marked.parse=marked;if(typeof module!=="undefined"&&typeof exports==="object"){module.exports=marked}else if(typeof define==="function"&&define.amd){define(function(){return marked})}else{this.marked=marked}}).call(function(){return this||(typeof window!=="undefined"?window:global)}());

		return module.exports;
	})();

	function formatOptions(options) {
		var toHighlight = function (code, lang) {
			if (!lang && options.defaultHighlighting.ctor === 'Just')
			{
				lang = options.defaultHighlighting._0;
			}
			if (typeof hljs !== 'undefined'
				&& lang
				&& hljs.listLanguages().indexOf(lang) >= 0)
			{
				return hljs.highlight(lang, code, true).value;
			}
			return code;
		};
		var gfm = options.githubFlavored;
		if (gfm.ctor === 'Just')
		{
			return {
				highlight: toHighlight,
				gfm: true,
				tables: gfm._0.tables,
				breaks: gfm._0.breaks,
				sanitize: options.sanitize,
				smartypants: options.smartypants
			};
		}
		else
		{
			return {
				highlight: toHighlight,
				gfm: false,
				tables: false,
				breaks: false,
				sanitize: options.sanitize,
				smartypants: options.smartypants
			};
		}
	}

	function toHtmlWith(options, rawMarkdown)
	{
		return new MarkdownWidget(options, rawMarkdown);
	}

	function MarkdownWidget(options, rawMarkdown)
	{
		this.options = options;
		this.markdown = rawMarkdown;
	}

	MarkdownWidget.prototype.type = "Widget";

	MarkdownWidget.prototype.init = function init()
	{
		var html = marked(this.markdown, formatOptions(this.options));
		var div = document.createElement('div');
		div.innerHTML = html;
		return div;
	};

	MarkdownWidget.prototype.update = function update(previous, node)
	{
		if (this.markdown !== previous.markdown || this.options != previous.options)
		{
			var html = marked(this.markdown, formatOptions(this.options));
			node.innerHTML = html;
		}
		return node;
	};


	function toElementWith(options, rawMarkdown)
	{
		return Element.markdown(marked(rawMarkdown, formatOptions(options)));
	}

	return Elm.Native.Markdown.values = {
		toHtmlWith: F2(toHtmlWith),
		toElementWith: F2(toElementWith)
	};
};

Elm.Markdown = Elm.Markdown || {};
Elm.Markdown.make = function (_elm) {
   "use strict";
   _elm.Markdown = _elm.Markdown || {};
   if (_elm.Markdown.values) return _elm.Markdown.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Graphics$Element = Elm.Graphics.Element.make(_elm),
   $Html = Elm.Html.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Markdown = Elm.Native.Markdown.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   var toElementWith = $Native$Markdown.toElementWith;
   var toHtmlWith = $Native$Markdown.toHtmlWith;
   var defaultOptions = {githubFlavored: $Maybe.Just({tables: false
                                                     ,breaks: false})
                        ,defaultHighlighting: $Maybe.Nothing
                        ,sanitize: false
                        ,smartypants: false};
   var Options = F4(function (a,b,c,d) {
      return {githubFlavored: a
             ,defaultHighlighting: b
             ,sanitize: c
             ,smartypants: d};
   });
   var toElement = function (string) {
      return A2($Native$Markdown.toElementWith,
      defaultOptions,
      string);
   };
   var toHtml = function (string) {
      return A2($Native$Markdown.toHtmlWith,defaultOptions,string);
   };
   return _elm.Markdown.values = {_op: _op
                                 ,toHtml: toHtml
                                 ,toElement: toElement
                                 ,Options: Options
                                 ,defaultOptions: defaultOptions
                                 ,toHtmlWith: toHtmlWith
                                 ,toElementWith: toElementWith};
};
Elm.Html = Elm.Html || {};
Elm.Html.Events = Elm.Html.Events || {};
Elm.Html.Events.make = function (_elm) {
   "use strict";
   _elm.Html = _elm.Html || {};
   _elm.Html.Events = _elm.Html.Events || {};
   if (_elm.Html.Events.values) return _elm.Html.Events.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Html = Elm.Html.make(_elm),
   $Json$Decode = Elm.Json.Decode.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $VirtualDom = Elm.VirtualDom.make(_elm);
   var _op = {};
   var keyCode = A2($Json$Decode._op[":="],
   "keyCode",
   $Json$Decode.$int);
   var targetChecked = A2($Json$Decode.at,
   _U.list(["target","checked"]),
   $Json$Decode.bool);
   var targetValue = A2($Json$Decode.at,
   _U.list(["target","value"]),
   $Json$Decode.string);
   var defaultOptions = $VirtualDom.defaultOptions;
   var Options = F2(function (a,b) {
      return {stopPropagation: a,preventDefault: b};
   });
   var onWithOptions = $VirtualDom.onWithOptions;
   var on = $VirtualDom.on;
   var messageOn = F3(function (name,addr,msg) {
      return A3(on,
      name,
      $Json$Decode.value,
      function (_p0) {
         return A2($Signal.message,addr,msg);
      });
   });
   var onClick = messageOn("click");
   var onDoubleClick = messageOn("dblclick");
   var onMouseMove = messageOn("mousemove");
   var onMouseDown = messageOn("mousedown");
   var onMouseUp = messageOn("mouseup");
   var onMouseEnter = messageOn("mouseenter");
   var onMouseLeave = messageOn("mouseleave");
   var onMouseOver = messageOn("mouseover");
   var onMouseOut = messageOn("mouseout");
   var onBlur = messageOn("blur");
   var onFocus = messageOn("focus");
   var onSubmit = messageOn("submit");
   var onKey = F3(function (name,addr,handler) {
      return A3(on,
      name,
      keyCode,
      function (code) {
         return A2($Signal.message,addr,handler(code));
      });
   });
   var onKeyUp = onKey("keyup");
   var onKeyDown = onKey("keydown");
   var onKeyPress = onKey("keypress");
   return _elm.Html.Events.values = {_op: _op
                                    ,onBlur: onBlur
                                    ,onFocus: onFocus
                                    ,onSubmit: onSubmit
                                    ,onKeyUp: onKeyUp
                                    ,onKeyDown: onKeyDown
                                    ,onKeyPress: onKeyPress
                                    ,onClick: onClick
                                    ,onDoubleClick: onDoubleClick
                                    ,onMouseMove: onMouseMove
                                    ,onMouseDown: onMouseDown
                                    ,onMouseUp: onMouseUp
                                    ,onMouseEnter: onMouseEnter
                                    ,onMouseLeave: onMouseLeave
                                    ,onMouseOver: onMouseOver
                                    ,onMouseOut: onMouseOut
                                    ,on: on
                                    ,onWithOptions: onWithOptions
                                    ,defaultOptions: defaultOptions
                                    ,targetValue: targetValue
                                    ,targetChecked: targetChecked
                                    ,keyCode: keyCode
                                    ,Options: Options};
};
Elm.Material = Elm.Material || {};
Elm.Material.Ripple = Elm.Material.Ripple || {};
Elm.Material.Ripple.make = function (_elm) {
   "use strict";
   _elm.Material = _elm.Material || {};
   _elm.Material.Ripple = _elm.Material.Ripple || {};
   if (_elm.Material.Ripple.values)
   return _elm.Material.Ripple.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $DOM = Elm.DOM.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Effects = Elm.Effects.make(_elm),
   $Html = Elm.Html.make(_elm),
   $Html$Attributes = Elm.Html.Attributes.make(_elm),
   $Html$Events = Elm.Html.Events.make(_elm),
   $Json$Decode = Elm.Json.Decode.make(_elm),
   $List = Elm.List.make(_elm),
   $Material$Helpers = Elm.Material.Helpers.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   var styles = F2(function (m,frame) {
      var r = m.rect;
      var toPx = function (k) {
         return A2($Basics._op["++"],
         $Basics.toString($Basics.round(k)),
         "px");
      };
      var offset = A2($Basics._op["++"],
      "translate(",
      A2($Basics._op["++"],
      toPx(m.x),
      A2($Basics._op["++"],
      ", ",
      A2($Basics._op["++"],toPx(m.y),")"))));
      var rippleSize = toPx($Basics.sqrt(r.width * r.width + r.height * r.height) * 2.0 + 2.0);
      var scale = _U.eq(frame,0) ? "scale(0.0001, 0.0001)" : "";
      var transformString = A2($Basics._op["++"],
      "translate(-50%, -50%) ",
      A2($Basics._op["++"],offset,scale));
      return _U.list([{ctor: "_Tuple2",_0: "width",_1: rippleSize}
                     ,{ctor: "_Tuple2",_0: "height",_1: rippleSize}
                     ,{ctor: "_Tuple2",_0: "-webkit-transform",_1: transformString}
                     ,{ctor: "_Tuple2",_0: "-ms-transform",_1: transformString}
                     ,{ctor: "_Tuple2",_0: "transform",_1: transformString}]);
   });
   var Tick = {ctor: "Tick"};
   var Up = {ctor: "Up"};
   var upOn = F2(function (name,addr) {
      return A3($Html$Events.on,
      name,
      $Json$Decode.succeed({ctor: "_Tuple0"}),
      function (_p0) {
         return A2($Signal.message,
         addr,
         function (_p1) {
            return Up;
         }(_p0));
      });
   });
   var Down = function (a) {    return {ctor: "Down",_0: a};};
   var Geometry = F5(function (a,b,c,d,e) {
      return {rect: a,clientX: b,clientY: c,touchX: d,touchY: e};
   });
   var geometryDecoder = A6($Json$Decode.object5,
   Geometry,
   $DOM.target($DOM.boundingClientRect),
   $Json$Decode.maybe(A2($Json$Decode._op[":="],
   "clientX",
   $Json$Decode.$float)),
   $Json$Decode.maybe(A2($Json$Decode._op[":="],
   "clientY",
   $Json$Decode.$float)),
   $Json$Decode.maybe(A2($Json$Decode.at,
   _U.list(["touches","0","clientX"]),
   $Json$Decode.$float)),
   $Json$Decode.maybe(A2($Json$Decode.at,
   _U.list(["touches","0","clientY"]),
   $Json$Decode.$float)));
   var downOn = F2(function (name,addr) {
      return A3($Html$Events.on,
      name,
      geometryDecoder,
      function (_p2) {
         return A2($Signal.message,addr,Down(_p2));
      });
   });
   var Model = F2(function (a,b) {
      return {animation: a,metrics: b};
   });
   var Inert = {ctor: "Inert"};
   var model = {animation: Inert,metrics: $Maybe.Nothing};
   var Frame = function (a) {    return {ctor: "Frame",_0: a};};
   var view = F3(function (addr,attrs,model) {
      var styling = function () {
         var _p3 = {ctor: "_Tuple2"
                   ,_0: model.metrics
                   ,_1: model.animation};
         if (_p3.ctor === "_Tuple2" && _p3._0.ctor === "Just") {
               if (_p3._1.ctor === "Frame") {
                     return A2(styles,_p3._0._0,_p3._1._0);
                  } else {
                     return A2(styles,_p3._0._0,1);
                  }
            } else {
               return _U.list([]);
            }
      }();
      return A2($Html.span,
      A2($List._op["::"],
      A2(downOn,"mousedown",addr),
      A2($List._op["::"],
      A2(downOn,"touchstart",addr),
      A2($List._op["::"],
      A2(upOn,"mouseup",addr),
      A2($List._op["::"],
      A2(upOn,"mouseleave",addr),
      A2($List._op["::"],
      A2(upOn,"touchend",addr),
      A2($List._op["::"],A2(upOn,"blur",addr),attrs)))))),
      _U.list([A2($Html.span,
      _U.list([$Html$Attributes.classList(_U.list([{ctor: "_Tuple2"
                                                   ,_0: "mdl-ripple"
                                                   ,_1: true}
                                                  ,{ctor: "_Tuple2"
                                                   ,_0: "is-animating"
                                                   ,_1: !_U.eq(model.animation,Frame(0))}
                                                  ,{ctor: "_Tuple2"
                                                   ,_0: "is-visible"
                                                   ,_1: !_U.eq(model.animation,Inert)}]))
              ,$Html$Attributes.style(styling)]),
      _U.list([]))]));
   });
   var Metrics = F3(function (a,b,c) {
      return {rect: a,x: b,y: c};
   });
   var computeMetrics = function (g) {
      var rect = g.rect;
      var set = F2(function (x,y) {
         return $Maybe.Just({ctor: "_Tuple2"
                            ,_0: x - rect.left
                            ,_1: y - rect.top});
      });
      return A2($Maybe.map,
      function (_p4) {
         var _p5 = _p4;
         return A3(Metrics,rect,_p5._0,_p5._1);
      },
      function () {
         var _p6 = {ctor: "_Tuple4"
                   ,_0: g.clientX
                   ,_1: g.clientY
                   ,_2: g.touchX
                   ,_3: g.touchY};
         _v2_3: do {
            if (_p6.ctor === "_Tuple4") {
                  if (_p6._0.ctor === "Just" && _p6._1.ctor === "Just") {
                        if (_p6._0._0 === 0.0 && _p6._1._0 === 0.0) {
                              return $Maybe.Just({ctor: "_Tuple2"
                                                 ,_0: rect.width / 2.0
                                                 ,_1: rect.height / 2.0});
                           } else {
                              return A2(set,_p6._0._0,_p6._1._0);
                           }
                     } else {
                        if (_p6._2.ctor === "Just" && _p6._3.ctor === "Just") {
                              return A2(set,_p6._2._0,_p6._3._0);
                           } else {
                              break _v2_3;
                           }
                     }
               } else {
                  break _v2_3;
               }
         } while (false);
         return $Maybe.Nothing;
      }());
   };
   var update = F2(function (action,model) {
      var _p7 = action;
      switch (_p7.ctor)
      {case "Down": return A2($Material$Helpers.effect,
           $Effects.tick(function (_p8) {    return Tick;}),
           _U.update(model,
           {animation: Frame(0),metrics: computeMetrics(_p7._0)}));
         case "Up": return A2($Material$Helpers.effect,
           $Effects.none,
           _U.update(model,{animation: Inert}));
         default: return A2($Material$Helpers.effect,
           $Effects.none,
           _U.update(model,{animation: Frame(1)}));}
   });
   return _elm.Material.Ripple.values = {_op: _op
                                        ,Metrics: Metrics
                                        ,Frame: Frame
                                        ,Inert: Inert
                                        ,Model: Model
                                        ,model: model
                                        ,Geometry: Geometry
                                        ,geometryDecoder: geometryDecoder
                                        ,computeMetrics: computeMetrics
                                        ,Down: Down
                                        ,Up: Up
                                        ,Tick: Tick
                                        ,update: update
                                        ,downOn: downOn
                                        ,upOn: upOn
                                        ,styles: styles
                                        ,view: view};
};
Elm.Material = Elm.Material || {};
Elm.Material.Component = Elm.Material.Component || {};
Elm.Material.Component.make = function (_elm) {
   "use strict";
   _elm.Material = _elm.Material || {};
   _elm.Material.Component = _elm.Material.Component || {};
   if (_elm.Material.Component.values)
   return _elm.Material.Component.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Dict = Elm.Dict.make(_elm),
   $Effects = Elm.Effects.make(_elm),
   $List = Elm.List.make(_elm),
   $Material$Helpers = Elm.Material.Helpers.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $Task = Elm.Task.make(_elm);
   var _op = {};
   var pick = F2(function (f,xs) {
      pick: while (true) {
         var _p0 = xs;
         if (_p0.ctor === "[]") {
               return $Maybe.Nothing;
            } else {
               var _p1 = f(_p0._0);
               if (_p1.ctor === "Nothing") {
                     var _v2 = f,_v3 = _p0._1;
                     f = _v2;
                     xs = _v3;
                     continue pick;
                  } else {
                     return _p1;
                  }
            }
      }
   });
   var connect = F2(function (observers,subaction) {
      return A2(pick,
      F2(function (x,y) {    return y(x);})(subaction),
      observers);
   });
   var observe = F3(function (f,update,action) {
      return function (_p2) {
         return function (_p3) {
            var _p4 = _p3;
            return {ctor: "_Tuple3",_0: _p4._0,_1: _p4._1,_2: f(action)};
         }(A2(update,action,_p2));
      };
   });
   var Instance = F5(function (a,b,c,d,e) {
      return {view: a,get: b,set: c,map: d,fwd: e};
   });
   var update = F3(function (fwd,_p5,container) {
      var _p6 = _p5;
      var _p7 = A2($Material$Helpers.map2,
      $Effects.map(fwd),
      _p6._0(container));
      var container$ = _p7._0;
      var fx = _p7._1;
      var obs = _p7._2;
      var _p8 = obs;
      if (_p8.ctor === "Nothing") {
            return {ctor: "_Tuple2",_0: container$,_1: fx};
         } else {
            return {ctor: "_Tuple2"
                   ,_0: container$
                   ,_1: $Effects.batch(_U.list([fx
                                               ,$Effects.task($Task.succeed(_p8._0))]))};
         }
   });
   var A = function (a) {    return {ctor: "A",_0: a};};
   var pack = F2(function (update,action) {
      return A(function (_p9) {
         return A2($Material$Helpers.map2,
         $Effects.map(pack(update)),
         A2(update,action,_p9));
      });
   });
   var instance$ = F3(function (lift,observers,embedding) {
      var set = embedding.setModel;
      var get = embedding.getModel;
      var fwd = function (_p10) {
         return lift(A2(pack,
         A2(observe,connect(observers),embedding.update),
         _p10));
      };
      return {view: function (addr) {
                return embedding.view(A2($Signal.forwardTo,addr,fwd));
             }
             ,get: get
             ,set: set
             ,map: F2(function (f,model) {
                return A2(set,f(get(model)),model);
             })
             ,fwd: fwd};
   });
   var embed = F4(function (view,update,get,set) {
      return {view: F2(function (addr,model) {
                return A2(view,addr,get(model));
             })
             ,update: F2(function (action,model) {
                return A2($Material$Helpers.map1st,
                A2($Basics.flip,set,model),
                A2(update,action,get(model)));
             })
             ,getModel: get
             ,setModel: set};
   });
   var embedIndexed = F6(function (view,update,get,set,model0,id) {
      var set$ = F2(function (submodel,model) {
         return A2(set,A3($Dict.insert,id,submodel,get(model)),model);
      });
      var get$ = function (model) {
         return A2($Maybe.withDefault,
         model0,
         A2($Dict.get,id,get(model)));
      };
      return A4(embed,view,update,get$,set$);
   });
   var instance = F8(function (view,
   update,
   get,
   set,
   id,
   lift,
   model0,
   observers) {
      return A3(instance$,
      lift,
      observers,
      A6(embedIndexed,view,update,get,set,model0,id));
   });
   var instance1 = F7(function (view,
   update,
   get,
   set,
   lift,
   model0,
   observers) {
      return A3(instance$,
      lift,
      observers,
      A4(embed,
      view,
      update,
      function (_p11) {
         return A2($Maybe.withDefault,model0,get(_p11));
      },
      function (_p12) {
         return set($Maybe.Just(_p12));
      }));
   });
   var Embedding = F4(function (a,b,c,d) {
      return {view: a,update: b,getModel: c,setModel: d};
   });
   return _elm.Material.Component.values = {_op: _op
                                           ,embed: embed
                                           ,embedIndexed: embedIndexed
                                           ,instance: instance
                                           ,instance1: instance1
                                           ,update: update
                                           ,Embedding: Embedding
                                           ,Instance: Instance};
};
Elm.Material = Elm.Material || {};
Elm.Material.Button = Elm.Material.Button || {};
Elm.Material.Button.make = function (_elm) {
   "use strict";
   _elm.Material = _elm.Material || {};
   _elm.Material.Button = _elm.Material.Button || {};
   if (_elm.Material.Button.values)
   return _elm.Material.Button.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Effects = Elm.Effects.make(_elm),
   $Html = Elm.Html.make(_elm),
   $Html$Attributes = Elm.Html.Attributes.make(_elm),
   $Html$Events = Elm.Html.Events.make(_elm),
   $List = Elm.List.make(_elm),
   $Material$Component = Elm.Material.Component.make(_elm),
   $Material$Helpers = Elm.Material.Helpers.make(_elm),
   $Material$Ripple = Elm.Material.Ripple.make(_elm),
   $Material$Style = Elm.Material.Style.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   var fwdClick = F2(function (obs,action) {
      var _p0 = action;
      if (_p0.ctor === "Click") {
            return $Maybe.Just(obs);
         } else {
            return $Maybe.Nothing;
         }
   });
   var accent = $Material$Style.cs("mdl-button--accent");
   var primary = $Material$Style.cs("mdl-button--primary");
   var colored = $Material$Style.cs("mdl-button--colored");
   var Click = {ctor: "Click"};
   var Ripple = function (a) {    return {ctor: "Ripple",_0: a};};
   var S = function (a) {    return {ctor: "S",_0: a};};
   var model = function (shouldRipple) {
      return shouldRipple ? S($Maybe.Just($Material$Ripple.model)) : S($Maybe.Nothing);
   };
   var update = F2(function (action,model) {
      var _p1 = action;
      if (_p1.ctor === "Click") {
            return {ctor: "_Tuple2",_0: model,_1: $Effects.none};
         } else {
            var _p2 = model;
            if (_p2._0.ctor === "Just") {
                  var _p3 = A2($Material$Ripple.update,_p1._0,_p2._0._0);
                  var ripple$ = _p3._0;
                  var e = _p3._1;
                  return {ctor: "_Tuple2"
                         ,_0: S($Maybe.Just(ripple$))
                         ,_1: A2($Effects.map,Ripple,e)};
               } else {
                  return {ctor: "_Tuple2",_0: model,_1: $Effects.none};
               }
         }
   });
   var instance = F5(function (id,lift,view,model0,observers) {
      return A8($Material$Component.instance,
      view,
      update,
      function (_) {
         return _.button;
      },
      F2(function (x,y) {    return _U.update(y,{button: x});}),
      id,
      lift,
      model0,
      observers);
   });
   var view = F5(function (kind,addr,model,styling,html) {
      return A3($Material$Style.styled,
      $Html.button,
      A2($List._op["::"],
      $Material$Style.cs("mdl-button"),
      A2($List._op["::"],
      $Material$Style.cs("mdl-js-button"),
      A2($List._op["::"],
      A2($Material$Style.cs$,
      "mdl-js-ripple-effect",
      !_U.eq(model,S($Maybe.Nothing))),
      A2($List._op["::"],
      A2($Material$Style.cs$,kind,!_U.eq(kind,"")),
      A2($List._op["::"],
      $Material$Style.attribute($Material$Helpers.blurOn("mouseup")),
      A2($List._op["::"],
      $Material$Style.attribute($Material$Helpers.blurOn("mouseleave")),
      A2($List._op["::"],
      $Material$Style.attribute(A2($Html$Events.onClick,addr,Click)),
      styling))))))),
      function () {
         var _p4 = model;
         if (_p4._0.ctor === "Just") {
               return A2($List._op["::"],
               A3($Material$Ripple.view,
               A2($Signal.forwardTo,addr,Ripple),
               _U.list([$Html$Attributes.$class("mdl-button__ripple-container")
                       ,$Material$Helpers.blurOn("mouseup")]),
               _p4._0._0),
               html);
            } else {
               return html;
            }
      }());
   });
   var flat = view("");
   var raised = view("mdl-button--raised");
   var fab = view("mdl-button--fab");
   var minifab = view("mdl-button--mini-fab");
   var icon = view("mdl-button--icon");
   return _elm.Material.Button.values = {_op: _op
                                        ,model: model
                                        ,update: update
                                        ,flat: flat
                                        ,raised: raised
                                        ,fab: fab
                                        ,minifab: minifab
                                        ,icon: icon
                                        ,colored: colored
                                        ,primary: primary
                                        ,accent: accent
                                        ,instance: instance
                                        ,fwdClick: fwdClick
                                        ,Click: Click};
};
Elm.Material = Elm.Material || {};
Elm.Material.Color = Elm.Material.Color || {};
Elm.Material.Color.make = function (_elm) {
   "use strict";
   _elm.Material = _elm.Material || {};
   _elm.Material.Color = _elm.Material.Color || {};
   if (_elm.Material.Color.values)
   return _elm.Material.Color.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Array = Elm.Array.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $List = Elm.List.make(_elm),
   $Material$Style = Elm.Material.Style.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   var text = function (_p0) {
      var _p1 = _p0;
      return $Material$Style.cs(A2($Basics._op["++"],
      "mdl-color-text--",
      _p1._0));
   };
   var background = function (_p2) {
      var _p3 = _p2;
      return $Material$Style.cs(A2($Basics._op["++"],
      "mdl-color--",
      _p3._0));
   };
   var C = function (a) {    return {ctor: "C",_0: a};};
   var white = C("white");
   var black = C("black");
   var primary = C("primary");
   var primaryDark = C("primary-dark");
   var primaryContrast = C("primary-contrast");
   var accent = C("accent");
   var accentContrast = C("accent-contrast");
   var shadeName = function (shade) {
      var _p4 = shade;
      switch (_p4.ctor)
      {case "S50": return "50";
         case "S100": return "100";
         case "S200": return "200";
         case "S300": return "300";
         case "S400": return "400";
         case "S500": return "500";
         case "S600": return "600";
         case "S700": return "700";
         case "S800": return "800";
         case "S900": return "900";
         case "A100": return "A100";
         case "A200": return "A200";
         case "A400": return "A400";
         default: return "A700";}
   };
   var A700 = {ctor: "A700"};
   var A400 = {ctor: "A400"};
   var A200 = {ctor: "A200"};
   var A100 = {ctor: "A100"};
   var S900 = {ctor: "S900"};
   var S800 = {ctor: "S800"};
   var S700 = {ctor: "S700"};
   var S600 = {ctor: "S600"};
   var S500 = {ctor: "S500"};
   var S400 = {ctor: "S400"};
   var S300 = {ctor: "S300"};
   var S200 = {ctor: "S200"};
   var S100 = {ctor: "S100"};
   var S50 = {ctor: "S50"};
   var shades = $Array.fromList(_U.list([S50
                                        ,S100
                                        ,S200
                                        ,S300
                                        ,S400
                                        ,S500
                                        ,S600
                                        ,S700
                                        ,S800
                                        ,S900
                                        ,A100
                                        ,A200
                                        ,A400
                                        ,A700]));
   var hueName = function (color) {
      var _p5 = color;
      switch (_p5.ctor)
      {case "Indigo": return "indigo";
         case "Blue": return "blue";
         case "LightBlue": return "light-blue";
         case "Cyan": return "cyan";
         case "Teal": return "teal";
         case "Green": return "green";
         case "LightGreen": return "light-green";
         case "Lime": return "lime";
         case "Yellow": return "yellow";
         case "Amber": return "amber";
         case "Orange": return "orange";
         case "Brown": return "brown";
         case "BlueGrey": return "blue-grey";
         case "Grey": return "grey";
         case "DeepOrange": return "deep-orange";
         case "Red": return "red";
         case "Pink": return "pink";
         case "Purple": return "purple";
         default: return "deep-purple";}
   };
   var color = F2(function (hue,shade) {
      return C(A2($Basics._op["++"],
      hueName(hue),
      A2($Basics._op["++"],"-",shadeName(shade))));
   });
   var scheme = F2(function (primary,accent) {
      var cssFile = function () {
         var _p6 = accent;
         switch (_p6.ctor)
         {case "Grey": return "";
            case "Brown": return "";
            case "BlueGrey": return "";
            default: return A2($Basics._op["++"],
              ".",
              A2($Basics._op["++"],
              hueName(primary),
              A2($Basics._op["++"],"-",hueName(accent))));}
      }();
      return A2($Basics._op["++"],
      "material",
      A2($Basics._op["++"],cssFile,".min.css"));
   });
   var DeepPurple = {ctor: "DeepPurple"};
   var Purple = {ctor: "Purple"};
   var Pink = {ctor: "Pink"};
   var Red = {ctor: "Red"};
   var DeepOrange = {ctor: "DeepOrange"};
   var Grey = {ctor: "Grey"};
   var BlueGrey = {ctor: "BlueGrey"};
   var Brown = {ctor: "Brown"};
   var Orange = {ctor: "Orange"};
   var Amber = {ctor: "Amber"};
   var Yellow = {ctor: "Yellow"};
   var Lime = {ctor: "Lime"};
   var LightGreen = {ctor: "LightGreen"};
   var Green = {ctor: "Green"};
   var Teal = {ctor: "Teal"};
   var Cyan = {ctor: "Cyan"};
   var LightBlue = {ctor: "LightBlue"};
   var Blue = {ctor: "Blue"};
   var Indigo = {ctor: "Indigo"};
   var hues = $Array.fromList(_U.list([Indigo
                                      ,Blue
                                      ,LightBlue
                                      ,Cyan
                                      ,Teal
                                      ,Green
                                      ,LightGreen
                                      ,Lime
                                      ,Yellow
                                      ,Amber
                                      ,Orange
                                      ,Brown
                                      ,BlueGrey
                                      ,Grey
                                      ,DeepOrange
                                      ,Red
                                      ,Pink
                                      ,Purple
                                      ,DeepPurple]));
   return _elm.Material.Color.values = {_op: _op
                                       ,hues: hues
                                       ,shades: shades
                                       ,color: color
                                       ,white: white
                                       ,black: black
                                       ,primary: primary
                                       ,primaryDark: primaryDark
                                       ,primaryContrast: primaryContrast
                                       ,accent: accent
                                       ,accentContrast: accentContrast
                                       ,background: background
                                       ,text: text
                                       ,scheme: scheme
                                       ,Indigo: Indigo
                                       ,Blue: Blue
                                       ,LightBlue: LightBlue
                                       ,Cyan: Cyan
                                       ,Teal: Teal
                                       ,Green: Green
                                       ,LightGreen: LightGreen
                                       ,Lime: Lime
                                       ,Yellow: Yellow
                                       ,Amber: Amber
                                       ,Orange: Orange
                                       ,Brown: Brown
                                       ,BlueGrey: BlueGrey
                                       ,Grey: Grey
                                       ,DeepOrange: DeepOrange
                                       ,Red: Red
                                       ,Pink: Pink
                                       ,Purple: Purple
                                       ,DeepPurple: DeepPurple
                                       ,S50: S50
                                       ,S100: S100
                                       ,S200: S200
                                       ,S300: S300
                                       ,S400: S400
                                       ,S500: S500
                                       ,S600: S600
                                       ,S700: S700
                                       ,S800: S800
                                       ,S900: S900
                                       ,A100: A100
                                       ,A200: A200
                                       ,A400: A400
                                       ,A700: A700};
};
Elm.Demo = Elm.Demo || {};
Elm.Demo.Page = Elm.Demo.Page || {};
Elm.Demo.Page.make = function (_elm) {
   "use strict";
   _elm.Demo = _elm.Demo || {};
   _elm.Demo.Page = _elm.Demo.Page || {};
   if (_elm.Demo.Page.values) return _elm.Demo.Page.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Html = Elm.Html.make(_elm),
   $Html$Attributes = Elm.Html.Attributes.make(_elm),
   $List = Elm.List.make(_elm),
   $Markdown = Elm.Markdown.make(_elm),
   $Material$Button = Elm.Material.Button.make(_elm),
   $Material$Color = Elm.Material.Color.make(_elm),
   $Material$Grid = Elm.Material.Grid.make(_elm),
   $Material$Icon = Elm.Material.Icon.make(_elm),
   $Material$Style = Elm.Material.Style.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   var addr = $Signal.mailbox($Material$Button.Click).address;
   var fab = function (url) {
      return A4($Material$Button.fab,
      addr,
      $Material$Button.model(false),
      _U.list([A2($Material$Style.css,"position","fixed")
              ,A2($Material$Style.css,"right","48px")
              ,A2($Material$Style.css,"top","72px")
              ,A2($Material$Style.css,"z-index","100")
              ,$Material$Button.colored
              ,$Material$Style.attribute(A2($Html$Attributes.attribute,
              "onclick",
              "alert(\'foo!\');"))]),
      _U.list([$Material$Icon.i("link")]));
   };
   var header = function (str) {    return $Html.text(str);};
   var title = function (t) {
      return A3($Material$Style.styled,
      $Html.h1,
      _U.list([$Material$Color.text($Material$Color.primary)]),
      _U.list([$Html.text(t)]));
   };
   var from = F3(function (title,url,body) {
      return A2($Html.div,
      _U.list([]),
      _U.list([$Html.text("From the ")
              ,A2($Html.a,
              _U.list([$Html$Attributes.href(url)]),
              _U.list([$Html.text(title)]))
              ,$Html.text(":")
              ,$Markdown.toHtml(body)]));
   });
   var fromMDL = from("Material Design Lite documentation");
   var fromMDS = from("Material Design Specification");
   var references = function (links) {
      return _U.list([header("References")
                     ,A2($Html.ul,
                     _U.list([$Html$Attributes.style(_U.list([{ctor: "_Tuple2"
                                                              ,_0: "padding-left"
                                                              ,_1: "0"}]))]),
                     A2($List.map,
                     function (_p0) {
                        var _p1 = _p0;
                        return A2($Html.li,
                        _U.list([$Html$Attributes.style(_U.list([{ctor: "_Tuple2"
                                                                 ,_0: "list-style-type"
                                                                 ,_1: "none"}]))]),
                        _U.list([A2($Html.a,
                        _U.list([$Html$Attributes.href(_p1._1)]),
                        _U.list([$Html.text(_p1._0)]))]));
                     },
                     links))]);
   };
   var body1 = F5(function (t,srcUrl,contents,links,demo) {
      return A2($Html.div,
      _U.list([]),
      _U.list([title(t)
              ,A2($Material$Grid.grid,
              _U.list([$Material$Grid.noSpacing]),
              _U.list([A2($Material$Grid.cell,
                      _U.list([A2($Material$Grid.size,$Material$Grid.All,6)
                              ,A2($Material$Grid.size,$Material$Grid.Phone,4)]),
                      _U.list([contents]))
                      ,A2($Material$Grid.cell,
                      _U.list([A2($Material$Grid.size,$Material$Grid.All,5)
                              ,A2($Material$Grid.offset,$Material$Grid.Desktop,1)
                              ,A2($Material$Grid.size,$Material$Grid.Phone,4)
                              ,$Material$Grid.align($Material$Grid.Top)
                              ,A2($Material$Style.css,"position","relative")]),
                      references(A2($List._op["::"],
                      {ctor: "_Tuple2",_0: "Demo source",_1: srcUrl},
                      links)))]))
              ,A2($Material$Style.div,
              _U.list([A2($Material$Style.css,"margin-bottom","48px")]),
              demo)]));
   });
   var body2 = body1;
   var body3 = F5(function (t,srcUrl,contents,links,demo) {
      return A2($Html.div,
      _U.list([]),
      _U.list([title(t)
              ,A2($Material$Grid.grid,
              _U.list([$Material$Grid.noSpacing]),
              _U.list([A2($Material$Grid.cell,
                      _U.list([A2($Material$Grid.size,$Material$Grid.All,4)
                              ,A2($Material$Grid.size,$Material$Grid.Desktop,5)
                              ,A2($Material$Grid.size,$Material$Grid.Tablet,8)]),
                      _U.list([contents
                              ,A2($Html.div,
                              _U.list([]),
                              references(A2($List._op["::"],
                              {ctor: "_Tuple2",_0: "Demo source",_1: srcUrl},
                              links)))]))
                      ,A2($Material$Grid.cell,
                      _U.list([A2($Material$Grid.size,$Material$Grid.Phone,4)
                              ,A2($Material$Grid.size,$Material$Grid.Desktop,5)
                              ,A2($Material$Grid.offset,$Material$Grid.Desktop,1)
                              ,A2($Material$Grid.size,$Material$Grid.Tablet,8)]),
                      demo)]))]));
   });
   var mdl = function (url) {
      return {ctor: "_Tuple2"
             ,_0: "Material Design Lite documentation"
             ,_1: url};
   };
   var mds = function (url) {
      return {ctor: "_Tuple2"
             ,_0: "Material Design Specification"
             ,_1: url};
   };
   var $package = function (url) {
      return {ctor: "_Tuple2",_0: "Package documentation",_1: url};
   };
   var demo = function (url) {
      return {ctor: "_Tuple2",_0: "Demo source",_1: url};
   };
   return _elm.Demo.Page.values = {_op: _op
                                  ,demo: demo
                                  ,$package: $package
                                  ,mds: mds
                                  ,mdl: mdl
                                  ,fromMDL: fromMDL
                                  ,fromMDS: fromMDS
                                  ,body1: body1
                                  ,body2: body2};
};
Elm.Demo = Elm.Demo || {};
Elm.Demo.Badges = Elm.Demo.Badges || {};
Elm.Demo.Badges.make = function (_elm) {
   "use strict";
   _elm.Demo = _elm.Demo || {};
   _elm.Demo.Badges = _elm.Demo.Badges || {};
   if (_elm.Demo.Badges.values) return _elm.Demo.Badges.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Demo$Page = Elm.Demo.Page.make(_elm),
   $Html = Elm.Html.make(_elm),
   $List = Elm.List.make(_elm),
   $Material$Badge = Elm.Material.Badge.make(_elm),
   $Material$Grid = Elm.Material.Grid.make(_elm),
   $Material$Icon = Elm.Material.Icon.make(_elm),
   $Material$Style = Elm.Material.Style.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   var references = _U.list([$Demo$Page.$package("http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Badge")
                            ,$Demo$Page.mdl("https://www.getmdl.io/components/#badges-section")]);
   var srcUrl = "https://github.com/debois/elm-mdl/blob/master/demo/Demo/Badges.elm";
   var intro = A2($Demo$Page.fromMDL,
   "http://www.getmdl.io/components/#badges-section",
   "\n> The Material Design Lite (MDL) badge component is an onscreen notification\n> element. A badge consists of a small circle, typically containing a number or\n> other characters, that appears in proximity to another object. A badge can be\n> both a notifier that there are additional items associated with an object and\n> an indicator of how many items there are.\n> \n> You can use a badge to unobtrusively draw the user\'s attention to items they\n> might not otherwise notice, or to emphasize that items may need their\n> attention. For example:\n> \n>  - A \"New messages\" notification might be followed by a badge containing the\n> number of unread messages.  \n>  - A \"You have unpurchased items in your shopping cart\" reminder might include\n>  a badge showing the number of items in the cart.\n>  - A \"Join the discussion!\" button might have an accompanying badge indicating the\n> number of users currently participating in the discussion.  \n> \n> A badge is almost\n> always positioned near a link so that the user has a convenient way to access\n> the additional information indicated by the badge. However, depending on the\n> intent, the badge itself may or may not be part of the link.\n> \n> Badges are a new feature in user interfaces, and provide users with a visual clue to help them discover additional relevant content. Their design and use is therefore an important factor in the overall user experience.\n> \n");
   var c = $Material$Grid.cell(_U.list([A2($Material$Grid.size,
   $Material$Grid.All,
   4)]));
   var view = A5($Demo$Page.body2,
   "Badges",
   srcUrl,
   intro,
   references,
   _U.list([A2($Html.p,
           _U.list([]),
           _U.list([$Html.text("Below are examples of various badges.")]))
           ,A2($Material$Grid.grid,
           _U.list([]),
           _U.list([c(_U.list([A2($Material$Style.span,
                   _U.list([$Material$Badge.withBadge("2")]),
                   _U.list([$Html.text("Badge")]))]))
                   ,c(_U.list([A2($Material$Style.span,
                   _U.list([$Material$Badge.withBadge("22")
                           ,$Material$Badge.noBackground]),
                   _U.list([$Html.text("No background")]))]))
                   ,c(_U.list([A2($Material$Style.span,
                   _U.list([$Material$Badge.withBadge("33")
                           ,$Material$Badge.overlap]),
                   _U.list([$Html.text("Overlap")]))]))
                   ,c(_U.list([A2($Material$Style.span,
                   _U.list([$Material$Badge.withBadge("99")
                           ,$Material$Badge.overlap
                           ,$Material$Badge.noBackground]),
                   _U.list([$Html.text("Overlap, no background")]))]))
                   ,c(_U.list([A2($Material$Style.span,
                   _U.list([$Material$Badge.withBadge("♥")]),
                   _U.list([$Html.text("Symbol")]))]))
                   ,c(_U.list([A2($Material$Icon.view,
                   "flight_takeoff",
                   _U.list([$Material$Icon.size24
                           ,$Material$Badge.withBadge("33")
                           ,$Material$Badge.overlap]))]))]))]));
   return _elm.Demo.Badges.values = {_op: _op
                                    ,c: c
                                    ,view: view
                                    ,intro: intro
                                    ,srcUrl: srcUrl
                                    ,references: references};
};
Elm.Demo = Elm.Demo || {};
Elm.Demo.Buttons = Elm.Demo.Buttons || {};
Elm.Demo.Buttons.make = function (_elm) {
   "use strict";
   _elm.Demo = _elm.Demo || {};
   _elm.Demo.Buttons = _elm.Demo.Buttons || {};
   if (_elm.Demo.Buttons.values) return _elm.Demo.Buttons.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Demo$Page = Elm.Demo.Page.make(_elm),
   $Dict = Elm.Dict.make(_elm),
   $Effects = Elm.Effects.make(_elm),
   $Html = Elm.Html.make(_elm),
   $Html$Attributes = Elm.Html.Attributes.make(_elm),
   $List = Elm.List.make(_elm),
   $Material$Button = Elm.Material.Button.make(_elm),
   $Material$Grid = Elm.Material.Grid.make(_elm),
   $Material$Icon = Elm.Material.Icon.make(_elm),
   $Material$Style = Elm.Material.Style.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   var references = _U.list([$Demo$Page.$package("http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Button")
                            ,$Demo$Page.mds("https://www.google.com/design/spec/components/buttons.html")
                            ,$Demo$Page.mdl("https://www.getmdl.io/components/#buttons-section")]);
   var srcUrl = "https://github.com/debois/elm-mdl/blob/master/demo/Demo/Buttons.elm";
   var intro = A2($Demo$Page.fromMDL,
   "https://www.getmdl.io/components/#buttons-section",
   "\n> The Material Design Lite (MDL) button component is an enhanced version of the\n> standard HTML `<button>` element. A button consists of text and/or an image that\n> clearly communicates what action will occur when the user clicks or touches it.\n> The MDL button component provides various types of buttons, and allows you to\n> add both display and click effects.\n>\n> Buttons are a ubiquitous feature of most user interfaces, regardless of a\n> site\'s content or function. Their design and use is therefore an important\n> factor in the overall user experience. See the button component\'s Material\n> Design specifications page for details.\n>\n> The available button display types are flat (default), raised, fab, mini-fab,\n> and icon; any of these types may be plain (light gray) or colored, and may be\n> initially or programmatically disabled. The fab, mini-fab, and icon button\n> types typically use a small image as their caption rather than text.\n\n");
   var Model = F2(function (a,b) {
      return {clicked: a,buttons: b};
   });
   var Action = F2(function (a,b) {
      return {ctor: "Action",_0: a,_1: b};
   });
   var update = F2(function (action,model) {
      var _p0 = action;
      var _p2 = _p0._0;
      return A2($Maybe.withDefault,
      {ctor: "_Tuple2",_0: model,_1: $Effects.none},
      A2($Maybe.map,
      function (m0) {
         var _p1 = A2($Material$Button.update,_p0._1,m0);
         var m1 = _p1._0;
         var e = _p1._1;
         return {ctor: "_Tuple2"
                ,_0: _U.update(model,
                {buttons: A3($Dict.insert,_p2,m1,model.buttons)})
                ,_1: A2($Effects.map,Action(_p2),e)};
      },
      A2($Dict.get,_p2,model.buttons)));
   });
   var describe = F3(function (kind,ripple,c) {
      return A2($Basics._op["++"],
      kind,
      A2($Basics._op["++"],
      ", ",
      A2($Basics._op["++"],c,ripple ? " w/ripple" : "")));
   });
   var view$ = F5(function (view,coloring,elem,addr,model) {
      return A4(view,addr,model,coloring,_U.list([elem]));
   });
   var row = F2(function (_p3,ripple) {
      var _p4 = _p3;
      return A2($List.indexedMap,
      F2(function (v0,v1) {
         return {ctor: "_Tuple2",_0: v0,_1: v1};
      }),
      A2($List.map,
      function (_p5) {
         var _p6 = _p5;
         return {ctor: "_Tuple3"
                ,_0: ripple
                ,_1: A3(describe,_p4._0,ripple,_p6._0)
                ,_2: A3(view$,_p4._2,_p6._1,_p4._1)};
      },
      _U.list([{ctor: "_Tuple2",_0: "plain",_1: _U.list([])}
              ,{ctor: "_Tuple2"
               ,_0: "colored"
               ,_1: _U.list([$Material$Button.colored])}
              ,{ctor: "_Tuple2"
               ,_0: "primary"
               ,_1: _U.list([$Material$Button.primary])}
              ,{ctor: "_Tuple2"
               ,_0: "accent"
               ,_1: _U.list([$Material$Button.accent])}])));
   });
   var buttons = A2($List.indexedMap,
   F2(function (i,r) {
      return A2($List.map,
      function (_p7) {
         var _p8 = _p7;
         return {ctor: "_Tuple2"
                ,_0: {ctor: "_Tuple2",_0: i,_1: _p8._0}
                ,_1: _p8._1};
      },
      r);
   }),
   A2($List.concatMap,
   function (a) {
      return _U.list([A2(row,a,false),A2(row,a,true)]);
   },
   _U.list([{ctor: "_Tuple3"
            ,_0: "flat"
            ,_1: $Html.text("Flat Button")
            ,_2: $Material$Button.flat}
           ,{ctor: "_Tuple3"
            ,_0: "raised"
            ,_1: $Html.text("Raised Button")
            ,_2: $Material$Button.raised}
           ,{ctor: "_Tuple3"
            ,_0: "FAB"
            ,_1: $Material$Icon.i("add")
            ,_2: $Material$Button.fab}
           ,{ctor: "_Tuple3"
            ,_0: "mini-FAB"
            ,_1: $Material$Icon.i("zoom_in")
            ,_2: $Material$Button.minifab}
           ,{ctor: "_Tuple3"
            ,_0: "icon"
            ,_1: $Material$Icon.i("flight_land")
            ,_2: $Material$Button.icon}])));
   var model = {clicked: ""
               ,buttons: $Dict.fromList(A2($List.concatMap,
               $List.map(function (_p9) {
                  var _p10 = _p9;
                  return {ctor: "_Tuple2"
                         ,_0: _p10._0
                         ,_1: $Material$Button.model(_p10._1._0)};
               }),
               buttons))};
   var view = F2(function (addr,model) {
      return A5($Demo$Page.body2,
      "Buttons",
      srcUrl,
      intro,
      references,
      $List.reverse(A3($Basics.flip,
      F2(function (x,y) {    return A2($List._op["::"],x,y);}),
      _U.list([A2($Html.p,
      _U.list([]),
      _U.list([$Html.text("Various combinations of colors and button styles can be seen\n                   below. Most buttons have animations; try clicking.")]))]),
      A2($Material$Grid.grid,
      _U.list([]),
      A2($List.concatMap,
      function (row) {
         return A2($List.concatMap,
         function (_p11) {
            var _p12 = _p11;
            var _p13 = _p12._0;
            var model$ = A2($Maybe.withDefault,
            $Material$Button.model(false),
            A2($Dict.get,_p13,model.buttons));
            return _U.list([A2($Material$Grid.cell,
            _U.list([A2($Material$Grid.size,$Material$Grid.All,3)]),
            _U.list([A2($Html.div,
            _U.list([$Html$Attributes.style(_U.list([{ctor: "_Tuple2"
                                                     ,_0: "text-align"
                                                     ,_1: "center"}
                                                    ,{ctor: "_Tuple2",_0: "margin-top",_1: ".6em"}
                                                    ,{ctor: "_Tuple2",_0: "margin-bottom",_1: ".6em"}]))]),
            _U.list([A2(_p12._1._2,
                    A2($Signal.forwardTo,addr,Action(_p13)),
                    model$)
                    ,A2($Html.div,
                    _U.list([$Html$Attributes.style(_U.list([{ctor: "_Tuple2"
                                                             ,_0: "font-size"
                                                             ,_1: "9pt"}
                                                            ,{ctor: "_Tuple2",_0: "margin-top",_1: ".6em"}]))]),
                    _U.list([$Html.text(_p12._1._1)]))]))]))]);
         },
         row);
      },
      buttons)))));
   });
   return _elm.Demo.Buttons.values = {_op: _op
                                     ,view$: view$
                                     ,describe: describe
                                     ,row: row
                                     ,buttons: buttons
                                     ,model: model
                                     ,Action: Action
                                     ,Model: Model
                                     ,update: update
                                     ,view: view
                                     ,intro: intro
                                     ,srcUrl: srcUrl
                                     ,references: references};
};
Elm.Material = Elm.Material || {};
Elm.Material.Elevation = Elm.Material.Elevation || {};
Elm.Material.Elevation.make = function (_elm) {
   "use strict";
   _elm.Material = _elm.Material || {};
   _elm.Material.Elevation = _elm.Material.Elevation || {};
   if (_elm.Material.Elevation.values)
   return _elm.Material.Elevation.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $List = Elm.List.make(_elm),
   $Material$Style = Elm.Material.Style.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   var transition = function (duration) {
      return A2($Material$Style.css,
      "transition",
      A2($Basics._op["++"],
      "box-shadow ",
      A2($Basics._op["++"],
      $Basics.toString(duration),
      "ms ease-in-out 0s")));
   };
   var shadow = function (z) {
      return $Material$Style.cs(A2($Basics._op["++"],
      "mdl-shadow--",
      A2($Basics._op["++"],$Basics.toString(z),"dp")));
   };
   var e2 = shadow(2);
   var e3 = shadow(3);
   var e4 = shadow(4);
   var e6 = shadow(6);
   var e8 = shadow(8);
   var e16 = shadow(16);
   var e24 = shadow(24);
   var elevations = _U.list([{ctor: "_Tuple2",_0: e2,_1: 2}
                            ,{ctor: "_Tuple2",_0: e3,_1: 3}
                            ,{ctor: "_Tuple2",_0: e4,_1: 4}
                            ,{ctor: "_Tuple2",_0: e6,_1: 6}
                            ,{ctor: "_Tuple2",_0: e8,_1: 8}
                            ,{ctor: "_Tuple2",_0: e16,_1: 16}
                            ,{ctor: "_Tuple2",_0: e24,_1: 24}]);
   return _elm.Material.Elevation.values = {_op: _op
                                           ,e2: e2
                                           ,e3: e3
                                           ,e4: e4
                                           ,e6: e6
                                           ,e8: e8
                                           ,e16: e16
                                           ,e24: e24
                                           ,elevations: elevations
                                           ,transition: transition};
};
Elm.Demo = Elm.Demo || {};
Elm.Demo.Elevation = Elm.Demo.Elevation || {};
Elm.Demo.Elevation.make = function (_elm) {
   "use strict";
   _elm.Demo = _elm.Demo || {};
   _elm.Demo.Elevation = _elm.Demo.Elevation || {};
   if (_elm.Demo.Elevation.values)
   return _elm.Demo.Elevation.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Demo$Page = Elm.Demo.Page.make(_elm),
   $Html = Elm.Html.make(_elm),
   $List = Elm.List.make(_elm),
   $Material$Elevation = Elm.Material.Elevation.make(_elm),
   $Material$Style = Elm.Material.Style.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   var references = _U.list([$Demo$Page.$package("http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Elevation")
                            ,$Demo$Page.mds("https://www.google.com/design/spec/what-is-material/elevation-shadows.html")
                            ,$Demo$Page.mdl("https://github.com/google/material-design-lite/blob/master/src/shadow/README.md")]);
   var srcUrl = "https://github.com/debois/elm-mdl/blob/master/demo/Demo/Elevation.elm";
   var intro = A2($Demo$Page.fromMDL,
   "https://github.com/google/material-design-lite/blob/master/src/shadow/README.md",
   "\n  > The Material Design Lite (MDL) shadow is not a component in the same sense as\n> an MDL card, menu, or textbox; it is a visual effect that can be assigned to a\n> user interface element. The effect simulates a three-dimensional positioning of\n> the element, as though it is slightly raised above the surface it rests upon —\n> a positive z-axis value, in user interface terms. The shadow starts at the\n> edges of the element and gradually fades outward, providing a realistic 3-D\n> effect.\n> \n> Shadows are a convenient and intuitive means of distinguishing an element from\n> its surroundings. A shadow can draw the user\'s eye to an object and emphasize\n> the object\'s importance, uniqueness, or immediacy.\n> \n> Shadows are a well-established feature in user interfaces, and provide users\n> with a visual clue to an object\'s intended use or value. Their design and use\n> is an important factor in the overall user experience.)\n\nThe [Material Design Specification](https://www.google.com/design/spec/what-is-material/elevation-shadows.html#elevation-shadows-elevation-android-)\npre-defines appropriate elevation for most UI elements; you need to manually\nassign shadows only to your own elements. \n\nYou are encouraged to visit the\n[Material Design specification](https://www.google.com/design/spec/what-is-material/elevation-shadows.html)\nfor details about appropriate use of shadows. \n");
   var elevate = function (_p0) {
      var _p1 = _p0;
      return A2($Material$Style.div,
      _U.list([A2($Material$Style.css,"height","96px")
              ,A2($Material$Style.css,"width","128px")
              ,A2($Material$Style.css,"margin","40px")
              ,A2($Material$Style.css,"display","inline-flex")
              ,A2($Material$Style.css,"flex-flow","row wrap")
              ,A2($Material$Style.css,"justify-content","center")
              ,A2($Material$Style.css,"align-items","center")
              ,_p1._0]),
      _U.list([A2($Material$Style.div,
      _U.list([$Material$Style.cs(".mdl-typography--title-color-contrast")
              ,A2($Material$Style.css,"box-radius","2pt")]),
      _U.list([$Html.text($Basics.toString(_p1._1))]))]));
   };
   var view = A5($Demo$Page.body1,
   "Elevation",
   srcUrl,
   intro,
   references,
   A2(F2(function (x,y) {    return A2($List._op["::"],x,y);}),
   A2($Html.p,
   _U.list([]),
   _U.list([$Html.text("Below are boxes drawn at various elevations.")])),
   A2($List.map,
   elevate,
   A2($List._op["::"],
   {ctor: "_Tuple2",_0: $Material$Style.cs(""),_1: 0},
   $Material$Elevation.elevations))));
   return _elm.Demo.Elevation.values = {_op: _op
                                       ,elevate: elevate
                                       ,view: view
                                       ,intro: intro
                                       ,srcUrl: srcUrl
                                       ,references: references};
};
Elm.Demo = Elm.Demo || {};
Elm.Demo.Grid = Elm.Demo.Grid || {};
Elm.Demo.Grid.make = function (_elm) {
   "use strict";
   _elm.Demo = _elm.Demo || {};
   _elm.Demo.Grid = _elm.Demo.Grid || {};
   if (_elm.Demo.Grid.values) return _elm.Demo.Grid.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Array = Elm.Array.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Demo$Page = Elm.Demo.Page.make(_elm),
   $Html = Elm.Html.make(_elm),
   $List = Elm.List.make(_elm),
   $Material$Color = Elm.Material.Color.make(_elm),
   $Material$Grid = Elm.Material.Grid.make(_elm),
   $Material$Style = Elm.Material.Style.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   var references = _U.list([$Demo$Page.$package("http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Grid")
                            ,$Demo$Page.mds("https://www.google.com/design/spec/layout/responsive-ui.html#responsive-ui-grid")
                            ,$Demo$Page.mdl("http://www.getmdl.io/components/#layout-section/grid")]);
   var srcUrl = "https://github.com/debois/elm-mdl/blob/master/demo/Demo/Grid.elm";
   var intro = A2($Demo$Page.fromMDL,
   "http://www.getmdl.io/components/#layout-section/grid",
   "\n> The Material Design Lite (MDL) grid component is a simplified method for laying\n> out content for multiple screen sizes. It reduces the usual coding burden\n> required to correctly display blocks of content in a variety of display\n> conditions.\n>\n> The MDL grid is defined and enclosed by a container element. A grid has 12\n> columns in the desktop screen size, 8 in the tablet size, and 4 in the phone\n> size, each size having predefined margins and gutters. Cells are laid out\n> sequentially in a row, in the order they are defined, with some exceptions:\n>\n>   - If a cell doesn\'t fit in the row in one of the screen sizes, it flows\n>     into the following line.\n>   - If a cell has a specified column size equal to or larger than the number\n>     of columns for the current screen size, it takes up the entirety of its\n>     row.\n");
   var color = function (k) {
      return $Material$Color.background(A3($Basics.flip,
      $Material$Color.color,
      $Material$Color.S500,
      A2($Maybe.withDefault,
      $Material$Color.Teal,
      A2($Array.get,
      A2($Basics._op["%"],k + 0,$Array.length($Material$Color.hues)),
      $Material$Color.hues))));
   };
   var style = function (h) {
      return _U.list([A2($Material$Style.css,
                     "text-sizing",
                     "border-box")
                     ,A2($Material$Style.css,"background-color","#BDBDBD")
                     ,A2($Material$Style.css,
                     "height",
                     A2($Basics._op["++"],$Basics.toString(h),"px"))
                     ,A2($Material$Style.css,"padding-left","8px")
                     ,A2($Material$Style.css,"padding-top","4px")
                     ,A2($Material$Style.css,"color","white")]);
   };
   var democell = F2(function (k,styling) {
      return $Material$Grid.cell($List.concat(_U.list([style(k)
                                                      ,styling])));
   });
   var small = democell(50);
   var std = democell(200);
   var view = A5($Demo$Page.body1,
   "Grid",
   srcUrl,
   intro,
   references,
   _U.list([A2($Html.p,
           _U.list([]),
           _U.list([$Html.text("Resize your browser-window and observe the effect on the Grid\n                below. Note in particular what happens to the top and bottom rows.")]))
           ,A2($Material$Grid.grid,
           _U.list([]),
           A2($List.map,
           function (i) {
              return A2(small,
              _U.list([A2($Material$Grid.size,$Material$Grid.All,1)
                      ,color(4)]),
              _U.list([$Html.text("1")]));
           },
           _U.range(1,12)))
           ,A2($Material$Grid.grid,
           _U.list([]),
           A2($List.map,
           function (i) {
              return A2(std,
              _U.list([A2($Material$Grid.size,$Material$Grid.All,4)
                      ,color(5)]),
              _U.list([$Html.text("4")]));
           },
           _U.range(1,3)))
           ,A2($Material$Grid.grid,
           _U.list([]),
           _U.list([A2(std,
                   _U.list([A2($Material$Grid.size,$Material$Grid.All,6)
                           ,color(6)]),
                   _U.list([$Html.text("6")]))
                   ,A2(std,
                   _U.list([A2($Material$Grid.size,$Material$Grid.All,4)
                           ,color(6)]),
                   _U.list([$Html.text("4")]))
                   ,A2(std,
                   _U.list([A2($Material$Grid.size,$Material$Grid.All,2)
                           ,color(6)]),
                   _U.list([$Html.text("2")]))]))
           ,A2($Material$Grid.grid,
           _U.list([]),
           _U.list([A2(std,
                   _U.list([A2($Material$Grid.size,$Material$Grid.All,6)
                           ,A2($Material$Grid.size,$Material$Grid.Tablet,8)
                           ,color(7)]),
                   _U.list([$Html.text("6 (8 tablet)")]))
                   ,A2(std,
                   _U.list([A2($Material$Grid.size,$Material$Grid.All,4)
                           ,A2($Material$Grid.size,$Material$Grid.Tablet,6)
                           ,color(8)]),
                   _U.list([$Html.text("4 (6 tablet)")]))
                   ,A2(std,
                   _U.list([A2($Material$Grid.size,$Material$Grid.All,2)
                           ,A2($Material$Grid.size,$Material$Grid.Phone,4)
                           ,color(9)]),
                   _U.list([$Html.text("2 (4 phone)")]))]))]));
   return _elm.Demo.Grid.values = {_op: _op
                                  ,style: style
                                  ,democell: democell
                                  ,small: small
                                  ,std: std
                                  ,color: color
                                  ,view: view
                                  ,intro: intro
                                  ,srcUrl: srcUrl
                                  ,references: references};
};
Elm.Material = Elm.Material || {};
Elm.Material.Menu = Elm.Material.Menu || {};
Elm.Material.Menu.Geometry = Elm.Material.Menu.Geometry || {};
Elm.Material.Menu.Geometry.make = function (_elm) {
   "use strict";
   _elm.Material = _elm.Material || {};
   _elm.Material.Menu = _elm.Material.Menu || {};
   _elm.Material.Menu.Geometry = _elm.Material.Menu.Geometry || {};
   if (_elm.Material.Menu.Geometry.values)
   return _elm.Material.Menu.Geometry.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Array = Elm.Array.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $DOM = Elm.DOM.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Json$Decode = Elm.Json.Decode.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   var Element = F4(function (a,b,c,d) {
      return {offsetTop: a
             ,offsetLeft: b
             ,offsetHeight: c
             ,bounds: d};
   });
   var element = A5($Json$Decode.object4,
   Element,
   $DOM.offsetTop,
   $DOM.offsetLeft,
   $DOM.offsetHeight,
   $DOM.boundingClientRect);
   var Geometry = F5(function (a,b,c,d,e) {
      return {button: a
             ,menu: b
             ,container: c
             ,offsetTops: d
             ,offsetHeights: e};
   });
   var decode = A6($Json$Decode.object5,
   Geometry,
   $DOM.target(element),
   $DOM.target($DOM.nextSibling(A2($DOM.childNode,1,element))),
   $DOM.target($DOM.nextSibling(element)),
   $DOM.target($DOM.nextSibling(A2($DOM.childNode,
   1,
   A2($Json$Decode.andThen,
   $DOM.childNodes($DOM.offsetTop),
   function (_p0) {
      return $Json$Decode.succeed($Array.fromList(_p0));
   })))),
   $DOM.target($DOM.nextSibling(A2($DOM.childNode,
   1,
   A2($Json$Decode.andThen,
   $DOM.childNodes($DOM.offsetHeight),
   function (_p1) {
      return $Json$Decode.succeed($Array.fromList(_p1));
   })))));
   var decode$ = A6($Json$Decode.object5,
   Geometry,
   $DOM.target($DOM.parentElement($DOM.parentElement($DOM.previousSibling(element)))),
   $DOM.target($DOM.parentElement(element)),
   $DOM.target($DOM.parentElement($DOM.parentElement(element))),
   $DOM.target($DOM.parentElement(A2($Json$Decode.andThen,
   $DOM.childNodes($DOM.offsetTop),
   function (_p2) {
      return $Json$Decode.succeed($Array.fromList(_p2));
   }))),
   $DOM.target($DOM.parentElement(A2($Json$Decode.andThen,
   $DOM.childNodes($DOM.offsetHeight),
   function (_p3) {
      return $Json$Decode.succeed($Array.fromList(_p3));
   }))));
   return _elm.Material.Menu.Geometry.values = {_op: _op
                                               ,decode: decode
                                               ,decode$: decode$
                                               ,Geometry: Geometry
                                               ,Element: Element};
};
Elm.Material = Elm.Material || {};
Elm.Material.Menu = Elm.Material.Menu || {};
Elm.Material.Menu.make = function (_elm) {
   "use strict";
   _elm.Material = _elm.Material || {};
   _elm.Material.Menu = _elm.Material.Menu || {};
   if (_elm.Material.Menu.values) return _elm.Material.Menu.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Array = Elm.Array.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Dict = Elm.Dict.make(_elm),
   $Effects = Elm.Effects.make(_elm),
   $Html = Elm.Html.make(_elm),
   $Html$Attributes = Elm.Html.Attributes.make(_elm),
   $Html$Events = Elm.Html.Events.make(_elm),
   $Json$Decode = Elm.Json.Decode.make(_elm),
   $Json$Encode = Elm.Json.Encode.make(_elm),
   $List = Elm.List.make(_elm),
   $Material$Component = Elm.Material.Component.make(_elm),
   $Material$Helpers = Elm.Material.Helpers.make(_elm),
   $Material$Menu$Geometry = Elm.Material.Menu.Geometry.make(_elm),
   $Material$Ripple = Elm.Material.Ripple.make(_elm),
   $Material$Style = Elm.Material.Style.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $String = Elm.String.make(_elm),
   $Task = Elm.Task.make(_elm);
   var _op = {};
   var toPx = function (_p0) {
      return A3($Basics.flip,
      F2(function (x,y) {    return A2($Basics._op["++"],x,y);}),
      "px",
      $Basics.toString(_p0));
   };
   var rect = F4(function (x,y,w,h) {
      return function (coords) {
         return A2($Basics._op["++"],
         "rect(",
         A2($Basics._op["++"],coords,")"));
      }(A2($String.join," ",A2($List.map,toPx,_U.list([x,y,w,h]))));
   });
   var onClick = F3(function (addr,decoder,action) {
      return A4($Html$Events.onWithOptions,
      "click",
      $Html$Events.defaultOptions,
      decoder,
      function (_p1) {
         return A2($Signal.message,addr,action(_p1));
      });
   });
   var fwdSelect = F2(function (obs,action) {
      var _p2 = action;
      if (_p2.ctor === "Select") {
            return $Maybe.Just(obs);
         } else {
            return $Maybe.Nothing;
         }
   });
   var fwdClose = F2(function (obs,action) {
      var _p3 = action;
      if (_p3.ctor === "Close") {
            return $Maybe.Just(obs);
         } else {
            return $Maybe.Nothing;
         }
   });
   var fwdOpen = F2(function (obs,action) {
      var _p4 = action;
      if (_p4.ctor === "Open") {
            return $Maybe.Just(obs);
         } else {
            return $Maybe.Nothing;
         }
   });
   var Close = {ctor: "Close"};
   var Select = function (a) {    return {ctor: "Select",_0: a};};
   var Open = {ctor: "Open"};
   var Ripple$ = F2(function (a,b) {
      return {ctor: "Ripple\'",_0: a,_1: b};
   });
   var Hide$ = F2(function (a,b) {
      return {ctor: "Hide\'",_0: a,_1: b};
   });
   var Tick$ = {ctor: "Tick\'"};
   var Close$ = function (a) {    return {ctor: "Close\'",_0: a};};
   var Select$ = F2(function (a,b) {
      return {ctor: "Select\'",_0: a,_1: b};
   });
   var Open$ = function (a) {    return {ctor: "Open\'",_0: a};};
   var item = F3(function (divider,enabled,html) {
      return {html: html,enabled: enabled,divider: divider};
   });
   var Item = F3(function (a,b,c) {
      return {html: a,enabled: b,divider: c};
   });
   var Unaligned = {ctor: "Unaligned"};
   var TopRight = {ctor: "TopRight"};
   var TopLeft = {ctor: "TopLeft"};
   var BottomRight = {ctor: "BottomRight"};
   var BottomLeft = {ctor: "BottomLeft"};
   var Closing = {ctor: "Closing"};
   var Opened = {ctor: "Opened"};
   var Opening = {ctor: "Opening"};
   var Idle = {ctor: "Idle"};
   var model = F2(function (ripple,alignemnt) {
      return {alignment: alignemnt
             ,ripple: ripple
             ,items: $Dict.empty
             ,animationState: Idle
             ,geometry: $Maybe.Nothing};
   });
   var Model = F5(function (a,b,c,d,e) {
      return {alignment: a
             ,ripple: b
             ,items: c
             ,animationState: d
             ,geometry: e};
   });
   var constant = {transitionDurationSeconds: 0.3
                  ,transitionDurationFraction: 0.8
                  ,closeTimeout: 150};
   var update = F2(function (action,model) {
      var _p5 = action;
      switch (_p5.ctor)
      {case "Open\'": var _p7 = _p5._0;
           return A2($Material$Helpers.effect,
           $Effects.task($Task.succeed(Tick$)),
           _U.update(model,
           {animationState: function () {
              var _p6 = model.animationState;
              if (_p6.ctor === "Opened") {
                    return Opened;
                 } else {
                    return Opening;
                 }
           }()
           ,geometry: $Maybe.Just(_p7)
           ,items: $Dict.fromList(A2($List.map,
           function (i) {
              return {ctor: "_Tuple2",_0: i,_1: $Material$Ripple.model};
           },
           _U.range(1,$Array.length(_p7.offsetTops))))}));
         case "Tick\'": return A2($Material$Helpers.effect,
           $Effects.task($Task.succeed(Open)),
           _U.update(model,{animationState: Opened}));
         case "Close\'": return A2($Material$Helpers.effect,
           $Effects.task($Task.succeed(Close)),
           _U.update(model,
           {animationState: Idle,geometry: $Maybe.Just(_p5._0)}));
         case "Hide\'": return A2($Material$Helpers.effect,
           $Effects.task($Task.succeed(Select(_p5._0))),
           _U.update(model,
           {animationState: Idle,geometry: $Maybe.Just(_p5._1)}));
         case "Select\'": return A2($Material$Helpers.effect,
           $Effects.task(function (_p8) {
              return A2($Task.andThen,
              $Task.sleep(constant.closeTimeout),
              $Basics.always(_p8));
           }($Task.succeed(A2(Hide$,_p5._0,_p5._1)))),
           _U.update(model,{animationState: Closing}));
         case "Ripple\'": var _p10 = _p5._0;
           var _p9 = A2($Material$Ripple.update,
           _p5._1,
           A2($Maybe.withDefault,
           $Material$Ripple.model,
           A2($Dict.get,_p10,model.items)));
           var model$ = _p9._0;
           var effects = _p9._1;
           return A2($Material$Helpers.effect,
           A2($Effects.map,Ripple$(_p10),effects),
           _U.update(model,
           {items: A3($Dict.insert,_p10,model$,model.items)}));
         case "Open": return $Material$Helpers.pure(model);
         case "Close": return $Material$Helpers.pure(model);
         default: return $Material$Helpers.pure(model);}
   });
   var makeItem = F4(function (addr,model,n,item) {
      var height = function () {
         var _p11 = model.geometry;
         if (_p11.ctor === "Nothing") {
               return 0;
            } else {
               return _p11._0.menu.bounds.height;
            }
      }();
      var offsetHeight = function (n) {
         var _p12 = model.geometry;
         if (_p12.ctor === "Nothing") {
               return 0;
            } else {
               return A2($Maybe.withDefault,
               0,
               A2($Array.get,n - 1,_p12._0.offsetHeights));
            }
      };
      var offsetTop = function (n) {
         var _p13 = model.geometry;
         if (_p13.ctor === "Nothing") {
               return 0;
            } else {
               return A2($Maybe.withDefault,
               0,
               A2($Array.get,n - 1,_p13._0.offsetTops));
            }
      };
      var transitionDuration = constant.transitionDurationSeconds * constant.transitionDurationFraction;
      var itemDelay = _U.eq(model.alignment,
      TopLeft) || _U.eq(model.alignment,TopRight) ? A3($Basics.flip,
      F2(function (x,y) {    return A2($Basics._op["++"],x,y);}),
      "s",
      $Basics.toString((height - offsetTop(n) - offsetHeight(n)) / height * transitionDuration)) : A3($Basics.flip,
      F2(function (x,y) {    return A2($Basics._op["++"],x,y);}),
      "s",
      $Basics.toString(offsetTop(n) / height * transitionDuration));
      return A3($Material$Style.styled,
      $Html.li,
      _U.list([item.enabled ? $Material$Style.attribute(A3(onClick,
              addr,
              $Material$Menu$Geometry.decode$,
              Select$(n))) : $Material$Style.attribute(A2($Html$Attributes.attribute,
              "disabled",
              "disabled"))
              ,$Material$Style.cs("mdl-menu__item")
              ,A3($Material$Style.css$,
              "transition-delay",
              itemDelay,
              _U.eq(model.animationState,
              Opening) || _U.eq(model.animationState,Opened))
              ,A2($Material$Style.cs$,"mdl-js-ripple-effect",model.ripple)
              ,A2($Material$Style.cs$,
              "mdl-menu__item--full-bleed-divider",
              item.divider)
              ,$Material$Style.attribute(A2($Html$Attributes.property,
              "tabindex",
              $Json$Encode.string("-1")))
              ,$Material$Style.attribute(A2($Material$Ripple.downOn,
              "mousedown",
              A2($Signal.forwardTo,addr,Ripple$(n))))
              ,$Material$Style.attribute(A2($Material$Ripple.downOn,
              "touchstart",
              A2($Signal.forwardTo,addr,Ripple$(n))))
              ,$Material$Style.attribute(A2($Material$Ripple.upOn,
              "mouseup",
              A2($Signal.forwardTo,addr,Ripple$(n))))
              ,$Material$Style.attribute(A2($Material$Ripple.upOn,
              "mouseleave",
              A2($Signal.forwardTo,addr,Ripple$(n))))
              ,$Material$Style.attribute(A2($Material$Ripple.upOn,
              "touchend",
              A2($Signal.forwardTo,addr,Ripple$(n))))
              ,$Material$Style.attribute(A2($Material$Ripple.upOn,
              "blur",
              A2($Signal.forwardTo,addr,Ripple$(n))))]),
      model.ripple ? _U.list([item.html
                             ,A3($Material$Ripple.view,
                             A2($Signal.forwardTo,addr,Ripple$(n)),
                             _U.list([$Html$Attributes.$class("mdl-menu__item-ripple-container")]),
                             A2($Maybe.withDefault,
                             $Material$Ripple.model,
                             A2($Dict.get,n,model.items)))]) : _U.list([item.html]));
   });
   var view = F3(function (addr,model,items) {
      return _U.list([A3($Material$Style.styled,
                     $Html.button,
                     _U.list([$Material$Style.cs("mdl-button")
                             ,$Material$Style.cs("mdl-js-button")
                             ,$Material$Style.cs("mdl-button--icon")
                             ,$Material$Style.attribute(function () {
                                var _p14 = model.animationState;
                                if (_p14.ctor === "Opened") {
                                      return A3(onClick,
                                      addr,
                                      $Material$Menu$Geometry.decode,
                                      Close$);
                                   } else {
                                      return A3(onClick,addr,$Material$Menu$Geometry.decode,Open$);
                                   }
                             }())]),
                     _U.list([A3($Material$Style.styled,
                     $Html.i,
                     _U.list([$Material$Style.cs("material-icons")
                             ,$Material$Style.attribute($Html$Attributes.style(_U.list([{ctor: "_Tuple2"
                                                                                        ,_0: "pointer-events"
                                                                                        ,_1: "none"}])))]),
                     _U.list([$Html.text("more_vert")]))]))
                     ,A3($Material$Style.styled,
                     $Html.div,
                     _U.list([$Material$Style.cs("mdl-menu__container")
                             ,$Material$Style.cs("is-upgraded")
                             ,A2($Material$Style.cs$,
                             "is-visible",
                             _U.eq(model.animationState,
                             Opened) || _U.eq(model.animationState,Closing))
                             ,A3($Material$Style.css$,
                             "width",
                             function () {
                                var _p15 = model.geometry;
                                if (_p15.ctor === "Just") {
                                      return toPx(_p15._0.menu.bounds.width);
                                   } else {
                                      return "auto";
                                   }
                             }(),
                             !_U.eq(model.geometry,$Maybe.Nothing))
                             ,A3($Material$Style.css$,
                             "height",
                             function () {
                                var _p16 = model.geometry;
                                if (_p16.ctor === "Just") {
                                      return toPx(_p16._0.menu.bounds.height);
                                   } else {
                                      return "auto";
                                   }
                             }(),
                             !_U.eq(model.geometry,$Maybe.Nothing))
                             ,A3($Basics.flip,
                             $Material$Style.css$("top"),
                             (_U.eq(model.alignment,BottomRight) || _U.eq(model.alignment,
                             BottomLeft)) && !_U.eq(model.geometry,$Maybe.Nothing),
                             function () {
                                var _p17 = model.geometry;
                                if (_p17.ctor === "Nothing") {
                                      return "auto";
                                   } else {
                                      var _p18 = _p17._0;
                                      return toPx(_p18.button.offsetTop + _p18.button.offsetHeight);
                                   }
                             }())
                             ,A3($Basics.flip,
                             $Material$Style.css$("right"),
                             (_U.eq(model.alignment,BottomRight) || _U.eq(model.alignment,
                             TopRight)) && !_U.eq(model.geometry,$Maybe.Nothing),
                             function () {
                                var _p19 = model.geometry;
                                if (_p19.ctor === "Nothing") {
                                      return "auto";
                                   } else {
                                      var _p20 = _p19._0;
                                      var right = function (e) {
                                         return e.bounds.left + e.bounds.width;
                                      };
                                      return toPx(right(_p20.container) - right(_p20.menu));
                                   }
                             }())
                             ,A3($Basics.flip,
                             $Material$Style.css$("bottom"),
                             (_U.eq(model.alignment,TopLeft) || _U.eq(model.alignment,
                             TopRight)) && !_U.eq(model.geometry,$Maybe.Nothing),
                             function () {
                                var _p21 = model.geometry;
                                if (_p21.ctor === "Nothing") {
                                      return "auto";
                                   } else {
                                      var _p22 = _p21._0;
                                      var bottom = _p22.container.bounds.top + _p22.container.bounds.height;
                                      return toPx(bottom - _p22.button.bounds.top);
                                   }
                             }())
                             ,A3($Basics.flip,
                             $Material$Style.css$("left"),
                             (_U.eq(model.alignment,TopLeft) || _U.eq(model.alignment,
                             BottomLeft)) && !_U.eq(model.geometry,$Maybe.Nothing),
                             function () {
                                var _p23 = model.geometry;
                                if (_p23.ctor === "Just") {
                                      return toPx(_p23._0.menu.offsetLeft);
                                   } else {
                                      return "auto";
                                   }
                             }())]),
                     _U.list([A3($Material$Style.styled,
                             $Html.div,
                             _U.list([$Material$Style.cs("mdl-menu__outline")
                                     ,A3($Material$Style.css$,
                                     "width",
                                     function () {
                                        var _p24 = model.geometry;
                                        if (_p24.ctor === "Nothing") {
                                              return "auto";
                                           } else {
                                              return toPx(_p24._0.menu.bounds.width);
                                           }
                                     }(),
                                     !_U.eq(model.geometry,$Maybe.Nothing))
                                     ,A3($Material$Style.css$,
                                     "height",
                                     function () {
                                        var _p25 = model.geometry;
                                        if (_p25.ctor === "Just") {
                                              return toPx(_p25._0.menu.bounds.height);
                                           } else {
                                              return "auto";
                                           }
                                     }(),
                                     !_U.eq(model.geometry,$Maybe.Nothing))
                                     ,function () {
                                        var _p26 = model.alignment;
                                        switch (_p26.ctor)
                                        {case "BottomLeft":
                                           return $Material$Style.cs("mdl-menu--bottom-left");
                                           case "BottomRight":
                                           return $Material$Style.cs("mdl-menu--bottom-right");
                                           case "TopLeft": return $Material$Style.cs("mdl-menu--top-left");
                                           case "TopRight":
                                           return $Material$Style.cs("mdl-menu--top-right");
                                           default: return $Material$Style.cs("mdl-menu--unaligned");}
                                     }()]),
                             _U.list([]))
                             ,A3($Material$Style.styled,
                             $Html.ul,
                             _U.list([$Material$Style.cs("mdl-menu")
                                     ,$Material$Style.cs("mdl-js-menu")
                                     ,function () {
                                        var _p27 = model.alignment;
                                        switch (_p27.ctor)
                                        {case "BottomLeft":
                                           return $Material$Style.cs("mdl-menu--bottom-left");
                                           case "BottomRight":
                                           return $Material$Style.cs("mdl-menu--bottom-right");
                                           case "TopLeft": return $Material$Style.cs("mdl-menu--top-left");
                                           case "TopRight":
                                           return $Material$Style.cs("mdl-menu--top-right");
                                           default: return $Material$Style.cs("mdl-menu--unaligned");}
                                     }()
                                     ,A2($Material$Style.cs$,
                                     "is-animating",
                                     _U.eq(model.animationState,
                                     Opening) || _U.eq(model.animationState,Closing))
                                     ,A3($Material$Style.css$,
                                     "clip",
                                     function () {
                                        var _p28 = model.geometry;
                                        if (_p28.ctor === "Nothing") {
                                              return "auto";
                                           } else {
                                              var _p30 = _p28._0;
                                              var height = _p30.menu.bounds.height;
                                              var width = _p30.menu.bounds.width;
                                              if (_U.eq(model.animationState,
                                              Opened) || _U.eq(model.animationState,Closing)) return A4(rect,
                                                 0,
                                                 width,
                                                 height,
                                                 0); else {
                                                    var _p29 = model.alignment;
                                                    switch (_p29.ctor)
                                                    {case "BottomRight": return A4(rect,0,width,0,width);
                                                       case "TopLeft": return A4(rect,height,0,height,0);
                                                       case "TopRight": return A4(rect,height,width,height,width);
                                                       default: return "";}
                                                 }
                                           }
                                     }(),
                                     !_U.eq(model.geometry,$Maybe.Nothing))]),
                             A3($List.map2,
                             A2(makeItem,addr,model),
                             _U.range(1,$List.length(items)),
                             items))]))]);
   });
   var instance = F4(function (id,lift,model0,observer) {
      return A8($Material$Component.instance,
      view,
      update,
      function (_) {
         return _.menu;
      },
      F2(function (x,y) {    return _U.update(y,{menu: x});}),
      id,
      lift,
      model0,
      observer);
   });
   return _elm.Material.Menu.values = {_op: _op
                                      ,model: model
                                      ,item: item
                                      ,update: update
                                      ,view: view
                                      ,instance: instance
                                      ,fwdOpen: fwdOpen
                                      ,fwdClose: fwdClose
                                      ,fwdSelect: fwdSelect
                                      ,Model: Model
                                      ,Item: Item
                                      ,BottomLeft: BottomLeft
                                      ,BottomRight: BottomRight
                                      ,TopLeft: TopLeft
                                      ,TopRight: TopRight
                                      ,Unaligned: Unaligned};
};
Elm.Material = Elm.Material || {};
Elm.Material.Snackbar = Elm.Material.Snackbar || {};
Elm.Material.Snackbar.make = function (_elm) {
   "use strict";
   _elm.Material = _elm.Material || {};
   _elm.Material.Snackbar = _elm.Material.Snackbar || {};
   if (_elm.Material.Snackbar.values)
   return _elm.Material.Snackbar.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Effects = Elm.Effects.make(_elm),
   $Html = Elm.Html.make(_elm),
   $Html$Attributes = Elm.Html.Attributes.make(_elm),
   $Html$Events = Elm.Html.Events.make(_elm),
   $List = Elm.List.make(_elm),
   $Material$Helpers = Elm.Material.Helpers.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $Task = Elm.Task.make(_elm),
   $Time = Elm.Time.make(_elm);
   var _op = {};
   var Move = F2(function (a,b) {
      return {ctor: "Move",_0: a,_1: b};
   });
   var Click = function (a) {    return {ctor: "Click",_0: a};};
   var End = function (a) {    return {ctor: "End",_0: a};};
   var Begin = function (a) {    return {ctor: "Begin",_0: a};};
   var enqueue = F2(function (contents,model) {
      return _U.update(model,
      {queue: A2($List.append,model.queue,_U.list([contents]))});
   });
   var next = function (model) {
      return $Effects.map(Move(model.seq));
   };
   var forward = function (_p0) {
      return $Effects.task($Task.succeed(_p0));
   };
   var Clicked = {ctor: "Clicked"};
   var view = F2(function (addr,model) {
      var isActive = function () {
         var _p1 = model.state;
         switch (_p1.ctor)
         {case "Inert": return false;
            case "Active": return true;
            default: return false;}
      }();
      var contents = function () {
         var _p2 = model.state;
         switch (_p2.ctor)
         {case "Inert": return $Maybe.Nothing;
            case "Active": return $Maybe.Just(_p2._0);
            default: return $Maybe.Just(_p2._0);}
      }();
      return A2($Html.div,
      _U.list([$Html$Attributes.classList(_U.list([{ctor: "_Tuple2"
                                                   ,_0: "mdl-js-snackbar"
                                                   ,_1: true}
                                                  ,{ctor: "_Tuple2",_0: "mdl-snackbar",_1: true}
                                                  ,{ctor: "_Tuple2",_0: "mdl-snackbar--active",_1: isActive}]))]),
      _U.list([A2($Html.div,
              _U.list([$Html$Attributes.$class("mdl-snackbar__text")]),
              A2($Maybe.withDefault,
              _U.list([]),
              A2($Maybe.map,
              function (c) {
                 return _U.list([$Html.text(c.message)]);
              },
              contents)))
              ,A2($Html.button,
              A2($List._op["::"],
              $Html$Attributes.$class("mdl-snackbar__action"),
              A2($List._op["::"],
              $Html$Attributes.type$("button"),
              A2($Maybe.withDefault,
              _U.list([]),
              A2($Maybe.map,
              $Basics.always(_U.list([A2($Html$Events.onClick,
              addr,
              A2(Move,model.seq,Clicked))])),
              A3($Basics.flip,
              $Maybe.andThen,
              function (_) {
                 return _.action;
              },
              contents))))),
              A2($Maybe.withDefault,
              _U.list([]),
              A2($Maybe.map,
              function (action) {
                 return _U.list([$Html.text(action)]);
              },
              A3($Basics.flip,
              $Maybe.andThen,
              function (_) {
                 return _.action;
              },
              contents))))]));
   });
   var Timeout = {ctor: "Timeout"};
   var Fading = function (a) {    return {ctor: "Fading",_0: a};};
   var Active = function (a) {    return {ctor: "Active",_0: a};};
   var tryDequeue = function (model) {
      var _p3 = {ctor: "_Tuple2",_0: model.state,_1: model.queue};
      if (_p3.ctor === "_Tuple2" && _p3._0.ctor === "Inert" && _p3._1.ctor === "::")
      {
            var _p4 = _p3._1._0;
            return {ctor: "_Tuple2"
                   ,_0: _U.update(model,
                   {state: Active(_p4),queue: _p3._1._1,seq: model.seq + 1})
                   ,_1: $Effects.batch(_U.list([A2($Effects.map,
                                               Move(model.seq + 1),
                                               A2($Material$Helpers.delay,_p4.timeout,Timeout))
                                               ,forward(Begin(_p4.payload))]))};
         } else {
            return {ctor: "_Tuple2",_0: model,_1: $Effects.none};
         }
   };
   var add = F2(function (contents,model) {
      return tryDequeue(A2(enqueue,contents,model));
   });
   var Inert = {ctor: "Inert"};
   var move = F2(function (transition,model) {
      var _p5 = {ctor: "_Tuple2",_0: model.state,_1: transition};
      _v3_4: do {
         if (_p5.ctor === "_Tuple2") {
               if (_p5._1.ctor === "Clicked") {
                     if (_p5._0.ctor === "Active") {
                           var _p6 = _p5._0._0;
                           return {ctor: "_Tuple2"
                                  ,_0: _U.update(model,{state: Fading(_p6)})
                                  ,_1: $Effects.batch(_U.list([A2(next,
                                                              model,
                                                              A2($Material$Helpers.delay,_p6.fade,Timeout))
                                                              ,forward(Click(_p6.payload))]))};
                        } else {
                           break _v3_4;
                        }
                  } else {
                     switch (_p5._0.ctor)
                     {case "Inert": return tryDequeue(model);
                        case "Active": var _p7 = _p5._0._0;
                          return {ctor: "_Tuple2"
                                 ,_0: _U.update(model,{state: Fading(_p7)})
                                 ,_1: $Effects.batch(_U.list([A2(next,
                                                             model,
                                                             A2($Material$Helpers.delay,_p7.fade,Timeout))
                                                             ,forward(Begin(_p7.payload))]))};
                        default: return {ctor: "_Tuple2"
                                        ,_0: _U.update(model,{state: Inert})
                                        ,_1: $Effects.batch(_U.list([A2(next,
                                                                    model,
                                                                    $Effects.tick($Basics.always(Timeout)))
                                                                    ,forward(End(_p5._0._0.payload))]))};}
                  }
            } else {
               break _v3_4;
            }
      } while (false);
      return {ctor: "_Tuple2",_0: model,_1: $Effects.none};
   });
   var update = F2(function (action,model) {
      var _p8 = action;
      if (_p8.ctor === "Move") {
            return _U.eq(_p8._0,model.seq) ? A2(move,
            _p8._1,
            model) : {ctor: "_Tuple2",_0: model,_1: $Effects.none};
         } else {
            return {ctor: "_Tuple2",_0: model,_1: $Effects.none};
         }
   });
   var snackbar = F3(function (payload,message,label) {
      return {message: message
             ,action: $Maybe.Just(label)
             ,payload: payload
             ,timeout: 2750
             ,fade: 250};
   });
   var toast = F2(function (payload,message) {
      return {message: message
             ,action: $Maybe.Nothing
             ,payload: payload
             ,timeout: 2750
             ,fade: 250};
   });
   var model = {queue: _U.list([]),state: Inert,seq: 0};
   var Model = F3(function (a,b,c) {
      return {queue: a,state: b,seq: c};
   });
   var Contents = F5(function (a,b,c,d,e) {
      return {message: a,action: b,payload: c,timeout: d,fade: e};
   });
   return _elm.Material.Snackbar.values = {_op: _op
                                          ,add: add
                                          ,model: model
                                          ,toast: toast
                                          ,snackbar: snackbar
                                          ,update: update
                                          ,view: view
                                          ,Contents: Contents
                                          ,Model: Model
                                          ,Begin: Begin
                                          ,End: End
                                          ,Click: Click};
};
Elm.Material = Elm.Material || {};
Elm.Material.Textfield = Elm.Material.Textfield || {};
Elm.Material.Textfield.make = function (_elm) {
   "use strict";
   _elm.Material = _elm.Material || {};
   _elm.Material.Textfield = _elm.Material.Textfield || {};
   if (_elm.Material.Textfield.values)
   return _elm.Material.Textfield.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Effects = Elm.Effects.make(_elm),
   $Html = Elm.Html.make(_elm),
   $Html$Attributes = Elm.Html.Attributes.make(_elm),
   $Html$Events = Elm.Html.Events.make(_elm),
   $List = Elm.List.make(_elm),
   $Material$Component = Elm.Material.Component.make(_elm),
   $Material$Helpers = Elm.Material.Helpers.make(_elm),
   $Material$Style = Elm.Material.Style.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   var fwdFocus = F2(function (o,action) {
      var _p0 = action;
      if (_p0.ctor === "Focus") {
            return $Maybe.Just(o);
         } else {
            return $Maybe.Nothing;
         }
   });
   var fwdBlur = F2(function (o,action) {
      var _p1 = action;
      if (_p1.ctor === "Blur") {
            return $Maybe.Just(o);
         } else {
            return $Maybe.Nothing;
         }
   });
   var fwdInput = F2(function (f,action) {
      var _p2 = action;
      if (_p2.ctor === "Input") {
            return $Maybe.Just(f(_p2._0));
         } else {
            return $Maybe.Nothing;
         }
   });
   var update = F2(function (action,model) {
      var _p3 = action;
      switch (_p3.ctor)
      {case "Input": return _U.update(model,{value: _p3._0});
         case "Blur": return _U.update(model,{isFocused: false});
         default: return _U.update(model,{isFocused: true});}
   });
   var Focus = {ctor: "Focus"};
   var Blur = {ctor: "Blur"};
   var Input = function (a) {    return {ctor: "Input",_0: a};};
   var view = F3(function (addr,model,styles) {
      var labelText = A2($Maybe.map,
      function (_) {
         return _.text;
      },
      model.label);
      var hasError = A2($Maybe.withDefault,
      false,
      A2($Maybe.map,$Basics.always(true),model.error));
      var hasFloat = A2($Maybe.withDefault,
      false,
      A2($Maybe.map,function (_) {    return _.$float;},model.label));
      return A3($Material$Helpers.filter,
      $Material$Style.div,
      A2($List._op["::"],
      $Material$Style.cs("mdl-textfield"),
      A2($List._op["::"],
      $Material$Style.cs("mdl-js-textfield"),
      A2($List._op["::"],
      $Material$Style.cs("is-upgraded"),
      A2($List._op["::"],
      A2($Material$Style.cs$,
      "mdl-textfield--floating-label",
      hasFloat),
      A2($List._op["::"],
      A2($Material$Style.cs$,"is-invalid",hasError),
      A2($List._op["::"],
      A2($Material$Style.cs$,"is-dirty",!_U.eq(model.value,"")),
      A2($List._op["::"],
      A2($Material$Style.cs$,
      "is-focused",
      model.isFocused && $Basics.not(model.isDisabled)),
      A2($List._op["::"],
      A2($Material$Style.cs$,"is-disabled",model.isDisabled),
      styles)))))))),
      _U.list([$Maybe.Just(A2($Html.input,
              _U.list([$Html$Attributes.$class("mdl-textfield__input")
                      ,$Html$Attributes.style(_U.list([{ctor: "_Tuple2"
                                                       ,_0: "outline"
                                                       ,_1: "none"}]))
                      ,$Html$Attributes.type$("text")
                      ,$Html$Attributes.disabled(model.isDisabled)
                      ,$Html$Attributes.value(model.value)
                      ,A3($Html$Events.on,
                      "input",
                      $Html$Events.targetValue,
                      function (s) {
                         return A2($Signal.message,addr,Input(s));
                      })
                      ,A2($Html$Events.onBlur,addr,Blur)
                      ,A2($Html$Events.onFocus,addr,Focus)]),
              _U.list([])))
              ,$Maybe.Just(A2($Html.label,
              _U.list([$Html$Attributes.$class("mdl-textfield__label")]),
              function () {
                 var _p4 = labelText;
                 if (_p4.ctor === "Just") {
                       return _U.list([$Html.text(_p4._0)]);
                    } else {
                       return _U.list([]);
                    }
              }()))
              ,A2($Maybe.map,
              function (e) {
                 return A2($Html.span,
                 _U.list([$Html$Attributes.$class("mdl-textfield__error")]),
                 _U.list([$Html.text(e)]));
              },
              model.error)]));
   });
   var instance = function () {
      var update$ = F2(function (action,model) {
         return {ctor: "_Tuple2"
                ,_0: A2(update,action,model)
                ,_1: $Effects.none};
      });
      return A4($Material$Component.instance,
      view,
      update$,
      function (_) {
         return _.textfield;
      },
      F2(function (x,y) {    return _U.update(y,{textfield: x});}));
   }();
   var Model = F6(function (a,b,c,d,e,f) {
      return {label: a
             ,error: b
             ,kind: c
             ,isDisabled: d
             ,isFocused: e
             ,value: f};
   });
   var SingleLine = {ctor: "SingleLine"};
   var model = {label: $Maybe.Nothing
               ,error: $Maybe.Nothing
               ,kind: SingleLine
               ,isDisabled: false
               ,isFocused: false
               ,value: ""};
   var Label = F2(function (a,b) {
      return {text: a,$float: b};
   });
   return _elm.Material.Textfield.values = {_op: _op
                                           ,Label: Label
                                           ,SingleLine: SingleLine
                                           ,Model: Model
                                           ,model: model
                                           ,Input: Input
                                           ,Blur: Blur
                                           ,Focus: Focus
                                           ,update: update
                                           ,view: view
                                           ,instance: instance
                                           ,fwdInput: fwdInput
                                           ,fwdBlur: fwdBlur
                                           ,fwdFocus: fwdFocus};
};
Elm.Material = Elm.Material || {};
Elm.Material.Toggles = Elm.Material.Toggles || {};
Elm.Material.Toggles.make = function (_elm) {
   "use strict";
   _elm.Material = _elm.Material || {};
   _elm.Material.Toggles = _elm.Material.Toggles || {};
   if (_elm.Material.Toggles.values)
   return _elm.Material.Toggles.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Effects = Elm.Effects.make(_elm),
   $Html = Elm.Html.make(_elm),
   $Html$Attributes = Elm.Html.Attributes.make(_elm),
   $Html$Events = Elm.Html.Events.make(_elm),
   $Json$Decode = Elm.Json.Decode.make(_elm),
   $List = Elm.List.make(_elm),
   $Material$Component = Elm.Material.Component.make(_elm),
   $Material$Helpers = Elm.Material.Helpers.make(_elm),
   $Material$Ripple = Elm.Material.Ripple.make(_elm),
   $Material$Style = Elm.Material.Style.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   var fwdChange = F2(function (obs,action) {
      var _p0 = action;
      if (_p0.ctor === "Change") {
            return $Maybe.Just(obs);
         } else {
            return $Maybe.Nothing;
         }
   });
   var SetFocus = function (a) {
      return {ctor: "SetFocus",_0: a};
   };
   var Ripple = function (a) {    return {ctor: "Ripple",_0: a};};
   var Change = {ctor: "Change"};
   var state = function (model) {
      var _p1 = model.state;
      return _p1._0;
   };
   var top = F5(function (name,addr,model,styles,elems) {
      return A3($Material$Style.styled,
      $Html.label,
      _U.list([$Material$Style.cs(A2($Basics._op["++"],"mdl-",name))
              ,$Material$Style.cs(A2($Basics._op["++"],"mdl-js-",name))
              ,A2($Material$Style.cs$,"mdl-js-ripple-effect",model.ripple)
              ,A2($Material$Style.cs$,
              "mdl-js-ripple-effect--ignore-events",
              model.ripple)
              ,$Material$Style.cs("is-upgraded")
              ,A2($Material$Style.cs$,"is-checked",model.value)
              ,$Material$Style.attribute(A3($Html$Events.on,
              "change",
              $Json$Decode.value,
              $Basics.always(A2($Signal.message,addr,Change))))
              ,$Material$Style.attribute($Material$Helpers.blurOn("mouseup"))
              ,$Material$Style.attribute(A2($Html$Events.onFocus,
              addr,
              SetFocus(true)))
              ,$Material$Style.attribute(A2($Html$Events.onBlur,
              addr,
              SetFocus(false)))
              ,$Material$Style.multiple(styles)]),
      model.ripple ? A2($List._op["::"],
      A3($Material$Ripple.view,
      A2($Signal.forwardTo,addr,Ripple),
      _U.list([$Html$Attributes.$class("mdl-switch__ripple-container mdl-js-ripple-effect mdl-ripple--center")]),
      state(model)),
      elems) : elems);
   });
   var checkbox = F3(function (addr,model,styles) {
      return A5(top,
      "checkbox",
      addr,
      model,
      styles,
      _U.list([A2($Html.input,
              _U.list([$Html$Attributes.type$("checkbox")
                      ,$Html$Attributes.$class("mdl-checkbox__input")
                      ,$Html$Attributes.disabled(model.isDisabled)
                      ,$Html$Attributes.checked(model.value)]),
              _U.list([]))
              ,A2($Html.span,
              _U.list([$Html$Attributes.$class("mdl-checkbox__label")]),
              _U.list([]))
              ,A2($Html.span,
              _U.list([$Html$Attributes.$class("mdl-checkbox__focus-helper")]),
              _U.list([]))
              ,A2($Html.span,
              _U.list([$Html$Attributes.$class("mdl-checkbox__box-outline")]),
              _U.list([A2($Html.span,
              _U.list([$Html$Attributes.$class("mdl-checkbox__tick-outline")]),
              _U.list([]))]))]));
   });
   var $switch = F3(function (addr,model,styles) {
      return A5(top,
      "switch",
      addr,
      model,
      styles,
      _U.list([A2($Html.input,
              _U.list([$Html$Attributes.type$("checkbox")
                      ,$Html$Attributes.$class("mdl-switch__input")
                      ,$Html$Attributes.disabled(model.isDisabled)
                      ,$Html$Attributes.checked(model.value)]),
              _U.list([]))
              ,A2($Html.span,
              _U.list([$Html$Attributes.$class("mdl-switch__label")]),
              _U.list([]))
              ,A2($Html.div,
              _U.list([$Html$Attributes.$class("mdl-switch__track")]),
              _U.list([]))
              ,A2($Html.div,
              _U.list([$Html$Attributes.$class("mdl-switch__thumb")]),
              _U.list([A2($Html.span,
              _U.list([$Html$Attributes.$class("mdl-switch__focus-helper")]),
              _U.list([]))]))]));
   });
   var radio = F5(function (addr,model,styles,_p2,elems) {
      var _p3 = _p2;
      return A5(top,
      "radio",
      addr,
      model,
      styles,
      _U.list([A2($Html.input,
              _U.list([$Html$Attributes.type$("radio")
                      ,$Html$Attributes.$class("mdl-radio__button")
                      ,$Html$Attributes.disabled(model.isDisabled)
                      ,$Html$Attributes.checked(model.value)
                      ,$Html$Attributes.value(_p3._0)
                      ,$Html$Attributes.name(_p3._1)]),
              _U.list([]))
              ,A2($Html.span,
              _U.list([$Html$Attributes.$class("mdl-radio__label")]),
              elems)
              ,A2($Html.span,
              _U.list([$Html$Attributes.$class("mdl-radio__outer-circle")]),
              _U.list([]))
              ,A2($Html.span,
              _U.list([$Html$Attributes.$class("mdl-radio__inner-circle")]),
              _U.list([]))]));
   });
   var Model = F5(function (a,b,c,d,e) {
      return {isFocused: a
             ,isDisabled: b
             ,value: c
             ,ripple: d
             ,state: e};
   });
   var S = function (a) {    return {ctor: "S",_0: a};};
   var model = {isFocused: false
               ,isDisabled: false
               ,value: false
               ,ripple: true
               ,state: S($Material$Ripple.model)};
   var update = F2(function (action,model) {
      var _p4 = action;
      switch (_p4.ctor)
      {case "Change": return {ctor: "_Tuple2"
                             ,_0: _U.update(model,{value: $Basics.not(model.value)})
                             ,_1: $Effects.none};
         case "Ripple": return A2($Material$Helpers.map2nd,
           $Effects.map(Ripple),
           A2($Material$Helpers.map1st,
           function (r) {
              return _U.update(model,{state: S(r)});
           },
           A2($Material$Ripple.update,_p4._0,state(model))));
         default: return {ctor: "_Tuple2"
                         ,_0: _U.update(model,{isFocused: _p4._0})
                         ,_1: $Effects.none};}
   });
   var instance = F5(function (id,lift,view,model0,observers) {
      return A8($Material$Component.instance,
      view,
      update,
      function (_) {
         return _.toggles;
      },
      F2(function (x,y) {    return _U.update(y,{toggles: x});}),
      id,
      lift,
      model0,
      observers);
   });
   return _elm.Material.Toggles.values = {_op: _op
                                         ,model: model
                                         ,update: update
                                         ,$switch: $switch
                                         ,checkbox: checkbox
                                         ,radio: radio
                                         ,instance: instance
                                         ,fwdChange: fwdChange
                                         ,Model: Model};
};
Elm.Material = Elm.Material || {};
Elm.Material.make = function (_elm) {
   "use strict";
   _elm.Material = _elm.Material || {};
   if (_elm.Material.values) return _elm.Material.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Dict = Elm.Dict.make(_elm),
   $Effects = Elm.Effects.make(_elm),
   $List = Elm.List.make(_elm),
   $Material$Button = Elm.Material.Button.make(_elm),
   $Material$Component = Elm.Material.Component.make(_elm),
   $Material$Menu = Elm.Material.Menu.make(_elm),
   $Material$Snackbar = Elm.Material.Snackbar.make(_elm),
   $Material$Textfield = Elm.Material.Textfield.make(_elm),
   $Material$Toggles = Elm.Material.Toggles.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   var update = $Material$Component.update;
   var model = {button: $Dict.empty
               ,menu: $Dict.empty
               ,textfield: $Dict.empty
               ,snackbar: $Maybe.Nothing
               ,toggles: $Dict.empty};
   var Model = F5(function (a,b,c,d,e) {
      return {button: a
             ,textfield: b
             ,menu: c
             ,snackbar: d
             ,toggles: e};
   });
   return _elm.Material.values = {_op: _op
                                 ,model: model
                                 ,update: update
                                 ,Model: Model};
};
Elm.Demo = Elm.Demo || {};
Elm.Demo.Menus = Elm.Demo.Menus || {};
Elm.Demo.Menus.make = function (_elm) {
   "use strict";
   _elm.Demo = _elm.Demo || {};
   _elm.Demo.Menus = _elm.Demo.Menus || {};
   if (_elm.Demo.Menus.values) return _elm.Demo.Menus.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Demo$Page = Elm.Demo.Page.make(_elm),
   $Effects = Elm.Effects.make(_elm),
   $Html = Elm.Html.make(_elm),
   $List = Elm.List.make(_elm),
   $Material = Elm.Material.make(_elm),
   $Material$Color = Elm.Material.Color.make(_elm),
   $Material$Elevation = Elm.Material.Elevation.make(_elm),
   $Material$Grid = Elm.Material.Grid.make(_elm),
   $Material$Helpers = Elm.Material.Helpers.make(_elm),
   $Material$Menu = Elm.Material.Menu.make(_elm),
   $Material$Style = Elm.Material.Style.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   var references = _U.list([$Demo$Page.$package("http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-menu")
                            ,$Demo$Page.mds("https://www.google.com/design/spec/components/menus.html")
                            ,$Demo$Page.mdl("https://www.getmdl.io/components/#menus-section")]);
   var srcUrl = "https://github.com/debois/elm-mdl/blob/master/demo/Demo/Menus.elm";
   var intro = A2($Demo$Page.fromMDL,
   "https://www.getmdl.io/components/#menus-section",
   "\n\n> The Material Design Lite (MDL) menu component is a user interface element\n> that allows users to select one of a number of options. The selection\n> typically results in an action initiation, a setting change, or other\n> observable effect. Menu options are always presented in sets of two or more,\n> and options may be programmatically enabled or disabled as required. The menu\n> appears when the user is asked to choose among a series of options, and is\n> usually dismissed after the choice is made.\n>\n> Menus are an established but non-standardized feature in user interfaces, and\n> allow users to make choices that direct the activity, progress, or\n> characteristics of software. Their design and use is an important factor in\n> the overall user experience. See the menu component\'s <a href=\"http://www.google.com/design/spec/components/menus.html\">Material Design\n> specifications page</a> for details.\n\n");
   var describe = function (menu) {
      var _p0 = menu.alignment;
      switch (_p0.ctor)
      {case "BottomLeft": return "Lower left";
         case "BottomRight": return "Lower right";
         case "TopLeft": return "Top left";
         case "TopRight": return "Top right";
         default: return "Unaligned";}
   };
   var container = F5(function (addr,model,idx,menu,items) {
      var background = A2($Material$Style.div,
      _U.list([$Material$Style.cs("background")
              ,A2($Material$Style.css,"height","148px")
              ,A2($Material$Style.css,"width","100%")
              ,$Material$Color.background($Material$Color.white)]),
      _U.list([]));
      var bar = F2(function (idx,rightAlign) {
         var align = rightAlign ? {ctor: "_Tuple2"
                                  ,_0: "right"
                                  ,_1: "16px"} : {ctor: "_Tuple2",_0: "left",_1: "16px"};
         return A2($Material$Style.div,
         _U.list([$Material$Style.cs("bar")
                 ,A2($Material$Style.css,"box-sizing","border-box")
                 ,A2($Material$Style.css,"width","100%")
                 ,A2($Material$Style.css,"padding","16px")
                 ,A2($Material$Style.css,"height","64px")
                 ,$Material$Color.background($Material$Color.accent)
                 ,$Material$Color.text($Material$Color.white)]),
         _U.list([A2($Material$Style.div,
         _U.list([$Material$Style.cs("wrapper")
                 ,A2($Material$Style.css,"box-sizing","border-box")
                 ,A2($Material$Style.css,"position","absolute")
                 ,A3($Material$Style.css$,"right","16px",rightAlign)
                 ,A3($Material$Style.css$,
                 "left",
                 "16px",
                 $Basics.not(rightAlign))]),
         A3(menu.view,addr,model.mdl,items))]));
      });
      return A2($Material$Style.div,
      _U.list([$Material$Style.cs("section")]),
      _U.list([A2($Material$Style.div,
              _U.list([$Material$Elevation.e2
                      ,A2($Material$Style.css,"position","relative")
                      ,A2($Material$Style.css,"width","200px")
                      ,A2($Material$Style.css,"margin","0 auto")
                      ,A2($Material$Style.css,"margin-bottom","40px")]),
              _U.cmp(idx,1) > 0 ? _U.list([background
                                          ,A2(bar,
                                          idx,
                                          _U.eq(A2($Basics._op["%"],idx,2),1))]) : _U.list([A2(bar,
                                                                                           idx,
                                                                                           _U.eq(A2($Basics._op["%"],idx,2),1))
                                                                                           ,background]))
              ,A2($Material$Style.div,
              _U.list([A2($Material$Style.css,"margin","0 auto")
                      ,A2($Material$Style.css,"width","200px")
                      ,A2($Material$Style.css,"text-align","center")
                      ,A2($Material$Style.css,"height","48px")
                      ,A2($Material$Style.css,"line-height","48px")
                      ,A2($Material$Style.css,"margin-bottom","40px")]),
              _U.list([$Html.text(describe(menu.get(model.mdl)))]))]));
   });
   var items = _U.list([A3($Material$Menu.item,
                       false,
                       true,
                       $Html.text("Some Action"))
                       ,A3($Material$Menu.item,true,true,$Html.text("Another Action"))
                       ,A3($Material$Menu.item,
                       false,
                       false,
                       $Html.text("Disabled Action"))
                       ,A3($Material$Menu.item,
                       false,
                       true,
                       $Html.text("Yet Another Action"))]);
   var MDL = function (a) {    return {ctor: "MDL",_0: a};};
   var update = F2(function (action,model) {
      var _p1 = action;
      if (_p1.ctor === "MenuAction") {
            return {ctor: "_Tuple2",_0: model,_1: $Effects.none};
         } else {
            return A2($Material$Helpers.map1st,
            function (m) {
               return _U.update(model,{mdl: m});
            },
            A3($Material.update,MDL,_p1._0,model.mdl));
         }
   });
   var menus = A2($List.indexedMap,
   F2(function (idx,align) {
      return {ctor: "_Tuple2"
             ,_0: idx
             ,_1: A4($Material$Menu.instance,
             idx,
             MDL,
             A2($Material$Menu.model,true,align),
             _U.list([]))};
   }),
   _U.list([$Material$Menu.BottomLeft
           ,$Material$Menu.BottomRight
           ,$Material$Menu.TopLeft
           ,$Material$Menu.TopRight]));
   var view = F2(function (addr,model) {
      return A5($Demo$Page.body2,
      "Menus",
      srcUrl,
      intro,
      references,
      A3($Basics.flip,
      F2(function (x,y) {    return A2($List._op["::"],x,y);}),
      _U.list([]),
      A2($Material$Grid.grid,
      _U.list([]),
      A2($List.map,
      function (_p2) {
         var _p3 = _p2;
         return A2($Material$Grid.cell,
         _U.list([A2($Material$Grid.size,$Material$Grid.All,6)]),
         _U.list([A5(container,addr,model,_p3._0,_p3._1,items)]));
      },
      menus))));
   });
   var MenuAction = F2(function (a,b) {
      return {ctor: "MenuAction",_0: a,_1: b};
   });
   var model = {mdl: $Material.model};
   var Model = function (a) {    return {mdl: a};};
   return _elm.Demo.Menus.values = {_op: _op
                                   ,Model: Model
                                   ,model: model
                                   ,MenuAction: MenuAction
                                   ,MDL: MDL
                                   ,update: update
                                   ,menus: menus
                                   ,items: items
                                   ,describe: describe
                                   ,view: view
                                   ,container: container
                                   ,intro: intro
                                   ,srcUrl: srcUrl
                                   ,references: references};
};
Elm.Demo = Elm.Demo || {};
Elm.Demo.Snackbar = Elm.Demo.Snackbar || {};
Elm.Demo.Snackbar.make = function (_elm) {
   "use strict";
   _elm.Demo = _elm.Demo || {};
   _elm.Demo.Snackbar = _elm.Demo.Snackbar || {};
   if (_elm.Demo.Snackbar.values) return _elm.Demo.Snackbar.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Array = Elm.Array.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Demo$Page = Elm.Demo.Page.make(_elm),
   $Effects = Elm.Effects.make(_elm),
   $Html = Elm.Html.make(_elm),
   $Html$Attributes = Elm.Html.Attributes.make(_elm),
   $List = Elm.List.make(_elm),
   $Material = Elm.Material.make(_elm),
   $Material$Button = Elm.Material.Button.make(_elm),
   $Material$Color = Elm.Material.Color.make(_elm),
   $Material$Elevation = Elm.Material.Elevation.make(_elm),
   $Material$Grid = Elm.Material.Grid.make(_elm),
   $Material$Helpers = Elm.Material.Helpers.make(_elm),
   $Material$Snackbar = Elm.Material.Snackbar.make(_elm),
   $Material$Style = Elm.Material.Style.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $Time = Elm.Time.make(_elm);
   var _op = {};
   var references = _U.list([$Demo$Page.$package("http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Snackbar")
                            ,$Demo$Page.mds("https://www.google.com/design/spec/components/snackbars-toasts.html")
                            ,$Demo$Page.mdl("https://www.getmdl.io/components/index.html#snackbar-section")]);
   var srcUrl = "https://github.com/debois/elm-mdl/blob/master/demo/Demo/Snackbar.elm";
   var intro = A2($Demo$Page.fromMDL,
   "https://www.getmdl.io/components/index.html#snackbar-section",
   "\n> The Material Design Lite (MDL) __snackbar__ component is a container used to\n> notify a user of an operation\'s status. It displays at the bottom of the\n> screen. A snackbar may contain an action button to execute a command for the\n> user. Actions should undo the committed action or retry it if it failed for\n> example. Actions should not be to close the snackbar. By not providing an\n> action, the snackbar becomes a __toast__ component.\n\n");
   var transitionLength = 150 * $Time.millisecond;
   var transitionInner = A2($Material$Style.css,
   "transition",
   A2($Basics._op["++"],
   "box-shadow 333ms ease-in-out 0s, ",
   A2($Basics._op["++"],
   "width ",
   A2($Basics._op["++"],
   $Basics.toString(transitionLength),
   A2($Basics._op["++"],
   "ms, ",
   A2($Basics._op["++"],
   "height ",
   A2($Basics._op["++"],
   $Basics.toString(transitionLength),
   A2($Basics._op["++"],
   "ms, ",
   A2($Basics._op["++"],
   "background-color ",
   A2($Basics._op["++"],
   $Basics.toString(transitionLength),
   "ms"))))))))));
   var transitionOuter = A2($Material$Style.css,
   "transition",
   A2($Basics._op["++"],
   "width ",
   A2($Basics._op["++"],
   $Basics.toString(transitionLength),
   A2($Basics._op["++"],
   "ms ease-in-out 0s, ",
   A2($Basics._op["++"],
   "margin ",
   A2($Basics._op["++"],
   $Basics.toString(transitionLength),
   "ms ease-in-out 0s"))))));
   var boxWidth = "64px";
   var boxHeight = "48px";
   var mapSquare = F3(function (k,f,model) {
      return _U.update(model,
      {squares: A2($List.map,
      function (_p0) {
         var _p1 = _p0;
         var _p2 = _p1._0;
         return !_U.eq(k,_p2) ? _p1 : {ctor: "_Tuple2"
                                      ,_0: _p2
                                      ,_1: f(_p1._1)};
      },
      model.squares)});
   });
   var MDL = function (a) {    return {ctor: "MDL",_0: a};};
   var Snackbar = function (a) {
      return {ctor: "Snackbar",_0: a};
   };
   var Gone = function (a) {    return {ctor: "Gone",_0: a};};
   var Appear = function (a) {    return {ctor: "Appear",_0: a};};
   var AddToast = {ctor: "AddToast"};
   var addToastButton = A5($Material$Button.instance,
   1,
   MDL,
   $Material$Button.raised,
   $Material$Button.model(true),
   _U.list([$Material$Button.fwdClick(AddToast)]));
   var AddSnackbar = {ctor: "AddSnackbar"};
   var addSnackbarButton = A5($Material$Button.instance,
   0,
   MDL,
   $Material$Button.raised,
   $Material$Button.model(true),
   _U.list([$Material$Button.fwdClick(AddSnackbar)]));
   var model = {count: 0
               ,squares: _U.list([])
               ,snackbar: $Material$Snackbar.model
               ,mdl: $Material.model};
   var Model = F4(function (a,b,c,d) {
      return {count: a,squares: b,snackbar: c,mdl: d};
   });
   var Disappearing = {ctor: "Disappearing"};
   var Idle = {ctor: "Idle"};
   var Active = {ctor: "Active"};
   var Waiting = {ctor: "Waiting"};
   var Appearing = {ctor: "Appearing"};
   var add = F2(function (f,model) {
      var _p3 = A2($Material$Helpers.map2nd,
      $Effects.map(Snackbar),
      A2($Material$Snackbar.add,f(model.count),model.snackbar));
      var snackbar$ = _p3._0;
      var fx = _p3._1;
      var model$ = _U.update(model,
      {snackbar: snackbar$
      ,count: model.count + 1
      ,squares: A2($List._op["::"],
      {ctor: "_Tuple2",_0: model.count,_1: Appearing},
      model.squares)});
      return {ctor: "_Tuple2"
             ,_0: model$
             ,_1: $Effects.batch(_U.list([$Effects.tick($Basics.always(Appear(model.count)))
                                         ,fx]))};
   });
   var update = F2(function (action,model) {
      var _p4 = action;
      switch (_p4.ctor)
      {case "AddSnackbar": return A2(add,
           function (k) {
              return A3($Material$Snackbar.snackbar,
              k,
              A2($Basics._op["++"],"Snackbar message #",$Basics.toString(k)),
              "UNDO");
           },
           model);
         case "AddToast": return A2(add,
           function (k) {
              return A2($Material$Snackbar.toast,
              k,
              A2($Basics._op["++"],"Toast message #",$Basics.toString(k)));
           },
           model);
         case "Appear": return $Material$Helpers.pure(A3(mapSquare,
           _p4._0,
           function (sq) {
              return _U.eq(sq,Appearing) ? Waiting : sq;
           },
           model));
         case "Gone": return {ctor: "_Tuple2"
                             ,_0: _U.update(model,
                             {squares: A2($List.filter,
                             function (_p6) {
                                return A2(F2(function (x,y) {    return !_U.eq(x,y);}),
                                _p4._0,
                                $Basics.fst(_p6));
                             },
                             model.squares)})
                             ,_1: $Effects.none};
         case "Snackbar": switch (_p4._0.ctor)
           {case "Begin": return $Material$Helpers.pure(A3(mapSquare,
                _p4._0._0,
                $Basics.always(Active),
                model));
              case "End": return $Material$Helpers.pure(A3(mapSquare,
                _p4._0._0,
                $Basics.always(Idle),
                model));
              case "Click": var _p5 = _p4._0._0;
                return {ctor: "_Tuple2"
                       ,_0: A3(mapSquare,_p5,$Basics.always(Disappearing),model)
                       ,_1: A2($Material$Helpers.delay,transitionLength,Gone(_p5))};
              default: return A2($Material$Helpers.map2nd,
                $Effects.map(Snackbar),
                A2($Material$Helpers.map1st,
                function (s) {
                   return _U.update(model,{snackbar: s});
                },
                A2($Material$Snackbar.update,_p4._0,model.snackbar)));}
         default: return A2($Material$Helpers.map1st,
           function (m) {
              return _U.update(model,{mdl: m});
           },
           A3($Material.update,MDL,_p4._0,model.mdl));}
   });
   var clickView = F2(function (model,_p7) {
      var _p8 = _p7;
      var _p12 = _p8._1;
      var _p11 = _p8._0;
      var selected$ = _U.eq(_p12,Active);
      var _p9 = _U.eq(_p12,Appearing) || _U.eq(_p12,
      Disappearing) ? {ctor: "_Tuple4"
                      ,_0: "0"
                      ,_1: "0"
                      ,_2: "16px 0"
                      ,_3: false} : {ctor: "_Tuple4"
                                    ,_0: boxWidth
                                    ,_1: boxHeight
                                    ,_2: "16px 16px"
                                    ,_3: selected$};
      var width = _p9._0;
      var height = _p9._1;
      var margin = _p9._2;
      var selected = _p9._3;
      var shade = function () {
         var _p10 = _p12;
         if (_p10.ctor === "Idle") {
               return $Material$Color.S100;
            } else {
               return $Material$Color.S500;
            }
      }();
      var hue = A2($Maybe.withDefault,
      $Material$Color.Teal,
      A2($Array.get,
      A2($Basics._op["%"],
      _p11 + 4,
      $Array.length($Material$Color.hues)),
      $Material$Color.hues));
      var color = A2($Material$Color.color,hue,shade);
      return A2($Material$Style.div,
      _U.list([A2($Material$Style.css,"height",boxHeight)
              ,A2($Material$Style.css,"width",width)
              ,A2($Material$Style.css,"position","relative")
              ,A2($Material$Style.css,"display","inline-block")
              ,A2($Material$Style.css,"margin",margin)
              ,A2($Material$Style.css,"z-index","0")
              ,transitionOuter
              ,$Material$Style.attribute($Html$Attributes.key($Basics.toString(_p11)))]),
      _U.list([A2($Material$Style.div,
      _U.list([$Material$Color.background(color)
              ,$Material$Color.text($Material$Color.primaryContrast)
              ,selected ? $Material$Elevation.e8 : $Material$Elevation.e2
              ,A2($Material$Style.css,"display","inline-flex")
              ,A2($Material$Style.css,"align-items","center")
              ,A2($Material$Style.css,"justify-content","center")
              ,A2($Material$Style.css,"flex","0 0 auto")
              ,A2($Material$Style.css,"height",height)
              ,A2($Material$Style.css,"width",width)
              ,A2($Material$Style.css,"border-radius","2px")
              ,A2($Material$Style.css,"box-sizing","border-box")
              ,A2($Material$Style.css,"position","absolute")
              ,A2($Material$Style.css,"bottom","0")
              ,A2($Material$Style.css,"left","0")
              ,transitionInner]),
      _U.list([A2($Html.div,
      _U.list([]),
      _U.list([$Html.text($Basics.toString(_p11))]))]))]));
   });
   var view = F2(function (addr,model) {
      return A5($Demo$Page.body2,
      "Snackbar & Toast",
      srcUrl,
      intro,
      references,
      _U.list([A2($Html.p,
              _U.list([]),
              _U.list([$Html.text("Click the buttons below to generate toasts and snackbars. Note that \n                  multiple activations are automatically queued.")]))
              ,A2($Material$Grid.grid,
              _U.list([]),
              _U.list([A2($Material$Grid.cell,
                      _U.list([A2($Material$Grid.size,$Material$Grid.All,4)
                              ,A2($Material$Grid.size,$Material$Grid.Desktop,2)]),
                      _U.list([A4(addSnackbarButton.view,
                      addr,
                      model.mdl,
                      _U.list([$Material$Button.colored
                              ,A2($Material$Style.css,"width","8em")]),
                      _U.list([$Html.text("Snackbar")]))]))
                      ,A2($Material$Grid.cell,
                      _U.list([A2($Material$Grid.size,$Material$Grid.All,4)
                              ,A2($Material$Grid.size,$Material$Grid.Desktop,2)]),
                      _U.list([A4(addToastButton.view,
                      addr,
                      model.mdl,
                      _U.list([$Material$Button.colored
                              ,A2($Material$Style.css,"width","8em")]),
                      _U.list([$Html.text("Toast")]))]))
                      ,A2($Material$Grid.cell,
                      _U.list([A2($Material$Grid.size,$Material$Grid.Desktop,10)
                              ,A2($Material$Grid.offset,$Material$Grid.Desktop,1)
                              ,A2($Material$Grid.size,$Material$Grid.Tablet,6)
                              ,A2($Material$Grid.offset,$Material$Grid.Tablet,1)
                              ,A2($Material$Grid.size,$Material$Grid.Phone,4)
                              ,$Material$Grid.align($Material$Grid.Top)
                              ,A2($Material$Style.css,"padding-top","32px")]),
                      A2($List.map,clickView(model),$List.reverse(model.squares)))]))
              ,A2($Material$Snackbar.view,
              A2($Signal.forwardTo,addr,Snackbar),
              model.snackbar)]));
   });
   return _elm.Demo.Snackbar.values = {_op: _op
                                      ,Appearing: Appearing
                                      ,Waiting: Waiting
                                      ,Active: Active
                                      ,Idle: Idle
                                      ,Disappearing: Disappearing
                                      ,Model: Model
                                      ,model: model
                                      ,AddSnackbar: AddSnackbar
                                      ,AddToast: AddToast
                                      ,Appear: Appear
                                      ,Gone: Gone
                                      ,Snackbar: Snackbar
                                      ,MDL: MDL
                                      ,add: add
                                      ,mapSquare: mapSquare
                                      ,update: update
                                      ,addSnackbarButton: addSnackbarButton
                                      ,addToastButton: addToastButton
                                      ,boxHeight: boxHeight
                                      ,boxWidth: boxWidth
                                      ,transitionLength: transitionLength
                                      ,transitionInner: transitionInner
                                      ,transitionOuter: transitionOuter
                                      ,clickView: clickView
                                      ,view: view
                                      ,intro: intro
                                      ,srcUrl: srcUrl
                                      ,references: references};
};
Elm.Demo = Elm.Demo || {};
Elm.Demo.Textfields = Elm.Demo.Textfields || {};
Elm.Demo.Textfields.make = function (_elm) {
   "use strict";
   _elm.Demo = _elm.Demo || {};
   _elm.Demo.Textfields = _elm.Demo.Textfields || {};
   if (_elm.Demo.Textfields.values)
   return _elm.Demo.Textfields.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Demo$Page = Elm.Demo.Page.make(_elm),
   $Effects = Elm.Effects.make(_elm),
   $Html = Elm.Html.make(_elm),
   $List = Elm.List.make(_elm),
   $Material = Elm.Material.make(_elm),
   $Material$Grid = Elm.Material.Grid.make(_elm),
   $Material$Helpers = Elm.Material.Helpers.make(_elm),
   $Material$Textfield = Elm.Material.Textfield.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Regex = Elm.Regex.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   var references = _U.list([$Demo$Page.$package("http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Textfield")
                            ,$Demo$Page.mds("https://www.google.com/design/spec/components/text-fields.html")
                            ,$Demo$Page.mdl("https://www.getmdl.io/components/#textfields-section")]);
   var srcUrl = "https://github.com/debois/elm-mdl/blob/master/demo/Demo/Textfields.elm";
   var intro = A2($Demo$Page.fromMDL,
   "http://www.getmdl.io/components/#textfields-section",
   "\n> The Material Design Lite (MDL) text field component is an enhanced version of\n> the standard HTML `<input type=\"text\">` and `<input type=\"textarea\">` elements.\n> A text field consists of a horizontal line indicating where keyboard input\n> can occur and, typically, text that clearly communicates the intended\n> contents of the text field. The MDL text field component provides various\n> types of text fields, and allows you to add both display and click effects.\n>\n> Text fields are a common feature of most user interfaces, regardless of a\n> site\'s content or function. Their design and use is therefore an important\n> factor in the overall user experience. See the text field component\'s\n> [Material  Design specifications page](https://www.google.com/design/spec/components/text-fields.html)\n> for details.\n>\n> The enhanced text field component has a more vivid visual look than a standard\n> text field, and may be initially or programmatically disabled. There are three\n> main types of text fields in the text field component, each with its own basic\n> coding requirements. The types are single-line, multi-line, and expandable.\n\nThis implementation provides only single-line.\n\n");
   var m0 = $Material$Textfield.model;
   var match = F2(function (str,rx) {
      return A2($List.any,
      function (_p0) {
         return A2(F2(function (x,y) {    return _U.eq(x,y);}),
         str,
         function (_) {
            return _.match;
         }(_p0));
      },
      A3($Regex.find,$Regex.All,rx,str));
   });
   var Upd4 = function (a) {    return {ctor: "Upd4",_0: a};};
   var Upd0 = function (a) {    return {ctor: "Upd0",_0: a};};
   var MDL = function (a) {    return {ctor: "MDL",_0: a};};
   var field0 = A4($Material$Textfield.instance,
   0,
   MDL,
   m0,
   _U.list([$Material$Textfield.fwdInput(Upd0)]));
   var field1 = A4($Material$Textfield.instance,
   1,
   MDL,
   _U.update(m0,
   {label: $Maybe.Just({text: "Labelled",$float: false})}),
   _U.list([]));
   var field2 = A4($Material$Textfield.instance,
   2,
   MDL,
   _U.update(m0,
   {label: $Maybe.Just({text: "Floating label",$float: true})}),
   _U.list([]));
   var field3 = A4($Material$Textfield.instance,
   3,
   MDL,
   _U.update(m0,
   {label: $Maybe.Just({text: "Disabled",$float: false})
   ,isDisabled: true}),
   _U.list([]));
   var transferToDisabled = function (str) {
      return field3.map(function (m) {
         return _U.update(m,
         {value: _U.eq(str,"") ? "" : A2($Basics._op["++"],
         "\"",
         A2($Basics._op["++"],str,"\" (still disabled, though)"))});
      });
   };
   var field4 = A4($Material$Textfield.instance,
   4,
   MDL,
   _U.update(m0,
   {label: $Maybe.Just({text: "With error checking"
                       ,$float: false})}),
   _U.list([$Material$Textfield.fwdInput(Upd4)]));
   var checkRegex = F3(function (str,_p1,mdl) {
      var _p2 = _p1;
      var value4 = function (_) {
         return _.value;
      }(field4.get(mdl));
      return A2(field4.map,
      function (m) {
         return _U.update(m,
         {error: A2(match,
         value4,
         _p2._1) ? $Maybe.Nothing : $Maybe.Just(A2($Basics._op["++"],
         "Doesn\'t match regex \' ",
         A2($Basics._op["++"],_p2._0,"\'")))});
      },
      mdl);
   });
   var update = F2(function (action,model) {
      var _p3 = action;
      switch (_p3.ctor)
      {case "MDL": return A2($Material$Helpers.map1st,
           function (mdl$) {
              return _U.update(model,{mdl: mdl$});
           },
           A3($Material.update,MDL,_p3._0,model.mdl));
         case "Upd0": return {ctor: "_Tuple2"
                             ,_0: _U.update(model,
                             {mdl: A2(transferToDisabled,_p3._0,model.mdl)})
                             ,_1: $Effects.none};
         default: return {ctor: "_Tuple2"
                         ,_0: _U.update(model,
                         {mdl: A3(checkRegex,_p3._0,model.rx,model.mdl)})
                         ,_1: $Effects.none};}
   });
   var view = F2(function (addr,model) {
      return A5($Demo$Page.body2,
      "Textfields",
      srcUrl,
      intro,
      references,
      A2(F2(function (x,y) {    return A2($List._op["::"],x,y);}),
      $Html.text("Try entering text into some of the textfields below."),
      A3($Basics.flip,
      F2(function (x,y) {    return A2($List._op["::"],x,y);}),
      _U.list([]),
      A2($Material$Grid.grid,
      _U.list([]),
      A2($List.intersperse,
      A2($Material$Grid.cell,
      _U.list([A2($Material$Grid.size,$Material$Grid.All,1)]),
      _U.list([])),
      A2($List.map,
      function (c) {
         return A2($Material$Grid.cell,
         _U.list([A2($Material$Grid.size,$Material$Grid.All,4)
                 ,A2($Material$Grid.offset,$Material$Grid.Desktop,1)]),
         _U.list([A3(c.view,addr,model.mdl,_U.list([]))]));
      },
      _U.list([field0,field1,field2,field3,field4])))))));
   });
   var setRegex = function (str) {
      return {ctor: "_Tuple2",_0: str,_1: $Regex.regex(str)};
   };
   var rx0 = "[0-9]*";
   var model = {mdl: $Material.model,rx: setRegex(rx0)};
   var Model = F2(function (a,b) {    return {mdl: a,rx: b};});
   return _elm.Demo.Textfields.values = {_op: _op
                                        ,Model: Model
                                        ,rx0: rx0
                                        ,setRegex: setRegex
                                        ,model: model
                                        ,MDL: MDL
                                        ,Upd0: Upd0
                                        ,Upd4: Upd4
                                        ,transferToDisabled: transferToDisabled
                                        ,match: match
                                        ,checkRegex: checkRegex
                                        ,update: update
                                        ,m0: m0
                                        ,field0: field0
                                        ,field1: field1
                                        ,field2: field2
                                        ,field3: field3
                                        ,field4: field4
                                        ,view: view
                                        ,intro: intro
                                        ,srcUrl: srcUrl
                                        ,references: references};
};
Elm.StartApp = Elm.StartApp || {};
Elm.StartApp.make = function (_elm) {
   "use strict";
   _elm.StartApp = _elm.StartApp || {};
   if (_elm.StartApp.values) return _elm.StartApp.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Effects = Elm.Effects.make(_elm),
   $Html = Elm.Html.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $Task = Elm.Task.make(_elm);
   var _op = {};
   var start = function (config) {
      var updateStep = F2(function (action,_p0) {
         var _p1 = _p0;
         var _p2 = A2(config.update,action,_p1._0);
         var newModel = _p2._0;
         var additionalEffects = _p2._1;
         return {ctor: "_Tuple2"
                ,_0: newModel
                ,_1: $Effects.batch(_U.list([_p1._1,additionalEffects]))};
      });
      var update = F2(function (actions,_p3) {
         var _p4 = _p3;
         return A3($List.foldl,
         updateStep,
         {ctor: "_Tuple2",_0: _p4._0,_1: $Effects.none},
         actions);
      });
      var messages = $Signal.mailbox(_U.list([]));
      var singleton = function (action) {
         return _U.list([action]);
      };
      var address = A2($Signal.forwardTo,messages.address,singleton);
      var inputs = $Signal.mergeMany(A2($List._op["::"],
      messages.signal,
      A2($List.map,$Signal.map(singleton),config.inputs)));
      var effectsAndModel = A3($Signal.foldp,
      update,
      config.init,
      inputs);
      var model = A2($Signal.map,$Basics.fst,effectsAndModel);
      return {html: A2($Signal.map,config.view(address),model)
             ,model: model
             ,tasks: A2($Signal.map,
             function (_p5) {
                return A2($Effects.toTask,messages.address,$Basics.snd(_p5));
             },
             effectsAndModel)};
   };
   var App = F3(function (a,b,c) {
      return {html: a,model: b,tasks: c};
   });
   var Config = F4(function (a,b,c,d) {
      return {init: a,update: b,view: c,inputs: d};
   });
   return _elm.StartApp.values = {_op: _op
                                 ,start: start
                                 ,Config: Config
                                 ,App: App};
};
Elm.Native = Elm.Native || {};
Elm.Native.History = {};
Elm.Native.History.make = function(localRuntime){

  localRuntime.Native = localRuntime.Native || {};
  localRuntime.Native.History = localRuntime.Native.History || {};

  if (localRuntime.Native.History.values){
    return localRuntime.Native.History.values;
  }

  var NS = Elm.Native.Signal.make(localRuntime);
  var Task = Elm.Native.Task.make(localRuntime);
  var Utils = Elm.Native.Utils.make(localRuntime);
  var node = window;

  // path : Signal String
  var path = NS.input('History.path', window.location.pathname);

  // length : Signal Int
  var length = NS.input('History.length', window.history.length);

  // hash : Signal String
  var hash = NS.input('History.hash', window.location.hash);

  // href : Signal String
  var href = NS.input('History.href', window.location.href);

  localRuntime.addListener([href.id, path.id, length.id], node, 'popstate', function getPath(event){
    localRuntime.notify(path.id, window.location.pathname);
    localRuntime.notify(length.id, window.history.length);
    localRuntime.notify(hash.id, window.location.hash);
    localRuntime.notify(href.id, window.location.href);
  });

  localRuntime.addListener([hash.id], node, 'hashchange', function getHash(event){
    localRuntime.notify(hash.id, window.location.hash);
  });

  // setHash : String -> Task error ()
  var setHash = function(hash){
    return Task.asyncFunction(function(callback){
      setTimeout(function(){
        location.hash = hash;
        localRuntime.notify(hash.id, window.location.hash);
        localRuntime.notify(length.id, window.history.length);
        localRuntime.notify(href.id, window.location.href);
      },0);
      return callback(Task.succeed(Utils.Tuple0));
    });
  };

  // setPath : String -> Task error ()
  var setPath = function(urlpath){
    return Task.asyncFunction(function(callback){
      setTimeout(function(){
        window.history.pushState({}, "", urlpath);
        localRuntime.notify(path.id, window.location.pathname);
        localRuntime.notify(hash.id, window.location.hash);
        localRuntime.notify(length.id, window.history.length);
        localRuntime.notify(href.id, window.location.href);
      },0);
      return callback(Task.succeed(Utils.Tuple0));
    });
  };

  // replacePath : String -> Task error ()
  var replacePath = function(urlpath){
    return Task.asyncFunction(function(callback){
      setTimeout(function(){
        window.history.replaceState({}, "", urlpath);
        localRuntime.notify(path.id, window.location.pathname);
        localRuntime.notify(hash.id, window.location.hash);
        localRuntime.notify(length.id, window.history.length);
        localRuntime.notify(href.id, window.location.href);
      },0);
      return callback(Task.succeed(Utils.Tuple0));
    });
  };

  // go : Int -> Task error ()
  var go = function(n){
    return Task.asyncFunction(function(callback){
      setTimeout(function(){
        window.history.go(n);
        localRuntime.notify(length.id, window.history.length);
        localRuntime.notify(hash.id, window.location.hash);
        localRuntime.notify(href.id, window.location.href);
      }, 0);
      return callback(Task.succeed(Utils.Tuple0));
    });
  };

  // back : Task error ()
  var back = Task.asyncFunction(function(callback){
    setTimeout(function(){
      localRuntime.notify(hash.id, window.location.hash);
      window.history.back();
      localRuntime.notify(length.id, window.history.length);
      localRuntime.notify(href.id, window.location.href);
    }, 0);
    return callback(Task.succeed(Utils.Tuple0));
  });

  // forward : Task error ()
  var forward = Task.asyncFunction(function(callback){
    setTimeout(function(){
      window.history.forward();
      localRuntime.notify(length.id, window.history.length);
      localRuntime.notify(hash.id, window.location.hash);
      localRuntime.notify(href.id, window.location.href);
    }, 0);
    return callback(Task.succeed(Utils.Tuple0));
  });



  return {
    path        : path,
    setHash     : setHash,
    setPath     : setPath,
    replacePath : replacePath,
    go          : go,
    back        : back,
    forward     : forward,
    length      : length,
    hash        : hash,
    href        : href
  };

};

Elm.History = Elm.History || {};
Elm.History.make = function (_elm) {
   "use strict";
   _elm.History = _elm.History || {};
   if (_elm.History.values) return _elm.History.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$History = Elm.Native.History.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $Task = Elm.Task.make(_elm);
   var _op = {};
   var href = $Native$History.href;
   var path = $Native$History.path;
   var hash = $Native$History.hash;
   var length = $Native$History.length;
   var forward = $Native$History.forward;
   var back = $Native$History.back;
   var go = $Native$History.go;
   var replacePath = $Native$History.replacePath;
   var setPath = $Native$History.setPath;
   var setHash = $Native$History.setHash;
   return _elm.History.values = {_op: _op
                                ,setHash: setHash
                                ,setPath: setPath
                                ,replacePath: replacePath
                                ,go: go
                                ,back: back
                                ,forward: forward
                                ,length: length
                                ,hash: hash
                                ,path: path
                                ,href: href};
};
Elm.Hop = Elm.Hop || {};
Elm.Hop.Types = Elm.Hop.Types || {};
Elm.Hop.Types.make = function (_elm) {
   "use strict";
   _elm.Hop = _elm.Hop || {};
   _elm.Hop.Types = _elm.Hop.Types || {};
   if (_elm.Hop.Types.values) return _elm.Hop.Types.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Combine = Elm.Combine.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Dict = Elm.Dict.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $Task = Elm.Task.make(_elm);
   var _op = {};
   var newQuery = $Dict.empty;
   var newLocation = {query: newQuery,path: _U.list([])};
   var Router = F2(function (a,b) {
      return {run: a,signal: b};
   });
   var Config = F2(function (a,b) {
      return {matchers: a,notFound: b};
   });
   var PathMatcher = F2(function (a,b) {
      return {parser: a,segments: b};
   });
   var Location = F2(function (a,b) {
      return {path: a,query: b};
   });
   return _elm.Hop.Types.values = {_op: _op
                                  ,newLocation: newLocation
                                  ,newQuery: newQuery
                                  ,Config: Config
                                  ,Router: Router
                                  ,PathMatcher: PathMatcher
                                  ,Location: Location};
};
Elm.Native.Http = {};
Elm.Native.Http.make = function(localRuntime) {

	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Http = localRuntime.Native.Http || {};
	if (localRuntime.Native.Http.values)
	{
		return localRuntime.Native.Http.values;
	}

	var Dict = Elm.Dict.make(localRuntime);
	var List = Elm.List.make(localRuntime);
	var Maybe = Elm.Maybe.make(localRuntime);
	var Task = Elm.Native.Task.make(localRuntime);


	function send(settings, request)
	{
		return Task.asyncFunction(function(callback) {
			var req = new XMLHttpRequest();

			// start
			if (settings.onStart.ctor === 'Just')
			{
				req.addEventListener('loadStart', function() {
					var task = settings.onStart._0;
					Task.spawn(task);
				});
			}

			// progress
			if (settings.onProgress.ctor === 'Just')
			{
				req.addEventListener('progress', function(event) {
					var progress = !event.lengthComputable
						? Maybe.Nothing
						: Maybe.Just({
							_: {},
							loaded: event.loaded,
							total: event.total
						});
					var task = settings.onProgress._0(progress);
					Task.spawn(task);
				});
			}

			// end
			req.addEventListener('error', function() {
				return callback(Task.fail({ ctor: 'RawNetworkError' }));
			});

			req.addEventListener('timeout', function() {
				return callback(Task.fail({ ctor: 'RawTimeout' }));
			});

			req.addEventListener('load', function() {
				return callback(Task.succeed(toResponse(req)));
			});

			req.open(request.verb, request.url, true);

			// set all the headers
			function setHeader(pair) {
				req.setRequestHeader(pair._0, pair._1);
			}
			A2(List.map, setHeader, request.headers);

			// set the timeout
			req.timeout = settings.timeout;

			// enable this withCredentials thing
			req.withCredentials = settings.withCredentials;

			// ask for a specific MIME type for the response
			if (settings.desiredResponseType.ctor === 'Just')
			{
				req.overrideMimeType(settings.desiredResponseType._0);
			}

			// actuall send the request
			if(request.body.ctor === "BodyFormData")
			{
				req.send(request.body.formData)
			}
			else
			{
				req.send(request.body._0);
			}
		});
	}


	// deal with responses

	function toResponse(req)
	{
		var tag = req.responseType === 'blob' ? 'Blob' : 'Text'
		var response = tag === 'Blob' ? req.response : req.responseText;
		return {
			_: {},
			status: req.status,
			statusText: req.statusText,
			headers: parseHeaders(req.getAllResponseHeaders()),
			url: req.responseURL,
			value: { ctor: tag, _0: response }
		};
	}


	function parseHeaders(rawHeaders)
	{
		var headers = Dict.empty;

		if (!rawHeaders)
		{
			return headers;
		}

		var headerPairs = rawHeaders.split('\u000d\u000a');
		for (var i = headerPairs.length; i--; )
		{
			var headerPair = headerPairs[i];
			var index = headerPair.indexOf('\u003a\u0020');
			if (index > 0)
			{
				var key = headerPair.substring(0, index);
				var value = headerPair.substring(index + 2);

				headers = A3(Dict.update, key, function(oldValue) {
					if (oldValue.ctor === 'Just')
					{
						return Maybe.Just(value + ', ' + oldValue._0);
					}
					return Maybe.Just(value);
				}, headers);
			}
		}

		return headers;
	}


	function multipart(dataList)
	{
		var formData = new FormData();

		while (dataList.ctor !== '[]')
		{
			var data = dataList._0;
			if (data.ctor === 'StringData')
			{
				formData.append(data._0, data._1);
			}
			else
			{
				var fileName = data._1.ctor === 'Nothing'
					? undefined
					: data._1._0;
				formData.append(data._0, data._2, fileName);
			}
			dataList = dataList._1;
		}

		return { ctor: 'BodyFormData', formData: formData };
	}


	function uriEncode(string)
	{
		return encodeURIComponent(string);
	}

	function uriDecode(string)
	{
		return decodeURIComponent(string);
	}

	return localRuntime.Native.Http.values = {
		send: F2(send),
		multipart: multipart,
		uriEncode: uriEncode,
		uriDecode: uriDecode
	};
};

Elm.Http = Elm.Http || {};
Elm.Http.make = function (_elm) {
   "use strict";
   _elm.Http = _elm.Http || {};
   if (_elm.Http.values) return _elm.Http.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Dict = Elm.Dict.make(_elm),
   $Json$Decode = Elm.Json.Decode.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Http = Elm.Native.Http.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $String = Elm.String.make(_elm),
   $Task = Elm.Task.make(_elm),
   $Time = Elm.Time.make(_elm);
   var _op = {};
   var send = $Native$Http.send;
   var BadResponse = F2(function (a,b) {
      return {ctor: "BadResponse",_0: a,_1: b};
   });
   var UnexpectedPayload = function (a) {
      return {ctor: "UnexpectedPayload",_0: a};
   };
   var handleResponse = F2(function (handle,response) {
      if (_U.cmp(200,
      response.status) < 1 && _U.cmp(response.status,300) < 0) {
            var _p0 = response.value;
            if (_p0.ctor === "Text") {
                  return handle(_p0._0);
               } else {
                  return $Task.fail(UnexpectedPayload("Response body is a blob, expecting a string."));
               }
         } else return $Task.fail(A2(BadResponse,
         response.status,
         response.statusText));
   });
   var NetworkError = {ctor: "NetworkError"};
   var Timeout = {ctor: "Timeout"};
   var promoteError = function (rawError) {
      var _p1 = rawError;
      if (_p1.ctor === "RawTimeout") {
            return Timeout;
         } else {
            return NetworkError;
         }
   };
   var fromJson = F2(function (decoder,response) {
      var decode = function (str) {
         var _p2 = A2($Json$Decode.decodeString,decoder,str);
         if (_p2.ctor === "Ok") {
               return $Task.succeed(_p2._0);
            } else {
               return $Task.fail(UnexpectedPayload(_p2._0));
            }
      };
      return A2($Task.andThen,
      A2($Task.mapError,promoteError,response),
      handleResponse(decode));
   });
   var RawNetworkError = {ctor: "RawNetworkError"};
   var RawTimeout = {ctor: "RawTimeout"};
   var Blob = function (a) {    return {ctor: "Blob",_0: a};};
   var Text = function (a) {    return {ctor: "Text",_0: a};};
   var Response = F5(function (a,b,c,d,e) {
      return {status: a,statusText: b,headers: c,url: d,value: e};
   });
   var defaultSettings = {timeout: 0
                         ,onStart: $Maybe.Nothing
                         ,onProgress: $Maybe.Nothing
                         ,desiredResponseType: $Maybe.Nothing
                         ,withCredentials: false};
   var post = F3(function (decoder,url,body) {
      var request = {verb: "POST"
                    ,headers: _U.list([])
                    ,url: url
                    ,body: body};
      return A2(fromJson,decoder,A2(send,defaultSettings,request));
   });
   var Settings = F5(function (a,b,c,d,e) {
      return {timeout: a
             ,onStart: b
             ,onProgress: c
             ,desiredResponseType: d
             ,withCredentials: e};
   });
   var multipart = $Native$Http.multipart;
   var FileData = F3(function (a,b,c) {
      return {ctor: "FileData",_0: a,_1: b,_2: c};
   });
   var BlobData = F3(function (a,b,c) {
      return {ctor: "BlobData",_0: a,_1: b,_2: c};
   });
   var blobData = BlobData;
   var StringData = F2(function (a,b) {
      return {ctor: "StringData",_0: a,_1: b};
   });
   var stringData = StringData;
   var BodyBlob = function (a) {
      return {ctor: "BodyBlob",_0: a};
   };
   var BodyFormData = {ctor: "BodyFormData"};
   var ArrayBuffer = {ctor: "ArrayBuffer"};
   var BodyString = function (a) {
      return {ctor: "BodyString",_0: a};
   };
   var string = BodyString;
   var Empty = {ctor: "Empty"};
   var empty = Empty;
   var getString = function (url) {
      var request = {verb: "GET"
                    ,headers: _U.list([])
                    ,url: url
                    ,body: empty};
      return A2($Task.andThen,
      A2($Task.mapError,
      promoteError,
      A2(send,defaultSettings,request)),
      handleResponse($Task.succeed));
   };
   var get = F2(function (decoder,url) {
      var request = {verb: "GET"
                    ,headers: _U.list([])
                    ,url: url
                    ,body: empty};
      return A2(fromJson,decoder,A2(send,defaultSettings,request));
   });
   var Request = F4(function (a,b,c,d) {
      return {verb: a,headers: b,url: c,body: d};
   });
   var uriDecode = $Native$Http.uriDecode;
   var uriEncode = $Native$Http.uriEncode;
   var queryEscape = function (string) {
      return A2($String.join,
      "+",
      A2($String.split,"%20",uriEncode(string)));
   };
   var queryPair = function (_p3) {
      var _p4 = _p3;
      return A2($Basics._op["++"],
      queryEscape(_p4._0),
      A2($Basics._op["++"],"=",queryEscape(_p4._1)));
   };
   var url = F2(function (baseUrl,args) {
      var _p5 = args;
      if (_p5.ctor === "[]") {
            return baseUrl;
         } else {
            return A2($Basics._op["++"],
            baseUrl,
            A2($Basics._op["++"],
            "?",
            A2($String.join,"&",A2($List.map,queryPair,args))));
         }
   });
   var TODO_implement_file_in_another_library = {ctor: "TODO_implement_file_in_another_library"};
   var TODO_implement_blob_in_another_library = {ctor: "TODO_implement_blob_in_another_library"};
   return _elm.Http.values = {_op: _op
                             ,getString: getString
                             ,get: get
                             ,post: post
                             ,send: send
                             ,url: url
                             ,uriEncode: uriEncode
                             ,uriDecode: uriDecode
                             ,empty: empty
                             ,string: string
                             ,multipart: multipart
                             ,stringData: stringData
                             ,defaultSettings: defaultSettings
                             ,fromJson: fromJson
                             ,Request: Request
                             ,Settings: Settings
                             ,Response: Response
                             ,Text: Text
                             ,Blob: Blob
                             ,Timeout: Timeout
                             ,NetworkError: NetworkError
                             ,UnexpectedPayload: UnexpectedPayload
                             ,BadResponse: BadResponse
                             ,RawTimeout: RawTimeout
                             ,RawNetworkError: RawNetworkError};
};
Elm.Hop = Elm.Hop || {};
Elm.Hop.Location = Elm.Hop.Location || {};
Elm.Hop.Location.make = function (_elm) {
   "use strict";
   _elm.Hop = _elm.Hop || {};
   _elm.Hop.Location = _elm.Hop.Location || {};
   if (_elm.Hop.Location.values) return _elm.Hop.Location.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Dict = Elm.Dict.make(_elm),
   $Hop$Types = Elm.Hop.Types.make(_elm),
   $Http = Elm.Http.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $String = Elm.String.make(_elm);
   var _op = {};
   var clearQuery = function (location) {
      return _U.update(location,{query: $Dict.empty});
   };
   var removeQuery = F2(function (key,location) {
      var updatedQuery = A2($Dict.remove,key,location.query);
      return _U.update(location,{query: updatedQuery});
   });
   var setQuery = F2(function (query,location) {
      return _U.update(location,{query: query});
   });
   var addQuery = F2(function (query,location) {
      var updatedQuery = A2($Dict.union,query,location.query);
      return _U.update(location,{query: updatedQuery});
   });
   var queryKVtoTuple = function (kv) {
      var splitted = A2($String.split,"=",kv);
      var first = A2($Maybe.withDefault,"",$List.head(splitted));
      var firstDecoded = $Http.uriDecode(first);
      var second = A2($Maybe.withDefault,
      "",
      $List.head(A2($List.drop,1,splitted)));
      var secondDecoded = $Http.uriDecode(second);
      return {ctor: "_Tuple2",_0: firstDecoded,_1: secondDecoded};
   };
   var extractQuery = function (route) {
      return A2($Maybe.withDefault,
      "",
      $List.head(A2($List.drop,1,A2($String.split,"?",route))));
   };
   var parseQuery = function (route) {
      return $Dict.fromList(A2($List.map,
      queryKVtoTuple,
      A2($List.filter,
      function (_p0) {
         return $Basics.not($String.isEmpty(_p0));
      },
      A2($String.split,"&",extractQuery(route)))));
   };
   var extractPath = function (route) {
      return A2($Maybe.withDefault,
      "",
      $List.head(A2($String.split,
      "?",
      A2($Maybe.withDefault,
      "",
      $List.head($List.reverse(A2($String.split,"#",route)))))));
   };
   var parsePath = function (route) {
      return A2($List.filter,
      function (segment) {
         return $Basics.not($String.isEmpty(segment));
      },
      A2($String.split,"/",extractPath(route)));
   };
   var parse = function (route) {
      return {path: parsePath(route),query: parseQuery(route)};
   };
   var queryFromLocation = function (location) {
      return $Dict.isEmpty(location.query) ? "" : A2($String.append,
      "?",
      A2($String.join,
      "&",
      A2($List.map,
      function (_p1) {
         var _p2 = _p1;
         return A2($Basics._op["++"],
         _p2._0,
         A2($Basics._op["++"],"=",_p2._1));
      },
      $Dict.toList(location.query))));
   };
   var locationFromUser = function (route) {
      var normalized = A2($String.startsWith,
      "#",
      route) ? route : A2($Basics._op["++"],"#",route);
      return parse(normalized);
   };
   var locationToFullPath = function (location) {
      var path$ = A2($String.join,"/",location.path);
      return A2($Basics._op["++"],
      "#/",
      A2($Basics._op["++"],path$,queryFromLocation(location)));
   };
   return _elm.Hop.Location.values = {_op: _op
                                     ,locationToFullPath: locationToFullPath
                                     ,locationFromUser: locationFromUser
                                     ,queryFromLocation: queryFromLocation
                                     ,parse: parse
                                     ,extractPath: extractPath
                                     ,parsePath: parsePath
                                     ,extractQuery: extractQuery
                                     ,parseQuery: parseQuery
                                     ,queryKVtoTuple: queryKVtoTuple
                                     ,addQuery: addQuery
                                     ,setQuery: setQuery
                                     ,removeQuery: removeQuery
                                     ,clearQuery: clearQuery};
};
Elm.Hop = Elm.Hop || {};
Elm.Hop.Matchers = Elm.Hop.Matchers || {};
Elm.Hop.Matchers.make = function (_elm) {
   "use strict";
   _elm.Hop = _elm.Hop || {};
   _elm.Hop.Matchers = _elm.Hop.Matchers || {};
   if (_elm.Hop.Matchers.values) return _elm.Hop.Matchers.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Combine = Elm.Combine.make(_elm),
   $Combine$Infix = Elm.Combine.Infix.make(_elm),
   $Combine$Num = Elm.Combine.Num.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Hop$Location = Elm.Hop.Location.make(_elm),
   $Hop$Types = Elm.Hop.Types.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $String = Elm.String.make(_elm);
   var _op = {};
   var matcherToPath = F2(function (matcher,inputs) {
      var makeSegment = F2(function (segment,input) {
         return A2($Basics._op["++"],segment,input);
      });
      var inputs$ = A2($List.append,inputs,_U.list([""]));
      return A2($String.join,
      "",
      A3($List.map2,makeSegment,matcher.segments,inputs$));
   });
   var matchPath = F3(function (routeParsers,notFoundAction,path) {
      matchPath: while (true) {
         var _p0 = routeParsers;
         if (_p0.ctor === "[]") {
               return notFoundAction;
            } else {
               if (_p0._1.ctor === "[]") {
                     var _p1 = A2($Combine.parse,_p0._0.parser,path);
                     if (_p1._0.ctor === "Ok") {
                           return _p1._0._0;
                        } else {
                           return notFoundAction;
                        }
                  } else {
                     var _p2 = A2($Combine.parse,_p0._0.parser,path);
                     if (_p2._0.ctor === "Ok") {
                           return _p2._0._0;
                        } else {
                           var _v3 = _p0._1,_v4 = notFoundAction,_v5 = path;
                           routeParsers = _v3;
                           notFoundAction = _v4;
                           path = _v5;
                           continue matchPath;
                        }
                  }
            }
      }
   });
   var matchLocation = F3(function (routeParsers,
   notFoundAction,
   pathWithQuery) {
      var location = $Hop$Location.parse(pathWithQuery);
      var path = A2($Basics._op["++"],
      "/",
      A2($String.join,"/",location.path));
      var matchedAction = A3(matchPath,
      routeParsers,
      notFoundAction,
      path);
      return {ctor: "_Tuple2",_0: matchedAction,_1: location};
   });
   var str = $Combine.regex("[^/]+");
   var $int = $Combine$Num.$int;
   var parserWithBeginningAndEnd = function (parser) {
      return A2($Combine$Infix._op["<*"],parser,$Combine.end);
   };
   var match1 = F2(function (constructor,segment1) {
      var constructor$ = function (_p3) {
         var _p4 = _p3;
         return constructor;
      };
      var parser = A2($Combine.map,
      constructor$,
      parserWithBeginningAndEnd($Combine.skip($Combine.string(segment1))));
      return {parser: parser,segments: _U.list([segment1])};
   });
   var match2 = F3(function (constructor,segment1,parser1) {
      var parser = A2($Combine.map,
      constructor,
      parserWithBeginningAndEnd(A2($Combine$Infix._op["*>"],
      $Combine.string(segment1),
      parser1)));
      return {parser: parser,segments: _U.list([segment1])};
   });
   var match3 = F4(function (constructor,
   segment1,
   parser1,
   segment2) {
      var parser = A2($Combine.map,
      constructor,
      parserWithBeginningAndEnd(A2($Combine$Infix._op["<*"],
      A2($Combine$Infix._op["*>"],$Combine.string(segment1),parser1),
      $Combine.string(segment2))));
      return {parser: parser,segments: _U.list([segment1,segment2])};
   });
   var match4 = F5(function (constructor,
   segment1,
   parser1,
   segment2,
   parser2) {
      var constructor$ = function (_p5) {
         var _p6 = _p5;
         return A2(constructor,_p6._0,_p6._1);
      };
      var parser = A2($Combine.map,
      constructor$,
      parserWithBeginningAndEnd(A2($Combine.andThen,
      A2($Combine$Infix._op["*>"],$Combine.string(segment1),parser1),
      function (r) {
         return A2($Combine.map,
         function (x) {
            return {ctor: "_Tuple2",_0: r,_1: x};
         },
         A2($Combine$Infix._op["*>"],$Combine.string(segment2),parser2));
      })));
      return {parser: parser,segments: _U.list([segment1,segment2])};
   });
   var nested1 = F3(function (constructor,segment1,children) {
      var childrenParsers = A2($List.map,
      function (_) {
         return _.parser;
      },
      children);
      var parser = A2($Combine.map,
      constructor,
      parserWithBeginningAndEnd(A2($Combine.andThen,
      $Combine.string(segment1),
      function (x) {
         return $Combine.choice(childrenParsers);
      })));
      return {parser: parser,segments: _U.list([segment1])};
   });
   var nested2 = F4(function (constructor,
   segment1,
   parser1,
   children) {
      var constructor$ = function (_p7) {
         var _p8 = _p7;
         return A2(constructor,_p8._0,_p8._1);
      };
      var childrenParsers = A2($List.map,
      function (_) {
         return _.parser;
      },
      children);
      var parser = A2($Combine.map,
      constructor$,
      parserWithBeginningAndEnd(A2($Combine.andThen,
      A2($Combine$Infix._op["*>"],$Combine.string(segment1),parser1),
      function (r) {
         return A2($Combine.map,
         function (x) {
            return {ctor: "_Tuple2",_0: r,_1: x};
         },
         $Combine.choice(childrenParsers));
      })));
      return {parser: parser,segments: _U.list([segment1])};
   });
   return _elm.Hop.Matchers.values = {_op: _op
                                     ,match1: match1
                                     ,match2: match2
                                     ,match3: match3
                                     ,match4: match4
                                     ,nested1: nested1
                                     ,nested2: nested2
                                     ,$int: $int
                                     ,str: str
                                     ,matchPath: matchPath
                                     ,matchLocation: matchLocation
                                     ,matcherToPath: matcherToPath};
};
Elm.Hop = Elm.Hop || {};
Elm.Hop.make = function (_elm) {
   "use strict";
   _elm.Hop = _elm.Hop || {};
   if (_elm.Hop.values) return _elm.Hop.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $History = Elm.History.make(_elm),
   $Hop$Matchers = Elm.Hop.Matchers.make(_elm),
   $Hop$Types = Elm.Hop.Types.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   var routeTagAndQuerySignal = function (config) {
      var resolve = function (location) {
         return A3($Hop$Matchers.matchLocation,
         config.matchers,
         config.notFound,
         location);
      };
      return A2($Signal.map,resolve,$History.hash);
   };
   var $new = function (config) {
      return {run: $History.setPath("")
             ,signal: routeTagAndQuerySignal(config)};
   };
   return _elm.Hop.values = {_op: _op,$new: $new};
};
Elm.Hop = Elm.Hop || {};
Elm.Hop.Navigate = Elm.Hop.Navigate || {};
Elm.Hop.Navigate.make = function (_elm) {
   "use strict";
   _elm.Hop = _elm.Hop || {};
   _elm.Hop.Navigate = _elm.Hop.Navigate || {};
   if (_elm.Hop.Navigate.values) return _elm.Hop.Navigate.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Effects = Elm.Effects.make(_elm),
   $History = Elm.History.make(_elm),
   $Hop$Location = Elm.Hop.Location.make(_elm),
   $Hop$Types = Elm.Hop.Types.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   var navigateToLocation = function (location) {
      return $Effects.task($History.setPath($Hop$Location.locationToFullPath(location)));
   };
   var addQuery = F2(function (query,currentLocation) {
      return navigateToLocation(A2($Hop$Location.addQuery,
      query,
      currentLocation));
   });
   var setQuery = F2(function (query,currentLocation) {
      return navigateToLocation(A2($Hop$Location.setQuery,
      query,
      currentLocation));
   });
   var removeQuery = F2(function (key,currentLocation) {
      return navigateToLocation(A2($Hop$Location.removeQuery,
      key,
      currentLocation));
   });
   var clearQuery = function (currentLocation) {
      return navigateToLocation($Hop$Location.clearQuery(currentLocation));
   };
   var navigateTo = function (route) {
      return navigateToLocation($Hop$Location.locationFromUser(route));
   };
   return _elm.Hop.Navigate.values = {_op: _op
                                     ,navigateTo: navigateTo
                                     ,addQuery: addQuery
                                     ,setQuery: setQuery
                                     ,removeQuery: removeQuery
                                     ,clearQuery: clearQuery};
};
Elm.Native = Elm.Native || {};
Elm.Native.Window = {};
Elm.Native.Window.make = function make(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Window = localRuntime.Native.Window || {};
	if (localRuntime.Native.Window.values)
	{
		return localRuntime.Native.Window.values;
	}

	var NS = Elm.Native.Signal.make(localRuntime);
	var Tuple2 = Elm.Native.Utils.make(localRuntime).Tuple2;


	function getWidth()
	{
		return localRuntime.node.clientWidth;
	}


	function getHeight()
	{
		if (localRuntime.isFullscreen())
		{
			return window.innerHeight;
		}
		return localRuntime.node.clientHeight;
	}


	var dimensions = NS.input('Window.dimensions', Tuple2(getWidth(), getHeight()));


	function resizeIfNeeded()
	{
		// Do not trigger event if the dimensions have not changed.
		// This should be most of the time.
		var w = getWidth();
		var h = getHeight();
		if (dimensions.value._0 === w && dimensions.value._1 === h)
		{
			return;
		}

		setTimeout(function() {
			// Check again to see if the dimensions have changed.
			// It is conceivable that the dimensions have changed
			// again while some other event was being processed.
			w = getWidth();
			h = getHeight();
			if (dimensions.value._0 === w && dimensions.value._1 === h)
			{
				return;
			}
			localRuntime.notify(dimensions.id, Tuple2(w, h));
		}, 0);
	}


	localRuntime.addListener([dimensions.id], window, 'resize', resizeIfNeeded);


	return localRuntime.Native.Window.values = {
		dimensions: dimensions,
		resizeIfNeeded: resizeIfNeeded
	};
};

Elm.Window = Elm.Window || {};
Elm.Window.make = function (_elm) {
   "use strict";
   _elm.Window = _elm.Window || {};
   if (_elm.Window.values) return _elm.Window.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Native$Window = Elm.Native.Window.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var _op = {};
   var dimensions = $Native$Window.dimensions;
   var width = A2($Signal.map,$Basics.fst,dimensions);
   var height = A2($Signal.map,$Basics.snd,dimensions);
   return _elm.Window.values = {_op: _op
                               ,dimensions: dimensions
                               ,width: width
                               ,height: height};
};
Elm.Material = Elm.Material || {};
Elm.Material.Layout = Elm.Material.Layout || {};
Elm.Material.Layout.make = function (_elm) {
   "use strict";
   _elm.Material = _elm.Material || {};
   _elm.Material.Layout = _elm.Material.Layout || {};
   if (_elm.Material.Layout.values)
   return _elm.Material.Layout.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Array = Elm.Array.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $DOM = Elm.DOM.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Effects = Elm.Effects.make(_elm),
   $Html = Elm.Html.make(_elm),
   $Html$Attributes = Elm.Html.Attributes.make(_elm),
   $Html$Events = Elm.Html.Events.make(_elm),
   $List = Elm.List.make(_elm),
   $Material$Helpers = Elm.Material.Helpers.make(_elm),
   $Material$Icon = Elm.Material.Icon.make(_elm),
   $Material$Ripple = Elm.Material.Ripple.make(_elm),
   $Material$Style = Elm.Material.Style.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $Window = Elm.Window.make(_elm);
   var _op = {};
   var Contents = F4(function (a,b,c,d) {
      return {header: a,drawer: b,tabs: c,main: d};
   });
   var drawerView = F3(function (addr,model,elems) {
      return A2($Html.div,
      _U.list([$Html$Attributes.classList(_U.list([{ctor: "_Tuple2"
                                                   ,_0: "mdl-layout__drawer"
                                                   ,_1: true}
                                                  ,{ctor: "_Tuple2",_0: "is-visible",_1: model.isDrawerOpen}]))]),
      elems);
   });
   var toList = function (x) {
      var _p0 = x;
      if (_p0.ctor === "Nothing") {
            return _U.list([]);
         } else {
            return _U.list([_p0._0]);
         }
   };
   var isWaterfall = function (mode) {
      var _p1 = mode;
      if (_p1.ctor === "Waterfall") {
            return true;
         } else {
            return false;
         }
   };
   var Waterfall = function (a) {
      return {ctor: "Waterfall",_0: a};
   };
   var Scroll = {ctor: "Scroll"};
   var Seamed = {ctor: "Seamed"};
   var Standard = {ctor: "Standard"};
   var row = function (styles) {
      return $Material$Style.div(A2($List._op["::"],
      $Material$Style.cs("mdl-layout__header-row"),
      styles));
   };
   var link = F2(function (styles,contents) {
      return A3($Material$Style.styled,
      $Html.a,
      A2($List._op["::"],
      $Material$Style.cs("mdl-navigation__link"),
      styles),
      contents);
   });
   var navigation = F2(function (styles,contents) {
      return A2($Html.nav,
      _U.list([$Html$Attributes.$class("mdl-navigation")]),
      contents);
   });
   var title = function (styles) {
      return $Material$Style.span(A2($List._op["::"],
      $Material$Style.cs("mdl-layout__title"),
      styles));
   };
   var spacer = A2($Html.div,
   _U.list([$Html$Attributes.$class("mdl-layout-spacer")]),
   _U.list([]));
   var Ripple = F2(function (a,b) {
      return {ctor: "Ripple",_0: a,_1: b};
   });
   var TransitionEnd = {ctor: "TransitionEnd"};
   var TransitionHeader = function (a) {
      return {ctor: "TransitionHeader",_0: a};
   };
   var ScrollTab = function (a) {
      return {ctor: "ScrollTab",_0: a};
   };
   var SmallScreen = function (a) {
      return {ctor: "SmallScreen",_0: a};
   };
   var ToggleDrawer = {ctor: "ToggleDrawer"};
   var drawerButton = function (addr) {
      return A2($Html.div,
      _U.list([$Html$Attributes.$class("mdl-layout__drawer-button")
              ,A2($Html$Events.onClick,addr,ToggleDrawer)]),
      _U.list([$Material$Icon.i("menu")]));
   };
   var obfuscator = F2(function (addr,model) {
      return A2($Html.div,
      _U.list([$Html$Attributes.classList(_U.list([{ctor: "_Tuple2"
                                                   ,_0: "mdl-layout__obfuscator"
                                                   ,_1: true}
                                                  ,{ctor: "_Tuple2",_0: "is-visible",_1: model.isDrawerOpen}]))
              ,A2($Html$Events.onClick,addr,ToggleDrawer)]),
      _U.list([]));
   });
   var SwitchTab = function (a) {
      return {ctor: "SwitchTab",_0: a};
   };
   var Model = F8(function (a,b,c,d,e,f,g,h) {
      return {selectedTab: a
             ,isDrawerOpen: b
             ,fixedHeader: c
             ,fixedDrawer: d
             ,fixedTabs: e
             ,rippleTabs: f
             ,mode: g
             ,state: h};
   });
   var s = function (model) {
      var _p2 = model.state;
      return _p2._0;
   };
   var tabsView = F3(function (addr,model,_p3) {
      var _p4 = _p3;
      var chevron = F2(function (direction,offset) {
         return A2($Html.div,
         _U.list([$Html$Attributes.classList(_U.list([{ctor: "_Tuple2"
                                                      ,_0: "mdl-layout__tab-bar-button"
                                                      ,_1: true}
                                                     ,{ctor: "_Tuple2"
                                                      ,_0: A2($Basics._op["++"],
                                                      "mdl-layout__tab-bar-",
                                                      A2($Basics._op["++"],direction,"-button"))
                                                      ,_1: true}]))]),
         _U.list([A2($Material$Icon.view,
         A2($Basics._op["++"],"chevron_",direction),
         _U.list([$Material$Icon.size24
                 ,$Material$Style.attribute(A2($Html$Events.onClick,
                 addr,
                 ScrollTab(offset)))]))]));
      });
      return A2($Material$Style.div,
      A2($List._op["::"],
      $Material$Style.cs("mdl-layout__tab-bar-container"),
      _U.list([])),
      _U.list([A2(chevron,"left",-100)
              ,A2($Material$Style.div,
              A2($List._op["::"],
              $Material$Style.cs("mdl-layout__tab-bar"),
              A2($List._op["::"],
              A2($Material$Style.cs$,"mdl-js-ripple-effect",model.rippleTabs),
              A2($List._op["::"],
              A2($Material$Style.cs$,
              "mds-js-ripple-effect--ignore-events",
              model.rippleTabs),
              A2($List._op["::"],
              A2($Material$Style.cs$,
              "is-casting-shadow",
              _U.eq(model.mode,Standard)),
              _p4._1)))),
              A2($List.indexedMap,
              F2(function (tabIndex,tab) {
                 return A3($Material$Helpers.filter,
                 $Html.a,
                 _U.list([$Html$Attributes.classList(_U.list([{ctor: "_Tuple2"
                                                              ,_0: "mdl-layout__tab"
                                                              ,_1: true}
                                                             ,{ctor: "_Tuple2"
                                                              ,_0: "is-active"
                                                              ,_1: _U.eq(tabIndex,model.selectedTab)}]))
                         ,A2($Html$Events.onClick,addr,SwitchTab(tabIndex))]),
                 _U.list([$Maybe.Just(tab)
                         ,model.rippleTabs ? A2($Maybe.map,
                         A2($Material$Ripple.view,
                         A2($Signal.forwardTo,addr,Ripple(tabIndex)),
                         _U.list([$Html$Attributes.$class("mdl-layout__tab-ripple-container")])),
                         A2($Array.get,tabIndex,s(model).tabs)) : $Maybe.Nothing]));
              }),
              _p4._0))
              ,A2(chevron,"right",100)]));
   });
   var headerView = F3(function (addr,model,_p5) {
      var _p6 = _p5;
      var mode = function () {
         var _p7 = model.mode;
         switch (_p7.ctor)
         {case "Standard": return "";
            case "Scroll": return "mdl-layout__header--scroll";
            case "Seamed": return "mdl-layout__header--seamed";
            default: if (_p7._0 === true) {
                    return "mdl-layout__header--waterfall mdl-layout__header--waterfall-hide-top";
                 } else {
                    return "mdl-layout__header--waterfall";
                 }}
      }();
      return A2($Html.header,
      A2($List.append,
      isWaterfall(model.mode) ? _U.list([A2($Html$Events.onClick,
      addr,
      TransitionHeader(false))]) : _U.list([]),
      _U.list([$Html$Attributes.classList(_U.list([{ctor: "_Tuple2"
                                                   ,_0: "mdl-layout__header"
                                                   ,_1: true}
                                                  ,{ctor: "_Tuple2"
                                                   ,_0: "is-casting-shadow"
                                                   ,_1: _U.eq(model.mode,
                                                   Standard) || isWaterfall(model.mode) && s(model).isCompact}
                                                  ,{ctor: "_Tuple2",_0: "is-animating",_1: s(model).isAnimating}
                                                  ,{ctor: "_Tuple2",_0: "is-compact",_1: s(model).isCompact}
                                                  ,{ctor: "_Tuple2",_0: mode,_1: !_U.eq(mode,"")}]))])),
      A2($List.concatMap,
      function (x) {
         return x;
      },
      _U.list([toList(_p6._0),_p6._1,toList(_p6._2)])));
   });
   var S = function (a) {    return {ctor: "S",_0: a};};
   var initState = function (no_tabs) {
      return S({tabs: A2($Array.repeat,
               no_tabs,
               $Material$Ripple.model)
               ,isSmallScreen: false
               ,isCompact: false
               ,isAnimating: false});
   };
   var defaultLayoutModel = {selectedTab: 0
                            ,isDrawerOpen: false
                            ,fixedHeader: true
                            ,fixedDrawer: false
                            ,fixedTabs: false
                            ,rippleTabs: true
                            ,mode: Standard
                            ,state: initState(0)};
   var update = F2(function (action,model) {
      var _p8 = model.state;
      var state = _p8._0;
      var _p9 = action;
      switch (_p9.ctor)
      {case "SmallScreen": var _p10 = _p9._0;
           return $Material$Helpers.pure(_U.update(model,
           {state: S(_U.update(state,{isSmallScreen: _p10}))
           ,isDrawerOpen: $Basics.not(_p10) && model.isDrawerOpen}));
         case "SwitchTab": return $Material$Helpers.pure(_U.update(model,
           {selectedTab: _p9._0}));
         case "ToggleDrawer":
         return $Material$Helpers.pure(_U.update(model,
           {isDrawerOpen: $Basics.not(model.isDrawerOpen)}));
         case "Ripple": var _p14 = _p9._0;
           var _p11 = A2($Maybe.withDefault,
           $Material$Helpers.pure(state),
           A2($Maybe.map,
           function (_p12) {
              var _p13 = _p12;
              return {ctor: "_Tuple2"
                     ,_0: _U.update(state,
                     {tabs: A3($Array.set,_p14,_p13._0,s(model).tabs)})
                     ,_1: A2($Effects.map,Ripple(_p14),_p13._1)};
           },
           A2($Maybe.map,
           $Material$Ripple.update(_p9._1),
           A2($Array.get,_p14,s(model).tabs))));
           var state$ = _p11._0;
           var effect = _p11._1;
           return {ctor: "_Tuple2"
                  ,_0: _U.update(model,{state: S(state$)})
                  ,_1: effect};
         case "ScrollTab": return {ctor: "_Tuple2"
                                  ,_0: model
                                  ,_1: $Effects.none};
         case "TransitionHeader":
         var headerVisible = $Basics.not(state.isSmallScreen) || model.fixedHeader;
           var state$ = _U.update(state,
           {isCompact: _p9._0,isAnimating: headerVisible});
           return $Basics.not(state.isAnimating) ? {ctor: "_Tuple2"
                                                   ,_0: _U.update(model,{state: S(state$)})
                                                   ,_1: A2($Material$Helpers.delay,
                                                   200,
                                                   TransitionEnd)} : {ctor: "_Tuple2",_0: model,_1: $Effects.none};
         default: return {ctor: "_Tuple2"
                         ,_0: _U.update(model,
                         {state: S(_U.update(state,{isAnimating: false}))})
                         ,_1: $Effects.none};}
   });
   var State$ = F4(function (a,b,c,d) {
      return {tabs: a
             ,isSmallScreen: b
             ,isCompact: c
             ,isAnimating: d};
   });
   var scrollMailbox = $Signal.mailbox(0.0);
   var setupSignals = function (f) {
      return $Signal.mergeMany(_U.list([A2($Signal.map,
                                       function (_p15) {
                                          return f(SmallScreen(_p15));
                                       },
                                       $Signal.dropRepeats(A2($Signal.map,
                                       F2(function (x,y) {    return _U.cmp(x,y) > 0;})(1024),
                                       $Window.width)))
                                       ,A2($Signal.map,
                                       function (_p16) {
                                          return f(TransitionHeader(_p16));
                                       },
                                       $Signal.dropRepeats(A2($Signal.map,
                                       F2(function (x,y) {    return _U.cmp(x,y) < 0;})(0.0),
                                       scrollMailbox.signal)))]));
   };
   var view = F3(function (addr,model,_p17) {
      var _p18 = _p17;
      var _p23 = _p18.tabs;
      var _p22 = _p18.header;
      var _p21 = _p18.drawer;
      var hasTabs = $Basics.not($List.isEmpty($Basics.fst(_p23)));
      var hasHeader = hasTabs || $Basics.not($List.isEmpty(_p22));
      var tabsElems = $Basics.not(hasTabs) ? $Maybe.Nothing : $Maybe.Just(A3(tabsView,
      addr,
      model,
      _p23));
      var _p19 = function () {
         var _p20 = {ctor: "_Tuple3"
                    ,_0: _p21
                    ,_1: _p22
                    ,_2: model.fixedHeader};
         if (_p20.ctor === "_Tuple3" && _p20._0.ctor === "::") {
               if (_p20._1.ctor === "::" && _p20._2 === true) {
                     return {ctor: "_Tuple2"
                            ,_0: $Maybe.Nothing
                            ,_1: $Maybe.Just(drawerButton(addr))};
                  } else {
                     return {ctor: "_Tuple2"
                            ,_0: $Maybe.Just(drawerButton(addr))
                            ,_1: $Maybe.Nothing};
                  }
            } else {
               return {ctor: "_Tuple2"
                      ,_0: $Maybe.Nothing
                      ,_1: $Maybe.Nothing};
            }
      }();
      var contentDrawerButton = _p19._0;
      var headerDrawerButton = _p19._1;
      return A2($Html.div,
      _U.list([$Html$Attributes.classList(_U.list([{ctor: "_Tuple2"
                                                   ,_0: "mdl-layout__container"
                                                   ,_1: true}
                                                  ,{ctor: "_Tuple2"
                                                   ,_0: "has-scrolling-header"
                                                   ,_1: _U.eq(model.mode,Scroll)}]))]),
      _U.list([A3($Material$Helpers.filter,
      $Html.div,
      _U.list([$Html$Attributes.classList(_U.list([{ctor: "_Tuple2"
                                                   ,_0: "mdl-layout "
                                                   ,_1: true}
                                                  ,{ctor: "_Tuple2",_0: "is-upgraded",_1: true}
                                                  ,{ctor: "_Tuple2"
                                                   ,_0: "is-small-screen"
                                                   ,_1: s(model).isSmallScreen}
                                                  ,{ctor: "_Tuple2",_0: "has-drawer",_1: !_U.eq(_p21,_U.list([]))}
                                                  ,{ctor: "_Tuple2",_0: "has-tabs",_1: hasTabs}
                                                  ,{ctor: "_Tuple2",_0: "mdl-js-layout",_1: true}
                                                  ,{ctor: "_Tuple2"
                                                   ,_0: "mdl-layout--fixed-drawer"
                                                   ,_1: model.fixedDrawer && !_U.eq(_p21,_U.list([]))}
                                                  ,{ctor: "_Tuple2"
                                                   ,_0: "mdl-layout--fixed-header"
                                                   ,_1: model.fixedHeader && hasHeader}
                                                  ,{ctor: "_Tuple2"
                                                   ,_0: "mdl-layout--fixed-tabs"
                                                   ,_1: model.fixedTabs && hasTabs}]))]),
      _U.list([hasHeader ? $Maybe.Just(A3(headerView,
              addr,
              model,
              {ctor: "_Tuple3"
              ,_0: headerDrawerButton
              ,_1: _p22
              ,_2: tabsElems})) : $Maybe.Nothing
              ,$List.isEmpty(_p21) ? $Maybe.Nothing : $Maybe.Just(A2(obfuscator,
              addr,
              model))
              ,$List.isEmpty(_p21) ? $Maybe.Nothing : $Maybe.Just(A3(drawerView,
              addr,
              model,
              _p21))
              ,contentDrawerButton
              ,$Maybe.Just(A2($Html.main$,
              A2($List._op["::"],
              $Html$Attributes.$class("mdl-layout__content"),
              A2($List._op["::"],
              $Html$Attributes.key(A2($Basics._op["++"],
              "elm-mdl-layout-",
              $Basics.toString(model.selectedTab))),
              isWaterfall(model.mode) ? _U.list([A3($Html$Events.on,
              "scroll",
              $DOM.target($DOM.scrollTop),
              $Signal.message(scrollMailbox.address))]) : _U.list([]))),
              _p18.main))]))]));
   });
   return _elm.Material.Layout.values = {_op: _op
                                        ,setupSignals: setupSignals
                                        ,defaultLayoutModel: defaultLayoutModel
                                        ,initState: initState
                                        ,update: update
                                        ,row: row
                                        ,spacer: spacer
                                        ,title: title
                                        ,navigation: navigation
                                        ,link: link
                                        ,view: view
                                        ,Model: Model
                                        ,Contents: Contents
                                        ,Standard: Standard
                                        ,Seamed: Seamed
                                        ,Scroll: Scroll
                                        ,Waterfall: Waterfall
                                        ,SwitchTab: SwitchTab
                                        ,ToggleDrawer: ToggleDrawer};
};
Elm.Material = Elm.Material || {};
Elm.Material.Scheme = Elm.Material.Scheme || {};
Elm.Material.Scheme.make = function (_elm) {
   "use strict";
   _elm.Material = _elm.Material || {};
   _elm.Material.Scheme = _elm.Material.Scheme || {};
   if (_elm.Material.Scheme.values)
   return _elm.Material.Scheme.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Html = Elm.Html.make(_elm),
   $Html$Attributes = Elm.Html.Attributes.make(_elm),
   $List = Elm.List.make(_elm),
   $Material$Color = Elm.Material.Color.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $String = Elm.String.make(_elm);
   var _op = {};
   var scheme = F2(function (primary,accent) {
      return A2($String.join,
      "\n",
      A2($List.map,
      function (url) {
         return A2($Basics._op["++"],
         "@import url(",
         A2($Basics._op["++"],url,");"));
      },
      _U.list([A2($Basics._op["++"],
              "https://code.getmdl.io/1.1.3/",
              A2($Material$Color.scheme,primary,accent))
              ,"https://fonts.googleapis.com/icon?family=Material+Icons"
              ,"https://fonts.googleapis.com/css?family=Roboto:400,300,500|Roboto+Mono|Roboto+Condensed:400,700&subset=latin,latin-ext"])));
   });
   var topWithScheme = F3(function (primary,accent,content) {
      return A2($Html.div,
      _U.list([]),
      _U.list([A3($Html.node,
              "style",
              _U.list([$Html$Attributes.type$("text/css")]),
              _U.list([$Html.text(A2(scheme,primary,accent))]))
              ,content]));
   });
   var top = function (content) {
      return A3(topWithScheme,
      $Material$Color.Grey,
      $Material$Color.Grey,
      content);
   };
   return _elm.Material.Scheme.values = {_op: _op
                                        ,topWithScheme: topWithScheme
                                        ,top: top};
};
Elm.Main = Elm.Main || {};
Elm.Main.make = function (_elm) {
   "use strict";
   _elm.Main = _elm.Main || {};
   if (_elm.Main.values) return _elm.Main.values;
   var _U = Elm.Native.Utils.make(_elm),
   $Array = Elm.Array.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Demo$Badges = Elm.Demo.Badges.make(_elm),
   $Demo$Buttons = Elm.Demo.Buttons.make(_elm),
   $Demo$Elevation = Elm.Demo.Elevation.make(_elm),
   $Demo$Grid = Elm.Demo.Grid.make(_elm),
   $Demo$Menus = Elm.Demo.Menus.make(_elm),
   $Demo$Snackbar = Elm.Demo.Snackbar.make(_elm),
   $Demo$Textfields = Elm.Demo.Textfields.make(_elm),
   $Effects = Elm.Effects.make(_elm),
   $Hop = Elm.Hop.make(_elm),
   $Hop$Matchers = Elm.Hop.Matchers.make(_elm),
   $Hop$Navigate = Elm.Hop.Navigate.make(_elm),
   $Hop$Types = Elm.Hop.Types.make(_elm),
   $Html = Elm.Html.make(_elm),
   $Html$Attributes = Elm.Html.Attributes.make(_elm),
   $List = Elm.List.make(_elm),
   $Material$Color = Elm.Material.Color.make(_elm),
   $Material$Helpers = Elm.Material.Helpers.make(_elm),
   $Material$Layout = Elm.Material.Layout.make(_elm),
   $Material$Scheme = Elm.Material.Scheme.make(_elm),
   $Material$Style = Elm.Material.Style.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $StartApp = Elm.StartApp.make(_elm),
   $Task = Elm.Task.make(_elm);
   var _op = {};
   var setTab = F2(function (layout,route) {
      var idx = function () {
         var _p0 = route;
         if (_p0.ctor === "Tab") {
               return _p0._0;
            } else {
               return -1;
            }
      }();
      return _U.update(layout,{selectedTab: idx});
   });
   var stylesheet = $Material$Style.stylesheet("\n  blockquote:before { content: none; }\n  blockquote:after { content: none; }\n  blockquote {\n    border-left-style: solid;\n    border-width: 1px;\n    padding-left: 1.3ex;\n    border-color: rgb(255,82,82);\n    font-style: normal;\n      /* TODO: Really need a way to specify \"secondary color\" in\n         inline css.\n       */\n  }\n  p, blockquote { \n    max-width: 40em;\n  }\n\n  h1, h2 { \n    /* TODO. Need typography module with kerning. */\n    margin-left: -3px;\n  }\n");
   var e404 = F2(function (_p2,_p1) {
      return A2($Html.div,
      _U.list([]),
      _U.list([A3($Material$Style.styled,
      $Html.h1,
      _U.list([$Material$Style.cs("mdl-typography--display-4")
              ,$Material$Color.background($Material$Color.primary)]),
      _U.list([$Html.text("404")]))]));
   });
   var header = _U.list([A2($Material$Layout.row,
   _U.list([]),
   _U.list([A2($Material$Layout.title,
           _U.list([]),
           _U.list([$Html.text("elm-mdl")]))
           ,$Material$Layout.spacer
           ,A2($Material$Layout.navigation,
           _U.list([]),
           _U.list([A2($Material$Layout.link,
                   _U.list([$Material$Style.attribute($Html$Attributes.href("https://github.com/debois/elm-mdl"))]),
                   _U.list([A2($Html.span,
                   _U.list([]),
                   _U.list([$Html.text("github")]))]))
                   ,A2($Material$Layout.link,
                   _U.list([$Material$Style.attribute($Html$Attributes.href("http://package.elm-lang.org/packages/debois/elm-mdl/latest/"))]),
                   _U.list([$Html.text("elm-package")]))]))]))]);
   var drawer = _U.list([A2($Material$Layout.title,
                        _U.list([]),
                        _U.list([$Html.text("Example drawer")]))
                        ,A2($Material$Layout.navigation,
                        _U.list([]),
                        _U.list([A2($Material$Layout.link,
                                _U.list([$Material$Style.attribute($Html$Attributes.href("https://github.com/debois/elm-mdl"))]),
                                _U.list([$Html.text("github")]))
                                ,A2($Material$Layout.link,
                                _U.list([$Material$Style.attribute($Html$Attributes.href("http://package.elm-lang.org/packages/debois/elm-mdl/latest/"))]),
                                _U.list([$Html.text("elm-package")]))]))]);
   var nth = F2(function (k,xs) {
      return $List.head(A2($List.drop,k,xs));
   });
   var SnackbarAction = function (a) {
      return {ctor: "SnackbarAction",_0: a};
   };
   var TextfieldAction = function (a) {
      return {ctor: "TextfieldAction",_0: a};
   };
   var MenusAction = function (a) {
      return {ctor: "MenusAction",_0: a};
   };
   var ButtonsAction = function (a) {
      return {ctor: "ButtonsAction",_0: a};
   };
   var tabs = _U.list([{ctor: "_Tuple3"
                       ,_0: "Buttons"
                       ,_1: "buttons"
                       ,_2: F2(function (addr,model) {
                          return A2($Demo$Buttons.view,
                          A2($Signal.forwardTo,addr,ButtonsAction),
                          model.buttons);
                       })}
                      ,{ctor: "_Tuple3"
                       ,_0: "Menus"
                       ,_1: "menus"
                       ,_2: F2(function (addr,model) {
                          return A2($Demo$Menus.view,
                          A2($Signal.forwardTo,addr,MenusAction),
                          model.menus);
                       })}
                      ,{ctor: "_Tuple3"
                       ,_0: "Badges"
                       ,_1: "badges"
                       ,_2: F2(function (addr,model) {    return $Demo$Badges.view;})}
                      ,{ctor: "_Tuple3"
                       ,_0: "Elevation"
                       ,_1: "elevation"
                       ,_2: F2(function (addr,model) {
                          return $Demo$Elevation.view;
                       })}
                      ,{ctor: "_Tuple3"
                       ,_0: "Grid"
                       ,_1: "grid"
                       ,_2: F2(function (addr,model) {    return $Demo$Grid.view;})}
                      ,{ctor: "_Tuple3"
                       ,_0: "Snackbar"
                       ,_1: "snackbar"
                       ,_2: F2(function (addr,model) {
                          return A2($Demo$Snackbar.view,
                          A2($Signal.forwardTo,addr,SnackbarAction),
                          model.snackbar);
                       })}
                      ,{ctor: "_Tuple3"
                       ,_0: "Textfields"
                       ,_1: "textfields"
                       ,_2: F2(function (addr,model) {
                          return A2($Demo$Textfields.view,
                          A2($Signal.forwardTo,addr,TextfieldAction),
                          model.textfields);
                       })}]);
   var tabViews = $Array.fromList(A2($List.map,
   function (_p3) {
      var _p4 = _p3;
      return _p4._2;
   },
   tabs));
   var tabTitles = A2($List.map,
   function (_p5) {
      var _p6 = _p5;
      return $Html.text(_p6._0);
   },
   tabs);
   var LayoutAction = function (a) {
      return {ctor: "LayoutAction",_0: a};
   };
   var view = F2(function (addr,model) {
      var top = A2($Html.div,
      _U.list([$Html$Attributes.style(_U.list([{ctor: "_Tuple2"
                                               ,_0: "margin"
                                               ,_1: "auto"}
                                              ,{ctor: "_Tuple2",_0: "padding-left",_1: "8%"}
                                              ,{ctor: "_Tuple2",_0: "padding-right",_1: "8%"}]))
              ,$Html$Attributes.key($Basics.toString($Basics.fst(model.routing)))]),
      _U.list([A2(A2($Maybe.withDefault,
      e404,
      A2($Array.get,model.layout.selectedTab,tabViews)),
      addr,
      model)]));
      return A3($Material$Scheme.topWithScheme,
      $Material$Color.Teal,
      $Material$Color.Red,
      A3($Material$Layout.view,
      A2($Signal.forwardTo,addr,LayoutAction),
      model.layout,
      {header: header
      ,drawer: drawer
      ,tabs: {ctor: "_Tuple2"
             ,_0: tabTitles
             ,_1: _U.list([$Material$Color.background(A2($Material$Color.color,
             $Material$Color.Teal,
             $Material$Color.S400))])}
      ,main: _U.list([stylesheet,top])}));
   });
   var HopAction = function (a) {
      return {ctor: "HopAction",_0: a};
   };
   var update = F2(function (action,model) {
      var _p7 = action;
      switch (_p7.ctor)
      {case "LayoutAction": var _p12 = _p7._0;
           var routeFx = function () {
              var _p8 = _p12;
              if (_p8.ctor === "SwitchTab") {
                    return A2($Maybe.withDefault,
                    $Effects.none,
                    A2($Maybe.map,
                    function (_p9) {
                       var _p10 = _p9;
                       return A2($Effects.map,
                       HopAction,
                       $Hop$Navigate.navigateTo(_p10._1));
                    },
                    A2(nth,_p8._0,tabs)));
                 } else {
                    return $Effects.none;
                 }
           }();
           var _p11 = A6($Material$Helpers.lift,
           function (_) {
              return _.layout;
           },
           F2(function (m,x) {    return _U.update(m,{layout: x});}),
           LayoutAction,
           $Material$Layout.update,
           _p12,
           model);
           var lifted = _p11._0;
           var layoutFx = _p11._1;
           return {ctor: "_Tuple2"
                  ,_0: lifted
                  ,_1: $Effects.batch(_U.list([layoutFx,routeFx]))};
         case "ApplyRoute": var _p13 = _p7._0;
           return {ctor: "_Tuple2"
                  ,_0: _U.update(model,
                  {routing: _p13
                  ,layout: A2(setTab,model.layout,$Basics.fst(_p13))})
                  ,_1: $Effects.none};
         case "HopAction": return {ctor: "_Tuple2"
                                  ,_0: model
                                  ,_1: $Effects.none};
         case "ButtonsAction": return A6($Material$Helpers.lift,
           function (_) {
              return _.buttons;
           },
           F2(function (m,x) {    return _U.update(m,{buttons: x});}),
           ButtonsAction,
           $Demo$Buttons.update,
           _p7._0,
           model);
         case "MenusAction": return A6($Material$Helpers.lift,
           function (_) {
              return _.menus;
           },
           F2(function (m,x) {    return _U.update(m,{menus: x});}),
           MenusAction,
           $Demo$Menus.update,
           _p7._0,
           model);
         case "TextfieldAction": return A6($Material$Helpers.lift,
           function (_) {
              return _.textfields;
           },
           F2(function (m,x) {    return _U.update(m,{textfields: x});}),
           TextfieldAction,
           $Demo$Textfields.update,
           _p7._0,
           model);
         default: return A6($Material$Helpers.lift,
           function (_) {
              return _.snackbar;
           },
           F2(function (m,x) {    return _U.update(m,{snackbar: x});}),
           SnackbarAction,
           $Demo$Snackbar.update,
           _p7._0,
           model);}
   });
   var ApplyRoute = function (a) {
      return {ctor: "ApplyRoute",_0: a};
   };
   var Model = F6(function (a,b,c,d,e,f) {
      return {layout: a
             ,routing: b
             ,buttons: c
             ,menus: d
             ,textfields: e
             ,snackbar: f};
   });
   var layoutModel = _U.update($Material$Layout.defaultLayoutModel,
   {state: $Material$Layout.initState($List.length(tabs))
   ,mode: $Material$Layout.Waterfall(false)
   ,fixedHeader: true});
   var E404 = {ctor: "E404"};
   var Tab = function (a) {    return {ctor: "Tab",_0: a};};
   var route0 = {ctor: "_Tuple2"
                ,_0: Tab(0)
                ,_1: $Hop$Types.newLocation};
   var model = {layout: layoutModel
               ,routing: route0
               ,buttons: $Demo$Buttons.model
               ,menus: $Demo$Menus.model
               ,textfields: $Demo$Textfields.model
               ,snackbar: $Demo$Snackbar.model};
   var init = {ctor: "_Tuple2",_0: model,_1: $Effects.none};
   var router = $Hop.$new({notFound: E404
                          ,matchers: A2($List._op["::"],
                          A2($Hop$Matchers.match1,Tab(0),"/"),
                          A2($List.indexedMap,
                          F2(function (idx,_p14) {
                             var _p15 = _p14;
                             return A2($Hop$Matchers.match1,
                             Tab(idx),
                             A2($Basics._op["++"],"/",_p15._1));
                          }),
                          tabs))});
   var inputs = _U.list([$Material$Layout.setupSignals(LayoutAction)
                        ,A2($Signal.map,ApplyRoute,router.signal)]);
   var app = $StartApp.start({init: init
                             ,view: view
                             ,update: update
                             ,inputs: inputs});
   var main = app.html;
   var tasks = Elm.Native.Task.make(_elm).performSignal("tasks",
   app.tasks);
   var routeRunTask = Elm.Native.Task.make(_elm).perform(router.run);
   return _elm.Main.values = {_op: _op
                             ,Tab: Tab
                             ,E404: E404
                             ,route0: route0
                             ,router: router
                             ,layoutModel: layoutModel
                             ,Model: Model
                             ,model: model
                             ,ApplyRoute: ApplyRoute
                             ,HopAction: HopAction
                             ,LayoutAction: LayoutAction
                             ,ButtonsAction: ButtonsAction
                             ,MenusAction: MenusAction
                             ,TextfieldAction: TextfieldAction
                             ,SnackbarAction: SnackbarAction
                             ,nth: nth
                             ,update: update
                             ,drawer: drawer
                             ,header: header
                             ,tabs: tabs
                             ,e404: e404
                             ,tabViews: tabViews
                             ,tabTitles: tabTitles
                             ,stylesheet: stylesheet
                             ,setTab: setTab
                             ,view: view
                             ,init: init
                             ,inputs: inputs
                             ,app: app
                             ,main: main};
};
