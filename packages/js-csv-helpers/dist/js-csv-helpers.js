(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod2) => function __require() {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
    mod2
  ));

  // node_modules/papaparse/papaparse.min.js
  var require_papaparse_min = __commonJS({
    "node_modules/papaparse/papaparse.min.js"(exports, module) {
      !function(e, t) {
        "function" == typeof define && define.amd ? define([], t) : "object" == typeof module && "undefined" != typeof exports ? module.exports = t() : e.Papa = t();
      }(exports, function s2() {
        "use strict";
        var f = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== f ? f : {};
        var n = !f.document && !!f.postMessage, o = f.IS_PAPA_WORKER || false, a = {}, u = 0, b = { parse: function(e, t) {
          var r2 = (t = t || {}).dynamicTyping || false;
          J(r2) && (t.dynamicTypingFunction = r2, r2 = {});
          if (t.dynamicTyping = r2, t.transform = !!J(t.transform) && t.transform, t.worker && b.WORKERS_SUPPORTED) {
            var i = function() {
              if (!b.WORKERS_SUPPORTED) return false;
              var e2 = (r3 = f.URL || f.webkitURL || null, i2 = s2.toString(), b.BLOB_URL || (b.BLOB_URL = r3.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ", "(", i2, ")();"], { type: "text/javascript" })))), t2 = new f.Worker(e2);
              var r3, i2;
              return t2.onmessage = _, t2.id = u++, a[t2.id] = t2;
            }();
            return i.userStep = t.step, i.userChunk = t.chunk, i.userComplete = t.complete, i.userError = t.error, t.step = J(t.step), t.chunk = J(t.chunk), t.complete = J(t.complete), t.error = J(t.error), delete t.worker, void i.postMessage({ input: e, config: t, workerId: i.id });
          }
          var n2 = null;
          b.NODE_STREAM_INPUT, "string" == typeof e ? (e = function(e2) {
            if (65279 === e2.charCodeAt(0)) return e2.slice(1);
            return e2;
          }(e), n2 = t.download ? new l(t) : new p(t)) : true === e.readable && J(e.read) && J(e.on) ? n2 = new g(t) : (f.File && e instanceof File || e instanceof Object) && (n2 = new c(t));
          return n2.stream(e);
        }, unparse: function(e, t) {
          var n2 = false, _2 = true, m2 = ",", y2 = "\r\n", s3 = '"', a2 = s3 + s3, r2 = false, i = null, o2 = false;
          !function() {
            if ("object" != typeof t) return;
            "string" != typeof t.delimiter || b.BAD_DELIMITERS.filter(function(e2) {
              return -1 !== t.delimiter.indexOf(e2);
            }).length || (m2 = t.delimiter);
            ("boolean" == typeof t.quotes || "function" == typeof t.quotes || Array.isArray(t.quotes)) && (n2 = t.quotes);
            "boolean" != typeof t.skipEmptyLines && "string" != typeof t.skipEmptyLines || (r2 = t.skipEmptyLines);
            "string" == typeof t.newline && (y2 = t.newline);
            "string" == typeof t.quoteChar && (s3 = t.quoteChar);
            "boolean" == typeof t.header && (_2 = t.header);
            if (Array.isArray(t.columns)) {
              if (0 === t.columns.length) throw new Error("Option columns is empty");
              i = t.columns;
            }
            void 0 !== t.escapeChar && (a2 = t.escapeChar + s3);
            ("boolean" == typeof t.escapeFormulae || t.escapeFormulae instanceof RegExp) && (o2 = t.escapeFormulae instanceof RegExp ? t.escapeFormulae : /^[=+\-@\t\r].*$/);
          }();
          var u2 = new RegExp(Q(s3), "g");
          "string" == typeof e && (e = JSON.parse(e));
          if (Array.isArray(e)) {
            if (!e.length || Array.isArray(e[0])) return h2(null, e, r2);
            if ("object" == typeof e[0]) return h2(i || Object.keys(e[0]), e, r2);
          } else if ("object" == typeof e) return "string" == typeof e.data && (e.data = JSON.parse(e.data)), Array.isArray(e.data) && (e.fields || (e.fields = e.meta && e.meta.fields || i), e.fields || (e.fields = Array.isArray(e.data[0]) ? e.fields : "object" == typeof e.data[0] ? Object.keys(e.data[0]) : []), Array.isArray(e.data[0]) || "object" == typeof e.data[0] || (e.data = [e.data])), h2(e.fields || [], e.data || [], r2);
          throw new Error("Unable to serialize unrecognized input");
          function h2(e2, t2, r3) {
            var i2 = "";
            "string" == typeof e2 && (e2 = JSON.parse(e2)), "string" == typeof t2 && (t2 = JSON.parse(t2));
            var n3 = Array.isArray(e2) && 0 < e2.length, s4 = !Array.isArray(t2[0]);
            if (n3 && _2) {
              for (var a3 = 0; a3 < e2.length; a3++) 0 < a3 && (i2 += m2), i2 += v2(e2[a3], a3);
              0 < t2.length && (i2 += y2);
            }
            for (var o3 = 0; o3 < t2.length; o3++) {
              var u3 = n3 ? e2.length : t2[o3].length, h3 = false, f2 = n3 ? 0 === Object.keys(t2[o3]).length : 0 === t2[o3].length;
              if (r3 && !n3 && (h3 = "greedy" === r3 ? "" === t2[o3].join("").trim() : 1 === t2[o3].length && 0 === t2[o3][0].length), "greedy" === r3 && n3) {
                for (var d2 = [], l2 = 0; l2 < u3; l2++) {
                  var c2 = s4 ? e2[l2] : l2;
                  d2.push(t2[o3][c2]);
                }
                h3 = "" === d2.join("").trim();
              }
              if (!h3) {
                for (var p2 = 0; p2 < u3; p2++) {
                  0 < p2 && !f2 && (i2 += m2);
                  var g2 = n3 && s4 ? e2[p2] : p2;
                  i2 += v2(t2[o3][g2], p2);
                }
                o3 < t2.length - 1 && (!r3 || 0 < u3 && !f2) && (i2 += y2);
              }
            }
            return i2;
          }
          function v2(e2, t2) {
            if (null == e2) return "";
            if (e2.constructor === Date) return JSON.stringify(e2).slice(1, 25);
            var r3 = false;
            o2 && "string" == typeof e2 && o2.test(e2) && (e2 = "'" + e2, r3 = true);
            var i2 = e2.toString().replace(u2, a2);
            return (r3 = r3 || true === n2 || "function" == typeof n2 && n2(e2, t2) || Array.isArray(n2) && n2[t2] || function(e3, t3) {
              for (var r4 = 0; r4 < t3.length; r4++) if (-1 < e3.indexOf(t3[r4])) return true;
              return false;
            }(i2, b.BAD_DELIMITERS) || -1 < i2.indexOf(m2) || " " === i2.charAt(0) || " " === i2.charAt(i2.length - 1)) ? s3 + i2 + s3 : i2;
          }
        } };
        if (b.RECORD_SEP = String.fromCharCode(30), b.UNIT_SEP = String.fromCharCode(31), b.BYTE_ORDER_MARK = "\uFEFF", b.BAD_DELIMITERS = ["\r", "\n", '"', b.BYTE_ORDER_MARK], b.WORKERS_SUPPORTED = !n && !!f.Worker, b.NODE_STREAM_INPUT = 1, b.LocalChunkSize = 10485760, b.RemoteChunkSize = 5242880, b.DefaultDelimiter = ",", b.Parser = E, b.ParserHandle = r, b.NetworkStreamer = l, b.FileStreamer = c, b.StringStreamer = p, b.ReadableStreamStreamer = g, f.jQuery) {
          var d = f.jQuery;
          d.fn.parse = function(o2) {
            var r2 = o2.config || {}, u2 = [];
            return this.each(function(e2) {
              if (!("INPUT" === d(this).prop("tagName").toUpperCase() && "file" === d(this).attr("type").toLowerCase() && f.FileReader) || !this.files || 0 === this.files.length) return true;
              for (var t = 0; t < this.files.length; t++) u2.push({ file: this.files[t], inputElem: this, instanceConfig: d.extend({}, r2) });
            }), e(), this;
            function e() {
              if (0 !== u2.length) {
                var e2, t, r3, i, n2 = u2[0];
                if (J(o2.before)) {
                  var s3 = o2.before(n2.file, n2.inputElem);
                  if ("object" == typeof s3) {
                    if ("abort" === s3.action) return e2 = "AbortError", t = n2.file, r3 = n2.inputElem, i = s3.reason, void (J(o2.error) && o2.error({ name: e2 }, t, r3, i));
                    if ("skip" === s3.action) return void h2();
                    "object" == typeof s3.config && (n2.instanceConfig = d.extend(n2.instanceConfig, s3.config));
                  } else if ("skip" === s3) return void h2();
                }
                var a2 = n2.instanceConfig.complete;
                n2.instanceConfig.complete = function(e3) {
                  J(a2) && a2(e3, n2.file, n2.inputElem), h2();
                }, b.parse(n2.file, n2.instanceConfig);
              } else J(o2.complete) && o2.complete();
            }
            function h2() {
              u2.splice(0, 1), e();
            }
          };
        }
        function h(e) {
          this._handle = null, this._finished = false, this._completed = false, this._halted = false, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = true, this._completeResults = { data: [], errors: [], meta: {} }, function(e2) {
            var t = w(e2);
            t.chunkSize = parseInt(t.chunkSize), e2.step || e2.chunk || (t.chunkSize = null);
            this._handle = new r(t), (this._handle.streamer = this)._config = t;
          }.call(this, e), this.parseChunk = function(e2, t) {
            if (this.isFirstChunk && J(this._config.beforeFirstChunk)) {
              var r2 = this._config.beforeFirstChunk(e2);
              void 0 !== r2 && (e2 = r2);
            }
            this.isFirstChunk = false, this._halted = false;
            var i = this._partialLine + e2;
            this._partialLine = "";
            var n2 = this._handle.parse(i, this._baseIndex, !this._finished);
            if (!this._handle.paused() && !this._handle.aborted()) {
              var s3 = n2.meta.cursor;
              this._finished || (this._partialLine = i.substring(s3 - this._baseIndex), this._baseIndex = s3), n2 && n2.data && (this._rowCount += n2.data.length);
              var a2 = this._finished || this._config.preview && this._rowCount >= this._config.preview;
              if (o) f.postMessage({ results: n2, workerId: b.WORKER_ID, finished: a2 });
              else if (J(this._config.chunk) && !t) {
                if (this._config.chunk(n2, this._handle), this._handle.paused() || this._handle.aborted()) return void (this._halted = true);
                n2 = void 0, this._completeResults = void 0;
              }
              return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(n2.data), this._completeResults.errors = this._completeResults.errors.concat(n2.errors), this._completeResults.meta = n2.meta), this._completed || !a2 || !J(this._config.complete) || n2 && n2.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = true), a2 || n2 && n2.meta.paused || this._nextChunk(), n2;
            }
            this._halted = true;
          }, this._sendError = function(e2) {
            J(this._config.error) ? this._config.error(e2) : o && this._config.error && f.postMessage({ workerId: b.WORKER_ID, error: e2, finished: false });
          };
        }
        function l(e) {
          var i;
          (e = e || {}).chunkSize || (e.chunkSize = b.RemoteChunkSize), h.call(this, e), this._nextChunk = n ? function() {
            this._readChunk(), this._chunkLoaded();
          } : function() {
            this._readChunk();
          }, this.stream = function(e2) {
            this._input = e2, this._nextChunk();
          }, this._readChunk = function() {
            if (this._finished) this._chunkLoaded();
            else {
              if (i = new XMLHttpRequest(), this._config.withCredentials && (i.withCredentials = this._config.withCredentials), n || (i.onload = v(this._chunkLoaded, this), i.onerror = v(this._chunkError, this)), i.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !n), this._config.downloadRequestHeaders) {
                var e2 = this._config.downloadRequestHeaders;
                for (var t in e2) i.setRequestHeader(t, e2[t]);
              }
              if (this._config.chunkSize) {
                var r2 = this._start + this._config.chunkSize - 1;
                i.setRequestHeader("Range", "bytes=" + this._start + "-" + r2);
              }
              try {
                i.send(this._config.downloadRequestBody);
              } catch (e3) {
                this._chunkError(e3.message);
              }
              n && 0 === i.status && this._chunkError();
            }
          }, this._chunkLoaded = function() {
            4 === i.readyState && (i.status < 200 || 400 <= i.status ? this._chunkError() : (this._start += this._config.chunkSize ? this._config.chunkSize : i.responseText.length, this._finished = !this._config.chunkSize || this._start >= function(e2) {
              var t = e2.getResponseHeader("Content-Range");
              if (null === t) return -1;
              return parseInt(t.substring(t.lastIndexOf("/") + 1));
            }(i), this.parseChunk(i.responseText)));
          }, this._chunkError = function(e2) {
            var t = i.statusText || e2;
            this._sendError(new Error(t));
          };
        }
        function c(e) {
          var i, n2;
          (e = e || {}).chunkSize || (e.chunkSize = b.LocalChunkSize), h.call(this, e);
          var s3 = "undefined" != typeof FileReader;
          this.stream = function(e2) {
            this._input = e2, n2 = e2.slice || e2.webkitSlice || e2.mozSlice, s3 ? ((i = new FileReader()).onload = v(this._chunkLoaded, this), i.onerror = v(this._chunkError, this)) : i = new FileReaderSync(), this._nextChunk();
          }, this._nextChunk = function() {
            this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk();
          }, this._readChunk = function() {
            var e2 = this._input;
            if (this._config.chunkSize) {
              var t = Math.min(this._start + this._config.chunkSize, this._input.size);
              e2 = n2.call(e2, this._start, t);
            }
            var r2 = i.readAsText(e2, this._config.encoding);
            s3 || this._chunkLoaded({ target: { result: r2 } });
          }, this._chunkLoaded = function(e2) {
            this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(e2.target.result);
          }, this._chunkError = function() {
            this._sendError(i.error);
          };
        }
        function p(e) {
          var r2;
          h.call(this, e = e || {}), this.stream = function(e2) {
            return r2 = e2, this._nextChunk();
          }, this._nextChunk = function() {
            if (!this._finished) {
              var e2, t = this._config.chunkSize;
              return t ? (e2 = r2.substring(0, t), r2 = r2.substring(t)) : (e2 = r2, r2 = ""), this._finished = !r2, this.parseChunk(e2);
            }
          };
        }
        function g(e) {
          h.call(this, e = e || {});
          var t = [], r2 = true, i = false;
          this.pause = function() {
            h.prototype.pause.apply(this, arguments), this._input.pause();
          }, this.resume = function() {
            h.prototype.resume.apply(this, arguments), this._input.resume();
          }, this.stream = function(e2) {
            this._input = e2, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError);
          }, this._checkIsFinished = function() {
            i && 1 === t.length && (this._finished = true);
          }, this._nextChunk = function() {
            this._checkIsFinished(), t.length ? this.parseChunk(t.shift()) : r2 = true;
          }, this._streamData = v(function(e2) {
            try {
              t.push("string" == typeof e2 ? e2 : e2.toString(this._config.encoding)), r2 && (r2 = false, this._checkIsFinished(), this.parseChunk(t.shift()));
            } catch (e3) {
              this._streamError(e3);
            }
          }, this), this._streamError = v(function(e2) {
            this._streamCleanUp(), this._sendError(e2);
          }, this), this._streamEnd = v(function() {
            this._streamCleanUp(), i = true, this._streamData("");
          }, this), this._streamCleanUp = v(function() {
            this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError);
          }, this);
        }
        function r(m2) {
          var a2, o2, u2, i = Math.pow(2, 53), n2 = -i, s3 = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/, h2 = /^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/, t = this, r2 = 0, f2 = 0, d2 = false, e = false, l2 = [], c2 = { data: [], errors: [], meta: {} };
          if (J(m2.step)) {
            var p2 = m2.step;
            m2.step = function(e2) {
              if (c2 = e2, _2()) g2();
              else {
                if (g2(), 0 === c2.data.length) return;
                r2 += e2.data.length, m2.preview && r2 > m2.preview ? o2.abort() : (c2.data = c2.data[0], p2(c2, t));
              }
            };
          }
          function y2(e2) {
            return "greedy" === m2.skipEmptyLines ? "" === e2.join("").trim() : 1 === e2.length && 0 === e2[0].length;
          }
          function g2() {
            return c2 && u2 && (k("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + b.DefaultDelimiter + "'"), u2 = false), m2.skipEmptyLines && (c2.data = c2.data.filter(function(e2) {
              return !y2(e2);
            })), _2() && function() {
              if (!c2) return;
              function e2(e3, t3) {
                J(m2.transformHeader) && (e3 = m2.transformHeader(e3, t3)), l2.push(e3);
              }
              if (Array.isArray(c2.data[0])) {
                for (var t2 = 0; _2() && t2 < c2.data.length; t2++) c2.data[t2].forEach(e2);
                c2.data.splice(0, 1);
              } else c2.data.forEach(e2);
            }(), function() {
              if (!c2 || !m2.header && !m2.dynamicTyping && !m2.transform) return c2;
              function e2(e3, t3) {
                var r3, i2 = m2.header ? {} : [];
                for (r3 = 0; r3 < e3.length; r3++) {
                  var n3 = r3, s4 = e3[r3];
                  m2.header && (n3 = r3 >= l2.length ? "__parsed_extra" : l2[r3]), m2.transform && (s4 = m2.transform(s4, n3)), s4 = v2(n3, s4), "__parsed_extra" === n3 ? (i2[n3] = i2[n3] || [], i2[n3].push(s4)) : i2[n3] = s4;
                }
                return m2.header && (r3 > l2.length ? k("FieldMismatch", "TooManyFields", "Too many fields: expected " + l2.length + " fields but parsed " + r3, f2 + t3) : r3 < l2.length && k("FieldMismatch", "TooFewFields", "Too few fields: expected " + l2.length + " fields but parsed " + r3, f2 + t3)), i2;
              }
              var t2 = 1;
              !c2.data.length || Array.isArray(c2.data[0]) ? (c2.data = c2.data.map(e2), t2 = c2.data.length) : c2.data = e2(c2.data, 0);
              m2.header && c2.meta && (c2.meta.fields = l2);
              return f2 += t2, c2;
            }();
          }
          function _2() {
            return m2.header && 0 === l2.length;
          }
          function v2(e2, t2) {
            return r3 = e2, m2.dynamicTypingFunction && void 0 === m2.dynamicTyping[r3] && (m2.dynamicTyping[r3] = m2.dynamicTypingFunction(r3)), true === (m2.dynamicTyping[r3] || m2.dynamicTyping) ? "true" === t2 || "TRUE" === t2 || "false" !== t2 && "FALSE" !== t2 && (function(e3) {
              if (s3.test(e3)) {
                var t3 = parseFloat(e3);
                if (n2 < t3 && t3 < i) return true;
              }
              return false;
            }(t2) ? parseFloat(t2) : h2.test(t2) ? new Date(t2) : "" === t2 ? null : t2) : t2;
            var r3;
          }
          function k(e2, t2, r3, i2) {
            var n3 = { type: e2, code: t2, message: r3 };
            void 0 !== i2 && (n3.row = i2), c2.errors.push(n3);
          }
          this.parse = function(e2, t2, r3) {
            var i2 = m2.quoteChar || '"';
            if (m2.newline || (m2.newline = function(e3, t3) {
              e3 = e3.substring(0, 1048576);
              var r4 = new RegExp(Q(t3) + "([^]*?)" + Q(t3), "gm"), i3 = (e3 = e3.replace(r4, "")).split("\r"), n4 = e3.split("\n"), s5 = 1 < n4.length && n4[0].length < i3[0].length;
              if (1 === i3.length || s5) return "\n";
              for (var a3 = 0, o3 = 0; o3 < i3.length; o3++) "\n" === i3[o3][0] && a3++;
              return a3 >= i3.length / 2 ? "\r\n" : "\r";
            }(e2, i2)), u2 = false, m2.delimiter) J(m2.delimiter) && (m2.delimiter = m2.delimiter(e2), c2.meta.delimiter = m2.delimiter);
            else {
              var n3 = function(e3, t3, r4, i3, n4) {
                var s5, a3, o3, u3;
                n4 = n4 || [",", "	", "|", ";", b.RECORD_SEP, b.UNIT_SEP];
                for (var h3 = 0; h3 < n4.length; h3++) {
                  var f3 = n4[h3], d3 = 0, l3 = 0, c3 = 0;
                  o3 = void 0;
                  for (var p3 = new E({ comments: i3, delimiter: f3, newline: t3, preview: 10 }).parse(e3), g3 = 0; g3 < p3.data.length; g3++) if (r4 && y2(p3.data[g3])) c3++;
                  else {
                    var _3 = p3.data[g3].length;
                    l3 += _3, void 0 !== o3 ? 0 < _3 && (d3 += Math.abs(_3 - o3), o3 = _3) : o3 = _3;
                  }
                  0 < p3.data.length && (l3 /= p3.data.length - c3), (void 0 === a3 || d3 <= a3) && (void 0 === u3 || u3 < l3) && 1.99 < l3 && (a3 = d3, s5 = f3, u3 = l3);
                }
                return { successful: !!(m2.delimiter = s5), bestDelimiter: s5 };
              }(e2, m2.newline, m2.skipEmptyLines, m2.comments, m2.delimitersToGuess);
              n3.successful ? m2.delimiter = n3.bestDelimiter : (u2 = true, m2.delimiter = b.DefaultDelimiter), c2.meta.delimiter = m2.delimiter;
            }
            var s4 = w(m2);
            return m2.preview && m2.header && s4.preview++, a2 = e2, o2 = new E(s4), c2 = o2.parse(a2, t2, r3), g2(), d2 ? { meta: { paused: true } } : c2 || { meta: { paused: false } };
          }, this.paused = function() {
            return d2;
          }, this.pause = function() {
            d2 = true, o2.abort(), a2 = J(m2.chunk) ? "" : a2.substring(o2.getCharIndex());
          }, this.resume = function() {
            t.streamer._halted ? (d2 = false, t.streamer.parseChunk(a2, true)) : setTimeout(t.resume, 3);
          }, this.aborted = function() {
            return e;
          }, this.abort = function() {
            e = true, o2.abort(), c2.meta.aborted = true, J(m2.complete) && m2.complete(c2), a2 = "";
          };
        }
        function Q(e) {
          return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }
        function E(j) {
          var z, M = (j = j || {}).delimiter, P = j.newline, U = j.comments, q = j.step, N = j.preview, B = j.fastMode, K = z = void 0 === j.quoteChar || null === j.quoteChar ? '"' : j.quoteChar;
          if (void 0 !== j.escapeChar && (K = j.escapeChar), ("string" != typeof M || -1 < b.BAD_DELIMITERS.indexOf(M)) && (M = ","), U === M) throw new Error("Comment character same as delimiter");
          true === U ? U = "#" : ("string" != typeof U || -1 < b.BAD_DELIMITERS.indexOf(U)) && (U = false), "\n" !== P && "\r" !== P && "\r\n" !== P && (P = "\n");
          var W = 0, H = false;
          this.parse = function(i, t, r2) {
            if ("string" != typeof i) throw new Error("Input must be a string");
            var n2 = i.length, e = M.length, s3 = P.length, a2 = U.length, o2 = J(q), u2 = [], h2 = [], f2 = [], d2 = W = 0;
            if (!i) return L();
            if (j.header && !t) {
              var l2 = i.split(P)[0].split(M), c2 = [], p2 = {}, g2 = false;
              for (var _2 in l2) {
                var m2 = l2[_2];
                J(j.transformHeader) && (m2 = j.transformHeader(m2, _2));
                var y2 = m2, v2 = p2[m2] || 0;
                for (0 < v2 && (g2 = true, y2 = m2 + "_" + v2), p2[m2] = v2 + 1; c2.includes(y2); ) y2 = y2 + "_" + v2;
                c2.push(y2);
              }
              if (g2) {
                var k = i.split(P);
                k[0] = c2.join(M), i = k.join(P);
              }
            }
            if (B || false !== B && -1 === i.indexOf(z)) {
              for (var b2 = i.split(P), E2 = 0; E2 < b2.length; E2++) {
                if (f2 = b2[E2], W += f2.length, E2 !== b2.length - 1) W += P.length;
                else if (r2) return L();
                if (!U || f2.substring(0, a2) !== U) {
                  if (o2) {
                    if (u2 = [], I(f2.split(M)), F(), H) return L();
                  } else I(f2.split(M));
                  if (N && N <= E2) return u2 = u2.slice(0, N), L(true);
                }
              }
              return L();
            }
            for (var w2 = i.indexOf(M, W), R = i.indexOf(P, W), C = new RegExp(Q(K) + Q(z), "g"), S = i.indexOf(z, W); ; ) if (i[W] !== z) if (U && 0 === f2.length && i.substring(W, W + a2) === U) {
              if (-1 === R) return L();
              W = R + s3, R = i.indexOf(P, W), w2 = i.indexOf(M, W);
            } else if (-1 !== w2 && (w2 < R || -1 === R)) f2.push(i.substring(W, w2)), W = w2 + e, w2 = i.indexOf(M, W);
            else {
              if (-1 === R) break;
              if (f2.push(i.substring(W, R)), D(R + s3), o2 && (F(), H)) return L();
              if (N && u2.length >= N) return L(true);
            }
            else for (S = W, W++; ; ) {
              if (-1 === (S = i.indexOf(z, S + 1))) return r2 || h2.push({ type: "Quotes", code: "MissingQuotes", message: "Quoted field unterminated", row: u2.length, index: W }), T();
              if (S === n2 - 1) return T(i.substring(W, S).replace(C, z));
              if (z !== K || i[S + 1] !== K) {
                if (z === K || 0 === S || i[S - 1] !== K) {
                  -1 !== w2 && w2 < S + 1 && (w2 = i.indexOf(M, S + 1)), -1 !== R && R < S + 1 && (R = i.indexOf(P, S + 1));
                  var O = A(-1 === R ? w2 : Math.min(w2, R));
                  if (i.substr(S + 1 + O, e) === M) {
                    f2.push(i.substring(W, S).replace(C, z)), i[W = S + 1 + O + e] !== z && (S = i.indexOf(z, W)), w2 = i.indexOf(M, W), R = i.indexOf(P, W);
                    break;
                  }
                  var x = A(R);
                  if (i.substring(S + 1 + x, S + 1 + x + s3) === P) {
                    if (f2.push(i.substring(W, S).replace(C, z)), D(S + 1 + x + s3), w2 = i.indexOf(M, W), S = i.indexOf(z, W), o2 && (F(), H)) return L();
                    if (N && u2.length >= N) return L(true);
                    break;
                  }
                  h2.push({ type: "Quotes", code: "InvalidQuotes", message: "Trailing quote on quoted field is malformed", row: u2.length, index: W }), S++;
                }
              } else S++;
            }
            return T();
            function I(e2) {
              u2.push(e2), d2 = W;
            }
            function A(e2) {
              var t2 = 0;
              if (-1 !== e2) {
                var r3 = i.substring(S + 1, e2);
                r3 && "" === r3.trim() && (t2 = r3.length);
              }
              return t2;
            }
            function T(e2) {
              return r2 || (void 0 === e2 && (e2 = i.substring(W)), f2.push(e2), W = n2, I(f2), o2 && F()), L();
            }
            function D(e2) {
              W = e2, I(f2), f2 = [], R = i.indexOf(P, W);
            }
            function L(e2) {
              return { data: u2, errors: h2, meta: { delimiter: M, linebreak: P, aborted: H, truncated: !!e2, cursor: d2 + (t || 0) } };
            }
            function F() {
              q(L()), u2 = [], h2 = [];
            }
          }, this.abort = function() {
            H = true;
          }, this.getCharIndex = function() {
            return W;
          };
        }
        function _(e) {
          var t = e.data, r2 = a[t.workerId], i = false;
          if (t.error) r2.userError(t.error, t.file);
          else if (t.results && t.results.data) {
            var n2 = { abort: function() {
              i = true, m(t.workerId, { data: [], errors: [], meta: { aborted: true } });
            }, pause: y, resume: y };
            if (J(r2.userStep)) {
              for (var s3 = 0; s3 < t.results.data.length && (r2.userStep({ data: t.results.data[s3], errors: t.results.errors, meta: t.results.meta }, n2), !i); s3++) ;
              delete t.results;
            } else J(r2.userChunk) && (r2.userChunk(t.results, n2, t.file), delete t.results);
          }
          t.finished && !i && m(t.workerId, t.results);
        }
        function m(e, t) {
          var r2 = a[e];
          J(r2.userComplete) && r2.userComplete(t), r2.terminate(), delete a[e];
        }
        function y() {
          throw new Error("Not implemented.");
        }
        function w(e) {
          if ("object" != typeof e || null === e) return e;
          var t = Array.isArray(e) ? [] : {};
          for (var r2 in e) t[r2] = w(e[r2]);
          return t;
        }
        function v(e, t) {
          return function() {
            e.apply(t, arguments);
          };
        }
        function J(e) {
          return "function" == typeof e;
        }
        return o && (f.onmessage = function(e) {
          var t = e.data;
          void 0 === b.WORKER_ID && t && (b.WORKER_ID = t.workerId);
          if ("string" == typeof t.input) f.postMessage({ workerId: b.WORKER_ID, results: b.parse(t.input, t.config), finished: true });
          else if (f.File && t.input instanceof File || t.input instanceof Object) {
            var r2 = b.parse(t.input, t.config);
            r2 && f.postMessage({ workerId: b.WORKER_ID, results: r2, finished: true });
          }
        }), (l.prototype = Object.create(h.prototype)).constructor = l, (c.prototype = Object.create(h.prototype)).constructor = c, (p.prototype = Object.create(p.prototype)).constructor = p, (g.prototype = Object.create(h.prototype)).constructor = g, b;
      });
    }
  });

  // src/index-browser.mjs
  var index_browser_exports = {};
  __export(index_browser_exports, {
    loadCSV: () => loadCSVInBrowser,
    parse: () => parse,
    saveCSV: () => saveCSVInBrowser,
    unparse: () => unparse
  });

  // node_modules/@jrc03c/js-math-tools/src/is-number.mjs
  function isNumber(x) {
    return typeof x === "number" && !isNaN(x) || typeof x === "bigint";
  }

  // node_modules/@jrc03c/js-math-tools/src/is-browser.mjs
  var isBrowser = new Function(
    `
    try {
      return this === window
    } catch(e) {}

    try {
      return !!importScripts
    } catch(e){}

    return false
  `
  );

  // node_modules/@jrc03c/js-math-tools/src/math-error.mjs
  var MathError = class extends Error {
    constructor(message) {
      if (isBrowser()) {
        super(message);
      } else {
        super("\n\n\x1B[31m" + message + "\n\x1B[0m");
      }
    }
  };

  // node_modules/@jrc03c/js-math-tools/src/assert.mjs
  function assert(isTrue, message) {
    if (!isTrue) throw new MathError(message);
  }

  // node_modules/@jrc03c/js-math-tools/src/helpers/array-types.mjs
  var arrayTypes = [
    Array,
    ArrayBuffer,
    BigInt64Array,
    BigUint64Array,
    Float32Array,
    Float64Array,
    Int16Array,
    Int32Array,
    Int8Array,
    Uint16Array,
    Uint32Array,
    Uint8Array,
    Uint8ClampedArray
  ];

  // node_modules/@jrc03c/js-math-tools/src/is-undefined.mjs
  function isUndefined(x) {
    return x === null || typeof x === "undefined";
  }

  // node_modules/@jrc03c/js-math-tools/src/is-array.mjs
  var typeStrings = arrayTypes.map((s2) => s2.name);
  function isArray(obj) {
    try {
      if (obj instanceof Array) {
        return true;
      }
      if (!isUndefined(obj.constructor)) {
        return arrayTypes.indexOf(obj.constructor) > -1 || typeStrings.indexOf(obj.constructor.name) > -1;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/is-dataframe.mjs
  function isDataFrame(x) {
    try {
      return !!x._symbol && x._symbol === Symbol.for("@jrc03c/js-math-tools/dataframe");
    } catch (e) {
      return false;
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/is-function.mjs
  function isFunction(fn) {
    return typeof fn === "function";
  }

  // node_modules/@jrc03c/js-math-tools/src/is-object.mjs
  function isObject(x) {
    return typeof x === "object" && !isUndefined(x) && !isArray(x);
  }

  // node_modules/@jrc03c/js-math-tools/src/is-series.mjs
  function isSeries(x) {
    try {
      return !!x._symbol && x._symbol === Symbol.for("@jrc03c/js-math-tools/series");
    } catch (e) {
      return false;
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/index-of.mjs
  function indexOf(x, fn) {
    if (isDataFrame(x)) {
      const index = indexOf(x.values, fn);
      if (index.length > 0 && isNumber(index[0]) && index[0] >= 0 && index[0] < x.index.length) {
        index[0] = x.index[index[0]];
      }
      if (index.length > 1 && isNumber(index[1]) && index[1] >= 0 && index[1] < x.columns.length) {
        index[1] = x.columns[index[1]];
      }
      return index;
    }
    if (isSeries(x)) {
      const index = indexOf(x.values, fn);
      if (index.length > 0 && isNumber(index[0]) && index[0] >= 0 && index[0] < x.index.length) {
        index[0] = x.index[index[0]];
      }
      return index;
    }
    assert(
      isObject(x) || isArray(x),
      "You must pass (1) an object, array, Series, or DataFrame and (2) a function or value into the `indexOf` function!"
    );
    if (!isFunction(fn)) {
      const value = fn;
      fn = (v) => v === value;
    }
    function helper4(x2, fn2, checked) {
      checked = checked || [];
      if (checked.indexOf(x2) > -1) {
        return null;
      }
      if (isObject(x2)) {
        checked.push(x2);
        const keys = Object.keys(x2).concat(Object.getOwnPropertySymbols(x2));
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const value = x2[key];
          if (fn2(value)) {
            return [key];
          }
          const results = helper4(value, fn2, checked);
          if (results && results.length > 0) {
            return [key].concat(results);
          }
        }
      } else if (isArray(x2)) {
        checked.push(x2);
        for (let i = 0; i < x2.length; i++) {
          const value = x2[i];
          if (fn2(value)) {
            return [i];
          }
          const results = helper4(value, fn2, checked);
          if (results && results.length > 0) {
            return [i].concat(results);
          }
        }
      } else {
        if (fn2(x2)) {
          return [];
        }
      }
      return null;
    }
    function safeFn(v) {
      try {
        return fn(v);
      } catch (e) {
        return false;
      }
    }
    const paths = helper4(x, safeFn);
    if (paths && paths.length > 0) {
      return paths;
    } else {
      return null;
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/copy.mjs
  function copy(x) {
    function helper4(x2) {
      if (typeof x2 === "object") {
        if (x2 === null) {
          return null;
        }
        if (isArray(x2)) {
          if (!(x2 instanceof Array)) {
            return x2.slice();
          }
          return x2.map((v) => copy(v));
        }
        if (isSeries(x2)) {
          const out2 = x2.copy();
          out2.values = copy(out2.values);
          return out2;
        }
        if (isDataFrame(x2)) {
          const out2 = x2.copy();
          out2.values = copy(x2.values);
          return out2;
        }
        if (x2 instanceof Date) {
          return new Date(x2.getTime());
        }
        x2 = decycle(x2);
        const out = {};
        Object.keys(x2).concat(Object.getOwnPropertySymbols(x2)).forEach((key) => {
          out[key] = copy(x2[key]);
        });
        return out;
      } else {
        return x2;
      }
    }
    return helper4(decycle(x));
  }
  function decycle(x) {
    function helper4(x2, checked, currentPath) {
      checked = checked || [];
      currentPath = currentPath || "";
      if (checked.indexOf(x2) > -1) {
        const parts = currentPath.split("/").slice(currentPath.startsWith("/") ? 1 : 0);
        const isANestedCopy = parts.some((v, i) => {
          const subParts = parts.slice(0, parts.length - i - 1);
          let temp = orig;
          subParts.forEach((part) => {
            temp = temp[part];
          });
          return temp === x2;
        });
        if (isANestedCopy) {
          const pathToCopy = orig === x2 ? "/" : "/" + indexOf(orig, x2).join("/");
          return `<reference to "${pathToCopy}">`;
        }
      }
      if (typeof x2 === "object") {
        if (x2 === null) return null;
        checked.push(x2);
        if (isArray(x2)) {
          if (typeof x2.constructor !== "undefined" && x2.constructor.name !== "Array") {
            return x2.slice();
          }
          return x2.map((v, i) => helper4(v, checked, currentPath + "/" + i));
        } else {
          Object.keys(x2).concat(Object.getOwnPropertySymbols(x2)).forEach((key) => {
            x2[key] = helper4(x2[key], checked, currentPath + "/" + key.toString());
          });
          return x2;
        }
      } else {
        return x2;
      }
    }
    const orig = x;
    let out = helper4(orig);
    if (isDataFrame(x)) {
      const temp = x.copy();
      temp._values = out.values;
      temp._columns = out.columns;
      temp._index = out.index;
      out = temp;
    }
    if (isSeries(x)) {
      const temp = x.copy();
      temp.name = out.name;
      temp._values = out.values;
      temp._index = out.index;
      out = temp;
    }
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/is-date.mjs
  function isDate(x) {
    return x instanceof Date && x.toString() !== "Invalid Date";
  }

  // node_modules/@jrc03c/js-math-tools/src/is-equal.mjs
  var numberTypes = ["number", "int", "float", "bigint"];
  function isEqual(a, b) {
    function helper4(a2, b2) {
      const aType = typeof a2;
      const bType = typeof b2;
      if (aType !== bType && !numberTypes.includes(aType) && !numberTypes.includes(bType))
        return false;
      if (aType === "undefined" && bType === "undefined") return true;
      if (aType === "boolean") return a2 === b2;
      if (aType === "symbol") return a2 === b2;
      if (aType === "number" || aType === "bigint") {
        try {
          const aString = a2.toString();
          const bString = b2.toString();
          return aString === bString;
        } catch (e) {
          return false;
        }
      }
      if (aType === "string") return a2 === b2;
      if (aType === "function") return a2 === b2;
      if (aType === "object") {
        if (a2 === null || b2 === null) {
          return a2 === null && b2 === null;
        } else {
          if (isDate(a2)) {
            if (isDate(b2)) {
              return a2.getTime() === b2.getTime();
            } else {
              return false;
            }
          } else if (isDate(b2)) {
            return false;
          }
          if (a2 instanceof RegExp && b2 instanceof RegExp) {
            return a2.toString() === b2.toString();
          }
          if (isArray(a2) !== isArray(b2)) {
            return false;
          }
          const aKeys = Object.keys(a2).concat(Object.getOwnPropertySymbols(a2));
          const bKeys = Object.keys(b2).concat(Object.getOwnPropertySymbols(b2));
          if (aKeys.length !== bKeys.length) return false;
          for (let i = 0; i < aKeys.length; i++) {
            const key = aKeys[i];
            if (!helper4(a2[key], b2[key])) return false;
          }
          return true;
        }
      }
    }
    try {
      return helper4(a, b);
    } catch (e) {
      return helper4(decycle(a), decycle(b));
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/helpers/counter.mjs
  function makeKey(n) {
    const alpha = "abcdefg1234567890";
    let out = "";
    while (out.length < n) out += alpha[Math.floor(Math.random() * alpha.length)];
    return out;
  }
  var NULL_KEY = makeKey(16);
  var UNDEFINED_KEY = makeKey(16);
  var INFINITY_KEY = makeKey(16);
  var MINUS_INFINITY_KEY = makeKey(16);
  var SYMBOL_KEY = makeKey(16);
  var Counter = class {
    constructor() {
      this.clear();
    }
    get counts() {
      return this.values.map((v) => this.get(v));
    }
    get values() {
      return Object.values(this.valuesDict);
    }
    clear() {
      this.countsDict = {};
      this.valuesDict = {};
      return this;
    }
    count(x) {
      for (const v of x) {
        if (isArray(v)) {
          this.count(v);
        } else {
          this.increment(v);
        }
      }
      return this;
    }
    delete(value) {
      const key = this.getStandardizedKey(value);
      delete this.countsDict[key];
      delete this.valuesDict[key];
      return this;
    }
    get(value) {
      return this.countsDict[this.getStandardizedKey(value)] || 0;
    }
    getStandardizedKey(value) {
      return typeof value === "object" && value === null ? NULL_KEY : isUndefined(value) ? UNDEFINED_KEY : isFunction(value) ? value.toString() : typeof value === "symbol" ? value.toString() + " - " + SYMBOL_KEY : value === Infinity ? INFINITY_KEY : value === -Infinity ? MINUS_INFINITY_KEY : typeof value === "bigint" ? value.toString() : isDataFrame(value) ? value.toJSONString() : isSeries(value) ? JSON.stringify(value.toObject()) : JSON.stringify(value);
    }
    has(value) {
      return !isUndefined(this.countsDict[this.getStandardizedKey(value)]);
    }
    increment(value) {
      return this.set(value, this.get(value) + 1);
    }
    set(value, count2) {
      const key = this.getStandardizedKey(value);
      this.countsDict[key] = count2;
      this.valuesDict[key] = value;
      return this;
    }
    toArray() {
      return this.values.map((v) => ({ value: v, count: this.get(v) }));
    }
    toObject() {
      const out = {};
      this.values.forEach((value) => {
        out[value] = this.get(value);
      });
      return out;
    }
  };

  // node_modules/@jrc03c/js-math-tools/src/flatten.mjs
  function flatten(arr) {
    if (isDataFrame(arr) || isSeries(arr)) {
      return flatten(arr.values);
    }
    assert(
      isArray(arr),
      "The `flatten` function only works on arrays, Series, and DataFrames!"
    );
    function helper4(arr2) {
      let out = [];
      arr2.forEach((child) => {
        if (isArray(child)) {
          out = out.concat(helper4(child));
        } else {
          out.push(child);
        }
      });
      return out;
    }
    return helper4(arr);
  }

  // node_modules/@jrc03c/js-math-tools/src/stats.mjs
  function stats(x, options) {
    options = options || {};
    const counts = new Counter();
    const out = {};
    const xflat = flatten(x);
    const xnums = [];
    let max2 = -Infinity;
    let min2 = Infinity;
    let resultsShouldIncludeBigInts = false;
    let sum2 = 0;
    for (const v of xflat) {
      if (typeof v === "bigint") {
        resultsShouldIncludeBigInts = true;
      }
      if (!options.shouldDropNaNs || isNumber(v)) {
        try {
          if (v > max2) {
            max2 = v;
          }
          if (v < min2) {
            min2 = v;
          }
          sum2 += Number(v);
          xnums.push(v);
        } catch (e) {
          max2 = NaN;
          min2 = NaN;
          sum2 = NaN;
        }
      }
      counts.increment(v);
    }
    const mean2 = sum2 / xnums.length;
    out.counts = counts;
    out.max = max2;
    out.mean = mean2;
    out.min = min2;
    out.n = xflat.length;
    out.sum = sum2;
    if (isNaN(out.mean)) {
      out.max = NaN;
      out.min = NaN;
    }
    if (options.shouldDropNaNs) {
      out.nWithoutNaNs = xnums.length;
    }
    if (options.mode) {
      const sortedCountPairs = Array.from(
        counts.values.map((v) => [v, counts.get(v)])
      ).toSorted((a, b) => b[1] - a[1]);
      const highestCount = sortedCountPairs[0][1];
      const mode2 = [];
      for (const pair of sortedCountPairs) {
        if (pair[1] == highestCount) {
          mode2.push(pair[0]);
        } else {
          break;
        }
      }
      out.mode = mode2.toSorted();
    }
    if (options.median) {
      if (isNaN(mean2)) {
        out.median = NaN;
      } else {
        const xnumsSorted = xnums.toSorted((a, b) => Number(a) - Number(b));
        const middle = Math.floor(xnumsSorted.length / 2);
        if (xnumsSorted.length % 2 === 0) {
          const left = xnumsSorted[middle - 1];
          const right = xnumsSorted[middle];
          out.median = (Number(left) + Number(right)) / 2;
          if (resultsShouldIncludeBigInts && typeof left === "bigint" && typeof right === "bigint") {
            try {
              out.median = BigInt(out.median);
            } catch (e) {
            }
          }
        } else {
          out.median = xnumsSorted[middle];
        }
      }
    }
    if (options.stdev || options.variance) {
      let variance2 = 0;
      for (const v of xnums) {
        variance2 += Math.pow(Number(v) - mean2, 2);
      }
      variance2 /= xnums.length;
      const stdev2 = Math.sqrt(variance2);
      out.stdev = stdev2;
      out.variance = variance2;
    }
    if (resultsShouldIncludeBigInts) {
      try {
        out.sum = BigInt(out.sum);
      } catch (e) {
      }
      try {
        out.mean = BigInt(out.mean);
      } catch (e) {
      }
      if (options.mode) {
        out.mode = out.mode.map((v) => {
          try {
            return BigInt(v);
          } catch (e) {
            return v;
          }
        });
      }
    }
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/count.mjs
  function count(arr, matcher) {
    const { counts } = stats(arr);
    if (!isUndefined(matcher)) {
      if (isFunction(matcher)) {
        counts.values.forEach((v) => {
          if (!matcher(v)) {
            counts.delete(v);
          }
        });
      } else {
        counts.values.forEach((v) => {
          if (!isEqual(v, matcher)) {
            counts.delete(v);
          }
        });
      }
    }
    return counts;
  }

  // node_modules/@jrc03c/js-math-tools/src/is-jagged.mjs
  function helper(x) {
    if (isDataFrame(x) || isSeries(x)) {
      return helper(x.values);
    }
    if (isArray(x)) {
      let hasArrayValues = false;
      let hasNonArrayValues = false;
      let arrayLength = null;
      for (const v of x) {
        if (helper(v)) {
          return true;
        }
        if (isArray(v)) {
          if (arrayLength === null) {
            arrayLength = v.length;
          } else if (v.length !== arrayLength) {
            return true;
          }
          hasArrayValues = true;
        } else {
          hasNonArrayValues = true;
        }
        if (hasArrayValues && hasNonArrayValues) {
          return true;
        }
      }
    }
    return false;
  }
  function isJagged(x) {
    return helper(decycle(x));
  }

  // node_modules/@jrc03c/js-math-tools/src/is-nested.mjs
  function isNested(x) {
    if (isDataFrame(x) || isSeries(x)) {
      return isNested(x.values);
    }
    assert(
      isArray(x),
      "The `isNested` function only works on arrays, Series, and DataFrames!"
    );
    for (let i = 0; i < x.length; i++) {
      if (isArray(x[i])) {
        return true;
      }
    }
    return false;
  }

  // node_modules/@jrc03c/js-math-tools/src/ndarray.mjs
  var error = "You must pass a natural number or a one-dimensional array of natural numbers into the `ndarray` function!";
  function ndarray(shape2) {
    assert(!isUndefined(shape2), error);
    if (!isArray(shape2)) shape2 = [shape2];
    assert(!isNested(shape2), error);
    assert(shape2.length > 0, error);
    let s2 = shape2[0];
    if (typeof s2 === "bigint") s2 = Number(s2);
    assert(isNumber(s2), error);
    assert(s2 >= 0, error);
    assert(Math.floor(s2) === s2, error);
    assert(
      s2 !== Infinity,
      "We can't create an array containing an infinite number of values!"
    );
    if (shape2.length === 1) {
      const out = [];
      for (let i = 0; i < s2; i++) out.push(void 0);
      return out;
    } else {
      const out = [];
      for (let i = 0; i < s2; i++) {
        out.push(ndarray(shape2.slice(1)));
      }
      return out;
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/reverse.mjs
  function reverse(arr) {
    if (isDataFrame(arr) || isSeries(arr)) {
      const out2 = arr.copy();
      out2.values = reverse(out2.values);
      out2.index = reverse(out2.index);
      return out2;
    }
    assert(
      isArray(arr),
      "The `reverse` function only works on arrays, Series, and DataFrames!"
    );
    const out = [];
    for (let i = arr.length - 1; i >= 0; i--) out.push(arr[i]);
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/range.mjs
  function range(a, b, step = 1) {
    assert(
      !isUndefined(a) && !isUndefined(b) && !isUndefined(step),
      "You must pass two numbers and optionally a step value to the `range` function!"
    );
    assert(
      isNumber(a) && isNumber(b) && isNumber(step),
      "You must pass two numbers and optionally a step value to the `range` function!"
    );
    assert(
      step > 0,
      "The step value must be greater than 0! (NOTE: The step value is a magnitude; it does not indicate direction.)"
    );
    let shouldReverse = false;
    const shouldIncludeBigInts = typeof a === "bigint" || typeof b === "bigint" || typeof step === "bigint";
    a = Number(a);
    b = Number(b);
    step = Number(step);
    if (a > b) {
      shouldReverse = true;
      const buffer = a;
      a = b + step;
      b = buffer + step;
    }
    let out = [];
    for (let i = a; i < b; i += step) {
      if (shouldIncludeBigInts) {
        try {
          out.push(BigInt(i));
        } catch (e) {
          out.push(i);
        }
      } else {
        out.push(i);
      }
    }
    if (shouldReverse) out = reverse(out);
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/set.mjs
  function makeKey2(n) {
    const alpha = "abcdefg1234567890";
    let out = "";
    while (out.length < n) out += alpha[Math.floor(Math.random() * alpha.length)];
    return out;
  }
  var NULL_KEY2 = makeKey2(256);
  var UNDEFINED_KEY2 = makeKey2(256);
  var INFINITY_KEY2 = makeKey2(256);
  var MINUS_INFINITY_KEY2 = makeKey2(256);
  var SYMBOL_KEY2 = makeKey2(256);
  function set(arr) {
    if (isDataFrame(arr) || isSeries(arr)) {
      return set(arr.values);
    }
    assert(
      isArray(arr),
      "The `set` function only works on arrays, Series, and DataFrames!"
    );
    const out = [];
    const temp = {};
    flatten(arr).forEach((item) => {
      const key = typeof item === "object" && item === null ? NULL_KEY2 : isUndefined(item) ? UNDEFINED_KEY2 : isFunction(item) ? item.toString() : typeof item === "symbol" ? item.toString() + " - " + SYMBOL_KEY2 : item === Infinity ? INFINITY_KEY2 : item === -Infinity ? MINUS_INFINITY_KEY2 : typeof item === "bigint" ? item.toString() : isDataFrame(item) ? item.toJSONString() : isSeries(item) ? JSON.stringify(item.toObject()) : JSON.stringify(item);
      if (!temp[key]) out.push(item);
      temp[key] = true;
    });
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/shape.mjs
  function helper2(x) {
    if (isArray(x)) {
      const childShapes = helper2(x[0]);
      return [x.length].concat(childShapes || []);
    } else {
      return void 0;
    }
  }
  function shape(x) {
    if (isDataFrame(x) || isSeries(x)) {
      return shape(x.values);
    }
    assert(
      isArray(x),
      "The `shape` function only works on arrays, Series, and DataFrames!"
    );
    return helper2(x);
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-append.mjs
  function dfAppend(df, x, axis) {
    if (isUndefined(axis)) {
      axis = 0;
    }
    assert(
      axis === 0 || axis === 1 || axis === "vertical" || axis === "horizontal",
      'The only valid axis values for use when appending data to a DataFrame are 0, 1, "vertical", and "horizontal". Note that 0 == "horizontal" and 1 == "vertical".'
    );
    if (isArray(x)) {
      assert(
        !isJagged(x),
        "The array of data you're trying to append to this DataFrame is jagged!"
      );
      const xShape = shape(x);
      if (xShape.length === 1) {
        if (axis === 0) {
          const out = df.copy();
          out._values.push(x);
          const maxRowLength = Math.max(df.shape[1], xShape[0]);
          out._values.forEach((row) => {
            while (row.length < maxRowLength) {
              row.push(void 0);
            }
          });
          while (out._index.length < out._values.length) {
            out._index.push("row" + out._index.length);
          }
          while (out._columns.length < maxRowLength) {
            out._columns.push("col" + out._columns.length);
          }
          return out;
        } else {
          const maxColLength = Math.max(df.shape[0], xShape[0]);
          const out = df.copy();
          range(0, maxColLength).forEach((i) => {
            if (i >= out._values.length) {
              out._values.push(ndarray(df.shape[1]));
            }
            out._values[i].push(x[i]);
          });
          while (out._index.length < out._values.length) {
            out._index.push("row" + out._index.length);
          }
          while (out._columns.length < out._values[0].length) {
            out._columns.push("col" + out._columns.length);
          }
          return out;
        }
      } else if (xShape.length === 2) {
        if (axis === 0) {
          const maxRowLength = Math.max(
            ...x.map((row) => row.length).concat([df.shape[1]])
          );
          const out = df.copy();
          out._values = out._values.concat(x).map((row) => {
            while (row.length < maxRowLength) {
              row.push(void 0);
            }
            return row;
          });
          while (out._index.length < out._values.length) {
            out._index.push("row" + out._index.length);
          }
          while (out._columns.length < maxRowLength) {
            out._columns.push("col" + out._columns.length);
          }
          return out;
        } else {
          const maxRowLength = Math.max(...x.map((row) => row.length)) + df.shape[1];
          const maxColLength = Math.max(df.shape[0], xShape[0]);
          const out = df.copy();
          range(0, maxColLength).forEach((i) => {
            if (i >= out._values.length) {
              out._values.push(ndarray(df.shape[1]));
            }
            out._values[i] = out._values[i].concat(x[i]);
            while (out._values[i].length < maxRowLength) {
              out._values[i].push(void 0);
            }
          });
          while (out._index.length < out._values.length) {
            out._index.push("row" + out._index.length);
          }
          while (out._columns.length < maxRowLength) {
            out._columns.push("col" + out._columns.length);
          }
          return out;
        }
      } else {
        throw new MathError(
          "Only 1- and 2-dimensional arrays can be appended to a DataFrame!"
        );
      }
    } else if (isSeries(x)) {
      const out = dfAppend(df, x.values, axis);
      if (axis === 0) {
        out.index[out.index.length - 1] = out.index.indexOf(x.name) > -1 ? x.name + " (2)" : x.name;
      } else {
        out.columns[out.columns.length - 1] = out.columns.indexOf(x.name) > -1 ? x.name + " (2)" : x.name;
      }
      return out;
    } else if (isDataFrame(x)) {
      if (axis === 0) {
        const out = df.copy();
        const maxRowLength = set(out._columns.concat(x._columns)).length;
        out._values.forEach((row) => {
          while (row.length < maxRowLength) {
            row.push(void 0);
          }
        });
        x.apply((row) => {
          const rowCopy = row.copy();
          const temp = [];
          out._columns.forEach((col) => {
            const index = rowCopy._index.indexOf(col);
            if (index > -1) {
              temp.push(rowCopy._values[index]);
              rowCopy._values.splice(index, 1);
              rowCopy._index.splice(index, 1);
            } else {
              temp.push(void 0);
            }
          });
          out._values.push(temp.concat(rowCopy._values));
        }, 1);
        out._columns = out._columns.concat(
          x._columns.filter((c) => out._columns.indexOf(c) < 0)
        );
        while (out._index.length < out._values.length) {
          const newRowName = "row" + out._index.length;
          out._index.push(
            newRowName + (df._index.indexOf(newRowName) > -1 ? " (2)" : "")
          );
        }
        return out;
      } else {
        const out = df.copy();
        out._index.forEach((rowName, i) => {
          const xIndex = x._index.indexOf(rowName);
          if (xIndex > -1) {
            out._values[i] = out._values[i].concat(x._values[xIndex]);
          } else {
            out._values[i] = out._values[i].concat(ndarray(x.shape[1]));
          }
        });
        x._index.forEach((rowName, i) => {
          const outIndex = out._index.indexOf(rowName);
          if (outIndex < 0) {
            out._index.push(rowName);
            out._values.push(ndarray(out._columns.length).concat(x._values[i]));
          }
        });
        out._columns = out._columns.concat(
          x._columns.map((c) => c + (out._columns.indexOf(c) > -1 ? " (2)" : ""))
        );
        return out;
      }
    } else {
      throw new MathError(
        "Only 1- or 2-dimensional arrays, Series, and DataFrames can be appended to a DataFrame!"
      );
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-apply.mjs
  function dfApply(DataFrame2, Series2, df, fn, axis) {
    axis = axis || 0;
    assert(
      isFunction(fn),
      "The first parameter to the `apply` method must be a function."
    );
    assert(
      axis === 0 || axis === 1,
      "The second parameter to the `apply` method (the `axis`) must be 0 or 1."
    );
    if (axis === 0) {
      const temp = {};
      let shouldReturnADataFrame;
      df.columns.forEach((colName, i) => {
        const series = new Series2(df.values.map((row) => row[i]));
        series.name = colName;
        series.index = df.index;
        const value = fn(series, i, df);
        if (value instanceof Series2) {
          temp[colName] = value.values;
        } else {
          temp[colName] = value;
        }
        if (isUndefined(shouldReturnADataFrame)) {
          shouldReturnADataFrame = value instanceof Series2 || isArray(value);
        }
      });
      if (shouldReturnADataFrame) {
        const out = new DataFrame2(temp);
        out.index = df.index;
        return out;
      } else {
        const out = new Series2(df.columns.map((colName) => temp[colName]));
        out.index = df.columns;
        return out;
      }
    } else if (axis === 1) {
      let shouldReturnADataFrame;
      const temp = df.values.map((row, i) => {
        const series = new Series2(row);
        series.name = df.index[i];
        series.index = df.columns;
        const value = fn(series, i, df);
        if (isUndefined(shouldReturnADataFrame)) {
          shouldReturnADataFrame = value instanceof Series2 || isArray(value);
        }
        if (value instanceof Series2) {
          return value.values;
        } else {
          return value;
        }
      });
      if (shouldReturnADataFrame) {
        const out = new DataFrame2(temp);
        out.index = df.index;
        out.columns = df.columns;
        return out;
      } else {
        const out = new Series2(temp);
        out.index = df.index;
        return out;
      }
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/is-string.mjs
  function isString(s2) {
    return typeof s2 === "string";
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-assign.mjs
  function dfAssign(DataFrame2, Series2, df, p1, p2) {
    const isDataFrame2 = (x) => x instanceof DataFrame2;
    const isSeries2 = (x) => x instanceof Series2;
    if (!isUndefined(p2)) {
      assert(
        isString(p1),
        "If passing two arguments into the `assign` method, then the first argument must be a string name!"
      );
      assert(
        isArray(p2) && !isJagged(p2) && shape(p2).length === 1,
        "If passing two arguments into the `assign` method, then the second argument must be a 1-dimensional array!"
      );
      const out = df.append(p2, 1);
      out.columns[out.columns.length - 1] = p1;
      return out;
    } else {
      if (isDataFrame2(p1)) {
        return df.append(p1, 1);
      } else if (isSeries2(p1)) {
        return df.append(p1, 1);
      } else if (isObject(p1)) {
        const maxColumnLength = Math.max(
          ...Object.keys(p1).concat(Object.getOwnPropertySymbols(p1)).map((key) => p1[key].length)
        );
        Object.keys(p1).concat(Object.getOwnPropertySymbols(p1)).forEach((key) => {
          while (p1[key].length < maxColumnLength) {
            p1[key].push(void 0);
          }
        });
        return df.append(new DataFrame2(p1), 1);
      } else {
        throw new MathError(
          "You must pass a DataFrame, Series, or object into the `assign` method!"
        );
      }
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-copy.mjs
  function dfCopy(DataFrame2, df) {
    if (df.isEmpty) return new DataFrame2();
    const out = new DataFrame2(copy(df.values));
    out.columns = df.columns.slice();
    out.index = df.index.slice();
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-drop.mjs
  function dfDrop(DataFrame2, Series2, df, rows, cols) {
    if (isUndefined(rows)) rows = [];
    if (isUndefined(cols)) cols = [];
    if (isString(rows) || isNumber(rows)) rows = [rows];
    if (isString(cols) || isNumber(cols)) cols = [cols];
    assert(
      isArray(rows),
      "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."
    );
    assert(
      isArray(cols),
      "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."
    );
    assert(
      shape(rows).length === 1,
      "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."
    );
    assert(
      shape(cols).length === 1,
      "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."
    );
    let outIndex, outColumns;
    df.index.forEach((row, i) => {
      if (rows.indexOf(row) < 0 && rows.indexOf(i) < 0) {
        if (!outIndex) outIndex = [];
        outIndex.push(row);
      }
    });
    df.columns.forEach((col, i) => {
      if (cols.indexOf(col) < 0 && cols.indexOf(i) < 0) {
        if (!outColumns) outColumns = [];
        outColumns.push(col);
      }
    });
    let out = df.get(outIndex, outColumns);
    if (out instanceof Series2) {
      let temp = new DataFrame2();
      temp = temp.assign(out);
      if (df.index.indexOf(out.name) > -1) temp = temp.transpose();
      out = temp;
    }
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/helpers/is-integer.mjs
  function isInteger(x) {
    return isNumber(x) && (x >= 0 ? Math.floor(x) === x : Math.ceil(x) === x);
  }

  // node_modules/@jrc03c/js-math-tools/src/helpers/is-whole-number.mjs
  function isWholeNumber(x) {
    return isInteger(x) && x >= 0;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-drop-missing.mjs
  function dfDropMissing(DataFrame2, Series2, df, axis, condition, threshold) {
    axis = axis || 0;
    assert(
      axis === 0 || axis === 1,
      "The first parameter of the `dropMissing` method (the `axis`) must be 0 or 1."
    );
    threshold = threshold || 0;
    assert(
      isWholeNumber(threshold),
      "The third parameter of the `dropMissing` method (the `threshold`) should be a whole number (meaning that data should be dropped if it contains more than `threshold` null values)."
    );
    condition = threshold > 0 ? "none" : condition || "any";
    assert(
      condition === "any" || condition === "all" || condition === "none",
      "The second parameter of the `dropMissing` method (the `condition` parameter, which indicates the condition under which data should be dropped) should be 'any' or 'all' (meaning that if 'any' of the data contains null values, then it should be dropped; or that if 'all' of the data contains null values, then it should be dropped)."
    );
    function helper4(values) {
      if (threshold > 0) {
        let count2 = 0;
        for (let i = 0; i < values.length; i++) {
          const value = values[i];
          if (isUndefined(value)) count2++;
          if (count2 >= threshold) return [];
        }
      } else if (condition === "any") {
        for (let i = 0; i < values.length; i++) {
          const value = values[i];
          if (isUndefined(value)) return [];
        }
      } else if (condition === "all") {
        for (let i = 0; i < values.length; i++) {
          const value = values[i];
          if (!isUndefined(value)) return values;
        }
        return [];
      }
      return values;
    }
    let out = df.copy();
    const tempID = Math.random().toString();
    if (axis === 0) {
      out = out.assign(tempID, out.index);
      const newValues = out.values.map(helper4).filter((row) => row.length > 0);
      if (shape(newValues).length < 2) return new DataFrame2();
      out.values = newValues;
      let newIndex = out.get(null, tempID);
      if (isUndefined(newIndex)) return new DataFrame2();
      if (isString(newIndex)) newIndex = [newIndex];
      if (newIndex instanceof Series2) newIndex = newIndex.values;
      out.index = newIndex;
      out = out.drop(null, tempID);
    } else if (axis === 1) {
      const temp = {};
      out.columns.forEach((colName, i) => {
        const values = out.values.map((row) => row[i]);
        const newValues = helper4(values);
        if (newValues.length > 0) {
          temp[colName] = newValues;
        }
      });
      if (Object.keys(temp).length + Object.getOwnPropertySymbols(temp).length === 0) {
        return new DataFrame2();
      }
      const newOut = new DataFrame2(temp);
      newOut.index = out.index;
      return newOut;
    }
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/drop-nan.mjs
  function dropNaN(x) {
    if (isDataFrame(x) || isSeries(x)) {
      return x.dropNaN(...Object.values(arguments).slice(1));
    }
    assert(
      isArray(x),
      "The `dropNaN` function only works on arrays, Series, and DataFrames!"
    );
    const out = [];
    x.forEach((v) => {
      try {
        return out.push(dropNaN(v));
      } catch (e) {
        if (isNumber(v)) {
          return out.push(v);
        }
      }
    });
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-drop-nan.mjs
  function dfDropNaN(DataFrame2, df, axis, condition, threshold) {
    axis = axis || 0;
    assert(
      axis === 0 || axis === 1,
      "The first parameter of the `dropNaN` method (the `axis`) must be 0 or 1."
    );
    threshold = threshold || 0;
    assert(
      isWholeNumber(threshold),
      "The third parameter of the `dropNaN` method (the `threshold`) should be a whole number (meaning that data should be dropped if it contains more than `threshold` NaN values)."
    );
    condition = threshold > 0 ? "none" : condition || "any";
    assert(
      condition === "any" || condition === "all" || condition === "none",
      "The second parameter of the `dropNaN` method (the `condition` parameter, which indicates the condition under which data should be dropped) should be 'any' or 'all' (meaning that if 'any' of the data contains NaN values, then it should be dropped; or that if 'all' of the data contains NaN values, then it should be dropped)."
    );
    function helper4(values) {
      const numericalValues = dropNaN(values);
      if (threshold > 0) return values.length - numericalValues.length < threshold;
      if (condition === "any") return numericalValues.length === values.length;
      if (condition === "all") return numericalValues.length > 0;
      return true;
    }
    const out = df.copy();
    if (axis === 0) {
      const rowsToKeep = out.index.filter((row) => {
        const values = out.get(row, null).values;
        return helper4(values);
      });
      if (rowsToKeep.length > 0) return out.get(rowsToKeep, null);
      else return new DataFrame2();
    } else if (axis === 1) {
      const colsToKeep = out.columns.filter((col) => {
        const values = out.get(null, col).values;
        return helper4(values);
      });
      if (colsToKeep.length > 0) return out.get(null, colsToKeep);
      else return new DataFrame2();
    }
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-filter.mjs
  function arrayToObject(x) {
    const out = {};
    flatten(x).forEach((value, i) => {
      out[value] = i;
    });
    return out;
  }
  function undoArrayToObject(obj) {
    return Object.keys(obj).concat(Object.getOwnPropertySymbols(obj)).sort((a, b) => obj[a] - obj[b]);
  }
  function dfFilter(DataFrame2, Series2, df, fn, axis) {
    assert(
      isFunction(fn),
      "The `filter` method takes a single parameter: a function that is used to filter the values."
    );
    if (isUndefined(axis)) axis = 0;
    assert(
      axis === 0 || axis === 1,
      "The `axis` parameter to the `filter` method must be 0 or 1."
    );
    let out = df.copy();
    if (out.isEmpty) return out;
    const index = arrayToObject(out.index);
    const columns = arrayToObject(out.columns);
    if (axis === 0) {
      let count2 = 0;
      const newValues = out.values.filter((row, i) => {
        const series = new Series2(row);
        series.name = df.index[i];
        series.index = df.columns;
        const shouldKeep = fn(series, i, df);
        if (shouldKeep) {
          count2++;
        } else {
          delete index[out.index[i]];
        }
        return shouldKeep;
      });
      if (count2 === 0) {
        return new DataFrame2();
      }
      if (count2 === 1) {
        const temp = new Series2(newValues[0]);
        temp.name = undoArrayToObject(index)[0];
        temp.index = undoArrayToObject(columns);
        return temp;
      }
      out.values = newValues;
      out.index = undoArrayToObject(index);
    } else if (axis === 1) {
      out = out.transpose();
      let count2 = 0;
      const newValues = out.values.filter((row, i) => {
        const series = new Series2(row);
        series.name = df.columns[i];
        series.index = df.index;
        const shouldKeep = fn(series, i, df);
        if (shouldKeep) {
          count2++;
        } else {
          delete columns[out.index[i]];
        }
        return shouldKeep;
      });
      if (count2 === 0) {
        return new DataFrame2();
      }
      if (count2 === 1) {
        const temp = new Series2(newValues[0]);
        temp.name = undoArrayToObject(columns)[0];
        temp.index = undoArrayToObject(index);
        return temp;
      }
      out.values = newValues;
      out.index = undoArrayToObject(columns);
      out = out.transpose();
    }
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-get.mjs
  function dfGet(df, rows, cols) {
    if (isString(rows) || isNumber(rows)) rows = [rows];
    if (isString(cols) || isNumber(cols)) cols = [cols];
    for (const i in rows) {
      if (typeof rows[i] === "bigint") {
        rows[i] = Number(rows[i]);
      }
    }
    for (const i in cols) {
      if (typeof cols[i] === "bigint") {
        cols[i] = Number(cols[i]);
      }
    }
    const types = set((rows || []).concat(cols || []).map((v) => typeof v));
    assert(
      types.length <= 2,
      "Only whole numbers and/or strings are allowed in `get` arrays!"
    );
    if (types.length === 1) {
      assert(
        types[0] === "string" || types[0] === "number",
        "Only whole numbers and/or strings are allowed in `get` arrays!"
      );
    }
    if (types.length === 2) {
      assert(
        types.indexOf("string") > -1,
        "Only whole numbers and/or strings are allowed in `get` arrays!"
      );
      assert(
        types.indexOf("number") > -1,
        "Only whole numbers and/or strings are allowed in `get` arrays!"
      );
    }
    if (!isUndefined(rows)) {
      rows = rows.map((r) => {
        if (isString(r)) {
          assert(df.index.indexOf(r) > -1, `Row "${r}" does not exist!`);
          return r;
        }
        if (isNumber(r)) {
          assert(r >= 0, `Index ${r} is out of bounds!`);
          assert(Math.floor(r) === r, `Row numbers must be integers!`);
          assert(r < df.index.length, `Index ${r} is out of bounds!`);
          return df.index[r];
        }
      });
    }
    if (!isUndefined(cols)) {
      cols = cols.map((c) => {
        if (isString(c)) {
          assert(df.columns.indexOf(c) > -1, `Column "${c}" does not exist!`);
          return c;
        }
        if (isNumber(c)) {
          assert(c >= 0, `Column ${c} is out of bounds!`);
          assert(Math.floor(c) === c, `Column numbers must be integers!`);
          assert(c < df.columns.length, `Column ${c} is out of bounds!`);
          return df.columns[c];
        }
      });
    }
    return df.getSubsetByNames(rows, cols);
  }

  // node_modules/@jrc03c/js-math-tools/src/sort.mjs
  function alphaSort(a, b) {
    try {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    } catch (e) {
      a = typeof a === "object" && a !== null ? JSON.stringify(a) : a.toString();
      b = typeof b === "object" && b !== null ? JSON.stringify(b) : b.toString();
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    }
  }
  function sort(arr, fn) {
    if (isUndefined(fn)) fn = alphaSort;
    if (isDataFrame(arr) || isSeries(arr)) {
      return arr.sort(...Object.values(arguments).slice(1));
    }
    assert(
      isArray(arr),
      "The `sort` function only works on arrays, Series, and DataFrames!"
    );
    assert(
      isFunction(fn),
      "The second parameter of the `sort` function must be a comparison function!"
    );
    const out = arr.slice();
    out.sort(fn);
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-get-dummies.mjs
  function camelify(text) {
    const temp = text.toLowerCase();
    let out = "";
    for (let i = 0; i < temp.length; i++) {
      const char = temp[i];
      if (char.match(/[a-z0-9]/g)) {
        out += char;
      } else {
        out += " ";
      }
    }
    const words = out.split(" ").filter((word) => word.length > 0);
    return words[0] + words.slice(1).map((word) => word[0].toUpperCase() + word.substring(1)).join("");
  }
  function dfGetDummies(DataFrame2, df, columns) {
    if (isUndefined(columns)) {
      columns = df.columns;
    } else if (isString(columns)) {
      columns = [columns];
    }
    const temp = {};
    columns.forEach((col) => {
      assert(
        isString(col),
        "You must pass either a string or a one-dimensional array of strings into the `getDummies` (AKA `oneHotEncode`) method!"
      );
      const colIndex = df.columns.indexOf(col);
      assert(
        colIndex > -1,
        `The given DataFrame does not have a column called "${col}"!`
      );
      const values = df.values.map((row) => row[colIndex]);
      const valuesSet = sort(set(values));
      values.forEach((value) => {
        valuesSet.forEach((orig) => {
          const colName = col + "_" + camelify(orig.toString());
          if (!temp[colName]) {
            temp[colName] = [];
          }
          if (value === orig) {
            temp[colName].push(1);
          } else {
            temp[colName].push(0);
          }
        });
      });
    });
    const out = new DataFrame2(temp);
    out.index = df.index;
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-get-subset-by-indices.mjs
  function dfGetSubsetByIndices(df, rowIndices, colIndices) {
    const dataShape = df.shape;
    if (isUndefined(rowIndices)) rowIndices = range(0, dataShape[0]);
    if (isUndefined(colIndices)) colIndices = range(0, dataShape[1]);
    if (isNumber(rowIndices)) rowIndices = [rowIndices];
    if (isNumber(colIndices)) colIndices = [colIndices];
    assert(
      isArray(rowIndices) && isArray(colIndices),
      "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."
    );
    assert(
      shape(rowIndices).length === 1 && shape(colIndices).length === 1,
      "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."
    );
    assert(
      rowIndices.length > 0,
      "The `rowIndices` array must contain at least one index."
    );
    assert(
      colIndices.length > 0,
      "The `colIndices` array must contain at least one index."
    );
    rowIndices.forEach((rowIndex) => {
      assert(
        isWholeNumber(rowIndex),
        "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."
      );
      assert(
        rowIndex < df.index.length,
        `The row index ${rowIndex} is out of bounds.`
      );
    });
    colIndices.forEach((colIndex) => {
      assert(
        isWholeNumber(colIndex),
        "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."
      );
      assert(
        colIndex < df.columns.length,
        `The column index ${colIndex} is out of bounds.`
      );
    });
    const rows = rowIndices.map((i) => df.index[i]);
    const cols = colIndices.map((i) => df.columns[i]);
    return df.getSubsetByNames(rows, cols);
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-get-subset-by-names.mjs
  function dfGetSubsetByNames(DataFrame2, Series2, df, rows, cols) {
    if (isUndefined(rows)) rows = df.index;
    if (isUndefined(cols)) cols = df.columns;
    if (isString(rows)) rows = [rows];
    if (isString(cols)) cols = [cols];
    assert(
      isArray(rows) && isArray(cols),
      "The `rows` and `cols` parameters must be 1-dimensional arrays of strings."
    );
    assert(
      shape(rows).length === 1 && shape(cols).length === 1,
      "The `rows` and `cols` parameters must be 1-dimensional arrays of strings."
    );
    assert(
      rows.length > 0,
      "The `rows` array must contain at least one row name."
    );
    assert(
      cols.length > 0,
      "The `cols` array must contain at least one column name."
    );
    rows.forEach((row) => {
      assert(
        isString(row),
        "The `rows` and `cols` parameters must be 1-dimensional arrays of strings."
      );
      assert(
        df.index.indexOf(row) > -1,
        `The row name "${row}" does not exist in the list of rows.`
      );
    });
    cols.forEach((col) => {
      assert(
        isString(col),
        "The `rows` and `cols` parameters must be 1-dimensional arrays of strings."
      );
      assert(
        df.columns.indexOf(col) > -1,
        `The column name "${col}" does not exist in the list of columns.`
      );
    });
    const values = rows.map((row) => {
      return cols.map((col) => {
        return df.values[df.index.indexOf(row)][df.columns.indexOf(col)];
      });
    });
    if (rows.length === 1 && cols.length === 1) {
      return values[0][0];
    }
    if (rows.length === 1) {
      const out2 = new Series2(values[0]);
      out2.name = rows[0];
      out2.index = cols;
      return out2;
    }
    if (cols.length === 1) {
      const out2 = new Series2(values.map((v) => v[0]));
      out2.name = cols[0];
      out2.index = rows;
      return out2;
    }
    const out = new DataFrame2(values);
    out.columns = cols;
    out.index = rows;
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-print.mjs
  function dfPrint(DataFrame2, Series2, df) {
    function truncate(s2, maxLength2) {
      if (isString(s2)) {
        if (s2.length > maxLength2) {
          return s2.substring(0, maxLength2 - 3) + "...";
        } else {
          return s2;
        }
      } else {
        return s2;
      }
    }
    if (df.isEmpty) {
      console.table({});
      console.log("Shape:", [0, 0], "\n");
      return df;
    }
    const maxRows = typeof window === "undefined" ? 20 : 10;
    const halfMaxRows = Math.floor(maxRows / 2);
    const maxColumns = 4;
    const halfMaxColumns = Math.floor(maxColumns / 2);
    const tempRows = maxRows > df.index.length ? null : range(0, halfMaxRows).concat(
      range(df.index.length - halfMaxRows, df.index.length)
    );
    const tempColumns = maxColumns > df.columns.length ? null : range(0, halfMaxColumns).concat(
      range(df.columns.length - halfMaxColumns, df.columns.length)
    );
    let temp = df.get(tempRows, tempColumns);
    if (temp instanceof Series2) {
      if (df.shape[0] === 1) {
        temp = new DataFrame2([temp.values]);
        temp.index = df.index;
        temp.columns = new Series2(df.columns).get(tempColumns).values;
      } else if (df.shape[1] === 1) {
        temp = new DataFrame2([temp.values]).transpose();
        temp.index = new Series2(df.index).get(tempRows).values;
        temp.columns = df.columns;
      }
    }
    if (maxRows <= df.index.length) {
      temp._index.splice(halfMaxRows, 0, "...");
      temp._values.splice(
        halfMaxRows,
        0,
        range(0, temp.columns.length).map(() => "...")
      );
    }
    if (maxColumns <= df.columns.length) {
      temp._columns.splice(halfMaxColumns, 0, "...");
      temp._values = temp._values.map((row) => {
        row.splice(halfMaxColumns, 0, "...");
        return row;
      });
    }
    const maxLength = 28;
    if (temp instanceof Series2) {
      temp.values = temp.values.map((value) => truncate(value, maxLength));
      temp.name = truncate(temp.name, maxLength);
      temp.index = temp.index.map((row) => truncate(row, maxLength));
    } else {
      temp.values = temp.values.map((row) => {
        return row.map((value) => truncate(value, maxLength));
      });
      temp.columns = temp.columns.map((col) => truncate(col, maxLength));
      temp.index = temp.index.map((row) => truncate(row, maxLength));
    }
    console.table(temp.toDetailedObject());
    console.log("Shape:", df.shape, "\n");
    return df;
  }

  // node_modules/@jrc03c/js-math-tools/src/helpers/left-pad.mjs
  function leftPad(x, maxLength) {
    assert(isNumber(x), "The `leftPad` function only works on numbers!");
    let out = x.toString();
    while (out.length < maxLength) out = "0" + out;
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-reset-index.mjs
  function dfResetIndex(df, shouldSkipCopying) {
    const out = shouldSkipCopying ? df : df.copy();
    out.index = range(0, df.shape[0]).map((i) => {
      return "row" + leftPad(i, (out.index.length - 1).toString().length);
    });
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/product.mjs
  function product(arr, shouldDropNaNs) {
    if (isDataFrame(arr) || isSeries(arr)) {
      return product(arr.values, shouldDropNaNs);
    }
    assert(
      isArray(arr),
      "The `product` function only works on arrays, Series, and DataFrames!"
    );
    try {
      if (arr.length === 0) return NaN;
      const temp = flatten(arr);
      let resultShouldBeABigInt = false;
      let out = 1;
      for (let v of temp) {
        if (!isNumber(v)) {
          if (shouldDropNaNs) {
            v = 1;
          } else {
            return NaN;
          }
        }
        if (typeof v === "bigint") {
          resultShouldBeABigInt = true;
          v = Number(v);
        }
        out *= v;
      }
      if (resultShouldBeABigInt) {
        try {
          return BigInt(out);
        } catch (e) {
        }
      }
      return out;
    } catch (e) {
      return NaN;
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/helpers/is-natural-number.mjs
  function isNaturalNumber(x) {
    return isInteger(x) && x > 0;
  }

  // node_modules/@jrc03c/js-math-tools/src/reshape.mjs
  function reshape(x, newShape) {
    if (isDataFrame(x) || isSeries(x)) {
      return reshape(x.values, newShape);
    }
    assert(
      isArray(x),
      "The first argument passed into the `reshape` function must be an array!"
    );
    if (isNumber(newShape)) newShape = [newShape];
    assert(
      isArray(newShape),
      "The second argument passed into the `reshape` function must be a whole number or a one-dimensional array of whole numbers!"
    );
    assert(
      shape(newShape).length === 1,
      "The first argument passed into the `reshape` function must be a whole number or a one-dimensional array of whole numbers!"
    );
    newShape = newShape.map((v) => {
      if (typeof v === "bigint") {
        v = Number(v);
      }
      assert(
        isNaturalNumber(v),
        "The first argument passed into the `reshape` function must be a whole number or a one-dimensional array of whole numbers!"
      );
      return Number(v);
    });
    if (newShape.length === 0) {
      return flatten(x);
    }
    const temp = flatten(x);
    if (newShape.length === 1 && newShape[0] === temp.length) {
      return temp;
    }
    assert(
      product(newShape) === temp.length,
      "The new shape doesn't match the number of values available in `x` (the first argument passed into the `reshape` function)!"
    );
    const out = [];
    const step = Math.floor(temp.length / newShape[0]);
    for (let i = 0; i < newShape[0]; i++) {
      const row = temp.slice(i * step, (i + 1) * step);
      out.push(reshape(row, newShape.slice(1)));
    }
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/random.mjs
  var MAX = Math.pow(2, 64);
  var s = [];
  seed(Math.floor(Math.random() * MAX));
  function splitmix64(state, n) {
    state = uint(state);
    function helper4() {
      state += uint("0x9e3779b97f4a7c15");
      let z = copy(state);
      z = (z ^ z >> BigInt(30)) * uint("0xbf58476d1ce4e5b9");
      z = (z ^ z >> BigInt(27)) * uint("0x94d049bb133111eb");
      return z ^ z >> BigInt(31);
    }
    const out = [];
    for (let i = 0; i < n; i++) out.push(helper4());
    return out;
  }
  function uint(x) {
    return BigInt.asUintN(64, BigInt(x));
  }
  function rotl(x, k) {
    x = uint(x);
    k = BigInt(k);
    return uint(uint(x << k) | uint(x >> uint(BigInt(64) - k)));
  }
  function seed(val) {
    if (typeof val === "bigint") {
      val = Number(val);
    }
    if (!isUndefined(val)) {
      assert(
        isNumber(val),
        "If passing a value into the `seed` function, then that value must be an integer!"
      );
      const temp = splitmix64(Math.floor(val), 4);
      s[0] = temp[0];
      s[1] = temp[1];
      s[2] = temp[2];
      s[3] = temp[3];
    } else {
      return copy(s);
    }
  }
  function next() {
    const result = uint(rotl(s[0] + s[3], 23) + s[0]);
    const t = uint(s[1] << BigInt(17));
    s[2] = uint(s[2] ^ s[0]);
    s[3] = uint(s[3] ^ s[1]);
    s[1] = uint(s[1] ^ s[2]);
    s[0] = uint(s[0] ^ s[3]);
    s[2] = uint(s[2] ^ t);
    s[3] = rotl(s[3], 45);
    return Math.floor(Number(result)) / MAX;
  }
  function random(shape2) {
    if (isUndefined(shape2)) return next();
    if (!isArray(shape2)) shape2 = [shape2];
    return reshape(ndarray(product(shape2)).map(next), shape2);
  }

  // node_modules/@jrc03c/js-math-tools/src/shuffle.mjs
  function shuffle(arr) {
    if (isDataFrame(arr) || isSeries(arr)) {
      return arr.shuffle(...Object.values(arguments).slice(1));
    }
    assert(
      isArray(arr),
      "The `shuffle` function only works on arrays, Series, and DataFrames!"
    );
    const out = [];
    const temp = arr.slice();
    for (let i = 0; i < arr.length; i++) {
      const index = Math.floor(random() * temp.length);
      out.push(temp.splice(index, 1)[0]);
    }
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-shuffle.mjs
  function dfShuffle(df, axis) {
    if (isUndefined(axis)) axis = 0;
    assert(
      axis === 0 || axis === 1,
      "The `axis` parameter to the `shuffle` must be 0, 1, or undefined."
    );
    return df.get(
      axis === 0 ? shuffle(df.index) : null,
      axis === 1 ? shuffle(df.columns) : null
    );
  }

  // node_modules/@jrc03c/js-math-tools/src/is-boolean.mjs
  function isBoolean(x) {
    return typeof x === "boolean";
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-sort.mjs
  function dfSort(df, a, b) {
    if (isFunction(a)) {
      return dfSortByFunction(df, a, b);
    } else {
      return dfSortByColumns(df, a, b);
    }
  }
  function dfSortByFunction(df, fn, axis) {
    axis = isUndefined(axis) ? 0 : axis;
    assert(
      isFunction(fn),
      "When sorting a DataFrame using a function, the first argument to the `sort` method must be a function!"
    );
    assert(
      isNumber(axis),
      "When sorting a DataFrame using a function, the second argument to the `sort` method must be null, undefined, 0, or 1 to indicate the axis along which the data should be sorted! An axis of 0 means that the rows will be sorted relative to each other, whereas an axis of 1 means that the columns will be sorted relative to each other."
    );
    if (axis === 0) {
      const index = sort(df.index, (a, b) => {
        return fn(df.get(a, null), df.get(b, null));
      });
      return df.get(index, null);
    } else {
      const columns = sort(df.columns, (a, b) => {
        return fn(df.get(null, a), df.get(null, b));
      });
      return df.get(null, columns);
    }
  }
  function dfSortByColumns(df, cols, directions) {
    let out = df.copy();
    const indexID = random().toString();
    out = out.assign(indexID, out.index);
    if (isUndefined(cols)) {
      cols = [indexID];
      directions = [true];
    }
    if (isNumber(cols) || isString(cols)) {
      cols = [cols];
      if (isBoolean(directions) || isString(directions)) directions = [directions];
    }
    assert(
      isArray(cols),
      "The first parameter of the `sort` method must be (1) a string or index representing a column name or index, respectively; (2) a 1-dimensional array of strings and/or indices; or (3) null."
    );
    assert(
      shape(cols).length === 1,
      "The first parameter of the `sort` method must be (1) a string or index representing a column name or index, respectively; (2) a 1-dimensional array of strings and/or indices; or (3) null."
    );
    if (isUndefined(directions))
      directions = range(0, cols.length).map(() => true);
    assert(
      isArray(directions),
      "The second parameter of the `sort` method must be (1) a string or boolean representing the sort direction ('ascending' / 'descending', or true / false); (2) a 1-dimensional array of strings and/or booleans; or (3) null."
    );
    assert(
      shape(directions).length === 1,
      "The second parameter of the `sort` method must be (1) a string or boolean representing the sort direction ('ascending' / 'descending', or true / false); (2) a 1-dimensional array of strings and/or booleans; or (3) null."
    );
    assert(
      cols.length === directions.length,
      "The arrays passed into the `sort` method must be equal in length."
    );
    cols = cols.map((col) => {
      assert(
        isString(col) || isNumber(col),
        "Column references can either be column names (as strings) or column indices (as whole numbers)."
      );
      if (isString(col)) {
        const index = out.columns.indexOf(col);
        assert(index > -1, `The column "${col}" does not exist!`);
        return index;
      }
      if (isNumber(col)) {
        assert(isWholeNumber(col), "Column indices must be whole numbers!");
        assert(col < out.columns.length, `The index ${col} is out of bounds!`);
        return col;
      }
    });
    directions = directions.map((dir) => {
      assert(
        isString(dir) || isBoolean(dir),
        "Direction references can either be strings ('ascending' or 'descending') or booleans (true or false)."
      );
      if (isString(dir)) {
        const value = dir.trim().toLowerCase();
        assert(
          value === "ascending" || value === "descending",
          "Direction references can either be strings ('ascending' or 'descending') or booleans (true or false)."
        );
        return value === "ascending";
      }
      if (isBoolean(dir)) {
        return dir;
      }
    });
    out.values = sort(out.values, (a, b) => {
      let counter = 0;
      while (a[cols[counter]] === b[cols[counter]] && counter < cols.length) {
        counter++;
      }
      const isAscending = directions[counter];
      if (a[cols[counter]] === b[cols[counter]]) return 0;
      if (a[cols[counter]] < b[cols[counter]]) return isAscending ? -1 : 1;
      if (a[cols[counter]] > b[cols[counter]]) return isAscending ? 1 : -1;
    });
    const indexNumber = out.columns.indexOf(indexID);
    out.index = out.values.map((row) => row[indexNumber]);
    out = out.dropColumns(indexID);
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-to-detailed-object.mjs
  function dfToDetailedObject(df, axis) {
    if (isUndefined(axis)) {
      axis = 0;
    } else {
      assert(
        axis === 0 || axis === 1,
        "The axis parameter of the `toDetailedObject` method must be undefined, 0, or 1. An axis of 0 indicates that the returned object should be organized first by rows and then by columns. An axis of 1 indicates that the returned object should be organized first by columns and then by rows."
      );
    }
    const out = {};
    if (axis === 0) {
      df.index.forEach((rowName, i) => {
        const temp = {};
        df.columns.forEach((colName, j) => {
          temp[colName] = df.values[i][j];
        });
        out[rowName] = temp;
      });
    } else {
      df.columns.forEach((colName, j) => {
        const temp = {};
        df.index.forEach((rowName, i) => {
          temp[rowName] = df.values[i][j];
        });
        out[colName] = temp;
      });
    }
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-to-json-string.mjs
  function dfToJSONString(df, axis) {
    return JSON.stringify(df.toObject(axis));
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-to-json.mjs
  async function dfToJSON(df, axis) {
    return JSON.parse(dfToJSONString(df, axis));
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-to-object.mjs
  function dfToObject(df) {
    const out = {};
    df.columns.forEach((col) => {
      out[col] = df.get(col).values;
    });
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/transpose.mjs
  function transpose(arr) {
    if (isDataFrame(arr) || isSeries(arr)) {
      return arr.transpose();
    }
    assert(
      isArray(arr),
      "The `transpose` function only works on arrays, Series, and DataFrames!"
    );
    const theShape = shape(arr);
    assert(
      theShape.length <= 2,
      "I'm not smart enough to know how to transpose arrays that have more than 2 dimensions. Sorry for the inconvenience! Please only pass 1- or 2-dimensional arrays into the `transpose` function!"
    );
    if (theShape.length === 1) {
      return reverse(arr);
    } else if (theShape.length === 2) {
      const out = ndarray(reverse(theShape));
      for (let row = 0; row < theShape[0]; row++) {
        for (let col = 0; col < theShape[1]; col++) {
          out[col][row] = arr[row][col];
        }
      }
      return out;
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-append.mjs
  function seriesAppend(Series2, series, x) {
    if (isSeries(x)) {
      return new Series2(series.values.concat(x.values));
    }
    if (isArray(x)) {
      const xShape = shape(x);
      assert(
        xShape.length === 1 && !isNested(xShape),
        "Only vectors can be appended to Series!"
      );
      const out = series.copy();
      x.forEach((v, i) => {
        out._values.push(v);
        out._index.push("item" + (series.values.length + i));
      });
      return out;
    }
    return seriesAppend(series, [x]);
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-apply.mjs
  function seriesApply(series, fn) {
    assert(
      isFunction(fn),
      "The parameter to the `apply` method must be a function."
    );
    const out = series.copy();
    out._values = out._values.map((v, i) => fn(v, i));
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-drop-missing.mjs
  function seriesDropMissing(series) {
    const out = series.copy();
    const outIndex = [];
    out._values = out.values.filter((v, i) => {
      if (isUndefined(v)) {
        return false;
      } else {
        outIndex.push(out.index[i]);
        return true;
      }
    });
    out._index = outIndex;
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-drop-nan.mjs
  function seriesDropNaN(Series2, series) {
    const index = [];
    const values = [];
    series.values.forEach((value, i) => {
      if (isNumber(value)) {
        values.push(value);
        index.push(series.index[i]);
      }
    });
    const out = new Series2(values);
    out.name = series.name;
    out.index = index;
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-filter.mjs
  function seriesFilter(Series2, series, fn) {
    let out = series.copy();
    const index = copy(out.index);
    const indicesToRemove = [];
    const newValues = out.values.filter((value, i) => {
      const shouldKeep = fn(value, i, out.values);
      if (!shouldKeep) indicesToRemove.push(out.index[i]);
      return shouldKeep;
    });
    indicesToRemove.forEach((i) => {
      index.splice(index.indexOf(i), 1);
    });
    if (newValues.length === 0) {
      out = new Series2();
      out.name = series.name;
      return out;
    }
    out.values = newValues;
    out.index = index;
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-get.mjs
  function seriesGet(series, indices) {
    if (isString(indices) || isNumber(indices)) indices = [indices];
    for (const i in indices) {
      if (typeof indices[i] === "bigint") {
        indices[i] = Number(indices[i]);
      }
    }
    const types = set((indices || []).map((v) => typeof v));
    assert(
      types.length <= 2,
      "Only whole numbers and/or strings are allowed in `get` arrays!"
    );
    if (types.length === 1) {
      assert(
        types[0] === "string" || types[0] === "number",
        "Only whole numbers and/or strings are allowed in `get` arrays!"
      );
    }
    if (types.length === 2) {
      assert(
        types.indexOf("string") > -1,
        "Only whole numbers and/or strings are allowed in `get` arrays!"
      );
      assert(
        types.indexOf("number") > -1,
        "Only whole numbers and/or strings are allowed in `get` arrays!"
      );
    }
    if (!isUndefined(indices)) {
      indices = indices.map((i) => {
        if (typeof i === "string") {
          assert(series.index.indexOf(i) > -1, `Index "${i}" does not exist!`);
          return i;
        }
        if (typeof i === "number") {
          assert(i >= 0, `Index ${i} is out of bounds!`);
          assert(Math.floor(i) === i, `Indices must be integers!`);
          assert(i < series.index.length, `Index ${i} is out of bounds!`);
          return series.index[i];
        }
      });
    }
    return series.getSubsetByNames(indices);
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-get-subset-by-indices.mjs
  function seriesGetSubsetByIndices(series, indices) {
    const dataShape = series.shape;
    if (isUndefined(indices)) indices = range(0, dataShape[0]);
    assert(
      isArray(indices),
      "The `indices` array must be 1-dimensional array of whole numbers."
    );
    assert(
      shape(indices).length === 1,
      "The `indices` array must be a 1-dimensional array of whole numbers."
    );
    assert(
      indices.length > 0,
      "The `indices` array must contain at least one index."
    );
    indices.forEach((index) => {
      assert(
        isWholeNumber(index),
        "The `indices` array must be a 1-dimensional array of whole numbers."
      );
      assert(
        index < series.index.length,
        `The row index ${index} is out of bounds.`
      );
    });
    const rows = indices.map((i) => series.index[i]);
    return series.getSubsetByNames(rows);
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-get-subset-by-names.mjs
  function seriesGetSubsetByNames(Series2, series, indices) {
    if (isUndefined(indices)) indices = series.index;
    assert(
      isArray(indices),
      "The `indices` array must be a 1-dimensional array of strings."
    );
    assert(
      shape(indices).length === 1,
      "The `indices` array must be a 1-dimensional array of strings."
    );
    assert(
      indices.length > 0,
      "The `indices` array must contain at least one index name."
    );
    indices.forEach((name) => {
      assert(isString(name), "The `indices` array must contain only strings.");
      assert(
        series.index.indexOf(name) > -1,
        `The name "${name}" does not exist in the index.`
      );
    });
    const values = indices.map((name) => {
      return series.values[series.index.indexOf(name)];
    });
    if (values.length === 1) return values[0];
    const out = new Series2(values);
    out.index = indices;
    out.name = series.name;
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-print.mjs
  function seriesPrint(series) {
    let temp = series.copy();
    const maxRows = typeof window === "undefined" ? 20 : 10;
    if (temp.index.length > maxRows) {
      temp = temp.get(
        range(0, maxRows / 2).concat(
          range(temp.index.length - maxRows / 2, temp.index.length)
        )
      );
      const tempIndex = copy(temp.index);
      tempIndex.splice(Math.floor(tempIndex.length / 2), 0, "...");
      temp.values.push("...");
      temp.index.push("...");
      temp = temp.get(tempIndex);
    }
    const out = {};
    temp.values.forEach((value, i) => {
      const obj = {};
      obj[temp.name] = value;
      out[temp.index[i]] = obj;
    });
    console.table(out);
    console.log("Shape:", series.shape, "\n");
    return series;
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-shuffle.mjs
  function seriesShuffle(series) {
    const out = series.copy();
    return out.get(shuffle(out.index));
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-sort.mjs
  function seriesSort(Series2, series, fn) {
    fn = fn || ((a, b) => a < b ? -1 : 1);
    assert(
      isUndefined(fn) || isFunction(fn),
      "You must pass undefined, null, or a comparison function as the second argument to the `sort` method!"
    );
    const pairs = transpose([series.values, series.index]);
    const temp = sort(pairs, (aPair, bPair) => {
      return fn(aPair[0], bPair[0]);
    });
    const newValues = [];
    const newIndex = [];
    temp.forEach((pair) => {
      newValues.push(pair[0]);
      newIndex.push(pair[1]);
    });
    const out = new Series2();
    out._values = newValues;
    out._index = newIndex;
    out.name = series.name;
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-sort-by-index.mjs
  function seriesSortByIndex(Series2, series) {
    let temp = transpose([series.values, series.index]);
    temp = transpose(
      sort(temp, (a, b) => {
        if (a[1] === b[1]) return 0;
        if (a[1] < b[1]) return -1;
        if (a[1] > b[1]) return 1;
      })
    );
    const out = new Series2(temp[0]);
    out.index = temp[1];
    out.name = series.name;
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-to-object.mjs
  function seriesToObject(series) {
    const out = {};
    out[series.name] = {};
    series.index.forEach((index, i) => {
      out[series.name][index] = series.values[i];
    });
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/series/index.mjs
  var SERIES_SYMBOL = Symbol.for("@jrc03c/js-math-tools/series");
  function createSeriesClass(DataFrame2) {
    class Series2 {
      static [Symbol.hasInstance](x) {
        try {
          return !!x._symbol && x._symbol === SERIES_SYMBOL;
        } catch (e) {
          return false;
        }
      }
      constructor(data) {
        this.name = "data";
        Object.defineProperty(this, "_symbol", {
          configurable: false,
          enumerable: false,
          writable: false,
          value: SERIES_SYMBOL
        });
        Object.defineProperty(this, "_values", {
          value: [],
          configurable: true,
          enumerable: false,
          writable: true
        });
        Object.defineProperty(this, "values", {
          configurable: true,
          enumerable: true,
          get() {
            return this._values;
          },
          set(x) {
            assert(isArray(x), "The new values must be a 1-dimensional array!");
            const dataShape = shape(x);
            assert(
              dataShape.length === 1,
              "The new array of values must be 1-dimensional!"
            );
            if (dataShape[0] < this._index.length) {
              this._index = this._index.slice(0, dataShape[0]);
            } else if (dataShape[0] > this._index.length) {
              this._index = this._index.concat(
                range(this._index.length, dataShape[0]).map((i) => {
                  return "item" + leftPad(i, (x.length - 1).toString().length);
                })
              );
            }
            this._values = x;
          }
        });
        Object.defineProperty(this, "_index", {
          value: [],
          configurable: true,
          enumerable: false,
          writable: true
        });
        Object.defineProperty(this, "index", {
          configurable: true,
          enumerable: true,
          get() {
            return this._index;
          },
          set(x) {
            assert(
              isArray(x),
              "The new index must be a 1-dimensional array of strings!"
            );
            assert(
              x.length === this.shape[0],
              "The new index must be the same length as the old index!"
            );
            assert(
              shape(x).length === 1,
              "The new index must be a 1-dimensional array of strings!"
            );
            x.forEach((value) => {
              assert(isString(value), "All of the row names must be strings!");
            });
            this._index = x;
          }
        });
        if (data) {
          if (data instanceof Series2) {
            this.name = data.name;
            this.values = copy(data.values);
            this.index = copy(data.index);
          } else if (isArray(data)) {
            const dataShape = shape(data);
            assert(
              dataShape.length === 1,
              "When passing an array into the constructor of a Series, the array must be 1-dimensional!"
            );
            this.values = data;
          } else if (data instanceof Object) {
            const keys = Object.keys(data).concat(Object.getOwnPropertySymbols(data)).map((v) => v.toString());
            assert(
              keys.length === 1,
              "When passing an object into the constructor of a Series, the object must have only 1 key-value pair, where the key is the name of the data and the value is the 1-dimensional array of values!"
            );
            const name = keys[0];
            const values = data[name];
            assert(
              shape(values).length === 1,
              "When passing an object into the constructor of a Series, the object must have only 1 key-value pair, where the key is the name of the data and the value is the 1-dimensional array of values!"
            );
            this.name = name;
            this.values = values.slice();
          }
        }
      }
      get shape() {
        return shape(this.values);
      }
      get length() {
        return this.shape[0];
      }
      get isEmpty() {
        return this.values.filter((v) => !isUndefined(v)).length === 0;
      }
      clear() {
        const out = this.copy();
        out.values.forEach((v, i) => {
          out.values[i] = void 0;
        });
        return out;
      }
      get(indices) {
        return seriesGet(this, indices);
      }
      getSubsetByNames(indices) {
        return seriesGetSubsetByNames(Series2, this, indices);
      }
      getSubsetByIndices(indices) {
        return seriesGetSubsetByIndices(this, indices);
      }
      loc(indices) {
        return this.getSubsetByNames(indices);
      }
      iloc(indices) {
        return this.getSubsetByIndices(indices);
      }
      reverse() {
        const out = new Series2(reverse(this.values));
        out.index = reverse(this.index);
        out.name = this.name;
        return out;
      }
      resetIndex() {
        const out = this.copy();
        out.index = range(0, this.shape[0]).map((i) => {
          return "item" + leftPad(i, (out.index.length - 1).toString().length);
        });
        return out;
      }
      copy() {
        const out = new Series2();
        out._values = copy(this.values);
        out._index = copy(this.index);
        out.name = this.name;
        return out;
      }
      append(x) {
        return seriesAppend(Series2, this, x);
      }
      apply(fn) {
        return seriesApply(this, fn);
      }
      concat(x) {
        return this.append(x);
      }
      dropMissing(condition, threshold) {
        return seriesDropMissing(this, condition, threshold);
      }
      dropNaN() {
        return seriesDropNaN(Series2, this);
      }
      toObject() {
        return seriesToObject(this);
      }
      print() {
        return seriesPrint(this);
      }
      shuffle() {
        return seriesShuffle(this);
      }
      sort(direction) {
        return seriesSort(Series2, this, direction);
      }
      sortByIndex() {
        return seriesSortByIndex(Series2, this);
      }
      filter(fn) {
        return seriesFilter(Series2, this, fn);
      }
      toDataFrame() {
        const out = new DataFrame2(transpose([this.values]));
        out.columns = [this.name];
        out.index = this.index;
        return out;
      }
      transpose() {
        const out = this.copy();
        out.values = reverse(out.values);
        out.index = reverse(out.index);
        return out;
      }
      getDummies() {
        return this.toDataFrame().getDummies();
      }
      oneHotEncode() {
        return this.getDummies();
      }
    }
    return Series2;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/index.mjs
  var DATAFRAME_SYMBOL = Symbol.for("@jrc03c/js-math-tools/dataframe");
  function makeKey3(n) {
    const alpha = "abcdefghijklmnopqrstuvwxyz1234567890";
    let out = "";
    for (let i = 0; i < n; i++) out += alpha[Math.floor(random() * alpha.length)];
    return out;
  }
  var DataFrame = class _DataFrame {
    static [Symbol.hasInstance](x) {
      try {
        return !!x._symbol && x._symbol === DATAFRAME_SYMBOL;
      } catch (e) {
        return false;
      }
    }
    constructor(data) {
      Object.defineProperty(this, "_symbol", {
        configurable: false,
        enumerable: false,
        writable: false,
        value: DATAFRAME_SYMBOL
      });
      Object.defineProperty(this, "_values", {
        value: [],
        configurable: true,
        enumerable: false,
        writable: true
      });
      Object.defineProperty(this, "values", {
        configurable: true,
        enumerable: true,
        get() {
          if (this._values.length === 0 || !isUndefined(this._values[0]) && this._values[0].length === 0) {
            return [[]];
          }
          return this._values;
        },
        set(x) {
          assert(isArray(x), "The new values must be a 2-dimensional array!");
          const dataShape = shape(x);
          assert(
            dataShape.length === 2,
            "The new array of values must be 2-dimensional!"
          );
          if (dataShape[0] < this._index.length) {
            this._index = this._index.slice(0, dataShape[0]);
          } else if (dataShape[0] > this._index.length) {
            this._index = this._index.concat(
              range(this._index.length, dataShape[0]).map((i) => {
                return "row" + leftPad(i, (dataShape[0] - 1).toString().length);
              })
            );
          }
          if (dataShape[1] < this._columns.length) {
            this._columns = this._columns.slice(0, dataShape[1]);
          } else if (dataShape[1] > this._columns.length) {
            this._columns = this._columns.concat(
              range(this._columns.length, dataShape[1]).map((i) => {
                return "col" + leftPad(i, (dataShape[1] - 1).toString().length);
              })
            );
          }
          this._values = x;
        }
      });
      Object.defineProperty(this, "_columns", {
        value: [],
        configurable: true,
        enumerable: false,
        writable: true
      });
      Object.defineProperty(this, "columns", {
        configurable: true,
        enumerable: true,
        get() {
          return this._columns;
        },
        set(x) {
          assert(
            isArray(x),
            "The new columns list must be a 1-dimensional array of strings!"
          );
          assert(
            this.isEmpty || x.length === this.shape[1],
            "The new columns list must be the same length as the old columns list!"
          );
          assert(
            shape(x).length === 1,
            "The new columns list must be a 1-dimensional array of strings!"
          );
          x = x.map((v) => {
            if (typeof v !== "string") {
              v = JSON.stringify(v) || v.toString();
            }
            if (v.trim().length === 0) {
              return "untitled_" + makeKey3(8);
            }
            return v.trim();
          });
          const counts = (() => {
            const temp = count(x);
            const out = {};
            temp.values.forEach((v) => {
              out[v] = temp.get(v);
            });
            return out;
          })();
          x = x.map((v) => {
            if (counts[v] > 1) {
              return v + "_" + makeKey3(8);
            }
            return v;
          });
          this._columns = x;
        }
      });
      Object.defineProperty(this, "_index", {
        value: [],
        configurable: true,
        enumerable: false,
        writable: true
      });
      Object.defineProperty(this, "index", {
        configurable: true,
        enumerable: true,
        get() {
          return this._index;
        },
        set(x) {
          assert(
            isArray(x),
            "The new index must be a 1-dimensional array of strings!"
          );
          assert(
            this.isEmpty || x.length === this.shape[0],
            "The new index must be the same length as the old index!"
          );
          assert(
            shape(x).length === 1,
            "The new index must be a 1-dimensional array of strings!"
          );
          x = x.map((v) => {
            if (typeof v !== "string") {
              v = JSON.stringify(v) || v.toString();
            }
            if (v.trim().length === 0) {
              return "untitled_" + makeKey3(8);
            }
            return v.trim();
          });
          const counts = (() => {
            const temp = count(x);
            const out = {};
            temp.values.forEach((v) => {
              out[v] = temp.get(v);
            });
            return out;
          })();
          x = x.map((v) => {
            if (counts[v] > 1) {
              return v + "_" + makeKey3(8);
            }
            return v;
          });
          this._index = x;
        }
      });
      assert(
        isUndefined(data) || isObject(data) || isArray(data),
        "The `data` passed into the constructor of a DataFrame must be either (1) an object where the key-value pairs are (respectively) column names and 1-dimensional arrays of values, or (2) a 2-dimensional array of values."
      );
      if (data) {
        if (data instanceof _DataFrame) {
          this.values = copy(data.values);
          this.columns = copy(data.columns);
          this.index = copy(data.index);
        } else if (isArray(data)) {
          const dataShape = shape(data);
          assert(
            dataShape.length === 2,
            "The `data` array passed into the constructor of a DataFrame must be 2-dimensional!"
          );
          assert(
            !isJagged(data),
            "The 2-dimensional array passed into the constructor of a DataFrame must not contain sub-arrays (i.e., rows) of different lengths!"
          );
          this.values = data;
        } else {
          this._columns = Object.keys(data).concat(Object.getOwnPropertySymbols(data)).map((v) => v.toString());
          const temp = [];
          let lastColName = null;
          let lastColLength = null;
          this._columns.forEach((col) => {
            if (isUndefined(lastColLength)) {
              lastColName = col;
              lastColLength = data[col].length;
            }
            assert(
              data[col].length === lastColLength,
              `The object passed into the DataFrame constructor contains arrays of different lengths! The key "${lastColName}" points to an array containing ${lastColLength} items, and the key "${col}" points to an array containing ${data[col].length} items.`
            );
            lastColLength = data[col].length;
            const values = data[col];
            temp.push(values);
          });
          this._values = transpose(temp);
          const dataShape = shape(this.values);
          this._index = range(0, dataShape[0]).map((i) => {
            return "row" + leftPad(i, (dataShape[0] - 1).toString().length);
          });
        }
      }
    }
    get shape() {
      return shape(this.values);
    }
    get length() {
      return this.shape[0];
    }
    get width() {
      return this.shape[1];
    }
    get rows() {
      return this.index;
    }
    set rows(rows) {
      this.index = rows;
    }
    get isEmpty() {
      return this.values.length === 0 || this.values.every((row) => row.length === 0);
    }
    clear() {
      const out = new _DataFrame(ndarray(this.shape));
      out.columns = this.columns.slice();
      out.index = this.index.slice();
      return out;
    }
    get(rows, cols) {
      if (arguments.length === 0) {
        return this;
      }
      if (arguments.length === 1) {
        try {
          return this.get(null, rows);
        } catch (e) {
          return this.get(rows, null);
        }
      }
      return dfGet(this, rows, cols);
    }
    getSubsetByNames(rows, cols) {
      return dfGetSubsetByNames(_DataFrame, Series, this, rows, cols);
    }
    getSubsetByIndices(rowIndices, colIndices) {
      return dfGetSubsetByIndices(this, rowIndices, colIndices);
    }
    getDummies(columns) {
      return dfGetDummies(_DataFrame, this, columns);
    }
    oneHotEncode(columns) {
      return dfGetDummies(_DataFrame, this, columns);
    }
    transpose() {
      const out = new _DataFrame(transpose(this.values));
      out.columns = this.index.slice();
      out.index = this.columns.slice();
      return out;
    }
    get T() {
      return this.transpose();
    }
    resetIndex(shouldSkipCopying) {
      return dfResetIndex(this, shouldSkipCopying);
    }
    copy() {
      return dfCopy(_DataFrame, this);
    }
    assign(p1, p2) {
      return dfAssign(_DataFrame, Series, this, p1, p2);
    }
    apply(fn, axis) {
      return dfApply(_DataFrame, Series, this, fn, axis);
    }
    dropMissing(axis, condition, threshold) {
      return dfDropMissing(_DataFrame, Series, this, axis, condition, threshold);
    }
    dropNaN(axis, condition, threshold) {
      return dfDropNaN(_DataFrame, this, axis, condition, threshold);
    }
    drop(rows, cols) {
      return dfDrop(_DataFrame, Series, this, rows, cols);
    }
    dropColumns(columns) {
      return this.drop(null, columns);
    }
    dropRows(rows) {
      return this.drop(rows, null);
    }
    toDetailedObject(axis) {
      return dfToDetailedObject(this, axis);
    }
    toObject() {
      return dfToObject(this);
    }
    toJSONString(axis) {
      return dfToJSONString(this, axis);
    }
    saveAsJSON(filename, axis) {
      return dfToJSON(this, filename, axis);
    }
    print() {
      return dfPrint(_DataFrame, Series, this);
    }
    sort(cols, directions) {
      return dfSort(this, cols, directions);
    }
    sortByIndex() {
      return this.sort();
    }
    filter(fn, axis) {
      return dfFilter(_DataFrame, Series, this, fn, axis);
    }
    shuffle(axis) {
      return dfShuffle(this, axis);
    }
    append(x, axis) {
      return dfAppend(this, x, axis);
    }
    concat(x, axis) {
      return this.append(x, axis);
    }
    join(x, axis) {
      return this.append(x, axis);
    }
    toString() {
      return JSON.stringify(this);
    }
  };
  var Series = createSeriesClass(DataFrame);

  // node_modules/@jrc03c/js-math-tools/src/max.mjs
  function max(arr, shouldDropNaNs) {
    return stats(arr, { shouldDropNaNs }).max;
  }

  // node_modules/@jrc03c/js-math-tools/src/vectorize.mjs
  function vectorize(fn) {
    assert(
      isFunction(fn),
      "You must pass a function into the `vectorize` function!"
    );
    return function helper4() {
      let hasSeries, hasDataFrames;
      const series = [];
      const dataframes = [];
      const childArrays = Object.keys(arguments).filter((key) => {
        const arg = arguments[key];
        if (isArray(arg)) {
          return true;
        } else if (isSeries(arg)) {
          hasSeries = true;
          series.push(arg);
          return true;
        } else if (isDataFrame(arg)) {
          hasDataFrames = true;
          dataframes.push(arg);
          return true;
        } else {
          return false;
        }
      }).map((key) => arguments[key]);
      childArrays.slice(0, -1).forEach((s2, i) => {
        assert(
          isEqual(
            isArray(s2) ? shape(s2) : s2.shape,
            isArray(childArrays[i + 1]) ? shape(childArrays[i + 1]) : childArrays[i + 1].shape
          ),
          `When passing multiple arrays into the \`${fn.name}\` function, all of the arrays must have the same shape!`
        );
      });
      if (childArrays.length > 0) {
        const maxLength = max(
          childArrays.map((a) => a.length ? a.length : a.values.length)
        );
        const out = range(0, maxLength).map((i) => {
          const args = Object.keys(arguments).map((key) => {
            if (isArray(arguments[key])) {
              return arguments[key][i];
            } else if (isSeries(arguments[key])) {
              return arguments[key].values[i];
            } else if (isDataFrame(arguments[key])) {
              return arguments[key].values[i];
            } else {
              return arguments[key];
            }
          });
          return helper4(...args);
        });
        if (hasDataFrames) {
          try {
            if (dataframes.length === 1 && isEqual(shape(dataframes[0]), shape(out))) {
              const temp = new DataFrame(out);
              temp.index = dataframes[0].index.slice();
              temp.columns = dataframes[0].columns.slice();
              return temp;
            } else {
              return new DataFrame(out);
            }
          } catch (e) {
            return out;
          }
        }
        if (hasSeries) {
          try {
            if (series.length === 1 && series[0].length === out.length) {
              const temp = new Series(out);
              temp.name = series[0].name;
              temp.index = series[0].index.slice();
              return temp;
            } else {
              return new Series(out);
            }
          } catch (e) {
            return out;
          }
        }
        return out;
      } else {
        return fn(...arguments);
      }
    };
  }

  // node_modules/@jrc03c/js-math-tools/src/abs.mjs
  function abs(x) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") {
        return x < 0 ? -x : x;
      } else {
        return Math.abs(x);
      }
    } catch (e) {
      return NaN;
    }
  }
  var vabs = vectorize(abs);

  // node_modules/@jrc03c/js-math-tools/src/add.mjs
  function add() {
    try {
      let out = 0;
      let resultShouldBeABigInt = false;
      const x = Object.values(arguments);
      for (let v of x) {
        if (!isNumber(v)) return NaN;
        if (typeof v === "bigint") {
          resultShouldBeABigInt = true;
          v = Number(v);
        }
        out += v;
      }
      if (resultShouldBeABigInt) {
        try {
          return BigInt(out);
        } catch (e) {
        }
      }
      return out;
    } catch (e) {
      return NaN;
    }
  }
  var vadd = vectorize(add);

  // node_modules/@jrc03c/js-math-tools/src/apply.mjs
  function apply(x, fn) {
    try {
      return fn(x);
    } catch (e) {
      return NaN;
    }
  }
  var vapply = vectorize(apply);

  // node_modules/@jrc03c/js-math-tools/src/arccos.mjs
  function arccos(x) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") {
        x = Number(x);
      }
      return Math.acos(x);
    } catch (e) {
      return NaN;
    }
  }
  var varccos = vectorize(arccos);

  // node_modules/@jrc03c/js-math-tools/src/arcsin.mjs
  function arcsin(x) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") {
        x = Number(x);
      }
      return Math.asin(x);
    } catch (e) {
      return NaN;
    }
  }
  var varcsin = vectorize(arcsin);

  // node_modules/@jrc03c/js-math-tools/src/arctan.mjs
  function arctan(x) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") {
        x = Number(x);
      }
      return Math.atan(x);
    } catch (e) {
      return NaN;
    }
  }
  var varctan = vectorize(arctan);

  // node_modules/@jrc03c/js-math-tools/src/cast.mjs
  function cast(value, type) {
    if (isDataFrame(value) || isSeries(value)) {
      return value.apply((item) => cast(item, type));
    }
    if (isArray(value)) {
      return value.map((v) => cast(v, type));
    }
    if (type === "null") {
      return null;
    }
    if (type === "number") {
      if (isUndefined(value)) {
        return NaN;
      }
      const booleanValue = cast(value, "boolean");
      if (isBoolean(booleanValue)) {
        return booleanValue ? 1 : 0;
      }
      try {
        JSON.parse(value);
      } catch (e) {
        const dateValue = cast(value, "date");
        if (isDate(dateValue)) {
          return dateValue.getTime();
        }
      }
      const out = parseFloat(value);
      if (isNaN(out)) return NaN;
      return out;
    }
    if (type === "int") {
      const out = cast(value, "number");
      return out >= 0 ? Math.floor(out) : Math.ceil(out);
    }
    if (type === "float") {
      return cast(value, "number");
    }
    if (type === "bigint") {
      if (typeof value === "bigint") {
        return value;
      }
      return BigInt(cast(value, "int"));
    }
    if (type === "boolean") {
      if (isBoolean(value)) {
        return value;
      }
      if (isNumber(value)) {
        if (value === 0) {
          return false;
        }
        if (value === 1) {
          return true;
        }
        return null;
      }
      try {
        const vBool = (typeof value === "object" ? value.toString() === "null" ? "false" : JSON.stringify(value) : value.toString()).trim().toLowerCase();
        if (vBool === "true" || vBool === "yes" || vBool === "y") {
          return true;
        }
        if (vBool === "false" || vBool === "no" || vBool === "n") {
          return false;
        }
        return null;
      } catch (e) {
        return null;
      }
    }
    if (type === "date") {
      if (isDate(value)) {
        return value;
      }
      if (isUndefined(value)) {
        return null;
      }
      const valueFloat = parseFloat(value);
      if (!isNaN(valueFloat)) {
        const out = new Date(value);
        if (!isDate(out)) return null;
        return out;
      }
      const valueDate = Date.parse(value);
      if (!isNaN(valueDate)) {
        return new Date(valueDate);
      }
      return null;
    }
    if (type === "object") {
      if (isObject(value)) {
        return value;
      }
      const booleanValue = cast(value, "boolean");
      if (isBoolean(booleanValue)) {
        return null;
      }
      try {
        const numberValue = cast(value, "number");
        if (isNumber(numberValue)) {
          JSON.parse(value);
          return null;
        }
      } catch (e) {
      }
      const dateValue = cast(value, "date");
      if (dateValue) {
        return dateValue;
      }
      try {
        const out = JSON.parse(value);
        if (isArray(out)) {
          return out.map((v) => cast(v, type));
        } else {
          return out;
        }
      } catch (e) {
        return null;
      }
    }
    if (type === "string") {
      if (isUndefined(value)) {
        if (isEqual(value, void 0)) {
          return "undefined";
        }
        return "null";
      }
      if (value instanceof Date) {
        return value.toJSON();
      }
      const valueString = (() => {
        if (typeof value === "object") {
          if (value === null) {
            return "null";
          } else {
            return JSON.stringify(value);
          }
        } else {
          return value.toString();
        }
      })();
      return valueString;
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/ceil.mjs
  function ceil(x) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") return x;
      return Math.ceil(x);
    } catch (e) {
      return NaN;
    }
  }
  var vceil = vectorize(ceil);

  // node_modules/@jrc03c/js-math-tools/src/chop.mjs
  function chop(x, threshold) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") return x;
      if (isUndefined(threshold)) {
        threshold = 1e-10;
      } else if (!isNumber(threshold)) {
        return NaN;
      }
      return vabs(x) < threshold ? 0 : x;
    } catch (e) {
      return NaN;
    }
  }
  var vchop = vectorize(chop);

  // node_modules/@jrc03c/js-math-tools/src/int.mjs
  function int(x) {
    if (isDataFrame(x) || isSeries(x)) {
      const out = x.copy();
      out.values = int(out.values);
      return out;
    }
    if (isArray(x)) {
      return x.map((v) => int(v));
    } else {
      try {
        const out = JSON.parse(x);
        if (isNumber(out)) {
          return typeof out === "bigint" ? Number(out) : out >= 0 ? Math.floor(out) : Math.ceil(out);
        }
        return NaN;
      } catch (e) {
        return NaN;
      }
    }
  }
  var vint = vectorize(int);

  // node_modules/@jrc03c/js-math-tools/src/clamp.mjs
  function clamp(x, a, b) {
    try {
      if (!isNumber(x)) return NaN;
      if (!isNumber(a)) return NaN;
      if (!isNumber(b)) return NaN;
      if (typeof x === "bigint") {
        return BigInt(clamp(vint(x), a, b));
      }
      if (x < a) return a;
      if (x > b) return b;
      return x;
    } catch (e) {
      return NaN;
    }
  }
  var vclamp = vectorize(clamp);

  // node_modules/@jrc03c/js-math-tools/src/cos.mjs
  function cos(x) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") {
        x = Number(x);
      }
      return Math.cos(x);
    } catch (e) {
      return NaN;
    }
  }
  var vcos = vectorize(cos);

  // node_modules/@jrc03c/js-math-tools/src/helpers/data-types.mjs
  var dataTypes = Object.freeze({
    boolean: "boolean",
    date: "date",
    null: "null",
    number: "number",
    object: "object",
    string: "string"
  });

  // node_modules/@jrc03c/js-math-tools/src/pow.mjs
  function pow(x, p) {
    try {
      if (!isNumber(x)) return NaN;
      if (!isNumber(p)) return NaN;
      if (typeof x === "bigint" || typeof p === "bigint") {
        const out = pow(Number(x), Number(p));
        try {
          return BigInt(out);
        } catch (e) {
          return out;
        }
      }
      return Math.pow(x, p);
    } catch (e) {
      return NaN;
    }
  }
  var vpow = vectorize(pow);

  // node_modules/@jrc03c/js-math-tools/src/sqrt.mjs
  function sqrt(x) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") {
        const out = sqrt(Number(x));
        try {
          return BigInt(out);
        } catch (e) {
          return out;
        }
      }
      return Math.sqrt(x);
    } catch (e) {
      return NaN;
    }
  }
  var vsqrt = vectorize(sqrt);

  // node_modules/@jrc03c/js-math-tools/src/multiply.mjs
  function multiply() {
    try {
      const x = Object.values(arguments);
      if (x.length === 0) return NaN;
      let resultShouldBeABigInt = false;
      let out = 1;
      for (let v of x) {
        if (!isNumber(v)) return NaN;
        if (typeof v === "bigint") {
          resultShouldBeABigInt = true;
          v = Number(v);
        }
        out *= v;
      }
      if (resultShouldBeABigInt) {
        try {
          return BigInt(out);
        } catch (e) {
        }
      }
      return out;
    } catch (e) {
      return NaN;
    }
  }
  var vmultiply = vectorize(multiply);

  // node_modules/@jrc03c/js-math-tools/src/every.mjs
  function every(x, fn) {
    if (isDataFrame(x) || isSeries(x)) {
      return every(x.values, fn);
    }
    assert(
      isArray(x),
      "The first argument passed into the `every` function must be an array, Series, or DataFrame!"
    );
    assert(
      isFunction(fn),
      "The second argument passed into the `every` function must be a function!"
    );
    for (const v of x) {
      if (isArray(v)) {
        if (!every(v, fn)) {
          return false;
        }
      } else {
        if (!fn(v)) {
          return false;
        }
      }
    }
    return true;
  }

  // node_modules/@jrc03c/js-math-tools/src/exp.mjs
  function exp(x) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") {
        if (x === 0n) {
          return 1n;
        } else {
          x = Number(x);
        }
      }
      return Math.exp(x);
    } catch (e) {
      return NaN;
    }
  }
  var vexp = vectorize(exp);

  // node_modules/@jrc03c/js-math-tools/src/factorial.mjs
  function factorial(n) {
    try {
      if (typeof n === "bigint") {
        return BigInt(factorial(vint(n)));
      }
      if (n !== vint(n)) return NaN;
      if (n <= 1) return 1;
      return n * factorial(n - 1);
    } catch (e) {
      return NaN;
    }
  }
  var vfactorial = vectorize(factorial);

  // node_modules/@jrc03c/js-math-tools/src/float.mjs
  function float(x) {
    try {
      if (x === "Infinity") {
        return Infinity;
      }
      if (x === "-Infinity") {
        return -Infinity;
      }
      const out = JSON.parse(x);
      if (isNumber(out)) return out;
      return NaN;
    } catch (e) {
      return NaN;
    }
  }
  var vfloat = vectorize(float);

  // node_modules/@jrc03c/js-math-tools/src/floor.mjs
  function floor(x) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") {
        return x;
      }
      return Math.floor(x);
    } catch (e) {
      return NaN;
    }
  }
  var vfloor = vectorize(floor);

  // node_modules/@jrc03c/js-math-tools/src/helpers/boolean-values.mjs
  var booleanValues = ["true", "false", "yes", "no"];

  // node_modules/@jrc03c/js-math-tools/src/helpers/null-values.mjs
  var nullValues = ["null", "none", "nan", "na", "n/a", "", "undefined"];

  // node_modules/@jrc03c/js-math-tools/src/infer-type.mjs
  function checkIfInteger(results) {
    if (results.type === "number") {
      if (typeof results.value !== "undefined") {
        results.isInteger = vint(results.value) === results.value;
      } else {
        results.isInteger = every(
          results.values,
          (v) => isNumber(v) ? vint(v) === v : true
        );
      }
    }
    return results;
  }
  function inferType(arr) {
    if (isDataFrame(arr)) {
      const out = arr.copy();
      const results = inferType(arr.values);
      out.values = results.values;
      return checkIfInteger({ type: results.type, values: out });
    }
    if (isSeries(arr)) {
      const out = arr.copy();
      const results = inferType(arr.values);
      out.values = results.values;
      return checkIfInteger({ type: results.type, values: out });
    }
    if (!isArray(arr)) {
      const out = inferType([arr]);
      out.value = out.values[0];
      delete out.values;
      return checkIfInteger(out);
    }
    assert(
      isArray(arr),
      "The `inferType` function only works on arrays, Series, and DataFrames!"
    );
    const types = flatten(arr).map((v) => {
      if (v === void 0) return "null";
      try {
        if (typeof v === "object") {
          const temp = new Date(v.getTime());
          if (isDate(temp)) {
            return "date";
          }
        }
      } catch (e) {
      }
      if (!isString(v)) {
        if (typeof v === "bigint") {
          v = v.toString() + "n";
        } else {
          v = JSON.stringify(v);
        }
      }
      const vLower = v.toLowerCase();
      const vLowerTrimmed = vLower.trim();
      if (nullValues.indexOf(vLowerTrimmed) > -1) {
        return "null";
      }
      if (booleanValues.indexOf(vLowerTrimmed) > -1) {
        return "boolean";
      }
      try {
        if (v.match(/^-?\d+n$/g)) {
          return "bigint";
        }
        const vParsed = JSON.parse(v);
        if (isNumber(vParsed)) {
          return "number";
        }
        if (typeof vParsed === "object") {
          if (isArray(vParsed)) return "string";
          return "object";
        }
        return "string";
      } catch (e) {
        const vDate = new Date(v);
        if (isDate(vDate)) {
          return "date";
        }
        return "string";
      }
    });
    const counts = count(types);
    const sortedValues = counts.values.toSorted(
      (a, b) => counts.get(b) - counts.get(a)
    );
    const primaryType = sortedValues[0];
    return checkIfInteger({
      type: primaryType,
      values: vapply(arr, (v) => cast(v, primaryType))
    });
  }

  // node_modules/@jrc03c/js-math-tools/src/lerp.mjs
  function lerp(a, b, f) {
    try {
      if (!isNumber(a)) return NaN;
      if (!isNumber(b)) return NaN;
      if (!isNumber(f)) return NaN;
      if (typeof a === "bigint" || typeof b === "bigint") {
        const out = lerp(Number(a), Number(b), f);
        try {
          return BigInt(out);
        } catch (e) {
          return out;
        }
      }
      return f * (b - a) + a;
    } catch (e) {
      return NaN;
    }
  }
  var vlerp = vectorize(lerp);

  // node_modules/@jrc03c/js-math-tools/src/log.mjs
  function log(x, base) {
    try {
      base = isUndefined(base) ? Math.E : base;
      if (!isNumber(x)) return NaN;
      if (!isNumber(base)) return NaN;
      if (typeof x === "bigint" || typeof base === "bigint") {
        const out = log(Number(x), Number(base));
        try {
          return BigInt(out);
        } catch (e) {
          return out;
        }
      }
      return Math.log(x) / Math.log(base);
    } catch (e) {
      return NaN;
    }
  }
  var vlog = vectorize(log);

  // node_modules/@jrc03c/js-math-tools/src/mod.mjs
  function mod(a, b) {
    try {
      if (!isNumber(a)) return NaN;
      if (!isNumber(b)) return NaN;
      if (typeof a === "bigint" || typeof b === "bigint") {
        const out = mod(Number(a), Number(b));
        try {
          return BigInt(out);
        } catch (e) {
          return out;
        }
      }
      return a % b;
    } catch (e) {
      return NaN;
    }
  }
  var vmod = vectorize(mod);

  // node_modules/@jrc03c/js-math-tools/src/remap.mjs
  var helper3 = vectorize((x, a, b, c, d) => {
    try {
      let resultShouldBeABigInt = false;
      for (const v of [x, a, b, c, d]) {
        if (!isNumber(v)) {
          return NaN;
        }
        if (typeof v === "bigint") {
          resultShouldBeABigInt = true;
        }
      }
      if (resultShouldBeABigInt) {
        x = Number(x);
        a = Number(a);
        b = Number(b);
        c = Number(c);
        d = Number(d);
      }
      const num = (d - c) * (x - a);
      const den = b - a;
      if (den === 0) return NaN;
      const out = num / den + c;
      if (resultShouldBeABigInt) {
        try {
          return BigInt(out);
        } catch (e) {
        }
      }
      return out;
    } catch (e) {
      return NaN;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/round.mjs
  function round(x) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") return x;
      return Math.round(x);
    } catch (e) {
      return NaN;
    }
  }
  var vround = vectorize(round);

  // node_modules/@jrc03c/js-math-tools/src/sign.mjs
  function sign(x) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") return BigInt(sign(Number(x)));
      if (x < 0) return -1;
      if (x > 0) return 1;
      return 0;
    } catch (e) {
      return NaN;
    }
  }
  var vsign = vectorize(sign);

  // node_modules/@jrc03c/js-math-tools/src/sin.mjs
  function sin(x) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") {
        x = Number(x);
      }
      return Math.sin(x);
    } catch (e) {
      return NaN;
    }
  }
  var vsin = vectorize(sin);

  // node_modules/@jrc03c/js-math-tools/src/tan.mjs
  function tan(x) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") {
        x = Number(x);
      }
      return Math.tan(x);
    } catch (e) {
      return NaN;
    }
  }
  var vtan = vectorize(tan);

  // src/parse.mjs
  var import_papaparse = __toESM(require_papaparse_min(), 1);
  function leftPad2(x, n) {
    x = x.toString();
    while (x.length < n) x = "0" + x;
    return x;
  }
  function parse(raw, config) {
    const defaults = {
      beforeFirstChunk: void 0,
      chunk: void 0,
      chunkSize: void 0,
      comments: false,
      complete: void 0,
      delimiter: "",
      delimitersToGuess: [",", "	", "|", ";", import_papaparse.default.RECORD_SEP, import_papaparse.default.UNIT_SEP],
      download: false,
      downloadRequestBody: void 0,
      downloadRequestHeaders: void 0,
      dynamicTyping: false,
      encoding: "",
      error: void 0,
      escapeChar: '"',
      fastMode: void 0,
      newline: "",
      preview: 0,
      quoteChar: '"',
      skipEmptyLines: false,
      step: void 0,
      transform: void 0,
      transformHeader: void 0,
      withCredentials: void 0,
      worker: false,
      // I've changed this value from the Papa defaults because, at least for my
      // purposes, I anticipate that most datasets will include a header row.
      header: true,
      // I'm adding this option in case a dataset has (or should have) an index
      // column (i.e., a first column filled with row names).
      index: false,
      // I'm also adding my own options to infer types using my `inferType`
      // function in @jrc03c/js-math-tools. Papa offers a "dynamicTyping" option,
      // but I think maybe mine is a little more extensive (i.e., I think it
      // infers more data types, but may not necessarily be more robust). I'm
      // willing to be wrong about that, though. By default, this value is set to
      // `false`, which means that the returned `DataFrame` will only contain
      // strings.
      inferTypes: false
    };
    config = config ? { ...defaults, ...config } : defaults;
    const results = import_papaparse.default.parse(raw.trim(), config);
    let data, columns, index;
    if (config.header) {
      data = {};
      columns = results.meta.fields;
      columns.forEach((col) => {
        data[col] = results.data.map((row) => row[col]);
      });
      if (config.index) {
        index = data[columns[0]];
        delete data[columns[0]];
        columns.shift();
      }
    } else {
      const maxRowLength = max(results.data.map((row) => row.length));
      columns = range(0, maxRowLength).map(
        (i) => `col${leftPad2(i, maxRowLength.toString().length)}`
      );
      data = results.data.map((row) => {
        row.length = maxRowLength;
        return row;
      });
      if (config.index) {
        index = data.map((row) => row.shift());
        columns.pop();
      }
    }
    const out = new DataFrame(data);
    out.columns = columns;
    if (index) {
      out.index = index;
    }
    return config && config.inferTypes ? out.apply((col) => inferType(col).values) : out;
  }

  // src/load-csv-in-browser.mjs
  async function loadCSVInBrowser(path, config) {
    const response = await fetch(path);
    const raw = await response.text();
    return parse(raw, config);
  }

  // src/unparse.mjs
  var import_papaparse2 = __toESM(require_papaparse_min(), 1);
  function unparse(df, config) {
    const defaults = {
      columns: null,
      delimiter: ",",
      escapeChar: '"',
      header: true,
      quoteChar: '"',
      quotes: false,
      skipEmptyLines: false,
      // This is the only value that's been changed from Papa's defaults.
      newline: "\n",
      // I'm adding this option in case a dataset has (or should have) an index
      // column (i.e., a first column filled with row names).
      index: false
    };
    df = df.copy();
    config = config ? { ...defaults, ...config } : defaults;
    if (config.header) {
      config.columns = config.columns || df.columns;
      if (config.index) {
        df = df.assign("(index)", df.index);
        config.columns.splice(0, 0, "(index)");
        df = df.get(config.columns);
      }
    } else {
      config.columns = null;
      if (config.index) {
        const columns = ["(index)"].concat(df.columns);
        df = df.assign("(index)", df.index);
        df = df.get(columns);
      }
    }
    df = df.copy();
    df.values = df.values.map((row) => {
      return row.map((v) => {
        if (isUndefined(v)) {
          return "";
        }
        if (typeof v === "number" && isNaN(v)) {
          return "";
        }
        if (typeof v === "object") {
          if (v instanceof Date) {
            return v.toJSON();
          } else {
            return JSON.stringify(v);
          }
        }
        return v;
      });
    });
    const values = config.header ? [df.columns].concat(df.values) : df.values;
    return import_papaparse2.default.unparse(values, config).trim();
  }

  // src/save-csv-in-browser.mjs
  async function saveCSVInBrowser(filename, df, config) {
    const raw = unparse(df, config);
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(raw);
    a.download = filename;
    a.dispatchEvent(new MouseEvent("click"));
  }

  // src/iife.mjs
  if (typeof globalThis !== "undefined") {
    globalThis.JSCSVHelpers = index_browser_exports;
  }
})();
/*! Bundled license information:

papaparse/papaparse.min.js:
  (* @license
  Papa Parse
  v5.4.1
  https://github.com/mholt/PapaParse
  License: MIT
  *)
*/
