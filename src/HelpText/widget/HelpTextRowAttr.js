/*global logger,mxui,HelpText*/
define([
    "dojo/_base/declare",

    "mxui/dom",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",

    "HelpText/widget/HelpTextRow"
], function (declare, dom, domStyle, domConstruct, dojoArray, lang, HelpTextRowBase) {
    "use strict";

    return declare("HelpText.widget.HelpTextRowAttr", [ HelpTextRowBase ], {
        addons      : [],

        inputargs: {
            name : "",
            startvisible : false,
            text : "",
            height : 300,
            hideonclick : false
        },

        text : "",

        _setValueAttr : function(value) {
            this.text = dom.escapeString(value).replace(/\n/g, "<br/>");
            dojo.html.set(this.domNode, this.text);
        }
    });

});

require(["HelpText/widget/HelpTextRowAttr"]);
