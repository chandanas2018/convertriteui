/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
    ['knockout', 'jquery', 'ojL10n!./resources/nls/project-management-strings','ojs/ojbutton','upload-extracts/loader'], 
    function (ko, $, componentStrings) {
    
    function ExampleComponentModel(context) {
        var self = this;


        self.checkValue = ko.observableArray();
        self.nowrap = ko.pureComputed(function(){
          return (typeof self.checkValue()[0] !== 'undefined' && self.checkValue()[0] != null &&
                  self.checkValue()[0] === "nowrap") ? true : false;
        }.bind(self));


        
    self.buttonClick = function(event){
      self.clickedButton(event.currentTarget.id);
      return true;
  }.bind(self);
  self.selectedItem = ko.observable("Upload Extracts");
  self.display = ko.observable("all");
  self.edge = ko.observable("top");
self.displaym= ko.observable('false');




        
        //At the start of your viewModel constructor
        var busyContext = oj.Context.getContext(context.element).getBusyContext();
        var options = {"description": "CCA Startup - Waiting for data"};
        self.busyResolve = busyContext.addBusyState(options);

        self.composite = context.element;

        //Example observable
        self.messageText = ko.observable('Hello from Example Component');
        self.properties = context.properties;
        self.res = componentStrings['project-management'];
        // Example for parsing context properties
        // if (context.properties.name) {
        //     parse the context properties here
        // }

        //Once all startup and async activities have finished, relocate if there are any async activities
        self.busyResolve();
    };
    
    //Lifecycle methods - uncomment and implement if necessary 
    //ExampleComponentModel.prototype.activated = function(context){
    //};

    //ExampleComponentModel.prototype.connected = function(context){
    //};

    //ExampleComponentModel.prototype.bindingsApplied = function(context){
    //};

    //ExampleComponentModel.prototype.disconnect = function(context){
    //};

    //ExampleComponentModel.prototype.propertyChanged = function(context){
    //};

    return ExampleComponentModel;
});