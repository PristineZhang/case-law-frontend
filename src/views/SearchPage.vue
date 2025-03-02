<template>

  <div class="page-container">

    <el-header class="header-bar">
      <HeaderSection />
      <!-- 显示统计信息 -->
      <div class="case-stats">
        全网已收录案例 {{ totalCases }} 篇，今日新增 {{ newToday }} 篇
      </div>
    </el-header>

    <!-- 中间三栏布局：左侧筛选 / 中间内容 / 右侧卡片 -->
    <el-container class="main-container">
      <!-- 左侧 -->
      <el-aside class="aside-left">
        <div class="filter-box">
          <h3 class="filter-title">Filter</h3>
          <el-form :model="filters" label-position="top" size="small">
            <el-form-item label="执行法院">
              <el-select v-model="filters.court" placeholder="请选择执行法院">
                <el-option label="A法院" value="A" />
                <el-option label="B法院" value="B" />
                <el-option label="C法院" value="C" />
              </el-select>
            </el-form-item>
            <el-form-item label="起始年份">
              <el-date-picker
                v-model="filters.startYear"
                type="year"
                placeholder="选择起始年份"
                format="yyyy"
              />
            </el-form-item>
            <el-form-item label="结束年份">
              <el-date-picker
                v-model="filters.endYear"
                type="year"
                placeholder="选择结束年份"
                format="yyyy"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="applyFilters">应用筛选</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-aside>

      <!-- 中间内容 -->
      <el-main class="main-content">
        <!-- 统计卡片 -->
        <div class="stats-bar">
          <div class="stat-item">
            <div class="stat-title">Case</div>
            <div class="stat-value">879</div>
          </div>
          <div class="stat-item">
            <div class="stat-title">Legislation</div>
            <div class="stat-value">230</div>
          </div>
        </div>

        <!-- 列表示例 -->
        <div class="case-list">
          <div 
            class="case-item" 
            v-for="item in caseData" 
            :key="item.id"
           >
            <div class="case-header">
              <!-- 在 Title 上加点击事件 & 样式指示可点击 -->
              <div 
                class="case-title" 
                @click="openDialog(item)"
              >
                {{ item.title }}
              </div>
              <div class="case-meta">
                {{ item.date }} | {{ item.source }}
              </div>
            </div>
            <div class="case-content">
              <span class="highlight">Highlight Sentences</span> ...
            </div>
          </div>

          <!-- 弹窗，用于显示“案件详情” -->
          <el-dialog
            title="Full text"
            :visible.sync="dialogVisible"
            width="60%"
            append-to-body
          >
            <!-- 显示 currentCase 的详细信息 -->
            <p>{{ currentCase?.detail }}</p>

            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">关闭</el-button>
            </span>
          </el-dialog>
        </div>

      </el-main>

      <!-- 右侧卡片区域 -->
      <el-aside class="aside-right">
        <div class="chart-box">
          <h4>Case by Year</h4>
          <div class="chart-placeholder">
            2022: 21300<br>2021: 19650<br>2020: 15800
          </div>
        </div>
        <div class="chart-box">
          <h4>Source Analytics</h4>
          <div class="chart-placeholder">
            court1: 25%<br>court2: 40%<br>court3: 35%
          </div>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HeaderSection from '../components/SearchHeader.vue'

// 示例数据
const totalCases = ref(0)
const newToday = ref(0)

// 筛选表单
const filters = ref({
  court: '',
  startYear: '',
  endYear: ''
})

const applyFilters = () => {
  console.log('当前筛选条件：', filters.value)
}

onMounted(() => {
  // 模拟获取数据
  totalCases.value = 15902618
  newToday.value = 1453
})

const dialogVisible = ref(false)
const currentCase = ref(null)

const caseData = [
  { id: 123, title: 'Title1', date: '2020-11-22', source: 'Source', detail: '案件详细内容1...' },
  { id: 456, title: 'Title2', date: '2021-05-10', source: 'Source', detail: '案件详细内容2...' },
]


function openDialog(item) {
  console.log('打开弹窗，显示案例详情：', item)
  currentCase.value = item
  dialogVisible.value = true
  console.log('currentCase:', dialogVisible.value)
}

</script>

<style scoped>
.page-container {
  background-color: #e0edfc;
  min-height: 100vh;       
  display: flex;           
  flex-direction: column;  
  margin: 0;                
  padding: 0;              
}


.header-bar {
  padding: 20px; 
  background-color: #e0edfc; 
  box-sizing: border-box;
}

/* 头部下方显示“全网已收录案例 xxx 篇” */
.case-stats {
  margin-top: 10px;
  font-size: 14px;
  color: #333;
  text-align: center;
}


.main-container {
  flex: 1;              
  display: flex;        
  gap: 20px;             
  box-sizing: border-box;
  padding: 20px;        
}

/* 左侧筛选栏 */
.aside-left {
  width: 220px; 
}

/* 中间内容区域 */
.main-content {
  flex: 1; 
}

/* 右侧 */
.aside-right {
  width: 280px; 
  display: flex;
  flex-direction: column;
  gap: 20px;
}



/* 左侧 Filter 卡片 */
.filter-box {
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* 右侧图表卡片 */
.chart-box {
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}
.chart-box h4 {
  margin-bottom: 12px;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
}
.chart-placeholder {
  font-size: 14px;
  color: #666;
  text-align: center;
  line-height: 1.6;
}

/* 中间区域的小卡片 (Case/Legislation、列表等) */
.stats-bar {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.stat-item {
  background-color: #fff;
  border-radius: 8px;
  padding: 12px 20px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  flex: 1;
  text-align: center;
}
.stat-title {
  font-size: 14px;
  color: #888;
}
.stat-value {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

/* 列表 */
.case-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.case-item {
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}
.case-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
.case-title {
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  color: #409eff;
}
.case-meta {
  color: #999;
  font-size: 14px;
  margin-left:auto;
}
.case-content {
  font-size: 14px;
  line-height: 1.6;
  margin-top: 8px;
}
.highlight {
  color: #f56c6c;
  font-weight: bold;
  margin-right: 4px;
}

.filter-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
  text-align: center;
}
</style>