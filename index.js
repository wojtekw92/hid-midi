const HID = require('node-hid');
const midi = require('midi');
require('console.table');
var devices = HID.devices();
// Set up a new output.
var program = require('commander');

program
 .version('0.1.0')
 .option('-l, --list', 'list HID devices')
 .option('-v, --vid <n>', 'USB device vendor ID', parseInt)
 .option('-p, --pid <n>', 'USB device product ID', parseInt)
 .option('-m, --midi [name]', 'Set virtual midi output name [Test output]', 'Test output')
 .option('-c, --config [name]', 'load config file [config.json]', 'config.json')
 .option('-o, --open', 'open midi device') 
 .option('-r, --raw', 'RAW output of USB device')
 .parse(process.argv);

 if (program.list) {
    var devices = HID.devices();
    console.table(devices);
 } else if (program.raw) {
     if (!program.vid || !program.pid) {
         console.log('You have to specify vid and pid to use raw output');
     } else {
        let device = new HID.HID(program.vid, program.pid);
        device.on("data", function(data) {
            for (var i=0;i<data.length;i++) {
                if(data[i]>0) {
                    console.log(data[i]);
                }
            }
        });
     }
 } else if (program.open) {
     if (!program.vid || !program.pid) {
         console.log('You have to set vid and pid to open miti')
     }
 }
var output = new midi.output();
output.openVirtualPort("Test output");
/*
var device = new HID.HID('0003:000c:00');

var codes = [];
codes['S'] = 1;  // "NUMLOCK"
codes['T'] = 2;  // "/"
codes['U'] = 3;  // "*"
codes['V'] = 4;  // "-"
codes['_'] = 5;  // "7"
codes['`'] = 6;  // "8"
codes['a'] = 7;  // "9"
codes['W'] = 8;  // "+"
codes['\\'] = 9; // "4"
codes[']'] = 10;  // "5"Input
codes['^'] = 11;  // "6"
codes['*'] = 12;  // "backspace"
codes['Y'] = 13;  // "1"
codes['Z'] = 14;  // "2"
codes['['] = 15;  // "3"
codes['X'] = 16;  // "enter"
codes['b'] = 17;  // "0"
codes['c'] = 18;  // "."127127

var deck = 0;
var dropHotCue = 0;
device.on("data", function(data) {
    for (var i=0;i<data.length;i++) {
        if (data[i] > 0) {
            if (codes[String.fromCharCode(data[i])]) {
                var code = codes[String.fromCharCode(data[i])]
                //console.log('KOD: ' + code );                
                if (code === 1) {
                    deck = 0;
                    return;
                }
                if (code === 4) {
                    deck = 40;
                    return;
                }
                if (code === 2) {
                    dropHotCue = dropHotCue === 20 ? 0 : 20;
                    return;
                }
                if (!(code >=5 && code <= 8 ) && dropHotCue === 20) dropHotCue=0;

                output.sendMessage([145,code + deck + dropHotCue,1]);
                output.sendMessage([129,code + deck + dropHotCue,1]);
                console.log("MIDI: " + (code + deck + dropHotCue));
                if (dropHotCue === 20) dropHotCue = 0;
                
            }
        }
    }
});*/
