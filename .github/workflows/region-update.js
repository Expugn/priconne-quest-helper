const https = require('https');
const fs = require('fs');
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
        write_equipment_data(region);
        write_character_data(region);
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
        });

        // ADD CHARACTER MEMORY PIECES
        result = await db.all('SELECT item_id, item_name, item_type FROM item_data');
        result.forEach((entry) => {
            const id = `${entry["item_id"]}`;
            if (!equipment_data[id]) {
                return;
            }
            data[id] = {
                ...JSON.parse(JSON.stringify(equipment_data[id])),
            }
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
        result = await db.all('SELECT unit_id, unit_name FROM unit_data');
        result.forEach((entry) => {
            const id = `${entry["unit_id"]}`;
            if (!character[id]) {
                return;
            }
            data[character[id]["key"]] = {
                [`name_${region}`]: entry["unit_name"],
                ...JSON.parse(JSON.stringify(character[id]["data"])),
            };
        });

        // GET UNIT PROMOTION REQUIREMENTS (trim from JP version)
        result = await db.all('SELECT unit_id, promotion_level, equip_slot_1, equip_slot_2, equip_slot_3, ' +
            'equip_slot_4, equip_slot_5, equip_slot_6 FROM unit_promotion');
        result.forEach((entry) => {
            const id = `${entry["unit_id"]}`;
            if (!character[id]) {
                return;
            }
            const key = character[id]["key"];
            if (!data[key]) {
                return;
            }
            const promotion_level = entry["promotion_level"],
                es_1 = entry["equip_slot_1"] === 999999,
                es_2 = entry["equip_slot_2"] === 999999,
                es_3 = entry["equip_slot_3"] === 999999,
                es_4 = entry["equip_slot_4"] === 999999,
                es_5 = entry["equip_slot_5"] === 999999,
                es_6 = entry["equip_slot_6"] === 999999;
            if (es_1 || es_2 || es_3 || es_4 || es_5 || es_6) {
                if (!data[key][`rank_${promotion_level}`]) {
                    console.log(data[key]);
                    return;
                }
                if (es_1) {
                    data[key][`rank_${promotion_level}`][0] = "";
                }
                if (es_2) {
                    data[key][`rank_${promotion_level}`][1] = "";
                }
                if (es_3) {
                    data[key][`rank_${promotion_level}`][2] = "";
                }
                if (es_4) {
                    data[key][`rank_${promotion_level}`][3] = "";
                }
                if (es_5) {
                    data[key][`rank_${promotion_level}`][4] = "";
                }
                if (es_6) {
                    data[key][`rank_${promotion_level}`][5] = "";
                }

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