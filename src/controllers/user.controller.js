import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const generateAccessTokens = async (userId) => {
    try {
        const user = await User.findById({_id:userId})
        const accessToken = user.generateAccessToken();
        await user.save({ validateBeforeSave: false })

        return { accessToken }


    } catch (error) {
        res.status(500).json({ error: 'Something went wrong while generating access token'});
    }
}

const registerUser = asyncHandler(async (req, res) => {

    const { fullName, email, password } = req.body;
    try {
        const userData = await User.findById(req.body._id) || new User()
        userData.fullName = fullName
        userData.email = email
        userData.password = password

        await userData.save()

        return res.status(201).json(
            new ApiResponse(200, userData, "User registered Successfully")
        )
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }



})

const loginUser = asyncHandler(async (req, res) => {

    const { email } = req.body

    try {
        const user = await User.findOne({email: email})

        const { accessToken } = await generateAccessTokens(user._id)

        const loggedInUser = await User.findById(user._id).select("-password")

        const options = {
            httpOnly: true,
            secure: true
        }
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: loggedInUser, accessToken
                    },
                    "User logged In Successfully"
                )
            )

    } catch (error) {
        res.status(500).json({ error: 'Internal server error'});
    }
})

const logoutUser = asyncHandler(async (req, res) => {

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})




export {
    registerUser,
    loginUser,
    logoutUser,
}