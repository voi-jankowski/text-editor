import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("Adding content to the database:", content);

  // Create a connection to the database and specify the database and data privileges.
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");

  const request = store.put({ id: 1, value: content });

  // Get confirmation of the request.
  const result = await request;

  console.log("Content added to the database:", result);
  return result;
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("Getting all content from the database");

  // Create a connection to the database and specify the database and data privileges.
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");

  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;
  const value = result?.value;
  console.log("All content from the database:", value);
  return value;
};

initdb();
