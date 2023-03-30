import ColorBox from '@/components/ColorBox'
import Image from 'next/image'
import { APP_NAME, GREEN_25, INSTRUCTIONS, ORANGE_25, VIOLET_25, YELLOW_25 } from '@/util/constants'

// const MapWithOverlay = dynamic(() => import('@/components/MapWithOverlay'), { ssr: false })

const COLORS = ['#00FF00', '#FFFF00', '#FFA500', '#FF00FF', '#FF0000']


export default function About() {
  return (
    <>
      <div className='container'>
        <Image src='/logo.png' width={400} alt='logo' className='logo' />
        <br />
        <br />
        <br />
        <h2>What is {APP_NAME}?</h2>
        Airplan is a new air quality monitor and lookup app that leverages the power of Filecoin and the OpenAQ API to provide real-time air quality data for cities around the world. With Airplan, users can quickly and easily access air quality data for their local area, view historical trends, and monitor changes over time.
        <br />
        <br />

        <h2>How to use</h2>
        <p>
          {INSTRUCTIONS}
        </p>

        <p>
          Built for the 2023 Green blockchain challenge on devpost.
        </p>

        <a href="https://github.com/cbonoz/green23" target="_blank">Github</a>
        <br />
        <br />

        <h2>Color scale </h2>
        <p>
          Scale is based on the EPA&apos;s Air Quality Index (AQI) scale for PM2.5 values.
          <br/>
          <a href='https://blissair.com/what-is-pm-2-5.htm' target='_blank'>Read more</a>
        </p>

        <div className='color-scale'>
        {COLORS.map((color, i) => {
          return <ColorBox
            color={color}
            key={i}
            text={i === 0 ? `Good (0 - ${GREEN_25})` : i === 1 ? `Moderate (${GREEN_25} - ${YELLOW_25})` : i === 2 ? `Unhealthy for Sensitive Groups (${YELLOW_25} - ${ORANGE_25})` : i === 3 ? `Unhealthy (${ORANGE_25} - ${VIOLET_25})` : `Very Unhealthy (${VIOLET_25} or above)`}
          />})}
        </div>


      </div>
    </>
  )
}
