function myTimer() {
    var d = new Date();
    var dd = d.getDate();
    var mm = d.getMonth() + 1; //January is 0!
    var yyyy = d.getFullYear();
    // $(".pukul").text(d.toLocaleTimeString('en-GB'))
    // targett.text(d.toLocaleTimeString('en-GB'))
    // document.getElementById("demo").innerHTML = d.toLocaleTimeString('en-GB');
    return d.toLocaleTimeString('en-GB')
    // document.getElementById("tanggal").innerHTML = d.getDate() + ' ' + month[mm] + ' ' + yyyy;
}

function increaseTm(btn) {
    myTimer(btn)
}

function gtDate() {
    var d = new Date();
    d = (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear();
    return d;
}

function toTmHr(th) {
    return (('0' + th.getHours()).slice(-2)) + ':' + (('0' + th.getMinutes()).slice(-2));
}

function addMinute(tm, add) {
    var aDD = new Date(tm);
    var rAdd = aDD.setMinutes(tm.getMinutes() + add);
    rAdd = new Date(rAdd);
    return rAdd;
}

function toDate(dt) {
    var tDate = new Date(Date.parse(dt, "MM-dd-yyyy hh:mm:ss"));
    return tDate;
}

$('#staInput').on('change', function () {
    var sta = $(this).val();
    sta = new Date(sta);
    $('#staShow').text(toTmHr(sta));
    $('#staDateShow').text(sta.getDate() + '/' + (sta.getMonth() + 1) + '/' + sta.getFullYear().toString().substr(2, 2));
})

$('#stdInput').on('change', function () {
    var std = new Date($(this).val());
    $('#stdShow').text(toTmHr(std));
})

var cbt = toDate('12-20-2021 13:45:30');
var cbt2 = addMinute(cbt, 10);

var tgtBo;
var tgtDs;
var tgtDf;
var tgtCf;
var tgtBs;
var tgtBf;
var tgtDc;
var tgtPb;

var sta;
var ata;
var std;
var aht;

var racStart = 0;

$('#racStart').on('click', function () {
    if (racStart == 1) {
        var ctTime = gtDate() + ' ' + $(this).text();
        ctTime = toDate(ctTime);
        sta = new Date($('#staInput').val());
        ata = ctTime;
        std = new Date($('#stdInput').val());
        ata = new Date();

        aht = Math.ceil((std - ata) / 60000);
        $('#aht').text('AHT: ' + aht + ' Minute');

        if (aht <= 43) {
            tgtBo = addMinute(std, -35);
            tgtDs = addMinute(ata, 2);
            tgtDf = addMinute(ata, 10);
            tgtCf = addMinute(ata, 11);
            tgtBs = addMinute(ata, 14);
            tgtBf = addMinute(ata, 32);
            tgtDc = addMinute(ata, 34);
            tgtPb = addMinute(ata, 35);
        } else {
            tgtBo = null;
            tgtDs = addMinute(std, -42);
            tgtDf = addMinute(std, -34);
            tgtCf = addMinute(std, -33);
            tgtBs = addMinute(std, -30);
            tgtBf = addMinute(std, -12);
            tgtDc = addMinute(std, -10);
            tgtPb = addMinute(std, -9);
        }

        if (tgtBo == null) {
            $('#tgtBo').text('N/A');
        } else {
            $('#tgtBo').text(toTmHr(tgtBo));
        }
        $('#tgtDs').text(toTmHr(tgtDs));
        $('#tgtDf').text(toTmHr(tgtDf));
        $('#tgtCf').text(toTmHr(tgtCf));
        $('#tgtBs').text(toTmHr(tgtBs));
        $('#tgtBf').text(toTmHr(tgtBf));
        $('#tgtDc').text(toTmHr(tgtDc));
        $('#tgtPb').text(toTmHr(tgtPb));
    } else {
        racStart = 1;
    }
})

var i = 0
var myInterval
$('.cp_time').on('click', function () {
    var sta = new Date($('#staInput').val());
    var sta2 = addMinute(sta, 60);

    (i == 1) ? i = 0 : i = 1
    var btn = $(this)
    btn.removeClass('btn-danger').removeClass('btn-secondary').addClass('btn-warning')
    var paren = btn.parent().next().find('button')

    if (i == 1) {
        btn.text(myTimer);
        myInterval = setInterval(startT, 1000);
    } else {
        btn.removeClass('btn-warning').addClass('btn-success');
        btn.prop('disabled', true);
        stopT();
    }

    function startT(tgt) {
        btn.text(myTimer);
    }

    var actBo;
    var actDs;
    var actDF;
    var actCf;
    var actBs;
    var actBf;
    var actDc;
    var actPb;

    function truncDtime(tgtVal) {
        return new Date((tgtVal.getMonth() + 1) + '-' + tgtVal.getDate() + '-' + tgtVal.getFullYear() + ' ' + tgtVal.getHours() + ':' + tgtVal.getMinutes() + ':00');
    }

    function stopT() {
        clearInterval(myInterval);
        var prevBtn = btn.parent().prev().find('button');
        var tgtVal = window['tgt' + btn.data('ct')];
        var prevTgtVal = window['tgt' + prevBtn.data('ct')];
        var prevCp = window['act' + prevBtn.data('ct')];

        var actPcs;
        if (prevCp != undefined) {
            actPcs = Math.floor((truncDtime(new Date()) - truncDtime(prevCp)) / 60000);
        } else {
            actPcs = null;
        }

        var tgtPcs;
        if (btn.data('ct') == 'Ds') {
            tgtPcs = Math.floor((tgtVal - addMinute(tgtVal, -2)) / 60000);
        } else if (btn.data('ct') == 'Bo') {
            tgtPcs = null;
        } else {
            tgtPcs = Math.floor((truncDtime(tgtVal) - truncDtime(prevTgtVal)) / 60000);
        }

        if (actPcs != null && tgtPcs != null) {
            console.log('tgtPcs: ' + tgtPcs);
            console.log('actPcs: ' + actPcs);
            var devPcs = actPcs - tgtPcs;
            $('#devp' + prevBtn.data('ct')).text(devPcs);
            console.log('Pcs dev: ' + (devPcs));
        }

        // var tgtProc = (window['tgt' + btn.data('ct')] - window['tgt' + prevBtn.data('ct')]) / 60000;
        window['act' + btn.data('ct')] = new Date();
        var devPoint = null;
        if (tgtVal != null) {
            // var cg = (tgtVal.getMonth() + 1) + '-' + tgtVal.getDate() + '-' + tgtVal.getFullYear() + ' ' + tgtVal.getHours() + ':' + tgtVal.getMinutes() + ':00';
            var cg = truncDtime(tgtVal);
            tgtVal = toDate(cg);
            if (tgtVal != null) {
                devPoint = (new Date() - tgtVal) / 60000;
                devPoint = Math.floor(devPoint);
            } else {
                devPoint = null;
            }
        }
        tgtVal = new Date(window['tgt' + btn.data('ct')]);
        var ct = btn.data('ct');
        $('#dev' + ct).text(devPoint);
        paren.text(myTimer);
        paren.removeClass('btn-secondary').addClass('btn-warning');
        paren.prop('disabled', false);
        myInterval = setInterval(nextStart, 1000);
        i = 1;
    }

    function nextStart() {
        paren.text(myTimer)
    }
})