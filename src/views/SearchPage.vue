<template>
  <div>
      <div class="search" style="display: flex; align-items: center; gap: 10px; padding: 10px;">
          <input v-model="keyword" 
            class="search-input" 
            placeholder="Search using keywords or phrases (use AND, OR, NOT; phrases in quotes)"  
            @keyup.enter="fetchTitles" 
            :disabled="isProximityMode"/>
          <button class="btn-primary" @click="fetchTitles">
            Search
          </button>

          <button class="btn-primary" @click="toggleSearchMode">
            {{ isProximityMode ? "Switch to Boolean Search" : "Enable Proximity Search" }}
          </button>
      </div>

      <div class="search">
            <div v-show="isProximityMode" style="display: flex; align-items: center; gap: 10px;">
              <input v-model="distance" placeholder="Distance" class="search-input" />
              <input v-model="term1" placeholder="Term 1" class="search-input" />
              <input v-model="term2" placeholder="Term 2" class="search-input" />

              <button class="btn-success" @click="performProximitySearch">
                Proximity Search
              </button>
            </div>
      </div>

      <div class="rank">
          <div class="rankL">
              <div class="rankL_title">Filter</div>
              <div class="timeBox">
                  <div class="timeTitle">
                      Time
                  </div>
                  <div class="timeItem">
                      <el-checkbox-group v-model="checkList.time">
                          <el-checkbox :label="item.year" v-for="(item, index) in filtersYear"
                              :key="index" />

                      </el-checkbox-group>
                  </div>
              </div>
              <div class="timeBox">
                  <div class="timeTitle">
                      Source
                  </div>
                  <div class="timeItem">
                      <el-checkbox-group v-model="checkList.source">
                          <el-checkbox :label="item.source" v-for="(item, index) in filteredSource"
                              :key="index" />
                      </el-checkbox-group>
                  </div>
              </div>
          </div>

          <div class="rankC">
              <div class="rankC1">
                    <div @click="changeSelection('court_case')">
                        Case    {{ caseCount > 0 ? caseCount : '' }}
                    </div>
                    <div @click="changeSelection('legislation')">
                        Legislation    {{ legislationCount > 0 ? legislationCount : '' }}
                    </div>      
              </div>

              <div class="rankC2">
                  <el-card v-for="(item, index) in titles" :key="index" @click="openDialog(item)">
                      <div class="cardBox">
                          <div>{{ item.title }}</div>
                          <div class="cardTime">
                              <div>time:{{ item.time }}</div>
                              <div>source:{{ item.source }}</div>
                              <div>tf:{{ item.tf }}</div>
                              <div>doc_id:{{ item.doc_id }}</div>
                          </div>
                      </div>
                  </el-card>
              </div>

              <el-pagination
                class="custom-pagination"
                v-model:current-page="currentPage"
                :page-size="pageSize"
                :total="total"
                layout="prev, pager, next"
                @current-change="fetchTitles"
              />

              <el-dialog v-model="dialogVisible" width="50%">
                <div>
                  <h3>title: {{ selectedItem.title }}</h3>
                  <p>content: {{ content }}</p>
                </div>
                <template #footer>
                  <el-button @click="dialogVisible = false">关闭</el-button>
                </template>
              </el-dialog>

          </div>

          <div class="rankR">
              <div class="rankR2">
                  <div class="rankR1Title">Year Analytics</div>
                  <div id="echartsDoughnutTime" style="width:90%;height: 250px;"></div>
              </div>
              <div class="rankR2">
                  <div class="rankR1Title">Source Analytics</div>
                  <div id="echartsDoughnut" style="width:90%;height: 250px;"></div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import axios from '../utils/axios';
import { ref, reactive, onMounted, watch, nextTick, computed } from 'vue';

export default {
setup() {
  const checkList = reactive({
    time: [],
    source: []
  });
  const keyword = ref('');
  const chart = ref(null);
  const chartD = ref(null);
  const titles = ref([]);
  const yearAnalytics = ref([]);
  const sourceAnalytics = ref([]);
  // const yearAnalytics =  [
  //     { name: '2025', value: 1048 },
  //     { name: '2024', value: 735 },
  //     { name: '2023', value: 580 },
  //     { name: '2022', value: 1048 },
  //     { name: '2021', value: 735 },
  //   ];

  const dialogVisible = ref(false);
  const selectedItem = ref({});
  const content = ref('');

  const selected = ref('court_case');
  const caseCount = ref(0); 
  const legislationCount = ref();

  const currentPage = ref(1);
  const pageSize = ref(10);
  const total = ref(0);

  const isProximityMode = ref(false);
  const toggleSearchMode = () => {
      isProximityMode.value = !isProximityMode.value;

      if (isProximityMode.value) {
        // 进入临近搜索模式，清空主输入框 & 禁用
        keyword.value = "";
      } else {
        // 进入普通搜索模式，清空临近搜索字段 & 隐藏输入框
        distance.value = "";
        term1.value = "";
        term2.value = "";
      }
    };

  const distance = ref("");
  const term1 = ref("");
  const term2 = ref("");

  const filtersYear = [
    { year: '2025' , val: 2025 },
    { year: '2024' , val: 2024 },
    { year: '2023' , val: 2023 },
    { year: '2022' , val: 2022 },
    { year: '2021' , val: 2021 },
    { year: '1977' , val: 1977 },
    { year: '2020及以前' , val: 2020 },
  ];


  const courtSource = ref([
  { source: 'federal_court_of_australia'},
  { source: 'high_court_of_australia'},
  { source: 'nsw_caselaw'},
  ]);

  const legislationSource = ref([
  { source: 'federal_register_of_legislation'},
  { source: 'nsw_legislation'},
  { source: 'queensland_legislation'},
  { source: 'western_australian_legislation'},
  { source: 'south_australian_legislation'},
  { source: 'tasmanian_legislation'},
  ]);

  // 计算属性，动态选择数据源
  const filteredSource = computed(() => {
    return selected.value === "legislation" ? legislationSource.value : courtSource.value;
  });


  const changeSelection = (type) => {
    selected.value = type;
    currentPage.value = 1
    checkList.source = [];
    checkList.time = [];

    if (selected.value === "legislation") {
      caseCount.value = 0
    } else {
      legislationCount.value = 0
    }

    console.log("casecount:" + caseCount)
    console.log("legislationcount:" + legislationCount)
};

  // Watch for changes in keyword, checkList.time, checkList.source
  watch([() => checkList.time, () => checkList.source], () => {
    console.log(checkList.time)
    fetchTitles();
  });

    // Watch for changes in selected
    watch([selected], () => {
      fetchTitles();
  });

  // Initialize bar chart
  const echartsDoughnutTimeInit = () => {
    const chartContainer = document.getElementById('echartsDoughnutTime');
    if (chartContainer) {
      chart.value = echarts.init(chartContainer);
      chart.value.setOption({
        color: ['#6B90F5', '#F7D37B', '#F09674', '#72C472', '#FF8C00', '#A37BF7'],
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          bottom: '2%',
          left: 'center',
          itemWidth: 10,
          itemHeight: 10,
          icon: "circle",
          textStyle: {
            color: "#333",
            fontSize: 12
          },
        },
        series: [
          {
            name: 'Year Analytics',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '45%'],
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            // data: yearAnalytics
            data: yearAnalytics.value
          }
        ]
      });
    } else {
      console.error('ECharts container not found!');
    }
  };

  // Initialize doughnut chart
  const echartDoughnutInit = () => {
    const chartContainer = document.getElementById('echartsDoughnut');
    if (chartContainer) {
      chartD.value = echarts.init(chartContainer);
      chartD.value.setOption({
        color: ['#6B90F5', '#F7D37B', '#F09674', '#72C472', '#FF8C00', '#A37BF7'],
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          bottom: '2%',
          left: 'center',
          itemWidth: 10,
          itemHeight: 10,
          icon: "circle",
          textStyle: {
            color: "#333",
            fontSize: 12
          },
        },
        series: [
          {
            name: 'Source Analytics',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '45%'],
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: sourceAnalytics.value
          }
        ]
      });
    } else {
      console.error('ECharts container not found!');
    }
  };

  const openDialog = async (item) => {
    selectedItem.value = item;
    dialogVisible.value = true;

    axios
      .get(`/api/document`, { params: { id: item.doc_id, collection: selected.value, } })
      .then(response => {
        content.value = response.text;
      })
      .catch(error => {
        ElMessage.error('获取内容失败');
      });

};

  const performProximitySearch = () => {
    if (!distance.value || !term1.value || !term2.value) {
      ElMessage({
        message: 'All fields must be filled in for the proximity search.',
        type: 'warning'
      });
      return;
    }
    fetchTitles();
  };

  const fetchTitles = () => {
    console.log("刷新页面，重新请求")

    const query = isProximityMode.value 
    ? `#${distance.value}(${term1.value},${term2.value})`
    : keyword.value;

    if (!query) {
        ElMessage({
            message: "Search query cannot be empty for the boolean search.",
            type: "warning",
        });
        return;
    }

    axios
      .get('/api/rank_retrieve', { 
        params: { 
            query:query, 
            collection:selected.value, 
            page:currentPage.value, 
            page_size:pageSize.value, 
            source: checkList.source.length ? checkList.source.join(",") : "" ,
            year: checkList.time.length ? checkList.time.join(",") : "" ,
          } 
      })
      .then(response => {

        console.log(response)

        titles.value = [];  // 先清空，避免 Vue 误判无变化

        let sourceData = null;
        let yearData = null;

        if (selected.value === "legislation") {
          legislationCount.value = response.collection_counts.legislation;
          total.value = response.collection_counts.legislation;
          titles.value = [...response.results.legislation];
          sourceData = response.distributions.source.legislation

          // todo 时间可视化所需数据
          yearData = response.distributions.year.legislation

        } else {
          caseCount.value = response.collection_counts.court_case;
          total.value = response.collection_counts.court_case;
          titles.value = [...response.results.court_case];
          sourceData = response.distributions.source.court_case
           // todo 时间可视化所需数据
           yearData = response.distributions.year.court_case
        }
          
        // 适配 ECharts
        if (sourceData) {
          sourceData = Object.entries(sourceData).map(([key, value]) => ({
            name: key
              .replace(/_/g, ' ') // 替换下划线为空格
              .replace(/\b\w/g, char => char.toUpperCase()), // 首字母大写
            value: value
          }));
        }
        sourceAnalytics.value = sourceData;


        if (yearData) {
          yearData = Object.entries(yearData)
            .filter(([key]) => ["2020", "2021", "2022", "2023", "2024", "2025"].includes(key))
            .map(([key, value]) => ({
              name: key,
              value: value
            }));
        }
         yearAnalytics.value = yearData
        echartDoughnutInit();
        echartsDoughnutTimeInit();
      })
      .catch(error => {
        console.error('There was an error fetching titles:', error);
      });
  };

  onMounted(() => {
    // fetchTitles();
  });

  return {
    checkList,
    keyword,
    chart,
    chartD,
    titles,

    yearAnalytics,
    sourceAnalytics,
    filtersYear,

    filteredSource,

    echartsDoughnutTimeInit,
    echartDoughnutInit,
    fetchTitles,
    
    dialogVisible,
    selectedItem,
    content,
    openDialog,

    selected,
    caseCount,
    legislationCount,

    total,
    pageSize,
    currentPage,

    changeSelection,

    isProximityMode,
    toggleSearchMode,

    distance,
    term1,
    term2,
    performProximitySearch,
  };
}
};
</script>

<style scoped>
.rank {
  background-color: #F6F7FB;
  display: flex;
  justify-content: space-between;
  padding: 30px;
}

.search {
  width: 100%;
  height: 55px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-input {
  width: 50%;
  padding: 10px 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  outline: none;
  font-size: 14px;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #4A5D73;
}

.btn-primary {
  background-color: #0e2d62;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 18px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 14px;
}

.btn-success {
  background-color: #0e2d62;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 10px;
  padding: 10px 18px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
}

.custom-pagination {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}

.custom-pagination ::v-deep(.el-pager li) {
  color: #2d43d7
}

.rankL {
  width: 20%;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;

  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.rankL_title {
  font-weight: bold;
  font-size: 18px;
}

.timeBox {
  margin-top: 30px;
}

.timeTitle {
  font-weight: bold;
}

.timeItem {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.rankC {
  width: 50%;
}

.rankC1 {
  width: 100%;
  height: 40px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;

  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1) !important;
  border-radius: 8px !important;
}

.rankC1 div span:nth-child(1) {
  font-weight: bold;
}

.rankC1 div span:nth-child(2) {
  color: #9B9B99;
  margin-left: 60px;
}

.rankC2 .el-card {
  width: 100%;
  margin-top: 20px;
  cursor: pointer;

  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1) !important;
  border-radius: 8px !important;
}

.cardBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cardTime {
  color: #505050;
  text-align: right;
  font-size: 12px;
  font-weight: bold;
}

.cardContent {
  font-size: 13px;
  margin-top: 15px;
}

.rankR {
  width: 25%;
}

.rankR1 {
  height: 300px;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px 0 0 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.rankR1Title {
  font-weight: bold;
}

.rankR2 {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px 0 0 20px;
  margin-top: 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>