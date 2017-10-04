const __respT = {
    error: true,
    message: "",
    data: {}
};

module.exports = {
    presentResponse: function(res, tipe, data, message) {
        const resp = __respT;
        resp.error = false;
        resp.message =  message;
        var respData =  null; 
        if(Array.isArray(data.models)) {
            respData = data.map(function(item){
                return {
                    tipe: tipe,
                    attributes: item
                }
            });
            resp.data = respData; 
        } else {
            resp.data = {
                tipe: tipe,
                attributes: data
            };
        }
        res.json(resp);
    },
    presentError: function(res, data, message) {
        const resp = __respT;
        resp.error = true;
        resp.message =  message;
        resp.data = data;
        res.json(resp);
    }

}