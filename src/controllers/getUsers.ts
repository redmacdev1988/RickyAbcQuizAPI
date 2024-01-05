
export async function getUsers(req: any, res: any) {
    try {
      const { db } = req.app;
  
      const result = await db.collection('users').find().toArray();
      res.status(200).json({
        message: "Users retrieved",
        customers: result
      });
  
    }
    catch(error) {
      res.status(500).json({ error: error.toString() });
    }
  }