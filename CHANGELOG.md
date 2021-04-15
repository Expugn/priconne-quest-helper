# Changelog
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.12.0] - 2021-04-15
Quest Update (2021-04-15)
### Added
- Chapter 45 Quests
- New Equipment
- New Character: Chloe (School Festival)

## [2.11.3] - 2021-04-07
### Added
- New Quest: `26-3 VH` (Nozomi)

## [2.11.2] - 2021-03-31
### Added
- New Character: Chieru (School Festival)
- Updated Language Files (EN/JP) ; (KR/CN ***MAY BE INCORRECT***)
  - `thematics.school_festival`

## [2.11.1] - 2021-03-22
### Added
- New Character: Maho (Cinderella)

## [2.11.0] - 2021-03-16
Quest Update (2021-03-16)
### Added
- Chapter 44 Quests
- New Equipment

## [2.10.6] - 2021-03-04
### Added
- New Quests
  - `25-3 VH` (Misogi)
  - `26-1 VH` (Mimi)
  - `26-2 VH` (Kyouka)

## [2.10.5] - 2021-03-03
### Added
- New Character: Makoto (Cinderella)

## [2.10.4] - 2021-02-27
### Added
- Updated Language Files (EN/JP) ; (KR/CN ***MAY BE INCORRECT***)
  - `thematics.cinderella`
- New Characters:
  - Kyaru (Princess)
  - Rima (Cinderella)

## [2.10.3] - 2021-02-24
### Fixed
- Fixed Miyako's death animation for the `No JavaScript` error screen
  - Animation was not playing correctly due to an `!important` tag

## [2.10.2] - 2021-02-23
### Added
- New Character: Kasumi (Summer)

## [2.10.1] - 2021-02-20
### Added
- Inventory: Quantity Sorting
  - Suggested by `MonbanZ`: <https://github.com/Expugn/priconne-quest-helper/issues/38>
  - There's now a list of 3 sorting options:
    - `No Sorting`
    - `Quantity: Ascending`
    - `Quantity: Descending`
  - Choosing an option from the list will perform the sort
  - If quantity for an item is modified, item position will not refresh until the Inventory Modal is closed or updated in case of user input error
- Updated Language Files
  - `inventory.no_sorting`
  - `inventory.quantity_ascending`
  - `inventory.quantity_descending`
- Updated Language Files (KR/CN) **TRANSLATIONS MAY BE INCORRECT**
  - `character_names.sheffy` 

## [2.10.0] - 2021-02-15
Quest Update (2021-02-15)
### Added
- Chapter 43 Quests
- New Equipment
- Updated Language Files (EN/JP) ; (KR/CN are ***UN-TRANSLATED***)
  - `character_names.sheffy`
- Rank 20 Support
- New Character: Sheffy

## [2.9.4] - 2021-02-07
### Added
- New Quest: `25-2 VH` (Yori)

## [2.9.3] - 2021-02-01
### Added
- `pages/recipe-data` Character Usage Filtering
  - Suggested by `nightbasilisk`: <https://github.com/Expugn/priconne-quest-helper/issues/36>
  - `pages/recipe-data` now has a "Character Box" button on the top right of the initial state.
  - Clicking on the "Character Box" button opens up a GUI where you can select characters you have.
  - Characters you have will be displayed first on "Character Usage" of items
  - Characters you DON'T have will be grayscale and displayed after characters you DO have, if applicable.
  - If no characters are selected, information will be displayed as normal.

## [2.9.2] - 2021-01-30
Save Data Purge #4: `1377` / `1627` Files Deleted
### Added
- New Setting: `Subtract Amount From Inventory`
  - Suggested by `Notoriouzb`: <https://github.com/Expugn/priconne-quest-helper/issues/35>
  - Subtracts the `Amount Required` from the amount of that item you have in your `Inventory`
  - For more information, see <https://github.com/Expugn/priconne-quest-helper/wiki/Display-Settings>
- Added new text to language files (some translations may be incorrect)
  - `settings_tab.subtract_amount_from_inventory`
  - `thematics.ceremonial_attire`
- New Characters
  - Kokkoro (Ceremonial Attire)
  - Yui (Ceremonial Attire)
### Changed
- Adjusted styling for `pages/statistics`

## [2.9.1] - 2021-01-23
### Added
- `Quest Stamina` information added to `data/quest_data.json`
  - `Quest Stamina` is now visible under `Recommended Quests` if you disable `Hide Quest Score`
### Changed
- Quest Score Tweaks
  - Suggested by an anonymous donator, thank you!
  - Quest Score is now calculated by adding all `drop_percent`s together and dividing it by the quest stamina.

## [2.9.0] - 2021-01-22
Quest Update (2021-01-22)
### Notice
- Next quest update, `data/dictionary.json` will not be updated and considered deprecated
### Added
- New Character: Neneka (New Year)
- Chapter 42 Quests
- New Equipment
### Changed
- Simple Mode now removes the text shadow from "Min Rank", "to", and "Max Rank" in the Presets tab

## [2.8.4] - 2021-01-19
### Added
- Pre-connecting to Google Fonts now, so hopefully there won't be any more error messages sometimes
### Changed
- Selling out and adding back the ko-fi donation button, sorry I'm poor
### Removed
- Dictionary is no longer loaded since I don't think I'll bother with it
  - Considering discontinuing updates for the file/removing it entirely

## [2.8.3] - 2021-01-06
### Added
- New Quest: `25-1 VH` (Akari)

## [2.8.2] - 2021-01-03
### Added
- New Character: Pecorine (New Year)

## [2.8.1] - 2020-12-31
### Added
- New Characters
  - Hiyori (Princess)
  - Muimi (New Year)

## [2.8.0] - 2020-12-21
Quest Update (2020-12-21)
### Added
- New Character: Saren (Christmas)
- New Equipment
- Chapter 41 Quests
### Changed
- Changed `README.md` to be more general about Current and Legacy Equipment data
### Fixed
- Incorrect color for `Rank 19` in Presets `Single Mode`

## [2.7.2] - 2020-12-07
### Added
- New Quest: `24-3 VH` (Suzuna)
### Changed
- Text Changes
  - Removed references to regions in "Current Equipment Data" and "Legacy Equipment Data".
    Reason is because with so many new regions for `Princess Connect Re:Dive!` coming out, it's difficult 
    to track what type of data each region uses without playing the region myself.
    - `Current Equipment Data (After 2019.08.31) (JP / TW)` -> `Current Equipment Data (After 2019.08.31)`
    - `Legacy Equipment Data (Before 2019.08.31) (KR / CN)` -> `Legacy Equipment Data (Before 2019.08.31)`

## [2.7.1] - 2020-11-30
### Added
- New Characters
  - Akino (Christmas)
  - Yukari (Christmas)

## [2.7.0] - 2020-11-21
Quest Update (2020-11-21)
### Added
- New Character: Tomo (Magical)
- New Equipment
- Chapter 40 Quests
- Rank 19 Support

## [2.6.2] - 2020-11-05
### Added
- New Quest: `24-2 VH` (Mahiru)

## [2.6.1] - 2020-10-31
### Added
- New Character: Monika (Magical)

## [2.6.0] - 2020-10-15
Quest Update (2020-10-15)
### Added
- New Character: Rei (Halloween)
- New Equipment
- Chapter 39 Quests

## [2.5.2] - 2020-10-07
### Notice
- ***REGARDING THE CHINA SERVER'S NEW EXCLUSIVE CHARACTER: 环亲***
  - The China server has announced a new character named Kanna (`环亲`).
  - `priconne-quest-helper` uses the **Japan** version of the game's data, so **unless Kanna (`环亲`) is added to the Japan server's data as well, she will NOT be supported by `priconne-quest-helper`**.
  - *This includes all other server exclusive characters that may be added in the future*. **Only characters that exist in the Japan version will be supported.**
### Added
- New Quest: `24-1 VH` (Ninon)

## [2.5.1] - 2020-09-30
### Added
- New Characters
  - Tsumugi (Halloween)
  - Matsuri (Halloween)

## [2.5.0] - 2020-09-19
Quest Update (2020-09-19)
### Added
- New Equipment
- Chapter 38 Quests
- New Character: Yori (Angel)

## [2.4.3] - 2020-09-06
### Added
- New Quests
  - `23-2 VH` (Saren)
  - `23-3 VH` (Akino)

## [2.4.2] - 2020-09-03
### Added
- New Character: Akari (Angel)

## [2.4.1] - 2020-08-31
### Added
- New Character: Labyrista
- Updated language files
  - Added `thematic.angel`
  - Changed `character_names.labyrista` to use her English name on `ko-KR` and `zh-CN`

## [2.4.0] - 2020-08-15
Quest Update (2020-08-15)
### Notice
- ***REGARDING Cygames' IMPLEMENTATION OF IN-GAME QUEST HELPER ON JAPAN REGION***
  - As of this update, Cygames released an easier way for players to find quests through an in game feature. Eventually,
  this update will be on all versions of the game. ***If this feature proves to be useful enough so that `priconne-quest-helper` 
  is no longer needed, then I will discontinue the `priconne-quest-helper` project***.
  - If a reason to continue the `priconne-quest-helper` project exists, then I will continue updating it. However, as of right 
  now it seems that every other piece of information provided (character data, recipe data, quest data, statistics(?)) can be found 
  through other websites.
  - It seems the quest helper feature does not include finding items in subdrops, which seems to be the only advantage 
  I can think of to use `priconne-quest-helper` over the in-game quest helper. As long as they don't include any way to find specific items 
  in a quest subdrop list, then I will probably continue to update `priconne-quest-helper`.
### Added
- New Equipment
- Chapter 37 Quests
- New Character: Jun (Summer)
- Support for `Red` rarity equipment on all pages

### Changed
- Updated `spritesheet.css` and `images/webpage/spritesheets/spritesheet.png` 
- Updated language files

## [2.3.3] - 2020-08-05
### Added
- New Quest: 23-1 VH (Ayane)

## [2.3.2] - 2020-07-30
### Added
- New Characters
  - Hatsune (Summer)
  - Misato (Summer)

## [2.3.1] - 2020-07-17
### Added
- Inline inventory editor now has `+1` / `+5` / `+<craft_amount>` / `-1` / `-5` / `-<craft_amount>` buttons
  - Suggested by `koma-cute` <https://github.com/Expugn/priconne-quest-helper/issues/33>
- Start implementation of Dictionary
  - Dictionary's purpose is to provide item name translations for items with a given item ID
  - Dictionary currently isn't used for anything at the moment, but it will be loaded and updated
### Changed
- Updated some strings to include `CN` server

## [2.3.0] - 2020-07-14
Quest Update (2020-06-17)
### Added
- New Character: Nanaka (Summer)
- Chapter 36 Quests
- New Equipment
### Fixed
- Fixed a bug where in `pages/statistics`, changing the toggled rarities would not update the other display
### Removed
- ko-fi Support Stuff
  - Dunno, kinda hated asking for donations anyways

## [2.2.2] - 2020-07-03
### Added
- New Character: Ruka (Summer)
### Changed
- Cygames modified `22-3 VH` subdrops:
  - **OLD**
    - `Queen Bee Spear Fragment`
    - `Angel Bow Fragment`
    - `Hermit Clothes Fragment`
    - `Saint's Robe Fragment`
    - `Bangle of Substitution Fragment`
  - **NEW**
    - `Rod of Life Fragment`
    - `Rod of Sun Fragment`
    - `Angel Boots Fragment`
    - `Pope's Hood Fragment`
    - `Mourning Crescent Moon Fragment`

## [2.2.1] - 2020-06-29
### Added
- New Characters
  - Anna (Summer)
  - Yui (Princess)
- New Quest: 22-3 VH (Shizuru)

## [2.2.0] - 2020-06-17
Quest Update (2020-06-17)
### Added
- Chapter 35 Quests
- New Equipment
- New Character: Inori
### Changed
- Changed "`Miyako is coming to fetch your pudding`" to "`Miyako is coming for your pudding`" because the "fetch" sounds kinda weird

## [2.1.4] - 2020-06-10
### Added
- Input option for inventory inline editor
  - Suggested by `Akenaide`: <https://github.com/Expugn/priconne-quest-helper/issues/31>
  - Clicking on the current inventory amount on the inventory inline editor will now reveal an input and a OK button
  - Changing the value of the input and selecting OK will adjust your inventory to be that value
  - Pressing the ENTER key while the input is selected will be as if you pressed the OK button

## [2.1.3] - 2020-06-03
### Added
- New Character: Rino (Wonder)

## [2.1.2] - 2020-05-30
### Added
- New Characters
  - Ayumi (Wonder)
  - Kokkoro (Princess)
- New Quest: 22-2 VH (Mifuyu)
- Updated Language Files
  - `thematics.wonder`

## [2.1.1] - 2020-05-29
### Added
- Chinese (Simplified) Translation (Thank you URARUA and BronyDee!)
### Changed
- Switched to using Cloudflare CDN instead of Google's CDN for jQuery
- Changed initializing message

## [2.1.0] - 2020-05-15
Quest Update (2020-05-15)
### Added
- New Character: Mahiru (Ranger)
- Chapter 34 Quests
- New Equipment
### Changed
- If an inventory inline editor is active and the inventory modal is requested to be opened, The inline editor will close and save whatever changes were made

## [2.0.1] - 2020-05-05
### Changed
- Modified Inventory Inline Editor CSS
### Removed
- Removed `index.html` templates in favor of writing them from scratch in code
### Fixed
- All these fixed issues were tested on `Firefox 76.0 (64-bit)`, Chrome/Chromium based browsers did not have these issues (Thank you `Mars Club` for the report!)
  - Fixed an issue where updating the inventory via Item Tables would not work
  - Fixed an issue where attempting to remove an item via `Inventory Remove Mode` would not work
  - Fixed an issue where attempting to change an item's quantity via `Inventory List Mode` would not work

## [2.0.0] - 2020-04-29
Code Rewrite
### Added
- New Font Design
  - Now using Google's `Noto` font line to keep things consistent
    - `Noto Sans`, `Noto Sans JP`, `Noto Sans KR`
- Inventory Quality of Life Additions
  - You can now press `ENTER` to confirm your changes in `Inventory List Mode` rather than having to click away
  - You can now press `ENTER` to confirm the amount while adding an item from the `Inventory Catalog` rather than having to press `Add Item`
- `css/data.css`, `webpage/spritesheets/items`, `webpage/spritesheets/units`
  - Added these files to lower the amount of resources and requests needed to load the webpage
  - `css/data.css` contains all information about positioning for the `webpage/spritesheets/items` and `webpage/spritesheets/units` spritesheets
- Merged all static webpage icons into `webpage/spritesheets/spritesheet`
- `pages/character-data` Rework
  - Opening the page now starts you off with a grid of characters
  - Selecting a character from the grid will show you the equipment a character needs to rank up like before
- `pages/recipe-data` Rework
  - When using `pages/recipe-data`, you now start with a grid of all items
  - Clicking on one of the items in the grid will show you the current and legacy (if available) recipes in a tree display with the total required ingredients below that tree
  - Clicking on an item also shows you the characters and the ranks that they use that item
  - Clicking on an item also shows you the "parent" items that use the current viewing item as an ingredient
- A lot of comments to code
- Updated Language Files
  - `en.json`
    - `thematics.ranger`
  - `ja.json`
    - `thematics.ranger`
  - `ko.json`
    - `thematics.ranger`
- New Character: Rin (Ranger)
- New Quest: 22-1 VH (Tamaki)
### Changed
- Webpage Optimizations
  - Reworked code to lower the requests and resources needed for the initial page load
  - Webpage loading statistics using `webp` and `MIYAKO` default background
    - **BEFORE** (v1.0): `505` Requests ; `9.0MB` Resources
    - **AFTER**  (v2.0): `43`  Requests ; `3.1MB` Resources
- Setting the item quantity in `Inventory List Mode` to `0` no longer instantly deletes the item
  - Adding a new item from the `Inventory Catalog`, switching to `Inventory Remove Mode`, or closing and opening the `Inventory Modal` will remove all items with quantity `0`
- `Select Saved Project` is now spaced a bit away from the `Load`/`Add`/`Subtract`/`Prioritize` project buttons
- Compressed all scripts into two scripts: `scripts/priconne-quest-helper.js` and `scripts/priconne-data.js`
  - `scripts/priconne-quest-helper.js` now manages all main webpage functionality
  - `scripts/priconne-data.js` now manages all equipment/character/quest data reading or other related functions
  - Any other script that a different page uses (`pages/recipe-data`, `pages/character-data`, etc) will be in their `index.html`
- Hyperlink Changes
  - `kofi`'s hyperlink now takes `GitHub`'s hyperlink location
  - `GitHub` hyperlink moved to the bottom of the page
- `jQuery` is now retrieved from Google's CDN so a new copy of `jQuery` won't have to be downloaded every 10 minutes due to GitHub Pages' low cache life
- `toastr` is now retrieved from Cloudflare's CDN so a new copy of `toastr` won't have to be downloaded every 10 minutes due to GitHub Pages' low cache life
- Merged `css/webpage-mobile.css` and `css/webpage.i18n.css` contents into `css/webpage.css`
- "Mobile Formatting" is now available for Desktop users if the browser window width is small enough
- Corrected most issues in `index.html`
- Updated/Optimized `pages/quest-data`
  - Mobile friendly CSS added
  - Reduce requests and download size needed during startup
    - **BEFORE**: `348` Requests ; `7.3MB` Resources
    - **AFTER** : `18`  Requests ; `1.4MB` Resources
- Updated/Optimized `pages/character-data`
  - Mobile friendly CSS added
  - Reduce requests and download size needed during startup
    - **BEFORE**: `526` Requests ; `9.6MB` Resources
    - **AFTER** : `18`  Requests ; `1.3MB` Resources
- Updated/Optimized `pages/recipe-data`
  - Mobile friendly CSS added
  - Reduce requests and download size needed during startup
    - **BEFORE**: `543` Requests ; `8.0MB` Resources
    - **AFTER** : `23`  Requests ; `1.9MB` Resources
- Updated/Optimized `pages/statistics`
  - Increased items per row from `12` to `22`
  - Mobile friendly CSS added
  - Reduce requests and download size needed during startup
    - **BEFORE**: `557` Requests ; `10.5MB` Resources (WITH VERSION HISTORY)
    - **AFTER** : `28`  Requests ; `3.6MB` Resources  (WITH VERSION HISTORY)
    - **AFTER** : `22`  Requests ; `1.5MB` Resources  (NO VERSION HISTORY)
- Removed the error checking in `pages/export-data` and `pages/import-data` to reduce amount of potential errors when changes to settings have been made
### Removed
- `css/font/`
  - Removing all fonts in this folder due to their required download size and possible licensing issues
- Removed the labels from `Save`/`Delete`/`Reset`/`Read Saved` settings buttons due to it being kind of redundant
- `scripts/console.js`
- `css/webpage-mobile.css`
- `css/webpage.i18n.css`
- `webpage/spritesheets/navigation_buttons`
- `webpage/spritesheets/hyperlink_buttons`
- Unused images and other unused files
- Unused translation text from language files
### Fixed
- Fixed an issue with `Inventory List Mode` where setting an item's quantity to `0` and then clicking on another item will cause some issues
- Fixed an issue where `Settings` could not properly restore `Show Very Hard Quests`
- Fixed an issue where you could not use Data Exporting if you had the `Show Very Hard Quests` setting saved
- Fixed an issue where you could change the rank in Preset Single Mode when you aren't supposed to
- Inline inventory editor will now open even if you click on the item amount/drop percent

## [1.9.0] - 2020-04-15
Quest Update (2020-04-15)
### Added
- New Character: Chieru
- Chapter 33 Quests
- New Equipment

## [1.8.11] - 2020-04-05
### Added
- `Disable Title Background Hover`
  - Enabling this option will disable the title background expansion if you mouse over the title background
  - Located under `Title Background` in the `Other` tab
- Updated Language Files
  - `en.json`
    - `other_tab.disable_title_background_hover`
  - `ja.json`
    - `other_tab.disable_title_background_hover` **(NOT TRANSLATED)**
  - `ko.json`
    - `other_tab.disable_title_background_hover` **(NOT TRANSLATED)**
- Re-added and updated/modified `a-casual`'s inventory inline editor
  - Click an item image in `Recommended Quests` to use
  - **UPDATED:**
    - Inline editor now works with new quest display format
    - If inline editor is active, then `Inventory` button is disabled to avoid conflicting changes
  - **MODIFIED:**
    - Inventory amount display is now above the add/sub buttons instead of displayed top-left
      - The number shown below above the item image is the required ingredient amount
      - Similar to the previous version, drop rate cannot be seen while the editor is active for that item
    - `Required Ingredients`, `Recommended Quests`, etc are only updated if there is a change in inventory amount compared to when it was opened
    - Removed usage of deprecated CSS classes
    - Max amount that can be added via inline editor changed to `9999`
    - Inventory amounts set to `0` are deleted from inventory
- Added `.webp` versions of `ko-fi banner`, `priconne-shiritori_icon`, `miyako` so they aren't locked to strictly `.png`
### Changed
- Adjusted loading screen
  - Miyako and "`loading priconne-quest-helper...`" text now move together instead of separately
  - Tweaked CSS so Miyako and other text displayed should look better in all resolutions
  - "`loading priconne-quest-helper...`" now locked down to be `Trebuchet MS`
- Changed format in which information related to `Title Background` is saved in `LocalStorage`
  - Older data is converted into this new format
  - Removed usage of `custom_background_url` in `LocalStorage`
- `Recommended Quests` item amounts no longer subtract from inventory
### Fixed
- The text decoration for the `ko-fi` hyperlink is now actually hidden (no more blue underline)

## [1.8.10] - 2020-04-02
### Added
- New fancy loading screen
  - When using `Fancy Mode`, this loading screen replaces the "loading" toast
  - Miyako will run or die depending on site load status
### Changed
- Friendship ended with Hatsune, now Miyako is my best friend
  - <img src="https://raw.githubusercontent.com/wiki/Expugn/priconne-quest-helper/images/readme/meme_1.png" alt="" width="300">
  - Miyako now takes the role of site mascot since Hatsune art wasn't used much compared to Miyako's usage
- Attempting to reduce the amount of DOM elements used to increase site speed
  - Removed `<hr>` usage on main page ; categories are now divided by margins
  - Unused DOM elements are now deleted if no longer needed
- `Javascript Not Enabled` modified to include Miyako from the loading screen
- The webpage will lock you out if the following cannot be done:
  - Complete setup within `180` attempts (about `3` minutes)
  - `data/character_data.json` failed to load
  - `data/equipment_data.json` failed to load
  - `data/quest_data.json` failed to load
  - **NO IDEA HOW THIS WILL EFFECT PEOPLE AWAY FROM GITHUB'S SERVERS WHO HAVE SLOW LOAD SPEEDS ; REPORT YOUR ISSUES TO ME IF YOU HAVE PROBLEMS**
- Due to the removal of `<hr>`, `Simple Mode` categories now have a dark tint for a background if needed
- Title Background Default: `FRIENDSHIP CLUB` -> `MIYAKO`
  - To celebrate Miyako's promotion to mascot
### Removed
- Removed some script files and moved their contents to wherever needs them
- Removed update progress screen since it's no longer used

## [1.8.9] - 2020-04-01
Save Data Purge #3: `524` / `720` Files Deleted
### Added
- Inventory can now be exported or imported via `Export Data`/`Import Data` functions
### Removed
- Revert `Revue Starlight: Re LIVE` Stuff (April Fools')
  - Title Backgrounds can be changed again
  - Title is no longer `Revue Starlight: Re LIVE - Quest Helper`
  - Webpage Title is no longer `Revue Starlight: Re LIVE - Quest Helper | sutarira-quest-helper`
  - Webpage Icon changed back to `Hatsune` from `Ichie Otonashi`
  - `Ichie Otonashi` Title Background Image URL for `CUSTOM`: <br>
        **PNG:** `https://raw.githubusercontent.com/Expugn/priconne-quest-helper/93d9d84e80e2345d9c6c969568ae1a6e93fa7bc4/images/webpage/backgrounds/Ichie_Otonashi.png`<br>
        **WEBP:** `https://raw.githubusercontent.com/Expugn/priconne-quest-helper/93d9d84e80e2345d9c6c969568ae1a6e93fa7bc4/images/webpage_webp/backgrounds/Ichie_Otonashi.webp`
## Fixed
- Export Data would not work because of "Error Found in Settings Data"
- Removed text decoration near ko-fi donation hyperlink because it showed a tiny blue line still
- Fixed an issue where `Auto Max Quest Chapter` would not reset

## [1.8.8] - 2020-03-31
### Added
- New Character: Yuni
- New Quest: 21-3 VH (Hatsune)
- New Setting
  - `Auto Max Quest Chapter`
    - When enabled, the highest quest chapter will automatically be used and the value set in `Highest Quest Chapter Displayed` is ignored
    - Useful for setting and forgetting so that when there's a new quest update you do not need to save any new settings
    - `Highest Quest Chapter Displayed` cannot be modified if `Auto Max Quest Chapter` is enabled
    - `Auto Max Quest Chapter` can be enabled by checking the checkbox next to the "`Max`" next to `Highest Quest Chapter Displayed`
- `css/spritesheet.css`
  - Using "sprite-sheets" to reduce the amount of images needed to be downloaded
  - Currently, the `Navigation Bar Button`s (5 images) and `Hyperlink Button`s (9 images) use sprite-sheets for their images
  - Moved individual files that make up sprite-sheets to `images/webpage/spritesheets/assets/<spritesheet_name>/`
- Updated Language Files
  - `en.json`
    - `settings_tab.max`
    - `inventory`
  - `ja.json`
    - `system.required_ingredients_title`
    - `system.recommended_quest_title`
    - `items_tab.requested_items_title`
    - `settings_tab.max`
    - `other_tab.quest_data`
    - `other_tab.character_data`
    - `other_tab.simple_mode`
    - `other_tab.fancy_mode`
    - `other_tab.help`
    - `inventory`
  - `ko.json`
    - `settings_tab.max`
    - `inventory`
- Made a ko-fi page to sell myself out. I greatly appreciate any support given!<br>
    [![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/E1E21KEV4)
- New/Reworked Feature: Inventory
  - The long awaited and requested feature, lol.
  - **I consider the Inventory feature to be BETA ; More features may be added in the future.**
  - Inventory can be accessed via the `Crate` image near `Required Ingredients`
  - There are 4 inventory modes: `List` / `Add` / `Remove`
    - Inventory Mode: `List`
      - Displays all items in your inventory
      - Clicking on an item will show an input where you can change the amount of that item you have (max `9999`)
      - Setting an item's amount to `0` or lower will delete it from your inventory
    - Inventory Mode: `Add`
      - Displays all available items depending on your current loaded equipment data
      - Clicking on an image will open a prompt if possible you can choose between adding individual `Fragment` pieces, or whole `Equipment`
      - If choosing to add whole `Equipment`, you can see how much `Fragment` pieces as well as other components will be added
      - Inputting a number and clicking `Add Item` will add your selection to your inventory
      - Note that max inventory amount is 9999, so going over that limit will put you back down to 9999
    - Inventory Mode: `Remove`
      - Clicking on an item while under this mode will delete it from your inventory
      - The `Delete All` Button will become visible while `Inventory Mode`: `Remove` is active
      - CLICKING THE DELETE ALL BUTTON WILL DELETE EVERYTHING IN YOUR INVENTORY ; THERE IS NO PROMPT TO CONFIRM YOUR DECISION
  - Inventory Benefits
    - `Required Ingredients` that you have enough of in your inventory will automatically be disabled
      - Items you have enough of will be indicated by the item being grayscale + transparent with a crate image on the top left of the image
    - `Recommended Quests` will not show items you have enough of in your inventory
    - Using the `Complete Project` button in the `Projects` tab will automatically remove items from your inventory
  - NOTE: AS OF THIS WRITING, `Inventory` CANNOT BE EXPORTED/IMPORTED VIA `Data Export`/`Data Import`
## Changed
- Title Background Default: `IDOLMASTER` -> `FRIENDSHIP_CLUB`
- CSS Tweaks
  - Swapped `opacity:0` to `visibility:hidden` for disabled memory piece drop rates so text cannot be highlighted
  - Adjust quest background coloring for compact sizes to match the current `odd quest` colors
  - Moved memory piece images down on mobile devices to align better with the quest title
  - Increase margin between `Princess Connect! Re:Dive` and `Quest Helper` for `Korean` language on desktop/mobile
  - Remove positioning CSS in `language/ja.json` in favor of putting the css `css/webpage.i18n.css`
  - Move `rarity button`s and `item table category title`s down a bit for `Korean` language
  - Removed `outline` for preset single mode item buttons
  - Reduce main title (`Princess Connect! Re:Dive`) size for `EN`/`JA` on mobile
  - Increase main title (`프린세스 커넥트! Re:Dive`) and reduce sub title (`퀘스트 도우미`) size for `KO` on mobile
  - Optimized css for backgrounds
- Code Optimizations
  - `recipeArray` in `update-requested.js::build_data()` was storing empty recipes (given if the item rarity was ignored); this is no longer the case
## Fixed
- Fixed a bug where `Rei (New Year)`, `Hiyori (New Year)`, and `Yui (New Year)` could not be selected in presets when using the `Korean` language and `Legacy` equipment data
  - Issue Tracker Report (Reported by `lyjjrs`): <https://github.com/Expugn/priconne-quest-helper/issues/24>
- Fixed a css error where some `.webp` backgrounds weren't actually `.webp`
- Fixed a minor issue where `odd`/`even` quests (used in coloring quest backgrounds) weren't actually `odd`/`even`

## [1.8.7] - 2020-03-28
### Changed
- `Recommended Quests` Redesign
  - `Recommended Quests` updated to look better on desktop and mobile
  - Removed usage of `<table>`
  - Depending on screen width, changes look to fit the window better
  - Hovering your mouse over a disabled item (`low-opacity grayscale`) will increase the opacity so that you can see what item it is
- Margin for `Requested Items` and `Required Ingredients` changed to `1%` from `0` on mobile devices
- Design for items that are in quests but are not needed changed to `grayscale + low-opacity` from `grayscale`
- Removed outline for `Required Ingredients` buttons
### Removed
- Removed some unused stuff

## [1.8.6] - 2020-03-24
### Added
- No JavaScript Warnings
  - Page content is hidden and a warning is displayed if JavaScript is disabled
  - Effected Pages
    - `/priconne-quest-helper/`
    - `/priconne-quest-helper/pages/character-data/`
    - `/priconne-quest-helper/pages/export-data/`
    - `/priconne-quest-helper/pages/import-data/`
    - `/priconne-quest-helper/pages/quest-data/`
    - `/priconne-quest-helper/pages/recipe-data/`
    - `/priconne-quest-helper/pages/statistics/`
### Changed
- Rank Label for Preset Single Mode becomes grayscale when it's disabled
- Removed plus images in Preset Single Mode when `[Character...]` is selected
- Removed margins for mobile devices in `Requested Items` and `Required Ingredients`
  - The new change only allowed for max `6` items per row when previously you would have `7`
  - Removing margins allows for mobile devices to have `7` items again
- Reduced margins for Desktop/Tablet users in `Requested Items` and `Required Ingredients` from `10%` to `5%`
- Adjusted CSS for `Required Ingredients` on mobile devices
  - Item image width/height `12vw` -> `44px`
  - Item amount font size `4.4vw` -> `14px`
  - Doing this to make sure there is no weird display problem depending on your mobile device's width
- Item Table Code Revision
  - Item tables now generate similarly to how `Requested Items` and `Required Ingredients` are displayed
  - Cleaned up a lot of inefficient/no longer relevant code
### Removed
- Deprecated Setting: `item_amount_per_row`
  - Deprecated due to the item table code revision
- Updated Language Files
  - `en.json`
    - `settings_tab.items_displayed_per_row`
  - `ja.json`
    - `settings_tab.items_displayed_per_row`
  - `ko.json`
    - `settings_tab.items_displayed_per_row`

## [1.8.5] - 2020-03-23
### Added
- Preset Single Mode: Rank Select Dropdown
  - Clicking on the `Rank #` text will now open a select element where the user can choose a specific rank to jump to
### Changed
- Font tweaks
- Placeholder images (empty items) in Preset single mode no longer have the `+` image visible
- Quest Score related code cleanup
  - There is no longer a specific score for `subdrop17` and `subdrop15`
  - Subdrops with `17%` drop rate are now `SUBDROP_SCORE / 2` (previously `0.45`)
  - Subdrops with `15%` drop rate are now `SUBDROP_SCORE / 3` (previously `0.40`)
  - For reference, `SUBDROP_SCORE == 0.50` as of this writing
  - Due to this change, some quests may be scored lower than usual
- Revised `Required Ingredients` display
  - Removed `<table>` usage, replaced with `<div>` so the items will now adjust with your browser width (less white-space!)
  - Adjusted CSS for both desktop and mobile so that they should look better on both and item amounts should be positioned correctly
- Revised `Requested Items` display
  - Removed `<table>` usage, replaced with `<div>` so the items will now adjust with your browser width (less white-space!)
  - Adjusted CSS for desktop

## [1.8.4] - 2020-03-22
### Added
- Bulk and Single Preset Mode
  - Suggested by `UgroPnz#4246`
  - Presets as they were before are now referred to as "Bulk Mode"
  - Clicking the `Bulk Mode` button will switch presets to be `Single Mode`
  - `Single Mode` displays the `6` items a character needs to rank up
  - Clicking on an item will add `1` of that item to your requested items
  - Ranks can be increased or decreased by using the `Rank »` or `« Rank` buttons
- Updated Language Files
  - `en.json`
    - `presets_tab.bulk_mode`
  - `ja.json`
    - `presets_tab.bulk_mode`
  - `ko.json`
    - `presets_tab.bulk_mode`
### Changed
- Script improvements
  - Max character rank and max quest chapter values are no longer hard-coded
- Minor font tweaks
- Selecting a unit from the preset grid search will now auto-scroll to have the presets visible

## [1.8.3] - 2020-03-21
### Added
- New Fonts
  - Added `Arita-Dotum-Medium`
  - Added `Hiragino-Kaku-Gothic-Pro` (`W3` and `W6`)
- Version History in `pages/statistics/`
  - View the last `5` modifications to `data/character_data.json`
  - The amount of equipment added/removed is displayed
  - An option to view the amount of equipment fragments added/removed is available as well
  - A hyperlink to go to the commit for more information on what changed is provided below the list
- Added Character Preset Grid Search
  - Suggested by `UgroPnz#4246`
  - Clicking the lens button next to the unit list in the presets tab will open a grid of unit images
  - Clicking on a unit image is the same as clicking them in the list
- Updated Language Files
  - `en.json`
    - `presets_tab.cancel`
  - `ja.json`
    - `presets_tab.cancel`
  - `ko.json`
    - `presets_tab.cancel`
    - `character_names.mio`
    - `character_names.uzuki`
    - `thematics.deresute`
### Changed
- Font Changes
  - `NotoSerifKR` replaced by `Arita Dotum Medium`
  - `NotoSerifJP` replaced by `Hiragino Kaku Gothic Pro`
- Adjusted mobile site CSS
  - Moved grayscale images seen in recommended quests up `1px` to align them with non-grayscale images
- Other CSS modifications
- HTML improvements(?)
- Made some changes so that max character rank and max quest chapter are automatically updated for future updates instead of being hard-coded

## [1.8.2] - 2020-03-07
### Added
- Unit search feature for `pages/character-data`

## [1.8.1] - 2020-02-29
### Added
- Better mobile interface (WIP)
  - Created `css/webpage-mobile.css` to manage mobile interface design
  - WORK IN PROGRESS, so some areas may not look great and are subject to change
- Updated Language Files
  - `en.json`
    - `character_names.mio`
    - `character_names.uzuki`
    - `thematics.deresute`
  - `ja.json`
    - `items_tab.miscellaneous_title`
    - `character_names.mio`
    - `character_names.uzuki`
    - `thematics.deresute`
  - `ko.json`
    - `character_names.mio`
    - `character_names.uzuki`
    - `thematics.deresute`
- New Character: Mio (Deresute)
- New Character: Uzuki (Deresute)
- New Quest: Chapter 20-3 Very Hard (Yui)
- New Quest: Chapter 21-1 Very Hard (Rei)
- New Quest: Chapter 21-2 Very Hard (Hiyori)
- New Title Background
  - IDOLMASTER (NEW DEFAULT) <https://github.com/Expugn/priconne-quest-helper/blob/master/images/webpage/backgrounds/iDOLM@ASTER.png>
### Removed
- Disabled `Inventory` feature due to lack of completion/usage
  - Possibly will rework to make less confusing and bring back in the future
  - The `inventory` LocalStorage saved data will be auto deleted on page load
### Fixed
- Fixed a problem where Mio (Deresute) and Uzuki (Deresute) would not appear in character presets when using `ja` or `ko` due to them lacking a base version

## [1.8.0] - 2020-02-15
Quest Update (2020-02-15)
### Added
- Updated Language Files
  - `en.json`
    - `thematics.princess`
  - `ja.json`
    - `thematics.princess`
  - `ko.json`
    - `thematics.magical`
    - `thematics.princess`
- Chapter 32 Quest Data
- New Character: Pecorine (Princess)
- New Equipment
- New Character Data

## [1.7.1] - 2020-01-31
### Added
- New Character: Kasumi (Magical)
- New Character: Shiori (Magical)
- Updated Language Files
  - `en.json`
    - `thematics.magical`
  - `ja.json`
    - `thematics.magical`
  - `ko.json`
    - `thematics.magical`
- New Quest: Chapter 20-2 Very Hard (Maho)

## [1.7.0] - 2020-01-16
Quest Update (2020-01-16)
### Added
- New Equipment
- New Character Data
- Chapter 31 Quest Data
- Added `fragment_id` to `data/equipment_data.json` for future plans
- New Character: Kokkoro (New Year)
### Changed
- Edited `scripts/read-quest-json.js` a bit

## [1.6.5] - 2020-01-08
### Changed
- Cleaned up `css/webpage.css`
- Cleaned up `index.html`
  - Removed useless element IDs
  - Removed useless classes
- Renamed some css class names so they're easier to figure out from a glance
- Title background now expands `50px` top and bottom when hovered over instead of `100px` for just top
- Minor changes to `pages/export-data/` and `pages/import-data/` so they work with the new .css files
- Clicking the `Awesome! Take Me Back to the Main Page!` button in `pages/import-data/` no longer leaves a `?` in the URL when redirected
- Changed `pages/export-data/`'s title to `priconne-quest-helper Data Export` from `Export Data | priconne-quest-helper`
- Changed `pages/import-data/`'s title to `priconne-quest-helper Data Import` from `Import Data | priconne-quest-helper`
### Removed
- Removed `css/item_table.css` (MOVED CONTENTS TO `css/webpage.css`)
- Removed `css/item_table.i18n.css` (MOVED CONTENTS TO `css/webpage.i18n.css`)
- Removed `scripts/requested-item-table.js` (MOVED CONTENTS TO `scripts/update-requested.js`)
### Fixed
- Fixed a bug where clicking on a Memory Piece image in `Recommended Quests` would give a console error since Inventory was never intended to work with Memory Pieces.

## [1.6.4] - 2020-01-04
### Added
- .css file specifically for `pages/quest-data/`
- .css file specifically for `pages/character-data/`
- .css file specifically for `pages/recipe-data/`
- .css file specifically for `pages/statistics/`
- Compiled common CSS and placed in `css/main.css`
### Changed
- Cleaned up code and adjusted styling of `pages/quest-data/`
- Cleaned up code and adjusted styling of `pages/character-data/`
- Cleaned up code and adjusted styling of `pages/recipe-data/`
- Cleaned up code and adjusted styling of `pages/statistics/`
- Moved jquery, modernizr, and toastr assets to a `vendor` folder
### Removed
- Removed unnecessary code from `pages/quest-data/`
- Removed unnecessary code from `pages/character-data/`
- Removed unnecessary code from `pages/recipe-data/`
- Removed unnecessary code from `pages/statistics/`
- Removed `js-cookie` usage

## [1.6.3] - 2020-01-03
### Added
- Custom Title Backgrounds
  - Selecting the `CUSTOM` option in `Title Backgrounds` in the `Other` tab will allow you to input an image URL
  - The image URL you input will replace the title background
- Updated Language Files
  - `en.json`
    - `other_tab.custom_title_background_url`
  - `ja.json`
    - `other_tab.custom_title_background_url`
  - `ko.json`
    - `other_tab.custom_title_background_url`
### Changed
- Modified README.md
  - Removed Quest Points information due to it being kinda useless
  - Added "`For Developers: Updating priconne-quest-helper`"
    - Links to <https://github.com/Expugn/pqh-updater>, a Python script used to update `priconne-quest-helper`
  - Renamed "`Information/Data Credits`" to "`Other Informative Sites and Tools`"
    - These sites/tools are no longer used for updating `priconne-quest-helper`, but they're still useful resources
  - Added "`Special Thanks`" section
    - Includes people who have helped with this project (resource providing or langauge translation)
- Changed Main Page Title to include " | priconne-quest-helper" at the end

## [1.6.2] - 2020-01-02
### Changed
- Moved `Taiwan` to use the "current" equipment data in settings
- Updated README to reflect the switch of Taiwan data from "legacy" to "current"

## [1.6.1] - 2019-12-30
### Added
- New Character: Kyaru (New Year)
- New Character: Suzume (New Year)
- New Quest: Chapter 20-1 Very Hard (Yukari)
- New Title Background
  - NEW YEAR 2020 (NEW DEFAULT) <https://github.com/Expugn/priconne-quest-helper/blob/master/images/webpage/backgrounds/New_Year_2020.png>

## [1.6.0] - 2019-12-20
Quest Update (2019-12-20)
### Added
- New Character: Ilya (Christmas)
- Chapter 30 Normal / Hard Quest Data
- New Equipment
- New Title Background
  - PECORINE SANDWICH (NEW DEFAULT) <https://github.com/Expugn/priconne-quest-helper/blob/master/images/webpage/backgrounds/Pecorine_Sandwich.png>
- New Character Equipment

## [1.5.4] - 2019-11-29
### Added
- New Character: Nozomi (Christmas)
- New Character: Christina (Christmas)
- New Quest: 19-3 Very Hard (Io)
- New Title Background
  - CHRISTMAS 2019 (NEW DEFAULT) <https://github.com/Expugn/priconne-quest-helper/blob/master/images/webpage/backgrounds/Christmas_2019.png>

## [1.5.3] - 2019-11-24
### Added
- Added Inventory feature written by a-casual
  - Items in the `Recommended Quest` category can be clicked on to reveal buttons to add or remove inventory
  - Items with enough inventory to match/exceed the amount required will automatically be removed from the Recommended Quests
  - Inventory can be cleared by completing projects
  - Inventory for an item is shown via the top left number when amount required is shown
  - Inventory is saved to LocalStorage ; Won't be saved if LocalStorage is not supported
### Changed
- Items you don't need in Recommended Quests are no longer grayscale ; Switched to low-opacity

## [1.5.2] - 2019-11-19
Styling Changes
### Added
- Updated Language Files
  - `ko.json`
    - `character_names.homare`
    - `character_names.inori`
    - `character_names.kaya`
- New Font: `FOT-UDMarugo_LargePro-B`
- New Navigation Bar Design
  - Added new navigation bar images
  - Font change to `FOT-UDMarugo_LargePro-B`
  - Language switch select has a darker color compared to the other items
- Character presets list is now alphabetically sorted depending on the language you're using
- Projects are now alphabetically sorted upon save
  - Based off alexanderabramov's suggestion
  - Based off a-casual's implementation
    - Commit: <https://github.com/a-casual/priconne-quest-helper/commit/6bd4a8a36e142fc728c65293c0d53f3eaaaf12ce>
  - Figured a lot of people want their projects sorted so why not, I guess
- Changed webpage icon <https://github.com/Expugn/priconne-quest-helper/blob/master/images/webpage/backgrounds/icon.png>
  - Affects the following pages:
    - `/priconne-quest-helper/`
    - `/priconne-quest-helper/pages/character-data/`
    - `/priconne-quest-helper/pages/quest-data/`
    - `/priconne-quest-helper/pages/recipe-data/`
    - `/priconne-quest-helper/pages/statistics/`
- Added Hyperlink to `priconne-shiritori`, despite it's current irrelevancy
### Changed
- Main title font change to `FOT-UDMarugo_LargePro-B` ; Sub-title remains `Trebuchet MS`
- Adjusted the rarity buttons in the `Items` tab so that they no longer overflow on a language that's not English
- Rarity buttons, `Requested Items`, `Required Ingredients`, `Recommended Quests` font change to `FOT-UDMarugo_LargePro-B`
- Adjusted Drop Shadowing for a lot of text to make it look more pleasing
- Character Name and Translation in `Presets` tab font change to `FOT-UDMarugo_LargePro-B`
- Adjusted spacing for a lot of elements
- Removed font sizing from `ja.json` for the navigation titles because it is no longer an issue with the new Navigation Bar
- Item Name in `pages/recipe-data/` font change to `FOT-UDMarugo_LargePro-B`
- Quest Titles font change to `FOT-UDMarugo_LargePro-B`
- All text in `pages/character-data/` font change to `FOT-UDMarugo_LargePro-B`
- Preset Projects are now saved as `Character_Name (Thematic) [Rank_Low - Rank_High]`
  - On second thought, ended up accepting alexanderabramov's suggestion.
    - Based off alexanderabramov's suggestion.
      - Comment: <https://github.com/Expugn/priconne-quest-helper/issues/14#issuecomment-521947391>
    - Based off a-casual's implementation
      - Commit: <https://github.com/a-casual/priconne-quest-helper/commit/9347a90db9d11e6e5e1903103a4c82afbee551c0>
  - Code Improvements (?)
- Hyperlink changed from raw `CHANGELOG.md` page to GitHub blob page for Other-Changelog button
- Change HTML lang attribute too when change the language
- index.html Cleanup
- Changed repository/project description
  - `Quest Choosing Assistance for 'Princess Connect Re:Dive!'` (BEFORE)
  - `Quest Choosing Assistance and Project Management for 'Princess Connect Re:Dive!' （プリンセスコネクト! Re:Dive）` (AFTER)
  - Effected Pages
    - `/priconne-quest-helper/`
    - `/priconne-quest-helper/pages/character-data/`
    - `/priconne-quest-helper/pages/quest-data/`
    - `/priconne-quest-helper/pages/recipe-data/`
    - `/priconne-quest-helper/pages/statistics/`
### Fixed
- You can no longer see bits of drop shadow from the item tables when running `Simple Mode`


## [1.5.1] - 2019-11-17
New Automatically Generated File Format
### Added
- `equipment_data.json`, `character_data.json`, and `quest_data.json` are now automatically generated
  - Updating is now hopefully faster and will have less errors
- Japanese item names are now included in `pages/recipe-data/` (CURRENT DATA ONLY)
### Changed
- All Data Files
  - Now spaced for easier reading
- `quest_data.json`
  - Quest name is now included in quest data
- `equipment_data.json`
  - Key is now the full equipment's id
  - Japanese name is now included
- `character_data.json`
  - Unit ID is now included
- Replaced `()` with `（）` in `pages/character-data/`
- Replaced `()` with `（）` for JP thematics only in character presets

### Fixed
- Errors from the manually updated `character_data`:
  - `Akari (Rank 3)`: "Clothes of Wisdom" -> "Jewel of Wisdom"
  - `Akino (Rank 2)`: "Crescent Sword" -> "Gear Blade"
  - `Akino (Rank 6)`: "Scarlet Diamond" -> "Garnet Shield"
  - `Akino (Rank 6)`: "Feather Blade" -> "Lion Eagle's Feather"
  - `Anna (Rank 1)`: "Protective Pendant" -> "Fighting Bracelet"
  - `Anna (Rank 2)`: "Protective Pendant" -> "Fighting Bracelet"
  - `Aoi (Rank 6)`: "Fencer Boots" -> "Cosmos Cloth"
  - `Arisa (Rank 6)`: "Angel Bow" -> "Cupid's Bow"
  - `Hiyori (Rank 6)`: "Millefeuille Cloth" -> "Cosmos Cloth"
  - `Ilya (Rank 1)`: "Protective Pendant" -> "Fighting Bracelet"
  - `Ilya (Rank 2)`: "Protective Pendant" -> "Fighting Bracelet"
  - `Kokkoro (Summer) (Rank 1)`: "Motivational Bracelet" -> "Protective Pendant"
  - `Kokkoro (Summer) (Rank 2)`: "Motivational Bracelet" -> "Protective Pendant"
  - `Kurumi (Rank 2)`: "Motivational Bracelet" -> "Protective Pendant"
  - `Kurumi (Rank 7)`: "Invisible Dress" -> "Angel Armor"
  - `Kurumi (Rank 7)`: "Lion Eagle's Feather" -> "Octogram Pendant"
  - `Kurumi (Rank 10)`: "Crusader Plate" -> "Violet Armor"
  - `Mahiru (Rank 5)`: "Battling Dress" -> "Palace Cloth"
  - `Maho (Rank 10)`: "Guardian Shield" -> "Necromancer Boots"
  - `Maho (Rank 10)`: "Sun Amulet" -> "Dragon's Tear"
  - `Matsuri (Rank 1)`: "Steel Spear" -> "Killer Pencil"
  - `Mimi (Rank 2)`: "Crescent Sword" -> "Gear Blade"
  - `Mimi (Rank 3)`: "High-Metal Axe" -> "High Metal Plate"
  - `Misaki (Halloween) (Rank 10)`: "Mourning Crescent Moon" -> "Moon Bracelet"
  - `Monika (Rank 12)`: "Dawn's Holy Sword" -> "Lava Edge"
  - `Ninon (Oedo) (Rank 3)`: "Gear Blade" -> "Crescent Sword"
  - `Pecorine (Rank 8)`: "Angel Armor" -> "Lion King's Protective Charm"
  - `Suzume (Summer) (Rank 12)`: "Divine Beast's Prayer" -> "Mermaid Princess' Spirit Tear"
- Errors from the manually updated `equipment_data`:
  - `Millefeuille Cloth`: Removed "Folklore Clothes" requirement
- Errors from the manually updated `quest_data`:
  - `2-3H`: Swapped "Command Knife" and "Victory Friendship Bracelet" position
  - `3-3H`: "Metal Axe" was supposed to be "High-Metal Axe"
  - `5-2H`: "Lightning Axe F." was supposed to be "Lion's Battle Axe F."
  - `14-3H`: Fixed incorrect drop percent for item_1, item_2, item_3
  - `19-1VH`: Swapped positioning of "Konominato Sword - Aqua Ruler F." and "Divine Spear - Doom Pain F."
  - `19-2VH`: Swapped positioning of "Prosperity Veil F." and "Senka Dance Armor F."
  - Adjusted sub-drop positioning for the following quests:
    - `10-3`, `10-5`, `10-8`, `10-11`, `10-14`, `10-15`, `10-16`
    - `18-1`, `18-3`, `18-5`, `18-6`, `18-8`, `18-9`, `18-11`, `18-12`, `18-14`
    - `19-1`, `19-3`, `19-5`, `19-6`, `19-8`, `19-9`, `19-11`, `19-12`, `19-14`
    - `20-1`, `20-3`, `20-5`, `20-6`, `20-8`, `20-9`, `20-11`, `20-12`, `20-14`
    - `21-1`, `21-3`, `21-5`, `21-6`, `21-8`, `21-9`, `21-11`, `21-12`, `21-14`
- The above errors have also been corrected in:
  - `character_data_08.30.2019.json`
  - `equipment_data_08.30.2019.json`
### Removed
- Removed the following pages due to being deprecated
  - `pages/dev/file-editor`
  - `pages/dev/json-writer`

## [1.5.0] - 2019-11-15
Quest Update (2019-11-15)
### Added
- Updated Language Files
  - `en.json`
    - `character_names.homare`
    - `character_names.inori`
    - `character_names.kaya`
  - `ja.json`
    - `character_names.homare`
    - `character_names.inori`
    - `character_names.kaya`
- Added a "focused item popup" ; when there is a focused item, this popup will appear to inform the user what is currently focused
  - Clicking on the "focused item popup" will remove the focus from the item
- Added the rest(?) of the fancy console messages
- Putting `#use-png` at the end of the URL now allows you to use force the usage of `.png` files instead of `.webp` (if your browser supports `.webp`)
  - You can also activate `Simple Mode` alongside this, i.e.: `/priconne-quest-helper/#use-png#simple` or `/priconne-quest-helper/#simple#use-png`
- New Title Background Option:
  - TWILIGHT_CARAVAN (NEW DEFAULT) <https://github.com/Expugn/priconne-quest-helper/blob/master/images/webpage/backgrounds/Twilight_Caravan.png>
- New Equipment
- Normal/Hard Quest Data for Chapter 29
- Added new character equipment
- New Character: Kaya
### Changed
- In the `Statistics` page, items past #3 now have their position displayed in their tooltip
- Adjusted some console messages
### Removed
- Cleaned up some unused functions

## [1.4.3] - 2019-10-31
Save Data Purge #2: `233` / `296` Files Deleted
### Added
- Updated Language Files
  - `en.json`
    - `character_names.luna`
  - `ja.json`
    - `character_names.luna`
- New Character: Luna
- Quest Data for Chapter 19-2 Very Hard

## [1.4.2] - 2019-10-19
### Added
- Some fancy colored console messages (Work in Progress)
### Changed
- Adjusted some design issues with the LocalStorage disabled message
- Adjusted some console messages
- Blacklist can no longer be saved if there are no items blacklisted
### Fixed
- Fixed an issue where user projects were being loaded despite not existing
- Fixed an issue with `Blacklist Selected Rarities` having an issue with `misc` rarity items
- Fixed the Quest Data being outdated as reported by `attinat#0218`
  - Cygames changed 28-4 and 28-5 drops so that 28-4 would have different drops than 28-10
### Removed
- Removed some console messages from ever appearing
- Removed the `Blacklist Selected Rarities` option in the projects tab due to it being worse than the `Ignore Item Rarity in Recipe` option in the settings tab

## [1.4.1] - 2019-10-17
### Changed
- Updated equipment data due to the required amount being adjusted
  - `Fire Spear - Prominence` | `20` -> `30` Required Pieces
  - `Machine Axe - Core Breaker` | `30` -> `20` Required Pieces
  - `World Tree's Branch Wand` | `30` -> `20` Required Pieces
  - `Abyss Moon Staff - Sacrifice` | `20` -> `30` Required Pieces
  - `Ice Bow - Freezing Tear` | `20` -> `30` Required Pieces

## [1.4.0] - 2019-10-16
Quest Update (2019-10-16)
### Added
- New Equipment
- Normal/Hard Quest Data for Chapter 28
- New Title Background Option:
  - HALLOWEEN_MIYAKO_SHINOBU (NEW DEFAULT) <https://github.com/Expugn/priconne-quest-helper/blob/master/images/webpage/backgrounds/Halloween_With_Miyako_and_Shinobu.png>
- Character Data for Mimi (Halloween)
- New Character Equipment
### Changed
- A bit of code cleanup
- Made some adjustments so that swapping between a file containing a higher or lower character rank file would not have any issues
- Title Background selection is now hidden in Simple Mode since it's irrelevant there anyways
### Fixed
- Fixed some issues with dev/File-Editor
- Fixed a bug where the stats footer in the Statistics page would display the incorrect max rank

## [1.3.8] - 2019-10-06
### Changed
- Simple Mode Transition Changes: The following will no longer have a "transition effect" (which should have been the case at the start anyways)
  - Common/Copper/Silver/Gold/Purple/Misc Item Tables
  - Recommended Quests
### Fixed
- Fixed an issue reported by `attinat#0218`
  - If an item is focused and the `Items Displayed per Row` setting is modified, the item will retain focus but lose the red highlight

## [1.3.7] - 2019-09-29
### Added
- New Title Background Option:
  - HALLOWEEN_LITTLE_LYRICAL (NEW DEFAULT) <https://github.com/Expugn/priconne-quest-helper/blob/master/images/webpage/backgrounds/Halloween_With_Little_Lyrical.png>
- Character Data for Kyouka (Halloween)
- Character Data for Misogi (Halloween)
- Quest Chapter 19 Very Hard (19-1) data

## [1.3.6] - 2019-09-18
### Fixed
- Data Importing (Broke on 2019-09-16)

## [1.3.5] - 2019-09-16
Quest Update (2019-09-16)
### Added
- New Title Background Option:
  - NIGHTMARE (NEW DEFAULT) <https://github.com/Expugn/priconne-quest-helper/blob/master/images/webpage/backgrounds/Nightmare.png>
- New Equipment
- Quest Chapter 27 Normal/Hard data
- New Character Equipment
- Character Data for Chloe
### Changed
- Removed a debug message
- Fixed broken background links in Changelog
### Fixed
- Fixed an issue with Chrome users where if only HARD/VERY HARD quests were displayed, the character shard and drop rate would be out of place
  - This visual error wasn't present when a NORMAL quest was available.
  - Tested on Samsung Internet and Microsoft Edge; both browsers did not have this visual error.

## [1.3.4] - 2019-09-15
### Added
- Blank Character Data for Chloe

## [1.3.3] - 2019-09-14
Save Data Purge #1: `389` / `502` Files Deleted
### Changed
- `priconne-quest-helper` Saved Data will now be occasionally purged
  - Any URL that is a month old (2,592,000,000 milliseconds) will be deleted
  - This is a manual process, so **URLs are not deleted immediately**
  - Any expired URL will return a `404` error if it is attempted to load
  - The note that states that "any month+ old URL generated will be at risk of removal" has been restored to the export-data page

## [1.3.2] - 2019-09-03
### Added
- Character Data for Aoi (Transfer Student)

## [1.3.1] - 2019-09-02
### Added
- New Text
  - `character_names.chieru`
  - `character_names.chloe`
  - `character_names.yuni`
  - `thematics.transfer_student`
  - `other_tab.title_background_title`
- Aoi (Transfer Student) blank character data
- `README.ko.md` (README translated to Korean)
- Added the ability for users to change the title background to previous backgrounds
  - Title backgrounds may be changed via the `Title Background` select in the `Other` tab
  - If a title background is changed, it will default to that title background whenever the page loads
- New Title Background Options
  - AOI_DIARY (NEW DEFAULT) <https://github.com/Expugn/priconne-quest-helper/blob/master/images/webpage/backgrounds/Aoi_Diary.png>
  - MANARIA_FRIENDS <https://github.com/Expugn/priconne-quest-helper/blob/master/images/webpage/backgrounds/Manaria_Friends.png>
  - RE_ZERO <https://github.com/Expugn/priconne-quest-helper/blob/master/images/webpage/backgrounds/Re_Zero.png>
### Changed
- The Statistics page no longer counts characters that have their data incomplete
- The Character Data page no longer displays the equipment for characters that have their data incomplete
- `Japanese` Translation Updated:
  - `settings_tab.show_very_hard_quests`
  - `settings_tab.equipment_data_type_label`
  - `settings_tab.equipment_data_current_select`
  - `settings_tab.equipment_data_legacy_select`
  - `settings_tab.lowest_quest_score_displayed`
  - `settings_tab.highest_quest_score_displayed`
  - `other_tab.title_background_title`
- `Korean` Translation Updated:
  - `settings_tab.show_very_hard_quests`
  - `settings_tab.equipment_data_type_label`
  - `settings_tab.equipment_data_current_select`
  - `settings_tab.equipment_data_legacy_select`
  - `settings_tab.lowest_quest_score_displayed`
  - `settings_tab.highest_quest_score_displayed`
  - `other_tab.title_background_title`
  - `character_names.chieru`
  - `character_names.chloe`
  - `character_names.neneka`
  - `character_names.yuni`
  - `thematics.transfer_student`
### Fixed
- Incorrect Language File Text
  - `settings_tab.lowest_quest_score_displayed` -> `settings_tab.lowest_quest_chapter_displayed`
  - `settings_tab.highest_quest_score_displayed` -> `settings_tab.highest_quest_chapter_displayed`
### Removed
- `scripts/jquery-3.3.1.js`

## [1.3.0] - 2019-08-31
Equipment Cost Update
### Added
- Legacy equipment data support for priconne-quest-helper
  - An option to switch between current or legacy equipment data is added to settings.
  - Also the ability to default to a certain equipment data version via setting saving
- Legacy equipment data support for priconne-quest-helper/pages/equipment-data/
  - A select option to switch between current or legacy equipment is added to the top of the page.
- Legacy equipment data support for priconne-quest-helper/pages/statistics/
  - A select option to switch between current or legacy equipment is added to the top of the page.
- New Title Background: <https://github.com/Expugn/priconne-quest-helper/blob/master/images/webpage/backgrounds/Friendship_Club.png>
- New Text:
  - `settings_tab.show_very_hard_quests`
  - `settings_tab.equipment_data_type_label`
  - `settings_tab.equipment_data_current_select`
  - `settings_tab.equipment_data_legacy_select`
  - `character_names.neneka`
- Character Data for Neneka
- A new quest filter option for `Very Hard` quests
- Very Hard Quest Support
  - The Quest Data page also supports Very Hard quests
- Pecorine/Kokkoro/Kyaru Pure Shards
- Chapter 18 Very Hard Quest Data
- Previously Used Language Auto-Restore
### Changed
- As of 2019.08.31, some equipment costs have been lowered
  - Old equipment file saved as `equipment_data_08.30.2019.json`
  - Old character data has been saved as `character_data_08.30.2019.json` as well for compatibility reasons
  - `Purple` equipment:
    - `35` -> `30` Required Pieces
    - `25` -> `20` Required Pieces
  - `Gold` equipment:
    - `30` -> `25` OR `20` Required Pieces
    - `20` -> `15` OR `10` Required Pieces
  - `Silver` equipment:
    - `5` -> `3` Required Pieces
- If there are no items selected, using the `Clear Item Tables` button will no longer remove the initial page tips
- Meta tag changes for all pages
  - `og:image` width/height set to 50
  - Delete `twitter:image`
  - `twitter:card`: `summary_large_image` -> `summary`
- Made some changes so that if the current equipment data had new equipment, switching to legacy equipment wouldn't break it
  - Item tables are now re-built if equipment files change
  - If a project is saved and contains newer equipment, using the legacy equipment data will just ignore it if a loading the project is attempted
  - If the equipment data is switched while an item is being focused on, it will remove the focus
  - If a item is currently required and the current equipment data doesn't know anything about it, it will remove it from the requirements
- Code Cleanup
### Fixed
- Fixed a bug where Add/Sub/Prioritize/Deprioritize buttons were disabled after changing languages when they were supposed to be enabled
- Fixed an issue with memory pieces not being able to have `500` selected
### Removed
- Old Title Background: <https://github.com/Expugn/priconne-quest-helper/blob/master/images/webpage/backgrounds/Summer_With_Mercurius_Foundation.png>
- favicon.ico because it was too low quality

## [1.2.1] - 2019-08-29
### Changed
- Merged Pull Request from SD SkyKlouD
  - "Update Korean translations" <https://github.com/Expugn/priconne-quest-helper/pull/17>
    - Korean (`ko.json`)
      - `system.translator_name`
      - `presets_tab.load_items_and_create_project_button`
  - "Merge similar-behaving `read_(rarity)` functions" <https://github.com/Expugn/priconne-quest-helper/pull/18>
    - Nothing for the end user; cleans up some repeated code.

## [1.2.0] - 2019-08-15
Quest Update (2019-08-15)
### Added
- Character Presets: Load Items and Create Project
  - Based off alexanderabramov's suggestion and pull request.
    - Initial Suggestion Post: <https://github.com/Expugn/priconne-quest-helper/issues/14>
    - Pull Request: <https://github.com/Expugn/priconne-quest-helper/pull/15>
- Specific Item Focus
  - Based off alexanderabramov's suggestion and pull request.
    - Initial Suggestion Post: <https://github.com/Expugn/priconne-quest-helper/issues/12>
    - Pull Request: <https://github.com/Expugn/priconne-quest-helper/pull/13>
- New Text:
  - `presets_tab.load_items_and_create_project_button`
- New Title Background: <https://github.com/Expugn/priconne-quest-helper/blob/master/images/webpage/backgrounds/Summer_With_Mercurius_Foundation.png>
- Character Data for Maho (Summer)
- New r14 Equipment Data for all characters
- New Equipment
- Quest Chapter 26 Normal/Hard data
- Merged Pull Request from mino-s2000
  - "Load Items and Create Project" button to Japanese" <https://github.com/Expugn/priconne-quest-helper/pull/16>
    - Japanese (`ja.json`)
      - `presets_tab.load_items_and_create_project_button`
### Fixed
- Fixed a bug where completing a project wouldn't enable the `Complete Project` button
### Removed
- Old Title Background: <https://github.com/Expugn/priconne-quest-helper/blob/master/images/webpage/backgrounds/Summer_With_Caon.png>

## [1.1.2] - 2019-08-12
### Added
- favicon.ico
- Updated jquery from `3.3.1` to `3.4.1` ; Also now using the min/compressed version.
### Changed
- Adjusted meta tags for all pages
- Adjusted positioning for Github/Statistics/Changelog/Help (Wiki)/Simple Mode hyperlinks.
### Fixed
- Broken meta tags

## [1.1.1] - 2019-08-11
### Added
- New Page: Statistics
- Hyperlinks to Statistics page and raw copy of Changelog
### Changed
- Tweaked Changelog to put fixes under a `Fixed` category
- Deleted some unused comments
- Merged Pull Request from SD SkyKlouD
  - Update Korean & Japanese Translations <https://github.com/Expugn/priconne-quest-helper/pull/11>
    - Korean (`ko.json`)
      - `items_tab.miscellaneous_title` ("other" -> "memory piece")
      - `projects_tab.complete_project_button`
      - `other_tab.statistics`
      - `other_tab.changelog`
      - `toasts.project_completed`
    - Japanese (`ja.json`)
      - `projects_tab.complete_project_button`
      - `other_tab.statistics`
      - `other_tab.changelog`
      - `toasts.project_completed`
- Remove `viewport` meta tag on all pages to help with mobile users

## [1.1.0] - 2019-08-10
### Added
- New Feature: Project Completion
- New Text:
  - `projects_tab.complete_project_button`
  - `toasts.project_completed`
  - `other_tab.statistics`
  - `other_tab.changelog`
- Start writing a changelog
### Changed
- `Prioritize Project` and `Delete Project` buttons have been repositioned
- Changing the language no longer switches your saved project selection to "[All Projects...]"
- Prioritized items now glow red instead of having a solid red border.
### Removed
- Some unused comments/old cookie code

## [1.0.2] - 2019-07-31
### Added
- Character data for Makoto (Summer) and Kaori (Summer)
### Changed
- New Title Background: <https://github.com/Expugn/priconne-quest-helper/blob/master/images/webpage/backgrounds/Summer_With_Caon.png>
### Removed
- Old Title Background: <https://github.com/Expugn/priconne-quest-helper/blob/master/images/webpage/backgrounds/Summer_With_Gourmet_Food_Palace.png>

## [1.0.1] - 2019-07-23
### Changed
- Merged Pull Request from mino-s2000
  - Mod Japanese : <https://github.com/Expugn/priconne-quest-helper/pull/10>
    - Proofread SD SkyKlouD's translations
    - Fix an error in character data (Suzuna (Summer)'s name_jp was incorrect)
- More tab title size tweaks for ja.json
### Fixed
- Fixed an issue where if you set the amount of memory pieces to be between 401-500+ it would still be able to show up on the required ingredients category despite the intended max being 400(?).
- Fixed a minor problem where if there were no quests that could be displayed yet an item was continuously enabled/disabled, you could see the recommended quest table moving a little bit.

## [1.0.0] - 2019-07-22
"Complete" Release
### Changed
- Tweaked ja.json font sizes

## [0.9.6] - 2019-07-21
### Added
- Japanese Language Support (Thank You SD SkyKlouD!)
- Merged Pull Requests from SD SkyKlouD
  - Update Korean Translations : <https://github.com/Expugn/priconne-quest-helper/pull/8>
  - Japanese Translations : <https://github.com/Expugn/priconne-quest-helper/pull/9>

## [0.9.5] - 2019-07-18
Quest Update (2019-07-18)
### Added
- Character Data for Saren (Summer)
- r14 Equipment Data for all characters
- New Equipment
- Quest Chapter 25 Normal/Hard data
- New Setting: Quest_Display
- Added a small disclaimer on the bottom of the recipe data page stating that "translated item names may be incorrect"
- New Text: `settings_tab.display_drop_percent`
- New Text: `settings_tab.display_amount_required`
### Changed
- Fancy Mode background now uses a .png no matter what. The .webp version of the background had compression that was really noticeable
### Fixed
- Fixed an inconsistency where Japanese character names would display their name as `thematic name` instead of the new format of `name (thematic)` when using the English language

## [0.9.4] - 2019-06-30
### Added
- Character Data for Suzuna (Summer) and Io (Summer)
### Changed
- New Title Background: <https://github.com/Expugn/priconne-quest-helper/blob/master/images/webpage/backgrounds/Summer_With_Gourmet_Food_Palace.png>
- The title now goes invisible if the title background area is hovered over instead of going invisible when the cursor is over the text
### Removed
- Old Title Background: <https://github.com/Expugn/priconne-quest-helper/blob/master/images/webpage/backgrounds/Miyako.png>

## [0.9.3] - 2019-06-29
### Added
- Added blank character info for Suzuna (Summer) and Io (Summer)
### Changed
- Adjusted the `thematic_jp` to match the ones used in the priconne Twitter/preview images
- Japanese names in the character-presets tab and character-data page are now displayed as `character_name (thematic)`

## [0.9.2] - 2019-06-24
### Added
- Ingredients/Component amounts that are required are now displayed in the `Recommended Quests` category if you hover over the item.

## [0.9.1] - 2019-06-20
### Added
- Prioritized items are now highlighted red in the `Recommended Quests` Category
- Prioritized items now have their quest score multiplied by `x2.0`
### Fixed
- Fixed an issue where a priority project would persist when data importing if the data had no priority project data
- Fixed an issue where if a project was loaded prior to the priority_item_array was initialized, it would create an accidental loop and cause an error with the quest table being unable to load.
- Fixed an issue where if the deprioritize project buttonw as active when the language is changed, it would persist when the selected saved project is reset to "[All Projects...]"

## [0.9.0] - 2019-06-19
### Added
- All character data updated to have new r13 equipment
- Begin priority project implementation
- New text: `projects_tab.prioritize_project_button`
- New text: `projects_tab.deprioritize_project_button`
- Priority Project support for Data Export/Import
### Changed
- Clicking on an image in dev/JSON-Writer will now copy the item name to the clipboard
### Fixed
- Fixed an error where "Add Project Items" and "Subtract Project Items" would be enabled while "[All Projects...]" is selected if the language is changed while the Add/Subtract buttons are enabled.

## [0.8.3] - 2019-06-18
Quest Update (2019-06-18)
### Added
- New text: `other_tab.quest_update`
- Character Data for Emilia
- New Equipment
- Quest Chapter 24 Normal/Hard data

## [0.8.2] - 2019-06-09
### Fixed
- Merged Pull Request from alexanderabramov
  - Fix Maho Rank 6 : <https://github.com/Expugn/priconne-quest-helper/pull/4>
    - Maho had an incorrect equipment set in her rank 6.

## [0.8.1] - 2019-06-03
### Added
- Korean Language Support (Thank You NewWorld_ and Celesti!)
- Merged Pull Request from SD SkyKlouD
  - Update Korean Translations : <https://github.com/Expugn/priconne-quest-helper/issues/3>
### Changed
- Last Update Date is now automatically translated when the language is switched
- jquery/js.cookie/toastr are now local files
- Characters with no equip data yet planned (i.e. Emilia) will now have a placeholder image for their character data instead of a broken/missing image in the character data page

## [0.8.0] - 2019-06-02
### Added
- Multi Language Support (Just English for now!)

## [0.7.11] - 2019-06-01
### Added
- Wiki Pages <https://github.com/Expugn/priconne-quest-helper/wiki>
### Changed
- Removed text from hyperlink images and added text via formatting
- When the Generate URL button is pressed in Data Export, the projects/blacklist/settings buttons are now disabled
- "Export Options" is now hidden when the URL is created

## [0.7.10] - 2019-05-31
### Added
- Character data for Ram and Rem
- Blank Character Data for Emilia

## [0.7.9] - 2019-05-29
### Added
- New README.md banner
### Changed
- README.md edits
### Fixed
- Fixed an issue where "Item Amount per Row" would not update if "Reset Settings" was used

## [0.7.8] - 2019-05-20
### Fixed
- Fixed an formatting issue with Simple/Fancy mode hyperlinks
### Removed
- "Two Weeks" warning for data exporting/importing. System was never implemented

## [0.7.7] - 2019-05-18
Quest Update (2019-05-17)
### Added
- New Equipment
- Quest Chapter 23 Normal/Hard data
- Character/Quest/Recipe data pages are now logged on Google Analytics
- Character data for Ninon (Oedo)
- Simple Mode/Fancy Mode Hyperlinks restored
### Changed
- Minor tweaks for dev/JSON-Writer

## [0.7.6] - 2019-04-30
### Added
- Character data for Kuuka (Oedo)
- Blank Character data for Ninon (Oedo)

## [0.7.5] - 2019-04-29
### Added
- New Setting: Ignore Rarity
### Changed
- Cleaned up setting and other tabs; originally planned to change the layout but figured the simple layout was best

## [0.7.4] - 2019-04-28
### Fixed
- Fixed an error where deleting a project would allow the Add/Subtract Project item buttons to remain enable despite the selection being changed to '[All Projects...]'

## [0.7.3] - 2019-04-19
Quest Update (2019-04-19)
### Added
- New Equipment
- Quest Chapter 22 Normal/Hard
- Added blank character data for Grea
- New quest scoring due to recent sub-drop changes
- All Character Data (r12 - r13)
### Changed
- Images without an item_name now default to the Placeholder image for quests
### Fixed
- Fixed preset errors in Shizuru and Rima
- Fixed an issue with precision in quest scoring
### Removed
- Simple/Fancy Mode footer hyperlink (can still be accessed via inputting `#simple` hash)

## [0.7.2] - 2019-04-18
### Added
- .webp Support 2: Electric Boogaloo; .webp is used if the browser supports it, .png if it doesn't
### Changed
- Changed An's name back to her proper name, Anne
- Changed Ruu's name to her proper name, Lou
### Fixed
- Fixed an error in the Quest Data

## [0.7.1] - 2019-04-16
### Changed
- Anne was reverted back to An since the `[0.7.0]` commit was reverted.
### Removed
- .webp image support because some users on browsers that did not support .webp would not be able to see any image.

## [0.7.0] - 2019-04-15
### Added
- Begin .webp image support
### Changed
- Changed An's name to her proper name, Anne

## [0.6.8] - 2019-04-08
### Added
- Character Data for An and Ruu
### Changed
- Fixed an issue with Google Translating the page where it would break because the translated item image does not exist.

## [0.6.7] - 2019-03-29
### Fixed
- Fixed an issue with Quest Data

## [0.6.6] - 2019-03-28
### Fixed
- Fixed an issue with Quest Data

## [0.6.5] - 2019-03-23
### Fixed
- Fixed an issue with Quest Data

## [0.6.4] - 2019-03-20
### Added
- Begin self-translation of equipment names (May be incorrect!) due to long wait from the source I got it from.
- Ayumi Character Data (r1 - r12)
- New equipment data for currently added character presets
- Rima -> Yuki Character Data (r1 - r12) (Finally Complete!)
### Changed
- Moved equipment positioning around in equipment_data
### Removed
- "work in progress" message for character presets.

## [0.6.3] - 2019-03-19
Quest Update (2019-03-19)
### Added
- Blank character data for Ayumi
- New equipment data
- Quest Chapter 21 Normal/Hard data

## [0.6.2] - 2019-03-17
### Added
- dev/JSON-Writer supports Quest/Character data writing now
- Update-Progress checker for users
- Nanaka -> New Year Rei Character Data (r1 - r12)
### Removed
- Unused images

## [0.6.1] - 2019-03-16
### Added
- Ayane -> Muimi Character Data (r1 - r12)
- dev/JSON-Writer to help with adding character data
### Fixed
- Fixed an error in quest data

## [0.6.0] - 2019-03-15
### Added
- Character presets (incomplete character data)
- Akari -> Arisa Character Data (r1 - r12)
- Character Data page
### Changed
- Max misc. item count increased to 500 ((1->5star = 400) + (lv130 special equip = 100))
### Fixed
- Fixed character preset scrollable

## [0.5.2] - 2019-02-28
### Changed
- New webpage icon
- Update embed image
### Removed
- w3-include-html
- A bunch of .html files used with w3-include-html

## [0.5.1] - 2019-02-23
### Added
- New background image for body
- Navigation bar to hide all the categories that cluttered the page

## [0.5.0] - 2019-02-22
### Added
- Character Shards (Memory Fragments) support
### Changed
- Adjusted positioning of sub-drops in quest data

## [0.4.2] - 2019-02-21
### Added
- Created a Heroku app that does all the POST stuff for Gists
- Import/Export data feature finally works
### Changed
- Modified styling for the Export/Import pages to suit mobile users better
### Fixed
- Fixed an error in quest data

## [0.4.1] - 2019-02-20
### Added
- Reworked Import/Export data feature
  - Now a gist is created with all data instead of being all in the URL
  - Eventually hid everything again because I didn't realize GitHub Pages were incapable of POST requests
### Removed
- Playground page
- Old Import/Export data stuff that's no longer needed (i.e. Pastebin stuff)

## [0.4.0] - 2019-02-18
### Added
- Basic implementation of Import/Export Data feature (Too Many Problems!)
- Existing cookie data is deleted and imported into LocalStorage
- Playground page to test how GitHub pages works
### Changed
- LocalStorage is used to save settings
- Tips for Export/Import data added but hidden due to the large amount of problems on initial release
### Removed
- Cookies are no longer used for Settings saving

## [0.3.0] - 2019-02-16
### Added
- Project system (save/load/delete/add project items/sub project items)
- Clear Item Table function
- Blacklists (save/clear/delete)
- Blacklist selected rarities function
### Changed
- Changed temporary equipment names to their english translated version
- Begin move from Cookies to LocalStorage for data storage
- Amount of Quests Displayed now has a max of 999 (suggested by Jiuhin#7786)
- Adjusted positioning of sub-drops in quest data

## [0.2.4] - 2019-02-15
Quest Update (2019-02-15)
### Added
- Equipment data for the new items (functionality not complete)
- Quest Chapter 20 Normal/Hard Data
- Debug code in Quest Data page
### Changed
- The cursor now turns to a pointer cursor when hovering over a Required Ingredient button
- Min/Max Quest Chapters updated to 20
- If quest data is missing, it will display the Placeholder image instead
### Fixed
- Fixed error in quest data

## [0.2.3] - 2019-02-14
### Changed
- Minor bug fixes

## [0.2.2] - 2019-02-13
### Added
- Quest Data Page
- Recipe Data Page
### Changed
- The simple/fancy footer text will no longer redirect to specifically https://expugn.github.io/priconne-quest-helper/
### Removed
- Debug code that helped proof-read equipment data

## [0.2.1] - 2019-02-12
### Added
- Debug code to help proof-read equipment data
- A note that points out a bug with the Items Displayed per Row setting
### Changed
- The Loading toast now displays as soon as possible


## [0.2.0] - 2019-02-11
### Added
- Added Toasts to replace alerts
- Item tables are now created dynamically
- New Setting: Item Amount per Row
### Changed
- Sub-drop quest data positioning
- Fixed a quest data error
### Removed
- Usage of alerts
- Non-dynamic item tables that required a lot of manual editing

## [0.1.5] - 2019-02-10
### Changed
- Disabled items will be re-enabled if the amount required has changed.

## [0.1.4] - 2019-01-27
### Added
- Begin usage of Google Analytics

## [0.1.3] - 2019-01-26
### Changed
- Fixed a quest data error

## [0.1.2] - 2019-01-25
### Added
- Colored Quest Titles depending on their quest score
- New Setting: Quest Filter (All/Normal/Hard)

## [0.1.1] - 2019-01-21
### Added
- New Settings
  - Hide Quest Score
  - Min Quest Chapter/Max Quest Chapter
- Cookie System basic implementation
### Fixed
- Fixed issue with Simple/Fancy hyperlink
- Fixed issues with settings

## [0.1.0] - 2019-01-20
Initial private-release. Shared news of development in the Salivation/Re:Divine/CasualDES (JP Guild) Discord server.
### Added
- Quest Chapter 14 Normal/Hard Data
- Quest Chapter 15 Normal/Hard Data
- Quest Chapter 16 Normal/Hard Data
- Quest Chapter 17 Normal/Hard Data
- Quest Chapter 18 Normal/Hard Data
- Quest Chapter 19 Normal/Hard Data
- General/Open Graph/Twitter meta tags
- Additional footer content (Last Quest Update/GitHub Link/Simple Mode Link)
- Begin Settings
  - "Amount of Quests Shown"
  - "Sort by Ascending: Quest List"
  - "Sort by Ascending: Quest Score"
- Simple Mode
  - Backgrounds and Hovering elements disabled
### Changed
- Hard mode quests now have their `H` colored red on the Recommended Quest Table
- README.md expanded upon
### Fixed
- Fixed some quest data issues

## [0.0.4] - 2019-01-19
### Added
- Quest Chapter 6 Hard Data
- Quest Chapter 7 Normal/Hard Data
- Quest Chapter 8 Normal/Hard Data
- Quest Chapter 9 Normal/Hard Data
- Quest Chapter 10 Normal/Hard Data
- Quest Chapter 11 Normal/Hard Data
- Quest Chapter 12 Normal/Hard Data
- Quest Chapter 13 Normal/Hard Data
- Specific Required Ingredients can now be disabled by clicking the item image in Required Ingredients
- Usage tips added
- Equipment data for new Purple rarity items (released 2019-01-18)
### Changed
- Additional styling for Recommended Quests
### Fixed
- Fixed an issue with mobile users not being able to trigger the title hover
- Fixed some quest data issues

## [0.0.3] - 2019-01-18
### Added
- Equipment data for Gold rarity items
- Equipment data for Purple rarity items
- Collapsible elements are now scanned for 100 times before being considered failed to load
- Basic Recommended Quests implementation
  - Quest Scoring implementation/fine tuning
- Quest Chapter 1 Normal/Hard Data
- Quest Chapter 2 Normal/Hard Data
- Quest Chapter 3 Normal/Hard Data
- Quest Chapter 4 Normal/Hard Data
- Quest Chapter 5 Normal/Hard Data
- Quest Chapter 6 Normal Data
### Changed
- Hovering over the title area will expand the image
- Hovering over the title will turn it transparent
### Removed
- Unused equipment images
- Deprecated text-based Requested Items assets

## [0.0.2] - 2019-01-17
### Added
- Item rarity categories are now collapsible
- Equipment data for Silver rarity items
### Changed
- Requested Items category now displays items via image rather than text

## [0.0.1] - 2019-01-16
Project repository created on GitHub
### Added
- Basic functionality implementation
- Equipment data for Common rarity items
- Equipment data for Copper rarity items
- Added categories for Silver/Gold/Purple rarity items, but did not add data
- Requested Items category implementation (text based)
- Background images for rarity categories

## [0.0.0] - 2019-01-10
Project start!