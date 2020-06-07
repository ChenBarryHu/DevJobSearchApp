var fetch = require('node-fetch');
const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");

const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://jobs.github.com/positions.json'

async function fetchGithub() {
    console.log("fetching github")
    let resultCount = 1, onPage = 0;
    const allJobs = [];




    // fetch all pages
    while(resultCount > 0){
        const res = await fetch(`${baseURL}?page=${onPage}`);
        let jobs;
        try {
            if(res.status == "200"){
                jobs = await res.json();
                allJobs.push(...jobs);
                resultCount = jobs.length;
                console.log('got', resultCount, 'jobs');
                onPage++;
            } else {
                console.log("An error occers");
                // console.error("Response body:", res); 
            }
        } catch(err){
            console.error("Error:", err, "\n");
        }
    }

    console.log('got', allJobs.length, 'jobs total');

    // filter algo:
    const jrJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase();
        let isJunior = true;

        // algo logic
        if(
            jobTitle.includes('senior') ||
            jobTitle.includes('manager') ||
            jobTitle.includes('sr.') ||
            jobTitle.includes('architect')
        ) {
            return false;
        }

        return true;
    })

    console.log('filtered down to', jrJobs.length);

    // set in redit
    
    const success = await setAsync('github', JSON.stringify(jrJobs));

    console.log({success});
}

// fetchGithub();

module.exports = fetchGithub;