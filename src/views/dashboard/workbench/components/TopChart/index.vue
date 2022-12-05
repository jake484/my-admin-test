<template>
  <n-grid :x-gap="16" :y-gap="16" :item-responsive="true">
    <n-grid-item span="0:24 640:24 1024:24">
      <n-card :bordered="true" class="rounded-16px shadow-sm p-10px">
        <n-space vertical>
          <n-cascader
            v-model:value="value"
            multiple
            clearable
            placeholder="选择绘图变量"
            max-tag-count="responsive"
            expand-trigger="hover"
            :options="solInfo.options"
            :show-path="false"
            cascade
            check-strategy="child"
            filterable
            clear-filter-after-select
            @update:value="handleUpdateValue"
          />
        </n-space>
      </n-card>
    </n-grid-item>
    <n-grid-item span="0:24 640:24 1024:24">
      <n-card :bordered="false" class="rounded-16px shadow-sm">
        <div class="flex w-full h-360px">
          <div class="flex-1-hidden h-full">
            <div ref="lineRef" class="wh-full"></div>
          </div>
        </div>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch } from 'vue';
import type { Ref } from 'vue';
import type { CascaderOption } from 'naive-ui';
import axios from 'axios';
import { floor, random } from 'lodash';
import { type ECOption, useEcharts } from '@/composables';

defineOptions({ name: 'DashboardAnalysisTopCard' });

class SolutionInfo {
  options: CascaderOption[] = [];

  sol: object = {};

  t: number[] = [];
}

const lineOptions = ref<ECOption>({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['示例曲线1', '示例曲线2']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      name: '时间',
      boundaryGap: false,
      data: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      color: '#8e9dff',
      name: '示例曲线1',
      type: 'line',
      smooth: true,
      stack: 'Total',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: '#8e9dff'
            },
            {
              offset: 1,
              color: '#fff'
            }
          ]
        }
      },
      emphasis: {
        focus: 'series'
      },
      data: [4623, 6145, 6268, 6411, 1890, 4251, 2978, 3880, 3606, 4311]
    },
    {
      color: '#26deca',
      name: '示例曲线2',
      type: 'line',
      smooth: true,
      stack: 'Total',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: '#26deca'
            },
            {
              offset: 1,
              color: '#fff'
            }
          ]
        }
      },
      emphasis: {
        focus: 'series'
      },
      data: [2208, 2016, 2916, 4512, 8281, 2008, 1963, 2367, 2956, 678]
    }
  ]
}) as Ref<ECOption>;

const { domRef: lineRef } = useEcharts(lineOptions);

function getOptionsFromJson(arr: any): CascaderOption[] {
  const options: CascaderOption[] = [];
  for (let i = 0; i < arr.length; ++i) {
    if (typeof arr[i] === 'object') {
      for (const key in arr[i]) {
        options.push({
          label: key,
          value: key,
          children: getOptionsFromJson(arr[i][key])
        });
      }
    } else {
      options.push({
        label: arr[i],
        value: arr[i]
      });
    }
  }
  return options;
}
const getExampleLine = () => {
  lineOptions.value.legend.data = ['示例曲线'];
  lineOptions.value.xAxis[0].data = solInfo.t;
  const random_data: number[] = [];
  for (let i = 0; i < solInfo.t.length; i++) {
    random_data.push(floor(random(0, 100)));
  }
  lineOptions.value.series = [
    {
      color: '#8e9dff',
      name: '示例曲线',
      type: 'line',
      smooth: true,
      showSymbol: false,
      stack: 'Total',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: '#8e9dff'
            },
            {
              offset: 1,
              color: '#fff'
            }
          ]
        }
      },
      emphasis: {
        focus: 'series'
      },
      data: random_data
    }
  ];
};
const value = ref(null);
const solInfo = reactive(new SolutionInfo());
const getSolutionInfo = () => {
  axios.get('/public/test.json').then(res => {
    solInfo.options = getOptionsFromJson(res.data.varinfo);
    solInfo.sol = res.data.sol;
    solInfo.t = res.data.t;
    getExampleLine();
  });
};

const col: string[] = [
  '#5470c6',
  '#91cc75',
  '#fac858',
  '#ee6666',
  '#73c0de',
  '#3ba272',
  '#fc8452',
  '#9a60b4',
  '#ea7ccc'
];

watch(value, newvalue => {
  const value: string[] = newvalue === null ? [] : newvalue;
  const colors: string[] = [];
  for (let i = 0; i < floor(value.length / 9 + 1); ++i) {
    colors.push(...col);
  }
  const series: object[] = [];
  for (let i = 0; i < value.length; i++) {
    series.push({
      color: colors[i],
      name: value[i],
      type: 'line',
      smooth: true,
      showSymbol: false,
      stack: 'Total',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: colors[i]
            },
            {
              offset: 1,
              color: '#fff'
            }
          ]
        }
      },
      emphasis: {
        focus: 'series'
      },
      data: solInfo.sol[value[i]]
    });
  }
  lineOptions.value.series = series;
  console.log(lineOptions.value.series);
  lineOptions.value.legend.data = value;
  lineOptions.value.xAxis[0].data = solInfo.t;
});

onMounted(() => {
  getSolutionInfo(); // 获取变量信息
});

function handleUpdateValue(value: string[], options: CascaderOption[]) {
  // console.log(value, options)
}

// toRefs(options)
</script>

<style scoped></style>
