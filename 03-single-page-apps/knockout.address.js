// Prototype for an observable<->URL binding plugin.
((() => {
    var currentParams = {};
    var updateTimer;
    var $ = window.jQuery;
    function ensureString(value) { 
        return ((value === null) || (value === undefined)) ? value : value.toString();
    }

    // Gives an address (URL) to a view model state
    ko.linkObservableToUrl = (observable, hashPropertyName, defaultValue) => {
        // When the observable changes, update the URL
        observable.subscribe(value => {
            var valueToWrite = value === defaultValue ? null : ensureString(value);
            if (currentParams[hashPropertyName] !== valueToWrite) {
                currentParams[hashPropertyName] = valueToWrite;
                queueAction(() => {
                    for (var key in currentParams)
                        $.address.parameter(key, currentParams[key]);
                    $.address.update();
                });
            }
        });
        // When the URL changes, update the observable
        $.address.change(evt => {
            currentParams[hashPropertyName] = hashPropertyName in evt.parameters ? evt.parameters[hashPropertyName] : null;
            observable(hashPropertyName in evt.parameters ? evt.parameters[hashPropertyName] : defaultValue);
        });
    }

    function queueAction(action) {
        if (updateTimer)
            clearTimeout(updateTimer);
        updateTimer = setTimeout(action, 0);
    }

    $.address.autoUpdate(false);
}))();