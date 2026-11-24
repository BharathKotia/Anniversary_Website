import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */images: {
     remotePatterns:[
      {
       protocol:"https",
       hostname:"ik.imagekit.io",   
      }
 
     ]
  },
  
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
