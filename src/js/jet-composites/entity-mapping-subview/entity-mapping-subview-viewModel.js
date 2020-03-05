/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
  ['knockout', 'ojs/ojbootstrap', 'jquery', 'ojL10n!./resources/nls/entity-mapping-subview-strings',
    'ojs/ojarraydataprovider', 'ojs/ojdialog', 'ojs/ojbutton', 'ojs/ojmessages'],
  function (ko, Bootstrap, $, componentStrings, ArrayDataProvider) {

    function ExampleComponentModel(context) {
      var self = this;

      var host = sessionStorage.getItem("hostname")
      self.checkValue = ko.observableArray();

      self.dircolumn = ko.pureComputed(function () {
        return (typeof self.checkValue()[0] !== 'undefined' && self.checkValue()[0] != null &&
          self.checkValue()[0] === "dirColumn") ? true : false;
      }.bind(self));

      self.noData = ko.observable("no");

      self.loaded1 = ko.observable("two");
      self.loaded2 = ko.observable("two");
      self.loaded3 = ko.observable();
      self.sourceEntityColumns = [];

      self.destinationEntity = [];

      self.destinationColumns = []


      self.dataProviderForSourceEntityColumns = ko.observableArray(self.sourceEntityColumns);

      $("#entityloader").show()
      $.ajax({
        url: host + "/api/v1/source/entity/columns",
        data: { id: context.properties.entityId },
        type: 'POST',
        dataType: 'json',

        success: function (data, textStatus, jqXHR) {

          console.log(data);
          if (data.success == true) {

            if (data.data.length == 0) {
              self.noData("yes");

            } else {

              var tempArray = [];

              for (let i = 0; i < data.data.length; i++) {
                tempArray.push(data.data[i]);
              }
              $("#entityloader").hide()

              self.dataProviderForSourceEntityColumns(tempArray);

              for (let i = 0; i < tempArray.length; i++) {
                if (tempArray[i].IS_MANDATORY == "Y") {
                  $(".mandate").eq(i).find("div").css({ "color": "#B8B8B8", "font-style": "italic", "background": " #f2f4f5" });
                }
                else {
                  $(".mandate").eq(i).find("div").css({ "color": "black", "background": "white" });
                }
              }
            }

          } else {


          }
        },
        fail: function (xhr, textStatus, errorThrown) {
          $("#entityloader").hide()
          console.log(errorThrown);
        }
      });




      self.dataProviderForDestinationEntity = ko.observableArray(self.destinationEntity);
      $("#entityloader").show()

      $.ajax({
        url: host + "/api/v1/dest/entities",
        type: 'GET',
        // dataType: 'json',

        success: function (data, textStatus, jqXHR) {

          console.log(data);

          var tempArray = [];
          for (let i = 0; i < data.data.length; i++) {
            tempArray.push(data.data[i]);
          }
          $("#entityloader").hide();
          self.dataProviderForDestinationEntity(tempArray);

        },
        fail: function (xhr, textStatus, errorThrown) {

          console.log(errorThrown);
        }
      });




      self.dataProviderForDestinationEntityColumns = ko.observableArray();
      self.sourceColumn = ko.observable();
      self.sourceColumnOriginalName = ko.observable();
      self.sourceColumnId = ko.observable();
      self.destinationEntity = ko.observable();
      self.destinationEntityId = ko.observable();
      self.destinationColumn = ko.observable();
      self.destinationColumnId = ko.observable();



      self.onSourceColumnSelection = function (event, current, bindingContext) {
        if (current.data.IS_MANDATORY == "N") {
          self.loaded1("one");
          self.sourceColumn(current.data.DISPLAY_NAME);
          self.sourceColumnOriginalName(current.data.COLUMN_NAME);
          self.sourceColumnId(current.data.COLUMN_ID);
        } else {
          document.getElementById('mappingdilogue').open();

        }

        //to-do refactor after demo
        var lookups = ["BLOOD_TYPE", "TITLE", "SEX"];
        for (let i = 0; i < lookups.length; i++) {
          if (current.data.COLUMN_NAME == lookups[i]) {
            $(".destinationEntity:nth-child(n)").find("div").css({ "color": "black", "background": " white" });
            $(".destinationEntity:nth-child(11)").find("div").css({ "color": "white", "background": " #1464a0" });
          }
        }

        var location = ["LOCATIONCODE"];
        for (let i = 0; i < location.length; i++) {
          if (current.data.COLUMN_NAME == location[i]) {
            $(".destinationEntity:nth-child(n)").find("div").css({ "color": "black", "background": " white" });
            $(".destinationEntity:nth-child(7)").find("div").css({ "color": "white", "background": " #1464a0" });
          }
        }

        var grades = ["GRADECODE"];
        for (let i = 0; i < grades.length; i++) {
          if (current.data.COLUMN_NAME == grades[i]) {
            $(".destinationEntity:nth-child(n)").find("div").css({ "color": "black", "background": " white" });
            $(".destinationEntity:nth-child(10)").find("div").css({ "color": "white", "background": " #1464a0" });

          }
        }

        var departments = ["DEPARTMENT_NAME"];
        for (let i = 0; i < departments.length; i++) {
          if (current.data.COLUMN_NAME == departments[i]) {
            $(".destinationEntity:nth-child(n)").find("div").css({ "color": "black", "background": " white" });
            $(".destinationEntity:nth-child(6)").find("div").css({ "color": "white", "background": " #1464a0" });

          }
        }

        var jobs = ["JOBCODE"];
        for (let i = 0; i < jobs.length; i++) {
          if (current.data.COLUMN_NAME == jobs) {
            $(".destinationEntity:nth-child(n)").find("div").css({ "color": "black", "background": " white" });
            $(".destinationEntity:nth-child(8)").find("div").css({ "color": "white", "background": " #1464a0" });

          }
        }

        var salarybasis = ["SALARY_BASIS_NAME"];
        for (let i = 0; i < salarybasis.length; i++) {
          if (current.data.COLUMN_NAME == salarybasis) {
            $(".destinationEntity:nth-child(n)").find("div").css({ "color": "black", "background": " white" });
            $(".destinationEntity:nth-child(15)").find("div").css({ "color": "white", "background": " #1464a0" });

          }
        }
      }




      self.onDestinationEntitySelection = function (event, current, bindingContext) {

        self.loaded2("one");
        self.loaded3("two");
        self.destinationColumn(undefined);

        $.ajax({
          url: host + "/api/v1/dest/entity/columns",
          data: { id: current.data.DEST_ENTITY_ID },
          type: 'POST',
          dataType: 'json',

          success: function (data, textStatus, jqXHR) {

            console.log(data);

            var tempArray = [];
            for (let i = 0; i < data.data.length; i++) {
              tempArray.push(data.data[i]);
            }

            self.dataProviderForDestinationEntityColumns(tempArray);

          },
          fail: function (xhr, textStatus, errorThrown) {

            console.log(errorThrown);
          }
        });

        self.destinationEntity(current.data.DEST_ENTITY_NAME);
        self.destinationEntityId(current.data.DEST_ENTITY_ID);

      };



      self.onDestinationColumnSelection = function (event, current, bindingContext) {
        // self.dataProvider.remove(current.data);
        self.loaded3("one");
        self.destinationColumn(current.data.COLUMN_NAME);
        self.destinationColumnId(current.data.COLUMN_ID);

      };

      self.dataProvider = ko.observableArray();


      $.ajax({
        url: host + "/api/v1/listof/mappedfields",
        data: { sourceentityid: context.properties.entityId },
        type: 'POST',
        dataType: 'json',

        success: function (data, textStatus, jqXHR) {

          console.log(data);

          var tempArray = [];
          for (let i = 0; i < data.data.length; i++) {
            tempArray.push(data.data[i]);
          }

          self.dataProvider(tempArray);

        },
        fail: function (xhr, textStatus, errorThrown) {

          console.log(errorThrown);
        }
      });

      this.close = function (event) {
        self.errorColumn("");
        document.getElementById('modalDialog1').close();
      }

      self.errorColumn = ko.observable();


      self.messages = [];
      self.errorMessageTimeout = ko.observable('0');
      self.messagesArray = ko.observableArray(self.messages);
      self.messagesDataprovider = new ArrayDataProvider(self.messagesArray);

      self.mapFields = function () {

        if (self.noData() == "yes") {
          self.errorColumn("You haven't selected any source fields for mapping. Please select them from the entity idetification");
          document.getElementById('modalDialog1').open();
        }
        else if (self.sourceColumn() == undefined) {
          self.errorColumn("Please Select Source Field");
          // self.open = function (event) {
          document.getElementById('modalDialog1').open();
          // }
        } else if (self.destinationEntity() == undefined) {
          self.errorColumn('Please select destination Entity');
          // self.open = function (event) {
          document.getElementById('modalDialog1').open();
          // }
        } else if (self.destinationColumn() == undefined) {
          self.errorColumn('Please select destination field');
          // self.open = function (event) {
          document.getElementById('modalDialog1').open();
          // }
        } else if (self.dataProvider().length == 0) {
          $.ajax({
            url: host + "/api/v1/mappings",
            data:
            {
              projectid: 2,
              sourceentityid: context.properties.entityId,
              sourceentityname: "nil",
              sourcecolumnid: self.sourceColumnId(),
              sourcecolumnname: self.sourceColumn(),
              sourcecolumnnameoriginal: self.sourceColumnOriginalName(),
              destinationentityid: self.destinationEntityId(),
              destinationentityname: self.destinationEntity(),
              destinationcolumnid: self.destinationColumnId(),
              destinationcolumnname: self.destinationColumn(),
            },
            type: 'POST',
            dataType: 'json',

            success: function (data, textStatus, jqXHR) {

              console.log(data);

              if (data.success == true) {
                self.dataProvider.push({ DISPLAY_NAME: self.sourceColumn(), DESTINATION_ENTITY_NAME: self.destinationEntity(), DESTINATION_COLUMN_NAME: self.destinationColumn() });

                var success = {
                  severity: 'confirmation',
                  summary: 'Success',
                  detail: "Mapping Added Successfully",
                  autoTimeout: parseInt(self.errorMessageTimeout())
                }
                self.messagesArray.push(success);


              }

            },
            fail: function (xhr, textStatus, errorThrown) {

              console.log(errorThrown);
            }
          });


        } else {
          var matchFound = false;
          for (let i = 0; i < self.dataProvider().length; i++) {


            if (self.sourceColumn() == self.dataProvider()[i].DISPLAY_NAME && self.destinationColumn() == self.dataProvider()[i].DESTINATION_COLUMN_NAME) {
              matchFound = true;
              self.errorColumn("Duplicate Mapping (mapping for these fields is already done)");
              document.getElementById('modalDialog1').open();
              break;
            }


          }

          if (matchFound == false) {
            $.ajax({
              url: host + "/api/v1/mappings",
              data:
              {
                projectid: 2,
                sourceentityid: context.properties.entityId,
                sourceentityname: "nil",
                sourcecolumnid: self.sourceColumnId(),
                sourcecolumnname: self.sourceColumn(),
                sourcecolumnnameoriginal: self.sourceColumnOriginalName(),
                destinationentityid: self.destinationEntityId(),
                destinationentityname: self.destinationEntity(),
                destinationcolumnid: self.destinationColumnId(),
                destinationcolumnname: self.destinationColumn(),
              },
              type: 'POST',
              dataType: 'json',

              success: function (data, textStatus, jqXHR) {

                console.log(data);

                if (data.success == true) {
                  self.dataProvider.push({ DISPLAY_NAME: self.sourceColumn(), DESTINATION_ENTITY_NAME: self.destinationEntity(), DESTINATION_COLUMN_NAME: self.destinationColumn() });

                  var success = {
                    severity: 'confirmation',
                    summary: 'Success',
                    detail: "Mapping Added Successfully",
                    autoTimeout: parseInt(self.errorMessageTimeout())
                  }
                  self.messagesArray.push(success);

                }



              },
              fail: function (xhr, textStatus, errorThrown) {

                console.log(errorThrown);
              }
            });
          }
        }



        // $.ajax({
        //   url: host + "/api/v1/mappings",
        //   data:
        //   {
        //     projectid: 2,
        //     sourceentityid: context.properties.entityId,
        //     sourceentityname: "nil",
        //     sourcecolumnid: self.sourceColumnId(),
        //     sourcecolumnname: self.sourceColumn(),
        //     sourcecolumnnameoriginal: self.sourceColumnOriginalName(),
        //     destinationentityid: self.destinationEntityId(),
        //     destinationentityname: self.destinationEntity(),
        //     destinationcolumnid: self.destinationColumnId(),
        //     destinationcolumnname: self.destinationColumn(),
        //   },
        //   type: 'POST',
        //   dataType: 'json',

        //   success: function (data, textStatus, jqXHR) {

        //     console.log(data);

        //     if (data.success == true) {
        //       self.dataProvider.push({ SOURCE_COLUMN_NAME: self.sourceColumn(), destinationEntity: self.destinationEntity(), DESTINATION_COLUMN_NAME: self.destinationColumn() });
        //     }



        //   },
        //   fail: function (xhr, textStatus, errorThrown) {

        //     console.log(errorThrown);
        //   }
        // });



      };
      self.removeUser = function (event, current, bindingContext) {
        // self.dataProvider.remove(current.data);

        $.ajax({
          url: host + "/api/v1/delete/individual/mapping",
          data: { sourceentityid: context.properties.entityId, sourcecolumnname: current.data.DISPLAY_NAME, destinationcolumnname: current.data.DESTINATION_COLUMN_NAME },
          type: 'DELETE',
          dataType: 'json',

          success: function (data, textStatus, jqXHR) {

            console.log(data);


            if (data.success == true) {
              self.dataProvider.remove(current.data);


            }


          },
          fail: function (xhr, textStatus, errorThrown) {

            console.log(errorThrown);

          }
        });


      };

      this.openclearallbox = function (event) {
        document.getElementById('clearallbox').open();
      };


      self.removeAllMappings = function (event, current, bindingContext) {

        // self.dataProvider.removeAll();
        $.ajax({
          url: host + "/api/v1/removeall/mappedfields",
          data: { sourceentityid: context.properties.entityId },
          type: 'DELETE',
          dataType: 'json',

          success: function (data, textStatus, jqXHR) {

            console.log(data);
            if (data.success == true) {
              self.dataProvider.removeAll();

              document.getElementById('clearallbox').close();


            }



          },
          fail: function (xhr, textStatus, errorThrown) {

            console.log(errorThrown);
            document.getElementById('clearallbox').close();

          }
        });


      };



      // var myCustomScrollbar = Bootstrap.querySelector('.my-custom-scrollbar');
      // var ps = new PerfectScrollbar(myCustomScrollbar);

      // var scrollbarY = myCustomScrollbar.querySelector('.ps.ps--active-y>.ps__scrollbar-y-rail');

      // myCustomScrollbar.onscroll = function() {
      //   scrollbarY.style.cssText = `top: ${this.scrollTop}px!important; height: 400px; right: ${-this.scrollLeft}px`;
      // }



      //At the start of your viewModel constructor
      var busyContext = oj.Context.getContext(context.element).getBusyContext();
      var options = { "description": "CCA Startup - Waiting for data" };
      self.busyResolve = busyContext.addBusyState(options);

      self.composite = context.element;

      //Example observable
      self.messageText = ko.observable('Hello from Example Component');
      self.properties = context.properties;
      self.res = componentStrings['entity-mapping-subview'];
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