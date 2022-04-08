import express from "express";
import MainController from "../controllers/main.controller";

const router = express.Router();

/**
 * @swagger
 * /circulatingSupply:
 *   get:
 *     summary: Circulating Supply
 *     tags:
 *       - Main
 *     responses:
 *       200:
 *         description: Message response
 *         schema:
 *           type: object
 *           example: {
 *             circulatingSupply: 54588696.158320844
 *           }
 *       400:
 *         description: When processing circulatingSupply failed
 *         schema:
 *           type: string
 *           example: {
 *                error: "Get circulation is failed"
 *            }
 */

router.route("/circulatingSupply")
        .get(MainController.getCirculatingSupply);


/**
 * @swagger
 * /price:
 *   get:
 *     summary: Bami Token Price
 *     tags:
 *       - Main
 *     responses:
 *       200:
 *         description: Message response
 *         schema:
 *           type: object
 *           example: {
 *             result: 0.13
 *           }
 *       400:
 *         description: When getting price failed
 *         schema:
 *           type: string
 *           example: {
 *                error: "Get circulation is failed"
 *            }
 */

 router.route("/tokens")
 .get(MainController.getPrice);


 /**
 * @swagger
 * /totalSupply:
 *   get:
 *     summary: Total Supply ( Max Supply  - Burn Balance )
 *     tags:
 *       - Main
 *     responses:
 *       200:
 *         description: Message response
 *         schema:
 *           type: object
 *           example: 100000
 *       400:
 *         description: When getting total supply failed
 *         schema:
 *           type: string
 *           example: {
 *                error: "Get TotalSupply is failed!"
 *            }
 */

  router.route("/totalSupply")
  .get(MainController.getTotalSupply);
export default router;