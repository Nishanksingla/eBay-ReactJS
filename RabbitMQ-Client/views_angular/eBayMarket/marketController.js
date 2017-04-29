app.controller("marketController", ['$scope', '$http', '$state', function ($scope, $http, $state) {
    $scope.getProducts = function () {
        debugger
        var category = window.location.href.split('=')[1];
        $http.get("/products/getByCategory/" + category)
            .success(function (data) {
                debugger
                if (data !== "") {
                    $scope.products = data.products;
                    $scope.productCount = data.products.length;
                    sessionStorage.products = JSON.stringify(data.products);
                } else {

                }

            })
            .error(function (err) {
                console.log(err);
                alert("Error in getting products by category. Please try again.");
            });
    };
}]);