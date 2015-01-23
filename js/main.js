(function() {
    var proxied = console.log;
    console.log = function(message) {
        $('#consoleDisplay').html($('#consoleDisplay').html() + message + '<br>');
        return proxied.apply(this, arguments);
    };
})();

var codeViewer = (function(document){
    this.getCode = function(elemId, fileLocation, type){
        var txt = '';
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
                txt = xmlhttp.responseText;
                if(type === 'html'){
                    $('#' + elemId).text(txt);
                } else {
                    $('#' + elemId).html(txt);
                }

                SyntaxHighlighter.all();
            }
        };
        xmlhttp.open("GET", fileLocation, true);
        xmlhttp.send();
    };
    
    return this;
})(document);
