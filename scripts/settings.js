let quest_shown_value = 10;
function change_quest_shown_amt()
{
    quest_shown_value = Math.round(document.getElementById("quest-shown-amt").value);
    console.log("Quest Shown Updated to " + quest_shown_value);

    refresh_quest_table();
}