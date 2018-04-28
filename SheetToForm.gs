function convertToForm() {
  
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var colLength = sheet.getDataRange().getLastColumn();
  var myForm = FormApp.create('My Survey');
  for(var i=0;i< data.length;i++){
    var question=data[i][0];
    var type=data[i][1];
    var lastColWithVal = data[i].indexOf('');
    
    if(type=='Multiple' && lastColWithVal>2)
      myForm.addMultipleChoiceItem().setTitle(question).setChoiceValues(data[i].slice(2,lastColWithVal)).showOtherOption(true).setRequired(true);
    else if(type=='Text')
      myForm.addTextItem().setTitle(question);
    else if(type=='Checkbox' && lastColWithVal>2)
      myForm.addCheckboxItem().setTitle(question).setChoiceValues(data[i].slice(2,lastColWithVal)).setRequired(true);
    else if(type=='Section')
      myForm.addSectionHeaderItem().setTitle(question);
  }
  Logger.log('Published URL: ' + myForm.getPublishedUrl());
  var openForm = HtmlService.createHtmlOutput('<button onclick="window.open(\''+myForm.getPublishedUrl()+'\',\'_blank\');google.script.host.close()">Click to Open</button>');
  SpreadsheetApp.getUi().showModalDialog(openForm, 'Your Form is ready!');

}
