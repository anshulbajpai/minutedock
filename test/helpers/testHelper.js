module.exports.formatDate = function(date) {
    var actualMonth = date.getMonth() + 1;
	return date.getDate() + "/" + actualMonth + "/" + date.getFullYear();
};	

module.exports.selectProject = function(projectName) {
	$('#project').click();
	$('#project').sendKeys(projectName);
	$('.autocomplete').element(by.cssContainingText('li',projectName)).click();
};

