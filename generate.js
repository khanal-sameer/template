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

function escape(str) {
  return str.replace(/#\{([^}]+)\}/g, (_, content) => `{{${content}}}`);
}

const replaceIterableInt = (nestedString = "", key) => {
  const regex = new RegExp('"' + key + '"\\s*:\\s*(\\d+)', "g");
  return nestedString.replace(regex, function (_, value) {
    const arr = new Array(+value).fill(+value);

    return '"' + key + '": [' + arr + "]";
  });
};

const populateHTML = (
  lang,
  tmpl,
  lang_tmpl,
  pages,
  project,
  style_tmpl,
  partials_tmpl,
  project_partials
) => {
  const data = JSON.parse(readFile(lang));

  if (!data || !tmpl) return;

  const langReplaced = Mustache.render(lang_tmpl, data);
  const replaceData = replaceIterableInt(langReplaced, "rating");
  const parsedData = JSON.parse(replaceData);

  parsedData.style = style_tmpl

  const rendered = Mustache.render(tmpl, parsedData, partials_tmpl, project_partials, { escape });
  const locale_name = path.parse(lang).name;
  const page_name = path.join(pages, `${project}_${locale_name}.html`);

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
    partials: false
  };


  checkMultiple(args, options);
  return initProject(args);
};

const populate = (args) => {
  const options = { project: false, partials: false };
  checkMultiple(args, options);
  const partial_key = args?.partials[0]
  const paths = populatePath(args?.project[0], partial_key);

  const [locales, page, lang_temp, pages, project, style, partials,scripts,project_partials,project_scripts_partials] = paths;
  const tmpl = readFile(page);
  const lang_tmpl = readFile(lang_temp);
  const style_tmpl = readFile(style);
  const partials_tmpl = readDir(partials);
  const project_partials_tmpl = readDir(project_partials);
  const project_scripts_tmpl = !partial_key ? {} : readDir(project_scripts_partials, (key,value) =>`\n<script defer id='${key}'>\n${value}\n</script>\n`)
  const scripts_tmpl = !partial_key ? {} : readDir(scripts, (key,value) =>`\n<script defer id='${key}'>\n${value}\n</script>\n`)
  const partial = {...partials_tmpl, ...scripts_tmpl, ...project_partials_tmpl, ...project_scripts_tmpl }
 const style_comp  = `<style>
  ${style_tmpl} </style>
  `;

  locales.forEach((lang) =>
    populateHTML(
      lang,
      tmpl,
      lang_tmpl,
      pages,
      project,
      style_comp,
      partial,
      project_partials_tmpl
    )
  );
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
    console.error('generate',err.message);
  }
};

generate();
