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

 var dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]; 

 var DateModel = function (date) {
   this.value = date;
 };

 DateModel.prototype.isInFuture = function() {
    return this.value > new Date();
 };


 DateModel.prototype.dayName = function() {
  return dayNames[this.value.getDay()];
 };

 DateModel.prototype.isWeekend = function() {
   var day = this.value.getDay();
   return day == 0 || day == 6;
};


 var NullDate = new DateModel(null);
 NullDate.isInFuture = function() {return true;};
 NullDate.dayName = function() { return "";};
 NullDate.isWeekend = function() { return false; };


  var fillDates = function(allDates) {
    var dates = [];
    var firstDate = allDates[0];
    var startingDay = firstDate.getDay();
    var monthLength = allDates.length;

    var day = 1;
    for (var i = 0; i < 6; i++) {
      if(day > monthLength){
        break;
      }
      dates.push([]);
      for (var j = 0; j <= 6; j++) {
        if(i == 0 && j < startingDay){
          dates[i].push(NullDate);
        }
        else if (day <= monthLength){
          dates[i].push(new DateModel(allDates[day-1]));            
          day++;          
        }
        else{
         dates[i].push(NullDate); 
       }
     }
   }   
   return dates;
 };


 var AddEntriesModel = function(contacts, projects, currentMonth, currentYear) {
  var allDates = getDates(currentMonth, currentYear);
  this._weekdays = getWeekdays(allDates);

  this._contacts = contacts;
  this._projects = projects;
  this.projectNames = projects.map(function(project) {return project.name});

  this.dates = fillDates(allDates);
  this.allWeekdaysSelected = false;
  this.selectedDates = [];
};

AddEntriesModel.prototype.isDateSelected = function(date) {
  return this.selectedDates.indexOf(date.value) > -1;
};

AddEntriesModel.prototype.selectProject = function(selectedProjectName) {
  var that = this;
  this.selectedProject = this._projects.filter(function(project) {
    return project.name === selectedProjectName;
  })[0];
  
  this.selectedContact = this._contacts.filter(function(contact) {
    return contact.id === that.selectedProject.contactId;
  })[0];
};

AddEntriesModel.prototype.isInvalid = function() {
  return !this.selectedProject || !this.selectedContact || !this.duration || this.selectedDates.length === 0;
};  

AddEntriesModel.prototype.toggleAllWeekdays = function() {
  if(this.allWeekdaysSelected) {
    this.selectedDates = this._weekdays.slice();
  }
  else {
    this.selectedDates = [];
  }
};


AddEntriesModel.prototype.selectDate = function(date) {
  if(date.isInFuture()){
    return;
  }
  this.allWeekdaysSelected = false;  
  var id = this.selectedDates.indexOf(date.value);
  if(id > -1){
    this.selectedDates.splice(id, 1);
  }
  else {
    this.selectedDates.push(date.value);
  }  
};

return AddEntriesModel;
});	