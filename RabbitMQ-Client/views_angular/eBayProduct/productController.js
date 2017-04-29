app.controller("productController", ['$scope', '$http', '$state','Notification', function ($scope, $http, $state,Notification) {
    $scope.quantity = 1;
    $scope.getProduct = function () {
        debugger
        var pid = window.location.href.split('=')[1];
        if (sessionStorage.products) {
            angular.forEach(JSON.parse(sessionStorage.products), function (value, key) {
                if (value._id === pid) {
                    $scope.product = JSON.parse(sessionStorage.products)[key];
                    debugger
                    console.log($scope.product.seller_id);
                    $http.get("/user/seller/" + $scope.product.seller_id)
                    .success(function (data) {
                        debugger
                        $scope.product.sellerInfo = data.seller;
                    })
                    .error(function (err) {

                    });
                }
            });
        } else {
            $http.get("/products/productDetails")
                .success(function (data) {

                })
                .error(function (err) {

                })
        }

    }

    $scope.addtocart = function () {
        if ($scope.quantity > $scope.product.quantity) {
            Notification.error("Please enter a valid quantity.")
        } else {
            $scope.product.selectedQuantity = $scope.quantity;
            $http.post("/ebayCart/addToCart", $scope.product)
                .success(function (data) {
                    if (data.status) {
                        $state.go("Cart");
                    }
                })
                .error(function (err) {

                })
        }
    }

    $scope.buyitnow = function(){
        if ($scope.quantity > $scope.product.quantity) {
            alert("Entered quantity can not be more than available quantity.")
        } else {
            debugger
            $scope.product.selectedQuantity = $scope.quantity;
            window.sessionStorage.cart = JSON.stringify([$scope.product]);
            $state.go("checkout")
        }
    }

    $scope.placebid = function(){
        console.log($scope.bid_price);
        if($scope.bid_price <= $scope.product.bid_price){
            var num = parseFloat($scope.product.bid_price) + 1;
            Notification.error("You have to bid at least US $"+ num);
            return;
        }else{
            $http.post("/products/placebid",{id:$scope.product._id,bid_price:$scope.bid_price})
            .success(function(data){
                if(data.status === "success"){
                    Notification.success("Your bid has been successfully placed.");
                    data.product.sellerInfo = $scope.product.sellerInfo;
                    $scope.product = data.product;
                    sessionStorage.products = JSON.stringify([data.product]);
                    $scope.bid_price = "";
                    // window.location.reload();
                }
            })
            
        }

    }
}]);