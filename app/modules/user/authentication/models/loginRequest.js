
module.exports = LoginRequest;

function LoginRequest(request) {
    this.email = request.email;
    this.password = request.password;
}

