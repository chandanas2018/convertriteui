/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
    ['knockout', 'jquery', 'ojL10n!./resources/nls/project-list-strings','ojs/ojbutton','project-management/loader','upload-extracts/loader','entity-identification/loader','entity-mapping/loader','data-mapping/loader','data-validation/loader','data-conversion/loader','ojs/ojdialog','ojs/ojinputtext', 'ojs/ojformlayout'],
    
    function (ko, $, componentStrings) {
    
    function ExampleComponentModel(context) {
        var self = this;

        self.checkValue = ko.observableArray();
        self.dircolumn = ko.pureComputed(function(){
          return (typeof self.checkValue()[0] !== 'undefined' && self.checkValue()[0] != null && 
                  self.checkValue()[0] === "dirColumn") ? true : false;
        }.bind(self));



        self.projectName = ko.observable();
        self.projectDescription = ko.observable();

self.name = ko.observable();
        self.addNew = function(){
          // self.name('clicked');

          self.dataProvider.push({ name: "Payroll Data Migration", description:"Data migration projects typically require a lot of additional tools and project support platforms to function smoothly", status: "Upload Extracts"  })
        };

        self.removeProject = function(event, current, bindingContext) {
          self.dataProvider.remove(current.data);
        };


        self.loaded = ko.observable("one");

        self.nowrap = ko.observable(false);


        
        self.close = function (event) {

          if(self.projectName() == undefined || self.projectDescription() == undefined){

          }else{

            self.dataProvider.push({ name: self.projectName, description:self.projectDescription, status: "Upload Extracts"  })
            document.getElementById('modalDialog1').close();
          }

        }

        self.open = function (event) {
          document.getElementById('modalDialog1').open();
        }

        $.ajax({
          url: "http://localhost:3333/api/v1/projects/list",
          data: {email:'Linda@xyz.com'},
          type: 'POST',
          dataType: 'json',
          // contentType: 'application/json',
          // processData: false,
          // contentType: false,
          success: function (data, textStatus, jqXHR) {
             
              console.log(data);

          },
          fail: function(xhr, textStatus, errorThrown){
            
            console.log(errorThrown);
         }
      });
        
        self.dataProvider = ko.observableArray([
          { name: "HBL Group Data Conversion", description:"We needed to convert employee compensation data from the legacy HR database.The old data was stored in much detail-by pay check and compensation type.", status: "Upload Extracts" },
          { name: "Payroll Data Migration", description:"Data migration projects typically require a lot of additional tools and project support platforms to function smoothly", status: "Upload Extracts"  },
          // { name: "HBL Group Data Conversion", description:"We needed to convert employee compensation data from the legacy HR database.The old data was stored in much detail-by pay check and compensation type.", status: "Upload Extracts" },
         
        ]);
        self.projectName = ko.observable();
        self.openProject = function(event,current,bindingContext){
          self.loaded("two");
self.projectName(current.data.name);
        };
// self.name = ko.observable();
//         self.open = function(){
//           self.name(self.dataProvider.name);
//         }
        self.buttonClick = function(){
          self.loaded("one");
        }

self.save = function(){
  if(self.selectedItem() == "Upload Extracts"){
    self.selectedItem("Entity Mapping");
  }
}


self.next = function(){
  self.selectedItem("Entity Identification");
}

self.next1 = function(){
  self.selectedItem("Entity Mapping");
}
self.back1 = function(){
  self.selectedItem("Upload Extracts");
}

self.next2 = function(){
  self.selectedItem("Data Mapping");
}
self.back2 = function(){
  self.selectedItem("Entity Identification");
}

self.next3 = function(){
  self.selectedItem("Data Validation");
}
self.back3 = function(){
  self.selectedItem("Entity Mapping");
}

self.next4 = function(){
  self.selectedItem("Conversion");
}
self.back4 = function(){
  self.selectedItem("Data Mapping");
}

self.back = function(){
  self.selectedItem("Data Validation");
}



      //   self.buttonClick = function(event){
      //     self.clickedButton(event.currentTarget.id);
      //     return true;
      // }.bind(self);
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
        self.res = componentStrings['project-list'];
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