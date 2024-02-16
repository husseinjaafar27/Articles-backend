import Favorite from "../models/Favorite.js";
import Viewed from "../models/Viewed.js";

export const addFavoriteViewed = async (req, res) => {
  const { id } = req.userData;
  const viewed_id = req.params.id;
  try {
    const check = await Favorite.findOne({
      where: { user_id: id, viewed_id: viewed_id },
    });
    if (check)
      return res
        .status(400)
        .json({ message: "Already added, check your favorites!" });

    const favorite = await Favorite.create({
      user_id: id,
      viewed_id: viewed_id,
    });

    return res.status(200).json({
      message: "Favorite created successfully",
      data: favorite,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteFavoriteViewed = async (req, res) => {
  const { id } = req.params;
  try {
    await Favorite.destroy({ where: { id } });

    return res.status(200).json({
      message: "Favorite deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getFavoritesUser = async (req, res) => {
  const { id } = req.userData;
  try {
    const favorites = await Favorite.findAll({
      where: { user_id: id },
      include: {
        model: Viewed,
      },
    });

    return res.status(200).json({
      message: "Favorite created successfully",
      data: favorites,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
