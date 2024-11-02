import request from 'supertest';
import app from '../src/server';
import path from 'path';

describe('POST /blur/:imageName', () => {
    it('should blur an image successfully', async () => {
        const imageName = '1730474870704.png'; // Image to blur
        const sigma = 5; // Sigma value for blurring (adjust as needed)

        // Send the request to blur the image
        const response = await request(app)
            .post(`/blur/${imageName}`)
            .send({ sigma }); // Send sigma value as JSON

        // Check the response status
        expect(response.status).toBe(200);
     
    });
});
