![README Banner](https://raw.githubusercontent.com/Expugn/priconne-quest-helper/master/images/webpage/README_Banner.png)

[🌎 English](README.md)

# 프린세스 커넥트! 리다이브 퀘스트 도우미<br>(priconne-quest-helper)

URL: <https://expugn.github.io/priconne-quest-helper/><br>
간단 모드: <https://expugn.github.io/priconne-quest-helper/#simple><br><br>
퀘스트 데이터: <https://expugn.github.io/priconne-quest-helper/pages/quest-data/><br>
장비 합성 데이터: <https://expugn.github.io/priconne-quest-helper/pages/recipe-data/><br>
캐릭터 데이터: <https://expugn.github.io/priconne-quest-helper/pages/character-data/><br>
통계: <https://expugn.github.io/priconne-quest-helper/pages/statistics/><br>
변경 사항: [/priconne-quest-helper/CHANGELOG.md](CHANGELOG.md)

마지막 퀘스트 데이터의 업데이트 일자는 [영어 README의 Last Quest Update](README.md)를 확인해주세요.

## 정보
캐릭터의 랭크 업 등에 필요한 아이템을 얻기 위해 돌아야 되는 최적의 퀘스트를 찾아주는 도우미 프로젝트입니다.

`priconne-quest-helper`는 `프린세스 커넥트! 리다이브`의 `일본 클라이언트` 데이터를 기반으로 제작되고 있습니다.

## 한국 및 대만 서버의 아이템 데이터
`2019년 8월 31일`을 기점으로 위 서버는 `일본` 서버와 장비(아이템) 비용 데이터를 공유하지 않습니다.

`한국` 서버나 `대만` 서버에서 플레이 중이시라면, `이전 장비 데이터`를 사용해주세요.
1) `설정` 탭으로 이동
2) `장비 데이터 종류`를 `이전 장비 데이터 (2019.08.31. 이전) (한국 / 대만)`로 설정
3) 설정 저장 (필수 아님)

`장비 합성 데이터`와 `통계` 페이지는 `장비 데이터 종류`에서 설정한 옵션을 따릅니다.

## 이 도우미를 사용하는 방법
1. 스마트폰이나 PC의 브라우저로 다음 URL로 접속하세요. <https://expugn.github.io/priconne-quest-helper/><br>
스마트폰에서는 회전이 세로인 상태가 최적입니다.
2. 스마트폰이나 `DMM Game Player`에서 `프린세스 커넥트! 리다이브`를 실행하세요.
3. 랭크 업 해야되는 캐릭터를 찾아 이 도우미에서 필요한 아이템을 `장비` 탭이나 `프리셋` 탭에서 입력하세요.
4. 도우미가 필요한 재료의 종류 및 개수를 표시해줍니다. 게임에서 소유 중인 아이템을 확인하세요.
5. 이미 충분하게 소유 중이여서 더 이상 얻지 않아도 되는 아이템은 도우미 화면에서 `필요한 아이템` 카테고리 내에 있는 아이템 이미지를 **클릭(탭)**하여 `비활성화`하세요.
<br>비활성화한 아이템은 `추천 퀘스트 목록` 산정에 고려되지 않습니다.
6. 퀘스트 목록(기본값으로 최대 10개)이 `추천 퀘스트 목록` 카테고리에 표시됩니다.
<br>남은 스태미나를 고려하여 최선의 퀘스트를 도세요!

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

## 버그, 오류, 기능 제안, 그 외
다음 사항은 `GitHub 이슈 트래커`나 `Discord`의 `S'pugn#2612`로 알려주세요.
1. 도우미 사용 중 발생한 버그
2. 잘못된 데이터
3. 쉬운 도우미 사용을 위한 기능 제안
4. `GameWith`나 `AppMedia`에서 아직 갱신되지 않은 새로운 데이터
5. 도우미에 관련되어 하고 싶은 말, 논리적이고 생산적인 비판, 기타 등등.

## 정보 및 데이터 크레딧

#### 퀘스트 데이터 | 드롭 확률 | 장비 합성 데이터
- `AppMedia`: [Website](https://appmedia.jp/priconne-redive)<br>
- `GameWith`: [Website](https://gamewith.jp/pricone-re/)<br>
- `Hatsune's Notes`: [Github](https://github.com/superk589/PrincessGuide)<br>
- `Prcd-Wiki`: [Github](https://github.com/PaleNeutron/Pcrd-Wiki) | [Website (New)](https://johnlyu.com/en-us/) / [Website (Old)](https://pcrdwiki.xyz/)<br>
- `rwiki`: [Website](https://rwiki.jp/priconne_redive/)<br>

#### 이미지
- `AssetStudio`: [GitHub](https://github.com/Perfare/AssetStudio)<br>
  - `DMM Game Player` 버전의 `프린세스 커넥트! 리다이브` 사용
      - 게임 폴더: `C:\Users\<NAME>\AppData\LocalLow\Cygames\PrincessConnectReDive` (Windows 10)
- `Jiuhin#7786`

#### 번역
- `한국어`: Celesti (번역) | SD SkyKlouD (번역) | NewWorld_ (검수)
- `일본어`: SD SkyKlouD (번역) | mino-s2000 (교정)


## 참고
이 프로젝트는 연습 및 게임을 즐기기 위한 목적으로 만들어진 비영리 팬메이드 프로젝트입니다.<br>
모든 데이터 및 에셋들은 각 소유자에게 귀속되어 있습니다.

**프로젝트** 시작 : 2019년 1월 10일<br>
**베타 테스트** 시작 : 2019년 1월 20일<br>
**"Complete" 릴리즈** : 2019년 7월 22일