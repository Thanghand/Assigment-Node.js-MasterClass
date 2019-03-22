
module.exports = LogoutRequest;

function LogoutRequest(request) {
    this.email = request.email;
    this.token = request.token;
}

