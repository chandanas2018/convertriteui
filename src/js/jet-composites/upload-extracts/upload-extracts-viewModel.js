/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/


'use strict';
define(
  ['knockout', 'jquery', 'ojL10n!./resources/nls/upload-extracts-strings', 'ojs/ojarraydataprovider', 'ojs/ojbutton', 'ojs/ojfilepicker', 'ojs/ojmessages'],
 function (ko, $, componentStrings, ArrayDataProvider) {

    function ExampleComponentModel(context) {
      // require(['require','../js/configuration.js']),
      var self = this;

    
     
     
      self.entityList = [];
      self.entityListArray = ko.observableArray(self.entityList);

      self.dataProvider = new ArrayDataProvider(self.entityListArray);
      
      //  $.getJSON("../js/appconfig.json").then(function(x){
      //   sessionStorage.setItem("hostname",x.host) ;
        
      // })
      var host = sessionStorage.getItem("hostname");
      // console.log("<<<<",host);
   

      $.ajax({
        url: host+"/api/v1/upload/extracts",
        type: 'GET',
        //dataType: 'json',

        success: function (data, textStatus, jqXHR) {
          $("#progressup").show();
          console.log(data);
          
          

          // var tempArray = [];

          for (let i = 0; i < data.data.length; i++) {
            self.entityList.push(data.data[i]);
            //  var x = data.data[i].TIMESTAMP;
            //  var format = new Date(x).toUTCString();
            //   data.data[i].TIMESTAMP = format

          }
          $("#progressup").hide();
          self.entityListArray(self.entityList);
          // self.entityListArray(tempArray);
          // self.dataProviderForDestinationEntity(tempArray);

        },
        fail: function (xhr, textstatus, errorThrown) {
          console.log(errorThrown)
          var error = {
            severity: 'error',
            summary: 'error in loading entities',
            detail: data.data[row].errorMsg,
            autoTimeout: parseInt(self.errorMessageTimeout())
          }
          
          self.messagesArray.push(error);

          // var errorMessage = xhr.status + ': ' + xhr.statusText
          //alert('Error - ' + errorMessage);
          //      var servererror ={
          //                 severity: 'error',
          //                   summary: 'Internal server error()',
          //                   detail: errorMessage,
          //                   autoTimeout: parseInt(self.errorMessageTimeout())
          //               }
          //               self.messagesArray.push(servererror);
        
          $("#progressup").hide();
        }
        
      });



      self.checkValue = ko.observableArray();
      self.nowrap = ko.pureComputed(function () {
        return (typeof self.checkValue()[0] !== 'undefined' && self.checkValue()[0] != null &&
          self.checkValue()[0] === "nowrap") ? true : false;
      }.bind(self));

      self.fileNames = ko.observableArray([]);

      self.messages = [

      ];
      self.errorMessageTimeout = ko.observable('20000');
      self.messagesArray = ko.observableArray(self.messages);
      self.messagesDataprovider = new ArrayDataProvider(self.messagesArray);





      self.selectListener = function (event, current, bindingContext) {
        // console.log(data);
        alert(event.detail.files[0].name.split(".")[0])
        if (current.data.ENTITY_NAME == event.detail.files[0].name.split(".")[0]) {

          if (event.detail.files[0].name.split(".")[1] == "csv") {
            // $(".loader").show();

            var files = event.detail.files;
            for (var i = 0; i < files.length; i++) {
              self.fileNames.push(files[i].name);
            }

            var formdata = new FormData();


            var file = new File([event.detail.files], event.detail.files[0].name, {
              type: "text/plain",
            });

            console.log(file);
            //  formdata.append("myFile", file,file.name);
            formdata.append("myFile", event.detail.files[0]);
         
            $.ajax({
              url: host+"/api/v1/uploadfile",
              data: formdata,
              type: 'POST',
              dataType: 'json',
              processData: false,
              contentType: false,
              success: function (data, textStatus, jqXHR) {
                $(".#status").show();

                console.log(data);
                var str = 'ORA' + '-' + '00' + data.error.errorNum;
                console.log(str);

                if (data.success == true) {


                  self.entityList[current.index].UPLOAD_STATUS = "UPLOADED";
                  self.entityListArray(self.entityList);
                  // self.entityListArray()[current.index].UPLOAD_STATUS= "UPLOADED";
                  var success = {
                    severity: 'confirmation',
                    summary: 'File Upload success',
                    detail: "File is uploaded and stored",
                    autoTimeout: parseInt(self.errorMessageTimeout())
                  }
                  $("#status").hide();
                  self.messagesArray.push(success);
                }
                else {
                  //for errorlist 
                  $.ajax({
                    url: host+"/api/v1/oracle/errors",
                    type: 'POST',
                    dataType: "json",
                    processData: false,
                    contentType: false,
                    success: function (data, textStatus, jqXHR) {
                      $("#status").hide();
                      console.log(data);
                      for (var row = 0; row < data.data.length; row++) {
                        if (data.data[row].errorNum == str) {
                          console.log('hello');
                         
                          var error = {
                            severity: 'error',
                            summary: 'Error while uploading a file',
                            detail: data.data[row].errorMsg,
                            autoTimeout: parseInt(self.errorMessageTimeout())
                          }
                          $("#status").hide();
                          self.messagesArray.push(error);
                        }
                      }
                    },
                     error: function (xhr, status, error) {
                    // fail: function (xhr, textstatus, errorThrown) {
                      console.log(errorThrown)
                      $("#status").hide();
                      var errorMessage = xhr.status + ': ' + xhr.statusText

                      var servererror = {
                        severity: 'error',
                        summary: 'Internal server error',
                        detail: errorMessage,
                        autoTimeout: parseInt(self.errorMessageTimeout())
                      }
                      self.messagesArray.push(servererror);
                    }
                  })
                }

              },
              error: function (xhr, status, error) {
              // fail: function (xhr, textstatus, errorThrown) {
                console.log(errorThrown)
                var errorMessage = xhr.status + ': ' + xhr.statusText
                var servererror = {
                  severity: 'error',
                  summary: 'Internal server error',
                  detail: errorMessage,
                  autoTimeout: parseInt(self.errorMessageTimeout())
                }
                self.messagesArray.push(servererror);


                //alert('Error - ' + errorMessage);


              }
            });





          } else {

            var error = {
              severity: 'error',
              summary: 'Invalid file Format',
              detail: "Should upload file in csv format only.",
              autoTimeout: parseInt(self.errorMessageTimeout())
            }
            self.messagesArray.push(error);
            //Invalid file format
          }

        } else {


          var error = {
            severity: 'error',
            summary: 'Invalid file name',
            detail: "Name of the uploaded file should match with the name of the entity.",
            autoTimeout: parseInt(self.errorMessageTimeout())
          }

          self.messagesArray.push(error);

          //name of the entity should match with the name of the uploaded file.
        }




      }


      //At the start of your viewModel constructor
      var busyContext = oj.Context.getContext(context.element).getBusyContext();
      var options = { "description": "CCA Startup - Waiting for data" };
      self.busyResolve = busyContext.addBusyState(options);

      self.composite = context.element;

      //Example observable
      self.messageText = ko.observable('Hello from Example Component');
      self.properties = context.properties;
      self.res = componentStrings['upload-extracts'];
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