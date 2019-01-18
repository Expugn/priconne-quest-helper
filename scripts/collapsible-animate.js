function enableCollapsible()
{
    let coll = document.getElementsByClassName("collapsible");

    if (coll.length < 5)
    {
        console.log("Less than 5 elements detected... Page must not be done loading yet. will pause for .1s and restart.");
        setTimeout(function () {
            enableCollapsible()
        }, 100);
        return;
    }

    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            let content = this.nextElementSibling;
            this.classList.toggle("active");

            if (content.style.maxHeight){
                /* HIDE CONTENT */
                content.style.maxHeight = null;
                content.style.overflow = "hidden";

            } else {
                /* SHOW CONTENT */
                content.style.maxHeight = content.scrollHeight + "px";
                setTimeout(function () {
                    content.style.overflow = "auto";
                }, 400);
                //content.style.overflow = "auto";
            }
        });
    }

    console.log("Enabled Collapsible Menus!");
}