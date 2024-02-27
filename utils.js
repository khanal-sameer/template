import { globSync } from "glob";
import fs from "node:fs";
import path from "node:path";

const root = path.dirname(new URL(import.meta.url).pathname);
const config = { encoding: "utf-8" };

const getPath = (src) => path.join(root, src);

export const readFile = (src = "") => {
  try {
    return fs.readFileSync(getPath(src), config);
  } catch (err) {
    console.log(err.message);
  }
};
const rootAbs = [".", "/", "./"];

const createDir = (dest = "") => {
  const dirname = path.dirname(dest);
  if (rootAbs.includes(dirname)) return;

  fs.mkdirSync(dirname, { recursive: true });
};

export const readDir = (src) => {
  try {
    return fs.readdirSync(getPath(src), { ...config }).reduce((acc, file) => {
      const fileName = path.basename(file, path.extname(file));
      const fileRead = readFile(path.join(src, file));
      acc[fileName] = fileRead;

      return acc;
    }, {});
  } catch (err) {
    console.log(err.message);
  }
};

export const writeFile = (dest = "", data = "") => {
  try {
    createDir(dest);
    fs.writeFileSync(getPath(dest), data, { ...config, flag: "w" });
  } catch (err) {
    console.log(err.message);
  }
};

export const createFile = (dest = "", data = "") => {
  try {
    const dirname = path.dirname(dest);

    if (!fs.existsSync(dirname)) createDir(dest);
    if (fs.existsSync(dest)) return;

    writeFile(dest, data);
  } catch (err) {
    console.log(err.message);
  }
};

export const extractKeyAndValue = (val = "") => {
  let [key = "", value = ""] = val.split("=");

  key = key.substring(1);
  value = value.split(",");

  return [key, value];
};

export const mapArgs = (actions) => {
  const action = process.argv[2];
  const args = process.argv.slice(3);

  if (!action || !actions[action]) {
    throw new Error("First option must be either init or generate");
  }

  return args.reduce(
    (acc, arg) => {
      const [key, value] = extractKeyAndValue(arg);
      acc[key] = value;
      return acc;
    },
    { action }
  );
};

export const createFilePath = (prefix = "", values = {}) => {
  const projects = (values.project || []).filter(Boolean);
  const locales = (values.locale || []).filter(Boolean);

  if (!projects.length) {
    throw new Error("option project not provided");
  }

  if (!locales.length) {
    throw new Error("option locale not provided");
  }

  return projects.reduce((acc, project) => {
    for (const lang of locales) {
      const langPath = path.join(prefix, project, "locales", `${lang}.json`);
      acc.push(langPath);
    }
    return acc;
  }, []);
};

export const initProject = (values) => {
  const base = values.base ? readFile(path.join(values.base[0])) : "";
  const trees = createFilePath("projects", values);

  trees.forEach((tree) => createFile(tree, base));
};

export const populatePath = () => {
  const projects = globSync("projects/*");

  if (!projects.length) {
    throw new Error(
      "Projects not initialized, please run yarn generate to create projects."
    );
  }

  return projects.reduce((acc, item) => {
    const locales = globSync(item + "/locales/*.json");
    const project = path.basename(item);

    locales.forEach((locale) => {
      const lang = path.basename(locale, ".json");
      const page = `${item}/pages/${project}_${lang}.html`;
      acc.push([locale, page]);
    });

    return acc;
  }, []);
};
