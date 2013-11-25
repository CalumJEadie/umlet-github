/*
 * Modify GitHub pages with display UXF files.
 * e.g. https://github.com/CalumJEadie/umlet-github/blob/master/overview.uxf
*/

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
    + '</div>';

    $(ug.FILE_VIEW).replaceWith(newHTML);

}

$(function() {

    // Get UXF
    diagramUXF = ug.getUXF();

    // Use web service to convert UXF into SVG.
    // Replace XML/UXF code display with SVG display.
    chrome.runtime.sendMessage({
            directive: "convertUXFToSVG",
            diagramUXF: diagramUXF
        },
        function (response) {
            console.log(response)
            ug.replaceXMLViewWithSVG(response);
        }
    )

});