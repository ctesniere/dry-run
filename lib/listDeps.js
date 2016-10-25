'use strict';

// todo Lui donner un content de package.json pour le mettre dans le tmp puis faire un dry-run
module.exports = function () {
	const shelljs = require('shelljs');

	const REGEX_NAME_MODULE = /[a-zA-Z0-9\-]+@([0-9]{1,3}\.?){1,3}/;

	const dryRunExec = shelljs.exec('npm i --dry-run', {silent: true}).stdout;
	const stdout = dryRunExec.split('\n');

	const listModules = {};
	stdout.forEach((line) => {
		if (REGEX_NAME_MODULE.test(line)) {
			const module = line.match(REGEX_NAME_MODULE)[0].split('@');
			listModules[module[0]] = listModules[module[0]] || [];
			listModules[module[0]].push({
				versions: module[1]
			});
		}
	});

	return listModules;
};
