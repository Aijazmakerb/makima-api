import axios from "axios";
import cheerio from "cheerio";

const baseUrl = "https://player.anikatsu.me/?id=";

export const getPlayerDetails = async(id, list = [])=>{
    try{
        const search = await axios.get(baseUrl+id);
        
        const $ = cheerio.load(search.data);

        const text = $('script').text();
        const title = text.match(/title: "(.*)"/);
        const image = text.match(/image: "(.*)"/);
        const source = text.match(/"file": "(.*)"/);
        
        list.push({
            title: title[1],
            image: image[1],
            source: source[1]
        });

        return list;
    }catch(err){
        return err;
    }
}
