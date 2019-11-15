let item_table_retry_count = 0;
let item_table_ready = false;
let item_table_failed = false;
let item_table_currently_selected_items_map = new Map();

function build_item_tables()
{
    const amt_of_item_tables = 6;
    let item_table_count = document.getElementsByClassName("itemTable");

    if (item_table_count.length < amt_of_item_tables)
    {
        if (item_table_retry_count <= 100)
        {
            console.log(get_colored_message("Table Builder", color_text("Less than ", message_status.WARNING) + highlight_code(amt_of_item_tables) + color_text(" elements detected... Page must not be done loading yet.\n\t", message_status.WARNING) +
                color_text("Will pause for .5s and restart.\n\t", message_status.WARNING) +
                color_text("Current Retry: ", message_status.INFO) + highlight_code(item_table_retry_count + "/100")));
            setTimeout(function () {
                item_table_retry_count++;
                build_item_tables();
            }, 500);
            return;
        }
        else
        {
            console.log(get_colored_message("Table Builder", "100 retries have been performed. Abandoning task!", message_status.WARNING));
            item_table_failed = true;
            loadingToast();
            return;
        }
    }

    let previous_item_element_ids = new Map();

    if (item_table_ready)
    {
        // COLLECT INFORMATION OF ALL CURRENT ITEM TABLE ITEMS (HAS "item-table-item" CLASS)
        let collection_of_item_table_items = document.getElementsByClassName("item-table-item");
        for (let i = 0 ; i < collection_of_item_table_items.length ; i++)
        {
            // {item_name, item-id-amt (REDIRECTS TO INPUT ELEMENT)}
            previous_item_element_ids.set(collection_of_item_table_items[i].title, collection_of_item_table_items[i].id);
        }

        let browsed_items = [];
        // GO THROUGH ALL ITEMS AND SAVE VALUES IN A MAP
        for (let [item_name, item_data_map] of equipment_map)
        {
            let item_id = item_data_map.get("id");

            if (document.getElementById(item_id))
            {
                if (item_name !== document.getElementById(item_id).title)
                {
                    // THE OLD EQUIPMENT DATA HAS INFORMATION ABOUT THIS ITEM
                    if (previous_item_element_ids.has(item_name))
                    {
                        let selected_amt = document.getElementById(previous_item_element_ids.get(item_data_map.get("name")) + "-amt").value;

                        // IF THE ITEM HAS A VALUE GREATER THAN 1 SELECTED, ADD ITEM AND VALUE TO PROJECT ITEM DATA
                        if (selected_amt >= 1)
                        {
                            item_table_currently_selected_items_map.set(item_id, selected_amt);
                        }
                    }

                    // ADD ITEM TO BROWSED
                    browsed_items.push(document.getElementById(item_id).title);
                }
                else
                {
                    // ELEMENT ID EXISTS
                    if (document.getElementById(item_id + "-amt"))
                    {
                        // SAVE VALUE
                        let selected_amt = document.getElementById(item_id + "-amt").value;

                        // IF THE ITEM HAS A VALUE GREATER THAN 1 SELECTED, ADD ITEM AND VALUE TO PROJECT ITEM DATA
                        if (selected_amt >= 1)
                        {
                            item_table_currently_selected_items_map.set(item_id, selected_amt);
                        }
                    }
                }
            }
            else
            {
                if (browsed_items.includes(item_name))
                {
                    let selected_amt = document.getElementById(previous_item_element_ids.get(item_name) + "-amt").value;

                    // IF THE ITEM HAS A VALUE GREATER THAN 1 SELECTED, ADD ITEM AND VALUE TO PROJECT ITEM DATA
                    if (selected_amt >= 1)
                    {
                        item_table_currently_selected_items_map.set(item_id, selected_amt);
                    }
                }
            }
        }
    }

    // ITEM COUNTER VARIABLES
    let common_count = 0;
    let copper_count = 0;
    let silver_count = 0;
    let gold_count = 0;
    let purple_count = 0;
    let misc_count = 0;

    // HTML STRING VARIABLES
    let common_item_HTML = "";
    let copper_item_HTML = "";
    let silver_item_HTML = "";
    let gold_item_HTML = "";
    let purple_item_HTML = "";
    let misc_item_HTML = "";

    // TABLE BODY HEADERS
    common_item_HTML += "<tbody>";
    copper_item_HTML += "<tbody>";
    silver_item_HTML += "<tbody>";
    gold_item_HTML += "<tbody>";
    purple_item_HTML += "<tbody>";
    misc_item_HTML += "<tbody>";

    // TABLE BODY CONTENT
    for (let [item_name, item_data_map] of equipment_map)
    {
        let item_id = item_data_map.get("id");
        let rarity_class = item_id.substring(0, item_id.indexOf('-'));

        switch (rarity_class)
        {
            case "common":

                common_item_HTML = add_item_image_to_table(common_count, common_item_HTML, item_name, item_id, rarity_class);
                common_count++;

                break;
            case "copper":

                copper_item_HTML = add_item_image_to_table(copper_count, copper_item_HTML, item_name, item_id, rarity_class);
                copper_count++;

                break;
            case "silver":

                silver_item_HTML = add_item_image_to_table(silver_count, silver_item_HTML, item_name, item_id, rarity_class);
                silver_count++;

                break;
            case "gold":

                gold_item_HTML = add_item_image_to_table(gold_count, gold_item_HTML, item_name, item_id, rarity_class);
                gold_count++;

                break;
            case "purple":

                purple_item_HTML = add_item_image_to_table(purple_count, purple_item_HTML, item_name, item_id, rarity_class);
                purple_count++;

                break;

            case "misc":
                misc_item_HTML = add_item_image_to_table(misc_count, misc_item_HTML, item_name, item_id, rarity_class);
                misc_count++;

                break;

            default:
                console.log(get_colored_message("Table Builder", "Unknown Item: " + highlight_code(item_name), message_status.WARNING));
                break;
        }
    }

    // TABLE CLOSER
    common_item_HTML = close_item_table(common_count, common_item_HTML, "common");
    copper_item_HTML = close_item_table(copper_count, copper_item_HTML, "copper");
    silver_item_HTML = close_item_table(silver_count, silver_item_HTML, "silver");
    gold_item_HTML = close_item_table(gold_count, gold_item_HTML, "gold");
    purple_item_HTML = close_item_table(purple_count, purple_item_HTML, "purple");
    misc_item_HTML = close_item_table(misc_count, misc_item_HTML, "misc");

    // DISPLAY ITEM TABLES
    document.getElementById("common-item-table").innerHTML = common_item_HTML;
    document.getElementById("copper-item-table").innerHTML = copper_item_HTML;
    document.getElementById("silver-item-table").innerHTML = silver_item_HTML;
    document.getElementById("gold-item-table").innerHTML = gold_item_HTML;
    document.getElementById("purple-item-table").innerHTML = purple_item_HTML;
    document.getElementById("misc-item-table").innerHTML = misc_item_HTML;

    if (item_table_ready === false)
    {
        item_table_ready = true;
        //console.log(get_colored_message("Table Builder", "Item tables have been built.", message_status.INFO));
        loadingToast();
    }
}

function add_item_image_to_table(count, item_HTML, item_name, item_id, rarity_class)
{
    // ADD TABLE ROW START IF FIRST ITEM
    if (count === 0)
    {
        item_HTML += "<tr>";
    }

    // CLOSE TABLE ROW AND START NEW IF item_amount_per_row HAS BEEN REACHED.
    // ALSO BUILD NUMBER INPUTS
    if (count % item_amount_per_row === 0 && count !== 0)
    {
        // CLOSE TABLE ROW (THE TABLE ROW W/ ITEM IMAGES)
        item_HTML += "</tr>";

        // BUILD NUMBER INPUTS
        item_HTML += "<tr>";
        for (let i = count - item_amount_per_row ; i < count ; i++)
        {
            let existing_value = -1;
            if (item_table_ready)
            {
                if (item_table_currently_selected_items_map.has(rarity_class + "-" + (i+1)))
                {
                    existing_value = item_table_currently_selected_items_map.get(rarity_class + "-" + (i+1));
                    item_table_currently_selected_items_map.delete(rarity_class + "-" + (i+1));
                }
            }

            item_HTML += "<th class=\"item-amt\">";
            item_HTML += "<label for=\"" + rarity_class + "-" + (i + 1) + "-amt\"></label>";
            item_HTML += "<input id=\"" + rarity_class + "-" + (i + 1) + "-amt\" " +
                "class=\"item-input notranslate\" " +
                "type=\"number\" " +
                "min=\"0\" " +
                "max=\"" + ((rarity_class === "misc") ? 500 : 99) + "\" " +
                "value=\"" + ((existing_value > -1) ? existing_value : 0) + "\" " +
                "onchange=\"update_requested(this)\">";
            item_HTML += "</th>";
        }
        item_HTML += "</tr>";

        // APPLY SPACING
        item_HTML += "<tr class=\"spacing\"></tr>";

        // BEGIN NEW ITEM IMAGE ROW
        item_HTML += "<tr>";
    }

    // INSERT ITEM IMAGE
    item_HTML += "<th class=\"item-image\">";
    item_HTML += "<button id=\"item-table-button-" + item_id + "\" class=\"ingredient-button pointer-cursor\" " + "onclick=\"focus_on_item(" + "\'" + clean_apostrophes(item_name) + "\', \'" + item_id + "\')\">";
    item_HTML += "<img id=\"" + item_id + "\" " +
        "class=\"item-image notranslate item-table-item" + ((focused_item_element_id === item_id) ? " focused-item" : "") + "\" " +
        "title=\"" + item_name + "\" " +
        "src=\"" + get_item_image_path(item_name.split(' ').join('_')) + "\" " +
        "alt=\"\">";
    item_HTML += "</button>";

    return item_HTML;
}

function close_item_table(count, item_HTML, rarity_class)
{
    // CLOSE ITEM IMAGE ROW
    item_HTML += "</tr>";

    // FIGURE OUT AMOUNT OF ITEM INPUTS NEEDED FOR THE LEFTOVER ITEMS
    let amt_of_items_leftover = count % item_amount_per_row;
    if (amt_of_items_leftover === 0)
    {
        amt_of_items_leftover = item_amount_per_row;
    }

    // BUILD NUMBER INPUTS
    item_HTML += "<tr>";
    for (let i = count - amt_of_items_leftover ; i < count ; i++)
    {
        let existing_value = -1;
        if (item_table_ready)
        {
            if (item_table_currently_selected_items_map.has(rarity_class + "-" + (i+1)))
            {
                existing_value = item_table_currently_selected_items_map.get(rarity_class + "-" + (i+1));
                item_table_currently_selected_items_map.delete(rarity_class + "-" + (i+1));
            }
        }

        item_HTML += "<th class=\"item-amt\">";
        item_HTML += "<label for=\"" + rarity_class + "-" + (i + 1) + "-amt\"></label>";
        item_HTML += "<input id=\"" + rarity_class + "-" + (i + 1) + "-amt\" " +
            "class=\"item-input notranslate\" " +
            "type=\"number\" " +
            "min=\"0\" " +
            "max=\"" + ((rarity_class === "misc") ? 500 : 99) + "\" " +
            "value=\"" + ((existing_value > -1) ? existing_value : 0) + "\" " +
            "onchange=\"update_requested(this)\">";
        item_HTML += "</th>";
    }
    item_HTML += "</tr>";

    // APPLY SPACING
    item_HTML += "<tr class=\"spacing\"></tr>";

    // END TABLE BODY
    item_HTML += "</tbody>";

    return item_HTML;
}

function clear_item_table()
{
    for (let [item_name, item_data_map] of equipment_map)
    {
        let item_id = item_data_map.get("id");
        document.getElementById(item_id + "-amt").value = 0;
    }
}