/************************API HIT*******************************************/
const BASEURL = 'http://apis.letstrak.com/Ver1.1/API/';
const API_END = 'GetDeviceVoiceAiDetails';
const TENANT_TYPE_GOOGLE = 1;
const gVariables = require('../variables/GlobalVariable');
const YOUR_APPS_CLIENT_ID = '89309789151-0cor9to8mv938tvkhjeato07aqnqdv9s.apps.googleusercontent.com';
const axios = require('axios');

exports.callTrackAPi = function (agent, car_type, email) {


    var value = "";
    // agent.ask('Fetching');
    // let result =  doRequest('http://a7e3898d.ngrok.io/v1/languages/login',agent);


    console.log("DO_MY_THING");
    return axios
        .post(BASEURL + API_END, {
            "emailId": email,
            "name": car_type,
            "voiceAiTypeId": TENANT_TYPE_GOOGLE

        }, {
            headers: {

                ContentType: 'application/json',
                Authorization: 'Basic TGV0c3RyYWs6TFRTQE5vd0luSW5kaWE='
            }
        }, {
            params: {
                "emailId": email,
                "name": car_type,
                "voiceAiTypeId": TENANT_TYPE_GOOGLE
            }
        })
        .then(res => {
            console.log("res", res.data);

            if (res.data.result.code != 1) {
                agent.add("It seems Your " + car_type + " is'nt connected with any register device. Please check your Letstrack Application for more details.");
            } else
                agent.add("Your " + car_type + " is at  " + res.data.address + ", Last Updated on " + res.data.time);
            // agent.add("Last seen on " + res.data.time);
        })
        .catch(err => {
            console.log("err", err);
            agent.add("didnt do the thing");
        });

    // agent.add('Value is here:'+JSON.stringify(result));
    /* (async (function testingAsyncAwait() {
       await (fetch('http://4d803b89.ngrok.io/v1/languages/login')
       .then(res => agent.add(res.json()))

       .then(json => console.log(json)));
   }))();*/


}
exports.callCarDetailApi = function (agent, car, car_item, from, email) {

    console.log("Email:" + email)
    console.log("Car:" + car)

    return axios
        .post(BASEURL + API_END, {
            "emailId": email,
            "name": car,
            "voiceAiTypeId": TENANT_TYPE_GOOGLE
        }, {
            headers: {

                ContentType: 'application/json',
                Authorization: 'Basic TGV0c3RyYWs6TFRTQE5vd0luSW5kaWE='
            }
        }, {
            params: {

                "emailId": email,
                "name": car,
                "voiceAiTypeId": TENANT_TYPE_GOOGLE

            }
        })
        .then(res => {
            console.log("res", res.data);
            // })
            if (res.data.result.code == 2) {
                conv.close("It seems Your " + car + " is'nt connected with any register device. Please check your Letstrack Application for more details.");
            } else if (res.data.result.code == 1) {
                if (from == gVariables.LEGACY_API) {

                    if (car_item == "Average Speed" || car_item == "average speed")
                        conv.add("You " + car + " Average is :" + res.data.avgSpeed);
                    else if (car_item == "Max Speed" || car_item == "maximum speed")
                        conv.add("You " + car + " Maximum Speed is :" + res.data.maxSpeed);
                    else if (car_item == "Number of Stops" || car_item == "number of stops" || car_item == "stops")
                        conv.add("You " + car + " 's Number of Stops are' :" + res.data.totalStops);
                    else if (car_item == "Engine on Time" || car_item == "engine on time")
                        conv.add("You " + car + " Engine On time is :" + res.data.engOnTime);
                    else if (car_item == "Distance Traveled" || car_item == "distance traveled")
                        conv.add("You " + car + " Total Traveled Distance is :" + res.data.trvledDist);
                    else if (car_item == "Min Speed" || car_item == "minimum speed")
                        conv.add("You " + car + " Average is :" + res.data.minSpeed);
                    else if (car_item == "Fuel Consumption" || car_item == "Fuel" || car_item == "gas  consumption")
                        conv.add("You " + car + " Minimum Speed is :" + res.data.fuelConsumed);

                    else if (car_item == "speed" || car_item == "momentum" || car_item == "velocity")
                        conv.add("Your " + car + "'s " + car_item + " is " + res.data.speed);
                    else
                        conv.ask("I missed it. Please try again with more information");

                } else if (from == gVariables.DETAIL_API) {

                    if (car_item == "battery" || car_item == "cell")
                        conv.add("Your " + car + "'s " + car_item + " Status is " + res.data.battery + " %");
                    else if (car_item == "ignitionStatus" || car_item == "flaming" || car_item == "engine" || car_item == "motor" || car_item == "machine")
                        conv.add("Your " + car + "'s " + car_item + " Status is " + res.data.ignitionStatus);
                    else if (car_item == "speed" || car_item == "momentum" || car_item == "velocity")
                        conv.add("Your " + car + "'s " + car_item + " is " + res.data.speed);
                    else if (car_item == "mileage" || car_item == "total run" || car_item == "Total Run" || car_item == "distance")
                        conv.add("Your " + car + "'s " + car_item + " Status is " + res.data.mileage + " KM");
                    else if (car_item == "ac" || car_item == "AC" || car_item == "Climate Control" || car_item == "climate control" || car_item == "Central Air" || car_item == "central air" || car_item == "air conditioning" || car_item == "air conditioner" || car_item == "Air Conditioner")
                        conv.add("Your " + car + "'s " + car_item + " Status is " + res.data.ac);
                    else if (car_item == "fuel" || car_item == "petrol" || car_item == "diesel" || car_item == "gas" || car_item == "oil")
                        conv.add("Your " + car + "'s " + car_item + " Status is " + (res.data.fuelstatus));
                    else if (car_item == "stops")
                        conv.add("Your " + car + "'s " + car_item + " total stops are " + (res.data.totalStops));
                    else
                        conv.ask("I missed it. Please try again with more information");
                }
            }

        })
        .catch(err => {
            console.log("err", err);
            conv.ask("I can't do that right now! But I'm learning new skills every day.");
        });
}