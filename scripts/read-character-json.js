let character_map = new Map();
let character_loaded = false;

const character_data_version = Object.freeze({
    CURRENT: 'character-data-current',
    LEGACY: 'character-data-legacy'
});

// MAX CHARACTER RANK INFORMATION IS INITIALIZED IN read_character_data()
let max_character_rank_information = {
    CURRENT: 0,
    LEGACY: 0,
    LOADED: 0,
};

const character_data_location = Object.freeze({
    CURRENT: "/" + window.location.pathname.substring(0, window.location.pathname.indexOf('/')) + window.location.pathname.split('/')[1] + "/data/character_data.json",
    LEGACY: "/" + window.location.pathname.substring(0, window.location.pathname.indexOf('/')) + window.location.pathname.split('/')[1] + "/data/character_data_08.30.2019.json"
});

read_character_data(character_data_version.CURRENT, function ()
{
    character_loaded = true;
    console.log(get_colored_message("Character Reader", "Character data loaded!", message_status.SUCCESS));
});

function read_character_data(character_file_type, callback)
{
    let file_path;
    if (character_file_type === character_data_version.LEGACY)
    {
        file_path = character_data_location.LEGACY;
    }
    else
    {
        file_path = character_data_location.CURRENT;
    }

    console.log(get_colored_message("Character Reader", "Reading ", message_status.INFO) + highlight_code(file_path) + message_status.INFO + "...");
    return $(function () {
        $.ajax({
            'global': false,
            'url': file_path,
            'dataType': "json",
            'success': function (data) {
                $.when(
                    $.each(data, function(i, characterData)
                    {
                        let character_data = new Map();

                        character_data.set("name", characterData["name"]);
                        character_data.set("thematic", characterData["thematic"]);
                        character_data.set("name_jp", characterData["name_jp"]);
                        character_data.set("thematic_jp", characterData["thematic_jp"]);

                        for (let i = 1 ; characterData["rank_" + i] !== undefined ; i++)
                        {
                            character_data.set("rank_" + i, characterData["rank_" + i]);

                            if ((characterData["rank_" + (i+1)] === undefined) && (max_character_rank_information.CURRENT === 0 || max_character_rank_information.LEGACY === 0)) {
                                if (character_file_type === character_data_version.CURRENT) {
                                    max_character_rank_information.CURRENT = i;
                                }
                                else if (character_file_type === character_data_version.LEGACY) {
                                    max_character_rank_information.LEGACY = i;
                                }
                            }
                        }

                        character_map.set(i, character_data);
                    })
                ).then(function () {
                    if (character_file_type === character_data_version.LEGACY) {
                        max_character_rank_information.LOADED = max_character_rank_information.LEGACY;
                    }
                    else {
                        max_character_rank_information.LOADED = max_character_rank_information.CURRENT;
                    }
                    callback();
                });
            }
        });
    });
}

function get_character_data(character_name, key)
{
    if (character_map.has(character_name))
    {
        return character_map.get(character_name).get(key);
    }
    else
    {
        console.log(get_colored_message("Character Reader", "get_character_data() failed: Character ID ", message_status.WARNING) + highlight(character_name) + message_status.WARNING + " does not exist.");
    }
}

function check_if_character_exists(character_name)
{
    return character_map.has(character_name);
}