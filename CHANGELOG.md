# Changelog
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).



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
- New Title Background: <https://github.com/Expugn/priconne-quest-helper/blob/master/images/webpage/still_unit_110531_blur.png>
### Removed
- Old Title Background: <https://github.com/Expugn/priconne-quest-helper/blob/master/images/webpage/still_500400703_blur.png>

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
- New Title Background: <https://github.com/Expugn/priconne-quest-helper/blob/master/images/webpage/still_500400703_blur.png>
- The title now goes invisible if the title background area is hovered over instead of going invisible when the cursor is over the text
### Removed
- Old Title Background: <https://github.com/Expugn/priconne-quest-helper/blob/master/images/webpage/still_108200401_blur_2.png>

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
### Changed
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

## [0.0.3] - 2019-01-19
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

## [0.0.2] - 2019-01-18
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