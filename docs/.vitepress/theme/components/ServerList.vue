<!-- components/ServerList.vue -->
<template>
  <div class="server-list">
    <!-- 搜索和筛选部分 -->
    <div class="filters">
      <div class="search-wrapper">
        <input v-model="searchQuery" type="text" placeholder="搜索服务器..." class="search-input" />
      </div>
      <div class="select-wrapper">
        <select v-model="selectedType" class="filter-select">
          <option value="">所有类型</option>
          <option v-for="type in serverTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
        <select v-model="selectedVersion" class="filter-select">
          <option value="">所有版本</option>
          <option v-for="version in serverVersions" :key="version" :value="version">
            {{ version }}
          </option>
        </select>
      </div>
    </div>

    <!-- 服务器卡片列表 -->
    <div class="server-grid">
      <a
        v-for="server in filteredServers"
        :key="server.id"
        :href="server.link"
        target="_blank"
        rel="noopener noreferrer"
        class="server-card"
      >
        <div class="card-content">
          <div class="server-icon-wrapper">
            <VPImage :image="processedIcon(server)" class="server-icon" loading="lazy" />
          </div>
          <div class="server-info">
            <h3 class="server-name">{{ server.name }}</h3>
            <div class="server-tags">
              <div class="tags-container">
                <span class="tag type-tag">{{ server.type }}</span>
                <span class="tag version-tag">{{ server.version }}</span>
                <template v-if="server.ip">
                  <span
                    class="tag status-tag"
                    :class="{
                      online: serverStatus[server.ip]?.online,
                      offline: !serverStatus[server.ip]?.online,
                    }"
                  >
                    {{ serverStatus[server.ip]?.online ? '在线' : '离线' }}
                  </span>
                  <span
                    v-if="serverStatus[server.ip]?.online && serverStatus[server.ip]?.delay"
                    class="tag delay-tag"
                    :class="getDelayClass(serverStatus[server.ip]?.delay)"
                  >
                    {{ Math.round(serverStatus[server.ip]?.delay) }}ms
                  </span>
                  <span v-if="serverStatus[server.ip]?.online" class="tag players-tag">
                    {{ serverStatus[server.ip]?.players.online }}/{{
                      serverStatus[server.ip]?.players.max
                    }}
                  </span>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div v-for="descriptionPart in server.description.split('\n')">
            <span>{{ descriptionPart }}</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { VPImage } from 'vitepress/theme'
import { servers, serverTypes, serverVersions } from '../data/serverlist'

const searchQuery = ref('')
const selectedType = ref('')
const selectedVersion = ref('')
const shuffledServers = ref([...servers])
const serverStatus = ref({})

// 轮询间隔（60秒）
const POLL_INTERVAL = 60000

// 处理图标数据的函数
const processedIcon = (server) => {
  if (typeof server.icon === 'string') {
    return {
      src: server.icon,
      alt: server.name,
      width: 64,
      height: 64,
      style: 'object-fit: contain',
    }
  } else {
    return {
      src: server.icon.src,
      alt: server.icon.alt || server.name,
      width: server.icon.width || 64,
      height: server.icon.height || 64,
      style: 'object-fit: contain',
    }
  }
}

// 获取延迟等级的函数
const getDelayClass = (delay) => {
  if (delay <= 100) return 'good'
  if (delay <= 300) return 'medium'
  return 'poor'
}

// 检查服务器状态的函数
const checkServerStatus = async (ip) => {
  try {
    const encodedIp = encodeURIComponent(ip)
    const response = await fetch(`https://serverstatus.mcjpg.org/?ip=${encodedIp}`, {
      headers: {
        Accept: 'application/json',
      },
    })
    const data = await response.json()

    if (response.ok) {
      serverStatus.value[ip] = {
        online: data.online,
        players: {
          online: data.players?.online || 0,
          max: data.players?.max || 0,
        },
        delay: data.delay,
        motd: data.motd?.plain || '',
        version: data.version || '',
      }
    } else {
      throw new Error('Server status check failed')
    }
  } catch (error) {
    console.error(`检查服务器 ${ip} 状态时出错:`, error)
    serverStatus.value[ip] = {
      online: false,
      players: { online: 0, max: 0 },
      delay: null,
      motd: '',
      version: '',
    }
  }
}

// 随机排序函数
const shuffleServers = () => {
  const array = [...servers]
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  shuffledServers.value = array
}

// 过滤后的服务器列表
const filteredServers = computed(() => {
  return shuffledServers.value.filter((server) => {
    const matchesSearch =
      server.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      server.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesType = !selectedType.value || server.type === selectedType.value
    const matchesVersion = !selectedVersion.value || server.version === selectedVersion.value
    return matchesSearch && matchesType && matchesVersion
  })
})

// 初始化和轮询
onMounted(() => {
  shuffleServers()
  // 初始检查所有服务器状态
  servers.forEach((server) => {
    if (server.ip) {
      checkServerStatus(server.ip)
    }
  })

  // 设置定期检查
  const pollInterval = setInterval(() => {
    servers.forEach((server) => {
      if (server.ip) {
        checkServerStatus(server.ip)
      }
    })
  }, POLL_INTERVAL)

  // 组件卸载时清除定时器
  onUnmounted(() => {
    clearInterval(pollInterval)
  })
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

.filters {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  width: 100%;
}

.search-wrapper {
  flex: 1;
  min-width: 200px;
  width: 100%;
}

.select-wrapper {
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  box-sizing: border-box;
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  flex: 1;
  min-width: 120px;
  box-sizing: border-box;
  max-width: 100%;
}

.server-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  justify-content: center;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
}

.server-card {
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  background: var(--vp-c-bg);
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.server-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  border-radius: 8px;
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
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8em;
  line-height: 1.2;
  white-space: nowrap;
  height: auto;
  align-self: center;
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
  color: var(--vp-c-gray);
}

.server-description {
  margin: 0;
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  overflow-wrap: break-word;
  word-break: break-word;
  line-height: 1.5;
}

/* 响应式布局 */
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
    box-sizing: border-box;
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

  .tags-container {
    gap: 4px;
  }

  .tag {
    padding: 2px 4px;
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
