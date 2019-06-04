![README Banner](https://raw.githubusercontent.com/Expugn/priconne-quest-helper/master/images/webpage/README_Banner.png)

# Princess Connect! Re:Dive Quest Helper<br>(priconne-quest-helper)

URL: <https://expugn.github.io/priconne-quest-helper/><br>
Simple Mode: <https://expugn.github.io/priconne-quest-helper/#simple><br><br>
Quest Data: <https://expugn.github.io/priconne-quest-helper/pages/quest-data/><br>
Recipe Data: <https://expugn.github.io/priconne-quest-helper/pages/recipe-data/><br>
Character Data: <https://expugn.github.io/priconne-quest-helper/pages/character-data/>

Last Quest Update: `May 17, 2019`

## Information
This is a tool to help you decide which is the best quest to farm to get
whatever assortment of items you need to rank up your characters.

I consider this project to be in BETA at the moment. The basic features 
are all implemented but I wouldn't consider this project at it's current
state to be the complete experience. Also many things may change and
break in this time.

This tool is based off the data from the `Japan` version of `Princess Connect! Re:Dive`<br>
`Taiwan` or `Korean` servers are not be supported if they are differ in quest drops/rates.

## Recommended Procedure On How To Use This Tool
1. Open the tool URL in your phone or PC browser: (<https://expugn.github.io/priconne-quest-helper/>)<br>
If on a mobile phone, horizontal viewing is probably best.
2. Open up `Princess Connect Re:Dive` via your phone or `DMM Game Player`.
3. Decide which characters you want to rank up and select the required equipment (via item tab or preset tab) in the tool.
4. The tool will calculate which materials and the amount you need for you; Open up your equipment box.
5. Determine which materials you need to farm more of in your box; for the materials you have enough of, **click/tap** the material image under the `Required Ingredients` category on the tool to `disable` them.
<br>Disabled materials will **NOT** be shown in the `Recommended Quests` category.
6. A list of quests (max 10 by default) will be displayed under the `Recommended Quests` category.
<br>Decide for yourself which quest is the best for you and most cost efficient for your stamina.

## Quest Points?
Quest points is what determines how quests should be sorted in the `Recommended Quests` category.

| Cause | Quest Point Awarded |
| :---: | :---: |
| `Material is in the First or Second Slot`<br><br>Materials in the first or second slot tend to have higher drop rates compared to the third item. | `1.0` |
| `Material is in the Third Slot`<br><br>Materials in the third slot tend to have a lower drop rate compared to the first and second item. | `0.75` |
| `Material is a Character Shard`<br><br>Character Shards from Hard Quests are important. | `1.0` |
| `Material is in the Third Slot but Shares the Same Drop Rate as the First and Second Item`<br><br>This is the case for earlier quests (`54%` for the first three items) or hard mode quests (`72%` for the first three items). | `1.0` |
| `Material is a Sub-Drop Item`<br><br>Sub-drop items are not displayed in the quest info in-game, but they have a lower drop rate than the first three items.<br>There are a collection of five different sub-drop items in every quest with a drop rate of `20%` each. | `0.5` |
| `Material is a Sub-Drop Item (17%)`<br><br>A sub-drop item with lower rates than normal. | `0.45` |
| `Material is a Sub-Drop Item (15%)`<br><br>A sub-drop item with even lower rates than normal. | `0.40` |

`* Quest points can be shown by toggling the option in Settings.`

## Bugs, Errors, Feature Suggestions, etc.
The following can be submitted via `GitHub's Issue Tracker` or told to me (`S'pugn#2612`) over `Discord`.
1. Bugs found while using the tool.
2. Errors found in the data.
3. Feature Suggestions on how to make using this tool more easier.
4. Providing missing data that information sources like `GameWith` or `AppMedia` failed to provide quickly.
5. Comments, Constructive Criticism, etc.

## Information/Data Credits

#### Quest Data | Drop Rates | Equipment Recipes
- `GameWith`: [Website](https://gamewith.jp/pricone-re/)<br>
- `AppMedia`: [Website](https://appmedia.jp/priconne-redive)<br>
- `Hatsune's Notes`: [Github](https://github.com/superk589/PrincessGuide)<br>
- `Prcd-Wiki (Dead Project)`: [Github](https://github.com/PaleNeutron/Pcrd-Wiki) | [Website](https://pcrdwiki.xyz/)<br>

#### Images
- `AssetStudio`: [Github](https://github.com/Perfare/AssetStudio)<br>
  - Using the `DMM Game Player` version of `Princess Connect! Re:Dive`
      - Game Folder: `C:\Users\<NAME>\AppData\LocalLow\Cygames\PrincessConnectReDive` (Windows 10)
- `Jiuhin#7786`

#### Language Translation
- `Korean`: Celesti (Translation) | NewWorld_ (Inspection) | SD SkyKlouD (Proofreading)


## Other Stuff
This is a non-profit fan project with the purpose of practice and entertainment.<br>
All characters and assets belong to their respective owners.

**Project** began on January 10, 2019.<br>
**Beta-Testing** began on January 20, 2019.