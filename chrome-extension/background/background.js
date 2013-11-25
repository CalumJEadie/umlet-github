console.log("background.js loaded.")

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {

        console.log(request)

        switch(request.directive) {

            case ug.DIRECTIVES.convertUXFToSVG:
                $.ajax({
                    type: "POST",
                    url: ug.API_URLS.convertUXFToSVG,
                    data: { diagramUXF: request.diagramUXF },
                    success: function( data ) {
                        console.log(data)
                        sendResponse( data )
                    },
                    dataType: "html"
                })
                break;

            default:
                console.log(request);
                break;

        }

    }
);