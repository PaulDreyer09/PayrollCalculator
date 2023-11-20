import * as fs from 'fs';

export const fetch_data = async (path) => {
  try{     
      const res = await fs.promises.readFile('.' + path);
      return JSON.parse(res);
  } catch (error) {
    throw new Error("Error fetching data from file. " + error.message)
  }
}