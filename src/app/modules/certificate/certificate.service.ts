import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCertificate, TCertificateLevel } from "./certificate.interface";
import { Certificate } from "./certificate.model";
import { QUESTION_LEVEL } from "../Question/question.constant";

// Define explicit order for levels to determine which is higher
const LEVEL_ORDER: TCertificateLevel[] = [
    "A1",
    "A2",
    "B1",
    "B2",
    "C1",
    "C2",
];

const compareLevels = (a: TCertificateLevel, b: TCertificateLevel) => {
    return LEVEL_ORDER.indexOf(a) - LEVEL_ORDER.indexOf(b);
};

const upsertLatestCertificateIntoDB = async (payload: TCertificate) => {
    const { userId, levelAchieved, score } = payload;

    // Validate levelAchieved is within allowed set
    if (!Object.values(QUESTION_LEVEL).includes(levelAchieved)) {
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid level provided");
    }

    const existing = await Certificate.findOne({ userId });

    if (!existing) {
        return await Certificate.create({ userId, levelAchieved, score });
    }

    // Only update if incoming level is newer/higher than stored
    if (compareLevels(levelAchieved, existing.levelAchieved as TCertificateLevel) > 0) {
        existing.levelAchieved = levelAchieved;
        existing.score = score;
        await existing.save();
    } else {
        // If not higher, keep highest but update score if same level and score is higher
        if (levelAchieved === (existing.levelAchieved as TCertificateLevel) && score > (existing.score ?? 0)) {
            existing.score = score;
            await existing.save();
        }
    }

    return existing;
};

const getCertificateByUserFromDB = async (userId: string) => {
    const doc = await Certificate.findOne({ userId })
        .populate('userId', 'name email')
        .lean();
    if (!doc) {
        throw new AppError(httpStatus.NOT_FOUND, "Certificate not found for user");
    }
    const { userId: user, ...rest } = doc;
    return { ...rest, user };
};

export const CertificateServices = {
    upsertLatestCertificateIntoDB,
    getCertificateByUserFromDB,
};

