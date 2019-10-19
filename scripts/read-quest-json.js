let quest_map = new Map();
let quest_loaded = false;

read_quest_data(function ()
{
    quest_loaded = true;
    console.log(get_colored_message("Quest Reader", "Quest data loaded!", message_status.SUCCESS));
});

function read_quest_data(callback)
{
    const file_path = "/" + window.location.pathname.substring(0, window.location.pathname.indexOf('/')) + window.location.pathname.split('/')[1] + "/data/quest_data.json";
    console.log(get_colored_message("Quest Reader", "Reading ", message_status.INFO) + highlight_code(file_path) + message_status.INFO + "...");

    return $(function () {
        $.ajax({
            'global': false,
            'url': "/" + window.location.pathname.substring(0, window.location.pathname.indexOf('/')) + window.location.pathname.split('/')[1] + "/data/quest_data.json",
            'dataType': "json",
            'success': function (data) {
                $.when(
                    $.each(data, function(i, questData)
                    {
                        let quest_data = new Map();

                        /** @namespace questData.item_1 */
                        quest_data.set("item_1", questData.item_1);
                        /** @namespace questData.item_2 */
                        quest_data.set("item_2", questData.item_2);
                        /** @namespace questData.item_3 */
                        quest_data.set("item_3", questData.item_3);
                        /** @namespace itemData.item_4 */
                        if (questData.item_4 !== undefined) { quest_data.set("item_4", questData.item_4); }
                        /** @namespace questData.subdrops */
                        quest_data.set("subdrops", questData.subdrops);
                        /** @namespace questData.subdrops_percent */
                        if (questData.subdrops_percent !== undefined) { quest_data.set("subdrops_percent", questData.subdrops_percent); }
                        /** @namespace itemData.char_shard */
                        if (questData.char_shard !== undefined) { quest_data.set("char_shard", questData.char_shard); }

                        quest_map.set(i, quest_data);
                    })
                ).then(function () {
                    callback();
                });
            }
        });
    });
}

function get_quest_data(quest_name, key)
{
    if (quest_map.has(quest_name))
    {
        return quest_map.get(quest_name).get(key);
    }
    else
    {
        console.log(get_colored_message("Quest Reader", "get_quest_data() failed: Quest ID ", message_status.WARNING) + highlight(quest_name) + message_status.WARNING + " does not exist.");
    }
}