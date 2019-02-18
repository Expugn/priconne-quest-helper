function pastebin_connect(paste_text)
{
    /*
    $.ajax({
        url: "https://pastebin.com/api/api_post.php",
        type: "POST",
        dataType: "JSONP",
        data: {
            "api_dev_key": PASTEBIN_API_KEY,
            "api_option": "paste",
            "api_paste_private": "1",
            "api_paste_expire_date": "3M",
            "api_paste_format": "javascript",
            "api_paste_code": paste_text
        },
        success: function (res)
        {
            console.log(res);
        },
        error: function (res)
        {
            console.log("error!");
        },
    });
    */
    /*
    $.ajax({
        url: "http://pastebin.com/api/api_post.php",
        type: "POST",
        dataType: "JSONP",
        data: {
            "api_dev_key": PASTEBIN_API_KEY,
            "api_option": "paste",
            "api_paste_code": "blah blah"
        },
        success: function(res) {
            console.log(res);
        },
        error: function(res) {
            console.log("Error");
        }
    });
    */

    let request = new XMLHttpRequest();
    request.open("POST", "https://pastebin.com/api/api_post.php", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send("api_dev_key=" + PASTEBIN_API_KEY + "&api_option=paste&api_paste_private=1&api_paste_name=priconne-quest-helper_data-code&api_paste_expire_date=3M&api_paste_format=javascript&api_paste_code=" + paste_text);

    return request.response;
}