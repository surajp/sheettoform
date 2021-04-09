function convertToForm() {
  
  var colMap = {"question":0,"type":1,"isRequired":2};
  var numberOfColsBeforeOptions = 3;
  var trueRegex = new RegExp("(true|1)","i");

  var typesMap = {
      DROPDOWN:"Dropdown",
      MULTIPLE:"Multiple",
      CHECKBOX:"Checkbox",
      TEXT:"Text",
      TITLE: "Title",
      SECTION_TITLE:"Section Title",
      NEW_PAGE:"New Page",
      RANK:"Rank",
      MESSAGE:"Message",
      COMMENT:"Comment",
      DESCRIPTION:"Description",
      TIME:"Time",
      LINEAR:"Linear"
    };

  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var colLength = sheet.getDataRange().getLastColumn();
  var myForm = FormApp.create('My Survey');
  

  for(var i=0;i< data.length;i++){
    var question=data[i][colMap.question];
    var type=data[i][colMap.type];
    var isRequired = trueRegex.test(data[i][colMap.isRequired]);
    var lastColWithVal = data[i].indexOf('');
    if(lastColWithVal==-1)
      lastColWithVal = data[i].length;
    
    if(type==typesMap.MULTIPLE && lastColWithVal>numberOfColsBeforeOptions)
      myForm.addMultipleChoiceItem().setTitle(question).setChoiceValues(data[i].slice(numberOfColsBeforeOptions+1,lastColWithVal)).showOtherOption(true).setRequired(isRequired);
    else if(type==typesMap.DROPDOWN && lastColWithVal > numberOfColsBeforeOptions)
      myForm.addListItem().setTitle(question).setChoiceValues(data[i].slice(numberOfColsBeforeOptions+1,lastColWithVal)).setRequired(isRequired);
    else if(type==typesMap.TEXT)
      myForm.addTextItem().setTitle(question).setRequired(isRequired);
    else if(type==typesMap.CHECKBOX && lastColWithVal>numberOfColsBeforeOptions)
      myForm.addCheckboxItem().setTitle(question).setChoiceValues(data[i].slice(numberOfColsBeforeOptions+1,lastColWithVal)).setRequired(isRequired);
    else if(type==typesMap.SECTION_TITLE)
      myForm.addSectionHeaderItem().setTitle(question);
    else if(type==typesMap.NEW_PAGE)
      myForm.addPageBreakItem().setTitle(question);
    else if(type==typesMap.TITLE)
      myForm.setTitle(question);
    else if(type==typesMap.DESCRIPTION)
      myForm.setDescription(question);
    else if(type==typesMap.MESSAGE)
      myForm.setConfirmationMessage(question);
    else if(type==typesMap.COMMENT)
      myForm.addParagraphTextItem().setTitle(question).setRequired(isRequired);
    else if(type==typesMap.TIME)
      myForm.addTimeItem().setTitle(question).setRequired(isRequired);
    else if(type==typesMap.RANK && lastColWithVal > numberOfColsBeforeOptions){
      myForm.addGridItem().setTitle(question).setRequired(true).setColumns(data[i].slice(numberOfColsBeforeOptions+1,lastColWithVal))
            .setRows(getArray(lastColWithVal-2))
            .setValidation(FormApp.createGridValidation().setHelpText("Select one response per column").requireLimitOneResponsePerColumn().build());
    }
    else if(type==typesMap.LINEAR){
      var scaleIt = myForm.addScaleItem().setTitle(question).setRequired(isRequired);
      if(lastColWithVal>numberOfColsBeforeOptions)
        scaleIt.setLabels(data[i][numberOfColsBeforeOptions], data[i][numberOfColsBeforeOptions+1]);
    }
  }
  Logger.log('Published URL: ' + myForm.getPublishedUrl());
  var openForm = HtmlService.createHtmlOutput('<button onclick="window.open(\''+myForm.getPublishedUrl()+'\',\'_blank\');google.script.host.close()">Click to Open</button>');
  SpreadsheetApp.getUi().showModalDialog(openForm, 'Your Form is ready!');

}


function getArray(range){
  var retArr=[];
  for(var i=0;i<range;i++){
    retArr.push(i+1);
  }
  return retArr;
}
