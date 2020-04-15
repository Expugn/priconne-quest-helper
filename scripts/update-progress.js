// APRIL 15, 2020
const update_date = new Date(Date.UTC(2020, 3, 15, 24, 0, 0));
const date_options = { year: 'numeric', month: 'long', day: 'numeric' };

function get_update_date()
{
    if (current_language === language.ENGLISH)
    {
        return update_date.toLocaleDateString("en-US", date_options);
    }
    else
    {
        return update_date.toLocaleDateString(language_json["system"]["date_locale"], date_options);
    }
}

function add_update_date_to_footer()
{
    document.getElementById("update-date-span").innerHTML = get_update_date();
}