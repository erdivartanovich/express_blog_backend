const { isEmpty } = require('../helpers/collections');

const JSONRequestValidator =  function(req, res, next) {
    req.valid = true;
    req.notValidTypes = [];
    if(['POST', 'PATCH'].includes(req.method)) {
        if(!req.is('application/json')) {
            req.valid = false;
            req.notValidTypes.push("CONTENT_TYPE_NOT_JSON")
        } 
        if(isEmpty(req.body)) {
            req.notValidTypes.push("EMPTY_PAYLOAD");
        }
    } 
    next();
}
module.exports = JSONRequestValidator;