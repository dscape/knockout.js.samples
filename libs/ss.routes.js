(function () {
  var routes         = { '/:folder'        : { on: function() { return; } }
                       , '/:folder/:email' : { on: function() { return; }  }
                       }
    , router         = Router(routes)
    , $              = window.jQuery
    ;

  ko.link_observable_to_ss_route =
    function (go) {
      go.subscribe(function (value) {
        return router.setRoute(value);
      });
    };

  router.init("#/");
})();