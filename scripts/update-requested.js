function update_requested()
{
    let requested_item_text = "";
    //let required_ingredients_text = "";

    /* READ AND ADD COMMON ITEMS TO TABLE STRING */
    let common_data = read_common();
    let commonEntryArray = common_data[0];
    let commonItemMap = common_data[1];

    for (let i = 0 ; i < commonEntryArray.length ; i++)
    {
        let item_name = commonEntryArray[i];

        if (i % 2 === 0)
        {
            requested_item_text += "<tr class=\"normalRow\">";
        }
        else
        {
            requested_item_text += "<tr class=\"alternateRow\">";
        }

        requested_item_text += item_name;
        requested_item_text += "</tr>";
    }

    /* READ AND ADD COPPER ITEMS TO TABLE STRING */
    let copper_data = read_copper();
    let copperEntryArray = copper_data[0];
    let copperItemMap = copper_data[1];

    for (let i = 0 ; i < copperEntryArray.length ; i++)
    {
        let item_name = copperEntryArray[i];

        if (i % 2 === 0)
        {
            requested_item_text += "<tr class=\"normalRow\">";
        }
        else
        {
            requested_item_text += "<tr class=\"alternateRow\">";
        }

        requested_item_text += item_name;
        requested_item_text += "</tr>";
    }



    /* GET RECIPES */
    let recipeArray = [];

    /* GET COMMON ITEM RECIPES */
    for (let [key, value] of commonItemMap)
    {
        recipeArray.push(get_recipe(key, value));
        console.log("put " + key + " into recipe array");
    }

    /* GET COPPER ITEM RECIPES */
    for (let [key, value] of copperItemMap)
    {
        recipeArray.push(get_recipe(key, value));
        console.log("put " + key + " into recipe array");
    }

    /* FIGURE OUT TOTAL INGREDIENTS */
    console.log("figure out total ingredients");
    figure_out_total_ingredients(recipeArray);

    /* UPDATE TEXT */
    document.getElementById("requested-items-table").innerHTML = requested_item_text;
}