function checkNotNull(value: any, name?: string) {
  if (typeof value === 'object') {
    for (const key in value) {
      checkNotNull(value[key], name ? name + '.' + key : key);
    }
  } else if (value === null || value === undefined) {
    throw new Error(`Missing environment variable ${name}`);
  }
}

const config = {
  baseUrl: process.env.VERCEL_URL || 'http://localhost:3000',
};

checkNotNull(config);

export default config;
