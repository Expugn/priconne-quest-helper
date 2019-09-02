![README Banner](https://raw.githubusercontent.com/Expugn/priconne-quest-helper/master/images/webpage/README_Banner_ko.png)

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
5. 이미 충분하게 소유 중이여서 더 이상 얻지 않아도 되는 아이템은 도우미 화면에서 `필요한 아이템` 카테고리 내에 있는 아이템 이미지를 **클릭(탭)** 하여 `비활성화`하세요.
<br>비활성화한 아이템은 `추천 퀘스트 목록` 산정에 고려되지 않습니다.
6. 퀘스트 목록(기본값으로 최대 10개)이 `추천 퀘스트 목록` 카테고리에 표시됩니다.
<br>남은 스태미나를 고려하여 최선의 퀘스트를 도세요!

## 퀘스트 점수란?
퀘스트 점수는 `추천 퀘스트 목록`에서 퀘스트를 정렬할 때 기준이 되는 수치입니다.

| 사유 | 부여되는 퀘스트 점수 |
| :---: | :---: |
| `재료가 첫 번째 혹은 두 번째 슬롯에 있음`<br><br>첫 번째 혹은 두 번째 슬롯에 있는 재료는 세 번째 슬롯에 있는 재료에 비해 드롭률이 보통 더 높습니다. | `1.0` |
| `재료가 세 번째 슬롯에 있음`<br><br>세 번째 슬롯에 있는 재료는 첫 번째 혹은 두 번째 슬롯에 있는 재료에 비해 드롭률이 보통 더 낮습니다. | `0.75` |
| `재료가 메모리 피스임`<br><br>어려움 퀘스트의 메모리 피스는 높은 중요도를 가집니다. | `1.0` |
| `재료가 세 번째 슬롯에 있지만 첫 번째 및 두 번째 슬롯의 재료와 드롭률을 공유함`<br><br>초기의 퀘스트(첫 세 아이템은 `54%`)나 어려움 퀘스트(첫 세 아이템은 `72%`)의 경우에 해당됩니다. | `1.0` |
| `재료가 부수적으로 드롭되는 아이템임`<br><br>부수적으로 드롭되는 아이템은 퀘스트 창에서 표시되지 않지만, 세 슬롯의 아이템보다 낮은 확률로 드롭되는 아이템을 말합니다.<br>모든 퀘스트마다 5개의 부수적으로 드롭되는 아이템이 있으며 각각 `20%`의 드롭률을 가집니다. | `0.5` |
| `재료가 부수적으로 드롭되는 아이템임 (17%)`<br><br>일반적인 부수적 드롭 아이템보다 낮은 드롭률을 가집니다. | `0.45` |
| `재료가 부수적으로 드롭되는 아이템임 (15%)`<br><br>일반적인 부수적 드롭 아이템보다 낮은 드롭률을 가집니다. | `0.40` |

`* 설정 탭에서 퀘스트 점수가 표시되도록 설정할 수 있습니다.`

## 버그, 오류, 기능 제안, 그 외
다음 사항은 `GitHub 이슈 트래커`나 `Discord`의 `S'pugn#2612`로 알려주세요.
1. 도우미 사용 중 발생한 버그
2. 잘못된 데이터
3. 쉬운 도우미 사용을 위한 기능 제안
4. `GameWith`나 `AppMedia`에서 아직 갱신되지 않은 새로운 데이터
5. 도우미에 관련되어 하고 싶은 말, 논리적이고 생산적인 비판, 기타 등등.

## 정보 및 데이터 크레딧

#### 퀘스트 데이터 | 드롭 확률 | 장비 합성 데이터
- `AppMedia`: [웹사이트](https://appmedia.jp/priconne-redive)<br>
- `GameWith`: [웹사이트](https://gamewith.jp/pricone-re/)<br>
- `Hatsune's Notes`: [GitHub](https://github.com/superk589/PrincessGuide)<br>
- `Prcd-Wiki`: [GitHub](https://github.com/PaleNeutron/Pcrd-Wiki) | [현 웹사이트](https://johnlyu.com/en-us/) / [구 웹사이트](https://pcrdwiki.xyz/)<br>
- `rwiki`: [웹사이트](https://rwiki.jp/priconne_redive/)<br>

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