import jwt from 'jsonwebtoken';

const generateToken = (id:number, email:string) : Promise <string> => (
  new Promise((resolve, rejected) => {
    jwt.sign({ id, email }, process.env.SECRET_KEY, (error:Error, token:string) => {
      if (error) {
        rejected(error);
      } else {
        resolve(token);
      }
    });
  }));

export default generateToken;
