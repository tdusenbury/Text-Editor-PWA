import { openDB } from 'idb';

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

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  const jateDb = await openDB('jate', 1);
  const trans = jateDb.transaction('jate', 'readwrite');
  const store = trans.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  const jateDb = await openDB('jate', 1);
  const trans = jateDb.transaction('jate', 'readonly');
  const store = trans.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  console.log('result.value', result);

  result
    ? console.log("Data retrieved from the database", result.value)
    : console.log("Data not found");
  return result;
};

initdb();
