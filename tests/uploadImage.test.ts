import request from 'supertest';
import app from '../src/server';
import path from 'path';


describe('POST /upload', () => {
    it('should upload an image successfully', async () => {
        const filePath = path.resolve('C:', 'Users', 'HP', 'Downloads', 'realmadrid.png');
        const response = await request(app)
            .post('/upload')
            .attach('image',filePath); 

        expect(response.status).toBe(200);
    });
});
