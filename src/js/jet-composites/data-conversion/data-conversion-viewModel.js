/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
    ['knockout', 'jquery', 'ojL10n!./resources/nls/data-conversion-strings','ojs/ojarraydataprovider','data-conversion-subview/loader', 'ojs/ojnavigationlist', 'ojs/ojswitcher', 'ojs/ojbutton', 'ojs/ojlistview'], 
    
    function (ko, $, componentStrings, ArrayDataProvider) {
    
    function ExampleComponentModel(context) {
        var self = this;

        var host = sessionStorage.getItem("hostname")
        self.loaded = ko.observable();
        self.listItems = [
          3,4,5,7,8,9,11,13,14,15,16
        ];
  
  
        self.selectedItem = ko.observable(sessionStorage.getItem("user"));
  
  
        $.ajax({
          url: host + "/api/v1/source/entities",
          type: 'GET',
          // dataType: 'json',
          headers: {
            "Project_Id": localStorage.getItem('project_id')
          },
          success: function (data, textStatus, jqXHR) {
  
            
            var tempArray = [];
            for (let i = 0; i < data.data.length; i++) {
              if(self.listItems.indexOf(data.data[i].ENTITY_ID) == -1) {
                tempArray.push({
                  entityid: data.data[i].ENTITY_ID,
                  id: data.data[i].ENTITY_NAME,
                  label: data.data[i].ENTITY_NAME,
                  disabled: false
                });
              }
            }
            self.itemsArray = ko.observableArray(tempArray);
            self.dataProvider = new ArrayDataProvider(self.itemsArray);
            self.loaded("one");
          },
          fail: function (xhr, textStatus, errorThrown) {
  
            console.log(errorThrown);
          }
        });


        // self.checkValue = ko.observableArray();

        // self.dircolumn = ko.pureComputed(function(){
        //   return (typeof self.checkValue()[0] !== 'undefined' && self.checkValue()[0] != null && 
        //           self.checkValue()[0] === "dirColumn") ? true : false;
        // }.bind(self));


        
        //At the start of your viewModel constructor
        var busyContext = oj.Context.getContext(context.element).getBusyContext();
        var options = {"description": "CCA Startup - Waiting for data"};
        self.busyResolve = busyContext.addBusyState(options);

        self.composite = context.element;

        //Example observable
        self.messageText = ko.observable('Hello from Example Component');
        self.properties = context.properties;
        self.res = componentStrings['data-conversion'];
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