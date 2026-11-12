---
name: "chixie-rusong-graph"
description: >
  《持械入宋》全景人物关系图谱、跨维度技术降维打击闭环与宋末政军势力博弈 Superpower 纲领。
  当需要构建《持械入宋》交互式知识图谱、推演北宋宣和/靖康年间五人特战小队与地方豪强、
  赵宋朝堂、名将岳飞（岳武）及金夏铁骑的多维动态博弈、或生成配套汇报演示文稿时调用。
---

# 《持械入宋》全景人物关系图谱与跨维度博弈架构纲领 (Superpower Spec)

本纲领由云端主架构师（Cloud Lead Architect）针对《持械入宋》跨维度军事历史叙事体系制定，旨在指导本地 Agent（Antigravity CLI / DeepSeek Harness）构建**高密度人物拓扑图谱、四维资源/火力状态机、以及多阶段历史阵营演化可视化系统**。

---

## 一、 顶层图谱数据模型 (Graph Ontology & Entity Schema)

在构建交互式关系图谱（Force-Directed Graph / Bipartite Faction Matrix）或 PPT 战略推演页时，所有节点（Nodes）与有向边（Edges）必须遵循以下严格的数据契约：

```typescript
export type FactionId =
  | 'modern_squad'      // 现代特战五人核心组（超维中枢）
  | 'qinghe_allies'     // 清河村与关中民间根据地盟友
  | 'song_court'        // 赵宋朝堂宗室与汴梁政治网络
  | 'song_military'     // 抗金/抗夏名将体系（岳武/岳飞等）
  | 'western_xia'       // 西夏军事集团（铁鹞子/步跋子）
  | 'jurchen_jin';      // 金国完颜氏女真铁骑

export type DimensionVector =
  | 'tactical_kinetic'  // 战术动能（现代轻武器、狙击、CQB、特种指挥）
  | 'industrial_tech'   // 军工与生产力复刻（黑火药提纯、青铜佛朗机炮、改良神臂连弩）
  | 'intel_politics'    // 情报与政治合法性（科举入仕、汴梁电台网、皇室联姻/羁绊）
  | 'medical_commerce'; // 战地医卫与财政造血（现代外科清创、防疫伤寒、高端护肤品商贸）

export interface CharacterNode {
  id: string;
  name: string;
  courtesyOrAlias?: string;
  faction: FactionId;
  roleTitle: string;
  originTag: string;
  primaryVector: DimensionVector;
  survivalStatus: 'active' | 'martyred_s6' | 'assassinated_catalyst' | 'historical_anchor';
  influenceWeight: number; // 10 - 100 (determines node radius in graph)
  coreAssets: string[];
  tacticalSummary: string;
}

export interface RelationEdge {
  source: string;
  target: string;
  relationType:
    | 'tactical_synergy'     // 现代特战战术协同闭环
    | 'industrial_supply'    // 军工/后勤/医药赋能链
    | 'life_and_death_bond'  // 生死同盟与情感羁绊
    | 'political_patronage'  // 政治背书与情报策应
    | 'blood_feud_vendetta'  // 血仇导火索（如秦荣遇害->讨伐西夏）
    | 'asymmetric_warfare';  // 冷热兵器跨代降维对抗
  phaseRange: [number, number]; // S1 - S8 剧情阶段区间
  label: string;
  asymmetricalAdvantage?: string;
}
```

---

## 二、 核心五人特战小队：内部战术与后勤自洽闭环 (The 5-Person Core Matrix)

五人小队并非孤立个体，而是一个**「指挥突击 + 远程精确狙杀 + 军工代差扩产 + 朝堂无线电情报 + 战地医疗与商业造血」**的五维自洽特种作战单元：

| 节点 ID | 姓名 | 籍贯/背景 | 核心维度 | 内部协同输入 (In-Degree) | 对外降维输出 (Out-Degree) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `lin_zhao` | **林昭** | 京籍·队长 | `tactical_kinetic` | 接收王浩川战略情报、马振邦弹药补给、谢长风远程掩护 | 统筹五人战术节奏；与岳武（岳飞）共创步炮协同新军制；背负秦红缨生死血盟 |
| `xie_changfeng` | **谢长风** | 东北籍·副队/狙击手 | `tactical_kinetic` | 依赖马振邦复装精密弹药与光学测距维护、林昭战术引导 | 800米外精确斩首金夏骑兵千户/督军，瓦解冷兵器冲锋阵型心理防线 |
| `ma_zhenbang` | **马振邦** | 海归·军械工程师 | `industrial_tech` | 依赖陈素商业利润采购铜铁硝硫、狄知县/秦荣提供工坊场地与匠户 | 维护现代步枪底火；逆向研发宋代可量产**青铜佛朗机子母炮**与**弹簧钢改良连弩** |
| `wang_haochuan` | **王浩川** | 广东籍·通信情报官 | `intel_politics` | 依赖陈素高端商贸资金打通汴梁关节、现代加密电台与小队实时通联 | 科举入仕潜伏东京汴梁；结交**昭华帝姬**获取皇室背书；提前预警靖康之变与金军动向 |
| `chen_su` | **陈素** | 湘籍·战地医官 | `medical_commerce` | 依托清河村安全区与马振邦蒸馏/玻璃器皿设备支持 | 现代外科缝合与抗生素/酒精消毒挽救秦红缨部曲及名将性命；研发护肤品垄断汴梁贵妇圈，为军工提供现金流 |

---

## 三、 四大外部势力博弈拓扑与阶段演化机 (4-Tier External Ecosystem)

图谱必须支持按 **四大叙事演进阶段（Timeline Phases）** 动态切换节点高亮与边状态：

### Phase 1: 清河村潜龙与地方立威（根据地初创期）
- **核心交互**：`[现代五人组] <---> [狄知县 / 秦红缨 / 秦荣]`
- **博弈机制**：
  - **狄知县（官方保护伞）**：小队以剿匪实绩与赋税贡献换取清河村基层治理自治权与户籍合法化。
  - **秦红缨（民军武装融合）**：从初期试探到生死并肩，将现代小队班组战术（三三制、交叉火力、战地急救）注入宋末民间义军。

### Phase 2: 东京汴梁暗线与军工爆发（跨区域扩张期）
- **核心交互**：`[王浩川 / 陈素] ---> [昭华帝姬 / 汴梁权贵]` 与 `[林昭 / 马振邦] ---> [岳武（岳飞）]`
- **博弈机制**：
  - **科举+商贸双轮驱动**：王浩川以现代数理逻辑与策论打入汴梁官场，陈素以高纯度香露/护肤脂打通后宫与宗室路线，绑定**昭华帝姬**形成朝堂防火墙。
  - **名将微末交汇（岳武/岳飞）**：林昭与少年岳飞在实战中惺惺相惜，现代特种作战的「精确情报、火力覆盖、后勤先置」理念深刻重塑岳家军雏形。

### Phase 3: 关中血仇与西夏讨伐战（转折与悲壮献祭期）
- **核心导火索（Catalyst Edge）**：
  - **`秦荣遇害` (`qin_rong` -> `assassinated_catalyst`)**：关中豪强盟友秦荣遭西夏暗算伏击身亡，打破地缘平衡，直接触发五人小队携新式火器全面出兵河西走廊/关中前线。
  - **`秦红缨壮烈牺牲` (`qin_hongying` -> `martyred_s6`)**：第六季高潮节点，秦红缨为掩护林昭突围身中数箭力战而亡。在图谱中该条边（`lin_zhao <---> qin_hongying`）必须标记为**永久高权重金色/赤色纪念边（Martyrdom Covenant）**，驱动林昭由“求生自保”彻底转向“改天换地、护佑华夏”。

### Phase 4: 边塞铁壁与金夏重骑降维决战（全面战争期）
- **核心对抗**：`[现代战术火器新军] ===(Asymmetric Warfare)===> [西夏铁鹞子 / 金国完颜氏铁拐马]`
- **跨代科技消耗与补给平衡公式（Asymmetric Resource Formula）**：
  1. **不可再生现代存量（Stock Layer）**：现代 5.56mm/7.62mm/.338 狙击弹药与无线电锂电池属于严格递减存量，仅用于**斩首敌酋（谢长风）**、**绝境突围（林昭）**与**跨州战略预警（王浩川）**。
  2. **可再生宋代军工增量（Flow Layer）**：马振邦通过高炉炼铁、颗粒黑火药标准化配比、青铜子母炮（佛朗机）与定装霰弹，将宋代步兵火力密度提升一个数量级，专门克制西夏铁鹞子与女真重甲骑兵的密集冲锋。

---

## 四、 视觉资产映射表 (Cloud-Generated 16:9 Assets in `.cloud-bridge/assets/`)

云端主架构师已同步通过原生 `generate_image` 渲染引擎生成 4 张 16:9 8K 级电影质感视觉资产，本地 Agent 在构建 Web 图谱详情抽屉或生成 PPT 汇报时，直接引用以下本地路径：

1. **队长林昭特战写真**：`.cloud-bridge/assets/chixie-01-captain-linzhao.jpg`
   - *适用场景*：封面核心主视觉 / 指挥中枢节点详情卡（宋代灰褐交领长衫外罩现代战术防弹背心、消音卡宾枪、清河村烟雨背景）。
2. **远近火力组（谢长风 & 马振邦）**：`.cloud-bridge/assets/chixie-02-firepower-duo.jpg`
   - *适用场景*：军工与远程斩首机制解析页（古城墙高精度狙击手 + 锻造工坊青铜佛朗机火炮与改良连弩）。
3. **汴梁情报与战地医卫组（王浩川 & 陈素）**：`.cloud-bridge/assets/chixie-03-intel-medic.jpg`
   - *适用场景*：情报网络与商贸造血闭环页（宋式书斋暗格内伪装军用电台 + 庭院医馆现代无菌手术器械与青花药罐）。
4. **边塞跨时空大对峙（五人组 + 秦红缨宋军 vs 金夏铁骑）**：`.cloud-bridge/assets/chixie-04-epic-standoff.jpg`
   - *适用场景*：全剧高潮战略决战页 / 阵营对抗全景图（长城关隘之上现代特战火力与红甲女将秦红缨并肩迎击漫山遍野的西夏铁鹞子与金军铁骑）。

---

## 五、 本地 Agent 实现与自检清单 (Execution Checklist)

1. **禁止平面罗列**：在渲染《持械入宋》人物关系时，严禁做成简单的静态人物卡片列表，必须体现**「现代特战内环（5人） -> 宋代盟友中环（清河村/朝堂/名将） -> 异族强敌外环（西夏/金国）」**的同心圆三层张力结构。
2. **明确标注两大悲情转折锚点**：必须在图谱交互或幻灯片叙事中突出 **秦荣遇害（出兵西夏导火索）** 与 **秦红缨第六季掩护林昭牺牲（精神图腾升华）** 的因果链条。
3. **图文绑定校验**：确保所有 4 张 `.cloud-bridge/assets/chixie-0*.jpg` 均被正确挂载至对应人物/战役视图，并配以深色高对比度遮罩（Scrim）保障文字可读性。
