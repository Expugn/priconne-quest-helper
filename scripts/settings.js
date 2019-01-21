/* GLOBAL SETTING VARIABLES */
let quest_shown_value;                  // default = 10
let ascending_sort_quest_list;          // default = true
let ascending_sort_quest_score;         // default = false
let hide_quest_score;                   // default = false
let min_quest_chapter;                  // default = 1
let max_quest_chapter;                  // default = whatever is the highest chapter

let quest_shown_value_default;
let ascending_sort_quest_list_default;
let ascending_sort_quest_score_default;
let hide_quest_score_default;
let min_quest_chapter_default;
let max_quest_chapter_default;


function init_settings()
{
    // GET STARTING VALUES FROM COMPONENTS
    quest_shown_value_default = document.getElementById("quest-shown-amt").value;
    quest_shown_value = quest_shown_value_default;

    ascending_sort_quest_list_default = document.getElementById("sort-ascending-quest-list").checked;
    ascending_sort_quest_list = ascending_sort_quest_list_default;

    ascending_sort_quest_score_default = document.getElementById("sort-ascending-quest-score").checked;
    ascending_sort_quest_score = ascending_sort_quest_score_default;

    hide_quest_score_default = document.getElementById("hide-quest-score").checked;
    hide_quest_score = hide_quest_score_default;

    min_quest_chapter_default = document.getElementById("min-quest-chapter").value;
    min_quest_chapter = min_quest_chapter_default;

    max_quest_chapter_default = document.getElementById("max-quest-chapter").value;
    max_quest_chapter = max_quest_chapter_default;

    console.log("[Settings] - Settings are initialized!");
}

function check_checkbox(elementID, checked)
{
    document.getElementById(elementID).checked = checked;
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

function toggle_hide_quest_score()
{
    hide_quest_score = !hide_quest_score;
    console.log("[Settings] - Quest scoring is now hidden: " + hide_quest_score);

    refresh_quest_table();
}

function change_min_quest_chapter()
{
    const max_value = document.getElementById("min-quest-chapter").max;
    const min_value = document.getElementById("min-quest-chapter").min;

    min_quest_chapter = Math.round(document.getElementById("min-quest-chapter").value);

    if (min_quest_chapter > max_value)
    {
        document.getElementById("min-quest-chapter").value = max_value;
        min_quest_chapter = max_value;
    }
    if (min_quest_chapter > max_quest_chapter)
    {
        document.getElementById("min-quest-chapter").value = max_quest_chapter;
        min_quest_chapter = max_quest_chapter;
    }
    if (min_quest_chapter < min_value)
    {
        document.getElementById("min-quest-chapter").value = min_value;
        min_quest_chapter = min_value;
    }

    console.log("[Settings] - Minimum Quest Shown Updated to: " + min_quest_chapter);

    refresh_quest_table();
}

function change_max_quest_chapter()
{
    const max_value = document.getElementById("max-quest-chapter").max;
    const min_value = document.getElementById("max-quest-chapter").min;

    max_quest_chapter = Math.round(document.getElementById("max-quest-chapter").value);

    if (max_quest_chapter > max_value)
    {
        document.getElementById("max-quest-chapter").value = max_value;
        max_quest_chapter = max_value;
    }
    if (max_quest_chapter < min_value)
    {
        document.getElementById("max-quest-chapter").value = min_value;
        max_quest_chapter = min_value;
    }
    if (max_quest_chapter < min_quest_chapter)
    {
        document.getElementById("max-quest-chapter").value = min_quest_chapter;
        max_quest_chapter = min_quest_chapter;
    }

    console.log("[Settings] - Maximum Quest Shown Updated to: " + max_quest_chapter);

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
        else
        {
            document.getElementById("simple-or-fancy-text").innerHTML = "[Let's Keep it Simple]";
            document.getElementById("simple-or-fancy-text").href = "https://expugn.github.io/priconne-quest-helper/#simple";
        }
    }
    else
    {
        document.getElementById("simple-or-fancy-text").innerHTML = "[Let's Keep it Simple]";
        document.getElementById("simple-or-fancy-text").href = "https://expugn.github.io/priconne-quest-helper/#simple";
    }
}

function save_cookie()
{
    /* TODO UPDATE WHENEVER A NEW SETTING IS ADDED */
    //Cookies.set('', );
    Cookies.set('quest_shown_value', quest_shown_value);
    Cookies.set('ascending_sort_quest_list', ascending_sort_quest_list);
    Cookies.set('ascending_sort_quest_score', ascending_sort_quest_score);
    Cookies.set('hide_quest_score', hide_quest_score);
    Cookies.set('min_quest_chapter', min_quest_chapter);
    Cookies.set('max_quest_chapter', max_quest_chapter);

    alert("Settings saved!");
    console.log("[Settings] - Cookie has been baked.");
}

function delete_cookie()
{
    /* TODO UPDATE WHENEVER A NEW SETTING IS ADDED */
    //Cookies.remove('');
    Cookies.remove('quest_shown_value');
    Cookies.remove('ascending_sort_quest_list');
    Cookies.remove('ascending_sort_quest_score');
    Cookies.remove('hide_quest_score');
    Cookies.remove('min_quest_chapter');
    Cookies.remove('max_quest_chapter');

    alert("Your saved settings has been deleted.");
    console.log("[Settings] - Cookie has been eaten.");
}

function read_cookie()
{
    /* TODO UPDATE WHENEVER A NEW SETTING IS ADDED */
    if (Cookies.get('quest_shown_value') !== undefined)
    {
        set_values_from_cookie();

        document.getElementById("quest-shown-amt").value = quest_shown_value;
        check_checkbox("sort-ascending-quest-list", ascending_sort_quest_list);
        check_checkbox("sort-ascending-quest-score", ascending_sort_quest_score);
        check_checkbox("hide-quest-score", hide_quest_score);
        document.getElementById("min-quest-chapter").value = min_quest_chapter;
        document.getElementById("max-quest-chapter").value = max_quest_chapter;

        console.log("[Settings] Cookie settings have been loaded.");
    }
}

function reset_settings()
{
    /* TODO UPDATE WHENEVER A NEW SETTING IS ADDED */
    if (Cookies.get('quest_shown_value') !== undefined)
    {
        // SET COOKIE VALUES
        set_values_from_cookie();
    }
    else
    {
        // SET SYSTEM DEFAULTS
        quest_shown_value = quest_shown_value_default;
        ascending_sort_quest_list = ascending_sort_quest_list_default;
        ascending_sort_quest_score = ascending_sort_quest_score_default;
        hide_quest_score = hide_quest_score_default;
        min_quest_chapter = min_quest_chapter_default;
        max_quest_chapter = max_quest_chapter_default;
    }

    document.getElementById("quest-shown-amt").value = quest_shown_value;
    check_checkbox("sort-ascending-quest-list", ascending_sort_quest_list);
    check_checkbox("sort-ascending-quest-score", ascending_sort_quest_score);
    check_checkbox("hide-quest-score", hide_quest_score);
    document.getElementById("min-quest-chapter").value = min_quest_chapter;
    document.getElementById("max-quest-chapter").value = max_quest_chapter;

    alert("Settings have been reset.");
}

function read_settings()
{
    /* TODO UPDATE WHENEVER A NEW SETTING IS ADDED */
    if (Cookies.get('quest_shown_value') !== undefined)
    {
        let cookie_string = "Setting Values:\n" +
            "Amount of Quests Shown: " + Cookies.get('quest_shown_value') + "\n" +
            "Sort by Ascending? (Quest List): " + Cookies.get('ascending_sort_quest_list') + "\n" +
            "Sort by Ascending? (Quest Score): " + Cookies.get('ascending_sort_quest_score') + "\n" +
            "Hide Quest Score?: " + Cookies.get('hide_quest_score') + "\n" +
            "Lowest Quest Chapter Displayed: " + Cookies.get('min_quest_chapter') + "\n" +
            "Highest Quest Chapter Displayed: " + Cookies.get('max_quest_chapter');
        alert(cookie_string);
    }
    else
    {
        alert("You did not save any settings.");
    }
}

function set_values_from_cookie()
{
    quest_shown_value = parseInt(Cookies.get('quest_shown_value'));
    ascending_sort_quest_list = Cookies.get('ascending_sort_quest_list') === 'true';
    ascending_sort_quest_score = Cookies.get('ascending_sort_quest_score') === 'true';
    hide_quest_score = Cookies.get('hide_quest_score') === 'true';
    min_quest_chapter = parseInt(Cookies.get('min_quest_chapter'));
    max_quest_chapter = parseInt(Cookies.get('max_quest_chapter'));
}

function reload()
{
    window.location.reload(true);
}