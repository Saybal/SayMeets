import CallList from "@/components/CallList";
import MettingTypeList from "@/components/MettingTypeList";
import ShinyText from "@/reactbits/ShinyText";
import React from "react";

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now.toLocaleDateString([], {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="flex flex-col gap-10  size-full text-white">
      <div className="h-72 w-full rounded-lg bg-hero bg-cover bg-center relative overflow-hidden">
        {/* <div className='bg-black w-full h-full rounded-lg opacity-30 absolute'></div> */}
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-hero bg-cover bg-center">
          {/* Overlay */}
          <div className="absolute h-full inset-0 bg-black/45" />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 py-6 sm:px-6 md:px-10 text-center">
            <ShinyText
              text="Let's Connect You From Anywhere.."
              speed={2}
              delay={0}
              color="#FFFFFF"
              shineColor="#7BAFD4"
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
              disabled={false}
              className="
        text-2xl
        sm:text-3xl
        md:text-5xl
        lg:text-6xl
        font-bold
        leading-tight
      "
            />

            <div className="mt-3 sm:mt-4">
              <ShinyText
                text={time}
                speed={2}
                delay={0}
                color="#FFFFFF"
                shineColor="#7BAFD4"
                spread={120}
                direction="left"
                yoyo={false}
                pauseOnHover={false}
                disabled={false}
                className="
          text-xl
          sm:text-2xl
          md:text-4xl
          lg:text-5xl
          font-bold
        "
              />
            </div>
            <div className="mt-2">
              <ShinyText
                text={date}
                speed={2}
                delay={0}
                color="#FFFFFF"
                shineColor="#7BAFD4"
                spread={120}
                direction="left"
                yoyo={false}
                pauseOnHover={false}
                disabled={false}
                className="
          text-base
          sm:text-lg
          md:text-xl
          lg:text-2xl
          font-bold
        "
              />
            </div>
          </div>
        </div>
      </div>

      <MettingTypeList/>

      {/* TOday's Upcoming Meeting */}
      <div className="flex flex-col gap-5 w-full">
        <h1 className="text-white font-bold text-2xl">Today's Upcoming Meeting</h1>
        <CallList type="today-upcoming"/>
      </div>
    </section>
  );
};

export default Home;
