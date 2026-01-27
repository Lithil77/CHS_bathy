// Geoserver and API URLs based on environment
export const S124NavWarnGeoserverUrl = import.meta.env.VITE_GEOSERVER_URL;
export const S124NavigationalwarningsAPIUrl = import.meta.env.VITE_API_URL;
export const nodeServerUrl = import.meta.env.VITE_NODE_SERVER_URL;
export const AuthenticationURL = import.meta.env.VITE_AUTH_URL;
export const GebcoUrl = import.meta.env.VITE_GEBCO_URL;
export const BingMapKey = import.meta.env.VITE_BINGMAPKEY;
export const GeoserverBaseURL = `${S124NavWarnGeoserverUrl}/geoserver/CHS-S102/wms`;
export const GeoserverBaseBSH_Bathy_URL = `${S124NavWarnGeoserverUrl}/geoserver/BSH_BATHY/wms`;

export const dashBoardApiUrl = 'http://14.142.106.210:8080';

// Layer Names
export const S1412windLayer = 'S-1412';
export const S124NavWarningGroupLayer = 'S-124_Navigational_Warnings';
export const S124Navarea = 'S-124_NavAreas';
export const S124NavWarningLocalAreaLayer = 'S-124_Navigational_LocalAreas';
export const S124NavWarningENCLayer = 'S124_Navigational_Warnings_ENC';

// API Endpoints
export const S124NavigationalwarningsAPIs = {
  "createS124NavigationalWarning": `${S124NavigationalwarningsAPIUrl}/S-124`,
  "s124NavWarningFormUpdate": `${S124NavigationalwarningsAPIUrl}/S-124`,
  "getS124NavWarnDetails": `${S124NavigationalwarningsAPIUrl}/S-124`,
  "deleteS124NavigationalWarning": `${S124NavigationalwarningsAPIUrl}/S-124`,
  "exportfiles": (id, format) => `${S124NavigationalwarningsAPIUrl}/S-124/export/${id}/${format}`,
  "S124NavWarnNextWarningnumber": `${S124NavigationalwarningsAPIUrl}/S-124/warning-number`,
  "S124NavWarnRelation": `${S124NavigationalwarningsAPIUrl}/S-124/warning-information`,
  "navWarning_Enums": `${S124NavigationalwarningsAPIUrl}/S-124/enums`,
  "attributeQuerySearch": `${S124NavigationalwarningsAPIUrl}/S-124/attribute-query`,
  "attributeQueryComboBoxList": `${S124NavigationalwarningsAPIUrl}/S-124`,
  "productFilter_WarningTypes": `${S124NavigationalwarningsAPIUrl}/S-124/unique-values/warningType`,
  "productFilter_MessageTypes": `${S124NavigationalwarningsAPIUrl}/S-124/unique-values/messageType`,
  "productFilter_WarningNumbers": `${S124NavigationalwarningsAPIUrl}/S-124/unique-values/warningNumber`,
  "productFilter_Years": `${S124NavigationalwarningsAPIUrl}/S-124/unique-values/year`,
  "productFilter_WarningSearch": `${S124NavigationalwarningsAPIUrl}/S-124/search`,
  "S124MessageId": (attribute) => `${S124NavigationalwarningsAPIUrl}/S-124/unique-values/${attribute}`,
  "importFeatureCatalogue": `${S124NavigationalwarningsAPIUrl}/S-124/import/feature-catalouge`,
  "getAllfeatureCatalogueLogs": `${S124NavigationalwarningsAPIUrl}/S-124/logs/feature-catalogue`,
  "updateFeatureCatalogue": `${S124NavigationalwarningsAPIUrl}/S-124/import/feature-catalouges`,
  "addLocalArea": `${S124NavigationalwarningsAPIUrl}/S-124/localarea`,
  "getAllLocalAreas": `${S124NavigationalwarningsAPIUrl}/S-124/localareas`,
  "updateLocalArea": `${S124NavigationalwarningsAPIUrl}/S-124/localareas`,
  "deleteLocalArea": `${S124NavigationalwarningsAPIUrl}/S-124/localarea`,
  "createTemplate": `${S124NavigationalwarningsAPIUrl}/S-124/template`,
  "getAllTemplates": `${S124NavigationalwarningsAPIUrl}/S-124/templates`,
  "deleteTemplate": `${S124NavigationalwarningsAPIUrl}/S-124/template`,
  "updateTemplate": `${S124NavigationalwarningsAPIUrl}/S-124/templates`,
  "getWarningTypes": `${S124NavigationalwarningsAPIUrl}/S-124/details/warning_type`,
  "getTypeDetails": `${S124NavigationalwarningsAPIUrl}/S-124/details/type_details`,
  "getGeneralTypes": `${S124NavigationalwarningsAPIUrl}/S-124/details/general_type`,
  "getCategories": `${S124NavigationalwarningsAPIUrl}/S-124/details/category`,
  "getRelations": `${S124NavigationalwarningsAPIUrl}/S-124/details/relation`,
  "registerUser": `${S124NavigationalwarningsAPIUrl}/S-124/user/register-user`,
  "LoginUser": `${S124NavigationalwarningsAPIUrl}/S-124/user/login`,
  "forgotPassword": `${S124NavigationalwarningsAPIUrl}/S-124/user/forgot-password`,
  "changePassword": `${S124NavigationalwarningsAPIUrl}/S-124/user/change-password`,
  "resetPassword": `${S124NavigationalwarningsAPIUrl}/S-124/user/reset-password`,
  "userValidate": `${S124NavigationalwarningsAPIUrl}/S-124/user/validate`,
  "getAllUsers": `${S124NavigationalwarningsAPIUrl}/S-124/users`,
  "createUser": `${S124NavigationalwarningsAPIUrl}/S-124/register-user`,
  "deleteUser": `${S124NavigationalwarningsAPIUrl}/S-124/user`,
  "updateUser": `${S124NavigationalwarningsAPIUrl}/S-124/users`,
  "getAllRoles": `${S124NavigationalwarningsAPIUrl}/S-124/roles`,
  "createRole": `${S124NavigationalwarningsAPIUrl}/S-124/role`,
  "deleteRole": `${S124NavigationalwarningsAPIUrl}/S-124/role`,
  "updateRole": `${S124NavigationalwarningsAPIUrl}/S-124/roles`,
  "navigationalWarningStatus": `${S124NavigationalwarningsAPIUrl}/S-124/approve-navigational-warnings`,
  "getAllNavigationalWarnings": `${S124NavigationalwarningsAPIUrl}/S-124`,
  "importLocalAreas": (format) => `${S124NavigationalwarningsAPIUrl}/S-124/import/local-areas/${format}`,
};

// Local Areas
export const Local_Areas = ['Area', 'Visinity'];
