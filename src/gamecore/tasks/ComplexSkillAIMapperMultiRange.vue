<script setup lang="ts">
  import { ref, onMounted, } from 'vue';
  import { GamecoreTask, } from '@/sources/gamecore';
  import BlockLayout from '@/components/BlockLayout.vue';
  import * as d3 from 'd3';

  const props = defineProps<{node:GamecoreTask}>()
  const node = props.node as unknown as 
  {
    Ranges:
    [
      {
        xmin: { Value: number }
        xmax: { Value: number }
        ymin: { Value: number }
        ymax: { Value: number }
      }
    ]
  }
  
  const chart = ref(null)

  onMounted(() => 
  {
    interface ChartPoint
    {
        x:number
        y:number
    }

    const ranges = [...node.Ranges].sort((a, b) => (a.xmin?.Value ?? 0) - (b.xmin?.Value ?? 0))
    var chartData:ChartPoint[] = []
    for (var i = 0; i < ranges.length; i++) 
    {
      var range = ranges[i]
      var xmin = range.xmin?.Value ?? 0
      var xmax = range.xmax?.Value ?? 0
      var ymin = range.ymin?.Value ?? 0
      var ymax = range.ymax?.Value ?? 0

      chartData.push({ x: xmin, y: ymin })
      chartData.push({ x: xmax, y: ymax })
    }

    const width = 340
    const height = 200
    const marginTop = 15
    const marginRight = 10
    const marginBottom = 20
    const marginLeft = 35

    const xScale = d3.scaleLinear(d3.extent(chartData, (d:ChartPoint) => d.x) as [number, number], [marginLeft, width - marginRight])
    const yScale = d3.scaleLinear(d3.extent(chartData, (d:ChartPoint) => d.y) as [number, number], [height - marginBottom, marginTop])
    const line = d3.line<ChartPoint>().x(d => xScale(d.x)).y(d => yScale(d.y))

    const svg = d3.select(chart.value)
      .attr("width", width)
      .attr("height", height)

    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(xScale))

    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(yScale))

    svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line(chartData))
  })
</script>

<template>
  <BlockLayout :source="node">
    <svg ref="chart"></svg>
  </BlockLayout>
</template>

<style scoped>
</style>