/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
  ['knockout', 'ojs/ojbootstrap', 'jquery', 'ojL10n!./resources/nls/entity-mapping-subview-strings','ojs/ojarraydataprovider', 'ojs/ojdialog','ojs/ojmessages'],
  function (ko, Bootstrap, $, componentStrings, ArrayDataProvider) {

    function ExampleComponentModel(context) {
      var self = this;

      self.checkValue = ko.observableArray();

      self.dircolumn = ko.pureComputed(function () {
        return (typeof self.checkValue()[0] !== 'undefined' && self.checkValue()[0] != null &&
          self.checkValue()[0] === "dirColumn") ? true : false;
      }.bind(self));

self.noData = ko.observable("no");

      self.loaded1 = ko.observable("two");
      self.loaded2 = ko.observable("two");
      self.loaded3 = ko.observable();
      self.sourceEntityColumns = [
        // { name: "UNIQUE_IDENTIFIER" },
        // { name: "USER_PERSON_TYPE" },
        // { name: "COUNTRY_CODE" },
        // { name: "ASSIGNMENT_NUMBER" },
        // { name: "EFFECTIVE_DATE" },
        // { name: "ORIGINAL_DATE_OF_HIRE" },
        // { name: "HIRE_DATE" },
        // { name: "ACCEPTED_TERMINATION_DATE" },
        // { name: "ACTUAL_TERMINATION_DATE" },
        // { name: "ADJUSTED_SVC_DATE" },
        // { name: "PROJECTED_TERMINATION_DATE" },
        // { name: "ACTION" },
        // { name: "ACTION_REASON" },
        // { name: "PAYROLL_NAME" },
        // { name: "REHIRE_AUTHORIZOR" },
        // { name: "REHIRE_RECOMMENDATION" },
        // { name: "REHIRE_MANAGER" },
        // { name: "CHANGE_REASON" },
        // { name: "ASSIGNMENT_STATUS_TYPE" },
        // { name: "BARGAINING_UNIT_CODE" },
        // { name: "BUSINESS_UNIT" },
        // { name: "DATE_PROBATION_END" },
        // { name: "EMPLOYEE_CATEGORY" },
        // { name: "EMPLOYMENT_CATEGORY" },
        // { name: "ESTABLISHMENT_ID" },
        // { name: "FREQUENCY" },
        // { name: "GRADE" },
        // { name: "GRADE_LADDER" },
        // { name: "HOURLY_SALARIED_CODE" },
        // { name: "JOB" },
        // { name: "LABOUR_UNION_MEMBER_FLAG" },
        // { name: "LEGAL_ENTITY" },
        // { name: "LOCATION" },
        // { name: "MANAGER_FLAG" },
        // { name: "NORMAL_HOURS" },
        // { name: "NOTICE_PERIOD" },
        // { name: "NOTICE_PERIOD_UOM" },
        // { name: "DEPARTMENT" },
        // { name: "POSITION" },
        // { name: "PRIMARY_ASSIGNMENT_FLAG" },
        // { name: "PROBATION_PERIOD" },
        // { name: "PROBATION_UNIT" },
        // { name: "TIME_NORMAL_FINISH" },
        // { name: "TIME_NORMAL_START" },
        // { name: "WORK_MEASURE_UNIT" },
        // { name: "WORK_MEASURE_VALUE" },
        // { name: "WORK_AT_HOME" },
        // { name: "ON_MILITARY_SERVICE" },
        // { name: "CONTEXT" },
        // { name: "ATTRIBUTE1" },
        // { name: "ATTRIBUTE2" },
        // { name: "ATTRIBUTE3" },
        // { name: "ATTRIBUTE4" },
        // { name: "ATTRIBUTE5" },
        // { name: "ATTRIBUTE6" },
        // { name: "ATTRIBUTE7" },
        // { name: "ATTRIBUTE8" },
        // { name: "ATTRIBUTE9" },
        // { name: "ATTRIBUTE10" },
        // { name: "ATTRIBUTE_NUMBER1" },
        // { name: "ATTRIBUTE_NUMBER2" },
        // { name: "ATTRIBUTE_NUMBER3" },
        // { name: "ATTRIBUTE_NUMBER4" },
        // { name: "ATTRIBUTE_NUMBER5" },
        // { name: "ATTRIBUTE_NUMBER6" },
        // { name: "ATTRIBUTE_NUMBER7" },
        // { name: "ATTRIBUTE_NUMBER8" },
        // { name: "ATTRIBUTE_NUMBER9" },
        // { name: "ATTRIBUTE_NUMBER10" },
        // { name: "ATTRIBUTE_DATE1" },
        // { name: "ATTRIBUTE_DATE2" },
        // { name: "ATTRIBUTE_DATE3" },
        // { name: "ATTRIBUTE_DATE4" },
        // { name: "ATTRIBUTE_DATE5" },
        // { name: "ATTRIBUTE_DATE6" },
        // { name: "ATTRIBUTE_DATE7" },
        // { name: "ATTRIBUTE_DATE8" },
        // { name: "ATTRIBUTE_DATE9" },
        // { name: "ATTRIBUTE_DATE10" },
      ];

      self.destinationEntity = [
        // {
        //   "ENTITY_ID": "1",
        //   "ENTITY_NAME": "Worker"
        // },
        // {
        //   "ENTITY_ID": "2",
        //   "ENTITY_NAME": "ExternalIdentifier"
        // },
        // {
        //   "ENTITY_ID": "3",
        //   "ENTITY_NAME": "PersonAddress"
        // },
        // {
        //   "ENTITY_ID": "4",
        //   "ENTITY_NAME": "PersonCitizenship"
        // },
        // {
        //   "ENTITY_ID": "5",
        //   "ENTITY_NAME": "PersonDeliveryMethod"
        // },
        // {
        //   "ENTITY_ID": "6",
        //   "ENTITY_NAME": "PersonDriversLicence"
        // },
        // {
        //   "ENTITY_ID": "7",
        //   "ENTITY_NAME": "PersonEmail"
        // },
        // {
        //   "ENTITY_ID": "8",
        //   "ENTITY_NAME": "PersonEthnicity"
        // },
        // {
        //   "ENTITY_ID": "9",
        //   "ENTITY_NAME": "PersonImage"
        // },
        // {
        //   "ENTITY_ID": "10",
        //   "ENTITY_NAME": "PersonLegislativeData"
        // },
        // {
        //   "ENTITY_ID": "11",
        //   "ENTITY_NAME": "PersonName"
        // },
        // {
        //   "ENTITY_ID": "12",
        //   "ENTITY_NAME": "PersonNationalIdentifier"
        // },
        // {
        //   "ENTITY_ID": "13",
        //   "ENTITY_NAME": "PersonPassport"
        // },
        // {
        //   "ENTITY_ID": "14",
        //   "ENTITY_NAME": "PersonPhone"
        // },
        // {
        //   "ENTITY_ID": "15",
        //   "ENTITY_NAME": "PersonReligion"
        // },
        // {
        //   "ENTITY_ID": "16",
        //   "ENTITY_NAME": "PersonUserInformation"
        // },
        // {
        //   "ENTITY_ID": "17",
        //   "ENTITY_NAME": "PersonUserManualRoles"
        // },
        // {
        //   "ENTITY_ID": "18",
        //   "ENTITY_NAME": "PersonVisa"
        // },
        // {
        //   "ENTITY_ID": "19",
        //   "ENTITY_NAME": "WorkRelationship"
        // },
        // {
        //   "ENTITY_ID": "20",
        //   "ENTITY_NAME": "WorkTerms"
        // },
        // {
        //   "ENTITY_ID": "21",
        //   "ENTITY_NAME": "Assignment"
        // },
        // {
        //   "ENTITY_ID": "22",
        //   "ENTITY_NAME": "AssignmentExtraInfo"
        // },
        // {
        //   "ENTITY_ID": "23",
        //   "ENTITY_NAME": "AssignmentGradeSteps"
        // },
        // {
        //   "ENTITY_ID": "24",
        //   "ENTITY_NAME": "AssignmentSupervisor"
        // },
        // {
        //   "ENTITY_ID": "25",
        //   "ENTITY_NAME": "AssignmentWorkMeasure"
        // },
        // {
        //   "ENTITY_ID": "26",
        //   "ENTITY_NAME": "WorkingHourPattern"
        // },
        // {
        //   "ENTITY_ID": "27",
        //   "ENTITY_NAME": "Contract"
        // },
        // {
        //   "ENTITY_ID": "28",
        //   "ENTITY_NAME": "WorkTermsExtraInfo"
        // },
        // {
        //   "ENTITY_ID": "29",
        //   "ENTITY_NAME": "WorkTermsGradeSteps"
        // },
        // {
        //   "ENTITY_ID": "30",
        //   "ENTITY_NAME": "WorkTermsSupervisor"
        // },
        // {
        //   "ENTITY_ID": "31",
        //   "ENTITY_NAME": "WorkTermsWorkMeasure"
        // },
        // {
        //   "ENTITY_ID": "32",
        //   "ENTITY_NAME": "WorkerExtraInfo"
        // },

      ];

      self.destinationColumns = [
        // {
        //   "COLUMN_NAME": "PERSONID"
        // },
        // {
        //   "COLUMN_NAME": "PERSONNUMBER"
        // },
        // {
        //   "COLUMN_NAME": "EFFECTIVEENDDATE"
        // },
        // {
        //   "COLUMN_NAME": "EFFECTIVESTARTDATE"
        // },
        // {
        //   "COLUMN_NAME": "ACTIONCODE"
        // },
        // {
        //   "COLUMN_NAME": "BLOODTYPE"
        // },
        // {
        //   "COLUMN_NAME": "CORRESPONDENCELANGUAGE"
        // },
        // {
        //   "COLUMN_NAME": "COUNTRYOFBIRTH"
        // },
        // {
        //   "COLUMN_NAME": "DATEOFBIRTH"
        // },
        // {
        //   "COLUMN_NAME": "DATEOFDEATH"
        // },
        // {
        //   "COLUMN_NAME": "PERSONDUPLICATECHECK"
        // },
        // {
        //   "COLUMN_NAME": "REASONCODE"
        // },
        // {
        //   "COLUMN_NAME": "REGIONOFBIRTH"
        // },
        // {
        //   "COLUMN_NAME": "STARTDATE"
        // },
        // {
        //   "COLUMN_NAME": "TOWNOFBIRTH"
        // },
        // {
        //   "COLUMN_NAME": "SOURCESYSTEMID"
        // },
        // {
        //   "COLUMN_NAME": "SOURCESYSTEMOWNER"
        // },
        // {
        //   "COLUMN_NAME": "GUID"
        // },

      ]


      self.dataProviderForSourceEntityColumns = ko.observableArray(self.sourceEntityColumns);



      $.ajax({
        url: "http://localhost:3333/api/v1/source/entity/columns",
        data: { id: context.properties.entityId },
        type: 'POST',
        dataType: 'json',

        success: function (data, textStatus, jqXHR) {

          console.log(data);
          if(data.success == true){

                if(data.data.length == 0){
                    self.noData("yes");
                  
                                 }else{

                  var tempArray = [];
                  for (let i = 0; i < data.data.length; i++) {
                    tempArray.push(data.data[i]);
                  }
        
                  self.dataProviderForSourceEntityColumns(tempArray);
                }

          }else{

          }

          

        },
        fail: function (xhr, textStatus, errorThrown) {

          console.log(errorThrown);
        }
      });




      self.dataProviderForDestinationEntity = ko.observableArray(self.destinationEntity);

      $.ajax({
        url: "http://localhost:3333/api/v1/dest/entities",
        type: 'GET',
        // dataType: 'json',

        success: function (data, textStatus, jqXHR) {

          console.log(data);

          var tempArray = [];
          for (let i = 0; i < data.data.length; i++) {
            tempArray.push(data.data[i]);
          }

          self.dataProviderForDestinationEntity(tempArray);

        },
        fail: function (xhr, textStatus, errorThrown) {

          console.log(errorThrown);
        }
      });



      // self.dataProviderForDestinationEntityColumns = ko.observableArray(self.destinationColumns);
      self.dataProviderForDestinationEntityColumns = ko.observableArray();
      self.sourceColumn = ko.observable();
      self.sourceColumnOriginalName = ko.observable();
      self.sourceColumnId = ko.observable();
      self.destinationEntity = ko.observable();
      self.destinationEntityId = ko.observable();
      self.destinationColumn = ko.observable();
      self.destinationColumnId = ko.observable();

      // self.dataProvider = new ArrayDataProvider(users, {keyAttributes: 'name'});
      self.onSourceColumnSelection = function (event, current, bindingContext) {
        // self.dataProvider.remove(current.data);

        $('#foo').addClass('myClass');

        self.loaded1("one");
        self.sourceColumn(current.data.DISPLAY_NAME);
        self.sourceColumnOriginalName(current.data.COLUMN_NAME);
        self.sourceColumnId(current.data.COLUMN_ID);

      };

      self.onDestinationEntitySelection = function (event, current, bindingContext) {
        // self.dataProvider.remove(current.data);


        // self.dataProviderForDestinationEntityColumns(self.destinationColumns);
        self.loaded2("one");
        self.loaded3("two");
        self.destinationColumn(undefined);

        $.ajax({
          url: "http://localhost:3333/api/v1/dest/entity/columns",
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

      self.dataProvider = ko.observableArray([

        // {sourceColumn: "userid" , destinationEntity: "table", destinationColumn:"id"},
        // { name: "Bert" },
        // { name: "Charles" },
        // { name: "Denise" }
      ]);


      $.ajax({
        url: "http://localhost:3333/api/v1/listof/mappedfields",
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


      self.messages = [
      ];
self.errorMessageTimeout = ko.observable('0');
self.messagesArray = ko.observableArray(self.messages);
 self.messagesDataprovider = new ArrayDataProvider(self.messagesArray);

      self.mapFields = function () {

        if(self.noData() == "yes"){
          self.errorColumn("You haven't selected any source fields for mapping. Please select them from the entity idetification");
          document.getElementById('modalDialog1').open();

          // self.errorColumn("Please Select Source Field test");
          // self.open = function (event) {
          // document.getElementById('modalDialog1').open();

         
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
        } else if(self.dataProvider().length == 0){
          $.ajax({
            url: "http://localhost:3333/api/v1/mappings",
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
             
                var success ={
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

         
        }else {
          var matchFound  = false;
          for(let i=0; i<self.dataProvider().length; i++ ){

            
            if(self.sourceColumn() == self.dataProvider()[i].DISPLAY_NAME && self.destinationColumn() == self.dataProvider()[i].DESTINATION_COLUMN_NAME){
              matchFound = true;
              self.errorColumn("Duplicate Mapping (mapping for these fields is already done)");
                document.getElementById('modalDialog1').open();
                break;
            }
           
            
          }

          if (matchFound == false) {
            $.ajax({
              url: "http://localhost:3333/api/v1/mappings",
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
               
                  var success ={
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
          //   url: "http://localhost:3333/api/v1/mappings",
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

      self.openremoveUser = function (event) {
        document.getElementById('removeUserbox').open();
      };


      self.removeUser = function (event, current, bindingContext) {
        // self.dataProvider.remove(current.data);

        $.ajax({
          url: "http://localhost:3333/api/v1/delete/individual/mapping",
          data: { sourceentityid: context.properties.entityId, sourcecolumnname: current.data.DISPLAY_NAME, destinationcolumnname: current.data.DESTINATION_COLUMN_NAME },
          type: 'DELETE',
          dataType: 'json',

          success: function (data, textStatus, jqXHR) {

            console.log(data);


            if (data.success == true) {
              self.dataProvider.remove(current.data);
              document.getElementById('removeuserbox').close();

            }


          },
          fail: function (xhr, textStatus, errorThrown) {

            console.log(errorThrown);
            document.getElementById('removeuserbox').close();

          }
        });


      };

      this.openclearallbox = function (event) {
        document.getElementById('clearallbox').open();
      };


      self.removeAllMappings = function (event, current, bindingContext) {

        // self.dataProvider.removeAll();
        $.ajax({
          url: "http://localhost:3333/api/v1/removeall/mappedfields",
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