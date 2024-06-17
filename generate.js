import Mustache from "mustache";

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

const populateHTML = (lang, page, lang_base, base = "base/template.html") => {
  const template = readFile(base);
  const data = readFile(lang);
  const lang_temp = readFile(lang_base)
  const partials = readDir("partials");
  const langReplaced = Mustache.render(lang_temp, JSON.parse(data))

  const replaceData = replaceIterableInt(langReplaced, "rating");
  const parsedData = JSON.parse(replaceData);
  if (!data || !template) return;

  const rendered = Mustache.render(template, parsedData, partials)

  writeFile(page, rendered);

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
  const options = { base: false };
  checkMultiple(args, options);

  populatePath().forEach((item) => populateHTML(...item, args.base));
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
