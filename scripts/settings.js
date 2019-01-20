/* GLOBAL SETTING VARIABLES */
let quest_shown_value;                  // default = 10
let ascending_sort_quest_list;          // default = true
let ascending_sort_quest_score ;        // default = false



function init_settings()
{
    // GET STARTING VALUES FROM COMPONENTS
    quest_shown_value = document.getElementById("quest-shown-amt").value;
    ascending_sort_quest_list = document.getElementById("sort-ascending-quest-list").checked;
    ascending_sort_quest_score = document.getElementById("sort-ascending-quest-score").checked;

    console.log("[Settings] - Settings are initialized!");
}



function change_quest_shown_amt()
{
    const max_value = document.getElementById("quest-shown-amt").max;
    const min_value = document.getElementById("quest-shown-amt").min;

    quest_shown_value = Math.round(document.getElementById("quest-shown-amt").value);

    if (quest_shown_value > max_value)
    {
        document.getElementById("quest-shown-amt").value = max_value;
        quest_shown_value = max_value;
    }
    if (quest_shown_value < min_value)
    {
        document.getElementById("quest-shown-amt").value = min_value;
        quest_shown_value = min_value;
    }

    console.log("[Settings] - Quest Shown Amount Updated to: " + quest_shown_value);

    refresh_quest_table();
}

function toggle_ascending_sort_quest_list()
{
    ascending_sort_quest_list = !ascending_sort_quest_list;
    console.log("[Settings] - Quest Results are not sorted by Ascending (Quest Chapter/Number): " + ascending_sort_quest_list);

    refresh_quest_table();
}

function toggle_ascending_sort_quest_score()
{
    ascending_sort_quest_score = !ascending_sort_quest_score;
    console.log("[Settings] - Quest Results are not sorted by Ascending (Quest Score): " + ascending_sort_quest_score);

    refresh_quest_table();
}

function toggle_simple_mode()
{
    if(window.location.hash)
    {
        let hash = window.location.hash.substring(1);
        if (hash === "simple")
        {
            console.log("[Simple Mode] Simple Mode Enabled! (No Background Images)");
            document.getElementById("title-div").classList.toggle("no-background");
            document.getElementById("title-div").classList.toggle("no-transition");
            document.getElementById("title-div").classList.toggle("no-hover");
            document.getElementById("title-text-div").classList.toggle("no-hover");
            document.getElementById("common-div").classList.toggle("no-background");
            document.getElementById("copper-div").classList.toggle("no-background");
            document.getElementById("silver-div").classList.toggle("no-background");
            document.getElementById("gold-div").classList.toggle("no-background");
            document.getElementById("purple-div").classList.toggle("no-background");
            document.getElementById("requested-div").classList.toggle("no-background");
            document.getElementById("required-div").classList.toggle("no-background");
            document.getElementById("recommended-div").classList.toggle("no-background");
            //this.classList.toggle("active");

            document.getElementById("simple-or-fancy-text").innerHTML = "[Let's Make it Fancy]";
            document.getElementById("simple-or-fancy-text").href = "https://expugn.github.io/priconne-quest-helper/";

            document.getElementById("sub-title").innerHTML = "Quest Helper<br><br><span style='font-family: sans-serif, serif; font-weight: bold; letter-spacing: 1px !important; color: palevioletred; text-shadow: 1px 1px 1px #000000 !important;'>Simple Mode</span>";
        }
    }
    else
    {
        document.getElementById("simple-or-fancy-text").innerHTML = "[Let's Keep it Simple]";
        document.getElementById("simple-or-fancy-text").href = "https://expugn.github.io/priconne-quest-helper/#simple";
    }
}

function reload()
{
    window.location.reload(true);
}