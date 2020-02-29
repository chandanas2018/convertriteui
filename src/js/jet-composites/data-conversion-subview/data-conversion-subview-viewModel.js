/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
  ['knockout', 'jquery', 'ojL10n!./resources/nls/data-conversion-subview-strings', 'ojs/ojpagingdataproviderview', 'ojs/ojarraydataprovider', 'ojs/ojdialog', 'ojs/ojmessages'],
  function (ko, $, componentStrings, PagingDataProviderView, ArrayDataProvider) {

    function ExampleComponentModel(context) {
      var self = this;

      var host = sessionStorage.getItem("hostname")

      self.nowrap = ko.observable(false);
      self.checkValue = ko.observableArray();

      self.dircolumn = ko.pureComputed(function () {
        return (typeof self.checkValue()[0] !== 'undefined' && self.checkValue()[0] != null &&
          self.checkValue()[0] === "dirColumn") ? true : false;
      }.bind(self));

      self.showPreview = ko.observable();
      self.loadPreview = function () {

        // var inf = 'some text here';
        // win = window.open(", ", 'popup', 'toolbar = no, status = no');
        // win.document.write("" + inf + "");


        //           var win = window.open('mywindow');
        // win.document.write('<h1>Popup Test!</h1>');

        self.showPreview('true');

        for (let i = 0; i < self.previewArray().length; i++) {

          if (self.previewArray()[i].sourceEntityName == context.properties.entityName) {

            var obj2 = {


              SNO: self.previewArray()[i].sourceColumnName,
              SourceField: self.previewArray()[i].destinationEntityName,
              DestinationField: self.previewArray()[i].destinationColumnName,
              Message: 'Column Rule  N to 1 filedmapping check. Multiple sourceColumns cannot have a single destinationColumn'
            }

            deptArray.push(obj2);

          }

        }
      }

      self.closePreview = function () {

        self.showPreview('false');

      }

      var previewArray1 = [];
      self.previewArray = ko.observableArray(previewArray1);

      $.ajax({
        url: host + "/api/v1/source/columns",
        type: 'POST',
        // dataType: 'json',

        success: function (data, textStatus, jqXHR) {

          console.log(data);
          var tempArray = [];
          for (let i = 0; i < data.data.length; i++) {
            for (let j = 0; j < data.data[i].DestinationColumns.length; j++) {

              var obj = {
                sourceEntityName: data.data[i].SourceColumnInfo[j].entity,
                sourceColumnName: data.data[i].SourceColumnInfo[j].column,
                destinationEntityName: data.data[i].DestinationEntity,
                destinationColumnName: data.data[i].DestinationColumns[j]

              }
              // previewArray.push(obj);
              tempArray.push(obj);

            }
          }
          self.previewArray(tempArray);
          console.log(self.previewArray());

        },
        fail: function (xhr, textStatus, errorThrown) {
          console.log(errorThrown);

        }
      });


      self.messages = [
      ];
      self.errorMessageTimeout = ko.observable('');
      self.messagesArray = ko.observableArray(self.messages);
      self.messagesDataprovider = new ArrayDataProvider(self.messagesArray);

      self.supervisor = function () {
        $("#validatestatus").show();
        $.ajax({

          url: host + "/api/v1/supervisior/hdl",
          type: 'GET',
          // dataType: 'json',

          success: function (data, textStatus, jqXHR) {

            console.log(data);

            var filePath = host  +data.loc;

            saveAs(filePath, "Supervisor.dat");


            var success = {
              severity: 'confirmation',
              summary: 'Success',
              detail: "Supervisor file Downloaded Successfully",
              autoTimeout: parseInt(self.errorMessageTimeout())
            }
            $("#validatestatus").hide();
            self.messagesArray.push(success);

          },
          error: function (xhr, textStatus, errorThrown) {

            console.log(errorThrown);
            var error = {
              severity: 'error',
              summary: 'Error',
              detail: "Supervisor File Downloaded failed",
              autoTimeout: parseInt(self.errorMessageTimeout())

            }
            $("#validatestatus").hide();
            self.messagesArray.push(error);
          }
        });


      }

      self.saveFile = function () {

        $("#validatestatus").show();
        $.ajax({

          url: host + "/api/v1/download/hdl",
          type: 'GET',
          // dataType: 'json',

          success: function (data, textStatus, jqXHR) {

            console.log(data);

            var filePath = host + data.loc;

            saveAs(filePath, "Worker.dat");


            var success = {
              severity: 'confirmation',
              summary: 'Success',
              detail: "HDL File Downloaded Successfully",
              autoTimeout: parseInt(self.errorMessageTimeout())
            }
            $("#validatestatus").hide();
            self.messagesArray.push(success);

          },
          error: function (xhr, textStatus, errorThrown) {

            console.log(errorThrown);
            var error = {
              severity: 'error',
              summary: 'Error',
              detail: "HDL File Downloaded failed",
              autoTimeout: parseInt(self.errorMessageTimeout())

            }
            $("#validatestatus").hide();
            self.messagesArray.push(error);
          }
        });





        // download('hdls/test.dat', "dlText.DAT", "text/plain");




        // var dataobj = "METADATA|Worker|PersonId|EffectiveStartDate|EffectiveEndDate|PersonNumber|BloodType|CorrespondenceLanguage|StartDate|DateOfBirth|DateOfDeath|CountryOfBirth|RegionOfBirth|TownOfBirth|ApplicantNumber|CategoryCode|ActionCode|ReasonCode|GUID|SourceSystemOwner|SourceSystemId" + "\r\n"+
        // " MERGE|Worker||2016/08/15|4712/12/31|12304297123121||US|2016/08/15|1969/07/24||US|||||HIRE||||" +  "\r\n" +

        //  "METADATA|PersonEthnicity|EthnicityId|PersonId|PersonNumber|LegislationCode|DeclarerId|DeclarerPersonNumber|Ethnicity|PrimaryFlag|GUID|SourceSystemOwner|SourceSystemId" +"\r\n"+
        //  "MERGE|PersonEthnicity|||12304297123121|US|||1|Y|||";


        //  download(dataobj, "dlText.DAT", "text/plain");
      }





      var deptArray = [

        //       {
        //           SNO: 'Error',
        //           SourceField: 'BLOOD_TYPE ',
        //           DestinationField: 'DEPARTMENT_NAME',
        //           Message: 'Column Rule  N to 1 filedmapping check. Multiple sourceColumns cannot have a single destinationColumn'
        //       },
        //       {
        //         SNO: 'Warning',
        //         SourceField: 'USER_PERSON_TYPE',
        //         DestinationField: '',
        //         Message: 'SourceColumn is not mapped with any of the destination columns'
        //     },
        //     {
        //       SNO: 'Success',
        //       SourceField: 'DRIVER_LICENSE_COUNTRY',
        //       DestinationField: ' LDG_NAME',
        //       Message: 'Mapped Successfully'
        //   },
        //   {
        //     SNO: 'Error',
        //           SourceField: 'DRIVER_LICENSE_COUNTRY ',
        //           DestinationField: 'LDG_NAME',
        //           Message: 'Data rule N to 1 mapping check. single sourceData cannot have multiple destinationData(us-haiti, us-unitedstates)'
        // },

      ];



      self.pagingDataProvider = new PagingDataProviderView(new ArrayDataProvider(deptArray, { idAttribute: 'DepartmentId' }));


      //At the start of your viewModel constructor
      var busyContext = oj.Context.getContext(context.element).getBusyContext();
      var options = { "description": "CCA Startup - Waiting for data" };
      self.busyResolve = busyContext.addBusyState(options);

      self.composite = context.element;

      //Example observable
      self.messageText = ko.observable('Hello from Example Component');
      self.properties = context.properties;
      self.res = componentStrings['data-conversion-subview'];
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