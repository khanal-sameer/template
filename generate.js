import Mustache from "mustache";
import path from "node:path";


import {
  mapArgs,
  initProject,
  populatePath,
  readFile,
  writeFile,
  readDir,
} from "./utils.js";

const replaceIterableInt = (nestedString = "", key) => {
  const regex = new RegExp('"' + key + '"\\s*:\\s*(\\d+)', "g");
  return nestedString.replace(regex, function (_, value) {
    const arr = new Array(+value).fill(+value);

    return '"' + key + '": [' + arr + "]";
  });
};

const populateHTML = (lang, page, lang_temp,pages,project) => {
  const template = readFile(page);
  
  const data = readFile(lang);
  const temp = readFile(lang_temp)
  const parsed = JSON.parse(data)
  const langReplaced = Mustache.render(temp, parsed)

  const replaceData = replaceIterableInt(langReplaced, "rating");

  const parsedData = JSON.parse(replaceData);

  if (!data || !template) return;

  const partials = readDir("partials");
  const rendered = Mustache.render(template, parsedData, partials)
  const locale_name = path.parse(lang).name
  const page_name = path.join(pages,`${project}_${locale_name}.html`)

  writeFile(page_name, rendered);

  return rendered;
};

const allowedActions = { init: true, populate: true };

const checkMultiple = (args, options) => {
  for (let key in args) {
    if (key in options && !options[key] && args[key].length > 1) {
      throw new Error(`${key} doesn't allow multiple values.`);
    }
  }
};

const init = (args) => {
  const options = {
    project: true,
    locale: true,
    base: false,
  };

  checkMultiple(args, options);
  return initProject(args);
};

const populate = (args) => {
  const options = {project: false };
  checkMultiple(args, options);
  const [locales, page, lang_temp,pages, project] = populatePath(args?.project[0])
  

 locales.forEach((lang) => populateHTML(lang, page, lang_temp,pages,project));
};

const actions = {
  init: init,
  populate: populate,
};

const generate = () => {
  try {
    const args = mapArgs(allowedActions);

    const key = args.action;
    const action = actions[key];
    delete args.action;

    action(args);
  } catch (err) {
    console.error(err.message);
  }
};

generate();
