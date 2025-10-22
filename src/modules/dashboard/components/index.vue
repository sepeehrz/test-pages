<template>
  <div class="">
    <h2 class="text-2xl font-semibold mb-4">
      📈 BTC/USDT Live Chart (Binance)
    </h2>
    <svg ref="chart" :width="width" :height="height" class="text-white"></svg>
  </div>
</template>

<script setup>
  import * as d3 from 'd3';
  import {onMounted, onUnmounted, ref} from 'vue';

  const width = 800;
  const height = 400;
  const chart = ref(null);
  let socket = null;

  onMounted(() => {
    const svg = d3.select(chart.value);
    const margin = {top: 20, right: 20, bottom: 30, left: 60};
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    let data = [];

    const xScale = d3.scaleTime().range([0, chartWidth]);
    const yScale = d3.scaleLinear().range([chartHeight, 0]);

    const line = d3
      .line()
      .x(d => xScale(d.time))
      .y(d => yScale(d.price))
      .curve(d3.curveMonotoneX);

    const path = g
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', '#00ff99')
      .attr('stroke-width', 2);

    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${chartHeight})`);
    g.append('g').attr('class', 'y-axis');

    socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');

    socket.onmessage = event => {
      const msg = JSON.parse(event.data);
      const price = +msg.c;
      const time = new Date();

      data.push({time, price});
      if (data.length > 100) data.shift();

      xScale.domain(d3.extent(data, d => d.time));
      yScale.domain([
        d3.min(data, d => d.price) * 0.999,
        d3.max(data, d => d.price) * 1.001
      ]);

      g.select('.x-axis').call(
        d3.axisBottom(xScale).ticks(5).tickFormat(d3.timeFormat('%H:%M:%S'))
      );
      g.select('.y-axis').call(d3.axisLeft(yScale));

      path.datum(data).attr('d', line);
    };
  });

  onUnmounted(() => {
    if (socket) socket.close();
  });
</script>

<style scoped>
  svg {
    background: #1a1a1a;
    border-radius: 10px;
    box-shadow: 0 0 10px #00ff9960;
  }
</style>
