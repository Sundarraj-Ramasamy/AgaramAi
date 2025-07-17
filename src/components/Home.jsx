import React, {useEffect} from 'react';

const Home = () => {
  useEffect(() => {
  const toggleMenu = () => {
    const nav = document.querySelector('nav');
    const menuToggle = document.querySelector('.menu-toggle');
    if (window.innerWidth <= 768) {
      nav.classList.remove('open');
      menuToggle.style.display = 'block';
    } else {
      nav.classList.add('open');
      menuToggle.style.display = 'none';
    }
  };
  toggleMenu();
  window.addEventListener('resize', toggleMenu);
  return () => window.removeEventListener('resize', toggleMenu);
}, []);
  return (
    <section id="home">
      <h2>Home</h2>
      <p>Welcome to the AgaramAi website, your ultimate resource for all things related to Artificial Intelligence (AI). Explore our content to learn about the latest advancements, applications, and impact of AI in various fields.</p>

      <h3>What is Artificial Intelligence?</h3>
      <p>
        Artificial Intelligence (AI) is a branch of computer science that focuses on creating intelligent machines that can perform tasks that typically require human intelligence. These tasks include learning, reasoning, problem-solving, perception, and language understanding.
      </p>

      <h3>Applications of AI</h3>
      <p>
        AI has found applications in various industries and domains, including:
      </p>
      <ul>
        <li>Machine Learning: Building algorithms that can learn from and make predictions based on data.</li>
        <li>Natural Language Processing (NLP): Enabling machines to understand and interpret human language.</li>
        <li>Computer Vision: Empowering computers to interpret and process visual information.</li>
        <li>Robotics: Creating intelligent robots that can perform tasks in the physical world.</li>
        <li>Virtual Assistants: Developing AI-powered assistants like Siri, Alexa, and Google Assistant.</li>
        <li>Healthcare: Using AI for medical diagnosis, drug discovery, and personalized treatment.</li>
        <li>Finance: Applying AI for fraud detection, trading algorithms, and risk assessment.</li>
        <li>Autonomous Vehicles: Building self-driving cars and autonomous drones.</li>
        <li>Gaming: Creating intelligent opponents and realistic game environments.</li>
      </ul>

      <h3>The Future of AI</h3>
      <p>
        The field of AI is rapidly evolving, and its potential impact on society is immense. As AI technologies continue to advance, they have the potential to revolutionize various industries, improve efficiency, and solve complex problems. However, there are also ethical considerations and challenges that need to be addressed to ensure responsible and beneficial use of AI.
      </p>
    </section>
  );
};

export default Home;
