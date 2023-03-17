import { APP_NAME, INSTRUCTIONS } from '@/util/constants'

// const MapWithOverlay = dynamic(() => import('@/components/MapWithOverlay'), { ssr: false })


export default function About() {
  return (
    <>
      <div className='container'>
        <img src='/logo.png' alt='logo' className='logo' />
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

        <pre>
          {`const getPM25Color = (pm25) => {
    // Returns a marker color based on the pm25 (particulate) value.

    if (pm25 < 12) {
        return 'green'; // good
    }
    if (pm25 < 35.5) {
        return 'yellow'; // ok
    }
    if (pm25 < 55.5) {
        return 'orange'; // warning
    }
    if (pm25 < 150.5) {
        return 'violet'; // bad
    }
    return 'red'; // danger
}`}
        </pre>

      </div>
    </>
  )
}
