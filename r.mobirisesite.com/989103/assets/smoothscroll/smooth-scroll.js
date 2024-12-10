//
// SmoothScroll for websites v1.4.10 (Balazs Galambosi)
// http://www.smoothscroll.net/
//
// Licensed under the terms of the MIT license.
//
// You may use it in your theme if you credit me. 
// It is also free to use on any individual website.
//
// Exception:
// The only restriction is to not publish any  
// extension for browsers or native application
// without getting a written permission first.
//
(function() {
    function C() {
        if (!D && document.body) {
            D = !0;
            var a = document.body,
                b = document.documentElement,
                d = window.innerHeight,
                c = a.scrollHeight;
            k = 0 <= document.compatMode.indexOf("CSS") ? b : a;
            m = a;
            f.keyboardSupport && window.addEventListener("keydown", M, !1);
            if (top != self) v = !0;
            else if (ca && c > d && (a.offsetHeight <= d || b.offsetHeight <= d)) {
                var e = document.createElement("div");
                e.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + k.scrollHeight + "px";
                document.body.appendChild(e);
                var h;
                w = function() {
                    h ||
                        (h = setTimeout(function() {
                            e.style.height = "0";
                            e.style.height = k.scrollHeight + "px";
                            h = null
                        }, 500))
                };
                setTimeout(w, 10);
                window.addEventListener("resize", w, !1);
                z = new da(w);
                z.observe(a, {
                    attributes: !0,
                    childList: !0,
                    characterData: !1
                });
                k.offsetHeight <= d && (d = document.createElement("div"), d.style.clear = "both", a.appendChild(d))
            }
            f.fixedBackground || (a.style.backgroundAttachment = "scroll", b.style.backgroundAttachment = "scroll")
        }
    }

    function N(a, b, d) {
        ea(b, d);
        if (1 != f.accelerationMax) {
            var c = Date.now() - E;
            c < f.accelerationDelta &&
                (c = (1 + 50 / c) / 2, 1 < c && (c = Math.min(c, f.accelerationMax), b *= c, d *= c));
            E = Date.now()
        }
        t.push({
            x: b,
            y: d,
            lastX: 0 > b ? .99 : -.99,
            lastY: 0 > d ? .99 : -.99,
            start: Date.now()
        });
        if (!F) {
            var c = O(),
                e = a === c || a === document.body;
            null == a.$scrollBehavior && fa(a) && (a.$scrollBehavior = a.style.scrollBehavior, a.style.scrollBehavior = "auto");
            var h = function(c) {
                c = Date.now();
                for (var g = 0, k = 0, l = 0; l < t.length; l++) {
                    var n = t[l],
                        p = c - n.start,
                        m = p >= f.animationTime,
                        q = m ? 1 : p / f.animationTime;
                    f.pulseAlgorithm && (p = q, 1 <= p ? q = 1 : 0 >= p ? q = 0 : (1 == f.pulseNormalize && (f.pulseNormalize /=
                        P(1)), q = P(p)));
                    p = n.x * q - n.lastX >> 0;
                    q = n.y * q - n.lastY >> 0;
                    g += p;
                    k += q;
                    n.lastX += p;
                    n.lastY += q;
                    m && (t.splice(l, 1), l--)
                }
                e ? window.scrollBy(g, k) : (g && (a.scrollLeft += g), k && (a.scrollTop += k));
                b || d || (t = []);
                t.length ? Q(h, a, 1E3 / f.frameRate + 1) : (F = !1, null != a.$scrollBehavior && (a.style.scrollBehavior = a.$scrollBehavior, a.$scrollBehavior = null))
            };
            Q(h, a, 0);
            F = !0
        }
    }

    function R(a) {
        D || C();
        var b = a.target;
        if (a.defaultPrevented || a.ctrlKey || r(m, "embed") || r(b, "embed") && /\.pdf/i.test(b.src) || r(m, "object") || b.shadowRoot) return !0;
        var d = -a.wheelDeltaX ||
            a.deltaX || 0,
            c = -a.wheelDeltaY || a.deltaY || 0;
        ga && (a.wheelDeltaX && x(a.wheelDeltaX, 120) && (d = -120 * (a.wheelDeltaX / Math.abs(a.wheelDeltaX))), a.wheelDeltaY && x(a.wheelDeltaY, 120) && (c = -120 * (a.wheelDeltaY / Math.abs(a.wheelDeltaY))));
        d || c || (c = -a.wheelDelta || 0);
        1 === a.deltaMode && (d *= 40, c *= 40);
        b = S(b);
        if (!b) return v && G ? (Object.defineProperty(a, "target", {
            value: window.frameElement
        }), parent.wheel(a)) : !0;
        if (ha(c)) return !0;
        1.2 < Math.abs(d) && (d *= f.stepSize / 120);
        1.2 < Math.abs(c) && (c *= f.stepSize / 120);
        N(b, d, c);
        a.preventDefault();
        T()
    }

    function M(a) {
        var b = a.target,
            d = a.ctrlKey || a.altKey || a.metaKey || a.shiftKey && a.keyCode !== h.spacebar;
        document.body.contains(m) || (m = document.activeElement);
        var c = /^(textarea|select|embed|object)$/i,
            e = /^(button|submit|radio|checkbox|file|color|image)$/i;
        if (!(c = a.defaultPrevented || c.test(b.nodeName) || r(b, "input") && !e.test(b.type) || r(m, "video"))) {
            var c = a.target,
                g = !1;
            if (-1 != document.URL.indexOf("www.youtube.com/watch")) {
                do
                    if (g = c.classList && c.classList.contains("html5-video-controls")) break; while (c = c.parentNode)
            }
            c = g
        }
        if (c || b.isContentEditable || d || (r(b, "button") || r(b, "input") && e.test(b.type)) && a.keyCode === h.spacebar || r(b, "input") && "radio" == b.type && ia[a.keyCode]) return !0;
        c = b = 0;
        d = S(m);
        if (!d) return v && G ? parent.keydown(a) : !0;
        e = d.clientHeight;
        d == document.body && (e = window.innerHeight);
        switch (a.keyCode) {
            case h.up:
                c = -f.arrowScroll;
                break;
            case h.down:
                c = f.arrowScroll;
                break;
            case h.spacebar:
                c = a.shiftKey ? 1 : -1;
                c = -c * e * .9;
                break;
            case h.pageup:
                c = .9 * -e;
                break;
            case h.pagedown:
                c = .9 * e;
                break;
            case h.home:
                d == document.body && document.scrollingElement &&
                    (d = document.scrollingElement);
                c = -d.scrollTop;
                break;
            case h.end:
                e = d.scrollHeight - d.scrollTop - e;
                c = 0 < e ? e + 10 : 0;
                break;
            case h.left:
                b = -f.arrowScroll;
                break;
            case h.right:
                b = f.arrowScroll;
                break;
            default:
                return !0
        }
        N(d, b, c);
        a.preventDefault();
        T()
    }

    function U(a) {
        m = a.target
    }

    function T() {
        clearTimeout(V);
        V = setInterval(function() {
            W = H = A = {}
        }, 1E3)
    }

    function I(a, b, d) {
        d = d ? W : H;
        for (var c = a.length; c--;) d[J(a[c])] = b;
        return b
    }

    function S(a) {
        var b = [],
            d = document.body,
            c = k.scrollHeight;
        do {
            var e = H[J(a)];
            if (e) return I(b, e);
            b.push(a);
            if (c ===
                a.scrollHeight) {
                if (e = X(k) && X(d) || Y(k), v && k.clientHeight + 10 < k.scrollHeight || !v && e) return I(b, O())
            } else if (a.clientHeight + 10 < a.scrollHeight && Y(a)) return I(b, a)
        } while (a = a.parentElement)
    }

    function X(a) {
        return "hidden" !== getComputedStyle(a, "").getPropertyValue("overflow-y")
    }

    function Y(a) {
        a = getComputedStyle(a, "").getPropertyValue("overflow-y");
        return "scroll" === a || "auto" === a
    }

    function fa(a) {
        var b = J(a);
        null == A[b] && (a = getComputedStyle(a, "")["scroll-behavior"], A[b] = "smooth" == a);
        return A[b]
    }

    function r(a, b) {
        return a &&
            (a.nodeName || "").toLowerCase() === b.toLowerCase()
    }

    function ea(a, b) {
        a = 0 < a ? 1 : -1;
        b = 0 < b ? 1 : -1;
        if (B.x !== a || B.y !== b) B.x = a, B.y = b, t = [], E = 0
    }

    function ha(a) {
        if (a) {
            l.length || (l = [a, a, a]);
            a = Math.abs(a);
            l.push(a);
            l.shift();
            clearTimeout(Z);
            Z = setTimeout(function() {
                try {
                    localStorage.SS_deltaBuffer = l.join(",")
                } catch (a) {}
            }, 1E3);
            var b = 120 < a && K(a),
                b = !K(120) && !K(100) && !b;
            return 50 > a ? !0 : b
        }
    }

    function x(a, b) {
        return Math.floor(a / b) == a / b
    }

    function K(a) {
        return x(l[0], a) && x(l[1], a) && x(l[2], a)
    }

    function P(a) {
        var b;
        a *= f.pulseScale;
        1 >
            a ? b = a - (1 - Math.exp(-a)) : (b = Math.exp(-1), --a, a = 1 - Math.exp(-a), b += a * (1 - b));
        return b * f.pulseNormalize
    }

    function y(a) {
        for (var b in a) aa.hasOwnProperty(b) && (f[b] = a[b])
    }
    var aa = {
            frameRate: 150,
            animationTime: 400,
            stepSize: 100,
            pulseAlgorithm: !0,
            pulseScale: 4,
            pulseNormalize: 1,
            accelerationDelta: 50,
            accelerationMax: 3,
            keyboardSupport: !0,
            arrowScroll: 50,
            fixedBackground: !0,
            excluded: ""
        },
        f = aa,
        v = !1,
        B = {
            x: 0,
            y: 0
        },
        D = !1,
        k = document.documentElement,
        m, z, w, l = [],
        Z, ga = /^Mac/.test(navigator.platform),
        h = {
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            spacebar: 32,
            pageup: 33,
            pagedown: 34,
            end: 35,
            home: 36
        },
        ia = {
            37: 1,
            38: 1,
            39: 1,
            40: 1
        },
        t = [],
        F = !1,
        E = Date.now(),
        J = function() {
            var a = 0;
            return function(b) {
                return b.uniqueID || (b.uniqueID = a++)
            }
        }(),
        W = {},
        H = {},
        V, A = {};
    if (window.localStorage && localStorage.SS_deltaBuffer) try {
        l = localStorage.SS_deltaBuffer.split(",")
    } catch (la) {}
    var Q = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(a, b, d) {
                window.setTimeout(a, d || 1E3 / 60)
            }
        }(),
        da = window.MutationObserver ||
        window.WebKitMutationObserver || window.MozMutationObserver,
        O = function() {
            var a = document.scrollingElement;
            return function() {
                if (!a) {
                    var b = document.createElement("div");
                    b.style.cssText = "height:10000px;width:1px;";
                    document.body.appendChild(b);
                    var d = document.body.scrollTop;
                    window.scrollBy(0, 3);
                    a = document.body.scrollTop != d ? document.body : document.documentElement;
                    window.scrollBy(0, -3);
                    document.body.removeChild(b)
                }
                return a
            }
        }(),
        g = window.navigator.userAgent,
        u = /Edge/.test(g),
        G = /chrome/i.test(g) && !u,
        u = /safari/i.test(g) &&
        !u,
        ja = /mobile/i.test(g),
        ka = /Windows NT 6.1/i.test(g) && /rv:11/i.test(g),
        ca = u && (/Version\/8/i.test(g) || /Version\/9/i.test(g)),
        g = (G || u || ka) && !ja,
        ba = !1;
    try {
        window.addEventListener("test", null, Object.defineProperty({}, "passive", {
            get: function() {
                ba = !0
            }
        }))
    } catch (ma) {}
    var u = ba ? {
            passive: !1
        } : !1,
        L = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
    L && g && (window.addEventListener(L, R, u || !1), window.addEventListener("mousedown", U, !1), window.addEventListener("load", C, !1));
    y.destroy = function() {
        z && z.disconnect();
        window.removeEventListener(L, R, !1);
        window.removeEventListener("mousedown", U, !1);
        window.removeEventListener("keydown", M, !1);
        window.removeEventListener("resize", w, !1);
        window.removeEventListener("load", C, !1)
    };
    window.SmoothScrollOptions && y(window.SmoothScrollOptions);
    "function" === typeof define && define.amd ? define(function() {
        return y
    }) : "object" == typeof exports ? module.exports = y : window.SmoothScroll = y
})();