import mongoose from 'mongoose';
import dotenv from 'dotenv';
import FAQ from './models/FAQ.js';

dotenv.config();

const faqs = [
  {
    question: 'What should I do in case of emergency?',
    answer: 'In case of emergency, call your local emergency services immediately (e.g., 911 in the US). If you\'re a tourist, contact the tourist police or your embassy for assistance.'
  },
  {
    question: 'How do I stay safe while traveling?',
    answer: 'Stay aware of your surroundings, avoid walking alone at night, keep valuables secure, and use our app\'s safety features to check risky zones.'
  },
  {
    question: 'What are safe zones?',
    answer: 'Safe zones are areas marked as low-risk in our app. You can view them on the map feature as green circles. Always check the app before visiting new areas.'
  },
  {
    question: 'What are moderate zones?',
    answer: 'Moderate zones are areas with some reported incidents. Exercise caution when entering these areas and stay alert.'
  },
  {
    question: 'What are danger zones?',
    answer: 'Danger zones are high-risk areas with frequent incidents. The app will alert you if you enter one. Avoid these areas whenever possible.'
  },
  {
    question: 'How does the emergency contact work?',
    answer: 'During registration, you can set an emergency contact. In case of SOS, the app will call this contact.'
  },
  {
    question: 'Can I update my profile?',
    answer: 'Yes, go to the Profile page to update your information, including emergency contact details.'
  },
  {
    question: 'What is a risky zone?',
    answer: 'Risky zones are areas with higher reported incidents. The app will alert you if you enter one. Please avoid these areas when possible.'
  },
  {
    question: 'How to use the map?',
    answer: 'The map shows your location and marks safe (green), moderate (yellow), and danger (red) zones. Use it to plan your routes and stay informed.'
  },
  {
    question: 'What information do I need to register?',
    answer: 'You need a name, email, password, and emergency contact number to register.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, we use encryption and secure practices to protect your data. Your information is only used for safety purposes.'
  },
  {
    question: 'How do I log out?',
    answer: 'Click the Logout button in the navigation menu.'
  }
];

const seedFAQs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await FAQ.deleteMany(); // Clear existing FAQs
    await FAQ.insertMany(faqs);
    console.log('FAQs seeded successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding FAQs:', error);
  }
};

seedFAQs();
