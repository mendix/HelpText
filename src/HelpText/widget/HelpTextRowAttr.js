/*global HelpText*/
dojo.provide("HelpText.widget.HelpTextRowAttr");
dojo.require("HelpText.widget.HelpTextRow");

mendix.widget.declare("HelpText.widget.HelpTextRowAttr", {
    superclass  : HelpText.widget.HelpTextRow,
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
        this.text = mendix.dom.escapeHTML(value).replace(/\n/g, "<br/>");
        dojo.html.set(this.domNode, this.text);
    }

});
