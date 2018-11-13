const objectUtil = {
    isEmpty: function(object) {
        return Object.keys(object).length === 0;
    },
    isJsonValid: function(jsonObject){
        try {
            JSON.parse(jsonObject);
            return true;
        } catch (error) {
            return false;
        }
    }
};

module.exports = objectUtil;