import mainModel from '../model/main.model'
import {MAX_SUPPLY } from "../configs/server.config";

const MainController = {};
MainController.getCirculatingSupply = async (req, res) => {
    try {

        const price = mainModel.getPrice().then(rows => {
            if (rows.length > 0) {
                const data = rows[0];
                res.status(200).json(Number(data.circulating_supply));
            } else {
                res.status(200).json('NA');
            }
    
        });

    } catch (error) {
        res.status(400).json(error)    
    }

}

MainController.getTotalSupply = async(req, res) => {
    try {
        mainModel.getPrice().then(rows => {
            if (rows.length > 0) {
                const data          = rows[0];
                const total_supply = MAX_SUPPLY - Number(data.burn);
                res.status(200).json(total_supply);
            } else {
                res.status(200).json('NA');
            }
    
        });
    } catch (error) {
        res.status(400).json({error});
    }
}

MainController.getPrice = async(req, res) => {
    try {
        const result = {
            "name": "Hesman Invesment Certificate",
            "description": "HESIC is the NFT representing Hesman Investment Certificate, issued by Hesman Studio Pte. Ltd. Owning these NFTs, investors can enjoy various benefits from the Hesman Legend ecosystem.",
            "image": "http://localhost:3500/images/hesmanImage.png"
            } 
        res.status(200).json(result);
        }
    catch (error) {
        console.log(error);
        res.status(400).json({error});
    }

}
export default MainController;