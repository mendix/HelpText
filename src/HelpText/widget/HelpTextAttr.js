dojo.provide("HelpText.widget.HelpTextAttr");
dojo.require("HelpText.widget.HelpText")

mendix.widget.declare('HelpText.widget.HelpTextAttr', {
	superclass  : HelpText.widget.HelpText,
    addons      : [],
	
	inputargs: {
		name : '',
		startvisible : false,
		showonhover : true,
		width : 300,
		height : 300,
		closeClick : false,
        position : 'popup'
	},
	
    text : '',
    
    _setValueAttr : function(value) {
        this.text = mendix.dom.escapeHTML(value).replace(/\n/g,"<br/>");;
		if (this.helpNode)
            dojo.html.set(this.helpNode, this.text);
	}
    
});