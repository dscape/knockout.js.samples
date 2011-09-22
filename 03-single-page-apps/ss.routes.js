ko.link_observable_to_ss_route = function (v) {
  var routes         = { '/:folder'        : { on: update_bindings }
                       , '/:folder/:email' : { on: update_bindings }
                       }
    , router         = Router(routes)
    , folder         = v.selectedFolder
    , email          = v.selectedMailId
    , go             = v.go
    ;
  
  function update_bindings() {
    var current_route = router.currentRoute();
    if(folder && folder() !== current_route[0]) { folder(current_route[0]); }
    if(email && email() !== current_route[1]) { email(current_route[1]); }
  }

  router.init("#/");

  return go.subscribe( function (value) { return router.setRoute(value); });
};