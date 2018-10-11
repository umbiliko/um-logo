    var epsilon = 1 / 32;

    function angle(center, point) {
        var x = point.x - center.x,
        	y = point.y - center.y,
        	phi = Math.atan(Math.abs(x / y));

        if (x < 0 && y < 0) {
            phi = Math.PI + phi;
        } else if (x < 0) {
            phi = 2 * Math.PI - phi;
        } else if (y < 0) {
            phi = Math.PI - phi;
        }

        return phi;
    };

    // point where lines context-midA and midB-ending intersects
    function calcControl(context, midA, midB, ending) {
        var xa = (context.x - midA.x),
        	xb = (midB.x - ending.x),
        	ya = (context.y - midA.y),
        	yb = (midB.y - ending.y);

        var d = xa * yb - ya * xb,
        	a = (context.x * midA.y - context.y * midA.x),
        	b = (midB.x * ending.y - midB.y * ending.x);

        return {
            x: (a * xb - xa * b) / d,
            y: (a * yb - ya * b) / d,
            z: context.z + (ending.z - context.z) / 2
        };
    };

    function normalize(v) {
        var l = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
        v.x = v.x / l;
        v.y = v.y / l;
        v.z = v.z / l;
        return v;
    };

    function pad(num, totalChars) {
        var pad = '0';
        num = num + '';
        while (num.length < totalChars) {
            num = pad + num;
        }
        return num;
    };

    function rotate(u, v, sin, cos) {
        var icos = 1 - cos;

        var ux = u.x,
        	uy = u.y,
        	uz = u.z;

        var uxx = ux * ux,
        	uyy = uy * uy,
        	uzz = uz * uz,
        	uyz = uy * uz,
        	uzx = uz * ux,
        	uxy = ux * uy;

        var m11 = cos + uxx * icos,
        	m12 = uxy * icos - uz * sin,
        	m13 = uzx * icos + uy * sin;

        var m21 = uxy * icos + uz * sin,
        	m22 = cos + uyy * icos,
        	m23 = uyz * icos - ux * sin;

        var m31 = uzx * icos - uy * sin,
        	m32 = uyz * icos + ux * sin,
        	m33 = cos + uzz * icos;

        return {
            x: m11 * v.x + m12 * v.y + m13 * v.z,
            y: m21 * v.x + m22 * v.y + m23 * v.z,
            z: m31 * v.x + m32 * v.y + m33 * v.z
        };
    }

    // Rotate X
    function rotateX(u, cos, sin) {
        var y = cos * u.y - sin * u.z;
        var z = sin * u.y + cos * u.z;

        u.y = y;
        u.z = z;

        return normalize(u);
    };

    function rotateY(u, cos, sin) {
        var x = cos * u.x + sin * u.z;
        var z = cos * u.z - sin * u.x;

        u.x = x;
        u.z = z;

        return normalize(u);
    }

    function rotateZ(u, cos, sin) {
        var x = cos * u.x - sin * u.y;
        var y = sin * u.x + cos * u.y;

        u.x = x;
        u.y = y;

        return normalize(u);
    }

    function Color(value) {
        this.Value = value;
        var _opacity = 1;

        // Ratio is between 0 and 1
        this.change = function (ratio, darker) {
            if (arguments.length == 0 && _opacity === 1) {
                return this.Value;
            }

            var color = this.Value;

            // Trim trailing/leading whitespace
            color = color.replace(/^\s*|\s*$/, '');

            // Expand three-digit hex
            color = color.replace(
		        /^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i,
		        '#$1$1$2$2$3$3'
		    	);

            // Calculate ratio
            var difference = Math.round(ratio * 256) * (darker ? -1 : 1),
	        // Determine if input is RGB(A)
	        rgb = color.match(new RegExp('^rgba?\\(\\s*' +
	            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
	            '\\s*,\\s*' +
	            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
	            '\\s*,\\s*' +
	            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
	            '(?:\\s*,\\s*' +
	            '(0|1|0?\\.\\d+))?' +
	            '\\s*\\)$'
	        , 'i')),
	        alpha = _opacity/*!!rgb && rgb[4] != null ? rgb[4] : null*/,

	        // Convert hex to decimal
	        decimal = !!rgb ? [rgb[1], rgb[2], rgb[3]] : color.replace(
	            /^#?([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])/i,
	            function () {
	                return parseInt(arguments[1], 16) + ',' +
	                    parseInt(arguments[2], 16) + ',' +
	                    parseInt(arguments[3], 16);
	            }
	        ).split(/,/),
	        returnValue;

            if (arguments.length == 0) {
                return 'rgba(' + parseInt(decimal[0], 10) + ', ' + parseInt(decimal[1], 10) + ', ' + parseInt(decimal[2], 10) + ', ' + alpha + ')';
            }

            // Return RGB(A)
            return !!rgb ?
	        'rgb' + (alpha !== null ? 'a' : '') + '(' +
	            Math[darker ? 'max' : 'min'](
	                parseInt(decimal[0], 10) + difference, darker ? 0 : 255
	            ) + ', ' +
	            Math[darker ? 'max' : 'min'](
	                parseInt(decimal[1], 10) + difference, darker ? 0 : 255
	            ) + ', ' +
	            Math[darker ? 'max' : 'min'](
	                parseInt(decimal[2], 10) + difference, darker ? 0 : 255
	            ) +
	            (alpha !== null ? ', ' + alpha : '') +
	            ')' :
	        // Return hex
	        [
	            '#',
	            pad(Math[darker ? 'max' : 'min'](
	                parseInt(decimal[0], 10) + difference, darker ? 0 : 255
	            ).toString(16), 2),
	            pad(Math[darker ? 'max' : 'min'](
	                parseInt(decimal[1], 10) + difference, darker ? 0 : 255
	            ).toString(16), 2),
	            pad(Math[darker ? 'max' : 'min'](
	                parseInt(decimal[2], 10) + difference, darker ? 0 : 255
	            ).toString(16), 2)
	        ].join('');
        };

        this.lighter = function (ratio) {
            return this.change(ratio, false);
        };

        this.darker = function (ratio) {
            return this.change(ratio, true);
        };

        this.opacity = function () {
            if (arguments.length === 0) {
                return _opacity;
            }
            _opacity = Math.max(0, Math.min(1, arguments[0]));
            return this;
        };

        this.value = function () {
            return this.change();
        };
    }

    function vector(x, y, z) {
        return {
            x: x,
            y: y,
            z: z
        };
    };

    function circlePlot(phi, r) {
        return {
            x: Math.sin(phi) * r,
            y: Math.cos(phi) * r,
            z: 0
        };
    };

    function smallArc(ctx, center, context, r, a, b) {
        if (a == b) {
            return false;
        }
        if (a > b && a - b > Math.PI) {
            a = a - 2 * Math.PI;
        } else if (b > a && b - a > Math.PI) {
            b = b - 2 * Math.PI;
        }
        arc(ctx, center, context, r, a, b);
    };

    function arc(ctx, center, context, r, a, b) {
        var angle = b - a;
        var accuracy = Math.PI / 16;
        var steps = Math.abs(Math.ceil(angle / accuracy));

        if (steps == 0) {
            return context;
        }

        var mhu = angle / steps;
        var phi = a;

        var eps = mhu < 0 ? -epsilon : epsilon;
        for (var i = 0; i < steps; i++) {

            var rho = phi + mhu;
            var ending = translate(center, circlePlot(rho, r));
            var control = calcControl(context,
			    translate(center, circlePlot(phi + eps, r)),
			    translate(center, circlePlot(rho - eps, r)), ending);

            ctx.quadraticCurveTo(control.x, control.y, ending.x, ending.y);

            phi = rho;
            context = ending;
        }
        return context;
    };

    function drawArc(ctx, center, context, r, a, b, color) {
        ctx.strokeStyle = color;
        ctx.moveTo(context.x, context.y);
        ctx.beginPath();
        arc(ctx, center, context, r, a, b);
        ctx.stroke();
    };

    function traceCircle(ctx, center, r) {
        return arc(ctx, center, translate(center, { x: r, y: 0, z: 0 }), r, 0, 2 * Math.PI);
    };

    function drawCircle(ctx, center, r, color) {
        drawArc(ctx, center, { x: r, y: 0, z: 0 }, r, 0, 2 * Math.PI, color);
    };

    function longArc(ctx, center, context, r, a, b, u, v) {
        var angle = b - a;
        var accuracy = Math.PI / 16;
        var steps = Math.abs(Math.ceil(angle / accuracy));
        steps = 8;
        var mhu = angle / steps;

        var phi = a;

        for (var i = 0; i < steps; i++) {

            var rho = phi + mhu;
            var ending = translate(center, splot(rho, r, u, v));

            var control = calcControl(context,
	                translate(center, splot(phi + epsilon, r, u, v)),
	                translate(center, splot(rho - epsilon, r, u, v)), ending);

            ctx.quadraticCurveTo(control.x, control.y, ending.x, ending.y);

            phi = rho;
            context = ending;
        }
        return context;
    };

    function drawVisibleArc(ctx, center, r, u, v, color) {

        var phi = 0;
        var rho = 2 * Math.PI;
        if (v.z != 0) {
            phi = Math.atan(-u.z / v.z);

            if (v.z < 0) {
                phi = phi + Math.PI;
            }

            if (phi < 0) {
                phi = 2 * Math.PI + phi;
            } else if (phi > 2 * Math.PI) {
                phi = phi - 2 * Math.PI;
            }
            rho = phi + Math.PI;
        }

        ctx.beginPath();
        ctx.strokeStyle = color;
        var context = longArc(ctx, center, r, phi, rho, u, v);
        ctx.stroke();

        return context;
    };

    // To get a parametric equation follow this procedure.
    // 1. Let N be a unit normal vector for the plane.
    // 2. Let C be the circle center, and let R be the radius.
    // 3. Let U be a unit vector from C toward a point on the circle.
    // 4. Let V = N x U.
    // 5. Let t be the paramter.
    // 6. A point P is on the circle if...
    // P = C + R cos(t) U + R sin(t) V
    function splot(rho, r, u, v) {
        var x = r * Math.cos(rho);
        var y = r * Math.sin(rho);

        return {
            x: x * u.x + y * v.x,
            y: x * u.y + y * v.y,
            z: x * u.z + y * v.z
        };
    };

    function plot(u, r) {
        return {
            x: u.x * r,
            y: u.y * r,
            z: u.z * r
        };
    };

    function translate(u, v) {
        return {
            x: u.x + v.x,
            y: u.y + v.y,
            z: u.z + v.z
        };
    };

    function Spinner(options) {
        var _center,
			_colors,
	    	_radio,
	    	_x = { x: 1, y: 0, z: 0 },
	    	_y = { x: 0, y: 1, z: 0 },
	    	_z = { x: 0, y: 0, z: 1 };

        var settings = $.extend({
            center: { x: 100, y: 100, z: 0 },
            colors: ['#693', '#369', '#369', '#693', '#369', '#693', '#693', '#369', '#FFF'],
            radio: 100,
            split: 10
        }, options);

        _center = settings.center;
        _colors = settings.colors;
        _opacity = 1;
        _radio = settings.radio;
        _split = settings.split;

        this.center = function () {
            switch (arguments.length) {
                case 1:
                    var v = arguments[0];
                    _center.x = v.x;
                    _center.y = v.y;
                    _center.z = v.z;
                    break;
                case 3:
                    _center.x = arguments[0];
                    _center.y = arguments[1];
                    _center.z = arguments[2];
                    break;
            }
            return { x: _center.x, y: _center.y, z: _center.z };
        };

        this.colors = function () {
            switch (arguments.length) {
                case 0:
                    return _colors;
                case 1:
                    _colors = arguments[0];
                    return this;
                default:
                    _colors = Array.prototype.slice.call(arguments);
                    return this;
            }
        };

        this.opacity = function () {
            if (arguments.length === 0) {
                return _opacity;
            }
            _opacity = arguments[0];
            return this;
        };

        this.radio = function () {
            if (arguments.length === 0) {
                return _radio;
            }
            _radio = arguments[0];
            return this;
        };

        this.split = function () {
            if (arguments.length === 0) {
                return _split;
            }
            _split = arguments[0];
            return this;
        };

        this.x = function () {
            switch (arguments.length) {
                case 0:
                    return { x: _x.x, y: _x.y, z: _x.z };
                case 1:
                    var v = arguments[0];
                    _x.x = v.x;
                    _x.y = v.y;
                    _x.z = v.z;
                    return this;
                case 3:
                    _x.x = arguments[0];
                    _x.y = arguments[1];
                    _x.z = arguments[2];
                    return this;
                default:
                    return this;
            }
        };

        this.y = function () {
            switch (arguments.length) {
                case 0:
                    return { x: _y.x, y: _y.y, z: _y.z };
                case 1:
                    var v = arguments[0];
                    _y.x = v.x;
                    _y.y = v.y;
                    _y.z = v.z;
                    return this;
                case 3:
                    _y.x = arguments[0];
                    _y.y = arguments[1];
                    _y.z = arguments[2];
                    return this;
                default:
                    return this;
            }
        };

        this.z = function () {
            switch (arguments.length) {
                case 0:
                    return { x: _z.x, y: _z.y, z: _z.z };
                case 1:
                    var v = arguments[0];
                    _z.x = v.x;
                    _z.y = v.y;
                    _z.z = v.z;
                    return this;
                case 3:
                    _z.x = arguments[0];
                    _z.y = arguments[1];
                    _z.z = arguments[2];
                    return this;
                default:
                    return this;
            }
        };
    };

    Spinner.prototype = {

        paint: function (ctx) {
            var center = this.center(),
	        	colors = this.colors();

            var r = this.radio();
            var d = this.split();

            var qx = this.x(),
		        qy = this.y(),
		        qz = this.z();

            var h = Math.sqrt(r * r - d * d);
            var mhu = Math.asin(d / r);

            if (colors.length > 8) {
                var gradient = null;
                try {
                    var color = new Color(colors[8]).opacity(_opacity);
                    p0 = center;
                    p1 = translate(center, circlePlot(Math.PI / 4, r));
                    gradient = ctx.createRadialGradient(p0.x, p0.y, r, p1.x, p1.y, r);
                    gradient.addColorStop(0, color.lighter(0.2));
                    gradient.addColorStop(0.5, color.value());
                    gradient.addColorStop(1, color.darker(0.2));
                }
                catch (err) {
                    gradient = color.value();
                }
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(center.x, center.y, r, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fill();
                ctx.strokeStyle = color.opacity(_opacity * .2).value();
                ctx.stroke();
            }

            //ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            for (var i = 0; i < 8; i++) {
                var q = 7 - i;
                var vx = ((q << 1) & 2) - 1,
		        	vy = (q & 2) - 1,
		        	vz = ((q >> 1) & 2) - 1;

                var x = plot(qx, vx);
                var y = plot(qy, vy);
                var z = plot(qz, vz);

                var cos = Math.sqrt(2) / 2;
                var sin = cos * vx * vy * vz;

                var wx = rotate(x, y, sin, cos),
		        	wy = rotate(y, z, sin, cos),
		        	wz = rotate(z, x, sin, cos);

                var ux = translate(plot(wx, d / cos), plot(x, h)),
		        	uy = translate(plot(wy, d / cos), plot(y, h)),
		        	uz = translate(plot(wz, d / cos), plot(z, h));

                if (ux.z < 0 && uy.z < 0 && uz.z < 0) {
                    continue;
                }

                var color = new Color(colors[i]);
                if (_opacity >= 0 && _opacity < 1) {
                    color.opacity(_opacity);
                }
                var gradient = null;
                try {

                    p0 = center;
                    p1 = translate(center, circlePlot(Math.PI / 4, r));
                    gradient = ctx.createRadialGradient(p0.x, p0.y, r, p1.x, p1.y, r);
                    gradient.addColorStop(0, color.lighter(0.2));
                    gradient.addColorStop(0.5, color.value());
                    gradient.addColorStop(1, color.darker(0.2));
                }
                catch (err) {
                    gradient = color.value();
                }
                ctx.fillStyle = gradient;

                var px = translate(center, ux),
		        	py = translate(center, uy),
		        	pz = translate(center, uz);

                var x = plot(qx, vx),
		        	y = plot(qy, vy),
		        	z = plot(qz, vz);

                var cx = translate(center, plot(x, d)),
		        	cy = translate(center, plot(y, d)),
		        	cz = translate(center, plot(z, d));

                var phi = { x: mhu, y: mhu, z: mhu },
			        rho = {
			            x: Math.PI / 2 - mhu,
			            y: Math.PI / 2 - mhu,
			            z: Math.PI / 2 - mhu
			        };

                if (ux.z > 0 && uy.z > 0 && uz.z > 0) {
                    ctx.beginPath();
                    ctx.moveTo(py.x, py.y);
                    longArc(ctx, cx, py, h, phi.x, rho.x, y, z);
                    longArc(ctx, cy, pz, h, phi.y, rho.y, z, x);
                    longArc(ctx, cz, px, h, phi.z, rho.z, x, y);
                    ctx.closePath();
                    ctx.fill();
                }
                else {
                    var axy, axz, ayx, ayz, azx, azy;
                    var pxy = px, pxz = px, pyx = py, pyz = py, pzx = pz, pzy = pz;

                    if (ux.z < 0) {
                        rho.y = Math.atan(-uz.z / ux.z);
                        phi.z = Math.atan(-ux.z / uy.z);

                        pxy = translate(cy, splot(rho.y, h, z, x));
                        pxz = translate(cz, splot(phi.z, h, x, y));

                        axz = angle(center, pxz);
                        axy = angle(center, pxy);
                    }

                    if (uy.z < 0) {
                        phi.x = Math.atan(-uy.z / uz.z);
                        rho.z = Math.atan(-ux.z / uy.z);

                        pyx = translate(cx, splot(phi.x, h, y, z));
                        pyz = translate(cz, splot(rho.z, h, x, y));

                        ayx = angle(center, pyx);
                        ayz = angle(center, pyz);
                    }

                    if (uz.z < 0) {
                        rho.x = Math.atan(-uy.z / uz.z);
                        phi.y = Math.atan(-uz.z / ux.z);

                        pzx = translate(cx, splot(rho.x, h, y, z));
                        pzy = translate(cy, splot(phi.y, h, z, x));

                        azx = angle(center, pzx);
                        azy = angle(center, pzy);
                    }

                    if (ux.z > 0 && uy.z > 0) {
                        ctx.moveTo(pzx.x, pzx.y);
                        ctx.beginPath();
                        longArc(ctx, cy, pzy, h, phi.y, rho.y, z, x);
                        longArc(ctx, cz, pxz, h, phi.z, rho.z, x, y);
                        longArc(ctx, cx, pyx, h, phi.x, rho.x, y, z);
                        smallArc(ctx, center, pzx, r, azx, azy);
                        ctx.closePath();
                        ctx.fill();
                    } else if (uy.z > 0 && uz.z > 0) {
                        ctx.moveTo(pxz.x, pxz.y);
                        ctx.beginPath();
                        longArc(ctx, cz, pxz, h, phi.z, rho.z, x, y);
                        longArc(ctx, cx, pyx, h, phi.x, rho.x, y, z);
                        longArc(ctx, cy, pzx, h, phi.y, rho.y, z, x);
                        smallArc(ctx, center, pxy, r, axy, axz);
                        ctx.closePath();
                        ctx.fill();
                    } else if (uz.z > 0 && ux.z > 0) {
                        ctx.moveTo(pyx.x, pyx.y);
                        ctx.beginPath();
                        longArc(ctx, cx, pyx, h, phi.x, rho.x, y, z);
                        longArc(ctx, cy, pzx, h, phi.y, rho.y, z, x);
                        longArc(ctx, cz, pxz, h, phi.z, rho.z, x, y);
                        smallArc(ctx, center, pyz, r, ayz, ayx);
                        ctx.closePath();
                        ctx.fill();
                    } else if (ux.z > 0) {
                        ctx.moveTo(pzy.x, pzy.y);
                        ctx.beginPath();
                        longArc(ctx, cy, pzy, h, phi.y, rho.y, z, x);
                        longArc(ctx, cz, pxz, h, phi.z, rho.z, x, y);
                        smallArc(ctx, center, pyz, r, ayz, azy);
                        ctx.closePath();
                        ctx.fill();
                    } else if (uy.z > 0) {
                        ctx.moveTo(pxz.x, pxz.y);
                        ctx.beginPath();
                        longArc(ctx, cz, pxz, h, phi.z, rho.z, x, y);
                        longArc(ctx, cx, pyx, h, phi.x, rho.x, y, z);
                        smallArc(ctx, center, pzx, r, azx, axz);
                        ctx.closePath();
                        ctx.fill();
                    } else if (uz.z > 0) {
                        ctx.moveTo(pyx.x, pyx.y);
                        ctx.beginPath();
                        longArc(ctx, cx, pyx, h, phi.x, rho.x, y, z);
                        longArc(ctx, cy, pzy, h, phi.y, rho.y, z, x);
                        smallArc(ctx, center, pxy, r, axy, ayx);
                        ctx.closePath();
                        ctx.fill();
                    }
                }
            }
        },

        rotate: function (x, y, z) {

            var qx = this.x(),
		        qy = this.y(),
		        qz = this.z();

            if (x != 0) {
                var cosX = Math.cos(x);
                var sinX = Math.sin(x);
                rotateX(qx, cosX, sinX);
                rotateX(qy, cosX, sinX);
                rotateX(qz, cosX, sinX);
            }

            if (y != 0) {
                var cosY = Math.cos(y);
                var sinY = Math.sin(y);
                rotateY(qx, cosY, sinY);
                rotateY(qy, cosY, sinY);
                rotateY(qz, cosY, sinY);
            }

            if (z != 0) {
                var cosZ = Math.cos(z);
                var sinZ = Math.sin(z);
                rotateZ(qx, cosZ, sinZ);
                rotateZ(qy, cosZ, sinZ);
                rotateZ(qz, cosZ, sinZ);
            }

            this.x(qx);
            this.y(qy);
            this.z(qz);
        }
    };

    export function create(split) {

        var $backdrop = $('<div class="spinner"></div>').appendTo($('body')),
            $container = $('<div class="container"></div>').appendTo($backdrop),
            $canvas = $('<canvas></canvas>').appendTo($container),
            canvas = $canvas.get(0),
            interval,
            opacity,
            spinner;

        function paint() {
            var ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            spinner.paint(ctx);

            return this;
        };

        function rotate(speed) {
            spinner.rotate(
                (spinner.x().y != NaN ? spinner.x().y / speed.x : 0),
                (spinner.y().x != NaN ? spinner.y().x / speed.y : 0),
                Math.PI / speed.z);

            return this;
        };

        function spin() {
            $('body').addClass('busy');
            canvas.height = $container.width();
            canvas.width = $container.height();

            var radio = Math.floor(canvas.width / 2);

            spinner = new Spinner({
                center: { x: radio, y: radio },
                radio: radio,
                split: Math.floor(radio * split)
            });

            spinner.opacity(opacity);

            var speed = {
                x: 666 + (666 * Math.random() - 333),
                y: 666 + (666 * Math.random() - 333),
                z: 666 + (666 * Math.random() - 333),
            };

            rotate({
                x: speed.x / 100,
                y: speed.y / 100,
                z: speed.z / 100
            });

            paint();

            interval = setInterval(function () {

                rotate(speed);

                paint();

            }, 10);

            return this;
        };

        function stop() {
            $('body').removeClass('busy');

            if (interval) {
                clearInterval(interval);
                interval = null;
            }

            spinner = null;

            return this;
        };

        return {
            opacity: function () {
                if (arguments.length === 0) {
                    return opacity;
                }

                opacity = Math.max(0, Math.min(1, arguments[0]));

                return this;
            },
            paint: paint,
            rotate: rotate,
            spin: spin,
            stop: stop,
        }
    };