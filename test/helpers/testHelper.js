module.exports.formatDate = function(date) {
  var actualMonth = date.getMonth() + 1;
  return date.getDate() + "/" + actualMonth + "/" + date.getFullYear();
};

module.exports.selectProject = function(projectName) {
  $('#project').sendKeys(projectName);
  driver.executeScript("arguments[0].click()", $('.autocomplete li'));
};

module.exports.clickMenuItem = function(id) {
  $('#appMenu').click();
  $('#' + id).click();
};
