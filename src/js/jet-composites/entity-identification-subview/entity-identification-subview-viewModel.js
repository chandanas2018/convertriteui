/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
// define(
//     ['knockout', 'jquery', 'ojL10n!./resources/nls/entity-identification-subview-strings','ojs/ojarraydataprovider', 'ojs/ojvalidation-base', 'ojs/ojdatacollection-utils', 'ojs/ojknockout', 'ojs/ojinputtext', 
//     'ojs/ojdatetimepicker', 'ojs/ojselectcombobox', 'ojs/ojcheckboxset', 'ojs/ojtable'], 


//     function (ko, $, componentStrings, ArrayDataProvider, ValidationBase, DataCollectionEditUtils) {

define(
  ['knockout', 'jquery', 'ojL10n!./resources/nls/entity-identification-subview-strings',
    'ojs/ojarraydataprovider', 'ojs/ojarraytreedataprovider', 'ojs/ojflattenedtreedataproviderview', 'ojs/ojdatacollection-utils',
    'ojs/ojknockouttemplateutils',
    'ojs/ojtable', 'ojs/ojrowexpander', 'ojs/ojinputtext', 'ojs/ojcheckboxset', 'ojs/ojbutton','ojs/ojmessages'
  ],


  function (ko, $, componentStrings, ArrayDataProvider, ArrayTreeDataProvider,
    FlattenedTreeDataProviderView, DataCollectionEditUtils, KnockoutTemplateUtils) {

    function ExampleComponentModel(context) {
      var self = this;



      var options = [];
      self.datasource = ko.observable();


      self.nowrap = ko.observable(false);

      self.data = [
        // {
        //   id:"t1",
        //   COLUMN_NAME:"Task 1",
        //   DISPLAY_NAME:"Larry",
        //   start:"1/1/2014",
        //   IDENTIFICATION_STATUS:['unchecked']

        // },
        // {
        //   id:"t2",
        //   COLUMN_NAME:"Task 2",
        //   DISPLAY_NAME:"Larry",
        //   start:"4/1/2014",
        //   IDENTIFICATION_STATUS:[]

        // },
        // {
        //   id:"t3",
        //   COLUMN_NAME:"Task 3",
        //   DISPLAY_NAME:"Larry",
        //   start:"5/1/2014",
        //   IDENTIFICATION_STATUS:[]

        // },
        // {
        //   id:"t4",
        //   COLUMN_NAME:"Task 4",
        //   DISPLAY_NAME:"Larry",
        //   start:"11/1/2014",
        //   IDENTIFICATION_STATUS:[]
        // }
      ];


      self.data1 = ko.observableArray(self.data);


      $.ajax({
        url: "http://localhost:3333/api/v1/identification/columns",
        data: { entityid: context.properties.entityId },
        type: 'POST',
        dataType: 'json',

        success: function (data, textStatus, jqXHR) {

          console.log(data);
          // self.data1(self.data);

          var tempArray = [];
          for (let i = 0; i < data.data.length; i++) {

            var Checkboxdata = [];
            Checkboxdata.push(data.data[i].IDENTIFICATION_STATUS);
            var obj = {
              COLUMN_ID: data.data[i].COLUMN_ID,
              COLUMN_NAME: data.data[i].COLUMN_NAME,
              DISPLAY_NAME: data.data[i].DISPLAY_NAME,
              IDENTIFICATION_STATUS: Checkboxdata,
            }


            // tempArray.push(data.data[i]);
            tempArray.push(obj);
          }

          self.data1(tempArray);

        },
        fail: function (xhr, textStatus, errorThrown) {

          console.log(errorThrown);
        }
      });



      self.data2 = new ArrayDataProvider(self.data1);

      self.messages = [
             ];
      self.errorMessageTimeout = ko.observable('0');
      self.messagesArray = ko.observableArray(self.messages);
        self.messagesDataprovider = new ArrayDataProvider(self.messagesArray);







      self.saveSelections = function () {

        console.log(self.data1);
        var tmp = [];
        var tmp2 = [];

        var data = self.data1();
        for (let i = 0; i < data.length; i++) {

          if (data[i].IDENTIFICATION_STATUS == "CHECKED") {

            var obj = {
              COLUMN_ID: data[i].COLUMN_ID,
              COLUMN_NAME: data[i].COLUMN_NAME,
              DISPLAY_NAME: data[i].DISPLAY_NAME,
              IDENTIFICATION_STATUS: data[i].IDENTIFICATION_STATUS[0]

            }
            tmp.push(obj);


          } else {

            


            var obj = {
              COLUMN_ID: data[i].COLUMN_ID,
              COLUMN_NAME: data[i].COLUMN_NAME,
              DISPLAY_NAME: data[i].DISPLAY_NAME,
              IDENTIFICATION_STATUS: "UNCHECKED"

            }
            tmp2.push(obj)
          }

        }

        console.log(tmp);


        var formData = { data: tmp, unchecked: tmp2 };

        $.ajax({
          url: "http://localhost:3333/api/v1/update/identification/columns",
          data: JSON.stringify(formData),
          type: 'POST',
          dataType: 'json',
          contentType: 'application/json',
        
          success: function (data, textStatus, jqXHR) {

            console.log(data);


            if(data.success == true){
              
              var success ={
                severity: 'confirmation',
                  summary: 'Success',
                  detail: "Identified Columns saved successfully",
                  autoTimeout: parseInt(self.errorMessageTimeout())
              }
              self.messagesArray.push(success);


            }

            var tempArray = [];
            // for(let i=0;i<data.data.length; i++){
            //   tempArray.push(data.data[i]);
            // }

            // self.EmpObservableArray(tempArray);

          },
          fail: function (xhr, textStatus, errorThrown) {

            console.log(errorThrown);
          }
        });



      }



      // function to determine which renderer to use for
      // rendering depending on mode
      self.rowRenderer = function (context) {
        var mode = context['rowContext']['mode'];

        if (mode === 'edit') {
          return KnockoutTemplateUtils.getRenderer('row_template_editable', true)(context);
        }
        else if (mode === 'navigation') {
          return KnockoutTemplateUtils.getRenderer('row_template', true)(context);
        }
      };

      self.beforeRowEditEndListener = function (event) {
        var data = event.detail;
        var rowKey = data.rowContext.status.rowKey;
        self.datasource().fetchByKeys({ keys: [rowKey] }).then(function (results) {
          var rowObj = results.results.get(rowKey)
          document.getElementById('rowDataDump').value = (JSON.stringify(rowObj['data']));
        });
        return DataCollectionEditUtils.basicHandleRowEditEnd(event, data);
      }.bind(self);

      var arrayTreeDataProvider = new ArrayTreeDataProvider(self.data1, { keyAttributes: 'COLUMN_ID' });
      // self.datasource(new FlattenedTreeDataProviderView(arrayTreeDataProvider));

      self.datasource(arrayTreeDataProvider);





      self.selectAll = function(){
        var tempArray = [];
        for(let i=0; i<self.data1().length; i++){

          var obj = {
            COLUMN_ID: self.data1()[i].COLUMN_ID,
            COLUMN_NAME: self.data1()[i].COLUMN_NAME,
            DISPLAY_NAME: self.data1()[i].DISPLAY_NAME,
            IDENTIFICATION_STATUS: ['CHECKED'],
          }

          tempArray.push(obj);


          // self.data1()
        }
        self.data1(tempArray);
            }


            
      self.deSelectAll = function(){
        var tempArray = [];
        for(let i=0; i<self.data1().length; i++){

          var obj = {
            COLUMN_ID: self.data1()[i].COLUMN_ID,
            COLUMN_NAME: self.data1()[i].COLUMN_NAME,
            DISPLAY_NAME: self.data1()[i].DISPLAY_NAME,
            IDENTIFICATION_STATUS: ['UNCHECKED'],
          }

          tempArray.push(obj);


          // self.data1()
        }
        self.data1(tempArray);
            }






















      //       var EntityColumnArray = [{  IDENTIFICATION_STATUS: [],COLUMN_NAME: 'Employee',DISPLAY_NAME: 'Done'},
      //       {  IDENTIFICATION_STATUS: [],COLUMN_NAME: 'Employee',DISPLAY_NAME: 'Donet'},
      //       {  IDENTIFICATION_STATUS: [],COLUMN_NAME: 'Employee',DISPLAY_NAME: 'Done'},
      //       {  IDENTIFICATION_STATUS: [],COLUMN_NAME: 'Employee',DISPLAY_NAME: 'Done'},
      //       {  IDENTIFICATION_STATUS: [],COLUMN_NAME: 'Employee',DISPLAY_NAME: 'Doneto'},
      //       { IDENTIFICATION_STATUS: [],COLUMN_NAME: 'Employee',DISPLAY_NAME: 'Donede'},
      //       { IDENTIFICATION_STATUS: [],COLUMN_NAME: 'Employee', DISPLAY_NAME: 'Donede' },
      //       {  IDENTIFICATION_STATUS: [],COLUMN_NAME: 'Employee',DISPLAY_NAME: 'Donet'},
      //       {  IDENTIFICATION_STATUS: [],COLUMN_NAME: 'Employee',DISPLAY_NAME: 'Doneto'},
      //       { IDENTIFICATION_STATUS: [],COLUMN_NAME: 'Employee',DISPLAY_NAME: 'Donede'},
      //       { IDENTIFICATION_STATUS: [],COLUMN_NAME: 'Employee', DISPLAY_NAME: 'Donede' },
      //       {  IDENTIFICATION_STATUS: [],COLUMN_NAME: 'Employee',DISPLAY_NAME: 'Donet'},
      //       {  IDENTIFICATION_STATUS: [],COLUMN_NAME: 'Employee',DISPLAY_NAME: 'Doneto'},
      //       { IDENTIFICATION_STATUS: [],COLUMN_NAME: 'Employee',DISPLAY_NAME: 'Donede'},
      //       { IDENTIFICATION_STATUS: [],COLUMN_NAME: 'Employee', DISPLAY_NAME: 'Donede' },
      //       { IDENTIFICATION_STATUS: [],COLUMN_NAME: 'Employee', DISPLAY_NAME: 'Donede'}];

      //   self.EmpObservableArray = ko.observableArray(EntityColumnArray);
      //   self.dataprovider = new ArrayDataProvider(self.EmpObservableArray);



      //   $.ajax({
      //     url: "http://localhost:3333/api/v1/identification/columns",
      //     data: {entityid: context.properties.entityId},
      //     type: 'POST',
      //     dataType: 'json',

      //     success: function (data, textStatus, jqXHR) {

      //         console.log(data);

      //         var tempArray = [];
      //         for(let i=0;i<data.data.length; i++){
      //           tempArray.push(data.data[i]);
      //         }

      //         // self.EmpObservableArray(tempArray);

      //     },
      //     fail: function(xhr, textStatus, errorThrown){

      //       console.log(errorThrown);
      //    }
      // });

      // self.editRow = ko.observable();

      // self.groupValid = ko.observable();
      // //// NUMBER AND DATE CONVERTER ////
      // var numberConverterFactory = ValidationBase.Validation.converterFactory("number");
      // self.numberConverter = numberConverterFactory.createConverter();

      // var dateConverterFactory = ValidationBase.Validation.converterFactory("datetime");
      // self.dateConverter = dateConverterFactory.createConverter();

      // var factory = ValidationBase.Validation.validatorFactory("numberRange");
      // var rangeValidator = factory.createValidator({min: 100, max: 500});
      // self.validators = [rangeValidator];



      // self.editRow =function(event,context){
      //   console.log(event);
      //   console.log(context);
      // }



      // self.handleUpdate = function (event, context)
      // {
      //     self.editRow({rowKey: context.key});
      // }.bind(self);

      // self.handleDone = function (event, context)
      // {
      //     self.editRow({rowKey: null});
      // }.bind(self);


      // self.beforeRowEditEndListener = function(event)
      // {
      //   // the DataCollectionEditUtils.basicHandleRowEditEnd is a utility method
      //   // which will handle validation of editable components and also handle 
      //   // canceling the edit
      //   var detail = event.detail;
      //   if (DataCollectionEditUtils.basicHandleRowEditEnd(event, detail) === false) {
      //     event.preventDefault();
      //   } else {
      //     var updatedData = event.target.getDataForVisibleRow(detail.rowContext.status.rowIndex).data;
      //     document.getElementById('rowDataDump').value = (JSON.stringify(updatedData));
      //   }
      // }


      // var element = document.getElementById('table');
      // ko.applyBindings(vm, element);
      // element.addEventListener('ojBeforeRowEditEnd', vm.beforeRowEditEndListener);

      // element.addEventListener('ojBeforeRowEditEnd', ExampleComponentModel.beforeRowEditEndListener);





      //At the start of your viewModel constructor
      var busyContext = oj.Context.getContext(context.element).getBusyContext();
      var options = { "description": "CCA Startup - Waiting for data" };
      self.busyResolve = busyContext.addBusyState(options);

      self.composite = context.element;

      //Example observable
      self.messageText = ko.observable('Hello from Example Component');
      self.properties = context.properties;
      self.res = componentStrings['entity-identification-subview'];
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