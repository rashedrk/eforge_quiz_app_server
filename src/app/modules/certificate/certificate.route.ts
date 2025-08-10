import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { certificateValidation } from "./certificate.validation";
import { CertificateControllers } from "./certificate.controller";

const router = Router();

router.post(
    "/",
    validateRequest(certificateValidation.createCertificateValidationSchema),
    CertificateControllers.upsertLatest
);

router.get("/:userId", CertificateControllers.getByUser);

export const CertificateRoutes = router;

