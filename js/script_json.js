// https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest
		// Lectura sincronica de datos
		
function loadJSONData(url, handler){
	var http_request = new XMLHttpRequest(); //ajax
	http_request.open("GET", url, false);
	try{
	  http_request.send();
	}catch(e){
		  return handler(e);
	}
	return JSON.parse(http_request.responseText);
}
