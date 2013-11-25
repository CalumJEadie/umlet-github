console.log("global.js loaded.")

ug = {};

ug.FILE_VIEW = "#files .file .blob-wrapper"
ug.UXF_LINE = "#files .line";
ug.API_URL = "http://localhost:5000"

ug.API_URLS = {
    convertUXFToSVG: ug.API_URL + "/convert/uxf/svg/"
}

ug.DIRECTIVES = {
    convertUXFToSVG: "convertUXFToSVG"   
}