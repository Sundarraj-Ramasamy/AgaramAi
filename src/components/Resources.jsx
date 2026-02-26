import React from "react";

const Resources = () => {
  const resourceCategories = [
    {
      name: "Learning Platforms",
      items: [
        { title: "Coursera - AI & Machine Learning", description: "University-level courses from top institutions", url: "https://www.coursera.org", level: "Beginner to Advanced" },
        { title: "Fast.ai", description: "Practical deep learning for coders with a top-down approach", url: "https://www.fast.ai", level: "Intermediate" },
        { title: "Andrew Ng's Machine Learning Course", description: "Foundational ML course on Coursera", url: "https://www.coursera.org/learn/machine-learning", level: "Beginner" },
        { title: "Kaggle Learn", description: "Free micro-courses on data science and ML", url: "https://www.kaggle.com/learn", level: "Beginner" },
      ]
    },
    {
      name: "Development Frameworks & Libraries",
      items: [
        { title: "TensorFlow", description: "Google's open-source ML framework", url: "https://www.tensorflow.org", focus: "Deep Learning" },
        { title: "PyTorch", description: "Facebook's dynamic deep learning framework", url: "https://pytorch.org", focus: "Research & Production" },
        { title: "scikit-learn", description: "Simple ML library for data mining and analysis", url: "https://scikit-learn.org", focus: "Traditional ML" },
        { title: "Hugging Face Transformers", description: "Pre-trained NLP models and tools", url: "https://huggingface.co", focus: "NLP" },
      ]
    },
    {
      name: "Books & Publications",
      items: [
        { title: "Deep Learning", author: "Goodfellow, Bengio, Courville", description: "Comprehensive deep learning reference", focus: "Deep Learning" },
        { title: "Hands-On Machine Learning", author: "Aurélien Géron", description: "Practical guide with scikit-learn, Keras, and TensorFlow", focus: "Applied ML" },
        { title: "The Hundred-Page Machine Learning Book", author: "Andriy Burkov", description: "Concise ML concepts overview", focus: "Fundamentals" },
        { title: "Artificial Intelligence: A Modern Approach", author: "Russell & Norvig", description: "Classic AI textbook covering broad concepts", focus: "AI Theory" },
      ]
    },
    {
      name: "Research & Academic",
      items: [
        { title: "arXiv", description: "Pre-prints of research papers in computer science", url: "https://arxiv.org", type: "Repository" },
        { title: "Papers with Code", description: "Latest ML papers with implementation code", url: "https://paperswithcode.com", type: "Repository" },
        { title: "Google Scholar", description: "Search engine for academic publications", url: "https://scholar.google.com", type: "Search" },
        { title: "OpenReview", description: "Open review platform for ML conferences", url: "https://openreview.net", type: "Repository" },
      ]
    },
    {
      name: "Communities & Networking",
      items: [
        { title: "Kaggle Competitions", description: "Participate in data science competitions and collaborate", url: "https://www.kaggle.com", type: "Community" },
        { title: "AI/ML Reddit Communities", description: "r/MachineLearning and r/learnmachinelearning", url: "https://reddit.com", type: "Forum" },
        { title: "Local AI Meetups", description: "Find AI enthusiasts and professionals in your area", url: "https://www.meetup.com", type: "Networking" },
        { title: "AI Conferences", description: "NeurIPS, ICML, ICCV, ACL and more", type: "Events" },
      ]
    },
    {
      name: "Tools & Utilities",
      items: [
        { title: "Jupyter Notebook", description: "Interactive computing environment for Python", url: "https://jupyter.org", type: "Tool" },
        { title: "Google Colab", description: "Free cloud-based Jupyter notebook environment", url: "https://colab.research.google.com", type: "Cloud" },
        { title: "Weights & Biases", description: "Experiment tracking and model management", url: "https://wandb.ai", type: "MLOps" },
        { title: "DVC (Data Version Control)", description: "Version control for ML workflows", url: "https://dvc.org", type: "MLOps" },
      ]
    }
  ];

  return (\n    <>\n      <section id=\"resources\">\n        <h2>Comprehensive AI Resources</h2>\n        <p>\n          Accelerate your AI learning journey with our curated collection of resources. From foundational courses to cutting-edge \n          research papers, we've compiled the best tools, platforms, and materials to support your growth in artificial intelligence.\n        </p>\n\n        {resourceCategories.map((category, index) => (\n          <div key={index} className=\"resource-category\">\n            <h3>{category.name}</h3>\n            <div className=\"resource-items\">\n              {category.items.map((item, itemIndex) => (\n                <div key={itemIndex} className=\"resource-item\">\n                  <h4>\n                    {item.url ? (\n                      <a href={item.url} target=\"_blank\" rel=\"noopener noreferrer\">\n                        {item.title}\n                      </a>\n                    ) : (\n                      item.title\n                    )}\n                  </h4>\n                  <p>{item.description}</p>\n                  <div className=\"resource-tags\">\n                    {item.level && <span className=\"tag\">{item.level}</span>}\n                    {item.focus && <span className=\"tag\">{item.focus}</span>}\n                    {item.author && <span className=\"tag\">By {item.author}</span>}\n                    {item.type && <span className=\"tag\">{item.type}</span>}\n                  </div>\n                </div>\n              ))}\n            </div>\n          </div>\n        ))}\n      </section>\n\n      <section id=\"getting-started\">\n        <h2>Getting Started with AI</h2>\n        <h3>Beginner Path</h3>\n        <ol>\n          <li><strong>Understand the Basics:</strong> Start with foundational AI and ML concepts through articles and YouTube videos</li>\n          <li><strong>Learn Python:</strong> Master Python programming, the de facto language for AI development</li>\n          <li><strong>Explore ML Fundamentals:</strong> Take Andrew Ng's Machine Learning course or similar structured curriculum</li>\n          <li><strong>Hands-On Projects:</strong> Build simple projects using scikit-learn and datasets from Kaggle</li>\n          <li><strong>Study Deep Learning:</strong> Progress to neural networks and deep learning frameworks</li>\n        </ol>\n\n        <h3>Resources by Learning Style</h3>\n        <ul>\n          <li><strong>Visual Learners:</strong> YouTube channels like 3Blue1Brown, StatQuest, and Yannic Kilcher</li>\n          <li><strong>Hands-On Learners:</strong> Fast.ai, Kaggle competitions, and interactive Jupyter notebooks</li>\n          <li><strong>Academic Learners:</strong> Classic textbooks and research papers from arXiv</li>\n          <li><strong>Project-Based Learners:</strong> Build end-to-end projects and contribute to open-source</li>\n        </ul>\n      </section>\n\n      <section id=\"advanced-resources\">\n        <h2>Advanced Learning</h2>\n        <h3>For Professionals</h3>\n        <ul>\n          <li>Read recent research papers on arXiv and Papers with Code</li>\n          <li>Participate in Kaggle competitions to challenge your skills</li>\n          <li>Contribute to open-source ML projects on GitHub</li>\n          <li>Attend conferences like NeurIPS, ICML, and ICCV</li>\n          <li>Follow AI pioneers on Twitter and blogs</li>\n        </ul>\n\n        <h3>Specialized Topics</h3>\n        <p>\n          Once comfortable with fundamentals, explore specialized areas that match your interests:\n        </p>\n        <ul>\n          <li>Computer Vision: CV libraries, segmentation, 3D vision</li>\n          <li>Natural Language Processing: Transformers, LLMs, multimodal models</li>\n          <li>Reinforcement Learning: Advanced algorithms, robotics applications</li>\n          <li>AI Ethics: Fairness, bias mitigation, responsible AI</li>\n          <li>MLOps: Model deployment, monitoring, and production systems</li>\n        </ul>\n      </section>\n    </>\n  );\n};\n\nexport default Resources;\n