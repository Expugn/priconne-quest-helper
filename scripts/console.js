const console_colors = Object.freeze({
    // TEXT STYLING
    RESET: '\x1b[0m',
    BRIGHT: '\x1b[1m',
    DIM: '\x1b[2m',
    UNDERSCORE: '\x1b[4m',
    BLINK: '\x1b[5m',
    REVERSE: '\x1b[7m',
    HIDDEN: '\x1b[8m',

    // TEXT COLORS
    BLACK: '\x1b[30m',
    RED: '\x1b[31m',
    GREEN: '\x1b[32m',
    YELLOW: '\x1b[33m',
    BLUE: '\x1b[34m',
    MAGENTA: '\x1b[35m',
    CYAN: '\x1b[36m',
    WHITE: '\x1b[37m',
    LIGHT_GRAY: '\x1b[90m',
    LIGHT_GREEN: '\x1b[92m',
    LIGHT_YELLOW: '\x1b[93m',
    LIGHT_BLUE: '\x1b[94m',
    LIGHT_CYAN: '\x1b[96m',
    LIGHT_WHITE: '\x1b[97m',

    // BACKGROUND COLORS
    DEFAULT: '\x1b[39m',
    BG_BLACK: '\x1b[40m',
    BG_RED: '\x1b[41m',
    BG_GREEN: '\x1b[42m',
    BG_YELLOW: '\x1b[43m',
    BG_BLUE: '\x1b[44m',
    BG_MAGENTA: '\x1b[45m',
    BG_CYAN: '\x1b[46m',
    BG_WHITE: '\x1b[47m',
    BG_LIGHT_GRAY: '\x1b[100m',
    BG_LIGHT_GREEN: '\x1b[102m',
    BG_LIGHT_BLUE: '\x1b[104m',

    // TEXT COLORS (DOES NOT DISPLAY/MIGHT NOT DISPLAY ON CHROME)
    /*
    LIGHT_RED: '\x1b[91m',
    LIGHT_MAGENTA: '\x1b[95m',
    */

    // BACKGROUND COLORS (DOES NOT DISPLAY/MIGHT NOT DISPLAY ON CHROME)
    /*
    BG_DEFAULT: '\x1b[49m',
    BG_LIGHT_RED: '\x1b[101m',
    BG_LIGHT_YELLOW: '\x1b[103m',
    BG_LIGHT_MAGENTA: '\x1b[105m',
    BG_LIGHT_CYAN: '\x1b[106m',
    BG_LIGHT_WHITE: '\x1b[107m',
    */
});

const message_status = Object.freeze({
    WARNING: console_colors.RED,
    SUCCESS: console_colors.GREEN,
    INFO: console_colors.BLACK,
});

// RETURNS '[sender] - message' IN THE APPROPRIATE COLORING
function get_colored_message(sender, message, status)
{
    return console_colors.BLUE + "[" + sender + "]" +                           // SENDER
        console_colors.LIGHT_GRAY + " - " +                                     // DIVIDER
        ((status !== undefined) ? status : console_colors.BLACK) +              // STATUS COLOR
        ((message !== undefined) ? message : "") +                              // MESSAGE
        console_colors.RESET;                                                   // RESET (END MESSAGE)
}

// HIGHLIGHTS THE GIVEN TEXT WITH A YELLOW COLOR, OR WITH A DEFINED COLOR
function highlight(text, highlight_color, text_color)
{
    return (text_color !== undefined ? text_color : console_colors.LIGHT_GRAY) +                // TEXT COLOR
            (highlight_color !== undefined ? highlight_color : console_colors.BG_YELLOW) +      // HIGHLIGHT COLOR
            text +                                                                              // TEXT
            console_colors.RESET;                                                               // RESET (END MESSAGE)
}

// HIGHLIGHTS THE GIVEN TEXT WITH A LIGHT GRAY BACKGROUND
function highlight_code(text)
{
    return console_colors.BLACK + console_colors.BG_LIGHT_GRAY + text + console_colors.RESET;
}

// CHANGES THE COLOR OF TEXT
function color_text(text, color)
{
    return (color !== undefined ? color : console_colors.DEFAULT) +     // TEXT COLOR
        text +                                                          // TEXT
        console_colors.RESET;                                           // RESET (END MESSAGE)
}