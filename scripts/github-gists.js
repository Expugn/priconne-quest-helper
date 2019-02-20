const gist_default_data_file_name = "priconne-quest-helper_data.json";
const gist_default_data_file_description = "Export data for priconne-quest-helper.";
const gist_default_user_name = "spugn";
const gist_default_file_timeout = 1209600000;                                           // 2 WEEKS
const rate_limit_cooldown = 5;                                                          // DISABLE API INFORMATION GATHERING AT THIS AMOUNT OR BELOW

// CALLING A FUNCTION USES 1 RATE LIMIT / 60

function create_gist(content)
{
    return {
        "description": gist_default_data_file_description,
        "public": false,
        "files": {
            [gist_default_data_file_name]:
                {
                    "content": content
                }
        }
    };
}

function upload_gist(gist_data, callback)
{
    // CREATE GIST
    $.ajax({
        url: 'https://api.github.com/gists',
        type: 'POST',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "token " + GITHUB_GIST_KEY);
        },
        dataType: 'json',
        data: JSON.stringify(gist_data),
        success: function(response) {
            console.log(JSON.stringify(response));
            if (callback)
            {
                console.log("[Github API] - Success! Gist ID: " + response.id);
                callback(response.id);
            }
        },
        error: function(e)
        {
            console.warn("[Github API] - Gist Saving Error: ", JSON.stringify(e));

            // for export-data
            document.getElementById("export-failure").innerHTML = "<h2 class='align-center'>" + e["status"] + " - " + e["statusText"] + "</h2>";
            document.getElementById("export-failure").style.display = "block";
        }
    });
}

function read_gist(gist_id, callback)
{
    // GET GIST
    $.ajax({
        url: ('https://api.github.com/gists/' + gist_id),
        type: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "token " + GITHUB_GIST_KEY);
        },
        success: function(response)
        {
            if (callback)
            {
                if (response["owner"]["login"] === gist_default_user_name)
                {
                    // GIST IS WRITTEN BY THE CORRECT USER
                    if (response["truncated"] === true)
                    {
                        // GIST IS TRUNCATED (TOO LARGE), FETCH RAW VERSION.
                        let raw_url = response["files"][gist_default_data_file_name]["raw_url"];
                        console.log("[Github API] - File is truncated... Fetching RAW version: " + raw_url);

                        $.ajax({
                            url: raw_url,
                            type: 'GET',
                            success: function(response)
                            {
                                // FILE IS COOL AND GOOD
                                callback(response);
                            },
                            error: function(e)
                            {
                                console.warn("[Github API] - RAW File Fetch Error: ", JSON.stringify(e));

                                // for import-data
                                document.getElementById("import-failure").innerHTML = "<h2 class='align-center'>" + e["status"] + " - " + e["statusText"] + "</h2>";
                                document.getElementById("import-failure").style.display = "block";
                            }
                        });
                    }
                    else
                    {
                        // FILE IS COOL AND GOOD
                        console.log("[Github API] - Gist Read Success!: \"" + response.files[gist_default_data_file_name].content + "\"");
                        callback(response.files[gist_default_data_file_name].content);
                    }

                }
                else
                {
                    console.log("[Github API] - Fetched Gist is NOT Made By " + gist_default_user_name);

                    // for import-data
                    document.getElementById("import-failure").innerHTML = "<h2 class='align-center'>Invalid ID Provided!</h2>";
                    document.getElementById("import-failure").style.display = "block";
                }
            }
        },
        error: function(e)
        {
            console.warn("[Github API] - Gist Fetch Error: ", JSON.stringify(e));

            // for import-data
            document.getElementById("import-failure").innerHTML = "<h2 class='align-center'>" + e["status"] + " - " + e["statusText"] + "</h2>";
            document.getElementById("import-failure").style.display = "block";
        }
    });
}

function verify_gist(gist_id, callback)
{
    // VERIFY THAT THE GIST IS CREATED BY GIT-HUB ACCOUNT "spugn"
    $.ajax({
        url: 'https://api.github.com/gists/' + gist_id,
        type: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "token " + GITHUB_GIST_KEY);
        },
        success: function(response)
        {
            if (callback)
            {
                callback(response["owner"]["login"] === gist_default_user_name);
            }
        },
        error: function(e)
        {
            console.warn("[Github API] - Gist Verify Error: ", JSON.stringify(e));
        }
    });
}

function delete_gist(gist_id, callback)
{
    // DELETE GIST
    $.ajax({
        url: 'https://api.github.com/gists/' + gist_id,
        type: 'DELETE',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "token " + GITHUB_GIST_KEY);
        },
        success: function(response)
        {
            if (callback)
            {
                callback(jQuery.isEmptyObject(response));
            }
        },
        error: function(e)
        {
            console.warn("[Github API] - Gist Delete Error: ", JSON.stringify(e));
        }
    });
}

function delete_old_gists(callback)
{
    const two_weeks_in_milli = 1209600000;
    let time = new Date().getTime();
    let date = new Date(time);
    //console.log(date.toString() + " - " + date.toISOString());

    // GET ALL OF GIST_DEFAULT_USER_NAME'S GISTS
    $.ajax({
        url: 'https://api.github.com/users/' + gist_default_user_name + '/gists',
        type: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "token " + GITHUB_GIST_KEY);
        },
        since: date.toISOString(),
        success: function(response)
        {
            console.log(JSON.parse(response));
            /*
            for (let file of Object.keys(response.files))
            {
                console.log("file_name = " + JSON.parse(file));

                // CHECK IF FILE NAME IS THE DEFAULT DATA FILE NAME
                if (response.files[file.filename] === gist_default_data_file_name)
                {
                    // FILE IS CREATED AFTER DEFAULT_TIME_OUT/CREATED BY DEFAULT_USER_NAME/NAMED DEFAULT_FILE_NAME
                    // DELETE THIS CRAP LOL
                    console.log("run delete here");
                }
            }
            */
        },
        error: function(e)
        {
            console.warn("user gists get error", JSON.stringify(e));
        }
    });
}

function check_rate_limit_status(callback)
{
    // CHECK RATE LIMIT STATUS
    $.ajax({
        url: 'https://api.github.com/rate_limit',
        type: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "token " + GITHUB_GIST_KEY);
        },
        success: function(response)
        {
            if (callback)
            {
                let rate_limit_remaining = JSON.parse(response["resources"]["core"]["remaining"]);
                let rate_limit_reset = parseInt(response["resources"]["core"]["reset"]);
                let rate_limit_limit = parseInt(response["resources"]["core"]["limit"]);

                console.log("[Github API] - " + rate_limit_remaining + "/" + rate_limit_limit + " API calls remaining.");
                if (rate_limit_remaining < rate_limit_cooldown)
                {
                    let time = new Date() + rate_limit_reset;
                    let date = new Date(time);
                    console.log("[Github API] - Under Cooldown! \"" + date.toString() + "\" for the next reset.");
                    callback(true, date.toString());
                }
                else
                {
                    callback(false, "");
                }
            }
        },
        error: function(e)
        {
            console.warn("[Github API] - Rate Limit Status Check Error: ", JSON.stringify(e));
        }
    });
}