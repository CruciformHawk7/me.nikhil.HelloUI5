sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "me/nikhil/HelloUI5/controller/BaseController"
], function (Controller) {
  "use strict";

  return Controller.extend("me.nikhil.HelloUI5.controller.MainView", {
    pressedCount: function (oEvent) {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("Counter");
    },
    pressedPower: function (oEvent) {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("Power");
    },
    pressedNorth: function (oEvent) {
      sap.ui.core.UIComponent.getRouterFor(this).navTo("NorthwindProducts");
    }
  });
});