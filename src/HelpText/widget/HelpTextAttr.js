/*global logger,mxui,HelpText*/
define([
    "dojo/_base/declare",

    "mxui/dom",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/html",

    "HelpText/widget/HelpText"
], function (declare, dom, domStyle, domConstruct, dojoArray, lang, html, HelpTextBase) {
    "use strict";

    return declare("HelpText.widget.HelpTextAttr", [ HelpTextBase ], {
        superclass  : HelpText.widget.HelpText,
        addons      : [],

        inputargs: {
            name : "",
            startvisible : false,
            showonhover : true,
            width : 300,
            height : 300,
            closeClick : false,
            position : "popup"
        },

        text : "",

        _setValueAttr : function(value) {
            if (value === null || typeof value === "undefined") {
                this.text = "";
            } else {
                this.text = this.renderHTML ? value : dom.escapeString(value).replace(/\n/g, "<br/>");
            }

            if (this.helpNode) {
                html.set(this.helpNode, this.text);
            }
        }
    });

});

require(["HelpText/widget/HelpTextAttr"]);
