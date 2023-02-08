let createAllTemplates = () => {

    console.log("Creating templates!")

    internalhtml = createExternal();
    externalhtml = createInternal();

    var tab = window.open('about:blank', '_blank');

    tab.document.write(internalhtml);
    //tab.document.close();

    tab.document.write(externalhtml);
    tab.document.close();

}

function createExternal(){

    try {
        // This is to get the date and create its format

    var getDate = document.getElementById('dateTime').value;
    var getMinutes = document.getElementById('duration').value;
    var getIssue = document.getElementById('issue').value;

    getMinutes = parseInt(getMinutes);

    var date = new Date(getDate);
    currentMonth = date.getMonth();
    date = date.toString();

    splitDate = date.split(' ');

    //Splitting the date

    splitWeekDay = splitDate[0].replace(',','');
    splitMonth = splitDate[1];
    splitDay = splitDate[2];
    splitYear = splitDate[3];
    splitTime = splitDate[4];
    splitTimezone = splitDate[5];

    // Let's now divide our time

    finalTime = splitDate[4].split(':');
    splitHour = finalTime[0];
    splitMinutes = finalTime[1];
    splitMinutesOne = splitMinutes[0];
    splitMinutesTwo = splitMinutes[1];

    finalSplitMinutes = splitMinutesOne + splitMinutesTwo;

    var d = new Date(splitYear,currentMonth,splitDay,splitHour,finalSplitMinutes);
    var ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    var mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
    var da = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(d);
    var wd = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(d);
    var ti = new Intl.DateTimeFormat('en', { hour: 'numeric', hour12: true, minute: '2-digit'}).format(d);

    // Let's now add the minutes to the current date.

    createNewDate = addHours(d,getMinutes);

    var new_date = new Date(createNewDate);
    new_currentMonth = new_date.getMonth();
    new_date = new_date.toString();

    new_splitDate = new_date.split(' ');

    //Splitting the date

    new_splitWeekDay = new_splitDate[0].replace(',','');
    new_splitMonth = new_splitDate[1];
    new_splitDay = new_splitDate[2];
    new_splitYear = new_splitDate[3];
    new_splitTime = new_splitDate[4];
    new_splitTimezone = new_splitDate[5];

    // Let's now divide our time

    new_finalTime = new_splitDate[4].split(':');
    new_splitHour = new_finalTime[0];
    new_splitMinutes = new_finalTime[1];
    new_splitMinutesOne = new_splitMinutes[0];
    new_splitMinutesTwo = new_splitMinutes[1];

    new_finalSplitMinutes = new_splitMinutesOne + new_splitMinutesTwo;

    var new_d = new Date(new_splitYear,currentMonth,new_splitDay,new_splitHour,new_finalSplitMinutes);
    var new_ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(new_d);
    var new_mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(new_d);
    var new_da = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(new_d);
    var new_wd = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(new_d);
    var new_ti = new Intl.DateTimeFormat('en', { hour: 'numeric', hour12: true, minute: '2-digit'}).format(new_d);

    var selected = [];
    for (var option of document.getElementById('products').options)
    {
        if (option.selected) {
            selected.push(option.value);
        }
    }

    // Let's fix our list

    fixedProducts = fixProducts(selected);

    getTitle = document.getElementById('title').value;

    var e = document.getElementById("incidentType");
    var cIncidentType = e.value;

    newTitle = capitalizeFirstLetter(getTitle);

    maDate = 'From ' + mo + ' ' + da + ', ' + ti + ' UTC until ' + new_ti + ' UTC'

    finalDowntime = timeConverter(getMinutes);

    console.log('Final down time: ' + finalDowntime);

    /* The template to be used is the following:

    Title: SEVERITY - PRODUCT - ISSUE

    From MONTH DD, 00:00 AM/PM UTC until 00:00 AM/PM UTC, a subset of PRODUCT customers may have experienced ISSUE. 
    Immediately after the root cause of the issue was discovered, it was promptly fixed.

    We have confirmed that the issue has been resolved completely and all systems are 100% operational at this time.

    We will conduct an internal investigation of this issue and make appropriate improvements to our systems to help prevent or minimize future recurrence.*/

    //var tab = window.open('about:blank', '_blank');

    html = '<title>Results - Retrospective Status Pages</title><br><strong>Extenal Retrospective Status Page Template</strong><br><br>' 
    + 'Title: ' + cIncidentType + ' - ' + fixedProducts + ' - ' + getTitle 
    + '<br><br>' + maDate + ', a subset of ' + fixedProducts + ' customers may have experienced ' + getIssue + '. Immediately after the root cause of the issue was discovered, it was promptly fixed.'
    + '<br><br>We have confirmed that the issue has been resolved completely and all systems are 100% operational at this time.' 
    + '<br><br>We will conduct an internal investigation of this issue and make appropriate improvements to our systems to help prevent or minimize future recurrence.<br><br>'

    //tab.document.write(html);
    //tab.document.close();

    } catch (error) {
        console.log('Error: ' + error)
        alert('Please make sure all fields are filled up :D')
    }

    return html;
    
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function addHours(change_date, addMinutes){

    var newDate = new Date(change_date);
    newDate.setMinutes(newDate.getMinutes() + addMinutes);
    return newDate;

}

function timeConverter(minutes){

    console.log('Adding minutes')

    var num = minutes;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);

    if(minutes === 0){
        return rhours + '-hour';
    }
    else if(minutes <= 59){
        return rminutes + '-minute';
    }
    else{
        return rhours + '-hour and ' + rminutes + '-minute';
    }

}

function fixProducts(products){

    var listProducts = products;
    var productsFinal = '';

    var penUltProduct = listProducts[listProducts.length -2];
    var lastProduct = listProducts[listProducts.length -1];
    
    for (i in listProducts){

        if(listProducts.length === 1){
            productsFinal = listProducts[i];

        }else if (listProducts[i] === lastProduct){
            productsFinal = productsFinal + ' and ' + listProducts[i];

        }else if (listProducts[i] === penUltProduct) {
            productsFinal = productsFinal + listProducts[i];

        }else{
            productsFinal = productsFinal + listProducts[i] + ', ';
        }
        
    }

    return productsFinal;

}

function createInternal(){

    try {
    
        // This is to get the date and create its format

    var getDate = document.getElementById('dateTime').value;
    var getMinutes = document.getElementById('duration').value;
    var getIssue = document.getElementById('issue').value;

    getMinutes = parseInt(getMinutes);

    var date = new Date(getDate);
    currentMonth = date.getMonth();
    date = date.toString();

    splitDate = date.split(' ');

    //Splitting the date

    splitWeekDay = splitDate[0].replace(',','');
    splitMonth = splitDate[1];
    splitDay = splitDate[2];
    splitYear = splitDate[3];
    splitTime = splitDate[4];
    splitTimezone = splitDate[5];

    // Let's now divide our time

    finalTime = splitDate[4].split(':');
    splitHour = finalTime[0];
    splitMinutes = finalTime[1];
    splitMinutesOne = splitMinutes[0];
    splitMinutesTwo = splitMinutes[1];

    finalSplitMinutes = splitMinutesOne + splitMinutesTwo;

    var d = new Date(splitYear,currentMonth,splitDay,splitHour,finalSplitMinutes);
    var ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    var mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
    var da = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(d);
    var wd = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(d);
    var ti = new Intl.DateTimeFormat('en', { hour: 'numeric', hour12: true, minute: '2-digit'}).format(d);

    // Let's now add the minutes to the current date.

    createNewDate = addHours(d,getMinutes);

    var new_date = new Date(createNewDate);
    new_currentMonth = new_date.getMonth();
    new_date = new_date.toString();

    new_splitDate = new_date.split(' ');

    //Splitting the date

    new_splitWeekDay = new_splitDate[0].replace(',','');
    new_splitMonth = new_splitDate[1];
    new_splitDay = new_splitDate[2];
    new_splitYear = new_splitDate[3];
    new_splitTime = new_splitDate[4];
    new_splitTimezone = new_splitDate[5];

    // Let's now divide our time

    new_finalTime = new_splitDate[4].split(':');
    new_splitHour = new_finalTime[0];
    new_splitMinutes = new_finalTime[1];
    new_splitMinutesOne = new_splitMinutes[0];
    new_splitMinutesTwo = new_splitMinutes[1];

    new_finalSplitMinutes = new_splitMinutesOne + new_splitMinutesTwo;

    var new_d = new Date(new_splitYear,currentMonth,new_splitDay,new_splitHour,new_finalSplitMinutes);
    var new_ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(new_d);
    var new_mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(new_d);
    var new_da = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(new_d);
    var new_wd = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(new_d);
    var new_ti = new Intl.DateTimeFormat('en', { hour: 'numeric', hour12: true, minute: '2-digit'}).format(new_d);

    var selected = [];
    for (var option of document.getElementById('products').options)
    {
        if (option.selected) {
            selected.push(option.value);
        }
    }

    // Let's fix our list

    fixedProducts = fixProducts(selected);

    getTitle = document.getElementById('title').value;

    var e = document.getElementById("incidentType");
    var cIncidentType = e.value;

    getCustomerReports = document.getElementById('customerReports').value;
    getSlackChannel = document.getElementById('slackChannel').value;
    getCause = document.getElementById('cause').value;
    getSolution = document.getElementById('solution').value;

    maDate = 'From ' + mo + ' ' + da + ', ' + ti + ' UTC until ' + new_ti + ' UTC'

    finalDowntime = timeConverter(getMinutes);

    /*
    
    From MONTH DD, 00:00 AM/PM UTC until 00:00 AM/PM UTC, a subset of PRODUCT customers may have experienced ISSUE.  This incident has been already resolved and we have confirmed that all systems are 100% operational.

    Final Customer reports - #OF REPORTS SO FAR

    Root Cause - Our engineers identified the issue as being caused by CAUSE

    Resolution -  To mitigate the issue engineers MITIGATION ACTIONS

    Postmortem - A detailed technical document will be shared in the incident slack channel

    */

    //var tab = window.open('about:blank', '_blank');

    html = '<title>Results - Internal Retrospective Status Page</title><br><br><strong>Internal Retrospective Status Page Template</strong><br><br>' 
    + 'Title: ' + cIncidentType + ' - ' + fixedProducts + ' - ' + getTitle
    + '<br><br>' + maDate + ', a subset of ' + fixedProducts + ' customers may have experienced ' + getIssue + '.'
    + ' This incident has been already resolved and we have confirmed that all systems are 100% operational.'
    + '<br><br><b>Final Customer Reports - </b>' + getCustomerReports
    + '<br><br><b>Root Cause - </b>' + getCause
    + '<br><br><b>Resolution - </b>' + getSolution
    + '<br><br><b>Postmortem</b> - A detailed technical document will be shared in the incident slack channel ' + getSlackChannel;

    //tab.document.write(html);
    //tab.document.close();

    } catch (error) {
        console.log('Error: ' + error)
        alert('Please make sure all fields are filled up :D')
    }

    return html;

}