var app = angular.module('Lab1', []);
app.controller('calculator', function ($scope, $http) {
    $scope.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.'];
    $scope.operations = ["+", "-", "*", "/"];
    $scope.inputVal = "";

    $scope.inputNumbers = [];
    $scope.activeOperation = "";
    $scope.result="";
    $scope.getInputValue = function () {
        if ($scope.activeOperation !== "") { //if theres an operation add that operation in an array and empty the value of text box
            $scope.inputVal = "";
            $scope.inputNumbers.push($scope.activeOperation);
            $scope.activeOperation = "";
        }
        if ($scope.result) {
            $scope.inputVal = "";
            $scope.result = "";
        }
        $scope.inputVal = $scope.inputVal + this.number;
    }

    $scope.getOperation = function () {
        if($scope.activeOperation && $scope.activeOperation !== this.operation){
            $scope.activeOperation = this.operation;
        }else if ($scope.inputVal !== "" && $scope.activeOperation==="") {
            $scope.inputNumbers.push($scope.inputVal);
            $scope.activeOperation = this.operation;    
        }
        if ($scope.inputNumbers.length === 3) {
                calculate();
                // $scope.inputNumbers.push($scope.result);
            }

    }
    $scope.clear = function () {
        $scope.inputVal = "";
        $scope.activeOperation = "";
        $scope.inputNumbers = [];
    }

    $scope.equalto = function () {
        if ($scope.inputVal !== "") {
            $scope.inputNumbers.push($scope.inputVal);
            $scope.activeOperation="";
            if ($scope.inputNumbers.length === 3) {
                calculate();
            }
        }
        // $scope.inputNumbers = [];
    }

    function calculate() {
        $http.post("/calculate", $scope.inputNumbers)
            .success(function (data) {
                if (data) {
                    $scope.result = String(data.result);
                    $scope.inputVal = String(data.result);
                    $scope.inputNumbers = [];
                    if($scope.activeOperation){
                        $scope.inputNumbers.push($scope.result);
                    }
                }
            })
            .error(function (err) {
                alert(err);
            })
    }
})