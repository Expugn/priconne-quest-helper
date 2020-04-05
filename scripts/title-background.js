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

const default_background = backgrounds.MIYAKO;

function init_background_select()
{
    let select_html = "";
    Object.keys(backgrounds).forEach(function (key)
    {
        select_html += "<option value=\"" + backgrounds[key] + "\">" + key + ((backgrounds[key] === default_background) ? " (DEFAULT)" : "") + "</option>";
    });

    document.getElementById("title-background-select").innerHTML = select_html;
}

function init_background() {
    //{
    //  background: "OPTION",
    //  custom_background: "http://image/",
    //  hover_disabled: false,
    //}

    // IF LOCALSTORAGE SUPPORT EXISTS
    if (typeof(Storage) !== "undefined") {
        // CONVERT OLD FORMAT TO RECENT [1.8.11] FORMAT, LOOK ABOVE
        let is_background_json;
        try {JSON.parse(localStorage.getItem("background")); is_background_json = true;}
        catch (e) {is_background_json = false;}
        if ((localStorage.getItem("background") !== null && !is_background_json) ||
            localStorage.getItem("custom_background_url") !== null) {
            console.log(get_colored_message("Title Background") + message_status.INFO + "Converting saved title background data to the new format...");
            let new_data = {
                "background": ((localStorage.getItem("background") !== null && !is_background_json) ? localStorage.getItem("background") : ""),
                "custom_background": (localStorage.getItem("custom_background_url") !== null ? localStorage.getItem("custom_background_url") : ""),
                "hover_disabled": false
            };
            localStorage.setItem("background", JSON.stringify(new_data));
            localStorage.removeItem("custom_background_url");
        }

        // IF THERE IS A DESIRED BACKGROUND SAVED
        if (localStorage.getItem("background") !== null) {
            let background_localstorage = get_background_data();

            // DISABLE HOVER ANIMATION
            document.getElementById("custom-title-hover-disable").checked = background_localstorage["hover_disabled"];
            disable_title_hover(background_localstorage["hover_disabled"]);

            let saved_background = background_localstorage["background"];
            let saved_background_exists = Object.entries(backgrounds).some(function (entry) {return saved_background === entry[1];});

            // RESTORE SAVED CUSTOM BACKGROUND
            let custom_background_url = "";
            if (background_localstorage["custom_background"] !== "") {
                custom_background_url = background_localstorage["custom_background"];
            }
            document.getElementById("custom-title-url-input").value = custom_background_url;

            // IF SAVED BACKGROUND EXISTS, USE IT ; IF NOT, USE DEFAULT AND DELETE SAVED BACKGROUND
            if (saved_background_exists) {
                if (saved_background !== backgrounds.CUSTOM) {
                    set_title_background(saved_background);
                }
                else {
                    // IF CUSTOM BACKGROUND, SHOW ELEMENT + SET BACKGROUND
                    document.getElementById("custom-title-input").hidden = false;

                    // SET CUSTOM TITLE BACKGROUND ; USE DEFAULT IF IT DOES NOT EXIST
                    if (custom_background_url !== "") {
                        set_custom_title_background(custom_background_url);
                    }
                    else {
                        set_title_background(default_background);
                    }
                }
                document.getElementById("title-background-select").value = saved_background;
            }
            else {
                // DELETE BACKGROUND DATA IF EMPTY
                if (is_background_data_empty()) {
                    localStorage.removeItem("background");
                }

                // USE DEFAULT BACKGROUND
                set_title_background(default_background);
                document.getElementById("title-background-select").value = default_background;
            }
        }
        else {
            // USE DEFAULT BACKGROUND
            set_title_background(default_background);
            document.getElementById("title-background-select").value = default_background;
        }
    }
}

function change_background() {
    let background_image_name = document.getElementById("title-background-select").value;

    if (background_image_name !== backgrounds.CUSTOM) {
        // HIDE CUSTOM TITLE BACKGROUND INPUT
        document.getElementById("custom-title-input").hidden = true;

        // SET BACKGROUND
        set_title_background(background_image_name);

        // SAVE PREFERRED BACKGROUND TO LOCALSTORAGE
        if (typeof(Storage) !== "undefined") {
            if (background_image_name === default_background) {
                // REMOVE LOCALSTORAGE SAVED DATA IF BACKGROUND IS CHANGED TO DEFAULT
                if (localStorage.getItem("background") !== null) {
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
        document.getElementById("custom-title-input").hidden = false;
        let custom_background_url = document.getElementById("custom-title-url-input").value;
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

function set_title_background(image_name) {
    document.getElementById("title-div").style.backgroundImage = "url('" + get_webpage_image_path("backgrounds/" + image_name) + "')";
}

function set_custom_title_background(image_url) {
    document.getElementById("title-div").style.backgroundImage = "url('" + image_url + "')";
}

function save_background_data(background = "", custom_background = "") {
    let save_hover_only = background === "" && custom_background === "";
    let background_data = {
        "background": "",
        "custom_background": "",
        "hover_disabled": document.getElementById("custom-title-hover-disable").checked
    };

    // RESTORE OLD DATA
    const bg_ls = get_background_data();

    if (bg_ls !== null) {
        if (bg_ls["background"] !== "") {background_data["background"] = bg_ls["background"];}
        if (bg_ls["custom_background"] !== "") {background_data["custom_background"] = bg_ls["custom_background"];}
    }

    // SET NEW DATA
    if (!save_hover_only) {
        if (background !== "") { background_data["background"] = (background === "-" ? "" : background); }
        if (custom_background !== "") { background_data["custom_background"] = (custom_background === "-" ? "" : custom_background); }
    }

    localStorage.setItem("background", JSON.stringify(background_data));

    // EDIT TITLE HOVER STATUS IF NEEDED
    disable_title_hover(background_data["hover_disabled"]);

    // DELETE BACKGROUND DATA IF EMPTY
    if (is_background_data_empty(background_data)) {
        localStorage.removeItem("background");
    }
}

function get_background_data() {
    return JSON.parse(localStorage.getItem("background"));
}

function is_background_data_empty(background_data = null) {
    const bg_ls = (background_data !== null ? background_data : JSON.parse(localStorage.getItem("background")));
    return bg_ls["background"] === "" && bg_ls["custom_background"] === "" && !bg_ls["hover_disabled"];
}

function disable_title_hover(disabled) {
    if (disabled) {document.getElementById("title-div").classList.add("no-hover");}
    else {document.getElementById("title-div").classList.remove("no-hover");}
}