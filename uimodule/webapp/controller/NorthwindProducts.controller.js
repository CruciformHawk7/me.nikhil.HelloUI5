sap.ui.define([
  "me/nikhil/HelloUI5/controller/BaseController"
], function (Controller) {
  "use strict";

  return Controller.extend("me.nikhil.HelloUI5.controller.NorthwindProducts", {
    onInit: function () {
      console.log(this.getView());
    },
    goHome: function (evt) {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("home");
    }
  });
});