let env: {};

env = import.meta.env;

const getEnvFiltered = (regex: RegExp, env) => {
	const newObject = {};
	for (const [key, value] of Object.entries(env)) {
		if (key.match(regex)) {
			const newKey = key.replace(/^VITE_(DEV_|PROD_|QA_)?/, '');
			newObject[newKey] = value;
		}
	}
	return newObject;
};

const getEnv = () => {
	const NODE_ENV = env['VITE_NODE_ENV'];
	// const NODE_VERSION = env['VITE_NODE_VERSION'];

	// console.log('NODE_VERSION:', NODE_VERSION);

	console.log('ENV:!!!', NODE_ENV);

	switch (NODE_ENV) {
		case 'qa':
			env = getEnvFiltered(/VITE_(?!PROD|DEV)/, env);
			break;

		case 'production':
			env = getEnvFiltered(/VITE_(?!DEV|QA)/, env);
			break;

		default:
			env = getEnvFiltered(/VITE_(?!PROD|QA)/, env);
	}

	console.log(env);

	return env;
};

export default {
	...getEnv()
};