import User from "../models/user.model.js";
import {nanoid} from 'nanoid'

// export const createRoom = async(req, res ) => {
//         // console.log("inside create room!!")  
        
//     try {
//         const {username, roomId } = req.body;
//         console.log("room id: ", roomId)
//         if(!username || !roomId ){
//             return res.json({
//                 success: false,
//                 message: "Please fill the necessary information"
//             })
//         }
        
//         const alreadyExists = await User.findOne({username})
//         if(alreadyExists){
//             return res.json({
//                 success: false,
//                 message: "Username already exists. Create a new one"
//             })
//         }
//         //if all info is correct then create the room with this id
//         const room = await User.create(req.body);
//         return res.status(200).json({
//             success: true,
//             message: "room created successfully ",
//             room,
//         })

//     } catch (error) {
//         console.log("error inside create room controller", error)
//         return res.status(400).json({
//             success: false,
//             message: "error creating room"
//         })
//     }
// }


export const getRoom = async(req, res ) => {
    try {
        const {username, roomId} = req.body;
        const getRoomInfo = await User.findOne({username})
        if(!getRoomInfo)
        {
            res.status(404).json({
                success: false,
                message: "room does not exist with this roomId",
            })
        }
        return res.status(200).json({
            success: true,
            message: "roomId details fetched successfully ",
            roomId,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error in getting info from Database. Internal Server Error",
        })
    }
}

export const test = async(req, res) => {
    try {
        console.log("inside try")
        const {name} = req.body;
        console.log("name: ", name)
    } catch (error) {
        console.log("inside catch")
    }
}


export const createRoom = async(req, res ) => {
    // console.log("inside create room!!")  
    
try {
    const {username:username } = req.body;
    // console.log("room id: ", roomId)
    console.log("username: ", username)
    if(!username  ){
        return res.json({
            success: false,
            message: "Please fill the necessary information"
        })
    }
    
    const alreadyExists = await User.findOne({username})
    if(alreadyExists){
        return res.json({
            success: false,
            message: "Username already exists. Create a new one"
        })
    }
    //if all info is correct then create the room with this id
    const roomId = nanoid();
    const user = await User.create({username, roomId: roomId});
    console.log("user: ", user)
    return res.status(200).json({
        success: true,
        message: "user created successfully ",
        user,
    })

} catch (error) {
    console.log("error inside create room controller", error)
    return res.status(400).json({
        success: false,
        message: "error creating room"
    })
}
}