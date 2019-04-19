console.log("[Character Reader] - Reading '" + "/" + window.location.pathname.substring(0, window.location.pathname.indexOf('/')) + window.location.pathname.split('/')[1] + "/data/character_data.json" + "'...");
let character_map = new Map();
let character_loaded = false;

let run_character = $(function () {
    $.ajax({
        'global': false,
        'url': "/" + window.location.pathname.substring(0, window.location.pathname.indexOf('/')) + window.location.pathname.split('/')[1] + "/data/character_data.json",
        'dataType': "json",
        'success': function (data) {
            $.when(
                $.each(data, function(i, characterData)
                {
                    let character_data = new Map();

                    character_data.set("name", characterData.name);
                    /** @namespace characterData.thematic */
                    character_data.set("thematic", characterData.thematic);

                    /** @namespace characterData.name_jp */
                    character_data.set("name_jp", characterData.name_jp);
                    /** @namespace characterData.thematic_jp */
                    character_data.set("thematic_jp", characterData.thematic_jp);

                    /** @namespace characterData.rank_1 */
                    character_data.set("rank_1", characterData.rank_1);
                    /** @namespace characterData.rank_2 */
                    character_data.set("rank_2", characterData.rank_2);
                    /** @namespace characterData.rank_3 */
                    character_data.set("rank_3", characterData.rank_3);
                    /** @namespace characterData.rank_4 */
                    character_data.set("rank_4", characterData.rank_4);
                    /** @namespace characterData.rank_5 */
                    character_data.set("rank_5", characterData.rank_5);
                    /** @namespace characterData.rank_6 */
                    character_data.set("rank_6", characterData.rank_6);
                    /** @namespace characterData.rank_7 */
                    character_data.set("rank_7", characterData.rank_7);
                    /** @namespace characterData.rank_8 */
                    character_data.set("rank_8", characterData.rank_8);
                    /** @namespace characterData.rank_9 */
                    character_data.set("rank_9", characterData.rank_9);
                    /** @namespace characterData.rank_10 */
                    character_data.set("rank_10", characterData.rank_10);
                    /** @namespace characterData.rank_11 */
                    character_data.set("rank_11", characterData.rank_11);
                    /** @namespace characterData.rank_12 */
                    character_data.set("rank_12", characterData.rank_12);
                    /** @namespace characterData.rank_13 */
                    character_data.set("rank_13", characterData.rank_13);

                    character_map.set(i, character_data);
                })
            ).then(function () {
                character_loaded = true;
                console.log("[Character Reader] - Character data loaded!")
            });
        }
    });
});

function get_character_data(character_name, key)
{
    if (character_map.has(character_name))
    {
        return character_map.get(character_name).get(key);
    }
    else
    {
        console.log("[Character Reader] - " + character_name + " is not found.");
    }
}