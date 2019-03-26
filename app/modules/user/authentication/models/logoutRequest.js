
module.exports = LogoutRequest;

function LogoutRequest(request) {
    this.id = request.id;
    this.token = request.token;
}

