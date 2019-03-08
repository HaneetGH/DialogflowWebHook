const functions = require('firebase-functions');
const api = require('../api/Tracking');
const {dialogflow} = require('actions-on-google');
const {SignIn} = require('actions-on-google');
const axios = require('axios');
const WELCOME_INTENT = 'Default Welcome Intent';
const FALLBACK_INTENT = 'Default Fallback Intent';
const request = require("request");


//FOLLOW UPS
const CAR_TRACK_FOLLOWUP_INTENT = "car track - info";
const CAR_TRACK_LEGACY_FOLLOWUP_INTENT = "car track - legacy";

const CAR_INFO_FOLLOWUP_INTENT = "car info - track";
const CAR_INFO_LEGACY_FOLLOWUP_INTENT = "car info - legacy";
const CAR_INFO_ITSELF_FOLLOWUP_INTENT = "car info - itself";

const CAR_LEGACY_LOCATION_FOLLOWUP_INTENT = "car legacy - location";
const CAR_LEGACY_INFO_FOLLOWUP_INTENT = "car legacy - info";
const CAR_LEGACY_SELF_FOLLOWUP_INTENT = "car legacy - self";

//BASE
const CAR_TRACK_INTENT = "car track";
const CAR_INFOR_INTENT = "car info";
const CAR_LEGACY_INTENT = "car legacy";
const BASEURL = 'http://apis.letstrak.com/Ver1.1/API/';
const API_END = 'GetDeviceVoiceAiDetails';

//const http = require('http');
//const async = require('asyncawait/async');
//const await = require('asyncawait/await');

const TENANT_TYPE_GOOGLE = 1;
const LEGACY_API = 1;
const DETAIL_API = 0;

const WELCOME_MESSAGE = "Welcome to Letstrack AI. I will help you in number of stuff. Just ask Help for detail";


const CAR_TYPE_ENTITY = 'car';
const CAR_INFO_ENTITY = 'car';
const CAR_AINFO_ENTITY = 'aInfo';
const GOOGLE_SIGNIN = 'Get Signin';
const CAR_INFO_DETAIL_ENTITY = 'item';
var express = require('express');
var router = express.Router();


var {WebhookClient} = require('dialogflow-fulfillment');

router.post('/', function (req, res, next) {


    const agent = new WebhookClient({
        request: req,
        response: res
    });

    function realTimeTrack(agent) {
        const car_type = agent.parameters[CAR_TYPE_ENTITY];
        return api.callTrackAPi(agent, car_type, "haneet555@Gmail.com")
    }

    function realTimeInfo(agent) {
        const car = agent.parameters[CAR_INFO_ENTITY];

        const car_item = agent.parameters[CAR_INFO_DETAIL_ENTITY];

        return api.callCarDetailApi(agent, car, car_item, 1, "haneet555@Gmail.com")
    }


    let intentMap = new Map();
    intentMap.set(CAR_TRACK_INTENT, realTimeTrack);
    intentMap.set(CAR_INFOR_INTENT, realTimeInfo);
    agent.handleRequest(intentMap);


});


module.exports = router;
