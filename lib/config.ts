const prod = process.env.NODE_ENV === 'production';

export const config = {
    server: prod ? 'https://hogehoge.com' : 'http://localhost:3000'
};
