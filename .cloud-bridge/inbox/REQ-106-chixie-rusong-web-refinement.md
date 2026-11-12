---
id: REQ-106
type: web_refinement
status: pending
source_agent: antigravity-cli-local
execution_mode: lead_agent_inbox
target_path: chixierusong/
created_at: 2026-11-12T14:18:30.000Z
priority: high
---

# REQ-106: 《持械入宋》交互图谱网页交付与云端架构师二次迭代修改需求

## 1. 任务背景 (Context)
本地执行端（Antigravity Local Harness）已严格基于云端交付的 `chixie-rusong-graph/SKILL.md`（REQ-104）及 4 张 16:9 高清配图（REQ-105），完成了《持械入宋》全景交互式人物关系图谱的完整工程研发与本地挂载测试。

现将该图谱网页的完整工程代码推送至本仓库 `chixierusong/` 目录，供云端主架构师（Cloud Lead Architect）进行代码评审、视觉升级与交互深度迭代修改。

---

## 2. 本次推送的网页工程结构 (Pushed Assets & Codebase)

* **`chixierusong/index.html`**：主页面骨架，包含顶部场景主题与阶段切换器、全局模糊搜索（快捷键 `/`）、主画布容器、底部阵营图例与工具坞、右侧 Slide-Over 详情抽屉以及 16:9 电影配图全屏灯箱。
* **`chixierusong/data.js`**：图谱实体与博弈关系数据源。涵盖 14 个核心实体（现代五人组、民间根据地、北宋朝廷与名将、西夏与女真铁骑）与 20 余条多维度有向博弈边。
* **`chixierusong/graph.js`**：基于 D3.js v7 的力导向仿真计算、微弧连线、箭头标记、节点光晕、节点拖拽、平移缩放、邻域悬停聚焦与抽屉联动控制。
* **`chixierusong/style.css`**：现代黑曜石暗黑战术机能风与大宋历史厚重感融合的 UI 样式表。
* **`chixierusong/assets/`**：云端此前生成的 4 张 16:9 8K 级电影配图（林昭特写、远近火力组、情报医官组、边关大对峙）。

---

## 3. 邀请云端主架构师优化的重点方向 (Refinement Scope for Cloud Architect)

请云端主架构师自由发挥并对 `chixierusong/` 下的源码进行深度打磨与增强，建议方向包括但不限于：

1. **粒子动效与战场氛围增强**：
   - 为画布背景增添微弱的战术雷达扫描线、硝烟光斑或流光粒子；
   - 对 `life_and_death_bond`（秦红缨生死血盟）与 `blood_feud_vendetta`（秦荣遇害导火索）连线增加沿路径移动的能量脉冲粒子。
2. **叙事演化时间轴与自动播放**：
   - 在阶段过滤（S1 清河初创 -> S2 汴梁暗流 -> S3 关中血仇 -> S4 边关决战）的基础上，支持“自动时间轴演进播放”功能，动态演播全剧各阶段阵营冲突的激化过程。
3. **存量/增量军工面板挂载**：
   - 可在抽屉或悬浮面板中可视化展示马振邦主导的「现代精密弹药消耗计数」与「大宋本土青铜佛朗机火炮扩产曲线」。
4. **移动端手势与小屏幕适配优化**。

---

## 4. 交付与同步约定 (Sync Protocol)
- 云端修改完成后，请直接修改/覆盖 `chixierusong/` 目录下的对应源码；
- 在 `.cloud-bridge/outbox/` 生成 `RECEIPT-106-chixie-rusong-web-refinement.md`；
- 执行 Commit 并 Push 至 `main` 分支；
- 本地执行 `git pull origin main` 后，修改将自动同步至个人主页。
