const url = require('url');

const ParseUrlUtil = {
    parseUrl: function(paramUrl){
         // Parse the url
        var parsedUrl = url.parse(paramUrl, true);
        // Get the path
        var path = parsedUrl.pathname;
        var trimmedPath = path.replace(/^\/+|\/+$/g, '');
        return trimmedPath;
    },
    getQueryObjectFromUrl: function(paramUrl){
        var parsedUrl = url.parse(paramUrl, true);
        return parsedUrl.query;
    }
}

module.exports = ParseUrlUtil;