/*global logger,mxui*/

define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",

    "mxui/dom",
    "dojo/dom-style",
    "dojo/dom-geometry",
    "dojo/_base/array",
    "dojo/_base/lang"

], function (declare, _WidgetBase, dom, domStyle, domGeometry, dojoArray, lang) {
    "use strict";

    return declare("HelpText.widget.HelpText", [_WidgetBase], {

        // Set by modeler
        text : "",
        startvisible : false,
        showonhover : true,
        width : 300,
        height : 300,
        closeClick : false,
        position : "popup",
        iconstyle: "classic",


        //IMPLEMENTATION
        domNode: null,
        topic : "CustomWidget/HelpText",
        imgNode : null,
        handle : null,
        helpNode : null,
        helpvisible: false,
        windowEvt : null,

        postCreate : function(){
            //logger.level(logger.DEBUG);
            logger.debug(this.id + ".postCreate");

            this.imgNode = dom.create("div", {
                "class" : this.iconstyle === "classic" ? "HelpTextButton" : "HelpTextButtonBootstrap glyphicon glyphicon-question-sign"
            });

            this.domNode.appendChild(this.imgNode);
            this.connect(this.imgNode, "onclick", dojo.hitch(this, this.toggleHelp, true));
            if (this.showonhover) {
                this.connect(this.imgNode, "onmouseenter", dojo.hitch(this, this.showHelp, true, false));
                this.connect(this.imgNode, "onmouseleave", dojo.hitch(this, this.showHelp, false, false));
            }

            //help node
            this.createHelp();

            this.stateChange(this.startvisible);
            this.handle = dojo.subscribe(this.topic, this, this.stateChange);

            this.actLoaded();
        },

        stateChange : function(newstate) {
            logger.debug(this.id + ".stateChange");
            if (newstate) {
                domStyle.set(this.imgNode, "display", "block");
            } else if (!this.startvisible) {
                this.helpvisible = false;
                domStyle.set(this.imgNode, "display", "none");
                this.showHelp(false);
            }
        },

        createHelp : function () {
            logger.debug(this.id + ".createHelp");
            this.helpNode = dom.create("div", {"class" : "HelpTextBox"});
            var input = this.text.replace(/\n/g, "<br />");
            dojo.html.set(this.helpNode, input);
            domStyle.set(this.helpNode, {
                "width" : this.width + "px",
                "maxHeight" : this.height + "px"
            });
            this.connect(this.helpNode, "onclick", dojo.hitch(this, this.toggleHelp, true));
            //document.body.appendChild(this.helpNode);
            if (this.position === "popup") {
                dojo.body().appendChild(this.helpNode);
            } else {
                this.domNode.appendChild(this.helpNode);
                domStyle.set(this.domNode, "position", "relative");
            }
        },

        toggleHelp : function(clicked, e) {
            logger.debug(this.id + ".toggleHelp");
            this.helpvisible = !this.helpvisible;
            this.showHelp(this.helpvisible, clicked);
            if (e) {
                dojo.stopEvent(e);
            }
        },

        windowClick : function () {
            logger.debug(this.id + ".windowClick");
            this.disconnect(this.windowEvt);
            this.windowEvt = null;
            this.toggleHelp(true);
        },

        showHelp : function(show, clicked) {
            logger.debug(this.id + ".showHelp");
            if (show || this.helpvisible) {
                if (this.closeClick && clicked) {
                    this.windowEvt = this.connect(document.body, "onclick", this.windowClick);
                }

                if (this.position === "popup") {
                    var coords = domGeometry.position(this.domNode, true);
                    domStyle.set(this.helpNode, {
                        "display" : "block",
                        "top" : (coords.y + 30)+"px",
                        "left": (window.innerWidth < coords.x + 30 + this.width ? coords.x - this.height - 30 : coords.x + 30)+"px"
                    });
                } else {
                    domStyle.set(this.helpNode, {
                        "display" : "block",
                        "top" : "30px",
                        "left": this.position === "right" ? "30px" : (-30 - this.width) + "px"
                    });
                }
            } else {
                domStyle.set(this.helpNode, "display", "none");
            }
        },

        suspended : function() {
            logger.debug(this.id + ".suspended");
            if (this.windowEvt !== null) {
                this.disconnect(this.windowEvt);
                this.windowEvt = null;
            }
            this.showHelp(false);
        },

        uninitialize : function() {
            logger.debug(this.id + ".uninitialize");
            try {
                if (this.windowEvt !== null) {
                    this.disconnect(this.windowEvt);
                    this.windowEvt = null;
                    logger.debug(this.id + ".uninitialize");
                }
                if (this.helpNode !== null) {
                    document.body.removeChild(this.helpNode);
                }
                if (this.handle !== null) {
                    dojo.unsubscribe(this.handle);
                }
            }
            catch(e) {
                logger.warn("error on helptextviewer unload: " + e);
            }
        }
    });

});

require(["HelpText/widget/HelpText"]);
