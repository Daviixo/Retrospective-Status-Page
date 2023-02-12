let createAllTemplates = () => {

    //console.log("Creating templates!")

    internalhtml = createInternal();
    externalhtml = createExternal();

    var tab = window.open('about:blank', '_blank');

    tab.document.write(externalhtml);
    //tab.document.close();

    tab.document.write(internalhtml);
    tab.document.close();

}

let convertToUTC = (date) => {

    //console.log("Under convert to UTC\nDate: " + date);

    date = new Date(date);

    let utcDate = new Date(date.toUTCString());

    return utcDate.toLocaleString("en-US", {
        timeZone: "UTC",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZoneName: "short"
    });

}

let createExternal = () => {

    try {

    var getDate = document.getElementById('dateTime').value;
    var getMinutes = document.getElementById('duration').value;
    var getIssue = document.getElementById('issue').value;
    var getCustomerReports = document.getElementById('customerReports').value;
    var getCause = document.getElementById('cause').value;
    var getSolution = document.getElementById('solution').value;
    var getSlackChannel = document.getElementById('slackChannel').value;

    console.log("This is getDate: " + getDate);

    getMinutes = parseInt(getMinutes);

    // Output should be:
    // MONTH DD, 00:00 AM/PM UTC

    utcNewDate = convertToUTC(getDate);

    //console.log("UTC New Date var: " + utcNewDate);

    // Example: UTC New Date var: Feb 09, 7:07 PM UTC

    endTime = addHours(utcNewDate, getMinutes);

    //console.log('Endtime: ' + endTime);

    // Example: Endtime: 7:29 PM UTC

    var selected = [];
    for (var option of document.getElementById('products').options)
    {
        if (option.selected) {
            selected.push(option.value);
        }
    } 

    // Let's fix our product's list

    fixedProducts = fixProducts(selected);

    getTitle = document.getElementById('title').value;

    var e = document.getElementById("incidentType");
    var cIncidentType = e.value;

    newTitle = capitalizeFirstLetter(getTitle);

    /* 
    
    Final output should look like:

    Title: PRODUCT - ISSUE

    From MONTH DD, 00:00 AM/PM UTC until 00:00 AM/PM UTC, a subset of PRODUCT customers may have experienced ISSUE. Immediately after the root cause of the issue was discovered, it was promptly fixed.

    We have confirmed that the issue has been resolved completely and all systems are 100% operational at this time.

    We will conduct an internal investigation of this issue and make appropriate improvements to our systems to help prevent or minimize future recurrence.
    
    COMMS

    @here
    We had a SEVERITY for PRODUCTS. This incident has been already resolved.

    Timeline - from START-TIME to END-TIME
    Customer Impact - ISSUE
    Final Customer reports - #OF REPORTS SO FAR
    Root Cause - Our engineers identified the issue as being caused by CAUSE
    Resolution -  To mitigate the issue engineers MITIGATION ACTIONS
    Slack Channel - CHANNEL NAME
    Postmortem - A detailed technical document will be shared in the incident slack channel

    */

    html = '<title>Results - Retrospective Status Pages</title>' 
    + '<h1>Extenal Retrospective Status Page Template</h1>' 
    + '<b>Title:</b> ' + cIncidentType + ' - ' + fixedProducts + ' - ' + newTitle 
    + '<br><br>' + 'From ' + utcNewDate + ' until ' + endTime + ', a subset of ' + fixedProducts + ' customers may have experienced ' + getIssue + '. Immediately after the root cause of the issue was discovered, it was promptly fixed.'
    + '<br><br>We have confirmed that the issue has been resolved completely and all systems are 100% operational at this time.' 
    + '<br><br>We will conduct an internal investigation of this issue and make appropriate improvements to our systems to help prevent or minimize future recurrence.<br><br>';

    } catch (error) {
        console.log('Error: ' + error)
        alert('Please make sure all fields are filled up :D')
    }

    return html;
    
}

let capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

let addHours = (change_date, addMinutes) => {

    var newDate = new Date(change_date);
    newDate.setMinutes(newDate.getMinutes() + addMinutes);

    return newDate.toLocaleString("en-US", {
        timeZone: "UTC",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZoneName: "short"
    });
}

let fixProducts = (products) => {

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

let createInternal = () => {

    try {

        var getDate = document.getElementById('dateTime').value;
        var getMinutes = document.getElementById('duration').value;
        var getIssue = document.getElementById('issue').value;
        var getCustomerReports = document.getElementById('customerReports').value;
        var getSlackChannel = document.getElementById('slackChannel').value;
        var getCause = document.getElementById('cause').value;
        var getSolution = document.getElementById('solution').value;
    
        getMinutes = parseInt(getMinutes);
    
        // Output should be:
        // MONTH DD, 00:00 AM/PM UTC
    
        utcNewDate = convertToUTC(getDate);
    
        //console.log("UTC New Date var: " + utcNewDate);
    
        // Example: UTC New Date var: Feb 09, 7:07 PM UTC
    
        endTime = addHours(utcNewDate, getMinutes);
    
        //console.log('Endtime: ' + endTime);
    
        // Example: Endtime: 7:29 PM UTC
    
        var selected = [];
        for (var option of document.getElementById('products').options)
        {
            if (option.selected) {
                selected.push(option.value);
            }
        } 
    
        // Let's fix our product's list
    
        fixedProducts = fixProducts(selected);
    
        getTitle = document.getElementById('title').value;
    
        var e = document.getElementById("incidentType");
        var cIncidentType = e.value;
    
        newTitle = capitalizeFirstLetter(getTitle);
    
        /* 
        
        Title: SEVERITY - PRODUCT - ISSUE

        From MONTH DD, 00:00 AM/PM UTC until 00:00 AM/PM UTC, a subset of PRODUCT customers may have experienced ISSUE.  This incident has been already resolved and we have confirmed that all systems are 100% operational.

        Final Customer reports - #OF REPORTS SO FAR

        Root Cause - Our engineers identified the issue as being caused by CAUSE

        Resolution -  To mitigate the issue engineers MITIGATION ACTIONS

        Slack Channel - CHANNEL NAME

        Postmortem - A detailed technical document will be shared in the incident slack channel
         
        */
    
        html = '<title>Results - Retrospective Status Pages</title>' 
        + '<h1>Internal Retrospective Status Page Template</h1>' 
        + '<b>Title:</b> ' + cIncidentType + ' - ' + fixedProducts + ' - ' + newTitle 
        + '<br><br>' + 'From ' + utcNewDate + ' until ' + endTime + ', a subset of ' + fixedProducts + ' customers may have experienced ' + getIssue 
        + '. This incident has been already resolved and we have confirmed that all systems are 100% operational.'
        + '<br><br>&lt;b&gt;Final Customer Reports - &lt;/b&gt ' + getCustomerReports
        + '<br><br>&lt;b&gt;Root Cause - &lt;/b&gt' + getCause
        + '<br><br>&lt;b&gt;Resolution - &lt;/b&gtTo mitigate the issue GoTo engineers ' + getSolution
        + '<br><br>&lt;b&gt;Slack Channel - &lt;/b&gt ' + getSlackChannel
        + '<br><br>&lt;b&gt;Postmortem - &lt;/b&gtA detailed technical document will be shared in the incident slack channel'

        // This section is specfically for the Comms Response Slack Channel

        + '<br><h1>comms_response Channel - Retrospective</h1>'
        + '@here'
        + '<br>We had a ' + cIncidentType + ' for ' + fixedProducts + '. This incident has been already resolved.'
        + '<br><b>Timeline - </b>' + 'From ' + utcNewDate + ' to ' + endTime
        + '<br><b>Customer Impact - </b>' + newTitle
        + '<br><b>Final Customer Reports - </b>' + getCustomerReports
        + '<br><b>Root Cause - </b>' + 'Our engineers identified the issue as being cause by ' + getCause
        + '<br><b>Resolution - </b>' + getSolution
        + '<br><b>Slack Channel - </b>' + getSlackChannel
        + '<br><b>Postmortem -</b> A detailed technical document will be shared in the incident slack channel'

        // This section is for the Outages GoTo Slack Channel

        + '<h1>outages_goto Channel</h1>'
        + 'Already resolved - ' + cIncidentType + ' - ' + fixedProducts + ' - ' + newTitle + ' - ' + getSlackChannel;
    
        } catch (error) {
            console.log('Error: ' + error)
            alert('Please make sure all fields are filled up :D')
        }
    
        return html;

}

function createInternalOld(){

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
    + 'Title: ' + cIncidentType + ' - ' + fixedProducts + ' - ' + newTitle
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

// External > Internal > Comms > Outages