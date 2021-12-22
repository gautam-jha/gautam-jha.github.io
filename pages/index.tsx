import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import WebglSlider from "@afiniti/webgl-slider";
import { Header } from "../components/Header";

interface SliderImage {
  Picturehandle: string;
}
interface SliderVideo {
  videoHandle: string;
}

const data: Array<SliderImage | SliderVideo> = [
  // {
  //   Picturehandle: "./bg2.jpg",
  // },
  {
    Picturehandle: "./bg1.jpg",
  },
  {
    videoHandle: "./bg.mp4",
  },
];

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gautam Jha - Full Stack Developer / Freelancer</title>
        <meta
          name="description"
          content="Gautam Jha, Programmer, Javascript / PHP / Python Developer, Student from DTU(Formally DCE), Worked with Amdocs, SHL, 9Yards Technology, Collabera."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.bannerContainer}>
        <div className={styles.slider}>
          <WebglSlider
            fps={25}
            autoplay
            effect={6} // give number between 1 to 8
            iterations={5}
            slideSpeed={1.6}
            data={data}
            autoplaySpeed={8000}
            initialSlideIndex={0}
            onSlideStart={(currentIndex: any, nextIndex: any, direction: any) => {
              console.log(currentIndex, nextIndex, direction);
            }}
            onSlideComplete={() => {
              console.log("complete");
            }}
            webglSliderApi={(ref: any) => {
              // get access to slider's methods
              console.log("ref", ref);
            }}
          />
        </div>
        <div className={styles.bannerText}>
          <div className={styles.bannerInner}>
            <p className={styles.bannerText__heading1}>Hello, I am</p>
            <h1 className={styles.bannerText__heading2}>{"Gautam Jha."}</h1>
            <h3 className={styles.bannerText__heading3}>{"A Full-Stack Developer"}</h3>
          </div>
        </div>
      </main>

      <div id="about" className={styles.fullScreen}>
        ABOUT
      </div>
      <div id="skills" className={styles.fullScreen}>
        Skills
      </div>
      <div id="experiece" className={styles.fullScreen}>
        Exp
      </div>
      <footer className={styles.footer}>Developed by Gautam Jha</footer>
    </div>
  );
};

export default Home;
