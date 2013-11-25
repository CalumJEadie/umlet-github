console.log("console-script.js started");

ug = {};

ug.FILE_VIEW = "#files .file .blob-wrapper"
ug.UXF_LINE = "#files .line";
ug.API_ROOT = "http://localhost:5000/"

ug.getUXF = function() {
    lines = $(ug.UXF_LINE).map(function(i, el) {
        return $(el).text();
    });
    uxf = "";
    for (var i=0; i<lines.length; i++) {
        uxf += lines[i] + "\n";
    }
    return uxf;
}

ug.replaceXMLViewWithSVG = function(diagramSVG) {

    // Use HTML that GitHub uses to display an image.
    // e.g. On https://github.com/CalumJEadie/umlet-github/blob/master/overview.png
    // Where an <img> tag is used on GitHub normally,
    // place SVG.

    newHTML = '<div class="blob-wrapper data type-text js-blob-data">'
    + '<div class="image js-image">'
    + '<span class="border-wrap">'
    + diagramSVG
    + '</span>'
    + '</div>'
    + '</div>'

    $(ug.FILE_VIEW).replaceWith(newHTML)

}


ug.main = function() {
    diagramUXF = ug.getUXF()

    $.ajax({
        type: "POST",
        url: ug.API_ROOT+"convert/uxf/svg/",
        data: { diagramUXF: diagramUXF },
        success: function( data ) {
            ug.replaceXMLViewWithSVG(data)
        },
        dataType: "html"
    })
}

ug.main();