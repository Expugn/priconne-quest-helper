let inventory = {};
// inventory = {
//   "fragments": {
//     "Killer Pencil": 1,
//   }
// }

function init_inventory()
{
    inventory_load()
}

function inventory_load()
{
    if (typeof(Storage) !== "undefined")
    {
        let inventory_json = localStorage.getItem('inventory');
        if (inventory_json !== null) {
            inventory = JSON.parse(inventory_json);
        }
    }
    if (inventory.fragments === undefined) {
        inventory.fragments = {};
    }
}

function inventory_save()
{
    if (typeof(Storage) !== "undefined")
    {
        localStorage.setItem('inventory', JSON.stringify(inventory));
    }
}

// fragment_name - en name like in quest_data and character_data
function inventory_get_fragment_amount(fragment_name) {
    let fragments = inventory.fragments[fragment_name];

    if (fragments !== undefined) {
        return fragments;
    } else {
        return 0;
    }
}

// amount - integer
function inventory_set_fragment_amount(fragment_name, amount) {

    if (typeof(amount) !== "number") {
        amount = parseInt(amount, 10);
    }
    if (amount < 0) {
        amount = 0;
    }

    inventory.fragments[fragment_name] = amount;

    inventory_save();

    return amount;
}

// Check if there are at least as many fragments in the inventory as specified
// return bool
function inventory_check_fragment_amount(fragment_name, amount) {
    let inv_frag_amount = inventory_get_fragment_amount(fragment_name);
    if (inv_frag_amount >= amount) {
        return true;
    } else {
        return false;
    }
}
