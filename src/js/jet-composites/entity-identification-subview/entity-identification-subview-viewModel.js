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
    'ojs/ojtable', 'ojs/ojrowexpander', 'ojs/ojinputtext', 'ojs/ojcheckboxset', 'ojs/ojbutton', 'ojs/ojmessages'
  ],


  function (ko, $, componentStrings, ArrayDataProvider, ArrayTreeDataProvider,
    FlattenedTreeDataProviderView, DataCollectionEditUtils, KnockoutTemplateUtils) {

    function ExampleComponentModel(context) {
      var self = this;

      var host = sessionStorage.getItem("hostname");

      var options = [];
      self.datasource = ko.observable();


      self.nowrap = ko.observable(false);

      self.data = [];

     
      $("#progress").show();
      self.data1 = ko.observableArray(self.data);

      $.ajax({
        url: host + "/api/v1/identification/columns",
        data: { entityid: context.properties.entityId },
        type: 'POST',
        dataType: 'json',
        headers: {
          "Project_Id": localStorage.getItem('project_id')
        },

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
              IS_MANDATORY: data.data[i].IS_MANDATORY,
              IS_MULTISELECT: ['UNCHECKED'],
              DISABLED_STATUS: false
            }
            tempArray.push(obj);
          }

          for (let i = 0; i < tempArray.length; i++) {
            if (tempArray[i].IS_MANDATORY == 'Y') {
              tempArray[i].IDENTIFICATION_STATUS = ['CHECKED']
              tempArray[i].DISABLED_STATUS = true;
            }
          }
          $("#progress").hide();
          self.data1(tempArray);

        },
        fail: function (xhr, textStatus, errorThrown) {
          $("#progress").hide();
          console.log(errorThrown);
        }


      });




      self.data2 = new ArrayDataProvider(self.data1);

      self.messages = [];
      self.errorMessageTimeout = ko.observable('0');
      self.messagesArray = ko.observableArray(self.messages);
      self.messagesDataprovider = new ArrayDataProvider(self.messagesArray);







      self.saveSelections = function () {
        $("#progress").show();
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
              IDENTIFICATION_STATUS: data[i].IDENTIFICATION_STATUS[0],
              IS_MULTISELECT: ['UNCHECKED']

            }
            tmp.push(obj);


          } else {
            var obj = {
              COLUMN_ID: data[i].COLUMN_ID,
              COLUMN_NAME: data[i].COLUMN_NAME,
              DISPLAY_NAME: data[i].DISPLAY_NAME,
              IDENTIFICATION_STATUS: "UNCHECKED",
              IS_MULTISELECT:"UNCHECKED"
            }
            tmp2.push(obj)
          }

        }

        console.log(tmp);


        var formData = { data: tmp, unchecked: tmp2 };

        $.ajax({
          url: host + "/api/v1/update/identification/columns",
          data: JSON.stringify(formData),
          type: 'POST',
          dataType: 'json',
          contentType: 'application/json',
          headers: {
            "Project_Id": localStorage.getItem('project_id')
          },
          success: function (data, textStatus, jqXHR) {

            console.log(data);


            if (data.success == true) {

              var success = {
                severity: 'confirmation',
                summary: 'Success',
                detail: "Identified Columns saved successfully",
                autoTimeout: parseInt(self.errorMessageTimeout())
              }
              $("#progress").hide();
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





      self.selectAll = function () {
        var tempArray = [];
        for (let i = 0; i < self.data1().length; i++) {
         
          var obj = {
            COLUMN_ID: self.data1()[i].COLUMN_ID,
            COLUMN_NAME: self.data1()[i].COLUMN_NAME,
            DISPLAY_NAME: self.data1()[i].DISPLAY_NAME,
            IDENTIFICATION_STATUS: ['CHECKED'],
            DISABLED_STATUS : self.data1()[i].DISABLED_STATUS,
            IS_MANDATORY: self.data1()[i].IS_MANDATORY,
            IS_MULTISELECT: self.data1()[i].IS_MULTISELECT
          }
         if (self.data1()[i].DISABLED_STATUS == false){
          self.data1()[i].IDENTIFICATION_STATUS =['CHECKED']
         }

          tempArray.push(obj);
        
        }
        

        self.data1(tempArray);
      }



      self.deSelectAll = function () {
        var tempArray = [];
        var tempArray1 = [];
        for (let i = 0; i < self.data1().length; i++) {
          var obj= {
            COLUMN_ID: self.data1()[i].COLUMN_ID,
            COLUMN_NAME: self.data1()[i].COLUMN_NAME,
            DISPLAY_NAME: self.data1()[i].DISPLAY_NAME,
            IDENTIFICATION_STATUS: ['CHECKED'],
            DISABLED_STATUS : self.data1()[i].DISABLED_STATUS,
            IS_MULTISELECT: self.data1()[i].IS_MULTISELECT,
            IS_MANDATORY: self.data1()[i].IS_MANDATORY
          }
          

          if (self.data1()[i].DISABLED_STATUS == true && self.data1()[i].IS_MANDATORY == 'Y'){
             self.data1()[i].IDENTIFICATION_STATUS =['CHECKED']
            var obj1= {
              COLUMN_ID: self.data1()[i].COLUMN_ID,
              COLUMN_NAME: self.data1()[i].COLUMN_NAME,
              DISPLAY_NAME: self.data1()[i].DISPLAY_NAME,
              IDENTIFICATION_STATUS: self.data1()[i].IDENTIFICATION_STATUS,
              DISABLED_STATUS : self.data1()[i].DISABLED_STATUS,
              IS_MULTISELECT: self.data1()[i].IS_MULTISELECT,
              IS_MANDATORY: self.data1()[i].IS_MANDATORY
            }
                tempArray.push(obj1);
        
           } else{

            self.data1()[i].IDENTIFICATION_STATUS =['UNCHECKED']
            var obj2 = {
              COLUMN_ID: self.data1()[i].COLUMN_ID,
              COLUMN_NAME: self.data1()[i].COLUMN_NAME,
              DISPLAY_NAME: self.data1()[i].DISPLAY_NAME,
              IDENTIFICATION_STATUS: self.data1()[i].IDENTIFICATION_STATUS ,
              DISABLED_STATUS : self.data1()[i].DISABLED_STATUS,
              IS_MULTISELECT: self.data1()[i].IS_MULTISELECT,
              IS_MANDATORY: self.data1()[i].IS_MANDATORY
            }
            tempArray.push(obj2);
           }
  

          

        // for(let j=0; j<tempArray.length; j++){
        //   if(tempArray[j].IS_MANDATORY === 'Y'){}
        // }

        
        
        }
        self.data1(tempArray);
      }
























      //At the start of your viewModel constructor
      var busyContext = oj.Context.getContext(context.element).getBusyContext();
      var options = { "description": "CCA Startup - Waiting for data" };
      self.busyResolve = busyContext.addBusyState(options);

      self.composite = context.element;

      //Example observable
      self.messageText = ko.observable('Hello from Example Component');
      self.properties = context.properties;
      self.res = componentStrings['entity-identification-subview'];

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