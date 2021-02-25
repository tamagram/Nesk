import * as env from '../env/env'

/**
 * Sample JavaScript code for calendar.calendarList.list
 * See instructions for running APIs Explorer code samples locally:
 * https://developers.google.com/explorer-help/guides/code_samples#javascript
 */
function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({ scope: "https://www.googleapis.com/auth/calendar.readonly" })
        .then(function () { console.log("Sign-in successful"); },
            function (err) { console.error("Error signing in", err); });
}
function loadClient() {
    gapi.client.setApiKey(env.YOUR_API_KEY);
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest", "v3")
        .then(function () { console.log("GAPI client loaded for API"); },
            function (err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
    
    return gapi.client.calendar.calendarList.list({})
        .then(function (response) {
            // Handle the results here (response.result has the parsed body).
            console.log("Response", response);
        },
            function (err) { console.error("Execute error", err); });
}
/**
    *  Called when the signed in status changes, to update the UI
    *  appropriately. After a sign-in, the API is called.
    */
function updateSigninStatus(isSignedIn: boolean) {
    if (isSignedIn) {
        console.log("signinnow");
        document.getElementById("signInButton")!.style.display = 'none';
        document.getElementById("signOutButton")!.style.display = 'block';
    } else {
        console.log("signoutnow");
        document.getElementById("signOutButton")!.style.display = 'none';
        document.getElementById("signInButton")!.style.display = 'block';
    }
}

gapi.load("client:auth2", function () {
    alert('oauth init');
    gapi.auth2.init({ client_id: env.YOUR_CLIENT_ID })
        .then(() => {
            alert('oauth init then');
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

            // Handle the initial sign-in state.
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
});
export const oauthSignIn = () => {
    alert('oauthSignInFunc');
    authenticate().then(loadClient, execute);
}
export const oauthSignOut = () => {
    alert('oauthSignOutFunc');
    gapi.auth2.getAuthInstance().signOut();
    gapi.auth2.getAuthInstance().disconnect();
}
