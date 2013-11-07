define([] , function () {
    var ListEntriesModel = function() {
      this.selectedEntries =  [];
      this.allEntriesSelected = false;
      this.entries = [];
    };

    ListEntriesModel.prototype.isNoEntrySelected = function() {
      return this.selectedEntries.length == 0;
    };

    ListEntriesModel.prototype.isEntrySelected = function(entryId) {
      return this.selectedEntries.indexOf(entryId) > -1;      
    };

    ListEntriesModel.prototype.selectEntry = function(entryId) {
      this.allEntriesSelected = false;
      var id = this.selectedEntries.indexOf(entryId);
      if(id > -1){
        this.selectedEntries.splice(id, 1);
      }else{
        this.selectedEntries.push(entryId);
      }      
    };

    ListEntriesModel.prototype.selectAllEntries = function() {
      if(this.allEntriesSelected){
        this.selectedEntries = this.entries.map(function(entry) {
          return entry.id;
        });        
      }
      else {
        this.selectedEntries = [];        
      }   
    };
    
    return ListEntriesModel;

});