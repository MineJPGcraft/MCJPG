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
        <!-- 第一行：搜索 + 版本 -->
        <div class="filters-row">
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
            <label class="custom-select">
              <select v-model="selectedVersion" aria-label="筛选版本">
                <option value="">所有版本</option>
                <option v-for="version in serverVersions" :key="version" :value="version">
                  {{ version }}
                </option>
              </select>
              <svg class="select-arrow" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M7 10l5 5 5-5z" />
              </svg>
            </label>
          </div>
        </div>

        <!-- 第二行：类型快捷标签 -->
        <div v-if="serverTypes.length" class="type-chips">
          <button
            class="chip"
            :class="{ 'chip--active': selectedType === '' }"
            @click="selectedType = ''"
          >
            全部类型
          </button>
          <button
            v-for="type in serverTypes"
            :key="type"
            class="chip"
            :class="{ 'chip--active': selectedType === type }"
            @click="selectedType = selectedType === type ? '' : type"
          >
            {{ type }}
          </button>

          <button v-if="hasActiveFilter" class="chip chip--clear" @click="resetFilters">
            ✕ 清除筛选
          </button>
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
      <template v-else>
        <div class="server-grid">
          <a
            v-for="server in paginatedServers"
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
                        <i
                          class="status-dot"
                          :class="{ 'status-dot--pulse': statusOf(server.ip).online }"
                        ></i>
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
              <span
                v-for="(line, index) in descriptionLines(server)"
                :key="index"
                class="desc-line"
              >
                {{ line }}
              </span>
            </div>
          </a>
        </div>

        <!-- 分页器 -->
        <div class="pagination">
          <!-- 每页数量 -->
          <div class="pagination__size">
            <span>每页</span>
            <select v-model.number="pageSize" class="page-size-select" aria-label="每页显示数量">
              <option v-for="opt in pageSizeOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>
            <span>个</span>
          </div>

          <!-- 页码导航 -->
          <div v-if="totalPages > 1" class="pagination__nav">
            <button class="page-btn" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
              ‹
            </button>

            <button
              v-for="page in visiblePages"
              :key="page.key"
              class="page-btn"
              :class="{
                'page-btn--active': page.value === currentPage,
                'page-btn--ellipsis': page.value == null,
              }"
              :disabled="page.value == null"
              @click="page.value != null && goToPage(page.value)"
            >
              {{ page.label }}
            </button>

            <button
              class="page-btn"
              :disabled="currentPage === totalPages"
              @click="goToPage(currentPage + 1)"
            >
              ›
            </button>
          </div>

          <!-- 跳转 -->
          <div v-if="totalPages > 1" class="pagination__jump">
            <span>跳至</span>
            <input
              v-model="jumpInput"
              type="number"
              min="1"
              :max="totalPages"
              class="jump-input"
              aria-label="跳转到指定页"
              @keyup.enter="handleJump"
            />
            <span>页</span>
            <button class="page-btn jump-btn" @click="handleJump">确定</button>
            <span class="pagination__total">共 {{ totalPages }} 页</span>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
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
  // 默认每页数量
  defaultPageSize: {
    type: Number,
    default: 9,
  },
  // 可选的每页数量列表
  pageSizeOptions: {
    type: Array,
    default: () => [3, 6, 9, 12, 15],
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

// 离线兜底状态
const OFFLINE_STATUS = Object.freeze({
  online: false,
  players: { online: 0, max: 0 },
  delay: null,
  motd: '',
  version: '',
})

const statusOf = (ip) => serverStatus.value[ip] || OFFLINE_STATUS

// 处理图标：缺失/非法时返回 null，由模板降级为首字母
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

const initialOf = (name) => (name ? String(name).trim().charAt(0).toUpperCase() : '?')

const descriptionLines = (server) => {
  const desc = server?.description
  if (typeof desc !== 'string' || !desc.trim()) return []
  return desc.split('\n').map((s) => s.trim()).filter(Boolean)
}

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

// 批量检查（控制并发）
const checkAllStatus = async () => {
  const ips = servers.value.map((s) => s?.ip).filter(Boolean)
  const CONCURRENCY = 5
  for (let i = 0; i < ips.length; i += CONCURRENCY) {
    const batch = ips.slice(i, i + CONCURRENCY)
    await Promise.allSettled(batch.map((ip) => checkServerStatus(ip)))
  }
}

const shuffleServers = () => {
  const array = [...servers.value]
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  shuffledServers.value = array
}

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

// ===== 分页 =====
const pageSize = ref(props.defaultPageSize)
const currentPage = ref(1)
const jumpInput = ref('')

const totalPages = computed(() => Math.max(1, Math.ceil(filteredServers.value.length / pageSize.value)))

const paginatedServers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredServers.value.slice(start, start + pageSize.value)
})

const goToPage = (page) => {
  const target = Math.min(Math.max(1, page), totalPages.value)
  if (target === currentPage.value) return
  currentPage.value = target
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const handleJump = () => {
  const n = parseInt(jumpInput.value, 10)
  if (!Number.isNaN(n)) goToPage(n)
  jumpInput.value = ''
}

// 智能页码：首页、末页、当前页±1，超出用省略号
const visiblePages = computed(() => {
  const total = totalPages.value
  const cur = currentPage.value
  const pages = []
  const push = (value, label = value, key = `p-${value}`) => pages.push({ value, label, key })

  if (total <= 7) {
    for (let i = 1; i <= total; i++) push(i)
    return pages
  }

  push(1)
  if (cur > 3) push(null, '…', 'left-ellipsis')

  const start = Math.max(2, cur - 1)
  const end = Math.min(total - 1, cur + 1)
  for (let i = start; i <= end; i++) push(i)

  if (cur < total - 2) push(null, '…', 'right-ellipsis')
  push(total)
  return pages
})

// 搜索/筛选变化时回到第 1 页
watch([searchQuery, selectedType, selectedVersion], () => {
  currentPage.value = 1
})
// 每页数量变化时回到第 1 页
watch(pageSize, () => {
  currentPage.value = 1
})
// 总页数变化时校正当前页
watch(totalPages, (tp) => {
  if (currentPage.value > tp) currentPage.value = tp
})

const normalizeServers = (list) =>
  (Array.isArray(list) ? list : [])
    .filter((s) => s && typeof s === 'object')
    .map((s, idx) => ({ ...s, id: s.id ?? s.ip ?? s.name ?? `server-${idx}` }))

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
    currentPage.value = 1
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
  gap: 14px;
  margin-bottom: 20px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  width: 100%;
  box-sizing: border-box;
}

.filters-row {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

/* 搜索框 */
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
  transition: color 0.25s;
}

.search-wrapper:focus-within .search-icon {
  color: var(--vp-c-brand);
}

.search-input {
  width: 100%;
  padding: 10px 38px 10px 40px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  box-sizing: border-box;
  font-size: 0.95em;
  transition: border-color 0.25s, box-shadow 0.25s;
}

.search-input::placeholder {
  color: var(--vp-c-text-3);
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
  transition: background 0.2s, color 0.2s;
}

.search-clear:hover {
  background: var(--vp-c-danger-soft, var(--vp-c-red-soft));
  color: var(--vp-c-danger, var(--vp-c-red));
}

/* 自定义下拉框 */
.select-wrapper {
  display: flex;
  gap: 8px;
  width: 100%;
}

.custom-select {
  position: relative;
  flex: 1;
  min-width: 140px;
  display: block;
}

.custom-select select {
  width: 100%;
  padding: 10px 36px 10px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.95em;
  cursor: pointer;
  box-sizing: border-box;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  transition: border-color 0.25s, box-shadow 0.25s;
}

.custom-select select:hover {
  border-color: var(--vp-c-brand);
}

.custom-select select:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.select-arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--vp-c-text-3);
  pointer-events: none;
  transition: color 0.25s;
}

.custom-select:focus-within .select-arrow {
  color: var(--vp-c-brand);
}

/* 类型快捷标签 */
.type-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.chip {
  padding: 5px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.82em;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.chip:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.chip--active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: #fff;
}

.chip--active:hover {
  color: #fff;
  opacity: 0.9;
}

.chip--clear {
  margin-left: auto;
  color: var(--vp-c-danger, var(--vp-c-red));
  border-color: transparent;
  background: transparent;
}

.chip--clear:hover {
  background: var(--vp-c-danger-soft, var(--vp-c-red-soft));
  border-color: transparent;
  color: var(--vp-c-danger, var(--vp-c-red));
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

/* 标签：自动换行，不再横向滚动 */
.server-tags {
  width: 100%;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  width: 100%;
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

/* ===== 分页器 ===== */
.pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
  font-size: 0.85em;
  color: var(--vp-c-text-2);
}

.pagination__size,
.pagination__jump {
  display: flex;
  align-items: center;
  gap: 6px;
}

.pagination__nav {
  display: flex;
  align-items: center;
  gap: 6px;
}

.pagination__total {
  color: var(--vp-c-text-3);
  margin-left: 4px;
}

.page-btn {
  min-width: 34px;
  height: 34px;
  padding: 0 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 1em;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled):not(.page-btn--ellipsis) {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.page-btn--active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: #fff;
}

.page-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.page-btn--ellipsis {
  border: none;
  background: transparent;
  cursor: default;
  min-width: 24px;
  padding: 0;
}

.jump-btn {
  font-size: 0.85em;
}

.page-size-select {
  height: 34px;
  padding: 0 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.jump-input {
  width: 56px;
  height: 34px;
  padding: 0 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  text-align: center;
  box-sizing: border-box;
}

.jump-input:focus,
.page-size-select:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

/* 去掉数字输入框的上下箭头 */
.jump-input::-webkit-outer-spin-button,
.jump-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.jump-input {
  -moz-appearance: textfield;
}

/* ===== 响应式 ===== */
@media (min-width: 640px) {
  .filters-row {
    flex-direction: row;
    align-items: center;
  }

  .search-wrapper {
    flex: 1;
    max-width: 450px;
  }

  .select-wrapper {
    flex: 0 0 auto;
    width: auto;
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

  .filters {
    padding: 12px;
  }
  .custom-select {
    min-width: 0;
  }
  .chip {
    padding: 4px 12px;
    font-size: 0.78em;
  }

  .server-description {
    font-size: 0.85em;
  }

  .pagination {
    gap: 12px;
  }

  .page-btn {
    min-width: 30px;
    height: 30px;
    padding: 0 6px;
  }
}
</style>