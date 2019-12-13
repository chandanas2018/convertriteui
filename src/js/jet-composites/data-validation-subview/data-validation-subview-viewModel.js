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

      self.dataLoaded = ko.observable('no');

      self.selectedItem = ko.observable("Table view");

      self.display = ko.observable("all");
      self.edge = ko.observable("top");
      var data = {
        "2018": [
          // {
          //   "id": 0,
          //   "year": "2018",
          //   "drink": "Coke",
          //   "value": 42
          // },
          // {
          //   "id": 1,
          //   "year": "2018",
          //   "drink": "Fanta",
          //   "value": 55
          // },
          // {
          //   "id": 2,
          //   "year": "2018",
          //   "drink": "Sprite",
          //   "value": 36
          // },
          // {
          //   "id": 3,
          //   "year": "2018",
          //   "drink": "Dr Pepper",
          //   "value": 22
          // },
          // {
          //   "id": 4,
          //   "year": "2018",
          //   "drink": "Pepsi",
          //   "value": 12
          // }
        ],
        "2017": [
          {
            "id": 5,
            "year": "2017",
            "drink": "Coversions",
            "value": 1
          },
          {
            "id": 6,
            "year": "2017",
            "drink": "Warnings",
            "value": 1
          },
          {
            "id": 7,
            "year": "2017",
            "drink": "Errors",
            "value": 2
          },
          // {
          //   "id": 8,
          //   "year": "2017",
          //   "drink": "Root Beer",
          //   "value": 34
          // },
          // {
          //   "id": 9,
          //   "year": "2017",
          //   "drink": "Sunkist",
          //   "value": 30
          // }
        ]
      }

      // var data=  [
      //   {
      //     "id": 0,
      //     "series": "Series 1",
      //     "group": "Group A",
      //     "value": 42
      //   },
      //   {
      //     "id": 1,
      //     "series": "Series 1",
      //     "group": "Group B",
      //     "value": 34
      //   },
      //   {
      //     "id": 2,
      //     "series": "Series 2",
      //     "group": "Group A",
      //     "value": 55
      //   },
      //   {
      //     "id": 3,
      //     "series": "Series 2",
      //     "group": "Group B",
      //     "value": 30
      //   },
      //   {
      //     "id": 4,
      //     "series": "Series 3",
      //     "group": "Group A",
      //     "value": 36
      //   },
      //   {
      //     "id": 5,
      //     "series": "Series 3",
      //     "group": "Group B",
      //     "value": 50
      //   },
      //   {
      //     "id": 6,
      //     "series": "Series 4",
      //     "group": "Group A",
      //     "value": 22
      //   },
      //   {
      //     "id": 7,
      //     "series": "Series 4",
      //     "group": "Group B",
      //     "value": 46
      //   },
      //   {
      //     "id": 8,
      //     "series": "Series 5",
      //     "group": "Group A",
      //     "value": 22
      //   },
      //   {
      //     "id": 9,
      //     "series": "Series 5",
      //     "group": "Group B",
      //     "value": 46
      //   }
      // ]        

      //         this.stackValue = ko.observable('off');
      //         this.orientationValue = ko.observable('vertical');
      //         this.dataProvider = new ArrayDataProvider((data), {keyAttributes: 'id'});


      this.orientationValue = ko.observable('vertical');
      this.xAxisRenderedValue = ko.observable('off');
      this.barSeriesValue = ko.observableArray();
      this.barGroupsValue = ko.observableArray();
      this.dataSet = ko.observable("2017");
      this.resetColors = ko.observableArray();
      // data = JSON.parse(data);
      data = data;
      this.chartData = ko.observableArray(data[this.dataSet()]);
      this.dataProvider = new ArrayDataProvider(this.chartData, { keyAttributes: 'id' });
      this.colorHandler = new attributeGroupHandler.ColorAttributeGroupHandler();

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

      this.legendSectionsValue = ko.observableArray(getLegendData(this.chartData(), this.colorHandler));

      /* Switch between data1 and data2 */
      this.changeData = function () {
        if (this.resetColors()[0] == "reset")
          this.colorHandler = new attributeGroupHandler.ColorAttributeGroupHandler();

        this.chartData(data[this.dataSet()]);
        this.legendSectionsValue(getLegendData(this.chartData(), this.colorHandler));
      }.bind(this);

      // When the orientation is vertical, render the legend and hide the x-axis.
      // When the orientation is horizontal, do the opposite.
      this.orientationValue.subscribe(function (newOrientation) {
        var isVertical = (newOrientation == 'vertical');
        this.xAxisRenderedValue(isVertical ? 'off' : 'on');
      }.bind(this));



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