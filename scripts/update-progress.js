// NOVEMBER 15, 2019
const update_date = new Date(Date.UTC(2019, 10, 15, 24, 0, 0));
const date_options = { year: 'numeric', month: 'long', day: 'numeric' };

function update_progress()
{
    const quest_update_status = Object.freeze({
        NORMAL_QUEST: true,
        HARD_QUEST: true,
        EQUIPMENT_SELECTION: true,
        EQUIPMENT_ENGLISH_TRANSLATION: true,
        RANK_EQUIPMENT: false,
    });
    // and README
    // and Settings Quest Min/Max
    // and Presets Min/Max
    // and Rank Min/Max

    if (!quest_update_status.NORMAL_QUEST ||
        !quest_update_status.HARD_QUEST ||
        !quest_update_status.EQUIPMENT_SELECTION ||
        !quest_update_status.EQUIPMENT_ENGLISH_TRANSLATION ||
        !quest_update_status.RANK_EQUIPMENT)
    {
        console.log(get_colored_message("Update", "Showing Update Progress", message_status.INFO));
        document.getElementById("update-notification-img").style.display = "inline";
        document.getElementById("update-div").style.display = "block";
        if (current_language === "en")
        {
            document.getElementById("update-name").innerHTML = "Quest Update: " + get_update_date();
        }
        else
        {
            document.getElementById("update-name").innerHTML = language_json["other_tab"]["quest_update"] + " " + get_update_date();
        }

        // UPDATE PROGRESS
        document.getElementById("update-quest-data-check").style.display = (quest_update_status.NORMAL_QUEST && quest_update_status.HARD_QUEST) ? "inline" : "none";
        document.getElementById("update-equipment-data-check").style.display = (quest_update_status.EQUIPMENT_SELECTION && quest_update_status.EQUIPMENT_ENGLISH_TRANSLATION) ? "inline" : "none";
        document.getElementById("update-character-data-check").style.display = (quest_update_status.RANK_EQUIPMENT) ? "inline" : "none";

        document.getElementById("update-normal-quests-label").style.textDecoration = (quest_update_status.NORMAL_QUEST) ? "" : "line-through";
        document.getElementById("update-hard-quests-label").style.textDecoration = (quest_update_status.HARD_QUEST) ? "" : "line-through";
        document.getElementById("update-equipment-selection-label").style.textDecoration = (quest_update_status.EQUIPMENT_SELECTION) ? "" : "line-through";
        document.getElementById("update-en-tl-names-label").style.textDecoration = (quest_update_status.EQUIPMENT_ENGLISH_TRANSLATION) ? "" : "line-through";
        document.getElementById("update-rank-equip-label").style.textDecoration = (quest_update_status.RANK_EQUIPMENT) ? "" : "line-through";
    }

}

function get_update_date()
{
    if (current_language === "en")
    {
        return update_date.toLocaleDateString("en-US", date_options);
    }
    else
    {
        return update_date.toLocaleDateString(language_json["system"]["date_locale"], date_options);
    }
}

function add_update_date_to_footer()
{
    document.getElementById("update-date-span").innerHTML = get_update_date();
}

function refresh_quest_update_language()
{
    if (current_language === "en")
    {
        document.getElementById("update-name").innerHTML = "Quest Update: " + get_update_date();
    }
    else
    {
        document.getElementById("update-name").innerHTML = language_json["other_tab"]["quest_update"] + " " + get_update_date();
    }
}