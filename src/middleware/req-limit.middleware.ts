import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

// Create request limit middleware with TypeScript
const requestLimitMiddleware: RateLimitRequestHandler = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    // Custom message when limit is reached
    console.error('Requesting API', 'Too many requests [100] in 1 min.', 'Try again later.');
    res.status(429).send('Too many requests, please try again later.');
  },
});

export default requestLimitMiddleware;
