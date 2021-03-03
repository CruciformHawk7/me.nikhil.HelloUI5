sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "me/nikhil/HelloUI5/controller/BaseController"
], function (Controller) {
  "use strict";

  return Controller.extend("me.nikhil.HelloUI5.controller.PowerData", {
    onInit: function () {
      let oLocations = [];
      oLocations.push({"Place": "All"});
      let here = this;

      let locs = this.getOwnerComponent().getModel("locations");
      locs.attachRequestCompleted(function () {
        locs.getData().forEach(e => {
          oLocations.push({"Place": e});
        });
        let oModel = new sap.ui.model.json.JSONModel({"locs": oLocations});
        here.getView().setModel(oModel, "locations");
        //here.getView().getModel("locations").setData({"locs": oLocations}, true);
        here.byId("locations").setBusy(false);
      });
    },
    goHome: function () {
      let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("home");
    },
    navigateToLoc: function (oEvent) {
      let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      let selectedLocation = oEvent.getSource().getBindingContext("locations").getProperty("Place");
      oRouter.navTo("PowerDetails", {
        location: selectedLocation
      });
    }
  });
});