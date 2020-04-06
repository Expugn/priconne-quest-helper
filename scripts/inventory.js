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

    if (amount > 0) {
        amount = (amount > inventory_status.MAX_ITEM_AMOUNT ? inventory_status.MAX_ITEM_AMOUNT : amount);
        inventory.fragments[fragment_name] = amount;
    }
    else {
        delete inventory.fragments[fragment_name];
    }

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
        let set_amount = fragments - amount;

        // DELETE INVENTORY ENTRY IF AMOUNT IS LESS THAN OR EQUAL TO 0
        if (set_amount <= 0) {
            inventory_delete_fragment(name);
        }
        else {
            inventory_set_fragment_amount(name, set_amount, false);
        }
    }

    inventory_save();
}

function inventory_delete_fragment(fragment_name) {
    delete inventory.fragments[fragment_name];
    inventory_save();
}

function inventory_delete_all() {
    inventory.fragments = {};
    inventory_save();
}

/* ===================================================================================================================*/

const inventory_mode = Object.freeze({
    LIST: 'inventory_toolbar-button_list',
    ADD: 'inventory_toolbar-button_add',
    REMOVE: 'inventory_toolbar-button_remove',
    DELETE: 'inventory_toolbar-button_delete',
});
let inventory_status = {
    MODE: inventory_mode.LIST,
    EDITING: "",
    IS_CATALOG_BUILT: false,
    CATALOG_SELECTED: "",
    MAX_ITEM_AMOUNT: 9999,
    SAVED_IGNORED_RARITIES: null,
    UNSAVED_CHANGES: false,
    INLINE_EDITOR_START_AMOUNT: 0,
};

function toggle_inventory_modal() {
    document.getElementById("inventory_modal").hidden = (!document.getElementById("inventory_modal").hidden);
    document.body.style.overflow = (!document.getElementById("inventory_modal").hidden ? "hidden" : "");

    if (!document.getElementById("inventory_modal").hidden) {
        // BUILD INVENTORY LIST AND CATALOG DISPLAY
        build_inventory_list();
        build_inventory_catalog();

        // SAVE IGNORED RARITIES (NEEDED TO GET ALL ITEMS FROM get_recipe())
        inventory_status.SAVED_IGNORED_RARITIES = ignored_rarities;
        ignored_rarities = [];

        // MARK UNSAVED CHANGES
        inventory_status.UNSAVED_CHANGES = false;

        // TOGGLE EVENT LISTENER
        setTimeout(function () {
            // TURN ON EVENT LISTENER TO CHECK IF THE USER IS CLICKING OUTSIDE THE INVENTORY MODAL WHEN ACTIVE
            $(window).on("click", function (e) {
                // EDITING WAS IN PROGRESS BUT USER CLICKED AWAY FROM THE ELEMENT'S DIV
                // CLOSE AND SAVE CURRENT DATA
                if (inventory_status.EDITING !== "" && !e.target.id.includes(inventory_status.EDITING)) {
                    onClick_inventory_item("", null);
                }
                // USER CLICKED OUTSIDE OF INVENTORY MODAL
                // CLOSE OUT OF INVENTORY MODAL
                else if (e.target.id === "inventory_modal" || e.target.id.includes("inventory_modal_close-button")) {
                    toggle_inventory_modal();
                }
            });
        }, 1);
    }
    else {
        // RESTORE IGNORED RARITIES
        ignored_rarities = inventory_status.SAVED_IGNORED_RARITIES;
        inventory_status.SAVED_IGNORED_RARITIES = null;

        // CHANGES WERE MADE:
        if (inventory_status.UNSAVED_CHANGES) {
            // REFRESH REQUIRED INGREDIENTS AND RECOMMENDED QUESTS
            build_data();

            // REFRESH SAVED PROJECTS LIST TO CHECK FOR COMPLETED PROJECTS
            update_saved_projects_select();
            disable_complete_project_button(completed_projects.includes(document.getElementById("saved-projects-select").value));
        }

        // DISABLE EVENT LISTENER
        $(window).off("click");
    }
}

function onClick_inventory_item(element_id, event) {
    // INVENTORY LIST MODE: CLICKING ON AN ITEM WILL ALLOW YOU TO MODIFY THE AMOUNT YOU HAVE
    if (inventory_status.MODE === inventory_mode.LIST) {
        if (element_id === "" && inventory_status.EDITING !== "") {
            // SAVE CURRENT EDIT FOCUS AND CLOSE
            document.getElementById(inventory_status.EDITING + "-input").hidden = true;
            save_item_changes(inventory_status.EDITING);
            inventory_status.EDITING = "";
        }
        else if (!event.target.id.includes("-input")) {
            document.getElementById(element_id + "-input").hidden = !document.getElementById(element_id + "-input").hidden;
            if (!document.getElementById(element_id + "-input").hidden) {
                document.getElementById(element_id + "-input").value = document.getElementById(element_id + "-amount").innerText;
                document.getElementById(element_id + "-input").focus();
                document.getElementById(element_id + "-input").select();
                document.getElementById(element_id + "-amount").style.visibility = "hidden";
                document.getElementById(element_id + "-img").classList.toggle("grow");
            }
            else {
                save_item_changes(element_id);
            }

            // HIDE CURRENT ACTIVE ELEMENT
            if (inventory_status.EDITING !== element_id && inventory_status.EDITING !== "") {
                document.getElementById(inventory_status.EDITING + "-input").hidden = true;
                save_item_changes(inventory_status.EDITING);
            }

            // SET NEW CURRENT EDIT STATUS
            if (inventory_status.EDITING === element_id) {
                inventory_status.EDITING = "";
            }
            else {
                inventory_status.EDITING = element_id;
            }
        }
    }
    // INVENTORY REMOVE MODE: CLICKING ON AN ITEM WILL DELETE IT
    else if (inventory_status.MODE === inventory_mode.REMOVE) {
        const frag_name = document.getElementById(element_id + "-img").title;
        inventory_delete_fragment(frag_name);
        build_inventory_list();
        inventory_status.UNSAVED_CHANGES = true;
    }


    function save_item_changes(element_id) {
        const prev_amount = parseInt(document.getElementById(element_id + "-amount").innerText);
        // SET VALID AMOUNT
        let amount = parseInt(document.getElementById(element_id + "-input").value);
        amount = (amount > inventory_status.MAX_ITEM_AMOUNT ? inventory_status.MAX_ITEM_AMOUNT : amount);   // CHECK IF AMOUNT > MAX ITEM AMOUNT
        amount = (amount < 0 ? 0 : amount);                                                                 // CHECK IF AMOUNT < ZERO
        amount = (isNaN(amount) ? 0 : amount);                                                              // CHECK IF AMOUNT == NaN
        amount = Math.round(amount);                                                                        // ROUND AMOUNT SO NO DECIMALS
        document.getElementById(element_id + "-amount").innerText = amount.toString();

        // SET ELEMENT BACK TO ORIGINAL STATE
        document.getElementById(element_id + "-amount").style.visibility = null;
        document.getElementById(element_id + "-img").classList.toggle("grow");

        // SAVE NEW AMOUNT TO INVENTORY OR DELETE IF <= 0
        const frag_name = document.getElementById(element_id + "-img").title;
        if (amount <= 0) {
            inventory_delete_fragment(frag_name);
            build_inventory_list();
        }
        else {
            inventory_set_fragment_amount(frag_name, amount);
        }

        // NOTE IF ANY CHANGES WERE MADE
        if (prev_amount !== amount) {
            inventory_status.UNSAVED_CHANGES = true;
        }
    }
}
function onClick_inventory_catalog_item(item_name) {
    item_name = item_name.replace("{apos}", "'");

    inventory_setup_add_prompt(item_name);

    document.getElementById("inventory_catalog-add-prompt").hidden = false;
    document.getElementById("inventory_catalog").hidden = true;

    document.getElementById("inventory_toolbar-button_list").disabled = true;
    document.getElementById("inventory_toolbar-button_add").disabled = true;
    document.getElementById("inventory_toolbar-button_remove").disabled = true;

    document.getElementById("inventory_catalog_input").select();
    document.getElementById("inventory_catalog_input").focus();
}
function write_inventory_item_html(element_id, item_name, item_amount) {
    return "<div id='" + element_id + "' class='inventory_item' onclick='onClick_inventory_item(\"" + element_id + "\", event)'>" +
        "<img id='" + element_id + "-img' class='inventory_item-img' title=\"" + item_name + "\" src=\"" + get_item_image_path(item_name.split(' ').join('_')) + "\" alt=''>" +
        "<img id='" + element_id + "-delete' class='inventory_item-delete-img' src='" + get_webpage_image_path("red_x") + "' alt=''>" +
        "<div id='" + element_id + "-amount' class='inventory_item-text'>" + item_amount + "</div>" +
        "<input id='" + element_id + "-input' class='inventory_item-input' type='number' hidden>" +
        "</div>";
}

function build_inventory_list() {
    let html = "";
    if ((Object.keys(inventory.fragments).length) > 0) {
        let counter = 0;
        Object.keys(inventory.fragments).forEach(function (frag_name) {
            html += write_inventory_item_html("inventory_item-" + (counter++), frag_name, inventory_get_fragment_amount(frag_name));
        });
    }
    else {
        // DISPLAY EMPTY INVENTORY TEXT
        html += "<div style='font-style: italic; font-weight: bold; padding: 30px 0; -webkit-filter: opacity(30%); filter: opacity(30%);'><span translate_text='inventory.inventory_empty'>" + ((current_language === language.ENGLISH) ? "The inventory is empty..." : language_json['inventory']['inventory_empty']) + "</span></div>";
    }

    document.getElementById("inventory_content_list").innerHTML = html;
}

function inventory_switch_mode(target_mode) {
    if (target_mode !== inventory_status.MODE) {
        // SAVE AND CLOSE FOCUSED EDITED ITEM IF POSSIBLE
        if (inventory_status.MODE === inventory_mode.LIST && inventory_status.EDITING !== "") {
            onClick_inventory_item("", null);
        }
        if (inventory_status.MODE === inventory_mode.REMOVE) {
            document.getElementById("inventory_content_list").classList.remove("remove");
        }
        if (inventory_status.MODE === inventory_mode.ADD) {
            document.getElementById("inventory_content_list").hidden = false;
            document.getElementById("inventory_catalog").hidden = true;
        }

        document.getElementById(inventory_mode.LIST).classList.remove("is-open");
        document.getElementById(inventory_mode.ADD).classList.remove("is-open");
        document.getElementById(inventory_mode.REMOVE).classList.remove("is-open");
        document.getElementById(inventory_mode.DELETE).classList.remove("is-open");

        document.getElementById(target_mode).classList.add("is-open");
        if (target_mode === inventory_mode.REMOVE) {
            document.getElementById(inventory_mode.DELETE).classList.add("is-open");
            document.getElementById("inventory_content_list").classList.add("remove");
        }
        if (target_mode === inventory_mode.ADD) {
            document.getElementById("inventory_content_list").hidden = true;
            document.getElementById("inventory_catalog").hidden = false;
        }

        inventory_status.MODE = target_mode;
    }
}

function inventory_delete_all_button() {
    inventory_delete_all();
    build_inventory_list();
    inventory_status.UNSAVED_CHANGES = true;
}

function build_inventory_catalog() {
    if (!inventory_status.IS_CATALOG_BUILT) {
        let html = "";
        let misc_html = "<br><hr>";

        let current_rarity = "common";
        for (let [item_name, item_data_map] of equipment_map) {
            const item_rarity = item_data_map.get("id").split('-')[0];
            const item_image = get_item_image_path(item_name.split(' ').join('_'));

            // REPOSITION MEMORY PIECES TO THE BOTTOM
            if (item_rarity === "misc") {
                misc_html += "<img class='inventory_catalog-item' src=\"" + item_image + "\" alt='' onclick='onClick_inventory_catalog_item(\"" + item_name.replace("'", "{apos}") + "\")'>";
                continue;
            }

            // ADD NEW LINE IF NEW RARITY TYPE IS FOUND
            if (current_rarity !== item_rarity) {
                html += "<br><hr>";
                current_rarity = item_rarity
            }

            html += "<img class='inventory_catalog-item' src=\"" + item_image + "\" alt='' onclick='onClick_inventory_catalog_item(\"" + item_name.replace("'", "{apos}") + "\")'>";
        }

        document.getElementById("inventory_catalog").innerHTML = html + misc_html;
        inventory_status.IS_CATALOG_BUILT = true;
    }
}

function inventory_setup_add_prompt(item_name) {
    const options = document.getElementById("inventory_add-prompt_options");
    const add_fragment = document.getElementById("inventory_catalog_add-fragment");
    const add_equipment = document.getElementById("inventory_catalog_add-equipment");
    const fragment_main_img = document.getElementById("inventory_add-fragment_main");
    const equipment_main_img = document.getElementById("inventory_add-equipment_main");
    const equipment_sub_items = document.getElementById("inventory_catalog_add-equipment_sub-items");
    const fragment_option = document.getElementById("inventory_add-prompt_fragment-option");
    const equipment_option = document.getElementById("inventory_add-prompt_equipment-option");
    const input = document.getElementById("inventory_catalog_input");

    const item_image = get_item_image_path(item_name.split(' ').join('_'));
    const fragment_image = get_item_image_path(item_name.split(' ').join('_') + "_Fragment");

    // SETUP FRAGMENT OR EQUIPMENT OPTIONS
    const has_fragments = get_equipment_data(item_name, "has_fragments");
    const req_items = get_equipment_data(item_name, "req_items");
    if (!has_fragments && req_items.length === 0) {
        // ITEM HAS NO FRAGMENTS NOR REQUIRED ITEMS
        options.hidden = true;
        add_fragment.hidden = false;
        add_equipment.hidden = true;
        fragment_main_img.src = item_image;
    }
    else if (!has_fragments && req_items.length > 0) {
        // ITEM HAS NO FRAGMENTS BUT HAS REQUIRED ITEMS
        options.hidden = true;
        add_fragment.hidden = true;
        add_equipment.hidden = false;
        equipment_main_img.src = item_image;
        equipment_sub_items.innerHTML = build_sub_item_html(req_items, null);
    }
    else {
        options.hidden = false;
        add_fragment.hidden = false;
        add_equipment.hidden = true;
        fragment_main_img.src = fragment_image;
        equipment_main_img.src = item_image;
        fragment_option.src = fragment_image;
        equipment_option.src = item_image;
        equipment_sub_items.innerHTML = build_sub_item_html(req_items, fragment_image, get_equipment_data(item_name, "req_pieces"));
    }

    // RESET VALUES IF POSSIBLE
    input.value = 1;
    if (add_equipment.hidden) {
        fragment_option.classList.remove("low-opacity");
        equipment_option.classList.add("low-opacity");
    }
    else {
        fragment_option.classList.add("low-opacity");
        equipment_option.classList.remove("low-opacity");
    }
    inventory_status.CATALOG_SELECTED = item_name;


    function build_sub_item_html(req_items, fragment_img, fragment_amt) {
        let html = "";
        if (fragment_img !== null) {
            html += "<div style='display: inline-block;'>" +
                "<img src=\"" + fragment_img + "\" alt=''><div class='item-amount' style='font-weight: bold; margin-top: -19px; position: relative; right: 4px; bottom: 3px;'>\u00D7" + (fragment_amt !== null ? fragment_amt : 0) + "</div></div>"
        }
        for (let i = 0 ; i < req_items.length ; i++) {
            html += "<img src=\"" + get_item_image_path(req_items[i].split(' ').join('_')) + "\" alt=''>";
        }
        return html;
    }
}

function inventory_catalog_add_option_toggle(element) {
    const show_fragment = element.id === "inventory_add-prompt_fragment-option";

    document.getElementById("inventory_catalog_add-fragment").hidden = !show_fragment;
    document.getElementById("inventory_catalog_add-equipment").hidden = show_fragment;

    document.getElementById("inventory_add-prompt_fragment-option").classList.toggle("low-opacity");
    document.getElementById("inventory_add-prompt_equipment-option").classList.toggle("low-opacity");

    document.getElementById("inventory_catalog_input").select();
    document.getElementById("inventory_catalog_input").focus();
}

function inventory_cancel_catalog_add() {
    document.getElementById("inventory_catalog-add-prompt").hidden = true;
    document.getElementById("inventory_catalog").hidden = false;

    document.getElementById("inventory_toolbar-button_list").disabled = false;
    document.getElementById("inventory_toolbar-button_add").disabled = false;
    document.getElementById("inventory_toolbar-button_remove").disabled = false;

    inventory_status.CATALOG_SELECTED = "";
}

function inventory_catalog_add() {
    const add_fragments = !document.getElementById("inventory_add-prompt_fragment-option").classList.contains("low-opacity");
    let item_amount = document.getElementById("inventory_catalog_input").value;
    item_amount = (item_amount > inventory_status.MAX_ITEM_AMOUNT) ? inventory_status.MAX_ITEM_AMOUNT : item_amount;
    item_amount = (item_amount < 0) ? Math.abs(item_amount) : item_amount;
    item_amount = (isNaN(item_amount)) ? 0 : item_amount;
    item_amount = Math.round(item_amount);

    if (item_amount > 0) {
        let recipe = new Map();
        // GET RECIPE DATA
        if (!add_fragments) {
            recipe = get_recipe(inventory_status.CATALOG_SELECTED, item_amount);
        }
        else {
            recipe.set(inventory_status.CATALOG_SELECTED + (get_equipment_data(inventory_status.CATALOG_SELECTED, "has_fragments") ? " Fragment" : ""), item_amount);
        }

        // ADD ITEMS FROM RECIPE TO INVENTORY
        recipe.forEach(function (item_a, item_n) {
            if (inventory.fragments[item_n] !== undefined) {
                const add_amount = inventory_get_fragment_amount(item_n) + item_a;
                inventory_set_fragment_amount(item_n, ((add_amount > inventory_status.MAX_ITEM_AMOUNT) ? inventory_status.MAX_ITEM_AMOUNT : add_amount), false);
            }
            else {
                inventory_set_fragment_amount(item_n, ((item_a > inventory_status.MAX_ITEM_AMOUNT) ? inventory_status.MAX_ITEM_AMOUNT : item_a), false);
            }
        });
        if (recipe.size > 0) {
            inventory_save();
        }

        // UPDATE INVENTORY LIST
        build_inventory_list();

        // MARK UNSAVED CHANGES
        inventory_status.UNSAVED_CHANGES = true;
    }

    // REVERT BACK TO NORMAL
    inventory_cancel_catalog_add();
}

function apply_inventory_to_total_recipe(total_recipe, delete_item_if_zero = false, keep_old_amount = false, set_old_amount_as_negative = false) {
    // delete_item_if_zero: IF TRUE, DELETE THE ITEM FROM THE TOTAL INVENTORY IF THE AMOUNT === 0
    // keep_old_amount: IF TRUE, THE ORIGINAL AMOUNT WILL PERSIST, OTHERWISE THE AMOUNT WILL BE SET TO (AMOUNT - INVENTORY_AMOUNT)
    // set_old_amount_as_negative: IF (AMOUNT - INVENTORY_AMOUNT) <= 0, THEN SET IT AS -amount INSTEAD OF 0
    if (Object.keys(inventory.fragments).length > 0 && total_recipe.size > 0) {
        for (let [frag_name, amount] of total_recipe) {
            // APPLY INVENTORY AMOUNT TO REQUIRED AMOUNT
            const inventory_amount = inventory_get_fragment_amount(frag_name);
            total_recipe.set(frag_name, (amount - inventory_amount <= 0) ? (set_old_amount_as_negative ? -amount : 0) : (keep_old_amount ? amount : amount - inventory_amount));

            // DELETE ITEM IF AMOUNT == 0 AND delete_item_if_zero == true
            if (delete_item_if_zero && total_recipe.get(frag_name) === 0) {
                total_recipe.delete(frag_name);
            }
        }
    }
    return total_recipe;
}