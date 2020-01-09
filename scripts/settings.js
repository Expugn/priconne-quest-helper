let settings_loaded = false;

/* GLOBAL SETTING VARIABLES */
let quest_shown_value;                  // default = 10
let ascending_sort_quest_list;          // default = true
let ascending_sort_quest_score;         // default = false
let hide_quest_score;                   // default = false
let min_quest_chapter;                  // default = 1
let max_quest_chapter;                  // default = whatever is the highest chapter
let quest_filter;                       // default = filter-all
let item_amount_per_row;                // default = 7
let ignored_rarities;                   // default = [] (empty array)
let quest_display;                      // default = display-percent
let equipment_data_type;                // default = equipment-data-current

let quest_shown_value_default;
let ascending_sort_quest_list_default;
let ascending_sort_quest_score_default;
let hide_quest_score_default;
let min_quest_chapter_default;
let max_quest_chapter_default;
let quest_filter_default;
let item_amount_per_row_default;
let quest_display_default;
let equipment_data_type_default;

const all_rarities = ["common", "copper", "silver", "gold", "purple"];

const quest_filter_settings = Object.freeze({
    ALL: 'filter-all',
    NORMAL: 'filter-normal',
    HARD: 'filter-hard',
    VERY_HARD: 'filter-very-hard'
});

const quest_display_settings = Object.freeze({
    PERCENT: 'display-percent',
    AMOUNT: 'display-amt-req'
});

const setting_element_id = Object.freeze({
    QUEST_SHOWN_VALUE: 'quest-shown-amt',
    ASCENDING_SORT_QUEST_LIST: 'sort-ascending-quest-list',
    ASCENDING_SORT_QUEST_SCORE: 'sort-ascending-quest-score',
    HIDE_QUEST_SCORE: 'hide-quest-score',
    MIN_QUEST_CHAPTER: 'min-quest-chapter',
    MAX_QUEST_CHAPTER: 'max-quest-chapter',
    QUEST_FILTER_ALL: 'filter-all-quests',
    QUEST_FILTER_NORMAL: 'filter-normal-quests',
    QUEST_FILTER_HARD: 'filter-hard-quests',
    QUEST_FILTER_VERY_HARD: 'filter-very-hard-quests',
    ITEM_AMOUNT_PER_ROW: 'item-amount-per-row',
    QUEST_DISPLAY_PERCENT: 'display-drop-percent',
    QUEST_DISPLAY_AMOUNT: 'display-amount-required',
    EQUIPMENT_DATA_TYPE: 'equipment-data-type'
});

function init_settings()
{
    // GET STARTING VALUES FROM COMPONENTS
    quest_shown_value_default = document.getElementById(setting_element_id.QUEST_SHOWN_VALUE).value;
    quest_shown_value = quest_shown_value_default;

    ascending_sort_quest_list_default = document.getElementById(setting_element_id.ASCENDING_SORT_QUEST_LIST).checked;
    ascending_sort_quest_list = ascending_sort_quest_list_default;

    ascending_sort_quest_score_default = document.getElementById(setting_element_id.ASCENDING_SORT_QUEST_SCORE).checked;
    ascending_sort_quest_score = ascending_sort_quest_score_default;

    hide_quest_score_default = document.getElementById(setting_element_id.HIDE_QUEST_SCORE).checked;
    hide_quest_score = hide_quest_score_default;

    min_quest_chapter_default = document.getElementById(setting_element_id.MIN_QUEST_CHAPTER).value;
    min_quest_chapter = min_quest_chapter_default;

    max_quest_chapter_default = document.getElementById(setting_element_id.MAX_QUEST_CHAPTER).value;
    max_quest_chapter = max_quest_chapter_default;

    if (document.getElementById(setting_element_id.QUEST_FILTER_ALL).checked)
    {
        quest_filter_default = quest_filter_settings.ALL;
    }
    else if (document.getElementById(setting_element_id.QUEST_FILTER_NORMAL).checked)
    {
        quest_filter_default = quest_filter_settings.NORMAL;
    }
    else if (document.getElementById(setting_element_id.QUEST_FILTER_HARD).checked)
    {
        quest_filter_default = quest_filter_settings.HARD;
    }
    quest_filter = quest_filter_default;

    item_amount_per_row_default = document.getElementById(setting_element_id.ITEM_AMOUNT_PER_ROW).value;
    item_amount_per_row = item_amount_per_row_default;

    ignored_rarities = [];

    if (document.getElementById(setting_element_id.QUEST_DISPLAY_PERCENT).checked)
    {
        quest_display_default = quest_display_settings.PERCENT;
    }
    else if (document.getElementById(setting_element_id.QUEST_DISPLAY_AMOUNT).checked)
    {
        quest_display_default = quest_display_settings.AMOUNT;
    }
    quest_display = quest_display_default;

    if (document.getElementById(setting_element_id.EQUIPMENT_DATA_TYPE).value === equipment_data_version.LEGACY)
    {
        equipment_data_type = equipment_data_version.LEGACY
    }
    else
    {
        equipment_data_type = equipment_data_version.CURRENT
    }
    equipment_data_type_default = equipment_data_type;
}

function check_checkbox(elementID, checked)
{
    document.getElementById(elementID).checked = checked;
}

function change_quest_shown_amt()
{
    const max_value = document.getElementById(setting_element_id.QUEST_SHOWN_VALUE).max;
    const min_value = document.getElementById(setting_element_id.QUEST_SHOWN_VALUE).min;

    quest_shown_value = Math.round(document.getElementById(setting_element_id.QUEST_SHOWN_VALUE).value);

    if (quest_shown_value > max_value)
    {
        document.getElementById(setting_element_id.QUEST_SHOWN_VALUE).value = max_value;
        quest_shown_value = max_value;
    }
    if (quest_shown_value < min_value)
    {
        document.getElementById(setting_element_id.QUEST_SHOWN_VALUE).value = min_value;
        quest_shown_value = min_value;
    }

    console.log(get_colored_message("Settings", highlight("Quest Shown Amount") + color_text(" changed to ", message_status.INFO) + highlight_code(quest_shown_value)));

    refresh_quest_table();
}

function toggle_ascending_sort_quest_list()
{
    ascending_sort_quest_list = !ascending_sort_quest_list;
    console.log(get_colored_message("Settings", highlight("Quest Chapter/Number Sort") + color_text(" changed to ", message_status.INFO) + highlight_code("Sort by Ascending?: " + ascending_sort_quest_list)));

    refresh_quest_table();
}

function toggle_ascending_sort_quest_score()
{
    ascending_sort_quest_score = !ascending_sort_quest_score;
    console.log(get_colored_message("Settings", highlight("Quest Score Sort") + color_text(" changed to ", message_status.INFO) + highlight_code("Sort by Ascending?: " + ascending_sort_quest_score)));

    refresh_quest_table();
}

function toggle_hide_quest_score()
{
    hide_quest_score = !hide_quest_score;
    console.log(get_colored_message("Settings", highlight("Quest Scoring Visibility") + color_text(" changed to ", message_status.INFO) + highlight_code("Hidden?: " + hide_quest_score)));

    refresh_quest_table();
}

function change_min_quest_chapter()
{
    const max_value = document.getElementById(setting_element_id.MIN_QUEST_CHAPTER).max;
    const min_value = document.getElementById(setting_element_id.MIN_QUEST_CHAPTER).min;

    min_quest_chapter = Math.round(document.getElementById(setting_element_id.MIN_QUEST_CHAPTER).value);

    if (min_quest_chapter > max_value)
    {
        document.getElementById(setting_element_id.MIN_QUEST_CHAPTER).value = max_value;
        min_quest_chapter = max_value;
    }
    if (min_quest_chapter > max_quest_chapter)
    {
        document.getElementById(setting_element_id.MIN_QUEST_CHAPTER).value = max_quest_chapter;
        min_quest_chapter = max_quest_chapter;
    }
    if (min_quest_chapter < min_value)
    {
        document.getElementById(setting_element_id.MIN_QUEST_CHAPTER).value = min_value;
        min_quest_chapter = min_value;
    }

    console.log(get_colored_message("Settings", highlight("Minimum Quest Shown") + color_text(" changed to ", message_status.INFO) + highlight_code(min_quest_chapter)));

    refresh_quest_table();
}

function change_max_quest_chapter()
{
    const max_value = document.getElementById(setting_element_id.MAX_QUEST_CHAPTER).max;
    const min_value = document.getElementById(setting_element_id.MAX_QUEST_CHAPTER).min;

    max_quest_chapter = Math.round(document.getElementById(setting_element_id.MAX_QUEST_CHAPTER).value);

    if (max_quest_chapter > max_value)
    {
        document.getElementById(setting_element_id.MAX_QUEST_CHAPTER).value = max_value;
        max_quest_chapter = max_value;
    }
    if (max_quest_chapter < min_value)
    {
        document.getElementById(setting_element_id.MAX_QUEST_CHAPTER).value = min_value;
        max_quest_chapter = min_value;
    }
    if (max_quest_chapter < min_quest_chapter)
    {
        document.getElementById(setting_element_id.MAX_QUEST_CHAPTER).value = min_quest_chapter;
        max_quest_chapter = min_quest_chapter;
    }

    console.log(get_colored_message("Settings", highlight("Maximum Quest Shown") + color_text(" changed to ", message_status.INFO) + highlight_code(max_quest_chapter)));

    refresh_quest_table();
}

function change_quest_filter()
{
    if (document.getElementById(setting_element_id.QUEST_FILTER_ALL).checked)
    {
        quest_filter = quest_filter_settings.ALL;
    }
    else if (document.getElementById(setting_element_id.QUEST_FILTER_NORMAL).checked)
    {
        quest_filter = quest_filter_settings.NORMAL;
    }
    else if (document.getElementById(setting_element_id.QUEST_FILTER_HARD).checked)
    {
        quest_filter = quest_filter_settings.HARD;
    }
    else if (document.getElementById(setting_element_id.QUEST_FILTER_VERY_HARD).checked)
    {
        quest_filter = quest_filter_settings.VERY_HARD;
    }

    console.log(get_colored_message("Settings", highlight("Quest Filter") + color_text(" changed to ", message_status.INFO) + highlight_code(quest_filter)));

    refresh_quest_table();
}

function change_item_amount_per_row()
{
    const max_value = document.getElementById(setting_element_id.ITEM_AMOUNT_PER_ROW).max;
    const min_value = document.getElementById(setting_element_id.ITEM_AMOUNT_PER_ROW).min;

    item_amount_per_row = Math.round(document.getElementById(setting_element_id.ITEM_AMOUNT_PER_ROW).value);

    if (item_amount_per_row > max_value)
    {
        document.getElementById(setting_element_id.ITEM_AMOUNT_PER_ROW).value = max_value;
        item_amount_per_row = max_value;
    }
    if (item_amount_per_row < min_value)
    {
        document.getElementById(setting_element_id.ITEM_AMOUNT_PER_ROW).value = min_value;
        item_amount_per_row = min_value;
    }

    console.log(get_colored_message("Settings", highlight("Item Amount Per Row") + color_text(" changed to ", message_status.INFO) + highlight_code(item_amount_per_row)));

    build_item_tables();
}

function toggle_ignored_rarity(rarity)
{
    let elem_id = "ignore-button-" + rarity;
    document.getElementById(elem_id).classList.toggle("low-opacity");

    if (ignored_rarities.includes(rarity))
    {
        // UN-IGNORE RARITY

        let index = ignored_rarities.indexOf(rarity);
        if (index > -1)
        {
            ignored_rarities.splice(index, 1);
        }

        console.log(get_colored_message("Settings", "Un-ignoring ", message_status.WARNING) + highlight(rarity) + color_text(" rarity items.", message_status.WARNING));
    }
    else
    {
        // IGNORE RARITY
        ignored_rarities.push(rarity);
        console.log(get_colored_message("Settings", "Ignoring ", message_status.SUCCESS) + highlight(rarity) + color_text(" rarity items.", message_status.SUCCESS));
    }

    build_data();
    update_saved_projects_select();
}

function change_display_option()
{
    if (document.getElementById(setting_element_id.QUEST_DISPLAY_PERCENT).checked)
    {
        quest_display = quest_display_settings.PERCENT;
    }
    else if (document.getElementById(setting_element_id.QUEST_DISPLAY_AMOUNT).checked)
    {
        quest_display = quest_display_settings.AMOUNT;
    }

    console.log(get_colored_message("Settings", highlight("Quest Display") + color_text(" changed to: ", message_status.INFO) + highlight_code(quest_display)));

    refresh_quest_table();
}

function change_equipment_data()
{
    if (document.getElementById(setting_element_id.EQUIPMENT_DATA_TYPE).value === equipment_data_version.LEGACY)
    {
        equipment_data_type = equipment_data_version.LEGACY;
    }
    else
    {
        equipment_data_type = equipment_data_version.CURRENT;
    }

    console.log(get_colored_message("Settings", highlight("Equipment Data Type") + color_text(" changed to: ", message_status.INFO) + highlight_code(equipment_data_type)));

    change_equipment_and_character_data();
}

function change_equipment_and_character_data()
{
    let character_data_type = (equipment_data_type === equipment_data_version.CURRENT) ? character_data_version.CURRENT : character_data_version.LEGACY;

    // CLEAR OUT EQUIPMENT AND CHARACTER MAPS
    equipment_map = new Map();
    character_map = new Map();

    // READ NEW EQUIPMENT DATA
    read_equipment_data(equipment_data_type, function ()
    {
        // READ NEW CHARACTER DATA
        read_character_data(character_data_type, function ()
        {
            // RE-BUILD ITEM TABLES
            build_item_tables();

            // UPDATE CURRENT REQUIRED INGREDIENTS VALUE
            build_data();

            // UPDATE CHARACTER PRESETS LIST
            let current_selected_character = document.getElementById("character-preset-list-select").value;
            update_selected_character_preset_details();
            build_character_preset_list();
            if ((check_if_character_exists(current_selected_character) === false) && current_selected_character !== "default_character")
            {
                console.log(get_colored_message("Equipment Data (Legacy)", "Currently selected character in presets " + highlight(current_selected_character) + color_text(" no longer exists. Reverting to default selection.", message_status.INFO), message_status.INFO));
                document.getElementById("character-preset-list-select").value = "default_character";
                update_selected_character_preset_details();
            }
            else
            {
                document.getElementById("character-preset-list-select").value = current_selected_character;
            }

            // REMOVE ITEM FOCUS
            if (focused_item_name !== "")
            {
                focused_item_name = "";
                focused_item_element_id = "";

                // HIDE FOCUSED ITEM POPUP
                document.getElementById("focused-item-popup").hidden = true;

                console.log(get_colored_message("Item Focus", "No longer focusing on an item.", message_status.INFO));
            }
        });
    });

    // UPDATE SETTINGS AND PRESET RANK SELECTION TO BE WITHIN BOUNDS
    if (equipment_data_type === equipment_data_version.CURRENT)
    {
        adjust_max_values(max_character_rank_information.CURRENT);
    }
    else
    {
        adjust_max_values(max_character_rank_information.LEGACY);
    }

    function adjust_max_values(max_value)
    {
        document.getElementById("preset-character-min-rank-input").max = max_value;
        document.getElementById("preset-character-max-rank-input").max = max_value;

        if (document.getElementById("preset-character-min-rank-input").value > max_value)
        {
            document.getElementById("preset-character-min-rank-input").value = max_value;
            preset_min_rank = max_value;
        }
        if (document.getElementById("preset-character-max-rank-input").value > max_value)
        {
            document.getElementById("preset-character-max-rank-input").value = max_value;
            preset_max_rank = max_value;
        }
    }
}

function toggle_simple_mode()
{
    if(window.location.hash)
    {
        // "simple" HASH IS INCLUDED
        if (window.location.hash.toLowerCase().split('#').includes("simple"))
        {
            console.log(get_colored_message("Simple Mode", "Simple Mode Enabled! (No Background Images)", message_status.INFO));
            document.getElementById("title-div").classList.toggle("no-background");
            document.getElementById("title-div").classList.toggle("no-transition");
            document.getElementById("title-div").classList.toggle("no-hover");
            document.getElementById("title-text-div").classList.toggle("no-hover");
            document.getElementById("common-div").classList.toggle("no-background");
            document.getElementById("common-item-content").classList.toggle("no-transition");
            document.getElementById("copper-div").classList.toggle("no-background");
            document.getElementById("copper-item-content").classList.toggle("no-transition");
            document.getElementById("silver-div").classList.toggle("no-background");
            document.getElementById("silver-item-content").classList.toggle("no-transition");
            document.getElementById("gold-div").classList.toggle("no-background");
            document.getElementById("gold-item-content").classList.toggle("no-transition");
            document.getElementById("purple-div").classList.toggle("no-background");
            document.getElementById("purple-item-content").classList.toggle("no-transition");
            document.getElementById("misc-div").classList.toggle("no-background");
            document.getElementById("misc-item-content").classList.toggle("no-transition");
            document.getElementById("requested-div").classList.toggle("no-background");
            document.getElementById("required-div").classList.toggle("no-background");
            document.getElementById("recommended-div").classList.toggle("no-background");
            document.getElementById("recommended-quest-div").classList.toggle("no-transition");
            document.getElementById("character-preset-div").classList.toggle("no-background");
            document.getElementById("update-div").classList.toggle("no-background");
            document.getElementById("title-background-div").hidden = true;
            $("body").toggleClass("simple-body");
            $("body").toggleClass("fancy-body");

            document.getElementById("fancy-page-link").style.display = "inline";

            document.getElementById("sub-title").innerHTML = "Quest Helper<br><br><span style='font-family: \"Arial\", serif; font-weight: bold; letter-spacing: 1px !important; color: aliceblue; text-shadow: 1px 1px 1px #000000 !important;'>Simple Mode</span>";
        }
        else
        {
            document.getElementById("simple-page-link").style.display = "inline";
        }
    }
    else
    {
        document.getElementById("simple-page-link").style.display = "inline";
    }
}

function save_cookie()
{
    /* TODO UPDATE WHENEVER A NEW SETTING IS ADDED */

    let settings_map = new Map();
    settings_map.quest_shown_value = quest_shown_value;
    settings_map.ascending_sort_quest_list = ascending_sort_quest_list;
    settings_map.ascending_sort_quest_score = ascending_sort_quest_score;
    settings_map.hide_quest_score = hide_quest_score;
    settings_map.min_quest_chapter = min_quest_chapter;
    settings_map.max_quest_chapter = max_quest_chapter;
    settings_map.quest_filter = quest_filter;
    settings_map.item_amount_per_row = item_amount_per_row;
    settings_map.ignored_rarities = ignored_rarities;
    settings_map.quest_display = quest_display;
    settings_map.equipment_data_type = equipment_data_type;

    let encrypted_setting_map = JSON.stringify(settings_map);
    localStorage.setItem('settings', encrypted_setting_map);

    toastr.success((current_language === language.ENGLISH) ? "Your settings have been saved!" : language_json["toasts"]["settings_saved"]);
    console.log(get_colored_message("Settings", "Settings have been saved.", message_status.SUCCESS));
}

function delete_cookie()
{
    if (is_cookies_exist())
    {
        localStorage.removeItem('settings');

        toastr.success((current_language === language.ENGLISH) ? "Your saved settings have been deleted." : language_json["toasts"]["settings_deleted"]);
        console.log(get_colored_message("Settings", "Settings have been deleted.", message_status.WARNING));
    }
    else
    {
        toastr.error((current_language === language.ENGLISH) ? "You did not save any settings." : language_json["toasts"]["no_settings_saved"]);
    }
}

function read_cookie()
{
    /* TODO UPDATE WHENEVER A NEW SETTING IS ADDED */
    if (is_cookies_exist())
    {
        set_values_from_cookie();

        document.getElementById(setting_element_id.QUEST_SHOWN_VALUE).value = quest_shown_value;
        check_checkbox(setting_element_id.ASCENDING_SORT_QUEST_LIST, ascending_sort_quest_list);
        check_checkbox(setting_element_id.ASCENDING_SORT_QUEST_SCORE, ascending_sort_quest_score);
        check_checkbox(setting_element_id.HIDE_QUEST_SCORE, hide_quest_score);
        document.getElementById(setting_element_id.MIN_QUEST_CHAPTER).value = min_quest_chapter;
        document.getElementById(setting_element_id.MAX_QUEST_CHAPTER).value = max_quest_chapter;
        if (quest_filter === quest_filter_settings.ALL)
        {
            check_checkbox(setting_element_id.QUEST_FILTER_ALL, true);
            check_checkbox(setting_element_id.QUEST_FILTER_NORMAL, false);
            check_checkbox(setting_element_id.QUEST_FILTER_HARD, false);
        }
        else if (quest_filter === quest_filter_settings.NORMAL)
        {
            check_checkbox(setting_element_id.QUEST_FILTER_ALL, false);
            check_checkbox(setting_element_id.QUEST_FILTER_NORMAL, true);
            check_checkbox(setting_element_id.QUEST_FILTER_HARD, false);
        }
        else if (quest_filter === quest_filter_settings.HARD)
        {
            check_checkbox(setting_element_id.QUEST_FILTER_ALL, false);
            check_checkbox(setting_element_id.QUEST_FILTER_NORMAL, false);
            check_checkbox(setting_element_id.QUEST_FILTER_HARD, true);
        }
        document.getElementById(setting_element_id.ITEM_AMOUNT_PER_ROW).value = item_amount_per_row;
        for (let i = 0 ; i < ignored_rarities.length ; i++)
        {
            let ignored_rarity_document_id = "ignore-button-" + ignored_rarities[i];
            document.getElementById(ignored_rarity_document_id).classList.toggle("low-opacity");
        }
        if (quest_display === quest_display_settings.PERCENT)
        {
            check_checkbox(setting_element_id.QUEST_DISPLAY_PERCENT, true);
            check_checkbox(setting_element_id.QUEST_DISPLAY_AMOUNT, false);
        }
        else if (quest_display === quest_display_settings.AMOUNT)
        {
            check_checkbox(setting_element_id.QUEST_DISPLAY_PERCENT, false);
            check_checkbox(setting_element_id.QUEST_DISPLAY_AMOUNT, true);
        }
        if (equipment_data_type === equipment_data_version.LEGACY)
        {
            document.getElementById(setting_element_id.EQUIPMENT_DATA_TYPE).value = equipment_data_version.LEGACY;
        }
        else
        {
            document.getElementById(setting_element_id.EQUIPMENT_DATA_TYPE).value = equipment_data_version.CURRENT;
        }

        console.log(get_colored_message("Settings", "User settings have been loaded!", message_status.SUCCESS));

        if (!settings_loaded)
        {
            settings_loaded = true;
        }
    }
}

function set_settings_to_default()
{
    /* TODO UPDATE WHENEVER A NEW SETTING IS ADDED */
    quest_shown_value = quest_shown_value_default;
    ascending_sort_quest_list = ascending_sort_quest_list_default;
    ascending_sort_quest_score = ascending_sort_quest_score_default;
    hide_quest_score = hide_quest_score_default;
    min_quest_chapter = min_quest_chapter_default;
    max_quest_chapter = max_quest_chapter_default;
    quest_filter = quest_filter_default;
    item_amount_per_row = item_amount_per_row_default;
    ignored_rarities = [];
    quest_display = quest_display_default;
    equipment_data_type = equipment_data_type_default;
}

function reset_settings()
{
    /* TODO UPDATE WHENEVER A NEW SETTING IS ADDED */
    if (is_cookies_exist())
    {
        // SET COOKIE VALUES
        set_values_from_cookie();
    }
    else
    {
        // SET SYSTEM DEFAULTS
        set_settings_to_default();
    }

    document.getElementById(setting_element_id.QUEST_SHOWN_VALUE).value = quest_shown_value;
    check_checkbox(setting_element_id.ASCENDING_SORT_QUEST_LIST, ascending_sort_quest_list);
    check_checkbox(setting_element_id.ASCENDING_SORT_QUEST_SCORE, ascending_sort_quest_score);
    check_checkbox(setting_element_id.HIDE_QUEST_SCORE, hide_quest_score);
    document.getElementById(setting_element_id.MIN_QUEST_CHAPTER).value = min_quest_chapter;
    document.getElementById(setting_element_id.MAX_QUEST_CHAPTER).value = max_quest_chapter;
    if (quest_filter === quest_filter_settings.ALL)
    {
        check_checkbox(setting_element_id.QUEST_FILTER_ALL, true);
        check_checkbox(setting_element_id.QUEST_FILTER_NORMAL, false);
        check_checkbox(setting_element_id.QUEST_FILTER_HARD, false);
    }
    else if (quest_filter === quest_filter_settings.NORMAL)
    {
        check_checkbox(setting_element_id.QUEST_FILTER_ALL, false);
        check_checkbox(setting_element_id.QUEST_FILTER_NORMAL, true);
        check_checkbox(setting_element_id.QUEST_FILTER_HARD, false);
    }
    else if (quest_filter === quest_filter_settings.HARD)
    {
        check_checkbox(setting_element_id.QUEST_FILTER_ALL, false);
        check_checkbox(setting_element_id.QUEST_FILTER_NORMAL, false);
        check_checkbox(setting_element_id.QUEST_FILTER_HARD, true);
    }
    document.getElementById(setting_element_id.ITEM_AMOUNT_PER_ROW).value = item_amount_per_row;
    for (let i = 0 ; i < all_rarities.length ; i++)
    {
        let ignored_rarity_document_id = "ignore-button-" + all_rarities[i];
        if (ignored_rarities.includes(all_rarities[i]))
        {
            if (!document.getElementById(ignored_rarity_document_id).classList.contains("low-opacity"))
            {
                document.getElementById(ignored_rarity_document_id).classList.add("low-opacity");
            }
        }
        else
        {
            if (document.getElementById(ignored_rarity_document_id).classList.contains("low-opacity"))
            {
                document.getElementById(ignored_rarity_document_id).classList.remove("low-opacity");
            }
        }
    }
    if (quest_display === quest_display_settings.PERCENT)
    {
        check_checkbox(setting_element_id.QUEST_DISPLAY_PERCENT, true);
        check_checkbox(setting_element_id.QUEST_DISPLAY_AMOUNT, false);
    }
    else if (quest_display === quest_display_settings.AMOUNT)
    {
        check_checkbox(setting_element_id.QUEST_DISPLAY_PERCENT, false);
        check_checkbox(setting_element_id.QUEST_DISPLAY_AMOUNT, true);
    }
    if (equipment_data_type === equipment_data_version.LEGACY)
    {
        document.getElementById(setting_element_id.EQUIPMENT_DATA_TYPE).value = equipment_data_version.LEGACY;
    }
    else
    {
        document.getElementById(setting_element_id.EQUIPMENT_DATA_TYPE).value = equipment_data_version.CURRENT;
    }

    toastr.success((current_language === language.ENGLISH) ? "Settings have been reset." : language_json["toasts"]["settings_reset"]);
    refresh_quest_table();
    build_item_tables();
    build_data();
    change_equipment_and_character_data();
}

function read_settings()
{
    /* TODO UPDATE WHENEVER A NEW SETTING IS ADDED */
    if (is_cookies_exist())
    {
        let saved_settings = JSON.parse(localStorage.getItem("settings"));
        let dump = JSON.stringify(saved_settings, null, 4);
        alert(dump);
    }
    else
    {
        toastr.error((current_language === language.ENGLISH) ? "You did not save any settings." : language_json["toasts"]["no_settings_saved"]);
    }
}

function set_values_from_cookie()
{
    /* TODO UPDATE WHENEVER A NEW SETTING IS ADDED */
    let settings_cookie_data = localStorage.getItem('settings');
    let saved_settings_map = JSON.parse(settings_cookie_data);

    if (jQuery.isEmptyObject(saved_settings_map))
    {
        // SETTINGS IS EMPTY, SET TO DEFAULT
        check_for_undefined_settings();
    }
    else
    {
        // VALUE CHECKING
        let max_value;
        let min_value;

        max_value = parseInt(document.getElementById(setting_element_id.QUEST_SHOWN_VALUE).max);
        min_value = parseInt(document.getElementById(setting_element_id.QUEST_SHOWN_VALUE).min);
        saved_settings_map.quest_shown_value = ((saved_settings_map.quest_shown_value > max_value) ? max_value : saved_settings_map.quest_shown_value);
        saved_settings_map.quest_shown_value = ((saved_settings_map.quest_shown_value < min_value) ? min_value : saved_settings_map.quest_shown_value);

        max_value = parseInt(document.getElementById(setting_element_id.MIN_QUEST_CHAPTER).max);
        min_value = parseInt(document.getElementById(setting_element_id.MIN_QUEST_CHAPTER).min);
        saved_settings_map.min_quest_chapter = ((saved_settings_map.min_quest_chapter > max_value) ? max_value : saved_settings_map.min_quest_chapter);
        saved_settings_map.min_quest_chapter = ((saved_settings_map.min_quest_chapter < min_value) ? min_value : saved_settings_map.min_quest_chapter);

        max_value = parseInt(document.getElementById(setting_element_id.MAX_QUEST_CHAPTER).max);
        min_value = parseInt(document.getElementById(setting_element_id.MAX_QUEST_CHAPTER).min);
        saved_settings_map.max_quest_chapter = ((saved_settings_map.max_quest_chapter > max_value) ? max_value : saved_settings_map.max_quest_chapter);
        saved_settings_map.max_quest_chapter = ((saved_settings_map.max_quest_chapter < min_value) ? min_value : saved_settings_map.max_quest_chapter);

        saved_settings_map.min_quest_chapter = ((saved_settings_map.min_quest_chapter > saved_settings_map.max_quest_chapter) ? saved_settings_map.max_quest_chapter : saved_settings_map.min_quest_chapter);

        max_value = parseInt(document.getElementById(setting_element_id.ITEM_AMOUNT_PER_ROW).max);
        min_value = parseInt(document.getElementById(setting_element_id.ITEM_AMOUNT_PER_ROW).min);
        saved_settings_map.item_amount_per_row = ((saved_settings_map.item_amount_per_row > max_value) ? max_value : saved_settings_map.item_amount_per_row);
        saved_settings_map.item_amount_per_row = ((saved_settings_map.item_amount_per_row < min_value) ? min_value : saved_settings_map.item_amount_per_row);

        quest_shown_value = saved_settings_map.quest_shown_value;
        ascending_sort_quest_list = saved_settings_map.ascending_sort_quest_list;
        ascending_sort_quest_score = saved_settings_map.ascending_sort_quest_score;
        hide_quest_score = saved_settings_map.hide_quest_score;
        min_quest_chapter = saved_settings_map.min_quest_chapter;
        max_quest_chapter = saved_settings_map.max_quest_chapter;
        quest_filter = saved_settings_map.quest_filter;
        item_amount_per_row = saved_settings_map.item_amount_per_row;
        ignored_rarities = saved_settings_map.ignored_rarities;
        quest_display = saved_settings_map.quest_display;
        equipment_data_type = saved_settings_map.equipment_data_type;

        // CHECK FOR ANY UNDEFINED SETTINGS
        check_for_undefined_settings();

        // SAVE SETTINGS
        let settings_map = new Map();
        settings_map.quest_shown_value = quest_shown_value;
        settings_map.ascending_sort_quest_list = ascending_sort_quest_list;
        settings_map.ascending_sort_quest_score = ascending_sort_quest_score;
        settings_map.hide_quest_score = hide_quest_score;
        settings_map.min_quest_chapter = min_quest_chapter;
        settings_map.max_quest_chapter = max_quest_chapter;
        settings_map.quest_filter = quest_filter;
        settings_map.item_amount_per_row = item_amount_per_row;
        settings_map.ignored_rarities = ignored_rarities;
        settings_map.quest_display = quest_display;
        settings_map.equipment_data_type = equipment_data_type;
        let encrypted_setting_map = JSON.stringify(settings_map);
        localStorage.setItem('settings', encrypted_setting_map);
    }
}

function check_for_undefined_settings()
{
    /* TODO UPDATE WHENEVER A NEW SETTING IS ADDED */
    quest_shown_value = (quest_shown_value === undefined ? quest_shown_value_default : quest_shown_value);
    ascending_sort_quest_list = (ascending_sort_quest_list === undefined ? ascending_sort_quest_list_default : ascending_sort_quest_list);
    ascending_sort_quest_score = (ascending_sort_quest_score === undefined ? ascending_sort_quest_score_default : ascending_sort_quest_score);
    hide_quest_score = (hide_quest_score === undefined ? hide_quest_score_default : hide_quest_score);
    min_quest_chapter = (min_quest_chapter === undefined ? min_quest_chapter_default : min_quest_chapter);
    max_quest_chapter = (max_quest_chapter === undefined ? max_quest_chapter_default : max_quest_chapter);
    quest_filter = (quest_filter === undefined ? quest_filter_default : quest_filter);
    item_amount_per_row = (item_amount_per_row === undefined ? item_amount_per_row_default : item_amount_per_row);
    ignored_rarities = (ignored_rarities === undefined ? [] : ignored_rarities);
    quest_display = (quest_display === undefined ? quest_display_default : quest_display);
    equipment_data_type = (equipment_data_type === undefined ? equipment_data_type_default : equipment_data_type);
}

function is_cookies_exist()
{
    return localStorage.getItem("settings") !== null;
}
