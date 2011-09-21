$(document).ready(function() {
  var viewModel = 
    { firstName: ko.observable("Bert")
    , lastName: ko.observable("Laa")
    , capitalizeLastName: function() {
        var currentVal = this.lastName();        // Read the current value
        this.lastName(currentVal.toUpperCase()); }
    };
  
  viewModel.fullName = ko.dependentObservable(function() {
    return this.firstName() + " " + this.lastName();
  }, viewModel);
  
  // Activates knockout.js
  ko.applyBindings(viewModel);
});