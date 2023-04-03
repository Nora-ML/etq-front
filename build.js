const webpack = require("webpack");
process.env.NODE_ENV = "production";
const BundleAnalyzerPlugin =
	require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const webpackConfigProd = require("react-scripts/config/webpack.config")(
	"production"
);

webpackConfigProd.plugins.push(
	new BundleAnalyzerPlugin({
		analyzerMode: "static",
		reportFilename: "report.html",
	})
);

webpack(webpackConfigProd, (err, stats) => {
	if (err || stats.hasErrors()) {
		console.error(err);
	}
});

require("react-scripts/scripts/build");
