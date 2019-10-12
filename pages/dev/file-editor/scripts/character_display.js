let current_equipment_status = "";
let selected_character_id;
let selected_rank;
let selected_equip_id;
let rank_items = [];

const change_equipment_status = Object.freeze({
    EDIT_ONE: 'edit-one',
    EDIT_ALL: 'edit-all',
});

const character_elements = Object.freeze({
    IMAGE: 'character-image',
    NAME: 'character-name',
    NAME_INPUT: 'character-name-input',
    THEMATIC_INPUT: 'character-thematic-input',
    NAME_JP_INPUT: 'character-name-jp-input',
    THEMATIC_JP_INPUT: 'character-thematic-jp-input',
});

function update_character_display()
{
    let selected_character = document.getElementById(select_elements.CHARACTER).value;
    console.log("Updating character display to: " + selected_character);

    // GET CHARACTER DATA
    let character_name = get_character_data(selected_character, "name");
    let character_thematic = get_character_data(selected_character, "thematic");

    // CHANGE IMAGE
    let character_image_name = (((character_thematic !== "") ? character_thematic.replace(' ', '_') + " " : "") + character_name).replace(' ', '_');
    document.getElementById(character_elements.IMAGE).src = "../../../" + get_unit_icon_image_path(character_image_name);

    // CHANGE NAME
    document.getElementById(character_elements.NAME).innerHTML = character_name + ((character_thematic !== "") ? " (" + character_thematic + ")" : "");

    // FILL IN DATA
    document.getElementById(character_elements.NAME_INPUT).value = get_character_data(selected_character, "name");
    document.getElementById(character_elements.THEMATIC_INPUT).value = get_character_data(selected_character, "thematic");
    document.getElementById(character_elements.NAME_JP_INPUT).value = get_character_data(selected_character, "name_jp");
    document.getElementById(character_elements.THEMATIC_JP_INPUT).value = get_character_data(selected_character, "thematic_jp");

    // EQUIPMENT
    let equipment_table_html = "";
    for (let i = 0 ; i < CURRENT_RANK_AMOUNT ; i++)
    {
        let rank_equipment = character_map.get(selected_character).get("rank_" + (i + 1));
        equipment_table_html += "<tr>";

        // RANK NUMBER
        equipment_table_html += "<td>Rank " + (i + 1) + "</td>";

        // EQUIPMENT
        for (let a = 0 ; a < system.CHARACTER_RANK_EQUIP_COUNT ; a++)
        {
            equipment_table_html += "<td>";

            equipment_table_html += "<th class=\"requested-item-image\">";
            // name-rank-equipNumber
            equipment_table_html += "<button id=\"" + selected_character + "-" + (i + 1) + "-" + (a) + "\" " +
                "class=\"ingredient-button all-ingredient-comp pointer-cursor\" onclick=\"init_change_equipment('" + selected_character + "', " + (i + 1) + ", " + a + ");\">" +
                "<img class=\"ingredient-button-image ingredient-button all-ingredient-comp\" " +
                "src=\"../../../" + get_item_image_path(rank_equipment[a].split(' ').join('_')) + "\" alt=\"\"></button>";
            equipment_table_html += "</th>";

            equipment_table_html += "</td>";
        }

        // RANK EDIT ALL BUTTON
        equipment_table_html += "<td><button id=\"" + selected_character + "-edit-rank-" + (i + 1) + "\" type=\"button\" onclick=\"init_edit_rank('" + selected_character + "', " + (i + 1) + ");\">Edit All Rank " + (i + 1) + "</button></td>";

        equipment_table_html += "</tr>";
    }
    document.getElementById("character-equipment-table").innerHTML = equipment_table_html;
}

function init_change_equipment(character_id, rank, equip_id)
{
    console.log(character_id + ", rank:" + rank + ", item:" + equip_id);
    selected_character_id = character_id;
    selected_rank = rank;
    selected_equip_id = equip_id;
    current_equipment_status = change_equipment_status.EDIT_ONE;

    document.getElementById("equipment-overlay").hidden = false;
}

function change_equipment(item_name)
{
    item_name = item_name.replace("[apostrophe]", "'");
    console.log("Selected " + ((item_name !== "") ? item_name : "PLACEHOLDER"));

    if (current_equipment_status === change_equipment_status.EDIT_ONE)
    {
        // HIDE OVERLAY
        document.getElementById("equipment-overlay").hidden = true;

        // GET DATA
        let character_data = character_map.get(selected_character_id);
        let equipment_array = character_data.get("rank_" + selected_rank);

        // CHANGE EQUIPMENT
        equipment_array[selected_equip_id] = item_name;

        // SAVE DATA
        character_data.set("rank_" + selected_rank, equipment_array);
        character_map.set(selected_character_id, character_data);

        // UPDATE
        update_character_display();
        current_equipment_status = "";
    }
    else if (current_equipment_status === change_equipment_status.EDIT_ALL)
    {
        // ADD ITEM
        rank_items.push(item_name);

        // ENOUGH ITEMS HAVE BEEN SELECTED
        if (rank_items.length >= system.CHARACTER_RANK_EQUIP_COUNT)
        {
            // HIDE OVERLAY
            document.getElementById("equipment-overlay").hidden = true;

            // SAVE DATA
            let character_data = character_map.get(selected_character_id);
            character_data.set("rank_" + selected_rank, rank_items);
            character_map.set(selected_character_id, character_data);

            // UPDATE
            update_character_display();
            current_equipment_status = "";
        }
    }
}
function init_edit_rank(character_id, rank)
{
    console.log("Editing all equipment in rank " + rank + "...");
    // CLEAN RANK ITEMS
    rank_items = [];
    selected_character_id = character_id;
    selected_rank = rank;
    current_equipment_status = change_equipment_status.EDIT_ALL;

    document.getElementById("equipment-overlay").hidden = false;
}