var doc=App.ActiveDoc;
var text = doc.Text;
var html_content = marked(text);

var fso = new ActiveXObject("Scripting.FileSystemObject")
var temp_folder=fso.GetSpecialFolder(2);//temp folder
var file_name=fso.GetBaseName( doc.PathName );

var file_current_path = "";

var preview = temp_folder + "\\preview.html";//preview current buffer in temp folder

if( file_name.length == 0 ) {
    file_name="Markdown Preview";
}
    
var file = new ActiveXObject("Adodb.Stream");
    file.Type = 2;
    file.Open();
    file.Charset = "utf-8";

var header="\
<!doctype html>\n\
<html>\n\
<head>\n\
<title>"+file_name+"</title>\n\
<meta charset='UTF-8' />\n\
<meta name='generator' content='EverEdit' />\n\
<style type='text/css' media='screen'>\n" + github2_css + "\n" + prettify_css + "\n\
</style>\n\
<script type='text/javascript'>\n" + prettify_js + "\n\
</script>\n\
</head>\n\
<body>\n";


var footer="\n\
<script type='text/javascript'>\n\
document.onreadystatechange = initPrettify;\n\
function initPrettify() {\n\
    if(document.readyState == 'complete') {\n\
        var codeNodes = document.getElementsByTagName('code');\n\
        var cdeNod = null;\n\
        for (var i = 0; i < codeNodes.length; i++) {\n\
            cdeNod = codeNodes[i];\n\
            var codeParent = cdeNod.parentNode;\n\
            var codeParentClass = codeParent.className;\n\
            if (/ prettyprint linenums$/.test(codeParentClass)) {\n\
                continue;\n\
            }\n\
            codeParent.className = codeParentClass + ' prettyprint linenums';\n\
        }\n\
        prettyPrint();\n\
        for (var i = 0; i < codeNodes.length; i++) {\n\
            cdeNod = codeNodes[i];\n\
            if (cdeNod.innerHTML === '') {\n\
                cdeNod.innerHTML = ' ';\n\
            }\n\
        }\n\
    }\n\
}\n\
</script>\n\
</body>\n\
</html>";