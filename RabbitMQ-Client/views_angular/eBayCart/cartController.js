app.controller("cartController", ['$scope', '$http', '$state', 'Notification', function ($scope, $http, $state, Notification) {
    $scope.total = 0.00;
    $scope.numItems = 0;
    $scope.updateStatus = {};
    $scope.getCart = function () {
        $http.get("/ebayCart")
            .success(function (data) {
                if (data.status !== "noitem") {
                    $scope.cartItems = data;
                    $scope.numItems = data.length;
                    angular.forEach($scope.cartItems, function (value, key) {
                        $scope.updateStatus[key] = false;
                        $scope.total += parseFloat(value.price) * value.selectedQuantity;
                    })
                    $scope.$parent.$parent.numCartItems = data.length;
                }
            })
            .error(function (err) {

            })
    }

    $scope.removeItem = function (index) {
        debugger
        $scope.total = $scope.total - parseFloat(this.item.price * this.item.selectedQuantity);
        $scope.cartItems.splice(index, 1);
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

    $scope.checkout = function () {
        debugger
        console.log($scope.cartItems);
        $http.get('/login/status').
            success(function (data, status, headers, config) {
                if (data.user) {
                    window.sessionStorage.cart = JSON.stringify($scope.cartItems);
                    $state.go("checkout");
                } else {
                    alert("Please login before checkout.");
                    $state.go("SignIn");
                }
            }).
            error(function (data, status, headers, config) {

            });
    }

    $scope.quantityChange = function (index) {
        debugger
        if (!$scope.updateStatus[index]) {
            $scope.updateStatus[index] = true;
        }
        console.log(index);
    }
    $scope.update = function (index) {
        debugger
        if (parseInt(this.quantity) > this.item.quantity || this.quantity === "") {
            Notification.error("Please enter a valid quantity.");
        } else {
            if (this.item.selectedQuantity > this.quantity) {
                var total = $scope.total - this.item.price * (this.item.selectedQuantity - this.quantity);
            } else {
                var total = $scope.total + this.item.price * (this.quantity - this.item.selectedQuantity);
            }
            this.item.selectedQuantity = this.quantity;
            $http.post("/ebayCart/updateCart", $scope.cartItems)
                .success(function (data) {
                    if (data.status !== "success") {
                        alert("Error in update the quantity. Please try again.");
                    } else {

                        $scope.total = total;
                        Notification.success("Quantity is successfully updated.");
                        // alert("Successfully updated");
                        $scope.updateStatus[index] = false;
                    }

                })
                .error(function (err) {

                })
        }
    }
}]);
