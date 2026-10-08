const request = require("supertest");
const app = require("../src/app");

describe("API baseline", () => {
  test("GET /health returns ok", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  test("GET /api/v1/info returns metadata", async () => {
    const res = await request(app).get("/api/v1/info");
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("devsecops-cicd-platform");
    expect(res.body).toHaveProperty("version");
  });

  test("unknown route returns 404", async () => {
    const res = await request(app).get("/nope");
    expect(res.statusCode).toBe(404);
  });

  test("does not leak the X-Powered-By header", async () => {
    const res = await request(app).get("/health");
    expect(res.headers["x-powered-by"]).toBeUndefined();
  });
});