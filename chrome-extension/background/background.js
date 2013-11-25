console.log("background.js loaded.")

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        console.log(request)

        switch(request.directive) {

            case ug.DIRECTIVES.convertUXFToSVG:
                // $.ajax({
                //     type: "POST",
                //     url: ug.API_URLS.convertUXFToSVG,
                //     data: { diagramUXF: request.diagramUXF },
                //     success: function( data ) {
                //         console.log(data)
                //         console.log(sendResponse)
                //         console.log( sendResponse( data ) )
                //     },
                //     dataType: "html"
                // })

                xhr = new XMLHttpRequest();

                method = "POST";
                url = ug.API_URLS.convertUXFToSVG;
                payload = "diagramUXF=" + JSON.stringify(request.diagramUXF)

                xhr.open(method, url, true);

                xhr.onreadystatechange = function() {
                    if (xhr.readyState != 4) {
                        console.log(xhr)
                    }else{
                        sendResponse(xhr.responseText)
                    }
                }

                xhr.setRequestHeader("Content-Type", "text/html");

                xhr.send(payload);

                break;

            default:
                console.log(request);
                break;

        }

    }
);