
app.controller("checkoutController", ['$scope', '$http', '$state','Notification', function ($scope, $http, $state,Notification) {
    $scope.openStatus = false;
    $scope.paymentMethod = "";
    $scope.total = 0.00;
    $scope.numItems = 0;
    $scope.updateStatus = {};
    $scope.cardAdded = false;
    $scope.status.open = false;
    $scope.card = {};
    $scope.addressLength = 0;

    $scope.initialize = function () {
        $scope.cartItems = JSON.parse(window.sessionStorage.cart);
        $scope.numItems = $scope.cartItems.length;
        angular.forEach($scope.cartItems, function (value, key) {
            $scope.updateStatus[key] = false;
            $scope.total += parseFloat(value.price)* value.selectedQuantity;
        });

        $http.get("/user/info")
            .success(function (data) {
                debugger
                if (data.result === "noinfo") {
                    $scope.address = {};
                    $scope.addressLength = 0;
                } else {
                    if(data.user.card){
                        $scope.card = data.user.card;
                    }else{
                        $scope.card = {};
                    }
                    
                    if(data.user.address){
                        $scope.address = data.user.address;
                        $scope.addressLength = 1;
                    }else{
                        $scope.address={};
                        $scope.addressLength = 0;
                    }
                    
                    $scope.user = data.user;
                }
            })
            .error(function (err) {

            });
    }
    $scope.selectPayment = function () {
        console.log($scope.paymentMethod);
        if($scope.paymentMethod==="card"){
            $scope.status.open = true;
        }else{
            $scope.status.open = false;
        }
    }

    $scope.cancel = function () {
        $scope.paymentMethod = "";
        $scope.status.open = false;
    }
    $scope.addNewAddress = function () {
        $scope.newAddress = true;
    }
    $scope.cancelAddress = function () {
        $scope.newAddress = false;
    }
    $scope.quantityChange = function (index) {
        debugger
        if (!$scope.updateStatus[index]) {
            $scope.updateStatus[index] = true;
        }
        console.log(index);
    }
    $scope.updateQuantity = function (index) {
        debugger
        if (parseInt(this.quantity) > this.item.quantity || this.quantity === "") {
            Notification.error("Please enter a valid quantity.");
        } else {
            if (this.item.selectedQuantity > this.quantity) {
                var total = $scope.total - this.item.price * (this.item.selectedQuantity - this.quantity);
            } else {
                var total = $scope.total + this.item.price * (this.quantity - this.item.selectedQuantity);
            }
            this.item.selectedQuantity = this.quantity
            $http.post("/ebayCart/updateCart", $scope.cartItems)
                .success(function (data) {
                    if (data.status !== "success") {
                        alert("Error in update the quantity. Please try again.");
                    } else {
                        $scope.total = total;
                        Notification.success("Quantity successfully updated.");
                        window.sessionStorage.cart = JSON.stringify($scope.cartItems);
                        $scope.updateStatus[index] = false;
                    }

                })
                .error(function (err) {

                })
        }
    }

    $scope.removeItem = function (index) {
        debugger
        $scope.total = $scope.total - parseFloat($scope.cartItems[index].price);
        $scope.cartItems.splice(index, 1);
        window.sessionStorage.cart = JSON.stringify($scope.cartItems);
        $scope.numItems = $scope.cartItems.length;
        $scope.$parent.$parent.numCartItems = $scope.cartItems.length;
        $http.post("/ebayCart/updateCart", $scope.cartItems)
            .success(function (data) {
                if (data.status === "success") {

                }

            })
            .error(function (err) {

            })
    }

    $scope.saveAddress = function () {
        console.log($scope.address);
        $scope.addressLength = 1;
        $scope.newAddress = false;
        $http.post("/user/addAddress", $scope.address)
            .success(function (data) {
                if (data.status === "success") {
                    Notification.success("Successfully saved the address");
                } else if (data.error) {
                    alert(err);
                }
            })
            .error(function (err) {

            })
    };

    $scope.addCard = function () {
        console.log($scope.card);
        $http.post("/user/addCard",$scope.card)
        .success(function(data){
            if(data.error){
                Notification.error(data.error);
            }else if(data.status){
                 Notification.success("Card Added Successfully");
                 $scope.cardAdded = true;
                 $scope.status.open = false;
            }
        })
        .error(function(err){

        })   
    };

    $scope.checkout = function () {
        $scope.checkoutData = {};
        $scope.checkoutData.items = $scope.cartItems;
        $http.post("/checkout", $scope.checkoutData)
        .success(function (data) {
            debugger
            if (data.status) {
                delete window.sessionStorage.cart;
                Notification.success("Your order has been Successfully placed.");
                // alert("Your order has been Successfully placed.")
                // $state.go("/");
            }
            else if (data.error) {
                alert(data.error);
                return;
            }
        })
        .error(function (err) {

        })
    };

}]);