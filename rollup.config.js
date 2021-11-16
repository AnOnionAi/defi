import { threeMinifier } from "@yushijinhun/three-minifier-rollup";

export default {
	plugins: [
		threeMinifier(), // <=== Add plugin on the FIRST line   
	]
};