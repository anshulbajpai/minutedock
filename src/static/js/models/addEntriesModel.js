define([] , function () {

  var getDates = function(month, year) {
    var dates = [];
    var firstDate = new Date(year, month-1, 1);
    var lastDate = new Date(year, month, 0);
    for(var date = firstDate; date <= lastDate; date = new Date(year,month-1, date.getDate() + 1)){
      dates.push(date);
    }
    return dates;
  };

  var getWeekdays = function(dates) {
    var today = new Date();
    return dates.filter(function(date) { return date <= today && date.getDay() >= 1 && date.getDay() <= 5 });
  };  

  var fillDates = function(allDates) {
    var dates = [];
    var firstDate = allDates[0];
    var startingDay = firstDate.getDay();
    var monthLength = allDates.length;
    var days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    var day = 1;
    for (var i = 0; i < 6; i++) {
      if(day > monthLength){
        break;
      }
      dates.push([]);
      for (var j = 0; j <= 6; j++) {
        if(i == 0 && j < startingDay){
          dates[i].push(null);
        }
        else if (day <= monthLength){
          dates[i].push({date:allDates[day-1], day:days[j]});            
          day++;          
        }
        else{
         dates[i].push(null); 
       }
     }
   }
   console.log(dates);
   return dates;
 };

 var AddEntriesModel = function(contacts, projects, currentMonth, currentYear) {
  var allDates = getDates(currentMonth, currentYear);
  this._weekdays = getWeekdays(allDates);

  this.contacts = contacts;
  this.projects = projects;

  this.dates = fillDates(allDates);
  this.allWeekdaysSelected = false;
  this.selectedDates = [];
};

AddEntriesModel.prototype.isDateInFuture = function(date) {
  return date > new Date();
};

AddEntriesModel.prototype.isDateSelected = function(date) {
  return this.selectedDates.indexOf(date) > -1;
};

AddEntriesModel.prototype.isNoDateSelected = function() {
  return this.selectedDates.length == 0;
};  

AddEntriesModel.prototype.toggleAllWeekdays = function() {
  if(this.allWeekdaysSelected) {
    this.selectedDates = this._weekdays;        
  }
  else {
    this.selectedDates = [];
  }
};

AddEntriesModel.prototype.toggleDate = function(date) {
  this.allWeekdaysSelected = false;
  var id = this.selectedDates.indexOf(date);
  if(id > -1){
    this.selectedDates.splice(id, 1);
  }else{
    this.selectedDates.push(date);
  }
};

return AddEntriesModel;

});	