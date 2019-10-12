let selected_equipment_id;
let selected_required_item;

const equipment_elements = Object.freeze({
    IMAGE: 'equipment-image',
    FRAGMENT_IMAGE: 'equipment-fragment-image',
    NAME: 'equipment-name',
    NAME_INPUT: 'equipment-name-input',
    ID_INPUT: 'equipment-id-input',
    RARITY_INPUT: 'equipment-rarity-input',
    RARITY_INDEX_INPUT: 'equipment-rarity-index-input',
    HAS_FRAGMENTS_INPUT: 'equipment-has-fragments-input',
    REQUIRED_PIECES_INPUT: 'equipment-required-pieces-input',
});

function update_equipment_display()
{
    let selected_equipment = document.getElementById(select_elements.EQUIPMENT).value;
    console.log("Updating equipment display to: " + selected_equipment);

    // GET EQUIPMENT DATA
    let equipment_name = get_equipment_data(selected_equipment, "name");

    // CHANGE IMAGE
    let equipment_image_name = equipment_name.replace(' ', '_');
    document.getElementById(equipment_elements.IMAGE).src = "../../../" + get_item_image_path(equipment_image_name.split(' ').join('_'));

    // CHANGE NAME
    document.getElementById(equipment_elements.NAME).innerHTML = equipment_name;

    // FILL IN DATA
    document.getElementById(equipment_elements.NAME_INPUT).value = get_equipment_data(selected_equipment, "name");
    //document.getElementById(equipment_elements.ID_INPUT).value = get_equipment_data(selected_equipment, "id");
    document.getElementById(equipment_elements.RARITY_INPUT).value = get_equipment_data(selected_equipment, "id").split('-')[0];
    document.getElementById(equipment_elements.HAS_FRAGMENTS_INPUT).checked = get_equipment_data(selected_equipment, "has_fragments");
    document.getElementById(equipment_elements.REQUIRED_PIECES_INPUT).value = get_equipment_data(selected_equipment, "req_pieces");

    // TOGGLE VISIBILITY OF FRAGMENT IMAGE
    if (get_equipment_data(selected_equipment, "has_fragments"))
    {
        document.getElementById(equipment_elements.FRAGMENT_IMAGE).src = "../../../" + get_item_image_path(equipment_image_name.split(' ').join('_') + "_Fragment");
        document.getElementById(equipment_elements.FRAGMENT_IMAGE).hidden = false;
    }
    else
    {
        document.getElementById(equipment_elements.FRAGMENT_IMAGE).hidden = true;
    }

    // REQUIRED ITEMS
    let required_item_array = equipment_map.get(selected_equipment).get("req_items");
    let required_items_html = "<tr>";
    for (let i = 0 ; i < 3 ; i++)
    {
        required_items_html += "<td><th class=\"requested-item-image\">";
        // equipmentName-equipNumber
        required_items_html += "<button id\"" + selected_equipment + "-" + (i) + "\" " +
            "class=\"ingredient-button all-ingredient-comp pointer-cursor\" onclick=\"init_change_required_items('" + selected_equipment + "', " + i + ");\">" +
            "<img class=\"ingredient-button-image ingredient-button all-ingredient-comp\" " +
            "src=\"../../../" + ((required_item_array[i] !== undefined) ? get_item_image_path(required_item_array[i].split(' ').join('_')) : get_item_image_path("Placeholder")) + "\" alt=\"\"></button>";
        required_items_html += "</th></td>";
    }
    required_items_html += "</tr>";
    document.getElementById("required-items-table").innerHTML = required_items_html;
}

function init_change_required_items(equipment_id, required_item_index)
{
    console.log(equipment_id + ", req_item_index:" + required_item_index);
    selected_equipment_id = equipment_id;
    selected_required_item = required_item_index;

    document.getElementById("required-item-overlay").hidden = false;
}

function change_required_item(item_name)
{
    item_name = item_name.replace("[apostrophe]", "'");
    console.log("Selected " + ((item_name !== "") ? item_name : "PLACEHOLDER"));

    // HIDE OVERLAY
    document.getElementById("required-item-overlay").hidden = true;

    let equipment_data = equipment_map.get(selected_equipment_id);
    let required_item_array = equipment_data.get("req_items");

    // CHANGE EQUIPMENT
    // CHECK IF SELECTED INDEX IS EARLIEST INDEX AVAILABLE
    // IF NOT, PUSH ITEM
    // IF IT IS, REPLACE ITEM
    if (selected_required_item + 1 > required_item_array.length)
    {
        required_item_array.push(item_name);
    }
    else
    {
        required_item_array[selected_required_item] = item_name;
    }

    // SPLICE EMPTY ITEM/PLACEHOLDER FROM ARRAY IF NEEDED
    if (item_name === "")
    {
        let index = required_item_array.indexOf("");
        if (index > -1)
        {
            required_item_array.splice(index, 1)
        }
    }

    // SAVE DATA
    equipment_data.set("req_items", required_item_array);
    equipment_map.set(selected_equipment_id, equipment_data);

    // UPDATE
    update_equipment_display();
}