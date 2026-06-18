<!-- components/ServerList.vue -->
<template>
  <div class="server-list">
    <!-- 加载状态：骨架屏 -->
    <div v-if="isLoading" class="server-grid">
      <div v-for="n in 6" :key="n" class="server-card skeleton-card">
        <div class="card-header">
          <div class="server-icon-wrapper skeleton-block"></div>
          <div class="server-info">
            <div class="skeleton-line skeleton-line--title"></div>
            <div class="skeleton-tags">
              <span class="skeleton-line skeleton-line--tag"></span>
              <span class="skeleton-line skeleton-line--tag"></span>
              <span class="skeleton-line skeleton-line--tag"></span>
            </div>
          </div>
          <div class="skeleton-line skeleton-line--arrow"></div>
        </div>
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

        <!-- 第二行：类型快捷标签 + 只看在线 + 清除筛选 -->
        <div class="filters-secondary">
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
          </div>

          <label class="online-toggle">
            <input v-model="onlineOnly" type="checkbox" class="online-toggle__input" />
            <span class="online-toggle__box" aria-hidden="true"></span>
            <span class="online-toggle__label">只看在线</span>
          </label>

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
        <div ref="gridRef" class="server-grid">
          <div
            v-for="item in paginatedServers"
            :key="item.id"
            class="server-card"
            :class="{
              'server-card--expanded': isExpanded(item.id),
              'server-card--static': !item.hasDetails,
            }"
          >
            <!-- 头部：始终可见，点击展开 -->
            <button
              type="button"
              class="card-header"
              :disabled="!item.hasDetails"
              :aria-expanded="item.hasDetails ? isExpanded(item.id) : undefined"
              @click="item.hasDetails && toggleExpand(item.id)"
            >
              <div class="server-icon-wrapper">
                <VPImage
                  v-if="item.icon"
                  :image="item.icon"
                  class="server-icon"
                  loading="lazy"
                />
                <span v-else class="server-icon-fallback">{{ item.initial }}</span>
              </div>

              <div class="server-info">
                <h3 class="server-name">{{ item.name }}</h3>
                <div class="server-tags">
                  <div class="tags-container">
                    <span v-if="item.type" class="tag type-tag">{{ item.type }}</span>
                    <span v-if="item.version" class="tag version-tag">{{ item.version }}</span>
                    <template v-if="item.ip">
                      <span
                        class="tag status-tag"
                        :class="item.status.online ? 'online' : 'offline'"
                      >
                        <i
                          class="status-dot"
                          :class="{ 'status-dot--pulse': item.status.online }"
                        ></i>
                        {{ item.status.online ? '在线' : '离线' }}
                      </span>
                      <span
                        v-if="item.status.online && item.status.delay != null"
                        class="tag delay-tag"
                        :class="getDelayClass(item.status.delay)"
                      >
                        {{ Math.round(item.status.delay) }}ms
                      </span>
                      <span v-if="item.status.online" class="tag players-tag">
                        👥 {{ item.status.players.online }}/{{ item.status.players.max }}
                      </span>
                    </template>
                  </div>
                </div>
              </div>

              <svg
                v-if="item.hasDetails"
                class="expand-arrow"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path fill="currentColor" d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" />
              </svg>
            </button>

            <!-- 展开区 -->
            <div class="card-expand" :class="{ 'card-expand--open': isExpanded(item.id) }">
              <div class="card-expand__inner">
                <div class="card-expand__content">
                  <div v-if="item.descLines.length" class="server-description">
                    <span
                      v-for="(line, index) in item.descLines"
                      :key="index"
                      class="desc-line"
                    >
                      {{ line }}
                    </span>
                  </div>

                  <!-- 图片画廊：横向滚动，失败图片自动剔除 -->
                  <div v-if="hasVisiblePic(item)" class="gallery">
                    <template v-for="pic in item.pictures" :key="pic">
                      <div v-if="!isPicFailed(pic)" class="gallery-item">
                        <img
                          :src="pic"
                          :alt="`${item.name} 截图`"
                          loading="lazy"
                          class="gallery-img"
                          @error="markPicFailed(pic)"
                        />
                      </div>
                    </template>
                  </div>

                  <div v-if="item.ip" class="server-ip-row">
                    <span class="ip-label">地址</span>
                    <code class="ip-value">{{ item.ip }}</code>
                    <button
                      type="button"
                      class="copy-btn"
                      :class="{ 'copy-btn--copied': copiedIp === item.ip }"
                      @click="copyIp(item.ip)"
                    >
                      {{ copiedIp === item.ip ? '✓ 已复制' : '复制' }}
                    </button>
                  </div>

                  <a
                    v-if="item.link"
                    :href="item.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="visit-btn"
                  >
                    访问服务器
                    <svg class="visit-btn__icon" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M14 5v2h3.59l-9.83 9.83 1.41 1.41L19 8.41V12h2V5z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页器 -->
        <div class="pagination">
          <!-- 每页数量 -->
          <div class="pagination__size">
            <span>每页</span>
            <label class="custom-select custom-select--sm">
              <select v-model.number="pageSize" aria-label="每页显示数量">
                <option v-for="opt in pageSizeOptions" :key="opt" :value="opt">{{ opt }}</option>
              </select>
              <svg class="select-arrow" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M7 10l5 5 5-5z" />
              </svg>
            </label>
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
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { VPImage } from 'vitepress/theme'
import mediumZoom from 'medium-zoom'

const props = defineProps({
  apiUrl: {
    type: String,
    default: 'https://server-editor.mcjpg.dev/api/getjson',
  },
  fallbackApiUrls: {
    type: Array,
    default: () => ['https://serverlist.mcjpg.org/servers.json'],
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
  defaultPageSize: {
    type: Number,
    default: 9,
  },
  pageSizeOptions: {
    type: Array,
    default: () => [3, 6, 9, 15, 30],
  },
})

const searchQuery = ref('')
const selectedType = ref('')
const selectedVersion = ref('')
const onlineOnly = ref(false)
const shuffledServers = ref([])
const serverStatus = ref({})
const servers = ref([])
const serverTypes = ref([])
const serverVersions = ref([])
const isLoading = ref(true)
const loadError = ref(null)
const gridRef = ref(null)

// 展开状态
const expandedIds = ref(new Set())
const isExpanded = (id) => expandedIds.value.has(id)
const toggleExpand = (id) => {
  const next = new Set(expandedIds.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  expandedIds.value = next
}

// 复制 IP
const copiedIp = ref('')
let copyTimer = null
const copyIp = async (ip) => {
  if (!ip) return
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(ip)
    } else {
      const ta = document.createElement('textarea')
      ta.value = ip
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    copiedIp.value = ip
    clearTimeout(copyTimer)
    copyTimer = setTimeout(() => {
      copiedIp.value = ''
    }, 1600)
  } catch (e) {
    console.error('复制失败:', e)
  }
}

// 图片画廊
const failedPics = ref(new Set())
const isPicFailed = (url) => failedPics.value.has(url)
const markPicFailed = (url) => {
  if (!url || failedPics.value.has(url)) return
  const next = new Set(failedPics.value)
  next.add(url)
  failedPics.value = next
}
const hasVisiblePic = (item) =>
  Array.isArray(item.pictures) &&
  item.pictures.length > 0 &&
  item.pictures.some((p) => !failedPics.value.has(p))

// Medium Zoom 图片放大
let zoomInstance = null

// 卸载标志 + 请求中止控制器集合
let isUnmounted = false
const activeControllers = new Set()

// 离线兜底状态
const OFFLINE_STATUS = Object.freeze({
  online: false,
  players: { online: 0, max: 0 },
  delay: null,
  motd: '',
  version: '',
})

const statusOf = (ip) => serverStatus.value[ip] || OFFLINE_STATUS

// 处理图标：缺失/非法时返回 null
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

// 解析 picture 字段：兼容数组 / 空值，过滤非字符串
const pictureListOf = (server) => {
  const raw = server?.picture
  if (!Array.isArray(raw)) return []
  return raw
    .filter((p) => typeof p === 'string' && p.trim())
    .map((p) => p.trim())
}

const getDelayClass = (delay) => {
  if (delay == null) return 'medium'
  if (delay <= 100) return 'good'
  if (delay <= 300) return 'medium'
  return 'poor'
}

// 带超时 + 可中止的 fetch（受卸载控制）
const fetchWithTimeout = async (url, options = {}, timeout = props.requestTimeout) => {
  const controller = new AbortController()
  activeControllers.add(controller)
  const timer = setTimeout(() => controller.abort(), timeout)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timer)
    activeControllers.delete(controller)
  }
}

const checkServerStatus = async (ip) => {
  if (!ip || isUnmounted) return
  try {
    const encodedIp = encodeURIComponent(ip)
    const response = await fetchWithTimeout(`${props.statusApiUrl}?ip=${encodedIp}`, {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) throw new Error(`status ${response.status}`)
    const data = await response.json()

    if (isUnmounted) return // 卸载后不再写入

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
    if (isUnmounted) return
    if (error.name !== 'AbortError') {
      console.error(`检查服务器 ${ip} 状态时出错:`, error)
    }
    serverStatus.value[ip] = { ...OFFLINE_STATUS, players: { online: 0, max: 0 } }
  }
}

const checkAllStatus = async () => {
  const ips = servers.value.map((s) => s?.ip).filter(Boolean)
  const CONCURRENCY = 30
  for (let i = 0; i < ips.length; i += CONCURRENCY) {
    if (isUnmounted) return
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

const isServerOnline = (server) => Boolean(server?.ip && statusOf(server.ip).online)

const filteredServers = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()

  // 1. 先筛选
  const filtered = shuffledServers.value.filter((server) => {
    if (!server) return false
    const name = (server.name || '').toLowerCase()
    const desc = (server.description || '').toLowerCase()
    const matchesSearch = !q || name.includes(q) || desc.includes(q)
    const matchesType = !selectedType.value || server.type === selectedType.value
    const matchesVersion = !selectedVersion.value || server.version === selectedVersion.value

    // 只看在线
    if (onlineOnly.value && !isServerOnline(server)) return false

    return matchesSearch && matchesType && matchesVersion
  })

  // 2. 在线优先排序（带索引稳定排序：组内保持原 shuffle 顺序，避免跨浏览器乱跳）
  return filtered
    .map((server, index) => ({ server, index }))
    .sort((a, b) => {
      const diff = Number(isServerOnline(b.server)) - Number(isServerOnline(a.server))
      return diff !== 0 ? diff : a.index - b.index
    })
    .map((item) => item.server)
})

const onlineCount = computed(
  () => filteredServers.value.filter((s) => s?.ip && statusOf(s.ip).online).length
)

const hasActiveFilter = computed(
  () => Boolean(searchQuery.value || selectedType.value || selectedVersion.value || onlineOnly.value)
)

const resetFilters = () => {
  searchQuery.value = ''
  selectedType.value = ''
  selectedVersion.value = ''
  onlineOnly.value = false
}

// ===== 分页 =====
const pageSize = ref(props.defaultPageSize)
const currentPage = ref(1)
const jumpInput = ref('')

const totalPages = computed(() => Math.max(1, Math.ceil(filteredServers.value.length / pageSize.value)))

// 预计算当前页数据：图标 / 状态 / 描述行 / 图片 一次性算好，模板直接读，够快
const paginatedServers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredServers.value.slice(start, start + pageSize.value).map((server) => {
    const descLines = descriptionLines(server)
    const pictures = pictureListOf(server)
    return {
      id: server.id,
      name: server.name || '未命名服务器',
      link: server.link || '',
      ip: server.ip || '',
      type: server.type || '',
      version: server.version || '',
      icon: processedIcon(server),
      initial: initialOf(server.name),
      descLines,
      pictures,
      status: server.ip ? statusOf(server.ip) : OFFLINE_STATUS,
      // 是否存在可展开内容（描述 / 图片 / IP / 链接），没有就不看了
      hasDetails: Boolean(descLines.length || pictures.length || server.ip || server.link),
    }
  })
})

// 翻页后滚动到列表顶部（而非页面顶部），移动端体验更好
const scrollToGrid = () => {
  nextTick(() => {
    if (gridRef.value && typeof gridRef.value.scrollIntoView === 'function') {
      gridRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
}

const goToPage = (page) => {
  const target = Math.min(Math.max(1, page), totalPages.value)
  if (target === currentPage.value) return
  currentPage.value = target
  scrollToGrid()
}

const handleJump = () => {
  const n = parseInt(jumpInput.value, 10)
  if (!Number.isNaN(n)) goToPage(n)
  jumpInput.value = ''
}

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

watch([searchQuery, selectedType, selectedVersion, onlineOnly], () => {
  currentPage.value = 1
})
watch(pageSize, () => {
  currentPage.value = 1
})
watch(totalPages, (tp) => {
  if (currentPage.value > tp) currentPage.value = tp
})

// 翻页前清理旧的 zoom 绑定，避免内存泄漏
watch(paginatedServers, () => {
  if (zoomInstance) {
    zoomInstance.detach()
  }
}, { flush: 'pre' })

// DOM 更新后（翻页或展开）重新绑定当前可见的图片
watch([paginatedServers, expandedIds], () => {
  if (zoomInstance) {
    zoomInstance.attach('.gallery-img')
  }
}, { flush: 'post' })

const normalizeServers = (list) =>
  (Array.isArray(list) ? list : [])
    .filter((s) => s && typeof s === 'object')
    .map((s, idx) => ({ ...s, id: s.id ?? s.ip ?? s.name ?? `server-${idx}` }))

// 从单个端点拉取并解析服务器列表，成功返回 data，失败抛错（交由上层决定是否回退）
const fetchListFromEndpoint = async (url) => {
  const response = await fetchWithTimeout(url)
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
  return response.json()
}

// 应用拉取到的数据到响应式状态
const applyServerData = (data) => {
  servers.value = normalizeServers(Array.isArray(data) ? data : data.servers)

  serverTypes.value = Array.isArray(data.types)
    ? data.types
    : [...new Set(servers.value.map((s) => s.type).filter(Boolean))]

  serverVersions.value = Array.isArray(data.versions)
    ? data.versions
    : [...new Set(servers.value.map((s) => s.version).filter(Boolean))]

  shuffleServers()
  currentPage.value = 1
  expandedIds.value = new Set() // 数据刷新时收起所有卡片
  failedPics.value = new Set() // 数据刷新时清空图片失败记录
  checkAllStatus()
}

const fetchServerList = async () => {
  // 主端点 + 备用端点，按顺序构成故障转移列表（去重 + 过滤空值）
  const endpoints = [...new Set([props.apiUrl, ...(props.fallbackApiUrls || [])].filter(Boolean))]

  isLoading.value = true
  loadError.value = null

  let lastError = null

  for (let i = 0; i < endpoints.length; i++) {
    if (isUnmounted) return
    const url = endpoints[i]
    try {
      const data = await fetchListFromEndpoint(url)
      if (isUnmounted) return

      applyServerData(data)

      // 成功：若用的是备用端点，给出提示（可选）
      if (i > 0) {
        console.warn(`主端点不可用，已回退至备用端点：${url}`)
      }
      if (!isUnmounted) isLoading.value = false
      return
    } catch (error) {
      if (isUnmounted) return
      lastError = error
      console.error(`端点 ${url} 获取服务器列表失败:`, error)
      // 还有下一个端点则继续尝试
    }
  }

  // 全部端点均失败
  if (isUnmounted) return
  loadError.value =
    lastError?.name === 'AbortError'
      ? '请求超时，请检查网络后重试'
      : `所有端点均不可用：${lastError?.message || '未知错误'}`
  isLoading.value = false
}

let pollTimer = null

onMounted(async () => {
  // 初始化 medium-zoom
  zoomInstance = mediumZoom({
    background: 'var(--vp-c-bg)'
  })

  await fetchServerList()
  pollTimer = setInterval(() => {
    if (!isUnmounted && servers.value.length) checkAllStatus()
  }, props.pollInterval)
})

onUnmounted(() => {
  isUnmounted = true
  if (pollTimer) clearInterval(pollTimer)
  clearTimeout(copyTimer)
  // 清理 zoom 实例
  if (zoomInstance) {
    zoomInstance.detach()
    zoomInstance = null
  }
  // 中止所有进行中的请求
  activeControllers.forEach((c) => c.abort())
  activeControllers.clear()
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

.custom-select--sm {
  flex: 0 0 auto;
  min-width: 0;
}

.custom-select--sm select {
  padding: 7px 30px 7px 10px;
  height: 34px;
  font-size: 0.9em;
  border-radius: 8px;
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

/* ===== 第二行筛选：类型标签 + 只看在线 + 清除 ===== */
.filters-secondary {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
}

.type-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-right: auto;
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
  flex-shrink: 0;
  color: var(--vp-c-danger, var(--vp-c-red));
  border-color: transparent;
  background: transparent;
}

.chip--clear:hover {
  background: var(--vp-c-danger-soft, var(--vp-c-red-soft));
  border-color: transparent;
  color: var(--vp-c-danger, var(--vp-c-red));
}

/* ===== 只看在线 勾选框 ===== */
.online-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 0.82em;
  color: var(--vp-c-text-2);
  user-select: none;
  white-space: nowrap;
  flex-shrink: 0;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid transparent;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}

.online-toggle:has(.online-toggle__input:checked) {
  background: var(--vp-c-green-soft);
  border-color: var(--vp-c-green);
  color: var(--vp-c-green);
}

.online-toggle__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.online-toggle__box {
  width: 16px;
  height: 16px;
  border: 1.5px solid var(--vp-c-text-3);
  border-radius: 4px;
  background: var(--vp-c-bg);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.2s, border-color 0.2s;
}

.online-toggle__box::after {
  content: '';
  width: 4px;
  height: 8px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) scale(0);
  transition: transform 0.15s ease;
}

.online-toggle__input:checked + .online-toggle__box {
  background: var(--vp-c-green);
  border-color: var(--vp-c-green);
}

.online-toggle__input:checked + .online-toggle__box::after {
  border-color: #02941a;
  transform: rotate(45deg) scale(1);
}

.online-toggle__input:focus-visible + .online-toggle__box {
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.online-toggle:hover .online-toggle__box {
  border-color: var(--vp-c-green);
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
  scroll-margin-top: 64px;
  align-items: start; /* 展开时不撑高同行其他卡片 */
}

.server-card {
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg);
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.25s ease, border-color 0.25s ease;
}

.server-card:hover {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  border-color: var(--vp-c-brand);
}

.server-card--expanded {
  border-color: var(--vp-c-brand);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

/* ===== 卡片头部（可点击展开） ===== */
.card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 16px;
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  box-sizing: border-box;
  transition: background 0.2s ease;
}

.card-header:hover:not(:disabled) {
  background: var(--vp-c-bg-soft);
}

.card-header:disabled {
  cursor: default;
  opacity: 1;
}

.card-header:focus-visible {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: -2px;
}

.expand-arrow {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  color: var(--vp-c-text-3);
  transition: transform 0.3s ease, color 0.25s ease;
}

.server-card--expanded .expand-arrow {
  transform: rotate(180deg);
  color: var(--vp-c-brand);
}

.server-icon-wrapper {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
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
  font-size: 26px;
  font-weight: 700;
  color: var(--vp-c-brand);
}

.server-info {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.server-name {
  margin: 0;
  font-size: 1.15em;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

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
  --pulse-color: var(--vp-c-green);
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
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--pulse-color, currentColor) 50%, transparent);
  }
  70% {
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--pulse-color, currentColor) 0%, transparent);
  }
  100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--pulse-color, currentColor) 0%, transparent);
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

/* 展开区*/
.card-expand {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.32s ease;
}

.card-expand--open {
  grid-template-rows: 1fr;
}

.card-expand__inner {
  overflow: hidden;
  min-height: 0;
}

.card-expand__content {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 14px 16px 16px;
  border-top: 1px dashed var(--vp-c-divider);
}

.server-description {
  margin: 0;
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  overflow-wrap: break-word;
  word-break: break-word;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.desc-line {
  display: block;
}

/* 图片画廊：横向滚动 */
.gallery {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 2px 2px 8px;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x proximity;
  /* 隐藏 Firefox 滚动条间距带来的抖动 */
  scrollbar-width: thin;
  scrollbar-color: var(--vp-c-divider) transparent;
}

.gallery::-webkit-scrollbar {
  height: 6px;
}

.gallery::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 3px;
}

.gallery::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 3px;
}

.gallery::-webkit-scrollbar-thumb:hover {
  background: var(--vp-c-text-3);
}

.gallery-item {
  flex: 0 0 auto;
  width: 180px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  scroll-snap-align: start;
  position: relative;
}

.gallery-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: zoom-in; /* 提示可点击放大 */
  transition: transform 0.3s ease;
}

.gallery-item:hover .gallery-img {
  transform: scale(1.04);
}

/* IP 地址 + 复制 */
.server-ip-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.ip-label {
  font-size: 0.78em;
  font-weight: 600;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.ip-value {
  flex: 1 1 140px;
  min-width: 0;
  padding: 6px 10px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.82em;
  color: var(--vp-c-text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.copy-btn {
  flex-shrink: 0;
  padding: 6px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.8em;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.copy-btn--copied {
  background: var(--vp-c-green-soft);
  border-color: var(--vp-c-green);
  color: var(--vp-c-green);
}

/* 访问按钮*/
.visit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  align-self: flex-start;
  padding: 10px 18px;
  border-radius: 10px;
  background: var(--vp-c-brand);
  color: #fff;
  font-size: 0.9em;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s ease, transform 0.1s ease;
}

.visit-btn:hover {
  opacity: 0.9;
}

.visit-btn:active {
  transform: scale(0.98);
}

.visit-btn__icon {
  width: 16px;
  height: 16px;
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

.skeleton-line--arrow {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  border-radius: 6px;
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

.jump-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

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
  }

  .card-header {
    padding: 12px;
    gap: 12px;
  }

  .server-icon-wrapper {
    width: 52px;
    height: 52px;
  }

  .server-icon-fallback {
    font-size: 22px;
  }

  .server-name {
    font-size: 1.05em;
  }

  .tag {
    padding: 2px 6px;
    font-size: 0.75em;
  }

  .card-expand__content {
    padding: 12px 12px 14px;
    gap: 12px;
  }

  .server-description {
    font-size: 0.85em;
  }

  /* 移动端：画廊图片略小，更易横向滑动浏览 */
  .gallery {
    gap: 6px;
    /* 让画廊在卡片内横向溢出，贴边滚动 */
    margin: 0 -12px;
    padding: 2px 12px 8px;
  }

  .gallery-item {
    width: 150px;
    height: 100px;
  }

  /* 移动端：访问按钮整行铺满，更易点击 */
  .visit-btn {
    align-self: stretch;
    padding: 11px 18px;
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