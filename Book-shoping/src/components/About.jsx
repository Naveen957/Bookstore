import React, { useEffect, useState } from "react";
import aboutStyles from "../assets/dummystyles";
import { apbranches, apstats, apteamMembers } from "../assets/dummydata";
import AboutUsImage from "../assets/AboutUsImage.png";
import {
  Clock,
  Facebook,
  Icon,
  Instagram,
  MapPin,
  Twitter,
} from "lucide-react";

const About = () => {
  const [aboutImages, setAboutImages] = useState(null);

  useEffect(() => {
    fetch("https://bookstore-backend-6c1r.onrender.com/api/picture/about")
      .then((res) => res.json())
      .then((data) => setAboutImages(data))
      .catch((err) => console.error("Image fetch failed:", err));
  }, []);

  return (
    <div className={aboutStyles.container}>
      <section className={aboutStyles.section}>
        <div className={aboutStyles.innerContainer}>
          <div className={aboutStyles.headingWrapper}>
            <div className="relative inline-block">
              <h1 className={aboutStyles.heading}>
                Crafting Literary <br /> Futures
              </h1>
              <div className={aboutStyles.underline} />
            </div>
            <p className={aboutStyles.subText}>
              Pioneering the next chapter in global storytelling. He bridge
              imagination with innovation through curated literary experiences.
            </p>
          </div>
        </div>
      </section>
      {/*stats section*/}
      <section className={aboutStyles.statsSection}>
        <div className={aboutStyles.innerContainer}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {apstats.map((stat, index) => (
              <div key={index} className={aboutStyles.statCard}>
                <div className={aboutStyles.statIconWrapper}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className={aboutStyles.statValue}>{stat.value}</h3>
                <p className={aboutStyles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={aboutStyles.aboutSection}>
        <div className={aboutStyles.innerContainer}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={aboutStyles.teamImageWrapper}>
              {aboutImages && aboutImages.length > 1 ? (
                <img
                  src={aboutImages[3].image}
                  alt="Team"
                  className={aboutStyles.aboutImage}
                />
              ) : (
                <div className="text-white text-center">Loading image...</div>
              )}

              <div className={aboutStyles.aboutOverlay} />
              <div className={aboutStyles.aboutCaption}>
                <h3 className={aboutStyles.aboutTitle}>Since 2025</h3>
                <p className={aboutStyles.aboutSubtitle}>
                  Pioneering Digital Literature
                </p>
              </div>
            </div>

            <div className={aboutStyles.aboutTextSection}>
              <div className={aboutStyles.aboutHeadingSection}>
                <h2 className={aboutStyles.aboutHeading}>
                  Redefining Storytelling
                </h2>
                <p className={aboutStyles.aboutParagraph}>
                  We've transformed traditional publishing into a dynamic
                  digital ecosystem...
                </p>
              </div>
              <div className={aboutStyles.aboutBoxGrid}>
                <div className={aboutStyles.aboutBox}>
                  <h4 className={aboutStyles.aboutBoxHeading}>Our Vision</h4>
                  <p className={aboutStyles.aboutBoxText}>
                    Create a global network...
                  </p>
                </div>
                <div className={aboutStyles.aboutBox}>
                  <h4 className={aboutStyles.aboutBoxHeading}>Our missing</h4>
                  <p className={aboutStyles.aboutBoxText}>
                    Empower creators and inspire readers...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* team section */}
      <section className={aboutStyles.teamSection}>
        <div className={aboutStyles.innerContainer}>
          <div className="text-center mb-20">
            <h2 className={aboutStyles.sectionTitle}>
              Meet your Literary Guides
            </h2>
            <div className={aboutStyles.sectionUnderline} />
          </div>

          <div className=" grid grid-cols-1 md:grid-cols-3 gap-8">
            {apteamMembers.map((member, index) => (
              <div className={aboutStyles.teamCard} key={member.id}>
                <div className={aboutStyles.teamImageWrapper}>
                  {aboutImages && aboutImages.length > index ? (
                    <img
                      src={aboutImages[index].image}
                      alt="Team"
                      className={aboutStyles.teamImage}
                    />
                  ) : (
                    <div className="text-white text-center">
                      Loading image...
                    </div>
                  )}
                  <div className={aboutStyles.teamOverlay} />
                </div>
                <h3 className={aboutStyles.teamName}>{member.name}</h3>
                <p className={aboutStyles.teamPosition}>{member.position}</p>

                <div className="flex justify-center space-x-4">
                  {[Facebook, Twitter, Instagram].map((Icon, i) => (
                    <button key={i} className={aboutStyles.socialIcon}>
                      <Icon className=" h-6 w-6" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={aboutStyles.branchSection}>
        <div className={aboutStyles.innerContainer}>
          <div className="text-center mb-20">
            <h2 className={aboutStyles.sectionTitle}>
              Our Literary Sanctuaries
            </h2>
            <div className={aboutStyles.sectionUnderline} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {apbranches.map((branch, index) => (
              <div key={index} className={aboutStyles.branchCard}>
                <div className={aboutStyles.branchImageWrapper}>
                  {aboutImages && aboutImages.length > index ? (
                    <img
                      src={aboutImages[index + 4]?.image}
                      alt="Team"
                      className={aboutStyles.branchImage}
                    />
                  ) : (
                    <div className="text-white text-center">
                      Loading image...
                    </div>
                  )}
                  <div className={aboutStyles.branchOverlay} />
                </div>
                <div className={aboutStyles.branchInfoWrapper}>
                  <div className={aboutStyles.branchLocationWrapper}>
                    <MapPin className="h-6 w-6 text-[#43C6AC]" />
                    <h3 className={aboutStyles.branchLocation}>
                      {branch.location}
                    </h3>
                  </div>

                  <div className={aboutStyles.branchHours}>
                    <Clock className="h-6 w-6 text-[#43C6AC]" />
                    <p>{branch.hours}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
