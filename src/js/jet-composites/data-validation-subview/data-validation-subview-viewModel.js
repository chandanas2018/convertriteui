/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
  ['knockout', 'jquery', 'ojL10n!./resources/nls/data-validation-subview-strings', 'ojs/ojpagingdataproviderview', 'ojs/ojarraydataprovider', 'ojs/ojattributegrouphandler', 'ojs/ojtable',
    , 'ojs/ojpagingcontrol', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojchart', 'ojs/ojcheckboxset'],
  function (ko, $, componentStrings, PagingDataProviderView, ArrayDataProvider, attributeGroupHandler) {

    function ExampleComponentModel(context) {
      var self = this;
      var host = sessionStorage.getItem('hostname');
      self.dataLoaded = ko.observable('no');

      self.selectedItem = ko.observable("Table view");

      self.display = ko.observable("all");
      self.edge = ko.observable("top");
      self.threeDValue = ko.observable('off');
      $.ajax({
        url: host+'/getValidations',
        type: 'get',
        dataType: 'json',
        success: function(jsondata, textStatus, jqXHR) {
         
     
        var data  =  jsondata;

        self.orientationValue = ko.observable('vertical');
      self.xAxisRenderedValue = ko.observable('off');
      self.barSeriesValue = ko.observableArray();
      self.barGroupsValue = ko.observableArray();
      self.dataSet = ko.observable("success");
      self.resetColors = ko.observableArray();
      // data = JSON.parse(data);
      data = data;
      self.chartData = ko.observableArray(data[self.dataSet()]);
      self.dataProvider = new ArrayDataProvider(self.chartData, { keyAttributes: 'id' });
      self.colorHandler = new attributeGroupHandler.ColorAttributeGroupHandler();

      var getLegendData = function (data, colorHandler) {
        var items = [];
        for (var i = 0; i < data.length; i++) {
          items.push({
            value: data[i].value,
            text: data[i].drink,
            color: colorHandler.getValue(data[i].drink),
          });
        }
        return [{ items: items }];
      };

      self.legendSectionsValue = ko.observableArray(getLegendData(self.chartData(), self.colorHandler));

      /* Switch between data1 and data2 */
      self.changeData = function () {
        if (self.resetColors()[0] == "reset")
          self.colorHandler = new attributeGroupHandler.ColorAttributeGroupHandler();

        self.chartData(data[self.dataSet()]);
        self.legendSectionsValue(getLegendData(self.chartData(), self.colorHandler));
      }.bind(self);

      // When the orientation is vertical, render the legend and hide the x-axis.
      // When the orientation is horizontal, do the opposite.
      self.orientationValue.subscribe(function (newOrientation) {
        var isVertical = (newOrientation == 'vertical');
        self.xAxisRenderedValue(isVertical ? 'off' : 'on');
      }.bind(self));



      self.nowrap = ko.observable(false);

      self.checkValue = ko.observableArray();

      self.dircolumn = ko.pureComputed(function () {
        return (typeof self.checkValue()[0] !== 'undefined' && self.checkValue()[0] != null &&
          self.checkValue()[0] === "dirColumn") ? true : false;
      }.bind(self));

      var errorsObject = [];
      var warningsObject = [];
      var successObject = [];
      var validationObject = [];

      // for(let i=0; i<errorsObject.length;i++){
      //   var obj = {

      //     SNO : errorsObject()[i].SNO,
      //     SourceField: errorsObject()[i].SNO,
      //     DestinationField: errorsObject()[i].SNO,
      //     Message:  errorsObject()[i].SNO



      //   }

      //   deptArray.push(obj);
      // }


      var errorsObject1 = [];
      self.errorsObject2 = ko.observableArray(errorsObject1);
      self.warningsObject = ko.observableArray();
      self.successObject = ko.observableArray();
      self.successCount = ko.observable();
      self.warningsCount = ko.observable();
      self.errorsCount = ko.observable();

      $.ajax({
        url: "http://localhost:3333/validation",
        type: 'GET',
        // dataType: 'json',

        success: function (data, textStatus, jqXHR) {

          console.log(data);
          if(data.success == true){
            self.dataLoaded('yes');
          }

          var tempArray = [];

          for (let i = 0; i < data.data.errors.length; i++) {
            for (let j = 0; j < data.data.errors[i].message.data.length; j++) {

              var obj = {

                SNO: 'Error',
                SourceField: data.data.errors[i].message.data[j].sourcecolumn,
                DestinationField: data.data.errors[i].message.data[j].destinationcolumn,
                Message: data.data.errors[i].rule.ruleinfo + data.data.errors[i].message.msg

              }

              tempArray.push(obj);
              deptArray.push(obj);

              // deptArray.push(obj);
              self.errorsObject2(tempArray);

              var errorcount = self.errorsObject2().length;

              self.errorsCount(errorcount);
              // errorsObject.push(obj);
              validationObject.push(obj);
            }
          }




          // self.loadErrorData();

          console.log(self.errorsObject2);


          var tempArray2 = [];
          for (let i = 0; i < data.data.warnings.length; i++) {
          

            var obj = {

              SNO: 'Warning',
              SourceField: data.data.warnings[i].message.data.sourcecolumnnames + '(source Value Count is' + data.data.warnings[i].message.data.sourcevaluecount + ')',
              DestinationField: 'Mapped Value Count is ' + data.data.warnings[i].message.data.mappedvaluecount,
              Message: data.data.warnings[i].rule.ruleinfo + data.data.warnings[i].message.msg



            }

            tempArray.push(obj);
            tempArray2.push(obj);
            deptArray.push(obj);
         
            self.errorsObject2(tempArray);

            self.warningsObject(tempArray2);

            var warningCount = self.warningsObject().length;
            self.warningsCount(warningCount);
         
            validationObject.push(obj);
  
          }



        },
        fail: function (xhr, textStatus, errorThrown) {

          console.log(errorThrown);
        }
      });


      var deptArray = [

        // {
        //   SNO: 'Error',
        //   SourceField: 'BLOOD_TYPE ',
        //   DestinationField: 'DEPARTMENT_NAME',
        //   Message: 'Column Rule  N to 1 filedmapping check. Multiple sourceColumns cannot have a single destinationColumn'
        // },
        // {
        //   SNO: 'Warning',
        //   SourceField: 'USER_PERSON_TYPE',
        //   DestinationField: '',
        //   Message: 'SourceColumn is not mapped with any of the destination columns'
        // },
        // {
        //   SNO: 'Success',
        //   SourceField: 'DRIVER_LICENSE_COUNTRY',
        //   DestinationField: ' LDG_NAME',
        //   Message: 'Mapped Successfully'
        // },
        // {
        //   SNO: 'Error',
        //   SourceField: 'DRIVER_LICENSE_COUNTRY ',
        //   DestinationField: 'LDG_NAME',
        //   Message: 'Data rule N to 1 mapping check. single sourceData cannot have multiple destinationData(us-haiti, us-unitedstates)'
        // },
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
      ];

      self.pagingDataProvider = new PagingDataProviderView(new ArrayDataProvider(deptArray, { idAttribute: 'DepartmentId' }));


      self.downloadValidations = function(){
        var sheetData1 = [];
      
        var sheetData = [];
        var sheetNames = [{sheetid:'Sheet One',header:true}];
      
        for(let i=0;i<deptArray.length;i++){
          var obj ={
                  SNO: deptArray[i].SNO,
                  sourceField: deptArray[i].SourceField,
                  destinationField: deptArray[i].DestinationField,
                  Message: deptArray[i].Message
                }
      
                sheetData1.push(obj);
        }
        sheetData.push(sheetData1);
      
      // for(let i=0; i<deptArray.length; i++){
      //   sheetData.push([deptArray[i]]);
      // }
      
        // sheetData.push(deptArray[0]);
      //   for (let i = 0; i < deptArray.length; i++) {
      //     var tempArray =[];
      //     var obj ={
      //       SNO: deptArray[i].SNO,
      //       sourceField: deptArray[i].SourceField,
      //       destinationField: deptArray[i].DestinationField,
      //       Message: deptArray[i].Message
      //     }
      // tempArray.push(obj);
      
      //     sheetData.push(tempArray);
      
      //   }
        var result = alasql('SELECT * INTO XLSX("Validations.xlsx",?) FROM ?',
          [sheetNames, sheetData]);
      
                // var sheet_1_data = data1;
          // var sheet_1_data = [{Col_One:1, Col_Two:11}, {Col_One:2, Col_Two:22}];
          // var sheet_2_data = [{Col_One:10, Col_Two:110}, {Col_One:20, Col_Two:220}];
          // var opts = [{sheetid:'Sheet One',header:true},{sheetid:'Sheet Two',header:false}];
          // var result = alasql('SELECT * INTO XLSX("sample_file.xlsx",?) FROM ?', 
          //                   [opts,[sheet_1_data ,sheet_2_data]]);
      
      
        //   var opts = [{sheetid:'Sheet One',header:true}];
        //  var result = alasql('SELECT * INTO XLSX("validation.xlsx",?) FROM ?', 
        //                                       [opts,deptArray]);
      
      }

 //At the start of your viewModel constructor
 var busyContext = oj.Context.getContext(context.element).getBusyContext();
 var options = { "description": "CCA Startup - Waiting for data" };
 self.busyResolve = busyContext.addBusyState(options);

 self.composite = context.element;

 //Example observable
 self.messageText = ko.observable('Hello from Example Component');
 self.properties = context.properties;
 self.res = componentStrings['data-validation-subview'];
 // Example for parsing context properties
 // if (context.properties.name) {
 //     parse the context properties here
 // }

 //Once all startup and async activities have finished, relocate if there are any async activities
 self.busyResolve();

        }
      });
      


      

      

      


      
      
      // self.loadErrorData = function(){
      //   for(let i=0; i<self.errorsObject2().length;i++){
      //     var obj = {

      //       SNO : self.errorsObject2()[i].SNO,
      //       SourceField: self.errorsObject2()[i].SNO,
      //       DestinationField: self.errorsObject2()[i].SNO,
      //       Message:  self.errorsObject2()[i].SNO



      //     }

      //     deptArray.push(obj);
      //   }
      // }



      


      


     

     
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