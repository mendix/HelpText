/*global logger*/
define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",

    "mxui/dom",
    "dojo/dom-style",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/html"

], function (declare, _WidgetBase, dom, domStyle, domClass, domConstruct, dojoArray, lang, html) {
    "use strict";

    return declare("HelpText.widget.HelpTextTrigger", [_WidgetBase], {

        iconstyle: "classic",

        //IMPLEMENTATION
        domNode: null,
        imgNode: null,
        txtNode: null,
        topic : "CustomWidget/HelpText",
        state : false, //current state

        postCreate : function(){
            logger.debug(this.id + ".postCreate");

            //houskeeping
            this.imgNode = dom.create("div", {
                "class" : this.iconstyle === "classic" ? "HelpTextTrigger" : "HelpTextTriggerBootstrap glyphicon glyphicon-question-sign"
            });
            this.domNode.appendChild(this.imgNode);

            this.txtNode = dom.create("label", {
                "class" : "HelpTextTriggerLabel"
            }, this.txton);
            this.domNode.appendChild(this.txtNode);

            this.connect(this.imgNode, "onclick", this.toggle);
            this.connect(this.txtNode, "onclick", this.toggle);
        },

        toggle : function() {
            this.state = !this.state;

            var imgBaseName = this.iconstyle === "classic" ? "HelpTextTrigger" : "HelpTextTriggerBootstrap";
            domClass.add(this.imgNode, this.state ? imgBaseName + "Down" : imgBaseName);
            domClass.remove(this.imgNode, this.state ? imgBaseName : imgBaseName + "Down");

            html.set(this.txtNode, this.state === true ? this.txtoff : this.txton);
            dojo.publish(this.topic, [ this.state ]);
        },

        uninitialize : function() {
            logger.debug(this.id + ".uninitialize");
        }
    });

});

require(["HelpText/widget/HelpTextTrigger"]);
