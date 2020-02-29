/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
    ['knockout', 'jquery', 'ojL10n!./resources/nls/data-validation-strings','ojs/ojarraydataprovider','data-validation-subview/loader', 'ojs/ojnavigationlist', 'ojs/ojswitcher', 'ojs/ojbutton', 'ojs/ojlistview'],
     function (ko, $, componentStrings, ArrayDataProvider) {
    
    function ExampleComponentModel(context) {
        var self = this;
        var host = sessionStorage.getItem("hostname");


        self.listItems = [
          {
            entityid: 1,
            id: "PERSON",
            label: "PERSON",
            disabled: false
          },
          {
  
            entityid: 2,
            id: "PERSON_NAME",
            label: "PERSON_NAME",
            disabled: false
          },
          // {
  
          //   entityid: 3,
          //   id: "PERSON_NID",
          //   label: "PERSON_NID",
          //   disabled: false
          // },
          // {
          //   entityid: 4,
          //   id: "DOCUMENTS_OF_RECORD_VO",
          //   label: "DOCUMENTS_OF_RECORD_VO",
          //   disabled: false
          // },
          // {
          //   entityid: 5,
          //   id: "CITIZENSHIP_VO",
          //   label: "CITIZENSHIP_VO",
          //   disabled: false
          // },
          {
            entityid: 6,
            id: "PERSON_LEGISLATIVE_INFO",
            label: "PERSON_LEGISLATIVE_INFO",
            disabled: false
          },
          // {
          //   entityid: 7,
          //   id: "PERSON_ADDRESS",
          //   label: "PERSON_ADDRESS",
          //   disabled: false
          // },
          // {
          //   entityid: 8,
          //   id: "PERSON_PHONE",
          //   label: "PERSON_PHONE",
          //   disabled: false
          // },
          //  {
          //   entityid: 9,
          //   id: "PERSON_EMAIL",
          //   label: "PERSON_EMAIL",
          //   disabled: false
          // }, 
          {
            entityid: 10,
            id: "ASSIGNMENT",
            label: "ASSIGNMENT",
            disabled: false
          },
          //  {
          //   entityid: 11,
          //   id: "ASSIGNMENT_EFF",
          //   label: "ASSIGNMENT_EFF",
          //   disabled: false
          // }, 
          {
            entityid: 12,
            id: "PERSON_SALARY",
            label: "PERSON_SALARY",
            disabled: false
          }, 
          {
            entityid: 13,
            id: "SUPERVISOR",
            label: "SUPERVISOR",
            disabled: false
          }, 
          // {
          //   entityid: 14,
          //   id: "CONTACT_RELATIONSHIP",
          //   label: "CONTACT_RELATIONSHIP",
          //   disabled: false
          // }, 
          // {
          //   entityid: 15,
          //   id: "ELEMENT_ENTRIES",
          //   label: "ELEMENT_ENTRIES",
          //   disabled: false
          // }, 
          // {
          //   entityid: 16,
          //   id: "ELEMENT_ENTRIES_VALUES",
          //   label: "ELEMENT_ENTRIES_VALUES",
          //   disabled: false
          // },
          {
            entityid: 17,
            id: "WORK_TERMS",
            label: "WORK_TERMS",
            disabled: false
          }, 
          {
            entityid: 18,
            id: "WORK_RELATIONSHIP",
            label: "WORK_RELATIONSHIP",
            disabled: false
          },
        ];
  
  
        self.itemsArray = ko.observableArray(self.listItems);
  
        self.dataProvider = new ArrayDataProvider(self.itemsArray);
  
  
        self.selectedItem = ko.observable(sessionStorage.getItem("user"));
  
  
        $.ajax({
          url: host+"/api/v1/source/entities",
          type: 'GET',
          // dataType: 'json',
  
          success: function (data, textStatus, jqXHR) {
  
            console.log(data);
            // self.listItems(data.data);
           
            for (let i = 0; i < data.data.length; i++) {
              // var obj = {
              //   id: data.data[i].ENTITY_NAME,
              //   label: data.data[i].ENTITY_NAME,
              //   disabled: false,
              // }
              // self.listItems.push(obj);
              var tempArray = [];
              for(let i=0;i<data.data.length; i++){
                tempArray.push(data.data[i]);
              }
        
              // self.itemsArray(tempArray);
  
            }
           
          },
          fail: function (xhr, textStatus, errorThrown) {
  
            console.log(errorThrown);
          }
        });


        
//         self.checkValue = ko.observableArray();

//         self.dircolumn = ko.pureComputed(function(){
//           return (typeof self.checkValue()[0] !== 'undefined' && self.checkValue()[0] != null && 
//                   self.checkValue()[0] === "dirColumn") ? true : false;
//         }.bind(self));

//         var deptArray = [
         
//             {
//                 SNO: 1,
//                 SourceField: 'Source_Field_Name-1',
//                 DestinationField: 'Destination_Field_Name_4',
//                 Message: 'Test message'
//             },
//             {
//               SNO: 1,
//               SourceField: 'Source_Field_Name-1',
//               DestinationField: 'Destination_Field_Name_4',
//               Message: 'Test message'
//           },
//           {
//             SNO: 1,
//             SourceField: 'Source_Field_Name-1',
//             DestinationField: 'Destination_Field_Name_4',
//             Message: 'Test message'
//         },
//         {
//           SNO: 1,
//           SourceField: 'Source_Field_Name-1',
//           DestinationField: 'Destination_Field_Name_4',
//           Message: 'Test message'
//       },
//       {
//         SNO: 1,
//         SourceField: 'Source_Field_Name-1',
//         DestinationField: 'Destination_Field_Name_4',
//         Message: 'Test message'
//     },
//     {
//       SNO: 1,
//       SourceField: 'Source_Field_Name-1',
//       DestinationField: 'Destination_Field_Name_4',
//       Message: 'Test message'
//   },
//    {
//                 SNO: 1,
//                 SourceField: 'Source_Field_Name-1',
//                 DestinationField: 'Destination_Field_Name_4',
//                 Message: 'Test message'
//             }, {
//               SNO: 1,
//               SourceField: 'Source_Field_Name-1',
//               DestinationField: 'Destination_Field_Name_4',
//               Message: 'Test message'
//           },
//           {
//             SNO: 1,
//             SourceField: 'Source_Field_Name-1',
//             DestinationField: 'Destination_Field_Name_4',
//             Message: 'Test message'
//         },
//         {
//           SNO: 1,
//           SourceField: 'Source_Field_Name-1',
//           DestinationField: 'Destination_Field_Name_4',
//           Message: 'Test message'
//       }, {
//         SNO: 1,
//         SourceField: 'Source_Field_Name-1',
//         DestinationField: 'Destination_Field_Name_4',
//         Message: 'Test message'
//     },
//     {
//       SNO: 1,
//       SourceField: 'Source_Field_Name-1',
//       DestinationField: 'Destination_Field_Name_4',
//       Message: 'Test message'
//   },
//   {
//     SNO: 1,
//     SourceField: 'Source_Field_Name-1',
//     DestinationField: 'Destination_Field_Name_4',
//     Message: 'Test message'
// },

           
        

     //{DepartmentId: 1001, DepartmentName: 'ADFPM 1001 neverending', LocationId: 200, ManagerId: 300},
        // {DepartmentId: 556, DepartmentName: 'BB', LocationId: 200, ManagerId: 300},
        // {DepartmentId: 10, DepartmentName: 'Administration', LocationId: 200, ManagerId: 300},
        // {DepartmentId: 20, DepartmentName: 'Marketing', LocationId: 200, ManagerId: 300},
        // {DepartmentId: 30, DepartmentName: 'Purchasing', LocationId: 200, ManagerId: 300},
        // {DepartmentId: 40, DepartmentName: 'Human Resources1', LocationId: 200, ManagerId: 300},
        // {DepartmentId: 50, DepartmentName: 'Administration2', LocationId: 200, ManagerId: 300},
        // {DepartmentId: 60, DepartmentName: 'Marketing3', LocationId: 200, ManagerId: 300},
        // {DepartmentId: 70, DepartmentName: 'Purchasing4', LocationId: 200, ManagerId: 300},
        // {DepartmentId: 80, DepartmentName: 'Human Resources5', LocationId: 200, ManagerId: 300},
        // {DepartmentId: 90, DepartmentName: 'Human Resources11', LocationId: 200, ManagerId: 300},
        // {DepartmentId: 100, DepartmentName: 'Administration12', LocationId: 200, ManagerId: 300},
        // {DepartmentId: 110, DepartmentName: 'Marketing13', LocationId: 200, ManagerId: 300},
        // {DepartmentId: 120, DepartmentName: 'Purchasing14', LocationId: 200, ManagerId: 300},
        // {DepartmentId: 130, DepartmentName: 'Human Resources15', LocationId: 200, ManagerId: 300},
      
        // {DepartmentId: 60, DepartmentName: 'Marketing3', LocationId: 200, ManagerId: 300},
        // {DepartmentId: 70, DepartmentName: 'Purchasing4', LocationId: 200, ManagerId: 300},
        // {DepartmentId: 80, DepartmentName: 'Human Resources5', LocationId: 200, ManagerId: 300},
        // {DepartmentId: 90, DepartmentName: 'Human Resources11', LocationId: 200, ManagerId: 300},
        // {DepartmentId: 100, DepartmentName: 'Administration12', LocationId: 200, ManagerId: 300},
        // {DepartmentId: 110, DepartmentName: 'Marketing13', LocationId: 200, ManagerId: 300},
        // {DepartmentId: 120, DepartmentName: 'Purchasing14', LocationId: 200, ManagerId: 300},
        // {DepartmentId: 130, DepartmentName: 'Human Resources15', LocationId: 200, ManagerId: 300}
      
      // ];
    // self.dataprovider = new oj.ArrayDataProvider(deptArray, {idAttribute: 'DepartmentId'});


   // self.pagingDataProvider = new PagingDataProviderView(new ArrayDataProvider(deptArray, {idAttribute: 'DepartmentId'}));



        //At the start of your viewModel constructor
        var busyContext = oj.Context.getContext(context.element).getBusyContext();
        var options = {"description": "CCA Startup - Waiting for data"};
        self.busyResolve = busyContext.addBusyState(options);

        self.composite = context.element;

        //Example observable
        self.messageText = ko.observable('Hello from Example Component');
        self.properties = context.properties;
        self.res = componentStrings['data-validation'];
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