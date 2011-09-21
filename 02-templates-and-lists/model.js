$(document).ready(function() {
  // Raw catalog data - would come from the server
  var availableMeals = [
      { mealName: "Standard (sandwich)", price: 0 },
      { mealName: "Premium (lobster)", price: 34.95 },
      { mealName: "Ultimate (whole zebra)", price: 290 }
  ];
  
  // Class to represent a row in the reservations grid
  var seatReservation = function(name) {
      this.name = name;
      this.availableMeals = availableMeals;
      this.meal = ko.observable(availableMeals[0]);
      this.remove = function() { viewModel.seats.remove(this) }
      this.formattedPrice = ko.dependentObservable(function() {
          var price = this.meal().price;
          return price ? "$" + price.toFixed(2) : "None";        
      }, this);
  }
  
  // Overall viewmodel for this screen, along with initial state
  var viewModel = {
      seats: ko.observableArray([
          new seatReservation("Steve"),
          new seatReservation("Bert")
      ])
      ,addSeat: function() {
          this.seats.push(new seatReservation());   
      }
  };
  
  viewModel.totalSurcharge = ko.dependentObservable(function() {
     var total = 0;
     for (var i = 0; i < this.seats().length; i++)
         total += this.seats()[i].meal().price;
     return total;
  }, viewModel);
  
  ko.applyBindings(viewModel);
});