import { ApexOptions } from 'apexcharts'
import { useMemo } from 'react'
import Chart from 'react-apexcharts'

interface LineChartProps {
  data: number[]
}


export const LineChart = ({data}: LineChartProps) => {
  const state = useMemo(() => {
    return {
      series: [{
        data: data
      }],
      options: {
        chart: {
          height: 100,
          type: 'area',
          toolbar: {
            show: false
          },
        },
        plotOptions: {
          bar: {
            barHeight: '1px',
          }
        },
        colors: ["#33CC99"],
        grid: {
          show: false
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 1
        },
        xaxis: {
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          show: false
        },
        tooltip: {
          enabled: false
        }
      } as ApexOptions
    }
  }, [data]) 
  return (
    <div className='mb-[-16px]'>
      <Chart options={state.options} series={state.series} type="area" height={100} />
    </div>
  )
}
