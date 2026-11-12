/**
 * 《持械入宋》全景人物关系图谱与战略博弈数据表 (Data Schema)
 * 基于云端 Lead Architect 沉淀的 chixie-rusong-graph Superpower 纲领构建
 */

const GRAPH_DATA = {
  meta: {
    title: "《持械入宋》全景人物关系图谱",
    subtitle: "现代五人特战小队 × 北宋末年宣和/靖康军政博弈",
    version: "2.0.0",
    author: "Antigravity Cloud Bridge × 牦牛路过",
    epicStandoffImage: "assets/chixie-04-epic-standoff.jpg"
  },

  factions: {
    modern_squad: {
      id: "modern_squad",
      name: "现代特战五人组",
      color: "#38bdf8",
      glowColor: "rgba(56, 189, 248, 0.4)",
      badgeBg: "rgba(56, 189, 248, 0.15)",
      badgeBorder: "rgba(56, 189, 248, 0.4)",
      desc: "穿越北宋的现代特种作战核心中枢，掌握近战CQB、超视距狙杀、军工逆向复刻、密网电台与现代外科防疫。"
    },
    qinghe_allies: {
      id: "qinghe_allies",
      name: "清河村与民间盟友",
      color: "#f59e0b",
      glowColor: "rgba(245, 158, 11, 0.4)",
      badgeBg: "rgba(245, 158, 11, 0.15)",
      badgeBorder: "rgba(245, 158, 11, 0.4)",
      desc: "小队崛起的根据地基石，包括地方官吏的政治保护伞、民间武装部曲与高炉铸炮工坊。"
    },
    song_court: {
      id: "song_court",
      name: "大宋朝堂与宗室",
      color: "#a855f7",
      glowColor: "rgba(168, 85, 247, 0.4)",
      badgeBg: "rgba(168, 85, 247, 0.15)",
      badgeBorder: "rgba(168, 85, 247, 0.4)",
      desc: "东京汴梁政治枢纽，科举入仕网络与皇室宗女联络，提供政治合法性与战略护城河。"
    },
    song_military: {
      id: "song_military",
      name: "抗金名将体系",
      color: "#10b981",
      glowColor: "rgba(16, 185, 129, 0.4)",
      badgeBg: "rgba(16, 185, 129, 0.15)",
      badgeBorder: "rgba(16, 185, 129, 0.4)",
      desc: "民族大义与现代兵法的深刻共振，启蒙散兵线、掩体推进与步炮协同，铸造岳家军雏形。"
    },
    hostile_powers: {
      id: "hostile_powers",
      name: "冷兵器巅峰强敌",
      color: "#ef4444",
      glowColor: "rgba(239, 68, 68, 0.4)",
      badgeBg: "rgba(239, 68, 68, 0.15)",
      badgeBorder: "rgba(239, 68, 68, 0.4)",
      desc: "西夏重甲铁鹞子与金国女真铁浮屠，冷兵器巅峰冲击力量与跨时空火器降维对撞。"
    }
  },

  nodes: [
    {
      id: "lin_zhao",
      name: "林昭",
      roleTitle: "特战突击队长 · 指挥灵魂",
      faction: "modern_squad",
      originTag: "北京籍 · 前特战战术骨干",
      primaryVector: "tactical_kinetic",
      survivalStatus: "active",
      influenceWeight: 98,
      image: "assets/chixie-01-captain-linzhao.jpg",
      quote: "“只要弹药还在，我们就是这片乱世里最后的秩序底线。”",
      coreAssets: [
        "现代消音战术卡宾枪（存量消耗）",
        "轻量化防弹插板背心与夜视仪",
        "特种战术决策手记与步炮协同纲要"
      ],
      bio: "现代五人小队的绝对战术核心与精神支柱。性格冷静果决，京味口音。掌握特种渗透、无声近战格斗及反伏击指挥。初到清河村以雷霆手段震慑地方恶霸，与狄知县达成赋税自治协议。在经历秦荣遇害与秦红缨为掩护自己牺牲的椎心之痛后，心态由避世求存升华为铁血救亡，指导青年岳飞改革军制，亲率新军在边关抗击金夏联军。"
    },
    {
      id: "xie_changfeng",
      name: "谢长风",
      roleTitle: "副队长 · 重装狙击手",
      faction: "modern_squad",
      originTag: "东北籍 · 远程精确射手",
      primaryVector: "tactical_kinetic",
      survivalStatus: "active",
      influenceWeight: 88,
      image: "assets/chixie-02-firepower-duo.jpg",
      quote: "“八百米外，神仙难救。我的十字分划线里没有活着的千户。”",
      coreAssets: [
        ".338 高精度大口径狙击步枪",
        "高倍率光学测距瞄准镜",
        "重型反器材特战弹药"
      ],
      bio: "性格豪爽耿直，东北硬汉。负责全队超视距精确打击与重火力压制。战场上往往单人潜伏于古代城墙垛口或制高点，专门斩首金夏骑兵统领、吹角军官与重甲将领，多次在古代骑兵发起集群冲锋前直接击溃其指挥系统。与军械师马振邦保持深度技术沟通，为其复刻改良连弩提供弹道测算数据。"
    },
    {
      id: "ma_zhenbang",
      name: "马振邦",
      roleTitle: "军械工程师 · 军工逆向导师",
      faction: "modern_squad",
      originTag: "留学生背景 · 机械工程硕士",
      primaryVector: "industrial_tech",
      survivalStatus: "active",
      influenceWeight: 92,
      image: "assets/chixie-02-firepower-duo.jpg",
      quote: "“子弹是死的，但机械与冶金原理是永恒的。我能让大宋提前三百年开炮。”",
      coreAssets: [
        "青铜佛朗机子母炮（逆能量产）",
        "弹簧钢高张力复合连弩",
        "颗粒黑火药标准化提纯工艺"
      ],
      bio: "团队的最高智囊与工业造血中枢。操一口东北口音的留学生军工天才。深知现代枪弹“打一发少一发”的致命短板，在清河村利用土高炉与熟铁铜料，成功复刻出可快速换装子铳的青铜佛朗机炮与连珠神臂弩，制定了黑火药提纯规范，使大宋地方武装首次拥有了足以大批量屠灭重甲铁骑的密集远程杀伤力。"
    },
    {
      id: "wang_haochuan",
      name: "王浩川",
      roleTitle: "通信情报官 · 汴梁潜伏仕官",
      faction: "modern_squad",
      originTag: "广东籍 · 学霸体质",
      primaryVector: "intel_politics",
      survivalStatus: "active",
      influenceWeight: 90,
      image: "assets/chixie-03-intel-medic.jpg",
      quote: "“朝堂上的勾心斗角，用博弈论建模拆解，其实比敲代码简单得多。”",
      coreAssets: [
        "战术超短波加密步话电台（暗格隐藏）",
        "大宋进士及第文官身份",
        "汴梁全城地下情报与商情密网"
      ],
      bio: "思维敏捷、极富洞察力的粤籍情报参谋。在小队站稳清河村后，被委派走科举入仕路线。凭借现代经学考据、治水策论与数理逻辑高中进士，打入东京汴梁核心官僚圈。将一台便携军用电台隐匿于书斋暗格，与前线林昭保持加密通联。结识昭华帝姬并获得其政治庇护，多次提前向小队预警朝廷风向与金军南下战略密谋。"
    },
    {
      id: "chen_su",
      name: "陈素",
      roleTitle: "战地军医 · 商贸造血玫瑰",
      faction: "modern_squad",
      originTag: "湖南籍 · 三甲创伤外科主治",
      primaryVector: "medical_commerce",
      survivalStatus: "active",
      influenceWeight: 89,
      image: "assets/chixie-03-intel-medic.jpg",
      quote: "“救死扶伤是本能，顺便用一瓶玫瑰露掏空东京贵妇的脂粉钱，也是基操。”",
      coreAssets: [
        "现代便携外科手术器械与创伤缝合包",
        "高纯度医用蒸馏酒精与中草药萃取液",
        "风靡大宋的高端香脂护肤品独家秘方"
      ],
      bio: "美丽坚韧的湘妹子，全队生命保障与财政造血核心。在战乱动荡中建立现代化野战医馆，通过无菌清创、酒精消毒与缝合技术，将部曲伤亡率降到古代匪夷所思的极低水平。同时利用马振邦设计的蒸馏冷凝设备提取花精，研制出贵族护肤霜与香水，垄断汴梁后宫与权贵消费市场，为小队的铸炮军工提供了滚滚而来的现金流。"
    },
    {
      id: "qin_hongying",
      name: "秦红缨",
      roleTitle: "民军义勇女将 · 生死血盟",
      faction: "qinghe_allies",
      originTag: "北宋关中 · 将门遗风",
      primaryVector: "tactical_kinetic",
      survivalStatus: "martyred_s6",
      influenceWeight: 94,
      quote: "“林昭，这一仗我来断后！若有来生……换你来大宋娶我！”",
      coreAssets: [
        "家传龙鳞柳叶铠与朱缨长枪",
        "精通骑射的关中义勇骑兵部曲",
        "林昭赠予的防刺战术背心"
      ],
      bio: "全剧最令观众意难平的悲壮女主。性格英姿飒爽、刚烈忠义。早期率领民军保护流民，与林昭不打不相识，后被小队的纪律与战术深深折服，结为生死同盟。接受了现代散兵战术洗礼，率部协助小队多次击退敌军。第六季高潮战役中，为掩护突围的林昭及百姓，身负重伤仍浴血断后，身中数箭壮烈牺牲。她的牺牲成为林昭下定决心踏平异族强敌的精神图腾。"
    },
    {
      id: "qin_rong",
      name: "秦荣",
      roleTitle: "关中豪强盟主 · 商路枢纽",
      faction: "qinghe_allies",
      originTag: "关中大贾 · 义士首领",
      primaryVector: "medical_commerce",
      survivalStatus: "assassinated_catalyst",
      influenceWeight: 78,
      quote: "“商路通，则天下通。林掌柜的铁器粮秣，包在秦某身上！”",
      coreAssets: [
        "横跨宋夏边境的驼队与盐铁商道",
        "关中各县粮仓与工匠资源",
        "联络地方绿林与漕帮的人脉网络"
      ],
      bio: "秦红缨的族兄，关中举足轻重的豪强大贾。具有敏锐的商业嗅觉与家国情怀，主动与陈素合作经销护肤品与特制火器，为小队采办硫磺、硝石与精铜。在亲自押运战略物资前往河西前线途中，遭西夏铁鹞子伏击截杀，惨遭肢解。秦荣之死打破了西北边境的微妙脆弱平衡，成为林昭小队全面出兵讨伐西夏的直接导火索。"
    },
    {
      id: "di_zhixian",
      name: "狄知县",
      roleTitle: "清河县令 · 基层官府庇护者",
      faction: "qinghe_allies",
      originTag: "宋代正科举进士 · 守成良吏",
      primaryVector: "intel_politics",
      survivalStatus: "active",
      influenceWeight: 72,
      quote: "“本县不问诸位来历，只看清河村百姓能否安居、赋税能否充盈。”",
      coreAssets: [
        "清河县印信文牒与官方户籍底册",
        "官办铁矿开采与荒滩拓垦批文",
        "向州府转递的表奏捷报通道"
      ],
      bio: "清河村所在地的主政官员。性格圆滑务实，深谙官场生存之道。见识到五人小队剿匪的雷霆神威后，不仅未予缉捕，反而顺水推舟为其办理合法民籍与行商路引。在小队平息流寇、缴纳巨额赋税并保一方平安后，将清河村默许为小队独立治理的“经济特区”，成为现代小队立足北宋大地的第一把官方保护伞。"
    },
    {
      id: "qinghe_villagers",
      name: "清河村工匠部曲",
      roleTitle: "根据地基石 · 军工匠户兵源",
      faction: "qinghe_allies",
      originTag: "北宋黎民 · 铁匠与流民",
      primaryVector: "industrial_tech",
      survivalStatus: "active",
      influenceWeight: 65,
      quote: "“跟着林先生和马师傅，不仅吃得饱白饭，还能造出镇国神炮！”",
      coreAssets: [
        "依山傍水的水力锻锤与土高炉",
        "熟练掌握复合连弩组装的青年民兵",
        "自给自足的梯田与战备粮仓"
      ],
      bio: "在小队的现代治理理念（按劳分配、基础识字、公共卫生防疫）改造下，原本愚昧闭塞的贫瘠山村迅速演变为兼具坚固堡垒与军工兵工厂特征的现代化根据地。涌现出一大批能严格遵循公差配合、流水线铸炮造弩的古代产业工人，为后续对抗金夏提供了源源不断的兵员与辎重支撑。"
    },
    {
      id: "yue_fei",
      name: "岳飞 (化名岳武)",
      roleTitle: "抗金名将 · 青年时期",
      faction: "song_military",
      originTag: "相州汤阴 · 少年从军",
      primaryVector: "tactical_kinetic",
      survivalStatus: "historical_anchor",
      influenceWeight: 96,
      quote: "“精忠报国，誓雪国耻！林兄教我的步炮互掩之策，实乃克敌神术！”",
      coreAssets: [
        "盖世骑射与八杆沥泉神矛战技",
        "治军严整的铁血岳家军班底",
        "融合现代步兵散兵线的创新战术"
      ],
      bio: "相识于行伍微末之时。青年岳飞勇冠三军、赤胆忠心，在一次边关战役中与林昭并肩作战。林昭将现代步兵防御工事、堑壕战术、散兵交替跃进以及“步炮火力协同”倾囊相授。岳飞惊为天人，将其化入岳家军的日常操演纪律中，二人在抵御异族侵略的民族大义上形成高度共鸣，成为贯穿全书最坚实的历史精神灯塔。"
    },
    {
      id: "zhaohua_princess",
      name: "昭华帝姬",
      roleTitle: "大宋皇室宗女 · 汴梁防火墙",
      faction: "song_court",
      originTag: "赵宋皇族 · 徽宗帝女",
      primaryVector: "intel_politics",
      survivalStatus: "historical_anchor",
      influenceWeight: 86,
      quote: "“王修撰之才见识非凡，若能保我大宋社稷，本宫自当为君遮风挡雨。”",
      coreAssets: [
        "大宋内廷直接干预权与玉牒金印",
        "皇庄内务府采办特许权",
        "直达禁中枢密院的密折上奏渠道"
      ],
      bio: "北宋末年深居禁中的聪慧帝姬。在王浩川科举中试入枢密院后，敏锐察觉到其言行远超寻常腐儒。通过陈素奉上的奇香玉露与王浩川建立隐秘合作关系。在朝堂奸佞与投降派数次构陷小队“私造火器图谋不轨”的关键时刻，以帝姬身份出面化解，成为小队在东京城最高层的政治护城河。"
    },
    {
      id: "zong_ze",
      name: "宗泽",
      roleTitle: "抗金主战派元老 · 留守名臣",
      faction: "song_military",
      originTag: "婺州义乌 · 刚烈名相",
      primaryVector: "intel_politics",
      survivalStatus: "historical_anchor",
      influenceWeight: 84,
      quote: "“过河！过河！只要老夫一息尚存，绝不容胡虏踏破黄河半步！”",
      coreAssets: [
        "东京留守使大印与开封兵权",
        "联络两河数百万忠义民军的崇高声望",
        "对林昭新军火器的高度信任与调动权"
      ],
      bio: "大宋末期擎天一柱。主张联络民间武装与义军共同抗金。当王浩川携林昭的实战火器图册向其进言时，宗泽力排众议，为小队正名并授予其“宣抚司正规战备巡防”军资名分。在边关防御战中和小队紧密协同，全力支撑后方粮道，为跨时空对决提供了合法正规军编制与战役支点。"
    },
    {
      id: "western_xia",
      name: "西夏铁鹞子兵团",
      roleTitle: "关中宿敌 · 重甲冲击骑兵",
      faction: "hostile_powers",
      originTag: "党项羌族 · 冷兵器肉搏巅峰",
      primaryVector: "tactical_kinetic",
      survivalStatus: "active",
      influenceWeight: 85,
      quote: "“铁骑过处，寸草不生！宋人的血肉怎敌得过党项神铠！”",
      coreAssets: [
        "冷锻精钢人马俱甲（刀枪不入）",
        "以铁索相连的集团冲锋战术",
        "强弓重矢奔袭战术"
      ],
      bio: "西夏精锐禁军，号称冷兵器时代最具毁灭力的重装突击兵团。人马皆披挂耐劈砍的重铠，以铁锁互联冲阵。在截杀秦荣商队后激怒五人小队。在随后的河西野战中，被马振邦研制的青铜佛朗机火炮以定装霰弹与地雷炸得人仰马翻，又遭谢长风远程狙杀首领，首次遭遇热兵器时代的降维屠戮。"
    },
    {
      id: "jurchen_jin",
      name: "金国女真铁浮屠",
      roleTitle: "靖康危机 · 终极蛮荒强敌",
      faction: "hostile_powers",
      originTag: "白山黑水 · 完颜氏铁骑",
      primaryVector: "tactical_kinetic",
      survivalStatus: "active",
      influenceWeight: 95,
      quote: "“女真不满万，满万不可敌！宋国锦绣江山，当归大金铁蹄！”",
      coreAssets: [
        "铁浮屠三人连环重甲骑兵",
        "拐子马轻骑双翼两翼穿插迂回",
        "攻城重木与掠夺奴役的狼性士气"
      ],
      bio: "引发靖康国难的蛮荒强权。以残忍无畏的野战冲击著称。南下进犯长城关隘之时，迎面撞上了由现代特战小队、岳飞新军及秦红缨残部联合构筑的立体现代化防御阵地。在现代自动步枪连射、高爆手雷雨以及佛朗机炮阵的交叉火力面前，冷兵器巅峰的神话被彻底粉碎。"
    }
  ],

  links: [
    // 现代小队内环战术闭环
    { source: "lin_zhao", target: "xie_changfeng", label: "突击点杀·超视距狙击协同", relationType: "tactical_synergy", phaseRange: [1, 4] },
    { source: "lin_zhao", target: "ma_zhenbang", label: "战术需求定制·弹药维保", relationType: "industrial_supply", phaseRange: [1, 4] },
    { source: "lin_zhao", target: "wang_haochuan", label: "电台通联·战场态势感知", relationType: "tactical_synergy", phaseRange: [2, 4] },
    { source: "lin_zhao", target: "chen_su", label: "生命卫勤·外科创伤保障", relationType: "industrial_supply", phaseRange: [1, 4] },
    { source: "xie_changfeng", target: "ma_zhenbang", label: "高精狙弹道反馈·火炮参数", relationType: "industrial_supply", phaseRange: [1, 4] },
    { source: "chen_su", target: "wang_haochuan", label: "商贸现金流·打通汴梁关节", relationType: "industrial_supply", phaseRange: [2, 4] },
    { source: "ma_zhenbang", target: "chen_su", label: "蒸馏冷凝设备·提纯医用酒精", relationType: "industrial_supply", phaseRange: [1, 4] },

    // 清河村与地方盟友
    { source: "lin_zhao", target: "di_zhixian", label: "地方治安维护·官方合法户籍", relationType: "political_patronage", phaseRange: [1, 2] },
    { source: "ma_zhenbang", target: "qinghe_villagers", label: "水力工坊高炉·培养宋代军工匠户", relationType: "industrial_supply", phaseRange: [1, 4] },
    { source: "chen_su", target: "qin_rong", label: "护肤品商贸分销·采办硫磺精铜", relationType: "industrial_supply", phaseRange: [1, 3] },
    { source: "lin_zhao", target: "qin_hongying", label: "现代小队战术赋能·生死眷侣", relationType: "life_and_death_bond", phaseRange: [1, 3] },
    { source: "qin_hongying", target: "lin_zhao", label: "【S6断后牺牲】以身挡箭掩护突围", relationType: "life_and_death_bond", phaseRange: [3, 4] },
    { source: "western_xia", target: "qin_rong", label: "【伏击刺杀】截杀秦荣夺取辎重", relationType: "blood_feud_vendetta", phaseRange: [3, 3] },
    { source: "lin_zhao", target: "western_xia", label: "【出兵复仇】火炮洗地惩办凶顽", relationType: "asymmetric_warfare", phaseRange: [3, 4] },

    // 汴梁朝堂与皇室
    { source: "wang_haochuan", target: "zhaohua_princess", label: "科举入仕辅佐·禁中皇室护城河", relationType: "political_patronage", phaseRange: [2, 4] },
    { source: "chen_su", target: "zhaohua_princess", label: "进献御前香露·结交六宫贵胄", relationType: "industrial_supply", phaseRange: [2, 4] },

    // 抗金名将与终极决战
    { source: "lin_zhao", target: "yue_fei", label: "传授散兵线掩护·步炮协同共创军制", relationType: "tactical_synergy", phaseRange: [2, 4] },
    { source: "wang_haochuan", target: "yue_fei", label: "前沿军事情报密报", relationType: "tactical_synergy", phaseRange: [2, 4] },
    { source: "wang_haochuan", target: "zong_ze", label: "引荐特战火器·获得留守使编制", relationType: "political_patronage", phaseRange: [3, 4] },
    { source: "yue_fei", target: "zong_ze", label: "抗金统一战线·两河忠义后盾", relationType: "tactical_synergy", phaseRange: [3, 4] },

    // 异族决战对抗
    { source: "xie_changfeng", target: "western_xia", label: "800m 斩首西夏统军酋长", relationType: "asymmetric_warfare", phaseRange: [3, 4] },
    { source: "ma_zhenbang", target: "western_xia", label: "青铜佛朗机火炮覆灭铁鹞子", relationType: "asymmetric_warfare", phaseRange: [3, 4] },
    { source: "lin_zhao", target: "jurchen_jin", label: "散兵堑壕战术粉碎铁浮屠冲锋", relationType: "asymmetric_warfare", phaseRange: [4, 4] },
    { source: "yue_fei", target: "jurchen_jin", label: "岳家军结合新式连弩破拐子马", relationType: "asymmetric_warfare", phaseRange: [4, 4] }
  ],

  phases: [
    {
      id: "all",
      label: "全景人物网",
      desc: "全部人物节点与战略多维博弈全景透视"
    },
    {
      id: "phase1",
      label: "Phase 1: 清河初创",
      desc: "现代五人小队空降清河村，狄知县政治庇护，秦红缨义军结盟立威",
      phaseIndex: 1
    },
    {
      id: "phase2",
      label: "Phase 2: 汴梁暗流",
      desc: "王浩川科举入汴梁，陈素商贸造血，昭华帝姬庇护，结交微末岳飞",
      phaseIndex: 2
    },
    {
      id: "phase3",
      label: "Phase 3: 关中血仇",
      desc: "秦荣遇害导火索，秦红缨S6为掩护林昭壮烈殉国，小队出兵伐夏",
      phaseIndex: 3
    },
    {
      id: "phase4",
      label: "Phase 4: 边关决战",
      desc: "长城关隘立体防御，现代步兵与青铜火炮降维对抗西夏与金国铁骑",
      phaseIndex: 4
    }
  ]
};
