console.log("[Equipment Reader] - Reading 'data/equipment_data.json'...");
let equipment_map = new Map();

let run = $(function () {
    $.ajax({
        'global': false,
        'url': "data/equipment_data.json",
        'dataType': "json",
        'success': function (data) {
            $.each(data, function(i, itemData)
            {
                let item_data = new Map();

                item_data.set("name", itemData.name);
                item_data.set("id", itemData.id);
                item_data.set("has_fragments", itemData.has_fragments);
                item_data.set("req_pieces", itemData.req_pieces);
                item_data.set("req_items", itemData.req_items);

                equipment_map.set(itemData.name, item_data);
            });
        }
    });
});

function get_equipment_data(item_name, key)
{
    if (equipment_map.has(item_name))
    {
        return equipment_map.get(item_name).get(key);
    }
    else
    {
        console.log(item_name + " is not found.");
    }
}