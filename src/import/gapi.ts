import * as env from '../env/env'
import * as interfaces from '../interfaces'
import { controller } from '../main'

// Client ID and API key from the Developer Console
var CLIENT_ID = env.YOUR_CLIENT_ID;
var API_KEY = env.YOUR_API_KEY;

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('signInButton');
var signoutButton = document.getElementById('signOutButton');

/**
 *  On load, called to load the auth2 library and API client library.
 */
export function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function (error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        console.log('listUpcomingEvents');
        listUpcomingEvents();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
    gapi.auth2.getAuthInstance().disconnect();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */

let eventList: interfaces.EnteredValuesOfSchedule[] = [];

export function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then(function (response) {
        var events = response.result.items;
        console.log(events);
        // appendPre('Upcoming events:');

        if (events.length > 0) {
            for (let i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                // console.log(event.start.dateTime.slice(0, 10));
                // console.log(event.start.dateTime.slice(11, 16));
                if (!when) {
                    when = event.start.date;
                }
                // appendPre(event.summary + ' (' + when + ')')

                //eventListに追加
                eventList = [];
                eventList.push({
                    scheduleName: event.summary,
                    scheduleDetails: event.description,
                    yyyymmdd: event.start.dateTime.slice(0, 10),
                    hhmm: event.start.dateTime.slice(11, 16),
                    id: event.id,
                });
            }
            controller.Model.setScheduleGroup(eventList);
            controller.View.rendering();
        } else {
            // appendPre('No upcoming events found.');
        }

    });
}
