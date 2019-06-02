const project_author = "S'pugn";
const last_update_date = "May 17, 2019";

let current_language = "en";
let language_json;
function load_language()
{
    let lang = document.getElementById("language-option").value;

    // IF LANGUAGE SELECTED IS DIFFERENT FROM CURRENT LANGUAGE
    if (lang !== current_language)
    {
        $.ajax({
            'global': false,
            'url': "/" + window.location.pathname.substring(0, window.location.pathname.indexOf('/')) + window.location.pathname.split('/')[1] + "/language/" + lang + ".json",
            'dataType': "json",
            'success': function (data) {
                language_json = data;
                console.log("[Language] - " + lang + ".json loaded.");
                current_language = lang;
                change_language();
            }
        });
    }
}

function change_language()
{
    // TRANSLATE PAGE TITLE
    document.title = language_json["system"]["title"] + " - " + language_json["system"]["subtitle"];

    // TRANSLATE EMPTY BLACKLIST TITLE
    if (localStorage.getItem('blacklist') === null)
    {
        document.getElementById("blacklist-load-button").title = language_json["projects_tab"]["no_saved_blacklist_message"];
    }

    // TRANSLATE EXPORT DATA BUTTON
    document.getElementById("export-data-button").value = language_json["other_tab"]["export_saved_data"];

    // TRANSLATE SIMPLE MODE SUBTITLE IF NEEDED
    let hash = window.location.hash.substring(1);
    if (hash === "simple")
    {
        document.getElementById("sub-title").innerHTML = language_json["system"]["subtitle"] +
            "<br><br><span style='font-family: \"Arial\", serif; font-weight: bold; letter-spacing: 1px !important; color: aliceblue; text-shadow: 1px 1px 1px #000000 !important;'>" +
            language_json["other_tab"]["simple_mode"] + "</span>";
    }

    // TRANSLATE OBJECTS
    let collection = document.querySelectorAll('[' + "translate_text" + ']');
    for (let i = 0 ; i < collection.length ; i++)
    {
        let requested_text = collection[i].getAttribute("translate_text");
        let split_request = requested_text.split(".");
        let text_category = split_request[0];
        let text_value = split_request[1];

        if (text_category === "system" && text_value === "made_with_love") {
            language_json[text_category][text_value] = language_json[text_category][text_value].replace("${project_author}", project_author); }

        if (text_category === "system" && text_value === "last_quest_update") {
            language_json[text_category][text_value] = language_json[text_category][text_value].replace("${last_update_date}", last_update_date);
        }

        collection[i].innerHTML = language_json[text_category][text_value];
    }

    // BUILD CHARACTER PRESET LIST
    build_character_preset_list();
}