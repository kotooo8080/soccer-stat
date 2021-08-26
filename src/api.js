const API_KEY = '10e9e237b4364e74ac289cae61bbd39e'; 

export const loadStatistics = (context, UrlPart, whatLoad) => { 
    return fetch('http://api.football-data.org/v2/'+UrlPart, {
        method: 'GET',
        headers: {
            'X-Auth-Token': API_KEY
        }
    }).then(responseJson => responseJson.json())
    .then((data) => {
        context[whatLoad] = data[whatLoad];
    });
}