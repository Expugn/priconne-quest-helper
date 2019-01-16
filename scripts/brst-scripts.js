/* http://www.alistapart.com/articles/zebratables/ */
function removeClassName (elem, className) {
    elem.className = elem.className.replace(className, "").trim();
}

function addCSSClass (elem, className) {
    removeClassName (elem, className);
    elem.className = (elem.className + " " + className).trim();
}

String.prototype.trim = function() {
    return this.replace( /^\s+|\s+$/, "" );
}

function stripedTable() {
    if (document.getElementById && document.getElementsByTagName) {
        var allTables = document.getElementsByTagName('table');
        if (!allTables) { return; }

        for (var i = 0; i < allTables.length; i++) {
            if (allTables[i].className.match(/[\w\s ]*scrollTable[\w\s ]*/)) {
                var trs = allTables[i].getElementsByTagName("tr");
                for (var j = 0; j < trs.length; j++) {
                    removeClassName(trs[j], 'alternateRow');
                    addCSSClass(trs[j], 'normalRow');
                }
                for (var k = 0; k < trs.length; k += 2) {
                    removeClassName(trs[k], 'normalRow');
                    addCSSClass(trs[k], 'alternateRow');
                }
            }
        }
    }
}

/* onload state is fired, append onclick action to the table's DIV */
/* container. This allows the HTML document to validate correctly. */
/* addIEonScroll added on 2005-01-28                               */
/* Terence Ordona, portal[AT]imaputz[DOT]com                       */
function addIEonScroll() {
    var thisContainer = document.getElementById('tableContainer');
    if (!thisContainer) { return; }

    var onClickAction = 'toggleSelectBoxes();';
    thisContainer.onscroll = new Function(onClickAction);
}

/* Only WinIE will fire this function. All other browsers scroll the TBODY element and not the DIV */
/* This is to hide the SELECT elements from scrolling over the fixed Header. WinIE only.           */
/* toggleSelectBoxes added on 2005-01-28 */
/* Terence Ordona, portal[AT]imaputz[DOT]com         */
function toggleSelectBoxes() {
    var thisContainer = document.getElementById('tableContainer');
    var thisHeader = document.getElementById('fixedHeader');
    if (!thisContainer || !thisHeader) { return; }

    var selectBoxes = thisContainer.getElementsByTagName('select');
    if (!selectBoxes) { return; }

    for (var i = 0; i < selectBoxes.length; i++) {
        if (thisContainer.scrollTop >= eval(selectBoxes[i].parentNode.offsetTop - thisHeader.offsetHeight)) {
            selectBoxes[i].style.visibility = 'hidden';
        } else {
            selectBoxes[i].style.visibility = 'visible';
        }
    }
}

window.onload = function() { stripedTable(); addIEonScroll(); }