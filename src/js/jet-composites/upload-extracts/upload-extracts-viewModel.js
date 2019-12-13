/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
    ['knockout', 'jquery', 'ojL10n!./resources/nls/upload-extracts-strings','ojs/ojarraydataprovider', 'ojs/ojbutton','ojs/ojfilepicker','ojs/ojmessages'], 
    function (ko, $, componentStrings,ArrayDataProvider) {
    
    function ExampleComponentModel(context) {
        var self = this;
        self.entityList = [
          // { name: "PERSON" , status: "notuploaded"},
          // { name: "PERSON_NAME", status: "notuploaded"},
          // { name: "PERSON_NID", status: "notuploaded"},
          // { name: "DOCUMENTS_OF_RECORD_VO", status: "notuploaded"},
          // { name: "CITIZENSHIP_VO", status: "notuploaded"},
          // { name: "PERSON_LEGISLATIVE_INFO", status: "notuploaded"},
          // { name: "PERSON_ADDRESS", status: "notuploaded"},
          // { name: "PERSON_PHONE", status: "notuploaded"},
          // { name: "PERSON_EMAIL", status: "notuploaded"},
          // { name: "ASSIGNMENT", status: "notuploaded"},
          // { name: "ASSIGNMENT_EFF", status: "notuploaded"},
          // { name: "PERSON_SALARY", status: "notuploaded"},
          // { name: "SUPERVISOR", status: "notuploaded"},
          // { name: "CONTACT_RELATIONSHIP", status: "notuploaded"},
          // { name: "ELEMENT_ENTRIES", status: "notuploaded"},
          // { name: "ELEMENT_ENTRIES_VALUES", status: "notuploaded"},

         
        ];
        self.entityListArray = ko.observableArray(self.entityList);

        self.dataProvider = new ArrayDataProvider(self.entityListArray);

        $.ajax({
          url: "http://localhost:3333/api/v1/upload/extracts",
          type: 'GET',
          // dataType: 'json',
     
          success: function (data, textStatus, jqXHR) {
             
              console.log(data);
  
              // var tempArray = [];
              for(let i=0;i<data.data.length; i++){
                self.entityList.push(data.data[i]);
              }

              self.entityListArray(self.entityList);
  // self.entityListArray(tempArray);
              // self.dataProviderForDestinationEntity(tempArray);
  
          },
          fail: function(xhr, textStatus, errorThrown){
            
            console.log(errorThrown);
         }
      });



        self.checkValue = ko.observableArray();
        self.nowrap = ko.pureComputed(function(){
          return (typeof self.checkValue()[0] !== 'undefined' && self.checkValue()[0] != null &&
                  self.checkValue()[0] === "nowrap") ? true : false;
        }.bind(self));

        self.fileNames = ko.observableArray([]);

        self.messages = [
          // {
          //   severity: 'error',
          //   summary: 'Error message summary',
          //   detail: "Error message detail"
          // },
          // {
          //   severity: 'warning',
          //   summary: 'Warning message summary',
          //   detail: "Warning message detail"
          // },
          // {
          //   severity: 'confirmation',
          //   summary: 'Confirmation message summary',
          //   detail: "Confirmation message detail"
          // },
          // {
          //   severity: 'info',
          //   summary: 'Info message summary',
          //   detail: "Info message detail"
          // }
        ];
        self.errorMessageTimeout = ko.observable('0');
        self.messagesArray = ko.observableArray(self.messages);
          self.messagesDataprovider = new ArrayDataProvider(self.messagesArray);




  
        self.selectListener = function(event,current,bindingContext) {
          // console.log(data);
          if(current.data.ENTITY_NAME == event.detail.files[0].name.split(".")[0]){

            if(event.detail.files[0].name.split(".")[1] == "csv"){

  
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

              // self.entityList[current.index].status = "uploaded";
              // self.entityListArray(self.entityList);

              // self.entityListArray[current.index].UPLOAD_STATUS = "uploaded";

// var success ={
//               severity: 'confirmation',
//                 summary: 'File Upload success',
//                 detail: "File is uploaded and stored",
//                 autoTimeout: parseInt(self.errorMessageTimeout())
//             }
//             self.messagesArray.push(success);


        $.ajax({
            url: "http://localhost:3333/api/v1/uploadfile",
            data: formdata,
            type: 'POST',
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (data, textStatus, jqXHR) {
               
                console.log(data);

                if(data.success == true){
               
                self.entityList[current.index].UPLOAD_STATUS = "UPLOADED";
                self.entityListArray(self.entityList);

                // self.entityListArray()[current.index].UPLOAD_STATUS= "UPLOADED";


  var success ={
                severity: 'confirmation',
                  summary: 'File Upload success',
                  detail: "File is uploaded and stored",
                  autoTimeout: parseInt(self.errorMessageTimeout())
              }
              self.messagesArray.push(success);
                }

            },
            error: function(xhr, textStatus, errorThrown){
              
              console.log(errorThrown);
           }
        });


         
     

            }else{

              var error ={   severity: 'error',
              summary: 'Invalid file Format',
              detail: "Should upload file in csv format only.",
              autoTimeout: parseInt(self.errorMessageTimeout())
            }
              self.messagesArray.push(error);
              //Invalid file format
            }

          }else{


            var error ={   severity: 'error',
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
        var options = {"description": "CCA Startup - Waiting for data"};
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