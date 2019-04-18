function build_requested_item_table(requested_items_map)
{
    let table_html = "";
    let item_counter = 0;

    table_html += "<tbody>";

    if (requested_items_map.size > 0)
    {
        for (let [item, value] of requested_items_map)
        {
            // add table row start if first item
            if (item_counter === 0)
            {
                table_html += "<tr>";
            }

            // close table row and start new if 7 items have been made
            if (item_counter % 7 === 0 && item_counter !== 0)
            {
                table_html += "</tr>";

                table_html += "<tr>";
            }

            // IMAGE
            table_html += "<th class=\"requested-item-image\">";
            table_html += "<img class=\"requested-item-image\" title=\"" + item
                + "\" src=\"" + get_item_image_path(item.split(' ').join('_')) + "\" alt=\"\">";
            table_html += "<div class=\"requested-item-text\">\u00D7" + value + "</div>";
            table_html += "</th>";

            item_counter++;
        }
        // close table row
        table_html += "</tr>";
        table_html += "<tr class=\"spacing\"></tr>";
    }
    table_html += "</body>";

    document.getElementById("requested-item-table").innerHTML = table_html;
}