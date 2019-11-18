# Changelog
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.1] - 2019-11-17
New Automatically Generated File Format
### Added
- `equipment_data.json`, `character_data.json`, and `quest_data.json` are now automatically generated
  - Updating is now hopefully faster and will have less errors
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
### Fixed
- Errors from the manually updated `character_data`:
  - `Akari (Rank 3)`: "Clothes of Wisdom" -> "Jewel of Wisdom"
  - `Akino (Rank 2)`: "Crescent Sword" -> "Gear Blade"
  - `Akari (Rank 6)`: "Scarlet Diamond" -> "Garnet Shield"
  - `Akari (Rank 6)`: "Feather Blade" -> "Lion Eagle's Feather"
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