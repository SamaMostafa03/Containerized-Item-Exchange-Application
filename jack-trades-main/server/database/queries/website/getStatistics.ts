import { Product, Request } from '../../../models';

const getDonationsQuery = async () => Product.count({
  where: {
    type: 'donation',
  },
});

const getExchangesQuery = async () => Request.count({
  where: {
    status: 'success',
  },
});

const getContributionsQuery = async () => Product.count();

export { getDonationsQuery, getExchangesQuery, getContributionsQuery };
