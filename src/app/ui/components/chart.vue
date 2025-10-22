<template>
  <div :style="{height: height + 'px', width: width + 'px'}">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
  import {ref, watch, onMounted, onBeforeUnmount, defineProps} from 'vue';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Filler,
    LineController,
    BarController,
    PieController,
    DoughnutController,
    RadarController,
    PolarAreaController
  } from 'chart.js';

  // ثبت همه controller و المان‌های لازم
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    LineController,
    BarController,
    PieController,
    DoughnutController,
    RadarController,
    PolarAreaController,
    LineElement,
    PointElement,
    BarElement,
    ArcElement,
    Filler
  );

  type ChartType = 'line' | 'bar' | 'pie' | 'doughnut' | 'radar' | 'polarArea';

  interface Dataset {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    fill?: boolean;
    tension?: number;
    pointRadius?: number;
  }

  interface ChartData {
    labels: string[];
    datasets: Dataset[];
  }

  interface ChartOptions {
    [key: string]: any;
  }

  const props = defineProps<{
    chartType: ChartType;
    chartData: ChartData;
    chartOptions?: ChartOptions;
    height?: number;
    width?: number;
  }>();

  const canvasRef = ref<HTMLCanvasElement | null>(null);
  let chartInstance: ChartJS | null = null;

  const height = props.height || 300;
  const width = props.width || 600;

  // تابع رندر چارت
  function renderChart() {
    if (!canvasRef.value) return;

    if (!chartInstance) {
      chartInstance = new ChartJS(canvasRef.value, {
        type: props.chartType,
        data: props.chartData,
        options: props.chartOptions || {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    } else {
      chartInstance.data = props.chartData;
      chartInstance.options = props.chartOptions || {
        responsive: true,
        maintainAspectRatio: false
      };
      chartInstance.update('none'); // بدون animation برای سرعت
    }
  }

  // watch روی props: immediate=true باعث می‌شود داده اولیه attach شود
  watch(
    () => [props.chartData, props.chartOptions, props.chartType],
    () => renderChart(),
    {deep: true, immediate: true}
  );

  onMounted(() => {
    renderChart();
  });

  onBeforeUnmount(() => {
    if (chartInstance) chartInstance.destroy();
  });
</script>

<style scoped>
  canvas {
    display: block;
  }
</style>
