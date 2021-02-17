import superagent from 'superagent';

export const getListings = async (mls: string) => {

    const response = await superagent.get(`http://localhost:5000/api/map/rets/listings?code=${mls}`);
    return response;
}
