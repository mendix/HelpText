/*global logger,mxui,Exception*/

define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",

    "mxui/dom",
    "dojo/dom-style",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/html",
    "dojo/dom-geometry"

], function (declare, _WidgetBase, dom, domStyle, dojoClass, domConstruct, dojoArray, lang, html, domGeom) {
    "use strict";

    return declare("HelpText.widget.HelpTextRow", [_WidgetBase], {

        // Set in Modeler
        text : "",
        startvisible : false,
        height : 300,
        hideonclick : false,
        onclickmf : "",

        //IMPLEMENTATION
        domNode: null,
        topic : "CustomWidget/HelpText",
        handle : null,
        rowNode : null,
        targetHeight : 0,
        anim : null,
        _contextObj : null,

        postCreate : function(){
            logger.debug(this.id + ".postCreate");

            dojoClass.add(this.domNode, "HelpTextRow");
            this.createHelp();
            this.rowNode = this.findRowNode(this.domNode);
            domStyle.set(this.domNode, "maxHeight", this.height + "px");
            domStyle.set(this.rowNode, "height", "auto"); //follow the animation

            this.addOnLoad(lang.hitch(this, this.poststartup));
        },

        update : function (obj, callback) {
            this._contextObj = obj;
            if (callback) {
                callback();
            }
        },

        poststartup : function() {
            if (!this.startvisible) {
                domStyle.set(this.rowNode, "display", "none");
            }

            this.stateChange(this.startvisible);
            this.handle = dojo.subscribe(this.topic, this, this.stateChange);
        },

        findRowNode : function(parent) {
            var tag = parent.tagName.toLowerCase();
            if (tag === "tr" || tag === "th") {
                return parent;
            } else if (parent.parentNode !== null) {
                return this.findRowNode(parent.parentNode);
            }
            throw new Exception(this.id + " Did not found a parent row to show or hide");
        },

        updateHeight : function(height) {
            domStyle.set(this.domNode, "height", "height");
            if (height === 0) {
                domStyle.set(this.rowNode, "display", "none");
            }
        },

        stateChange : function(newstate) {
            if (newstate) {
                var boxorig = domGeom.getMarginBox(this.domNode);
                domStyle.set(this.rowNode, { "display" : "" });
                domStyle.set(this.domNode, { "height" : "auto" });
                var box = domGeom.getMarginBox(this.domNode);

                if (boxorig.h === 0) { //restart animation
                    domStyle.set(this.domNode,  { "height" : "0px"});
                }
                if (box.h > 0) {
                    this.updateHeight(Math.min(this.height, box.h));
                } else {
                    domStyle.set(this.domNode,  "height", "auto");
                }
            } else {
                this.updateHeight(0);
            }
        },

        createHelp : function () {
            html.set(this.domNode, this.text);
            if (this.hideonclick === true) {
                this.connect(this.domNode, "onclick", this.hideHelp);
            } else if (this.onclickmf !== "") {
                this.connect(this.domNode, "onclick", this.executeMF);
            }
        },

        executeMF : function () {
            mx.data.action({
                store: {
                   caller: this.mxform
                },
                params: {
                    actionname  : this.onclickmf,
                    applyto     : "selection",
                    guids       : [this._contextObj.getGuid()]
                },
                callback: function () {},
                error: function () {
                    logger.error(this.id + " error: XAS error executing microflow");
                }
            });
        },

        hideHelp : function() {
            this.startvisible = false;
            this.stateChange(false);
        },

        uninitialize : function() {
            dojo.unsubscribe(this.handle);
        }
    });

});

require(["HelpText/widget/HelpTextRow"]);
