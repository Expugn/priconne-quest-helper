let quest_shown_value = 10;
function change_quest_shown_amt()
{
    quest_shown_value = Math.round(document.getElementById("quest-shown-amt").value);

    if (quest_shown_value > 30)
    {
        document.getElementById("quest-shown-amt").value = 30;
        quest_shown_value = 30;
    }
    if (quest_shown_value < 10)
    {
        document.getElementById("quest-shown-amt").value = 10;
        quest_shown_value = 10;
    }

    console.log("Quest Shown Updated to " + quest_shown_value);

    refresh_quest_table();
}