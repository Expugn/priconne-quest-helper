// JUNE 18, 2019
const update_date = new Date(Date.UTC(2019, 5, 18, 12, 0, 0));
const date_options = { year: 'numeric', month: 'long', day: 'numeric' };

function update_progress()
{
    const normal_quest_updated = false;
    const hard_quest_updated = false;
    const equipment_selection_updated = false;
    const english_translated_names_updated = false;
    const rank_equipment_updated = false;

    if (!normal_quest_updated || !hard_quest_updated || !equipment_selection_updated || !english_translated_names_updated || !rank_equipment_updated)
    {
        console.log("[Update] - Showing Update Progress");
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
        document.getElementById("update-quest-data-check").style.display = (normal_quest_updated && hard_quest_updated) ? "inline" : "none";
        document.getElementById("update-equipment-data-check").style.display = (equipment_selection_updated && english_translated_names_updated) ? "inline" : "none";
        document.getElementById("update-character-data-check").style.display = (rank_equipment_updated) ? "inline" : "none";

        document.getElementById("update-normal-quests-label").style.textDecoration = (normal_quest_updated) ? "" : "line-through";
        document.getElementById("update-hard-quests-label").style.textDecoration = (hard_quest_updated) ? "" : "line-through";
        document.getElementById("update-equipment-selection-label").style.textDecoration = (equipment_selection_updated) ? "" : "line-through";
        document.getElementById("update-en-tl-names-label").style.textDecoration = (english_translated_names_updated) ? "" : "line-through";
        document.getElementById("update-rank-equip-label").style.textDecoration = (rank_equipment_updated) ? "" : "line-through";
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