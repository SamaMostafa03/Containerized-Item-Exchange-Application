import { Request, Response, NextFunction } from 'express';
import { getDonationsQuery, getExchangesQuery, getContributionsQuery } from '../../database/queries';

const getStatistics = async (req : Request, res : Response, next: NextFunction) => {
  try {
    const response = await Promise.all(
      [getDonationsQuery(), getExchangesQuery(), getContributionsQuery(),
      ],
    );
    const donateTimes = response[0];
    const exchangeTimes = response[1];
    const contributeTimes = response[2];

    res.json({ donateTimes, exchangeTimes, contributeTimes });
  } catch (error) {
    next(error);
  }
};

export default getStatistics;
