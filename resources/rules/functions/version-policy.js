// Return the first segment of a path that matches the pattern 'v\d+' or 'v\d+.\d+
function getVersion(path) {
  const url = new URL(path);
  const segments = url.pathname.split('/');
  return segments.find((segment) => segment.match(/v[0-9]+(.[0-9]+)?/));
}

function checkPaths(targetVal) {  
  const basePath = targetVal.url;
  const version = getVersion(basePath);
  const errors = [];
  if (version === undefined) {
    errors.push({
        message: `Version is missing from the url.`,
        path: ['path', basePath],
        });
  } else {
    errors.push({
        message: `Version is not missing from the url.`,
        path: ['path', basePath],
        });  
  }

  return errors;
}
  
// Checks version is specified in the URL.
// @param targetVal - server url
module.exports = (targetVal) => {
  if (targetVal === null || typeof targetVal !== 'object') {
    return [];
  }

  const errors = checkPaths(targetVal);
  return errors;
};
