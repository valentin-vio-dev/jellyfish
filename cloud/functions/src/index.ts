import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const bci = require('bcijs');

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const signalPreprocess = functions.firestore.document("records/{recordId}").onUpdate((change, context) => {
    let id = context.params.recordId;
    let after: any = change.after.data();
    let bandpowers = makeStoreObject(generateBandPower(128, deconstructChannels(after.records)));
    const data = {
        bandpower: bandpowers
    };

    console.log('BAND', bandpowers)
    admin.firestore().collection('bandpowers').doc(id).set(data);
});

function generateBandPower(sampleRate: number, samples: any) {
    return bci.bandpower(samples, sampleRate, ['delta', 'theta', 'alpha', 'beta']);
}

function deconstructChannels(records: any): any {
    let deconstructed: any = [];
    for(let i=0;i<records.length;i++) {
        let channelDatas = stringArrayToNumber(records[i].signals.split('|'));   
        deconstructed.push(channelDatas);
    }
    return deconstructed;
}

function stringArrayToNumber(arr: any) {
    let nums = [];
    for(let i=0;i<arr.length;i++) {
        nums.push(parseFloat(arr[i]));
    }
    return nums;
}

function makeStoreObject(arr: any) {
    let obj: any = {};
    obj['delta'] = arr[0].join('|');
    obj['theta'] = arr[1].join('|');
    obj['alpha'] = arr[0].join('|');
    obj['beta'] = arr[1].join('|');
    return obj;
}

/*export const helloWorld = functions.https.onRequest((request, response) => {
    let sampleRate = 128;
    let duration = 1;
    let samples = generateSignals(sampleRate, duration);


    let bandpowers = bci.bandpower(samples, sampleRate, ['delta', 'theta', 'alpha', 'beta']);

    response.send(bandpowers);
    // response.send("Hello from Jelly functions2!");
});*/



/*function generateSignals(sampleRate: number, duration: number) {
    let len = sampleRate * duration;
    let signals: any[] = [];
    let channel = 14;

    for(let i=0;i<len;i++) {
        let channelsData: number[] = [];
        for(let j=0; j<channel; j++) {
            let val = Math.random() * 1000;
            channelsData.push(val);
        }
        signals.push(channelsData);
    }

    return signals;
}*/

