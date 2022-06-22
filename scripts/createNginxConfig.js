// Создаем конфиг для nginx
// TODO: Нужно для Replace !
try {
  const fs = require('node:fs');
  const path = require('node:path');
  const env = require('node-env-file');
  const NGINX_CONFIG = require('./nginxConfig');
  // Находим корневой каталог
  const ROOT = path.resolve(__dirname, '..');
  process.env.ROOT = ROOT;


  // Получаем переменное окружение
  env(path.resolve(ROOT, '.env'));

  const NGINX_DIR = path.resolve(ROOT, 'nginx');

  if (!fs.existsSync(NGINX_DIR)) {
    fs.mkdirSync(NGINX_DIR, {
      recursive: true,
      mode: '0777',
    });
  } else {
  // TODO: переписать на sync а то удаляет уже созданный файл
  // Если папка существуем - чистим старые конфиги
  // fs.readdir(NGINX_DIR, (err, files) => {
  //   if (err) throw err;
  //
  //   for (const file of files) {
  //     fs.unlink(path.join(NGINX_DIR, file), (err) => {
  //       if (err) throw err;
  //     });
  //   }
  // });
  }

  const NGINX_CONFIG_FILE = path.resolve(NGINX_DIR, 'nginx.conf');
  const nginxConfigFile = fs.openSync(NGINX_CONFIG_FILE, 'w');
  const config = prettier(nginxConfigToString(NGINX_CONFIG));
  // console.log(`config ${config}`);
  fs.writeSync(nginxConfigFile, config);
  fs.closeSync(nginxConfigFile);
} catch (e) {
  console.log(e);
}

function nginxConfigToString(config, indent = 0) {
  let str = '';

  const indentSpace = createIndent(indent);

  for (let i = 0; i < config.length; i++) {
    const option = config[i];
    // console.log(option);

    if (option.type === 'block') {
      str+= `\n${indentSpace}${option.name} ${option.params} {
${nginxConfigToString(option.children, indent+1)}
${indentSpace}}\n`
    }

    if (option.type === 'block_replace') {
      str+= `\n${indentSpace}${option.name} ${replace(option.params, option.replace)} {
${nginxConfigToString(option.children, indent+1)}
${indentSpace}}\n`
    }

    if (option.type === 'option') {
      str+= `${indentSpace}${option.name} ${option.params};\n`;
    }

    if (option.type === 'option_replace') {
      str+= `${indentSpace}${option.name} ${replace(option.params, option.replace)};\n`;
    }
  }
  return str;
}

function createIndent(n) {
  // 2 Пробела TODO: возможно лучше оставить цифру
  const TAB_SPACE = '  ';
  let indent = '';

  for (let i = 0; i < n; i++) {
    indent += TAB_SPACE;
  }

  return indent;
}

function replace(str, replace) {
  for (let i = 0; i < replace.length; i++) {
    const key = replace[i];
    // console.log(global[key]);
    str = str.replaceAll(`%${key}%`, process.env[key]);
  }

  return str;
}

// TODO : Чистим косяки вида 2-х отступов подряд )
// Тут будут стилистические фиксы =)
function prettier(str) {
  // Удаляем первый оступ =)
  str = str.replace('\n', '');
  str = str.replaceAll(';\n\n', ';\n');
  return str;
}
