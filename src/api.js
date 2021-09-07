const API_KEY = process.env.VUE_APP_SOCCERKEY;

export const loadStatistics = (UrlPart, whatLoad) => { 
    return fetch('http://api.football-data.org/v2/'+UrlPart, {
        method: 'GET',
        headers: {
            'X-Auth-Token': API_KEY
        }
    }).then(responseJson => responseJson.json())
    .then((data) => data[whatLoad])
}
