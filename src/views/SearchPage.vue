<template>
  <div>
      <div class="search">
          <el-input v-model="keyword" style="width: 50%" placeholder="Search product,items" :suffix-icon="Search" />
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
                          <el-checkbox :label="item.year" :value="item.year" v-for="(item, index) in filtersDate"
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
                          <el-checkbox :label="item.source" :value="item.val" v-for="(item, index) in filtersSource"
                              :key="index" />
                      </el-checkbox-group>
                  </div>
              </div>
          </div>

          <div class="rankC">
              <!-- <div class="rankC1">
                  <div>
                      <span>Case</span>
                      <span>{{ case }}</span>
                  </div>
                  <div>
                      <span>Legislation</span>
                      <span>{{ legislation }}</span>
                  </div>
              </div> -->

              <!-- 可点击显示折叠内容的卡片 -->
              <div class="rankC2">
                  <el-card v-for="(item, index) in filteredTitles" :key="index" @click="toggleCollapse(index)">
                      <div class="cardBox">
                          <div>{{ item.title }}</div>
                          <div class="cardTime">
                              <div>{{ item.date }}</div>
                              <div>{{ item.source }}</div>
                          </div>
                      </div>

                      <!-- 折叠内容 -->
                      <div v-if="isCollapsed(index)">
                          <div class="cardContent">
                              Highlight Sentences Highlight Sentences Highlight Sentences Highlight SentencesHighlight
                              Sentences Highlight Sentences Highlight Sentences Highlight Sentences
                          </div>
                      </div>
                  </el-card>
              </div>
          </div>

          <div class="rankR">
              <div class="rankR1">
                  <div class="rankR1Title">Case by Year</div>
                  <div id="echartsBar" style="width:90%;height: 80%;margin-top: 30px;"></div>
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
import { ref, reactive, onMounted, watch, nextTick } from 'vue';

export default {
setup() {
  const checkList = reactive({
    time: [],
    source: []
  });
  const keyword = ref('');
  const filteredTitles = ref([]);
  const chart = ref(null);
  const chartD = ref(null);
  const collapsedIndexes = ref([]);
  const titles = ref([]);
  const caseData = ref('');
  const legislation = ref('');
  const year = ref([]);
  const count = ref([]);
  const sourceAnalytics = ref([]);
  const filtersDate = ref([]);
  const filtersSource = ref([]);

  // Watch for changes in keyword, checkList.time, checkList.source
  watch([keyword, () => checkList.time, () => checkList.source], () => {
    filterTitles();
  });

  // Filter titles based on conditions
  const filterTitles = () => {
    filteredTitles.value = titles.value.filter(item => {
      const matchesKeyword = item.title.toLowerCase().includes(keyword.value.toLowerCase());
      const matchesTime = checkList.time.length === 0 || checkList.time.includes(item.date.split("-")[0]);
      const matchesSource = checkList.source.length === 0 || checkList.source.includes(item.source);

      return matchesKeyword && matchesTime && matchesSource;
    });
  };

  // Initialize bar chart
  const echartsBarInit = () => {
    const chartContainer = document.getElementById('echartsBar');
    if (chartContainer) {
      chart.value = echarts.init(chartContainer);
      chart.value.setOption({
        grid: {
          left: '0',
          top: '0',
          right: '0',
          bottom: '0',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          splitLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false },
          axisLine: { show: false }
        },
        yAxis: {
          type: 'category',
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            color: 'black',
            fontSize: 12
          },
          data: year.value
        },
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: 10,
            data: count.value,
            label: {
              show: true,
              position: 'right',
              offset: [0, 0],
              formatter: '{c}{a}',
              color: 'black',
              fontSize: 12
            },
            itemStyle: {
              normal: {
                barBorderRadius: 3,
                color: "#6993EE"
              }
            },
            zlevel: 1
          },
          {
            name: '进度条背景',
            type: 'bar',
            barGap: '-100%',
            barWidth: 10,
            data: [100, 100, 100],
            color: '#ffffff',
            itemStyle: {
              normal: {
                barBorderRadius: 3
              }
            }
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
        color: ['#6B90F5', '#F7D37B', '#F09674'],
        legend: {
          bottom: '2%',
          left: 'center',
          itemWidth: 10,
          itemHeight: 10,
          icon: "circle"
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
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

  // Fetch titles
  const fetchTitles = () => {
    axios
      .get('/api/titles')
      .then(response => {
        titles.value = response.titles.title;
        caseData.value = response.titles.case;
        legislation.value = response.titles.legislation;
        filteredTitles.value = titles.value;
      })
      .catch(error => {
        console.error('There was an error fetching titles:', error);
      });
  };

  // Fetch case by year data
  const getCaseByYear = () => {
    axios
      .get('/api/case-by-year')
      .then(response => {
        year.value = response.caseByYear.year;
        count.value = response.caseByYear.val;
        echartsBarInit();
      })
      .catch(error => {
        console.error('There was an error fetching case-by-year data:', error);
      });
  };

  // Fetch analytics data
  const getAnalytics = () => {
    axios
      .get('/api/source-analytics')
      .then(response => {
        sourceAnalytics.value = response.sourceAnalytics;
        echartDoughnutInit();
      })
      .catch(error => {
        console.error('There was an error fetching analytics data:', error);
      });
  };

  // Fetch filter data
  const getFilters = () => {
    axios
      .get('/api/filters')
      .then(response => {
        filtersDate.value = response.time;
        filtersSource.value = response.source;
      })
      .catch(error => {
        console.error('There was an error fetching filter data:', error);
      });
  };

  // Toggle card collapse state
  const toggleCollapse = (index) => {
    const i = collapsedIndexes.value.indexOf(index);
    if (i === -1) {
      collapsedIndexes.value.push(index); // Add to collapsed list
    } else {
      collapsedIndexes.value.splice(i, 1); // Remove from collapsed list
    }
  };

  // Check if card is collapsed
  const isCollapsed = (index) => {
    return collapsedIndexes.value.includes(index);
  };

  // Fetch data on mounted
  onMounted(() => {
    fetchTitles();
    getFilters();
    nextTick(() => {
      getCaseByYear();
      getAnalytics();
    });
  });

  return {
    checkList,
    keyword,
    filteredTitles,
    chart,
    chartD,
    collapsedIndexes,
    titles,
    caseData,
    legislation,
    year,
    count,
    sourceAnalytics,
    filtersDate,
    filtersSource,
    filterTitles,
    echartsBarInit,
    echartDoughnutInit,
    fetchTitles,
    getCaseByYear,
    getAnalytics,
    getFilters,
    toggleCollapse,
    isCollapsed
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
  height: 60px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rankL {
  width: 20%;
  background-color: #fff;
  border-radius: 10px;
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
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-around;
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
  border-radius: 5px;
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
}
</style>