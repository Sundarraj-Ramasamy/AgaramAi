import React from "react";

const Articles = () => {
  const articles = [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      date: "February 2024",
      readTime: "12 min read",
      author: "Dr. Sarah Chen",
      description: "Learn the fundamentals of machine learning, including supervised and unsupervised learning techniques, and how they are used to train models for AI applications.",
      content: "Explore real-world examples of machine learning algorithms in action and understand their impact in various industries such as healthcare, finance, and transportation.",
      key_topics: ["Supervised Learning", "Unsupervised Learning", "Model Training", "Evaluation Metrics"]
    },
    {
      id: 2,
      title: "Natural Language Processing (NLP)",
      date: "January 2024",
      readTime: "15 min read",
      author: "Dr. James Mitchell",
      description: "Discover how NLP enables computers to understand, interpret, and generate human language, and explore its applications in sentiment analysis, language translation, and chatbots.",
      content: "Learn about popular NLP libraries and frameworks and get hands-on experience in building NLP models to solve real-world problems.",
      key_topics: ["Tokenization", "Sentiment Analysis", "Named Entity Recognition", "Language Models"]
    },
    {
      id: 3,
      title: "Computer Vision and Image Recognition",
      date: "December 2023",
      readTime: "14 min read",
      author: "Dr. Maria Rodriguez",
      description: "Delve into the world of computer vision and image recognition, and understand how AI algorithms can analyze and interpret visual data.",
      content: "Learn about convolutional neural networks (CNNs), image preprocessing techniques, and explore state-of-the-art computer vision models.",
      key_topics: ["CNNs", "Object Detection", "Image Classification", "Transfer Learning"]
    },
    {
      id: 4,
      title: "Reinforcement Learning: Training Intelligent Agents",
      date: "November 2023",
      readTime: "16 min read",
      author: "Dr. Alex Kumar",
      description: "Explore the exciting field of reinforcement learning, where agents learn to make decisions by interacting with an environment.",
      content: "Learn about popular algorithms like Q-Learning and DQNs. Discover applications in autonomous vehicles, game playing, and robotics.",
      key_topics: ["Q-Learning", "Policy Gradient", "Reward Design", "Agent Training"]
    },
    {
      id: 5,
      title: "AI Ethics and Bias in Machine Learning",
      date: "October 2023",
      readTime: "13 min read",
      author: "Dr. Emily Thompson",
      description: "Dive into the critical topic of AI ethics and bias. Understand the ethical implications of AI technologies and fairness concerns.",
      content: "Learn practical strategies for identifying and mitigating bias in machine learning systems and creating responsible AI.",
      key_topics: ["Fairness in AI", "Bias Detection", "Privacy", "Responsible AI"]
    },
    {
      id: 6,
      title: "Generative AI and Large Language Models",
      date: "September 2023",
      readTime: "17 min read",
      author: "Dr. Robert Williams",
      description: "Understand the revolutionary impact of generative AI and large language models like GPT-4.",
      content: "Explore transformer architecture, training processes, and practical applications including content generation and code assistance.",
      key_topics: ["Transformers", "LLMs", "Prompt Engineering", "Fine-tuning"]
    }
  ];

  return (
    <section id="articles">
      <h2>Featuring Articles</h2>
      <p>
        Dive into our collection of in-depth articles covering everything from AI fundamentals to cutting-edge research. 
        Each article is written by industry experts and includes practical insights you can apply immediately.
      </p>

      <div className="articles-grid">
        {articles.map((article) => (
          <article key={article.id} className="article-card">
            <div className="article-header">
              <h3>{article.title}</h3>
              <div className="article-meta">
                <span className="author">By {article.author}</span>
                <span className="date">{article.date}</span>
                <span className="read-time">{article.readTime}</span>
              </div>
            </div>
            <p className="article-description">{article.description}</p>
            <p className="article-preview">{article.content}</p>
            <div className="article-topics">
              {article.key_topics.map((topic, index) => (
                <span key={index} className="topic-tag">{topic}</span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <h3>Article Categories</h3>
      <ul>
        <li><strong>Fundamentals:</strong> Core concepts and theories in AI and machine learning</li>
        <li><strong>Applied AI:</strong> Real-world applications and case studies from various industries</li>\n        <li><strong>Advanced Topics:</strong> Deep dives into specialized areas and cutting-edge research</li>
        <li><strong>Best Practices:</strong> Practical tips for implementing AI solutions responsibly</li>
        <li><strong>Ethics & Safety:</strong> Important considerations for responsible AI development</li>
      </ul>
    </section>
  );
};

export default Articles;
