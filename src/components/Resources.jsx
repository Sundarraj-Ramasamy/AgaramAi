import React from "react";

const Resources = () => {
  const resourceCategories = [
    {
      name: "Learning Platforms",
      items: [
        {
          title: "Coursera - AI & Machine Learning",
          description: "University-level courses from top institutions",
          url: "https://www.coursera.org",
          level: "Beginner to Advanced"
        },
        {
          title: "Fast.ai",
          description: "Practical deep learning for coders with a top-down approach",
          url: "https://www.fast.ai",
          level: "Intermediate"
        },
        {
          title: "Andrew Ng's Machine Learning Course",
          description: "Foundational ML course on Coursera",
          url: "https://www.coursera.org/learn/machine-learning",
          level: "Beginner"
        },
        {
          title: "Kaggle Learn",
          description: "Free micro-courses on data science and ML",
          url: "https://www.kaggle.com/learn",
          level: "Beginner"
        }
      ]
    },
    {
      name: "Development Frameworks & Libraries",
      items: [
        {
          title: "TensorFlow",
          description: "Google's open-source ML framework",
          url: "https://www.tensorflow.org",
          focus: "Deep Learning"
        },
        {
          title: "PyTorch",
          description: "Facebook's dynamic deep learning framework",
          url: "https://pytorch.org",
          focus: "Research & Production"
        },
        {
          title: "scikit-learn",
          description: "Simple ML library for data mining and analysis",
          url: "https://scikit-learn.org",
          focus: "Traditional ML"
        },
        {
          title: "Hugging Face Transformers",
          description: "Pre-trained NLP models and tools",
          url: "https://huggingface.co",
          focus: "NLP"
        }
      ]
    },
    {
      name: "Books & Publications",
      items: [
        {
          title: "Deep Learning",
          author: "Goodfellow, Bengio, Courville",
          description: "Comprehensive deep learning reference",
          focus: "Deep Learning"
        },
        {
          title: "Hands-On Machine Learning",
          author: "Aurélien Géron",
          description: "Practical guide with scikit-learn, Keras, and TensorFlow",
          focus: "Applied ML"
        },
        {
          title: "The Hundred-Page Machine Learning Book",
          author: "Andriy Burkov",
          description: "Concise ML concepts overview",
          focus: "Fundamentals"
        },
        {
          title: "Artificial Intelligence: A Modern Approach",
          author: "Russell & Norvig",
          description: "Classic AI textbook covering broad concepts",
          focus: "AI Theory"
        }
      ]
    },
    {
      name: "Research & Academic",
      items: [
        {
          title: "arXiv",
          description: "Pre-prints of research papers in computer science",
          url: "https://arxiv.org",
          type: "Repository"
        },
        {
          title: "Papers with Code",
          description: "Latest ML papers with implementation code",
          url: "https://paperswithcode.com",
          type: "Repository"
        },
        {
          title: "Google Scholar",
          description: "Search engine for academic publications",
          url: "https://scholar.google.com",
          type: "Search"
        },
        {
          title: "OpenReview",
          description: "Open review platform for ML conferences",
          url: "https://openreview.net",
          type: "Repository"
        }
      ]
    },
    {
      name: "Communities & Networking",
      items: [
        {
          title: "Kaggle Competitions",
          description: "Participate in data science competitions and collaborate",
          url: "https://www.kaggle.com",
          type: "Community"
        },
        {
          title: "AI/ML Reddit Communities",
          description: "r/MachineLearning and r/learnmachinelearning",
          url: "https://reddit.com",
          type: "Forum"
        },
        {
          title: "Local AI Meetups",
          description: "Find AI enthusiasts and professionals in your area",
          url: "https://www.meetup.com",
          type: "Networking"
        },
        {
          title: "AI Conferences",
          description: "NeurIPS, ICML, ICCV, ACL and more",
          type: "Events"
        }
      ]
    },
    {
      name: "Tools & Utilities",
      items: [
        {
          title: "Jupyter Notebook",
          description: "Interactive computing environment for Python",
          url: "https://jupyter.org",
          type: "Tool"
        },
        {
          title: "Google Colab",
          description: "Free cloud-based Jupyter notebook environment",
          url: "https://colab.research.google.com",
          type: "Cloud"
        },
        {
          title: "Weights & Biases",
          description: "Experiment tracking and model management",
          url: "https://wandb.ai",
          type: "MLOps"
        },
        {
          title: "DVC (Data Version Control)",
          description: "Version control for ML workflows",
          url: "https://dvc.org",
          type: "MLOps"
        }
      ]
    }
  ];

  return (
    <>
      <section id="resources">
        <h2>Comprehensive AI Resources</h2>
        <p>
          Accelerate your AI learning journey with our curated collection of resources. From foundational courses to cutting-edge
          research papers, we've compiled the best tools, platforms, and materials to support your growth in artificial intelligence.
        </p>

        {resourceCategories.map((category, index) => (
          <div key={index} className="resource-category">
            <h3>{category.name}</h3>
            <div className="resource-items">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="resource-item">
                  <h4>
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>
                    ) : (
                      item.title
                    )}
                  </h4>
                  <p>{item.description}</p>
                  <div className="resource-tags">
                    {item.level && <span className="tag">{item.level}</span>}
                    {item.focus && <span className="tag">{item.focus}</span>}
                    {item.author && <span className="tag">By {item.author}</span>}
                    {item.type && <span className="tag">{item.type}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section id="getting-started">
        <h2>Getting Started with AI</h2>
        <h3>Beginner Path</h3>
        <ol>
          <li>
            <strong>Understand the Basics:</strong> Start with foundational AI and ML concepts through articles and YouTube videos
          </li>
          <li>
            <strong>Learn Python:</strong> Master Python programming, the de facto language for AI development
          </li>
          <li>
            <strong>Explore ML Fundamentals:</strong> Take Andrew Ng's Machine Learning course or similar structured curriculum
          </li>
          <li>
            <strong>Hands-On Projects:</strong> Build simple projects using scikit-learn and datasets from Kaggle
          </li>
          <li>
            <strong>Study Deep Learning:</strong> Progress to neural networks and deep learning frameworks
          </li>
        </ol>

        <h3>Resources by Learning Style</h3>
        <ul>
          <li>
            <strong>Visual Learners:</strong> YouTube channels like 3Blue1Brown, StatQuest, and Yannic Kilcher
          </li>
          <li>
            <strong>Hands-On Learners:</strong> Fast.ai, Kaggle competitions, and interactive Jupyter notebooks
          </li>
          <li>
            <strong>Academic Learners:</strong> Classic textbooks and research papers from arXiv
          </li>
          <li>
            <strong>Project-Based Learners:</strong> Build end-to-end projects and contribute to open-source
          </li>
        </ul>
      </section>

      <section id="advanced-resources">
        <h2>Advanced Learning</h2>
        <h3>For Professionals</h3>
        <ul>
          <li>Read recent research papers on arXiv and Papers with Code</li>
          <li>Participate in Kaggle competitions to challenge your skills</li>
          <li>Contribute to open-source ML projects on GitHub</li>
          <li>Attend conferences like NeurIPS, ICML, and ICCV</li>
          <li>Follow AI pioneers on Twitter and blogs</li>
        </ul>

        <h3>Specialized Topics</h3>
        <p>
          Once comfortable with fundamentals, explore specialized areas that match your interests:
        </p>
        <ul>
          <li>Computer Vision: CV libraries, segmentation, 3D vision</li>
          <li>Natural Language Processing: Transformers, LLMs, multimodal models</li>
          <li>Reinforcement Learning: Advanced algorithms, robotics applications</li>
          <li>AI Ethics: Fairness, bias mitigation, responsible AI</li>
          <li>MLOps: Model deployment, monitoring, and production systems</li>
        </ul>
      </section>
    </>
  );
};

export default Resources;
