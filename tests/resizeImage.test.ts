import request from 'supertest';
import app from '../src/server';
import path from 'path';

describe('POST /resize/:imageName', () => {
    it('should resize an image successfully', async () => {
        
        const imageName = '1730474870704.png';
        const resizeParams = {
            height: 200, // Example height
            width: 300   // Example width
        };

        const response = await request(app)
            .post(`/resize/${imageName}`)
            .send(resizeParams) // Send the parameters as JSON
            .set('Content-Type', 'application/json'); // Set the content type to application/json


        expect(response.status).toBe(200);

      /*  // You may also want to check if the resized image exists at the expected location
        const resizedImagePath = path.join(__dirname, '../../images', `new-${imageName}`);
        expect(require('fs').existsSync(resizedImagePath)).toBe(true);*/
    });
});
