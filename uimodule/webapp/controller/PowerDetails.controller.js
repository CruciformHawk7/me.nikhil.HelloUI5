sap.ui.define([
  "me/nikhil/HelloUI5/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/UIComponent"
], function (Controller, JSONModel, UIComponent) {
  return Controller.extend("me.nikhil.HelloUI5.controller.PowerDetails", {
    onInit: function () {

      let oModel = new JSONModel({
        "location": "",
        "data": []
      });
      this.getView().setModel(oModel);

      let oRouter = this.getRouter();
      this.fetchData();
      oRouter.getRoute("PowerDetails").attachMatched(this._onRouteMatched, this);
    },
    fetchData: function() {
      let data = this.getOwnerComponent().getModel('powerData');
      let view = this.getView();
      data.attachRequestCompleted(function () {
        //debug;
        view.getModel().setData({'data': data.getData()}, true);
      });
    },
    _onRouteMatched: function (oEvent) {
      let oArgs = oEvent.getParameter("arguments");
      let oView = this.getView();

      oView.getModel().setData({"location": oArgs.location}, true);

      oView.bindElement({
        path: "/Power(" + oArgs.location + ")",
        events: {
          dataRequested: function () {
            oView.setBusy(true);
          },
          dataReceived: function () {
            oView.setBusy(false);
          }
        }
      });
    },
    goHome: function () {
      let oRouter = UIComponent.getRouterFor(this);
      oRouter.navTo("home");
    },
    goBack: function () {
      let oRouter = UIComponent.getRouterFor(this);
      oRouter.navTo("Power");
    }
  });
});