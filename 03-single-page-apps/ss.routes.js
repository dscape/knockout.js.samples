ko.link_observable_to_ss_route = function (v) {
  var routes         = { '/:folder'        : { on: update_bindings }
                       , '/:folder/:email' : { on: update_bindings }
                       }
    , router         = Router(routes)
    , folderKO       = v.selectedFolder
    , emailKO        = v.selectedMailId
    , goKO           = v.go
    ;
  
  function update_bindings(folder,email) {
    if(folderKO && folderKO() !== folder) { folderKO(folder); }
    if(emailKO  && emailKO()  !== email)  { emailKO(email);   }
  }

  router.init("#/");

  return goKO.subscribe( function (value) { return router.setRoute(value); });
};