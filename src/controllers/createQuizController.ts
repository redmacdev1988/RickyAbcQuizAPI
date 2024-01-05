

export async function createQuizController(req: any, res: any) {
    
    try {
      const { db } = req.app;
  
      const { userId, score, question, correctAnswers, choices } = req.body;
  
      if (!score) {
        return res.status(400).json({ message: 'Score is required' });
      }
  
      if (!question) {
        return res.status(400).json({ message: 'question is required' });
      }
  
      if (!correctAnswers || !Array.isArray(correctAnswers) || correctAnswers.length <= 0) {
        return res.status(400).json({ message: 'correctAnswers must have valid data' });
      }
      
      if (!choices || !Array.isArray(choices) || choices.length <= 0) {
        return res.status(400).json({ message: 'choices must have valid data' });
      }
  
      // check if customer exists
  
      const existingUser = await db.collection('users').findOne({
        email: userId.toLowerCase()
      });

  
      if (!existingUser) {
        return res.status(400).json({ message: 'User Does not exists' });
      }
  
    const date = new Date();
    console.log(date.toLocaleString());

      const result = await db.collection('EnglishQuiz').insertOne({
        userId: userId.toLowerCase(),
        score,
        question,
        correctAnswers,
        choices,
        timestamp: new Date().toLocaleString()
      });
  
      if (result.acknowledged) {
        res.status(200).json({ message: `Quiz for User ${userId} created` });
      } else {
        throw new Error('Customer not created');
      }
  
    }
    catch(error) {
      res.status(500).json({ error: error.toString() });
    }
  }