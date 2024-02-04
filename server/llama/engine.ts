import { storageContextFromDefaults, VectorStoreIndex } from "llamaindex";

async function getQueryEngine() {
  const secondStorageContext = await storageContextFromDefaults({
    persistDir: "./server/data/storage",
  });

  const loadedIndex = await VectorStoreIndex.init({
    storageContext: secondStorageContext,
  });

  return loadedIndex.asQueryEngine();
}

export const queryEngine = await getQueryEngine();
