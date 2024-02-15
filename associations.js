import UserModel from "./models/User.js";
import ViewedModel from "./models/Viewed.js";
import MediaModel from "./models/Media.js";
import FacetModel from "./models/Facet.js";
import Media_metadataModel from "./models/Media_metadata.js";
import FavoriteModel from "./models/Favorite.js";

// //MediaModel - ViewedModel
ViewedModel.hasMany(MediaModel, {
  foreignKey: "viewed_id",
});
MediaModel.belongsTo(ViewedModel, {
  foreignKey: "viewed_id",
});

//MediaModel - Media_metadataModel
MediaModel.hasMany(Media_metadataModel, {
  foreignKey: "media_id",
});
Media_metadataModel.belongsTo(MediaModel, {
  foreignKey: "media_id",
});

//MediaModel - Media_metadataModel
ViewedModel.hasMany(FacetModel, {
  foreignKey: "viewed_id",
});
FacetModel.belongsTo(ViewedModel, {
  foreignKey: "viewed_id",
});

//MediaModel - Media_metadataModel
ViewedModel.hasMany(FavoriteModel, {
  foreignKey: "viewed_id",
});
FavoriteModel.belongsTo(ViewedModel, {
  foreignKey: "viewed_id",
});
