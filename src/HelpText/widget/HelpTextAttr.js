/*global logger,mxui,HelpText*/
define([
    "dojo/_base/declare",

    "mxui/dom",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",

    "HelpText/widget/HelpText"
], function (declare, dom, domStyle, domConstruct, dojoArray, lang, HelpTextBase) {
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
            this.text = dom.escapeString(value).replace(/\n/g, "<br/>");
            if (this.helpNode) {
                dojo.html.set(this.helpNode, this.text);
            }
        }
    });

});

require(["HelpText/widget/HelpTextAttr"]);
