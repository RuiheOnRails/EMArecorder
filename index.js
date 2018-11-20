var trackingData = [];

function convertArrayOfObjectsToCSV(args) {  
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}

function downloadCSV(args) {  
    var data, filename, link;
    var csv = convertArrayOfObjectsToCSV({
        data: trackingData
    });
    if (csv == null) return;

    filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
}

function getCurrentTimeInString(){
    return (new Date).toLocaleString();
}

function addToTrackingData(emotion, time){
    var obj = {
        Emotion: "",
        Date: "",
        TimeStamp: ""
    };
    obj.Emotion = emotion;
    obj.Date = time;
    trackingData.push(obj);
}

document.querySelector("#btnStart").addEventListener("click", (e) =>{
    e.preventDefault()
    addToTrackingData("Start",getCurrentTimeInString());
})

document.querySelector("#btnBore").addEventListener("click", (e) =>{
    e.preventDefault()
    addToTrackingData("Bored",getCurrentTimeInString());
})

document.querySelector("#btnEnCo").addEventListener("click", (e) =>{
    e.preventDefault()
    addToTrackingData("Engaged and Concentrated",getCurrentTimeInString());
})

document.querySelector("#btnFrus").addEventListener("click", (e) =>{
    e.preventDefault()
    addToTrackingData("Frustrated",getCurrentTimeInString());
})

document.querySelector("#btnDeli").addEventListener("click", (e) =>{
    e.preventDefault()
    addToTrackingData("Delight",getCurrentTimeInString());
})

document.querySelector("#btnConf").addEventListener("click", (e) =>{
    e.preventDefault()
    addToTrackingData("Confused",getCurrentTimeInString());
})

document.querySelector("#btnSupr").addEventListener("click", (e) =>{
    e.preventDefault()
    addToTrackingData("Surprised",getCurrentTimeInString());
})

document.querySelector("#btnNeut").addEventListener("click", (e) =>{
    e.preventDefault()
    addToTrackingData("Neutral",getCurrentTimeInString());
})

document.querySelector("#btnStop").addEventListener("click", (e) =>{
    e.preventDefault()
    addToTrackingData("Stop",getCurrentTimeInString());
})

document.querySelector("#btnReset").addEventListener("click", (e) =>{
    e.preventDefault()
    trackingData = [];
})

document.querySelector("#btnDownload").addEventListener("click", (e) =>{
    e.preventDefault()
    convertArrayOfObjectsToCSV(trackingData);
    downloadCSV({});
})
