
const guideMessages = [
    'Hello my name is thang Cao',
    'Welcome to my assigment',
    'Please connect to my facebook ThangHand',
    'Please contact to me via gmail: caohoangthang93@gmail.com'
]
const GuideRepository = {
    getAllMessages : function(){
        return guideMessages;
    },

    getMessage : function(index){
        return guideMessages[index];
    }
};
module.exports = GuideRepository;