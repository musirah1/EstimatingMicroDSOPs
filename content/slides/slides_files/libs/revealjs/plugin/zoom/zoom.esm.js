/*!
 * reveal.js Zoom plugin
 */
var e = {
    id: "zoom",
    init: function (e) {
      e.getRevealElement().addEventListener("mousedown", function (n) {
        var o = /Linux/.test(window.navigator.platform) ? "ctrl" : "alt",
          i = (e.getConfig().zoomKey ? e.getConfig().zoomKey : o) + "Key",
          d = e.getConfig().zoomLevel ? e.getConfig().zoomLevel : 2;
        n[i] &&
          !e.isOverview() &&
          (n.preventDefault(),
          t.to({ x: n.clientX, y: n.clientY, scale: d, pan: !1 }));
      });
    },
    destroy: function () {
      t.reset();
    },
  },
  t = (function () {
    var e = 1,
      n = 0,
      o = 0,
      i = -1,
      d = -1,
      l = "transform" in document.body.style;
    function s(t, n) {
      var o = r();
      if (
        ((t.width = t.width || 1),
        (t.height = t.height || 1),
        (t.x -= (window.innerWidth - t.width * n) / 2),
        (t.y -= (window.innerHeight - t.height * n) / 2),
        l)
      )
        if (1 === n) document.body.style.transform = "";
        else {
          var i = o.x + "px " + o.y + "px",
            d = "translate(" + -t.x + "px," + -t.y + "px) scale(" + n + ")";
          (document.body.style.transformOrigin = i),
            (document.body.style.transform = d);
        }
      else
        1 === n
          ? ((document.body.style.position = ""),
            (document.body.style.left = ""),
            (document.body.style.top = ""),
            (document.body.style.width = ""),
            (document.body.style.height = ""),
            (document.body.style.zoom = ""))
          : ((document.body.style.position = "relative"),
            (document.body.style.left = -(o.x + t.x) / n + "px"),
            (document.body.style.top = -(o.y + t.y) / n + "px"),
            (document.body.style.width = 100 * n + "%"),
            (document.body.style.height = 100 * n + "%"),
            (document.body.style.zoom = n));
      (e = n),
        document.documentElement.classList &&
          (1 !== e
            ? document.documentElement.classList.add("zoomed")
            : document.documentElement.classList.remove("zoomed"));
    }
    function c() {
      var t = 0.12 * window.innerWidth,
        i = 0.12 * window.innerHeight,
        d = r();
      o < i
        ? window.scroll(d.x, d.y - (14 / e) * (1 - o / i))
        : o > window.innerHeight - i &&
          window.scroll(
            d.x,
            d.y + (1 - (window.innerHeight - o) / i) * (14 / e),
          ),
        n < t
          ? window.scroll(d.x - (14 / e) * (1 - n / t), d.y)
          : n > window.innerWidth - t &&
            window.scroll(
              d.x + (1 - (window.innerWidth - n) / t) * (14 / e),
              d.y,
            );
    }
    function r() {
      return {
        x: void 0 !== window.scrollX ? window.scrollX : window.pageXOffset,
        y: void 0 !== window.scrollY ? window.scrollY : window.pageYOffset,
      };
    }
    return (
      l && (document.body.style.transition = "transform 0.8s ease"),
      document.addEventListener("keyup", function (n) {
        1 !== e && 27 === n.keyCode && t.out();
      }),
      document.addEventListener("mousemove", function (t) {
        1 !== e && ((n = t.clientX), (o = t.clientY));
      }),
      {
        to: function (n) {
          if (1 !== e) t.out();
          else {
            if (((n.x = n.x || 0), (n.y = n.y || 0), n.element)) {
              var o = n.element.getBoundingClientRect();
              (n.x = o.left - 20),
                (n.y = o.top - 20),
                (n.width = o.width + 40),
                (n.height = o.height + 40);
            }
            void 0 !== n.width &&
              void 0 !== n.height &&
              (n.scale = Math.max(
                Math.min(
                  window.innerWidth / n.width,
                  window.innerHeight / n.height,
                ),
                1,
              )),
              n.scale > 1 &&
                ((n.x *= n.scale),
                (n.y *= n.scale),
                s(n, n.scale),
                !1 !== n.pan &&
                  (i = setTimeout(function () {
                    d = setInterval(c, 1e3 / 60);
                  }, 800)));
          }
        },
        out: function () {
          clearTimeout(i), clearInterval(d), s({ x: 0, y: 0 }, 1), (e = 1);
        },
        magnify: function (e) {
          this.to(e);
        },
        reset: function () {
          this.out();
        },
        zoomLevel: function () {
          return e;
        },
      }
    );
  })();
export default function () {
  return e;
}
