

module.exports = AddNewCartRequest;

function AddNewCartRequest(request)
{
    this.orderID = request.orderID;
    this.menu = {
        id: request.menuId ? request.menuId : '',
        name: request.menuName ? request.menuName : '',
        price: request.menuPrice ? request.menuPrice: '',
        image: request.menuImage ? request.menuImage: '',
        quantity: request.quantity ? request.quantity : 1
    };
    this.user = {
        id: request.userId ? request.userId : '',
        email: request.email
    };
}