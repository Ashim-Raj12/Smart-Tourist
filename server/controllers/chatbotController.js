import FAQ from '../models/FAQ.js';

export const getResponse = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: 'Question is required' });
    }

    // Simple rule-based matching: find FAQ with question containing keywords
    const faqs = await FAQ.find();
    const lowerQuestion = question.toLowerCase();

    const matchedFaq = faqs.find(faq =>
      faq.question.toLowerCase().includes(lowerQuestion) ||
      lowerQuestion.includes(faq.question.toLowerCase())
    );

    if (matchedFaq) {
      return res.json({ answer: matchedFaq.answer });
    } else {
      return res.json({ answer: "Sorry, I don't have an answer for that. Please contact support." });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
