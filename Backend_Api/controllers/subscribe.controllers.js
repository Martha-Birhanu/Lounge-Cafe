const Subscriber = require('../models/subscribe.model');


//post
const subscribeUser = async(req, res) =>{
    const { email } = req.body;


    try{
        // Check if email already exists
        const existing = await Subscriber.findOne({ email });
        if (existing) {
          return res.status(409).json({ message: 'This email is already subscribed.' });
        }
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();


        res.status(201).json({ message: 'Successfully subscribed!' });



    } catch (error) {
        console.error('Subscription error:', error);
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }

};




//post
const unsubscribeUser = async (req, res) => {
  const { email } = req.body;

  try {
    const removed = await Subscriber.findOneAndDelete({ email });

    if (!removed) {
      return res.status(404).json({ message: 'Email not found in subscription list.' });
    }

    res.status(200).json({ message: 'You have been unsubscribed successfully.' });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};

module.exports = { 
    subscribeUser,
    unsubscribeUser

};

