import { openDB } from 'idb';
//This function opens our database if exists if no, it makes it.
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
// This function adds our content(text) into our indexedDB called jate
export const putDb = async (content) => {
  console.log('PUT request to the database received');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({id: 1, value: content });
  const result = await request;
  console.log('Data saved to the database', result);
};
// This function get our content(text) from our indexedDB called jate
export const getDb = async () => {
  console.log('GET request to the database received');
  const jateDb = await openDB('jate', 1);
  const text = jateDb.transaction('jate', 'readonly');
  const store = text.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  console.log('result.value', result);
  // result
  //   ? console.log('Data sent from database', result.value)
  //   : console.error('GET not got');
  return result?.value;
};
initdb();


