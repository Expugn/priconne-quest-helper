const equipment_data = (function () {
    const version = Object.freeze({
        CURRENT: 'equipment-data-current',
        LEGACY: 'equipment-data-legacy'
    });
    const file_path = Object.freeze({
        CURRENT: "/" + window.location.pathname.substring(0, window.location.pathname.indexOf('/')) + window.location.pathname.split('/')[1] + "/data/equipment_data.json",
        LEGACY: "/" + window.location.pathname.substring(0, window.location.pathname.indexOf('/')) + window.location.pathname.split('/')[1] + "/data/equipment_data_08.30.2019.json"
    });
    const tags = Object.freeze({
        NAME_JP: "name_jp",                 // EQUIPMENT NAME IN JAPANESE
        NAME: "name",                       // EQUIPMENT NAME IN ENGLISH
        RARITY: "rarity",                   // EQUIPMENT RARITY ; i.e. IRON BLADE = "common"
        ITEM_ID: "item_id",                 // EQUIPMENT NUMERIC ID ; i.e. IRON BLADE = "101011"
        ID: "id",                           // priconne-quest-helper ID ; i.e. IRON BLADE = "common-1"
        HAS_FRAGMENTS: "has_fragments",     // BOOLEAN ; TRUE IF EQUIPMENT REQUIRES PIECES IN THEIR RECIPE
        FRAGMENT_ID: "fragment_id",         // NUMERIC ID OF THE EQUIPMENT'S FRAGMENT (FOR IMAGES)
        REQUIRED_PIECES: "req_pieces",      // REQUIRED NUMBER OF PIECES TO BUILD THE EQUIPMENT
        REQUIRED_ITEMS: "req_items"         // ADDITIONAL REQUIRED ITEMS TO BUILD THE EQUIPMENT
    });
    const rarity = Object.freeze({
        COMMON: "common",
        COPPER: "copper",
        SILVER: "silver",
        GOLD: "gold",
        PURPLE: "purple",
        RED: "red",
        GREEN: "green",
        MISC: "misc"        // ITEMS WITH NO RARITY, USUALLY MEMORY PIECES
    });
    let equipment_count = reset_equipment_count();
    let loaded_version = version.CURRENT;
    let data = null;

    /**
     * READ THE LOADED EQUIPMENT DATA AND STORE THE RESULTS IN THE data VARIABLE.
     * equipment_count IS UPDATED HERE AS WELL.
     * WHEN COMPLETE, A CALLBACK FUNCTION WILL BE EXECUTED AND PASS A BOOLEAN DEPENDING ON THE SUCCESS OF THE READ.
     *      TRUE = READING EQUIPMENT DATA WAS SUCCESSFUL.
     *      FALSE = READING EQUIPMENT DATA WAS NOT SUCCESSFUL OR SOMETHING ELSE WENT WRONG.
     * DEFINING A CALLBACK FUNCTION IS OPTIONAL.
     *
     * @param {function(boolean)}    [callback=function()]    CALLBACK FUNCTION TO CALL AFTER THE READ IS COMPLETE (OPTIONAL).
     */
    function read_data(callback = function () { return undefined; }) {
        let is_success = false;
        $.getJSON((loaded_version === version.CURRENT ? file_path.CURRENT : file_path.LEGACY), function(raw) {
            data = raw;

            // GET EQUIPMENT COUNT AND CONVERT RAW TO LEGACY FORMAT
            $.each(raw, function (item_id, item_data) {
                const id = item_data[tags.ID];
                const rarity = id.substring(0, id.indexOf('-'));

                // UPDATE EQUIPMENT COUNT AND ADD ITEM NUMERIC ID AND RARITY TO OBJECT
                equipment_count[rarity]++;
                data[item_id][tags.RARITY] = rarity;

                if (loaded_version === version.CURRENT) {
                    data[item_id][tags.ITEM_ID] = item_id;
                }

                // SET KEY TO ENGLISH ITEM NAME AND DELETE OLD ENTRY
                Object.defineProperty(data, data[item_id][tags.NAME], Object.getOwnPropertyDescriptor(data, item_id));
                delete data[item_id];
            });
        })
            .done(function () {
                is_success = true;
            })
            .always(function () {
                callback(is_success);
            });
    }

    function reset_equipment_count() {
        return {
            "common": 0,
            "copper": 0,
            "silver": 0,
            "gold": 0,
            "purple": 0,
            "red": 0,
            "green": 0,
            "misc": 0
        }
    }

    /**
     * MODIFIES loaded_version.
     * read_data() SHOULD BE CALLED AFTERWARDS TO REFRESH DATA.
     *
     * @param {string}    [new_version=version.CURRENT]    THE NEW LOADED VERSION.
     */
    function set_loaded_version(new_version = version.CURRENT) {
        loaded_version = new_version;
    }

    /**
     * GET EQUIPMENT COUNT DATA.
     * KEYS OF THE OBJECT ARE THE RARITY.
     * VALUE OF THE OBJECT IS THE AMOUNT OF ITEMS OF THAT RARITY EXIST.
     *
     * @return {{common, copper, silver, gold, purple, misc}} OBJECT CONTAINING THE AMOUNT OF ITEMS THAT EXIST.
     */
    function get_equipment_count() {
        return equipment_count;
    }

    function get_data() {
        return data;
    }

    function get_loaded_version() {
        return loaded_version;
    }

    function is_equipment_exist(item_name) {
        return data.hasOwnProperty(item_name);
    }

    const recipe = (function () {
        /**
         * BUILDS AN EQUIPMENT'S RECIPE AND RETURNS IT AS AN {Object}.
         * EXAMPLE RECIPE FOR "Abyss Moon Staff - Sacrifice" (月淵杖サクリファイス):
         * get_equipment_recipe("Abyss Moon Staff - Sacrifice", 3) RETURNS...
         * {
         *      Abyss Moon Staff - Sacrifice Fragment: 90,
         *      High Devil Wand Fragment: 45,
         *      Fury Rod Fragment: 30,
         *      Mourning Crescent Moon Fragment: 45
         * }
         *
         * @param {string}      item_name                ITEM NAME IN ENGLISH ; i.e. "Iron Blade".
         * @param {number}      amount                   AMOUNT OF AN ITEM TO GET THE RECIPE OF ; i.e. '3' MEANS "3 Iron Blades".
         * @param {string[]}    [ignored_rarities=[]]    ITEM RARITIES THAT SHOULD NOT BE ADDED TO THE RECIPE ; i.e. ["common", "gold"] TO IGNORE COMMON AND GOLD ITEM FRAGMENTS.
         * @return {Object} EQUIPMENT RECIPE ; KEYS ARE ITEM FRAGMENT NAME ; VALUES ARE AMOUNT NEEDED.
         */
        function get_equipment_recipe(item_name, amount, ignored_rarities = []) {
            if (!is_equipment_exist(item_name)) {
                return {};
            }

            const item_data = data[item_name];
            let recipe = {};

            // ADD FRAGMENTS TO RECIPE IF RARITY IS NOT IGNORED AND THERE IS MORE THAN 0 REQUIRED PIECE
            if (!ignored_rarities.includes(item_data[tags.RARITY]) && item_data[tags.REQUIRED_PIECES] > 0) {
                recipe[item_data[tags.NAME] + (item_data[tags.HAS_FRAGMENTS] ? " Fragment" : "")] = item_data[tags.REQUIRED_PIECES] * amount;
            }

            // ADD REQUIRED ITEM RECIPES
            const required_items = item_data[tags.REQUIRED_ITEMS];
            for (let i = 0, j = required_items.length ; i < j ; i++) {
                recipe = merge_recipes(recipe, get_equipment_recipe(required_items[i], amount, ignored_rarities));
            }

            return recipe;
        }

        /**
         * MERGES TWO OR MORE RECIPE OBJECTS TOGETHER.
         * IF A RECIPE HAS A COMMON ITEM FRAGMENT, THE AMOUNTS WILL BE ADDED TOGEHTER.
         *
         * EXAMPLE USAGE: merge_recipes(recipe_1, recipe_2, recipe_3, ...);
         *
         * @param {...Object}    recipes    RECIPE OBJECTS TO BE MERGED.
         * @return {Object} RESULTING RECIPE AFTER MERGE.
         */
        function merge_recipes(...recipes) {
            return recipes.reduce((a, b) => {
                for (let f in b) {
                    if (b.hasOwnProperty(f)) {
                        a[f] = (a[f] || 0) + b[f];
                    }
                }
                return a;
            }, {});
        }

        return {
            get: get_equipment_recipe,
            merge: merge_recipes
        }
    })();

    /**
     * USED TO ADD OR STRIP ENGLISH ITEM NAMES OF THEIR APOSTROPHES.
     * REASON THIS IS NEEDED IS BECAUSE IF AN ELEMENT LIKE <img src="..." alt="" onclick="function('ITEM_NAME')">
     *      EXISTS, THEN IF ITEM NAME HAS AN APOSTROPHE i.e. "Little Ice Princess' Knot", IT WILL MESS UP THE HTML.
     */
    const apostrophe = Object.freeze({
        CHAR: "'",
        PLACEHOLDER: "{apos}",
        CONVERT: function (s) {
            return s.replace(apostrophe.CHAR, apostrophe.PLACEHOLDER);
        },
        REVERT: function (s) {
            return s.replace(apostrophe.PLACEHOLDER, apostrophe.CHAR);
        }
    });

    return {
        tags: tags,
        rarity: rarity,
        version: version,
        loaded_version: get_loaded_version,
        set_loaded_version: set_loaded_version,
        read_data: read_data,
        data: get_data,
        equipment_count: get_equipment_count,
        is_equipment_exist: is_equipment_exist,
        apostrophe: apostrophe,

        recipe: recipe
    }
})();
const character_data = (function () {
    const version = Object.freeze({
        CURRENT: 'character-data-current',
        LEGACY: 'character-data-legacy'
    });
    const file_path = Object.freeze({
        CURRENT: "/" + window.location.pathname.substring(0, window.location.pathname.indexOf('/')) + window.location.pathname.split('/')[1] + "/data/character_data.json",
        LEGACY: "/" + window.location.pathname.substring(0, window.location.pathname.indexOf('/')) + window.location.pathname.split('/')[1] + "/data/character_data_08.30.2019.json"
    });
    const tags = Object.freeze({
        UNIT_ID: "unit_id",             // NUMERIC ID OF THE CHARACTER ; i.e. MIYAKO HAS UNIT ID 100701
        NAME: "name",                   // CHARACTER NAME IN ENGLISH
        THEMATIC: "thematic",           // THEMATIC IN ENGLISH
        NAME_JP: "name_jp",             // CHARACTER NAME IN JAPANESE
        THEMATIC_JP: "thematic_jp",     // THEMATIC IN JAPANESE
        RANK: "rank_"                   // PREFIX TO SPECIFIC RANK DATA, ADD A NUMBER AFTER ; i.e. tags.RANK + 10 == "rank_10"
    });

    let max_rank = 1;
    let loaded_version = version.CURRENT;
    let data = null;

    /**
     * READ THE LOADED CHARACTER DATA AND STORE THE RESULTS IN THE data VARIABLE.
     * THE FIRST CHARACTER IS THEN TAKEN TO UPDATE max_rank.
     *      IF FOR SOME REASON THIS FIRST CHARACTER HAS MORE RANKS THAN OTHER CHARACTERS, THIS MAY CAUSE AN ISSUE!
     * WHEN COMPLETE, A CALLBACK FUNCTION WILL BE EXECUTED AND PASS A BOOLEAN DEPENDING ON THE SUCCESS OF THE READ.
     *      TRUE = READING CHARACTER DATA WAS SUCCESSFUL.
     *      FALSE = READING CHARACTER DATA WAS NOT SUCCESSFUL OR SOMETHING ELSE WENT WRONG.
     * DEFINING A CALLBACK FUNCTION IS OPTIONAL.
     *
     * @param {function(boolean)}    [callback=function()]    CALLBACK FUNCTION TO CALL AFTER THE READ IS COMPLETE (OPTIONAL).
     */
    function read_data(callback = function () { return undefined; }) {
        let is_success = false;
        $.getJSON((loaded_version === version.CURRENT ? file_path.CURRENT : file_path.LEGACY), function(raw) {
            data = raw;

            const first_character = raw[Object.keys(raw)[0]];
            for (let i = 1 ; first_character["rank_" + i] !== undefined ; i++) {
                max_rank = i;
            }
        })
            .done(function () {
                is_success = true;
            })
            .always(function () {
                callback(is_success);
            });
    }

    /**
     * RETURN THE ENGLISH FORMAL NAME USING THE GIVEN UNIT KEY.
     * FORMAL NAME EXAMPLES:
     *      miyako             =    "Miyako".
     *      summer_pecorine    =    "Pecorine (Summer)".
     *      new_year_rei       =    "Rei (New Year)".
     *
     * @param    unit_key    UNIT KEY FROM DATA ; i.e. MIYAKO = "miyako".
     * @return {string} FORMAL NAME OF UNIT ; SEE ABOVE FOR EXAMPLES.
     */
    function get_formal_name(unit_key) {
        const name = data[unit_key][tags.NAME],
              thematic = data[unit_key][tags.THEMATIC],
              is_thematic_exists = thematic !== "";
        return name + (is_thematic_exists ? " (" + thematic + ")" : "");
    }

    /**
     * MODIFIES loaded_version.
     * read_data() SHOULD BE CALLED AFTERWARDS TO REFRESH DATA.
     *
     * @param {string}    [new_version=version.CURRENT]    THE NEW LOADED VERSION.
     */
    function set_loaded_version(new_version = version.CURRENT) {
        loaded_version = new_version;
    }

    /**
     * CHECKS IF THE CHARACTER EXISTS IN THE CHARACTER DATA.
     *
     * @param {string}    character_id    CHARACTER ID ; i.e. MIYAKO = "miyako".
     * @return {boolean} TRUE IF THE CHARACTER EXISTS IN THE CHARACTER DATA.
     */
    function is_character_exists(character_id) {
        return data.hasOwnProperty(character_id);
    }

    function get_max_rank() {
        return max_rank;
    }

    function get_loaded_version() {
        return loaded_version;
    }

    function get_data() {
        return data;
    }

    return {
        tags: tags,
        version: version,
        loaded_version: get_loaded_version,
        set_loaded_version: set_loaded_version,
        is_character_exists: is_character_exists,
        max_rank: get_max_rank,
        formal_name: get_formal_name,
        read_data: read_data,
        data: get_data
    }
})();
const quest_data = (function () {
    const tags = Object.freeze({
        NAME: "name",                           // THE QUEST NAME IN JAPANESE ; i.e. QUEST 1-1 == "ジュノー平野 1-1"
        ITEM: "item_",                          // PREFIX FOR MAIN ITEMS, ADD THE NUMBER 1 - 4 AFTERWARDS ; i.e. tags.ITEM + 3 == "item_3"
        CHAR_SHARD: "char_shard",               // INFORMATION ABOUT A CHARACTER SHARD (AKA MEMORY PIECE)
        SUBDROPS: "subdrops",                   // ADDITIONAL ITEMS THAT CAN BE OBTAINED AT A LOWER RATE IN A QUEST
        SUBDROPS_PERCENT: "subdrops_percent",   // SPECIFIC DROP RATES FOR SUBDROPS, IF UNDEFINED THEN ASSUME ALL SUBDROPS HAVE 20%
        ITEM_NAME: "item_name",                 // MAIN ITEM NAME IN ENGLISH
        DROP_PERCENT: "drop_percent"            // MAIN ITEM DROP PERCENT
    });

    let max_chapter = 1;
    let data = null;

    /**
     * READ THE QUEST DATA AND STORE THE RESULTS IN THE data VARIABLE.
     * THE LAST QUEST KEY IN THE DATA IS THEN TAKEN TO UPDATE max_chapter.
     *      THIS ASSUMES THAT THE QUEST DATA IS PRE-SORTED BY CHAPTER.
     *      IF FOR SOME REASON THE LAST QUEST HAS A LOWER QUEST CHAPTER THAN OTHER QUESTS, THIS MAY CAUSE ISSUES!
     * WHEN COMPLETE, A CALLBACK FUNCTION WILL BE EXECUTED AND PASS A BOOLEAN DEPENDING ON THE SUCCESS OF THE READ.
     *      TRUE = READING QUEST DATA WAS SUCCESSFUL.
     *      FALSE = READING QUEST DATA WAS NOT SUCCESSFUL OR SOMETHING ELSE WENT WRONG.
     * DEFINING A CALLBACK FUNCTION IS OPTIONAL.
     *
     * @param {function(boolean)}    [callback=function()]    CALLBACK FUNCTION TO CALL AFTER THE READ IS COMPLETE (OPTIONAL).
     */
    function read_data(callback = function () { return undefined; }) {
        let is_success = false;
        const file_path = "/" + window.location.pathname.substring(0, window.location.pathname.indexOf('/')) + window.location.pathname.split('/')[1] + "/data/quest_data.json";
        $.getJSON(file_path, function(raw) {
            data = raw;

            const keys = Object.keys(raw);
            max_chapter = parseInt(keys[keys.length - 1].split('-')[0]);
        })
            .done(function () {
                is_success = true;
            })
            .always(function () {
                callback(is_success);
            });
    }

    function get_max_chapter() {
        return max_chapter;
    }

    function get_data() {
        return data;
    }

    /**
     * RETURNS THE GIVEN QUEST'S CHAPTER NUMBER.
     *
     * @param {string}    quest_id    QUEST IDENTIFIER TO EXTRACT THE CHAPTER FROM ; i.e. "10-5".
     * @return {number} QUEST CHAPTER FROM THE GIVEN QUEST ID ; i.e. `10`.
     */
    function get_quest_chapter(quest_id) {
        return parseInt(quest_id.split("-")[0]);
    }

    /**
     * RETURNS THE GIVEN QUEST'S NUMBER.
     *
     * @param {string}    quest_id    QUEST IDENTIFIER TO EXTRACT THE CHAPTER FROM ; i.e. "13-1H".
     * @return {string} QUEST NUMBER FROM THE GIVEN QUEST ID ; i.e. "1H".
     */
    function get_quest_number(quest_id) {
        return quest_id.split("-")[1];
    }

    return {
        tags: tags,
        max_chapter: get_max_chapter,
        read_data: read_data,
        data: get_data,
        get_quest_chapter: get_quest_chapter,
        get_quest_number: get_quest_number
    }
})();

const dictionary = (function () {
    const info = Object.freeze({
        EQUIPMENT: "10",
        FRAGMENT: "11",
        BLUEPRINT: "12",
        MEMORY_PIECE: "31",
        PURE_MEMORY_PIECE: "32"
    });
    let data = null;

    function read_data(callback = function () { return undefined; }) {
        let is_success = false;
        const file_path = "/" + window.location.pathname.substring(0, window.location.pathname.indexOf('/')) + window.location.pathname.split('/')[1] + "/data/dictionary.json";
        $.getJSON(file_path, function(raw) {
            data = raw;
        })
            .done(function () {
                is_success = true;
            })
            .always(function () {
                callback(is_success);
            });
    }

    function convert_fragmentID_to_equipmentID(fragmentID) {
        return "10" + fragmentID.substring(2, fragmentID.length);
    }

    function get_entry(item_id, language) {
        const default_language = "en-US";
        const item_type = item_id.substring(0, 2);
        let item_name, suffix, item_name_default, suffix_default;

        // GET TRANSLATION
        switch (item_type) {
            case info.EQUIPMENT:
            case info.MEMORY_PIECE:
            case info.PURE_MEMORY_PIECE:
                item_name = data["equipment"][item_id][language];
                suffix = suffix_default = "";
                item_name_default = data["equipment"][item_id][default_language];
                break;
            case info.FRAGMENT:
            case info.BLUEPRINT:
                item_name = data["equipment"][convert_fragmentID_to_equipmentID(item_id)][language];
                suffix = data["suffix"][(item_type === info.FRAGMENT ? "fragment" : "blueprint")][language];
                item_name_default = data["equipment"][convert_fragmentID_to_equipmentID(item_id)][default_language];
                suffix_default = data["suffix"][(item_type === info.FRAGMENT ? "fragment" : "blueprint")][default_language];
                break;
            default:
                console.log("unknown item type", "(" + item_type + ")", item_id);
                return "";
        }

        // FALLBACK TO DEFAULT LANGUAGE (ENGLISH) TRANSLATIONS IF THEY DON'T EXIST
        if (item_name === "") {
            item_name = item_name_default;
        }
        if (suffix === "") {
            suffix = suffix_default;
        }

        return item_name + suffix;
    }

    return {
        read_data: read_data,
        get: get_entry,
    }
})();