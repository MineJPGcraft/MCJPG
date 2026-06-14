<!-- components/ServerList.vue -->
<template>
  <div class="server-list">
    <!-- 加载状态：骨架屏 -->
    <div v-if="isLoading" class="server-grid">
      <div v-for="n in 6" :key="n" class="server-card skeleton-card">
        <div class="card-content">
          <div class="server-icon-wrapper skeleton-block"></div>
          <div class="server-info">
            <div class="skeleton-line skeleton-line--title"></div>
            <div class="skeleton-tags">
              <span class="skeleton-line skeleton-line--tag"></span>
              <span class="skeleton-line skeleton-line--tag"></span>
              <span class="skeleton-line skeleton-line--tag"></span>
            </div>
          </div>
        </div>
        <div class="skeleton-line skeleton-line--desc"></div>
        <div class="skeleton-line skeleton-line--desc skeleton-line--short"></div>
      </div>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="loadError" class="status-state error-state">
      <div class="status-icon">⚠️</div>
      <p class="status-title">加载失败</p>
      <p class="status-desc">{{ loadError }}</p>
      <button @click="fetchServerList" class="retry-button">重新加载</button>
    </div>

    <!-- 正常内容 -->
    <template v-else>
      <!-- 搜索和筛选 -->
      <div class="filters">
        <div class="search-wrapper">
          <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14"
            />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索服务器名称或简介..."
            class="search-input"
            aria-label="搜索服务器"
          />
          <button
            v-if="searchQuery"
            class="search-clear"
            aria-label="清空搜索"
            @click="searchQuery = ''"
          >
            ×
          </button>
        </div>
        <div class="select-wrapper">
          <select v-model="selectedType" class="filter-select" aria-label="筛选类型">
            <option value="">所有类型</option>
            <option v-for="type in serverTypes" :key="type" :value="type">{{ type }}</option>
          </select>
          <select v-model="selectedVersion" class="filter-select" aria-label="筛选版本">
            <option value="">所有版本</option>
            <option v-for="version in serverVersions" :key="version" :value="version">
              {{ version }}
            </option>
          </select>
        </div>
      </div>

      <!-- 结果统计 -->
      <div class="result-meta">
        共 <strong>{{ filteredServers.length }}</strong> 个服务器
        <span v-if="onlineCount > 0" class="result-meta__online">· {{ onlineCount }} 个在线</span>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredServers.length === 0" class="status-state empty-state">
        <div class="status-icon">🔍</div>
        <p class="status-title">没有找到匹配的服务器</p>
        <p class="status-desc">试试调整搜索关键词或筛选条件</p>
        <button v-if="hasActiveFilter" class="retry-button" @click="resetFilters">清除筛选</button>
      </div>

      <!-- 服务器卡片列表 -->
      <div v-else class="server-grid">
        <a
          v-for="server in filteredServers"
          :key="server.id"
          :href="server.link || undefined"
          :target="server.link ? '_blank' : undefined"
          rel="noopener noreferrer"
          class="server-card"
          :class="{ 'server-card--disabled': !server.link }"
        >
          <div class="card-content">
            <div class="server-icon-wrapper">
              <VPImage
                v-if="processedIcon(server)"
                :image="processedIcon(server)"
                class="server-icon"
                loading="lazy"
              />
              <span v-else class="server-icon-fallback">{{ initialOf(server.name) }}</span>
            </div>
            <div class="server-info">
              <h3 class="server-name">{{ server.name || '未命名服务器' }}</h3>
              <div class="server-tags">
                <div class="tags-container">
                  <span v-if="server.type" class="tag type-tag">{{ server.type }}</span>
                  <span v-if="server.version" class="tag version-tag">{{ server.version }}</span>
                  <template v-if="server.ip">
                    <span
                      class="tag status-tag"
                      :class="statusOf(server.ip).online ? 'online' : 'offline'"
                    >
                      <i class="status-dot" :class="{ 'status-dot--pulse': statusOf(server.ip).online }"></i>
                      {{ statusOf(server.ip).online ? '在线' : '离线' }}
                    </span>
                    <span
                      v-if="statusOf(server.ip).online && statusOf(server.ip).delay != null"
                      class="tag delay-tag"
                      :class="getDelayClass(statusOf(server.ip).delay)"
                    >
                      {{ Math.round(statusOf(server.ip).delay) }}ms
                    </span>
                    <span v-if="statusOf(server.ip).online" class="tag players-tag">
                      👥 {{ statusOf(server.ip).players.online }}/{{ statusOf(server.ip).players.max }}
                    </span>
                  </template>
                </div>
              </div>
            </div>
          </div>

          <div v-if="descriptionLines(server).length" class="server-description">
            <span v-for="(line, index) in descriptionLines(server)" :key="index" class="desc-line">
              {{ line }}
            </span>
          </div>
        </a>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { VPImage } from 'vitepress/theme'

const props = defineProps({
  apiUrl: {
    type: String,
    default: 'https://serverlist.mcjpg.org/servers.json',
  },
  statusApiUrl: {
    type: String,
    default: 'https://serverstatus.mcjpg.org/',
  },
  pollInterval: {
    type: Number,
    default: 60000,
  },
  requestTimeout: {
    type: Number,
    default: 10000,
  },
})

const searchQuery = ref('')
const selectedType = ref('')
const selectedVersion = ref('')
const shuffledServers = ref([])
const serverStatus = ref({})
const servers = ref([])
const serverTypes = ref([])
const serverVersions = ref([])
const isLoading = ref(true)
const loadError = ref(null)

// 离线兜底状态，避免模板里反复判空
const OFFLINE_STATUS = Object.freeze({
  online: false,
  players: { online: 0, max: 0 },
  delay: null,
  motd: '',
  version: '',
})

// 统一获取某个 ip 的状态（永远返回完整结构）
const statusOf = (ip) => serverStatus.value[ip] || OFFLINE_STATUS

// 处理图标数据：缺失/非法时返回 null，由模板降级为首字母
const processedIcon = (server) => {
  if (!server) return null
  const icon = server.icon
  if (typeof icon === 'string' && icon.trim()) {
    return { src: icon, alt: server.name || '', width: 64, height: 64, style: 'object-fit: contain' }
  }
  if (icon && typeof icon === 'object' && icon.src) {
    return {
      src: icon.src,
      alt: icon.alt || server.name || '',
      width: icon.width || 64,
      height: icon.height || 64,
      style: 'object-fit: contain',
    }
  }
  return null
}

// 图标降级：取名称首字母
const initialOf = (name) => (name ? String(name).trim().charAt(0).toUpperCase() : '?')

// 安全拆分描述
const descriptionLines = (server) => {
  const desc = server?.description
  if (typeof desc !== 'string' || !desc.trim()) return []
  return desc.split('\n').map((s) => s.trim()).filter(Boolean)
}

// 延迟等级
const getDelayClass = (delay) => {
  if (delay == null) return 'medium'
  if (delay <= 100) return 'good'
  if (delay <= 300) return 'medium'
  return 'poor'
}

// 带超时的 fetch
const fetchWithTimeout = async (url, options = {}, timeout = props.requestTimeout) => {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

// 检查单个服务器状态
const checkServerStatus = async (ip) => {
  if (!ip) return
  try {
    const encodedIp = encodeURIComponent(ip)
    const response = await fetchWithTimeout(`${props.statusApiUrl}?ip=${encodedIp}`, {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) throw new Error(`status ${response.status}`)
    const data = await response.json()

    serverStatus.value[ip] = {
      online: Boolean(data.online),
      players: {
        online: Number(data.players?.online) || 0,
        max: Number(data.players?.max) || 0,
      },
      delay: typeof data.delay === 'number' ? data.delay : null,
      motd: data.motd?.plain || '',
      version: data.version || '',
    }
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error(`检查服务器 ${ip} 状态时出错:`, error)
    }
    serverStatus.value[ip] = { ...OFFLINE_STATUS, players: { online: 0, max: 0 } }
  }
}

// 批量检查（控制并发，避免一次性打爆接口）
const checkAllStatus = async () => {
  const ips = servers.value.map((s) => s?.ip).filter(Boolean)
  const CONCURRENCY = 5
  for (let i = 0; i < ips.length; i += CONCURRENCY) {
    const batch = ips.slice(i, i + CONCURRENCY)
    await Promise.allSettled(batch.map((ip) => checkServerStatus(ip)))
  }
}

// 随机排序（Fisher–Yates）
const shuffleServers = () => {
  const array = [...servers.value]
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  shuffledServers.value = array
}

// 过滤后的列表（全程判空）
const filteredServers = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return shuffledServers.value.filter((server) => {
    if (!server) return false
    const name = (server.name || '').toLowerCase()
    const desc = (server.description || '').toLowerCase()
    const matchesSearch = !q || name.includes(q) || desc.includes(q)
    const matchesType = !selectedType.value || server.type === selectedType.value
    const matchesVersion = !selectedVersion.value || server.version === selectedVersion.value
    return matchesSearch && matchesType && matchesVersion
  })
})

const onlineCount = computed(
  () => filteredServers.value.filter((s) => s?.ip && statusOf(s.ip).online).length
)

const hasActiveFilter = computed(
  () => Boolean(searchQuery.value || selectedType.value || selectedVersion.value)
)

const resetFilters = () => {
  searchQuery.value = ''
  selectedType.value = ''
  selectedVersion.value = ''
}

// 规范化服务器数据：确保 id 存在
const normalizeServers = (list) =>
  (Array.isArray(list) ? list : [])
    .filter((s) => s && typeof s === 'object')
    .map((s, idx) => ({ ...s, id: s.id ?? s.ip ?? s.name ?? `server-${idx}` }))

// 获取服务器列表
const fetchServerList = async () => {
  try {
    isLoading.value = true
    loadError.value = null

    const response = await fetchWithTimeout(props.apiUrl)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

    const data = await response.json()
    servers.value = normalizeServers(Array.isArray(data) ? data : data.servers)

    serverTypes.value = Array.isArray(data.types)
      ? data.types
      : [...new Set(servers.value.map((s) => s.type).filter(Boolean))]

    serverVersions.value = Array.isArray(data.versions)
      ? data.versions
      : [...new Set(servers.value.map((s) => s.version).filter(Boolean))]

    shuffleServers()
    checkAllStatus()
  } catch (error) {
    console.error('获取服务器列表失败:', error)
    loadError.value = error.name === 'AbortError' ? '请求超时，请检查网络后重试' : error.message
  } finally {
    isLoading.value = false
  }
}

let pollTimer = null

onMounted(async () => {
  await fetchServerList()
  pollTimer = setInterval(() => {
    if (servers.value.length) checkAllStatus()
  }, props.pollInterval)
})

onUnmounted(() => {
  if (pollTimer) clearInterval(pollTimer)
})
</script>

<style scoped>
.server-list {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}

/* ===== 状态页（错误 / 空） ===== */
.status-state {
  text-align: center;
  padding: 56px 20px;
  color: var(--vp-c-text-2);
}

.status-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.status-title {
  font-size: 1.1em;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 6px;
}

.status-desc {
  margin: 0 0 18px;
  font-size: 0.9em;
}

.error-state .status-desc {
  color: var(--vp-c-danger, var(--vp-c-red));
  word-break: break-word;
}

.retry-button {
  padding: 8px 20px;
  background-color: var(--vp-c-brand);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9em;
  transition: opacity 0.25s, transform 0.1s;
}

.retry-button:hover {
  opacity: 0.85;
}

.retry-button:active {
  transform: scale(0.97);
}

/* ===== 筛选区 ===== */
.filters {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  width: 100%;
}

.search-wrapper {
  position: relative;
  flex: 1;
  min-width: 200px;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--vp-c-text-3);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 9px 36px 9px 38px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  box-sizing: border-box;
  transition: border-color 0.25s, box-shadow 0.25s;
}

.search-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.search-clear {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-clear:hover {
  background: var(--vp-c-divider);
}

.select-wrapper {
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  width: 100%;
}

.filter-select {
  padding: 9px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  flex: 1;
  min-width: 120px;
  box-sizing: border-box;
  max-width: 100%;
  cursor: pointer;
  transition: border-color 0.25s;
}

.filter-select:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.result-meta {
  font-size: 0.85em;
  color: var(--vp-c-text-3);
  margin-bottom: 18px;
}

.result-meta__online {
  color: var(--vp-c-green);
}

/* ===== 卡片网格 ===== */
.server-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
}

.server-card {
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  background: var(--vp-c-bg);
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.server-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand);
}

.server-card--disabled {
  cursor: default;
}

.server-card--disabled:hover {
  transform: none;
  border-color: var(--vp-c-divider);
}

.card-content {
  display: flex;
  gap: 16px;
  width: 100%;
  overflow: hidden;
}

.server-icon-wrapper {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: 10px;
  overflow: hidden;
  background-color: var(--vp-c-bg-soft);
  display: flex;
  align-items: center;
  justify-content: center;
}

.server-icon {
  width: 100%;
  height: 100%;
}

.server-icon :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain !important;
}

.server-icon-fallback {
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-brand);
}

.server-info {
  flex: 1;
  min-width: 0;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.server-name {
  margin: 0;
  font-size: 1.2em;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.server-tags {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.server-tags::-webkit-scrollbar {
  display: none;
}

.tags-container {
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  min-height: 22px;
  align-items: center;
  width: max-content;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 0.8em;
  line-height: 1.4;
  white-space: nowrap;
  font-weight: 500;
}

.type-tag {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
}

.version-tag {
  background-color: var(--vp-c-green-soft);
  color: var(--vp-c-green);
}

.status-tag.online {
  background-color: var(--vp-c-green-soft);
  color: var(--vp-c-green);
}

.status-tag.offline {
  background-color: var(--vp-c-red-soft);
  color: var(--vp-c-red);
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
  display: inline-block;
}

.status-dot--pulse {
  box-shadow: 0 0 0 0 currentColor;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5);
  }
  70% {
    box-shadow: 0 0 0 5px rgba(34, 197, 94, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}

.delay-tag.good {
  background-color: var(--vp-c-green-soft);
  color: var(--vp-c-green);
}

.delay-tag.medium {
  background-color: var(--vp-c-yellow-soft);
  color: var(--vp-c-yellow);
}

.delay-tag.poor {
  background-color: var(--vp-c-red-soft);
  color: var(--vp-c-red);
}

.players-tag {
  background-color: var(--vp-c-gray-soft);
  color: var(--vp-c-text-2);
}

.server-description {
  margin: 0;
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  overflow-wrap: break-word;
  word-break: break-word;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.desc-line {
  display: block;
}

/* ===== 骨架屏 ===== */
.skeleton-card {
  pointer-events: none;
}

.skeleton-block,
.skeleton-line {
  background: linear-gradient(
    90deg,
    var(--vp-c-bg-soft) 25%,
    var(--vp-c-divider) 37%,
    var(--vp-c-bg-soft) 63%
  );
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
  border-radius: 6px;
}

.skeleton-line {
  height: 12px;
  width: 100%;
}

.skeleton-line--title {
  height: 18px;
  width: 60%;
}

.skeleton-line--tag {
  height: 16px;
  width: 48px;
  border-radius: 6px;
}

.skeleton-line--desc {
  margin-top: 4px;
}

.skeleton-line--short {
  width: 70%;
}

.skeleton-tags {
  display: flex;
  gap: 6px;
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

/* ===== 响应式 ===== */
@media (min-width: 640px) {
  .filters {
    flex-direction: row;
    align-items: center;
  }

  .search-wrapper {
    max-width: 450px;
  }

  .select-wrapper {
    flex: 1;
    justify-content: flex-start;
  }
}

@media (max-width: 640px) {
  .server-list {
    padding: 8px;
  }

  .server-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 0;
    width: 100%;
  }

  .server-card {
    margin: 0;
    min-width: unset;
    max-width: 100%;
    padding: 12px;
  }

  .card-content {
    gap: 12px;
  }

  .tag {
    padding: 2px 6px;
    font-size: 0.75em;
  }

  .select-wrapper {
    flex-wrap: wrap;
  }

  .filter-select {
    min-width: calc(50% - 4px);
  }

  .server-description {
    font-size: 0.85em;
  }
}
</style>