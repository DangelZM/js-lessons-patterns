(function() {
    var proxied = console.log;
    console.log = function(message) {
        $('#consoleDisplay').html($('#consoleDisplay').html() + message + '<br>');
        return proxied.apply(this, arguments);
    };
})();

var codeViewer = (function(document){
    this.getCode = function(elemId, fileLocation){
        var txt = '';
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
                txt = xmlhttp.responseText;
                $('#' + elemId).html(txt);
                SyntaxHighlighter.all();
            }
        };
        xmlhttp.open("GET", fileLocation, true);
        xmlhttp.send();
    };
    
    return this;
})(document);
