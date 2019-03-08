const functions = require('firebase-functions');
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

var express = require('express');
var router = express.Router();

 const LEGACY_API = 1;
 const DETAIL_API = 0;
var {WebhookClient} = require('dialogflow-fulfillment');