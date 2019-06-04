// MAY 17, 2019
const update_date = new Date(Date.UTC(2019, 4, 17, 12, 0, 0));
const date_options = { year: 'numeric', month: 'long', day: 'numeric' };

function update_progress()
{
    const update_name = get_update_date();

    const normal_quest_updated = true;
    const hard_quest_updated = true;
    const equipment_selection_updated = true;
    const english_translated_names_updated = true;
    const rank_equipment_updated = true;

    if (!normal_quest_updated || !hard_quest_updated || !equipment_selection_updated || !english_translated_names_updated || !rank_equipment_updated)
    {
        console.log("[Update] - Showing Update Progress");
        document.getElementById("update-notification-img").style.display = "inline";
        document.getElementById("update-div").style.display = "block";
        document.getElementById("update-name").innerHTML = "Quest Update: " + update_name;

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