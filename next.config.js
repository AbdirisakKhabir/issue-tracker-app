/** @type {import('next').NextConfig} */
const nextConfig = {

    async header(){
        return [
            {
                sourec: '/:path*',
                headers: [
                    {
                        key: 'referrer-policy', value: 'no-referrer'
                    }
                ]
            }
        ]
    }
}

module.exports = nextConfig
