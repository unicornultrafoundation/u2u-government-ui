import { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'

interface LineChartProps {
  data?: number[]
}


export const LineChart = ({data}: LineChartProps) => {
  const state = {
    series: [{
      data: [0, 10, 15, 20, 10, 15, 20, 15, 10]
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
  return (
    <div className='mb-[-16px]'>
      <Chart options={state.options} series={state.series} type="area" height={100} />
    </div>
  )
}
