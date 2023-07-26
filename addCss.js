(function () {
  "use strict";
  function e(e) {
    (window.addCss = function () {
      var e = e || window.jQuery,
        t = e(window),
        n = e(document),
        r = {};
      if (document.getElementById("txtAddCss"))
        return e("#txtAddCss").toggle(), !1;
      var i = 500,
        s = {
          localStorage: (function () {
            try {
              return "localStorage" in window && window.localStorage !== null;
            } catch (e) {
              return !1;
            }
          })(),
          dynamicStyle: !0,
        },
        o = e("<div />", { id: "containerAddCss" }).appendTo(e("body")),
        u = {
          parse: function (e) {
            h(e);
          },
          replace: function () {
            u = new less.Parser();
          },
        };
      window.less && window.less.Parser
        ? u.replace()
        : e.getScript(
            "https://cdnjs.cloudflare.com/ajax/libs/less.js/1.3.0/less-1.3.0.min.js",
            u.replace
          );
      var a = e("<style />", { id: "styleAddCss" })
          .html("/**/")
          .appendTo(e("body")),
        f = e('<textarea tabindex="-1" />', { id: "txtAddCss", spellcheck: !1 }).appendTo(o);
      e("<link />", {
        rel: "stylesheet",
        type: "text/css",
        href:
          location.hostname.match("localhost") &&
          document.title.match("Add CSS Bookmarklet")
            ? "/addcss.css"
            : "https://raw.githubusercontent.com/loursk/add-css/03cb9cb258a516f88309aae43384dddd7ec25516/addCss.js?token=GHSAT0AAAAAACEGFLKEMAEGJFSVMV3SK6JSZGBGIMA",
      })
        .appendTo(o)
        .on("load", function () {
          f.focus();
        });
      var l = e("<span />", { id: "spAddCssHandle" }).appendTo(o);
      document.getElementById("styleAddCss").innerHTML !== "/**/" &&
        ((s.dynamicStyle = !1), (i = 1e3));
      var c = function (e) {
          try {
            u.parse(e, function (t, n) {
              if (t) return !1;
              h(n.toCSS()), s.localStorage && (localStorage.addCss = e);
            });
          } catch (t) {}
        },
        h = function (t) {
          s.dynamicStyle
            ? a.html(t)
            : (a.replaceWith("<style id='styleAddCss'>" + t + "</style>"),
              (a = e(document.getElementById("styleAddCss"))));
        };
      (function () {
        function t(e) {
          if (e.selectionStart) return e.selectionStart;
          if (document.selection) {
            e.focus();
            var t = document.selection.createRange();
            if (t == null) return 0;
            var n = e.createTextRange(),
              r = n.duplicate();
            return (
              n.moveToBookmark(t.getBookmark()),
              r.setEndPoint("EndToStart", n),
              r.text.length
            );
          }
          return 0;
        }
        function n(e, t) {
          if (e.setSelectionRange) e.setSelectionRange(t, t);
          else if (e.createTextRange) {
            var n = e.createTextRange();
            n.collapse(!0),
              n.moveEnd("character", t),
              n.moveStart("character", t),
              n.select();
          }
        }
        var e = { ESC: 27, TAB: 9 };
        f.bind("keyup change", function () {
          r.keyup =
            r.keyup ||
            setTimeout(function () {
              var e = f.val();
              c(e), (r.keyup = undefined);
            }, i);
        }).bind("keydown", function (r) {
          var i = r.which;
          if (i === e.ESC) f.toggle();
          else if (i === e.TAB) {
            var s = f.val(),
              o = t(f[0]);
            return (
              f.val(s.substr(0, o) + "	" + s.substr(o)), o++, n(f[0], o), !1
            );
          }
        });
      })(),
        s.localStorage &&
          (localStorage.addCss && f.val(localStorage.addCss).change(),
          localStorage.addCssCss && f.css(e.parseJSON(localStorage.addCssCss))),
        (function () {
          function o() {
            var e = 40,
              n = { width: t.width(), height: t.height() },
              s = { width: f.width(), height: f.height() };
            if (n.width < s.width + e) {
              var o = n.width - e;
              f.css("width", o), (i.start.width = o);
            }
            if (n.height < s.height + e) {
              var u = n.height - e;
              f.css("height", u), (i.start.height = u);
            }
            r.windowResize = undefined;
          }
          var e = { start: {}, diff: {} },
            i = {
              start: { width: f.width(), height: f.height() },
              end: { width: undefined, height: undefined },
            },
            u = {
              startDrag: function (t) {
                return (
                  (e.start = {
                    x: t.clientX || t.pageX,
                    y: t.clientY || t.pageY,
                  }),
                  n
                    .on("mousemove", u.onMouseMove)
                    .on("mouseup", u.endDrag)
                    .on("keypress", u.endDrag),
                  !1
                );
              },
              onMouseMove: function (t) {
                (e.diff.x = e.start.x - (t.clientX || t.pageX)),
                  (e.diff.y = e.start.y - (t.clientY || t.pageY)),
                  (i.end.width = i.start.width + e.diff.x),
                  (i.end.height = i.start.height + e.diff.y),
                  f.css(i.end);
              },
              endDrag: function (t) {
                return (
                  s.localStorage &&
                    (localStorage.addCssCss = JSON.stringify(i.end)),
                  (e.diff = { x: 0, y: 0 }),
                  (i = {
                    start: { width: f.width(), height: f.height() },
                    end: { width: undefined, height: undefined },
                  }),
                  n
                    .off("mousemove", u.onMouseMove)
                    .off("mouseup", u.endDrag)
                    .off("keypress", u.endDrag),
                  o(),
                  !1
                );
              },
            };
          l.on("mousedown", u.startDrag),
            t
              .on("resize", function () {
                r.windowResize = r.windowResize || setTimeout(o, 10);
              })
              .resize();
        })();
    }),
      window.addCss();
  }
  var t = "1.7";
  if (window.jQuery === undefined || window.jQuery.fn.jquery < t) {
    var n = !1,
      r = document.createElement("script");
    (r.src =
      "https://ajax.googleapis.com/ajax/libs/jquery/" + t + "/jquery.min.js"),
      (r.onload = r.onreadystatechange =
        function () {
          !n &&
            (!this.readyState ||
              this.readyState === "loaded" ||
              this.readyState === "complete") &&
            ((n = !0), e(jQuery));
        }),
      document.getElementsByTagName("head")[0].appendChild(r);
  } else e(jQuery);
})();
