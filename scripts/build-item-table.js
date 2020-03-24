let item_table_ready = false;
let item_table_currently_selected_items_map = new Map();

function build_item_tables()
{
    let previous_item_element_ids = new Map();

    if (item_table_ready) {
        // COLLECT INFORMATION OF ALL CURRENT ITEM TABLE ITEMS (HAS "item-table-item" CLASS)
        let collection_of_item_table_items = document.getElementsByClassName("item-table-item");
        for (let i = 0 ; i < collection_of_item_table_items.length ; i++) {
            // {item_name, item-id-amt (REDIRECTS TO INPUT ELEMENT)}
            previous_item_element_ids.set(collection_of_item_table_items[i].title, collection_of_item_table_items[i].id);
        }

        let browsed_items = [];
        // GO THROUGH ALL ITEMS AND SAVE VALUES IN A MAP
        for (let [item_name, item_data_map] of equipment_map) {
            let item_id = item_data_map.get("id");

            if (document.getElementById(item_id)) {
                if (item_name !== document.getElementById(item_id).title) {
                    // THE OLD EQUIPMENT DATA HAS INFORMATION ABOUT THIS ITEM
                    if (previous_item_element_ids.has(item_name))
                    {
                        let selected_amt = document.getElementById(previous_item_element_ids.get(item_data_map.get("name")) + "-amt").value;

                        // IF THE ITEM HAS A VALUE GREATER THAN 1 SELECTED, ADD ITEM AND VALUE TO PROJECT ITEM DATA
                        if (selected_amt >= 1) {
                            item_table_currently_selected_items_map.set(item_id, selected_amt);
                        }
                    }

                    // ADD ITEM TO BROWSED
                    browsed_items.push(document.getElementById(item_id).title);
                }
                else
                {
                    // ELEMENT ID EXISTS
                    if (document.getElementById(item_id + "-amt")) {
                        // SAVE VALUE
                        let selected_amt = document.getElementById(item_id + "-amt").value;

                        // IF THE ITEM HAS A VALUE GREATER THAN 1 SELECTED, ADD ITEM AND VALUE TO PROJECT ITEM DATA
                        if (selected_amt >= 1) {
                            item_table_currently_selected_items_map.set(item_id, selected_amt);
                        }
                    }
                }
            }
            else {
                if (browsed_items.includes(item_name)) {
                    let selected_amt = document.getElementById(previous_item_element_ids.get(item_name) + "-amt").value;

                    // IF THE ITEM HAS A VALUE GREATER THAN 1 SELECTED, ADD ITEM AND VALUE TO PROJECT ITEM DATA
                    if (selected_amt >= 1) {
                        item_table_currently_selected_items_map.set(item_id, selected_amt);
                    }
                }
            }
        }
    }

    // HTML STRING VARIABLES
    let common_item_HTML = "";
    let copper_item_HTML = "";
    let silver_item_HTML = "";
    let gold_item_HTML = "";
    let purple_item_HTML = "";
    let misc_item_HTML = "";

    // TABLE BODY CONTENT
    for (let [item_name, item_data_map] of equipment_map)
    {
        let item_id = item_data_map.get("id");
        let rarity_class = item_id.substring(0, item_id.indexOf('-'));

        switch (rarity_class) {
            case "common":
                common_item_HTML = add_item_image_to_table(common_item_HTML, item_name, item_id, rarity_class);
                break;
            case "copper":
                copper_item_HTML = add_item_image_to_table(copper_item_HTML, item_name, item_id, rarity_class);
                break;
            case "silver":
                silver_item_HTML = add_item_image_to_table(silver_item_HTML, item_name, item_id, rarity_class);
                break;
            case "gold":
                gold_item_HTML = add_item_image_to_table(gold_item_HTML, item_name, item_id, rarity_class);
                break;
            case "purple":
                purple_item_HTML = add_item_image_to_table(purple_item_HTML, item_name, item_id, rarity_class);
                break;
            case "misc":
                misc_item_HTML = add_item_image_to_table(misc_item_HTML, item_name, item_id, rarity_class);
                break;
            default:
                console.log(get_colored_message("Table Builder", "Unknown Item: " + highlight_code(item_name), message_status.WARNING));
                break;
        }
    }

    // DISPLAY ITEM TABLES
    document.getElementById("common-item-table").innerHTML = common_item_HTML;
    document.getElementById("copper-item-table").innerHTML = copper_item_HTML;
    document.getElementById("silver-item-table").innerHTML = silver_item_HTML;
    document.getElementById("gold-item-table").innerHTML = gold_item_HTML;
    document.getElementById("purple-item-table").innerHTML = purple_item_HTML;
    document.getElementById("misc-item-table").innerHTML = misc_item_HTML;

    if (item_table_ready === false) {
        item_table_ready = true;
        loadingToast();
    }

    function add_item_image_to_table(item_HTML, item_name, item_id, rarity_class) {
        item_HTML += "<div class=\"item-table-item_div\">";
        item_HTML += "<button id=\"item-table-button-" + item_id + "\" " +
            "class=\"item-table-item_button pointer-cursor\" " +
            "onclick=\"focus_on_item(" + "\'" + clean_apostrophes(item_name) + "\', \'" + item_id + "\')\">"+
            "<img id=\"" + item_id + "\" " +
            "class=\"item-table-item_button-img item-table-item notranslate" + ((focused_item_element_id === item_id) ? " focused-item" : "") + "\" " +
            "title=\"" + item_name + "\" " +
            "src=\"" + get_item_image_path(item_name.split(' ').join('_')) + "\" " +
            "alt=\"\">" +
            "</button><br>";

        let existing_value = -1;
        if (item_table_ready) {
            if (item_table_currently_selected_items_map.has(item_id)) {
                existing_value = item_table_currently_selected_items_map.get(item_id);
                item_table_currently_selected_items_map.delete(item_id);
            }
        }

        item_HTML += "<label for=\"" + item_id + "-amt\" hidden></label>" +
            "<input id=\"" + item_id + "-amt\" " +
            "class=\"notranslate item-table-item_input\" " +
            "type=\"number\" " +
            "min=\"0\" " +
            "max=\"" + ((rarity_class === "misc") ? 500 : 99) + "\" " +
            "value=\"" + ((existing_value > -1) ? existing_value : 0) + "\" " +
            "onchange=\"update_requested(this)\">";
        item_HTML += "</div>";

        return item_HTML;
    }
}

function clear_item_table()
{
    for (let [item_name, item_data_map] of equipment_map)
    {
        let item_id = item_data_map.get("id");
        document.getElementById(item_id + "-amt").value = 0;
    }
}