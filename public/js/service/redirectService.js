define(['modules/app'] , function (app) {
  app.service('redirectService',['$location','loginService',function($location, loginService){
    
    this.validateLogin = function() {
      loginService.validateLogin()
      .then(function() {
        $location.path('/entries/current'); 
      })
      .then(null, function() {
      	$location.path('/login'); 	
      });      
    };

    this.currentEntries = function() {
      var today = new Date();
      var month=today.getMonth() + 1;
      var year=today.getFullYear();
      $location.path('/entries/'+ month + "/" + year);      
    };  
    
  }])

});