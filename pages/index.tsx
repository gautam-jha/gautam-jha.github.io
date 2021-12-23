import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import WebglSlider from "@afiniti/webgl-slider";
import { Header } from "../components/Header";
import { server } from "../config";
import { MockProp } from "../config/interface";
import { About } from "../components/About";
import { Skill } from "../components/Skill";


const Home = (props: MockProp) => {

  const { data: { slider, about, skills } } = props;

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
      <div className={styles.bannerContainer}>
        <div className={styles.slider}>
          <WebglSlider
            fps={25}
            autoplay
            effect={8} // give number between 1 to 8
            slideSpeed={1.6}
            data={slider}
            autoplaySpeed={3000}
            initialSlideIndex={0}
          />
        </div>
        <div className={styles.bannerText}>
          <div className={styles.bannerInner}>
            <p className={styles.bannerText__heading1}>Hello, I am</p>
            <h1 className={styles.bannerText__heading2}>{"Gautam Jha."}</h1>
            <h3 className={styles.bannerText__heading3}>{"A Full-Stack Developer"}</h3>
          </div>
        </div>
      </div>

      <About {...about} />

      <Skill {...skills} />

      <div id="experiece" className={styles.fullScreen}>
        {/* Exp */}
      </div>
      <footer className={styles.footer}>Developed by Gautam Jha</footer>
    </div>
  );
};

export default Home;

Home.getInitialProps = async () => {
  // fetch api.json and return data
  let data = []
  try {
    data = await fetch(server + "/data/api.json").then(res => res.json());
  } catch (e) {
    console.log(e);
  }
  return {

    data: data ?? [],

  };
}
