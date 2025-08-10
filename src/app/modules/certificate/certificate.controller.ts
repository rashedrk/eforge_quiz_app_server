import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CertificateServices } from "./certificate.service";

const upsertLatest = catchAsync(async (req, res) => {
    const result = await CertificateServices.upsertLatestCertificateIntoDB(req.body);
    sendResponse(res, {
        message: "Certificate saved successfully",
        data: result,
    });
});

const getByUser = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const result = await CertificateServices.getCertificateByUserFromDB(userId);
    sendResponse(res, {
        message: "Certificate fetched successfully",
        data: result,
    });
});

export const CertificateControllers = {
    upsertLatest,
    getByUser,
};

