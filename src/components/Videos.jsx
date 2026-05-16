import React from 'react';
import './Videos.css';

const videos = [
  {
    id: 1,
    title: 'Deep Learning Specialization (Andrew Ng)',
    url: 'https://www.youtube.com/embed/aircAruvnKk',
    caption: 'Deep learning explained with practical examples by Andrew Ng.'
  },
  {
    id: 2,
    title: 'Transformers from Scratch',
    url: 'https://www.youtube.com/embed/kCc8FmEb1nY',
    caption: 'A visual and intuitive guide to Transformers.'
  },
  {
    id: 3,
    title: 'Neural Networks Demystified',
    url: 'https://www.youtube.com/embed/bxe2T-V8XRs',
    caption: 'A clear, step-by-step series on neural networks.'
  },
  {
    id: 4,
    title: 'Machine Learning Crash Course',
    url: 'https://www.youtube.com/embed/GwIo3gDZCVQ',
    caption: 'Google’s crash course on machine learning basics.'
  },
  {
    id: 5,
    title: 'What is Artificial Intelligence (AI)?',
    url: 'https://www.youtube.com/embed/2ePf9rue1Ao',
    caption: 'A simple introduction to AI by IBM.'
  },
  {
    id: 6,
    title: 'How Machines Learn',
    url: 'https://www.youtube.com/embed/IpGxLWOIZy4',
    caption: 'CrashCourse explains how machines learn.'
  },
  {
    id: 7,
    title: 'How ChatGPT Works Technically',
    url: 'https://www.youtube.com/embed/JTxsNm9IdYU',
    caption: 'A technical explanation of how ChatGPT and large language models work.'
  },
  {
    id: 8,
    title: 'What is Deep Learning?',
    url: 'https://www.youtube.com/embed/5tvmMX8r_OM',
    caption: 'A simple and visual introduction to deep learning.'
  },
  {
    id: 9,
    title: 'How to Learn Machine Learning (3 months)',
    url: 'https://www.youtube.com/embed/Cr6VqTRO1v0',
    caption: 'A roadmap for learning machine learning in 3 months.'
  },
  {
    id: 10,
    title: 'AI Explained: The Future of Artificial Intelligence',
    url: 'https://www.youtube.com/embed/2ePf9rue1Ao',
    caption: 'A look at the future of AI and its impact.'
  }
];

const Videos = () => (
  <div className="videos-page">
    <h1>Best AI Learning YouTube Videos</h1>
    <div className="videos-list">
      {videos.map(video => (
        <div className="video-card" key={video.id}>
          <h2>{video.title}</h2>
          <div className="video-embed">
            <iframe
              width="600"
              height="338"
              src={video.url}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <p className="caption">{video.caption}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Videos;
