// https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables
const COUCHDB_SEARCHENGINE = process.env.REACT_APP_COUCHDB_SEARCHENGINE || "searchengine";
const COUCHDB_BOOKMARKENGINE = process.env.REACT_APP_COUCHDB_BOOKMARKENGINE || "bookmarkengine";

module.exports = {
    COUCHDB_SEARCHENGINE: COUCHDB_SEARCHENGINE,
    COUCHDB_BOOKMARKENGINE: COUCHDB_BOOKMARKENGINE,
};
