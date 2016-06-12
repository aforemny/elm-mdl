
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

function eq(rootX, rootY)
{
	var stack = [{ x: rootX, y: rootY }];
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
			for (var key in x)
			{
				++c;
				if (!(key in y))
				{
					return false;
				}
				if (key === 'ctor')
				{
					continue;
				}
				stack.push({ x: x[key], y: y[key] });
			}
			if ('ctor' in x)
			{
				stack.push({ x: x.ctor, y: y.ctor});
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

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

var LT = -1, EQ = 0, GT = 1;

function cmp(x, y)
{
	var ord;
	if (typeof x !== 'object')
	{
		return x === y ? EQ : x < y ? LT : GT;
	}
	else if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
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

		if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin' || v.ctor === 'Set_elm_builtin')
		{
			var name, list;
			if (v.ctor === 'Set_elm_builtin')
			{
				name = 'Set';
				list = A2(
					_elm_lang$core$List$map,
					function(x) {return x._0; },
					_elm_lang$core$Dict$toList(v._0)
				);
			}
			else
			{
				name = 'Dict';
				list = _elm_lang$core$Dict$toList(v);
			}
			return name + '.fromList ' + toString(list);
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
var _elm_lang$core$List$take = F2(
	function (n, list) {
		if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
			return _elm_lang$core$Native_List.fromArray(
				[]);
		} else {
			var _p22 = list;
			if (_p22.ctor === '[]') {
				return list;
			} else {
				return A2(
					_elm_lang$core$List_ops['::'],
					_p22._0,
					A2(_elm_lang$core$List$take, n - 1, _p22._1));
			}
		}
	});
var _elm_lang$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return result;
			} else {
				var _v23 = A2(_elm_lang$core$List_ops['::'], value, result),
					_v24 = n - 1,
					_v25 = value;
				result = _v23;
				n = _v24;
				value = _v25;
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
	var subs = _elm_lang$core$Native_List.Nil;
	var converter = effectManagers[name].converter;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function onEffects(router, subList, state)
	{
		subs = subList;
		return init;
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function send(value)
	{
		var result = A2(_elm_lang$core$Json_Decode$decodeValue, converter, value);
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
		numSteps = step(numSteps, process);
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
					return (_elm_lang$core$Native_Utils.cmp(_p5, rKey) < 0) ? {
						ctor: '_Tuple2',
						_0: _p7,
						_1: A3(leftStep, _p5, _p6, _p9)
					} : ((_elm_lang$core$Native_Utils.cmp(_p5, rKey) > 0) ? {
						ctor: '_Tuple2',
						_0: _p8,
						_1: A3(rightStep, rKey, rValue, _p9)
					} : {
						ctor: '_Tuple2',
						_0: _p7,
						_1: A4(bothStep, _p5, _p6, rValue, _p9)
					});
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
	_v11_2:
	do {
		if (_p13.ctor === 'RBNode_elm_builtin') {
			if (_p13._0.ctor === 'BBlack') {
				return true;
			} else {
				break _v11_2;
			}
		} else {
			if (_p13._0.ctor === 'LBBlack') {
				return true;
			} else {
				break _v11_2;
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
				var _v13 = A2(_elm_lang$core$Dict$sizeHelp, n + 1, _p14._4),
					_v14 = _p14._3;
				n = _v13;
				dict = _v14;
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
						var _v17 = targetKey,
							_v18 = _p15._3;
						targetKey = _v17;
						dict = _v18;
						continue get;
					case 'EQ':
						return _elm_lang$core$Maybe$Just(_p15._2);
					default:
						var _v19 = targetKey,
							_v20 = _p15._4;
						targetKey = _v19;
						dict = _v20;
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
				var _v23 = _p18._1,
					_v24 = _p18._2,
					_v25 = _p18._4;
				k = _v23;
				v = _v24;
				r = _v25;
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
	_v33_6:
	do {
		_v33_5:
		do {
			_v33_4:
			do {
				_v33_3:
				do {
					_v33_2:
					do {
						_v33_1:
						do {
							_v33_0:
							do {
								if (_p27.ctor === 'RBNode_elm_builtin') {
									if (_p27._3.ctor === 'RBNode_elm_builtin') {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._3._0.ctor) {
												case 'Red':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v33_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v33_1;
																} else {
																	if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																		break _v33_2;
																	} else {
																		if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																			break _v33_3;
																		} else {
																			break _v33_6;
																		}
																	}
																}
															}
														case 'NBlack':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v33_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v33_1;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																		break _v33_4;
																	} else {
																		break _v33_6;
																	}
																}
															}
														default:
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v33_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v33_1;
																} else {
																	break _v33_6;
																}
															}
													}
												case 'NBlack':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v33_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v33_3;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v33_5;
																	} else {
																		break _v33_6;
																	}
																}
															}
														case 'NBlack':
															if (_p27._0.ctor === 'BBlack') {
																if ((((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																	break _v33_4;
																} else {
																	if ((((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v33_5;
																	} else {
																		break _v33_6;
																	}
																}
															} else {
																break _v33_6;
															}
														default:
															if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																break _v33_5;
															} else {
																break _v33_6;
															}
													}
												default:
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v33_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v33_3;
																} else {
																	break _v33_6;
																}
															}
														case 'NBlack':
															if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																break _v33_4;
															} else {
																break _v33_6;
															}
														default:
															break _v33_6;
													}
											}
										} else {
											switch (_p27._3._0.ctor) {
												case 'Red':
													if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
														break _v33_0;
													} else {
														if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
															break _v33_1;
														} else {
															break _v33_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
														break _v33_5;
													} else {
														break _v33_6;
													}
												default:
													break _v33_6;
											}
										}
									} else {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._4._0.ctor) {
												case 'Red':
													if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
														break _v33_2;
													} else {
														if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
															break _v33_3;
														} else {
															break _v33_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
														break _v33_4;
													} else {
														break _v33_6;
													}
												default:
													break _v33_6;
											}
										} else {
											break _v33_6;
										}
									}
								} else {
									break _v33_6;
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
				return badPrimitive('something custom', value);
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
		node: null
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
	var eventNode = { tagger: tagger, parent: null };

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
		domNode: null,
		eventNode: null
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
		patches.push(makePatch('p-remove', rootIndex, aLen - bLen));
	}
	else if (aLen < bLen)
	{
		patches.push(makePatch('p-insert', rootIndex, bChildren.slice(aLen)));
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

		case 'p-remove':
			var i = patch.data;
			while (i--)
			{
				domNode.removeChild(domNode.lastChild);
			}
			return domNode;

		case 'p-insert':
			var newNodes = patch.data;
			for (var i = 0; i < newNodes.length; i++)
			{
				domNode.appendChild(render(newNodes[i], patch.eventNode));
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

	programWithFlags: programWithFlags
};

}();
var _elm_lang$virtual_dom$VirtualDom$programWithFlags = _elm_lang$virtual_dom$Native_VirtualDom.programWithFlags;
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

var _elm_lang$html$Html_Attributes$attribute = _elm_lang$virtual_dom$VirtualDom$attribute;
var _elm_lang$html$Html_Attributes$contextmenu = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'contextmenu', value);
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
var _elm_lang$html$Html_Attributes$draggable = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'draggable', value);
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
var _elm_lang$html$Html_Attributes$list = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'list', value);
};
var _elm_lang$html$Html_Attributes$minlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'minLength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$maxlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'maxLength',
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
var _elm_lang$html$Html_Attributes$datetime = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'datetime', value);
};
var _elm_lang$html$Html_Attributes$pubdate = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'pubdate', value);
};
var _elm_lang$html$Html_Attributes$start = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'start',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$colspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'colSpan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$headers = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'headers', value);
};
var _elm_lang$html$Html_Attributes$rowspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'rowSpan',
		_elm_lang$core$Basics$toString(n));
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

var _debois$elm_mdl$Material_Options_Internal$None = {ctor: 'None'};
var _debois$elm_mdl$Material_Options_Internal$Set = function (a) {
	return {ctor: 'Set', _0: a};
};
var _debois$elm_mdl$Material_Options_Internal$Many = function (a) {
	return {ctor: 'Many', _0: a};
};
var _debois$elm_mdl$Material_Options_Internal$Attribute = function (a) {
	return {ctor: 'Attribute', _0: a};
};
var _debois$elm_mdl$Material_Options_Internal$attribute = _debois$elm_mdl$Material_Options_Internal$Attribute;
var _debois$elm_mdl$Material_Options_Internal$CSS = function (a) {
	return {ctor: 'CSS', _0: a};
};
var _debois$elm_mdl$Material_Options_Internal$Class = function (a) {
	return {ctor: 'Class', _0: a};
};

var _debois$elm_mdl$Material_Options$onHover = function (x) {
	return _debois$elm_mdl$Material_Options_Internal$Attribute(
		A2(
			_elm_lang$html$Html_Events$on,
			'mouseover',
			_elm_lang$core$Json_Decode$succeed(x)));
};
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
var _debois$elm_mdl$Material_Options$nop = _debois$elm_mdl$Material_Options_Internal$None;
var _debois$elm_mdl$Material_Options$many = _debois$elm_mdl$Material_Options_Internal$Many;
var _debois$elm_mdl$Material_Options$css = F2(
	function (key, value) {
		return _debois$elm_mdl$Material_Options_Internal$CSS(
			{ctor: '_Tuple2', _0: key, _1: value});
	});
var _debois$elm_mdl$Material_Options$cs$ = F2(
	function (c, b) {
		return b ? _debois$elm_mdl$Material_Options_Internal$Class(c) : _debois$elm_mdl$Material_Options_Internal$None;
	});
var _debois$elm_mdl$Material_Options$cs = function (c) {
	return _debois$elm_mdl$Material_Options_Internal$Class(c);
};
var _debois$elm_mdl$Material_Options$addAttributes = F2(
	function (summary, attrs) {
		return _elm_lang$core$List$concat(
			_elm_lang$core$Native_List.fromArray(
				[
					attrs,
					_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$style(summary.css)
					]),
					_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$class(
						A2(_elm_lang$core$String$join, ' ', summary.classes))
					]),
					summary.attrs
				]));
	});
var _debois$elm_mdl$Material_Options$collect1 = F3(
	function (f, option, acc) {
		var _p0 = option;
		switch (_p0.ctor) {
			case 'Class':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						classes: A2(_elm_lang$core$List_ops['::'], _p0._0, acc.classes)
					});
			case 'CSS':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						css: A2(_elm_lang$core$List_ops['::'], _p0._0, acc.css)
					});
			case 'Attribute':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						attrs: A2(_elm_lang$core$List_ops['::'], _p0._0, acc.attrs)
					});
			case 'Many':
				return A3(
					_elm_lang$core$List$foldl,
					_debois$elm_mdl$Material_Options$collect1(f),
					acc,
					_p0._0);
			case 'Set':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						config: A2(f, _p0._0, acc.config)
					});
			default:
				return acc;
		}
	});
var _debois$elm_mdl$Material_Options$recollect = _elm_lang$core$List$foldl(
	_debois$elm_mdl$Material_Options$collect1(
		F2(
			function (x, y) {
				return x(y);
			})));
var _debois$elm_mdl$Material_Options$collect = function (config0) {
	return _debois$elm_mdl$Material_Options$recollect(
		{
			classes: _elm_lang$core$Native_List.fromArray(
				[]),
			css: _elm_lang$core$Native_List.fromArray(
				[]),
			attrs: _elm_lang$core$Native_List.fromArray(
				[]),
			config: config0
		});
};
var _debois$elm_mdl$Material_Options$apply = F4(
	function (summary, ctor, options, attrs) {
		return ctor(
			A2(
				_debois$elm_mdl$Material_Options$addAttributes,
				A2(_debois$elm_mdl$Material_Options$recollect, summary, options),
				A2(_elm_lang$core$List$filterMap, _elm_lang$core$Basics$identity, attrs)));
	});
var _debois$elm_mdl$Material_Options$collect$ = function (options) {
	return A3(
		_elm_lang$core$List$foldl,
		_debois$elm_mdl$Material_Options$collect1(
			F2(
				function (_p2, _p1) {
					return {ctor: '_Tuple0'};
				})),
		{
			classes: _elm_lang$core$Native_List.fromArray(
				[]),
			css: _elm_lang$core$Native_List.fromArray(
				[]),
			attrs: _elm_lang$core$Native_List.fromArray(
				[]),
			config: {ctor: '_Tuple0'}
		},
		options);
};
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
var _debois$elm_mdl$Material_Options$Summary = F4(
	function (a, b, c, d) {
		return {classes: a, css: b, attrs: c, config: d};
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
			_elm_lang$core$Native_List.fromArray(
				[summary.config.onClick]),
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
var _debois$elm_mdl$Material_Helpers$key = function (k) {
	return A2(
		_elm_lang$html$Html_Attributes$property,
		'key',
		_elm_lang$core$Json_Encode$string(k));
};
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
var _debois$elm_mdl$Material_Helpers$fx = function (msg) {
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
var _debois$elm_parts$Parts$update = F3(
	function (fwd, _p4, c) {
		var _p5 = _p4;
		return A2(
			_debois$elm_parts$Parts$map2nd,
			_elm_lang$core$Platform_Cmd$map(fwd),
			_p5._0(c));
	});
var _debois$elm_parts$Parts$indexed = F4(
	function (get, set, model0, idx) {
		return {
			ctor: '_Tuple2',
			_0: function (c) {
				return A2(
					_elm_lang$core$Maybe$withDefault,
					model0,
					A2(
						_elm_lang$core$Dict$get,
						idx,
						get(c)));
			},
			_1: F2(
				function (model, c) {
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
		var _p6 = A4(_debois$elm_parts$Parts$indexed, get0, set0, model0, idx);
		var get = _p6._0;
		var set = _p6._1;
		return {
			get: get,
			set: set,
			map: F2(
				function (f, c) {
					return A3(
						_elm_lang$core$Basics$flip,
						set,
						c,
						f(
							get(c)));
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
var _debois$elm_parts$Parts$embedUpdate = F5(
	function (get, set, update, msg, c) {
		return A2(
			_debois$elm_parts$Parts$map1st,
			A2(_elm_lang$core$Basics$flip, set, c),
			A2(
				update,
				msg,
				get(c)));
	});
var _debois$elm_parts$Parts$embedView = F2(
	function (get, view) {
		return function (_p7) {
			return view(
				get(_p7));
		};
	});
var _debois$elm_parts$Parts$Accessors = F4(
	function (a, b, c, d) {
		return {get: a, set: b, map: c, reset: d};
	});
var _debois$elm_parts$Parts$Msg = function (a) {
	return {ctor: 'Msg', _0: a};
};
var _debois$elm_parts$Parts$pack = F2(
	function (upd, msg) {
		return _debois$elm_parts$Parts$Msg(
			function (_p8) {
				return A2(
					_debois$elm_parts$Parts$map2nd,
					_elm_lang$core$Platform_Cmd$map(
						_debois$elm_parts$Parts$pack(upd)),
					A2(upd, msg, _p8));
			});
	});
var _debois$elm_parts$Parts$create = F7(
	function (view, update, get0, set0, model0, f, idx) {
		var _p9 = A4(_debois$elm_parts$Parts$indexed, get0, set0, model0, idx);
		var get = _p9._0;
		var set = _p9._1;
		var embeddedUpdate = A3(_debois$elm_parts$Parts$embedUpdate, get, set, update);
		var embeddedView = A2(
			_debois$elm_parts$Parts$embedView,
			get,
			view(
				function (_p10) {
					return f(
						A2(_debois$elm_parts$Parts$pack, embeddedUpdate, _p10));
				}));
		return embeddedView;
	});
var _debois$elm_parts$Parts$create1 = F5(
	function (view, update, get, set, f) {
		var embeddedUpdate = A3(_debois$elm_parts$Parts$embedUpdate, get, set, update);
		var embeddedView = A2(
			_debois$elm_parts$Parts$embedView,
			get,
			view(
				function (_p11) {
					return f(
						A2(_debois$elm_parts$Parts$pack, embeddedUpdate, _p11));
				}));
		return embeddedView;
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
	_debois$elm_dom$DOM$target(_debois$elm_dom$DOM$boundingClientRect),
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
var _debois$elm_mdl$Material_Ripple$Tick = {ctor: 'Tick'};
var _debois$elm_mdl$Material_Ripple$update = F2(
	function (action, model) {
		var _p3 = action;
		switch (_p3.ctor) {
			case 'Down':
				var _p4 = _p3._0;
				return (_elm_lang$core$Native_Utils.eq(_p4.type$, 'mousedown') && model.ignoringMouseDown) ? A2(
					_debois$elm_mdl$Material_Helpers$effect,
					_elm_lang$core$Platform_Cmd$none,
					_elm_lang$core$Native_Utils.update(
						model,
						{ignoringMouseDown: false})) : A2(
					_debois$elm_mdl$Material_Helpers$effect,
					_debois$elm_mdl$Material_Helpers$cssTransitionStep(_debois$elm_mdl$Material_Ripple$Tick),
					_elm_lang$core$Native_Utils.update(
						model,
						{
							animation: _debois$elm_mdl$Material_Ripple$Frame(0),
							metrics: _debois$elm_mdl$Material_Ripple$computeMetrics(_p4),
							ignoringMouseDown: _elm_lang$core$Native_Utils.eq(_p4.type$, 'touchstart') ? true : model.ignoringMouseDown
						}));
			case 'Up':
				return A2(
					_debois$elm_mdl$Material_Helpers$effect,
					_elm_lang$core$Platform_Cmd$none,
					_elm_lang$core$Native_Utils.update(
						model,
						{animation: _debois$elm_mdl$Material_Ripple$Inert}));
			default:
				return A2(
					_debois$elm_mdl$Material_Helpers$effect,
					_elm_lang$core$Platform_Cmd$none,
					_elm_lang$core$Native_Utils.update(
						model,
						{
							animation: _debois$elm_mdl$Material_Ripple$Frame(1)
						}));
		}
	});
var _debois$elm_mdl$Material_Ripple$Up = {ctor: 'Up'};
var _debois$elm_mdl$Material_Ripple$upOn = function (name) {
	return A2(
		_elm_lang$html$Html_Events$on,
		name,
		_elm_lang$core$Json_Decode$succeed(_debois$elm_mdl$Material_Ripple$Up));
};
var _debois$elm_mdl$Material_Ripple$Down = function (a) {
	return {ctor: 'Down', _0: a};
};
var _debois$elm_mdl$Material_Ripple$downOn = function (name) {
	return A2(
		_elm_lang$html$Html_Events$on,
		name,
		A2(_elm_lang$core$Json_Decode$map, _debois$elm_mdl$Material_Ripple$Down, _debois$elm_mdl$Material_Ripple$geometryDecoder));
};
var _debois$elm_mdl$Material_Ripple$view = F2(
	function (attrs, model) {
		var styling = function () {
			var _p5 = {ctor: '_Tuple2', _0: model.metrics, _1: model.animation};
			if ((_p5.ctor === '_Tuple2') && (_p5._0.ctor === 'Just')) {
				if (_p5._1.ctor === 'Frame') {
					return A2(_debois$elm_mdl$Material_Ripple$styles, _p5._0._0, _p5._1._0);
				} else {
					return A2(_debois$elm_mdl$Material_Ripple$styles, _p5._0._0, 1);
				}
			} else {
				return _elm_lang$core$Native_List.fromArray(
					[]);
			}
		}();
		return A2(
			_elm_lang$html$Html$span,
			A2(
				_elm_lang$core$List_ops['::'],
				_debois$elm_mdl$Material_Ripple$downOn('mousedown'),
				A2(
					_elm_lang$core$List_ops['::'],
					_debois$elm_mdl$Material_Ripple$downOn('touchstart'),
					A2(
						_elm_lang$core$List_ops['::'],
						_debois$elm_mdl$Material_Ripple$upOn('mouseup'),
						A2(
							_elm_lang$core$List_ops['::'],
							_debois$elm_mdl$Material_Ripple$upOn('mouseleave'),
							A2(
								_elm_lang$core$List_ops['::'],
								_debois$elm_mdl$Material_Ripple$upOn('touchend'),
								A2(
									_elm_lang$core$List_ops['::'],
									_debois$elm_mdl$Material_Ripple$upOn('blur'),
									attrs)))))),
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

var _debois$elm_mdl$Material_Button$icon = _debois$elm_mdl$Material_Options$cs('mdl-button--icon');
var _debois$elm_mdl$Material_Button$minifab = _debois$elm_mdl$Material_Options$cs('mdl-button--mini-fab');
var _debois$elm_mdl$Material_Button$fab = _debois$elm_mdl$Material_Options$cs('mdl-button--fab');
var _debois$elm_mdl$Material_Button$raised = _debois$elm_mdl$Material_Options$cs('mdl-button--raised');
var _debois$elm_mdl$Material_Button$flat = _debois$elm_mdl$Material_Options$nop;
var _debois$elm_mdl$Material_Button$accent = _debois$elm_mdl$Material_Options$cs('mdl-button--accent');
var _debois$elm_mdl$Material_Button$primary = _debois$elm_mdl$Material_Options$cs('mdl-button--primary');
var _debois$elm_mdl$Material_Button$colored = _debois$elm_mdl$Material_Options$cs('mdl-button--colored');
var _debois$elm_mdl$Material_Button$plain = _debois$elm_mdl$Material_Options$cs('mdl-button--colored');
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
var _debois$elm_mdl$Material_Button$defaultConfig = {ripple: false, onClick: _elm_lang$core$Maybe$Nothing, disabled: false};
var _debois$elm_mdl$Material_Button$view = F4(
	function (lift, model, config, html) {
		var summary = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Button$defaultConfig, config);
		return A5(
			_debois$elm_mdl$Material_Options$apply,
			summary,
			_elm_lang$html$Html$button,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$cs('mdl-button'),
					_debois$elm_mdl$Material_Options$cs('mdl-js-button')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$core$Maybe$Just(
					_debois$elm_mdl$Material_Helpers$blurOn('mouseup')),
					_elm_lang$core$Maybe$Just(
					_debois$elm_mdl$Material_Helpers$blurOn('mouseleave')),
					summary.config.onClick,
					summary.config.disabled ? _elm_lang$core$Maybe$Just(
					_elm_lang$html$Html_Attributes$disabled(true)) : _elm_lang$core$Maybe$Nothing
				]),
			summary.config.ripple ? A2(
				_elm_lang$core$List_ops['::'],
				A2(
					_elm_lang$html$Html_App$map,
					lift,
					A2(
						_debois$elm_mdl$Material_Ripple$view,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html_Attributes$class('mdl-button__ripple-container'),
								_debois$elm_mdl$Material_Helpers$blurOn('mouseup')
							]),
						model)),
				html) : html);
	});
var _debois$elm_mdl$Material_Button$update = function (action) {
	return _debois$elm_mdl$Material_Ripple$update(
		A2(_elm_lang$core$Debug$log, 'Action', action));
};
var _debois$elm_mdl$Material_Button$render = A5(
	_debois$elm_parts$Parts$create,
	_debois$elm_mdl$Material_Button$view,
	_debois$elm_mdl$Material_Button$update,
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
var _debois$elm_mdl$Material_Button$Config = F3(
	function (a, b, c) {
		return {ripple: a, onClick: b, disabled: c};
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
var _debois$elm_mdl$Material_Textfield$password = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{
				type$: _elm_lang$html$Html_Attributes$type$('password')
			});
	});
var _debois$elm_mdl$Material_Textfield$onInput = function (f) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					onInput: _elm_lang$core$Maybe$Just(
						A2(
							_elm_lang$html$Html_Events$on,
							'input',
							A2(_elm_lang$core$Json_Decode$map, f, _elm_lang$html$Html_Events$targetValue)))
				});
		});
};
var _debois$elm_mdl$Material_Textfield$disabled = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{disabled: true});
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
var _debois$elm_mdl$Material_Textfield$defaultConfig = {
	labelText: _elm_lang$core$Maybe$Nothing,
	labelFloat: false,
	error: _elm_lang$core$Maybe$Nothing,
	value: _elm_lang$core$Maybe$Nothing,
	disabled: false,
	type$: _elm_lang$html$Html_Attributes$type$('text'),
	onInput: _elm_lang$core$Maybe$Nothing
};
var _debois$elm_mdl$Material_Textfield$Config = F7(
	function (a, b, c, d, e, f, g) {
		return {labelText: a, labelFloat: b, error: c, value: d, disabled: e, onInput: f, type$: g};
	});
var _debois$elm_mdl$Material_Textfield$Model = F2(
	function (a, b) {
		return {isFocused: a, value: b};
	});
var _debois$elm_mdl$Material_Textfield$Input = function (a) {
	return {ctor: 'Input', _0: a};
};
var _debois$elm_mdl$Material_Textfield$Focus = {ctor: 'Focus'};
var _debois$elm_mdl$Material_Textfield$Blur = {ctor: 'Blur'};
var _debois$elm_mdl$Material_Textfield$view$ = F3(
	function (lift, model, options) {
		var _p1 = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Textfield$defaultConfig, options);
		var summary = _p1;
		var config = _p1.config;
		var val = A2(_elm_lang$core$Maybe$withDefault, model.value, config.value);
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
					config.disabled ? _debois$elm_mdl$Material_Options$cs('is-disabled') : _debois$elm_mdl$Material_Options$nop
				]),
			_elm_lang$core$Native_List.fromArray(
				[config.onInput]),
			A2(
				_elm_lang$core$List$filterMap,
				function (x) {
					return x;
				},
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$core$Maybe$Just(
						A2(
							_elm_lang$html$Html$input,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html_Attributes$class('mdl-textfield__input'),
									_elm_lang$html$Html_Attributes$style(
									_elm_lang$core$Native_List.fromArray(
										[
											{ctor: '_Tuple2', _0: 'outline', _1: 'none'}
										])),
									config.type$,
									_elm_lang$html$Html_Attributes$disabled(config.disabled),
									_elm_lang$html$Html_Events$onBlur(
									lift(_debois$elm_mdl$Material_Textfield$Blur)),
									_elm_lang$html$Html_Events$onFocus(
									lift(_debois$elm_mdl$Material_Textfield$Focus)),
									function () {
									var _p2 = config.value;
									if (_p2.ctor === 'Just') {
										return _elm_lang$html$Html_Attributes$value(_p2._0);
									} else {
										return A2(
											_elm_lang$html$Html_Events$on,
											'input',
											A2(
												_elm_lang$core$Json_Decode$map,
												function (_p3) {
													return lift(
														_debois$elm_mdl$Material_Textfield$Input(_p3));
												},
												_elm_lang$html$Html_Events$targetValue));
									}
								}()
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))),
						_elm_lang$core$Maybe$Just(
						A2(
							_elm_lang$html$Html$label,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html_Attributes$class('mdl-textfield__label')
								]),
							function () {
								var _p4 = config.labelText;
								if (_p4.ctor === 'Just') {
									return _elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html$text(_p4._0)
										]);
								} else {
									return _elm_lang$core$Native_List.fromArray(
										[]);
								}
							}())),
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
						config.error)
					])));
	});
var _debois$elm_mdl$Material_Textfield$view = _debois$elm_mdl$Material_Textfield$view$(
	function (x) {
		return x;
	});
var _debois$elm_mdl$Material_Textfield$render = A5(
	_debois$elm_parts$Parts$create,
	_debois$elm_mdl$Material_Textfield$view$,
	F2(
		function (action, model) {
			return {
				ctor: '_Tuple2',
				_0: A2(_debois$elm_mdl$Material_Textfield$update, action, model),
				_1: _elm_lang$core$Platform_Cmd$none
			};
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
				A2(
					_elm_lang$core$Json_Decode$andThen,
					_debois$elm_dom$DOM$childNodes(_debois$elm_dom$DOM$offsetTop),
					function (_p0) {
						return _elm_lang$core$Json_Decode$succeed(
							_elm_lang$core$Array$fromList(_p0));
					})))),
	_debois$elm_dom$DOM$target(
		_debois$elm_dom$DOM$nextSibling(
			A2(
				_debois$elm_dom$DOM$childNode,
				1,
				A2(
					_elm_lang$core$Json_Decode$andThen,
					_debois$elm_dom$DOM$childNodes(_debois$elm_dom$DOM$offsetHeight),
					function (_p1) {
						return _elm_lang$core$Json_Decode$succeed(
							_elm_lang$core$Array$fromList(_p1));
					})))));
var _debois$elm_mdl$Material_Menu_Geometry$decode$ = A6(
	_elm_lang$core$Json_Decode$object5,
	_debois$elm_mdl$Material_Menu_Geometry$Geometry,
	_debois$elm_dom$DOM$target(
		_debois$elm_dom$DOM$parentElement(
			_debois$elm_dom$DOM$parentElement(
				_debois$elm_dom$DOM$previousSibling(_debois$elm_mdl$Material_Menu_Geometry$element)))),
	_debois$elm_dom$DOM$target(
		_debois$elm_dom$DOM$parentElement(_debois$elm_mdl$Material_Menu_Geometry$element)),
	_debois$elm_dom$DOM$target(
		_debois$elm_dom$DOM$parentElement(
			_debois$elm_dom$DOM$parentElement(_debois$elm_mdl$Material_Menu_Geometry$element))),
	_debois$elm_dom$DOM$target(
		_debois$elm_dom$DOM$parentElement(
			A2(
				_elm_lang$core$Json_Decode$andThen,
				_debois$elm_dom$DOM$childNodes(_debois$elm_dom$DOM$offsetTop),
				function (_p2) {
					return _elm_lang$core$Json_Decode$succeed(
						_elm_lang$core$Array$fromList(_p2));
				}))),
	_debois$elm_dom$DOM$target(
		_debois$elm_dom$DOM$parentElement(
			A2(
				_elm_lang$core$Json_Decode$andThen,
				_debois$elm_dom$DOM$childNodes(_debois$elm_dom$DOM$offsetHeight),
				function (_p3) {
					return _elm_lang$core$Json_Decode$succeed(
						_elm_lang$core$Array$fromList(_p3));
				}))));

var _debois$elm_mdl$Material_Menu$css$ = F3(
	function (k, v, p) {
		return p ? A2(_debois$elm_mdl$Material_Options$css, k, v) : _debois$elm_mdl$Material_Options$nop;
	});
var _debois$elm_mdl$Material_Menu$cs$ = F2(
	function (c, p) {
		return p ? _debois$elm_mdl$Material_Options$cs(c) : _debois$elm_mdl$Material_Options$nop;
	});
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
var _debois$elm_mdl$Material_Menu$onClick = F2(
	function (decoder, action) {
		return A3(
			_elm_lang$html$Html_Events$onWithOptions,
			'click',
			_elm_lang$html$Html_Events$defaultOptions,
			A2(_elm_lang$core$Json_Decode$map, action, decoder));
	});
var _debois$elm_mdl$Material_Menu$outlineGeometry = F2(
	function (config, geometry) {
		return _elm_lang$core$Native_List.fromArray(
			[]);
	});
var _debois$elm_mdl$Material_Menu$ripple = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{ripple: true});
	});
var _debois$elm_mdl$Material_Menu$constant = {transitionDurationSeconds: 0.3, transitionDurationFraction: 0.8, closeTimeout: 150};
var _debois$elm_mdl$Material_Menu$Model = F3(
	function (a, b, c) {
		return {items: a, animationState: b, geometry: c};
	});
var _debois$elm_mdl$Material_Menu$Item = F3(
	function (a, b, c) {
		return {divider: a, enabled: b, html: c};
	});
var _debois$elm_mdl$Material_Menu$Config = F2(
	function (a, b) {
		return {alignment: a, ripple: b};
	});
var _debois$elm_mdl$Material_Menu$Closing = {ctor: 'Closing'};
var _debois$elm_mdl$Material_Menu$Opened = {ctor: 'Opened'};
var _debois$elm_mdl$Material_Menu$Opening = {ctor: 'Opening'};
var _debois$elm_mdl$Material_Menu$Idle = {ctor: 'Idle'};
var _debois$elm_mdl$Material_Menu$defaultModel = {items: _elm_lang$core$Dict$empty, animationState: _debois$elm_mdl$Material_Menu$Idle, geometry: _elm_lang$core$Maybe$Nothing};
var _debois$elm_mdl$Material_Menu$Ripple = F2(
	function (a, b) {
		return {ctor: 'Ripple', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Menu$Tick = {ctor: 'Tick'};
var _debois$elm_mdl$Material_Menu$Close = function (a) {
	return {ctor: 'Close', _0: a};
};
var _debois$elm_mdl$Material_Menu$update = F2(
	function (action, model) {
		var _p1 = action;
		switch (_p1.ctor) {
			case 'Open':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							animationState: function () {
								var _p2 = model.animationState;
								if (_p2.ctor === 'Opened') {
									return _debois$elm_mdl$Material_Menu$Opened;
								} else {
									return _debois$elm_mdl$Material_Menu$Opening;
								}
							}(),
							geometry: _elm_lang$core$Maybe$Just(_p1._0)
						}),
					_1: _debois$elm_mdl$Material_Helpers$cssTransitionStep(_debois$elm_mdl$Material_Menu$Tick)
				};
			case 'Tick':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{animationState: _debois$elm_mdl$Material_Menu$Opened}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'Close':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							animationState: _debois$elm_mdl$Material_Menu$Idle,
							geometry: _elm_lang$core$Maybe$Just(_p1._0)
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'Select':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{animationState: _debois$elm_mdl$Material_Menu$Closing}),
					_1: A2(
						_debois$elm_mdl$Material_Helpers$delay,
						_debois$elm_mdl$Material_Menu$constant.closeTimeout,
						_debois$elm_mdl$Material_Menu$Close(_p1._1))
				};
			default:
				var _p4 = _p1._0;
				var _p3 = A2(
					_debois$elm_mdl$Material_Ripple$update,
					_p1._1,
					A2(
						_elm_lang$core$Maybe$withDefault,
						_debois$elm_mdl$Material_Ripple$model,
						A2(_elm_lang$core$Dict$get, _p4, model.items)));
				var model$ = _p3._0;
				var effects = _p3._1;
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							items: A3(_elm_lang$core$Dict$insert, _p4, model$, model.items)
						}),
					_1: A2(
						_elm_lang$core$Platform_Cmd$map,
						_debois$elm_mdl$Material_Menu$Ripple(_p4),
						effects)
				};
		}
	});
var _debois$elm_mdl$Material_Menu$Select = F2(
	function (a, b) {
		return {ctor: 'Select', _0: a, _1: b};
	});
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
var _debois$elm_mdl$Material_Menu$makeItem = F5(
	function (lift, config, model, n, item) {
		var height = A2(
			_elm_lang$core$Maybe$withDefault,
			0,
			A2(
				_elm_lang$core$Maybe$map,
				function (geometry) {
					return geometry.menu.bounds.height;
				},
				model.geometry));
		var offsetHeight = function (n) {
			return A2(
				_elm_lang$core$Maybe$withDefault,
				0,
				A3(
					_elm_lang$core$Basics$flip,
					_elm_lang$core$Maybe$andThen,
					function (_p5) {
						return A2(
							_elm_lang$core$Array$get,
							n - 1,
							function (_) {
								return _.offsetHeights;
							}(_p5));
					},
					model.geometry));
		};
		var offsetTop = function (n) {
			return A2(
				_elm_lang$core$Maybe$withDefault,
				0,
				A3(
					_elm_lang$core$Basics$flip,
					_elm_lang$core$Maybe$andThen,
					function (_p6) {
						return A2(
							_elm_lang$core$Array$get,
							n - 1,
							function (_) {
								return _.offsetTops;
							}(_p6));
					},
					model.geometry));
		};
		var transitionDuration = _debois$elm_mdl$Material_Menu$constant.transitionDurationSeconds * _debois$elm_mdl$Material_Menu$constant.transitionDurationFraction;
		var itemDelay = (_elm_lang$core$Native_Utils.eq(config.alignment, _debois$elm_mdl$Material_Menu$TopLeft) || _elm_lang$core$Native_Utils.eq(config.alignment, _debois$elm_mdl$Material_Menu$TopRight)) ? A3(
			_elm_lang$core$Basics$flip,
			F2(
				function (x, y) {
					return A2(_elm_lang$core$Basics_ops['++'], x, y);
				}),
			's',
			_elm_lang$core$Basics$toString(
				(((height - offsetTop(n)) - offsetHeight(n)) / height) * transitionDuration)) : A3(
			_elm_lang$core$Basics$flip,
			F2(
				function (x, y) {
					return A2(_elm_lang$core$Basics_ops['++'], x, y);
				}),
			's',
			_elm_lang$core$Basics$toString(
				(offsetTop(n) / height) * transitionDuration));
		return A4(
			_debois$elm_mdl$Material_Options$styled$,
			_elm_lang$html$Html$li,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$cs('mdl-menu__item'),
					A3(
					_debois$elm_mdl$Material_Menu$css$,
					'transition-delay',
					itemDelay,
					_elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opening) || _elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opened)),
					A2(_debois$elm_mdl$Material_Menu$cs$, 'mdl-js-ripple-effect', config.ripple),
					A2(_debois$elm_mdl$Material_Menu$cs$, 'mdl-menu__item--full-bleed-divider', item.divider)
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					item.enabled ? A2(
					_debois$elm_mdl$Material_Menu$onClick,
					_debois$elm_mdl$Material_Menu_Geometry$decode$,
					function (_p7) {
						return lift(
							A2(_debois$elm_mdl$Material_Menu$Select, n, _p7));
					}) : A2(_elm_lang$html$Html_Attributes$attribute, 'disabled', 'disabled'),
					A2(
					_elm_lang$html$Html_Attributes$property,
					'tabindex',
					_elm_lang$core$Json_Encode$string('-1'))
				]),
			config.ripple ? _elm_lang$core$Native_List.fromArray(
				[
					item.html,
					A2(
					_elm_lang$html$Html_App$map,
					function (_p8) {
						return lift(
							A2(_debois$elm_mdl$Material_Menu$Ripple, n, _p8));
					},
					A2(
						_debois$elm_mdl$Material_Ripple$view,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html_Attributes$class('mdl-menu__item-ripple-container')
							]),
						A2(
							_elm_lang$core$Maybe$withDefault,
							_debois$elm_mdl$Material_Ripple$model,
							A2(_elm_lang$core$Dict$get, n, model.items))))
				]) : _elm_lang$core$Native_List.fromArray(
				[item.html]));
	});
var _debois$elm_mdl$Material_Menu$BottomRight = {ctor: 'BottomRight'};
var _debois$elm_mdl$Material_Menu$bottomRight = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{alignment: _debois$elm_mdl$Material_Menu$BottomRight});
	});
var _debois$elm_mdl$Material_Menu$BottomLeft = {ctor: 'BottomLeft'};
var _debois$elm_mdl$Material_Menu$defaultConfig = {alignment: _debois$elm_mdl$Material_Menu$BottomLeft, ripple: false};
var _debois$elm_mdl$Material_Menu$bottomLeft = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{alignment: _debois$elm_mdl$Material_Menu$BottomLeft});
	});
var _debois$elm_mdl$Material_Menu$containerGeometry = F2(
	function (config, geometry) {
		return _elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_Options$css,
				'width',
				_debois$elm_mdl$Material_Menu$toPx(geometry.menu.bounds.width)),
				A2(
				_debois$elm_mdl$Material_Options$css,
				'height',
				_debois$elm_mdl$Material_Menu$toPx(geometry.menu.bounds.height)),
				(_elm_lang$core$Native_Utils.eq(config.alignment, _debois$elm_mdl$Material_Menu$BottomRight) || _elm_lang$core$Native_Utils.eq(config.alignment, _debois$elm_mdl$Material_Menu$BottomLeft)) ? A2(
				_debois$elm_mdl$Material_Options$css,
				'top',
				_debois$elm_mdl$Material_Menu$toPx(geometry.button.offsetTop + geometry.button.offsetHeight)) : _debois$elm_mdl$Material_Options$nop,
				function () {
				if (_elm_lang$core$Native_Utils.eq(config.alignment, _debois$elm_mdl$Material_Menu$BottomRight) || _elm_lang$core$Native_Utils.eq(config.alignment, _debois$elm_mdl$Material_Menu$TopRight)) {
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
				if (_elm_lang$core$Native_Utils.eq(config.alignment, _debois$elm_mdl$Material_Menu$TopLeft) || _elm_lang$core$Native_Utils.eq(config.alignment, _debois$elm_mdl$Material_Menu$TopRight)) {
					var bottom = geometry.container.bounds.top + geometry.container.bounds.height;
					return A2(
						_debois$elm_mdl$Material_Options$css,
						'bottom',
						_debois$elm_mdl$Material_Menu$toPx(bottom - geometry.button.bounds.top));
				} else {
					return _debois$elm_mdl$Material_Options$nop;
				}
			}(),
				(_elm_lang$core$Native_Utils.eq(config.alignment, _debois$elm_mdl$Material_Menu$TopLeft) || _elm_lang$core$Native_Utils.eq(config.alignment, _debois$elm_mdl$Material_Menu$BottomLeft)) ? A2(
				_debois$elm_mdl$Material_Options$css,
				'left',
				_debois$elm_mdl$Material_Menu$toPx(geometry.menu.offsetLeft)) : _debois$elm_mdl$Material_Options$nop
			]);
	});
var _debois$elm_mdl$Material_Menu$view$ = F4(
	function (lift, model, properties, items) {
		var summary = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Menu$defaultConfig, properties);
		var config = summary.config;
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$html$Html_App$map,
					lift,
					A4(
						_debois$elm_mdl$Material_Options$styled$,
						_elm_lang$html$Html$button,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Options$cs('mdl-button'),
								_debois$elm_mdl$Material_Options$cs('mdl-js-button'),
								_debois$elm_mdl$Material_Options$cs('mdl-button--icon')
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Material_Menu$onClick,
								_debois$elm_mdl$Material_Menu_Geometry$decode,
								_elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opened) ? _debois$elm_mdl$Material_Menu$Close : _debois$elm_mdl$Material_Menu$Open)
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Material_Icon$view,
								'more_vert',
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
							_debois$elm_mdl$Material_Menu$cs$,
							'is-visible',
							_elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opened) || _elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Closing)),
							A2(
							_elm_lang$core$Maybe$withDefault,
							_debois$elm_mdl$Material_Options$nop,
							A2(
								_elm_lang$core$Maybe$map,
								function (_p9) {
									return _debois$elm_mdl$Material_Options$many(
										A2(_debois$elm_mdl$Material_Menu$containerGeometry, config, _p9));
								},
								model.geometry))
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A3(
							_debois$elm_mdl$Material_Options$styled,
							_elm_lang$html$Html$div,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Options$cs('mdl-menu__outline'),
									_debois$elm_mdl$Material_Options$many(
									A2(
										_elm_lang$core$Maybe$withDefault,
										_elm_lang$core$Native_List.fromArray(
											[]),
										A2(
											_elm_lang$core$Maybe$map,
											function (geometry) {
												return _elm_lang$core$Native_List.fromArray(
													[
														A2(
														_debois$elm_mdl$Material_Options$css,
														'width',
														_debois$elm_mdl$Material_Menu$toPx(geometry.menu.bounds.width)),
														A2(
														_debois$elm_mdl$Material_Options$css,
														'height',
														_debois$elm_mdl$Material_Menu$toPx(geometry.menu.bounds.height))
													]);
											},
											model.geometry))),
									function () {
									var _p10 = config.alignment;
									switch (_p10.ctor) {
										case 'BottomLeft':
											return _debois$elm_mdl$Material_Options$cs('mdl-menu--bottom-left');
										case 'BottomRight':
											return _debois$elm_mdl$Material_Options$cs('mdl-menu--bottom-right');
										case 'TopLeft':
											return _debois$elm_mdl$Material_Options$cs('mdl-menu--top-left');
										default:
											return _debois$elm_mdl$Material_Options$cs('mdl-menu--top-right');
									}
								}()
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
									function () {
									var _p11 = config.alignment;
									switch (_p11.ctor) {
										case 'BottomLeft':
											return _debois$elm_mdl$Material_Options$cs('mdl-menu--bottom-left');
										case 'BottomRight':
											return _debois$elm_mdl$Material_Options$cs('mdl-menu--bottom-right');
										case 'TopLeft':
											return _debois$elm_mdl$Material_Options$cs('mdl-menu--top-left');
										default:
											return _debois$elm_mdl$Material_Options$cs('mdl-menu--top-right');
									}
								}(),
									A2(
									_debois$elm_mdl$Material_Menu$cs$,
									'is-animating',
									_elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opening) || _elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Closing)),
									A2(
									_elm_lang$core$Maybe$withDefault,
									_debois$elm_mdl$Material_Options$nop,
									A2(
										_elm_lang$core$Maybe$map,
										function (geometry) {
											var height = geometry.menu.bounds.height;
											var width = geometry.menu.bounds.width;
											return A2(
												_debois$elm_mdl$Material_Options$css,
												'clip',
												function () {
													if (_elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opened) || _elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Closing)) {
														return A4(_debois$elm_mdl$Material_Menu$rect, 0, width, height, 0);
													} else {
														var _p12 = config.alignment;
														switch (_p12.ctor) {
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
										},
										model.geometry))
								]),
							A3(
								_elm_lang$core$List$map2,
								A3(_debois$elm_mdl$Material_Menu$makeItem, lift, config, model),
								_elm_lang$core$Native_List.range(
									1,
									_elm_lang$core$List$length(items)),
								items))
						]))
				]));
	});
var _debois$elm_mdl$Material_Menu$view = _debois$elm_mdl$Material_Menu$view$(_elm_lang$core$Basics$identity);
var _debois$elm_mdl$Material_Menu$render = A5(
	_debois$elm_parts$Parts$create,
	_debois$elm_mdl$Material_Menu$view$,
	_debois$elm_mdl$Material_Menu$update,
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
					]))
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
								A3(
									_elm_lang$core$Basics$flip,
									_elm_lang$core$Maybe$andThen,
									function (_) {
										return _.action;
									},
									contents))))),
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
						A3(
							_elm_lang$core$Basics$flip,
							_elm_lang$core$Maybe$andThen,
							function (_) {
								return _.action;
							},
							contents))))
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
						_debois$elm_mdl$Material_Helpers$fx(
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
										_debois$elm_mdl$Material_Helpers$fx(
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
											_debois$elm_mdl$Material_Helpers$fx(_debois$elm_mdl$Material_Snackbar$Timeout)),
											_debois$elm_mdl$Material_Helpers$fx(
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

return {
	onDocument: F3(on(document)),
	onWindow: F3(on(window))
};

}();

var _elm_lang$dom$Dom_LowLevel$onWindow = _elm_lang$dom$Native_Dom.onWindow;
var _elm_lang$dom$Dom_LowLevel$onDocument = _elm_lang$dom$Native_Dom.onDocument;

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

var _debois$elm_mdl$Material_Layout$drawerView = F2(
	function (model, elems) {
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$classList(
					_elm_lang$core$Native_List.fromArray(
						[
							{ctor: '_Tuple2', _0: 'mdl-layout__drawer', _1: true},
							{ctor: '_Tuple2', _0: 'is-visible', _1: model.isDrawerOpen}
						]))
				]),
			elems);
	});
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
				styles),
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
		return A2(
			_elm_lang$html$Html$nav,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$class('mdl-navigation')
				]),
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
var _debois$elm_mdl$Material_Layout$selectedTab = function (k) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{selectedTab: k});
		});
};
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
var _debois$elm_mdl$Material_Layout$defaultModel = {ripples: _elm_lang$core$Dict$empty, isSmallScreen: false, isCompact: false, isAnimating: false, isScrolled: false, isDrawerOpen: false};
var _debois$elm_mdl$Material_Layout$Model = F6(
	function (a, b, c, d, e, f) {
		return {ripples: a, isSmallScreen: b, isCompact: c, isAnimating: d, isScrolled: e, isDrawerOpen: f};
	});
var _debois$elm_mdl$Material_Layout$Config = F7(
	function (a, b, c, d, e, f, g) {
		return {fixedHeader: a, fixedDrawer: b, fixedTabs: c, rippleTabs: d, mode: e, selectedTab: f, onSelectTab: g};
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
var _debois$elm_mdl$Material_Layout$update = F2(
	function (action, model) {
		update:
		while (true) {
			var _p5 = action;
			switch (_p5.ctor) {
				case 'NOP':
					return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
				case 'SmallScreen':
					var _p6 = _p5._0;
					return _debois$elm_mdl$Material_Helpers$pure(
						_elm_lang$core$Native_Utils.update(
							model,
							{
								isSmallScreen: _p6,
								isDrawerOpen: _elm_lang$core$Basics$not(_p6) && model.isDrawerOpen
							}));
				case 'ToggleDrawer':
					return _debois$elm_mdl$Material_Helpers$pure(
						_elm_lang$core$Native_Utils.update(
							model,
							{
								isDrawerOpen: _elm_lang$core$Basics$not(model.isDrawerOpen)
							}));
				case 'Ripple':
					var _p7 = _p5._0;
					return A2(
						_debois$elm_mdl$Material_Helpers$map2nd,
						_elm_lang$core$Platform_Cmd$map(
							_debois$elm_mdl$Material_Layout$Ripple(_p7)),
						A2(
							_debois$elm_mdl$Material_Helpers$map1st,
							function (ripple$) {
								return _elm_lang$core$Native_Utils.update(
									model,
									{
										ripples: A3(_elm_lang$core$Dict$insert, _p7, ripple$, model.ripples)
									});
							},
							A2(
								_debois$elm_mdl$Material_Ripple$update,
								_p5._1,
								A2(
									_elm_lang$core$Maybe$withDefault,
									_debois$elm_mdl$Material_Ripple$model,
									A2(_elm_lang$core$Dict$get, _p7, model.ripples)))));
				case 'ScrollTab':
					return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
				case 'ScrollPane':
					var isScrolled = _elm_lang$core$Native_Utils.cmp(0.0, _p5._1) < 0;
					if (!_elm_lang$core$Native_Utils.eq(isScrolled, model.isScrolled)) {
						var _v3 = _debois$elm_mdl$Material_Layout$TransitionHeader(
							{toCompact: isScrolled, fixedHeader: _p5._0}),
							_v4 = model;
						action = _v3;
						model = _v4;
						continue update;
					} else {
						return _debois$elm_mdl$Material_Helpers$pure(model);
					}
				case 'TransitionHeader':
					var _p8 = _p5._0.toCompact;
					var headerVisible = _elm_lang$core$Basics$not(model.isSmallScreen) || _p5._0.fixedHeader;
					var model$ = _elm_lang$core$Native_Utils.update(
						model,
						{isCompact: _p8, isAnimating: headerVisible});
					return _elm_lang$core$Basics$not(model.isAnimating) ? {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{isCompact: _p8, isAnimating: headerVisible}),
						_1: A2(_debois$elm_mdl$Material_Helpers$delay, 200, _debois$elm_mdl$Material_Layout$TransitionEnd)
					} : _debois$elm_mdl$Material_Helpers$pure(model);
				default:
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{isAnimating: false}),
						_1: _elm_lang$core$Platform_Cmd$none
					};
			}
		}
	});
var _debois$elm_mdl$Material_Layout$pack = function () {
	var embeddedUpdate = A3(
		_debois$elm_parts$Parts$embedUpdate,
		function (_) {
			return _.layout;
		},
		F2(
			function (x, c) {
				return _elm_lang$core$Native_Utils.update(
					c,
					{layout: x});
			}),
		_debois$elm_mdl$Material_Layout$update);
	return _debois$elm_parts$Parts$pack(embeddedUpdate);
}();
var _debois$elm_mdl$Material_Layout$ScrollPane = F2(
	function (a, b) {
		return {ctor: 'ScrollPane', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Layout$ScrollTab = function (a) {
	return {ctor: 'ScrollTab', _0: a};
};
var _debois$elm_mdl$Material_Layout$SmallScreen = function (a) {
	return {ctor: 'SmallScreen', _0: a};
};
var _debois$elm_mdl$Material_Layout$smallScreenWatch = function (_p9) {
	return _debois$elm_mdl$Material_Layout$SmallScreen(
		A2(
			F2(
				function (x, y) {
					return _elm_lang$core$Native_Utils.cmp(x, y) > 0;
				}),
			1024,
			_p9));
};
var _debois$elm_mdl$Material_Layout$init = function () {
	var msg = A3(
		_elm_lang$core$Task$perform,
		function (_p10) {
			return _debois$elm_mdl$Material_Layout$smallScreenWatch(
				A2(_elm_lang$core$Debug$log, 'Can\'t get initial window dimensions. Guessing ', 1025));
		},
		_debois$elm_mdl$Material_Layout$smallScreenWatch,
		_elm_lang$window$Window$width);
	return {ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Layout$defaultModel, _1: msg};
}();
var _debois$elm_mdl$Material_Layout$sub0 = function (lift) {
	return A2(
		_elm_lang$core$Platform_Cmd$map,
		function (_p11) {
			return lift(
				_debois$elm_mdl$Material_Layout$pack(_p11));
		},
		_elm_lang$core$Basics$snd(_debois$elm_mdl$Material_Layout$init));
};
var _debois$elm_mdl$Material_Layout$subscriptions = function () {
	var sub = _elm_lang$window$Window$resizes(
		function (_p12) {
			return _debois$elm_mdl$Material_Layout$smallScreenWatch(
				function (_) {
					return _.width;
				}(_p12));
		});
	return _elm_lang$core$Basics$always(sub);
}();
var _debois$elm_mdl$Material_Layout$subs = function (lift) {
	return function (_p13) {
		return A2(
			_elm_lang$core$Platform_Sub$map,
			function (_p14) {
				return lift(
					_debois$elm_mdl$Material_Layout$pack(_p14));
			},
			_debois$elm_mdl$Material_Layout$subscriptions(_p13));
	};
};
var _debois$elm_mdl$Material_Layout$ToggleDrawer = {ctor: 'ToggleDrawer'};
var _debois$elm_mdl$Material_Layout$drawerButton = function (lift) {
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$class('mdl-layout__drawer-button'),
				_elm_lang$html$Html_Attributes$tabindex(0),
				_elm_lang$html$Html_Events$onClick(
				lift(_debois$elm_mdl$Material_Layout$ToggleDrawer)),
				A3(
				_elm_lang$html$Html_Events$onWithOptions,
				'keydown',
				{stopPropagation: false, preventDefault: true},
				A2(
					_elm_lang$core$Json_Decode$map,
					function (_p15) {
						return lift(
							function (key) {
								var _p16 = key;
								switch (_p16) {
									case 32:
										return _debois$elm_mdl$Material_Layout$ToggleDrawer;
									case 13:
										return _debois$elm_mdl$Material_Layout$ToggleDrawer;
									default:
										return _debois$elm_mdl$Material_Layout$NOP;
								}
							}(_p15));
					},
					_elm_lang$html$Html_Events$keyCode))
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				_debois$elm_mdl$Material_Icon$i('menu')
			]));
};
var _debois$elm_mdl$Material_Layout$obfuscator = F2(
	function (lift, model) {
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$classList(
					_elm_lang$core$Native_List.fromArray(
						[
							{ctor: '_Tuple2', _0: 'mdl-layout__obfuscator', _1: true},
							{ctor: '_Tuple2', _0: 'is-visible', _1: model.isDrawerOpen}
						])),
					_elm_lang$html$Html_Events$onClick(
					lift(_debois$elm_mdl$Material_Layout$ToggleDrawer))
				]),
			_elm_lang$core$Native_List.fromArray(
				[]));
	});
var _debois$elm_mdl$Material_Layout$toggleDrawer = function (lift) {
	return function (_p17) {
		return lift(
			_debois$elm_mdl$Material_Layout$pack(_p17));
	}(_debois$elm_mdl$Material_Layout$ToggleDrawer);
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
var _debois$elm_mdl$Material_Layout$defaultConfig = {fixedHeader: false, fixedDrawer: false, fixedTabs: false, rippleTabs: true, mode: _debois$elm_mdl$Material_Layout$Standard, onSelectTab: _elm_lang$core$Maybe$Nothing, selectedTab: -1};
var _debois$elm_mdl$Material_Layout$tabsView = F4(
	function (lift, config, model, _p18) {
		var _p19 = _p18;
		var _p21 = _p19._1;
		var chevron = F2(
			function (direction, offset) {
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
								A2(_elm_lang$core$Basics_ops['++'], direction, '-button'))),
							_debois$elm_mdl$Material_Options$many(_p21)
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_Icon$view,
							A2(_elm_lang$core$Basics_ops['++'], 'chevron_', direction),
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Icon$size24,
									_debois$elm_mdl$Material_Icon$onClick(
									lift(
										_debois$elm_mdl$Material_Layout$ScrollTab(offset)))
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
					A2(chevron, 'left', -100),
					A2(
					_debois$elm_mdl$Material_Options$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Options$cs('mdl-layout__tab-bar'),
							config.rippleTabs ? _debois$elm_mdl$Material_Options$many(
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Options$cs('mdl-js-ripple-effect'),
									_debois$elm_mdl$Material_Options$cs('mds-js-ripple-effect--ignore-events')
								])) : _debois$elm_mdl$Material_Options$nop,
							_elm_lang$core$Native_Utils.eq(config.mode, _debois$elm_mdl$Material_Layout$Standard) ? _debois$elm_mdl$Material_Options$cs('is-casting-shadow') : _debois$elm_mdl$Material_Options$nop,
							_debois$elm_mdl$Material_Options$many(_p21)
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
												function (_p20) {
													return lift(
														A2(_debois$elm_mdl$Material_Layout$Ripple, tabIndex, _p20));
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
					A2(chevron, 'right', 100)
				]));
	});
var _debois$elm_mdl$Material_Layout$headerView = F4(
	function (lift, config, model, _p22) {
		var _p23 = _p22;
		var mode = function () {
			var _p24 = config.mode;
			switch (_p24.ctor) {
				case 'Standard':
					return '';
				case 'Scrolling':
					return 'mdl-layout__header--scroll';
				case 'Seamed':
					return 'mdl-layout__header--seamed';
				default:
					if (_p24._0 === true) {
						return 'mdl-layout__header--waterfall mdl-layout__header--waterfall-hide-top';
					} else {
						return 'mdl-layout__header--waterfall';
					}
			}
		}();
		return A2(
			_elm_lang$html$Html$header,
			A2(
				_elm_lang$core$List$append,
				_debois$elm_mdl$Material_Layout$isWaterfall(config.mode) ? _elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Events$onClick(
						lift(
							_debois$elm_mdl$Material_Layout$TransitionHeader(
								{toCompact: false, fixedHeader: config.fixedHeader})))
					]) : _elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$classList(
						_elm_lang$core$Native_List.fromArray(
							[
								{ctor: '_Tuple2', _0: 'mdl-layout__header', _1: true},
								{
								ctor: '_Tuple2',
								_0: 'is-casting-shadow',
								_1: _elm_lang$core$Native_Utils.eq(config.mode, _debois$elm_mdl$Material_Layout$Standard) || (_debois$elm_mdl$Material_Layout$isWaterfall(config.mode) && model.isCompact)
							},
								{ctor: '_Tuple2', _0: 'is-animating', _1: model.isAnimating},
								{ctor: '_Tuple2', _0: 'is-compact', _1: model.isCompact},
								{
								ctor: '_Tuple2',
								_0: mode,
								_1: !_elm_lang$core$Native_Utils.eq(mode, '')
							}
							]))
					])),
			A2(
				_elm_lang$core$List$concatMap,
				function (x) {
					return x;
				},
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Layout$toList(_p23._0),
						_p23._1,
						_debois$elm_mdl$Material_Layout$toList(_p23._2)
					])));
	});
var _debois$elm_mdl$Material_Layout$view = F4(
	function (lift, model, options, _p25) {
		var _p26 = _p25;
		var _p32 = _p26.tabs;
		var _p31 = _p26.header;
		var _p30 = _p26.drawer;
		var hasTabs = _elm_lang$core$Basics$not(
			_elm_lang$core$List$isEmpty(
				_elm_lang$core$Basics$fst(_p32)));
		var hasHeader = hasTabs || _elm_lang$core$Basics$not(
			_elm_lang$core$List$isEmpty(_p31));
		var summary = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Layout$defaultConfig, options);
		var config = summary.config;
		var _p27 = function () {
			var _p28 = {ctor: '_Tuple3', _0: _p30, _1: _p31, _2: config.fixedHeader};
			if ((_p28.ctor === '_Tuple3') && (_p28._0.ctor === '::')) {
				if ((_p28._1.ctor === '::') && (_p28._2 === true)) {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Maybe$Nothing,
						_1: _elm_lang$core$Maybe$Just(
							_debois$elm_mdl$Material_Layout$drawerButton(lift))
					};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Maybe$Just(
							_debois$elm_mdl$Material_Layout$drawerButton(lift)),
						_1: _elm_lang$core$Maybe$Nothing
					};
				}
			} else {
				return {ctor: '_Tuple2', _0: _elm_lang$core$Maybe$Nothing, _1: _elm_lang$core$Maybe$Nothing};
			}
		}();
		var contentDrawerButton = _p27._0;
		var headerDrawerButton = _p27._1;
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
					_elm_lang$html$Html$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$classList(
							_elm_lang$core$Native_List.fromArray(
								[
									{ctor: '_Tuple2', _0: 'mdl-layout ', _1: true},
									{ctor: '_Tuple2', _0: 'is-upgraded', _1: true},
									{ctor: '_Tuple2', _0: 'is-small-screen', _1: model.isSmallScreen},
									{
									ctor: '_Tuple2',
									_0: 'has-drawer',
									_1: !_elm_lang$core$Native_Utils.eq(
										_p30,
										_elm_lang$core$Native_List.fromArray(
											[]))
								},
									{ctor: '_Tuple2', _0: 'has-tabs', _1: hasTabs},
									{ctor: '_Tuple2', _0: 'mdl-js-layout', _1: true},
									{
									ctor: '_Tuple2',
									_0: 'mdl-layout--fixed-drawer',
									_1: config.fixedDrawer && (!_elm_lang$core$Native_Utils.eq(
										_p30,
										_elm_lang$core$Native_List.fromArray(
											[])))
								},
									{ctor: '_Tuple2', _0: 'mdl-layout--fixed-header', _1: config.fixedHeader && hasHeader},
									{ctor: '_Tuple2', _0: 'mdl-layout--fixed-tabs', _1: config.fixedTabs && hasTabs}
								]))
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							hasHeader ? _elm_lang$core$Maybe$Just(
							A4(
								_debois$elm_mdl$Material_Layout$headerView,
								lift,
								config,
								model,
								{ctor: '_Tuple3', _0: headerDrawerButton, _1: _p31, _2: tabsElems})) : _elm_lang$core$Maybe$Nothing,
							_elm_lang$core$List$isEmpty(_p30) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
							A2(_debois$elm_mdl$Material_Layout$drawerView, model, _p30)),
							_elm_lang$core$List$isEmpty(_p30) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
							A2(_debois$elm_mdl$Material_Layout$obfuscator, lift, model)),
							contentDrawerButton,
							_elm_lang$core$Maybe$Just(
							A2(
								_elm_lang$html$Html$main$,
								A2(
									_elm_lang$core$List_ops['::'],
									_elm_lang$html$Html_Attributes$class('mdl-layout__content'),
									_debois$elm_mdl$Material_Layout$isWaterfall(config.mode) ? _elm_lang$core$Native_List.fromArray(
										[
											A2(
											_elm_lang$html$Html_Events$on,
											'scroll',
											A2(
												_elm_lang$core$Json_Decode$map,
												function (_p29) {
													return lift(
														A2(_debois$elm_mdl$Material_Layout$ScrollPane, config.fixedHeader, _p29));
												},
												_debois$elm_dom$DOM$target(_debois$elm_dom$DOM$scrollTop)))
										]) : _elm_lang$core$Native_List.fromArray(
										[])),
								_p26.main))
						]))
				]));
	});
var _debois$elm_mdl$Material_Layout$render = A4(
	_debois$elm_parts$Parts$create1,
	_debois$elm_mdl$Material_Layout$view,
	_debois$elm_mdl$Material_Layout$update,
	function (_) {
		return _.layout;
	},
	F2(
		function (x, c) {
			return _elm_lang$core$Native_Utils.update(
				c,
				{layout: x});
		}));

var _debois$elm_mdl$Material_Toggles$name = function (s) {
	return _debois$elm_mdl$Material_Options$set(
		function (options) {
			return _elm_lang$core$Native_Utils.update(
				options,
				{
					name: _elm_lang$core$Maybe$Just(
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
var _debois$elm_mdl$Material_Toggles$onChange = function (x) {
	return _debois$elm_mdl$Material_Options$set(
		function (options) {
			return _elm_lang$core$Native_Utils.update(
				options,
				{
					onChange: _elm_lang$core$Maybe$Just(
						A2(
							_elm_lang$html$Html_Events$on,
							'change',
							_elm_lang$core$Json_Decode$succeed(x)))
				});
		});
};
var _debois$elm_mdl$Material_Toggles$defaultConfig = {isDisabled: false, value: false, ripple: true, name: _elm_lang$core$Maybe$Nothing, onChange: _elm_lang$core$Maybe$Nothing};
var _debois$elm_mdl$Material_Toggles$defaultModel = {ripple: _debois$elm_mdl$Material_Ripple$model, isFocused: false};
var _debois$elm_mdl$Material_Toggles$Model = F2(
	function (a, b) {
		return {ripple: a, isFocused: b};
	});
var _debois$elm_mdl$Material_Toggles$Config = F5(
	function (a, b, c, d, e) {
		return {isDisabled: a, value: b, ripple: c, name: d, onChange: e};
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
		_debois$elm_mdl$Material_Toggles$update,
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
	function (lift, name, model, summary, elems) {
		var cfg = summary.config;
		return A5(
			_debois$elm_mdl$Material_Options$apply,
			summary,
			_elm_lang$html$Html$label,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$cs(
					A2(_elm_lang$core$Basics_ops['++'], 'mdl-', name)),
					_debois$elm_mdl$Material_Options$cs(
					A2(_elm_lang$core$Basics_ops['++'], 'mdl-js-', name)),
					A2(_debois$elm_mdl$Material_Options$cs$, 'mdl-js-ripple-effect', cfg.ripple),
					A2(_debois$elm_mdl$Material_Options$cs$, 'mdl-js-ripple-effect--ignore-events', cfg.ripple),
					_debois$elm_mdl$Material_Options$cs('is-upgraded'),
					A2(_debois$elm_mdl$Material_Options$cs$, 'is-checked', cfg.value),
					A2(_debois$elm_mdl$Material_Options$cs$, 'is-focused', model.isFocused)
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$core$Maybe$Just(
					_debois$elm_mdl$Material_Helpers$blurOn('mouseup')),
					_elm_lang$core$Maybe$Just(
					_elm_lang$html$Html_Events$onFocus(
						lift(
							_debois$elm_mdl$Material_Toggles$SetFocus(true)))),
					_elm_lang$core$Maybe$Just(
					_elm_lang$html$Html_Events$onBlur(
						lift(
							_debois$elm_mdl$Material_Toggles$SetFocus(false)))),
					cfg.onChange
				]),
			cfg.ripple ? A2(
				_elm_lang$core$List_ops['::'],
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
						model.ripple)),
				elems) : elems);
	});
var _debois$elm_mdl$Material_Toggles$viewCheckbox = F3(
	function (lift, model, config) {
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
					A2(
					_elm_lang$html$Html$input,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$type$('checkbox'),
							_elm_lang$html$Html_Attributes$class('mdl-checkbox__input'),
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
					_elm_lang$core$Native_List.fromArray(
						[])),
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
var _debois$elm_mdl$Material_Toggles$viewSwitch = F3(
	function (lift, model, config) {
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
					A2(
					_elm_lang$html$Html$input,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$type$('checkbox'),
							_elm_lang$html$Html_Attributes$class('mdl-switch__input'),
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
					_elm_lang$core$Native_List.fromArray(
						[])),
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
					A2(
					_elm_lang$html$Html$input,
					A2(
						_elm_lang$core$List$filterMap,
						_elm_lang$core$Basics$identity,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$core$Maybe$Just(
								_elm_lang$html$Html_Attributes$type$('radio')),
								_elm_lang$core$Maybe$Just(
								_elm_lang$html$Html_Attributes$class('mdl-radio__button')),
								_elm_lang$core$Maybe$Just(
								_elm_lang$html$Html_Attributes$disabled(cfg.isDisabled)),
								_elm_lang$core$Maybe$Just(
								_elm_lang$html$Html_Attributes$checked(cfg.value)),
								cfg.name
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

var _debois$elm_mdl$Material$update = F3(
	function (lift, msg, model) {
		return A2(
			_debois$elm_mdl$Material_Helpers$map1st,
			function (mdl) {
				return _elm_lang$core$Native_Utils.update(
					model,
					{mdl: mdl});
			},
			A3(_debois$elm_parts$Parts$update, lift, msg, model.mdl));
	});
var _debois$elm_mdl$Material$model = {button: _elm_lang$core$Dict$empty, textfield: _elm_lang$core$Dict$empty, menu: _elm_lang$core$Dict$empty, snackbar: _elm_lang$core$Maybe$Nothing, layout: _debois$elm_mdl$Material_Layout$defaultModel, toggles: _elm_lang$core$Dict$empty};
var _debois$elm_mdl$Material$Model = F6(
	function (a, b, c, d, e, f) {
		return {button: a, textfield: b, menu: c, snackbar: d, layout: e, toggles: f};
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
var _debois$elm_mdl$Demo_Code$code = function (str) {
	return A2(
		_evancz$elm_markdown$Markdown$toHtml,
		_elm_lang$core$Native_List.fromArray(
			[]),
		A2(
			_elm_lang$core$Basics_ops['++'],
			'```elm\n',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_debois$elm_mdl$Demo_Code$trim(str),
				'\n```')));
};
var _debois$elm_mdl$Demo_Code$delay = 200;
var _debois$elm_mdl$Demo_Code$view = function (state) {
	var body = function () {
		var _p3 = state;
		switch (_p3.ctor) {
			case 'Idle':
				return _elm_lang$html$Html$text('');
			case 'First':
				return _debois$elm_mdl$Demo_Code$code(_p3._0);
			case 'FadingIn':
				return _debois$elm_mdl$Demo_Code$code(_p3._0);
			case 'FadingOut':
				return _debois$elm_mdl$Demo_Code$code(_p3._0._0);
			default:
				return _debois$elm_mdl$Demo_Code$code(_p3._0);
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
};
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
						_1: _debois$elm_mdl$Material_Helpers$fx(
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
							_debois$elm_mdl$Material_Color$hueName(primary),
							A2(
								_elm_lang$core$Basics_ops['++'],
								'-',
								_debois$elm_mdl$Material_Color$hueName(accent))));
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
	return A5(
		_debois$elm_mdl$Demo_Page$body2,
		'Badges',
		_debois$elm_mdl$Demo_Badges$srcUrl,
		_debois$elm_mdl$Demo_Badges$intro,
		_debois$elm_mdl$Demo_Badges$references,
		_elm_lang$core$Native_List.fromArray(
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
									])),
								A5(
								_debois$elm_mdl$Material_Button$render,
								_debois$elm_mdl$Demo_Badges$Mdl,
								_elm_lang$core$Native_List.fromArray(
									[0]),
								model.mdl,
								_elm_lang$core$Native_List.fromArray(
									[
										A2(_debois$elm_mdl$Material_Options$css, 'margin-left', '2rem'),
										_debois$elm_mdl$Material_Button$onClick(_debois$elm_mdl$Demo_Badges$Decrease)
									]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Mark as read')
									]))
							]))
					])),
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
								var c1 = '    \n              Options.span \n                [ Badge.add \"3\" ] \n                [ text \"Badge\" ]';
								return A2(
									_debois$elm_mdl$Material_Options$span,
									_elm_lang$core$Native_List.fromArray(
										[
											_debois$elm_mdl$Material_Badge$add('3'),
											_debois$elm_mdl$Material_Options$onHover(
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
								var c2 = '\n              Options.span\n                [ Badge.add \"♥\" ]\n                [ text \"Symbol\" ]';
								return A2(
									_debois$elm_mdl$Material_Options$span,
									_elm_lang$core$Native_List.fromArray(
										[
											_debois$elm_mdl$Material_Badge$add('♥'),
											_debois$elm_mdl$Material_Options$onHover(
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
								var c3 = '\n              Icon.view \"shopping_cart\"\n                [ Icon.size24\n                , Badge.add \"33\"\n                ]';
								return A3(
									_debois$elm_mdl$Material_Options$styled,
									_elm_lang$html$Html$span,
									_elm_lang$core$Native_List.fromArray(
										[
											_debois$elm_mdl$Material_Options$onHover(
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
								var c4 = '\n              Options.span \n                [ Badge.add \"5\"\n                , Badge.noBackground \n                ]  \n                [ text \"No background\" ]';
								return A2(
									_debois$elm_mdl$Material_Options$span,
									_elm_lang$core$Native_List.fromArray(
										[
											_debois$elm_mdl$Material_Badge$add('5'),
											_debois$elm_mdl$Material_Badge$noBackground,
											_debois$elm_mdl$Material_Options$onHover(
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
								var c5 = '\n              Options.span \n                [ Badge.add \"8\"\n                , Badge.overlap \n                ]  \n                [ text \"Overlap\" ]';
								return A2(
									_debois$elm_mdl$Material_Options$span,
									_elm_lang$core$Native_List.fromArray(
										[
											_debois$elm_mdl$Material_Badge$add('8'),
											_debois$elm_mdl$Material_Badge$overlap,
											_debois$elm_mdl$Material_Options$onHover(
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
								var c6 = '\n              Options.span\n                [ Badge.add \"13\"\n                , Badge.overlap \n                , Badge.noBackground \n                ]  \n                [ text \"Overlap, no background\" ]';
								return A2(
									_debois$elm_mdl$Material_Options$span,
									_elm_lang$core$Native_List.fromArray(
										[
											_debois$elm_mdl$Material_Badge$add('13'),
											_debois$elm_mdl$Material_Badge$overlap,
											_debois$elm_mdl$Material_Badge$noBackground,
											_debois$elm_mdl$Material_Options$onHover(
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
				_elm_lang$html$Html$p,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Demo_Code$view(model.codebox)
					]))
			]));
};
var _debois$elm_mdl$Demo_Badges$Increase = {ctor: 'Increase'};
var _debois$elm_mdl$Demo_Badges$update = F2(
	function (action, model) {
		var _p0 = action;
		switch (_p0.ctor) {
			case 'Mdl':
				return A3(_debois$elm_mdl$Material$update, _debois$elm_mdl$Demo_Badges$Mdl, _p0._0, model);
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
							_debois$elm_mdl$Demo_Code$Set(_p0._0),
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
						A2(_debois$elm_mdl$Demo_Code$update, _p0._0, model.codebox)));
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
var _debois$elm_mdl$Demo_Buttons$Mdl = function (a) {
	return {ctor: 'Mdl', _0: a};
};
var _debois$elm_mdl$Demo_Buttons$update = F2(
	function (action, model) {
		var _p12 = action;
		switch (_p12.ctor) {
			case 'Mdl':
				return A3(_debois$elm_mdl$Material$update, _debois$elm_mdl$Demo_Buttons$Mdl, _p12._0, model);
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
						_debois$elm_mdl$Demo_Code$view(model.code)
					]))
			]));
};

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
var _debois$elm_mdl$Material_Elevation$elevations = _elm_lang$core$Native_List.fromArray(
	[
		{ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Elevation$e2, _1: 2},
		{ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Elevation$e3, _1: 3},
		{ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Elevation$e4, _1: 4},
		{ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Elevation$e6, _1: 6},
		{ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Elevation$e8, _1: 8},
		{ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Elevation$e16, _1: 16},
		{ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Elevation$e24, _1: 24}
	]);

var _debois$elm_mdl$Demo_Elevation$references = _elm_lang$core$Native_List.fromArray(
	[
		_debois$elm_mdl$Demo_Page$package('http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Elevation'),
		_debois$elm_mdl$Demo_Page$mds('https://www.google.com/design/spec/what-is-material/elevation-shadows.html'),
		_debois$elm_mdl$Demo_Page$mdl('https://github.com/google/material-design-lite/blob/master/src/shadow/README.md')
	]);
var _debois$elm_mdl$Demo_Elevation$srcUrl = 'https://github.com/debois/elm-mdl/blob/master/demo/Demo/Elevation.elm';
var _debois$elm_mdl$Demo_Elevation$intro = A2(_debois$elm_mdl$Demo_Page$fromMDL, 'https://github.com/google/material-design-lite/blob/master/src/shadow/README.md', '\n  > The Material Design Lite (MDL) shadow is not a component in the same sense as\n> an MDL card, menu, or textbox; it is a visual effect that can be assigned to a\n> user interface element. The effect simulates a three-dimensional positioning of\n> the element, as though it is slightly raised above the surface it rests upon —\n> a positive z-axis value, in user interface terms. The shadow starts at the\n> edges of the element and gradually fades outward, providing a realistic 3-D\n> effect.\n> \n> Shadows are a convenient and intuitive means of distinguishing an element from\n> its surroundings. A shadow can draw the user\'s eye to an object and emphasize\n> the object\'s importance, uniqueness, or immediacy.\n> \n> Shadows are a well-established feature in user interfaces, and provide users\n> with a visual clue to an object\'s intended use or value. Their design and use\n> is an important factor in the overall user experience.)\n\nThe [Material Design Specification](https://www.google.com/design/spec/what-is-material/elevation-shadows.html#elevation-shadows-elevation-android-)\npre-defines appropriate elevation for most UI elements; you need to manually\nassign shadows only to your own elements. \n\nYou are encouraged to visit the\n[Material Design specification](https://www.google.com/design/spec/what-is-material/elevation-shadows.html)\nfor details about appropriate use of shadows. \n');
var _debois$elm_mdl$Demo_Elevation$elevate = function (_p0) {
	var _p1 = _p0;
	return A2(
		_debois$elm_mdl$Material_Options$div,
		_elm_lang$core$Native_List.fromArray(
			[
				A2(_debois$elm_mdl$Material_Options$css, 'height', '96px'),
				A2(_debois$elm_mdl$Material_Options$css, 'width', '128px'),
				A2(_debois$elm_mdl$Material_Options$css, 'margin', '40px'),
				A2(_debois$elm_mdl$Material_Options$css, 'display', 'inline-flex'),
				A2(_debois$elm_mdl$Material_Options$css, 'flex-flow', 'row wrap'),
				A2(_debois$elm_mdl$Material_Options$css, 'justify-content', 'center'),
				A2(_debois$elm_mdl$Material_Options$css, 'align-items', 'center'),
				_p1._0
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_Options$div,
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Options$cs('.mdl-typography--title-color-contrast'),
						A2(_debois$elm_mdl$Material_Options$css, 'box-radius', '2pt')
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text(
						_elm_lang$core$Basics$toString(_p1._1))
					]))
			]));
};
var _debois$elm_mdl$Demo_Elevation$view = A5(
	_debois$elm_mdl$Demo_Page$body1,
	'Elevation',
	_debois$elm_mdl$Demo_Elevation$srcUrl,
	_debois$elm_mdl$Demo_Elevation$intro,
	_debois$elm_mdl$Demo_Elevation$references,
	A2(
		F2(
			function (x, y) {
				return A2(_elm_lang$core$List_ops['::'], x, y);
			}),
		A2(
			_elm_lang$html$Html$p,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text('Below are boxes drawn at various elevations.')
				])),
		A2(
			_elm_lang$core$List$map,
			_debois$elm_mdl$Demo_Elevation$elevate,
			A2(
				_elm_lang$core$List_ops['::'],
				{
					ctor: '_Tuple2',
					_0: _debois$elm_mdl$Material_Options$cs(''),
					_1: 0
				},
				_debois$elm_mdl$Material_Elevation$elevations))));

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
var _debois$elm_mdl$Material_Spinner$defaultConfig = {active: false, singleColor: false};
var _debois$elm_mdl$Material_Spinner$spinner = F2(
	function (node, options) {
		var _p0 = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Spinner$defaultConfig, options);
		var summary = _p0;
		var config = _p0.config;
		return A5(
			_debois$elm_mdl$Material_Options$apply,
			summary,
			node,
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
	});
var _debois$elm_mdl$Material_Spinner$p = _debois$elm_mdl$Material_Spinner$spinner(_elm_lang$html$Html$p);
var _debois$elm_mdl$Material_Spinner$div = _debois$elm_mdl$Material_Spinner$spinner(_elm_lang$html$Html$div);
var _debois$elm_mdl$Material_Spinner$span = _debois$elm_mdl$Material_Spinner$spinner(_elm_lang$html$Html$span);
var _debois$elm_mdl$Material_Spinner$Config = F2(
	function (a, b) {
		return {active: a, singleColor: b};
	});

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
		_debois$elm_mdl$Material_Options$div,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_debois$elm_mdl$Material_Options$div,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Options$css, 'text-align', 'center'),
						A2(_debois$elm_mdl$Material_Options$css, 'max-width', '100%'),
						A2(_debois$elm_mdl$Material_Options$css, 'width', '500px'),
						A2(_debois$elm_mdl$Material_Options$css, 'margin', '0 auto'),
						A2(_debois$elm_mdl$Material_Options$css, 'padding', '84px 40px 40px')
					]),
				_elm_lang$core$Native_List.fromArray(
					[_p1._0])),
				A2(
				_debois$elm_mdl$Material_Options$div,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[_p1._1]))
			]));
};
var _debois$elm_mdl$Demo_Loading$view = A5(
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
			A2(
				_elm_lang$core$List$map,
				_debois$elm_mdl$Demo_Loading$demoContainer,
				_elm_lang$core$Native_List.fromArray(
					[
						{
						ctor: '_Tuple2',
						_0: _debois$elm_mdl$Material_Progress$progress(44),
						_1: _debois$elm_mdl$Demo_Code$code('Progress.progress 44')
					},
						{
						ctor: '_Tuple2',
						_0: _debois$elm_mdl$Material_Progress$indeterminate,
						_1: _debois$elm_mdl$Demo_Code$code('Progress.indeterminate')
					},
						{
						ctor: '_Tuple2',
						_0: A2(_debois$elm_mdl$Material_Progress$buffered, 33, 87),
						_1: _debois$elm_mdl$Demo_Code$code('Progress.buffered 33 87')
					},
						A2(
						F2(
							function (v0, v1) {
								return {ctor: '_Tuple2', _0: v0, _1: v1};
							}),
						_debois$elm_mdl$Material_Spinner$div(
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Spinner$active(true)
								])),
						_debois$elm_mdl$Demo_Code$code('Spinner.div [ Spinner.active True ]')),
						A2(
						F2(
							function (v0, v1) {
								return {ctor: '_Tuple2', _0: v0, _1: v1};
							}),
						_debois$elm_mdl$Material_Spinner$div(
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Spinner$active(true),
									_debois$elm_mdl$Material_Spinner$singleColor(true)
								])),
						_debois$elm_mdl$Demo_Code$code('Spinner.div [ Spinner.active True, Spinner.singleColor True ]'))
					])))
		]));
var _debois$elm_mdl$Demo_Loading$update = F2(
	function (action, model) {
		var _p2 = action;
		return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
	});
var _debois$elm_mdl$Demo_Loading$model = {mdl: _debois$elm_mdl$Material$model};
var _debois$elm_mdl$Demo_Loading$Model = function (a) {
	return {mdl: a};
};
var _debois$elm_mdl$Demo_Loading$TemplateMsg = {ctor: 'TemplateMsg'};

var _debois$elm_mdl$Demo_Menus$references = _elm_lang$core$Native_List.fromArray(
	[
		_debois$elm_mdl$Demo_Page$package('http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-menu'),
		_debois$elm_mdl$Demo_Page$mds('https://www.google.com/design/spec/components/menus.html'),
		_debois$elm_mdl$Demo_Page$mdl('https://www.getmdl.io/components/#menus-section')
	]);
var _debois$elm_mdl$Demo_Menus$srcUrl = 'https://github.com/debois/elm-mdl/blob/master/demo/Demo/Menus.elm';
var _debois$elm_mdl$Demo_Menus$intro = A2(_debois$elm_mdl$Demo_Page$fromMDL, 'https://www.getmdl.io/components/#menus-section', '\n\n> The Material Design Lite (MDL) menu component is a user interface element\n> that allows users to select one of a number of options. The selection\n> typically results in an action initiation, a setting change, or other\n> observable effect. Menu options are always presented in sets of two or more,\n> and options may be programmatically enabled or disabled as required. The menu\n> appears when the user is asked to choose among a series of options, and is\n> usually dismissed after the choice is made.\n>\n> Menus are an established but non-standardized feature in user interfaces, and\n> allow users to make choices that direct the activity, progress, or\n> characteristics of software. Their design and use is an important factor in\n> the overall user experience. See the menu component\'s <a href=\"http://www.google.com/design/spec/components/menus.html\">Material Design\n> specifications page</a> for details.\n\n');
var _debois$elm_mdl$Demo_Menus$menus = _elm_lang$core$Native_List.fromArray(
	[
		{ctor: '_Tuple2', _0: 'Bottom left', _1: _debois$elm_mdl$Material_Menu$bottomLeft},
		{ctor: '_Tuple2', _0: 'Bottom right', _1: _debois$elm_mdl$Material_Menu$bottomRight},
		{ctor: '_Tuple2', _0: 'Top left', _1: _debois$elm_mdl$Material_Menu$topLeft},
		{ctor: '_Tuple2', _0: 'Top right', _1: _debois$elm_mdl$Material_Menu$topRight}
	]);
var _debois$elm_mdl$Demo_Menus$model = {mdl: _debois$elm_mdl$Material$model, selected: _elm_lang$core$Maybe$Nothing};
var _debois$elm_mdl$Demo_Menus$Model = F2(
	function (a, b) {
		return {mdl: a, selected: b};
	});
var _debois$elm_mdl$Demo_Menus$Select = function (a) {
	return {ctor: 'Select', _0: a};
};
var _debois$elm_mdl$Demo_Menus$item = function (str) {
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Events$onClick(
				_debois$elm_mdl$Demo_Menus$Select(str))
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html$text(str)
			]));
};
var _debois$elm_mdl$Demo_Menus$items = _elm_lang$core$Native_List.fromArray(
	[
		A3(
		_debois$elm_mdl$Material_Menu$Item,
		false,
		true,
		_debois$elm_mdl$Demo_Menus$item('Some Msg')),
		A3(
		_debois$elm_mdl$Material_Menu$Item,
		true,
		true,
		_debois$elm_mdl$Demo_Menus$item('Another Msg')),
		A3(
		_debois$elm_mdl$Material_Menu$Item,
		false,
		false,
		_debois$elm_mdl$Demo_Menus$item('Disabled Msg')),
		A3(
		_debois$elm_mdl$Material_Menu$Item,
		false,
		true,
		_debois$elm_mdl$Demo_Menus$item('Yet Another Msg'))
	]);
var _debois$elm_mdl$Demo_Menus$MDL = function (a) {
	return {ctor: 'MDL', _0: a};
};
var _debois$elm_mdl$Demo_Menus$update = F2(
	function (action, model) {
		var _p0 = action;
		switch (_p0.ctor) {
			case 'MDL':
				return A3(_debois$elm_mdl$Material$update, _debois$elm_mdl$Demo_Menus$MDL, _p0._0, model);
			case 'MenuMsg':
				return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
			default:
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							selected: _elm_lang$core$Maybe$Just(_p0._0)
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
		}
	});
var _debois$elm_mdl$Demo_Menus$container = F4(
	function (model, idx, _p1, items) {
		var _p2 = _p1;
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
							_debois$elm_mdl$Material_Options$cs('bar'),
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
									_debois$elm_mdl$Material_Options$cs('wrapper'),
									A2(_debois$elm_mdl$Material_Options$css, 'box-sizing', 'border-box'),
									A2(_debois$elm_mdl$Material_Options$css, 'position', 'absolute'),
									A2(
									_debois$elm_mdl$Material_Options$css,
									rightAlign ? 'right' : 'left',
									'16px')
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									A5(
									_debois$elm_mdl$Material_Menu$render,
									_debois$elm_mdl$Demo_Menus$MDL,
									_elm_lang$core$Native_List.fromArray(
										[idx]),
									model.mdl,
									_elm_lang$core$Native_List.fromArray(
										[_p2._1, _debois$elm_mdl$Material_Menu$ripple]),
									items)
								]))
						]));
			});
		return A2(
			_debois$elm_mdl$Material_Options$div,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_Options$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Elevation$e2,
							A2(_debois$elm_mdl$Material_Options$css, 'position', 'relative'),
							A2(_debois$elm_mdl$Material_Options$css, 'width', '200px'),
							A2(_debois$elm_mdl$Material_Options$css, 'margin', '0 auto'),
							A2(_debois$elm_mdl$Material_Options$css, 'margin-bottom', '40px')
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
						])),
					A2(
					_debois$elm_mdl$Material_Options$div,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_debois$elm_mdl$Material_Options$css, 'margin', '0 auto'),
							A2(_debois$elm_mdl$Material_Options$css, 'width', '200px'),
							A2(_debois$elm_mdl$Material_Options$css, 'text-align', 'center'),
							A2(_debois$elm_mdl$Material_Options$css, 'height', '48px'),
							A2(_debois$elm_mdl$Material_Options$css, 'line-height', '48px'),
							A2(_debois$elm_mdl$Material_Options$css, 'margin-bottom', '40px')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text(_p2._0)
						]))
				]));
	});
var _debois$elm_mdl$Demo_Menus$view = function (model) {
	return A5(
		_debois$elm_mdl$Demo_Page$body2,
		'Menus',
		_debois$elm_mdl$Demo_Menus$srcUrl,
		_debois$elm_mdl$Demo_Menus$intro,
		_debois$elm_mdl$Demo_Menus$references,
		A3(
			_elm_lang$core$Basics$flip,
			F2(
				function (x, y) {
					return A2(_elm_lang$core$List_ops['::'], x, y);
				}),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$html$Html$p,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text(
							A2(
								_elm_lang$core$Maybe$withDefault,
								'',
								A2(
									_elm_lang$core$Maybe$map,
									function (i) {
										return A2(
											_elm_lang$core$Basics_ops['++'],
											'You chose item \'',
											A2(_elm_lang$core$Basics_ops['++'], i, '\''));
									},
									model.selected)))
						]))
				]),
			A2(
				_debois$elm_mdl$Material_Grid$grid,
				_elm_lang$core$Native_List.fromArray(
					[]),
				A2(
					_elm_lang$core$List$indexedMap,
					F2(
						function (idx, m) {
							return A2(
								_debois$elm_mdl$Material_Grid$cell,
								_elm_lang$core$Native_List.fromArray(
									[
										A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 6)
									]),
								_elm_lang$core$Native_List.fromArray(
									[
										A4(_debois$elm_mdl$Demo_Menus$container, model, idx, m, _debois$elm_mdl$Demo_Menus$items)
									]));
						}),
					_debois$elm_mdl$Demo_Menus$menus))));
};
var _debois$elm_mdl$Demo_Menus$MenuMsg = F2(
	function (a, b) {
		return {ctor: 'MenuMsg', _0: a, _1: b};
	});

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
					(!_elm_lang$core$Native_Utils.eq(_p8, _debois$elm_mdl$Demo_Snackbar$Waiting)) ? _debois$elm_mdl$Demo_Snackbar$transitionOuter : _debois$elm_mdl$Material_Options$nop
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
							(!_elm_lang$core$Native_Utils.eq(_p8, _debois$elm_mdl$Demo_Snackbar$Waiting)) ? _debois$elm_mdl$Demo_Snackbar$transitionInner : _debois$elm_mdl$Material_Options$nop
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
		var _p10 = A2(_elm_lang$core$Debug$log, 'Action', action);
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
				return _debois$elm_mdl$Material_Helpers$pure(
					A3(
						_debois$elm_mdl$Demo_Snackbar$mapSquare,
						_p10._0,
						function (sq) {
							return _elm_lang$core$Native_Utils.eq(sq, _debois$elm_mdl$Demo_Snackbar$Appearing) ? _debois$elm_mdl$Demo_Snackbar$Waiting : sq;
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
								function (_p12) {
									return A2(
										F2(
											function (x, y) {
												return !_elm_lang$core$Native_Utils.eq(x, y);
											}),
										_p10._0,
										_elm_lang$core$Basics$fst(_p12));
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
						var _p11 = _p10._0._0;
						return {
							ctor: '_Tuple2',
							_0: A3(
								_debois$elm_mdl$Demo_Snackbar$mapSquare,
								_p11,
								_elm_lang$core$Basics$always(_debois$elm_mdl$Demo_Snackbar$Disappearing),
								model),
							_1: A2(
								_debois$elm_mdl$Material_Helpers$delay,
								_debois$elm_mdl$Demo_Snackbar$transitionLength,
								_debois$elm_mdl$Demo_Snackbar$Gone(_p11))
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
				return A3(_debois$elm_mdl$Material$update, _debois$elm_mdl$Demo_Snackbar$MDL, _p10._0, model);
		}
	});
var _debois$elm_mdl$Demo_Snackbar$AddToast = {ctor: 'AddToast'};
var _debois$elm_mdl$Demo_Snackbar$AddSnackbar = {ctor: 'AddSnackbar'};
var _debois$elm_mdl$Demo_Snackbar$view = function (model) {
	return A5(
		_debois$elm_mdl$Demo_Page$body2,
		'Snackbar & Toast',
		_debois$elm_mdl$Demo_Snackbar$srcUrl,
		_debois$elm_mdl$Demo_Snackbar$intro,
		_debois$elm_mdl$Demo_Snackbar$references,
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$p,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('Click the buttons below to generate toasts and snackbars. Note that \n                  multiple activations are automatically queued.')
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
						A2(
							_elm_lang$core$List$map,
							_debois$elm_mdl$Demo_Snackbar$clickView(model),
							_elm_lang$core$List$reverse(model.squares)))
					])),
				A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Demo_Snackbar$Snackbar,
				_debois$elm_mdl$Material_Snackbar$view(model.snackbar))
			]));
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

var _debois$elm_mdl$Demo_Textfields$references = _elm_lang$core$Native_List.fromArray(
	[
		_debois$elm_mdl$Demo_Page$package('http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Textfield'),
		_debois$elm_mdl$Demo_Page$mds('https://www.google.com/design/spec/components/text-fields.html'),
		_debois$elm_mdl$Demo_Page$mdl('https://www.getmdl.io/components/#textfields-section')
	]);
var _debois$elm_mdl$Demo_Textfields$srcUrl = 'https://github.com/debois/elm-mdl/blob/master/demo/Demo/Textfields.elm';
var _debois$elm_mdl$Demo_Textfields$intro = A2(_debois$elm_mdl$Demo_Page$fromMDL, 'http://www.getmdl.io/components/#textfields-section', '\n> The Material Design Lite (MDL) text field component is an enhanced version of\n> the standard HTML `<input type=\"text\">` and `<input type=\"textarea\">` elements.\n> A text field consists of a horizontal line indicating where keyboard input\n> can occur and, typically, text that clearly communicates the intended\n> contents of the text field. The MDL text field component provides various\n> types of text fields, and allows you to add both display and click effects.\n>\n> Text fields are a common feature of most user interfaces, regardless of a\n> site\'s content or function. Their design and use is therefore an important\n> factor in the overall user experience. See the text field component\'s\n> [Material  Design specifications page](https://www.google.com/design/spec/components/text-fields.html)\n> for details.\n>\n> The enhanced text field component has a more vivid visual look than a standard\n> text field, and may be initially or programmatically disabled. There are three\n> main types of text fields in the text field component, each with its own basic\n> coding requirements. The types are single-line, multi-line, and expandable.\n\nThis implementation provides only single-line.\n\n');
var _debois$elm_mdl$Demo_Textfields$match = F2(
	function (str, rx) {
		return A2(
			_elm_lang$core$List$any,
			function (_p0) {
				return A2(
					F2(
						function (x, y) {
							return _elm_lang$core$Native_Utils.eq(x, y);
						}),
					str,
					function (_) {
						return _.match;
					}(_p0));
			},
			A3(_elm_lang$core$Regex$find, _elm_lang$core$Regex$All, rx, str));
	});
var _debois$elm_mdl$Demo_Textfields$rx = '[0-9]*';
var _debois$elm_mdl$Demo_Textfields$rx$ = _elm_lang$core$Regex$regex(_debois$elm_mdl$Demo_Textfields$rx);
var _debois$elm_mdl$Demo_Textfields$model = {mdl: _debois$elm_mdl$Material$model, str0: '', str3: '', str4: ''};
var _debois$elm_mdl$Demo_Textfields$Model = F4(
	function (a, b, c, d) {
		return {mdl: a, str0: b, str3: c, str4: d};
	});
var _debois$elm_mdl$Demo_Textfields$Upd4 = function (a) {
	return {ctor: 'Upd4', _0: a};
};
var _debois$elm_mdl$Demo_Textfields$Upd3 = function (a) {
	return {ctor: 'Upd3', _0: a};
};
var _debois$elm_mdl$Demo_Textfields$Upd0 = function (a) {
	return {ctor: 'Upd0', _0: a};
};
var _debois$elm_mdl$Demo_Textfields$MDL = function (a) {
	return {ctor: 'MDL', _0: a};
};
var _debois$elm_mdl$Demo_Textfields$update = F2(
	function (action, model) {
		var _p1 = action;
		switch (_p1.ctor) {
			case 'MDL':
				return A3(_debois$elm_mdl$Material$update, _debois$elm_mdl$Demo_Textfields$MDL, _p1._0, model);
			case 'Upd0':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{str0: _p1._0}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'Upd3':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{str3: _p1._0}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			default:
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{str4: _p1._0}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
		}
	});
var _debois$elm_mdl$Demo_Textfields$view = function (model) {
	return A5(
		_debois$elm_mdl$Demo_Page$body2,
		'Textfields',
		_debois$elm_mdl$Demo_Textfields$srcUrl,
		_debois$elm_mdl$Demo_Textfields$intro,
		_debois$elm_mdl$Demo_Textfields$references,
		A2(
			F2(
				function (x, y) {
					return A2(_elm_lang$core$List_ops['::'], x, y);
				}),
			_elm_lang$html$Html$text('Try entering text into some of the textfields below.'),
			A3(
				_elm_lang$core$Basics$flip,
				F2(
					function (x, y) {
						return A2(_elm_lang$core$List_ops['::'], x, y);
					}),
				_elm_lang$core$Native_List.fromArray(
					[]),
				A2(
					_debois$elm_mdl$Material_Grid$grid,
					_elm_lang$core$Native_List.fromArray(
						[]),
					A2(
						_elm_lang$core$List$intersperse,
						A2(
							_debois$elm_mdl$Material_Grid$cell,
							_elm_lang$core$Native_List.fromArray(
								[
									A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 1)
								]),
							_elm_lang$core$Native_List.fromArray(
								[])),
						A2(
							_elm_lang$core$List$map,
							function (c) {
								return A2(
									_debois$elm_mdl$Material_Grid$cell,
									_elm_lang$core$Native_List.fromArray(
										[
											A2(_debois$elm_mdl$Material_Grid$size, _debois$elm_mdl$Material_Grid$All, 4),
											A2(_debois$elm_mdl$Material_Grid$offset, _debois$elm_mdl$Material_Grid$Desktop, 1)
										]),
									_elm_lang$core$Native_List.fromArray(
										[c]));
							},
							_elm_lang$core$Native_List.fromArray(
								[
									A4(
									_debois$elm_mdl$Material_Textfield$render,
									_debois$elm_mdl$Demo_Textfields$MDL,
									_elm_lang$core$Native_List.fromArray(
										[0]),
									model.mdl,
									_elm_lang$core$Native_List.fromArray(
										[
											_debois$elm_mdl$Material_Textfield$onInput(_debois$elm_mdl$Demo_Textfields$Upd0)
										])),
									A4(
									_debois$elm_mdl$Material_Textfield$render,
									_debois$elm_mdl$Demo_Textfields$MDL,
									_elm_lang$core$Native_List.fromArray(
										[1]),
									model.mdl,
									_elm_lang$core$Native_List.fromArray(
										[
											_debois$elm_mdl$Material_Textfield$label('Labelled')
										])),
									A4(
									_debois$elm_mdl$Material_Textfield$render,
									_debois$elm_mdl$Demo_Textfields$MDL,
									_elm_lang$core$Native_List.fromArray(
										[2]),
									model.mdl,
									_elm_lang$core$Native_List.fromArray(
										[
											_debois$elm_mdl$Material_Textfield$label('Floating label'),
											_debois$elm_mdl$Material_Textfield$floatingLabel
										])),
									A4(
									_debois$elm_mdl$Material_Textfield$render,
									_debois$elm_mdl$Demo_Textfields$MDL,
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
									A4(
									_debois$elm_mdl$Material_Textfield$render,
									_debois$elm_mdl$Demo_Textfields$MDL,
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
									A4(
									_debois$elm_mdl$Material_Textfield$render,
									_debois$elm_mdl$Demo_Textfields$MDL,
									_elm_lang$core$Native_List.fromArray(
										[5]),
									model.mdl,
									_elm_lang$core$Native_List.fromArray(
										[
											_debois$elm_mdl$Material_Textfield$label('Enter password'),
											_debois$elm_mdl$Material_Textfield$floatingLabel,
											_debois$elm_mdl$Material_Textfield$password
										]))
								])))))));
};

var _debois$elm_mdl$Demo_Toggles$references = _elm_lang$core$Native_List.fromArray(
	[
		_debois$elm_mdl$Demo_Page$package('http://package.elm-lang.org/packages/debois/elm-mdl/latest/Material-Toggles'),
		_debois$elm_mdl$Demo_Page$mds('https://www.google.com/design/spec/components/selection-controls.html'),
		_debois$elm_mdl$Demo_Page$mdl('http://www.getmdl.io/index.html#toggles-section/checkbox')
	]);
var _debois$elm_mdl$Demo_Toggles$srcUrl = 'https://github.com/debois/elm-mdl/blob/master/demo/Demo/Toggles.elm';
var _debois$elm_mdl$Demo_Toggles$intro = A2(_debois$elm_mdl$Demo_Page$fromMDL, 'http://www.getmdl.io/index.html#toggles-section/checkbox', '\n> The Material Design Lite (MDL) checkbox component is an enhanced version of the\n> standard HTML `<input type=\"checkbox\">` element. A checkbox consists of a small\n> square and, typically, text that clearly communicates a binary condition that\n> will be set or unset when the user clicks or touches it. Checkboxes typically,\n> but not necessarily, appear in groups, and can be selected and deselected\n> individually. The MDL checkbox component allows you to add display and click\n>     effects.\n> \n> Checkboxes are a common feature of most user interfaces, regardless of a site\'s\n> content or function. Their design and use is therefore an important factor in\n> the overall user experience. [...]\n> \n> The enhanced checkbox component has a more vivid visual look than a standard\n> checkbox, and may be initially or programmatically disabled.\n');
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
	radios: 2
};
var _debois$elm_mdl$Demo_Toggles$Model = F3(
	function (a, b, c) {
		return {mdl: a, toggles: b, radios: c};
	});
var _debois$elm_mdl$Demo_Toggles$Radio = function (a) {
	return {ctor: 'Radio', _0: a};
};
var _debois$elm_mdl$Demo_Toggles$Switch = function (a) {
	return {ctor: 'Switch', _0: a};
};
var _debois$elm_mdl$Demo_Toggles$MDL = function (a) {
	return {ctor: 'MDL', _0: a};
};
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
			default:
				return A3(_debois$elm_mdl$Material$update, _debois$elm_mdl$Demo_Toggles$MDL, _p0._0, model);
		}
	});
var _debois$elm_mdl$Demo_Toggles$view = function (model) {
	return A5(
		_debois$elm_mdl$Demo_Page$body2,
		'Toggles',
		_debois$elm_mdl$Demo_Toggles$srcUrl,
		_debois$elm_mdl$Demo_Toggles$intro,
		_debois$elm_mdl$Demo_Toggles$references,
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A4(
						_debois$elm_mdl$Material_Toggles$switch,
						_debois$elm_mdl$Demo_Toggles$MDL,
						_elm_lang$core$Native_List.fromArray(
							[0]),
						model.mdl,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Toggles$onChange(
								_debois$elm_mdl$Demo_Toggles$Switch(0)),
								_debois$elm_mdl$Material_Toggles$value(
								A2(_debois$elm_mdl$Demo_Toggles$get, 0, model))
							])),
						A4(
						_debois$elm_mdl$Material_Toggles$checkbox,
						_debois$elm_mdl$Demo_Toggles$MDL,
						_elm_lang$core$Native_List.fromArray(
							[1]),
						model.mdl,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Toggles$onChange(
								_debois$elm_mdl$Demo_Toggles$Switch(1)),
								_debois$elm_mdl$Material_Toggles$value(
								A2(_debois$elm_mdl$Demo_Toggles$get, 1, model))
							])),
						A5(
						_debois$elm_mdl$Material_Toggles$radio,
						_debois$elm_mdl$Demo_Toggles$MDL,
						_elm_lang$core$Native_List.fromArray(
							[2]),
						model.mdl,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Toggles$value(
								_elm_lang$core$Native_Utils.eq(2, model.radios)),
								_debois$elm_mdl$Material_Toggles$name('MyRadioGroup'),
								_debois$elm_mdl$Material_Toggles$onChange(
								_debois$elm_mdl$Demo_Toggles$Radio(2))
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Foo')
							])),
						A5(
						_debois$elm_mdl$Material_Toggles$radio,
						_debois$elm_mdl$Demo_Toggles$MDL,
						_elm_lang$core$Native_List.fromArray(
							[3]),
						model.mdl,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Toggles$value(
								_elm_lang$core$Native_Utils.eq(3, model.radios)),
								_debois$elm_mdl$Material_Toggles$name('MyRadioGroup'),
								_debois$elm_mdl$Material_Toggles$onChange(
								_debois$elm_mdl$Demo_Toggles$Radio(3))
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('Bar')
							]))
					]))
			]));
};

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
						'https://code.getmdl.io/1.1.3/',
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

var _debois$elm_mdl$Main$stylesheet = _debois$elm_mdl$Material_Options$stylesheet('\n  /* The following line is better done in html. We keep it here for\n     compatibility with elm-reactor.\n   */\n  @import url(\"assets/styles/github-gist.css\");\n\n  blockquote:before { content: none; }\n  blockquote:after { content: none; }\n  blockquote {\n    border-left-style: solid;\n    border-width: 1px;\n    padding-left: 1.3ex;\n    border-color: rgb(255,82,82);\n    font-style: normal;\n      /* TODO: Really need a way to specify \"secondary color\" in\n         inline css.\n       */\n  }\n  p, blockquote { \n    max-width: 40em;\n  }\n\n  h1, h2 { \n    /* TODO. Need typography module with kerning. */\n    margin-left: -3px;\n  }\n\n  pre { \n    background-color: #f8f8f8; \n    padding-top: .5rem;\n    padding-bottom: 1rem;\n    padding-left:1rem;\n  }\n');
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
						_debois$elm_mdl$Material_Color$background(_debois$elm_mdl$Material_Color$primary)
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('404')
					]))
			]));
};
var _debois$elm_mdl$Main$header = _elm_lang$core$Native_List.fromArray(
	[
		A2(
		_debois$elm_mdl$Material_Layout$row,
		_elm_lang$core$Native_List.fromArray(
			[]),
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
	]);
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
					]))
			]))
	]);
var _debois$elm_mdl$Main$nth = F2(
	function (k, xs) {
		return _elm_lang$core$List$head(
			A2(_elm_lang$core$List$drop, k, xs));
	});
var _debois$elm_mdl$Main$model = {mdl: _debois$elm_mdl$Material$model, buttons: _debois$elm_mdl$Demo_Buttons$model, badges: _debois$elm_mdl$Demo_Badges$model, menus: _debois$elm_mdl$Demo_Menus$model, textfields: _debois$elm_mdl$Demo_Textfields$model, toggles: _debois$elm_mdl$Demo_Toggles$model, snackbar: _debois$elm_mdl$Demo_Snackbar$model, selectedTab: 0};
var _debois$elm_mdl$Main$Model = F8(
	function (a, b, c, d, e, f, g, h) {
		return {mdl: a, buttons: b, badges: c, menus: d, textfields: e, toggles: f, snackbar: g, selectedTab: h};
	});
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
var _debois$elm_mdl$Main$ButtonsMsg = function (a) {
	return {ctor: 'ButtonsMsg', _0: a};
};
var _debois$elm_mdl$Main$BadgesMsg = function (a) {
	return {ctor: 'BadgesMsg', _0: a};
};
var _debois$elm_mdl$Main$tabs = _elm_lang$core$Native_List.fromArray(
	[
		{
		ctor: '_Tuple3',
		_0: 'Buttons',
		_1: 'buttons',
		_2: function (_p1) {
			return A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Main$ButtonsMsg,
				_debois$elm_mdl$Demo_Buttons$view(
					function (_) {
						return _.buttons;
					}(_p1)));
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Menus',
		_1: 'menus',
		_2: function (_p2) {
			return A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Main$MenusMsg,
				_debois$elm_mdl$Demo_Menus$view(
					function (_) {
						return _.menus;
					}(_p2)));
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Badges',
		_1: 'badges',
		_2: function (_p3) {
			return A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Main$BadgesMsg,
				_debois$elm_mdl$Demo_Badges$view(
					function (_) {
						return _.badges;
					}(_p3)));
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Elevation',
		_1: 'elevation',
		_2: function (_p4) {
			return _debois$elm_mdl$Demo_Elevation$view;
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Grid',
		_1: 'grid',
		_2: function (_p5) {
			return _debois$elm_mdl$Demo_Grid$view;
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Snackbar',
		_1: 'snackbar',
		_2: function (_p6) {
			return A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Main$SnackbarMsg,
				_debois$elm_mdl$Demo_Snackbar$view(
					function (_) {
						return _.snackbar;
					}(_p6)));
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Textfields',
		_1: 'textfields',
		_2: function (_p7) {
			return A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Main$TextfieldMsg,
				_debois$elm_mdl$Demo_Textfields$view(
					function (_) {
						return _.textfields;
					}(_p7)));
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Loading',
		_1: 'loading',
		_2: function (_p8) {
			return _debois$elm_mdl$Demo_Loading$view;
		}
	},
		{
		ctor: '_Tuple3',
		_0: 'Toggles',
		_1: 'toggles',
		_2: function (_p9) {
			return A2(
				_elm_lang$html$Html_App$map,
				_debois$elm_mdl$Main$TogglesMsg,
				_debois$elm_mdl$Demo_Toggles$view(
					function (_) {
						return _.toggles;
					}(_p9)));
		}
	}
	]);
var _debois$elm_mdl$Main$tabViews = _elm_lang$core$Array$fromList(
	A2(
		_elm_lang$core$List$map,
		function (_p10) {
			var _p11 = _p10;
			return _p11._2;
		},
		_debois$elm_mdl$Main$tabs));
var _debois$elm_mdl$Main$tabTitles = A2(
	_elm_lang$core$List$map,
	function (_p12) {
		var _p13 = _p12;
		return _elm_lang$html$Html$text(_p13._0);
	},
	_debois$elm_mdl$Main$tabs);
var _debois$elm_mdl$Main$Mdl = function (a) {
	return {ctor: 'Mdl', _0: a};
};
var _debois$elm_mdl$Main$update = F2(
	function (action, model) {
		var _p14 = action;
		switch (_p14.ctor) {
			case 'SelectTab':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{selectedTab: _p14._0}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'Mdl':
				return A3(_debois$elm_mdl$Material$update, _debois$elm_mdl$Main$Mdl, _p14._0, model);
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
					_p14._0,
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
					_p14._0,
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
					_p14._0,
					model);
			case 'TextfieldMsg':
				return A6(
					_debois$elm_mdl$Material_Helpers$lift,
					function (_) {
						return _.textfields;
					},
					F2(
						function (m, x) {
							return _elm_lang$core$Native_Utils.update(
								m,
								{textfields: x});
						}),
					_debois$elm_mdl$Main$TextfieldMsg,
					_debois$elm_mdl$Demo_Textfields$update,
					_p14._0,
					model);
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
					_p14._0,
					model);
			default:
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
					_p14._0,
					model);
		}
	});
var _debois$elm_mdl$Main$SelectTab = function (a) {
	return {ctor: 'SelectTab', _0: a};
};
var _debois$elm_mdl$Main$view = function (model) {
	var top = A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$style(
				_elm_lang$core$Native_List.fromArray(
					[
						{ctor: '_Tuple2', _0: 'margin', _1: 'auto'},
						{ctor: '_Tuple2', _0: 'padding-left', _1: '8%'},
						{ctor: '_Tuple2', _0: 'padding-right', _1: '8%'}
					]))
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$core$Maybe$withDefault,
				_debois$elm_mdl$Main$e404,
				A2(_elm_lang$core$Array$get, model.selectedTab, _debois$elm_mdl$Main$tabViews))(model)
			]));
	return function (contents) {
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					A3(_debois$elm_mdl$Material_Scheme$topWithScheme, _debois$elm_mdl$Material_Color$Teal, _debois$elm_mdl$Material_Color$Red, contents),
					A3(
					_elm_lang$html$Html$node,
					'script',
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_elm_lang$html$Html_Attributes$attribute, 'src', 'assets/highlight.pack.js')
						]),
					_elm_lang$core$Native_List.fromArray(
						[]))
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
					_debois$elm_mdl$Material_Layout$fixedHeader,
					_debois$elm_mdl$Material_Layout$fixedDrawer
				]),
			{
				header: _debois$elm_mdl$Main$header,
				drawer: _debois$elm_mdl$Main$drawer,
				tabs: {
					ctor: '_Tuple2',
					_0: _debois$elm_mdl$Main$tabTitles,
					_1: _elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Color$background(
							A2(_debois$elm_mdl$Material_Color$color, _debois$elm_mdl$Material_Color$Teal, _debois$elm_mdl$Material_Color$S400))
						])
				},
				main: _elm_lang$core$Native_List.fromArray(
					[_debois$elm_mdl$Main$stylesheet, top])
			}));
};
var _debois$elm_mdl$Main$main = {
	main: _elm_lang$html$Html_App$program(
		{
			init: {
				ctor: '_Tuple2',
				_0: _debois$elm_mdl$Main$model,
				_1: _debois$elm_mdl$Material_Layout$sub0(_debois$elm_mdl$Main$Mdl)
			},
			view: _debois$elm_mdl$Main$view,
			subscriptions: _debois$elm_mdl$Material_Layout$subs(_debois$elm_mdl$Main$Mdl),
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

