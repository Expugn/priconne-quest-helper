function update_progress()
{
    const update_in_progress = true;
    const update_name = "April 19, 2019";

    const normal_quest_updated = false;
    const hard_quest_updated = true;
    const equipment_selection_updated = true;
    const english_translated_names_updated = true;
    const rank_equipment_updated = false;

    if (update_in_progress)
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