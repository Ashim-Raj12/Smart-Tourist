import FAQ from "../models/FAQ.js";

// Simple keyword extraction
const extractKeywords = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // Remove punctuation
    .split(/\s+/)
    .filter((word) => word.length > 2); // Filter out short words
};

// Calculate similarity score
const calculateSimilarity = (keywords1, keywords2) => {
  const set1 = new Set(keywords1);
  const set2 = new Set(keywords2);
  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  return intersection.size / union.size;
};

// Hardcoded FAQs as fallback
const defaultFAQs = [
  {
    question: "What should I do in case of emergency?",
    answer:
      "In case of emergency, call your local emergency services immediately (e.g., 911 in the US). If you're a tourist, contact the tourist police or your embassy for assistance.",
  },
  {
    question: "How do I stay safe while traveling?",
    answer:
      "Stay aware of your surroundings, avoid walking alone at night, keep valuables secure, and use our app's safety features to check risky zones.",
  },
  {
    question: "What are safe zones?",
    answer:
      "Safe zones are areas marked as low-risk in our app. You can view them on the map feature. Always check the app before visiting new areas.",
  },
  {
    question: "How does the emergency contact work?",
    answer:
      "During registration, you can set an emergency contact. In case of SOS, the app will attempt to alert this contact with your location.",
  },
  {
    question: "Can I update my profile?",
    answer:
      "Yes, go to the Profile page to update your information, including emergency contact details.",
  },
  {
    question: "What is a risky zone?",
    answer:
      "Risky zones are areas with higher reported incidents. The app will alert you if you enter one. Please avoid these areas when possible.",
  },
  {
    question: "How to use the map?",
    answer:
      "The map shows your location and marks safe (green) and risky (red) zones. Use it to plan your routes and stay informed.",
  },
  {
    question: "What information do I need to register?",
    answer:
      "You need a name, email, password, and emergency contact number to register.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we use encryption and secure practices to protect your data. Your information is only used for safety purposes.",
  },
  {
    question: "How do I log out?",
    answer: "Click the Logout button in the navigation menu.",
  },
];

export const getResponse = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    let faqs = await FAQ.find();
    if (faqs.length === 0) {
      faqs = defaultFAQs;
    }

    const questionKeywords = extractKeywords(question);

    let bestMatch = null;
    let bestScore = 0;

    for (const faq of faqs) {
      const faqKeywords = extractKeywords(faq.question);
      const score = calculateSimilarity(questionKeywords, faqKeywords);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = faq;
      }
    }

    // Threshold for matching
    if (bestScore > 0.3) {
      return res.json({ answer: bestMatch.answer });
    } else {
      // Fallback responses based on keywords
      const lowerQuestion = question.toLowerCase();
      if (
        lowerQuestion.includes("emergency") ||
        lowerQuestion.includes("help")
      ) {
        return res.json({
          answer:
            "In case of emergency, call your local emergency services immediately. If you're in a tourist area, contact the tourist police or your embassy.",
        });
      } else if (
        lowerQuestion.includes("safe") ||
        lowerQuestion.includes("safety")
      ) {
        return res.json({
          answer:
            "Stay aware of your surroundings, avoid risky areas, and use our app's safety features to stay informed.",
        });
      } else if (
        lowerQuestion.includes("map") ||
        lowerQuestion.includes("location")
      ) {
        return res.json({
          answer:
            "Use the map feature in our app to view safe and risky zones in your area.",
        });
      } else {
        return res.json({
          answer:
            "I'm sorry, I don't have specific information for that. Please try rephrasing your question or contact support for assistance.",
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
