function xmlToJson(xml) {
    var obj = {}
    
    if (!xml) return '';

    if (xml.nodeType === 3) {
        obj = xml.nodeValue
    }

    if (xml.hasChildNodes()) {
        for (var i = 0, len = xml.childNodes.length; i < len; i++) {
            var item = xml.childNodes.item(i)
            var nodeName = item.nodeName.toLowerCase()

            if (/^#/.test(nodeName) && item.nodeType === 3) {
                return item.nodeValue

           	// handle array
            } else if (typeof obj[nodeName] !== 'undefined') {
                var _temp = obj[nodeName] 
                if (Object.prototype.toString.call(_temp) === '[object Array]') {
                    obj[nodeName].push(xmlToJson(item))
                } else {
                    obj[nodeName] = []
                    obj[nodeName].push(_temp)
                    obj[nodeName].push(xmlToJson(item))
                }
            } else {
                obj[nodeName] = xmlToJson(item)
            }
        }
    }
    return obj
}

if (typeof module != "undefined" && module !== null && module.exports) {
	module.exports = xmlToJson
} else if (typeof define === "function" && define.amd) {
	define(function() {return xmlToJson})
} else {
	self.xmlToJson = xmlToJson
}