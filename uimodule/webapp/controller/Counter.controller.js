sap.ui.define([
  "sap/ui/model/json/JSONModel",
  "me/nikhil/HelloUI5/controller/BaseController"
  //"sap/ui/core/routing/History",
], function (JSONModel, Controller) {
  "use strict";

  return Controller.extend("me.nikhil.HelloUI5.controller.Counter", {
    onInit: function () {
      var oModel = new JSONModel({
        counterCount: 1
      });
      this.getView().setModel(oModel, "cc");
    },
    goHome: function (evt) {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("home");
    },
    onAddCounter: function (evt) {
      var panels = this.byId("panels");
      var num = this.getModel("cc").getData().counterCount;
      sap.ui.core.mvc.XMLView.create({
        id: `fragment-${++num}`,
        viewName: "me.nikhil.HelloUI5.view.CounterPanel"
      }).then(function (oView) {
        oView.getModel("counterValue").setData({
          counterName: `Counter #${num}`,
          counterTempName: `Counter #${num}`
        }, true);
        panels.addItem(oView);
      });
      this.getView().getModel("cc").setData({counterCount: num}, true);
    }
  });
});