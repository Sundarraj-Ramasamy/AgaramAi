import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const faqData = {
  'What is AgaramAi?': 'AgaramAi is a cutting-edge AI solutions company specializing in machine learning, artificial intelligence, and intelligent automation. We help businesses leverage AI to solve complex problems and drive innovation.',
  'What services do you offer?': 'We offer a range of services including machine learning model development, AI consulting, data analytics, natural language processing, computer vision solutions, and custom AI applications tailored to your business needs.',
  'How can AI help my business?': 'AI can help your business by automating processes, improving decision-making through data insights, enhancing customer experience, reducing operational costs, and creating new revenue opportunities through intelligent solutions.',
  'What is machine learning?': 'Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without explicit programming. It uses algorithms to analyze data and make predictions or decisions automatically.',
  'Do you provide training?': 'Yes! We offer training programs and workshops on AI, machine learning, and data science. You can contact us through our contact form to discuss customized training solutions for your team.',
  'How do I get started?': 'To get started with AgaramAi, simply fill out our contact form with your requirements, and our team will reach out to discuss your project needs and provide tailored solutions.',
  'What is NLP?': 'Natural Language Processing (NLP) is a branch of AI that helps computers understand, interpret, and generate human language. It\'s used in chatbots, sentiment analysis, translation, and text mining.',
  'What is computer vision?': 'Computer vision is an AI field that enables machines to interpret and analyze visual information from images and videos. It\'s used in facial recognition, object detection, medical imaging, and autonomous vehicles.',
  'How do you ensure data security?': 'Data security is our top priority. We follow industry best practices, implement encryption, comply with regulations like GDPR, and maintain strict access controls to protect your sensitive information.',
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! Welcome to AgaramAi. How can I help you today? Select a question below or type your own.',
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [suggestedQuestions, setSuggestedQuestions] = useState(Object.keys(faqData).slice(0, 3));
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBestMatch = (userQuestion) => {
    const lowerInput = userQuestion.toLowerCase();
    const questions = Object.keys(faqData);

    // Exact match
    for (let q of questions) {
      if (q.toLowerCase() === lowerInput) {
        return faqData[q];
      }
    }

    // Partial match - find the best matching question
    let bestMatch = null;
    let maxScore = 0;
    const keywords = lowerInput.split(/\s+/);

    for (let question of questions) {
      const qKeywords = question.toLowerCase().split(/\s+/);
      const matchCount = keywords.filter(kw => 
        qKeywords.some(qkw => qkw.includes(kw) || kw.includes(qkw))
      ).length;

      if (matchCount > maxScore) {
        maxScore = matchCount;
        bestMatch = question;
      }
    }

    if (maxScore > 0 && bestMatch) {
      return faqData[bestMatch];
    }

    // Default response
    return "I'm not sure about that. Feel free to ask about our services, machine learning, AI solutions, or contact us directly for more detailed information.";
  };

  const handleSendMessage = (message = userInput) => {
    if (!message.trim()) return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      type: 'user',
      text: message,
    };

    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');

    // Get bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        text: findBestMatch(message),
      };
      setMessages(prev => [...prev, botResponse]);

      // Update suggested questions
      const allQuestions = Object.keys(faqData);
      const randomSuggestions = allQuestions
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      setSuggestedQuestions(randomSuggestions);
    }, 500);
  };

  const handleQuestionClick = (question) => {
    handleSendMessage(question);
  };

  const resetChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        text: 'Hello! Welcome to AgaramAi. How can I help you today? Select a question below or type your own.',
      }
    ]);
    const allQuestions = Object.keys(faqData);
    const randomSuggestions = allQuestions
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    setSuggestedQuestions(randomSuggestions);
    setUserInput('');
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="chatbot-floating-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
        title="Chat with us"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {/* Chatbot Window */}
      <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <h3>AgaramAi Assistant</h3>
          <button
            className="chatbot-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close chatbot"
          >
            ×
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.type}`}
              role={msg.type === 'bot' ? 'region' : 'status'}
              aria-label={msg.type === 'bot' ? 'Bot message' : 'Your message'}
            >
              <div className="message-content">{msg.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length <= 3 && (
          <div className="chatbot-suggestions">
            <p className="suggestions-label">Quick questions:</p>
            {suggestedQuestions.map((question, idx) => (
              <button
                key={idx}
                className="suggestion-button"
                onClick={() => handleQuestionClick(question)}
              >
                {question}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="chatbot-input-area">
          <input
            type="text"
            className="chatbot-input"
            placeholder="Ask a question..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            aria-label="Chat input"
          />
          <button
            className="chatbot-send"
            onClick={() => handleSendMessage()}
            aria-label="Send message"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>

        {/* Reset Button */}
        {messages.length > 3 && (
          <button
            className="chatbot-reset"
            onClick={resetChat}
            aria-label="Reset conversation"
          >
            Start New Conversation
          </button>
        )}
      </div>
    </>
  );
};

export default Chatbot;
