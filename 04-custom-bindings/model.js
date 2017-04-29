function answer(text) { this.text = text; this.points = ko.observable(1); }

function surveyViewModel(question, pointsBudget, answers) {
    this.question = question;
    this.pointsBudget = pointsBudget;
    this.answers = $.map(answers, text => new answer(text));
    this.save = () => { alert('To do') };
                           
    this.pointsUsed = ko.dependentObservable(function() {
        var total = 0;
        for (var i = 0; i < this.answers.length; i++)
            total += parseInt(this.answers[i].points());
        return total;        
    }, this);
}

ko.bindingHandlers.fadeVisible = {
   init(element, valueAccessor) {
        // Start visible/invisible according to initial value
        var shouldDisplay = valueAccessor();
        $(element).toggle(shouldDisplay);
    },
    update(element, valueAccessor) {
        // On update, fade in/out
        var shouldDisplay = valueAccessor();
        shouldDisplay ? $(element).fadeIn() : $(element).fadeOut();
    } 
};

ko.bindingHandlers.jqButton = {
    init(element) {
       $(element).button(); // Turns the element into a jQuery UI button
    },
    update(element, valueAccessor) {
        var currentValue = valueAccessor();
        // Here we just update the "disabled" state, but you could update other properties too
        $(element).button("option", "disabled", currentValue.enable === false);
    }
};

ko.bindingHandlers.starRating = {
    init(element, valueAccessor) {
        $(element).addClass("starRating");
        for (var i = 0; i < 5; i++)
           $("<span>").appendTo(element);
    },
    update(element, valueAccessor) {
        // Give the first x stars the "chosen" class, where x <= rating
        var observable = valueAccessor();
        $("span", element).each(function(index) {
            $(this).hover(
                function() { $(this).prevAll().add(this).addClass("hoverChosen") }, 
                function() { $(this).prevAll().add(this).removeClass("hoverChosen") }                
            ).click(() => { 
                var observable = valueAccessor();  // Get the associated observable
                observable(index+1);               // Write the new rating to it
            });
            $(this).toggleClass("chosen", index < observable());
        });
    }
};

ko.applyBindings(new surveyViewModel("Which factors affect your technology choices?", 10, [
   "Functionality, compatibility, pricing - all that boring stuff",
   "How often it is mentioned on Hacker News",    
   "Number of gradients/dropshadows on project homepage",        
   "Totally believable testimonials on project homepage"
]));