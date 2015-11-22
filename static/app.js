//Define an angular module for our app
var sampleApp = angular.module('sampleApp', []);
 

sampleApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/call_queue', {
        templateUrl: 'static/templates/call_queue.html',
        controller: 'call_queue_ctrl'
    }).
      when('/email_queue', {
        templateUrl: 'static/templates/email_queue.html',
        controller: 'email_queue_ctrl'
      }).
      when('/Follow-up', {
        templateUrl: 'static/templates/Follow-up.html',
        controller: 'Follow_up_ctrl'
      }).
      when('/Draggable', {
        templateUrl: 'static/templates/Draggable.html',
        controller:'Draggable_ctrl'
      }).
      when('/intro', {
        templateUrl: 'static/templates/Introduction.html',
        controller:'Draggable_ctrl'
      }).
      when('/about/:person', {
        templateUrl: 'static/templates/person_details.html',
        controller: 'person_details_ctrl'
      }).
      otherwise({
        redirectTo: '/intro'
      });
}]);

sampleApp.directive('draggable', function($document) {
            return function(scope, element, attr) {
                var startX = 0,
                    startY = 0,
                    x = 0,
                    y = 0;
                element.css({
                    position: 'relative',
                    border: '1px solid red',
                    backgroundColor: '#eee',
                    cursor: 'move',
                    display: 'block',
                    color: 'black',
                    width: '150px',
                    height:'50px'

                });

                element.on('mousedown', function(event) {
                    // Prevent default dragging of selected content
                  
                    startX = event.screenX - x;
                    startY = event.screenY - y;
                    $document.on('mousemove', mousemove);
                    $document.on('mouseup', mouseup);
                });

                function mousemove(event) {
                    y = event.screenY - startY;
                    x = event.screenX - startX;
                    element.css({
                        top: y + 'px',
                        left: x + 'px'
                    });
                }

                function mouseup() {
                    $document.off('mousemove', mousemove);
                    $document.off('mouseup', mouseup);
                }
            };
        });
 


sampleApp.factory('myData', ['$http', function($http) {
  return {
    get: function() {
      return $http.get('call_queue.json').then(function(response) {
        return response.data;
      });
    }
  };
}]);


sampleApp.controller('call_queue_ctrl', function($scope, $http, myData) {
    $scope.message = 'Call Queue';
        myData.get().then (function (data) {
            $scope.rows = data;//this is fine

          }) 
});
 
 
sampleApp.controller('email_queue_ctrl', function($scope, myData) {
 
    $scope.message = 'Email Queue';
    myData.get().then (function (data) {
            $scope.rows = data;//this is fine

          }) 
 
});

sampleApp.controller('Follow_up_ctrl', function($scope, $http) {
    $scope.message = 'Follow-up';
    $scope.submit = function(){
      console.log($scope.follow_up)
      $http.post("/json", $scope.follow_up)
           .success(function(submitJson, status) {

          })
           .error(function(err) {
            $scope.errormsg = 'unable to set followup. please try again later'
          })
    }
 
});


sampleApp.controller('person_details_ctrl', function($scope, $routeParams, $http, myData) {
    $scope.message = 'person details';
    $scope.person = $routeParams.person;  
    $scope.check ={}
        myData.get().then (function (data) {
            $scope.rows = data;//this is fine           
            for (i = 0; i < data.length; i++) {
              if (data[i].name == $scope.person) {             
                    $scope.check = data[i].details
                  }
            }console.log( $scope.check)          
          }) 
});



sampleApp.controller('Draggable_ctrl', function($scope) {
 

        
});