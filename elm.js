
(function() {
'use strict';

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

//import Native.Utils //

var _elm_lang$core$Native_Basics = function() {

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
	return _elm_lang$core$Native_Utils.cmp(a, b) < 0 ? a : b;
}
function max(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) > 0 ? a : b;
}
function clamp(lo, hi, n)
{
	return _elm_lang$core$Native_Utils.cmp(n, lo) < 0
		? lo
		: _elm_lang$core$Native_Utils.cmp(n, hi) > 0
			? hi
			: n;
}

var ord = ['LT', 'EQ', 'GT'];

function compare(x, y)
{
	return { ctor: ord[_elm_lang$core$Native_Utils.cmp(x, y) + 1] };
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
	return _elm_lang$core$Native_Utils.Tuple2(r * Math.cos(t), r * Math.sin(t));
}
function toPolar(point)
{
	var x = point._0;
	var y = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(Math.sqrt(x * x + y * y), Math.atan2(y, x));
}

return {
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
	compare: F2(compare),

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

}();
//import //

var _elm_lang$core$Native_Utils = function() {

// COMPARISONS

function eq(x, y)
{
	var stack = [];
	var isEqual = eqHelp(x, y, 0, stack);
	var pair;
	while (isEqual && (pair = stack.pop()))
	{
		isEqual = eqHelp(pair.x, pair.y, 0, stack);
	}
	return isEqual;
}


function eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push({ x: x, y: y });
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object')
	{
		if (typeof x === 'function')
		{
			throw new Error(
				'Trying to use `(==)` on functions. There is no way to know if functions are "the same" in the Elm sense.'
				+ ' Read more about this at http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#=='
				+ ' which describes why it is this way and what the better version will look like.'
			);
		}
		return false;
	}

	if (x === null || y === null)
	{
		return false
	}

	if (x instanceof Date)
	{
		return x.getTime() === y.getTime();
	}

	if (!('ctor' in x))
	{
		for (var key in x)
		{
			if (!eqHelp(x[key], y[key], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	// convert Dicts and Sets to lists
	if (x.ctor === 'RBNode_elm_builtin' || x.ctor === 'RBEmpty_elm_builtin')
	{
		x = _elm_lang$core$Dict$toList(x);
		y = _elm_lang$core$Dict$toList(y);
	}
	if (x.ctor === 'Set_elm_builtin')
	{
		x = _elm_lang$core$Set$toList(x);
		y = _elm_lang$core$Set$toList(y);
	}

	// check if lists are equal without recursion
	if (x.ctor === '::')
	{
		var a = x;
		var b = y;
		while (a.ctor === '::' && b.ctor === '::')
		{
			if (!eqHelp(a._0, b._0, depth + 1, stack))
			{
				return false;
			}
			a = a._1;
			b = b._1;
		}
		return a.ctor === b.ctor;
	}

	// check if Arrays are equal
	if (x.ctor === '_Array')
	{
		var xs = _elm_lang$core$Native_Array.toJSArray(x);
		var ys = _elm_lang$core$Native_Array.toJSArray(y);
		if (xs.length !== ys.length)
		{
			return false;
		}
		for (var i = 0; i < xs.length; i++)
		{
			if (!eqHelp(xs[i], ys[i], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	if (!eqHelp(x.ctor, y.ctor, depth + 1, stack))
	{
		return false;
	}

	for (var key in x)
	{
		if (!eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

var LT = -1, EQ = 0, GT = 1;

function cmp(x, y)
{
	if (typeof x !== 'object')
	{
		return x === y ? EQ : x < y ? LT : GT;
	}

	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? EQ : a < b ? LT : GT;
	}

	if (x.ctor === '::' || x.ctor === '[]')
	{
		while (x.ctor === '::' && y.ctor === '::')
		{
			var ord = cmp(x._0, y._0);
			if (ord !== EQ)
			{
				return ord;
			}
			x = x._1;
			y = y._1;
		}
		return x.ctor === y.ctor ? EQ : x.ctor === '[]' ? LT : GT;
	}

	if (x.ctor.slice(0, 6) === '_Tuple')
	{
		var ord;
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

	throw new Error(
		'Comparison error: comparison is only defined on ints, '
		+ 'floats, times, chars, strings, lists of comparable values, '
		+ 'and tuples of comparable values.'
	);
}


// COMMON VALUES

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

function chr(c)
{
	return new String(c);
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

function append(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
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


// TO STRING

function toString(v)
{
	var type = typeof v;
	if (type === 'function')
	{
		var name = v.func ? v.func.name : v.name;
		return '<function' + (name === '' ? '' : ':') + name + '>';
	}

	if (type === 'boolean')
	{
		return v ? 'True' : 'False';
	}

	if (type === 'number')
	{
		return v + '';
	}

	if (v instanceof String)
	{
		return '\'' + addSlashes(v, true) + '\'';
	}

	if (type === 'string')
	{
		return '"' + addSlashes(v, false) + '"';
	}

	if (v === null)
	{
		return 'null';
	}

	if (type === 'object' && 'ctor' in v)
	{
		var ctorStarter = v.ctor.substring(0, 5);

		if (ctorStarter === '_Tupl')
		{
			var output = [];
			for (var k in v)
			{
				if (k === 'ctor') continue;
				output.push(toString(v[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (ctorStarter === '_Task')
		{
			return '<task>'
		}

		if (v.ctor === '_Array')
		{
			var list = _elm_lang$core$Array$toList(v);
			return 'Array.fromList ' + toString(list);
		}

		if (v.ctor === '<decoder>')
		{
			return '<decoder>';
		}

		if (v.ctor === '_Process')
		{
			return '<process:' + v.id + '>';
		}

		if (v.ctor === '::')
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

		if (v.ctor === '[]')
		{
			return '[]';
		}

		if (v.ctor === 'Set_elm_builtin')
		{
			return 'Set.fromList ' + toString(_elm_lang$core$Set$toList(v));
		}

		if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin')
		{
			return 'Dict.fromList ' + toString(_elm_lang$core$Dict$toList(v));
		}

		var output = '';
		for (var i in v)
		{
			if (i === 'ctor') continue;
			var str = toString(v[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return v.ctor + output;
	}

	if (type === 'object')
	{
		if (v instanceof Date)
		{
			return '<' + v.toString() + '>';
		}

		if (v.elm_web_socket)
		{
			return '<websocket>';
		}

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
}

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


return {
	eq: eq,
	cmp: cmp,
	Tuple0: Tuple0,
	Tuple2: Tuple2,
	chr: chr,
	update: update,
	guid: guid,

	append: F2(append),

	crash: crash,
	crashCase: crashCase,

	toString: toString
};

}();
var _elm_lang$core$Basics$uncurry = F2(
	function (f, _p0) {
		var _p1 = _p0;
		return A2(f, _p1._0, _p1._1);
	});
var _elm_lang$core$Basics$curry = F3(
	function (f, a, b) {
		return f(
			{ctor: '_Tuple2', _0: a, _1: b});
	});
var _elm_lang$core$Basics$flip = F3(
	function (f, b, a) {
		return A2(f, a, b);
	});
var _elm_lang$core$Basics$snd = function (_p2) {
	var _p3 = _p2;
	return _p3._1;
};
var _elm_lang$core$Basics$fst = function (_p4) {
	var _p5 = _p4;
	return _p5._0;
};
var _elm_lang$core$Basics$always = F2(
	function (a, _p6) {
		return a;
	});
var _elm_lang$core$Basics$identity = function (x) {
	return x;
};
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<|'] = F2(
	function (f, x) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['|>'] = F2(
	function (x, f) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>>'] = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<<'] = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['++'] = _elm_lang$core$Native_Utils.append;
var _elm_lang$core$Basics$toString = _elm_lang$core$Native_Utils.toString;
var _elm_lang$core$Basics$isInfinite = _elm_lang$core$Native_Basics.isInfinite;
var _elm_lang$core$Basics$isNaN = _elm_lang$core$Native_Basics.isNaN;
var _elm_lang$core$Basics$toFloat = _elm_lang$core$Native_Basics.toFloat;
var _elm_lang$core$Basics$ceiling = _elm_lang$core$Native_Basics.ceiling;
var _elm_lang$core$Basics$floor = _elm_lang$core$Native_Basics.floor;
var _elm_lang$core$Basics$truncate = _elm_lang$core$Native_Basics.truncate;
var _elm_lang$core$Basics$round = _elm_lang$core$Native_Basics.round;
var _elm_lang$core$Basics$not = _elm_lang$core$Native_Basics.not;
var _elm_lang$core$Basics$xor = _elm_lang$core$Native_Basics.xor;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['||'] = _elm_lang$core$Native_Basics.or;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['&&'] = _elm_lang$core$Native_Basics.and;
var _elm_lang$core$Basics$max = _elm_lang$core$Native_Basics.max;
var _elm_lang$core$Basics$min = _elm_lang$core$Native_Basics.min;
var _elm_lang$core$Basics$compare = _elm_lang$core$Native_Basics.compare;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>='] = _elm_lang$core$Native_Basics.ge;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<='] = _elm_lang$core$Native_Basics.le;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>'] = _elm_lang$core$Native_Basics.gt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<'] = _elm_lang$core$Native_Basics.lt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/='] = _elm_lang$core$Native_Basics.neq;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['=='] = _elm_lang$core$Native_Basics.eq;
var _elm_lang$core$Basics$e = _elm_lang$core$Native_Basics.e;
var _elm_lang$core$Basics$pi = _elm_lang$core$Native_Basics.pi;
var _elm_lang$core$Basics$clamp = _elm_lang$core$Native_Basics.clamp;
var _elm_lang$core$Basics$logBase = _elm_lang$core$Native_Basics.logBase;
var _elm_lang$core$Basics$abs = _elm_lang$core$Native_Basics.abs;
var _elm_lang$core$Basics$negate = _elm_lang$core$Native_Basics.negate;
var _elm_lang$core$Basics$sqrt = _elm_lang$core$Native_Basics.sqrt;
var _elm_lang$core$Basics$atan2 = _elm_lang$core$Native_Basics.atan2;
var _elm_lang$core$Basics$atan = _elm_lang$core$Native_Basics.atan;
var _elm_lang$core$Basics$asin = _elm_lang$core$Native_Basics.asin;
var _elm_lang$core$Basics$acos = _elm_lang$core$Native_Basics.acos;
var _elm_lang$core$Basics$tan = _elm_lang$core$Native_Basics.tan;
var _elm_lang$core$Basics$sin = _elm_lang$core$Native_Basics.sin;
var _elm_lang$core$Basics$cos = _elm_lang$core$Native_Basics.cos;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['^'] = _elm_lang$core$Native_Basics.exp;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['%'] = _elm_lang$core$Native_Basics.mod;
var _elm_lang$core$Basics$rem = _elm_lang$core$Native_Basics.rem;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['//'] = _elm_lang$core$Native_Basics.div;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/'] = _elm_lang$core$Native_Basics.floatDiv;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['*'] = _elm_lang$core$Native_Basics.mul;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['-'] = _elm_lang$core$Native_Basics.sub;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['+'] = _elm_lang$core$Native_Basics.add;
var _elm_lang$core$Basics$toPolar = _elm_lang$core$Native_Basics.toPolar;
var _elm_lang$core$Basics$fromPolar = _elm_lang$core$Native_Basics.fromPolar;
var _elm_lang$core$Basics$turns = _elm_lang$core$Native_Basics.turns;
var _elm_lang$core$Basics$degrees = _elm_lang$core$Native_Basics.degrees;
var _elm_lang$core$Basics$radians = function (t) {
	return t;
};
var _elm_lang$core$Basics$GT = {ctor: 'GT'};
var _elm_lang$core$Basics$EQ = {ctor: 'EQ'};
var _elm_lang$core$Basics$LT = {ctor: 'LT'};
var _elm_lang$core$Basics$Never = function (a) {
	return {ctor: 'Never', _0: a};
};

//import Native.Utils //

var _elm_lang$core$Native_Debug = function() {

function log(tag, value)
{
	var msg = tag + ': ' + _elm_lang$core$Native_Utils.toString(value);
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

return {
	crash: crash,
	log: F2(log)
};

}();
var _elm_lang$core$Debug$crash = _elm_lang$core$Native_Debug.crash;
var _elm_lang$core$Debug$log = _elm_lang$core$Native_Debug.log;

var _elm_lang$core$Maybe$withDefault = F2(
	function ($default, maybe) {
		var _p0 = maybe;
		if (_p0.ctor === 'Just') {
			return _p0._0;
		} else {
			return $default;
		}
	});
var _elm_lang$core$Maybe$Nothing = {ctor: 'Nothing'};
var _elm_lang$core$Maybe$oneOf = function (maybes) {
	oneOf:
	while (true) {
		var _p1 = maybes;
		if (_p1.ctor === '[]') {
			return _elm_lang$core$Maybe$Nothing;
		} else {
			var _p3 = _p1._0;
			var _p2 = _p3;
			if (_p2.ctor === 'Nothing') {
				var _v3 = _p1._1;
				maybes = _v3;
				continue oneOf;
			} else {
				return _p3;
			}
		}
	}
};
var _elm_lang$core$Maybe$andThen = F2(
	function (maybeValue, callback) {
		var _p4 = maybeValue;
		if (_p4.ctor === 'Just') {
			return callback(_p4._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$Just = function (a) {
	return {ctor: 'Just', _0: a};
};
var _elm_lang$core$Maybe$map = F2(
	function (f, maybe) {
		var _p5 = maybe;
		if (_p5.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				f(_p5._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		var _p6 = {ctor: '_Tuple2', _0: ma, _1: mb};
		if (((_p6.ctor === '_Tuple2') && (_p6._0.ctor === 'Just')) && (_p6._1.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A2(func, _p6._0._0, _p6._1._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		var _p7 = {ctor: '_Tuple3', _0: ma, _1: mb, _2: mc};
		if ((((_p7.ctor === '_Tuple3') && (_p7._0.ctor === 'Just')) && (_p7._1.ctor === 'Just')) && (_p7._2.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A3(func, _p7._0._0, _p7._1._0, _p7._2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map4 = F5(
	function (func, ma, mb, mc, md) {
		var _p8 = {ctor: '_Tuple4', _0: ma, _1: mb, _2: mc, _3: md};
		if (((((_p8.ctor === '_Tuple4') && (_p8._0.ctor === 'Just')) && (_p8._1.ctor === 'Just')) && (_p8._2.ctor === 'Just')) && (_p8._3.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A4(func, _p8._0._0, _p8._1._0, _p8._2._0, _p8._3._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map5 = F6(
	function (func, ma, mb, mc, md, me) {
		var _p9 = {ctor: '_Tuple5', _0: ma, _1: mb, _2: mc, _3: md, _4: me};
		if ((((((_p9.ctor === '_Tuple5') && (_p9._0.ctor === 'Just')) && (_p9._1.ctor === 'Just')) && (_p9._2.ctor === 'Just')) && (_p9._3.ctor === 'Just')) && (_p9._4.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A5(func, _p9._0._0, _p9._1._0, _p9._2._0, _p9._3._0, _p9._4._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});

//import Native.Utils //

var _elm_lang$core$Native_List = function() {

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return { ctor: '::', _0: hd, _1: tl };
}

function fromArray(arr)
{
	var out = Nil;
	for (var i = arr.length; i--; )
	{
		out = Cons(arr[i], out);
	}
	return out;
}

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
		return _elm_lang$core$Native_Utils.cmp(f(a), f(b));
	}));
}

function sortWith(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		var ord = f(a)(b).ctor;
		return ord === 'EQ' ? 0 : ord === 'LT' ? -1 : 1;
	}));
}

return {
	Nil: Nil,
	Cons: Cons,
	cons: F2(Cons),
	toArray: toArray,
	fromArray: fromArray,
	range: range,

	foldr: F3(foldr),

	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	sortBy: F2(sortBy),
	sortWith: F2(sortWith)
};

}();
var _elm_lang$core$List$sortWith = _elm_lang$core$Native_List.sortWith;
var _elm_lang$core$List$sortBy = _elm_lang$core$Native_List.sortBy;
var _elm_lang$core$List$sort = function (xs) {
	return A2(_elm_lang$core$List$sortBy, _elm_lang$core$Basics$identity, xs);
};
var _elm_lang$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return list;
			} else {
				var _p0 = list;
				if (_p0.ctor === '[]') {
					return list;
				} else {
					var _v1 = n - 1,
						_v2 = _p0._1;
					n = _v1;
					list = _v2;
					continue drop;
				}
			}
		}
	});
var _elm_lang$core$List$map5 = _elm_lang$core$Native_List.map5;
var _elm_lang$core$List$map4 = _elm_lang$core$Native_List.map4;
var _elm_lang$core$List$map3 = _elm_lang$core$Native_List.map3;
var _elm_lang$core$List$map2 = _elm_lang$core$Native_List.map2;
var _elm_lang$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			var _p1 = list;
			if (_p1.ctor === '[]') {
				return false;
			} else {
				if (isOkay(_p1._0)) {
					return true;
				} else {
					var _v4 = isOkay,
						_v5 = _p1._1;
					isOkay = _v4;
					list = _v5;
					continue any;
				}
			}
		}
	});
var _elm_lang$core$List$all = F2(
	function (isOkay, list) {
		return _elm_lang$core$Basics$not(
			A2(
				_elm_lang$core$List$any,
				function (_p2) {
					return _elm_lang$core$Basics$not(
						isOkay(_p2));
				},
				list));
	});
var _elm_lang$core$List$foldr = _elm_lang$core$Native_List.foldr;
var _elm_lang$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			var _p3 = list;
			if (_p3.ctor === '[]') {
				return acc;
			} else {
				var _v7 = func,
					_v8 = A2(func, _p3._0, acc),
					_v9 = _p3._1;
				func = _v7;
				acc = _v8;
				list = _v9;
				continue foldl;
			}
		}
	});
var _elm_lang$core$List$length = function (xs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p4, i) {
				return i + 1;
			}),
		0,
		xs);
};
var _elm_lang$core$List$sum = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x + y;
			}),
		0,
		numbers);
};
var _elm_lang$core$List$product = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x * y;
			}),
		1,
		numbers);
};
var _elm_lang$core$List$maximum = function (list) {
	var _p5 = list;
	if (_p5.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$max, _p5._0, _p5._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$minimum = function (list) {
	var _p6 = list;
	if (_p6.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$min, _p6._0, _p6._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$map2,
			f,
			_elm_lang$core$Native_List.range(
				0,
				_elm_lang$core$List$length(xs) - 1),
			xs);
	});
var _elm_lang$core$List$member = F2(
	function (x, xs) {
		return A2(
			_elm_lang$core$List$any,
			function (a) {
				return _elm_lang$core$Native_Utils.eq(a, x);
			},
			xs);
	});
var _elm_lang$core$List$isEmpty = function (xs) {
	var _p7 = xs;
	if (_p7.ctor === '[]') {
		return true;
	} else {
		return false;
	}
};
var _elm_lang$core$List$tail = function (list) {
	var _p8 = list;
	if (_p8.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p8._1);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$head = function (list) {
	var _p9 = list;
	if (_p9.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p9._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List_ops = _elm_lang$core$List_ops || {};
_elm_lang$core$List_ops['::'] = _elm_lang$core$Native_List.cons;
var _elm_lang$core$List$map = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						_elm_lang$core$List_ops['::'],
						f(x),
						acc);
				}),
			_elm_lang$core$Native_List.fromArray(
				[]),
			xs);
	});
var _elm_lang$core$List$filter = F2(
	function (pred, xs) {
		var conditionalCons = F2(
			function (x, xs$) {
				return pred(x) ? A2(_elm_lang$core$List_ops['::'], x, xs$) : xs$;
			});
		return A3(
			_elm_lang$core$List$foldr,
			conditionalCons,
			_elm_lang$core$Native_List.fromArray(
				[]),
			xs);
	});
var _elm_lang$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _p10 = f(mx);
		if (_p10.ctor === 'Just') {
			return A2(_elm_lang$core$List_ops['::'], _p10._0, xs);
		} else {
			return xs;
		}
	});
var _elm_lang$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			_elm_lang$core$List$maybeCons(f),
			_elm_lang$core$Native_List.fromArray(
				[]),
			xs);
	});
var _elm_lang$core$List$reverse = function (list) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return A2(_elm_lang$core$List_ops['::'], x, y);
			}),
		_elm_lang$core$Native_List.fromArray(
			[]),
		list);
};
var _elm_lang$core$List$scanl = F3(
	function (f, b, xs) {
		var scan1 = F2(
			function (x, accAcc) {
				var _p11 = accAcc;
				if (_p11.ctor === '::') {
					return A2(
						_elm_lang$core$List_ops['::'],
						A2(f, x, _p11._0),
						accAcc);
				} else {
					return _elm_lang$core$Native_List.fromArray(
						[]);
				}
			});
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$foldl,
				scan1,
				_elm_lang$core$Native_List.fromArray(
					[b]),
				xs));
	});
var _elm_lang$core$List$append = F2(
	function (xs, ys) {
		var _p12 = ys;
		if (_p12.ctor === '[]') {
			return xs;
		} else {
			return A3(
				_elm_lang$core$List$foldr,
				F2(
					function (x, y) {
						return A2(_elm_lang$core$List_ops['::'], x, y);
					}),
				ys,
				xs);
		}
	});
var _elm_lang$core$List$concat = function (lists) {
	return A3(
		_elm_lang$core$List$foldr,
		_elm_lang$core$List$append,
		_elm_lang$core$Native_List.fromArray(
			[]),
		lists);
};
var _elm_lang$core$List$concatMap = F2(
	function (f, list) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$map, f, list));
	});
var _elm_lang$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _p13) {
				var _p14 = _p13;
				var _p16 = _p14._0;
				var _p15 = _p14._1;
				return pred(x) ? {
					ctor: '_Tuple2',
					_0: A2(_elm_lang$core$List_ops['::'], x, _p16),
					_1: _p15
				} : {
					ctor: '_Tuple2',
					_0: _p16,
					_1: A2(_elm_lang$core$List_ops['::'], x, _p15)
				};
			});
		return A3(
			_elm_lang$core$List$foldr,
			step,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_List.fromArray(
					[]),
				_1: _elm_lang$core$Native_List.fromArray(
					[])
			},
			list);
	});
var _elm_lang$core$List$unzip = function (pairs) {
	var step = F2(
		function (_p18, _p17) {
			var _p19 = _p18;
			var _p20 = _p17;
			return {
				ctor: '_Tuple2',
				_0: A2(_elm_lang$core$List_ops['::'], _p19._0, _p20._0),
				_1: A2(_elm_lang$core$List_ops['::'], _p19._1, _p20._1)
			};
		});
	return A3(
		_elm_lang$core$List$foldr,
		step,
		{
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_List.fromArray(
				[]),
			_1: _elm_lang$core$Native_List.fromArray(
				[])
		},
		pairs);
};
var _elm_lang$core$List$intersperse = F2(
	function (sep, xs) {
		var _p21 = xs;
		if (_p21.ctor === '[]') {
			return _elm_lang$core$Native_List.fromArray(
				[]);
		} else {
			var step = F2(
				function (x, rest) {
					return A2(
						_elm_lang$core$List_ops['::'],
						sep,
						A2(_elm_lang$core$List_ops['::'], x, rest));
				});
			var spersed = A3(
				_elm_lang$core$List$foldr,
				step,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_p21._1);
			return A2(_elm_lang$core$List_ops['::'], _p21._0, spersed);
		}
	});
var _elm_lang$core$List$takeReverse = F3(
	function (n, list, taken) {
		takeReverse:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return taken;
			} else {
				var _p22 = list;
				if (_p22.ctor === '[]') {
					return taken;
				} else {
					var _v23 = n - 1,
						_v24 = _p22._1,
						_v25 = A2(_elm_lang$core$List_ops['::'], _p22._0, taken);
					n = _v23;
					list = _v24;
					taken = _v25;
					continue takeReverse;
				}
			}
		}
	});
var _elm_lang$core$List$takeTailRec = F2(
	function (n, list) {
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$takeReverse,
				n,
				list,
				_elm_lang$core$Native_List.fromArray(
					[])));
	});
var _elm_lang$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
			return _elm_lang$core$Native_List.fromArray(
				[]);
		} else {
			var _p23 = {ctor: '_Tuple2', _0: n, _1: list};
			_v26_5:
			do {
				_v26_1:
				do {
					if (_p23.ctor === '_Tuple2') {
						if (_p23._1.ctor === '[]') {
							return list;
						} else {
							if (_p23._1._1.ctor === '::') {
								switch (_p23._0) {
									case 1:
										break _v26_1;
									case 2:
										return _elm_lang$core$Native_List.fromArray(
											[_p23._1._0, _p23._1._1._0]);
									case 3:
										if (_p23._1._1._1.ctor === '::') {
											return _elm_lang$core$Native_List.fromArray(
												[_p23._1._0, _p23._1._1._0, _p23._1._1._1._0]);
										} else {
											break _v26_5;
										}
									default:
										if ((_p23._1._1._1.ctor === '::') && (_p23._1._1._1._1.ctor === '::')) {
											var _p28 = _p23._1._1._1._0;
											var _p27 = _p23._1._1._0;
											var _p26 = _p23._1._0;
											var _p25 = _p23._1._1._1._1._0;
											var _p24 = _p23._1._1._1._1._1;
											return (_elm_lang$core$Native_Utils.cmp(ctr, 1000) > 0) ? A2(
												_elm_lang$core$List_ops['::'],
												_p26,
												A2(
													_elm_lang$core$List_ops['::'],
													_p27,
													A2(
														_elm_lang$core$List_ops['::'],
														_p28,
														A2(
															_elm_lang$core$List_ops['::'],
															_p25,
															A2(_elm_lang$core$List$takeTailRec, n - 4, _p24))))) : A2(
												_elm_lang$core$List_ops['::'],
												_p26,
												A2(
													_elm_lang$core$List_ops['::'],
													_p27,
													A2(
														_elm_lang$core$List_ops['::'],
														_p28,
														A2(
															_elm_lang$core$List_ops['::'],
															_p25,
															A3(_elm_lang$core$List$takeFast, ctr + 1, n - 4, _p24)))));
										} else {
											break _v26_5;
										}
								}
							} else {
								if (_p23._0 === 1) {
									break _v26_1;
								} else {
									break _v26_5;
								}
							}
						}
					} else {
						break _v26_5;
					}
				} while(false);
				return _elm_lang$core$Native_List.fromArray(
					[_p23._1._0]);
			} while(false);
			return list;
		}
	});
var _elm_lang$core$List$take = F2(
	function (n, list) {
		return A3(_elm_lang$core$List$takeFast, 0, n, list);
	});
var _elm_lang$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return result;
			} else {
				var _v27 = A2(_elm_lang$core$List_ops['::'], value, result),
					_v28 = n - 1,
					_v29 = value;
				result = _v27;
				n = _v28;
				value = _v29;
				continue repeatHelp;
			}
		}
	});
var _elm_lang$core$List$repeat = F2(
	function (n, value) {
		return A3(
			_elm_lang$core$List$repeatHelp,
			_elm_lang$core$Native_List.fromArray(
				[]),
			n,
			value);
	});

var _elm_lang$core$Result$toMaybe = function (result) {
	var _p0 = result;
	if (_p0.ctor === 'Ok') {
		return _elm_lang$core$Maybe$Just(_p0._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$Result$withDefault = F2(
	function (def, result) {
		var _p1 = result;
		if (_p1.ctor === 'Ok') {
			return _p1._0;
		} else {
			return def;
		}
	});
var _elm_lang$core$Result$Err = function (a) {
	return {ctor: 'Err', _0: a};
};
var _elm_lang$core$Result$andThen = F2(
	function (result, callback) {
		var _p2 = result;
		if (_p2.ctor === 'Ok') {
			return callback(_p2._0);
		} else {
			return _elm_lang$core$Result$Err(_p2._0);
		}
	});
var _elm_lang$core$Result$Ok = function (a) {
	return {ctor: 'Ok', _0: a};
};
var _elm_lang$core$Result$map = F2(
	function (func, ra) {
		var _p3 = ra;
		if (_p3.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				func(_p3._0));
		} else {
			return _elm_lang$core$Result$Err(_p3._0);
		}
	});
var _elm_lang$core$Result$map2 = F3(
	function (func, ra, rb) {
		var _p4 = {ctor: '_Tuple2', _0: ra, _1: rb};
		if (_p4._0.ctor === 'Ok') {
			if (_p4._1.ctor === 'Ok') {
				return _elm_lang$core$Result$Ok(
					A2(func, _p4._0._0, _p4._1._0));
			} else {
				return _elm_lang$core$Result$Err(_p4._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p4._0._0);
		}
	});
var _elm_lang$core$Result$map3 = F4(
	function (func, ra, rb, rc) {
		var _p5 = {ctor: '_Tuple3', _0: ra, _1: rb, _2: rc};
		if (_p5._0.ctor === 'Ok') {
			if (_p5._1.ctor === 'Ok') {
				if (_p5._2.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						A3(func, _p5._0._0, _p5._1._0, _p5._2._0));
				} else {
					return _elm_lang$core$Result$Err(_p5._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p5._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p5._0._0);
		}
	});
var _elm_lang$core$Result$map4 = F5(
	function (func, ra, rb, rc, rd) {
		var _p6 = {ctor: '_Tuple4', _0: ra, _1: rb, _2: rc, _3: rd};
		if (_p6._0.ctor === 'Ok') {
			if (_p6._1.ctor === 'Ok') {
				if (_p6._2.ctor === 'Ok') {
					if (_p6._3.ctor === 'Ok') {
						return _elm_lang$core$Result$Ok(
							A4(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0));
					} else {
						return _elm_lang$core$Result$Err(_p6._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p6._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p6._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p6._0._0);
		}
	});
var _elm_lang$core$Result$map5 = F6(
	function (func, ra, rb, rc, rd, re) {
		var _p7 = {ctor: '_Tuple5', _0: ra, _1: rb, _2: rc, _3: rd, _4: re};
		if (_p7._0.ctor === 'Ok') {
			if (_p7._1.ctor === 'Ok') {
				if (_p7._2.ctor === 'Ok') {
					if (_p7._3.ctor === 'Ok') {
						if (_p7._4.ctor === 'Ok') {
							return _elm_lang$core$Result$Ok(
								A5(func, _p7._0._0, _p7._1._0, _p7._2._0, _p7._3._0, _p7._4._0));
						} else {
							return _elm_lang$core$Result$Err(_p7._4._0);
						}
					} else {
						return _elm_lang$core$Result$Err(_p7._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p7._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p7._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p7._0._0);
		}
	});
var _elm_lang$core$Result$formatError = F2(
	function (f, result) {
		var _p8 = result;
		if (_p8.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(_p8._0);
		} else {
			return _elm_lang$core$Result$Err(
				f(_p8._0));
		}
	});
var _elm_lang$core$Result$fromMaybe = F2(
	function (err, maybe) {
		var _p9 = maybe;
		if (_p9.ctor === 'Just') {
			return _elm_lang$core$Result$Ok(_p9._0);
		} else {
			return _elm_lang$core$Result$Err(err);
		}
	});

//import //

var _elm_lang$core$Native_Platform = function() {


// PROGRAMS

function addPublicModule(object, name, main)
{
	var init = main ? makeEmbed(name, main) : mainIsUndefined(name);

	object['worker'] = function worker(flags)
	{
		return init(undefined, flags, false);
	}

	object['embed'] = function embed(domNode, flags)
	{
		return init(domNode, flags, true);
	}

	object['fullscreen'] = function fullscreen(flags)
	{
		return init(document.body, flags, true);
	};
}


// PROGRAM FAIL

function mainIsUndefined(name)
{
	return function(domNode)
	{
		var message = 'Cannot initialize module `' + name +
			'` because it has no `main` value!\nWhat should I show on screen?';
		domNode.innerHTML = errorHtml(message);
		throw new Error(message);
	};
}

function errorHtml(message)
{
	return '<div style="padding-left:1em;">'
		+ '<h2 style="font-weight:normal;"><b>Oops!</b> Something went wrong when starting your Elm program.</h2>'
		+ '<pre style="padding-left:1em;">' + message + '</pre>'
		+ '</div>';
}


// PROGRAM SUCCESS

function makeEmbed(moduleName, main)
{
	return function embed(rootDomNode, flags, withRenderer)
	{
		try
		{
			var program = mainToProgram(moduleName, main);
			if (!withRenderer)
			{
				program.renderer = dummyRenderer;
			}
			return makeEmbedHelp(moduleName, program, rootDomNode, flags);
		}
		catch (e)
		{
			rootDomNode.innerHTML = errorHtml(e.message);
			throw e;
		}
	};
}

function dummyRenderer()
{
	return { update: function() {} };
}


// MAIN TO PROGRAM

function mainToProgram(moduleName, wrappedMain)
{
	var main = wrappedMain.main;

	if (typeof main.init === 'undefined')
	{
		var emptyBag = batch(_elm_lang$core$Native_List.Nil);
		var noChange = _elm_lang$core$Native_Utils.Tuple2(
			_elm_lang$core$Native_Utils.Tuple0,
			emptyBag
		);

		return _elm_lang$virtual_dom$VirtualDom$programWithFlags({
			init: function() { return noChange; },
			view: function() { return main; },
			update: F2(function() { return noChange; }),
			subscriptions: function () { return emptyBag; }
		});
	}

	var flags = wrappedMain.flags;
	var init = flags
		? initWithFlags(moduleName, main.init, flags)
		: initWithoutFlags(moduleName, main.init);

	return _elm_lang$virtual_dom$VirtualDom$programWithFlags({
		init: init,
		view: main.view,
		update: main.update,
		subscriptions: main.subscriptions,
	});
}

function initWithoutFlags(moduleName, realInit)
{
	return function init(flags)
	{
		if (typeof flags !== 'undefined')
		{
			throw new Error(
				'You are giving module `' + moduleName + '` an argument in JavaScript.\n'
				+ 'This module does not take arguments though! You probably need to change the\n'
				+ 'initialization code to something like `Elm.' + moduleName + '.fullscreen()`'
			);
		}
		return realInit();
	};
}

function initWithFlags(moduleName, realInit, flagDecoder)
{
	return function init(flags)
	{
		var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
		if (result.ctor === 'Err')
		{
			throw new Error(
				'You are trying to initialize module `' + moduleName + '` with an unexpected argument.\n'
				+ 'When trying to convert it to a usable Elm value, I run into this problem:\n\n'
				+ result._0
			);
		}
		return realInit(result._0);
	};
}


// SETUP RUNTIME SYSTEM

function makeEmbedHelp(moduleName, program, rootDomNode, flags)
{
	var init = program.init;
	var update = program.update;
	var subscriptions = program.subscriptions;
	var view = program.view;
	var makeRenderer = program.renderer;

	// ambient state
	var managers = {};
	var renderer;

	// init and update state in main process
	var initApp = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
		var results = init(flags);
		var model = results._0;
		renderer = makeRenderer(rootDomNode, enqueue, view(model));
		var cmds = results._1;
		var subs = subscriptions(model);
		dispatchEffects(managers, cmds, subs);
		callback(_elm_lang$core$Native_Scheduler.succeed(model));
	});

	function onMessage(msg, model)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
			var results = A2(update, msg, model);
			model = results._0;
			renderer.update(view(model));
			var cmds = results._1;
			var subs = subscriptions(model);
			dispatchEffects(managers, cmds, subs);
			callback(_elm_lang$core$Native_Scheduler.succeed(model));
		});
	}

	var mainProcess = spawnLoop(initApp, onMessage);

	function enqueue(msg)
	{
		_elm_lang$core$Native_Scheduler.rawSend(mainProcess, msg);
	}

	var ports = setupEffects(managers, enqueue);

	return ports ? { ports: ports } : {};
}


// EFFECT MANAGERS

var effectManagers = {};

function setupEffects(managers, callback)
{
	var ports;

	// setup all necessary effect managers
	for (var key in effectManagers)
	{
		var manager = effectManagers[key];

		if (manager.isForeign)
		{
			ports = ports || {};
			ports[key] = manager.tag === 'cmd'
				? setupOutgoingPort(key)
				: setupIncomingPort(key, callback);
		}

		managers[key] = makeManager(manager, callback);
	}

	return ports;
}

function makeManager(info, callback)
{
	var router = {
		main: callback,
		self: undefined
	};

	var tag = info.tag;
	var onEffects = info.onEffects;
	var onSelfMsg = info.onSelfMsg;

	function onMessage(msg, state)
	{
		if (msg.ctor === 'self')
		{
			return A3(onSelfMsg, router, msg._0, state);
		}

		var fx = msg._0;
		switch (tag)
		{
			case 'cmd':
				return A3(onEffects, router, fx.cmds, state);

			case 'sub':
				return A3(onEffects, router, fx.subs, state);

			case 'fx':
				return A4(onEffects, router, fx.cmds, fx.subs, state);
		}
	}

	var process = spawnLoop(info.init, onMessage);
	router.self = process;
	return process;
}

function sendToApp(router, msg)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		router.main(msg);
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sendToSelf(router, msg)
{
	return A2(_elm_lang$core$Native_Scheduler.send, router.self, {
		ctor: 'self',
		_0: msg
	});
}


// HELPER for STATEFUL LOOPS

function spawnLoop(init, onMessage)
{
	var andThen = _elm_lang$core$Native_Scheduler.andThen;

	function loop(state)
	{
		var handleMsg = _elm_lang$core$Native_Scheduler.receive(function(msg) {
			return onMessage(msg, state);
		});
		return A2(andThen, handleMsg, loop);
	}

	var task = A2(andThen, init, loop);

	return _elm_lang$core$Native_Scheduler.rawSpawn(task);
}


// BAGS

function leaf(home)
{
	return function(value)
	{
		return {
			type: 'leaf',
			home: home,
			value: value
		};
	};
}

function batch(list)
{
	return {
		type: 'node',
		branches: list
	};
}

function map(tagger, bag)
{
	return {
		type: 'map',
		tagger: tagger,
		tree: bag
	}
}


// PIPE BAGS INTO EFFECT MANAGERS

function dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	gatherEffects(true, cmdBag, effectsDict, null);
	gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		var fx = home in effectsDict
			? effectsDict[home]
			: {
				cmds: _elm_lang$core$Native_List.Nil,
				subs: _elm_lang$core$Native_List.Nil
			};

		_elm_lang$core$Native_Scheduler.rawSend(managers[home], { ctor: 'fx', _0: fx });
	}
}

function gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.type)
	{
		case 'leaf':
			var home = bag.home;
			var effect = toEffect(isCmd, home, taggers, bag.value);
			effectsDict[home] = insert(isCmd, effect, effectsDict[home]);
			return;

		case 'node':
			var list = bag.branches;
			while (list.ctor !== '[]')
			{
				gatherEffects(isCmd, list._0, effectsDict, taggers);
				list = list._1;
			}
			return;

		case 'map':
			gatherEffects(isCmd, bag.tree, effectsDict, {
				tagger: bag.tagger,
				rest: taggers
			});
			return;
	}
}

function toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		var temp = taggers;
		while (temp)
		{
			x = temp.tagger(x);
			temp = temp.rest;
		}
		return x;
	}

	var map = isCmd
		? effectManagers[home].cmdMap
		: effectManagers[home].subMap;

	return A2(map, applyTaggers, value)
}

function insert(isCmd, newEffect, effects)
{
	effects = effects || {
		cmds: _elm_lang$core$Native_List.Nil,
		subs: _elm_lang$core$Native_List.Nil
	};
	if (isCmd)
	{
		effects.cmds = _elm_lang$core$Native_List.Cons(newEffect, effects.cmds);
		return effects;
	}
	effects.subs = _elm_lang$core$Native_List.Cons(newEffect, effects.subs);
	return effects;
}


// PORTS

function checkPortName(name)
{
	if (name in effectManagers)
	{
		throw new Error('There can only be one port named `' + name + '`, but your program has multiple.');
	}
}


// OUTGOING PORTS

function outgoingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'cmd',
		cmdMap: outgoingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var outgoingPortMap = F2(function cmdMap(tagger, value) {
	return value;
});

function setupOutgoingPort(name)
{
	var subs = [];
	var converter = effectManagers[name].converter;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function onEffects(router, cmdList, state)
	{
		while (cmdList.ctor !== '[]')
		{
			var value = converter(cmdList._0);
			for (var i = 0; i < subs.length; i++)
			{
				subs[i](value);
			}
			cmdList = cmdList._1;
		}
		return init;
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}


// INCOMING PORTS

function incomingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'sub',
		subMap: incomingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var incomingPortMap = F2(function subMap(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});

function setupIncomingPort(name, callback)
{
	var sentBeforeInit = [];
	var subs = _elm_lang$core$Native_List.Nil;
	var converter = effectManagers[name].converter;
	var currentOnEffects = preInitOnEffects;
	var currentSend = preInitSend;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function preInitOnEffects(router, subList, state)
	{
		var postInitResult = postInitOnEffects(router, subList, state);

		for(var i = 0; i < sentBeforeInit.length; i++)
		{
			postInitSend(sentBeforeInit[i]);
		}

		sentBeforeInit = null; // to release objects held in queue
		currentSend = postInitSend;
		currentOnEffects = postInitOnEffects;
		return postInitResult;
	}

	function postInitOnEffects(router, subList, state)
	{
		subs = subList;
		return init;
	}

	function onEffects(router, subList, state)
	{
		return currentOnEffects(router, subList, state);
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function preInitSend(value)
	{
		sentBeforeInit.push(value);
	}

	function postInitSend(incomingValue)
	{
		var result = A2(_elm_lang$core$Json_Decode$decodeValue, converter, incomingValue);
		if (result.ctor === 'Err')
		{
			throw new Error('Trying to send an unexpected type of value through port `' + name + '`:\n' + result._0);
		}

		var value = result._0;
		var temp = subs;
		while (temp.ctor !== '[]')
		{
			callback(temp._0(value));
			temp = temp._1;
		}
	}

	function send(incomingValue)
	{
		currentSend(incomingValue);
	}

	return { send: send };
}

return {
	// routers
	sendToApp: F2(sendToApp),
	sendToSelf: F2(sendToSelf),

	// global setup
	mainToProgram: mainToProgram,
	effectManagers: effectManagers,
	outgoingPort: outgoingPort,
	incomingPort: incomingPort,
	addPublicModule: addPublicModule,

	// effect bags
	leaf: leaf,
	batch: batch,
	map: F2(map)
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Scheduler = function() {

var MAX_STEPS = 10000;


// TASKS

function succeed(value)
{
	return {
		ctor: '_Task_succeed',
		value: value
	};
}

function fail(error)
{
	return {
		ctor: '_Task_fail',
		value: error
	};
}

function nativeBinding(callback)
{
	return {
		ctor: '_Task_nativeBinding',
		callback: callback,
		cancel: null
	};
}

function andThen(task, callback)
{
	return {
		ctor: '_Task_andThen',
		task: task,
		callback: callback
	};
}

function onError(task, callback)
{
	return {
		ctor: '_Task_onError',
		task: task,
		callback: callback
	};
}

function receive(callback)
{
	return {
		ctor: '_Task_receive',
		callback: callback
	};
}


// PROCESSES

function rawSpawn(task)
{
	var process = {
		ctor: '_Process',
		id: _elm_lang$core$Native_Utils.guid(),
		root: task,
		stack: null,
		mailbox: []
	};

	enqueue(process);

	return process;
}

function spawn(task)
{
	return nativeBinding(function(callback) {
		var process = rawSpawn(task);
		callback(succeed(process));
	});
}

function rawSend(process, msg)
{
	process.mailbox.push(msg);
	enqueue(process);
}

function send(process, msg)
{
	return nativeBinding(function(callback) {
		rawSend(process, msg);
		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function kill(process)
{
	return nativeBinding(function(callback) {
		var root = process.root;
		if (root.ctor === '_Task_nativeBinding' && root.cancel)
		{
			root.cancel();
		}

		process.root = null;

		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sleep(time)
{
	return nativeBinding(function(callback) {
		var id = setTimeout(function() {
			callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}


// STEP PROCESSES

function step(numSteps, process)
{
	while (numSteps < MAX_STEPS)
	{
		var ctor = process.root.ctor;

		if (ctor === '_Task_succeed')
		{
			while (process.stack && process.stack.ctor === '_Task_onError')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_fail')
		{
			while (process.stack && process.stack.ctor === '_Task_andThen')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_andThen')
		{
			process.stack = {
				ctor: '_Task_andThen',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_onError')
		{
			process.stack = {
				ctor: '_Task_onError',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_nativeBinding')
		{
			process.root.cancel = process.root.callback(function(newRoot) {
				process.root = newRoot;
				enqueue(process);
			});

			break;
		}

		if (ctor === '_Task_receive')
		{
			var mailbox = process.mailbox;
			if (mailbox.length === 0)
			{
				break;
			}

			process.root = process.root.callback(mailbox.shift());
			++numSteps;
			continue;
		}

		throw new Error(ctor);
	}

	if (numSteps < MAX_STEPS)
	{
		return numSteps + 1;
	}
	enqueue(process);

	return numSteps;
}


// WORK QUEUE

var working = false;
var workQueue = [];

function enqueue(process)
{
	workQueue.push(process);

	if (!working)
	{
		setTimeout(work, 0);
		working = true;
	}
}

function work()
{
	var numSteps = 0;
	var process;
	while (numSteps < MAX_STEPS && (process = workQueue.shift()))
	{
		if (process.root)
		{
			numSteps = step(numSteps, process);
		}
	}
	if (!process)
	{
		working = false;
		return;
	}
	setTimeout(work, 0);
}


return {
	succeed: succeed,
	fail: fail,
	nativeBinding: nativeBinding,
	andThen: F2(andThen),
	onError: F2(onError),
	receive: receive,

	spawn: spawn,
	kill: kill,
	sleep: sleep,
	send: F2(send),

	rawSpawn: rawSpawn,
	rawSend: rawSend
};

}();
var _elm_lang$core$Platform$hack = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Platform$sendToSelf = _elm_lang$core$Native_Platform.sendToSelf;
var _elm_lang$core$Platform$sendToApp = _elm_lang$core$Native_Platform.sendToApp;
var _elm_lang$core$Platform$Program = {ctor: 'Program'};
var _elm_lang$core$Platform$Task = {ctor: 'Task'};
var _elm_lang$core$Platform$ProcessId = {ctor: 'ProcessId'};
var _elm_lang$core$Platform$Router = {ctor: 'Router'};

var _elm_lang$core$Platform_Cmd$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Cmd$none = _elm_lang$core$Platform_Cmd$batch(
	_elm_lang$core$Native_List.fromArray(
		[]));
var _elm_lang$core$Platform_Cmd_ops = _elm_lang$core$Platform_Cmd_ops || {};
_elm_lang$core$Platform_Cmd_ops['!'] = F2(
	function (model, commands) {
		return {
			ctor: '_Tuple2',
			_0: model,
			_1: _elm_lang$core$Platform_Cmd$batch(commands)
		};
	});
var _elm_lang$core$Platform_Cmd$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Cmd$Cmd = {ctor: 'Cmd'};

var _elm_lang$core$Platform_Sub$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Sub$none = _elm_lang$core$Platform_Sub$batch(
	_elm_lang$core$Native_List.fromArray(
		[]));
var _elm_lang$core$Platform_Sub$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Sub$Sub = {ctor: 'Sub'};

//import Native.List //

var _elm_lang$core$Native_Array = function() {

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
	if (list.ctor === '[]')
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
	return toList_(_elm_lang$core$Native_List.Nil, a);
}

function toList_(list, a)
{
	for (var i = a.table.length - 1; i >= 0; i--)
	{
		list =
			a.height === 0
				? _elm_lang$core$Native_List.Cons(a.table[i], list)
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

return {
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

}();
var _elm_lang$core$Array$append = _elm_lang$core$Native_Array.append;
var _elm_lang$core$Array$length = _elm_lang$core$Native_Array.length;
var _elm_lang$core$Array$isEmpty = function (array) {
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$Array$length(array),
		0);
};
var _elm_lang$core$Array$slice = _elm_lang$core$Native_Array.slice;
var _elm_lang$core$Array$set = _elm_lang$core$Native_Array.set;
var _elm_lang$core$Array$get = F2(
	function (i, array) {
		return ((_elm_lang$core$Native_Utils.cmp(0, i) < 1) && (_elm_lang$core$Native_Utils.cmp(
			i,
			_elm_lang$core$Native_Array.length(array)) < 0)) ? _elm_lang$core$Maybe$Just(
			A2(_elm_lang$core$Native_Array.get, i, array)) : _elm_lang$core$Maybe$Nothing;
	});
var _elm_lang$core$Array$push = _elm_lang$core$Native_Array.push;
var _elm_lang$core$Array$empty = _elm_lang$core$Native_Array.empty;
var _elm_lang$core$Array$filter = F2(
	function (isOkay, arr) {
		var update = F2(
			function (x, xs) {
				return isOkay(x) ? A2(_elm_lang$core$Native_Array.push, x, xs) : xs;
			});
		return A3(_elm_lang$core$Native_Array.foldl, update, _elm_lang$core$Native_Array.empty, arr);
	});
var _elm_lang$core$Array$foldr = _elm_lang$core$Native_Array.foldr;
var _elm_lang$core$Array$foldl = _elm_lang$core$Native_Array.foldl;
var _elm_lang$core$Array$indexedMap = _elm_lang$core$Native_Array.indexedMap;
var _elm_lang$core$Array$map = _elm_lang$core$Native_Array.map;
var _elm_lang$core$Array$toIndexedList = function (array) {
	return A3(
		_elm_lang$core$List$map2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		_elm_lang$core$Native_List.range(
			0,
			_elm_lang$core$Native_Array.length(array) - 1),
		_elm_lang$core$Native_Array.toList(array));
};
var _elm_lang$core$Array$toList = _elm_lang$core$Native_Array.toList;
var _elm_lang$core$Array$fromList = _elm_lang$core$Native_Array.fromList;
var _elm_lang$core$Array$initialize = _elm_lang$core$Native_Array.initialize;
var _elm_lang$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			_elm_lang$core$Array$initialize,
			n,
			_elm_lang$core$Basics$always(e));
	});
var _elm_lang$core$Array$Array = {ctor: 'Array'};

//import Maybe, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_String = function() {

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
		return _elm_lang$core$Maybe$Just(_elm_lang$core$Native_Utils.Tuple2(_elm_lang$core$Native_Utils.chr(hd), str.slice(1)));
	}
	return _elm_lang$core$Maybe$Nothing;
}
function append(a, b)
{
	return a + b;
}
function concat(strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join('');
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
		out[i] = f(_elm_lang$core$Native_Utils.chr(out[i]));
	}
	return out.join('');
}
function filter(pred, str)
{
	return str.split('').map(_elm_lang$core$Native_Utils.chr).filter(pred).join('');
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
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function foldr(f, b, str)
{
	for (var i = str.length; i--; )
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function split(sep, str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(sep));
}
function join(sep, strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join(sep);
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
	return _elm_lang$core$Native_List.fromArray(str.trim().split(/\s+/g));
}
function lines(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(/\r\n|\r|\n/g));
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
		if (pred(_elm_lang$core$Native_Utils.chr(str[i])))
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
		if (!pred(_elm_lang$core$Native_Utils.chr(str[i])))
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
	
	if (subLen < 1)
	{
		return _elm_lang$core$Native_List.Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}	
	
	return _elm_lang$core$Native_List.fromArray(is);
}

function toInt(s)
{
	var len = s.length;
	if (len === 0)
	{
		return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int" );
	}
	var start = 0;
	if (s[0] === '-')
	{
		if (len === 1)
		{
			return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int" );
		}
		start = 1;
	}
	for (var i = start; i < len; ++i)
	{
		var c = s[i];
		if (c < '0' || '9' < c)
		{
			return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int" );
		}
	}
	return _elm_lang$core$Result$Ok(parseInt(s, 10));
}

function toFloat(s)
{
	var len = s.length;
	if (len === 0)
	{
		return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float" );
	}
	var start = 0;
	if (s[0] === '-')
	{
		if (len === 1)
		{
			return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float" );
		}
		start = 1;
	}
	var dotCount = 0;
	for (var i = start; i < len; ++i)
	{
		var c = s[i];
		if ('0' <= c && c <= '9')
		{
			continue;
		}
		if (c === '.')
		{
			dotCount += 1;
			if (dotCount <= 1)
			{
				continue;
			}
		}
		return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float" );
	}
	return _elm_lang$core$Result$Ok(parseFloat(s));
}

function toList(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split('').map(_elm_lang$core$Native_Utils.chr));
}
function fromList(chars)
{
	return _elm_lang$core$Native_List.toArray(chars).join('');
}

return {
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

}();

//import Native.Utils //

var _elm_lang$core$Native_Char = function() {

return {
	fromCode: function(c) { return _elm_lang$core$Native_Utils.chr(String.fromCharCode(c)); },
	toCode: function(c) { return c.charCodeAt(0); },
	toUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toUpperCase()); },
	toLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLowerCase()); },
	toLocaleUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleUpperCase()); },
	toLocaleLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleLowerCase()); }
};

}();
var _elm_lang$core$Char$fromCode = _elm_lang$core$Native_Char.fromCode;
var _elm_lang$core$Char$toCode = _elm_lang$core$Native_Char.toCode;
var _elm_lang$core$Char$toLocaleLower = _elm_lang$core$Native_Char.toLocaleLower;
var _elm_lang$core$Char$toLocaleUpper = _elm_lang$core$Native_Char.toLocaleUpper;
var _elm_lang$core$Char$toLower = _elm_lang$core$Native_Char.toLower;
var _elm_lang$core$Char$toUpper = _elm_lang$core$Native_Char.toUpper;
var _elm_lang$core$Char$isBetween = F3(
	function (low, high, $char) {
		var code = _elm_lang$core$Char$toCode($char);
		return (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(low)) > -1) && (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(high)) < 1);
	});
var _elm_lang$core$Char$isUpper = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('A'),
	_elm_lang$core$Native_Utils.chr('Z'));
var _elm_lang$core$Char$isLower = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('a'),
	_elm_lang$core$Native_Utils.chr('z'));
var _elm_lang$core$Char$isDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('9'));
var _elm_lang$core$Char$isOctDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('7'));
var _elm_lang$core$Char$isHexDigit = function ($char) {
	return _elm_lang$core$Char$isDigit($char) || (A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('a'),
		_elm_lang$core$Native_Utils.chr('f'),
		$char) || A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('A'),
		_elm_lang$core$Native_Utils.chr('F'),
		$char));
};

var _elm_lang$core$String$fromList = _elm_lang$core$Native_String.fromList;
var _elm_lang$core$String$toList = _elm_lang$core$Native_String.toList;
var _elm_lang$core$String$toFloat = _elm_lang$core$Native_String.toFloat;
var _elm_lang$core$String$toInt = _elm_lang$core$Native_String.toInt;
var _elm_lang$core$String$indices = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$indexes = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$endsWith = _elm_lang$core$Native_String.endsWith;
var _elm_lang$core$String$startsWith = _elm_lang$core$Native_String.startsWith;
var _elm_lang$core$String$contains = _elm_lang$core$Native_String.contains;
var _elm_lang$core$String$all = _elm_lang$core$Native_String.all;
var _elm_lang$core$String$any = _elm_lang$core$Native_String.any;
var _elm_lang$core$String$toLower = _elm_lang$core$Native_String.toLower;
var _elm_lang$core$String$toUpper = _elm_lang$core$Native_String.toUpper;
var _elm_lang$core$String$lines = _elm_lang$core$Native_String.lines;
var _elm_lang$core$String$words = _elm_lang$core$Native_String.words;
var _elm_lang$core$String$trimRight = _elm_lang$core$Native_String.trimRight;
var _elm_lang$core$String$trimLeft = _elm_lang$core$Native_String.trimLeft;
var _elm_lang$core$String$trim = _elm_lang$core$Native_String.trim;
var _elm_lang$core$String$padRight = _elm_lang$core$Native_String.padRight;
var _elm_lang$core$String$padLeft = _elm_lang$core$Native_String.padLeft;
var _elm_lang$core$String$pad = _elm_lang$core$Native_String.pad;
var _elm_lang$core$String$dropRight = _elm_lang$core$Native_String.dropRight;
var _elm_lang$core$String$dropLeft = _elm_lang$core$Native_String.dropLeft;
var _elm_lang$core$String$right = _elm_lang$core$Native_String.right;
var _elm_lang$core$String$left = _elm_lang$core$Native_String.left;
var _elm_lang$core$String$slice = _elm_lang$core$Native_String.slice;
var _elm_lang$core$String$repeat = _elm_lang$core$Native_String.repeat;
var _elm_lang$core$String$join = _elm_lang$core$Native_String.join;
var _elm_lang$core$String$split = _elm_lang$core$Native_String.split;
var _elm_lang$core$String$foldr = _elm_lang$core$Native_String.foldr;
var _elm_lang$core$String$foldl = _elm_lang$core$Native_String.foldl;
var _elm_lang$core$String$reverse = _elm_lang$core$Native_String.reverse;
var _elm_lang$core$String$filter = _elm_lang$core$Native_String.filter;
var _elm_lang$core$String$map = _elm_lang$core$Native_String.map;
var _elm_lang$core$String$length = _elm_lang$core$Native_String.length;
var _elm_lang$core$String$concat = _elm_lang$core$Native_String.concat;
var _elm_lang$core$String$append = _elm_lang$core$Native_String.append;
var _elm_lang$core$String$uncons = _elm_lang$core$Native_String.uncons;
var _elm_lang$core$String$cons = _elm_lang$core$Native_String.cons;
var _elm_lang$core$String$fromChar = function ($char) {
	return A2(_elm_lang$core$String$cons, $char, '');
};
var _elm_lang$core$String$isEmpty = _elm_lang$core$Native_String.isEmpty;

var _elm_lang$core$Dict$foldr = F3(
	function (f, acc, t) {
		foldr:
		while (true) {
			var _p0 = t;
			if (_p0.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v1 = f,
					_v2 = A3(
					f,
					_p0._1,
					_p0._2,
					A3(_elm_lang$core$Dict$foldr, f, acc, _p0._4)),
					_v3 = _p0._3;
				f = _v1;
				acc = _v2;
				t = _v3;
				continue foldr;
			}
		}
	});
var _elm_lang$core$Dict$keys = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(_elm_lang$core$List_ops['::'], key, keyList);
			}),
		_elm_lang$core$Native_List.fromArray(
			[]),
		dict);
};
var _elm_lang$core$Dict$values = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2(_elm_lang$core$List_ops['::'], value, valueList);
			}),
		_elm_lang$core$Native_List.fromArray(
			[]),
		dict);
};
var _elm_lang$core$Dict$toList = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					_elm_lang$core$List_ops['::'],
					{ctor: '_Tuple2', _0: key, _1: value},
					list);
			}),
		_elm_lang$core$Native_List.fromArray(
			[]),
		dict);
};
var _elm_lang$core$Dict$foldl = F3(
	function (f, acc, dict) {
		foldl:
		while (true) {
			var _p1 = dict;
			if (_p1.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v5 = f,
					_v6 = A3(
					f,
					_p1._1,
					_p1._2,
					A3(_elm_lang$core$Dict$foldl, f, acc, _p1._3)),
					_v7 = _p1._4;
				f = _v5;
				acc = _v6;
				dict = _v7;
				continue foldl;
			}
		}
	});
var _elm_lang$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _p2) {
				stepState:
				while (true) {
					var _p3 = _p2;
					var _p9 = _p3._1;
					var _p8 = _p3._0;
					var _p4 = _p8;
					if (_p4.ctor === '[]') {
						return {
							ctor: '_Tuple2',
							_0: _p8,
							_1: A3(rightStep, rKey, rValue, _p9)
						};
					} else {
						var _p7 = _p4._1;
						var _p6 = _p4._0._1;
						var _p5 = _p4._0._0;
						if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) < 0) {
							var _v10 = rKey,
								_v11 = rValue,
								_v12 = {
								ctor: '_Tuple2',
								_0: _p7,
								_1: A3(leftStep, _p5, _p6, _p9)
							};
							rKey = _v10;
							rValue = _v11;
							_p2 = _v12;
							continue stepState;
						} else {
							if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) > 0) {
								return {
									ctor: '_Tuple2',
									_0: _p8,
									_1: A3(rightStep, rKey, rValue, _p9)
								};
							} else {
								return {
									ctor: '_Tuple2',
									_0: _p7,
									_1: A4(bothStep, _p5, _p6, rValue, _p9)
								};
							}
						}
					}
				}
			});
		var _p10 = A3(
			_elm_lang$core$Dict$foldl,
			stepState,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Dict$toList(leftDict),
				_1: initialResult
			},
			rightDict);
		var leftovers = _p10._0;
		var intermediateResult = _p10._1;
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p11, result) {
					var _p12 = _p11;
					return A3(leftStep, _p12._0, _p12._1, result);
				}),
			intermediateResult,
			leftovers);
	});
var _elm_lang$core$Dict$reportRemBug = F4(
	function (msg, c, lgot, rgot) {
		return _elm_lang$core$Native_Debug.crash(
			_elm_lang$core$String$concat(
				_elm_lang$core$Native_List.fromArray(
					[
						'Internal red-black tree invariant violated, expected ',
						msg,
						' and got ',
						_elm_lang$core$Basics$toString(c),
						'/',
						lgot,
						'/',
						rgot,
						'\nPlease report this bug to <https://github.com/elm-lang/core/issues>'
					])));
	});
var _elm_lang$core$Dict$isBBlack = function (dict) {
	var _p13 = dict;
	_v14_2:
	do {
		if (_p13.ctor === 'RBNode_elm_builtin') {
			if (_p13._0.ctor === 'BBlack') {
				return true;
			} else {
				break _v14_2;
			}
		} else {
			if (_p13._0.ctor === 'LBBlack') {
				return true;
			} else {
				break _v14_2;
			}
		}
	} while(false);
	return false;
};
var _elm_lang$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			var _p14 = dict;
			if (_p14.ctor === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var _v16 = A2(_elm_lang$core$Dict$sizeHelp, n + 1, _p14._4),
					_v17 = _p14._3;
				n = _v16;
				dict = _v17;
				continue sizeHelp;
			}
		}
	});
var _elm_lang$core$Dict$size = function (dict) {
	return A2(_elm_lang$core$Dict$sizeHelp, 0, dict);
};
var _elm_lang$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			var _p15 = dict;
			if (_p15.ctor === 'RBEmpty_elm_builtin') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p16 = A2(_elm_lang$core$Basics$compare, targetKey, _p15._1);
				switch (_p16.ctor) {
					case 'LT':
						var _v20 = targetKey,
							_v21 = _p15._3;
						targetKey = _v20;
						dict = _v21;
						continue get;
					case 'EQ':
						return _elm_lang$core$Maybe$Just(_p15._2);
					default:
						var _v22 = targetKey,
							_v23 = _p15._4;
						targetKey = _v22;
						dict = _v23;
						continue get;
				}
			}
		}
	});
var _elm_lang$core$Dict$member = F2(
	function (key, dict) {
		var _p17 = A2(_elm_lang$core$Dict$get, key, dict);
		if (_p17.ctor === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var _elm_lang$core$Dict$maxWithDefault = F3(
	function (k, v, r) {
		maxWithDefault:
		while (true) {
			var _p18 = r;
			if (_p18.ctor === 'RBEmpty_elm_builtin') {
				return {ctor: '_Tuple2', _0: k, _1: v};
			} else {
				var _v26 = _p18._1,
					_v27 = _p18._2,
					_v28 = _p18._4;
				k = _v26;
				v = _v27;
				r = _v28;
				continue maxWithDefault;
			}
		}
	});
var _elm_lang$core$Dict$NBlack = {ctor: 'NBlack'};
var _elm_lang$core$Dict$BBlack = {ctor: 'BBlack'};
var _elm_lang$core$Dict$Black = {ctor: 'Black'};
var _elm_lang$core$Dict$blackish = function (t) {
	var _p19 = t;
	if (_p19.ctor === 'RBNode_elm_builtin') {
		var _p20 = _p19._0;
		return _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$Black) || _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$BBlack);
	} else {
		return true;
	}
};
var _elm_lang$core$Dict$Red = {ctor: 'Red'};
var _elm_lang$core$Dict$moreBlack = function (color) {
	var _p21 = color;
	switch (_p21.ctor) {
		case 'Black':
			return _elm_lang$core$Dict$BBlack;
		case 'Red':
			return _elm_lang$core$Dict$Black;
		case 'NBlack':
			return _elm_lang$core$Dict$Red;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a double black node more black!');
	}
};
var _elm_lang$core$Dict$lessBlack = function (color) {
	var _p22 = color;
	switch (_p22.ctor) {
		case 'BBlack':
			return _elm_lang$core$Dict$Black;
		case 'Black':
			return _elm_lang$core$Dict$Red;
		case 'Red':
			return _elm_lang$core$Dict$NBlack;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a negative black node less black!');
	}
};
var _elm_lang$core$Dict$LBBlack = {ctor: 'LBBlack'};
var _elm_lang$core$Dict$LBlack = {ctor: 'LBlack'};
var _elm_lang$core$Dict$RBEmpty_elm_builtin = function (a) {
	return {ctor: 'RBEmpty_elm_builtin', _0: a};
};
var _elm_lang$core$Dict$empty = _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
var _elm_lang$core$Dict$isEmpty = function (dict) {
	return _elm_lang$core$Native_Utils.eq(dict, _elm_lang$core$Dict$empty);
};
var _elm_lang$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {ctor: 'RBNode_elm_builtin', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _elm_lang$core$Dict$ensureBlackRoot = function (dict) {
	var _p23 = dict;
	if ((_p23.ctor === 'RBNode_elm_builtin') && (_p23._0.ctor === 'Red')) {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p23._1, _p23._2, _p23._3, _p23._4);
	} else {
		return dict;
	}
};
var _elm_lang$core$Dict$lessBlackTree = function (dict) {
	var _p24 = dict;
	if (_p24.ctor === 'RBNode_elm_builtin') {
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$lessBlack(_p24._0),
			_p24._1,
			_p24._2,
			_p24._3,
			_p24._4);
	} else {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	}
};
var _elm_lang$core$Dict$balancedTree = function (col) {
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
											return A5(
												_elm_lang$core$Dict$RBNode_elm_builtin,
												_elm_lang$core$Dict$lessBlack(col),
												yk,
												yv,
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, xk, xv, a, b),
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, zk, zv, c, d));
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
var _elm_lang$core$Dict$blacken = function (t) {
	var _p25 = t;
	if (_p25.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p25._1, _p25._2, _p25._3, _p25._4);
	}
};
var _elm_lang$core$Dict$redden = function (t) {
	var _p26 = t;
	if (_p26.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Native_Debug.crash('can\'t make a Leaf red');
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, _p26._1, _p26._2, _p26._3, _p26._4);
	}
};
var _elm_lang$core$Dict$balanceHelp = function (tree) {
	var _p27 = tree;
	_v36_6:
	do {
		_v36_5:
		do {
			_v36_4:
			do {
				_v36_3:
				do {
					_v36_2:
					do {
						_v36_1:
						do {
							_v36_0:
							do {
								if (_p27.ctor === 'RBNode_elm_builtin') {
									if (_p27._3.ctor === 'RBNode_elm_builtin') {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._3._0.ctor) {
												case 'Red':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																		break _v36_2;
																	} else {
																		if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																			break _v36_3;
																		} else {
																			break _v36_6;
																		}
																	}
																}
															}
														case 'NBlack':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																		break _v36_4;
																	} else {
																		break _v36_6;
																	}
																}
															}
														default:
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	break _v36_6;
																}
															}
													}
												case 'NBlack':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															}
														case 'NBlack':
															if (_p27._0.ctor === 'BBlack') {
																if ((((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																	break _v36_4;
																} else {
																	if ((((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															} else {
																break _v36_6;
															}
														default:
															if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																break _v36_5;
															} else {
																break _v36_6;
															}
													}
												default:
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	break _v36_6;
																}
															}
														case 'NBlack':
															if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																break _v36_4;
															} else {
																break _v36_6;
															}
														default:
															break _v36_6;
													}
											}
										} else {
											switch (_p27._3._0.ctor) {
												case 'Red':
													if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
														break _v36_0;
													} else {
														if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
															break _v36_1;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
														break _v36_5;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										}
									} else {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._4._0.ctor) {
												case 'Red':
													if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
														break _v36_2;
													} else {
														if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
															break _v36_3;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
														break _v36_4;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										} else {
											break _v36_6;
										}
									}
								} else {
									break _v36_6;
								}
							} while(false);
							return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._3._1)(_p27._3._3._2)(_p27._3._1)(_p27._3._2)(_p27._1)(_p27._2)(_p27._3._3._3)(_p27._3._3._4)(_p27._3._4)(_p27._4);
						} while(false);
						return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._1)(_p27._3._2)(_p27._3._4._1)(_p27._3._4._2)(_p27._1)(_p27._2)(_p27._3._3)(_p27._3._4._3)(_p27._3._4._4)(_p27._4);
					} while(false);
					return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._3._1)(_p27._4._3._2)(_p27._4._1)(_p27._4._2)(_p27._3)(_p27._4._3._3)(_p27._4._3._4)(_p27._4._4);
				} while(false);
				return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._1)(_p27._4._2)(_p27._4._4._1)(_p27._4._4._2)(_p27._3)(_p27._4._3)(_p27._4._4._3)(_p27._4._4._4);
			} while(false);
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_elm_lang$core$Dict$Black,
				_p27._4._3._1,
				_p27._4._3._2,
				A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3, _p27._4._3._3),
				A5(
					_elm_lang$core$Dict$balance,
					_elm_lang$core$Dict$Black,
					_p27._4._1,
					_p27._4._2,
					_p27._4._3._4,
					_elm_lang$core$Dict$redden(_p27._4._4)));
		} while(false);
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$Black,
			_p27._3._4._1,
			_p27._3._4._2,
			A5(
				_elm_lang$core$Dict$balance,
				_elm_lang$core$Dict$Black,
				_p27._3._1,
				_p27._3._2,
				_elm_lang$core$Dict$redden(_p27._3._3),
				_p27._3._4._3),
			A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3._4._4, _p27._4));
	} while(false);
	return tree;
};
var _elm_lang$core$Dict$balance = F5(
	function (c, k, v, l, r) {
		var tree = A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
		return _elm_lang$core$Dict$blackish(tree) ? _elm_lang$core$Dict$balanceHelp(tree) : tree;
	});
var _elm_lang$core$Dict$bubble = F5(
	function (c, k, v, l, r) {
		return (_elm_lang$core$Dict$isBBlack(l) || _elm_lang$core$Dict$isBBlack(r)) ? A5(
			_elm_lang$core$Dict$balance,
			_elm_lang$core$Dict$moreBlack(c),
			k,
			v,
			_elm_lang$core$Dict$lessBlackTree(l),
			_elm_lang$core$Dict$lessBlackTree(r)) : A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
	});
var _elm_lang$core$Dict$removeMax = F5(
	function (c, k, v, l, r) {
		var _p28 = r;
		if (_p28.ctor === 'RBEmpty_elm_builtin') {
			return A3(_elm_lang$core$Dict$rem, c, l, r);
		} else {
			return A5(
				_elm_lang$core$Dict$bubble,
				c,
				k,
				v,
				l,
				A5(_elm_lang$core$Dict$removeMax, _p28._0, _p28._1, _p28._2, _p28._3, _p28._4));
		}
	});
var _elm_lang$core$Dict$rem = F3(
	function (c, l, r) {
		var _p29 = {ctor: '_Tuple2', _0: l, _1: r};
		if (_p29._0.ctor === 'RBEmpty_elm_builtin') {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p30 = c;
				switch (_p30.ctor) {
					case 'Red':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
					case 'Black':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBBlack);
					default:
						return _elm_lang$core$Native_Debug.crash('cannot have bblack or nblack nodes at this point');
				}
			} else {
				var _p33 = _p29._1._0;
				var _p32 = _p29._0._0;
				var _p31 = {ctor: '_Tuple3', _0: c, _1: _p32, _2: _p33};
				if ((((_p31.ctor === '_Tuple3') && (_p31._0.ctor === 'Black')) && (_p31._1.ctor === 'LBlack')) && (_p31._2.ctor === 'Red')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._1._1, _p29._1._2, _p29._1._3, _p29._1._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/LBlack/Red',
						c,
						_elm_lang$core$Basics$toString(_p32),
						_elm_lang$core$Basics$toString(_p33));
				}
			}
		} else {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p36 = _p29._1._0;
				var _p35 = _p29._0._0;
				var _p34 = {ctor: '_Tuple3', _0: c, _1: _p35, _2: _p36};
				if ((((_p34.ctor === '_Tuple3') && (_p34._0.ctor === 'Black')) && (_p34._1.ctor === 'Red')) && (_p34._2.ctor === 'LBlack')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._0._1, _p29._0._2, _p29._0._3, _p29._0._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/Red/LBlack',
						c,
						_elm_lang$core$Basics$toString(_p35),
						_elm_lang$core$Basics$toString(_p36));
				}
			} else {
				var _p40 = _p29._0._2;
				var _p39 = _p29._0._4;
				var _p38 = _p29._0._1;
				var l$ = A5(_elm_lang$core$Dict$removeMax, _p29._0._0, _p38, _p40, _p29._0._3, _p39);
				var _p37 = A3(_elm_lang$core$Dict$maxWithDefault, _p38, _p40, _p39);
				var k = _p37._0;
				var v = _p37._1;
				return A5(_elm_lang$core$Dict$bubble, c, k, v, l$, r);
			}
		}
	});
var _elm_lang$core$Dict$map = F2(
	function (f, dict) {
		var _p41 = dict;
		if (_p41.ctor === 'RBEmpty_elm_builtin') {
			return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
		} else {
			var _p42 = _p41._1;
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_p41._0,
				_p42,
				A2(f, _p42, _p41._2),
				A2(_elm_lang$core$Dict$map, f, _p41._3),
				A2(_elm_lang$core$Dict$map, f, _p41._4));
		}
	});
var _elm_lang$core$Dict$Same = {ctor: 'Same'};
var _elm_lang$core$Dict$Remove = {ctor: 'Remove'};
var _elm_lang$core$Dict$Insert = {ctor: 'Insert'};
var _elm_lang$core$Dict$update = F3(
	function (k, alter, dict) {
		var up = function (dict) {
			var _p43 = dict;
			if (_p43.ctor === 'RBEmpty_elm_builtin') {
				var _p44 = alter(_elm_lang$core$Maybe$Nothing);
				if (_p44.ctor === 'Nothing') {
					return {ctor: '_Tuple2', _0: _elm_lang$core$Dict$Same, _1: _elm_lang$core$Dict$empty};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Dict$Insert,
						_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, k, _p44._0, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty)
					};
				}
			} else {
				var _p55 = _p43._2;
				var _p54 = _p43._4;
				var _p53 = _p43._3;
				var _p52 = _p43._1;
				var _p51 = _p43._0;
				var _p45 = A2(_elm_lang$core$Basics$compare, k, _p52);
				switch (_p45.ctor) {
					case 'EQ':
						var _p46 = alter(
							_elm_lang$core$Maybe$Just(_p55));
						if (_p46.ctor === 'Nothing') {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Remove,
								_1: A3(_elm_lang$core$Dict$rem, _p51, _p53, _p54)
							};
						} else {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Same,
								_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p46._0, _p53, _p54)
							};
						}
					case 'LT':
						var _p47 = up(_p53);
						var flag = _p47._0;
						var newLeft = _p47._1;
						var _p48 = flag;
						switch (_p48.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, newLeft, _p54)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, newLeft, _p54)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, newLeft, _p54)
								};
						}
					default:
						var _p49 = up(_p54);
						var flag = _p49._0;
						var newRight = _p49._1;
						var _p50 = flag;
						switch (_p50.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, _p53, newRight)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, _p53, newRight)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, _p53, newRight)
								};
						}
				}
			}
		};
		var _p56 = up(dict);
		var flag = _p56._0;
		var updatedDict = _p56._1;
		var _p57 = flag;
		switch (_p57.ctor) {
			case 'Same':
				return updatedDict;
			case 'Insert':
				return _elm_lang$core$Dict$ensureBlackRoot(updatedDict);
			default:
				return _elm_lang$core$Dict$blacken(updatedDict);
		}
	});
var _elm_lang$core$Dict$insert = F3(
	function (key, value, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(
				_elm_lang$core$Maybe$Just(value)),
			dict);
	});
var _elm_lang$core$Dict$singleton = F2(
	function (key, value) {
		return A3(_elm_lang$core$Dict$insert, key, value, _elm_lang$core$Dict$empty);
	});
var _elm_lang$core$Dict$union = F2(
	function (t1, t2) {
		return A3(_elm_lang$core$Dict$foldl, _elm_lang$core$Dict$insert, t2, t1);
	});
var _elm_lang$core$Dict$filter = F2(
	function (predicate, dictionary) {
		var add = F3(
			function (key, value, dict) {
				return A2(predicate, key, value) ? A3(_elm_lang$core$Dict$insert, key, value, dict) : dict;
			});
		return A3(_elm_lang$core$Dict$foldl, add, _elm_lang$core$Dict$empty, dictionary);
	});
var _elm_lang$core$Dict$intersect = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Dict$filter,
			F2(
				function (k, _p58) {
					return A2(_elm_lang$core$Dict$member, k, t2);
				}),
			t1);
	});
var _elm_lang$core$Dict$partition = F2(
	function (predicate, dict) {
		var add = F3(
			function (key, value, _p59) {
				var _p60 = _p59;
				var _p62 = _p60._1;
				var _p61 = _p60._0;
				return A2(predicate, key, value) ? {
					ctor: '_Tuple2',
					_0: A3(_elm_lang$core$Dict$insert, key, value, _p61),
					_1: _p62
				} : {
					ctor: '_Tuple2',
					_0: _p61,
					_1: A3(_elm_lang$core$Dict$insert, key, value, _p62)
				};
			});
		return A3(
			_elm_lang$core$Dict$foldl,
			add,
			{ctor: '_Tuple2', _0: _elm_lang$core$Dict$empty, _1: _elm_lang$core$Dict$empty},
			dict);
	});
var _elm_lang$core$Dict$fromList = function (assocs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p63, dict) {
				var _p64 = _p63;
				return A3(_elm_lang$core$Dict$insert, _p64._0, _p64._1, dict);
			}),
		_elm_lang$core$Dict$empty,
		assocs);
};
var _elm_lang$core$Dict$remove = F2(
	function (key, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing),
			dict);
	});
var _elm_lang$core$Dict$diff = F2(
	function (t1, t2) {
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, v, t) {
					return A2(_elm_lang$core$Dict$remove, k, t);
				}),
			t1,
			t2);
	});

//import Maybe, Native.Array, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_Json = function() {


// CORE DECODERS

function succeed(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'succeed',
		msg: msg
	};
}

function fail(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'fail',
		msg: msg
	};
}

function decodePrimitive(tag)
{
	return {
		ctor: '<decoder>',
		tag: tag
	};
}

function decodeContainer(tag, decoder)
{
	return {
		ctor: '<decoder>',
		tag: tag,
		decoder: decoder
	};
}

function decodeNull(value)
{
	return {
		ctor: '<decoder>',
		tag: 'null',
		value: value
	};
}

function decodeField(field, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'field',
		field: field,
		decoder: decoder
	};
}

function decodeKeyValuePairs(decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'key-value',
		decoder: decoder
	};
}

function decodeObject(f, decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'map-many',
		func: f,
		decoders: decoders
	};
}

function decodeTuple(f, decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'tuple',
		func: f,
		decoders: decoders
	};
}

function andThen(decoder, callback)
{
	return {
		ctor: '<decoder>',
		tag: 'andThen',
		decoder: decoder,
		callback: callback
	};
}

function customAndThen(decoder, callback)
{
	return {
		ctor: '<decoder>',
		tag: 'customAndThen',
		decoder: decoder,
		callback: callback
	};
}

function oneOf(decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'oneOf',
		decoders: decoders
	};
}


// DECODING OBJECTS

function decodeObject1(f, d1)
{
	return decodeObject(f, [d1]);
}

function decodeObject2(f, d1, d2)
{
	return decodeObject(f, [d1, d2]);
}

function decodeObject3(f, d1, d2, d3)
{
	return decodeObject(f, [d1, d2, d3]);
}

function decodeObject4(f, d1, d2, d3, d4)
{
	return decodeObject(f, [d1, d2, d3, d4]);
}

function decodeObject5(f, d1, d2, d3, d4, d5)
{
	return decodeObject(f, [d1, d2, d3, d4, d5]);
}

function decodeObject6(f, d1, d2, d3, d4, d5, d6)
{
	return decodeObject(f, [d1, d2, d3, d4, d5, d6]);
}

function decodeObject7(f, d1, d2, d3, d4, d5, d6, d7)
{
	return decodeObject(f, [d1, d2, d3, d4, d5, d6, d7]);
}

function decodeObject8(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return decodeObject(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
}


// DECODING TUPLES

function decodeTuple1(f, d1)
{
	return decodeTuple(f, [d1]);
}

function decodeTuple2(f, d1, d2)
{
	return decodeTuple(f, [d1, d2]);
}

function decodeTuple3(f, d1, d2, d3)
{
	return decodeTuple(f, [d1, d2, d3]);
}

function decodeTuple4(f, d1, d2, d3, d4)
{
	return decodeTuple(f, [d1, d2, d3, d4]);
}

function decodeTuple5(f, d1, d2, d3, d4, d5)
{
	return decodeTuple(f, [d1, d2, d3, d4, d5]);
}

function decodeTuple6(f, d1, d2, d3, d4, d5, d6)
{
	return decodeTuple(f, [d1, d2, d3, d4, d5, d6]);
}

function decodeTuple7(f, d1, d2, d3, d4, d5, d6, d7)
{
	return decodeTuple(f, [d1, d2, d3, d4, d5, d6, d7]);
}

function decodeTuple8(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return decodeTuple(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
}


// DECODE HELPERS

function ok(value)
{
	return { tag: 'ok', value: value };
}

function badPrimitive(type, value)
{
	return { tag: 'primitive', type: type, value: value };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badField(field, nestedProblems)
{
	return { tag: 'field', field: field, rest: nestedProblems };
}

function badOneOf(problems)
{
	return { tag: 'oneOf', problems: problems };
}

function badCustom(msg)
{
	return { tag: 'custom', msg: msg };
}

function bad(msg)
{
	return { tag: 'fail', msg: msg };
}

function badToString(problem)
{
	var context = '_';
	while (problem)
	{
		switch (problem.tag)
		{
			case 'primitive':
				return 'Expecting ' + problem.type
					+ (context === '_' ? '' : ' at ' + context)
					+ ' but instead got: ' + jsToString(problem.value);

			case 'index':
				context += '[' + problem.index + ']';
				problem = problem.rest;
				break;

			case 'field':
				context += '.' + problem.field;
				problem = problem.rest;
				break;

			case 'oneOf':
				var problems = problem.problems;
				for (var i = 0; i < problems.length; i++)
				{
					problems[i] = badToString(problems[i]);
				}
				return 'I ran into the following problems'
					+ (context === '_' ? '' : ' at ' + context)
					+ ':\n\n' + problems.join('\n');

			case 'custom':
				return 'A `customDecoder` failed'
					+ (context === '_' ? '' : ' at ' + context)
					+ ' with the message: ' + problem.msg;

			case 'fail':
				return 'I ran into a `fail` decoder'
					+ (context === '_' ? '' : ' at ' + context)
					+ ': ' + problem.msg;
		}
	}
}

function jsToString(value)
{
	return value === undefined
		? 'undefined'
		: JSON.stringify(value);
}


// DECODE

function runOnString(decoder, string)
{
	var json;
	try
	{
		json = JSON.parse(string);
	}
	catch (e)
	{
		return _elm_lang$core$Result$Err('Given an invalid JSON: ' + e.message);
	}
	return run(decoder, json);
}

function run(decoder, value)
{
	var result = runHelp(decoder, value);
	return (result.tag === 'ok')
		? _elm_lang$core$Result$Ok(result.value)
		: _elm_lang$core$Result$Err(badToString(result));
}

function runHelp(decoder, value)
{
	switch (decoder.tag)
	{
		case 'bool':
			return (typeof value === 'boolean')
				? ok(value)
				: badPrimitive('a Bool', value);

		case 'int':
			if (typeof value !== 'number') {
				return badPrimitive('an Int', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return ok(value);
			}

			return badPrimitive('an Int', value);

		case 'float':
			return (typeof value === 'number')
				? ok(value)
				: badPrimitive('a Float', value);

		case 'string':
			return (typeof value === 'string')
				? ok(value)
				: (value instanceof String)
					? ok(value + '')
					: badPrimitive('a String', value);

		case 'null':
			return (value === null)
				? ok(decoder.value)
				: badPrimitive('null', value);

		case 'value':
			return ok(value);

		case 'list':
			if (!(value instanceof Array))
			{
				return badPrimitive('a List', value);
			}

			var list = _elm_lang$core$Native_List.Nil;
			for (var i = value.length; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result)
				}
				list = _elm_lang$core$Native_List.Cons(result.value, list);
			}
			return ok(list);

		case 'array':
			if (!(value instanceof Array))
			{
				return badPrimitive('an Array', value);
			}

			var len = value.length;
			var array = new Array(len);
			for (var i = len; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result);
				}
				array[i] = result.value;
			}
			return ok(_elm_lang$core$Native_Array.fromJSArray(array));

		case 'maybe':
			var result = runHelp(decoder.decoder, value);
			return (result.tag === 'ok')
				? ok(_elm_lang$core$Maybe$Just(result.value))
				: ok(_elm_lang$core$Maybe$Nothing);

		case 'field':
			var field = decoder.field;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return badPrimitive('an object with a field named `' + field + '`', value);
			}

			var result = runHelp(decoder.decoder, value[field]);
			return (result.tag === 'ok')
				? result
				: badField(field, result);

		case 'key-value':
			if (typeof value !== 'object' || value === null || value instanceof Array)
			{
				return badPrimitive('an object', value);
			}

			var keyValuePairs = _elm_lang$core$Native_List.Nil;
			for (var key in value)
			{
				var result = runHelp(decoder.decoder, value[key]);
				if (result.tag !== 'ok')
				{
					return badField(key, result);
				}
				var pair = _elm_lang$core$Native_Utils.Tuple2(key, result.value);
				keyValuePairs = _elm_lang$core$Native_List.Cons(pair, keyValuePairs);
			}
			return ok(keyValuePairs);

		case 'map-many':
			var answer = decoder.func;
			var decoders = decoder.decoders;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = runHelp(decoders[i], value);
				if (result.tag !== 'ok')
				{
					return result;
				}
				answer = answer(result.value);
			}
			return ok(answer);

		case 'tuple':
			var decoders = decoder.decoders;
			var len = decoders.length;

			if ( !(value instanceof Array) || value.length !== len )
			{
				return badPrimitive('a Tuple with ' + len + ' entries', value);
			}

			var answer = decoder.func;
			for (var i = 0; i < len; i++)
			{
				var result = runHelp(decoders[i], value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result);
				}
				answer = answer(result.value);
			}
			return ok(answer);

		case 'customAndThen':
			var result = runHelp(decoder.decoder, value);
			if (result.tag !== 'ok')
			{
				return result;
			}
			var realResult = decoder.callback(result.value);
			if (realResult.ctor === 'Err')
			{
				return badCustom(realResult._0);
			}
			return ok(realResult._0);

		case 'andThen':
			var result = runHelp(decoder.decoder, value);
			return (result.tag !== 'ok')
				? result
				: runHelp(decoder.callback(result.value), value);

		case 'oneOf':
			var errors = [];
			var temp = decoder.decoders;
			while (temp.ctor !== '[]')
			{
				var result = runHelp(temp._0, value);

				if (result.tag === 'ok')
				{
					return result;
				}

				errors.push(result);

				temp = temp._1;
			}
			return badOneOf(errors);

		case 'fail':
			return bad(decoder.msg);

		case 'succeed':
			return ok(decoder.msg);
	}
}


// EQUALITY

function equality(a, b)
{
	if (a === b)
	{
		return true;
	}

	if (a.tag !== b.tag)
	{
		return false;
	}

	switch (a.tag)
	{
		case 'succeed':
		case 'fail':
			return a.msg === b.msg;

		case 'bool':
		case 'int':
		case 'float':
		case 'string':
		case 'value':
			return true;

		case 'null':
			return a.value === b.value;

		case 'list':
		case 'array':
		case 'maybe':
		case 'key-value':
			return equality(a.decoder, b.decoder);

		case 'field':
			return a.field === b.field && equality(a.decoder, b.decoder);

		case 'map-many':
		case 'tuple':
			if (a.func !== b.func)
			{
				return false;
			}
			return listEquality(a.decoders, b.decoders);

		case 'andThen':
		case 'customAndThen':
			return a.callback === b.callback && equality(a.decoder, b.decoder);

		case 'oneOf':
			return listEquality(a.decoders, b.decoders);
	}
}

function listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

function encode(indentLevel, value)
{
	return JSON.stringify(value, null, indentLevel);
}

function identity(value)
{
	return value;
}

function encodeObject(keyValuePairs)
{
	var obj = {};
	while (keyValuePairs.ctor !== '[]')
	{
		var pair = keyValuePairs._0;
		obj[pair._0] = pair._1;
		keyValuePairs = keyValuePairs._1;
	}
	return obj;
}

return {
	encode: F2(encode),
	runOnString: F2(runOnString),
	run: F2(run),

	decodeNull: decodeNull,
	decodePrimitive: decodePrimitive,
	decodeContainer: F2(decodeContainer),

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
	customAndThen: F2(customAndThen),
	fail: fail,
	succeed: succeed,
	oneOf: oneOf,

	identity: identity,
	encodeNull: null,
	encodeArray: _elm_lang$core$Native_Array.toJSArray,
	encodeList: _elm_lang$core$Native_List.toArray,
	encodeObject: encodeObject,

	equality: equality
};

}();

var _elm_lang$core$Json_Encode$list = _elm_lang$core$Native_Json.encodeList;
var _elm_lang$core$Json_Encode$array = _elm_lang$core$Native_Json.encodeArray;
var _elm_lang$core$Json_Encode$object = _elm_lang$core$Native_Json.encodeObject;
var _elm_lang$core$Json_Encode$null = _elm_lang$core$Native_Json.encodeNull;
var _elm_lang$core$Json_Encode$bool = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$float = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$int = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$string = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$encode = _elm_lang$core$Native_Json.encode;
var _elm_lang$core$Json_Encode$Value = {ctor: 'Value'};

var _elm_lang$core$Json_Decode$tuple8 = _elm_lang$core$Native_Json.decodeTuple8;
var _elm_lang$core$Json_Decode$tuple7 = _elm_lang$core$Native_Json.decodeTuple7;
var _elm_lang$core$Json_Decode$tuple6 = _elm_lang$core$Native_Json.decodeTuple6;
var _elm_lang$core$Json_Decode$tuple5 = _elm_lang$core$Native_Json.decodeTuple5;
var _elm_lang$core$Json_Decode$tuple4 = _elm_lang$core$Native_Json.decodeTuple4;
var _elm_lang$core$Json_Decode$tuple3 = _elm_lang$core$Native_Json.decodeTuple3;
var _elm_lang$core$Json_Decode$tuple2 = _elm_lang$core$Native_Json.decodeTuple2;
var _elm_lang$core$Json_Decode$tuple1 = _elm_lang$core$Native_Json.decodeTuple1;
var _elm_lang$core$Json_Decode$succeed = _elm_lang$core$Native_Json.succeed;
var _elm_lang$core$Json_Decode$fail = _elm_lang$core$Native_Json.fail;
var _elm_lang$core$Json_Decode$andThen = _elm_lang$core$Native_Json.andThen;
var _elm_lang$core$Json_Decode$customDecoder = _elm_lang$core$Native_Json.customAndThen;
var _elm_lang$core$Json_Decode$decodeValue = _elm_lang$core$Native_Json.run;
var _elm_lang$core$Json_Decode$value = _elm_lang$core$Native_Json.decodePrimitive('value');
var _elm_lang$core$Json_Decode$maybe = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'maybe', decoder);
};
var _elm_lang$core$Json_Decode$null = _elm_lang$core$Native_Json.decodeNull;
var _elm_lang$core$Json_Decode$array = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'array', decoder);
};
var _elm_lang$core$Json_Decode$list = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'list', decoder);
};
var _elm_lang$core$Json_Decode$bool = _elm_lang$core$Native_Json.decodePrimitive('bool');
var _elm_lang$core$Json_Decode$int = _elm_lang$core$Native_Json.decodePrimitive('int');
var _elm_lang$core$Json_Decode$float = _elm_lang$core$Native_Json.decodePrimitive('float');
var _elm_lang$core$Json_Decode$string = _elm_lang$core$Native_Json.decodePrimitive('string');
var _elm_lang$core$Json_Decode$oneOf = _elm_lang$core$Native_Json.oneOf;
var _elm_lang$core$Json_Decode$keyValuePairs = _elm_lang$core$Native_Json.decodeKeyValuePairs;
var _elm_lang$core$Json_Decode$object8 = _elm_lang$core$Native_Json.decodeObject8;
var _elm_lang$core$Json_Decode$object7 = _elm_lang$core$Native_Json.decodeObject7;
var _elm_lang$core$Json_Decode$object6 = _elm_lang$core$Native_Json.decodeObject6;
var _elm_lang$core$Json_Decode$object5 = _elm_lang$core$Native_Json.decodeObject5;
var _elm_lang$core$Json_Decode$object4 = _elm_lang$core$Native_Json.decodeObject4;
var _elm_lang$core$Json_Decode$object3 = _elm_lang$core$Native_Json.decodeObject3;
var _elm_lang$core$Json_Decode$object2 = _elm_lang$core$Native_Json.decodeObject2;
var _elm_lang$core$Json_Decode$object1 = _elm_lang$core$Native_Json.decodeObject1;
var _elm_lang$core$Json_Decode_ops = _elm_lang$core$Json_Decode_ops || {};
_elm_lang$core$Json_Decode_ops[':='] = _elm_lang$core$Native_Json.decodeField;
var _elm_lang$core$Json_Decode$at = F2(
	function (fields, decoder) {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, y) {
					return A2(_elm_lang$core$Json_Decode_ops[':='], x, y);
				}),
			decoder,
			fields);
	});
var _elm_lang$core$Json_Decode$decodeString = _elm_lang$core$Native_Json.runOnString;
var _elm_lang$core$Json_Decode$map = _elm_lang$core$Native_Json.decodeObject1;
var _elm_lang$core$Json_Decode$dict = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$Dict$fromList,
		_elm_lang$core$Json_Decode$keyValuePairs(decoder));
};
var _elm_lang$core$Json_Decode$Decoder = {ctor: 'Decoder'};

var _debois$elm_dom$DOM$className = A2(
	_elm_lang$core$Json_Decode$at,
	_elm_lang$core$Native_List.fromArray(
		['className']),
	_elm_lang$core$Json_Decode$string);
var _debois$elm_dom$DOM$scrollTop = A2(_elm_lang$core$Json_Decode_ops[':='], 'scrollTop', _elm_lang$core$Json_Decode$float);
var _debois$elm_dom$DOM$scrollLeft = A2(_elm_lang$core$Json_Decode_ops[':='], 'scrollLeft', _elm_lang$core$Json_Decode$float);
var _debois$elm_dom$DOM$offsetTop = A2(_elm_lang$core$Json_Decode_ops[':='], 'offsetTop', _elm_lang$core$Json_Decode$float);
var _debois$elm_dom$DOM$offsetLeft = A2(_elm_lang$core$Json_Decode_ops[':='], 'offsetLeft', _elm_lang$core$Json_Decode$float);
var _debois$elm_dom$DOM$offsetHeight = A2(_elm_lang$core$Json_Decode_ops[':='], 'offsetHeight', _elm_lang$core$Json_Decode$float);
var _debois$elm_dom$DOM$offsetWidth = A2(_elm_lang$core$Json_Decode_ops[':='], 'offsetWidth', _elm_lang$core$Json_Decode$float);
var _debois$elm_dom$DOM$childNodes = function (decoder) {
	var loop = F2(
		function (idx, xs) {
			return A2(
				_elm_lang$core$Json_Decode$andThen,
				_elm_lang$core$Json_Decode$maybe(
					A2(
						_elm_lang$core$Json_Decode_ops[':='],
						_elm_lang$core$Basics$toString(idx),
						decoder)),
				function (_p0) {
					return A2(
						_elm_lang$core$Maybe$withDefault,
						_elm_lang$core$Json_Decode$succeed(xs),
						A2(
							_elm_lang$core$Maybe$map,
							function (x) {
								return A2(
									loop,
									idx + 1,
									A2(_elm_lang$core$List_ops['::'], x, xs));
							},
							_p0));
				});
		});
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$List$reverse,
		A2(
			_elm_lang$core$Json_Decode_ops[':='],
			'childNodes',
			A2(
				loop,
				0,
				_elm_lang$core$Native_List.fromArray(
					[]))));
};
var _debois$elm_dom$DOM$childNode = function (idx) {
	return _elm_lang$core$Json_Decode$at(
		_elm_lang$core$Native_List.fromArray(
			[
				'childNodes',
				_elm_lang$core$Basics$toString(idx)
			]));
};
var _debois$elm_dom$DOM$parentElement = function (decoder) {
	return A2(_elm_lang$core$Json_Decode_ops[':='], 'parentElement', decoder);
};
var _debois$elm_dom$DOM$previousSibling = function (decoder) {
	return A2(_elm_lang$core$Json_Decode_ops[':='], 'previousSibling', decoder);
};
var _debois$elm_dom$DOM$nextSibling = function (decoder) {
	return A2(_elm_lang$core$Json_Decode_ops[':='], 'nextSibling', decoder);
};
var _debois$elm_dom$DOM$offsetParent = F2(
	function (x, decoder) {
		return _elm_lang$core$Json_Decode$oneOf(
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$core$Json_Decode_ops[':='],
					'offsetParent',
					_elm_lang$core$Json_Decode$null(x)),
					A2(_elm_lang$core$Json_Decode_ops[':='], 'offsetParent', decoder)
				]));
	});
var _debois$elm_dom$DOM$position = F2(
	function (x, y) {
		return A2(
			_elm_lang$core$Json_Decode$andThen,
			A5(
				_elm_lang$core$Json_Decode$object4,
				F4(
					function (scrollLeft, scrollTop, offsetLeft, offsetTop) {
						return {ctor: '_Tuple2', _0: (x + offsetLeft) - scrollLeft, _1: (y + offsetTop) - scrollTop};
					}),
				_debois$elm_dom$DOM$scrollLeft,
				_debois$elm_dom$DOM$scrollTop,
				_debois$elm_dom$DOM$offsetLeft,
				_debois$elm_dom$DOM$offsetTop),
			function (_p1) {
				var _p2 = _p1;
				var _p4 = _p2._1;
				var _p3 = _p2._0;
				return A2(
					_debois$elm_dom$DOM$offsetParent,
					{ctor: '_Tuple2', _0: _p3, _1: _p4},
					A2(_debois$elm_dom$DOM$position, _p3, _p4));
			});
	});
var _debois$elm_dom$DOM$boundingClientRect = A4(
	_elm_lang$core$Json_Decode$object3,
	F3(
		function (_p5, width, height) {
			var _p6 = _p5;
			return {top: _p6._1, left: _p6._0, width: width, height: height};
		}),
	A2(_debois$elm_dom$DOM$position, 0, 0),
	_debois$elm_dom$DOM$offsetWidth,
	_debois$elm_dom$DOM$offsetHeight);
var _debois$elm_dom$DOM$target = function (decoder) {
	return A2(_elm_lang$core$Json_Decode_ops[':='], 'target', decoder);
};
var _debois$elm_dom$DOM$Rectangle = F4(
	function (a, b, c, d) {
		return {top: a, left: b, width: c, height: d};
	});

//import Native.Json //

var _elm_lang$virtual_dom$Native_VirtualDom = function() {

var STYLE_KEY = 'STYLE';
var EVENT_KEY = 'EVENT';
var ATTR_KEY = 'ATTR';
var ATTR_NS_KEY = 'ATTR_NS';



////////////  VIRTUAL DOM NODES  ////////////


function text(string)
{
	return {
		type: 'text',
		text: string
	};
}


function node(tag)
{
	return F2(function(factList, kidList) {
		return nodeHelp(tag, factList, kidList);
	});
}


function nodeHelp(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function keyedNode(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid._1.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'keyed-node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function custom(factList, model, impl)
{
	var facts = organizeFacts(factList).facts;

	return {
		type: 'custom',
		facts: facts,
		model: model,
		impl: impl
	};
}


function map(tagger, node)
{
	return {
		type: 'tagger',
		tagger: tagger,
		node: node,
		descendantsCount: 1 + (node.descendantsCount || 0)
	};
}


function thunk(func, args, thunk)
{
	return {
		type: 'thunk',
		func: func,
		args: args,
		thunk: thunk,
		node: undefined
	};
}

function lazy(fn, a)
{
	return thunk(fn, [a], function() {
		return fn(a);
	});
}

function lazy2(fn, a, b)
{
	return thunk(fn, [a,b], function() {
		return A2(fn, a, b);
	});
}

function lazy3(fn, a, b, c)
{
	return thunk(fn, [a,b,c], function() {
		return A3(fn, a, b, c);
	});
}



// FACTS


function organizeFacts(factList)
{
	var namespace, facts = {};

	while (factList.ctor !== '[]')
	{
		var entry = factList._0;
		var key = entry.key;

		if (key === ATTR_KEY || key === ATTR_NS_KEY || key === EVENT_KEY)
		{
			var subFacts = facts[key] || {};
			subFacts[entry.realKey] = entry.value;
			facts[key] = subFacts;
		}
		else if (key === STYLE_KEY)
		{
			var styles = facts[key] || {};
			var styleList = entry.value;
			while (styleList.ctor !== '[]')
			{
				var style = styleList._0;
				styles[style._0] = style._1;
				styleList = styleList._1;
			}
			facts[key] = styles;
		}
		else if (key === 'namespace')
		{
			namespace = entry.value;
		}
		else
		{
			facts[key] = entry.value;
		}
		factList = factList._1;
	}

	return {
		facts: facts,
		namespace: namespace
	};
}



////////////  PROPERTIES AND ATTRIBUTES  ////////////


function style(value)
{
	return {
		key: STYLE_KEY,
		value: value
	};
}


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
		key: ATTR_KEY,
		realKey: key,
		value: value
	};
}


function attributeNS(namespace, key, value)
{
	return {
		key: ATTR_NS_KEY,
		realKey: key,
		value: {
			value: value,
			namespace: namespace
		}
	};
}


function on(name, options, decoder)
{
	return {
		key: EVENT_KEY,
		realKey: name,
		value: {
			options: options,
			decoder: decoder
		}
	};
}


function equalEvents(a, b)
{
	if (!a.options === b.options)
	{
		if (a.stopPropagation !== b.stopPropagation || a.preventDefault !== b.preventDefault)
		{
			return false;
		}
	}
	return _elm_lang$core$Native_Json.equality(a.decoder, b.decoder);
}



////////////  RENDERER  ////////////


function renderer(parent, tagger, initialVirtualNode)
{
	var eventNode = { tagger: tagger, parent: undefined };

	var domNode = render(initialVirtualNode, eventNode);
	parent.appendChild(domNode);

	var state = 'NO_REQUEST';
	var currentVirtualNode = initialVirtualNode;
	var nextVirtualNode = initialVirtualNode;

	function registerVirtualNode(vNode)
	{
		if (state === 'NO_REQUEST')
		{
			rAF(updateIfNeeded);
		}
		state = 'PENDING_REQUEST';
		nextVirtualNode = vNode;
	}

	function updateIfNeeded()
	{
		switch (state)
		{
			case 'NO_REQUEST':
				throw new Error(
					'Unexpected draw callback.\n' +
					'Please report this to <https://github.com/elm-lang/core/issues>.'
				);

			case 'PENDING_REQUEST':
				rAF(updateIfNeeded);
				state = 'EXTRA_REQUEST';

				var patches = diff(currentVirtualNode, nextVirtualNode);
				domNode = applyPatches(domNode, currentVirtualNode, patches, eventNode);
				currentVirtualNode = nextVirtualNode;

				return;

			case 'EXTRA_REQUEST':
				state = 'NO_REQUEST';
				return;
		}
	}

	return { update: registerVirtualNode };
}


var rAF =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(cb) { setTimeout(cb, 1000 / 60); };



////////////  RENDER  ////////////


function render(vNode, eventNode)
{
	switch (vNode.type)
	{
		case 'thunk':
			if (!vNode.node)
			{
				vNode.node = vNode.thunk();
			}
			return render(vNode.node, eventNode);

		case 'tagger':
			var subNode = vNode.node;
			var tagger = vNode.tagger;

			while (subNode.type === 'tagger')
			{
				typeof tagger !== 'object'
					? tagger = [tagger, subNode.tagger]
					: tagger.push(subNode.tagger);

				subNode = subNode.node;
			}

			var subEventRoot = {
				tagger: tagger,
				parent: eventNode
			};

			var domNode = render(subNode, subEventRoot);
			domNode.elm_event_node_ref = subEventRoot;
			return domNode;

		case 'text':
			return document.createTextNode(vNode.text);

		case 'node':
			var domNode = vNode.namespace
				? document.createElementNS(vNode.namespace, vNode.tag)
				: document.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i], eventNode));
			}

			return domNode;

		case 'keyed-node':
			var domNode = vNode.namespace
				? document.createElementNS(vNode.namespace, vNode.tag)
				: document.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i]._1, eventNode));
			}

			return domNode;

		case 'custom':
			var domNode = vNode.impl.render(vNode.model);
			applyFacts(domNode, eventNode, vNode.facts);
			return domNode;
	}
}



////////////  APPLY FACTS  ////////////


function applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		switch (key)
		{
			case STYLE_KEY:
				applyStyles(domNode, value);
				break;

			case EVENT_KEY:
				applyEvents(domNode, eventNode, value);
				break;

			case ATTR_KEY:
				applyAttrs(domNode, value);
				break;

			case ATTR_NS_KEY:
				applyAttrsNS(domNode, value);
				break;

			case 'value':
				if (domNode[key] !== value)
				{
					domNode[key] = value;
				}
				break;

			default:
				domNode[key] = value;
				break;
		}
	}
}

function applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}

function applyEvents(domNode, eventNode, events)
{
	var allHandlers = domNode.elm_handlers || {};

	for (var key in events)
	{
		var handler = allHandlers[key];
		var value = events[key];

		if (typeof value === 'undefined')
		{
			domNode.removeEventListener(key, handler);
			allHandlers[key] = undefined;
		}
		else if (typeof handler === 'undefined')
		{
			var handler = makeEventHandler(eventNode, value);
			domNode.addEventListener(key, handler);
			allHandlers[key] = handler;
		}
		else
		{
			handler.info = value;
		}
	}

	domNode.elm_handlers = allHandlers;
}

function makeEventHandler(eventNode, info)
{
	function eventHandler(event)
	{
		var info = eventHandler.info;

		var value = A2(_elm_lang$core$Native_Json.run, info.decoder, event);

		if (value.ctor === 'Ok')
		{
			var options = info.options;
			if (options.stopPropagation)
			{
				event.stopPropagation();
			}
			if (options.preventDefault)
			{
				event.preventDefault();
			}

			var message = value._0;

			var currentEventNode = eventNode;
			while (currentEventNode)
			{
				var tagger = currentEventNode.tagger;
				if (typeof tagger === 'function')
				{
					message = tagger(message);
				}
				else
				{
					for (var i = tagger.length; i--; )
					{
						message = tagger[i](message);
					}
				}
				currentEventNode = currentEventNode.parent;
			}
		}
	};

	eventHandler.info = info;

	return eventHandler;
}

function applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		if (typeof value === 'undefined')
		{
			domNode.removeAttribute(key);
		}
		else
		{
			domNode.setAttribute(key, value);
		}
	}
}

function applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.namespace;
		var value = pair.value;

		if (typeof value === 'undefined')
		{
			domNode.removeAttributeNS(namespace, key);
		}
		else
		{
			domNode.setAttributeNS(namespace, key, value);
		}
	}
}



////////////  DIFF  ////////////


function diff(a, b)
{
	var patches = [];
	diffHelp(a, b, patches, 0);
	return patches;
}


function makePatch(type, index, data)
{
	return {
		index: index,
		type: type,
		data: data,
		domNode: undefined,
		eventNode: undefined
	};
}


function diffHelp(a, b, patches, index)
{
	if (a === b)
	{
		return;
	}

	var aType = a.type;
	var bType = b.type;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (aType !== bType)
	{
		patches.push(makePatch('p-redraw', index, b));
		return;
	}

	// Now we know that both nodes are the same type.
	switch (bType)
	{
		case 'thunk':
			var aArgs = a.args;
			var bArgs = b.args;
			var i = aArgs.length;
			var same = a.func === b.func && i === bArgs.length;
			while (same && i--)
			{
				same = aArgs[i] === bArgs[i];
			}
			if (same)
			{
				b.node = a.node;
				return;
			}
			b.node = b.thunk();
			var subPatches = [];
			diffHelp(a.node, b.node, subPatches, 0);
			if (subPatches.length > 0)
			{
				patches.push(makePatch('p-thunk', index, subPatches));
			}
			return;

		case 'tagger':
			// gather nested taggers
			var aTaggers = a.tagger;
			var bTaggers = b.tagger;
			var nesting = false;

			var aSubNode = a.node;
			while (aSubNode.type === 'tagger')
			{
				nesting = true;

				typeof aTaggers !== 'object'
					? aTaggers = [aTaggers, aSubNode.tagger]
					: aTaggers.push(aSubNode.tagger);

				aSubNode = aSubNode.node;
			}

			var bSubNode = b.node;
			while (bSubNode.type === 'tagger')
			{
				nesting = true;

				typeof bTaggers !== 'object'
					? bTaggers = [bTaggers, bSubNode.tagger]
					: bTaggers.push(bSubNode.tagger);

				bSubNode = bSubNode.node;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && aTaggers.length !== bTaggers.length)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !pairwiseRefEqual(aTaggers, bTaggers) : aTaggers !== bTaggers)
			{
				patches.push(makePatch('p-tagger', index, bTaggers));
			}

			// diff everything below the taggers
			diffHelp(aSubNode, bSubNode, patches, index + 1);
			return;

		case 'text':
			if (a.text !== b.text)
			{
				patches.push(makePatch('p-text', index, b.text));
				return;
			}

			return;

		case 'node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffChildren(a, b, patches, index);
			return;

		case 'keyed-node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffKeyedChildren(a, b, patches, index);
			return;

		case 'custom':
			if (a.impl !== b.impl)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);
			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			var patch = b.impl.diff(a,b);
			if (patch)
			{
				patches.push(makePatch('p-custom', index, patch));
				return;
			}

			return;
	}
}


// assumes the incoming arrays are the same length
function pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function diffFacts(a, b, category)
{
	var diff;

	// look for changes and removals
	for (var aKey in a)
	{
		if (aKey === STYLE_KEY || aKey === EVENT_KEY || aKey === ATTR_KEY || aKey === ATTR_NS_KEY)
		{
			var subDiff = diffFacts(a[aKey], b[aKey] || {}, aKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[aKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(aKey in b))
		{
			diff = diff || {};
			diff[aKey] =
				(typeof category === 'undefined')
					? (typeof a[aKey] === 'string' ? '' : null)
					:
				(category === STYLE_KEY)
					? ''
					:
				(category === EVENT_KEY || category === ATTR_KEY)
					? undefined
					:
				{ namespace: a[aKey].namespace, value: undefined };

			continue;
		}

		var aValue = a[aKey];
		var bValue = b[aKey];

		// reference equal, so don't worry about it
		if (aValue === bValue && aKey !== 'value'
			|| category === EVENT_KEY && equalEvents(aValue, bValue))
		{
			continue;
		}

		diff = diff || {};
		diff[aKey] = bValue;
	}

	// add new stuff
	for (var bKey in b)
	{
		if (!(bKey in a))
		{
			diff = diff || {};
			diff[bKey] = b[bKey];
		}
	}

	return diff;
}


function diffChildren(aParent, bParent, patches, rootIndex)
{
	var aChildren = aParent.children;
	var bChildren = bParent.children;

	var aLen = aChildren.length;
	var bLen = bChildren.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (aLen > bLen)
	{
		patches.push(makePatch('p-remove-last', rootIndex, aLen - bLen));
	}
	else if (aLen < bLen)
	{
		patches.push(makePatch('p-append', rootIndex, bChildren.slice(aLen)));
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	var index = rootIndex;
	var minLen = aLen < bLen ? aLen : bLen;
	for (var i = 0; i < minLen; i++)
	{
		index++;
		var aChild = aChildren[i];
		diffHelp(aChild, bChildren[i], patches, index);
		index += aChild.descendantsCount || 0;
	}
}



////////////  KEYED DIFF  ////////////


function diffKeyedChildren(aParent, bParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var aChildren = aParent.children;
	var bChildren = bParent.children;
	var aLen = aChildren.length;
	var bLen = bChildren.length;
	var aIndex = 0;
	var bIndex = 0;

	var index = rootIndex;

	while (aIndex < aLen && bIndex < bLen)
	{
		var a = aChildren[aIndex];
		var b = bChildren[bIndex];

		var aKey = a._0;
		var bKey = b._0;
		var aNode = a._1;
		var bNode = b._1;

		// check if keys match

		if (aKey === bKey)
		{
			index++;
			diffHelp(aNode, bNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex++;
			bIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var aLookAhead = aIndex + 1 < aLen;
		var bLookAhead = bIndex + 1 < bLen;

		if (aLookAhead)
		{
			var aNext = aChildren[aIndex + 1];
			var aNextKey = aNext._0;
			var aNextNode = aNext._1;
			var oldMatch = bKey === aNextKey;
		}

		if (bLookAhead)
		{
			var bNext = bChildren[bIndex + 1];
			var bNextKey = bNext._0;
			var bNextNode = bNext._1;
			var newMatch = aKey === bNextKey;
		}


		// swap a and b
		if (aLookAhead && bLookAhead && newMatch && oldMatch)
		{
			index++;
			diffHelp(aNode, bNextNode, localPatches, index);
			insertNode(changes, localPatches, aKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			removeNode(changes, localPatches, aKey, aNextNode, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		// insert b
		if (bLookAhead && newMatch)
		{
			index++;
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			diffHelp(aNode, bNextNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex += 1;
			bIndex += 2;
			continue;
		}

		// remove a
		if (aLookAhead && oldMatch)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 1;
			continue;
		}

		// remove a, insert b
		if (aLookAhead && bLookAhead && aNextKey === bNextKey)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNextNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (aIndex < aLen)
	{
		index++;
		var a = aChildren[aIndex];
		var aNode = a._1;
		removeNode(changes, localPatches, a._0, aNode, index);
		index += aNode.descendantsCount || 0;
		aIndex++;
	}

	var endInserts;
	while (bIndex < bLen)
	{
		endInserts = endInserts || [];
		var b = bChildren[bIndex];
		insertNode(changes, localPatches, b._0, b._1, undefined, endInserts);
		bIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || typeof endInserts !== 'undefined')
	{
		patches.push(makePatch('p-reorder', rootIndex, {
			patches: localPatches,
			inserts: inserts,
			endInserts: endInserts
		}));
	}
}



////////////  CHANGES FROM KEYED DIFF  ////////////


var POSTFIX = '_elmW6BL';


function insertNode(changes, localPatches, key, vnode, bIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		entry = {
			tag: 'insert',
			vnode: vnode,
			index: bIndex,
			data: undefined
		};

		inserts.push({ index: bIndex, entry: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.tag === 'remove')
	{
		inserts.push({ index: bIndex, entry: entry });

		entry.tag = 'move';
		var subPatches = [];
		diffHelp(entry.vnode, vnode, subPatches, entry.index);
		entry.index = bIndex;
		entry.data.data = {
			patches: subPatches,
			entry: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	insertNode(changes, localPatches, key + POSTFIX, vnode, bIndex, inserts);
}


function removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		var patch = makePatch('p-remove', index, undefined);
		localPatches.push(patch);

		changes[key] = {
			tag: 'remove',
			vnode: vnode,
			index: index,
			data: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.tag === 'insert')
	{
		entry.tag = 'move';
		var subPatches = [];
		diffHelp(vnode, entry.vnode, subPatches, index);

		var patch = makePatch('p-remove', index, {
			patches: subPatches,
			entry: entry
		});
		localPatches.push(patch);

		return;
	}

	// this key has already been removed or moved, a duplicate!
	removeNode(changes, localPatches, key + POSTFIX, vnode, index);
}



////////////  ADD DOM NODES  ////////////
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function addDomNodes(domNode, vNode, patches, eventNode)
{
	addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.descendantsCount, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.index;

	while (index === low)
	{
		var patchType = patch.type;

		if (patchType === 'p-thunk')
		{
			addDomNodes(domNode, vNode.node, patch.data, eventNode);
		}
		else if (patchType === 'p-reorder')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var subPatches = patch.data.patches;
			if (subPatches.length > 0)
			{
				addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 'p-remove')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var data = patch.data;
			if (typeof data !== 'undefined')
			{
				data.entry.data = domNode;
				var subPatches = data.patches;
				if (subPatches.length > 0)
				{
					addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.index) > high)
		{
			return i;
		}
	}

	switch (vNode.type)
	{
		case 'tagger':
			var subNode = vNode.node;

			while (subNode.type === "tagger")
			{
				subNode = subNode.node;
			}

			return addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);

		case 'node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j];
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'keyed-node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j]._1;
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'text':
		case 'thunk':
			throw new Error('should never traverse `text` or `thunk` nodes like this');
	}
}



////////////  APPLY PATCHES  ////////////


function applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return applyPatchesHelp(rootDomNode, patches);
}

function applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.domNode
		var newNode = applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function applyPatch(domNode, patch)
{
	switch (patch.type)
	{
		case 'p-redraw':
			return redraw(domNode, patch.data, patch.eventNode);

		case 'p-facts':
			applyFacts(domNode, patch.eventNode, patch.data);
			return domNode;

		case 'p-text':
			domNode.replaceData(0, domNode.length, patch.data);
			return domNode;

		case 'p-thunk':
			return applyPatchesHelp(domNode, patch.data);

		case 'p-tagger':
			domNode.elm_event_node_ref.tagger = patch.data;
			return domNode;

		case 'p-remove-last':
			var i = patch.data;
			while (i--)
			{
				domNode.removeChild(domNode.lastChild);
			}
			return domNode;

		case 'p-append':
			var newNodes = patch.data;
			for (var i = 0; i < newNodes.length; i++)
			{
				domNode.appendChild(render(newNodes[i], patch.eventNode));
			}
			return domNode;

		case 'p-remove':
			var data = patch.data;
			if (typeof data === 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.entry;
			if (typeof entry.index !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.data = applyPatchesHelp(domNode, data.patches);
			return domNode;

		case 'p-reorder':
			var data = patch.data;

			// end inserts
			var endInserts = data.endInserts;
			var end;
			if (typeof endInserts !== 'undefined')
			{
				if (endInserts.length === 1)
				{
					var insert = endInserts[0];
					var entry = insert.entry;
					var end = entry.tag === 'move'
						? entry.data
						: render(entry.vnode, patch.eventNode);
				}
				else
				{
					end = document.createDocumentFragment();
					for (var i = 0; i < endInserts.length; i++)
					{
						var insert = endInserts[i];
						var entry = insert.entry;
						var node = entry.tag === 'move'
							? entry.data
							: render(entry.vnode, patch.eventNode);
						end.appendChild(node);
					}
				}
			}

			// removals
			domNode = applyPatchesHelp(domNode, data.patches);

			// inserts
			var inserts = data.inserts;
			for (var i = 0; i < inserts.length; i++)
			{
				var insert = inserts[i];
				var entry = insert.entry;
				var node = entry.tag === 'move'
					? entry.data
					: render(entry.vnode, patch.eventNode);
				domNode.insertBefore(node, domNode.childNodes[insert.index]);
			}

			if (typeof end !== 'undefined')
			{
				domNode.appendChild(end);
			}

			return domNode;

		case 'p-custom':
			var impl = patch.data;
			return impl.applyPatch(domNode, impl.data);

		default:
			throw new Error('Ran into an unknown patch!');
	}
}


function redraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = render(vNode, eventNode);

	if (typeof newNode.elm_event_node_ref === 'undefined')
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}



////////////  PROGRAMS  ////////////


function programWithFlags(details)
{
	return {
		init: details.init,
		update: details.update,
		subscriptions: details.subscriptions,
		view: details.view,
		renderer: renderer
	};
}


return {
	node: node,
	text: text,

	custom: custom,

	map: F2(map),

	on: F3(on),
	style: style,
	property: F2(property),
	attribute: F2(attribute),
	attributeNS: F3(attributeNS),

	lazy: F2(lazy),
	lazy2: F3(lazy2),
	lazy3: F4(lazy3),
	keyedNode: F3(keyedNode),

	programWithFlags: programWithFlags
};

}();
var _elm_lang$virtual_dom$VirtualDom$programWithFlags = _elm_lang$virtual_dom$Native_VirtualDom.programWithFlags;
var _elm_lang$virtual_dom$VirtualDom$keyedNode = _elm_lang$virtual_dom$Native_VirtualDom.keyedNode;
var _elm_lang$virtual_dom$VirtualDom$lazy3 = _elm_lang$virtual_dom$Native_VirtualDom.lazy3;
var _elm_lang$virtual_dom$VirtualDom$lazy2 = _elm_lang$virtual_dom$Native_VirtualDom.lazy2;
var _elm_lang$virtual_dom$VirtualDom$lazy = _elm_lang$virtual_dom$Native_VirtualDom.lazy;
var _elm_lang$virtual_dom$VirtualDom$defaultOptions = {stopPropagation: false, preventDefault: false};
var _elm_lang$virtual_dom$VirtualDom$onWithOptions = _elm_lang$virtual_dom$Native_VirtualDom.on;
var _elm_lang$virtual_dom$VirtualDom$on = F2(
	function (eventName, decoder) {
		return A3(_elm_lang$virtual_dom$VirtualDom$onWithOptions, eventName, _elm_lang$virtual_dom$VirtualDom$defaultOptions, decoder);
	});
var _elm_lang$virtual_dom$VirtualDom$style = _elm_lang$virtual_dom$Native_VirtualDom.style;
var _elm_lang$virtual_dom$VirtualDom$attributeNS = _elm_lang$virtual_dom$Native_VirtualDom.attributeNS;
var _elm_lang$virtual_dom$VirtualDom$attribute = _elm_lang$virtual_dom$Native_VirtualDom.attribute;
var _elm_lang$virtual_dom$VirtualDom$property = _elm_lang$virtual_dom$Native_VirtualDom.property;
var _elm_lang$virtual_dom$VirtualDom$map = _elm_lang$virtual_dom$Native_VirtualDom.map;
var _elm_lang$virtual_dom$VirtualDom$text = _elm_lang$virtual_dom$Native_VirtualDom.text;
var _elm_lang$virtual_dom$VirtualDom$node = _elm_lang$virtual_dom$Native_VirtualDom.node;
var _elm_lang$virtual_dom$VirtualDom$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});
var _elm_lang$virtual_dom$VirtualDom$Node = {ctor: 'Node'};
var _elm_lang$virtual_dom$VirtualDom$Property = {ctor: 'Property'};

var _elm_lang$html$Html$text = _elm_lang$virtual_dom$VirtualDom$text;
var _elm_lang$html$Html$node = _elm_lang$virtual_dom$VirtualDom$node;
var _elm_lang$html$Html$body = _elm_lang$html$Html$node('body');
var _elm_lang$html$Html$section = _elm_lang$html$Html$node('section');
var _elm_lang$html$Html$nav = _elm_lang$html$Html$node('nav');
var _elm_lang$html$Html$article = _elm_lang$html$Html$node('article');
var _elm_lang$html$Html$aside = _elm_lang$html$Html$node('aside');
var _elm_lang$html$Html$h1 = _elm_lang$html$Html$node('h1');
var _elm_lang$html$Html$h2 = _elm_lang$html$Html$node('h2');
var _elm_lang$html$Html$h3 = _elm_lang$html$Html$node('h3');
var _elm_lang$html$Html$h4 = _elm_lang$html$Html$node('h4');
var _elm_lang$html$Html$h5 = _elm_lang$html$Html$node('h5');
var _elm_lang$html$Html$h6 = _elm_lang$html$Html$node('h6');
var _elm_lang$html$Html$header = _elm_lang$html$Html$node('header');
var _elm_lang$html$Html$footer = _elm_lang$html$Html$node('footer');
var _elm_lang$html$Html$address = _elm_lang$html$Html$node('address');
var _elm_lang$html$Html$main$ = _elm_lang$html$Html$node('main');
var _elm_lang$html$Html$p = _elm_lang$html$Html$node('p');
var _elm_lang$html$Html$hr = _elm_lang$html$Html$node('hr');
var _elm_lang$html$Html$pre = _elm_lang$html$Html$node('pre');
var _elm_lang$html$Html$blockquote = _elm_lang$html$Html$node('blockquote');
var _elm_lang$html$Html$ol = _elm_lang$html$Html$node('ol');
var _elm_lang$html$Html$ul = _elm_lang$html$Html$node('ul');
var _elm_lang$html$Html$li = _elm_lang$html$Html$node('li');
var _elm_lang$html$Html$dl = _elm_lang$html$Html$node('dl');
var _elm_lang$html$Html$dt = _elm_lang$html$Html$node('dt');
var _elm_lang$html$Html$dd = _elm_lang$html$Html$node('dd');
var _elm_lang$html$Html$figure = _elm_lang$html$Html$node('figure');
var _elm_lang$html$Html$figcaption = _elm_lang$html$Html$node('figcaption');
var _elm_lang$html$Html$div = _elm_lang$html$Html$node('div');
var _elm_lang$html$Html$a = _elm_lang$html$Html$node('a');
var _elm_lang$html$Html$em = _elm_lang$html$Html$node('em');
var _elm_lang$html$Html$strong = _elm_lang$html$Html$node('strong');
var _elm_lang$html$Html$small = _elm_lang$html$Html$node('small');
var _elm_lang$html$Html$s = _elm_lang$html$Html$node('s');
var _elm_lang$html$Html$cite = _elm_lang$html$Html$node('cite');
var _elm_lang$html$Html$q = _elm_lang$html$Html$node('q');
var _elm_lang$html$Html$dfn = _elm_lang$html$Html$node('dfn');
var _elm_lang$html$Html$abbr = _elm_lang$html$Html$node('abbr');
var _elm_lang$html$Html$time = _elm_lang$html$Html$node('time');
var _elm_lang$html$Html$code = _elm_lang$html$Html$node('code');
var _elm_lang$html$Html$var = _elm_lang$html$Html$node('var');
var _elm_lang$html$Html$samp = _elm_lang$html$Html$node('samp');
var _elm_lang$html$Html$kbd = _elm_lang$html$Html$node('kbd');
var _elm_lang$html$Html$sub = _elm_lang$html$Html$node('sub');
var _elm_lang$html$Html$sup = _elm_lang$html$Html$node('sup');
var _elm_lang$html$Html$i = _elm_lang$html$Html$node('i');
var _elm_lang$html$Html$b = _elm_lang$html$Html$node('b');
var _elm_lang$html$Html$u = _elm_lang$html$Html$node('u');
var _elm_lang$html$Html$mark = _elm_lang$html$Html$node('mark');
var _elm_lang$html$Html$ruby = _elm_lang$html$Html$node('ruby');
var _elm_lang$html$Html$rt = _elm_lang$html$Html$node('rt');
var _elm_lang$html$Html$rp = _elm_lang$html$Html$node('rp');
var _elm_lang$html$Html$bdi = _elm_lang$html$Html$node('bdi');
var _elm_lang$html$Html$bdo = _elm_lang$html$Html$node('bdo');
var _elm_lang$html$Html$span = _elm_lang$html$Html$node('span');
var _elm_lang$html$Html$br = _elm_lang$html$Html$node('br');
var _elm_lang$html$Html$wbr = _elm_lang$html$Html$node('wbr');
var _elm_lang$html$Html$ins = _elm_lang$html$Html$node('ins');
var _elm_lang$html$Html$del = _elm_lang$html$Html$node('del');
var _elm_lang$html$Html$img = _elm_lang$html$Html$node('img');
var _elm_lang$html$Html$iframe = _elm_lang$html$Html$node('iframe');
var _elm_lang$html$Html$embed = _elm_lang$html$Html$node('embed');
var _elm_lang$html$Html$object = _elm_lang$html$Html$node('object');
var _elm_lang$html$Html$param = _elm_lang$html$Html$node('param');
var _elm_lang$html$Html$video = _elm_lang$html$Html$node('video');
var _elm_lang$html$Html$audio = _elm_lang$html$Html$node('audio');
var _elm_lang$html$Html$source = _elm_lang$html$Html$node('source');
var _elm_lang$html$Html$track = _elm_lang$html$Html$node('track');
var _elm_lang$html$Html$canvas = _elm_lang$html$Html$node('canvas');
var _elm_lang$html$Html$svg = _elm_lang$html$Html$node('svg');
var _elm_lang$html$Html$math = _elm_lang$html$Html$node('math');
var _elm_lang$html$Html$table = _elm_lang$html$Html$node('table');
var _elm_lang$html$Html$caption = _elm_lang$html$Html$node('caption');
var _elm_lang$html$Html$colgroup = _elm_lang$html$Html$node('colgroup');
var _elm_lang$html$Html$col = _elm_lang$html$Html$node('col');
var _elm_lang$html$Html$tbody = _elm_lang$html$Html$node('tbody');
var _elm_lang$html$Html$thead = _elm_lang$html$Html$node('thead');
var _elm_lang$html$Html$tfoot = _elm_lang$html$Html$node('tfoot');
var _elm_lang$html$Html$tr = _elm_lang$html$Html$node('tr');
var _elm_lang$html$Html$td = _elm_lang$html$Html$node('td');
var _elm_lang$html$Html$th = _elm_lang$html$Html$node('th');
var _elm_lang$html$Html$form = _elm_lang$html$Html$node('form');
var _elm_lang$html$Html$fieldset = _elm_lang$html$Html$node('fieldset');
var _elm_lang$html$Html$legend = _elm_lang$html$Html$node('legend');
var _elm_lang$html$Html$label = _elm_lang$html$Html$node('label');
var _elm_lang$html$Html$input = _elm_lang$html$Html$node('input');
var _elm_lang$html$Html$button = _elm_lang$html$Html$node('button');
var _elm_lang$html$Html$select = _elm_lang$html$Html$node('select');
var _elm_lang$html$Html$datalist = _elm_lang$html$Html$node('datalist');
var _elm_lang$html$Html$optgroup = _elm_lang$html$Html$node('optgroup');
var _elm_lang$html$Html$option = _elm_lang$html$Html$node('option');
var _elm_lang$html$Html$textarea = _elm_lang$html$Html$node('textarea');
var _elm_lang$html$Html$keygen = _elm_lang$html$Html$node('keygen');
var _elm_lang$html$Html$output = _elm_lang$html$Html$node('output');
var _elm_lang$html$Html$progress = _elm_lang$html$Html$node('progress');
var _elm_lang$html$Html$meter = _elm_lang$html$Html$node('meter');
var _elm_lang$html$Html$details = _elm_lang$html$Html$node('details');
var _elm_lang$html$Html$summary = _elm_lang$html$Html$node('summary');
var _elm_lang$html$Html$menuitem = _elm_lang$html$Html$node('menuitem');
var _elm_lang$html$Html$menu = _elm_lang$html$Html$node('menu');

var _elm_lang$html$Html_Events$keyCode = A2(_elm_lang$core$Json_Decode_ops[':='], 'keyCode', _elm_lang$core$Json_Decode$int);
var _elm_lang$html$Html_Events$targetChecked = A2(
	_elm_lang$core$Json_Decode$at,
	_elm_lang$core$Native_List.fromArray(
		['target', 'checked']),
	_elm_lang$core$Json_Decode$bool);
var _elm_lang$html$Html_Events$targetValue = A2(
	_elm_lang$core$Json_Decode$at,
	_elm_lang$core$Native_List.fromArray(
		['target', 'value']),
	_elm_lang$core$Json_Decode$string);
var _elm_lang$html$Html_Events$defaultOptions = _elm_lang$virtual_dom$VirtualDom$defaultOptions;
var _elm_lang$html$Html_Events$onWithOptions = _elm_lang$virtual_dom$VirtualDom$onWithOptions;
var _elm_lang$html$Html_Events$on = _elm_lang$virtual_dom$VirtualDom$on;
var _elm_lang$html$Html_Events$onFocus = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'focus',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onBlur = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'blur',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onSubmitOptions = _elm_lang$core$Native_Utils.update(
	_elm_lang$html$Html_Events$defaultOptions,
	{preventDefault: true});
var _elm_lang$html$Html_Events$onSubmit = function (msg) {
	return A3(
		_elm_lang$html$Html_Events$onWithOptions,
		'submit',
		_elm_lang$html$Html_Events$onSubmitOptions,
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onCheck = function (tagger) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'change',
		A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetChecked));
};
var _elm_lang$html$Html_Events$onInput = function (tagger) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'input',
		A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetValue));
};
var _elm_lang$html$Html_Events$onMouseOut = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseout',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseOver = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseover',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseLeave = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseleave',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseEnter = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseenter',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseUp = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseup',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseDown = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mousedown',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onDoubleClick = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'dblclick',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onClick = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'click',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});

var _elm_lang$html$Html_Attributes$attribute = _elm_lang$virtual_dom$VirtualDom$attribute;
var _elm_lang$html$Html_Attributes$contextmenu = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'contextmenu', value);
};
var _elm_lang$html$Html_Attributes$draggable = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'draggable', value);
};
var _elm_lang$html$Html_Attributes$list = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'list', value);
};
var _elm_lang$html$Html_Attributes$maxlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'maxlength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$datetime = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'datetime', value);
};
var _elm_lang$html$Html_Attributes$pubdate = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'pubdate', value);
};
var _elm_lang$html$Html_Attributes$colspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'colspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rowspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rowspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$property = _elm_lang$virtual_dom$VirtualDom$property;
var _elm_lang$html$Html_Attributes$stringProperty = F2(
	function (name, string) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$string(string));
	});
var _elm_lang$html$Html_Attributes$class = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'className', name);
};
var _elm_lang$html$Html_Attributes$id = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'id', name);
};
var _elm_lang$html$Html_Attributes$title = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'title', name);
};
var _elm_lang$html$Html_Attributes$accesskey = function ($char) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'accessKey',
		_elm_lang$core$String$fromChar($char));
};
var _elm_lang$html$Html_Attributes$dir = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dir', value);
};
var _elm_lang$html$Html_Attributes$dropzone = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dropzone', value);
};
var _elm_lang$html$Html_Attributes$itemprop = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'itemprop', value);
};
var _elm_lang$html$Html_Attributes$lang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'lang', value);
};
var _elm_lang$html$Html_Attributes$tabindex = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'tabIndex',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$charset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'charset', value);
};
var _elm_lang$html$Html_Attributes$content = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'content', value);
};
var _elm_lang$html$Html_Attributes$httpEquiv = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'httpEquiv', value);
};
var _elm_lang$html$Html_Attributes$language = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'language', value);
};
var _elm_lang$html$Html_Attributes$src = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'src', value);
};
var _elm_lang$html$Html_Attributes$height = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'height',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$width = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'width',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$alt = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'alt', value);
};
var _elm_lang$html$Html_Attributes$preload = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'preload', value);
};
var _elm_lang$html$Html_Attributes$poster = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'poster', value);
};
var _elm_lang$html$Html_Attributes$kind = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'kind', value);
};
var _elm_lang$html$Html_Attributes$srclang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srclang', value);
};
var _elm_lang$html$Html_Attributes$sandbox = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'sandbox', value);
};
var _elm_lang$html$Html_Attributes$srcdoc = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srcdoc', value);
};
var _elm_lang$html$Html_Attributes$type$ = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'type', value);
};
var _elm_lang$html$Html_Attributes$value = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'value', value);
};
var _elm_lang$html$Html_Attributes$defaultValue = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'defaultValue', value);
};
var _elm_lang$html$Html_Attributes$placeholder = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'placeholder', value);
};
var _elm_lang$html$Html_Attributes$accept = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'accept', value);
};
var _elm_lang$html$Html_Attributes$acceptCharset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'acceptCharset', value);
};
var _elm_lang$html$Html_Attributes$action = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'action', value);
};
var _elm_lang$html$Html_Attributes$autocomplete = function (bool) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'autocomplete',
		bool ? 'on' : 'off');
};
var _elm_lang$html$Html_Attributes$autosave = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'autosave', value);
};
var _elm_lang$html$Html_Attributes$enctype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'enctype', value);
};
var _elm_lang$html$Html_Attributes$formaction = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'formAction', value);
};
var _elm_lang$html$Html_Attributes$minlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'minLength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$method = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'method', value);
};
var _elm_lang$html$Html_Attributes$name = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'name', value);
};
var _elm_lang$html$Html_Attributes$pattern = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'pattern', value);
};
var _elm_lang$html$Html_Attributes$size = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'size',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$for = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'htmlFor', value);
};
var _elm_lang$html$Html_Attributes$form = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'form', value);
};
var _elm_lang$html$Html_Attributes$max = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'max', value);
};
var _elm_lang$html$Html_Attributes$min = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'min', value);
};
var _elm_lang$html$Html_Attributes$step = function (n) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'step', n);
};
var _elm_lang$html$Html_Attributes$cols = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'cols',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rows = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'rows',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$wrap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'wrap', value);
};
var _elm_lang$html$Html_Attributes$usemap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'useMap', value);
};
var _elm_lang$html$Html_Attributes$shape = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'shape', value);
};
var _elm_lang$html$Html_Attributes$coords = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'coords', value);
};
var _elm_lang$html$Html_Attributes$challenge = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'challenge', value);
};
var _elm_lang$html$Html_Attributes$keytype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'keytype', value);
};
var _elm_lang$html$Html_Attributes$align = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'align', value);
};
var _elm_lang$html$Html_Attributes$cite = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'cite', value);
};
var _elm_lang$html$Html_Attributes$href = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'href', value);
};
var _elm_lang$html$Html_Attributes$target = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'target', value);
};
var _elm_lang$html$Html_Attributes$downloadAs = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'download', value);
};
var _elm_lang$html$Html_Attributes$hreflang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'hreflang', value);
};
var _elm_lang$html$Html_Attributes$media = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'media', value);
};
var _elm_lang$html$Html_Attributes$ping = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'ping', value);
};
var _elm_lang$html$Html_Attributes$rel = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'rel', value);
};
var _elm_lang$html$Html_Attributes$start = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'start',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$headers = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'headers', value);
};
var _elm_lang$html$Html_Attributes$scope = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'scope', value);
};
var _elm_lang$html$Html_Attributes$manifest = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'manifest', value);
};
var _elm_lang$html$Html_Attributes$boolProperty = F2(
	function (name, bool) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$bool(bool));
	});
var _elm_lang$html$Html_Attributes$hidden = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'hidden', bool);
};
var _elm_lang$html$Html_Attributes$contenteditable = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'contentEditable', bool);
};
var _elm_lang$html$Html_Attributes$spellcheck = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'spellcheck', bool);
};
var _elm_lang$html$Html_Attributes$async = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'async', bool);
};
var _elm_lang$html$Html_Attributes$defer = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'defer', bool);
};
var _elm_lang$html$Html_Attributes$scoped = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'scoped', bool);
};
var _elm_lang$html$Html_Attributes$autoplay = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autoplay', bool);
};
var _elm_lang$html$Html_Attributes$controls = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'controls', bool);
};
var _elm_lang$html$Html_Attributes$loop = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'loop', bool);
};
var _elm_lang$html$Html_Attributes$default = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'default', bool);
};
var _elm_lang$html$Html_Attributes$seamless = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'seamless', bool);
};
var _elm_lang$html$Html_Attributes$checked = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'checked', bool);
};
var _elm_lang$html$Html_Attributes$selected = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'selected', bool);
};
var _elm_lang$html$Html_Attributes$autofocus = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autofocus', bool);
};
var _elm_lang$html$Html_Attributes$disabled = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'disabled', bool);
};
var _elm_lang$html$Html_Attributes$multiple = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'multiple', bool);
};
var _elm_lang$html$Html_Attributes$novalidate = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'noValidate', bool);
};
var _elm_lang$html$Html_Attributes$readonly = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'readOnly', bool);
};
var _elm_lang$html$Html_Attributes$required = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'required', bool);
};
var _elm_lang$html$Html_Attributes$ismap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'isMap', value);
};
var _elm_lang$html$Html_Attributes$download = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'download', bool);
};
var _elm_lang$html$Html_Attributes$reversed = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'reversed', bool);
};
var _elm_lang$html$Html_Attributes$classList = function (list) {
	return _elm_lang$html$Html_Attributes$class(
		A2(
			_elm_lang$core$String$join,
			' ',
			A2(
				_elm_lang$core$List$map,
				_elm_lang$core$Basics$fst,
				A2(_elm_lang$core$List$filter, _elm_lang$core$Basics$snd, list))));
};
var _elm_lang$html$Html_Attributes$style = _elm_lang$virtual_dom$VirtualDom$style;

var _debois$elm_mdl$Material_Options_Internal$None = {ctor: 'None'};
var _debois$elm_mdl$Material_Options_Internal$Set = function (a) {
	return {ctor: 'Set', _0: a};
};
var _debois$elm_mdl$Material_Options_Internal$Many = function (a) {
	return {ctor: 'Many', _0: a};
};
var _debois$elm_mdl$Material_Options_Internal$Internal = function (a) {
	return {ctor: 'Internal', _0: a};
};
var _debois$elm_mdl$Material_Options_Internal$attribute = _debois$elm_mdl$Material_Options_Internal$Internal;
var _debois$elm_mdl$Material_Options_Internal$Attribute = function (a) {
	return {ctor: 'Attribute', _0: a};
};
var _debois$elm_mdl$Material_Options_Internal$CSS = function (a) {
	return {ctor: 'CSS', _0: a};
};
var _debois$elm_mdl$Material_Options_Internal$Class = function (a) {
	return {ctor: 'Class', _0: a};
};

var _debois$elm_mdl$Material_Options$id = function (_p0) {
	return _debois$elm_mdl$Material_Options_Internal$Attribute(
		_elm_lang$html$Html_Attributes$id(_p0));
};
var _debois$elm_mdl$Material_Options$attr = _debois$elm_mdl$Material_Options_Internal$Attribute;
var _debois$elm_mdl$Material_Options$attribute = _debois$elm_mdl$Material_Options_Internal$Attribute;
var _debois$elm_mdl$Material_Options$stylesheet = function (css) {
	return A3(
		_elm_lang$html$Html$node,
		'style',
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html$text(css)
			]));
};
var _debois$elm_mdl$Material_Options$data = F2(
	function (key, val) {
		return _debois$elm_mdl$Material_Options_Internal$Attribute(
			A2(
				_elm_lang$html$Html_Attributes$attribute,
				A2(_elm_lang$core$Basics_ops['++'], 'data-', key),
				val));
	});
var _debois$elm_mdl$Material_Options$set = _debois$elm_mdl$Material_Options_Internal$Set;
var _debois$elm_mdl$Material_Options$inner = function (options) {
	return _debois$elm_mdl$Material_Options$set(
		function (c) {
			return _elm_lang$core$Native_Utils.update(
				c,
				{
					inner: A2(_elm_lang$core$Basics_ops['++'], options, c.inner)
				});
		});
};
var _debois$elm_mdl$Material_Options$nop = _debois$elm_mdl$Material_Options_Internal$None;
var _debois$elm_mdl$Material_Options$when = F2(
	function (prop, guard) {
		return guard ? prop : _debois$elm_mdl$Material_Options$nop;
	});
var _debois$elm_mdl$Material_Options$maybe = function (prop) {
	return A2(_elm_lang$core$Maybe$withDefault, _debois$elm_mdl$Material_Options$nop, prop);
};
var _debois$elm_mdl$Material_Options$many = _debois$elm_mdl$Material_Options_Internal$Many;
var _debois$elm_mdl$Material_Options$css = F2(
	function (key, value) {
		return _debois$elm_mdl$Material_Options_Internal$CSS(
			{ctor: '_Tuple2', _0: key, _1: value});
	});
var _debois$elm_mdl$Material_Options$center = _debois$elm_mdl$Material_Options$many(
	_elm_lang$core$Native_List.fromArray(
		[
			A2(_debois$elm_mdl$Material_Options$css, 'display', 'flex'),
			A2(_debois$elm_mdl$Material_Options$css, 'align-items', 'center'),
			A2(_debois$elm_mdl$Material_Options$css, 'justify-content', 'center')
		]));
var _debois$elm_mdl$Material_Options$scrim = function (opacity) {
	return A2(
		_debois$elm_mdl$Material_Options$css,
		'background',
		A2(
			_elm_lang$core$Basics_ops['++'],
			'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, ',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(opacity),
				'))')));
};
var _debois$elm_mdl$Material_Options$cs = function (c) {
	return _debois$elm_mdl$Material_Options_Internal$Class(c);
};
var _debois$elm_mdl$Material_Options$disabled = function (v) {
	return _debois$elm_mdl$Material_Options_Internal$Attribute(
		_elm_lang$html$Html_Attributes$disabled(v));
};
var _debois$elm_mdl$Material_Options$addAttributes = F2(
	function (summary, attrs) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			summary.attrs,
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$style(summary.css),
						_elm_lang$html$Html_Attributes$class(
						A2(_elm_lang$core$String$join, ' ', summary.classes))
					]),
				attrs));
	});
var _debois$elm_mdl$Material_Options$collect1$ = F2(
	function (options, acc) {
		var _p1 = options;
		switch (_p1.ctor) {
			case 'Class':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						classes: A2(_elm_lang$core$List_ops['::'], _p1._0, acc.classes)
					});
			case 'CSS':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						css: A2(_elm_lang$core$List_ops['::'], _p1._0, acc.css)
					});
			case 'Attribute':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						attrs: A2(_elm_lang$core$List_ops['::'], _p1._0, acc.attrs)
					});
			case 'Internal':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						attrs: A2(
							_elm_lang$core$Basics_ops['++'],
							acc.attrs,
							_elm_lang$core$Native_List.fromArray(
								[_p1._0]))
					});
			case 'Many':
				return A3(_elm_lang$core$List$foldl, _debois$elm_mdl$Material_Options$collect1$, acc, _p1._0);
			case 'Set':
				return acc;
			default:
				return acc;
		}
	});
var _debois$elm_mdl$Material_Options$collect1 = F2(
	function (option, acc) {
		var _p2 = option;
		switch (_p2.ctor) {
			case 'Class':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						classes: A2(_elm_lang$core$List_ops['::'], _p2._0, acc.classes)
					});
			case 'CSS':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						css: A2(_elm_lang$core$List_ops['::'], _p2._0, acc.css)
					});
			case 'Internal':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						attrs: A2(
							_elm_lang$core$Basics_ops['++'],
							acc.attrs,
							_elm_lang$core$Native_List.fromArray(
								[_p2._0]))
					});
			case 'Attribute':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						attrs: A2(_elm_lang$core$List_ops['::'], _p2._0, acc.attrs)
					});
			case 'Many':
				return A3(_elm_lang$core$List$foldl, _debois$elm_mdl$Material_Options$collect1, acc, _p2._0);
			case 'Set':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						config: _p2._0(acc.config)
					});
			default:
				return acc;
		}
	});
var _debois$elm_mdl$Material_Options$recollect = _elm_lang$core$List$foldl(_debois$elm_mdl$Material_Options$collect1);
var _debois$elm_mdl$Material_Options$apply = F4(
	function (summary, ctor, options, attrs) {
		return ctor(
			A2(
				_debois$elm_mdl$Material_Options$addAttributes,
				A2(_debois$elm_mdl$Material_Options$recollect, summary, options),
				attrs));
	});
var _debois$elm_mdl$Material_Options$Summary = F4(
	function (a, b, c, d) {
		return {classes: a, css: b, attrs: c, config: d};
	});
var _debois$elm_mdl$Material_Options$collect = function (_p3) {
	return _debois$elm_mdl$Material_Options$recollect(
		A4(
			_debois$elm_mdl$Material_Options$Summary,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[]),
			_p3));
};
var _debois$elm_mdl$Material_Options$collect$ = A2(
	_elm_lang$core$List$foldl,
	_debois$elm_mdl$Material_Options$collect1$,
	A4(
		_debois$elm_mdl$Material_Options$Summary,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[]),
		{ctor: '_Tuple0'}));
var _debois$elm_mdl$Material_Options$styled = F2(
	function (ctor, props) {
		return ctor(
			A2(
				_debois$elm_mdl$Material_Options$addAttributes,
				_debois$elm_mdl$Material_Options$collect$(props),
				_elm_lang$core$Native_List.fromArray(
					[])));
	});
var _debois$elm_mdl$Material_Options$div = _debois$elm_mdl$Material_Options$styled(_elm_lang$html$Html$div);
var _debois$elm_mdl$Material_Options$span = _debois$elm_mdl$Material_Options$styled(_elm_lang$html$Html$span);
var _debois$elm_mdl$Material_Options$styled$ = F3(
	function (ctor, props, attrs) {
		return ctor(
			A2(
				_debois$elm_mdl$Material_Options$addAttributes,
				_debois$elm_mdl$Material_Options$collect$(props),
				attrs));
	});
var _debois$elm_mdl$Material_Options$img = F2(
	function (options, attrs) {
		return A4(
			_debois$elm_mdl$Material_Options$styled$,
			_elm_lang$html$Html$img,
			options,
			attrs,
			_elm_lang$core$Native_List.fromArray(
				[]));
	});

var _debois$elm_mdl$Material_Badge$add = function (str) {
	return _debois$elm_mdl$Material_Options$many(
		_elm_lang$core$Native_List.fromArray(
			[
				A2(_debois$elm_mdl$Material_Options$data, 'badge', str),
				_debois$elm_mdl$Material_Options$cs('mdl-badge')
			]));
};
var _debois$elm_mdl$Material_Badge$overlap = _debois$elm_mdl$Material_Options$cs('mdl-badge--overlap');
var _debois$elm_mdl$Material_Badge$noBackground = _debois$elm_mdl$Material_Options$cs('mdl-badge--no-background');

var _debois$elm_mdl$Material_Icon$size48 = A2(_debois$elm_mdl$Material_Options$css, 'font-size', '48px');
var _debois$elm_mdl$Material_Icon$size36 = A2(_debois$elm_mdl$Material_Options$css, 'font-size', '36px');
var _debois$elm_mdl$Material_Icon$size24 = A2(_debois$elm_mdl$Material_Options$css, 'font-size', '24px');
var _debois$elm_mdl$Material_Icon$size18 = A2(_debois$elm_mdl$Material_Options$css, 'font-size', '18px');
var _debois$elm_mdl$Material_Icon$onClick = function (x) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					onClick: _elm_lang$core$Maybe$Just(
						_elm_lang$html$Html_Events$onClick(x))
				});
		});
};
var _debois$elm_mdl$Material_Icon$defaultConfig = {onClick: _elm_lang$core$Maybe$Nothing};
var _debois$elm_mdl$Material_Icon$view = F2(
	function (name, options) {
		var summary = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Icon$defaultConfig, options);
		return A5(
			_debois$elm_mdl$Material_Options$apply,
			summary,
			_elm_lang$html$Html$i,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$cs('material-icons')
				]),
			A2(
				_elm_lang$core$Maybe$withDefault,
				_elm_lang$core$Native_List.fromArray(
					[]),
				A2(
					_elm_lang$core$Maybe$map,
					A2(
						_elm_lang$core$Basics$flip,
						F2(
							function (x, y) {
								return A2(_elm_lang$core$List_ops['::'], x, y);
							}),
						_elm_lang$core$Native_List.fromArray(
							[])),
					summary.config.onClick)),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text(name)
				]));
	});
var _debois$elm_mdl$Material_Icon$i = function (name) {
	return A2(
		_debois$elm_mdl$Material_Icon$view,
		name,
		_elm_lang$core$Native_List.fromArray(
			[]));
};
var _debois$elm_mdl$Material_Icon$Config = function (a) {
	return {onClick: a};
};

var _debois$elm_mdl$Material_Grid$clip = F3(
	function (lower, upper, k) {
		return A2(
			_elm_lang$core$Basics$max,
			lower,
			A2(_elm_lang$core$Basics$min, k, upper));
	});
var _debois$elm_mdl$Material_Grid$stretch = _debois$elm_mdl$Material_Options$cs('mdl-cell--stretch');
var _debois$elm_mdl$Material_Grid$align = function (a) {
	var _p0 = a;
	switch (_p0.ctor) {
		case 'Top':
			return _debois$elm_mdl$Material_Options$cs('mdl-cell--top');
		case 'Middle':
			return _debois$elm_mdl$Material_Options$cs('mdl-cell--middle');
		default:
			return _debois$elm_mdl$Material_Options$cs('mdl-cell--bottom');
	}
};
var _debois$elm_mdl$Material_Grid$suffix = function (device) {
	var _p1 = device;
	switch (_p1.ctor) {
		case 'All':
			return '';
		case 'Desktop':
			return '-desktop';
		case 'Tablet':
			return '-tablet';
		default:
			return '-phone';
	}
};
var _debois$elm_mdl$Material_Grid$size = F2(
	function (device, k) {
		var c = function () {
			var _p2 = device;
			switch (_p2.ctor) {
				case 'All':
					return A3(_debois$elm_mdl$Material_Grid$clip, 1, 12, k);
				case 'Desktop':
					return A3(_debois$elm_mdl$Material_Grid$clip, 1, 12, k);
				case 'Tablet':
					return A3(_debois$elm_mdl$Material_Grid$clip, 1, 8, k);
				default:
					return A3(_debois$elm_mdl$Material_Grid$clip, 1, 4, k);
			}
		}();
		return _debois$elm_mdl$Material_Options$cs(
			A2(
				_elm_lang$core$Basics_ops['++'],
				'mdl-cell--',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(c),
					A2(
						_elm_lang$core$Basics_ops['++'],
						'-col',
						_debois$elm_mdl$Material_Grid$suffix(device)))));
	});
var _debois$elm_mdl$Material_Grid$offset = F2(
	function (device, k) {
		var c = function () {
			var _p3 = device;
			switch (_p3.ctor) {
				case 'All':
					return A3(_debois$elm_mdl$Material_Grid$clip, 1, 11, k);
				case 'Desktop':
					return A3(_debois$elm_mdl$Material_Grid$clip, 1, 11, k);
				case 'Tablet':
					return A3(_debois$elm_mdl$Material_Grid$clip, 1, 7, k);
				default:
					return A3(_debois$elm_mdl$Material_Grid$clip, 1, 3, k);
			}
		}();
		return _debois$elm_mdl$Material_Options$cs(
			A2(
				_elm_lang$core$Basics_ops['++'],
				'mdl-cell--',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(c),
					A2(
						_elm_lang$core$Basics_ops['++'],
						'-offset',
						_debois$elm_mdl$Material_Grid$suffix(device)))));
	});
var _debois$elm_mdl$Material_Grid$hide = function (device) {
	return _debois$elm_mdl$Material_Options$cs(
		function () {
			var _p4 = device;
			if (_p4.ctor === 'All') {
				return '';
			} else {
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'mdl-cell--hide-',
					_debois$elm_mdl$Material_Grid$suffix(device));
			}
		}());
};
var _debois$elm_mdl$Material_Grid$order = F2(
	function (device, n) {
		return _debois$elm_mdl$Material_Options$cs(
			A2(
				_elm_lang$core$Basics_ops['++'],
				'mdl-cell--order-',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(
						A3(_debois$elm_mdl$Material_Grid$clip, 1, 12, n)),
					_debois$elm_mdl$Material_Grid$suffix(device))));
	});
var _debois$elm_mdl$Material_Grid$grid = F2(
	function (styling, cells) {
		return A2(
			_debois$elm_mdl$Material_Options$div,
			A2(
				_elm_lang$core$List_ops['::'],
				_debois$elm_mdl$Material_Options$cs('mdl-grid'),
				styling),
			A2(
				_elm_lang$core$List$map,
				function (_p5) {
					var _p6 = _p5;
					return _p6._0;
				},
				cells));
	});
var _debois$elm_mdl$Material_Grid$maxWidth = function (w) {
	return A2(_debois$elm_mdl$Material_Options$css, 'max-width', w);
};
var _debois$elm_mdl$Material_Grid$noSpacing = _debois$elm_mdl$Material_Options$cs('mdl-grid--no-spacing');
var _debois$elm_mdl$Material_Grid$Phone = {ctor: 'Phone'};
var _debois$elm_mdl$Material_Grid$Tablet = {ctor: 'Tablet'};
var _debois$elm_mdl$Material_Grid$Desktop = {ctor: 'Desktop'};
var _debois$elm_mdl$Material_Grid$All = {ctor: 'All'};
var _debois$elm_mdl$Material_Grid$Cell = function (a) {
	return {ctor: 'Cell', _0: a};
};
var _debois$elm_mdl$Material_Grid$cell = F2(
	function (styling, elms) {
		return _debois$elm_mdl$Material_Grid$Cell(
			A2(
				_debois$elm_mdl$Material_Options$div,
				A2(
					_elm_lang$core$List_ops['::'],
					_debois$elm_mdl$Material_Options$cs('mdl-cell'),
					styling),
				elms));
	});
var _debois$elm_mdl$Material_Grid$Bottom = {ctor: 'Bottom'};
var _debois$elm_mdl$Material_Grid$Middle = {ctor: 'Middle'};
var _debois$elm_mdl$Material_Grid$Top = {ctor: 'Top'};

//import Native.Scheduler //

var _elm_lang$core$Native_Time = function() {

var now = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
{
	callback(_elm_lang$core$Native_Scheduler.succeed(Date.now()));
});

function setInterval_(interval, task)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var id = setInterval(function() {
			_elm_lang$core$Native_Scheduler.rawSpawn(task);
		}, interval);

		return function() { clearInterval(id); };
	});
}

return {
	now: now,
	setInterval_: F2(setInterval_)
};

}();
var _elm_lang$core$Task$onError = _elm_lang$core$Native_Scheduler.onError;
var _elm_lang$core$Task$andThen = _elm_lang$core$Native_Scheduler.andThen;
var _elm_lang$core$Task$spawnCmd = F2(
	function (router, _p0) {
		var _p1 = _p0;
		return _elm_lang$core$Native_Scheduler.spawn(
			A2(
				_elm_lang$core$Task$andThen,
				_p1._0,
				_elm_lang$core$Platform$sendToApp(router)));
	});
var _elm_lang$core$Task$fail = _elm_lang$core$Native_Scheduler.fail;
var _elm_lang$core$Task$mapError = F2(
	function (f, task) {
		return A2(
			_elm_lang$core$Task$onError,
			task,
			function (err) {
				return _elm_lang$core$Task$fail(
					f(err));
			});
	});
var _elm_lang$core$Task$succeed = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			_elm_lang$core$Task$andThen,
			taskA,
			function (a) {
				return _elm_lang$core$Task$succeed(
					func(a));
			});
	});
var _elm_lang$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			_elm_lang$core$Task$andThen,
			taskA,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					taskB,
					function (b) {
						return _elm_lang$core$Task$succeed(
							A2(func, a, b));
					});
			});
	});
var _elm_lang$core$Task$map3 = F4(
	function (func, taskA, taskB, taskC) {
		return A2(
			_elm_lang$core$Task$andThen,
			taskA,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					taskB,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							taskC,
							function (c) {
								return _elm_lang$core$Task$succeed(
									A3(func, a, b, c));
							});
					});
			});
	});
var _elm_lang$core$Task$map4 = F5(
	function (func, taskA, taskB, taskC, taskD) {
		return A2(
			_elm_lang$core$Task$andThen,
			taskA,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					taskB,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							taskC,
							function (c) {
								return A2(
									_elm_lang$core$Task$andThen,
									taskD,
									function (d) {
										return _elm_lang$core$Task$succeed(
											A4(func, a, b, c, d));
									});
							});
					});
			});
	});
var _elm_lang$core$Task$map5 = F6(
	function (func, taskA, taskB, taskC, taskD, taskE) {
		return A2(
			_elm_lang$core$Task$andThen,
			taskA,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					taskB,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							taskC,
							function (c) {
								return A2(
									_elm_lang$core$Task$andThen,
									taskD,
									function (d) {
										return A2(
											_elm_lang$core$Task$andThen,
											taskE,
											function (e) {
												return _elm_lang$core$Task$succeed(
													A5(func, a, b, c, d, e));
											});
									});
							});
					});
			});
	});
var _elm_lang$core$Task$andMap = F2(
	function (taskFunc, taskValue) {
		return A2(
			_elm_lang$core$Task$andThen,
			taskFunc,
			function (func) {
				return A2(
					_elm_lang$core$Task$andThen,
					taskValue,
					function (value) {
						return _elm_lang$core$Task$succeed(
							func(value));
					});
			});
	});
var _elm_lang$core$Task$sequence = function (tasks) {
	var _p2 = tasks;
	if (_p2.ctor === '[]') {
		return _elm_lang$core$Task$succeed(
			_elm_lang$core$Native_List.fromArray(
				[]));
	} else {
		return A3(
			_elm_lang$core$Task$map2,
			F2(
				function (x, y) {
					return A2(_elm_lang$core$List_ops['::'], x, y);
				}),
			_p2._0,
			_elm_lang$core$Task$sequence(_p2._1));
	}
};
var _elm_lang$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			_elm_lang$core$Task$map,
			function (_p3) {
				return {ctor: '_Tuple0'};
			},
			_elm_lang$core$Task$sequence(
				A2(
					_elm_lang$core$List$map,
					_elm_lang$core$Task$spawnCmd(router),
					commands)));
	});
var _elm_lang$core$Task$toMaybe = function (task) {
	return A2(
		_elm_lang$core$Task$onError,
		A2(_elm_lang$core$Task$map, _elm_lang$core$Maybe$Just, task),
		function (_p4) {
			return _elm_lang$core$Task$succeed(_elm_lang$core$Maybe$Nothing);
		});
};
var _elm_lang$core$Task$fromMaybe = F2(
	function ($default, maybe) {
		var _p5 = maybe;
		if (_p5.ctor === 'Just') {
			return _elm_lang$core$Task$succeed(_p5._0);
		} else {
			return _elm_lang$core$Task$fail($default);
		}
	});
var _elm_lang$core$Task$toResult = function (task) {
	return A2(
		_elm_lang$core$Task$onError,
		A2(_elm_lang$core$Task$map, _elm_lang$core$Result$Ok, task),
		function (msg) {
			return _elm_lang$core$Task$succeed(
				_elm_lang$core$Result$Err(msg));
		});
};
var _elm_lang$core$Task$fromResult = function (result) {
	var _p6 = result;
	if (_p6.ctor === 'Ok') {
		return _elm_lang$core$Task$succeed(_p6._0);
	} else {
		return _elm_lang$core$Task$fail(_p6._0);
	}
};
var _elm_lang$core$Task$init = _elm_lang$core$Task$succeed(
	{ctor: '_Tuple0'});
var _elm_lang$core$Task$onSelfMsg = F3(
	function (_p9, _p8, _p7) {
		return _elm_lang$core$Task$succeed(
			{ctor: '_Tuple0'});
	});
var _elm_lang$core$Task$command = _elm_lang$core$Native_Platform.leaf('Task');
var _elm_lang$core$Task$T = function (a) {
	return {ctor: 'T', _0: a};
};
var _elm_lang$core$Task$perform = F3(
	function (onFail, onSuccess, task) {
		return _elm_lang$core$Task$command(
			_elm_lang$core$Task$T(
				A2(
					_elm_lang$core$Task$onError,
					A2(_elm_lang$core$Task$map, onSuccess, task),
					function (x) {
						return _elm_lang$core$Task$succeed(
							onFail(x));
					})));
	});
var _elm_lang$core$Task$cmdMap = F2(
	function (tagger, _p10) {
		var _p11 = _p10;
		return _elm_lang$core$Task$T(
			A2(_elm_lang$core$Task$map, tagger, _p11._0));
	});
_elm_lang$core$Native_Platform.effectManagers['Task'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Task$init, onEffects: _elm_lang$core$Task$onEffects, onSelfMsg: _elm_lang$core$Task$onSelfMsg, tag: 'cmd', cmdMap: _elm_lang$core$Task$cmdMap};

var _elm_lang$core$Time$setInterval = _elm_lang$core$Native_Time.setInterval_;
var _elm_lang$core$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		var _p0 = intervals;
		if (_p0.ctor === '[]') {
			return _elm_lang$core$Task$succeed(processes);
		} else {
			var _p1 = _p0._0;
			return A2(
				_elm_lang$core$Task$andThen,
				_elm_lang$core$Native_Scheduler.spawn(
					A2(
						_elm_lang$core$Time$setInterval,
						_p1,
						A2(_elm_lang$core$Platform$sendToSelf, router, _p1))),
				function (id) {
					return A3(
						_elm_lang$core$Time$spawnHelp,
						router,
						_p0._1,
						A3(_elm_lang$core$Dict$insert, _p1, id, processes));
				});
		}
	});
var _elm_lang$core$Time$addMySub = F2(
	function (_p2, state) {
		var _p3 = _p2;
		var _p6 = _p3._1;
		var _p5 = _p3._0;
		var _p4 = A2(_elm_lang$core$Dict$get, _p5, state);
		if (_p4.ctor === 'Nothing') {
			return A3(
				_elm_lang$core$Dict$insert,
				_p5,
				_elm_lang$core$Native_List.fromArray(
					[_p6]),
				state);
		} else {
			return A3(
				_elm_lang$core$Dict$insert,
				_p5,
				A2(_elm_lang$core$List_ops['::'], _p6, _p4._0),
				state);
		}
	});
var _elm_lang$core$Time$inMilliseconds = function (t) {
	return t;
};
var _elm_lang$core$Time$millisecond = 1;
var _elm_lang$core$Time$second = 1000 * _elm_lang$core$Time$millisecond;
var _elm_lang$core$Time$minute = 60 * _elm_lang$core$Time$second;
var _elm_lang$core$Time$hour = 60 * _elm_lang$core$Time$minute;
var _elm_lang$core$Time$inHours = function (t) {
	return t / _elm_lang$core$Time$hour;
};
var _elm_lang$core$Time$inMinutes = function (t) {
	return t / _elm_lang$core$Time$minute;
};
var _elm_lang$core$Time$inSeconds = function (t) {
	return t / _elm_lang$core$Time$second;
};
var _elm_lang$core$Time$now = _elm_lang$core$Native_Time.now;
var _elm_lang$core$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _p7 = A2(_elm_lang$core$Dict$get, interval, state.taggers);
		if (_p7.ctor === 'Nothing') {
			return _elm_lang$core$Task$succeed(state);
		} else {
			return A2(
				_elm_lang$core$Task$andThen,
				_elm_lang$core$Time$now,
				function (time) {
					return A2(
						_elm_lang$core$Task$andThen,
						_elm_lang$core$Task$sequence(
							A2(
								_elm_lang$core$List$map,
								function (tagger) {
									return A2(
										_elm_lang$core$Platform$sendToApp,
										router,
										tagger(time));
								},
								_p7._0)),
						function (_p8) {
							return _elm_lang$core$Task$succeed(state);
						});
				});
		}
	});
var _elm_lang$core$Time$subscription = _elm_lang$core$Native_Platform.leaf('Time');
var _elm_lang$core$Time$State = F2(
	function (a, b) {
		return {taggers: a, processes: b};
	});
var _elm_lang$core$Time$init = _elm_lang$core$Task$succeed(
	A2(_elm_lang$core$Time$State, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty));
var _elm_lang$core$Time$onEffects = F3(
	function (router, subs, _p9) {
		var _p10 = _p9;
		var rightStep = F3(
			function (_p12, id, _p11) {
				var _p13 = _p11;
				return {
					ctor: '_Tuple3',
					_0: _p13._0,
					_1: _p13._1,
					_2: A2(
						_elm_lang$core$Task$andThen,
						_elm_lang$core$Native_Scheduler.kill(id),
						function (_p14) {
							return _p13._2;
						})
				};
			});
		var bothStep = F4(
			function (interval, taggers, id, _p15) {
				var _p16 = _p15;
				return {
					ctor: '_Tuple3',
					_0: _p16._0,
					_1: A3(_elm_lang$core$Dict$insert, interval, id, _p16._1),
					_2: _p16._2
				};
			});
		var leftStep = F3(
			function (interval, taggers, _p17) {
				var _p18 = _p17;
				return {
					ctor: '_Tuple3',
					_0: A2(_elm_lang$core$List_ops['::'], interval, _p18._0),
					_1: _p18._1,
					_2: _p18._2
				};
			});
		var newTaggers = A3(_elm_lang$core$List$foldl, _elm_lang$core$Time$addMySub, _elm_lang$core$Dict$empty, subs);
		var _p19 = A6(
			_elm_lang$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			_p10.processes,
			{
				ctor: '_Tuple3',
				_0: _elm_lang$core$Native_List.fromArray(
					[]),
				_1: _elm_lang$core$Dict$empty,
				_2: _elm_lang$core$Task$succeed(
					{ctor: '_Tuple0'})
			});
		var spawnList = _p19._0;
		var existingDict = _p19._1;
		var killTask = _p19._2;
		return A2(
			_elm_lang$core$Task$andThen,
			killTask,
			function (_p20) {
				return A2(
					_elm_lang$core$Task$andThen,
					A3(_elm_lang$core$Time$spawnHelp, router, spawnList, existingDict),
					function (newProcesses) {
						return _elm_lang$core$Task$succeed(
							A2(_elm_lang$core$Time$State, newTaggers, newProcesses));
					});
			});
	});
var _elm_lang$core$Time$Every = F2(
	function (a, b) {
		return {ctor: 'Every', _0: a, _1: b};
	});
var _elm_lang$core$Time$every = F2(
	function (interval, tagger) {
		return _elm_lang$core$Time$subscription(
			A2(_elm_lang$core$Time$Every, interval, tagger));
	});
var _elm_lang$core$Time$subMap = F2(
	function (f, _p21) {
		var _p22 = _p21;
		return A2(
			_elm_lang$core$Time$Every,
			_p22._0,
			function (_p23) {
				return f(
					_p22._1(_p23));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Time'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Time$init, onEffects: _elm_lang$core$Time$onEffects, onSelfMsg: _elm_lang$core$Time$onSelfMsg, tag: 'sub', subMap: _elm_lang$core$Time$subMap};

var _elm_lang$core$Process$kill = _elm_lang$core$Native_Scheduler.kill;
var _elm_lang$core$Process$sleep = _elm_lang$core$Native_Scheduler.sleep;
var _elm_lang$core$Process$spawn = _elm_lang$core$Native_Scheduler.spawn;

var _debois$elm_mdl$Material_Helpers$noAttr = A2(_elm_lang$html$Html_Attributes$attribute, 'data-elm-mdl-noop', '');
var _debois$elm_mdl$Material_Helpers$aria = F2(
	function (name, value) {
		return value ? A2(
			_elm_lang$html$Html_Attributes$attribute,
			A2(_elm_lang$core$Basics_ops['++'], 'aria-', name),
			'true') : _debois$elm_mdl$Material_Helpers$noAttr;
	});
var _debois$elm_mdl$Material_Helpers$delay = F2(
	function (t, x) {
		return A3(
			_elm_lang$core$Task$perform,
			_elm_lang$core$Basics$always(x),
			_elm_lang$core$Basics$always(x),
			_elm_lang$core$Process$sleep(t));
	});
var _debois$elm_mdl$Material_Helpers$cssTransitionStep = function (x) {
	return A2(_debois$elm_mdl$Material_Helpers$delay, 50, x);
};
var _debois$elm_mdl$Material_Helpers$cmd = function (msg) {
	return A3(
		_elm_lang$core$Task$perform,
		_elm_lang$core$Basics$always(msg),
		_elm_lang$core$Basics$always(msg),
		_elm_lang$core$Task$succeed(msg));
};
var _debois$elm_mdl$Material_Helpers$lift = F6(
	function (get, set, fwd, update, action, model) {
		var _p0 = A2(
			update,
			action,
			get(model));
		var submodel$ = _p0._0;
		var e = _p0._1;
		return {
			ctor: '_Tuple2',
			_0: A2(set, model, submodel$),
			_1: A2(_elm_lang$core$Platform_Cmd$map, fwd, e)
		};
	});
var _debois$elm_mdl$Material_Helpers$lift$ = F5(
	function (get, set, update, action, model) {
		return {
			ctor: '_Tuple2',
			_0: A2(
				set,
				model,
				A2(
					update,
					action,
					get(model))),
			_1: _elm_lang$core$Platform_Cmd$none
		};
	});
var _debois$elm_mdl$Material_Helpers$map2nd = F2(
	function (f, _p1) {
		var _p2 = _p1;
		return {
			ctor: '_Tuple2',
			_0: _p2._0,
			_1: f(_p2._1)
		};
	});
var _debois$elm_mdl$Material_Helpers$map1st = F2(
	function (f, _p3) {
		var _p4 = _p3;
		return {
			ctor: '_Tuple2',
			_0: f(_p4._0),
			_1: _p4._1
		};
	});
var _debois$elm_mdl$Material_Helpers$blurOn = function (evt) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		A2(_elm_lang$core$Basics_ops['++'], 'on', evt),
		'this.blur()');
};
var _debois$elm_mdl$Material_Helpers$effect = F2(
	function (e, x) {
		return {ctor: '_Tuple2', _0: x, _1: e};
	});
var _debois$elm_mdl$Material_Helpers$pure = _debois$elm_mdl$Material_Helpers$effect(_elm_lang$core$Platform_Cmd$none);
var _debois$elm_mdl$Material_Helpers$filter = F3(
	function (elem, attr, html) {
		return A2(
			elem,
			attr,
			A2(
				_elm_lang$core$List$filterMap,
				function (x) {
					return x;
				},
				html));
	});

var _elm_lang$html$Html_App$programWithFlags = _elm_lang$virtual_dom$VirtualDom$programWithFlags;
var _elm_lang$html$Html_App$program = function (app) {
	return _elm_lang$html$Html_App$programWithFlags(
		_elm_lang$core$Native_Utils.update(
			app,
			{
				init: function (_p0) {
					return app.init;
				}
			}));
};
var _elm_lang$html$Html_App$beginnerProgram = function (_p1) {
	var _p2 = _p1;
	return _elm_lang$html$Html_App$programWithFlags(
		{
			init: function (_p3) {
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_p2.model,
					_elm_lang$core$Native_List.fromArray(
						[]));
			},
			update: F2(
				function (msg, model) {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						A2(_p2.update, msg, model),
						_elm_lang$core$Native_List.fromArray(
							[]));
				}),
			view: _p2.view,
			subscriptions: function (_p4) {
				return _elm_lang$core$Platform_Sub$none;
			}
		});
};
var _elm_lang$html$Html_App$map = _elm_lang$virtual_dom$VirtualDom$map;

var _debois$elm_parts$Parts$map2nd = F2(
	function (f, _p0) {
		var _p1 = _p0;
		return {
			ctor: '_Tuple2',
			_0: _p1._0,
			_1: f(_p1._1)
		};
	});
var _debois$elm_parts$Parts$map1st = F2(
	function (f, _p2) {
		var _p3 = _p2;
		return {
			ctor: '_Tuple2',
			_0: f(_p3._0),
			_1: _p3._1
		};
	});
var _debois$elm_parts$Parts$generalize = F4(
	function (upd, f, m, c) {
		return _elm_lang$core$Maybe$Just(
			A2(
				_debois$elm_parts$Parts$map2nd,
				_elm_lang$core$Platform_Cmd$map(f),
				A2(upd, m, c)));
	});
var _debois$elm_parts$Parts$update = F2(
	function (_p4, c) {
		var _p5 = _p4;
		return A2(
			_elm_lang$core$Maybe$withDefault,
			{ctor: '_Tuple2', _0: c, _1: _elm_lang$core$Platform_Cmd$none},
			_p5._0(c));
	});
var _debois$elm_parts$Parts$update$ = F2(
	function (_p6, c) {
		var _p7 = _p6;
		return _p7._0(c);
	});
var _debois$elm_parts$Parts$indexed = F3(
	function (get, set, model0) {
		return {
			ctor: '_Tuple2',
			_0: F2(
				function (idx, c) {
					return A2(
						_elm_lang$core$Maybe$withDefault,
						model0,
						A2(
							_elm_lang$core$Dict$get,
							idx,
							get(c)));
				}),
			_1: F3(
				function (idx, model, c) {
					return A2(
						set,
						A3(
							_elm_lang$core$Dict$insert,
							idx,
							model,
							get(c)),
						c);
				})
		};
	});
var _debois$elm_parts$Parts$accessors = F4(
	function (get0, set0, model0, idx) {
		var _p8 = A3(_debois$elm_parts$Parts$indexed, get0, set0, model0);
		var get = _p8._0;
		var set = _p8._1;
		return {
			get: get(idx),
			set: set(idx),
			map: F2(
				function (f, c) {
					return A3(
						_elm_lang$core$Basics$flip,
						set(idx),
						c,
						f(
							A2(get, idx, c)));
				}),
			reset: function (c) {
				return function (m) {
					return A2(set0, m, c);
				}(
					A2(
						_elm_lang$core$Dict$remove,
						idx,
						get0(c)));
			}
		};
	});
var _debois$elm_parts$Parts$embedUpdate = F6(
	function (get, set, update, f, msg, c) {
		return A2(
			_elm_lang$core$Maybe$map,
			_debois$elm_parts$Parts$map1st(
				A2(_elm_lang$core$Basics$flip, set, c)),
			A3(
				update,
				f,
				msg,
				get(c)));
	});
var _debois$elm_parts$Parts$embedView = F2(
	function (get, view) {
		return function (_p9) {
			return view(
				get(_p9));
		};
	});
var _debois$elm_parts$Parts$Accessors = F4(
	function (a, b, c, d) {
		return {get: a, set: b, map: c, reset: d};
	});
var _debois$elm_parts$Parts$Msg = function (a) {
	return {ctor: 'Msg', _0: a};
};
var _debois$elm_parts$Parts$partial = F3(
	function (fwd, upd, msg) {
		return _debois$elm_parts$Parts$Msg(
			function (c) {
				return A3(
					upd,
					function (_p10) {
						return fwd(
							A3(_debois$elm_parts$Parts$partial, fwd, upd, _p10));
					},
					msg,
					c);
			});
	});
var _debois$elm_parts$Parts$pack = F5(
	function (update, get0, set0, model0, fwd) {
		var _p11 = A3(_debois$elm_parts$Parts$indexed, get0, set0, model0);
		var get = _p11._0;
		var set = _p11._1;
		return function (idx) {
			return function (_p12) {
				return fwd(
					A3(
						_debois$elm_parts$Parts$partial,
						fwd,
						A3(
							_debois$elm_parts$Parts$embedUpdate,
							get(idx),
							set(idx),
							update),
						_p12));
			};
		};
	});
var _debois$elm_parts$Parts$create = F6(
	function (view, update, get0, set0, model0, fwd) {
		var embeddedUpdate = A5(_debois$elm_parts$Parts$pack, update, get0, set0, model0, fwd);
		var get = _elm_lang$core$Basics$fst(
			A3(_debois$elm_parts$Parts$indexed, get0, set0, model0));
		return F2(
			function (idx, c) {
				return A2(
					view,
					embeddedUpdate(idx),
					A2(get, idx, c));
			});
	});
var _debois$elm_parts$Parts$pack1 = F4(
	function (update, get, set, fwd) {
		return function (_p13) {
			return fwd(
				A3(
					_debois$elm_parts$Parts$partial,
					fwd,
					A3(_debois$elm_parts$Parts$embedUpdate, get, set, update),
					_p13));
		};
	});
var _debois$elm_parts$Parts$create1 = F5(
	function (view, update, get, set, fwd) {
		var embeddedUpdate = function (_p14) {
			return fwd(
				A3(
					_debois$elm_parts$Parts$partial,
					fwd,
					A3(_debois$elm_parts$Parts$embedUpdate, get, set, update),
					_p14));
		};
		return A2(
			_debois$elm_parts$Parts$embedView,
			get,
			view(embeddedUpdate));
	});

var _debois$elm_mdl$Material_Ripple$styles = F2(
	function (m, frame) {
		var r = m.rect;
		var toPx = function (k) {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(
					_elm_lang$core$Basics$round(k)),
				'px');
		};
		var offset = A2(
			_elm_lang$core$Basics_ops['++'],
			'translate(',
			A2(
				_elm_lang$core$Basics_ops['++'],
				toPx(m.x),
				A2(
					_elm_lang$core$Basics_ops['++'],
					', ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						toPx(m.y),
						')'))));
		var rippleSize = toPx(
			(_elm_lang$core$Basics$sqrt((r.width * r.width) + (r.height * r.height)) * 2.0) + 2.0);
		var scale = _elm_lang$core$Native_Utils.eq(frame, 0) ? 'scale(0.0001, 0.0001)' : '';
		var transformString = A2(
			_elm_lang$core$Basics_ops['++'],
			'translate(-50%, -50%) ',
			A2(_elm_lang$core$Basics_ops['++'], offset, scale));
		return _elm_lang$core$Native_List.fromArray(
			[
				{ctor: '_Tuple2', _0: 'width', _1: rippleSize},
				{ctor: '_Tuple2', _0: 'height', _1: rippleSize},
				{ctor: '_Tuple2', _0: '-webkit-transform', _1: transformString},
				{ctor: '_Tuple2', _0: '-ms-transform', _1: transformString},
				{ctor: '_Tuple2', _0: 'transform', _1: transformString}
			]);
	});
var _debois$elm_mdl$Material_Ripple$Metrics = F3(
	function (a, b, c) {
		return {rect: a, x: b, y: c};
	});
var _debois$elm_mdl$Material_Ripple$computeMetrics = function (g) {
	var rect = g.rect;
	var set = F2(
		function (x, y) {
			return _elm_lang$core$Maybe$Just(
				{ctor: '_Tuple2', _0: x - rect.left, _1: y - rect.top});
		});
	return A2(
		_elm_lang$core$Maybe$map,
		function (_p0) {
			var _p1 = _p0;
			return A3(_debois$elm_mdl$Material_Ripple$Metrics, rect, _p1._0, _p1._1);
		},
		function () {
			var _p2 = {ctor: '_Tuple4', _0: g.clientX, _1: g.clientY, _2: g.touchX, _3: g.touchY};
			_v1_3:
			do {
				if (_p2.ctor === '_Tuple4') {
					if ((_p2._0.ctor === 'Just') && (_p2._1.ctor === 'Just')) {
						if ((_p2._0._0 === 0.0) && (_p2._1._0 === 0.0)) {
							return _elm_lang$core$Maybe$Just(
								{ctor: '_Tuple2', _0: rect.width / 2.0, _1: rect.height / 2.0});
						} else {
							return A2(set, _p2._0._0, _p2._1._0);
						}
					} else {
						if ((_p2._2.ctor === 'Just') && (_p2._3.ctor === 'Just')) {
							return A2(set, _p2._2._0, _p2._3._0);
						} else {
							break _v1_3;
						}
					}
				} else {
					break _v1_3;
				}
			} while(false);
			return _elm_lang$core$Maybe$Nothing;
		}());
};
var _debois$elm_mdl$Material_Ripple$Model = F3(
	function (a, b, c) {
		return {animation: a, metrics: b, ignoringMouseDown: c};
	});
var _debois$elm_mdl$Material_Ripple$DOMState = F6(
	function (a, b, c, d, e, f) {
		return {rect: a, clientX: b, clientY: c, touchX: d, touchY: e, type$: f};
	});
var _debois$elm_mdl$Material_Ripple$geometryDecoder = A7(
	_elm_lang$core$Json_Decode$object6,
	_debois$elm_mdl$Material_Ripple$DOMState,
	A2(_elm_lang$core$Json_Decode_ops[':='], 'currentTarget', _debois$elm_dom$DOM$boundingClientRect),
	_elm_lang$core$Json_Decode$maybe(
		A2(_elm_lang$core$Json_Decode_ops[':='], 'clientX', _elm_lang$core$Json_Decode$float)),
	_elm_lang$core$Json_Decode$maybe(
		A2(_elm_lang$core$Json_Decode_ops[':='], 'clientY', _elm_lang$core$Json_Decode$float)),
	_elm_lang$core$Json_Decode$maybe(
		A2(
			_elm_lang$core$Json_Decode$at,
			_elm_lang$core$Native_List.fromArray(
				['touches', '0', 'clientX']),
			_elm_lang$core$Json_Decode$float)),
	_elm_lang$core$Json_Decode$maybe(
		A2(
			_elm_lang$core$Json_Decode$at,
			_elm_lang$core$Native_List.fromArray(
				['touches', '0', 'clientY']),
			_elm_lang$core$Json_Decode$float)),
	A2(_elm_lang$core$Json_Decode_ops[':='], 'type', _elm_lang$core$Json_Decode$string));
var _debois$elm_mdl$Material_Ripple$Inert = {ctor: 'Inert'};
var _debois$elm_mdl$Material_Ripple$model = {animation: _debois$elm_mdl$Material_Ripple$Inert, metrics: _elm_lang$core$Maybe$Nothing, ignoringMouseDown: false};
var _debois$elm_mdl$Material_Ripple$Frame = function (a) {
	return {ctor: 'Frame', _0: a};
};
var _debois$elm_mdl$Material_Ripple$view$ = F2(
	function (attrs, model) {
		var styling = function () {
			var _p3 = {ctor: '_Tuple2', _0: model.metrics, _1: model.animation};
			if ((_p3.ctor === '_Tuple2') && (_p3._0.ctor === 'Just')) {
				if (_p3._1.ctor === 'Frame') {
					return A2(_debois$elm_mdl$Material_Ripple$styles, _p3._0._0, _p3._1._0);
				} else {
					return A2(_debois$elm_mdl$Material_Ripple$styles, _p3._0._0, 1);
				}
			} else {
				return _elm_lang$core$Native_List.fromArray(
					[]);
			}
		}();
		return A2(
			_elm_lang$html$Html$span,
			attrs,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$html$Html$span,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$classList(
							_elm_lang$core$Native_List.fromArray(
								[
									{ctor: '_Tuple2', _0: 'mdl-ripple', _1: true},
									{
									ctor: '_Tuple2',
									_0: 'is-animating',
									_1: !_elm_lang$core$Native_Utils.eq(
										model.animation,
										_debois$elm_mdl$Material_Ripple$Frame(0))
								},
									{
									ctor: '_Tuple2',
									_0: 'is-visible',
									_1: !_elm_lang$core$Native_Utils.eq(model.animation, _debois$elm_mdl$Material_Ripple$Inert)
								}
								])),
							_elm_lang$html$Html_Attributes$style(styling)
						]),
					_elm_lang$core$Native_List.fromArray(
						[]))
				]));
	});
var _debois$elm_mdl$Material_Ripple$Tick = {ctor: 'Tick'};
var _debois$elm_mdl$Material_Ripple$update = F2(
	function (action, model) {
		var _p4 = action;
		switch (_p4.ctor) {
			case 'Down':
				var _p5 = _p4._0;
				return (_elm_lang$core$Native_Utils.eq(_p5.type$, 'mousedown') && model.ignoringMouseDown) ? _debois$elm_mdl$Material_Helpers$pure(
					_elm_lang$core$Native_Utils.update(
						model,
						{ignoringMouseDown: false})) : A2(
					_debois$elm_mdl$Material_Helpers$effect,
					_debois$elm_mdl$Material_Helpers$cssTransitionStep(_debois$elm_mdl$Material_Ripple$Tick),
					_elm_lang$core$Native_Utils.update(
						model,
						{
							animation: _debois$elm_mdl$Material_Ripple$Frame(0),
							metrics: _debois$elm_mdl$Material_Ripple$computeMetrics(_p5),
							ignoringMouseDown: _elm_lang$core$Native_Utils.eq(_p5.type$, 'touchstart') ? true : model.ignoringMouseDown
						}));
			case 'Up':
				return _debois$elm_mdl$Material_Helpers$pure(
					_elm_lang$core$Native_Utils.update(
						model,
						{animation: _debois$elm_mdl$Material_Ripple$Inert}));
			default:
				return _elm_lang$core$Native_Utils.eq(
					model.animation,
					_debois$elm_mdl$Material_Ripple$Frame(0)) ? _debois$elm_mdl$Material_Helpers$pure(
					_elm_lang$core$Native_Utils.update(
						model,
						{
							animation: _debois$elm_mdl$Material_Ripple$Frame(1)
						})) : _debois$elm_mdl$Material_Helpers$pure(model);
		}
	});
var _debois$elm_mdl$Material_Ripple$Up = {ctor: 'Up'};
var _debois$elm_mdl$Material_Ripple$upOn$ = F2(
	function (f, name) {
		return A2(
			_elm_lang$html$Html_Events$on,
			name,
			_elm_lang$core$Json_Decode$succeed(
				f(_debois$elm_mdl$Material_Ripple$Up)));
	});
var _debois$elm_mdl$Material_Ripple$upOn = _debois$elm_mdl$Material_Ripple$upOn$(_elm_lang$core$Basics$identity);
var _debois$elm_mdl$Material_Ripple$Down = function (a) {
	return {ctor: 'Down', _0: a};
};
var _debois$elm_mdl$Material_Ripple$downOn$ = F2(
	function (f, name) {
		return A2(
			_elm_lang$html$Html_Events$on,
			name,
			A2(
				_elm_lang$core$Json_Decode$map,
				function (_p6) {
					return f(
						_debois$elm_mdl$Material_Ripple$Down(_p6));
				},
				_debois$elm_mdl$Material_Ripple$geometryDecoder));
	});
var _debois$elm_mdl$Material_Ripple$downOn = _debois$elm_mdl$Material_Ripple$downOn$(_elm_lang$core$Basics$identity);
var _debois$elm_mdl$Material_Ripple$view = function (_p7) {
	return _debois$elm_mdl$Material_Ripple$view$(
		A3(
			_elm_lang$core$Basics$flip,
			_elm_lang$core$List$append,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Ripple$upOn('mouseup'),
					_debois$elm_mdl$Material_Ripple$upOn('mouseleave'),
					_debois$elm_mdl$Material_Ripple$upOn('touchend'),
					_debois$elm_mdl$Material_Ripple$upOn('blur'),
					_debois$elm_mdl$Material_Ripple$downOn('mousedown'),
					_debois$elm_mdl$Material_Ripple$downOn('touchstart')
				]),
			_p7));
};

var _debois$elm_mdl$Material_Button$icon = _debois$elm_mdl$Material_Options$cs('mdl-button--icon');
var _debois$elm_mdl$Material_Button$minifab = _debois$elm_mdl$Material_Options$cs('mdl-button--mini-fab');
var _debois$elm_mdl$Material_Button$fab = _debois$elm_mdl$Material_Options$cs('mdl-button--fab');
var _debois$elm_mdl$Material_Button$raised = _debois$elm_mdl$Material_Options$cs('mdl-button--raised');
var _debois$elm_mdl$Material_Button$flat = _debois$elm_mdl$Material_Options$nop;
var _debois$elm_mdl$Material_Button$blurAndForward = function (event) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		A2(_elm_lang$core$Basics_ops['++'], 'on', event),
		'this.blur(); (function(self) { var e = document.createEvent(\'Event\'); e.initEvent(\'touchcancel\', true, true); self.lastChild.dispatchEvent(e); }(this));');
};
var _debois$elm_mdl$Material_Button$type$ = function (tp) {
	return _debois$elm_mdl$Material_Options$set(
		function (options) {
			return _elm_lang$core$Native_Utils.update(
				options,
				{
					type$: _elm_lang$core$Maybe$Just(tp)
				});
		});
};
var _debois$elm_mdl$Material_Button$accent = _debois$elm_mdl$Material_Options$cs('mdl-button--accent');
var _debois$elm_mdl$Material_Button$primary = _debois$elm_mdl$Material_Options$cs('mdl-button--primary');
var _debois$elm_mdl$Material_Button$colored = _debois$elm_mdl$Material_Options$cs('mdl-button--colored');
var _debois$elm_mdl$Material_Button$plain = _debois$elm_mdl$Material_Options$nop;
var _debois$elm_mdl$Material_Button$disabled = _debois$elm_mdl$Material_Options$set(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{disabled: true});
	});
var _debois$elm_mdl$Material_Button$ripple = _debois$elm_mdl$Material_Options$set(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{ripple: true});
	});
var _debois$elm_mdl$Material_Button$onClick = function (x) {
	return _debois$elm_mdl$Material_Options$set(
		function (options) {
			return _elm_lang$core$Native_Utils.update(
				options,
				{
					onClick: _elm_lang$core$Maybe$Just(
						_elm_lang$html$Html_Events$onClick(x))
				});
		});
};
var _debois$elm_mdl$Material_Button$defaultConfig = {ripple: false, onClick: _elm_lang$core$Maybe$Nothing, disabled: false, type$: _elm_lang$core$Maybe$Nothing};
var _debois$elm_mdl$Material_Button$view = F4(
	function (lift, model, config, html) {
		var summary = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Button$defaultConfig, config);
		var startListeners = summary.config.ripple ? _elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$core$Maybe$Just(
				A2(_debois$elm_mdl$Material_Ripple$downOn$, lift, 'mousedown')),
				_elm_lang$core$Maybe$Just(
				A2(_debois$elm_mdl$Material_Ripple$downOn$, lift, 'touchstart'))
			]) : _elm_lang$core$Native_List.fromArray(
			[]);
		var stopListeners = function () {
			var handle = function (_p0) {
				return _elm_lang$core$Maybe$Just(
					(summary.config.ripple ? _debois$elm_mdl$Material_Button$blurAndForward : _debois$elm_mdl$Material_Helpers$blurOn)(_p0));
			};
			return _elm_lang$core$Native_List.fromArray(
				[
					handle('mouseup'),
					handle('mouseleave'),
					handle('touchend')
				]);
		}();
		var misc = _elm_lang$core$Native_List.fromArray(
			[
				summary.config.onClick,
				summary.config.disabled ? _elm_lang$core$Maybe$Just(
				_elm_lang$html$Html_Attributes$disabled(true)) : _elm_lang$core$Maybe$Nothing
			]);
		var type$ = function () {
			var _p1 = summary.config.type$;
			if (_p1.ctor === 'Nothing') {
				return _elm_lang$core$Native_List.fromArray(
					[]);
			} else {
				return _elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$core$Maybe$Just(
						_elm_lang$html$Html_Attributes$type$(_p1._0))
					]);
			}
		}();
		return A5(
			_debois$elm_mdl$Material_Options$apply,
			summary,
			_elm_lang$html$Html$button,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$cs('mdl-button'),
					_debois$elm_mdl$Material_Options$cs('mdl-js-button'),
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('mdl-js-ripple-effect'),
					summary.config.ripple)
				]),
			A2(
				_elm_lang$core$List$filterMap,
				_elm_lang$core$Basics$identity,
				_elm_lang$core$List$concat(
					_elm_lang$core$Native_List.fromArray(
						[startListeners, stopListeners, misc, type$]))),
			summary.config.ripple ? _elm_lang$core$List$concat(
				_elm_lang$core$Native_List.fromArray(
					[
						html,
						_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$html$Html_App$map,
							lift,
							A2(
								_debois$elm_mdl$Material_Ripple$view$,
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html_Attributes$class('mdl-button__ripple-container'),
										_debois$elm_mdl$Material_Ripple$upOn('blur'),
										_debois$elm_mdl$Material_Ripple$upOn('touchcancel')
									]),
								model))
						])
					])) : html);
	});
var _debois$elm_mdl$Material_Button$update = function (action) {
	return _debois$elm_mdl$Material_Ripple$update(action);
};
var _debois$elm_mdl$Material_Button$render = A5(
	_debois$elm_parts$Parts$create,
	_debois$elm_mdl$Material_Button$view,
	_debois$elm_parts$Parts$generalize(_debois$elm_mdl$Material_Button$update),
	function (_) {
		return _.button;
	},
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.update(
				y,
				{button: x});
		}),
	_debois$elm_mdl$Material_Ripple$model);
var _debois$elm_mdl$Material_Button$defaultModel = _debois$elm_mdl$Material_Ripple$model;
var _debois$elm_mdl$Material_Button$Config = F4(
	function (a, b, c, d) {
		return {ripple: a, onClick: b, disabled: c, type$: d};
	});

var _debois$elm_mdl$Material_Textfield$update = F2(
	function (action, model) {
		var _p0 = action;
		switch (_p0.ctor) {
			case 'Input':
				return _elm_lang$core$Native_Utils.update(
					model,
					{value: _p0._0});
			case 'Blur':
				return _elm_lang$core$Native_Utils.update(
					model,
					{isFocused: false});
			default:
				return _elm_lang$core$Native_Utils.update(
					model,
					{isFocused: true});
		}
	});
var _debois$elm_mdl$Material_Textfield$defaultModel = {isFocused: false, value: ''};
var _debois$elm_mdl$Material_Textfield$cols = function (cols) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					cols: _elm_lang$core$Maybe$Just(cols)
				});
		});
};
var _debois$elm_mdl$Material_Textfield$rows = function (rows) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					rows: _elm_lang$core$Maybe$Just(rows)
				});
		});
};
var _debois$elm_mdl$Material_Textfield$style = _debois$elm_mdl$Material_Options$inner;
var _debois$elm_mdl$Material_Textfield$on = F2(
	function (event, decoder) {
		return _debois$elm_mdl$Material_Options$set(
			function (config) {
				return _elm_lang$core$Native_Utils.update(
					config,
					{
						listeners: A2(
							_elm_lang$core$Basics_ops['++'],
							config.listeners,
							_elm_lang$core$Native_List.fromArray(
								[
									A2(_elm_lang$html$Html_Events$on, event, decoder)
								]))
					});
			});
	});
var _debois$elm_mdl$Material_Textfield$onInput = function (f) {
	return A2(
		_debois$elm_mdl$Material_Textfield$on,
		'input',
		A2(_elm_lang$core$Json_Decode$map, f, _elm_lang$html$Html_Events$targetValue));
};
var _debois$elm_mdl$Material_Textfield$onBlur = function (f) {
	return A2(
		_debois$elm_mdl$Material_Textfield$on,
		'focusout',
		_elm_lang$core$Json_Decode$succeed(f));
};
var _debois$elm_mdl$Material_Textfield$onFocus = function (f) {
	return A2(
		_debois$elm_mdl$Material_Textfield$on,
		'focusin',
		_elm_lang$core$Json_Decode$succeed(f));
};
var _debois$elm_mdl$Material_Textfield$disabled = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{disabled: true});
	});
var _debois$elm_mdl$Material_Textfield$maxlength = function (v) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					maxlength: _elm_lang$core$Maybe$Just(v)
				});
		});
};
var _debois$elm_mdl$Material_Textfield$autofocus = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{autofocus: true});
	});
var _debois$elm_mdl$Material_Textfield$value = function (str) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					value: _elm_lang$core$Maybe$Just(str)
				});
		});
};
var _debois$elm_mdl$Material_Textfield$error = function (str) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					error: _elm_lang$core$Maybe$Just(str)
				});
		});
};
var _debois$elm_mdl$Material_Textfield$expandableIcon = function (id) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{expandableIcon: id});
		});
};
var _debois$elm_mdl$Material_Textfield$expandable = function (id) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					expandable: _elm_lang$core$Maybe$Just(id)
				});
		});
};
var _debois$elm_mdl$Material_Textfield$floatingLabel = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{labelFloat: true});
	});
var _debois$elm_mdl$Material_Textfield$label = function (str) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					labelText: _elm_lang$core$Maybe$Just(str)
				});
		});
};
var _debois$elm_mdl$Material_Textfield$Config = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return function (m) {
													return function (n) {
														return {labelText: a, labelFloat: b, error: c, value: d, disabled: e, kind: f, rows: g, cols: h, autofocus: i, maxlength: j, inner: k, listeners: l, expandable: m, expandableIcon: n};
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
		};
	};
};
var _debois$elm_mdl$Material_Textfield$Model = F2(
	function (a, b) {
		return {isFocused: a, value: b};
	});
var _debois$elm_mdl$Material_Textfield$Password = {ctor: 'Password'};
var _debois$elm_mdl$Material_Textfield$password = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{kind: _debois$elm_mdl$Material_Textfield$Password});
	});
var _debois$elm_mdl$Material_Textfield$Textarea = {ctor: 'Textarea'};
var _debois$elm_mdl$Material_Textfield$textarea = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{kind: _debois$elm_mdl$Material_Textfield$Textarea});
	});
var _debois$elm_mdl$Material_Textfield$Text = {ctor: 'Text'};
var _debois$elm_mdl$Material_Textfield$defaultConfig = {
	labelText: _elm_lang$core$Maybe$Nothing,
	labelFloat: false,
	error: _elm_lang$core$Maybe$Nothing,
	value: _elm_lang$core$Maybe$Nothing,
	disabled: false,
	kind: _debois$elm_mdl$Material_Textfield$Text,
	rows: _elm_lang$core$Maybe$Nothing,
	cols: _elm_lang$core$Maybe$Nothing,
	autofocus: false,
	maxlength: _elm_lang$core$Maybe$Nothing,
	inner: _elm_lang$core$Native_List.fromArray(
		[]),
	listeners: _elm_lang$core$Native_List.fromArray(
		[]),
	expandable: _elm_lang$core$Maybe$Nothing,
	expandableIcon: 'search'
};
var _debois$elm_mdl$Material_Textfield$text$ = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{kind: _debois$elm_mdl$Material_Textfield$Text});
	});
var _debois$elm_mdl$Material_Textfield$Input = function (a) {
	return {ctor: 'Input', _0: a};
};
var _debois$elm_mdl$Material_Textfield$Focus = {ctor: 'Focus'};
var _debois$elm_mdl$Material_Textfield$Blur = {ctor: 'Blur'};
var _debois$elm_mdl$Material_Textfield$view = F3(
	function (lift, model, options) {
		var _p1 = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Textfield$defaultConfig, options);
		var summary = _p1;
		var config = _p1.config;
		var val = A2(_elm_lang$core$Maybe$withDefault, model.value, config.value);
		var isTextarea = _elm_lang$core$Native_Utils.eq(config.kind, _debois$elm_mdl$Material_Textfield$Textarea);
		var elementFunction = isTextarea ? _elm_lang$html$Html$textarea : _elm_lang$html$Html$input;
		var typeAttributes = function () {
			var _p2 = config.kind;
			switch (_p2.ctor) {
				case 'Text':
					return _elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$type$('text')
						]);
				case 'Password':
					return _elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$type$('password')
						]);
				default:
					return A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Native_List.fromArray(
							[]),
						A2(
							_elm_lang$core$Basics_ops['++'],
							function () {
								var _p3 = config.rows;
								if (_p3.ctor === 'Just') {
									return _elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html_Attributes$rows(_p3._0)
										]);
								} else {
									return _elm_lang$core$Native_List.fromArray(
										[]);
								}
							}(),
							function () {
								var _p4 = config.cols;
								if (_p4.ctor === 'Just') {
									return _elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html_Attributes$cols(_p4._0)
										]);
								} else {
									return _elm_lang$core$Native_List.fromArray(
										[]);
								}
							}()));
			}
		}();
		var maxlength = function () {
			var _p5 = config.maxlength;
			if (_p5.ctor === 'Just') {
				return _elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$maxlength(_p5._0)
					]);
			} else {
				return _elm_lang$core$Native_List.fromArray(
					[]);
			}
		}();
		var listeners = config.listeners;
		var textValue = function () {
			var _p6 = config.value;
			if (_p6.ctor === 'Just') {
				return _elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$value(_p6._0)
					]);
			} else {
				return _elm_lang$core$Native_List.fromArray(
					[]);
			}
		}();
		var defaultInput = function () {
			var _p7 = config.value;
			if (_p7.ctor === 'Just') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				return _elm_lang$core$Maybe$Just(
					A2(
						_elm_lang$html$Html_Events$on,
						'input',
						A2(
							_elm_lang$core$Json_Decode$map,
							function (_p8) {
								return lift(
									_debois$elm_mdl$Material_Textfield$Input(_p8));
							},
							_elm_lang$html$Html_Events$targetValue)));
			}
		}();
		var labelFor = function () {
			var _p9 = config.expandable;
			if (_p9.ctor === 'Nothing') {
				return _elm_lang$core$Native_List.fromArray(
					[]);
			} else {
				return _elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$for(_p9._0)
					]);
			}
		}();
		var expandableId = function () {
			var _p10 = config.expandable;
			if (_p10.ctor === 'Nothing') {
				return _debois$elm_mdl$Material_Options$nop;
			} else {
				return _debois$elm_mdl$Material_Options_Internal$attribute(
					_elm_lang$html$Html_Attributes$id(_p10._0));
			}
		}();
		var expHolder = function () {
			var _p11 = config.expandable;
			if (_p11.ctor === 'Nothing') {
				return _elm_lang$core$Basics$identity;
			} else {
				return function (x) {
					return _elm_lang$core$Native_List.fromArray(
						[
							A4(
							_debois$elm_mdl$Material_Options$styled$,
							_elm_lang$html$Html$label,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Options$cs('mdl-button'),
									_debois$elm_mdl$Material_Options$cs('mdl-js-button'),
									_debois$elm_mdl$Material_Options$cs('mdl-button--icon')
								]),
							labelFor,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Icon$i(config.expandableIcon)
								])),
							A3(
							_debois$elm_mdl$Material_Options$styled,
							_elm_lang$html$Html$div,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Options$cs('mdl-textfield__expandable-holder')
								]),
							x)
						]);
				};
			}
		}();
		return A5(
			_debois$elm_mdl$Material_Options$apply,
			summary,
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$cs('mdl-textfield'),
					_debois$elm_mdl$Material_Options$cs('mdl-js-textfield'),
					_debois$elm_mdl$Material_Options$cs('is-upgraded'),
					config.labelFloat ? _debois$elm_mdl$Material_Options$cs('mdl-textfield--floating-label') : _debois$elm_mdl$Material_Options$nop,
					(!_elm_lang$core$Native_Utils.eq(config.error, _elm_lang$core$Maybe$Nothing)) ? _debois$elm_mdl$Material_Options$cs('is-invalid') : _debois$elm_mdl$Material_Options$nop,
					(!_elm_lang$core$Native_Utils.eq(val, '')) ? _debois$elm_mdl$Material_Options$cs('is-dirty') : _debois$elm_mdl$Material_Options$nop,
					(model.isFocused && _elm_lang$core$Basics$not(config.disabled)) ? _debois$elm_mdl$Material_Options$cs('is-focused') : _debois$elm_mdl$Material_Options$nop,
					config.disabled ? _debois$elm_mdl$Material_Options$cs('is-disabled') : _debois$elm_mdl$Material_Options$nop,
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('mdl-textfield--expandable'),
					!_elm_lang$core$Native_Utils.eq(config.expandable, _elm_lang$core$Maybe$Nothing))
				]),
			A2(
				_elm_lang$core$List$filterMap,
				_elm_lang$core$Basics$identity,
				_elm_lang$core$Native_List.fromArray(
					[defaultInput])),
			expHolder(
				_elm_lang$core$Native_List.fromArray(
					[
						A4(
						_debois$elm_mdl$Material_Options$styled$,
						elementFunction,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Options$cs('mdl-textfield__input'),
								A2(_debois$elm_mdl$Material_Options$css, 'outline', 'none'),
								_debois$elm_mdl$Material_Options_Internal$attribute(
								A2(
									_elm_lang$html$Html_Events$on,
									'focus',
									_elm_lang$core$Json_Decode$succeed(
										lift(_debois$elm_mdl$Material_Textfield$Focus)))),
								_debois$elm_mdl$Material_Options_Internal$attribute(
								A2(
									_elm_lang$html$Html_Events$on,
									'blur',
									_elm_lang$core$Json_Decode$succeed(
										lift(_debois$elm_mdl$Material_Textfield$Blur)))),
								expandableId,
								_debois$elm_mdl$Material_Options$many(config.inner)
							]),
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html_Attributes$disabled(config.disabled),
									_elm_lang$html$Html_Attributes$autofocus(config.autofocus)
								]),
							A2(
								_elm_lang$core$Basics_ops['++'],
								textValue,
								A2(
									_elm_lang$core$Basics_ops['++'],
									typeAttributes,
									A2(_elm_lang$core$Basics_ops['++'], maxlength, listeners)))),
						_elm_lang$core$Native_List.fromArray(
							[])),
						A2(
						_elm_lang$html$Html$label,
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html_Attributes$class('mdl-textfield__label')
								]),
							labelFor),
						function () {
							var _p12 = config.labelText;
							if (_p12.ctor === 'Just') {
								return _elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text(_p12._0)
									]);
							} else {
								return _elm_lang$core$Native_List.fromArray(
									[]);
							}
						}()),
						A2(
						_elm_lang$core$Maybe$withDefault,
						A2(
							_elm_lang$html$Html$div,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[])),
						A2(
							_elm_lang$core$Maybe$map,
							function (e) {
								return A2(
									_elm_lang$html$Html$span,
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html_Attributes$class('mdl-textfield__error')
										]),
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html$text(e)
										]));
							},
							config.error))
					])));
	});
var _debois$elm_mdl$Material_Textfield$render = A5(
	_debois$elm_parts$Parts$create,
	_debois$elm_mdl$Material_Textfield$view,
	F3(
		function (_p13, msg, model) {
			return _elm_lang$core$Maybe$Just(
				{
					ctor: '_Tuple2',
					_0: A2(_debois$elm_mdl$Material_Textfield$update, msg, model),
					_1: _elm_lang$core$Platform_Cmd$none
				});
		}),
	function (_) {
		return _.textfield;
	},
	F2(
		function (x, c) {
			return _elm_lang$core$Native_Utils.update(
				c,
				{textfield: x});
		}),
	_debois$elm_mdl$Material_Textfield$defaultModel);

var _elm_lang$dom$Native_Dom = function() {

function on(node)
{
	return function(eventName, decoder, toTask)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {

			function performTask(event)
			{
				var result = A2(_elm_lang$core$Json_Decode$decodeValue, decoder, event);
				if (result.ctor === 'Ok')
				{
					_elm_lang$core$Native_Scheduler.rawSpawn(toTask(result._0));
				}
			}

			node.addEventListener(eventName, performTask);

			return function()
			{
				node.removeEventListener(eventName, performTask);
			};
		});
	};
}

var rAF = typeof requestAnimationFrame !== 'undefined'
	? requestAnimationFrame
	: function(callback) { callback(); };

function withNode(id, doStuff)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		rAF(function()
		{
			var node = document.getElementById(id);
			if (node === null)
			{
				callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'NotFound', _0: id }));
				return;
			}
			callback(_elm_lang$core$Native_Scheduler.succeed(doStuff(node)));
		});
	});
}


// FOCUS

function focus(id)
{
	return withNode(id, function(node) {
		node.focus();
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function blur(id)
{
	return withNode(id, function(node) {
		node.blur();
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}


// SCROLLING

function getScrollTop(id)
{
	return withNode(id, function(node) {
		return node.scrollTop;
	});
}

function setScrollTop(id, desiredScrollTop)
{
	return withNode(id, function(node) {
		node.scrollTop = desiredScrollTop;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function toBottom(id)
{
	return withNode(id, function(node) {
		node.scrollTop = node.scrollHeight;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function getScrollLeft(id)
{
	return withNode(id, function(node) {
		return node.scrollLeft;
	});
}

function setScrollLeft(id, desiredScrollLeft)
{
	return withNode(id, function(node) {
		node.scrollLeft = desiredScrollLeft;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function toRight(id)
{
	return withNode(id, function(node) {
		node.scrollLeft = node.scrollWidth;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}


// SIZE

function width(options, id)
{
	return withNode(id, function(node) {
		switch (options.ctor)
		{
			case 'Content':
				return node.scrollWidth;
			case 'VisibleContent':
				return node.clientWidth;
			case 'VisibleContentWithBorders':
				return node.offsetWidth;
			case 'VisibleContentWithBordersAndMargins':
				var rect = node.getBoundingClientRect();
				return rect.right - rect.left;
		}
	});
}

function height(options, id)
{
	return withNode(id, function(node) {
		switch (options.ctor)
		{
			case 'Content':
				return node.scrollHeight;
			case 'VisibleContent':
				return node.clientHeight;
			case 'VisibleContentWithBorders':
				return node.offsetHeight;
			case 'VisibleContentWithBordersAndMargins':
				var rect = node.getBoundingClientRect();
				return rect.bottom - rect.top;
		}
	});
}

return {
	onDocument: F3(on(document)),
	onWindow: F3(on(window)),

	focus: focus,
	blur: blur,

	getScrollTop: getScrollTop,
	setScrollTop: F2(setScrollTop),
	getScrollLeft: getScrollLeft,
	setScrollLeft: F2(setScrollLeft),
	toBottom: toBottom,
	toRight: toRight,

	height: F2(height),
	width: F2(width)
};

}();

var _elm_lang$dom$Dom_LowLevel$onWindow = _elm_lang$dom$Native_Dom.onWindow;
var _elm_lang$dom$Dom_LowLevel$onDocument = _elm_lang$dom$Native_Dom.onDocument;

var _elm_lang$mouse$Mouse$onSelfMsg = F3(
	function (router, _p0, state) {
		var _p1 = _p0;
		var _p2 = A2(_elm_lang$core$Dict$get, _p1.category, state);
		if (_p2.ctor === 'Nothing') {
			return _elm_lang$core$Task$succeed(state);
		} else {
			var send = function (tagger) {
				return A2(
					_elm_lang$core$Platform$sendToApp,
					router,
					tagger(_p1.position));
			};
			return A2(
				_elm_lang$core$Task$andThen,
				_elm_lang$core$Task$sequence(
					A2(_elm_lang$core$List$map, send, _p2._0.taggers)),
				function (_p3) {
					return _elm_lang$core$Task$succeed(state);
				});
		}
	});
var _elm_lang$mouse$Mouse_ops = _elm_lang$mouse$Mouse_ops || {};
_elm_lang$mouse$Mouse_ops['&>'] = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Task$andThen,
			t1,
			function (_p4) {
				return t2;
			});
	});
var _elm_lang$mouse$Mouse$init = _elm_lang$core$Task$succeed(_elm_lang$core$Dict$empty);
var _elm_lang$mouse$Mouse$categorizeHelpHelp = F2(
	function (value, maybeValues) {
		var _p5 = maybeValues;
		if (_p5.ctor === 'Nothing') {
			return _elm_lang$core$Maybe$Just(
				_elm_lang$core$Native_List.fromArray(
					[value]));
		} else {
			return _elm_lang$core$Maybe$Just(
				A2(_elm_lang$core$List_ops['::'], value, _p5._0));
		}
	});
var _elm_lang$mouse$Mouse$categorizeHelp = F2(
	function (subs, subDict) {
		categorizeHelp:
		while (true) {
			var _p6 = subs;
			if (_p6.ctor === '[]') {
				return subDict;
			} else {
				var _v4 = _p6._1,
					_v5 = A3(
					_elm_lang$core$Dict$update,
					_p6._0._0,
					_elm_lang$mouse$Mouse$categorizeHelpHelp(_p6._0._1),
					subDict);
				subs = _v4;
				subDict = _v5;
				continue categorizeHelp;
			}
		}
	});
var _elm_lang$mouse$Mouse$categorize = function (subs) {
	return A2(_elm_lang$mouse$Mouse$categorizeHelp, subs, _elm_lang$core$Dict$empty);
};
var _elm_lang$mouse$Mouse$subscription = _elm_lang$core$Native_Platform.leaf('Mouse');
var _elm_lang$mouse$Mouse$Position = F2(
	function (a, b) {
		return {x: a, y: b};
	});
var _elm_lang$mouse$Mouse$position = A3(
	_elm_lang$core$Json_Decode$object2,
	_elm_lang$mouse$Mouse$Position,
	A2(_elm_lang$core$Json_Decode_ops[':='], 'pageX', _elm_lang$core$Json_Decode$int),
	A2(_elm_lang$core$Json_Decode_ops[':='], 'pageY', _elm_lang$core$Json_Decode$int));
var _elm_lang$mouse$Mouse$Watcher = F2(
	function (a, b) {
		return {taggers: a, pid: b};
	});
var _elm_lang$mouse$Mouse$Msg = F2(
	function (a, b) {
		return {category: a, position: b};
	});
var _elm_lang$mouse$Mouse$onEffects = F3(
	function (router, newSubs, oldState) {
		var rightStep = F3(
			function (category, taggers, task) {
				return A2(
					_elm_lang$core$Task$andThen,
					task,
					function (state) {
						return A2(
							_elm_lang$core$Task$andThen,
							_elm_lang$core$Process$spawn(
								A3(
									_elm_lang$dom$Dom_LowLevel$onDocument,
									category,
									_elm_lang$mouse$Mouse$position,
									function (_p7) {
										return A2(
											_elm_lang$core$Platform$sendToSelf,
											router,
											A2(_elm_lang$mouse$Mouse$Msg, category, _p7));
									})),
							function (pid) {
								return _elm_lang$core$Task$succeed(
									A3(
										_elm_lang$core$Dict$insert,
										category,
										A2(_elm_lang$mouse$Mouse$Watcher, taggers, pid),
										state));
							});
					});
			});
		var bothStep = F4(
			function (category, _p8, taggers, task) {
				var _p9 = _p8;
				return A2(
					_elm_lang$core$Task$andThen,
					task,
					function (state) {
						return _elm_lang$core$Task$succeed(
							A3(
								_elm_lang$core$Dict$insert,
								category,
								A2(_elm_lang$mouse$Mouse$Watcher, taggers, _p9.pid),
								state));
					});
			});
		var leftStep = F3(
			function (category, _p10, task) {
				var _p11 = _p10;
				return A2(
					_elm_lang$mouse$Mouse_ops['&>'],
					_elm_lang$core$Process$kill(_p11.pid),
					task);
			});
		return A6(
			_elm_lang$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			oldState,
			_elm_lang$mouse$Mouse$categorize(newSubs),
			_elm_lang$core$Task$succeed(_elm_lang$core$Dict$empty));
	});
var _elm_lang$mouse$Mouse$MySub = F2(
	function (a, b) {
		return {ctor: 'MySub', _0: a, _1: b};
	});
var _elm_lang$mouse$Mouse$clicks = function (tagger) {
	return _elm_lang$mouse$Mouse$subscription(
		A2(_elm_lang$mouse$Mouse$MySub, 'click', tagger));
};
var _elm_lang$mouse$Mouse$moves = function (tagger) {
	return _elm_lang$mouse$Mouse$subscription(
		A2(_elm_lang$mouse$Mouse$MySub, 'mousemove', tagger));
};
var _elm_lang$mouse$Mouse$downs = function (tagger) {
	return _elm_lang$mouse$Mouse$subscription(
		A2(_elm_lang$mouse$Mouse$MySub, 'mousedown', tagger));
};
var _elm_lang$mouse$Mouse$ups = function (tagger) {
	return _elm_lang$mouse$Mouse$subscription(
		A2(_elm_lang$mouse$Mouse$MySub, 'mouseup', tagger));
};
var _elm_lang$mouse$Mouse$subMap = F2(
	function (func, _p12) {
		var _p13 = _p12;
		return A2(
			_elm_lang$mouse$Mouse$MySub,
			_p13._0,
			function (_p14) {
				return func(
					_p13._1(_p14));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Mouse'] = {pkg: 'elm-lang/mouse', init: _elm_lang$mouse$Mouse$init, onEffects: _elm_lang$mouse$Mouse$onEffects, onSelfMsg: _elm_lang$mouse$Mouse$onSelfMsg, tag: 'sub', subMap: _elm_lang$mouse$Mouse$subMap};

var _debois$elm_mdl$Material_Menu_Geometry$Geometry = F5(
	function (a, b, c, d, e) {
		return {button: a, menu: b, container: c, offsetTops: d, offsetHeights: e};
	});
var _debois$elm_mdl$Material_Menu_Geometry$Element = F4(
	function (a, b, c, d) {
		return {offsetTop: a, offsetLeft: b, offsetHeight: c, bounds: d};
	});
var _debois$elm_mdl$Material_Menu_Geometry$element = A5(_elm_lang$core$Json_Decode$object4, _debois$elm_mdl$Material_Menu_Geometry$Element, _debois$elm_dom$DOM$offsetTop, _debois$elm_dom$DOM$offsetLeft, _debois$elm_dom$DOM$offsetHeight, _debois$elm_dom$DOM$boundingClientRect);
var _debois$elm_mdl$Material_Menu_Geometry$decode = A6(
	_elm_lang$core$Json_Decode$object5,
	_debois$elm_mdl$Material_Menu_Geometry$Geometry,
	_debois$elm_dom$DOM$target(_debois$elm_mdl$Material_Menu_Geometry$element),
	_debois$elm_dom$DOM$target(
		_debois$elm_dom$DOM$nextSibling(
			A2(_debois$elm_dom$DOM$childNode, 1, _debois$elm_mdl$Material_Menu_Geometry$element))),
	_debois$elm_dom$DOM$target(
		_debois$elm_dom$DOM$nextSibling(_debois$elm_mdl$Material_Menu_Geometry$element)),
	_debois$elm_dom$DOM$target(
		_debois$elm_dom$DOM$nextSibling(
			A2(
				_debois$elm_dom$DOM$childNode,
				1,
				_debois$elm_dom$DOM$childNodes(_debois$elm_dom$DOM$offsetTop)))),
	_debois$elm_dom$DOM$target(
		_debois$elm_dom$DOM$nextSibling(
			A2(
				_debois$elm_dom$DOM$childNode,
				1,
				_debois$elm_dom$DOM$childNodes(_debois$elm_dom$DOM$offsetHeight)))));

var _debois$elm_mdl$Material_Menu$toPx = function (_p0) {
	return A3(
		_elm_lang$core$Basics$flip,
		F2(
			function (x, y) {
				return A2(_elm_lang$core$Basics_ops['++'], x, y);
			}),
		'px',
		_elm_lang$core$Basics$toString(_p0));
};
var _debois$elm_mdl$Material_Menu$rect = F4(
	function (x, y, w, h) {
		return function (coords) {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'rect(',
				A2(_elm_lang$core$Basics_ops['++'], coords, ')'));
		}(
			A2(
				_elm_lang$core$String$join,
				' ',
				A2(
					_elm_lang$core$List$map,
					_debois$elm_mdl$Material_Menu$toPx,
					_elm_lang$core$Native_List.fromArray(
						[x, y, w, h]))));
	});
var _debois$elm_mdl$Material_Menu$onKeyDown = function (action) {
	return A3(
		_elm_lang$html$Html_Events$onWithOptions,
		'keydown',
		{preventDefault: true, stopPropagation: false},
		A2(_elm_lang$core$Json_Decode$map, action, _elm_lang$html$Html_Events$keyCode));
};
var _debois$elm_mdl$Material_Menu$onClick = F2(
	function (decoder, action) {
		return A2(
			_elm_lang$html$Html_Events$on,
			'click',
			A2(_elm_lang$core$Json_Decode$map, action, decoder));
	});
var _debois$elm_mdl$Material_Menu$withGeometry = F2(
	function (model, f) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			_debois$elm_mdl$Material_Options$nop,
			A2(_elm_lang$core$Maybe$map, f, model.geometry));
	});
var _debois$elm_mdl$Material_Menu$icon = function (name) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{icon: name});
		});
};
var _debois$elm_mdl$Material_Menu$ripple = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{ripple: true});
	});
var _debois$elm_mdl$Material_Menu$onSelect = function (msg) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					onSelect: _elm_lang$core$Maybe$Just(msg)
				});
		});
};
var _debois$elm_mdl$Material_Menu$disabled = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{enabled: false});
	});
var _debois$elm_mdl$Material_Menu$divider = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{divider: true});
	});
var _debois$elm_mdl$Material_Menu$defaultItemConfig = {enabled: true, divider: false, onSelect: _elm_lang$core$Maybe$Nothing};
var _debois$elm_mdl$Material_Menu$constant = {transitionDurationSeconds: 0.3, transitionDurationFraction: 0.8, closeTimeout: 150};
var _debois$elm_mdl$Material_Menu$transitionDuration = _debois$elm_mdl$Material_Menu$constant.transitionDurationSeconds * _debois$elm_mdl$Material_Menu$constant.transitionDurationFraction;
var _debois$elm_mdl$Material_Menu$Model = F4(
	function (a, b, c, d) {
		return {ripples: a, animationState: b, geometry: c, index: d};
	});
var _debois$elm_mdl$Material_Menu$Item = F2(
	function (a, b) {
		return {options: a, html: b};
	});
var _debois$elm_mdl$Material_Menu$item = _debois$elm_mdl$Material_Menu$Item;
var _debois$elm_mdl$Material_Menu$ItemConfig = F3(
	function (a, b, c) {
		return {enabled: a, divider: b, onSelect: c};
	});
var _debois$elm_mdl$Material_Menu$Config = F3(
	function (a, b, c) {
		return {alignment: a, ripple: b, icon: c};
	});
var _debois$elm_mdl$Material_Menu$Closing = {ctor: 'Closing'};
var _debois$elm_mdl$Material_Menu$Opened = {ctor: 'Opened'};
var _debois$elm_mdl$Material_Menu$clip = F3(
	function (model, config, geometry) {
		var height = geometry.menu.bounds.height;
		var width = geometry.menu.bounds.width;
		return A2(
			_debois$elm_mdl$Material_Options$css,
			'clip',
			function () {
				if (_elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opened) || _elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Closing)) {
					return A4(_debois$elm_mdl$Material_Menu$rect, 0, width, height, 0);
				} else {
					var _p1 = config.alignment;
					switch (_p1.ctor) {
						case 'BottomRight':
							return A4(_debois$elm_mdl$Material_Menu$rect, 0, width, 0, width);
						case 'TopLeft':
							return A4(_debois$elm_mdl$Material_Menu$rect, height, 0, height, 0);
						case 'TopRight':
							return A4(_debois$elm_mdl$Material_Menu$rect, height, width, height, width);
						default:
							return '';
					}
				}
			}());
	});
var _debois$elm_mdl$Material_Menu$Opening = {ctor: 'Opening'};
var _debois$elm_mdl$Material_Menu$isActive = function (model) {
	return _elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opened) || _elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opening);
};
var _debois$elm_mdl$Material_Menu$Idle = {ctor: 'Idle'};
var _debois$elm_mdl$Material_Menu$defaultModel = {ripples: _elm_lang$core$Dict$empty, animationState: _debois$elm_mdl$Material_Menu$Idle, geometry: _elm_lang$core$Maybe$Nothing, index: _elm_lang$core$Maybe$Nothing};
var _debois$elm_mdl$Material_Menu$Key = F2(
	function (a, b) {
		return {ctor: 'Key', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Menu$Click = function (a) {
	return {ctor: 'Click', _0: a};
};
var _debois$elm_mdl$Material_Menu$subscriptions = function (model) {
	return _elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opened) ? _elm_lang$mouse$Mouse$clicks(_debois$elm_mdl$Material_Menu$Click) : _elm_lang$core$Platform_Sub$none;
};
var _debois$elm_mdl$Material_Menu$Ripple = F2(
	function (a, b) {
		return {ctor: 'Ripple', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Menu$Tick = {ctor: 'Tick'};
var _debois$elm_mdl$Material_Menu$Close = {ctor: 'Close'};
var _debois$elm_mdl$Material_Menu$Select = F2(
	function (a, b) {
		return {ctor: 'Select', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Menu$update = F3(
	function (fwd, msg, model) {
		update:
		while (true) {
			var _p2 = msg;
			switch (_p2.ctor) {
				case 'Open':
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{
								animationState: function () {
									var _p3 = model.animationState;
									if (_p3.ctor === 'Opened') {
										return _debois$elm_mdl$Material_Menu$Opened;
									} else {
										return _debois$elm_mdl$Material_Menu$Opening;
									}
								}(),
								geometry: _elm_lang$core$Maybe$Just(_p2._0)
							}),
						_1: _debois$elm_mdl$Material_Helpers$cmd(
							fwd(_debois$elm_mdl$Material_Menu$Tick))
					};
				case 'Tick':
					return _debois$elm_mdl$Material_Helpers$pure(
						_elm_lang$core$Native_Utils.update(
							model,
							{animationState: _debois$elm_mdl$Material_Menu$Opened}));
				case 'Close':
					return _debois$elm_mdl$Material_Helpers$pure(
						_elm_lang$core$Native_Utils.update(
							model,
							{animationState: _debois$elm_mdl$Material_Menu$Idle, geometry: _elm_lang$core$Maybe$Nothing, index: _elm_lang$core$Maybe$Nothing}));
				case 'Select':
					var cmds = A2(
						_elm_lang$core$List$filterMap,
						_elm_lang$core$Basics$identity,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$core$Maybe$Just(
								A2(
									_debois$elm_mdl$Material_Helpers$delay,
									_debois$elm_mdl$Material_Menu$constant.closeTimeout,
									fwd(_debois$elm_mdl$Material_Menu$Close))),
								A2(_elm_lang$core$Maybe$map, _debois$elm_mdl$Material_Helpers$cmd, _p2._1)
							]));
					var model$ = _elm_lang$core$Native_Utils.update(
						model,
						{animationState: _debois$elm_mdl$Material_Menu$Closing});
					return {
						ctor: '_Tuple2',
						_0: model$,
						_1: _elm_lang$core$Platform_Cmd$batch(cmds)
					};
				case 'Ripple':
					var _p6 = _p2._0;
					var _p4 = A2(
						_debois$elm_mdl$Material_Ripple$update,
						_p2._1,
						A2(
							_elm_lang$core$Maybe$withDefault,
							_debois$elm_mdl$Material_Ripple$model,
							A2(_elm_lang$core$Dict$get, _p6, model.ripples)));
					var model$ = _p4._0;
					var effects = _p4._1;
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{
								ripples: A3(_elm_lang$core$Dict$insert, _p6, model$, model.ripples)
							}),
						_1: A2(
							_elm_lang$core$Platform_Cmd$map,
							function (_p5) {
								return fwd(
									A2(_debois$elm_mdl$Material_Menu$Ripple, _p6, _p5));
							},
							effects)
					};
				case 'Click':
					if (_debois$elm_mdl$Material_Menu$isActive(model)) {
						var _p7 = model.geometry;
						if (_p7.ctor === 'Just') {
							var inside = F2(
								function (_p9, _p8) {
									var _p10 = _p9;
									var _p15 = _p10.y;
									var _p14 = _p10.x;
									var _p11 = _p8;
									var _p13 = _p11.top;
									var _p12 = _p11.left;
									return (_elm_lang$core$Native_Utils.cmp(
										_p12,
										_elm_lang$core$Basics$toFloat(_p14)) < 1) && ((_elm_lang$core$Native_Utils.cmp(
										_elm_lang$core$Basics$toFloat(_p14),
										_p12 + _p11.width) < 1) && ((_elm_lang$core$Native_Utils.cmp(
										_p13,
										_elm_lang$core$Basics$toFloat(_p15)) < 1) && (_elm_lang$core$Native_Utils.cmp(
										_elm_lang$core$Basics$toFloat(_p15),
										_p13 + _p11.height) < 1)));
								});
							if (A2(inside, _p2._0, _p7._0.menu.bounds)) {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									model,
									_elm_lang$core$Native_List.fromArray(
										[]));
							} else {
								var _v6 = fwd,
									_v7 = _debois$elm_mdl$Material_Menu$Close,
									_v8 = model;
								fwd = _v6;
								msg = _v7;
								model = _v8;
								continue update;
							}
						} else {
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								model,
								_elm_lang$core$Native_List.fromArray(
									[]));
						}
					} else {
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							model,
							_elm_lang$core$Native_List.fromArray(
								[]));
					}
				default:
					var _p24 = _p2._0;
					var _p16 = _p2._1;
					switch (_p16) {
						case 13:
							if (_debois$elm_mdl$Material_Menu$isActive(model)) {
								var _p17 = model.index;
								if (_p17.ctor === 'Just') {
									var _p19 = _p17._0;
									var cmd = A3(
										_elm_lang$core$Basics$flip,
										_elm_lang$core$Maybe$andThen,
										function (_p18) {
											return function (_) {
												return _.onSelect;
											}(
												function (_) {
													return _.config;
												}(_p18));
										},
										_elm_lang$core$List$head(
											A2(_elm_lang$core$List$drop, _p19, _p24)));
									var _v11 = fwd,
										_v12 = A2(_debois$elm_mdl$Material_Menu$Select, _p19 + 1, cmd),
										_v13 = model;
									fwd = _v11;
									msg = _v12;
									model = _v13;
									continue update;
								} else {
									var _v14 = fwd,
										_v15 = _debois$elm_mdl$Material_Menu$Close,
										_v16 = model;
									fwd = _v14;
									msg = _v15;
									model = _v16;
									continue update;
								}
							} else {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									model,
									_elm_lang$core$Native_List.fromArray(
										[]));
							}
						case 27:
							var _v17 = fwd,
								_v18 = _debois$elm_mdl$Material_Menu$Close,
								_v19 = model;
							fwd = _v17;
							msg = _v18;
							model = _v19;
							continue update;
						case 32:
							if (_debois$elm_mdl$Material_Menu$isActive(model)) {
								var _v20 = fwd,
									_v21 = A2(_debois$elm_mdl$Material_Menu$Key, _p24, 13),
									_v22 = model;
								fwd = _v20;
								msg = _v21;
								model = _v22;
								continue update;
							} else {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									model,
									_elm_lang$core$Native_List.fromArray(
										[]));
							}
						case 40:
							if (_debois$elm_mdl$Material_Menu$isActive(model)) {
								var items = A2(
									_elm_lang$core$List$indexedMap,
									F2(
										function (v0, v1) {
											return {ctor: '_Tuple2', _0: v0, _1: v1};
										}),
									_p24);
								return A3(
									_elm_lang$core$Basics$flip,
									F2(
										function (x, y) {
											return A2(_elm_lang$core$Platform_Cmd_ops['!'], x, y);
										}),
									_elm_lang$core$Native_List.fromArray(
										[]),
									A2(
										_elm_lang$core$Maybe$withDefault,
										model,
										A2(
											_elm_lang$core$Maybe$map,
											function (_p20) {
												return function (index$) {
													return _elm_lang$core$Native_Utils.update(
														model,
														{
															index: _elm_lang$core$Maybe$Just(index$)
														});
												}(
													_elm_lang$core$Basics$fst(_p20));
											},
											_elm_lang$core$List$head(
												A2(
													_elm_lang$core$List$filter,
													function (_p21) {
														return function (_) {
															return _.enabled;
														}(
															function (_) {
																return _.config;
															}(
																_elm_lang$core$Basics$snd(_p21)));
													},
													A2(
														_elm_lang$core$List$drop,
														1 + A2(_elm_lang$core$Maybe$withDefault, -1, model.index),
														A2(_elm_lang$core$Basics_ops['++'], items, items)))))));
							} else {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									model,
									_elm_lang$core$Native_List.fromArray(
										[]));
							}
						case 38:
							if (_debois$elm_mdl$Material_Menu$isActive(model)) {
								var items = A2(
									_elm_lang$core$List$indexedMap,
									F2(
										function (v0, v1) {
											return {ctor: '_Tuple2', _0: v0, _1: v1};
										}),
									_p24);
								return _debois$elm_mdl$Material_Helpers$pure(
									A2(
										_elm_lang$core$Maybe$withDefault,
										model,
										A2(
											_elm_lang$core$Maybe$map,
											function (_p22) {
												return function (index$) {
													return _elm_lang$core$Native_Utils.update(
														model,
														{
															index: _elm_lang$core$Maybe$Just(index$)
														});
												}(
													_elm_lang$core$Basics$fst(_p22));
											},
											_elm_lang$core$List$head(
												A2(
													_elm_lang$core$List$filter,
													function (_p23) {
														return function (_) {
															return _.enabled;
														}(
															function (_) {
																return _.config;
															}(
																_elm_lang$core$Basics$snd(_p23)));
													},
													A2(
														_elm_lang$core$List$drop,
														_elm_lang$core$List$length(_p24) - A2(_elm_lang$core$Maybe$withDefault, 0, model.index),
														_elm_lang$core$List$reverse(
															A2(_elm_lang$core$Basics_ops['++'], items, items))))))));
							} else {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									model,
									_elm_lang$core$Native_List.fromArray(
										[]));
							}
						default:
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								model,
								_elm_lang$core$Native_List.fromArray(
									[]));
					}
			}
		}
	});
var _debois$elm_mdl$Material_Menu$update$ = F3(
	function (fwd, msg, model) {
		return _elm_lang$core$Maybe$Just(
			A3(_debois$elm_mdl$Material_Menu$update, fwd, msg, model));
	});
var _debois$elm_mdl$Material_Menu$pack = A4(
	_debois$elm_parts$Parts$pack,
	_debois$elm_mdl$Material_Menu$update$,
	function (_) {
		return _.menu;
	},
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.update(
				y,
				{menu: x});
		}),
	_debois$elm_mdl$Material_Menu$defaultModel);
var _debois$elm_mdl$Material_Menu$subs = function (lift) {
	return function (_p25) {
		return _elm_lang$core$Platform_Sub$batch(
			A3(
				_elm_lang$core$Dict$foldl,
				F3(
					function (idx, model, ss) {
						return A2(
							_elm_lang$core$List_ops['::'],
							A2(
								_elm_lang$core$Platform_Sub$map,
								A2(_debois$elm_mdl$Material_Menu$pack, lift, idx),
								_debois$elm_mdl$Material_Menu$subscriptions(model)),
							ss);
					}),
				_elm_lang$core$Native_List.fromArray(
					[]),
				function (_) {
					return _.menu;
				}(_p25)));
	};
};
var _debois$elm_mdl$Material_Menu$Open = function (a) {
	return {ctor: 'Open', _0: a};
};
var _debois$elm_mdl$Material_Menu$TopRight = {ctor: 'TopRight'};
var _debois$elm_mdl$Material_Menu$topRight = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{alignment: _debois$elm_mdl$Material_Menu$TopRight});
	});
var _debois$elm_mdl$Material_Menu$TopLeft = {ctor: 'TopLeft'};
var _debois$elm_mdl$Material_Menu$topLeft = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{alignment: _debois$elm_mdl$Material_Menu$TopLeft});
	});
var _debois$elm_mdl$Material_Menu$delay = F4(
	function (alignment, height, offsetTop, offsetHeight) {
		var t = (_elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$TopLeft) || _elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$TopRight)) ? ((((height - offsetTop) - offsetHeight) / height) * _debois$elm_mdl$Material_Menu$transitionDuration) : ((offsetTop / height) * _debois$elm_mdl$Material_Menu$transitionDuration);
		return A2(
			_debois$elm_mdl$Material_Options$css,
			'transition-delay',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(t),
				's'));
	});
var _debois$elm_mdl$Material_Menu$view1 = F8(
	function (lift, config, model, offsetTop, offsetHeight, index, summary, item) {
		var canSelect = summary.config.enabled && (!_elm_lang$core$Native_Utils.eq(summary.config.onSelect, _elm_lang$core$Maybe$Nothing));
		var hasRipple = config.ripple && canSelect;
		var ripple = function (_p26) {
			return lift(
				A2(_debois$elm_mdl$Material_Menu$Ripple, index, _p26));
		};
		return A5(
			_debois$elm_mdl$Material_Options$apply,
			summary,
			_elm_lang$html$Html$li,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$cs('mdl-menu__item'),
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('mdl-js-ripple-effect'),
					config.ripple),
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('mdl-menu__item--full-bleed-divider'),
					summary.config.divider),
					A2(
					_debois$elm_mdl$Material_Options$when,
					A2(_debois$elm_mdl$Material_Options$css, 'background-color', 'rgb(238,238,238)'),
					_elm_lang$core$Native_Utils.eq(
						model.index,
						_elm_lang$core$Maybe$Just(index))),
					function () {
					var _p27 = {
						ctor: '_Tuple2',
						_0: model.geometry,
						_1: _debois$elm_mdl$Material_Menu$isActive(model)
					};
					if (((_p27.ctor === '_Tuple2') && (_p27._0.ctor === 'Just')) && (_p27._1 === true)) {
						return A4(_debois$elm_mdl$Material_Menu$delay, config.alignment, _p27._0._0.menu.bounds.height, offsetTop, offsetHeight);
					} else {
						return _debois$elm_mdl$Material_Options$nop;
					}
				}(),
					A2(_debois$elm_mdl$Material_Options$css, 'display', 'flex'),
					A2(_debois$elm_mdl$Material_Options$css, 'align-items', 'center')
				]),
			A2(
				_elm_lang$core$Basics_ops['++'],
				A2(
					_elm_lang$core$List$filterMap,
					_elm_lang$core$Basics$identity,
					_elm_lang$core$Native_List.fromArray(
						[
							canSelect ? _elm_lang$core$Maybe$Just(
							_elm_lang$html$Html_Events$onClick(
								lift(
									A2(_debois$elm_mdl$Material_Menu$Select, index, summary.config.onSelect)))) : _elm_lang$core$Maybe$Nothing,
							_elm_lang$core$Basics$not(summary.config.enabled) ? _elm_lang$core$Maybe$Just(
							A2(_elm_lang$html$Html_Attributes$attribute, 'disabled', 'disabled')) : _elm_lang$core$Maybe$Nothing,
							_elm_lang$core$Maybe$Just(
							A2(
								_elm_lang$html$Html_Attributes$property,
								'tabindex',
								_elm_lang$core$Json_Encode$string('-1')))
						])),
				hasRipple ? _elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Ripple$downOn$, ripple, 'mousedown'),
						A2(_debois$elm_mdl$Material_Ripple$downOn$, ripple, 'touchstart'),
						A2(_debois$elm_mdl$Material_Ripple$upOn$, ripple, 'mouseup'),
						A2(_debois$elm_mdl$Material_Ripple$upOn$, ripple, 'mouseleave'),
						A2(_debois$elm_mdl$Material_Ripple$upOn$, ripple, 'touchend'),
						A2(_debois$elm_mdl$Material_Ripple$upOn$, ripple, 'blur')
					]) : _elm_lang$core$Native_List.fromArray(
					[])),
			hasRipple ? A2(
				F2(
					function (x, y) {
						return A2(_elm_lang$core$Basics_ops['++'], x, y);
					}),
				item.html,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_elm_lang$html$Html_App$map,
						ripple,
						A2(
							_debois$elm_mdl$Material_Ripple$view$,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html_Attributes$class('mdl-menu__item-ripple-container')
								]),
							A2(
								_elm_lang$core$Maybe$withDefault,
								_debois$elm_mdl$Material_Ripple$model,
								A2(_elm_lang$core$Dict$get, index, model.ripples))))
					])) : item.html);
	});
var _debois$elm_mdl$Material_Menu$BottomRight = {ctor: 'BottomRight'};
var _debois$elm_mdl$Material_Menu$bottomRight = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{alignment: _debois$elm_mdl$Material_Menu$BottomRight});
	});
var _debois$elm_mdl$Material_Menu$BottomLeft = {ctor: 'BottomLeft'};
var _debois$elm_mdl$Material_Menu$defaultConfig = {alignment: _debois$elm_mdl$Material_Menu$BottomLeft, ripple: false, icon: 'more_vert'};
var _debois$elm_mdl$Material_Menu$bottomLeft = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{alignment: _debois$elm_mdl$Material_Menu$BottomLeft});
	});
var _debois$elm_mdl$Material_Menu$containerGeometry = F2(
	function (alignment, geometry) {
		return _debois$elm_mdl$Material_Options$many(
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_Options$css,
					'width',
					_debois$elm_mdl$Material_Menu$toPx(geometry.menu.bounds.width)),
					A2(
					_debois$elm_mdl$Material_Options$css,
					'height',
					_debois$elm_mdl$Material_Menu$toPx(geometry.menu.bounds.height)),
					(_elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$BottomRight) || _elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$BottomLeft)) ? A2(
					_debois$elm_mdl$Material_Options$css,
					'top',
					_debois$elm_mdl$Material_Menu$toPx(geometry.button.offsetTop + geometry.button.offsetHeight)) : _debois$elm_mdl$Material_Options$nop,
					function () {
					if (_elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$BottomRight) || _elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$TopRight)) {
						var right = function (e) {
							return e.bounds.left + e.bounds.width;
						};
						return A2(
							_debois$elm_mdl$Material_Options$css,
							'right',
							_debois$elm_mdl$Material_Menu$toPx(
								right(geometry.container) - right(geometry.menu)));
					} else {
						return _debois$elm_mdl$Material_Options$nop;
					}
				}(),
					function () {
					if (_elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$TopLeft) || _elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$TopRight)) {
						var bottom = geometry.container.bounds.top + geometry.container.bounds.height;
						return A2(
							_debois$elm_mdl$Material_Options$css,
							'bottom',
							_debois$elm_mdl$Material_Menu$toPx(bottom - geometry.button.bounds.top));
					} else {
						return _debois$elm_mdl$Material_Options$nop;
					}
				}(),
					(_elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$TopLeft) || _elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$BottomLeft)) ? A2(
					_debois$elm_mdl$Material_Options$css,
					'left',
					_debois$elm_mdl$Material_Menu$toPx(geometry.menu.offsetLeft)) : _debois$elm_mdl$Material_Options$nop
				]));
	});
var _debois$elm_mdl$Material_Menu$view = F4(
	function (lift, model, properties, items) {
		var itemSummaries = A2(
			_elm_lang$core$List$map,
			function (_p28) {
				return A2(
					_debois$elm_mdl$Material_Options$collect,
					_debois$elm_mdl$Material_Menu$defaultItemConfig,
					function (_) {
						return _.options;
					}(_p28));
			},
			items);
		var numItems = _elm_lang$core$List$length(items);
		var summary = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Menu$defaultConfig, properties);
		var config = summary.config;
		var alignment = function () {
			var _p29 = config.alignment;
			switch (_p29.ctor) {
				case 'BottomLeft':
					return _debois$elm_mdl$Material_Options$cs('mdl-menu--bottom-left');
				case 'BottomRight':
					return _debois$elm_mdl$Material_Options$cs('mdl-menu--bottom-right');
				case 'TopLeft':
					return _debois$elm_mdl$Material_Options$cs('mdl-menu--top-left');
				default:
					return _debois$elm_mdl$Material_Options$cs('mdl-menu--top-right');
			}
		}();
		return A5(
			_debois$elm_mdl$Material_Options$apply,
			summary,
			_elm_lang$html$Html$div,
			A2(
				_elm_lang$core$List_ops['::'],
				A2(_debois$elm_mdl$Material_Options$css, 'position', 'relative'),
				properties),
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$html$Html_App$map,
					lift,
					A3(
						_debois$elm_mdl$Material_Options$styled,
						_elm_lang$html$Html$button,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Options$cs('mdl-button'),
								_debois$elm_mdl$Material_Options$cs('mdl-js-button'),
								_debois$elm_mdl$Material_Options$cs('mdl-button--icon'),
								A2(
								_debois$elm_mdl$Material_Options$when,
								_debois$elm_mdl$Material_Options_Internal$attribute(
									_debois$elm_mdl$Material_Menu$onKeyDown(
										_debois$elm_mdl$Material_Menu$Key(itemSummaries))),
								_debois$elm_mdl$Material_Menu$isActive(model)),
								A2(
								_debois$elm_mdl$Material_Options$when,
								_debois$elm_mdl$Material_Options_Internal$attribute(
									A2(_debois$elm_mdl$Material_Menu$onClick, _debois$elm_mdl$Material_Menu_Geometry$decode, _debois$elm_mdl$Material_Menu$Open)),
								!_elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opened)),
								A2(
								_debois$elm_mdl$Material_Options$when,
								_debois$elm_mdl$Material_Options_Internal$attribute(
									_elm_lang$html$Html_Events$onClick(_debois$elm_mdl$Material_Menu$Close)),
								_debois$elm_mdl$Material_Menu$isActive(model))
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Material_Icon$view,
								config.icon,
								_elm_lang$core$Native_List.fromArray(
									[
										_debois$elm_mdl$Material_Options$cs('material-icons'),
										A2(_debois$elm_mdl$Material_Options$css, 'pointer-events', 'none')
									]))
							]))),
					A3(
					_debois$elm_mdl$Material_Options$styled,
					_elm_lang$html$Html$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Options$cs('mdl-menu__container'),
							_debois$elm_mdl$Material_Options$cs('is-upgraded'),
							A2(
							_debois$elm_mdl$Material_Options$when,
							_debois$elm_mdl$Material_Options$cs('is-visible'),
							_elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opened) || _elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Closing)),
							A2(
							_debois$elm_mdl$Material_Menu$withGeometry,
							model,
							_debois$elm_mdl$Material_Menu$containerGeometry(config.alignment))
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A3(
							_debois$elm_mdl$Material_Options$styled,
							_elm_lang$html$Html$div,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Options$cs('mdl-menu__outline'),
									alignment,
									A2(
									_debois$elm_mdl$Material_Menu$withGeometry,
									model,
									function (geometry) {
										return _debois$elm_mdl$Material_Options$many(
											_elm_lang$core$Native_List.fromArray(
												[
													A2(
													_debois$elm_mdl$Material_Options$css,
													'width',
													_debois$elm_mdl$Material_Menu$toPx(geometry.menu.bounds.width)),
													A2(
													_debois$elm_mdl$Material_Options$css,
													'height',
													_debois$elm_mdl$Material_Menu$toPx(geometry.menu.bounds.height))
												]));
									})
								]),
							_elm_lang$core$Native_List.fromArray(
								[])),
							A3(
							_debois$elm_mdl$Material_Options$styled,
							_elm_lang$html$Html$ul,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Options$cs('mdl-menu'),
									_debois$elm_mdl$Material_Options$cs('mdl-js-menu'),
									A2(
									_debois$elm_mdl$Material_Options$when,
									_debois$elm_mdl$Material_Options$cs('is-animating'),
									_elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opening) || _elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Closing)),
									A2(
									_debois$elm_mdl$Material_Menu$withGeometry,
									model,
									A2(_debois$elm_mdl$Material_Menu$clip, model, config)),
									alignment
								]),
							function () {
								var _p30 = model.geometry;
								if (_p30.ctor === 'Just') {
									var _p31 = _p30._0;
									return A6(
										_elm_lang$core$List$map5,
										A3(_debois$elm_mdl$Material_Menu$view1, lift, config, model),
										_p31.offsetTops,
										_p31.offsetHeights,
										_elm_lang$core$Native_List.range(0, numItems - 1),
										itemSummaries,
										items);
								} else {
									return A4(
										_elm_lang$core$List$map3,
										A5(_debois$elm_mdl$Material_Menu$view1, lift, config, model, 0, 0),
										_elm_lang$core$Native_List.range(0, numItems - 1),
										itemSummaries,
										items);
								}
							}())
						]))
				]));
	});
var _debois$elm_mdl$Material_Menu$render = A5(
	_debois$elm_parts$Parts$create,
	_debois$elm_mdl$Material_Menu$view,
	_debois$elm_mdl$Material_Menu$update$,
	function (_) {
		return _.menu;
	},
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.update(
				y,
				{menu: x});
		}),
	_debois$elm_mdl$Material_Menu$defaultModel);

var _debois$elm_mdl$Material_Snackbar$enqueue = F2(
	function (contents, model) {
		return _elm_lang$core$Native_Utils.update(
			model,
			{
				queue: A2(
					_elm_lang$core$List$append,
					model.queue,
					_elm_lang$core$Native_List.fromArray(
						[contents]))
			});
	});
var _debois$elm_mdl$Material_Snackbar$snackbar = F3(
	function (payload, message, label) {
		return {
			message: message,
			action: _elm_lang$core$Maybe$Just(label),
			payload: payload,
			timeout: 2750,
			fade: 250
		};
	});
var _debois$elm_mdl$Material_Snackbar$toast = F2(
	function (payload, message) {
		return {message: message, action: _elm_lang$core$Maybe$Nothing, payload: payload, timeout: 2750, fade: 250};
	});
var _debois$elm_mdl$Material_Snackbar$Contents = F5(
	function (a, b, c, d, e) {
		return {message: a, action: b, payload: c, timeout: d, fade: e};
	});
var _debois$elm_mdl$Material_Snackbar$Model = F3(
	function (a, b, c) {
		return {queue: a, state: b, seq: c};
	});
var _debois$elm_mdl$Material_Snackbar$Fading = function (a) {
	return {ctor: 'Fading', _0: a};
};
var _debois$elm_mdl$Material_Snackbar$Active = function (a) {
	return {ctor: 'Active', _0: a};
};
var _debois$elm_mdl$Material_Snackbar$Inert = {ctor: 'Inert'};
var _debois$elm_mdl$Material_Snackbar$model = {
	queue: _elm_lang$core$Native_List.fromArray(
		[]),
	state: _debois$elm_mdl$Material_Snackbar$Inert,
	seq: -1
};
var _debois$elm_mdl$Material_Snackbar$Clicked = {ctor: 'Clicked'};
var _debois$elm_mdl$Material_Snackbar$Timeout = {ctor: 'Timeout'};
var _debois$elm_mdl$Material_Snackbar$Move = F2(
	function (a, b) {
		return {ctor: 'Move', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Snackbar$next = function (model) {
	return _elm_lang$core$Platform_Cmd$map(
		_debois$elm_mdl$Material_Snackbar$Move(model.seq));
};
var _debois$elm_mdl$Material_Snackbar$view = function (model) {
	var isActive = function () {
		var _p0 = model.state;
		switch (_p0.ctor) {
			case 'Inert':
				return false;
			case 'Active':
				return true;
			default:
				return false;
		}
	}();
	var contents = function () {
		var _p1 = model.state;
		switch (_p1.ctor) {
			case 'Inert':
				return _elm_lang$core$Maybe$Nothing;
			case 'Active':
				return _elm_lang$core$Maybe$Just(_p1._0);
			default:
				return _elm_lang$core$Maybe$Just(_p1._0);
		}
	}();
	var action = A2(
		_elm_lang$core$Maybe$andThen,
		contents,
		function (_) {
			return _.action;
		});
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$classList(
				_elm_lang$core$Native_List.fromArray(
					[
						{ctor: '_Tuple2', _0: 'mdl-js-snackbar', _1: true},
						{ctor: '_Tuple2', _0: 'mdl-snackbar', _1: true},
						{ctor: '_Tuple2', _0: 'mdl-snackbar--active', _1: isActive}
					])),
				A2(
				_debois$elm_mdl$Material_Helpers$aria,
				'hidden',
				_elm_lang$core$Basics$not(isActive))
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$class('mdl-snackbar__text')
					]),
				A2(
					_elm_lang$core$Maybe$withDefault,
					_elm_lang$core$Native_List.fromArray(
						[]),
					A2(
						_elm_lang$core$Maybe$map,
						function (c) {
							return _elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text(c.message)
								]);
						},
						contents))),
				A2(
				_elm_lang$html$Html$button,
				A2(
					_elm_lang$core$List_ops['::'],
					_elm_lang$html$Html_Attributes$class('mdl-snackbar__action'),
					A2(
						_elm_lang$core$List_ops['::'],
						_elm_lang$html$Html_Attributes$type$('button'),
						A2(
							_elm_lang$core$List_ops['::'],
							A2(
								_debois$elm_mdl$Material_Helpers$aria,
								'hidden',
								A2(
									_elm_lang$core$Maybe$withDefault,
									true,
									A2(
										_elm_lang$core$Maybe$map,
										_elm_lang$core$Basics$always(
											_elm_lang$core$Basics$not(isActive)),
										action))),
							A2(
								_elm_lang$core$Maybe$withDefault,
								_elm_lang$core$Native_List.fromArray(
									[]),
								A2(
									_elm_lang$core$Maybe$map,
									_elm_lang$core$Basics$always(
										_elm_lang$core$Native_List.fromArray(
											[
												_elm_lang$html$Html_Events$onClick(
												A2(_debois$elm_mdl$Material_Snackbar$Move, model.seq, _debois$elm_mdl$Material_Snackbar$Clicked))
											])),
									action))))),
				A2(
					_elm_lang$core$Maybe$withDefault,
					_elm_lang$core$Native_List.fromArray(
						[]),
					A2(
						_elm_lang$core$Maybe$map,
						function (action) {
							return _elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text(action)
								]);
						},
						action)))
			]));
};
var _debois$elm_mdl$Material_Snackbar$Click = function (a) {
	return {ctor: 'Click', _0: a};
};
var _debois$elm_mdl$Material_Snackbar$End = function (a) {
	return {ctor: 'End', _0: a};
};
var _debois$elm_mdl$Material_Snackbar$Begin = function (a) {
	return {ctor: 'Begin', _0: a};
};
var _debois$elm_mdl$Material_Snackbar$tryDequeue = function (model) {
	var _p2 = {ctor: '_Tuple2', _0: model.state, _1: model.queue};
	if (((_p2.ctor === '_Tuple2') && (_p2._0.ctor === 'Inert')) && (_p2._1.ctor === '::')) {
		var _p3 = _p2._1._0;
		return {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.update(
				model,
				{
					state: _debois$elm_mdl$Material_Snackbar$Active(_p3),
					queue: _p2._1._1,
					seq: model.seq + 1
				}),
			_1: _elm_lang$core$Platform_Cmd$batch(
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_elm_lang$core$Platform_Cmd$map,
						_debois$elm_mdl$Material_Snackbar$Move(model.seq + 1),
						A2(_debois$elm_mdl$Material_Helpers$delay, _p3.timeout, _debois$elm_mdl$Material_Snackbar$Timeout)),
						_debois$elm_mdl$Material_Helpers$cmd(
						_debois$elm_mdl$Material_Snackbar$Begin(_p3.payload))
					]))
		};
	} else {
		return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
	}
};
var _debois$elm_mdl$Material_Snackbar$move = F2(
	function (transition, model) {
		var _p4 = {ctor: '_Tuple2', _0: model.state, _1: transition};
		_v3_4:
		do {
			if (_p4.ctor === '_Tuple2') {
				if (_p4._1.ctor === 'Clicked') {
					if (_p4._0.ctor === 'Active') {
						var _p5 = _p4._0._0;
						return {
							ctor: '_Tuple2',
							_0: _elm_lang$core$Native_Utils.update(
								model,
								{
									state: _debois$elm_mdl$Material_Snackbar$Fading(_p5)
								}),
							_1: _elm_lang$core$Platform_Cmd$batch(
								_elm_lang$core$Native_List.fromArray(
									[
										A2(
										_debois$elm_mdl$Material_Snackbar$next,
										model,
										A2(_debois$elm_mdl$Material_Helpers$delay, _p5.fade, _debois$elm_mdl$Material_Snackbar$Timeout)),
										_debois$elm_mdl$Material_Helpers$cmd(
										_debois$elm_mdl$Material_Snackbar$Click(_p5.payload))
									]))
						};
					} else {
						break _v3_4;
					}
				} else {
					switch (_p4._0.ctor) {
						case 'Inert':
							return _debois$elm_mdl$Material_Snackbar$tryDequeue(model);
						case 'Active':
							var _p6 = _p4._0._0;
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Native_Utils.update(
									model,
									{
										state: _debois$elm_mdl$Material_Snackbar$Fading(_p6)
									}),
								_1: _elm_lang$core$Platform_Cmd$batch(
									_elm_lang$core$Native_List.fromArray(
										[
											A2(
											_debois$elm_mdl$Material_Snackbar$next,
											model,
											A2(_debois$elm_mdl$Material_Helpers$delay, _p6.fade, _debois$elm_mdl$Material_Snackbar$Timeout))
										]))
							};
						default:
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Native_Utils.update(
									model,
									{state: _debois$elm_mdl$Material_Snackbar$Inert}),
								_1: _elm_lang$core$Platform_Cmd$batch(
									_elm_lang$core$Native_List.fromArray(
										[
											A2(
											_debois$elm_mdl$Material_Snackbar$next,
											model,
											_debois$elm_mdl$Material_Helpers$cmd(_debois$elm_mdl$Material_Snackbar$Timeout)),
											_debois$elm_mdl$Material_Helpers$cmd(
											_debois$elm_mdl$Material_Snackbar$End(_p4._0._0.payload))
										]))
							};
					}
				}
			} else {
				break _v3_4;
			}
		} while(false);
		return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
	});
var _debois$elm_mdl$Material_Snackbar$update = F2(
	function (action, model) {
		var _p7 = action;
		if (_p7.ctor === 'Move') {
			return _elm_lang$core$Native_Utils.eq(_p7._0, model.seq) ? A2(_debois$elm_mdl$Material_Snackbar$move, _p7._1, model) : {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
		} else {
			return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
		}
	});
var _debois$elm_mdl$Material_Snackbar$add = F2(
	function (contents, model) {
		return _debois$elm_mdl$Material_Snackbar$tryDequeue(
			A2(_debois$elm_mdl$Material_Snackbar$enqueue, contents, model));
	});

var _elm_lang$html$Html_Keyed$node = _elm_lang$virtual_dom$VirtualDom$keyedNode;
var _elm_lang$html$Html_Keyed$ol = _elm_lang$html$Html_Keyed$node('ol');
var _elm_lang$html$Html_Keyed$ul = _elm_lang$html$Html_Keyed$node('ul');

var _elm_lang$window$Native_Window = function()
{

var size = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)	{
	callback(_elm_lang$core$Native_Scheduler.succeed({
		width: window.innerWidth,
		height: window.innerHeight
	}));
});

return {
	size: size
};

}();
var _elm_lang$window$Window_ops = _elm_lang$window$Window_ops || {};
_elm_lang$window$Window_ops['&>'] = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Task$andThen,
			t1,
			function (_p0) {
				return t2;
			});
	});
var _elm_lang$window$Window$onSelfMsg = F3(
	function (router, dimensions, state) {
		var _p1 = state;
		if (_p1.ctor === 'Nothing') {
			return _elm_lang$core$Task$succeed(state);
		} else {
			var send = function (_p2) {
				var _p3 = _p2;
				return A2(
					_elm_lang$core$Platform$sendToApp,
					router,
					_p3._0(dimensions));
			};
			return A2(
				_elm_lang$window$Window_ops['&>'],
				_elm_lang$core$Task$sequence(
					A2(_elm_lang$core$List$map, send, _p1._0.subs)),
				_elm_lang$core$Task$succeed(state));
		}
	});
var _elm_lang$window$Window$init = _elm_lang$core$Task$succeed(_elm_lang$core$Maybe$Nothing);
var _elm_lang$window$Window$size = _elm_lang$window$Native_Window.size;
var _elm_lang$window$Window$width = A2(
	_elm_lang$core$Task$map,
	function (_) {
		return _.width;
	},
	_elm_lang$window$Window$size);
var _elm_lang$window$Window$height = A2(
	_elm_lang$core$Task$map,
	function (_) {
		return _.height;
	},
	_elm_lang$window$Window$size);
var _elm_lang$window$Window$onEffects = F3(
	function (router, newSubs, oldState) {
		var _p4 = {ctor: '_Tuple2', _0: oldState, _1: newSubs};
		if (_p4._0.ctor === 'Nothing') {
			if (_p4._1.ctor === '[]') {
				return _elm_lang$core$Task$succeed(_elm_lang$core$Maybe$Nothing);
			} else {
				return A2(
					_elm_lang$core$Task$andThen,
					_elm_lang$core$Process$spawn(
						A3(
							_elm_lang$dom$Dom_LowLevel$onWindow,
							'resize',
							_elm_lang$core$Json_Decode$succeed(
								{ctor: '_Tuple0'}),
							function (_p5) {
								return A2(
									_elm_lang$core$Task$andThen,
									_elm_lang$window$Window$size,
									_elm_lang$core$Platform$sendToSelf(router));
							})),
					function (pid) {
						return _elm_lang$core$Task$succeed(
							_elm_lang$core$Maybe$Just(
								{subs: newSubs, pid: pid}));
					});
			}
		} else {
			if (_p4._1.ctor === '[]') {
				return A2(
					_elm_lang$window$Window_ops['&>'],
					_elm_lang$core$Process$kill(_p4._0._0.pid),
					_elm_lang$core$Task$succeed(_elm_lang$core$Maybe$Nothing));
			} else {
				return _elm_lang$core$Task$succeed(
					_elm_lang$core$Maybe$Just(
						{subs: newSubs, pid: _p4._0._0.pid}));
			}
		}
	});
var _elm_lang$window$Window$subscription = _elm_lang$core$Native_Platform.leaf('Window');
var _elm_lang$window$Window$Size = F2(
	function (a, b) {
		return {width: a, height: b};
	});
var _elm_lang$window$Window$MySub = function (a) {
	return {ctor: 'MySub', _0: a};
};
var _elm_lang$window$Window$resizes = function (tagger) {
	return _elm_lang$window$Window$subscription(
		_elm_lang$window$Window$MySub(tagger));
};
var _elm_lang$window$Window$subMap = F2(
	function (func, _p6) {
		var _p7 = _p6;
		return _elm_lang$window$Window$MySub(
			function (_p8) {
				return func(
					_p7._0(_p8));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Window'] = {pkg: 'elm-lang/window', init: _elm_lang$window$Window$init, onEffects: _elm_lang$window$Window$onEffects, onSelfMsg: _elm_lang$window$Window$onSelfMsg, tag: 'sub', subMap: _elm_lang$window$Window$subMap};

var _debois$elm_mdl$Material_Layout$drawerView = F3(
	function (lift, isVisible, elems) {
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$classList(
					_elm_lang$core$Native_List.fromArray(
						[
							{ctor: '_Tuple2', _0: 'mdl-layout__drawer', _1: true},
							{ctor: '_Tuple2', _0: 'is-visible', _1: isVisible}
						])),
					A2(
					_elm_lang$html$Html_Attributes$attribute,
					'aria-hidden',
					isVisible ? 'false' : 'true')
				]),
			elems);
	});
var _debois$elm_mdl$Material_Layout$onKeypressFilterSpaceAndEnter = A2(_elm_lang$html$Html_Attributes$attribute, 'onkeypress', '\n  (function (evt) {\n     if (evt && evt.type === \"keydown\" && (evt.keyCode === 32 || evt.keyCode === 13)) {\n       evt.preventDefault();\n     }\n   })(window.event);\n  ');
var _debois$elm_mdl$Material_Layout$toList = function (x) {
	var _p0 = x;
	if (_p0.ctor === 'Nothing') {
		return _elm_lang$core$Native_List.fromArray(
			[]);
	} else {
		return _elm_lang$core$Native_List.fromArray(
			[_p0._0]);
	}
};
var _debois$elm_mdl$Material_Layout$isWaterfall = function (mode) {
	var _p1 = mode;
	if (_p1.ctor === 'Waterfall') {
		return true;
	} else {
		return false;
	}
};
var _debois$elm_mdl$Material_Layout$row = function (styles) {
	return _debois$elm_mdl$Material_Options$div(
		A2(
			_elm_lang$core$List_ops['::'],
			_debois$elm_mdl$Material_Options$cs('mdl-layout__header-row'),
			styles));
};
var _debois$elm_mdl$Material_Layout$link = F2(
	function (styles, contents) {
		return A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$a,
			A2(
				_elm_lang$core$List_ops['::'],
				_debois$elm_mdl$Material_Options$cs('mdl-navigation__link'),
				A2(
					_elm_lang$core$List_ops['::'],
					_debois$elm_mdl$Material_Options_Internal$attribute(
						A2(_elm_lang$html$Html_Attributes$attribute, 'tabindex', '1')),
					styles)),
			contents);
	});
var _debois$elm_mdl$Material_Layout$href = function (_p2) {
	return _debois$elm_mdl$Material_Options_Internal$attribute(
		_elm_lang$html$Html_Attributes$href(_p2));
};
var _debois$elm_mdl$Material_Layout$onClick = function (_p3) {
	return _debois$elm_mdl$Material_Options_Internal$attribute(
		_elm_lang$html$Html_Events$onClick(_p3));
};
var _debois$elm_mdl$Material_Layout$navigation = F2(
	function (styles, contents) {
		return A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$nav,
			A2(
				_elm_lang$core$List_ops['::'],
				_debois$elm_mdl$Material_Options$cs('mdl-navigation'),
				styles),
			contents);
	});
var _debois$elm_mdl$Material_Layout$title = function (styles) {
	return _debois$elm_mdl$Material_Options$span(
		A2(
			_elm_lang$core$List_ops['::'],
			_debois$elm_mdl$Material_Options$cs('mdl-layout__title'),
			styles));
};
var _debois$elm_mdl$Material_Layout$spacer = A2(
	_elm_lang$html$Html$div,
	_elm_lang$core$Native_List.fromArray(
		[
			_elm_lang$html$Html_Attributes$class('mdl-layout-spacer')
		]),
	_elm_lang$core$Native_List.fromArray(
		[]));
var _debois$elm_mdl$Material_Layout$onSelectTab = function (f) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					onSelectTab: _elm_lang$core$Maybe$Just(
						function (_p4) {
							return _elm_lang$html$Html_Events$onClick(
								f(_p4));
						})
				});
		});
};
var _debois$elm_mdl$Material_Layout$moreTabs = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{moreTabs: true});
	});
var _debois$elm_mdl$Material_Layout$selectedTab = function (k) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{selectedTab: k});
		});
};
var _debois$elm_mdl$Material_Layout$transparentHeader = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{transparentHeader: true});
	});
var _debois$elm_mdl$Material_Layout$rippleTabs = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{rippleTabs: true});
	});
var _debois$elm_mdl$Material_Layout$fixedTabs = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{fixedTabs: true});
	});
var _debois$elm_mdl$Material_Layout$fixedDrawer = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{fixedDrawer: true});
	});
var _debois$elm_mdl$Material_Layout$fixedHeader = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{fixedHeader: true});
	});
var _debois$elm_mdl$Material_Layout$setTabsWidth$ = F2(
	function (width, model) {
		var x = model.tabScrollState;
		return _elm_lang$core$Native_Utils.update(
			model,
			{
				tabScrollState: _elm_lang$core$Native_Utils.update(
					x,
					{
						width: _elm_lang$core$Maybe$Just(width)
					})
			});
	});
var _debois$elm_mdl$Material_Layout$setTabsWidth = F2(
	function (w, container) {
		return _elm_lang$core$Native_Utils.update(
			container,
			{
				layout: A2(_debois$elm_mdl$Material_Layout$setTabsWidth$, w, container.layout)
			});
	});
var _debois$elm_mdl$Material_Layout$defaultTabScrollState = {canScrollRight: true, canScrollLeft: false, width: _elm_lang$core$Maybe$Nothing};
var _debois$elm_mdl$Material_Layout$defaultModel = {ripples: _elm_lang$core$Dict$empty, isSmallScreen: false, isCompact: false, isAnimating: false, isScrolled: false, isDrawerOpen: false, tabScrollState: _debois$elm_mdl$Material_Layout$defaultTabScrollState};
var _debois$elm_mdl$Material_Layout$TabScrollState = F3(
	function (a, b, c) {
		return {canScrollLeft: a, canScrollRight: b, width: c};
	});
var _debois$elm_mdl$Material_Layout$Model = F7(
	function (a, b, c, d, e, f, g) {
		return {ripples: a, isSmallScreen: b, isCompact: c, isAnimating: d, isScrolled: e, isDrawerOpen: f, tabScrollState: g};
	});
var _debois$elm_mdl$Material_Layout$Config = F9(
	function (a, b, c, d, e, f, g, h, i) {
		return {fixedHeader: a, fixedDrawer: b, fixedTabs: c, rippleTabs: d, mode: e, selectedTab: f, onSelectTab: g, transparentHeader: h, moreTabs: i};
	});
var _debois$elm_mdl$Material_Layout$Contents = F4(
	function (a, b, c, d) {
		return {header: a, drawer: b, tabs: c, main: d};
	});
var _debois$elm_mdl$Material_Layout$Ripple = F2(
	function (a, b) {
		return {ctor: 'Ripple', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Layout$NOP = {ctor: 'NOP'};
var _debois$elm_mdl$Material_Layout$TransitionEnd = {ctor: 'TransitionEnd'};
var _debois$elm_mdl$Material_Layout$TransitionHeader = function (a) {
	return {ctor: 'TransitionHeader', _0: a};
};
var _debois$elm_mdl$Material_Layout$update$ = F3(
	function (f, action, model) {
		update$:
		while (true) {
			var _p5 = action;
			switch (_p5.ctor) {
				case 'NOP':
					return _elm_lang$core$Maybe$Nothing;
				case 'Resize':
					var _p6 = _p5._0;
					var tabScrollState = A2(
						_elm_lang$core$Maybe$withDefault,
						model.tabScrollState,
						A2(
							_elm_lang$core$Maybe$map,
							function (tabsWidth) {
								var tabScrollState = model.tabScrollState;
								return _elm_lang$core$Native_Utils.update(
									tabScrollState,
									{
										canScrollRight: _elm_lang$core$Native_Utils.cmp(tabsWidth + (2 * 56), _p6) > 0
									});
							},
							model.tabScrollState.width));
					var isSmall = _elm_lang$core$Native_Utils.cmp(1024, _p6) > 0;
					return (_elm_lang$core$Native_Utils.eq(isSmall, model.isSmallScreen) && _elm_lang$core$Native_Utils.eq(tabScrollState.canScrollRight, model.tabScrollState.canScrollRight)) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
						_debois$elm_mdl$Material_Helpers$pure(
							_elm_lang$core$Native_Utils.update(
								model,
								{
									isSmallScreen: isSmall,
									isDrawerOpen: _elm_lang$core$Basics$not(isSmall) && model.isDrawerOpen,
									tabScrollState: tabScrollState
								})));
				case 'ToggleDrawer':
					return _elm_lang$core$Maybe$Just(
						_debois$elm_mdl$Material_Helpers$pure(
							_elm_lang$core$Native_Utils.update(
								model,
								{
									isDrawerOpen: _elm_lang$core$Basics$not(model.isDrawerOpen)
								})));
				case 'Ripple':
					var _p8 = _p5._0;
					return _elm_lang$core$Maybe$Just(
						A2(
							_debois$elm_mdl$Material_Helpers$map2nd,
							_elm_lang$core$Platform_Cmd$map(
								function (_p7) {
									return f(
										A2(_debois$elm_mdl$Material_Layout$Ripple, _p8, _p7));
								}),
							A2(
								_debois$elm_mdl$Material_Helpers$map1st,
								function (ripple$) {
									return _elm_lang$core$Native_Utils.update(
										model,
										{
											ripples: A3(_elm_lang$core$Dict$insert, _p8, ripple$, model.ripples)
										});
								},
								A2(
									_debois$elm_mdl$Material_Ripple$update,
									_p5._1,
									A2(
										_elm_lang$core$Maybe$withDefault,
										_debois$elm_mdl$Material_Ripple$model,
										A2(_elm_lang$core$Dict$get, _p8, model.ripples))))));
				case 'ScrollTab':
					var _p9 = _p5._0;
					return (!_elm_lang$core$Native_Utils.eq(model.tabScrollState, _p9)) ? _elm_lang$core$Maybe$Just(
						_debois$elm_mdl$Material_Helpers$pure(
							_elm_lang$core$Native_Utils.update(
								model,
								{tabScrollState: _p9}))) : _elm_lang$core$Maybe$Nothing;
				case 'ScrollPane':
					var isScrolled = _elm_lang$core$Native_Utils.cmp(0.0, _p5._1) < 0;
					if (!_elm_lang$core$Native_Utils.eq(isScrolled, model.isScrolled)) {
						var _v3 = f,
							_v4 = _debois$elm_mdl$Material_Layout$TransitionHeader(
							{toCompact: isScrolled, fixedHeader: _p5._0}),
							_v5 = _elm_lang$core$Native_Utils.update(
							model,
							{isScrolled: isScrolled});
						f = _v3;
						action = _v4;
						model = _v5;
						continue update$;
					} else {
						return _elm_lang$core$Maybe$Nothing;
					}
				case 'TransitionHeader':
					return _elm_lang$core$Basics$not(model.isAnimating) ? _elm_lang$core$Maybe$Just(
						{
							ctor: '_Tuple2',
							_0: _elm_lang$core$Native_Utils.update(
								model,
								{
									isCompact: _p5._0.toCompact,
									isAnimating: _elm_lang$core$Basics$not(model.isSmallScreen) || _p5._0.fixedHeader
								}),
							_1: _elm_lang$core$Platform_Cmd$none
						}) : _elm_lang$core$Maybe$Nothing;
				default:
					return _elm_lang$core$Maybe$Just(
						_debois$elm_mdl$Material_Helpers$pure(
							_elm_lang$core$Native_Utils.update(
								model,
								{isAnimating: false})));
			}
		}
	});
var _debois$elm_mdl$Material_Layout$update = F2(
	function (msg, model) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			{ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none},
			A3(_debois$elm_mdl$Material_Layout$update$, _elm_lang$core$Basics$identity, msg, model));
	});
var _debois$elm_mdl$Material_Layout$pack = function (fwd) {
	return A4(
		_debois$elm_parts$Parts$pack1,
		_debois$elm_mdl$Material_Layout$update$,
		function (_) {
			return _.layout;
		},
		F2(
			function (x, c) {
				return _elm_lang$core$Native_Utils.update(
					c,
					{layout: x});
			}),
		fwd);
};
var _debois$elm_mdl$Material_Layout$ScrollPane = F2(
	function (a, b) {
		return {ctor: 'ScrollPane', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Layout$ScrollTab = function (a) {
	return {ctor: 'ScrollTab', _0: a};
};
var _debois$elm_mdl$Material_Layout$Resize = function (a) {
	return {ctor: 'Resize', _0: a};
};
var _debois$elm_mdl$Material_Layout$init = function () {
	var measureScreenSize = A3(
		_elm_lang$core$Task$perform,
		function (_p10) {
			return _debois$elm_mdl$Material_Layout$Resize(
				A2(_elm_lang$core$Debug$log, 'Can\'t get initial window dimensions. Guessing ', 1025));
		},
		_debois$elm_mdl$Material_Layout$Resize,
		_elm_lang$window$Window$width);
	return {ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Layout$defaultModel, _1: measureScreenSize};
}();
var _debois$elm_mdl$Material_Layout$sub0 = function (lift) {
	return A2(
		_elm_lang$core$Platform_Cmd$map,
		_debois$elm_mdl$Material_Layout$pack(lift),
		_elm_lang$core$Basics$snd(_debois$elm_mdl$Material_Layout$init));
};
var _debois$elm_mdl$Material_Layout$subscriptions = function (model) {
	return _elm_lang$window$Window$resizes(
		function (_p11) {
			return _debois$elm_mdl$Material_Layout$Resize(
				function (_) {
					return _.width;
				}(_p11));
		});
};
var _debois$elm_mdl$Material_Layout$subs = function (lift) {
	return function (_p12) {
		return A2(
			_elm_lang$core$Platform_Sub$map,
			_debois$elm_mdl$Material_Layout$pack(lift),
			_debois$elm_mdl$Material_Layout$subscriptions(
				function (_) {
					return _.layout;
				}(_p12)));
	};
};
var _debois$elm_mdl$Material_Layout$ToggleDrawer = {ctor: 'ToggleDrawer'};
var _debois$elm_mdl$Material_Layout$drawerButton = F2(
	function (lift, isVisible) {
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$html$Html$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$classList(
							_elm_lang$core$Native_List.fromArray(
								[
									{ctor: '_Tuple2', _0: 'mdl-layout__drawer-button', _1: true}
								])),
							A2(
							_elm_lang$html$Html_Attributes$attribute,
							'aria-expanded',
							isVisible ? 'true' : 'false'),
							_elm_lang$html$Html_Attributes$tabindex(1),
							_elm_lang$html$Html_Events$onClick(
							lift(_debois$elm_mdl$Material_Layout$ToggleDrawer)),
							A3(
							_elm_lang$html$Html_Events$onWithOptions,
							'keydown',
							{stopPropagation: false, preventDefault: false},
							A2(
								_elm_lang$core$Json_Decode$map,
								function (_p13) {
									return lift(
										function (key) {
											var _p14 = key;
											switch (_p14) {
												case 32:
													return _debois$elm_mdl$Material_Layout$ToggleDrawer;
												case 13:
													return _debois$elm_mdl$Material_Layout$ToggleDrawer;
												default:
													return _debois$elm_mdl$Material_Layout$NOP;
											}
										}(_p13));
								},
								_elm_lang$html$Html_Events$keyCode))
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Icon$i('menu')
						]))
				]));
	});
var _debois$elm_mdl$Material_Layout$obfuscator = F2(
	function (lift, isVisible) {
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$classList(
					_elm_lang$core$Native_List.fromArray(
						[
							{ctor: '_Tuple2', _0: 'mdl-layout__obfuscator', _1: true},
							{ctor: '_Tuple2', _0: 'is-visible', _1: isVisible}
						])),
					_elm_lang$html$Html_Events$onClick(
					lift(_debois$elm_mdl$Material_Layout$ToggleDrawer))
				]),
			_elm_lang$core$Native_List.fromArray(
				[]));
	});
var _debois$elm_mdl$Material_Layout$toggleDrawer = function (lift) {
	return A2(_debois$elm_mdl$Material_Layout$pack, lift, _debois$elm_mdl$Material_Layout$ToggleDrawer);
};
var _debois$elm_mdl$Material_Layout$LinkProp = {ctor: 'LinkProp'};
var _debois$elm_mdl$Material_Layout$Waterfall = function (a) {
	return {ctor: 'Waterfall', _0: a};
};
var _debois$elm_mdl$Material_Layout$waterfall = function (b) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					mode: _debois$elm_mdl$Material_Layout$Waterfall(b)
				});
		});
};
var _debois$elm_mdl$Material_Layout$Scrolling = {ctor: 'Scrolling'};
var _debois$elm_mdl$Material_Layout$scrolling = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{mode: _debois$elm_mdl$Material_Layout$Scrolling});
	});
var _debois$elm_mdl$Material_Layout$Seamed = {ctor: 'Seamed'};
var _debois$elm_mdl$Material_Layout$seamed = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{mode: _debois$elm_mdl$Material_Layout$Seamed});
	});
var _debois$elm_mdl$Material_Layout$Standard = {ctor: 'Standard'};
var _debois$elm_mdl$Material_Layout$defaultConfig = {fixedHeader: false, fixedDrawer: false, fixedTabs: false, rippleTabs: true, mode: _debois$elm_mdl$Material_Layout$Standard, onSelectTab: _elm_lang$core$Maybe$Nothing, selectedTab: -1, moreTabs: false, transparentHeader: false};
var _debois$elm_mdl$Material_Layout$headerView = F4(
	function (lift, config, model, _p15) {
		var _p16 = _p15;
		var mode = function () {
			var _p17 = config.mode;
			switch (_p17.ctor) {
				case 'Standard':
					return _debois$elm_mdl$Material_Options$nop;
				case 'Scrolling':
					return _debois$elm_mdl$Material_Options$cs('mdl-layout__header--scroll');
				case 'Seamed':
					return _debois$elm_mdl$Material_Options$cs('mdl-layout__header--seamed');
				default:
					if (_p17._0 === true) {
						return _debois$elm_mdl$Material_Options$cs('mdl-layout__header--waterfall mdl-layout__header--waterfall-hide-top');
					} else {
						return _debois$elm_mdl$Material_Options$cs('mdl-layout__header--waterfall');
					}
			}
		}();
		return A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$header,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$cs('mdl-layout__header'),
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('is-casting-shadow'),
					_elm_lang$core$Native_Utils.eq(config.mode, _debois$elm_mdl$Material_Layout$Standard) || (_debois$elm_mdl$Material_Layout$isWaterfall(config.mode) && model.isCompact)),
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('is-animating'),
					model.isAnimating),
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('is-compact'),
					model.isCompact),
					mode,
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('mdl-layout__header--transparent'),
					config.transparentHeader),
					_debois$elm_mdl$Material_Options_Internal$attribute(
					_elm_lang$html$Html_Events$onClick(
						lift(
							_debois$elm_mdl$Material_Layout$TransitionHeader(
								{toCompact: false, fixedHeader: config.fixedHeader})))),
					_debois$elm_mdl$Material_Options_Internal$attribute(
					A2(
						_elm_lang$html$Html_Events$on,
						'transitionend',
						_elm_lang$core$Json_Decode$succeed(
							lift(_debois$elm_mdl$Material_Layout$TransitionEnd))))
				]),
			A2(
				_elm_lang$core$List$concatMap,
				function (x) {
					return x;
				},
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Layout$toList(_p16._0),
						_p16._1,
						_debois$elm_mdl$Material_Layout$toList(_p16._2)
					])));
	});
var _debois$elm_mdl$Material_Layout$Right = {ctor: 'Right'};
var _debois$elm_mdl$Material_Layout$Left = {ctor: 'Left'};
var _debois$elm_mdl$Material_Layout$tabsView = F4(
	function (lift, config, model, _p18) {
		var _p19 = _p18;
		var _p22 = _p19._1;
		var chevron = F2(
			function (direction, offset) {
				var dir = function () {
					var _p20 = direction;
					if (_p20.ctor === 'Left') {
						return 'left';
					} else {
						return 'right';
					}
				}();
				return A3(
					_debois$elm_mdl$Material_Options$styled,
					_elm_lang$html$Html$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Options$cs('mdl-layout__tab-bar-button'),
							_debois$elm_mdl$Material_Options$cs(
							A2(
								_elm_lang$core$Basics_ops['++'],
								'mdl-layout__tab-bar-',
								A2(_elm_lang$core$Basics_ops['++'], dir, '-button'))),
							A2(
							_debois$elm_mdl$Material_Options$when,
							_debois$elm_mdl$Material_Options$cs('is-active'),
							(_elm_lang$core$Native_Utils.eq(direction, _debois$elm_mdl$Material_Layout$Left) && model.tabScrollState.canScrollLeft) || (_elm_lang$core$Native_Utils.eq(direction, _debois$elm_mdl$Material_Layout$Right) && model.tabScrollState.canScrollRight)),
							_debois$elm_mdl$Material_Options$many(_p22)
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_Icon$view,
							A2(_elm_lang$core$Basics_ops['++'], 'chevron_', dir),
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Icon$size24,
									_debois$elm_mdl$Material_Options_Internal$attribute(
									A2(
										_elm_lang$html$Html_Attributes$attribute,
										'onclick',
										A2(
											_elm_lang$core$Basics_ops['++'],
											'document.getElementsByClassName(\'mdl-layout__tab-bar\')[0].scrollLeft += ',
											_elm_lang$core$Basics$toString(offset))))
								]))
						]));
			});
		return A2(
			_debois$elm_mdl$Material_Options$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$cs('mdl-layout__tab-bar-container')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(chevron, _debois$elm_mdl$Material_Layout$Left, -100),
					A2(
					_debois$elm_mdl$Material_Options$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Options$cs('mdl-layout__tab-bar'),
							A2(_debois$elm_mdl$Material_Options$css, 'position', 'relative'),
							A2(_debois$elm_mdl$Material_Options$css, 'scroll-behavior', 'smooth'),
							config.rippleTabs ? _debois$elm_mdl$Material_Options$many(
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Options$cs('mdl-js-ripple-effect'),
									_debois$elm_mdl$Material_Options$cs('mds-js-ripple-effect--ignore-events')
								])) : _debois$elm_mdl$Material_Options$nop,
							_elm_lang$core$Native_Utils.eq(config.mode, _debois$elm_mdl$Material_Layout$Standard) ? _debois$elm_mdl$Material_Options$cs('is-casting-shadow') : _debois$elm_mdl$Material_Options$nop,
							_debois$elm_mdl$Material_Options$many(_p22),
							_debois$elm_mdl$Material_Options_Internal$attribute(
							A2(
								_elm_lang$html$Html_Events$on,
								'scroll',
								_debois$elm_dom$DOM$target(
									A4(
										_elm_lang$core$Json_Decode$object3,
										F3(
											function (scrollWidth, clientWidth, scrollLeft) {
												return lift(
													_debois$elm_mdl$Material_Layout$ScrollTab(
														{
															canScrollLeft: _elm_lang$core$Native_Utils.cmp(scrollLeft, 0) > 0,
															canScrollRight: _elm_lang$core$Native_Utils.cmp(scrollWidth - clientWidth, scrollLeft + 1) > 0,
															width: _elm_lang$core$Maybe$Just(scrollWidth)
														}));
											}),
										A2(_elm_lang$core$Json_Decode_ops[':='], 'scrollWidth', _elm_lang$core$Json_Decode$float),
										A2(_elm_lang$core$Json_Decode_ops[':='], 'clientWidth', _elm_lang$core$Json_Decode$float),
										A2(_elm_lang$core$Json_Decode_ops[':='], 'scrollLeft', _elm_lang$core$Json_Decode$float)))))
						]),
					A2(
						_elm_lang$core$List$indexedMap,
						F2(
							function (tabIndex, tab) {
								return A3(
									_debois$elm_mdl$Material_Helpers$filter,
									_elm_lang$html$Html$a,
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html_Attributes$classList(
											_elm_lang$core$Native_List.fromArray(
												[
													{ctor: '_Tuple2', _0: 'mdl-layout__tab', _1: true},
													{
													ctor: '_Tuple2',
													_0: 'is-active',
													_1: _elm_lang$core$Native_Utils.eq(tabIndex, config.selectedTab)
												}
												])),
											A2(
											_elm_lang$core$Maybe$withDefault,
											_debois$elm_mdl$Material_Helpers$noAttr,
											A2(
												_elm_lang$core$Maybe$map,
												F2(
													function (x, y) {
														return y(x);
													})(tabIndex),
												config.onSelectTab))
										]),
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$core$Maybe$Just(tab),
											config.rippleTabs ? _elm_lang$core$Maybe$Just(
											A2(
												_elm_lang$html$Html_App$map,
												function (_p21) {
													return lift(
														A2(_debois$elm_mdl$Material_Layout$Ripple, tabIndex, _p21));
												},
												A2(
													_debois$elm_mdl$Material_Ripple$view,
													_elm_lang$core$Native_List.fromArray(
														[
															_elm_lang$html$Html_Attributes$class('mdl-layout__tab-ripple-container')
														]),
													A2(
														_elm_lang$core$Maybe$withDefault,
														_debois$elm_mdl$Material_Ripple$model,
														A2(_elm_lang$core$Dict$get, tabIndex, model.ripples))))) : _elm_lang$core$Maybe$Nothing
										]));
							}),
						_p19._0)),
					A2(chevron, _debois$elm_mdl$Material_Layout$Right, 100)
				]));
	});
var _debois$elm_mdl$Material_Layout$view = F4(
	function (lift, model, options, _p23) {
		var _p24 = _p23;
		var _p32 = _p24.tabs;
		var _p31 = _p24.header;
		var _p30 = _p24.drawer;
		var hasDrawer = !_elm_lang$core$Native_Utils.eq(
			_p30,
			_elm_lang$core$Native_List.fromArray(
				[]));
		var hasTabs = _elm_lang$core$Basics$not(
			_elm_lang$core$List$isEmpty(
				_elm_lang$core$Basics$fst(_p32)));
		var hasHeader = hasTabs || _elm_lang$core$Basics$not(
			_elm_lang$core$List$isEmpty(_p31));
		var summary = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Layout$defaultConfig, options);
		var config = summary.config;
		var drawerIsFixed = config.fixedDrawer && _elm_lang$core$Basics$not(model.isSmallScreen);
		var drawerIsVisible = model.isDrawerOpen && _elm_lang$core$Basics$not(drawerIsFixed);
		var _p25 = function () {
			var _p26 = {ctor: '_Tuple3', _0: _p30, _1: _p31, _2: config.fixedHeader};
			if ((_p26.ctor === '_Tuple3') && (_p26._0.ctor === '::')) {
				if ((_p26._1.ctor === '::') && (_p26._2 === true)) {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Maybe$Nothing,
						_1: _elm_lang$core$Maybe$Just(
							A2(_debois$elm_mdl$Material_Layout$drawerButton, lift, drawerIsVisible))
					};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Maybe$Just(
							A2(_debois$elm_mdl$Material_Layout$drawerButton, lift, drawerIsVisible)),
						_1: _elm_lang$core$Maybe$Nothing
					};
				}
			} else {
				return {ctor: '_Tuple2', _0: _elm_lang$core$Maybe$Nothing, _1: _elm_lang$core$Maybe$Nothing};
			}
		}();
		var contentDrawerButton = _p25._0;
		var headerDrawerButton = _p25._1;
		var tabsElems = _elm_lang$core$Basics$not(hasTabs) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
			A4(_debois$elm_mdl$Material_Layout$tabsView, lift, config, model, _p32));
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$classList(
					_elm_lang$core$Native_List.fromArray(
						[
							{ctor: '_Tuple2', _0: 'mdl-layout__container', _1: true},
							{
							ctor: '_Tuple2',
							_0: 'has-scrolling-header',
							_1: _elm_lang$core$Native_Utils.eq(config.mode, _debois$elm_mdl$Material_Layout$Scrolling)
						}
						]))
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A3(
					_debois$elm_mdl$Material_Helpers$filter,
					_elm_lang$html$Html_Keyed$node('div'),
					A2(
						_elm_lang$core$List$filterMap,
						_elm_lang$core$Basics$identity,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$core$Maybe$Just(
								_elm_lang$html$Html_Attributes$classList(
									_elm_lang$core$Native_List.fromArray(
										[
											{ctor: '_Tuple2', _0: 'mdl-layout ', _1: true},
											{ctor: '_Tuple2', _0: 'is-upgraded', _1: true},
											{ctor: '_Tuple2', _0: 'is-small-screen', _1: model.isSmallScreen},
											{ctor: '_Tuple2', _0: 'has-drawer', _1: hasDrawer},
											{ctor: '_Tuple2', _0: 'has-tabs', _1: hasTabs},
											{ctor: '_Tuple2', _0: 'mdl-js-layout', _1: true},
											{ctor: '_Tuple2', _0: 'mdl-layout--fixed-drawer', _1: config.fixedDrawer && hasDrawer},
											{ctor: '_Tuple2', _0: 'mdl-layout--fixed-header', _1: config.fixedHeader && hasHeader},
											{ctor: '_Tuple2', _0: 'mdl-layout--fixed-tabs', _1: config.fixedTabs && hasTabs}
										]))),
								drawerIsVisible ? _elm_lang$core$Maybe$Just(
								A2(
									_elm_lang$html$Html_Events$on,
									'keydown',
									A2(
										_elm_lang$core$Json_Decode$map,
										function (_p27) {
											return lift(
												function (key) {
													return _elm_lang$core$Native_Utils.eq(key, 27) ? _debois$elm_mdl$Material_Layout$ToggleDrawer : _debois$elm_mdl$Material_Layout$NOP;
												}(_p27));
										},
										_elm_lang$html$Html_Events$keyCode))) : _elm_lang$core$Maybe$Nothing
							])),
					_elm_lang$core$Native_List.fromArray(
						[
							hasHeader ? _elm_lang$core$Maybe$Just(
							A2(
								F2(
									function (v0, v1) {
										return {ctor: '_Tuple2', _0: v0, _1: v1};
									}),
								'elm-mdl-header',
								A4(
									_debois$elm_mdl$Material_Layout$headerView,
									lift,
									config,
									model,
									{ctor: '_Tuple3', _0: headerDrawerButton, _1: _p31, _2: tabsElems}))) : _elm_lang$core$Maybe$Nothing,
							_elm_lang$core$Basics$not(hasDrawer) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
							{
								ctor: '_Tuple2',
								_0: 'elm-mdl-drawer',
								_1: A3(_debois$elm_mdl$Material_Layout$drawerView, lift, drawerIsVisible, _p30)
							}),
							_elm_lang$core$Basics$not(hasDrawer) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
							{
								ctor: '_Tuple2',
								_0: 'elm-mdl-obfuscator',
								_1: A2(_debois$elm_mdl$Material_Layout$obfuscator, lift, drawerIsVisible)
							}),
							A2(
							_elm_lang$core$Maybe$map,
							F2(
								function (v0, v1) {
									return {ctor: '_Tuple2', _0: v0, _1: v1};
								})('elm-drawer-button'),
							contentDrawerButton),
							_elm_lang$core$Maybe$Just(
							A2(
								F2(
									function (v0, v1) {
										return {ctor: '_Tuple2', _0: v0, _1: v1};
									}),
								_elm_lang$core$Basics$toString(config.selectedTab),
								A3(
									_debois$elm_mdl$Material_Options$styled,
									_elm_lang$html$Html$main$,
									_elm_lang$core$Native_List.fromArray(
										[
											_debois$elm_mdl$Material_Options$cs('mdl-layout__content'),
											A2(
											_debois$elm_mdl$Material_Options$when,
											A2(_debois$elm_mdl$Material_Options$css, 'overflow-y', 'visible'),
											_elm_lang$core$Native_Utils.eq(config.mode, _debois$elm_mdl$Material_Layout$Scrolling) && config.fixedHeader),
											A2(
											_debois$elm_mdl$Material_Options$when,
											A2(_debois$elm_mdl$Material_Options$css, 'overflow-x', 'visible'),
											_elm_lang$core$Native_Utils.eq(config.mode, _debois$elm_mdl$Material_Layout$Scrolling) && config.fixedHeader),
											A2(
											_debois$elm_mdl$Material_Options$when,
											A2(_debois$elm_mdl$Material_Options$css, 'overflow', 'visible'),
											_elm_lang$core$Native_Utils.eq(config.mode, _debois$elm_mdl$Material_Layout$Scrolling) && config.fixedHeader),
											A2(
											_debois$elm_mdl$Material_Options$when,
											function (_p28) {
												return _debois$elm_mdl$Material_Options_Internal$attribute(
													A2(_elm_lang$html$Html_Events$on, 'scroll', _p28));
											}(
												A2(
													_elm_lang$core$Json_Decode$map,
													function (_p29) {
														return lift(
															A2(_debois$elm_mdl$Material_Layout$ScrollPane, config.fixedHeader, _p29));
													},
													_debois$elm_dom$DOM$target(_debois$elm_dom$DOM$scrollTop))),
											_debois$elm_mdl$Material_Layout$isWaterfall(config.mode))
										]),
									_p24.main)))
						]))
				]));
	});
var _debois$elm_mdl$Material_Layout$render = A4(
	_debois$elm_parts$Parts$create1,
	_debois$elm_mdl$Material_Layout$view,
	_debois$elm_mdl$Material_Layout$update$,
	function (_) {
		return _.layout;
	},
	F2(
		function (x, c) {
			return _elm_lang$core$Native_Utils.update(
				c,
				{layout: x});
		}));

var _debois$elm_mdl$Material_Toggles$group = function (s) {
	return _debois$elm_mdl$Material_Options$set(
		function (options) {
			return _elm_lang$core$Native_Utils.update(
				options,
				{
					group: _elm_lang$core$Maybe$Just(
						_elm_lang$html$Html_Attributes$name(s))
				});
		});
};
var _debois$elm_mdl$Material_Toggles$value = function (b) {
	return _debois$elm_mdl$Material_Options$set(
		function (options) {
			return _elm_lang$core$Native_Utils.update(
				options,
				{value: b});
		});
};
var _debois$elm_mdl$Material_Toggles$disabled = _debois$elm_mdl$Material_Options$set(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{isDisabled: true});
	});
var _debois$elm_mdl$Material_Toggles$ripple = _debois$elm_mdl$Material_Options$set(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{ripple: true});
	});
var _debois$elm_mdl$Material_Toggles$onClick = function (x) {
	return _debois$elm_mdl$Material_Options$set(
		function (options) {
			return _elm_lang$core$Native_Utils.update(
				options,
				{
					onClick: _elm_lang$core$Maybe$Just(
						A2(
							_elm_lang$html$Html_Events$on,
							'change',
							_elm_lang$core$Json_Decode$succeed(x)))
				});
		});
};
var _debois$elm_mdl$Material_Toggles$defaultConfig = {
	isDisabled: false,
	value: false,
	ripple: false,
	group: _elm_lang$core$Maybe$Nothing,
	onClick: _elm_lang$core$Maybe$Nothing,
	inner: _elm_lang$core$Native_List.fromArray(
		[])
};
var _debois$elm_mdl$Material_Toggles$defaultModel = {ripple: _debois$elm_mdl$Material_Ripple$model, isFocused: false};
var _debois$elm_mdl$Material_Toggles$Model = F2(
	function (a, b) {
		return {ripple: a, isFocused: b};
	});
var _debois$elm_mdl$Material_Toggles$Config = F6(
	function (a, b, c, d, e, f) {
		return {isDisabled: a, value: b, ripple: c, group: d, onClick: e, inner: f};
	});
var _debois$elm_mdl$Material_Toggles$SetFocus = function (a) {
	return {ctor: 'SetFocus', _0: a};
};
var _debois$elm_mdl$Material_Toggles$Ripple = function (a) {
	return {ctor: 'Ripple', _0: a};
};
var _debois$elm_mdl$Material_Toggles$update = F2(
	function (action, model) {
		var _p0 = action;
		if (_p0.ctor === 'Ripple') {
			return A2(
				_debois$elm_mdl$Material_Helpers$map2nd,
				_elm_lang$core$Platform_Cmd$map(_debois$elm_mdl$Material_Toggles$Ripple),
				A2(
					_debois$elm_mdl$Material_Helpers$map1st,
					function (r) {
						return _elm_lang$core$Native_Utils.update(
							model,
							{ripple: r});
					},
					A2(_debois$elm_mdl$Material_Ripple$update, _p0._0, model.ripple)));
		} else {
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_Utils.update(
					model,
					{isFocused: _p0._0}),
				_1: _elm_lang$core$Platform_Cmd$none
			};
		}
	});
var _debois$elm_mdl$Material_Toggles$render = function (view) {
	return A5(
		_debois$elm_parts$Parts$create,
		view,
		_debois$elm_parts$Parts$generalize(_debois$elm_mdl$Material_Toggles$update),
		function (_) {
			return _.toggles;
		},
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.update(
					y,
					{toggles: x});
			}),
		_debois$elm_mdl$Material_Toggles$defaultModel);
};
var _debois$elm_mdl$Material_Toggles$top = F5(
	function (lift, group, model, summary, elems) {
		var cfg = summary.config;
		return A5(
			_debois$elm_mdl$Material_Options$apply,
			summary,
			_elm_lang$html$Html$label,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$cs(
					A2(_elm_lang$core$Basics_ops['++'], 'mdl-', group)),
					_debois$elm_mdl$Material_Options$cs(
					A2(_elm_lang$core$Basics_ops['++'], 'mdl-js-', group)),
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('mdl-js-ripple-effect'),
					cfg.ripple),
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('mdl-js-ripple-effect--ignore-events'),
					cfg.ripple),
					_debois$elm_mdl$Material_Options$cs('is-upgraded'),
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('is-checked'),
					cfg.value),
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('is-focused'),
					model.isFocused)
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Helpers$blurOn('mouseup'),
					_elm_lang$html$Html_Events$onFocus(
					lift(
						_debois$elm_mdl$Material_Toggles$SetFocus(true))),
					_elm_lang$html$Html_Events$onBlur(
					lift(
						_debois$elm_mdl$Material_Toggles$SetFocus(false))),
					A2(_elm_lang$core$Maybe$withDefault, _debois$elm_mdl$Material_Helpers$noAttr, cfg.onClick)
				]),
			_elm_lang$core$List$concat(
				_elm_lang$core$Native_List.fromArray(
					[
						elems,
						cfg.ripple ? _elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$html$Html_App$map,
							function (_p1) {
								return lift(
									_debois$elm_mdl$Material_Toggles$Ripple(_p1));
							},
							A2(
								_debois$elm_mdl$Material_Ripple$view,
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html_Attributes$class('mdl-switch__ripple-container mdl-js-ripple-effect mdl-ripple--center')
									]),
								model.ripple))
						]) : _elm_lang$core$Native_List.fromArray(
						[])
					])));
	});
var _debois$elm_mdl$Material_Toggles$viewCheckbox = F4(
	function (lift, model, config, elems) {
		var summary = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Toggles$defaultConfig, config);
		var cfg = summary.config;
		return A5(
			_debois$elm_mdl$Material_Toggles$top,
			lift,
			'checkbox',
			model,
			summary,
			_elm_lang$core$Native_List.fromArray(
				[
					A4(
					_debois$elm_mdl$Material_Options$styled$,
					_elm_lang$html$Html$input,
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Options$cs('mdl-checkbox__input'),
							_debois$elm_mdl$Material_Options$many(cfg.inner)
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$type$('checkbox'),
							_elm_lang$html$Html_Attributes$disabled(cfg.isDisabled),
							_elm_lang$html$Html_Attributes$checked(cfg.value)
						]),
					_elm_lang$core$Native_List.fromArray(
						[])),
					A2(
					_elm_lang$html$Html$span,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('mdl-checkbox__label')
						]),
					elems),
					A2(
					_elm_lang$html$Html$span,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('mdl-checkbox__focus-helper')
						]),
					_elm_lang$core$Native_List.fromArray(
						[])),
					A2(
					_elm_lang$html$Html$span,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('mdl-checkbox__box-outline')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$html$Html$span,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html_Attributes$class('mdl-checkbox__tick-outline')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						]))
				]));
	});
var _debois$elm_mdl$Material_Toggles$checkbox = _debois$elm_mdl$Material_Toggles$render(_debois$elm_mdl$Material_Toggles$viewCheckbox);
var _debois$elm_mdl$Material_Toggles$viewSwitch = F4(
	function (lift, model, config, elems) {
		var summary = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Toggles$defaultConfig, config);
		var cfg = summary.config;
		return A5(
			_debois$elm_mdl$Material_Toggles$top,
			lift,
			'switch',
			model,
			summary,
			_elm_lang$core$Native_List.fromArray(
				[
					A4(
					_debois$elm_mdl$Material_Options$styled$,
					_elm_lang$html$Html$input,
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Options$cs('mdl-switch__input'),
							_debois$elm_mdl$Material_Options$many(cfg.inner)
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$type$('checkbox'),
							_elm_lang$html$Html_Attributes$disabled(cfg.isDisabled),
							_elm_lang$html$Html_Attributes$checked(cfg.value)
						]),
					_elm_lang$core$Native_List.fromArray(
						[])),
					A2(
					_elm_lang$html$Html$span,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('mdl-switch__label')
						]),
					elems),
					A2(
					_elm_lang$html$Html$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('mdl-switch__track')
						]),
					_elm_lang$core$Native_List.fromArray(
						[])),
					A2(
					_elm_lang$html$Html$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('mdl-switch__thumb')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$html$Html$span,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html_Attributes$class('mdl-switch__focus-helper')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						]))
				]));
	});
var _debois$elm_mdl$Material_Toggles$switch = _debois$elm_mdl$Material_Toggles$render(_debois$elm_mdl$Material_Toggles$viewSwitch);
var _debois$elm_mdl$Material_Toggles$viewRadio = F4(
	function (lift, model, config, elems) {
		var summary = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Toggles$defaultConfig, config);
		var cfg = summary.config;
		return A5(
			_debois$elm_mdl$Material_Toggles$top,
			lift,
			'radio',
			model,
			summary,
			_elm_lang$core$Native_List.fromArray(
				[
					A4(
					_debois$elm_mdl$Material_Options$styled$,
					_elm_lang$html$Html$input,
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Options$cs('mdl-radio__button'),
							_debois$elm_mdl$Material_Options$many(cfg.inner)
						]),
					A2(
						_elm_lang$core$List$filterMap,
						_elm_lang$core$Basics$identity,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$core$Maybe$Just(
								_elm_lang$html$Html_Attributes$type$('radio')),
								_elm_lang$core$Maybe$Just(
								_elm_lang$html$Html_Attributes$disabled(cfg.isDisabled)),
								_elm_lang$core$Maybe$Just(
								_elm_lang$html$Html_Attributes$checked(cfg.value)),
								cfg.group
							])),
					_elm_lang$core$Native_List.fromArray(
						[])),
					A2(
					_elm_lang$html$Html$span,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('mdl-radio__label')
						]),
					elems),
					A2(
					_elm_lang$html$Html$span,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('mdl-radio__outer-circle')
						]),
					_elm_lang$core$Native_List.fromArray(
						[])),
					A2(
					_elm_lang$html$Html$span,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('mdl-radio__inner-circle')
						]),
					_elm_lang$core$Native_List.fromArray(
						[]))
				]));
	});
var _debois$elm_mdl$Material_Toggles$radio = _debois$elm_mdl$Material_Toggles$render(_debois$elm_mdl$Material_Toggles$viewRadio);

var _debois$elm_mdl$Material_Tooltip$set = F2(
	function (x, y) {
		return _elm_lang$core$Native_Utils.update(
			y,
			{tooltip: x});
	});
var _debois$elm_mdl$Material_Tooltip$container = function (elem) {
	return _debois$elm_mdl$Material_Options$set(
		function (options) {
			return _elm_lang$core$Native_Utils.update(
				options,
				{container: elem});
		});
};
var _debois$elm_mdl$Material_Tooltip$isTooltipClass = function (path) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		A2(_elm_lang$core$Json_Decode$at, path, _debois$elm_dom$DOM$className),
		function ($class) {
			return A2(_elm_lang$core$String$contains, 'mdl-tooltip', $class) ? _elm_lang$core$Json_Decode$succeed(true) : _elm_lang$core$Json_Decode$succeed(false);
		});
};
var _debois$elm_mdl$Material_Tooltip$sibling = function (d) {
	var valid = function (path) {
		return A2(
			_elm_lang$core$Json_Decode$andThen,
			_debois$elm_mdl$Material_Tooltip$isTooltipClass(path),
			function (res) {
				return res ? A2(_elm_lang$core$Json_Decode$at, path, d) : _elm_lang$core$Json_Decode$fail('');
			});
	};
	var createPath = function (depth) {
		var parents = A2(_elm_lang$core$List$repeat, depth, 'parentElement');
		return A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Native_List.fromArray(
				['target']),
			A2(
				_elm_lang$core$Basics_ops['++'],
				parents,
				_elm_lang$core$Native_List.fromArray(
					['nextSibling'])));
	};
	var paths = A2(
		_elm_lang$core$List$map,
		createPath,
		_elm_lang$core$Native_List.range(0, 4));
	return _elm_lang$core$Json_Decode$oneOf(
		A2(_elm_lang$core$List$map, valid, paths));
};
var _debois$elm_mdl$Material_Tooltip$update = F2(
	function (action, model) {
		var _p0 = action;
		if (_p0.ctor === 'Enter') {
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_Utils.update(
					model,
					{isActive: true, domState: _p0._0}),
				_1: _elm_lang$core$Platform_Cmd$none
			};
		} else {
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_Utils.update(
					model,
					{isActive: false}),
				_1: _elm_lang$core$Platform_Cmd$none
			};
		}
	});
var _debois$elm_mdl$Material_Tooltip$calculatePos = F2(
	function (pos, domState) {
		var getValuesFor = F2(
			function (l, r) {
				return (_elm_lang$core$Native_Utils.cmp(l + r, 0) < 0) ? {ctor: '_Tuple2', _0: 0, _1: 0} : {ctor: '_Tuple2', _0: l, _1: r};
			});
		var offsetHeight = domState.offsetHeight;
		var marginTop = -1 * (offsetHeight / 2);
		var offsetWidth = domState.offsetWidth;
		var marginLeft = -1 * (offsetWidth / 2);
		var props = domState.rect;
		var left = props.left + (props.width / 2);
		var _p1 = A2(getValuesFor, left, marginLeft);
		var newLeft = _p1._0;
		var newMarginLeft = _p1._1;
		var top = props.top + (props.height / 2);
		var _p2 = A2(getValuesFor, top, marginTop);
		var newTop = _p2._0;
		var newMarginTop = _p2._1;
		var out = function () {
			var _p3 = pos;
			switch (_p3.ctor) {
				case 'Left':
					return {left: (props.left - offsetWidth) - 10, top: newTop, marginTop: newMarginTop, marginLeft: 0};
				case 'Right':
					return {left: (props.left + props.width) + 10, top: newTop, marginTop: newMarginTop, marginLeft: 0};
				case 'Top':
					return {left: newLeft, top: (props.top - offsetHeight) - 10, marginTop: 0, marginLeft: newMarginLeft};
				default:
					return {left: newLeft, top: (props.top + props.height) + 10, marginTop: 0, marginLeft: newMarginLeft};
			}
		}();
		return out;
	});
var _debois$elm_mdl$Material_Tooltip$defaultDOMState = {
	rect: {left: 0, top: 0, width: 0, height: 0},
	offsetWidth: 0,
	offsetHeight: 0
};
var _debois$elm_mdl$Material_Tooltip$defaultPos = {left: 0, top: 0, marginLeft: 0, marginTop: 0};
var _debois$elm_mdl$Material_Tooltip$defaultModel = {isActive: false, domState: _debois$elm_mdl$Material_Tooltip$defaultDOMState};
var _debois$elm_mdl$Material_Tooltip$pack = A4(
	_debois$elm_parts$Parts$pack,
	_debois$elm_parts$Parts$generalize(_debois$elm_mdl$Material_Tooltip$update),
	function (_) {
		return _.tooltip;
	},
	_debois$elm_mdl$Material_Tooltip$set,
	_debois$elm_mdl$Material_Tooltip$defaultModel);
var _debois$elm_mdl$Material_Tooltip$Model = F2(
	function (a, b) {
		return {isActive: a, domState: b};
	});
var _debois$elm_mdl$Material_Tooltip$Pos = F4(
	function (a, b, c, d) {
		return {left: a, top: b, marginLeft: c, marginTop: d};
	});
var _debois$elm_mdl$Material_Tooltip$DOMState = F3(
	function (a, b, c) {
		return {rect: a, offsetWidth: b, offsetHeight: c};
	});
var _debois$elm_mdl$Material_Tooltip$stateDecoder = A4(
	_elm_lang$core$Json_Decode$object3,
	_debois$elm_mdl$Material_Tooltip$DOMState,
	_debois$elm_dom$DOM$target(_debois$elm_dom$DOM$boundingClientRect),
	_debois$elm_mdl$Material_Tooltip$sibling(_debois$elm_dom$DOM$offsetWidth),
	_debois$elm_mdl$Material_Tooltip$sibling(_debois$elm_dom$DOM$offsetHeight));
var _debois$elm_mdl$Material_Tooltip$Config = F3(
	function (a, b, c) {
		return {size: a, position: b, container: c};
	});
var _debois$elm_mdl$Material_Tooltip$Leave = {ctor: 'Leave'};
var _debois$elm_mdl$Material_Tooltip$onMouseLeave = F2(
	function (lift, idx) {
		return A2(
			_elm_lang$html$Html_Events$on,
			'mouseleave',
			_elm_lang$core$Json_Decode$succeed(
				A3(_debois$elm_mdl$Material_Tooltip$pack, lift, idx, _debois$elm_mdl$Material_Tooltip$Leave)));
	});
var _debois$elm_mdl$Material_Tooltip$onLeave = function (lift) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseleave',
		_elm_lang$core$Json_Decode$succeed(
			lift(_debois$elm_mdl$Material_Tooltip$Leave)));
};
var _debois$elm_mdl$Material_Tooltip$Enter = function (a) {
	return {ctor: 'Enter', _0: a};
};
var _debois$elm_mdl$Material_Tooltip$onMouseEnter = F2(
	function (lift, idx) {
		return A2(
			_elm_lang$html$Html_Events$on,
			'mouseenter',
			A2(
				_elm_lang$core$Json_Decode$map,
				function (_p4) {
					return A3(
						_debois$elm_mdl$Material_Tooltip$pack,
						lift,
						idx,
						_debois$elm_mdl$Material_Tooltip$Enter(_p4));
				},
				_debois$elm_mdl$Material_Tooltip$stateDecoder));
	});
var _debois$elm_mdl$Material_Tooltip$attach = F2(
	function (lift, index) {
		return _debois$elm_mdl$Material_Options$many(
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options_Internal$attribute(
					A2(_debois$elm_mdl$Material_Tooltip$onMouseEnter, lift, index)),
					_debois$elm_mdl$Material_Options_Internal$attribute(
					A2(_debois$elm_mdl$Material_Tooltip$onMouseLeave, lift, index))
				]));
	});
var _debois$elm_mdl$Material_Tooltip$onEnter = function (lift) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseenter',
		A2(
			_elm_lang$core$Json_Decode$map,
			function (_p5) {
				return lift(
					_debois$elm_mdl$Material_Tooltip$Enter(_p5));
			},
			_debois$elm_mdl$Material_Tooltip$stateDecoder));
};
var _debois$elm_mdl$Material_Tooltip$Large = {ctor: 'Large'};
var _debois$elm_mdl$Material_Tooltip$large = _debois$elm_mdl$Material_Options$set(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{size: _debois$elm_mdl$Material_Tooltip$Large});
	});
var _debois$elm_mdl$Material_Tooltip$Default = {ctor: 'Default'};
var _debois$elm_mdl$Material_Tooltip$Bottom = {ctor: 'Bottom'};
var _debois$elm_mdl$Material_Tooltip$defaultConfig = {size: _debois$elm_mdl$Material_Tooltip$Default, position: _debois$elm_mdl$Material_Tooltip$Bottom, container: _elm_lang$html$Html$div};
var _debois$elm_mdl$Material_Tooltip$view = F4(
	function (lift, model, options, content) {
		var px = function (f) {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(f),
				'px');
		};
		var summary = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Tooltip$defaultConfig, options);
		var config = summary.config;
		var pos = model.isActive ? A2(_debois$elm_mdl$Material_Tooltip$calculatePos, config.position, model.domState) : _debois$elm_mdl$Material_Tooltip$defaultPos;
		return A3(
			_debois$elm_mdl$Material_Options$styled,
			config.container,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$cs('mdl-tooltip'),
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('is-active'),
					model.isActive),
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('mdl-tooltip--large'),
					_elm_lang$core$Native_Utils.eq(config.size, _debois$elm_mdl$Material_Tooltip$Large)),
					A2(
					_debois$elm_mdl$Material_Options$when,
					A2(
						_debois$elm_mdl$Material_Options$css,
						'left',
						px(pos.left)),
					model.isActive),
					A2(
					_debois$elm_mdl$Material_Options$when,
					A2(
						_debois$elm_mdl$Material_Options$css,
						'margin-left',
						px(pos.marginLeft)),
					model.isActive),
					A2(
					_debois$elm_mdl$Material_Options$when,
					A2(
						_debois$elm_mdl$Material_Options$css,
						'top',
						px(pos.top)),
					model.isActive),
					A2(
					_debois$elm_mdl$Material_Options$when,
					A2(
						_debois$elm_mdl$Material_Options$css,
						'margin-top',
						px(pos.marginTop)),
					model.isActive)
				]),
			content);
	});
var _debois$elm_mdl$Material_Tooltip$render = A5(
	_debois$elm_parts$Parts$create,
	_debois$elm_mdl$Material_Tooltip$view,
	_debois$elm_parts$Parts$generalize(_debois$elm_mdl$Material_Tooltip$update),
	function (_) {
		return _.tooltip;
	},
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.update(
				y,
				{tooltip: x});
		}),
	_debois$elm_mdl$Material_Tooltip$defaultModel);
var _debois$elm_mdl$Material_Tooltip$bottom = _debois$elm_mdl$Material_Options$set(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{position: _debois$elm_mdl$Material_Tooltip$Bottom});
	});
var _debois$elm_mdl$Material_Tooltip$Top = {ctor: 'Top'};
var _debois$elm_mdl$Material_Tooltip$top = _debois$elm_mdl$Material_Options$set(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{position: _debois$elm_mdl$Material_Tooltip$Top});
	});
var _debois$elm_mdl$Material_Tooltip$Right = {ctor: 'Right'};
var _debois$elm_mdl$Material_Tooltip$right = _debois$elm_mdl$Material_Options$set(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{position: _debois$elm_mdl$Material_Tooltip$Right});
	});
var _debois$elm_mdl$Material_Tooltip$Left = {ctor: 'Left'};
var _debois$elm_mdl$Material_Tooltip$left = _debois$elm_mdl$Material_Options$set(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{position: _debois$elm_mdl$Material_Tooltip$Left});
	});

var _debois$elm_mdl$Material_Tabs$activeTab = function (k) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{activeTab: k});
		});
};
var _debois$elm_mdl$Material_Tabs$onSelectTab = function (k) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					onSelectTab: _elm_lang$core$Maybe$Just(k)
				});
		});
};
var _debois$elm_mdl$Material_Tabs$ripple = _debois$elm_mdl$Material_Options$set(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{ripple: true});
	});
var _debois$elm_mdl$Material_Tabs$defaultConfig = {ripple: false, onSelectTab: _elm_lang$core$Maybe$Nothing, activeTab: 0};
var _debois$elm_mdl$Material_Tabs$defaultModel = {ripples: _elm_lang$core$Dict$empty};
var _debois$elm_mdl$Material_Tabs$Model = function (a) {
	return {ripples: a};
};
var _debois$elm_mdl$Material_Tabs$Config = F3(
	function (a, b, c) {
		return {ripple: a, onSelectTab: b, activeTab: c};
	});
var _debois$elm_mdl$Material_Tabs$Ripple = F2(
	function (a, b) {
		return {ctor: 'Ripple', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Tabs$update = F2(
	function (action, model) {
		var _p0 = action;
		var _p2 = _p0._0;
		var _p1 = A2(
			_debois$elm_mdl$Material_Ripple$update,
			_p0._1,
			A2(
				_elm_lang$core$Maybe$withDefault,
				_debois$elm_mdl$Material_Ripple$model,
				A2(_elm_lang$core$Dict$get, _p2, model.ripples)));
		var ripple$ = _p1._0;
		var cmd = _p1._1;
		return {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.update(
				model,
				{
					ripples: A3(_elm_lang$core$Dict$insert, _p2, ripple$, model.ripples)
				}),
			_1: A2(
				_elm_lang$core$Platform_Cmd$map,
				_debois$elm_mdl$Material_Tabs$Ripple(_p2),
				cmd)
		};
	});
var _debois$elm_mdl$Material_Tabs$view = F5(
	function (lift, model, options, tabs, tabContent) {
		var wrapContent = A2(
			_elm_lang$html$Html_Keyed$node,
			'div',
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$classList(
					_elm_lang$core$Native_List.fromArray(
						[
							{ctor: '_Tuple2', _0: 'mdl-tab__panel', _1: true},
							{ctor: '_Tuple2', _0: 'is-active', _1: true}
						]))
				]));
		var summary = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Tabs$defaultConfig, options);
		var config = summary.config;
		var unwrapLabel = F2(
			function (tabIdx, _p3) {
				var _p4 = _p3;
				var _p6 = _p4._0._1;
				return A3(
					_debois$elm_mdl$Material_Options$styled,
					_elm_lang$html$Html$a,
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Options$cs('mdl-tabs__tab'),
								A2(
								_debois$elm_mdl$Material_Options$when,
								_debois$elm_mdl$Material_Options$cs('is-active'),
								_elm_lang$core$Native_Utils.eq(tabIdx, config.activeTab)),
								A2(
								_elm_lang$core$Maybe$withDefault,
								_debois$elm_mdl$Material_Options$nop,
								A2(
									_elm_lang$core$Maybe$map,
									function (t) {
										return _debois$elm_mdl$Material_Options_Internal$attribute(
											_elm_lang$html$Html_Events$onClick(
												t(tabIdx)));
									},
									config.onSelectTab))
							]),
						_p4._0._0),
					config.ripple ? _elm_lang$core$List$concat(
						_elm_lang$core$Native_List.fromArray(
							[
								_p6,
								_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_elm_lang$html$Html_App$map,
									function (_p5) {
										return lift(
											A2(_debois$elm_mdl$Material_Tabs$Ripple, tabIdx, _p5));
									},
									A2(
										_debois$elm_mdl$Material_Ripple$view,
										_elm_lang$core$Native_List.fromArray(
											[
												_elm_lang$html$Html_Attributes$classList(
												_elm_lang$core$Native_List.fromArray(
													[
														{ctor: '_Tuple2', _0: 'mdl-tabs__ripple-container', _1: true},
														{ctor: '_Tuple2', _0: 'mdl-tabs__ripple-js-effect', _1: true}
													]))
											]),
										A2(
											_elm_lang$core$Maybe$withDefault,
											_debois$elm_mdl$Material_Ripple$model,
											A2(_elm_lang$core$Dict$get, tabIdx, model.ripples))))
								])
							])) : _p6);
			});
		var links = A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$cs('mdl-tabs__tab-bar')
				]),
			A2(_elm_lang$core$List$indexedMap, unwrapLabel, tabs));
		return A5(
			_debois$elm_mdl$Material_Options$apply,
			summary,
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$cs('mdl-tabs'),
					_debois$elm_mdl$Material_Options$cs('mdl-js-tabs'),
					_debois$elm_mdl$Material_Options$cs('is-upgraded'),
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('mdl-js-ripple-effect'),
					config.ripple),
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('mdl-js-ripple-effect--ignore-events'),
					config.ripple)
				]),
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					links,
					wrapContent(
					_elm_lang$core$Native_List.fromArray(
						[
							{
							ctor: '_Tuple2',
							_0: _elm_lang$core$Basics$toString(config.activeTab),
							_1: A2(
								_elm_lang$html$Html$div,
								_elm_lang$core$Native_List.fromArray(
									[]),
								tabContent)
						}
						]))
				]));
	});
var _debois$elm_mdl$Material_Tabs$render = A5(
	_debois$elm_parts$Parts$create,
	_debois$elm_mdl$Material_Tabs$view,
	_debois$elm_parts$Parts$generalize(_debois$elm_mdl$Material_Tabs$update),
	function (_) {
		return _.tabs;
	},
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.update(
				y,
				{tabs: x});
		}),
	_debois$elm_mdl$Material_Tabs$defaultModel);
var _debois$elm_mdl$Material_Tabs$Label = function (a) {
	return {ctor: 'Label', _0: a};
};
var _debois$elm_mdl$Material_Tabs$label = F2(
	function (p, c) {
		return _debois$elm_mdl$Material_Tabs$Label(
			{ctor: '_Tuple2', _0: p, _1: c});
	});
var _debois$elm_mdl$Material_Tabs$textLabel = F2(
	function (p, c) {
		return A2(
			_debois$elm_mdl$Material_Tabs$label,
			p,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text(c)
				]));
	});

var _debois$elm_mdl$Material_Select_Item$ripple = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{ripple: true});
	});
var _debois$elm_mdl$Material_Select_Item$divider = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{divider: true});
	});
var _debois$elm_mdl$Material_Select_Item$disabled = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{enabled: false});
	});
var _debois$elm_mdl$Material_Select_Item$onSelect = function (msg) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					onSelect: _elm_lang$core$Maybe$Just(msg)
				});
		});
};
var _debois$elm_mdl$Material_Select_Item$defaultConfig = {onSelect: _elm_lang$core$Maybe$Nothing, enabled: true, divider: false, ripple: false};
var _debois$elm_mdl$Material_Select_Item$Config = F4(
	function (a, b, c, d) {
		return {onSelect: a, enabled: b, divider: c, ripple: d};
	});

var _debois$elm_mdl$Material_Select$defaultRectangle = {top: 0, left: 0, width: 0, height: 0};
var _debois$elm_mdl$Material_Select$defaultGeometry = {
	input: _debois$elm_mdl$Material_Select$defaultRectangle,
	menu: _debois$elm_mdl$Material_Select$defaultRectangle,
	items: _elm_lang$core$Native_List.fromArray(
		[])
};
var _debois$elm_mdl$Material_Select$toPx = function (_p0) {
	return A3(
		_elm_lang$core$Basics$flip,
		F2(
			function (x, y) {
				return A2(_elm_lang$core$Basics_ops['++'], x, y);
			}),
		'px',
		_elm_lang$core$Basics$toString(_p0));
};
var _debois$elm_mdl$Material_Select$rect = F4(
	function (x, y, w, h) {
		return function (coords) {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'rect(',
				A2(_elm_lang$core$Basics_ops['++'], coords, ')'));
		}(
			A2(
				_elm_lang$core$String$join,
				' ',
				A2(
					_elm_lang$core$List$map,
					_debois$elm_mdl$Material_Select$toPx,
					_elm_lang$core$Native_List.fromArray(
						[x, y, w, h]))));
	});
var _debois$elm_mdl$Material_Select$clip = F2(
	function (model, g) {
		return A2(
			_debois$elm_mdl$Material_Options$css,
			'clip',
			model.open ? A4(_debois$elm_mdl$Material_Select$rect, 0, g.width, g.height, 0) : A4(_debois$elm_mdl$Material_Select$rect, 0, g.width, 0, g.width));
	});
var _debois$elm_mdl$Material_Select$containerGeometry = function (menu) {
	return {top: menu.top, left: menu.left, width: menu.width, height: menu.height};
};
var _debois$elm_mdl$Material_Select$menuGeometry = function (menu) {
	return {top: menu.top, left: menu.left, width: menu.width, height: menu.height};
};
var _debois$elm_mdl$Material_Select$delay = F2(
	function (index, numItems) {
		return A2(
			_debois$elm_mdl$Material_Options$css,
			'transition-delay',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(
					(0.24 * _elm_lang$core$Basics$toFloat(index)) / _elm_lang$core$Basics$toFloat(numItems)),
				's'));
	});
var _debois$elm_mdl$Material_Select$item = F2(
	function (v0, v1) {
		return {ctor: '_Tuple2', _0: v0, _1: v1};
	});
var _debois$elm_mdl$Material_Select$on = F2(
	function (event, decoder) {
		return _debois$elm_mdl$Material_Options$set(
			function (config) {
				return _elm_lang$core$Native_Utils.update(
					config,
					{
						listeners: A2(
							_elm_lang$core$Basics_ops['++'],
							config.listeners,
							_elm_lang$core$Native_List.fromArray(
								[
									function (_p1) {
									return A2(
										_elm_lang$html$Html_Events$on,
										event,
										decoder(_p1));
								}
								]))
					});
			});
	});
var _debois$elm_mdl$Material_Select$onFocus = function (f) {
	return A2(
		_debois$elm_mdl$Material_Select$on,
		'focusin',
		function (_p2) {
			return _elm_lang$core$Json_Decode$succeed(
				A2(_elm_lang$core$Basics$always, f, _p2));
		});
};
var _debois$elm_mdl$Material_Select$onBlur = function (f) {
	return A2(
		_debois$elm_mdl$Material_Select$on,
		'focusout',
		function (_p3) {
			return _elm_lang$core$Json_Decode$succeed(
				f(_p3));
		});
};
var _debois$elm_mdl$Material_Select$autofocus = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{autofocus: true});
	});
var _debois$elm_mdl$Material_Select$disabled = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{disabled: true});
	});
var _debois$elm_mdl$Material_Select$error = function (str) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					error: _elm_lang$core$Maybe$Just(str)
				});
		});
};
var _debois$elm_mdl$Material_Select$floatingLabel = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{labelFloat: true});
	});
var _debois$elm_mdl$Material_Select$label = function (str) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					labelText: _elm_lang$core$Maybe$Just(str)
				});
		});
};
var _debois$elm_mdl$Material_Select$ripple = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{ripple: true});
	});
var _debois$elm_mdl$Material_Select$value = function (v) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{value: v});
		});
};
var _debois$elm_mdl$Material_Select$index = function (v) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					index: _elm_lang$core$Maybe$Just(v)
				});
		});
};
var _debois$elm_mdl$Material_Select$defaultConfig = {
	ripple: false,
	labelText: _elm_lang$core$Maybe$Nothing,
	labelFloat: false,
	error: _elm_lang$core$Maybe$Nothing,
	disabled: false,
	autofocus: false,
	inner: _elm_lang$core$Native_List.fromArray(
		[]),
	listeners: _elm_lang$core$Native_List.fromArray(
		[]),
	index: _elm_lang$core$Maybe$Nothing,
	value: ''
};
var _debois$elm_mdl$Material_Select$defaultModel = {ripples: _elm_lang$core$Dict$empty, open: false, geometry: _elm_lang$core$Maybe$Nothing, index: _elm_lang$core$Maybe$Nothing};
var _debois$elm_mdl$Material_Select$Model = F4(
	function (a, b, c, d) {
		return {ripples: a, open: b, geometry: c, index: d};
	});
var _debois$elm_mdl$Material_Select$Config = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return {ripple: a, labelText: b, labelFloat: c, error: d, disabled: e, autofocus: f, inner: g, listeners: h, index: i, value: j};
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
var _debois$elm_mdl$Material_Select$Geometry = F3(
	function (a, b, c) {
		return {input: a, menu: b, items: c};
	});
var _debois$elm_mdl$Material_Select$decodeGeometryAsTrigger = A4(
	_elm_lang$core$Json_Decode$object3,
	_debois$elm_mdl$Material_Select$Geometry,
	_debois$elm_dom$DOM$target(
		_debois$elm_dom$DOM$nextSibling(_debois$elm_dom$DOM$boundingClientRect)),
	_debois$elm_dom$DOM$target(
		_debois$elm_dom$DOM$nextSibling(
			_debois$elm_dom$DOM$nextSibling(
				A2(_debois$elm_dom$DOM$childNode, 1, _debois$elm_dom$DOM$boundingClientRect)))),
	_elm_lang$core$Json_Decode$succeed(
		_elm_lang$core$Native_List.fromArray(
			[])));
var _debois$elm_mdl$Material_Select$decodeGeometryAsInput = A4(
	_elm_lang$core$Json_Decode$object3,
	_debois$elm_mdl$Material_Select$Geometry,
	_debois$elm_dom$DOM$target(_debois$elm_dom$DOM$boundingClientRect),
	_debois$elm_dom$DOM$target(
		_debois$elm_dom$DOM$nextSibling(
			A2(_debois$elm_dom$DOM$childNode, 1, _debois$elm_dom$DOM$boundingClientRect))),
	_elm_lang$core$Json_Decode$succeed(
		_elm_lang$core$Native_List.fromArray(
			[])));
var _debois$elm_mdl$Material_Select$Key = F3(
	function (a, b, c) {
		return {ctor: 'Key', _0: a, _1: b, _2: c};
	});
var _debois$elm_mdl$Material_Select$Input = function (a) {
	return {ctor: 'Input', _0: a};
};
var _debois$elm_mdl$Material_Select$Ripple = F2(
	function (a, b) {
		return {ctor: 'Ripple', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Select$Click = function (a) {
	return {ctor: 'Click', _0: a};
};
var _debois$elm_mdl$Material_Select$subscriptions = function (model) {
	return model.open ? _elm_lang$mouse$Mouse$clicks(_debois$elm_mdl$Material_Select$Click) : _elm_lang$core$Platform_Sub$none;
};
var _debois$elm_mdl$Material_Select$Close = {ctor: 'Close'};
var _debois$elm_mdl$Material_Select$Select = F2(
	function (a, b) {
		return {ctor: 'Select', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Select$update = F3(
	function (fwd, msg, model) {
		update:
		while (true) {
			var _p4 = msg;
			switch (_p4.ctor) {
				case 'Input':
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						_elm_lang$core$Native_List.fromArray(
							[]));
				case 'Open':
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						_elm_lang$core$Native_Utils.update(
							model,
							{
								open: true,
								geometry: _elm_lang$core$Maybe$Just(_p4._0),
								index: _elm_lang$core$Maybe$Nothing
							}),
						_elm_lang$core$Native_List.fromArray(
							[]));
				case 'Close':
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						_elm_lang$core$Native_Utils.update(
							model,
							{open: false, geometry: _elm_lang$core$Maybe$Nothing, index: _elm_lang$core$Maybe$Nothing}),
						_elm_lang$core$Native_List.fromArray(
							[]));
				case 'Select':
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						_elm_lang$core$Native_Utils.update(
							model,
							{
								index: _elm_lang$core$Maybe$Just(_p4._0)
							}),
						A2(
							_elm_lang$core$List$filterMap,
							_elm_lang$core$Basics$identity,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$core$Maybe$Just(
									A2(
										_debois$elm_mdl$Material_Helpers$delay,
										150,
										fwd(_debois$elm_mdl$Material_Select$Close))),
									A2(_elm_lang$core$Maybe$map, _debois$elm_mdl$Material_Helpers$cmd, _p4._1)
								])));
				case 'Ripple':
					var _p7 = _p4._0;
					var _p5 = A2(
						_debois$elm_mdl$Material_Ripple$update,
						_p4._1,
						A2(
							_elm_lang$core$Maybe$withDefault,
							_debois$elm_mdl$Material_Ripple$model,
							A2(_elm_lang$core$Dict$get, _p7, model.ripples)));
					var model$ = _p5._0;
					var cmd = _p5._1;
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						_elm_lang$core$Native_Utils.update(
							model,
							{
								ripples: A3(_elm_lang$core$Dict$insert, _p7, model$, model.ripples)
							}),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_elm_lang$core$Platform_Cmd$map,
								function (_p6) {
									return fwd(
										A2(_debois$elm_mdl$Material_Select$Ripple, _p7, _p6));
								},
								cmd)
							]));
				case 'Click':
					var _p16 = _p4._0;
					var g = A2(_elm_lang$core$Maybe$withDefault, _debois$elm_mdl$Material_Select$defaultGeometry, model.geometry);
					var container = _debois$elm_mdl$Material_Select$containerGeometry(g.menu);
					var inside = F2(
						function (_p9, _p8) {
							var _p10 = _p9;
							var _p15 = _p10.y;
							var _p14 = _p10.x;
							var _p11 = _p8;
							var _p13 = _p11.top;
							var _p12 = _p11.left;
							return (_elm_lang$core$Native_Utils.cmp(
								_p12,
								_elm_lang$core$Basics$toFloat(_p14)) < 1) && ((_elm_lang$core$Native_Utils.cmp(
								_elm_lang$core$Basics$toFloat(_p14),
								_p12 + _p11.width) < 1) && ((_elm_lang$core$Native_Utils.cmp(
								_p13,
								_elm_lang$core$Basics$toFloat(_p15)) < 1) && (_elm_lang$core$Native_Utils.cmp(
								_elm_lang$core$Basics$toFloat(_p15),
								_p13 + _p11.height) < 1)));
						});
					if (model.open && _elm_lang$core$Basics$not(
						A2(inside, _p16, container) || A2(inside, _p16, g.input))) {
						var _v3 = fwd,
							_v4 = _debois$elm_mdl$Material_Select$Close,
							_v5 = model;
						fwd = _v3;
						msg = _v4;
						model = _v5;
						continue update;
					} else {
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							model,
							_elm_lang$core$Native_List.fromArray(
								[]));
					}
				default:
					var _p26 = _p4._1;
					var _p25 = _p4._0;
					var _p17 = _p4._2;
					switch (_p17) {
						case 13:
							var index = (!_elm_lang$core$Native_Utils.eq(model.index, _elm_lang$core$Maybe$Nothing)) ? model.index : _p25;
							var _p18 = index;
							if (_p18.ctor === 'Just') {
								var _p20 = _p18._0;
								var cmd = A3(
									_elm_lang$core$Basics$flip,
									_elm_lang$core$Maybe$andThen,
									function (_p19) {
										return function (_) {
											return _.onSelect;
										}(
											function (_) {
												return _.config;
											}(_p19));
									},
									_elm_lang$core$List$head(
										A2(_elm_lang$core$List$drop, _p20, _p26)));
								var _v8 = fwd,
									_v9 = A2(_debois$elm_mdl$Material_Select$Select, _p20, cmd),
									_v10 = model;
								fwd = _v8;
								msg = _v9;
								model = _v10;
								continue update;
							} else {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									model,
									_elm_lang$core$Native_List.fromArray(
										[]));
							}
						case 32:
							var _v11 = fwd,
								_v12 = A3(_debois$elm_mdl$Material_Select$Key, _p25, _p26, 13),
								_v13 = model;
							fwd = _v11;
							msg = _v12;
							model = _v13;
							continue update;
						case 9:
							var _v14 = fwd,
								_v15 = _debois$elm_mdl$Material_Select$Close,
								_v16 = model;
							fwd = _v14;
							msg = _v15;
							model = _v16;
							continue update;
						case 40:
							var numItems = _elm_lang$core$List$length(_p26);
							var items = A2(
								_elm_lang$core$List$indexedMap,
								F2(
									function (v0, v1) {
										return {ctor: '_Tuple2', _0: v0, _1: v1};
									}),
								_p26);
							var index = A2(
								_elm_lang$core$Maybe$withDefault,
								-1,
								(!_elm_lang$core$Native_Utils.eq(model.index, _elm_lang$core$Maybe$Nothing)) ? model.index : _p25);
							return A3(
								_elm_lang$core$Basics$flip,
								F2(
									function (x, y) {
										return A2(_elm_lang$core$Platform_Cmd_ops['!'], x, y);
									}),
								_elm_lang$core$Native_List.fromArray(
									[]),
								A2(
									_elm_lang$core$Maybe$withDefault,
									model,
									A2(
										_elm_lang$core$Maybe$map,
										function (_p21) {
											return function (index$) {
												return _elm_lang$core$Native_Utils.update(
													model,
													{
														index: _elm_lang$core$Maybe$Just(index$)
													});
											}(
												_elm_lang$core$Basics$fst(_p21));
										},
										_elm_lang$core$List$head(
											A2(
												_elm_lang$core$List$filter,
												function (_p22) {
													return function (_) {
														return _.enabled;
													}(
														function (_) {
															return _.config;
														}(
															_elm_lang$core$Basics$snd(_p22)));
												},
												A2(
													_elm_lang$core$List$drop,
													1 + index,
													A2(_elm_lang$core$Basics_ops['++'], items, items)))))));
						case 38:
							var numItems = _elm_lang$core$List$length(_p26);
							var items = A2(
								_elm_lang$core$List$indexedMap,
								F2(
									function (v0, v1) {
										return {ctor: '_Tuple2', _0: v0, _1: v1};
									}),
								_p26);
							var index = A2(
								_elm_lang$core$Maybe$withDefault,
								0,
								(!_elm_lang$core$Native_Utils.eq(model.index, _elm_lang$core$Maybe$Nothing)) ? model.index : _p25);
							return _debois$elm_mdl$Material_Helpers$pure(
								A2(
									_elm_lang$core$Maybe$withDefault,
									model,
									A2(
										_elm_lang$core$Maybe$map,
										function (_p23) {
											return function (index$) {
												return _elm_lang$core$Native_Utils.update(
													model,
													{
														index: _elm_lang$core$Maybe$Just(index$)
													});
											}(
												_elm_lang$core$Basics$fst(_p23));
										},
										_elm_lang$core$List$head(
											A2(
												_elm_lang$core$List$filter,
												function (_p24) {
													return function (_) {
														return _.enabled;
													}(
														function (_) {
															return _.config;
														}(
															_elm_lang$core$Basics$snd(_p24)));
												},
												A2(
													_elm_lang$core$List$drop,
													numItems - index,
													_elm_lang$core$List$reverse(
														A2(_elm_lang$core$Basics_ops['++'], items, items))))))));
						default:
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								model,
								_elm_lang$core$Native_List.fromArray(
									[]));
					}
			}
		}
	});
var _debois$elm_mdl$Material_Select$update$ = F3(
	function (fwd, msg, model) {
		return _elm_lang$core$Maybe$Just(
			A3(_debois$elm_mdl$Material_Select$update, fwd, msg, model));
	});
var _debois$elm_mdl$Material_Select$pack = A4(
	_debois$elm_parts$Parts$pack,
	_debois$elm_mdl$Material_Select$update$,
	function (_) {
		return _.select;
	},
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.update(
				y,
				{select: x});
		}),
	_debois$elm_mdl$Material_Select$defaultModel);
var _debois$elm_mdl$Material_Select$subs = function (lift) {
	return function (_p27) {
		return _elm_lang$core$Platform_Sub$batch(
			A3(
				_elm_lang$core$Dict$foldl,
				F3(
					function (idx, model, ss) {
						return A2(
							_elm_lang$core$List_ops['::'],
							A2(
								_elm_lang$core$Platform_Sub$map,
								A2(_debois$elm_mdl$Material_Select$pack, lift, idx),
								_debois$elm_mdl$Material_Select$subscriptions(model)),
							ss);
					}),
				_elm_lang$core$Native_List.fromArray(
					[]),
				function (_) {
					return _.select;
				}(_p27)));
	};
};
var _debois$elm_mdl$Material_Select$close = F2(
	function (lift, container) {
		return _elm_lang$core$Dict$values(
			A2(
				_elm_lang$core$Dict$map,
				F2(
					function (idx, model) {
						return A3(_debois$elm_mdl$Material_Select$pack, lift, idx, _debois$elm_mdl$Material_Select$Close);
					}),
				container.select));
	});
var _debois$elm_mdl$Material_Select$view1 = F6(
	function (lift, top, topConfig, numItems, index, _p28) {
		var _p29 = _p28;
		var _p32 = _p29._1;
		var _p30 = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Select_Item$defaultConfig, _p29._0);
		var summary = _p30;
		var config = _p30.config;
		var defaultIndex = (!_elm_lang$core$Native_Utils.eq(top.index, _elm_lang$core$Maybe$Nothing)) ? top.index : topConfig.index;
		var fwdRipple = function (_p31) {
			return lift(
				A2(_debois$elm_mdl$Material_Select$Ripple, index, _p31));
		};
		var ripple = A2(
			_elm_lang$core$Maybe$withDefault,
			_debois$elm_mdl$Material_Ripple$model,
			A2(_elm_lang$core$Dict$get, index, top.ripples));
		var canSelect = config.enabled && (!_elm_lang$core$Native_Utils.eq(config.onSelect, _elm_lang$core$Maybe$Nothing));
		var hasRipple = config.ripple && canSelect;
		return A2(
			F2(
				function (v0, v1) {
					return {ctor: '_Tuple2', _0: v0, _1: v1};
				}),
			_elm_lang$core$Basics$toString(index),
			A5(
				_debois$elm_mdl$Material_Options$apply,
				summary,
				_elm_lang$html$Html$li,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Options$cs('mdl-menu__item'),
						A2(
						_debois$elm_mdl$Material_Options$when,
						_debois$elm_mdl$Material_Options$cs('mdl-js-ripple-effect'),
						config.ripple),
						A2(
						_debois$elm_mdl$Material_Options$when,
						_debois$elm_mdl$Material_Options$cs('mdl-menu__item--full-bleed-divider'),
						summary.config.divider),
						A2(
						_debois$elm_mdl$Material_Options$when,
						_debois$elm_mdl$Material_Options$cs('mdl-menu__item--selected'),
						_elm_lang$core$Native_Utils.eq(
							defaultIndex,
							_elm_lang$core$Maybe$Just(index))),
						A2(
						_debois$elm_mdl$Material_Options$when,
						A2(_debois$elm_mdl$Material_Select$delay, index, numItems),
						top.open)
					]),
				A2(
					_elm_lang$core$Basics_ops['++'],
					A2(
						_elm_lang$core$List$filterMap,
						_elm_lang$core$Basics$identity,
						_elm_lang$core$Native_List.fromArray(
							[
								canSelect ? _elm_lang$core$Maybe$Just(
								_elm_lang$html$Html_Events$onClick(
									lift(
										A2(_debois$elm_mdl$Material_Select$Select, index, summary.config.onSelect)))) : _elm_lang$core$Maybe$Nothing,
								_elm_lang$core$Basics$not(summary.config.enabled) ? _elm_lang$core$Maybe$Just(
								A2(_elm_lang$html$Html_Attributes$attribute, 'disabled', 'disabled')) : _elm_lang$core$Maybe$Nothing,
								_elm_lang$core$Maybe$Just(
								A2(
									_elm_lang$html$Html_Attributes$property,
									'tabIndex',
									_elm_lang$core$Json_Encode$int(-1)))
							])),
					hasRipple ? _elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Ripple$downOn$, fwdRipple, 'mousedown'),
							A2(_debois$elm_mdl$Material_Ripple$downOn$, fwdRipple, 'touchstart'),
							A2(_debois$elm_mdl$Material_Ripple$upOn$, fwdRipple, 'mouseup'),
							A2(_debois$elm_mdl$Material_Ripple$upOn$, fwdRipple, 'mouseleave'),
							A2(_debois$elm_mdl$Material_Ripple$upOn$, fwdRipple, 'touchend'),
							A2(_debois$elm_mdl$Material_Ripple$upOn$, fwdRipple, 'blur')
						]) : _elm_lang$core$Native_List.fromArray(
						[])),
				hasRipple ? A2(
					F2(
						function (x, y) {
							return A2(_elm_lang$core$Basics_ops['++'], x, y);
						}),
					_p32,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$html$Html_App$map,
							fwdRipple,
							A2(
								_debois$elm_mdl$Material_Ripple$view$,
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html_Attributes$class('mdl-menu__item-ripple-container')
									]),
								ripple))
						])) : _p32));
	});
var _debois$elm_mdl$Material_Select$Open = function (a) {
	return {ctor: 'Open', _0: a};
};
var _debois$elm_mdl$Material_Select$view = F4(
	function (lift, model, properties, items) {
		var itemSummaries = A2(
			_elm_lang$core$List$map,
			function (_p33) {
				return A2(
					_debois$elm_mdl$Material_Options$collect,
					_debois$elm_mdl$Material_Select_Item$defaultConfig,
					_elm_lang$core$Basics$fst(_p33));
			},
			items);
		var ripple = A2(
			_elm_lang$core$Maybe$withDefault,
			_debois$elm_mdl$Material_Ripple$model,
			A2(_elm_lang$core$Dict$get, -1, model.ripples));
		var fwdRipple = function (_p34) {
			return lift(
				A2(_debois$elm_mdl$Material_Select$Ripple, -1, _p34));
		};
		var numItems = _elm_lang$core$List$length(items);
		var g = A2(_elm_lang$core$Maybe$withDefault, _debois$elm_mdl$Material_Select$defaultGeometry, model.geometry);
		var container = _debois$elm_mdl$Material_Select$containerGeometry(g.menu);
		var menu = _debois$elm_mdl$Material_Select$menuGeometry(g.menu);
		var _p35 = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Select$defaultConfig, properties);
		var summary = _p35;
		var config = _p35.config;
		var hasRipple = config.ripple;
		var defaultIndex = (!_elm_lang$core$Native_Utils.eq(model.index, _elm_lang$core$Maybe$Nothing)) ? model.index : config.index;
		return A5(
			_debois$elm_mdl$Material_Options$apply,
			summary,
			_elm_lang$html$Html$div,
			A2(
				_elm_lang$core$List_ops['::'],
				_debois$elm_mdl$Material_Options$cs('mdl-select'),
				A2(
					_elm_lang$core$List_ops['::'],
					A2(
						_debois$elm_mdl$Material_Options$when,
						_debois$elm_mdl$Material_Options$cs('mdl-select--floating-label'),
						config.labelFloat),
					A2(
						_elm_lang$core$List_ops['::'],
						A2(
							_debois$elm_mdl$Material_Options$when,
							_debois$elm_mdl$Material_Options$cs('mdl-js-ripple-effect'),
							config.ripple),
						A2(
							_elm_lang$core$List_ops['::'],
							A2(
								_debois$elm_mdl$Material_Options$when,
								_debois$elm_mdl$Material_Options$cs('is-invalid'),
								!_elm_lang$core$Native_Utils.eq(config.error, _elm_lang$core$Maybe$Nothing)),
							A2(
								_elm_lang$core$List_ops['::'],
								A2(
									_debois$elm_mdl$Material_Options$when,
									_debois$elm_mdl$Material_Options$cs('is-dirty'),
									!_elm_lang$core$Native_Utils.eq(config.value, '')),
								A2(
									_elm_lang$core$List_ops['::'],
									A2(
										_debois$elm_mdl$Material_Options$when,
										_debois$elm_mdl$Material_Options$cs('is-focused'),
										model.open),
									A2(
										_elm_lang$core$List_ops['::'],
										A2(
											_debois$elm_mdl$Material_Options$when,
											_debois$elm_mdl$Material_Options$cs('is-disabled'),
											config.disabled),
										properties))))))),
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					A4(
					_debois$elm_mdl$Material_Options$styled$,
					_elm_lang$html$Html$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Options$cs('mdl-select__trigger')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Ripple$downOn$, fwdRipple, 'mousedown'),
							A2(_debois$elm_mdl$Material_Ripple$downOn$, fwdRipple, 'touchstart'),
							A2(_debois$elm_mdl$Material_Ripple$upOn$, fwdRipple, 'mouseup'),
							A2(_debois$elm_mdl$Material_Ripple$upOn$, fwdRipple, 'mouseleave'),
							A2(_debois$elm_mdl$Material_Ripple$upOn$, fwdRipple, 'touchend'),
							A2(_debois$elm_mdl$Material_Ripple$upOn$, fwdRipple, 'blur'),
							A2(_elm_lang$html$Html_Attributes$attribute, 'onclick', 'this.nextSibling.focus()')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$html$Html_App$map,
							fwdRipple,
							A2(
								_debois$elm_mdl$Material_Ripple$view$,
								_elm_lang$core$Native_List.fromArray(
									[]),
								ripple))
						])),
					A4(
					_debois$elm_mdl$Material_Options$styled$,
					_elm_lang$html$Html$input,
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Options$cs('mdl-select__input'),
							A2(_debois$elm_mdl$Material_Options$css, 'outline', 'none'),
							A2(
							_debois$elm_mdl$Material_Options$when,
							_debois$elm_mdl$Material_Options_Internal$attribute(
								A2(
									_elm_lang$html$Html_Events$on,
									'keydown',
									A2(
										_elm_lang$core$Json_Decode$map,
										function (_p36) {
											return lift(
												A3(_debois$elm_mdl$Material_Select$Key, defaultIndex, itemSummaries, _p36));
										},
										_elm_lang$html$Html_Events$keyCode))),
							model.open),
							A2(
							_debois$elm_mdl$Material_Options$when,
							_debois$elm_mdl$Material_Options_Internal$attribute(
								A2(
									_elm_lang$html$Html_Events$on,
									'focus',
									A2(
										_elm_lang$core$Json_Decode$map,
										function (_p37) {
											return lift(
												_debois$elm_mdl$Material_Select$Open(_p37));
										},
										_debois$elm_mdl$Material_Select$decodeGeometryAsInput))),
							_elm_lang$core$Basics$not(model.open)),
							_debois$elm_mdl$Material_Options_Internal$attribute(
							A2(
								_elm_lang$html$Html_Events$on,
								'input',
								A2(
									_elm_lang$core$Json_Decode$map,
									function (_p38) {
										return lift(
											_debois$elm_mdl$Material_Select$Input(_p38));
									},
									_elm_lang$html$Html_Events$targetValue))),
							_debois$elm_mdl$Material_Options$many(config.inner)
						]),
					_elm_lang$core$List$concat(
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html_Attributes$disabled(config.disabled),
									_elm_lang$html$Html_Attributes$autofocus(config.autofocus),
									_elm_lang$html$Html_Attributes$type$('text'),
									_elm_lang$html$Html_Attributes$value(config.value),
									A2(_elm_lang$html$Html_Attributes$attribute, 'onkeydown', 'if ((event.keyCode == 13) || (event.keyCode == 32)) {this.blur();}')
								]),
								A2(
								_elm_lang$core$List$map,
								F2(
									function (x, y) {
										return y(x);
									})(defaultIndex),
								config.listeners)
							])),
					_elm_lang$core$Native_List.fromArray(
						[])),
					A3(
					_debois$elm_mdl$Material_Options$styled,
					_elm_lang$html$Html$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Options$cs('mdl-menu__container'),
							_debois$elm_mdl$Material_Options$cs('is-upgraded'),
							A2(
							_debois$elm_mdl$Material_Options$when,
							_debois$elm_mdl$Material_Options$cs('is-visible'),
							model.open),
							A2(
							_debois$elm_mdl$Material_Options$when,
							A2(
								_debois$elm_mdl$Material_Options$css,
								'width',
								_debois$elm_mdl$Material_Select$toPx(container.width)),
							!_elm_lang$core$Native_Utils.eq(model.geometry, _elm_lang$core$Maybe$Nothing)),
							A2(
							_debois$elm_mdl$Material_Options$when,
							A2(
								_debois$elm_mdl$Material_Options$css,
								'height',
								_debois$elm_mdl$Material_Select$toPx(container.height)),
							!_elm_lang$core$Native_Utils.eq(model.geometry, _elm_lang$core$Maybe$Nothing))
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A3(
							_debois$elm_mdl$Material_Options$styled,
							_elm_lang$html$Html$div,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Options$cs('mdl-menu__outline'),
									A2(
									_debois$elm_mdl$Material_Options$when,
									A2(
										_debois$elm_mdl$Material_Options$css,
										'width',
										_debois$elm_mdl$Material_Select$toPx(container.width)),
									!_elm_lang$core$Native_Utils.eq(model.geometry, _elm_lang$core$Maybe$Nothing)),
									A2(
									_debois$elm_mdl$Material_Options$when,
									A2(
										_debois$elm_mdl$Material_Options$css,
										'height',
										_debois$elm_mdl$Material_Select$toPx(container.height)),
									!_elm_lang$core$Native_Utils.eq(model.geometry, _elm_lang$core$Maybe$Nothing))
								]),
							_elm_lang$core$Native_List.fromArray(
								[])),
							A4(
							_debois$elm_mdl$Material_Options$styled$,
							_elm_lang$html$Html_Keyed$ul,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Options$cs('mdl-menu'),
									_debois$elm_mdl$Material_Options$cs('mdl-js-menu'),
									A2(
									_debois$elm_mdl$Material_Options$when,
									A2(_debois$elm_mdl$Material_Select$clip, model, container),
									!_elm_lang$core$Native_Utils.eq(model.geometry, _elm_lang$core$Maybe$Nothing)),
									A2(
									_debois$elm_mdl$Material_Options$when,
									A2(
										_debois$elm_mdl$Material_Options$css,
										'width',
										_debois$elm_mdl$Material_Select$toPx(menu.width)),
									!_elm_lang$core$Native_Utils.eq(model.geometry, _elm_lang$core$Maybe$Nothing)),
									A2(
									_debois$elm_mdl$Material_Options$when,
									A2(
										_debois$elm_mdl$Material_Options$css,
										'height',
										_debois$elm_mdl$Material_Select$toPx(menu.height)),
									!_elm_lang$core$Native_Utils.eq(model.geometry, _elm_lang$core$Maybe$Nothing)),
									A2(_debois$elm_mdl$Material_Options$css, 'overflow-y', 'auto'),
									A2(_debois$elm_mdl$Material_Options$css, 'overflow-x', 'hidden')
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_elm_lang$html$Html_Attributes$property,
									'tabIndex',
									_elm_lang$core$Json_Encode$int(-1))
								]),
							A2(
								_elm_lang$core$List$indexedMap,
								A4(_debois$elm_mdl$Material_Select$view1, lift, model, config, numItems),
								items))
						])),
					A2(
					_elm_lang$html$Html$label,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('mdl-select__label')
						]),
					function () {
						var _p39 = config.labelText;
						if (_p39.ctor === 'Just') {
							return _elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text(_p39._0)
								]);
						} else {
							return _elm_lang$core$Native_List.fromArray(
								[]);
						}
					}()),
					A2(
					_elm_lang$core$Maybe$withDefault,
					A2(
						_elm_lang$html$Html$div,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_elm_lang$core$Native_List.fromArray(
							[])),
					A2(
						_elm_lang$core$Maybe$map,
						function (e) {
							return A2(
								_elm_lang$html$Html$span,
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html_Attributes$class('mdl-select__error')
									]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text(e)
									]));
						},
						config.error)),
					A2(
					_elm_lang$html$Html_App$map,
					lift,
					A2(
						_debois$elm_mdl$Material_Icon$view,
						'expand_more',
						_elm_lang$core$Native_List.fromArray(
							[])))
				]));
	});
var _debois$elm_mdl$Material_Select$render = A5(
	_debois$elm_parts$Parts$create,
	_debois$elm_mdl$Material_Select$view,
	_debois$elm_mdl$Material_Select$update$,
	function (_) {
		return _.select;
	},
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.update(
				y,
				{select: x});
		}),
	_debois$elm_mdl$Material_Select$defaultModel);

var _debois$elm_mdl$Material$init = function (lift) {
	return _debois$elm_mdl$Material_Layout$sub0(lift);
};
var _debois$elm_mdl$Material$subscriptions = F2(
	function (lift, model) {
		return _elm_lang$core$Platform_Sub$batch(
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_debois$elm_mdl$Material_Layout$subs, lift, model.mdl),
					A2(_debois$elm_mdl$Material_Menu$subs, lift, model.mdl),
					A2(_debois$elm_mdl$Material_Select$subs, lift, model.mdl)
				]));
	});
var _debois$elm_mdl$Material$update = F2(
	function (msg, model) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			{ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none},
			A2(
				_elm_lang$core$Maybe$map,
				_debois$elm_mdl$Material_Helpers$map1st(
					function (mdl) {
						return _elm_lang$core$Native_Utils.update(
							model,
							{mdl: mdl});
					}),
				A2(_debois$elm_parts$Parts$update$, msg, model.mdl)));
	});
var _debois$elm_mdl$Material$model = {button: _elm_lang$core$Dict$empty, textfield: _elm_lang$core$Dict$empty, menu: _elm_lang$core$Dict$empty, snackbar: _elm_lang$core$Maybe$Nothing, layout: _debois$elm_mdl$Material_Layout$defaultModel, toggles: _elm_lang$core$Dict$empty, tooltip: _elm_lang$core$Dict$empty, tabs: _elm_lang$core$Dict$empty, select: _elm_lang$core$Dict$empty};
var _debois$elm_mdl$Material$Model = F9(
	function (a, b, c, d, e, f, g, h, i) {
		return {button: a, textfield: b, menu: c, snackbar: d, layout: e, toggles: f, tooltip: g, tabs: h, select: i};
	});

var _evancz$elm_markdown$Native_Markdown = function() {


// VIRTUAL-DOM WIDGETS

function toHtml(options, factList, rawMarkdown)
{
	var model = {
		options: options,
		markdown: rawMarkdown
	};
	return _elm_lang$virtual_dom$Native_VirtualDom.custom(factList, model, implementation);
}


// WIDGET IMPLEMENTATION

var implementation = {
	render: render,
	diff: diff
};

function render(model)
{
	var html = marked(model.markdown, formatOptions(model.options));
	var div = document.createElement('div');
	div.innerHTML = html;
	return div;
}

function diff(a, b)
{
	
	if (a.model.markdown === b.model.markdown && a.model.options === b.model.options)
	{
		return null;
	}

	return {
		applyPatch: applyPatch,
		data: marked(b.model.markdown, formatOptions(b.model.options))
	};
}

function applyPatch(domNode, data)
{
	domNode.innerHTML = data;
	return domNode;
}


// ACTUAL MARKDOWN PARSER

var marked = function() {
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
}();


// FORMAT OPTIONS FOR MARKED IMPLEMENTATION

function formatOptions(options)
{
	function toHighlight(code, lang)
	{
		if (!lang && options.defaultHighlighting.ctor === 'Just')
		{
			lang = options.defaultHighlighting._0;
		}

		if (typeof hljs !== 'undefined' && lang && hljs.listLanguages().indexOf(lang) >= 0)
		{
			return hljs.highlight(lang, code, true).value;
		}

		return code;
	}

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

	return {
		highlight: toHighlight,
		gfm: false,
		tables: false,
		breaks: false,
		sanitize: options.sanitize,
		smartypants: options.smartypants
	};
}


// EXPORTS

return {
	toHtml: F3(toHtml)
};

}();

var _evancz$elm_markdown$Markdown$toHtmlWith = _evancz$elm_markdown$Native_Markdown.toHtml;
var _evancz$elm_markdown$Markdown$defaultOptions = {
	githubFlavored: _elm_lang$core$Maybe$Just(
		{tables: false, breaks: false}),
	defaultHighlighting: _elm_lang$core$Maybe$Nothing,
	sanitize: false,
	smartypants: false
};
var _evancz$elm_markdown$Markdown$toHtml = F2(
	function (attrs, string) {
		return A3(_evancz$elm_markdown$Native_Markdown.toHtml, _evancz$elm_markdown$Markdown$defaultOptions, attrs, string);
	});
var _evancz$elm_markdown$Markdown$Options = F4(
	function (a, b, c, d) {
		return {githubFlavored: a, defaultHighlighting: b, sanitize: c, smartypants: d};
	});

var _debois$elm_mdl$Material_Elevation$transition = function (duration) {
	return A2(
		_debois$elm_mdl$Material_Options$css,
		'transition',
		A2(
			_elm_lang$core$Basics_ops['++'],
			'box-shadow ',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(duration),
				'ms ease-in-out 0s')));
};
var _debois$elm_mdl$Material_Elevation$e0 = _debois$elm_mdl$Material_Options$nop;
var _debois$elm_mdl$Material_Elevation$shadow = function (z) {
	return _debois$elm_mdl$Material_Options$cs(
		A2(
			_elm_lang$core$Basics_ops['++'],
			'mdl-shadow--',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(z),
				'dp')));
};
var _debois$elm_mdl$Material_Elevation$e2 = _debois$elm_mdl$Material_Elevation$shadow(2);
var _debois$elm_mdl$Material_Elevation$e3 = _debois$elm_mdl$Material_Elevation$shadow(3);
var _debois$elm_mdl$Material_Elevation$e4 = _debois$elm_mdl$Material_Elevation$shadow(4);
var _debois$elm_mdl$Material_Elevation$e6 = _debois$elm_mdl$Material_Elevation$shadow(6);
var _debois$elm_mdl$Material_Elevation$e8 = _debois$elm_mdl$Material_Elevation$shadow(8);
var _debois$elm_mdl$Material_Elevation$e16 = _debois$elm_mdl$Material_Elevation$shadow(16);
var _debois$elm_mdl$Material_Elevation$e24 = _debois$elm_mdl$Material_Elevation$shadow(24);
var _debois$elm_mdl$Material_Elevation$elevations = _elm_lang$core$Array$fromList(
	_elm_lang$core$Native_List.fromArray(
		[
			{ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Elevation$e0, _1: 0},
			{ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Elevation$e2, _1: 2},
			{ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Elevation$e3, _1: 3},
			{ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Elevation$e4, _1: 4},
			{ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Elevation$e6, _1: 6},
			{ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Elevation$e8, _1: 8},
			{ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Elevation$e16, _1: 16},
			{ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Elevation$e24, _1: 24}
		]));

var _debois$elm_mdl$Material_Color$text = function (_p0) {
	var _p1 = _p0;
	return _debois$elm_mdl$Material_Options$cs(
		A2(_elm_lang$core$Basics_ops['++'], 'mdl-color-text--', _p1._0));
};
var _debois$elm_mdl$Material_Color$background = function (_p2) {
	var _p3 = _p2;
	return _debois$elm_mdl$Material_Options$cs(
		A2(_elm_lang$core$Basics_ops['++'], 'mdl-color--', _p3._0));
};
var _debois$elm_mdl$Material_Color$shadeName = function (shade) {
	var _p4 = shade;
	switch (_p4.ctor) {
		case 'S50':
			return '50';
		case 'S100':
			return '100';
		case 'S200':
			return '200';
		case 'S300':
			return '300';
		case 'S400':
			return '400';
		case 'S500':
			return '500';
		case 'S600':
			return '600';
		case 'S700':
			return '700';
		case 'S800':
			return '800';
		case 'S900':
			return '900';
		case 'A100':
			return 'A100';
		case 'A200':
			return 'A200';
		case 'A400':
			return 'A400';
		default:
			return 'A700';
	}
};
var _debois$elm_mdl$Material_Color$hueName = function (color) {
	var _p5 = color;
	switch (_p5.ctor) {
		case 'Indigo':
			return 'indigo';
		case 'Blue':
			return 'blue';
		case 'LightBlue':
			return 'light-blue';
		case 'Cyan':
			return 'cyan';
		case 'Teal':
			return 'teal';
		case 'Green':
			return 'green';
		case 'LightGreen':
			return 'light-green';
		case 'Lime':
			return 'lime';
		case 'Yellow':
			return 'yellow';
		case 'Amber':
			return 'amber';
		case 'Orange':
			return 'orange';
		case 'Brown':
			return 'brown';
		case 'BlueGrey':
			return 'blue-grey';
		case 'Grey':
			return 'grey';
		case 'DeepOrange':
			return 'deep-orange';
		case 'Red':
			return 'red';
		case 'Pink':
			return 'pink';
		case 'Purple':
			return 'purple';
		default:
			return 'deep-purple';
	}
};
var _debois$elm_mdl$Material_Color$scheme = F2(
	function (primary, accent) {
		var q = _elm_lang$core$String$map(
			function (x) {
				return _elm_lang$core$Native_Utils.eq(
					x,
					_elm_lang$core$Native_Utils.chr('-')) ? _elm_lang$core$Native_Utils.chr('_') : x;
			});
		var cssFile = function () {
			var _p6 = accent;
			switch (_p6.ctor) {
				case 'Grey':
					return '';
				case 'Brown':
					return '';
				case 'BlueGrey':
					return '';
				default:
					return A2(
						_elm_lang$core$Basics_ops['++'],
						'.',
						A2(
							_elm_lang$core$Basics_ops['++'],
							q(
								_debois$elm_mdl$Material_Color$hueName(primary)),
							A2(
								_elm_lang$core$Basics_ops['++'],
								'-',
								q(
									_debois$elm_mdl$Material_Color$hueName(accent)))));
			}
		}();
		return A2(
			_elm_lang$core$Basics_ops['++'],
			'material',
			A2(_elm_lang$core$Basics_ops['++'], cssFile, '.min.css'));
	});
var _debois$elm_mdl$Material_Color$DeepPurple = {ctor: 'DeepPurple'};
var _debois$elm_mdl$Material_Color$Purple = {ctor: 'Purple'};
var _debois$elm_mdl$Material_Color$Pink = {ctor: 'Pink'};
var _debois$elm_mdl$Material_Color$Red = {ctor: 'Red'};
var _debois$elm_mdl$Material_Color$DeepOrange = {ctor: 'DeepOrange'};
var _debois$elm_mdl$Material_Color$Grey = {ctor: 'Grey'};
var _debois$elm_mdl$Material_Color$BlueGrey = {ctor: 'BlueGrey'};
var _debois$elm_mdl$Material_Color$Brown = {ctor: 'Brown'};
var _debois$elm_mdl$Material_Color$Orange = {ctor: 'Orange'};
var _debois$elm_mdl$Material_Color$Amber = {ctor: 'Amber'};
var _debois$elm_mdl$Material_Color$Yellow = {ctor: 'Yellow'};
var _debois$elm_mdl$Material_Color$Lime = {ctor: 'Lime'};
var _debois$elm_mdl$Material_Color$LightGreen = {ctor: 'LightGreen'};
var _debois$elm_mdl$Material_Color$Green = {ctor: 'Green'};
var _debois$elm_mdl$Material_Color$Teal = {ctor: 'Teal'};
var _debois$elm_mdl$Material_Color$Cyan = {ctor: 'Cyan'};
var _debois$elm_mdl$Material_Color$LightBlue = {ctor: 'LightBlue'};
var _debois$elm_mdl$Material_Color$Blue = {ctor: 'Blue'};
var _debois$elm_mdl$Material_Color$Indigo = {ctor: 'Indigo'};
var _debois$elm_mdl$Material_Color$hues = _elm_lang$core$Array$fromList(
	_elm_lang$core$Native_List.fromArray(
		[_debois$elm_mdl$Material_Color$Indigo, _debois$elm_mdl$Material_Color$Blue, _debois$elm_mdl$Material_Color$LightBlue, _debois$elm_mdl$Material_Color$Cyan, _debois$elm_mdl$Material_Color$Teal, _debois$elm_mdl$Material_Color$Green, _debois$elm_mdl$Material_Color$LightGreen, _debois$elm_mdl$Material_Color$Lime, _debois$elm_mdl$Material_Color$Yellow, _debois$elm_mdl$Material_Color$Amber, _debois$elm_mdl$Material_Color$Orange, _debois$elm_mdl$Material_Color$Brown, _debois$elm_mdl$Material_Color$BlueGrey, _debois$elm_mdl$Material_Color$Grey, _debois$elm_mdl$Material_Color$DeepOrange, _debois$elm_mdl$Material_Color$Red, _debois$elm_mdl$Material_Color$Pink, _debois$elm_mdl$Material_Color$Purple, _debois$elm_mdl$Material_Color$DeepPurple]));
var _debois$elm_mdl$Material_Color$accentHues = _elm_lang$core$Array$fromList(
	_elm_lang$core$Native_List.fromArray(
		[_debois$elm_mdl$Material_Color$Indigo, _debois$elm_mdl$Material_Color$Blue, _debois$elm_mdl$Material_Color$LightBlue, _debois$elm_mdl$Material_Color$Cyan, _debois$elm_mdl$Material_Color$Teal, _debois$elm_mdl$Material_Color$Green, _debois$elm_mdl$Material_Color$LightGreen, _debois$elm_mdl$Material_Color$Lime, _debois$elm_mdl$Material_Color$Yellow, _debois$elm_mdl$Material_Color$Amber, _debois$elm_mdl$Material_Color$Orange, _debois$elm_mdl$Material_Color$DeepOrange, _debois$elm_mdl$Material_Color$Red, _debois$elm_mdl$Material_Color$Pink, _debois$elm_mdl$Material_Color$Purple, _debois$elm_mdl$Material_Color$DeepPurple]));
var _debois$elm_mdl$Material_Color$A700 = {ctor: 'A700'};
var _debois$elm_mdl$Material_Color$A400 = {ctor: 'A400'};
var _debois$elm_mdl$Material_Color$A200 = {ctor: 'A200'};
var _debois$elm_mdl$Material_Color$A100 = {ctor: 'A100'};
var _debois$elm_mdl$Material_Color$S900 = {ctor: 'S900'};
var _debois$elm_mdl$Material_Color$S800 = {ctor: 'S800'};
var _debois$elm_mdl$Material_Color$S700 = {ctor: 'S700'};
var _debois$elm_mdl$Material_Color$S600 = {ctor: 'S600'};
var _debois$elm_mdl$Material_Color$S500 = {ctor: 'S500'};
var _debois$elm_mdl$Material_Color$S400 = {ctor: 'S400'};
var _debois$elm_mdl$Material_Color$S300 = {ctor: 'S300'};
var _debois$elm_mdl$Material_Color$S200 = {ctor: 'S200'};
var _debois$elm_mdl$Material_Color$S100 = {ctor: 'S100'};
var _debois$elm_mdl$Material_Color$S50 = {ctor: 'S50'};
var _debois$elm_mdl$Material_Color$shades = _elm_lang$core$Array$fromList(
	_elm_lang$core$Native_List.fromArray(
		[_debois$elm_mdl$Material_Color$S50, _debois$elm_mdl$Material_Color$S100, _debois$elm_mdl$Material_Color$S200, _debois$elm_mdl$Material_Color$S300, _debois$elm_mdl$Material_Color$S400, _debois$elm_mdl$Material_Color$S500, _debois$elm_mdl$Material_Color$S600, _debois$elm_mdl$Material_Color$S700, _debois$elm_mdl$Material_Color$S800, _debois$elm_mdl$Material_Color$S900, _debois$elm_mdl$Material_Color$A100, _debois$elm_mdl$Material_Color$A200, _debois$elm_mdl$Material_Color$A400, _debois$elm_mdl$Material_Color$A700]));
var _debois$elm_mdl$Material_Color$C = function (a) {
	return {ctor: 'C', _0: a};
};
var _debois$elm_mdl$Material_Color$color = F2(
	function (hue, shade) {
		return _debois$elm_mdl$Material_Color$C(
			A2(
				_elm_lang$core$Basics_ops['++'],
				_debois$elm_mdl$Material_Color$hueName(hue),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'-',
					_debois$elm_mdl$Material_Color$shadeName(shade))));
	});
var _debois$elm_mdl$Material_Color$white = _debois$elm_mdl$Material_Color$C('white');
var _debois$elm_mdl$Material_Color$black = _debois$elm_mdl$Material_Color$C('black');
var _debois$elm_mdl$Material_Color$primary = _debois$elm_mdl$Material_Color$C('primary');
var _debois$elm_mdl$Material_Color$primaryDark = _debois$elm_mdl$Material_Color$C('primary-dark');
var _debois$elm_mdl$Material_Color$primaryContrast = _debois$elm_mdl$Material_Color$C('primary-contrast');
var _debois$elm_mdl$Material_Color$accent = _debois$elm_mdl$Material_Color$C('accent');
var _debois$elm_mdl$Material_Color$accentContrast = _debois$elm_mdl$Material_Color$C('accent-contrast');

var _debois$elm_mdl$Demo_Code$dropWhile = F2(
	function (f, xs) {
		dropWhile:
		while (true) {
			var _p0 = xs;
			if (_p0.ctor === '[]') {
				return xs;
			} else {
				if (f(_p0._0)) {
					var _v1 = f,
						_v2 = _p0._1;
					f = _v1;
					xs = _v2;
					continue dropWhile;
				} else {
					return _p0;
				}
			}
		}
	});
var _debois$elm_mdl$Demo_Code$lead = F2(
	function (k, str) {
		lead:
		while (true) {
			var _p1 = _elm_lang$core$String$uncons(str);
			if (((_p1.ctor === 'Just') && (_p1._0.ctor === '_Tuple2')) && (_p1._0._0.valueOf() === ' ')) {
				var _v4 = k + 1,
					_v5 = _p1._0._1;
				k = _v4;
				str = _v5;
				continue lead;
			} else {
				return k;
			}
		}
	});
var _debois$elm_mdl$Demo_Code$trim = function (s) {
	var lines = A2(
		_debois$elm_mdl$Demo_Code$dropWhile,
		function (_p2) {
			return A2(
				F2(
					function (x, y) {
						return _elm_lang$core$Native_Utils.eq(x, y);
					}),
				'',
				_elm_lang$core$String$trim(_p2));
		},
		_elm_lang$core$String$lines(
			_elm_lang$core$String$trimRight(s)));
	var k = A2(
		_elm_lang$core$Maybe$withDefault,
		0,
		A2(
			_elm_lang$core$Maybe$map,
			_debois$elm_mdl$Demo_Code$lead(0),
			_elm_lang$core$List$head(lines)));
	return A2(
		_elm_lang$core$String$join,
		'\n',
		A2(
			_elm_lang$core$List$map,
			_elm_lang$core$String$dropLeft(k),
			lines));
};
var _debois$elm_mdl$Demo_Code$format = F3(
	function (language, options, str) {
		return A3(
			_debois$elm_mdl$Material_Options$styled,
			_evancz$elm_markdown$Markdown$toHtmlWith(_evancz$elm_markdown$Markdown$defaultOptions),
			A2(
				_elm_lang$core$List_ops['::'],
				_debois$elm_mdl$Material_Options$many(
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Options$css, 'overflow', 'auto'),
							A2(_debois$elm_mdl$Material_Options$css, 'border-radius', '2px'),
							A2(_debois$elm_mdl$Material_Options$css, 'font-size', '10pt'),
							_debois$elm_mdl$Material_Color$background(
							A2(_debois$elm_mdl$Material_Color$color, _debois$elm_mdl$Material_Color$BlueGrey, _debois$elm_mdl$Material_Color$S50)),
							_debois$elm_mdl$Material_Elevation$e2
						])),
				options),
			A2(
				_elm_lang$core$Basics_ops['++'],
				'```',
				A2(
					_elm_lang$core$Basics_ops['++'],
					language,
					A2(
						_elm_lang$core$Basics_ops['++'],
						'\n',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_debois$elm_mdl$Demo_Code$trim(str),
							'\n```')))));
	});
var _debois$elm_mdl$Demo_Code$code = _debois$elm_mdl$Demo_Code$format('elm');
var _debois$elm_mdl$Demo_Code$html = _debois$elm_mdl$Demo_Code$format('xml');
var _debois$elm_mdl$Demo_Code$delay = 200;
var _debois$elm_mdl$Demo_Code$view = F2(
	function (state, options) {
		var body = function () {
			var _p3 = state;
			switch (_p3.ctor) {
				case 'Idle':
					return _elm_lang$html$Html$text('');
				case 'First':
					return A2(_debois$elm_mdl$Demo_Code$code, options, _p3._0);
				case 'FadingIn':
					return A2(_debois$elm_mdl$Demo_Code$code, options, _p3._0);
				case 'FadingOut':
					return A2(_debois$elm_mdl$Demo_Code$code, options, _p3._0._0);
				default:
					return A2(_debois$elm_mdl$Demo_Code$code, options, _p3._0);
			}
		}();
		var opacity = function () {
			var _p4 = state;
			switch (_p4.ctor) {
				case 'Idle':
					return 0;
				case 'First':
					return 0;
				case 'FadingIn':
					return 1.0;
				case 'FadingOut':
					return 0;
				default:
					return 1.0;
			}
		}();
		return A2(
			_debois$elm_mdl$Material_Options$div,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_Options$css,
					'transition',
					A2(
						_elm_lang$core$Basics_ops['++'],
						'opacity ',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(_debois$elm_mdl$Demo_Code$delay),
							'ms ease-in-out'))),
					A2(
					_debois$elm_mdl$Material_Options$css,
					'opacity',
					_elm_lang$core$Basics$toString(opacity))
				]),
			_elm_lang$core$Native_List.fromArray(
				[body]));
	});
var _debois$elm_mdl$Demo_Code$FadingOut = function (a) {
	return {ctor: 'FadingOut', _0: a};
};
var _debois$elm_mdl$Demo_Code$FadingIn = function (a) {
	return {ctor: 'FadingIn', _0: a};
};
var _debois$elm_mdl$Demo_Code$Showing = function (a) {
	return {ctor: 'Showing', _0: a};
};
var _debois$elm_mdl$Demo_Code$First = function (a) {
	return {ctor: 'First', _0: a};
};
var _debois$elm_mdl$Demo_Code$Idle = {ctor: 'Idle'};
var _debois$elm_mdl$Demo_Code$model = _debois$elm_mdl$Demo_Code$Idle;
var _debois$elm_mdl$Demo_Code$Timeout = function (a) {
	return {ctor: 'Timeout', _0: a};
};
var _debois$elm_mdl$Demo_Code$later = function (s) {
	return A2(
		_debois$elm_mdl$Material_Helpers$delay,
		_debois$elm_mdl$Demo_Code$delay,
		_debois$elm_mdl$Demo_Code$Timeout(s));
};
var _debois$elm_mdl$Demo_Code$update = F2(
	function (action, state) {
		var guard = F2(
			function (b, x) {
				return b ? x : {ctor: '_Tuple2', _0: state, _1: _elm_lang$core$Platform_Cmd$none};
			});
		var _p5 = action;
		if (_p5.ctor === 'Set') {
			var _p9 = _p5._0;
			var _p6 = state;
			switch (_p6.ctor) {
				case 'Idle':
					return {
						ctor: '_Tuple2',
						_0: _debois$elm_mdl$Demo_Code$First(_p9),
						_1: _debois$elm_mdl$Material_Helpers$cmd(
							_debois$elm_mdl$Demo_Code$Timeout(_p9))
					};
				case 'First':
					return {
						ctor: '_Tuple2',
						_0: _debois$elm_mdl$Demo_Code$First(_p9),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				case 'Showing':
					var _p7 = _p6._0;
					return A2(
						guard,
						!_elm_lang$core$Native_Utils.eq(_p9, _p7),
						{
							ctor: '_Tuple2',
							_0: _debois$elm_mdl$Demo_Code$FadingOut(
								{ctor: '_Tuple2', _0: _p7, _1: _p9}),
							_1: _debois$elm_mdl$Demo_Code$later(_p7)
						});
				case 'FadingIn':
					var _p8 = _p6._0;
					return A2(
						guard,
						!_elm_lang$core$Native_Utils.eq(_p9, _p8),
						{
							ctor: '_Tuple2',
							_0: _debois$elm_mdl$Demo_Code$FadingOut(
								{ctor: '_Tuple2', _0: _p8, _1: _p9}),
							_1: _debois$elm_mdl$Demo_Code$later(_p9)
						});
				default:
					return {
						ctor: '_Tuple2',
						_0: _debois$elm_mdl$Demo_Code$FadingOut(
							{ctor: '_Tuple2', _0: _p6._0._0, _1: _p9}),
						_1: _elm_lang$core$Platform_Cmd$none
					};
			}
		} else {
			var _p12 = _p5._0;
			var _p10 = state;
			switch (_p10.ctor) {
				case 'Idle':
					return {ctor: '_Tuple2', _0: state, _1: _elm_lang$core$Platform_Cmd$none};
				case 'First':
					return {
						ctor: '_Tuple2',
						_0: _debois$elm_mdl$Demo_Code$FadingIn(_p12),
						_1: _debois$elm_mdl$Demo_Code$later(_p12)
					};
				case 'Showing':
					return {ctor: '_Tuple2', _0: state, _1: _elm_lang$core$Platform_Cmd$none};
				case 'FadingIn':
					return A2(
						guard,
						_elm_lang$core$Native_Utils.eq(_p12, _p10._0),
						{
							ctor: '_Tuple2',
							_0: _debois$elm_mdl$Demo_Code$Showing(_p12),
							_1: _elm_lang$core$Platform_Cmd$none
						});
				default:
					var _p11 = _p10._0._1;
					return A2(
						guard,
						_elm_lang$core$Native_Utils.eq(_p12, _p10._0._0),
						{
							ctor: '_Tuple2',
							_0: _debois$elm_mdl$Demo_Code$FadingIn(_p11),
							_1: _debois$elm_mdl$Demo_Code$later(_p11)
						});
			}
		}
	});
var _debois$elm_mdl$Demo_Code$Set = function (a) {
	return {ctor: 'Set', _0: a};
};

var _debois$elm_mdl$Demo_Page$background = A2(_debois$elm_mdl$Material_Color$color, _debois$elm_mdl$Material_Color$Yellow, _debois$elm_mdl$Material_Color$S50);
var _debois$elm_mdl$Demo_Page$boxed = _elm_lang$core$Native_List.fromArray(
	[
		A2(_debois$elm_mdl$Material_Options$css, 'margin', 'auto'),
		A2(_debois$elm_mdl$Material_Options$css, 'padding-left', '8%'),
		A2(_debois$elm_mdl$Material_Options$css, 'padding-right', '8%')
	]);
var _debois$elm_mdl$Demo_Page$header = function (str) {
	return _elm_lang$html$Html$text(str);
};
var _debois$elm_mdl$Demo_Page$title = function (t) {
	return A3(
		_debois$elm_mdl$Material_Options$styled,
		_elm_lang$html$Html$h1,
		_elm_lang$core$Native_List.fromArray(
			[
				_debois$elm_mdl$Material_Color$text(_debois$elm_mdl$Material_Color$primary)
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html$text(t)
			]));
};
var _debois$elm_mdl$Demo_Page$from = F3(
	function (title, url, body) {
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('From the '),
					A2(
					_elm_lang$html$Html$a,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$href(url)
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text(title)
						])),
					_elm_lang$html$Html$text(':'),
					A2(
					_evancz$elm_markdown$Markdown$toHtml,
					_elm_lang$core$Native_List.fromArray(
						[]),
					body)
				]));
	});
var _debois$elm_mdl$Demo_Page$fromMDL = _debois$elm_mdl$Demo_Page$from('Material Design Lite documentation');
var _debois$elm_mdl$Demo_Page$fromMDS = _debois$elm_mdl$Demo_Page$from('Material Design Specification');
var _debois$elm_mdl$Demo_Page$references = function (links) {
	return _elm_lang$core$Native_List.fromArray(
		[
			_debois$elm_mdl$Demo_Page$header('References'),
			A2(
			_elm_lang$html$Html$ul,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$style(
					_elm_lang$core$Native_List.fromArray(
						[
							{ctor: '_Tuple2', _0: 'padding-left', _1: '0'}
						]))
				]),
			A2(
				_elm_lang$core$List$map,
				function (_p0) {
					var _p1 = _p0;
					return A2(
						_elm_lang$html$Html$li,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html_Attributes$style(
								_elm_lang$core$Native_List.fromArray(
									[
										{ctor: '_Tuple2', _0: 'list-style-type', _1: 'none'}
									]))
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_elm_lang$html$Html$a,
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html_Attributes$href(_p1._1)
									]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text(_p1._0)
									]))
							]));
				},
				links))
		]);
};
var _debois$elm_mdl$Demo_Page$body1 = F5(
	function (t, srcUrl, contents, links, demo) {
		return A2(
			_debois$elm_mdl$Material_Options$div,
			_debois$elm_mdl$Demo_Page$boxed,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Demo_Page$title(t),
					A2(
					_debois$elm_mdl$Material_Grid$grid,
					_elm_lang$core$Native_List.fromArray(
						[_debois$elm_mdl$Material_Grid$noSpacing]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_Grid$cell,
							_elm_lang$core$Native_List.fromArray(
								[
									A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 6),
									A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Phone, 4)
								]),
							_elm_lang$core$Native_List.fromArray(
								[contents])),
							A2(
							_debois$elm_mdl$Material_Grid$cell,
							_elm_lang$core$Native_List.fromArray(
								[
									A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 5),
									A2(_debois$elm_mdl$Material_Grid$offset, _debois$elm_mdl$Material_Grid$Desktop, 1),
									A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Phone, 4),
									_debois$elm_mdl$Material_Grid$align(_debois$elm_mdl$Material_Grid$Top),
									A2(_debois$elm_mdl$Material_Options$css, 'position', 'relative')
								]),
							_debois$elm_mdl$Demo_Page$references(
								A2(
									_elm_lang$core$List_ops['::'],
									{ctor: '_Tuple2', _0: 'Demo source', _1: srcUrl},
									links)))
						])),
					A2(
					_debois$elm_mdl$Material_Options$div,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Options$css, 'margin-bottom', '48px')
						]),
					demo)
				]));
	});
var _debois$elm_mdl$Demo_Page$body2 = _debois$elm_mdl$Demo_Page$body1;
var _debois$elm_mdl$Demo_Page$body1$ = F6(
	function (t, srcUrl, contents, links, demo1, demo2) {
		return A2(
			_debois$elm_mdl$Material_Options$div,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_Options$div,
					_debois$elm_mdl$Demo_Page$boxed,
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Demo_Page$title(t),
							A2(
							_debois$elm_mdl$Material_Grid$grid,
							_elm_lang$core$Native_List.fromArray(
								[_debois$elm_mdl$Material_Grid$noSpacing]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_debois$elm_mdl$Material_Grid$cell,
									_elm_lang$core$Native_List.fromArray(
										[
											A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 6),
											A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Phone, 4)
										]),
									_elm_lang$core$Native_List.fromArray(
										[contents])),
									A2(
									_debois$elm_mdl$Material_Grid$cell,
									_elm_lang$core$Native_List.fromArray(
										[
											A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 5),
											A2(_debois$elm_mdl$Material_Grid$offset, _debois$elm_mdl$Material_Grid$Desktop, 1),
											A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Phone, 4),
											_debois$elm_mdl$Material_Grid$align(_debois$elm_mdl$Material_Grid$Top),
											A2(_debois$elm_mdl$Material_Options$css, 'position', 'relative')
										]),
									_debois$elm_mdl$Demo_Page$references(
										A2(
											_elm_lang$core$List_ops['::'],
											{ctor: '_Tuple2', _0: 'Demo source', _1: srcUrl},
											links)))
								])),
							A2(
							_debois$elm_mdl$Material_Options$div,
							_elm_lang$core$Native_List.fromArray(
								[
									A2(_debois$elm_mdl$Material_Options$css, 'margin-bottom', '48px')
								]),
							demo1)
						])),
					A2(
					_debois$elm_mdl$Material_Options$div,
					_debois$elm_mdl$Demo_Page$boxed,
					_elm_lang$core$Native_List.fromArray(
						[])),
					A2(
					_debois$elm_mdl$Material_Options$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Color$background(_debois$elm_mdl$Demo_Page$background),
							A2(_debois$elm_mdl$Material_Options$css, 'position', 'relative'),
							A2(_debois$elm_mdl$Material_Options$css, 'margin', 'auto'),
							A2(_debois$elm_mdl$Material_Options$css, 'padding-top', '2rem'),
							A2(_debois$elm_mdl$Material_Options$css, 'padding-bottom', '5rem'),
							A2(_debois$elm_mdl$Material_Options$css, 'padding-left', '8%'),
							A2(_debois$elm_mdl$Material_Options$css, 'padding-right', '8%')
						]),
					demo2)
				]));
	});
var _debois$elm_mdl$Demo_Page$body3 = F5(
	function (t, srcUrl, contents, links, demo) {
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Demo_Page$title(t),
					A2(
					_debois$elm_mdl$Material_Grid$grid,
					_elm_lang$core$Native_List.fromArray(
						[_debois$elm_mdl$Material_Grid$noSpacing]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_Grid$cell,
							_elm_lang$core$Native_List.fromArray(
								[
									A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 4),
									A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Desktop, 5),
									A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Tablet, 8)
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									contents,
									A2(
									_elm_lang$html$Html$div,
									_elm_lang$core$Native_List.fromArray(
										[]),
									_debois$elm_mdl$Demo_Page$references(
										A2(
											_elm_lang$core$List_ops['::'],
											{ctor: '_Tuple2', _0: 'Demo source', _1: srcUrl},
											links)))
								])),
							A2(
							_debois$elm_mdl$Material_Grid$cell,
							_elm_lang$core$Native_List.fromArray(
								[
									A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Phone, 4),
									A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Desktop, 5),
									A2(_debois$elm_mdl$Material_Grid$offset, _debois$elm_mdl$Material_Grid$Desktop, 1),
									A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Tablet, 8)
								]),
							demo)
						]))
				]));
	});
var _debois$elm_mdl$Demo_Page$mdl = function (url) {
	return {ctor: '_Tuple2', _0: 'Material Design Lite documentation', _1: url};
};
var _debois$elm_mdl$Demo_Page$mds = function (url) {
	return {ctor: '_Tuple2', _0: 'Material Design Specification', _1: url};
};
var _debois$elm_mdl$Demo_Page$package = function (url) {
	return {ctor: '_Tuple2', _0: 'Package documentation', _1: url};
};
var _debois$elm_mdl$Demo_Page$demo = function (url) {
	return {ctor: '_Tuple2', _0: 'Demo source', _1: url};
};

var _debois$elm_mdl$Demo_Badges$references = _elm_lang$core$Native_List.fromArray(
	[
		_debois$elm_mdl$Demo_Page$package('http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Badge'),
		_debois$elm_mdl$Demo_Page$mdl('https://www.getmdl.io/components/#badges-section')
	]);
var _debois$elm_mdl$Demo_Badges$srcUrl = 'https://github.com/debois/elm-mdl/blob/master/demo/Demo/Badges.elm';
var _debois$elm_mdl$Demo_Badges$intro = A2(_debois$elm_mdl$Demo_Page$fromMDL, 'http://www.getmdl.io/components/#badges-section', '\n> The Material Design Lite (MDL) badge component is an onscreen notification\n> element. A badge consists of a small circle, typically containing a number or\n> other characters, that appears in proximity to another object. A badge can be\n> both a notifier that there are additional items associated with an object and\n> an indicator of how many items there are.\n> \n> You can use a badge to unobtrusively draw the user\'s attention to items they\n> might not otherwise notice, or to emphasize that items may need their\n> attention. For example:\n> \n>  - A \"New messages\" notification might be followed by a badge containing the\n> number of unread messages.  \n>  - A \"You have unpurchased items in your shopping cart\" reminder might include\n>  a badge showing the number of items in the cart.\n>  - A \"Join the discussion!\" button might have an accompanying badge indicating the\n> number of users currently participating in the discussion.  \n> \n> A badge is almost\n> always positioned near a link so that the user has a convenient way to access\n> the additional information indicated by the badge. However, depending on the\n> intent, the badge itself may or may not be part of the link.\n> \n> Badges are a new feature in user interfaces, and provide users with a visual clue to help them discover additional relevant content. Their design and use is therefore an important factor in the overall user experience.\n> \n');
var _debois$elm_mdl$Demo_Badges$c = _debois$elm_mdl$Material_Grid$cell(
	_elm_lang$core$Native_List.fromArray(
		[
			A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 4)
		]));
var _debois$elm_mdl$Demo_Badges$onHover = function (_p0) {
	return _debois$elm_mdl$Material_Options$attribute(
		_elm_lang$html$Html_Events$onMouseOver(_p0));
};
var _debois$elm_mdl$Demo_Badges$model = {unread: 1, mdl: _debois$elm_mdl$Material$model, code: _elm_lang$core$Maybe$Nothing, codebox: _debois$elm_mdl$Demo_Code$model};
var _debois$elm_mdl$Demo_Badges$Model = F4(
	function (a, b, c, d) {
		return {unread: a, mdl: b, code: c, codebox: d};
	});
var _debois$elm_mdl$Demo_Badges$Mdl = function (a) {
	return {ctor: 'Mdl', _0: a};
};
var _debois$elm_mdl$Demo_Badges$CodeBox = function (a) {
	return {ctor: 'CodeBox', _0: a};
};
var _debois$elm_mdl$Demo_Badges$SetCode = function (a) {
	return {ctor: 'SetCode', _0: a};
};
var _debois$elm_mdl$Demo_Badges$Decrease = {ctor: 'Decrease'};
var _debois$elm_mdl$Demo_Badges$view = function (model) {
	var demo1 = _elm_lang$core$Native_List.fromArray(
		[
			A2(
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Below are all possible combinations of badges. Hover to show source excerpt.')
				])),
			A2(
			_debois$elm_mdl$Material_Grid$grid,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Demo_Badges$c(
					_elm_lang$core$Native_List.fromArray(
						[
							function () {
							var c1 = '    \n                  Options.span \n                    [ Badge.add \"3\" ] \n                    [ text \"Badge\" ]';
							return A2(
								_debois$elm_mdl$Material_Options$span,
								_elm_lang$core$Native_List.fromArray(
									[
										_debois$elm_mdl$Material_Badge$add('3'),
										_debois$elm_mdl$Demo_Badges$onHover(
										_debois$elm_mdl$Demo_Badges$SetCode(c1))
									]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Badge')
									]));
						}()
						])),
					_debois$elm_mdl$Demo_Badges$c(
					_elm_lang$core$Native_List.fromArray(
						[
							function () {
							var c2 = '\n                  Options.span\n                    [ Badge.add \"♥\" ]\n                    [ text \"Symbol\" ]';
							return A2(
								_debois$elm_mdl$Material_Options$span,
								_elm_lang$core$Native_List.fromArray(
									[
										_debois$elm_mdl$Material_Badge$add('♥'),
										_debois$elm_mdl$Demo_Badges$onHover(
										_debois$elm_mdl$Demo_Badges$SetCode(c2))
									]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Symbol')
									]));
						}()
						])),
					_debois$elm_mdl$Demo_Badges$c(
					_elm_lang$core$Native_List.fromArray(
						[
							function () {
							var c3 = '\n                  Icon.view \"shopping_cart\"\n                    [ Icon.size24\n                    , Badge.add \"33\"\n                    ]';
							return A3(
								_debois$elm_mdl$Material_Options$styled,
								_elm_lang$html$Html$span,
								_elm_lang$core$Native_List.fromArray(
									[
										_debois$elm_mdl$Demo_Badges$onHover(
										_debois$elm_mdl$Demo_Badges$SetCode(c3))
									]),
								_elm_lang$core$Native_List.fromArray(
									[
										A2(
										_debois$elm_mdl$Material_Icon$view,
										'shopping_cart',
										_elm_lang$core$Native_List.fromArray(
											[
												_debois$elm_mdl$Material_Icon$size24,
												_debois$elm_mdl$Material_Badge$add('33')
											]))
									]));
						}()
						])),
					_debois$elm_mdl$Demo_Badges$c(
					_elm_lang$core$Native_List.fromArray(
						[
							function () {
							var c4 = '\n                  Options.span \n                    [ Badge.add \"5\"\n                    , Badge.noBackground \n                    ]  \n                    [ text \"No background\" ]';
							return A2(
								_debois$elm_mdl$Material_Options$span,
								_elm_lang$core$Native_List.fromArray(
									[
										_debois$elm_mdl$Material_Badge$add('5'),
										_debois$elm_mdl$Material_Badge$noBackground,
										_debois$elm_mdl$Demo_Badges$onHover(
										_debois$elm_mdl$Demo_Badges$SetCode(c4))
									]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('No background')
									]));
						}()
						])),
					_debois$elm_mdl$Demo_Badges$c(
					_elm_lang$core$Native_List.fromArray(
						[
							function () {
							var c5 = '\n                  Options.span \n                    [ Badge.add \"8\"\n                    , Badge.overlap \n                    ]  \n                    [ text \"Overlap\" ]';
							return A2(
								_debois$elm_mdl$Material_Options$span,
								_elm_lang$core$Native_List.fromArray(
									[
										_debois$elm_mdl$Material_Badge$add('8'),
										_debois$elm_mdl$Material_Badge$overlap,
										_debois$elm_mdl$Demo_Badges$onHover(
										_debois$elm_mdl$Demo_Badges$SetCode(c5))
									]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Overlap')
									]));
						}()
						])),
					_debois$elm_mdl$Demo_Badges$c(
					_elm_lang$core$Native_List.fromArray(
						[
							function () {
							var c6 = '\n                  Options.span\n                    [ Badge.add \"13\"\n                    , Badge.overlap \n                    , Badge.noBackground \n                    ]  \n                    [ text \"Overlap, no background\" ]';
							return A2(
								_debois$elm_mdl$Material_Options$span,
								_elm_lang$core$Native_List.fromArray(
									[
										_debois$elm_mdl$Material_Badge$add('13'),
										_debois$elm_mdl$Material_Badge$overlap,
										_debois$elm_mdl$Material_Badge$noBackground,
										_debois$elm_mdl$Demo_Badges$onHover(
										_debois$elm_mdl$Demo_Badges$SetCode(c6))
									]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Overlap, no background')
									]));
						}()
						]))
				])),
			A2(
			_debois$elm_mdl$Demo_Code$view,
			model.codebox,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_debois$elm_mdl$Material_Options$css, 'margin', '20px 0')
				]))
		]);
	var demo2 = _elm_lang$core$Native_List.fromArray(
		[
			A2(
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Typical use of a badge in, say, in an e-mail client:')
				])),
			A2(
			_debois$elm_mdl$Material_Grid$grid,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Demo_Badges$c(
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_Options$div,
							_elm_lang$core$Native_List.fromArray(
								[
									A2(_debois$elm_mdl$Material_Options$css, 'width', '10em'),
									A2(_debois$elm_mdl$Material_Options$css, 'display', 'inline-block')
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									A3(
									_debois$elm_mdl$Material_Options$styled,
									_elm_lang$html$Html$span,
									_elm_lang$core$Native_List.fromArray(
										[
											(!_elm_lang$core$Native_Utils.eq(model.unread, 0)) ? _debois$elm_mdl$Material_Badge$add(
											_elm_lang$core$Basics$toString(model.unread)) : _debois$elm_mdl$Material_Options$nop
										]),
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html$text('Unread')
										]))
								])),
							A5(
							_debois$elm_mdl$Material_Button$render,
							_debois$elm_mdl$Demo_Badges$Mdl,
							_elm_lang$core$Native_List.fromArray(
								[0]),
							model.mdl,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Button$onClick(_debois$elm_mdl$Demo_Badges$Decrease),
									_debois$elm_mdl$Material_Button$raised,
									_debois$elm_mdl$Material_Button$ripple,
									_debois$elm_mdl$Material_Button$colored
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Mark as read')
								]))
						]))
				]))
		]);
	return A6(_debois$elm_mdl$Demo_Page$body1$, 'Badges', _debois$elm_mdl$Demo_Badges$srcUrl, _debois$elm_mdl$Demo_Badges$intro, _debois$elm_mdl$Demo_Badges$references, demo1, demo2);
};
var _debois$elm_mdl$Demo_Badges$Increase = {ctor: 'Increase'};
var _debois$elm_mdl$Demo_Badges$update = F2(
	function (action, model) {
		var _p1 = action;
		switch (_p1.ctor) {
			case 'Mdl':
				return A2(_debois$elm_mdl$Material$update, _p1._0, model);
			case 'Decrease':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{unread: model.unread - 1}),
					_1: _elm_lang$core$Platform_Cmd$batch(
						A2(
							_elm_lang$core$List$map,
							function (i) {
								return A2(
									_debois$elm_mdl$Material_Helpers$delay,
									(Math.pow(2, i) * 20) + 750,
									_debois$elm_mdl$Demo_Badges$Increase);
							},
							_elm_lang$core$Native_List.range(0, 7)))
				};
			case 'Increase':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{unread: model.unread + 1}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'SetCode':
				return A2(
					_debois$elm_mdl$Material_Helpers$map2nd,
					_elm_lang$core$Platform_Cmd$map(_debois$elm_mdl$Demo_Badges$CodeBox),
					A2(
						_debois$elm_mdl$Material_Helpers$map1st,
						function (codebox) {
							return _elm_lang$core$Native_Utils.update(
								model,
								{codebox: codebox});
						},
						A2(
							_debois$elm_mdl$Demo_Code$update,
							_debois$elm_mdl$Demo_Code$Set(_p1._0),
							model.codebox)));
			default:
				return A2(
					_debois$elm_mdl$Material_Helpers$map2nd,
					_elm_lang$core$Platform_Cmd$map(_debois$elm_mdl$Demo_Badges$CodeBox),
					A2(
						_debois$elm_mdl$Material_Helpers$map1st,
						function (codebox) {
							return _elm_lang$core$Native_Utils.update(
								model,
								{codebox: codebox});
						},
						A2(_debois$elm_mdl$Demo_Code$update, _p1._0, model.codebox)));
		}
	});

var _debois$elm_mdl$Demo_Buttons$references = _elm_lang$core$Native_List.fromArray(
	[
		_debois$elm_mdl$Demo_Page$package('http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Button'),
		_debois$elm_mdl$Demo_Page$mds('https://www.google.com/design/spec/components/buttons.html'),
		_debois$elm_mdl$Demo_Page$mdl('https://www.getmdl.io/components/#buttons-section')
	]);
var _debois$elm_mdl$Demo_Buttons$srcUrl = 'https://github.com/debois/elm-mdl/blob/master/demo/Demo/Buttons.elm';
var _debois$elm_mdl$Demo_Buttons$intro = A2(_debois$elm_mdl$Demo_Page$fromMDL, 'https://www.getmdl.io/components/#buttons-section', '\n> The Material Design Lite (MDL) button component is an enhanced version of the\n> standard HTML `<button>` element. A button consists of text and/or an image that\n> clearly communicates what action will occur when the user clicks or touches it.\n> The MDL button component provides various types of buttons, and allows you to\n> add both display and click effects.\n>\n> Buttons are a ubiquitous feature of most user interfaces, regardless of a\n> site\'s content or function. Their design and use is therefore an important\n> factor in the overall user experience. See the button component\'s Material\n> Design specifications page for details.\n>\n> The available button display types are flat (default), raised, fab, mini-fab,\n> and icon; any of these types may be plain (light gray) or colored, and may be\n> initially or programmatically disabled. The fab, mini-fab, and icon button\n> types typically use a small image as their caption rather than text.\n\n');
var _debois$elm_mdl$Demo_Buttons$indexedConcat = F2(
	function (f, xs) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$indexedMap, f, xs));
	});
var _debois$elm_mdl$Demo_Buttons$program = function (_p0) {
	var _p1 = _p0;
	var _p6 = _p1._0;
	var contents = function () {
		var _p2 = _p6;
		switch (_p2.ctor) {
			case 'Flat':
				return 'text \"Flat button\"';
			case 'Raised':
				return 'text \"Raised button\"';
			case 'FAB':
				return 'Icon.i \"add\"';
			case 'MiniFAB':
				return 'Icon.i \"zoom_in\"';
			default:
				return 'Icon.i \"flight_land\"';
		}
	}();
	var options = A2(
		_elm_lang$core$String$join,
		'\n  , ',
		A2(
			_elm_lang$core$List$map,
			F2(
				function (x, y) {
					return A2(_elm_lang$core$Basics_ops['++'], x, y);
				})('Button.'),
			A2(
				_elm_lang$core$List$filter,
				F2(
					function (x, y) {
						return !_elm_lang$core$Native_Utils.eq(x, y);
					})(''),
				_elm_lang$core$Native_List.fromArray(
					[
						function () {
						var _p3 = _p6;
						switch (_p3.ctor) {
							case 'Flat':
								return '';
							case 'Raised':
								return 'raised';
							case 'FAB':
								return 'fab';
							case 'MiniFAB':
								return 'minifab';
							default:
								return 'icon';
						}
					}(),
						function () {
						var _p4 = _p1._1;
						if (_p4.ctor === 'Plain') {
							return '';
						} else {
							return 'colored';
						}
					}(),
						function () {
						var _p5 = _p1._2;
						switch (_p5.ctor) {
							case 'Ripple':
								return 'ripple';
							case 'Disabled':
								return 'disabled';
							default:
								return '';
						}
					}(),
						'onClick MyClickMsg'
					]))));
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'Button.render Mdl [0] model.mdl\n  [ ',
		A2(
			_elm_lang$core$Basics_ops['++'],
			options,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'\n  ]\n  [ ',
				A2(_elm_lang$core$Basics_ops['++'], contents, ']'))));
};
var _debois$elm_mdl$Demo_Buttons$describe = function (_p7) {
	var _p8 = _p7;
	return A2(
		_elm_lang$core$String$join,
		' ',
		A2(
			_elm_lang$core$List$filter,
			F2(
				function (x, y) {
					return !_elm_lang$core$Native_Utils.eq(x, y);
				})(''),
			_elm_lang$core$Native_List.fromArray(
				[
					function () {
					var _p9 = _p8._0;
					switch (_p9.ctor) {
						case 'Flat':
							return 'flat';
						case 'Raised':
							return 'raised';
						case 'FAB':
							return 'fab';
						case 'MiniFAB':
							return 'mini-fab';
						default:
							return 'icon';
					}
				}(),
					function () {
					var _p10 = _p8._1;
					if (_p10.ctor === 'Plain') {
						return 'plain';
					} else {
						return 'colored';
					}
				}(),
					function () {
					var _p11 = _p8._2;
					switch (_p11.ctor) {
						case 'Ripple':
							return 'w/ripple';
						case 'Disabled':
							return 'disabled';
						default:
							return '';
					}
				}()
				])));
};
var _debois$elm_mdl$Demo_Buttons$model = {last: _elm_lang$core$Maybe$Nothing, mdl: _debois$elm_mdl$Material$model, code: _debois$elm_mdl$Demo_Code$model};
var _debois$elm_mdl$Demo_Buttons$Model = F3(
	function (a, b, c) {
		return {last: a, mdl: b, code: c};
	});
var _debois$elm_mdl$Demo_Buttons$Disabled = {ctor: 'Disabled'};
var _debois$elm_mdl$Demo_Buttons$Ripple = {ctor: 'Ripple'};
var _debois$elm_mdl$Demo_Buttons$Default = {ctor: 'Default'};
var _debois$elm_mdl$Demo_Buttons$miscs = _elm_lang$core$Native_List.fromArray(
	[_debois$elm_mdl$Demo_Buttons$Default, _debois$elm_mdl$Demo_Buttons$Ripple, _debois$elm_mdl$Demo_Buttons$Disabled]);
var _debois$elm_mdl$Demo_Buttons$Colored = {ctor: 'Colored'};
var _debois$elm_mdl$Demo_Buttons$Plain = {ctor: 'Plain'};
var _debois$elm_mdl$Demo_Buttons$colors = _elm_lang$core$Native_List.fromArray(
	[_debois$elm_mdl$Demo_Buttons$Plain, _debois$elm_mdl$Demo_Buttons$Colored]);
var _debois$elm_mdl$Demo_Buttons$Icon = {ctor: 'Icon'};
var _debois$elm_mdl$Demo_Buttons$MiniFAB = {ctor: 'MiniFAB'};
var _debois$elm_mdl$Demo_Buttons$FAB = {ctor: 'FAB'};
var _debois$elm_mdl$Demo_Buttons$Raised = {ctor: 'Raised'};
var _debois$elm_mdl$Demo_Buttons$Flat = {ctor: 'Flat'};
var _debois$elm_mdl$Demo_Buttons$kinds = _elm_lang$core$Native_List.fromArray(
	[_debois$elm_mdl$Demo_Buttons$Flat, _debois$elm_mdl$Demo_Buttons$Raised, _debois$elm_mdl$Demo_Buttons$FAB, _debois$elm_mdl$Demo_Buttons$MiniFAB, _debois$elm_mdl$Demo_Buttons$Icon]);
var _debois$elm_mdl$Demo_Buttons$Code = function (a) {
	return {ctor: 'Code', _0: a};
};
var _debois$elm_mdl$Demo_Buttons$update = F2(
	function (action, model) {
		var _p12 = action;
		switch (_p12.ctor) {
			case 'Mdl':
				return A2(_debois$elm_mdl$Material$update, _p12._0, model);
			case 'Code':
				return A2(
					_debois$elm_mdl$Material_Helpers$map2nd,
					_elm_lang$core$Platform_Cmd$map(_debois$elm_mdl$Demo_Buttons$Code),
					A2(
						_debois$elm_mdl$Material_Helpers$map1st,
						function (code$) {
							return _elm_lang$core$Native_Utils.update(
								model,
								{code: code$});
						},
						A2(_debois$elm_mdl$Demo_Code$update, _p12._0, model.code)));
			default:
				var _p14 = _p12._0;
				var _p13 = A2(
					_debois$elm_mdl$Demo_Code$update,
					_debois$elm_mdl$Demo_Code$Set(
						_debois$elm_mdl$Demo_Buttons$program(_p14)),
					model.code);
				var code$ = _p13._0;
				var fx = _p13._1;
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							last: _elm_lang$core$Maybe$Just(_p14),
							code: code$
						}),
					_1: A2(_elm_lang$core$Platform_Cmd$map, _debois$elm_mdl$Demo_Buttons$Code, fx)
				};
		}
	});
var _debois$elm_mdl$Demo_Buttons$Mdl = function (a) {
	return {ctor: 'Mdl', _0: a};
};
var _debois$elm_mdl$Demo_Buttons$Click = function (a) {
	return {ctor: 'Click', _0: a};
};
var _debois$elm_mdl$Demo_Buttons$viewButtons = function (model) {
	return A2(
		_debois$elm_mdl$Demo_Buttons$indexedConcat,
		F2(
			function (idx0, kind) {
				return A2(
					_debois$elm_mdl$Demo_Buttons$indexedConcat,
					F2(
						function (idx1, color) {
							return A2(
								_elm_lang$core$List$indexedMap,
								F2(
									function (idx2, misc) {
										return A2(
											_debois$elm_mdl$Material_Grid$cell,
											_elm_lang$core$Native_List.fromArray(
												[
													A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 2)
												]),
											_elm_lang$core$Native_List.fromArray(
												[
													A2(
													_elm_lang$html$Html$div,
													_elm_lang$core$Native_List.fromArray(
														[
															_elm_lang$html$Html_Attributes$style(
															_elm_lang$core$Native_List.fromArray(
																[
																	{ctor: '_Tuple2', _0: 'text-align', _1: 'center'},
																	{ctor: '_Tuple2', _0: 'margin-top', _1: '.6em'},
																	{ctor: '_Tuple2', _0: 'margin-bottom', _1: '.6em'}
																]))
														]),
													_elm_lang$core$Native_List.fromArray(
														[
															A5(
															_debois$elm_mdl$Material_Button$render,
															_debois$elm_mdl$Demo_Buttons$Mdl,
															_elm_lang$core$Native_List.fromArray(
																[idx0, idx1, idx2]),
															model.mdl,
															_elm_lang$core$Native_List.fromArray(
																[
																	function () {
																	var _p15 = kind;
																	switch (_p15.ctor) {
																		case 'Flat':
																			return _debois$elm_mdl$Material_Button$flat;
																		case 'Raised':
																			return _debois$elm_mdl$Material_Button$raised;
																		case 'FAB':
																			return _debois$elm_mdl$Material_Button$fab;
																		case 'MiniFAB':
																			return _debois$elm_mdl$Material_Button$minifab;
																		default:
																			return _debois$elm_mdl$Material_Button$icon;
																	}
																}(),
																	function () {
																	var _p16 = color;
																	if (_p16.ctor === 'Plain') {
																		return _debois$elm_mdl$Material_Button$plain;
																	} else {
																		return _debois$elm_mdl$Material_Button$colored;
																	}
																}(),
																	function () {
																	var _p17 = misc;
																	switch (_p17.ctor) {
																		case 'Disabled':
																			return _debois$elm_mdl$Material_Button$disabled;
																		case 'Ripple':
																			return _debois$elm_mdl$Material_Button$ripple;
																		default:
																			return _debois$elm_mdl$Material_Options$nop;
																	}
																}(),
																	_debois$elm_mdl$Material_Button$onClick(
																	_debois$elm_mdl$Demo_Buttons$Click(
																		{ctor: '_Tuple3', _0: kind, _1: color, _2: misc}))
																]),
															_elm_lang$core$Native_List.fromArray(
																[
																	function () {
																	var _p18 = kind;
																	switch (_p18.ctor) {
																		case 'Flat':
																			return _elm_lang$html$Html$text('Flat button');
																		case 'Raised':
																			return _elm_lang$html$Html$text('Raised button');
																		case 'FAB':
																			return _debois$elm_mdl$Material_Icon$i('add');
																		case 'MiniFAB':
																			return _debois$elm_mdl$Material_Icon$i('zoom_in');
																		default:
																			return _debois$elm_mdl$Material_Icon$i('flight_land');
																	}
																}()
																])),
															A2(
															_elm_lang$html$Html$div,
															_elm_lang$core$Native_List.fromArray(
																[
																	_elm_lang$html$Html_Attributes$style(
																	_elm_lang$core$Native_List.fromArray(
																		[
																			{ctor: '_Tuple2', _0: 'font-size', _1: '9pt'},
																			{ctor: '_Tuple2', _0: 'margin-top', _1: '.6em'}
																		]))
																]),
															_elm_lang$core$Native_List.fromArray(
																[
																	_elm_lang$html$Html$text(
																	_debois$elm_mdl$Demo_Buttons$describe(
																		{ctor: '_Tuple3', _0: kind, _1: color, _2: misc}))
																]))
														]))
												]));
									}),
								_debois$elm_mdl$Demo_Buttons$miscs);
						}),
					_debois$elm_mdl$Demo_Buttons$colors);
			}),
		_debois$elm_mdl$Demo_Buttons$kinds);
};
var _debois$elm_mdl$Demo_Buttons$view = function (model) {
	return A5(
		_debois$elm_mdl$Demo_Page$body2,
		'Buttons',
		_debois$elm_mdl$Demo_Buttons$srcUrl,
		_debois$elm_mdl$Demo_Buttons$intro,
		_debois$elm_mdl$Demo_Buttons$references,
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$p,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('Various combinations of colors and button styles can be seen\n                  below. Most buttons have animations; try clicking. Code for the\n                  last clicked button appears below the buttons.')
					])),
				A2(
				_debois$elm_mdl$Material_Grid$grid,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_debois$elm_mdl$Demo_Buttons$viewButtons(model)),
				A2(
				_elm_lang$html$Html$p,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text(
						A2(
							_elm_lang$core$Maybe$withDefault,
							'Click a button to see the corresponding code.',
							A2(
								_elm_lang$core$Maybe$map,
								function (str) {
									return A2(
										_elm_lang$core$Basics_ops['++'],
										'Code for \'',
										A2(_elm_lang$core$Basics_ops['++'], str, '\':'));
								},
								A2(_elm_lang$core$Maybe$map, _debois$elm_mdl$Demo_Buttons$describe, model.last)))),
						A2(
						_debois$elm_mdl$Demo_Code$view,
						model.code,
						_elm_lang$core$Native_List.fromArray(
							[
								A2(_debois$elm_mdl$Material_Options$css, 'margin', '20px')
							]))
					]))
			]));
};

var _debois$elm_mdl$Material_Card$stopClick = _debois$elm_mdl$Material_Options_Internal$attribute(
	A2(_elm_lang$html$Html_Attributes$attribute, 'onclick', 'var event = arguments[0] || window.event; event.stopPropagation();'));
var _debois$elm_mdl$Material_Card$block = function (block) {
	var _p0 = block;
	switch (_p0.ctor) {
		case 'Title':
			return A2(
				_debois$elm_mdl$Material_Options$div,
				A2(
					_elm_lang$core$List_ops['::'],
					_debois$elm_mdl$Material_Options$cs('mdl-card__title'),
					_p0._0),
				_p0._1);
		case 'Media':
			return A2(
				_debois$elm_mdl$Material_Options$div,
				A2(
					_elm_lang$core$List_ops['::'],
					_debois$elm_mdl$Material_Options$cs('mdl-card__media'),
					_p0._0),
				_p0._1);
		case 'SupportingText':
			return A2(
				_debois$elm_mdl$Material_Options$div,
				A2(
					_elm_lang$core$List_ops['::'],
					_debois$elm_mdl$Material_Options$cs('mdl-card__supporting-text'),
					_p0._0),
				_p0._1);
		case 'Actions':
			return A2(
				_debois$elm_mdl$Material_Options$div,
				A2(
					_elm_lang$core$List_ops['::'],
					_debois$elm_mdl$Material_Options$cs('mdl-card__actions'),
					A2(_elm_lang$core$List_ops['::'], _debois$elm_mdl$Material_Card$stopClick, _p0._0)),
				_p0._1);
		default:
			return A2(
				_debois$elm_mdl$Material_Options$div,
				A2(
					_elm_lang$core$List_ops['::'],
					_debois$elm_mdl$Material_Options$cs('mdl-card__menu'),
					A2(_elm_lang$core$List_ops['::'], _debois$elm_mdl$Material_Card$stopClick, _p0._0)),
				_p0._1);
	}
};
var _debois$elm_mdl$Material_Card$view = F2(
	function (styling, views) {
		return A2(
			_debois$elm_mdl$Material_Options$div,
			A2(
				_elm_lang$core$List$append,
				styling,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Options$cs('mdl-card'),
						A2(_debois$elm_mdl$Material_Options$css, 'min-height', '0px')
					])),
			A2(_elm_lang$core$List$map, _debois$elm_mdl$Material_Card$block, views));
	});
var _debois$elm_mdl$Material_Card$subhead = function (styling) {
	return _debois$elm_mdl$Material_Options$span(
		A2(
			_elm_lang$core$List_ops['::'],
			_debois$elm_mdl$Material_Options$cs('mdl-card__subtitle-text'),
			A2(
				_elm_lang$core$List_ops['::'],
				A2(_debois$elm_mdl$Material_Options$css, 'padding-top', '8px'),
				styling)));
};
var _debois$elm_mdl$Material_Card$head = function (styling) {
	return A2(
		_debois$elm_mdl$Material_Options$styled,
		_elm_lang$html$Html$h1,
		A2(
			_elm_lang$core$List_ops['::'],
			_debois$elm_mdl$Material_Options$cs('mdl-card__title-text'),
			A2(
				_elm_lang$core$List_ops['::'],
				A2(_debois$elm_mdl$Material_Options$css, 'align-self', 'flex-start'),
				styling)));
};
var _debois$elm_mdl$Material_Card$expand = _debois$elm_mdl$Material_Options$cs('mdl-card--expand');
var _debois$elm_mdl$Material_Card$border = _debois$elm_mdl$Material_Options$cs('mdl-card--border');
var _debois$elm_mdl$Material_Card$Actions = F2(
	function (a, b) {
		return {ctor: 'Actions', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Card$actions = _debois$elm_mdl$Material_Card$Actions;
var _debois$elm_mdl$Material_Card$SupportingText = F2(
	function (a, b) {
		return {ctor: 'SupportingText', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Card$text = _debois$elm_mdl$Material_Card$SupportingText;
var _debois$elm_mdl$Material_Card$Media = F2(
	function (a, b) {
		return {ctor: 'Media', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Card$media = _debois$elm_mdl$Material_Card$Media;
var _debois$elm_mdl$Material_Card$Menu = F2(
	function (a, b) {
		return {ctor: 'Menu', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Card$menu = F2(
	function (styling, block) {
		return A2(_debois$elm_mdl$Material_Card$Menu, styling, block);
	});
var _debois$elm_mdl$Material_Card$Title = F2(
	function (a, b) {
		return {ctor: 'Title', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Card$title = F2(
	function (styling, block) {
		return A2(
			_debois$elm_mdl$Material_Card$Title,
			A2(
				_elm_lang$core$List$append,
				styling,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Options$css, 'justify-content', 'flex-end'),
						A2(_debois$elm_mdl$Material_Options$css, 'flex-direction', 'column'),
						A2(_debois$elm_mdl$Material_Options$css, 'align-items', 'flex-start')
					])),
			block);
	});

var _debois$elm_mdl$Material_Typography$uppercase = _debois$elm_mdl$Material_Options$cs('mdl-typography--text-uppercase');
var _debois$elm_mdl$Material_Typography$lowercase = _debois$elm_mdl$Material_Options$cs('mdl-typography--text-lowercase');
var _debois$elm_mdl$Material_Typography$capitalize = _debois$elm_mdl$Material_Options$cs('mdl-typography--text-capitalize');
var _debois$elm_mdl$Material_Typography$justify = _debois$elm_mdl$Material_Options$cs('mdl-typography--text-justify');
var _debois$elm_mdl$Material_Typography$right = _debois$elm_mdl$Material_Options$cs('mdl-typography--text-right');
var _debois$elm_mdl$Material_Typography$left = _debois$elm_mdl$Material_Options$cs('mdl-typography--text-left');
var _debois$elm_mdl$Material_Typography$center = _debois$elm_mdl$Material_Options$cs('mdl-typography--text-center');
var _debois$elm_mdl$Material_Typography$tableStriped = _debois$elm_mdl$Material_Options$cs('mdl-typography--table-striped');
var _debois$elm_mdl$Material_Typography$nowrap = _debois$elm_mdl$Material_Options$cs('mdl-typography--text-nowrap');
var _debois$elm_mdl$Material_Typography$contrast = function (x) {
	return A2(
		_debois$elm_mdl$Material_Options$css,
		'opacity',
		_elm_lang$core$Basics$toString(x));
};
var _debois$elm_mdl$Material_Typography$menu = _debois$elm_mdl$Material_Options$cs('mdl-typography--menu-color-contrast');
var _debois$elm_mdl$Material_Typography$button = _debois$elm_mdl$Material_Options$cs('mdl-typography--button-color-contrast');
var _debois$elm_mdl$Material_Typography$caption = _debois$elm_mdl$Material_Options$cs('mdl-typography--caption-force-preferred-font-color-contrast');
var _debois$elm_mdl$Material_Typography$body2 = _debois$elm_mdl$Material_Options$cs('mdl-typography--body-2-force-preferred-font-color-contrast');
var _debois$elm_mdl$Material_Typography$body1 = _debois$elm_mdl$Material_Options$cs('mdl-typography--body-1-force-preferred-font-color-contrast');
var _debois$elm_mdl$Material_Typography$subhead = _debois$elm_mdl$Material_Options$cs('mdl-typography--subhead-color-contrast');
var _debois$elm_mdl$Material_Typography$title = _debois$elm_mdl$Material_Options$cs('mdl-typography--title-color-contrast');
var _debois$elm_mdl$Material_Typography$headline = _debois$elm_mdl$Material_Options$cs('mdl-typography--headline-color-contrast');
var _debois$elm_mdl$Material_Typography$display4 = _debois$elm_mdl$Material_Options$cs('mdl-typography--display-4-color-contrast');
var _debois$elm_mdl$Material_Typography$display3 = _debois$elm_mdl$Material_Options$cs('mdl-typography--display-3-color-contrast');
var _debois$elm_mdl$Material_Typography$display2 = _debois$elm_mdl$Material_Options$cs('mdl-typography--display-2-color-contrast');
var _debois$elm_mdl$Material_Typography$display1 = _debois$elm_mdl$Material_Options$cs('mdl-typography--display-1-color-contrast');

var _debois$elm_mdl$Demo_Cards$references = _elm_lang$core$Native_List.fromArray(
	[
		_debois$elm_mdl$Demo_Page$package('http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Card'),
		_debois$elm_mdl$Demo_Page$mds('https://material.google.com/components/cards.html'),
		_debois$elm_mdl$Demo_Page$mdl('https://getmdl.io/components/#cards-section')
	]);
var _debois$elm_mdl$Demo_Cards$srcUrl = 'https://github.com/debois/elm-mdl/blob/master/demo/Demo/Card.elm';
var _debois$elm_mdl$Demo_Cards$intro = A2(_debois$elm_mdl$Demo_Page$fromMDL, 'https://getmdl.io/components/#cards-section', '\n> The Material Design Lite (MDL) card component is a user interface element\n> representing a virtual piece of paper that contains related data — such as a\n> photo, some text, and a link — that are all about a single subject.\n>\n> Cards are a convenient means of coherently displaying related content that is\n> composed of different types of objects. They are also well-suited for presenting\n> similar objects whose size or supported actions can vary considerably, like\n> photos with captions of variable length. Cards have a constant width and a\n> variable height, depending on their content.\n>\n> Cards are a fairly new feature in user interfaces, and allow users an access\n> point to more complex and detailed information. Their design and use is an\n> important factor in the overall user experience. See the card component\'s\n> Material Design specifications page for details.\n');
var _debois$elm_mdl$Demo_Cards$wide = 400;
var _debois$elm_mdl$Demo_Cards$white = _debois$elm_mdl$Material_Color$text(_debois$elm_mdl$Material_Color$white);
var _debois$elm_mdl$Demo_Cards$margin2 = A2(_debois$elm_mdl$Material_Options$css, 'margin', '4px 8px 4px 0px');
var _debois$elm_mdl$Demo_Cards$margin1 = A2(_debois$elm_mdl$Material_Options$css, 'margin', '0');
var _debois$elm_mdl$Demo_Cards$model = {mdl: _debois$elm_mdl$Material$model, raised: -1, tab: 0, code1: _debois$elm_mdl$Demo_Code$model, code2: _debois$elm_mdl$Demo_Code$model, clicks: 0};
var _debois$elm_mdl$Demo_Cards$Model = F6(
	function (a, b, c, d, e, f) {
		return {mdl: a, raised: b, tab: c, code1: d, code2: e, clicks: f};
	});
var _debois$elm_mdl$Demo_Cards$Click = {ctor: 'Click'};
var _debois$elm_mdl$Demo_Cards$SetTab = function (a) {
	return {ctor: 'SetTab', _0: a};
};
var _debois$elm_mdl$Demo_Cards$CodeMsg2 = function (a) {
	return {ctor: 'CodeMsg2', _0: a};
};
var _debois$elm_mdl$Demo_Cards$CodeMsg1 = function (a) {
	return {ctor: 'CodeMsg1', _0: a};
};
var _debois$elm_mdl$Demo_Cards$update = F2(
	function (action, model) {
		var _p0 = action;
		switch (_p0.ctor) {
			case 'Mdl':
				return A2(_debois$elm_mdl$Material$update, _p0._0, model);
			case 'Raise':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{raised: _p0._0}),
					_elm_lang$core$Native_List.fromArray(
						[]));
			case 'SetTab':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{tab: _p0._0}),
					_elm_lang$core$Native_List.fromArray(
						[]));
			case 'ShowCode1':
				return A2(
					_debois$elm_mdl$Material_Helpers$map2nd,
					_elm_lang$core$Platform_Cmd$map(_debois$elm_mdl$Demo_Cards$CodeMsg1),
					A2(
						_debois$elm_mdl$Material_Helpers$map1st,
						function (code) {
							return _elm_lang$core$Native_Utils.update(
								model,
								{code1: code});
						},
						A2(
							_debois$elm_mdl$Demo_Code$update,
							_debois$elm_mdl$Demo_Code$Set(_p0._0),
							model.code1)));
			case 'ShowCode2':
				return A2(
					_debois$elm_mdl$Material_Helpers$map2nd,
					_elm_lang$core$Platform_Cmd$map(_debois$elm_mdl$Demo_Cards$CodeMsg2),
					A2(
						_debois$elm_mdl$Material_Helpers$map1st,
						function (code) {
							return _elm_lang$core$Native_Utils.update(
								model,
								{code2: code});
						},
						A2(
							_debois$elm_mdl$Demo_Code$update,
							_debois$elm_mdl$Demo_Code$Set(_p0._0),
							model.code2)));
			case 'CodeMsg1':
				return A2(
					_debois$elm_mdl$Material_Helpers$map2nd,
					_elm_lang$core$Platform_Cmd$map(_debois$elm_mdl$Demo_Cards$CodeMsg1),
					A2(
						_debois$elm_mdl$Material_Helpers$map1st,
						function (code) {
							return _elm_lang$core$Native_Utils.update(
								model,
								{code1: code});
						},
						A2(_debois$elm_mdl$Demo_Code$update, _p0._0, model.code1)));
			case 'CodeMsg2':
				return A2(
					_debois$elm_mdl$Material_Helpers$map2nd,
					_elm_lang$core$Platform_Cmd$map(_debois$elm_mdl$Demo_Cards$CodeMsg2),
					A2(
						_debois$elm_mdl$Material_Helpers$map1st,
						function (code) {
							return _elm_lang$core$Native_Utils.update(
								model,
								{code2: code});
						},
						A2(_debois$elm_mdl$Demo_Code$update, _p0._0, model.code2)));
			default:
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{clicks: model.clicks + 1}),
					_elm_lang$core$Native_List.fromArray(
						[]));
		}
	});
var _debois$elm_mdl$Demo_Cards$ShowCode2 = function (a) {
	return {ctor: 'ShowCode2', _0: a};
};
var _debois$elm_mdl$Demo_Cards$ShowCode1 = function (a) {
	return {ctor: 'ShowCode1', _0: a};
};
var _debois$elm_mdl$Demo_Cards$Raise = function (a) {
	return {ctor: 'Raise', _0: a};
};
var _debois$elm_mdl$Demo_Cards$dynamic = F3(
	function (k, showcode, model) {
		return _debois$elm_mdl$Material_Options$many(
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$core$Native_Utils.eq(model.raised, k) ? _debois$elm_mdl$Material_Elevation$e8 : _debois$elm_mdl$Material_Elevation$e2,
					_debois$elm_mdl$Material_Elevation$transition(250),
					_debois$elm_mdl$Material_Options$attribute(
					_elm_lang$html$Html_Events$onMouseEnter(
						_debois$elm_mdl$Demo_Cards$Raise(k))),
					_debois$elm_mdl$Material_Options$attribute(
					_elm_lang$html$Html_Events$onMouseLeave(
						_debois$elm_mdl$Demo_Cards$Raise(-1))),
					_debois$elm_mdl$Material_Options$attribute(
					_elm_lang$html$Html_Events$onClick(showcode))
				]));
	});
var _debois$elm_mdl$Demo_Cards$elm = function (model) {
	var comment = _elm_lang$core$Maybe$Nothing;
	var code = '\n      Card.view\n        [ css \"width\" \"256px\"\n        , css \"height\" \"256px\"\n        , css \"background\" \"url(\'assets/elm.png\') center / cover\"\n        ]\n        [ Card.text [ Card.expand ] [] -- Filler \n        , Card.text\n            [ css \"background\" \"rgba(0, 0, 0, 0.5)\" ] -- Non-gradient scrim\n            [ Options.span \n                [ white, Typography.title, Typography.contrast 1.0 ]\n                [ text \"Elm programming\" ]\n            ]\n        ]\n';
	var card = A2(
		_debois$elm_mdl$Material_Card$view,
		_elm_lang$core$Native_List.fromArray(
			[
				A2(_debois$elm_mdl$Material_Options$css, 'width', '256px'),
				A2(_debois$elm_mdl$Material_Options$css, 'height', '256px'),
				A2(_debois$elm_mdl$Material_Options$css, 'background', 'url(\'assets/images/elm.png\') center / cover'),
				A3(
				_debois$elm_mdl$Demo_Cards$dynamic,
				3,
				_debois$elm_mdl$Demo_Cards$ShowCode1(code),
				model),
				_debois$elm_mdl$Demo_Cards$margin1
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_Card$text,
				_elm_lang$core$Native_List.fromArray(
					[_debois$elm_mdl$Material_Card$expand]),
				_elm_lang$core$Native_List.fromArray(
					[])),
				A2(
				_debois$elm_mdl$Material_Card$text,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Options$css, 'background', 'rgba(0, 0, 0, 0.5)')
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Options$span,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Demo_Cards$white,
								_debois$elm_mdl$Material_Typography$title,
								_debois$elm_mdl$Material_Typography$contrast(1.0)
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Elm programming')
							]))
					]))
			]));
	return {ctor: '_Tuple3', _0: card, _1: code, _2: comment};
};
var _debois$elm_mdl$Demo_Cards$playing = function (model) {
	var comment = _elm_lang$core$Maybe$Nothing;
	var code = A2(
		_elm_lang$core$Basics_ops['++'],
		'\n      Card.view\n        [ css \"width\" \"',
		A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(_debois$elm_mdl$Demo_Cards$wide),
			'px\"\n        , Color.background (Color.color Color.Amber Color.S600)\n        ]\n        [ Card.title \n            [ css \"align-content\" \"flex-start\" \n            , css \"flex-direction\" \"row\" \n            , css \"align-items\" \"flex-start\"\n            , css \"justify-content\" \"space-between\"\n            ] \n            [ Options.div \n                []\n                [ Card.head [ white ] [ text \"Artificial Heart\" ]\n                , Card.subhead [ white ] [ text \"Jonathan Coulton\" ] \n                ]\n            , Options.img \n                [ Options.attribute <| Html.Attributes.src \"assets/artificial-heart.jpg\" \n                , css \"height\" \"96px\"\n                , css \"width\" \"96px\"\n                ]\n                []\n            ]\n        ]\n'));
	var card = A2(
		_debois$elm_mdl$Material_Card$view,
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_Options$css,
				'width',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(_debois$elm_mdl$Demo_Cards$wide),
					'px')),
				_debois$elm_mdl$Material_Color$background(
				A2(_debois$elm_mdl$Material_Color$color, _debois$elm_mdl$Material_Color$Amber, _debois$elm_mdl$Material_Color$S600)),
				A3(
				_debois$elm_mdl$Demo_Cards$dynamic,
				5,
				_debois$elm_mdl$Demo_Cards$ShowCode2(code),
				model),
				_debois$elm_mdl$Demo_Cards$margin2
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_Card$title,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Options$css, 'align-content', 'flex-start'),
						A2(_debois$elm_mdl$Material_Options$css, 'flex-direction', 'row'),
						A2(_debois$elm_mdl$Material_Options$css, 'align-items', 'flex-start'),
						A2(_debois$elm_mdl$Material_Options$css, 'justify-content', 'space-between')
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Options$div,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Material_Card$head,
								_elm_lang$core$Native_List.fromArray(
									[_debois$elm_mdl$Demo_Cards$white]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Artificial Heart')
									])),
								A2(
								_debois$elm_mdl$Material_Card$subhead,
								_elm_lang$core$Native_List.fromArray(
									[_debois$elm_mdl$Demo_Cards$white]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Jonathan Coulton')
									]))
							])),
						A2(
						_debois$elm_mdl$Material_Options$img,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Options$attribute(
								_elm_lang$html$Html_Attributes$src('assets/images/artificial-heart.jpg')),
								A2(_debois$elm_mdl$Material_Options$css, 'height', '96px'),
								A2(_debois$elm_mdl$Material_Options$css, 'width', '96px')
							]),
						_elm_lang$core$Native_List.fromArray(
							[]))
					]))
			]));
	return {ctor: '_Tuple3', _0: card, _1: code, _2: comment};
};
var _debois$elm_mdl$Demo_Cards$aux = function (model) {
	return _elm_lang$core$Native_List.fromArray(
		[
			A2(
			_elm_lang$html$Html$h4,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Setup')
				])),
			A2(
			_debois$elm_mdl$Demo_Code$code,
			_elm_lang$core$Native_List.fromArray(
				[]),
			'\n      import Material.Card as Card\n\n      white : Options.Property c m \n      white = \n        Color.text Color.white \n    '),
			A2(
			_elm_lang$html$Html$h4,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Card click')
				])),
			A2(
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('To react to a card-wide click event, register an onClick handler as indicated below. Be aware that clicks in the action block is ignored in order to not confuse the a click on a control in that block with a click on the entire card.')
				])),
			A2(
			_debois$elm_mdl$Material_Options$div,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_debois$elm_mdl$Material_Options$css, 'display', 'flex'),
					A2(_debois$elm_mdl$Material_Options$css, 'align-items', 'flex-start'),
					A2(_debois$elm_mdl$Material_Options$css, 'flex-flow', 'row wrap')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_Card$view,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Options$css, 'width', '128px'),
							_debois$elm_mdl$Material_Color$background(
							A2(_debois$elm_mdl$Material_Color$color, _debois$elm_mdl$Material_Color$Pink, _debois$elm_mdl$Material_Color$S500)),
							_debois$elm_mdl$Material_Options$attribute(
							_elm_lang$html$Html_Events$onClick(_debois$elm_mdl$Demo_Cards$Click)),
							A2(_debois$elm_mdl$Material_Options$css, 'margin', '0 16px 0 0'),
							A2(_debois$elm_mdl$Material_Options$css, 'flex-shrink', '0')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_Card$title,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_debois$elm_mdl$Material_Card$head,
									_elm_lang$core$Native_List.fromArray(
										[_debois$elm_mdl$Demo_Cards$white]),
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html$text('Click anywhere')
										]))
								])),
							A2(
							_debois$elm_mdl$Material_Card$text,
							_elm_lang$core$Native_List.fromArray(
								[_debois$elm_mdl$Demo_Cards$white]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text(
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(model.clicks),
										' clicks so far.'))
								])),
							A2(
							_debois$elm_mdl$Material_Card$actions,
							_elm_lang$core$Native_List.fromArray(
								[_debois$elm_mdl$Material_Card$border, _debois$elm_mdl$Demo_Cards$white]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('(not here)')
								]))
						])),
					A2(
					_debois$elm_mdl$Material_Options$div,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Options$css, 'flex-grow', '1')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Demo_Code$code,
							_elm_lang$core$Native_List.fromArray(
								[]),
							'\n            Card.view  \n              [ css \"width\" \"128px\" \n              , Color.background (Color.color Color.Pink Color.S500)\n              -- Click\n              , Options.attribute <| Html.Events.onClick Click\n              ]\n              [ Card.title [] [ Card.head [ white ] [ text \"Click anywhere\" ] ] \n              , Card.text [ white ] [ text <| toString model.clicks ++ \" clicks so far.\" ]\n              , Card.actions [ Card.border, white ] [ text \"(not here)\" ]\n              ]')
						]))
				])),
			A2(
			_elm_lang$html$Html$h4,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Elevation animation')
				])),
			A2(
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('If desired, use Elevation.transition to install elevation transitions, e.g., on hover, as demonstrated in the example below.')
				])),
			function () {
			var k = 12;
			return A2(
				_debois$elm_mdl$Material_Options$div,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Options$css, 'display', 'flex'),
						A2(_debois$elm_mdl$Material_Options$css, 'align-items', 'flex-start'),
						A2(_debois$elm_mdl$Material_Options$css, 'flex-flow', 'row wrap')
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Card$view,
						_elm_lang$core$Native_List.fromArray(
							[
								A2(_debois$elm_mdl$Material_Options$css, 'height', '128px'),
								A2(_debois$elm_mdl$Material_Options$css, 'width', '128px'),
								_debois$elm_mdl$Material_Color$background(
								A2(_debois$elm_mdl$Material_Color$color, _debois$elm_mdl$Material_Color$Pink, _debois$elm_mdl$Material_Color$S500)),
								_elm_lang$core$Native_Utils.eq(model.raised, k) ? _debois$elm_mdl$Material_Elevation$e8 : _debois$elm_mdl$Material_Elevation$e2,
								_debois$elm_mdl$Material_Elevation$transition(250),
								_debois$elm_mdl$Material_Options$attribute(
								_elm_lang$html$Html_Events$onMouseEnter(
									_debois$elm_mdl$Demo_Cards$Raise(k))),
								_debois$elm_mdl$Material_Options$attribute(
								_elm_lang$html$Html_Events$onMouseLeave(
									_debois$elm_mdl$Demo_Cards$Raise(-1))),
								A2(_debois$elm_mdl$Material_Options$css, 'margin', '0 16px 0 0'),
								A2(_debois$elm_mdl$Material_Options$css, 'flex-shrink', '0')
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Material_Card$title,
								_elm_lang$core$Native_List.fromArray(
									[]),
								_elm_lang$core$Native_List.fromArray(
									[
										A2(
										_debois$elm_mdl$Material_Card$head,
										_elm_lang$core$Native_List.fromArray(
											[_debois$elm_mdl$Demo_Cards$white]),
										_elm_lang$core$Native_List.fromArray(
											[
												_elm_lang$html$Html$text('Hover here')
											]))
									]))
							])),
						A2(
						_debois$elm_mdl$Material_Options$div,
						_elm_lang$core$Native_List.fromArray(
							[
								A2(_debois$elm_mdl$Material_Options$css, 'flex-grow', '1')
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Demo_Code$code,
								_elm_lang$core$Native_List.fromArray(
									[]),
								'\n                Card.view  \n                    [ css \"height\" \"128px\"\n                    , css \"width\" \"128px\" \n                    , Color.background (Color.color Color.Brown Color.S500)\n                    -- Elevation\n                    , if model.raised == k then Elevation.e8 else Elevation.e2\n                    , Elevation.transition 250\n                    , Options.attribute <| onMouseEnter (Raise k)\n                    , Options.attribute <| onMouseLeave (Raise -1)\n                    ]\n                    [ Card.title [] [ Card.head [ white ] [ text \"Hover here\" ] ] ]')
							]))
					]));
		}()
		]);
};
var _debois$elm_mdl$Demo_Cards$Mdl = function (a) {
	return {ctor: 'Mdl', _0: a};
};
var _debois$elm_mdl$Demo_Cards$table = function (model) {
	var comment = _elm_lang$core$Maybe$Nothing;
	var code = A2(
		_elm_lang$core$Basics_ops['++'],
		'\n      Card.view \n        [ css \"width\" \"',
		A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(_debois$elm_mdl$Demo_Cards$wide),
			A2(
				_elm_lang$core$Basics_ops['++'],
				'px\")\n        , Color.background (Color.color Color.DeepPurple Color.S300)\n        ]\n        [ Card.media \n            [ css \"background\" \"url(\'assets/table.jpg\') center / cover\"\n            , css \"height\" \"',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString((_debois$elm_mdl$Demo_Cards$wide / 16) * 9),
					'px\")\n            ]\n            []\n        , Card.title [ ] \n            [ Card.head [ white ] [ text \"Table mountain\" ] \n            , Card.subhead [ white ] [ text \"Cape Town, South Africa\" ]\n            ]\n        , Card.menu []\n            [ Button.render Mdl [0,0] model.mdl\n              [ Button.icon, Button.ripple, white ]\n              [ Icon.i \"share\" ]\n            ]\n        ] '))));
	var white = _debois$elm_mdl$Material_Color$text(_debois$elm_mdl$Material_Color$white);
	var card = A2(
		_debois$elm_mdl$Material_Card$view,
		_elm_lang$core$Native_List.fromArray(
			[
				A3(
				_debois$elm_mdl$Demo_Cards$dynamic,
				0,
				_debois$elm_mdl$Demo_Cards$ShowCode2(code),
				model),
				A2(
				_debois$elm_mdl$Material_Options$css,
				'width',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(_debois$elm_mdl$Demo_Cards$wide),
					'px')),
				_debois$elm_mdl$Material_Color$background(
				A2(_debois$elm_mdl$Material_Color$color, _debois$elm_mdl$Material_Color$DeepPurple, _debois$elm_mdl$Material_Color$S300)),
				_debois$elm_mdl$Demo_Cards$margin2
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_Card$media,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Options$css, 'background', 'url(\'assets/images/table.jpg\') center / cover'),
						A2(
						_debois$elm_mdl$Material_Options$css,
						'height',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString((_debois$elm_mdl$Demo_Cards$wide / 16) * 9),
							'px'))
					]),
				_elm_lang$core$Native_List.fromArray(
					[])),
				A2(
				_debois$elm_mdl$Material_Card$title,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Card$head,
						_elm_lang$core$Native_List.fromArray(
							[white]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Table mountain')
							])),
						A2(
						_debois$elm_mdl$Material_Card$subhead,
						_elm_lang$core$Native_List.fromArray(
							[white]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Cape Town, South Africa')
							]))
					])),
				A2(
				_debois$elm_mdl$Material_Card$menu,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A5(
						_debois$elm_mdl$Material_Button$render,
						_debois$elm_mdl$Demo_Cards$Mdl,
						_elm_lang$core$Native_List.fromArray(
							[0, 0]),
						model.mdl,
						_elm_lang$core$Native_List.fromArray(
							[_debois$elm_mdl$Material_Button$icon, _debois$elm_mdl$Material_Button$ripple, white]),
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Icon$i('share')
							]))
					]))
			]));
	return {ctor: '_Tuple3', _0: card, _1: code, _2: comment};
};
var _debois$elm_mdl$Demo_Cards$grenadine = function (model) {
	var comment = _elm_lang$core$Maybe$Nothing;
	var code = '\n      Card.view \n        [ dynamic 1 (ShowCode1 code) model\n        , css \"width\" \"256px\"\n        ]\n        [ Card.title \n            [ css \"background\" \"url(\'assets/pomegranate.jpg\') center / cover\"\n            , css \"height\" \"256px\"\n            , css \"padding\" \"0\" -- Clear default padding to encompass scrim\n            ] \n            [ Card.head \n                [ white\n                , Options.scrim 0.75\n                , css \"padding\" \"16px\" -- Restore default padding inside scrim\n                , css \"width\" \"100%\"\n                ] \n                [ text \"Grenadine\" ]\n            ]\n        , Card.text [] \n            [ text \"Non-alcoholic syrup used for both its tart and sweet flavour as well as its deep red color.\" ]\n        , Card.actions \n            [ Card.border ] \n            [ Button.render Mdl [1,0] model.mdl\n                [ Button.ripple, Button.accent ]\n                [ text \"Ingredients\" ] \n            , Button.render Mdl [1,1] model.mdl\n                [ Button.ripple, Button.accent ]\n                [ text \"Cocktails\" ] \n            ]\n        ] \n';
	var card = A2(
		_debois$elm_mdl$Material_Card$view,
		_elm_lang$core$Native_List.fromArray(
			[
				A3(
				_debois$elm_mdl$Demo_Cards$dynamic,
				1,
				_debois$elm_mdl$Demo_Cards$ShowCode1(code),
				model),
				A2(_debois$elm_mdl$Material_Options$css, 'width', '256px'),
				_debois$elm_mdl$Demo_Cards$margin1
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_Card$title,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Options$css, 'background', 'url(\'assets/images/pomegranate.jpg\') center / cover'),
						A2(_debois$elm_mdl$Material_Options$css, 'height', '256px'),
						A2(_debois$elm_mdl$Material_Options$css, 'padding', '0')
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Card$head,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Demo_Cards$white,
								_debois$elm_mdl$Material_Options$scrim(0.75),
								A2(_debois$elm_mdl$Material_Options$css, 'padding', '16px'),
								A2(_debois$elm_mdl$Material_Options$css, 'width', '100%')
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Grenadine')
							]))
					])),
				A2(
				_debois$elm_mdl$Material_Card$text,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('Non-alcoholic syrup used for both its tart and sweet flavour as well as its deep red color.')
					])),
				A2(
				_debois$elm_mdl$Material_Card$actions,
				_elm_lang$core$Native_List.fromArray(
					[_debois$elm_mdl$Material_Card$border]),
				_elm_lang$core$Native_List.fromArray(
					[
						A5(
						_debois$elm_mdl$Material_Button$render,
						_debois$elm_mdl$Demo_Cards$Mdl,
						_elm_lang$core$Native_List.fromArray(
							[1, 0]),
						model.mdl,
						_elm_lang$core$Native_List.fromArray(
							[_debois$elm_mdl$Material_Button$ripple, _debois$elm_mdl$Material_Button$accent]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Ingredients')
							])),
						A5(
						_debois$elm_mdl$Material_Button$render,
						_debois$elm_mdl$Demo_Cards$Mdl,
						_elm_lang$core$Native_List.fromArray(
							[1, 1]),
						model.mdl,
						_elm_lang$core$Native_List.fromArray(
							[_debois$elm_mdl$Material_Button$ripple, _debois$elm_mdl$Material_Button$accent]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Cocktails')
							]))
					]))
			]));
	return {ctor: '_Tuple3', _0: card, _1: code, _2: comment};
};
var _debois$elm_mdl$Demo_Cards$reminder = function (model) {
	var comment = _elm_lang$core$Maybe$Nothing;
	var code = '\n      Card.view\n        [ css \"width\" \"192px\"\n        , css \"height\" \"192px\"\n        , Color.background (Color.color Color.LightBlue Color.S400)\n        ]\n        [ Card.title [] [ Card.head [ white ] [ text \"Call Petronella\" ] ]\n        , Card.text [ Card.expand ]  [] -- Filler\n        , Card.actions \n            [ Card.border\n            -- Modify flexbox to accomodate small text in action block\n            , css \"display\" \"flex\"\n            , css \"justify-content\" \"space-between\"\n            , css \"align-items\" \"center\" \n            , css \"padding\" \"8px 16px 8px 16px\"\n            , white\n            ] \n            [ Options.span [ Typography.caption, Typography.contrast 0.87 ] [ text \"August 3, 2016\" ]\n            , Button.render Mdl [1] model.mdl\n                [ Button.icon, Button.ripple ]\n                [ Icon.i \"phone\" ]\n            ]\n        ]\n';
	var card = A2(
		_debois$elm_mdl$Material_Card$view,
		_elm_lang$core$Native_List.fromArray(
			[
				A3(
				_debois$elm_mdl$Demo_Cards$dynamic,
				2,
				_debois$elm_mdl$Demo_Cards$ShowCode2(code),
				model),
				A2(_debois$elm_mdl$Material_Options$css, 'width', '192px'),
				A2(_debois$elm_mdl$Material_Options$css, 'height', '192px'),
				_debois$elm_mdl$Material_Color$background(
				A2(_debois$elm_mdl$Material_Color$color, _debois$elm_mdl$Material_Color$LightBlue, _debois$elm_mdl$Material_Color$S400)),
				_debois$elm_mdl$Demo_Cards$margin2
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_Card$title,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Card$head,
						_elm_lang$core$Native_List.fromArray(
							[_debois$elm_mdl$Demo_Cards$white]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Call Petronella')
							]))
					])),
				A2(
				_debois$elm_mdl$Material_Card$text,
				_elm_lang$core$Native_List.fromArray(
					[_debois$elm_mdl$Material_Card$expand]),
				_elm_lang$core$Native_List.fromArray(
					[])),
				A2(
				_debois$elm_mdl$Material_Card$actions,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Card$border,
						A2(_debois$elm_mdl$Material_Options$css, 'display', 'flex'),
						A2(_debois$elm_mdl$Material_Options$css, 'justify-content', 'space-between'),
						A2(_debois$elm_mdl$Material_Options$css, 'align-items', 'center'),
						A2(_debois$elm_mdl$Material_Options$css, 'padding', '8px 16px 8px 16px'),
						_debois$elm_mdl$Demo_Cards$white
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Options$span,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Typography$caption,
								_debois$elm_mdl$Material_Typography$contrast(0.87)
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('August 3, 2016')
							])),
						A5(
						_debois$elm_mdl$Material_Button$render,
						_debois$elm_mdl$Demo_Cards$Mdl,
						_elm_lang$core$Native_List.fromArray(
							[1]),
						model.mdl,
						_elm_lang$core$Native_List.fromArray(
							[_debois$elm_mdl$Material_Button$icon, _debois$elm_mdl$Material_Button$ripple]),
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Icon$i('phone')
							]))
					]))
			]));
	return {ctor: '_Tuple3', _0: card, _1: code, _2: comment};
};
var _debois$elm_mdl$Demo_Cards$weather = function (model) {
	var comment = _elm_lang$core$Maybe$Nothing;
	var code = '\n    sun = \n      Color.color Color.Amber Color.S500\n\n    rain = \n      Color.color Color.LightBlue Color.S500\n\n    today = \n      [ (\"now\", 21, -1, Color.primary, \"cloud\")\n      , (\"16\",  21, -1, Color.primary, \"cloud\")\n      , (\"17\",  20, -1, Color.primary, \"cloud\")\n      , (\"18\",  20, -1, rain, \"grain\")\n      , (\"19\",  19, -1, rain, \"grain\")\n      , (\"20\",  19, -1, Color.primary, \"cloud_queue\")\n      , (\"21\",  28, -1, Color.primary, \"cloud_queue\")\n      ]\n      \n    next3 = \n      [ (\"thu\", 21, 14, sun, \"wb_sunny\")\n      , (\"fri\", 22, 15, rain, \"grain\")\n      , (\"sat\", 20, 13, sun, \"wb_sunny\")\n      , (\"sun\", 21, 13, rain, \"grain\")\n      , (\"mon\", 20, 13, rain, \"grain\")\n      , (\"tue\", 20, 13, sun, \"wb_sunny\")\n      , (\"wed\", 21, 15, sun, \"wb_sunny\")\n      ]\n\n    cell =\n      css \"width\" \"64px\"\n\n    row (time, high, low, color, icon) = \n      Card.subhead\n        [ css \"display\" \"flex\"\n        , css \"justify-content\" \"space-between\" \n        , css \"align-items\" \"center\"\n        , css \"padding\" \".3rem 2.5rem\" \n        ]\n        [ Options.span [ cell ] [ text time ] \n        , Options.span [ cell, css \"text-align\" \"center\" ] \n            [ Icon.view icon [ Color.text color, Icon.size18 ] ]\n        , Options.span [ cell, css \"text-align\" \"right\" ] \n            [ text <| toString high ++ \"° \"\n            , Options.span \n                [ css \"color\" \"rgba(0,0,0,0.37)\" ]\n                [ text <| if low >= 0 then toString low ++ \"°\" else \"\" ]\n            ]\n        ]\n\n    list items = \n      [ Options.div \n          [ css \"display\" \"flex\"\n          , css \"flex-direction\" \"column\"\n          , css \"padding\" \"1rem 0\"\n          , css \"color\" \"rgba(0, 0, 0, 0.54)\" \n          ]\n          (List.map row items)\n      ]\n\n    card = \n      Card.view \n        [ css \"width\" \"256px\" ]\n        [ Card.title \n            [ css \"flex-direction\" \"column\" ] \n            [ Card.head [ ] [ text \"Copenhagen\" ]\n            , Card.subhead [ ] [ text \"Wed, 14:55, mostly cloudy\" ] \n            , Options.div \n                [ css \"padding\" \"2rem 2rem 0 2rem\" ]\n                [ Options.span \n                    [ Typography.display4 \n                    , Color.text Color.primary\n                    ] \n                    [ text \"21°\" ]\n                ]\n            ]\n        , Card.actions [ ]\n            [ Tabs.render Mdl [5,2] model.mdl\n                [ Tabs.ripple\n                , Tabs.onSelectTab SetTab\n                , Tabs.activeTab model.tab\n                ]\n                [ Tabs.label [] [ text \"Today\" ] \n                , Tabs.label [] [ text \"7-day\" ] \n                ]\n                (list (if model.tab == 0 then today else next3))\n            ]\n         ] \n';
	var cell = A2(_debois$elm_mdl$Material_Options$css, 'width', '64px');
	var row = function (_p1) {
		var _p2 = _p1;
		var _p3 = _p2._2;
		return A2(
			_debois$elm_mdl$Material_Card$subhead,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_debois$elm_mdl$Material_Options$css, 'display', 'flex'),
					A2(_debois$elm_mdl$Material_Options$css, 'justify-content', 'space-between'),
					A2(_debois$elm_mdl$Material_Options$css, 'align-items', 'center'),
					A2(_debois$elm_mdl$Material_Options$css, 'padding', '.3rem 2.5rem')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_Options$span,
					_elm_lang$core$Native_List.fromArray(
						[cell]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text(_p2._0)
						])),
					A2(
					_debois$elm_mdl$Material_Options$span,
					_elm_lang$core$Native_List.fromArray(
						[
							cell,
							A2(_debois$elm_mdl$Material_Options$css, 'text-align', 'center')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_Icon$view,
							_p2._4,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Color$text(_p2._3),
									_debois$elm_mdl$Material_Icon$size18
								]))
						])),
					A2(
					_debois$elm_mdl$Material_Options$span,
					_elm_lang$core$Native_List.fromArray(
						[
							cell,
							A2(_debois$elm_mdl$Material_Options$css, 'text-align', 'right')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text(
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(_p2._1),
								'° ')),
							A2(
							_debois$elm_mdl$Material_Options$span,
							_elm_lang$core$Native_List.fromArray(
								[
									A2(_debois$elm_mdl$Material_Options$css, 'color', 'rgba(0,0,0,0.37)')
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text(
									(_elm_lang$core$Native_Utils.cmp(_p3, 0) > -1) ? A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(_p3),
										'°') : '')
								]))
						]))
				]));
	};
	var list = function (items) {
		return _elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_Options$div,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Options$css, 'display', 'flex'),
						A2(_debois$elm_mdl$Material_Options$css, 'flex-direction', 'column'),
						A2(_debois$elm_mdl$Material_Options$css, 'padding', '1rem 0'),
						A2(_debois$elm_mdl$Material_Options$css, 'color', 'rgba(0, 0, 0, 0.54)')
					]),
				A2(_elm_lang$core$List$map, row, items))
			]);
	};
	var rain = A2(_debois$elm_mdl$Material_Color$color, _debois$elm_mdl$Material_Color$LightBlue, _debois$elm_mdl$Material_Color$S500);
	var today = _elm_lang$core$Native_List.fromArray(
		[
			{ctor: '_Tuple5', _0: 'now', _1: 21, _2: -1, _3: _debois$elm_mdl$Material_Color$primary, _4: 'cloud'},
			{ctor: '_Tuple5', _0: '16', _1: 21, _2: -1, _3: _debois$elm_mdl$Material_Color$primary, _4: 'cloud'},
			{ctor: '_Tuple5', _0: '17', _1: 20, _2: -1, _3: _debois$elm_mdl$Material_Color$primary, _4: 'cloud'},
			{ctor: '_Tuple5', _0: '18', _1: 20, _2: -1, _3: rain, _4: 'grain'},
			{ctor: '_Tuple5', _0: '19', _1: 19, _2: -1, _3: rain, _4: 'grain'},
			{ctor: '_Tuple5', _0: '20', _1: 19, _2: -1, _3: _debois$elm_mdl$Material_Color$primary, _4: 'cloud_queue'},
			{ctor: '_Tuple5', _0: '21', _1: 28, _2: -1, _3: _debois$elm_mdl$Material_Color$primary, _4: 'cloud_queue'}
		]);
	var sun = A2(_debois$elm_mdl$Material_Color$color, _debois$elm_mdl$Material_Color$Amber, _debois$elm_mdl$Material_Color$S500);
	var next3 = _elm_lang$core$Native_List.fromArray(
		[
			{ctor: '_Tuple5', _0: 'thu', _1: 21, _2: 14, _3: sun, _4: 'wb_sunny'},
			{ctor: '_Tuple5', _0: 'fri', _1: 22, _2: 15, _3: rain, _4: 'grain'},
			{ctor: '_Tuple5', _0: 'sat', _1: 20, _2: 13, _3: sun, _4: 'wb_sunny'},
			{ctor: '_Tuple5', _0: 'sun', _1: 21, _2: 13, _3: rain, _4: 'grain'},
			{ctor: '_Tuple5', _0: 'mon', _1: 20, _2: 13, _3: rain, _4: 'grain'},
			{ctor: '_Tuple5', _0: 'tue', _1: 20, _2: 13, _3: sun, _4: 'wb_sunny'},
			{ctor: '_Tuple5', _0: 'wed', _1: 21, _2: 15, _3: sun, _4: 'wb_sunny'}
		]);
	var card = A2(
		_debois$elm_mdl$Material_Card$view,
		_elm_lang$core$Native_List.fromArray(
			[
				A3(
				_debois$elm_mdl$Demo_Cards$dynamic,
				6,
				_debois$elm_mdl$Demo_Cards$ShowCode1(code),
				model),
				A2(_debois$elm_mdl$Material_Options$css, 'width', '256px'),
				_debois$elm_mdl$Demo_Cards$margin1
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_Card$title,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Options$css, 'flex-direction', 'column')
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Card$head,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Copenhagen')
							])),
						A2(
						_debois$elm_mdl$Material_Card$subhead,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Wed, 14:55, mostly cloudy')
							])),
						A2(
						_debois$elm_mdl$Material_Options$div,
						_elm_lang$core$Native_List.fromArray(
							[
								A2(_debois$elm_mdl$Material_Options$css, 'padding', '2rem 2rem 0 2rem')
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Material_Options$span,
								_elm_lang$core$Native_List.fromArray(
									[
										_debois$elm_mdl$Material_Typography$display4,
										_debois$elm_mdl$Material_Typography$contrast(0.87),
										_debois$elm_mdl$Material_Color$text(_debois$elm_mdl$Material_Color$primary)
									]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('21°')
									]))
							]))
					])),
				A2(
				_debois$elm_mdl$Material_Card$actions,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A6(
						_debois$elm_mdl$Material_Tabs$render,
						_debois$elm_mdl$Demo_Cards$Mdl,
						_elm_lang$core$Native_List.fromArray(
							[5, 2]),
						model.mdl,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Tabs$ripple,
								_debois$elm_mdl$Material_Tabs$onSelectTab(_debois$elm_mdl$Demo_Cards$SetTab),
								_debois$elm_mdl$Material_Tabs$activeTab(model.tab)
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Material_Tabs$label,
								_elm_lang$core$Native_List.fromArray(
									[]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Today')
									])),
								A2(
								_debois$elm_mdl$Material_Tabs$label,
								_elm_lang$core$Native_List.fromArray(
									[]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('7-day')
									]))
							]),
						list(
							_elm_lang$core$Native_Utils.eq(model.tab, 0) ? today : next3))
					]))
			]));
	return {ctor: '_Tuple3', _0: card, _1: code, _2: comment};
};
var _debois$elm_mdl$Demo_Cards$event = function (model) {
	var comment = _elm_lang$core$Maybe$Nothing;
	var code = '\n      Card.view \n        [ Color.background (Color.color Color.DeepOrange Color.S400) \n        , css \"width\" \"192px\"\n        , css \"height\" \"192px\"\n        ]\n        [ Card.title [ ] [ Card.head [ white ] [ text \"Roskilde Festival\" ] ]\n        , Card.text [ white ] [ text \"Buy tickets before May\" ] \n        , Card.actions\n            [ Card.border, css \"vertical-align\" \"center\", css \"text-align\" \"right\", white ]\n            [ Button.render Mdl [8,1] model.mdl\n                [ Button.icon, Button.ripple ]\n                [ Icon.i \"favorite_border\" ]\n            , Button.render Mdl [8,2] model.mdl\n                [ Button.icon, Button.ripple ]\n                [ Icon.i \"event_available\" ]\n            ]\n        ]';
	var card = A2(
		_debois$elm_mdl$Material_Card$view,
		_elm_lang$core$Native_List.fromArray(
			[
				A3(
				_debois$elm_mdl$Demo_Cards$dynamic,
				7,
				_debois$elm_mdl$Demo_Cards$ShowCode2(code),
				model),
				_debois$elm_mdl$Material_Color$background(
				A2(_debois$elm_mdl$Material_Color$color, _debois$elm_mdl$Material_Color$DeepOrange, _debois$elm_mdl$Material_Color$S400)),
				A2(_debois$elm_mdl$Material_Options$css, 'width', '192px'),
				A2(_debois$elm_mdl$Material_Options$css, 'height', '192px'),
				_debois$elm_mdl$Demo_Cards$margin2
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_Card$title,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Card$head,
						_elm_lang$core$Native_List.fromArray(
							[_debois$elm_mdl$Demo_Cards$white]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Roskilde Festival')
							]))
					])),
				A2(
				_debois$elm_mdl$Material_Card$text,
				_elm_lang$core$Native_List.fromArray(
					[_debois$elm_mdl$Demo_Cards$white]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('Buy tickets before May')
					])),
				A2(
				_debois$elm_mdl$Material_Card$actions,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Card$border,
						A2(_debois$elm_mdl$Material_Options$css, 'vertical-align', 'center'),
						A2(_debois$elm_mdl$Material_Options$css, 'text-align', 'right'),
						_debois$elm_mdl$Demo_Cards$white
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A5(
						_debois$elm_mdl$Material_Button$render,
						_debois$elm_mdl$Demo_Cards$Mdl,
						_elm_lang$core$Native_List.fromArray(
							[8, 1]),
						model.mdl,
						_elm_lang$core$Native_List.fromArray(
							[_debois$elm_mdl$Material_Button$icon, _debois$elm_mdl$Material_Button$ripple]),
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Icon$i('favorite_border')
							])),
						A5(
						_debois$elm_mdl$Material_Button$render,
						_debois$elm_mdl$Demo_Cards$Mdl,
						_elm_lang$core$Native_List.fromArray(
							[8, 2]),
						model.mdl,
						_elm_lang$core$Native_List.fromArray(
							[_debois$elm_mdl$Material_Button$icon, _debois$elm_mdl$Material_Button$ripple]),
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Icon$i('event_available')
							]))
					]))
			]));
	return {ctor: '_Tuple3', _0: card, _1: code, _2: comment};
};
var _debois$elm_mdl$Demo_Cards$view = function (model) {
	var cards2 = _elm_lang$core$Native_List.fromArray(
		[
			A2(
			_debois$elm_mdl$Material_Options$div,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_debois$elm_mdl$Material_Options$css, 'display', 'flex'),
					A2(_debois$elm_mdl$Material_Options$css, 'flex-flow', 'row wrap'),
					A2(_debois$elm_mdl$Material_Options$css, 'align-items', 'flex-end'),
					A2(_debois$elm_mdl$Material_Options$css, 'margin-top', '64px')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_Options$div,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Options$css, 'display', 'flex'),
							A2(_debois$elm_mdl$Material_Options$css, 'flex-flow', 'row wrap'),
							A2(_debois$elm_mdl$Material_Options$css, 'justify-content', 'space-between'),
							A2(_debois$elm_mdl$Material_Options$css, 'align-items', 'center'),
							A2(_debois$elm_mdl$Material_Options$css, 'min-width', '256px'),
							A2(_debois$elm_mdl$Material_Options$css, 'max-width', '400px'),
							A2(_debois$elm_mdl$Material_Options$css, 'flex', '1 1 auto')
						]),
					A2(
						_elm_lang$core$List$map,
						function (_p4) {
							var _p5 = _p4;
							return _p5._0;
						},
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Demo_Cards$table(model),
								_debois$elm_mdl$Demo_Cards$playing(model),
								_debois$elm_mdl$Demo_Cards$reminder(model),
								_debois$elm_mdl$Demo_Cards$event(model)
							]))),
					A2(
					_debois$elm_mdl$Material_Options$div,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Options$css, 'margin', '32px -12px'),
							A2(_debois$elm_mdl$Material_Options$css, 'width', '100%')
						]),
					A2(
						_elm_lang$core$List_ops['::'],
						A2(
							_debois$elm_mdl$Demo_Code$view,
							model.code2,
							_elm_lang$core$Native_List.fromArray(
								[])),
						_debois$elm_mdl$Demo_Cards$aux(model)))
				]))
		]);
	var cards1 = _elm_lang$core$Native_List.fromArray(
		[
			A2(
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Click a card below to see its implementation further down the page.')
				])),
			A2(
			_debois$elm_mdl$Material_Options$div,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_debois$elm_mdl$Material_Options$css, 'display', 'flex'),
					A2(_debois$elm_mdl$Material_Options$css, 'flex-flow', 'row wrap'),
					A2(_debois$elm_mdl$Material_Options$css, 'justify-content', 'space-between'),
					A2(_debois$elm_mdl$Material_Options$css, 'align-items', 'flex-start'),
					A2(_debois$elm_mdl$Material_Options$css, 'width', '100%'),
					A2(_debois$elm_mdl$Material_Options$css, 'margin-top', '4rem')
				]),
			A2(
				_elm_lang$core$List$map,
				function (_p6) {
					var _p7 = _p6;
					return _p7._0;
				},
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Demo_Cards$weather(model),
						_debois$elm_mdl$Demo_Cards$grenadine(model),
						_debois$elm_mdl$Demo_Cards$elm(model)
					]))),
			A2(
			_debois$elm_mdl$Demo_Code$view,
			model.code1,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_debois$elm_mdl$Material_Options$css, 'margin-top', '16px')
				]))
		]);
	return A6(_debois$elm_mdl$Demo_Page$body1$, 'Cards', _debois$elm_mdl$Demo_Cards$srcUrl, _debois$elm_mdl$Demo_Cards$intro, _debois$elm_mdl$Demo_Cards$references, cards1, cards2);
};

var _debois$elm_mdl$Material_Chip$hasValue = function (m) {
	var _p0 = m;
	if (_p0.ctor === 'Just') {
		return true;
	} else {
		return false;
	}
};
var _debois$elm_mdl$Material_Chip$renderItem = function (item) {
	var _p1 = item;
	switch (_p1.ctor) {
		case 'Contact':
			return A3(
				_debois$elm_mdl$Material_Options$styled,
				_p1._0,
				A2(
					_elm_lang$core$List_ops['::'],
					_debois$elm_mdl$Material_Options$cs('mdl-chip__contact'),
					_p1._1),
				_p1._2);
		case 'Text':
			return A3(
				_debois$elm_mdl$Material_Options$styled,
				_elm_lang$html$Html$span,
				A2(
					_elm_lang$core$List_ops['::'],
					_debois$elm_mdl$Material_Options$cs('mdl-chip__text'),
					_p1._0),
				_p1._1);
		default:
			return A3(
				_debois$elm_mdl$Material_Options$styled,
				_p1._0,
				A2(
					_elm_lang$core$List_ops['::'],
					_debois$elm_mdl$Material_Options$cs('mdl-chip__action'),
					_p1._1),
				_p1._2);
	}
};
var _debois$elm_mdl$Material_Chip$priority = function (item) {
	var _p2 = item;
	switch (_p2.ctor) {
		case 'Contact':
			return 0;
		case 'Text':
			return 1;
		default:
			return 2;
	}
};
var _debois$elm_mdl$Material_Chip$on = F2(
	function (event, decoder) {
		return _debois$elm_mdl$Material_Options$set(
			function (config) {
				return _elm_lang$core$Native_Utils.update(
					config,
					{
						listeners: A2(
							_elm_lang$core$Basics_ops['++'],
							config.listeners,
							_elm_lang$core$Native_List.fromArray(
								[
									A2(_elm_lang$html$Html_Events$on, event, decoder)
								]))
					});
			});
	});
var _debois$elm_mdl$Material_Chip$onClick = function (msg) {
	return A2(
		_debois$elm_mdl$Material_Chip$on,
		'click',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _debois$elm_mdl$Material_Chip$deleteClick = function (msg) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					deleteClick: _elm_lang$core$Maybe$Just(
						A3(
							_elm_lang$html$Html_Events$onWithOptions,
							'click',
							{stopPropagation: true, preventDefault: true},
							_elm_lang$core$Json_Decode$succeed(msg)))
				});
		});
};
var _debois$elm_mdl$Material_Chip$deleteLink = function (link) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					deleteLink: _elm_lang$core$Maybe$Just(
						_elm_lang$html$Html_Attributes$href(link))
				});
		});
};
var _debois$elm_mdl$Material_Chip$deleteIcon = function (icon) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					deleteIcon: _elm_lang$core$Maybe$Just(icon)
				});
		});
};
var _debois$elm_mdl$Material_Chip$defaultConfig = {
	deleteIcon: _elm_lang$core$Maybe$Nothing,
	deleteLink: _elm_lang$core$Maybe$Nothing,
	deleteClick: _elm_lang$core$Maybe$Nothing,
	listeners: _elm_lang$core$Native_List.fromArray(
		[])
};
var _debois$elm_mdl$Material_Chip$Config = F4(
	function (a, b, c, d) {
		return {deleteIcon: a, deleteLink: b, deleteClick: c, listeners: d};
	});
var _debois$elm_mdl$Material_Chip$Action = F3(
	function (a, b, c) {
		return {ctor: 'Action', _0: a, _1: b, _2: c};
	});
var _debois$elm_mdl$Material_Chip$action = _debois$elm_mdl$Material_Chip$Action;
var _debois$elm_mdl$Material_Chip$getActionElement = function (config) {
	var click = function () {
		var _p3 = config.deleteClick;
		if (_p3.ctor === 'Just') {
			return _debois$elm_mdl$Material_Options_Internal$attribute(_p3._0);
		} else {
			return _debois$elm_mdl$Material_Options$nop;
		}
	}();
	var link = function () {
		var _p4 = config.deleteLink;
		if (_p4.ctor === 'Just') {
			return _debois$elm_mdl$Material_Options_Internal$attribute(_p4._0);
		} else {
			return _debois$elm_mdl$Material_Options$nop;
		}
	}();
	var hasClick = _debois$elm_mdl$Material_Chip$hasValue(config.deleteClick);
	var hasLink = _debois$elm_mdl$Material_Chip$hasValue(config.deleteLink);
	var actionElement = hasLink ? _elm_lang$html$Html$a : _elm_lang$html$Html$span;
	var hasIcon = _debois$elm_mdl$Material_Chip$hasValue(config.deleteIcon);
	var icon = hasIcon ? A2(_elm_lang$core$Maybe$withDefault, '', config.deleteIcon) : ((hasLink || hasClick) ? A2(_elm_lang$core$Maybe$withDefault, 'cancel', config.deleteIcon) : '');
	var isDeletable = hasIcon || (hasLink || hasClick);
	return isDeletable ? _elm_lang$core$Maybe$Just(
		A3(
			_debois$elm_mdl$Material_Chip$action,
			actionElement,
			_elm_lang$core$Native_List.fromArray(
				[link, click]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_Icon$view,
					icon,
					_elm_lang$core$Native_List.fromArray(
						[]))
				]))) : _elm_lang$core$Maybe$Nothing;
};
var _debois$elm_mdl$Material_Chip$chip = F3(
	function (element, props, items) {
		var isContact = A2(
			_elm_lang$core$List$any,
			function (x) {
				return _elm_lang$core$Native_Utils.eq(
					_debois$elm_mdl$Material_Chip$priority(x),
					0);
			},
			items);
		var summary = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Chip$defaultConfig, props);
		var config = summary.config;
		var listeners = config.listeners;
		var action = _debois$elm_mdl$Material_Chip$getActionElement(config);
		var isDeletable = _debois$elm_mdl$Material_Chip$hasValue(action);
		var withIcon = A2(
			_elm_lang$core$Basics_ops['++'],
			function () {
				var _p5 = action;
				if (_p5.ctor === 'Just') {
					return _elm_lang$core$Native_List.fromArray(
						[_p5._0]);
				} else {
					return _elm_lang$core$Native_List.fromArray(
						[]);
				}
			}(),
			items);
		var content = A2(
			_elm_lang$core$List$map,
			_debois$elm_mdl$Material_Chip$renderItem,
			A2(_elm_lang$core$List$sortBy, _debois$elm_mdl$Material_Chip$priority, withIcon));
		return A4(
			_debois$elm_mdl$Material_Options$styled$,
			element,
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Options$cs('mdl-chip'),
						A2(
						_debois$elm_mdl$Material_Options$when,
						_debois$elm_mdl$Material_Options$cs('mdl-chip--contact'),
						isContact),
						A2(
						_debois$elm_mdl$Material_Options$when,
						_debois$elm_mdl$Material_Options$cs('mdl-chip--deletable'),
						isDeletable),
						_debois$elm_mdl$Material_Options_Internal$attribute(
						_debois$elm_mdl$Material_Helpers$blurOn('mouseup')),
						_debois$elm_mdl$Material_Options_Internal$attribute(
						_debois$elm_mdl$Material_Helpers$blurOn('mouseleave')),
						_debois$elm_mdl$Material_Options_Internal$attribute(
						_debois$elm_mdl$Material_Helpers$blurOn('touchend'))
					]),
				props),
			listeners,
			content);
	});
var _debois$elm_mdl$Material_Chip$button = function (props) {
	return A2(
		_debois$elm_mdl$Material_Chip$chip,
		_elm_lang$html$Html$button,
		A2(
			_elm_lang$core$List_ops['::'],
			_debois$elm_mdl$Material_Options_Internal$attribute(
				_elm_lang$html$Html_Attributes$type$('button')),
			props));
};
var _debois$elm_mdl$Material_Chip$span = _debois$elm_mdl$Material_Chip$chip(_elm_lang$html$Html$span);
var _debois$elm_mdl$Material_Chip$Text = F2(
	function (a, b) {
		return {ctor: 'Text', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Chip$content = _debois$elm_mdl$Material_Chip$Text;
var _debois$elm_mdl$Material_Chip$text = F2(
	function (props, txt) {
		return A2(
			_debois$elm_mdl$Material_Chip$Text,
			props,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text(txt)
				]));
	});
var _debois$elm_mdl$Material_Chip$Contact = F3(
	function (a, b, c) {
		return {ctor: 'Contact', _0: a, _1: b, _2: c};
	});
var _debois$elm_mdl$Material_Chip$contact = _debois$elm_mdl$Material_Chip$Contact;

var _debois$elm_mdl$Demo_Chips$references = _elm_lang$core$Native_List.fromArray(
	[
		_debois$elm_mdl$Demo_Page$package('http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Chip'),
		_debois$elm_mdl$Demo_Page$mds('https://www.google.com/design/spec/components/chips.html'),
		_debois$elm_mdl$Demo_Page$mdl('https://www.getmdl.io/components/index.html#chips-section')
	]);
var _debois$elm_mdl$Demo_Chips$srcUrl = 'https://github.com/debois/elm-mdl/blob/master/demo/Demo/Chips.elm';
var _debois$elm_mdl$Demo_Chips$intro = A2(_debois$elm_mdl$Demo_Page$fromMDL, 'https://www.getmdl.io/components/index.html#chips-section', '\n> The Material Design Lite (MDL) chip component is a small, interactive element.\n> Chips are commonly used for contacts, text, rules, icons, and photos.\n');
var _debois$elm_mdl$Demo_Chips$demoContainer = function (_p0) {
	var _p1 = _p0;
	return A2(
		_debois$elm_mdl$Material_Grid$cell,
		_elm_lang$core$Native_List.fromArray(
			[
				A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 6)
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_Options$div,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Options$css, 'text-align', 'center')
					]),
				_elm_lang$core$Native_List.fromArray(
					[_p1._0])),
				A2(
				_debois$elm_mdl$Demo_Code$code,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Options$css, 'margin', '32px 0')
					]),
				_p1._1)
			]));
};
var _debois$elm_mdl$Demo_Chips$demoChips = A2(
	_elm_lang$core$List$map,
	_debois$elm_mdl$Demo_Chips$demoContainer,
	_elm_lang$core$Native_List.fromArray(
		[
			{
			ctor: '_Tuple2',
			_0: A2(
				_debois$elm_mdl$Material_Chip$span,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Chip$content,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Basic Chip')
							]))
					])),
			_1: '\n      Chip.span []\n        [ Chip.content []\n            [ text \"Basic Chip\" ]\n        ]\n       '
		},
			{
			ctor: '_Tuple2',
			_0: A2(
				_debois$elm_mdl$Material_Chip$span,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Chip$deleteIcon('cancel')
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Chip$content,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Deletable Chip')
							]))
					])),
			_1: '\n      Chip.span\n        [ Chip.deleteIcon \"cancel\" ]\n        [ Chip.content []\n            [ text \"Deletable Chip\" ]\n        ]\n       '
		},
			{
			ctor: '_Tuple2',
			_0: A2(
				_debois$elm_mdl$Material_Chip$button,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Chip$content,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Button Chip')
							]))
					])),
			_1: '\n      Chip.button []\n        [ Chip.content []\n            [ text \"Button Chip\" ]\n        ]\n       '
		},
			{
			ctor: '_Tuple2',
			_0: A2(
				_debois$elm_mdl$Material_Chip$span,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A3(
						_debois$elm_mdl$Material_Chip$contact,
						_elm_lang$html$Html$span,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Color$background(_debois$elm_mdl$Material_Color$primary),
								_debois$elm_mdl$Material_Color$text(_debois$elm_mdl$Material_Color$white)
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('A')
							])),
						A2(
						_debois$elm_mdl$Material_Chip$content,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Contact Chip')
							]))
					])),
			_1: '\n        Chip.span []\n          [ Chip.contact Html.span\n              [ Color.background Color.primary\n              , Color.text Color.white\n              ]\n              [ text \"A\" ]\n          , Chip.content []\n              [ text \"Contact Chip\" ]\n          ]\n        '
		},
			{
			ctor: '_Tuple2',
			_0: A2(
				_debois$elm_mdl$Material_Chip$span,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Chip$deleteLink('#chips')
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A3(
						_debois$elm_mdl$Material_Chip$contact,
						_elm_lang$html$Html$span,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Color$background(_debois$elm_mdl$Material_Color$primary),
								_debois$elm_mdl$Material_Color$text(_debois$elm_mdl$Material_Color$white)
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('A')
							])),
						A2(
						_debois$elm_mdl$Material_Chip$text,
						_elm_lang$core$Native_List.fromArray(
							[]),
						'Deletable Contact Chip')
					])),
			_1: '\n      Chip.span\n        [ Chip.deleteLink \"#chips\"\n        ]\n        [ Chip.contact Html.span\n            [ Color.background Color.primary\n            , Color.text Color.white\n            ]\n            [ text \"A\" ]\n        , Chip.content []\n            [ text \"Deletable Contact Chip\" ]\n        ]\n       '
		},
			{
			ctor: '_Tuple2',
			_0: A2(
				_debois$elm_mdl$Material_Chip$span,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A3(
						_debois$elm_mdl$Material_Chip$contact,
						_elm_lang$html$Html$img,
						_elm_lang$core$Native_List.fromArray(
							[
								A2(_debois$elm_mdl$Material_Options$css, 'background-image', 'url(\'assets/images/elm.png\')'),
								A2(_debois$elm_mdl$Material_Options$css, 'background-size', 'cover')
							]),
						_elm_lang$core$Native_List.fromArray(
							[])),
						A2(
						_debois$elm_mdl$Material_Chip$content,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Chip with image')
							]))
					])),
			_1: '\n      Chip.span []\n        [ Chip.contact Html.img\n            [ Options.css \"background-image\"\n                \"url(\'assets/images/elm.png\')\"\n            , Options.css \"background-size\"\n                \"cover\"\n            ]\n            []\n        , Chip.content []\n            [ text \"Chip with image\" ]\n        ]\n       '
		}
		]));
var _debois$elm_mdl$Demo_Chips$lastIndex = function (dict) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		0,
		_elm_lang$core$List$head(
			_elm_lang$core$List$reverse(
				_elm_lang$core$Dict$keys(dict))));
};
var _debois$elm_mdl$Demo_Chips$update = F2(
	function (action, model) {
		var _p2 = action;
		switch (_p2.ctor) {
			case 'Mdl':
				return A2(_debois$elm_mdl$Material$update, _p2._0, model);
			case 'ChipClick':
				var details = A2(
					_elm_lang$core$Maybe$withDefault,
					'',
					A2(_elm_lang$core$Dict$get, _p2._0, model.chips));
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{details: details}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'AddChip':
				var index = 1 + _debois$elm_mdl$Demo_Chips$lastIndex(model.chips);
				var model$ = _elm_lang$core$Native_Utils.update(
					model,
					{
						chips: A3(
							_elm_lang$core$Dict$insert,
							index,
							A2(
								_elm_lang$core$Basics_ops['++'],
								_p2._0,
								A2(
									_elm_lang$core$Basics_ops['++'],
									' ',
									_elm_lang$core$Basics$toString(index))),
							model.chips)
					});
				return {ctor: '_Tuple2', _0: model$, _1: _elm_lang$core$Platform_Cmd$none};
			default:
				var _p3 = _p2._0;
				var d$ = A2(
					_elm_lang$core$Maybe$withDefault,
					'',
					A2(_elm_lang$core$Dict$get, _p3, model.chips));
				var details = _elm_lang$core$Native_Utils.eq(d$, model.details) ? '' : model.details;
				var model$ = _elm_lang$core$Native_Utils.update(
					model,
					{
						chips: A2(_elm_lang$core$Dict$remove, _p3, model.chips),
						details: details
					});
				return {ctor: '_Tuple2', _0: model$, _1: _elm_lang$core$Platform_Cmd$none};
		}
	});
var _debois$elm_mdl$Demo_Chips$model = {
	mdl: _debois$elm_mdl$Material$model,
	chips: _elm_lang$core$Dict$fromList(
		_elm_lang$core$Native_List.fromArray(
			[
				{ctor: '_Tuple2', _0: 1, _1: 'Amazing Chip 1'}
			])),
	value: '',
	details: ''
};
var _debois$elm_mdl$Demo_Chips$Model = F4(
	function (a, b, c, d) {
		return {mdl: a, chips: b, value: c, details: d};
	});
var _debois$elm_mdl$Demo_Chips$ChipClick = function (a) {
	return {ctor: 'ChipClick', _0: a};
};
var _debois$elm_mdl$Demo_Chips$RemoveChip = function (a) {
	return {ctor: 'RemoveChip', _0: a};
};
var _debois$elm_mdl$Demo_Chips$AddChip = function (a) {
	return {ctor: 'AddChip', _0: a};
};
var _debois$elm_mdl$Demo_Chips$Mdl = function (a) {
	return {ctor: 'Mdl', _0: a};
};
var _debois$elm_mdl$Demo_Chips$view = function (model) {
	var interactive = _elm_lang$core$Native_List.fromArray(
		[
			A2(
			_elm_lang$html$Html$h4,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Interactive demo')
				])),
			A2(
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Click on a chip to show its details on a card. Click on the delete icon to remove the chip')
				])),
			A2(
			_debois$elm_mdl$Material_Options$div,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_debois$elm_mdl$Material_Options$css, 'display', 'flex'),
					A2(_debois$elm_mdl$Material_Options$css, 'align-items', 'flex-start'),
					A2(_debois$elm_mdl$Material_Options$css, 'flex-flow', 'row wrap'),
					A2(_debois$elm_mdl$Material_Options$css, 'min-height', '200px')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_Options$div,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Options$css, 'width', '200px'),
							A2(_debois$elm_mdl$Material_Options$css, 'flex-shrink', '0'),
							A2(_debois$elm_mdl$Material_Options$css, 'margin-right', '16px')
						]),
					function () {
						var _p4 = model.details;
						if (_p4 === '') {
							return _elm_lang$core$Native_List.fromArray(
								[]);
						} else {
							return _elm_lang$core$Native_List.fromArray(
								[
									A2(
									_debois$elm_mdl$Material_Card$view,
									_elm_lang$core$Native_List.fromArray(
										[
											A2(_debois$elm_mdl$Material_Options$css, 'width', '200px'),
											_debois$elm_mdl$Material_Color$background(
											A2(_debois$elm_mdl$Material_Color$color, _debois$elm_mdl$Material_Color$Pink, _debois$elm_mdl$Material_Color$S500))
										]),
									_elm_lang$core$Native_List.fromArray(
										[
											A2(
											_debois$elm_mdl$Material_Card$title,
											_elm_lang$core$Native_List.fromArray(
												[]),
											_elm_lang$core$Native_List.fromArray(
												[
													A2(
													_debois$elm_mdl$Material_Card$head,
													_elm_lang$core$Native_List.fromArray(
														[
															_debois$elm_mdl$Material_Color$text(_debois$elm_mdl$Material_Color$white)
														]),
													_elm_lang$core$Native_List.fromArray(
														[
															_elm_lang$html$Html$text(model.details)
														]))
												])),
											A2(
											_debois$elm_mdl$Material_Card$text,
											_elm_lang$core$Native_List.fromArray(
												[
													_debois$elm_mdl$Material_Color$text(_debois$elm_mdl$Material_Color$white)
												]),
											_elm_lang$core$Native_List.fromArray(
												[
													_elm_lang$html$Html$text('Touching a chip opens a full detailed view (either in a card or full screen) or a menu of options related to that chip.')
												]))
										]))
								]);
						}
					}()),
					A2(
					_debois$elm_mdl$Material_Options$div,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Options$css, 'flex-grow', '1'),
							A2(_debois$elm_mdl$Material_Options$css, 'width', '75%')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A3(
							_debois$elm_mdl$Material_Options$styled,
							_elm_lang$html$Html$div,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Color$background(_debois$elm_mdl$Material_Color$white)
								]),
							A2(
								_elm_lang$core$Basics_ops['++'],
								A2(
									_elm_lang$core$List$map,
									function (_p5) {
										var _p6 = _p5;
										var _p7 = _p6._0;
										return A2(
											_debois$elm_mdl$Material_Chip$button,
											_elm_lang$core$Native_List.fromArray(
												[
													A2(_debois$elm_mdl$Material_Options$css, 'margin', '5px 5px'),
													_debois$elm_mdl$Material_Chip$onClick(
													_debois$elm_mdl$Demo_Chips$ChipClick(_p7)),
													_debois$elm_mdl$Material_Chip$deleteClick(
													_debois$elm_mdl$Demo_Chips$RemoveChip(_p7))
												]),
											_elm_lang$core$Native_List.fromArray(
												[
													A2(
													_debois$elm_mdl$Material_Chip$content,
													_elm_lang$core$Native_List.fromArray(
														[]),
													_elm_lang$core$Native_List.fromArray(
														[
															_elm_lang$html$Html$text(_p6._1)
														]))
												]));
									},
									_elm_lang$core$Dict$toList(model.chips)),
								_elm_lang$core$Native_List.fromArray(
									[]))),
							A5(
							_debois$elm_mdl$Material_Button$render,
							_debois$elm_mdl$Demo_Chips$Mdl,
							_elm_lang$core$Native_List.fromArray(
								[0]),
							model.mdl,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Button$colored,
									_debois$elm_mdl$Material_Button$ripple,
									_debois$elm_mdl$Material_Button$raised,
									_debois$elm_mdl$Material_Button$onClick(
									_debois$elm_mdl$Demo_Chips$AddChip('Amazing Chip'))
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Add chip')
								]))
						]))
				])),
			A2(
			_debois$elm_mdl$Demo_Code$code,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_debois$elm_mdl$Material_Options$css, 'margin-top', '20px')
				]),
			'\n            Chip.button\n              [ Options.css \"margin\" \"5px 5px\"\n              , Chip.onClick (ChipClick index)\n              , Chip.deleteClick (RemoveChip index)\n              ]\n              [ Chip.content []\n                  [ text (\"Amazing Chip \" ++ toString index ) ]\n              ]\n           ')
		]);
	var examples = _elm_lang$core$Native_List.fromArray(
		[
			A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$html$Html$p,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text('Example use:')
						])),
					A2(
					_debois$elm_mdl$Material_Grid$grid,
					_elm_lang$core$Native_List.fromArray(
						[]),
					A2(
						_elm_lang$core$List_ops['::'],
						A2(
							_debois$elm_mdl$Material_Grid$cell,
							_elm_lang$core$Native_List.fromArray(
								[
									A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 12)
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_debois$elm_mdl$Demo_Code$code,
									_elm_lang$core$Native_List.fromArray(
										[
											A2(_debois$elm_mdl$Material_Options$css, 'margin', '24px 0')
										]),
									'\n                      import Material.Chip as Chip\n                      ')
								])),
						_debois$elm_mdl$Demo_Chips$demoChips))
				]))
		]);
	return A6(_debois$elm_mdl$Demo_Page$body1$, 'Chips', _debois$elm_mdl$Demo_Chips$srcUrl, _debois$elm_mdl$Demo_Chips$intro, _debois$elm_mdl$Demo_Chips$references, examples, interactive);
};

var _debois$elm_mdl$Material_Dialog$theDialog = 'elm-mdl-singleton-dialog';
var _debois$elm_mdl$Material_Dialog$openOn = function () {
	var handler = A2(
		_elm_lang$core$Basics_ops['++'],
		'\n      // Don\'t mess up the elm runtime.\n      try { \n        var dialog = document.getElementById(\'',
		A2(_elm_lang$core$Basics_ops['++'], _debois$elm_mdl$Material_Dialog$theDialog, '\');\n        if (! dialog) { \n          console.log (\'Cannot display dialog: No dialog element. Use `Dialog.view` to construct one.\');\n          return;\n        }\n        if (! dialog.showModal) {\n          if (typeof dialogPolyfill !== \'undefined\' && dialogPolyfill.registerDialog) { \n            dialogPolyfill.registerDialog(dialog);\n          } else {\n            console.log (\'Cannot display dialog: Your browser does not support the <dialog> element. Get a polyfill at:\\n\\nhttps://github.com/GoogleChrome/dialog-polyfill\\n\');\n            return;\n          }\n        }\n        dialog.showModal();\n      }\n      catch (e) \n      { \n        console.log (\"A dialog method threw an exception. This is not supposed to happen; likely you\'re using a broken polyfill. If not, please file an issue:\\n\\nhttps://github.com/debois/elm-mdl/issues/new\");\n      }\n      '));
	return function (event) {
		return _debois$elm_mdl$Material_Options_Internal$attribute(
			A2(
				_elm_lang$html$Html_Attributes$attribute,
				A2(_elm_lang$core$Basics_ops['++'], 'on', event),
				handler));
	};
}();
var _debois$elm_mdl$Material_Dialog$closeOn = function () {
	var handler = A2(
		_elm_lang$core$Basics_ops['++'],
		' \n      // Don\'t mess up the elm runtime!\n      try {\n        var dialog = document.getElementById(\'',
		A2(_elm_lang$core$Basics_ops['++'], _debois$elm_mdl$Material_Dialog$theDialog, '\');\n        if (! dialog) { \n          console.log (\'Cannot close dialog: No dialog element. Use `Dialog.view` to construct one.\');\n          return;\n        }\n        if (! dialog.open) {\n          console.log (\'Cannot close dialog: The dialog is not open. Use `Dialog.closeOn` only on components rendered inside the dialog.\');\n          return;\n        }\n        if (! dialog.close) {\n          console.log (\'Cannot close dialog: The dialog does not have a `close` method. Perhaps you forgot a polyfill? Get one at:\\n\\nhttps://github.com/GoogleChrome/dialog-polyfill\\n\');\n          return;\n        }\n        dialog.close();\n      } \n      catch (e) \n      { \n        console.log (\"A dialog method threw an exception. This is not supposed to happen; likely you\'re using a broken polyfill. If not, please file an issue:\\n\\nhttps://github.com/debois/elm-mdl/issues/new\");\n      }\n      '));
	return function (event) {
		return _debois$elm_mdl$Material_Options_Internal$attribute(
			A2(
				_elm_lang$html$Html_Attributes$attribute,
				A2(_elm_lang$core$Basics_ops['++'], 'on', event),
				handler));
	};
}();
var _debois$elm_mdl$Material_Dialog$contentBlock = function (block) {
	var _p0 = block;
	switch (_p0.ctor) {
		case 'Title':
			return A2(
				_debois$elm_mdl$Material_Options$div,
				A2(
					_elm_lang$core$List_ops['::'],
					_debois$elm_mdl$Material_Options$cs('mdl-dialog__title'),
					_p0._0),
				_p0._1);
		case 'Content':
			return A2(
				_debois$elm_mdl$Material_Options$div,
				A2(
					_elm_lang$core$List_ops['::'],
					_debois$elm_mdl$Material_Options$cs('mdl-dialog__content'),
					_p0._0),
				_p0._1);
		default:
			return A2(
				_debois$elm_mdl$Material_Options$div,
				A2(
					_elm_lang$core$List_ops['::'],
					_debois$elm_mdl$Material_Options$cs('mdl-dialog__actions'),
					_p0._0),
				_p0._1);
	}
};
var _debois$elm_mdl$Material_Dialog$view = F2(
	function (styling, contentBlocks) {
		return A4(
			_debois$elm_mdl$Material_Options$styled$,
			_elm_lang$html$Html$node('dialog'),
			A2(
				_elm_lang$core$List_ops['::'],
				_debois$elm_mdl$Material_Options$cs('mdl-dialog'),
				styling),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$id(_debois$elm_mdl$Material_Dialog$theDialog)
				]),
			A2(_elm_lang$core$List$map, _debois$elm_mdl$Material_Dialog$contentBlock, contentBlocks));
	});
var _debois$elm_mdl$Material_Dialog$fullWidth = _debois$elm_mdl$Material_Options$cs('mdl-dialog__actions--full-width');
var _debois$elm_mdl$Material_Dialog$Actions = F2(
	function (a, b) {
		return {ctor: 'Actions', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Dialog$actions = _debois$elm_mdl$Material_Dialog$Actions;
var _debois$elm_mdl$Material_Dialog$Content = F2(
	function (a, b) {
		return {ctor: 'Content', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Dialog$content = _debois$elm_mdl$Material_Dialog$Content;
var _debois$elm_mdl$Material_Dialog$Title = F2(
	function (a, b) {
		return {ctor: 'Title', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Dialog$title = _debois$elm_mdl$Material_Dialog$Title;

var _debois$elm_mdl$Demo_Dialog$references = _elm_lang$core$Native_List.fromArray(
	[
		_debois$elm_mdl$Demo_Page$package('http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Dialog'),
		_debois$elm_mdl$Demo_Page$mds('https://material.google.com/components/dialog.html'),
		_debois$elm_mdl$Demo_Page$mdl('https://getmdl.io/components/#dialog-section')
	]);
var _debois$elm_mdl$Demo_Dialog$srcUrl = 'https://github.com/debois/elm-mdl/blob/master/demo/Demo/Dialog.elm';
var _debois$elm_mdl$Demo_Dialog$intro = A2(_debois$elm_mdl$Demo_Page$fromMDL, 'https://getmdl.io/components/#dialog-section', '\n> The Material Design Lite (MDL) dialog component allows for verification of user\n> actions, simple data input, and alerts to provide extra information to users.\n>\n> To use the dialog component, you must be using a browser that supports the\n> dialog element. Only Chrome and Opera have native support at the time of\n> writing. For other browsers you will need to include the dialog polyfill\n> or create your own.\n');
var _debois$elm_mdl$Demo_Dialog$update = F2(
	function (action, model) {
		var _p0 = action;
		return A2(_debois$elm_mdl$Material$update, _p0._0, model);
	});
var _debois$elm_mdl$Demo_Dialog$model = {mdl: _debois$elm_mdl$Material$model};
var _debois$elm_mdl$Demo_Dialog$Model = function (a) {
	return {mdl: a};
};
var _debois$elm_mdl$Demo_Dialog$Mdl = function (a) {
	return {ctor: 'Mdl', _0: a};
};
var _debois$elm_mdl$Demo_Dialog$element = function (model) {
	return A2(
		_debois$elm_mdl$Material_Dialog$view,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_Dialog$title,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('Greetings')
					])),
				A2(
				_debois$elm_mdl$Material_Dialog$content,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_elm_lang$html$Html$p,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('A strange game—the only winning move is not to play.')
							])),
						A2(
						_elm_lang$html$Html$p,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('How about a nice game of chess?')
							]))
					])),
				A2(
				_debois$elm_mdl$Material_Dialog$actions,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A5(
						_debois$elm_mdl$Material_Button$render,
						_debois$elm_mdl$Demo_Dialog$Mdl,
						_elm_lang$core$Native_List.fromArray(
							[0]),
						model.mdl,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Dialog$closeOn('click')
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Chess')
							])),
						A5(
						_debois$elm_mdl$Material_Button$render,
						_debois$elm_mdl$Demo_Dialog$Mdl,
						_elm_lang$core$Native_List.fromArray(
							[1]),
						model.mdl,
						_elm_lang$core$Native_List.fromArray(
							[_debois$elm_mdl$Material_Button$disabled]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('GTNW')
							]))
					]))
			]));
};
var _debois$elm_mdl$Demo_Dialog$view = function (model) {
	return A5(
		_debois$elm_mdl$Demo_Page$body2,
		'Dialog',
		_debois$elm_mdl$Demo_Dialog$srcUrl,
		_debois$elm_mdl$Demo_Dialog$intro,
		_debois$elm_mdl$Demo_Dialog$references,
		_elm_lang$core$Native_List.fromArray(
			[
				A5(
				_debois$elm_mdl$Material_Button$render,
				_debois$elm_mdl$Demo_Dialog$Mdl,
				_elm_lang$core$Native_List.fromArray(
					[1]),
				model.mdl,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Dialog$openOn('click')
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('Open dialog')
					]))
			]));
};

var _debois$elm_mdl$Material_Slider$floatVal = A2(
	_elm_lang$core$Json_Decode$at,
	_elm_lang$core$Native_List.fromArray(
		['target', 'valueAsNumber']),
	_elm_lang$core$Json_Decode$float);
var _debois$elm_mdl$Material_Slider$onChange = function (l) {
	return _debois$elm_mdl$Material_Options$set(
		function (options) {
			return _elm_lang$core$Native_Utils.update(
				options,
				{
					listener: _elm_lang$core$Maybe$Just(l)
				});
		});
};
var _debois$elm_mdl$Material_Slider$disabled = _debois$elm_mdl$Material_Options$set(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{disabled: true});
	});
var _debois$elm_mdl$Material_Slider$step = function (v) {
	return _debois$elm_mdl$Material_Options$set(
		function (options) {
			return _elm_lang$core$Native_Utils.update(
				options,
				{step: v});
		});
};
var _debois$elm_mdl$Material_Slider$max = function (v) {
	return _debois$elm_mdl$Material_Options$set(
		function (options) {
			return _elm_lang$core$Native_Utils.update(
				options,
				{max: v});
		});
};
var _debois$elm_mdl$Material_Slider$min = function (v) {
	return _debois$elm_mdl$Material_Options$set(
		function (options) {
			return _elm_lang$core$Native_Utils.update(
				options,
				{min: v});
		});
};
var _debois$elm_mdl$Material_Slider$value = function (v) {
	return _debois$elm_mdl$Material_Options$set(
		function (options) {
			return _elm_lang$core$Native_Utils.update(
				options,
				{value: v});
		});
};
var _debois$elm_mdl$Material_Slider$defaultConfig = {
	value: 50,
	min: 0,
	max: 100,
	step: 1,
	listener: _elm_lang$core$Maybe$Nothing,
	disabled: false,
	inner: _elm_lang$core$Native_List.fromArray(
		[])
};
var _debois$elm_mdl$Material_Slider$view = function (options) {
	var summary = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Slider$defaultConfig, options);
	var config = summary.config;
	var fraction = (config.value - config.min) / (config.max - config.min);
	var lower = A2(
		_elm_lang$core$Basics_ops['++'],
		_elm_lang$core$Basics$toString(fraction),
		' 1 0%');
	var upper = A2(
		_elm_lang$core$Basics_ops['++'],
		_elm_lang$core$Basics$toString(1 - fraction),
		' 1 0%');
	var background = A3(
		_debois$elm_mdl$Material_Options$styled,
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_debois$elm_mdl$Material_Options$cs('mdl-slider__background-flex')
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				A3(
				_debois$elm_mdl$Material_Options$styled,
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Options$cs('mdl-slider__background-lower'),
						A2(_debois$elm_mdl$Material_Options$css, 'flex', lower)
					]),
				_elm_lang$core$Native_List.fromArray(
					[])),
				A3(
				_debois$elm_mdl$Material_Options$styled,
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Options$cs('mdl-slider__background-upper'),
						A2(_debois$elm_mdl$Material_Options$css, 'flex', upper)
					]),
				_elm_lang$core$Native_List.fromArray(
					[]))
			]));
	var listeners = A2(
		_elm_lang$core$Maybe$withDefault,
		_debois$elm_mdl$Material_Options$nop,
		A2(
			_elm_lang$core$Maybe$map,
			function (f) {
				return _debois$elm_mdl$Material_Options$many(
					A2(
						_elm_lang$core$List$map,
						_debois$elm_mdl$Material_Options_Internal$attribute,
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_elm_lang$html$Html_Events$on,
								'change',
								A2(_elm_lang$core$Json_Decode$map, f, _debois$elm_mdl$Material_Slider$floatVal)),
								A2(
								_elm_lang$html$Html_Events$on,
								'input',
								A2(_elm_lang$core$Json_Decode$map, f, _debois$elm_mdl$Material_Slider$floatVal))
							])));
			},
			config.listener));
	return A5(
		_debois$elm_mdl$Material_Options$apply,
		summary,
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_debois$elm_mdl$Material_Options$cs('mdl-slider__container')
			]),
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				A4(
				_debois$elm_mdl$Material_Options$styled$,
				_elm_lang$html$Html$input,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Options$cs('mdl-slider'),
						_debois$elm_mdl$Material_Options$cs('mdl-js-slider'),
						_debois$elm_mdl$Material_Options$cs('is-upgraded'),
						A2(
						_debois$elm_mdl$Material_Options$when,
						_debois$elm_mdl$Material_Options$cs('is-lowest-value'),
						_elm_lang$core$Native_Utils.eq(fraction, 0)),
						listeners,
						_debois$elm_mdl$Material_Options$disabled(config.disabled),
						A2(_debois$elm_mdl$Material_Options$css, 'padding', '8px 0'),
						_debois$elm_mdl$Material_Options$many(config.inner)
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$type$('range'),
						_elm_lang$html$Html_Attributes$max(
						_elm_lang$core$Basics$toString(config.max)),
						_elm_lang$html$Html_Attributes$min(
						_elm_lang$core$Basics$toString(config.min)),
						_elm_lang$html$Html_Attributes$step(
						_elm_lang$core$Basics$toString(config.step)),
						_elm_lang$html$Html_Attributes$value(
						_elm_lang$core$Basics$toString(config.value)),
						_debois$elm_mdl$Material_Helpers$blurOn('mouseup')
					]),
				_elm_lang$core$Native_List.fromArray(
					[])),
				background
			]));
};
var _debois$elm_mdl$Material_Slider$Config = F7(
	function (a, b, c, d, e, f, g) {
		return {value: a, min: b, max: c, step: d, listener: e, disabled: f, inner: g};
	});

var _debois$elm_mdl$Demo_Elevation$references = _elm_lang$core$Native_List.fromArray(
	[
		_debois$elm_mdl$Demo_Page$package('http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Elevation'),
		_debois$elm_mdl$Demo_Page$mds('https://www.google.com/design/spec/what-is-material/elevation-shadows.html'),
		_debois$elm_mdl$Demo_Page$mdl('https://github.com/google/material-design-lite/blob/master/src/shadow/README.md')
	]);
var _debois$elm_mdl$Demo_Elevation$srcUrl = 'https://github.com/debois/elm-mdl/blob/master/demo/Demo/Elevation.elm';
var _debois$elm_mdl$Demo_Elevation$intro = A2(_debois$elm_mdl$Demo_Page$fromMDL, 'https://github.com/google/material-design-lite/blob/master/src/shadow/README.md', '\n  > The Material Design Lite (MDL) shadow is not a component in the same sense as\n> an MDL card, menu, or textbox; it is a visual effect that can be assigned to a\n> user interface element. The effect simulates a three-dimensional positioning of\n> the element, as though it is slightly raised above the surface it rests upon —\n> a positive z-axis value, in user interface terms. The shadow starts at the\n> edges of the element and gradually fades outward, providing a realistic 3-D\n> effect.\n> \n> Shadows are a convenient and intuitive means of distinguishing an element from\n> its surroundings. A shadow can draw the user\'s eye to an object and emphasize\n> the object\'s importance, uniqueness, or immediacy.\n> \n> Shadows are a well-established feature in user interfaces, and provide users\n> with a visual clue to an object\'s intended use or value. Their design and use\n> is an important factor in the overall user experience.)\n\nThe [Material Design Specification](https://www.google.com/design/spec/what-is-material/elevation-shadows.html#elevation-shadows-elevation-android-)\npre-defines appropriate elevation for most UI elements; you need to manually\nassign shadows only to your own elements. \n\nYou are encouraged to visit the\n[Material Design specification](https://www.google.com/design/spec/what-is-material/elevation-shadows.html)\nfor details about appropriate use of shadows. \n');
var _debois$elm_mdl$Demo_Elevation$noElevations = _elm_lang$core$Basics$toFloat(
	_elm_lang$core$Array$length(_debois$elm_mdl$Material_Elevation$elevations));
var _debois$elm_mdl$Demo_Elevation$elevate = F2(
	function (model, _p0) {
		var _p1 = _p0;
		return A2(
			_debois$elm_mdl$Material_Options$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_p1._0,
					A2(_debois$elm_mdl$Material_Options$css, 'height', '96px'),
					A2(_debois$elm_mdl$Material_Options$css, 'width', '128px'),
					A2(_debois$elm_mdl$Material_Options$css, 'margin', '40px'),
					A2(_debois$elm_mdl$Material_Options$css, 'display', 'inline-flex'),
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Elevation$transition(300),
					model.transition),
					_debois$elm_mdl$Material_Options$center
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_Options$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Typography$title,
							A2(_debois$elm_mdl$Material_Options$css, 'box-radius', '2pt')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text(
							_elm_lang$core$Basics$toString(_p1._1))
						]))
				]));
	});
var _debois$elm_mdl$Demo_Elevation$update = F2(
	function (msg, model) {
		var _p2 = msg;
		switch (_p2.ctor) {
			case 'SetElevation':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{elevation: _p2._0}),
					_elm_lang$core$Native_List.fromArray(
						[]));
			case 'FlipTransition':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							transition: _elm_lang$core$Basics$not(model.transition)
						}),
					_elm_lang$core$Native_List.fromArray(
						[]));
			default:
				return A2(_debois$elm_mdl$Material$update, _p2._0, model);
		}
	});
var _debois$elm_mdl$Demo_Elevation$model = {transition: false, elevation: 1, mdl: _debois$elm_mdl$Material$model};
var _debois$elm_mdl$Demo_Elevation$Model = F3(
	function (a, b, c) {
		return {transition: a, elevation: b, mdl: c};
	});
var _debois$elm_mdl$Demo_Elevation$Mdl = function (a) {
	return {ctor: 'Mdl', _0: a};
};
var _debois$elm_mdl$Demo_Elevation$FlipTransition = {ctor: 'FlipTransition'};
var _debois$elm_mdl$Demo_Elevation$SetElevation = function (a) {
	return {ctor: 'SetElevation', _0: a};
};
var _debois$elm_mdl$Demo_Elevation$demo2 = function (model) {
	var _p3 = A2(
		_elm_lang$core$Maybe$withDefault,
		{ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Elevation$e0, _1: 0},
		A2(_elm_lang$core$Array$get, model.elevation, _debois$elm_mdl$Material_Elevation$elevations));
	var e = _p3._0;
	var k = _p3._1;
	var code = A2(
		_elm_lang$core$Basics_ops['++'],
		'\n      Options.div\n        [ Elevation.e',
		A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(k),
			A2(
				_elm_lang$core$Basics_ops['++'],
				'\n        , css \"height\" \"96px\"\n        , css \"width\"  \"128px\" ',
				A2(
					_elm_lang$core$Basics_ops['++'],
					model.transition ? '\n        , Elevation.transition 300' : '',
					A2(
						_elm_lang$core$Basics_ops['++'],
						'\n        , Options.center\n        ]\n        [ text \"',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(k),
							'\" ]'))))));
	return _elm_lang$core$Native_List.fromArray(
		[
			A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$h4,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Elevator')
				])),
			A2(
			_debois$elm_mdl$Material_Options$div,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_debois$elm_mdl$Material_Options$css, 'display', 'flex'),
					A2(_debois$elm_mdl$Material_Options$css, 'align-items', 'center'),
					A2(_debois$elm_mdl$Material_Options$css, 'flex-flow', 'row wrap')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Demo_Elevation$elevate,
					model,
					{ctor: '_Tuple2', _0: e, _1: k}),
					A2(
					_debois$elm_mdl$Material_Options$div,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Options$css, 'flex-direction', 'column'),
							A2(_debois$elm_mdl$Material_Options$css, 'justify-content', 'center'),
							A2(_debois$elm_mdl$Material_Options$css, 'flex-grow', '1'),
							A2(_debois$elm_mdl$Material_Options$css, 'min-width', '256px')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Slider$view(
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Slider$onChange(
									function (_p4) {
										return _debois$elm_mdl$Demo_Elevation$SetElevation(
											_elm_lang$core$Basics$floor(_p4));
									}),
									_debois$elm_mdl$Material_Slider$value(
									_elm_lang$core$Basics$toFloat(model.elevation)),
									_debois$elm_mdl$Material_Slider$min(0),
									_debois$elm_mdl$Material_Slider$max(_debois$elm_mdl$Demo_Elevation$noElevations - 1),
									_debois$elm_mdl$Material_Slider$step(1),
									A2(_debois$elm_mdl$Material_Options$css, 'max-width', '384px')
								])),
							A5(
							_debois$elm_mdl$Material_Toggles$switch,
							_debois$elm_mdl$Demo_Elevation$Mdl,
							_elm_lang$core$Native_List.fromArray(
								[0]),
							model.mdl,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Toggles$onClick(_debois$elm_mdl$Demo_Elevation$FlipTransition),
									_debois$elm_mdl$Material_Toggles$value(model.transition),
									A2(_debois$elm_mdl$Material_Options$css, 'margin-left', '20px'),
									A2(_debois$elm_mdl$Material_Options$css, 'margin-top', '24px')
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Animate')
								]))
						]))
				])),
			A2(
			_debois$elm_mdl$Demo_Code$code,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_debois$elm_mdl$Material_Options$css, 'margin', '40px')
				]),
			code)
		]);
};
var _debois$elm_mdl$Demo_Elevation$view = function (model) {
	var boxes = _elm_lang$core$Array$toList(
		A2(
			_elm_lang$core$Array$map,
			_debois$elm_mdl$Demo_Elevation$elevate(model),
			_debois$elm_mdl$Material_Elevation$elevations));
	var demo1 = A2(
		_elm_lang$core$List$append,
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$p,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('Below are boxes drawn at various elevations.')
					]))
			]),
		boxes);
	return A6(
		_debois$elm_mdl$Demo_Page$body1$,
		'Elevation',
		_debois$elm_mdl$Demo_Elevation$srcUrl,
		_debois$elm_mdl$Demo_Elevation$intro,
		_debois$elm_mdl$Demo_Elevation$references,
		demo1,
		_debois$elm_mdl$Demo_Elevation$demo2(model));
};

//import Maybe, Native.List //

var _elm_lang$core$Native_Regex = function() {

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
				? _elm_lang$core$Maybe$Nothing
				: _elm_lang$core$Maybe$Just(submatch);
		}
		out.push({
			match: result[0],
			submatches: _elm_lang$core$Native_List.fromArray(subs),
			index: result.index,
			number: number
		});
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _elm_lang$core$Native_List.fromArray(out);
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
				? _elm_lang$core$Maybe$Nothing
				: _elm_lang$core$Maybe$Just(submatch);
		}
		return replacer({
			match: match,
			submatches: _elm_lang$core$Native_List.fromArray(submatches),
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
		return _elm_lang$core$Native_List.fromArray(str.split(re));
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
	return _elm_lang$core$Native_List.fromArray(out);
}

return {
	regex: regex,
	caseInsensitive: caseInsensitive,
	escape: escape,

	contains: F2(contains),
	find: F3(find),
	replace: F4(replace),
	split: F3(split)
};

}();

var _elm_lang$core$Regex$split = _elm_lang$core$Native_Regex.split;
var _elm_lang$core$Regex$replace = _elm_lang$core$Native_Regex.replace;
var _elm_lang$core$Regex$find = _elm_lang$core$Native_Regex.find;
var _elm_lang$core$Regex$contains = _elm_lang$core$Native_Regex.contains;
var _elm_lang$core$Regex$caseInsensitive = _elm_lang$core$Native_Regex.caseInsensitive;
var _elm_lang$core$Regex$regex = _elm_lang$core$Native_Regex.regex;
var _elm_lang$core$Regex$escape = _elm_lang$core$Native_Regex.escape;
var _elm_lang$core$Regex$Match = F4(
	function (a, b, c, d) {
		return {match: a, submatches: b, index: c, number: d};
	});
var _elm_lang$core$Regex$Regex = {ctor: 'Regex'};
var _elm_lang$core$Regex$AtMost = function (a) {
	return {ctor: 'AtMost', _0: a};
};
var _elm_lang$core$Regex$All = {ctor: 'All'};

var _debois$elm_mdl$Material_Footer$tempPrefix = '{{prefix}}';
var _debois$elm_mdl$Material_Footer$prefixRegex = _elm_lang$core$Regex$regex(_debois$elm_mdl$Material_Footer$tempPrefix);
var _debois$elm_mdl$Material_Footer$removePrefix = A3(
	_elm_lang$core$Regex$replace,
	_elm_lang$core$Regex$All,
	_debois$elm_mdl$Material_Footer$prefixRegex,
	function (_p0) {
		return '';
	});
var _debois$elm_mdl$Material_Footer$prefixedClass = function (cls) {
	return _debois$elm_mdl$Material_Options$cs(
		A2(_elm_lang$core$Basics_ops['++'], _debois$elm_mdl$Material_Footer$tempPrefix, cls));
};
var _debois$elm_mdl$Material_Footer$socialBtn = _debois$elm_mdl$Material_Footer$prefixedClass('social-btn');
var _debois$elm_mdl$Material_Footer$headingClass = _debois$elm_mdl$Material_Footer$prefixedClass('heading');
var _debois$elm_mdl$Material_Footer$href = function (_p1) {
	return _debois$elm_mdl$Material_Options_Internal$attribute(
		_elm_lang$html$Html_Attributes$href(_p1));
};
var _debois$elm_mdl$Material_Footer$onClick = function (_p2) {
	return _debois$elm_mdl$Material_Options_Internal$attribute(
		_elm_lang$html$Html_Events$onClick(_p2));
};
var _debois$elm_mdl$Material_Footer$separator = '__';
var _debois$elm_mdl$Material_Footer$prefix = function (tp) {
	var _p3 = tp;
	if (_p3.ctor === 'Mini') {
		return 'mdl-mini-footer';
	} else {
		return 'mdl-mega-footer';
	}
};
var _debois$elm_mdl$Material_Footer$applyPrefix = F2(
	function (tp, prop) {
		var sep = _debois$elm_mdl$Material_Footer$separator;
		var pref = _debois$elm_mdl$Material_Footer$prefix(tp);
		var _p4 = prop;
		switch (_p4.ctor) {
			case 'Class':
				var _p5 = _p4._0;
				return A2(_elm_lang$core$String$startsWith, _debois$elm_mdl$Material_Footer$tempPrefix, _p5) ? _debois$elm_mdl$Material_Options$cs(
					A2(
						_elm_lang$core$Basics_ops['++'],
						pref,
						A2(
							_elm_lang$core$Basics_ops['++'],
							sep,
							_debois$elm_mdl$Material_Footer$removePrefix(_p5)))) : prop;
			case 'Many':
				return _debois$elm_mdl$Material_Options$many(
					A2(
						_elm_lang$core$List$map,
						_debois$elm_mdl$Material_Footer$applyPrefix(tp),
						_p4._0));
			default:
				return prop;
		}
	});
var _debois$elm_mdl$Material_Footer$toHtml = F2(
	function (tp, _p6) {
		var _p7 = _p6;
		var styles$ = A2(
			_elm_lang$core$List$map,
			_debois$elm_mdl$Material_Footer$applyPrefix(tp),
			_p7.styles);
		return A3(
			_debois$elm_mdl$Material_Options$styled,
			_p7.elem,
			styles$,
			A2(
				_elm_lang$core$List$map,
				_debois$elm_mdl$Material_Footer$contentToHtml(tp),
				_p7.content));
	});
var _debois$elm_mdl$Material_Footer$contentToHtml = F2(
	function (tp, content) {
		var _p8 = content;
		if (_p8.ctor === 'HtmlContent') {
			return _p8._0;
		} else {
			return A2(_debois$elm_mdl$Material_Footer$toHtml, tp, _p8._0);
		}
	});
var _debois$elm_mdl$Material_Footer$sectionContent = F3(
	function (tp, section, content) {
		var sep = _debois$elm_mdl$Material_Footer$separator;
		var pref = _debois$elm_mdl$Material_Footer$prefix(tp);
		var _p9 = content;
		if (_p9.ctor === 'HtmlContent') {
			return A3(
				_debois$elm_mdl$Material_Options$styled,
				_elm_lang$html$Html$div,
				A2(
					_elm_lang$core$List_ops['::'],
					_debois$elm_mdl$Material_Options$cs(
						A2(
							_elm_lang$core$Basics_ops['++'],
							pref,
							A2(_elm_lang$core$Basics_ops['++'], sep, section))),
					_elm_lang$core$Native_List.fromArray(
						[])),
				_elm_lang$core$Native_List.fromArray(
					[_p9._0]));
		} else {
			return A3(
				_debois$elm_mdl$Material_Options$styled,
				_p9._0.elem,
				A2(
					_elm_lang$core$List_ops['::'],
					_debois$elm_mdl$Material_Options$cs(
						A2(
							_elm_lang$core$Basics_ops['++'],
							pref,
							A2(_elm_lang$core$Basics_ops['++'], sep, section))),
					_p9._0.styles),
				A2(
					_elm_lang$core$List$map,
					_debois$elm_mdl$Material_Footer$contentToHtml(tp),
					_p9._0.content));
		}
	});
var _debois$elm_mdl$Material_Footer$leftHtml = F2(
	function (tp, left) {
		var _p10 = left;
		if (_p10.ctor === 'Just') {
			return _elm_lang$core$Native_List.fromArray(
				[
					A3(_debois$elm_mdl$Material_Footer$sectionContent, tp, 'left-section', _p10._0._0)
				]);
		} else {
			return _elm_lang$core$Native_List.fromArray(
				[]);
		}
	});
var _debois$elm_mdl$Material_Footer$rightHtml = F2(
	function (tp, right) {
		var _p11 = right;
		if (_p11.ctor === 'Just') {
			return _elm_lang$core$Native_List.fromArray(
				[
					A3(_debois$elm_mdl$Material_Footer$sectionContent, tp, 'right-section', _p11._0._0)
				]);
		} else {
			return _elm_lang$core$Native_List.fromArray(
				[]);
		}
	});
var _debois$elm_mdl$Material_Footer$Footer = F3(
	function (a, b, c) {
		return {styles: a, content: b, elem: c};
	});
var _debois$elm_mdl$Material_Footer$MiniFooter = F2(
	function (a, b) {
		return {left: a, right: b};
	});
var _debois$elm_mdl$Material_Footer$MegaFooter = F3(
	function (a, b, c) {
		return {top: a, bottom: b, middle: c};
	});
var _debois$elm_mdl$Material_Footer$Mega = {ctor: 'Mega'};
var _debois$elm_mdl$Material_Footer$mega = F2(
	function (props, _p12) {
		var _p13 = _p12;
		var sep = _debois$elm_mdl$Material_Footer$separator;
		var tp = _debois$elm_mdl$Material_Footer$Mega;
		var pref = _debois$elm_mdl$Material_Footer$prefix(tp);
		var topContent = function () {
			var _p14 = _p13.top;
			if (_p14.ctor === 'Nothing') {
				return _elm_lang$core$Native_List.fromArray(
					[]);
			} else {
				return _elm_lang$core$Native_List.fromArray(
					[
						A3(
						_debois$elm_mdl$Material_Options$styled,
						_elm_lang$html$Html$div,
						A2(
							_elm_lang$core$List_ops['::'],
							_debois$elm_mdl$Material_Options$cs(
								A2(
									_elm_lang$core$Basics_ops['++'],
									pref,
									A2(_elm_lang$core$Basics_ops['++'], sep, 'top-section'))),
							_p14._0._0.props),
						A2(
							_elm_lang$core$Basics_ops['++'],
							A2(_debois$elm_mdl$Material_Footer$leftHtml, tp, _p14._0._0.left),
							A2(_debois$elm_mdl$Material_Footer$rightHtml, tp, _p14._0._0.right)))
					]);
			}
		}();
		var middleContent = function () {
			var _p15 = _p13.middle;
			if (_p15.ctor === 'Nothing') {
				return _elm_lang$core$Native_List.fromArray(
					[]);
			} else {
				return _elm_lang$core$Native_List.fromArray(
					[
						A3(
						_debois$elm_mdl$Material_Options$styled,
						_elm_lang$html$Html$div,
						A2(
							_elm_lang$core$List_ops['::'],
							_debois$elm_mdl$Material_Options$cs(
								A2(
									_elm_lang$core$Basics_ops['++'],
									pref,
									A2(_elm_lang$core$Basics_ops['++'], sep, 'middle-section'))),
							_p15._0._0.props),
						A2(
							_elm_lang$core$List$map,
							_debois$elm_mdl$Material_Footer$contentToHtml(tp),
							_p15._0._0.content))
					]);
			}
		}();
		var bottomContent = function () {
			var _p16 = _p13.bottom;
			if (_p16.ctor === 'Nothing') {
				return _elm_lang$core$Native_List.fromArray(
					[]);
			} else {
				return _elm_lang$core$Native_List.fromArray(
					[
						A3(
						_debois$elm_mdl$Material_Options$styled,
						_elm_lang$html$Html$div,
						A2(
							_elm_lang$core$List_ops['::'],
							_debois$elm_mdl$Material_Options$cs(
								A2(
									_elm_lang$core$Basics_ops['++'],
									pref,
									A2(_elm_lang$core$Basics_ops['++'], sep, 'bottom-section'))),
							_p16._0._0.props),
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Native_List.fromArray(
								[]),
							A2(
								_elm_lang$core$List$map,
								_debois$elm_mdl$Material_Footer$contentToHtml(tp),
								_p16._0._0.content)))
					]);
			}
		}();
		return A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$footer,
			A2(
				_elm_lang$core$List_ops['::'],
				_debois$elm_mdl$Material_Options$cs(pref),
				props),
			A2(
				_elm_lang$core$Basics_ops['++'],
				topContent,
				A2(_elm_lang$core$Basics_ops['++'], middleContent, bottomContent)));
	});
var _debois$elm_mdl$Material_Footer$Mini = {ctor: 'Mini'};
var _debois$elm_mdl$Material_Footer$mini = F2(
	function (props, _p17) {
		var _p18 = _p17;
		var tp = _debois$elm_mdl$Material_Footer$Mini;
		var pref = _debois$elm_mdl$Material_Footer$prefix(tp);
		var leftContent = A2(_debois$elm_mdl$Material_Footer$leftHtml, tp, _p18.left);
		var rightContent = A2(_debois$elm_mdl$Material_Footer$rightHtml, tp, _p18.right);
		return A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$footer,
			A2(
				_elm_lang$core$List_ops['::'],
				_debois$elm_mdl$Material_Options$cs(pref),
				props),
			A2(_elm_lang$core$Basics_ops['++'], leftContent, rightContent));
	});
var _debois$elm_mdl$Material_Footer$FooterProperty = {ctor: 'FooterProperty'};
var _debois$elm_mdl$Material_Footer$Content = function (a) {
	return {ctor: 'Content', _0: a};
};
var _debois$elm_mdl$Material_Footer$logo = F2(
	function (styles, content) {
		return _debois$elm_mdl$Material_Footer$Content(
			{
				styles: A2(
					_elm_lang$core$List_ops['::'],
					_debois$elm_mdl$Material_Options$cs('mdl-logo'),
					styles),
				content: content,
				elem: _elm_lang$html$Html$div
			});
	});
var _debois$elm_mdl$Material_Footer$links = F2(
	function (styles, content) {
		return _debois$elm_mdl$Material_Footer$Content(
			{
				styles: A2(
					_elm_lang$core$List_ops['::'],
					_debois$elm_mdl$Material_Footer$prefixedClass('link-list'),
					styles),
				content: content,
				elem: _elm_lang$html$Html$ul
			});
	});
var _debois$elm_mdl$Material_Footer$linkItem = F2(
	function (styles, content) {
		return _debois$elm_mdl$Material_Footer$Content(
			{
				styles: _elm_lang$core$Native_List.fromArray(
					[]),
				content: _elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Footer$Content(
						{styles: styles, content: content, elem: _elm_lang$html$Html$a})
					]),
				elem: _elm_lang$html$Html$li
			});
	});
var _debois$elm_mdl$Material_Footer$heading = F2(
	function (styles, content) {
		return _debois$elm_mdl$Material_Footer$Content(
			{
				styles: A2(_elm_lang$core$List_ops['::'], _debois$elm_mdl$Material_Footer$headingClass, styles),
				content: content,
				elem: _elm_lang$html$Html$h1
			});
	});
var _debois$elm_mdl$Material_Footer$socialButton = F2(
	function (styles, content) {
		return _debois$elm_mdl$Material_Footer$Content(
			{
				styles: A2(_elm_lang$core$List_ops['::'], _debois$elm_mdl$Material_Footer$socialBtn, styles),
				content: content,
				elem: _elm_lang$html$Html$button
			});
	});
var _debois$elm_mdl$Material_Footer$HtmlContent = function (a) {
	return {ctor: 'HtmlContent', _0: a};
};
var _debois$elm_mdl$Material_Footer$checkbox = _debois$elm_mdl$Material_Footer$HtmlContent(
	A2(
		_elm_lang$html$Html$input,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$class('mdl-mega-footer__heading-checkbox'),
				_elm_lang$html$Html_Attributes$type$('checkbox'),
				A2(_elm_lang$html$Html_Attributes$attribute, 'checked', '')
			]),
		_elm_lang$core$Native_List.fromArray(
			[])));
var _debois$elm_mdl$Material_Footer$dropdown = F2(
	function (props, content) {
		return _debois$elm_mdl$Material_Footer$Content(
			{
				styles: A2(
					_elm_lang$core$List_ops['::'],
					_debois$elm_mdl$Material_Options$cs('mdl-mega-footer__drop-down-section'),
					props),
				content: A2(_elm_lang$core$List_ops['::'], _debois$elm_mdl$Material_Footer$checkbox, content),
				elem: _elm_lang$html$Html$div
			});
	});
var _debois$elm_mdl$Material_Footer$html = _debois$elm_mdl$Material_Footer$HtmlContent;
var _debois$elm_mdl$Material_Footer$link = F2(
	function (styles, contents) {
		return _debois$elm_mdl$Material_Footer$html(
			A3(_debois$elm_mdl$Material_Options$styled, _elm_lang$html$Html$a, styles, contents));
	});
var _debois$elm_mdl$Material_Footer$li = F2(
	function (styles, content) {
		return _debois$elm_mdl$Material_Footer$html(
			A3(_debois$elm_mdl$Material_Options$styled, _elm_lang$html$Html$li, styles, content));
	});
var _debois$elm_mdl$Material_Footer$Section = function (a) {
	return {ctor: 'Section', _0: a};
};
var _debois$elm_mdl$Material_Footer$left = F2(
	function (styles, content) {
		return function (_p19) {
			return _elm_lang$core$Maybe$Just(
				_debois$elm_mdl$Material_Footer$Section(_p19));
		}(
			_debois$elm_mdl$Material_Footer$Content(
				{styles: styles, content: content, elem: _elm_lang$html$Html$div}));
	});
var _debois$elm_mdl$Material_Footer$right = F2(
	function (styles, content) {
		return function (_p20) {
			return _elm_lang$core$Maybe$Just(
				_debois$elm_mdl$Material_Footer$Section(_p20));
		}(
			_debois$elm_mdl$Material_Footer$Content(
				{styles: styles, content: content, elem: _elm_lang$html$Html$div}));
	});
var _debois$elm_mdl$Material_Footer$TopSection = function (a) {
	return {ctor: 'TopSection', _0: a};
};
var _debois$elm_mdl$Material_Footer$top = F2(
	function (props, _p21) {
		var _p22 = _p21;
		return _elm_lang$core$Maybe$Just(
			_debois$elm_mdl$Material_Footer$TopSection(
				{left: _p22.left, right: _p22.right, props: props}));
	});
var _debois$elm_mdl$Material_Footer$BottomSection = function (a) {
	return {ctor: 'BottomSection', _0: a};
};
var _debois$elm_mdl$Material_Footer$bottom = F2(
	function (props, content) {
		return _elm_lang$core$Maybe$Just(
			_debois$elm_mdl$Material_Footer$BottomSection(
				{props: props, content: content}));
	});
var _debois$elm_mdl$Material_Footer$MiddleSection = function (a) {
	return {ctor: 'MiddleSection', _0: a};
};
var _debois$elm_mdl$Material_Footer$middle = F2(
	function (props, content) {
		return _elm_lang$core$Maybe$Just(
			_debois$elm_mdl$Material_Footer$MiddleSection(
				{props: props, content: content}));
	});

var _debois$elm_mdl$Demo_Footer$references = _elm_lang$core$Native_List.fromArray(
	[
		_debois$elm_mdl$Demo_Page$package('http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Footer'),
		_debois$elm_mdl$Demo_Page$mds('https://material.google.com/layout/structure.html'),
		_debois$elm_mdl$Demo_Page$mdl('https://getmdl.io/components/index.html#layout-section/footer')
	]);
var _debois$elm_mdl$Demo_Footer$srcUrl = 'https://github.com/debois/elm-mdl/blob/master/demo/Demo/Footer.elm';
var _debois$elm_mdl$Demo_Footer$intro = A2(_debois$elm_mdl$Demo_Page$fromMDL, 'https://getmdl.io/components/index.html#layout-section/footer', '\n> The Material Design Lite (MDL) footer component is a comprehensive container\n> intended to present a substantial amount of related content in a visually\n> attractive and logically intuitive area. Although it is called \"footer\", it\n> may be placed at any appropriate location on a device screen, either before or\n> after other content.\n>\n> An MDL footer component takes two basic forms: mega-footer and mini-footer. As\n> the names imply, mega-footers contain more (and more complex) content than\n> mini-footers. A mega-footer presents multiple sections of content separated by\n> horizontal rules, while a mini-footer presents a single section of content. Both\n> footer forms have their own internal structures, including required and optional\n> elements, and typically include both informational and clickable content, such\n> as links.\n>\n> Footers, as represented by this component, are a fairly new feature in user\n> interfaces, and allow users to view discrete blocks of content in a coherent and\n> consistently organized way. Their design and use is an important factor in the\n> overall user experience.\n');
var _debois$elm_mdl$Demo_Footer$megaFooterDoc = '\n    Footer.mega []\n      { top = Footer.top []\n          { left = Footer.left []\n              [ Footer.logo [] [ Footer.html <| text \"Mega Footer Top Section\" ]\n              , Footer.socialButton [Options.css \"margin-right\" \"6px\"] []\n              , Footer.socialButton [Options.css \"margin-right\" \"6px\"] []\n              , Footer.socialButton [] []\n              ]\n          , right = Footer.right []\n              [ Footer.link [Footer.href \"#footers\"] [text \"Link 1\"]\n              , Footer.link [Footer.href \"#footers\"] [text \"Link 2\"]\n              , Footer.link [Footer.href \"#footers\"] [text \"Link 3\"]\n              ]\n          }\n      , middle = Footer.middle []\n          [ Footer.dropdown []\n              [ Footer.heading [] [Footer.html <| text \"Mega Footer Middle Section\"]\n              , Footer.links []\n                  [ Footer.linkItem [ Footer.href \"#footers\" ] [ Footer.html <| text \"Link 1\"]\n                  , Footer.linkItem [ Footer.href \"#footers\" ] [ Footer.html <| text \"Link 2\"]\n                  , Footer.linkItem [ Footer.href \"#footers\" ] [ Footer.html <| text \"Link 3\"]\n                  , Footer.linkItem [ Footer.href \"#footers\" ] [ Footer.html <| text \"Link 4\"]\n                  , Footer.linkItem [ Footer.href \"#footers\" ] [ Footer.html <| text \"Link 5\"]\n                  , Footer.linkItem [ Footer.href \"#footers\" ] [ Footer.html <| text \"Link 6\"]\n                  ]\n              ]\n\n          , Footer.dropdown []\n              [ Footer.heading [] [Footer.html <| text \"Can have\"]\n              , Footer.links []\n                  [ Footer.linkItem [ Footer.href \"#footers\" ] [ Footer.html <| text \"Link 1\"]\n                  , Footer.linkItem [ Footer.href \"#footers\" ] [ Footer.html <| text \"Link 2\"]\n                  , Footer.linkItem [ Footer.href \"#footers\" ] [ Footer.html <| text \"Link 3\"]\n                  , Footer.linkItem [ Footer.href \"#footers\" ] [ Footer.html <| text \"Link 4\"]\n                  ]\n              ]\n\n          , Footer.dropdown []\n              [ Footer.heading [] [Footer.html <| text \"Many dropdowns\"]\n              , Footer.links []\n                  [ Footer.linkItem [ Footer.href \"#footers\" ] [ Footer.html <| text \"Link 1\"]\n                  , Footer.linkItem [ Footer.href \"#footers\" ] [ Footer.html <| text \"Link 2\"]\n                  , Footer.linkItem [ Footer.href \"#footers\" ] [ Footer.html <| text \"Link 3\"]\n                  , Footer.linkItem [ Footer.href \"#footers\" ] [ Footer.html <| text \"Link 4\"]\n                  , Footer.linkItem [ Footer.href \"#footers\" ] [ Footer.html <| text \"Link 5\"]\n                  ]\n              ]\n\n          , Footer.dropdown []\n              [ Footer.heading [] [Footer.html <| text \"And more dropdowns\"]\n              , Footer.links []\n                  [ Footer.linkItem [ Footer.href \"#footers\" ] [ Footer.html <| text \"Link 1\"]\n                  , Footer.linkItem [ Footer.href \"#footers\" ] [ Footer.html <| text \"Link 2\"]\n                  ]\n              ]\n          ]\n\n      , bottom = Footer.bottom []\n          [ Footer.logo [] [ Footer.html <| text \"Mega Bottom Section Example\" ]\n          , Footer.links []\n              [ Footer.linkItem [ Footer.href \"#footers\" ] [ Footer.html <| text \"Link 1\"]\n              , Footer.linkItem [ Footer.href \"#footers\" ] [ Footer.html <| text \"Link 2\"]\n              , Footer.linkItem [ Footer.href \"#footers\" ] [ Footer.html <| text \"Link 3\"]\n              , Footer.linkItem [ Footer.href \"#footers\" ] [ Footer.html <| text \"Link 4\"]\n              , Footer.linkItem [ Footer.href \"#footers\" ] [ Footer.html <| text \"Link 5\"]\n              ]\n          ]\n      }\n   ';
var _debois$elm_mdl$Demo_Footer$miniFooterDoc = '\n    Footer.mini []\n      { left =\n          Footer.left []\n            [ Footer.logo [] [ Footer.html <| text \"Mini Footer Example\" ]\n            , Footer.links []\n                [ Footer.linkItem [ Footer.href \"#footers\" ] [ Footer.html <| text \"Link 1\"]\n                , Footer.linkItem [ Footer.href \"#footers\" ] [ Footer.html <| text \"Link 2\"]\n                , Footer.linkItem [ Footer.href \"#footers\" ] [ Footer.html <| text \"Link 3\"]\n                ]\n            ]\n\n      , right =\n          Footer.right []\n            [ Footer.logo [] [ Footer.html <| text \"Mini Footer Right Section\" ]\n            , Footer.socialButton [Options.css \"margin-right\" \"6px\"] []\n            , Footer.socialButton [Options.css \"margin-right\" \"6px\"] []\n            , Footer.socialButton [Options.css \"margin-right\" \"0px\"] []\n            ]\n      }\n   ';
var _debois$elm_mdl$Demo_Footer$customStyles = '\n  .custom-footer {\n    justify-content: center;\n    flex-direction: column;\n  }\n  .custom-footer ul {\n    padding: 0;\n    display: flex;\n    align-items: center;\n    flex-direction: row;\n    list-style-type: none;\n    justify-content: center;\n  }\n  .custom-footer .mdl-mini-footer__social-btn {\n    background-color: transparent;\n    margin: 0 16px 0 16px;\n    width: 24px;\n    height: 24px;\n  }\n  .custom-footer > ul > li > a {\n    color: white;\n    margin: 0 8px 0 8px;\n    font-weight: 400;\n    font-size: 12px;\n  }\n  ';
var _debois$elm_mdl$Demo_Footer$createLinks = function (nr) {
	var makeLink = F2(
		function (idx, _p0) {
			return A2(
				_debois$elm_mdl$Material_Footer$linkItem,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Footer$href('#footers')
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Footer$html(
						_elm_lang$html$Html$text(
							A2(
								_elm_lang$core$Basics_ops['++'],
								'Link ',
								_elm_lang$core$Basics$toString(idx + 1))))
					]));
		});
	var nrs = A2(_elm_lang$core$List$repeat, nr, 0);
	return A2(_elm_lang$core$List$indexedMap, makeLink, nrs);
};
var _debois$elm_mdl$Demo_Footer$view = function (model) {
	return A5(
		_debois$elm_mdl$Demo_Page$body2,
		'Footers',
		_debois$elm_mdl$Demo_Footer$srcUrl,
		_debois$elm_mdl$Demo_Footer$intro,
		_debois$elm_mdl$Demo_Footer$references,
		_elm_lang$core$Native_List.fromArray(
			[
				_debois$elm_mdl$Material_Options$stylesheet(_debois$elm_mdl$Demo_Footer$customStyles),
				A2(
				_elm_lang$html$Html$p,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('Footers come in two sizes, mini and mega.\n                Mega footers usually contain more content than mini footers.\n                Note that \"dropdowns\" become dropdowns only when the screen is\n                small enough (resize your viewport to observe).')
					])),
				A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$style(
						_elm_lang$core$Native_List.fromArray(
							[
								{ctor: '_Tuple2', _0: 'margin-top', _1: '60px'}
							]))
					]),
				_elm_lang$core$Native_List.fromArray(
					[])),
				A2(
				_elm_lang$html$Html$h4,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('Mini footer')
					])),
				A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Footer$mini,
						_elm_lang$core$Native_List.fromArray(
							[]),
						{
							left: A2(
								_debois$elm_mdl$Material_Footer$left,
								_elm_lang$core$Native_List.fromArray(
									[]),
								_elm_lang$core$Native_List.fromArray(
									[
										A2(
										_debois$elm_mdl$Material_Footer$logo,
										_elm_lang$core$Native_List.fromArray(
											[]),
										_elm_lang$core$Native_List.fromArray(
											[
												_debois$elm_mdl$Material_Footer$html(
												_elm_lang$html$Html$text('Mini Footer Example'))
											])),
										A2(
										_debois$elm_mdl$Material_Footer$links,
										_elm_lang$core$Native_List.fromArray(
											[]),
										_elm_lang$core$Native_List.fromArray(
											[
												A2(
												_debois$elm_mdl$Material_Footer$linkItem,
												_elm_lang$core$Native_List.fromArray(
													[
														_debois$elm_mdl$Material_Footer$href('#footers')
													]),
												_elm_lang$core$Native_List.fromArray(
													[
														_debois$elm_mdl$Material_Footer$html(
														_elm_lang$html$Html$text('Link 1'))
													])),
												A2(
												_debois$elm_mdl$Material_Footer$linkItem,
												_elm_lang$core$Native_List.fromArray(
													[
														_debois$elm_mdl$Material_Footer$href('#footers')
													]),
												_elm_lang$core$Native_List.fromArray(
													[
														_debois$elm_mdl$Material_Footer$html(
														_elm_lang$html$Html$text('Link 2'))
													])),
												A2(
												_debois$elm_mdl$Material_Footer$linkItem,
												_elm_lang$core$Native_List.fromArray(
													[
														_debois$elm_mdl$Material_Footer$href('#footers')
													]),
												_elm_lang$core$Native_List.fromArray(
													[
														_debois$elm_mdl$Material_Footer$html(
														_elm_lang$html$Html$text('Link 3'))
													]))
											]))
									])),
							right: A2(
								_debois$elm_mdl$Material_Footer$right,
								_elm_lang$core$Native_List.fromArray(
									[]),
								_elm_lang$core$Native_List.fromArray(
									[
										A2(
										_debois$elm_mdl$Material_Footer$logo,
										_elm_lang$core$Native_List.fromArray(
											[]),
										_elm_lang$core$Native_List.fromArray(
											[
												_debois$elm_mdl$Material_Footer$html(
												_elm_lang$html$Html$text('Mini Footer Right Section'))
											])),
										A2(
										_debois$elm_mdl$Material_Footer$socialButton,
										_elm_lang$core$Native_List.fromArray(
											[
												A2(_debois$elm_mdl$Material_Options$css, 'margin-right', '6px')
											]),
										_elm_lang$core$Native_List.fromArray(
											[])),
										A2(
										_debois$elm_mdl$Material_Footer$socialButton,
										_elm_lang$core$Native_List.fromArray(
											[
												A2(_debois$elm_mdl$Material_Options$css, 'margin-right', '6px')
											]),
										_elm_lang$core$Native_List.fromArray(
											[])),
										A2(
										_debois$elm_mdl$Material_Footer$socialButton,
										_elm_lang$core$Native_List.fromArray(
											[
												A2(_debois$elm_mdl$Material_Options$css, 'margin-right', '0px')
											]),
										_elm_lang$core$Native_List.fromArray(
											[]))
									]))
						})
					])),
				A2(
				_debois$elm_mdl$Demo_Code$code,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Options$css, 'margin-top', '20px')
					]),
				_debois$elm_mdl$Demo_Footer$miniFooterDoc),
				A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$style(
						_elm_lang$core$Native_List.fromArray(
							[
								{ctor: '_Tuple2', _0: 'margin-top', _1: '60px'}
							]))
					]),
				_elm_lang$core$Native_List.fromArray(
					[])),
				A2(
				_elm_lang$html$Html$h4,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('Mega footer')
					])),
				A2(
				_elm_lang$html$Html$p,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('The mega footer typically has more contents and more\n                  sections than a mini footer.')
					])),
				A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Footer$mega,
						_elm_lang$core$Native_List.fromArray(
							[]),
						{
							top: A2(
								_debois$elm_mdl$Material_Footer$top,
								_elm_lang$core$Native_List.fromArray(
									[]),
								{
									left: A2(
										_debois$elm_mdl$Material_Footer$left,
										_elm_lang$core$Native_List.fromArray(
											[]),
										_elm_lang$core$Native_List.fromArray(
											[
												A2(
												_debois$elm_mdl$Material_Footer$logo,
												_elm_lang$core$Native_List.fromArray(
													[]),
												_elm_lang$core$Native_List.fromArray(
													[
														_debois$elm_mdl$Material_Footer$html(
														_elm_lang$html$Html$text('Mega Footer Top Section'))
													])),
												A2(
												_debois$elm_mdl$Material_Footer$socialButton,
												_elm_lang$core$Native_List.fromArray(
													[
														A2(_debois$elm_mdl$Material_Options$css, 'margin-right', '6px')
													]),
												_elm_lang$core$Native_List.fromArray(
													[])),
												A2(
												_debois$elm_mdl$Material_Footer$socialButton,
												_elm_lang$core$Native_List.fromArray(
													[
														A2(_debois$elm_mdl$Material_Options$css, 'margin-right', '6px')
													]),
												_elm_lang$core$Native_List.fromArray(
													[])),
												A2(
												_debois$elm_mdl$Material_Footer$socialButton,
												_elm_lang$core$Native_List.fromArray(
													[]),
												_elm_lang$core$Native_List.fromArray(
													[]))
											])),
									right: A2(
										_debois$elm_mdl$Material_Footer$right,
										_elm_lang$core$Native_List.fromArray(
											[]),
										_elm_lang$core$Native_List.fromArray(
											[
												A2(
												_debois$elm_mdl$Material_Footer$link,
												_elm_lang$core$Native_List.fromArray(
													[
														_debois$elm_mdl$Material_Footer$href('#footers')
													]),
												_elm_lang$core$Native_List.fromArray(
													[
														_elm_lang$html$Html$text('Link 1')
													])),
												A2(
												_debois$elm_mdl$Material_Footer$link,
												_elm_lang$core$Native_List.fromArray(
													[
														_debois$elm_mdl$Material_Footer$href('#footers')
													]),
												_elm_lang$core$Native_List.fromArray(
													[
														_elm_lang$html$Html$text('Link 2')
													])),
												A2(
												_debois$elm_mdl$Material_Footer$link,
												_elm_lang$core$Native_List.fromArray(
													[
														_debois$elm_mdl$Material_Footer$href('#footers')
													]),
												_elm_lang$core$Native_List.fromArray(
													[
														_elm_lang$html$Html$text('Link 3')
													]))
											]))
								}),
							middle: A2(
								_debois$elm_mdl$Material_Footer$middle,
								_elm_lang$core$Native_List.fromArray(
									[]),
								_elm_lang$core$Native_List.fromArray(
									[
										A2(
										_debois$elm_mdl$Material_Footer$dropdown,
										_elm_lang$core$Native_List.fromArray(
											[]),
										_elm_lang$core$Native_List.fromArray(
											[
												A2(
												_debois$elm_mdl$Material_Footer$heading,
												_elm_lang$core$Native_List.fromArray(
													[]),
												_elm_lang$core$Native_List.fromArray(
													[
														_debois$elm_mdl$Material_Footer$html(
														_elm_lang$html$Html$text('Mega Footer Middle Section'))
													])),
												A2(
												_debois$elm_mdl$Material_Footer$links,
												_elm_lang$core$Native_List.fromArray(
													[]),
												_debois$elm_mdl$Demo_Footer$createLinks(6))
											])),
										A2(
										_debois$elm_mdl$Material_Footer$dropdown,
										_elm_lang$core$Native_List.fromArray(
											[]),
										_elm_lang$core$Native_List.fromArray(
											[
												A2(
												_debois$elm_mdl$Material_Footer$heading,
												_elm_lang$core$Native_List.fromArray(
													[]),
												_elm_lang$core$Native_List.fromArray(
													[
														_debois$elm_mdl$Material_Footer$html(
														_elm_lang$html$Html$text('Can have'))
													])),
												A2(
												_debois$elm_mdl$Material_Footer$links,
												_elm_lang$core$Native_List.fromArray(
													[]),
												_debois$elm_mdl$Demo_Footer$createLinks(4))
											])),
										A2(
										_debois$elm_mdl$Material_Footer$dropdown,
										_elm_lang$core$Native_List.fromArray(
											[]),
										_elm_lang$core$Native_List.fromArray(
											[
												A2(
												_debois$elm_mdl$Material_Footer$heading,
												_elm_lang$core$Native_List.fromArray(
													[]),
												_elm_lang$core$Native_List.fromArray(
													[
														_debois$elm_mdl$Material_Footer$html(
														_elm_lang$html$Html$text('Many dropdowns'))
													])),
												A2(
												_debois$elm_mdl$Material_Footer$links,
												_elm_lang$core$Native_List.fromArray(
													[]),
												_debois$elm_mdl$Demo_Footer$createLinks(5))
											])),
										A2(
										_debois$elm_mdl$Material_Footer$dropdown,
										_elm_lang$core$Native_List.fromArray(
											[]),
										_elm_lang$core$Native_List.fromArray(
											[
												A2(
												_debois$elm_mdl$Material_Footer$heading,
												_elm_lang$core$Native_List.fromArray(
													[]),
												_elm_lang$core$Native_List.fromArray(
													[
														_debois$elm_mdl$Material_Footer$html(
														_elm_lang$html$Html$text('And more dropdowns'))
													])),
												A2(
												_debois$elm_mdl$Material_Footer$links,
												_elm_lang$core$Native_List.fromArray(
													[]),
												_debois$elm_mdl$Demo_Footer$createLinks(2))
											]))
									])),
							bottom: A2(
								_debois$elm_mdl$Material_Footer$bottom,
								_elm_lang$core$Native_List.fromArray(
									[]),
								_elm_lang$core$Native_List.fromArray(
									[
										A2(
										_debois$elm_mdl$Material_Footer$logo,
										_elm_lang$core$Native_List.fromArray(
											[]),
										_elm_lang$core$Native_List.fromArray(
											[
												_debois$elm_mdl$Material_Footer$html(
												_elm_lang$html$Html$text('Mega Bottom Section Example'))
											])),
										A2(
										_debois$elm_mdl$Material_Footer$links,
										_elm_lang$core$Native_List.fromArray(
											[]),
										_debois$elm_mdl$Demo_Footer$createLinks(5))
									]))
						})
					])),
				A2(
				_debois$elm_mdl$Demo_Code$code,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Options$css, 'margin-top', '20px')
					]),
				_debois$elm_mdl$Demo_Footer$megaFooterDoc)
			]));
};
var _debois$elm_mdl$Demo_Footer$update = F2(
	function (action, model) {
		var _p1 = action;
		if (_p1.ctor === 'FooterMsg') {
			return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
		} else {
			return A2(_debois$elm_mdl$Material$update, _p1._0, model);
		}
	});
var _debois$elm_mdl$Demo_Footer$model = {mdl: _debois$elm_mdl$Material$model};
var _debois$elm_mdl$Demo_Footer$Model = function (a) {
	return {mdl: a};
};
var _debois$elm_mdl$Demo_Footer$Mdl = function (a) {
	return {ctor: 'Mdl', _0: a};
};
var _debois$elm_mdl$Demo_Footer$FooterMsg = {ctor: 'FooterMsg'};

var _debois$elm_mdl$Demo_Grid$references = _elm_lang$core$Native_List.fromArray(
	[
		_debois$elm_mdl$Demo_Page$package('http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Grid'),
		_debois$elm_mdl$Demo_Page$mds('https://www.google.com/design/spec/layout/responsive-ui.html#responsive-ui-grid'),
		_debois$elm_mdl$Demo_Page$mdl('http://www.getmdl.io/components/#layout-section/grid')
	]);
var _debois$elm_mdl$Demo_Grid$srcUrl = 'https://github.com/debois/elm-mdl/blob/master/demo/Demo/Grid.elm';
var _debois$elm_mdl$Demo_Grid$intro = A2(_debois$elm_mdl$Demo_Page$fromMDL, 'http://www.getmdl.io/components/#layout-section/grid', '\n> The Material Design Lite (MDL) grid component is a simplified method for laying\n> out content for multiple screen sizes. It reduces the usual coding burden\n> required to correctly display blocks of content in a variety of display\n> conditions.\n>\n> The MDL grid is defined and enclosed by a container element. A grid has 12\n> columns in the desktop screen size, 8 in the tablet size, and 4 in the phone\n> size, each size having predefined margins and gutters. Cells are laid out\n> sequentially in a row, in the order they are defined, with some exceptions:\n>\n>   - If a cell doesn\'t fit in the row in one of the screen sizes, it flows\n>     into the following line.\n>   - If a cell has a specified column size equal to or larger than the number\n>     of columns for the current screen size, it takes up the entirety of its\n>     row.\n');
var _debois$elm_mdl$Demo_Grid$color = function (k) {
	return _debois$elm_mdl$Material_Color$background(
		A3(
			_elm_lang$core$Basics$flip,
			_debois$elm_mdl$Material_Color$color,
			_debois$elm_mdl$Material_Color$S500,
			A2(
				_elm_lang$core$Maybe$withDefault,
				_debois$elm_mdl$Material_Color$Teal,
				A2(
					_elm_lang$core$Array$get,
					A2(
						_elm_lang$core$Basics_ops['%'],
						k + 0,
						_elm_lang$core$Array$length(_debois$elm_mdl$Material_Color$hues)),
					_debois$elm_mdl$Material_Color$hues))));
};
var _debois$elm_mdl$Demo_Grid$style = function (h) {
	return _elm_lang$core$Native_List.fromArray(
		[
			A2(_debois$elm_mdl$Material_Options$css, 'text-sizing', 'border-box'),
			A2(_debois$elm_mdl$Material_Options$css, 'background-color', '#BDBDBD'),
			A2(
			_debois$elm_mdl$Material_Options$css,
			'height',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(h),
				'px')),
			A2(_debois$elm_mdl$Material_Options$css, 'padding-left', '8px'),
			A2(_debois$elm_mdl$Material_Options$css, 'padding-top', '4px'),
			A2(_debois$elm_mdl$Material_Options$css, 'color', 'white')
		]);
};
var _debois$elm_mdl$Demo_Grid$democell = F2(
	function (k, styling) {
		return _debois$elm_mdl$Material_Grid$cell(
			_elm_lang$core$List$concat(
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Demo_Grid$style(k),
						styling
					])));
	});
var _debois$elm_mdl$Demo_Grid$small = _debois$elm_mdl$Demo_Grid$democell(50);
var _debois$elm_mdl$Demo_Grid$std = _debois$elm_mdl$Demo_Grid$democell(200);
var _debois$elm_mdl$Demo_Grid$view = A5(
	_debois$elm_mdl$Demo_Page$body1,
	'Grid',
	_debois$elm_mdl$Demo_Grid$srcUrl,
	_debois$elm_mdl$Demo_Grid$intro,
	_debois$elm_mdl$Demo_Grid$references,
	_elm_lang$core$Native_List.fromArray(
		[
			A2(
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Resize your browser-window and observe the effect on the Grid\n                below. Note in particular what happens to the top and bottom rows.')
				])),
			A2(
			_debois$elm_mdl$Material_Grid$grid,
			_elm_lang$core$Native_List.fromArray(
				[]),
			A2(
				_elm_lang$core$List$map,
				function (i) {
					return A2(
						_debois$elm_mdl$Demo_Grid$small,
						_elm_lang$core$Native_List.fromArray(
							[
								A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 1),
								_debois$elm_mdl$Demo_Grid$color(4)
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('1')
							]));
				},
				_elm_lang$core$Native_List.range(1, 12))),
			A2(
			_debois$elm_mdl$Material_Grid$grid,
			_elm_lang$core$Native_List.fromArray(
				[]),
			A2(
				_elm_lang$core$List$map,
				function (i) {
					return A2(
						_debois$elm_mdl$Demo_Grid$std,
						_elm_lang$core$Native_List.fromArray(
							[
								A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 4),
								_debois$elm_mdl$Demo_Grid$color(5)
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('4')
							]));
				},
				_elm_lang$core$Native_List.range(1, 3))),
			A2(
			_debois$elm_mdl$Material_Grid$grid,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Demo_Grid$std,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 6),
							_debois$elm_mdl$Demo_Grid$color(6)
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text('6')
						])),
					A2(
					_debois$elm_mdl$Demo_Grid$std,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 4),
							_debois$elm_mdl$Demo_Grid$color(6)
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text('4')
						])),
					A2(
					_debois$elm_mdl$Demo_Grid$std,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 2),
							_debois$elm_mdl$Demo_Grid$color(6)
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text('2')
						]))
				])),
			A2(
			_debois$elm_mdl$Material_Grid$grid,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Demo_Grid$std,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 6),
							A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Tablet, 8),
							_debois$elm_mdl$Demo_Grid$color(7)
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text('6 (8 tablet)')
						])),
					A2(
					_debois$elm_mdl$Demo_Grid$std,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 4),
							A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Tablet, 6),
							_debois$elm_mdl$Demo_Grid$color(8)
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text('4 (6 tablet)')
						])),
					A2(
					_debois$elm_mdl$Demo_Grid$std,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 2),
							A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Phone, 4),
							_debois$elm_mdl$Demo_Grid$color(9)
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text('2 (4 phone)')
						]))
				]))
		]));

var _debois$elm_mdl$Demo_Layout$references = _elm_lang$core$Native_List.fromArray(
	[
		_debois$elm_mdl$Demo_Page$package('http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Layout'),
		_debois$elm_mdl$Demo_Page$mds('http://www.google.com/design/spec/layout/principles.html'),
		_debois$elm_mdl$Demo_Page$mdl('https://www.getmdl.io/components/index.html#layout-section/layout')
	]);
var _debois$elm_mdl$Demo_Layout$srcUrl = 'https://github.com/debois/elm-mdl/blob/master/demo/Demo/Layout.elm';
var _debois$elm_mdl$Demo_Layout$intro = A2(_debois$elm_mdl$Demo_Page$fromMDL, 'https://getmdl.io/components/index.html#layout-section/layout', '\n> The Material Design Lite (MDL) layout component is a comprehensive approach to\n> page layout that uses MDL development tenets, allows for efficient use of MDL\n> components, and automatically adapts to different browsers, screen sizes, and\n> devices.\n> \n> Appropriate and accessible layout is a critical feature of all user interfaces,\n> regardless of a site\'s content or function. Page design and presentation is\n> therefore an important factor in the overall user experience. See the layout\n> component\'s Material Design specifications page for details.\n> \n> Use of MDL layout principles simplifies the creation of scalable pages by\n> providing reusable components and encourages consistency across environments by\n> establishing recognizable visual elements, adhering to logical structural\n> grids, and maintaining appropriate spacing across multiple platforms and screen\n> sizes. MDL layout is extremely powerful and dynamic, allowing for great\n> consistency in outward appearance and behavior while maintaining development\n> flexibility and ease of use.\n');
var _debois$elm_mdl$Demo_Layout$heading = function (current) {
	return A2(
		_debois$elm_mdl$Material_Options$div,
		_elm_lang$core$Native_List.fromArray(
			[
				A2(_debois$elm_mdl$Material_Options$css, 'align-self', 'flex-end'),
				_debois$elm_mdl$Material_Typography$display3,
				_debois$elm_mdl$Material_Color$text(
				A2(_debois$elm_mdl$Material_Color$color, current, _debois$elm_mdl$Material_Color$S500))
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html$text(
				_debois$elm_mdl$Material_Color$hueName(current))
			]));
};
var _debois$elm_mdl$Demo_Layout$explain = function (str) {
	return A3(
		_debois$elm_mdl$Material_Options$styled,
		_elm_lang$html$Html$p,
		_elm_lang$core$Native_List.fromArray(
			[
				A2(_debois$elm_mdl$Material_Options$css, 'margin-top', '1ex'),
				A2(_debois$elm_mdl$Material_Options$css, 'margin-bot', '2ex')
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html$text(str)
			]));
};
var _debois$elm_mdl$Demo_Layout$table = function (contents) {
	return A2(
		_debois$elm_mdl$Material_Grid$cell,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_Options$div,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Options$css, 'display', 'inline-flex'),
						A2(_debois$elm_mdl$Material_Options$css, 'flex-direction', 'column'),
						A2(_debois$elm_mdl$Material_Options$css, 'width', 'auto')
					]),
				contents)
			]));
};
var _debois$elm_mdl$Demo_Layout$fixColors = function (model) {
	return _elm_lang$core$Native_Utils.eq(model.primary, model.accent) ? (_elm_lang$core$Native_Utils.eq(model.primary, _debois$elm_mdl$Material_Color$Indigo) ? _elm_lang$core$Native_Utils.update(
		model,
		{accent: _debois$elm_mdl$Material_Color$Red}) : _elm_lang$core$Native_Utils.update(
		model,
		{accent: _debois$elm_mdl$Material_Color$Indigo})) : model;
};
var _debois$elm_mdl$Demo_Layout$update = F2(
	function (action, model) {
		var _p0 = action;
		switch (_p0.ctor) {
			case 'TemplateMsg':
				return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
			case 'Update':
				return {
					ctor: '_Tuple2',
					_0: _p0._0(model),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			default:
				return A2(_debois$elm_mdl$Material$update, _p0._0, model);
		}
	});
var _debois$elm_mdl$Demo_Layout$Model = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return {mdl: a, fixedHeader: b, fixedDrawer: c, fixedTabs: d, header: e, rippleTabs: f, transparentHeader: g, withDrawer: h, withHeader: i, withTabs: j, primary: k, accent: l};
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
};
var _debois$elm_mdl$Demo_Layout$Scrolling = {ctor: 'Scrolling'};
var _debois$elm_mdl$Demo_Layout$Standard = {ctor: 'Standard'};
var _debois$elm_mdl$Demo_Layout$model = {mdl: _debois$elm_mdl$Material$model, fixedHeader: true, fixedTabs: false, fixedDrawer: false, header: _debois$elm_mdl$Demo_Layout$Standard, rippleTabs: true, transparentHeader: false, withDrawer: true, withHeader: true, withTabs: true, primary: _debois$elm_mdl$Material_Color$Teal, accent: _debois$elm_mdl$Material_Color$Red};
var _debois$elm_mdl$Demo_Layout$Seamed = {ctor: 'Seamed'};
var _debois$elm_mdl$Demo_Layout$Waterfall = function (a) {
	return {ctor: 'Waterfall', _0: a};
};
var _debois$elm_mdl$Demo_Layout$Mdl = function (a) {
	return {ctor: 'Mdl', _0: a};
};
var _debois$elm_mdl$Demo_Layout$Update = function (a) {
	return {ctor: 'Update', _0: a};
};
var _debois$elm_mdl$Demo_Layout$picker = F5(
	function (hues, disabled, shade, current, f) {
		return A2(
			_debois$elm_mdl$Material_Options$div,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_debois$elm_mdl$Material_Options$css, 'display', 'flex'),
					A2(_debois$elm_mdl$Material_Options$css, 'flex-wrap', 'wrap')
				]),
			A2(
				_elm_lang$core$List$map,
				function (hue) {
					return A4(
						_debois$elm_mdl$Material_Options$styled$,
						_elm_lang$html$Html$div,
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Material_Options$when,
								_debois$elm_mdl$Material_Color$background(
									A2(_debois$elm_mdl$Material_Color$color, hue, shade)),
								!_elm_lang$core$Native_Utils.eq(
									disabled,
									_elm_lang$core$Maybe$Just(hue))),
								A2(
								_debois$elm_mdl$Material_Options$when,
								_debois$elm_mdl$Material_Color$background(
									A2(_debois$elm_mdl$Material_Color$color, _debois$elm_mdl$Material_Color$Grey, _debois$elm_mdl$Material_Color$S200)),
								_elm_lang$core$Native_Utils.eq(
									disabled,
									_elm_lang$core$Maybe$Just(hue))),
								A2(_debois$elm_mdl$Material_Options$css, 'width', '56px'),
								A2(_debois$elm_mdl$Material_Options$css, 'height', '56px'),
								A2(_debois$elm_mdl$Material_Options$css, 'margin', '2pt'),
								A2(_debois$elm_mdl$Material_Options$css, 'line-height', '56px'),
								A2(_debois$elm_mdl$Material_Options$css, 'flex-shrink', '0'),
								A2(
								_debois$elm_mdl$Material_Options$when,
								_debois$elm_mdl$Material_Elevation$e8,
								_elm_lang$core$Native_Utils.eq(current, hue)),
								A2(_debois$elm_mdl$Material_Options$css, 'transition', 'box-shadow 300ms ease-in-out 0s, background-color 300ms ease-in-out 0s'),
								A2(
								_debois$elm_mdl$Material_Options$when,
								A2(_debois$elm_mdl$Material_Options$css, 'cursor', 'pointer'),
								!_elm_lang$core$Native_Utils.eq(
									disabled,
									_elm_lang$core$Maybe$Just(hue)))
							]),
						(!_elm_lang$core$Native_Utils.eq(
							_elm_lang$core$Maybe$Just(hue),
							disabled)) ? _elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html_Events$onClick(
								_debois$elm_mdl$Demo_Layout$Update(
									function (_p1) {
										return _debois$elm_mdl$Demo_Layout$fixColors(
											A2(f, hue, _p1));
									}))
							]) : _elm_lang$core$Native_List.fromArray(
							[]),
						_elm_lang$core$Native_List.fromArray(
							[]));
				},
				_elm_lang$core$Array$toList(hues)));
	});
var _debois$elm_mdl$Demo_Layout$view = function (model) {
	var demo2 = _elm_lang$core$Native_List.fromArray(
		[
			A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$html$Html$h4,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text('Colour')
						])),
					_debois$elm_mdl$Demo_Layout$explain('While technically not part of the layout Component, \n                       this is a convenient place to demonstrate colour styling.\n                       Change the scheme by clicking below. '),
					_debois$elm_mdl$Demo_Layout$explain('Changing the colour scheme affects not just Layout, but\n                       most components. Try changing the scheme, then look what\n                       happens to Buttons, Badges, or Textfields. '),
					A2(
					_debois$elm_mdl$Material_Grid$grid,
					_elm_lang$core$Native_List.fromArray(
						[_debois$elm_mdl$Material_Grid$noSpacing]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_Grid$cell,
							_elm_lang$core$Native_List.fromArray(
								[
									A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 4)
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_elm_lang$html$Html$h5,
									_elm_lang$core$Native_List.fromArray(
										[]),
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html$text('Primary colour')
										])),
									A5(
									_debois$elm_mdl$Demo_Layout$picker,
									_debois$elm_mdl$Material_Color$hues,
									_elm_lang$core$Maybe$Nothing,
									_debois$elm_mdl$Material_Color$S500,
									model.primary,
									F2(
										function (hue, m) {
											return _elm_lang$core$Native_Utils.update(
												m,
												{primary: hue});
										}))
								])),
							A2(
							_debois$elm_mdl$Material_Grid$cell,
							_elm_lang$core$Native_List.fromArray(
								[
									A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 4),
									A2(_debois$elm_mdl$Material_Grid$offset, _debois$elm_mdl$Material_Grid$Desktop, 2)
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_elm_lang$html$Html$h5,
									_elm_lang$core$Native_List.fromArray(
										[]),
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html$text('Accent colour')
										])),
									A5(
									_debois$elm_mdl$Demo_Layout$picker,
									_debois$elm_mdl$Material_Color$accentHues,
									_elm_lang$core$Maybe$Just(model.primary),
									_debois$elm_mdl$Material_Color$A200,
									model.accent,
									F2(
										function (hue, m) {
											return _elm_lang$core$Native_Utils.update(
												m,
												{accent: hue});
										}))
								])),
							A2(
							_debois$elm_mdl$Material_Grid$cell,
							_elm_lang$core$Native_List.fromArray(
								[
									A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 4),
									A2(_debois$elm_mdl$Material_Options$css, 'text-align', 'right'),
									A2(_debois$elm_mdl$Material_Grid$order, _debois$elm_mdl$Material_Grid$Phone, 0)
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Demo_Layout$heading(model.primary)
								])),
							A2(
							_debois$elm_mdl$Material_Grid$cell,
							_elm_lang$core$Native_List.fromArray(
								[
									A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 4),
									A2(_debois$elm_mdl$Material_Grid$offset, _debois$elm_mdl$Material_Grid$Desktop, 2),
									A2(_debois$elm_mdl$Material_Options$css, 'text-align', 'right')
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Demo_Layout$heading(model.accent)
								]))
						])),
					A2(
					_debois$elm_mdl$Material_Options$div,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Options$css, 'height', '3rem')
						]),
					_elm_lang$core$Native_List.fromArray(
						[])),
					_debois$elm_mdl$Demo_Layout$explain('To use this colour scheme (and to use elm-mdl in general), you must load custom CSS.'),
					A2(
					_debois$elm_mdl$Demo_Code$html,
					_elm_lang$core$Native_List.fromArray(
						[]),
					A2(
						_elm_lang$core$String$join,
						'\n',
						_elm_lang$core$Native_List.fromArray(
							[
								'<link href=\'https://fonts.googleapis.com/css?family=Roboto:400,300,500|Roboto+Mono|Roboto+Condensed:400,700&subset=latin,latin-ext\' rel=\'stylesheet\' type=\'text/css\'>',
								'<link rel=\'stylesheet\' href=\'https://fonts.googleapis.com/icon?family=Material+Icons\'>',
								A2(
								_elm_lang$core$Basics_ops['++'],
								'<link rel=\'stylesheet\' href=\'https://code.getmdl.io/1.2.0/',
								A2(
									_elm_lang$core$Basics_ops['++'],
									A2(_debois$elm_mdl$Material_Color$scheme, model.primary, model.accent),
									'\'>'))
							]))),
					_debois$elm_mdl$Demo_Layout$explain('For quick experiments, you can alternatively load CSS directly from Elm as follows.\n                       NB! This approach will cause flickering on load and so is\n                       not suitable anything but quick experiments.'),
					A2(
					_debois$elm_mdl$Demo_Code$code,
					_elm_lang$core$Native_List.fromArray(
						[]),
					A2(
						_elm_lang$core$Basics_ops['++'],
						'import Material.Scheme as Scheme\n    import Material.Color as Color\n\n    -- Wrap your main html, say, \"contents\" like this: \n    myView = \n      Scheme.topWithScheme ',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(model.primary),
							A2(
								_elm_lang$core$Basics_ops['++'],
								' ',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(model.accent),
									' contents')))))
				]))
		]);
	var demo1 = _elm_lang$core$Native_List.fromArray(
		[
			A2(
			_debois$elm_mdl$Material_Grid$grid,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Demo_Layout$table(
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$html$Html$h4,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Included sub-components')
								])),
							A5(
							_debois$elm_mdl$Material_Toggles$switch,
							_debois$elm_mdl$Demo_Layout$Mdl,
							_elm_lang$core$Native_List.fromArray(
								[8]),
							model.mdl,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Toggles$onClick(
									_debois$elm_mdl$Demo_Layout$Update(
										function (m) {
											return _elm_lang$core$Native_Utils.update(
												m,
												{
													withHeader: _elm_lang$core$Basics$not(m.withHeader)
												});
										})),
									_debois$elm_mdl$Material_Toggles$value(model.withHeader)
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('With header')
								])),
							A5(
							_debois$elm_mdl$Material_Toggles$switch,
							_debois$elm_mdl$Demo_Layout$Mdl,
							_elm_lang$core$Native_List.fromArray(
								[9]),
							model.mdl,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Toggles$onClick(
									_debois$elm_mdl$Demo_Layout$Update(
										function (m) {
											return _elm_lang$core$Native_Utils.update(
												m,
												{
													withDrawer: _elm_lang$core$Basics$not(m.withDrawer)
												});
										})),
									_debois$elm_mdl$Material_Toggles$value(model.withDrawer)
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('With drawer')
								])),
							A5(
							_debois$elm_mdl$Material_Toggles$switch,
							_debois$elm_mdl$Demo_Layout$Mdl,
							_elm_lang$core$Native_List.fromArray(
								[10]),
							model.mdl,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Toggles$onClick(
									_debois$elm_mdl$Demo_Layout$Update(
										function (m) {
											return _elm_lang$core$Native_Utils.update(
												m,
												{
													withTabs: _elm_lang$core$Basics$not(m.withTabs)
												});
										})),
									_debois$elm_mdl$Material_Toggles$value(model.withTabs)
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('With tabs')
								]))
						])),
					_debois$elm_mdl$Demo_Layout$table(
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$html$Html$h4,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Size-dependent behaviour')
								])),
							A5(
							_debois$elm_mdl$Material_Toggles$switch,
							_debois$elm_mdl$Demo_Layout$Mdl,
							_elm_lang$core$Native_List.fromArray(
								[0]),
							model.mdl,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Toggles$onClick(
									_debois$elm_mdl$Demo_Layout$Update(
										function (m) {
											return _elm_lang$core$Native_Utils.update(
												m,
												{
													fixedHeader: _elm_lang$core$Basics$not(m.fixedHeader)
												});
										})),
									_debois$elm_mdl$Material_Toggles$value(model.fixedHeader)
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Fixed header')
								])),
							_debois$elm_mdl$Demo_Layout$explain('The header by default disappears on small devices. \n                           This option forces the display of the header on all devices. '),
							A5(
							_debois$elm_mdl$Material_Toggles$switch,
							_debois$elm_mdl$Demo_Layout$Mdl,
							_elm_lang$core$Native_List.fromArray(
								[1]),
							model.mdl,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Toggles$onClick(
									_debois$elm_mdl$Demo_Layout$Update(
										function (m) {
											return _elm_lang$core$Native_Utils.update(
												m,
												{
													fixedDrawer: _elm_lang$core$Basics$not(m.fixedDrawer)
												});
										})),
									_debois$elm_mdl$Material_Toggles$value(model.fixedDrawer)
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Fixed drawer')
								])),
							_debois$elm_mdl$Demo_Layout$explain('The drawer is by default hidden on all devices. \n                           This option forces the drawer to be open on large devices. '),
							A5(
							_debois$elm_mdl$Material_Toggles$switch,
							_debois$elm_mdl$Demo_Layout$Mdl,
							_elm_lang$core$Native_List.fromArray(
								[2]),
							model.mdl,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Toggles$onClick(
									_debois$elm_mdl$Demo_Layout$Update(
										function (m) {
											return _elm_lang$core$Native_Utils.update(
												m,
												{
													fixedTabs: _elm_lang$core$Basics$not(m.fixedTabs)
												});
										})),
									_debois$elm_mdl$Material_Toggles$value(model.fixedTabs)
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Fixed tabs')
								])),
							_debois$elm_mdl$Demo_Layout$explain('The tabs by default extend from left to right, scrolling \n                           when necessary. This option forces tabs to spread out to \n                           consume all available space.')
						])),
					_debois$elm_mdl$Demo_Layout$table(
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$html$Html$h4,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Header behaviour')
								])),
							A5(
							_debois$elm_mdl$Material_Toggles$radio,
							_debois$elm_mdl$Demo_Layout$Mdl,
							_elm_lang$core$Native_List.fromArray(
								[3]),
							model.mdl,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Toggles$group('kind'),
									_debois$elm_mdl$Material_Toggles$value(
									_elm_lang$core$Native_Utils.eq(model.header, _debois$elm_mdl$Demo_Layout$Standard)),
									_debois$elm_mdl$Material_Toggles$onClick(
									_debois$elm_mdl$Demo_Layout$Update(
										function (m) {
											return _elm_lang$core$Native_Utils.update(
												m,
												{header: _debois$elm_mdl$Demo_Layout$Standard});
										}))
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Standard')
								])),
							A5(
							_debois$elm_mdl$Material_Toggles$radio,
							_debois$elm_mdl$Demo_Layout$Mdl,
							_elm_lang$core$Native_List.fromArray(
								[4]),
							model.mdl,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Toggles$group('kind'),
									_debois$elm_mdl$Material_Toggles$value(
									_elm_lang$core$Native_Utils.eq(model.header, _debois$elm_mdl$Demo_Layout$Seamed)),
									_debois$elm_mdl$Material_Toggles$onClick(
									_debois$elm_mdl$Demo_Layout$Update(
										function (m) {
											return _elm_lang$core$Native_Utils.update(
												m,
												{header: _debois$elm_mdl$Demo_Layout$Seamed});
										}))
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Seamed')
								])),
							A5(
							_debois$elm_mdl$Material_Toggles$radio,
							_debois$elm_mdl$Demo_Layout$Mdl,
							_elm_lang$core$Native_List.fromArray(
								[5]),
							model.mdl,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Toggles$group('kind'),
									_debois$elm_mdl$Material_Toggles$value(
									_elm_lang$core$Native_Utils.eq(model.header, _debois$elm_mdl$Demo_Layout$Scrolling)),
									_debois$elm_mdl$Material_Toggles$onClick(
									_debois$elm_mdl$Demo_Layout$Update(
										function (m) {
											return _elm_lang$core$Native_Utils.update(
												m,
												{header: _debois$elm_mdl$Demo_Layout$Scrolling});
										}))
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Scrolling')
								])),
							A5(
							_debois$elm_mdl$Material_Toggles$radio,
							_debois$elm_mdl$Demo_Layout$Mdl,
							_elm_lang$core$Native_List.fromArray(
								[6]),
							model.mdl,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Toggles$group('kind'),
									_debois$elm_mdl$Material_Toggles$value(
									_elm_lang$core$Native_Utils.eq(
										model.header,
										_debois$elm_mdl$Demo_Layout$Waterfall(true))),
									_debois$elm_mdl$Material_Toggles$onClick(
									_debois$elm_mdl$Demo_Layout$Update(
										function (m) {
											return _elm_lang$core$Native_Utils.update(
												m,
												{
													header: _debois$elm_mdl$Demo_Layout$Waterfall(true)
												});
										}))
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Waterfall (top)')
								])),
							A5(
							_debois$elm_mdl$Material_Toggles$radio,
							_debois$elm_mdl$Demo_Layout$Mdl,
							_elm_lang$core$Native_List.fromArray(
								[7]),
							model.mdl,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Toggles$group('kind'),
									_debois$elm_mdl$Material_Toggles$value(
									_elm_lang$core$Native_Utils.eq(
										model.header,
										_debois$elm_mdl$Demo_Layout$Waterfall(false))),
									_debois$elm_mdl$Material_Toggles$onClick(
									_debois$elm_mdl$Demo_Layout$Update(
										function (m) {
											return _elm_lang$core$Native_Utils.update(
												m,
												{
													header: _debois$elm_mdl$Demo_Layout$Waterfall(false)
												});
										}))
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Waterfall (bottom)')
								]))
						]))
				])),
			A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					function () {
					var body = A2(
						_elm_lang$core$Basics_ops['++'],
						'  { header = ',
						A2(
							_elm_lang$core$Basics_ops['++'],
							model.withHeader ? '[ ... ]' : '[]',
							A2(
								_elm_lang$core$Basics_ops['++'],
								'\n',
								A2(
									_elm_lang$core$Basics_ops['++'],
									'  , drawer = ',
									A2(
										_elm_lang$core$Basics_ops['++'],
										model.withDrawer ? '[ ... ]' : '[]',
										A2(
											_elm_lang$core$Basics_ops['++'],
											'\n',
											A2(
												_elm_lang$core$Basics_ops['++'],
												'  , tabs = ',
												A2(
													_elm_lang$core$Basics_ops['++'],
													model.withTabs ? '([ ... ], [ ... ])' : '([], [])',
													A2(
														_elm_lang$core$Basics_ops['++'],
														'\n',
														A2(_elm_lang$core$Basics_ops['++'], '  , main = [ ... ]\n', '  }'))))))))));
					var options = _elm_lang$core$Native_List.fromArray(
						[
							model.fixedHeader ? _elm_lang$core$Maybe$Just('Layout.fixedHeader') : _elm_lang$core$Maybe$Nothing,
							model.fixedDrawer ? _elm_lang$core$Maybe$Just('Layout.fixedDrawer') : _elm_lang$core$Maybe$Nothing,
							model.fixedTabs ? _elm_lang$core$Maybe$Just('Layout.fixedTabs') : _elm_lang$core$Maybe$Nothing,
							function () {
							if (model.withHeader) {
								var _p2 = model.header;
								switch (_p2.ctor) {
									case 'Waterfall':
										return _elm_lang$core$Maybe$Just(
											A2(
												_elm_lang$core$Basics_ops['++'],
												'Layout.waterfall ',
												_elm_lang$core$Basics$toString(_p2._0)));
									case 'Seamed':
										return _elm_lang$core$Maybe$Just('Layout.seamed');
									case 'Scrolling':
										return _elm_lang$core$Maybe$Just('Layout.scrolling');
									default:
										return _elm_lang$core$Maybe$Nothing;
								}
							} else {
								return _elm_lang$core$Maybe$Nothing;
							}
						}()
						]);
					return A2(
						_debois$elm_mdl$Demo_Code$code,
						_elm_lang$core$Native_List.fromArray(
							[]),
						A3(
							_elm_lang$core$Basics$flip,
							F2(
								function (x, y) {
									return A2(_elm_lang$core$Basics_ops['++'], x, y);
								}),
							body,
							A3(
								_elm_lang$core$Basics$flip,
								F2(
									function (x, y) {
										return A2(_elm_lang$core$Basics_ops['++'], x, y);
									}),
								'\n  ]\n',
								A2(
									F2(
										function (x, y) {
											return A2(_elm_lang$core$Basics_ops['++'], x, y);
										}),
									'import Material.Layout as Layout\n\nLayout.render Mdl model.mdl\n  [ ',
									A2(
										_elm_lang$core$String$join,
										'\n  , ',
										A2(_elm_lang$core$List$filterMap, _elm_lang$core$Basics$identity, options))))));
				}()
				]))
		]);
	return A6(_debois$elm_mdl$Demo_Page$body1$, 'Layout', _debois$elm_mdl$Demo_Layout$srcUrl, _debois$elm_mdl$Demo_Layout$intro, _debois$elm_mdl$Demo_Layout$references, demo1, demo2);
};
var _debois$elm_mdl$Demo_Layout$TemplateMsg = {ctor: 'TemplateMsg'};

var _elm_lang$core$Set$foldr = F3(
	function (f, b, _p0) {
		var _p1 = _p0;
		return A3(
			_elm_lang$core$Dict$foldr,
			F3(
				function (k, _p2, b) {
					return A2(f, k, b);
				}),
			b,
			_p1._0);
	});
var _elm_lang$core$Set$foldl = F3(
	function (f, b, _p3) {
		var _p4 = _p3;
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, _p5, b) {
					return A2(f, k, b);
				}),
			b,
			_p4._0);
	});
var _elm_lang$core$Set$toList = function (_p6) {
	var _p7 = _p6;
	return _elm_lang$core$Dict$keys(_p7._0);
};
var _elm_lang$core$Set$size = function (_p8) {
	var _p9 = _p8;
	return _elm_lang$core$Dict$size(_p9._0);
};
var _elm_lang$core$Set$member = F2(
	function (k, _p10) {
		var _p11 = _p10;
		return A2(_elm_lang$core$Dict$member, k, _p11._0);
	});
var _elm_lang$core$Set$isEmpty = function (_p12) {
	var _p13 = _p12;
	return _elm_lang$core$Dict$isEmpty(_p13._0);
};
var _elm_lang$core$Set$Set_elm_builtin = function (a) {
	return {ctor: 'Set_elm_builtin', _0: a};
};
var _elm_lang$core$Set$empty = _elm_lang$core$Set$Set_elm_builtin(_elm_lang$core$Dict$empty);
var _elm_lang$core$Set$singleton = function (k) {
	return _elm_lang$core$Set$Set_elm_builtin(
		A2(
			_elm_lang$core$Dict$singleton,
			k,
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Set$insert = F2(
	function (k, _p14) {
		var _p15 = _p14;
		return _elm_lang$core$Set$Set_elm_builtin(
			A3(
				_elm_lang$core$Dict$insert,
				k,
				{ctor: '_Tuple0'},
				_p15._0));
	});
var _elm_lang$core$Set$fromList = function (xs) {
	return A3(_elm_lang$core$List$foldl, _elm_lang$core$Set$insert, _elm_lang$core$Set$empty, xs);
};
var _elm_lang$core$Set$map = F2(
	function (f, s) {
		return _elm_lang$core$Set$fromList(
			A2(
				_elm_lang$core$List$map,
				f,
				_elm_lang$core$Set$toList(s)));
	});
var _elm_lang$core$Set$remove = F2(
	function (k, _p16) {
		var _p17 = _p16;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$remove, k, _p17._0));
	});
var _elm_lang$core$Set$union = F2(
	function (_p19, _p18) {
		var _p20 = _p19;
		var _p21 = _p18;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$union, _p20._0, _p21._0));
	});
var _elm_lang$core$Set$intersect = F2(
	function (_p23, _p22) {
		var _p24 = _p23;
		var _p25 = _p22;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$intersect, _p24._0, _p25._0));
	});
var _elm_lang$core$Set$diff = F2(
	function (_p27, _p26) {
		var _p28 = _p27;
		var _p29 = _p26;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$diff, _p28._0, _p29._0));
	});
var _elm_lang$core$Set$filter = F2(
	function (p, _p30) {
		var _p31 = _p30;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(
				_elm_lang$core$Dict$filter,
				F2(
					function (k, _p32) {
						return p(k);
					}),
				_p31._0));
	});
var _elm_lang$core$Set$partition = F2(
	function (p, _p33) {
		var _p34 = _p33;
		var _p35 = A2(
			_elm_lang$core$Dict$partition,
			F2(
				function (k, _p36) {
					return p(k);
				}),
			_p34._0);
		var p1 = _p35._0;
		var p2 = _p35._1;
		return {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Set$Set_elm_builtin(p1),
			_1: _elm_lang$core$Set$Set_elm_builtin(p2)
		};
	});

var _debois$elm_mdl$Material_List$action2 = _debois$elm_mdl$Material_Options$cs('mdl-list__item-secondary-action');
var _debois$elm_mdl$Material_List$info2 = function (options) {
	return _debois$elm_mdl$Material_Options$span(
		A2(
			_elm_lang$core$List_ops['::'],
			_debois$elm_mdl$Material_Options$cs('mdl-list__item-secondary-info'),
			options));
};
var _debois$elm_mdl$Material_List$content2 = function (options) {
	return _debois$elm_mdl$Material_Options$span(
		A2(
			_elm_lang$core$List_ops['::'],
			_debois$elm_mdl$Material_Options$cs('mdl-list__item-secondary-content'),
			options));
};
var _debois$elm_mdl$Material_List$subtitle = function (options) {
	return _debois$elm_mdl$Material_Options$span(
		A2(
			_elm_lang$core$List_ops['::'],
			_debois$elm_mdl$Material_Options$cs('mdl-list__item-sub-title'),
			options));
};
var _debois$elm_mdl$Material_List$body = function (options) {
	return _debois$elm_mdl$Material_Options$span(
		A2(
			_elm_lang$core$List_ops['::'],
			_debois$elm_mdl$Material_Options$cs('mdl-list__item-text-body'),
			options));
};
var _debois$elm_mdl$Material_List$icon = F2(
	function (i, options) {
		return A2(
			_debois$elm_mdl$Material_Icon$view,
			i,
			A2(
				_elm_lang$core$List_ops['::'],
				_debois$elm_mdl$Material_Options$cs('mdl-list__item-icon'),
				options));
	});
var _debois$elm_mdl$Material_List$avatar = _debois$elm_mdl$Material_Options$cs('mdl-list__item-avatar');
var _debois$elm_mdl$Material_List$avatarImage = F2(
	function (src, options) {
		return A4(
			_debois$elm_mdl$Material_Options$styled$,
			_elm_lang$html$Html$img,
			A2(_elm_lang$core$List_ops['::'], _debois$elm_mdl$Material_List$avatar, options),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$src(src)
				]),
			_elm_lang$core$Native_List.fromArray(
				[]));
	});
var _debois$elm_mdl$Material_List$avatarIcon = F2(
	function (i, options) {
		return A2(
			_debois$elm_mdl$Material_Options$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$center,
					_debois$elm_mdl$Material_Options$many(options),
					_debois$elm_mdl$Material_List$avatar
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Icon$i(i)
				]));
	});
var _debois$elm_mdl$Material_List$content = function (options) {
	return _debois$elm_mdl$Material_Options$span(
		A2(
			_elm_lang$core$List_ops['::'],
			_debois$elm_mdl$Material_Options$cs('mdl-list__item-primary-content'),
			options));
};
var _debois$elm_mdl$Material_List$withSubtitle = _debois$elm_mdl$Material_Options$cs('mdl-list__item--two-line');
var _debois$elm_mdl$Material_List$withBody = _debois$elm_mdl$Material_Options$cs('mdl-list__item--three-line');
var _debois$elm_mdl$Material_List$li = function (options) {
	return A2(
		_debois$elm_mdl$Material_Options$styled,
		_elm_lang$html$Html$li,
		A2(
			_elm_lang$core$List_ops['::'],
			_debois$elm_mdl$Material_Options$cs('mdl-list__item'),
			options));
};
var _debois$elm_mdl$Material_List$ul = function (options) {
	return A2(
		_debois$elm_mdl$Material_Options$styled,
		_elm_lang$html$Html$ul,
		A2(
			_elm_lang$core$List_ops['::'],
			_debois$elm_mdl$Material_Options$cs('mdl-list'),
			options));
};

var _debois$elm_mdl$Demo_Lists$references = _elm_lang$core$Native_List.fromArray(
	[
		_debois$elm_mdl$Demo_Page$package('http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-List'),
		_debois$elm_mdl$Demo_Page$mds('https://material.google.com/components/lists.html'),
		_debois$elm_mdl$Demo_Page$mdl('https://www.getmdl.io/components/index.html#lists-section')
	]);
var _debois$elm_mdl$Demo_Lists$srcUrl = 'https://github.com/debois/elm-mdl/blob/master/demo/Demo/Lists.elm';
var _debois$elm_mdl$Demo_Lists$intro = A2(_debois$elm_mdl$Demo_Page$fromMDL, 'https://www.getmdl.io/components/index.html#lists-section', '\n> Lists present multiple line items vertically as a single continuous element.\n> Refer to the [Material Design\nSpec](https://material.google.com/components/lists.html) to know more about the\ncontent options.  ');
var _debois$elm_mdl$Demo_Lists$demoList = F2(
	function (title, _p0) {
		var _p1 = _p0;
		var half = _debois$elm_mdl$Material_Options$many(
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Phone, 4),
					A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Tablet, 8),
					A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Desktop, 6)
				]));
		var all = _debois$elm_mdl$Material_Options$many(
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Phone, 4),
					A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Tablet, 8),
					A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Desktop, 12)
				]));
		return _elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_Grid$cell,
				_elm_lang$core$Native_List.fromArray(
					[all]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Options$span,
						_elm_lang$core$Native_List.fromArray(
							[_debois$elm_mdl$Material_Typography$headline]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text(title)
							]))
					])),
				A2(
				_debois$elm_mdl$Material_Grid$cell,
				_elm_lang$core$Native_List.fromArray(
					[half]),
				_elm_lang$core$Native_List.fromArray(
					[_p1._0])),
				A2(
				_debois$elm_mdl$Material_Grid$cell,
				_elm_lang$core$Native_List.fromArray(
					[half]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Demo_Code$code,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_p1._1)
					]))
			]);
	});
var _debois$elm_mdl$Demo_Lists$mails = _elm_lang$core$Native_List.fromArray(
	[
		{ctor: '_Tuple5', _0: 'Alexander Grothendieck', _1: 'alexander.jpg', _2: 'Re: How to open a nut', _3: '1985', _4: 'I can illustrate the second approach with the same image of a nut to be opened. The first analogy that came to my mind is of immersing the nut in some softening liquid, and why not simply water? From time to time you rub so the liquid penetrates better, and otherwise you let time pass. The shell becomes more flexible through weeks and months—when the time is ripe, hand pressure is enough, the shell opens like a perfectly ripened avocado!'},
		{ctor: '_Tuple5', _0: 'Jean-Paul Sartre', _1: 'jean-paul.jpg', _2: 'Other people', _3: '1944', _4: 'Alors, c\'est ça l\'enfer. Je n\'aurais jamais cru... Vous vous rappelez: le soufre, le bûcher, le gril... Ah! quelle plaisanterie. Pas besoin de gril : l\'enfer, c\'est les Autres.'},
		{ctor: '_Tuple5', _0: 'Albert Camus', _1: 'albert.jpg', _2: 'Maman est morte', _3: '1942', _4: 'Aujourd\'hui, maman est morte. Ou peut-être hier, je ne sais pas. J\'ai reçu un télégramme de l\'asile : «Mère décédée. Enterrement demain.  Sentiments distingués.» Cela ne veut rien dire. C\'était peut-être hier.'},
		{ctor: '_Tuple5', _0: 'Leopold Kronecker', _1: 'leopold.jpg', _2: 'Re: Cantor', _3: '1893', _4: 'Die ganzen Zahlen hat der liebe Gott gemacht, alles andere ist Menschenwerk.'},
		{ctor: '_Tuple5', _0: 'Oscar Wilde', _1: 'oscar.jpg', _2: 'Re: Women', _3: 'Older', _4: 'How can a woman be expected to be happy with a man who insists on treating her as if she were a perfectly normal human being?'}
	]);
var _debois$elm_mdl$Demo_Lists$train = function (_p2) {
	var _p3 = _p2;
	return A2(
		_debois$elm_mdl$Material_List$li,
		_elm_lang$core$Native_List.fromArray(
			[_debois$elm_mdl$Material_List$withSubtitle]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_Options$div,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Options$center,
						_debois$elm_mdl$Material_Color$background(
						A2(_debois$elm_mdl$Material_Color$color, _p3._0._1, _debois$elm_mdl$Material_Color$S500)),
						_debois$elm_mdl$Material_Color$text(_debois$elm_mdl$Material_Color$accentContrast),
						_debois$elm_mdl$Material_Typography$title,
						A2(_debois$elm_mdl$Material_Options$css, 'width', '36px'),
						A2(_debois$elm_mdl$Material_Options$css, 'height', '36px'),
						A2(_debois$elm_mdl$Material_Options$css, 'margin-right', '2rem')
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text(
						_elm_lang$core$String$fromChar(_p3._0._0))
					])),
				A2(
				_debois$elm_mdl$Material_List$content,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Options$span,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text(_p3._1)
							])),
						A2(
						_debois$elm_mdl$Material_List$subtitle,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text(
								A2(
									_elm_lang$core$Basics_ops['++'],
									'Track ',
									_elm_lang$core$Basics$toString(_p3._2)))
							]))
					])),
				A3(
				_debois$elm_mdl$Material_Helpers$filter,
				_debois$elm_mdl$Material_List$content2,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_elm_lang$core$Maybe$map,
						function (m) {
							return A2(
								_debois$elm_mdl$Material_List$info2,
								_elm_lang$core$Native_List.fromArray(
									[]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text(m)
									]));
						},
						_p3._4),
						_elm_lang$core$Maybe$Just(
						_elm_lang$html$Html$text(_p3._3))
					]))
			]));
};
var _debois$elm_mdl$Demo_Lists$box = function (_p4) {
	var _p5 = _p4;
	return A2(
		_debois$elm_mdl$Material_Options$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_debois$elm_mdl$Material_Options$center,
				_debois$elm_mdl$Material_Color$background(
				A2(_debois$elm_mdl$Material_Color$color, _p5._1, _debois$elm_mdl$Material_Color$S500)),
				_debois$elm_mdl$Material_Color$text(_debois$elm_mdl$Material_Color$accentContrast),
				_debois$elm_mdl$Material_Typography$title,
				A2(_debois$elm_mdl$Material_Options$css, 'width', '36px'),
				A2(_debois$elm_mdl$Material_Options$css, 'height', '36px'),
				A2(_debois$elm_mdl$Material_Options$css, 'margin-right', '2rem')
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html$text(
				_elm_lang$core$String$fromChar(_p5._0))
			]));
};
var _debois$elm_mdl$Demo_Lists$trains = function () {
	var h = {
		ctor: '_Tuple2',
		_0: _elm_lang$core$Native_Utils.chr('H'),
		_1: _debois$elm_mdl$Material_Color$Red
	};
	var e = {
		ctor: '_Tuple2',
		_0: _elm_lang$core$Native_Utils.chr('E'),
		_1: _debois$elm_mdl$Material_Color$Purple
	};
	var c = {
		ctor: '_Tuple2',
		_0: _elm_lang$core$Native_Utils.chr('C'),
		_1: _debois$elm_mdl$Material_Color$Orange
	};
	var b = {
		ctor: '_Tuple2',
		_0: _elm_lang$core$Native_Utils.chr('B'),
		_1: _debois$elm_mdl$Material_Color$Green
	};
	var a = {
		ctor: '_Tuple2',
		_0: _elm_lang$core$Native_Utils.chr('A'),
		_1: _debois$elm_mdl$Material_Color$LightBlue
	};
	return _elm_lang$core$Native_List.fromArray(
		[
			{ctor: '_Tuple5', _0: e, _1: 'Holte', _2: 1, _3: '14:48', _4: _elm_lang$core$Maybe$Nothing},
			{
			ctor: '_Tuple5',
			_0: b,
			_1: 'Farum',
			_2: 1,
			_3: '14:52',
			_4: _elm_lang$core$Maybe$Just('+5m')
		},
			{ctor: '_Tuple5', _0: c, _1: 'Klampenborg', _2: 3, _3: '14:54', _4: _elm_lang$core$Maybe$Nothing},
			{ctor: '_Tuple5', _0: c, _1: 'Ballerup', _2: 2, _3: '14:55', _4: _elm_lang$core$Maybe$Nothing},
			{
			ctor: '_Tuple5',
			_0: b,
			_1: 'Høje Taastrup',
			_2: 4,
			_3: '14:56',
			_4: _elm_lang$core$Maybe$Just('cancelled')
		},
			{ctor: '_Tuple5', _0: a, _1: 'Hillerød', _2: 1, _3: '14:57', _4: _elm_lang$core$Maybe$Nothing},
			{ctor: '_Tuple5', _0: h, _1: 'Frederikssund', _2: 2, _3: '15:01', _4: _elm_lang$core$Maybe$Nothing}
		]);
}();
var _debois$elm_mdl$Demo_Lists$schedule = A2(
	_debois$elm_mdl$Material_List$ul,
	_elm_lang$core$Native_List.fromArray(
		[
			A2(_debois$elm_mdl$Material_Options$css, 'margin', '0'),
			A2(_debois$elm_mdl$Material_Options$css, 'padding', '0')
		]),
	A2(_elm_lang$core$List$map, _debois$elm_mdl$Demo_Lists$train, _debois$elm_mdl$Demo_Lists$trains));
var _debois$elm_mdl$Demo_Lists$comment = F2(
	function (list, txt) {
		return A2(
			_debois$elm_mdl$Material_Options$div,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_debois$elm_mdl$Material_Options$css, 'display', 'flex'),
					A2(_debois$elm_mdl$Material_Options$css, 'height', '100%'),
					A2(_debois$elm_mdl$Material_Options$css, 'flex-direction', 'column'),
					A2(_debois$elm_mdl$Material_Options$css, 'justify-content', 'space-between')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					list,
					A2(
					_debois$elm_mdl$Material_Options$div,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Options$css, 'width', '100%')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A3(
							_debois$elm_mdl$Material_Options$styled,
							_elm_lang$html$Html$p,
							_elm_lang$core$Native_List.fromArray(
								[
									A2(_debois$elm_mdl$Material_Options$css, 'text-align', 'right')
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text(txt)
								]))
						]))
				]));
	});
var _debois$elm_mdl$Demo_Lists$withCode = _elm_lang$core$Basics$flip(
	F2(
		function (v0, v1) {
			return {ctor: '_Tuple2', _0: v0, _1: v1};
		}));
var _debois$elm_mdl$Demo_Lists$basic = function (model) {
	return A2(
		_debois$elm_mdl$Demo_Lists$withCode,
		'\n   Lists.ul []\n    [ Lists.li [] [ Lists.content [] [ text \"Elm\" ] ]\n    , Lists.li [] [ Lists.content [] [ text \"F#\" ] ]\n    , Lists.li [] [ Lists.content [] [ text \"Lisp\" ] ]\n    ]\n  ',
		A2(
			_debois$elm_mdl$Material_List$ul,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_debois$elm_mdl$Material_Options$css, 'margin', '0'),
					A2(_debois$elm_mdl$Material_Options$css, 'padding', '0')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_List$li,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_List$content,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Elm')
								]))
						])),
					A2(
					_debois$elm_mdl$Material_List$li,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_List$content,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('F#')
								]))
						])),
					A2(
					_debois$elm_mdl$Material_List$li,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_List$content,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Lisp')
								]))
						]))
				])));
};
var _debois$elm_mdl$Demo_Lists$icons = function (model) {
	return A2(
		_debois$elm_mdl$Demo_Lists$withCode,
		'\n  Lists.ul []\n    [ Lists.li []\n        [ Lists.content [] \n            [ Lists.icon \"inbox\" []\n            , text \"Inbox\"\n            ]\n        ]\n    , Lists.li []\n        [ Lists.content [] \n            [ Lists.icon \"send\" []\n            , text \"Sent mail\"\n            ]\n        ]\n    , Lists.li []\n        [ Lists.content [] \n            [ Lists.icon \"delete\" []\n            , text \"Trash\"\n            ]\n        ]\n    ]\n    ',
		A2(
			_debois$elm_mdl$Material_List$ul,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_debois$elm_mdl$Material_Options$css, 'margin', '0'),
					A2(_debois$elm_mdl$Material_Options$css, 'padding', '0')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_List$li,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_List$content,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_debois$elm_mdl$Material_List$icon,
									'inbox',
									_elm_lang$core$Native_List.fromArray(
										[])),
									_elm_lang$html$Html$text('Inbox')
								]))
						])),
					A2(
					_debois$elm_mdl$Material_List$li,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_List$content,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_debois$elm_mdl$Material_List$icon,
									'send',
									_elm_lang$core$Native_List.fromArray(
										[])),
									_elm_lang$html$Html$text('Sent mail')
								]))
						])),
					A2(
					_debois$elm_mdl$Material_List$li,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_List$content,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_debois$elm_mdl$Material_List$icon,
									'delete',
									_elm_lang$core$Native_List.fromArray(
										[])),
									_elm_lang$html$Html$text('Trash')
								]))
						]))
				])));
};
var _debois$elm_mdl$Demo_Lists$avatars = function (model) {
	return A2(
		_debois$elm_mdl$Demo_Lists$withCode,
		'\n  Lists.ul []\n    [ Lists.li []\n        [ Lists.content []\n            [ Lists.avatarImage \"assets/christoffer.jpg\" []\n            , text \"Christoffer Wilhelm Eckersberg\"\n            ]\n        ]\n     , Lists.li []\n        [ Lists.content []\n            [ Lists.avatarImage \"assets/edvard.jpg\" []\n            , text \"Edvard Munch\"\n            ]\n        ]\n     , Lists.li []\n        [ Lists.content []\n            [ Lists.avatarImage \"assets/peder.jpg\" []\n            , text \"Peder Severin Krøyer\"\n            ]\n        ]\n    ]\n',
		A2(
			_debois$elm_mdl$Material_List$ul,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_debois$elm_mdl$Material_Options$css, 'margin', '0'),
					A2(_debois$elm_mdl$Material_Options$css, 'padding', '0')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_List$li,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_List$content,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_debois$elm_mdl$Material_List$avatarImage,
									'assets/images/christoffer.jpg',
									_elm_lang$core$Native_List.fromArray(
										[])),
									_elm_lang$html$Html$text('Christoffer Wilhelm Eckersberg')
								]))
						])),
					A2(
					_debois$elm_mdl$Material_List$li,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_List$content,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_debois$elm_mdl$Material_List$avatarImage,
									'assets/images/edvard.jpg',
									_elm_lang$core$Native_List.fromArray(
										[])),
									_elm_lang$html$Html$text('Edvard Munch')
								]))
						])),
					A2(
					_debois$elm_mdl$Material_List$li,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_List$content,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_debois$elm_mdl$Material_List$avatarImage,
									'assets/images/peder.jpg',
									_elm_lang$core$Native_List.fromArray(
										[])),
									_elm_lang$html$Html$text('Peder Severin Krøyer')
								]))
						]))
				])));
};
var _debois$elm_mdl$Demo_Lists$avatarsWithIcons = function (model) {
	return A2(
		_debois$elm_mdl$Demo_Lists$withCode,
		'\n   Lists.ul []\n    [ Lists.li []\n        [ Lists.content [] \n            [ Lists.avatarIcon \"photo_camera\" []\n            , text \"Henri Cartier-Bresson\"\n            ]\n        ]\n    , Lists.li []\n        [ Lists.content []\n            [ Lists.avatarIcon \"format_paint\" [] \n            , text \"Vincent Willem van Gogh\"\n            ]\n        ]\n     , Lists.li []\n        [ Lists.content []\n            [ Lists.avatarIcon \"assistant_photo\" [] \n            , text \"Horatio Nelson\"\n            ]\n        ]\n    ]\n  ',
		A2(
			_debois$elm_mdl$Material_List$ul,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_debois$elm_mdl$Material_Options$css, 'margin', '0'),
					A2(_debois$elm_mdl$Material_Options$css, 'padding', '0')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_List$li,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_List$content,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_debois$elm_mdl$Material_List$avatarIcon,
									'photo_camera',
									_elm_lang$core$Native_List.fromArray(
										[])),
									_elm_lang$html$Html$text('Henri Cartier-Bresson')
								]))
						])),
					A2(
					_debois$elm_mdl$Material_List$li,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_List$content,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_debois$elm_mdl$Material_List$avatarIcon,
									'format_paint',
									_elm_lang$core$Native_List.fromArray(
										[])),
									_elm_lang$html$Html$text('Vincent Willem van Gogh')
								]))
						])),
					A2(
					_debois$elm_mdl$Material_List$li,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_List$content,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_debois$elm_mdl$Material_List$avatarIcon,
									'assistant_photo',
									_elm_lang$core$Native_List.fromArray(
										[])),
									_elm_lang$html$Html$text('Horatio Nelson')
								]))
						]))
				])));
};
var _debois$elm_mdl$Demo_Lists$info = function (model) {
	return A2(
		_debois$elm_mdl$Demo_Lists$withCode,
		'\n  Lists.ul [] \n    [ Lists.li []\n        [ Lists.content [] [ text \"MacBook\" ] \n        , Lists.content2 [] \n            [ Lists.info2 [] [ text \"New\" ]\n            , Icon.view \"info\" [ Color.text Color.primary ]\n            ]\n        ]\n    , Lists.li []\n        [ Lists.content [] [ text \"iMac \"27\" ] \n        , Lists.content2 [] \n            [ Lists.info2 [] [ text \"Updated\" ]\n            , Icon.view \"info\" [ Color.text Color.primary ]\n            ]\n        ]\n    , Lists.li []\n        [ Lists.content [] [ text \"Mac Pro\" ] \n        , Lists.content2 [] \n            [ Icon.view \"info\" [ Color.text Color.primary ]\n            ]\n        ]\n',
		A2(
			_debois$elm_mdl$Material_List$ul,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_debois$elm_mdl$Material_Options$css, 'margin', '0'),
					A2(_debois$elm_mdl$Material_Options$css, 'padding', '0')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_List$li,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_List$content,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('MacBook')
								])),
							A2(
							_debois$elm_mdl$Material_List$content2,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_debois$elm_mdl$Material_List$info2,
									_elm_lang$core$Native_List.fromArray(
										[]),
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html$text('New')
										])),
									A2(
									_debois$elm_mdl$Material_Icon$view,
									'info',
									_elm_lang$core$Native_List.fromArray(
										[
											_debois$elm_mdl$Material_Color$text(_debois$elm_mdl$Material_Color$primary)
										]))
								]))
						])),
					A2(
					_debois$elm_mdl$Material_List$li,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_List$content,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('iMac \"27')
								])),
							A2(
							_debois$elm_mdl$Material_List$content2,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_debois$elm_mdl$Material_List$info2,
									_elm_lang$core$Native_List.fromArray(
										[]),
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html$text('Updated')
										])),
									A2(
									_debois$elm_mdl$Material_Icon$view,
									'info',
									_elm_lang$core$Native_List.fromArray(
										[
											_debois$elm_mdl$Material_Color$text(_debois$elm_mdl$Material_Color$primary)
										]))
								]))
						])),
					A2(
					_debois$elm_mdl$Material_List$li,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_List$content,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Mac Pro')
								])),
							A2(
							_debois$elm_mdl$Material_List$content2,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_debois$elm_mdl$Material_Icon$view,
									'info',
									_elm_lang$core$Native_List.fromArray(
										[
											_debois$elm_mdl$Material_Color$text(_debois$elm_mdl$Material_Color$primary)
										]))
								]))
						]))
				])));
};
var _debois$elm_mdl$Demo_Lists$subtitle = function (model) {
	return A2(
		_debois$elm_mdl$Demo_Lists$withCode,
		'\n  Lists.ul []\n    [ Lists.li [ Lists.withSubtitle ] -- NB! Required on every Lists.li containing subtitle.\n        [ Lists.content [] \n            [ text \"Mark Wright\" \n            , Lists.subtitle [] [ text \"4.02m (June 8, 1912)\" ]\n            ]\n        ]\n    , Lists.li [ Lists.withSubtitle ] \n        [ Lists.content [] \n            [ text \"Kjell Isaksson\" \n            , Lists.subtitle [] [ text \"5.51m (April 8, 1972)\" ]\n            ]\n        ]\n    , Lists.li [ Lists.withSubtitle ]\n        [ Lists.content [] \n          [ text \"Sergey Bubka\" \n          , Lists.subtitle [] [ text \"6.14m (July 31, 1994)\" ]\n          ]\n        ]\n    ]\n',
		A3(
			_elm_lang$core$Basics$flip,
			_debois$elm_mdl$Demo_Lists$comment,
			'Note that subtitle and body are mutually exclusive.\n                         Note also the required Lists.withSubtitle argument to Lists.li.',
			A2(
				_debois$elm_mdl$Material_List$ul,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Options$css, 'margin', '0'),
						A2(_debois$elm_mdl$Material_Options$css, 'padding', '0')
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_List$li,
						_elm_lang$core$Native_List.fromArray(
							[_debois$elm_mdl$Material_List$withSubtitle]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Material_List$content,
								_elm_lang$core$Native_List.fromArray(
									[]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Mark Wright'),
										A2(
										_debois$elm_mdl$Material_List$subtitle,
										_elm_lang$core$Native_List.fromArray(
											[]),
										_elm_lang$core$Native_List.fromArray(
											[
												_elm_lang$html$Html$text('4.02m (June 8, 1912)')
											]))
									]))
							])),
						A2(
						_debois$elm_mdl$Material_List$li,
						_elm_lang$core$Native_List.fromArray(
							[_debois$elm_mdl$Material_List$withSubtitle]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Material_List$content,
								_elm_lang$core$Native_List.fromArray(
									[]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Kjell Isaksson'),
										A2(
										_debois$elm_mdl$Material_List$subtitle,
										_elm_lang$core$Native_List.fromArray(
											[]),
										_elm_lang$core$Native_List.fromArray(
											[
												_elm_lang$html$Html$text('5.51m (April 8, 1972)')
											]))
									]))
							])),
						A2(
						_debois$elm_mdl$Material_List$li,
						_elm_lang$core$Native_List.fromArray(
							[_debois$elm_mdl$Material_List$withSubtitle]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Material_List$content,
								_elm_lang$core$Native_List.fromArray(
									[]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Sergey Bubka'),
										A2(
										_debois$elm_mdl$Material_List$subtitle,
										_elm_lang$core$Native_List.fromArray(
											[]),
										_elm_lang$core$Native_List.fromArray(
											[
												_elm_lang$html$Html$text('6.14m (July 31, 1994)')
											]))
									]))
							]))
					]))));
};
var _debois$elm_mdl$Demo_Lists$body = function (model) {
	return A2(
		_debois$elm_mdl$Demo_Lists$withCode,
		'\n   Lists.ul []\n    [ Lists.li [ Lists.withBody ] -- NB! Required on every Lists.li containing body. \n        [ Lists.content [] \n            [ text \"Robert Frost\"\n            , Lists.body [] [ text \"I shall be telling this with a sigh / Somewhere ages and ages hence: / Two roads diverged in a wood, and I— / I took the one less traveled by, / And that has made all the difference.\" ]\n            ]\n        ]\n    , Lists.li [ Lists.withBody ]\n        [ Lists.content [] \n            [ text \"Errett Bishop\"\n            , Lists.body [] [ text \"And yet there is dissatisfaction in the mathematical community.  The pure mathematician is isolated from the world, which has little need of his brilliant creations. He suffers from an alienation which is seemingly inevitable: he has followed the gleam and it has led him out of this world.\" \n              ]\n            ]\n        ]\n    , Lists.li [ Lists.withBody ]\n        [ Lists.content [] \n          [ text \"Hunter Stockton Thompson\"\n          , Lists.body [] [ text \"We were somewhere around Barstow on the edge of the desert when the drugs began to take hold. I remember saying something like »I feel a bit lightheaded; maybe you should drive...« \" ]\n          ]\n        ]\n    ]\n',
		A3(
			_elm_lang$core$Basics$flip,
			_debois$elm_mdl$Demo_Lists$comment,
			'Note that body and subtitle are mutually exclusive.\n                         Note also the required Lists.withBody argument to Lists.li.',
			A2(
				_debois$elm_mdl$Material_List$ul,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Options$css, 'margin', '0'),
						A2(_debois$elm_mdl$Material_Options$css, 'padding', '0')
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_List$li,
						_elm_lang$core$Native_List.fromArray(
							[_debois$elm_mdl$Material_List$withBody]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Material_List$content,
								_elm_lang$core$Native_List.fromArray(
									[]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Robert Frost'),
										A2(
										_debois$elm_mdl$Material_List$body,
										_elm_lang$core$Native_List.fromArray(
											[]),
										_elm_lang$core$Native_List.fromArray(
											[
												_elm_lang$html$Html$text(' \nI shall be telling this with a sigh /\nSomewhere ages and ages hence: /\nTwo roads diverged in a wood, and I— /\nI took the one less traveled by, /\nAnd that has made all the difference.  ')
											]))
									]))
							])),
						A2(
						_debois$elm_mdl$Material_List$li,
						_elm_lang$core$Native_List.fromArray(
							[_debois$elm_mdl$Material_List$withBody]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Material_List$content,
								_elm_lang$core$Native_List.fromArray(
									[]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Errett Bishop'),
										A2(
										_debois$elm_mdl$Material_List$body,
										_elm_lang$core$Native_List.fromArray(
											[]),
										_elm_lang$core$Native_List.fromArray(
											[
												_elm_lang$html$Html$text('\nAnd yet there is dissatisfaction in the mathematical community. \nThe pure mathematician is isolated from the world, which has \nlittle need of his brilliant creations. He suffers from an \nalienation which is seemingly inevitable: he has followed the gleam \nand it has led him out of this world. \n              ')
											]))
									]))
							])),
						A2(
						_debois$elm_mdl$Material_List$li,
						_elm_lang$core$Native_List.fromArray(
							[_debois$elm_mdl$Material_List$withBody]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Material_List$content,
								_elm_lang$core$Native_List.fromArray(
									[]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Hunter Stockton Thompson'),
										A2(
										_debois$elm_mdl$Material_List$body,
										_elm_lang$core$Native_List.fromArray(
											[]),
										_elm_lang$core$Native_List.fromArray(
											[
												_elm_lang$html$Html$text('\nWe were somewhere around Barstow on the edge of the desert when the drugs began\nto take hold. I remember saying something like »I feel a bit lightheaded; maybe\nyou should drive...« ')
											]))
									]))
							]))
					]))));
};
var _debois$elm_mdl$Demo_Lists$update = F2(
	function (action, model) {
		var _p6 = action;
		switch (_p6.ctor) {
			case 'ListsMsg':
				return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
			case 'Flip':
				var _p7 = _p6._0;
				return A2(_elm_lang$core$Set$member, _p7, model.toggles) ? {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							toggles: A2(_elm_lang$core$Set$remove, _p7, model.toggles)
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				} : {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							toggles: A2(_elm_lang$core$Set$insert, _p7, model.toggles)
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'Click':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{str: _p6._0}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			default:
				return A2(_debois$elm_mdl$Material$update, _p6._0, model);
		}
	});
var _debois$elm_mdl$Demo_Lists$model = {
	mdl: _debois$elm_mdl$Material$model,
	toggles: _elm_lang$core$Set$fromList(
		_elm_lang$core$Native_List.fromArray(
			[1, 9, 10])),
	str: ''
};
var _debois$elm_mdl$Demo_Lists$Model = F3(
	function (a, b, c) {
		return {mdl: a, toggles: b, str: c};
	});
var _debois$elm_mdl$Demo_Lists$Mdl = function (a) {
	return {ctor: 'Mdl', _0: a};
};
var _debois$elm_mdl$Demo_Lists$Click = function (a) {
	return {ctor: 'Click', _0: a};
};
var _debois$elm_mdl$Demo_Lists$click = function (model) {
	return A2(
		_debois$elm_mdl$Demo_Lists$withCode,
		'\n div \n    [] \n    [ Lists.ul []\n        [ Lists.li [] \n            [ Lists.content \n                [ Options.attribute <| Html.Events.onClick (Click \"Elm\") ] \n                [ text \"Elm\" ] \n            ]\n        , Lists.li [] \n            [ Lists.content \n                [ Options.attribute <| Html.Events.onClick (Click \"F#\") ] \n                [ text \"F#\" ] \n            ]\n        , Lists.li [] \n            [ Lists.content \n                [ Options.attribute <| Html.Events.onClick (Click \"Lisp\") ] \n                [ text \"Lisp\" ] \n            ]\n        ]\n    , p [] \n        [ text <| \"Try clicking a list item above. \" ++ \n            if model.str /= \"\" then \n              \"You chose \'\" ++ model.str ++ \"\'.\" \n            else \n              \"\" \n        ]\n    ]\n  ',
		A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_List$ul,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Options$css, 'margin', '0'),
							A2(_debois$elm_mdl$Material_Options$css, 'padding', '0')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_List$li,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_debois$elm_mdl$Material_List$content,
									_elm_lang$core$Native_List.fromArray(
										[
											_debois$elm_mdl$Material_Options$attribute(
											_elm_lang$html$Html_Events$onClick(
												_debois$elm_mdl$Demo_Lists$Click('Elm')))
										]),
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html$text('Elm')
										]))
								])),
							A2(
							_debois$elm_mdl$Material_List$li,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_debois$elm_mdl$Material_List$content,
									_elm_lang$core$Native_List.fromArray(
										[
											_debois$elm_mdl$Material_Options$attribute(
											_elm_lang$html$Html_Events$onClick(
												_debois$elm_mdl$Demo_Lists$Click('F#')))
										]),
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html$text('F#')
										]))
								])),
							A2(
							_debois$elm_mdl$Material_List$li,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_debois$elm_mdl$Material_List$content,
									_elm_lang$core$Native_List.fromArray(
										[
											_debois$elm_mdl$Material_Options$attribute(
											_elm_lang$html$Html_Events$onClick(
												_debois$elm_mdl$Demo_Lists$Click('Lisp')))
										]),
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html$text('Lisp')
										]))
								]))
						])),
					A2(
					_elm_lang$html$Html$p,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text(
							A2(
								_elm_lang$core$Basics_ops['++'],
								'Try clicking a list item above. ',
								(!_elm_lang$core$Native_Utils.eq(model.str, '')) ? A2(
									_elm_lang$core$Basics_ops['++'],
									'You chose \'',
									A2(_elm_lang$core$Basics_ops['++'], model.str, '\'.')) : ''))
						]))
				])));
};
var _debois$elm_mdl$Demo_Lists$Flip = function (a) {
	return {ctor: 'Flip', _0: a};
};
var _debois$elm_mdl$Demo_Lists$secondaryAction1 = function (model) {
	var star = F2(
		function (model, k) {
			return A5(
				_debois$elm_mdl$Material_Button$render,
				_debois$elm_mdl$Demo_Lists$Mdl,
				_elm_lang$core$Native_List.fromArray(
					[k]),
				model.mdl,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Button$icon,
						A2(
						_debois$elm_mdl$Material_Options$when,
						_debois$elm_mdl$Material_Button$accent,
						A2(_elm_lang$core$Set$member, k, model.toggles)),
						_debois$elm_mdl$Material_Button$onClick(
						_debois$elm_mdl$Demo_Lists$Flip(k))
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Icon$i('star')
					]));
		});
	return A2(
		_debois$elm_mdl$Demo_Lists$withCode,
		'  \n  let \n    star model k = \n      Button.render Mdl [k] model.mdl\n        [ Button.icon \n        , Button.accent `when` Set.member k model.toggles \n        , Button.onClick (Flip k)\n        ]\n        [ Icon.i \"star\" ]\n  in \n    Lists.ul [] \n      [ Lists.li []\n          [ Lists.content [] [ text \"Alan Turing\" ] \n          , star model 0\n          ]\n      , Lists.li []\n          [ Lists.content [] [ text \"Kurt Friedrich Gödel\" ]\n          , star model 1\n          ]\n      , Lists.li []\n          [ Lists.content [] [ text \"Georg Ferdinand Ludwig Philipp Cantor\" ] \n          , star model 2\n          ]\n      ]    \n  ',
		A2(
			_debois$elm_mdl$Material_List$ul,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_debois$elm_mdl$Material_Options$css, 'margin', '0'),
					A2(_debois$elm_mdl$Material_Options$css, 'padding', '0')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_List$li,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_List$content,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Alan Turing')
								])),
							A2(star, model, 0)
						])),
					A2(
					_debois$elm_mdl$Material_List$li,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_List$content,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Kurt Friedrich Gödel')
								])),
							A2(star, model, 1)
						])),
					A2(
					_debois$elm_mdl$Material_List$li,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_List$content,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Georg Ferdinand Ludwig Philipp Cantor')
								])),
							A2(star, model, 2)
						]))
				])));
};
var _debois$elm_mdl$Demo_Lists$secondaryAction2 = function (model) {
	var list = A2(
		_debois$elm_mdl$Material_List$ul,
		_elm_lang$core$Native_List.fromArray(
			[
				A2(_debois$elm_mdl$Material_Options$css, 'margin', '0'),
				A2(_debois$elm_mdl$Material_Options$css, 'padding', '0')
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_List$li,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_List$content,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Include checkbox?')
							])),
						A2(
						_debois$elm_mdl$Material_List$content2,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_elm_lang$core$Native_List.fromArray(
							[
								A5(
								_debois$elm_mdl$Material_Toggles$checkbox,
								_debois$elm_mdl$Demo_Lists$Mdl,
								_elm_lang$core$Native_List.fromArray(
									[4]),
								model.mdl,
								_elm_lang$core$Native_List.fromArray(
									[
										_debois$elm_mdl$Material_Toggles$value(
										A2(_elm_lang$core$Set$member, 4, model.toggles)),
										_debois$elm_mdl$Material_Toggles$onClick(
										_debois$elm_mdl$Demo_Lists$Flip(4))
									]),
								_elm_lang$core$Native_List.fromArray(
									[]))
							]))
					])),
				A2(
				_debois$elm_mdl$Material_List$li,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_List$content,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Radio button!')
							])),
						A2(
						_debois$elm_mdl$Material_List$content2,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Material_Options$span,
								_elm_lang$core$Native_List.fromArray(
									[_debois$elm_mdl$Material_List$action2]),
								_elm_lang$core$Native_List.fromArray(
									[
										A5(
										_debois$elm_mdl$Material_Toggles$radio,
										_debois$elm_mdl$Demo_Lists$Mdl,
										_elm_lang$core$Native_List.fromArray(
											[5]),
										model.mdl,
										_elm_lang$core$Native_List.fromArray(
											[
												_debois$elm_mdl$Material_Toggles$value(
												A2(_elm_lang$core$Set$member, 5, model.toggles)),
												_debois$elm_mdl$Material_Toggles$onClick(
												_debois$elm_mdl$Demo_Lists$Flip(5)),
												A2(_debois$elm_mdl$Material_Options$css, 'display', 'inline')
											]),
										_elm_lang$core$Native_List.fromArray(
											[]))
									]))
							]))
					])),
				A2(
				_debois$elm_mdl$Material_List$li,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_List$content,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Include switch?')
							])),
						A2(
						_debois$elm_mdl$Material_List$content2,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_elm_lang$core$Native_List.fromArray(
							[
								A5(
								_debois$elm_mdl$Material_Toggles$switch,
								_debois$elm_mdl$Demo_Lists$Mdl,
								_elm_lang$core$Native_List.fromArray(
									[6]),
								model.mdl,
								_elm_lang$core$Native_List.fromArray(
									[
										_debois$elm_mdl$Material_Toggles$value(
										A2(_elm_lang$core$Set$member, 6, model.toggles)),
										_debois$elm_mdl$Material_Toggles$onClick(
										_debois$elm_mdl$Demo_Lists$Flip(6))
									]),
								_elm_lang$core$Native_List.fromArray(
									[]))
							]))
					]))
			]));
	return A2(
		_debois$elm_mdl$Demo_Lists$withCode,
		'\n  Lists.ul []\n    [ Lists.li []\n        [ Lists.content [] [ text \"Include checkbox?\" ]\n        , Lists.content2 [] \n            [ Toggles.checkbox Mdl [4] model.mdl\n                [ Toggles.value (Set.member 4 model.toggles) \n                , Toggles.onClick (Flip 4)\n                ] \n                []\n            ]\n        ]\n    , Lists.li []\n        [ Lists.content [] [ text \"Radio button!\" ]\n        , Lists.content2 [] \n            [ Options.span \n                [Lists.action2]\n                [ Toggles.radio Mdl [5] model.mdl\n                    [ Toggles.value (Set.member 5 model.toggles)\n                    , Toggles.onClick (Flip 5)\n                    , Options.css \"display\" \"inline\"\n                    ]\n                    []\n                ]\n            ]\n        ]\n    , Lists.li []\n        [ Lists.content [] [ text \"Include switch?\" ] \n        , Lists.content2 [] \n            [ Toggles.switch Mdl [6] model.mdl\n                [ Toggles.value (Set.member 6 model.toggles)\n                , Toggles.onClick (Flip 6)\n                ]\n                []\n            ]\n        ]\n    ]\n  ',
		A2(_debois$elm_mdl$Demo_Lists$comment, list, 'Note the incantations necessary to get Radio Button positioning correct.'));
};
var _debois$elm_mdl$Demo_Lists$mail = F3(
	function (model, idx, _p8) {
		var _p9 = _p8;
		var k = idx + 7;
		var starred = A2(_elm_lang$core$Set$member, k, model.toggles);
		return A2(
			_debois$elm_mdl$Material_List$li,
			_elm_lang$core$Native_List.fromArray(
				[_debois$elm_mdl$Material_List$withBody]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_List$content,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_List$avatarImage,
							A2(_elm_lang$core$Basics_ops['++'], 'assets/images/', _p9._1),
							_elm_lang$core$Native_List.fromArray(
								[])),
							_elm_lang$html$Html$text(_p9._2),
							A2(
							_debois$elm_mdl$Material_List$body,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_debois$elm_mdl$Material_Options$span,
									_elm_lang$core$Native_List.fromArray(
										[
											A2(_debois$elm_mdl$Material_Options$css, 'font-weight', '600')
										]),
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html$text(_p9._0)
										])),
									A2(
									_debois$elm_mdl$Material_Options$span,
									_elm_lang$core$Native_List.fromArray(
										[]),
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html$text('—')
										])),
									A2(
									_debois$elm_mdl$Material_Options$span,
									_elm_lang$core$Native_List.fromArray(
										[]),
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html$text(_p9._4)
										]))
								]))
						])),
					A2(
					_debois$elm_mdl$Material_List$content2,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_List$info2,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text(_p9._3)
								])),
							A5(
							_debois$elm_mdl$Material_Button$render,
							_debois$elm_mdl$Demo_Lists$Mdl,
							_elm_lang$core$Native_List.fromArray(
								[k]),
							model.mdl,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Button$icon,
									_debois$elm_mdl$Material_Button$onClick(
									_debois$elm_mdl$Demo_Lists$Flip(k))
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Icon$i(
									starred ? 'star' : 'star_border')
								]))
						]))
				]));
	});
var _debois$elm_mdl$Demo_Lists$inbox = function (model) {
	return A2(
		_debois$elm_mdl$Material_List$ul,
		_elm_lang$core$Native_List.fromArray(
			[
				A2(_debois$elm_mdl$Material_Options$css, 'margin', '0'),
				A2(_debois$elm_mdl$Material_Options$css, 'padding', '0')
			]),
		A2(
			_elm_lang$core$List$indexedMap,
			_debois$elm_mdl$Demo_Lists$mail(model),
			_debois$elm_mdl$Demo_Lists$mails));
};
var _debois$elm_mdl$Demo_Lists$ListsMsg = {ctor: 'ListsMsg'};
var _debois$elm_mdl$Demo_Lists$File = {ctor: 'File'};
var _debois$elm_mdl$Demo_Lists$Folder = {ctor: 'Folder'};
var _debois$elm_mdl$Demo_Lists$files = _elm_lang$core$Native_List.fromArray(
	[
		{
		ctor: '_Tuple6',
		_0: _debois$elm_mdl$Demo_Lists$Folder,
		_1: 'demo',
		_2: '2 days ago',
		_3: '@aforemny',
		_4: _debois$elm_mdl$Material_Color$Indigo,
		_5: _elm_lang$core$Maybe$Just(false)
	},
		{ctor: '_Tuple6', _0: _debois$elm_mdl$Demo_Lists$Folder, _1: 'src', _2: '2 days ago', _3: '@vipetti', _4: _debois$elm_mdl$Material_Color$Indigo, _5: _elm_lang$core$Maybe$Nothing},
		{ctor: '_Tuple6', _0: _debois$elm_mdl$Demo_Lists$Folder, _1: 'examples', _2: '2 days ago', _3: '@aforemny', _4: _debois$elm_mdl$Material_Color$BlueGrey, _5: _elm_lang$core$Maybe$Nothing},
		{
		ctor: '_Tuple6',
		_0: _debois$elm_mdl$Demo_Lists$File,
		_1: 'CONTRIBUTING.md',
		_2: '28 days ago',
		_3: '@debois',
		_4: _debois$elm_mdl$Material_Color$DeepOrange,
		_5: _elm_lang$core$Maybe$Just(true)
	},
		{
		ctor: '_Tuple6',
		_0: _debois$elm_mdl$Demo_Lists$File,
		_1: 'README.md',
		_2: '5 days ago',
		_3: '@aforemny',
		_4: _debois$elm_mdl$Material_Color$DeepOrange,
		_5: _elm_lang$core$Maybe$Just(true)
	},
		{ctor: '_Tuple6', _0: _debois$elm_mdl$Demo_Lists$File, _1: 'elm-package.json', _2: '6 days ago', _3: '@debois', _4: _debois$elm_mdl$Material_Color$Orange, _5: _elm_lang$core$Maybe$Nothing},
		{
		ctor: '_Tuple6',
		_0: _debois$elm_mdl$Demo_Lists$File,
		_1: 'Makefile',
		_2: '5 days ago',
		_3: '@aforemny',
		_4: _debois$elm_mdl$Material_Color$Teal,
		_5: _elm_lang$core$Maybe$Just(false)
	}
	]);
var _debois$elm_mdl$Demo_Lists$git = function (_p10) {
	var _p11 = _p10;
	return A2(
		_debois$elm_mdl$Material_List$li,
		_elm_lang$core$Native_List.fromArray(
			[_debois$elm_mdl$Material_List$withSubtitle]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_List$content,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_List$avatarIcon,
						_elm_lang$core$Native_Utils.eq(_p11._0, _debois$elm_mdl$Demo_Lists$Folder) ? 'folder' : 'insert_drive_file',
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Color$background(
								A2(_debois$elm_mdl$Material_Color$color, _p11._4, _debois$elm_mdl$Material_Color$S500))
							])),
						_elm_lang$html$Html$text(_p11._1),
						A2(
						_debois$elm_mdl$Material_List$subtitle,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Material_Options$span,
								_elm_lang$core$Native_List.fromArray(
									[]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text(
										A2(
											_elm_lang$core$Basics_ops['++'],
											_p11._2,
											A2(_elm_lang$core$Basics_ops['++'], ' by ', _p11._3)))
									]))
							]))
					])),
				function () {
				var _p12 = _p11._5;
				if (_p12.ctor === 'Just') {
					if (_p12._0 === true) {
						return A2(
							_debois$elm_mdl$Material_Icon$view,
							'star',
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Color$text(_debois$elm_mdl$Material_Color$primary)
								]));
					} else {
						return A2(
							_debois$elm_mdl$Material_Icon$view,
							'error_outline',
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Color$text(_debois$elm_mdl$Material_Color$accent)
								]));
					}
				} else {
					return A2(
						_elm_lang$html$Html$div,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_elm_lang$core$Native_List.fromArray(
							[]));
				}
			}()
			]));
};
var _debois$elm_mdl$Demo_Lists$commits = A2(
	_debois$elm_mdl$Material_List$ul,
	_elm_lang$core$Native_List.fromArray(
		[
			A2(_debois$elm_mdl$Material_Options$css, 'margin', '0'),
			A2(_debois$elm_mdl$Material_Options$css, 'padding', '0')
		]),
	A2(_elm_lang$core$List$map, _debois$elm_mdl$Demo_Lists$git, _debois$elm_mdl$Demo_Lists$files));
var _debois$elm_mdl$Demo_Lists$view = function (model) {
	var demo = A2(
		_debois$elm_mdl$Material_Grid$grid,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_Grid$cell,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Tablet, 8),
						A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Desktop, 5)
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A3(
						_debois$elm_mdl$Material_Options$styled,
						_elm_lang$html$Html$h4,
						_elm_lang$core$Native_List.fromArray(
							[_debois$elm_mdl$Material_Typography$headline]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Departures')
							])),
						_debois$elm_mdl$Demo_Lists$schedule
					])),
				A2(
				_debois$elm_mdl$Material_Grid$cell,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Tablet, 8),
						A2(_debois$elm_mdl$Material_Grid$offset, _debois$elm_mdl$Material_Grid$Desktop, 1),
						A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Desktop, 5)
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A3(
						_debois$elm_mdl$Material_Options$styled,
						_elm_lang$html$Html$h4,
						_elm_lang$core$Native_List.fromArray(
							[_debois$elm_mdl$Material_Typography$headline]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Files')
							])),
						_debois$elm_mdl$Demo_Lists$commits
					])),
				A2(
				_debois$elm_mdl$Material_Grid$cell,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Tablet, 8),
						A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Desktop, 6),
						A2(_debois$elm_mdl$Material_Grid$offset, _debois$elm_mdl$Material_Grid$Desktop, 3)
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A3(
						_debois$elm_mdl$Material_Options$styled,
						_elm_lang$html$Html$h4,
						_elm_lang$core$Native_List.fromArray(
							[_debois$elm_mdl$Material_Typography$headline]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Unread mail')
							])),
						_debois$elm_mdl$Demo_Lists$inbox(model)
					]))
			]));
	var docs = _elm_lang$core$Native_List.fromArray(
		[
			A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_Grid$grid,
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Grid$maxWidth('1200px')
						]),
					A2(
						_elm_lang$core$List$concatMap,
						function (_p13) {
							var _p14 = _p13;
							return A2(
								_debois$elm_mdl$Demo_Lists$demoList,
								_p14._0,
								_p14._1(model));
						},
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								F2(
									function (v0, v1) {
										return {ctor: '_Tuple2', _0: v0, _1: v1};
									}),
								'Basic list',
								_debois$elm_mdl$Demo_Lists$basic),
								A2(
								F2(
									function (v0, v1) {
										return {ctor: '_Tuple2', _0: v0, _1: v1};
									}),
								'List with icons',
								_debois$elm_mdl$Demo_Lists$icons),
								A2(
								F2(
									function (v0, v1) {
										return {ctor: '_Tuple2', _0: v0, _1: v1};
									}),
								'List with avatars',
								_debois$elm_mdl$Demo_Lists$avatars),
								A2(
								F2(
									function (v0, v1) {
										return {ctor: '_Tuple2', _0: v0, _1: v1};
									}),
								'List with icon-avatars',
								_debois$elm_mdl$Demo_Lists$avatarsWithIcons),
								A2(
								F2(
									function (v0, v1) {
										return {ctor: '_Tuple2', _0: v0, _1: v1};
									}),
								'List with secondary action',
								_debois$elm_mdl$Demo_Lists$secondaryAction1),
								A2(
								F2(
									function (v0, v1) {
										return {ctor: '_Tuple2', _0: v0, _1: v1};
									}),
								'List with secondary action & info',
								_debois$elm_mdl$Demo_Lists$info),
								A2(
								F2(
									function (v0, v1) {
										return {ctor: '_Tuple2', _0: v0, _1: v1};
									}),
								'List with secondary action toggles',
								_debois$elm_mdl$Demo_Lists$secondaryAction2),
								A2(
								F2(
									function (v0, v1) {
										return {ctor: '_Tuple2', _0: v0, _1: v1};
									}),
								'List with subtitles',
								_debois$elm_mdl$Demo_Lists$subtitle),
								A2(
								F2(
									function (v0, v1) {
										return {ctor: '_Tuple2', _0: v0, _1: v1};
									}),
								'List with body',
								_debois$elm_mdl$Demo_Lists$body),
								A2(
								F2(
									function (v0, v1) {
										return {ctor: '_Tuple2', _0: v0, _1: v1};
									}),
								'List with actions',
								_debois$elm_mdl$Demo_Lists$click)
							])))
				]))
		]);
	return A6(
		_debois$elm_mdl$Demo_Page$body1$,
		'Lists',
		_debois$elm_mdl$Demo_Lists$srcUrl,
		_debois$elm_mdl$Demo_Lists$intro,
		_debois$elm_mdl$Demo_Lists$references,
		_elm_lang$core$Native_List.fromArray(
			[demo]),
		docs);
};

var _debois$elm_mdl$Material_Progress$percentage = function (p) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_elm_lang$core$Basics$toString(p),
		'%');
};
var _debois$elm_mdl$Material_Progress$bar = F4(
	function (indeterminate, buffered, p, b) {
		return A2(
			_debois$elm_mdl$Material_Options$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$cs('mdl-progress mdl-js-progress is-upgraded'),
					indeterminate ? _debois$elm_mdl$Material_Options$cs('mdl-progress__indeterminate') : _debois$elm_mdl$Material_Options$nop
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_Options$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Options$cs('progressbar bar bar1'),
							A2(
							_debois$elm_mdl$Material_Options$css,
							'width',
							_debois$elm_mdl$Material_Progress$percentage(p))
						]),
					_elm_lang$core$Native_List.fromArray(
						[])),
					A2(
					_debois$elm_mdl$Material_Options$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Options$cs('bufferbar bar bar2'),
							A2(
							_debois$elm_mdl$Material_Options$css,
							'width',
							_debois$elm_mdl$Material_Progress$percentage(b))
						]),
					_elm_lang$core$Native_List.fromArray(
						[])),
					A2(
					_debois$elm_mdl$Material_Options$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Options$cs('auxbar bar bar3'),
							A2(
							_debois$elm_mdl$Material_Options$css,
							'width',
							_debois$elm_mdl$Material_Progress$percentage(
								buffered ? (100 - b) : 0))
						]),
					_elm_lang$core$Native_List.fromArray(
						[]))
				]));
	});
var _debois$elm_mdl$Material_Progress$buffered = F2(
	function (p, b) {
		return A4(_debois$elm_mdl$Material_Progress$bar, false, true, p, b);
	});
var _debois$elm_mdl$Material_Progress$progress = function (p) {
	return A4(_debois$elm_mdl$Material_Progress$bar, false, false, p, 100);
};
var _debois$elm_mdl$Material_Progress$indeterminate = A4(_debois$elm_mdl$Material_Progress$bar, true, false, 0, 100);

var _debois$elm_mdl$Material_Spinner$createLayer = function (n) {
	return A2(
		_debois$elm_mdl$Material_Options$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_debois$elm_mdl$Material_Options$cs(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'mdl-spinner__layer mdl-spinner__layer-',
					_elm_lang$core$Basics$toString(n)))
			]),
		A2(
			_elm_lang$core$List$map,
			F2(
				function (x, y) {
					return y(x);
				})(
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Options$div,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Options$cs('mdl-spinner__circle')
							]),
						_elm_lang$core$Native_List.fromArray(
							[]))
					])),
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$div(
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Options$cs('mdl-spinner__circle-clipper mdl-spinner__left')
						])),
					_debois$elm_mdl$Material_Options$div(
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Options$cs('mdl-spinner__gap-patch')
						])),
					_debois$elm_mdl$Material_Options$div(
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Options$cs('mdl-spinner__circle-clipper mdl-spinner__right')
						]))
				])));
};
var _debois$elm_mdl$Material_Spinner$defaultConfig = {active: false, singleColor: false};
var _debois$elm_mdl$Material_Spinner$singleColor = function (value) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{singleColor: value});
		});
};
var _debois$elm_mdl$Material_Spinner$active = function (value) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{active: value});
		});
};
var _debois$elm_mdl$Material_Spinner$spinner = function (options) {
	var _p0 = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Spinner$defaultConfig, options);
	var summary = _p0;
	var config = _p0.config;
	return A5(
		_debois$elm_mdl$Material_Options$apply,
		summary,
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_debois$elm_mdl$Material_Options$cs('mdl-spinner mdl-js-spinner is-upgraded'),
				config.active ? _debois$elm_mdl$Material_Options$cs('is-active') : _debois$elm_mdl$Material_Options$nop,
				config.singleColor ? _debois$elm_mdl$Material_Options$cs('mdl-spinner--single-color') : _debois$elm_mdl$Material_Options$nop
			]),
		_elm_lang$core$Native_List.fromArray(
			[]),
		A2(
			_elm_lang$core$List$map,
			_debois$elm_mdl$Material_Spinner$createLayer,
			_elm_lang$core$Native_List.range(1, 4)));
};
var _debois$elm_mdl$Material_Spinner$Config = F2(
	function (a, b) {
		return {active: a, singleColor: b};
	});

var _debois$elm_mdl$Demo_Loading$references = _elm_lang$core$Native_List.fromArray(
	[
		_debois$elm_mdl$Demo_Page$package('http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Loading'),
		_debois$elm_mdl$Demo_Page$mds('https://www.google.com/design/spec/components/Loading.html'),
		_debois$elm_mdl$Demo_Page$mdl('https://www.getmdl.io/components/index.html#Loading')
	]);
var _debois$elm_mdl$Demo_Loading$srcUrl = 'https://github.com/debois/elm-mdl/blob/master/demo/Demo/Loading.elm';
var _debois$elm_mdl$Demo_Loading$intro = A2(_debois$elm_mdl$Demo_Page$fromMDL, 'https://www.getmdl.io/components/index.html#loading-section', '\n> The Material Design Lite (MDL) progress component is a visual indicator of\n> background activity in a web page or application. A progress indicator\n> consists of a (typically) horizontal bar containing some animation that\n> conveys a sense of motion. While some progress devices indicate an\n> approximate or specific percentage of completion, the MDL progress component\n> simply communicates the fact that an activity is ongoing and is not yet\n> complete.\n\n> Progress indicators are an established but non-standardized feature in user\n> interfaces, and provide users with a visual clue to an application\'s status.\n> Their design and use is therefore an important factor in the overall user\n> experience. See the progress component\'s Material Design specifications page\n> for details.\n');
var _debois$elm_mdl$Demo_Loading$demoContainer = function (_p0) {
	var _p1 = _p0;
	return A2(
		_debois$elm_mdl$Material_Grid$cell,
		_elm_lang$core$Native_List.fromArray(
			[
				A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 4)
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_Options$div,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Options$css, 'text-align', 'center')
					]),
				_elm_lang$core$Native_List.fromArray(
					[_p1._0])),
				A2(
				_debois$elm_mdl$Demo_Code$code,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Options$css, 'margin', '32px 0')
					]),
				_p1._1)
			]));
};
var _debois$elm_mdl$Demo_Loading$demoBars = function (model) {
	var buffered = A2(_elm_lang$core$Basics$min, 100.0, 3.0 * model.progress);
	var k = _elm_lang$core$Basics$toString(model.progress);
	return A2(
		_elm_lang$core$List$map,
		_debois$elm_mdl$Demo_Loading$demoContainer,
		_elm_lang$core$Native_List.fromArray(
			[
				{
				ctor: '_Tuple2',
				_0: _debois$elm_mdl$Material_Progress$progress(model.progress),
				_1: A2(_elm_lang$core$Basics_ops['++'], 'Loading.progress ', k)
			},
				{
				ctor: '_Tuple2',
				_0: A2(_debois$elm_mdl$Material_Progress$buffered, model.progress, buffered),
				_1: A2(
					_elm_lang$core$Basics_ops['++'],
					'Loading.buffered ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						k,
						A2(
							_elm_lang$core$Basics_ops['++'],
							' ',
							_elm_lang$core$Basics$toString(buffered))))
			},
				{ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Progress$indeterminate, _1: 'Loading.indeterminate'},
				{
				ctor: '_Tuple2',
				_0: _debois$elm_mdl$Material_Spinner$spinner(
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Spinner$active(model.running)
						])),
				_1: A2(
					_elm_lang$core$Basics_ops['++'],
					'\n        Loading.spinner \n          [ Loading.active ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(model.running),
						' ]'))
			},
				{
				ctor: '_Tuple2',
				_0: _debois$elm_mdl$Material_Spinner$spinner(
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Spinner$active(model.running),
							_debois$elm_mdl$Material_Spinner$singleColor(true)
						])),
				_1: A2(
					_elm_lang$core$Basics_ops['++'],
					'\n        Loading.spinner \n          [ Loading.active ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(model.running),
						'\n          , Loading.singleColor True ]'))
			}
			]));
};
var _debois$elm_mdl$Demo_Loading$model = {mdl: _debois$elm_mdl$Material$model, running: false, progress: 14};
var _debois$elm_mdl$Demo_Loading$Model = F3(
	function (a, b, c) {
		return {mdl: a, running: b, progress: c};
	});
var _debois$elm_mdl$Demo_Loading$Mdl = function (a) {
	return {ctor: 'Mdl', _0: a};
};
var _debois$elm_mdl$Demo_Loading$Toggle = {ctor: 'Toggle'};
var _debois$elm_mdl$Demo_Loading$view = function (model) {
	return A5(
		_debois$elm_mdl$Demo_Page$body2,
		'Loading',
		_debois$elm_mdl$Demo_Loading$srcUrl,
		_debois$elm_mdl$Demo_Loading$intro,
		_debois$elm_mdl$Demo_Loading$references,
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_Options$div,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_elm_lang$html$Html$p,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Example use:')
							])),
						A2(
						_debois$elm_mdl$Material_Grid$grid,
						_elm_lang$core$Native_List.fromArray(
							[]),
						A2(
							_elm_lang$core$Basics_ops['++'],
							A2(
								_elm_lang$core$List_ops['::'],
								A2(
									_debois$elm_mdl$Material_Grid$cell,
									_elm_lang$core$Native_List.fromArray(
										[
											A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 12)
										]),
									_elm_lang$core$Native_List.fromArray(
										[
											A2(
											_debois$elm_mdl$Demo_Code$code,
											_elm_lang$core$Native_List.fromArray(
												[
													A2(_debois$elm_mdl$Material_Options$css, 'margin', '24px 0')
												]),
											'\n                               import Material.Spinner as Loading\n                               import Material.Progress as Loading\n                               ')
										])),
								_debois$elm_mdl$Demo_Loading$demoBars(model)),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_debois$elm_mdl$Material_Grid$cell,
									_elm_lang$core$Native_List.fromArray(
										[
											A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 4),
											A2(_debois$elm_mdl$Material_Options$css, 'text-align', 'right'),
											_debois$elm_mdl$Material_Color$text(_debois$elm_mdl$Material_Color$primary),
											_debois$elm_mdl$Material_Grid$align(_debois$elm_mdl$Material_Grid$Bottom)
										]),
									_elm_lang$core$Native_List.fromArray(
										[
											A2(
											_debois$elm_mdl$Material_Options$span,
											_elm_lang$core$Native_List.fromArray(
												[
													_debois$elm_mdl$Material_Typography$display4,
													_debois$elm_mdl$Material_Typography$contrast(1.0)
												]),
											_elm_lang$core$Native_List.fromArray(
												[
													_elm_lang$html$Html$text(
													_elm_lang$core$Basics$toString(model.progress))
												]))
										])),
									A2(
									_debois$elm_mdl$Material_Grid$cell,
									_elm_lang$core$Native_List.fromArray(
										[
											A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 4)
										]),
									_elm_lang$core$Native_List.fromArray(
										[
											A2(
											_debois$elm_mdl$Material_Options$div,
											_elm_lang$core$Native_List.fromArray(
												[
													A2(_debois$elm_mdl$Material_Options$css, 'padding-top', '30px')
												]),
											_elm_lang$core$Native_List.fromArray(
												[])),
											A2(
											_debois$elm_mdl$Material_Options$div,
											_elm_lang$core$Native_List.fromArray(
												[]),
											_elm_lang$core$Native_List.fromArray(
												[
													A5(
													_debois$elm_mdl$Material_Button$render,
													_debois$elm_mdl$Demo_Loading$Mdl,
													_elm_lang$core$Native_List.fromArray(
														[4]),
													model.mdl,
													_elm_lang$core$Native_List.fromArray(
														[
															_debois$elm_mdl$Material_Button$raised,
															_debois$elm_mdl$Material_Button$colored,
															_debois$elm_mdl$Material_Button$ripple,
															A2(_debois$elm_mdl$Material_Options$when, _debois$elm_mdl$Material_Button$disabled, model.running),
															_debois$elm_mdl$Material_Button$onClick(_debois$elm_mdl$Demo_Loading$Toggle)
														]),
													_elm_lang$core$Native_List.fromArray(
														[
															_elm_lang$html$Html$text('Resume')
														])),
													A2(
													_debois$elm_mdl$Material_Options$div,
													_elm_lang$core$Native_List.fromArray(
														[
															A2(_debois$elm_mdl$Material_Options$css, 'width', '2em'),
															A2(_debois$elm_mdl$Material_Options$css, 'display', 'inline-block')
														]),
													_elm_lang$core$Native_List.fromArray(
														[])),
													A5(
													_debois$elm_mdl$Material_Button$render,
													_debois$elm_mdl$Demo_Loading$Mdl,
													_elm_lang$core$Native_List.fromArray(
														[5]),
													model.mdl,
													_elm_lang$core$Native_List.fromArray(
														[
															_debois$elm_mdl$Material_Button$raised,
															_debois$elm_mdl$Material_Button$colored,
															_debois$elm_mdl$Material_Button$ripple,
															A2(
															_debois$elm_mdl$Material_Options$when,
															_debois$elm_mdl$Material_Button$disabled,
															_elm_lang$core$Basics$not(model.running)),
															_debois$elm_mdl$Material_Button$onClick(_debois$elm_mdl$Demo_Loading$Toggle)
														]),
													_elm_lang$core$Native_List.fromArray(
														[
															_elm_lang$html$Html$text('Pause')
														]))
												]))
										]))
								])))
					]))
			]));
};
var _debois$elm_mdl$Demo_Loading$Tick = {ctor: 'Tick'};
var _debois$elm_mdl$Demo_Loading$update = F2(
	function (action, model) {
		var _p2 = action;
		switch (_p2.ctor) {
			case 'Tick':
				var nextProgress = model.progress + 1;
				var progress = (_elm_lang$core$Native_Utils.cmp(nextProgress, 100) > 0) ? 0 : nextProgress;
				var finishedLoading = _elm_lang$core$Native_Utils.cmp(nextProgress, 100) > 0;
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							progress: progress,
							running: model.running && _elm_lang$core$Basics$not(finishedLoading)
						}),
					_1: (model.running && _elm_lang$core$Basics$not(finishedLoading)) ? A2(_debois$elm_mdl$Material_Helpers$delay, 100, _debois$elm_mdl$Demo_Loading$Tick) : _elm_lang$core$Platform_Cmd$none
				};
			case 'Toggle':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							running: _elm_lang$core$Basics$not(model.running)
						}),
					_1: _elm_lang$core$Native_Utils.eq(model.running, false) ? A2(_debois$elm_mdl$Material_Helpers$delay, 200, _debois$elm_mdl$Demo_Loading$Tick) : _elm_lang$core$Platform_Cmd$none
				};
			default:
				return A2(_debois$elm_mdl$Material$update, _p2._0, model);
		}
	});

var _debois$elm_mdl$Demo_Menus$references = _elm_lang$core$Native_List.fromArray(
	[
		_debois$elm_mdl$Demo_Page$package('http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Menu'),
		_debois$elm_mdl$Demo_Page$mds('https://www.google.com/design/spec/components/menus.html'),
		_debois$elm_mdl$Demo_Page$mdl('https://www.getmdl.io/components/#menus-section')
	]);
var _debois$elm_mdl$Demo_Menus$srcUrl = 'https://github.com/debois/elm-mdl/blob/master/demo/Demo/Menus.elm';
var _debois$elm_mdl$Demo_Menus$intro = A2(_debois$elm_mdl$Demo_Page$fromMDL, 'https://www.getmdl.io/components/#menus-section', '\n\n> The Material Design Lite (MDL) menu component is a user interface element\n> that allows users to select one of a number of options. The selection\n> typically results in an action initiation, a setting change, or other\n> observable effect. Menu options are always presented in sets of two or more,\n> and options may be programmatically enabled or disabled as required. The menu\n> appears when the user is asked to choose among a series of options, and is\n> usually dismissed after the choice is made.\n>\n> Menus are an established but non-standardized feature in user interfaces, and\n> allow users to make choices that direct the activity, progress, or\n> characteristics of software. Their design and use is an important factor in\n> the overall user experience. See the menu component\'s <a href=\"http://www.google.com/design/spec/components/menus.html\">Material Design\n> specifications page</a> for details.\n\n');
var _debois$elm_mdl$Demo_Menus$view1 = F3(
	function (model, idx, _p0) {
		var _p1 = _p0;
		var background = A2(
			_debois$elm_mdl$Material_Options$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$cs('background'),
					A2(_debois$elm_mdl$Material_Options$css, 'height', '148px'),
					A2(_debois$elm_mdl$Material_Options$css, 'width', '100%'),
					_debois$elm_mdl$Material_Color$background(_debois$elm_mdl$Material_Color$white)
				]),
			_elm_lang$core$Native_List.fromArray(
				[]));
		var bar = F2(
			function (idx, rightAlign) {
				return A2(
					_debois$elm_mdl$Material_Options$div,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Options$css, 'box-sizing', 'border-box'),
							A2(_debois$elm_mdl$Material_Options$css, 'width', '100%'),
							A2(_debois$elm_mdl$Material_Options$css, 'padding', '16px'),
							A2(_debois$elm_mdl$Material_Options$css, 'height', '64px'),
							_debois$elm_mdl$Material_Color$background(_debois$elm_mdl$Material_Color$accent),
							_debois$elm_mdl$Material_Color$text(_debois$elm_mdl$Material_Color$accentContrast)
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_Options$div,
							_elm_lang$core$Native_List.fromArray(
								[
									A2(_debois$elm_mdl$Material_Options$css, 'box-sizing', 'border-box'),
									A2(_debois$elm_mdl$Material_Options$css, 'position', 'absolute'),
									A2(
									_debois$elm_mdl$Material_Options$css,
									rightAlign ? 'right' : 'left',
									'16px')
								]),
							_elm_lang$core$Native_List.fromArray(
								[_p1.menu]))
						]));
			});
		return _elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$h4,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text(_p1.title)
					])),
				A2(
				_debois$elm_mdl$Material_Options$div,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Options$css, 'display', 'flex'),
						A2(_debois$elm_mdl$Material_Options$css, 'flex-flow', 'row wrap'),
						A2(_debois$elm_mdl$Material_Options$css, 'width', '100%')
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Options$div,
						_elm_lang$core$Native_List.fromArray(
							[
								A2(_debois$elm_mdl$Material_Options$css, 'width', '328px'),
								A2(_debois$elm_mdl$Material_Options$css, 'display', 'flex'),
								A2(_debois$elm_mdl$Material_Options$css, 'flex-direction', 'column'),
								A2(_debois$elm_mdl$Material_Options$css, 'justify-content', 'space-between')
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Material_Options$div,
								_elm_lang$core$Native_List.fromArray(
									[
										_debois$elm_mdl$Material_Elevation$e2,
										A2(_debois$elm_mdl$Material_Options$css, 'margin', '0 64px 64px 64px'),
										A2(_debois$elm_mdl$Material_Options$css, 'width', '200px')
									]),
								_elm_lang$core$Native_List.fromArray(
									[
										A2(
										_debois$elm_mdl$Material_Options$div,
										_elm_lang$core$Native_List.fromArray(
											[
												A2(_debois$elm_mdl$Material_Options$css, 'position', 'relative'),
												A2(_debois$elm_mdl$Material_Options$css, 'width', '200px')
											]),
										(_elm_lang$core$Native_Utils.cmp(idx, 1) > 0) ? _elm_lang$core$Native_List.fromArray(
											[
												background,
												A2(
												bar,
												idx,
												_elm_lang$core$Native_Utils.eq(
													A2(_elm_lang$core$Basics_ops['%'], idx, 2),
													1))
											]) : _elm_lang$core$Native_List.fromArray(
											[
												A2(
												bar,
												idx,
												_elm_lang$core$Native_Utils.eq(
													A2(_elm_lang$core$Basics_ops['%'], idx, 2),
													1)),
												background
											]))
									])),
								A2(
								_debois$elm_mdl$Material_Options$div,
								_elm_lang$core$Native_List.fromArray(
									[
										A2(_debois$elm_mdl$Material_Options$css, 'flex-grow', '1')
									]),
								_elm_lang$core$Native_List.fromArray(
									[])),
								A2(
								_debois$elm_mdl$Material_Options$div,
								_elm_lang$core$Native_List.fromArray(
									[
										A2(_debois$elm_mdl$Material_Options$css, 'margin-right', '64px'),
										A2(_debois$elm_mdl$Material_Options$css, 'align-self', 'flex-end')
									]),
								_elm_lang$core$Native_List.fromArray(
									[
										A3(
										_debois$elm_mdl$Material_Options$styled,
										_elm_lang$html$Html$p,
										_elm_lang$core$Native_List.fromArray(
											[
												A2(_debois$elm_mdl$Material_Options$css, 'text-align', 'right')
											]),
										_elm_lang$core$Native_List.fromArray(
											[
												_elm_lang$html$Html$text(_p1.comment)
											]))
									]))
							])),
						A2(
						_debois$elm_mdl$Demo_Code$code,
						_elm_lang$core$Native_List.fromArray(
							[
								A2(_debois$elm_mdl$Material_Options$css, 'flex-grow', '1')
							]),
						_p1.code)
					]))
			]);
	});
var _debois$elm_mdl$Demo_Menus$showOptions = F2(
	function (model, align) {
		var inner = A2(
			_elm_lang$core$String$join,
			', ',
			A2(
				_elm_lang$core$List$filter,
				F2(
					function (x, y) {
						return !_elm_lang$core$Native_Utils.eq(x, y);
					})(''),
				_elm_lang$core$Native_List.fromArray(
					[
						model.ripple ? 'Menu.ripple' : '',
						A2(
						_elm_lang$core$Maybe$withDefault,
						'',
						A2(
							_elm_lang$core$Maybe$map,
							function (i) {
								return A2(
									_elm_lang$core$Basics_ops['++'],
									'Menu.icon \"',
									A2(_elm_lang$core$Basics_ops['++'], i, '\"'));
							},
							model.icon)),
						A2(
						_elm_lang$core$Basics_ops['++'],
						'Menu.',
						_elm_lang$core$Basics$fst(align))
					])));
		return _elm_lang$core$Native_Utils.eq(inner, '') ? '[]' : A2(
			_elm_lang$core$Basics_ops['++'],
			'[ ',
			A2(_elm_lang$core$Basics_ops['++'], inner, ' ]'));
	});
var _debois$elm_mdl$Demo_Menus$options = F2(
	function (model, align) {
		return _elm_lang$core$Native_List.fromArray(
			[
				A2(_debois$elm_mdl$Material_Options$when, _debois$elm_mdl$Material_Menu$ripple, model.ripple),
				A2(
				_elm_lang$core$Maybe$withDefault,
				_debois$elm_mdl$Material_Options$nop,
				A2(_elm_lang$core$Maybe$map, _debois$elm_mdl$Material_Menu$icon, model.icon)),
				_elm_lang$core$Basics$snd(align)
			]);
	});
var _debois$elm_mdl$Demo_Menus$update = F2(
	function (action, model) {
		var _p2 = action;
		switch (_p2.ctor) {
			case 'Mdl':
				return A2(_debois$elm_mdl$Material$update, _p2._0, model);
			case 'Select':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							selected: _elm_lang$core$Maybe$Just(
								{ctor: '_Tuple2', _0: _p2._0, _1: _p2._1})
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'SetIcon':
				var _p3 = _p2._0;
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							icon: _elm_lang$core$Native_Utils.eq(_p3, '') ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(_p3)
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'Flip':
				var _p4 = _p2._0;
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							checked: A2(_elm_lang$core$Set$member, _p4, model.checked) ? A2(_elm_lang$core$Set$remove, _p4, model.checked) : A2(_elm_lang$core$Set$insert, _p4, model.checked)
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			default:
				return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
		}
	});
var _debois$elm_mdl$Demo_Menus$model = {
	mdl: _debois$elm_mdl$Material$model,
	selected: _elm_lang$core$Maybe$Nothing,
	checked: _elm_lang$core$Set$fromList(
		_elm_lang$core$Native_List.fromArray(
			[0, 2])),
	icon: _elm_lang$core$Maybe$Nothing,
	ripple: true
};
var _debois$elm_mdl$Demo_Menus$Model = F5(
	function (a, b, c, d, e) {
		return {mdl: a, selected: b, checked: c, icon: d, ripple: e};
	});
var _debois$elm_mdl$Demo_Menus$Menu = F4(
	function (a, b, c, d) {
		return {menu: a, title: b, code: c, comment: d};
	});
var _debois$elm_mdl$Demo_Menus$Nop = {ctor: 'Nop'};
var _debois$elm_mdl$Demo_Menus$Flip = function (a) {
	return {ctor: 'Flip', _0: a};
};
var _debois$elm_mdl$Demo_Menus$SetIcon = function (a) {
	return {ctor: 'SetIcon', _0: a};
};
var _debois$elm_mdl$Demo_Menus$Select = F2(
	function (a, b) {
		return {ctor: 'Select', _0: a, _1: b};
	});
var _debois$elm_mdl$Demo_Menus$Mdl = function (a) {
	return {ctor: 'Mdl', _0: a};
};
var _debois$elm_mdl$Demo_Menus$basic = F2(
	function (model, align) {
		return {
			title: 'Basic ',
			menu: A5(
				_debois$elm_mdl$Material_Menu$render,
				_debois$elm_mdl$Demo_Menus$Mdl,
				_elm_lang$core$Native_List.fromArray(
					[0]),
				model.mdl,
				A2(_debois$elm_mdl$Demo_Menus$options, model, align),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Menu$item,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Menu$onSelect(
								A2(_debois$elm_mdl$Demo_Menus$Select, 0, 0))
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('English (US)')
							])),
						A2(
						_debois$elm_mdl$Material_Menu$item,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Menu$onSelect(
								A2(_debois$elm_mdl$Demo_Menus$Select, 0, 1))
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('français')
							])),
						A2(
						_debois$elm_mdl$Material_Menu$item,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Menu$onSelect(
								A2(_debois$elm_mdl$Demo_Menus$Select, 0, 2))
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('中文')
							]))
					])),
			code: A2(
				_elm_lang$core$Basics_ops['++'],
				'\n      Menu.render Mdl [0] model.mdl \n        ',
				A2(
					_elm_lang$core$Basics_ops['++'],
					A2(_debois$elm_mdl$Demo_Menus$showOptions, model, align),
					'\n        [ Menu.item \n            [ Menu.onSelect MySelectMsg0 ] \n            [ text \"English (US)\" ]\n        , Menu.item \n            [ Menu.onSelect MySelectMsg1 ] \n            [ text \"français\" ] \n        , Menu.item\n            [ Menu.onSelect MySelectMsg2 ] \n            [ text \"中文\" ] \n        ]\n        ')),
			comment: ''
		};
	});
var _debois$elm_mdl$Demo_Menus$edit = F2(
	function (model, align) {
		return {
			title: 'Disabled items and dividers',
			menu: A5(
				_debois$elm_mdl$Material_Menu$render,
				_debois$elm_mdl$Demo_Menus$Mdl,
				_elm_lang$core$Native_List.fromArray(
					[1]),
				model.mdl,
				A2(_debois$elm_mdl$Demo_Menus$options, model, align),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Menu$item,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Menu$onSelect(
								A2(_debois$elm_mdl$Demo_Menus$Select, 1, 0))
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Undo')
							])),
						A2(
						_debois$elm_mdl$Material_Menu$item,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Menu$onSelect(
								A2(_debois$elm_mdl$Demo_Menus$Select, 1, 1)),
								_debois$elm_mdl$Material_Menu$divider,
								_debois$elm_mdl$Material_Menu$disabled
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Redo')
							])),
						A2(
						_debois$elm_mdl$Material_Menu$item,
						_elm_lang$core$Native_List.fromArray(
							[_debois$elm_mdl$Material_Menu$disabled]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Cut')
							])),
						A2(
						_debois$elm_mdl$Material_Menu$item,
						_elm_lang$core$Native_List.fromArray(
							[_debois$elm_mdl$Material_Menu$disabled]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Copy')
							])),
						A2(
						_debois$elm_mdl$Material_Menu$item,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Menu$onSelect(
								A2(_debois$elm_mdl$Demo_Menus$Select, 1, 4))
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Paste')
							]))
					])),
			code: A2(
				_elm_lang$core$Basics_ops['++'],
				'\n     Menu.render Mdl [1] model.mdl \n        ',
				A2(
					_elm_lang$core$Basics_ops['++'],
					A2(_debois$elm_mdl$Demo_Menus$showOptions, model, align),
					' \n        [ Menu.item \n            [ Menu.onSelect MySelectMsg0 ]\n            [ text \"Undo\" ]\n        , Menu.item \n            [ Menu.divider\n            , Menu.disabled\n            ] \n            [ text \"Redo\" ]\n        , Menu.item\n            [ Menu.onSelect MySelectMsgWontFire \n            , Menu.disabled\n            ] \n            [ text \"Cut\" ]\n        , Menu.item \n            [ Menu.disabled ]\n            [ text \"Copy\" ]\n        , Menu.item \n            [ Menu.onSelect MySelectMsg4 ]\n            [ text \"Paste\" ]\n        ]')),
			comment: 'It doesn\'t matter whether or not you supply an `onSelect` handler to a\n           `disabled` item. Even if you do, clicks won\'t register.'
		};
	});
var _debois$elm_mdl$Demo_Menus$icons = F2(
	function (model, align) {
		return {
			title: 'Icons',
			menu: function () {
				var padding = A2(_debois$elm_mdl$Material_Options$css, 'padding-right', '24px');
				var i = function (name) {
					return A2(
						_debois$elm_mdl$Material_Icon$view,
						name,
						_elm_lang$core$Native_List.fromArray(
							[
								A2(_debois$elm_mdl$Material_Options$css, 'width', '40px')
							]));
				};
				return A5(
					_debois$elm_mdl$Material_Menu$render,
					_debois$elm_mdl$Demo_Menus$Mdl,
					_elm_lang$core$Native_List.fromArray(
						[2]),
					model.mdl,
					A2(_debois$elm_mdl$Demo_Menus$options, model, align),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_Menu$item,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Menu$onSelect(
									A2(_debois$elm_mdl$Demo_Menus$Select, 1, 0)),
									padding
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									i('remove_red_eye'),
									_elm_lang$html$Html$text('Preview')
								])),
							A2(
							_debois$elm_mdl$Material_Menu$item,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Menu$onSelect(
									A2(_debois$elm_mdl$Demo_Menus$Select, 1, 1)),
									padding
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									i('person_add'),
									_elm_lang$html$Html$text('Share')
								])),
							A2(
							_debois$elm_mdl$Material_Menu$item,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Menu$onSelect(
									A2(_debois$elm_mdl$Demo_Menus$Select, 1, 2)),
									padding,
									_debois$elm_mdl$Material_Menu$divider
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									i('link'),
									_elm_lang$html$Html$text('Get link')
								])),
							A2(
							_debois$elm_mdl$Material_Menu$item,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Menu$onSelect(
									A2(_debois$elm_mdl$Demo_Menus$Select, 1, 3)),
									padding
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									i('delete'),
									_elm_lang$html$Html$text('Remove')
								]))
						]));
			}(),
			code: A2(
				_elm_lang$core$Basics_ops['++'],
				'\n      let\n        i name = \n          Icon.view name [ css \"width\" \"40px\" ] \n        padding = \n          css \"padding-right\" \"24px\"\n      in\n        Menu.render Mdl [2] model.mdl \n          ',
				A2(
					_elm_lang$core$Basics_ops['++'],
					A2(_debois$elm_mdl$Demo_Menus$showOptions, model, align),
					'\n          [ Menu.item \n              [ Menu.onSelect MySelectMsg0, padding ]\n              [ i \"remove_red_eye\", text \"Preview\" ]\n          , Menu.item \n              [ Menu.onSelect MySelectMsg1, padding ] \n              [ i \"person_add\", text \"Share\" ] \n          , Menu.item\n              [ Menu.onSelect MySelectMsg2, padding, Menu.divider ]\n              [ i \"link\", text \"Get link\" ] \n          , Menu.item\n              [ Menu.onSelect MySelectMsg3, padding ] \n              [ i \"delete\", text \"Remove\" ] \n          ]')),
			comment: 'Note that the item right padding has been increased by 8px to \n         visually accomodate the perceived extra space to the left of\n         the icons.\n      '
		};
	});
var _debois$elm_mdl$Demo_Menus$checkmarks = F2(
	function (model, align) {
		var checkmark = function (x) {
			return x ? A2(
				_debois$elm_mdl$Material_Icon$view,
				'check',
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Options$css, 'width', '40px')
					])) : A2(
				_debois$elm_mdl$Material_Options$span,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Options$css, 'width', '40px')
					]),
				_elm_lang$core$Native_List.fromArray(
					[]));
		};
		var isChecked = function (k) {
			return A2(_elm_lang$core$Set$member, k, model.checked);
		};
		return {
			title: 'Checkmarks',
			menu: A5(
				_debois$elm_mdl$Material_Menu$render,
				_debois$elm_mdl$Demo_Menus$Mdl,
				_elm_lang$core$Native_List.fromArray(
					[3]),
				model.mdl,
				A2(_debois$elm_mdl$Demo_Menus$options, model, align),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Menu$item,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Menu$onSelect(
								_debois$elm_mdl$Demo_Menus$Flip(0))
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								checkmark(
								isChecked(0)),
								_elm_lang$html$Html$text('Grid lines')
							])),
						A2(
						_debois$elm_mdl$Material_Menu$item,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Menu$onSelect(
								_debois$elm_mdl$Demo_Menus$Flip(1))
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								checkmark(
								isChecked(1)),
								_elm_lang$html$Html$text('Page breaks')
							])),
						A2(
						_debois$elm_mdl$Material_Menu$item,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Menu$onSelect(
								_debois$elm_mdl$Demo_Menus$Flip(2))
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								checkmark(
								isChecked(2)),
								_elm_lang$html$Html$text('Rules')
							]))
					])),
			code: A2(
				_elm_lang$core$Basics_ops['++'],
				'\n        let\n          checkmark x =  \n            if x then \n              Icon.view \"check\" [ css \"width\" \"40px\" ]\n            else \n              Options.span [ css \"width\" \"40px\" ] [] \n        in\n          Menu.render Mdl [3] model.mdl\n            ',
				A2(
					_elm_lang$core$Basics_ops['++'],
					A2(_debois$elm_mdl$Demo_Menus$showOptions, model, align),
					A2(
						_elm_lang$core$Basics_ops['++'],
						'\n            [ Menu.item\n                [ Menu.onSelect MySelectMsg0\n                [ checkmark ',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(
								isChecked(0)),
							A2(
								_elm_lang$core$Basics_ops['++'],
								', text \"Grid lines\" ]\n            , Menu.item\n                [ Menu.onSelect MySelectMsg1 ]\n                [ checkmark ',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(
										isChecked(1)),
									A2(
										_elm_lang$core$Basics_ops['++'],
										', text \"Page breaks\" ] \n            , Menu.item\n                [ Menu.onSelect MySelectMsg2 ]\n                [ checkmark ',
										A2(
											_elm_lang$core$Basics_ops['++'],
											_elm_lang$core$Basics$toString(
												isChecked(2)),
											', text \"Rules\" ] \n            ]')))))))),
			comment: ' Note the explicit width on `Icon.view` and `Options.span`, which \n            causes icons to be neatly aligned. \n        '
		};
	});
var _debois$elm_mdl$Demo_Menus$demo1 = function (model) {
	return A2(
		_elm_lang$core$List$concatMap,
		_elm_lang$core$Basics$identity,
		A2(
			_elm_lang$core$List$indexedMap,
			_debois$elm_mdl$Demo_Menus$view1(model),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Demo_Menus$basic,
					model,
					{ctor: '_Tuple2', _0: 'bottomLeft', _1: _debois$elm_mdl$Material_Menu$bottomLeft}),
					A2(
					_debois$elm_mdl$Demo_Menus$edit,
					model,
					{ctor: '_Tuple2', _0: 'bottomRight', _1: _debois$elm_mdl$Material_Menu$bottomRight}),
					A2(
					_debois$elm_mdl$Demo_Menus$checkmarks,
					model,
					{ctor: '_Tuple2', _0: 'topLeft', _1: _debois$elm_mdl$Material_Menu$topLeft}),
					A2(
					_debois$elm_mdl$Demo_Menus$icons,
					model,
					{ctor: '_Tuple2', _0: 'topRight', _1: _debois$elm_mdl$Material_Menu$topRight})
				])));
};
var _debois$elm_mdl$Demo_Menus$view = function (model) {
	var demo2 = _elm_lang$core$Native_List.fromArray(
		[
			A2(
			_debois$elm_mdl$Material_Grid$grid,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_Grid$cell,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 4)
						]),
					_elm_lang$core$Native_List.fromArray(
						[])),
					A2(
					_debois$elm_mdl$Material_Grid$cell,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 4),
							A2(_debois$elm_mdl$Material_Grid$offset, _debois$elm_mdl$Material_Grid$Desktop, 4)
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A4(
							_debois$elm_mdl$Material_Textfield$render,
							_debois$elm_mdl$Demo_Menus$Mdl,
							_elm_lang$core$Native_List.fromArray(
								[2]),
							model.mdl,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Textfield$label('Menu icon'),
									_debois$elm_mdl$Material_Textfield$floatingLabel,
									_debois$elm_mdl$Material_Textfield$value(
									A2(_elm_lang$core$Maybe$withDefault, '', model.icon)),
									_debois$elm_mdl$Material_Textfield$onInput(_debois$elm_mdl$Demo_Menus$SetIcon)
								])),
							A3(
							_debois$elm_mdl$Material_Options$styled,
							_elm_lang$html$Html$p,
							_elm_lang$core$Native_List.fromArray(
								[
									A2(_debois$elm_mdl$Material_Options$css, 'margin-top', '1rem')
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Try \'list\' or \'menu\', or refer to '),
									A2(
									_elm_lang$html$Html$a,
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html_Attributes$href('https://design.google.com/icons/')
										]),
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html$text(' the Material Icon library')
										])),
									_elm_lang$html$Html$text(' for possible values. Replace spaces (\' \') with underscores (\'_\').')
								]))
						]))
				]))
		]);
	return A6(
		_debois$elm_mdl$Demo_Page$body1$,
		'Menus',
		_debois$elm_mdl$Demo_Menus$srcUrl,
		_debois$elm_mdl$Demo_Menus$intro,
		_debois$elm_mdl$Demo_Menus$references,
		_debois$elm_mdl$Demo_Menus$demo1(model),
		demo2);
};

var _debois$elm_mdl$Demo_Select$references = _elm_lang$core$Native_List.fromArray(
	[
		_debois$elm_mdl$Demo_Page$package('http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-TEMPLATE'),
		_debois$elm_mdl$Demo_Page$mds('https://www.google.com/design/spec/components/TEMPLATE.html'),
		_debois$elm_mdl$Demo_Page$mdl('https://www.getmdl.io/components/index.html#TEMPLATE')
	]);
var _debois$elm_mdl$Demo_Select$srcUrl = 'https://github.com/debois/elm-mdl/blob/master/demo/Demo/TEMPLATE.elm';
var _debois$elm_mdl$Demo_Select$intro = A2(_debois$elm_mdl$Demo_Page$fromMDL, 'https://www.getmdl.io/components/index.html#TEMPLATE-section', '\n> ...\n');
var _debois$elm_mdl$Demo_Select$column = _elm_lang$core$Native_List.fromArray(
	[
		A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Desktop, 6),
		A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Tablet, 8)
	]);
var _debois$elm_mdl$Demo_Select$update = F2(
	function (msg, model) {
		var _p0 = msg;
		switch (_p0.ctor) {
			case 'Select':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							values: A3(_elm_lang$core$Dict$insert, _p0._0, _p0._1, model.values)
						}),
					_elm_lang$core$Native_List.fromArray(
						[]));
			case 'Select\'':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							indices: A3(_elm_lang$core$Dict$insert, _p0._0, _p0._1, model.indices)
						}),
					_elm_lang$core$Native_List.fromArray(
						[]));
			default:
				return A2(_debois$elm_mdl$Material$update, _p0._0, model);
		}
	});
var _debois$elm_mdl$Demo_Select$model = {mdl: _debois$elm_mdl$Material$model, values: _elm_lang$core$Dict$empty, indices: _elm_lang$core$Dict$empty};
var _debois$elm_mdl$Demo_Select$Model = F3(
	function (a, b, c) {
		return {mdl: a, values: b, indices: c};
	});
var _debois$elm_mdl$Demo_Select$Mdl = function (a) {
	return {ctor: 'Mdl', _0: a};
};
var _debois$elm_mdl$Demo_Select$Select$ = F2(
	function (a, b) {
		return {ctor: 'Select\'', _0: a, _1: b};
	});
var _debois$elm_mdl$Demo_Select$Select = F2(
	function (a, b) {
		return {ctor: 'Select', _0: a, _1: b};
	});
var _debois$elm_mdl$Demo_Select$view = function (model) {
	return A5(
		_debois$elm_mdl$Demo_Page$body2,
		'Select',
		_debois$elm_mdl$Demo_Select$srcUrl,
		_debois$elm_mdl$Demo_Select$intro,
		_debois$elm_mdl$Demo_Select$references,
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$h4,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('Simple example')
					])),
				A2(
				_debois$elm_mdl$Material_Grid$grid,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Grid$cell,
						_debois$elm_mdl$Demo_Select$column,
						_elm_lang$core$Native_List.fromArray(
							[
								A5(
								_debois$elm_mdl$Material_Select$render,
								_debois$elm_mdl$Demo_Select$Mdl,
								_elm_lang$core$Native_List.fromArray(
									[0]),
								model.mdl,
								_elm_lang$core$Native_List.fromArray(
									[
										_debois$elm_mdl$Material_Select$label('Dinosaurs'),
										_debois$elm_mdl$Material_Select$floatingLabel,
										_debois$elm_mdl$Material_Select$ripple,
										_debois$elm_mdl$Material_Select$value(
										A2(
											_elm_lang$core$Maybe$withDefault,
											'',
											A2(_elm_lang$core$Dict$get, 0, model.values)))
									]),
								A2(
									_elm_lang$core$List$map,
									function (string) {
										return A2(
											_debois$elm_mdl$Material_Select$item,
											_elm_lang$core$Native_List.fromArray(
												[
													_debois$elm_mdl$Material_Select_Item$onSelect(
													A2(_debois$elm_mdl$Demo_Select$Select, 0, string)),
													_debois$elm_mdl$Material_Select_Item$ripple
												]),
											_elm_lang$core$Native_List.fromArray(
												[
													_elm_lang$html$Html$text(string)
												]));
									},
									_elm_lang$core$Native_List.fromArray(
										['allosaurus', 'brontosaurus', 'carcharodontosaurus', 'diplodocus'])))
							])),
						A2(
						_debois$elm_mdl$Material_Grid$cell,
						_debois$elm_mdl$Demo_Select$column,
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Demo_Code$code,
								_elm_lang$core$Native_List.fromArray(
									[]),
								'\n          Select.render Mdl [0] model.mdl\n          [ Select.label \"Dinosaurs\"\n          , Select.floatingLabel\n          , Select.ripple\n          , Select.value model.value\n          ]\n          ( [ \"allosaurus\"\n            , \"brontosaurus\"\n            , \"carcharodontosaurus\"\n            , \"diplodocus\"\n            ]\n            |> List.map (\\string ->\n                 Select.item\n                 [ Item.onSelect (Select string)\n                 , Item.ripple\n                 ]\n                 [ text string\n                 ]\n               )\n          )\n        ')
							]))
					])),
				A2(
				_elm_lang$html$Html$h4,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('Example without ripple and floating label')
					])),
				A2(
				_debois$elm_mdl$Material_Grid$grid,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Grid$cell,
						_debois$elm_mdl$Demo_Select$column,
						_elm_lang$core$Native_List.fromArray(
							[
								A5(
								_debois$elm_mdl$Material_Select$render,
								_debois$elm_mdl$Demo_Select$Mdl,
								_elm_lang$core$Native_List.fromArray(
									[1]),
								model.mdl,
								_elm_lang$core$Native_List.fromArray(
									[
										_debois$elm_mdl$Material_Select$label('Dinosaurs'),
										_debois$elm_mdl$Material_Select$value(
										A2(
											_elm_lang$core$Maybe$withDefault,
											'',
											A2(_elm_lang$core$Dict$get, 1, model.values)))
									]),
								A2(
									_elm_lang$core$List$map,
									function (string) {
										return A2(
											_debois$elm_mdl$Material_Select$item,
											_elm_lang$core$Native_List.fromArray(
												[
													_debois$elm_mdl$Material_Select_Item$onSelect(
													A2(_debois$elm_mdl$Demo_Select$Select, 1, string))
												]),
											_elm_lang$core$Native_List.fromArray(
												[
													_elm_lang$html$Html$text(string)
												]));
									},
									_elm_lang$core$Native_List.fromArray(
										['allosaurus', 'brontosaurus', 'carcharodontosaurus', 'diplodocus'])))
							])),
						A2(
						_debois$elm_mdl$Material_Grid$cell,
						_debois$elm_mdl$Demo_Select$column,
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Demo_Code$code,
								_elm_lang$core$Native_List.fromArray(
									[]),
								'\n          Select.render Mdl [0] model.mdl\n          [ Select.label \"Dinosaurs\"\n          , Select.value model.value\n          ]\n          ( [ \"allosaurus\"\n            , \"brontosaurus\"\n            , \"carcharodontosaurus\"\n            , \"diplodocus\"\n            ]\n            |> List.map (\\string ->\n                 Select.item\n                 [ Item.onSelect (Select string)\n                 ]\n                 [ text string\n                 ]\n               )\n          )\n        ')
							]))
					])),
				A2(
				_elm_lang$html$Html$h4,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('Example with pre-selected value')
					])),
				A2(
				_debois$elm_mdl$Material_Grid$grid,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Grid$cell,
						_debois$elm_mdl$Demo_Select$column,
						_elm_lang$core$Native_List.fromArray(
							[
								function () {
								var index = A2(
									_elm_lang$core$Maybe$withDefault,
									0,
									A2(_elm_lang$core$Dict$get, 2, model.indices));
								var values = _elm_lang$core$Native_List.fromArray(
									['allosaurus', 'brontosaurus', 'carcharodontosaurus', 'diplodocus']);
								var selectedValue = A2(
									_elm_lang$core$Maybe$withDefault,
									'',
									_elm_lang$core$List$head(
										A2(_elm_lang$core$List$drop, index, values)));
								return A5(
									_debois$elm_mdl$Material_Select$render,
									_debois$elm_mdl$Demo_Select$Mdl,
									_elm_lang$core$Native_List.fromArray(
										[2]),
									model.mdl,
									_elm_lang$core$Native_List.fromArray(
										[
											_debois$elm_mdl$Material_Select$label('Dinosaurs'),
											_debois$elm_mdl$Material_Select$value(selectedValue),
											_debois$elm_mdl$Material_Select$index(index)
										]),
									A2(
										_elm_lang$core$List$indexedMap,
										F2(
											function (index, string) {
												return A2(
													_debois$elm_mdl$Material_Select$item,
													_elm_lang$core$Native_List.fromArray(
														[
															_debois$elm_mdl$Material_Select_Item$onSelect(
															A2(_debois$elm_mdl$Demo_Select$Select$, 2, index))
														]),
													_elm_lang$core$Native_List.fromArray(
														[
															_elm_lang$html$Html$text(string)
														]));
											}),
										values));
							}()
							])),
						A2(
						_debois$elm_mdl$Material_Grid$cell,
						_debois$elm_mdl$Demo_Select$column,
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Demo_Code$code,
								_elm_lang$core$Native_List.fromArray(
									[]),
								'\n          let\n            values =\n              [ \"allosaurus\"\n              , \"brontosaurus\"\n              , \"carcharodontosaurus\"\n              , \"diplodocus\"\n              ]\n\n            selectedValue =\n              values\n              |> List.drop model.index\n              |> List.head\n              |> Maybe.withDefault \"\"\n          in\n            Select.render Mdl [0] model.mdl\n            [ Select.label \"Dinosaurs\"\n            , Select.value selectedValue\n            , Select.index model.index\n            ]\n            ( values\n              |> List.indexedMap (\\index string ->\n                   Select.item\n                   [ Item.onSelect (Select index)\n                   ]\n                   [ text string\n                   ]\n                 )\n            )\n        ')
							]))
					]))
			]));
};

var _debois$elm_mdl$Demo_Slider$references = _elm_lang$core$Native_List.fromArray(
	[
		_debois$elm_mdl$Demo_Page$package('http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Slider'),
		_debois$elm_mdl$Demo_Page$mds('https://material.google.com/components/sliders.html'),
		_debois$elm_mdl$Demo_Page$mdl('https://getmdl.io/components/index.html#sliders-section')
	]);
var _debois$elm_mdl$Demo_Slider$srcUrl = 'https://github.com/debois/elm-mdl/blob/master/demo/Demo/Slider.elm';
var _debois$elm_mdl$Demo_Slider$intro = A2(_debois$elm_mdl$Demo_Page$fromMDL, 'https://getmdl.io/components/index.html#sliders-section', '\n> The Material Design Lite (MDL) slider component is an enhanced version of the\n> new HTML5 `<input type=\"range\">` element. A slider consists of a horizontal line\n> upon which sits a small, movable disc (the thumb) and, typically, text that\n> clearly communicates a value that will be set when the user moves it.\n>\n> Sliders are a fairly new feature in user interfaces, and allow users to choose a\n> value from a predetermined range by moving the thumb through the range (lower\n> values to the left, higher values to the right). Their design and use is an\n> important factor in the overall user experience. See the slider component\'s\n> [Material Design specifications](https://material.google.com/components/sliders.html) page for details.\n>\n> The enhanced slider component may be initially or programmatically disabled.\n');
var _debois$elm_mdl$Demo_Slider$demoContainer = function (_p0) {
	var _p1 = _p0;
	return A2(
		_debois$elm_mdl$Material_Grid$cell,
		_elm_lang$core$Native_List.fromArray(
			[
				A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 4)
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				_p1._0,
				A2(
				_debois$elm_mdl$Demo_Code$code,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Options$css, 'margin', '24px 0')
					]),
				_p1._1)
			]));
};
var _debois$elm_mdl$Demo_Slider$update = F2(
	function (action, model) {
		var _p2 = action;
		if (_p2.ctor === 'Slider') {
			var values = A3(_elm_lang$core$Dict$insert, _p2._0, _p2._1, model.values);
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_Utils.update(
					model,
					{values: values}),
				_1: _elm_lang$core$Platform_Cmd$none
			};
		} else {
			return A2(_debois$elm_mdl$Material$update, _p2._0, model);
		}
	});
var _debois$elm_mdl$Demo_Slider$getDef = F3(
	function (key, def, dict) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			def,
			A2(_elm_lang$core$Dict$get, key, dict));
	});
var _debois$elm_mdl$Demo_Slider$get = F2(
	function (key, dict) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			0,
			A2(_elm_lang$core$Dict$get, key, dict));
	});
var _debois$elm_mdl$Demo_Slider$model = {mdl: _debois$elm_mdl$Material$model, values: _elm_lang$core$Dict$empty};
var _debois$elm_mdl$Demo_Slider$Model = F2(
	function (a, b) {
		return {mdl: a, values: b};
	});
var _debois$elm_mdl$Demo_Slider$Mdl = function (a) {
	return {ctor: 'Mdl', _0: a};
};
var _debois$elm_mdl$Demo_Slider$Slider = F2(
	function (a, b) {
		return {ctor: 'Slider', _0: a, _1: b};
	});
var _debois$elm_mdl$Demo_Slider$view = function (model) {
	return A5(
		_debois$elm_mdl$Demo_Page$body2,
		'Sliders',
		_debois$elm_mdl$Demo_Slider$srcUrl,
		_debois$elm_mdl$Demo_Slider$intro,
		_debois$elm_mdl$Demo_Slider$references,
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$p,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('Example use:')
					])),
				A2(
				_debois$elm_mdl$Material_Grid$grid,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Grid$cell,
						_elm_lang$core$Native_List.fromArray(
							[
								A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 12)
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Demo_Code$code,
								_elm_lang$core$Native_List.fromArray(
									[
										A2(_debois$elm_mdl$Material_Options$css, 'margin', '24px 0')
									]),
								'import Material.Slider as Slider')
							])),
						_debois$elm_mdl$Demo_Slider$demoContainer(
						{
							ctor: '_Tuple2',
							_0: _debois$elm_mdl$Material_Slider$view(
								_elm_lang$core$Native_List.fromArray(
									[
										_debois$elm_mdl$Material_Slider$onChange(
										_debois$elm_mdl$Demo_Slider$Slider(0)),
										_debois$elm_mdl$Material_Slider$value(
										A3(_debois$elm_mdl$Demo_Slider$getDef, 0, 50.0, model.values))
									])),
							_1: A2(
								_elm_lang$core$Basics_ops['++'],
								'\n            Slider.view\n              [ Slider.onChange SliderMsg\n              , Slider.value ',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(
										A3(_debois$elm_mdl$Demo_Slider$getDef, 0, 50.0, model.values)),
									'\n              ]\n             '))
						}),
						_debois$elm_mdl$Demo_Slider$demoContainer(
						{
							ctor: '_Tuple2',
							_0: _debois$elm_mdl$Material_Slider$view(
								_elm_lang$core$Native_List.fromArray(
									[
										_debois$elm_mdl$Material_Slider$onChange(
										_debois$elm_mdl$Demo_Slider$Slider(1)),
										_debois$elm_mdl$Material_Slider$value(
										A3(_debois$elm_mdl$Demo_Slider$getDef, 1, 2.0, model.values)),
										_debois$elm_mdl$Material_Slider$max(10),
										_debois$elm_mdl$Material_Slider$min(-10),
										_debois$elm_mdl$Material_Slider$step(2)
									])),
							_1: A2(
								_elm_lang$core$Basics_ops['++'],
								'\n            Slider.view\n              [ Slider.onChange SliderMsg\n              , Slider.value ',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(
										A3(_debois$elm_mdl$Demo_Slider$getDef, 1, 2.0, model.values)),
									'\n              , Slider.max 10\n              , Slider.min -10\n              , Slider.step 2\n              ]\n             '))
						}),
						_debois$elm_mdl$Demo_Slider$demoContainer(
						function () {
							var v = A3(_debois$elm_mdl$Demo_Slider$getDef, 0, 50.0, model.values) + A3(_debois$elm_mdl$Demo_Slider$getDef, 1, 2.0, model.values);
							return {
								ctor: '_Tuple2',
								_0: _debois$elm_mdl$Material_Slider$view(
									_elm_lang$core$Native_List.fromArray(
										[
											_debois$elm_mdl$Material_Slider$onChange(
											_debois$elm_mdl$Demo_Slider$Slider(2)),
											_debois$elm_mdl$Material_Slider$value(v),
											_debois$elm_mdl$Material_Slider$min(-10),
											_debois$elm_mdl$Material_Slider$max(110),
											_debois$elm_mdl$Material_Slider$disabled
										])),
								_1: A2(
									_elm_lang$core$Basics_ops['++'],
									'\n            Slider.view\n              [ Slider.onChange SliderMsg\n              , Slider.value ',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(v),
										'\n              , Slider.min -10\n              , Slider.max 110\n              , Slider.disabled\n              ]\n             '))
							};
						}())
					]))
			]));
};

var _debois$elm_mdl$Demo_Snackbar$references = _elm_lang$core$Native_List.fromArray(
	[
		_debois$elm_mdl$Demo_Page$package('http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Snackbar'),
		_debois$elm_mdl$Demo_Page$mds('https://www.google.com/design/spec/components/snackbars-toasts.html'),
		_debois$elm_mdl$Demo_Page$mdl('https://www.getmdl.io/components/index.html#snackbar-section')
	]);
var _debois$elm_mdl$Demo_Snackbar$srcUrl = 'https://github.com/debois/elm-mdl/blob/master/demo/Demo/Snackbar.elm';
var _debois$elm_mdl$Demo_Snackbar$intro = A2(_debois$elm_mdl$Demo_Page$fromMDL, 'https://www.getmdl.io/components/index.html#snackbar-section', '\n> The Material Design Lite (MDL) __snackbar__ component is a container used to\n> notify a user of an operation\'s status. It displays at the bottom of the\n> screen. A snackbar may contain an action button to execute a command for the\n> user. Msgs should undo the committed action or retry it if it failed for\n> example. Msgs should not be to close the snackbar. By not providing an\n> action, the snackbar becomes a __toast__ component.\n\n');
var _debois$elm_mdl$Demo_Snackbar$transitionLength = 150 * _elm_lang$core$Time$millisecond;
var _debois$elm_mdl$Demo_Snackbar$transitionInner = A2(
	_debois$elm_mdl$Material_Options$css,
	'transition',
	A2(
		_elm_lang$core$Basics_ops['++'],
		'box-shadow 333ms ease-in-out 0s, ',
		A2(
			_elm_lang$core$Basics_ops['++'],
			'width ',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(_debois$elm_mdl$Demo_Snackbar$transitionLength),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'ms, ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						'height ',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(_debois$elm_mdl$Demo_Snackbar$transitionLength),
							A2(
								_elm_lang$core$Basics_ops['++'],
								'ms, ',
								A2(
									_elm_lang$core$Basics_ops['++'],
									'background-color ',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(_debois$elm_mdl$Demo_Snackbar$transitionLength),
										'ms'))))))))));
var _debois$elm_mdl$Demo_Snackbar$transitionOuter = A2(
	_debois$elm_mdl$Material_Options$css,
	'transition',
	A2(
		_elm_lang$core$Basics_ops['++'],
		'width ',
		A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(_debois$elm_mdl$Demo_Snackbar$transitionLength),
			A2(
				_elm_lang$core$Basics_ops['++'],
				'ms ease-in-out 0s, ',
				A2(
					_elm_lang$core$Basics_ops['++'],
					'margin ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_debois$elm_mdl$Demo_Snackbar$transitionLength),
						'ms ease-in-out 0s'))))));
var _debois$elm_mdl$Demo_Snackbar$boxWidth = '64px';
var _debois$elm_mdl$Demo_Snackbar$boxHeight = '48px';
var _debois$elm_mdl$Demo_Snackbar$mapSquare = F3(
	function (k, f, model) {
		return _elm_lang$core$Native_Utils.update(
			model,
			{
				squares: A2(
					_elm_lang$core$List$map,
					function (_p0) {
						var _p1 = _p0;
						var _p2 = _p1._0;
						return (!_elm_lang$core$Native_Utils.eq(k, _p2)) ? _p1 : {
							ctor: '_Tuple2',
							_0: _p2,
							_1: f(_p1._1)
						};
					},
					model.squares)
			});
	});
var _debois$elm_mdl$Demo_Snackbar$model = {
	count: 0,
	squares: _elm_lang$core$Native_List.fromArray(
		[]),
	snackbar: _debois$elm_mdl$Material_Snackbar$model,
	mdl: _debois$elm_mdl$Material$model
};
var _debois$elm_mdl$Demo_Snackbar$Model = F4(
	function (a, b, c, d) {
		return {count: a, squares: b, snackbar: c, mdl: d};
	});
var _debois$elm_mdl$Demo_Snackbar$Disappearing = {ctor: 'Disappearing'};
var _debois$elm_mdl$Demo_Snackbar$Idle = {ctor: 'Idle'};
var _debois$elm_mdl$Demo_Snackbar$Active = {ctor: 'Active'};
var _debois$elm_mdl$Demo_Snackbar$Waiting = {ctor: 'Waiting'};
var _debois$elm_mdl$Demo_Snackbar$Growing = {ctor: 'Growing'};
var _debois$elm_mdl$Demo_Snackbar$Appearing = {ctor: 'Appearing'};
var _debois$elm_mdl$Demo_Snackbar$clickView = F2(
	function (model, _p3) {
		var _p4 = _p3;
		var _p8 = _p4._1;
		var _p7 = _p4._0;
		var _p5 = (_elm_lang$core$Native_Utils.eq(_p8, _debois$elm_mdl$Demo_Snackbar$Appearing) || _elm_lang$core$Native_Utils.eq(_p8, _debois$elm_mdl$Demo_Snackbar$Disappearing)) ? {ctor: '_Tuple4', _0: '0', _1: '0', _2: '16px 0', _3: false} : {
			ctor: '_Tuple4',
			_0: _debois$elm_mdl$Demo_Snackbar$boxWidth,
			_1: _debois$elm_mdl$Demo_Snackbar$boxHeight,
			_2: '16px 16px',
			_3: _elm_lang$core$Native_Utils.eq(_p8, _debois$elm_mdl$Demo_Snackbar$Active)
		};
		var width = _p5._0;
		var height = _p5._1;
		var margin = _p5._2;
		var selected = _p5._3;
		var shade = function () {
			var _p6 = _p8;
			if (_p6.ctor === 'Idle') {
				return _debois$elm_mdl$Material_Color$S100;
			} else {
				return _debois$elm_mdl$Material_Color$S500;
			}
		}();
		var hue = A2(
			_elm_lang$core$Maybe$withDefault,
			_debois$elm_mdl$Material_Color$Teal,
			A2(
				_elm_lang$core$Array$get,
				A2(
					_elm_lang$core$Basics_ops['%'],
					_p7 + 4,
					_elm_lang$core$Array$length(_debois$elm_mdl$Material_Color$hues)),
				_debois$elm_mdl$Material_Color$hues));
		var color = A2(_debois$elm_mdl$Material_Color$color, hue, shade);
		return A2(
			_debois$elm_mdl$Material_Options$div,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_debois$elm_mdl$Material_Options$css, 'height', _debois$elm_mdl$Demo_Snackbar$boxHeight),
					A2(_debois$elm_mdl$Material_Options$css, 'width', width),
					A2(_debois$elm_mdl$Material_Options$css, 'position', 'relative'),
					A2(_debois$elm_mdl$Material_Options$css, 'display', 'inline-block'),
					A2(_debois$elm_mdl$Material_Options$css, 'margin', margin),
					A2(_debois$elm_mdl$Material_Options$css, 'z-index', '0'),
					_debois$elm_mdl$Demo_Snackbar$transitionOuter
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_Options$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Color$background(color),
							_debois$elm_mdl$Material_Color$text(_debois$elm_mdl$Material_Color$primaryContrast),
							selected ? _debois$elm_mdl$Material_Elevation$e8 : _debois$elm_mdl$Material_Elevation$e2,
							A2(_debois$elm_mdl$Material_Options$css, 'display', 'inline-flex'),
							A2(_debois$elm_mdl$Material_Options$css, 'align-items', 'center'),
							A2(_debois$elm_mdl$Material_Options$css, 'justify-content', 'center'),
							A2(_debois$elm_mdl$Material_Options$css, 'flex', '0 0 auto'),
							A2(_debois$elm_mdl$Material_Options$css, 'height', height),
							A2(_debois$elm_mdl$Material_Options$css, 'width', width),
							A2(_debois$elm_mdl$Material_Options$css, 'border-radius', '2px'),
							A2(_debois$elm_mdl$Material_Options$css, 'box-sizing', 'border-box'),
							A2(_debois$elm_mdl$Material_Options$css, 'position', 'absolute'),
							A2(_debois$elm_mdl$Material_Options$css, 'bottom', '0'),
							A2(_debois$elm_mdl$Material_Options$css, 'left', '0'),
							_debois$elm_mdl$Demo_Snackbar$transitionInner
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$html$Html$div,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text(
									_elm_lang$core$Basics$toString(_p7))
								]))
						]))
				]));
	});
var _debois$elm_mdl$Demo_Snackbar$MDL = function (a) {
	return {ctor: 'MDL', _0: a};
};
var _debois$elm_mdl$Demo_Snackbar$Snackbar = function (a) {
	return {ctor: 'Snackbar', _0: a};
};
var _debois$elm_mdl$Demo_Snackbar$Gone = function (a) {
	return {ctor: 'Gone', _0: a};
};
var _debois$elm_mdl$Demo_Snackbar$Grown = function (a) {
	return {ctor: 'Grown', _0: a};
};
var _debois$elm_mdl$Demo_Snackbar$Appear = function (a) {
	return {ctor: 'Appear', _0: a};
};
var _debois$elm_mdl$Demo_Snackbar$add = F2(
	function (f, model) {
		var _p9 = A2(
			_debois$elm_mdl$Material_Helpers$map2nd,
			_elm_lang$core$Platform_Cmd$map(_debois$elm_mdl$Demo_Snackbar$Snackbar),
			A2(
				_debois$elm_mdl$Material_Snackbar$add,
				f(model.count),
				model.snackbar));
		var snackbar$ = _p9._0;
		var effect = _p9._1;
		var model$ = _elm_lang$core$Native_Utils.update(
			model,
			{
				snackbar: snackbar$,
				count: model.count + 1,
				squares: A2(
					_elm_lang$core$List_ops['::'],
					{ctor: '_Tuple2', _0: model.count, _1: _debois$elm_mdl$Demo_Snackbar$Appearing},
					model.squares)
			});
		return {
			ctor: '_Tuple2',
			_0: model$,
			_1: _elm_lang$core$Platform_Cmd$batch(
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Helpers$cssTransitionStep(
						_debois$elm_mdl$Demo_Snackbar$Appear(model.count)),
						effect
					]))
		};
	});
var _debois$elm_mdl$Demo_Snackbar$update = F2(
	function (action, model) {
		var _p10 = action;
		switch (_p10.ctor) {
			case 'AddSnackbar':
				return A2(
					_debois$elm_mdl$Demo_Snackbar$add,
					function (k) {
						return A3(
							_debois$elm_mdl$Material_Snackbar$snackbar,
							k,
							A2(
								_elm_lang$core$Basics_ops['++'],
								'Snackbar message #',
								_elm_lang$core$Basics$toString(k)),
							'UNDO');
					},
					model);
			case 'AddToast':
				return A2(
					_debois$elm_mdl$Demo_Snackbar$add,
					function (k) {
						return A2(
							_debois$elm_mdl$Material_Snackbar$toast,
							k,
							A2(
								_elm_lang$core$Basics_ops['++'],
								'Toast message #',
								_elm_lang$core$Basics$toString(k)));
					},
					model);
			case 'Appear':
				var _p11 = _p10._0;
				return {
					ctor: '_Tuple2',
					_0: A3(
						_debois$elm_mdl$Demo_Snackbar$mapSquare,
						_p11,
						function (sq) {
							return _elm_lang$core$Native_Utils.eq(sq, _debois$elm_mdl$Demo_Snackbar$Appearing) ? _debois$elm_mdl$Demo_Snackbar$Growing : sq;
						},
						model),
					_1: A2(
						_debois$elm_mdl$Material_Helpers$delay,
						_debois$elm_mdl$Demo_Snackbar$transitionLength,
						_debois$elm_mdl$Demo_Snackbar$Grown(_p11))
				};
			case 'Grown':
				return _debois$elm_mdl$Material_Helpers$pure(
					A3(
						_debois$elm_mdl$Demo_Snackbar$mapSquare,
						_p10._0,
						function (sq) {
							return _elm_lang$core$Native_Utils.eq(sq, _debois$elm_mdl$Demo_Snackbar$Growing) ? _debois$elm_mdl$Demo_Snackbar$Waiting : sq;
						},
						model));
			case 'Gone':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							squares: A2(
								_elm_lang$core$List$filter,
								function (_p13) {
									return A2(
										F2(
											function (x, y) {
												return !_elm_lang$core$Native_Utils.eq(x, y);
											}),
										_p10._0,
										_elm_lang$core$Basics$fst(_p13));
								},
								model.squares)
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'Snackbar':
				switch (_p10._0.ctor) {
					case 'Begin':
						return _debois$elm_mdl$Material_Helpers$pure(
							A3(
								_debois$elm_mdl$Demo_Snackbar$mapSquare,
								_p10._0._0,
								_elm_lang$core$Basics$always(_debois$elm_mdl$Demo_Snackbar$Active),
								model));
					case 'End':
						return _debois$elm_mdl$Material_Helpers$pure(
							A3(
								_debois$elm_mdl$Demo_Snackbar$mapSquare,
								_p10._0._0,
								function (sq) {
									return (!_elm_lang$core$Native_Utils.eq(sq, _debois$elm_mdl$Demo_Snackbar$Disappearing)) ? _debois$elm_mdl$Demo_Snackbar$Idle : sq;
								},
								model));
					case 'Click':
						var _p12 = _p10._0._0;
						return {
							ctor: '_Tuple2',
							_0: A3(
								_debois$elm_mdl$Demo_Snackbar$mapSquare,
								_p12,
								_elm_lang$core$Basics$always(_debois$elm_mdl$Demo_Snackbar$Disappearing),
								model),
							_1: A2(
								_debois$elm_mdl$Material_Helpers$delay,
								_debois$elm_mdl$Demo_Snackbar$transitionLength,
								_debois$elm_mdl$Demo_Snackbar$Gone(_p12))
						};
					default:
						return A2(
							_debois$elm_mdl$Material_Helpers$map2nd,
							_elm_lang$core$Platform_Cmd$map(_debois$elm_mdl$Demo_Snackbar$Snackbar),
							A2(
								_debois$elm_mdl$Material_Helpers$map1st,
								function (s) {
									return _elm_lang$core$Native_Utils.update(
										model,
										{snackbar: s});
								},
								A2(_debois$elm_mdl$Material_Snackbar$update, _p10._0, model.snackbar)));
				}
			default:
				return A2(_debois$elm_mdl$Material$update, _p10._0, model);
		}
	});
var _debois$elm_mdl$Demo_Snackbar$AddToast = {ctor: 'AddToast'};
var _debois$elm_mdl$Demo_Snackbar$AddSnackbar = {ctor: 'AddSnackbar'};
var _debois$elm_mdl$Demo_Snackbar$view = function (model) {
	var demo2 = _elm_lang$core$Native_List.fromArray(
		[
			A2(
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Click the buttons below to generate toasts and snackbars. Note that \n                    multiple activations are automatically queued.')
				])),
			A2(
			_debois$elm_mdl$Material_Grid$grid,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_debois$elm_mdl$Material_Options$css, 'min-height', '15rem')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_Grid$cell,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 4),
							A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Desktop, 2)
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A5(
							_debois$elm_mdl$Material_Button$render,
							_debois$elm_mdl$Demo_Snackbar$MDL,
							_elm_lang$core$Native_List.fromArray(
								[0]),
							model.mdl,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Button$raised,
									_debois$elm_mdl$Material_Button$onClick(_debois$elm_mdl$Demo_Snackbar$AddSnackbar),
									_debois$elm_mdl$Material_Button$colored,
									A2(_debois$elm_mdl$Material_Options$css, 'width', '8em')
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Snackbar')
								]))
						])),
					A2(
					_debois$elm_mdl$Material_Grid$cell,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 4),
							A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Desktop, 2)
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A5(
							_debois$elm_mdl$Material_Button$render,
							_debois$elm_mdl$Demo_Snackbar$MDL,
							_elm_lang$core$Native_List.fromArray(
								[1]),
							model.mdl,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Button$raised,
									_debois$elm_mdl$Material_Button$colored,
									_debois$elm_mdl$Material_Button$onClick(_debois$elm_mdl$Demo_Snackbar$AddToast),
									A2(_debois$elm_mdl$Material_Options$css, 'width', '8em')
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Toast')
								]))
						])),
					A2(
					_debois$elm_mdl$Material_Grid$cell,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Desktop, 10),
							A2(_debois$elm_mdl$Material_Grid$offset, _debois$elm_mdl$Material_Grid$Desktop, 1),
							A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Tablet, 6),
							A2(_debois$elm_mdl$Material_Grid$offset, _debois$elm_mdl$Material_Grid$Tablet, 1),
							A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Phone, 4),
							_debois$elm_mdl$Material_Grid$align(_debois$elm_mdl$Material_Grid$Top),
							A2(_debois$elm_mdl$Material_Options$css, 'padding-top', '32px')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A3(
							_elm_lang$html$Html_Keyed$node,
							'div',
							_elm_lang$core$Native_List.fromArray(
								[]),
							A2(
								_elm_lang$core$List$map,
								function (sq) {
									return {
										ctor: '_Tuple2',
										_0: _elm_lang$core$Basics$toString(
											_elm_lang$core$Basics$fst(sq)),
										_1: A2(_debois$elm_mdl$Demo_Snackbar$clickView, model, sq)
									};
								},
								_elm_lang$core$List$reverse(model.squares)))
						]))
				])),
			A2(
			_elm_lang$html$Html_App$map,
			_debois$elm_mdl$Demo_Snackbar$Snackbar,
			_debois$elm_mdl$Material_Snackbar$view(model.snackbar))
		]);
	var demo1 = _elm_lang$core$Native_List.fromArray(
		[]);
	return A6(_debois$elm_mdl$Demo_Page$body1$, 'Snackbar & Toast', _debois$elm_mdl$Demo_Snackbar$srcUrl, _debois$elm_mdl$Demo_Snackbar$intro, _debois$elm_mdl$Demo_Snackbar$references, demo1, demo2);
};

var _debois$elm_mdl$Material_Table$defaultCell = {numeric: false};
var _debois$elm_mdl$Material_Table$td = F2(
	function (options, html) {
		var _p0 = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Table$defaultCell, options);
		var summary = _p0;
		var config = _p0.config;
		return A5(
			_debois$elm_mdl$Material_Options$apply,
			summary,
			_elm_lang$html$Html$td,
			_elm_lang$core$Native_List.fromArray(
				[
					config.numeric ? _debois$elm_mdl$Material_Options$nop : _debois$elm_mdl$Material_Options$cs('mdl-data-table__cell--non-numeric')
				]),
			_elm_lang$core$Native_List.fromArray(
				[]),
			html);
	});
var _debois$elm_mdl$Material_Table$onClick = function (x) {
	return _debois$elm_mdl$Material_Options$set(
		function (options) {
			return _elm_lang$core$Native_Utils.update(
				options,
				{
					onClick: _elm_lang$core$Maybe$Just(
						_elm_lang$html$Html_Events$onClick(x))
				});
		});
};
var _debois$elm_mdl$Material_Table$sorted = function (order) {
	return _debois$elm_mdl$Material_Options$set(
		function (self) {
			return _elm_lang$core$Native_Utils.update(
				self,
				{
					sorted: _elm_lang$core$Maybe$Just(order)
				});
		});
};
var _debois$elm_mdl$Material_Table$numeric = _debois$elm_mdl$Material_Options$set(
	function (self) {
		return _elm_lang$core$Native_Utils.update(
			self,
			{numeric: true});
	});
var _debois$elm_mdl$Material_Table$defaultHeader = {numeric: false, sorted: _elm_lang$core$Maybe$Nothing, onClick: _elm_lang$core$Maybe$Nothing};
var _debois$elm_mdl$Material_Table$th = F2(
	function (options, html) {
		var _p1 = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Table$defaultHeader, options);
		var summary = _p1;
		var config = _p1.config;
		return A5(
			_debois$elm_mdl$Material_Options$apply,
			summary,
			_elm_lang$html$Html$th,
			_elm_lang$core$Native_List.fromArray(
				[
					config.numeric ? _debois$elm_mdl$Material_Options$nop : _debois$elm_mdl$Material_Options$cs('mdl-data-table__cell--non-numeric'),
					function () {
					var _p2 = config.sorted;
					if (_p2.ctor === 'Just') {
						if (_p2._0.ctor === 'Ascending') {
							return _debois$elm_mdl$Material_Options$cs('mdl-data-table__header--sorted-ascending');
						} else {
							return _debois$elm_mdl$Material_Options$cs('mdl-data-table__header--sorted-descending');
						}
					} else {
						return _debois$elm_mdl$Material_Options$nop;
					}
				}()
				]),
			A2(
				_elm_lang$core$Maybe$withDefault,
				_elm_lang$core$Native_List.fromArray(
					[]),
				A2(
					_elm_lang$core$Maybe$map,
					A2(
						_elm_lang$core$Basics$flip,
						F2(
							function (x, y) {
								return A2(_elm_lang$core$List_ops['::'], x, y);
							}),
						_elm_lang$core$Native_List.fromArray(
							[])),
					config.onClick)),
			html);
	});
var _debois$elm_mdl$Material_Table$selected = _debois$elm_mdl$Material_Options$set(
	function (self) {
		return _elm_lang$core$Native_Utils.update(
			self,
			{selected: true});
	});
var _debois$elm_mdl$Material_Table$defaultRow = {selected: false};
var _debois$elm_mdl$Material_Table$tr = F2(
	function (options, html) {
		var _p3 = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Table$defaultRow, options);
		var summary = _p3;
		var config = _p3.config;
		return A5(
			_debois$elm_mdl$Material_Options$apply,
			summary,
			_elm_lang$html$Html$tr,
			_elm_lang$core$Native_List.fromArray(
				[
					config.selected ? _debois$elm_mdl$Material_Options$cs('is-selected') : _debois$elm_mdl$Material_Options$nop
				]),
			_elm_lang$core$Native_List.fromArray(
				[]),
			html);
	});
var _debois$elm_mdl$Material_Table$tfoot = F2(
	function (options, html) {
		var summary = A2(
			_debois$elm_mdl$Material_Options$collect,
			{},
			options);
		return A5(
			_debois$elm_mdl$Material_Options$apply,
			summary,
			_elm_lang$html$Html$tfoot,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[]),
			html);
	});
var _debois$elm_mdl$Material_Table$tbody = F2(
	function (options, html) {
		var summary = A2(
			_debois$elm_mdl$Material_Options$collect,
			{},
			options);
		return A5(
			_debois$elm_mdl$Material_Options$apply,
			summary,
			_elm_lang$html$Html$tbody,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[]),
			html);
	});
var _debois$elm_mdl$Material_Table$thead = F2(
	function (options, html) {
		var summary = A2(
			_debois$elm_mdl$Material_Options$collect,
			{},
			options);
		return A5(
			_debois$elm_mdl$Material_Options$apply,
			summary,
			_elm_lang$html$Html$thead,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[]),
			html);
	});
var _debois$elm_mdl$Material_Table$table = F2(
	function (options, nodes) {
		var summary = A2(
			_debois$elm_mdl$Material_Options$collect,
			{},
			options);
		return A5(
			_debois$elm_mdl$Material_Options$apply,
			summary,
			_elm_lang$html$Html$table,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$cs('mdl-data-table'),
					_debois$elm_mdl$Material_Options$cs('mdl-js-data-table'),
					_debois$elm_mdl$Material_Options$cs('is-upgraded')
				]),
			_elm_lang$core$Native_List.fromArray(
				[]),
			nodes);
	});
var _debois$elm_mdl$Material_Table$Row = function (a) {
	return {selected: a};
};
var _debois$elm_mdl$Material_Table$Header = F3(
	function (a, b, c) {
		return {numeric: a, sorted: b, onClick: c};
	});
var _debois$elm_mdl$Material_Table$Cell = function (a) {
	return {numeric: a};
};
var _debois$elm_mdl$Material_Table$Descending = {ctor: 'Descending'};
var _debois$elm_mdl$Material_Table$descending = _debois$elm_mdl$Material_Table$sorted(_debois$elm_mdl$Material_Table$Descending);
var _debois$elm_mdl$Material_Table$Ascending = {ctor: 'Ascending'};
var _debois$elm_mdl$Material_Table$ascending = _debois$elm_mdl$Material_Table$sorted(_debois$elm_mdl$Material_Table$Ascending);

var _debois$elm_mdl$Demo_Tables$references = _elm_lang$core$Native_List.fromArray(
	[
		_debois$elm_mdl$Demo_Page$package('http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Table'),
		_debois$elm_mdl$Demo_Page$mds('https://www.google.com/design/spec/components/data-tables.html'),
		_debois$elm_mdl$Demo_Page$mdl('https://www.getmdl.io/components/index.html#tables')
	]);
var _debois$elm_mdl$Demo_Tables$srcUrl = 'https://github.com/debois/elm-mdl/blob/master/demo/Demo/Tables.elm';
var _debois$elm_mdl$Demo_Tables$intro = A2(_debois$elm_mdl$Demo_Page$fromMDL, 'https://www.getmdl.io/components/index.html#tables-section', '\n> The Material Design Lite (MDL) data-table component is an enhanced version of\n> the standard HTML &lt;table&gt;. A data-table consists of rows and columns of\n> well-formatted data, presented with appropriate user interaction\n> capabilities.\n\n> Tables are a ubiquitous feature of most user interfaces, regardless of a\n> site\'s content or function. Their design and use is therefore an important\n> factor in the overall user experience. See the data-table component\'s\n> Material Design specifications page for details.\n\n> The available row/column/cell types in a data-table are mostly\n> self-formatting; that is, once the data-table is defined, the individual\n> cells require very little specific attention. For example, the rows exhibit\n> shading behavior on mouseover and selection, numeric values are automatically\n> formatted by default, and the addition of a single class makes the table rows\n> individually or collectively selectable. This makes the data-table component\n> convenient and easy to code for the developer, as well as attractive and\n> intuitive for the user.\n');
var _debois$elm_mdl$Demo_Tables$reverse = F2(
	function (x, y) {
		var _p0 = A2(_elm_lang$core$Basics$compare, x, y);
		switch (_p0.ctor) {
			case 'LT':
				return _elm_lang$core$Basics$GT;
			case 'GT':
				return _elm_lang$core$Basics$LT;
			default:
				return _elm_lang$core$Basics$EQ;
		}
	});
var _debois$elm_mdl$Demo_Tables$toggle = F2(
	function (x, set) {
		return A2(_elm_lang$core$Set$member, x, set) ? A2(_elm_lang$core$Set$remove, x, set) : A2(_elm_lang$core$Set$insert, x, set);
	});
var _debois$elm_mdl$Demo_Tables$rotate = function (order) {
	var _p1 = order;
	if (_p1.ctor === 'Just') {
		if (_p1._0.ctor === 'Ascending') {
			return _elm_lang$core$Maybe$Just(_debois$elm_mdl$Material_Table$Descending);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	} else {
		return _elm_lang$core$Maybe$Just(_debois$elm_mdl$Material_Table$Ascending);
	}
};
var _debois$elm_mdl$Demo_Tables$model = {
	mdl: _debois$elm_mdl$Material$model,
	order: _elm_lang$core$Maybe$Just(_debois$elm_mdl$Material_Table$Ascending),
	selected: _elm_lang$core$Set$empty
};
var _debois$elm_mdl$Demo_Tables$preamble = '\nimport Material.Table as Table\n\ntype alias Data = \n  { material : String\n  , quantity : String\n  , unitPrice : String\n  }\n\ndata : List Data\ndata = \n  [ { material = \"Acrylic (Transparent)\"   , quantity = \"25\" , unitPrice = \"$2.90\" } \n  , { material = \"Plywood (Birch)\"         , quantity = \"50\" , unitPrice = \"$1.25\" }\n  , { material = \"Laminate (Gold on Blue)\" , quantity = \"10\" , unitPrice = \"$2.35\" }\n  ]\n  ';
var _debois$elm_mdl$Demo_Tables$key = function (_) {
	return _.material;
};
var _debois$elm_mdl$Demo_Tables$data = _elm_lang$core$Native_List.fromArray(
	[
		{material: 'Acrylic (Transparent)', quantity: '25', unitPrice: '$2.90'},
		{material: 'Plywood (Birch)', quantity: '50', unitPrice: '$1.25'},
		{material: 'Laminate (Gold on Blue)', quantity: '10', unitPrice: '$2.35'}
	]);
var _debois$elm_mdl$Demo_Tables$allSelected = function (model) {
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$Set$size(model.selected),
		_elm_lang$core$List$length(_debois$elm_mdl$Demo_Tables$data));
};
var _debois$elm_mdl$Demo_Tables$update = F2(
	function (msg, model) {
		var _p2 = msg;
		switch (_p2.ctor) {
			case 'Reorder':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							order: _debois$elm_mdl$Demo_Tables$rotate(model.order)
						}),
					_elm_lang$core$Native_List.fromArray(
						[]));
			case 'ToggleAll':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							selected: _debois$elm_mdl$Demo_Tables$allSelected(model) ? _elm_lang$core$Set$empty : _elm_lang$core$Set$fromList(
								A2(_elm_lang$core$List$map, _debois$elm_mdl$Demo_Tables$key, _debois$elm_mdl$Demo_Tables$data))
						}),
					_elm_lang$core$Native_List.fromArray(
						[]));
			case 'Toggle':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							selected: A2(_debois$elm_mdl$Demo_Tables$toggle, _p2._0, model.selected)
						}),
					_elm_lang$core$Native_List.fromArray(
						[]));
			default:
				return A2(_debois$elm_mdl$Material$update, _p2._0, model);
		}
	});
var _debois$elm_mdl$Demo_Tables$basic = function (model) {
	var code = ' \n        Table.table []\n        [ Table.thead []\n          [ Table.tr []\n            [ Table.th [] [ text \"Material\" ]\n            , Table.th [ ] [ text \"Quantity\" ]\n            , Table.th [ ] [ text \"Unit Price\" ]\n            ]\n          ]\n        , Table.tbody []\n            (data |> List.map (\\item ->\n               Table.tr []\n                 [ Table.td [] [ text item.material ]\n                 , Table.td [ Table.numeric ] [ text item.quantity ]\n                 , Table.td [ Table.numeric ] [ text item.unitPrice ]\n                 ]\n               )\n            )\n        ]\n      ';
	var table = A2(
		_debois$elm_mdl$Material_Table$table,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_Table$thead,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Table$tr,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Material_Table$th,
								_elm_lang$core$Native_List.fromArray(
									[]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Material')
									])),
								A2(
								_debois$elm_mdl$Material_Table$th,
								_elm_lang$core$Native_List.fromArray(
									[]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Quantity')
									])),
								A2(
								_debois$elm_mdl$Material_Table$th,
								_elm_lang$core$Native_List.fromArray(
									[]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Unit Price')
									]))
							]))
					])),
				A2(
				_debois$elm_mdl$Material_Table$tbody,
				_elm_lang$core$Native_List.fromArray(
					[]),
				A2(
					_elm_lang$core$List$map,
					function (item) {
						return A2(
							_debois$elm_mdl$Material_Table$tr,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_debois$elm_mdl$Material_Table$td,
									_elm_lang$core$Native_List.fromArray(
										[]),
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html$text(item.material)
										])),
									A2(
									_debois$elm_mdl$Material_Table$td,
									_elm_lang$core$Native_List.fromArray(
										[_debois$elm_mdl$Material_Table$numeric]),
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html$text(item.quantity)
										])),
									A2(
									_debois$elm_mdl$Material_Table$td,
									_elm_lang$core$Native_List.fromArray(
										[_debois$elm_mdl$Material_Table$numeric]),
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html$text(item.unitPrice)
										]))
								]));
					},
					_debois$elm_mdl$Demo_Tables$data))
			]));
	return {ctor: '_Tuple3', _0: 'Static table', _1: table, _2: code};
};
var _debois$elm_mdl$Demo_Tables$Data = F3(
	function (a, b, c) {
		return {material: a, quantity: b, unitPrice: c};
	});
var _debois$elm_mdl$Demo_Tables$Model = F3(
	function (a, b, c) {
		return {mdl: a, order: b, selected: c};
	});
var _debois$elm_mdl$Demo_Tables$Reorder = {ctor: 'Reorder'};
var _debois$elm_mdl$Demo_Tables$sortable = function (model) {
	var code = A2(
		_elm_lang$core$Basics_ops['++'],
		' \n        Table.table []\n          [ Table.thead []\n            [ Table.tr []\n              [ Table.th\n                  [ ',
		A2(
			_elm_lang$core$Basics_ops['++'],
			function () {
				var _p3 = model.order;
				if (_p3.ctor === 'Nothing') {
					return '';
				} else {
					return A2(
						_elm_lang$core$Basics_ops['++'],
						'Table.',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(_p3._0),
							', '));
				}
			}(),
			A2(
				_elm_lang$core$Basics_ops['++'],
				'Table.onClick Reorder ]\n                  [ text \"Material\" ]\n              , Table.th [ Table.numeric ] [ text \"Quantity\" ]\n              , Table.th [ Table.numeric ] [ text \"Unit Price\" ]\n              ]\n            ]\n          , Table.tbody []\n              ( ',
				A2(
					_elm_lang$core$Basics_ops['++'],
					function () {
						var _p4 = model.order;
						if (_p4.ctor === 'Nothing') {
							return '';
						} else {
							if (_p4._0.ctor === 'Ascending') {
								return 'mySort ';
							} else {
								return 'mySortDescending ';
							}
						}
					}(),
					'data\n                |> List.map (\\item ->\n                     Table.tr []\n                       [ Table.td [] [ text item.material ]\n                       , Table.td [ Table.numeric ] [ text item.quantity ]\n                       , Table.td [ Table.numeric ] [ text item.unitPrice ]\n                       ]\n                   )\n              )\n          ]'))));
	var table = function () {
		var sort = function () {
			var _p5 = model.order;
			if (_p5.ctor === 'Just') {
				if (_p5._0.ctor === 'Ascending') {
					return _elm_lang$core$List$sortBy(
						function (_) {
							return _.material;
						});
				} else {
					return _elm_lang$core$List$sortWith(
						F2(
							function (x, y) {
								return A2(
									_debois$elm_mdl$Demo_Tables$reverse,
									function (_) {
										return _.material;
									}(x),
									function (_) {
										return _.material;
									}(y));
							}));
				}
			} else {
				return _elm_lang$core$Basics$identity;
			}
		}();
		return A2(
			_debois$elm_mdl$Material_Table$table,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_Table$thead,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_Table$tr,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_debois$elm_mdl$Material_Table$th,
									_elm_lang$core$Native_List.fromArray(
										[
											A2(
											_elm_lang$core$Maybe$withDefault,
											_debois$elm_mdl$Material_Options$nop,
											A2(_elm_lang$core$Maybe$map, _debois$elm_mdl$Material_Table$sorted, model.order)),
											_debois$elm_mdl$Material_Table$onClick(_debois$elm_mdl$Demo_Tables$Reorder)
										]),
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html$text('Material')
										])),
									A2(
									_debois$elm_mdl$Material_Table$th,
									_elm_lang$core$Native_List.fromArray(
										[_debois$elm_mdl$Material_Table$numeric]),
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html$text('Quantity')
										])),
									A2(
									_debois$elm_mdl$Material_Table$th,
									_elm_lang$core$Native_List.fromArray(
										[_debois$elm_mdl$Material_Table$numeric]),
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html$text('Unit Price')
										]))
								]))
						])),
					A2(
					_debois$elm_mdl$Material_Table$tbody,
					_elm_lang$core$Native_List.fromArray(
						[]),
					A2(
						_elm_lang$core$List$indexedMap,
						F2(
							function (idx, item) {
								return A2(
									_debois$elm_mdl$Material_Table$tr,
									_elm_lang$core$Native_List.fromArray(
										[]),
									_elm_lang$core$Native_List.fromArray(
										[
											A2(
											_debois$elm_mdl$Material_Table$td,
											_elm_lang$core$Native_List.fromArray(
												[]),
											_elm_lang$core$Native_List.fromArray(
												[
													_elm_lang$html$Html$text(item.material)
												])),
											A2(
											_debois$elm_mdl$Material_Table$td,
											_elm_lang$core$Native_List.fromArray(
												[_debois$elm_mdl$Material_Table$numeric]),
											_elm_lang$core$Native_List.fromArray(
												[
													_elm_lang$html$Html$text(item.quantity)
												])),
											A2(
											_debois$elm_mdl$Material_Table$td,
											_elm_lang$core$Native_List.fromArray(
												[_debois$elm_mdl$Material_Table$numeric]),
											_elm_lang$core$Native_List.fromArray(
												[
													_elm_lang$html$Html$text(item.unitPrice)
												]))
										]));
							}),
						sort(_debois$elm_mdl$Demo_Tables$data)))
				]));
	}();
	return {ctor: '_Tuple3', _0: 'Sortable rows', _1: table, _2: code};
};
var _debois$elm_mdl$Demo_Tables$Toggle = function (a) {
	return {ctor: 'Toggle', _0: a};
};
var _debois$elm_mdl$Demo_Tables$ToggleAll = {ctor: 'ToggleAll'};
var _debois$elm_mdl$Demo_Tables$Mdl = function (a) {
	return {ctor: 'Mdl', _0: a};
};
var _debois$elm_mdl$Demo_Tables$selectable = function (model) {
	var code = '\n    view : Model -> Html Msg\n    view model = \n      Table.table []\n        [ Table.thead []\n          [ Table.tr []\n            [ Table.th []\n                [ Toggles.checkbox Mdl [-1] model.mdl\n                  [ Toggles.onClick ToggleAll\n                  , Toggles.value (allSelected model)\n                  ] []\n                ]\n            , Table.th [] [ text \"Material\" ]\n            , Table.th [ Table.numeric ] [ text \"Quantity\" ]\n            , Table.th [ Table.numeric ] [ text \"Unit Price\" ]\n            ]\n          ]\n        , Table.tbody []\n            ( data\n              |> List.indexedMap (\\idx item ->\n                   Table.tr\n                     [ Table.selected `when` Set.member (key item) model.selected ]\n                     [ Table.td []\n                       [ Toggles.checkbox Mdl [idx] model.mdl\n                         [ Toggles.onClick (Toggle <| key item)\n                         , Toggles.value <| Set.member (key item) model.selected\n                         ] []\n                       ]\n                     , Table.td [] [ text item.material ]\n                     , Table.td [ Table.numeric ] [ text item.quantity ]\n                     , Table.td [ Table.numeric ] [ text item.unitPrice ]\n                     ]\n                 )\n            )\n        ]\n\n\n    type alias Model = \n      { selected : Set String \n      , ...\n      }\n\n\n    update : Msg -> Model -> (Model, Cmd Msg)\n    update msg model =\n      case msg of\n        ...\n        ToggleAll -> \n          { model\n            | selected =\n                if allSelected model then\n                  Set.empty\n                else \n                  List.map key data |> Set.fromList \n          } ! []\n\n        Toggle k ->\n          { model \n            | selected = \n                if Set.member k model.selected then\n                  Set.remove k model.selected\n                else\n                  Set.insert k model.selected \n          } ! []\n\n\n      allSelected : Model -> Bool\n      allSelected model = \n        Set.size model.selected == List.length data \n\n\n      key : Data -> String\n      key = \n        .material\n      ';
	var table = A2(
		_debois$elm_mdl$Material_Table$table,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_Table$thead,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Table$tr,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Material_Table$th,
								_elm_lang$core$Native_List.fromArray(
									[]),
								_elm_lang$core$Native_List.fromArray(
									[
										A5(
										_debois$elm_mdl$Material_Toggles$checkbox,
										_debois$elm_mdl$Demo_Tables$Mdl,
										_elm_lang$core$Native_List.fromArray(
											[-1]),
										model.mdl,
										_elm_lang$core$Native_List.fromArray(
											[
												_debois$elm_mdl$Material_Toggles$onClick(_debois$elm_mdl$Demo_Tables$ToggleAll),
												_debois$elm_mdl$Material_Toggles$value(
												_debois$elm_mdl$Demo_Tables$allSelected(model))
											]),
										_elm_lang$core$Native_List.fromArray(
											[]))
									])),
								A2(
								_debois$elm_mdl$Material_Table$th,
								_elm_lang$core$Native_List.fromArray(
									[]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Material')
									])),
								A2(
								_debois$elm_mdl$Material_Table$th,
								_elm_lang$core$Native_List.fromArray(
									[_debois$elm_mdl$Material_Table$numeric]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Quantity')
									])),
								A2(
								_debois$elm_mdl$Material_Table$th,
								_elm_lang$core$Native_List.fromArray(
									[_debois$elm_mdl$Material_Table$numeric]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Unit Price')
									]))
							]))
					])),
				A2(
				_debois$elm_mdl$Material_Table$tbody,
				_elm_lang$core$Native_List.fromArray(
					[]),
				A2(
					_elm_lang$core$List$indexedMap,
					F2(
						function (idx, item) {
							return A2(
								_debois$elm_mdl$Material_Table$tr,
								_elm_lang$core$Native_List.fromArray(
									[
										A2(
										_debois$elm_mdl$Material_Options$when,
										_debois$elm_mdl$Material_Table$selected,
										A2(
											_elm_lang$core$Set$member,
											_debois$elm_mdl$Demo_Tables$key(item),
											model.selected))
									]),
								_elm_lang$core$Native_List.fromArray(
									[
										A2(
										_debois$elm_mdl$Material_Table$td,
										_elm_lang$core$Native_List.fromArray(
											[]),
										_elm_lang$core$Native_List.fromArray(
											[
												A5(
												_debois$elm_mdl$Material_Toggles$checkbox,
												_debois$elm_mdl$Demo_Tables$Mdl,
												_elm_lang$core$Native_List.fromArray(
													[idx]),
												model.mdl,
												_elm_lang$core$Native_List.fromArray(
													[
														_debois$elm_mdl$Material_Toggles$onClick(
														_debois$elm_mdl$Demo_Tables$Toggle(
															_debois$elm_mdl$Demo_Tables$key(item))),
														_debois$elm_mdl$Material_Toggles$value(
														A2(
															_elm_lang$core$Set$member,
															_debois$elm_mdl$Demo_Tables$key(item),
															model.selected))
													]),
												_elm_lang$core$Native_List.fromArray(
													[]))
											])),
										A2(
										_debois$elm_mdl$Material_Table$td,
										_elm_lang$core$Native_List.fromArray(
											[]),
										_elm_lang$core$Native_List.fromArray(
											[
												_elm_lang$html$Html$text(item.material)
											])),
										A2(
										_debois$elm_mdl$Material_Table$td,
										_elm_lang$core$Native_List.fromArray(
											[_debois$elm_mdl$Material_Table$numeric]),
										_elm_lang$core$Native_List.fromArray(
											[
												_elm_lang$html$Html$text(item.quantity)
											])),
										A2(
										_debois$elm_mdl$Material_Table$td,
										_elm_lang$core$Native_List.fromArray(
											[_debois$elm_mdl$Material_Table$numeric]),
										_elm_lang$core$Native_List.fromArray(
											[
												_elm_lang$html$Html$text(item.unitPrice)
											]))
									]));
						}),
					_debois$elm_mdl$Demo_Tables$data))
			]));
	return {ctor: '_Tuple3', _0: 'Selectable rows', _1: table, _2: code};
};
var _debois$elm_mdl$Demo_Tables$tables = function (model) {
	return A2(
		_elm_lang$core$List$concatMap,
		function (_p6) {
			var _p7 = _p6;
			return _elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$html$Html$h4,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text(_p7._0)
						])),
					A2(
					_debois$elm_mdl$Material_Options$div,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Options$css, 'display', 'flex'),
							A2(_debois$elm_mdl$Material_Options$css, 'flex-flow', 'row wrap'),
							A2(_debois$elm_mdl$Material_Options$css, 'align-items', 'flex-start')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_Options$div,
							_elm_lang$core$Native_List.fromArray(
								[
									A2(_debois$elm_mdl$Material_Options$css, 'margin', '0 24px 24px 0'),
									A2(_debois$elm_mdl$Material_Options$css, 'width', '448px')
								]),
							_elm_lang$core$Native_List.fromArray(
								[_p7._1])),
							A2(
							_debois$elm_mdl$Demo_Code$code,
							_elm_lang$core$Native_List.fromArray(
								[
									A2(_debois$elm_mdl$Material_Options$css, 'flex-grow', '1'),
									A2(_debois$elm_mdl$Material_Options$css, 'margin', '0 0 24px 0')
								]),
							_p7._2)
						]))
				]);
		},
		_elm_lang$core$Native_List.fromArray(
			[
				_debois$elm_mdl$Demo_Tables$basic(model),
				_debois$elm_mdl$Demo_Tables$sortable(model),
				_debois$elm_mdl$Demo_Tables$selectable(model)
			]));
};
var _debois$elm_mdl$Demo_Tables$view = function (model) {
	return A6(
		_debois$elm_mdl$Demo_Page$body1$,
		'Tables',
		_debois$elm_mdl$Demo_Tables$srcUrl,
		_debois$elm_mdl$Demo_Tables$intro,
		_debois$elm_mdl$Demo_Tables$references,
		_debois$elm_mdl$Demo_Tables$tables(model),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$h4,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('Import & data')
					])),
				A2(
				_debois$elm_mdl$Demo_Code$code,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_debois$elm_mdl$Demo_Tables$preamble)
			]));
};

var _debois$elm_mdl$Demo_Tabs$references = _elm_lang$core$Native_List.fromArray(
	[
		_debois$elm_mdl$Demo_Page$package('http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Tabs'),
		_debois$elm_mdl$Demo_Page$mds('https://material.google.com/components/tabs.html'),
		_debois$elm_mdl$Demo_Page$mdl('https://getmdl.io/components/index.html#layout-section/tabs')
	]);
var _debois$elm_mdl$Demo_Tabs$srcUrl = 'https://github.com/debois/elm-mdl/blob/master/demo/Demo/Tabs.elm';
var _debois$elm_mdl$Demo_Tabs$intro = A2(_debois$elm_mdl$Demo_Page$fromMDL, 'https://getmdl.io/components/index.html#layout-section/tabs', '\n> The Material Design Lite (MDL) tab component is a user interface element that\n> allows different content blocks to share the same screen space in a mutually\n> exclusive manner. Tabs are always presented in sets of two or more, and they\n> make it easy to explore and switch among different views or functional aspects\n> of an app, or to browse categorized data sets individually. Tabs serve as\n> \"headings\" for their respective content; the active tab — the one whose content\n> is currently displayed — is always visually distinguished from the others so the\n> user knows which heading the current content belongs to.\n>\n> Tabs are an established but non-standardized feature in user interfaces, and\n> allow users to view different, but often related, blocks of content (often\n> called panels). Tabs save screen real estate and provide intuitive and logical\n> access to data while reducing navigation and associated user confusion. Their\n> design and use is an important factor in the overall user experience. See the\n> tab component\'s Material Design specifications page for details.\n');
var _debois$elm_mdl$Demo_Tabs$exampleTab = A2(
	_debois$elm_mdl$Demo_Code$code,
	_elm_lang$core$Native_List.fromArray(
		[]),
	'\n     Tabs.render Mdl [0] model.mdl\n      [ Tabs.ripple\n      , Tabs.onSelectTab SelectTab\n      , Tabs.activeTab model.tab\n      ]\n      [ Tabs.label \n          [ Options.center ] \n          [ Icon.i \"info_outline\"\n          , Options.span [ css \"width\" \"4px\" ] []\n          , text \"About tabs\" \n          ]\n      , Tabs.label \n          [ Options.center ] \n          [ Icon.i \"code\"\n          , Options.span [ css \"width\" \"4px\" ] []  \n          , text \"Example\" \n          ]\n      ]\n      [ case model.tab of\n          0 -> aboutTab\n          _ -> exampleTab\n      ]\n     ');
var _debois$elm_mdl$Demo_Tabs$aboutTab = A2(
	_evancz$elm_markdown$Markdown$toHtml,
	_elm_lang$core$Native_List.fromArray(
		[]),
	'\nFrom the [Material Design specification](https://material.google.com/components/tabs.html#tabs-usage):\n\n> Use tabs to organize content at a high level, for example, to present different sections of a newspaper. Don’t use tabs for carousels or pagination of content. Those use cases involve viewing content, not navigating between groups of content.\n>\n> For more detail about using tabs for navigating top-level views, see “Tabs” in Patterns > Navigation.\n>\n> Don\'t use tabs with content that supports the swipe gesture, because swipe gestures are used for navigating between tabs. For example, avoid using tabs in a map where content is pannable, or a list where items can be dismissed with a swipe.\n>\n> Fixed tabs should be used with a limited number of tabs and when consistent placement will aid muscle memory. Scrollable tabs should be used when there are many or a variable number of tabs.\n    ');
var _debois$elm_mdl$Demo_Tabs$update = F2(
	function (action, model) {
		var _p0 = action;
		if (_p0.ctor === 'SelectTab') {
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_Utils.update(
					model,
					{tab: _p0._0}),
				_1: _elm_lang$core$Platform_Cmd$none
			};
		} else {
			return A2(_debois$elm_mdl$Material$update, _p0._0, model);
		}
	});
var _debois$elm_mdl$Demo_Tabs$model = {mdl: _debois$elm_mdl$Material$model, tab: 1};
var _debois$elm_mdl$Demo_Tabs$Model = F2(
	function (a, b) {
		return {mdl: a, tab: b};
	});
var _debois$elm_mdl$Demo_Tabs$Mdl = function (a) {
	return {ctor: 'Mdl', _0: a};
};
var _debois$elm_mdl$Demo_Tabs$SelectTab = function (a) {
	return {ctor: 'SelectTab', _0: a};
};
var _debois$elm_mdl$Demo_Tabs$view = function (model) {
	return A5(
		_debois$elm_mdl$Demo_Page$body2,
		'Tabs',
		_debois$elm_mdl$Demo_Tabs$srcUrl,
		_debois$elm_mdl$Demo_Tabs$intro,
		_debois$elm_mdl$Demo_Tabs$references,
		_elm_lang$core$Native_List.fromArray(
			[
				A6(
				_debois$elm_mdl$Material_Tabs$render,
				_debois$elm_mdl$Demo_Tabs$Mdl,
				_elm_lang$core$Native_List.fromArray(
					[0]),
				model.mdl,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Tabs$ripple,
						_debois$elm_mdl$Material_Tabs$onSelectTab(_debois$elm_mdl$Demo_Tabs$SelectTab),
						_debois$elm_mdl$Material_Tabs$activeTab(model.tab)
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Tabs$label,
						_elm_lang$core$Native_List.fromArray(
							[_debois$elm_mdl$Material_Options$center]),
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Icon$i('info_outline'),
								A2(
								_debois$elm_mdl$Material_Options$span,
								_elm_lang$core$Native_List.fromArray(
									[
										A2(_debois$elm_mdl$Material_Options$css, 'width', '4px')
									]),
								_elm_lang$core$Native_List.fromArray(
									[])),
								_elm_lang$html$Html$text('About tabs')
							])),
						A2(
						_debois$elm_mdl$Material_Tabs$label,
						_elm_lang$core$Native_List.fromArray(
							[_debois$elm_mdl$Material_Options$center]),
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Icon$i('code'),
								A2(
								_debois$elm_mdl$Material_Options$span,
								_elm_lang$core$Native_List.fromArray(
									[
										A2(_debois$elm_mdl$Material_Options$css, 'width', '4px')
									]),
								_elm_lang$core$Native_List.fromArray(
									[])),
								_elm_lang$html$Html$text('Example')
							]))
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_debois$elm_mdl$Material_Options$div,
						_elm_lang$core$Native_List.fromArray(
							[
								A2(_debois$elm_mdl$Material_Options$css, 'margin', '24px auto'),
								A2(_debois$elm_mdl$Material_Options$css, 'align-items', 'flex-start'),
								_debois$elm_mdl$Material_Options$center,
								A2(_debois$elm_mdl$Material_Options$css, 'overflow-y', 'auto'),
								A2(_debois$elm_mdl$Material_Options$css, 'height', '512px')
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								function () {
								var _p1 = model.tab;
								if (_p1 === 0) {
									return _debois$elm_mdl$Demo_Tabs$aboutTab;
								} else {
									return _debois$elm_mdl$Demo_Tabs$exampleTab;
								}
							}()
							]))
					]))
			]));
};

var _debois$elm_mdl$Demo_Textfields$references = _elm_lang$core$Native_List.fromArray(
	[
		_debois$elm_mdl$Demo_Page$package('http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Textfield'),
		_debois$elm_mdl$Demo_Page$mds('https://www.google.com/design/spec/components/text-fields.html'),
		_debois$elm_mdl$Demo_Page$mdl('https://www.getmdl.io/components/#textfields-section')
	]);
var _debois$elm_mdl$Demo_Textfields$srcUrl = 'https://github.com/debois/elm-mdl/blob/master/demo/Demo/Textfields.elm';
var _debois$elm_mdl$Demo_Textfields$intro = A2(_debois$elm_mdl$Demo_Page$fromMDL, 'http://www.getmdl.io/components/#textfields-section', '\n> The Material Design Lite (MDL) text field component is an enhanced version of\n> the standard HTML `<input type=\"text\">` and `<input type=\"textarea\">` elements.\n> A text field consists of a horizontal line indicating where keyboard input\n> can occur and, typically, text that clearly communicates the intended\n> contents of the text field. The MDL text field component provides various\n> types of text fields, and allows you to add both display and click effects.\n>\n> Text fields are a common feature of most user interfaces, regardless of a\n> site\'s content or function. Their design and use is therefore an important\n> factor in the overall user experience. See the text field component\'s\n> [Material  Design specifications page](https://www.google.com/design/spec/components/text-fields.html)\n> for details.\n>\n> The enhanced text field component has a more vivid visual look than a standard\n> text field, and may be initially or programmatically disabled. There are three\n> main types of text fields in the text field component, each with its own basic\n> coding requirements. The types are single-line, multi-line, and expandable.\n');
var _debois$elm_mdl$Demo_Textfields$view1 = function (_p0) {
	var _p1 = _p0;
	return A2(
		_debois$elm_mdl$Material_Grid$cell,
		_elm_lang$core$Native_List.fromArray(
			[
				A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Phone, 4),
				A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Tablet, 6),
				A2(_debois$elm_mdl$Material_Grid$offset, _debois$elm_mdl$Material_Grid$Tablet, 1),
				A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Desktop, 8),
				A2(_debois$elm_mdl$Material_Grid$offset, _debois$elm_mdl$Material_Grid$Desktop, 2)
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$h4,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text(_p1._0)
					])),
				A2(
				_debois$elm_mdl$Material_Options$div,
				_elm_lang$core$Native_List.fromArray(
					[_debois$elm_mdl$Material_Options$center]),
				_elm_lang$core$Native_List.fromArray(
					[_p1._1])),
				A2(
				_debois$elm_mdl$Demo_Code$code,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Options$css, 'margin', '24px 0')
					]),
				_p1._2)
			]));
};
var _debois$elm_mdl$Demo_Textfields$match = F2(
	function (str, rx) {
		return A2(
			_elm_lang$core$List$any,
			function (_p2) {
				return A2(
					F2(
						function (x, y) {
							return _elm_lang$core$Native_Utils.eq(x, y);
						}),
					str,
					function (_) {
						return _.match;
					}(_p2));
			},
			A3(_elm_lang$core$Regex$find, _elm_lang$core$Regex$All, rx, str));
	});
var _debois$elm_mdl$Demo_Textfields$rx = '[0-9]*';
var _debois$elm_mdl$Demo_Textfields$rx$ = _elm_lang$core$Regex$regex(_debois$elm_mdl$Demo_Textfields$rx);
var _debois$elm_mdl$Demo_Textfields$pure = function (_p3) {
	return _elm_lang$core$Maybe$Just(
		A3(
			_elm_lang$core$Basics$flip,
			F2(
				function (v0, v1) {
					return {ctor: '_Tuple2', _0: v0, _1: v1};
				}),
			_elm_lang$core$Platform_Cmd$none,
			_p3));
};
var _debois$elm_mdl$Demo_Textfields$update = F2(
	function (action, model) {
		var _p4 = action;
		switch (_p4.ctor) {
			case 'Mdl':
				return _elm_lang$core$Maybe$Just(
					A2(_debois$elm_mdl$Material$update, _p4._0, model));
			case 'Upd0':
				return _debois$elm_mdl$Demo_Textfields$pure(
					_elm_lang$core$Native_Utils.update(
						model,
						{str0: _p4._0}));
			case 'Upd3':
				return _debois$elm_mdl$Demo_Textfields$pure(
					_elm_lang$core$Native_Utils.update(
						model,
						{str3: _p4._0}));
			case 'Upd4':
				return _debois$elm_mdl$Demo_Textfields$pure(
					_elm_lang$core$Native_Utils.update(
						model,
						{str4: _p4._0}));
			case 'Upd6':
				return _debois$elm_mdl$Demo_Textfields$pure(
					_elm_lang$core$Native_Utils.update(
						model,
						{str6: _p4._0}));
			case 'Upd9':
				return _debois$elm_mdl$Demo_Textfields$pure(
					_elm_lang$core$Native_Utils.update(
						model,
						{str9: _p4._0}));
			case 'Slider':
				return _debois$elm_mdl$Demo_Textfields$pure(
					_elm_lang$core$Native_Utils.update(
						model,
						{length: _p4._0}));
			case 'SetFocus5':
				return _debois$elm_mdl$Demo_Textfields$pure(
					_elm_lang$core$Native_Utils.update(
						model,
						{focus5: _p4._0}));
			default:
				var _p5 = _p4._0;
				return _elm_lang$core$Native_Utils.eq(_p5, model.selection) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
					{
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{selection: _p5}),
						_1: _elm_lang$core$Platform_Cmd$none
					});
		}
	});
var _debois$elm_mdl$Demo_Textfields$model = {
	mdl: _debois$elm_mdl$Material$model,
	str0: '',
	str3: '',
	str4: '',
	str6: '',
	length: 5,
	focus5: false,
	str9: 'Try selecting within this text',
	selection: {begin: -1, end: -1}
};
var _debois$elm_mdl$Demo_Textfields$Selection = F2(
	function (a, b) {
		return {begin: a, end: b};
	});
var _debois$elm_mdl$Demo_Textfields$Model = F9(
	function (a, b, c, d, e, f, g, h, i) {
		return {mdl: a, str0: b, str3: c, str4: d, str6: e, length: f, focus5: g, str9: h, selection: i};
	});
var _debois$elm_mdl$Demo_Textfields$SelectionChanged = function (a) {
	return {ctor: 'SelectionChanged', _0: a};
};
var _debois$elm_mdl$Demo_Textfields$selectionDecoder = A2(
	_elm_lang$core$Json_Decode$map,
	_debois$elm_mdl$Demo_Textfields$SelectionChanged,
	A3(
		_elm_lang$core$Json_Decode$object2,
		_debois$elm_mdl$Demo_Textfields$Selection,
		A2(
			_elm_lang$core$Json_Decode$at,
			_elm_lang$core$Native_List.fromArray(
				['target', 'selectionStart']),
			_elm_lang$core$Json_Decode$int),
		A2(
			_elm_lang$core$Json_Decode$at,
			_elm_lang$core$Native_List.fromArray(
				['target', 'selectionEnd']),
			_elm_lang$core$Json_Decode$int)));
var _debois$elm_mdl$Demo_Textfields$Slider = function (a) {
	return {ctor: 'Slider', _0: a};
};
var _debois$elm_mdl$Demo_Textfields$SetFocus5 = function (a) {
	return {ctor: 'SetFocus5', _0: a};
};
var _debois$elm_mdl$Demo_Textfields$Upd9 = function (a) {
	return {ctor: 'Upd9', _0: a};
};
var _debois$elm_mdl$Demo_Textfields$Upd6 = function (a) {
	return {ctor: 'Upd6', _0: a};
};
var _debois$elm_mdl$Demo_Textfields$Upd4 = function (a) {
	return {ctor: 'Upd4', _0: a};
};
var _debois$elm_mdl$Demo_Textfields$Upd3 = function (a) {
	return {ctor: 'Upd3', _0: a};
};
var _debois$elm_mdl$Demo_Textfields$Upd0 = function (a) {
	return {ctor: 'Upd0', _0: a};
};
var _debois$elm_mdl$Demo_Textfields$Mdl = function (a) {
	return {ctor: 'Mdl', _0: a};
};
var _debois$elm_mdl$Demo_Textfields$textfields = function (model) {
	return _elm_lang$core$Native_List.fromArray(
		[
			{
			ctor: '_Tuple3',
			_0: 'Basic textfield',
			_1: A4(
				_debois$elm_mdl$Material_Textfield$render,
				_debois$elm_mdl$Demo_Textfields$Mdl,
				_elm_lang$core$Native_List.fromArray(
					[0]),
				model.mdl,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Textfield$onInput(_debois$elm_mdl$Demo_Textfields$Upd0)
					])),
			_2: '\n        Textfield.render Mdl [0] model.mdl\n          [ Textfield.onInput Upd0 ]\n       '
		},
			{
			ctor: '_Tuple3',
			_0: 'Labelled textfield',
			_1: A4(
				_debois$elm_mdl$Material_Textfield$render,
				_debois$elm_mdl$Demo_Textfields$Mdl,
				_elm_lang$core$Native_List.fromArray(
					[1]),
				model.mdl,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Textfield$label('Labelled')
					])),
			_2: '\n       Textfield.render Mdl [1] model.mdl\n         [ Textfield.label \"Labelled\" ]\n       '
		},
			{
			ctor: '_Tuple3',
			_0: 'Labelled textfield, floating label',
			_1: A4(
				_debois$elm_mdl$Material_Textfield$render,
				_debois$elm_mdl$Demo_Textfields$Mdl,
				_elm_lang$core$Native_List.fromArray(
					[2]),
				model.mdl,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Textfield$label('Floating label'),
						_debois$elm_mdl$Material_Textfield$floatingLabel,
						_debois$elm_mdl$Material_Textfield$text$
					])),
			_2: '\n        Textfield.render Mdl [2] model.mdl\n          [ Textfield.label \"Floating label\"\n          , Textfield.floatingLabel\n          , Textfield.text\'\n          ]\n       '
		},
			{
			ctor: '_Tuple3',
			_0: 'Disabled textfield',
			_1: A4(
				_debois$elm_mdl$Material_Textfield$render,
				_debois$elm_mdl$Demo_Textfields$Mdl,
				_elm_lang$core$Native_List.fromArray(
					[3]),
				model.mdl,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Textfield$label('Disabled'),
						_debois$elm_mdl$Material_Textfield$disabled,
						_debois$elm_mdl$Material_Textfield$value(
						A2(
							_elm_lang$core$Basics_ops['++'],
							model.str0,
							(!_elm_lang$core$Native_Utils.eq(model.str0, '')) ? ' (still disabled, though)' : ''))
					])),
			_2: '\n      Textfield.render Mdl [3] model.mdl\n        [ Textfield.label \"Disabled\"\n        , Textfield.disabled\n        , Textfield.value <|\n            model.str0\n            ++ if model.str0 /= \"\" then\n                \" (still disabled, though)\"\n               else \"\"\n        ]\n       '
		},
			{
			ctor: '_Tuple3',
			_0: 'Textfield with error checking',
			_1: A4(
				_debois$elm_mdl$Material_Textfield$render,
				_debois$elm_mdl$Demo_Textfields$Mdl,
				_elm_lang$core$Native_List.fromArray(
					[4]),
				model.mdl,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Textfield$label('w/error checking'),
						_elm_lang$core$Basics$not(
						A2(_debois$elm_mdl$Demo_Textfields$match, model.str4, _debois$elm_mdl$Demo_Textfields$rx$)) ? _debois$elm_mdl$Material_Textfield$error(
						A2(_elm_lang$core$Basics_ops['++'], 'Doesn\'t match ', _debois$elm_mdl$Demo_Textfields$rx)) : _debois$elm_mdl$Material_Options$nop,
						_debois$elm_mdl$Material_Textfield$onInput(_debois$elm_mdl$Demo_Textfields$Upd4)
					])),
			_2: '\n    Textfield.render Mdl [4] model.mdl\n      [ Textfield.label \"w/error checking\"\n      , if not <| match model.str4 rx\' then\n          Textfield.error <| \"Doesn\'t match \" ++ rx\n        else\n          Options.nop\n      , Textfield.onInput Upd4\n      ]\n       '
		},
			{
			ctor: '_Tuple3',
			_0: 'Textfield for passwords',
			_1: A4(
				_debois$elm_mdl$Material_Textfield$render,
				_debois$elm_mdl$Demo_Textfields$Mdl,
				_elm_lang$core$Native_List.fromArray(
					[5]),
				model.mdl,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Textfield$label('Enter password'),
						_debois$elm_mdl$Material_Textfield$floatingLabel,
						_debois$elm_mdl$Material_Textfield$password
					])),
			_2: '\n      Textfield.render Mdl [5] model.mdl\n        [ Textfield.label \"Enter password\"\n        , Textfield.floatingLabel\n        , Textfield.password\n        ]\n       '
		},
			{
			ctor: '_Tuple3',
			_0: 'Expandable textfield',
			_1: A4(
				_debois$elm_mdl$Material_Textfield$render,
				_debois$elm_mdl$Demo_Textfields$Mdl,
				_elm_lang$core$Native_List.fromArray(
					[11]),
				model.mdl,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Textfield$label('Expandable'),
						_debois$elm_mdl$Material_Textfield$floatingLabel,
						_debois$elm_mdl$Material_Textfield$expandable('id-of-expandable-1'),
						_debois$elm_mdl$Material_Textfield$expandableIcon('search')
					])),
			_2: '\n      Textfield.render Mdl [11] model.mdl\n        [ Textfield.label \"Expandable\"\n        , Textfield.floatingLabel\n        , Textfield.expandable \"id-of-expandable-1\"\n        , Textfield.expandableIcon \"search\"\n        ]\n       '
		},
			{
			ctor: '_Tuple3',
			_0: 'Multi-line textfield',
			_1: A4(
				_debois$elm_mdl$Material_Textfield$render,
				_debois$elm_mdl$Demo_Textfields$Mdl,
				_elm_lang$core$Native_List.fromArray(
					[6]),
				model.mdl,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Textfield$label('Default multiline textfield'),
						_debois$elm_mdl$Material_Textfield$textarea
					])),
			_2: '\n      Textfield.render Mdl [6] model.mdl\n        [ Textfield.label \"Default multiline textfield\"\n        , Textfield.textarea\n        ]\n       '
		},
			{
			ctor: '_Tuple3',
			_0: 'Multi-line textfield, 6 rows',
			_1: A4(
				_debois$elm_mdl$Material_Textfield$render,
				_debois$elm_mdl$Demo_Textfields$Mdl,
				_elm_lang$core$Native_List.fromArray(
					[7]),
				model.mdl,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Textfield$label('Multiline with 6 rows'),
						_debois$elm_mdl$Material_Textfield$floatingLabel,
						_debois$elm_mdl$Material_Textfield$textarea,
						_debois$elm_mdl$Material_Textfield$rows(6)
					])),
			_2: '\n      Textfield.render Mdl [7] model.mdl\n        [ Textfield.label \"Multiline with 6 rows\"\n        , Textfield.floatingLabel\n        , Textfield.textarea\n        , Textfield.rows 6\n        ]\n       '
		},
			{
			ctor: '_Tuple3',
			_0: A2(
				_elm_lang$core$Basics_ops['++'],
				'Multi-line textfield with character limit (focused: ',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(model.focus5),
					')')),
			_1: A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A4(
						_debois$elm_mdl$Material_Textfield$render,
						_debois$elm_mdl$Demo_Textfields$Mdl,
						_elm_lang$core$Native_List.fromArray(
							[8]),
						model.mdl,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Textfield$label(
								A2(
									_elm_lang$core$Basics_ops['++'],
									'Multiline textfield (',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(
											_elm_lang$core$String$length(model.str6)),
										A2(
											_elm_lang$core$Basics_ops['++'],
											' of ',
											A2(
												_elm_lang$core$Basics_ops['++'],
												_elm_lang$core$Basics$toString(
													_elm_lang$core$Basics$truncate(model.length)),
												' char limit)'))))),
								_debois$elm_mdl$Material_Textfield$onInput(_debois$elm_mdl$Demo_Textfields$Upd6),
								_debois$elm_mdl$Material_Textfield$textarea,
								_debois$elm_mdl$Material_Textfield$maxlength(
								_elm_lang$core$Basics$truncate(model.length)),
								_debois$elm_mdl$Material_Textfield$autofocus,
								_debois$elm_mdl$Material_Textfield$floatingLabel,
								_debois$elm_mdl$Material_Textfield$onFocus(
								_debois$elm_mdl$Demo_Textfields$SetFocus5(true)),
								_debois$elm_mdl$Material_Textfield$onBlur(
								_debois$elm_mdl$Demo_Textfields$SetFocus5(false))
							])),
						A3(
						_debois$elm_mdl$Material_Options$styled,
						_elm_lang$html$Html$p,
						_elm_lang$core$Native_List.fromArray(
							[
								A2(_debois$elm_mdl$Material_Options$css, 'width', '80%')
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Material_Options$span,
								_elm_lang$core$Native_List.fromArray(
									[_debois$elm_mdl$Material_Typography$caption]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Drag to change the maxlength')
									])),
								_debois$elm_mdl$Material_Slider$view(
								_elm_lang$core$Native_List.fromArray(
									[
										_debois$elm_mdl$Material_Slider$onChange(_debois$elm_mdl$Demo_Textfields$Slider),
										_debois$elm_mdl$Material_Slider$value(model.length),
										_debois$elm_mdl$Material_Slider$max(100),
										_debois$elm_mdl$Material_Slider$min(1),
										_debois$elm_mdl$Material_Slider$step(1)
									]))
							]))
					])),
			_2: '\n       Textfield.render Mdl [8] model.mdl\n         [ Textfield.label\n             (\"Multiline textfield (\" ++\n                (toString (String.length model.str6))\n                ++ \" of \" ++ (toString (truncate model.length))\n                ++ \" char limit)\")\n         , Textfield.onInput Upd6\n         , Textfield.textarea\n         , Textfield.maxlength (truncate model.length)\n         , Textfield.autofocus\n         , Textfield.floatingLabel\n         ]\n       '
		}
		]);
};
var _debois$elm_mdl$Demo_Textfields$custom = function (model) {
	return _elm_lang$core$Native_List.fromArray(
		[
			{
			ctor: '_Tuple3',
			_0: 'Custom event handling',
			_1: A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A4(
						_debois$elm_mdl$Material_Textfield$render,
						_debois$elm_mdl$Demo_Textfields$Mdl,
						_elm_lang$core$Native_List.fromArray(
							[9]),
						model.mdl,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Textfield$label('Custom event handling'),
								_debois$elm_mdl$Material_Textfield$textarea,
								_debois$elm_mdl$Material_Textfield$onInput(_debois$elm_mdl$Demo_Textfields$Upd9),
								_debois$elm_mdl$Material_Textfield$value(model.str9),
								A2(_debois$elm_mdl$Material_Textfield$on, 'keyup', _debois$elm_mdl$Demo_Textfields$selectionDecoder),
								A2(_debois$elm_mdl$Material_Textfield$on, 'mousemove', _debois$elm_mdl$Demo_Textfields$selectionDecoder),
								A2(_debois$elm_mdl$Material_Textfield$on, 'click', _debois$elm_mdl$Demo_Textfields$selectionDecoder)
							])),
						A3(
						_debois$elm_mdl$Material_Options$styled,
						_elm_lang$html$Html$p,
						_elm_lang$core$Native_List.fromArray(
							[
								A2(_debois$elm_mdl$Material_Options$css, 'width', '300px'),
								A2(_debois$elm_mdl$Material_Options$css, 'word-wrap', 'break-word')
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text(
								A2(
									_elm_lang$core$Basics_ops['++'],
									'Selected text: ',
									A3(_elm_lang$core$String$slice, model.selection.begin, model.selection.end, model.str9)))
							]))
					])),
			_2: '\n      type alias Selection = \n        { begin : Int\n        , end : Int \n        }\n\n\n      type alias Model = \n        { value : String\n        , selection : Selection\n        }\n\n\n      type Msg =\n        ...\n        | SelectionChanged Selection\n        | Input String\n      \n\n      update msg model = \n        case msg of \n          ...\n          | Selection selection -> \n              {- This clause is triggered by the high-frequency mousemove\n              event. When the selection didn\'t change, we make sure to \n              return an unchanged model so that Html.Lazy can kick in and\n              prevent unnecessary re-renders. \n              -}\n              if model.selection == selection then \n                ( model, Cmd.none )\n              else \n                ( { model | selection = selection }, Cmd.none )\n\n          | Input str -> \n              ( { model | value = str }, Cmd.none )\n\n\n      selectionDecoder : Decoder.Decoder Msg\n      selectionDecoder =\n        Decoder.object2 Selection\n          (Decoder.at [\"target\", \"selectionStart\"] Decoder.int)\n          (Decoder.at [\"target\", \"selectionEnd\"] Decoder.int)\n\n\n      view : Model -> Html Msg\n      view model = \n        div []\n          [ Textfield.render Mdl [9] model.mdl\n              [ Textfield.label \"Custom event handling\"\n              , Textfield.textarea\n              , Textfield.onInput Input\n              , Textfield.on \"keyup\" selectionDecoder\n              , Textfield.on \"mousemove\" selectionDecoder\n              , Textfield.on \"click\" selectionDecoder\n              ]\n            , [ text <| \"Selected text: \" ++ \n                  String.slice model.selection.begin model.selection.end model.value\n              ]\n     '
		}
		]);
};
var _debois$elm_mdl$Demo_Textfields$view = function (model) {
	var demo2 = A2(
		_debois$elm_mdl$Material_Grid$grid,
		_elm_lang$core$Native_List.fromArray(
			[]),
		A2(
			_elm_lang$core$List$map,
			_debois$elm_mdl$Demo_Textfields$view1,
			_debois$elm_mdl$Demo_Textfields$custom(model)));
	var demo1 = A2(
		_debois$elm_mdl$Material_Grid$grid,
		_elm_lang$core$Native_List.fromArray(
			[]),
		A2(
			_elm_lang$core$List$map,
			_debois$elm_mdl$Demo_Textfields$view1,
			_debois$elm_mdl$Demo_Textfields$textfields(model)));
	return A6(
		_debois$elm_mdl$Demo_Page$body1$,
		'Textfields',
		_debois$elm_mdl$Demo_Textfields$srcUrl,
		_debois$elm_mdl$Demo_Textfields$intro,
		_debois$elm_mdl$Demo_Textfields$references,
		_elm_lang$core$Native_List.fromArray(
			[demo1]),
		_elm_lang$core$Native_List.fromArray(
			[demo2]));
};

var _elm_lang$core$Native_Bitwise = function() {

return {
	and: F2(function and(a, b) { return a & b; }),
	or: F2(function or(a, b) { return a | b; }),
	xor: F2(function xor(a, b) { return a ^ b; }),
	complement: function complement(a) { return ~a; },
	shiftLeft: F2(function sll(a, offset) { return a << offset; }),
	shiftRightArithmatic: F2(function sra(a, offset) { return a >> offset; }),
	shiftRightLogical: F2(function srl(a, offset) { return a >>> offset; })
};

}();

var _elm_lang$core$Bitwise$shiftRightLogical = _elm_lang$core$Native_Bitwise.shiftRightLogical;
var _elm_lang$core$Bitwise$shiftRight = _elm_lang$core$Native_Bitwise.shiftRightArithmatic;
var _elm_lang$core$Bitwise$shiftLeft = _elm_lang$core$Native_Bitwise.shiftLeft;
var _elm_lang$core$Bitwise$complement = _elm_lang$core$Native_Bitwise.complement;
var _elm_lang$core$Bitwise$xor = _elm_lang$core$Native_Bitwise.xor;
var _elm_lang$core$Bitwise$or = _elm_lang$core$Native_Bitwise.or;
var _elm_lang$core$Bitwise$and = _elm_lang$core$Native_Bitwise.and;

var _debois$elm_mdl$Demo_Toggles$references = _elm_lang$core$Native_List.fromArray(
	[
		_debois$elm_mdl$Demo_Page$package('http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Toggles'),
		_debois$elm_mdl$Demo_Page$mds('https://www.google.com/design/spec/components/selection-controls.html'),
		_debois$elm_mdl$Demo_Page$mdl('http://www.getmdl.io/index.html#toggles-section/checkbox')
	]);
var _debois$elm_mdl$Demo_Toggles$srcUrl = 'https://github.com/debois/elm-mdl/blob/master/demo/Demo/Toggles.elm';
var _debois$elm_mdl$Demo_Toggles$intro = A2(_debois$elm_mdl$Demo_Page$fromMDL, 'http://www.getmdl.io/index.html#toggles-section/checkbox', '\n> The Material Design Lite (MDL) checkbox component is an enhanced version of the\n> standard HTML `<input type=\"checkbox\">` element. A checkbox consists of a small\n> square and, typically, text that clearly communicates a binary condition that\n> will be set or unset when the user clicks or touches it. Checkboxes typically,\n> but not necessarily, appear in groups, and can be selected and deselected\n> individually. The MDL checkbox component allows you to add display and click\n>     effects.\n> \n> Checkboxes are a common feature of most user interfaces, regardless of a site\'s\n> content or function. Their design and use is therefore an important factor in\n> the overall user experience. [...]\n> \n> The enhanced checkbox component has a more vivid visual look than a standard\n> checkbox, and may be initially or programmatically disabled.\n');
var _debois$elm_mdl$Demo_Toggles$setBit = F3(
	function (x, k, n) {
		return x ? A2(
			_elm_lang$core$Bitwise$or,
			A2(_elm_lang$core$Bitwise$shiftLeft, 1, k),
			n) : A2(
			_elm_lang$core$Bitwise$and,
			_elm_lang$core$Bitwise$complement(
				A2(_elm_lang$core$Bitwise$shiftLeft, 1, k)),
			n);
	});
var _debois$elm_mdl$Demo_Toggles$readBit = F2(
	function (k, n) {
		return !_elm_lang$core$Native_Utils.eq(
			0,
			A2(
				_elm_lang$core$Bitwise$and,
				1,
				A2(_elm_lang$core$Bitwise$shiftRight, n, k)));
	});
var _debois$elm_mdl$Demo_Toggles$flipBit = F2(
	function (k, n) {
		return A3(
			_debois$elm_mdl$Demo_Toggles$setBit,
			_elm_lang$core$Basics$not(
				A2(_debois$elm_mdl$Demo_Toggles$readBit, k, n)),
			k,
			n);
	});
var _debois$elm_mdl$Demo_Toggles$row = _elm_lang$core$Native_List.fromArray(
	[
		A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Desktop, 4),
		A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Tablet, 8),
		A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Phone, 4)
	]);
var _debois$elm_mdl$Demo_Toggles$delay = 150;
var _debois$elm_mdl$Demo_Toggles$get = F2(
	function (k, model) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			false,
			A2(_elm_lang$core$Array$get, k, model.toggles));
	});
var _debois$elm_mdl$Demo_Toggles$model = {
	mdl: _debois$elm_mdl$Material$model,
	toggles: _elm_lang$core$Array$fromList(
		_elm_lang$core$Native_List.fromArray(
			[true, false])),
	radios: 2,
	counter: 0,
	counting: false
};
var _debois$elm_mdl$Demo_Toggles$Model = F5(
	function (a, b, c, d, e) {
		return {mdl: a, toggles: b, radios: c, counter: d, counting: e};
	});
var _debois$elm_mdl$Demo_Toggles$AutoCount = {ctor: 'AutoCount'};
var _debois$elm_mdl$Demo_Toggles$update = F2(
	function (action, model) {
		var _p0 = action;
		switch (_p0.ctor) {
			case 'Switch':
				var _p1 = _p0._0;
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							toggles: A3(
								_elm_lang$core$Array$set,
								_p1,
								_elm_lang$core$Basics$not(
									A2(_debois$elm_mdl$Demo_Toggles$get, _p1, model)),
								model.toggles)
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'Radio':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{radios: _p0._0}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'Inc':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{counter: model.counter + 1}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'AutoCount':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{counter: model.counter + 1}),
					_1: model.counting ? A2(_debois$elm_mdl$Material_Helpers$delay, _debois$elm_mdl$Demo_Toggles$delay, _debois$elm_mdl$Demo_Toggles$AutoCount) : _elm_lang$core$Platform_Cmd$none
				};
			case 'Update':
				return {
					ctor: '_Tuple2',
					_0: _p0._0(model),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'ToggleCounting':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							counting: _elm_lang$core$Basics$not(model.counting)
						}),
					_1: _elm_lang$core$Basics$not(model.counting) ? A2(_debois$elm_mdl$Material_Helpers$delay, _debois$elm_mdl$Demo_Toggles$delay, _debois$elm_mdl$Demo_Toggles$AutoCount) : _elm_lang$core$Platform_Cmd$none
				};
			default:
				return A2(_debois$elm_mdl$Material$update, _p0._0, model);
		}
	});
var _debois$elm_mdl$Demo_Toggles$ToggleCounting = {ctor: 'ToggleCounting'};
var _debois$elm_mdl$Demo_Toggles$Update = function (a) {
	return {ctor: 'Update', _0: a};
};
var _debois$elm_mdl$Demo_Toggles$Inc = {ctor: 'Inc'};
var _debois$elm_mdl$Demo_Toggles$Radio = function (a) {
	return {ctor: 'Radio', _0: a};
};
var _debois$elm_mdl$Demo_Toggles$Switch = function (a) {
	return {ctor: 'Switch', _0: a};
};
var _debois$elm_mdl$Demo_Toggles$Mdl = function (a) {
	return {ctor: 'Mdl', _0: a};
};
var _debois$elm_mdl$Demo_Toggles$view = function (model) {
	var demo2 = _elm_lang$core$Native_List.fromArray(
		[
			A2(
			_debois$elm_mdl$Material_Grid$grid,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_Grid$cell,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Desktop, 6),
							A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Tablet, 4),
							A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Phone, 4)
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_Options$span,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Typography$display4,
									A2(_debois$elm_mdl$Material_Options$css, 'margin-right', '4rem')
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text(
									_elm_lang$core$Basics$toString(model.counter))
								]))
						])),
					A2(
					_debois$elm_mdl$Material_Grid$cell,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Desktop, 6),
							A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Tablet, 4),
							A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Phone, 4),
							_debois$elm_mdl$Material_Grid$align(_debois$elm_mdl$Material_Grid$Bottom)
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A5(
							_debois$elm_mdl$Material_Button$render,
							_debois$elm_mdl$Demo_Toggles$Mdl,
							_elm_lang$core$Native_List.fromArray(
								[5]),
							model.mdl,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Button$raised,
									_debois$elm_mdl$Material_Button$colored,
									_debois$elm_mdl$Material_Button$ripple,
									_debois$elm_mdl$Material_Button$onClick(_debois$elm_mdl$Demo_Toggles$Inc),
									A2(_debois$elm_mdl$Material_Options$css, 'margin-bottom', '2rem'),
									A2(_debois$elm_mdl$Material_Options$css, 'width', '196px'),
									A2(_debois$elm_mdl$Material_Options$css, 'display', 'inline-block')
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Increase')
								])),
							A5(
							_debois$elm_mdl$Material_Toggles$switch,
							_debois$elm_mdl$Demo_Toggles$Mdl,
							_elm_lang$core$Native_List.fromArray(
								[4]),
							model.mdl,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Toggles$onClick(_debois$elm_mdl$Demo_Toggles$ToggleCounting),
									_debois$elm_mdl$Material_Toggles$ripple,
									_debois$elm_mdl$Material_Toggles$value(model.counting)
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Auto-increase')
								]))
						])),
					A2(
					_debois$elm_mdl$Material_Grid$cell,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 4),
							A2(_debois$elm_mdl$Material_Options$css, 'display', 'flex'),
							A2(_debois$elm_mdl$Material_Options$css, 'flex-direction', 'row')
						]),
					_elm_lang$core$List$reverse(
						A2(
							_elm_lang$core$List$map,
							function (idx) {
								return A5(
									_debois$elm_mdl$Material_Toggles$checkbox,
									_debois$elm_mdl$Demo_Toggles$Mdl,
									_elm_lang$core$Native_List.fromArray(
										[6, idx]),
									model.mdl,
									_elm_lang$core$Native_List.fromArray(
										[
											_debois$elm_mdl$Material_Toggles$value(
											A2(_debois$elm_mdl$Demo_Toggles$readBit, idx, model.counter)),
											_debois$elm_mdl$Material_Toggles$ripple,
											_debois$elm_mdl$Material_Toggles$onClick(
											_debois$elm_mdl$Demo_Toggles$Update(
												function (m) {
													return _elm_lang$core$Native_Utils.update(
														m,
														{
															counter: A2(_debois$elm_mdl$Demo_Toggles$flipBit, idx, model.counter)
														});
												})),
											A2(_debois$elm_mdl$Material_Options$css, 'display', 'inline-block')
										]),
									_elm_lang$core$Native_List.fromArray(
										[]));
							},
							_elm_lang$core$Native_List.range(0, 10))))
				]))
		]);
	var demo1 = _elm_lang$core$Native_List.fromArray(
		[
			A2(
			_debois$elm_mdl$Material_Grid$grid,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_Grid$cell,
					_debois$elm_mdl$Demo_Toggles$row,
					_elm_lang$core$Native_List.fromArray(
						[
							A5(
							_debois$elm_mdl$Material_Toggles$switch,
							_debois$elm_mdl$Demo_Toggles$Mdl,
							_elm_lang$core$Native_List.fromArray(
								[0]),
							model.mdl,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Toggles$onClick(
									_debois$elm_mdl$Demo_Toggles$Switch(0)),
									_debois$elm_mdl$Material_Toggles$ripple,
									_debois$elm_mdl$Material_Toggles$value(
									A2(_debois$elm_mdl$Demo_Toggles$get, 0, model))
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Switch')
								])),
							A2(
							_debois$elm_mdl$Demo_Code$code,
							_elm_lang$core$Native_List.fromArray(
								[
									A2(_debois$elm_mdl$Material_Options$css, 'margin', '16px 0')
								]),
							A2(
								_elm_lang$core$Basics_ops['++'],
								'Toggles.switch Mdl [0] model.mdl\n  [ Toggles.onClick MyToggleMsg\n  , Toggles.ripple\n  , Toggles.value ',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(
										A2(_debois$elm_mdl$Demo_Toggles$get, 0, model)),
									'\n  ]\n  [ text \"Switch\" ]')))
						])),
					A2(
					_debois$elm_mdl$Material_Grid$cell,
					_debois$elm_mdl$Demo_Toggles$row,
					_elm_lang$core$Native_List.fromArray(
						[
							A5(
							_debois$elm_mdl$Material_Toggles$checkbox,
							_debois$elm_mdl$Demo_Toggles$Mdl,
							_elm_lang$core$Native_List.fromArray(
								[1]),
							model.mdl,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Toggles$onClick(
									_debois$elm_mdl$Demo_Toggles$Switch(1)),
									_debois$elm_mdl$Material_Toggles$ripple,
									_debois$elm_mdl$Material_Toggles$value(
									A2(_debois$elm_mdl$Demo_Toggles$get, 1, model))
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Checkbox')
								])),
							A2(
							_debois$elm_mdl$Demo_Code$code,
							_elm_lang$core$Native_List.fromArray(
								[
									A2(_debois$elm_mdl$Material_Options$css, 'margin', '16px 0')
								]),
							A2(
								_elm_lang$core$Basics_ops['++'],
								'Toggles.checkbox Mdl [0] model.mdl\n  [ Toggles.onClick MyToggleMsg\n  , Toggles.ripple\n  , Toggles.value ',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(
										A2(_debois$elm_mdl$Demo_Toggles$get, 1, model)),
									'\n  ]\n  [ text \"Checkbox\" ]')))
						])),
					A2(
					_debois$elm_mdl$Material_Grid$cell,
					_debois$elm_mdl$Demo_Toggles$row,
					_elm_lang$core$Native_List.fromArray(
						[
							A5(
							_debois$elm_mdl$Material_Toggles$radio,
							_debois$elm_mdl$Demo_Toggles$Mdl,
							_elm_lang$core$Native_List.fromArray(
								[2]),
							model.mdl,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Toggles$value(
									_elm_lang$core$Native_Utils.eq(2, model.radios)),
									_debois$elm_mdl$Material_Toggles$group('MyRadioGroup'),
									_debois$elm_mdl$Material_Toggles$ripple,
									_debois$elm_mdl$Material_Toggles$onClick(
									_debois$elm_mdl$Demo_Toggles$Radio(2))
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Emacs')
								])),
							A5(
							_debois$elm_mdl$Material_Toggles$radio,
							_debois$elm_mdl$Demo_Toggles$Mdl,
							_elm_lang$core$Native_List.fromArray(
								[3]),
							model.mdl,
							_elm_lang$core$Native_List.fromArray(
								[
									A2(_debois$elm_mdl$Material_Options$css, 'margin-left', '2rem'),
									_debois$elm_mdl$Material_Toggles$value(
									_elm_lang$core$Native_Utils.eq(3, model.radios)),
									_debois$elm_mdl$Material_Toggles$group('MyRadioGroup'),
									_debois$elm_mdl$Material_Toggles$ripple,
									_debois$elm_mdl$Material_Toggles$onClick(
									_debois$elm_mdl$Demo_Toggles$Radio(3))
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Vim')
								])),
							A2(
							_debois$elm_mdl$Demo_Code$code,
							_elm_lang$core$Native_List.fromArray(
								[
									A2(_debois$elm_mdl$Material_Options$css, 'margin', '16px 0')
								]),
							A2(
								_elm_lang$core$Basics_ops['++'],
								'\n                  div \n                    [] \n                    [ Toggles.radio Mdl [0] model.mdl \n                        [ Toggles.value ',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(
										_elm_lang$core$Native_Utils.eq(2, model.radios)),
									A2(
										_elm_lang$core$Basics_ops['++'],
										'\n                        , Toggles.group \"MyRadioGroup\"\n                        , Toggles.ripple\n                        , Toggles.onClick MyRadioMsg1\n                        ]\n                        [ text \"Emacs\" ]\n                    , Toggles.radio Mdl [1] model.mdl\n                        [ Toggles.value ',
										A2(
											_elm_lang$core$Basics_ops['++'],
											_elm_lang$core$Basics$toString(
												_elm_lang$core$Native_Utils.eq(3, model.radios)),
											'\n                        , Toggles.group \"MyRadioGroup\"\n                        , Toggles.ripple\n                        , Toggles.onClick MyRadioMsg2\n                        ]\n                        [ text \"Vim\" ]\n                    ] ')))))
						]))
				]))
		]);
	return A6(_debois$elm_mdl$Demo_Page$body1$, 'Toggles', _debois$elm_mdl$Demo_Toggles$srcUrl, _debois$elm_mdl$Demo_Toggles$intro, _debois$elm_mdl$Demo_Toggles$references, demo1, demo2);
};

var _debois$elm_mdl$Demo_Tooltip$references = _elm_lang$core$Native_List.fromArray(
	[
		_debois$elm_mdl$Demo_Page$package('http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Tooltip'),
		_debois$elm_mdl$Demo_Page$mds('https://material.google.com/components/tooltips.html'),
		_debois$elm_mdl$Demo_Page$mdl('https://www.getmdl.io/components/index.html#tooltips-section')
	]);
var _debois$elm_mdl$Demo_Tooltip$srcUrl = 'https://github.com/debois/elm-mdl/blob/master/demo/Demo/Tooltip.elm';
var _debois$elm_mdl$Demo_Tooltip$intro = A2(_debois$elm_mdl$Demo_Page$fromMDL, 'https://getmdl.io/components/index.html#tooltips-section', '\n> The Material Design Lite (MDL) tooltip component is an enhanced version of the\n> standard HTML tooltip as produced by the `title` attribute. A tooltip consists\n> of text and/or an image that clearly communicates additional information about\n> an element when the user hovers over or, in a touch-based UI, touches the\n> element. The MDL tooltip component is pre-styled (colors, fonts, and other\n> settings are contained in material.min.css) to provide a vivid, attractive\n> visual element that displays related but typically non-essential content,\n> e.g., a definition, clarification, or brief instruction.\n>\n> Tooltips are a ubiquitous feature of most user interfaces, regardless of a\n> site\'s content or function. Their design and use is an important factor in the\n> overall user experience. See the tooltip component\'s Material Design\n> specifications page for details.\n');
var _debois$elm_mdl$Demo_Tooltip$demoTooltip = F3(
	function (elements, description, code) {
		return A2(
			_debois$elm_mdl$Material_Options$div,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_debois$elm_mdl$Material_Options$css, 'width', '45%')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$html$Html$p,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text(description)
						])),
					A2(
					_debois$elm_mdl$Material_Options$div,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Options$css, 'display', 'flex'),
							A2(_debois$elm_mdl$Material_Options$css, 'align-items', 'center'),
							A2(_debois$elm_mdl$Material_Options$css, 'justify-content', 'center'),
							A2(_debois$elm_mdl$Material_Options$css, 'height', '5rem'),
							_debois$elm_mdl$Material_Color$background(_debois$elm_mdl$Demo_Page$background)
						]),
					elements),
					A2(
					_debois$elm_mdl$Demo_Code$code,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Options$css, 'margin', '24px 0')
						]),
					code)
				]));
	});
var _debois$elm_mdl$Demo_Tooltip$update = F2(
	function (action, model) {
		var _p0 = action;
		switch (_p0.ctor) {
			case 'NoOp':
				return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
			case 'TooltipMsg':
				var updated = _elm_lang$core$Basics$fst(
					A2(_debois$elm_mdl$Material_Tooltip$update, _p0._0, model.tooltip));
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{tooltip: updated}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			default:
				return A2(_debois$elm_mdl$Material$update, _p0._0, model);
		}
	});
var _debois$elm_mdl$Demo_Tooltip$model = {mdl: _debois$elm_mdl$Material$model, tooltip: _debois$elm_mdl$Material_Tooltip$defaultModel};
var _debois$elm_mdl$Demo_Tooltip$Model = F2(
	function (a, b) {
		return {mdl: a, tooltip: b};
	});
var _debois$elm_mdl$Demo_Tooltip$Mdl = function (a) {
	return {ctor: 'Mdl', _0: a};
};
var _debois$elm_mdl$Demo_Tooltip$TooltipMsg = function (a) {
	return {ctor: 'TooltipMsg', _0: a};
};
var _debois$elm_mdl$Demo_Tooltip$view = function (model) {
	return A5(
		_debois$elm_mdl$Demo_Page$body2,
		'Tooltips',
		_debois$elm_mdl$Demo_Tooltip$srcUrl,
		_debois$elm_mdl$Demo_Tooltip$intro,
		_debois$elm_mdl$Demo_Tooltip$references,
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$p,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('Example use:')
					])),
				A2(
				_debois$elm_mdl$Material_Options$div,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Options$css, 'display', 'flex'),
						A2(_debois$elm_mdl$Material_Options$css, 'flex-direction', 'column'),
						A2(_debois$elm_mdl$Material_Options$css, 'flex-wrap', 'wrap'),
						A2(_debois$elm_mdl$Material_Options$css, 'align-items', 'center'),
						A2(_debois$elm_mdl$Material_Options$css, 'justify-content', 'center')
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A3(
						_debois$elm_mdl$Demo_Tooltip$demoTooltip,
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Material_Icon$view,
								'add',
								_elm_lang$core$Native_List.fromArray(
									[
										A2(
										_debois$elm_mdl$Material_Tooltip$attach,
										_debois$elm_mdl$Demo_Tooltip$Mdl,
										_elm_lang$core$Native_List.fromArray(
											[0]))
									])),
								A5(
								_debois$elm_mdl$Material_Tooltip$render,
								_debois$elm_mdl$Demo_Tooltip$Mdl,
								_elm_lang$core$Native_List.fromArray(
									[0]),
								model.mdl,
								_elm_lang$core$Native_List.fromArray(
									[]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('This is an add icon')
									]))
							]),
						'Hover over the icon below to see the default tooltip.',
						'\n        [ Icon.view \"add\" \n            [ Tooltip.attach Mdl [0] ]\n        , Tooltip.render Mdl [0] model.mdl \n            [] \n            [ text \"This is an add icon\" ]\n        ]\n        '),
						A3(
						_debois$elm_mdl$Demo_Tooltip$demoTooltip,
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_elm_lang$html$Html$span,
								_elm_lang$core$Native_List.fromArray(
									[]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('HTML is related to ')
									])),
								A3(
								_debois$elm_mdl$Material_Options$styled,
								_elm_lang$html$Html$span,
								_elm_lang$core$Native_List.fromArray(
									[
										A2(
										_debois$elm_mdl$Material_Tooltip$attach,
										_debois$elm_mdl$Demo_Tooltip$Mdl,
										_elm_lang$core$Native_List.fromArray(
											[1]))
									]),
								_elm_lang$core$Native_List.fromArray(
									[
										A2(
										_elm_lang$html$Html$i,
										_elm_lang$core$Native_List.fromArray(
											[]),
										_elm_lang$core$Native_List.fromArray(
											[
												_elm_lang$html$Html$text('XML')
											]))
									])),
								A5(
								_debois$elm_mdl$Material_Tooltip$render,
								_debois$elm_mdl$Demo_Tooltip$Mdl,
								_elm_lang$core$Native_List.fromArray(
									[1]),
								model.mdl,
								_elm_lang$core$Native_List.fromArray(
									[_debois$elm_mdl$Material_Tooltip$left]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('XML is an acronym for eXtensible Markup Language')
									]))
							]),
						'Hover over \"XML\" below to see a left-positioned tooltip',
						'\n        [ span [] [ text \"HTML is related to \" ]\n        , Options.styled span \n            [ Tooltip.attach Mdl [1] ]\n            [ i [] [text \"XML\"] ]\n        , Tooltip.render Mdl [1] model.mdl\n            [ Tooltip.left ]\n            [ text \"XML: eXtensible Markup Language\" ]\n        ]\n        '),
						A3(
						_debois$elm_mdl$Demo_Tooltip$demoTooltip,
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Material_Icon$view,
								'share',
								_elm_lang$core$Native_List.fromArray(
									[
										A2(
										_debois$elm_mdl$Material_Tooltip$attach,
										_debois$elm_mdl$Demo_Tooltip$Mdl,
										_elm_lang$core$Native_List.fromArray(
											[2]))
									])),
								A5(
								_debois$elm_mdl$Material_Tooltip$render,
								_debois$elm_mdl$Demo_Tooltip$Mdl,
								_elm_lang$core$Native_List.fromArray(
									[2]),
								model.mdl,
								_elm_lang$core$Native_List.fromArray(
									[_debois$elm_mdl$Material_Tooltip$large, _debois$elm_mdl$Material_Tooltip$right]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('This is a share icon')
									]))
							]),
						'Hover over the share icon below to see a large, right-positioned tooltip.',
						'\n        [ Icon.view \"share\" \n            [ Tooltip.attach Mdl [2] ]\n        , Tooltip.render Mdl [2] model.mdl\n            [ Tooltip.large\n            , Tooltip.right\n            ]\n            [text \"This is a share icon\"]\n        ]\n        '),
						A3(
						_debois$elm_mdl$Demo_Tooltip$demoTooltip,
						_elm_lang$core$Native_List.fromArray(
							[
								A5(
								_debois$elm_mdl$Material_Button$render,
								_debois$elm_mdl$Demo_Tooltip$Mdl,
								_elm_lang$core$Native_List.fromArray(
									[0]),
								model.mdl,
								_elm_lang$core$Native_List.fromArray(
									[
										_debois$elm_mdl$Material_Button$raised,
										A2(
										_debois$elm_mdl$Material_Tooltip$attach,
										_debois$elm_mdl$Demo_Tooltip$Mdl,
										_elm_lang$core$Native_List.fromArray(
											[3]))
									]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Click me!')
									])),
								A5(
								_debois$elm_mdl$Material_Tooltip$render,
								_debois$elm_mdl$Demo_Tooltip$Mdl,
								_elm_lang$core$Native_List.fromArray(
									[3]),
								model.mdl,
								_elm_lang$core$Native_List.fromArray(
									[_debois$elm_mdl$Material_Tooltip$top, _debois$elm_mdl$Material_Tooltip$large]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Tooltips also work with material components')
									]))
							]),
						'Hover over the button to see a large, above-positioned tooltip.',
						'\n      [ Button.render Mdl [0] model.mdl\n          [ Button.raised\n          , Tooltip.attach Mdl [3]\n          ]\n          [ text \"Click me!\"]\n      , Tooltip.render Mdl [3] model.mdl\n          [ Tooltip.top\n          , Tooltip.large\n          ]\n          [ text \"Tooltips also work with material components\" ]\n      ]\n      '),
						A3(
						_debois$elm_mdl$Demo_Tooltip$demoTooltip,
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_elm_lang$html$Html$span,
								_elm_lang$core$Native_List.fromArray(
									[
										_debois$elm_mdl$Material_Tooltip$onEnter(_debois$elm_mdl$Demo_Tooltip$TooltipMsg),
										_debois$elm_mdl$Material_Tooltip$onLeave(_debois$elm_mdl$Demo_Tooltip$TooltipMsg)
									]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Parts-independent tooltip')
									])),
								A4(
								_debois$elm_mdl$Material_Tooltip$view,
								_debois$elm_mdl$Demo_Tooltip$TooltipMsg,
								model.tooltip,
								_elm_lang$core$Native_List.fromArray(
									[_debois$elm_mdl$Material_Tooltip$large]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('No parts!')
									]))
							]),
						'Hover to see a tooltip using built with the plain-TEA API.',
						'\n        [ span \n            [ Tooltip.onEnter TooltipMsg\n            , Tooltip.onLeave TooltipMsg\n            ]\n            [ text \"Parts-independent tooltip\" ] \n            ] \n        , Tooltip.view TooltipMsg model.tooltip\n            [ Tooltip.large ]\n            [ text \"No parts!\" ]\n        ]\n\n        -- TooltipMsg must be dispatched in update.\n        '),
						A3(
						_debois$elm_mdl$Demo_Tooltip$demoTooltip,
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Material_Icon$view,
								'face',
								_elm_lang$core$Native_List.fromArray(
									[
										A2(
										_debois$elm_mdl$Material_Tooltip$attach,
										_debois$elm_mdl$Demo_Tooltip$Mdl,
										_elm_lang$core$Native_List.fromArray(
											[4]))
									])),
								A5(
								_debois$elm_mdl$Material_Tooltip$render,
								_debois$elm_mdl$Demo_Tooltip$Mdl,
								_elm_lang$core$Native_List.fromArray(
									[4]),
								model.mdl,
								_elm_lang$core$Native_List.fromArray(
									[
										_debois$elm_mdl$Material_Tooltip$large,
										_debois$elm_mdl$Material_Tooltip$top,
										_debois$elm_mdl$Material_Tooltip$container(_elm_lang$html$Html$span)
									]),
								_elm_lang$core$Native_List.fromArray(
									[
										A2(
										_elm_lang$html$Html$img,
										_elm_lang$core$Native_List.fromArray(
											[
												_elm_lang$html$Html_Attributes$src('assets/images/elm.png'),
												_elm_lang$html$Html_Attributes$width(24),
												_elm_lang$html$Html_Attributes$height(24)
											]),
										_elm_lang$core$Native_List.fromArray(
											[])),
										_elm_lang$html$Html$text(' Elm')
									]))
							]),
						'Hover to see a with both image and text.',
						'\n        [ Icon.view \"face\"\n            [ Tooltip.attach Mdl [4] ]\n        , Tooltip.render Mdl [4] model.mdl\n            [ Tooltip.large\n            , Tooltip.top\n            , Tooltip.container Html.span \n            ]\n              [ img [src \"assets/elm.png\", width 24, height 24] []\n              , text \" Elm\"\n              ]\n        ]\n        ')
					]))
			]));
};
var _debois$elm_mdl$Demo_Tooltip$NoOp = {ctor: 'NoOp'};

var _debois$elm_mdl$Demo_Typography$references = _elm_lang$core$Native_List.fromArray(
	[
		_debois$elm_mdl$Demo_Page$package('http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Typography'),
		_debois$elm_mdl$Demo_Page$mds('https://material.google.com/style/typography.html'),
		_debois$elm_mdl$Demo_Page$mdl('https://github.com/google/material-design-lite/tree/mdl-1.x/src/typography#introduction')
	]);
var _debois$elm_mdl$Demo_Typography$srcUrl = 'https://github.com/debois/elm-mdl/blob/master/demo/Demo/Typography.elm';
var _debois$elm_mdl$Demo_Typography$intro = A2(_debois$elm_mdl$Demo_Page$fromMDL, 'https://github.com/google/material-design-lite/tree/mdl-1.x/src/typography#introduction', '\n> The Material Design Lite (MDL) typography component is a comprehensive approach\n> to standardizing the use of typefaces in applications and page displays. MDL\n> typography elements are intended to replace the myriad fonts used by developers\n> (which vary significantly in appearance) and provide a robust, uniform library\n> of text styles from which developers can choose.\n>\n> The \"Roboto\" typeface is the standard for MDL display; it can easily be\n> integrated into a web page using the CSS3 @font-face rule. However, Roboto is\n> most simply accessed and included using a single standard HTML <link> element,\n> which can be obtained at this Google fonts page.\n>\n> Because of the many possible variations in font display characteristics in HTML\n> and CSS, MDL typography aims to provide simple and intuitive styles that use the\n> Roboto font and produce visually attractive and internally consistent text\n> results. See the typography component\'s [Material Design specifications](https://material.google.com/style/typography.html) page for\n> details.\n');
var _debois$elm_mdl$Demo_Typography$demo2 = _elm_lang$core$Native_List.fromArray(
	[
		{
		ctor: '_Tuple2',
		_0: A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[_debois$elm_mdl$Material_Typography$left]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Left align')
				])),
		_1: '\n       Options.styled p\n         [ Typo.left ]\n         [ text \"Left align\" ]\n       '
	},
		{
		ctor: '_Tuple2',
		_0: A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[_debois$elm_mdl$Material_Typography$center]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Center align')
				])),
		_1: '\n       Options.styled p\n         [ Typo.center ]\n         [ text \"Center align\" ]\n       '
	},
		{
		ctor: '_Tuple2',
		_0: A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[_debois$elm_mdl$Material_Typography$right]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Right align')
				])),
		_1: '\n       Options.styled p\n         [ Typo.right ]\n         [ text \"Right align\" ]\n       '
	},
		{
		ctor: '_Tuple2',
		_0: A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[_debois$elm_mdl$Material_Typography$justify]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Justified')
				])),
		_1: '\n       Options.styled p\n         [ Typo.justify ]\n         [ text \"Justified\" ]\n       '
	},
		{
		ctor: '_Tuple2',
		_0: A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[_debois$elm_mdl$Material_Typography$capitalize]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('capitalized')
				])),
		_1: '\n       Options.styled p\n         [ Typo.capitalize ]\n         [ text \"capitalized\" ]\n       '
	},
		{
		ctor: '_Tuple2',
		_0: A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[_debois$elm_mdl$Material_Typography$lowercase]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('LOWERCASE')
				])),
		_1: '\n       Options.styled p\n         [ Typo.lowercase ]\n         [ text \"LOWERCASE\" ]\n       '
	},
		{
		ctor: '_Tuple2',
		_0: A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[_debois$elm_mdl$Material_Typography$uppercase]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('uppercase')
				])),
		_1: '\n       Options.styled p\n         [ Typo.uppercase ]\n         [ text \"uppercase\" ]\n       '
	}
	]);
var _debois$elm_mdl$Demo_Typography$demo1 = _elm_lang$core$Native_List.fromArray(
	[
		{
		ctor: '_Tuple2',
		_0: A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[_debois$elm_mdl$Material_Typography$display4]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Light 112px')
				])),
		_1: '\n       Options.styled p\n         [ Typo.display4 ]\n         [ text \"Light 112px\" ]\n       '
	},
		{
		ctor: '_Tuple2',
		_0: A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[_debois$elm_mdl$Material_Typography$display3]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Regular 56px')
				])),
		_1: '\n      Options.styled p\n        [ Typo.display3 ]\n        [ text \"Regular 56px\" ]\n      '
	},
		{
		ctor: '_Tuple2',
		_0: A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[_debois$elm_mdl$Material_Typography$display2]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Regular 45px')
				])),
		_1: '\n      Options.styled p\n        [ Typo.display2 ]\n        [ text \"Regular 45px\" ]\n      '
	},
		{
		ctor: '_Tuple2',
		_0: A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[_debois$elm_mdl$Material_Typography$display1]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Regular 34px')
				])),
		_1: '\n      Options.styled p\n        [ Typo.display1 ]\n        [ text \"Regular 34px\" ]\n      '
	},
		{
		ctor: '_Tuple2',
		_0: A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[_debois$elm_mdl$Material_Typography$headline]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Regular 24px')
				])),
		_1: '\n       Options.styled p\n         [ Typo.headline ]\n         [ text \"Regular 24px\" ]\n       '
	},
		{
		ctor: '_Tuple2',
		_0: A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[_debois$elm_mdl$Material_Typography$title]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Medium 20px')
				])),
		_1: '\n      Options.styled p\n        [ Typo.title ]\n        [ text \"Medium 20px\" ]\n      '
	},
		{
		ctor: '_Tuple2',
		_0: A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[_debois$elm_mdl$Material_Typography$subhead]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Regular 16px (Device), Regular 15px (Desktop)')
				])),
		_1: '\n       Options.styled p\n         [ Typo.subhead ]\n         [ text \"Regular 16px (Device), Regular 15px (Desktop)\" ]\n       '
	},
		{
		ctor: '_Tuple2',
		_0: A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[_debois$elm_mdl$Material_Typography$body2]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Medium 14px (Device), Medium 13px (Desktop)')
				])),
		_1: '\n        Options.styled p\n          [ Typo.body2 ]\n          [ text \"Medium 14px (Device), Medium 13px (Desktop)\" ]\n        '
	},
		{
		ctor: '_Tuple2',
		_0: A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[_debois$elm_mdl$Material_Typography$body1]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Regular 14px (Device), Regular 13px (Desktop)')
				])),
		_1: '\n        Options.styled p\n          [ Typo.body1 ]\n          [ text \"Regular 14px (Device), Regular 13px (Desktop)\" ]\n        '
	},
		{
		ctor: '_Tuple2',
		_0: A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[_debois$elm_mdl$Material_Typography$caption]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Regular 12px')
				])),
		_1: '\n        Options.styled p\n          [ Typo.caption ]\n          [ text \"Regular 12px\" ]\n        '
	},
		{
		ctor: '_Tuple2',
		_0: A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[_debois$elm_mdl$Material_Typography$button]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Medium (All Caps) 14px')
				])),
		_1: '\n        Options.styled p\n          [ Typo.button ]\n          [ text \"Medium (All Caps) 14px\" ]\n        '
	},
		{
		ctor: '_Tuple2',
		_0: A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[_debois$elm_mdl$Material_Typography$menu]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Medium 14px (Device), Medium 13px (Desktop)')
				])),
		_1: '\n        Options.styled p\n          [ Typo.menu ]\n          [ text \"Medium 14px (Device), Medium 13px (Desktop)\" ]\n        '
	}
	]);
var _debois$elm_mdl$Demo_Typography$view = function (model) {
	var cell = function (x) {
		return A2(
			_debois$elm_mdl$Material_Grid$cell,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Desktop, 6),
					A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Tablet, 8),
					A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$Phone, 4),
					_debois$elm_mdl$Material_Grid$align(_debois$elm_mdl$Material_Grid$Middle)
				]),
			_elm_lang$core$Native_List.fromArray(
				[x]));
	};
	var demo = _elm_lang$core$List$concatMap(
		function (_p0) {
			var _p1 = _p0;
			return _elm_lang$core$Native_List.fromArray(
				[
					cell(_p1._0),
					cell(
					A2(
						_debois$elm_mdl$Demo_Code$code,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_p1._1))
				]);
		});
	var head = A2(
		_debois$elm_mdl$Material_Grid$cell,
		_elm_lang$core$Native_List.fromArray(
			[
				A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 12)
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$p,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('Imports')
					])),
				A2(
				_debois$elm_mdl$Demo_Code$code,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Options$css, 'margin', '24px 0')
					]),
				'\n                     import Material.Typography as Typo\n                     import Material.Options as Options\n                     import Html exposing (p)\n                     '),
				A2(
				_elm_lang$html$Html$p,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('Example use')
					]))
			]));
	return A6(
		_debois$elm_mdl$Demo_Page$body1$,
		'Typography',
		_debois$elm_mdl$Demo_Typography$srcUrl,
		_debois$elm_mdl$Demo_Typography$intro,
		_debois$elm_mdl$Demo_Typography$references,
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_Grid$grid,
				_elm_lang$core$Native_List.fromArray(
					[]),
				A2(
					_elm_lang$core$List_ops['::'],
					head,
					demo(_debois$elm_mdl$Demo_Typography$demo1)))
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_Grid$grid,
				_elm_lang$core$Native_List.fromArray(
					[]),
				demo(_debois$elm_mdl$Demo_Typography$demo2))
			]));
};
var _debois$elm_mdl$Demo_Typography$update = F2(
	function (action, model) {
		var _p2 = action;
		if (_p2.ctor === 'TypographyMsg') {
			return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
		} else {
			return A2(_debois$elm_mdl$Material$update, _p2._0, model);
		}
	});
var _debois$elm_mdl$Demo_Typography$model = {mdl: _debois$elm_mdl$Material$model};
var _debois$elm_mdl$Demo_Typography$Model = function (a) {
	return {mdl: a};
};
var _debois$elm_mdl$Demo_Typography$Mdl = function (a) {
	return {ctor: 'Mdl', _0: a};
};
var _debois$elm_mdl$Demo_Typography$TypographyMsg = {ctor: 'TypographyMsg'};

var _elm_lang$html$Html_Lazy$lazy3 = _elm_lang$virtual_dom$VirtualDom$lazy3;
var _elm_lang$html$Html_Lazy$lazy2 = _elm_lang$virtual_dom$VirtualDom$lazy2;
var _elm_lang$html$Html_Lazy$lazy = _elm_lang$virtual_dom$VirtualDom$lazy;

var _elm_lang$navigation$Native_Navigation = function() {

function go(n)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		if (n !== 0)
		{
			history.go(n);
		}
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function pushState(url)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		history.pushState({}, '', url);
		callback(_elm_lang$core$Native_Scheduler.succeed(getLocation()));
	});
}

function replaceState(url)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		history.replaceState({}, '', url);
		callback(_elm_lang$core$Native_Scheduler.succeed(getLocation()));
	});
}

function getLocation()
{
	var location = document.location;

	return {
		href: location.href,
		host: location.host,
		hostname: location.hostname,
		protocol: location.protocol,
		origin: location.origin,
		port_: location.port,
		pathname: location.pathname,
		search: location.search,
		hash: location.hash,
		username: location.username,
		password: location.password
	};
}


return {
	go: go,
	pushState: pushState,
	replaceState: replaceState,
	getLocation: getLocation
};

}();

var _elm_lang$navigation$Navigation$replaceState = _elm_lang$navigation$Native_Navigation.replaceState;
var _elm_lang$navigation$Navigation$pushState = _elm_lang$navigation$Native_Navigation.pushState;
var _elm_lang$navigation$Navigation$go = _elm_lang$navigation$Native_Navigation.go;
var _elm_lang$navigation$Navigation$spawnPopState = function (router) {
	return _elm_lang$core$Process$spawn(
		A3(
			_elm_lang$dom$Dom_LowLevel$onWindow,
			'popstate',
			_elm_lang$core$Json_Decode$value,
			function (_p0) {
				return A2(
					_elm_lang$core$Platform$sendToSelf,
					router,
					_elm_lang$navigation$Native_Navigation.getLocation(
						{ctor: '_Tuple0'}));
			}));
};
var _elm_lang$navigation$Navigation_ops = _elm_lang$navigation$Navigation_ops || {};
_elm_lang$navigation$Navigation_ops['&>'] = F2(
	function (task1, task2) {
		return A2(
			_elm_lang$core$Task$andThen,
			task1,
			function (_p1) {
				return task2;
			});
	});
var _elm_lang$navigation$Navigation$notify = F3(
	function (router, subs, location) {
		var send = function (_p2) {
			var _p3 = _p2;
			return A2(
				_elm_lang$core$Platform$sendToApp,
				router,
				_p3._0(location));
		};
		return A2(
			_elm_lang$navigation$Navigation_ops['&>'],
			_elm_lang$core$Task$sequence(
				A2(_elm_lang$core$List$map, send, subs)),
			_elm_lang$core$Task$succeed(
				{ctor: '_Tuple0'}));
	});
var _elm_lang$navigation$Navigation$onSelfMsg = F3(
	function (router, location, state) {
		return A2(
			_elm_lang$navigation$Navigation_ops['&>'],
			A3(_elm_lang$navigation$Navigation$notify, router, state.subs, location),
			_elm_lang$core$Task$succeed(state));
	});
var _elm_lang$navigation$Navigation$cmdHelp = F3(
	function (router, subs, cmd) {
		var _p4 = cmd;
		switch (_p4.ctor) {
			case 'Jump':
				return _elm_lang$navigation$Navigation$go(_p4._0);
			case 'New':
				return A2(
					_elm_lang$core$Task$andThen,
					_elm_lang$navigation$Navigation$pushState(_p4._0),
					A2(_elm_lang$navigation$Navigation$notify, router, subs));
			default:
				return A2(
					_elm_lang$core$Task$andThen,
					_elm_lang$navigation$Navigation$replaceState(_p4._0),
					A2(_elm_lang$navigation$Navigation$notify, router, subs));
		}
	});
var _elm_lang$navigation$Navigation$updateHelp = F2(
	function (func, _p5) {
		var _p6 = _p5;
		return {
			ctor: '_Tuple2',
			_0: _p6._0,
			_1: A2(_elm_lang$core$Platform_Cmd$map, func, _p6._1)
		};
	});
var _elm_lang$navigation$Navigation$subscription = _elm_lang$core$Native_Platform.leaf('Navigation');
var _elm_lang$navigation$Navigation$command = _elm_lang$core$Native_Platform.leaf('Navigation');
var _elm_lang$navigation$Navigation$Location = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return {href: a, host: b, hostname: c, protocol: d, origin: e, port_: f, pathname: g, search: h, hash: i, username: j, password: k};
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
var _elm_lang$navigation$Navigation$State = F2(
	function (a, b) {
		return {subs: a, process: b};
	});
var _elm_lang$navigation$Navigation$init = _elm_lang$core$Task$succeed(
	A2(
		_elm_lang$navigation$Navigation$State,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Maybe$Nothing));
var _elm_lang$navigation$Navigation$onEffects = F4(
	function (router, cmds, subs, _p7) {
		var _p8 = _p7;
		var _p10 = _p8.process;
		var stepState = function () {
			var _p9 = {ctor: '_Tuple2', _0: subs, _1: _p10};
			_v4_2:
			do {
				if (_p9._0.ctor === '[]') {
					if (_p9._1.ctor === 'Just') {
						return A2(
							_elm_lang$navigation$Navigation_ops['&>'],
							_elm_lang$core$Process$kill(_p9._1._0),
							_elm_lang$core$Task$succeed(
								A2(_elm_lang$navigation$Navigation$State, subs, _elm_lang$core$Maybe$Nothing)));
					} else {
						break _v4_2;
					}
				} else {
					if (_p9._1.ctor === 'Nothing') {
						return A2(
							_elm_lang$core$Task$andThen,
							_elm_lang$navigation$Navigation$spawnPopState(router),
							function (pid) {
								return _elm_lang$core$Task$succeed(
									A2(
										_elm_lang$navigation$Navigation$State,
										subs,
										_elm_lang$core$Maybe$Just(pid)));
							});
					} else {
						break _v4_2;
					}
				}
			} while(false);
			return _elm_lang$core$Task$succeed(
				A2(_elm_lang$navigation$Navigation$State, subs, _p10));
		}();
		return A2(
			_elm_lang$navigation$Navigation_ops['&>'],
			_elm_lang$core$Task$sequence(
				A2(
					_elm_lang$core$List$map,
					A2(_elm_lang$navigation$Navigation$cmdHelp, router, subs),
					cmds)),
			stepState);
	});
var _elm_lang$navigation$Navigation$UserMsg = function (a) {
	return {ctor: 'UserMsg', _0: a};
};
var _elm_lang$navigation$Navigation$Change = function (a) {
	return {ctor: 'Change', _0: a};
};
var _elm_lang$navigation$Navigation$Parser = function (a) {
	return {ctor: 'Parser', _0: a};
};
var _elm_lang$navigation$Navigation$makeParser = _elm_lang$navigation$Navigation$Parser;
var _elm_lang$navigation$Navigation$Modify = function (a) {
	return {ctor: 'Modify', _0: a};
};
var _elm_lang$navigation$Navigation$modifyUrl = function (url) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$Modify(url));
};
var _elm_lang$navigation$Navigation$New = function (a) {
	return {ctor: 'New', _0: a};
};
var _elm_lang$navigation$Navigation$newUrl = function (url) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$New(url));
};
var _elm_lang$navigation$Navigation$Jump = function (a) {
	return {ctor: 'Jump', _0: a};
};
var _elm_lang$navigation$Navigation$back = function (n) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$Jump(0 - n));
};
var _elm_lang$navigation$Navigation$forward = function (n) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$Jump(n));
};
var _elm_lang$navigation$Navigation$cmdMap = F2(
	function (_p11, myCmd) {
		var _p12 = myCmd;
		switch (_p12.ctor) {
			case 'Jump':
				return _elm_lang$navigation$Navigation$Jump(_p12._0);
			case 'New':
				return _elm_lang$navigation$Navigation$New(_p12._0);
			default:
				return _elm_lang$navigation$Navigation$Modify(_p12._0);
		}
	});
var _elm_lang$navigation$Navigation$Monitor = function (a) {
	return {ctor: 'Monitor', _0: a};
};
var _elm_lang$navigation$Navigation$programWithFlags = F2(
	function (_p13, stuff) {
		var _p14 = _p13;
		var _p16 = _p14._0;
		var location = _elm_lang$navigation$Native_Navigation.getLocation(
			{ctor: '_Tuple0'});
		var init = function (flags) {
			return A2(
				_elm_lang$navigation$Navigation$updateHelp,
				_elm_lang$navigation$Navigation$UserMsg,
				A2(
					stuff.init,
					flags,
					_p16(location)));
		};
		var view = function (model) {
			return A2(
				_elm_lang$html$Html_App$map,
				_elm_lang$navigation$Navigation$UserMsg,
				stuff.view(model));
		};
		var subs = function (model) {
			return _elm_lang$core$Platform_Sub$batch(
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$navigation$Navigation$subscription(
						_elm_lang$navigation$Navigation$Monitor(_elm_lang$navigation$Navigation$Change)),
						A2(
						_elm_lang$core$Platform_Sub$map,
						_elm_lang$navigation$Navigation$UserMsg,
						stuff.subscriptions(model))
					]));
		};
		var update = F2(
			function (msg, model) {
				return A2(
					_elm_lang$navigation$Navigation$updateHelp,
					_elm_lang$navigation$Navigation$UserMsg,
					function () {
						var _p15 = msg;
						if (_p15.ctor === 'Change') {
							return A2(
								stuff.urlUpdate,
								_p16(_p15._0),
								model);
						} else {
							return A2(stuff.update, _p15._0, model);
						}
					}());
			});
		return _elm_lang$html$Html_App$programWithFlags(
			{init: init, view: view, update: update, subscriptions: subs});
	});
var _elm_lang$navigation$Navigation$program = F2(
	function (parser, stuff) {
		return A2(
			_elm_lang$navigation$Navigation$programWithFlags,
			parser,
			_elm_lang$core$Native_Utils.update(
				stuff,
				{
					init: function (_p17) {
						return stuff.init;
					}
				}));
	});
var _elm_lang$navigation$Navigation$subMap = F2(
	function (func, _p18) {
		var _p19 = _p18;
		return _elm_lang$navigation$Navigation$Monitor(
			function (_p20) {
				return func(
					_p19._0(_p20));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Navigation'] = {pkg: 'elm-lang/navigation', init: _elm_lang$navigation$Navigation$init, onEffects: _elm_lang$navigation$Navigation$onEffects, onSelfMsg: _elm_lang$navigation$Navigation$onSelfMsg, tag: 'fx', cmdMap: _elm_lang$navigation$Navigation$cmdMap, subMap: _elm_lang$navigation$Navigation$subMap};

//import Dict, List, Maybe, Native.Scheduler //

var _evancz$elm_http$Native_Http = function() {

function send(settings, request)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
		var req = new XMLHttpRequest();

		// start
		if (settings.onStart.ctor === 'Just')
		{
			req.addEventListener('loadStart', function() {
				var task = settings.onStart._0;
				_elm_lang$core$Native_Scheduler.rawSpawn(task);
			});
		}

		// progress
		if (settings.onProgress.ctor === 'Just')
		{
			req.addEventListener('progress', function(event) {
				var progress = !event.lengthComputable
					? _elm_lang$core$Maybe$Nothing
					: _elm_lang$core$Maybe$Just({
						loaded: event.loaded,
						total: event.total
					});
				var task = settings.onProgress._0(progress);
				_elm_lang$core$Native_Scheduler.rawSpawn(task);
			});
		}

		// end
		req.addEventListener('error', function() {
			return callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'RawNetworkError' }));
		});

		req.addEventListener('timeout', function() {
			return callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'RawTimeout' }));
		});

		req.addEventListener('load', function() {
			return callback(_elm_lang$core$Native_Scheduler.succeed(toResponse(req)));
		});

		req.open(request.verb, request.url, true);

		// set all the headers
		function setHeader(pair) {
			req.setRequestHeader(pair._0, pair._1);
		}
		A2(_elm_lang$core$List$map, setHeader, request.headers);

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

		return function() {
			req.abort();
		};
	});
}


// deal with responses

function toResponse(req)
{
	var tag = req.responseType === 'blob' ? 'Blob' : 'Text'
	var response = tag === 'Blob' ? req.response : req.responseText;
	return {
		status: req.status,
		statusText: req.statusText,
		headers: parseHeaders(req.getAllResponseHeaders()),
		url: req.responseURL,
		value: { ctor: tag, _0: response }
	};
}


function parseHeaders(rawHeaders)
{
	var headers = _elm_lang$core$Dict$empty;

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

			headers = A3(_elm_lang$core$Dict$update, key, function(oldValue) {
				if (oldValue.ctor === 'Just')
				{
					return _elm_lang$core$Maybe$Just(value + ', ' + oldValue._0);
				}
				return _elm_lang$core$Maybe$Just(value);
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

return {
	send: F2(send),
	multipart: multipart,
	uriEncode: uriEncode,
	uriDecode: uriDecode
};

}();

var _evancz$elm_http$Http$send = _evancz$elm_http$Native_Http.send;
var _evancz$elm_http$Http$defaultSettings = {timeout: 0, onStart: _elm_lang$core$Maybe$Nothing, onProgress: _elm_lang$core$Maybe$Nothing, desiredResponseType: _elm_lang$core$Maybe$Nothing, withCredentials: false};
var _evancz$elm_http$Http$multipart = _evancz$elm_http$Native_Http.multipart;
var _evancz$elm_http$Http$uriDecode = _evancz$elm_http$Native_Http.uriDecode;
var _evancz$elm_http$Http$uriEncode = _evancz$elm_http$Native_Http.uriEncode;
var _evancz$elm_http$Http$queryEscape = function (string) {
	return A2(
		_elm_lang$core$String$join,
		'+',
		A2(
			_elm_lang$core$String$split,
			'%20',
			_evancz$elm_http$Http$uriEncode(string)));
};
var _evancz$elm_http$Http$queryPair = function (_p0) {
	var _p1 = _p0;
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_evancz$elm_http$Http$queryEscape(_p1._0),
		A2(
			_elm_lang$core$Basics_ops['++'],
			'=',
			_evancz$elm_http$Http$queryEscape(_p1._1)));
};
var _evancz$elm_http$Http$url = F2(
	function (baseUrl, args) {
		var _p2 = args;
		if (_p2.ctor === '[]') {
			return baseUrl;
		} else {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				baseUrl,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'?',
					A2(
						_elm_lang$core$String$join,
						'&',
						A2(_elm_lang$core$List$map, _evancz$elm_http$Http$queryPair, args))));
		}
	});
var _evancz$elm_http$Http$Request = F4(
	function (a, b, c, d) {
		return {verb: a, headers: b, url: c, body: d};
	});
var _evancz$elm_http$Http$Settings = F5(
	function (a, b, c, d, e) {
		return {timeout: a, onStart: b, onProgress: c, desiredResponseType: d, withCredentials: e};
	});
var _evancz$elm_http$Http$Response = F5(
	function (a, b, c, d, e) {
		return {status: a, statusText: b, headers: c, url: d, value: e};
	});
var _evancz$elm_http$Http$TODO_implement_blob_in_another_library = {ctor: 'TODO_implement_blob_in_another_library'};
var _evancz$elm_http$Http$TODO_implement_file_in_another_library = {ctor: 'TODO_implement_file_in_another_library'};
var _evancz$elm_http$Http$BodyBlob = function (a) {
	return {ctor: 'BodyBlob', _0: a};
};
var _evancz$elm_http$Http$BodyFormData = {ctor: 'BodyFormData'};
var _evancz$elm_http$Http$ArrayBuffer = {ctor: 'ArrayBuffer'};
var _evancz$elm_http$Http$BodyString = function (a) {
	return {ctor: 'BodyString', _0: a};
};
var _evancz$elm_http$Http$string = _evancz$elm_http$Http$BodyString;
var _evancz$elm_http$Http$Empty = {ctor: 'Empty'};
var _evancz$elm_http$Http$empty = _evancz$elm_http$Http$Empty;
var _evancz$elm_http$Http$FileData = F3(
	function (a, b, c) {
		return {ctor: 'FileData', _0: a, _1: b, _2: c};
	});
var _evancz$elm_http$Http$BlobData = F3(
	function (a, b, c) {
		return {ctor: 'BlobData', _0: a, _1: b, _2: c};
	});
var _evancz$elm_http$Http$blobData = _evancz$elm_http$Http$BlobData;
var _evancz$elm_http$Http$StringData = F2(
	function (a, b) {
		return {ctor: 'StringData', _0: a, _1: b};
	});
var _evancz$elm_http$Http$stringData = _evancz$elm_http$Http$StringData;
var _evancz$elm_http$Http$Blob = function (a) {
	return {ctor: 'Blob', _0: a};
};
var _evancz$elm_http$Http$Text = function (a) {
	return {ctor: 'Text', _0: a};
};
var _evancz$elm_http$Http$RawNetworkError = {ctor: 'RawNetworkError'};
var _evancz$elm_http$Http$RawTimeout = {ctor: 'RawTimeout'};
var _evancz$elm_http$Http$BadResponse = F2(
	function (a, b) {
		return {ctor: 'BadResponse', _0: a, _1: b};
	});
var _evancz$elm_http$Http$UnexpectedPayload = function (a) {
	return {ctor: 'UnexpectedPayload', _0: a};
};
var _evancz$elm_http$Http$handleResponse = F2(
	function (handle, response) {
		if ((_elm_lang$core$Native_Utils.cmp(200, response.status) < 1) && (_elm_lang$core$Native_Utils.cmp(response.status, 300) < 0)) {
			var _p3 = response.value;
			if (_p3.ctor === 'Text') {
				return handle(_p3._0);
			} else {
				return _elm_lang$core$Task$fail(
					_evancz$elm_http$Http$UnexpectedPayload('Response body is a blob, expecting a string.'));
			}
		} else {
			return _elm_lang$core$Task$fail(
				A2(_evancz$elm_http$Http$BadResponse, response.status, response.statusText));
		}
	});
var _evancz$elm_http$Http$NetworkError = {ctor: 'NetworkError'};
var _evancz$elm_http$Http$Timeout = {ctor: 'Timeout'};
var _evancz$elm_http$Http$promoteError = function (rawError) {
	var _p4 = rawError;
	if (_p4.ctor === 'RawTimeout') {
		return _evancz$elm_http$Http$Timeout;
	} else {
		return _evancz$elm_http$Http$NetworkError;
	}
};
var _evancz$elm_http$Http$getString = function (url) {
	var request = {
		verb: 'GET',
		headers: _elm_lang$core$Native_List.fromArray(
			[]),
		url: url,
		body: _evancz$elm_http$Http$empty
	};
	return A2(
		_elm_lang$core$Task$andThen,
		A2(
			_elm_lang$core$Task$mapError,
			_evancz$elm_http$Http$promoteError,
			A2(_evancz$elm_http$Http$send, _evancz$elm_http$Http$defaultSettings, request)),
		_evancz$elm_http$Http$handleResponse(_elm_lang$core$Task$succeed));
};
var _evancz$elm_http$Http$fromJson = F2(
	function (decoder, response) {
		var decode = function (str) {
			var _p5 = A2(_elm_lang$core$Json_Decode$decodeString, decoder, str);
			if (_p5.ctor === 'Ok') {
				return _elm_lang$core$Task$succeed(_p5._0);
			} else {
				return _elm_lang$core$Task$fail(
					_evancz$elm_http$Http$UnexpectedPayload(_p5._0));
			}
		};
		return A2(
			_elm_lang$core$Task$andThen,
			A2(_elm_lang$core$Task$mapError, _evancz$elm_http$Http$promoteError, response),
			_evancz$elm_http$Http$handleResponse(decode));
	});
var _evancz$elm_http$Http$get = F2(
	function (decoder, url) {
		var request = {
			verb: 'GET',
			headers: _elm_lang$core$Native_List.fromArray(
				[]),
			url: url,
			body: _evancz$elm_http$Http$empty
		};
		return A2(
			_evancz$elm_http$Http$fromJson,
			decoder,
			A2(_evancz$elm_http$Http$send, _evancz$elm_http$Http$defaultSettings, request));
	});
var _evancz$elm_http$Http$post = F3(
	function (decoder, url, body) {
		var request = {
			verb: 'POST',
			headers: _elm_lang$core$Native_List.fromArray(
				[]),
			url: url,
			body: body
		};
		return A2(
			_evancz$elm_http$Http$fromJson,
			decoder,
			A2(_evancz$elm_http$Http$send, _evancz$elm_http$Http$defaultSettings, request));
	});

var _sporto$erl$Erl$appendPathSegments = F2(
	function (segments, url) {
		var newPath = A2(_elm_lang$core$List$append, url.path, segments);
		return _elm_lang$core$Native_Utils.update(
			url,
			{path: newPath});
	});
var _sporto$erl$Erl$removeQuery = F2(
	function (key, url) {
		var updated = A2(_elm_lang$core$Dict$remove, key, url.query);
		return _elm_lang$core$Native_Utils.update(
			url,
			{query: updated});
	});
var _sporto$erl$Erl$setQuery = F3(
	function (key, val, url) {
		var updated = A2(_elm_lang$core$Dict$singleton, key, val);
		return _elm_lang$core$Native_Utils.update(
			url,
			{query: updated});
	});
var _sporto$erl$Erl$addQuery = F3(
	function (key, val, url) {
		var updated = _elm_lang$core$String$isEmpty(val) ? A2(_elm_lang$core$Dict$remove, key, url.query) : A3(_elm_lang$core$Dict$insert, key, val, url.query);
		return _elm_lang$core$Native_Utils.update(
			url,
			{query: updated});
	});
var _sporto$erl$Erl$clearQuery = function (url) {
	return _elm_lang$core$Native_Utils.update(
		url,
		{query: _elm_lang$core$Dict$empty});
};
var _sporto$erl$Erl$new = {
	protocol: '',
	username: '',
	password: '',
	host: _elm_lang$core$Native_List.fromArray(
		[]),
	path: _elm_lang$core$Native_List.fromArray(
		[]),
	hasTrailingSlash: false,
	port$: 0,
	hash: '',
	query: _elm_lang$core$Dict$empty
};
var _sporto$erl$Erl$hashToString = function (url) {
	return _elm_lang$core$String$isEmpty(url.hash) ? '' : A2(_elm_lang$core$Basics_ops['++'], '#', url.hash);
};
var _sporto$erl$Erl$trailingSlashComponent = function (url) {
	return _elm_lang$core$Native_Utils.eq(url.hasTrailingSlash, true) ? '/' : '';
};
var _sporto$erl$Erl$pathComponent = function (url) {
	var encoded = A2(_elm_lang$core$List$map, _evancz$elm_http$Http$uriEncode, url.path);
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$List$length(url.path),
		0) ? '' : A2(
		_elm_lang$core$Basics_ops['++'],
		'/',
		A2(_elm_lang$core$String$join, '/', encoded));
};
var _sporto$erl$Erl$portComponent = function (url) {
	var _p0 = url.port$;
	switch (_p0) {
		case 0:
			return '';
		case 80:
			return '';
		default:
			return A2(
				_elm_lang$core$Basics_ops['++'],
				':',
				_elm_lang$core$Basics$toString(url.port$));
	}
};
var _sporto$erl$Erl$hostComponent = function (url) {
	return _evancz$elm_http$Http$uriEncode(
		A2(_elm_lang$core$String$join, '.', url.host));
};
var _sporto$erl$Erl$protocolComponent = function (url) {
	var _p1 = url.protocol;
	if (_p1 === '') {
		return '';
	} else {
		return A2(_elm_lang$core$Basics_ops['++'], url.protocol, '://');
	}
};
var _sporto$erl$Erl$queryToString = function (url) {
	var tuples = _elm_lang$core$Dict$toList(url.query);
	var encodedTuples = A2(
		_elm_lang$core$List$map,
		function (_p2) {
			var _p3 = _p2;
			return {
				ctor: '_Tuple2',
				_0: _evancz$elm_http$Http$uriEncode(_p3._0),
				_1: _evancz$elm_http$Http$uriEncode(_p3._1)
			};
		},
		tuples);
	var parts = A2(
		_elm_lang$core$List$map,
		function (_p4) {
			var _p5 = _p4;
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_p5._0,
				A2(_elm_lang$core$Basics_ops['++'], '=', _p5._1));
		},
		encodedTuples);
	return _elm_lang$core$Dict$isEmpty(url.query) ? '' : A2(
		_elm_lang$core$Basics_ops['++'],
		'?',
		A2(_elm_lang$core$String$join, '&', parts));
};
var _sporto$erl$Erl$toString = function (url) {
	var hash = _sporto$erl$Erl$hashToString(url);
	var query$ = _sporto$erl$Erl$queryToString(url);
	var trailingSlash$ = _sporto$erl$Erl$trailingSlashComponent(url);
	var path$ = _sporto$erl$Erl$pathComponent(url);
	var port$ = _sporto$erl$Erl$portComponent(url);
	var host$ = _sporto$erl$Erl$hostComponent(url);
	var protocol$ = _sporto$erl$Erl$protocolComponent(url);
	return A2(
		_elm_lang$core$Basics_ops['++'],
		protocol$,
		A2(
			_elm_lang$core$Basics_ops['++'],
			host$,
			A2(
				_elm_lang$core$Basics_ops['++'],
				port$,
				A2(
					_elm_lang$core$Basics_ops['++'],
					path$,
					A2(
						_elm_lang$core$Basics_ops['++'],
						trailingSlash$,
						A2(_elm_lang$core$Basics_ops['++'], query$, hash))))));
};
var _sporto$erl$Erl$queryStringElementToTuple = function (element) {
	var splitted = A2(_elm_lang$core$String$split, '=', element);
	var first = A2(
		_elm_lang$core$Maybe$withDefault,
		'',
		_elm_lang$core$List$head(splitted));
	var firstDecoded = _evancz$elm_http$Http$uriDecode(first);
	var second = A2(
		_elm_lang$core$Maybe$withDefault,
		'',
		_elm_lang$core$List$head(
			A2(_elm_lang$core$List$drop, 1, splitted)));
	var secondDecoded = _evancz$elm_http$Http$uriDecode(second);
	return {ctor: '_Tuple2', _0: firstDecoded, _1: secondDecoded};
};
var _sporto$erl$Erl$queryTuples = function (queryString) {
	var splitted = A2(_elm_lang$core$String$split, '&', queryString);
	return _elm_lang$core$String$isEmpty(queryString) ? _elm_lang$core$Native_List.fromArray(
		[]) : A2(_elm_lang$core$List$map, _sporto$erl$Erl$queryStringElementToTuple, splitted);
};
var _sporto$erl$Erl$parseQuery = function (str) {
	return _elm_lang$core$Dict$fromList(
		_sporto$erl$Erl$queryTuples(str));
};
var _sporto$erl$Erl$extractQuery = function (str) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		'',
		_elm_lang$core$List$head(
			A2(
				_elm_lang$core$String$split,
				'#',
				A2(
					_elm_lang$core$Maybe$withDefault,
					'',
					_elm_lang$core$List$head(
						A2(
							_elm_lang$core$List$drop,
							1,
							A2(_elm_lang$core$String$split, '?', str)))))));
};
var _sporto$erl$Erl$queryFromAll = function (all) {
	return _sporto$erl$Erl$parseQuery(
		_sporto$erl$Erl$extractQuery(all));
};
var _sporto$erl$Erl$extractHash = function (str) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		'',
		_elm_lang$core$List$head(
			A2(
				_elm_lang$core$List$drop,
				1,
				A2(_elm_lang$core$String$split, '#', str))));
};
var _sporto$erl$Erl$hashFromAll = function (str) {
	return _sporto$erl$Erl$extractHash(str);
};
var _sporto$erl$Erl$extractPort = function (str) {
	var rx = _elm_lang$core$Regex$regex(':\\d+');
	var res = A3(
		_elm_lang$core$Regex$find,
		_elm_lang$core$Regex$AtMost(1),
		rx,
		str);
	return A2(
		_elm_lang$core$Maybe$withDefault,
		80,
		_elm_lang$core$Result$toMaybe(
			_elm_lang$core$String$toInt(
				A2(
					_elm_lang$core$String$dropLeft,
					1,
					A2(
						_elm_lang$core$Maybe$withDefault,
						'',
						_elm_lang$core$List$head(
							A2(
								_elm_lang$core$List$map,
								function (_) {
									return _.match;
								},
								res)))))));
};
var _sporto$erl$Erl$parseHost = function (str) {
	return A2(_elm_lang$core$String$split, '.', str);
};
var _sporto$erl$Erl$extractProtocol = function (str) {
	var parts = A2(_elm_lang$core$String$split, '://', str);
	var _p6 = _elm_lang$core$List$length(parts);
	if (_p6 === 1) {
		return '';
	} else {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			'',
			_elm_lang$core$List$head(parts));
	}
};
var _sporto$erl$Erl$leftFrom = F2(
	function (delimiter, str) {
		var parts = A2(_elm_lang$core$String$split, delimiter, str);
		var head = _elm_lang$core$List$head(parts);
		var _p7 = _elm_lang$core$List$length(parts);
		switch (_p7) {
			case 0:
				return '';
			case 1:
				return '';
			default:
				return A2(_elm_lang$core$Maybe$withDefault, '', head);
		}
	});
var _sporto$erl$Erl$leftFromOrSame = F2(
	function (delimiter, str) {
		var parts = A2(_elm_lang$core$String$split, delimiter, str);
		return A2(
			_elm_lang$core$Maybe$withDefault,
			'',
			_elm_lang$core$List$head(parts));
	});
var _sporto$erl$Erl$rightFromOrSame = F2(
	function (delimiter, str) {
		var parts = A2(_elm_lang$core$String$split, delimiter, str);
		return A2(
			_elm_lang$core$Maybe$withDefault,
			'',
			_elm_lang$core$List$head(
				_elm_lang$core$List$reverse(parts)));
	});
var _sporto$erl$Erl$extractHost = function (str) {
	var localhostRx = 'localhost';
	var dotsRx = '((\\w|-)+\\.)+(\\w|-)+';
	var rx = A2(
		_elm_lang$core$Basics_ops['++'],
		'(',
		A2(
			_elm_lang$core$Basics_ops['++'],
			dotsRx,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'|',
				A2(_elm_lang$core$Basics_ops['++'], localhostRx, ')'))));
	return A2(
		_elm_lang$core$Maybe$withDefault,
		'',
		_elm_lang$core$List$head(
			A2(
				_elm_lang$core$List$map,
				function (_) {
					return _.match;
				},
				A3(
					_elm_lang$core$Regex$find,
					_elm_lang$core$Regex$AtMost(1),
					_elm_lang$core$Regex$regex(rx),
					A2(
						_sporto$erl$Erl$leftFromOrSame,
						'/',
						A2(_sporto$erl$Erl$rightFromOrSame, '//', str))))));
};
var _sporto$erl$Erl$host = function (str) {
	return _sporto$erl$Erl$parseHost(
		_sporto$erl$Erl$extractHost(str));
};
var _sporto$erl$Erl$extractPath = function (str) {
	var host = _sporto$erl$Erl$extractHost(str);
	return A4(
		_elm_lang$core$Regex$replace,
		_elm_lang$core$Regex$AtMost(1),
		_elm_lang$core$Regex$regex(':\\d+'),
		function (_p8) {
			return '';
		},
		A4(
			_elm_lang$core$Regex$replace,
			_elm_lang$core$Regex$AtMost(1),
			_elm_lang$core$Regex$regex(host),
			function (_p9) {
				return '';
			},
			A2(
				_sporto$erl$Erl$leftFromOrSame,
				'#',
				A2(
					_sporto$erl$Erl$leftFromOrSame,
					'?',
					A2(_sporto$erl$Erl$rightFromOrSame, '//', str)))));
};
var _sporto$erl$Erl$hasTrailingSlashFromAll = function (str) {
	return A2(
		_elm_lang$core$Regex$contains,
		_elm_lang$core$Regex$regex('/$'),
		_sporto$erl$Erl$extractPath(str));
};
var _sporto$erl$Erl$rightFrom = F2(
	function (delimiter, str) {
		var parts = A2(_elm_lang$core$String$split, delimiter, str);
		var _p10 = _elm_lang$core$List$length(parts);
		switch (_p10) {
			case 0:
				return '';
			case 1:
				return '';
			default:
				return A2(
					_elm_lang$core$Maybe$withDefault,
					'',
					_elm_lang$core$List$head(
						_elm_lang$core$List$reverse(parts)));
		}
	});
var _sporto$erl$Erl$notEmpty = function (str) {
	return _elm_lang$core$Basics$not(
		_elm_lang$core$String$isEmpty(str));
};
var _sporto$erl$Erl$parsePath = function (str) {
	return A2(
		_elm_lang$core$List$map,
		_evancz$elm_http$Http$uriDecode,
		A2(
			_elm_lang$core$List$filter,
			_sporto$erl$Erl$notEmpty,
			A2(_elm_lang$core$String$split, '/', str)));
};
var _sporto$erl$Erl$pathFromAll = function (str) {
	return _sporto$erl$Erl$parsePath(
		_sporto$erl$Erl$extractPath(str));
};
var _sporto$erl$Erl$parse = function (str) {
	return {
		host: _sporto$erl$Erl$host(str),
		hash: _sporto$erl$Erl$hashFromAll(str),
		password: '',
		path: _sporto$erl$Erl$pathFromAll(str),
		hasTrailingSlash: _sporto$erl$Erl$hasTrailingSlashFromAll(str),
		port$: _sporto$erl$Erl$extractPort(str),
		protocol: _sporto$erl$Erl$extractProtocol(str),
		query: _sporto$erl$Erl$queryFromAll(str),
		username: ''
	};
};
var _sporto$erl$Erl$Url = F9(
	function (a, b, c, d, e, f, g, h, i) {
		return {protocol: a, username: b, password: c, host: d, port$: e, path: f, hasTrailingSlash: g, hash: h, query: i};
	});

var _rgrempel$elm_route_url$RouteUrl$url2path = function (url) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'/',
		A2(
			_elm_lang$core$Basics_ops['++'],
			A2(_elm_lang$core$String$join, '/', url.path),
			(url.hasTrailingSlash && _elm_lang$core$Basics$not(
				_elm_lang$core$List$isEmpty(url.path))) ? '/' : ''));
};
var _rgrempel$elm_route_url$RouteUrl$eqUrl = F2(
	function (u1, u2) {
		return _elm_lang$core$Native_Utils.eq(u1.path, u2.path) && (_elm_lang$core$Native_Utils.eq(u1.hasTrailingSlash, u2.hasTrailingSlash) && (_elm_lang$core$Native_Utils.eq(u1.hash, u2.hash) && _elm_lang$core$Native_Utils.eq(
			_elm_lang$core$Dict$toList(u1.query),
			_elm_lang$core$Dict$toList(u2.query))));
	});
var _rgrempel$elm_route_url$RouteUrl$checkDistinctUrl = F2(
	function (old, $new) {
		return A2(
			_rgrempel$elm_route_url$RouteUrl$eqUrl,
			_sporto$erl$Erl$parse($new.url),
			old) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just($new);
	});
var _rgrempel$elm_route_url$RouteUrl$mapUrl = F2(
	function (func, c1) {
		return _elm_lang$core$Native_Utils.update(
			c1,
			{
				url: func(c1.url)
			});
	});
var _rgrempel$elm_route_url$RouteUrl$normalizeUrl = F2(
	function (old, change) {
		return A2(
			_rgrempel$elm_route_url$RouteUrl$mapUrl,
			A2(_elm_lang$core$String$startsWith, '?', change.url) ? function (url) {
				return A2(
					_elm_lang$core$Basics_ops['++'],
					_rgrempel$elm_route_url$RouteUrl$url2path(old),
					url);
			} : (A2(_elm_lang$core$String$startsWith, '#', change.url) ? function (url) {
				return A2(
					_elm_lang$core$Basics_ops['++'],
					_rgrempel$elm_route_url$RouteUrl$url2path(old),
					A2(
						_elm_lang$core$Basics_ops['++'],
						_sporto$erl$Erl$queryToString(old),
						url));
			} : function (url) {
				return url;
			}),
			change);
	});
var _rgrempel$elm_route_url$RouteUrl$urlChange2Cmd = function (change) {
	return function () {
		var _p0 = change.entry;
		if (_p0.ctor === 'NewEntry') {
			return _elm_lang$navigation$Navigation$newUrl;
		} else {
			return _elm_lang$navigation$Navigation$modifyUrl;
		}
	}()(change.url);
};
var _rgrempel$elm_route_url$RouteUrl$update = F3(
	function (app, msg, model) {
		var _p1 = A2(app.update, msg, model.user);
		var newUserModel = _p1._0;
		var userCommand = _p1._1;
		var maybeUrlChange = A2(
			_elm_lang$core$Maybe$andThen,
			A2(
				_elm_lang$core$Maybe$map,
				_rgrempel$elm_route_url$RouteUrl$normalizeUrl(model.router.reportedUrl),
				A2(app.delta2url, model.user, newUserModel)),
			_rgrempel$elm_route_url$RouteUrl$checkDistinctUrl(model.router.reportedUrl));
		var _p2 = maybeUrlChange;
		if (_p2.ctor === 'Just') {
			var _p3 = _p2._0;
			return {
				ctor: '_Tuple2',
				_0: {
					user: newUserModel,
					router: {
						reportedUrl: _sporto$erl$Erl$parse(_p3.url),
						expectedUrlUpdates: model.router.expectedUrlUpdates + 1
					}
				},
				_1: _elm_lang$core$Platform_Cmd$batch(
					_elm_lang$core$Native_List.fromArray(
						[
							_rgrempel$elm_route_url$RouteUrl$urlChange2Cmd(_p3),
							userCommand
						]))
			};
		} else {
			return {
				ctor: '_Tuple2',
				_0: {user: newUserModel, router: model.router},
				_1: userCommand
			};
		}
	});
var _rgrempel$elm_route_url$RouteUrl$init = F3(
	function (app, flags, location) {
		var routerModel = {
			expectedUrlUpdates: 0,
			reportedUrl: _sporto$erl$Erl$parse(location.href)
		};
		var step = F2(
			function (msg, _p4) {
				var _p5 = _p4;
				var _p6 = A2(app.update, msg, _p5._0);
				return {
					ctor: '_Tuple2',
					_0: _p6._0,
					_1: A2(_elm_lang$core$List_ops['::'], _p6._1, _p5._1)
				};
			});
		var _p7 = app.init(flags);
		var userModelFromFlags = _p7._0;
		var commandFromFlags = _p7._1;
		var _p8 = A3(
			_elm_lang$core$List$foldl,
			step,
			{
				ctor: '_Tuple2',
				_0: userModelFromFlags,
				_1: _elm_lang$core$Native_List.fromArray(
					[commandFromFlags])
			},
			app.location2messages(location));
		var userModelFromLocation = _p8._0;
		var commands = _p8._1;
		return {
			ctor: '_Tuple2',
			_0: {user: userModelFromLocation, router: routerModel},
			_1: _elm_lang$core$Platform_Cmd$batch(commands)
		};
	});
var _rgrempel$elm_route_url$RouteUrl$urlUpdate = F3(
	function (app, location, model) {
		var newRouterModel = {
			reportedUrl: _sporto$erl$Erl$parse(location.href),
			expectedUrlUpdates: (_elm_lang$core$Native_Utils.cmp(model.router.expectedUrlUpdates, 0) > 0) ? (model.router.expectedUrlUpdates - 1) : 0
		};
		if (_elm_lang$core$Native_Utils.cmp(model.router.expectedUrlUpdates, 0) > 0) {
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_Utils.update(
					model,
					{router: newRouterModel}),
				_1: _elm_lang$core$Platform_Cmd$none
			};
		} else {
			var step = F2(
				function (msg, _p9) {
					var _p10 = _p9;
					var _p11 = A2(app.update, msg, _p10._0);
					return {
						ctor: '_Tuple2',
						_0: _p11._0,
						_1: A2(_elm_lang$core$List_ops['::'], _p11._1, _p10._1)
					};
				});
			var _p12 = A3(
				_elm_lang$core$List$foldl,
				step,
				{
					ctor: '_Tuple2',
					_0: model.user,
					_1: _elm_lang$core$Native_List.fromArray(
						[])
				},
				app.location2messages(location));
			var newUserModel = _p12._0;
			var commands = _p12._1;
			return {
				ctor: '_Tuple2',
				_0: {user: newUserModel, router: newRouterModel},
				_1: _elm_lang$core$Platform_Cmd$batch(commands)
			};
		}
	});
var _rgrempel$elm_route_url$RouteUrl$subscriptions = F2(
	function (app, model) {
		return app.subscriptions(model.user);
	});
var _rgrempel$elm_route_url$RouteUrl$view = F2(
	function (app, model) {
		return app.view(model.user);
	});
var _rgrempel$elm_route_url$RouteUrl$runNavigationApp = function (app) {
	return A2(
		_elm_lang$navigation$Navigation$programWithFlags,
		app.parser,
		{init: app.init, update: app.update, urlUpdate: app.urlUpdate, view: app.view, subscriptions: app.subscriptions});
};
var _rgrempel$elm_route_url$RouteUrl$navigationAppWithFlags = function (app) {
	return {
		parser: _elm_lang$navigation$Navigation$makeParser(_elm_lang$core$Basics$identity),
		init: _rgrempel$elm_route_url$RouteUrl$init(app),
		update: _rgrempel$elm_route_url$RouteUrl$update(app),
		urlUpdate: _rgrempel$elm_route_url$RouteUrl$urlUpdate(app),
		view: _rgrempel$elm_route_url$RouteUrl$view(app),
		subscriptions: _rgrempel$elm_route_url$RouteUrl$subscriptions(app)
	};
};
var _rgrempel$elm_route_url$RouteUrl$programWithFlags = function (_p13) {
	return _rgrempel$elm_route_url$RouteUrl$runNavigationApp(
		_rgrempel$elm_route_url$RouteUrl$navigationAppWithFlags(_p13));
};
var _rgrempel$elm_route_url$RouteUrl$navigationApp = function (app) {
	return _rgrempel$elm_route_url$RouteUrl$navigationAppWithFlags(
		_elm_lang$core$Native_Utils.update(
			app,
			{
				init: function (_p14) {
					return app.init;
				}
			}));
};
var _rgrempel$elm_route_url$RouteUrl$program = function (_p15) {
	return _rgrempel$elm_route_url$RouteUrl$runNavigationApp(
		_rgrempel$elm_route_url$RouteUrl$navigationApp(_p15));
};
var _rgrempel$elm_route_url$RouteUrl$App = F6(
	function (a, b, c, d, e, f) {
		return {delta2url: a, location2messages: b, init: c, update: d, subscriptions: e, view: f};
	});
var _rgrempel$elm_route_url$RouteUrl$AppWithFlags = F6(
	function (a, b, c, d, e, f) {
		return {delta2url: a, location2messages: b, init: c, update: d, subscriptions: e, view: f};
	});
var _rgrempel$elm_route_url$RouteUrl$UrlChange = F2(
	function (a, b) {
		return {entry: a, url: b};
	});
var _rgrempel$elm_route_url$RouteUrl$RouterModel = F2(
	function (a, b) {
		return {reportedUrl: a, expectedUrlUpdates: b};
	});
var _rgrempel$elm_route_url$RouteUrl$Model = F2(
	function (a, b) {
		return {user: a, router: b};
	});
var _rgrempel$elm_route_url$RouteUrl$NavigationApp = F6(
	function (a, b, c, d, e, f) {
		return {parser: a, init: b, update: c, urlUpdate: d, view: e, subscriptions: f};
	});
var _rgrempel$elm_route_url$RouteUrl$ModifyEntry = {ctor: 'ModifyEntry'};
var _rgrempel$elm_route_url$RouteUrl$NewEntry = {ctor: 'NewEntry'};

var _debois$elm_mdl$Material_Scheme$scheme = F2(
	function (primary, accent) {
		return A2(
			_elm_lang$core$String$join,
			'\n',
			A2(
				_elm_lang$core$List$map,
				function (url) {
					return A2(
						_elm_lang$core$Basics_ops['++'],
						'@import url(',
						A2(_elm_lang$core$Basics_ops['++'], url, ');'));
				},
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_elm_lang$core$Basics_ops['++'],
						'https://code.getmdl.io/1.2.0/',
						A2(_debois$elm_mdl$Material_Color$scheme, primary, accent)),
						'https://fonts.googleapis.com/icon?family=Material+Icons',
						'https://fonts.googleapis.com/css?family=Roboto:400,300,500|Roboto+Mono|Roboto+Condensed:400,700&subset=latin,latin-ext'
					])));
	});
var _debois$elm_mdl$Material_Scheme$topWithScheme = F3(
	function (primary, accent, content) {
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					A3(
					_elm_lang$html$Html$node,
					'style',
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$type$('text/css')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text(
							A2(_debois$elm_mdl$Material_Scheme$scheme, primary, accent))
						])),
					content
				]));
	});
var _debois$elm_mdl$Material_Scheme$top = function (content) {
	return A3(_debois$elm_mdl$Material_Scheme$topWithScheme, _debois$elm_mdl$Material_Color$Grey, _debois$elm_mdl$Material_Color$Grey, content);
};

var _debois$elm_mdl$Main$stylesheet = _debois$elm_mdl$Material_Options$stylesheet('\n  /* The following line is better done in html. We keep it here for\n     compatibility with elm-reactor.\n   */\n  @import url(\"assets/highlight/github-gist.css\");\n\n  blockquote:before { content: none; }\n  blockquote:after { content: none; }\n  blockquote {\n    border-left-style: solid;\n    border-width: 1px;\n    padding-left: 1.3ex;\n    border-color: rgb(255,82,82);\n      /* Really need a way to specify \"secondary color\" in\n         inline css.\n       */\n    font-style: normal;\n  }\n  p, blockquote {\n    max-width: 40em;\n  }\n\n  pre {\n    display: inline-block;\n    box-sizing: border-box;\n    min-width: 100%;\n    padding-top: .5rem;\n    padding-bottom: 1rem;\n    padding-left:1rem;\n    margin: 0;\n  }\n  code {\n    font-family: \'Roboto Mono\';\n  }\n  .mdl-layout__header--transparent {\n    background: url(\'https://getmdl.io/assets/demos/transparent.jpg\') center / cover;\n  }\n  .mdl-layout__header--transparent .mdl-layout__drawer-button {\n    /* This background is dark, so we set text to white. Use 87% black instead if\n       your background is light. */\n    color: white;\n  }\n');
var _debois$elm_mdl$Main$e404 = function (_p0) {
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				A3(
				_debois$elm_mdl$Material_Options$styled,
				_elm_lang$html$Html$h1,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Options$cs('mdl-typography--display-4'),
						_debois$elm_mdl$Material_Typography$center
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('404')
					]))
			]));
};
var _debois$elm_mdl$Main$nth = F2(
	function (k, xs) {
		return _elm_lang$core$List$head(
			A2(_elm_lang$core$List$drop, k, xs));
	});
var _debois$elm_mdl$Main$model = {mdl: _debois$elm_mdl$Material$model, buttons: _debois$elm_mdl$Demo_Buttons$model, badges: _debois$elm_mdl$Demo_Badges$model, layout: _debois$elm_mdl$Demo_Layout$model, menus: _debois$elm_mdl$Demo_Menus$model, textfields: _debois$elm_mdl$Demo_Textfields$model, toggles: _debois$elm_mdl$Demo_Toggles$model, snackbar: _debois$elm_mdl$Demo_Snackbar$model, tables: _debois$elm_mdl$Demo_Tables$model, loading: _debois$elm_mdl$Demo_Loading$model, footers: _debois$elm_mdl$Demo_Footer$model, tooltip: _debois$elm_mdl$Demo_Tooltip$model, tabs: _debois$elm_mdl$Demo_Tabs$model, slider: _debois$elm_mdl$Demo_Slider$model, typography: _debois$elm_mdl$Demo_Typography$model, cards: _debois$elm_mdl$Demo_Cards$model, lists: _debois$elm_mdl$Demo_Lists$model, dialog: _debois$elm_mdl$Demo_Dialog$model, elevation: _debois$elm_mdl$Demo_Elevation$model, chips: _debois$elm_mdl$Demo_Chips$model, select: _debois$elm_mdl$Demo_Select$model, selectedTab: 0, transparentHeader: false};
var _debois$elm_mdl$Main$Model = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return function (m) {
													return function (n) {
														return function (o) {
															return function (p) {
																return function (q) {
																	return function (r) {
																		return function (s) {
																			return function (t) {
																				return function (u) {
																					return function (v) {
																						return function (w) {
																							return {mdl: a, buttons: b, badges: c, layout: d, menus: e, textfields: f, toggles: g, snackbar: h, tables: i, loading: j, footers: k, tooltip: l, tabs: m, slider: n, typography: o, cards: p, lists: q, dialog: r, elevation: s, chips: t, select: u, selectedTab: v, transparentHeader: w};
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
};
var _debois$elm_mdl$Main$SelectMsg = function (a) {
	return {ctor: 'SelectMsg', _0: a};
};
var _debois$elm_mdl$Main$ChipMsg = function (a) {
	return {ctor: 'ChipMsg', _0: a};
};
var _debois$elm_mdl$Main$ElevationMsg = function (a) {
	return {ctor: 'ElevationMsg', _0: a};
};
var _debois$elm_mdl$Main$DialogMsg = function (a) {
	return {ctor: 'DialogMsg', _0: a};
};
var _debois$elm_mdl$Main$ToggleHeader = {ctor: 'ToggleHeader'};
var _debois$elm_mdl$Main$header = function (model) {
	return model.layout.withHeader ? _elm_lang$core$Native_List.fromArray(
		[
			A2(
			_debois$elm_mdl$Material_Layout$row,
			_elm_lang$core$Native_List.fromArray(
				[
					model.transparentHeader ? A2(_debois$elm_mdl$Material_Options$css, 'height', '192px') : _debois$elm_mdl$Material_Options$nop,
					A2(_debois$elm_mdl$Material_Options$css, 'transition', 'height 333ms ease-in-out 0s')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_Layout$title,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text('elm-mdl')
						])),
					_debois$elm_mdl$Material_Layout$spacer,
					A2(
					_debois$elm_mdl$Material_Layout$navigation,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_Layout$link,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Layout$onClick(_debois$elm_mdl$Main$ToggleHeader)
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Icon$i('photo')
								])),
							A2(
							_debois$elm_mdl$Material_Layout$link,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Layout$href('https://github.com/debois/elm-mdl')
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_elm_lang$html$Html$span,
									_elm_lang$core$Native_List.fromArray(
										[]),
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html$text('github')
										]))
								])),
							A2(
							_debois$elm_mdl$Material_Layout$link,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Layout$href('http://package.elm-lang.org/packages/debois/elm-mdl/latest/')
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('elm-package')
								]))
						]))
				]))
		]) : _elm_lang$core$Native_List.fromArray(
		[]);
};
var _debois$elm_mdl$Main$ListsMsg = function (a) {
	return {ctor: 'ListsMsg', _0: a};
};
var _debois$elm_mdl$Main$CardsMsg = function (a) {
	return {ctor: 'CardsMsg', _0: a};
};
var _debois$elm_mdl$Main$TypographyMsg = function (a) {
	return {ctor: 'TypographyMsg', _0: a};
};
var _debois$elm_mdl$Main$SliderMsg = function (a) {
	return {ctor: 'SliderMsg', _0: a};
};
var _debois$elm_mdl$Main$TabMsg = function (a) {
	return {ctor: 'TabMsg', _0: a};
};
var _debois$elm_mdl$Main$TooltipMsg = function (a) {
	return {ctor: 'TooltipMsg', _0: a};
};
var _debois$elm_mdl$Main$FooterMsg = function (a) {
	return {ctor: 'FooterMsg', _0: a};
};
var _debois$elm_mdl$Main$LoadingMsg = function (a) {
	return {ctor: 'LoadingMsg', _0: a};
};
var _debois$elm_mdl$Main$TablesMsg = function (a) {
	return {ctor: 'TablesMsg', _0: a};
};
var _debois$elm_mdl$Main$TogglesMsg = function (a) {
	return {ctor: 'TogglesMsg', _0: a};
};
var _debois$elm_mdl$Main$SnackbarMsg = function (a) {
	return {ctor: 'SnackbarMsg', _0: a};
};
var _debois$elm_mdl$Main$TextfieldMsg = function (a) {
	return {ctor: 'TextfieldMsg', _0: a};
};
var _debois$elm_mdl$Main$MenusMsg = function (a) {
	return {ctor: 'MenusMsg', _0: a};
};
var _debois$elm_mdl$Main$LayoutMsg = function (a) {
	return {ctor: 'LayoutMsg', _0: a};
};
var _debois$elm_mdl$Main$ButtonsMsg = function (a) {
	return {ctor: 'ButtonsMsg', _0: a};
};
var _debois$elm_mdl$Main$BadgesMsg = function (a) {
	return {ctor: 'BadgesMsg', _0: a};
};
var _debois$elm_mdl$Main$update = F2(
	function (action, model) {
		var _p1 = action;
		switch (_p1.ctor) {
			case 'SelectTab':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{selectedTab: _p1._0}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'ToggleHeader':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							transparentHeader: _elm_lang$core$Basics$not(model.transparentHeader)
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'Mdl':
				return A2(_debois$elm_mdl$Material$update, _p1._0, model);
			case 'ButtonsMsg':
				return A6(
					_debois$elm_mdl$Material_Helpers$lift,
					function (_) {
						return _.buttons;
					},
					F2(
						function (m, x) {
							return _elm_lang$core$Native_Utils.update(
								m,
								{buttons: x});
						}),
					_debois$elm_mdl$Main$ButtonsMsg,
					_debois$elm_mdl$Demo_Buttons$update,
					_p1._0,
					model);
			case 'BadgesMsg':
				return A6(
					_debois$elm_mdl$Material_Helpers$lift,
					function (_) {
						return _.badges;
					},
					F2(
						function (m, x) {
							return _elm_lang$core$Native_Utils.update(
								m,
								{badges: x});
						}),
					_debois$elm_mdl$Main$BadgesMsg,
					_debois$elm_mdl$Demo_Badges$update,
					_p1._0,
					model);
			case 'LayoutMsg':
				return A6(
					_debois$elm_mdl$Material_Helpers$lift,
					function (_) {
						return _.layout;
					},
					F2(
						function (m, x) {
							return _elm_lang$core$Native_Utils.update(
								m,
								{layout: x});
						}),
					_debois$elm_mdl$Main$LayoutMsg,
					_debois$elm_mdl$Demo_Layout$update,
					_p1._0,
					model);
			case 'MenusMsg':
				return A6(
					_debois$elm_mdl$Material_Helpers$lift,
					function (_) {
						return _.menus;
					},
					F2(
						function (m, x) {
							return _elm_lang$core$Native_Utils.update(
								m,
								{menus: x});
						}),
					_debois$elm_mdl$Main$MenusMsg,
					_debois$elm_mdl$Demo_Menus$update,
					_p1._0,
					model);
			case 'TextfieldMsg':
				return A2(
					_debois$elm_mdl$Material_Helpers$map2nd,
					_elm_lang$core$Platform_Cmd$map(_debois$elm_mdl$Main$TextfieldMsg),
					A2(
						_elm_lang$core$Maybe$withDefault,
						{ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none},
						A2(
							_elm_lang$core$Maybe$map,
							_debois$elm_mdl$Material_Helpers$map1st(
								function (x) {
									return _elm_lang$core$Native_Utils.update(
										model,
										{textfields: x});
								}),
							A2(_debois$elm_mdl$Demo_Textfields$update, _p1._0, model.textfields))));
			case 'SnackbarMsg':
				return A6(
					_debois$elm_mdl$Material_Helpers$lift,
					function (_) {
						return _.snackbar;
					},
					F2(
						function (m, x) {
							return _elm_lang$core$Native_Utils.update(
								m,
								{snackbar: x});
						}),
					_debois$elm_mdl$Main$SnackbarMsg,
					_debois$elm_mdl$Demo_Snackbar$update,
					_p1._0,
					model);
			case 'TogglesMsg':
				return A6(
					_debois$elm_mdl$Material_Helpers$lift,
					function (_) {
						return _.toggles;
					},
					F2(
						function (m, x) {
							return _elm_lang$core$Native_Utils.update(
								m,
								{toggles: x});
						}),
					_debois$elm_mdl$Main$TogglesMsg,
					_debois$elm_mdl$Demo_Toggles$update,
					_p1._0,
					model);
			case 'TablesMsg':
				return A6(
					_debois$elm_mdl$Material_Helpers$lift,
					function (_) {
						return _.tables;
					},
					F2(
						function (m, x) {
							return _elm_lang$core$Native_Utils.update(
								m,
								{tables: x});
						}),
					_debois$elm_mdl$Main$TablesMsg,
					_debois$elm_mdl$Demo_Tables$update,
					_p1._0,
					model);
			case 'LoadingMsg':
				return A6(
					_debois$elm_mdl$Material_Helpers$lift,
					function (_) {
						return _.loading;
					},
					F2(
						function (m, x) {
							return _elm_lang$core$Native_Utils.update(
								m,
								{loading: x});
						}),
					_debois$elm_mdl$Main$LoadingMsg,
					_debois$elm_mdl$Demo_Loading$update,
					_p1._0,
					model);
			case 'FooterMsg':
				return A6(
					_debois$elm_mdl$Material_Helpers$lift,
					function (_) {
						return _.footers;
					},
					F2(
						function (m, x) {
							return _elm_lang$core$Native_Utils.update(
								m,
								{footers: x});
						}),
					_debois$elm_mdl$Main$FooterMsg,
					_debois$elm_mdl$Demo_Footer$update,
					_p1._0,
					model);
			case 'SliderMsg':
				return A6(
					_debois$elm_mdl$Material_Helpers$lift,
					function (_) {
						return _.slider;
					},
					F2(
						function (m, x) {
							return _elm_lang$core$Native_Utils.update(
								m,
								{slider: x});
						}),
					_debois$elm_mdl$Main$SliderMsg,
					_debois$elm_mdl$Demo_Slider$update,
					_p1._0,
					model);
			case 'TooltipMsg':
				return A6(
					_debois$elm_mdl$Material_Helpers$lift,
					function (_) {
						return _.tooltip;
					},
					F2(
						function (m, x) {
							return _elm_lang$core$Native_Utils.update(
								m,
								{tooltip: x});
						}),
					_debois$elm_mdl$Main$TooltipMsg,
					_debois$elm_mdl$Demo_Tooltip$update,
					_p1._0,
					model);
			case 'TabMsg':
				return A6(
					_debois$elm_mdl$Material_Helpers$lift,
					function (_) {
						return _.tabs;
					},
					F2(
						function (m, x) {
							return _elm_lang$core$Native_Utils.update(
								m,
								{tabs: x});
						}),
					_debois$elm_mdl$Main$TabMsg,
					_debois$elm_mdl$Demo_Tabs$update,
					_p1._0,
					model);
			case 'TypographyMsg':
				return A6(
					_debois$elm_mdl$Material_Helpers$lift,
					function (_) {
						return _.typography;
					},
					F2(
						function (m, x) {
							return _elm_lang$core$Native_Utils.update(
								m,
								{typography: x});
						}),
					_debois$elm_mdl$Main$TypographyMsg,
					_debois$elm_mdl$Demo_Typography$update,
					_p1._0,
					model);
			case 'CardsMsg':
				return A6(
					_debois$elm_mdl$Material_Helpers$lift,
					function (_) {
						return _.cards;
					},
					F2(
						function (m, x) {
							return _elm_lang$core$Native_Utils.update(
								m,
								{cards: x});
						}),
					_debois$elm_mdl$Main$CardsMsg,
					_debois$elm_mdl$Demo_Cards$update,
					_p1._0,
					model);
			case 'ListsMsg':
				return A6(
					_debois$elm_mdl$Material_Helpers$lift,
					function (_) {
						return _.lists;
					},
					F2(
						function (m, x) {
							return _elm_lang$core$Native_Utils.update(
								m,
								{lists: x});
						}),
					_debois$elm_mdl$Main$ListsMsg,
					_debois$elm_mdl$Demo_Lists$update,
					_p1._0,
					model);
			case 'DialogMsg':
				return A6(
					_debois$elm_mdl$Material_Helpers$lift,
					function (_) {
						return _.dialog;
					},
					F2(
						function (m, x) {
							return _elm_lang$core$Native_Utils.update(
								m,
								{dialog: x});
						}),
					_debois$elm_mdl$Main$DialogMsg,
					_debois$elm_mdl$Demo_Dialog$update,
					_p1._0,
					model);
			case 'ElevationMsg':
				return A6(
					_debois$elm_mdl$Material_Helpers$lift,
					function (_) {
						return _.elevation;
					},
					F2(
						function (m, x) {
							return _elm_lang$core$Native_Utils.update(
								m,
								{elevation: x});
						}),
					_debois$elm_mdl$Main$ElevationMsg,
					_debois$elm_mdl$Demo_Elevation$update,
					_p1._0,
					model);
			case 'ChipMsg':
				return A6(
					_debois$elm_mdl$Material_Helpers$lift,
					function (_) {
						return _.chips;
					},
					F2(
						function (m, x) {
							return _elm_lang$core$Native_Utils.update(
								m,
								{chips: x});
						}),
					_debois$elm_mdl$Main$ChipMsg,
					_debois$elm_mdl$Demo_Chips$update,
					_p1._0,
					model);
			default:
				return A6(
					_debois$elm_mdl$Material_Helpers$lift,
					function (_) {
						return _.select;
					},
					F2(
						function (m, x) {
							return _elm_lang$core$Native_Utils.update(
								m,
								{select: x});
						}),
					_debois$elm_mdl$Main$SelectMsg,
					_debois$elm_mdl$Demo_Select$update,
					_p1._0,
					model);
		}
	});
var _debois$elm_mdl$Main$tabs = _elm_lang$core$Native_List.fromArray(
	[
		{
		ctor: '_Tuple3',
		_0: 'Buttons',
		_1: 'buttons',
		_2: function (_p2) {
			return A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Main$ButtonsMsg,
				_debois$elm_mdl$Demo_Buttons$view(
					function (_) {
						return _.buttons;
					}(_p2)));
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Select',
		_1: 'select',
		_2: function (_p3) {
			return A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Main$SelectMsg,
				_debois$elm_mdl$Demo_Select$view(
					function (_) {
						return _.select;
					}(_p3)));
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Badges',
		_1: 'badges',
		_2: function (_p4) {
			return A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Main$BadgesMsg,
				_debois$elm_mdl$Demo_Badges$view(
					function (_) {
						return _.badges;
					}(_p4)));
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Cards',
		_1: 'cards',
		_2: function (_p5) {
			return A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Main$CardsMsg,
				_debois$elm_mdl$Demo_Cards$view(
					function (_) {
						return _.cards;
					}(_p5)));
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Chips',
		_1: 'chips',
		_2: function (_p6) {
			return A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Main$ChipMsg,
				_debois$elm_mdl$Demo_Chips$view(
					function (_) {
						return _.chips;
					}(_p6)));
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Dialog',
		_1: 'dialog',
		_2: function (_p7) {
			return A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Main$DialogMsg,
				_debois$elm_mdl$Demo_Dialog$view(
					function (_) {
						return _.dialog;
					}(_p7)));
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Elevation',
		_1: 'elevation',
		_2: function (_p8) {
			return A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Main$ElevationMsg,
				_debois$elm_mdl$Demo_Elevation$view(
					function (_) {
						return _.elevation;
					}(_p8)));
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Footers',
		_1: 'footers',
		_2: function (_p9) {
			return A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Main$FooterMsg,
				_debois$elm_mdl$Demo_Footer$view(
					function (_) {
						return _.footers;
					}(_p9)));
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Grid',
		_1: 'grid',
		_2: function (_p10) {
			return _debois$elm_mdl$Demo_Grid$view;
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Layout',
		_1: 'layout',
		_2: function (_p11) {
			return A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Main$LayoutMsg,
				_debois$elm_mdl$Demo_Layout$view(
					function (_) {
						return _.layout;
					}(_p11)));
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Lists',
		_1: 'lists',
		_2: function (_p12) {
			return A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Main$ListsMsg,
				_debois$elm_mdl$Demo_Lists$view(
					function (_) {
						return _.lists;
					}(_p12)));
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Loading',
		_1: 'loading',
		_2: function (_p13) {
			return A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Main$LoadingMsg,
				_debois$elm_mdl$Demo_Loading$view(
					function (_) {
						return _.loading;
					}(_p13)));
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Menus',
		_1: 'menus',
		_2: function (_p14) {
			return A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Main$MenusMsg,
				_debois$elm_mdl$Demo_Menus$view(
					function (_) {
						return _.menus;
					}(_p14)));
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Sliders',
		_1: 'sliders',
		_2: function (_p15) {
			return A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Main$SliderMsg,
				_debois$elm_mdl$Demo_Slider$view(
					function (_) {
						return _.slider;
					}(_p15)));
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Snackbar',
		_1: 'snackbar',
		_2: function (_p16) {
			return A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Main$SnackbarMsg,
				_debois$elm_mdl$Demo_Snackbar$view(
					function (_) {
						return _.snackbar;
					}(_p16)));
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Tables',
		_1: 'tables',
		_2: function (_p17) {
			return A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Main$TablesMsg,
				_debois$elm_mdl$Demo_Tables$view(
					function (_) {
						return _.tables;
					}(_p17)));
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Tabs',
		_1: 'tabs',
		_2: function (_p18) {
			return A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Main$TabMsg,
				_debois$elm_mdl$Demo_Tabs$view(
					function (_) {
						return _.tabs;
					}(_p18)));
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Textfields',
		_1: 'textfields',
		_2: function (_p19) {
			return A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Main$TextfieldMsg,
				_debois$elm_mdl$Demo_Textfields$view(
					function (_) {
						return _.textfields;
					}(_p19)));
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Toggles',
		_1: 'toggles',
		_2: function (_p20) {
			return A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Main$TogglesMsg,
				_debois$elm_mdl$Demo_Toggles$view(
					function (_) {
						return _.toggles;
					}(_p20)));
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Tooltips',
		_1: 'tooltips',
		_2: function (_p21) {
			return A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Main$TooltipMsg,
				_debois$elm_mdl$Demo_Tooltip$view(
					function (_) {
						return _.tooltip;
					}(_p21)));
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Typography',
		_1: 'typography',
		_2: function (_p22) {
			return A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Main$TypographyMsg,
				_debois$elm_mdl$Demo_Typography$view(
					function (_) {
						return _.typography;
					}(_p22)));
		}
	}
	]);
var _debois$elm_mdl$Main$tabTitles = A2(
	_elm_lang$core$List$map,
	function (_p23) {
		var _p24 = _p23;
		return _elm_lang$html$Html$text(_p24._0);
	},
	_debois$elm_mdl$Main$tabs);
var _debois$elm_mdl$Main$tabViews = _elm_lang$core$Array$fromList(
	A2(
		_elm_lang$core$List$map,
		function (_p25) {
			var _p26 = _p25;
			return _p26._2;
		},
		_debois$elm_mdl$Main$tabs));
var _debois$elm_mdl$Main$tabUrls = _elm_lang$core$Array$fromList(
	A2(
		_elm_lang$core$List$map,
		function (_p27) {
			var _p28 = _p27;
			return _p28._1;
		},
		_debois$elm_mdl$Main$tabs));
var _debois$elm_mdl$Main$urlOf = function (model) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'#',
		A2(
			_elm_lang$core$Maybe$withDefault,
			'',
			A2(_elm_lang$core$Array$get, model.selectedTab, _debois$elm_mdl$Main$tabUrls)));
};
var _debois$elm_mdl$Main$delta2url = F2(
	function (model1, model2) {
		return (!_elm_lang$core$Native_Utils.eq(model1.selectedTab, model2.selectedTab)) ? _elm_lang$core$Maybe$Just(
			{
				entry: _rgrempel$elm_route_url$RouteUrl$NewEntry,
				url: _debois$elm_mdl$Main$urlOf(model2)
			}) : _elm_lang$core$Maybe$Nothing;
	});
var _debois$elm_mdl$Main$urlTabs = _elm_lang$core$Dict$fromList(
	A2(
		_elm_lang$core$List$indexedMap,
		F2(
			function (idx, _p29) {
				var _p30 = _p29;
				return {ctor: '_Tuple2', _0: _p30._1, _1: idx};
			}),
		_debois$elm_mdl$Main$tabs));
var _debois$elm_mdl$Main$Mdl = function (a) {
	return {ctor: 'Mdl', _0: a};
};
var _debois$elm_mdl$Main$drawer = _elm_lang$core$Native_List.fromArray(
	[
		A2(
		_debois$elm_mdl$Material_Layout$title,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html$text('Example drawer')
			])),
		A2(
		_debois$elm_mdl$Material_Layout$navigation,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_Layout$link,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Layout$href('https://github.com/debois/elm-mdl')
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('github')
					])),
				A2(
				_debois$elm_mdl$Material_Layout$link,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Layout$href('http://package.elm-lang.org/packages/debois/elm-mdl/latest/')
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('elm-package')
					])),
				A2(
				_debois$elm_mdl$Material_Layout$link,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Layout$href('#cards'),
						_debois$elm_mdl$Material_Layout$onClick(
						_debois$elm_mdl$Material_Layout$toggleDrawer(_debois$elm_mdl$Main$Mdl))
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('Card component')
					]))
			]))
	]);
var _debois$elm_mdl$Main$SelectTab = function (a) {
	return {ctor: 'SelectTab', _0: a};
};
var _debois$elm_mdl$Main$view$ = function (model) {
	var top = A2(
		_elm_lang$core$Maybe$withDefault,
		_debois$elm_mdl$Main$e404,
		A2(_elm_lang$core$Array$get, model.selectedTab, _debois$elm_mdl$Main$tabViews))(model);
	return function (contents) {
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					A3(_debois$elm_mdl$Material_Scheme$topWithScheme, model.layout.primary, model.layout.accent, contents),
					A3(
					_elm_lang$html$Html$node,
					'script',
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_elm_lang$html$Html_Attributes$attribute, 'src', 'https://cdn.polyfill.io/v2/polyfill.js?features=Event.focusin')
						]),
					_elm_lang$core$Native_List.fromArray(
						[])),
					A3(
					_elm_lang$html$Html$node,
					'script',
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_elm_lang$html$Html_Attributes$attribute, 'src', 'assets/highlight/highlight.pack.js')
						]),
					_elm_lang$core$Native_List.fromArray(
						[])),
					function () {
					var _p31 = A2(_debois$elm_mdl$Main$nth, model.selectedTab, _debois$elm_mdl$Main$tabs);
					if (((_p31.ctor === 'Just') && (_p31._0.ctor === '_Tuple3')) && (_p31._0._0 === 'Dialog')) {
						return A2(
							_elm_lang$html$Html_App$map,
							_debois$elm_mdl$Main$DialogMsg,
							_debois$elm_mdl$Demo_Dialog$element(model.dialog));
					} else {
						return A2(
							_elm_lang$html$Html$div,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[]));
					}
				}()
				]));
	}(
		A4(
			_debois$elm_mdl$Material_Layout$render,
			_debois$elm_mdl$Main$Mdl,
			model.mdl,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Layout$selectedTab(model.selectedTab),
					_debois$elm_mdl$Material_Layout$onSelectTab(_debois$elm_mdl$Main$SelectTab),
					A2(_debois$elm_mdl$Material_Options$when, _debois$elm_mdl$Material_Layout$fixedHeader, model.layout.fixedHeader),
					A2(_debois$elm_mdl$Material_Options$when, _debois$elm_mdl$Material_Layout$fixedDrawer, model.layout.fixedDrawer),
					A2(_debois$elm_mdl$Material_Options$when, _debois$elm_mdl$Material_Layout$fixedTabs, model.layout.fixedTabs),
					A2(
					_debois$elm_mdl$Material_Options$when,
					function () {
						var _p32 = model.layout.header;
						switch (_p32.ctor) {
							case 'Waterfall':
								return _debois$elm_mdl$Material_Layout$waterfall(_p32._0);
							case 'Seamed':
								return _debois$elm_mdl$Material_Layout$seamed;
							case 'Standard':
								return _debois$elm_mdl$Material_Options$nop;
							default:
								return _debois$elm_mdl$Material_Layout$scrolling;
						}
					}(),
					model.layout.withHeader),
					model.transparentHeader ? _debois$elm_mdl$Material_Layout$transparentHeader : _debois$elm_mdl$Material_Options$nop
				]),
			{
				header: _debois$elm_mdl$Main$header(model),
				drawer: model.layout.withDrawer ? _debois$elm_mdl$Main$drawer : _elm_lang$core$Native_List.fromArray(
					[]),
				tabs: model.layout.withTabs ? {
					ctor: '_Tuple2',
					_0: _debois$elm_mdl$Main$tabTitles,
					_1: _elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Color$background(
							A2(_debois$elm_mdl$Material_Color$color, model.layout.primary, _debois$elm_mdl$Material_Color$S400))
						])
				} : {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_List.fromArray(
						[]),
					_1: _elm_lang$core$Native_List.fromArray(
						[])
				},
				main: _elm_lang$core$Native_List.fromArray(
					[_debois$elm_mdl$Main$stylesheet, top])
			}));
};
var _debois$elm_mdl$Main$view = _elm_lang$html$Html_Lazy$lazy(_debois$elm_mdl$Main$view$);
var _debois$elm_mdl$Main$location2messages = function (location) {
	return _elm_lang$core$Native_List.fromArray(
		[
			function () {
			var _p33 = A2(_elm_lang$core$String$dropLeft, 1, location.hash);
			if (_p33 === '') {
				return _debois$elm_mdl$Main$SelectTab(0);
			} else {
				return _debois$elm_mdl$Main$SelectTab(
					A2(
						_elm_lang$core$Maybe$withDefault,
						-1,
						A2(_elm_lang$core$Dict$get, _p33, _debois$elm_mdl$Main$urlTabs)));
			}
		}()
		]);
};
var _debois$elm_mdl$Main$main = {
	main: _rgrempel$elm_route_url$RouteUrl$program(
		{
			delta2url: _debois$elm_mdl$Main$delta2url,
			location2messages: _debois$elm_mdl$Main$location2messages,
			init: {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_Utils.update(
					_debois$elm_mdl$Main$model,
					{
						mdl: A2(_debois$elm_mdl$Material_Layout$setTabsWidth, 2124, _debois$elm_mdl$Main$model.mdl)
					}),
				_1: _debois$elm_mdl$Material$init(_debois$elm_mdl$Main$Mdl)
			},
			view: _debois$elm_mdl$Main$view,
			subscriptions: function (model) {
				return _elm_lang$core$Platform_Sub$batch(
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$core$Platform_Sub$map,
							_debois$elm_mdl$Main$MenusMsg,
							A2(_debois$elm_mdl$Material_Menu$subs, _debois$elm_mdl$Demo_Menus$Mdl, model.menus.mdl)),
							A2(
							_elm_lang$core$Platform_Sub$map,
							_debois$elm_mdl$Main$SelectMsg,
							A2(_debois$elm_mdl$Material_Select$subs, _debois$elm_mdl$Demo_Select$Mdl, model.select.mdl)),
							A2(_debois$elm_mdl$Material$subscriptions, _debois$elm_mdl$Main$Mdl, model)
						]));
			},
			update: _debois$elm_mdl$Main$update
		})
};

var Elm = {};
Elm['Main'] = Elm['Main'] || {};
_elm_lang$core$Native_Platform.addPublicModule(Elm['Main'], 'Main', typeof _debois$elm_mdl$Main$main === 'undefined' ? null : _debois$elm_mdl$Main$main);

if (typeof define === "function" && define['amd'])
{
  define([], function() { return Elm; });
  return;
}

if (typeof module === "object")
{
  module['exports'] = Elm;
  return;
}

var globalElm = this['Elm'];
if (typeof globalElm === "undefined")
{
  this['Elm'] = Elm;
  return;
}

for (var publicModule in Elm)
{
  if (publicModule in globalElm)
  {
    throw new Error('There are two Elm modules called `' + publicModule + '` on this page! Rename one of them.');
  }
  globalElm[publicModule] = Elm[publicModule];
}

}).call(this);

