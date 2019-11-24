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

/**
 * Validate and set inventory amount
 *
 * @param {string} fragment_name -
 * @param {number} amount - new amount to set, should be non-negative
 * @param {boolean} do_save - serialize the inventory into local storage, or not
 * @return {number} - actual amount set, guaranteed to be non-negative
 */
function inventory_set_fragment_amount(fragment_name, amount, do_save = true) {

    if (typeof(amount) !== "number") {
        amount = parseInt(amount, 10);
    }
    if (amount < 0) {
        amount = 0;
    }

    inventory.fragments[fragment_name] = amount;

    if (do_save) {
        inventory_save();
    }

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

/**
 * Remove specified fragments from the inventory
 *
 * @param {Map.<string, number>} items - fragment names and quantities to remove
 */
function inventory_remove(items) {
    for (let [name, amount] of items) {
        if (typeof(amount) !== "number") {
            amount = parseInt(amount, 10);
        }
        if (amount === 0) {
            continue;
        }

        let fragments = inventory_get_fragment_amount(name);
        inventory_set_fragment_amount(name, fragments - amount, false);
    }

    inventory_save();
}
