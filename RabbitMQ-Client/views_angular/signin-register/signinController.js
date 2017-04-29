app.controller("signinController", ['$scope', '$http', '$rootScope', '$state', function ($scope, $http, $rootScope, $state) {
    $scope.login = {};
    $scope.register = {};
    $scope.error = false;
    $scope.registeralerts = [];
    $scope.loginalerts = [];

    $scope.init = function () {
        if (!$scope.$parent.login) {
            
            if ($state.current.name === "SignIn") {
                $scope.activeJustified = 0;
            } else if ($state.current.name === "Register") {
                $scope.activeJustified = 1;
            }
        }
        else {
            window.location.assign('/');
        }
    };
    $scope.loginForm = function () {
        $http.post("/login", $scope.login)
            .success(function (data) {
                debugger
                if (data.status === "success") {
                    $scope.$parent.loginStatus = true;
                    $state.go('/');
                } else {
                    $scope.loginalerts = [{ type: 'danger', msg: data.error }];
                }
            })
            .error(function (err) {

            })
    }
    $scope.registerForm = function () {
        var regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if ($scope.register.password !== $scope.register.confirmPassword) {
            $scope.registeralerts = [{ type: 'danger', msg: "Password should match with Confirm Password." }];
            return;
        } else {
            if (!regexPassword.test($scope.register.password)) {
                $scope.registeralerts = [{ type: 'danger', msg: "Password must atleast contain one number, one uppercase letter, one lowercase letter, one special character ,must be of atleast length 8 ." }];
                return;
            }
        }
        $http.post("/register", $scope.register)
            .success(function (data) {
                debugger
                if (data.error) {
                    // $scope.error = true;
                    $scope.registeralerts = [{ type: 'danger', msg: data.error }];

                }else if (data.errors) {
                    // $scope.error = true;
                    $scope.alerts = [data.errors.message];

                }
                else if (data.status) {
                    $scope.registeralerts = [{ type: 'success', msg: "Successfully Registered" }];
                    $scope.register = {};
                }
            })
            .error(function (err) {

            })
    }

    $scope.closeRegisterAlert = function (index) {
        $scope.registeralerts.splice(index, 1);
        
    }
    $scope.closeLoginAlert = function (index) {
        $scope.loginalerts.splice(index, 1);
        
    }
    $scope.registerTabSelected = function () {
        debugger
        $state.go('Register');


    }
    $scope.signinTabSelected = function () {
        $state.go('SignIn');
    }

}]);