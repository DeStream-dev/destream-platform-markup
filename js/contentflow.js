/* ContentFlow, version 1.0.2  | (c) 2007 - 2010 Sebastian Kutsch | <http://www.jacksasylum.eu/ContentFlow/> | ContentFlow is distributed under the terms of the MIT license. | (see http://www.jacksasylum.eu/ContentFlow/LICENSE) */
var ContentFlowGlobal = {
    Flows: new Array,
    AddOns: {},
    scriptName: "contentflow.js",
    scriptElement: null,
    Browser: new(function() {
        this.Opera = window.opera ? true : false;
        this.IE = document.all && !this.Opera ? true : false;
        this.IE6 = this.IE && typeof(window.XMLHttpRequest) == "undefined" ? true : false;
        this.IE8 = this.IE && typeof(document.querySelectorAll) != "undefined" ? true : false;
        this.IE7 = this.IE && !this.IE6 && !this.IE8 ? true : false;
        this.WebKit = /WebKit/i.test(navigator.userAgent) ? true : false, this.iPhone = /iPhone|iPod/i.test(navigator.userAgent) ? true : false;
        this.Chrome = /Chrome/i.test(navigator.userAgent) ? true : false;
        this.Safari = /Safari/i.test(navigator.userAgent) && !this.Chrome ? true : false;
        this.Konqueror = navigator.vendor == "KDE" ? true : false;
        this.Konqueror4 = this.Konqueror && /native code/.test(document.getElementsByClassName) ? true : false;
        this.Gecko = !this.WebKit && navigator.product == "Gecko" ? true : false;
        this.Gecko19 = this.Gecko && Array.reduce ? true : false
    })(),
    getAddOnConf: function(A) {
        if (this.AddOns[A]) {
            return this.AddOns[A].conf
        } else {
            return {}
        }
    },
    setAddOnConf: function(B, A) {
        this.AddOns[B].setConfig(A)
    },
    getScriptElement: function(D) {
        var C = new RegExp(D);
        var A = document.getElementsByTagName("script");
        for (var B = 0; B < A.length; B++) {
            if (A[B].src && C.test(A[B].src)) {
                return A[B]
            }
        }
        return ""
    },
    getScriptPath: function(C, B) {
        var A = new RegExp(B + ".*");
        return C.src.replace(A, "")
    },
    addScript: function(B) {
        if (this.Browser.IE || this.Browser.WebKit || this.Browser.Konqueror) {
            document.write('<script type="text/javascript" src="' + B + '"><\/script>')
        } else {
            var A = document.createElement("script");
            A.src = B;
            A.setAttribute("type", "text/javascript");
            document.getElementsByTagName("head")[0].appendChild(A)
        }
    },
    addScripts: function(C, B) {
        for (var A = 0; A < filename.length; A++) {
            this.addScript(basepath + B[A])
        }
    },
    addStylesheet: function(B) {
        if (this.Browser.Gecko19) {
            var A = document.createElement("link");
            A.setAttribute("rel", "stylesheet");
            A.setAttribute("href", B);
            A.setAttribute("type", "text/css");
            A.setAttribute("media", "screen");
            document.getElementsByTagName("head")[0].appendChild(A)
        } else {
            document.write('<link rel="stylesheet" href="' + B + '" type="text/css" media="screen" />')
        }
    },
    addStylesheets: function(C, B) {
        for (var A = 0; A < filename.length; A++) {
            this.addStylesheet(basepath + B[A])
        }
    },
    initPath: function() {
        this.CSSBaseDir = "css/"
        this.scriptElement = this.getScriptElement(this.scriptName);
        if (!this.scriptElement) {
            this.scriptName = "contentflow_src.js";
            this.scriptElement = this.getScriptElement(this.scriptName)
        }
        this.BaseDir = this.getScriptPath(this.scriptElement, this.scriptName);
        if (!this.AddOnBaseDir) {
            this.AddOnBaseDir = this.BaseDir
        }
        if (!this.CSSBaseDir) {
            this.CSSBaseDir = this.BaseDir
        }
    },
    init: function() {
        this.addStylesheet(this.CSSBaseDir + "contentflow.css");
      //  this.addStylesheet(this.CSSBaseDir + "mycontentflow.css");
        this.loadAddOns = new Array();
        if (this.scriptElement.getAttribute("load")) {
            var A = this.loadAddOns = this.scriptElement.getAttribute("load").replace(/\ +/g, " ").split(" ");
            for (var C = 0; C < A.length; C++) {
                if (A[C] == "") {
                    continue
                }
                this.addScript(this.AddOnBaseDir + "ContentFlowAddOn_" + A[C] + ".js")
            }
        }
        var E = this;
        if (document.addEventListener) {
            if (this.Browser.WebKit) {
                var D = setInterval(function() {
                    if (/loaded|complete/.test(document.readyState)) {
                        clearInterval(D);
                        E.onloadInit()
                    }
                }, 10)
            } else {
                document.addEventListener("DOMContentLoaded", E.onloadInit, false)
            }
        } else {
            if (this.Browser.IE) {
                document.write("<script id=__ie_cf_onload defer src=javascript:void(0)><\/script>");
                var B = document.getElementById("__ie_cf_onload");
                B.onreadystatechange = function() {
                    if (this.readyState == "complete") {
                        E.onloadInit()
                    }
                }
            }
        }
        window.addEvent("load", E.onloadInit, false)
    },
    onloadInit: function() {
        if (arguments.callee.done) {
            return
        }
        for (var C = 0; C < ContentFlowGlobal.loadAddOns.length; C++) {
            var A = ContentFlowGlobal.loadAddOns[C];
            if (!ContentFlowGlobal.AddOns[A]) {
                var G = ContentFlowGlobal;
                window.setTimeout(G.onloadInit, 10);
                return
            }
        }
        arguments.callee.done = true;
        if (window.Element && Element.implement && document.all && !window.opera) {
            for (var H in window.CFElement.prototype) {
                if (!window.Element.prototype[H]) {
                    var F = {};
                    F[H] = window.CFElement.prototype[H];
                    Element.implement(F)
                }
            }
        }
        for (var C = 0; C < ContentFlowGlobal.Flows.length; C++) {
            ContentFlowGlobal.Flows[C].init()
        }
        var D = document.getElementsByTagName("div");
        DIVS: for (var C = 0; C < D.length; C++) {
            if (D[C].className.match(/\bContentFlow\b/)) {
                for (var B = 0; B < ContentFlowGlobal.Flows.length; B++) {
                    if (D[C] == ContentFlowGlobal.Flows[B].Container) {
                        continue DIVS
                    }
                }
                var E = new ContentFlow(D[C], {}, false);
                E.init()
            }
        }

    }
};
ContentFlowGlobal.initPath();
var ContentFlowAddOn = function(B, A, C) {
    if (typeof C == "undefined" || C != false) {
        ContentFlowGlobal.AddOns[B] = this
    }
    this.name = B;
    if (!A) {
        A = {}
    }
    this.methods = A;
    this.conf = {};
    if (this.methods.conf) {
        this.setConfig(this.methods.conf);
        delete this.methods.conf
    }
    this.scriptpath = ContentFlowGlobal.AddOnBaseDir;
    if (A.init) {
        var D = A.init.bind(this);
        D(this)
    }
};
ContentFlowAddOn.prototype = {
    Browser: ContentFlowGlobal.Browser,
    addScript: ContentFlowGlobal.addScript,
    addScripts: ContentFlowGlobal.addScripts,
    addStylesheet: function(A) {
        if (!A) {
            A = this.scriptpath + "ContentFlowAddOn_" + this.name + ".css"
        }
        ContentFlowGlobal.addStylesheet(A)
    },
    addStylesheets: ContentFlowGlobal.addStylesheets,
    setConfig: function(A) {
        for (var B in A) {
            this.conf[B] = A[B]
        }
    },
    _init: function(A) {
        if (this.methods.ContentFlowConf) {
            A.setConfig(this.methods.ContentFlowConf)
        }
    }
};
var ContentFlowGUIElement = function(A, B) {
    B.setDimensions = function() {
        this.dimensions = this.getDimensions();
        this.center = {
            x: this.dimensions.width / 2,
            y: this.dimensions.height / 2
        };
        this.position = this.findPos()
    };
    B.addObserver = function(D, E) {
        var C = this.eventMethod = E.bind(A);
        this.observedEvent = D;
        this.addEvent(D, C, false)
    };
    B.makeDraggable = function(E, D, F) {
        this.stopDrag = function(H) {
            if (!H) {
                var H = window.event
            }
            if (this.Browser.iPhone) {
                window.removeEvent("touchemove", E, false);
                if (!this.ontochmove) {
                    var G = H.target;
                    if (G.firstChild) {
                        G = G.firstChild
                    }
                    var I = document.createEvent("MouseEvents");
                    I.initEvent("click", true, true);
                    G.dispatchEvent(I)
                }
            } else {
                window.removeEvent("mousemove", E, false)
            }
            F(H)
        }.bind(this);
        this.initDrag = function(G) {
            if (!G) {
                var G = window.event
            }
            var H = G;
            if (G.touches) {
                H = G.touches[0]
            }
            this.mouseX = H.clientX;
            this.mouseY = H.clientY;
            D(G)
        }.bind(this);
        this.startDrag = function(I) {
            if (!I) {
                var I = window.event
            }
            var G = this.stopDrag;
            if (this.Browser.iPhone) {
                var H = this;
                H.ontouchmove = false;
                window.addEvent("touchmove", function(J) {
                    H.ontouchmove = true;
                    E(J)
                }, false);
                I.preventDefault();
                window.addEvent("touchend", G, false)
            } else {
                window.addEvent("mousemove", E, false);
                window.addEvent("mouseup", G, false)
            }
            if (I.preventDefault) {
                I.preventDefault()
            }
        }.bind(this);
        var C = this.startDrag;
        if (this.Browser.iPhone) {
            this.addEventListener("touchstart", C, false)
        } else {
            this.addEvent("mousedown", C, false)
        }
    };
    B.Browser = ContentFlowGlobal.Browser;
    $CF(B).setDimensions();
    return B
};
var ContentFlowItem = function(C, D, E) {
    this.CFobj = C;
    this._activeElement = C.conf.activeElement;
    this.pre = null;
    this.next = null;
    this.clickItem = function(M) {
        if (!M) {
            var M = window.event
        }
        var K = M.target ? M.target : M.srcElement;
        var J = K.itemIndex ? K.itemIndex : K.parentNode.itemIndex;
        var L = this.items[J];
        if (this._activeItem == L) {
            this.conf.onclickActiveItem(L)
        } else {
            if (this.conf.onclickInactiveItem(L) != false) {
                this.moveToIndex(J)
            }
        }
    }.bind(C), this.setIndex = function(J) {
        this.index = J;
        this.element.itemIndex = J
    };
    this.getIndex = function() {
        return this.index
    };
    if ($CF(D).nodeName == "IMG") {
        var A = document.createElement("div");
        A.className = "item";
        var I = D.parentNode.replaceChild(A, D);
        I.className = "content";
        A.appendChild(I);
        if (D.title) {
            var F = document.createElement("div");
            F.className = "caption";
            F.innerHTML = D.title;
            A.appendChild(F)
        }
        D = A
    }
    this.element = $CF(D);
    this.item = D;
    if (typeof E != "undefined") {
        this.setIndex(E)
    }
    this.content = this.element.getChildrenByClassName("content")[0];
    this.caption = this.element.getChildrenByClassName("caption")[0];
    this.label = this.element.getChildrenByClassName("label")[0];
    if (this.content.nodeName == "IMG") {
        C._imagesToLoad++;
        var B = function() {
            C._imagesToLoad--;
            this.image = this.content;
            this.setImageFormat(this.image);
            if (C.conf.reflectionHeight > 0) {
                this.addReflection()
            }
            this.initClick();
            C._addItemCueProcess(true)
        }.bind(this);
        if (this.content.complete && this.content.width > 0) {
            window.setTimeout(B, 100)
        } else {
            if (this.Browser.IE && !this.content.onload) {
                var H = this;
                var G = window.setInterval(function() {
                    if (H.content.complete && H.content.width > 0) {
                        window.clearInterval(G);
                        B()
                    }
                }, 10)
            } else {
                this.content.onload = window.setTimeout(B, 100)
            }
        }
    } else {
        this.initClick();
        C._addItemCueProcess(true)
    }
};
ContentFlowItem.prototype = {
    Browser: ContentFlowGlobal.Browser,
    makeActive: function() {
        this.element.addClassName("active");
        this.CFobj.conf.onMakeActive(this)
    },
    makeInactive: function() {
        this.element.removeClassName("active");
        this.CFobj.conf.onMakeInactive(this)
    },
    initClick: function() {
        var A = this.clickItem;
        this[this._activeElement].addEvent("click", A, false)
    },
    setImageFormat: function(A) {
        if (this.Browser.IE6 || this.Browser.IE7) {
            A.style.width = "auto"
        }
        A.origProportion = A.width / A.height;
        A.setAttribute("origProportion", A.width / A.height);
        if (this.Browser.IE6 || this.Browser.IE7) {
            A.style.width = ""
        }
        if (A.origProportion <= 1) {
            A.addClassName("portray")
        } else {
            A.addClassName("landscape")
        }
    },
    addReflection: function() {
        var F = this.CFobj;
        var S;
        var K = this.content;
        if (this.Browser.IE) {
            var Q = "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";
            if (F._reflectionColorRGB) {
                if (F.conf.reflectionColor == "transparent") {
                    var N = S = this.reflection = document.createElement("img");
                    S.src = K.src
                } else {
                    S = this.reflection = document.createElement("div");
                    var N = document.createElement("img");
                    N.src = K.src;
                    S.width = N.width;
                    S.height = N.height;
                    N.style.width = "100%";
                    N.style.height = "100%";
                    var M = F._reflectionColorRGB;
                    S.style.backgroundColor = "#" + M.hR + M.hG + M.hB;
                    S.appendChild(N)
                }
                Q += " progid:DXImageTransform.Microsoft.Alpha(opacity=0, finishOpacity=50, style=1, finishX=0, startY=" + F.conf.reflectionHeight * 100 + " finishY=0)"
            } else {
                var N = S = this.reflection = document.createElement("img");
                S.src = K.src
            }
            Q += " progid:DXImageTransform.Microsoft.Matrix(M11=1, M12=0, M21=0, M22=" + 1 / F.conf.reflectionHeight + ")";
            if (ContentFlowGlobal.Browser.IE6) {
                if (K.src.match(/\.png$/)) {
                    K.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + K.src + "', sizingMethod=scale )";
                    K.filterString = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + K.src + "', sizingMethod=scale )";
                    Q += " progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + K.src + "', sizingMethod=scale )";
                    K.origSrc = K.src;
                    K.src = "img/blank.gif";
                    N.src = "img/blank.gif"
                }
            }
            S.filterString = Q;
            N.style.filter = Q
        } else {
            if (F._reflectionWithinImage) {
                var D = this.canvas = $CF(document.createElement("canvas"))
            } else {
                var D = S = this.reflection = document.createElement("canvas")
            }
            if (D.getContext) {
                if (F._reflectionWithinImage) {
                    for (var R = 0; R < K.attributes.length; R++) {
                        D.setAttributeNode(K.attributes[R].cloneNode(true))
                    }
                }
                var C = D.getContext("2d");
                var P = F.maxHeight;
                var I = F._scaleImageSize(this, {
                    width: P,
                    height: P
                }, P);
                var L = I.width;
                var J = I.height;
                if (F._reflectionWithinImage) {
                    D.width = L;
                    D.height = J;
                    this.setImageFormat(D);
                    D.height = J * (1 + F.conf.reflectionHeight + F.conf.reflectionGap)
                } else {
                    D.width = L;
                    D.height = J * F.conf.reflectionHeight
                }
                C.save();
                if (F._reflectionWithinImage) {
                    C.drawImage(K, 0, 0, L, J)
                }
                if (F._reflectionWithinImage) {
                    var O = J * (1 + F.conf.reflectionGap / 2) * 2
                } else {
                    var O = K.height
                }
                O -= 1;
                C.translate(0, O);
                C.scale(1, -1);
                C.drawImage(K, 0, 0, L, J);
                C.restore();
                if (F._reflectionColorRGB) {
                    var B = C.createLinearGradient(0, 0, 0, D.height);
                    var E = [0, 0.5, 1];
                    if (F._reflectionColor == "transparent") {
                        C.globalCompositeOperation = "destination-in";
                        E = [1, 0.5, 0]
                    }
                    var G = F._reflectionColorRGB.iR;
                    var H = F._reflectionColorRGB.iG;
                    var A = F._reflectionColorRGB.iB;
                    if (F._reflectionWithinImage) {
                        B.addColorStop(0, "rgba(" + G + "," + H + "," + A + "," + E[0] + ")");
                        B.addColorStop(J / D.height, "rgba(" + G + "," + H + "," + A + "," + E[0] + ")");
                        B.addColorStop(J / D.height, "rgba(" + G + "," + H + "," + A + "," + E[1] + ")")
                    } else {
                        B.addColorStop(0, "rgba(" + G + "," + H + "," + A + "," + E[1] + ")")
                    }
                    B.addColorStop(1, "rgba(" + G + "," + H + "," + A + "," + E[2] + ")");
                    C.fillStyle = B;
                    C.fillRect(0, 0, D.width, D.height)
                }
                if (F._reflectionWithinImage) {
                    K.parentNode.replaceChild(D, K);
                    this.content = D;
                    this.origContent = D;
                    delete this.image
                }
            } else {
                F._reflectionWithinImage = false;
                delete this.reflection
            }
        }
        if (S) {
            S.className = "reflection";
            this.element.appendChild(S);
            if (this.caption) {
                this.element.appendChild(this.caption)
            }
        }
    }
};
var ContentFlow = function(A, B) {
    if (A) {
        ContentFlowGlobal.Flows.push(this);
        this.Container = A;
        this._userConf = B ? B : {};
        this.conf = {};
        this._loadedAddOns = new Array()
    } else {
        throw ("ContentFlow ERROR: No flow container node or id given")
    }
};
var currentPlayer = null;
ContentFlow.prototype = {
    _imagesToLoad: 0,
    _activeItem: 0,
    _currentPosition: 0,
    _targetPosition: 0,
    _stepLock: false,
    _millisecondsPerStep: 40,
    _reflectionWithinImage: true,
    Browser: ContentFlowGlobal.Browser,
    _defaultConf: {
        useAddOns: "all",
        biggestItemPos: 0,
        loadingTimeout: 30000,
        activeElement: "content",
        maxItemHeight: 400,
        scaleFactor: 1,
        scaleFactorLandscape: 3.3,
        scaleFactorPortrait: 1,
        fixItemSize: false,
        relativeItemPosition: "center center",
        circularFlow: false,
        verticalFlow: false,
        visibleItems: 3,
        endOpacity: 1,
        startItem: "center",
        scrollInFrom: "pre",
        flowSpeedFactor: 0.3,
        flowDragFriction: 0.3,
        scrollWheelSpeed: 0,
        keys: {
            13: function() {
                this.conf.onclickActiveItem(this._activeItem)
            },
            37: function() {
                this.moveTo("pre")
            },
            38: function() {
                this.moveTo("visibleNext")
            },
            39: function() {
                this.moveTo("next")
            },
            40: function() {
                this.moveTo("visiblePre")
            }
        },
        reflectionColor: "transparent",
        reflectionHeight: 0,
        reflectionGap: 0,
        onInit: function() {},
        onclickInactiveItem: function(A) {           
        },
        onclickActiveItem: function(B) {           
        },
        onMakeInactive: function(A) {      
            if(currentPlayer){
                currentPlayer.stop();
                currentPlayer.destroy();
                currentPlayer = null;
            }
        },
        onMakeActive: function(item) {
               if(!currentPlayer) {
                currentPlayer = new Plyr($(item.element).find(".player").find("video"));
                setTimeout(function(){
                   currentPlayer.play();
                   currentPlayer.volume = 0;
                   currentPlayer.toggleControls(false);
                }, 400);
              }            
        },
        onReachTarget: function(A) { },
        onMoveTo: function(A) {},
        onDrawItem: function(A) {},
        onclickPreButton: function(A) {
            this.moveToIndex("pre");
            return Event.stop(A)
        },
        onclickNextButton: function(A) {
            this.moveToIndex("next");
            return Event.stop(A)
        },
        calcStepWidth: function(D) {
            var C = this.conf.visibleItems;
            var A = this.items.length;
            A = A == 0 ? 1 : A;
            if (Math.abs(D) > C) {
                if (D > 0) {
                    var B = D - C
                } else {
                    var B = D + C
                }
            } else {
                if (C >= this.items.length) {
                    var B = D / A
                } else {
                    var B = D * (C / A)
                }
            }
            return B
        },
        calcSize: function(D) {
            var B = D.relativePosition;
            var C = 1 / (Math.abs(B) + 1);
            var A = C;
            return {
                width: A,
                height: C
            }
        },
        calcCoordinates: function(C) {
            var B = C.relativePosition;
            var E = this.conf.visibleItems;
            var D = 1 - 1 / Math.exp(Math.abs(B) * 0.75);
            var A = C.side * E / (E + 1) * D;
            var F = 1;
            return {
                x: A,
                y: F
            }
        },
        calcZIndex: function(A) {
            return -Math.abs(A.relativePositionNormed)
        },
        calcFontSize: function(A) {
            return A.size.height
        },
        calcOpacity: function(A) {
            return Math.max(1 - ((1 - this.conf.endOpacity) * Math.sqrt(Math.abs(A.relativePositionNormed))), this.conf.endOpacity)
        }
    },
    _checkIndex: function(A) {
        A = Math.max(A, 0);
        A = Math.min(A, this.itemsLastIndex);
        return A
    },
    _setLastIndex: function() {
        this.itemsLastIndex = this.items.length - 1
    },
    _getItemByIndex: function(A) {
        return this.items[this._checkIndex(A)]
    },
    _getItemByPosition: function(A) {
        return this._getItemByIndex(this._getIndexByPosition(A))
    },
    _getPositionByIndex: function(B) {
        if (!this.conf.circularFlow) {
            return this._checkIndex(B)
        }
        var A = this._getIndexByPosition(this._currentPosition);
        var C = B - A;
        if (Math.abs(C) > C + this.items.length) {
            C += this.items.length
        } else {
            if (Math.abs(C) > (Math.abs(C - this.items.length))) {
                C -= this.items.length
            }
        }
        return this._currentPosition + C
    },
    _getIndexByPosition: function(A) {
        if (A < 0) {
            var C = 0
        } else {
            var C = 1
        }
        var B = (Math.round(A) + C) % this.items.length;
        if (B > 0) {
            B -= C
        } else {
            if (B < 0) {
                B += this.items.length - C
            } else {
                if (A < 0) {
                    B = 0
                } else {
                    B = this.items.length - 1
                }
            }
        }
        return B
    },
    _getIndexByKeyWord: function(B, D, A) {
        if (D) {
            var C = D
        } else {
            if (this._activeItem) {
                var C = this._activeItem.index
            } else {
                var C = 0
            }
        }
        if (isNaN(B)) {
            switch (B) {
                case "first":
                case "start":
                    C = 0;
                    break;
                case "last":
                case "end":
                    C = this.itemsLastIndex;
                    break;
                case "middle":
                case "center":
                    C = Math.round(this.itemsLastIndex / 2);
                    break;
                case "right":
                case "next":
                    C += 1;
                    break;
                case "left":
                case "pre":
                case "previous":
                    C -= 1;
                    break;
                case "visible":
                case "visiblePre":
                case "visibleLeft":
                    C -= this.conf.visibleItems;
                    break;
                case "visibleNext":
                case "visibleRight":
                    C += this.conf.visibleItems;
                    break;
                default:
                    C = C
            }
        } else {
            C = B
        }
        if (A != false) {
            C = this._checkIndex(C)
        }
        return C
    },
    _setCaptionLabel: function(A) {
        if (this.Position && !this.Slider.locked) {
            this.Position.setLabel(A)
        }
        this._setGlobalCaption()
    },
    getAddOnConf: function(A) {
        return ContentFlowGlobal.getAddOnConf(A)
    },
    setAddOnConf: function(B, A) {
        ContentFlowGlobal.setAddOnConf(B, A)
    },
    init: function() {
        if (this.isInit) {
            return
        }
        this._init()
    },
    setConfig: function(A) {
        if (!A) {
            return
        }
        var E = this._defaultConf;
        for (var F in A) {
            if (E[F] == "undefined") {
                continue
            }
            switch (F) {
                case "scrollInFrom":
                case "startItem":
                    if (typeof(A[F]) == "number" || typeof(A[F]) == "string") {
                        this.conf[F] = A[F]
                    }
                    break;
                default:
                    if (typeof(E[F] == A[F])) {
                        if (typeof A[F] == "function") {
                            this.conf[F] = A[F].bind(this)
                        } else {
                            this.conf[F] = A[F]
                        }
                    }
            }
        }
        switch (this.conf.reflectionColor) {
            case this.conf.reflectionColor.search(/#[0-9a-fA-F]{6}/) >= 0 ? this.conf.reflectionColor:
                this.conf.reflectionColor + "x": this._reflectionColorRGB = {
                    hR: this.conf.reflectionColor.slice(1, 3),
                    hG: this.conf.reflectionColor.slice(3, 5),
                    hB: this.conf.reflectionColor.slice(5, 7),
                    iR: parseInt(this.conf.reflectionColor.slice(1, 3), 16),
                    iG: parseInt(this.conf.reflectionColor.slice(3, 5), 16),
                    iB: parseInt(this.conf.reflectionColor.slice(5, 7), 16)
                };
                break;
            case "none":
            case "transparent":
            default:
                this._reflectionColor = "transparent";
                this._reflectionColorRGB = {
                    hR: 0,
                    hG: 0,
                    hB: 0,
                    iR: 0,
                    iG: 0,
                    iB: 0
                };
                break
        }
        if (this.items) {
            if (this.conf.visibleItems < 0) {
                this.conf.visibleItems = Math.round(Math.sqrt(this.items.length))
            }
            this.conf.visibleItems = Math.min(this.conf.visibleItems, this.items.length - 1)
        }
        if (this.conf.relativeItemPosition) {
            var C = {
                x: {
                    left: function(J) {
                        return -1
                    },
                    center: function(J) {
                        return 0
                    },
                    right: function(J) {
                        return 1
                    }
                },
                y: {
                    top: function(J) {
                        return -1
                    },
                    center: function(J) {
                        return 0
                    },
                    bottom: function(J) {
                        return 1
                    }
                }
            };
            var I = this.conf.relativeItemPosition;
            I = I.replace(/above/, "top").replace(/below/, "bottom");
            var H, G = null;
            H = I.match(/left|right/);
            G = I.match(/top|bottom/);
            c = I.match(/center/);
            if (!H) {
                if (c) {
                    H = "center"
                } else {
                    H = "center"
                }
            }
            if (!G) {
                if (c) {
                    G = "center"
                } else {
                    G = "top"
                }
            }
            var D = C.x[H];
            var B = C.y[G];
            this.conf.calcRelativeItemPosition = function(K) {
                var J = D(K.size);
                var L = B(K.size);
                return {
                    x: J,
                    y: L
                }
            };
            this.conf.relativeItemPosition = null
        }
        if (this._reflectionType && this._reflectionType != "clientside") {
            this.conf.reflectionHeight = 0
        }
    },
    getItem: function(A) {
        return this.items[this._checkIndex(Math.round(A))]
    },
    getActiveItem: function() {
        return this._activeItem
    },
    getNumberOfItems: function() {
        return this.items.length
    },
    resize: function() {
        this._initSizes();
        this._initStep()
    },
    moveToPosition: function(B, A) {
        if (!this.conf.circularFlow) {
            B = this._checkIndex(B)
        }
        this._targetPosition = B;
        this.conf.onMoveTo(this._getItemByPosition(B));
        this._initStep(false, A)
    },
    moveToIndex: function(A) {
        this._targetPosition = Math.round(this._getPositionByIndex(this._getIndexByKeyWord(A, this._activeItem.index, !this.conf.circularFlow)));
        this.conf.onMoveTo(this._getItemByPosition(this._targetPosition));
        this._initStep()
    },
    moveToItem: function(B) {
        var A;
        if (B.itemIndex) {
            A = B.itemIndex
        } else {
            A = B.index
        }
        this.moveToIndex(A)
    },
    moveTo: function(A) {
        if (typeof A == "object") {
            this.moveToItem(A)
        } else {
            if (isNaN(A) || (A == Math.floor(A) && A < this.items.length)) {
                this.moveToIndex(A)
            } else {
                this.moveToPosition(A)
            }
        }
    },
    _addItemCue: [],
    _addItemCueProcess: function(C) {
        var D = this._addItemCue;
        if (C == true) {
            D.shift()
        }
        if (D.length > 0 && !D[0].p) {
            D[0].p = true;
            var A = this;
            var B = D.length > 5 ? 1 : 40;
            window.setTimeout(function() {
                A._addItem(D[0].el, D[0].i)
            }, B)
        }
    },
    addItem: function(B, A) {
        this._addItemCue.push({
            el: B,
            i: A,
            p: false
        });
        if (this._addItemCue.length == 1) {
            this._addItemCueProcess()
        }
    },
    _addItem: function(C, A) {
        if (typeof A == "string") {
            switch (A) {
                case "first":
                case "start":
                    A = 0;
                    break;
                case "last":
                case "end":
                    A = isNaN(this.itemsLastIndex) ? 0 : this.itemsLastIndex;
                    A += 1;
                    break;
                default:
                    A = this._getIndexByKeyWord(A)
            }
        }
        A = Math.max(A, 0);
        A = Math.min(A, this.itemsLastIndex + 1);
        A = isNaN(A) ? 0 : A;
        this.Flow.appendChild(C);
        var D = new ContentFlowItem(this, C, A);
        if (this.items.length == 0) {
            this.resize();
            if (this.conf.circularFlow) {
                D.pre = D;
                D.next = D
            }
        } else {
            if (A == this.itemsLastIndex + 1) {
                D.pre = this.items[this.itemsLastIndex];
                D.next = D.pre.next
            } else {
                D.next = this.items[A];
                D.pre = D.next.pre
            }
            if (D.pre) {
                D.pre.next = D
            }
            if (D.next) {
                D.next.pre = D
            }
        }
        this.items.splice(A, 0, D);
        for (var B = A; B < this.items.length; B++) {
            this.items[B].setIndex(B)
        }
        this._setLastIndex();
        if (this.conf.origVisibleItems < 0) {
            this.conf.visibleItems = Math.round(Math.sqrt(this.items.length))
        }
        this.conf.visibleItems = Math.min(this.conf.visibleItems, this.items.length - 1);
        if (Math.round(this._getPositionByIndex(A)) <= Math.round(this._targetPosition)) {
            this._targetPosition++;
            if (!this.conf.circularFlow) {
                this._targetPosition = Math.min(this._targetPosition, this.itemsLastIndex)
            }
        }
        if (this._getPositionByIndex(A) <= this._currentPosition) {
            this._currentPosition++;
            if (!this.conf.circularFlow) {
                this._currentPosition = Math.min(this._currentPosition, this.itemsLastIndex)
            }
        }
        var E = this;
        window.setTimeout(function() {
            if (E.items.length == 1) {
                E._currentPosition = -0.01;
                E._targetPosition = 0;
                E.resize()
            } else {
                E._initStep()
            }
        }, 100);
        return A
    },
    rmItem: function(A) {
        if (A == "undefined") {
            A = this._activeItem.index
        }
        A = this._getIndexByKeyWord(A);
        if (!this.items[A]) {
            return null
        }
        var D = this.items[A];
        if (D.pre) {
            D.pre.next = D.next
        }
        if (D.next) {
            D.next.pre = D.pre
        }
        this.items.splice(A, 1);
        for (var B = A; B < this.items.length; B++) {
            this.items[B].setIndex(B)
        }
        this._setLastIndex();
        if (Math.round(this._getPositionByIndex(A)) < Math.round(this._targetPosition)) {
            this._targetPosition--;
            if (!this.conf.circularFlow) {
                this._targetPosition = this._checkIndex(this._targetPosition)
            }
        }
        if (this._getPositionByIndex(A) < this._currentPosition) {
            this._currentPosition--;
            if (!this.conf.circularFlow) {
                this._currentPosition = this._checkIndex(this._currentPosition)
            }
        }
        this._activeItem = this._getItemByPosition(this._currentPosition);
        var C = D.element.parentNode.removeChild(D.element);
        var E = this;
        window.setTimeout(function() {
            E._initStep()
        }, 10);
        return C
    },
    _init: function() {
        if (typeof(this.Container) == "string") {
            var B = document.getElementById(this.Container);
            if (B) {
                this.Container = B
            } else {
                throw ("ContentFlow ERROR: No element with id '" + this.Container + "' found!");
                return
            }
        }
        $CF(this.Container).addClassName("ContentFlow");
        var A = $CF(this.Container).getChildrenByClassName("flow")[0];
        if (!A) {
            throw ("ContentFlow ERROR: No element with class'flow' found!");
            return
        }
        this.Flow = new ContentFlowGUIElement(this, A);
        var M = this.Container.getChildrenByClassName("scrollbar")[0];
        if (M) {
            this.Scrollbar = new ContentFlowGUIElement(this, M);
            var F = this.Scrollbar.getChildrenByClassName("slider")[0];
            if (F) {
                this.Slider = new ContentFlowGUIElement(this, F);
                var H = this.Slider.getChildrenByClassName("position")[0];
                if (H) {
                    this.Position = new ContentFlowGUIElement(this, H)
                }
            }
        }
        this.setConfig(this._defaultConf);
        this._initAddOns();
        this.setConfig(this._userConf);
        this._initSizes();
        var J = this.Flow.getChildrenByClassName("item");
        this.items = new Array();
        for (var G = 0; G < J.length; G++) {
            var K = this.items[G] = new ContentFlowItem(this, J[G], G);
            if (G > 0) {
                K.pre = this.items[G - 1];
                K.pre.next = K
            }
        }
        this._setLastIndex();
        if (this.conf.circularFlow && this.items.length > 0) {
            var L = this.items[0];
            L.pre = this.items[this.items.length - 1];
            L.pre.next = L
        }
        this._initGUI();
        if (this._activeElement != "content") {
            this._activeElement = "element"
        }
        this.conf.origVisibleItems = this.conf.visibleItems;
        if (this.conf.visibleItems < 0) {
            this.conf.visibleItems = Math.round(Math.sqrt(this.items.length))
        }
        this.conf.visibleItems = Math.min(this.conf.visibleItems, this.items.length - 1);
        this._targetPosition = this._getIndexByKeyWord(this.conf.startItem, 0);
        var I = this._getIndexByKeyWord(this.conf.scrollInFrom, this._targetPosition);
        switch (this.conf.scrollInFrom) {
            case "next":
            case "right":
                I -= 0.5;
                break;
            case "pre":
            case "previous":
            case "left":
                I += 0.5;
                break
        }
        this._currentPosition = I;
        var E = new Date();
        var D = this;
        var C = window.setInterval(function() {
            if (D._imagesToLoad == 0 || new Date() - E > D._loadingTimeout) {
                clearInterval(C);
                D._activeItem = D.getItem(D._currentPosition);
                if (D._activeItem) {
                    D._activeItem.makeActive();
                    D._setCaptionLabel(D._activeItem.index)
                }
                D.Flow.style.visibility = "visible";
                if (D.loadIndicator) {
                    D.loadIndicator.style.display = "none"
                }
                if (D.Scrollbar) {
                    D.Scrollbar.style.visibility = "visible"
                }
                D.resize();
                for (var O = 0; O < D._loadedAddOns.length; O++) {
                    var N = ContentFlowGlobal.AddOns[D._loadedAddOns[O]];
                    if (N.methods.afterContentFlowInit) {
                        N.methods.afterContentFlowInit(D)
                    }
                }
                D.conf.onInit()
            }
        }, 10);
        this.isInit = true
    },
    _initAddOns: function() {
        var C = [];
        if (this._userConf.useAddOns) {
            if (typeof this._userConf.useAddOns == "string") {
                C = this._userConf.useAddOns.split(" ")
            } else {
                if (typeof this._userConf.useAddOns == "array") {
                    C = this._userConf.useAddOns
                }
            }
        } else {
            if (this.Container.getAttribute("useAddOns")) {
                C = this.Container.getAttribute("useAddOns").split(" ")
            } else {
                C = this.conf.useAddOns.split(" ")
            }
        }
        for (var B = 0; B < C.length; B++) {
            if (C[B] == "none") {
                C = new Array();
                break
            } else {
                if (C[B] == "all") {
                    C = new Array();
                    for (var A in ContentFlowGlobal.AddOns) {
                        C.push(A)
                    }
                    break
                }
            }
        }
        for (var B = 0; B < C.length; B++) {
            var A = ContentFlowGlobal.AddOns[C[B]];
            if (A) {
                this._loadedAddOns.push(C[B]);
                A._init(this);
                this.Container.addClassName("ContentFlowAddOn_" + A.name);
                if (A.methods.onloadInit) {
                    A.methods.onloadInit(this)
                }
            }
        }
    },
    _initGUI: function() {
        var C = this.resize.bind(this);
        window.addEvent("resize", C, false);
        var K = this.Container.getElementsByTagName("div");
        for (var G = 0; G < K.length; G++) {
            if ($CF(K[G]).hasClassName("preButton")) {
                var F = K[G];
                var A = this.conf.onclickPreButton;
                F.addEvent("click", A, false)
            } else {
                if (K[G].hasClassName("nextButton")) {
                    var I = K[G];
                    var A = this.conf.onclickNextButton;
                    I.addEvent("click", A, false)
                }
            }
        }
        if (this.conf.scrollWheelSpeed != 0) {
            var J = this._wheel.bind(this);
            if (window.addEventListener) {
                this.Container.addEventListener("DOMMouseScroll", J, false)
            }
            this.Container.onmousewheel = J
        }
        var L = this._keyStroke.bind(this);
        if (this.conf.keys && !this.Browser.iPhone) {
            if (document.addEventListener) {
                if (!this.Browser.Opera) {
                    var D = document.createElement("div");
                    D.addClassName("mouseoverCheckElement");
                    this.Container.appendChild(D);
                    if (this.Browser.WebKit) {
                        document.body.addEvent("keydown", function(O) {
                            if (D.offsetLeft > 0) {
                                L(O)
                            }
                        })
                    } else {
                        window.addEvent("keydown", function(O) {
                            if (D.offsetLeft > 0) {
                                L(O)
                            }
                        })
                    }
                } else {
                    this.Container.addEvent("keydown", L)
                }
            } else {
                this.Container.onkeydown = L
            }
        }
        if (this.conf.flowDragFriction > 0) {
            var E = function(R) {
                var U = R;
                if (R.touches) {
                    U = R.touches[0]
                }
                var Q = U.clientX;
                var P = U.clientY;
                if (this.conf.verticalFlow) {
                    var V = P - this.Flow.mouseY;
                    var T = this.Flow.dimensions.height
                } else {
                    var V = Q - this.Flow.mouseX;
                    var T = this.Flow.dimensions.width
                }
                var O = (V / T) * (2 * this.conf.visibleItems + 1);
                var S = this._currentPosition - O * 2 * this.conf.visibleItems / this.conf.flowDragFriction;
                this.Flow.mouseX = Q;
                this.Flow.mouseY = P;
                this.moveToPosition(S, true)
            }.bind(this);
            var N = function() {};
            var H = function(P) {
                var O = Math.round(this._targetPosition);
                if (Math.abs(O - this._currentPosition) > 0.001) {
                    this.moveToPosition(O)
                }
            }.bind(this);
           // this.Flow.makeDraggable(E, N, H)
        }
        if (this.Scrollbar) {
            var M = function(R) {
                if (!R) {
                    var R = window.event
                }
                if (!this.Scrollbar.clickLocked) {
                    var Q = R.clientX;
                    var P = Q - this.Scrollbar.position.left;
                    var O = Math.round(P / this.Scrollbar.dimensions.width * this.itemsLastIndex);
                    this.moveToIndex(O)
                } else {
                    this.Scrollbar.clickLocked = false
                }
            }.bind(this);
            this.Scrollbar.addObserver("click", M)
        }
        if (this.Slider) {
            if (this.Browser.IE6) {
                var B = document.createElement("div");
                B.className = "virtualSlider";
                this.Slider.appendChild(B)
            }
            this.Slider.setPosition = function(O) {
                O = O - Math.floor(O) + this._getIndexByPosition(Math.floor(O));
                if (Math.round(O) < 0) {
                    O = this.itemsLastIndex
                } else {
                    if (O <= 0) {
                        O = 0
                    } else {
                        if (Math.round(O) > this.itemsLastIndex) {
                            O = 0
                        } else {
                            if (O >= this.itemsLastIndex) {
                                O = this.itemsLastIndex
                            }
                        }
                    }
                }
                if (this.items.length > 1) {
                    var P = (O / this.itemsLastIndex) * this.Scrollbar.dimensions.width
                } else {
                    var P = 0.5 * this.Scrollbar.dimensions.width
                }
                this.Slider.style.left = P - this.Slider.center.x + "px";
                this.Slider.style.top = this.Scrollbar.center.y - this.Slider.center.y + "px"
            }.bind(this);
            var N = function(O) {
                this.Scrollbar.clickLocked = true
            }.bind(this);
            var E = function(P) {
                var Q = P;
                if (P.touches) {
                    Q = P.touches[0]
                }
                var O = this._checkIndex((Q.clientX - this.Scrollbar.position.left) / this.Scrollbar.dimensions.width * this.itemsLastIndex);
                this._targetPosition = this._getPositionByIndex(O);
                this.Slider.setPosition(O);
                if (this.Position) {
                    this.Position.setLabel(O)
                }
                this._initStep(true, true)
            }.bind(this);
            var H = function(O) {
                this._targetPosition = Math.round(this._targetPosition);
                this.conf.onMoveTo(this._getItemByPosition(this._targetPosition));
                this._initStep(true)
            }.bind(this);
           // this.Slider.makeDraggable(E, N, H)
        }
        if (this.Position) {
            this.Position.setLabel = function(O) {
                O = this._checkIndex(Math.round(O));
                if (this.items && this.items[O].label) {
                    this.Position.innerHTML = this.items[O].label.innerHTML
                } else {
                    this.Position.innerHTML = O + 1
                }
            }.bind(this)
        }
        this.globalCaption = this.Container.getChildrenByClassName("globalCaption")[0];
        this.loadIndicator = this.Container.getChildrenByClassName("loadIndicator")[0]
    },
    _initSizes: function(A) {
        this._initMaxHeight();
        var E = this._initScrollbarSize();
        if (!this.conf.verticalFlow && this.Container.style.height && this.Container.style.height != "auto") {
            this.maxHeight -= E
        }
        if (!this._activeItem) {
            return
        }
        var D = this._findBiggestItem();
        var F = this.Flow.findPos();
        if (this.conf.verticalFlow) {
            this.Flow.style.width = D.width.width + "px";
            this.Flow.style.height = 3 * D.width.width * (1 + this.conf.reflectionHeight + this.conf.reflectionGap) + "px"
        } else {
            this.Flow.style.height = D.height.height + (D.height.top - F.top) + "px"
        }
        var C = this.conf.verticalFlow ? D.width.width : D.height.height;
        var B = C / (1 + this.conf.reflectionHeight + this.conf.reflectionGap);
        this.Flow.style.marginBottom = -(C - B) + "px";
        this.Flow.dimensions = this.Flow.getDimensions();
        if (!this.Browser.IE6) {
            if (this.conf.verticalFlow && this.Container.clientWidth < this.Flow.dimensions.width) {} else {
                if (this.Container.clientHeight < this.Flow.dimensions.height) {
                    this.Container.style.height = this.Flow.dimensions.height + "px"
                }
            }
        }
        if (this.conf.verticalFlow) {
            this.Flow.center = {
                x: this.Flow.dimensions.height / 2,
                y: D.width.width / 2
            }
        } else {
            this.Flow.center = {
                x: this.Flow.dimensions.width / 2,
                y: D.height.height / 2
            }
        }
    },
    _initScrollbarSize: function() {
        var C;
        var I;
        var F;
        if (C = this.Scrollbar) {
            C.setDimensions();
            var B = C.dimensions.height;
            if (I = this.Slider) {
                I.setDimensions();
                B += I.dimensions.height;
                if (F = this.Position) {
                    var K = F.innerHTML;
                    var G = maxW = 0;
                    F.style.width = "auto";
                    if (this.items) {
                        for (var D = 0; D < this.items.length; D++) {
                            var J = this.items[D];
                            if (J.label) {
                                F.innerHTML = J.label.innerHTML
                            } else {
                                F.innerHTML = J.index
                            }
                            var E = F.clientHeight;
                            var H = F.clientWidth;
                            if (E > G) {
                                G = E
                            }
                            if (H > maxW) {
                                maxW = H
                            }
                        }
                    } else {
                        F.innerHTML = "&nbsp;";
                        G = F.clientHeight;
                        maxW = F.clientWidth
                    }
                    F.innerHTML = K;
                    F.setDimensions();
                    F.style.width = maxW + "px";
                    F.style.left = (I.dimensions.width - maxW) / 2 + "px";
                    var A = F.position.top - I.position.top;
                    if (A > 0) {
                        A += -C.dimensions.height + G;
                        C.style.marginBottom = A + "px"
                    } else {
                        A *= -1;
                        C.style.marginTop = A + "px"
                    }
                    B += A
                }
            }
        } else {
            B = 0
        }
        return B
    },
    _initMaxHeight: function() {
        if (this.conf.verticalFlow) {
            var G = screen.width / screen.height;
            var D = this.Container.style.width;
            var E = this.Container.clientWidth;
            var C = this.Flow.style.width;
            var F = this.Flow.clientWidth;
            var A = this.Flow.clientHeight
        } else {
            var G = screen.height / screen.width;
            var D = this.Container.style.height;
            var E = this.Container.clientHeight;
            var C = this.Flow.style.height;
            var F = this.Flow.clientHeight;
            var A = this.Flow.clientWidth
        }
        if (this.ContainerOldDim) {
            D = this.ContainerOldDim
        }
        if (this.FlowOldDim) {
            C = this.FlowOldDim
        }
        this.ContainerOldDim = "auto";
        this.FlowOldDim = "auto";
        if (this.conf.maxItemHeight <= 0) {
            this.maxHeight = A / 3 * G / 1 * this.conf.scaleFactor;
            if (this.conf.verticalFlow && (this.maxHeight == 0 || this.maxHeight > F)) {
                this.maxHeight = F
            }
            if (D && D != "auto") {
                var H = this.conf.verticalFlow ? 0 : this.conf.reflectionGap;
                var B = this.conf.verticalFlow ? 0 : this.conf.reflectionHeight;
                this.maxHeight = E / (this.conf.scaleFactor * (1 + B + H));
                this.ContainerOldDim = D
            } else {
                if (C && C != "auto") {
                    var H = this.conf.verticalFlow ? 0 : this.conf.reflectionGap;
                    this.maxHeight = F / (this.conf.scaleFactor * (1 + this.conf.reflectionHeight + H));
                    this.FlowOldDim = C
                }
            }
        } else {
            this.maxHeight = this.conf.maxItemHeight
        }
    },
    _findBiggestItem: function() {
        var G = this._activeItem;
        var A = G.pre;
        var B = G.next;
        var E = maxFlowSize = {
            width: {
                width: 0,
                left: 0,
                height: 0,
                top: 0,
                item: null,
                rI: 0
            },
            height: {
                width: 0,
                left: 0,
                height: 0,
                top: 0,
                item: null,
                rI: 0
            }
        };
        var F = function(N, J) {
            var M = N.element;
            M.style.display = "block";
            var O = M.findPos();
            var L = M.clientHeight;
            var K = M.clientWidth;
            if (L + O.top >= E.height.height + E.height.top) {
                E.height.height = L;
                E.height.top = O.top;
                E.height.item = N;
                E.height.rI = J
            }
            if (K + O.left >= E.width.width + E.width.left) {
                E.width.width = K;
                E.width.left = O.left;
                E.width.item = N;
                E.width.rI = J
            }
            M.style.display = "none"
        };
        var H = this._currentPosition;
        this._currentPosition = this.conf.visibleItems + 1;
        for (var C = -this.conf.visibleItems; C <= this.conf.visibleItems; C++) {
            G.element.style.display = "none";
            this._positionItem(G, C);
            F(G, C)
        }
        var D = E.height.rI;
        for (var C = 0; C < this.items.length; C++) {
            var I = this.items[C];
            I.element.style.display = "none";
            this._positionItem(I, D);
            F(I, D)
        }
        this._currentPosition = H;
        return E
    },
    _keyStroke: function(A) {
        if (!A) {
            var A = window.event
        }
        if (A.which) {
            var B = A.which
        } else {
            if (A.keyCode) {
                var B = A.keyCode
            }
        }
        if (this.conf.keys[B]) {
            this.conf.keys[B].bind(this)();
            return Event.stop(A)
        } else {
            return true
        }
    },
    _wheel: function(A) {
        if (!A) {
            var A = window.event
        }
        var C = 0;
        if (A.wheelDelta) {
            C = A.wheelDelta / 120
        } else {
            if (A.detail) {
                C = -A.detail / 3
            }
        }
        if (C) {
            var B = this._targetPosition;
            if (C < 0) {
                B += (1 * this.conf.scrollWheelSpeed)
            } else {
                B -= (1 * this.conf.scrollWheelSpeed)
            }
            this.moveToPosition(Math.round(B))
        }
        return Event.stop(A)
    },
    _setGlobalCaption: function() {
        if (this.globalCaption) {
            this.globalCaption.innerHTML = "";
            if (this._activeItem && this._activeItem.caption) {
                this.globalCaption.appendChild(this._activeItem.caption.cloneNode(true))
            }
        }
    },
    _initStep: function(B, A) {
        if (this.Slider) {
            if (B) {
                this.Slider.locked = true
            } else {
                this.Slider.locked = false
            }
        }
        this._holdPos = A == true ? true : false;
        if (!this._stepLock) {
            this._stepLock = true;
            this._step()
        }
    },
    _step: function() {
        var D = this._targetPosition - this._currentPosition;
        var C = Math.abs(D);
        if (C > 0.001) {
            this._currentPosition += this.conf.flowSpeedFactor * this.conf.calcStepWidth(D, C, this.items.length, this.conf.visibleItems);
            var A = this.items[(this._getIndexByPosition(this._currentPosition))];
            if (A && A != this._activeItem) {
                if (this._activeItem) {
                    this._activeItem.makeInactive()
                }
                this._activeItem = A;
                this._activeItem.makeActive();
                this._setCaptionLabel(this._activeItem.index);
                if (Math.abs(this._targetPosition - this._currentPosition) <= 0.5) {
                    this.conf.onReachTarget(this._activeItem)
                }
            }
            this._positionItems();
            var B = this._step.bind(this);
            window.setTimeout(B, this._millisecondsPerStep)
        } else {
            if (!this._holdPos) {
                if (this.Slider) {
                    this.Slider.locked = false
                }
                this._currentPosition = Math.round(this._currentPosition);
                if (this.Position && !this.Slider.locked && this._activeItem) {
                    this._setCaptionLabel(this._activeItem.index)
                }
                this._positionItems();
                this._stepLock = false
            } else {
                this._stepLock = false
            }
        }
        if (this.Slider && !this.Slider.locked) {
            this.Slider.setPosition(this._currentPosition)
        }
    },
    _positionItems: function() {
        if (this._lastStart) {
            var E = this._lastStart;
            while (E) {
                E.element.style.display = "none";
                E = E.next;
                if (E == this._lastStart) {
                    break
                }
                if (E && E.pre == this._lastEnd) {
                    break
                }
            }
        } else {
            this._lastStart = this._activeItem
        }
        if (!this._activeItem) {
            return
        }
        var C = this._activeItem;
        var B = C.pre;
        var D = C.next;
        this._positionItem(C, 0);
        for (var A = 1; A <= this.conf.visibleItems && 2 * A < this.items.length; A++) {
            if (B) {
                this._positionItem(B, -A);
                this._lastStart = B;
                B = B.pre
            }
            if (D) {
                this._positionItem(D, A);
                this._lastEnd = D;
                D = D.next
            }
        }
    },
    _positionItem: function(S, A) {
        var I = this.conf;
        var N = I.verticalFlow;
        var E = S.element.style;
        var L = S.position = this._currentPosition + A;
        var M = S.relativePosition = Math.round(L) - this._currentPosition;
        var Q = S.relativePositionNormed = I.visibleItems > 0 ? M / I.visibleItems : 0;
        var B = M < 0 ? -1 : 1;
        B *= M == 0 ? 0 : 1;
        S.side = B;
        var J = I.calcSize(S);
        J.height = Math.max(J.height, 0);
        J.width = Math.max(J.width, 0);
        if (S.content.origProportion) {
            J = this._scaleImageSize(S, J)
        }
        S.size = J;
        var P = S.coordinates = I.calcCoordinates(S);
        var H = S.relativeItemPosition = I.calcRelativeItemPosition(S);
        var K = S.zIndex = I.calcZIndex(S);
        var C = S.fontSize = I.calcFontSize(S);
        var D = S.opacity = I.calcOpacity(S);
        J.height *= this.maxHeight;
        J.width *= this.maxHeight;
        var R = N ? J.height : J.width;
        var O = N ? J.width : J.height;
        var G = this.Flow.center.x * (1 + P.x) + (H.x - 1) * R / 2;
        var F = this.maxHeight / 2 * (1 + P.y) + (H.y - 1) * O / 2;
        E.left = (N ? F : G) + "px";
        E.top = (N ? G : F) + "px";
        this._setItemSize(S, J);
        if (I.endOpacity != 1) {
            this._setItemOpacity(S)
        }
        if (!this.Browser.IE) {
            E.fontSize = (C * 100) + "%"
        }
        E.zIndex = 32768 + Math.round(K * this.items.length);
        I.onDrawItem(S);
        E.visibility = "visible";
        E.display = "block"
    },
    _scaleImageSize: function(N, P, I) {
        var E = this.conf.scaleFactorLandscape;
        var D = this.conf.scaleFactorPortrait;
        var M = this.conf.verticalFlow;
        var B = N.content.origProportion;
        var C = P.width;
        var L = P.height;
        var H = N.content;
        if (M) {
            if (B <= 1) {
                if (E != "max" && E != 1) {
                    L *= E;
                    C = Math.min(L * B, I ? I : 1)
                }
                L = C / B
            } else {
                if (B > 1) {
                    if (D == "max") {
                        L = I ? I : 1
                    } else {
                        if (D != 1) {
                            C *= D;
                            L = Math.min(C / B, I ? I : 1)
                        } else {
                            L = C / B
                        }
                    }
                    C = L * B
                }
            }
        } else {
            if (B > 1) {
                if (E != "max" && E != 1) {
                    C *= E;
                    L = Math.min(C / B, I ? I : 1)
                }
                C = L * B
            } else {
                if (B <= 1) {
                    if (D == "max") {
                        C = I ? I : 1
                    } else {
                        if (D != 1) {
                            L *= D;
                            C = Math.min(L * B, I ? I : 1)
                        } else {
                            C = L * B
                        }
                    }
                    L = C / B
                }
            }
        }
        L = isNaN(L) ? 0 : L;
        C = isNaN(C) ? 0 : C;
        if (!I && this.conf.fixItemSize) {
            var A = P.width / P.height;
            var I = Math.max(P.width, P.height);
            var O = this._scaleImageSize(N, {
                width: I,
                height: I
            }, I);
            if (A < 1) {
                L = O.height / P.height;
                C = L * B / A
            } else {
                C = O.width / P.width;
                L = C / B * A
            }
            var G = L * 100;
            var K = C * 100;
            var J = (1 - C) / 2 * 100;
            var F = (1 - L) / A * 100 * (M ? 0.5 : 1);
            H.style.height = G + "%";
            if (N.reflection) {
                N.reflection.style.height = G * this.conf.reflectionHeight + "%"
            }
            H.style.width = K + "%";
            if (N.reflection) {
                N.reflection.style.width = K + "%"
            }
            H.style.marginLeft = J + "%";
            if (N.reflection) {
                N.reflection.style.marginLeft = J + "%"
            }
            H.style.marginTop = F + "%";
            N.element.style.overflow = "hidden";
            return P
        } else {
            return {
                width: C,
                height: L
            }
        }
    },
    _setItemSize: (function() {
        if (ContentFlowGlobal.Browser.IE) {
            var A = function(E, C) {
                if (!this.conf.fixItemSize) {
                    E.content.style.height = C.height + "px"
                } else {
                    if (ContentFlowGlobal.Browser.IE6) {
                        var D = parseInt(E.content.style.height) / 100;
                        E.content.style.height = C.height * D + "px";
                        var B = parseInt(E.content.style.marginTop) / 100;
                        E.content.style.marginTop = C.height * B + "px"
                    }
                }
                if (E.reflection) {
                    var D = parseInt(E.content.style.height);
                    E.reflection.style.height = D * this.conf.reflectionHeight + "px";
                    E.reflection.style.marginTop = D * this.conf.reflectionGap + "px"
                }
                E.element.style.width = C.width + "px";
                E.element.style.height = C.height * (1 + this.conf.reflectionHeight + this.conf.reflectionGap) + "px"
            }
        } else {
            var A = function(C, B) {
                if (C.reflection) {
                    C.element.style.height = B.height * (1 + this.conf.reflectionHeight + this.conf.reflectionGap) + "px";
                    C.reflection.style.marginTop = B.height * this.conf.reflectionGap + "px"
                } else {
                    if (this._reflectionWithinImage) {
                        C.element.style.height = B.height * (1 + this.conf.reflectionHeight + this.conf.reflectionGap) + "px"
                    } else {
                        C.element.style.height = B.height + "px"
                    }
                }
                C.element.style.width = B.width + "px"
            }
        }
        return A
    })(),
    _setItemOpacity: (function() {
        if (ContentFlowGlobal.Browser.IE6) {
            var A = function(C) {
                if (C.content.origSrc && C.content.origSrc.match(/\.png$/)) {
                    var B = C.content.src;
                    C.content.src = C.content.origSrc;
                    C.content.style.filter = C.content.filterString + " progid:DXImageTransform.Microsoft.BasicImage(opacity=" + C.opacity + ")";
                    C.content.src = B
                } else {
                    C.content.style.filter = "progid:DXImageTransform.Microsoft.BasicImage(opacity=" + C.opacity + ")"
                }
                if (C.reflection) {
                    C.reflection.style.filter = C.reflection.filterString + "progid:DXImageTransform.Microsoft.BasicImage(opacity=" + C.opacity + ")"
                }
            }
        } else {
            if (ContentFlowGlobal.Browser.IE) {
                var A = function(B) {
                    B.element.style.filter = "progid:DXImageTransform.Microsoft.BasicImage(opacity=" + B.opacity + ")"
                }
            } else {
                var A = function(B) {
                    B.element.style.opacity = B.opacity
                }
            }
        }
        return A
    })()
};
if (!Function.bind) {
    Function.prototype.bind = function(A) {
        var B = this;
        return function() {
            return B.apply(A, arguments)
        }
    }
}
if (!Math.erf2) {
    Math.erf2 = function(A) {
        var B = -(8 * (Math.PI - 3) / (3 * Math.PI * (Math.PI - 4)));
        var C = A * A;
        var D = 1 - Math.pow(Math.E, -C * (4 / Math.PI + B * C) / (1 + B * C));
        return D
    }
}
if (!Math._2PI05) {
    Math._2PI05 = Math.sqrt(2 * Math.PI)
}
if (!Math.normDist) {
    Math.normDist = function(A, C, B) {
        if (!C) {
            var C = 1
        }
        if (!B) {
            var B = 0
        }
        if (!A) {
            var A = -B
        }
        return 1 / (C * Math._2PI05) * Math.pow(Math.E, -(A - B) * (A - B) / (2 * C * C))
    }
}
if (!Math.normedNormDist) {
    Math.normedNormDist = function(A, C, B) {
        return this.normDist(A, C, B) / this.normDist(B, C, B)
    }
}
if (!Math.exp) {
    Math.exp = function(A) {
        return Math.pow(Math.E, A)
    }
}
if (!Math.ln) {
    Math.ln = Math.log
}
if (!Math.log2) {
    Math.log2 = function(A) {
        return Math.log(A) / Math.LN2
    }
}
if (!Math.log10) {
    Math.log10 = function(A) {
        return Math.log(A) / Math.LN10
    }
}
if (!Math.logerithm) {
    Math.logerithm = function(B, A) {
        if (!A || A == Math.E) {
            return Math.log(B)
        } else {
            if (A == 2) {
                return Math.log2(B)
            } else {
                if (A == 10) {
                    return Math.log10(B)
                } else {
                    return Math.log(B) / Math.log(A)
                }
            }
        }
    }
}
if (!Event) {
    var Event = {}
}
if (!Event.stop) {
    Event.stop = function(A) {
        A.cancelBubble = true;
        if (A.preventDefault) {
            A.preventDefault()
        }
        if (A.stopPropagation) {
            A.stopPropagation()
        }
        return false
    }
}
if (document.all && !window.opera) {
    window.$CF = function(A) {
        if (typeof A == "string") {
            return window.$CF(document.getElementById(A))
        } else {
            if (CFElement.prototype.extend && A && !A.extend) {
                CFElement.prototype.extend(A)
            }
        }
        return A
    }
} else {
    window.$CF = function(A) {
        return A
    }
}
if (!window.HTMLElement) {
    CFElement = {};
    CFElement.prototype = {};
    CFElement.prototype.extend = function(A) {
        for (var B in this) {
            if (!A[B]) {
                A[B] = this[B]
            }
        }
    }
} else {
    CFElement = window.HTMLElement
}
if (!CFElement.findPos) {
    CFElement.prototype.findPos = function() {
        var B = this;
        var C = curtop = 0;
        try {
            if (B.offsetParent) {
                C = B.offsetLeft;
                curtop = B.offsetTop;
                while (B = B.offsetParent) {
                    C += B.offsetLeft;
                    curtop += B.offsetTop
                }
            }
        } catch (A) {}
        return {
            left: C,
            top: curtop
        }
    }
}
if (!CFElement.getDimensions) {
    CFElement.prototype.getDimensions = function() {
        return {
            width: this.clientWidth,
            height: this.clientHeight
        }
    }
}
if (!CFElement.hasClassName) {
    CFElement.prototype.hasClassName = function(A) {
        return (new RegExp("\\b" + A + "\\b").test(this.className))
    }
}
if (!CFElement.addClassName) {
    CFElement.prototype.addClassName = function(A) {
        if (!this.hasClassName(A)) {
            this.className += (this.className ? " " : "") + A
        }
    }
}
if (!CFElement.removeClassName) {
    CFElement.prototype.removeClassName = function(A) {
        this.className = this.className.replace(new RegExp("\\b" + A + "\\b"), "").replace(/\s\s/g, " ")
    }
}
if (!CFElement.toggleClassName) {
    CFElement.prototype.toggleClassName = function(A) {
        if (this.hasClassName(A)) {
            this.removeClassName(A)
        } else {
            this.addClassName(A)
        }
    }
}
if (!CFElement.getChildrenByClassName) {
    CFElement.prototype.getChildrenByClassName = function(C) {
        var B = new Array();
        for (var A = 0; A < this.childNodes.length; A++) {
            var D = this.childNodes[A];
            if (D.nodeType == 1 && $CF(D).hasClassName(C)) {
                B.push(D)
            }
        }
        return B
    }
}
if (!CFElement.addEvent) {
    CFElement.prototype.addEvent = function(B, C, A) {
        if (this.addEventListener) {
            this.addEventListener(B, C, A)
        } else {
            this.attachEvent("on" + B, C)
        }
    }
}
if (!CFElement.removeEvent) {
    CFElement.prototype.removeEvent = function(B, C, A) {
        if (this.removeEventListener) {
            this.removeEventListener(B, C, A)
        } else {
            this.detachEvent("on" + B, C)
        }
    }
}
if (!window.addEvent) {
    window.addEvent = function(B, C, A) {
        if (this.addEventListener) {
            this.addEventListener(B, C, A)
        } else {
            if (B != "load" && B != "resize") {
                document.attachEvent("on" + B, C)
            } else {
                this.attachEvent("on" + B, C)
            }
        }
    }
}
if (!window.removeEvent) {
    window.removeEvent = function(B, C, A) {
        if (this.removeEventListener) {
            this.removeEventListener(B, C, A)
        } else {
            if (B != "load" && B != "resize") {
                document.detachEvent("on" + B, C)
            } else {
                this.detachEvent("on" + B, C)
            }
        }
    }
}
ContentFlowGlobal.init();