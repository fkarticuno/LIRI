var inquirer = require('inquirer') 
var spotify = require('spotify');
var axios = require("axios");

inquirer
.prompt([
    {
      type: 'list',
      message: "What are you looking for?",
      choices: ['music','movies','Bands In Town'],
      name:"Search1",
    }
]).then (function(inquirerResponse) {
    console.log(inquirerResponse)
    if (inquirerResponse.Search1 =='music') {
        console.log('music')
        inquirer
            .prompt([
                {
                type: 'input',
                message: "What music are you looking for?",
                name:"SearchMusic",
                }
            ]).then (function(inquirerResponse) { 
                console.log("Looking for",inquirerResponse.SearchMusic,"music...")
                spotify.search({ type: 'track', query: inquirerResponse.SearchMusic}, function(err, data) {
                    if ( err ) {
                        console.log('Error occurred: ' + err);
                        return;
                    }
                    console.log(data)
                });
            }
        )}
//===================================================================================================================
    if (inquirerResponse.Search1 =='movies') {
        console.log('movies')
        inquirer
            .prompt([
                {
                type: 'input',
                message: "What movie are you looking for?",
                name:"SearchMovies",
                }
            ]).then (function(inquirerResponse) { 
                console.log("Looking for",inquirerResponse.SearchMovies,"Movie...")
                axios.get("http://www.omdbapi.com/?t="+ inquirerResponse.SearchMovies +"&y=&plot=short&apikey=trilogy").then(
                    function(response) {
                        console.log("The movie's info is: " + JSON.stringify(response.data));
                    }
                );
            }
        )}    
//===================================================================================================================
    if (inquirerResponse.Search1 =='Bands In Town') {
        console.log('Bands In Town')
        inquirer
            .prompt([
                {
                type: 'input',
                message: "What Bands are you looking for?",
                name:"SearchBandsInTown",
                }
            ]).then (function(inquirerResponse) { 
                console.log("Looking for",inquirerResponse.SearchBandsInTown,"Bands in town...")
                // axios.get("http://www.bandsintown.com/event/13722599?app_id=foo&artist=Skrillex&came_from=67").then(
                //     function(response) {
                //         console.log("The band's info is: " + JSON.stringify(response.data));
                axios.get("https://rest.bandsintown.com/artists"+inquirerResponse.SearchBandsInTown).then (
                    function(response,err) {
                        if ( err ) {
                            console.log('Error occurred: ' + err);
                            return;
                        }
                        console.log(JSON.stringify(response.data));
                    }

                );
            }
        )}
});