import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import '../project_pages/project_reset.css';

import projectData from '../../data/ProjectCards.json';

// Section 1 - Signup and Family/Group View Images
import page1 from '../../assets/project6/page1.png';
import page2 from '../../assets/project6/page2.png';
import page3 from '../../assets/project6/page3.png';

// Section 2 - Chat System Images
import page4 from '../../assets/project6/page4.png';
import page5 from '../../assets/project6/page5.png';

// Section 3 - Leaderboards, Social System, Holdings Reviews Images
import page6 from '../../assets/project6/page6.png';
import page7 from '../../assets/project6/page7.png';
import page8 from '../../assets/project6/page8.png';
import page9 from '../../assets/project6/page9.png';

import ProjectHeader from '../../components/ProjectComponents/ProjectHeader';
import FeatureCard from '../../components/ProjectComponents/FeatureCard';
import MobileCarousel from '../../components/ProjectComponents/MobileCarousel';
import ConnectSection from '../../components/ProjectComponents/ConnectSection';

const InvestTogetherPage = () => {
  const project = {
    ...projectData.projects.find(p => p.id === 6),
    plainTitle: "Invest Together",
    emojis: "🎮",
    category: "Social Investment Platform"
  };

  // Section 1 - Signup and Family/Group View
  const signupImages = [page1, page2, page3];
  const signupDescriptions = [
    "Register - A clean, friendly sign-up screen that sets the tone for an inclusive and low-barrier entry",
    "Group Dashboard - View your team's progress, chat activity, and collective earnings",
    "Holdings Overview - See individual and group investment history, growth, and portfolio changes over time"
  ];

  // Section 2 - Chat System
  const chatImages = [page4, page5];
  const chatDescriptions = [
    "Chat-Invest Screen - A teammate sends a message suggesting the group reconsider their investments in Apple",
    "Article Share - Another member replies with a linked article backing the claim, sparking discussion and collaborative analysis"
  ];

  // Section 3 - Leaderboards, Social System, Holdings Reviews
  const leaderboardImages = [page6, page7, page8, page9];
  const leaderboardDescriptions = [
    "Global Leaderboard - See which groups are climbing the ranks and by how much",
    "Team Overview - Explore the portfolio of a top-performing team and what they're currently holding",
    "Team History - Dive into their investment timeline and strategy",
    "Stock Breakdown (Apple) - View peer reviews, articles, and user-submitted analysis of specific stocks"
  ];

  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Invest Together - Micah Bron Portfolio</title>
        <meta name="description" content="A socially-driven investment experience for a new generation, winner of the DesCan UX Hackathon at Emily Carr University. Blends social accountability with real-world growth." />
        <meta name="keywords" content="Invest Together, social investment, financial literacy, UX design, hackathon winner, Emily Carr University, group investing, gamification" />
        <meta property="og:title" content="Invest Together - Micah Bron Portfolio" />
        <meta property="og:description" content="A socially-driven investment experience for a new generation, winner of the DesCan UX Hackathon at Emily Carr University." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://micahbron.com/projects/6" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Invest Together - Micah Bron Portfolio" />
        <meta name="twitter:description" content="A socially-driven investment experience for a new generation, winner of the DesCan UX Hackathon at Emily Carr University." />
      </Helmet>
      <div className="project-page">
        <ProjectHeader
          title={project.plainTitle}
          emojis={project.emojis}
          category={project.category}
          tags={[
            "UX Design",
            "Social Investment",
            "Financial Literacy",
            "Gamification",
            "Mobile App",
            "Hackathon Winner",
            "Emily Carr University",
            "Group Investing",
            "Chat System",
            "Leaderboards",
            "Portfolio Management",
            "Social Features"
          ]}
          githubLink=""
          figmaLink="https://www.figma.com/design/nWTAjjxlhaeDQuoKZhdqQs/UX---Design-Hack?node-id=58809-125&t=yM1pE0ZPqfAuFEJ8-1"
        />

        <h2>Project Overview</h2>
        <div className="project-description">
          <p>
            A socially-driven investment experience for a new generation, winner of the DesCan UX Hackathon at Emily Carr University. 
            Designed to make investing more approachable, Invest Together reimagines financial literacy as a team-based, seasonal game—blending 
            social accountability with real-world growth. Inspired by the mechanics of popular games like Fortnite, the app invites users to 
            build smart money habits while competing alongside (or against) their friends and family.
          </p>
        </div>

        {/* Section 1: Getting Started Together */}
        <div className="section">
          <div className="features-section">
            <h2>Getting Started Together</h2>
            <p className="section-subtitle">Build a habit. Build a team. Build your future.</p>
            <div className="features-grid">
              <FeatureCard
                title="Group Investing Made Simple"
                content="Form small teams with friends or family to encourage consistent investing through social support and low-stakes entry points."
                emoji="🎯"
              />
              <FeatureCard
                title="Track Your Progress"
                content="View changes in your investments over time, both individually and as a team, to foster financial literacy through visual feedback."
                emoji="📈"
              />
            </div>
          </div>

          <div className="mockup-section">
            <MobileCarousel
              images={signupImages}
              descriptions={signupDescriptions}
            />
          </div>
        </div>

        {/* Section 2: Talk Strategy */}
        <div className="section">
          <div className="features-section">
            <h2>Talk Strategy</h2>
            <p className="section-subtitle">Finance doesn't have to be boring. Let's make it social.</p>
            <div className="features-grid">
              <FeatureCard
                title="Article Sharing & Discussion"
                content="Drop links and start chats around financial news, stock trends, or strategy suggestions—right where decisions are made."
                emoji="📰"
              />
              <FeatureCard
                title="Decision-Making as a Team"
                content="Collaborative investment means smarter choices and shared learning, especially for those just starting their financial journey."
                emoji="👨‍👩‍👧‍👦"
              />
            </div>
          </div>

          <div className="mockup-section">
            <MobileCarousel
              images={chatImages}
              descriptions={chatDescriptions}
            />
          </div>
        </div>

        {/* Section 3: Compete & Learn */}
        <div className="section">
          <div className="features-section">
            <h2>Compete & Learn</h2>
            <p className="section-subtitle">Track your ranking. Learn from others. Grow together.</p>
            <div className="features-grid">
              <FeatureCard
                title="The Long Game"
                content="Encourage long-term thinking by introducing a seasonal leaderboard that rewards strategic growth, not just lucky timing."
                emoji="🏅"
              />
              <FeatureCard
                title="Learn from the Best"
                content="Browse successful teams' portfolios, check their stock breakdowns, and discover real strategies backed by real people."
                emoji="🧠"
              />
            </div>
          </div>

          <div className="mockup-section">
            <MobileCarousel
              images={leaderboardImages}
              descriptions={leaderboardDescriptions}
            />
          </div>
        </div>

        {/* Why It Worked Section */}
        <div className="section">
          <div className="features-section">
            <h2>Why It Worked</h2>
            <div className="project-description">
              <p>
                We designed Invest Together to blend gamification, social motivation, and simplified investing into one accessible app. 
                By reducing financial barriers, encouraging teamwork, and giving users the tools to learn from each other, we created a 
                system where investing becomes less intimidating—and a lot more fun.
              </p>
            </div>
          </div>
        </div>

        <ConnectSection />
      </div>
    </>
  );
};

export default InvestTogetherPage; 