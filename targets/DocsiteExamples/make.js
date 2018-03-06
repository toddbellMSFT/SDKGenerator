var path = require("path");

// Making resharper less noisy - These are defined in Generate.js
if (typeof (templatizeTree) === "undefined") templatizeTree = function () { };
if (typeof (getCompiledTemplate) === "undefined") getCompiledTemplate = function () { };

exports.putInRoot = true;

exports.makeCombinedAPI = function (apis, sourceDir, apiOutputDir) {
    // Builds every api.  The provided "apis" variable is a list of objects, built from: API_SPECS/admin.api.json, API_SPECS/matchmaker.api.json, API_SPECS/server.api.json, and API_SPECS/client.api.json

    console.log("Generating api examples from: " + sourceDir + " to: " + apiOutputDir);

    var unityConstructorTemplate = getCompiledTemplate(path.resolve(sourceDir, "templates/unityConstructorTemplate.ejs"));
    var unityExampleListTemplate = getCompiledTemplate(path.resolve(sourceDir, "templates/unityExampleListTemplate.ejs"));

    for (var a = 0; a < apis.length; a++) {
        var api = apis[a];
        var locals = {
            api: api,
            findProp: findProp,
            unityConstructorTemplate: unityConstructorTemplate
        };
        writeFile(path.resolve(apiOutputDir, "unityExampleList_" + api.name + ".cs"), unityExampleListTemplate(locals));
    }
}

function findProp(properties, propertyName) {
    for (var p = 0; p < properties.length; p++)
        if (properties[p].name === propertyName)
            return properties[p];
    throw "Could not find property: " + propertyName;
}
