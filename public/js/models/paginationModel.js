define([] , function () {

  var formatToMonthYear = function(date) {
    var actualMonth = date.getMonth() + 1;
    return actualMonth + "/" + date.getFullYear();
  };

  var getMonthName = function(monthNumber) {
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November','December'];
    return monthNames[monthNumber - 1];
  };

  var getPreviousMonthYear = function(month, year) {
    var previousMonthDate = new Date(year, month-2, 1);
    return formatToMonthYear(previousMonthDate);
  };

  var getNextMonthYear = function(month, year) {
    var nextMonthDate = new Date(year, month, 1);
    return formatToMonthYear(nextMonthDate);
  };

  var PaginationModel = function(currentMonth, currentYear) {
  	this._currentMonth = currentMonth;
  	this._currentYear = currentYear;
    this.previousMonthYear = getPreviousMonthYear(currentMonth, currentYear);
    this.nextMonthYear =  getNextMonthYear(currentMonth, currentYear);
    this.currentMonthYear = getMonthName(currentMonth) + " " + currentYear;
  };

  PaginationModel.prototype.showNextMonthYear = function() {
    return new Date(this._currentYear, this._currentMonth, 1) < new Date();
  };

  return PaginationModel;

});	