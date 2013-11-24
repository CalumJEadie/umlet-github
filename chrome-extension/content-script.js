console.log("console-script.js started");

ug = {};

ug.FILE_VIEW = "#files .file .blob-wrapper"
ug.UXF_LINE = "#files .line";

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

ug.replaceXMLViewWithImage = function() {

    // Use HTML that GitHub uses to display an image.
    // e.g. On https://github.com/CalumJEadie/umlet-github/blob/master/overview.png
    imgHTML = '<div class="blob-wrapper data type-text js-blob-data">'
    + '<div class="image js-image">'
    + '<span class="border-wrap">'
    + '<img src="" alt="Loading...">'
    + '</span>'
    + '</div>'
    + '</div>'
    $(ug.FILE_VIEW).replaceWith(imgHTML)

}

ug.getImageURL = function(callback) {
    uxf = ug.getUXF()

    // Do Ajax Request
    imageURL = "http://www.calumjeadie.com/"

    callback(imageURL)
}

ug.updateImageURL = function(imageURL) {
    $(ug.FILE_VIEW).find("img").attr("src", imageURL)
}

ug.replaceXMLViewWithImage()

ug.getImageURL(ug.updateImageURL)