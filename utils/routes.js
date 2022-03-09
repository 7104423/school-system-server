import fs from "fs";

/**
 * @param {string} directoryPath
 * @returns {Promise}
 */
export const getRoutes = async directoryPath => {
  const files = await fs.promises.readdir(directoryPath);
  return files
    .filter(file => !file.startsWith("_") && file.endsWith(".js"))
    .map(file => [file.replace(".js", ""), import(`${directoryPath}/${file}`)]);
};
