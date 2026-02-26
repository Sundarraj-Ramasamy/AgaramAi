import React from 'react';

const Home = () => {
  const stats = [
    { label: 'AI Market Size', value: '$196.63B', year: '2023' },
    { label: 'Expected Growth', value: '38.1% CAGR', period: '2024-2030' },
    { label: 'AI Jobs', value: '375K+', region: 'US Market' }
  ];

  return (
    <section id="home">
      <h2>Welcome to AgaramAi</h2>
      <p>
        Your comprehensive platform for exploring, learning, and mastering Artificial Intelligence. 
        Whether you're a beginner curious about AI fundamentals or an experienced professional seeking 
        advanced insights, AgaramAi provides curated resources, practical tutorials, and cutting-edge research 
        to help you navigate the rapidly evolving world of AI.
      </p>

      <h3>Why AgaramAi?</h3>
      <ul>
        <li><strong>Expert-Curated Content:</strong> Learn from carefully selected articles, tutorials, and resources created by industry professionals and researchers.</li>
        <li><strong>Hands-On Learning:</strong> Access practical tutorials and code examples to apply AI concepts to real-world problems.</li>
        <li><strong>Stay Current:</strong> Keep up with the latest advancements, breakthroughs, and trends in artificial intelligence.</li>
        <li><strong>Community-Driven:</strong> Join a community of AI enthusiasts, researchers, and professionals to share knowledge and collaborate.</li>
        <li><strong>Accessible Learning:</strong> Content designed for learners at all levels, from absolute beginners to advanced practitioners.</li>
      </ul>

      <h3>The AI Revolution</h3>
      <p>
        Artificial Intelligence is no longer a distant future concept—it's transforming industries, creating new opportunities, 
        and reshaping how we work and live. From healthcare diagnostics to autonomous vehicles, from natural language understanding 
        to creative content generation, AI is at the forefront of technological innovation.
      </p>

      <h3>Key Statistics</h3>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <p className="stat-value">{stat.value}</p>
            <p className="stat-label">{stat.label}</p>
            <p className="stat-note">{stat.year || stat.period || stat.region}</p>
          </div>
        ))}
      </div>

      <h3>What is Artificial Intelligence?</h3>
      <p>
        Artificial Intelligence refers to computer systems designed to perform tasks that typically require human intelligence. 
        These include:
      </p>
      <ul>
        <li><strong>Learning:</strong> Acquiring knowledge from data and experience</li>
        <li><strong>Reasoning:</strong> Drawing logical conclusions and making informed decisions</li>
        <li><strong>Problem-Solving:</strong> Finding solutions to complex challenges</li>
        <li><strong>Perception:</strong> Understanding sensory information from the environment</li>
        <li><strong>Language Understanding:</strong> Comprehending and generating human language</li>
        <li><strong>Adaptation:</strong> Improving performance through continuous feedback</li>
      </ul>

      <h3>Core AI Technologies</h3>
      <p>
        Modern AI spans several interconnected disciplines and technologies:
      </p>
      <ul>
        <li><strong>Machine Learning:</strong> Algorithms that learn patterns from data without explicit programming</li>
        <li><strong>Deep Learning:</strong> Neural networks with multiple layers for complex pattern recognition</li>
        <li><strong>Natural Language Processing (NLP):</strong> Understanding and generating human language at scale</li>
        <li><strong>Computer Vision:</strong> Interpreting and analyzing visual information from images and videos</li>
        <li><strong>Reinforcement Learning:</strong> Training agents to make optimal decisions through trial and error</li>
        <li><strong>Robotics:</strong> Creating autonomous systems that interact with the physical world</li>
      </ul>

      <h3>Industry Applications</h3>
      <p>
        AI is transforming virtually every industry with practical solutions:
      </p>
      <ul>
        <li><strong>Healthcare:</strong> Disease diagnosis, drug discovery, personalized medicine, surgical automation</li>
        <li><strong>Finance:</strong> Fraud detection, algorithmic trading, risk assessment, portfolio optimization</li>
        <li><strong>Transportation:</strong> Autonomous vehicles, route optimization, predictive maintenance</li>
        <li><strong>Retail:</strong> Recommendation systems, inventory management, customer service automation</li>
        <li><strong>Manufacturing:</strong> Quality control, predictive maintenance, process optimization</li>
        <li><strong>Education:</strong> Personalized learning paths, intelligent tutoring systems, content recommendations</li>
        <li><strong>Entertainment:</strong> Content recommendation, personalization, creative generation</li>
        <li><strong>Energy:</strong> Grid optimization, renewable energy forecasting, efficiency management</li>
      </ul>

      <h3>The Path Forward</h3>
      <p>
        The field of AI is advancing at an unprecedented pace. Current trends include:
      </p>
      <ul>
        <li>Generative AI and large language models (LLMs) transforming content creation</li>
        <li>Multimodal AI combining text, image, and audio understanding</li>
        <li>Edge AI bringing intelligence to devices at the network edge</li>
        <li>Responsible AI focusing on ethics, transparency, and fairness</li>
        <li>AI automation (AutoML) democratizing AI development</li>
      </ul>

      <h3>Challenges and Considerations</h3>
      <p>
        Along with tremendous opportunities, the AI revolution brings important challenges:
      </p>
      <ul>
        <li><strong>Ethical Concerns:</strong> Ensuring AI systems are fair, transparent, and accountable</li>
        <li><strong>Privacy:</strong> Protecting personal data and respecting user privacy in AI applications</li>
        <li><strong>Bias:</strong> Addressing algorithmic bias that can perpetuate discrimination</li>
        <li><strong>Security:</strong> Safeguarding AI systems against adversarial attacks and misuse</li>
        <li><strong>Workforce Impact:</strong> Preparing for job market transformation and reskilling needs</li>
      </ul>

      <h3>Join the AI Journey</h3>
      <p>
        Whether you want to understand AI better, build AI applications, or contribute to responsible AI development, 
        AgaramAi is your gateway to knowledge and community. Explore our articles, dive into tutorials, and connect with 
        fellow AI enthusiasts. The future of AI is being built today, and you can be part of it.
      </p>
    </section>
  );
};

export default Home;
