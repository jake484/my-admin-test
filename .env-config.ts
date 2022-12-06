/** 请求服务的环境配置 */
type ServiceEnv = Record<ServiceEnvType, ServiceEnvConfig>;

/** 不同请求服务的环境配置 */
const serviceEnv: ServiceEnv = {
  dev: {
    url: 'http://localhost:8081',
    urlPattern: '/proxy',
    secondUrl: 'https://www.fastmock.site/mock/c1520107474435ccf66bdaa7781568a8/api/',
    secondUrlPattern: '/mockproxy'
  },
  test: {
    url: 'http://localhost:8081',
    urlPattern: '/proxy',
    secondUrl: 'https://www.fastmock.site/mock/c1520107474435ccf66bdaa7781568a8/api/',
    secondUrlPattern: '/mockproxy'
  },
  prod: {
    url: 'http://localhost:8081',
    urlPattern: '/proxy',
    secondUrl: 'http://localhost:8082',
    secondUrlPattern: '/mockproxy'
  }
};

/**
 * 获取当前环境模式下的请求服务的配置
 * @param env 环境
 */
export function getServiceEnvConfig(env: ImportMetaEnv) {
  const { VITE_SERVICE_ENV = 'dev' } = env;

  const config = serviceEnv[VITE_SERVICE_ENV];

  return config;
}
