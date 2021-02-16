import * as env from './env/env';
import * as interfaces from './interfaces';

export class Authorization implements interfaces.Authorization {
    constructor() {
        alert('authorization生成');
    }
    /*
    * Create form to request access token from Google's OAuth 2.0 server.
    */
    _oauth2SignIn = () => {
        // Google's OAuth 2.0 endpoint for requesting an access token
        let _oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

        // Create element to open OAuth 2.0 endpoint in new window.
        let _form = document.createElement('form');
        _form.setAttribute('method', 'GET'); // Send as a GET request.
        _form.setAttribute('action', _oauth2Endpoint);

        // Parameters to pass to OAuth 2.0 endpoint.
        let _params = {
            'client_id': env.YOUR_CLIENT_ID,
            'redirect_uri': env.YOUR_REDIRECT_URI,
            'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
            'state': 'try_sample_request',
            'include_granted_scopes': 'true',
            'response_type': 'token'
        };

        // Add form parameters as hidden input values.
        for (let p in _params) {
            let _input = document.createElement('input');
            _input.setAttribute('type', 'hidden');
            _input.setAttribute('name', p);
            _input.setAttribute('value', _params[p]);
            _form.appendChild(_input);
        }

        // Add form to page and submit it to open the OAuth 2.0 endpoint.
        document.body.appendChild(_form);
        _form.submit();
    }
    // If there's an access token, try an API request.
    // Otherwise, start OAuth 2.0 flow.
    _trySampleRequest = () => {
        // let params = JSON.parse(localStorage.getItem('oauth2-test-params'));
        let _params = document.cookie;
        console.log(document.cookie);
        if (_params && _params['access_token']) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET',
                'https://www.googleapis.com/drive/v3/about?fields=user&' +
                'access_token=' + _params['access_token']);
            xhr.onreadystatechange = (e) => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log(xhr.response);
                } else if (xhr.readyState === 4 && xhr.status === 401) {
                    // Token invalid, so prompt for user permission.
                    this._oauth2SignIn();
                }
            };
            xhr.send(null);
        } else {
            this._oauth2SignIn();
        }
    }

    writeCookie = () => {
        console.log('writeCookie();');
        let _fragmentString = location.hash.substring(1);
        // Parse query string to see if page request is coming from OAuth 2.0 server.
        let _params = {};
        let _regex = /([^&=]+)=([^&]*)/g, m;
        while (m = _regex.exec(_fragmentString)) {
            _params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        if (Object.keys(_params).length > 0) {
            // localStorage.setItem('oauth2-test-params', JSON.stringify(params));
            document.cookie = "oquth2-test-params=" + _params;
            console.log(document.cookie);
            if (_params['state'] && _params['state'] == 'try_sample_request') {
                this._trySampleRequest();
            }
        }
    }
    deleteCookie = () => {

    }
}


