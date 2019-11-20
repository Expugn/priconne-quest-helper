const project_author = "S'pugn";

let current_language = "en";
let language_json;

function auto_load_language()
{
    // IF LOCALSTORAGE SUPPORT EXISTS...
    if (typeof(Storage) !== "undefined")
    {
        // IF THERE IS A PREVIOUS LANGUAGE RECORDED...
        if (localStorage.getItem("language") !== null)
        {
            // LOAD LANGUAGE
            document.getElementById("language-option").value = localStorage.getItem("language");

            if (document.getElementById("language-option").value !== localStorage.getItem("language"))
            {
                // LANGUAGE OPTION SAVED DOES NOT EXIST, DELETE SAVED OPTION AND REVERT TO ENGLISH
                localStorage.removeItem("language");
                document.getElementById("language-option").value = "en";
            }
            else
            {
                load_language();
            }

        }
    }
}

function load_language()
{
    let lang = document.getElementById("language-option").value;

    // PUT TOAST WARNING (IN CASE PEOPLE DON'T REALIZE IT'S LOADING)
    toastr.warning("Loading " + lang + ".json", "Language Change", { timeOut:1000 });

    // IF LANGUAGE SELECTED IS DIFFERENT FROM CURRENT LANGUAGE
    if (lang !== current_language)
    {
        $.ajax({
            'global': false,
            'url': "/" + window.location.pathname.substring(0, window.location.pathname.indexOf('/')) + window.location.pathname.split('/')[1] + "/language/" + lang + ".json",
            'dataType': "json",
            'success': function (data) {
                language_json = data;
                console.log(get_colored_message("Language", "Now using: " + highlight_code(lang + ".json"), message_status.INFO));
                current_language = lang;
                document.documentElement.setAttribute("lang", lang);
                document.documentElement.setAttribute("xml:lang", lang);
                change_language();

                // DYNAMIC LOAD I18N STYLESHEET
                if (document.head.getElementsByClassName("stylesheet-i18n").length <= 0) {
                    const i18n_webpage_stylesheet = document.createElement("link");
                    i18n_webpage_stylesheet.className = "stylesheet-i18n";
                    i18n_webpage_stylesheet.rel = "stylesheet";
                    i18n_webpage_stylesheet.href = "css/webpage.i18n.css";

                    const i18n_item_table_stylesheet = document.createElement("link");
                    i18n_item_table_stylesheet.className = "stylesheet-i18n";
                    i18n_item_table_stylesheet.rel = "stylesheet";
                    i18n_item_table_stylesheet.href = "css/item_table.i18n.css";

                    document.head.appendChild(i18n_webpage_stylesheet);
                    document.head.appendChild(i18n_item_table_stylesheet);
                }

                // IF LOCALSTORAGE SUPPORT IS AVAILABLE...
                if (typeof(Storage) !== "undefined")
                {
                    // TAKE NOTE OF CURRENT LANGUAGE
                    if (current_language !== "en")
                    {
                        localStorage.setItem("language", current_language);
                    }
                    else
                    {
                        localStorage.removeItem("language");
                    }
                }
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

        if (text_category === "system" && text_value === "last_quest_update")
        {
            language_json[text_category][text_value] = language_json[text_category][text_value].replace("${last_update_date}", get_update_date());
        }

        collection[i].innerHTML = language_json[text_category][text_value];
    }

    // REBUILD CHARACTER PRESET LIST AND TRANSLATE CURRENTLY SELECTED CHARACTER
    // ALSO RESTORE CURRENTLY SELECTED CHARACTER ON SELECT
    let current_selected_character = document.getElementById("character-preset-list-select").value;
    update_selected_character_preset_details();
    build_character_preset_list();
    document.getElementById("character-preset-list-select").value = current_selected_character;

    // REBUILD PROJECTS LIST
    update_saved_projects_select();

    // BUILD TRANSLATOR CREDITS
    if (current_language !== "en")
    {
        document.getElementById("translator-footer").innerHTML = language_json["system"]["translator"] + " " + language_json["system"]["translator_name"];
    }
    else
    {
        document.getElementById("translator-footer").innerHTML = "";
    }

    // UPDATE UPDATE PROGRESS
    refresh_quest_update_language();

    // UPDATE EQUIPMENT DATA TYPE SETTING CHOICES
    document.getElementById("equipment-data-type-current-option").innerHTML = language_json["settings_tab"]["equipment_data_current_select"];
    document.getElementById("equipment-data-type-legacy-option").innerHTML = language_json["settings_tab"]["equipment_data_legacy_select"];
}