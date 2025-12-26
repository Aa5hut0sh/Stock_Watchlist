const { z } = require("zod");

const stockSchema = z.object({
  stockName: z
    .string()
    .min(1, "Stock name cannot be empty")
    .max(5, "Stock name must be 5 characters or less")
    .regex(/^[A-Z]+$/, "Must be uppercase letters only")

});

const validateWithZod = (req, res, next) => {
  try {
    const result = stockSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        status: "fail",
        errors: result.error.flatten().fieldErrors,
      });
    }

    req.validatedData = result.data;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports =  validateWithZod;
