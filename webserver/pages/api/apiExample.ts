import quotes from '../../quotes.json';

export default (req, res) => {
    switch (req.method) {
      case 'GET': 
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        res.status(200).json(quote);
        break
      case 'POST':
        //...
        break
      default:
        res.status(405).end() //Method Not Allowed
        break
    }
  };
