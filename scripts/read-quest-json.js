console.log("[Quest Reader] - Reading 'data/quest_data.json'...");
let quest_map = new Map();

let run_quest = $(function () {
    $.ajax({
        'global': false,
        'url': "data/quest_data.json",
        'dataType': "json",
        'success': function (data) {
            $.each(data, function(i, questData)
            {
                let quest_data = new Map();

                quest_data.set("name", questData.name);
                /** @namespace questData.item_1 */
                quest_data.set("item_1", questData.item_1);
                /** @namespace questData.item_2 */
                quest_data.set("item_2", questData.item_2);
                /** @namespace questData.item_3 */
                quest_data.set("item_3", questData.item_3);
                /** @namespace questData.subdrops */
                quest_data.set("subdrops", questData.subdrops);

                quest_map.set(questData.name, quest_data);
            });
        }
    });
});

function get_quest_data(quest_name, key)
{
    if (quest_map.has(quest_name))
    {
        return quest_map.get(quest_name).get(key);
    }
    else
    {
        console.log("[Quest Reader] - " + quest_name + " is not found.");
    }
}