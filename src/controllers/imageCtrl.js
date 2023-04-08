import Image from '../models/image';

export const imageCtrl = {
   postUpload: async (req, res) => {
     try {
       const imgae = new Image();
     } catch(err) {
        return res.status(500).json(err)
     }
   }
}