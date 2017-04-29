ko.link_observable_to_ss_route = v => {
  var routes         = { '/:folder'        : { on: update_bindings }
                       , '/:folder/:email' : { on: update_bindings }
                       };

  var router         = Router(routes);
  var folderKO       = v.selectedFolder;
  var emailKO        = v.selectedMailId;
  var goKO           = v.go;

  function update_bindings(folder,email) {
    if(folderKO && folderKO() !== folder) { folderKO(folder); }
    if(emailKO  && emailKO()  !== email)  { emailKO(email);   }
  }

  router.init("#/");

  return goKO.subscribe( value => router.setRoute(value));
};