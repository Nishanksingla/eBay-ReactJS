app.controller("profileController", ['$scope', '$http','$state', function ($scope, $http,$state) {
    $scope.initialize = function(){ 
        $http.get("/user/info")
        .success(function(data){
            $scope.user = data.user;
        })
        .error(function(err){
            console.log(err);
        })

        

        // $http.get("/user/info")
        // .success(function(data){
        //     $scope.userInfo = data.results[0];
        // })
        // .error(function(err){

        // })

        // $http.get("/user/solditems")
        // .success(function(data){
        //     debugger
        //     console.log(data);
        //     console.log(data.solditems);
        //     $scope.solditems = data.solditems;
        //     // $scope.userInfo = data.results[0];
        // })
        // .error(function(err){

        // })

    }
}]);

