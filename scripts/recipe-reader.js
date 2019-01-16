function get_recipe(item_name, amount)
{
    console.log("getting recipe");
    // recipe = components
    let recipe = new Map();

    let required_pieces = get_equipment_data(item_name, "req_pieces");      // value
    let required_items = get_equipment_data(item_name, "req_items");        // array

    console.log("add frag count to recipe");
    // ADD FRAGMENT COUNT TO RECIPE
    recipe = add_items_to_recipe(recipe, item_name + " Fragment(s)", required_pieces * amount);

    console.log("check if other item recipes need stuff? ");
    if (required_items !== undefined)
    {
        // ADD OTHER ITEM RECIPES FROM required_items TO RECIPE
        for (let i = 0 ; i < required_items.length ; i++)
        {
            console.log("                                 okay reading other items now lol");
            console.log("                                 reading: " + required_items[i]);
            recipe = get_recipe_and_add_onto_existing(recipe, required_items[i], amount);
        }
    }


    console.log("------------------------------return recipe for " + item_name);
    return recipe;
}

function get_recipe_and_add_onto_existing(recipe, item_name, amount)
{
    console.log("getting recipe");
    // recipe = components
    let recipe_existing = recipe;

    let required_pieces = get_equipment_data(item_name, "req_pieces");      // value
    let required_items = get_equipment_data(item_name, "req_items");        // array

    // ADD FRAGMENT COUNT TO RECIPE
    recipe_existing = add_items_to_recipe(recipe_existing, item_name + " Fragment(s)", required_pieces * amount);

    // ADD OTHER ITEM RECIPES FROM required_items TO RECIPE
    if (required_items !== undefined)
    {
        // ADD OTHER ITEM RECIPES FROM required_items TO RECIPE
        for (let i = 0 ; i < required_items.length ; i++)
        {
            console.log("                                 okay reading other items now lol");
            console.log("                                 reading: " + required_items[i]);
            recipe = get_recipe_and_add_onto_existing(recipe, required_items[i], amount);
        }
    }

    return recipe_existing;
}

function read_map(map)
{
    console.log("im in read map");
    let string = "";
    for (let [key, value] of map)
    {
        string += "x" + value + " - " + key + "\n";
    }

    console.log("setting string now");
    document.getElementById("required-ingredients").innerHTML = string;
}

function add_items_to_recipe(recipe, recipe_comp, amount)
{
    if (recipe.has(recipe_comp))
    {
        console.log(recipe_comp + " exists");
        // RECIPE COMPONENT EXISTS, ADD AMOUNT
        recipe.set(recipe_comp, recipe.get(recipe_comp) + amount);
        console.log(recipe.get(recipe_comp) + " = new amount");
    }
    else
    {
        console.log(recipe_comp + " does not exist in the recipe yet, add new");
        // RECIPE COMPONENT DOESNT EXIST, CREATE NEW ENTRY
        recipe.set(recipe_comp, amount);
    }

    return recipe;
}

function figure_out_total_ingredients(all_recipe_maps_array)
{
    console.log("im in");
    let total_recipe = new Map();

    console.log("iterate");
    // ITERATE THROUGH ALL RECIPES IN ARRAY
    for (let i = 0 ; i < all_recipe_maps_array.length ; i++)
    {
        console.log("iterate recipe " + i);
        // ITERATE THROUGH INDIVIDUAL RECIPE COMPONENTS
        for (let [comp_name, comp_amt] of all_recipe_maps_array[i])
        {
            console.log("looking at component " + comp_name);
            if (total_recipe.has(comp_name))
            {
                console.log("comp exists, add onto stuff");
                total_recipe.set(comp_name, total_recipe.get(comp_name) + comp_amt);
            }
            else
            {
                console.log("component doesnt exist, add new");
                total_recipe.set(comp_name, comp_amt);
            }
        }
    }

    console.log("readinr map now");

    console.log("sort!");
    total_recipe[Symbol.iterator] = function* () {
        yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
    };

    /*
    for (let [key, value] of total_recipe) {     // get data sorted
        console.log(key + ' ' + value);
    }
    console.log([...total_recipe]);
    */

    let string = "";
    for (let [key, value] of total_recipe)
    {
        console.log("iteratint through read map");
        string += "x" + value + " - " + key + "\n";
    }

    console.log("setting string now");
    document.getElementById("required-ingredients").innerHTML = string;

    //return total_recipe;
}