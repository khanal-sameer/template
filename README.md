# Template Generation

## Initialize
``` 
yarn lang -project=p1,p2 -locale=l1,l2 
```

- For multiple project, give comma separated values in `project` option.
- Same for multiple language, comma separate values in `locale` option.
- Running the above command will initialize projects in give structure below.

## Project Structure
- p1
  - css
    - style.css  *(This is the main css file that will be included in final html file.)*
  - js
    - main.js *(The main javascript file that will be added in the final html file.)*
  - json
    - data.json *(This serves as a template file for translation, uses regular `{{variable}}` placeholder which will be replaced if locale like `en.json` has this key. If `{{variable}}` is needed in the final html file, use `#{variable}` instead.)*
  - locale
    - l1.json  *(json `key-value` pair, which value will be used in place of placeholders in `data.json`, you need to add values to this file. If `{{variable}}` is needed in the final html file, it can be kept as it is.)*
    - l2.json
  - partials *(folder that contains the reusable components that can be use for final page generation)*
  - index.html (The template file that will be used for final html generation.)

- p2
  - css
    - style.css
  - js
    - main.js
  - json
    - data.json
  - locale
    - l1.json
    - l2.json
  - partials
  - index.html


NOTE:  Use this same command to update. For example, if you already have `abc` project with locale `en` and `es` and want to add `jp` then you can run `yarn lang -project=abc -locale=jp`. It will update the values without affecting the previously created files.

## Generation

```
yarn generate -project=p1
```
- Looks for the values in `locale` folder and uses `data.json` and `index.html` to generate the final html file.
- The final html files reside in `pages` folder inside the project.
- The name of the generated files will have `project_locale.html`

For example, `p1` project has `en.json` and `es.json` files inside the `locale` folder, a `pages` folder will be created which contains`p1_en.html` and `p1_es.html` files, which are the final generated html files.
