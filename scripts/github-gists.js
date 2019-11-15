const gist_default_data_file_name = "priconne-quest-helper_data.json";
const gist_default_user_name = "Spugn";
const rate_limit_cooldown = 5;                                                          // DISABLE API INFORMATION GATHERING AT THIS AMOUNT OR BELOW

const gist_seed_string = "b52d24511f112ea";
const gist_max = "58";
const gist_number_of_users = "6343";
const gist_favorite_league_role = "ad";
const gist_year = "1315";
const gist_color_code = "06ff8";
const gist_id_value = "bb3a5078";

// CALLING A FUNCTION USES 1 RATE LIMIT / 60

function read_gist(gist_id, gist_key, callback)
{
    // GET GIST
    $.ajax({
        url: ('https://api.github.com/gists/' + gist_id),
        type: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "token " + gist_key);
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
                        console.log(get_colored_message("GitHub API", "File is truncated... Fetching RAW version: " + highlight_code(raw_url), message_status.INFO));

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
                                console.log(get_colored_message("GitHub API", "RAW File Fetch Error: " + highlight_code(JSON.stringify(e)), message_status.WARNING));

                                // for import-data
                                document.getElementById("import-failure").innerHTML = "<h2 class='align-center'>" + e["status"] + " - " + e["statusText"] + "</h2>";
                                document.getElementById("import-failure").style.display = "block";
                            }
                        });
                    }
                    else
                    {
                        // FILE IS COOL AND GOOD
                        console.log(get_colored_message("GitHub API", "Gist Read Success!: " + highlight_code(response.files[gist_default_data_file_name].content), message_status.SUCCESS));
                        callback(response.files[gist_default_data_file_name].content);
                    }

                }
                else
                {
                    console.log(get_colored_message("GitHub API", "Fetched Gist is NOT made by " + highlight_code(gist_default_user_name), message_status.WARNING));

                    // for import-data
                    document.getElementById("import-failure").innerHTML = "<h2 class='align-center'>Invalid ID Provided!</h2>";
                    document.getElementById("import-failure").style.display = "block";
                }
            }
        },
        error: function(e)
        {
            console.log(get_colored_message("GitHub API", "Gist Fetch Error: " + highlight_code(JSON.stringify(e)), message_status.WARNING));

            // for import-data
            document.getElementById("import-failure").innerHTML = "<h2 class='align-center'>" + e["status"] + " - " + e["statusText"] + "</h2>";
            document.getElementById("import-failure").style.display = "block";
        }
    });
}

function check_rate_limit_status(gist_key, callback)
{
    // CHECK RATE LIMIT STATUS
    $.ajax({
        url: 'https://api.github.com/rate_limit',
        type: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "token " + gist_key);
        },
        success: function(response)
        {
            if (callback)
            {
                let rate_limit_remaining = JSON.parse(response["resources"]["core"]["remaining"]);
                let rate_limit_reset = parseInt(response["resources"]["core"]["reset"]);
                let rate_limit_limit = parseInt(response["resources"]["core"]["limit"]);

                console.log(get_colored_message("GitHub API", highlight_code(rate_limit_remaining + " / " + rate_limit_limit) + color_text(" API calls remaining.", message_status.INFO)));
                if (rate_limit_remaining < rate_limit_cooldown)
                {
                    let time = new Date() + rate_limit_reset;
                    let date = new Date(time);
                    console.log(get_colored_message("GitHub API", "Under Cooldown! " + highlight_code(date.toString()) + color_text(" for the next reset", message_status.INFO), message_status.WARNING));
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
            console.log(get_colored_message("GitHub API", "Rate Limit Status Check Error: " + highlight_code(JSON.stringify(e)), message_status.WARNING));
        }
    });
}