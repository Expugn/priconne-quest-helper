const https = require('https');
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const character_data = require(`${__dirname}../../../data/character_data.json`);
const equipment_data = require(`${__dirname}../../../data/equipment_data.json`);

const character = {};

run();
async function run() {
    init();
    await update();
}

function init() {
    for (const unit_key in character_data) {
        const data = character_data[unit_key];
        const id = data["unit_id"];
        character[id] = {
            data,
            key: unit_key,
        };
    }
}

function update() {
    return new Promise(async (resolve) => {
        const promises = await Promise.all([
            update_region("cn"),
            update_region("en"),
            update_region("kr"),
            update_region("tw"),
        ]);
    });
}

function update_region(region = "jp") {
    return new Promise(async (resolve) => {
        await download(region);
        write_character_data(region);
        await write_equipment_data(region);
        write_quest_data(region); // needs equipment data to finish first
        resolve();
    });
}

function download(region = "jp") {
    return new Promise(async (resolve) => {
        const file = fs.createWriteStream(`master_${region}.db`);
        const url = `https://raw.githubusercontent.com/Expugn/priconne-database/master/master_${region}.db`;

        https.get(url, (res) => {
            const stream = res.pipe(file);
            stream.on('finish', () => {
                console.log(`downloaded master_${region}.db from ${url}`);
                resolve();
            });
        });
    });
}

function write_equipment_data(region = "jp") {
    return new Promise(async (resolve) => {
        let counters = {};
        let db, result, data = {};
        db = await open({
            filename: `master_${region}.db`,
            driver: sqlite3.Database
        });

        // GET EQUIPMENT
        result = await db.all('SELECT equipment_id, equipment_name FROM equipment_data');
        result.forEach((entry) => {
            const id = `${entry["equipment_id"]}`;
            if (!equipment_data[id]) {
                return;
            }
            data[id] = {
                [`name_${region}`]: entry["equipment_name"],
                ...JSON.parse(JSON.stringify(equipment_data[id])),
            };
            const rarity_string = data[id]["id"].split("-")[0];
            if (!counters[rarity_string]) {
                counters[rarity_string] = 1;
            }
            else {
                counters[rarity_string]++;
            }
            data[id]["id"] = `${rarity_string}-${counters[rarity_string]}`;
        });

        // ADD CHARACTER MEMORY PIECES
        result = await db.all('SELECT item_id, item_name, item_type FROM item_data');
        result.forEach((entry) => {
            const id = `${entry["item_id"]}`;
            if (!equipment_data[id]) {
                return;
            }
            if (!counters["misc"]) {
                counters["misc"] = 1;
            }
            else {
                counters["misc"]++;
            }
            data[id] = {
                ...JSON.parse(JSON.stringify(equipment_data[id])),
            };
            data[id]["id"] = `misc-${counters["misc"]}`;
        });

        // ADD REQUIRED FRAGMENTS
        result = await db.all('SELECT equipment_id, condition_equipment_id_1, consume_num_1 FROM equipment_craft');
        result.forEach((entry) => {
            const id = `${entry["equipment_id"]}`;
            if (!equipment_data[id]) {
                return;
            }
            if (get_item_type(id) !== "10") {
                return;
            }
            if (get_item_id(id) === get_item_id(entry["condition_equipment_id_1"])) {
                data[id]["req_pieces"] = entry["consume_num_1"];
            }
            else {
                data[id]["req_pieces"] = 0;
            }
        });

        // assuming req items doesn't change

        fs.writeFile(`data/equipment_data_${region}.json`, JSON.stringify(data, null, 4), async function(err) {
            if (err) throw err;
            console.log(`COMPLETED REGIONAL EQUIPMENT DATA UPDATE FOR ${region}`);
            db.close().finally(() => {
                resolve();
            });
        });

        function get_item_type(full_id) {
            return full_id.toString().substring(0, 2);
        }
        function get_item_id(full_id) {
            return full_id.toString().substring(2);
        }
    });
}

function write_character_data(region = "jp") {
    return new Promise(async function(resolve) {
        let db, result, data = {};
        db = await open({
            filename: `master_${region}.db`,
            driver: sqlite3.Database
        });

        // ADD UNIT
        let unit_names = {};
        result = await db.all('SELECT unit_id, unit_name FROM unit_data');
        result.forEach((entry) => {
            const id = `${entry["unit_id"]}`;
            if (!character[id]) {
                return;
            }
            unit_names[character[id]["key"]] = entry["unit_name"];
        });

        // GET UNIT PROMOTION REQUIREMENTS (trim from JP version)
        result = await db.all('SELECT unit_data.unit_name, unit_promotion.unit_id, unit_promotion.promotion_level, '
            + 'unit_promotion.equip_slot_1, unit_promotion.equip_slot_2, unit_promotion.equip_slot_3, '
            + 'unit_promotion.equip_slot_4, unit_promotion.equip_slot_5, unit_promotion.equip_slot_6 '
            + 'FROM unit_promotion INNER JOIN unit_data ON unit_promotion.unit_id=unit_data.unit_id '
            + 'ORDER BY unit_data.unit_name ASC');
        result.forEach((entry) => {
            const id = `${entry["unit_id"]}`;
            if (!character[id]) {
                return;
            }
            const key = character[id]["key"];
            if (!data[key]) {
                data[key] = {
                    [`name_${region}`]: unit_names[key],
                    ...JSON.parse(JSON.stringify(character[id]["data"])),
                };
            }
            const promotion_level = entry["promotion_level"],
                es_1 = entry["equip_slot_1"] !== 999999,
                es_2 = entry["equip_slot_2"] !== 999999,
                es_3 = entry["equip_slot_3"] !== 999999,
                es_4 = entry["equip_slot_4"] !== 999999,
                es_5 = entry["equip_slot_5"] !== 999999,
                es_6 = entry["equip_slot_6"] !== 999999;
            data[key][`rank_${promotion_level}`] = ["", "", "", "", "", ""];
            if (es_1) {
                data[key][`rank_${promotion_level}`][0] = character[id]["data"][`rank_${promotion_level}`][0];
            }
            if (es_2) {
                data[key][`rank_${promotion_level}`][1] = character[id]["data"][`rank_${promotion_level}`][1];
            }
            if (es_3) {
                data[key][`rank_${promotion_level}`][2] = character[id]["data"][`rank_${promotion_level}`][2];
            }
            if (es_4) {
                data[key][`rank_${promotion_level}`][3] = character[id]["data"][`rank_${promotion_level}`][3];
            }
            if (es_5) {
                data[key][`rank_${promotion_level}`][4] = character[id]["data"][`rank_${promotion_level}`][4];
            }
            if (es_6) {
                data[key][`rank_${promotion_level}`][5] = character[id]["data"][`rank_${promotion_level}`][5];
            }
            if (!es_1 || !es_2 || !es_3 || !es_4 || !es_5 || !es_6) {
                // purge rest of ranks
                let i = promotion_level + 1;
                while (data[key][`rank_${i}`]) {
                    delete data[key][`rank_${i++}`];
                }
            }
        });

        fs.writeFile(`data/character_data_${region}.json`, JSON.stringify(data, null, 4), async function(err) {
            if (err) throw err;
            console.log(`COMPLETED REGIONAL CHARACTER DATA UPDATE FOR ${region}`);
            db.close().finally(() => {
                resolve();
            });
        });
    });
}

function write_quest_data(region = "jp") {
    return new Promise(async function(resolve) {
        let db, result, data = {}, quest_data = {};
        db = await open({
            filename: `master_${region}.db`,
            driver: sqlite3.Database
        });

        let wave_group_info, enemy_reward_info;
        const equipment_data = JSON.parse(fs.readFileSync(path.join("data", `equipment_data_${region}.json`), 'utf-8'));


        result = await db.all('SELECT quest_id, quest_name, stamina, wave_group_id_1, wave_group_id_2, wave_group_id_3 FROM quest_data');
        result.forEach((entry) => {
            const quest_id = entry["quest_id"];
            let quest_type = quest_id.toString().substring(0, 2);
            if (parseInt(quest_type) !== 18 && parseInt(quest_type) !== 19) {
                const quest_full_name = entry["quest_name"],
                    _quest_name = quest_full_name.split(' ').pop().trim(),
                    quest_chapter = _quest_name.substring(0, _quest_name.indexOf('-')),
                    quest_number = _quest_name.substring(_quest_name.indexOf('-') + 1);
                let quest_difficulty;
                if (quest_type === "11") {
                    quest_type = "";
                    quest_difficulty = "NORMAL";
                }
                else if (quest_type === "12") {
                    quest_type = "H";
                    quest_difficulty = "HARD";
                }
                else if (quest_type === "13") {
                    quest_type = "VH";
                    quest_difficulty = "VERY HARD";
                }
                else {
                    console.log('UNKNOWN QUEST TYPE!', quest_full_name, quest_type);
                    quest_type = "???";
                    quest_difficulty = "UNKNOWN";
                }
                quest_data[quest_id.toString()] = {
                    "id": quest_id,
                    "name": quest_full_name,
                    "stamina": entry["stamina"],
                    "key": quest_chapter + '-' + quest_number + quest_type,
                    "difficulty": quest_difficulty,
                    "wave_group_id_1": entry["wave_group_id_1"],
                    "wave_group_id_2": entry["wave_group_id_2"],
                    "wave_group_id_3": entry["wave_group_id_3"]
                };
            }
        });

        // COLLECT wave_group_data INFORMATION
        let wave_group_data = {};
        result = await db.all('SELECT wave_group_id, drop_reward_id_1, drop_reward_id_2, drop_reward_id_3, ' +
            'drop_reward_id_4, drop_reward_id_5 FROM wave_group_data');
        result.forEach((entry) => {
            wave_group_data[entry["wave_group_id"]] = {
                "wave_group_id": entry["wave_group_id"],
                "drop_reward_1": entry["drop_reward_id_1"],
                "drop_reward_2": entry["drop_reward_id_2"],
                "drop_reward_3": entry["drop_reward_id_3"],
                "drop_reward_4": entry["drop_reward_id_4"],
                "drop_reward_5": entry["drop_reward_id_5"],
            };
        });
        wave_group_info = wave_group_data;

        // COLLECT enemy_reward_data INFORMATION
        let enemy_reward_data = {};
        result = await db.all('SELECT drop_reward_id, reward_type_1, reward_id_1, odds_1, ' +
            'reward_type_2, reward_id_2, odds_2, ' +
            'reward_type_3, reward_id_3, odds_3, ' +
            'reward_type_4, reward_id_4, odds_4, ' +
            'reward_type_5, reward_id_5, odds_5 FROM enemy_reward_data');
        result.forEach((entry) => {
            enemy_reward_data[entry["drop_reward_id"]] = {
                "drop_reward_id": entry["drop_reward_id"],
                "reward_type_1": entry["reward_type_1"],
                "reward_id_1": entry["reward_id_1"],
                "reward_odds_1": entry["odds_1"],

                "reward_type_2": entry["reward_type_2"],
                "reward_id_2": entry["reward_id_2"],
                "reward_odds_2": entry["odds_2"],

                "reward_type_3": entry["reward_type_3"],
                "reward_id_3": entry["reward_id_3"],
                "reward_odds_3": entry["odds_3"],

                "reward_type_4": entry["reward_type_4"],
                "reward_id_4": entry["reward_id_4"],
                "reward_odds_4": entry["odds_4"],

                "reward_type_5": entry["reward_type_5"],
                "reward_id_5": entry["reward_id_5"],
                "reward_odds_5": entry["odds_5"],
            };
        });
        enemy_reward_info = enemy_reward_data;

        // BUILD QUEST DATA JSON
        for (const key in quest_data) {
            let quest = quest_data[key];

            // CHECK IF QUEST HAS ALL WAVE DATA
            if (quest["wave_group_id_1"] !== 0 &&
                quest["wave_group_id_2"] !== 0 &&
                quest["wave_group_id_3"] !== 0) {

                // GET QUEST DROPS
                if (quest['difficulty'] === 'NORMAL') {
                    data = add_quest_entry(data, quest);

                    // CHECK IF ANY MORE NORMAL QUESTS
                    const quest_id = quest["id"].toString(),
                        quest_number = quest_id.substring(quest_id.length - 3),
                        quest_chapter = quest_id.substring(quest_id.length - 6, quest_id.length - 3),
                        next_quest_number = (parseInt(quest_number) + 1).toString().padStart(3, '0'),
                        next_quest_id = "11" + quest_chapter + next_quest_number;
                    if (!quest_data.hasOwnProperty(next_quest_id)) {
                        // ADD HARD QUESTS
                        let hard_quest_counter = 1,
                            hard_quest_id = "12" + quest_chapter + hard_quest_counter.toString().padStart(3, '0');
                        while (quest_data.hasOwnProperty(hard_quest_id)) {
                            quest = quest_data[hard_quest_id];
                            if (quest["wave_group_id_1"] !== 0 &&
                                quest["wave_group_id_2"] !== 0 &&
                                quest["wave_group_id_3"] !== 0) {
                                data = add_quest_entry(data, quest);
                            }
                            hard_quest_counter++;
                            hard_quest_id = "12" + quest_chapter + hard_quest_counter.toString().padStart(3, '0');
                        }

                        // ADD VERY HARD QUESTS
                        hard_quest_counter = 1;
                        hard_quest_id = '13' + quest_chapter + hard_quest_counter.toString().padStart(3, '0');
                        while (quest_data.hasOwnProperty(hard_quest_id)) {
                            quest = quest_data[hard_quest_id];
                            if (quest["wave_group_id_1"] !== 0 &&
                                quest["wave_group_id_2"] !== 0 &&
                                quest["wave_group_id_3"] !== 0) {
                                data = add_quest_entry(data, quest);
                            }
                            hard_quest_counter++;
                            hard_quest_id = "13" + quest_chapter + hard_quest_counter.toString().padStart(3, '0');
                        }
                    }
                }
            }
        }

        // QUEST DATA WRITE COMPLETE ; SAVE FILE
        fs.writeFile(`data/quest_data_${region}.json`, JSON.stringify(data, null, 4), function(err) {
            if (err) throw err;
            console.log(`COMPLETED REGIONAL QUEST DATA UPDATE FOR ${region}`);
            db.close().finally(() => {
                resolve();
            });
        });

        function get_next_key(data) {
            let counter = 1;
            while (data.hasOwnProperty('item_' + counter)) {
                counter++;
            }
            return 'item_' + counter;
        }

        function get_quest_drops(data, wave_group) {
            let drop_reward_counter = 1;
            while (drop_reward_counter <= 5) {
                // GET WAVE DROPS
                const wave_drops = wave_group['drop_reward_' + drop_reward_counter];
                if (wave_drops !== 0) {
                    // GET ITEMS FROM WAVE DROPS
                    const enemy_reward = enemy_reward_info[wave_drops];

                    // CHECK IF WAVE GIVES SUBDROPS
                    if (enemy_reward["reward_id_1"] !== 0 &&
                        enemy_reward["reward_id_2"] !== 0 &&
                        enemy_reward["reward_id_3"] !== 0 &&
                        enemy_reward["reward_id_4"] !== 0 &&
                        enemy_reward["reward_id_5"] !== 0) {
                        data["subdrops"] = [
                            {
                                "reward_id": enemy_reward["reward_id_1"],
                                "reward_odds": enemy_reward["reward_odds_1"],
                            },
                            {
                                "reward_id": enemy_reward["reward_id_2"],
                                "reward_odds": enemy_reward["reward_odds_2"],
                            },
                            {
                                "reward_id": enemy_reward["reward_id_3"],
                                "reward_odds": enemy_reward["reward_odds_3"],
                            },
                            {
                                "reward_id": enemy_reward["reward_id_4"],
                                "reward_odds": enemy_reward["reward_odds_4"],
                            },
                            {
                                "reward_id": enemy_reward["reward_id_5"],
                                "reward_odds": enemy_reward["reward_odds_5"],
                            }
                        ];
                    }
                    else {
                        let enemy_reward_counter = 1;
                        while (enemy_reward_counter <= 5) {
                            const reward_type = enemy_reward["reward_type_" + enemy_reward_counter],
                                reward_id = enemy_reward["reward_id_" + enemy_reward_counter],
                                reward_odds = enemy_reward["reward_odds_" + enemy_reward_counter],
                                item = {
                                    "reward_id": reward_id,
                                    "reward_odds": reward_odds
                                };
                            if (reward_id !== 0) {
                                // IF DROP IS EQUIPMENT
                                if (reward_type === 4) {
                                    const key = get_next_key(data);
                                    data[key] = item;
                                }
                                else {
                                    if (reward_type === 2) {
                                        // CHECK IF ITEM IS A MEMORY PIECE
                                        if (reward_id.toString().substring(0, 1) === '3') {
                                            data['char_shard'] = item;
                                        }
                                    }
                                }
                            }
                            else {
                                break;
                            }
                            enemy_reward_counter++;
                        }
                    }
                }
                else {
                    drop_reward_counter++;
                    continue;
                }
                drop_reward_counter++;
            }
            return data;
        }

        function add_quest_entry(data, quest) {
            // GET QUEST DROPS
            if (!wave_group_info[quest["wave_group_id_1"]]) {
                // wave group id 1 doesn't exist for some reason, skip this quest entry
                return data;
            }
            let quest_drops = get_quest_drops({}, wave_group_info[quest["wave_group_id_1"]]);
            quest_drops = get_quest_drops(quest_drops, wave_group_info[quest["wave_group_id_2"]]);
            quest_drops = get_quest_drops(quest_drops, wave_group_info[quest["wave_group_id_3"]]);

            if (Object.keys(quest_drops).length <= 0) {
                // quest has no drops
                console.log("QUEST DROPS IS EMPTY!!!", quest);
                return data;
            }

            // INIT QUEST ENTRY
            const quest_key = quest['key'];
            data[quest_key] = {
                "name": quest['name'],
                "stamina": quest['stamina']
            };

            // ADD ITEMS 1 - 4
            let counter = 1;
            while (counter <= 4) {
                if (quest_drops.hasOwnProperty("item_" + counter)) {
                    const item_id = quest_drops["item_" + counter]["reward_id"].toString().substring(2),
                        drop_percent = quest_drops["item_" + counter]["reward_odds"];
                    let item_name = equipment_data["10" + item_id]["name"];

                    // ADD ' Fragment' IF ITEM HAS FRAGMENTS
                    if (equipment_data['10' + item_id]["has_fragments"]) {
                        item_name += " Fragment";
                    }

                    // ADD TO DATA
                    data[quest_key]["item_" + counter] = {
                        "item_name": item_name,
                        "drop_percent": drop_percent
                    }
                }
                counter++;
            }

            // ADD CHARACTER SHARD
            if (quest_drops.hasOwnProperty('char_shard')) {
                const item_id = quest_drops["char_shard"]["reward_id"].toString(),
                    item_name = equipment_data[item_id]["name"];
                data[quest_key]["char_shard"] = {
                    "item_name": item_name,
                    "drop_percent": quest_drops["char_shard"]["reward_odds"]
                };
            }

            // ADD SUBDROPS AND DROP PERCENT
            let subdrops = [],
                subdrops_percent = [],
                subdrops_not_equal;
            quest_drops["subdrops"].forEach((item_data) => {
                const item_id = item_data["reward_id"].toString().substring(2),
                    drop_percent = item_data["reward_odds"];
                let item_name = equipment_data["10" + item_id]["name"];

                // ADD " Fragment" IF ITEM HAS FRAGMENTS
                if (equipment_data["10" + item_id]["has_fragments"]) {
                    item_name += " Fragment";
                }

                subdrops.push(item_name);
                subdrops_percent.push(drop_percent);
                subdrops_not_equal = subdrops_percent[0] !== drop_percent;
            });
            data[quest_key]["subdrops"] = subdrops;
            if (subdrops_not_equal) {
                data[quest_key]["subdrops_percent"] = subdrops_percent;
            }

            return data;
        }
    });
}