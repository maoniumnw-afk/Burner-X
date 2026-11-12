/**
 * 《持械入宋》全景人物关系图谱 D3 交互可视化引擎
 */

(function () {
  const container = document.getElementById("graph-container");
  const drawer = document.getElementById("detail-drawer");
  const drawerCloseBtn = document.getElementById("drawer-close-btn");
  const searchInput = document.getElementById("search-input");
  const searchDropdown = document.getElementById("search-dropdown");
  const legendChipsContainer = document.getElementById("legend-chips");
  const phaseTabs = document.querySelectorAll(".phase-tab");
  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxCloseBtn = document.getElementById("lightbox-close-btn");

  let width = container.clientWidth || window.innerWidth;
  let height = container.clientHeight || window.innerHeight;

  let currentPhase = "all";
  let activeFaction = null;
  let selectedNode = null;
  let isPhysicsPaused = false;

  // 1. 数据映射与索引构建
  const nodesMap = new Map();
  GRAPH_DATA.nodes.forEach(n => {
    n.radius = n.id === "lin_zhao" ? 28 : (n.influenceWeight >= 90 ? 24 : (n.influenceWeight >= 80 ? 20 : 16));
    n.factionInfo = GRAPH_DATA.factions[n.faction] || GRAPH_DATA.factions.modern_squad;
    nodesMap.set(n.id, n);
  });

  const neighbors = new Map();
  const nodeRelations = new Map();

  GRAPH_DATA.nodes.forEach(n => {
    neighbors.set(n.id, new Set());
    nodeRelations.set(n.id, []);
  });

  GRAPH_DATA.links.forEach(l => {
    neighbors.get(l.source).add(l.target);
    neighbors.get(l.target).add(l.source);

    const sNode = nodesMap.get(l.source);
    const tNode = nodesMap.get(l.target);

    nodeRelations.get(l.source).push({ target: tNode, label: l.label, type: l.relationType, role: "source", phaseRange: l.phaseRange });
    nodeRelations.get(l.target).push({ target: sNode, label: l.label, type: l.relationType, role: "target", phaseRange: l.phaseRange });
  });

  // 2. SVG 画布与滤镜初始化
  const svg = d3.select("#graph-container")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", [0, 0, width, height]);

  const defs = svg.append("defs");

  // 发光滤镜
  const filter = defs.append("filter")
    .attr("id", "glow")
    .attr("x", "-50%")
    .attr("y", "-50%")
    .attr("width", "200%")
    .attr("height", "200%");
  filter.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "coloredBlur");
  const feMerge = filter.append("feMerge");
  feMerge.append("feMergeNode").attr("in", "coloredBlur");
  feMerge.append("feMergeNode").attr("in", "SourceGraphic");

  // 箭头标记定义
  const relationColors = {
    tactical_synergy: "#38bdf8",
    industrial_supply: "#f59e0b",
    life_and_death_bond: "#f43f5e",
    political_patronage: "#a855f7",
    blood_feud_vendetta: "#ef4444",
    asymmetric_warfare: "#fb7185"
  };

  Object.entries(relationColors).forEach(([key, color]) => {
    defs.append("marker")
      .attr("id", `arrow-${key}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 22)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", color);
  });

  // 主绘图分组（用于缩放平移）
  const g = svg.append("g").attr("class", "main-viewport");

  // 缩放行为
  const zoom = d3.zoom()
    .scaleExtent([0.3, 3])
    .on("zoom", (event) => {
      g.attr("transform", event.transform);
    });

  svg.call(zoom);

  // 3. 力导向物理引擎配置
  const simulation = d3.forceSimulation(GRAPH_DATA.nodes)
    .force("link", d3.forceLink(GRAPH_DATA.links).id(d => d.id).distance(d => {
      if (d.relationType === "tactical_synergy") return 110;
      if (d.relationType === "life_and_death_bond") return 120;
      return 150;
    }))
    .force("charge", d3.forceManyBody().strength(d => d.id === "lin_zhao" ? -900 : -600))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide().radius(d => d.radius + 28).iterations(3));

  // 4. 连线与标签渲染
  const linkGroup = g.append("g").attr("class", "links-layer");
  const nodeGroup = g.append("g").attr("class", "nodes-layer");

  const linkElements = linkGroup.selectAll("g.link-wrapper")
    .data(GRAPH_DATA.links)
    .enter()
    .append("g")
    .attr("class", "link-wrapper");

  const linkPaths = linkElements.append("path")
    .attr("class", "relation-path")
    .attr("stroke", d => relationColors[d.relationType] || "#94a3b8")
    .attr("stroke-width", d => d.relationType === "life_and_death_bond" ? 2.5 : 1.5)
    .attr("stroke-opacity", 0.6)
    .attr("fill", "none")
    .attr("stroke-dasharray", d => d.relationType === "asymmetric_warfare" ? "4,4" : "none")
    .attr("marker-end", d => `url(#arrow-${d.relationType})`);

  const linkLabels = linkElements.append("text")
    .attr("class", "relation-label")
    .attr("text-anchor", "middle")
    .attr("dy", -4)
    .attr("font-size", 10.5)
    .attr("fill", d => relationColors[d.relationType] || "#cbd5e1")
    .attr("opacity", 0.8)
    .style("pointer-events", "none")
    .text(d => d.label);

  // 5. 节点绘制
  const nodeElements = nodeGroup.selectAll("g.node-wrapper")
    .data(GRAPH_DATA.nodes)
    .enter()
    .append("g")
    .attr("class", "node-wrapper")
    .style("cursor", "pointer")
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  // 节点光晕外环
  nodeElements.append("circle")
    .attr("class", "node-halo")
    .attr("r", d => d.radius + 6)
    .attr("fill", "none")
    .attr("stroke", d => d.survivalStatus === "martyred_s6" ? "#ef4444" : d.factionInfo.color)
    .attr("stroke-width", d => d.survivalStatus === "martyred_s6" ? 2 : 1)
    .attr("stroke-opacity", 0.5)
    .attr("filter", "url(#glow)");

  // 节点主体圆圈
  nodeElements.append("circle")
    .attr("class", "node-circle")
    .attr("r", d => d.radius)
    .attr("fill", d => d.survivalStatus === "martyred_s6" ? "#7f1d1d" : d.factionInfo.color)
    .attr("fill-opacity", 0.85)
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5);

  // 节点名字文本
  nodeElements.append("text")
    .attr("class", "node-text")
    .attr("text-anchor", "middle")
    .attr("dy", d => d.radius + 16)
    .attr("font-size", 12)
    .attr("font-weight", 600)
    .attr("fill", "#f8fafc")
    .style("text-shadow", "0 2px 4px rgba(0,0,0,0.8)")
    .text(d => d.name);

  // 节点角色副标题文本
  nodeElements.append("text")
    .attr("class", "node-subtext")
    .attr("text-anchor", "middle")
    .attr("dy", d => d.radius + 29)
    .attr("font-size", 9.5)
    .attr("fill", "#94a3b8")
    .style("text-shadow", "0 2px 4px rgba(0,0,0,0.8)")
    .text(d => d.roleTitle.split("·")[0].trim());

  // 6. 物理仿真时钟事件
  simulation.on("tick", () => {
    linkPaths.attr("d", d => {
      const dx = d.target.x - d.source.x;
      const dy = d.target.y - d.source.y;
      const dr = Math.sqrt(dx * dx + dy * dy) * 1.5; // 轻度微弧
      return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
    });

    linkLabels.attr("transform", d => {
      const x = (d.source.x + d.target.x) / 2;
      const y = (d.source.y + d.target.y) / 2;
      return `translate(${x},${y})`;
    });

    nodeElements.attr("transform", d => `translate(${d.x},${d.y})`);
  });

  // 7. 节点交互：悬停聚焦与点击详情
  nodeElements.on("mouseenter", function (event, d) {
    if (selectedNode) return;
    highlightNeighbors(d);
  });

  nodeElements.on("mouseleave", function () {
    if (selectedNode) return;
    resetHighlights();
  });

  nodeElements.on("click", function (event, d) {
    event.stopPropagation();
    selectNode(d);
  });

  svg.on("click", function () {
    clearSelection();
  });

  function highlightNeighbors(d) {
    const directNeighbors = neighbors.get(d.id);

    nodeElements.style("opacity", n => n.id === d.id || directNeighbors.has(n.id) ? 1 : 0.15);
    linkElements.style("opacity", l => l.source.id === d.id || l.target.id === d.id ? 1 : 0.08);
  }

  function resetHighlights() {
    nodeElements.style("opacity", 1);
    linkElements.style("opacity", 1);
  }

  function selectNode(d) {
    selectedNode = d;
    highlightNeighbors(d);
    openDrawer(d);

    // 平移聚焦到选中节点
    const scale = 1.2;
    const transform = d3.zoomIdentity
      .translate(width / 2 - d.x * scale - 120, height / 2 - d.y * scale)
      .scale(scale);

    svg.transition().duration(600).call(zoom.transform, transform);
  }

  function clearSelection() {
    selectedNode = null;
    resetHighlights();
    closeDrawer();
  }

  // 8. 右侧详情抽屉 (Drawer) 逻辑
  function openDrawer(node) {
    document.getElementById("drawer-name").textContent = node.name;
    const factionTag = document.getElementById("drawer-faction");
    factionTag.textContent = node.factionInfo.name;
    factionTag.style.borderColor = node.factionInfo.color;
    factionTag.style.color = node.factionInfo.color;

    // 生存/牺牲状态
    const statusBox = document.getElementById("drawer-status");
    if (node.survivalStatus === "martyred_s6") {
      statusBox.innerHTML = `<span class="status-pill status-martyred">🕯️ 烈士 · S6掩护林昭壮烈殉国</span>`;
    } else if (node.survivalStatus === "assassinated_catalyst") {
      statusBox.innerHTML = `<span class="status-pill status-martyred">⚔️ 遇害 · 激化出兵讨伐西夏导火索</span>`;
    } else {
      statusBox.innerHTML = `<span class="status-pill status-active">🟢 战役存活 · 特战中枢运转中</span>`;
    }

    // 配图展示
    const mediaContainer = document.getElementById("drawer-media");
    if (node.image) {
      mediaContainer.style.display = "block";
      mediaContainer.innerHTML = `
        <div class="drawer-media-box" onclick="window.openLightbox('${node.image}', '${node.name} · ${node.roleTitle}')">
          <img src="${node.image}" alt="${node.name}">
          <div class="drawer-media-overlay">
            <span>📷 16:9 电影级配图（云端原生生成）</span>
            <span>点击放大 🔍</span>
          </div>
        </div>
      `;
    } else {
      mediaContainer.style.display = "none";
    }

    // 名言与简介
    document.getElementById("drawer-quote").textContent = node.quote;
    document.getElementById("drawer-bio").textContent = node.bio;

    // 核心装备/资产
    const assetsList = document.getElementById("drawer-assets");
    assetsList.innerHTML = node.coreAssets.map(a => `
      <div class="asset-tag-item">
        <span>🛡️</span>
        <span>${a}</span>
      </div>
    `).join("");

    // 关联羁绊
    const relationsList = document.getElementById("drawer-relations");
    const relations = nodeRelations.get(node.id) || [];
    relationsList.innerHTML = relations.map(r => `
      <div class="relation-card" onclick="window.triggerSelectNode('${r.target.id}')">
        <div class="relation-card-top">
          <span class="relation-target-name">${r.target.name}</span>
          <span class="relation-badge">${r.role === "source" ? "输出" : "接收"}</span>
        </div>
        <div class="relation-desc">${r.label}</div>
      </div>
    `).join("");

    drawer.classList.add("open");
  }

  function closeDrawer() {
    drawer.classList.remove("open");
  }

  drawerCloseBtn.addEventListener("click", () => {
    clearSelection();
  });

  // 全局跳转接口
  window.triggerSelectNode = function (nodeId) {
    const node = nodesMap.get(nodeId);
    if (node) selectNode(node);
  };

  // 9. 阶段切换过滤器 (Phase Filtering)
  phaseTabs.forEach(tab => {
    tab.addEventListener("click", function () {
      phaseTabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      currentPhase = this.getAttribute("data-phase");
      applyPhaseFilter(currentPhase);
    });
  });

  function applyPhaseFilter(phase) {
    if (phase === "all") {
      nodeElements.style("display", "block");
      linkElements.style("display", "block");
      return;
    }

    const phaseIndex = parseInt(phase.replace("phase", ""));

    // 过滤连线：phaseRange 覆盖当前阶段
    linkElements.style("display", l => {
      const [start, end] = l.phaseRange;
      return (phaseIndex >= start && phaseIndex <= end) ? "block" : "none";
    });

    // 过滤节点：在该阶段有活跃连线，或是小队核心
    const activeNodeIds = new Set();
    GRAPH_DATA.links.forEach(l => {
      const [start, end] = l.phaseRange;
      if (phaseIndex >= start && phaseIndex <= end) {
        activeNodeIds.add(typeof l.source === "object" ? l.source.id : l.source);
        activeNodeIds.add(typeof l.target === "object" ? l.target.id : l.target);
      }
    });

    nodeElements.style("display", n => {
      return (n.faction === "modern_squad" || activeNodeIds.has(n.id)) ? "block" : "none";
    });
  }

  // 10. 阵营图例与筛选
  function renderLegend() {
    legendChipsContainer.innerHTML = Object.values(GRAPH_DATA.factions).map(f => `
      <div class="legend-chip" data-faction="${f.id}" style="--chip-color: ${f.color}">
        <span class="legend-dot"></span>
        <span>${f.name}</span>
      </div>
    `).join("");

    legendChipsContainer.querySelectorAll(".legend-chip").forEach(chip => {
      chip.addEventListener("click", function () {
        const factionId = this.getAttribute("data-faction");
        if (activeFaction === factionId) {
          activeFaction = null;
          this.classList.remove("active");
          nodeElements.style("opacity", 1);
          linkElements.style("opacity", 1);
        } else {
          legendChipsContainer.querySelectorAll(".legend-chip").forEach(c => c.classList.remove("active"));
          activeFaction = factionId;
          this.classList.add("active");
          nodeElements.style("opacity", n => n.faction === factionId ? 1 : 0.15);
          linkElements.style("opacity", 0.1);
        }
      });
    });
  }
  renderLegend();

  // 11. 搜索栏实现
  searchInput.addEventListener("input", function () {
    const val = this.value.trim().toLowerCase();
    if (!val) {
      searchDropdown.style.display = "none";
      return;
    }

    const matches = GRAPH_DATA.nodes.filter(n => 
      n.name.toLowerCase().includes(val) || 
      n.roleTitle.toLowerCase().includes(val) || 
      n.originTag.toLowerCase().includes(val)
    );

    if (matches.length === 0) {
      searchDropdown.innerHTML = `<div style="padding: 12px; font-size: 12px; color: #64748b; text-align: center;">未找到匹配角色</div>`;
      searchDropdown.style.display = "block";
      return;
    }

    searchDropdown.innerHTML = matches.map(n => `
      <div class="search-item" onclick="window.triggerSelectNode('${n.id}')">
        <div class="search-item-info">
          <span class="search-item-name">${n.name}</span>
          <span class="search-item-role">${n.roleTitle}</span>
        </div>
        <span class="brand-badge" style="border-color:${n.factionInfo.color}; color:${n.factionInfo.color}">${n.factionInfo.name}</span>
      </div>
    `).join("");
    searchDropdown.style.display = "block";
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-wrapper")) {
      searchDropdown.style.display = "none";
    }
  });

  // 12. 悬浮工具坞 (Dock) 按钮功能
  document.getElementById("btn-zoom-in").addEventListener("click", () => {
    svg.transition().duration(300).call(zoom.scaleBy, 1.3);
  });

  document.getElementById("btn-zoom-out").addEventListener("click", () => {
    svg.transition().duration(300).call(zoom.scaleBy, 0.75);
  });

  document.getElementById("btn-reset-view").addEventListener("click", () => {
    svg.transition().duration(600).call(zoom.transform, d3.zoomIdentity);
  });

  document.getElementById("btn-toggle-physics").addEventListener("click", function () {
    isPhysicsPaused = !isPhysicsPaused;
    if (isPhysicsPaused) {
      simulation.stop();
      this.style.color = "#ef4444";
    } else {
      simulation.restart();
      this.style.color = "var(--text-main)";
    }
  });

  document.getElementById("btn-toggle-fullscreen").addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  });

  // 边塞大决战大图查看器
  document.getElementById("btn-epic-standoff").addEventListener("click", () => {
    window.openLightbox(GRAPH_DATA.meta.epicStandoffImage, "边塞跨时空大决战 · 现代特战小队与秦红缨宋军迎击金夏重装铁骑");
  });

  // 13. 16:9 灯箱模态框
  window.openLightbox = function (src, caption) {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || "";
    lightboxModal.classList.add("open");
  };

  lightboxCloseBtn.addEventListener("click", () => {
    lightboxModal.classList.remove("open");
  });

  lightboxModal.addEventListener("click", (e) => {
    if (e.target === lightboxModal) {
      lightboxModal.classList.remove("open");
    }
  });

  // 14. 拖拽交互
  function dragstarted(event, d) {
    if (!event.active && !isPhysicsPaused) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active && !isPhysicsPaused) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  // 窗口自适应
  window.addEventListener("resize", () => {
    width = container.clientWidth || window.innerWidth;
    height = container.clientHeight || window.innerHeight;
    svg.attr("viewBox", [0, 0, width, height]);
    simulation.force("center", d3.forceCenter(width / 2, height / 2)).restart();
  });

})();
