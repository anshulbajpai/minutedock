define(['modules/app'] , function (app) {
  app.service('redirect.validateLogin',['$location','loginService',function($location, loginService){
    
    loginService.validateLogin()
    .then(function() {
      $location.path('/entries/current'); 
    })
    .then(null, function() {
    	$location.path('/login'); 	
    });

  }])
.service('redirect.currentEntries',['$location', function($location){  	
    var today = new Date();
    var month=today.getMonth() + 1;
    var year=today.getFullYear();
    $location.path('/entries/'+ month + "/" + year);
  }])

});