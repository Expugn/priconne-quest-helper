const system = Object.freeze({
    DEFAULT_RANK_AMOUNT: 14,
    CHARACTER_RANK_EQUIP_COUNT: 6
});

const select_elements = Object.freeze({
    CHARACTER: 'character-select',
    EQUIPMENT: 'equipment-select',
    QUEST: 'quest-select'
});

const next_prev_buttons = Object.freeze({
    CHARACTER_NEXT: 'next-character-button',
    CHARACTER_PREV: 'prev-character-button',
    EQUIPMENT_NEXT: 'next-equipment-button',
    EQUIPMENT_PREV: 'prev-equipment-button'
});

const text_areas = Object.freeze({
    CHARACTER: 'character-json-textarea',
    EQUIPMENT: 'equipment-json-textarea',
    QUEST: 'quests-json-textarea',
});

const file_names = Object.freeze({
    CHARACTER: 'character_data.json',
    EQUIPMENT: 'equipment_data.json',
    QUEST: 'quest_data.json',
});

let CURRENT_RANK_AMOUNT = system.DEFAULT_RANK_AMOUNT;

function init_character_select()
{
    let character_select_html = "";
    for (let [character_id, character_data] of character_map)
    {
        let thematic = get_character_data(character_id, "thematic");
        character_select_html += "<option value='" + character_id + "'>" + ((thematic !== "") ? thematic + " " : "") + get_character_data(character_id, "name") + "</option>";
    }
    document.getElementById(select_elements.CHARACTER).innerHTML = character_select_html;
    update_character_display();
}

function init_equipment_select()
{
    let equipment_select_html = "";
    for (let [equipment_id, equipment_data] of equipment_map)
    {
        equipment_select_html += "<option value='" + equipment_id + "'>" + get_equipment_data(equipment_id, "name") + "</option>";
    }
    document.getElementById(select_elements.EQUIPMENT).innerHTML = equipment_select_html;
    update_equipment_display();
}

function init_next_prev_buttons()
{
    // CHARACTER NEXT / PREVIOUS
    $('#' + next_prev_buttons.CHARACTER_NEXT).click(function() {
        $('#' + select_elements.CHARACTER + ' option:selected').next().prop('selected', true);
        update_character_display();
    });
    $('#' + next_prev_buttons.CHARACTER_PREV).click(function() {
        $('#' + select_elements.CHARACTER + ' option:selected').prev().prop('selected', true);
        update_character_display();
    });

    // EQUIPMENT NEXT / PREVIOUS
    $('#' + next_prev_buttons.EQUIPMENT_NEXT).click(function() {
        $('#' + select_elements.EQUIPMENT + ' option:selected').next().prop('selected', true);
        update_equipment_display();
    });
    $('#' + next_prev_buttons.EQUIPMENT_PREV).click(function() {
        $('#' + select_elements.EQUIPMENT + ' option:selected').prev().prop('selected', true);
        update_equipment_display();
    });
}

function download_character_json()
{
    write_character_json();
    download_file(file_names.CHARACTER, document.getElementById(text_areas.CHARACTER).innerHTML);
}

function download_equipment_json()
{
    write_equipment_json();
    download_file(file_names.EQUIPMENT, document.getElementById(text_areas.EQUIPMENT).innerHTML);
}

function download_quest_json()
{
    download_file(file_names.QUEST, document.getElementById(text_areas.QUEST).innerHTML);
}

function download_file(file_name, file_content)
{
    console.log("Downloading " + file_name + "...");

    // CREATE ELEMENT
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(file_content));
    element.setAttribute('download', file_name);
    element.style.display = 'none';
    document.body.appendChild(element);

    // DOWNLOAD FILE
    element.click();

    // DELETE ELEMENT
    document.body.removeChild(element);
}

function save_character_info()
{
    // GET CURRENT DATA
    let selected_character = document.getElementById(select_elements.CHARACTER).value;
    let character_name = document.getElementById(character_elements.NAME_INPUT).value;
    let character_thematic = document.getElementById(character_elements.THEMATIC_INPUT).value;
    let character_name_jp = document.getElementById(character_elements.NAME_JP_INPUT).value;
    let character_thematic_jp = document.getElementById(character_elements.THEMATIC_JP_INPUT).value;

    // OVERWRITE CHARACTER MAP
    let character_data = character_map.get(selected_character);

    character_data.set("name", character_name);
    character_data.set("thematic", character_thematic);
    character_data.set("name_jp", character_name_jp);
    character_data.set("thematic_jp", character_thematic_jp);

    character_map.set(selected_character, character_data);

    // UPDATE
    update_character_select();
    update_character_display();
}

function save_equipment_info()
{
    // GET CURRENT DATA
    let selected_equipment = document.getElementById(select_elements.EQUIPMENT).value;
    let equipment_name = document.getElementById(equipment_elements.NAME_INPUT).value;
    let equipment_id = document.getElementById(equipment_elements.RARITY_INPUT).value + "-" + get_equipment_data(selected_equipment, "id").split('-')[1];
    let equipment_has_fragments = document.getElementById(equipment_elements.HAS_FRAGMENTS_INPUT).checked;
    let equipment_required_pieces = document.getElementById(equipment_elements.REQUIRED_PIECES_INPUT).value;

    // OVERWRITE EQUIPMENT MAP
    let equipment_data = equipment_map.get(selected_equipment);

    equipment_data.set("name", equipment_name);
    equipment_data.set("id", equipment_id);
    equipment_data.set("has_fragments", equipment_has_fragments);
    equipment_data.set("req_pieces", equipment_required_pieces);

    equipment_map.set(selected_equipment, equipment_data);

    // UPDATE
    update_equipment_select();
    update_equipment_display();
}

function draw_equipment_items()
{
    let count = 0;
    let table_HTML = "";
    table_HTML += "<tbody>";
    for (let [item_id, item_data_map] of equipment_map)
    {
        let item_name = get_equipment_data(item_id, "name");

        // ADD TABLE ROW START IF FIRST ITEM
        if (count === 0)
        {
            table_HTML += "<tr>";
        }

        // IGNORE CHARACTER SHARD
        if (item_name.includes("Shard")) { continue; }

        table_HTML += "<th class=\"requested-item-image\">";
        table_HTML += "<button id=\"" + item_name.split(' ').join('_') + "\" class=\"ingredient-button all-ingredient-comp pointer-cursor\" onclick=\"change_equipment('" + item_name.replace("'", "[apostrophe]") + "')\"><img class=\"ingredient-button-image ingredient-button all-ingredient-comp\" src=\"../../../" + get_item_image_path(item_name.split(' ').join('_')) + "\" alt=\"\"></button>";
        table_HTML += "</th>";
        count++;

        if ((count % 14) === 0 && count !== 0)
        {
            table_HTML += "</tr>";

            table_HTML += "<tr>";
        }
    }

    // ADD PLACEHOLDER
    table_HTML += "<th class=\"requested-item-image\">";
    table_HTML += "<button id=\"Placeholder\" class=\"ingredient-button all-ingredient-comp pointer-cursor\" onclick=\"change_equipment('')\"><img class=\"ingredient-button-image ingredient-button all-ingredient-comp\" src=\"../../../" + get_item_image_path("Placeholder") + "\" alt=\"\"></button>";
    table_HTML += "</th>";

    table_HTML += "</tr></tbody>";
    document.getElementById("equipment-table").innerHTML = table_HTML;
}

function draw_required_items()
{
    let count = 0;
    let table_HTML = "";
    table_HTML += "<tbody>";
    for (let [item_id, item_data_map] of equipment_map)
    {
        let item_name = get_equipment_data(item_id, "name");

        // ADD TABLE ROW START IF FIRST ITEM
        if (count === 0)
        {
            table_HTML += "<tr>";
        }

        // IGNORE CHARACTER SHARD
        if (item_name.includes("Shard")) { continue; }

        table_HTML += "<th class=\"requested-item-image\">";
        table_HTML += "<button id=\"" + item_name.split(' ').join('_') + "\" class=\"ingredient-button all-ingredient-comp pointer-cursor\" onclick=\"change_required_item('" + item_name.replace("'", "[apostrophe]") + "')\"><img class=\"ingredient-button-image ingredient-button all-ingredient-comp\" src=\"../../../" + get_item_image_path(item_name.split(' ').join('_')) + "\" alt=\"\"></button>";
        table_HTML += "</th>";
        count++;

        if ((count % 14) === 0 && count !== 0)
        {
            table_HTML += "</tr>";

            table_HTML += "<tr>";
        }
    }

    // ADD PLACEHOLDER
    table_HTML += "<th class=\"requested-item-image\">";
    table_HTML += "<button id=\"Placeholder\" class=\"ingredient-button all-ingredient-comp pointer-cursor\" onclick=\"change_required_item('')\"><img class=\"ingredient-button-image ingredient-button all-ingredient-comp\" src=\"../../../" + get_item_image_path("Placeholder") + "\" alt=\"\"></button>";
    table_HTML += "</th>";

    table_HTML += "</tr></tbody>";
    document.getElementById("required-item-table").innerHTML = table_HTML;
}

function add_new_character()
{
    let selected_character = document.getElementById(select_elements.CHARACTER).value;
    let new_character_id = document.getElementById("new-character-name-input").value;

    let new_character_map = new Map();

    for (let [character_id, character_data] of character_map)
    {
        new_character_map.set(character_id, character_data);

        // ADD NEW CHARACTER AFTER SELECTED CHARACTER
        if (selected_character === character_id)
        {
            let blank_character_data = new Map();
            blank_character_data.set("name", new_character_id);
            blank_character_data.set("thematic", "");
            blank_character_data.set("name_jp", "");
            blank_character_data.set("thematic_jp", "");

            // MAKE EMPTY EQUIP ARRAY
            let empty_rank_equip_array = [];
            for (let i = 0 ; i < system.CHARACTER_RANK_EQUIP_COUNT ; i++)
            {
                empty_rank_equip_array.push("");
            }

            // FILL EMPTY EQUIP ARRAY IN ALL CURRENT RANKS
            for (let i = 0 ; i < CURRENT_RANK_AMOUNT ; i++)
            {
                blank_character_data.set("rank_" + (i + 1), empty_rank_equip_array);
            }

            // SET NEW CHARACTER INTO NEW CHARACTER MAP
            new_character_map.set(new_character_id, blank_character_data);
        }
    }

    // REPLACE CHARACTER MAP
    character_map = new_character_map;

    // UPDATE
    init_character_select();
    document.getElementById(select_elements.CHARACTER).value = new_character_id;
    update_character_display();
}

function add_new_equipment()
{
    let selected_equipment = document.getElementById(select_elements.EQUIPMENT).value;
    let new_equipment_id = document.getElementById("new-equipment-name-input").value;

    let new_equipment_map = new Map();

    for (let [equipment_id, equipment_data] of equipment_map)
    {
        new_equipment_map.set(equipment_id, equipment_data);

        // ADD NEW EQUIPMENT AFTER SELECTED CHARACTER
        if (selected_equipment === equipment_id)
        {
            let empty_array = [];
            let blank_equipment_data = new Map();
            blank_equipment_data.set("name", new_equipment_id);
            blank_equipment_data.set("id", "rarity-0");
            blank_equipment_data.set("has_fragments", true);
            blank_equipment_data.set("req_pieces", 1);
            blank_equipment_data.set("req_items", empty_array);

            // SET NEW EQUIPMENT INTO NEW EQUIPMENT MAP
            new_equipment_map.set(new_equipment_id, blank_equipment_data);
        }
    }

    // REPLACE EQUIPMENT MAP
    equipment_map = new_equipment_map;

    // UPDATE
    init_equipment_select();
    document.getElementById(select_elements.EQUIPMENT).value = new_equipment_id;
    update_equipment_display();
}

function add_rank()
{
    // INCREMENT CURRENT RANK AMOUNT
    CURRENT_RANK_AMOUNT++;

    console.log("Adding Rank " + CURRENT_RANK_AMOUNT + "...");

    // MAKE EMPTY EQUIP ARRAY
    let empty_rank_equip_array = [];
    for (let i = 0 ; i < system.CHARACTER_RANK_EQUIP_COUNT ; i++)
    {
        empty_rank_equip_array.push("");
    }

    // RECREATE CHARACTER MAP
    let new_character_map = new Map();

    for (let [character_id, character_data] of character_map)
    {
        // SET EMPTY RANK EQUIP ARRAY TO NEW RANK
        character_data.set("rank_" + CURRENT_RANK_AMOUNT, empty_rank_equip_array);

        // SET NEW CHARACTER DATA TO NEW CHARACTER MAP
        new_character_map.set(character_id, character_data);
    }

    // REPLACE CHARACTER MAP
    character_map = new_character_map;

    // UPDATE
    update_character_display();
}