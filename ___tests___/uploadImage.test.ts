import request from 'supertest';
import app from '../src/server';
import path from 'path';

describe("POST /upload", () => {
    it("should successfully upload an image", async () => {
      const response = await request(app)
        .post("/upload")
        .attach("image", path.join(__dirname,"images","spiderman.png")); // Adjust the path to your test image
  
      expect(response.status).toBe(200);
    });
})