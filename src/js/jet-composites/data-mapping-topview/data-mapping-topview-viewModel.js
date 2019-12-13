/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
    ['knockout', 'jquery', 'ojL10n!./resources/nls/data-mapping-topview-strings','libs/file-saver/FileSaver'],
     function (ko, $, componentStrings) {
    
    function ExampleComponentModel(context) {
        var self = this;

        self.checkValue = ko.observableArray();

        self.dircolumn = ko.pureComputed(function(){
          return (typeof self.checkValue()[0] !== 'undefined' && self.checkValue()[0] != null && 
                  self.checkValue()[0] === "dirColumn") ? true : false;
        }.bind(self));




        var sheetNames = [];

        var data23 = [];
        // var data1=[];
        $.ajax({
          url: "http://localhost:3333/api/v1/exceldata",
          data: { entityid: 1},
          type: 'POST',
          dataType: 'json',
  
          success: function (data, textStatus, jqXHR) {
  
            console.log(data);

            // for(let i=0; i<data.data.mappings.length;i++){
            //   var obj ={
            //     sourceData: data.data.source[i]
            //   }
            // }

            // var data23 = [];
            for(let j=0; j<data.data.length;j++){


              var obj2={
                sheetid: data.data[j].sourcecolumnname + "-" + data.data[j].destinationcolumnname,
                header: true
              }

              sheetNames.push(obj2);
            
          var data1 =[];

          // if(data.data[j].sourcedata.length >= data.data[j].destinationdata.length){
            for (let i=0; i<data.data[j].sourcedata.length;i++){

              var obj ={
                sourceData: (data.data[j].sourcedata[i] == undefined)? 'undefined': data.data[j].sourcedata[i].SOURCE_DATA_NAME,
                desData: (data.data[j].destinationdata[i] == undefined)? 'undefined': data.data[j].destinationdata[i].DEST_DATA_NAME
              }
              data1.push(obj);

            }
          // }
          // else{
          //   for (let i=0; i<data.data[j].destinationdata.length;i++){

          //     var obj ={
          //       sourceData: data.data[j].sourcedata[i].SOURCE_DATA_NAME,
          //       desData: data.data[j].destinationdata[i].DEST_DATA_NAME
          //     }
          //     data1.push(obj);

          //   }
          // }
              
                console.log(data1);
                data23.push(data1);
                console.log(data23);
            }

            console.log(data23);
           
           

          
          },
          error: function (xhr, textStatus, errorThrown) {
  
            console.log(errorThrown);
          }
        });



        self.file = ko.observable();
self.selectListener = function(event,current,bindingContext){
  

  var files = event.detail.files; // FileList object
  // var xl2json = new ExcelToJSON();
  self.parseExcel(files[0]);

  
  // var file = new File([event.detail.files], event.detail.files[0].name, {
  //   type: "text/plain",
  // });
  
  // self.file(file);
  // console.log(file);
}

self.saveFile = function saveFile () {

  var sheetData = [];
for(let i=0;i<data23.length;i++){
 
sheetData.push(data23[i]);

}


  // var sheet_1_data = data1;
  // var sheet_1_data = [{Col_One:1, Col_Two:11}, {Col_One:2, Col_Two:22}];
  // var sheet_2_data = [{Col_One:10, Col_Two:110}, {Col_One:20, Col_Two:220}];
  // var opts = [{sheetid:'Sheet One',header:true},{sheetid:'Sheet Two',header:false}];
  // var result = alasql('SELECT * INTO XLSX("sample_file.xlsx",?) FROM ?', 
  //                   [opts,[sheet_1_data ,sheet_2_data]]);


  var result = alasql('SELECT * INTO XLSX("sample_file.xlsx",?) FROM ?', 
  [sheetNames,sheetData]);
}



// var ExcelToJSON = function() {
var mappingsObj = [];
  self.parseExcel = function(file) {
    var reader = new FileReader();

    reader.onload = function(e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: 'binary'
      });
      workbook.SheetNames.forEach(function(sheetName) {
        // Here is your object
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        var json_object = {
          data: JSON.stringify(XL_row_object),
          sheetName: sheetName
        }
        
        
        console.log((json_object));
        mappingsObj.push(json_object);
        console.log(mappingsObj);
        
        // console.log(JSON.parse(json_object));
        jQuery( '#xlx_json' ).val( json_object );
      })
    };

    reader.onerror = function(ex) {
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




self.onFileDownload = function(){

  // var sheet_1_data = [{Col_One:1, Col_Two:11}, {Col_One:2, Col_Two:22}];
  // var sheet_2_data = [{Col_One:10, Col_Two:110}, {Col_One:20, Col_Two:220}];
  // var opts = [{sheetid:'Sheet One',header:true},{sheetid:'Sheet Two',header:false}];
  // var result = alasql('SELECT * INTO XLSX("sample_file.xlsx",?) FROM ?', 
  //                   [opts,[sheet_1_data ,sheet_2_data]]);

  // window.open('data:application/vnd.ms-excel,' + $('#dvData').html());
  // e.preventDefault();

  // saveAs('C:\Users\welcome1\Desktop\Conversion Tool\person.pdf', "template");

}
        
        //At the start of your viewModel constructor
        var busyContext = oj.Context.getContext(context.element).getBusyContext();
        var options = {"description": "CCA Startup - Waiting for data"};
        self.busyResolve = busyContext.addBusyState(options);

        self.composite = context.element;

        //Example observable
        self.messageText = ko.observable('Hello from Example Component');
        self.properties = context.properties;
        self.res = componentStrings['data-mapping-topview'];
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