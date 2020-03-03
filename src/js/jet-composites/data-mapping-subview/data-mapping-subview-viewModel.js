/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
  ['knockout', 'jquery', 'ojL10n!./resources/nls/data-mapping-subview-strings', 'ojs/ojarraydataprovider', 'ojs/ojdialog', 'ojs/ojmessages', 'libs/file-saver/FileSaver'],
  function (ko, $, componentStrings, ArrayDataProvider) {

    function ExampleComponentModel(context) {

      var host = sessionStorage.getItem("hostname");
      var self = this;
      var deferred = $.Deferred();
      self.checkValue = ko.observableArray();

      self.dircolumn = ko.pureComputed(function () {
        return (typeof self.checkValue()[0] !== 'undefined' && self.checkValue()[0] != null &&
          self.checkValue()[0] === "dirColumn") ? true : false;
      }.bind(self));

      var sheetNames = [];

      var data23 = [];
      // var data1=[];
      $("#dataloader").show();
      $.ajax({
        url: host + "/api/v1/exceldatamapping",
        data: { entityid: context.properties.entityId },
        type: 'POST',
        dataType: 'json',

        success: function (data, textStatus, jqXHR) {
          console.log(data);
          if (data.success == true) {
            for (let j = 0; j < data.data.length; j++) {
              var obj2 = {
                sheetid: data.data[j].projectname,
                header: true
              }
              sheetNames.push(obj2);

              var data1 = [];

              if (data.data[j].sourcedata.length > data.data[j].destinationdata.length) {

                for (let i = 0; i < data.data[j].sourcedata.length; i++) {

                  var obj = {
                    ProjectName: (data.data[j].projectname) ? data.data[j].projectname : '',
                    SourceEntity: (data.data[j].sourceentityname) ? data.data[j].sourceentityname : '',
                    SourceColumnName: (data.data[j].sourcecolumnname) ? data.data[j].sourcecolumnname : '',
                    SourceData: (data.data[j].sourcedata[i] == undefined) ? '' : data.data[j].sourcedata[i].SOURCE_DATA_NAME,
                    DestinationEntity: (data.data[j].destinationentity) ? data.data[j].destinationentity : '',
                    DestinationColumnName: (data.data[j].destinationcolumnname) ? data.data[j].destinationcolumnname : '',
                    DestinationData: (data.data[j].destinationdata[i] == undefined) ? '' : data.data[j].destinationdata[i].DEST_DATA_NAME
                  }
                  $("#dataloader").hide();
                  data1.push(obj);

                }

              } else {


                for (let i = 0; i < data.data[j].destinationdata.length; i++) {

                  var obj = {
                    ProjectName: (data.data[j].projectname) ? data.data[j].projectname : '',
                    SourceEntity: (data.data[j].sourceentityname) ? data.data[j].sourceentityname : '',
                    SourceColumnName: (data.data[j].sourcecolumnname) ? data.data[j].sourcecolumnname : '',
                    SourceData: (data.data[j].sourcedata[i] == undefined) ? '' : data.data[j].sourcedata[i].SOURCE_DATA_NAME,
                    DestinationEntity: (data.data[j].destinationentity) ? data.data[j].destinationentity : '',
                    DestinationColumnName: (data.data[j].destinationcolumnname) ? data.data[j].destinationcolumnname : '',
                    DestinationData: (data.data[j].destinationdata[i] == undefined) ? '' : data.data[j].destinationdata[i].DEST_DATA_NAME
                  }
                  $("#dataloader").hide();
                  data1.push(obj);

                }

              }


              console.log(data1);
              data23.push(data1);
              deferred.resolve(data23);
              console.log(data23);
            }

            console.log(data23);

          }
          else {
            var error = {
              severity: 'error',
              summary: 'No data found',
              detail: "No data found in the Template",
              autoTimeout: parseInt(self.errorMessageTimeout())
            }
            $("#dataloader").hide();
            self.messagesArray.push(error);
          }

        },
        error: function (xhr, textStatus, errorThrown) {
          console.log(errorThrown);
          var error = {
            severity: 'error',
            summary: 'No Mappings selected',
            detail: "There are no active mappings to upload the template",
            autoTimeout: parseInt(self.errorMessageTimeout())
          }
          $("#dataloader").hide();
          self.messagesArray.push(error);


        }
      });



      self.file = ko.observable();
      self.selectListener = function (event, current, bindingContext) {


        if (self.dataProvider().length == 0) {

          var error = {
            severity: 'error',
            summary: 'No Mappings selected',
            detail: "There are no active mappings to upload the template",
            autoTimeout: parseInt(self.errorMessageTimeout())
          }
          self.messagesArray.push(error);
          //Invalid file format


        } else {


          var files = event.detail.files; // FileList object
          // var xl2json = new ExcelToJSON();
          self.parseExcel(files[0]);
          var success = {
            severity: 'confirmation',
            summary: 'Success',
            detail: "Mapping Template Uploaded",
            autoTimeout: parseInt(self.errorMessageTimeout())
          }
          $("#dataloader").hide();
          self.messagesArray.push(success);
        }






        // var file = new File([event.detail.files], event.detail.files[0].name, {
        //   type: "text/plain",
        // });

        // self.file(file);
        // console.log(file);
      }

      self.saveFile = function () {

        if (self.dataProvider().length == 0) {

          var error = {
            severity: 'error',
            summary: 'No Mappings selected',
            detail: "There are no active mappings to download the template",
            autoTimeout: parseInt(self.errorMessageTimeout())
          }
          self.messagesArray.push(error);
          //Invalid file format


        } else {
          deferred.then(function (defData) {


            var sheetData = [];
            for (let i = 0; i < defData.length; i++) {

              sheetData.push(defData[i]);

            }
            console.log(sheetNames);
            console.log(sheetData);
            var result = alasql('SELECT * INTO XLSX("Mapping_Template.xlsx",?) FROM ?',
              [sheetNames, sheetData]);

            var success = {
              severity: 'confirmation',
              summary: 'Success',
              detail: "Mapping Template Downloaded Successfully",
              autoTimeout: parseInt(self.errorMessageTimeout())
            }
            self.messagesArray.push(success);
          });
        }



      }


      function paginate(array, index, size) {
        // transform values
        index = Math.abs(parseInt(index));
        index = index > 0 ? index - 1 : index;
        size = parseInt(size);
        size = size < 1 ? 1 : size;

        // filter
        return [...(array.filter((value, n) => {
          return (n >= (index * size)) && (n < ((index + 1) * size))
        }))];
      }


      function Paginator(items, page, per_page) {

        var page = page || 1,
          per_page = per_page || 10,
          offset = (page - 1) * per_page,

          paginatedItems = items.slice(offset).slice(0, per_page);
        console.log('paginatedItems--->', paginatedItems);
        return paginatedItems;
      }

      // var ExcelToJSON = function() {

      self.parseExcel = function (file) {
        var mappingsObj = [];
        var reader = new FileReader();

        reader.onload = function (e) {
          var data = e.target.result;
          var workbook = XLSX.read(data, {
            type: 'binary'
          });
          workbook.SheetNames.forEach(function (sheetName) {
            // Here is your object
            var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            var json_object = {
              data: XL_row_object,
              sheetName: sheetName
            }


            console.log((json_object));
            mappingsObj.push(json_object);
            console.log(mappingsObj);

            // console.log(JSON.parse(json_object));
            jQuery('#xlx_json').val(json_object);

          })
          var chunkMaxSize = 50;
          if (mappingsObj[0].data.length > 0) {
            var totalLength = mappingsObj[0].data.length;
            var chunkedCount = Math.ceil(totalLength / chunkMaxSize);
            var si = 0;
            var ei = 0;
            var mappingArr = mappingsObj[0].data;
            for (var i = 0; i < chunkedCount; i++) {
              setTimeout(function () {
                ei += chunkMaxSize;
                var jsonFilterData = mappingArr.slice(si, ei);
                si = ei + 1;
                console.log(jsonFilterData);

                $.ajax({
                  url: host + "/api/v1/uploaddatamappings",
                  data: { entityid: context.properties.entityId, mappings: jsonFilterData },
                  type: 'POST',
                  dataType: 'json',

                  success: function (data, textStatus, jqXHR) {
                    
                    console.log(data);
                    loadmappings();

                  },
                  error: function (xhr, textStatus, errorThrown) {

                    console.log(errorThrown);
                  }
                });
              }, 500);
            }
          }
        };

        reader.onerror = function (ex) {
          console.log(ex);
        };

        reader.readAsBinaryString(file);
      };
      // };



      self.fileupload = function handleFileSelect(evt) {

        var files = evt.target.files; // FileList object
        var xl2json = new ExcelToJSON();
        xl2json.parseExcel(files[0]);
      }




      self.onFileDownload = function () {

        // var sheet_1_data = [{Col_One:1, Col_Two:11}, {Col_One:2, Col_Two:22}];
        // var sheet_2_data = [{Col_One:10, Col_Two:110}, {Col_One:20, Col_Two:220}];
        // var opts = [{sheetid:'Sheet One',header:true},{sheetid:'Sheet Two',header:false}];
        // var result = alasql('SELECT * INTO XLSX("sample_file.xlsx",?) FROM ?', 
        //                   [opts,[sheet_1_data ,sheet_2_data]]);

        // window.open('data:application/vnd.ms-excel,' + $('#dvData').html());
        // e.preventDefault();

        // saveAs('C:\Users\welcome1\Desktop\Conversion Tool\person.pdf', "template");

      }


      self.loaded1 = ko.observable("two");
      self.loaded2 = ko.observable();
      self.loaded3 = ko.observable();

      self.noData = ko.observable("no");

      $.ajax({
        url: host + "/api/v1/listof/mappedfields",
        data: { sourceentityid: context.properties.entityId },
        type: 'POST',
        dataType: 'json',

        success: function (data, textStatus, jqXHR) {

          console.log(data);
          if (data.data.length == 0) {
            self.noData("yes");

          } else {

            var tempArray = [];
            for (let i = 0; i < data.data.length; i++) {
              tempArray.push(data.data[i]);
            }

            self.dataProvider(tempArray);
          }




        },
        fail: function (xhr, textStatus, errorThrown) {

          console.log(errorThrown);
        }
      });

      self.dataProvider2 = ko.observableArray();



      // var loadMappings(){
      if (context.properties.entityId !== "") {
        loadmappings();
      }

      function loadmappings() {

        $.ajax({
          url: host + "/api/v1/listof/value/mappings",
          data: { sourceentityid: context.properties.entityId },
          type: 'POST',
          dataType: 'json',

          success: function (data, textStatus, jqXHR) {

            console.log(data);
            var tempArray = [];
            for (let i = 0; i < data.data.length; i++) {
              var obj = {
                sourceDataName: data.data[i].SOURCE_DISPLAY_NAME,
                destinationDataName: data.data[i].DESTINATION_DISPLAY_NAME,
                // sourceColumnId: data.data[i].SOURCE_COLUMN_ID,
                // destColumnId: data.data[i].DESTINATION_COLUMN_ID,
                // projectid: data.data[i].PROJECT_ID,
                entityid: data.data[i].SOURCE_ENTITY_ID
              }
              tempArray.push(obj);
            }

            self.dataProvider2(tempArray);


          },
          fail: function (xhr, textStatus, errorThrown) {

            console.log(errorThrown);
          }
        });
      }


      // }


      self.sourceColumn = ko.observable();


      self.sourceData = ko.observableArray();
      self.destData = ko.observableArray();

      self.mappingData = ko.observableArray();



      self.onMappingSelection = function (event, current, bindingContext) {


        self.mappingData(current.data);
        self.sourceData('');
        self.destData('');
        self.loaded2("two");
        self.loaded3("two");
        self.sourceDataName("undefined");
        self.destinationDataName("undefined");
        self.sourceColumn(current.data.SOURCE_COLUMN_NAME + " --> " + current.data.DESTINATION_COLUMN_NAME);
        $.ajax({
          url: host + "/api/v1/master/datalist",
          data: { data: current.data },
          type: 'POST',
          dataType: 'json',

          success: function (data, textStatus, jqXHR) {

            console.log(data);

            var tempArray1 = [];

            for (let i = 0; i < data.data.srcdata.length; i++) {
              tempArray1.push(data.data.srcdata[i]);
            }



            self.sourceData(tempArray1);

            var tempArray2 = [];

            for (let i = 0; i < data.data.destdata.length; i++) {
              tempArray2.push(data.data.destdata[i]);
            }

            self.destData(tempArray2);


          },
          fail: function (xhr, textStatus, errorThrown) {

            console.log(errorThrown);
          }
        });

        self.loaded1("one");


      };

      self.sourceDataName = ko.observable();
      self.sourceDataId = ko.observable();
      self.sourceDataCode = ko.observable();

      self.onSourceDataSelection = function (event, current, bindingContext) {
        // self.dataProvider.remove(current.data);
        self.loaded2("one");
        self.sourceDataName(current.data.SOURCE_DATA_NAME);
        self.sourceDataId(current.data.SOURCE_DATA_ID);
        self.sourceDataCode(current.data.SOURCE_DATA_CODE);

      };


      self.destinationDataName = ko.observable();
      self.destinationDataId = ko.observable();


      self.onDestinationDataSelection = function (event, current, bindingContext) {
        // self.dataProvider.remove(current.data);

        self.loaded3("one");

        self.destinationDataName(current.data.DEST_DATA_NAME);
        self.destinationDataId(current.data.DEST_DATA_ID);
      };



      // self.dataProvider = ko.observableArray([

      //   { sourceColumn: "userid", destinationEntity: "table", destinationColumn: "id" },

      // ]);

      self.dataProvider = ko.observableArray();


      this.close = function (event) {
        self.errorColumn("");
        document.getElementById('modalDialog1').close();
      }

      self.errorColumn = ko.observable();

      self.messages = [
      ];
      self.errorMessageTimeout = ko.observable('0');
      self.messagesArray = ko.observableArray(self.messages);
      self.messagesDataprovider = new ArrayDataProvider(self.messagesArray);
      self.mapData = function () {
        // if (self.sourceData().length == undefined || self.sourceData().length == 0) {
        //   self.errorColumn('Invalid mapping');

        //   document.getElementById('modalDialog1').open();

        // }

        if (self.sourceColumn() == undefined) {
          self.errorColumn("Please select entity mapping from the active mappings.")
          document.getElementById('modalDialog1').open();
        }
        else if (self.sourceDataName() == "undefined") {
          self.errorColumn("Source Data name cannot be empty");
          // self.open = function (event) {
          document.getElementById('modalDialog1').open();
          // }
        } else if (self.destinationDataName() == "undefined") {
          self.errorColumn('Destination Data name cannot be empty');
          // self.open = function (event) {
          document.getElementById('modalDialog1').open();
          // }
        } else if (self.dataProvider2().length == 0) {

          $.ajax({
            url: host + "/api/v1/save/datamappings",
            data: {
              projectid: 2,
              sourceentityid: context.properties.entityId,
              sourcedisplayname: self.sourceDataName(),
              sourcedataname: self.sourceDataId(),
              sourcedatacode: self.sourceDataCode(),
              destinationdataname: self.destinationDataName(),
              destinationdataid: self.destinationDataId(),
              remainingdata: self.mappingData(),
            },

            type: 'POST',
            dataType: 'json',

            success: function (data, textStatus, jqXHR) {

              console.log(data);

              self.dataProvider2.push({ sourceDataName: self.sourceDataName(), destinationDataName: self.destinationDataName() });

              var success = {
                severity: 'confirmation',
                summary: 'Success',
                detail: "Mapping Added Successfully",
                autoTimeout: parseInt(self.errorMessageTimeout())
              }
              self.messagesArray.push(success);
            },
            fail: function (xhr, textStatus, errorThrown) {

              console.log(errorThrown);
            }
          });

        }

        else {

          var matchFound = false;
          for (let i = 0; i < self.dataProvider2().length; i++) {


            if (self.sourceDataName() == self.dataProvider2()[i].sourceDataName && self.destinationDataName() == self.dataProvider2()[i].destinationDataName) {
              matchFound = true;
              self.errorColumn('Duplicate Mapping(mapping for these values is already done)');
              document.getElementById('modalDialog1').open();
              break;
            }


          }


        }

        if (matchFound == false) {
          $.ajax({
            url: host + "/api/v1/save/datamappings",
            data: {
              projectid: 2,
              sourceentityid: context.properties.entityId,
              sourcedisplayname: self.sourceDataName(),
              sourcedataname: self.sourceDataId(),
              sourcedatacode: self.sourceDataCode(),
              destinationdataname: self.destinationDataName(),
              destinationdataid: self.destinationDataId(),
              remainingdata: self.mappingData()
            },
            type: 'POST',
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {

              console.log(data);

              self.dataProvider2.push({ sourceDataName: self.sourceDataName(), destinationDataName: self.destinationDataName() });
              var success = {
                severity: 'confirmation',
                summary: 'Success',
                detail: "Mapping Added Successfully",
                autoTimeout: parseInt(self.errorMessageTimeout())
              }
              self.messagesArray.push(success);
            },
            fail: function (xhr, textStatus, errorThrown) {

              console.log(errorThrown);
            }
          });
        }

      };


    

      self.removeUser = function (event, current, bindingContext) {
        // self.dataProvider2.remove(current.data);



        $.ajax({
          url: host + "/api/v1/delete/individual/datamapping",
          data: { sourceentityid: context.properties.entityId, sourcedataname: current.data.sourceDataName, destinationdataname: current.data.destinationDataName },
          type: 'DELETE',
          dataType: 'json',

          success: function (data, textStatus, jqXHR) {

            console.log(data);


            if (data.success == true) {
              self.dataProvider2.remove(current.data);
            }


          },
          fail: function (xhr, textStatus, errorThrown) {

            console.log(errorThrown);
          }
        });



      };
      this.openclearall = function (event) {
        document.getElementById('clearallbox').open();
      };


      self.removeAllMappings = function (event, current, bindingContext) {
        // self.dataProvider2.removeAll();

        $.ajax({
          url: host + "/api/v1/removeall/datamappings",
          data: { sourceentityid: context.properties.entityId },
          type: 'DELETE',
          dataType: 'json',

          success: function (data, textStatus, jqXHR) {

            console.log(data);
            if (data.success == true) {
              self.dataProvider2.removeAll();
              document.getElementById('clearallbox').close();
            }



          },
          fail: function (xhr, textStatus, errorThrown) {

            console.log(errorThrown);
            document.getElementById('clearallbox').close();

          }
        });


      };





      //At the start of your viewModel constructor
      var busyContext = oj.Context.getContext(context.element).getBusyContext();
      var options = { "description": "CCA Startup - Waiting for data" };
      self.busyResolve = busyContext.addBusyState(options);

      self.composite = context.element;

      //Example observable
      self.messageText = ko.observable('Hello from Example Component');
      self.properties = context.properties;
      self.res = componentStrings['data-mapping-subview'];
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