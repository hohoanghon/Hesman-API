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

        mainModel.getPrice().then(rows => {
            if (rows.length > 0) {
                const data = rows[0];
                const current_price                 = Number(data.price);
                const circulating_supply            = Number(data.circulating_supply);
                const market_cap                    = current_price * circulating_supply;
                const fully_diluted_valuation       = MAX_SUPPLY * current_price;
                
                const total_supply                  = MAX_SUPPLY - Number(data.burn);

                const result = {
                    'price': current_price,
                    'circulating_supply' : circulating_supply,
                    'market_cap' : market_cap,
                    'fully_diluted_valuation' : fully_diluted_valuation,
                    'total_supply'  : total_supply,
                    'max_supply' : MAX_SUPPLY
                }
        
                res.status(200).json(result);
            } else {
                res.status(404).json({"error" : "Get price is failed!"});
            }
    
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({error});
    }

}
MainController.token = async(res) => {
    try {
        const result = {
            "id": 1,
            "name": "test",
            "description": "test",
            "image": "https://www.toponseek.com/blogs/wp-content/uploads/2019/06/toi-uu-hinh-anh-optimize-image-4-1200x700.jpg",
            "strength": 20
        }

        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({error});
    }
}
export default MainController;