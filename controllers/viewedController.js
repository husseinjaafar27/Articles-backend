import axios from "axios";
import CircularJSON from "circular-json";
import { Op } from "sequelize";

import Viewed from "../models/Viewed.js";
import Facet from "../models/Facet.js";
import Media from "../models/Media.js";
import Media_metadata from "../models/Media_metadata.js";

export const migrateViewed = async (req, res) => {
  const { period } = req.query;
  try {
    let url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/${period}.json?api-key=cyH6lSOUAFMP41OJUKIOYHXGOoBe3Jqt`;
    const response = await axios.get(url);
    const responseData = CircularJSON.stringify(response.data);
    const responseParse = JSON.parse(responseData);
    const data = responseParse.results;

    for (let i = 0; i < data.length; i++) {
      const view = await Viewed.create({
        uri: data[i].uri,
        url: data[i].url,
        viewed_id: data[i].id,
        asset_id: data[i].asset_id,
        source: data[i].source,
        published_date: data[i].published_date,
        updated: data[i].updated,
        section: data[i].section,
        subsection: data[i].subsection,
        nytdsection: data[i].nytdsection,
        adx_keywords: data[i].adx_keywords,
        column: data[i].column,
        byline: data[i].byline,
        type: data[i].type,
        title: data[i].title,
        abstract: data[i].abstract,
        period: period,
      });
      for (let q = 0; q < data[i].des_facet.length; q++) {
        await Facet.create({
          viewed_id: view.id,
          text: data[i].des_facet[q],
          type: "des_facet",
        });
      }
      for (let w = 0; w < data[i].org_facet.length; w++) {
        await Facet.create({
          viewed_id: view.id,
          text: data[i].org_facet[w],
          type: "org_facet",
        });
      }
      for (let r = 0; r < data[i].per_facet.length; r++) {
        await Facet.create({
          viewed_id: view.id,
          text: data[i].per_facet[r],
          type: "per_facet",
        });
      }
      for (let t = 0; t < data[i].geo_facet.length; t++) {
        await Facet.create({
          viewed_id: view.id,
          text: data[i].geo_facet[t],
          type: "geo_facet",
        });
      }

      for (let s = 0; s < data[i].media.length; s++) {
        const media = await Media.create({
          viewed_id: view.id,
          type: data[i].media[0].type,
          subtype: data[i].media[0].subtype,
          caption: data[i].media[0].caption,
          copyright: data[i].media[0].copyright,
          approved_for_syndication: data[i].media[0].approved_for_syndication,
        });

        const metadata = data[i].media[0]["media-metadata"];

        for (let d = 0; d < metadata.length; d++) {
          await Media_metadata.create({
            media_id: media.id,
            url: metadata[d].url,
            format: metadata[d].format,
            height: metadata[d].height,
            width: metadata[d].width,
          });
        }
      }
    }

    return res.status(200).json({
      message: "Done",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getViewedByPeriod = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;
  const period = req.params.id;
  const { section } = req.query;
  try {
    let whereClause = { period };
    if (section)
      whereClause = {
        ...whereClause,
        section: { [Op.like]: `%${section}%` },
      };

    const view = await Viewed.findAll({
      where: whereClause,
      include: [
        { model: Facet },
        { model: Media, include: { model: Media_metadata } },
      ],
      limit,
      offset,
    });

    return res.status(200).json({
      message: "Viewed fetch successfully",
      data: view,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getViewedById = async (req, res) => {
  const id = req.params.id;
  try {
    const view = await Viewed.findOne({
      where: { id },
      include: [
        { model: Facet },
        { model: Media, include: { model: Media_metadata } },
      ],
    });

    return res.status(200).json({
      message: "Viewed fetch successfully",
      data: view,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
