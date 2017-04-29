app.controller("sellController", ['$scope', '$http', '$state','Notification', function ($scope, $http, $state,Notification) {
    $scope.selectedFormat = 0;
    $scope.item = {
        price: null,
        startingprice: null,
        quantity: null
    };
    $scope.conditions = {
        1: "New",
        2: "New other (see details)",
        3: "Manufacturer refurbished",
        4: "Seller refurbished",
        5: "Used",
        6: "For parts or not working"
    }
    $scope.categories = {
        0: "All Categories",
        1: "Antiques",
        2: "Art",
        3: "Baby",
        4: "Books",
        5: "Business & Industrial",
        6: "Cameras & Photo",
        7: "Cell Phones & Accessories",
        8: "Clothing, Shoes & Accessories",
        9: "Coins & Paper Money",
        10: "Collectibles",
        11: "Computers/Tablets & Networking",
        12: "Consumer Electronics",
        13: "Crafts",
        14: "Dolls & Bears",
        15: "DVDs & Movies",
        16: "eBay Motors",
        17: "Entertainment Memorabilia",
        18: "Gift Cards & Coupons",
        19: "Health & Beauty",
        20: "Home & Garden",
        21: "Jewelry & Watches",
        22: "Music",
        23: "Musical Instruments & Gear",
        24: "Pet Supplies",
        25: "Pottery & Glass",
        26: "Real Estate",
        27: "Specialty Services",
        28: "Sporting Goods",
        29: "Sports Mem, Cards & Fan Shop",
        30: "Stamps",
        31: "Tickets & Experiences",
        32: "Toys & Hobbies",
        33: "Travel",
        34: "Video Games & Consoles",
        35: "Everything Else"
    }
    $scope.listingFormats = [{
        text: "Auction is best when you're not sure how much your item could sell for.",
        btnName: "Auction",
    },
    {
        text: "Fixed price is best when you know how much you want to get.",
        btnName: "Fixed price"
    }
    ];
    $scope.select = function (index) {
        $scope.selectedFormat = index;
        $scope.item.listingformat = $scope.listingFormats[index].btnName;
    }
    $scope.sellitem = function () {
        debugger
        $scope.item.condition = $scope.conditions[$scope.item.condition];
        $scope.item.category = $scope.categories[$scope.item.category];
        $http.post("/sellitem", $scope.item)
            .success(function (data) {
                debugger
                if (data.error) {
                    Notification.error("Your session has expired. Please sign in again.");
                    // alert("Your session has expired. Please sign in again.")
                    window.location.assign("/");
                }
                else if (data.status === "success") {
                    Notification.success('Your item has been successfully listed.');
                    // alert("Your item has been successfully listed");
                    $scope.item = {
                        price: null,
                        startingprice: null,
                        quantity: null
                    };
                }
            })
            .error(function (err) {
                alert(err);
                console.log("error in selling an item");
            })
    }
}]);