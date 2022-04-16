import { CChart } from '@coreui/react-chartjs';

function Chart() {
    const doughnut = {
        labels: [
          'Red',
          'Green',
          'Yellow',
        ],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
            ],
          }],
        };
  
    return (
        <div className="card shadow-lg p-3 text-center  " style={{height: '30.5rem'}}>
        <h4 className='text-center'>Total Users</h4> 
        <hr  />
        <div className="chart-wrapper">
        <CChart
  type="doughnut"
  data={{
    
    datasets: [
      {
        backgroundColor: ['#c0bcec', '#f0dcbc', '#c0e4cc'],
        hoverBackgroundColor: ['darkblue','darkgoldenrod','darkgreen'],
        data: [80, 30, 40],
        
      },
    ],
    labels: ['Admin', 'User', 'Eng'],
  }}
/>
        </div>
        <div className="my-3">
        
    
    <p className=" text-muted my-4"> Hover to know more about your users. </p>
        </div>
        
       
        </div>

    )
}

export default Chart;