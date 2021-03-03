sap.ui.define([
  "sap/ui/model/json/JSONModel",
  "me/nikhil/HelloUI5/controller/BaseController",
  //"sap/ui/core/routing/History",
  "sap/ui/core/Fragment"
], function (JSONModel, Controller, Fragment) {
  "use strict";

  return Controller.extend("me.nikhil.HelloUI5.controller.Counter", {
    onInit: function () {
      var oModel = new JSONModel({
        number: 0,
        factor: 1,
        counterName: "Counter #1",
        counterTempName: "Counter #1"
      });
      this.getView().setModel(oModel, "counterValue");
    },
    increment: function (evt) {
      let counterValue = this.getView().getModel("counterValue");
      console.log(counterValue.getData());
      //sap.m.MessageToast.show(evt.getSource().getId() + " Pressed");
      //counterValue.setData({ 'number': (parseInt(counterValue.getData().number) + 1).toString() });
      var fact = counterValue.getData().factor;
      counterValue.setData({"number": (parseInt(counterValue.getData().number) + fact)}, true);
      //counterValue.setProperty('/number', counterValue.getProperty('/number') + 1);
      //counterValue.getData().number += 1;
      //sap.m.MessageToast.show(t);
    },
    decrement: function (evt) {
      let counterValue = this.getView().getModel("counterValue");
      //counterValue.setData({ 'number': (parseInt(counterValue.getData().number) - 1).toString() });
      var fact = counterValue.getData().factor;
      counterValue.setData({"number": parseInt(counterValue.getData().number) - fact}, true);
      // counterValue.getData().number -= 1;
    },
    showRenameDialog: function () {
      var oView = this.getView();
      if (!this.byId("renameCounter")) {
        Fragment.load({
          id: oView.getId(),
          name: "me.nikhil.HelloUI5.view.RenameCounter",
          controller: this
        }).then(function (oDialog) {
          oView.addDependent(oDialog);
          oDialog.open();
        });
      } else {
        this.byId("renameCounter").open();
      }
    },
    closeDialog: function () {
      this.byId("renameCounter").close();
    },
    confirmDialog: function () {
      var counterValue = this.getModel("counterValue");
      counterValue.setData({counterName: counterValue.getData().counterTempName}, true);
      this.byId("renameCounter").close();
    },
    onDelete: function () {
      var oView = this.getView();
      if (!this.byId("deleteCounter")) {
        Fragment.load({
          id: oView.getId(),
          name: "me.nikhil.HelloUI5.view.DeleteCounter",
          controller: this
        }).then(function (oDialog) {
          oView.addDependent(oDialog);
          oDialog.open();
        });
      } else {
        this.byId("deleteCounter").open();
      }
    },
    onConfDel: function () {
      this.getView().destroy();
    },
    onCloseDel: function () {
      this.byId("deleteCounter").close();
    },
    onCopyPress: function () {
      var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
      var dummy = document.createElement("textarea");
      document.body.appendChild(dummy);
      dummy.value = this.getView().getModel("counterValue").getData().number;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      sap.m.MessageToast.show(oResourceBundle.getText("copySuccess"));
    }
  });
});