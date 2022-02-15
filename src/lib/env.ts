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

	console.log('VITE NODE ENV:!!!', NODE_ENV);

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

	console.log('APP RUNNING ON: ', env['CHAIN'], ' BLOCKCHAIN');

	return env;
};

export const APIKEY = env["VITE_COVALENT_API_KEY"];

export default {
	...getEnv()
};
