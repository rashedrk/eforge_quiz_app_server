import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    const { accessToken, refreshToken } = result;

    // Send refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/refresh-token"
    });

    sendResponse(res, {
        message: 'User login successful!',
        data: {
            accessToken,
        },
    });
});

export const AuthControllers = {
    loginUser,
}