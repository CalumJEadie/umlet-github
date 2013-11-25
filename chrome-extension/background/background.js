chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        switch(request.directive) {

            case ug.DIRECTIVES.convertUXFToSVG:

                $.ajax({
                    type: "POST",
                    url: ug.API_URLS.convertUXFToSVG,
                    data: { diagramUXF: request.diagramUXF },
                    success: function (data, textStatus, jqXHR) {
                        // Strip leading <xml> and <!DOCTYPE> tags, the first
                        // three lines.
                        diagramSVG = data.split("\n")
                        diagramSVG.splice(0,3)
                        diagramSVG = diagramSVG.join("\n")

                        console.log(diagramSVG)

                        sendResponse({
                            diagramSVG: diagramSVG
                        })
                    },
                    dataType: "html"
                })
                // Send response aschronously, so keep channel open to the
                // other end.
                // See http://developer.chrome.com/extensions/runtime.html#event-onMessage.
                return true;

            default:
                console.log("No directive matching "+request.directive)
                console.log(request);
                return false;

        }

    }
);