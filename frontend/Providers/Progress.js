import NextTopLoader from 'nextjs-toploader'

const Progress = () => {
  return (
    <>
      <NextTopLoader
        color="#EB568E"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #EB568E,0 0 5px #EB568E"
      />
    </>
  )
}

export default Progress
