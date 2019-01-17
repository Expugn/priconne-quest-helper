function enableCollapsible()
{
    let coll = document.getElementsByClassName("collapsible");

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
}