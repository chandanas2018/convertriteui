/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
    ['knockout', 'jquery', 'ojL10n!./resources/nls/data-mapping-strings','data-mapping-subview/loader','data-mapping-topview/loader', 'ojs/ojnavigationlist', 'ojs/ojswitcher', 'ojs/ojbutton', 'ojs/ojlistview'],
     function (ko, $, componentStrings) {
    
    function ExampleComponentModel(context) {
        var self = this;


        self.listItems = [
          {
            id: "PERSON",
            label: "PERSON",
            disabled: false
          },
          {
            id: "PERSON_NAME",
            label: "PERSON_NAME",
            disabled: false
          },
          {
            id: "PERSON_NID",
            label: "PERSON_NID",
            disabled: false
          },
          {
            id: "DOCUMENTS_OF_RECORD_VO",
            label: "DOCUMENTS_OF_RECORD_VO",
            disabled: false
          },
          {
            id: "CITIZENSHIP_VO",
            label: "CITIZENSHIP_VO",
            disabled: false
          },
          {
            id: "PERSON_LEGISLATIVE_INFO",
            label: "PERSON_LEGISLATIVE_INFO",
            disabled: false
          },
          {
            id: "PERSON_ADDRESS",
            label: "PERSON_ADDRESS",
            disabled: false
          },
          {
            id: "PERSON_PHONE",
            label: "PERSON_PHONE",
            disabled: false
          }, {
            id: "PERSON_EMAIL",
            label: "PERSON_EMAIL",
            disabled: false
          }, {
            id: "ASSIGNMENT",
            label: "ASSIGNMENT",
            disabled: false
          }, {
            id: "ASSIGNMENT_EFF",
            label: "ASSIGNMENT_EFF",
            disabled: false
          }, {
            id: "PERSON_SALARY",
            label: "PERSON_SALARY",
            disabled: false
          }, {
            id: "SUPERVISOR",
            label: "SUPERVISOR",
            disabled: false
          }, {
            id: "CONTACT_RELATIONSHIP",
            label: "CONTACT_RELATIONSHIP",
            disabled: false
          }, {
            id: "ELEMENT_ENTRIES",
            label: "ELEMENT_ENTRIES",
            disabled: false
          }, {
            id: "ELEMENT_ENTRIES_VALUES",
            label: "ELEMENT_ENTRIES_VALUES",
            disabled: false
          },
          {
            id: "WORK_TERMS",
            label: "WORK_TERMS",
            disabled: false
          }, {
            id: "WORK_RELATIONSHIP",
            label: "WORK_RELATIONSHIP",
            disabled: false
          },
        ];
        self.selectedItem = ko.observable('PERSON');

























        
        //At the start of your viewModel constructor
        var busyContext = oj.Context.getContext(context.element).getBusyContext();
        var options = {"description": "CCA Startup - Waiting for data"};
        self.busyResolve = busyContext.addBusyState(options);

        self.composite = context.element;

        //Example observable
        self.messageText = ko.observable('Hello from Example Component');
        self.properties = context.properties;
        self.res = componentStrings['data-mapping'];
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