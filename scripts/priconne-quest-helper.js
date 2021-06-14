const settings = (function () {
    const quest_filter_settings = Object.freeze({
        ALL: "filter-all",
        NORMAL: "filter-normal",
        HARD: "filter-hard",
        VERY_HARD: "filter-very-hard"
    });
    const quest_display_settings = Object.freeze({
        PERCENT: "display-percent",
        AMOUNT: "display-amt-req"
    });
    const setting_element_id = Object.freeze({
        QUEST_SHOWN_VALUE: "quest-shown-amt",
        ASCENDING_SORT_QUEST_LIST: "sort-ascending-quest-list",
        ASCENDING_SORT_QUEST_SCORE: "sort-ascending-quest-score",
        HIDE_QUEST_SCORE: "hide-quest-score",
        MIN_QUEST_CHAPTER: "min-quest-chapter",
        MAX_QUEST_CHAPTER: "max-quest-chapter",
        AUTO_MAX_QUEST_CHAPTER: "auto-max-quest-chapter",
        QUEST_FILTER_ALL: "filter-all-quests",
        QUEST_FILTER_NORMAL: "filter-normal-quests",
        QUEST_FILTER_HARD: "filter-hard-quests",
        QUEST_FILTER_VERY_HARD: "filter-very-hard-quests",
        QUEST_DISPLAY_PERCENT: "display-drop-percent",
        QUEST_DISPLAY_AMOUNT: "display-amount-required",
        SUBTRACT_AMOUNT_FROM_INVENTORY: "subtract-amount-from-inventory",
        DISPLAY_PRIORITY_ITEM_AMOUNT: "display-priority-item-amount",
        SHOW_PRIORITY_ITEMS_FIRST: "show-priority-items-first",
        EQUIPMENT_DATA_TYPE: "equipment-data-type",
        NORMAL_DROP_EVENT: "normal-quest-drop-event",
        HARD_DROP_EVENT: "hard-quest-drop-event",
        VERY_HARD_DROP_EVENT: "very-hard-quest-drop-event"
    });
    const tags = Object.freeze({
        QUEST_SHOWN_VALUE: "quest_shown_value",
        ASCENDING_SORT_QUEST_LIST: "ascending_sort_quest_list",
        ASCENDING_SORT_QUEST_SCORE: "ascending_sort_quest_score",
        HIDE_QUEST_SCORE: "hide_quest_score",
        MIN_QUEST_CHAPTER: "min_quest_chapter",
        MAX_QUEST_CHAPTER: "max_quest_chapter",
        AUTO_MAX_QUEST_CHAPTER: "auto_max_quest_chapter",
        QUEST_FILTER: "quest_filter",
        IGNORED_RARITIES: "ignored_rarities",
        QUEST_DISPLAY: "quest_display",
        SUBTRACT_AMOUNT_FROM_INVENTORY: "subtract_amount_from_inventory",
        DISPLAY_PRIORITY_ITEM_AMOUNT: "display_priority_item_amount",
        SHOW_PRIORITY_ITEMS_FIRST: "show_priority_items_first",
        EQUIPMENT_DATA_TYPE: "equipment_data_type"
    });
    const LOCALSTORAGE_KEY = "settings";
    let settings_default;
    let settings = settings_default = {
        quest_shown_value: 10,
        ascending_sort_quest_list: true,
        ascending_sort_quest_score: false,
        hide_quest_score: false,
        min_quest_chapter: 1,
        max_quest_chapter: 1,
        auto_max_quest_chapter: false,
        quest_filter: quest_filter_settings.ALL,
        ignored_rarities: [],
        quest_display: quest_display_settings.PERCENT,
        subtract_amount_from_inventory: false,
        display_priority_item_amount: false,
        show_priority_items_first: false,
        normal_quest_drop_multiplayer: 1,
        hard_quest_drop_multiplayer: 1,
        very_hard_quest_drop_multiplayer: 1,
        equipment_data_type: equipment_data.version.CURRENT,
    };

    /**
     * INITIALIZES SETTINGS BY READING THE DOCUMENT'S CURRENTLY SET VALUES (DEFAULT).
     * SAVES THE RESULTS IN BOTH THE CURRENT SETTINGS AND THE DEFAULT.
     */
    function init() {
        settings_default.quest_shown_value = document.getElementById(setting_element_id.QUEST_SHOWN_VALUE).value;
        settings.quest_shown_value = settings_default.quest_shown_value;

        settings_default.ascending_sort_quest_list = document.getElementById(setting_element_id.ASCENDING_SORT_QUEST_LIST).checked;
        settings.ascending_sort_quest_list = settings_default.ascending_sort_quest_list;

        settings_default.ascending_sort_quest_score = document.getElementById(setting_element_id.ASCENDING_SORT_QUEST_SCORE).checked;
        settings.ascending_sort_quest_score = settings_default.ascending_sort_quest_score;

        settings_default.hide_quest_score = document.getElementById(setting_element_id.HIDE_QUEST_SCORE).checked;
        settings.hide_quest_score = settings_default.hide_quest_score;

        // MAX QUEST CHAPTER SETTINGS INITIALIZED IN webpage::init()

        settings_default.auto_max_quest_chapter = document.getElementById(setting_element_id.AUTO_MAX_QUEST_CHAPTER).checked;
        settings.auto_max_quest_chapter = settings_default.auto_max_quest_chapter;

        if (document.getElementById(setting_element_id.QUEST_FILTER_ALL).checked) {
            settings_default.quest_filter = quest_filter_settings.ALL;
        }
        else if (document.getElementById(setting_element_id.QUEST_FILTER_NORMAL).checked) {
            settings_default.quest_filter = quest_filter_settings.NORMAL;
        }
        else if (document.getElementById(setting_element_id.QUEST_FILTER_HARD).checked) {
            settings_default.quest_filter = quest_filter_settings.HARD;
        }
        settings.quest_filter = settings_default.quest_filter;

        if (document.getElementById(setting_element_id.QUEST_DISPLAY_PERCENT).checked) {
            settings_default.quest_display = quest_display_settings.PERCENT;
        }
        else if (document.getElementById(setting_element_id.QUEST_DISPLAY_AMOUNT).checked) {
            settings_default.quest_display = quest_display_settings.AMOUNT;
        }
        settings.quest_display = settings_default.quest_display;

        settings_default.subtract_amount_from_inventory = document.getElementById(setting_element_id.SUBTRACT_AMOUNT_FROM_INVENTORY).checked;
        settings.subtract_amount_from_inventory = settings_default.subtract_amount_from_inventory;

        settings_default.display_priority_item_amount = document.getElementById(setting_element_id.DISPLAY_PRIORITY_ITEM_AMOUNT).checked;
        settings.display_priority_item_amount = settings_default.display_priority_item_amount;

        settings_default.show_priority_items_first = document.getElementById(setting_element_id.SHOW_PRIORITY_ITEMS_FIRST).checked;
        settings.show_priority_items_first = settings_default.show_priority_items_first;

        if (document.getElementById(setting_element_id.EQUIPMENT_DATA_TYPE).value === equipment_data.version.LEGACY) {
            settings_default.equipment_data_type = equipment_data.version.LEGACY
        }
        else {
            settings_default.equipment_data_type = equipment_data.version.CURRENT
        }
        settings.equipment_data_type = settings_default.equipment_data_type;
    }

    function check_checkbox(element_id, is_checked) {
        document.getElementById(element_id).checked = is_checked;
    }

    /**
     * UPDATES THE AMOUNT OF QUESTS THAT SHOULD BE DISPLAYED UNDER "RECOMMENDED QUESTS".
     * THE VALUE IN THE INPUT IS PROOF-READ AND THE QUEST TABLE IS REFRESHED.
     */
    function change_quest_shown_amt() {
        const max_value = document.getElementById(setting_element_id.QUEST_SHOWN_VALUE).max;
        const min_value = document.getElementById(setting_element_id.QUEST_SHOWN_VALUE).min;

        settings.quest_shown_value = Math.round(document.getElementById(setting_element_id.QUEST_SHOWN_VALUE).value);

        if (settings.quest_shown_value > max_value) {
            document.getElementById(setting_element_id.QUEST_SHOWN_VALUE).value = max_value;
            settings.quest_shown_value = max_value;
        }
        if (settings.quest_shown_value < min_value) {
            document.getElementById(setting_element_id.QUEST_SHOWN_VALUE).value = min_value;
            settings.quest_shown_value = min_value;
        }

        webpage.print("\"Quest Shown Amount\" changed to " + settings.quest_shown_value, "Settings");
        data_display.quests.refresh();
    }

    /**
     * TOGGLES THE SORT OPTION IF QUESTS SHOULD BE SORTED BY THEIR CHAPTER NUMBER.
     * i.e. CHAPTER 1 -> CHAPTER 1 HARD -> CHAPTER 1 VERY HARD -> CHAPTER 2 -> ... (ASCENDING)
     * QUEST TABLE IS REFRESHED AFTER TOGGLE.
     */
    function toggle_ascending_sort_quest_list() {
        settings.ascending_sort_quest_list = !settings.ascending_sort_quest_list;
        webpage.print("\"Quest Chapter/Number Sort\" changed to (Sort by Ascending?: " + settings.ascending_sort_quest_list + ")", "Settings");
        data_display.quests.refresh();
    }

    /**
     * TOGGLES THE SORT OPTION IF QUESTS SHOULD BE SORTED BY THEIR SCORE.
     * i.e. 0.1 -> 0.3 -> 0.5 -> 1.0 -> ... (ASCENDING)
     * QUEST TABLE IS REFRESHED AFTER TOGGLE.
     */
    function toggle_ascending_sort_quest_score() {
        settings.ascending_sort_quest_score = !settings.ascending_sort_quest_score;
        webpage.print("\"Quest Score Sort\" changed to (Sort by Ascending?: " + settings.ascending_sort_quest_score + ")", "Settings");
        data_display.quests.refresh();
    }

    /**
     * TOGGLES THE SCORE VISIBILITY ON A QUEST IN THE "RECOMMENDED QUEST" LIST.
     * QUEST SCORES CAN BE SEEN ON THE TOP RIGHT OF A QUEST/
     * QUEST TABLE IS REFRESHED AFTER TOGGLE.
     */
    function toggle_hide_quest_score() {
        settings.hide_quest_score = !settings.hide_quest_score;
        webpage.print("\"Quest Scoring Visibility\" changed to (Hidden?: " + settings.hide_quest_score + ")", "Settings");
        data_display.quests.refresh();
    }

    /**
     * UPDATES THE LOWEST QUEST CHAPTER THAT SHOULD BE DISPLAYED IN "RECOMMENDED QUESTS".
     * THE MIN QUEST CHAPTER CANNOT BE:
     *      - GREATER THAN THE LATEST QUEST CHAPTER
     *      - LOWER THAN 1
     *      - GREATER THAN settings.max_quest_chapter
     * THE VALUE IN THE INPUT IS PROOF-READ AND THE QUEST TABLE IS REFRESHED WHEN COMPLETE.
     */
    function change_min_quest_chapter() {
        const max_value = document.getElementById(setting_element_id.MIN_QUEST_CHAPTER).max;
        const min_value = document.getElementById(setting_element_id.MIN_QUEST_CHAPTER).min;

        settings.min_quest_chapter = Math.round(document.getElementById(setting_element_id.MIN_QUEST_CHAPTER).value);

        if (settings.min_quest_chapter > max_value) {
            document.getElementById(setting_element_id.MIN_QUEST_CHAPTER).value = max_value;
            settings.min_quest_chapter = max_value;
        }
        if (settings.min_quest_chapter > settings.max_quest_chapter) {
            document.getElementById(setting_element_id.MIN_QUEST_CHAPTER).value = settings.max_quest_chapter;
            settings.min_quest_chapter = settings.max_quest_chapter;
        }
        if (settings.min_quest_chapter < min_value) {
            document.getElementById(setting_element_id.MIN_QUEST_CHAPTER).value = min_value;
            settings.min_quest_chapter = min_value;
        }
        webpage.print("\"Minimum Quest Shown\" changed to " + settings.min_quest_chapter, "Settings");
        data_display.quests.refresh();
    }

    /**
     * UPDATES THE HIGHEST QUEST CHAPTER THAT SHOULD BE DISPLAYED IN "RECOMMENDED QUESTS".
     * THE MAX QUEST CHAPTER CANNOT BE:
     *      - GREATER THAN THE LATEST QUEST CHAPTER
     *      - LOWER THAN 1
     *      - LOWER THAN settings.min_quest_chapter
     * THE VALUE IN THE INPUT IS PROOF-READ AND THE QUEST TABLE IS REFRESHED WHEN COMPLETE.
     */
    function change_max_quest_chapter() {
        const max_value = document.getElementById(setting_element_id.MAX_QUEST_CHAPTER).max;
        const min_value = document.getElementById(setting_element_id.MAX_QUEST_CHAPTER).min;

        settings.max_quest_chapter = Math.round(document.getElementById(setting_element_id.MAX_QUEST_CHAPTER).value);

        if (settings.max_quest_chapter > max_value) {
            document.getElementById(setting_element_id.MAX_QUEST_CHAPTER).value = max_value;
            settings.max_quest_chapter = max_value;
        }
        if (settings.max_quest_chapter < min_value) {
            document.getElementById(setting_element_id.MAX_QUEST_CHAPTER).value = min_value;
            settings.max_quest_chapter = min_value;
        }
        if (settings.max_quest_chapter < settings.min_quest_chapter) {
            document.getElementById(setting_element_id.MAX_QUEST_CHAPTER).value = settings.min_quest_chapter;
            settings.max_quest_chapter = settings.min_quest_chapter;
        }
        webpage.print("\"Maximum Quest Shown\" changed to " + settings.max_quest_chapter, "Settings");
        data_display.quests.refresh();
    }

    /**
     * TOGGLES THE OPTION TO SET THE LATEST QUEST CHAPTER AS THE MAX QUEST CHAPTER.
     * MAX QUEST CHAPTER CANNOT BE MODIFIED IF THIS OPTION IS ENABLED.
     * THE QUEST TABLE IS REFRESHED AFTER TOGGLE.
     */
    function toggle_auto_max_quest_chapter() {
        settings.auto_max_quest_chapter = !settings.auto_max_quest_chapter;
        document.getElementById(setting_element_id.MAX_QUEST_CHAPTER).disabled = !document.getElementById(setting_element_id.MAX_QUEST_CHAPTER).disabled;
        if (settings.auto_max_quest_chapter) {
            const max_chapter = quest_data.max_chapter();
            document.getElementById(setting_element_id.MAX_QUEST_CHAPTER).value = max_chapter;
            settings.max_quest_chapter = max_chapter;
        }
        webpage.print("\"Auto Set Max Quest Chapter\" changed to (Active?: " + settings.auto_max_quest_chapter + ")", "Settings");
        data_display.quests.refresh();
    }

    /**
     * MODIFIES THE QUEST FILTER DEPENDING ON WHAT'S CHECKED IN THE DOCUMENT.
     * THE "QUEST FILTER" IS TO SHOW ONLY A SPECIFIC DIFFICULTY OF QUEST.
     *      i.e. NORMAL QUESTS ONLY / HARD QUESTS ONLY / VERY HARD QUESTS ONLY
     * THE QUEST TABLE IS REFRESHED WHEN COMPLETE.
     */
    function change_quest_filter() {
        if (document.getElementById(setting_element_id.QUEST_FILTER_ALL).checked) {
            settings.quest_filter = quest_filter_settings.ALL;
        }
        else if (document.getElementById(setting_element_id.QUEST_FILTER_NORMAL).checked) {
            settings.quest_filter = quest_filter_settings.NORMAL;
        }
        else if (document.getElementById(setting_element_id.QUEST_FILTER_HARD).checked) {
            settings.quest_filter = quest_filter_settings.HARD;
        }
        else if (document.getElementById(setting_element_id.QUEST_FILTER_VERY_HARD).checked) {
            settings.quest_filter = quest_filter_settings.VERY_HARD;
        }
        webpage.print("\"Quest Filter\" changed to " + settings.quest_filter, "Settings");
        data_display.quests.refresh();
    }

    /**
     * TOGGLES A SPECIFIC ITEM RARITY'S VISIBILITY IN "REQUIRED INGREDIENTS".
     * REQUESTED ITEMS, REQUIRED INGREDIENTS, AND QUEST TABLE WILL BE REFRESHED WHEN COMPLETE.
     *
     * @param {string}    rarity    STRING OF RARITY THAT SHOULD BE IGNORED ; i.e. COMMON WOULD BE "common".
     */
    function toggle_ignored_rarity(rarity) {
        let elem_id = "ignore-button-" + rarity;
        document.getElementById(elem_id).classList.toggle("low-opacity");

        if (settings.ignored_rarities.includes(rarity)) {
            // UN-IGNORE RARITY
            let index = settings.ignored_rarities.indexOf(rarity);
            if (index > -1) {
                settings.ignored_rarities.splice(index, 1);
            }
            webpage.print("Un-ignoring " + rarity + " rarity items.", "Settings");
        }
        else {
            // IGNORE RARITY
            settings.ignored_rarities.push(rarity);
            webpage.print("Ignoring " + rarity + " rarity items.", "Settings");
        }

        data_display.build();
        projects.update_list();
        projects.disable_complete_project_button(undefined, true);
    }

    /**
     * CHANGES THE VISIBILITY OF DROP PERCENT OR REQUIRED AMOUNT FOR ITEMS IN "RECOMMENDED QUESTS".
     * THE OTHER OPTION CAN BE VIEWED BY HOVERING OVER THE ITEM WITH YOUR CURSOR.
     * THE QUEST TABLE IS REFRESHED AFTER.
     */
    function change_display_option() {
        if (document.getElementById(setting_element_id.QUEST_DISPLAY_PERCENT).checked) {
            settings.quest_display = quest_display_settings.PERCENT;
        }
        else if (document.getElementById(setting_element_id.QUEST_DISPLAY_AMOUNT).checked) {
            settings.quest_display = quest_display_settings.AMOUNT;
        }
        webpage.print("\"Quest Display\" changed to " + settings.quest_display, "Settings");
        data_display.quests.refresh();
    }

    /***
     * MAKES IT SO THAT THE SHOWN QUANTITY FOR ITEMS IS REDUCED BY CURRENT AMOUNT IN INVENTORY
     * WHEN DISPLAYED IN "RECOMMENDED QUESTS".
     * THE QUEST TABLE IS REFRESHED AFTER.
     */
    function toggle_subtract_amount_from_inventory() {
        settings.subtract_amount_from_inventory = !settings.subtract_amount_from_inventory;
        webpage.print("\"Subtract Amount From Inventory\" changed to (Active?: " + settings.subtract_amount_from_inventory + ")", "Settings");
        data_display.quests.refresh();
    }

    /**
     * REPLACES AMOUNT REQUIRED IN "RECOMMENDED QUESTS" WITH THE TOTAL AMOUNT OF ITEMS REQUIRED IN A PRIORITY PROJECT.
     * FOR EXAMPLE:
     *   - Project 1 (Priority): 3 Iron Sword, 1 Killer Pencil
     *   - Project 2 (Priority): 5 Iron Sword
     *   - Project 3: 10 Iron Sword, 5 Killer Pencil
     *   Total Priority Item Required: 8 Iron Sword, 1 Killer Pencil
     *
     *   Project 3 is loaded...
     *   Required Ingredients: 10 Iron Sword, 5 Killer Pencil
     *   Recommended Quests: 8 Iron Sword Needed
     */
    function toggle_display_priority_item_amount() {
        settings.display_priority_item_amount = !settings.display_priority_item_amount;
        webpage.print("\"Display Priority Item Amount\" changed to (Active?: " + settings.display_priority_item_amount + ")", "Settings");
        data_display.quests.refresh();
    }

    /**
     * SHIFTS EVERY ITEM THAT'S IN A PRIORITY PROJECT TO BE ABOVE OTHER ITEMS IN "REQUIRED INGREDIENTS".
     * THE ENTIRE DATA DISPLAY IS REFRESHED AFTER.
     */
    function toggle_show_priority_items_first() {
        settings.show_priority_items_first = !settings.show_priority_items_first;
        webpage.print("\"Show Priority Items First\" changed to (Active?: " + settings.show_priority_items_first + ")", "Settings");
        data_display.build();
    }

    /**
     * CHANGES AMOUNT OF ITEMS DROP IN NORMAL QUEST MAPS.
     *      NO EVENT: ITEMS DROP AT NORMAL RATE: 1 ITEM AT A TIME
     *      2X EVENT: ITEMS DROP AT TWO AT A TIME
     *      3X EVENT: ITEMS DROP AT THREE AT A TIME
     * THE QUEST TABLE IS REFRESHED TO REFLECT NEW PRIORITY LIST
     */
    function change_normal_quest_drop_event() {
        settings.normal_quest_drop_multiplayer = Number(document.getElementById(setting_element_id.NORMAL_DROP_EVENT).value);
        webpage.print("\"Normal Quests Drop Buff\" changed to " + settings.normal_quest_drop_multiplayer, "Settings");
        data_display.quests.refresh();
    }

    /**
     * CHANGES AMOUNT OF ITEMS DROP IN HARD QUEST MAPS.
     *      NO EVENT: ITEMS DROP AT NORMAL RATE: 1 ITEM AT A TIME
     *      2X EVENT: ITEMS DROP AT TWO AT A TIME
     *      3X EVENT: ITEMS DROP AT THREE AT A TIME
     * THE QUEST TABLE IS REFRESHED TO REFLECT NEW PRIORITY LIST
     */
    function change_hard_quest_drop_event() {
        settings.hard_quest_drop_multiplayer = Number(document.getElementById(setting_element_id.HARD_DROP_EVENT).value);
        webpage.print("\"Hard Quests Drop Buff\" changed to " + settings.hard_quest_drop_multiplayer, "Settings");
        data_display.quests.refresh();
    }

    /**
     * CHANGES AMOUNT OF ITEMS DROP IN VERY HARD QUEST MAPS.
     *      NO EVENT: ITEMS DROP AT NORMAL RATE: 1 ITEM AT A TIME
     *      2X EVENT: ITEMS DROP AT TWO AT A TIME
     *      3X EVENT: ITEMS DROP AT THREE AT A TIME
     * THE QUEST TABLE IS REFRESHED TO REFLECT NEW PRIORITY LIST
     */
    function change_very_hard_quest_drop_event() {
        settings.very_hard_quest_drop_multiplayer = Number(document.getElementById(setting_element_id.VERY_HARD_DROP_EVENT).value);
        webpage.print("\"Very Hard Quests Drop Buff\" changed to " + settings.very_hard_quest_drop_multiplayer, "Settings");
        data_display.quests.refresh();
    }

    /**
     * CHANGES THE EQUIPMENT DATA TO CURRENT OR LEGACY.
     *      CURRENT DATA: LATEST UP TO DATE DATA FROM JAPAN SERVER.
     *      LEGACY DATA: RETIRED DATA THAT SOME SERVERS MAY STILL USE THAT HAS HIGHER EQUIPMENT CRAFTING COSTS.
     * ITEM TABLES, REQUESTED ITEMS, REQUIRED INGREDIENTS, QUEST TABLE, PRESETS WILL ALL BE REFRESHED AFTER.
     */
    function change_equipment_data() {
        if (document.getElementById(setting_element_id.EQUIPMENT_DATA_TYPE).value === equipment_data.version.LEGACY) {
            settings.equipment_data_type = equipment_data.version.LEGACY;
        }
        else {
            settings.equipment_data_type = equipment_data.version.CURRENT;
        }
        webpage.print("\"Equipment Data Type\" changed to " + settings.equipment_data_type, "Settings");

        change_equipment_and_character_data();
    }

    /**
     * CHANGES THE EQUIPMENT AND CHARACTER DATA TO THE TYPE DEFINED IN SETTINGS.
     * AFTER THE DATA IS READ, UPDATE DOCUMENT.
     */
    function change_equipment_and_character_data() {
        let character_version = (settings.equipment_data_type === equipment_data.version.CURRENT) ? character_data.version.CURRENT : character_data.version.LEGACY;

        equipment_data.set_loaded_version(settings.equipment_data_type);
        character_data.set_loaded_version(character_version);

        equipment_data.read_data(function (success) {
            if (success) {
                character_data.read_data(function (success) {
                    if (success) {
                        data_display.item_table.build();
                        data_display.build();
                        const presets_list_select = document.getElementById(presets.element_id.LIST_SELECT),
                              unit_selected = presets_list_select.value;
                        if (presets.data().PRESET_ITEMS_RANK > character_data.max_rank()) {
                            presets.set_items_rank(character_data.max_rank());
                            presets.update_rank_label();
                        }
                        if (!character_data.is_character_exists(unit_selected) && unit_selected !== presets.DEFAULT_VALUE) {
                            webpage.print("Currently selected character in presets \"" + unit_selected + "\" no longer exists. Reverting to default selection...", "Character Data (Legacy)");
                            presets_list_select.value = presets.DEFAULT_VALUE;
                        }
                        presets.update_details();
                        presets.build();
                        presets.adjust_max();
                        presets_list_select.value = character_data.is_character_exists(unit_selected) ?
                            unit_selected : presets.DEFAULT_VALUE;
                        data_display.item_focus.clear();
                        inventory.set_catalog_build_state(false);
                    }
                })
            }
        });
    }

    /**
     * SAVES CURRENT SETTINGS TO LOCALSTORAGE.
     */
    function save_settings() {
        let setting_json_string = JSON.stringify(settings);
        localStorage.setItem(LOCALSTORAGE_KEY, setting_json_string);

        toastr.success((webpage.language.current() === webpage.language.option.ENGLISH) ? "Your settings have been saved!" : webpage.language.data()[webpage.language.tags.TOASTS]["settings_saved"]);
        webpage.print("Settings have been saved.", "Settings");
    }

    /**
     * DELETES SETTINGS FROM LOCALSTORAGE IF IT EXISTS.
     */
    function delete_settings() {
        if (is_settings_exist()) {
            localStorage.removeItem(LOCALSTORAGE_KEY);

            toastr.success((webpage.language.current() === webpage.language.option.ENGLISH) ? "Your saved settings have been deleted." : webpage.language.data()[webpage.language.tags.TOASTS]["settings_deleted"]);
            webpage.print("Settings have been deleted.", "Settings");
        }
    }

    /**
     * LOAD SETTINGS FROM LOCALSTORAGE AND UPDATE THE DOCUMENT.
     *
     * IF not_preload IS SET TO FALSE, "PRELOAD MODE" WILL BE ENABLED, MEANING
     * SETTINGS WILL BE FETCHED FROM LOCALSTORAGE BUT THE DOCUMENT WILL NOT BE
     * UPDATED WITH THE SETTINGS AND load_settings_from_storage() WILL NOT SAVE
     * THE RESULTS FROM IT'S ERROR CHECKING BACK TO LOCALSTORAGE.
     *
     * PRELOADING IS MAINLY USED IN webpage.init() TO INITIALIZE SETTINGS TO
     * GET THE SAVED EQUIPMENT_DATA_TYPE. SETTINGS ARE READ AGAIN LATER IN
     * THE FUNCTION AS NON-PRELOAD MODE TO SET EVERYTHING UP PROPERLY.
     *
     * @param {boolean}    [not_preload=true]    STATUS OF PRELOAD, READ ABOVE FOR INFORMATION.
     */
    function read_settings(not_preload = true) {
        if (is_settings_exist()) {
            load_settings_from_storage(not_preload);
            if (not_preload) {
                update_document();
                webpage.print("User settings have been loaded!", "Settings");
            }
        }
    }

    /**
     * UPDATE VARIOUS DOCUMENT ELEMENTS TO MATCH WHAT THEY ARE SET TO IN SETTINGS.
     */
    function update_document() {
        const all_rarities = Object.values(equipment_data.rarity);

        document.getElementById(setting_element_id.QUEST_SHOWN_VALUE).value = settings.quest_shown_value;
        check_checkbox(setting_element_id.ASCENDING_SORT_QUEST_LIST, settings.ascending_sort_quest_list);
        check_checkbox(setting_element_id.ASCENDING_SORT_QUEST_SCORE, settings.ascending_sort_quest_score);
        check_checkbox(setting_element_id.HIDE_QUEST_SCORE, settings.hide_quest_score);
        document.getElementById(setting_element_id.MIN_QUEST_CHAPTER).value = settings.min_quest_chapter;
        document.getElementById(setting_element_id.MAX_QUEST_CHAPTER).value = settings.max_quest_chapter;
        if (settings.auto_max_quest_chapter) {
            check_checkbox(setting_element_id.AUTO_MAX_QUEST_CHAPTER, settings.auto_max_quest_chapter);
            document.getElementById(setting_element_id.MAX_QUEST_CHAPTER).disabled = true;
            document.getElementById(setting_element_id.MAX_QUEST_CHAPTER).value = quest_data.max_chapter();
            settings.max_quest_chapter = quest_data.max_chapter();
        }
        check_checkbox(setting_element_id.QUEST_FILTER_ALL, settings.quest_filter === quest_filter_settings.ALL);
        check_checkbox(setting_element_id.QUEST_FILTER_NORMAL, settings.quest_filter === quest_filter_settings.NORMAL);
        check_checkbox(setting_element_id.QUEST_FILTER_HARD, settings.quest_filter === quest_filter_settings.HARD);
        check_checkbox(setting_element_id.QUEST_FILTER_VERY_HARD, settings.quest_filter === quest_filter_settings.VERY_HARD);
        for (let i = 0, j = all_rarities.length ; i < j ; i++) {
            const document_id = "ignore-button-" + all_rarities[i];
            try {
                if (settings.ignored_rarities.includes(all_rarities[i])) {
                    document.getElementById(document_id).classList.add("low-opacity");
                }
                else {
                    document.getElementById(document_id).classList.remove("low-opacity");
                }
            }
            catch (e) {
                if (all_rarities[i] !== equipment_data.rarity.MISC) {
                    webpage.print("Document ID \"" + document_id + "\" doesn't exist! Is this a new rarity?", "Settings::update_document()");
                }
            }
        }
        const is_quest_display_percent = settings.quest_display === quest_display_settings.PERCENT;
        check_checkbox(setting_element_id.QUEST_DISPLAY_PERCENT, is_quest_display_percent);
        check_checkbox(setting_element_id.QUEST_DISPLAY_AMOUNT, !is_quest_display_percent);
        check_checkbox(setting_element_id.SUBTRACT_AMOUNT_FROM_INVENTORY, settings.subtract_amount_from_inventory);
        check_checkbox(setting_element_id.DISPLAY_PRIORITY_ITEM_AMOUNT, settings.display_priority_item_amount);
        check_checkbox(setting_element_id.SHOW_PRIORITY_ITEMS_FIRST, settings.show_priority_items_first);
        document.getElementById(setting_element_id.EQUIPMENT_DATA_TYPE).value = ((settings.equipment_data_type === equipment_data.version.LEGACY) ? equipment_data.version.LEGACY : equipment_data.version.CURRENT);
    }

    /**
     * REPLACE CURRENT SETTINGS WITH DEFAULT SETTINGS.
     */
    function restore_default_settings() {
        settings = settings_default;
    }

    /**
     * RESET ANY CHANGES MADE BY RESTORING SAVED SETTINGS OR THE DEFAULT SETTINGS IF SAVED SETTINGS DOES NOT EXIST.
     */
    function reset_settings() {
        if (is_settings_exist()) {
            load_settings_from_storage();
        }
        else {
            restore_default_settings();
        }
        update_document();
        toastr.success((webpage.language.current() === webpage.language.option.ENGLISH) ? "Settings have been reset." : webpage.language.data()[webpage.language.tags.TOASTS]["settings_reset"]);
        data_display.quests.refresh();
        data_display.item_table.build();
        data_display.build();
        change_equipment_and_character_data();
    }

    /**
     * DISPLAY THE SAVED SETTINGS TO THE USER VIA alert() IF SETTINGS EXIST.
     */
    function print_settings() {
        if (is_settings_exist()) {
            let saved_settings = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
            alert(JSON.stringify(saved_settings, null, 4));
        }
        else {
            toastr.error((webpage.language.current() === webpage.language.option.ENGLISH) ? "You did not save any settings." : webpage.language.data()[webpage.language.tags.TOASTS]["no_settings_saved"]);
        }
    }

    /**
     * GET SETTINGS FROM LOCALSTORAGE AND MAKE SURE THE VALUES SAVED ARE VALID BEFORE LOADING.
     * IF SETTINGS DO NOT EXIST, DEFAULT SETTINGS WILL BE USED INSTEAD.
     *
     * @param {boolean}    [do_save=true]    IF TRUE, SAVE THE VALUE CHECKED VALUES TO LOCALSTORAGE.
     */
    function load_settings_from_storage(do_save = true) {
        const localstorage_data = localStorage.getItem(LOCALSTORAGE_KEY);
        let settings_obj = JSON.parse(localstorage_data);

        if (jQuery.isEmptyObject(settings_obj)) {
            // SETTINGS EMPTY, SET TO DEFAULT
            check_for_undefined_settings();
        }
        else {
            // VALUE CHECKING
            let max_value;
            let min_value;

            max_value = parseInt(document.getElementById(setting_element_id.QUEST_SHOWN_VALUE).max);
            min_value = parseInt(document.getElementById(setting_element_id.QUEST_SHOWN_VALUE).min);
            settings_obj.quest_shown_value = ((settings_obj.quest_shown_value > max_value) ? max_value : settings_obj.quest_shown_value);
            settings_obj.quest_shown_value = ((settings_obj.quest_shown_value < min_value) ? min_value : settings_obj.quest_shown_value);
            max_value = parseInt(document.getElementById(setting_element_id.MIN_QUEST_CHAPTER).max);
            min_value = parseInt(document.getElementById(setting_element_id.MIN_QUEST_CHAPTER).min);
            settings_obj.min_quest_chapter = ((settings_obj.min_quest_chapter > max_value) ? max_value : settings_obj.min_quest_chapter);
            settings_obj.min_quest_chapter = ((settings_obj.min_quest_chapter < min_value) ? min_value : settings_obj.min_quest_chapter);
            max_value = parseInt(document.getElementById(setting_element_id.MAX_QUEST_CHAPTER).max);
            min_value = parseInt(document.getElementById(setting_element_id.MAX_QUEST_CHAPTER).min);
            settings_obj.max_quest_chapter = ((settings_obj.max_quest_chapter > max_value) ? max_value : settings_obj.max_quest_chapter);
            settings_obj.max_quest_chapter = ((settings_obj.max_quest_chapter < min_value) ? min_value : settings_obj.max_quest_chapter);
            settings_obj.min_quest_chapter = ((settings_obj.min_quest_chapter > settings_obj.max_quest_chapter) ? settings_obj.max_quest_chapter : settings_obj.min_quest_chapter);

            settings = settings_obj;
            check_for_undefined_settings();

            if (do_save) {
                let setting_json_string = JSON.stringify(settings);
                localStorage.setItem(LOCALSTORAGE_KEY, setting_json_string);
            }
        }
    }

    /**
     * GO THROUGH SETTINGS AND MAKE SURE THEY ARE ALL DEFINED.
     * IF A SETTING ISN'T DEFINED, USE THE DEFAULT.
     */
    function check_for_undefined_settings() {
        settings = {
            quest_shown_value: (settings.quest_shown_value === undefined ? settings_default.quest_shown_value : settings.quest_shown_value),
            ascending_sort_quest_list: (settings.ascending_sort_quest_list === undefined ? settings_default.ascending_sort_quest_list : settings.ascending_sort_quest_list),
            ascending_sort_quest_score: (settings.ascending_sort_quest_score === undefined ? settings_default.ascending_sort_quest_score : settings.ascending_sort_quest_score),
            hide_quest_score: (settings.hide_quest_score === undefined ? settings_default.hide_quest_score : settings.hide_quest_score),
            min_quest_chapter: (settings.min_quest_chapter === undefined ? settings_default.min_quest_chapter : settings.min_quest_chapter),
            max_quest_chapter: (settings.max_quest_chapter === undefined ? settings_default.max_quest_chapter : settings.max_quest_chapter),
            auto_max_quest_chapter: (settings.auto_max_quest_chapter === undefined ? settings_default.auto_max_quest_chapter : settings.auto_max_quest_chapter),
            quest_filter: (settings.quest_filter === undefined ? settings_default.quest_filter : settings.quest_filter),
            ignored_rarities: (settings.ignored_rarities === undefined ? [] : settings.ignored_rarities),
            quest_display: (settings.quest_display === undefined ? settings_default.quest_display : settings.quest_display),
            subtract_amount_from_inventory: (settings.subtract_amount_from_inventory === undefined ? settings_default.subtract_amount_from_inventory : settings.subtract_amount_from_inventory),
            display_priority_item_amount: (settings.display_priority_item_amount === undefined ? settings_default.display_priority_item_amount : settings.display_priority_item_amount),
            show_priority_items_first: (settings.show_priority_items_first === undefined ? settings_default.show_priority_items_first : settings.show_priority_items_first),
            normal_quest_drop_multiplayer: (settings.normal_quest_drop_multiplayer === undefined ? settings_default.normal_quest_drop_multiplayer : settings.normal_quest_drop_multiplayer),
            hard_quest_drop_multiplayer: (settings.hard_quest_drop_multiplayer === undefined ? settings_default.hard_quest_drop_multiplayer : settings.hard_quest_drop_multiplayer),
            very_hard_quest_drop_multiplayer: (settings.very_hard_quest_drop_multiplayer === undefined ? settings_default.very_hard_quest_drop_multiplayer : settings.very_hard_quest_drop_multiplayer),
            equipment_data_type: (settings.equipment_data_type === undefined ? settings_default.equipment_data_type : settings.equipment_data_type),
        };
    }

    /**
     * CHECK IF LOCALSTORAGE HAS SETTINGS SAVED.
     * @return {boolean} TRUE IF LOCALSTORAGE CONTAINS SAVED SETTINGS DATA.
     */
    function is_settings_exist() {
        return localStorage.getItem(LOCALSTORAGE_KEY) !== null;
    }

    function get_settings() {
        return settings;
    }

    function set_setting(key, value) {
        settings[key] = value;
    }

    function set_default_setting(key, value) {
        settings_default[key] = value;
    }

    return {
        tags: tags,
        init: init,

        change_quest_shown_amt: change_quest_shown_amt,
        toggle_ascending_sort_quest_list: toggle_ascending_sort_quest_list,
        toggle_ascending_sort_quest_score: toggle_ascending_sort_quest_score,
        toggle_hide_quest_score: toggle_hide_quest_score,
        change_min_quest_chapter: change_min_quest_chapter,
        change_max_quest_chapter: change_max_quest_chapter,
        toggle_auto_max_quest_chapter: toggle_auto_max_quest_chapter,
        change_quest_filter: change_quest_filter,
        filter_settings: quest_filter_settings,
        toggle_ignored_rarity: toggle_ignored_rarity,
        change_display_option: change_display_option,
        display_options: quest_display_settings,
        toggle_subtract_amount_from_inventory: toggle_subtract_amount_from_inventory,
        toggle_display_priority_item_amount: toggle_display_priority_item_amount,
        toggle_show_priority_items_first: toggle_show_priority_items_first,

        change_normal_quest_drop_event: change_normal_quest_drop_event,
        change_hard_quest_drop_event: change_hard_quest_drop_event,
        change_very_hard_quest_drop_event: change_very_hard_quest_drop_event,

        change_equipment_data: change_equipment_data,

        save_settings: save_settings,
        delete_settings: delete_settings,
        reset_settings: reset_settings,
        print_settings: print_settings,

        read_settings: read_settings,
        get_settings: get_settings,
        set_setting: set_setting,
        set_default_setting: set_default_setting
    }
})();
const title_background = (function () {
    const backgrounds = Object.freeze({
        MIYAKO: 'Miyako',
        SUMMER_GOURMET_FOOD_PALACE: 'Summer_With_Gourmet_Food_Palace',
        SUMMER_CAON: 'Summer_With_Caon',
        SUMMER_MERCURIUS_FOUNDATION: 'Summer_With_Mercurius_Foundation',
        FRIENDSHIP_CLUB: 'Friendship_Club',
        AOI_DIARY: 'Aoi_Diary',
        MANARIA_FRIENDS: 'Manaria_Friends',
        RE_ZERO: 'Re_Zero',
        NIGHTMARE: 'Nightmare',
        HALLOWEEN_LITTLE_LYRICAL: 'Halloween_With_Little_Lyrical',
        HALLOWEEN_MIYAKO_SHINOBU: 'Halloween_With_Miyako_and_Shinobu',
        TWILIGHT_CARAVAN: 'Twilight_Caravan',
        CHRISTMAS_2019: 'Christmas_2019',
        PECORINE_SANDWICH: 'Pecorine_Sandwich',
        NEW_YEAR_2020: 'New_Year_2020',
        IDOLMASTER: 'iDOLM@STER',
        CUSTOM: 'CUSTOM',
    });
    const tags = Object.freeze({
        BACKGROUND: "background",                   // STORES INFORMATION ABOUT WHICH BACKGROUND IMAGE TO USE
        CUSTOM_BACKGROUND: "custom_background",     // STORES THE IMAGE URL OF THE USER PROVIDED BACKGROUND IMAGE
        HOVER_DISABLED: "hover_disabled"            // IF TRUE, HOVERING OVER THE TITLE BACKGROUND WILL NOT EXPAND IT
    });
    const element_ids = Object.freeze({
        BACKGROUND_SELECT: "title-background-select",
        CUSTOM_BACKGROUND_DIV: "custom-title-input",
        CUSTOM_BACKGROUND_INPUT: "custom-title-url-input",
        HOVER_DISABLE_CHECKBOX: "title-hover-disable",
        TITLE_DIV: "title-div"
    });
    const LOCALSTORAGE_KEY = "background";
    const default_background = backgrounds.MIYAKO;

    function init() {
        init_background_list();
        init_background();
    }

    /**
     * WRITE THE LIST OF AVAILABLE BACKGROUND OPTIONS AND DISPLAY THEM.
     */
    function init_background_list() {
        let select_html = "";
        Object.keys(backgrounds).forEach(function (key) {
            select_html += "<option value=\"" + backgrounds[key] + "\">" + key + ((backgrounds[key] === default_background) ? " (DEFAULT)" : "") + "</option>";
        });
        document.getElementById(element_ids.BACKGROUND_SELECT).innerHTML = select_html;
    }

    /**
     * CHECK IF THERE IS A SAVED BACKGROUND IN LOCALSTORAGE AND PERFORM THE FOLLOWING:
     *      - CONVERT OLD FORMAT TO NEW [1.8.11+] FORMAT IF POSSIBLE
     *      - SET SAVED BACKGROUND TO BE ACTIVE
     *      - RESTORE CUSTOM BACKGROUND URL TO THE DOCUMENT IF IT EXISTS
     *      - CHANGE THE BACKGROUND LIST VALUE TO BE THE SAVED BACKGROUND
     */
    function init_background() {
        if (typeof(Storage) !== "undefined") {
            // CONVERT OLD FORMAT TO [1.8.11+] FORMAT
            let is_background_json;
            try {JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)); is_background_json = true;}
            catch (e) {is_background_json = false;}
            if ((localStorage.getItem(LOCALSTORAGE_KEY) !== null && !is_background_json) ||
                localStorage.getItem("custom_background_url") !== null) {
                webpage.print("Converting saved title background data to the new format...", "Title Background");
                let new_data = {
                    background: ((localStorage.getItem(LOCALSTORAGE_KEY) !== null && !is_background_json) ? localStorage.getItem(LOCALSTORAGE_KEY) : ""),
                    custom_background: (localStorage.getItem("custom_background_url") !== null ? localStorage.getItem("custom_background_url") : ""),
                    hover_disabled: false
                };
                localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(new_data));
                localStorage.removeItem("custom_background_url");
            }

            // IF THERE IS A DESIRED BACKGROUND SAVED
            if (localStorage.getItem(LOCALSTORAGE_KEY) !== null) {
                let background_localstorage = get_background_data();

                // DISABLE HOVER ANIMATION
                document.getElementById(element_ids.HOVER_DISABLE_CHECKBOX).checked = background_localstorage[tags.HOVER_DISABLED];
                disable_title_hover(background_localstorage[tags.HOVER_DISABLED]);

                let saved_background = background_localstorage[tags.BACKGROUND];
                let saved_background_exists = Object.entries(backgrounds).some(function (entry) {return saved_background === entry[1];});

                // RESTORE SAVED CUSTOM BACKGROUND
                let custom_background_url = "";
                if (background_localstorage[tags.CUSTOM_BACKGROUND] !== "") {
                    custom_background_url = background_localstorage[tags.CUSTOM_BACKGROUND];
                }
                document.getElementById(element_ids.CUSTOM_BACKGROUND_INPUT).value = custom_background_url;

                // IF SAVED BACKGROUND EXISTS, USE IT ; IF NOT, USE DEFAULT AND DELETE SAVED BACKGROUND
                if (saved_background_exists) {
                    if (saved_background !== backgrounds.CUSTOM) {
                        set_title_background(saved_background);
                    }
                    else {
                        // IF CUSTOM BACKGROUND, SHOW ELEMENT + SET BACKGROUND
                        document.getElementById(element_ids.CUSTOM_BACKGROUND_DIV).hidden = false;

                        // SET CUSTOM TITLE BACKGROUND ; USE DEFAULT IF IT DOES NOT EXIST
                        if (custom_background_url !== "") {
                            set_custom_title_background(custom_background_url);
                        }
                        else {
                            set_title_background(default_background);
                        }
                    }
                    document.getElementById(element_ids.BACKGROUND_SELECT).value = saved_background;
                }
                else {
                    // DELETE BACKGROUND DATA IF EMPTY
                    if (is_background_data_empty()) {
                        localStorage.removeItem(LOCALSTORAGE_KEY);
                    }

                    // USE DEFAULT BACKGROUND
                    set_title_background(default_background);
                    document.getElementById(element_ids.BACKGROUND_SELECT).value = default_background;
                }
            }
            else {
                // USE DEFAULT BACKGROUND
                set_title_background(default_background);
                document.getElementById(element_ids.BACKGROUND_SELECT).value = default_background;
            }
        }
    }

    /**
     * CHANGE THE TITLE BACKGROUND TO THE IMAGE SELECTED IN THE BACKGROUND LIST.
     * IF THE BACKGROUND SELECTED IS NOT THE DEFAULT BACKGROUND, SAVE TO LOCALSTORAGE.
     * IF "CUSTOM" IS SELECTED, SHOW THE CUSTOM BACKGROUND IMAGE URL INPUT.
     */
    function change_background() {
        let background_image_name = document.getElementById(element_ids.BACKGROUND_SELECT).value;

        if (background_image_name !== backgrounds.CUSTOM) {
            // HIDE CUSTOM TITLE BACKGROUND INPUT
            document.getElementById(element_ids.CUSTOM_BACKGROUND_DIV).hidden = true;

            // SET BACKGROUND
            set_title_background(background_image_name);

            // SAVE PREFERRED BACKGROUND TO LOCALSTORAGE
            if (typeof(Storage) !== "undefined") {
                if (background_image_name === default_background) {
                    // REMOVE LOCALSTORAGE SAVED DATA IF BACKGROUND IS CHANGED TO DEFAULT
                    if (localStorage.getItem(LOCALSTORAGE_KEY) !== null) {
                        save_background_data("-");
                    }
                }
                else {
                    // SAVE DESIRED BACKGROUND TO LOCALSTORAGE
                    save_background_data(background_image_name, "");
                }
            }
        }
        else {
            // SHOW CUSTOM TITLE BACKGROUND INPUT
            document.getElementById(element_ids.CUSTOM_BACKGROUND_DIV).hidden = false;
            let custom_background_url = document.getElementById(element_ids.CUSTOM_BACKGROUND_INPUT).value;
            if (typeof(Storage) !== "undefined") {
                // SAVE DESIRED BACKGROUND ('CUSTOM') TO LOCALSTORAGE
                save_background_data(background_image_name, (custom_background_url === "" ? "-" : custom_background_url));
            }

            // SET CUSTOM BACKGROUND ; IF IT DOES NOT EXIST THEN USE DEFAULT INSTEAD
            if (custom_background_url !== "") {
                set_custom_title_background(custom_background_url);
            }
            else {
                set_title_background(default_background);
            }
        }
    }

    /**
     * HELPER FUNCTION ; SETS THE TITLE BACKGROUND TO A priconne-quest-helper BACKGROUND.
     *
     * @param {string}    image_name    IMAGE NAME OF THE BACKGROUND TO USE ; i.e. "miyako" TO USE "images/webpage/backgrounds/miyako.png".
     */
    function set_title_background(image_name) {
        document.getElementById(element_ids.TITLE_DIV).style.backgroundImage = "url('" + webpage.get_webpage_image_path("backgrounds/" + image_name) + "')";
    }

    /**
     * HELPER FUNCTION ; SETS THE TITLE BACKGROUND TO A CUSTOM USER-PROVIDED BACKGROUND USING AN IMAGE URL.
     *
     * @param {string}    image_url    IMAGE URL PROVIDED BY THE USER.
     */
    function set_custom_title_background(image_url) {
        document.getElementById(element_ids.TITLE_DIV).style.backgroundImage = "url('" + image_url + "')";
    }

    /**
     * SAVE TITLE BACKGROUND DATA TO LOCALSTORAGE.
     * IF TITLE BACKGROUND DATA IS EMPTY, DELETE IT FROM LOCALSTORAGE.
     * TITLE BACKGROUND DATA IS CLASSIFIED AS EMPTY IF:
     *      - background_data.background === ""
     *      - background_data.custom_background === ""
     *      - background_data.hover_disabled === false
     *
     * @param {string}    background           BACKGROUND IMAGE NAME TO BE SAVED, IF SET AS "-", SET BACKGROUND AS "" (EMPTY / UNSAVED).
     * @param {string}    custom_background    CUSTOM BACKGROUND IMAGE URL TO BE SAVED, IF SET AS "-", SET CUSTOM BACKGROUND AS "" (EMPTY / UNSAVED).
     */
    function save_background_data(background = "", custom_background = "") {
        let save_hover_only = background === "" && custom_background === "";
        let background_data = {
            background: "",
            custom_background: "",
            hover_disabled: document.getElementById(element_ids.HOVER_DISABLE_CHECKBOX).checked
        };

        // RESTORE OLD DATA
        const bg_ls = get_background_data();

        if (bg_ls !== null) {
            if (bg_ls[tags.BACKGROUND] !== "") {background_data[tags.BACKGROUND] = bg_ls[tags.BACKGROUND];}
            if (bg_ls[tags.CUSTOM_BACKGROUND] !== "") {background_data[tags.CUSTOM_BACKGROUND] = bg_ls[tags.CUSTOM_BACKGROUND];}
        }

        // SET NEW DATA
        if (!save_hover_only) {
            if (background !== "") { background_data[tags.BACKGROUND] = (background === "-" ? "" : background); }
            if (custom_background !== "") { background_data[tags.CUSTOM_BACKGROUND] = (custom_background === "-" ? "" : custom_background); }
        }

        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(background_data));

        // EDIT TITLE HOVER STATUS IF NEEDED
        disable_title_hover(background_data[tags.HOVER_DISABLED]);

        // DELETE BACKGROUND DATA IF EMPTY
        if (is_background_data_empty(background_data)) {
            localStorage.removeItem(LOCALSTORAGE_KEY);
        }
    }

    /**
     * GET BACKGROUND DATA FROM LOCALSTORAGE.
     * @return {Object} BACKGROUND DATA.
     */
    function get_background_data() {
        return JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    }

    /**
     * CHECK IF BACKGROUND DATA PROVIDED IS EMPTY AND RETURN A BOOLEAN OF THE STATUS.
     * TITLE BACKGROUND DATA IS CLASSIFIED AS EMPTY IF:
     *      - background_data.background === ""
     *      - background_data.custom_background === ""
     *      - background_data.hover_disabled === false
     *
     * @param {Object}    background_data    BACKGROUND DATA OBJECT TO BE CHECKED.
     * @return {boolean} RETURNS TRUE IF "EMPTY".
     */
    function is_background_data_empty(background_data = null) {
        const bg_ls = (background_data !== null ? background_data : JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
        return bg_ls[tags.BACKGROUND] === "" && bg_ls[tags.CUSTOM_BACKGROUND] === "" && !bg_ls[tags.HOVER_DISABLED];
    }

    /**
     * DISABLE THE HOVER FUNCTIONALITY OF #title-div BY ADDING THE .no-hover CSS CLASS.
     *
     * @param {boolean}    disabled    IF TRUE, HOVER FUNCTIONALITY WILL BE DISABLED.
     */
    function disable_title_hover(disabled) {
        if (disabled) {document.getElementById(element_ids.TITLE_DIV).classList.add("no-hover");}
        else {document.getElementById(element_ids.TITLE_DIV).classList.remove("no-hover");}
    }

    return {
        init: init,
        change_background: change_background,
        save_background_data: save_background_data
    }
})();
const presets = (function () {
    const element_id = Object.freeze({
        LIST_SELECT: "character-preset-list-select",
        GRID_DISPLAY: "preset-grid-display",
        UNIT_IMAGE: "preset-character-image",
        UNIT_NAME_LABEL: "preset-character-name-label",
        LOAD_BUTTON: "preset-character-load-button",
        LOAD_AND_CREATE_BUTTON: "preset-character-load-and-create-project-button",
        MIN_RANK_INPUT: "preset-character-min-rank-input",
        MAX_RANK_INPUT: "preset-character-max-rank-input",
        PRESET_ITEMS_DIV: "preset-items-div",
        PRESET_ITEMS_RANK_LABEL: "preset-items-rank-label",
        PRESET_ITEMS_RANK_SELECT: "preset-items-rank-select",
        RANK_BUTTONS: "preset-items-rank-buttons",
        NEXT_RANK_BUTTON: "preset-items-next-rank-button",
        PREV_RANK_BUTTON: "preset-items-previous-rank-button",
        SETTINGS: "character-preset-settings",
        GRID: "character-preset-grid",
        PRESETS_CONTAINER: "presets-container",
        BULK_MODE_BUTTON: "preset-bulk-mode-button",
        BULK_SETTINGS: "preset-bulk-settings",
        SINGLE_SETTINGS: "preset-single-settings"
    });
    let data = {
        PRESET_MIN_RANK: 1,     // LOWEST RANK YOU CAN SELECT IN PRESETS
        PRESET_MAX_RANK: 1,     // HIGHEST RANK YOU CAN SELECT IN PRESETS
        PRESET_ITEMS_RANK: 1    // CURRENT SELECTED RANK IN PRESETS:SINGLE MODE
    };
    const DEFAULT_VALUE = "default_character";

    /**
     * CONSTRUCTS THE UNIT LIST SELECT AND GRID.
     * IF ENGLISH IS NOT THE WEBPAGE LANGUAGE, UNIT SELECT WILL BE SORTED ALPHABETICALLY.
     */
    function build() {
        const char_json = character_data.data();
        const grid_elem = document.getElementById(element_id.GRID_DISPLAY);
        let list_html = "<option value=\"" + DEFAULT_VALUE + "\">" + (webpage.language.is_english() ?
            "[Character...]" :
            webpage.language.data()[webpage.language.tags.PRESETS_TAB]["characters_select_option"]) +
            "</option>";
        function append_grid_elem(unit_key) {
            let grid_entry = document.createElement("i");
            grid_entry.classList.add("preset-grid-entry", "unit-sprite", webpage.get_unit_sprite_class(unit_key));
            grid_entry.onclick = function () {
                document.getElementById(element_id.LIST_SELECT).value = unit_key;
                update_details();
                toggle_grid_display();
                document.getElementById(element_id.PRESETS_CONTAINER).scrollIntoView();
            };
            grid_elem.appendChild(grid_entry);
        }

        grid_elem.innerHTML = "";
        if (webpage.language.is_english()) {
            // CHARACTER DATA IS ALREADY SORTED ALPHABETICALLY, CREATE LIST
            for (const char_id in char_json) {
                const char_data = char_json[char_id],
                      thematic_en = char_data[character_data.tags.THEMATIC],
                      thematic_jp = char_data[character_data.tags.THEMATIC_JP],
                      char_en = char_data[character_data.tags.NAME] + (thematic_en !== "" ? " (" + thematic_en + ")" : ""),
                      char_jp = char_data[character_data.tags.NAME_JP] + (thematic_jp !== "" ? "（" + thematic_jp + "）" : "");
                list_html += "<option value=\"" + char_id + "\">" + char_en + " | " + char_jp + "</option>";
                append_grid_elem(char_id);
            }
        }
        else {
            // DIFFERENT WEBPAGE LANGUAGE IS USED, SORT ALPHABETICALLY!
            let sorted = {},
                char_thematics = {};

            for (const char_id in char_json) {
                const char_data = char_json[char_id],
                      name = char_data[character_data.tags.NAME].toLowerCase(),
                      thematic = char_data[character_data.tags.THEMATIC].replace(' ', '_').toLowerCase(),
                      char_translated = webpage.language.data()[webpage.language.tags.CHARACTER_NAMES][name];

                if (thematic !== "") {
                    if (char_thematics[name] === undefined) {
                        char_thematics[name] = [];
                    }
                    char_thematics[name].push(char_id);

                    // CHECK IF THERE IS A BASE VERSION OF THE CHARACTER, IF NOT THEN ADD ONE
                    // THIS IS TO DEAL WITH CHARACTERS LIKE 'Mio (Deresute)' AND 'Uzuki (Deresute)'
                    // CHARACTER NAME IS SAVED IN PLACE OF char_data TO PULL UP THEMATICS LATER
                    if (!sorted.hasOwnProperty(char_translated)) {
                        sorted[char_translated] = name;
                    }
                }
                else {
                    sorted[char_translated] = char_data;
                }
            }
            let sorted_temp = {};
            Object.keys(sorted).sort().map(i => [i, sorted[i]])
                .forEach(function (char) {
                    sorted_temp[char[0]] = char[1];
                });
            sorted = sorted_temp;

            // BUILD LIST
            for (const char_name in sorted) {
                const char_data = sorted[char_name];

                // IGNORE IF char_data IS A STRING (MEANING NO BASE VERSION EXISTS)
                // THIS IS TO ACCOUNT FOR CHARACTERS THAT DON'T HAVE A BASE VERSION
                // SUCH AS 'Mio (Deresute)' AND 'Uzuki (Deresute)'
                let name;
                if (!((typeof char_data) === 'string')) {
                    // char_data IS NOT A STRING ; BASE VERSION EXISTS
                    name = char_data[character_data.tags.NAME].toLowerCase();

                    // ADD BASE VERSION TO LIST
                    list_html += get_list_html(char_data);
                    append_grid_elem(char_data[character_data.tags.NAME].toLowerCase());
                }
                else {
                    // char_data IS A STRING (CHAR NAME) ; BASE VERSION DOES NOT EXIST
                    name = char_data;
                }

                // CHECK THEMATICS
                const thematics_array = char_thematics[name];
                if (thematics_array !== undefined) {
                    for (let i = 0, j = thematics_array.length ; i < j ; i++) {
                        list_html += get_list_html(char_json[thematics_array[i]]);
                        append_grid_elem(thematics_array[i]);
                    }
                }
            }

            /**
             * HELPER FUNCTION ; RETURNS OPTION HTML FROM THE GIVEN char_data.
             *
             * @param {Object}    char_data    CHARACTER DATA.
             * @return {string} <option> HTML FOR CHARACTER PRESETS SELECT LIST.
             */
            function get_list_html(char_data) {
                const name = char_data[character_data.tags.NAME],
                    thematic = char_data[character_data.tags.THEMATIC],
                    thematic_key = thematic.replace(' ', '_').toLowerCase(),
                    is_thematic_exists = thematic !== "",
                    id = (is_thematic_exists ? thematic_key + "_" : "") + name.toLowerCase(),
                    char_en = name + (is_thematic_exists ? " (" + thematic + ")" : ""),
                    lang_data = webpage.language.data();
                let char_translated = lang_data[webpage.language.tags.CHARACTER_NAMES][name.toLowerCase()] +
                        (is_thematic_exists ? " (" + lang_data[webpage.language.tags.THEMATICS][thematic_key] + ")" : "");

                // USE （）IF JAPANESE
                if (webpage.language.current() === webpage.language.option.JAPANESE) {
                    char_translated = char_translated.replace(' (', '（').replace(')', '）');
                }

                return "<option value=\"" + id + "\">" + char_translated + " | " + char_en + "</option>";
            }
        }

        document.getElementById(element_id.LIST_SELECT).innerHTML = list_html;
        update_rank_select();
    }

    /**
     * LOADS THE ITEMS WITHIN THE DEFINED PRESETS MIN/MAX RANK AND UPDATES THE DATA DISPLAY.
     * USUALLY CALLED VIA THE "Load Items" BUTTON ON THE DOCUMENT.
     */
    function load_preset() {
        const selected = document.getElementById(element_id.LIST_SELECT).value;

        // GET ALL ITEMS IN SPECIFIED RANKS
        let merged_items = {};
        for (let i = (data.PRESET_MIN_RANK - 1), j = data.PRESET_MAX_RANK ; i < j ; i++) {
            const rank_items = character_data.data()[selected][character_data.tags.RANK + (i + 1)];
            rank_items.forEach(function (item_name) {
                if (item_name !== "") {
                    merged_items[item_name] = (merged_items.hasOwnProperty(item_name) ?
                        merged_items[item_name] + 1 :
                        1);
                }
            });
        }

        // CLEAR OFF ITEM TABLE AND APPLY ITEMS
        data_display.item_table.clear();
        const equip_data = equipment_data.data();
        for (const item_name in merged_items) {
            document.getElementById(equip_data[item_name][equipment_data.tags.ID] + "-amt").value = merged_items[item_name];
        }
        data_display.build();
        webpage.print("Loaded " + selected + "'s equipment for rank " + data.PRESET_MIN_RANK + " - " + data.PRESET_MAX_RANK);
    }

    /**
     * DOES EVERYTHING load_preset() DOES EXCEPT ALSO CREATES/SAVES A PROJECT.
     * PROJECT NAME WILL BE "{character_name} [{min_rank} - {max_rank}]".
     * IF A PROJECT WITH THIS NAME ALREADY EXISTS, AN ALTERNATE NAME WILL BE FOUND AND USED INSTEAD.
     * USUALLY CALLED VIA THE "Load Items and Create Project" BUTTON.
     */
    function load_preset_and_save() {
        load_preset();

        const suffix = " [" + (data.PRESET_MIN_RANK === data.PRESET_MAX_RANK ?
                  data.PRESET_MIN_RANK :
                  data.PRESET_MIN_RANK + " - " + data.PRESET_MAX_RANK) + "]",
              selected = document.getElementById(element_id.LIST_SELECT).value;
        let project_name,
            formal_name = character_data.formal_name(selected);
        if (webpage.language.is_english()) {
            project_name = formal_name;
        }
        else {
            const char_data = character_data.data(),
                  char_name = char_data[selected][character_data.tags.NAME].toLowerCase(),
                  char_thematic = char_data[selected][character_data.tags.THEMATIC].replace(' ', '_').toLowerCase(),
                  is_thematic_exists = char_thematic !== "",
                  lang_data = webpage.language.data();
            let translated_name = lang_data[webpage.language.tags.CHARACTER_NAMES][char_name] + (is_thematic_exists ?
                " (" + lang_data[webpage.language.tags.THEMATICS][char_thematic] + ")" :
                "");
            if (webpage.language.current() === webpage.language.option.JAPANESE) {
                translated_name = translated_name.replace(' (', '（').replace(')', '）');
            }
            project_name = translated_name;
        }

        // CHECK IF NAME EXISTS
        const projects_list = projects.get();
        if (projects_list.hasOwnProperty(project_name)) {
            let counter = 2;
            while (true) {
                if (projects_list.hasOwnProperty(project_name + " (" + counter + ")")) {
                    counter++;
                    continue;
                }
                break;
            }
            project_name += " (" + counter + ")";
        }

        project_name += suffix;
        document.getElementById(projects.element_id.NAME_INPUT).value = project_name;
        projects.save();
    }

    /**
     * UPDATE ALL DETAILS IN PRESETS (UNIT IMAGE, NAME, MIN/MAX INPUTS, ETC).
     * IF "[Characters...]" IS SELECTED THEN DISABLE INPUTS/BUTTONS.
     * OTHERWISE, ENABLE EVERYTHING AND SET TO THE APPROPRIATE IMAGE/NAME.
     */
    function update_details() {
        const selected_char = document.getElementById(element_id.LIST_SELECT).value,
              unit_img_elem = $("#" + element_id.UNIT_IMAGE),
              unit_name_elem = $("#" + element_id.UNIT_NAME_LABEL),
              load_button_elem = $("#" + element_id.LOAD_BUTTON),
              load_and_create_elem = $("#" + element_id.LOAD_AND_CREATE_BUTTON),
              min_rank_elem = $("#" + element_id.MIN_RANK_INPUT),
              max_rank_elem = $("#" + element_id.MAX_RANK_INPUT),
              preset_items_elem = $("#" + element_id.PRESET_ITEMS_DIV),
              preset_items_rank_elem = $("#" + element_id.PRESET_ITEMS_RANK_LABEL),
              next_rank_button = $("#" + element_id.NEXT_RANK_BUTTON),
              prev_rank_button = $("#" + element_id.PREV_RANK_BUTTON);


        if (selected_char === DEFAULT_VALUE) {
            // SET PLACEHOLDER VALUES SINCE SELECTED DEFAULT VALUE
            unit_img_elem.attr("src", webpage.get_unit_icon_image_path(""));
            unit_name_elem.empty();
            load_button_elem.attr("disabled", true);
            load_and_create_elem.attr("disabled", true);
            min_rank_elem.attr("disabled", true);
            max_rank_elem.attr("disabled", true);
            clear_preset_items();
            preset_items_elem.addClass("grayscale");
            preset_items_rank_elem.addClass("grayscale");
            next_rank_button.attr("disabled", true);
            prev_rank_button.attr("disabled", true);
        }
        else if (character_data.is_character_exists(selected_char)){
            // SETUP DETAILS
            const char_data = character_data.data(),
                  char_name = char_data[selected_char][character_data.tags.NAME],
                  char_thematic = char_data[selected_char][character_data.tags.THEMATIC],
                  is_thematic_exists = char_thematic !== "",
                  char_image = (is_thematic_exists ? char_thematic + "_" + char_name : char_name).split(' ').join('_');
            let char_thematic_tl, char_tl;

            if (webpage.language.is_english()) {
                char_thematic_tl = char_data[selected_char][character_data.tags.THEMATIC_JP];
                char_tl = char_data[selected_char][character_data.tags.NAME_JP] + (is_thematic_exists ? " (" + char_thematic_tl + ")" : "");
            }
            else {
                const tl_name = char_name.toLowerCase(),
                    tl_thematic = char_thematic.replace(' ', '_').toLowerCase(),
                    lang_data = webpage.language.data();
                char_thematic_tl = lang_data[webpage.language.tags.THEMATICS][tl_thematic];
                char_tl = lang_data[webpage.language.tags.CHARACTER_NAMES][tl_name] + (is_thematic_exists ? " (" + char_thematic_tl + ")" : "");

                // USE （）IF JP
                if (webpage.language.current() === webpage.language.option.JAPANESE) {
                    char_tl = char_tl.replace(' (', '（').replace(')', '）');
                }
            }

            unit_img_elem.attr("src", webpage.get_unit_icon_image_path(char_image));
            unit_name_elem.html(webpage.language.is_english() ?
                (is_thematic_exists ?
                    char_name + " (" + char_thematic + ")" :
                    char_name) +
                "<br>" + char_tl :
                char_tl + "<br>" + (is_thematic_exists ?
                                        char_name + " (" + char_thematic + ")" :
                                        char_name));
            load_button_elem.attr("disabled", false);
            load_and_create_elem.attr("disabled", false);
            min_rank_elem.attr("disabled", false);
            max_rank_elem.attr("disabled", false);
            preset_items_elem.removeClass("grayscale");
            preset_items_rank_elem.removeClass("grayscale");
            prev_rank_button.attr("disabled", false);
            next_rank_button.attr("disabled", false);

            get_preset_items();
        }
    }

    /**
     * ERROR CHECKS THE MIN RANK INPUT AND SAVES IT.
     */
    function change_min_rank() {
        const min_value_elem = document.getElementById(element_id.MIN_RANK_INPUT),
              max_value = min_value_elem.max,
              min_value = min_value_elem.min;
        data.PRESET_MIN_RANK = Math.round(min_value_elem.value);
        if (data.PRESET_MIN_RANK > max_value) {
            min_value_elem.value = data.PRESET_MIN_RANK = max_value;
        }
        if (data.PRESET_MIN_RANK > data.PRESET_MAX_RANK) {
            min_value_elem.value = data.PRESET_MIN_RANK = data.PRESET_MAX_RANK;
        }
        if (data.PRESET_MIN_RANK < min_value) {
            min_value_elem.value = data.PRESET_MIN_RANK = min_value;
        }
        webpage.print("Minimum Rank changed to " + data.PRESET_MIN_RANK, "Presets");
    }

    /**
     * ERROR CHECKS THE MAX RANK INPUT AND SAVES IT.
     */
    function change_max_rank() {
        const max_value_elem = document.getElementById(element_id.MAX_RANK_INPUT),
              max_value = max_value_elem.max,
              min_value = max_value_elem.min;
        data.PRESET_MAX_RANK = Math.round(max_value_elem.value);
        if (data.PRESET_MAX_RANK > max_value) {
            max_value_elem.value = data.PRESET_MAX_RANK = max_value;
        }
        if (data.PRESET_MAX_RANK < min_value) {
            max_value_elem.value = data.PRESET_MAX_RANK = min_value;
        }
        if (data.PRESET_MAX_RANK < data.PRESET_MIN_RANK) {
            max_value_elem.value = data.PRESET_MAX_RANK = data.PRESET_MIN_RANK;
        }
        webpage.print("Maximum Rank changed to " + data.PRESET_MAX_RANK, "Presets");
    }

    /**
     * SWITCH BETWEEN VISIBILITY OF GRID SEARCH MODE OR NOT.
     */
    function toggle_grid_display() {
        const settings_elem = document.getElementById(element_id.SETTINGS),
              grid_elem = document.getElementById(element_id.GRID);
        settings_elem.hidden = !settings_elem.hidden;
        grid_elem.hidden = !grid_elem.hidden;
    }

    /**
     * SWITCH BETWEEN VISIBILITY OF BULK MODE OR SINGLE MODE.
     */
    function toggle_bulk_mode() {
        const button = document.getElementById(element_id.BULK_MODE_BUTTON),
              bulk_settings = document.getElementById(element_id.BULK_SETTINGS),
              single_settings = document.getElementById(element_id.SINGLE_SETTINGS);
        button.classList.toggle("low-opacity");
        bulk_settings.hidden = !bulk_settings.hidden;
        single_settings.hidden = !single_settings.hidden;
    }

    /**
     * ADDS 1 OF AN ITEM TO THE ITEM TABLE AND UPDATES DATA DISPLAY.
     *
     * @param {string}    item_name    ITEM NAME IN ENGLISH TO ADD ; i.e. IRON BLADE = "Iron Blade".
     */
    function add_preset_item(item_name) {
        if (item_name !== "") {
            document.getElementById(equipment_data.data()[item_name][equipment_data.tags.ID] + "-amt").value++;
            data_display.build();
        }
    }

    /**
     * CHANGE THE PRESET ITEM ELEMENTS TO THE CORRECT IMAGE AND TITLE.
     * IF NO ITEM EXISTS IN A SLOT, A PLACEHOLDER IMAGE WILL BE USED INSTEAD.
     */
    function get_preset_items() {
        const selected = document.getElementById(element_id.LIST_SELECT).value;
        if (selected !== DEFAULT_VALUE) {
            let counter = 1;
            character_data.data()[selected][character_data.tags.RANK + data.PRESET_ITEMS_RANK].forEach(function (item_name) {
                const item_elem = document.getElementById("preset-item-" + counter++),
                      plus_elem = item_elem.querySelector("img");
                if (item_elem.title !== "") {
                    item_elem.classList.remove(webpage.get_item_sprite_class(item_elem.title));
                }
                if (item_name !== "") {
                    item_elem.classList.add(webpage.get_item_sprite_class(item_name));
                }
                item_elem.title = item_name;
                plus_elem.style = (item_name === "" ? "opacity: 0;" : "");
            });
        }
    }

    /**
     * RESETS ALL PRESET ITEM ELEMENTS BACK TO THE DEFAULT STATE.
     * PLACEHOLDER IMAGES WILL BE USED, TITLE IS CLEARED, AND PLUS ICON IMAGE VISIBILITY IS HIDDEN.
     */
    function clear_preset_items() {
        for (let i = 1 ; i <= 6 ; i++) {
            const elem = document.getElementById("preset-item-" + i);
            elem.classList.remove(webpage.get_item_sprite_class(elem.title));
            elem.title = "";
            elem.querySelector("img").style = "opacity: 0;";
        }
    }

    /**
     * GO FORWARD TO THE NEXT PRESET ITEMS RANK.
     * THE PRESET ITEMS RANK CANNOT GO BEYOND THE CURRENT CHARACTER DATA'S MAX RANK.
     */
    function next_rank() {
        if ((data.PRESET_ITEMS_RANK + 1) <= character_data.max_rank()) {
            data.PRESET_ITEMS_RANK++;
            get_preset_items();
            update_rank_label();
            document.getElementById(element_id.PRESET_ITEMS_RANK_SELECT).value = data.PRESET_ITEMS_RANK + "";
        }
    }

    /**
     * GO TO THE PREVIOUS PRESET ITEMS RANK.
     * THE PRESET ITEMS RANK CANNOT GO BELOW 1.
     */
    function previous_rank() {
        if ((data.PRESET_ITEMS_RANK - 1) >= 1) {
            data.PRESET_ITEMS_RANK--;
            get_preset_items();
            update_rank_label();
            document.getElementById(element_id.PRESET_ITEMS_RANK_SELECT).value = data.PRESET_ITEMS_RANK + "";
        }
    }

    /**
     * ENABLES THE VISIBILITY OF THE RANK SELECT.
     * THIS FUNCTION IS USUALLY CALLED BY CLICKING ON THE RANK LABEL.
     */
    function open_rank_select() {
        if (document.getElementById(element_id.LIST_SELECT).value !== DEFAULT_VALUE) {
            $("#" + element_id.PRESET_ITEMS_RANK_SELECT).show();
            $("#" + element_id.PRESET_ITEMS_RANK_LABEL).hide();
            $("#" + element_id.RANK_BUTTONS).hide();
        }
    }

    /**
     * DISABLE THE VISIBILITY OOF THE RANK SELECT AND LOAD THE ITEMS SELECTED.
     * THIS FUNCTION IS USUALLY CALLED AFTER A DIFFERENT RANK IS SELECTED.
     */
    function close_rank_select() {
        data.PRESET_ITEMS_RANK = parseInt(document.getElementById(element_id.PRESET_ITEMS_RANK_SELECT).value);
        get_preset_items();
        update_rank_label();
        $("#" + element_id.PRESET_ITEMS_RANK_SELECT).hide();
        $("#" + element_id.PRESET_ITEMS_RANK_LABEL).show();
        $("#" + element_id.RANK_BUTTONS).show();
        document.getElementById(element_id.PRESETS_CONTAINER).scrollIntoView();
    }

    /**
     * UPDATES THE PRESET SINGLE MODE RANK LABEL WITH THE APPROPRIATE RANK NUMBER AND RANK COLOR.
     */
    function update_rank_label() {
        const elem = document.getElementById(element_id.PRESET_ITEMS_RANK_LABEL);
        elem.innerHTML = "Rank " + data.PRESET_ITEMS_RANK;
        elem.className = "";
        elem.classList.add(get_rank_color_class(data.PRESET_ITEMS_RANK));
    }

    /**
     * UPDATES THE PRESET SINGLE MODE RANK SELECT WITH THE AVAILABLE RANK OPTIONS.
     */
    function update_rank_select() {
        let html = "";
        for (let i = 1, j = character_data.max_rank() ; i <= j ; i++) {
            html += "<option class\"preset-items-rank-option\" value=\"" + i + "\">Rank " + i + "</option>";
        }
        $("#" + element_id.PRESET_ITEMS_RANK_SELECT).html(html);
    }

    /**
     * HELPER FUNCTION ; SETS THE PRESET MAX RANK.
     *
     * @param {number}    value    NEW PRESET MAX RANK VALUE.
     */
    function set_max_rank(value) {
        data.PRESET_MAX_RANK = value;
    }

    /**
     * HELPER FUNCTION ; SETS THE PRESET ITEMS RANK.
     *
     * @param {number}    value    NEW PRESET ITEMS RANK VALUE.
     */
    function set_items_rank(value) {
        data.PRESET_ITEMS_RANK = value;
    }

    /**
     * UPDATES THE RANK INPUTS AND THEIR MAX VALUES.
     * THIS SHOULD BE CALLED AFTER YOU SWITCH BETWEEN CURRENT AND LEGACY CHARACTER DATA.
     */
    function adjust_max() {
        const max_value = character_data.max_rank(),
              min_rank_input = document.getElementById(element_id.MIN_RANK_INPUT),
              max_rank_input = document.getElementById(element_id.MAX_RANK_INPUT);
        min_rank_input.max = max_rank_input.max = max_value;
        if (min_rank_input.value > max_value) {
            min_rank_input.value = data.PRESET_MIN_RANK = max_value;
        }
        if (max_rank_input.value > max_value) {
            max_rank_input.value = data.PRESET_MAX_RANK = max_value;
        }
    }

    /**
     * HELPER FUNCTION ; RETURNS A RANK COLOR CLASS.
     * THIS SHOULD BE UPDATED WHEN THERE'S A NEW CHARACTER RANK.
     *
     * @param {number}    rank    CHARACTER RANK TO GET THE COLOR CLASS OF.
     * @return {string} THE COLOR CLASS OF THE GIVEN RANK.
     */
    function get_rank_color_class(rank) {
        switch (rank) {
            case 1:
                return "text-color_common";
            case 2:
            case 3:
                return "text-color_copper";
            case 4:
            case 5:
            case 6:
                return "text-color_silver";
            case 7:
            case 8:
            case 9:
            case 10:
                return "text-color_gold";
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
                return "text-color_purple";
            case 18:
            case 19:
            case 20:
                return "text-color_red";
            case 21:
                return "text-color_green";
            default:
                return "text-color_misc";
        }
    }

    function get_data() {
        return data;
    }

    return {
        build: build,
        load: load_preset,
        load_and_save: load_preset_and_save,
        update_details: update_details,
        update_rank_label: update_rank_label,
        change_max_rank: change_max_rank,
        change_min_rank: change_min_rank,
        open_rank_select: open_rank_select,
        close_rank_select: close_rank_select,
        add_preset_item: add_preset_item,
        next_rank: next_rank,
        previous_rank: previous_rank,
        set_max_rank: set_max_rank,
        set_items_rank: set_items_rank,
        toggle_grid_display: toggle_grid_display,
        toggle_bulk_mode: toggle_bulk_mode,
        adjust_max: adjust_max,
        data: get_data,
        DEFAULT_VALUE: DEFAULT_VALUE,
        element_id: element_id
    }
})();
const projects = (function () {
    const blacklist = (function () {
        const element_id = Object.freeze({
            LOAD_BUTTON: "blacklist-load-button",
            SAVED_SELECT: "saved-projects-select"
        });
        const classes = Object.freeze({
            LOW_OPACITY: "low-opacity",
        });
        const LOCALSTORAGE_KEY = "blacklist";
        let list = [];

        /**
         * INITIALIZES THE BLACKLIST BY GETTING DATA FROM LOCALSTORAGE.
         * THIS CAN ALSO BE USED AS A "LOAD BLACKLIST" FUNCTION.
         */
        function init() {
            if (typeof(Storage) !== "undefined") {
                const localstorage_data = localStorage.getItem(LOCALSTORAGE_KEY);
                if (localstorage_data !== null) {
                    let title = "";
                    const saved_data = JSON.parse(localstorage_data);
                    clean();
                    for (let i = 0, j = saved_data.length ; i < j ; i++) {
                        const item_name = saved_data[i];
                        const elem = document.getElementById("request-button-" + item_name.split(' ').join('_'));
                        list.push(item_name);
                        if (elem) {
                            elem.classList.add(classes.LOW_OPACITY);
                        }
                        title += item_name + "\n";
                    }
                    data_display.quests.refresh();
                    update_list();
                    disable_complete_project_button(undefined, true);

                    $("#" + element_id.LOAD_BUTTON).attr("title", (saved_data.length > 0 ? title : "The saved blacklist is empty."));
                    webpage.print("User blacklist has been loaded!", "Blacklist");
                }
            }
        }

        /**
         * SAVES THE BLACKLIST TO LOCALSTORAGE.
         */
        function save() {
            if (list.length > 0) {
                const localstorage_data = JSON.stringify(list);
                localStorage.setItem(LOCALSTORAGE_KEY, localstorage_data);
                let title = "";
                for (let i = 0, j = list.length ; i < j ; i++) {
                    title += list[i] + "\n";
                }
                $("#" + element_id.LOAD_BUTTON).attr("title", (list.length > 0 ? title : "The saved blacklist is empty."));

                print_toast("The item blacklist has been saved!", "blacklist_saved");
                webpage.print("The blacklist has been saved.", "Blacklist");
            }
        }

        /**
         * REMOVES EVERYTHING IN THE BLACKLIST AND THEN UPDATES THE DOCUMENT.
         */
        function clear() {
            if (list.length > 0) {
                clean();

                data_display.quests.refresh();
                update_list();
                disable_complete_project_button(false);

                print_toast("The item blacklist has been cleared!", "blacklist_cleared");
                webpage.print("The blacklist has been cleared.", "Blacklist");
            }
            else {
                print_toast("The item blacklist is empty.", "blacklist_empty", false);
                webpage.print("The blacklist is already empty.", "Blacklist");
            }
        }

        /**
         * AKA DELETE BLACKLIST.
         * DELETES THE BLACKLIST FROM LOCALSTORAGE IF IT EXISTS.
         */
        function remove() {
            if (localStorage.getItem(LOCALSTORAGE_KEY) !== null) {
                localStorage.removeItem(LOCALSTORAGE_KEY);
                $("#" + element_id.LOAD_BUTTON).attr("title", "The saved blacklist is empty.");
                print_toast("The item blacklist has been deleted!", "blacklist_deleted");
                webpage.print("The blacklist has been deleted.", "Blacklist");
            }
            else {
                print_toast("There is no saved item blacklist.", "no_saved_blacklist", false);
                webpage.print("There is no saved blacklist.", "Blacklist");
            }
        }

        /**
         * TOGGLES AN ITEM TO BE ENABLED OR DISABLED IN THE BLACKLIST.
         *
         * @param {string}    item_name    ITEM NAME IN ENGLISH TO BE ENABLED OR DISABLED ; i.e. "Iron Blade".
         * @return {boolean} RETURNS TRUE IF THE ITEM IS ENABLED AFTER THE FUNCTION IS COMPLETE.
         */
        function toggle_item(item_name) {
            item_name = equipment_data.apostrophe.REVERT(item_name);
            const is_disabled = list.includes(item_name);
            if (is_disabled) {
                // ENABLE ITEM
                const index = list.indexOf(item_name);
                if (index > -1) {
                    list.splice(index, 1);
                }
            }
            else {
                // DISABLE ITEM
                list.push(item_name);
            }
            data_display.quests.refresh();
            update_list();
            disable_complete_project_button(undefined, true);
            document.getElementById("request-button-" + item_name.split(' ').join('_')).classList.toggle("low-opacity");
            return !is_disabled;
        }

        /**
         * REMOVES THE ITEM FROM THE BLACKLIST.
         *
         * @param {string}    item_name    ITEM NAME IN ENGLISH TO BE REMOVED ; i.e. "Iron Blade".
         * @return {boolean} RETURNS TRUE IF THE ITEM HAS BEEN REMOVED, FALSE IF THE ITEM DOESN'T EXIST.
         */
        function remove_item(item_name) {
            if (list.includes(item_name)) {
                const index = list.indexOf(item_name);
                if (index > -1) {
                    list.splice(index, 1);
                }
                return true;
            }
            return false;
        }

        /**
         * CHECKS IF THE ITEM EXISTS IN THE BLACKLIST.
         *
         * @param {string}    item_name    ITEM NAME IN ENGLISH ; i.e. "Iron Blade".
         * @return {boolean} RETURNS TRUE IF THE ITEM IS IN THE BLACKLIST.
         */
        function is_item_exist(item_name) {
            return list.includes(item_name);
        }

        /**
         * HELPER FUNCTION USED TO EASILY PRINT TOASTS.
         * IF THE WEBPAGE IS NOT IN ENGLISH, DIFFERENT LANGUAGES WILL BE USED.
         *
         * @param {string}    en_string            MESSAGE TO DISPLAY ON THE TOAST IN ENGLISH.
         * @param {string}    language_key         KEY FROM THE LANGUAGE JSON FOR THE MESSAGE TO DISPLAY IF THE PAGE IS NOT IN ENGLISH.
         * @param {boolean}   [is_success=true]    IF TRUE, USE THE SUCCESS TOAST, OTHERWISE USE THE ERROR TOAST.
         */
        function print_toast(en_string, language_key, is_success = true) {
            if (webpage.language.is_english()) {
                if (is_success) {
                    toastr.success(en_string);
                }
                else {
                    toastr.error(en_string);
                }
            }
            else {
                if (is_success) {
                    toastr.success(webpage.language.data()[webpage.language.tags.TOASTS][language_key]);
                }
                else {
                    toastr.error(webpage.language.data()[webpage.language.tags.TOASTS][language_key]);
                }
            }
        }

        /**
         * EMPTIES OUT THE BLACKLIST AND UPDATES ANY ELEMENTS IN REQUIRED INGREDIENTS TO BE NON-OPAQUE IF THEY WERE.
         */
        function clean() {
            if (list.length > 0) {
                for (let i = 0, j = list.length ; i < j ; i++) {
                    const elem = document.getElementById("request-button-" + list[i].split(' ').join('_'));
                    if (elem) {
                        elem.classList.remove(classes.LOW_OPACITY);
                    }
                }
                list = [];
            }
        }

        /**
         * RETURNS THE BLACKLIST DATA.
         * @return {Array} CURRENT BLACKLIST.
         */
        function get_blacklist() {
            return list;
        }

        return {
            init: init,
            save: save,
            clear: clear,
            remove: remove,
            remove_item: remove_item,
            toggle: toggle_item,
            is_item_exist: is_item_exist,
            get: get_blacklist
        }
    })();

    const element_id = Object.freeze({
        NAME_INPUT: "project-name-input",
        SAVED_SELECT: "saved-projects-select",
        ADD_BUTTON: "project-add-button",
        SUB_BUTTON: "project-sub-button",
        PRIORITIZE_BUTTON: "prioritize-project-button",
        DEPRIORITIZE_BUTTON: "deprioritize-project-button",
        COMPLETE_BUTTON: "project-complete-button"
    });
    const LOCALSTORAGE_KEY = Object.freeze({
        PROJECTS: "projects",
        PRIORITY_PROJECTS: "priority_projects"
    });
    const project_symbol = Object.freeze({
        PRIORITY: "[★]",    // SYMBOL TO ADD BEFORE PRIORITIZED PROJECTS IN SAVED SELECT LIST
        COMPLETED: "[✔]"    // SYMBOL TO ADD BEFORE COMPLETED PROJECTS IN SAVED SELECT LIST
    });
    const ALL_PROJECTS = "[All Projects...]";
    let data = {
        projects: {},               // SAVED PROJECTS
        projects_priority: [],      // PRIORITIZED PROJECTS
        projects_completed: [],     // LIST OF COMPLETED PROJECTS
        items: [],                  // PRIORITIZED ITEMS (ITEM THAT EXISTS IN ANY PRIORITIZED PROJECT)
        items_compiled: false       // TO MAKE SURE THE PRIORITIZED ITEMS LIST IS COMPILED BEFORE DOING THINGS WITH IT
    };

    /**
     * INITIALIZE THE PROJECTS BY GETTING PROJECT AND PRIORITY PROJECT DATA FROM LOCALSTORAGE.
     * IF THEY EXIST, LOAD THE DATA AND UPDATE THE DOCUMENT IF NEEDED.
     */
    function init() {
        if (typeof(Storage) !== "undefined") {
            const ls_projects_data = localStorage.getItem(LOCALSTORAGE_KEY.PROJECTS);
            const ls_projects_priority_data = localStorage.getItem(LOCALSTORAGE_KEY.PRIORITY_PROJECTS);

            if (ls_projects_priority_data !== null) {
                data.projects_priority = JSON.parse(ls_projects_priority_data);
            }

            if (ls_projects_data !== null) {
                const obj_json_strings = JSON.parse(ls_projects_data);
                let project_data = {};
                for (const index in obj_json_strings) {
                    const info = obj_json_strings[index];
                    project_data[info[0]] = JSON.parse(info[1]);
                }
                data.projects = project_data;
                update_list();

                webpage.print("User projects have been loaded!", "Projects");
            }
        }
    }

    /**
     * SAVE THE CURRENT ITEMS IN ITEM TABLE AS A NEW PROJECT USING THE GIVEN NAME.
     * IF A PROJECT NAME IS EMPTY (HTML IS STRIPPED) THEN USE "Untitled".
     * THE PROJECT LIST IS THEN SORTED ALPHABETICALLY AND SAVED TO LOCALSTORAGE.
     * THE DOCUMENT IS UPDATED AFTER COMPLETION.
     */
    function save_project() {
        // GET PROJECT NAME STRIPPED OF HTML
        let tmp = document.createElement("DIV");
        tmp.innerHTML = document.getElementById(element_id.NAME_INPUT).value;
        let project_name = tmp.textContent || tmp.innerText || "";

        // IF project_name ISN'T GIVEN, FIGURE OUT WHICH DEFAULT NAME ("Untitled") TO USE
        if (project_name === "" || project_name === ALL_PROJECTS) {
            const default_name = "Untitled";
            if (data.projects.hasOwnProperty(default_name)) {
                let untitled_counter = 2;
                while (true) {
                    if (data.projects.hasOwnProperty(default_name + " (" + untitled_counter + ")")) {
                        untitled_counter++;
                    }
                    else {
                        break;
                    }
                }
                project_name = default_name + " (" + untitled_counter + ")";
            }
            else {
                project_name = default_name;
            }
        }

        // COMPILE PROJECT DATA AND SAVE TO PROJECTS
        const is_project_exists = data.projects.hasOwnProperty(project_name);
        let project_data = [];
        const equip_data = equipment_data.data();
        for (const item_name in equip_data) {
            let item_data = equip_data[item_name];
            const amount = document.getElementById(item_data[equipment_data.tags.ID] + "-amt").value;
            if (amount >= 1) {
                project_data.push([item_name, amount]);
            }
        }
        data.projects[project_name] = project_data;

        // SORT PROJECTS BY ALPHABET
        let sorted = {};
        Object.keys(data.projects).sort().map(i => [i, data.projects[i]])
            .forEach(function (project) {
                sorted[project[0]] = project[1];
            });
        data.projects = sorted;

        // SAVE PROJECT TO LOCALSTORAGE
        localStorage.setItem(LOCALSTORAGE_KEY.PROJECTS, get_project_string());

        // UPDATE DOCUMENT
        update_list();
        document.getElementById(element_id.SAVED_SELECT).value = project_name;
        disable_add_and_sub_buttons(false);
        disable_complete_project_button(data.projects_completed.includes(project_name));
        show_prioritize_button(true);
        build_priority_items();

        // PRINT RESULT TO USER
        if (webpage.language.is_english()) {
            toastr.success("Project \"" + project_name + "\" has been " + (is_project_exists ? "overwritten!" : "saved!"));
        }
        else {
            let lang_json = webpage.language.data()[webpage.language.tags.TOASTS];
            let translated_toast = lang_json["project_saved"];
            translated_toast = translated_toast.replace("${project_name}", project_name);
            translated_toast = translated_toast.replace("${status}", (is_project_exists ?
                lang_json["overwritten_status"] :
                lang_json["saved_status"]));
            toastr.success(translated_toast);
        }
        webpage.print("Project " + project_name + " has been saved", "Projects");
    }

    /**
     * LOADS A SELECTED PROJECT, OR IF "[All Projects...]" IS SELECTED, LOAD ALL PROJECTS.
     * WHEN A PROJECT IS LOADED, THE ITEMS IT NEEDS IS ADDED TO THE ITEM TABLE.
     * THE ITEM TABLE IS CLEARED BEFORE LOADING.
     */
    function load_project() {
        const project_name = get_selected_project();
        const project_data = data.projects[project_name];
        const name_input_elem = document.getElementById(element_id.NAME_INPUT);

        data_display.item_table.clear();

        if (project_name !== ALL_PROJECTS) {
            // SPECIFIC PROJECT SELECTED
            for (const [item_name, item_amount] of project_data) {
                increase_item_value(item_name, item_amount);
            }
            name_input_elem.value = project_name;
        }
        else {
            // [All Projects...] SELECTED, LOAD EVERY SAVED PROJECT
            for (const project_name in data.projects) {
                const project_data = data.projects[project_name];
                for (const [item_name, item_amount] of project_data) {
                    increase_item_value(item_name, item_amount);
                }
            }
            name_input_elem.value = "";
        }
        data_display.build();
        webpage.print("Loaded project " + project_name + ".", "Projects");
    }

    /**
     * ADDS A PROJECT'S ITEMS TO THE ITEM TABLES.
     * "[All Projects...]" CANNOT BE USED HERE.
     * THE ITEM TABLE IS NOT CLEARED WHILE DOING SO.
     */
    function add_project() {
        const project_name = get_selected_project();
        const project_data = data.projects[project_name];

        for (const [item_name, item_amount] of project_data) {
            increase_item_value(item_name, item_amount);
        }

        data_display.build();
        webpage.print("Added a set of " + project_name + "'s items to the requested items.", "Projects");
    }

    /**
     * REMOVES A PROJECT'S ITEMS TO THE ITEM TABLES.
     * "[All Projects...]" CANNOT BE USED HERE.
     * IF THE NEW VALUE IS BELOW 0, THEN 0 WILL BE USED INSTEAD.
     * THE ITEM TABLE IS NOT CLEARED WHILE DOING SO.
     */
    function subtract_project() {
        const project_name = get_selected_project();
        const project_data = data.projects[project_name];

        for (const [item_name, item_amount] of project_data) {
            if (equipment_data.is_equipment_exist(item_name)) {
                const input_elem = document.getElementById(equipment_data.data()[item_name][equipment_data.tags.ID] + "-amt");
                const current_amt = parseInt(input_elem.value);
                if (current_amt >= 1) {
                    const new_value = current_amt - parseInt(item_amount);
                    input_elem.value = ((new_value >= 0) ? new_value : 0);
                }
            }
        }

        data_display.build();
        webpage.print("Removed a set of " + project_name + "'s items from the requested items.", "Projects");
    }

    /**
     * DELETES THE SELECTED PROJECT FROM LOCALSTORAGE AND THE LIST.
     * IF "[All Projects...]" IS SELECTED, DELETE ALL PROJECTS FROM LOCALSTORAGE AND THE LIST.
     */
    function delete_project() {
        const project_name = get_selected_project();

        if (project_name !== ALL_PROJECTS) {
            // DELETE SPECIFIC PROJECT ONLY
            delete data.projects[project_name];
            localStorage.setItem(LOCALSTORAGE_KEY.PROJECTS, get_project_string());

            if (data.projects_priority.includes(project_name)) {
                // DELETE FROM PRIORITY PROJECT LIST
                const index = data.projects_priority.indexOf(project_name);
                if (index > -1) {
                    data.projects_priority.splice(index, 1);
                }
                show_prioritize_button(true);
                save_priority_projects();
                webpage.print("Removing " + project_name + " from the Prioritized Projects list due to it being deleted.", "Projects");
            }
        }
        else {
            // "[All Projects...]" SELECTED, DELETE ALL PROJECTS
            data.projects = {};
            data.projects_priority = [];
            localStorage.removeItem(LOCALSTORAGE_KEY.PROJECTS);
            localStorage.removeItem(LOCALSTORAGE_KEY.PRIORITY_PROJECTS);
            build_priority_items();
        }

        update_list();
        disable_add_and_sub_buttons(true);
        disable_complete_project_button(false);
        if (webpage.language.is_english()) {
            toastr.success("Project \"" + project_name + "\" has been deleted!");
        }
        else {
            const language_data = webpage.language.data();
            let translated_toast = language_data[webpage.language.tags.TOASTS]["project_deleted"];
            toastr.success(translated_toast.replace("${project_name}", project_name === ALL_PROJECTS ?
                language_data[webpage.language.tags.PROJECTS_TAB]["all_projects_select_option"] :
                project_name));
        }
        webpage.print("Deleted project " + project_name + ".", "Projects");
    }

    /**
     * HELPER FUNCTION USED TO GET THE CURRENT PROJECT SELECTED.
     *
     * @return {string} SELECTED PROJECT NAME.
     */
    function get_selected_project() {
        return document.getElementById(element_id.SAVED_SELECT).value;
    }

    /**
     * HELPER FUNCTION USED TO ADD ITEMS TO THE ITEM TABLE.
     * IF THERE IS AN EXISTING VALUE, THE item_amount GIVEN WILL BE ADDED ONTO THAT.
     *
     * @param item_name      ITEM NAME IN ENGLISH ; i.e. "Iron Blade".
     * @param item_amount    ITEM AMOUNT TO ADD TO THE ITEM TABLE.
     */
    function increase_item_value(item_name, item_amount) {
        if (equipment_data.is_equipment_exist(item_name)) {
            const input_elem = document.getElementById(equipment_data.data()[item_name][equipment_data.tags.ID] + "-amt");
            const current_amt = parseInt(input_elem.value);
            if (current_amt >= 1) {
                input_elem.value = current_amt + parseInt(item_amount);
            }
            else {
                input_elem.value = parseInt(item_amount);
            }
        }
    }

    /**
     * CONVERTS ALL PROJECT DATA TO A LOCALSTORAGE SAFE STRING.
     *
     * @return {string} LOCALSTORAGE SAFE STRING OF ALL PROJECT DATA.
     */
    function get_project_string() {
        const all_project_data = data.projects;
        let conversion = [];
        for (const project_name in all_project_data) {
            const project_data = all_project_data[project_name];
            conversion.push([project_name, JSON.stringify([...project_data])]);
        }
        return JSON.stringify(conversion);
    }

    /**
     * UPDATE THE SAVED PROJECTS SELECT LIST BY ADDING ALL PROJECT NAMES TO THE SELECT.
     * THE PREVIOUSLY SELECTED OPTION IS THEN RESTORED, OR IF IT DOESN'T EXIST DEFAULT TO [All Projects...].
     *
     * NOTE: THERE IS AN ISSUE WITH ADDING THE REQUIRED <translate> ELEMENT WHEN html IS INITIALIZED.
     * ADDING THE <translate> ELEMENT THERE WILL CAUSE IT TO GET REMOVED WHEN THE HTML IS SET TO THE SELECT.
     * AS A WORKAROUND, APPEND THE <translate> ELEMENT LATER AFTER THE HTML IS SET TO THE SELECT.
     */
    function update_list() {
        const selected = document.getElementById(element_id.SAVED_SELECT).value;
        // GET innerHTML TO ADD LATER ; NEEDED TO TRANSLATE TEXT ; ADDING IT NOW WOULD CAUSE IT TO BE REMOVED!
        const option_innerHTML = "<translate text=\"projects_tab.all_projects_select_option\">" +
        (webpage.language.is_english() ?
            ALL_PROJECTS :
            webpage.language.data()[webpage.language.tags.PROJECTS_TAB]["all_projects_select_option"]) +
        "</translate>";
        let html = "<option value=\"" + ALL_PROJECTS + "\"></option>";
        for (const project_name in data.projects) {
            const is_complete = is_project_complete(project_name, data.projects[project_name]);
            const is_priority = data.projects_priority.includes(project_name);

            html += "<option value=\"" + project_name + "\">" +
                (is_complete ? project_symbol.COMPLETED : "") +
                (is_priority ? project_symbol.PRIORITY : "") +
                (is_complete || is_priority ? " " : "") + project_name + "</option>";
        }

        let saved_select = document.getElementById(element_id.SAVED_SELECT);
        saved_select.innerHTML = html;
        // APPEND option_innerHTML TO [All Projects...] OPTION ; ADDING THIS EARLIER WOULD CAUSE IT TO BE REMOVED!
        saved_select.querySelector("option[value='" + ALL_PROJECTS + "']").innerHTML = option_innerHTML;
        if (selected !== "") {
            saved_select.value = ($("#saved-projects-select option[value='" + selected + "']").length > 0) ? selected : ALL_PROJECTS;
        }
    }

    /**
     * UPDATE THE DOCUMENT ACCORDING TO THE SELECTED PROJECT.
     * THIS FUNCTION IS USUALLY CALLED AFTER THE SAVED PROJECT SELECT CHANGES ITS VALUE.
     */
    function update_select() {
        let project_name = get_selected_project();
        disable_add_and_sub_buttons(project_name === ALL_PROJECTS);

        const is_prioritized = data.projects_priority.includes(project_name);
        show_prioritize_button(!is_prioritized);

        const is_complete = data.projects_completed.includes(project_name);
        disable_complete_project_button(is_complete);

        webpage.print("Selected " + project_name + "." +
            (is_complete ? " (Completed)" : "") +
            (is_prioritized ? " (Prioritized)" : ""), "Projects");
    }

    /**
     * DETERMINES IF THE PROJECT IS COMPLETE IF ALL ITEMS THAT IT REQUIRES ARE EITHER DISABLED OR THERE IS
     * A SUFFICIENT AMOUNT IN THE USER'S INVENTORY.
     *
     * @param {string}    project_name    PROJECT NAME TO CHECK.
     * @param {string}    project_data    DATA OF THE PROJECT THAT IS BEING CHECKED.
     * @return {boolean} RETURNS TRUE IF THE PROJECT IS COMPLETE (ALL ITEMS DISABLED OR ENOUGH IN INVENTORY).
     */
    function is_project_complete(project_name, project_data) {
        const bl = blacklist.get();
        if (bl.length === 0 && inventory.is_empty()) {
            // BLACKLIST IS EMPTY AND SO IS INVENTORY
            return false;
        }
        else {
            let merged_recipe = {};
            for (const [item_name, item_amount] of project_data) {
                const recipe = equipment_data.recipe.get(item_name, item_amount, settings.get_settings().ignored_rarities);
                for (let frag_name in recipe) {
                    const frag_amount = recipe[frag_name];
                    if (!bl.includes(frag_name)) {
                        // SECOND CHANCE: IF INVENTORY HAS ENOUGH FRAGMENTS THEN CONTINUE
                        if (inventory.check_amount(frag_name, frag_amount)) {
                            if (merged_recipe.hasOwnProperty(frag_name)) {
                                merged_recipe[frag_name] += frag_amount;
                            }
                            else {
                                merged_recipe[frag_name] = frag_amount;
                            }
                            continue;
                        }

                        // SECOND CHANCE FAILED, PROJECT IS NOT COMPLETE.
                        mark_incomplete();
                        return false;
                    }
                }
            }

            merged_recipe = inventory.apply_to_recipe(merged_recipe, true, false);
            if (Object.keys(merged_recipe).length > 0) {
                // THERE ARE STILL INCOMPLETE ITEMS, PROJECT IS INCOMPLATE
                mark_incomplete();
                return false;
            }

            // ALL TESTS PASSED ; PROJECT SHOULD BE COMPLETE
            mark_complete();
            return true;
        }

        /**
         * HELPER FUNCTION ; ADDS PROJECT NAME TO COMPLETED PROJECTS LIST.
         */
        function mark_complete() {
            if (!data.projects_completed.includes(project_name)) {
                data.projects_completed.push(project_name);
            }
        }

        /**
         * HELPER FUNCTION ; REMOVES PROJECT FROM COMPLETED PROJECTS LIST.
         */
        function mark_incomplete() {
            if (data.projects_completed.includes(project_name)) {
                let index = data.projects_completed.indexOf(project_name);
                if (index > -1) {
                    data.projects_completed.splice(index, 1);
                }
            }
        }
    }

    /**
     * PRIORITIZES THE CURRENT SELECTED PROJECT BY ADDING IT TO THE PRIORITIZED PROJECTS LIST.
     * THE DOCUMENT IS THEN UPDATED.
     *
     * @param {boolean}    is_prioritized    TRUE IF THE PROJECT SHOULD BE PRIORITIZED.
     */
    function prioritize_selected_project(is_prioritized) {
        const project_name = get_selected_project();

        // "[All Projects...]" OPTION CANNOT BE PRIORITIZED
        if (project_name !== ALL_PROJECTS) {
            if (is_prioritized) {
                // ADD TO PRIORITY PROJECT LIST
                data.projects_priority.push(project_name);
            }
            else {
                // REMOVE FROM PRIORITY PROJECT LIST
                const index = data.projects_priority.indexOf(project_name);
                if (index > -1) {
                    data.projects_priority.splice(index, 1);
                }
            }

            show_prioritize_button(!is_prioritized);
            update_list();
            document.getElementById(element_id.SAVED_SELECT).value = project_name;
            save_priority_projects();
            webpage.print((is_prioritized ? "Prioritized " : "Deprioritized ") + project_name + ".");
        }
    }

    /**
     * SAVES THE PRIORITIZED PROJECTS TO LOCALSTORAGE AND REBUILDS THE PRIORITY ITEMS LIST.
     * IF THERE ARE NO PRIORITIZED PROJECTS, THE LOCALSTORAGE DATA IS REMOVED.
     */
    function save_priority_projects() {
        if (data.projects_priority.length > 0) {
            localStorage.setItem(LOCALSTORAGE_KEY.PRIORITY_PROJECTS, JSON.stringify(data.projects_priority));
        }
        else {
            localStorage.removeItem(LOCALSTORAGE_KEY.PRIORITY_PROJECTS);
        }
        build_priority_items();
    }

    /**
     * COMPLETES A PROJECT.
     * THE FOLLOWING TASKS WILL BE PERFORMED:
     *     - REMOVE ALL PROJECT ITEMS FROM THE BLACKLIST.
     *     - DELETE PROJECT FROM PROJECTS LIST AND LOCALSTORAGE SAVED DATA.
     *     - REMOVE PROJECT FROM PRIORITIZED PROJECTS LIST IF IT EXISTS.
     *     - UPDATE DOCUMENT AND DATA DISPLAY.
     */
    function complete_project() {
        /**
         * HELPER FUNCTION ; RETURNS A MERGED RECIPE FROM ALL THE ITEMS IN A PROJECT.
         *
         * @param {string}    project_name    PROJECT NAME TO GET A MERGED RECIPE FROM.
         */
        function get_project_recipe(project_name) {
            const project_data = data.projects[project_name];
            let merged_recipe = {};
            for (const [item_name, item_amount] of project_data) {
                merged_recipe = equipment_data.recipe.merge(merged_recipe, equipment_data.recipe.get(item_name, item_amount, settings.get_settings().ignored_rarities));
            }
            return merged_recipe;
        }

        const project_name = get_selected_project();
        const project_recipe = get_project_recipe(project_name);

        inventory.remove(project_recipe);

        // REMOVE PROJECT ITEMS FROM BLACKLIST
        for (const item_name in project_recipe) {
            if (blacklist.remove_item(item_name)) {
                const req_ingredient_button = document.getElementById("request-button-" + item_name.split(' ').join('_'));
                if (req_ingredient_button) {
                    req_ingredient_button.classList.remove("low-opacity");
                }
            }
        }

        delete data.projects[project_name];

        localStorage.setItem(LOCALSTORAGE_KEY.PROJECTS, get_project_string());

        if (data.projects_priority.includes(project_name)) {
            const index = data.projects_priority.indexOf(project_name);
            if (index > -1) {
                data.projects_priority.splice(index, 1);
            }

            show_prioritize_button(true);
            save_priority_projects();

            webpage.print("Removing " + project_name + " from the Priority Project list due to it being completed and deleted.");
        }

        update_list();
        disable_add_and_sub_buttons(true);
        disable_complete_project_button(false);
        data_display.build();

        if (webpage.language.is_english()) {
            toastr.success("Project \"" + project_name + "\" has been completed!");
        }
        else {
            toastr.success(webpage.language.data()[webpage.language.tags.TOASTS]["project_completed"]
                .replace("${project_name}", project_name));
        }
        webpage.print("Completed project " + project_name + "!", "Projects");
    }

    /**
     * COMPILES THE LIST OF PRIORITY ITEMS.
     * PRIORITY ITEMS ARE ALSO KNOWN AS THE ITEMS FROM A PRIORITIZED PROJECT.
     */
    function build_priority_items() {
        data.items = [];
        const priority_projs = data.projects_priority;
        if (priority_projs.length > 0) {
            for (let i = 0, j = priority_projs.length ; i < j ; i++) {
                const project_data = data.projects[priority_projs[i]];
                for (const [item_name, item_amount] of project_data) {
                    const recipe = equipment_data.recipe.get(item_name, item_amount, settings.get_settings().ignored_rarities);
                    for (const comp_name in recipe) {
                        if (!data.items.includes(comp_name)) {
                            data.items.push(comp_name);
                        }
                    }
                }
            }
        }

        if (!data.items_compiled) {
            data.items_compiled = true;
        }
        else {
            data_display.quests.refresh();
        }
    }

    /**
     * HELPER FUNCTION ; CHANGES THE DISABLED STATE OF THE ADD/SUB/PRIORITIZE/DEPRIORITZE BUTTONS.
     *
     * @param {boolean}    is_disabled    TRUE IF THE ELEMENTS SHOULD BE DISABLED.
     */
    function disable_add_and_sub_buttons(is_disabled) {
        document.getElementById(element_id.ADD_BUTTON).disabled = is_disabled;
        document.getElementById(element_id.SUB_BUTTON).disabled = is_disabled;
        document.getElementById(element_id.PRIORITIZE_BUTTON).disabled = is_disabled;
        document.getElementById(element_id.DEPRIORITIZE_BUTTON).disabled = is_disabled;
    }

    /**
     * HELPER FUNCTION ; CHANGES THE DISABLED STATE OF THE "Complete Project" BUTTON.
     *
     * @param {boolean} is_project_complete             IF TRUE, THE PROJECT IS COMPLETED AND THE BUTTON IS NOT DISABLED.
     * @param {boolean} [use_selected_project=false]    CHECK THE STATUS OF THE CURRENT SELECTED PROJECT AND USE THAT INSTEAD OF is_project_complete.
     */
    function disable_complete_project_button(is_project_complete, use_selected_project = false) {
        if (use_selected_project) {
            is_project_complete = data.projects_completed.includes(document.getElementById(element_id.SAVED_SELECT).value);
        }
        document.getElementById(element_id.COMPLETE_BUTTON).disabled = !is_project_complete;
    }

    /**
     * HELPER FUNCTION ; DETERMINES WHICH PRIORITIZE STATE BUTTON TO SHOW ON THE DOCUMENT.
     *
     * @param {boolean}    is_shown    IF TRUE, PRIORITIZE BUTTON WILL BE SHOWN AND DEPRIORITIZE BUTTON IS HIDDEN.
     */
    function show_prioritize_button(is_shown) {
        document.getElementById(element_id.PRIORITIZE_BUTTON).hidden = !is_shown;
        document.getElementById(element_id.DEPRIORITIZE_BUTTON).hidden = is_shown;
    }

    /**
     * RETURNS SPECIFICALLY THE SAVED PROJECT DATA.
     *
     * @return {data.projects|{}} SAVED PROJECT DATA.
     */
    function get_projects() {
        return data.projects;
    }

    /**
     * RETURNS ALL PROJECTS RELATED DATA (PROJECTS, PRIORITY ITEMS, PRIORITY PROJECTS, COMPLETED PROJECTS).
     *
     * @return {{projects: {}, items_compiled: boolean, projects_priority: Array, projects_completed: Array, items: Array}} ALL PROJECTS RELATED DATA.
     */
    function get_data() {
        return data;
    }

    return {
        init: init,
        get: get_projects,
        data: get_data,
        build_priority_items: build_priority_items,
        update_list: update_list,
        disable_complete_project_button: disable_complete_project_button,

        save: save_project,
        load: load_project,
        update: update_select,
        add: add_project,
        sub: subtract_project,
        prioritize: prioritize_selected_project,
        remove: delete_project,
        complete: complete_project,

        element_id: element_id,

        blacklist: blacklist
    }
})();
const inventory = (function () {
    const element_id = Object.freeze({
        LIST: 'inventory_toolbar-button_list',
        ADD: 'inventory_toolbar-button_add',
        REMOVE: 'inventory_toolbar-button_remove',
        DELETE: 'inventory_toolbar-button_delete',
        INLINE_EDITOR: "inventory-inline-editor",
        MODAL: "inventory_modal",
        CLOSE: "inventory_modal_close-button",
        INVENTORY_LIST: "inventory_content_list",
        CATALOG: "inventory_catalog",
        PROMPT: "inventory_catalog-add-prompt",
        PROMPT_OPTIONS: "inventory_add-prompt_options",
        PROMPT_ADD_FRAGMENT: "inventory_catalog_add-fragment",
        PROMPT_ADD_EQUIPMENT: "inventory_catalog_add-equipment",
        PROMPT_FRAGMENT_MAIN: "inventory_add-fragment_main",
        PROMPT_EQUIPMENT_MAIN: "inventory_add-equipment_main",
        PROMPT_SUB_ITEMS: "inventory_catalog_add-equipment_sub-items",
        PROMPT_FRAGMENT_OPTION: "inventory_add-prompt_fragment-option",
        PROMPT_EQUIPMENT_OPTION: "inventory_add-prompt_equipment-option",
        PROMPT_INPUT: "inventory_catalog_input",
        SORTING_OPTIONS: "inventory_sorting_options",
        SORTING_OPTIONS_LIST: "inventory_sorting-options-list"
    });
    const LOCALSTORAGE_KEY = "inventory";
    let status = {
        MODE: element_id.LIST,
        EDITING: "",
        IS_CATALOG_BUILT: false,
        CATALOG_SELECTED: "",
        CATALOG_SELECTED_ELEMENT: null,
        MAX_ITEM_AMOUNT: 9999,
        UNSAVED_CHANGES: false,
        INLINE_EDITOR_START_AMOUNT: 0
    };
    let data = {};

    /**
     * INITIALIZE INVENTORY BY LOADING IT FROM LOCALSTORAGE AND SETUP INLINE EDITOR.
     */
    function init() {
        load();

        $(function() {
            /**
             * HIDE THE GIVEN INVENTORY EDITOR AND STOP EDITING MODE.
             *
             * @param $inventory_editor INLINE INVENTORY EDITOR ELEMENT (jQuery).
             */
            function editor_hide($inventory_editor) {
                $inventory_editor.hide();
                let $current_item_parent = $inventory_editor.parent();
                if ($current_item_parent.hasClass('quest-item-edit')) {
                    $current_item_parent.removeClass('quest-item-edit');
                }
                if ($current_item_parent.hasClass('input-enabled')) {
                    $current_item_parent.removeClass('input-enabled');
                    let plus = $inventory_editor.children('button.plus');
                    let minus = $inventory_editor.children('button.minus');
                    plus.prop('disabled', !plus.attr('disabled'));
                    minus.prop('disabled', !minus.attr('disabled'));
                }
            }

            /**
             * IF EDITOR HAS A DIFFERENT VALUE COMPARED TO THE CURRENT INVENTORY AMOUNT, UPDATE DOCUMENT.
             * REDRAW REQUESTED ITEMS, REQUIRED INGREDIENTS, AND RECOMMENDED QUESTS AND UPDATE PROJECTS LIST.
             *
             * @param $inventory_editor INLINE INVENTORY EDITOR ELEMENT (jQuery)
             */
            function update_table_after_inventory_change($inventory_editor) {
                const current_inventory_amount = parseInt($inventory_editor.children('.quest_inline-inventory').children('.quest_inventory-amount').text());
                if (status.INLINE_EDITOR_START_AMOUNT !== current_inventory_amount) {
                    // REFRESH REQUIRED INGREDIENTS AND RECOMMENDED QUESTS IF A CHANGE IS DETECTED
                    data_display.build();
                    projects.update_list();
                    projects.disable_complete_project_button(undefined, true);
                    status.INLINE_EDITOR_START_AMOUNT = 0;
                }
            }

            /**
             * click .quest_item
             *     UPON CLICKING ON AN ITEM IN RECOMMENDED QUESTS, OPEN THE INVENTORY INLINE EDITOR.
             *     IF AN INVENTORY INLINE EDITOR IS ALREADY ACTIVE, CLOSE IT AND MOVE IT TO THE NEW ITEM.
             *     UPON CLOSE, THE INVENTORY WILL BE UPDATED.
             *
             * click .inventory-inline-editor button
             *     UPON CLICKING ON A INVENTORY INLINE EDITOR BUTTON, INCREMENT/DECREMENT THE INVENTORY AMOUNT.
             *     THE INVENTORY IS NOT SAVED WHILE PERFORMING THIS.
             */
            $('#recommended-quest-table').on('click', '.quest_item', function(event) {
                event.stopPropagation();
                let $this = $(this);
                let $inventory_editor = $('.inventory-inline-editor');
                if ($inventory_editor.is(':visible')) {
                    editor_hide($inventory_editor);
                    update_table_after_inventory_change($inventory_editor);
                    if ($this.prev().is($inventory_editor)) {
                        return;
                    }
                }
                if ($inventory_editor.length === 0) {
                    $inventory_editor = $($.parseHTML('<div class="inventory-inline-editor">' +
                        '<div class="quest_inline-inventory">' +
                        '<img class="quest_inline-crate" src="' + webpage.get_webpage_image_path("Inventory_Crate") + '" alt="">' +
                        '<div class="quest_inventory-amount">0</div>' +
                        '<input class="quest_inline-input" type="number">' +
                        '<button class="input-confirm" value="OK">OK</button>' +
                        '</div>' +
                        '<button class="plus increment" value="+30">+30</button><button class="plus" value="+5">+5</button><button class="plus" value="+1">+1</button>' +
                        '<button class="minus increment" value="-30">-30</button><button class="minus" value="-5">-5</button><button class="minus" value="-1">-1</button><br>' +
                        '</div>'));
                }
                $("span.quest_drop-percent", $this).before($inventory_editor);
                let item_name = $this.attr('title');
                let current_amount = get_amount(item_name);
                status.INLINE_EDITOR_START_AMOUNT = current_amount;
                $inventory_editor.children('.quest_inline-inventory').children('.quest_inventory-amount').text(current_amount);
                let increment = equipment_data.data()[item_name.replace(' Fragment', '')][equipment_data.tags.REQUIRED_PIECES];
                if (increment < 10) {
                    increment = 10;
                }
                let $plus_button = $('button.plus.increment', $inventory_editor);
                $plus_button.text('+' + increment);
                $plus_button[0].value = '+' + increment;
                let $minus_button = $('button.minus.increment', $inventory_editor);
                $minus_button.text('-' + increment);
                $minus_button[0].value = '-' + increment;
                $this.removeClass('quest-hover').addClass('quest-item-edit');
                $inventory_editor.show();
            }).on('click', '.inventory-inline-editor button', function(event) {
                let $this = $(this);
                if (this.value === 'OK') {
                    // OK BUTTON PRESSED
                    let item_name = $this.parent().parent().parent().attr("title");
                    let input = $this.parent().children('input.quest_inline-input');
                    let new_amount = set_amount(item_name, input.val());
                    $this.parent().children('.quest_inventory-amount').text(new_amount);
                    toggle_input($this.parent().parent());
                }
                else {
                    // NUMBER +/- BUTTON PRESSED
                    let item_name = $this.parent().parent().attr("title");
                    let amount = parseInt(this.value);
                    let current_amount = get_amount(item_name);
                    let new_amount = set_amount(item_name, current_amount + amount);
                    $this.parent().children('.quest_inline-inventory').children('.quest_inventory-amount').text(new_amount);
                }
                event.stopPropagation();
            }).on('click', '.quest_inline-inventory', function(event) {
                toggle_input($(this).parent());
                event.stopPropagation();
            }).on('click', '.quest_inline-input', function (event) {
                event.stopPropagation();
            });

            function toggle_input(editor) {
                // editor == div.inventory-inline-editor
                let plus = editor.children('button.plus');
                let minus = editor.children('button.minus');
                plus.prop('disabled', !plus.attr('disabled'));
                minus.prop('disabled', !minus.attr('disabled'));
                editor.parent().toggleClass('input-enabled');
                if (editor.parent().hasClass('input-enabled')) {
                    let current_amount = get_amount(editor.parent().attr("title"));
                    let input = editor.children('.quest_inline-inventory').children('.quest_inline-input');
                    input.val(current_amount);
                    input.select();

                    // WHEN THE ENTER KEY IS PRESSED, PERFORM SAME OPERATION AS PRESSING THE "OK" BUTTON
                    input.off().keyup(function (event) {
                        if (event.key === "Enter") {
                            let item_name = editor.parent().attr("title");
                            let new_amount = set_amount(item_name, input.val());
                            input.parent().children('.quest_inventory-amount').text(new_amount);
                            toggle_input(editor);
                            input.off();
                        }
                    });
                }
            }

            /**
             * IF ANYWHERE IN THE RECOMMENDED QUESTS DIV IS CLICKED ON, CLOSE THE ACTIVE INVENTORY EDITOR.
             */
            $('#recommended-div').on('click', function(event) {
                // close the editor on clicking away
                let $inventory_editor = $('.inventory-inline-editor');
                if ($inventory_editor.length !== 0 && $inventory_editor.is(':visible') ) {
                    editor_hide($inventory_editor);
                    update_table_after_inventory_change($inventory_editor);
                }
                event.stopPropagation();
            });
        });
    }

    /**
     * LOAD INVENTORY DATA FROM LOCALSTORAGE.
     */
    function load() {
        if (typeof(Storage) !== "undefined") {
            const json = localStorage.getItem(LOCALSTORAGE_KEY);
            if (json !== null) {
                data = JSON.parse(json);
            }
        }
        if (data.fragments === undefined) {
            data.fragments = {};
        }
    }

    /**
     * SAVE INVENTORY DATA IF LOCALSTORAGE IS SUPPORTED.
     */
    function save() {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
        }
    }

    /**
     * RETURN THE AMOUNT OF FRAGMENTS THE INVENTORY HAS.
     *
     * @param {String}    frag_name    ITEM FRAGMENT NAME IN ENGLISH ; i.e. "Sun Amulet Fragment".
     * @return {number} AMOUNT OF THE GIVEN frag_name THAT EXISTS IN THE INVENTORY.
     */
    function get_amount(frag_name) {
        const frags = data.fragments[frag_name];
        if (frags !== undefined) {
            return frags;
        }
        else {
            return 0;
        }
    }

    /**
     * SET THE AMOUNT OF FRAGMENTS THE INVENTORY HAS.
     *
     * @param {string}     frag_name    ITEM FRAGMENT NAME IN ENGLISH ; i.e. "Sun Amulet Fragment".
     * @param {number}     amount       AMOUNT OF FRAGMENTS TO SET THE INVENTORY TO.
     * @param {boolean}    do_save      TRUE IF THE INVENTORY SHOULD BE SAVED AFTER AMOUNT IS MODIFIED.
     * @return {number} THE AMOUNT OF FRAGMENTS THE INVENTORY IS SET TO HAVE.
     */
    function set_amount(frag_name, amount, do_save = true) {
        if (typeof(amount) !== "number") {
            amount = parseInt(amount + "", 10);
        }
        if (isNaN(amount)) {
            amount = 0;
        }
        if (amount < 0) {
            amount = 0;
        }

        if (amount > 0) {
            amount = (amount > status.MAX_ITEM_AMOUNT ? status.MAX_ITEM_AMOUNT : amount);
            data.fragments[frag_name] = amount;
        }
        else {
            delete data.fragments[frag_name];
        }

        if (do_save) {
            save();
        }
        return amount;
    }

    /**
     * CHECK THE INVENTORY IF IT CONTAINS A CERTAIN AMOUNT OF FRAGMENTS.
     *
     * @param {string}    frag_name    FRAGMENT NAME IN ENGLISH ; i.e. "Sun Amulet Fragment".
     * @param {number}    amount       AMOUNT OF FRAGMENTS TO CHECK THE INVENTORY FOR.
     * @return {boolean} TRUE IF THERE IS ENOUGH FRAGMENTS IN THE INVENTORY.
     */
    function check_amount(frag_name, amount) {
        return get_amount(frag_name) >= amount;
    }

    /**
     * REMOVE A SPECIFIED AMOUNT OF FRAGMENTS FROM THE INVENTORY.
     * ITEMS OBJECT PARAMETER IS FORMATTED LIKE SO:
     * {
     *     "frag_name": 123,
     *     "frag_name_2": 5
     * }
     *
     * @param {{frag_name: number}}    items              FRAGMENT NAMES AND QUANTITIES TO REMOVE.
     * @param {string}                 items.frag_name    FRAGMENT NAME IN ENGLISH ; i.e. "Sun Amulet Fragment".
     */
    function remove(items) {
        for (const frag_name in items) {
            let amount = items[frag_name];
            if (typeof(amount) !== "number") {
                amount = parseInt(amount, 10);
            }
            if (amount === 0) {
                continue;
            }

            const frags = get_amount(frag_name),
                  new_amount = frags - amount;
            if (new_amount <= 0) {
                delete_fragment(frag_name);
            }
            else {
                set_amount(frag_name, new_amount, false);
            }
        }
        save();
    }

    /**
     * REMOVES A FRAGMENT ENTRY ENTIRELY FROM THE INVENTORY.
     * SAVES THE INVENTORY TO LOCALSTORAGE AFTERWARDS.
     *
     * @param {string}    frag_name    FRAGMENT NAME IN ENGLISH ; i.e. "Sun Amulet Fragment".
     */
    function delete_fragment(frag_name) {
        delete data.fragments[frag_name];
        save();
    }

    /**
     * CLEAR ALL FRAGMENT ENTRIES FROM THE INVENTORY.
     * SAVES THE INVENTORY TO LOCALSTORAGE AFTERWARDS.
     */
    function delete_all() {
        data.fragments = {};
        save();
    }

    /**
     * SETS CATALOG BUILT STATE.
     * IF CATALOG BUILT STATE IS FALSE, REBUILD THE CATALOG WHEN INVENTORY MODAL IS OPENED.
     *
     * @param {boolean}    is_built    TRUE IF THE INVENTORY CATALOG IS BUILT.
     */
    function set_catalog_build_state(is_built) {
        status.IS_CATALOG_BUILT = is_built;
    }

    /**
     * OPENS OR CLOSES THE INVENTORY MODAL.
     * THE INVENTORY MODAL CANNOT BE OPENED IF AN INVENTORY INLINE-EDITOR IS OPEN.
     * WHEN OPENING, THE INVENTORY LIST AND CATALOG WILL BE BUILT.
     * WHEN CLOSING, THE DATA DISPLAY AND PROJECTS WILL BE UPDATED IF CHANGES WERE MADE TO THE INVENTORY.
     */
    function toggle_inventory_modal() {
        const $inventory_editor = $(".inventory-inline-editor"),
              modal = document.getElementById(element_id.MODAL);
        if ($inventory_editor.length !== 0 && $inventory_editor.is(":visible")) {
            // HIDE EDITOR
            $inventory_editor.hide();
            let $current_item_parent = $inventory_editor.parent();
            if ($current_item_parent.hasClass('quest-item-edit')) {
                $current_item_parent.removeClass('quest-item-edit');
            }
            // UPDATE TABLE IF INVENTORY CHANGED
            const current_inventory_amount = parseInt($inventory_editor.children('.quest_inline-inventory').children('.quest_inventory-amount').text());
            if (status.INLINE_EDITOR_START_AMOUNT !== current_inventory_amount) {
                // REFRESH REQUIRED INGREDIENTS AND RECOMMENDED QUESTS IF A CHANGE IS DETECTED
                data_display.build();
                projects.update_list();
                projects.disable_complete_project_button(undefined, true);
                status.INLINE_EDITOR_START_AMOUNT = 0;
            }
        }

        modal.hidden = !modal.hidden;
        document.body.style.overflow = !modal.hidden ? "hidden" : "";

        if (!modal.hidden) {
            // SHOW MODAL
            build_list();
            build_catalog();
            status.UNSAVED_CHANGES = false;

            setTimeout(function () {
                // ENABLE THIS LISTENER ON A BIT OF DELAY SO IT'S NOT ACTIVE ASAP.
                $(window).on("click", function (e) {
                    if (status.EDITING !== "" && !e.target.id.includes(status.EDITING)) {
                        // EDITING IN PROGRESS BUT USER CLICKED AWAY FROM THE ELEMENT'S DIV
                        // CLOSE AND SAVE CURRENT DATA
                        onclick_inventory_item("", null);
                    }
                    else if (e.target.id === element_id.MODAL || e.target.id.includes(element_id.CLOSE)) {
                        // USER CLICKED OUTSIDE OF INVENTORY MODAL ; CLOSE INVENTORY MODAL
                        toggle_inventory_modal();
                    }
                });
            }, 1);
        }
        else {
            // HIDE MODAL
            // CHECK IF CHANGES WERE MADE
            if (status.UNSAVED_CHANGES) {
                data_display.build();
                projects.update_list();
                projects.disable_complete_project_button(undefined, true);
            }
            $(window).off("click");
        }
    }

    /**
     * DEPENDING ON THE ACTIVE INVENTORY MODAL MODE, PERFORM A FUNCTION WHEN AN ITEM IS CLICKED.
     * IF LIST MODE IS ACTIVE, OPEN/CLOSE THE EDIT MODE FOR THAT ITEM.
     * IF REMOVE MODE IS ACTIVE, DELETE THE ITEM FROM THE INVENTORY.
     *
     * @param {string}    elem     ELEMENT ID.
     * @param {Object}    event    EVENT THAT TRIGGERED THE ONCLICK EVENT.
     */
    function onclick_inventory_item(elem, event) {
        if (status.MODE === element_id.LIST) {
            if (elem === "" && status.EDITING !== "") {
                // SAVE CURRENT EDIT FOCUS AND CLOSE
                document.getElementById(status.EDITING + "-input").hidden = true;
                save_item_changes(status.EDITING);
                status.EDITING = "";
            }
            else if (!event.target.id.includes("-input")) {
                // AN ELEMENT THAT ISN'T THE INPUT WAS SELECTED
                const input_elem = document.getElementById(elem + "-input"),
                      amount_elem = document.getElementById(elem + "-amount");
                input_elem.hidden = !input_elem.hidden;
                if (!input_elem.hidden) {
                    input_elem.value = amount_elem.innerText;
                    input_elem.focus();
                    input_elem.select();
                    amount_elem.style.visibility = "hidden";
                    document.getElementById(elem).classList.toggle("grow");
                }
                else {
                    save_item_changes(elem);
                }

                // HIDE CURRENT ACTIVE ELEMENT
                if (status.EDITING !== elem && status.EDITING !== "") {
                    document.getElementById(status.EDITING + "-input").hidden = true;
                    save_item_changes(status.EDITING);
                }

                // SET NEW CURRENT EDIT STATUS
                status.EDITING = (status.EDITING === elem ? "" : elem);
            }
        }
        else if (status.MODE === element_id.REMOVE) {
            const frag_name = document.getElementById(elem).title;
            delete_fragment(frag_name);
            build_list();
            status.UNSAVED_CHANGES = true;
        }

        /**
         * HELPER FUNCTION ; USED TO SAVE ANY CHANGES WHEN EDITING UNDER LIST MODE.
         * UPON SAVE, THE ELEMENT IS REVERED BACK TO NORMAL.
         *
         * @param {string}    elem    ELEMENT ID
         */
        function save_item_changes(elem) {
            const amount_elem = document.getElementById(elem + "-amount"),
                  item_elem = document.getElementById(elem),
                  prev_amount = parseInt(amount_elem.innerText),
                  amount = error_check_amount(parseInt(document.getElementById(elem + "-input").value));
            amount_elem.innerText = amount.toString();

            // SET ELEMENT BACK TO ORIGINAL STATE
            amount_elem.style.visibility = null;
            item_elem.classList.remove("grow");

            // SAVE NEW AMOUNT TO INVENTORY OR DELETE IF <= 0
            const frag_name = item_elem.title;
            if (amount <= 0) {
                delete data.fragments[frag_name];
            }
            else {
                set_amount(frag_name, amount);
            }

            // NOTE IF ANY CHANGES WERE MADE
            if (prev_amount !== amount) {
                status.UNSAVED_CHANGES = true;
            }
        }
    }

    /**
     * SETS UP THE INVENTORY PROMPT WHEN AN INVENTORY CATALOG ITEM IS CLICKED ON.
     *
     * @param {string}    item_name    ITEM NAME OF THE ITEM THAT WAS CLICKED ON IN ENGLISH ; i.e. "Iron Blade".
     */
    function onclick_catalog_item(item_name) {
        item_name = equipment_data.apostrophe.REVERT(item_name);
        setup_prompt(item_name);

        document.getElementById(element_id.PROMPT).hidden = false;
        document.getElementById(element_id.CATALOG).hidden = true;
        document.getElementById(element_id.LIST).disabled =
            document.getElementById(element_id.ADD).disabled =
                document.getElementById(element_id.REMOVE).disabled = true;
        const input = document.getElementById(element_id.PROMPT_INPUT);
        input.select();
        input.focus();

        // SETUP KEY EVENT, IF INPUT IS SELECTED AND ENTER KEY IS PRESSED THEN PERFORM ACTION
        $("#" + element_id.PROMPT_INPUT).off().keyup(function (event) {
            if (event.key === "Enter") {
                catalog_prompt_add();
            }
        });

        /**
         * HELPER FUNCTION ; SETS UP THE CATALOG ADD PROMPT.
         *
         * @param {string}    item_name    ITEM NAME IN ENGLISH OF THE ITEM THAT THE PROMPT SHOULD BE SET UP FOR.
         */
        function setup_prompt(item_name) {
            const options = document.getElementById(element_id.PROMPT_OPTIONS),
                  add_fragment = document.getElementById(element_id.PROMPT_ADD_FRAGMENT),
                  add_equipment = document.getElementById(element_id.PROMPT_ADD_EQUIPMENT),
                  frag_main_img = document.getElementById(element_id.PROMPT_FRAGMENT_MAIN),
                  equip_main_img = document.getElementById(element_id.PROMPT_EQUIPMENT_MAIN),
                  equip_sub_items = document.getElementById(element_id.PROMPT_SUB_ITEMS),
                  frag_option = document.getElementById(element_id.PROMPT_FRAGMENT_OPTION),
                  equip_option = document.getElementById(element_id.PROMPT_EQUIPMENT_OPTION),
                  input = document.getElementById(element_id.PROMPT_INPUT),
                  item_class = webpage.get_item_sprite_class(item_name),
                  frag_class = webpage.get_item_sprite_class(item_name + "-Fragment"),
                  equip_data = equipment_data.data()[item_name],
                  has_fragments = equip_data[equipment_data.tags.HAS_FRAGMENTS],
                  req_items = equip_data[equipment_data.tags.REQUIRED_ITEMS];

            if (!has_fragments && req_items.length === 0) {
                // ITEM HAS NO FRAGMENTS NOR REQUIRED ITEMS
                options.hidden = true;
                add_fragment.hidden = false;
                add_equipment.hidden = true;
                replace_item_class(frag_main_img, item_class, item_name);
            }
            else if (!has_fragments && req_items.length > 0) {
                // ITEM HAS NO FRAGMENTS BUT HAS REQUIRED ITEMS
                options.hidden = true;
                add_fragment.hidden = true;
                add_equipment.hidden = false;
                replace_item_class(equip_main_img, item_class, item_name);
                equip_sub_items.innerHTML = build_sub_item_html(req_items, null);
            }
            else {
                options.hidden = false;
                add_fragment.hidden = false;
                add_equipment.hidden = true;
                replace_item_class(frag_main_img, frag_class, item_name + " Fragment");
                replace_item_class(equip_main_img, item_class, item_name);
                replace_item_class(frag_option, frag_class, item_name + " Fragment");
                replace_item_class(equip_option, item_class, item_name);
                equip_sub_items.innerHTML = build_sub_item_html(req_items, frag_class, equipment_data.data()[item_name][equipment_data.tags.REQUIRED_PIECES]);
            }

            input.value = 1;
            if (add_equipment.hidden) {
                frag_option.classList.remove("low-opacity");
                equip_option.classList.add("low-opacity");
            }
            else {
                frag_option.classList.add("low-opacity");
                equip_option.classList.remove("low-opacity");
            }
            status.CATALOG_SELECTED = item_name;
            status.CATALOG_SELECTED_ELEMENT = document.querySelector("i.inventory_catalog-item." + webpage.get_item_sprite_class(item_name));

            function build_sub_item_html(req_items, frag_class, frag_amt) {
                let html = "";
                if (frag_class !== null) {
                    html += "<div class=\"item-sprite " + frag_class + "\">" +
                        "<span class='item-amount'>\u00D7" + (frag_amt !== null ? frag_amt : 0) + "</span></div>";
                }
                for (let i = 0, j = req_items.length ; i < j ; i++) {
                    html += "<i class=\"item-sprite " + webpage.get_item_sprite_class(req_items[i]) + "\"></i>";
                }
                return html;
            }
        }

        /**
         * HELPER FUNCTION ; USED TO REPLACE AN EXISTING ELEMENT'S ITEM SPRITE CLASS WITH A NEW ONE.
         * THIS ASSUMES THAT THE ELEMENT HAS THE ITEM NAME AS THE TITLE.
         *
         * @param {Object}    elem              ELEMENT TO CHANGE THE ITEM SPRITE CLASS OF.
         * @param {String}    class_string      ITEM SPRITE CLASS STRING TO CHANGE THE ELEMENT TO.
         * @param {String}    [item_name=""]    ITEM NAME IN ENGLISH TO SET THE ELEMENT'S TITLE TO.
         */
        function replace_item_class(elem, class_string, item_name = "") {
            if (elem.title !== "") {
                elem.classList.remove(webpage.get_item_sprite_class(elem.title));
            }
            elem.classList.add(class_string);
            elem.title = item_name;
        }
    }

    /**
     * BUILDS THE INVENTORY LIST AND DISPLAYS IT IN THE INVENTORY MODAL.
     * IF THERE IS NOTHING IN THE INVENTORY, AN "INVENTORY IS EMPTY" MESSAGE WILL BE DISPLAYED INSTEAD.
     */
    function build_list() {
        const sorting_options = {
            NO_SORT: "no_sort",
            QUANTITY_ASCENDING: "quantity_ascending",
            QUANTITY_DESCENDING: "quantity_descending"
        };
        const list_elem = document.getElementById(element_id.INVENTORY_LIST),
              inventory_keys = Object.keys(data.fragments),
              selected_sort = document.getElementById(element_id.SORTING_OPTIONS_LIST).value;
        list_elem.innerHTML = "";
        if (inventory_keys.length > 0) {
            // ADD INVENTORY
            let counter = 0;
            if (selected_sort === sorting_options.QUANTITY_ASCENDING) {
                Object.keys(get_sorted_inventory()).forEach(frag_name => add_item(frag_name));
            }
            else if (selected_sort === sorting_options.QUANTITY_DESCENDING) {
                Object.keys(get_sorted_inventory(false)).forEach(frag_name => add_item(frag_name));
            }
            else {
                // NO SORT
                inventory_keys.forEach(frag_name => add_item(frag_name));
            }

            function add_item(frag_name) {
                append_inventory_item("inventory_item-" + (counter++), frag_name, get_amount(frag_name));
            }
        }
        else {
            // INVENTORY IS EMPTY ; CREATE/DISPLAY MESSAGE
            list_elem.innerHTML = "<div style='font-style: italic; font-weight: bold; padding: 30px 0; -webkit-filter: opacity(30%); filter: opacity(30%);'><translate text='inventory.inventory_empty'>" +
                ((webpage.language.is_english()) ?
                    "The inventory is empty..." :
                    webpage.language.data()[webpage.language.tags.INVENTORY]['inventory_empty']) +
                "</translate></div>";
        }

        /**
         * HELPER FUNCTION ; APPENDS AN INVENTORY ITEM ELEMENT INTO THE APPROPRIATE ELEMENT.
         *
         * @param {string}    elem_id        ELEMENT ID OF THE INVENTORY ITEM.
         * @param {string}    item_name      ITEM NAME IN ENGLISH TO ADD.
         * @param {number}    item_amount    AMOUNT OF THE ITEM THAT EXISTS IN THE INVENTORY.
         */
        function append_inventory_item(elem_id, item_name, item_amount) {
            const div = document.createElement("div");
            div.id = elem_id;
            div.classList.add("inventory_item", "item-sprite", webpage.get_item_sprite_class(item_name));
            div.title = item_name;
            div.onclick = () => {
                onclick_inventory_item(elem_id, event);
            };

            const delete_img = document.createElement("img");
            delete_img.id = elem_id + "-delete";
            delete_img.classList.add("inventory_item-delete-img");
            delete_img.src = webpage.get_webpage_image_path("red_x");
            delete_img.alt = "";
            div.appendChild(delete_img);

            const span = document.createElement("span");
            span.id = elem_id + "-amount";
            span.classList.add("inventory_item-text");
            span.innerHTML = item_amount + "";
            div.appendChild(span);

            const input = document.createElement("input");
            input.id = elem_id + "-input";
            input.classList.add("inventory_item-input");
            input.type = "number";
            input.hidden = true;
            div.appendChild(input);

            list_elem.appendChild(div);

            // SETUP KEY EVENT TO CHECK IF INPUT ELEMENT IS SELECTED AND ENTER KEY IS PRESSED
            $("#" + elem_id + "-input").off().keyup(function (event) {
                if (event.key === "Enter") {
                    onclick_inventory_item("", null);
                }
            });
        }
    }

    /**
     * SWITCH INVENTORY MODES.
     * ANY IN PROGRESS EDITING WILL BE SAVED.
     *
     * @param {string}    target_mode    ELEMENT ID OF MODE BUTTON.
     */
    function switch_mode(target_mode) {
        if (target_mode !== status.MODE) {
            const list_elem = document.getElementById(element_id.INVENTORY_LIST),
                  catalog_elem = document.getElementById(element_id.CATALOG);
            // SAVE CURRENTLY EDITING ITEM
            if (status.MODE === element_id.LIST && status.EDITING !== "") {
                onclick_inventory_item("", null);
            }
            // REMOVE RED X IMAGES
            if (status.MODE === element_id.REMOVE) {
                list_elem.classList.remove("remove");
            }
            // HIDE CATALOG
            if (status.MODE === element_id.ADD) {
                list_elem.hidden = false;
                catalog_elem.hidden = true;
            }
            // CURRENT MODE IS LIST AND SWITCHING TO REMOVE
            if (status.MODE === element_id.LIST && target_mode === element_id.REMOVE) {
                // REBUILD LIST TO GET RID OF ITEMS WITH 0 AMOUNT
                build_list();
            }

            $("#" + element_id.LIST).removeClass("is-open");
            $("#" + element_id.ADD).removeClass("is-open");
            $("#" + element_id.REMOVE).removeClass("is-open");
            $("#" + element_id.DELETE).removeClass("is-open");
            $("#" + target_mode).addClass("is-open");

            if (target_mode === element_id.REMOVE) {
                document.getElementById(element_id.DELETE).classList.add("is-open");
                list_elem.classList.add("remove");
            }
            if (target_mode === element_id.ADD) {
                list_elem.hidden = true;
                catalog_elem.hidden = false;
                $("#" + element_id.SORTING_OPTIONS).hide();
            }
            else {
                $("#" + element_id.SORTING_OPTIONS).show();
            }
            status.MODE = target_mode;
        }
    }

    /**
     * USED FOR THE "DELETE ALL" BUTTON ; INVENTORY IS CLEARED AND LIST IS REFRESHED.
     * THE DELETE ALL BUTTON IS ONLY VISIBLE IF "REMOVE" MODE IS ACTIVE.
     */
    function delete_all_button() {
        delete_all();
        build_list();
        status.UNSAVED_CHANGES = true;
    }

    /**
     * BUILDS THE CATALOG OF INVENTORY ITEMS. THE CATALOG WILL ONLY BE BUILT IF status.IS_CATALOG_BUILT === false.
     * status.IS_CATALOG_BUILT WILL ONLY BE RESET IF THERE HAS BEEN ANY CHANGES MADE WITH EQUIPMENT DATA VERSIONS.
     */
    function build_catalog() {
        if (!status.IS_CATALOG_BUILT) {
            let html = "",
                misc_html = "<br><hr>",
                equip_data = equipment_data.data();
            let current_rarity = equipment_data.rarity.COMMON;

            for (const item_name in equip_data) {
                const item_rarity = equip_data[item_name][equipment_data.tags.RARITY],
                      item_class = webpage.get_item_sprite_class(item_name),
                      html_string = "<i class=\"inventory_catalog-item item-sprite " + item_class + "\" title=\"" + item_name + "\" " +
                          "onclick='inventory.onclick_catalog_item(\"" + equipment_data.apostrophe.CONVERT(item_name) + "\")'></i>";

                // REPOSITION MEMORY PIECES TO THE BOTTOM
                if (item_rarity === equipment_data.rarity.MISC) {
                    misc_html += html_string;
                    continue;
                }

                if (current_rarity !== item_rarity) {
                    // NEW RARITY TYPE FOUND ; ADD NEW LINE
                    html += "<br><hr>";
                    current_rarity = item_rarity;
                }
                html += html_string;
            }
            document.getElementById(element_id.CATALOG).innerHTML = html + misc_html;
            status.IS_CATALOG_BUILT = true;
        }
    }

    /**
     * SWITCHES BETWEEN EITHER "FRAGMENT" OR "FULL EQUIPMENT" MODE IN THE CATALOG PROMPT.
     * THE AMOUNT INPUT IS RE-SELECTED AND RE-FOCUSED UPON SWITCHING.
     *
     * @param {Object}    element    "FRAGMENT MODE" OR "EQUIPMENT MODE" ELEMENT THAT WAS CLICKED ON.
     */
    function catalog_prompt_option_toggle(element) {
        const show_fragment = element.id === element_id.PROMPT_FRAGMENT_OPTION;
        document.getElementById(element_id.PROMPT_ADD_FRAGMENT).hidden = !show_fragment;
        document.getElementById(element_id.PROMPT_ADD_EQUIPMENT).hidden = show_fragment;
        document.getElementById(element_id.PROMPT_FRAGMENT_OPTION).classList.toggle("low-opacity");
        document.getElementById(element_id.PROMPT_EQUIPMENT_OPTION).classList.toggle("low-opacity");
        const input = document.getElementById(element_id.PROMPT_INPUT);
        input.select();
        input.focus();
    }

    /**
     * CLOSES THE CATALOG PROMPT AND REVERSES ANY DOCUMENT CHANGES MADE WHEN THE CATALOG PROMPT WAS OPENED.
     */
    function catalog_prompt_cancel() {
        document.getElementById(element_id.PROMPT).hidden = true;
        document.getElementById(element_id.CATALOG).hidden = false;
        document.getElementById(element_id.LIST).disabled =
            document.getElementById(element_id.ADD).disabled =
                document.getElementById(element_id.REMOVE).disabled = false;
        status.CATALOG_SELECTED = "";

        // SCROLL INTO VIEW + 20px OFFSET
        status.CATALOG_SELECTED_ELEMENT.scrollIntoView();
        document.getElementById(element_id.MODAL).scrollTop -= 20;
        status.CATALOG_SELECTED_ELEMENT = null;
    }

    /**
     * DEPENDING ON THE CATALOG PROMPT MODE AND AMOUNT DEFINED, ADD THAT TO THE INVENTORY.
     * THE AMOUNT OF INVENTORY + WHAT'S BEING ADDED CANNOT EXCEED 9999 AND WILL BE SET TO 9999 IF IT DOES GO ABOVE.
     * INVENTORY IS SAVED AFTER.
     */
    function catalog_prompt_add() {
        const add_fragments = !document.getElementById(element_id.PROMPT_FRAGMENT_OPTION).classList.contains("low-opacity"),
              item_amount = error_check_amount(document.getElementById(element_id.PROMPT_INPUT).value);

        if (item_amount > 0) {
            let recipe = {};
            if (!add_fragments) {
                recipe = equipment_data.recipe.get(status.CATALOG_SELECTED, item_amount);
            }
            else {
                recipe[status.CATALOG_SELECTED + (equipment_data.data()[status.CATALOG_SELECTED][equipment_data.tags.HAS_FRAGMENTS] ? " Fragment" : "")]
                    = item_amount;
            }

            for (const item_name in recipe) {
                const item_amount = recipe[item_name];
                if (data.fragments[item_name] !== undefined) {
                    const add_amount = get_amount(item_name) + item_amount;
                    set_amount(item_name, (add_amount > status.MAX_ITEM_AMOUNT ? status.MAX_ITEM_AMOUNT : add_amount), false);
                }
                else {
                    set_amount(item_name, (item_amount > status.MAX_ITEM_AMOUNT ? status.MAX_ITEM_AMOUNT : item_amount), false);
                }
            }
            if (Object.keys(recipe).length > 0) {
                save();
            }

            build_list();
            status.UNSAVED_CHANGES = true;
        }

        // REVERT DOCUMENT BACK TO NORMAL
        catalog_prompt_cancel();
    }

    /**
     * APPLY INVENTORY CONTENTS TO THE GIVEN MERGED RECIPE.
     * THE ARGUMENTS PASSED TO THIS FUNCTION CAN MODIFY THE RETURNED merged_recipe.
     * THE merged_recipe IS CLONED, SO THE OBJECT PASSED WILL NOT BE MODIFIED.
     *
     * @param {Object}     merged_recipe                 MERGED RECIPE OF ALL REQUESTED ITEMS.
     * @param {boolean}    delete_item_if_zero           IF TRUE, THE RECIPE COMPONENT WILL BE DELETED FROM THE merged_recipe IF THE APPLIED AMOUNT EQUALS 0.
     * @param {boolean}    keep_old_amount               IF TRUE, THE REQUIRED AMOUNT IN RECIPE WILL NOT BE MODIFIED, OTHERWISE, PERFORM required_amount - inventory_amount.
     * @param {boolean}    set_old_amount_as_negative    IF TRUE, SET THE REQUIRED AMOUNT IN RECIPE TO NEGATIVE ; i.e. {"Iron Blade": 10} => {"Iron Blade": -10}.
     * @return {Object} CLONED AND MODIFIED merged_recipe AFTER APPLYING INVENTORY CONTENTS.
     */
    function apply_inventory_to_recipe(merged_recipe, delete_item_if_zero = false, keep_old_amount = false, set_old_amount_as_negative = false) {
        merged_recipe = jQuery.extend({}, merged_recipe);
        if (Object.keys(data.fragments).length > 0 && Object.keys(merged_recipe).length > 0) {
            for (const frag_name in merged_recipe) {
                const frag_amount = merged_recipe[frag_name];
                const inventory_amount = get_amount(frag_name);
                merged_recipe[frag_name] = (frag_amount - inventory_amount <= 0) ?
                    (set_old_amount_as_negative ? -frag_amount : 0) :
                    (keep_old_amount ? frag_amount : frag_amount - inventory_amount);
                if (delete_item_if_zero && merged_recipe[frag_name] === 0) {
                    delete merged_recipe[frag_name];
                }
            }
        }
        return merged_recipe;
    }

    /**
     * ERROR CHECKS THE GIVEN AMOUNT TO MAKE SURE IT'S VALID.
     * ITEM AMOUNTS CANNOT BE:
     *     - ABOVE THE DEFINED MAX ITEM AMOUNT (9999)
     *     - BE NEGATIVE
     *     - BE NaN
     *     - BE A DECIMAL
     * @param {number}    item_amount    ITEM AMOUNT TO ERROR CHECK.
     * @return {number} A VALID NUMBER AFTER ERROR CHECKING.
     */
    function error_check_amount(item_amount) {
        item_amount = (item_amount > status.MAX_ITEM_AMOUNT ? status.MAX_ITEM_AMOUNT : item_amount);
        item_amount = (item_amount < 0) ? Math.abs(item_amount) : item_amount;
        item_amount = (isNaN(item_amount) ? 0 : item_amount);
        return Math.round(item_amount);
    }

    /**
     * CHECKS IF THE INVENTORY IS EMPTY.
     *
     * @return {boolean} TRUE IF THE INVENTORY IS EMPTY.
     */
    function is_inventory_empty() {
        return Object.keys(data.fragments).length === 0;
    }

    function get_sorted_inventory(ascending = true) {
        return Object.entries(data.fragments)
            .sort(([, a],[, b]) => {
                if (ascending) {
                    return a - b;
                }
                else {
                    return b - a;
                }
            })
            .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    }

    return {
        init: init,
        remove: remove,
        get_amount: get_amount,
        check_amount: check_amount,
        switch_mode: switch_mode,
        delete_all_button: delete_all_button,
        toggle_inventory_modal: toggle_inventory_modal,
        set_catalog_build_state: set_catalog_build_state,
        onclick_catalog_item: onclick_catalog_item,
        catalog_prompt_option_toggle: catalog_prompt_option_toggle,
        catalog_prompt_add: catalog_prompt_add,
        catalog_prompt_cancel: catalog_prompt_cancel,
        apply_to_recipe: apply_inventory_to_recipe,
        is_empty: is_inventory_empty,
        build_list: build_list
    }
})();
const data_display = (function () {
    let tips_are_enabled = true;

    const item_table = (function () {
        const element_id = Object.freeze({
            COMMON_TABLE: "common-item-table",
            COPPER_TABLE: "copper-item-table",
            SILVER_TABLE: "silver-item-table",
            GOLD_TABLE: "gold-item-table",
            PURPLE_TABLE: "purple-item-table",
            RED_TABLE: "red-item-table",
            GREEN_TABLE: "green-item-table",
            MISC_TABLE: "misc-item-table"
        });
        const max_input = Object.freeze({
            ALL: 99,    // MAX AMOUNT YOU CAN ENTER FOR COMMON/COPPER/GOLD/PURPLE/ETC ITEMS
            MISC: 500   // MAX AMOUNT YOU CAN ENTER FOR MEMORY PIECES
        });
        const ITEM_TABLE_ITEM_CLASS = "item-table-item";
        let status = {
            READY: false,       // WILL BE TRUE AFTER THE ITEM TABLE IS BUILT ; USED TO IGNORE THE PREVIOUS AMOUNT COUNT
            SELECTED: {}        // CURRENTLY SELECTED ITEMS WILL BE STORED HERE TO RESTORE THEIR VALUES WHEN ITEM TABLE IS REBUILT.
        };

        /**
         * GET DATA FROM EQUIPMENT DATA AND ADD ITEMS TO THEIR RARITY CATEGORIES
         */
        function build() {
            const data = equipment_data.data();

            // COLLECT CURRENT ITEM TABLE DATA IF ITEM TABLE IS READY
            if (status.READY) {
                let previous_element_id = {};
                // GO THROUGH ALL ELEMENTS WITH .item-table-item and SAVE THEIR ELEMENT IDS.
                let coll = document.getElementsByClassName(ITEM_TABLE_ITEM_CLASS);
                for (let i = 0, j = coll.length ; i < j ; i++) {
                    previous_element_id[coll[i].title] = coll[i].id;
                }

                // GO THROUGH ALL ITEMS AND SAVE THEIR VALUES
                let browsed = [];
                for (const item_name in data) {
                    const item_id = data[item_name][equipment_data.tags.ID];
                    const element = document.getElementById(item_id);

                    if (element) {
                        if (item_name !== element.title) {
                            // ITEM DOESNT MATCH ELEMENT TITLE, GET VALUE FROM THE PREVIOUS ID AND SAVE THE SELECTED AMOUNT
                            if (previous_element_id.hasOwnProperty(item_name)) {
                                const selected_amt = document.getElementById(previous_element_id[item_name] + "-amt").value;
                                if (selected_amt >= 1) {
                                    status.SELECTED[item_id] = selected_amt;
                                }
                            }
                            browsed.push(element.title);
                        }
                        else if (document.getElementById(item_id + "-amt")) {
                            // ITEM NAME DOES MATCH WHAT IT'S INTENDED FOR
                            const selected_amt = document.getElementById(item_id + "-amt").value;
                            if (selected_amt >= 1) {
                                status.SELECTED[item_id] = selected_amt;
                            }
                        }
                    }
                    else if (browsed.includes(item_name)) {
                        const selected_amt = document.getElementById(previous_element_id[item_name] + "-amt").value;
                        if (selected_amt >= 1) {
                            status.SELECTED[item_id] = selected_amt;
                        }
                    }
                }
            }

            /**
             * TAKES THE #template_item-table-item TEMPLATE AND MODIFY IT TO INCLUDE THE CORRECT INFORMATION
             * ABOUT THE ITEM BEFORE APPENDING IT TO THE GIVEN table_id.
             *
             * @param {string}    table_id     TABLE ELEMENT ID TO APPEND THE ITEM TO ; i.e. element_id.COMMON_TABLE.
             * @param {string}    item_name    ITEM NAME IN ENGLISH ; i.e. "Iron Blade".
             * @param {string}    item_id      priconne-quest-helper ID ; i.e. "common-1".
             * @param {string}    rarity       ITEM RARITY CLASS ; i.e. "common".
             */
            function append_item (table_id, item_name, item_id, rarity) {
                const item_div = document.createElement("div");
                item_div.classList.add("item-table-item_div");

                // SETUP BUTTON
                const button = document.createElement("button");
                button.id = item_id;
                button.title = item_name;
                button.classList.add("item-table-item", "item-sprite_button", "item-sprite", webpage.get_item_sprite_class(item_name));
                if (data_display.item_focus.data().ID === button.id) {
                    button.classList.add(data_display.item_focus.FOCUSED_ITEM_CLASS);
                }
                button.onclick = () => {
                    data_display.item_focus.focus(equipment_data.apostrophe.CONVERT(item_name), button.id);
                };
                button.style.display = "block";
                button.style.margin = "auto";
                item_div.appendChild(button);

                // SETUP INPUT
                let existing = -1;
                if (status.READY && status.SELECTED.hasOwnProperty(item_id)) {
                    existing = status.SELECTED[item_id];
                    delete status.SELECTED[item_id];
                }
                const input = document.createElement("input");
                input.id = item_id + "-amt";
                input.classList.add("notranslate", "item-table-item_input");
                input.type = "number";
                input.min = 0;
                input.max = ((rarity === equipment_data.rarity.MISC) ? max_input.MISC : max_input.ALL);
                input.value = ((existing > -1) ? existing : 0);
                input.onchange = function () {
                    data_display.update(this);
                };
                item_div.appendChild(input);

                document.getElementById(table_id).appendChild(item_div);
            }

            // BUILD HTML
            $("#" + element_id.COMMON_TABLE).empty();
            $("#" + element_id.COPPER_TABLE).empty();
            $("#" + element_id.SILVER_TABLE).empty();
            $("#" + element_id.GOLD_TABLE).empty();
            $("#" + element_id.PURPLE_TABLE).empty();
            $("#" + element_id.RED_TABLE).empty();
            $("#" + element_id.GREEN_TABLE).empty();
            $("#" + element_id.MISC_TABLE).empty();
            for (const item_name in data) {
                const item_data = data[item_name];
                const id = item_data[equipment_data.tags.ID];
                const rarity = item_data[equipment_data.tags.RARITY];
                switch (rarity) {
                    case equipment_data.rarity.COMMON:
                        append_item(element_id.COMMON_TABLE, item_name, id, rarity);
                        break;
                    case equipment_data.rarity.COPPER:
                        append_item(element_id.COPPER_TABLE, item_name, id, rarity);
                        break;
                    case equipment_data.rarity.SILVER:
                        append_item(element_id.SILVER_TABLE, item_name, id, rarity);
                        break;
                    case equipment_data.rarity.GOLD:
                        append_item(element_id.GOLD_TABLE, item_name, id, rarity);
                        break;
                    case equipment_data.rarity.PURPLE:
                        append_item(element_id.PURPLE_TABLE, item_name, id, rarity);
                        break;
                    case equipment_data.rarity.RED:
                        append_item(element_id.RED_TABLE, item_name, id, rarity);
                        break;
                    case equipment_data.rarity.GREEN:
                        append_item(element_id.GREEN_TABLE, item_name, id, rarity);
                        break;
                    case equipment_data.rarity.MISC:
                        append_item(element_id.MISC_TABLE, item_name, id, rarity);
                        break;
                    default:
                        // IGNORED
                        break;
                }
            }

            if (!status.READY) {
                status.READY = true;
            }
        }

        /**
         * RESETS ALL INPUT VALUES IN ITEM TABLES BACK TO 0.
         */
        function clear() {
            const data = equipment_data.data();
            for (const item_name in data) {
                const item_data = data[item_name];
                document.getElementById(item_data[equipment_data.tags.ID] + "-amt").value = 0;
            }
        }

        /**
         * GOES THROUGH THE DESIGNATED RARITY ITEM TABLE AND ERROR CHECKS ALL INPUTS.
         * AFTER VALUE CHECKING, RETURN AN OBJECT CONTAINING THE AMOUNT OF ITEMS REQUESTED.
         *
         * @param {string}    item_rarity    RARITY CLASS TO SEARCH THROUGH ; i.e. IRON BLADE, KILLER PENCIL, ETC WOULD BE "common".
         * @return {Object} INFORMATION ABOUT HOW MUCH OF AN ITEM IS REQUESTED.
         */
        function get_data(item_rarity) {
            let items = {};
            for (let i = 1, j = equipment_data.equipment_count()[item_rarity] + 1 ; i < j ; i++) {
                const value_elem = document.getElementById(item_rarity + "-" + i + "-amt");
                if (!value_elem) {
                    continue;
                }
                let value = Math.round(value_elem.value);
                value_elem.value = value;

                if (value >= 1) {
                    if (item_rarity === equipment_data.rarity.MISC && value > max_input.MISC) {
                        value_elem.value = max_input.MISC;
                        value = max_input.MISC;
                    }
                    else if (item_rarity !== equipment_data.rarity.MISC && value > max_input.ALL) {
                        value_elem.value = max_input.ALL;
                        value = max_input.ALL;
                    }

                    items[document.getElementById(item_rarity + "-" + i).title] = value;
                }
            }

            return items;
        }

        return {
            build: build,
            clear: clear,
            get: get_data
        }
    })();
    const item_focus = (function () {
        const element_id = {
            FOCUSED_ITEM_POPUP: "focused-item-popup",
            FOCUSED_ITEM_IMAGE: "focused-item-image"
        };
        let focused_item = {
            NAME: "",
            ID: ""
        };
        const FOCUSED_ITEM_CLASS = "focused-item";

        /**
         * ENABLE FOCUS ON AN ITEM OR REMOVE IT IF THE SAME ITEM IS SELECTED.
         * WHEN AN ITEM IS FOCUSED, ONLY QUESTS WITH THAT ITEM SHOULD APPEAR IN THE RECOMMENDED QUESTS LIST.
         *
         * @param {string}    item_name    ENGLISH NAME OF THE ITEM TO FOCUS ON ; i.e. "Iron Blade".
         * @param {string}    button_id    BUTTON ELEMENT ID AKA {priconne-quest-helper ID}.
         */
        function focus_on_item(item_name, button_id) {
            // item_name MAY HAVE A PLACEHOLDER APOSTROPHE, REVERT IT BACK
            item_name = equipment_data.apostrophe.REVERT(item_name);

            if (focused_item.ID === button_id) {
                // DISABLE FOCUSED ITEM
                $("#" + button_id).toggleClass(FOCUSED_ITEM_CLASS);
                focused_item = { NAME: "", ID: "" };
                $("#" + element_id.FOCUSED_ITEM_POPUP).attr("hidden", true);
                webpage.print("No longer focusing on an item", "Item Focus");
            }
            else {
                // REMOVE FOCUS FROM EXISTING FOCUSED ITEM IF EXISTS
                if (focused_item.ID !== "") {
                    $("#" + focused_item.ID).toggleClass(FOCUSED_ITEM_CLASS);
                }

                const item_element = $("#" + button_id);
                item_element.toggleClass("focused-item");
                focused_item = {
                    NAME: item_name,
                    ID: button_id
                };
                $("#" + element_id.FOCUSED_ITEM_POPUP)
                    .attr("hidden", false)
                    .off("click")
                    .click(function () {
                        focus_on_item(item_name, button_id);
                    });
                $("#" + element_id.FOCUSED_ITEM_IMAGE).removeClass().addClass("item-sprite " + webpage.get_item_sprite_class(item_name));
                webpage.print("Now focusing on: " + focused_item.NAME, "Item Focus");
            }

            recommended_quests.refresh();
        }

        /**
         * RESETS ITEM FOCUS TO AN EMPTY STATE.
         */
        function clear_focus() {
            focused_item = { NAME: "", ID: "" };
            $("#" + element_id.FOCUSED_ITEM_POPUP).attr("hidden", true);
        }

        /**
         * RETURN FOCUSED ITEM DATA.
         *
         * @return {{ID: string, NAME: string}} INFORMATION ABOUT THE CURRENT FOCUSED ITEM.
         */
        function get_focus() {
            return focused_item;
        }

        return {
            focus: focus_on_item,
            clear: clear_focus,
            data: get_focus,
            FOCUSED_ITEM_CLASS: FOCUSED_ITEM_CLASS
        }
    })();
    const requested_items = (function () {
        const element_id = Object.freeze({
            TABLE: "requested-item-table"
        });

        /**
         * BUILD HTML FOR THE REQUESTED ITEMS TABLE.
         * THE REQUESTED ITEMS TABLE DISPLAYS WHICH ITEMS AND THEIR AMOUNT THAT THE USER SELECTED
         * IN THE ITEM TABLES.
         *
         * @param {Object}    items    INFORMATION OF THE ITEMS THE USER SELECTED ; i.e. {item_name: item_amount}
         */
        function build(items) {
            const table = document.getElementById(element_id.TABLE);
            table.innerHTML = "";
            if (!jQuery.isEmptyObject(items)) {
                for (const item_name in items) {
                    const div = document.createElement("div");
                    div.title = item_name;
                    div.classList.add("requested-item", "item-amount", "item-sprite", webpage.get_item_sprite_class(item_name));

                    const span = document.createElement("span");
                    span.innerHTML = items[item_name];
                    div.appendChild(span);

                    table.appendChild(div);
                }
            }
        }

        return {
            build: build
        }
    })();
    const required_ingredients = (function () {
        const element_id = Object.freeze({
            TABLE: "required-ingredient-table"
        });

        /**
         * ADDS ITEMS TO THE REQUIRED INGREDIENTS CATEGORIES USING THE GIVEN merged_recipe.
         *
         * @param {Object}    merged_recipe    OBJECT CONTAINING ALL THE FRAGMENTS AND THEIR AMOUNTS NEEDED.
         */
        function build(merged_recipe) {
            merged_recipe = inventory.apply_to_recipe(merged_recipe, false, true, true);
            const table = document.getElementById(element_id.TABLE);

            // GET PRIORITY ITEMS (MAKE SURE THEY'RE BUILT BEFORE USED)
            if (!projects.data().items_compiled) {
                projects.build_priority_items();
            }

            // SORT RECIPE BY AMOUNT NEEDED ; DESCENDING
            let sorted = Object.keys(merged_recipe)
                .map(i => [i, merged_recipe[i]])
                .sort((a, b) => b[1] - a[1]);

            // CLEAR EXISTING HTML AND APPEND FRAGMENT ELEMENTS
            table.innerHTML = "";
            if (sorted.length > 0) {
                let priority_item_elements = [];
                for (let [item_name, amount] of sorted) {
                    let is_priority = false;
                    if (projects.data().items.includes(item_name) && settings.get_settings()[settings.tags.SHOW_PRIORITY_ITEMS_FIRST]) {
                        // ITEM EXISTS IN A PRIORITY PROJECT
                        is_priority = true;
                    }

                    const is_disabled = amount <= 0;
                    amount = Math.abs(amount);

                    const button = document.createElement("button");
                    button.id = "request-button-" + item_name.split(' ').join('_');
                    button.title = item_name;
                    button.classList.add("required-ingredients_button", "item-sprite_button", "item-amount", "item-sprite", webpage.get_item_sprite_class(item_name));

                    const span = document.createElement("span");
                    span.innerHTML = amount;
                    button.appendChild(span);

                    if (is_disabled) {
                        button.classList.add("disabled");
                        const crate = document.createElement("img");
                        crate.classList.add("required-ingredients_button_inventory-crate");
                        crate.src = webpage.get_webpage_image_path("Inventory_Crate");
                        crate.alt = "";
                        button.appendChild(crate);

                        // ITEM ALREADY COMPLETED (SUFFICIENT ITEMS IN INVENTORY) ; REMOVE PRIORITY
                        is_priority = false;
                    }
                    else {
                        button.classList.add("pointer-cursor");
                        if (projects.blacklist.is_item_exist(item_name)) {
                            button.classList.add("low-opacity");
                        }
                        button.onclick = () => {
                            webpage.print((projects.blacklist.toggle(item_name) ? "Disabled " : "Enabled ") + item_name, "Blacklist");
                        };
                    }

                    if (is_priority) {
                        // ADD PRIORITY ITEMS TO AN ARRAY TO ADD LATER
                        priority_item_elements.push(button);
                    }
                    else {
                        table.appendChild(button);
                    }
                }

                // ADD PRIORITIZED ITEMS ABOVE THE REST
                if (priority_item_elements.length > 0) {
                    // ADD <br> ELEMENTS TO EASILY IDENTIFY PRIORITY ITEMS
                    table.insertBefore(document.createElement("br"), table.firstChild);
                    table.insertBefore(document.createElement("br"), table.firstChild);

                    // REVERSE ARRAY SO THAT LOWER QUANTITY ITEMS ARE ADDED FIRST
                    priority_item_elements.reverse();
                    for (let button of priority_item_elements) {
                        table.insertBefore(button, table.firstChild);
                    }
                }
            }
        }

        return {
            build: build
        }
    })();
    const recommended_quests = (function () {
        const element_id = Object.freeze({
            TABLE: "recommended-quest-table",
            DIV: "recommended-quest-div"
        });
        const score_values = Object.freeze({
            TOP_TWO: 1.0,
            THIRD: 0.75,
            SUBDROP: 0.5,
            PRIORITY_MULTIPLIER: 2.0
        });
        const difficulty = Object.freeze({
            HARD: "H",
            VERY_HARD: "VH"
        });
        const classes = Object.freeze({
            TITLE_COLOR_GREEN: "quest-title_bg_green",      // APPLY IF QUEST SCORE >= 2
            TITLE_COLOR_YELLOW: "quest-title_bg_yellow",    // APPLY IF QUEST SCORE >= 1
            TITLE_COLOR_RED: "quest-title_bg_red",          // APPLY IF QUEST SCORE < 1
            ODD_QUEST: "odd",                               // APPLY TO ODD NUMBERED QUESTS ; USED TO COLOR THEIR BACKGROUND
            EVEN_QUEST: "even",                             // APPLY TO EVEN NUMBERED QUESTS ; USED TO COLOR THEIR BACKGROUND
            REMOVE: "remove",                               // APPLY TO APPLICABLE ELEMENTS TO HIDE THEM
            DISABLED: "disabled",                           // APPLY TO APPLICABLE ELEMENTS TO GRAYSCALE THEM
            DISPLAY_TOP: "quest_display-top",               // USED FOR DROP PERCENT/REQUIRED AMOUNT ; TOP MEANS ALWAYS VISIBLE
            DISPLAY_BOTTOM: "quest_display-bottom",         // USED FOR DROP PERCENT/REQUIRED AMOUNT ; BOTTOM MEANS VISIBLE WHEN HOVER ONLY
            PRIORITY_ITEM: "quest_priority-item"            // GIVES A GLOW TO THE ITEM IF IT EXISTS IN A PRIORITIZED PROJECT
        });
        const PLACEHOLDER_IMAGE_NAME = "Placeholder";
        let loaded = {};

        /**
         * BUILDS THE RECOMMENDED QUESTS USING THE GIVEN merged_recipes.
         *
         * @param {Object}    merged_recipes    OBJECT CONTAINING FRAGMENT NAMES AND THEIR AMOUNTS NEEDED.
         */
        function build(merged_recipes) {
            // SHALLOW CLONE merged_recipes TO loaded (NOT CLONING WOULD CAUSE ISSUES WHEN USING delete LATER)
            loaded = jQuery.extend({}, merged_recipes);

            const parent_div = document.getElementById(element_id.DIV);
            const quest_table = document.getElementById(element_id.TABLE);
            const quests = quest_data.data();

            /**
             * CHECKS IF AN ITEM OR ITS FRAGMENT COUNTERPART EXISTS AS A REQUIRED COMPONENT IN A QUEST.
             * A REQUIRED COMPONENT IS IF IT EXISTS AS A MAIN ITEM OR AS A SUBDROP.
             *
             * @param {string}    item_name     ITEM NAME IN ENGLISH TO FIND ; i.e. "Iron Blade".
             * @param {Object}    quest_info    DATA OBJECT ABOUT A QUEST ; quest_data.data()[quest_id].
             * @return {boolean} STATUS IF THE ITEM EXISTS AS A REQUIRED COMPONENT OR NOT ; TRUE IF IT EXISTS.
             */
            function is_item_in_quest(item_name, quest_info) {
                let components = [];
                const values = Object.values(quest_info);
                values.forEach(function (d) {
                    if (typeof(d) === "object" && !Array.isArray(d)) {
                        components.push(d[quest_data.tags.ITEM_NAME]);
                    }
                });
                quest_info[quest_data.tags.SUBDROPS].forEach(function (n) {
                    components.push(n);
                });

                return components.indexOf(item_name) > -1 || components.indexOf(item_name + " Fragment") > -1;
            }

            // REMOVE DISABLED REQUIRED INGREDIENTS
            const bl = projects.blacklist.get();
            for (let i = 0, j = bl.length ; i < j ; i++) {
                if (merged_recipes.hasOwnProperty(bl[i])) {
                    delete merged_recipes[bl[i]];
                }
            }

            // APPLY INVENTORY
            merged_recipes = inventory.apply_to_recipe(merged_recipes, true, true);

            // GET PRIORITY ITEMS AND FIGURE OUT AMOUNT
            let priority_items = {};
            if (!projects.data().items_compiled) {
                projects.build_priority_items();
            }
            if (projects.data().items.length > 0) {
                for (let prioritized_project of projects.data().projects_priority) {
                    for (const [item_name, item_amount] of projects.data().projects[prioritized_project]) {
                        priority_items = equipment_data.recipe.merge(priority_items, equipment_data.recipe.get(item_name, item_amount))
                    }
                }
            }

            if (!jQuery.isEmptyObject(merged_recipes)) {
                // GENERATE QUEST SCORES
                const setting = settings.get_settings();
                let quest_scores = [];

                for (let quest_id in quests) {
                    const quest_info = quests[quest_id];
                    const quest_chapter = quest_data.get_quest_chapter(quest_id);

                    // CHECK IF QUEST CHAPTER IS WITHIN RANGE OF MIN/MAX IN SETTINGS
                    if (quest_chapter >= setting.min_quest_chapter && quest_chapter <= setting.max_quest_chapter) {
                        const is_normal = !quest_id.includes(difficulty.HARD);
                        const is_hard = quest_id.includes(difficulty.HARD) && !quest_id.includes(difficulty.VERY_HARD);
                        const is_very_hard = quest_id.includes(difficulty.VERY_HARD);

                        // FILTER OUT QUESTS THAT DON'T MEET THE DEFINED QUEST DIFFICULTY
                        if (setting.quest_filter !== settings.filter_settings.ALL) {
                            if ((is_hard || is_very_hard) && setting.quest_filter === settings.filter_settings.NORMAL) {
                                continue;
                            }
                            else if ((is_normal || is_very_hard) && setting.quest_filter === settings.filter_settings.HARD) {
                                continue;
                            }
                            else if ((is_normal || is_hard) && setting.quest_filter === settings.filter_settings.VERY_HARD) {
                                continue;
                            }
                        }

                        // FILTER OUT QUESTS THAT DON'T HAVE THE FOCUSED ITEM
                        const focused_item_name = data_display.item_focus.data().NAME;
                        if ((focused_item_name !== "") && !(is_item_in_quest(focused_item_name, quest_info))) {
                            continue;
                        }

                        // FIGURE OUT QUEST SCORE
                        function get_quest_score(item_name, base_score) {
                            if (typeof(item_name) === "object") {
                                item_name = item_name[quest_data.tags.ITEM_NAME];
                            }
                            if (merged_recipes.hasOwnProperty(item_name) && item_name !== undefined) {
                                return base_score * (projects.data().items.includes(item_name) ? score_values.PRIORITY_MULTIPLIER : 1);
                            }
                            return 0;
                        }

                        let quest_score = 0;
                        // CHECK MAIN ITEMS
                        quest_score += get_quest_score(quest_info[quest_data.tags.ITEM + 1], quest_info[quest_data.tags.ITEM + 1][quest_data.tags.DROP_PERCENT]);
                        quest_score += get_quest_score(quest_info[quest_data.tags.ITEM + 2], quest_info[quest_data.tags.ITEM + 2][quest_data.tags.DROP_PERCENT]);
                        quest_score += get_quest_score(quest_info[quest_data.tags.ITEM + 3], quest_info[quest_data.tags.ITEM + 3][quest_data.tags.DROP_PERCENT]);
                        quest_score += get_quest_score(quest_info[quest_data.tags.ITEM + 4],
                            (typeof(quest_info[quest_data.tags.ITEM + 4]) === "object") ? quest_info[quest_data.tags.ITEM + 4][quest_data.tags.DROP_PERCENT] : 0);
                        quest_score += get_quest_score(quest_info[quest_data.tags.CHAR_SHARD],
                            (typeof(quest_info[quest_data.tags.CHAR_SHARD]) === "object") ? quest_info[quest_data.tags.CHAR_SHARD][quest_data.tags.DROP_PERCENT] : 0);

                        // CHECK SUBDROPS
                        const quest_subdrops = quest_info[quest_data.tags.SUBDROPS];
                        for (let i = 0, j = quest_subdrops.length ; i < j ; i++) {
                            const subdrops_percent = quest_info[quest_data.tags.SUBDROPS_PERCENT];
                            if (subdrops_percent === undefined) {
                                // ASSUME ALL SUBDROPS ARE 20% DROP RATE
                                quest_score += get_quest_score(quest_subdrops[i], score_values.SUBDROP);
                            }
                            else {
                                quest_score += get_quest_score(quest_subdrops[i], subdrops_percent[i]);
                            }
                        }

                        if (quest_score > 0) {
                            if (is_normal) {
                                quest_score *= setting.normal_quest_drop_multiplayer;
                            } else if (is_hard) {
                                quest_score *= setting.hard_quest_drop_multiplayer;
                            } else if (is_very_hard) {
                                quest_score *= setting.very_hard_quest_drop_multiplayer;
                            }
                            quest_score /= quest_info["stamina"];
                            quest_scores.push([quest_id, +quest_score.toFixed(2)]);
                        }
                    }
                }
                quest_scores.sort(function (a, b) {
                    let quest_a = {
                        ID: a[0],
                        CHAPTER: quest_data.get_quest_chapter(a[0]),
                        NUMBER: quest_data.get_quest_number(a[0]),
                        VALUE: 0
                    };
                    let quest_b = {
                        ID: b[0],
                        CHAPTER: quest_data.get_quest_chapter(b[0]),
                        NUMBER: quest_data.get_quest_number(b[0]),
                        VALUE: 0
                    };
                    function get_value(quest) {
                        if (quest.NUMBER.includes(difficulty.VERY_HARD)) {
                            quest.NUMBER.replace(difficulty.VERY_HARD, "");
                            quest.VALUE += 2000;
                        }
                        if (quest.NUMBER.includes(difficulty.HARD)) {
                            quest.NUMBER.replace(difficulty.HARD, "");
                            quest.VALUE += 1000;
                        }
                        quest.VALUE += (quest.CHAPTER * 10000) + (parseInt(quest.NUMBER) * 10);
                    }
                    function sort_ascending(x, y) {
                        return x - y;
                    }
                    function sort_descending(x, y) {
                        return y - x;
                    }

                    get_value(quest_a);
                    get_value(quest_b);

                    // SORT ; IF QUEST SCORE ISN'T DIFFERENT THEN APPLY QUEST LIST SORT
                    let n = (setting.ascending_sort_quest_score ?
                        sort_ascending(a[1], b[1]) : sort_descending(a[1], b[1]));
                    if (n !== 0) {
                        return n;
                    }
                    return (setting.ascending_sort_quest_list ?
                        sort_ascending(quest_a.VALUE, quest_b.VALUE) : sort_descending(quest_a.VALUE, quest_b.VALUE));
                });

                quest_table.innerHTML = "";
                if (quest_scores.length > 0) {
                    let quest_count = 0;
                    for (let [quest_id, quest_score] of quest_scores) {
                        const quest_info = quests[quest_id];
                        const is_normal = !quest_id.includes(difficulty.HARD);
                        const is_hard = quest_id.includes(difficulty.HARD) && !quest_id.includes(difficulty.VERY_HARD);
                        const is_very_hard = quest_id.includes(difficulty.VERY_HARD);

                        /**
                         * HELPER FUNCTION ; CHECKS IF THE ITEM IS IN A PRIORITIZED PROJECT AND IS NOT BLACKLISTED.
                         *
                         * @param {string}    item_name    ITEM NAME IN ENGLISH ; i.e. "Iron Blade".
                         * @return {boolean} TRUE IF THE ITEM IS A PRIORITIZED AND REQUIRED ITEM.
                         */
                        function is_item_priority_and_needed(item_name) {
                            if (projects.data().items.includes(item_name)) {
                                return !projects.blacklist.get().includes(item_name);
                            }
                        }

                        /**
                         * CREATES A "QUEST ITEM" ELEMENT AND APPENDS IT TO THE PROVIDED ELEMENT.
                         *
                         * @param {Object}    element         DOCUMENT ELEMENT TO APPEND THE QUEST ITEM ELEMENT TO.
                         * @param {String}    item_name       ITEM NAME IN ENGLISH ; i.e. "Iron Blade".
                         * @param {number}    drop_percent    DROP PERCENTAGE THAT THE ITEM HAS ; i.e. 20.
                         */
                        function append_quest_item(element, item_name, drop_percent) {
                            let required_amount = merged_recipes.hasOwnProperty(item_name) ? merged_recipes[item_name] : 0;
                            item_name = (item_name === null ? PLACEHOLDER_IMAGE_NAME : item_name);
                            const item_div = document.createElement("div");
                            item_div.title = item_name;
                            item_div.classList.add("quest_item", "item-sprite", webpage.get_item_sprite_class(item_name));
                            if (item_name === PLACEHOLDER_IMAGE_NAME) {
                                item_div.classList.add(classes.REMOVE);
                            }
                            if (!merged_recipes.hasOwnProperty(item_name)) {
                                item_div.classList.add(classes.DISABLED);
                            }
                            if (is_item_priority_and_needed(item_name) && merged_recipes.hasOwnProperty(item_name)) {
                                item_div.classList.add(classes.PRIORITY_ITEM);
                            }
                            const drop_percent_div = document.createElement("span");
                            drop_percent_div.classList.add("quest_drop-percent", (setting.quest_display !== settings.display_options.AMOUNT ? classes.DISPLAY_TOP : classes.DISPLAY_BOTTOM));
                            drop_percent_div.innerHTML = drop_percent + "";
                            item_div.appendChild(drop_percent_div);
                            const req_amount_div = document.createElement("span");
                            req_amount_div.classList.add("quest_required-amount", (setting.quest_display !== settings.display_options.AMOUNT ? classes.DISPLAY_BOTTOM : classes.DISPLAY_TOP));

                            // SET REQUIRED AMOUNT TO AMOUNT IN PRIORITY PROJECTS IF SETTING IS ENABLED
                            if (setting[settings.tags.DISPLAY_PRIORITY_ITEM_AMOUNT]) {
                                // ONLY MODIFY REQUIRED AMOUNT FOR PRIORITIZED ITEMS
                                if (is_item_priority_and_needed(item_name) && required_amount > 0) {
                                    required_amount = priority_items[item_name];
                                }
                            }

                            // SUBTRACT REQUIRED AMOUNT FROM INVENTORY AMOUNT IF SETTING IS ENABLED
                            if (setting[settings.tags.SUBTRACT_AMOUNT_FROM_INVENTORY]) {
                                let amount_after_inventory = required_amount - inventory.get_amount(item_name);
                                req_amount_div.innerHTML = (amount_after_inventory > 0 ? amount_after_inventory : 0);
                            }
                            else {
                                req_amount_div.innerHTML = required_amount;
                            }
                            item_div.appendChild(req_amount_div);

                            element.appendChild(item_div);
                        }

                        const quest = document.createElement("div");
                        quest.classList.add("quest", (quest_count % 2 === 0 ? classes.ODD_QUEST : classes.EVEN_QUEST));

                        // QUEST HEADER
                        const quest_header = document.createElement("div");
                        quest_header.classList.add("quest_header");
                        // QUEST TITLE
                        const quest_title = document.createElement("div");
                        quest_title.classList.add("quest_title");
                        if (quest_score >= 7.2) {
                            quest_title.classList.add(classes.TITLE_COLOR_GREEN);
                        }
                        else if (quest_score >= 3.6) {
                            quest_title.classList.add(classes.TITLE_COLOR_YELLOW);
                        }
                        else {
                            quest_title.classList.add(classes.TITLE_COLOR_RED);
                        }
                        quest_title.innerHTML = (is_normal ? quest_id : "") +
                            (is_hard ? quest_id.replace(difficulty.HARD, "<span class='heart-red'> H</span>") : "") +
                            (is_very_hard ? quest_id.replace(difficulty.VERY_HARD, "<span class='heart-red'> VH</span>") : "");
                        quest_header.appendChild(quest_title);
                        // MEMORY PIECE
                        const quest_memory_piece = document.createElement("div"),
                            shard = quest_info[quest_data.tags.CHAR_SHARD],
                            is_shard_exists = shard !== undefined,
                            shard_name = (is_shard_exists ? shard[quest_data.tags.ITEM_NAME] : "");
                        quest_memory_piece.classList.add("quest_memory-piece");
                        if (!is_shard_exists) {
                            quest_memory_piece.classList.add(classes.REMOVE);
                        }
                        else if (!merged_recipes.hasOwnProperty(shard_name)) {
                            quest_memory_piece.classList.add(classes.DISABLED);
                        }
                        const memory_piece_img = document.createElement("img");
                        memory_piece_img.classList.add("quest_memory-piece-img");
                        memory_piece_img.title = (is_shard_exists ? shard_name : "");
                        memory_piece_img.src = webpage.get_item_image_path(is_shard_exists ? shard_name.split(' ').join('_') : PLACEHOLDER_IMAGE_NAME);
                        memory_piece_img.alt = "";
                        quest_memory_piece.appendChild(memory_piece_img);
                        const memory_piece_percent = document.createElement("div");
                        memory_piece_percent.classList.add("quest_memory-piece-percent");
                        memory_piece_percent.innerHTML = (is_shard_exists ? shard[quest_data.tags.DROP_PERCENT] : 0) + "%";
                        quest_memory_piece.appendChild(memory_piece_percent);
                        quest_header.appendChild(quest_memory_piece);
                        quest.appendChild(quest_header);

                        // QUEST SCORE
                        const quest_score_div = document.createElement("div");
                        quest_score_div.classList.add("quest_score");
                        if (setting.hide_quest_score) {
                            quest_score_div.classList.add(classes.REMOVE);
                        }
                        quest_score_div.innerHTML = quest_score + " pts<br>" + quest_info["stamina"] + " stamina";
                        quest.appendChild(quest_score_div);

                        // QUEST LINE 1
                        const quest_line_1 = document.createElement("br");
                        quest_line_1.classList.add("quest_line");
                        quest.appendChild(quest_line_1);

                        // QUEST ITEMS
                        const quest_items_div = document.createElement("div");
                        quest_items_div.classList.add("quest_items");
                        for (let i = 1, item = quest_info[quest_data.tags.ITEM + i] ;
                             item !== undefined ;
                             i++, item = quest_info[quest_data.tags.ITEM + i]) {
                            append_quest_item(quest_items_div, item[quest_data.tags.ITEM_NAME], item[quest_data.tags.DROP_PERCENT]);
                        }
                        quest.appendChild(quest_items_div);

                        // QUEST LINE 2
                        const quest_line_2 = document.createElement("br");
                        quest_line_2.classList.add("quest_line-2");
                        quest.appendChild(quest_line_2);

                        // QUEST SUBDROPS
                        const quest_subdrops_div = document.createElement("div");
                        quest_subdrops_div.classList.add("quest_subdrops");
                        const subdrops = quest_info[quest_data.tags.SUBDROPS];
                        for (let i = 0, j = subdrops.length ; i < j ; i++) {
                            const subdrops_percent = quest_info[quest_data.tags.SUBDROPS_PERCENT];
                            const drop_percent = subdrops_percent !== undefined ? subdrops_percent[i] : 20;
                            append_quest_item(quest_subdrops_div, subdrops[i], drop_percent);
                        }
                        quest.appendChild(quest_subdrops_div);

                        // APPEND TO QUEST TABLE
                        quest_table.appendChild(quest);
                        if (++quest_count >= setting.quest_shown_value) {
                            // STOP ADDING QUESTS IF THE AMOUNT EQUALS/EXCEEDS THE MAX AMOUNT IN SETTINGS
                            break;
                        }
                    }
                }

                // SHOW QUESTS
                parent_div.style.height = (quest_table.scrollHeight + 45) + "px";

                const waitForFinal = (function () {
                    let timers = {};
                    return function (callback, ms, uniqueID) {
                        if (!uniqueID) {
                            uniqueID = "Don't call this twice without an uniqueID";
                        }
                        if (timers[uniqueID]) {
                            clearTimeout(timers[uniqueID]);
                        }
                        timers[uniqueID] = setTimeout(callback, ms);
                    }
                })();
                /**
                 * UPDATE THE QUEST TABLE'S SIZE IF THE BROWSER WINDOW SIZE WAS MODIFIED.
                 */
                $(window).on("resize", function () {
                    waitForFinal(function () {
                        parent_div.style.height = (quest_table.scrollHeight + 45) + "px";
                    }, 500, "quest-resize");
                });
            }
            else {
                // HIDE QUESTS
                parent_div.style.height = "10px";
                quest_table.innerHTML = "";
                $(window).off("resize");
            }
        }

        /**
         * REFRESH THE QUEST TABLE USING THE CURRENTLY LOADED MERGED RECIPE.
         */
        function refresh() {
            if (!jQuery.isEmptyObject(loaded)) {
                build(loaded);
            }
        }

        return {
            build: build,
            refresh: refresh
        }
    })();

    /**
     * REMOVE ITEM FROM BLACKLIST AND BUILD DATA DISPLAY.
     * USUALLY CALLED WHEN AN INPUT IN THE ITEM TABLE IS UPDATED.
     *
     * @param {Object}    element    INPUT ELEMENT THAT TRIGGERED THE FUNCTION
     */
    function update(element = null) {
        const element_id = element.id;
        projects.blacklist.remove_item(element_id.substring(0, element_id.length - 4));
        build();
    }

    /**
     * READ VALUES IN ITEM TABLES AND BUILD REQUESTED ITEMS, REQUIRED INGREDIENTS, AND RECOMMENDED QUESTS.
     */
    function build() {
        let items = {...item_table.get(equipment_data.rarity.COMMON),
            ...item_table.get(equipment_data.rarity.COPPER),
            ...item_table.get(equipment_data.rarity.SILVER),
            ...item_table.get(equipment_data.rarity.GOLD),
            ...item_table.get(equipment_data.rarity.PURPLE),
            ...item_table.get(equipment_data.rarity.RED),
            ...item_table.get(equipment_data.rarity.GREEN),
            ...item_table.get(equipment_data.rarity.MISC)};

        requested_items.build(items);

        let merged_recipes = {};
        const ignored_rarities = settings.get_settings()[settings.tags.IGNORED_RARITIES];
        for (const item_name in items) {
            const amount = items[item_name];
            const recipe = equipment_data.recipe.get(item_name, amount, ignored_rarities);
            if (!jQuery.isEmptyObject(recipe)) {
                merged_recipes = equipment_data.recipe.merge(merged_recipes, recipe);
            }
        }

        if (!jQuery.isEmptyObject(merged_recipes) && tips_are_enabled) {
            tips_are_enabled = false;
        }

        if (!tips_are_enabled) {
            required_ingredients.build(merged_recipes);
            recommended_quests.build(merged_recipes);
        }
    }

    return {
        update: update,
        build: build,

        item_table: item_table,
        item_focus: item_focus,
        required_items: required_ingredients,
        quests: recommended_quests
    }
})();
const webpage = (function () {
    const debug = true;
    let simple_mode_enabled = false;
    let webp_enabled = false;
    const update_date = new Date(Date.UTC(2021, 4, 15, 24, 0, 0));
    const date_options = { year: 'numeric', month: 'long', day: 'numeric' };

    const navigation = (function () {
        const element_id = Object.freeze({
            ITEMS_NAVIGATION_BAR: "#navigation-items",
            ITEMS_CONTENT: "#items-container",
            PRESETS_NAVIGATION_BAR: "#navigation-presets",
            PRESETS_CONTENT: "#presets-container",
            PROJECTS_NAVIGATION_BAR: "#navigation-projects",
            PROJECTS_CONTENT: "#projects-container",
            SETTINGS_NAVIGATION_BAR: "#navigation-settings",
            SETTINGS_CONTENT: "#settings-container",
            OTHER_NAVIGATION_BAR: "#navigation-other",
            OTHER_CONTENT: "#other-container"
        });
        const IS_OPEN_CLASS = "is-open";
        const HIDDEN_ATTRIBUTE = "hidden";

        /**
         * HIDE ALL TOGGLE-ABLE ELEMENTS; USE AN open_<category>() FUNCTION AFTER.
         */
        function close_everything() {
            $(element_id.ITEMS_CONTENT).attr(HIDDEN_ATTRIBUTE, true);
            $(element_id.PRESETS_CONTENT).attr(HIDDEN_ATTRIBUTE, true);
            $(element_id.PROJECTS_CONTENT).attr(HIDDEN_ATTRIBUTE, true);
            $(element_id.SETTINGS_CONTENT).attr(HIDDEN_ATTRIBUTE, true);
            $(element_id.OTHER_CONTENT).attr(HIDDEN_ATTRIBUTE, true);

            $(element_id.ITEMS_NAVIGATION_BAR).removeClass(IS_OPEN_CLASS);
            $(element_id.PRESETS_NAVIGATION_BAR).removeClass(IS_OPEN_CLASS);
            $(element_id.PROJECTS_NAVIGATION_BAR).removeClass(IS_OPEN_CLASS);
            $(element_id.SETTINGS_NAVIGATION_BAR).removeClass(IS_OPEN_CLASS);
            $(element_id.OTHER_NAVIGATION_BAR).removeClass(IS_OPEN_CLASS);
        }

        function open_items() {
            close_everything();
            $(element_id.ITEMS_CONTENT).attr(HIDDEN_ATTRIBUTE, false);
            $(element_id.ITEMS_NAVIGATION_BAR).addClass(IS_OPEN_CLASS);
        }

        function open_presets() {
            close_everything();
            $(element_id.PRESETS_CONTENT).attr(HIDDEN_ATTRIBUTE, false);
            $(element_id.PRESETS_NAVIGATION_BAR).addClass(IS_OPEN_CLASS);
        }

        function open_projects() {
            close_everything();
            $(element_id.PROJECTS_CONTENT).attr(HIDDEN_ATTRIBUTE, false);
            $(element_id.PROJECTS_NAVIGATION_BAR).addClass(IS_OPEN_CLASS);
        }

        function open_settings() {
            close_everything();
            $(element_id.SETTINGS_CONTENT).attr(HIDDEN_ATTRIBUTE, false);
            $(element_id.SETTINGS_NAVIGATION_BAR).addClass(IS_OPEN_CLASS);
        }

        function open_other() {
            close_everything();
            $(element_id.OTHER_CONTENT).attr(HIDDEN_ATTRIBUTE, false);
            $(element_id.OTHER_NAVIGATION_BAR).addClass(IS_OPEN_CLASS);
        }

        return {
            items: open_items,
            presets: open_presets,
            projects: open_projects,
            settings: open_settings,
            other: open_other
        };
    })();
    const language = (function () {
        const option = Object.freeze({
            ENGLISH: "en-US",
            JAPANESE: "ja-JP",
            KOREAN: "ko-KR",
            CHINESE: 'zh-CN',
        });
        const document_id = Object.freeze({
            OPTION: "language-option"
        });
        const tags = Object.freeze({
            SYSTEM: "system",
            ITEM_TAB: "items_tab",
            PRESETS_TAB: "presets_tab",
            PROJECTS_TAB: "projects_tab",
            SETTINGS_TAB: "settings_tab",
            OTHER_TAB: "other_tab",
            INVENTORY: "inventory",
            TOASTS: "toasts",
            CHARACTER_NAMES: "character_names",
            THEMATICS: "thematics"
        });
        const LOCALSTORAGE_KEY = "language";
        let current_language = option.ENGLISH;
        let data;

        /**
         * LOADS THE PREVIOUS SESSION'S LANGUAGE OPTION IF IT EXISTS.
         */
        function init() {
            if (typeof(Storage) !== "undefined" && localStorage.getItem(LOCALSTORAGE_KEY) !== null) {
                document.getElementById(document_id.OPTION).value = localStorage.getItem(LOCALSTORAGE_KEY);
                if (document.getElementById(document_id.OPTION).value !== localStorage.getItem(LOCALSTORAGE_KEY)) {
                    // LANGUAGE OPTION SAVED DOES NOT EXIST, DELETE SAVED OPTION AND REVERT TO ENGLISH
                    localStorage.removeItem(LOCALSTORAGE_KEY);
                    document.getElementById(document_id.OPTION).value = option.ENGLISH;
                }
                else {
                    load_language();
                }
            }
        }

        /**
         * GETS THE VALUE SELECTED IN THE DOCUMENT AND LOADS THE SELECTED LANGUAGE FILE.
         * THE DOCUMENT WILL BE UPDATED AND THE SELECTED LANGUAGE WILL BE SAVED TO LOCALSTORAGE IF IT IS NOT ENGLISH.
         */
        function load_language() {
            const lang = document.getElementById(document_id.OPTION).value;
            if (lang !== current_language) {
                const file_path = "/" + window.location.pathname.substring(0, window.location.pathname.indexOf('/')) + window.location.pathname.split('/')[1] + "/language/" + lang + ".json";
                $.getJSON(file_path, function (raw) {
                    data = raw;
                    current_language = lang;
                    document.documentElement.setAttribute("lang", lang);
                    document.documentElement.setAttribute("xml:lang", lang);
                    change_language();

                    // IF LOCALSTORAGE SUPPORT IS AVAILABLE...
                    if (typeof(Storage) !== "undefined") {
                        // TAKE NOTE OF CURRENT LANGUAGE
                        if (current_language !== option.ENGLISH) {
                            localStorage.setItem(LOCALSTORAGE_KEY, current_language);
                        }
                        else {
                            localStorage.removeItem(LOCALSTORAGE_KEY);
                        }
                    }

                    webpage.print("Now using: " + lang + ".json", "Language");
                });
            }
        }

        /**
         * UPDATES THE DOCUMENT USING THE LOADED LANGUAGE DATA.
         * PRESETS AND PROJECTS ARE UPDATED AS WELL IN ORDER TO TRANSLATE SOME SPECIFIC VALUES INSIDE.
         *
         * ONLY ELEMENTS WITH THE <translate> TAG WILL BE TRANSLATED.
         * <translate> ELEMENTS MUST BE CREATED LIKE:
         *      <translate text="category.string"></translate>
         * ANY CONTENTS INSIDE THESE ELEMENTS WILL BE REPLACED WITH THE DESIRED STRING OR undefined IF IT DOESN'T EXIST.
         */
        function change_language() {
            // TRANSLATE PAGE TITLE
            document.title = data[tags.SYSTEM]["title"] + " - " + data[tags.SYSTEM]["subtitle"] + " | priconne-quest-helper";

            // TRANSLATE EMPTY BLACKLIST TITLE
            if (localStorage.getItem('blacklist') === null) {
                document.getElementById("blacklist-load-button").title = data[tags.PROJECTS_TAB]["no_saved_blacklist_message"];
            }

            // TRANSLATE EXPORT DATA BUTTON
            document.getElementById("export-data-button").value = data[tags.OTHER_TAB]["export_saved_data"];

            // TRANSLATE SIMPLE MODE SUBTITLE IF NEEDED
            if (simple_mode_enabled) {
                document.getElementById("sub-title").innerHTML = data[tags.SYSTEM]["subtitle"] +
                    "<br><br><span style='font-weight: bold; letter-spacing: 1px !important; color: aliceblue; text-shadow: 1px 1px 1px #000000 !important;'>" +
                    data[tags.OTHER_TAB]["simple_mode"] + "</span>";
            }

            // TRANSLATE OBJECTS
            let collection = document.querySelectorAll("translate");
            for (let i = 0, j = collection.length ; i < j ; i++) {
                let requested_text = collection[i].getAttribute("text");
                let split_request = requested_text.split(".");
                let text_category = split_request[0];
                let text_value = split_request[1];

                if (text_category === tags.SYSTEM && text_value === "last_quest_update") {
                    data[text_category][text_value] = data[text_category][text_value].replace("${last_update_date}", get_update_date());
                }

                collection[i].innerHTML = data[text_category][text_value];
            }

            // REBUILD CHARACTER PRESET LIST AND TRANSLATE CURRENTLY SELECTED CHARACTER
            // ALSO RESTORE CURRENTLY SELECTED CHARACTER ON SELECT
            const current_selected_character = document.getElementById("character-preset-list-select").value;
            presets.update_details();
            presets.build();
            document.getElementById("character-preset-list-select").value = current_selected_character;

            // BUILD TRANSLATOR CREDITS
            if (current_language !== option.ENGLISH) {
                document.getElementById("translator-footer").innerHTML = data[tags.SYSTEM]["translator"] + " " + data[tags.SYSTEM]["translator_name"];
            }
            else {
                document.getElementById("translator-footer").innerHTML = "";
            }

            // UPDATE DROP EVENT SETTING CHOICES
            document.getElementById("normal-quest-drop-event-no-buff-option").innerHTML = data[tags.SETTINGS_TAB]["drop-event-no-buff-select"];
            document.getElementById("normal-quest-drop-event-double-buff-option").innerHTML = data[tags.SETTINGS_TAB]["drop-event-double-buff-select"];
            document.getElementById("normal-quest-drop-event-triple-buff-option").innerHTML = data[tags.SETTINGS_TAB]["drop-event-triple-buff-select"];
            document.getElementById("hard-quest-drop-event-no-buff-option").innerHTML = data[tags.SETTINGS_TAB]["drop-event-no-buff-select"];
            document.getElementById("hard-quest-drop-event-double-buff-option").innerHTML = data[tags.SETTINGS_TAB]["drop-event-double-buff-select"];
            document.getElementById("hard-quest-drop-event-triple-buff-option").innerHTML = data[tags.SETTINGS_TAB]["drop-event-triple-buff-select"];
            document.getElementById("very-hard-quest-drop-event-no-buff-option").innerHTML = data[tags.SETTINGS_TAB]["drop-event-no-buff-select"];
            document.getElementById("very-hard-quest-drop-event-double-buff-option").innerHTML = data[tags.SETTINGS_TAB]["drop-event-double-buff-select"];
            document.getElementById("very-hard-quest-drop-event-triple-buff-option").innerHTML = data[tags.SETTINGS_TAB]["drop-event-triple-buff-select"];

            // UPDATE EQUIPMENT DATA TYPE SETTING CHOICES
            document.getElementById("equipment-data-type-current-option").innerHTML = data[tags.SETTINGS_TAB]["equipment_data_current_select"];
            document.getElementById("equipment-data-type-legacy-option").innerHTML = data[tags.SETTINGS_TAB]["equipment_data_legacy_select"];

            // UPDATE INVENTORY SORTING OPTIONS
            document.getElementById("inventory_sort-none").innerHTML = data[tags.INVENTORY]["no_sorting"];
            document.getElementById("inventory_sort-quantity-ascending").innerHTML = data[tags.INVENTORY]["quantity_ascending"];
            document.getElementById("inventory_sort-quantity-descending").innerHTML = data[tags.INVENTORY]["quantity_descending"];
        }

        function get_current_language() {
            return current_language;
        }

        function get_data() {
            return data;
        }

        function is_english() {
            return current_language === option.ENGLISH;
        }

        return {
            option: option,
            tags: tags,
            init: init,
            current: get_current_language,
            data: get_data,
            load: load_language,
            is_english: is_english
        }
    })();

    /**
     * INITIALIZE WEBPAGE BY SETTING UP FUNCTIONALITY.
     * AFTER EVERYTHING IS SET UP, REVEAL WEBPAGE (OR REMOVE LOADING TOAST IF SIMPLE MODE).
     *
     * THIS SHOULD ONLY BE CALLED ONCE.
     */
    function init() {
        print("Initializing Webpage...", "Webpage");
        enable_simple_mode();
        show_loading_toast();
        settings.init();
        settings.read_settings(false);
        // CHANGE EQUIPMENT AND CHARACTER DATA TO LEGACY IF NEEDED
        if (settings.get_settings()[settings.tags.EQUIPMENT_DATA_TYPE] === equipment_data.version.LEGACY) {
            equipment_data.set_loaded_version(equipment_data.version.LEGACY);
            character_data.set_loaded_version(character_data.version.LEGACY);
        }
        set_toastr_options();

        window.onload = function () {
            equipment_data.read_data(function (success) {
                if (success) {
                    print("Equipment data loaded! Using \"" + equipment_data.loaded_version() + "\"...", "Webpage");
                    character_data.read_data(function (success) {
                        if (success) {
                            print("Character data loaded! Using \"" + character_data.loaded_version() + "\"...", "Webpage");
                            quest_data.read_data(function (success) {
                                if (success) {
                                    print("Quest data loaded!", "Webpage");
                                    finalize_setup();
                                }
                                else {
                                    setup_failed("Failed to load quest data");
                                }
                            });
                        }
                        else {
                            setup_failed("Failed to load character data");
                        }
                    });
                }
                else {
                    setup_failed("Failed to load equipment data");
                }
            });

            init_webp();
            init_images();
            document.getElementById("update-date-span").innerHTML = get_update_date();
            title_background.init();

            // CHECK IF LOCAL STORAGE SUPPORT EXISTS
            if (typeof(Storage) === "undefined") {
                print("LocalStorage is not supported on this browser! Disabling Projects, Blacklist, Data Exporting/Importing, and Settings!", "Webpage");
                $("#projects-div").hide();
                $("#data-management-div").hide();
                $("#setting-saving-div").hide();
                $("#local-storage-warning").show();
            }
            else {
                $("#local-storage-warning").remove();
            }

            /**
             * USED WHEN DATA READING FAILS.
             * LOCKS THE PAGE AND SHOWS AN ERROR MESSAGE IN SIMPLE MODE.
             * CHANGES THE LOADING TEXT AND KILLS MIYAKO IN FANCY MODE.
             *
             * @param {string}    message    MESSAGE THAT THE TOAST OR LOADING TEXT SHOULD HAVE TO WARN THE USER.
             */
            function setup_failed(message) {
                print(message.toUpperCase(), "Webpage");
                if (simple_mode_enabled) {
                    toastr.remove();
                    toastr.error(message, "Failure", { positionClass: "toast-top-full-width", timeOut:999999, extendedTimeOut:999999, tapToDismiss: false });
                    document.getElementById("page-cover").classList.add("failed");
                    document.getElementById("page-loading").style.visibility = "visible";
                    document.getElementById("miyako").style.visibility = "hidden";
                    document.getElementById("loading-text").style.visibility = "hidden";
                }
                else {
                    document.getElementById("loading-text").innerHTML = "<span class='heart-red'>" + message + "</span>";
                    document.getElementById("miyako").classList.add("death");
                }
            }

            /**
             * CALL THIS TO FINALIZE SETUP AFTER EQUIPMENT/CHARACTER/QUEST DATA HAVE ALL SUCCESSFULLY LOADED
             */
            function finalize_setup() {
                // UPDATE SPECIFIC ELEMENTS WITH MAX QUEST CHAPTER
                document.getElementById("min-quest-chapter").max = quest_data.max_chapter();
                document.getElementById("max-quest-chapter").max = quest_data.max_chapter();
                document.getElementById("max-quest-chapter").value = quest_data.max_chapter();
                settings.set_default_setting(settings.tags.MAX_QUEST_CHAPTER, quest_data.max_chapter());
                settings.set_setting(settings.tags.MAX_QUEST_CHAPTER, quest_data.max_chapter());

                // UPDATE SPECIFIC ELEMENTS WITH MAX RANK
                document.getElementById("preset-character-min-rank-input").max = character_data.max_rank();
                document.getElementById("preset-character-max-rank-input").max = character_data.max_rank();
                document.getElementById("preset-character-max-rank-input").value = character_data.max_rank();
                presets.set_max_rank(character_data.max_rank());

                enable_collapsible();
                settings.read_settings();
                data_display.item_table.build();
                projects.blacklist.init();
                inventory.init();
                document.getElementById("inventory_open-button").hidden = false;
                projects.init();
                presets.build();
                language.init();

                // DELETE UNUSED FANCY OR SIMPLE MODE BUTTON
                let is_simple = $("body").hasClass("simple-body");
                if (is_simple) {
                    $("#simple-page-link").remove();
                }
                else {
                    $("#fancy-page-link").remove();
                }

                reveal_webpage();
            }
        };

        /**
         * SETS UP WEBPAGE TO "SIMPLE MODE".
         * SIMPLE MODE REMOVES ALL BACKGROUNDS AND TRANSITIONS FOR PEOPLE WHO PREFER UTILITY OVER DESIGN.
         */
        function enable_simple_mode() {
            if (window.location.hash &&
                window.location.hash.toLowerCase().split('#').includes("simple")) {
                const classes = Object.freeze({
                    SIMPLE_BODY: "simple-body",
                    FANCY_BODY: "fancy-body",
                    NO_BACKGROUND: "no-background",
                    NO_TRANSITION: "no-transition",
                    NO_HOVER: "no-hover",
                    NO_TEXT_SHADOW: "no-text-shadow",
                    /**
                     * JOINS TWO OR MORE STRINGS TOGETHER BY SPACES.
                     * @param {...string}    s    TWO OR MORE STRINGS TO BE MERGED BY SPACES.
                     * @return {string} MERGED STRING BY SPACES.
                     */
                    JOIN: function (...s) {
                        return s.join(" ");
                    }
                });
                $("body").toggleClass(classes.JOIN(classes.SIMPLE_BODY, classes.FANCY_BODY));
                $("#title-div").toggleClass(classes.JOIN(classes.NO_BACKGROUND, classes.NO_TRANSITION, classes.NO_HOVER));
                $("#title-text-div").toggleClass(classes.NO_HOVER);
                $("#common-div").toggleClass(classes.NO_BACKGROUND);
                $("#common-item-content").toggleClass(classes.NO_TRANSITION);
                $("#copper-div").toggleClass(classes.NO_BACKGROUND);
                $("#copper-item-content").toggleClass(classes.NO_TRANSITION);
                $("#silver-div").toggleClass(classes.NO_BACKGROUND);
                $("#silver-item-content").toggleClass(classes.NO_TRANSITION);
                $("#gold-div").toggleClass(classes.NO_BACKGROUND);
                $("#gold-item-content").toggleClass(classes.NO_TRANSITION);
                $("#purple-div").toggleClass(classes.NO_BACKGROUND);
                $("#purple-item-content").toggleClass(classes.NO_TRANSITION);
                $("#red-div").toggleClass(classes.NO_BACKGROUND);
                $("#red-item-content").toggleClass(classes.NO_TRANSITION);
                $("#green-div").toggleClass(classes.NO_BACKGROUND);
                $("#green-item-content").toggleClass(classes.NO_TRANSITION);
                $("#misc-div").toggleClass(classes.NO_BACKGROUND);
                $("#misc-item-content").toggleClass(classes.NO_TRANSITION);
                $("#requested-div").toggleClass(classes.NO_BACKGROUND);
                $("#required-div").toggleClass(classes.NO_BACKGROUND);
                $("#recommended-div").toggleClass(classes.NO_BACKGROUND);
                $("#recommended-quest-div").toggleClass(classes.NO_TRANSITION);
                $("#character-preset-div").toggleClass(classes.NO_BACKGROUND);
                $("#presets-min-rank-text").toggleClass(classes.NO_TEXT_SHADOW);
                $("#presets-to-text").toggleClass(classes.NO_TEXT_SHADOW);
                $("#presets-max-rank-text").toggleClass(classes.NO_TEXT_SHADOW);
                $("#title-background-div").hide();
                document.getElementById("sub-title").innerHTML = "Quest Helper<br><br><span style='font-weight: bold; letter-spacing: 1px !important; color: aliceblue; text-shadow: 1px 1px 1px #000000 !important;'>Simple Mode</span>";

                print("Simple Mode Enabled! (No Background Images)", "Simple Mode");
                simple_mode_enabled = true;
            }
            else {
                document.querySelector("i.webpage.webpage-GitHub-Mark").classList.add("invert");
            }
        }

        /**
         * ENABLES THE DROP DOWN USED FOR ITEM TABLES IN THE "ITEMS" TAB.
         */
        function enable_collapsible() {
            const coll = document.getElementsByClassName("collapsible");
            for (let i = 0, j = coll.length ; i < j ; i++) {
                coll[i].addEventListener("click", function() {
                    let content = this.nextElementSibling;
                    this.classList.toggle("collapsible-active");
                    if (content.style.maxHeight){
                        content.style.maxHeight = null;
                        content.style.overflow = "hidden";
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                        setTimeout(function () {
                            content.style.overflow = "auto";
                        }, 400);
                    }
                });
            }
        }

        /**
         * IF SIMPLE MODE IS ENABLED, SHOW A TOAST TO NOTIFY THE USER THAT LOADING IS IN PROGRESS.
         * IF FANCY MODE WAS ENABLED, THE LOADING SCREEN WOULD BE ENOUGH TO NOTIFY THE USER.
         */
        function show_loading_toast() {
            if (simple_mode_enabled) {
                toastr.warning("Loading...", "Status", { positionClass: "toast-top-full-width", timeOut:999999, extendedTimeOut:999999, tapToDismiss: false });
            }
        }

        function set_toastr_options() {
            toastr.options.preventDuplicates = true;
            toastr.options.positionClass = "toast-top-center";
        }

        /**
         * IF THE <html> ELEMENT HAS CLASS "webp" (GIVEN BY MODERNIZR'S WEBP CHECK):
         *      USE .WEBP IMAGES INSTEAD OF .PNG.
         * IF "#use-webp" IS USED IN HASHES:
         *      USE .PNG IMAGES INSTEAD OF .WEBP.
         *      THIS DOES NOT EFFECT BACKGROUNDS THAT SWITCH TO .webp VIA CSS.
         */
        function init_webp() {
            const html = $("html");
            if (html.hasClass('webp')) {
                if (!window.location.hash.toLowerCase().split('#').includes("use-png")) {
                    webp_enabled = true;
                    print(".webp images are supported! Using .webp instead of .png...", "Image Manager");
                }
                else {
                    html.toggleClass("webp no-webp");
                    print(".webp images are supported, but found the 'use-png' hash! Using .png instead of .webp...", "Image Manager");
                }
            }
            else {
                print(".webp images are NOT supported! Using .png instead of .webp...", "Image Manager");
            }
        }

        /**
         * GO THROUGH DOCUMENT AND FIND ELEMENTS WITH THE "img-webp" TAG.
         * ELEMENTS WITH THE "img-webp" TAG WILL BE REPLACED WITH AN <img> ELEMENT USING THE DATA THEY HAVE.
         *
         * <img-webp> ELEMENTS ARE CREATED AS:
         *      <img-webp image_folder="" file_name="" src_prefix=""></img-webp>
         * OTHER ATTRIBUTES LIKE id, class, ETC WILL BE PRESERVED.
         * THE REQUIRED ATTRIBUTES image_folder, file_name, src_prefix WILL BE REMOVED.
         * THE alt ATTRIBUTE IS ALSO AUTOMATICALLY ADDED AFTERWARDS, BUT WILL BE DEFINED AS "".
         */
        function init_images() {
            (function( $ ) {
                $.fn.replaceTag = function(newTag) {
                    let originalElement = this[0]
                        , originalTag = originalElement.tagName
                        , startRX = new RegExp('^<'+originalTag, 'i')
                        , endRX = new RegExp(originalTag+'>$', 'i')
                        , startSubst = '<'+newTag
                        , endSubst = newTag+'>'
                        , newHTML = originalElement.outerHTML
                        .replace(startRX, startSubst)
                        .replace(endRX, endSubst);
                    this.replaceWith(newHTML);
                };
            })(jQuery);
            const tags = Object.freeze({
                TAG: "img-webp",
                SRC_PREFIX: "src_prefix",
                IMAGE_FOLDER: "image_folder",
                FILE_NAME: "file_name",
                ITEMS_FOLDER: "items",
                UNIT_ICON_FOLDER: "unit_icon",
                WEBPAGE_FOLDER: "webpage"
            });
            const coll = document.querySelectorAll(tags.TAG);
            for (let i = 0, j = coll.length ; i < j ; i++) {
                let img_src = coll[i].getAttribute(tags.SRC_PREFIX);
                switch (coll[i].getAttribute(tags.IMAGE_FOLDER)) {
                    case tags.ITEMS_FOLDER:
                        img_src += get_item_image_path(coll[i].getAttribute(tags.FILE_NAME));
                        break;
                    case tags.UNIT_ICON_FOLDER:
                        img_src += get_unit_icon_image_path(coll[i].getAttribute(tags.FILE_NAME));
                        break;
                    case tags.WEBPAGE_FOLDER:
                        img_src += get_webpage_image_path(coll[i].getAttribute(tags.FILE_NAME));
                        break;
                    default:
                        // IGNORED
                        break;
                }

                // ADD SRC AND ALT AND DELETE OTHER ATTRIBUTES
                $(coll[i]).attr("src", img_src)
                    .attr("alt", "")
                    .removeAttr(tags.IMAGE_FOLDER)
                    .removeAttr(tags.FILE_NAME)
                    .removeAttr(tags.SRC_PREFIX)
                    .replaceTag("img");
            }
        }

        /**
         * TRANSITION THE LOADING SCREEN TO REVEAL WEBPAGE CONTENTS.
         */
        function reveal_webpage() {
            setTimeout(function () {
                document.getElementById("loading-div").classList.add("end");
                document.getElementById("page-cover").classList.add("end");
                // DELETE LOADING SCREEN ELEMENTS AFTER TRANSITION IS COMPLETE
                setTimeout(function () {
                    $("#page-loading").remove();
                    $("#startup").remove();
                    $("noscript").remove();
                }, 3000);
            }, 3000);
            document.getElementById("language-option").disabled = false;
            if (simple_mode_enabled) {
                toastr.remove();
                toastr.info("Ready!", "Status", { positionClass: "toast-top-full-width", tapToDismiss: true });
            }
        }
    }

    /**
     * RETURNS THE UPDATE DATE SET IN webpage.update_date.
     * DEPENDING ON THE LANGUAGE, USE A DIFFERENT LOCALE DATE STRING.
     *
     * @return {string} LOCALE DATE STRING DEPENDING ON THE CURRENT LANGUAGE USED.
     */
    function get_update_date() {
        if (language.current() === language.option.ENGLISH) {
            return update_date.toLocaleDateString("en-US", date_options);
        }
        else {
            return update_date.toLocaleDateString(language.data()[language.tags.SYSTEM]["date_locale"], date_options);
        }
    }

    /**
     * RETURNS AN ITEM IMAGE PATH STRING USING THE PROVIDED FILE NAME.
     * IF A FILE NAME IS NOT PROVIDED OR IS EMPTY, "Placeholder" WILL BE USED INSTEAD.
     *
     * @param {string}     [file_name=""]    FILE NAME OF THE ITEM ; i.e. FILE NAME FOR "Iron Blade" SHOULD BE "Iron_Blade".
     * @return {string} IMAGE PATH OF FILE NAME GIVEN; i.e. "images/items/Iron_Blade.png".
     */
    function get_item_image_path(file_name = "") {
        if (file_name === "") {
            file_name = "Placeholder";
        }

        return "images/items" + (webp_enabled ? "_webp/" + file_name + ".webp" : "/" + file_name + ".png");
    }

    /**
     * RETURNS THE ITEM'S SPRITE CLASS.
     * FOR USE WITH data.css AND webpage/spritesheets/items.png OR webpage_webp/spritesheets/items.webp.
     * SPRITE CLASSES START WITH "is__", IS LOWERCASE, NON-ALPHANUMERIC CHARACTERS BECOME '-', AND APOSTROPHES ARE STRIPPED.
     * "Iron Blade" -> ".is__iron-blade"
     * "Tír na nÓg Dagger" -> ".is__t-r-na-n-g-dagger"
     *
     * @param {string}    item_name    ITEM NAME IN ENGLISH ; i.e. IRON BLADE = "Iron Blade".
     * @return {string} ITEM'S SPRITE CLASS ; i.e. "Shrine Maiden's Purity Cloth" -> "is__shrine-maidens-purity-cloth".
     */
    function get_item_sprite_class(item_name) {
        return "is__" + item_name.replace("'", "").replace(/\W/g, '-')
            .toLowerCase().replace('---', '-');
    }

    /**
     * RETURNS AN UNIT ICON IMAGE PATH STRING USING THE PROVIDED FILE NAME.
     * IF A FILE NAME IS NOT PROVIDED OR IS EMPTY, "Placeholder" WILL BE USED INSTEAD.
     *
     * @param {string}     [file_name=""]    FILE NAME OF A UNIT ; i.e. FILE NAME FOR "Pecorine (Summer)" SHOULD BE "Summer_Pecorine".
     * @return {string} IMAGE PATH OF FILE NAME GIVEN ; i.e. "images/unit_icon/Summer_Pecorine.png".
     */
    function get_unit_icon_image_path(file_name = "") {
        if (file_name === "") {
            file_name = "Placeholder";
        }

        return "images/unit_icon" + (webp_enabled ? "_webp/" + file_name + ".webp" : "/" + file_name + ".png");
    }

    /**
     * RETURNS THE UNIT'S SPRITE CLASS.
     * FOR USE WITH data.css AND webpage/spritesheets/units.png OR webpage_webp/spritesheets/units.webp.
     * SPRITE CLASSES START WITH "us__", IS LOWERCASE, NON-ALPHANUMERIC CHARACTERS BECOME '-', AND APOSTROPHES ARE STRIPPED.
     * "miyako" -> ".us__miyako"
     * "summer_pecorine" -> ".us__summer-pecorine"
     * "new_year_rei" -> ".us__new-year-rei"
     *
     * @param {string}    unit_key    UNIT KEY ; i.e. MIYAKO = "miyako".
     * @return {string} UNIT'S SPRITE CLASS ; i.e. "new_year_rei" -> "us__new-year-rei".
     */
    function get_unit_sprite_class(unit_key) {
        return "us__" + unit_key.replace(/_/g, '-').toLowerCase().replace('---', '-');
    }

    /**
     * RETURNS AN UNIT ICON IMAGE PATH STRING USING THE PROVIDED FILE NAME.
     * IF A FILE NAME IS NOT PROVIDED OR IS EMPTY, AN EMPTY STRING WILL BE RETURNED.
     *
     * @param {string}    file_name    FILE NAME ; ANY SPACING MUST BE REPLACED WITH UNDERSCORES.
     * @return {string} IMAGE PATH OF FILE NAME GIVEN ; i.e. "images/webpage/HAhaa.png".
     */
    function get_webpage_image_path(file_name = "") {
        if (file_name === "") {
            return file_name;
        }

        if (webp_enabled) {
            return "images/webpage_webp/" + file_name + ".webp";
        }
        return "images/webpage/" + file_name + ".png";
    }

    /**
     * JUST A FANCIER WAY OF CALLING console.log().
     * WILL NOT PRINT IF webpage.debug IS DISABLED.
     *
     * @param {Object}    out       CONTENT TO BE DISPLAYED.
     * @param {string}    prefix    CONTENT THAT APPEARS BEFORE out ; WILL BE SURROUNDED BY [].
     */
    function print(out, prefix = "") {
        if (debug) { console.log((prefix !== "" ? "[" + prefix + "] - " : "") + out); }
    }

    return {
        init: init,
        print: print,
        get_item_image_path: get_item_image_path,
        get_item_sprite_class: get_item_sprite_class,
        get_unit_icon_image_path: get_unit_icon_image_path,
        get_unit_sprite_class: get_unit_sprite_class,
        get_webpage_image_path: get_webpage_image_path,
        navigation: navigation,
        language: language
    }
})();