

/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
  ['knockout', 'jquery', 'ojL10n!./resources/nls/project-list-strings', 'ojs/ojarraydataprovider', 'ojs/ojmessages', 'ojs/ojbutton', 'ojs/ojmessages', 'project-management/loader', 'upload-extracts/loader', 'entity-identification/loader', 'entity-mapping/loader', 'data-mapping/loader', 'data-validation/loader', 'data-conversion/loader', 'ojs/ojdialog', 'ojs/ojinputtext', 'ojs/ojformlayout', 'ojs/ojselectcombobox'],

  function (ko, $, componentStrings, ArrayDataProvider) {

    function ExampleComponentModel(context) {
      var self = this;
      var host = sessionStorage.getItem("hostname")

      self.val1 = ko.observable('');
      self.val2 = ko.observable('');
      self.val3 = ko.observable('');
      self.messages = [];
      self.errorMessageTimeout = ko.observable('0');
      self.messagesArray = ko.observableArray(self.messages);
      self.messagesDataprovider = new ArrayDataProvider(self.messagesArray);


      self.Nextupload = function () {
        $("#ebsscreen").hide();
        $("#employeeextracts").hide();
        $("#mainscreen").show();
        self.selectedItem("Upload Extracts");
      }


      self.skip = function () {
        $("#employeeextracts").hide();
        $("#mainscreen").show();
        self.selectedItem("Entity Identification");
      }

      self.employeeextract = function () {
        var entityvalue = (combobox3.value);
        if (entityvalue == 0) {
          var warning = {
            severity: 'error',
            summary: 'Error',
            detail: "Please select the Entity",
            autoTimeout: parseInt(self.errorMessageTimeout(), 10)
          }
          self.messagesArray.push(warning);
        } else {
          $("#progressex").show();
          $.ajax({
            url: host + '/csv',
            type: 'GET',
            data: { entity: entityvalue },
            success: function (data, textStatus, jqXHR) {

              console.log(data);
              var filePath = host + data.loc;
              saveAs(filePath, entityvalue + ".csv");
              var success = {
                severity: 'confirmation',
                summary: 'Success',
                detail: "Extracted Successfully",
                autoTimeout: parseInt(self.errorMessageTimeout())
              }
              $("#progressex").hide();
              self.messagesArray.push(success);
            },
            error: function (xhr, textStatus, errorThrown) {

              console.log(errorThrown);

              var warning = {
                severity: 'error',
                summary: 'Error',
                detail: "File Downloading Incomplete",
                autoTimeout: parseInt(self.errorMessageTimeout(), 10)
              }
              $("#progressex").hide();
              self.messagesArray.push(warning);

            }
          });

        }

      }


      self.extract = function () {
        var entityvalue = (combobox1.value);
        var sourcevalue = (combobox2.value);
        if (entityvalue == 0 && sourcevalue == 0) {
          var warning = {
            severity: 'error',
            summary: 'Error',
            detail: "Please select the Entity",
            autoTimeout: parseInt(self.errorMessageTimeout(), 10)
          }
          self.messagesArray.push(warning);
        } else if (entityvalue == 0 || sourcevalue == 0) {
          var warning = {
            severity: 'error',
            summary: 'Error',
            detail: "Please select the Entity",
            autoTimeout: parseInt(self.errorMessageTimeout(), 10)
          }
          self.messagesArray.push(warning);

        } else {
          $("#progressset").show();
          $.ajax({
            url: host + '/api/EbsExtracts',
            type: 'GET',
            data: { entity: entityvalue },
            success: function (data, textStatus, jqXHR) {
              // $("#progressset").show();
              console.log(data);
              var filePath = host + data.loc;
              saveAs(filePath, entityvalue + ".DAT");
              var success = {
                severity: 'confirmation',
                summary: 'Success',
                detail: "Extracted Successfully",
                autoTimeout: parseInt(self.errorMessageTimeout())
              }
              $("#progressset").hide();
              self.messagesArray.push(success);
            },
            error: function (xhr, textstatus, errorThrown) {
              console.log(errorThrown)

              var warning = {
                severity: 'error',
                summary: 'Error',
                detail: "Failed to Extract file.please try again",
                autoTimeout: parseInt(self.errorMessageTimeout(), 10)
              }
              $("#progressset").hide();
              self.messagesArray.push(warning);
            }
          });
        };
      }

      self.Back = function () {
        $("#ebsscreen").show();
        $("#mainscreen").hide();
        $("#employeeextracts").hide();

      }

      self.Home = function () {
        $("#ebsscreen").hide();

        self.loaded("one");

      }

      self.empextracts = function () {
        $("#ebsscreen").hide();
        $("#employeeextracts").show();
      }

      self.mainopen = function () {
        $("#ebsscreen").hide();
        $("#mainscreen").show();
        $("#employeeextracts").hide();

      }

      self.backempextracts = function () {
        $("#mainscreen").hide();
        $("#employeeextracts").show();
      }


      self.checkValue = ko.observableArray();
      self.dircolumn = ko.pureComputed(function () {
        return (typeof self.checkValue()[0] !== 'undefined' && self.checkValue()[0] != null &&
          self.checkValue()[0] === "dirColumn") ? true : false;
      }.bind(self));



      self.projectName = ko.observable();
      self.projectDescription = ko.observable();

      self.name = ko.observable();
      self.addNew = function () {
        // self.name('clicked');
        self.dataProvider.push({ name: "Payroll Data Migration", description: "Data migration projects typically require a lot of additional tools and project support platforms to function smoothly", status: "Upload Extracts" })
      };

      self.removeProject = function (event, current, bindingContext) {
        self.dataProvider.remove(current.data);
      };


      self.loaded = ko.observable("one");

      self.nowrap = ko.observable(false);



      self.close = function (event) {

        if (self.projectName() == undefined || self.projectDescription() == undefined) {

        } else {

          self.dataProvider.push({ name: self.projectName, description: self.projectDescription, status: "Upload Extracts" })
          document.getElementById('modalDialog1').close();
        }

      }

      self.open = function (event) {
        document.getElementById('modalDialog1').open();
      }

      $.ajax({
        url: host + "/api/v1/projects/list",
        data: { email: 'Linda@xyz.com' },
        type: 'POST',
        dataType: 'json',
        // contentType: 'application/json',
        // processData: false,
        // contentType: false,
        success: function (data, textStatus, jqXHR) {

          console.log(data);

        },
        fail: function (xhr, textStatus, errorThrown) {

          console.log(errorThrown);
        }
      });

      self.dataProvider = ko.observableArray([
        { name: "HR Data Migration", description: "We needed to convert employee compensation data from the legacy HR database.The old data was stored in much detail-by pay check and compensation type.", status: "Upload Extracts" },
        { name: "Payroll Data Migration", description: "Data migration projects typically require a lot of additional tools and project support platforms to function smoothly", status: "Upload Extracts" },
        // { name: "HBL Group Data Conversion", description:"We needed to convert employee compensation data from the legacy HR database.The old data was stored in much detail-by pay check and compensation type.", status: "Upload Extracts" },

      ]);
      self.projectName = ko.observable();



      self.openProject = function (event, current, bindingContext) {
        self.loaded("two");
        $("#ebsscreen").show();
        $(".nxtbtn").show();
        $("#mainscreen").hide();
        self.projectName(current.data.name);
      };

      self.nxtbtn = function () {
        $("#ebsscreen").hide();
        $("#mainscreen").show();
        $(".nxtbtn").hide();
      }

      self.buttonClick = function () {
        $("#ebsscreen").hide();

        $("#mainscreen").hide();
        self.loaded("one");
        $(".nxtbtn").hide();
      }

      self.save = function () {
        if (self.selectedItem() == "Upload Extracts") {
          self.selectedItem("Entity Mapping");
        }
      }


      self.next = function () {
        self.selectedItem("Entity Identification");
      }

      self.next1 = function () {
        self.selectedItem("Entity Mapping");
      }

      self.back1 = function () {
        self.selectedItem("Upload Extracts");
      }

      self.next2 = function () {
        self.selectedItem("Data Mapping");
      }

      self.back2 = function () {
        self.selectedItem("Entity Identification");
      }

      self.next3 = function () {
        self.selectedItem("Data Validation");
      }

      self.back3 = function () {
        self.selectedItem("Entity Mapping");
      }

      self.next4 = function () {
        self.selectedItem("Conversion");
      }

      self.back4 = function () {
        self.selectedItem("Data Mapping");
      }

      self.back = function () {
        self.selectedItem("Data Validation");
      }

      //   self.buttonClick = function(event){
      //     self.clickedButton(event.currentTarget.id);
      //     return true;
      // }.bind(self);

      self.selectedItem = ko.observable("Upload Extracts");
      self.display = ko.observable("all");
      self.edge = ko.observable("top");
      self.displaym = ko.observable('false');

      //At the start of your viewModel constructor
      var busyContext = oj.Context.getContext(context.element).getBusyContext();
      var options = { "description": "CCA Startup - Waiting for data" };
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